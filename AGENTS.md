# InfraStack Agent Map

## Purpose

`AGENTS.md` is the short injected context map for InfraStack work.

It points Codex and other AI agents to deeper contracts instead of carrying every rule.

InfraStack is tool-first. Documentation supports the tool; the tool is the product.

Communication rules:

- keep prose minimal
- stay practical
- do not include `oai_citation`
- do not claim testing, browser verification, compliance, certification, security, reliability, or production readiness unless actually validated

---

## Mission And Vision

Build InfraStack as a disciplined platform of interactive infrastructure, cloud, network, security, operations, and domain-specific workspaces.

InfraStack should grow as a reusable catalogue of interactive tools:

- consistent enough to trust
- modular enough to extend
- specific enough to solve real technical tasks
- structured enough for future tools to inherit stable patterns

---

## Objectives

Every complete tool should:

- deliver a working interactive experience
- produce meaningful visual or functional output
- keep state normalized, exportable, and restorable when state exists
- stay independently understandable and maintainable
- preserve category, family, provider, and domain consistency
- validate the affected surface
- state any test gaps clearly

---

## Source Of Truth

Before creating or substantially revising a tool, read:

1. `AGENTS.md` for this project map.
2. `codex/PROMPT.md` for package, state, export, restore, backend, validation, and strict build rules.
3. `codex/DESIGN.md` for workspace layout, interaction, stage, inspector, output, and responsive rules.
4. `codex/COLOR.md` for platform color philosophy, category/provider registry, visual weight, tokens, and state colors.
5. `codex/CONTENT.md` for metadata, card copy, support markdown, examples, trust, and domain voice.
6. `codex/TOOL.md` for catalogue, family/category/provider taxonomy, MVP, and build phase planning.
7. `codex/FAMILY.md` when family selection or reusable baselines are involved.
8. For work under `templates/content/`, read `templates/content/AGENTS.md`, then the nearest local `AGENTS.md` and matching `manifest.yml`.
9. If the tool belongs to a known family, read the matching family source under `templates/content/family/<family>/`.
10. `codex/devops/AGENTS.md` for task recording and session continuity rules.
11. `SKILL.md` or the active Codex skill when available.

Do not infer new tool patterns from memory when these contracts exist.

---

## DevOps Task Recording

Every new InfraStack work item must be recorded under the active processing queue:

```text
codex/devops/tasks/processing/<task_name>/
```

Create a task record before implementation, validation, audit, or platform guidance work continues:

```bash
codex/bin/_init.sh <task_name> --kind <kind>
```

Supported task kinds:

- `tool`
- `baseline`
- `audit`
- `fix`
- `platform`
- `general`

Use `codex/devops/AGENTS.md` as the source of truth for task recording, resume order, validation evidence, and initializer maintenance.

When continuing existing work, resume the matching task record instead of creating a duplicate. Read `tracking/status.md`, `tracking/session-log.md`, and `tracking/open-questions.md` before making changes.

Task records must capture affected paths, contracts read, decisions, validation evidence, skipped checks, blockers, and next action. Do not store secrets or unredacted sensitive environment data in DevOps records.

Closed task records must be moved under:

```text
codex/devops/tasks/archived/<task_name>/
```

Zero-scope, cancelled, or superseded task records must be moved under:

```text
codex/devops/tasks/abandoned/<task_name>/
```

Use `archived`, not `archieved`. Use `abandoned`, not `abondoned`.

---

## Platform Map

InfraStack currently uses:

- Symfony 8
- Twig
- attribute routes
- Asset Mapper
- plain JavaScript
- filesystem-driven tool packages

Interactive tools live at:

```text
templates/content/tools/<category>/<tool-slug>/
```

Backend code, only when justified, belongs at:

```text
src/Controller/Tools/<Category>/<Tool>/CustomController.php
```

Do not place PHP classes under `templates/`.

## Tool Factory Ownership

The runtime package path stays category-based:

```text
templates/content/tools/<category>/<tool-slug>/
```

Do not move existing packages to match groups, providers, or future catalogue labels.

`templates/content/tools/manifest.yml` owns runtime taxonomy:

- public groups
- category labels
- category-to-group mapping
- family labels
- family ordering

Tool `meta.yml` files must carry explicit `group` and `family` metadata that matches that manifest.

`src/Service/ToolCatalogService.php` is the shared runtime catalogue reader. Controllers, sidebars, and listing Twig should consume catalogue data from that service instead of duplicating filesystem scans or group logic.

`codex/bin/_tool.sh` owns tool package validation and script entry points. `codex/tooling/script/` owns profiles, examples, reusable Python modules, namespace auditing, family parity checks, and create/validate scripts. Profiles define validation gates; they do not define custom workspace fields.

Namespace IDs let future batch work target copied/adapted source blocks without guessing:

```text
family.<family>.workspace.<section>
main.content.<section>
```

When a final tool copies or adapts a family workspace or main content section, wrap only that block with matching `ns:start` and `ns:end` markers in `tool.html.twig`, `custom.css`, `custom.js`, or `content.md`. Do not mark unrelated tool-local code.

After a completed tool is promoted into a family baseline, that family source becomes the source of truth for future family reapplication. Reapplying a family baseline to existing tools means structural, visual, and runtime parity with the family workspace source, proven against the final runtime packages. Preserve only documented tool-native behavior such as labels, command logic, provider/domain terms, stable routes, stable IDs, and exported schemas.

Family parity gates are mandatory. A reapply is not accepted until validation checks the final `tool.html.twig`, `custom.css`, `custom.js`, support content, and model/export/import files for required visible labels, control count and order, DOM hooks, CSS shape rules, JavaScript handlers, output tabs, export actions, import/restore behavior, and normalized state behavior. Namespace markers, source markers, copied comments, copied support text, family demo screenshots, `_tool.sh audit-namespace`, or `_tool.sh validate` by itself do not prove that a family section was applied. If no reusable parity checker exists yet, run a task-local static parity scan and record the missing reusable checker as a gap.

For namespace, baseline, or other batch process changes, the closeout must report coverage explicitly:

- applied tools as `X / total`
- not-applied tool paths and the reason
- whether family sources were updated, with exact paths or `not needed`
- whether shared main sources were updated, with exact paths or `not needed`
- whether existing runtime packages were updated
- parity gate evidence for each family reapplied, including any accepted divergence
- validation commands and browser validation gap when Browser Use is unavailable

Architecture archetypes live in:

```text
templates/content/family/architecture/manifest.yml
```

Those archetypes are generator inputs, not runtime tool packages.

## Complete Tool Package

A complete tool owns:

```text
templates/content/tools/<category>/<tool-slug>/
├── assets/
│   ├── bin/
│   │   └── model-core.js
│   ├── icon/
│   └── img/
│       └── post.html.twig
├── card.yml
├── content.md
├── custom.css
├── custom.js
├── meta.yml
└── tool.html.twig
```

Do not create root-level `post.html.twig`.

The scaffold source for default asset placeholders lives under:

```text
templates/content/main/scaffold/assets/
```

That scaffold path includes the reusable default `assets/img/post.html.twig` source. Do not recreate or reference `templates/content/main/tool-post-visual.html.twig`; that root-level shared fallback has been removed.

Do not omit required files unless the user explicitly asks for a partial scaffold.

## Required File Header Markers

Every complete tool package must use these exact first-line markers:

| File | Required first line |
| --- | --- |
| `content.md` | `[//]: # (content.md)` |
| `card.yml` | `# card.yml` |
| `custom.css` | `/* custom.css */` |
| `custom.js` | `// custom.js` |
| `meta.yml` | `# meta.yml` |
| `tool.html.twig` | `{# tool.html.twig #}` |

Do not place other content before the marker.

## Tool Card Baseline

`card_summary` is the visible introduction text on tool listing cards.

Every complete tool card must keep `card_summary` concrete, domain-native, and tuned to the normal `/tools` three-line card rhythm. Rewrite the summary when it clips with visible ellipses, reads too short to balance the card, or claims prompt, export, restore, scan, cost, security, or control behavior the tool does not actually provide.

Listing card summaries render through `.tool-card-summary`, which is justified text. Write summaries as one clear sentence that still reads naturally when justified.

