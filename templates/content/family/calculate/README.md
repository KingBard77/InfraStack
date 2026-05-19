# InfraStack Calculate Family Template

## Purpose

This family template is the reusable baseline for InfraStack calculator tools.

Use it for browser-first tools that turn visible inputs, assumptions, rates, quantities, or configuration choices into computed output such as:

- cloud cost estimates
- subnet and capacity calculations
- sizing calculators
- storage and throughput estimates
- budget and run-rate models
- operations planning estimates
- comparative service cost models

---

## Preferred Baseline Path

```text
templates/content/family/calculate/
```

---

## Naming Rule

New calculate tools use a verb-led canonical identity:

```text
calculate_<content>_<group>
```

Examples:

- `calculate_cost_aws`
- `calculate_subnet_network`
- `calculate_capacity_storage`

Folder slugs use the kebab-case form, such as `calculate-cost-aws`.

Use `calculate_*`, `calculate-*`, and `Calculate ...` names for calculate family outputs.

Preserve existing stable slugs, IDs, classes, and exported keys unless a deliberate migration is part of the task.

---

## Reference Implementations

The current reference set is:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

AWS Cost Calculator is the primary structural reference for result grammar, toolbar rhythm, tabbed outputs, JSON restore, and support-content structure. Azure Cost Calculator and IBM Cloud Cost Calculator are provider-adaptation references for category/provider token application, service catalog replacement, chart palette replacement, and provider-native support copy.

These tools are working references.

The reusable baseline is this family template.

---

## Required Final Tool Package

Every final calculate tool must be generated under:

```text
templates/content/tools/<category>/<tool-slug>/
```

A browser-only calculate tool normally includes:

```text
card.yml
content.md
custom.css
custom.js
meta.yml
tool.html.twig
```

Add `assets/bin/model-core.js` when the calculation model needs reusable parser, schema, or testable core logic.

The main scaffold seeds placeholder `assets/bin/model-core.js`, `assets/icon/placeholder.svg`, and `assets/img/post.html.twig` for generated tools. Replace those placeholders with calculation-specific model logic and visual assets when the tool owns real behavior.

Do not omit tool-local files because this family template exists.

---

## Required Reading Order

Before creating a new calculate tool, read:

1. `AGENTS.md`
2. `codex/PROMPT.md`
3. `codex/DESIGN.md`
4. `templates/content/MAIN.md`
5. `templates/content/main/MAIN.md`
6. `templates/content/tools/TOOLS.md`
7. `templates/content/family/FAMILY.md`
8. `templates/content/family/calculate/README.md`
9. `templates/content/family/calculate/manifest.yml`
10. `templates/content/family/calculate/workspace/README.md`
11. `templates/content/family/calculate/workspace/manifest.yml`
12. relevant calculate workspace section folders under `templates/content/family/calculate/workspace/`
13. `templates/content/main/scaffold/README.md`
14. relevant main content section folders under `templates/content/main/sections/content/`

---

## Family Workspace Source

The calculate family workspace source lives at:

```text
templates/content/family/calculate/workspace/
```

Use that folder for calculator-specific workspace grammar, state behavior, result behavior, export behavior, and baseline reference selection.

The calculate workspace reference set is:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

The shared scaffold owns reusable section structure.
The family workspace owns calculate adaptation rules.

The family workspace owns section-level runtime sources. When a tool is declared the calculate baseline, keep the full copied source under `baseline/source/` for traceability, then extract reusable markup, CSS, and JavaScript into the matching workspace section files instead of keeping root workspace `custom.css`, `custom.js`, or `demo.html.twig` files.

---

## Scaffold Content Sections

The calculate family adapts the shared main content sections:

When a shared main content section is adapted into a final runtime package, apply the complete section contract: `content.md` structure, matching `section.css` visual behavior, and any `section.js` helper behavior when present. Final tool packages do not automatically load shared section CSS or JavaScript, so required card frames, heading divider lines, typography, tables, lists, details, FAQ, copy controls, citations, prompt terminals, or command terminals must be present in the final tool `custom.css` and `custom.js` unless a documented shared include exists.

```text
templates/content/main/sections/content/01_overview/
templates/content/main/sections/content/02_technical-details/
templates/content/main/sections/content/03_example-prompts/
templates/content/main/sections/content/04_tips-prompts/
templates/content/main/sections/content/05_how-to-use/
templates/content/main/sections/content/06_export-notes/
templates/content/main/sections/content/07_faq/
templates/content/main/sections/content/08_acronyms/
templates/content/main/sections/content/11_glossary/
templates/content/main/sections/content/09_example-commands/
templates/content/main/sections/content/10_references/
```

Use these sections to shape `content.md`. For calculate tools, `03_example-prompts` should normally remain **Example Prompts** when the examples are preset-aligned estimate briefs that a user can copy before applying a preset or setting controls. Use **Example Inputs** only when the workspace has no prompt, brief, or preset-copy workflow.

Use `09_example-commands` only for a calculate-adjacent tool that shows literal terminal commands as the copied example.

Choose either `08_acronyms` for abbreviation expansion or `11_glossary` for broader estimate terminology when useful; do not include both unless a deliberate exception is recorded.

Use `10_references` for complete factual content delivery and when the final calculate content includes source-backed citations. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Example prompt terminal strip titles should stay centered and title case, for example `AWS Cost Prompt`.

`04_tips-prompts` may become **Input Tips** when the calculator is not prompt-driven.

The final content must still be tool-specific.

