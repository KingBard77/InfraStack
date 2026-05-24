# InfraStack Scanning Family Template

## Purpose

This family template is the reusable baseline for InfraStack scanner tools.

Use it for browser-first or server-assisted tools that take a target, run bounded checks, and return evidence-backed output such as:

- public web posture scanners
- HTTP header and cookie scanners
- endpoint reachability scanners
- TLS and redirect posture scanners
- DNS or public record scanners
- content exposure and well-known file scanners
- lightweight configuration or policy probes
- evidence-table review tools

---

## Preferred Baseline Path

```text
templates/content/family/scanning/
```

---

## Naming Rule

New scanning tools use a verb-led canonical identity:

```text
scan_<content>_<group>
```

Examples:

- `scan_web_security`
- `scan_headers_security`
- `scan_dns_security`
- `scan_tls_security`

Folder slugs use the kebab-case form, such as `scan-web-security`.

Use `scan_*`, `scan-*`, and `... Scanner` names for scanning family outputs.

Preserve existing stable slugs, IDs, classes, and exported keys unless a deliberate migration is part of the task.

---

## Reference Implementation

The current primary reference implementation is:

```text
templates/content/tools/security/scan-web-security/
```

Web Security Scanner is a working reference.

It is not the reusable baseline.

The reusable baseline is this family template.

---

## Required Final Tool Package

Every final scanning tool must be generated under:

```text
templates/content/tools/<category>/<tool-slug>/
```

A scanning tool normally includes:

```text
card.yml
content.md
custom.css
custom.js
meta.yml
tool.html.twig
```

Add `assets/bin/model-core.js` when scan normalization, schema validation, import, export, or reusable evidence processing needs testable core logic.

Add a backend controller only when the scan cannot safely or usefully run in the browser. Public URL fetches, SSRF protections, private-address rejection, TLS validation, and CORS-independent header inspection normally belong on the server.

Do not omit tool-local files because this family template exists.

---

## Required Reading Order

Before creating a new scanning tool, read:

1. `AGENTS.md`
2. `codex/PROMPT.md`
3. `codex/DESIGN.md`
4. `templates/content/MAIN.md`
5. `templates/content/main/MAIN.md`
6. `templates/content/tools/TOOLS.md`
7. `templates/content/family/FAMILY.md`
8. `templates/content/family/scanning/README.md`
9. `templates/content/family/scanning/manifest.yml`
10. `templates/content/family/scanning/workspace/README.md`
11. `templates/content/family/scanning/workspace/manifest.yml`
12. relevant scanning workspace section folders under `templates/content/family/scanning/workspace/`
13. `templates/content/main/scaffold/README.md`
14. relevant main content section folders under `templates/content/main/sections/content/`

---

## Family Workspace Source

The scanning family workspace source lives at:

```text
templates/content/family/scanning/workspace/
```

Use that folder for scanner-specific workspace grammar: visual/model contracts, optional selected-item inspector behavior, reusable scanner model-core sources, request meaning, evidence meaning, result meaning, export meaning, and restore boundaries.

Common workspace shape comes from:

```text
templates/content/family/_base/workspace/
```

The ordered composition is declared in `templates/content/family/scanning/workspace/manifest.yml` through `workspace_namespaces`. That list may mix `_base` namespaces and scanning-owned namespaces.

The scanning workspace reference is:

```text
templates/content/tools/security/scan-web-security/
```

The shared scaffold owns package skeleton files.
`_base/workspace` owns common section shape.
The scanning workspace owns scanning-only section contracts and adaptation rules.

When a tool is declared the scanning baseline, keep the full copied source under `source/` for traceability only. Do not audit this as active source. Extract reusable scanner-specific behavior into scanning-owned workspace section files. Do not recreate duplicate scanning copies of `_base` sections and do not keep root workspace `custom.css`, `custom.js`, or `demo.html.twig` files.

---

## Scaffold Content Sections

The scanning family adapts the shared main content sections:

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

For scanning tools, `03_example-prompts` normally becomes **Example Scan Inputs** with paired `Copy input` controls. Use **Example Prompts** only when the scanner accepts a natural-language brief or prompt. Use `09_example-commands` when scanner examples are literal terminal commands.