## Tool Detail Intro Baseline

`meta.intro` is the visible introduction paragraph on tool detail pages.

Keep it as folded YAML that renders as one justified paragraph. For a three-line visual rhythm, follow the character-length baseline in `codex/CONTENT.md`; do not rely on YAML line breaks or font-size changes to force wrapping.

## Family And Process

Before implementation, name the dominant tool family and the family source checked.

If no shared source applies, state that the tool uses a tool-local pattern.

InfraStack tool names must use a verb-led canonical identity:

```text
<verb>_<content>_<group>
```

Examples:

- `architecture_vpc_aws`
- `calculate_cost_aws`
- `generate_command_shell`
- `scan_web_security`

Folder slugs use the kebab-case form of that identity, such as `architecture-vpc-aws`.

Existing stable slugs, IDs, classes, and exported JSON keys must not be renamed without a deliberate migration.

Runtime family labels are declared in `templates/content/tools/manifest.yml`.

Active reusable baselines currently include architecture, assessment, calculate, scanning, and shell. Other manifest families are available for metadata and validation, but a new baseline should only be created when that family work is explicitly scoped.

Do not force non-architecture tools into the architecture family.

Use the matching family baseline when it exists; otherwise use a tool-local pattern and state that no shared family source exists yet.

Reusable family sources live under:

```text
templates/content/family/
```

Family-specific workspace grammar lives under:

```text
templates/content/family/<family>/workspace/
```

Family workspace `demo.html` files own demo-only chrome separately from extracted runtime source. Each standalone family demo must include any icon stylesheet it needs, a visible title row with `demo-title`, `demo-title-icon`, and `demo-title-text`, and a family-appropriate placeholder icon. Do not put demo chrome into reusable `page.html.twig` snippets, final runtime packages, or namespace blocks.

Shared content section structure lives under:

```text
templates/content/main/sections/
```

Family sources guide composition.

They do not replace complete tool-local packages.

When a final tool adapts a main content section, apply the full section contract, not only the visible HTML. Copy or adapt the section `content.md` structure, matching `section.css` visual behavior, and any section JavaScript helper when present into the final tool package. Replace `__PREFIX__`, `__TOOL_CLASS__`, copy-hook names, citation IDs, and section labels with the final tool namespace. Final packages do not automatically load `templates/content/main/sections/content/*/section.css`, so any required card frame, section title icon, heading divider, typography, table, list, details, FAQ, copy-button, citation, prompt, or command styling must be present in the tool-local `custom.css` or in a documented shared include. Do not mark a section as applied until the final runtime package has the same content and visual contract as the selected template.

Shared support sections must use the current title rhythm: each section heading has a left icon and a divider line below it. `Technical Details` keeps the main `h2` title unnumbered, but every `h3` subsection label inside it must visibly start with `1.`, `2.`, `3.`, and so on, carry the section-specific heading class, and use visible separator lines between later numbered headings. `Prompt Tips`, `How To Use`, and `FAQ` accordions use left icon chips for each row, and `How To Use` plus `FAQ` must start with a short explanatory paragraph before the accordion items.

Complete content delivery uses `01_overview`, `02_technical-details`, `04_tips-prompts`, `05_how-to-use`, `06_export-notes`, `07_faq`, and `10_references`.

Use exactly one normal example section: `templates/content/main/sections/content/03_example-prompts/` for architecture, prompt-driven, and preset-brief examples, or `templates/content/main/sections/content/09_example-commands/` for shell, command-generator, runbook, scanner, assessment, or other literal terminal command examples.

Use `templates/content/main/sections/content/08_acronyms/` only for abbreviation expansion tables. Use `templates/content/main/sections/content/11_glossary/` only for broader domain, command, or workflow terminology. Do not include both unless a deliberate exception is recorded.

Use `templates/content/main/sections/content/10_references/` for complete factual content delivery and when content includes citations. Citations must be valid, source-backed, written into the actual content, and clickable to the matching References table row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when making technical claims, and use structured review aids such as bullets or tables when they clarify behavior. A full `content.md` with factual technical claims should carry at least three real references. Do not claim accuracy, security, production readiness, compliance, current pricing, or similar trust outcomes unless the tool actually validates them. Tool behavior claims must match implemented code and recorded validation.

