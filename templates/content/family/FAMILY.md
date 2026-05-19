# InfraStack Family Contract

This file governs reusable family baselines under `templates/content/family/` and the family contract.

Family sources guide composition. They do not replace final tool packages.

After a family baseline is promoted, that family source is the source of truth for future family application. Reapplying a family to existing tools requires structural, visual, and runtime parity with the family workspace source, proven against the final runtime packages. Namespace markers, source comments, copied support text, family demo screenshots, `_tool.sh audit-namespace`, or `_tool.sh validate` by itself do not count.

## Local Active Families

- `architecture/`: diagram, topology, flow, dependency, and editable visual workspace tools.
- `assessment/`: posture, readiness, compliance, risk, quality, maturity, and benchmark assessment tools.
- `calculate/`: cost, sizing, capacity, budget, and assumption-driven calculation tools.
- `scanning/`: target-driven scanners, bounded probes, evidence tables, export controls, and JSON restore boundaries.
- `shell/`: shell command generators, command composers, validators, explainers, and terminal workflow helpers.

## Local Family Rules

- Each active family should own `FAMILY.md`, `README.md`, `manifest.yml`, and `workspace/`.
- Family workspace sections belong under `templates/content/family/<family>/workspace/`.
- Shared content sections belong under `templates/content/main/sections/`.
- Do not create duplicated `sections/` folders inside family baselines.
- Do not make final tools depend on family files at runtime unless a shared include/import system is deliberately implemented.
- Final tools still live under `templates/content/tools/<category>/<tool-slug>/`.
- Prompt and command support examples inherit centered title-case terminal strip titles from the shared main content sections.
- Support markdown typography inherits the cross-family standard from `templates/content/main/MAIN.md`: bullets stay left-aligned, markdown-card list items inherit parent list size and line height, and inline code chips use `0.875em`.

---

# InfraStack Tool Families

## Purpose

This document defines how InfraStack organizes reusable tool families.

A family describes the behavior and interaction model of a tool.

A category describes the technical domain, ecosystem, or operational grouping.

A provider describes the implementation ecosystem, vendor, platform, or product variation.

InfraStack is not limited to architecture tools.

The architecture family owns diagram, topology, dependency, and editable visual workspace tools.

Current and planned families include architecture, assessment, calculate, scanning, shell, generator, analyzer, checklist, planner, table, dashboard, and other tool types.

Family definitions help Codex decide:

- what kind of tool is being created
- what baseline structure should be used
- what workspace behavior is expected
- what content rhythm is appropriate
- what validation rules apply
- whether a reusable family source already exists

Family baselines may guide card copy, but every final tool still owns its own `card.yml`. The tool-local `card_summary` must follow the shared catalogue-card baseline in `templates/content/main/MAIN.md`: concrete one-sentence intro, category-native wording, normal three-line card rhythm, no visible ellipsis clipping, and natural justified rendering.

---

## DevOps Task Recording

Family baseline, family reapply, parity, namespace, or cross-tool family work must use the current DevOps task templates before implementation or validation continues.

Use `baseline` for reusable family source extraction or reapplication, `audit` for read-only parity review, `fix` for bounded family defects, `refactor` for behavior-preserving internal cleanup, `revise` for visible family/workspace improvements, `smoke` for quick sanity checks, `validation` for check-only work, and `platform` for shared family standards.

Use `context/validation-plan.md` for planned checks and `evidence/` for proof of checks that actually ran.

---

## Family, Category, And Provider

InfraStack separates family, category, and provider.

A family describes tool behavior.

A category describes the technical or domain area.

A provider describes the implementation ecosystem or vendor/platform variation.

The relationship is:

```text
Family
    ↓
Category
    ↓
Provider
    ↓
Tool
```

Examples:

