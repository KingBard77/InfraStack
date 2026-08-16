#!/usr/bin/env python3
"""Single public validation router for the InfraStack Studio workspace."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]

if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from codex.tooling.checks import deployment, performance, repository, studio
from codex.tooling.checks.common import CheckReport


CHECKS = {
    "repository": repository.run,
    "studio": studio.run,
    "performance": performance.run,
    "deployment": deployment.run,
}


def render(report: CheckReport) -> None:
    """Print one compact check report.

    Args:
        report: Completed check report.
    """
    print(f"[{report.name}] pass={len(report.passes)} warning={len(report.warnings)} error={len(report.errors)}")
    for message in report.metrics:
        print(f"  measure: {message}")
    for message in report.warnings:
        print(f"  warning: {message}")
    for message in report.errors:
        print(f"  error: {message}")


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    """Parse the public check command.

    Args:
        argv: Optional command arguments.

    Returns:
        Parsed arguments.
    """
    parser = argparse.ArgumentParser(description="Validate the current InfraStack Studio workspace.")
    parser.add_argument("check", choices=(*CHECKS, "all"), help="Check surface")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    """Run one or all current InfraStack checks.

    Args:
        argv: Optional command arguments.

    Returns:
        Zero when all requested checks pass; otherwise one.
    """
    args = parse_args(argv)
    names = tuple(CHECKS) if args.check == "all" else (args.check,)
    reports = [CHECKS[name](REPO_ROOT) for name in names]
    for report in reports:
        render(report)
    return 0 if all(report.ok for report in reports) else 1


if __name__ == "__main__":
    raise SystemExit(main())
