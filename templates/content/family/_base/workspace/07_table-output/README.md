# Table Output Workspace Section

## Purpose

Defines the shared tabbed output shell, table frame, empty state, and row-action rhythm for InfraStack family workspaces.

Use it after the result summary and output toolbar when a generated result needs detailed tables, supporting sections, and a JSON payload.

This section owns layout rhythm only. Families and final tools own rows, columns, sort behavior, copy payloads, export payloads, restore validation, and domain copy.

## When To Use

Use when a family or final tool shows generated table output, evidence rows, inventory rows, line items, field summaries, assumptions, notes, risks, advantages, disadvantages, or JSON.

Skip only when the tool has no row-oriented or structured output surface.

## Current Runtime References Checked

- Architecture tools use five top-level output tabs: table first, notes, pillars, risk, and JSON last.
- Calculate tools use strong table frames for breakdown, service mix, assumptions, and JSON, but usually need one more top-level section when this baseline is reapplied.
- Scanning tools use multiple tables and evidence sections, but some sections are grouped under one tab; this baseline keeps those sections explicit.
- Shell tools often place several command, preview, operation, warning, and JSON sections under fewer tabs; this baseline keeps the first section table-oriented and JSON last when adapted.
- Assessment tools already use table-first output, sections/script support panels, and JSON last.

## Required Placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__TABLE_ARIA_LABEL__`
- `__TABLE_EMPTY_TEXT__`
- `__TABLE_TAB_ONE_LABEL__`
- `__TABLE_TAB_ONE_ICON__`
- `__TABLE_TAB_TWO_LABEL__`
- `__TABLE_TAB_TWO_ICON__`
- `__TABLE_TAB_THREE_LABEL__`
- `__TABLE_TAB_THREE_ICON__`
- `__TABLE_TAB_FOUR_LABEL__`
- `__TABLE_TAB_FOUR_ICON__`
- `__TABLE_TAB_FIVE_LABEL__`
- `__TABLE_TAB_FIVE_ICON__`
- `__TABLE_PRIMARY_TITLE__`
- `__TABLE_PRIMARY_COL_TWO__`
- `__TABLE_PRIMARY_COL_THREE__`
- `__TABLE_PRIMARY_COL_FOUR__`
- `__TABLE_PRIMARY_EMPTY__`
- `__TABLE_SECONDARY_TITLE__`
- `__TABLE_SECONDARY_COL_TWO__`
- `__TABLE_SECONDARY_COL_THREE__`
- `__TABLE_SECONDARY_COL_FOUR__`
- `__TABLE_SECONDARY_EMPTY__`
- `__TABLE_TERTIARY_TITLE__`
- `__TABLE_TERTIARY_COL_TWO__`
- `__TABLE_TERTIARY_COL_THREE__`
- `__TABLE_TERTIARY_COL_FOUR__`
- `__TABLE_TERTIARY_EMPTY__`
- `__TABLE_EXTRA_TITLE__`
- `__TABLE_EXTRA_COL_TWO__`
- `__TABLE_EXTRA_COL_THREE__`
- `__TABLE_EXTRA_COL_FOUR__`
- `__TABLE_EXTRA_EMPTY__`
- `__TABLE_NOTES_TITLE__`
- `__TABLE_NOTE_ONE_TITLE__`
- `__TABLE_NOTE_ONE_COPY__`
- `__TABLE_NOTE_TWO_TITLE__`
- `__TABLE_NOTE_TWO_COPY__`
- `__TABLE_NOTE_THREE_TITLE__`
- `__TABLE_NOTE_THREE_COPY__`

## Expected DOM IDs

- `__DOM_PREFIX__TableOutputShell`
- `__DOM_PREFIX__TableEmpty`
- `__DOM_PREFIX__TableTabOne`
- `__DOM_PREFIX__TableTabTwo`
- `__DOM_PREFIX__TableTabThree`
- `__DOM_PREFIX__TableTabFour`
- `__DOM_PREFIX__TableTabFive`
- `__DOM_PREFIX__TableTabJson`
- `__DOM_PREFIX__TablePanelOne`
- `__DOM_PREFIX__TablePanelTwo`
- `__DOM_PREFIX__TablePanelThree`
- `__DOM_PREFIX__TablePanelFour`
- `__DOM_PREFIX__TablePanelFive`
- `__DOM_PREFIX__TablePanelJson`
- `__DOM_PREFIX__PrimaryTableBody`
- `__DOM_PREFIX__SecondaryTableBody`
- `__DOM_PREFIX__TertiaryTableBody`
- `__DOM_PREFIX__ExtraTableBody`
- `__DOM_PREFIX__JsonOutput`

Families should rename or replace these IDs with final runtime IDs during adaptation.

## Expected Classes