| Family | Category | Provider | Example tool |
| --- | --- | --- | --- |
| Architecture | Cloud | AWS | AWS VPC Architecture |
| Calculate | Cloud | Azure | Azure Cost Calculator |
| Scanning | Security | None | Web Security Scanner |
| Calculate | Network | None | Subnet Calculator |
| Shell | Shell | Ubuntu | Ubuntu User Setup Script Builder |
| Assessment | Security | CIS | CIS Ubuntu Hardening Assessment |
| Generator | Kubernetes | None | Kubernetes YAML Generator |
| Analyzer | Web Server | NGINX | NGINX Config Analyzer |
| Planner | Operations | None | Maintenance Window Planner |
| Dashboard | Operations | None | Service Health Dashboard |

A category does not force a family.

For example, the `Network` category can contain:

- Architecture Firewall Path
- Calculate Subnet Calculator
- Assessment Port Exposure Assessment
- Table Firewall Rule Matrix
- Generator Network ACL Generator

---

## Canonical Naming Rule

Every new tool should have a verb-led canonical identity:

```text
<verb>_<content>_<group>
```

Use the canonical identity for planning, internal naming, migration notes, and new family naming.

Examples:

| Family | Canonical identity | Folder slug |
| --- | --- | --- |
| Architecture | `architecture_vpc_aws` | `architecture-vpc-aws` |
| Architecture | `architecture_firewall_path_network` | `architecture-firewall-path-network` |
| Scanning | `scan_web_security` | `scan-web-security` |
| Shell | `generate_command_shell` | `generate-command-shell` |
| Calculate | `calculate_cost_aws` | `calculate-cost-aws` |

Folder slugs use lowercase kebab-case.

The first token should be a verb or family verb that states the primary action.

Preferred family verbs:

| Family | Preferred verb |
| --- | --- |
| Architecture | `architecture` |
| Scanning | `scan` |
| Shell | `generate`, `compose`, `explain`, or `validate` |
| Calculate | `calculate` |
| Generator | `generate` |
| Analyzer | `analyze` |
| Checklist | `check` |
| Planner | `plan` |
| Table | `map` or `compare` |
| Dashboard | `monitor` or `summarize` |

Use `architecture_*`, `architecture-*`, and `Architecture ...` names for architecture family outputs.

Preserve existing stable folder slugs, routes, IDs, classes, and exported keys unless a deliberate migration is part of the task.

---

## Family Source Root

Reusable family sources live under:

```text
templates/content/family/
```

Reusable content section source folders live under:

```text
templates/content/main/sections/
```

Each active family baseline should have its own folder:

```text
templates/content/family/<family>/
```

Each active family that defines reusable workspace grammar should also have:

```text
templates/content/family/<family>/workspace/
```

Example:

```text
templates/content/family/architecture/
```

A family source is a reusable baseline.

It does not replace the final tool package.

Final tool files must still be generated under:

```text
templates/content/tools/<category>/<tool-slug>/
```

---

## Current Active Family

The current active family baselines are:

```text
templates/content/family/architecture/
templates/content/family/assessment/
templates/content/family/calculate/
templates/content/family/scanning/
templates/content/family/shell/
```

Use a family baseline only when that family directory contains a valid `README.md` and `manifest.yml`.

Runtime family labels and ordering are declared in `templates/content/tools/manifest.yml`. Family guidance explains reusable baselines; it does not override the runtime taxonomy manifest.

---

## Planned Future Families

Planned future family baselines:

| Family | Status | Planned path |
| --- | --- | --- |
| Architecture | Active standard | `templates/content/family/architecture/` |
| Assessment | Active standard | `templates/content/family/assessment/` |
| Calculate | Active standard | `templates/content/family/calculate/` |
| Scanning | Active standard | `templates/content/family/scanning/` |
| Shell | Active standard | `templates/content/family/shell/` |
| Generator | Planned | `templates/content/family/generator/` |
| Analyzer | Planned | `templates/content/family/analyzer/` |
| Checklist | Planned | `templates/content/family/checklist/` |
| Planner | Planned | `templates/content/family/planner/` |
| Table | Planned | `templates/content/family/table/` |
| Dashboard | Planned | `templates/content/family/dashboard/` |

