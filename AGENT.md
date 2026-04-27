# InfraStack Agent Guide

## Purpose

This document defines how InfraStack should be designed, extended, and maintained.

InfraStack is a tool-first platform for building interactive infrastructure, cloud, network, security, operations, and domain-specific visual tools. The platform is not primarily a content website. Documentation may support a tool, but the tool itself is the product.

This guide exists to ensure that every new contribution aligns with the same architecture, product direction, and implementation standards.

---

## Mission

Build InfraStack as a structured platform of interactive tools that help users design, visualize, model, explain, and export technical architectures and operational flows.

The mission is to produce tools that are:

- visual first
- practical
- reusable
- modular
- maintainable
- deterministic
- export-friendly
- easy to extend category by category

InfraStack should help users go from idea to structured visual output with minimal friction.

---

## Core Objective

For every new tool, prioritize the following outcome:

1. Give the user a working interactive experience, not just explanation text.
2. Produce a meaningful visual or functional result.
3. Keep the tool modular so it can evolve independently.
4. Preserve consistency across all categories and tools.
5. Ensure the tool can be maintained without rewriting the whole platform.

---

## Product Direction

InfraStack is moving toward a tool platform composed of category-based workspaces.

Typical tool types include:

- architecture visualizers
- topology builders
- flow designers
- infrastructure map generators
- cloud pattern generators
- security path visualizers
- operations planners
- exportable diagram workspaces
- domain-specific trackers and operational tools

Long-form documentation is secondary.  
Explanatory content may exist, but it must support the tool, not replace it.

---

## Platform Reality

InfraStack currently operates on:

- Symfony 8
- Twig
- attribute routes
- Asset Mapper
- plain JavaScript
- filesystem-driven tool structure

Existing detail-page rendering and metadata-based loading still exist and may continue to support legacy and hybrid tools. However, all new work should follow the newer tool-oriented structure unless explicitly told otherwise.

---

## Current AWS and Azure Tool Audit

The active cloud architecture tool pair is:

- `templates/content/tools/aws/aws-vpc-architecture/`
- `templates/content/tools/azure/azure-vnet-architecture/`

The AWS VPC tool is the current reference for prompt-driven architecture workspaces. The Azure VNet tool follows the same interaction model, file layout, state flow, export behavior, and test shape.

Known gaps from the AWS and Azure audit:

- Azure still carries AWS-derived internal enum values and some DOM/layout identifiers such as `ec2`, `ecs`, `eks`, `rds`, `aurora`, `dynamodb`, `amazon-vpc-shell`, and `igw-to-alb`.
- Azure support content still has AWS terminology in places, including security groups, NACLs, IAM, and KMS.
- Both tools duplicate large JavaScript and CSS surfaces, which increases divergence risk.
- Region and availability-zone validation is intentionally coarse and does not prove provider service availability.
- CIDR validation checks format and basic bounds, but does not yet perform subnet allocation, overlap analysis, or usable-address review.
- Architecture scores are heuristic guidance, not compliance, resilience, or security certification.
- Existing automated tests cover model-core behavior, import, and export, but not browser DOM behavior, drag and resize interactions, responsive layout, or PNG/SVG export flows.

Operating rules for this tool pair:

- Preserve existing JSON schema, IDs, classes, and exported keys unless a versioned migration is deliberately implemented.
- Keep Azure-facing labels, support text, and visible UI Azure-native even when compatibility keys remain AWS-derived internally.
- Do not copy the AWS tool blindly into another provider without adapting provider semantics.
- Treat shared extraction as a later refactor only when it reduces real maintenance cost without breaking tool-local ownership.
- Add targeted model-core tests for parser or schema changes, and run browser checks when stage behavior, export behavior, or responsive layout changes.

---

## Directory Philosophy

Each tool should behave like an isolated product unit.

### Tool content structure

Each tool lives under:

`content/tools/<category>/<tool>/`

A tool folder may contain:

- `meta.yml`
- `card.yml`
- `content.md`
- `tool.html.twig`
- `custom.css`
- `custom.js`
- `assets/`
- supporting partials or local resources when needed

### Backend controller structure

If backend logic is required, place it under:

`src/Controller/Tools/<Category>/<Tool>/CustomController.php`

Controllers must not live inside `templates/` or content folders.

This separation is required:

- content and frontend assets stay with the tool
- backend execution stays in Symfony source structure
- architecture remains predictable and scalable

---

## Tool Design Principle

Every tool should be designed as a real workspace, not as a decorative page.

A good InfraStack tool should usually provide one or more of the following:

- direct interaction
- editable inputs
- visual output
- deterministic rendering
- saveable or restorable state
- export capability
- reusable structure
- user guidance integrated into the workflow

The user should feel that they are using a product, not reading a blog post.

---

## Agent Operating Priorities

When planning or generating code for InfraStack, always prioritize in this order:

1. product usefulness
2. structural consistency
3. maintainability
4. simplicity
5. visual clarity
6. modularity
7. performance
8. documentation support

If there is tension between “nice explanation” and “working tool,” choose the working tool first.

---

## Architecture Rules

### 1. Respect the platform structure

Preserve the current category-based and tool-based structure unless explicitly instructed to change it.

