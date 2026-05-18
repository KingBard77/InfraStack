# Output Toolbar Workspace Section

## Purpose

Defines the assessment output toolbar: sort, copy, CSV, report, JSON, and optional import controls.

Use it when assessment output needs a stable review and export shell.

## Baseline Reference

Use `templates/content/tools/cis/assess-ubuntu-2204-cis/` for the Sort-first toolbar and compact action buttons.

## Expected Behavior

- `Sort` stays on the left.
- Default sort is `ID` when row order is stable.
- Action buttons are compact boxed controls.
- Export labels must match implemented file formats.
- Import JSON appears only when restore is implemented and validated.

## Validation Checklist

- Sort changes rerender the current row model.
- Copy and download actions use current result payloads.
- Disabled states are visible when no selected artifact is available.
- Toolbar fits mobile without clipping labels.