Do not ship generic family copy as final content.

---

## Calculate Workspace Sections

The calculate family owns its workspace section source:

```text
templates/content/family/calculate/workspace/01_input-brief/
templates/content/family/calculate/workspace/02_basic-settings/
templates/content/family/calculate/workspace/03_advanced-settings/
templates/content/family/calculate/workspace/04_selected-item/
templates/content/family/calculate/workspace/05_result-summary/
templates/content/family/calculate/workspace/06_result-view/
templates/content/family/calculate/workspace/07_table-export/
templates/content/family/calculate/workspace/08_json-restore/
```

Each workspace section folder follows the architecture family bundle shape:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

`README.md` explains intent and validation boundaries. `demo.html` previews the isolated section and owns demo-only chrome: any icon stylesheet it needs, `demo-title`, `demo-title-icon`, `demo-title-text`, and a calculate-family placeholder icon such as `bi bi-calculator`. `page.html.twig` is the reusable markup source. `section.css` and `section.js` keep section-specific styling and behavior inspectable before they are adapted into a final tool package.

Use these sections to choose calculator behavior and shape final tool-local `tool.html.twig`, `custom.css`, `custom.js`, and optional `assets/bin/model-core.js`, translating prompt, stage, score, and table language into estimate, inputs, result summary, and export language.

Do not create a family-local `sections/` directory for calculate. Shared content section folders belong to `templates/content/main/sections/content/`; calculate workspace section folders belong here.

---

## Calculate Workspace Flow

Default flow:

1. Estimate label, scenario, or primary brief.
2. Preset or basic settings.
3. Service, component, or workload cards.
4. Advanced assumptions, rates, overrides, and buffers.
5. Result summary.
6. Output toolbar for sort, export, copy, and optional import.
7. Result tabs for breakdown, mix, assumptions, recommendations, and JSON.
8. JSON payload output and optional restore.

---

## Current Baseline Pattern

The current calculate baseline follows the stabilized three-tool cloud cost calculator rhythm:

- The estimate starts with a short label or brief, plus a preset selector when the calculator has common workload shapes.
- Component cards expose visible quantities, rates, and include toggles. Disabled components must not contribute to totals.
- Advanced assumptions expose starter rates, overrides, buffers, discounts, or uplifts that materially affect the result.
- The result summary uses a balanced overview shell: a primary answer card on the left and supporting metrics, driver cards, and chips on the right. A chart or ring may support the main answer, but it must not imply scoring, certification, or billing accuracy unless that is actually implemented.
- The output toolbar follows the architecture table-export shell rhythm: boxed container, `Sort` on the left, compact boxed action buttons on the right, and `ID` as the default sort when line items have stable order.
- Result tabs sit in a separate shell and expose real current-output panels such as Breakdown, Service Mix, Assumptions, Recommendations, and JSON.
- Support markdown tables use explicit HTML tables, fixed layout, and wrapping so Overview, service-driver, and review-boundary rows remain aligned inside the content column.
- Example prompts use prompt blocks plus `Copy prompt` buttons. Prompt copy must target the paired prompt block and generic markdown copy buttons must not duplicate those prompt controls.
- JSON import/restore controls appear only when implemented and validated. If shown, restore must rebuild the normalized model, controls, result summary, tables, tabs, and JSON output from the imported payload.
- Category/provider lineage tokens must be adapted across card metadata, workspace CSS, support markdown, and chart JavaScript. AWS purple/orange, Azure blue/cyan, IBM blue/teal, or any provider lineage must not leak into another provider or unrelated domain.

---

## State Rule

Calculate tools should use one normalized input and result model.

The model should drive:

- label or scenario
- preset
- included services or components
- quantities
- unit rates
- overrides
- assumptions
- totals
- recommendations
- exports
- restore payloads when import is implemented

Do not make tables, charts, or JSON output compute from separate scattered DOM state.

---

## Export Rule

For calculate tools, support these exports when practical:

1. CSV for tabular review.
2. JSON for structured estimate snapshots.
3. PDF or print output when a report view exists.
4. Import JSON restore when the tool can safely rebuild state from an exported payload.

Do not show or document import and restore support unless it is implemented and validated.

---

## Namespace Rule

Each final tool must have its own namespace.

CSS root pattern:

```css
.<tool-slug>-tool
```

Markdown support classes should use the same short prefix rhythm as the tool JavaScript.

Do not leave inherited prefixes from another provider or domain.

---

## Adaptation Rule

When adapting the calculate family:

- keep the input-to-output workflow grammar
- adapt provider/domain labels
- adapt metadata
- adapt card copy
- adapt example inputs
- prefer preset-aligned example prompts when the user copies a brief before setting controls
- adapt category/provider token lineage
- adapt calculation logic
- adapt result tables
- adapt export identity

Do not copy stale AWS, cloud, pricing, or provider language into unrelated calculators.

---

## Validation

Before final delivery, validate:

- all required final tool files exist
- all required first-line markers exist
- final tool package is under `templates/content/tools/<category>/<tool-slug>/`
- namespace is tool-specific
- CSS is scoped
- JavaScript DOM IDs match Twig
- visible controls change the normalized model
- output tables and JSON are generated from the same model
- export controls match implemented exports
- support markdown tables fit the content column without clipping required columns
- Example Prompts copy buttons work when present
- JSON import restores the model when an Import JSON control is present
- content does not claim live pricing, billing accuracy, compliance, or production readiness unless actually validated
