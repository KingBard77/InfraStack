# Table Export Workspace Section

## Purpose

Defines tabular breakdown, sorting, copy, CSV, report, and export controls for calculate-family tools.

Use it when users need to review or share line items behind the result.

## Baseline Reference

Use the AWS, Azure, and IBM Cloud cost calculators as the reference set. AWS supplies table/export behavior; Azure and IBM Cloud prove provider-native line items, JSON identity, and category/provider token cleanup.

## Expected Behavior

- Table rows must be generated from the normalized model.
- Sort and copy controls must operate on current rows.
- CSV export should match the visible table or clearly documented export schema.
- Export buttons must not appear unless implemented.
- Use the architecture-style output toolbar shell: `Sort` on the left, compact boxed actions on the right, and a separate tabs/table shell below.
- Default sort to `ID` when rows have a stable natural order. Other sort options should be explicit and reversible.
- Row copy buttons should be small, stable, and tied to the current row payload.
- Import JSON appears in the toolbar only when restore is implemented and validated.

## Typical UI

- architecture-style toolbar shell with `Sort` starting at `ID`
- compact action grid for report, CSV, JSON copy, JSON download, and optional JSON import
- output tabs that demonstrate Breakdown, Service Mix, Assumptions, and JSON views
- breakdown table
- sort control
- copy table action
- download CSV action
- optional print or report action
- copy JSON, download JSON, and optional import JSON actions when JSON is implemented

## Validation Checklist

- Table rows match summary totals.
- Sorting does not mutate source data incorrectly.
- CSV output contains current values.
- Export labels match actual file formats.
- Toolbar buttons are compact boxed controls, not oversized rounded pills.
- Sort dropdown width matches the closed control and does not create an oversized menu.
- Import JSON rebuilds the current model and rerenders tables when the action is visible.
