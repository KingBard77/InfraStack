# Architecture Family Contract

This file is the source of truth for the current architecture family baseline.

Baseline snapshot: `2026-05-18`.

## Source Files

- `README.md`: family explanation and final package expectations.
- `manifest.yml`: structured baseline metadata and validation rules.
- `source/architecture-vpc-aws/`: full copied AWS VPC Architecture source snapshot for traceability and freshness checks.
- `source package demo.html`: source package grammar.
- `family manifest source_namespaces`: structured workspace section metadata.
- `family.<family>.workspace.04_visual-contract`: architecture visual and model contract source.
- `family.<family>.workspace.04_selected-item`: selected object and connector inspector source.
- `templates/content/factory/phase-2/_content/scaffold/README.md`: package skeleton source.
- `templates/content/factory/phase-2/_content/sections/`: shared content delivery section source.
- `templates/content/factory/phase-2/_content/sections/10_references/`: shared source-backed citation and References section source when final content cites sources.

## Reference

Working reference implementation:

```text
templates/content/tools/aws/architecture-vpc-aws/
```

Use it for interaction grammar and implementation quality.

Do not copy AWS-visible wording, services, examples, icons, category/provider token lineage, or assumptions into non-AWS tools.

## Current Baseline

Composed workspace baseline:

```text
source: templates/content/tools/aws/architecture-vpc-aws/
snapshot: templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/
shared source package: templates/content/factory/phase-1/_base/workspace/
architecture-owned sections: family.architecture.workspace.04_visual-contract and family.architecture.workspace.04_selected-item namespace markers inside the source package
engine-runtime reference: templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/assets/bin/engine-runtime.js
model-core reference: templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/assets/bin/model-core.js
package scaffold: templates/content/factory/phase-2/_content/scaffold/
content sections: templates/content/factory/phase-2/_content/sections/
```

The full copied source snapshot is reference-only and must compare cleanly against `templates/content/tools/aws/architecture-vpc-aws/` before new architecture tools are created. Common source namespaces are sourced from `_base/workspace` through `family manifest source_namespaces`; architecture workspace owns only the visual contract and selected-item inspector namespace markers.

- `_base.00_shell`: common workspace shell, panel rhythm, and responsive frame.
- `_base.01_input-brief`: prompt shell, helper body text, and body-only info marker helper.
- `_base.02_basic-settings`: preset, region, availability zone or scope controls, native select wrapper, no custom dropdown enhancement, no placeholder-chip overlay, preset helper text, and body-only info marker helper.
- `_base.03_custom-settings`: network layout, workload, and services/controls grouped custom controls.
- `04_visual-contract`: diagram stage, toolbar, helper chips, usage help, movement controls, connector controls, preview and generated fit-to-view, model-reported SVG dimensions, readable card sizing and text wrapping, zoom, fullscreen, hide UI, Auto layout reset, canvas-overlay marquee selection, live marquee target highlighting, visual output, reusable engine-runtime reference, and reusable model-core reference.
- `04_selected-item`: selected draggable-box or connector inspector and empty-state hint chips.
- `_base.05_result-summary`: advisory score, quality, status, readiness, risk, or assumption summary card.
- `_base.06_output-toolbar`: Basic-height Sort dropdown, selected-label-only sort summary, and implemented export/import actions.
- `_base.07_table-output`: Technical Inventory, secondary table cards, Prompt Notes, Pillar Breakdown, and Risk Level output shell.
- `_base.08_json-restore`: JSON output, JSON import, restore, and generated payload boundary.

## Diagram Layout Quality Baseline

This is the architecture-family source of truth for generated diagram structure.

Apply it to architecture, topology, flow, dependency, cloud, network, security path, and editable visual model tools.

Primary color identity is intentionally outside this family baseline. Final tools must use the category/provider token lineage and visual weight rules from `templates/content/MAIN.md`, but color changes must not weaken the layout, spacing, connector, typography, or preset consistency rules below.

Default generated diagrams must:

- use a minimal modern architecture-infographic style
- keep the main traffic path centered against the generated diagram
- align top-level flow boxes on a clean edge or ingress lane
- keep edge or ingress controls above the main network, region, VPC, VNet, or equivalent boundary
- keep all container gaps, subnet gaps, and repeated section gaps visually equal
- keep two-zone or two-AZ layouts symmetrical unless the model explicitly says otherwise
- use balanced whitespace inside outer boundaries, zones, subnets, and cards
- use rounded corners in the 16px to 20px range for primary cards and containers
- use thin soft-blue structural borders and soft shadows so the diagram reads cleanly without heavy decoration
- use bold headers, smaller muted subtitles, and predictable text hierarchy
- keep text clear of borders, badges, resize handles, connector paths, and neighboring content
- keep small-box text wrapped inside the box without ellipsis, clipping, or overflow
- on click or tap, every diagram item must enter a visible selected state; only selected items may show resize handles
- cursor marquee selection must render from the stage canvas overlay, not as an SVG-owned rectangle, so the marquee remains visible across the full CSS grid surface and is not clipped below or outside the SVG drawing area
- boxes intersected by cursor marquee selection must receive a live `is-marquee-target` highlight while dragging
- multi-selected boxes must be highlightable as a set and persisted as `highlighted_node_ids`; keep `highlighted_node_id` as a compatibility field when present
- auto-fit first generated views from rendered diagram bounds when the stage size is known
- auto-fit first-refresh preview views from the same rendered diagram bounds when a blurred preview is shown
- expose diagram width and height from the generated model or adapter so the SVG viewBox, PNG export, and zoom-to-fit use the actual content bounds
- size generated cards so title, subtitle, icon tiles, badges, resize handles, and connector paths do not clip, overlap, or escape their boxes

Generated connectors must:

- be persistent SVG paths, not transient overlay lines
- prefer straight orthogonal routing with clean 90-degree bends
- keep thin visual strokes with consistent caps and joins
- keep fixed arrowhead sizing independent from stage zoom
- render invisible wide hit targets so connector lines are cursor-selectable
- expose connector anchor or bend handles when connector editing is implemented
- use centered trunks for shared ingress or fan-out paths
- route branches through reserved gaps or gutters before landing on targets
- land on target card centers unless a side anchor is clearer
- for mirrored left/right column diagrams, use outside-edge side anchors for vertical fan-out and tier-to-tier paths so left columns enter left-center and right columns enter right-center
- keep horizontal peer, standby, failover, or replication connectors on the natural inner sides when the relationship spans columns
- avoid crossing boxes, labels, badges, and handles where practical
- preserve connector anchors and bend overrides through JSON when connector editing exists
- redraw affected paths whenever connected boxes move or resize
- define source ratios, target ratios, bend points, or an equivalent routing contract for every generated connector family that would otherwise cross labels or land flush against card borders
- keep connector routing and marker sizing stable across preview, generated, restored, zoomed, dragged, and resized states

Preset archetypes must:

- reuse the same visual grammar, spacing rhythm, connector style, typography, radius, and shadow treatment
- adapt only the generated content, service mix, labels, and provider/domain terms
- avoid one-off layout shortcuts that make one preset look lower quality than another
- expand width or height for extra zones, hybrid rails, or service rails without breaking alignment

## Runtime Adapter Contract

Architecture tools may use different domain models, but the final runtime adapter must implement the same architecture stage contract.

Required adapter behavior:

- mount the shared architecture engine runtime or provide equivalent behavior for selection, drag, resize, keyboard movement, zoom, fullscreen, hide UI, reset layout, undo, and connector editing when those features are shown
- render the blurred first-refresh preview without unlocking output, inventory, score, selected object, layout override, connector override, or export state
- call the same fit-to-stage path after preview render and generated render when no imported viewport is being restored
- preserve imported viewport values instead of auto-fitting over a restored JSON viewport
- build the model with real `diagram.width` and `diagram.height` values derived from generated content bounds
- update the SVG viewBox, rendered SVG dimensions, zoom-to-fit calculation, and PNG export dimensions from those model bounds
- keep compact-card title and subtitle text inside the card bounds without hidden overflow or ellipsis
- ensure connector source/target anchors, bend points, and redraw behavior remain valid after node movement, resizing, reset layout, and JSON restore
- export and restore `viewport`, `selection`, `layout_overrides`, and `connector_overrides` whenever the stage is editable
- keep boundary or grouping frames behind draggable cards and connector paths unless the final tool intentionally makes those frames editable
- keep Result Summary implementation in `_base.05_result-summary`; do not use the architecture visual contract to override the shared Result Summary shape

