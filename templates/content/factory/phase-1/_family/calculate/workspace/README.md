# Calculate Family Workspace

## Purpose

This folder defines the family-specific workspace grammar for calculate tools.

Use it when a requested tool turns visible inputs, quantities, assumptions, rates, or configuration choices into computed output.

The shared scaffold owns reusable content rhythm.
This workspace source owns calculate-specific workspace sections and calculator behavior. Common workspace shape is sourced from `templates/content/factory/phase-1/_base/workspace/`.

Workspace source inherits the platform two-font system: `Nunito` through `--heading-font` for headings and titles, and `Roboto` through `--default-font` for body, labels, controls, tables, and tool UI. Do not add other proportional font families in calculate section CSS, demos, or final runtime copies.

## Reference Workspaces

Current working reference set:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

Reference aliases:

- AWS Cost Calculator
- AWS cost calculator
- aws-cost-calculator
- calculate-cost-aws
- Azure Cost Calculator
- Azure cost calculator
- calculate-cost-azure
- IBM Cloud Cost Calculator
- IBM cost calculator
- calculate-cost-ibm

Use AWS to understand working input-to-result grammar, table/export shell structure, result summary balance, JSON restore behavior, and support-content rhythm. Use Azure and IBM Cloud to understand provider adaptation, service catalog replacement, category/provider token application, chart palette replacement, and copied-token cleanup. Do not copy provider or pricing text into unrelated calculators.

## Baseline Source

When a user asks to baseline a calculate tool, copy the full stabilized runtime source into:

```text
templates/content/factory/phase-1/_family/calculate/source/
```

The copied snapshot is reference-only. Do not audit this as active source. Do not import it directly from final runtime tools.

Reusable calculate-specific behavior belongs in the matching workspace section files:

```text
templates/content/factory/phase-1/_family/calculate/workspace/<section>/page.html.twig
templates/content/factory/phase-1/_family/calculate/workspace/<section>/section.css
templates/content/factory/phase-1/_family/calculate/workspace/<section>/section.js
templates/content/factory/phase-1/_family/calculate/workspace/<section>/demo.html
```

The current section source is derived from the three cloud cost calculators: AWS supplies the structural reference, while Azure and IBM Cloud prove the adaptation path for namespace, labels, category/provider tokens, examples, formulas, and JSON payload identity. Do not recreate root `workspace/custom.css`, `workspace/custom.js`, or `workspace/demo.html.twig` snapshots, and do not recreate duplicate calculate copies of `_base` workspace sections.

## Composition Order

When creating a calculate-family tool:

1. Read `templates/content/factory/phase-1/_family/calculate/README.md`.
2. Read `templates/content/factory/phase-1/_family/calculate/manifest.yml`.
3. Read this workspace source.
4. Read `templates/content/factory/phase-1/_family/calculate/workspace/manifest.yml`.
5. Inspect `workspace_namespaces` in the calculate workspace manifest to see the ordered `_base` and calculate-owned sections.
6. Inspect the relevant `_base` section files under `templates/content/factory/phase-1/_base/workspace/`.
7. Inspect calculate-owned section `page.html.twig`, `section.css`, `section.js`, and `demo.html` files under `templates/content/factory/phase-1/_family/calculate/workspace/`.
8. Read `templates/content/factory/phase-2/_content/scaffold/README.md`.
9. Read the phase-2 content section folders under `templates/content/factory/phase-2/_content/sections/`.
10. Generate the final tool package under `templates/content/tools/<category>/<tool-slug>/`.

## Workspace Shape

Calculate workspaces use this baseline flow:

1. Estimate label, scenario, or primary brief starts the model.
2. Preset and basic settings load a known estimate shape.
3. Service, component, or workload cards expose visible inputs.
4. Advanced assumptions, rates, overrides, and buffers stay editable.
5. Optional visual contract defines normalized metrics, driver cards, formula rows, rings, charts, and visual result tones.
6. Result summary shows the main computed answer.
7. Output toolbar exposes sort, export, copy, and optional import.
8. Result tabs expose breakdown, mix, assumptions, recommendations, and JSON.
9. JSON payload output reflects the current estimate and can restore state only when import is implemented.

## Baseline UI Pattern

Use the current three calculator tools as the calculate-family UI baseline:

