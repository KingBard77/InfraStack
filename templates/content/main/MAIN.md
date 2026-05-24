# InfraStack Main Content Contract

This file governs shared content sources under `templates/content/main/` and the reusable content contract.

## Directory Roles

- `scaffold/`: reusable package skeleton source, including default asset placeholders under `scaffold/assets/`.
- `sections/`: reusable support-content section structure.

## Main Source Rules

- Keep `main/` generic and family-neutral.
- Do not place provider, product, or family-specific final copy here.
- Do not turn `main/` into a runtime package.
- Do not duplicate family workspace sections under `main/`.
- Final tools must still be generated under `templates/content/tools/<category>/<tool-slug>/`.

## Scaffold

The scaffold provides starter file shape, required markers, and default asset placeholders:

- `assets/bin/model-core.js`
- `assets/icon/placeholder.svg`
- `assets/img/post.html.twig`

It does not replace family baselines, model-core logic, tool-local styling, metadata, card copy, or validation.

Do not add or reference `templates/content/main/tool-post-visual.html.twig`; the shared post visual fallback lives at `templates/content/main/scaffold/assets/img/post.html.twig`.

## Sections

Shared content sections define markdown/content rhythm.

Family or tool-specific content should adapt these sections instead of copying generic filler into final pages.

Applying a shared content section means applying the full section contract. Copy or adapt the section `content.md` markup, matching `section.css` visual behavior, and any section JavaScript helper when present into the final tool package. Replace placeholders and prefixes with the final tool namespace. Final tools do not automatically load shared section CSS, so the final `custom.css` must include the required card frame, section title icon, heading divider, typography, table, list, details, FAQ, copy-button, citation, prompt, or command selectors unless a documented shared include provides them.

Update `templates/content/main/sections/manifest.yml` when section inventory or structured metadata changes.

---

# InfraStack Content Contract

## Purpose

This document defines how content must be written, structured, and validated for InfraStack tool pages.

InfraStack is tool-first. Content exists to support the workspace, not to become the main product surface.

Good content helps users understand:

- what the workspace creates
- what inputs matter
- what assumptions are applied
- what the diagram or output represents
- what the export preserves
- what the tool does not validate
- how to use the generated result responsibly

Do not use content to compensate for missing product behavior.

If the page needs interaction, build the interaction.

---

## DevOps Task Recording

Content, metadata, citation, card, support-section, or copy-standard work must use the current DevOps task templates before implementation or validation continues. Use `codex/bin/_init.sh <task_name> --kind <kind>` and choose `revise` for visible content improvements, `audit` for review-only work, `fix` for bounded defects, `create` for new package content, or `platform` for shared standards.

Use `context/validation-plan.md` for planned checks and `evidence/` for proof of checks that actually ran.

---

## Content Role

Content is support material. It should explain the tool, help the user operate it, state assumptions, and make trust boundaries clear.

Use `content.md` for concise support such as:

- overview
- how to use
- examples
- interpretation notes
- export and restore notes
- limitations
- optional FAQ

Do not let content become the main product surface unless the task explicitly asks for a documentation-heavy page.

If there is tension between better prose and a working tool, build the working tool first.

---

## Required Reading Order

Before creating or revising tool content, read:

1. `AGENTS.md`
2. `codex/PROMPT.md`
3. `codex/DESIGN.md`
4. `templates/content/MAIN.md` when card colors, category/provider identity, or state colors are affected
5. `templates/content/main/MAIN.md`
6. `templates/content/tools/TOOLS.md` when category or catalogue alignment matters
7. `templates/content/family/FAMILY.md` when reusable family baselines are involved
8. `codex/devops/AGENTS.md` before task record work
9. the matching family source under `templates/content/family/<family>/` when the tool belongs to a known family

This file owns:

- `meta.yml`
- `card.yml`
- `content.md`
- intro copy
- card copy
- support markdown
- examples
- limitations
- trust signals
- provider/domain wording

For `meta.yml` `group` and `family` values, use `templates/content/tools/manifest.yml` as the runtime taxonomy source.

This file does not own:

- folder structure
- JavaScript state shape
- export and restore implementation
- stage controls
- visual styling
- responsive behavior

Those belong to `AGENTS.md`, `codex/PROMPT.md`, `codex/DESIGN.md`, and `templates/content/MAIN.md`.

---

## Current Reference Content Sets

Use these tools as the primary content reference set for prompt-driven cloud architecture workspaces:

```text
templates/content/tools/aws/architecture-vpc-aws/
templates/content/tools/azure/architecture-vnet-azure/
templates/content/tools/gcp/architecture-vpc-gcp/
```

Use these additional runtime packages as provider and domain adaptation references when their category, provider, or environment is closer to the target tool:

```text
templates/content/tools/huawei/architecture-vpc-huawei/
templates/content/tools/ibm/architecture-cloud-ibm/
templates/content/tools/tmcloud/architecture-cloud-tmcloud/
templates/content/tools/cisco/architecture-campus-network-cisco/
templates/content/tools/infrastructure/architecture-physical-server/
```

The primary set demonstrates the current standard for:

- provider-native intro copy
- metadata structure
- card metadata
- markdown support sections
- example prompts
- technical limitations
- export and restore explanations
- deterministic parser explanations
- architecture positioning

Use the content structure and quality bar. Use the broader runtime set for provider/domain wording, examples, category labels, card rhythm, and copied-term cleanup.

Do not blindly copy provider wording.

Audit note: complete runtime tools keep their post/listing visual in `assets/img/post.html.twig` and use `card_image: null` for template-driven imagery. Do not document or generate a root-level `post.html.twig`, and do not reference the removed `templates/content/main/tool-post-visual.html.twig` fallback.

