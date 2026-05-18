# Tools Agent Map

This file governs final runtime tool packages under `templates/content/tools/`.

## Runtime Taxonomy

`manifest.yml` in this directory owns runtime groups, category labels, category-to-group mapping, family labels, and ordering.

Tool `meta.yml` files must include `group` and `family` values that match this manifest. Do not move existing package paths to match group labels.

Use `codex/bin/_tool.sh validate <tool-path>` after package or metadata changes.

When a family baseline is applied or reapplied, validation must also include the matching family parity gate against the final runtime package. `_tool.sh validate`, namespace markers, and `audit-namespace` output are not enough unless they explicitly include that family gate.

## Package Rule

Final tools live at:

```text
templates/content/tools/<category>/<tool-slug>/
```

Complete tool packages normally include:

```text
assets/bin/model-core.js
assets/icon/
assets/img/post.html.twig
card.yml
content.md
custom.css
custom.js
meta.yml
tool.html.twig
```

Do not create root-level `post.html.twig`.

New packages can start from `templates/content/main/scaffold/assets/`, but final tools own the copied `assets/bin/`, `assets/icon/`, and `assets/img/` files. Do not reference `templates/content/main/tool-post-visual.html.twig`; it has been removed.

Do not omit required files unless the user explicitly asked for a partial scaffold.

## Header Markers

Use required first-line markers:

- `content.md`: `[//]: # (content.md)`
- `card.yml`: `# card.yml`
- `custom.css`: `/* custom.css */`
- `custom.js`: `// custom.js`
- `meta.yml`: `# meta.yml`
- `tool.html.twig`: `{# tool.html.twig #}`

## Local Ownership

- Keep one tool-local namespace root, such as `.<tool-slug>-tool`.
- Keep CSS scoped under the tool root.
- Keep JavaScript DOM references aligned with Twig IDs.
- Keep state normalized when the workspace has persistent controls, selected items, layout edits, exports, or restore.
- Keep visible labels, metadata, examples, icons, category/provider token lineage, and support content native to the provider or domain.
- Keep support markdown typography aligned with `codex/CONTENT.md`: bullets are left-aligned, markdown-card list items inherit parent list size and line height, and inline code chips use `0.875em`.

## Family Use

Family sources guide implementation.

They are not runtime dependencies unless a shared include system is explicitly implemented and documented.

Before building or revising a family-based tool, read:

1. `templates/content/AGENTS.md`
2. `templates/content/family/AGENTS.md`
3. the matching family `AGENTS.md`
4. the matching family `manifest.yml`
5. relevant workspace section sources

## Validation

Validate the surface changed.

Use syntax checks, duplicate ID scans, DOM reference review, model-core tests, JSON import/export restore checks, and Browser Use checks when the changed behavior is browser-facing.

Do not claim browser verification unless it actually ran.