Only use a family baseline when that family directory exists and contains a valid `README.md` and `manifest.yml`.

If the requested tool belongs to a planned family that does not exist yet, use a tool-local pattern and state that no shared family source exists yet.

---

## Family Selection Rule

Before creating a new tool, identify the dominant family.

Steps:

1. Read the user request.
2. Identify the category.
3. Identify the dominant tool behavior.
4. Match the behavior to a family.
5. Check whether `templates/content/family/<family>/` exists.
6. If it exists, read its `README.md`, `manifest.yml`, `workspace/README.md`, `workspace/manifest.yml`, and relevant main content sections.
7. If it does not exist, use a tool-local pattern and document the family choice.
8. Generate the final tool package under `templates/content/tools/<category>/<tool-slug>/`.

Do not force every new tool into the architecture family.

Only use the architecture baseline when the main output is a diagram, topology, flow, visual map, visual layout, or visual model.

---

## Family Source Rule

A family source may define:

- section adaptation rules
- family workspace grammar
- workspace rhythm
- support markdown rhythm
- reusable process names
- common helper copy patterns
- common UI shell structure
- expected interaction surfaces
- visualizer spacing, connector routing, selection, movement, and undo expectations
- expected export/import surfaces
- validation checklist
- reference implementation path

Family controls behavior, workspace rhythm, layout, interaction, and output pattern. Family does not own the primary visual identity. Final tool color must come from the category/provider lineage and semantic tokens defined in `templates/content/MAIN.md`.

Family sources must not duplicate a `sections/` tree. Shared content section folders belong to `templates/content/main/sections/content/`. Family-specific workspace grammar and workspace section folders belong to `templates/content/family/<family>/workspace/`.

A family source must not:

- replace tool-local files
- force generic copy into final tools
- create hidden runtime dependency unless documented
- cause CSS or JavaScript namespace leakage
- override provider/domain-specific content
- bypass category/provider token and visual weight rules

---

## Required Family Source Files

Each active family baseline should include:

```text
templates/content/family/<family>/
├── README.md
├── manifest.yml
└── workspace/
```

The workspace folders depend on the family.

Shared content section folders live under `templates/content/main/sections/content/`.

Complete content delivery uses `01_overview`, `02_technical-details`, `04_tips-prompts`, `05_how-to-use`, `06_export-notes`, `07_faq`, and `10_references`.

Applying a shared main content section to a final tool means applying its full section contract: `content.md` markup, `section.css` visual behavior, and `section.js` helper behavior when present. Final tools do not automatically load main section CSS or JavaScript. Copy or adapt required card frames, section title icons, heading divider lines, Technical Details subsection separators, row icons, typography, tables, lists, details/FAQ behavior, copy controls, citation styling, prompt terminals, and command terminals into the final package `custom.css` and `custom.js` unless a documented shared include exists.

Use exactly one normal example section: `03_example-prompts` for architecture-family, prompt-driven, and preset-brief examples, or `09_example-commands` for shell, command-generator, runbook, scanner, or assessment examples that users copy as literal terminal commands. Use `10_references` for complete factual content delivery and when final tool content includes citations. Choose `08_acronyms` only for abbreviation expansion tables; choose `11_glossary` only for broader domain, command, or workflow terminology. Do not include both unless a deliberate exception is recorded. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Prompt and command terminal strip titles must stay centered and title case.

`templates/content/main/scaffold/` owns the package skeleton. `templates/content/main/sections/` owns content delivery. Do not substitute the scaffold for content section sources.

---

## Family Baseline Extraction

Use a `baseline` DevOps task when converting a completed tool into reusable family source.

The baseline workflow is:

1. Full-copy the source tool runtime files first.
2. Store the full-copy snapshot only as a reference source when it helps extraction.
3. Split the source into numbered workspace section folders.
4. Keep section folders as the real reusable family source.
5. Update the family manifest after the section split is understood.

Reference snapshots may use:

```text
templates/content/family/<family>/baseline/source/
├── tool.html.twig
├── custom.css
├── custom.js
└── assets/bin/model-core.js
```

