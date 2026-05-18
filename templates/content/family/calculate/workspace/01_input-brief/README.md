# Estimate Brief Workspace Section

## Purpose

Defines the primary input area for a calculate-family tool.

Use it for the estimate label, scenario name, short workload brief, or other first input that starts the normalized calculation model.

For form-first calculators, this may be only a label. For prompt or preset-led calculators, it may be a copyable estimate brief that the user applies through presets and visible controls.

## Baseline Reference

Use the AWS, Azure, and IBM Cloud cost calculators as the reference set. AWS supplies the structural rhythm; Azure and IBM Cloud prove provider adaptation, category/provider tokens, and copied-token cleanup.

## Expected Behavior

- The input must update the normalized model.
- The primary action should calculate or refresh the estimate.
- Reset should restore the family default state.
- Empty or invalid input should show a graceful inline error when the tool requires a value.
- Preset-aligned example prompts must describe values that can be represented by visible controls.

## Typical UI

- label or scenario input
- optional brief or prompt text when the calculator supports natural-language seeding
- primary estimate button
- reset/default button
- short helper text that explains the expected input

## Validation Checklist

- Input ID matches JavaScript.
- Primary action updates the model.
- Reset restores defaults.
- Error copy matches real validation.
- Exported JSON includes the label or scenario when the tool exposes JSON.
- Example prompt copy, when present, maps to the same model boundary as the label or brief.