Choose either `08_acronyms` for abbreviation expansion or `11_glossary` for broader scanner terminology when useful; do not include both unless a deliberate exception is recorded.

Use `10_references` for complete factual content delivery and when the final scanning content includes source-backed citations. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Example input and command terminal strip titles should stay centered and title case.

`04_tips-prompts` normally becomes scan input tips, scope guidance, or evidence interpretation guidance.

The final content must still be tool-specific.

Do not ship generic family copy as final content.

---

## Scanning Workspace Composition

The scanning family composes common workspace sections from `_base`:

```text
family._base.workspace.00_shell
family._base.workspace.01_input-brief
family._base.workspace.02_basic-settings
family._base.workspace.03_custom-settings
family._base.workspace.05_result-summary
family._base.workspace.06_output-toolbar
family._base.workspace.07_table-output
family._base.workspace.08_json-restore
```

The scanning family owns only scanner-specific workspace sections and model-core sources:

```text
templates/content/family/scanning/workspace/04_visual-contract/
templates/content/family/scanning/workspace/04_selected-item/
templates/content/family/scanning/workspace/assets/bin/model-core.js
```

Each scanning-owned workspace section folder follows the architecture family bundle shape:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

`04_visual-contract` also includes `manifest.yml` and `model-core.js`. It owns the optional scanning visual and model contract for posture rings, severity metrics, evidence cards, finding rows, coverage state, and scanner result tones. It should be used when a scanner has reusable visual output beyond plain target input and evidence tables.

Standalone `demo.html` files own demo chrome separately from extracted scanner section source. Keep the demo title icon placeholder local to the demo with any icon stylesheet it needs, `demo-title`, `demo-title-icon`, `demo-title-text`, and a scanning-family placeholder icon such as `bi bi-shield-check`.

Use `workspace_namespaces` to choose scanner behavior and shape final tool-local `tool.html.twig`, `custom.css`, `custom.js`, and optional `assets/bin/model-core.js`, translating target, check, finding, evidence, and export language into the final domain.

Do not create a family-local `sections/` directory for scanning. Shared content section folders belong to `templates/content/main/sections/content/`; scanning workspace section folders belong here.

---

## Scanning Workspace Flow

Default flow:

1. Target input and primary scan action.
2. Request, client, timeout, validation, and companion-probe options.
3. Optional visual contract for posture rings, severity metrics, evidence cards, finding rows, coverage state, and scanner result tones.
4. Hidden-first result shell with empty dashed callout.
5. Result summary with score/status, evidence metrics, chips, and final target details.
6. Output toolbar for sort, export, copy, and optional import.
7. Result tabs for findings, evidence, surface details, and JSON.
8. JSON payload output and optional restore.

---

## Current Baseline Pattern

The current scanning baseline follows the stabilized Web Security Scanner rhythm:

- The scanner starts with one clear target input and a primary `Scan` action.
- Advanced controls live inside a boxed collapsible panel and use dropdown button options rather than radio cards inside dropdowns.
- Custom preference controls stay inside the scanner shell without a nested card unless a distinct inspector section is required.
- The result table is hidden on refresh. A dashed empty-state callout is shown until `Scan` or validated restore generates output.
- The score card uses the compact green circular ring with a centered numeric value and `/100` denominator.
- Dropdowns must render above adjacent cards and not be clipped by shell overflow.
- The result summary is generated from the normalized scan payload, not separate display state.
- The output toolbar follows the architecture table-export shell rhythm: boxed container, `Sort` aligned on the left, compact boxed action buttons on the right, and `ID` as the default sort when findings have stable order.
- Summary, toolbar, tabs, and table shells should read as separate panels without an unintended divider line between them.
- Result tabs sit in a bordered shell and expose real current-output panels such as Findings, Evidence, Surface details, and JSON.
- Row copy actions are icon-only in result tables with accessible labels.
- Copy columns in result tables stay sticky/frozen when horizontal scrolling is needed.
- Support markdown examples use scan input blocks plus paired `Copy input` buttons. Generic markdown copy buttons must not duplicate those controls.
- JSON import/restore controls appear only when implemented and validated. If shown, restore must rebuild the normalized query, visible controls, result summary, tables, tabs, and JSON output from the imported payload.
