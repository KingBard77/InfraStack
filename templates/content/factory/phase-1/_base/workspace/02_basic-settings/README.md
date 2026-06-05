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
- `.__PREFIX__-native-select-wrap`
- `.__PREFIX__-native-select`
- `.__PREFIX__-select`
- `.__PREFIX__-select-control`
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

`.__PREFIX__-select` and `.__PREFIX__-select-control` are source compatibility hooks. Final family and runtime packages should normalize short Basic dropdown markup to `.__PREFIX__-native-select-wrap` plus the adapted native select class unless a recorded compatibility reason requires otherwise.

## Repeated Setting Card Contract

Use `.__PREFIX__-repeat-setting-*` classes when one basic-setting group contains multiple peer cards, such as cron fields, repeated rule fields, per-column settings, or small mode cards.

When a repeated peer-card group is the actual control surface, place it in a full-width `.__PREFIX__-setting-card-wide` card with the group label above the grid. Do not reserve a left label rail beside a nested card grid; it wastes horizontal space and makes the right side look offset from simpler settings. Keep repeated cards wide enough that their inner controls do not collapse into cramped side-by-side columns.

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
- Short Basic dropdowns must use native `<select>` popups inside `.__PREFIX__-native-select-wrap`, with the closed control following `../manifest.yml` `dropdown_visual_contract`: 46px minimum height, one 30px arrow chip, a centered always-down chevron, full-width control, and browser-owned popup behavior.
- Long dynamic Basic lists may use the in-page searchable picker exception only when a native popup cannot provide deterministic direction or width. The picker must use a hidden canonical state input, trigger, search input, listbox option area, and normal document flow panel that opens below the trigger.
- Long dynamic Basic pickers must be width-contained: the picker root, trigger, panel, search input, and options area use `width: 100%`, `max-width: 100%`, `min-width: 0`, and `box-sizing: border-box`; the trigger hides overflow; the visible label uses ellipsis; the arrow chip keeps a fixed `30px` slot.
- Long dynamic Basic picker panels must not use absolute or fixed positioning, z-index layering, detached popovers, or hidden native `<select>` replacements. The panel sits inside the same setting card and may use an internal scroll area for options.
- Basic native select arrow chips do not change color, background, or direction on hover/focus.
- Basic native selects must remain visible and clickable. Do not ship any final family or runtime CSS that hides `.__PREFIX__-native-select` or the adapted `<tool>-native-select` class with `display: none`, opacity, pointer-event blocking, clipping, or zero dimensions.
- Converted Basic selects must not keep fake-dropdown or enhancement classes such as `.__PREFIX__-custom-dropdown`, `.__PREFIX__-custom-native-select`, `.__PREFIX__-select-control`, enhanced-select wrappers, or data attributes intended for custom option buttons in final family or runtime packages.
- Do not add outlined pill chips when they only duplicate the selected dropdown summary or placeholder.
- When an outlined reset, default, or scope pill chip provides a distinct action, keep it in the left label column; keep the right column for the active control, selected value, placeholder, hidden field, or dropdown surface.
- Every basic setting must live inside a card.
- Repeated peer setting cards must use the repeat-setting card row contract so labels, tokens, controls, helper text, and feedback stay aligned across the group.
- Repeated peer setting groups must span the full available setting width when the group itself contains multiple nested cards.
- Every native select, text input, textarea, number input, placeholder, toggle, and helper chip must have explicit closed-control CSS in the final family or runtime package.
- Short Basic dropdown popup behavior must remain browser-owned through native `<select>` controls.
- Do not implement short Basic dropdowns with `<details>`, `role="listbox"`, button option rows, hidden radio option rows, custom menu divs, custom option hover styles, custom scrollbar styling, or custom selected-row CSS.
- Every applied section must include an example input card or equivalent example setting card.
- Mobile layout must collapse to one column, keep controls full width, keep dropdowns viewport-safe, and preserve tappable control height.

## Validation Checklist

- Applied family preference is recorded.
- Section is skipped when no real high-frequency basic settings exist.
- Control IDs match adapted JavaScript.
- No fake controls remain.
- Placeholder, focus, hover, disabled, and mobile states are styled.
- Short dropdowns use native `<select>` popups, remain keyboard/tap usable, and avoid custom popup markup on narrow screens.
- Long dynamic picker exceptions stay inside the card, open below, search/filter options, update the hidden state field, and keep the selected value through output generation, export, restore, and URL state where those surfaces exist.
- Closed dropdown height, static centered down arrow chip, focus ring, width, and mobile sizing match `dropdown_visual_contract`.
- Static scans confirm no Basic native select hide rule remains, no converted Basic native select carries fake-dropdown or enhanced-select classes, and any long dynamic picker has the required searchable in-page markup plus width-containment CSS.
- Browser Use confirms affected Basic native selects are visible, enabled, non-zero sized, and can change value on the reported runtime route. For a long dynamic picker, Browser Use confirms the trigger stays inside its card, the panel opens below, search/select works, and the selected value survives the primary action.
- Example input matches actual control behavior.
