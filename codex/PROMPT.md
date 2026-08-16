# InfraStack Studio Build Contract

## Purpose

This document defines how to create, change, validate, and release the current InfraStack Studio application and its file-based packages.

InfraStack should grow into a reusable catalogue of cloud, infrastructure, network, security, virtualization, container, vendor, flowchart, ERD, and later architecture workspaces without copying the editor for every release.

## Product Model

One shared Studio engine owns:

- editable diagram canvas
- normalized project state
- component and relationship editing
- inventory generation
- deterministic advisory results
- graphs
- JSON export and restore
- share and embed workflows
- common layout and controls

A release package supplies domain content and rules. It must not copy the Studio application.

## Current Ownership

```text
templates/studio/                 editable Studio page
templates/layout/                 shared read-only share/embed layout
assets/js/studio/                 Studio behavior
assets/js/layout/                 layout/share behavior
assets/styles/studio/             Studio presentation
assets/styles/layout/             share/embed presentation
src/Controller/Studio/            Studio routes
src/Controller/Layout/            share/embed routes
src/Service/Studio/               Studio catalogues and packages
src/Service/Layout/               share/embed storage and context
```

## Package Structure

```text
assets/studio/packages/<family>/<provider-or-domain>/<package>/
├── package.json
├── templates.json
├── result.json
└── content.yml
```

Register every package in:

```text
assets/studio/packages/registry.json
```

### `package.json`

Required ownership:

- schema version
- stable package ID
- family
- provider or domain
- slug and visible name
- package version
- Studio engine identity
- capabilities
- entry paths

### `templates.json`

Owns one or more normalized editable projects. Templates must be normal Studio state, not screenshots or flattened images.

Each project preserves, when applicable:

- project identity and name
- active view
- canvas and viewports
- assets and boundaries
- relationships
- properties
- layout and style overrides
- connector overrides
- reference image metadata
- accepted risks
- style presets

### `result.json`

Owns deterministic advisory behavior:

- categories and weights
- rule IDs and conditions
- severity
- score deductions
- grade caps and grade labels
- recommendation text
- supporting reference IDs

Results explain modeled facts. They are guidance, not certification, approval, compliance evidence, or a replacement for specialist review.

### `content.yml`

Required content:

- one concise introduction
- at least five useful FAQ entries
- three to five official or source-of-truth references
- stable reference IDs used by advisory rules

Related topics may be added when the shared renderer supports them. Do not add unrendered fields and claim they are visible.

Reference URLs must match the claim they support and must not knowingly return `404`, point to parked domains, or redirect to unrelated pages.

## Libraries And Icons

```text
assets/data/studio/libraries/<group>/<provider-or-domain>/catalog.json
assets/icons/studio/libraries/<group>/<provider-or-domain>/
```

Register libraries in `assets/data/studio/libraries/registry.json`.

Supported group identities:

- `general`
- `infrastructure`
- `cloud`
- `virtualization`
- `containers`
- `vendors`

Logical, physical, network, overview, and availability belong in each asset's `views` metadata. Do not create duplicate icon trees for views.

## Creating A New Architecture

A request such as “Create new architecture GCP” means delivering a complete package, not only a picture.

The release must provide:

1. Package identity and registry entry.
2. Editable architecture templates.
3. Catalogue assets and reusable icons when missing.
4. Normalized inventory behavior through shared state.
5. Deterministic advisory rules and recommendations.
6. Graph-compatible normalized data.
7. JSON export and restore compatibility.
8. Introduction, FAQ, and verified references.
9. Share and embed compatibility through the shared layout services.

Use the current package schemas and shared Studio engine. Add provider-specific code only when data and configuration cannot express the required behavior.

## Inventory

Inventory is derived from normalized project state. It must not be maintained as a second independent data source.

The table should expose domain-appropriate identity, type, placement, addressing, resources, and controls while preserving stable normalized keys.

## Advisory

Advisory output is deterministic for the same normalized state and `result.json`. Every finding needs a stable ID, category, severity, explanation, recommendation, and relevant references.

Do not hide missing facts by awarding unearned confidence. Empty projects should show a clear empty state.

## Graphs

Graph rendering remains shared. Current graph styles include line, radar, polar-area, rounded bar, and time-combination presentations where supported.

Graph controls must provide meaningful titles, subtitles, legends, tooltips, empty states, accessible summaries, and export feedback. Animation must not delay interaction or obscure data.

## Export And Import

Normalized JSON is the canonical editable export and restore format.

Image or vector export formats are implemented only when a working control and verified renderer exist. Do not advertise JPEG or SVG export before it is implemented and tested.

Shared/exported images should carry an InfraStack watermark. A normal website cannot reliably prevent operating-system or external screenshots; do not claim screenshots can be forced blank.

## Share And Embed

Share and embed are layout concerns:

```text
templates/layout/share.html.twig
templates/layout/embed.html.twig
assets/js/layout/share.js
assets/styles/layout/share.css
assets/styles/layout/embed.css
src/Controller/Layout/ShareController.php
src/Service/Layout/ShareService.php
```

Shared projects are read-only snapshots of normalized state. Embeds must include enough context to avoid presenting guidance as certification or production approval.

## Routes And Navigation

The maintained navigation is:

- Home
- Studio
- Author Profile
- Contact Us
- Privacy

`/tools` is a legacy navigation route. Do not restore removed per-tool detail pages without a separate approved migration.

## Performance Contract

Initial registries stay compact so providers and packages can load lazily.

Current source budgets enforced by `codex/bin/check.sh performance`:

- Studio JavaScript: 2,000,000 bytes
- Studio CSS: 512,000 bytes
- package registry: 65,536 bytes
- library registry: 65,536 bytes

These are guardrails, not proof of browser performance. Browser-visible performance claims require rendered measurement.

## Implementation Workflow

1. Create or resume a task record.
2. Inspect current Studio state, schemas, tests, and the closest package.
3. Define stable IDs, affected paths, and behavior to preserve.
4. Implement the smallest complete change.
5. Run the relevant `check.sh` targets.
6. Use Browser Use for visible behavior changes.
7. Record actual evidence and gaps.
8. Archive the task when complete.

## Validation

Use:

```bash
codex/bin/check.sh repository
codex/bin/check.sh studio
codex/bin/check.sh performance
codex/bin/check.sh deployment
```

The Studio check validates non-empty registries, registered package files, JSON, shared icon roots, JavaScript syntax, and Node tests. The deployment check validates Twig, current routes, Asset Mapper, development cache, and production-mode cache warmup on the approved development VM.

Browser-visible work requires Browser Use against `https://infrastack.my`. Static checks do not prove visual quality, diagram usability, connector clarity, export behavior, or responsive correctness.

## Strict Do Not

Do not:

- recreate the removed legacy per-tool Twig package tree
- copy the Studio shell into every release
- duplicate shared icons in packages
- create top-level icon folders for logical, physical, or network views
- ship fake controls or advertise unimplemented exports
- treat advisory results as certification
- claim reliable screenshot prevention
- silently change normalized export schemas or stable IDs
- use production hosts for development validation
