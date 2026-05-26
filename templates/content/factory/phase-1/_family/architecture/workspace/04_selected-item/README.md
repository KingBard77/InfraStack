# Selected Item Workspace Section

## Purpose

Defines the selected-item editor for stage objects.

This section lets users inspect, move, resize, highlight, or reset selected visual objects when supported.

For editable visualizers, selection includes single-object selection, connector selection, and marquee-selected groups when implemented.

The selected-item baseline stays paired with Basic, Score Card, Sort Card, and Result Table when refreshing architecture workspace sections so usage help, selected-object wording, editable-state expectations, and the AWS-reference neutral hint chip treatment remain aligned.

## Before and after demo rule

The section demo should show both states:

- before: neutral hint chips that tell the user to select a draggable box or connector line
- after: dummy selected item values for name, X/Y position, width, height, and item actions

Render those states as two rows in one column, not side-by-side columns.

Final runtime packages must not persist selected state only in DOM classes. Selection, layout edits, connector edits, and restore behavior must use normalized state or documented import/export data.

## When to use

Use only when the stage has selectable or editable objects.

Skip this section when the workspace has no selectable cards, nodes, connectors, or objects.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`

## Expected DOM/class rhythm

Expected DOM IDs often include:

- `__DOM_PREFIX__SelectedEmpty`
- `__DOM_PREFIX__SelectedEditor`
- `__DOM_PREFIX__SelectedName`
- `__DOM_PREFIX__SelectedX`
- `__DOM_PREFIX__SelectedY`
- `__DOM_PREFIX__SelectedWidth`
- `__DOM_PREFIX__SelectedHeight`
- `__DOM_PREFIX__HighlightCard`
- `__DOM_PREFIX__ApplyCardSize`
- `__DOM_PREFIX__ResetCardSize`

Adapt names when the stage object is not a card.

When a connector is selected, the section may show connector adjustment guidance instead of X/Y/size fields. Keep connector selection synchronized with normalized connector override state.

Marquee selection and group movement do not need inspector fields for every selected object. A concise selected-count empty or summary state is acceptable when multiple objects are selected.

## Related CSS source files

- `section.css`

## Related JS helper files

- selected item state
- selected connector state
- selected group state
- marquee selection helper
- highlight helper
- keyboard movement helper
- undo history helper
- layout override helper
- resize helper when implemented
- connector anchor and bend helper when implemented

## Avoid list

- Do not show selected-item controls if nothing can be selected.
- Do not document keyboard or resize behavior unless implemented.
- Do not document connector anchor or bend handles unless implemented.
- Do not document marquee selection or undo unless implemented.
- Do not store selected state only in transient DOM classes.
- Do not make large visual boundaries fixed when smaller diagram cards are movable unless the tool documents why.
- Do not leave card terminology when the object is a node, flow, row, or section.

## Validation checklist

- Selected empty state appears when nothing is selected.
- Editor appears only when a valid object is selected.
- X/Y/size values match normalized state or layout overrides.
- Connector selection updates visible connector state and inspector guidance when connector editing exists.
- Keyboard behavior matches help text.
- Marquee-selected groups can move together with drag and keyboard when documented.
- Cmd/Ctrl+Z restores the previous persisted stage edit when documented.
- Export/restore preserves relevant layout edits.
- Export/restore preserves relevant connector edits.
