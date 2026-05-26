# InfraStack Tools Contract

This file governs final runtime tool packages under `templates/content/tools/` and the catalogue contract.

## Runtime Taxonomy

`manifest.yml` in this directory owns runtime groups, category labels, category-to-group mapping, family labels, and ordering.

Tool `meta.yml` files must include `group` and `family` values that match this manifest. Do not move existing package paths to match group labels.

Use `codex/bin/tool-package.sh validate <tool-path>` after package or metadata changes.

When a family baseline is applied or reapplied, validation must also include the matching family parity gate against the final runtime package. `tool-package.sh validate`, namespace markers, and `family-package.sh namespace audit` output are not enough unless they explicitly include that family gate.

## Publication Status

Tool `meta.yml` files should carry `publication_status` for production publishing decisions.

Allowed values:

- `draft`: show a rendered leading `*` on development or review listings and exclude the tool from production publishing
- `ready`: publish normally and render without a star

Every new tool package must start as `publication_status: draft`. Change it to `publication_status: ready` only as a deliberate release step after review and validation.

Do not put `*` directly in `title`, `card_image_title`, slugs, URLs, SEO text, or export metadata. The star is a display marker derived from `publication_status: draft`.

Production catalogue, sitemap, feed, deployment, and rsync generation must include only explicit `publication_status: ready` tools. Production validation must fail when `draft`, missing, or invalid status tools appear in the publish set.

Do not treat missing `publication_status` as production-ready. Missing or invalid status must be excluded.

## Package Rule

Final tools live at:

```text
templates/content/tools/<category>/<tool-slug>/
```

Complete tool packages normally include:

```text
assets/bin/model-core.js
assets/icon/
assets/img/post.html.twig
card.yml
content.md
custom.css
custom.js
meta.yml
tool.html.twig
```

Do not create root-level `post.html.twig`.

New packages can start from `templates/content/factory/phase-2/_content/scaffold/assets/`, but final tools own the copied `assets/bin/`, `assets/icon/`, and `assets/img/` files. Do not recreate the removed root-level shared `tool-post-visual.html.twig` fallback.

Do not omit required files unless the user explicitly asked for a partial scaffold.

## Content References

Tool `content.md` references must follow `templates/content/factory/phase-2/_content/MAIN.md`. Do not ship citation rows with hard `404`, retired, parked, or unrelated-redirect URLs. Every cited source must be official, primary, or source-of-truth for the exact cited claim, and the linked page must match the content around the citation.

## Tool Typography

Final tool packages must inherit the platform two-font system: `Nunito` for headings, page titles, card titles, and section headings through `--heading-font`; `Roboto` for body copy, navigation, labels, controls, tables, tool UI text, and support text through `--default-font`.

Do not add Rubik, Poppins, Inter, or other proportional font families to `custom.css`, generated package CSS, shared section CSS, family workspace sources, image templates, or Google Fonts links. Monospace stacks are allowed only for code, terminal, command, JSON, and preformatted output.

---

# InfraStack Tool Catalogue

## DevOps Task Recording

Catalogue, package, taxonomy, script, namespace, family, or batch tool work must use the current DevOps task templates before implementation or validation continues.

Create or resume records with:

```bash
codex/bin/_init.sh <task_name> --kind <kind>
```

Use `create` for one new tool, `batch` for multiple coordinated tool creation jobs, `baseline` for reusable family source extraction or reapplication, `functional` for user-exercisable behavior, `revise` for visible UX/content/workflow improvements, `refactor` for behavior-preserving cleanup, `audit` for review-only work, `fix` for bounded defects, `smoke` for quick sanity checks, `validation` for check-only work, and `platform` for shared standards or tooling.

Use `context/validation-plan.md` for planned checks and `evidence/` for proof of checks that actually ran.

## Batch Tool Creation

Use `codex/bin/batch-package.sh` when a request creates multiple tools in one coordinated pass.

Batch creation must:

- group jobs by `family`
- keep a readable process label for every tool job
- run only as many parallel jobs as the batch manifest or command allows
- write status to a `batch` DevOps task record
- report user status as text cards by family, not as raw process ids
- keep every created tool as `publication_status: draft`

