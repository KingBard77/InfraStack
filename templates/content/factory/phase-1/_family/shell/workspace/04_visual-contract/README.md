# Shell Visual Contract Workspace Section

## Purpose

Defines the shell-family visual and model contract that sits between shared `_base` workspace structure and final command tools.

Use this section when a shell tool has visual output beyond plain generated text and operation tables, such as command token maps, warning posture, option groups, command route summaries, environment badges, or normalized command preview visuals.

This section does not replace generated command text, score cards, sort toolbar, operation tables, warnings, or JSON restore. It defines the normalized visual primitives those sections can render.

## Ownership

- `page.html.twig`: command-neutral visual contract markup source.
- `section.css`: reusable shell visual primitives for command preview, token chips, option cards, and warning rows.
- `section.js`: frontend helper and metadata registry for rendering visual contract state.
- `model-core.js`: pure model helpers for normalizing command tokens, options, warnings, and visual summaries.
- `manifest.yml`: section ownership, inputs, outputs, and validation expectations.
- `demo.html`: isolated contract preview with demo-only chrome.

## Boundary

`04_visual-contract` owns:

- normalized command visual state
- command preview visual grammar
- command token and option chips
- warning and blocking-status tones
- operation summary rows
- command-neutral result visualization grammar

`04_visual-contract` does not own:

- primary target input
- basic or custom settings
- generated command source of truth
- command execution
- sort toolbar
- table shell
- JSON restore shell
- final command semantics

Those remain `_base`, shell workspace, or final-tool responsibilities.

## Result Text Relationship

Generated command text remains owned by `04_result-text`. The visual contract can mirror command tokens or route state, but it must not become the source of truth for generated command output.

## Application Rule

Apply this section to shell tools that need reusable command visuals. Pure form-plus-command-output tools may omit it during final assembly and record that omission as accepted divergence.
