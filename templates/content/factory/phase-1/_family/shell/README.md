# InfraStack Shell Family Template

## Purpose

This family template is the reusable baseline for InfraStack shell and command-generation tools.

Use it for browser-first tools that assemble, explain, validate, or export command-line workflows without executing them.

Examples:

- command generators
- one-liner builders
- shell option composers
- command validators
- command explainers
- runbook command helpers
- CLI payload exporters

## Preferred Baseline Path

```text
templates/content/factory/phase-1/_family/shell/
```

## Naming Rule

New shell tools use a verb-led canonical identity:

```text
<verb>_<content>_shell
```

Preferred verbs:

- `generate`
- `compose`
- `explain`
- `validate`

Examples:

- `generate_command_shell`
- `generate_netcat_shell`
- `compose_ssh_tunnel_shell`
- `validate_curl_shell`

Folder slugs use the kebab-case form, such as `generate-netcat-shell`.

Preserve existing stable slugs, IDs, classes, routes, and exported JSON keys unless a deliberate migration is part of the task.

## Historical Reference

```text
templates/content/tools/shell/generate-netcat-shell/
```

Netcat Command Generator is the historical working shell-family baseline reference.

The reusable baseline is this family template, the reference-only source snapshot under:

```text
templates/content/factory/phase-1/_family/shell/source/
```

and the numbered workspace section sources under:

```text
templates/content/factory/phase-1/_family/shell/workspace/
```

After promotion, use this composed family source as the source of truth. Shared frame, input, settings, summary, toolbar, table, and JSON restore sections come from `_base/workspace`; shell keeps generated command result text, optional command visual state, and command model helpers. Use the Netcat tool only to understand the original implementation quality or to refresh the reference snapshot. Translate visible labels, flags, examples, category/provider token lineage, command logic, warnings, and assumptions for final non-netcat shell tools.

## Required Final Tool Package

Every complete shell-family tool should be generated under:

```text
templates/content/tools/<category>/<tool-slug>/
```

A complete shell command tool normally includes:

```text
assets/
├── bin/
│   └── model-core.js
├── icon/
└── img/
    └── post.html.twig
card.yml
content.md
custom.css
custom.js
meta.yml
tool.html.twig
```

Add `assets/bin/model-core.js` when command building, schema normalization, import/export payloads, or parser behavior should be testable outside the DOM.

Do not omit tool-local files because this family source exists.

## Required Reading Order

Before creating a shell-family tool, read:

1. `AGENTS.md`
2. `codex/PROMPT.md`
3. `codex/DESIGN.md`
4. `templates/content/MAIN.md`
5. `templates/content/factory/phase-2/_content/MAIN.md`
6. `templates/content/tools/TOOLS.md`
7. `templates/content/factory/phase-1/_family/FAMILY.md`
8. `templates/content/factory/phase-1/_family/shell/README.md`
9. `templates/content/factory/phase-1/_family/shell/manifest.yml`
10. `templates/content/factory/phase-1/_family/shell/workspace/README.md`
11. `templates/content/factory/phase-1/_family/shell/workspace/manifest.yml`
12. relevant shell workspace section folders under `templates/content/factory/phase-1/_family/shell/workspace/`
13. `templates/content/factory/phase-2/_content/scaffold/README.md`
14. relevant phase-2 content section folders under `templates/content/factory/phase-2/_content/sections/`

## Family Workspace Source

The shell family workspace source lives at:

```text
templates/content/factory/phase-1/_family/shell/workspace/
```

Runtime baseline files:

```text
templates/content/factory/phase-1/_family/shell/workspace/assets/bin/model-core.js
```

Full copied runtime source lives under `source/` for traceability only. Do not audit this as active source. Common reusable workspace markup, CSS, and JavaScript live in `templates/content/factory/phase-1/_base/workspace/`. Shell-owned sources live in `04_result-text`, optional `04_visual-contract`, and `workspace/assets/bin/model-core.js`. Do not recreate root `workspace/custom.css` or `workspace/custom.js` snapshots, and do not embed full custom runtime strings inside section folders.

The reference snapshot under `source/` carries extraction markers in `tool.html.twig`, `custom.css`, and `custom.js`:

```text
source:start family.shell.workspace.<section>
source:end family.shell.workspace.<section>
```

Refresh shell-owned workspace sections from those marked ranges first, then replace exact Netcat identifiers with `__TOOL_CLASS__`, `__PREFIX__`, and `__DOM_PREFIX__`. Keep the replacement exact enough that longer slug-prefixed classes such as `generate-netcat-shell-toolbar` become `__PREFIX__-toolbar`, not a broken root-class placeholder. For common sections, use the `_base` source instead of regenerating shell-local duplicates.

## Strict Reapply Rule

When applying or reapplying the shell family to existing shell tools, the composed `workspace_namespaces` contract is mandatory. `_base` provides the common command builder frame, Basic panel, Custom panel, summary cards, Sort toolbar, output actions, tabs, operation table, warnings, JSON, and restore frame. Shell-owned `04_result-text` remains mandatory because `_base` does not own generated command source-of-truth or copyable command preview behavior. `04_visual-contract` is optional until a task explicitly scopes command visual reapplication.

This rule applies to every shell runtime package in scope, including `generate-netcat-shell` when it is named. No reference package is exempt; it satisfies reapply only by passing the same current family-source parity gate as every other target package. Byte-equivalence to an old snapshot is not acceptance when the family workspace source has moved on.

Do not count namespace markers, source markers, partial CSS, copied comments, old snapshots, or support-content edits as a completed family reapply. Preserve only command-native labels, operands, options, warning rules, command generation logic, stable DOM IDs required by existing behavior, and exported JSON schema compatibility. Record every intentional divergence.

The shell parity gate must inspect final runtime packages and verify:

- visible panel label `Custom`; legacy `03_advanced-setting` may remain only as a compatibility marker name
- no nested card frame directly inside the opened Custom panel body
- Sort options exactly `ID`, `A-Z`, `Field`, `Value`, and `Length`, unless a command-native divergence is recorded
- output actions exactly `Export PDF`, `Download CSV`, `Copy JSON`, `Download JSON`, and `Import JSON` for current shipped shell generators
- fifth-action toolbar layout is deliberate and responsive
- visible `Import JSON` has a hidden file input, JavaScript handler, schema validation, normalized state restore, and output refresh
- import controls are absent when restore is not implemented and validated

## Shell Workspace Sections

Shell workspace composition:

```text
templates/content/factory/phase-1/_base/workspace/
├── 00_shell/
├── 01_input-brief/
├── 02_basic-settings/
├── 03_custom-settings/
├── 05_result-summary/
├── 06_output-toolbar/
├── 07_table-output/
└── 08_json-restore/

templates/content/factory/phase-1/_family/shell/workspace/04_visual-contract/
templates/content/factory/phase-1/_family/shell/workspace/04_result-text/
templates/content/factory/phase-1/_family/shell/workspace/assets/bin/model-core.js
```

Only `04_result-text`, optional `04_visual-contract`, and `assets/bin/model-core.js` remain shell-owned after `_base` composition. The older shell-local common section folders are superseded by `_base`. `04_visual-contract` includes `manifest.yml` and `model-core.js`; it owns the optional shell visual and model contract for command preview, token chips, option groups, warning tones, and operation rows. Generated command text remains owned by `04_result-text`; the visual contract mirrors normalized command state and must not become the command source of truth.

## Scaffold Content Sections

The shell family adapts the phase-2 content sections:

When a phase-2 content section is adapted into a final runtime package, apply the complete section contract: `content.md` structure, matching `section.css` visual behavior, and any `section.js` helper behavior when present. Final tool packages do not automatically load shared section CSS or JavaScript, so required card frames, section title icons, heading divider lines, Technical Details subsection separators, row icons, typography, tables, lists, details, FAQ, copy controls, citations, prompt terminals, or command terminals must be present in the final tool `custom.css` and `custom.js` unless a documented shared include exists.

```text
templates/content/factory/phase-2/_content/sections/01_overview/
templates/content/factory/phase-2/_content/sections/02_technical-details/
templates/content/factory/phase-2/_content/sections/04_tips-prompts/
templates/content/factory/phase-2/_content/sections/05_how-to-use/
templates/content/factory/phase-2/_content/sections/06_export-notes/
templates/content/factory/phase-2/_content/sections/07_faq/
templates/content/factory/phase-2/_content/sections/08_acronyms/
templates/content/factory/phase-2/_content/sections/11_glossary/
templates/content/factory/phase-2/_content/sections/09_example-commands/
templates/content/factory/phase-2/_content/sections/10_references/
```

For shell tools:

- `09_example-commands` is the default for literal command examples and paired `Copy command` controls.
- `03_example-prompts` is only used when the shell tool accepts a natural-language brief or prompt as a supported workflow.
- Choose either `08_acronyms` for abbreviation expansion or `11_glossary` for broader command terminology when useful; do not include both unless a deliberate exception is recorded.
- `04_tips-prompts` normally becomes command-builder, input, or option tips when the tool is form-first.
- Section headings use a left icon and divider line; command tips, How To Use, and FAQ rows use left icon chips when rendered as accordions.
- How To Use and FAQ sections include a short explanatory paragraph before their first accordion row.
- `06_export-notes` should describe only implemented exports.
- `10_references` is used for complete factual content delivery and when source-backed citations are present. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.
- Example command terminal strip titles should stay centered and title case, for example `Netcat Command`.

Final content must still be tool-specific. Do not ship generic family copy as final content.

## Workspace Shape

Shell workspaces use this baseline flow:

1. Input target, command intent, preset, or primary command action starts the model.
2. Basic setting controls define implementation, shell, role, target, ports, and required operands.
3. Custom setting controls expose optional command flags and unsupported-option warning boundaries.
4. Optional visual contract summarizes command preview, tokens, options, warning posture, and operation rows.
5. Shell-owned result text shows the generated command, empty state, and copy behavior.
6. `_base` result summary cards summarize status, mode, protocol, warnings, and generated route text.
7. `_base` output toolbar owns the compact sort and output action toolbar.
8. `_base` table and JSON sections own operation rows, row copy, warnings, errors, JSON output, and restore import frame when implemented.

Family demos should render the extracted section snippet with dummy state around it. Standalone `demo.html` files own demo chrome separately from Netcat runtime extraction: load any icon stylesheet they need, render plain `demo-title` and `demo-title-text` wrappers, and add decorative title icons only when explicitly requested. Result-related family demos must show before and after states as two stacked rows in one column, not side by side.

## Output Expectations

A shell-family tool should keep one normalized command model.

The model should drive:

- current preset
- command role
- target values
- option flags
- generated command tokens
- warnings
- blocking errors
- result summary
- operation rows
- exports
- JSON output
- JSON restore payload when import is implemented

Do not compute visible command text, tables, exports, and JSON from separate state.

## Validation Rules

For shell-family tools, validate the changed surface:

- required file markers
- YAML syntax
- JavaScript syntax
- CSS brace balance
- DOM ID references
- command token ordering
- unsupported option warnings
- copy/export controls
- sort behavior
- JSON payload shape
- shell family parity gate when applying or reapplying the family source
- model-core smoke tests when present
- Browser Use check for workspace output, tabs, sorting, copy/export behavior, and responsive layout when browser-facing behavior changes

Do not claim command safety, production readiness, compliance, or security unless actually validated.