## Non-Negotiables

- Basic and Custom Settings dropdowns must remain real visible native `<select>` controls. Do not hide native selects or replace them with enhanced-select controls, custom dropdown/details menus, listbox buttons, hidden option rows, or custom option scrollbars. Architecture source and final runtime validation must fail stale `custom-dropdown`, `custom-native-select`, `select-control` on converted selects, `enhanced-select`, and native-select `display: none` regressions.
- Apply `More info` markers to helper/body text only.
- Do not apply info markers to all headings, field labels, tab labels, button text, or every workspace text node.
- Keep the pre-generate output notice exact:

```text
Generate an architecture diagram to review technical inventory, service mix, and exportable JSON.
```

- Before generation, show only the dashed generate notice box in the output area.
- After generation, use the architecture visual contract, selected-item inspector, `_base` result summary, Sort toolbar, export actions, output tabs, inventory table, prompt notes, advisory pillar breakdown, advisory risk level, and JSON output.
- Sort defaults to `ID`.
- Basic tab dropdowns keep their native select wrapper, visible browser-owned popup, centered arrow chip, and 46px control height without placeholder chips; the Sort dropdown uses the same 46px control height and trigger-width menu but shows only the selected sort label and no placeholder chip.
- Output tabs are `Technical Inventory`, `Prompt Notes`, `Pillar Breakdown`, `Risk Level`, and `JSON` unless a domain-specific label change is documented.
- Inventory table columns are `#`, `Component`, `Placement`, `Purpose`, and `Action`.
- Secondary output tables may be used for routing, control, or domain summary rows when those rows are backed by normalized model data.
- Before/after section demos should stack as two rows in one column, not side-by-side columns.
- Standalone `demo.html` files must own demo chrome separately from architecture runtime extraction. Include any icon stylesheet needed by the demo, render `demo-title` with `demo-title-icon` and `demo-title-text`, and use an architecture placeholder icon such as `bi bi-diagram-3`.
- `source package `demo.html` visual-contract state` and `source package `demo.html` selected-item state` should show before/after dummy states where practical.
- `_base` table and JSON demos must open or clearly demonstrate generated dummy inventory rows, secondary table rows, pillar rows, risk copy, and JSON output.
- Result table dummy rows may use placeholder model data, but the `Action` column must render copy-row buttons, not long text.
- Pillar Breakdown and Risk Level are advisory model summaries. They must not claim compliance, certification, security validation, reliability validation, or production readiness beyond the generated model facts.
- Selected-item empty states use draggable-box wording when the stage contains movable boxes.
- Connector-capable stages also expose line-selection wording and keep connector selection synchronized with the inspector.
- Generated-placement reset actions keep the stable `ResetLayout` DOM ID but display `Auto layout` to describe the behavior clearly.
- Usage help and helper chips must describe only implemented behavior.
- Example prompt terminal titles stay centered and title case, such as `AWS VPC Prompt`.
- Source-backed citations use `templates/content/factory/phase-2/_content/sections/10_references/` and link each in-text citation to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Tool behavior and trust claims must match implemented code and validation.

## Final Tool Rule

The family baseline is not a runtime package.

Read `templates/content/factory/phase-2/_content/scaffold/README.md` for the package skeleton. Read `templates/content/factory/phase-2/_content/sections/` for content delivery. Read architecture source namespace markers for workspace delivery.

Copy or adapt the relevant section patterns into the final tool-local `tool.html.twig`, `custom.css`, `custom.js`, and `assets/bin/model-core.js`.

Keep the final tool independently understandable, namespaced, exportable, restorable when state exists, and provider/domain-native.
