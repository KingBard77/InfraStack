# Prompt Tips Markdown Section

## Purpose

Provides concise guidance on how to write better prompts for the workspace.

## When to use

Use when the tool has deterministic parser behavior or controlled defaults that benefit from explicit prompt language.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__DOMAIN_TERMS__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-prompt-tips`.

The section heading uses a left Bootstrap icon and a divider line.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-prompt-tips">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Prompt Tips</span></h2>
  ...
</div>
```

## Related CSS source files

- `section.css`

## Related JS helper files

None.

Each accordion row should include a compact left `tool-guidance-icon` with clear spacing before the row text.

## Content guidance

Prompt tips should explain:

- which terms the parser recognizes
- which values are optional
- which values default when omitted
- how to phrase topology, path, or design intent
- why users should review prompt notes after generation

## Avoid list

- Do not claim freeform natural language understanding when parsing is deterministic.
- Do not list terms that the parser does not support.
- Do not make the tips longer than the tool content itself.
- Do not imply the prompt replaces engineering review.

## Validation checklist

- Tips match actual parser behavior.
- Defaults mentioned here appear in prompt notes or controls.
- Terms are domain-native.
- The section remains concise.
