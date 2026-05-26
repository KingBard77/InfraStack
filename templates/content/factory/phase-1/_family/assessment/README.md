# InfraStack Assessment Family Template

## Purpose

This family template is the reusable baseline for InfraStack assessment tools.

Use it for browser-first tools that evaluate, inspect, or organize posture, readiness, control coverage, configuration quality, maturity, risk, or benchmark material.

Assessment tools normally help users:

- filter a structured assessment catalogue
- review matched findings, controls, checks, or requirements
- inspect a selected artifact or source body
- compare group rollups
- copy exact row or artifact output
- export CSV, JSON, or a printable result view
- understand what the tool does not validate

## Preferred Baseline Path

```text
templates/content/factory/phase-1/_family/assessment/
```

## Naming Rule

New assessment tools use a verb-led canonical identity:

```text
assess_<content>_<group>
```

Examples:

- `assess_ubuntu_2204_cis`
- `assess_exposure_network`
- `assess_readiness_backup`

Folder slugs use the kebab-case form, such as `assess-ubuntu-2204-cis`.

Preserve existing stable slugs, IDs, classes, routes, and exported keys unless a deliberate migration is part of the task.

## Reference Implementation

The current primary reference implementation is:

```text
templates/content/tools/cis/assess-ubuntu-2204-cis/
```

CIS Ubuntu Benchmark 2204 is a working reference. It is not the reusable baseline by itself; this family template is the reusable baseline.

Use the reference for interaction grammar and quality bar. Do not copy CIS, Ubuntu, shell, benchmark, or compliance wording into unrelated assessment tools.

## Required Final Tool Package

Every final assessment tool must be generated under:

```text
templates/content/tools/<category>/<tool-slug>/
```

A browser-first assessment tool normally includes:

```text
card.yml
content.md
custom.css
custom.js
meta.yml
tool.html.twig
```

The main scaffold can seed placeholder `assets/bin/model-core.js`, `assets/icon/placeholder.svg`, and `assets/img/post.html.twig`. Replace those placeholders with assessment-specific data files, backend endpoints, model logic, icons, or post visuals only when the assessment needs them.

Do not omit tool-local files because this family template exists.

## Required Reading Order

Before creating a new assessment tool, read:

1. `AGENTS.md`
2. `codex/PROMPT.md`
3. `codex/DESIGN.md`
4. `templates/content/MAIN.md`
5. `templates/content/factory/phase-2/_content/MAIN.md`
6. `templates/content/tools/TOOLS.md`
7. `templates/content/factory/phase-1/_family/FAMILY.md`
8. `templates/content/factory/phase-1/_family/assessment/README.md`
9. `templates/content/factory/phase-1/_family/assessment/manifest.yml`
10. `templates/content/factory/phase-1/_family/assessment/workspace/README.md`
11. `templates/content/factory/phase-1/_family/assessment/workspace/manifest.yml`
12. relevant assessment workspace section folders
13. `templates/content/factory/phase-2/_content/scaffold/README.md`
14. relevant phase-2 content section folders under `templates/content/factory/phase-2/_content/sections/`

## Family Workspace Source

The assessment family workspace source lives at:

```text
templates/content/factory/phase-1/_family/assessment/workspace/
```

The workspace reference is:

```text
templates/content/tools/cis/assess-ubuntu-2204-cis/
```

The shared scaffold owns reusable content rhythm.
The shared `_base` workspace owns common shell, input, settings, summary, toolbar, table, and JSON restore structure. The assessment workspace owns selected artifact review, assessment-specific state behavior, export boundaries, and trust boundaries.

## Scaffold Content Sections

