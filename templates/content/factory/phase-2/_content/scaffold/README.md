# InfraStack Main Scaffold

## Purpose

This scaffold is the shared source for building InfraStack tool packages and support content.

It defines the reusable package skeleton, shared content section rhythm, and adaptation rules used before a final tool is copied into:

```text
templates/content/tools/<category>/<tool-slug>/
```

Families describe behavior.
Family `workspace/` folders describe workspace grammar.
The main scaffold owns the reusable tool package skeleton.
`templates/content/factory/phase-2/_content/sections/` owns reusable content section delivery.
Final tools own runtime files.

## Structure

```text
templates/content/factory/phase-2/_content/scaffold/
├── assets/
│   ├── bin/
│   │   └── model-core.js
│   ├── icon/
│   │   └── placeholder.svg
│   └── img/
│       └── post.html.twig
├── card.yml
├── content.md
├── meta.yml
├── README.md
└── tool.html.twig
```

The `assets/` files are scaffold defaults. Generated tools copy these into their own package and then replace or adapt them with tool-local model logic, icons, and post visuals.

`assets/img/post.html.twig` is also the platform fallback visual source when a tool does not yet have a tool-local post visual. Do not recreate the removed root-level shared `tool-post-visual.html.twig` fallback.

## Section Rule

Reusable section folders live here:

```text
templates/content/factory/phase-2/_content/sections/
```

`templates/content/factory/phase-2/_content/sections/` owns shared content sections.
Family `workspace/` folders own family-specific workspace sections.

Do not create duplicated `sections/` folders under `templates/content/factory/phase-1/_family/<family>/`.

Family folders should keep:

- `README.md`
- `manifest.yml`
- `workspace/`
- family-specific behavior rules
- family-specific workflow, state, export, and validation expectations

## Adaptation Rule

When creating a tool:

1. Read the family README and manifest.
2. Read the family `workspace/README.md` and `workspace/manifest.yml` when present.
3. Read this scaffold README and `templates/content/factory/phase-2/_content/sections/manifest.yml`.
4. Adapt the shared content sections and family workspace sections to the tool family.
5. Apply the full section contract into the final tool package: section `content.md` markup, matching `section.css` visual behavior, and any section JavaScript helper when present.
6. Translate visible labels, examples, controls, icons, outputs, scores, and export wording to the provider or domain.
7. Copy or implement the final runtime files under `templates/content/tools/<category>/<tool-slug>/`.

Complete content delivery uses these mandatory support sections: `01_overview`, `02_technical-details`, `04_tips-prompts`, `05_how-to-use`, `06_export-notes`, `07_faq`, and `10_references`.

Choose exactly one normal example section. Use `03_example-prompts` for architecture, prompt-driven, and preset-brief examples. Use `09_example-commands` for literal command examples such as wget-style shell workflows.

Choose `08_acronyms` only for abbreviation expansion tables. Choose `11_glossary` only for broader domain, command, or workflow terminology. Do not include both unless a deliberate exception is recorded.

Prompt and command terminal strip titles should be centered title case, for example `Scaffold Prompt` or `Scaffold Command`.

Use `10_references` for complete factual content delivery and when the tool page includes citations. In-text citations must be written into the actual content as narrative source-backed copy, such as `Author (Year) says...`, and each citation must link to its matching References table row. Replace all scaffold source placeholders with verified sources that directly support the cited sentence. Substantial `Technical Details` sections must be 1500+ words, cite at least two official or source-of-truth websites or docs when they make technical claims, and use structured review aids such as bullets or tables when they clarify behavior. Factual `content.md` should carry at least three real references.

Support markdown typography follows `templates/content/factory/phase-2/_content/MAIN.md`. Reusable section CSS and final tool CSS must keep bullets left-aligned with normal word spacing, make markdown-card list items inherit their parent list font size and line height, and render inline code chips at `0.875em`.

Scaffolded packages must keep the approved two-font system: `Nunito` through `--heading-font` for headings and titles, and `Roboto` through `--default-font` for body, navigation, labels, controls, tables, tool UI text, and support copy. Do not introduce any other proportional font family in generated runtime files.

Final tools do not automatically load shared section CSS from this scaffold. If a content section is applied, the final tool `custom.css` must preserve the template's card frame, heading divider line, typography, table, list, details, FAQ, copy-button, citation, prompt, and command selectors used by that section. Validate those selectors in the final package before calling the template applied.

Do not ship generic scaffold copy as final tool copy.
Do not make the scaffold a hidden runtime dependency.

## Card Copy Baseline

When replacing `__CARD_SUMMARY__`, write the final `card_summary` as the visible listing-card intro. It must be one concrete, domain-native sentence that fits the normal `/tools` three-line rhythm, does not show visible ellipsis clipping, and still reads naturally in the justified `.tool-card-summary` surface.

When replacing `__GRADIENT_START__` and `__GRADIENT_END__`, use resolved values from `templates/content/MAIN.md`. Do not introduce arbitrary gradients in scaffolded `card.yml` files.

## Intro Copy Baseline

When replacing `__INTRO_LINE_1__`, `__INTRO_LINE_2__`, and `__INTRO_LINE_3__`, keep `intro` as folded YAML so the detail page renders one paragraph. The three source lines are only for editing balance. For a three-line desktop rhythm, use the character-length guidance in `templates/content/factory/phase-2/_content/MAIN.md` and verify the rendered page when the visual line count matters.

## Metadata Tag Baseline

Every complete tool `meta.yml` must use exactly three tags.

Use this order:

1. Provider, category, or ecosystem.
2. Primary subject or command.
3. Family, intent, or strongest search classifier.