---

## Family Architecture Content Pattern

Shared reusable content section sources live under:

```text
templates/content/main/sections/content/
```

Use these main sections for repeated support markdown blocks, article sections, example structures, FAQ blocks, acronym or glossary sections, and markdown card patterns before writing a new tool page. Use `templates/content/family/<family>/workspace/` for family workspace grammar and `templates/content/family/<family>/` for family-specific content behavior and adaptation rules. The scaffold and family pattern can guide structure and consistency, but the final `content.md`, `meta.yml`, and `card.yml` must still live in `templates/content/tools/<category>/<tool-slug>/`.

Content must remain tool-specific, domain-native, and aligned with the actual workspace. Do not ship generic family copy as final page content just because a reusable section pattern exists.

Before writing content for a new or substantially revised tool, name the dominant tool family, read `templates/content/family/<family>/workspace/` when it exists, read `templates/content/main/sections/content/`, and check whether a matching family source exists under `templates/content/family/`. Use main content sections for shared rhythm and family content rules for adaptation. If no family source applies, keep the content tool-local but still align it to the selected family.

Applying a shared content section means applying the full section contract, not only the HTML. Copy or adapt the section `content.md` structure, matching `section.css` visual behavior, and any section JavaScript helper when present into the final tool package. Final tools do not automatically load shared section CSS, so required card frames, heading divider lines, typography, tables, lists, details, FAQ accordions, copy controls, citation styling, prompt terminals, and command terminals must be present in tool-local `custom.css` or in a documented shared include.

Every applied section must replace `__PREFIX__`, `__TOOL_CLASS__`, copy-hook names, citation IDs, labels, examples, and source placeholders with the final tool namespace and domain language. Do not call a section applied when only `content.md` was copied but the visual CSS contract was not carried into the final package.

Complete content delivery uses these mandatory support sections: `01_overview`, `02_technical-details`, `04_tips-prompts`, `05_how-to-use`, `06_export-notes`, `07_faq`, and `10_references`.

Choose exactly one normal example section. Use `03_example-prompts` for architecture-family, prompt-driven, and preset-brief examples. Use `09_example-commands` for shell, command-generator, runbook, scanner, or assessment examples that users copy as literal terminal commands. Do not rename prompt examples into command examples when the command-specific section applies. Terminal strip titles for prompt and command examples must be centered title case, such as `Scaffold Prompt` or `Netcat Command`.

Choose `08_acronyms` only for abbreviation expansion tables. Choose `11_glossary` only for broader domain, command, or workflow terminology. Do not include both unless a deliberate exception is recorded.

For calculate-family tools, keep the section title **Example Prompts** when examples are preset-aligned estimate briefs with copy buttons. Use **Example Inputs** only when the calculator has no prompt, brief, or preset-copy workflow. Support markdown tables for overview, driver, and boundary sections should use explicit table structure, wrapping, and fixed layout so columns stay aligned in the content card.

Architecture-family content should align with `templates/content/family/architecture/FAMILY.md` and the matching manifests. Do not duplicate detailed architecture baseline rules in this file.

---

## Section Namespace and Process Copy Rule

Content sections must use the same namespace discipline as the workspace.

Use the tool markdown prefix for support cards, prompt examples, copy buttons, and any section targeted by JavaScript. Examples include `aws-vpc`, `azure-vnet`, `gcp-vpc`, or the equivalent prefix for a new tool.

Reusable content sections should map to stable process names such as:

- `overview`
- `how-to-use`
- `technical`
- `interpretation`
- `examples`
- `export`
- `limitations`
- `faq`
- `acronyms`
- `references`

This keeps content reusable across a family without leaking classes, copy hooks, or provider wording between tools.

If a content section is tied to workspace state, generated output, copy buttons, export notes, or JSON restore behavior, its class names and copy hooks must remain stable and tool-namespaced. Do not leave inherited prefixes such as `aws-vpc` in Azure, GCP, or unrelated domain content.

---

## Source-Backed Citations And References

Use citations when the content makes factual claims that depend on external material, when the user asks for citations, or when a tool page needs a visible source trail for important technical claims.

The source of truth for the reusable citation block is:

```text
templates/content/main/sections/content/10_references/
```

The final tool still owns its local `content.md` and must adapt the citation rows to sources that actually support the final text.

Citation rules:

- Use valid, verifiable sources only. Do not invent sources, authors, dates, publishers, URLs, or claims.
- Do not use a source merely because the source exists. The source must directly support the sentence or paragraph where the citation appears.
- Use an official, primary, or source-of-truth source for the exact claim. Do not cite a broad vendor page, unrelated product page, secondary summary, or stale migrated page when the claim needs a specific source.
- Reference URLs must be checked when created or revised. Do not ship hard `404`, retired, parked, login-only, paywalled, or unrelated-redirect targets as normal public references.
- Automated `403`, bot-gated, regional, or TLS-sensitive responses are acceptable only when the page is reachable by the intended user and the validation notes record that distinction.
- The reference title, author, publisher, date, retrieved date, and URL must describe the current linked page, not a previous page that the URL replaced.
- Use narrative citations in the content when possible, such as `Amazon Web Services (n.d.-a) says...`, `Piper and Clinton (2022) frame...`, or `Najafzadeh (2024) reports...`.
- Parenthetical citations are allowed when the sentence reads better that way, but the preferred style is narrative citation embedded in the sentence.
- Make every in-text citation clickable. The citation link must jump to the matching row in the References table below the content.
- Make the citation text visibly red or danger-token colored through scoped tool CSS, not unmanaged one-off inline styles.
- Keep the reference list in normal body text. Only the in-text citation marker needs the red treatment.
- Use stable tool-scoped IDs such as `aws-vpc-cite-vpc-docs` and `aws-vpc-ref-vpc-docs`.
- Include only sources actually cited in the content. Do not pad the table with unused references.
- When the same author has multiple undated sources, use suffixes such as `n.d.-a` and `n.d.-b`. When the same author has multiple same-year sources, use `2024a` and `2024b`.
- For undated web pages, include a retrieved date in the reference entry.
- Do not include internal citation placeholder tokens in final content.

