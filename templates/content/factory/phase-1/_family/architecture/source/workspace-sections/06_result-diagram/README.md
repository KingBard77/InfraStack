# Result Diagram Workspace Section

## Purpose

Defines the generated architecture diagram stage, toolbar buttons, and diagram controls.

This section supports zoom, fit, actual size, fullscreen with fixed-position fallback, reset layout, hide UI, whole-diagram highlight, usage help, Ctrl/Cmd wheel zoom, undo, and related stage actions.

It also owns the stage interaction contract for selectable boxes and editable connectors: click targets, cursor states, selected rings, grid-safe highlight, normalized layout state, connector hit targets, connector handles, connector override state, and redraw behavior when connected boxes move.

It also defines the first-refresh preview gate for generated visualizers: show a blurred preset preview with the overlay text `Choose a preset to generate diagram`, while keeping the real generated/output state empty until preset selection or the primary generate action.

## Before and after demo rule

The section demo should show both states:

- before: empty or blurred preview state that does not unlock generated output
- after: dummy generated diagram state with toolbar, stage canvas, and visible architecture boxes

Render those states as two rows in one column, not side-by-side columns.

Final runtime packages must render the diagram from normalized model state and must keep layout edits, connector edits, selection, and export/restore data synchronized.

The verified runtime pattern renders the diagram directly on the grid stage. Do not add a rear diagram frame, extra white backing panel, or hidden gray panel behind the diagram.

## When to use

Use when the workspace has a diagram stage or visual canvas.

Adapt for non-SVG visual outputs as needed.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`

## Expected DOM/class rhythm

Common DOM IDs:

- `__DOM_PREFIX__ZoomControl`
- `__DOM_PREFIX__ZoomInput`
- `__DOM_PREFIX__ZoomOut`
- `__DOM_PREFIX__ZoomIn`
- `__DOM_PREFIX__ZoomFit`
- `__DOM_PREFIX__ZoomActual`
- `__DOM_PREFIX__UndoStageEdit`
- `__DOM_PREFIX__HighlightAll`
- `__DOM_PREFIX__Fullscreen`
- `__DOM_PREFIX__ResetLayout`
- `__DOM_PREFIX__ZoomHideUi`
- `__DOM_PREFIX__UsageHelpButton`
- `__DOM_PREFIX__UsageHelpPopup`

Common classes:

- `.tool-action-btn`
- `.tool-action-btn-secondary`
- `.tool-stage-toolbar`
- `.tool-helper-chip`
- `.__PREFIX__-stage-preview`
- `.__PREFIX__-stage-preview-overlay`
- `.__PREFIX__-stage-preview-panel`
- `.__PREFIX__-stage-ui-hidden`
- `.is-stage-ui-hidden`
- `.__PREFIX__-stage-expanded`

## Related CSS source files

- `section.css`

## Related JS helper files

- zoom helpers
- fit-to-view helper
- fullscreen helper
- layout reset helper
- stage UI visibility helper
- preset preview render and clear helpers
- whole-diagram highlight helper when implemented
- keyboard usage help helper
- undo shortcut helper when stage edits are persisted
- Ctrl/Cmd wheel zoom helper when stage zoom is implemented

Standard toolbar order:

`ZoomOut`, `ZoomInput`, `ZoomIn`, `ZoomFit`, `ZoomActual`, `UndoStageEdit`, `HighlightAll`, `ZoomHideUi`, `Fullscreen`, `ResetLayout`.

Boundary or large architecture boxes should move their contained diagram items together. Resizing changes only the selected boundary box.

Generated SVG bounds must expand with moved or resized content so diagram items do not disappear behind the stage grid background after layout edits.

Every selectable card, group, or node must include an AWS-style transparent hitbox that covers the full item bounds with `pointer-events: all`; visible text, icons, and `foreignObject` content must not be the only click target.

On click or tap, every diagram item must visibly enter the selected state. Resize handles must be hidden until their item is selected. Small-card title and subtitle text must wrap inside the card without ellipsis, clipping, or overflow.

The stage grid is a persistent CSS background behind generated SVG content. Do not bake the grid into generated model state, connector state, or SVG item data.

Connectors must render as persistent SVG paths with thin fixed visual strokes, fixed-size arrow markers, and separate transparent hit targets around the visible path. Connector selection must keep connector paths visible, expose anchor or bend handles when editable, persist connector overrides in JSON restore data, and redraw paths while connected boxes move or resize.

The family CSS supports both the cloud tool class rhythm (`__PREFIX__-stage-ui-hidden`) and the Cisco/IBM generic stage class rhythm (`is-stage-ui-hidden`) because both are present in verified architecture tools.

## Avoid list

- Do not show toolbar buttons that are not implemented.
- Do not claim fullscreen support if only fallback behavior exists without explanation.
- Do not make zoom controls too small for users.
- Do not show whole-diagram highlight, undo, or usage-help shortcuts unless behavior exists.
- Do not leave broken export buttons.
- Do not set the real generated model, output, inventory, score, selected object, layout override, or connector override state during the first-refresh preview.

## Validation checklist

- Every button has a matching event listener.
- Zoom input supports documented range and increments.
- Reset layout actually clears layout overrides.
- Fullscreen behavior works or fails gracefully.
- Fullscreen updates the icon on native `fullscreenchange` and uses the expanded fallback when native fullscreen is unavailable.
- Zoom input handles `change`, `Enter`, and `Escape`; Ctrl/Cmd + wheel can be wired to zoom by 1%.
- Usage help lists marquee selection, movement, resize, and undo only when implemented.
- Cmd/Ctrl+Z works when documented for persisted stage edits.
- Click/tap selection works from text, icon, blank card body, and boundary areas.
- Click/tap connector selection works from the invisible connector hit target.
- Connector arrowheads keep fixed user-space sizing while the stage zoom changes.
- Connector anchor and bend handles update normalized connector override state when implemented.
- Moving a connected box redraws affected connector paths.
- Only selected items show resize handles.
- Small diagram cards wrap labels without ellipsis, clipping, or overflow.
- Stage grid remains a persistent CSS background and is not stored as generated model data.
- First refresh can show a blurred preset preview without unlocking output/export state.
- Preset selection or primary generate replaces the preview with the real generated stage.
- Toolbar wraps safely on small screens.
