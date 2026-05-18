# Result Summary Workspace Section

## Purpose

Defines summary cards for the current assessment result.

Use it to show matched rows, scoped groups, selected item metadata, coverage, gaps, status, or review boundaries.

## Baseline Reference

Use `templates/content/tools/cis/assess-ubuntu-2204-cis/` for the generated result summary pattern.

## Expected Behavior

- Summary values must be generated from the normalized result model.
- Empty, loading, and generated states should be explicit.
- Summary copy must not claim compliance or security outcomes without validation.
- Selected item metadata should match the active artifact or row.

## Validation Checklist

- Counts match the visible and exported result.
- Summary cards update after every scope or sort change.
- Missing metadata is visible instead of silently hidden.