### 2. Keep tools modular

Each tool should be independently understandable and maintainable.

### 3. Prefer browser-first behavior

Default to frontend execution using plain JavaScript, SVG, canvas, DOM layout, or lightweight client-side logic.

### 4. Add backend only when justified

Use PHP controllers only when the logic truly belongs on the server, such as:

- export generation that is better handled server-side
- protected integrations
- normalization or processing that should not be exposed in the browser
- filesystem or server-managed operations
- secure transformation workflows

### 5. Keep rendering deterministic

Outputs should be stable and reproducible from the same inputs.

### 6. Keep styling scoped

Use shared styles only for platform-level consistency.  
Use tool-local styling for tool-specific UI.

### 7. Keep routes predictable

Route patterns, controller names, and tool folder naming should remain stable and understandable.

### 8. Preserve compatibility

If metadata structures or card fields change, update all consumers that depend on them.

---

## Content Role

Content is support material.

Use `content.md` to provide:

- quick explanation
- instructions
- examples
- short reference help
- optional notes

Do not let content become the main product surface unless the task explicitly asks for a documentation-heavy page.

---

## Implementation Standard

When building or revising a tool, aim for:

- clean folder ownership
- clear separation of frontend and backend concerns
- low coupling
- reusable patterns
- understandable state flow
- minimal hidden behavior
- minimal unnecessary dependencies

Prefer implementation that another developer can inspect and extend quickly.

---

## UI and UX Expectations

Tool interfaces should aim to be:

- immediately understandable
- visually structured
- task-oriented
- not overcrowded
- export-aware
- responsive where practical
- consistent with InfraStack design language

Users should quickly understand:

- what the tool does
- what they can edit
- what the output represents
- what action to take next

---

## Validation Requirements

Whenever relevant, validate the affected parts of the system.

### For PHP changes
- run targeted `php -l` checks
- verify controller namespace and route validity
- confirm template variables are available

### For Twig changes
- verify rendering path
- verify included assets resolve correctly
- verify no missing-variable failures

### For tool behavior changes
- test the main user flow
- test key interactions
- test reset or restore behavior if present
- test export behavior if present
- test fallback behavior for missing optional files

### For metadata changes
- confirm listing pages still work
- confirm detail pages still work
- confirm category aggregation still works
- confirm old tools do not silently break

---

## Decision Bias

When multiple implementation choices are possible, prefer the option that is:

- simpler to maintain
- more consistent with the platform
- more modular
- easier to extend to future tools
- less dependent on hidden magic
- easier for future contributors to understand

---

## Do Not

### Product Direction
- Do not treat InfraStack as a blog-first or article-first product.
- Do not build a new tool as a long reading page with a weak interactive section.
- Do not let prose become the main deliverable when a real tool is expected.
- Do not use legacy article-heavy patterns as the default reference for new tools.

### Architecture
- Do not place PHP logic inside `templates/`.
- Do not place controllers inside tool content folders.
- Do not mix backend responsibilities into frontend files without reason.
- Do not create inconsistent folder naming across categories and tools.
- Do not invent an alternative structure for one tool unless explicitly required.
- Do not introduce a database requirement for a tool that can remain filesystem-driven.
- Do not introduce backend endpoints for work that the browser can do cleanly.
- Do not add unnecessary service layers for tiny tasks.
- Do not hardwire logic that should stay configurable through metadata or tool-local configuration.

### Frontend
- Do not overload a tool with excessive animation that distracts from function.
- Do not build UI that looks impressive but produces weak output.
- Do not hide core controls behind unclear interactions.
- Do not make the main workflow dependent on fragile DOM assumptions.
- Do not create tool state that is difficult to inspect or restore.
- Do not spread one tool’s JS or CSS behavior into unrelated tools.

### Backend
- Do not add controllers just to mirror static content.
- Do not put business logic in Twig.
- Do not couple one tool’s backend behavior tightly to another tool.
- Do not assume every tool needs server-side processing.
- Do not bypass Symfony conventions without a strong reason.

### Maintainability
- Do not perform unrelated refactors while implementing a focused task.
- Do not rename stable routes, folders, or structures casually.
- Do not break metadata consumers silently.
- Do not create hidden dependencies between tools.
- Do not duplicate logic when a shared and understandable pattern already exists.
- Do not make a future contributor reverse-engineer the structure to understand a tool.

### Quality
- Do not ship placeholder behavior disguised as a finished feature.
- Do not leave broken exports, broken routes, or missing assets unresolved.
- Do not assume optional files always exist.
- Do not skip validation after structural changes.
- Do not produce output that cannot be explained by the current inputs.
- Do not sacrifice clarity for cleverness.

---

## Success Standard

A successful InfraStack contribution should result in:

- a tool that works
- a structure that makes sense
- a code path that is maintainable
- a UI that supports the actual task
- a platform that becomes stronger, not messier, after each addition

If a contribution adds visual value, preserves architectural discipline, and makes future tool development easier, it is aligned with InfraStack.

---

## Final Principle

InfraStack should grow as a disciplined system of tools.

Every new addition should strengthen:

- clarity
- modularity
- usability
- consistency
- extensibility

Build each tool as if it will become a pattern for future tools.
