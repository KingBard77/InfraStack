# InfraStack Agent Map

## Purpose

InfraStack is a Studio-first web application for editable infrastructure and architecture diagrams. Keep this file short; detailed implementation and visual contracts live under `codex/`.

Communication rules:

- keep prose practical and concise
- never include `oai_citation`
- do not claim tests, browser checks, security, compliance, reliability, or deployment success unless verified

## Current Product

The maintained product is `/studio`. It uses one shared editor and file-based release packages.

```text
templates/studio/
assets/js/studio/
assets/styles/studio/
src/Controller/Studio/
src/Service/Studio/
```

Shared read-only layout surfaces live in:

```text
templates/layout/
assets/js/layout/
assets/styles/layout/
src/Controller/Layout/
src/Service/Layout/
```

Architecture releases live in:

```text
assets/studio/packages/<family>/<provider-or-domain>/<package>/
```

Shared catalogues and icons live in:

```text
assets/data/studio/libraries/<group>/<provider-or-domain>/
assets/icons/studio/libraries/<group>/<provider-or-domain>/
```

Library groups are `general`, `infrastructure`, `cloud`, `virtualization`, `containers`, and `vendors`. Overview, physical, network, logical, and availability are asset view metadata—not top-level icon folders.

## Required Reading

Read only what the task needs:

1. `AGENTS.md`
2. `codex/PROMPT.md` for Studio packages, state, content, exports, sharing, and validation
3. `codex/DESIGN.md` for layout, controls, diagrams, graphs, tables, responsive behavior, and visual changes
4. `codex/devops/AGENTS.md` for task records
5. the active InfraStack skill when available

The repository contracts win when an external skill is stale.

## Task Records

Create or resume a task record before implementation, audit, validation, or platform work:

```bash
codex/bin/_init.sh <task_name> --kind <kind>
```

Kinds are:

- `create`
- `change`
- `fix`
- `audit`
- `validate`
- `performance`
- `platform`

All kinds use the same template. Performance is always `kind: performance`; no profile is required.

## Studio Package Contract

Every released package contains:

```text
package.json
templates.json
result.json
content.yml
```

- `package.json` owns identity, version, engine, capabilities, and entry paths.
- `templates.json` owns normalized editable projects.
- `result.json` owns deterministic advisory rules, categories, deductions, and grades.
- `content.yml` owns introduction, FAQ, references, and supported related topics.

Register packages in `assets/studio/packages/registry.json`. Register reusable catalogues and icon roots in `assets/data/studio/libraries/registry.json`. The browser must lazily load only the selected provider or domain package.

## Stable Behavior

Preserve unless a deliberate migration is approved:

- routes and Asset Mapper keys
- normalized project state and exported JSON keys
- package IDs, library IDs, provider IDs, and stable content IDs
- DOM IDs and classes used by JavaScript or tests
- share and embed URLs
- import, restore, inventory, advisory, graph, and canvas behavior

Do not copy the Studio shell into release packages.

## Implementation Rules

- Use plain JavaScript, Twig, Symfony, and Asset Mapper patterns already present.
- Keep normalized state as the source of truth.
- Keep inventory derived from normalized project state.
- Keep advisory output deterministic for the same state and package rules.
- Keep graph presentation shared; packages provide data and configuration.
- Reuse shared library icons instead of duplicating them in packages.
- Use `Nunito` for headings and `Roboto` for body and interface text.
- Use Google-style docstrings for public Python APIs and full JSDoc for public JavaScript APIs.
- Preserve user changes in a dirty worktree.
- Use `apply_patch` for file edits.

## Validation

Use the single validation command:

```bash
codex/bin/check.sh repository
codex/bin/check.sh studio
codex/bin/check.sh performance
codex/bin/check.sh deployment
codex/bin/check.sh all
```

Browser-visible work also requires Browser Use against:

```text
https://infrastack.my
```

VM checks use:

```text
vm-host-infrastack
xxcd.iad.infrastack
xxcomposercache
```

Do not use production hosts, VM IP browser URLs, tunnels, local proxies, or ad hoc local PHP servers as acceptance evidence.

## Guidance Changes

When a request changes the platform standard, confirm the scope, record a platform task, implement the approved structure, validate it, then update guidance to describe the working result.

## Success Standard

InfraStack should add new architectures by releasing small file-based packages while preserving one maintainable Studio editor, inventory model, advisory engine, graph system, export/restore flow, share/embed flow, and consistent visual language.
