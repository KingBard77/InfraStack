# Architecture Family Workspace

## Purpose

This folder defines the family-specific workspace grammar for architecture tools.

Use it when a requested tool is a diagram, topology, flow, dependency map, visual planner, or editable visual model.

The shared scaffold owns reusable content rhythm.
This workspace source composes shared `_base` workspace sections with architecture-owned visual and inspector behavior.
The phase-2 content sections own content delivery.

## Reference Workspace

Primary reference implementation:

```text
templates/content/tools/aws/architecture-vpc-aws/
```

Reference aliases:

- AWS VPC Architecture
- AWS VPC architecture
- aws-vpc-architecture
- architecture-vpc-aws

Use the reference to understand working interaction grammar, not to copy provider text.

## Current Baseline

The workspace baseline was refreshed on 2026-05-18.

Baseline rules:

- `workspace/manifest.yml` `workspace_namespaces` is the active composition source.
- Common shell, input, settings, summary, toolbar, table, and JSON restore sections are sourced from `templates/content/factory/phase-1/_base/workspace/`.
- Architecture-owned section folders are `04_visual-contract` and `04_selected-item`.
- Workspace source inherits the platform two-font system: `Nunito` through `--heading-font` for headings and `Roboto` through `--default-font` for body, labels, controls, tables, and tool UI.
- Full copied AWS VPC Architecture source lives under `templates/content/factory/phase-1/_family/architecture/source/` for traceability only. Do not audit this as active source.
- Workspace CSS and JavaScript are section-owned; do not use root `workspace/custom.css`, root `workspace/custom.js`, or full runtime copies inside section folders.
- Extraction anchors use composed `_base` and architecture namespace markers in `tool.html.twig`, `custom.css`, and `custom.js`.
- Each `section.css` keeps only the minimal shared demo foundation plus selectors for its section. Each `section.js` records the matching custom.js line ranges, DOM IDs, classes, variables, functions, and behavior ownership for that section.
- Body/helper text may receive `More info` markers. Headings, field labels, tab labels, button text, and every-text-node marking are out of standard.
- Before generation, the output shell shows only the dashed notice: `Generate an architecture diagram to review technical inventory, service mix, and exportable JSON.`
- After generation, output uses architecture visual contract, selected-item inspector, `_base` summary, Sort toolbar, export actions, tabs, inventory table, secondary table cards, prompt notes, advisory pillar breakdown, advisory risk level, and JSON output.
- Before/after section demos should stack as two rows in one column, not side-by-side columns.
- Standalone `demo.html` files own demo chrome separately from extracted section source. Each demo should include any icon stylesheet it needs, a visible `demo-title-icon`, `demo-title-text`, and an architecture placeholder icon such as `bi bi-diagram-3`.
- `04_visual-contract` and `04_selected-item` demos should show before/after dummy states where practical.
- `_base` table and JSON demos show generated dummy inventory rows, secondary table rows, pillar rows, risk copy, and JSON output to demonstrate how the output should appear after generation.
- Result table dummy rows may use placeholder model data, but the `Action` column must render copy-row buttons, not long text.
- Sort defaults to `ID`; available baseline modes are `ID`, `A-Z`, `Component`, `Placement`, and `Purpose`.
- Basic tab dropdowns keep their wrapper, custom styled menu, trigger-width dropdown menu, and 46px control height without placeholder chips; the Sort dropdown uses the same 46px control height and trigger-width menu but shows only the selected sort label and no placeholder chip.
- Assessment tabs use `Pillar Breakdown` and `Risk Level`. They summarize the generated model and must not be written as compliance, certification, security validation, reliability validation, or production readiness proof.
- Selected-item empty states use draggable-box language when the stage contains movable boxes.
- Connector-capable stages also use line-selection language and keep connector selection synchronized with normalized connector overrides.
- Usage help and helper chips must describe only implemented stage behavior.
- Connector lines keep fixed visual stroke and arrowhead sizing, expose invisible hit targets, support connector selection, expose anchor or bend handles when editable, and redraw when connected boxes move.
- Generated diagram layout quality follows `templates/content/factory/phase-1/_family/architecture/FAMILY.md`; use the workspace manifest for structured checks.

