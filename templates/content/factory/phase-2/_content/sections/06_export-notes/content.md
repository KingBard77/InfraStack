[//]: # (content.md)

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-export">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The workspace supports several export paths, but they do not preserve the same information.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-image" aria-hidden="true"></i></span> <span>Export PNG</span></summary>
    <div class="tool-export-answer">
      <p>Use <code>Export PNG</code> when you need a quick visual snapshot for tickets, approvals, review notes, chat, slide decks, or static documentation.</p>
      <p>PNG preserves the current visible diagram as a bitmap image. It does not preserve editable workspace state.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-bezier2" aria-hidden="true"></i></span> <span>Download SVG</span></summary>
    <div class="tool-export-answer">
      <p>Use <code>Download SVG</code> when you need a clean vector version for documentation, decks, or diagrams that may be edited in vector tools.</p>
      <p>SVG preserves the current stage drawing as vector output, but it is still a presentation format.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span> <span>Copy JSON / Download JSON</span></summary>
    <div class="tool-export-answer">
      <p>Use <code>Copy JSON</code> or <code>Download JSON</code> when you want to preserve the actual workspace state.</p>
      <ul>
        <li>The normalized model values</li>
        <li>The prompt and selected preset</li>
        <li>Inspector choices</li>
        <li>Layout overrides</li>
        <li>Inventory, notes, and assumptions</li>
      </ul>
      <p>JSON is the restore format, not just a visual export.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-upload" aria-hidden="true"></i></span> <span>Import JSON</span></summary>
    <div class="tool-export-answer">
      <p>Use <code>Import JSON</code> to reopen a previously saved workspace state. Validate tool ID, version, and required fields before syncing controls and re-rendering output.</p>
    </div>
  </details>
</div>
