# Custom Settings Workspace Section

## Purpose

Defines the neutral compact Custom panel for InfraStack family workspaces.

Custom settings are optional controls that should not crowd the primary input or basic settings. Examples include topology overrides, advanced calculation assumptions, shell extra flags, scanner probe limits, assessment filters, output preferences, and family-specific tuning controls.

## When To Use

Use when a family or final tool has real optional/custom behavior.

Skip this section when the tool does not implement optional controls.

## Compatibility

The canonical base source is `03_custom-settings`.

Existing family or runtime namespace markers may keep `03_advanced-settings` or shell `03_advanced-setting` for compatibility. The visible disclosure label must still be `Custom`.

## Required Placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__CUSTOM_ARIA_LABEL__`
- `__CUSTOM_LAYOUT__`
- `__CUSTOM_COLUMNS__`
- `__CUSTOM_TAB_ONE_LABEL__`
- `__CUSTOM_TAB_TWO_LABEL__`
- `__CUSTOM_TAB_THREE_LABEL__`
- `__CUSTOM_TEXT_LABEL__`
- `__CUSTOM_TEXT_PLACEHOLDER__`
- `__CUSTOM_TEXT_HELPER__`
- `__CUSTOM_SELECT_LABEL__`
- `__CUSTOM_SELECT_HELPER__`
- `__CUSTOM_RADIO_LABEL__`
- `__CUSTOM_RADIO_HELPER__`
- `__CUSTOM_RADIO_STANDARD_COPY__`
- `__CUSTOM_RADIO_OVERRIDE_COPY__`
- `__CUSTOM_GROUP_LABEL__`
- `__CUSTOM_NUMBER_LABEL__`
- `__CUSTOM_NUMBER_HELPER__`
- `__CUSTOM_TOGGLE_LABEL__`
- `__CUSTOM_TOGGLE_HELPER__`
- `__CUSTOM_TEXTAREA_LABEL__`
- `__CUSTOM_TEXTAREA_PLACEHOLDER__`
- `__CUSTOM_TEXTAREA_HELPER__`
- `__CUSTOM_INFO_ITEM_ONE__`
- `__CUSTOM_INFO_ITEM_TWO__`

## Expected DOM IDs

- `__DOM_PREFIX__CustomSettings`
- `__DOM_PREFIX__CustomTabOne`
- `__DOM_PREFIX__CustomTabTwo`
- `__DOM_PREFIX__CustomTabThree`
- `__DOM_PREFIX__CustomPanelOne`
- `__DOM_PREFIX__CustomPanelTwo`
- `__DOM_PREFIX__CustomPanelThree`
- `__DOM_PREFIX__CustomText`
- `__DOM_PREFIX__CustomSelect`
- `__DOM_PREFIX__CustomRadioStandard`
- `__DOM_PREFIX__CustomRadioOverride`
- `__DOM_PREFIX__CustomNumber`
- `__DOM_PREFIX__CustomToggle`
- `__DOM_PREFIX__CustomTextarea`

Families should rename or replace these IDs with the final runtime IDs during adaptation.

## Expected Classes

- `.__PREFIX__-custom-settings`
- `.__PREFIX__-custom-summary`
- `.__PREFIX__-custom-arrow-slot`
- `.__PREFIX__-custom-body`
- `.__PREFIX__-custom-tabs`
- `.__PREFIX__-custom-tab`
- `.__PREFIX__-custom-panel`
- `.__PREFIX__-custom-grid`
- `.__PREFIX__-custom-card`
- `.__PREFIX__-custom-label-wrap`
- `.__PREFIX__-custom-helper-chip`
- `.__PREFIX__-native-select-wrap`
- `.__PREFIX__-custom-dropdown`
- `.__PREFIX__-custom-native-select`
- `.__PREFIX__-custom-radio-group`
- `.__PREFIX__-custom-radio-card`
- `.__PREFIX__-custom-radio-title`
- `.__PREFIX__-custom-radio-copy`
- `.__PREFIX__-custom-group`
- `.__PREFIX__-custom-group-head`
- `.__PREFIX__-custom-group-title`
- `.__PREFIX__-custom-group-body`
- `.__PREFIX__-custom-field`
- `.__PREFIX__-custom-text-field`
- `.__PREFIX__-custom-number-field`
- `.__PREFIX__-custom-checkbox-option`
- `.__PREFIX__-custom-textarea`
- `.__PREFIX__-custom-info`
- `.__PREFIX__-custom-hint`

