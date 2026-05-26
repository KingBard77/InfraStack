# Calculate Family Contract

This file is the source of truth for calculate-family baseline guidance.

## Source Files

- `README.md`: family explanation and final package expectations.
- `manifest.yml`: structured baseline metadata and validation rules.
- `source/`: full copied AWS Cost Calculator source snapshot for traceability only. Do not audit this as active source.
- `workspace/README.md`: workspace grammar.
- `workspace/manifest.yml`: structured workspace section metadata.
- `templates/content/factory/phase-1/_base/workspace/`: common shell, input, settings, summary, toolbar, table, and JSON restore section sources.
- `workspace/04_visual-contract/`: optional calculate visual and model contract for metric cards, driver cards, formula rows, rings, charts, and normalized visual result primitives.
- `workspace/04_selected-item/`: optional selected line item or component inspector.
- `templates/content/factory/phase-2/_content/sections/10_references/`: shared source-backed citation and References section source when final content cites sources.

## Reference Set

Working reference implementations:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

Use AWS for the primary result grammar, table/export rhythm, JSON restore behavior, and support-content structure. Use Azure and IBM Cloud as provider-adaptation references for namespace replacement, service catalog substitution, category/provider token application, chart palette replacement, and support-copy cleanup.

Do not copy AWS, Azure, or IBM pricing, provider wording, examples, category/provider token lineage, or assumptions into unrelated calculators.

## Current Baseline

- Estimate label, scenario, or brief starts the model.
- Preset and basic settings load common shapes.
- Service, component, or workload cards expose visible inputs.
- Advanced assumptions, rates, overrides, and buffers stay editable.
- Visual result contracts normalize metric cards, driver cards, formula rows, rings, charts, and result tones when the calculator has reusable visual output.
- Result summary uses a two-column rhythm where the primary computed answer stays prominent.
- Output toolbar contains Sort plus export/copy/import actions.
- Stable line items default to `ID` sorting.
- Result tabs expose breakdown, mix, assumptions, recommendations, and JSON when implemented.
- JSON output lives in a styled panel.
- JSON import is shown only when restore validation is implemented.
- Example prompt terminal titles stay centered and title case, such as `AWS Cost Prompt`.
- Source-backed citations use `templates/content/factory/phase-2/_content/sections/10_references/` and link each in-text citation to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Tool behavior and trust claims must match implemented code and validation.

## Runtime Baseline

When a calculate tool is declared the baseline, extract its stabilized calculate-specific markup, CSS, JavaScript, and model contracts into the matching section-owned files:

```text
templates/content/factory/phase-1/_family/calculate/source/
templates/content/factory/phase-1/_family/calculate/workspace/<section>/page.html.twig
templates/content/factory/phase-1/_family/calculate/workspace/<section>/section.css
templates/content/factory/phase-1/_family/calculate/workspace/<section>/section.js
templates/content/factory/phase-1/_family/calculate/workspace/<section>/demo.html
```

Common workspace shape is composed from `_base/workspace` by `workspace/manifest.yml` `workspace_namespaces`. Do not recreate duplicate calculate copies of `_base` sections.

The full copied source snapshot is reference-only. Do not audit this as active source. The current reference set remains:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

Do not keep root workspace `custom.css`, `custom.js`, or `demo.html.twig` files for the calculate family baseline. For new provider or domain calculators, adapt section sources using the three-tool reference set and verify that copied provider terms and category/provider lineage tokens are replaced.

Keep the calculate-owned workspace section bundle shape:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

`workspace/04_visual-contract/` also carries `manifest.yml` and `model-core.js` because it defines a provider-neutral calculate model contract, not only a markup/CSS/JS fragment. Use it when a calculator needs a reusable visual result surface. Omit it for pure form-and-table calculators and record that omission as accepted divergence.

Standalone `demo.html` files own demo chrome separately from extracted calculator section source. Include any icon stylesheet needed by the demo, render `demo-title` with `demo-title-icon` and `demo-title-text`, and use a calculate-family placeholder icon such as `bi bi-calculator`.

## Final Tool Rule

The family baseline is not a runtime package.

Copy or adapt the source snapshot, section-owned baseline, and relevant reference patterns into the final tool-local files, keep formulas domain-native, and keep visible totals, tables, JSON, and restore data driven from the same normalized model.

Do not put selected-item editing, details panel behavior, or runtime inspector controls inside `04_visual-contract`. Keep that behavior in `04_selected-item` or a future dedicated inspector section.
