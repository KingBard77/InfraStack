#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd -- "$(dirname "$0")" && pwd)"
repo_root="$(cd -- "$script_dir/../.." && pwd)"

python3 "$repo_root/codex/tooling/cli.py" "$@"