`.__PREFIX__-custom-dropdown` and `.__PREFIX__-custom-native-select` are source compatibility hooks. Final family and runtime packages should normalize short Custom dropdown markup to `.__PREFIX__-native-select-wrap` plus the adapted native select class unless a recorded compatibility reason requires otherwise.

## Preference Selection

This section has one canonical source. Do not create separate base sections for architecture, calculate, shell, scanning, or assessment custom settings.

Before applying the section, choose the matching preference from `../manifest.yml`.

| Family | Custom settings emphasis |
| --- | --- |
| `architecture` | tabbed network, workload, services, label, and layout overrides |
| `calculate` | component cards, custom sizes, free-tier toggles, uplift, and rate overrides |
| `shell` | optional flags, proxy/TLS/session/runtime extras, and raw arguments |
| `scanning` | bounded request options, probe limits, evidence controls |
| `assessment` | scope filters, row limits, evidence filters, dynamic options |
| fallback | compact optional settings, output preferences, and overrides |

## Hard Rules

- The visible disclosure label is `Custom`, not `Advanced`.
- The Custom disclosure indicator must use one right-aligned arrow slot with a small button surface; default state points right and open state points down.
- Short Custom dropdowns must use native `<select>` popups inside `.__PREFIX__-native-select-wrap`, with the closed control following `../manifest.yml` `dropdown_visual_contract`: 46px minimum height, one 30px arrow chip, a centered always-down chevron, full-width control, and browser-owned popup behavior.
- Long dynamic Custom lists may use the in-page searchable picker exception only when a native popup cannot provide deterministic direction or width. The picker must use a hidden canonical state input, trigger, search input, listbox option area, and normal document flow panel that opens below the trigger.
- Long dynamic Custom pickers must be width-contained: the picker root, trigger, panel, search input, and options area use `width: 100%`, `max-width: 100%`, `min-width: 0`, and `box-sizing: border-box`; the trigger hides overflow; the visible label uses ellipsis; the arrow chip keeps a fixed `30px` slot.
- Long dynamic Custom picker panels must not use absolute or fixed positioning, z-index layering, detached popovers, or hidden native `<select>` replacements. The panel sits inside the same setting card and may use an internal scroll area for options.
- Custom native select arrow chips do not change color, background, or direction on hover/focus.
- Custom native selects must remain visible and clickable. Do not ship any final family or runtime CSS that hides `.__PREFIX__-custom-native-select`, `.__PREFIX__-native-select`, or the adapted `<tool>-native-select` class with `display: none`, opacity, pointer-event blocking, clipping, or zero dimensions.
- Converted Custom selects must not keep fake-dropdown or enhancement classes such as `.__PREFIX__-custom-dropdown`, `.__PREFIX__-custom-native-select`, `.__PREFIX__-select-control`, enhanced-select wrappers, or data attributes intended for custom option buttons in final family or runtime packages.
- Suppress native `summary` markers and suppress fallback pseudo arrows whenever `custom-arrow-slot` exists, so the UI never shows two arrows.
- Do not use an up arrow for open Custom disclosures.
- Do not add more than one arrow slot inside a Custom disclosure summary.
- Scope tab-panel hiding to panel nodes such as `.custom-panel[data-custom-panel]`; never hide the outer Custom `<details>` with a broad `.custom-panel { display: none; }` rule.
- Do not implement short Custom dropdowns with `<details>`, `role="listbox"`, button option rows, custom menu divs, custom option hover styles, custom scrollbar styling, or custom selected-row CSS.
- Use the Basic settings radio-card design for Custom radio choices, with the visible radio dot drawn by CSS.
- Use explicitly styled checkbox controls with CSS-drawn switch tracks, neutral off color, and strong accent on color, not native checkbox rendering or custom switch cards, inside Custom.
- Simple settings may live in one compact card. Dense groups with many related controls should be divided into grouped cards.
- Do not place another card around a single input, dropdown, unit, currency prefix, quantity value, or active placeholder.
- If a Custom input needs prefix/suffix labels such as `$`, `%`, `GB`, or request units, render them as transparent inline addons with no internal borders, including disabled state.
- When prefixed or suffixed input groups sit inside Custom, add a later scoped override for the real input control so broad Custom input selectors do not draw a second border or focus ring inside the group.
- Every radio card, native select closed control, text input, textarea, number input, placeholder, CSS-drawn checkbox switch, helper chip, grouped card, and dashed info row must have explicit CSS in the final family or runtime package.
- Custom radio and checkbox CSS must not depend on `accent-color` for the visible control state.
- Example values belong in the actual control placeholders or defaults, not in a separate example card.
- Placeholder examples must match the field type: CIDR/network fields use slash notation such as `10.0.0.0/16`, numeric fields use number examples, and quantity fields use quantity examples with units outside the input.
- Custom number inputs must hide browser-native spinner boxes; the input itself is the control, not a nested mini-card.
- Put general information or long helper text above the related compact controls when it explains the whole group. Put each setting label/helper first, the fillable control second, and the explanation below the control.
- Use dashed helper rows when explanatory text needs its own surface, and allow those rows to span the group when the text would crowd a compact number field.
- Controls inside the panel must stay compact.
- Use one column by default. Use count-based two-column or three-column inner field layouts only when the selected family preference requires grouped override controls.
- Multiple compact rows are allowed when the family has many real controls, but dense groups must remain visually divided and scan-friendly.
- Auto-organization must happen at the correct hierarchy: organize related services or setting clusters as outer grouped cards first, then align each field label/control pair inside the card.
- Do not flatten a grouped-card layout into one vertical group list only to align labels with controls; that loses the scan pattern and creates long, uneven sections.
- For dense override/rate groups, keep one outer grouped card per row. Inside each card, one field uses one column, two fields use two columns, and three or more fields use three columns on desktop.
- Neutralize shared span helpers inside override group bodies so a third field cannot force a second full-width row.
- In dense override/rate groups, field labels sit above their input/control inside each field column.
- For compact three-input shell or utility groups such as umask/base modes, use a stacked setting row so the three controls own the full row instead of being squeezed beside the group label.
- Separate inner sections with spacing, not divider lines.
- Mobile layout must collapse to one column, keep controls full width, keep dropdowns viewport-safe, and preserve tappable control height.