Legit source standard:

- Substantial `Technical Details` sections must be 1500+ words.
- `Technical Details` must cite at least two official or source-of-truth websites or docs when it makes technical claims.
- `Technical Details` should use structured review aids such as bullets or tables when they clarify behavior, assumptions, output boundaries, or review points.
- A full `content.md` that makes factual technical claims should include at least three real references.
- Official or source-of-truth sources include provider documentation, product documentation, standards bodies, protocol specifications, benchmark owners, project maintainers, or primary vendor docs for the feature being described.
- A source-of-truth citation must be source-of-truth for the cited statement itself, not merely for the product, provider, or category name.
- Every cited source must be clickable through the in-text citation and must match a row in the References table.
- Do not claim accuracy, security, production readiness, compliance, current pricing, certification, reliability validation, or similar trust outcomes unless the tool actually validates that outcome.
- Tool behavior claims must match implemented code, visible controls, generated output, exports, restore behavior, and recorded validation.

Source mix rule:

- When the user asks for citations or references, use at least three citations when the page has enough supportable factual claims.
- Vary source types when valid sources exist. Acceptable source types include book, website, newspaper or magazine, article or blog post, scholarly journal, audiovisual, audio, and YouTube.
- “Random source type” means choose a varied source mix from valid sources. It never means use a random unsupported source.
- Prefer official documentation, standards, primary papers, vendor documentation, published books, or reputable articles when those sources directly support the claim.
- If a requested source type is unavailable or does not support the claim, do not use it. Use a stronger valid source and record the reason in validation notes.
- Source variety never overrides source quality. A varied source mix is invalid if the source does not directly support the cited claim or is not authoritative enough for the claim.

Clickable citation shape:

```html
<a id="__PREFIX__-cite-source-1" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-source-1">
  <span class="__PREFIX__-citation-inline">Source Author (Year)</span>
</a>
```

Matching reference row shape:

```html
<tr id="__PREFIX__-ref-source-1">
  <td>Website</td>
  <td><a class="__PREFIX__-citation-backlink" href="#__PREFIX__-cite-source-1"><span class="__PREFIX__-citation-inline">(Source Author, Year)</span></a></td>
  <td>Source Author. (Year). <em>Source title</em>. Publisher or site. <a href="https://example.com/source">https://example.com/source</a></td>
</tr>
```

Citation validation must check:

- every citation link has a matching reference row
- every reference row corresponds to an in-text citation
- cited sources directly support the cited claim
- cited sources are authoritative or source-of-truth for the exact sentence or paragraph they support
- no fabricated source metadata exists
- reference metadata matches the current linked page
- links are public or otherwise available to the intended user
- links do not return hard `404`, retired, parked, or unrelated-redirect targets
- automated access-gate responses such as `403` are either verified as browser/user reachable or recorded as a validation gap
- `Technical Details` has at least two official or source-of-truth citations when it makes technical claims
- factual `content.md` has at least three real references when enough supportable technical claims exist
- behavior claims match actual code, visible UI, generated output, export behavior, restore behavior, and validation notes
- citations do not imply compliance, certification, security validation, reliability validation, cost accuracy, or production readiness unless that has truly been validated

---

## Content Philosophy

InfraStack content should be:

- short enough to scan
- technical enough to be useful
- honest about limitations
- aligned with actual tool behavior
- specific to the domain or provider
- secondary to the workspace
- free of unsupported claims

Content must not be:

- generic marketing copy
- copied vendor documentation
- long-form filler
- a substitute for missing UI
- vague AI-generated explanation
- misleading about validation depth
- provider-neutral when the tool is provider-specific

---

## File Responsibilities

A complete tool commonly contains these content-related files:

```text
templates/content/tools/<category>/<tool-slug>/
├── card.yml
├── content.md
└── meta.yml
```

The tool also contains UI and runtime files, but this contract focuses on the content responsibilities of these three files.

Required first-line markers:

- `content.md` starts with `[//]: # (content.md)`
- `card.yml` starts with `# card.yml`
- `meta.yml` starts with `# meta.yml`

---

# 1. `meta.yml` Contract

## Purpose

`meta.yml` defines page-level metadata for the tool detail page.

It should tell the platform and the user:

- what the tool is called
- who authored it
- what category it belongs to
- what the tool does
- what the intro says
- what tags classify it

## Standard Fields

Use this structure unless the platform explicitly requires additional fields:

```yaml
title: AWS VPC Architecture
author: Badrul Amin
author_role: Infrastructure & DevOps Specialist
author_image: "images/author/author-bg-black.png"
date: "Apr. 18th, 2026"
comments: Interactive tool
publication_status: draft
category_label: AWS
reading_time: 4 min read
summary: Generate an AWS VPC architecture diagram from a prompt, preset, and live inspector controls.
intro: >-
    Build an AWS VPC from a brief and turn it into a clear architecture workspace for subnet planning and review.
    Map public ingress, private app tiers, data subnets, NAT routing, endpoints, route flow, observability, and AWS service placement.
    Refine live controls, inspect generated inventory and layout decisions, then export the diagram state for handoff or comparison.
tags:
    - AWS
    - VPC
    - Architecture
```

