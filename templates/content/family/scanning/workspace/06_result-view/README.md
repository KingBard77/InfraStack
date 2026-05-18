# Result Tabs Workspace Section

## Purpose

Defines the scanning-family bordered tabs shell and evidence table panels.

Use it for findings, headers, files, cookies, transport details, raw evidence, assumptions, and JSON panels.

## Expected Behavior

- Tabs control real panels.
- Findings table has stable row IDs and accessible copy actions when implemented.
- Tables scroll horizontally instead of compressing or overlapping headers.
- JSON panel reflects the current scan payload.

## Validation Checklist

- Tab buttons and panels have matching ARIA attributes.
- Only the active panel is visible.
- Tables remain readable in narrow containers.
- Copy controls have accessible labels.
