# Family Agent Map

This file governs reusable family baselines under `templates/content/family/`.

Family sources guide composition. They do not replace final tool packages.

After a family baseline is promoted, that family source is the source of truth for future family application. Reapplying a family to existing tools requires structural, visual, and runtime parity with the family workspace source, proven against the final runtime packages. Namespace markers, source comments, copied support text, family demo screenshots, `_tool.sh audit-namespace`, or `_tool.sh validate` by itself do not count.

## Active Families

- `architecture/`: diagram, topology, flow, dependency, and editable visual workspace tools.
- `assessment/`: posture, readiness, compliance, risk, quality, maturity, and benchmark assessment tools.
- `calculate/`: cost, sizing, capacity, budget, and assumption-driven calculation tools.
- `scanning/`: target-driven scanners, bounded probes, evidence tables, export controls, and JSON restore boundaries.
- `shell/`: shell command generators, command composers, validators, explainers, and terminal workflow helpers.

## Family Rules

- Each active family should own `AGENTS.md`, `README.md`, `manifest.yml`, and `workspace/`.
- Family workspace sections belong under `templates/content/family/<family>/workspace/`.
- Shared content sections belong under `templates/content/main/sections/`.
- Do not create duplicated `sections/` folders inside family baselines.
- Do not make final tools depend on family files at runtime unless a shared include/import system is deliberately implemented.
- Final tools still live under `templates/content/tools/<category>/<tool-slug>/`.
- Prompt and command support examples inherit centered title-case terminal strip titles from the shared main content sections.
- Support markdown typography inherits the cross-family standard from `codex/CONTENT.md`: bullets stay left-aligned, markdown-card list items inherit parent list size and line height, and inline code chips use `0.875em`.

## Baseline Updates

When a user asks to baseline a family:

1. Create a `baseline` DevOps task.
2. Record the source tool package and target family.
3. Full-copy the source tool runtime files first into a family-local reference snapshot when that helps extraction.
4. Treat the full-copy snapshot as reference-only, not a runtime include.
5. Split stabilized workspace markup, CSS, and JavaScript into matching section-owned workspace files when the family has workspace section bundles.
6. Update the family-local `AGENTS.md` with the human/agent rule.
7. Update the family `manifest.yml` with structured metadata.
8. Update workspace section files and workspace manifests when the interaction grammar changed.
9. Record the reference tool path and section source rules in the family manifest.
10. Keep parent guidance files as pointers unless the rule applies across multiple families.

## Workspace Section Rule

Family workspace source should be section-owned when a family has reusable workspace section bundles.

Use this bundle shape for reusable workspace sections:

```text
templates/content/family/<family>/workspace/<section>/
├── README.md
├── demo.html
├── page.html.twig
├── section.css
└── section.js
```

`demo.html` is a standalone preview wrapper plus a section body. It must own demo-only chrome, including any icon stylesheet, `demo-title`, `demo-title-icon`, `demo-title-text`, and a family-appropriate placeholder icon. Do not copy that demo chrome into `page.html.twig`, final tool packages, or namespace-marked runtime blocks.

Do not keep root workspace `custom.css`, `custom.js`, or `demo.html.twig` snapshot files in section-owned family baselines unless the family has a documented shared runtime include system.

Reference snapshots may live under `templates/content/family/<family>/baseline/source/` during or after a baseline extraction task. They must contain full copied source files for traceability only, and final tools must not import from them at runtime.

Families that still use legacy root runtime snapshots must document that explicitly in their family-local `AGENTS.md`, `README.md`, and manifests until they are migrated.

Copy or adapt section files into the final tool-local `tool.html.twig`, `custom.css`, and `custom.js`. Final tools must not depend on family files at runtime.

When copied or adapted into a final tool, a family workspace section becomes a namespace source:

```text
family.<family>.workspace.<section>
```

Wrap only the generated/adapted block with matching `ns:start` and `ns:end` markers. Do not mark unrelated tool-local code.

Copy or adapt `assets/bin/model-core.js` when the family needs a reusable model-core reference. If the source tool has no model-core file, record that in the task validation notes.

When updating family workspace sources or applying a family namespace across tools, record:

- applied tools as `X / total` for that family
- skipped tools and why
- family files changed
- shared main files changed, if any
- runtime tool package files changed
- parity gate evidence for visible labels, control count/order, DOM hooks, CSS shape rules, JavaScript handlers, output tabs, exports, imports, and normalized state behavior
- validation and Browser Use gap, if browser checks could not run

## Provider And Domain Copy

Reference tools may define the original working grammar before promotion.

After promotion, use the family source for reapplication. Final tools must still adapt visible labels, metadata, examples, icons, category/provider token lineage, services, assumptions, command logic, and schema boundaries to the target provider or domain. Record every intentional divergence from family structure or runtime behavior.