Use AWS wording only for AWS tools or baseline demos. For final tools in other providers or domains, keep the same workflow grammar and translate visible terms.

## Composition Order

When creating an architecture-family tool:

1. Read `templates/content/factory/phase-1/_family/architecture/README.md`.
2. Read `templates/content/factory/phase-1/_family/architecture/manifest.yml`.
3. Read this workspace source.
4. Read `templates/content/factory/phase-1/_family/architecture/workspace/manifest.yml`.
5. Read `templates/content/factory/phase-2/_content/scaffold/README.md` for the package skeleton.
6. Read `templates/content/factory/phase-2/_content/sections/manifest.yml` and the phase-2 content section folders under `templates/content/factory/phase-2/_content/sections/` for content delivery.
7. Generate the final tool package under `templates/content/tools/<category>/<tool-slug>/`.

## Workspace Shape

Architecture workspaces use this baseline flow:

1. Prompt or preset seeds a normalized visual model.
2. Basic controls set provider, region, zone, scope, or topology defaults.
3. Custom controls refine network, workload, service, security, label, and output choices.
4. Architecture visual contract renders the stage, viewport controls, connector grammar, and generated visual model.
5. Selected-item controls edit movable stage objects and connector handles when the diagram is editable.
6. Score or status summary describes advisory quality and assumptions.
7. Sort and export controls operate on generated output.
8. Inventory, assessment tabs, notes, JSON output, and JSON restore derive from the same model.

## Section Use

Use phase-2 content sections from:

When a phase-2 content section is adapted into a final runtime package, apply the complete section contract: `content.md` structure, matching `section.css` visual behavior, and any `section.js` helper behavior when present. Final tool packages do not automatically load shared section CSS or JavaScript, so required card frames, heading divider lines, typography, tables, lists, details, FAQ, copy controls, citations, prompt terminals, or command terminals must be present in the final tool `custom.css` and `custom.js` unless a documented shared include exists.

```text
templates/content/factory/phase-2/_content/sections/
```

Use architecture workspace sections from:

```text
templates/content/factory/phase-1/_family/architecture/workspace/
```

Architecture content adaptation:

- `content/03_example-prompts` stays prompt-led with centered title-case terminal titles.
- `content/04_tips-prompts` stays prompt-led.
- `content/10_references` is used for complete factual content delivery and source-backed citations. Every in-text citation links to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Composed architecture workspace sections:

- `_base.00_shell` provides the common workspace shell.
- `_base.01_input-brief` remains the primary prompt shell.
- `_base.02_basic-settings` provides architecture preset, region, zone, or scope controls with baseline select wrappers, custom dropdown enhancement, and no placeholder-chip overlay.
- `_base.03_custom-settings` provides grouped architecture controls.
- `04_visual-contract` provides the diagram stage, connector grammar, viewport controls, generated visual model, engine-runtime reference, and model-core reference.
- `04_selected-item` is required when visual objects or connectors are movable or selectable.
- `_base.05_result-summary` provides advisory score, quality, status, risk, or assumption summary.
- `_base.06_output-toolbar` provides Sort, PNG, SVG, JSON copy/download, and JSON import action source.
- `_base.07_table-output` provides inventory, secondary tables, prompt notes, pillar breakdown, and risk level output shell.
- `_base.08_json-restore` provides JSON output, import, restore, and normalized state boundary.

Do not put the full AWS `custom.css` or `custom.js` runtime back into individual workspace section files. If the runtime changes, update the matching extracted section source and keep `source/` as reference-only traceability.

Do not create a family-local `sections/` directory.

## Output Expectations

An architecture-family tool must preserve editable state when state exists.

The normalized model should drive:

- prompt
- preset
- controls
- stage objects
- selected object
- layout overrides
- connector overrides
- inventory
- pillar breakdown
- risk level
- notes
- score or status
- export
- JSON restore

Do not make the visible diagram and JSON output diverge.