- Keep the result summary as a two-column overview: primary computed answer on the left, supporting metrics and driver cards on the right.
- Use a chart or ring only as a visual aid for the primary answer. It must have a static CSS/SVG fallback when an external chart library is optional.
- Place output controls in a boxed toolbar shell below the summary. `Sort` stays on the left; export/copy/import actions use a compact grid on the right.
- Default line-item sort to `ID` when rows have a stable natural order. Other sort options should not mutate source data.
- Put tabs and tables inside a separate bordered shell. Tabs must control real current-output panels.
- Keep JSON output in its own styled panel and highlight JSON only after escaping user-sourced content.
- If `Import JSON` is visible, the import path must restore inputs, selected preset, toggles, advanced assumptions, latest result, tabs, and output tables from the normalized payload.
- Apply the final category/provider token lineage across card metadata, workspace CSS, markdown support cards, and chart JavaScript. Copied provider colors should not remain after adapting to a different provider or domain.

## Section Use

Use phase-2 content sections from:

When a phase-2 content section is adapted into a final runtime package, apply the complete section contract: `content.md` structure, matching `section.css` visual behavior, and any `section.js` helper behavior when present. Final tool packages do not automatically load shared section CSS or JavaScript, so required card frames, heading divider lines, typography, tables, lists, details, FAQ, copy controls, citations, prompt terminals, or command terminals must be present in the final tool `custom.css` and `custom.js` unless a documented shared include exists.

```text
templates/content/factory/phase-2/_content/sections/
```

Use `_base` workspace sections from:

```text
templates/content/factory/phase-1/_base/workspace/
```

Use calculate-owned workspace sections from:

```text
templates/content/factory/phase-1/_family/calculate/workspace/
```

Use `content/10_references` for complete factual content delivery and when source-backed citations are present, and make every in-text citation link to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Calculate content adaptation:

- `content/03_example-prompts` remains Example Prompts for preset-aligned estimate briefs with `Copy prompt` controls and centered title-case terminal titles.
- Rename Example Prompts to Example Inputs only when the calculator has no prompt, brief, or preset-copy workflow.
- `content/04_tips-prompts` becomes input tips and assumption guidance when the calculator is form-first.
- Overview, service-driver, and review-boundary tables should use explicit HTML table structure with fixed layout and wrapping so columns align inside the content card.

Workspace namespace composition:

- `family._base.workspace.00_shell` provides the shared workspace frame.
- `family._base.workspace.01_input-brief` starts the estimate model.
- `family._base.workspace.02_basic-settings` controls preset and basic settings.
- `family._base.workspace.03_custom-settings` defines optional service, component, workload, line-item, assumption, rate, override, and buffer controls.
- `04_visual-contract` defines the optional calculate visual and model contract for metric cards, driver cards, formula rows, rings, charts, and visual result primitives.
- `04_selected-item` defines an optional selected line item or component inspector; it stays no-op unless selection exists.
- `family._base.workspace.05_result-summary` defines total, run-rate, status, or summary cards.
- `family._base.workspace.06_output-toolbar` defines sort, copy, export, and import controls.
- `family._base.workspace.07_table-output` defines breakdown, mix, assumptions, recommendations, and JSON tabs.
- `family._base.workspace.08_json-restore` defines structured JSON payload output.

Each calculate-owned section folder must contain the same bundle shape used by architecture workspace sections:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

`04_visual-contract` also contains `manifest.yml` and `model-core.js`. Keep `model-core.js` free of DOM, Twig, and browser event binding so final tools can adapt it into `assets/bin/model-core.js` when they need testable model normalization.

Use `page.html.twig`, `section.css`, and `section.js` as section-level source files. Use `demo.html` for isolated visual and behavior checks before adapting the section into a complete tool.

Standalone `demo.html` files own demo chrome separately from extracted calculator section source. Keep the demo title icon placeholder local to the demo with any icon stylesheet it needs, `demo-title`, `demo-title-icon`, `demo-title-text`, and a calculate-family placeholder icon such as `bi bi-calculator`.

Do not create a family-local `sections/` directory.

## Output Expectations

A calculate-family tool should keep one normalized input and result model.

The model should drive:

- label or scenario
- preset
- included services or components
- quantities
- rates
- assumptions
- overrides
- totals
- result summary
- output toolbar
- tables
- exports
- JSON output
- JSON restore payload when import is implemented

Do not compute visible totals, tables, and JSON from separate state.
