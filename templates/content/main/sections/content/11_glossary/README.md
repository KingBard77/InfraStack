# Glossary Markdown Section

## Purpose

Provides a short terminology reference for domain terms that are not strictly acronyms.

## When to use

Use when the tool contains technical terms, command concepts, platform words, or workflow vocabulary that users may need to scan quickly.

This section is optional. Choose either `08_acronyms` or `11_glossary` when useful; do not include both unless the tool has a clear, reviewed need for separate abbreviation and terminology references.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-glossary`.

The section heading uses a left Bootstrap icon and a divider line.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-glossary">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-book" aria-hidden="true"></i><span>Glossary</span></h2>
  <p>Use this glossary to define technical terms and explain why each term matters in the current tool workflow.</p>
</div>
```

Use a compact table when there are more than a few items.
Start with one explanation paragraph before the table, matching the same rhythm as `Prompt Tips`.

## Related CSS source files

- `section.css`

## Related JS helper files

None.

## Content guidance

Glossary terms should be:

- domain-specific
- visible in the workspace, output, or support content
- useful for reviewing generated output
- short and accurate

## Avoid list

- Do not use this as filler.
- Do not define generic words that do not help the tool workflow.
- Do not duplicate `08_acronyms` in the same tool.
- Do not copy vendor documentation.
- Do not overload the table with long explanations.

## Validation checklist

- Terms appear in the tool, output, or support content.
- Definitions are accurate and concise.
- The section is omitted if unnecessary.
- `08_acronyms` is not also included unless a deliberate exception is recorded.
