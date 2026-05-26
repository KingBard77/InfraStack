# FAQ Markdown Section

## Purpose

Provides short answers to common user questions about the workspace.

## When to use

Use only when FAQ genuinely helps users understand parser limits, export behavior, assumptions, review boundaries, or restore behavior.

This section is optional.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-faq`.

The section heading uses a left Bootstrap icon and a divider line. FAQ rows stay text-only and should not include left row icon chips.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-faq">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>Use these answers to clarify the workspace boundary before users depend on the output.</p>
  <details class="faq-item">
    <summary><span>Question text</span></summary>
    <div class="faq-answer"><p>Answer text.</p></div>
  </details>
</div>
```

Use `<details>` and `<summary>` when the FAQ is longer than a few items.
Start with one explanation paragraph before the FAQ items, matching the same rhythm as `Prompt Tips`.

## Related CSS source files

- `section.css`

## Related JS helper files

None.

## Good FAQ topics

- whether the diagram is final implementation truth
- what assumptions mean
- what JSON preserves
- what PNG/SVG preserve
- why some services or nodes appear in specific layers
- what the parser does not validate
- when engineering review is still required

## Avoid list

- Do not add marketing FAQ.
- Do not repeat the overview.
- Do not answer questions unrelated to the tool.
- Do not claim compliance or production certification.

## Validation checklist

- FAQ answers match actual behavior.
- FAQ is concise.
- No unsupported claims are present.
- FAQ is omitted if it does not add value.
