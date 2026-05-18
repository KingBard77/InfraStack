# Table Export Workspace Section

## Purpose

Defines the scanning-family output toolbar for sort, report/PDF, CSV, JSON copy/download, and optional JSON import.

Use it with result rows that have stable IDs and exportable evidence.

## Expected Behavior

- Sort defaults to `ID` when row order is stable.
- Action buttons are compact and boxed.
- Import JSON appears only when restore rebuilds the current query and output.
- Row copy uses accessible icon-only buttons in final tools when the table has a copy column.

## Validation Checklist

- Sort summary, hidden value, active option, and row order stay in sync.
- CSV/JSON exports come from the current result payload.
- Import control is hidden or absent unless implemented.
- Toolbar wraps cleanly on narrow containers.
