# Result Summary Workspace Section

## Purpose

Defines the hidden-first result shell and summary area for a scanning-family tool.

Use it for score, grade, final target, status, metrics, evidence chips, and empty state messaging.

## Expected Behavior

- Result content is hidden on first refresh unless validated restore loads output.
- Empty state uses a dashed callout.
- Summary cards are generated from the current scan result payload.
- The section does not claim certification, exploitability, or full coverage.

## Validation Checklist

- Empty state is visible before scan.
- Result content becomes visible only after scan or restore.
- Summary values come from one normalized payload.
- No static score is presented as verified security.