The snapshot is not a runtime package and must not be imported by final tools. It exists so future baseline work does not need to rediscover the original source package on every request.

Workspace sections still use the section-owned shape:

```text
templates/content/family/<family>/workspace/01_<section-name>/
├── README.md
├── demo.html
├── page.html.twig
├── section.css
└── section.js
```

`demo.html` is demo chrome plus a section preview. The demo chrome is not extracted runtime source: keep its page shell, icon stylesheet, `demo-title`, `demo-title-icon`, `demo-title-text`, and demo-only visibility controls local to the demo. Use a family-appropriate placeholder icon, and do not copy demo chrome into `page.html.twig`, final runtime packages, or namespace blocks.

Do not create one folder per profile, archetype, or variant unless generator code actually needs separate files. Prefer compact `manifest.yml` data plus real workspace section source files.

## Family Baseline Reapplication

After a completed tool is promoted into a family baseline, the family source is the source of truth for future tools and for reapplying the family to existing tools.

Reapplication is strict and must be proven by a parity gate against the final runtime packages:

- final tools must match the family source's section structure, visual rhythm, DOM pattern, implemented controls, output framing, export behavior, import behavior, and restore boundary where that behavior exists
- the gate must inspect visible labels, control count and order, DOM hooks, CSS selectors and shape rules, JavaScript handlers, output tabs, export/import actions, normalized state behavior, support content section contracts, and model/export/import files when present
- namespace markers, source markers, copied comments, copied support text, family demo screenshots, or `_tool.sh audit-namespace` output are not acceptance evidence
- `_tool.sh validate` remains required for affected packages, but it is not sufficient unless it runs the relevant family parity gate
- a reference tool is not exempt when it is part of the reapply scope; it must pass the same current family-source parity gate as every other target package
- tool-specific adaptation is limited to domain labels, provider/category tokens, icons, examples, command or model logic, stable route paths, stable DOM IDs needed by existing behavior, and exported schema compatibility
- every intentional divergence must be recorded in the task record, closeout, and `evidence/` when it affects validation or parity

Do not describe a package as reapplied when only markers, comments, partial CSS, support copy, or an old reference snapshot changed. If no reusable family parity checker exists yet, run a task-local static parity scan, store the proof under `evidence/`, and record the missing reusable checker as a gap or follow-up.

---

## Namespace Process

Family workspace section folders are namespace sources for future audit and migration:

```text
family.<family>.workspace.<section>
```

Shared main content section folders are namespace sources for support content:

```text
main.content.<section>
```

Examples:

```text
family.architecture.workspace.01_input-brief
family.assessment.workspace.06_result-view
family.calculate.workspace.07_table-export
main.content.03_example-prompts
main.content.10_references
```

When a namespace source is copied or adapted into a final tool, wrap only the relevant generated/adapted block with `ns:start` and `ns:end` markers. Use Twig comments in `tool.html.twig`, CSS comments in `custom.css`, JavaScript line comments in `custom.js`, and HTML comments in `content.md`.

Do not mark unrelated tool-local code, and do not mark a block unless its source namespace is known. Missing markers can be audited and retrofitted; false markers make batch migration unsafe.

A namespace marker is not enough to prove a section was applied. Final package validation must also check that the required visible labels, markup structure, CSS contract, JavaScript contract, DOM hooks, output behavior, export/import behavior, and normalized state behavior for that namespace exist in the final package, all placeholders are replaced, and the structural, visual, and runtime behaviors from the source section are preserved.

Use:

```bash
codex/bin/_tool.sh audit-namespace family.assessment.workspace.01_input-brief
codex/bin/_tool.sh migrate-namespace family.assessment.workspace.01_input-brief --dry-run
```

Migration apply mode remains blocked until the target blocks are marked and not customized.

When family or namespace work touches reusable sources or existing packages, closeout must separate the surfaces:

