# Scanning Family Contract

This file is the source of truth for scanning-family baseline guidance.

## Source Files

- `README.md`: family explanation and final package expectations.
- `manifest.yml`: structured baseline metadata and validation rules.
- `baseline/source/`: full copied Web Security Scanner source snapshot for traceability only.
- `workspace/README.md`: workspace grammar.
- `workspace/manifest.yml`: structured workspace section metadata.
- `workspace/assets/bin/model-core.js`: reusable model-core source copied from the declared baseline tool.
- `workspace/01_input-brief/` through `workspace/08_json-restore/`: reusable section sources.
- `templates/content/main/sections/content/10_references/`: shared source-backed citation and References section source when final content cites sources.

## Reference

Working reference implementation:

```text
templates/content/tools/security/scan-web-security/
```

Use it for scanner target setup, advanced request controls, hidden-first result state, score/summary behavior, table/export rhythm, JSON restore behavior, and support-content example input controls.

Do not copy Web Security Scanner wording into unrelated scanners unless the target domain is also public web header posture.

## Current Baseline

- Target input starts the scan model.
- Advanced scan options expose method, redirects, timeout, TLS validation, fallback behavior, client profile, and optional companion probes.
- Result output stays hidden on first refresh and appears only after the primary scan action or validated JSON restore.
- Result summary uses a score/status card plus evidence metrics, chips, and final target details; the score card keeps the compact green circular `100 /100` ring rhythm.
- Output toolbar contains Sort plus export/copy/import actions.
- Output toolbar, tabs, and table shells stay separated without an unintended divider line between them.
- Stable finding rows default to `ID` sorting.
- Result tabs expose findings, evidence tables, surface details, and JSON when implemented.
- Result table copy columns stay sticky/frozen when horizontal scrolling is needed.
- JSON output lives in a styled panel and import is shown only when restore validation is implemented.
- Example scan inputs use paired `Copy input` controls and do not receive generic floating markdown copy buttons.
- Example input or command terminal titles stay centered and title case.
- Source-backed citations use `templates/content/main/sections/content/10_references/` and link each in-text citation to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Tool behavior and trust claims must match implemented code and validation.

## Runtime Baseline

When a scanning tool is declared the baseline, copy its full stabilized runtime source into:

```text
templates/content/family/scanning/baseline/source/
```

The current source tool is:

```text
templates/content/tools/security/scan-web-security/
```

The full source snapshot is reference-only. Keep reusable scanning CSS, JavaScript, and markup behavior in the numbered workspace section folders, with model-core under `workspace/assets/bin/model-core.js` when needed.

Keep the workspace section bundle shape:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

Standalone `demo.html` files own demo chrome separately from extracted scanner section source. Include any icon stylesheet needed by the demo, render `demo-title` with `demo-title-icon` and `demo-title-text`, and use a scanning-family placeholder icon such as `bi bi-shield-check`.

## Final Tool Rule

The family baseline is not a runtime package.

Copy or adapt the source snapshot and relevant section patterns into final tool-local files, keep scan checks domain-native, and keep visible summary, tables, JSON, exports, and restore data driven from the same normalized scan result.
