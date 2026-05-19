# Calculate Family Contract

This file is the source of truth for calculate-family baseline guidance.

## Source Files

- `README.md`: family explanation and final package expectations.
- `manifest.yml`: structured baseline metadata and validation rules.
- `baseline/source/`: full copied AWS Cost Calculator source snapshot for traceability only.
- `workspace/README.md`: workspace grammar.
- `workspace/manifest.yml`: structured workspace section metadata.
- `workspace/01_input-brief/` through `workspace/08_json-restore/`: reusable section sources.
- `templates/content/main/sections/content/10_references/`: shared source-backed citation and References section source when final content cites sources.

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
- Result summary uses a two-column rhythm where the primary computed answer stays prominent.
- Output toolbar contains Sort plus export/copy/import actions.
- Stable line items default to `ID` sorting.
- Result tabs expose breakdown, mix, assumptions, recommendations, and JSON when implemented.
- JSON output lives in a styled panel.
- JSON import is shown only when restore validation is implemented.
- Example prompt terminal titles stay centered and title case, such as `AWS Cost Prompt`.
- Source-backed citations use `templates/content/main/sections/content/10_references/` and link each in-text citation to its matching References row. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references. Tool behavior and trust claims must match implemented code and validation.

## Runtime Baseline

When a calculate tool is declared the baseline, extract its stabilized markup, CSS, and JavaScript into the matching section-owned files:

```text
templates/content/family/calculate/baseline/source/
templates/content/family/calculate/workspace/<section>/page.html.twig
templates/content/family/calculate/workspace/<section>/section.css
templates/content/family/calculate/workspace/<section>/section.js
templates/content/family/calculate/workspace/<section>/demo.html
```

The full copied source snapshot is reference-only. The current reference set remains:

```text
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
```

Do not keep root workspace `custom.css`, `custom.js`, or `demo.html.twig` files for the calculate family baseline. For new provider or domain calculators, adapt section sources using the three-tool reference set and verify that copied provider terms and category/provider lineage tokens are replaced.

Keep the workspace section bundle shape:

```text
README.md
demo.html
page.html.twig
section.css
section.js
```

Standalone `demo.html` files own demo chrome separately from extracted calculator section source. Include any icon stylesheet needed by the demo, render `demo-title` with `demo-title-icon` and `demo-title-text`, and use a calculate-family placeholder icon such as `bi bi-calculator`.

## Final Tool Rule

The family baseline is not a runtime package.

Copy or adapt the source snapshot, section-owned baseline, and relevant reference patterns into the final tool-local files, keep formulas domain-native, and keep visible totals, tables, JSON, and restore data driven from the same normalized model.
