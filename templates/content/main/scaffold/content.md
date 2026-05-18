[//]: # (content.md)

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-overview">

## Overview

__TOOL_NAME__ is an InfraStack workspace for turning a short technical brief into a first-pass visual model. <a id="__PREFIX__-cite-primary-source" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-primary-source"><span class="__PREFIX__-citation-inline">__PRIMARY_SOURCE_AUTHOR__ (__PRIMARY_SOURCE_YEAR__)</span></a> says __PRIMARY_SOURCE_SUPPORTED_CLAIM__, so this workspace uses that source-backed idea to shape the model boundary, placement language, and review notes. It reads key terms from the prompt, applies preset defaults where needed, and renders the result into the stage, technical inventory, notes, and export state.

Use the workspace as a planning and explanation aid. The generated result should be reviewed before it is used for implementation, security review, procurement, or final documentation.

This workspace is most useful when you need to:

- Sketch a baseline model quickly
- Explain component placement and relationships
- Compare design options or presets
- Prepare visuals for review or documentation
- Save an editable workspace state for later refinement

</div>

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-technical">

## Technical Details

The workspace builds one normalized model from the prompt, the selected preset, and the current control values. The same model drives the stage, notes, technical inventory, and JSON export. <a id="__PREFIX__-cite-method-source" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-method-source"><span class="__PREFIX__-citation-inline">__METHOD_SOURCE_AUTHOR__ (__METHOD_SOURCE_YEAR__)</span></a> frames __METHOD_SOURCE_SUPPORTED_CLAIM__, so the technical notes should connect generated output to the supported source rather than repeating unsourced assumptions.

### 1. Prompt interpretation and defaults

The parser is deterministic and tool-local. If the same prompt, preset, and controls are used, the same first-pass model should be produced.

The parser works best when the prompt includes:

- Environment or scenario
- Main components
- Component relationships
- Important constraints
- Security or operational controls
- External dependencies

If the prompt is incomplete, the selected preset may apply default values. Review the notes panel to confirm what the workspace assumed.

### 2. Stage layout

The stage arranges the generated items into a readable visual model. Components are grouped based on their role, relationship, or placement in the selected pattern.

The layout is meant for review clarity. It should not be treated as a complete implementation diagram unless reviewed and refined.

### 3. Model refinement

After generation, you can refine the model by changing controls, updating selected items, adjusting stage layout, and reviewing the generated notes.

The normalized model remains the main source of workspace state. JSON export preserves this editable state.

### 4. Review points

The generated output does not automatically confirm implementation correctness, security completeness, compliance readiness, cost accuracy, or production readiness. <a id="__PREFIX__-cite-review-source" class="__PREFIX__-citation-link" href="#__PREFIX__-ref-review-source"><span class="__PREFIX__-citation-inline">__REVIEW_SOURCE_AUTHOR__ (__REVIEW_SOURCE_YEAR__)</span></a> says __REVIEW_SOURCE_SUPPORTED_CLAIM__, so the final content should explain what still needs human review.

<table>
  <thead>
    <tr>
      <th>Area</th>
      <th>Workspace behavior</th>
      <th>Review note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Prompt</td>
      <td>Extracts key terms and applies defaults where needed.</td>
      <td>Use clear technical wording and review assumptions.</td>
    </tr>
    <tr>
      <td>Stage</td>
      <td>Displays the generated model visually.</td>
      <td>Adjust layout for clarity before sharing.</td>
    </tr>
    <tr>
      <td>Controls</td>
      <td>Allow supported values to be refined after generation.</td>
      <td>Use controls to correct the model without rewriting the prompt.</td>
    </tr>
    <tr>
      <td>Inventory</td>
      <td>Summarizes generated components and roles.</td>
      <td>Use it to verify what the tool interpreted.</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>Preserves the editable workspace state.</td>
      <td>Use JSON when continuing work later.</td>
    </tr>
  </tbody>
</table>

</div>

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-references">

## References

These sources support the in-text citations used in this tool page. Replace every placeholder row with a source that directly supports the final sentence where it is cited. Substantial Technical Details content must be 1500+ words, include at least two official or source-of-truth sources when it makes technical claims, and factual content should carry at least three real references.

<table class="__PREFIX__-citation-table">
  <thead>
    <tr>
      <th>Source type</th>
      <th>In-text citation</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr id="__PREFIX__-ref-primary-source">
      <td>__PRIMARY_SOURCE_TYPE__</td>
      <td><a class="__PREFIX__-citation-backlink" href="#__PREFIX__-cite-primary-source"><span class="__PREFIX__-citation-inline">(__PRIMARY_SOURCE_AUTHOR__, __PRIMARY_SOURCE_YEAR__)</span></a></td>
      <td>__PRIMARY_SOURCE_REFERENCE__ <a href="__PRIMARY_SOURCE_URL__">__PRIMARY_SOURCE_URL__</a></td>
    </tr>
    <tr id="__PREFIX__-ref-method-source">
      <td>__METHOD_SOURCE_TYPE__</td>
      <td><a class="__PREFIX__-citation-backlink" href="#__PREFIX__-cite-method-source"><span class="__PREFIX__-citation-inline">(__METHOD_SOURCE_AUTHOR__, __METHOD_SOURCE_YEAR__)</span></a></td>
      <td>__METHOD_SOURCE_REFERENCE__ <a href="__METHOD_SOURCE_URL__">__METHOD_SOURCE_URL__</a></td>
    </tr>
    <tr id="__PREFIX__-ref-review-source">
      <td>__REVIEW_SOURCE_TYPE__</td>
      <td><a class="__PREFIX__-citation-backlink" href="#__PREFIX__-cite-review-source"><span class="__PREFIX__-citation-inline">(__REVIEW_SOURCE_AUTHOR__, __REVIEW_SOURCE_YEAR__)</span></a></td>
      <td>__REVIEW_SOURCE_REFERENCE__ <a href="__REVIEW_SOURCE_URL__">__REVIEW_SOURCE_URL__</a></td>
    </tr>
  </tbody>
</table>

</div>

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-examples">

## Example Prompts

<p>Paste one of these prompts into the prompt box, generate the first pass, then review the notes and inventory before exporting.</p>

<pre class="__PREFIX__-prompt-pre"><code>Create a __TOOL_NAME__ model for a production environment. Include the main components, supporting services, controls, and key relationships.</code></pre>

<details class="__PREFIX__-prompt-note">
  <summary>
    <span class="__PREFIX__-prompt-note-label __PREFIX__-prompt-note-label-closed">Show prompt use</span>
    <span class="__PREFIX__-prompt-note-label __PREFIX__-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="__PREFIX__-prompt-copy-btn" data-prompt-copy-index="0">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-diagram-3 fs-5"></i>
    <div><strong>Production baseline:</strong> Useful for a structured first-pass model with core components and controls.</div>
  </div>
</details>

<pre class="__PREFIX__-prompt-pre"><code>Build a simplified __TOOL_NAME__ diagram for a development environment. Keep only the essential components and show the main flow.</code></pre>

<details class="__PREFIX__-prompt-note">
  <summary>
    <span class="__PREFIX__-prompt-note-label __PREFIX__-prompt-note-label-closed">Show prompt use</span>
    <span class="__PREFIX__-prompt-note-label __PREFIX__-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="__PREFIX__-prompt-copy-btn" data-prompt-copy-index="1">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-boxes fs-5"></i>
    <div><strong>Development layout:</strong> Useful for a lightweight model focused on essentials and flow.</div>
  </div>
</details>

<pre class="__PREFIX__-prompt-pre"><code>Generate a __TOOL_NAME__ workspace for a security-sensitive system. Show access boundaries, monitoring, external dependencies, and assumptions.</code></pre>

<details class="__PREFIX__-prompt-note __PREFIX__-prompt-note-last">
  <summary>
    <span class="__PREFIX__-prompt-note-label __PREFIX__-prompt-note-label-closed">Show prompt use</span>
    <span class="__PREFIX__-prompt-note-label __PREFIX__-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="__PREFIX__-prompt-copy-btn" data-prompt-copy-index="2">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-shield-check fs-5"></i>
    <div><strong>Control-focused model:</strong> Useful when access, monitoring, and assumptions need to be visible.</div>
  </div>
</details>

</div>

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-prompt-tips">

## Prompt Tips

The generator works best when the prompt is direct and specific.

<details class="tool-guidance-item" open>
<summary><i class="bi bi-lightbulb-fill tool-guidance-icon" aria-hidden="true"></i> <span>What should the prompt include?</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Name the environment or scenario.</li>
<li>List the main components.</li>
<li>Describe important relationships or flow.</li>
<li>Include security, monitoring, or operational controls.</li>
<li>Mention external dependencies or constraints.</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-pencil-square tool-guidance-icon" aria-hidden="true"></i> <span>What prompt habits produce cleaner diagrams?</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Keep one scenario per prompt.</li>
<li>Use exact technical terms.</li>
<li>State important exclusions clearly.</li>
<li>Use presets for a stable starting point.</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-search tool-guidance-icon" aria-hidden="true"></i> <span>When should the first pass be reviewed closely?</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>The prompt is short or ambiguous.</li>
<li>The design is security-sensitive.</li>
<li>External integrations are involved.</li>
<li>The output will be used for implementation or approval.</li>
</ul>
</div>
</details>

</div>

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-how-to">

## How To Use

<details class="tool-guidance-item" open>
<summary><i class="bi bi-card-checklist tool-guidance-icon" aria-hidden="true"></i> <span>1. Start with a preset or brief</span></summary>
<div class="tool-guidance-answer">
<p>Select a preset or paste a short technical brief into the prompt box.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-diagram-3 tool-guidance-icon" aria-hidden="true"></i> <span>2. Generate the first-pass model</span></summary>
<div class="tool-guidance-answer">
<p>Click <code>Generate</code> to build the first-pass visual model.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-clipboard-check tool-guidance-icon" aria-hidden="true"></i> <span>3. Review the result</span></summary>
<div class="tool-guidance-answer">
<p>Check the stage, notes, and inventory to confirm what the workspace interpreted.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-sliders tool-guidance-icon" aria-hidden="true"></i> <span>4. Refine the controls</span></summary>
<div class="tool-guidance-answer">
<p>Adjust supported values, toggles, and selected items until the model matches your intent.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-bounding-box-circles tool-guidance-icon" aria-hidden="true"></i> <span>5. Adjust the stage layout</span></summary>
<div class="tool-guidance-answer">
<p>Move or resize items where supported to make the diagram easier to read.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-download tool-guidance-icon" aria-hidden="true"></i> <span>6. Export the workspace</span></summary>
<div class="tool-guidance-answer">
<p>Use PNG or SVG for visuals. Use JSON to preserve the editable workspace state.</p>
</div>
</details>

</div>

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-export">

## Export Notes

The workspace supports visual export and state export.

<details class="tool-export-item" open>
  <summary><i class="bi bi-file-earmark-image tool-export-icon" aria-hidden="true"></i> <span>Export PNG</span></summary>
  <div class="tool-export-answer">
    <p>Use PNG when you need a quick image for tickets, notes, chats, slides, or documentation.</p>
    <p>PNG does not preserve editable workspace state.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-bezier2 tool-export-icon" aria-hidden="true"></i> <span>Download SVG</span></summary>
  <div class="tool-export-answer">
    <p>Use SVG when you need a clean vector diagram that stays sharp at different sizes.</p>
    <p>SVG is a visual export, not a restore format.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-braces tool-export-icon" aria-hidden="true"></i> <span>Copy JSON / Download JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use JSON when you want to save or restore the editable workspace state.</p>
    <p>JSON preserves the prompt, selected preset, normalized values, notes, controls, and layout overrides.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-upload tool-export-icon" aria-hidden="true"></i> <span>Import JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use Import JSON to reopen a previously saved workspace state and continue editing.</p>
  </div>
</details>

</div>

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-faq">

## FAQ

<details class="faq-item" open>
  <summary>Is the generated output final?</summary>
  <div class="faq-answer">
    No. It is a first-pass model for review and refinement.
  </div>
</details>

<details class="faq-item">
  <summary>Can I edit the result?</summary>
  <div class="faq-answer">
    Yes. You can refine controls, update stage items, adjust layout, and export the updated state.
  </div>
</details>

<details class="faq-item">
  <summary>Which export should I use?</summary>
  <div class="faq-answer">
    Use PNG or SVG for visual sharing. Use JSON when you need to restore or continue editing the workspace.
  </div>
</details>

<details class="faq-item">
  <summary>What happens if my prompt is incomplete?</summary>
  <div class="faq-answer">
    The workspace may apply preset defaults. Review the notes panel to confirm assumptions.
  </div>
</details>

<details class="faq-item">
  <summary>Does this replace engineering review?</summary>
  <div class="faq-answer">
    No. Use it as a planning aid, then validate the design before implementation.
  </div>
</details>

</div>

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-acronyms">

## Acronyms

Use this section only when abbreviation expansion helps the current tool. Use the separate Glossary section instead when broader technical terms are more useful than acronyms.

<table>
  <thead>
    <tr>
      <th>Acronym</th>
      <th>Meaning</th>
      <th>Why it matters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>PNG</td>
      <td>Portable Network Graphics</td>
      <td>Used for quick image export.</td>
    </tr>
    <tr>
      <td>SVG</td>
      <td>Scalable Vector Graphics</td>
      <td>Used for crisp vector export.</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>JavaScript Object Notation</td>
      <td>Used to preserve and restore workspace state.</td>
    </tr>
    <tr>
      <td>UI</td>
      <td>User Interface</td>
      <td>Refers to the visible controls, stage, and panels.</td>
    </tr>
    <tr>
      <td>WIP</td>
      <td>Work In Progress</td>
      <td>Useful label for drafts that still need review.</td>
    </tr>
  </tbody>
</table>

</div>
