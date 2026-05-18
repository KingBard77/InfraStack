# Basic Controls Workspace Section

## Purpose

Defines the first-level configuration controls for an workspace.

Basic controls are the high-frequency fields users are expected to adjust before or after generation.

## When to use

Use when the tool has common configuration values such as preset, region, environment, zone count, layout type, source/destination, or diagram mode.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`

## Expected DOM/class rhythm

Expected classes:

- `.__PREFIX__-basic-grid`
- `.__PREFIX__-select-wrap`
- `.__PREFIX__-select`
- `.tool-control-label`
- `.tool-control-hint`
- `.form-control`
- `.form-select`

Expected DOM IDs depend on the tool but should follow the `__DOM_PREFIX__` rhythm.

Examples:

- `__DOM_PREFIX__Preset`
- `__DOM_PREFIX__Region`
- `__DOM_PREFIX__AzCount`

## Related CSS source files

- `section.css`

## Related JS helper files

- control sync helpers
- custom select helpers when used
- preset selection helpers
- body-only info marker helper for `.tool-control-hint`

## Avoid list

- Do not overload Basic with too many controls.
- Do not use fixed widths that overflow.
- Do not leave native dropdowns without the baseline select wrapper and 46px control rhythm.
- Do not put rare advanced fields here.
- Do not leave provider-specific labels from another tool.

## Validation checklist

- Basic controls are the most important controls.
- Control IDs match JavaScript references.
- Controls collapse safely on narrow screens.
- Dropdowns use the baseline select wrapper, custom styled menu, trigger-width dropdown menu, focus ring, and 46px control height without placeholder chips.
- Default values align with model-core defaults.
- Body helper text can receive the standard `More info` marker without adding markers to headings or labels.
