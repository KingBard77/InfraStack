"""Source-size and lazy-registry performance checks."""

from __future__ import annotations

from pathlib import Path

from .common import CheckReport, directory_bytes


STUDIO_JAVASCRIPT_BUDGET = 2_000_000
STUDIO_CSS_BUDGET = 512_000
REGISTRY_BUDGET = 65_536


def check_budget(report: CheckReport, label: str, size: int, budget: int) -> None:
    """Record a byte measurement and enforce its budget.

    Args:
        report: Report receiving the result.
        label: Measurement name.
        size: Measured bytes.
        budget: Maximum allowed bytes.
    """
    report.measured(f"{label}: {size} bytes / {budget} budget")
    if size <= budget:
        report.passed(f"{label} is within budget")
    else:
        report.failed(f"{label} exceeds budget by {size - budget} bytes")


def run(repo_root: Path) -> CheckReport:
    """Measure Studio source weight and compact initial registries.

    Args:
        repo_root: InfraStack repository root.

    Returns:
        Performance check report.
    """
    report = CheckReport("performance")
    check_budget(
        report,
        "Studio JavaScript",
        directory_bytes(repo_root / "assets/js/studio"),
        STUDIO_JAVASCRIPT_BUDGET,
    )
    check_budget(
        report,
        "Studio CSS",
        directory_bytes(repo_root / "assets/styles/studio"),
        STUDIO_CSS_BUDGET,
    )
    for relative_path in (
        "assets/studio/packages/registry.json",
        "assets/data/studio/libraries/registry.json",
    ):
        path = repo_root / relative_path
        size = path.stat().st_size if path.is_file() else REGISTRY_BUDGET + 1
        check_budget(report, relative_path, size, REGISTRY_BUDGET)

    return report
