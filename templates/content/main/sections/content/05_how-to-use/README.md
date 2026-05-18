# How To Use Markdown Section

## Purpose

Provides step-by-step user guidance for operating the workspace.

## When to use

Use for every tool, especially when the workspace includes prompt input, controls, stage interactions, selected-item editing, export, or restore.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`
- `__TOOL_NAME__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-how-to-use`.

The section heading uses a left Bootstrap icon and a divider line.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-how-to-use">

## How to Use

Use this workflow to move from a rough brief to a reviewed workspace artifact before the accordion rows.

</div>
```

## Related CSS source files

- `section.css`

## Related JS helper files

None.

## Content guidance

The section should describe the actual workflow:

Start with one explanation paragraph before the steps, matching the same rhythm as `Prompt Tips`. Each workflow row should include a compact left `tool-guidance-icon` with clear spacing before the row text.

1. choose a preset
2. write or paste a prompt
3. generate the model
4. review prompt notes
5. refine controls
6. adjust stage layout
7. inspect inventory or output
8. export PNG/SVG/JSON
9. restore from JSON later when supported

## Avoid list

- Do not repeat every button label.
- Do not describe controls that are not implemented.
- Do not claim keyboard, drag, resize, export, or restore behavior unless implemented.
- Do not make this section longer than necessary.

## Validation checklist

- Steps match actual UI order.
- Export and restore steps match actual behavior.
- Selected-item instructions only appear when items are selectable.
- The section is practical and concise.