Commands:

```bash
codex/bin/batch-package.sh plan <batch.yml>
codex/bin/batch-package.sh start <batch.yml> --parallel 2
codex/bin/batch-package.sh status <task-name-or-path>
```

Use `start` for background work and `run` for foreground work. While a batch is running, answer status requests from `codex/bin/batch-package.sh status <task-name-or-path>`.

## New Tool Creation Priority

When creating a new tool:

1. Confirm the category against `templates/content/tools/manifest.yml`.
2. Confirm the dominant family against `templates/content/tools/manifest.yml`.
3. Confirm the group from `meta.yml` or the manifest category mapping.
4. Pick one target tool only. Use `batch-package.sh` only after the one-tool process is proven.
5. Pick the same-family production reference package before writing runtime files.
6. Copy the production reference package first, then convert slug, DOM prefix, title, metadata, and target domain labels.
7. Use `_base` and family workspace manifests as contract checks for required hooks and behaviors, not as the final visual or runtime source.
8. Adapt only tool-native labels, options, schemas, command or model logic, and Custom settings after the reference runtime is in place.
9. Every Custom control must have a real handler and affect normalized state, visible output, operation rows or warnings when applicable, and JSON export/import restore when state exists.
10. If marked `[MVP]`, keep the first build focused and complete.
11. If not marked `[MVP]`, still follow the complete package structure unless the user requests a partial scaffold.
12. Use category/provider color lineage and visual weight from `templates/content/MAIN.md`.
13. Create the final runtime package under `templates/content/tools/<category>/<tool-slug>/`.
14. Run `tool-package.sh validate`, `tool-package.sh parity ... --reference <production-reference>`, and Browser Use against `https://infrastack.my` before accepting the final UI/runtime.

Do not assume every InfraStack tool is an architecture tool.

Only use `templates/content/factory/phase-1/_family/architecture/` when the dominant family is architecture.

If the requested tool belongs to a family that does not yet have a baseline, use a tool-local pattern and state the family choice clearly.

## Catalogue Card Baseline

Every catalogue card uses `card_summary` as the visible introduction text.

For new or revised tools, make `card_summary` a concrete one-sentence description of the actual tool result. It should fit the normal `/tools` three-line card rhythm, avoid visible ellipsis clipping, and read naturally in the justified `.tool-card-summary` surface.

Card summaries must be native to the category and family. Do not copy the same sentence across providers or claim prompt, export, restore, scan, security, cost, or live-control behavior that the tool does not implement.

## Tool Family, Category, And Provider

InfraStack separates family, category, and provider.

A family describes tool behavior.

A category describes the technical domain, ecosystem, or operational grouping.

A provider describes the implementation ecosystem, vendor, platform, or product variation.

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

The package path `templates/content/tools/<category>/<tool-slug>/` is a stable filesystem and routing convention. Existing provider-like path segments such as `aws`, `azure`, `gcp`, `ibm`, and `cisco` must not be renamed without a deliberate migration, even though the long-term taxonomy separates category from provider.

`templates/content/tools/manifest.yml` owns the live runtime taxonomy for groups, category labels, group membership, family labels, and family ordering. This file explains catalogue policy and planning; it does not override the manifest.

`src/Service/ToolCatalogService.php` is the shared runtime catalogue reader. Controllers and listing surfaces should use that service instead of repeating filesystem scans.

`codex/bin/tool-package.sh` owns final tool package creation and validation. `codex/bin/batch-package.sh` owns family-grouped batch creation orchestration, parallel job status, and readable progress records. `codex/bin/base-package.sh` owns shared `_base` workspace checks. `codex/bin/family-package.sh` owns family and namespace audits. `codex/bin/tester-package.sh` owns smoke, functional, and family acceptance checks. `codex/bin/performance-package.sh` owns static performance budgets, optional Lighthouse checks, and release performance gates. Tool script profiles define validation gates, not category-specific workspace fields.

For script, namespace, baseline, or batch package changes, final reporting must include how many tools were updated as `X / total`, which tools were not updated and why, whether family sources changed, whether phase-2 content sources changed, whether runtime packages changed, and the evidence path for checks that ran. This count is part of the tool script contract, not optional polish.

