# Base Family Workspace Foundation

## Purpose

This workspace defines reusable section source for shared InfraStack workspace structure.

It exists to reduce duplicate shell, input, panel, and responsive layout code across active families while keeping each family responsible for its own model and output behavior.

## Current Sections

```text
00_shell/
01_input-brief/
02_basic-settings/
03_custom-settings/
05_result-summary/
06_output-toolbar/
07_table-output/
08_json-restore/
```

## Use Rule

Use these sections as composition source for a family baseline.

Do not import them directly from final tool packages.

## Typography Rule

Workspace sections inherit `Nunito` through `--heading-font` for headings and `Roboto` through `--default-font` for body, label, control, table, and UI text. Do not introduce other proportional font families in section CSS, demos, or generated runtime copies.

## Composition Order

Recommended family composition starts with:

1. `00_shell` for the workspace frame and neutral panel rhythm.
2. `01_input-brief` for the primary model input.
3. `02_basic-settings` for high-frequency controls that should appear before advanced configuration.
4. `03_custom-settings` for compact optional controls that should sit behind a visible `Custom` disclosure.
5. `05_result-summary` for generated result cards, left primary result, right summary chips, metric cards, and optional ring/status visuals.
6. `06_output-toolbar` for ID-first sorting and five icon-ready output actions.
7. `07_table-output` for tabbed detail output, table-first sections, JSON-last sections, table frames, empty rows, and icon-only row actions.
8. `08_json-restore` for JSON output, import input, restore status, empty state, and readable code frame.
9. Family-owned sections for inspector, visual/result surfaces, output contracts, export, and restore.

## Boundary

The base workspace can define how a tab shell, input row, panel, button row, or empty state looks.

It can define shared result summary card rhythm, but it must not define what a score means, what formulas calculate, what scan probes prove, what command is generated, what columns exist, what export formats are valid, or what JSON restore payload a family owns.

It can define shared output toolbar shape, but it must not define which export payloads are valid, how sort state mutates generated rows, or how JSON restore is validated.

It can define shared table-output shell shape, but it must not define generated row meaning, formulas, scanner evidence, command semantics, exact export payloads, or restore schemas.

It can define shared JSON restore frame shape, but it must not define JSON schemas, import validation, restore mapping, or state mutation.