Support markdown typography is governed by `codex/CONTENT.md`. Bullets and numbered items must stay left-aligned with normal word spacing, markdown-card list items must inherit their parent list font size and line height, and inline code chips in support copy must render at `0.875em`. Apply this across shared content sections, family sources, final tool CSS, and compiled runtime assets when those surfaces are changed.

Section-template validation must inspect the final tool package, not only the source template. Check `content.md` namespace markers, unresolved placeholders, final `custom.css` selectors for card frame and heading divider, table/list/code/detail/FAQ/copy/citation selectors used by the section, CSS brace balance, JavaScript copy hooks when present, and Browser Use rendering when available. If Browser Use is unavailable, report the browser validation gap instead of substituting another browser path.

Prompt and command terminal strip titles must use centered title case, such as `Scaffold Prompt` or `Netcat Command`. Do not force all-caps labels for those terminal titles.

When a user asks for a tool by family, read the matching family `workspace/` source before adapting shared main content sections.

Every meaningful workspace item should have a stable tool/process namespace.

Persistent controls, selected items, layout edits, connector edits, output tabs, exports, and restore data must live in normalized state or documented import/export data.

## Architecture Family Baseline

For diagram, topology, flow, architecture, dependency, visual workspace, prompt-driven diagram, or editable visual model tools, use the architecture family baseline.

Preferred baseline path:

```text
templates/content/family/architecture/
```

Before implementation, read:

1. `templates/content/family/architecture/README.md`
2. `templates/content/family/architecture/manifest.yml`
3. `templates/content/family/architecture/workspace/README.md`
4. `templates/content/family/architecture/workspace/manifest.yml`
5. architecture workspace section folders under `templates/content/family/architecture/workspace/`
6. `templates/content/main/scaffold/README.md`
7. `templates/content/main/sections/manifest.yml`
8. `templates/content/main/sections/content/`

The AWS VPC Architecture tool at `templates/content/tools/aws/architecture-vpc-aws/` is the architecture workspace reference implementation.

The reusable baseline for new architecture tools is the architecture family template, not the AWS tool itself.

Shared content section folders live under `templates/content/main/sections/content/`. Family workspace section folders live under `templates/content/family/<family>/workspace/`. Do not recreate duplicated `sections/` folders inside family baselines.

`templates/content/main/scaffold/` owns the package skeleton. `templates/content/main/sections/` owns content delivery. Architecture workspace CSS and JavaScript are section-owned; do not keep root `workspace/custom.css`, `workspace/custom.js`, or `workspace/demo.html.twig` snapshot files in the architecture family baseline.

New architecture tools must use `architecture` as the family verb in canonical IDs, catalogue naming, and new slugs.

Current architecture baseline is centralized in:

```text
templates/content/family/architecture/AGENTS.md
templates/content/family/architecture/manifest.yml
templates/content/family/architecture/workspace/manifest.yml
```

Update those local sources first when the architecture baseline changes. Keep root guidance as a map, not a duplicate baseline.

## Calculate Family Baseline

For cost, pricing, sizing, capacity, budget, run-rate, or assumption-driven calculation tools, use the calculate family baseline.

Preferred baseline path:

```text
templates/content/family/calculate/
```

Before implementation, read:

1. `templates/content/family/calculate/README.md`
2. `templates/content/family/calculate/manifest.yml`
3. `templates/content/family/calculate/workspace/README.md`
4. `templates/content/family/calculate/workspace/manifest.yml`
5. calculate workspace section folders under `templates/content/family/calculate/workspace/`
6. `templates/content/main/scaffold/README.md`
7. `templates/content/main/sections/content/`

The current calculate workspace reference set is:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

AWS is the structural reference. Azure and IBM Cloud are provider-adaptation references for service naming, category/provider token application, chart palette replacement, support-copy cleanup, and copied-token scans.

The reusable baseline for new calculate tools is the calculate family template, not any single provider tool.