Examples:

| Family | Category | Provider | Example tool |
| --- | --- | --- | --- |
| Architecture | Cloud | AWS | AWS VPC Architecture |
| Calculate | Cloud | Azure | Azure Cost Calculator |
| Architecture | Network | Cisco | Cisco Campus Network Architecture |
| Calculate | Network | None | Subnet Calculator |
| Shell | Shell | Ubuntu | Ubuntu User Setup Script Builder |
| Assessment | Security | CIS | CIS Ubuntu Hardening Assessment |
| Scanning | Security | None | Web Security Scanner |
| Generator | Kubernetes | None | Kubernetes YAML Generator |
| Analyzer | Web Server | NGINX | NGINX Config Analyzer |
| Planner | Operations | None | Maintenance Window Planner |
| Dashboard | Operations | None | Service Health Dashboard |

A tool category does not force a tool family.

For example, the `Network` category can contain:

- Architecture Firewall Path
- Calculate Subnet Calculator
- Assessment Port Exposure Assessment
- Table Firewall Rule Matrix
- Generator Network ACL Generator

## Supported Tool Families

InfraStack supports multiple tool families.

### Architecture

For diagram, topology, flow, architecture, dependency, and visual workspace tools.

Current baseline:

```text
templates/content/factory/phase-1/_family/architecture/
```

New architecture tools must read `templates/content/factory/phase-1/_family/architecture/FAMILY.md` and the matching manifests before implementation.

Editable architecture visualizers should follow the family visualizer standard: selectable and movable stage objects, marquee selection when multiple objects can move, keyboard movement, undo for persisted stage edits, clear spacing between boxes and labels, connector lanes that avoid crossing cards or covering text, and outside-edge side anchors for mirrored left/right column flows when that keeps labels clear.

### Scanning

For tools that take a bounded target input, run scanner-style checks, and return evidence-backed findings, tables, exports, and JSON restore boundaries.

Active baseline:

```text
templates/content/factory/phase-1/_family/scanning/
```

Current working reference:

```text
templates/content/tools/security/scan-web-security/
```

Use `scan` as the family verb for new scanning-family tools, such as `scan_web_security` and `scan_headers_security`.

### Assessment

For tools that evaluate posture, readiness, compliance, risk, configuration quality, or maturity.

Active baseline:

```text
templates/content/factory/phase-1/_family/assessment/
```

Current working reference:

```text
templates/content/tools/cis/assess-ubuntu-2204-cis/
```

Use the assessment family baseline for new assessment tools and mirror the current reference grammar for filter scope, result summary, output toolbar, ID-first tables, row copy actions, selected artifact review, JSON snapshots, and trust boundaries.

### Shell

For tools that generate, explain, validate, or compose shell scripts and command workflows.

Active baseline:

```text
templates/content/factory/phase-1/_family/shell/
```

Use the shell family source, not the historical Netcat runtime package, as the source of truth after baseline promotion. Reapplying the shell family to existing shell tools means Netcat-equivalent shell grammar from the family sections: input target, Basic, Custom, generated command, score cards, Sort toolbar, tabs, operation table, warnings, JSON, export rhythm, and restore import where implemented. Adapt only command-native labels, operands, warnings, schemas, and command logic.

Shell reapply is not accepted until the final runtime packages pass the shell parity gate: visible `Custom` panel label, no nested card inside the opened Custom body, Sort options `ID`, `A-Z`, `Field`, `Value`, `Length`, output actions `Export PDF`, `Download CSV`, `Copy JSON`, `Download JSON`, `Import JSON` for current shell generators, fifth-action toolbar layout, and real JSON restore plumbing whenever `Import JSON` is visible.

### Calculate

For tools that calculate values, sizing, capacity, subnetting, cost estimates, ports, IP ranges, or resource requirements.

Active baseline:

```text
templates/content/factory/phase-1/_family/calculate/
```

Current working references:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

Use the calculate family baseline for new calculators and mirror the current three-tool reference grammar for result summary, output toolbar, table tabs, JSON restore, aligned support tables, preset-aligned Example Prompts, provider-native service replacement, and category/provider token adaptation.