The assessment family adapts the phase-2 content sections:

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
templates/content/factory/phase-2/_content/sections/09_example-commands/
templates/content/factory/phase-2/_content/sections/10_references/
```

For assessment tools, keep `03_example-prompts` for prompt-driven briefs, use `09_example-commands` when users copy literal shell commands, and adapt the label to **Example Inputs** only for non-command bodies, queries, or structured briefs.

Choose either `08_acronyms` for abbreviation expansion or `11_glossary` for broader assessment terminology when useful; do not include both unless a deliberate exception is recorded.

Use `10_references` for complete factual content delivery and when the final assessment content includes source-backed citations. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Example input and command terminal strip titles should stay centered and title case.

The final content must stay tool-specific and honest about validation scope.

## Assessment Workspace Composition

The assessment family composes common sections from `_base/workspace` and owns only assessment-specific sections locally:

```text
templates/content/factory/phase-1/_base/workspace/00_shell/
templates/content/factory/phase-1/_base/workspace/01_input-brief/
templates/content/factory/phase-1/_base/workspace/02_basic-settings/
templates/content/factory/phase-1/_base/workspace/03_custom-settings/
templates/content/factory/phase-1/_family/assessment/workspace/04_selected-item/
templates/content/factory/phase-1/_base/workspace/05_result-summary/
templates/content/factory/phase-1/_base/workspace/06_output-toolbar/
templates/content/factory/phase-1/_base/workspace/07_table-output/
templates/content/factory/phase-1/_base/workspace/08_json-restore/
```

Each locally owned workspace section folder follows the architecture family bundle shape:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

Standalone `demo.html` files own demo chrome separately from extracted assessment section source. Keep the demo title icon placeholder local to the demo with any icon stylesheet it needs, `demo-title`, `demo-title-icon`, `demo-title-text`, and an assessment-family placeholder icon such as `bi bi-clipboard-check`.

Use `workspace/manifest.yml` `workspace_namespaces` as the active composition source. The copied `source/` folder is reference-only for traceability. Do not audit this as active source.

## Assessment Workspace Flow

Default flow:

1. Assessment filter or primary query.
2. Scope selectors for family, section, severity, status, profile, or row limit.
3. Explicit Explore, Assess, or Review action.
4. Result summary.
5. Output toolbar for sort, copy, CSV, report, JSON, and optional import.
6. Tabs for findings or controls, group rollups, selected artifact, and JSON.
7. JSON snapshot output and optional restore only when implemented.

## Current Baseline Pattern

The current assessment baseline follows the stabilized CIS Ubuntu Benchmark 2204 rhythm:

- The workspace starts with a full-width filter row and a primary Explore action.
- Selectors use compact closed controls and dropdown menus that match the closed control width.
- The result area shows a dashed or bordered pre-run notice before generated output.
- Generated output uses a summary shell, sort/export toolbar, tabs shell, fixed-layout tables, row copy icons, selected source review, and JSON output.
- Sort defaults to `ID` when rows have stable assessment order.
- Row copy buttons copy the row payload, not stale DOM text.
- JSON output is escaped and generated from the same normalized result as summary, tables, selected artifact metadata, and exports.
- URL or restore state must omit default values where practical so the base URL remains clean.
- Import JSON appears only when restore rebuilds the normalized model and visible output.

## State Rule

Assessment tools should use one normalized state and result model.

The model should drive:

- query or brief
- scope selectors
- selected item
- row limit
- sort
- summary metrics
- findings or controls rows
- group rollups
- selected artifact metadata
- exports
- JSON output
- JSON restore payload when import is implemented

Do not compute summary, table, artifact, and JSON output from separate scattered DOM state.

## Export Rule

For assessment tools, support these exports when practical:

1. Copy selected artifact or row payload.
2. CSV for tabular review.
3. JSON for structured snapshots.
4. PDF or print output when a report view exists.
5. Import JSON restore only when the tool can safely rebuild state from an exported payload.

Do not show or document import and restore support unless it is implemented and validated.

## Trust Boundary

Assessment tools must be explicit about what they do not prove.

Do not claim compliance, certification, hardening success, security posture, production readiness, or benchmark coverage unless the tool actually validates that outcome.

The CIS Ubuntu 2204 reference is a read-only explorer. It does not run checks, apply fixes, connect to hosts, or prove compliance.

## Validation

Before final delivery, validate:

- all required final tool files exist
- all required first-line markers exist
- final tool package is under `templates/content/tools/<category>/<tool-slug>/`
- namespace is tool-specific
- CSS is scoped
- JavaScript DOM IDs match Twig
- visible controls change the normalized model
- summary, tables, artifact view, exports, and JSON are generated from the same model
- copy buttons target current row, artifact, command, or JSON content
- export controls match implemented exports
- support markdown tables fit the content column without clipping required columns
- JSON import restores the model when an Import JSON control is present
- content does not claim compliance, security, certification, or production readiness unless actually validated
