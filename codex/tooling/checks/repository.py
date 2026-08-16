"""Repository ownership and contract checks."""

from __future__ import annotations

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
    "src/Service/Studio/StudioLibraryService.php",
    "src/Service/Layout/ShareService.php",
)

RETIRED_PATHS = (
    "templates/content/tools",
    "src/Controller/Content/ToolPageController.php",
    "src/Service/Tools/ToolCatalogService.php",
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

    return report
