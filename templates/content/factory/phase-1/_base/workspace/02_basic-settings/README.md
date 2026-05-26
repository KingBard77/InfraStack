# Basic Settings Workspace Section

## Purpose

Defines the neutral basic settings card for InfraStack family workspaces.

Basic settings are the high-frequency controls users adjust immediately after the primary input. Examples include presets, regions, scopes, shell mode, request method, timeout, row limits, output basis, and visible assumptions.

## When To Use

Use when a family needs common controls before advanced configuration or output review.

Skip this section when a tool does not have real high-frequency basic controls.

## Required Placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__BASIC_EXAMPLE_LABEL__`
- `__BASIC_EXAMPLE_VALUE__`
- `__BASIC_EXAMPLE_HELPER__`
- `__BASIC_PRIMARY_LABEL__`
- `__BASIC_PRIMARY_HELPER__`
- `__BASIC_SELECT_LABEL__`
- `__BASIC_SELECT_HELPER__`
- `__BASIC_TEXT_LABEL__`
- `__BASIC_TEXT_PLACEHOLDER__`
- `__BASIC_TEXT_HELPER__`
- `__BASIC_TOGGLE_LABEL__`
- `__BASIC_TOGGLE_HELPER__`

## Expected DOM IDs

- `__DOM_PREFIX__BasicPrimary`
- `__DOM_PREFIX__BasicSelect`
- `__DOM_PREFIX__BasicSelectSummary`
- `__DOM_PREFIX__BasicSelectMenu`
- `__DOM_PREFIX__BasicText`
- `__DOM_PREFIX__BasicToggle`

Families should rename or replace these IDs with the final runtime IDs during adaptation.

## Expected Classes

- `.__PREFIX__-basic-card`
- `.__PREFIX__-basic-grid`
- `.__PREFIX__-setting-card`
- `.__PREFIX__-setting-card-wide`
- `.__PREFIX__-setting-label-wrap`
- `.__PREFIX__-helper-chip`
- `.__PREFIX__-example-card`
- `.__PREFIX__-select`
- `.__PREFIX__-select-summary`
- `.__PREFIX__-select-arrow-slot`
- `.__PREFIX__-select-body`
- `.__PREFIX__-select-option`
- `.__PREFIX__-select-option-title`
- `.__PREFIX__-text-field`
- `.__PREFIX__-switch-card`
- `.__PREFIX__-setting-hint`
- `.__PREFIX__-repeat-setting-grid`
- `.__PREFIX__-repeat-setting-card`
- `.__PREFIX__-repeat-setting-topbar`
- `.__PREFIX__-repeat-setting-label`
- `.__PREFIX__-repeat-setting-token`
- `.__PREFIX__-repeat-setting-mode`
- `.__PREFIX__-repeat-setting-mode-btn`
- `.__PREFIX__-repeat-setting-panel`
- `.__PREFIX__-repeat-setting-control-stack`
- `.__PREFIX__-repeat-setting-hint`
- `.__PREFIX__-repeat-setting-feedback`

## Repeated Setting Card Contract

Use `.__PREFIX__-repeat-setting-*` classes when one basic-setting group contains multiple peer cards, such as cron fields, repeated rule fields, per-column settings, or small mode cards.

Each repeated card must keep the same internal rows:

1. `.__PREFIX__-repeat-setting-topbar` with label, value token, and mode buttons.
2. `.__PREFIX__-repeat-setting-panel` with the active control stack.
3. `.__PREFIX__-repeat-setting-hint` for short helper copy.
4. `.__PREFIX__-repeat-setting-feedback` for optional validation or state feedback.

Do not let one card float its controls to the top while another card drops them lower. If a card has fewer controls, keep the same rows and leave the optional feedback row hidden or empty.

## Preference Selection

This section has one canonical source. Do not create separate base sections for architecture, calculate, shell, scanning, or assessment basic settings.

Before applying the section, choose the matching preference from `../manifest.yml`.

| Family | Basic settings emphasis |
| --- | --- |
| `architecture` | preset, region, zone count, layout assumptions |
| `calculate` | preset, estimate basis, visible assumption cards |
| `shell` | preset, shell, implementation, mode, target placeholders, flags |
| `scanning` | request method, timeout, redirects, TLS, companion probes |
| `assessment` | scope selectors, row limits, dynamic options, reset controls |
| fallback | generic preset, option, text, toggle |

## Hard Rules

- Do not add visible `Basic settings` title or subtitle copy to final runtime tools unless the tool already has a native section heading that must be preserved.
- Do not add outlined pill chips when they only duplicate the selected dropdown summary or placeholder.
- When an outlined reset, default, or scope pill chip provides a distinct action, keep it in the left label column; keep the right column for the active control, selected value, placeholder, hidden field, or dropdown surface.
- Every basic setting must live inside a card.
- Repeated peer setting cards must use the repeat-setting card row contract so labels, tokens, controls, helper text, and feedback stay aligned across the group.
- Every radio input, dropdown, text input, textarea, number input, placeholder, toggle, and helper chip must have explicit CSS in the final family or runtime package.
- Basic dropdown menus must open as popup overlays, not inline panels that change card or column height.
- Basic dropdown options must render as plain dropdown rows: no visible radio controls, no nested option cards, no row borders, and no row shadows.
- Basic dropdown state may use hidden radio inputs, but those inputs must be visually hidden and removed from row layout.
- Basic dropdown hover and selected states must keep the `_base` soft row highlight with provider or family accent title color.
- Every applied section must include an example input card or equivalent example setting card.
- Mobile layout must collapse to one column, keep controls full width, keep dropdowns viewport-safe, and preserve tappable control height.

## Validation Checklist

- Applied family preference is recorded.
- Section is skipped when no real high-frequency basic settings exist.
- Control IDs match adapted JavaScript.
- No fake controls remain.
- Placeholder, focus, hover, disabled, selected, and mobile states are styled.
- Dropdowns remain popup, viewport-safe, keyboard/tap usable, and visually free of radio controls on narrow screens.
- Example input matches actual control behavior.