## Metadata Rules

`meta.yml` must be:

- concise
- tool-specific
- category-specific
- provider-native when applicable
- aligned with the actual workspace
- aligned with the folder slug and visible page title

Do not put these in metadata:

- implementation details
- hidden defaults
- parser internals
- long article copy
- unsupported security claims
- compliance claims
- cost-optimization claims
- copied vendor text

## Publication Status Rules

Use `publication_status` to control draft visibility and production publishing.

Allowed values:

```yaml
publication_status: draft
publication_status: ready
```

`draft` means the content is still being prepared and must not publish to production. Render a leading `*` from this metadata value only on development, review, or internal listing surfaces where the draft state needs to be obvious.

`ready` means the content can publish to production and should render without a star.

Every new tool package, scaffold, and generated package must start as:

```yaml
publication_status: draft
```

Change the field to `ready` only as a deliberate production-release step after the affected surface has been reviewed and validated.

Do not encode draft state by changing the stored title.

Avoid:

```yaml
title: "* Physical Server Architecture"
card_image_title: "* Physical Server Architecture"
```

Use:

```yaml
title: Physical Server Architecture
publication_status: draft
```

Production publish, deployment, rsync, sitemap, feed, and public catalogue-generation paths must include only explicit `publication_status: ready` packages. A production release validation should fail if `draft`, missing, or invalid status packages are included in the publish set.

Do not treat missing `publication_status` as ready for production. Missing or invalid status must be excluded by deployer and rsync logic.

## Title Naming Rule

New tools use a verb-led canonical identity:

```text
<verb>_<content>_<group>
```

Examples:

```text
architecture_vpc_aws
calculate_cost_aws
generate_command_shell
scan_web_security
```

Use the kebab-case form for new folder slugs, such as `calculate-cost-aws`.

Use `architecture` for architecture family catalogue names.

Use the family prefix in the catalogue name when it clarifies the tool behavior.

Examples:

```text
Architecture AWS VPC
Scanning Web Security Scanner
Assessment CIS Ubuntu Hardening
Shell Ubuntu User Setup Script Builder
Calculator Subnet Calculator
Generator Kubernetes YAML Generator
Analyzer NGINX Config Analyzer
Checklist Server Baseline Checklist
Table Firewall Rule Matrix
Dashboard Service Health Dashboard
```

Use the clean product name in `meta.yml` unless the visible platform requires the family prefix.

Example:

```text
Catalogue name: Architecture AWS VPC
Folder slug: architecture-vpc-aws
meta.yml title: AWS VPC Architecture
card image title: AWS VPC Architecture
```

This keeps the platform catalogue descriptive while keeping the visible product title clean.

## Title Rules

Titles should name the actual workspace.

Good examples:

```yaml
title: AWS VPC Architecture
title: Azure VNet Architecture
title: GCP VPC Topology
title: Firewall Path
title: Kubernetes Topology
title: Port Matrix Planner
```

Avoid:

```yaml
title: Best Cloud Tool
title: Architecture Generator
title: AI Cloud Designer
title: New Tool
title: Untitled Architecture Tool
```

## Category Label Rules

`category_label` should match the category or provider:

```yaml
category_label: AWS
category_label: Azure
category_label: GCP
category_label: Network
category_label: Kubernetes
category_label: Security
category_label: NGINX
category_label: Ubuntu
```

Do not use a wrong inherited provider label.

## Summary Rules

The summary should be one direct sentence.

It should mention:

- the concrete output
- the main input method
- live refinement when present

Good:

```yaml
summary: Generate an Azure VNet architecture diagram from a prompt, preset, and live inspector controls.
```

Bad:

```yaml
summary: This amazing tool helps everyone make better things faster.
```

## Intro Copy Rules

The intro is the first content users read before the workspace.

It should read like a short product introduction, not a feature dump.

Use folded YAML:

```yaml
intro: >-
    __INTRO_LINE_1__
    __INTRO_LINE_2__
    __INTRO_LINE_3__
```

The three source lines are for editing balance only. They must render as one paragraph on the detail page.

For the current detail-page layout, target about 330 to 380 parsed characters when the intro should visually occupy at least three desktop lines. Wider or narrower viewports can change the visual line count, so validate rendered wrapping instead of treating YAML line count as proof.

Good intro shape:

1. Explain what the user can build from the brief.
2. Explain the domain-specific architecture elements that can be mapped.
3. Explain live refinement and export output.

For cloud architecture tools:

- write provider-native text
- describe the actual workspace outcome
- mention meaningful provider concepts
- mention export formats only when export is available
- keep source lines balanced so the folded paragraph is easy to review
- browser-check the rendered intro when the visual line rhythm matters

Keep the intro long enough to balance the workspace card below it without changing the inherited detail-page font size.

## Intro Examples

AWS:

```yaml
intro: >-
    Build an AWS VPC from a brief and turn it into a clear architecture workspace for subnet planning and review.
    Map public ingress, private app tiers, data subnets, NAT routing, endpoints, route flow, observability, and AWS service placement.
    Refine live controls, inspect generated inventory and layout decisions, then export the diagram state for handoff or comparison.
```

Azure:

```yaml
intro: >-
    Build an Azure VNet from a brief and turn it into an architecture workspace for subnet and connectivity planning.
    Map address spaces, subnet tiers, gateways, private endpoints, monitoring, managed services, and Azure network boundaries.
    Refine live controls, inspect generated inventory and layout decisions, then export the diagram state for handoff or review.
```

