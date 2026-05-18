---
name: infrastack-project
description: Work with InfraStack Symfony, Twig, Asset Mapper tool packages, DevOps task records, family baselines, metadata, state, export, restore, scoped CSS, JavaScript, and validation.
---

# InfraStack Project Skill

Use this skill inside the InfraStack repository for interactive tools, tool packages, project guidance, family baselines, task records, metadata, support content, visual workspaces, and model-core validation.

## Start

- Run `git status --short`; the worktree is often dirty. Treat unrelated edits, deletes, and rename states as user-owned.
- Create or resume a DevOps task record before implementation, audit, or validation:

```bash
codex/bin/_init.sh <action_first_task_name> --kind tool|baseline|audit|fix|platform|general
```

- If `_init.sh` fails with `sed: RE error: illegal byte sequence`, retry with:

```bash
LC_ALL=C LANG=C LC_CTYPE=C codex/bin/_init.sh <task_name> --kind <kind>
```

- For resumed work, read `tracking/status.md`, `tracking/session-log.md`, and `tracking/open-questions.md`.
- Before tool work, read `AGENTS.md`, `codex/PROMPT.md`, and the narrow contracts needed for the surface: `codex/DESIGN.md`, `codex/COLOR.md`, `codex/CONTENT.md`, `codex/TOOL.md`, `codex/FAMILY.md`.
- For paths under `templates/content/`, also read `templates/content/AGENTS.md`, `templates/content/tools/AGENTS.md`, nearest local `AGENTS.md`, and the matching `manifest.yml`.
- Before implementation, name the dominant family and the family source checked. If no shared source exists, state that the tool uses a tool-local pattern.

## Families And Naming

- Runtime taxonomy lives in `templates/content/tools/manifest.yml`; `meta.yml` must include matching `group` and `family`.
- Active family baselines: `architecture`, `assessment`, `calculate`, `scanning`, `shell`.
- Use a baseline only when `templates/content/family/<family>/README.md` and `manifest.yml` exist.
- Architecture replaced the old visualizer language. Do not use `templates/content/family/visualizer/`.
- Final runtime packages stay category-based: `templates/content/tools/<category>/<tool-slug>/`.
- New tool canonical identity is verb-led: `<verb>_<content>_<group>`, with kebab-case folder slugs.
- Preferred family verbs: `architecture`, `calculate`, `scan`, `generate`, `analyze`, `check`, `plan`, `map`, `compare`, `monitor`, `summarize`.
- Current reference packages:

```text
templates/content/tools/aws/architecture-vpc-aws/
templates/content/tools/azure/architecture-vnet-azure/
templates/content/tools/gcp/architecture-vpc-gcp/
templates/content/tools/aws/calculate-cost-aws/
templates/content/tools/azure/calculate-cost-azure/
templates/content/tools/ibm/calculate-cost-ibm/
templates/content/tools/cis/assess-ubuntu-2204-cis/
templates/content/tools/security/scan-web-security/
```

- Old slugs such as `aws-vpc-architecture`, `azure-vnet-architecture`, and `gcp-vpc-topology` are stale unless a migration task is explicitly in scope.

## Tool Package

- Complete tools normally own:

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

- Required first-line markers:

```text
content.md: [//]: # (content.md)
card.yml: # card.yml
custom.css: /* custom.css */
custom.js: // custom.js
meta.yml: # meta.yml
tool.html.twig: {# tool.html.twig #}
```

- Use `templates/content/main/scaffold/assets/` for default asset placeholders.
- Do not create root-level `post.html.twig`; use `assets/img/post.html.twig`.
- Do not reference removed root fallback `templates/content/main/tool-post-visual.html.twig`.
- Family workspace sections use section bundles: `README.md`, `demo.html`, `page.html.twig`, `section.css`, `section.js`.
- Final packages do not automatically load main section CSS/JS. Copy or adapt the full content, selector, JavaScript, and visual contract into the tool package.
- Namespace copied/adapted source blocks only, using IDs such as `family.<family>.workspace.<section>` or `main.content.<section>`.

## Implementation Rules

- InfraStack is Symfony 8, Twig, attribute routes, Asset Mapper, plain JavaScript, and filesystem-driven tool packages.
- Build browser-first tools. Add backend code only under `src/Controller/Tools/<Category>/<Tool>/CustomController.php` when browser-owned behavior is not enough.
- `src/Service/ToolCatalogService.php` owns shared catalogue reads; controllers, sidebars, and listings should consume it instead of scanning files again.
- `codex/bin/_tool.sh` owns create, validate, namespace, and family parity entry points.
- Keep one normalized state model as the source of truth for controls, selected items, layout edits, connector edits, output tabs, exports, imports, and restore.
- Treat JSON import/export restore as first-class when state exists. Do not make restore depend on prompt replay.
- Keep CSS scoped under one tool namespace root.
- Preserve stable routes, slugs, IDs, classes, and exported JSON keys unless a deliberate migration is part of the task.
- Keep visible labels, examples, icons, content, metadata, and token lineage native to the provider or domain. Search for copied provider terms before closeout.
- Do not ship fake controls, fake exports, unresolved placeholders, stale copied content, broken assets, or unmanaged colors outside `codex/COLOR.md` lineage.
- `card_summary` is one concrete, domain-native sentence for the `/tools` card rhythm.
- `meta.intro` is folded YAML that renders as one justified detail-page paragraph.
- Do not claim compliance, security, reliability, production readiness, certification, current pricing, or browser verification without actual evidence.

## Preferred Commands

```bash
rg --files
rg '<term>' <path>
codex/bin/_tool.sh list-families
codex/bin/_tool.sh list-categories
codex/bin/_tool.sh validate templates/content/tools/<category>/<tool-slug>
codex/bin/_tool.sh family-parity validate-tools <family>
codex/bin/_tool.sh audit-namespace <namespace>
node --check templates/content/tools/<category>/<tool-slug>/custom.js
node --test tests/<target>.test.cjs
ruby -e 'require "yaml"; YAML.load_file(ARGV[0])' templates/content/tools/<category>/<tool-slug>/meta.yml
php -l src/Controller/Tools/<Category>/<Tool>/CustomController.php
```

- For VM-side Symfony, Twig, PHP, Composer, or cache checks:

```bash
ssh vm-host-infrastack
xxcd.iad.infrastack
xxcomposercache
```

- Only update mapped files under `public/assets/` when the runtime depends on them and the normal Asset Mapper build path is unavailable.

## Validation

- Validate the changed surface: YAML syntax, Twig IDs/includes/variables, CSS brace balance and overflow, JavaScript syntax and DOM references, PHP lint, model-core tests, and import/export restore checks when relevant.
- Use `codex/bin/_tool.sh validate <tool-path>` after package or metadata changes.
- When a family baseline is applied or reapplied, run the matching family parity gate against final runtime packages. Namespace markers and `_tool.sh validate` alone are not enough.
- Store task-local evidence under `codex/devops/tasks/processing/<task_name>/validation/`.
- Browser-facing checks must use Browser Use with `https://infrastack.my`.
- Do not use VM IPs, tunnels, local port forwarding, ad hoc PHP servers, local proxies, standalone Playwright MCP, or Chrome DevTools fallbacks for InfraStack browser validation unless the user explicitly approves that fallback.
- If Browser Use is unavailable, report the browser validation gap.
- For namespace, baseline, factory, or batch changes, closeout must include `X / total` coverage, not-applied paths and reasons, family/main/runtime sources changed, parity evidence, validation commands, and browser result or gap.
