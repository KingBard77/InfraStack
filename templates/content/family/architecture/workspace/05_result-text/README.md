# Result Text Workspace Section

## Purpose

Standard `05_result-text` slot for the architecture family.

This section owns the generated text boundary around the architecture result: stage title, preset subtitle, metadata chips, the exact pre-generate notice, and short generated summary text derived from the normalized model.

It does not own the diagram canvas, score card, sort toolbar, table tabs, or JSON restore controls.

## Before and after demo rule

The section demo should show both states:

- before: the exact dashed notice, `Generate an architecture diagram to review technical inventory, service mix, and exportable JSON.`
- after: generated model title, preset chip, metadata chips, and concise review text

Render those states as two rows in one column, not side-by-side columns.

Final runtime packages should not duplicate dummy copy. They should switch state from the normalized model with classes such as `d-none`, `is-empty`, `is-generated`, or the tool-local equivalent.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__STAGE_TITLE__`
- `__STAGE_SUBTITLE__`

## Expected DOM/class rhythm

Expected DOM IDs:

- `__DOM_PREFIX__StageTitle`
- `__DOM_PREFIX__StageSubtitle`
- `__DOM_PREFIX__StageMeta`
- `__DOM_PREFIX__OutputEmpty`
- `__DOM_PREFIX__PromptSummary`

Expected classes:

- `.tool-shell-header`
- `.tool-shell-title`
- `.tool-shell-subtitle`
- `.tool-empty-state`
- `.__PREFIX__-stage-preset-chip`
- `.__PREFIX__-stage-meta`
- `.__PREFIX__-note-card`
- `.__PREFIX__-note-copy`

## Related CSS source files

- `section.css`

## Related JS helper files

- stage title renderer
- stage metadata renderer
- preset chip renderer
- prompt summary renderer
- pre-generate output state toggle

## Avoid list

- Do not put score, risk, or assessment claims in this section.
- Do not make the result text contradict the table, diagram, or JSON model.
- Do not change the pre-generate notice text.
- Do not leave provider names, preset labels, or metadata chips copied from another tool.
- Do not claim compliance, security validation, reliability validation, certification, or production readiness.

## Validation checklist

- Stage title updates after generation/import.
- Subtitle persists the current preset label as a chip.
- Metadata chips match actual normalized state.
- Pre-generate output shows the exact notice.
- Generated summary is hidden before generation and populated after generation.
- Prompt summary matches parser assumptions and control changes.