- family sources updated: exact `templates/content/family/<family>/...` paths, or `not needed`
- shared main sources updated: exact `templates/content/main/...` paths, or `not needed`
- runtime tool packages updated: applied count as `X / total`
- not-applied tool paths and reasons
- remaining family gaps when a family is intentionally not updated
- parity gate evidence for every family reapplied, including any accepted divergence

---

## Family Manifest Requirements

Every active family baseline should include:

```text
manifest.yml
```

The manifest should define:

- family name
- version
- description
- status
- required sections
- required output files
- reference tool if available
- generation rules
- validation rules

---

## Family README Requirements

Every active family baseline should include:

```text
README.md
```

The README should explain:

- what the family is for
- when to use the family
- when not to use the family
- required structure
- how to compose a final tool
- how to adapt content
- how to adapt workspace sections
- how to validate final output
- how the reference implementation should be used

---

# Active Family: Architecture

## Purpose

The architecture family is for tools that generate or display:

- architecture diagrams
- topology diagrams
- network diagrams
- cloud diagrams
- security path diagrams
- operations diagrams
- request flow diagrams
- dependency maps
- visual workspaces
- prompt-driven diagrams
- editable visual models

## Baseline Path

```text
templates/content/family/architecture/
```

Compatibility source until migration:

```text
templates/content/family/architecture/
```

## Required Architecture Sources

```text
templates/content/family/architecture/
├── README.md
├── manifest.yml
└── workspace/
    ├── README.md
    ├── manifest.yml
    ├── assets/
    ├── 01_input-brief/
    ├── 02_basic-settings/
    ├── 03_advanced-settings/
    ├── 04_selected-item/
    ├── 05_result-text/
    ├── 06_result-diagram/
    ├── 07_score-card/
    ├── 08_sort-card/
    └── 09_result-table/
```

Architecture workspace CSS and JavaScript are section-owned through `section.css` and `section.js`. Do not keep root `workspace/custom.css`, `workspace/custom.js`, or `workspace/demo.html.twig` snapshot files for the architecture family baseline.

## Architecture Required Output Files

Every final architecture tool must still include:

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

## Architecture Reference Rule

AWS VPC Architecture is a reference implementation.

It is not the official reusable baseline.

Use:

```text
templates/content/family/architecture/
```

as the reusable baseline for new architecture tools.

Use:

```text
templates/content/tools/aws/architecture-vpc-aws/
```

as a working reference for completed implementation quality, workflow grammar, and interaction behavior.

Do not copy AWS wording, AWS service names, AWS icons, or AWS-specific internal assumptions into unrelated tools.

New architecture tools must use `architecture` as the family verb in canonical identities, catalogue names, and new slugs.

---

## Architecture Baseline Snapshot

The current architecture baseline is centralized under:

```text
templates/content/family/architecture/FAMILY.md
templates/content/family/architecture/manifest.yml
templates/content/family/architecture/workspace/manifest.yml
```

Keep detailed baseline rules there. This file owns family selection and family-level process rules.

---

## Architecture Visualizer Interaction Standard

Architecture tools with editable stages should treat the whole diagram as an editable workspace.

Expected behavior:

- first refresh shows a blurred preset preview with the overlay text `Choose a preset to generate diagram`
- first refresh does not create the real generated model, output, inventory, score, selected object, layout override, connector override, or export state
- preset selection or the primary generate action replaces the preview with the generated editable stage
- diagram cards, row bands, zones, subnets, grouping boxes, and container boxes are selectable and movable when they are part of the visible model
- selected objects expose a clear selected state, not color alone
- empty-canvas drag creates a visible marquee selection rectangle when multiple objects can be selected
- dragging any selected object moves the selected group
- arrow keys move the selected object or selected group
- modifier-key movement and resize shortcuts are documented only when implemented
- `Cmd + Z` on macOS and `Ctrl + Z` on Windows/Linux undo the previous persisted stage edit when layout editing is implemented
- undo restores layout and connector overrides, not only DOM classes
- JSON export and restore preserve layout and connector edits

Default architecture diagrams should reserve clear lanes and gaps before placing nodes:

- edge or ingress controls should sit in a readable lane above the main network or region boundary
- tier, zone, subnet, and grouping boundaries should remain visually distinct
- cards should not cover boundary labels, badges, chips, resize handles, or helper text
- connector branches should run through reserved gaps or gutters
- shared ingress or fan-out paths should use centered trunks where that improves readability
- arrows should land at target card centers unless a specific side anchor is clearer
- mirrored left/right column diagrams should use outside-edge side anchors for vertical fan-out and tier-to-tier paths, while horizontal peer or replication paths keep inner-side anchors

Do not ship a visualizer where large tier boxes are fixed while smaller cards are draggable unless there is a documented domain reason.

---

# Active Family: Scanning

## Purpose

The scanning family is for tools that take a bounded target input, run scanner-style checks, and return evidence-backed findings, tables, exports, and JSON restore boundaries.

Examples:

- Web Security Scanner
- HTTP Security Headers Checker
- Cookie Security Checker
- CSP Scanner
- Open Redirect Scanner
- Email Security Posture Checker

## Active Path

```text
templates/content/family/scanning/
```

Use `templates/content/family/scanning/workspace/` for scanner target setup, option panels, hidden-first result output, evidence tables, export controls, and JSON restore boundaries.

The current working baseline reference is:

```text
templates/content/tools/security/scan-web-security/
```

Use `scan` as the family verb for new scanning tools. Reuse workflow grammar and structure, not web-header-specific wording.

---

# Active Family: Assessment

## Purpose

The assessment family is for tools that evaluate posture, readiness, compliance, maturity, quality, or risk.

Examples:

- CIS Ubuntu Hardening Assessment
- Port Exposure Assessment
- Cloud Readiness Assessment
- Backup Readiness Assessment
- Security Control Coverage Assessment
- Operations Maturity Assessment

## Active Path

```text
templates/content/family/assessment/
```

Use `templates/content/family/assessment/workspace/` for assessment workspace grammar and `templates/content/main/sections/content/` for shared content section structure.

The current working baseline reference is:

```text
templates/content/tools/cis/assess-ubuntu-2204-cis/
```

Use its stabilized assessment grammar as the quality bar: primary filter, scope selectors, explicit Explore action, pre-run notice, summary cards, architecture-style output toolbar, ID-first table sorting, row copy action column, tabbed findings or controls shell, group rollups, selected artifact review, JSON snapshot output, and clear trust boundaries.

The reusable baseline remains `templates/content/family/assessment/`. Reuse workflow grammar and structure, not CIS, Ubuntu, shell, benchmark, or compliance wording.

---

# Active Family: Shell

## Purpose

The shell family is for tools that generate, explain, validate, or compose shell scripts and command workflows.

Examples:

- Ubuntu User Setup Script Builder
- Proxmox VM Command Builder
- NGINX Reload Command Helper
- Kubernetes Bootstrap Script Builder
- LDAP User Provisioning Script Builder

## Active Path

```text
templates/content/family/shell/
```

Use `templates/content/family/shell/workspace/` for shell command generator grammar and `templates/content/main/sections/content/` for shared content section structure.

Shell workspace sections are scoped as:

```text
templates/content/family/shell/workspace/
├── 01_input-target/
├── 02_basic-setting/
├── 03_advanced-setting/
├── 04_result-text/
├── 05_score-card/
├── 06_sort-card/
└── 07_table/
```

Result-related shell family demos must stack before and after states vertically as two rows in one column.

Shell workspace CSS and JavaScript are section-owned extracted sources. Keep each numbered `section.css` scoped to its section with the repeated minimal shell demo foundation, and keep each `section.js` as a source ownership map covering custom.js line ranges, DOM IDs, classes, variables, functions, and behaviors. Do not create root `workspace/custom.css` or `workspace/custom.js` snapshots, and do not put full custom runtime strings into shell section folders.

