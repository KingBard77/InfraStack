#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd -- "$(dirname "$0")" && pwd)"
repo_root="$(cd -- "$script_dir/../.." && pwd)"
template_dir="$repo_root/codex/devops/template"
task_root="${INFRASTACK_CODEX_TASK_ROOT:-$repo_root/codex/devops/tasks}"
allowed_kinds="create change fix audit validate performance platform"

usage() {
  echo "Usage: codex/bin/_init.sh <task_name> [--kind create|change|fix|audit|validate|performance|platform] [--dry-run]" >&2
  echo "Kind is inferred when the task name starts with an allowed kind; otherwise it defaults to change." >&2
  exit "${1:-1}"
}

task_name=""
kind=""
dry_run=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --kind)
      shift
      kind="${1:-}"
      [[ -n "$kind" ]] || usage
      shift
      ;;
    --dry-run)
      dry_run=true
      shift
      ;;
    -h|--help)
      usage 0
      ;;
    *)
      [[ -z "$task_name" ]] || usage
      task_name="$1"
      shift
      ;;
  esac
done

[[ -n "$task_name" ]] || usage

if [[ ! "$task_name" =~ ^[a-z0-9]+(_[a-z0-9]+)*(_[0-9]{8})?$ ]]; then
  echo "Task name must use action-first snake_case with an optional YYYYMMDD suffix: $task_name" >&2
  exit 1
fi

case "$task_name" in
  processing|archived|archieved|abandoned|abondoned)
    echo "Task name is reserved: $task_name" >&2
    exit 1
    ;;
esac

if [[ -z "$kind" ]]; then
  inferred_kind="${task_name%%_*}"
  if [[ " $allowed_kinds " == *" $inferred_kind "* ]]; then
    kind="$inferred_kind"
  else
    kind="change"
  fi
fi

if [[ " $allowed_kinds " != *" $kind "* ]]; then
  echo "Unsupported kind: $kind" >&2
  usage
fi

task_dir="$task_root/processing/$task_name"

for existing_dir in \
  "$task_root/processing/$task_name" \
  "$task_root/archived/$task_name" \
  "$task_root/abandoned/$task_name"
do
  if [[ -e "$existing_dir" ]]; then
    echo "Task workspace already exists: $existing_dir" >&2
    exit 1
  fi
done

[[ -d "$template_dir" ]] || {
  echo "Task template not found: $template_dir" >&2
  exit 1
}

if [[ "$dry_run" == true ]]; then
  printf 'kind=%s\npath=%s\n' "$kind" "$task_dir"
  exit 0
fi

mkdir -p "$task_root/processing" "$task_root/archived" "$task_root/abandoned" "$task_dir"

created_at="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
task_title="${task_name//_/ }"

for source_file in "$template_dir"/*.md; do
  destination_file="$task_dir/$(basename "$source_file")"
  sed \
    -e "s/__TASK_NAME__/$task_name/g" \
    -e "s/__TASK_KIND__/$kind/g" \
    -e "s/__TASK_TITLE__/$task_title/g" \
    -e "s/__CREATED_AT__/$created_at/g" \
    "$source_file" > "$destination_file"
done

printf '%s\n' "$task_dir"
