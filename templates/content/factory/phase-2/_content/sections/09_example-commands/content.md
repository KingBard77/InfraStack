[//]: # (content.md)

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-examples __PREFIX__-markdown-card-commands">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>
  <p>Copy one of these command examples, replace the target, path, header, or output file values, then review the generated options before exporting or sharing the result.</p>

  <pre class="__PREFIX__-command-pre"><code>wget --spider --server-response https://example.com/health</code></pre>
  <details class="__PREFIX__-command-note">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Header probe:</strong> Useful when the tool should show request metadata, status behavior, and reachable target assumptions.</div></div>
  </details>

  <pre class="__PREFIX__-command-pre"><code>wget --mirror --convert-links --adjust-extension --page-requisites --no-parent https://example.com/docs/</code></pre>
  <details class="__PREFIX__-command-note">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Site mirror:</strong> Good for command builders that expose recursive download, local rewrite, and boundary controls.</div></div>
  </details>

  <pre class="__PREFIX__-command-pre"><code>wget --header="Authorization: Bearer &lt;token&gt;" --output-document=response.json https://example.com/api/resource</code></pre>
  <details class="__PREFIX__-command-note">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Authenticated fetch:</strong> Use only with placeholder tokens in shared examples; final tools must avoid exposing secrets.</div></div>
  </details>

  <pre class="__PREFIX__-command-pre"><code>wget --retry-connrefused --waitretry=2 --tries=5 --output-document=artifact.tar.gz https://example.com/path/artifact.tar.gz</code></pre>
  <details class="__PREFIX__-command-note __PREFIX__-command-note-last">
    <summary>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-closed">Show command use</span>
      <span class="__PREFIX__-command-note-label __PREFIX__-command-note-label-open">Hide command use</span>
      <button type="button" class="__PREFIX__-command-copy-btn" data-command-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Retry policy:</strong> Useful when timeout, retry, output naming, and failure behavior need to be visible before copy or export.</div></div>
  </details>
</div>
