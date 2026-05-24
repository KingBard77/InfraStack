# JSON Restore Workspace Section

## Purpose

Defines the shared JSON output, import input, and restore status frame for InfraStack family workspaces.

Use it after the tabular or structured output section when a generated result has an exportable JSON payload and a real import/restore path.

This section owns layout rhythm only. Families and final tools own JSON schema, payload construction, import validation, restore mapping, error messages, and state mutation.

## When To Use

Use when a family or final tool implements JSON output plus import or restore behavior.

Skip when JSON is display-only and no import or restore behavior exists. Do not show an import control without real restore plumbing.

## Compatibility

The canonical base source is `08_json-restore`.

Existing family sections may keep names such as `08_json-restore`, `09_result-table`, or `07_table` when compatibility requires it. When the same JSON output/import rhythm applies, use this source as the visual baseline.

## Required Placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOM_PREFIX__`
- `__JSON_RESTORE_ARIA_LABEL__`
- `__JSON_RESTORE_TITLE__`
- `__JSON_RESTORE_HELPER__`
- `__JSON_RESTORE_EMPTY_TEXT__`
- `__JSON_RESTORE_ACCEPT__`

## Expected DOM IDs

- `__DOM_PREFIX__JsonRestoreShell`
- `__DOM_PREFIX__JsonPanel`
- `__DOM_PREFIX__JsonOutput`
- `__DOM_PREFIX__ImportJson`
- `__DOM_PREFIX__JsonRestoreStatus`
- `__DOM_PREFIX__JsonRestoreEmpty`

Families should rename or replace these IDs with final runtime IDs during adaptation when existing stable IDs must be preserved.

## Expected Classes

- `.__PREFIX__-json-restore-shell`
- `.__PREFIX__-json-card`
- `.__PREFIX__-json-head`
- `.__PREFIX__-json-title-wrap`
- `.__PREFIX__-json-title`
- `.__PREFIX__-json-helper`
- `.__PREFIX__-json-status`
- `.__PREFIX__-json-output`
- `.__PREFIX__-json-empty`
- `.__PREFIX__-json-key`
- `.__PREFIX__-json-string`
- `.__PREFIX__-json-number`
- `.__PREFIX__-json-boolean`
- `.__PREFIX__-json-null`
- `.__PREFIX__-import-input`
- `.tool-json-panel`
- `.tool-json-head`
- `.tool-json-title`
- `.tool-json-output`

## Preference Selection

This section has one canonical source. Do not create separate base sections for architecture, calculate, shell, scanning, or assessment JSON restore frames.

Before applying the section, choose the matching preference from `../manifest.yml`.

| Family | JSON restore emphasis |
| --- | --- |
| `architecture` | diagram model state, layout overrides, selected items, output JSON |
| `calculate` | estimate assumptions, line items, totals, output JSON |
| `scanning` | target, options, evidence, findings, output JSON |
| `shell` | command target, options, generated command, output JSON |
| `assessment` | filters, selected control, visible rows, output JSON |
| fallback | generated state, output JSON, import status |

## Hard Rules

- JSON output must sit inside a framed card.
- The base JSON card must use a neutral `div` with `role="region"`, not a `section`, so global page-section CSS cannot add blank space.
- If a final compatibility adaptation must keep a `section` element, the JSON card must reset global `section` padding so the title row starts at the top of the frame.
- The JSON panel must have a visible title.
- The JSON payload must render in a scrollable `pre` or equivalent code frame.
- The import input must be an `application/json` file input.
- The import input may be visually hidden, but it must remain reachable by the implemented toolbar import button.
- A restore status or error slot must exist near the JSON frame, but it must be hidden by default.
- The status slot must not render as an outlined pill chip.
- Empty JSON state must be explicit and must not masquerade as a successful export.
- JSON syntax color highlighting must be applied by default.
- Raw text rendering may remain available as an explicit opt-out for final tool code.
- Imported JSON must be parsed and validated by the family or final tool before mutating state.
- Do not make restore depend on prompt replay alone.
- Mobile layout must keep JSON readable and horizontally scrollable.

## Validation Checklist

- JSON output element exists and is scoped.
- Import file input exists with JSON accept rules.
- Restore status element exists.
- Empty state element exists.
- JSON code frame is scrollable and preserves whitespace.
- JSON syntax highlighting classes have readable colors.
- Import handlers clear the file input after success or failure.
- Restore behavior validates schema before applying state in final runtime tools.
- No fake import, restore, copy, or download behavior is shown.

## Regression Guard

Do not reintroduce `<section class="__PREFIX__-json-card ...">` in the base source. InfraStack global page styles apply padding to all `section` elements, which previously created a blank band above the JSON title row in runtime tools.
