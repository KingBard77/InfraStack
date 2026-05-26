# Input Brief Workspace Section

## Purpose

Defines the neutral primary input card for a workspace.

Families can adapt this into a prompt, estimate label, scenario, query, target, command brief, or other first input that seeds a normalized model.

## When To Use

Use when a family needs a first model input plus primary and secondary actions.

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

## Boundary

This section owns the input card shell only.

Parser behavior, formula updates, target probing, diagram generation, command generation, JSON restore, and final model state belong to the family or tool.

## Layout Variants

Use `data-input-layout="stacked"` for large prompt cards.

Use `data-input-layout="inline"` for compact rows such as estimate labels, target paths, URL targets, and control filters.

In stacked prompt layouts, the dashed helper card should align with the input control column instead of spanning under the label column.

In inline target layouts, the input stack must stay a single full-width control column so placeholder fields do not render as a half-width field beside an empty reserved slot.

Button icons use Bootstrap Icon class placeholders by default. Family or runtime packages may replace them with another icon system if that package already uses one.

## Preference Selection

This section has one canonical source. Do not create separate source folders for architecture, calculate, shell, scanning, or assessment input briefs.

Before applying the section, choose the matching preference from `../manifest.yml`:

| Family | Preferred layout | Input role | Primary action |
| --- | --- | --- | --- |
| `architecture` | `stacked` | prompt | Generate Diagram |
| `calculate` | `inline` | estimate label | Estimate |
| `shell` | `inline` | target path | Generate |
| `scanning` | `inline` | URL target | Scan |
| `assessment` | `inline` | control filter | Explore |
| fallback | `stacked` | primary input | Run |

If a preference marks the secondary action as not required, remove the secondary button during adaptation unless the family or final tool implements a real reset/default action.

## Validation Checklist

- Input ID matches adapted JavaScript.
- Primary and secondary action IDs match adapted JavaScript.
- Error slot exists if JavaScript references it.
- Helper text describes real behavior after adaptation.
- Helper chip title describes the field without duplicating the visible label.
- Primary and secondary button icons are available or deliberately removed during family adaptation.
- The applied preference is recorded in the family or task evidence when this section is used.
- The section can become either a textarea or single-line input without changing the shell rhythm.
