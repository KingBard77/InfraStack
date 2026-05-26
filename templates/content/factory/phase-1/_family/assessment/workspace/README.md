# Assessment Family Workspace

## Purpose

This folder defines the family-specific workspace grammar for assessment tools.

Use it when a requested tool filters, reviews, evaluates, or exports assessment material such as controls, findings, requirements, checks, evidence, risk rows, maturity items, or benchmark scripts.

The shared scaffold owns reusable content rhythm.
Shared `_base/workspace` sections own the common shell, input, settings, summary, toolbar, table, and JSON restore shape. This workspace source owns assessment-specific selected artifact review and assessment behavior.

Workspace source inherits the platform two-font system: `Nunito` through `--heading-font` for headings and titles, and `Roboto` through `--default-font` for body, labels, controls, tables, and tool UI. Do not add other proportional font families in assessment section CSS, demos, or final runtime copies.

## Reference Workspace

Primary working baseline reference:

```text
templates/content/tools/cis/assess-ubuntu-2204-cis/
```

Reference aliases:

- CIS Ubuntu Benchmark 2204
- CIS Ubuntu 22.04 Benchmark
- cis-ubuntu-benchmark-2204
- assess-ubuntu-2204-cis

Use the reference to understand working filter-to-result grammar, table/export shell structure, selected artifact review, command copy behavior, JSON snapshot behavior, and trust boundary copy. Do not copy CIS or Ubuntu text into unrelated assessment tools.

## Baseline Source

When a user asks to baseline an assessment tool, copy the full stabilized runtime source into:

```text
templates/content/factory/phase-1/_family/assessment/source/
```

The copied snapshot is reference-only. Do not audit this as active source. Do not import it directly from final runtime tools.

The source tool has no `assets/bin/model-core.js`. Its JavaScript embeds `assets/custom.json.twig` and calls a tool-local Symfony endpoint for selected script content. New assessment tools must adapt the data source and endpoint deliberately.

Reusable assessment-specific behavior belongs in the assessment-owned workspace section folders. Common sections are composed from `templates/content/factory/phase-1/_base/workspace/`. Do not recreate root `workspace/custom.css` or `workspace/custom.js` snapshots.

## Composition Order

When creating an assessment-family tool:

1. Read `templates/content/factory/phase-1/_family/assessment/README.md`.
2. Read `templates/content/factory/phase-1/_family/assessment/manifest.yml`.
3. Read this workspace source.
4. Read `templates/content/factory/phase-1/_family/assessment/workspace/manifest.yml`.
5. Inspect relevant section files under `templates/content/factory/phase-1/_family/assessment/workspace/`.
6. Read `templates/content/factory/phase-2/_content/scaffold/README.md`.
7. Read phase-2 content sections under `templates/content/factory/phase-2/_content/sections/`.
8. Generate the final tool package under `templates/content/tools/<category>/<tool-slug>/`.

## Workspace Shape

Assessment workspaces use this baseline flow:

1. Primary assessment filter, query, or brief.
2. Scope selectors for family, section, severity, status, selected item, and row limit.
3. Explicit Explore, Assess, or Review action.
4. Result summary.
5. Output toolbar for sort, copy, CSV, report, JSON, and optional import.
6. Tabs for findings or controls, group rollups, selected artifact, and JSON.
7. JSON snapshot output and optional restore only when implemented.

## Baseline UI Pattern

Use the current CIS Ubuntu Benchmark 2204 tool as the assessment-family UI baseline:

- Keep the primary filter row full width and aligned with the containing tool box.
- Keep selector dropdown menus the same width as their closed controls.
- Keep the result area in a pre-run notice state until the user runs the primary action or an intentional restore state renders output.
- Place output controls in a boxed toolbar shell below the result summary. `Sort` stays on the left; export/copy actions use compact boxed buttons on the right.
- Default row sort to `ID` when rows have a stable natural order.
- Put tabs and tables inside a separate bordered shell. Tabs must control real current-output panels.
- Add a dedicated row copy/action column when row payload copy is implemented.
- Keep JSON output in a styled panel and escape user-sourced content before highlighting.
- If `Import JSON` is visible, the import path must restore controls, selected item, latest result, tabs, tables, selected artifact, and JSON output from the normalized payload.

## Section Use

Use phase-2 content sections from:

When a phase-2 content section is adapted into a final runtime package, apply the complete section contract: `content.md` structure, matching `section.css` visual behavior, and any `section.js` helper behavior when present. Final tool packages do not automatically load shared section CSS or JavaScript, so required card frames, heading divider lines, typography, tables, lists, details, FAQ, copy controls, citations, prompt terminals, or command terminals must be present in the final tool `custom.css` and `custom.js` unless a documented shared include exists.

```text
templates/content/factory/phase-2/_content/sections/
```

Use composed workspace sections from:

```text
templates/content/factory/phase-1/_base/workspace/
templates/content/factory/phase-1/_family/assessment/workspace/
```

Assessment content adaptation:

- `content/03_example-prompts` becomes Example Inputs when the tool is query-first or prompt-driven.
- `content/09_example-commands` becomes Example Commands when the tool is command-first or shell-review oriented.
- `content/10_references` is used for complete factual content delivery and source-backed citations. Every in-text citation links to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.
- Use paired copy buttons for example inputs, commands, scripts, or payloads.
- Example input and command terminal titles stay centered and title case.
- `content/04_tips-prompts` becomes filter tips, review tips, and safe usage guidance when the assessment is form-first.
- Overview, technical, and export tables should use explicit HTML table structure with fixed layout and wrapping so columns align inside the content card.

Assessment workspace composition:

- `_base.00_shell` defines the shared workspace frame.
- `_base.01_input-brief` starts the assessment state.
- `_base.02_basic-settings` narrows scope.
- `_base.03_custom-settings` defines optional Custom filters or assessment options.
- `04_selected-item` displays selected source, script, evidence, or requirement content.
- `_base.05_result-summary` summarizes current matches, selected item, coverage, and gaps.
- `_base.06_output-toolbar` defines sort, copy, CSV, report, JSON, and optional import actions.
- `_base.07_table-output` defines the current row table, row copy action, section/family/severity/category rollups, selected artifact panel, and evidence views.
- `_base.08_json-restore` defines structured JSON snapshot output.

Each assessment-owned section folder must contain:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

Standalone `demo.html` files own demo chrome separately from extracted assessment section source. Keep the demo title icon placeholder local to the demo with any icon stylesheet it needs, `demo-title`, `demo-title-icon`, `demo-title-text`, and an assessment-family placeholder icon such as `bi bi-clipboard-check`.

Do not create a family-local `sections/` directory.

## Output Expectations

An assessment-family tool should keep one normalized state and result model.

The model should drive:

- query or brief
- scope selectors
- selected item
- row limit
- sort
- summary metrics
- tables
- group rollups
- selected artifact
- exports
- JSON output
- JSON restore payload when import is implemented

Do not compute visible assessment output from separate state.
