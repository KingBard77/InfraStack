# Shell Family Workspace

## Purpose

This folder defines the family-specific workspace grammar for shell and command-generation tools.

Use it when a requested tool assembles, validates, explains, or exports command-line workflows without executing the command.

The shared scaffold owns reusable content rhythm.
`_base/workspace` owns common workspace shape.
This workspace source owns generated command result text, optional command visual state, and command model helpers.

Workspace source inherits the platform two-font system: `Nunito` through `--heading-font` for headings and titles, and `Roboto` through `--default-font` for body, labels, controls, tables, and tool UI. Do not add other proportional font families in shell section CSS, demos, or final runtime copies.

## Reference Workspace

Primary working baseline reference:

```text
templates/content/tools/shell/generate-netcat-shell/
```

Reference aliases:

- Netcat Command Generator
- netcat command generator
- generate-netcat-shell
- generate_netcat_shell

Use the reference to understand the original command-builder grammar, table/export shell structure, warnings, JSON payloads, copy controls, and support-content rhythm.

Do not copy netcat-specific options into unrelated shell tools.

## Baseline Source

The current shell source snapshot is carried under:

```text
templates/content/family/shell/source/
```

The copied snapshot is reference-only. Do not audit this as active source. Do not import it directly from final runtime tools.

Reusable shell behavior is composed from `_base` and shell-owned sections:

```text
templates/content/family/_base/workspace/00_shell/
templates/content/family/_base/workspace/01_input-brief/
templates/content/family/_base/workspace/02_basic-settings/
templates/content/family/_base/workspace/03_custom-settings/
templates/content/family/shell/workspace/04_visual-contract/
templates/content/family/shell/workspace/04_result-text/
templates/content/family/_base/workspace/05_result-summary/
templates/content/family/_base/workspace/06_output-toolbar/
templates/content/family/_base/workspace/07_table-output/
templates/content/family/_base/workspace/08_json-restore/
templates/content/family/shell/workspace/assets/bin/model-core.js
```

`04_visual-contract` is optional until a task explicitly scopes command visual reapplication. It contains `manifest.yml` and `model-core.js` in addition to the normal section bundle, and it must mirror normalized command state without replacing `04_result-text` as the generated command source of truth.

Do not recreate root `workspace/custom.css` or `workspace/custom.js` snapshots. Shell-owned `section.css` files carry the minimal demo foundation plus shell-specific selectors, while their `section.js` files record source line ranges, DOM IDs, classes, variables, functions, and behavior ownership. Do not embed full custom runtime strings inside section folders.

Historical extraction anchors are in the family reference snapshot:

```text
templates/content/family/shell/source/tool.html.twig
templates/content/family/shell/source/custom.css
templates/content/family/shell/source/custom.js
```

Each anchor uses `source:start family.shell.workspace.<section>` and `source:end family.shell.workspace.<section>`. Treat these ranges as historical reference material only; the active composition source is `workspace/manifest.yml` plus the composed `_base` and shell-owned section folders. Replace exact Netcat identifiers with `__TOOL_CLASS__`, `__PREFIX__`, and `__DOM_PREFIX__`; do not use broad substring replacement that can corrupt `generate-netcat-shell-toolbar` into a root-class placeholder fragment.

## Strict Reapply Rule

When shell workspace sections are reapplied to existing runtime packages, apply the composed `workspace_namespaces` from `manifest.yml`. `_base` sections own common structure, visual rhythm, controls, output shell, tabs, operation table, warnings, JSON, export behavior, and restore frame. Shell-owned `04_result-text` stays mandatory because `_base` does not own generated command source-of-truth or copyable command preview behavior. `04_visual-contract` is optional until a task explicitly scopes command visual reapplication. Keep only command-native differences.

Marker coverage is not enough. A package is not reapplied if it only receives `ns:start` comments, partial CSS, or copied support content.

The shell parity gate must inspect final runtime packages and verify:

- visible panel label `Custom`; legacy `03_advanced-setting` may remain only as a compatibility marker name
- no nested card frame directly inside the opened Custom panel body
- Sort options exactly `ID`, `A-Z`, `Field`, `Value`, and `Length`, unless a command-native divergence is recorded
- output actions exactly `Export PDF`, `Download CSV`, `Copy JSON`, `Download JSON`, and `Import JSON` for current shipped shell generators
- fifth-action toolbar layout is deliberate and responsive
- visible `Import JSON` has a hidden file input, JavaScript handler, schema validation, normalized state restore, and output refresh
- import controls are absent when restore is not implemented and validated

## Composition Order

When creating a shell-family tool:

