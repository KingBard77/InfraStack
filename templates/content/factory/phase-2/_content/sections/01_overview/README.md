# Overview Markdown Section

## Purpose

Provides the first support markdown block for a tool.

The overview explains what the workspace creates, what input it expects, what output it renders, and how users should treat the result.

## When to use

Use for every tool.

This section should appear near the top of `content.md` before deeper technical or usage sections.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__TOOL_NAME__`
- `__DOMAIN_NAME__`
- `__OUTPUT_NAME__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-overview`.

The section heading uses a left Bootstrap icon and a divider line.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-overview">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>
  ...
</div>
```

## Related CSS source files

- `section.css`

## Related JS helper files

None.

## Content guidance

The overview should explain:

- what the tool creates
- what type of prompt or input it expects
- what output the stage renders
- what users should do first
- when the tool is useful
- when the output should not be treated as final authority

Use “first-pass” when the tool relies on deterministic parsing or defaults.

## Avoid list

- Do not claim the output is final implementation truth.
- Do not say the tool validates everything unless it does.
- Do not use generic marketing copy.
- Do not copy provider documentation.
- Do not mention export formats that are not implemented.

## Validation checklist

- The overview matches the actual workspace behavior.
- The output description matches the visual stage.
- The assumptions and review boundary are clear.
- The section uses the correct tool namespace.
- No stale provider or domain wording remains.
