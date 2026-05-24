# Assessment Family Contract

This file is the source of truth for the assessment-family baseline.

Baseline source: `templates/content/tools/cis/assess-ubuntu-2204-cis/`.

## Source Files

- `README.md`: family explanation and final package expectations.
- `manifest.yml`: structured baseline metadata and validation rules.
- `source/`: full copied CIS assessment source snapshot for traceability only. Do not audit this as active source.
- `workspace/README.md`: workspace grammar.
- `workspace/manifest.yml`: structured workspace section metadata.
- `templates/content/family/_base/workspace/`: common shell, input, settings, summary, toolbar, table, and JSON restore section sources.
- `workspace/04_selected-item/`: reusable selected script, rule, finding, requirement, evidence, or source body review source.
- `templates/content/main/sections/content/10_references/`: shared source-backed citation and References section source when final content cites sources.

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
- Results stay hidden until the user runs the primary action unless a URL or restore state intentionally asks for a result.
- Result summary cards explain scope, matched items, selected artifact, and metadata gaps.
- Output toolbar contains `Sort` on the left and compact copy/download/export actions on the right.
- Stable assessment rows default to `ID` sorting.
- Table views include a row copy action column with an icon button.
- Tabs expose findings or controls, group rollups, selected artifact source, and JSON.
- JSON is a snapshot export unless import and restore are explicitly implemented and validated.
- Support content states that the browser explorer does not execute checks, apply fixes, or prove compliance.
- Example input and command terminal titles stay centered and title case, such as `CIS Input` or `CIS Command`.
- Source-backed citations use `templates/content/main/sections/content/10_references/` and link each in-text citation to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Tool behavior and trust claims must match implemented code and validation.

## Runtime Baseline

Reference snapshot:

```text
source: templates/content/tools/cis/assess-ubuntu-2204-cis/
snapshot: templates/content/family/assessment/source/
workspace: templates/content/family/assessment/workspace/
```

The full copied source snapshot is reference-only. Do not audit this as active source. Common workspace behavior is composed from `_base/workspace`; reusable assessment-specific behavior lives in assessment-owned workspace folders.

The source tool does not ship `assets/bin/model-core.js`. Its runtime JavaScript embeds `assets/custom.json.twig` and calls a tool-local Symfony script-read endpoint. Record those dependencies in `manifest.yml` and adapt them deliberately for any final assessment tool.

Standalone `demo.html` files own demo chrome separately from extracted assessment section source. Include any icon stylesheet needed by the demo, render `demo-title` with `demo-title-icon` and `demo-title-text`, and use an assessment-family placeholder icon such as `bi bi-clipboard-check`.

## Final Tool Rule

The family baseline is not a runtime package.

Copy or adapt the source snapshot and section patterns into final tool-local `tool.html.twig`, `custom.css`, `custom.js`, and optional backend/data files.

Keep final assessment tools independently understandable, namespaced, exportable, honest about trust boundaries, and domain-native.
