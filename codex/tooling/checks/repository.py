"""Repository ownership and contract checks."""

from __future__ import annotations

import json
from pathlib import Path

from .common import CheckReport


REQUIRED_PATHS = (
    "templates/studio",
    "templates/layout/share.html.twig",
    "templates/layout/embed.html.twig",
    "assets/js/studio",
    "assets/js/layout/share.js",
    "assets/styles/studio",
    "assets/styles/layout/share.css",
    "assets/styles/layout/embed.css",
    "assets/studio/packages/registry.json",
    "assets/data/studio/libraries/registry.json",
    "assets/icons/studio/libraries",
    "src/Controller/Studio/StudioController.php",
    "src/Controller/Layout/ShareController.php",
    "src/Controller/SitemapController.php",
    "src/Service/Studio/StudioTemplateRouteService.php",
    "src/Service/Studio/StudioLibraryService.php",
    "src/Service/Layout/ShareService.php",
    "templates/search/sitemap.xml.twig",
    "public/robots.txt",
)

RETIRED_PATHS = (
    "templates/content/tools",
    "src/Controller/Content/ToolPageController.php",
    "src/Service/Tools/ToolCatalogService.php",
    "templates/architecture",
    "assets/styles/page/architecture.css",
    "src/Controller/Architecture/ArchitectureLandingController.php",
    "src/Service/Studio/ArchitectureLandingService.php",
)


def run(repo_root: Path) -> CheckReport:
    """Check that documented ownership matches the current repository.

    Args:
        repo_root: InfraStack repository root.

    Returns:
        Repository check report.
    """
    report = CheckReport("repository")

    for relative_path in REQUIRED_PATHS:
        if (repo_root / relative_path).exists():
            report.passed(f"present: {relative_path}")
        else:
            report.failed(f"missing current path: {relative_path}")

    for relative_path in RETIRED_PATHS:
        if (repo_root / relative_path).exists():
            report.warned(f"retired path still exists: {relative_path}")
        else:
            report.passed(f"retired path absent: {relative_path}")

    active_documents = (
        repo_root / "AGENTS.md",
        repo_root / "codex/README.md",
        repo_root / "codex/PROMPT.md",
        repo_root / "codex/DESIGN.md",
        repo_root / "codex/devops/AGENTS.md",
        repo_root / "codex/tooling/README.md",
    )
    retired_references = (
        "templates/content/tools",
        "templates/content/factory",
        "src/Controller/Content/ToolPageController.php",
        "src/Service/Tools/ToolCatalogService.php",
    )

    for document in active_documents:
        if not document.is_file():
            report.failed(f"missing contract: {document.relative_to(repo_root)}")
            continue
        text = document.read_text(encoding="utf-8")
        for reference in retired_references:
            if reference in text:
                report.failed(f"legacy reference in {document.relative_to(repo_root)}: {reference}")

    if report.ok:
        report.passed("active contracts contain no retired tool-tree references")

    robots_path = repo_root / "public/robots.txt"
    if robots_path.is_file():
        robots = robots_path.read_text(encoding="utf-8")
        if "Sitemap: https://www.infrastack.my/sitemap.xml" in robots:
            report.passed("robots.txt advertises the canonical sitemap")
        else:
            report.failed("robots.txt does not advertise the canonical sitemap")

    package_registry_path = repo_root / "assets/studio/packages/registry.json"
    try:
        package_registry = json.loads(package_registry_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        report.failed(f"landing-page registry is unreadable: {error}")
        package_registry = {}

    template_routes = []
    for package in package_registry.get("packages", []):
        package_id = package.get("id", "unknown") if isinstance(package, dict) else "unknown"
        if not isinstance(package, dict):
            report.failed("package registry contains a non-object entry")
            continue
        if "landing" in package:
            report.failed(f"retired landing metadata remains in package: {package_id}")
            continue
        provider = package.get("provider")
        templates_path = package.get("templates")
        if not isinstance(provider, str) or not isinstance(templates_path, str):
            report.failed(f"package route metadata is incomplete: {package_id}")
            continue
        full_templates_path = repo_root / "assets/studio/packages" / templates_path
        try:
            template_data = json.loads(full_templates_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            report.failed(f"package templates are unreadable for {package_id}: {error}")
            continue
        for template in template_data.get("templates", []):
            template_id = template.get("id") if isinstance(template, dict) else None
            if isinstance(template_id, str):
                template_routes.append(f"/studio/{provider}/{template_id}")

    if len(template_routes) == 18 and len(template_routes) == len(set(template_routes)):
        report.passed("Studio registry produces 18 unique template routes")
    else:
        report.failed(f"unexpected Studio template routes: {sorted(template_routes)}")

    return report
