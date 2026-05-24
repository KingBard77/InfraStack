# Calculate Visual Contract Workspace Section

## Purpose

Defines the calculate-family visual and model contract that sits between shared `_base` workspace structure and a final calculator tool.

Use this section when a calculator has visual output beyond plain form fields and a table, such as summary metric cards, cost driver cards, rings, component visuals, service mix panels, formula maps, or selectable estimate components.

This section does not replace `_base/workspace/05_result-summary`, `_base/workspace/07_table-output`, or JSON restore. It defines what calculate-specific state and visual primitives those shared sections should render.

## Ownership

- `page.html.twig`: provider-neutral visual contract markup source.
- `section.css`: reusable calculate visual primitives for metric cards, driver cards, formula rows, and visual shells.
- `section.js`: frontend helper and metadata registry for rendering a visual contract from normalized calculate state.
- `model-core.js`: pure model helpers for normalizing metrics, components, formulas, totals, and contract summaries.
- `manifest.yml`: section ownership, inputs, outputs, and validation expectations.
- `demo.html`: isolated contract preview with demo-only chrome.

## Boundary

`04_visual-contract` owns:

- normalized estimate visual state
- primary metric and supporting metrics
- cost or capacity driver cards
- formula and assumption rows
- status/tone mapping for visual output
- provider-neutral result visualization grammar

`04_visual-contract` does not own:

- page shell
- primary input brief
- settings panels
- output toolbar
- table frame
- JSON restore shell
- final provider pricing copy

Those remain `_base`, family-specific, or final-tool responsibilities.

## Inspector Relationship

Selected item or runtime editing behavior still belongs to `04_selected-item` until a separate `04_visual-inspector` section is deliberately added.

If a final calculator lets users select a card, row, component, or formula and edit it in a details panel, wire the selection behavior through an inspector layer. Do not hide inspector behavior inside this contract.

## Application Rule

Apply this section to future calculate tools when the tool needs a reusable visual result or model contract. If a calculator is pure form plus table output, it may omit this section during final assembly and record that choice as an accepted divergence.
