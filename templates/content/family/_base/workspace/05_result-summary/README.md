# Result Summary Workspace Section

## Purpose

Defines the shared result summary shape for InfraStack family workspaces.

Use it for the first visible generated output after a user runs, estimates, scans, explores, or generates a model.

This section owns layout rhythm only. Families and final tools own result meaning, state, exports, restore payloads, scores, charts, commands, and domain copy.

## When To Use

Use when a family or final tool needs a generated result overview before detailed tabs, tables, diagrams, terminal output, or JSON.

Skip when the result is only a direct terminal block or a single table and no summary is needed.

## Compatibility

The canonical base source is `05_result-summary`.

Existing family sections may keep names such as `07_score-card` or `05_score-card` when compatibility requires it. When the same card rhythm applies, use this source as the visual baseline.

## Required Placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__RESULT_EMPTY_TEXT__`
- `__RESULT_ERROR_TEXT__`
- `__RESULT_TONE__`
- `__RESULT_LAYOUT__`
- `__RESULT_VISUAL_KIND__`
- `__RESULT_HEADER_TITLE__`
- `__RESULT_HEADER_COPY__`
- `__RESULT_HEADER_ICON__`
- `__RESULT_HEADER_STATUS_LABEL__`
- `__RESULT_HEADER_STATUS_ICON__`
- `__RESULT_HEADER_UPDATED_LABEL__`
- `__RESULT_HEADER_UPDATED_ICON__`
- `__RESULT_SUMMARY_KICKER__`
- `__RESULT_PRIMARY_TITLE__`
- `__RESULT_PRIMARY_COPY__`
- `__RESULT_SUMMARY_ICON__`
- `__RESULT_STATUS_LABEL__`
- `__RESULT_STATUS_ICON__`
- `__RESULT_SECONDARY_LABEL__`
- `__RESULT_SECONDARY_ICON__`
- `__RESULT_TERTIARY_LABEL__`
- `__RESULT_TERTIARY_ICON__`
- `__RESULT_QUATERNARY_LABEL__`
- `__RESULT_QUATERNARY_ICON__`
- `__RESULT_QUINARY_LABEL__`
- `__RESULT_QUINARY_ICON__`
- `__RESULT_VISUAL_KICKER__`
- `__RESULT_VISUAL_ICON__`
- `__RESULT_VISUAL_VALUE__`
- `__RESULT_VISUAL_VALUE_CHARS__`
- `__RESULT_VISUAL_UNIT__`
- `__RESULT_VISUAL_TITLE__`
- `__RESULT_VISUAL_COPY__`
- `__RESULT_PROGRESS_DEG__`
- `__RESULT_PRIMARY_VISUAL_LABEL__`
- `__RESULT_PRIMARY_VISUAL_COPY__`
- `__RESULT_PRIMARY_SVG__`
- `__RESULT_PRIMARY_CHIP_LABEL__`
- `__RESULT_PRIMARY_CHIP_ICON__`
- `__RESULT_METRIC_ONE_LABEL__`
- `__RESULT_METRIC_ONE_VALUE__`
- `__RESULT_METRIC_ONE_COPY__`
- `__RESULT_METRIC_ONE_ICON__`
- `__RESULT_METRIC_TWO_LABEL__`
- `__RESULT_METRIC_TWO_VALUE__`
- `__RESULT_METRIC_TWO_COPY__`
- `__RESULT_METRIC_TWO_ICON__`
- `__RESULT_METRIC_THREE_LABEL__`
- `__RESULT_METRIC_THREE_VALUE__`
- `__RESULT_METRIC_THREE_COPY__`
- `__RESULT_METRIC_THREE_ICON__`
- `__RESULT_METRIC_FOUR_LABEL__`
- `__RESULT_METRIC_FOUR_VALUE__`
- `__RESULT_METRIC_FOUR_COPY__`
- `__RESULT_METRIC_FOUR_ICON__`

