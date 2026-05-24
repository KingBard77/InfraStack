# Output Toolbar Workspace Section

## Purpose

Defines the shared output toolbar shape for InfraStack family workspaces.

Use it for generated output areas that need a stable sort control and five implemented export or restore actions.

This section owns layout rhythm only. Families and final tools own output meaning, sort behavior, export payloads, restore validation, button handlers, and domain labels.

## When To Use

Use when a family or final tool presents sortable generated output such as a table, inventory, finding list, operation list, or artifact list.

Skip when the output has no real sorting behavior or fewer than five implemented actions.

## Compatibility

The canonical base source is `06_output-toolbar`.

Existing family sections may keep names such as `06_sort-card`, `07_table-export`, or `08_sort-card` when compatibility requires it. When the same toolbar rhythm applies, use this source as the visual baseline.

## Required Placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__SORT_OPTION_TWO_VALUE__`
- `__SORT_OPTION_TWO_LABEL__`
- `__SORT_OPTION_THREE_VALUE__`
- `__SORT_OPTION_THREE_LABEL__`
- `__SORT_OPTION_FOUR_VALUE__`
- `__SORT_OPTION_FOUR_LABEL__`
- `__SORT_OPTION_FIVE_VALUE__`
- `__SORT_OPTION_FIVE_LABEL__`
- `__OUTPUT_ACTION_ONE_ID__`
- `__OUTPUT_ACTION_ONE_ICON__`
- `__OUTPUT_ACTION_ONE_LABEL__`
- `__OUTPUT_ACTION_TWO_ID__`
- `__OUTPUT_ACTION_TWO_ICON__`
- `__OUTPUT_ACTION_TWO_LABEL__`
- `__OUTPUT_ACTION_THREE_ID__`
- `__OUTPUT_ACTION_THREE_ICON__`
- `__OUTPUT_ACTION_THREE_LABEL__`
- `__OUTPUT_ACTION_FOUR_ID__`
- `__OUTPUT_ACTION_FOUR_ICON__`
- `__OUTPUT_ACTION_FOUR_LABEL__`
- `__OUTPUT_ACTION_FIVE_ID__`
- `__OUTPUT_ACTION_FIVE_ICON__`
- `__OUTPUT_ACTION_FIVE_LABEL__`

## Expected DOM IDs

- `__DOM_PREFIX__Sort`
- `__DOM_PREFIX__SortSelect`
- `__DOM_PREFIX__SortSummary`
- `__OUTPUT_ACTION_ONE_ID__`
- `__OUTPUT_ACTION_TWO_ID__`
- `__OUTPUT_ACTION_THREE_ID__`
- `__OUTPUT_ACTION_FOUR_ID__`
- `__OUTPUT_ACTION_FIVE_ID__`

Families may rename sort IDs during adaptation, for example to preserve an existing `InventorySort` contract. The visible default and hidden value must remain `ID` and `id`.

## Expected Classes

- `.__PREFIX__-toolbar-shell`
- `.__PREFIX__-toolbar`
- `.__PREFIX__-toolbar-main`
- `.__PREFIX__-sort-label`
- `.__PREFIX__-sort-wrap`
- `.__PREFIX__-sort-select`
- `.__PREFIX__-sort-summary`
- `.__PREFIX__-sort-menu`
- `.__PREFIX__-sort-grid`
- `.__PREFIX__-sort-option`
- `.__PREFIX__-toolbar-actions`
- `.__PREFIX__-action-btn`
- `.tool-output-toolbar`
- `.tool-output-actions`
- `.tool-action-btn`

## Preference Selection

This section has one canonical source. Do not create separate base sections for architecture, calculate, shell, scanning, or assessment output toolbars.

Before applying the section, choose the matching preference from `../manifest.yml`.

| Family | Toolbar emphasis |
| --- | --- |
| `architecture` | visual exports, JSON copy, JSON download, JSON restore |
| `calculate` | report/table exports, JSON copy, JSON download, JSON restore |
| `scanning` | report/table exports, evidence JSON, JSON restore |
| `shell` | report/table exports, command JSON, JSON restore |
| `assessment` | report/table exports, assessment JSON, JSON restore |
| fallback | export, download, copy JSON, download JSON, import JSON |

## Hard Rules

- The toolbar must have one sort control and exactly five action buttons.
- The five buttons sit on the right on desktop.
- Every action button must include an icon.
- Buttons use compact square-like corners, not pill corners.
- The sort default must visibly start as `ID`.
- The hidden sort value must start as `id`.
- The first option in the custom dropdown must be `ID`.
- The dropdown menu must be custom CSS, not a native select popup.
- The dropdown menu must match the width of the closed sort summary.
- Toolbar, sort wrapper, and sort menu containers must keep `overflow: visible`.
- The open dropdown must layer above nearby cards instead of hiding behind them.
- Mobile layout may stack, but the sort control and all buttons must stay full width and tappable.

## Validation Checklist

- Sort summary text is `ID`.
- Hidden sort input value is `id`.
- First sort option is `ID` with value `id`.
- Action button count is five.
- Each action button contains a Bootstrap Icon element.
- Button corners are compact, not `999px`.
- Dropdown width matches the closed summary width.
- Dropdown has a z-index above following cards and ancestors do not clip it.
- Mobile layout collapses without horizontal overflow.