The current calculate baseline should inherit the stabilized three-tool structure: estimate label or brief, preset settings, component cards, visible assumptions, two-column result summary, architecture-style output toolbar, `ID` default sort for stable line items, tabbed output shell, JSON output, optional JSON restore, aligned support tables, Example Prompts with `Copy prompt` controls, and category/provider token adaptation before closeout.

When a user says to baseline a calculate tool, full-copy the stabilized source into `templates/content/family/calculate/baseline/source/` for traceability, then extract reusable markup, CSS, and JavaScript into the matching calculate workspace section files. Do not keep root workspace `custom.css`, `custom.js`, or `demo.html.twig` files for the calculate family baseline.

Every calculate workspace section folder must match the architecture workspace section bundle shape: `README.md`, `demo.html`, `page.html.twig`, `section.css`, and `section.js`.

New calculate tools must use `calculate` as the family verb in canonical IDs, catalogue naming, and new slugs.

## Current References

Use these as active family workspace references:

```text
templates/content/tools/aws/architecture-vpc-aws/
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/architecture-vnet-azure/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/gcp/architecture-vpc-gcp/
templates/content/tools/ibm/calculate-cost-ibm/
```

Reuse workflow grammar, not copied provider language.

Keep visible labels, metadata, content, icons, category/provider token lineage, examples, and score copy native to the provider or domain.

## Non-Negotiables

- Build tools, not article-first pages.
- Prefer browser-first behavior with plain JavaScript.
- Add backend only for work that should not live in the browser.
- Preserve stable routes, slugs, IDs, classes, and exported JSON keys unless a versioned migration is deliberate.
- Keep CSS scoped under one tool namespace.
- Treat JSON import and restore as first-class when state exists.
- Do not ship fake controls.
- Do not ship fake exports.
- Do not ship placeholders as final behavior.
- Do not ship stale copied terms from another provider or domain.
- Do not ship arbitrary unmanaged colors outside `codex/COLOR.md` lineage and token rules.
- Do not ship broken assets.
- Do not claim compliance, security, reliability, cost, production readiness, or certification without real validation.

## Validation

Validate the surface changed.

Use relevant checks:

- PHP lint
- Twig IDs, includes, and variables
- YAML parse or syntax review
- CSS brace balance
- CSS overflow and responsive layout review
- JavaScript syntax
- DOM reference review
- model-core tests when parser, schema, import, or export changes
- JSON import/export restore check when state exists
- browser check through Browser Use when stage behavior, export behavior, drag, resize, keyboard, fullscreen, or responsive layout changes

For browser validation, use the stable local domain:

```text
https://infrastack.my
```

Do not use VM IP addresses for browser checks.
Do not use tunnels, local port forwarding, ad hoc PHP servers, or local port proxies for InfraStack browser validation.

Use the Browser Use plugin for dev-mode browser checks.

Current Codex builds may expose Browser Use through the `browser-use:browser` skill and the in-app browser runtime. That runtime may use internal API names such as `tab.playwright`; this still counts as Browser Use only when it is reached through the Browser Use plugin and the Codex in-app browser.

Do not use standalone Playwright MCP, local Playwright scripts, Chrome DevTools Protocol fallbacks, tunnels, local port forwarding, VM IP addresses, ad hoc PHP servers, or local port proxies for InfraStack browser validation.

If Browser Use is unavailable, blocked, or no longer exposed in the session, stop and report that browser validation cannot be completed. Do not substitute another browser automation path unless the user explicitly approves that fallback for the current task.

For Twig, PHP, Symfony, or Composer validation that needs the VM shell:

```bash
ssh vm-host-infrastack
xxcd.iad.infrastack
xxcomposercache
```

Then run targeted Twig, PHP, Symfony, or Composer validation from the VM project shell.

Do not claim browser behavior was verified unless it was actually tested.

## Standard Changes

When a user asks to change the InfraStack standard, ask before editing guidance files:

```text
This looks like a change to the InfraStack tool standard.

Do you want me to apply this across the relevant guidance markdown files?

Type:
- Yes = update all affected markdown files
- No = treat this as a one-time note only
```

## Success Standard

A successful contribution leaves InfraStack:

- clearer
- more modular
- more usable
- more consistent
- more extensible
- easier to maintain