GCP:

```yaml
intro: >-
    Build a GCP VPC topology from a brief and turn it into a cloud workspace for regional network planning.
    Map regions, subnets, Cloud NAT, private access, load balancing, telemetry, Google Cloud services, and edge paths.
    Refine live controls, inspect generated inventory and topology decisions, then export the diagram state for review.
```

## Intro Avoid List

Avoid:

- repeated template sentences across providers
- thin marketing language
- provider-neutral wording for provider-specific tools
- relying on YAML line breaks to force rendered visual lines
- intros so short the detail page collapses to an underfilled two-line rhythm
- unsupported claims like “production-ready verified”
- claims that generated diagrams are final implementation documents

## Tags Rules

Tags should be:

- specific
- searchable
- limited to exactly three entries for complete tool packages
- aligned with tool family
- ordered as provider/category, primary subject or command, then family or intent

Good:

```yaml
tags:
    - AWS
    - VPC
    - Architecture
```

Avoid:

```yaml
tags:
    - Best
    - AI
    - Cool
    - Random
```

---

# 2. `card.yml` Contract

## Purpose

`card.yml` controls category and listing page presentation.

It should describe the actual value of the tool in a compact card.

## Standard Fields

Use this structure:

```yaml
card_summary: Generate AWS VPC diagrams from plain-English prompts, then refine subnets, routing, services, and exports with live controls.
card_gradient_start: "__LINEAGE_PRIMARY__"
card_gradient_end: "__LINEAGE_SECONDARY__"
card_text_color: "#FFFFFF"
card_kicker: "AWS"
card_image_title: "AWS VPC Architecture"
card_icon_class: "bi bi-diagram-3"
card_icon_animation: "random"
card_image: null
```

## Field Rules

### `card_summary`

`card_summary` is the visible introduction text on tool listing cards.

Must:

- explain the concrete result
- mention prompt generation when supported
- mention live controls when present
- mention export or restore when meaningful
- use one clear sentence
- fit the intended three-line card rhythm in the normal `/tools` grid
- avoid visible ellipsis clipping at the normal desktop card width
- read naturally when rendered as justified `.tool-card-summary` text

Use a concise, tool-specific sentence. The current card rhythm usually lands around 110 to 140 characters, but the rendered card is the final check. Shorten or rewrite the text if it clips; do not rely on the CSS line clamp to hide weak copy.

Good:

```yaml
card_summary: Generate GCP VPC topology diagrams from plain-English prompts, then refine networks, Cloud NAT, services, and exports with live controls.
```

Bad:

```yaml
card_summary: A powerful solution for improving cloud architecture.
card_summary: Generate diagrams with exports, restore, and live controls.
```

The first bad example is vague. The second is too generic and only acceptable if those features actually exist and the provider/domain terms are still added.

### `card_gradient_start` and `card_gradient_end`

Use the approved category/provider color registry in `templates/content/MAIN.md`.

`card.yml` currently stores resolved hex values. Those values must trace back to approved semantic tokens; they must not be arbitrary one-off colors. When the renderer supports token references directly, prefer category/provider tokens over repeated literal values.

Cards may use stronger color than the rest of the page, but the tool detail surface must still follow the visual weight model in `templates/content/MAIN.md`.

### `card_kicker`

Use a short category or provider label:

```yaml
card_kicker: "AWS"
card_kicker: "Azure"
card_kicker: "GCP"
card_kicker: "Network"
card_kicker: "Kubernetes"
card_kicker: "Security"
```

### `card_image_title`

Use the tool display name.

Examples:

```yaml
card_image_title: "AWS VPC Architecture"
card_image_title: "Azure VNet Architecture"
card_image_title: "GCP VPC Topology"
```

Do not prefix `card_image_title` with `*` for draft content. The draft star is a rendered marker driven by `meta.yml` `publication_status`, not stored card copy.

### `card_icon_class`

Use Bootstrap Icons unless the platform changes icon strategy.

Common default:

```yaml
card_icon_class: "bi bi-diagram-3"
```

Other examples:

```yaml
card_icon_class: "bi bi-shield-check"
card_icon_class: "bi bi-hdd-network"
card_icon_class: "bi bi-table"
card_icon_class: "bi bi-bezier2"
```

### `card_image`

Use `null` when using generated or template-based card imagery.

```yaml
card_image: null
```

When `card_image` is `null`, the visual should come from tool-local `assets/img/post.html.twig` or, during scaffold fallback, `templates/content/main/scaffold/assets/img/post.html.twig`. The card file should not point to a missing asset, and the tool package should not create a root-level `post.html.twig`.

## Card Copy Avoid List

Avoid:

- vague productivity claims
- repeated summaries across many tools
- summaries too short to fill the card rhythm
- summaries so long they clip with visible ellipses in the normal card grid
- summaries that depend on hidden implementation details
- saying export exists if export is not implemented
- saying prompt-driven if there is no prompt input
- saying restore exists if JSON import is not implemented

---

# 3. `content.md` Contract

## Purpose

`content.md` is support content.

It should help users understand and use the tool without becoming the primary product surface.

## Default Compact Structure

Use this structure for most new tools:

