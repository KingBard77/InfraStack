"""Development VM and production-mode deployment checks."""

from __future__ import annotations

import json
from pathlib import Path

from .common import CheckReport, run_command


REMOTE_CHECK = (
    "zsh -lic \"xxcd.iad.infrastack && "
    "xxcomposercache && "
    "php bin/console lint:twig templates && "
    "php bin/console debug:router --show-controllers && "
    "php bin/console debug:asset-map studio.js && "
    "APP_ENV=prod APP_DEBUG=0 php bin/console cache:warmup\""
)

PUBLIC_BASE_URL = "https://www.infrastack.my"


def studio_template_paths(repo_root: Path) -> list[str]:
    """Return public Studio routes derived from registered templates.

    Args:
        repo_root: InfraStack repository root.

    Returns:
        Stable public route paths for released Studio templates.
    """
    registry_path = repo_root / "assets/studio/packages/registry.json"
    try:
        registry = json.loads(registry_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return []

    routes = []
    for package in registry.get("packages", []):
        if not isinstance(package, dict):
            continue
        provider = package.get("provider")
        templates_path = package.get("templates")
        if not isinstance(provider, str) or not isinstance(templates_path, str):
            continue
        try:
            package_templates_path = (
                repo_root / "assets/studio/packages" / templates_path
            )
            templates = json.loads(
                package_templates_path.read_text(encoding="utf-8")
            )
        except (OSError, json.JSONDecodeError):
            continue
        for template in templates.get("templates", []):
            template_id = template.get("id") if isinstance(template, dict) else None
            if isinstance(template_id, str):
                routes.append(f"/studio/{provider}/{template_id}")

    return routes


def check_public_response(
    repo_root: Path,
    report: CheckReport,
    path: str,
) -> None:
    """Check that a public page is indexable and does not expose debug headers.

    Args:
        repo_root: InfraStack repository root.
        report: Report receiving the result.
        path: Absolute public URL path.
    """
    exit_code, output = run_command(
        [
            "curl",
            "--insecure",
            "--connect-timeout",
            "10",
            "--max-time",
            "30",
            "--fail",
            "--silent",
            "--show-error",
            "--location",
            "--dump-header",
            "-",
            "--output",
            "/dev/null",
            PUBLIC_BASE_URL + path,
        ],
        repo_root,
    )
    normalized_headers = output.lower()
    if exit_code != 0:
        report.failed(f"public response failed for {path}: {output[-1000:]}")
    elif "x-robots-tag:" in normalized_headers and "noindex" in normalized_headers:
        report.failed(f"public response is noindex: {path}")
    elif "x-debug-token:" in normalized_headers or "x-debug-token-link:" in normalized_headers:
        report.failed(f"public response exposes Symfony debug headers: {path}")
    else:
        report.passed(f"public response is indexable without debug headers: {path}")


def check_public_file(
    repo_root: Path,
    report: CheckReport,
    path: str,
    required_text: str,
) -> None:
    """Check a public discovery file and one required marker.

    Args:
        repo_root: InfraStack repository root.
        report: Report receiving the result.
        path: Absolute public URL path.
        required_text: Text that must be present in the response body.
    """
    exit_code, output = run_command(
        [
            "curl",
            "--insecure",
            "--connect-timeout",
            "10",
            "--max-time",
            "30",
            "--fail",
            "--silent",
            "--show-error",
            PUBLIC_BASE_URL + path,
        ],
        repo_root,
    )
    if exit_code != 0:
        report.failed(f"public discovery file failed for {path}: {output[-1000:]}")
    elif required_text not in output:
        report.failed(f"public discovery file is missing expected content: {path}")
    else:
        report.passed(f"public discovery file is available: {path}")


def check_public_status(
    repo_root: Path,
    report: CheckReport,
    path: str,
    expected_status: int,
    expected_redirect: str = "",
) -> None:
    """Check the status and optional destination of a retired public URL.

    Args:
        repo_root: InfraStack repository root.
        report: Report receiving the result.
        path: Absolute public URL path.
        expected_status: Expected HTTP status code.
        expected_redirect: Expected absolute redirect URL, when applicable.
    """
    exit_code, output = run_command(
        [
            "curl",
            "--insecure",
            "--connect-timeout",
            "10",
            "--max-time",
            "30",
            "--silent",
            "--show-error",
            "--output",
            "/dev/null",
            "--write-out",
            "%{http_code} %{redirect_url}",
            PUBLIC_BASE_URL + path,
        ],
        repo_root,
    )
    expected = str(expected_status)
    if expected_redirect:
        expected += " " + PUBLIC_BASE_URL + expected_redirect
    if exit_code != 0:
        report.failed(f"retired public URL check failed for {path}: {output[-1000:]}")
    elif output.strip() != expected:
        report.failed(
            f"unexpected retired public URL response for {path}: {output.strip()}"
        )
    else:
        report.passed(f"retired public URL response is correct: {path}")


def run(repo_root: Path) -> CheckReport:
    """Validate current Studio paths on the approved development VM.

    Args:
        repo_root: InfraStack repository root.

    Returns:
        Deployment check report.
    """
    report = CheckReport("deployment")
    exit_code, output = run_command(
        ["ssh", "vm-host-infrastack", REMOTE_CHECK],
        repo_root,
        timeout=240,
    )
    if exit_code == 0:
        report.passed(
            "development VM Twig, routes, Asset Mapper, and production cache checks passed"
        )
    else:
        report.failed(f"development VM checks failed: {output[-3000:]}")

    for path in ["/", "/studio", *studio_template_paths(repo_root)]:
        check_public_response(repo_root, report, path)
    check_public_file(
        repo_root,
        report,
        "/robots.txt",
        "Sitemap: https://www.infrastack.my/sitemap.xml",
    )
    check_public_file(
        repo_root,
        report,
        "/sitemap.xml",
        "<loc>https://www.infrastack.my/studio/aws/aws-three-tier</loc>",
    )
    check_public_status(
        repo_root,
        report,
        "/tools/aws/architecture-vpc-aws",
        301,
        "/studio/aws/aws-three-tier",
    )
    check_public_status(
        repo_root,
        report,
        "/architecture/azure",
        301,
        "/studio/azure/azure-three-tier",
    )
    check_public_status(
        repo_root,
        report,
        "/tools/aws/calculate-cost-aws",
        410,
    )

    return report
