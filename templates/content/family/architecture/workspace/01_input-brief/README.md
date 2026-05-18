# Prompt Workspace Section

## Purpose

Defines the prompt or primary input area for a workspace.

This section lets the user seed the model from a short brief, preset, or domain-specific input.

## When to use

Use for prompt-driven tools, topology builders, architecture generators, flow designers, dependency mappers, and other primary-input workspaces.

For non-prompt tools, adapt this section into the primary input shell.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__TOOL_NAME__`
- `__PROMPT_LABEL__`
- `__GENERATE_LABEL__`

## Expected DOM/class rhythm

Expected root classes:

- `.__TOOL_CLASS__`
- `.tool-box`
- `.tool-prompt-shell`
- `.__PREFIX__-prompt`

Expected DOM IDs:

- `__DOM_PREFIX__Prompt`
- `__DOM_PREFIX__Generate`
- `__DOM_PREFIX__Reset`
- `__DOM_PREFIX__ErrorState`

## Related CSS source files

- `section.css`

## Related JS helper files

- prompt normalization
- generate handler
- reset/load-default handler
- error-state helper
- body-only info marker helper for `.tool-control-hint`

## Avoid list

- Do not bury the generate button.
- Do not make the prompt area look like article prose.
- Do not claim AI behavior if parsing is deterministic.
- Do not leave inherited prompt IDs from another tool.

## Validation checklist

- Prompt textarea ID matches JavaScript.
- Generate button ID matches JavaScript.
- Reset/default button ID matches JavaScript.
- Error state exists if JavaScript references it.
- Prompt helper text matches actual parser behavior.
- Body helper text can receive the standard `More info` marker without adding markers to headings or labels.
