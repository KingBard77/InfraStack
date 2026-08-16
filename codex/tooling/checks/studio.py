"""Studio registry, package, JavaScript, and test checks."""

from __future__ import annotations

import json
from pathlib import Path

from .common import CheckReport, run_command


def load_json(path: Path, report: CheckReport) -> dict:
    """Load an object-shaped JSON file into a check report.

    Args:
        path: JSON file to load.
        report: Report receiving failures.

    Returns:
        Parsed object, or an empty object after failure.
    """
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        report.failed(f"invalid JSON {path}: {error}")
        return {}
    if not isinstance(value, dict):
        report.failed(f"JSON root must be an object: {path}")
        return {}
    report.passed(f"valid JSON: {path.name}")
    return value


def run(repo_root: Path) -> CheckReport:
    """Validate current Studio registries, packages, JavaScript, and tests.

    Args:
        repo_root: InfraStack repository root.

    Returns:
        Studio check report.
    """
    report = CheckReport("studio")
    package_root = repo_root / "assets/studio/packages"
    package_registry = load_json(package_root / "registry.json", report)
    packages = package_registry.get("packages", [])

    if not packages:
        report.failed("Studio package registry contains no packages")

    for entry in packages:
        package_id = entry.get("id", "unknown")
        for key in ("manifest", "templates", "result", "content"):
            relative_path = entry.get(key)
            if not isinstance(relative_path, str) or not relative_path:
                report.failed(f"{package_id} has no {key} path")
                continue
            target = package_root / relative_path
            if target.is_file():
                report.passed(f"{package_id} {key}: {relative_path}")
            else:
                report.failed(f"{package_id} missing {key}: {relative_path}")

        manifest_path = package_root / str(entry.get("manifest", ""))
        if manifest_path.is_file():
            manifest = load_json(manifest_path, report)
            for key in ("id", "family", "provider", "slug", "engine", "entries"):
                if key not in manifest:
                    report.failed(f"{package_id} manifest missing {key}")

        for key in ("templates", "result"):
            data_path = package_root / str(entry.get(key, ""))
            if data_path.is_file():
                load_json(data_path, report)

    library_root = repo_root / "assets/data/studio/libraries"
    icon_root = repo_root / "assets/icons/studio/libraries"
    library_registry = load_json(library_root / "registry.json", report)
    libraries = library_registry.get("libraries", [])

    if not libraries:
        report.failed("Studio library registry contains no libraries")

    for library in libraries:
        library_id = library.get("id", "unknown")
        catalogue_path = library_root / str(library.get("catalog", ""))
        icons_path = icon_root / str(library.get("icons", ""))
        if catalogue_path.is_file():
            load_json(catalogue_path, report)
        else:
            report.failed(f"{library_id} catalogue missing: {catalogue_path}")
        if icons_path.is_dir():
            report.passed(f"{library_id} icon root present")
        else:
            report.failed(f"{library_id} icon root missing: {icons_path}")

    javascript_files = sorted((repo_root / "assets/js/studio").rglob("*.js"))
    javascript_files.extend(sorted((repo_root / "assets/js/layout").glob("*.js")))
    if not javascript_files:
        report.failed("no Studio JavaScript files found")
    for javascript_file in javascript_files:
        exit_code, output = run_command(["node", "--check", str(javascript_file)], repo_root)
        if exit_code == 0:
            report.passed(f"JavaScript syntax: {javascript_file.relative_to(repo_root)}")
        else:
            report.failed(f"JavaScript syntax failed: {javascript_file.relative_to(repo_root)}: {output}")

    tests = sorted((repo_root / "tests").glob("*.test.cjs"))
    if not tests:
        report.failed("no Node tests found")
    else:
        exit_code, output = run_command(["node", "--test", *[str(test) for test in tests]], repo_root, timeout=180)
        if exit_code == 0:
            report.passed(f"Node tests passed: {len(tests)} files")
        else:
            report.failed(f"Node tests failed: {output[-2000:]}")

    return report
