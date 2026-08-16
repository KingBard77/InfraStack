"""Development VM and production-mode deployment checks."""

from __future__ import annotations

from pathlib import Path

from .common import CheckReport, run_command


REMOTE_CHECK = (
    "zsh -lic \"xxcd.iad.infrastack && "
    "xxcomposercache && "
    "php bin/console lint:twig templates/studio templates/layout && "
    "php bin/console debug:router --show-controllers && "
    "php bin/console debug:asset-map studio.js && "
    "APP_ENV=prod APP_DEBUG=0 php bin/console cache:warmup\""
)


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
        report.passed("development VM Twig, routes, Asset Mapper, and production cache checks passed")
    else:
        report.failed(f"development VM checks failed: {output[-3000:]}")
    return report
