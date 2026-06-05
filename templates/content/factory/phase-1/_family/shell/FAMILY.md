# Shell Family Contract

This file is the source of truth for shell-family baseline guidance.

Baseline snapshot: `2026-05-18`.

## Source Files

- `README.md`: family explanation and final package expectations.
- `manifest.yml`: structured baseline metadata and validation rules.
- `source/generate-chmod-shell/`: full copied Chmod Command Generator source snapshot for traceability and freshness checks.
- `source package demo.html`: source package grammar.
- `family manifest source_namespaces`: structured workspace metadata.
- `assets/bin/model-core.js` in the source package: reusable model-core JavaScript copied from the declared baseline tool.
- `_base/workspace/`: shared shell frame, input, settings, summary, toolbar, table, and JSON restore source.
- `family.shell.workspace.04_result-text`: shell-owned generated command text source.
- `family.<family>.workspace.04_visual-contract`: optional shell visual and model contract for command preview, token chips, option groups, warning tones, and operation rows.
- `family.<family>.workspace.04_visual-contract`: optional shell visual and model contract for command preview, token chips, option groups, warning tones, and operation rows.
- `templates/content/factory/phase-2/_content/sections/10_references/`: shared source-backed citation and References section source when final content cites sources.

## Production Reference

```text
templates/content/tools/shell/generate-chmod-shell/
```

Use it for command-builder grammar and implementation quality before or during baseline refresh.

Do not copy chmod-specific flags, examples, labels, icons, or assumptions into unrelated shell tools.

## Current Baseline

Reference snapshot:

```text
source: templates/content/tools/shell/generate-chmod-shell/
snapshot: templates/content/factory/phase-1/_family/shell/source/generate-chmod-shell/
source: templates/content/factory/phase-1/_family/shell/source/generate-chmod-shell/
model-core: templates/content/factory/phase-1/_family/shell/source/generate-chmod-shell/assets/bin/model-core.js
```

The full copied source snapshot is reference-only and must compare cleanly against `templates/content/tools/shell/generate-chmod-shell/` before new shell tools are created. The shell family source of truth is the composed `source_namespaces` list: `_base/workspace` for common shape plus shell-owned `04_result-text`, optional `04_visual-contract`, and `assets/bin/model-core.js` in the source package when needed. Shell-owned `section.css` carries the minimal demo foundation plus shell-specific selectors, matching the architecture family pattern. Do not keep full custom runtime strings inside section folders.

Baseline behavior:

- A primary command brief or form starts the normalized command model.
- Presets seed known command workflows without locking user edits.
- Basic controls define implementation, shell, mode, protocol, host, and ports.
- Basic and Custom dropdown controls use real visible native `<select>` popups inside the `_base` native select wrapper; the shell family must not hide them or replace them with enhanced-select controls.
- Custom controls expose only supported command options and hide or warn on unsupported behavior.
- Visual result contracts normalize command preview, token chips, option groups, warning tones, and operation rows when the command tool has reusable visual output.
- Generated output shows a reviewed command, summary/status cards, warnings/errors, sortable operation rows, export actions, and JSON.
- Family demos render extracted section snippets with dummy state, and result-related family demos show before and after states stacked vertically as two rows in one column.
- Standalone `demo.html` files own demo chrome separately from the reference package snapshot. Include Bootstrap Icons when using `bi` classes, render plain `demo-title` and `demo-title-text` wrappers, and add decorative title icons only when explicitly requested.
- Sort defaults to `ID` when stable row order exists.
- Row copy actions are icon-only and copy the current row value.
- JSON output reflects the normalized command payload.
- Import JSON is not shown unless restore is implemented and validated.
- For current shipped shell generators, the output action set is `Export PDF`, `Download CSV`, `Copy JSON`, `Download JSON`, and `Import JSON`, with working restore plumbing behind the import control.

## Strict Reapply Rule

When the shell family is reapplied to existing shell tools, apply the composed workspace namespaces to every runtime package in scope. `04_result-text` remains shell-owned and mandatory because `_base` does not own generated command text, command copy, or empty command output behavior. `04_visual-contract` is optional until a task explicitly scopes command visual reapplication. This includes `generate-chmod-shell` when it is named in the task.

Accepted reapplication means structural, visual, and runtime parity for the command-builder workspace: input target, Basic settings, Custom settings, generated command text, summary cards, Sort toolbar, output actions, tabs, operation table, warnings, JSON, and restore boundaries where implemented.

The shell parity gate must inspect final runtime packages and verify:

- visible panel label `Custom`; legacy `03_advanced-setting` may remain only as a compatibility marker name
- Basic and Custom dropdowns are visible native selects with no `display: none` native-select rule, fake-dropdown wrapper class, stale custom-native-select class, select-control class, or active enhanced-select replacement call
- no nested card frame directly inside the opened Custom panel body
- Sort options exactly `ID`, `A-Z`, `Field`, `Value`, and `Length`, unless a command-native divergence is recorded
- output actions exactly `Export PDF`, `Download CSV`, `Copy JSON`, `Download JSON`, and `Import JSON` for current shipped shell generators
- fifth-action toolbar layout is deliberate and responsive
- visible `Import JSON` has a hidden file input, JavaScript handler, schema validation, normalized state restore, and output refresh
- import controls are absent when restore is not implemented and validated

Namespace markers, source markers, copied comments, copied support text, old snapshots, or partial CSS fragments are not enough. Preserve only command-native labels, operands, option logic, warnings, examples, stable IDs required by existing behavior, and exported JSON schema compatibility. Record any intentional divergence.

## Non-Negotiables

- Build command tools, not article-first pages.
- Do not execute shell commands in the browser.
- Do not ship fake flags, fake exports, or placeholder output.
- Do not silently include unsafe execution handlers.
- Keep generated command tokens ordered exactly as the target CLI expects.
- Surface dropped, unsupported, or risky options as warnings or blocking errors.
- Keep command output, tables, exports, and JSON driven from one normalized model.
- Keep generated command result text in shell-owned rhythm and keep score cards, sort card, table, warnings, and JSON in the shared `_base` output rhythm.
- Keep shell support-content design sourced through phase-2 content sections and composed source packages, not manually copied from one final tool to another.
- Use domain-native labels and examples for each final shell tool.
- Example command terminal titles stay centered and title case, such as `Chmod Command`.
- Support section titles use a left icon and divider line. Technical Details subsection headings use separator lines between later blocks. Command Tips, How To Use, and FAQ accordion rows use compact left icon chips, and How To Use plus FAQ keep a short explanatory paragraph before the first row.
- Source-backed citations use `templates/content/factory/phase-2/_content/sections/10_references/` and link each in-text citation to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Tool behavior and trust claims must match implemented code and validation.

## Final Tool Rule

The family baseline is not a runtime package.

Copy or adapt the source snapshot and relevant shell source package grammar into final tool-local `tool.html.twig`, `custom.css`, `custom.js`, and optional `assets/bin/model-core.js`.

Inject the composed `_base` and shell-owned source namespaces directly into final shell tools. Add `04_visual-contract` when the final shell tool needs reusable command visuals, and keep generated command source of truth in `04_result-text` or final tool model logic.

Keep each final shell tool independently understandable, namespaced, exportable, restorable when state exists, and native to the target command or operating context.
