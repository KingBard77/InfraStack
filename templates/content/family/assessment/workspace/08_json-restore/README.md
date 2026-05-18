# JSON Output Workspace Section

## Purpose

Defines structured JSON snapshot output for assessment-family tools.

Use it when the current assessment result needs to be copied, downloaded, archived, compared, or optionally restored.

## Baseline Reference

Use `templates/content/tools/cis/assess-ubuntu-2204-cis/` for JSON snapshot generation and highlighted JSON panel behavior.

## Expected Behavior

- JSON must be generated from the same normalized result as summary, tables, selected artifact, and exports.
- User-sourced content must be escaped before display.
- JSON import controls appear only when restore is implemented and validated.
- Exported payloads should include tool identity, version, filters, summary, rows, rollups, and selected item metadata when practical.

## Validation Checklist

- JSON matches current visible state.
- Copy and download use the current JSON payload.
- Restore validation exists when Import JSON is visible.
- Payload identity prevents accidental cross-tool restore.
