# Technical Details Markdown Section

## Purpose

Provides markdown support for deterministic parsing, placement layers, path logic, assumptions, editable behavior, output model, and limits.

## When to use

Use when a tool has parser behavior, stage layout, route/path/dependency logic, restore state, or advisory output that users need to understand.

## Required placeholders

- `__TOOL_CLASS__`
- `__PREFIX__`

## Expected DOM/class rhythm

The markdown card uses `.content-card`, `.__PREFIX__-markdown-card`, and `.__PREFIX__-markdown-card-technical` with a visible card frame, an icon-led `h2` that keeps the section divider line, concise `h3` subsections whose visible labels start with `1.`, `2.`, `3.`, and so on, separators between later numbered headings, a four-card quick-scan grid, normal bullet lists without a vertical left rule, and an architecture-style behavior table.

Expected structure:

```html
<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-technical">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <div class="tool-technical-scan-grid" aria-label="Technical Details quick scan">
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">First scan</span>
      <strong>Read the model like evidence.</strong>
      <ul>
        <li>Start with prompt notes to separate explicit input from preset defaults.</li>
        <li>Check the generated boundary before trusting the rest of the diagram.</li>
      </ul>
    </section>
    ...
  </div>

  <h3 class="__PREFIX__-technical-step-heading">1. Prompt interpretation and defaults</h3>
  ...

  <h3 class="__PREFIX__-technical-step-heading">2. Placement layers</h3>
  ...

  <h3 class="__PREFIX__-technical-step-heading">3. What can be edited after generation</h3>
  ...

  <h3 class="__PREFIX__-technical-step-heading">4. Practical review workflow</h3>
  <ul class="tool-technical-checklist">
    <li><strong>Intent:</strong> Compare the prompt notes with the real design brief and mark every preset-filled assumption.</li>
    ...
  </ul>

  <h3 class="__PREFIX__-technical-step-heading">5. What the export does not prove</h3>
  <ul class="tool-technical-warning-list">
    <li>Environment facts such as quotas, route propagation, service reachability, or live configuration drift.</li>
    ...
  </ul>

  <table>
    <thead>
      <tr>
        <th>Component area</th>
        <th>Technical behavior</th>
        <th>Design implication</th>
      </tr>
    </thead>
    <tbody>
      ...
    </tbody>
  </table>
</div>
```

The quick-scan cards should stay boxed with transparent background, no shadow, and no stronger left border. Checklist and warning bullet lists should stay as normal transparent bullet lists with no surrounding box and no vertical left rule. Every visible Technical Details bullet should start with a capitalized word. The table should keep the same content rhythm as `templates/content/tools/aws/architecture-vpc-aws/content.md`: deterministic prompt parsing, boundary model, edge or entry services, public entry, private workload, protected data, operations, and JSON state.

## Related CSS source files

- `section.css`

## Related JS helper files

None.

## Avoid list

- Do not expose implementation internals that users cannot act on.
- Do not claim AI reasoning for deterministic parsing.
- Do not copy vendor documentation.
- Do not list unsupported behavior as if implemented.
- Do not claim accuracy, security, production readiness, compliance, current pricing, or certification unless the tool actually validates that outcome.

## Source standard

- Substantial `Technical Details` sections must be 1500+ words.
- Cite at least two official or source-of-truth websites or docs when `Technical Details` makes technical claims.
- Prefer provider docs, product docs, standards bodies, protocol specifications, benchmark owners, project maintainers, or primary vendor docs for the described feature.
- Every citation must be clickable and must match a References row from `content/10_references`.
- Behavior claims must match actual code, visible controls, generated output, export behavior, restore behavior, and validation notes.

## Validation checklist

- Parser and assumptions are explained honestly.
- Editable behavior matches actual state persistence.
- Output model explanation matches JSON export.
- Limits do not overclaim validation depth.
- The card frame and heading divider line are visible.
- Technical Details `h3` labels are visibly numbered in sequence and render with separator lines after the first numbered block.
- Technical claims have at least two official or source-of-truth citations.
- Substantial Technical Details content is 1500+ words.
- Quick-scan boxes, bullets, and tables are used when they make review points easier to scan.
- Quick-scan cards keep a transparent boxed treatment without a thicker left rule.
- Checklist and warning bullets render as normal bullet lists without a vertical left rule.
- Every visible Technical Details bullet starts with a capitalized word.
- Tool behavior claims match implementation and recorded validation.
