"""Shared result and command helpers for InfraStack checks."""

from __future__ import annotations

import subprocess
from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class CheckReport:
    """Collect check messages and determine the command result."""

    name: str
    passes: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)
    metrics: list[str] = field(default_factory=list)

    def passed(self, message: str) -> None:
        """Record a successful check.

        Args:
            message: Human-readable success detail.
        """
        self.passes.append(message)

    def warned(self, message: str) -> None:
        """Record a non-blocking warning.

        Args:
            message: Human-readable warning detail.
        """
        self.warnings.append(message)

    def failed(self, message: str) -> None:
        """Record a blocking failure.

        Args:
            message: Human-readable failure detail.
        """
        self.errors.append(message)

    def measured(self, message: str) -> None:
        """Record an informational measurement.

        Args:
            message: Human-readable metric detail.
        """
        self.metrics.append(message)

    @property
    def ok(self) -> bool:
        """Return whether the report contains no failures."""
        return not self.errors


def run_command(command: list[str], cwd: Path, timeout: int = 120) -> tuple[int, str]:
    """Run a command and return its exit code and combined output.

    Args:
        command: Executable and arguments.
        cwd: Working directory.
        timeout: Maximum execution time in seconds.

    Returns:
        Exit code and combined standard output and error.
    """
    try:
        completed = subprocess.run(
            command,
            cwd=cwd,
            capture_output=True,
            check=False,
            text=True,
            timeout=timeout,
        )
    except (OSError, subprocess.TimeoutExpired) as error:
        return 1, str(error)

    output = "\n".join(part for part in (completed.stdout.strip(), completed.stderr.strip()) if part)
    return completed.returncode, output


def directory_bytes(path: Path) -> int:
    """Return the total file size under a directory.

    Args:
        path: Directory to measure.

    Returns:
        Total bytes for regular files below the path.
    """
    if not path.is_dir():
        return 0
    return sum(candidate.stat().st_size for candidate in path.rglob("*") if candidate.is_file())