## Expected DOM IDs

- `__DOM_PREFIX__ResultEmpty`
- `__DOM_PREFIX__ResultError`
- `__DOM_PREFIX__ResultSummary`
- `__DOM_PREFIX__ResultVisual`

Families should rename or replace these IDs with the final runtime IDs during adaptation.

## Expected Classes

- `.__PREFIX__-result-empty`
- `.__PREFIX__-result-error`
- `.__PREFIX__-result-summary`
- `.__PREFIX__-result-header`
- `.__PREFIX__-result-header-main`
- `.__PREFIX__-result-header-icon`
- `.__PREFIX__-result-header-copy`
- `.__PREFIX__-result-header-title`
- `.__PREFIX__-result-header-meta`
- `.__PREFIX__-result-header-chip`
- `.__PREFIX__-result-hero-grid`
- `.__PREFIX__-result-card`
- `.__PREFIX__-result-card-main`
- `.__PREFIX__-result-card-visual`
- `.__PREFIX__-result-card-primary`
- `.__PREFIX__-result-card-summary`
- `.__PREFIX__-result-card-icon`
- `.__PREFIX__-result-card-icon-primary`
- `.__PREFIX__-result-card-icon-summary`
- `.__PREFIX__-result-card-divider`
- `.__PREFIX__-result-summary-intro`
- `.__PREFIX__-result-summary-copy`
- `.__PREFIX__-result-kicker`
- `.__PREFIX__-result-title`
- `.__PREFIX__-result-title-center`
- `.__PREFIX__-result-copy`
- `.__PREFIX__-result-copy-center`
- `.__PREFIX__-result-chip-row`
- `.__PREFIX__-result-chip-row-center`
- `.__PREFIX__-result-chip-grid`
- `.__PREFIX__-result-chip`
- `.__PREFIX__-result-chip-icon`
- `.__PREFIX__-result-chip-success`
- `.__PREFIX__-result-chip-warning`
- `.__PREFIX__-result-chip-error`
- `.__PREFIX__-result-chip-baseline`
- `.__PREFIX__-result-chip-ready`
- `.__PREFIX__-result-chip-need-work`
- `.__PREFIX__-result-chip-outcome`
- `.__PREFIX__-result-chip-updated`
- `.__PREFIX__-result-ring`
- `.__PREFIX__-result-ring-center`
- `.__PREFIX__-result-ring-value`
- `.__PREFIX__-result-ring-unit`
- `.__PREFIX__-result-primary-heading`
- `.__PREFIX__-result-primary-visual`
- `.__PREFIX__-result-primary-number`
- `.__PREFIX__-result-primary-number-value`
- `.__PREFIX__-result-primary-number-unit`
- `.__PREFIX__-result-primary-text`
- `.__PREFIX__-result-primary-text-value`
- `.__PREFIX__-result-primary-text-unit`
- `.__PREFIX__-result-primary-metric`
- `.__PREFIX__-result-primary-metric-label`
- `.__PREFIX__-result-primary-metric-value`
- `.__PREFIX__-result-primary-metric-copy`
- `.__PREFIX__-result-primary-svg`
- `.__PREFIX__-result-primary-pill`
- `.__PREFIX__-result-visual-copy`
- `.__PREFIX__-result-visual-copy-top`
- `.__PREFIX__-result-metric-grid`
- `.__PREFIX__-result-metric-card`
- `.__PREFIX__-result-metric-success`
- `.__PREFIX__-result-metric-info`
- `.__PREFIX__-result-metric-accent-tone`
- `.__PREFIX__-result-metric-warning`
- `.__PREFIX__-result-metric-icon`
- `.__PREFIX__-result-metric-label`
- `.__PREFIX__-result-metric-value`
- `.__PREFIX__-result-metric-copy`
- `.__PREFIX__-result-metric-accent`

## Preference Selection

