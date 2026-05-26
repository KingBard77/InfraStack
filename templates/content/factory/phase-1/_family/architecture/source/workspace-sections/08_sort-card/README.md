# Sort Card Workspace Section

## Purpose

Standard `08_sort-card` slot for the architecture family.

This section owns the output sort control and export action toolbar that sits above generated result tables.

It is separate from `09_result-table` so sort behavior can be reused without forcing table, JSON, or assessment markup into the same source section.

## Before and after demo rule

The section demo should show both states:

- before: toolbar disabled or absent while no generated model exists
- after: enabled Sort control, selected `ID` label, and real export buttons that correspond to implemented runtime behavior

Render those states as two rows in one column, not side-by-side columns.

Final runtime packages must not show export buttons unless the export action is implemented.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`

## Expected DOM/class rhythm

Expected DOM IDs:

- `__DOM_PREFIX__InventorySortSelect`
- `__DOM_PREFIX__InventorySortSummary`
- `__DOM_PREFIX__InventorySort`
- `__DOM_PREFIX__ExportPng`
- `__DOM_PREFIX__DownloadSvg`
- `__DOM_PREFIX__CopyJson`
- `__DOM_PREFIX__DownloadJson`
- `__DOM_PREFIX__ImportJsonButton`

Expected classes:

- `.tool-output-toolbar`
- `.tool-output-actions`
- `.__PREFIX__-sort-label`
- `.__PREFIX__-sort-wrap`
- `.__PREFIX__-sort-select`
- `.__PREFIX__-sort-summary`
- `.__PREFIX__-sort-menu`
- `.__PREFIX__-sort-grid`
- `.__PREFIX__-sort-option`

## Related CSS source files

- `section.css`

## Related JS helper files

- inventory sort helper
- custom sort dropdown helper
- export action bindings
- import action trigger

## Avoid list

- Do not shrink the Sort dropdown below the Basic control height.
- Do not add a placeholder chip or `Sort by` text inside the Sort trigger.
- Do not show buttons for unsupported exports.
- Do not let Sort mutate the normalized model; it only changes table ordering.

## Validation checklist

- Sort defaults to `ID`.
- Sort trigger height matches the Basic 46px control rhythm.
- Sort menu width follows the trigger width.
- Sort summary shows only the selected sort label.
- Export/import buttons match implemented runtime actions.
