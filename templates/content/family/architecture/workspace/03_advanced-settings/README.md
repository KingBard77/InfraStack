# Custom Controls Workspace Section

## Purpose

Defines advanced or grouped controls for an workspace.

Custom controls let users refine layout, workload, services, route/path behavior, labels, or output options without overcrowding the basic control row.

## When to use

Use when the tool has more controls than should appear in Basic.

Use tabs when controls can be grouped into clear sections.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`

## Expected DOM/class rhythm

Expected state classes:

- `.open`
- `.active`

Expected data attributes:

- `data-config-tab-target`
- `data-config-panel`

Expected group rhythm:

- Network layout
- Workload
- Services and controls
- Labels and style
- Output options

Adapt labels to the domain.

## Related CSS source files

- `section.css`

## Related JS helper files

- config tab activation
- control sync
- state update handlers

## Avoid list

- Do not expose controls that do nothing.
- Do not create fake advanced options.
- Do not let hidden panels stay focusable.
- Do not leave provider-specific tabs in unrelated domains.

## Validation checklist

- Tab buttons match panels.
- Hidden panels use `hidden` or equivalent state.
- Controls update normalized state.
- Controls trigger re-render when required.
- Labels are domain-native.
