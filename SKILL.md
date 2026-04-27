---
name: infrastack-project
description: Work with the InfraStack Symfony, Twig, Asset Mapper tool platform, especially creating, auditing, or revising interactive infrastructure tools under templates/content/tools, including AWS VPC and Azure VNet architecture visualizers, tool metadata, model-core tests, scoped CSS, scoped JavaScript, and project guidance docs.
---

# InfraStack Project Skill

Use this skill when working inside the InfraStack repository on interactive tools, tool packages, project guidance, visual workspaces, metadata, cards, support content, or provider-specific architecture visualizers.

## Start Here

Read these files before changing a tool:

- `AGENT.md`
- `codex/PROMPT.md`
- `codex/DESIGN.md` when the task touches layout, interaction, controls, stage behavior, or output presentation

Inspect the specific tool package before editing. Let the existing package shape guide the change.

## Repository Shape

Interactive tools live under:

- `templates/content/tools/<category>/<slug>/`

A complete tool package normally includes:

- `meta.yml`
- `card.yml`
- `content.md`
- `tool.html.twig`
- `custom.css`
- `custom.js`
- `assets/` when local icons, images, data, or model logic are needed

Backend code belongs under `src/Controller/Tools/` only when browser-owned behavior is not enough.

## Current Cloud References

Use these as the current architecture-generator references:

- `templates/content/tools/aws/aws-vpc-architecture/`
- `templates/content/tools/azure/azure-vnet-architecture/`

The AWS VPC tool is the strongest implementation reference. The Azure VNet tool follows the same pattern but has compatibility debt from AWS-derived internal values and IDs.

## Working Rules

Prefer browser-first implementation for interactive tools. Add backend behavior only for protected integrations, server-side generation, secure transformation, heavyweight processing, or filesystem operations.

Keep tool behavior local to its package unless a shared abstraction is already established or clearly reduces maintenance cost.

Preserve stable names, routes, IDs, classes, exported JSON keys, and tool slugs unless a versioned migration is part of the task.

Keep the normalized state model as the source of truth. Prompt parsing may seed state, but users must be able to edit the model after generation.

Treat JSON import and restore as first-class behavior. Do not make restore depend on prompt replay alone.

Keep content markdown concise and supportive. The tool is the product surface.

For Azure work, keep visible labels, content, headings, and output Azure-native. Do not expose AWS terminology to users unless the task explicitly discusses compatibility keys or migration.

When Asset Mapper output is already checked into `public/assets/`, update the mapped public file only when the runtime currently depends on it and the normal asset build path is unavailable.

## Audit Checklist

For tool audits, inspect:

- Metadata consistency in `meta.yml`
- Card consistency in `card.yml`
- Support content accuracy in `content.md`
- Required markup IDs and controls in `tool.html.twig`
- Scoped selectors and responsive behavior in `custom.css`
- State flow, DOM references, exports, imports, and event bindings in `custom.js`
- Parser, validation, schema, and restore behavior in `assets/bin/model-core.js`
- Tests under `tests/`
- Runtime asset references and mapped public assets

Search for:

- provider terminology leaks
- stale IDs after copying a tool
- duplicate IDs
- missing icon or asset references
- placeholder text
- fake controls
- schema drift between export and import
- tests that still assert copied provider names

## AWS and Azure Audit Baseline

Known AWS and Azure gaps:

- Azure keeps AWS-derived compatibility values such as `ec2`, `ecs`, `eks`, `rds`, `aurora`, `dynamodb`, `route53`, `cloudFront`, and `cloudWatch`.
- Azure keeps some AWS-derived layout and connector IDs in exported override examples.
- Azure support content has AWS terminology that should be converted to Azure-native concepts.
- AWS and Azure duplicate large JavaScript and CSS files.
- Region and availability-zone validation is coarse.
- CIDR validation does not yet perform subnet math, overlap detection, or usable-address analysis.
- Architecture scores are heuristic and must not be represented as certification.
- Browser behavior needs coverage for stage interactions, import, export, fullscreen, hide UI, and responsive layout.

Treat these gaps as compatibility-aware debt. Fix visible provider wording first. Rename internal keys only through a deliberate schema migration.

## Validation

Use targeted validation for the surface changed.

For model-core changes, run:

`node --test tests/aws-vpc-architecture.core.test.cjs tests/azure-vnet-architecture.core.test.cjs`

For JavaScript changes, verify syntax and required DOM references.

For CSS changes, verify brace balance and responsive behavior.

For Twig changes, verify required IDs, includes, and duplicate IDs.

For PHP changes, run targeted `php -l` when PHP is available.

For browser-facing changes, verify the local runtime in a browser when available and state clearly when browser verification cannot be performed.
