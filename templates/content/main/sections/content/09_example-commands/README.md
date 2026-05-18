# Example Commands Markdown Section

## Purpose

Provides copyable command examples for shell, command-generator, runbook, scanner, or assessment tools that show literal commands instead of natural-language prompts.

## When to use

Use this section when users should copy a terminal command, CLI fragment, scanner command, or command-builder example.

Use `03_example-prompts` instead when the workspace is architecture-family, prompt-driven, or uses preset-aligned briefs rather than literal commands.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- command examples adapted to the target command or tool

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, `.__PREFIX__-markdown-card-examples`, and `.__PREFIX__-markdown-card-commands`.

Command blocks should use a stable class so copy-button behavior can target them.
The section heading uses a left Bootstrap icon and a divider line.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-examples __PREFIX__-markdown-card-commands">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>

  <pre class="__PREFIX__-command-pre"><code>...</code></pre>

  <details class="__PREFIX__-command-note">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="0">
        <i class="bi bi-clipboard" aria-hidden="true"></i>
        <span>Copy command</span>
      </button>
    </summary>
    ...
  </details>
</div>
```

## Related CSS Source Files

- `section.css`

## Related JS Helper Files

- `section.js`

## Command Guidance

Example commands should be:

- realistic
- domain-native
- safe to show as text
- scoped to supported command options
- short enough to scan
- clear about placeholders such as `<token>`, `<host>`, `<path>`, or `<file>`

## Avoid List

- Do not include real secrets, tokens, credentials, internal hosts, or private paths.
- Do not show destructive commands unless the tool is explicitly about destructive workflows and the risk is visible.
- Do not include flags the generated command tool cannot actually model.
- Do not rename this section to Example Prompts when the examples are literal commands.
- Do not claim command safety, production readiness, compliance, or security unless validated.

## Validation Checklist

- Command examples match supported command builder controls.
- Copy buttons target the matching command block.
- Terminal strip title is title case and centered in the terminal strip, for example `Netcat Command`.
- No inherited provider, unrelated command, or placeholder secret remains in final content.
- Commands are examples only; the browser does not execute them.
