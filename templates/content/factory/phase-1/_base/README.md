# InfraStack Base Workspace Contract

## Purpose

`_base` defines the `phase-1` workspace contract used by multiple InfraStack families.

It is not a runtime family, catalogue family, or final tool package. It is the reusable contract foundation for workspace shape, section rhythm, control framing, markers, and neutral interaction shells.

Use `_base` when two or more family baselines need the same structural pattern but different state, output meaning, visual surface, or domain language.

`_base` does not own a `source/` folder. It owns manifests, workspace section contracts, and section bundles that are applied through namespace markers.

## Ownership

`_base` owns `phase-1` shape and contracts.

Families own meaning.

Final tools own domain.

## Typography Rule

Base workspace source must use the platform two-font system without adding local proportional stacks: `Nunito` via `--heading-font` for headings and titles, and `Roboto` via `--default-font` for body text, labels, controls, tables, tool UI, and support copy. Monospace stacks stay limited to code, terminal, command, JSON, and preformatted output.

## Current Scope

The base foundation currently includes:

- `00_shell`: shared workspace frame, panel rhythm, layout wrappers, section heading structure, and responsive stacking.
- `01_input-brief`: neutral primary input card for prompt, label, scenario, query, target, or other first model input, with helper chips and icon-ready actions.
- `02_basic-settings`: neutral basic settings card for high-frequency controls, with helper chips, explicit control CSS, example input, and mobile-safe stacking.
- `03_custom-settings`: neutral compact Custom panel for optional controls, helper chips, explicit control CSS, placeholder examples, and count-based grouped override columns.
- `05_result-summary`: neutral generated result summary card shell with a header row, left primary result, right summary card, metric cards, state chips, and optional ring visual.
- `06_output-toolbar`: neutral sortable output toolbar with one custom CSS sort dropdown and five icon-ready output actions.
- `07_table-output`: neutral tabbed output shell with five output sections, table-first rhythm, JSON-last rhythm, table frame, empty state, and icon-only row actions.
- `08_json-restore`: neutral JSON output, import file input, restore status, empty JSON state, and readable code frame.

## Preference Rule

Use one canonical source section for `01_input-brief`.

Do not create separate base sections for architecture prompts, estimate labels, scanner targets, shell paths, or assessment filters. The correct applied shape is chosen from the input preference map in `workspace/manifest.yml`.

Preference values may set:

- stacked or inline layout
- textarea or single-line input intent
- row count
- label and helper chip text
- primary and secondary action labels
- primary and secondary Bootstrap Icon classes
- whether the secondary action should be removed

`02_basic-settings` follows the same rule: use one canonical source section and select family-specific meaning from the workspace manifest. Do not create separate base sections just to change preset, scope, shell, scanner, or assessment control wording.

`03_custom-settings` follows the same rule: use one canonical source section and select family-specific meaning from the workspace manifest. Do not create separate base sections just to change the old Advanced label, control density, column count, tab names, or row grouping.

The visible disclosure label for custom settings is always `Custom`. Existing runtime namespace markers may keep `03_advanced-settings` or shell `03_advanced-setting` for compatibility, but users should not see `Advanced` as the panel label.

Custom controls use one outer card per setting, inline CSS dropdowns instead of browser-native select popups, simple radio inputs, simple checkboxes, and typed placeholders such as CIDR slash notation, numeric examples, or quantity examples as appropriate.

`05_result-summary` follows the same rule: use one canonical source section and select family-specific meaning from the workspace manifest. Do not create separate base sections just to change score labels, cost labels, scan status copy, shell mode copy, assessment metric labels, or ring-versus-command visual emphasis.

Result summary layout keeps the header at the top, the primary result on the left, and the summary on the right. Ring cards inherit family colors, metric cards use icon badges and accent bars, and compact text results should describe mode or outcome instead of repeating a full generated command.

`06_output-toolbar` follows the same rule: use one canonical source section and select family-specific sort options and action labels from the workspace manifest. Do not create separate base sections just to change PNG versus PDF export, CSV versus SVG download, or inventory versus finding sort labels.

Output toolbars must start with `ID` as the visible and hidden default sort value, use a custom CSS dropdown whose menu matches the closed summary width, keep the dropdown above nearby cards, and show exactly five compact square-corner icon buttons on the right when desktop space allows.

`07_table-output` follows the same rule: use one canonical source section and select family-specific tab labels, table headings, notes, empty states, and icons from the workspace manifest. Do not create separate base sections just to change breakdown, inventory, findings, operations, assumptions, warnings, or JSON wording.

Table output must have at least five top-level tabs, start with a table tab, and end with JSON. The tab section must align right on desktop. The fifth tab/panel is an optional extra placeholder section for families that need one more output area before JSON. Every tab button must be rounded and icon-bearing. Each panel must include a title inside the section card before the output. Table columns should stay compact and meaningful: the first column must be centered `#`, middle columns use logical start alignment, and the last column must be a centered sticky row action with an icon-only copy button whenever a multi-column table scrolls horizontally. Generated row text should be clamped to 2-3 lines.

`08_json-restore` follows the same rule: use one canonical source section and select family-specific JSON title, helper, and empty text from the workspace manifest. Do not create separate base sections just to change estimate state, scan evidence, command state, diagram model, or assessment filter wording.

JSON restore frames must keep JSON output inside a framed card, preserve a visible JSON title, include a hidden-by-default restore status slot, include an `application/json` file input for real restore plumbing, keep empty JSON state explicit, and leave schema validation plus state mutation to the family or final tool.

## Non-Goals

`_base` does not own:

- family state contracts
- family-specific output tab meaning and full table column schemas
- family-specific JSON schemas and restore mapping
- formulas, parsers, scanners, diagram models, or command builders
- provider/domain labels
- final tool runtime imports
- catalogue family labels

## Composition Rule

Apply `_base` only as source material when creating or refreshing a family baseline.

Family workspace manifests may reference `_base` sections through `workspace_namespaces`, for example `family._base.workspace.01_input-brief`, alongside family-owned namespaces. This declares source composition for factory and parity tooling; it does not make final tools import `_base` at runtime.

Do not make final tool packages import `_base` files at runtime unless a deliberate shared include system is created and validated.

## Section Bundle Contract

Every base workspace section should keep the same bundle shape used by active families:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

## Placeholder Contract

Base sections use placeholders so families can adapt labels and namespaces safely:

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__TOOL_NAME__`

Section-specific placeholders are documented in each section README.