## Validation Checklist

- Applied family preference is recorded.
- Visible label reads `Custom`.
- No visible `Advanced` label remains in the final runtime panel.
- Control IDs match adapted JavaScript.
- Tab buttons match panels when tabs are used.
- Hidden panels use `hidden` or equivalent state.
- No fake controls remain.
- Placeholder, focus, hover, disabled, selected, and mobile states are styled.
- Short dropdowns use native `<select>` popups, use one closed-control arrow chip, and remain usable on narrow screens.
- Long dynamic picker exceptions stay inside the card, open below, search/filter options, update the hidden state field, and keep the selected value through output generation, export, restore, and URL state where those surfaces exist.
- Closed dropdown height, static centered down arrow chip, focus ring, width, and mobile sizing match `dropdown_visual_contract`.
- Static scans confirm no Custom native select hide rule remains, no converted Custom native select carries fake-dropdown or enhanced-select classes, and any long dynamic picker has the required searchable in-page markup plus width-containment CSS.
- Browser Use confirms affected Custom native selects are visible, enabled, non-zero sized, and can change value on the reported runtime route. For a long dynamic picker, Browser Use confirms the trigger stays inside its card, the panel opens below, search/select works, and the selected value survives the primary action.
- Custom disclosure arrows point right by default and down when open.
- Custom summaries do not show native markers or fallback pseudo arrows when `custom-arrow-slot` exists.
- Tab-panel display CSS does not hide outer Custom disclosure panels.
- Radio choices use the same card rhythm as Basic settings and do not expose native radio controls.
- Checkbox controls have explicit neutral off, strong accent on, checked, and focus styling and do not expose native checkbox controls.
- Custom number inputs do not expose browser-native spinner boxes.
- Prefix/suffix labels for currency, units, percentages, and quantities do not render as nested cards inside the input.
- Long information text uses dashed text rows that can wrap into columns or rows without breaking the card.
- Dense Custom sections use grouped cards where a flat list would become difficult to scan.
- Dense override groups use one grouped card per row, with one-row count-based inner columns for one-field, two-field, and three-field cards.
- Static parity checks prove the outer group grid is one column, the inner field columns match field count, and shared span helpers do not force wrapped second rows.
- Three-input utility groups are checked for a stacked parent row, one desktop row of three controls, and a one-column mobile collapse.
- Placeholder examples match actual custom behavior.