The Netcat shell snapshot is marker-anchored for extraction under `templates/content/family/shell/baseline/source/`. Use `source:start/source:end family.shell.workspace.<section>` ranges from that snapshot before regenerating shell workspace sections. Final runtime packages must be checked against the family workspace source, not treated as complete because source markers exist. Family demos should render the extracted section snippets with dummy state, and placeholder replacement must keep `generate-netcat-shell-toolbar` as `__PREFIX__-toolbar` rather than corrupting it into a root-class placeholder.

When reapplying shell to existing tools, apply all seven workspace sections to every shell runtime package in scope, including `generate-netcat-shell` when it is named. The accepted result is shell-family structural, visual, and runtime parity for the command builder, Basic and Custom panels, generated command, summary cards, Sort toolbar, tabs, operation table, warnings, JSON, exports, and restore imports where implemented, with only command-native differences preserved.

The shell parity gate must check the final runtime package, not only the shell demo or snapshot:

- visible Custom panel label is `Custom`; `03_advanced-setting` may remain only as the folder and namespace name
- the Custom panel has no direct nested card frame inside the opened panel body
- Sort options are exactly `ID`, `A-Z`, `Field`, `Value`, and `Length` unless an intentional command-native divergence is recorded
- the output action set for current shell generators is exactly `Export PDF`, `Download CSV`, `Copy JSON`, `Download JSON`, and `Import JSON`
- the fifth toolbar action has working layout rules instead of wrapping as an accidental orphan
- when `Import JSON` is visible, a hidden file input, JavaScript import handler, schema validation, normalized state restore, and visible output refresh all exist
- JSON import controls are not shown when restore is not implemented and validated

When shell-family content shows literal commands, use `templates/content/main/sections/content/09_example-commands/` rather than renaming `03_example-prompts`.

Shell support sections inherit the shared section title icon, divider line, Technical Details separator, row-icon, How To Use intro, and FAQ intro rhythm.

---

# Active Family: Calculate

## Purpose

The calculate family is for tools that calculate values, sizing, capacity, subnetting, ports, IP ranges, cost estimates, or resource requirements.

Examples:

- Subnet Calculator
- CIDR Split Calculator
- VM Sizing Calculator
- Storage Capacity Calculator
- Bandwidth Estimate Calculator
- Cloud Cost Estimate Calculator

## Active Path

```text
templates/content/family/calculate/
```

Use `templates/content/family/calculate/workspace/` for calculate workspace grammar and `templates/content/main/sections/content/` for shared content section structure.

The current working baseline references are:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

Use the stabilized three-tool calculate grammar as the quality bar: estimate label or brief, preset settings, component cards, visible advanced assumptions, two-column result summary, architecture-style output toolbar, ID-first table sorting, tabbed output shell, JSON output, optional JSON restore, support-content tables that fit the content column, Example Prompts with paired `Copy prompt` controls, provider-native service replacement, and category/provider token adaptation.

When a calculate tool is promoted as the baseline, full-copy its stabilized source into `templates/content/family/calculate/baseline/source/` for traceability, then extract reusable markup, CSS, and JavaScript into the matching section-owned workspace files. Do not keep root workspace `custom.css`, `custom.js`, or `demo.html.twig` files for the calculate family baseline.

The reusable baseline remains `templates/content/family/calculate/`. Reuse workflow grammar and structure, not AWS, Azure, IBM Cloud, or other provider wording, color tokens, or pricing assumptions.

## Required Calculate Sources

```text
templates/content/family/calculate/
├── README.md
├── manifest.yml
└── workspace/
    ├── README.md
    ├── manifest.yml
    ├── 01_input-brief/
    │   ├── README.md
    │   ├── demo.html
    │   ├── page.html.twig
    │   ├── section.css
    │   └── section.js
    ├── 02_basic-settings/
    │   └── ...
    ├── 03_advanced-settings/
    │   └── ...
    ├── 04_selected-item/
    │   └── ...
    ├── 05_result-summary/
    │   └── ...
    ├── 06_result-view/
    │   └── ...
    ├── 07_table-export/
    │   └── ...
    └── 08_json-restore/
        └── ...
```