```markdown
<div class="content-card <prefix>-markdown-card <prefix>-markdown-card-overview">

## Overview

...

</div>

<div class="content-card <prefix>-markdown-card <prefix>-markdown-card-how-to-use">

## How to Use

...

</div>

<div class="content-card <prefix>-markdown-card <prefix>-markdown-card-interpretation">

## Interpretation Notes

...

</div>

<div class="content-card <prefix>-markdown-card <prefix>-markdown-card-export">

## Export and Restore Notes

...

</div>

<div class="content-card <prefix>-markdown-card <prefix>-markdown-card-limitations">

## Limitations and Assumptions

...

</div>
```

Use FAQ only when it genuinely helps.

## Rich Architecture Structure

For prompt-driven cloud or infrastructure architecture tools, the richer architecture reference structure is acceptable:

```markdown
<div class="content-card <prefix>-markdown-card <prefix>-markdown-card-overview">

## Overview

...

</div>

<div class="content-card <prefix>-markdown-card <prefix>-markdown-card-technical">

## Technical Details

### 1. Prompt interpretation and defaults

...

### 2. Regional boundary and placement layers

...

### 3. Ingress path and edge services

...

### 4. Private application and data tiers

...

### 5. Egress and private service access

...

### 6. Observability and hybrid connectivity

...

### 7. What can be edited after generation

...

### 8. Limits and review points

...

</div>

<div class="content-card <prefix>-markdown-card <prefix>-markdown-card-examples">

## Example Prompts

...

</div>
```

The full audited support pattern must include:

- Overview
- Technical Details
- Prompt Tips or Command Tips
- How To Use
- Export Notes
- FAQ
- References

The normal example block is a choice: use Example Prompts for prompt, preset, or brief workflows, or Example Commands for literal command workflows. Acronyms and Glossary are optional; choose Acronyms for abbreviations, or Glossary for broader terminology.

For command-oriented non-architecture tools, replace the prompt example block with `09_example-commands` and label the section **Example Commands** with paired `Copy command` controls.

These sections must remain supportive. They explain the workspace, parser boundaries, export behavior, and review expectations; they must not become the main product surface.

## Support Markdown Typography

Support markdown typography is part of the content standard because the reusable `content.md` sections and tool-local `custom.css` files must render the same copy with the same visual rhythm.

InfraStack uses a two-font system: `Nunito` for headings, page titles, card titles, and section headings; `Roboto` for body copy, navigation, labels, controls, tables, and support text. Use `--heading-font` for heading text and `--default-font` for body/UI text. Do not introduce Rubik, Poppins, Inter, or other proportional font families into runtime CSS, generated tool packages, shared section CSS, or Google Fonts links. Monospace stacks remain allowed for code, terminal, and preformatted output.

Template parity is part of the typography standard. When a main content section is adapted into a final package, validate the rendered contract in the final files: card frame, section title icon, heading divider line, Technical Details subsection separators, accordion row icons, section spacing, paragraph rhythm, list inheritance, inline code size, table layout, details/FAQ behavior, copy-button controls, citation links, terminal strip title treatment, and responsive selectors used by the section.

Every shared support section heading should use the current section-title rhythm: a left icon followed by the title text and a divider line below. `Technical Details` keeps the main `h2` title unnumbered, but every `h3` subsection label inside it must visibly start with `1.`, `2.`, `3.`, and so on. Those numbered `h3` headings should carry the section-specific heading class and show separator lines between later numbered headings. `Prompt Tips`, `How To Use`, and `FAQ` accordion rows should include left icon chips that support scanning without changing the text hierarchy. `How To Use` and `FAQ` must start with a short explanatory paragraph before the first row.

Markdown list items must not use justified alignment. Keep support bullets and numbered items left-aligned with normal word spacing. Paragraphs can use justified alignment where the detail-page rhythm needs it, but list items with inline code chips, service names, CIDR ranges, commands, or flags must stay left-aligned so wrapped lines do not stretch spaces between words.

Markdown-card list items must inherit their parent list font size, line height, and color. Do not let a global `.markdown-content li` rule override a card-local list size. When a card sets `ul` or `ol` to `15px`, every nested `li` and `li p` must compute to that same size.

Inline code chips in prose and list items must use the platform support-copy size standard:

- `font-size: 0.875em`
- `line-height: inherit`
- inline display, not block or inline-block unless a terminal/control pattern explicitly needs otherwise
- padding small enough that the chip does not look larger than surrounding text
- provider/domain color allowed only through scoped tokens from `templates/content/MAIN.md`

Do not use `1em`, `0.95em`, `0.92em`, or `0.9em` for support markdown inline code chips. Those values have previously made CIDRs such as `10.80.0.0/16`, command flags, and service-name chips look larger than surrounding bullet text.

Apply this baseline everywhere support markdown can be sourced or copied:

- `assets/styles/content/content.css`
- `templates/content/main/sections/content/*/section.css`
- `templates/content/family/<family>/**/section.css`
- `templates/content/family/<family>/baseline/source/custom.css`
- final `templates/content/tools/<category>/<tool-slug>/custom.css`
- compiled Asset Mapper output when runtime public assets are part of the changed surface

When this typography surface changes, validation must include a stale-token scan for old inline-code sizes, CSS brace balance, affected tool validation, and Browser Use verification on the approved development URL `https://infrastack.my` when rendered support content changes.

When applying or retrofitting a section template, validation must also include a final-package selector scan for the section's required `custom.css` behavior, unresolved placeholder scan, namespace marker check, section helper hook check when JavaScript is involved, and Browser Use rendering against the approved development URL when available. If Browser Use is unavailable, record the gap; do not replace it with standalone browser automation unless explicitly approved for that task. Do not use production hosts, tunnels, local port forwards, ad hoc local PHP servers, local proxies, or VM IP browser URLs for rendered content validation.