This section has one canonical source. Do not create separate base sections for architecture, calculate, shell, scanning, or assessment summaries.

Before applying the section, choose the matching preference from `../manifest.yml`.

| Family | Result summary emphasis |
| --- | --- |
| `architecture` | advisory score, readiness copy, model chips, ring or SVG primary visual |
| `calculate` | run-rate card, cost ring, top driver, number/decimal metric primary visual |
| `scanning` | target status, finding counts, score ring, evidence chips |
| `shell` | generated command or mode card, compared status cards, warning chips |
| `assessment` | matched rows, selected item, section scope, filter chips, number or pill primary visual |
| fallback | generated result, status, metrics, and supporting chips |

## Hard Rules

- The whole result summary must be inside a card.
- The card must start with a visible `Result Summary` title and the status/runtime outlined pill chips outside the inner result cards.
- Header icons and header helper copy are optional; do not require them for the base visual rhythm.
- Text must stay inside its card with `min-width: 0`, `overflow-wrap: anywhere`, and responsive grid rules.
- If a title appears inside a result card, center it when the card is visual or score-like.
- Outlined pill chips must use tone classes for success, warning, error, baseline, ready, and need-work states.
- Every outlined pill chip must be able to carry an icon inside the chip.
- The primary result card must sit on the left.
- The summary card must sit on the right.
- The primary result kicker, such as `Primary result`, must stay top-centered inside the primary result card.
- The summary card kicker, such as `Descriptive Summary`, must stay at the top of the right card.
- Primary result cards may use `data-result-visual` values of `ring`, `icon`, `svg`, `metric`, `number`, `decimal`, `text`, `status`, `command`, or `pill`.
- Primary result cards for architecture, calculate, and scanning may use a centered ring.
- Ring primary result markup must set `--__PREFIX__-result-value-chars` to the visible value length, with a minimum of `3`, or the runtime must set the same CSS variable before rendering.
- The primary result kicker, such as `Primary result`, must appear above the ring.
- Ring primary result cards must place the black primary title above the ring.
- Ring primary result cards must not repeat the ring value as a separate score or number below the ring.
- Ring primary result titles must not include inline status icons; icons belong in chips, header pills, or metric badges.
- The primary result copy may appear centered below the ring.
- The primary and summary card divider lines must align without reserving artificial empty chip space below the outlined pills.
- Primary result cards should include an outlined outcome chip that says what the ring or primary value means.
- Shell summaries may replace the ring with compact generated text, such as `chmod mode 0777`; do not show a full direct command in the primary result card.
- Estimate summaries should put the summary title at the top, a short summary below it, and at least four outlined chips. Keep updated date/time in the header runtime pill, not duplicated inside the right summary card.
- Summary cards may use up to six outlined chips when the family has enough real filter, scope, status, or metadata values.
- Metric cards should use icon badges and bottom accent bars while keeping values, labels, and helper copy inside the card.
- Metric-card values should stay compact enough for long provider, region, mode, and routing labels.
- Metric-card accent bars must stay pinned to the bottom row, regardless of copy length.
- Result shell colors must inherit family/category/provider tokens. Do not make the full result card orange just because the result tone is warning.
- Small metric cards and large cards must align across left and right columns.
- Additional labels or outline chips are allowed when generated from real result state.
- Mobile layout must collapse to one column and keep all cards full width.

## Validation Checklist

- Empty and error states do not show stale generated values.
- Result summary values come from normalized result state.
- Chips use result tone, not arbitrary colors.
- Ring value, metric cards, and JSON/export values agree where applicable.
- Long ring values such as decimals, currency, counts, and percentages fit inside the ring center without touching the ring stroke.
- Primary and summary card divider lines align on desktop, and summary chips render directly below the divider.
- Metric-card accent bars align at the card bottom.
- Text does not overflow cards on narrow screens.
- No summary claims compliance, security, billing accuracy, certification, or production readiness unless separately validated.
