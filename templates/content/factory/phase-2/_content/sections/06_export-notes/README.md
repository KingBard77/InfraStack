# Export Notes Markdown Section

## Purpose

Explains what each export format is for and what it preserves.

## When to use

Use when the workspace supports PNG, SVG, JSON, copy actions, downloads, restore, or imported state.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-export`.

The section heading uses a left Bootstrap icon and a divider line. Each export row should include a compact left `tool-export-icon` with clear spacing before the row text.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-export">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The workspace supports several export paths, but they do not preserve the same information.</p>
  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-image" aria-hidden="true"></i></span> <span>Export PNG</span></summary>
    <div class="tool-export-answer"><p>PNG preserves a static visual snapshot, not editable state.</p></div>
  </details>
</div>
```

## Related CSS source files

- `section.css`

## Related JS helper files

None.

## Content guidance

Use these meanings unless the tool implements something different:

- PNG is for sharing a static image.
- SVG is for scalable diagram reuse.
- JSON is for restoring editable workspace state.

Explain that JSON is the state-preserving format when restore exists.

Explain that PNG and SVG do not preserve editable workspace state.

## Avoid list

- Do not say JSON restore exists unless implemented.
- Do not say PNG or SVG preserve editable state.
- Do not mention export buttons that are not present.
- Do not imply exported diagrams are implementation-ready documents.

## Validation checklist

- Export notes match actual buttons.
- JSON restore behavior is accurately described.
- Tool ID and version validation are described only if implemented.
- Static versus editable export behavior is clear.
