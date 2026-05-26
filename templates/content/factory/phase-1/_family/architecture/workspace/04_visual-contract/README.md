# Architecture Visual Contract Workspace Section

## Purpose

Defines the architecture-family visual and model contract that sits between shared `_base` workspace structure and final architecture tools.

Use this section for diagram, topology, flow, dependency, and visual model surfaces that need a reusable stage contract beyond plain input, settings, summary, table, and JSON shells.

This section does not replace `_base/workspace/05_result-summary`, `_base/workspace/06_output-toolbar`, `_base/workspace/07_table-output`, or `_base/workspace/08_json-restore`. It defines the architecture-specific stage, connector, viewport, selection, and normalized visual model primitives those shared sections coordinate with.

## Ownership

- `page.html.twig`: architecture-neutral stage toolbar, stage body, stage footer, and usage help markup source.
- `section.css`: reusable architecture stage, diagram, connector, handle, viewport, and helper-chip visual primitives.
- `engine-runtime.js`: reusable architecture stage interaction engine for selection, cursor, drag, resize, keyboard, zoom, fullscreen, layout, connector, and viewport state.
- `section.js`: frontend metadata registry for architecture visual contract source ownership.
- `model-core.js`: pure model helpers for architecture export, import, restore, and normalized diagram state.
- `manifest.yml`: section ownership, model inputs, outputs, and validation expectations.
- `demo.html`: isolated contract preview with demo-only chrome.

## Boundary

`04_visual-contract` owns:

- normalized architecture visual state
- diagram stage and viewport primitives
- selectable diagram cards and boundaries
- connector path, hit-target, anchor, and bend-handle grammar
- connector visual sizing for base, active, selected, hit-target, anchor-handle, and bend-handle states
- rendered connector paths use the shared `diagram-connector`, `diagram-connector-active`, and `diagram-connector-hit-target` classes so provider SVG styles cannot bypass the contract
- connector arrowheads use the shared fixed `11x11` `userSpaceOnUse` marker geometry, not stroke-scaled marker units
- zoom, fit, fullscreen, hide UI, reset layout, and usage help surface
- soft before-generate preset preview blur with the diagram remaining legible behind the overlay
- shared interaction runtime for cursor state, click selection, canvas-overlay marquee selection, live marquee target highlighting, keyboard movement, stage undo, viewport state, layout overrides, and connector override hooks
- stable `ResetLayout` DOM hook with visible `Auto layout` copy for generated-placement reset behavior
- multi-box highlight state persisted as `highlighted_node_ids`, with `highlighted_node_id` kept for compatibility
- pure model-core reference for export and restore boundaries

`04_visual-contract` does not own:

- primary prompt input
- basic settings
- custom settings
- selected item inspector fields
- output toolbar actions
- table shell
- JSON restore shell
- provider or domain service facts

Those remain `_base`, `04_selected-item`, final tool logic, or provider/domain-specific packages.

## Inspector Relationship

Selected box, connector, boundary, and stage item editing belongs to `04_selected-item`. The visual contract exposes selectable stage primitives and selected-state hooks, but inspector controls stay separate.

## Application Rule

Apply this section to every architecture-family visual workspace. Pure nonvisual planning tools should not use the architecture family.
