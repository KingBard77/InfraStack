# Result Table Workspace Section

## Purpose

Standard `09_result-table` slot for the architecture family.

This section owns generated inventory, secondary output tables, prompt notes, advisory Pillar Breakdown and Risk Level tabs, JSON output, and JSON restore input.

The sort toolbar belongs to `08_sort-card`. The advisory score card belongs to `07_score-card`.

## Before and after demo rule

The section demo should show both states:

- before: the exact dashed notice, `Generate an architecture diagram to review technical inventory, service mix, and exportable JSON.`
- after: dummy Technical Inventory rows with copy-row action buttons, secondary table rows, Prompt Notes, Pillar Breakdown, Risk Level, and JSON output

Render those states as two rows in one column, not side-by-side columns.

Final runtime packages must drive rows, tabs, JSON, and restore state from one normalized model.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`

## Expected DOM/class rhythm

Common DOM IDs:

- `__DOM_PREFIX__OutputEmpty`
- `__DOM_PREFIX__OutputContent`
- `__DOM_PREFIX__InventoryTableBody`
- `__DOM_PREFIX__RoutingTableBody`
- `__DOM_PREFIX__ControlTableBody`
- `__DOM_PREFIX__PromptSummary`
- `__DOM_PREFIX__KeywordList`
- `__DOM_PREFIX__AssumptionList`
- `__DOM_PREFIX__ModelList`
- `__DOM_PREFIX__ProsList`
- `__DOM_PREFIX__ConsList`
- `__DOM_PREFIX__PillarBreakdown`
- `__DOM_PREFIX__RiskLevel`
- `__DOM_PREFIX__JsonOutput`
- `__DOM_PREFIX__ImportJson`

Common classes:

- `.tool-output-shell`
- `.tool-empty-state`
- `.__PREFIX__-tab-btn`
- `.__PREFIX__-tab-panel`
- `.__PREFIX__-table`
- `.__PREFIX__-table-section-grid`
- `.__PREFIX__-table-card-secondary`
- `.__PREFIX__-json-output`

## Related CSS source files

- `section.css`

## Related JS helper files

- output renderer
- inventory renderer
- secondary table renderer
- advisory pillar breakdown renderer
- advisory risk level renderer
- prompt notes renderer
- JSON exporter
- JSON importer
- tab activation helpers
- layout and connector override serializer when the stage is editable

## Avoid list

- Do not duplicate the score card or sort toolbar here.
- Do not put long text in the `Action` column; use copy-row buttons for inventory rows.
- Do not show JSON import if restore validation is not implemented.
- Do not store raw DOM HTML in JSON.
- Do not omit layout overrides, connector overrides, or editable visual state from JSON when the stage supports editing.
- Do not let inventory contradict the stage.
- Do not allow stale prompt notes after control changes.
- Do not write Pillar Breakdown or Risk Level as compliance, certification, security validation, reliability validation, or production readiness proof.
- Do not add secondary tables whose rows contradict the generated diagram or JSON payload.

## Validation checklist

- Inventory rows match generated model.
- Action cells render copy-row buttons when inventory rows exist.
- Secondary table sections render from normalized model data or are omitted.
- Prompt notes match parser assumptions.
- Pillar Breakdown and Risk Level render from the normalized model.
- Assessment tabs use advisory wording and do not overclaim validation.
- JSON output matches normalized state.
- JSON import validates tool ID and version.
- JSON import restores stage layout and connector edits when those edits exist.
- Output tabs have matching panels and accessible state.
- Pre-generate output shows only the dashed generate notice box, without a surrounding white shell.