When a calculate tool is marked as a baseline, full-copy its stabilized source into `templates/content/factory/phase-1/_family/calculate/baseline/source/` for traceability, then extract reusable markup, CSS, and JavaScript into the matching calculate workspace section files instead of root workspace `custom.css`, `custom.js`, or `demo.html.twig` files.

Calculate workspace section folders must use the architecture-style bundle shape: `README.md`, `demo.html`, `page.html.twig`, `section.css`, and `section.js`.

Across active family baselines, `demo.html` must include its own standalone demo chrome. Keep `demo-title`, `demo-title-icon`, `demo-title-text`, the family placeholder icon, and any icon stylesheet in the demo file, not in reusable `page.html.twig` snippets or final tool runtime packages.

### Generator

For tools that generate configuration files, YAML, scripts, templates, policies, or structured outputs.

Planned baseline:

```text
templates/content/factory/phase-1/_family/generator/
```

### Analyzer

For tools that inspect input and return findings, warnings, recommendations, or parsed structure.

Planned baseline:

```text
templates/content/factory/phase-1/_family/analyzer/
```

### Checklist

For tools that guide users through tasks, controls, hardening items, readiness items, or operational steps.

Planned baseline:

```text
templates/content/factory/phase-1/_family/checklist/
```

### Planner

For tools that help plan migration, maintenance, capacity, deployment, procurement, recovery, or rollout.

Planned baseline:

```text
templates/content/factory/phase-1/_family/planner/
```

### Table

For tools centered on structured inventory, matrix, register, or tabular planning.

Planned baseline:

```text
templates/content/factory/phase-1/_family/table/
```

### Dashboard

For tools that summarize status, KPIs, health, risk, compliance, or operational signals.

Planned baseline:

```text
templates/content/factory/phase-1/_family/dashboard/
```

If no family baseline exists yet, use a tool-local pattern and document the family choice.

## Tool Naming Standard

New tools use a verb-led canonical identity:

```text
<verb>_<content>_<group>
```

The folder slug is the lowercase kebab-case form of that identity.

Examples:

| Family | Canonical identity | Folder slug |
| --- | --- | --- |
| Architecture | `architecture_vpc_aws` | `architecture-vpc-aws` |
| Scanning | `scan_web_security` | `scan-web-security` |
| Shell | `generate_command_shell` | `generate-command-shell` |
| Calculate | `calculate_cost_aws` | `calculate-cost-aws` |

Use `architecture` for architecture family tools.

Preserve existing stable slugs, routes, IDs, classes, and exported JSON keys unless a deliberate migration is part of the task.

## Catalogue Name Versus Product Title

Catalogue names may include the family prefix when it clarifies the tool behavior.

Examples:

```text
Architecture AWS VPC Architecture
Assessment CIS Ubuntu Hardening
Shell Ubuntu User Setup Script Builder
Calculator Subnet Calculator
Scanning Web Security Scanner
Generator Kubernetes YAML Generator
Analyzer NGINX Config Analyzer
Checklist Server Baseline Checklist
Table Firewall Rule Matrix
Dashboard Service Health Dashboard
```

The final product title in `meta.yml` should usually be cleaner:

```yaml
title: AWS VPC Architecture
title: CIS Ubuntu Hardening Assessment
title: Ubuntu User Setup Script Builder
title: Subnet Calculator
```

Use the family prefix in `meta.yml` only when it improves clarity or the platform requires it.

Do not prefix product titles with `*` to mark draft content. Use `publication_status: draft` in `meta.yml` and let review surfaces render the star.

## Category Color System

Use `templates/content/MAIN.md` as the source of truth for category/provider color lineage, visual weight, platform tokens, state tokens, and token governance.

Catalogue and card metadata must use approved lineage values. `card.yml` may store resolved hex values while the renderer requires them, but every resolved value must trace back to `templates/content/MAIN.md`.

Do not duplicate the color registry in catalogue guidance. Update `templates/content/MAIN.md` when a lineage is created, renamed, split, or intentionally migrated.
