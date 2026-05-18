# Main Content Agent Map

This file governs shared content sources under `templates/content/main/`.

## Directory Roles

- `scaffold/`: reusable package skeleton source, including default asset placeholders under `scaffold/assets/`.
- `sections/`: reusable support-content section structure.

## Rules

- Keep `main/` generic and family-neutral.
- Do not place provider, product, or family-specific final copy here.
- Do not turn `main/` into a runtime package.
- Do not duplicate family workspace sections under `main/`.
- Final tools must still be generated under `templates/content/tools/<category>/<tool-slug>/`.

## Scaffold

The scaffold provides starter file shape, required markers, and default asset placeholders:

- `assets/bin/model-core.js`
- `assets/icon/placeholder.svg`
- `assets/img/post.html.twig`

It does not replace family baselines, model-core logic, tool-local styling, metadata, card copy, or validation.

Do not add or reference `templates/content/main/tool-post-visual.html.twig`; the shared post visual fallback now lives at `templates/content/main/scaffold/assets/img/post.html.twig`.

## Sections

Shared content sections define markdown/content rhythm.

Family or tool-specific content should adapt these sections instead of copying generic filler into final pages.

Applying a shared content section means applying the full section contract. Copy or adapt the section `content.md` markup, matching `section.css` visual behavior, and any section JavaScript helper when present into the final tool package. Replace placeholders and prefixes with the final tool namespace. Final tools do not automatically load shared section CSS, so the final `custom.css` must include the required card frame, section title icon, heading divider, typography, table, list, details, FAQ, copy-button, citation, prompt, or command selectors unless a documented shared include provides them.

Current section heading rhythm uses a left icon and a divider line for every support section. `Technical Details` keeps the main `h2` title unnumbered, but every `h3` subsection label inside it must visibly start with `1.`, `2.`, `3.`, and so on, with visible separator lines after the first numbered block. Prompt Tips, How To Use, and Export Notes accordion rows use left icon chips with clear spacing before the row text. FAQ rows stay text-only. How To Use, FAQ, and References should include a short explanatory paragraph before their main row or table content.

Complete content delivery uses these mandatory support sections: `01_overview`, `02_technical-details`, `04_tips-prompts`, `05_how-to-use`, `06_export-notes`, `07_faq`, and `10_references`.

Choose exactly one normal example section: use `03_example-prompts` for architecture-family, prompt-driven, or preset-brief examples; use `09_example-commands` for shell, command-generator, runbook, scanner, or assessment examples that users copy as literal terminal commands.

Prompt and command terminal strip titles must be centered title case, not all caps.

Choose `08_acronyms` only for abbreviation expansion tables. Choose `11_glossary` only for broader domain, command, or workflow terminology. Do not include both unless a deliberate exception is recorded.

Use `10_references` for complete factual content delivery and when a tool page needs citations. Citations must be valid, source-backed, and linked from the in-text citation to the matching row in the References table. `Technical Details` must be 1500+ words for substantial tools, needs at least two official or source-of-truth citations when it makes technical claims, and should use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should have at least three real references. Vary source types only when those sources directly support the cited claim.

Template validation must check the final tool package, not only this source directory: namespace markers, unresolved placeholders, `custom.css` selectors for section card frames, section title icons, heading divider lines, required Prompt Tips, How To Use, and Export Notes row icons, Technical Details subsection separators, table/list/code/details/FAQ/copy/citation styling, CSS brace balance, JavaScript copy hooks when present, and Browser Use rendering when available.

Update `templates/content/main/sections/manifest.yml` when section inventory or structured metadata changes.
