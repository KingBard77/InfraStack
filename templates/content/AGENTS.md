# Content Agent Map

This file is the local map for `templates/content/`.

Use it before editing content templates, family baselines, shared scaffold files, or final tool packages.

## Directory Roles

- `main/`: shared scaffold and reusable content section structure.
- `family/`: reusable family baselines and family workspace grammar.
- `tools/`: final runtime tool packages.
- `content.html.twig`: content entry template; do not use it as a family or tool package source.

## Read Order

1. Project root `AGENTS.md`.
2. `codex/PROMPT.md`, `codex/DESIGN.md`, `codex/COLOR.md`, `codex/CONTENT.md`, `codex/TOOL.md`, and `codex/FAMILY.md` as needed.
3. This file.
4. The nearest local `AGENTS.md` in `main/`, `family/`, or `tools/`.
5. The family `README.md` and `manifest.yml` when a family baseline applies.

## Manifest Rule

Use `AGENTS.md` for instructions and decisions.

Use `manifest.yml` for structured baseline metadata that code, scaffolds, validation, or future automation may parse.

If both need the same idea, keep the short rule in `AGENTS.md` and the exact structured value in `manifest.yml`.

For final tool packages, `templates/content/tools/manifest.yml` is the runtime taxonomy source for groups, categories, and family labels.

## Redundancy Rule

Do not repeat full family baseline rules in root guidance files.

For baseline changes:

1. Update the nearest local `AGENTS.md`.
2. Update the matching `manifest.yml` when structured values changed.
3. Update parent `AGENTS.md` files only if the navigation map changes.
4. Update root `codex/` guidance only for cross-cutting platform rules.

For namespace, baseline, or batch content changes, final reporting must say:

- how many final tool packages were updated as `X / total`
- which final tool packages were not updated and why
- whether `templates/content/family/` sources changed
- whether `templates/content/main/` sources changed
- whether runtime package files under `templates/content/tools/` changed

## Citation Source

Citation and References behavior is a cross-cutting content rule. Use `codex/CONTENT.md` for the rule and `templates/content/main/sections/content/10_references/` for the reusable section source. Final tools must adapt the sources locally and keep every cited claim valid. Complete factual content delivery includes `10_references`. `Technical Details` must be 1500+ words for substantial tools, needs at least two official or source-of-truth citations when it makes technical claims, and should use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should have at least three real references. Behavior and trust claims must match actual code and validation.

## Support Typography Source

Support markdown typography is also cross-cutting. Use `codex/CONTENT.md` as the source of truth for bullet alignment, markdown-card list inheritance, and inline code chip sizing. Apply the rule to shared main sections, family sources, final tool CSS, and compiled runtime assets when those surfaces are changed.
