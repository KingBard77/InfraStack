# Scanning Family Contract

This file is the source of truth for scanning-family baseline guidance.

## Source Files

- `README.md`: family explanation and final package expectations.
- `manifest.yml`: structured baseline metadata and validation rules.
- `source/scan-web-security/`: full copied Web Security Scanner source snapshot for traceability and freshness checks.
- `source package demo.html`: source package grammar.
- `family manifest source_namespaces`: structured workspace section metadata.
- `assets/bin/model-core.js` in the source package: reusable model-core source copied from the declared baseline tool.
- `templates/content/factory/phase-1/_base/workspace/`: common shell, input, settings, summary, toolbar, table, and JSON restore section sources.
- `family.<family>.workspace.04_visual-contract`: optional scanning visual and model contract for posture rings, severity metrics, evidence cards, finding rows, coverage state, and scanner result tones.
- `family.<family>.workspace.04_selected-item`: optional selected finding or evidence inspector.
- `templates/content/factory/phase-2/_content/sections/10_references/`: shared source-backed citation and References section source when final content cites sources.

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
- Basic and Custom Settings dropdowns use real visible native `<select>` controls inside the `_base` native select wrapper; their popup is browser-owned.
- Do not hide native selects or replace Basic/Custom dropdowns with enhanced-select controls, custom dropdown/details menus, listbox buttons, hidden option rows, or custom option scrollbars.
- Visual result contracts normalize posture rings, severity metrics, evidence cards, finding rows, coverage state, and result tones when the scanner has reusable visual output.
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
- Source-backed citations use `templates/content/factory/phase-2/_content/sections/10_references/` and link each in-text citation to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Tool behavior and trust claims must match implemented code and validation.

## Runtime Baseline

When a scanning tool is declared the baseline, copy its full stabilized runtime source into:

```text
templates/content/factory/phase-1/_family/scanning/source/scan-web-security/
```

The current source tool is:

```text
templates/content/tools/security/scan-web-security/
```

The full source snapshot is reference-only and must compare cleanly against `templates/content/tools/security/scan-web-security/` before new scanning tools are created. Common workspace shape is composed from `_base/workspace` by `family manifest source_namespaces` `source_namespaces`. Do not recreate duplicate scanning copies of `_base` sections.

Keep reusable scanning-specific CSS, JavaScript, markup behavior, and model-core sources in scanning-owned workspace files.

Keep the scanning-owned workspace section bundle shape:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

`family.<family>.workspace.04_visual-contract` also carries `manifest.yml` and `model-core.js` because it defines a scanner-neutral visual model contract, not only a markup/CSS/JS fragment. Use it when a scanner needs a reusable visual result surface. Omit it for pure target-input and table scanners and record that omission as accepted divergence.

Standalone `demo.html` files own demo chrome separately from extracted scanner section source. Include any icon stylesheet needed by the demo, render `demo-title` with `demo-title-icon` and `demo-title-text`, and use a scanning-family placeholder icon such as `bi bi-shield-check`.

## Final Tool Rule

The family baseline is not a runtime package.

Copy or adapt the source snapshot and relevant section patterns into final tool-local files, keep scan checks domain-native, and keep visible summary, tables, JSON, exports, and restore data driven from the same normalized scan result.

Final scanning validation must fail stale Basic/Custom dropdown regressions: native-select `display: none`, `custom-dropdown`, `custom-native-select`, `select-control` on converted native selects, `enhanced-select`, or JavaScript that builds custom option menus for Basic/Custom settings.
