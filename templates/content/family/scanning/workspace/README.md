# Scanning Family Workspace

## Purpose

This folder defines the family-specific workspace grammar for scanning tools.

Use it when a requested tool accepts a target and options, runs bounded checks, and produces evidence-backed findings, summaries, tables, exports, and JSON.

The shared scaffold owns reusable content rhythm.
This workspace source owns scanner workspace sections and scanner behavior.

## Reference Workspace

Primary working baseline reference:

```text
templates/content/tools/security/scan-web-security/
```

Reference aliases:

- Web Security Scanner
- Web security scanner
- web-security-scanner
- scan-web-security

Use the reference to understand target-to-result grammar, advanced option layout, hidden-first result behavior, table/export shell structure, JSON restore behavior, and support-content scan input copy controls. Do not copy web-header-specific wording into unrelated scanners.

## Baseline Source

When a user asks to baseline a scanning tool, copy the full stabilized runtime source into:

```text
templates/content/family/scanning/baseline/source/
```

The copied snapshot is reference-only. Do not import it directly from final runtime tools.

Reusable scanner behavior belongs in the matching workspace files:

```text
templates/content/family/scanning/workspace/<section>/page.html.twig
templates/content/family/scanning/workspace/<section>/section.css
templates/content/family/scanning/workspace/<section>/section.js
templates/content/family/scanning/workspace/<section>/demo.html
templates/content/family/scanning/workspace/assets/bin/model-core.js
```

The current section source is derived from the Web Security Scanner target shell, advanced options, score summary, output toolbar, evidence tabs, JSON boundaries, dropdown behavior, copy/export behavior, and support example controls. Before using it for a different scan domain, adapt the namespace, labels, category/provider tokens, examples, checks, evidence tables, and JSON payload identity. Do not recreate root `workspace/custom.css` or `workspace/custom.js` snapshots.

## Composition Order

When creating a scanning-family tool:

1. Read `templates/content/family/scanning/README.md`.
2. Read `templates/content/family/scanning/manifest.yml`.
3. Read this workspace source.
4. Read `templates/content/family/scanning/workspace/manifest.yml`.
5. Inspect the relevant section `page.html.twig`, `section.css`, `section.js`, and `demo.html` files under `templates/content/family/scanning/workspace/`.
6. Read `templates/content/main/scaffold/README.md`.
7. Read the shared main content section folders under `templates/content/main/sections/content/`.
8. Generate the final tool package under `templates/content/tools/<category>/<tool-slug>/`.

## Workspace Shape

Scanning workspaces use this baseline flow:

1. Target input starts the scan model.
2. Scan options define request method, redirects, timeout, validation, client profile, and companion probes.
3. Result shell starts empty and keeps output hidden until scan or validated restore.
4. Result summary shows score/status, evidence metrics, chips, and final target details.
5. Output toolbar exposes sort, export, copy, and optional import.
6. Result tabs expose findings, evidence tables, surface details, and JSON.
7. JSON payload output reflects the current scan and can restore state only when import is implemented.

## Baseline UI Pattern

Use the current Web Security Scanner as the scanning-family UI baseline:

- Keep the target shell compact and task-first.
- Put advanced options in a boxed collapsible panel below the target row.
- Use dropdown buttons for option lists inside dropdowns. Do not nest radio-card controls inside dropdown menus.
- Ensure dropdowns render above following result cards and are not clipped by shell overflow.
- Keep result output hidden on first refresh and show a dashed empty-state callout.
- Place output controls in a boxed toolbar shell below the result summary. `Sort` stays on the left; export/copy/import actions use a compact grid on the right.
- Default finding sort to `ID` when rows have a stable natural order. Other sort options should not mutate source evidence.
- Put tabs and tables inside a separate bordered shell. Tabs must control real current-output panels.
- Keep JSON output in its own styled panel and escape user-sourced content before rendering.
- If `Import JSON` is visible, the import path must restore query controls, latest result, result summary, tables, tabs, and JSON output from the normalized payload.

## Section Use

Use shared main content sections from:

When a shared main content section is adapted into a final runtime package, apply the complete section contract: `content.md` structure, matching `section.css` visual behavior, and any `section.js` helper behavior when present. Final tool packages do not automatically load shared section CSS or JavaScript, so required card frames, heading divider lines, typography, tables, lists, details, FAQ, copy controls, citations, prompt terminals, or command terminals must be present in the final tool `custom.css` and `custom.js` unless a documented shared include exists.

```text
templates/content/main/sections/content/
```

Use scanning workspace sections from:

```text
templates/content/family/scanning/workspace/
```

Use `content/10_references` for complete factual content delivery and when source-backed citations are present, and make every in-text citation link to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Scanning content adaptation:

- `content/03_example-prompts` becomes Example Scan Inputs for form-first scanners with paired `Copy input` controls.
- `content/09_example-commands` becomes Example Commands when the scanner examples are literal terminal commands.
- Example input and command terminal titles stay centered and title case.
- `content/04_tips-prompts` becomes scan input tips, scope guidance, or evidence interpretation guidance.
- Overview and evidence-boundary tables should use explicit HTML table structure with fixed layout and wrapping so columns align inside the content card.

Scanning workspace sections:

- `01_input-brief` starts the scan model.
- `02_basic-settings` defines request, validation, client, and companion-probe options.
- `03_advanced-settings` defines optional advanced probes, filters, request tuning, or scanner options; it stays no-op when not needed.
- `04_selected-item` defines optional selected finding, evidence, or target detail; it stays no-op when not needed.
- `05_result-summary` defines hidden-first output, score/status, metrics, and chips.
- `06_result-view` defines findings, evidence, surface detail, and JSON panels.
- `07_table-export` defines sort, copy, CSV, report/PDF, JSON, and optional import controls.
- `08_json-restore` defines structured JSON payload output.

Each section folder must contain the same bundle shape used by architecture workspace sections:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

Use `page.html.twig`, `section.css`, and `section.js` as section-level source files. Use `demo.html` for isolated visual and behavior checks before adapting the section into a complete tool.

Standalone `demo.html` files own demo chrome separately from extracted scanner section source. Keep the demo title icon placeholder local to the demo with any icon stylesheet it needs, `demo-title`, `demo-title-icon`, `demo-title-text`, and a scanning-family placeholder icon such as `bi bi-shield-check`.

Do not create a family-local `sections/` directory.

## Output Expectations

A scanning-family tool should keep one normalized query and result payload.

The payload should drive:

- target
- scan options
- companion probes
- status or score
- result summary
- findings
- evidence tables
- row copy text
- output toolbar
- exports
- JSON output
- JSON restore payload when import is implemented

Do not compute visible summaries, tables, and JSON from separate state.