- `.__PREFIX__-table-output-shell`
- `.__PREFIX__-table-empty`
- `.__PREFIX__-table-tabs`
- `.__PREFIX__-table-tab-btn`
- `.__PREFIX__-table-tab-icon`
- `.__PREFIX__-table-panel`
- `.__PREFIX__-section-card`
- `.__PREFIX__-section-title`
- `.__PREFIX__-table-wrap`
- `.__PREFIX__-output-table`
- `.__PREFIX__-table-cell-text`
- `.__PREFIX__-cell-clamp`
- `.__PREFIX__-rownum-head`
- `.__PREFIX__-rownum-cell`
- `.__PREFIX__-status-head`
- `.__PREFIX__-status-cell`
- `.__PREFIX__-action-head`
- `.__PREFIX__-action-cell`
- `.__PREFIX__-row-copy-btn`
- `.__PREFIX__-empty-row`
- `.__PREFIX__-empty-block`
- `.__PREFIX__-note-grid`
- `.__PREFIX__-note-card`
- `.__PREFIX__-note-title`
- `.__PREFIX__-note-copy`
- `.__PREFIX__-json-panel`
- `.__PREFIX__-json-head`
- `.__PREFIX__-json-title`
- `.__PREFIX__-json-output`

## Preference Selection

This section has one canonical source. Do not create separate base sections for architecture, calculate, shell, scanning, or assessment table outputs.

Before applying the section, choose the matching preference from `../manifest.yml`.

| Family | Table output emphasis |
| --- | --- |
| `architecture` | technical inventory, prompt notes, pillar breakdown, risk level, JSON |
| `calculate` | line-item breakdown, service mix, assumptions, recommendations, JSON |
| `scanning` | findings, header matrix, files/cookies, evidence notes, JSON |
| `shell` | operation summary, command notes, warnings, permission/field tables, JSON |
| `assessment` | controls, sections, selected script, scope notes, JSON |
| fallback | primary rows, detail rows, assumptions, notes, JSON |

## Hard Rules

- Use at least five top-level tab sections.
- Keep the tab section align right on desktop.
- Keep the tab section on one line only; if tabs exceed the available width, the tab section itself must scroll horizontally instead of wrapping.
- Every tab button must be rounded and include an icon.
- Table output tabs must stay flat: use border/background/color for state, not shadow or lifted transform.
- The first tab must be a table section.
- Use the fifth tab/panel as an optional extra placeholder section when a family needs one more output section before JSON.
- The last tab must be JSON.
- Every section must have a visible title inside the section card, with output under that title.
- Tables should use a small number of meaningful columns; avoid wide, boring spreadsheet layouts.
- The first table column must be `#` and centered.
- Middle table columns must use logical start alignment, not centered alignment.
- Status-like label columns such as `Status`, `Signal`, `Severity`, `Criticality`, `Health`, `State`, `Result`, or `Level` must center the matching `th` and `td` cells.
- The final table column must be the row action column and centered.
- The final row action column must be sticky when a table has multiple columns and scrolls horizontally.
- The sticky action column must stay flat without side shadow.
- Row copy actions must be icon-only buttons with accessible labels, not visible `Copy` text.
- Generated row text should be wrapped in `.__PREFIX__-table-cell-text` or `.__PREFIX__-cell-clamp` and clamped to 2-3 lines.
- Empty states must stay inside the table/output frame.
- Mobile layout must keep tabs on one horizontally scrollable line, tables horizontally scrollable when needed, and JSON readable.

## Validation Checklist

- Tab order starts with a table and ends with JSON.
- Five or more tabs exist after adaptation.
- Every tab button has an icon.
- Tab buttons stay on a single horizontal line and scroll inside the tab section when needed.
- Tab buttons and sticky action columns do not use box shadows or lift transforms.
- Each panel has one visible title before the output.
- Primary table first column is `#` and centered.
- Middle table columns use logical start alignment.
- Status-like label columns have centered headers and cells.
- Row action cells are centered and use icon-only copy buttons.
- Row action cells remain sticky when the table has multiple columns and scrolls horizontally.
- Row text is clamped to 2-3 lines.
- Empty rows do not break table layout.
- JSON payload matches export/restore state where applicable.
- No fake row action, export, restore, or copy behavior is shown in final runtime tools.

## Regression Guard

- Do not reintroduce tab shadows, active-tab lift, focus glow shadows, or sticky action-column side shadows in this base.
- When this base is reapplied to final tools, the runtime CSS must override older tool-local active tab rules such as `.tool-tab-btn.active` or `.<slug>-tab-btn.active` if they set `box-shadow` or `transform`.
- Active output tab state should remain visible through border, background, and text color only.
- Sticky action cells should remain visually separated by the table border/background, not by a shadow.
