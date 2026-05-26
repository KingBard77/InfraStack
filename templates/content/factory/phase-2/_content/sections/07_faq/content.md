[//]: # (content.md)

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-faq">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>Use these answers to clarify the workspace boundary before users depend on the output. The FAQ should explain parser limits, review expectations, editable state, and what each export path does or does not preserve.</p>

  <details class="faq-item" open>
    <summary><span>Does this tool call an external AI service?</span></summary>
    <div class="faq-answer"><p>No. The section pattern expects deterministic browser-side extraction and state handling unless a final tool deliberately adds a server-side integration.</p></div>
  </details>

  <details class="faq-item">
    <summary><span>What happens if my prompt is incomplete or ambiguous?</span></summary>
    <div class="faq-answer"><p>The tool should apply controlled defaults from the selected preset and record assumptions in prompt notes. Review those notes before treating the first pass as final.</p></div>
  </details>

  <details class="faq-item">
    <summary><span>Can I edit the generated result after generation?</span></summary>
    <div class="faq-answer"><p>Yes. A finished workspace should let users adjust controls, refine supported stage objects, and preserve those changes in JSON.</p></div>
  </details>

  <details class="faq-item">
    <summary><span>What is the best way to save work in progress?</span></summary>
    <div class="faq-answer"><p>Save the JSON export. PNG and SVG are presentation outputs, not restore formats.</p></div>
  </details>
</div>
