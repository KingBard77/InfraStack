# InfraStack Content Main Map

This file is the local map for `templates/content/` and the global color reference for content, family, and tool packages.

## Directory Roles

- `main/`: shared scaffold and reusable support-content section structure.
- `family/`: reusable family baselines and family workspace grammar.
- `tools/`: final runtime tool packages.
- `content.html.twig`: content entry template; do not use it as a family or tool package source.

## Read Order

1. Project root `AGENTS.md`.
2. `codex/PROMPT.md` and `codex/DESIGN.md`.
3. `templates/content/MAIN.md`.
4. The nearest local role file: `main/MAIN.md`, `family/FAMILY.md`, `tools/TOOLS.md`, or `family/<family>/FAMILY.md`.
5. Matching `manifest.yml` files when structured metadata matters.

## Manifest Rule

Use role markdown files for instructions and decisions. Use `manifest.yml` for structured baseline metadata that code, scaffolds, validation, or future automation may parse.

If both need the same idea, keep the short rule in the role markdown and the exact structured value in `manifest.yml`.

For final tool packages, `templates/content/tools/manifest.yml` is the runtime taxonomy source for groups, categories, and family labels.

## Redundancy Rule

Do not repeat full family baseline rules in root guidance files.

For baseline changes:

1. Update the nearest local role markdown file.
2. Update the matching `manifest.yml` when structured values changed.
3. Update parent role files only if the navigation map changes.
4. Update `codex/PROMPT.md` or `codex/DESIGN.md` only for cross-cutting build or workspace rules.

For namespace, baseline, or batch content changes, final reporting must say:

- how many final tool packages were updated as `X / total`
- which final tool packages were not updated and why
- whether `templates/content/family/` sources changed
- whether `templates/content/main/` sources changed
- whether runtime package files under `templates/content/tools/` changed

---

# InfraStack Typography Reference System

InfraStack uses exactly two proportional runtime fonts:

- `Nunito` for headings, page titles, card titles, and section headings through `--heading-font`
- `Roboto` for body copy, navigation, labels, controls, tables, tool UI text, and support text through `--default-font`

`--page-font` and `--nav-font` must resolve to `--default-font`. Do not add Rubik, Poppins, Inter, or other proportional font families to runtime CSS, generated tool packages, shared content sections, family sources, final tool CSS, or Google Fonts links. Monospace stacks are allowed only for code, terminal, command, JSON, and preformatted output.

---

# InfraStack Color Reference System

## Purpose

InfraStack color is semantic infrastructure, not decoration.

This file owns the global color philosophy, approved lineage registry, platform tokens, state tokens, and governance. Family-specific visual details belong in the matching family contract and workspace section source.

## DevOps Task Recording

Color standard, token, lineage, or broad visual-weight changes must use the current DevOps task templates before implementation or validation continues. Use `codex/bin/_init.sh <task_name> --kind <kind>` and choose `platform` for standard changes, `revise` for visible tool/package color changes, `audit` for read-only review, or `validation` for check-only work.

Use `context/validation-plan.md` for planned checks and `evidence/` for proof of checks that actually ran.

## Master Rule

```text
100% standardization
20% visible color
```

The product should feel calm, operational, deterministic, scalable, and enterprise-grade. Large surfaces stay neutral. Category, provider, tool, and state colors appear only where they add recognition, meaning, or action priority.

## Hierarchy

```text
Platform -> Family -> Category -> Provider -> Tool -> State
```

Family controls behavior and layout grammar. Category and provider control recognition. Tool color is a small local variation inside the approved lineage. State color is universal and provider-independent.

## Visual Weight

| Layer | Coverage rule | Visual weight |
| --- | --- | --- |
| Platform neutral base | 100% of pages | 70-80% |
| Category/provider identity | 100% of tools | 15-25% |
| Tool-specific variation | 100% of tools | 5-10% |
| Universal state colors | 100% of states | only when needed |

## Platform Tokens

```css
:root {
    --platform-bg: #0f172a;
    --platform-surface: #111827;
    --platform-border: #1f2937;
    --platform-text: #e5e7eb;
    --platform-text-muted: #94a3b8;
    --platform-card: #1e293b;
    --platform-card-hover: #273449;
}
```

## Provider Lineage

| Provider | Primary | Secondary |
| --- | --- | --- |
| AWS | `#7C3AED` | `#F97316` |
| Azure | `#2563EB` | `#06B6D4` |
| GCP | `#4285F4` | `#34A853` |
| IBM Cloud | `#2563EB` | `#0F766E` |
| Oracle | `#DC2626` | `#7F1D1D` |
| Huawei Cloud | `#C7000B` | `#111827` |
| TM Cloud Alpha | `#06B6D4` | `#10B981` |

## Category Lineage

| Category | Primary | Secondary |
| --- | --- | --- |
| Security | `#16A34A` | `#166534` |
| Shell | `#0F766E` | `#14B8A6` |
| CIS / Assessment | `#475569` | `#64748B` |
| Dashboard | `#4F46E5` | `#7C3AED` |
| Analyzer | `#6B4F3A` | `#4338CA` |
| Planner | `#7C3AED` | `#6D28D9` |
| Table | `#475569` | `#94A3B8` |
| Network | `#06B6D4` | `#10B981` |
| Infrastructure | `#06B6D4` | `#10B981` |
| AI | `#8B5CF6` | `#D946EF` |
| Calculate | `#F97316` | `#F59E0B` |

`Calculate` is an operational lineage for non-provider calculation domains. Provider-specific calculators still trace to their provider lineage unless the family contract says otherwise.

## State Tokens

```css
:root {
    --state-success: #16A34A;
    --state-warning: #F59E0B;
    --state-error: #DC2626;
    --state-info: #2563EB;
}
```

Always combine state color with text, icons, borders, shape, or another non-color signal. Never rely on hue alone.

## Token Flow

```text
Primitive tokens -> Category/provider tokens -> Tool tokens -> Component tokens
```

Tool-local CSS may use resolved hex values only when the rendering path cannot consume CSS variables. Every resolved value must trace back to this registry or to a documented semantic state.

## Governance

Do not allow:

- random tool colors
- unmanaged gradients
- category drift
- provider leakage
- rainbow dashboards
- uncontrolled saturation
- decorative color with no semantic purpose

Family contracts may define how color appears in that family, but they must not invent a separate registry.
