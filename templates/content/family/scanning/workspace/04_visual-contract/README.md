# Scanning Visual Contract Workspace Section

## Purpose

Defines the scanning-family visual and model contract that sits between shared `_base` workspace structure and final scanner tools.

Use this section when a scanner has visual output beyond plain target fields and evidence tables, such as posture rings, severity metrics, evidence cards, finding distribution, phase status, or scan coverage visuals.

This section does not replace result summary, table output, selected-item inspection, or JSON restore. It defines the normalized visual primitives those sections can render.

## Ownership

- `page.html.twig`: scanner-neutral visual contract markup source.
- `section.css`: reusable scanning visual primitives for status rings, evidence cards, metric cards, and finding rows.
- `section.js`: frontend helper and metadata registry for rendering visual contract state.
- `model-core.js`: pure model helpers for normalizing metrics, evidence, findings, status tones, and summaries.
- `manifest.yml`: section ownership, inputs, outputs, and validation expectations.
- `demo.html`: isolated contract preview with demo-only chrome.

## Boundary

`04_visual-contract` owns:

- normalized scan visual state
- posture or status ring primitives
- severity and evidence metric cards
- finding distribution rows
- scan phase and coverage visual grammar
- provider-neutral scanner result tones

`04_visual-contract` does not own:

- target input
- scan options
- selected finding inspector
- output toolbar
- evidence table shell
- JSON restore shell
- final scanner evidence facts

Those remain `_base`, scanning workspace, or final-tool responsibilities.

## Inspector Relationship

Selected finding, evidence row, target detail, or runtime editing behavior belongs to `04_selected-item` or a later dedicated inspector section. Do not hide inspector behavior inside this contract.

## Application Rule

Apply this section to scanning tools that need reusable visual scan state. Pure target-input plus table scanners may omit it during final assembly and record that omission as accepted divergence.
