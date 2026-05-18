# Example Prompts Markdown Section

## Purpose

Provides copyable example prompts that demonstrate how to seed the workspace with realistic input.

## When to use

Use when the workspace supports prompt-driven generation, preset generation, natural-language input, or preset-aligned estimate briefs.

Use `09_example-commands` instead when the examples are literal terminal commands.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__PROMPT_1__`
- `__PROMPT_2__`
- `__PROMPT_3__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-examples`.

The section heading uses a left Bootstrap icon and a divider line.

Prompt blocks should use a stable class so copy-button behavior can target them.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-examples">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-chat-square-text" aria-hidden="true"></i><span>Example Prompts</span></h2>
  ...
</div>
```

## Related CSS source files

- `section.css`

## Related JS helper files

- Optional markdown copy-button initializer in `custom.js`

## Prompt guidance

Example prompts should be:

- realistic
- domain-native
- explicit enough for deterministic parsing
- aligned with supported controls
- safe to paste into the prompt box
- short enough to scan
- aligned with preset names and visible controls for calculate-family tools

## Avoid list

- Do not include unsupported services or fields as if implemented.
- Do not copy examples from another provider without adapting them.
- Do not create overly long prompts that hide the important inputs.
- Do not promise perfect parsing.
- Do not rename this section to Example Inputs when the examples are copyable prompts or estimate briefs.

## Validation checklist

- Example prompts match supported parser terms.
- Prompt examples use the current provider/domain vocabulary.
- Copy buttons work if included.
- Terminal strip title is title case and centered in the terminal strip, for example `Scaffold Prompt`.
- No inherited provider or unrelated domain terms remain.
- Calculate-family prompts map to visible preset, quantity, rate, assumption, and export controls.
