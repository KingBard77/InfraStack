# Assessment Family Contract

This file is the source of truth for the assessment-family baseline.

Baseline source: `templates/content/tools/cis/assess-ubuntu-2204-cis/`.

## Source Files

- `README.md`: family explanation and final package expectations.
- `manifest.yml`: structured baseline metadata and validation rules.
- `source/assess-ubuntu-2204-cis/`: full copied CIS assessment source snapshot for traceability and freshness checks.
- `source package demo.html`: source package grammar.
- `family manifest source_namespaces`: structured workspace section metadata.
- `templates/content/factory/phase-1/_base/workspace/`: common shell, input, settings, summary, toolbar, table, and JSON restore section sources.
- `family.<family>.workspace.04_selected-item`: reusable selected script, rule, finding, requirement, evidence, or source body review source.
- `templates/content/factory/phase-2/_content/sections/10_references/`: shared source-backed citation and References section source when final content cites sources.

## Reference

Working reference implementation:

```text
templates/content/tools/cis/assess-ubuntu-2204-cis/
```

Use it for searchable assessment grammar, scoped selectors, ID-first sorting, table copy actions, selected artifact review, export behavior, and JSON snapshot boundaries.

Do not copy CIS, Ubuntu, benchmark, shell, or compliance wording into unrelated assessment tools.

## Current Baseline

- A primary filter starts the assessment workspace.
- Scope controls narrow the dataset by family, section, criticality, selected item, and row count.
- Basic and Custom Settings dropdowns use real visible native `<select>` controls inside the `_base` native select wrapper; their popup is browser-owned.
- Do not hide native selects or replace Basic/Custom dropdowns with enhanced-select controls, custom dropdown/details menus, listbox buttons, hidden option rows, or custom option scrollbars.
- Results stay hidden until the user runs the primary action unless a URL or restore state intentionally asks for a result.
- Result summary cards explain scope, matched items, selected artifact, and metadata gaps.
- Output toolbar contains `Sort` on the left and compact copy/download/export actions on the right.
- Stable assessment rows default to `ID` sorting.
- Table views include a row copy action column with an icon button.
- Tabs expose findings or controls, group rollups, selected artifact source, and JSON.
- JSON is a snapshot export unless import and restore are explicitly implemented and validated.
- Support content states that the browser explorer does not execute checks, apply fixes, or prove compliance.
- Example input and command terminal titles stay centered and title case, such as `CIS Input` or `CIS Command`.
- Source-backed citations use `templates/content/factory/phase-2/_content/sections/10_references/` and link each in-text citation to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Tool behavior and trust claims must match implemented code and validation.

## Runtime Baseline

Reference snapshot:

```text
source: templates/content/tools/cis/assess-ubuntu-2204-cis/
snapshot: templates/content/factory/phase-1/_family/assessment/source/assess-ubuntu-2204-cis/
source: templates/content/factory/phase-1/_family/assessment/source/assess-ubuntu-2204-cis/
```

The full copied source snapshot is reference-only and must compare cleanly against `templates/content/tools/cis/assess-ubuntu-2204-cis/` before new assessment tools are created. Common runtime behavior is composed from `_base/workspace`; reusable assessment-specific behavior lives in the assessment source package namespace markers.

The source tool does not ship `assets/bin/model-core.js`. Its runtime JavaScript embeds `assets/custom.json.twig` and calls a tool-local Symfony script-read endpoint. Record those dependencies in `manifest.yml` and adapt them deliberately for any final assessment tool.

Standalone `demo.html` files own demo chrome separately from extracted assessment section source. Include any icon stylesheet needed by the demo, render `demo-title` with `demo-title-icon` and `demo-title-text`, and use an assessment-family placeholder icon such as `bi bi-clipboard-check`.

## Final Tool Rule

The family baseline is not a runtime package.

Copy or adapt the source snapshot and section patterns into final tool-local `tool.html.twig`, `custom.css`, `custom.js`, and optional backend/data files.

Keep final assessment tools independently understandable, namespaced, exportable, honest about trust boundaries, and domain-native.

Final assessment validation must fail stale Basic/Custom dropdown regressions: native-select `display: none`, `custom-dropdown`, `custom-native-select`, `select-control` on converted native selects, `enhanced-select`, or JavaScript that builds custom option menus for Basic/Custom settings.