1. Read `templates/content/family/shell/README.md`.
2. Read `templates/content/family/shell/manifest.yml`.
3. Read this workspace source.
4. Read `templates/content/family/shell/workspace/manifest.yml`.
5. Read the `_base` workspace sections declared in `workspace_namespaces`.
6. Read the shell-owned workspace sections declared in `workspace_namespaces`.
7. Read `templates/content/main/scaffold/README.md`.
8. Read the shared main content section folders under `templates/content/main/sections/content/`.
9. Generate the final tool package under `templates/content/tools/<category>/<tool-slug>/`.

## Workspace Shape

Shell workspaces use this baseline flow:

1. Input target, command intent, preset, or primary command action starts the model.
2. Basic setting controls define implementation, shell, mode, target, and required operands.
3. Custom setting controls expose optional command-specific behavior and warning boundaries.
4. Optional visual contract summarizes command preview, tokens, options, warning posture, and operation rows.
5. Shell-owned result text is copyable and visibly separate from warnings.
6. `_base` result summary cards summarize the generated command state from the normalized model.
7. `_base` output toolbar exposes Sort, implemented exports, and compact output actions.
8. `_base` table and JSON sections expose operation rows, row copy, warnings, errors, JSON, and restore import frame only when implemented.

## Baseline UI Pattern

Use the current shell family workspace source as the shell-family UI baseline:

- The command builder is form-first and browser-owned.
- Presets seed common command workflows.
- Controls remain editable after preset selection.
- Custom sections are collapsed until needed.
- Generated output uses an application workspace shell, not a documentation card.
- Before output exists, show only the dashed generate notice when the tool does not auto-generate.
- Output actions stay compact and grouped through `_base.06_output-toolbar`.
- Sort defaults to `ID` where rows have stable natural order.
- Current shell generators use exactly five output actions: `Export PDF`, `Download CSV`, `Copy JSON`, `Download JSON`, and `Import JSON`.
- Operation rows preserve original IDs after sorting.
- Row-copy buttons are icon-only.
- JSON output is escaped and highlighted after generation through `_base.08_json-restore`.
- Import JSON is visible only when restore is implemented and validated.
- Family demos render extracted section snippets with dummy state, keep standalone demo chrome local to `demo.html`, and stack result-related before and after states vertically as two rows in one column.
- Demo chrome includes any icon stylesheet needed by the standalone runtime UI plus plain `demo-title` and `demo-title-text` heading wrappers. Do not add decorative placeholder icons to demo titles unless explicitly requested.

## Content Adaptation

Use shared main content sections from:

When a shared main content section is adapted into a final runtime package, apply the complete section contract: `content.md` structure, matching `section.css` visual behavior, and any `section.js` helper behavior when present. Final tool packages do not automatically load shared section CSS or JavaScript, so required card frames, section title icons, heading divider lines, Technical Details subsection separators, row icons, typography, tables, lists, details, FAQ, copy controls, citations, prompt terminals, or command terminals must be present in the final tool `custom.css` and `custom.js` unless a documented shared include exists.

Current support section rhythm uses a left title icon and divider line for every section. Command tips, How To Use, and FAQ accordion rows use compact left icon chips, and How To Use plus FAQ include a short explanatory paragraph before the row list.

```text
templates/content/main/sections/content/
```

Use `content/10_references` for complete factual content delivery and when source-backed citations are present, and make every in-text citation link to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Shell content adaptation:

- `01_overview`: command purpose, input boundary, output boundary.
- `02_technical-details`: parser, token order, support matrix, warnings, and export payload.
- `09_example-commands`: `Example Commands` for literal commands with paired `Copy command` controls.
- `03_example-prompts`: only when the shell tool accepts a natural-language prompt or brief.
- Example command terminal titles stay centered and title case.
- `04_tips-prompts`: command-builder, option, or input tips.
- `05_how-to-use`: build, inspect, sort, copy, export, and restore workflow.
- `06_export-notes`: command copy, PDF/report, CSV, JSON, and restore boundaries.
- `07_faq`: execution, trust, safety, and platform differences.
- `08_acronyms`: CLI, shell, protocol, platform, and command acronyms.
- `11_glossary`: broader command, shell, platform, and workflow terminology.

Do not create a family-local `sections/` directory.

## Output Expectations

A shell-family tool should keep one normalized command model.

The model should drive:

- preset
- implementation or command flavor
- shell target
- operands
- flags
- generated command tokens
- warnings
- blocking errors
- summary rows
- exports
- JSON output
- restore payload when import exists

Do not make the visible command and JSON output diverge.
