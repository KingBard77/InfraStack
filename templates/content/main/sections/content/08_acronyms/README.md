# Acronyms Markdown Section

## Purpose

Provides a short acronym or terminology reference for the domain.

## When to use

Use when the tool contains technical abbreviations that users may need to scan quickly.

This section is optional.

Choose either `08_acronyms` or `11_glossary` when useful; do not include both unless the tool has a clear, reviewed need for separate abbreviation and terminology references.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-acronyms`.

The section heading uses a left Bootstrap icon and a divider line.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-acronyms">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-type" aria-hidden="true"></i><span>Acronyms</span></h2>
  ...
</div>
```

Use a compact table when there are more than a few items.
Start with one explanation paragraph before the table, matching the same rhythm as `Prompt Tips`.

## Related CSS source files

- `section.css`

## Related JS helper files

None.

## Content guidance

Acronyms should be:

- domain-specific
- useful for reading the workspace
- short
- accurate

## Avoid list

- Do not create generic glossary filler.
- Do not define terms that do not appear in the tool.
- Do not copy vendor documentation.
- Do not overload this section with long explanations.

## Validation checklist

- Acronyms appear in the tool or content.
- Definitions are accurate and concise.
- The section is omitted if unnecessary.
- `11_glossary` is not also included unless a deliberate exception is recorded.