---

# Planned Family: Generator

## Purpose

The generator family is for tools that generate configuration files, YAML, scripts, templates, policies, or structured outputs.

Examples:

- Kubernetes YAML Generator
- NGINX Server Block Generator
- Apache VirtualHost Generator
- Firewall Rule Generator
- Terraform Snippet Generator
- Systemd Unit Generator

## Planned Path

```text
templates/content/family/generator/
```

Use a tool-local pattern until this baseline exists.

---

# Planned Family: Analyzer

## Purpose

The analyzer family is for tools that inspect input and return findings, warnings, recommendations, parsed structure, or improvement suggestions.

Examples:

- NGINX Config Analyzer
- Apache Config Analyzer
- Firewall Rule Analyzer
- Kubernetes YAML Analyzer
- SSH Config Analyzer
- Log Pattern Analyzer

## Planned Path

```text
templates/content/family/analyzer/
```

Use a tool-local pattern until this baseline exists.

---

# Planned Family: Checklist

## Purpose

The checklist family is for tools that guide users through tasks, controls, hardening items, readiness items, or operational steps.

Examples:

- Ubuntu Server Baseline Checklist
- RHEL Hardening Checklist
- Kubernetes Readiness Checklist
- Deployment Readiness Checklist
- Incident Response Checklist

## Planned Path

```text
templates/content/family/checklist/
```

Use a tool-local pattern until this baseline exists.

---

# Planned Family: Planner

## Purpose

The planner family is for tools that help plan migration, maintenance, capacity, deployment, procurement, recovery, or rollout.

Examples:

- Maintenance Window Planner
- Migration Planner
- DR Readiness Planner
- Deployment Rollout Planner
- Procurement Requirement Planner

## Planned Path

```text
templates/content/family/planner/
```

Use a tool-local pattern until this baseline exists.

---

# Planned Family: Table

## Purpose

The table family is for tools centered on structured inventory, matrix, register, tabular planning, or comparison.

Examples:

- Firewall Rule Matrix
- Port Matrix Planner
- Server Inventory Table
- Application Inventory Table
- Certificate Inventory Table
- Backup Schedule Table

## Planned Path

```text
templates/content/family/table/
```

Use a tool-local pattern until this baseline exists.

---

# Planned Family: Dashboard

## Purpose

The dashboard family is for tools that summarize status, KPIs, health, risk, compliance, usage, or operational signals.

Examples:

- Service Health Dashboard
- Resource Usage Dashboard
- Patch Compliance Dashboard
- Risk Summary Dashboard
- Availability Dashboard

## Planned Path

```text
templates/content/family/dashboard/
```

Use a tool-local pattern until this baseline exists.

---

## Family Validation

When using a family baseline, validate:

- `README.md` exists
- `manifest.yml` exists
- `workspace/README.md` exists when the family defines reusable workspace grammar
- `workspace/manifest.yml` exists when the family defines reusable workspace grammar
- shared main content section source exists under `templates/content/main/sections/content/`
- no duplicated `sections/` folder exists under the family directory
- required output files are listed
- reference tool path is valid when used
- family source is not used as final runtime package
- final generated tool still has all required files
- tool-specific namespace is applied
- category and family are both stated in delivery notes
- documented marquee selection, keyboard movement, and undo behavior work
- connector routes avoid cards, labels, and unintended boundary crossings
- mirrored column connector routes use the outside side of each column when that keeps labels clear

---

## Naming Guidance

Use family-specific catalogue names and verb-led canonical identities.

Examples:

```text
Architecture AWS VPC
Scanning Web Security Scanner
Assessment CIS Ubuntu Hardening
Shell Command Generator
Calculator AWS Cost
Generator Kubernetes YAML Generator
Analyzer NGINX Config Analyzer
Checklist Ubuntu Server Baseline
Planner Maintenance Window Planner
Table Firewall Rule Matrix
Dashboard Service Health Dashboard
```

Use clean product titles in `meta.yml` unless the family prefix improves clarity.
