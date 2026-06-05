# InfraStack Architecture Family Template

## Purpose

This family template is the reusable baseline for InfraStack architecture tools.

Use it for prompt-driven, stage-based, exportable, and editable visual workspaces such as:

- cloud architecture diagrams
- network topology diagrams
- firewall path diagrams
- request flow diagrams
- service dependency maps
- operations flow diagrams
- infrastructure visual planners
- security path diagrams

---

## Preferred Baseline Path

```text
templates/content/factory/phase-1/_family/architecture/
```

---

## Naming Rule

New architecture tools use a verb-led canonical identity:

```text
architecture_<content>_<group>
```

Examples:

- `architecture_vpc_aws`
- `architecture_vnet_azure`
- `architecture_firewall_path_network`

Folder slugs use the kebab-case form, such as `architecture-vpc-aws`.

Use `architecture_*`, `architecture-*`, and `Architecture ...` names for architecture family outputs.

Preserve existing stable slugs, IDs, classes, and exported keys unless a deliberate migration is part of the task.

---

## Reference Implementation

The current primary reference implementation is:

```text
templates/content/tools/aws/architecture-vpc-aws/
```

AWS VPC Architecture is a working reference.

It is not the reusable baseline.

The reusable baseline is this family template.

---

## Current Baseline Snapshot

The architecture baseline was refreshed on 2026-05-18.

This family source package and its namespace markers are now the current baseline:

```text
templates/content/factory/phase-1/_family/architecture/
templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/
```

Baseline requirements:

- `_base.00_shell` owns the common workspace shell, panel rhythm, and responsive frame.
- `_base.01_input-brief` owns the architecture prompt shell, helper rhythm, and body-only info marker helper.
- `_base.02_basic-settings` owns preset, region, availability zone or scope controls, visible native select wrappers, browser-owned select popups, no placeholder-chip overlay, preset description behavior, and body-only info marker helper.
- `_base.03_custom-settings` owns optional network layout, workload, and services/controls grouped custom controls.
- `04_visual-contract` owns stage title rhythm, diagram stage, helper chips, usage help, movement controls, connector hit targets, connector handles, preview and generated fit-to-view, model-reported SVG dimensions, readable card sizing and text wrapping, zoom, fullscreen, hide UI, Auto layout reset, canvas-overlay marquee selection, live marquee target highlighting, visual output, reusable engine-runtime reference, and reusable model-core reference.
- `04_selected-item` owns draggable-box and connector selected item empty states, movement hints, line-selection hints, and highlight/reset command rhythm.
- `_base.05_result-summary` owns advisory score, quality, status, readiness, risk, or assumption summary cards.
- `_base.06_output-toolbar` owns the Basic-height Sort dropdown, selected-label-only summary, and implemented export/import actions.
- `_base.07_table-output` owns Technical Inventory, secondary table cards, Prompt Notes, Pillar Breakdown, and Risk Level output shell.
- `_base.08_json-restore` owns JSON output, import, restore, and generated payload boundary.
- Common reusable section shape is composed from `templates/content/factory/phase-1/_base/workspace/`; architecture-owned behavior remains in `04_visual-contract` and `04_selected-item`.
- The full AWS source lives under `source/architecture-vpc-aws/` for traceability and freshness checks.

Output notice before generation:

```text
Generate an architecture diagram to review technical inventory, service mix, and exportable JSON.
```

Info marker rule:

- apply `More info` markers to helper/body text only
- do not apply markers to all headings, field labels, tab labels, button text, or every workspace text node

Table/export rule:

- Sort defaults to `ID`
- Basic tab dropdowns keep their native select wrapper, visible browser-owned popup, centered arrow chip, and 46px control height without placeholder chips; the Sort dropdown uses the same 46px control height and trigger-width menu but shows only the selected sort label and no placeholder chip
- generated output tabs are `Technical Inventory`, `Prompt Notes`, `Pillar Breakdown`, `Risk Level`, and `JSON`
- inventory columns are `#`, `Component`, `Placement`, `Purpose`, and `Action`
- secondary table cards may be used for routing, control, or domain summary rows when backed by normalized model data
- before/after section demos should stack as two rows in one column, not side-by-side columns
- standalone `demo.html` files own demo chrome separately from extracted section source, including any icon stylesheet, `demo-title`, `demo-title-icon`, `demo-title-text`, and an architecture placeholder icon such as `bi bi-diagram-3`
- `04_visual-contract` and `04_selected-item` demos should show before/after dummy states where practical
- `_base` table and JSON demos must show generated dummy inventory rows, secondary table rows, pillar rows, risk copy, and JSON output so future tools can see the expected output shape
- result table dummy rows may use placeholder model data, but the `Action` column must render copy-row buttons, not long text
- Pillar Breakdown and Risk Level are advisory model summaries; they must not claim compliance, certification, security validation, reliability validation, or production readiness beyond generated model facts

