# Input Brief Workspace Section

## Purpose

Defines the neutral primary input card for a workspace.

Families can adapt this into a prompt, estimate label, scenario, query, target, command brief, or other first input that seeds a normalized model.

## When To Use

Use when a family needs a first model input plus a primary action and a Reset action.

Examples:

- architecture prompt
- calculate estimate label
- scanner target
- shell command brief
- assessment scope label

## Required Placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__INPUT_LABEL__`
- `__INPUT_LAYOUT__`
- `__INPUT_ROWS__`
- `__INPUT_PLACEHOLDER__`
- `__INPUT_DEFAULT__`
- `__HELPER_CHIP_TEXT__`
- `__PRIMARY_ACTION_LABEL__`
- `__PRIMARY_ACTION_ICON__`
- `__SECONDARY_ACTION_LABEL__`
- `__SECONDARY_ACTION_ICON__`
- `__HELPER_TEXT__`

## Expected DOM IDs

- `__DOM_PREFIX__Input`
- `__DOM_PREFIX__PrimaryAction`
- `__DOM_PREFIX__SecondaryAction`
- `__DOM_PREFIX__InputError`

## Expected Classes

- `.__PREFIX__-input-brief`
- `.__PREFIX__-input-card`
- `.__PREFIX__-input-row`
- `.__PREFIX__-input-label-wrap`
- `.__PREFIX__-input-label`
- `.__PREFIX__-helper-chip`
- `.__PREFIX__-input-control`
- `.__PREFIX__-input-actions`
- `.__PREFIX__-input-helper-card`
- `.__PREFIX__-input-hint`
- `.__PREFIX__-input-error`

## Reset Contract

The visible secondary action is `Reset`.

Every complete final tool should keep the Reset button visible with `bi-arrow-counterclockwise` unless an explicit exception is recorded.

Reset must clear generated output state:

- hide generated result content
- show the empty output shell
- clear result summary markup
- clear validation, loading, import, or result errors
- clear generated JSON/table/command content where applicable
- clear share or URL query state when reset changes restored state

Reset must return inputs to a valid first-view baseline:

- preset-backed tools restore the selected default preset prompt and controls, then keep output empty
- non-preset tools restore the authored valid baseline; use an empty value only when the tool can start safely from a placeholder
- do not keep a preset selected while clearing the preset-owned prompt to empty

Primary action icons and Reset icons must remain visible during loading states.

## Boundary

This section owns the input card shell only.

Parser behavior, formula updates, target probing, diagram generation, command generation, JSON restore, output clearing implementation, and final model state belong to the family or tool.

## Layout Variants

Use `data-input-layout="stacked"` for large prompt cards.

Use `data-input-layout="inline"` for compact rows such as estimate labels, target paths, URL targets, and control filters.

In stacked prompt layouts, the dashed helper card should align with the input control column instead of spanning under the label column.

In inline target layouts, the input stack must stay a single full-width control column so placeholder fields do not render as a half-width field beside an empty reserved slot.

Button icons use Bootstrap Icon class placeholders by default.

Current action icon defaults are:

- architecture/generate: `bi-stars`
- calculate/estimate: `bi-calculator`
- shell/generate: `bi-terminal`
- scanning/scan: `bi-search`
- assessment/explore: `bi-search`
- reset: `bi-arrow-counterclockwise`

## Preference Selection

This section has one canonical source. Do not create separate source folders for architecture, calculate, shell, scanning, or assessment input briefs.

Before applying the section, choose the matching preference from `../manifest.yml`:

| Family | Preferred layout | Input role | Primary action | Reset behavior |
| --- | --- | --- | --- | --- |
| `architecture` | `stacked` | prompt | Generate Diagram | restore default preset prompt and controls, keep output empty |
| `calculate` | `inline` | estimate label | Estimate | restore default estimate baseline, keep output empty |
| `shell` | `inline` | target path | Generate | restore default command baseline, keep output empty |
| `scanning` | `inline` | URL target | Scan | restore safe target baseline, keep output empty |
| `assessment` | `inline` | control filter | Explore | restore default filter scope, keep output empty |
| fallback | `stacked` | primary input | Run | restore a valid first-view baseline, keep output empty |

## Validation Checklist

- Input ID matches adapted JavaScript.
- Primary and Reset action IDs match adapted JavaScript.
- Error slot exists if JavaScript references it.
- Helper text describes real behavior after adaptation.
- Helper chip title describes the field without duplicating the visible label.
- Primary and Reset button icons are available and remain visible during loading states.
- Reset clears generated output and returns the tool to a valid first-view baseline.
- Preset-backed tools do not clear a preset-owned prompt while leaving the preset selected.
- The applied preference is recorded in the family or task evidence when this section is used.
- The section can become either a textarea or single-line input without changing the shell rhythm.
