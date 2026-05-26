# Score Card Workspace Section

## Purpose

Standard `07_score-card` slot for the architecture family.

This section owns advisory score, status, quality, readiness, risk, or assumption summary cards for the generated architecture model.

It is intentionally separate from `05_result-text` and `09_result-table` so score language can stay controlled and never become table or JSON truth by accident.

## Before and after demo rule

The section demo should show both states:

- before: neutral or hidden score state that asks the user to generate the model first
- after: dummy advisory score/status populated from the generated model

Render those states as two rows in one column, not side-by-side columns.

Final runtime packages must derive score text from normalized model state. Hardcoded dummy score copy is demo-only.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`

## Expected DOM/class rhythm

Expected DOM IDs:

- `__DOM_PREFIX__OutputStatus`

Expected classes:

- `.__PREFIX__-output-summary`
- `.__PREFIX__-output-status-card`
- `.__PREFIX__-score-card`
- `.__PREFIX__-score-kicker`
- `.__PREFIX__-score-value`
- `.__PREFIX__-score-summary`

## Related CSS source files

- `section.css`

## Related JS helper files

- score/status renderer
- advisory summary renderer
- generated-state visibility helper

## Avoid list

- Do not write scores as compliance results.
- Do not claim security, reliability, certification, or production readiness validation.
- Do not duplicate the score card inside the table section.
- Do not show stale score copy after prompt or control changes.

## Validation checklist

- Score card is neutral or hidden before generation.
- Score card updates after generation/import.
- Score text matches the normalized model.
- Advisory language does not overclaim validation.
- Score card is not duplicated in `09_result-table`.