AWS VPC Architecture remains the working implementation reference. Use it for interaction grammar and helper behavior. Translate provider/domain wording, services, category/provider token lineage, icons, examples, and assumptions for final non-AWS tools.

Stage interaction baseline:

- diagram boxes are cursor-selectable, highlighted without hiding the grid, content, or connector paths, and movable when the model allows
- selected boxes update the inspector and persist layout changes through normalized state
- reset layout keeps the stable `ResetLayout` DOM hook but displays `Auto layout`, and clears generated layout plus connector overrides back to generated placement
- cursor marquee selection renders as a stage-canvas overlay instead of an SVG-owned rectangle, so it remains visible on the full CSS grid surface
- boxes intersected by cursor marquee selection live-highlight with `is-marquee-target` while dragging
- multi-box highlight state persists as `highlighted_node_ids` while `highlighted_node_id` remains a compatibility field
- connector paths keep fixed visual stroke and arrowhead sizing, expose invisible wide hit targets, and redraw when connected boxes move
- connector selection exposes anchor or bend handles when editable and persists overrides through JSON restore
- preview and generated renders use the same fit-to-stage path when no imported viewport is being restored
- generated models report real SVG diagram width and height so viewBox, zoom-to-fit, and PNG export are not fixed-crop guesses
- generated cards are sized so titles, subtitles, icon tiles, badges, handles, and connector paths stay inside readable bounds

---

## Required Final Tool Package

Every final architecture tool must be generated under:

```text
templates/content/tools/<category>/<tool-slug>/
```

A complete final architecture tool must include:

```text
assets/bin/model-core.js
assets/icon/
assets/img/post.html.twig
card.yml
content.md
custom.css
custom.js
meta.yml
tool.html.twig
```

Do not omit required files because this family template exists.

---

## Required Reading Order

Before creating a new architecture tool, read:

1. `AGENTS.md`
2. `codex/PROMPT.md`
3. `codex/DESIGN.md`
4. `templates/content/MAIN.md`
5. `templates/content/factory/phase-2/_content/MAIN.md`
6. `templates/content/tools/TOOLS.md`
7. `templates/content/factory/phase-1/_family/FAMILY.md`
8. `templates/content/factory/phase-1/_family/architecture/README.md`
9. `templates/content/factory/phase-1/_family/architecture/manifest.yml`
10. architecture source namespace markers in `templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/tool.html.twig`
11. architecture source namespace markers in `templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/custom.css`
12. architecture source namespace markers in `templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/custom.js`
13. architecture runtime assets under `templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/assets/bin/`
14. `templates/content/factory/phase-2/_content/scaffold/README.md`
15. relevant phase-2 content section folders under `templates/content/factory/phase-2/_content/sections/`

---

## Family Workspace Source

The architecture family source package lives at:

```text
templates/content/factory/phase-1/_family/architecture/source/architecture-vpc-aws/
```

Use that folder for architecture-specific source package grammar, state behavior, stage behavior, export behavior, and baseline reference selection.

The architecture workspace reference is:

```text
templates/content/tools/aws/architecture-vpc-aws/
```

The main sections source owns reusable content section structure.
The family source package owns architecture adaptation rules.
The main scaffold owns the package skeleton and default asset placeholders only; do not treat it as the workspace or support-content delivery source.

---

## Scaffold Content Sections

The architecture family uses the phase-2 content section patterns:

When a phase-2 content section is adapted into a final runtime package, apply the complete section contract: `content.md` structure, matching `section.css` visual behavior, and any `section.js` helper behavior when present. Final tool packages do not automatically load shared section CSS or JavaScript, so required card frames, heading divider lines, typography, tables, lists, details, FAQ, copy controls, citations, prompt terminals, or command terminals must be present in the final tool `custom.css` and `custom.js` unless a documented shared include exists.

