# Shell Workspace Section

## Purpose

Defines the shared outer workspace frame for InfraStack family baselines.

This is the room, not the furniture. It sets the namespace root, layout grid, panel rhythm, section heading style, helper text treatment, and responsive behavior that family sections can fill.

## When To Use

Use when a family workspace needs the standard InfraStack tool surface:

- left/right or stacked workspace layout
- repeated panel shells
- section title rows
- compact helper text
- consistent empty, loading, and error surface shape
- responsive collapse without horizontal overflow

## Required Placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__TOOL_NAME__`

## Expected Classes

- `.__TOOL_CLASS__`
- `.__PREFIX__-workspace`
- `.__PREFIX__-workspace-column`
- `.__PREFIX__-panel`
- `.__PREFIX__-panel-header`
- `.__PREFIX__-panel-title`
- `.__PREFIX__-panel-subtitle`
- `.__PREFIX__-surface-state`

## Boundary

This section must stay neutral.

Do not put family output tabs, diagram canvases, score cards, formulas, scanner status, command terminals, or provider-specific language here.

## Validation Checklist

- Shell selectors are scoped under `.__TOOL_CLASS__`.
- Layout can stack on small screens.
- Section body slots stay generic.
- Empty, loading, and error states are shape-only examples.
- No final tool depends on this file at runtime unless shared includes are deliberately implemented.