When a batch content cleanup changes support sections across tools, closeout must report:

- applied tool content files as `X / total`
- content files not updated and why
- shared main content sources updated or `not needed`
- family content/workspace sources updated or `not needed`
- validation that proves the formatting rule was applied, such as inline-code, citation, table, or marker scans

## Overview Section Rules

The Overview should answer:

- what the tool creates
- what input it expects
- what output it renders
- what the user should do first
- when the tool is useful
- when it should not be treated as final authority

Example tone:

```markdown
AWS VPC Architecture is an InfraStack prompt-driven workspace for turning a short AWS brief into a first-pass network diagram.
```

Rules:

- mention “first-pass” when parser output requires review
- avoid “final production design”
- avoid “AI-generated” unless the tool truly uses AI
- make it clear the workspace is editable

## How to Use Section Rules

The How to Use section should be practical.

It may include:

1. choose a preset
2. write or paste a prompt
3. generate the model
4. review prompt notes
5. refine controls
6. adjust stage layout
7. export PNG/SVG/JSON
8. restore from JSON later

Do not repeat every UI label.
Do not write a manual for obvious controls.

## Interpretation Notes Rules

Use this section to explain:

- deterministic parsing
- recognized keywords
- defaults
- assumptions
- provider/domain vocabulary
- what happens when input is incomplete

For prompt-driven tools, say:

```markdown
The parser is deterministic. If you enter the same prompt, preset, and control values, the workspace produces the same result.
```

Do not say:

```markdown
The AI understands your architecture deeply.
```

## Export and Restore Notes Rules

Explain what each export preserves.

Common wording:

- PNG preserves the current visual diagram as an image.
- SVG preserves the current vector diagram.
- JSON preserves the normalized workspace state, prompt notes, controls, and layout overrides.
- JSON is the format to use when reopening or continuing work.

Do not claim PNG or SVG preserve editable state.

## Limitations and Assumptions Rules

Every substantial tool needs honest limitations.

For architecture tools, limitations may include:

- not a replacement for engineering review
- does not validate exact subnet math
- does not prove provider service availability
- does not calculate full cost
- does not create Terraform/IaC unless explicitly implemented
- does not certify security or compliance
- does not validate all routing/firewall rules
- generated score is advisory only

Example:

```markdown
Treat the generated output as a serious architecture draft, not a final implementation design.
```

## Example Prompt Rules

Example prompts should:

- be realistic
- match the parser capabilities
- use domain-native vocabulary
- produce meaningful diagrams
- avoid unsupported services
- be short enough to copy

For cloud architecture tools, provide 3 to 5 examples.

Example:

```html
<pre class="<prefix>-prompt-pre"><code>Create a production AWS VPC in us-east-1 across 2 availability zones. Use public subnets for an internet-facing Application Load Balancer, private app subnets for EC2 Auto Scaling, private data subnets for Multi-AZ RDS PostgreSQL, a single NAT gateway, VPC endpoints for S3 and Systems Manager, CloudWatch, and VPC flow logs.</code></pre>
```

If the tool has copy buttons for prompt examples, match the class names used by `custom.js`.

Example prompt blocks, prompt copy buttons, and markdown copy helpers must use the provider/domain prefix expected by the JavaScript. Do not leave `aws-vpc` classes in Azure, GCP, or non-AWS content.

## Tables in `content.md`

Use tables when they clarify behavior.

Good table columns:

- component area
- technical behavior
- design implication

Keep table rows concise.

Do not use large tables as filler.

Substantial `Technical Details` sections should not be prose-only when a table or short bullet list would make review easier. Use paragraphs for explanation, then use compact bullets or tables for decisions, assumptions, output fields, limits, or review checks. `Technical Details` `h3` subsection labels must be visibly numbered in sequence, carry the section-specific heading class, and render separator lines between later numbered blocks.

---

## Provider Voice Rules

Provider tools must use native terms.

### AWS

Use:

- VPC
- Availability Zones
- NAT Gateway
- VPC endpoints
- Route 53
- CloudFront
- AWS WAF
- ALB
- EC2
- ECS Fargate
- EKS
- Lambda in VPC
- RDS
- Aurora
- DynamoDB
- CloudWatch
- VPC Flow Logs
- Site-to-Site VPN
- Transit Gateway

Avoid leaking Azure/GCP terms into AWS pages.

### Azure

Use:

- VNet
- address space
- subnets
- availability zones
- NAT Gateway
- Private Endpoints
- Azure DNS
- Azure Front Door
- Azure WAF
- Application Gateway
- Virtual Machine Scale Sets
- Azure Container Apps
- AKS
- Azure Functions in VNet
- Azure SQL
- Azure Database for PostgreSQL
- Azure Cosmos DB
- Azure Monitor
- NSG Flow Logs
- VPN Gateway
- Virtual WAN

Avoid leaking AWS terms into Azure pages, especially:

- security groups
- NACLs
- IAM
- KMS
- RDS
- Aurora
- Route 53
- CloudWatch in visible copy
- EC2
- ECS
- EKS
- DynamoDB
- Transit Gateway

### GCP

Use:

- VPC
- regions
- zones
- Cloud NAT
- Private Service Connect
- Private Google Access when relevant
- Cloud DNS
- Cloud CDN
- Cloud Armor
- External HTTP(S) Load Balancer
- Managed Instance Groups
- Cloud Run
- GKE
- Cloud Functions
- Cloud SQL
- Firestore
- Memorystore
- Cloud Monitoring
- VPC Flow Logs
- Cloud VPN
- Network Connectivity Center

Avoid leaking AWS/Azure terms into GCP pages.