```text
templates/content/factory/phase-2/_content/sections/01_overview/
templates/content/factory/phase-2/_content/sections/02_technical-details/
templates/content/factory/phase-2/_content/sections/03_example-prompts/
templates/content/factory/phase-2/_content/sections/04_tips-prompts/
templates/content/factory/phase-2/_content/sections/05_how-to-use/
templates/content/factory/phase-2/_content/sections/06_export-notes/
templates/content/factory/phase-2/_content/sections/07_faq/
templates/content/factory/phase-2/_content/sections/08_acronyms/
templates/content/factory/phase-2/_content/sections/11_glossary/
templates/content/factory/phase-2/_content/sections/10_references/
```

Use these sections to shape and deliver `content.md`. Do not stop at `templates/content/factory/phase-2/_content/scaffold/README.md`; the scaffold only defines the package skeleton.

Architecture tools should keep `03_example-prompts` as **Example Prompts**. Do not substitute `09_example-commands` unless the architecture tool also exposes literal command examples as a real supported workflow.

Choose either `08_acronyms` for abbreviation expansion or `11_glossary` for broader architecture terminology when useful; do not include both unless a deliberate exception is recorded.

Use `10_references` for complete factual content delivery and when the final architecture content includes source-backed citations. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Prompt terminal strip titles should stay centered and title case, for example `AWS VPC Prompt`.

The final content must still be tool-specific.

Do not ship generic family copy as final content.

---

## Architecture Workspace Sections

The architecture family composes shared `_base` source namespaces with architecture-owned section source:

```text
templates/content/factory/phase-1/_base/workspace/00_shell/
templates/content/factory/phase-1/_base/workspace/01_input-brief/
templates/content/factory/phase-1/_base/workspace/02_basic-settings/
templates/content/factory/phase-1/_base/workspace/03_custom-settings/
family.architecture.workspace.04_visual-contract markers in source/architecture-vpc-aws/{tool.html.twig,custom.css,custom.js}
family.architecture.workspace.04_selected-item markers in source/architecture-vpc-aws/{tool.html.twig,custom.css,custom.js}
templates/content/factory/phase-1/_base/workspace/05_result-summary/
templates/content/factory/phase-1/_base/workspace/06_output-toolbar/
templates/content/factory/phase-1/_base/workspace/07_table-output/
templates/content/factory/phase-1/_base/workspace/08_json-restore/
```

Use these sections to choose architecture behavior and shape `tool.html.twig`, `custom.css`, `custom.js`, and `assets/bin/model-core.js`.

Full copied AWS VPC Architecture source lives under `source/architecture-vpc-aws/` for traceability and freshness checks. It must compare cleanly against `templates/content/tools/aws/architecture-vpc-aws/` before new architecture tools are created. Architecture workspace CSS and JavaScript are namespace-owned inside that source package. Do not keep or recreate root `source/custom.css`, `source/custom.js`, or `source/tool.html.twig` snapshot files.

Standalone architecture demos keep their title/icon placeholder in `demo.html`. Do not move that demo chrome into `page.html.twig`, final tool packages, or namespace-marked runtime blocks.

Do not create a family-local `sections/` directory for architecture. Shared content section folders belong to `templates/content/factory/phase-2/_content/sections/`; architecture source namespace markers belong here.

---

## Architecture Workspace Flow

Default flow:

1. Prompt or preset input.
2. Basic controls.
3. Custom controls.
4. Selected item controls when objects are editable.
5. Architecture visual contract for stage title, diagram toolbar, stage, connector grammar, and viewport behavior.
6. Score/status summary.
7. Inventory, assessment tabs, notes, export, and JSON state.

---

## State Rule

Architecture tools should use one normalized state model.

The model should drive:

- prompt
- preset
- controls
- stage
- selected item
- layout overrides
- connector overrides
- inventory
- pillar breakdown
- risk level
- notes
- score
- export
- restore

Do not use scattered DOM state as the source of truth.

---

## Visualizer Interaction Standard

Editable architecture stages should treat the whole diagram as a workspace.

On first refresh, prompt-driven architecture tools should not directly create the real generated model or unlock output/export state.

Instead, render a blurred preset preview inside the stage with the overlay text:

```text
Choose a preset to generate diagram
```

The preview may use the default preset geometry as a visual hint, but it must remain separate from normalized generated state. Do not set exported payload, inventory, score, selected object, layout override, connector override, or output content state until the user chooses a preset or clicks the primary generate action.

When visual objects are editable:

- cards, nodes, tier bands, zones, subnets, grouping boxes, and container boxes should be selectable and movable unless a domain reason says otherwise
- selected objects should show a visible selected state using shape, border, ring, glow, or handles, not hue alone
- cursor drag on empty canvas should create a visible marquee selection rectangle when multiple objects can be selected
- dragging any selected object should move the selected group together
- arrow keys should move the selected object or selected group
- `Shift + Arrow` may move faster when implemented
- `Alt + Arrow` may resize a selected object when implemented
- `Cmd + Z` and `Ctrl + Z` should undo the previous persisted stage edit when layout editing exists
- selected-object focus should remain usable after generation, marquee selection, movement, and re-render
- layout and connector edits should persist through JSON export and restore

## Runtime Adapter Standard

The architecture source provides the stage grammar, but each final architecture tool must wire its adapter completely.

Required adapter behavior:

- mount the shared architecture engine runtime or provide equivalent behavior for every visible stage control
- call the same fit-to-stage path after first-refresh preview render and after generated render, unless restoring an imported viewport
- keep output, inventory, score, selected object, layout override, connector override, and export state locked until generation
- return model-level diagram width and height derived from generated content bounds
- use those diagram bounds for the SVG viewBox, rendered SVG dimensions, zoom-to-fit, and PNG export
- size cards so small-box titles and subtitles stay inside the box without clipping or overlap
- define connector source ratios, target ratios, bends, or equivalent routing for connector families that need reserved gaps
- redraw affected connectors whenever connected cards move, resize, auto-layout reset, or restore
- export and restore `viewport`, `selection`, `layout_overrides`, and `connector_overrides` whenever the stage is editable
- keep non-editable boundary frames behind normal cards and connector paths
- keep Result Summary behavior in `_base.05_result-summary`; architecture visual contract work must not override the shared summary section shape

Do not make large row bands, tier boxes, subnet boxes, or zone boxes static while smaller boxes are draggable unless the tool explicitly documents that constraint.

---

## Visual Layout And Connector Standard

Default architecture diagrams should be readable before the user edits anything.

The detailed diagram layout quality baseline lives in `templates/content/factory/phase-1/_family/architecture/FAMILY.md` and is represented structurally in `manifest.yml`.

Use that source for spacing, alignment, symmetry, rounded cards and containers, soft structural borders, shadows, typography, first-render fit, orthogonal connectors, centered trunks, outside-edge side anchors for mirrored columns, inner-side anchors for horizontal peer paths, and preset consistency.

Primary color identity is intentionally not part of this family baseline. Apply the approved category/provider token lineage separately without changing the layout quality contract.

---

## Export Rule

For visual stateful tools, support these exports when practical:

1. PNG
2. SVG
3. JSON

PNG is for sharing.

SVG is for scalable diagram reuse.

JSON is for restoring editable workspace state.

Do not claim export support unless implemented.

---

## Namespace Rule

Each final tool must have its own namespace.

CSS root pattern:

```css
.<tool-slug>-tool
```

Do not leave inherited prefixes from another provider or domain.

---

## Adaptation Rule

When adapting the architecture family:

- keep the workflow grammar
- adapt provider/domain labels
- adapt icons
- adapt metadata
- adapt card copy
- adapt examples
- adapt category/provider token lineage
- adapt score logic
- adapt parser terms
- adapt model-core identity
- adapt export identity

Do not copy stale AWS, Azure, GCP, or other provider language into a new domain.

---

## Validation

Before final delivery, validate:

- all required final tool files exist
- all required first-line markers exist
- final tool package is under `templates/content/tools/<category>/<tool-slug>/`
- no root-level `post.html.twig` exists
- `assets/img/post.html.twig` exists
- `assets/bin/model-core.js` exists
- namespace is tool-specific
- CSS is scoped
- JavaScript DOM IDs match Twig
- model-core tool ID matches JSON export identity
- visible labels are domain-native
- content does not leak stale provider terms
- export controls match implemented behavior
- JSON restore validates tool ID and version
- selected item editor appears only when selectable items exist
- marquee selection, keyboard movement, and undo shortcuts match the usage help
- all editable visual objects that appear movable are actually movable
- connector routes use clear lanes and avoid boxes, labels, and crowded boundaries
- mirrored column fan-out and tier-to-tier connector routes use outside-edge side anchors when that keeps labels clear
- horizontal peer, standby, failover, or replication connector routes keep natural inner-side anchors
