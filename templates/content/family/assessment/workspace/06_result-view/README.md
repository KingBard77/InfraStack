# Result View Workspace Section

## Purpose

Standard `06_result-view` slot for the assessment family. This section combines the main findings table with rollups derived from the same normalized assessment rows.

The slot name is shared across all active families so the tool factory can assemble workspaces consistently while each family keeps domain-specific controls and output behavior.

## Component: Findings Table

# Findings Table Workspace Section

## Purpose

Defines the main assessment rows table.

Use it for controls, findings, checks, requirements, risks, maturity rows, or review items.

## Baseline Reference

Use `templates/content/tools/cis/assess-ubuntu-2204-cis/` for fixed table layout, selected row highlighting, and row copy icon behavior.

## Expected Behavior

- Table rows must be generated from the normalized result model.
- Stable row order defaults to `ID`.
- Row copy actions copy the current row payload.
- Table headings should be domain-native and fit the content width.
- Empty states should explain the current filter result.

## Validation Checklist

- Row count matches summary and CSV output.
- Copy buttons target the correct row after sorting.
- Long IDs, titles, and paths wrap instead of clipping.
- Selected rows are visible without relying on color alone.

## Component: Group Rollups

# Group Rollups Workspace Section

## Purpose

Defines assessment group rollups.

Use it for sections, families, severity bands, status groups, owners, profiles, maturity stages, or category summaries.

## Baseline Reference

Use `templates/content/tools/cis/assess-ubuntu-2204-cis/` for section rollup table behavior.

## Expected Behavior

- Rollups must be derived from the current filtered rows.
- Rollup counts should match current result scope.
- Empty groups should be shown only when useful and documented.
- Rollups should help users narrow or interpret the current result.

## Validation Checklist

- Rollup counts match the normalized result.
- Group labels are readable at mobile widths.
- Rollups rerender with scope and query changes.