GCP pages must not expose Azure acronyms such as `App GW`, `VMSS`, `ACA`, or `KV` unless the copy is explicitly comparing providers. Prefer GCP-native names such as External HTTP(S) Load Balancer, Managed Instance Groups, Cloud Run, Secret Manager, and Cloud KMS.

Provider-visible copy includes metadata, card copy, intro text, markdown, example prompts, FAQ, acronyms, stage labels, score facts, output labels, button labels, import errors, and generated inventory descriptions. Compatibility keys may remain internal only when required for restore/schema stability.

---

## Non-Cloud Domain Voice

For non-cloud tools, use domain-native terms.

Examples:

### Network

Use:

- subnet
- VLAN
- firewall rule
- source
- destination
- port
- protocol
- NAT
- route
- gateway
- DNS
- VPN
- DMZ
- zone

### Kubernetes

Use:

- cluster
- namespace
- node
- pod
- deployment
- service
- ingress
- config map
- secret
- persistent volume
- network policy
- RBAC
- HPA

### NGINX

Use:

- server block
- location
- upstream
- proxy pass
- SSL termination
- mTLS
- header forwarding
- rate limiting
- health check
- access log
- error log

### CIS / Security Benchmark

Use:

- control
- benchmark
- profile
- pass
- fail
- evidence
- remediation
- severity
- risk
- exception
- owner
- status

Do not use cloud provider words when the tool is not cloud-specific.

---

## Embedded Output Copy

When a tool provides embeddable output, the embed area should include:

- copy action
- run or preview action when supported
- concise disclaimer

Disclaimer should be direct:

```text
Generated diagrams are planning aids. Review provider limits, security posture, routing, and cost impact before implementation.
```

Rules:

- keep disclaimer short
- do not bury copy/run actions
- do not claim production certification
- do not over-explain inside the embed area

---

## Trust and Quality Rules

Every substantial tool page should make trust boundaries clear.

Useful trust signals:

- author name
- date or last updated value
- concise limitations
- assumptions applied by parser
- export and restore behavior
- realistic examples
- no hidden claims

Quality gate before publishing:

- page purpose is clear
- metadata matches the tool
- intro is domain-specific
- card summary fits the justified listing-card rhythm
- examples are original and useful
- limitations are honest
- support markdown bullets are left-aligned with normal word spacing
- markdown-card list items inherit the parent list font size and line height
- inline code chips render at `0.875em` and do not look larger than surrounding text
- no copied vendor text
- no placeholder sections
- no unsupported claims
- no wrong provider terminology
- content does not dominate the workspace

---

## Content Anti-Patterns

Do not:

- mass-produce near-identical provider pages
- leave AI-style generic copy in metadata or cards
- describe controls that do not exist
- claim exports are production documentation
- describe deterministic parsing as AI reasoning
- hide important assumptions in long prose
- use copied vendor documentation as page body text
- make markdown the main product
- use vague phrases like “seamlessly optimize”
- overstate security, reliability, compliance, or cost value
- include unsupported service names in examples
- mismatch card title and actual tool title
- mismatch category label and folder category

### Batch Tool Creation

When creating multiple tools from one request, use a `batch` DevOps task and `codex/bin/batch-package.sh`.

Batch status must be readable as family cards:

```text
Architecture Family
- [running] architecture-01 Huawei Cloud VPC Architecture
- [complete] architecture-02 Cisco Campus Network Architecture
```

Do not make users interpret process ids as the main progress signal. Store process ids as metadata only.

Every tool created by a batch must still start as `publication_status: draft`.

---

## Content Delivery Checklist

Before delivering content files, verify:

### `meta.yml`

- title matches tool
- publication status is explicit for new or revised packages
- new tool packages start as `publication_status: draft`
- draft status is stored as `publication_status: draft`, not as a leading `*` in title fields
- author fields are present
- category label is correct
- date/updated value is present
- summary is specific
- intro is concise
- tags are relevant and limited to exactly three entries
- no hidden implementation logic
- no unsupported claims

### `card.yml`

- summary describes actual output
- kicker matches category/provider
- gradient fits domain
- card title matches tool
- icon class is appropriate
- card image value is intentional
- `card_summary` is the visible card intro
- summary fits the three-line card rhythm
- summary reads naturally when justified
- summary does not clip with visible ellipses in the normal `/tools` card grid

### `content.md`

- support content is secondary
- selected tool family is clear
- overview explains the workspace
- mandatory support sections are present: Overview, Technical Details, Tips, How To Use, Export Notes, FAQ, and References
- exactly one normal example section is used: Example Prompts or Example Commands
- Acronyms or Glossary is used only when helpful, and both are not included unless an exception is recorded
- Technical Details is useful and 1500+ words for substantial tools
- Technical Details uses structured review aids such as bullets or tables when they clarify behavior
- interpretation/default behavior is clear
- export/restore behavior is clear
- limitations are honest
- examples match real parser behavior
- provider/domain terms are correct
- markdown section classes and copy hooks use the correct tool prefix
- applied section CSS contract exists in final `custom.css`, including card frame and heading divider selectors when the template defines them
- no shared section is marked applied when only `content.md` was copied
- bullet lists are not justified
- markdown-card `li` and `li p` inherit parent list size and line height
- inline code chips use the support markdown typography baseline
- no copied vendor docs
- no placeholder sections

---

## Success Standard

Correct InfraStack content:

- helps the user use the workspace
- explains what the output means
- explains what the output does not mean
- supports trust without overclaiming
- matches the actual tool behavior
- uses native domain language
- stays concise enough that the tool remains primary
