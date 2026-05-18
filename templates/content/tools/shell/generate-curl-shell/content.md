[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-overview">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

  <p>cURL Command Generator turns API, download, upload, and troubleshooting intent into a reviewed <code>curl</code> command. It keeps method, URL, headers, body mode, authentication placeholders, retry policy, timeout, output file, redirects, HTTP version, shell style, and import parsing visible before the command is copied.</p>

  <p><a id="generate-curl-shell-cite-review" class="generate-curl-shell-citation-link" href="#generate-curl-shell-ref-review"><span class="generate-curl-shell-citation-inline">Stenberg (n.d.)</span></a> frames curl as a command-line transfer tool with many option and URL combinations, so this workspace separates intent, request data, transport controls, and export output instead of presenting one opaque command string.</p>

  <table>
    <thead>
      <tr>
        <th>Workspace area</th>
        <th>What it produces</th>
        <th>Review before use</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Request builder</td>
        <td>Method, URL, headers, body, auth placeholder, and transfer options.</td>
        <td>Remove secrets from shared commands and confirm the target endpoint.</td>
      </tr>
      <tr>
        <td>Import parser</td>
        <td>Fields populated from a pasted command that starts with <code>curl</code>.</td>
        <td>Review imported headers and body before regenerating output.</td>
      </tr>
      <tr>
        <td>Output</td>
        <td>Command, warnings, option rows, CSV, and JSON payload.</td>
        <td>Exports document the request; they do not send HTTP traffic.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-technical">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <p>The generated request model follows curl and HTTP source material while keeping the browser boundary explicit. <a id="generate-curl-shell-cite-primary" class="generate-curl-shell-citation-link" href="#generate-curl-shell-ref-primary"><span class="generate-curl-shell-citation-inline">curl project (n.d.)</span></a> documents <code>curl</code> as a command-line URL transfer tool with a large option surface. <a id="generate-curl-shell-cite-method" class="generate-curl-shell-citation-link" href="#generate-curl-shell-ref-method"><span class="generate-curl-shell-citation-inline">Fielding et al. (2022)</span></a> define HTTP semantics, including methods, request targets, fields, and responses. <a id="generate-curl-shell-cite-technical-review" class="generate-curl-shell-citation-link" href="#generate-curl-shell-ref-review"><span class="generate-curl-shell-citation-inline">Stenberg (n.d.)</span></a> explains curl's command-line model, which is why this workspace separates request intent, shell quoting, transfer behavior, and review exports.</p>

  <table>
    <thead>
      <tr>
        <th>Review layer</th>
        <th>What the workspace makes visible</th>
        <th>What runtime still decides</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Request intent</td><td>URL, method, headers, body mode, auth placeholder, and selected shell style.</td><td>Endpoint ownership, API schema, authorization, environment, and whether the call is allowed.</td></tr>
      <tr><td>Transfer policy</td><td>Redirects, TLS verification choices, proxy settings, timeout values, retries, and output handling.</td><td>Certificate trust, proxy behavior, network path, server response, and side-effect safety.</td></tr>
      <tr><td>Secret exposure</td><td>Credential-bearing fields, headers, cookies, token placeholders, and export surfaces.</td><td>Actual secret handling, credential scope, rotation, and whether generated artifacts can be shared.</td></tr>
      <tr><td>Evidence boundary</td><td>Command text, warnings, option rows, CSV, JSON, and printable review output.</td><td>HTTP status, response body, logs, rate limits, idempotency, and application-side result.</td></tr>
    </tbody>
  </table>

  <h3 class="generate-curl-shell-technical-step-heading">1. Request Model As Review Data</h3>
  <p>The workspace treats a curl command as a request model before it renders a terminal string. The model starts with the URL, method, headers, body mode, authentication placeholder, redirect policy, timeout policy, retry policy, output behavior, and shell style. That structure prevents the common failure mode where one long command hides a stale header, a production URL, or a dangerous flag. The generated command is only one view. Summary cards, warnings, option rows, CSV, JSON, and PDF output all reflect the same state.</p>
  <p>The browser does not make the HTTP request. It does not resolve DNS, inspect certificates, call the API, validate an OpenAPI schema, or check whether the method is safe for the target resource. Its job is to make the draft visible enough for a human to review before a terminal, script, or CI job performs the transfer.</p>
  <ul>
    <li>Review URL, method, headers, body, authentication, redirects, retries, and output together.</li>
    <li>Use the option table to check why each generated flag exists.</li>
    <li>Do not treat a syntactically clean command as endpoint validation.</li>
  </ul>

  <h3 class="generate-curl-shell-technical-step-heading">2. URL, Method, And Header Decisions</h3>
  <p>The URL is the anchor of the request. It defines the scheme, host, port, path, query string, and sometimes environment. Small differences such as a staging subdomain, path prefix, query value, or signed URL can completely change the effect of the command. The generator keeps the URL explicit so reviewers can catch environment mistakes before the command is copied. It can quote the URL, but it cannot prove DNS ownership, route policy, or endpoint safety.</p>
  <p>Method and header choices carry protocol meaning. A <code>GET</code> request is usually easier to repeat than a <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, or <code>DELETE</code> request that can create or mutate state. Headers may control content type, authorization, tenant routing, tracing, caching, or feature flags. The tool therefore keeps headers in rows rather than burying them in a single line.</p>
  <ul>
    <li>Confirm the environment and path before state-changing calls.</li>
    <li>Check <code>Content-Type</code> and <code>Accept</code> against the API contract.</li>
    <li>Use placeholders for tenant IDs, account IDs, and sensitive header values in shared examples.</li>
  </ul>

  <h3 class="generate-curl-shell-technical-step-heading">3. Body Modes, Authentication, And Secrets</h3>
  <p>Body handling is split into JSON, form, raw, and binary modes because curl data flags are easy to mix up. JSON mode is useful for structured payloads, form mode for key-value submissions, raw mode for direct control, and binary mode for file-oriented transfers. The workspace shows the selected body mode and generated flags so reviewers know whether data is inline or file-based. It does not validate that JSON fields match the API schema, that a file exists, or that the endpoint accepts the selected content type.</p>
  <p>Authentication needs a harder boundary than ordinary request metadata. Curl can carry credentials through headers, bearer tokens, cookies, basic auth, client certificates, and other options. This workspace is not a secret store. Anything typed into the form can appear in copied commands, CSV, JSON, and PDF output. Warnings can help, but they cannot guarantee redaction after the user enters a real token.</p>
  <ul>
    <li>Keep examples and exports on placeholders when credentials are involved.</li>
    <li>Inject real secrets at execution time through local secret-aware workflows.</li>
    <li>Review body mode and authentication together because both can change what the server accepts.</li>
  </ul>

  <h3 class="generate-curl-shell-technical-step-heading">4. Redirects, TLS, Proxies, Retries, And Timeouts</h3>
  <p>Transfer controls are operational policy, not decoration. Following redirects can be required for downloads, but it can also move a request to a different host or path. TLS verification choices affect whether HTTPS identity checks are enforced. Proxy settings can route traffic through infrastructure with its own authentication, logging, and policy requirements. The generator can render those flags and warnings; it cannot complete a TLS handshake, inspect trust roots, or confirm proxy behavior.</p>
  <p>Retries and timeouts need to match the request's side-effect profile. A retry is reasonable for many reads and downloads, but it can duplicate a non-idempotent operation if the server receives the first request and the client times out before seeing the response. A timeout that is too short can create false failures; one that is too long can block deployment or troubleshooting.</p>
  <ul>
    <li>Use retries carefully on create, update, delete, and payment-like operations.</li>
    <li>Review TLS bypass or proxy settings as policy exceptions, not convenience toggles.</li>
    <li>Match timeout values to network reality and the cost of waiting.</li>
  </ul>

  <h3 class="generate-curl-shell-technical-step-heading">5. Shell Quoting And Import Parsing</h3>
  <p>Curl commands move between Bash, Zsh, PowerShell, Windows CMD, CI YAML, documentation, and chat messages. Each environment quotes strings differently. JSON bodies, ampersands in URLs, headers with spaces, backslashes, variables, and line-continuation characters can change meaning during copy. The workspace stores the selected shell style and renders the command accordingly, but the destination environment still needs review.</p>
  <p>Import parsing has the inverse boundary. A pasted curl command can be useful for inspection, but arbitrary shell syntax is not a complete request model. The parser maps supported options into fields and keeps unsupported or ambiguous input visible. That is better than pretending the tool can round-trip every shell feature and every curl option perfectly.</p>
  <ul>
    <li>Use single-line output when the destination shell is unknown.</li>
    <li>Check JSON and header quoting after copy, especially in PowerShell and CI files.</li>
    <li>Review imported commands manually when unsupported flags or complex shell syntax appear.</li>
  </ul>

  <table>
    <thead>
      <tr>
        <th>Common review miss</th>
        <th>Why it matters</th>
        <th>Safer review pattern</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Environment drift</td><td>Production, staging, and local API URLs can differ by a small hostname, path prefix, or query value while producing very different effects.</td><td>Review the full URL and method together before copying a state-changing request.</td></tr>
      <tr><td>Credential leakage</td><td>Tokens, cookies, API keys, signed URLs, and account identifiers can persist in copied commands, CSV, JSON, and PDF output.</td><td>Use placeholders in the workspace and inject real values only in the local execution environment.</td></tr>
      <tr><td>Retry side effects</td><td>A retry can duplicate a request when the server processed the first attempt but the client timed out before receiving the response.</td><td>Use retries mainly for reads and downloads unless the API provides idempotency controls.</td></tr>
      <tr><td>Trust bypass</td><td>TLS verification changes, proxy settings, and redirect following can alter the identity or route of the request.</td><td>Treat those flags as policy choices and document why the command needs them.</td></tr>
    </tbody>
  </table>

  <h3 class="generate-curl-shell-technical-step-heading">6. Exports And Runtime Boundary</h3>
  <p>The command, table, CSV, JSON, and PDF output come from one normalized request state. This keeps the visible command aligned with warning rows and review artifacts. CSV is useful for peer review because it breaks the request into option rows, values, and notes. JSON records the generated state, but this curl workspace does not import JSON files back into the form. Pasted command import and URL-restored non-sensitive state are separate behaviors.</p>
  <p>The runtime boundary is the main safety line. The tool does not call external services, test credentials, validate response status, inspect response bodies, verify checksums, or prove that a request is safe for production. After running curl, interpret the actual HTTP status, response payload, headers, logs, and application behavior. The generated command is a reviewable draft, not execution evidence.</p>
  <ul>
    <li>Use exports as request-review material, not test results.</li>
    <li>Keep real credentials out of artifacts that will be shared or stored.</li>
    <li>For state-changing calls, require endpoint, method, body, auth, retry, and environment review before execution.</li>
  </ul>
  <p>Use the section as a request review checklist. The generated command should reveal the target, method, headers, body, credential handling, transfer policy, shell quoting, and expected review artifacts before it reaches a terminal. If a request can create, delete, bill, rotate, deploy, or expose data, treat the browser output as a draft that needs endpoint and authorization review. Curl is powerful because it is direct; this workspace keeps that directness visible instead of pretending the command is safe just because it is well formed. The review should end with a clear answer to who owns the endpoint, what data leaves the host, and what result would prove the request behaved as intended. Keep that answer beside the command when it moves into automation.</p>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-command-tips">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Command Tips</span></h2>
  <p>Use these checks before sharing or running a generated curl command.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span> <span>Keep secrets out of shared exports</span></summary>
    <div class="tool-guidance-answer">
      <p>Use placeholders for bearer tokens, API keys, cookies, and basic-auth passwords. Shared examples should show the shape of the request, not live credentials.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-check2-square" aria-hidden="true"></i></span> <span>Validate JSON before copy</span></summary>
    <div class="tool-guidance-answer">
      <p>JSON body mode can help quote payloads, but the API's accepted schema still needs review against service documentation or a test endpoint.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-arrow-repeat" aria-hidden="true"></i></span> <span>Match retries to operation risk</span></summary>
    <div class="tool-guidance-answer">
      <p>Retries are easier to justify for reads and downloads than for create, update, or delete calls. Do not hide side effects behind aggressive retry settings.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span> <span>Pick shell style deliberately</span></summary>
    <div class="tool-guidance-answer">
      <p>Bash, PowerShell, and Windows CMD quote multi-line commands differently. Use single-line output when pasting into unknown environments.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-how-to">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to turn request intent, imported command text, or a preset into a reviewed curl command.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-card-checklist" aria-hidden="true"></i></span> <span>Choose request intent</span></summary>
    <div class="tool-guidance-answer">
      <p>Start from an API request, health probe, download, upload, authentication, or troubleshooting preset.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>Set URL, method, headers, and body</span></summary>
    <div class="tool-guidance-answer">
      <p>Define the target URL and request shape. Keep placeholders for sensitive values if the command will be exported or shared.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-clipboard-check" aria-hidden="true"></i></span> <span>Review generated options</span></summary>
    <div class="tool-guidance-answer">
      <p>Check warnings, output path, retry behavior, redirects, TLS options, and command quoting before copying.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>Import or export as needed</span></summary>
    <div class="tool-guidance-answer">
      <p>Paste an existing curl command to populate supported fields, or export the generated review as command text, PDF, CSV, or JSON.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-examples generate-curl-shell-markdown-card-commands">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Commands</span></h2>
  <p>Copy a sample, replace the URL and placeholders, then review method, headers, and retry behavior before running it.</p>

  <pre class="generate-curl-shell-command-pre"><code>curl --fail --show-error --location https://api.example.com/health</code></pre>
  <details class="generate-curl-shell-command-note">
    <summary>
      <span class="generate-curl-shell-command-note-label generate-curl-shell-command-note-label-closed">Show command use</span>
      <span class="generate-curl-shell-command-note-label generate-curl-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-curl-shell-command-copy-btn" data-command-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Health probe:</strong> Follows redirects and returns a failing exit status for HTTP error responses.</div></div>
  </details>

  <pre class="generate-curl-shell-command-pre"><code>curl --request POST --header 'Content-Type: application/json' --data-raw '{"name":"demo"}' https://api.example.com/v1/items</code></pre>
  <details class="generate-curl-shell-command-note">
    <summary>
      <span class="generate-curl-shell-command-note-label generate-curl-shell-command-note-label-closed">Show command use</span>
      <span class="generate-curl-shell-command-note-label generate-curl-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-curl-shell-command-copy-btn" data-command-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>JSON POST:</strong> Shows method, content type, and raw JSON body in one request.</div></div>
  </details>

  <pre class="generate-curl-shell-command-pre"><code>curl --output app.tar.gz --location --retry 3 https://downloads.example.com/releases/app.tar.gz</code></pre>
  <details class="generate-curl-shell-command-note">
    <summary>
      <span class="generate-curl-shell-command-note-label generate-curl-shell-command-note-label-closed">Show command use</span>
      <span class="generate-curl-shell-command-note-label generate-curl-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-curl-shell-command-copy-btn" data-command-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Artifact download:</strong> Writes to a named file and retries transient transfer failures.</div></div>
  </details>

  <pre class="generate-curl-shell-command-pre"><code>curl --head --verbose --connect-timeout 5 https://example.com/</code></pre>
  <details class="generate-curl-shell-command-note generate-curl-shell-command-note-last">
    <summary>
      <span class="generate-curl-shell-command-note-label generate-curl-shell-command-note-label-closed">Show command use</span>
      <span class="generate-curl-shell-command-note-label generate-curl-shell-command-note-label-open">Hide command use</span>
      <button type="button" class="generate-curl-shell-command-copy-btn" data-command-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy command</span></button>
    </summary>
    <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Header trace:</strong> Prints request and response details without downloading the response body.</div></div>
  </details>
</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-export">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>Exports preserve the generated request review. They do not send the request or validate the remote endpoint.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-clipboard" aria-hidden="true"></i></span> <span>Copy Command</span></summary>
    <div class="tool-export-answer">
      <p>Copies the rendered curl command for the selected shell style.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i></span> <span>PDF</span></summary>
    <div class="tool-export-answer">
      <p>Opens a print-ready report with the command, summary, warnings, and generated options.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i></span> <span>CSV</span></summary>
    <div class="tool-export-answer">
      <p>Downloads the option rows so reviewers can inspect methods, flags, values, and generated notes.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span> <span>JSON and Import</span></summary>
    <div class="tool-export-answer">
      <p>Copies or downloads the normalized payload for review. JSON is not imported back into this workspace; the import panel accepts pasted curl command text and non-sensitive page state can restore from the URL.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-faq">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>These answers define the request-generation boundary, import behavior, credential handling, and JSON export expectations.</p>

  <details class="faq-item" open>
    <summary><span>Does the tool send the HTTP request?</span></summary>
    <div class="faq-answer">
      <p>No. It only generates command text and export data.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Can I paste an existing curl command?</span></summary>
    <div class="faq-answer">
      <p>Yes. The import panel accepts command text that starts with <code>curl</code> and maps supported options into the form for review.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Should credentials go in the command?</span></summary>
    <div class="faq-answer">
      <p>Use placeholders in shared output. Add real credentials only in the terminal or a local secret-aware workflow.</p>
    </div>
  </details>

  <details class="faq-item">
    <summary><span>Does JSON restore work here?</span></summary>
    <div class="faq-answer">
      <p>No. JSON can be copied or downloaded for review, but this curl workspace imports pasted command text rather than JSON files.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.11_glossary -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-glossary">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-book" aria-hidden="true"></i><span>Glossary</span></h2>
  <p>Use this glossary to decode the HTTP and curl terms used by the generated command and option table.</p>

  <table>
    <thead>
      <tr>
        <th>Term</th>
        <th>Meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Header</td>
        <td>HTTP metadata field such as <code>Accept</code>, <code>Authorization</code>, or <code>Content-Type</code>.</td>
      </tr>
      <tr>
        <td>Body</td>
        <td>Request payload sent with methods such as POST, PUT, or PATCH.</td>
      </tr>
      <tr>
        <td>Idempotent</td>
        <td>An operation designed so repeating it has the same intended effect as running it once.</td>
      </tr>
      <tr>
        <td>TLS</td>
        <td>Transport Layer Security, used by HTTPS to protect the connection.</td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.11_glossary -->

<!-- ns:start main.content.10_references -->
<div class="content-card generate-curl-shell-markdown-card generate-curl-shell-markdown-card-citations">
  <h2 class="generate-curl-shell-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>
  <p>These sources support the in-text citations used in this tool page.</p>

  <table class="generate-curl-shell-citation-table">
    <thead>
      <tr>
        <th>Source type</th>
        <th>In-text citation</th>
        <th>Reference</th>
      </tr>
    </thead>
    <tbody>
      <tr id="generate-curl-shell-ref-primary">
        <td>Project documentation</td>
        <td><a class="generate-curl-shell-citation-backlink" href="#generate-curl-shell-cite-primary"><span class="generate-curl-shell-citation-inline">(curl project, n.d.)</span></a></td>
        <td>curl project. (n.d.). <em>curl man page</em>. Retrieved May 16, 2026, from <a href="https://curl.se/docs/manpage.html">https://curl.se/docs/manpage.html</a></td>
      </tr>
      <tr id="generate-curl-shell-ref-method">
        <td>RFC</td>
        <td><a class="generate-curl-shell-citation-backlink" href="#generate-curl-shell-cite-method"><span class="generate-curl-shell-citation-inline">(Fielding et al., 2022)</span></a></td>
        <td>Fielding, R., Nottingham, M., &amp; Reschke, J. (2022). <em>RFC 9110: HTTP Semantics</em>. Internet Engineering Task Force. <a href="https://www.rfc-editor.org/rfc/rfc9110.html">https://www.rfc-editor.org/rfc/rfc9110.html</a></td>
      </tr>
      <tr id="generate-curl-shell-ref-review">
        <td>Book</td>
        <td><a class="generate-curl-shell-citation-backlink" href="#generate-curl-shell-cite-review"><span class="generate-curl-shell-citation-inline">(Stenberg, n.d.)</span></a></td>
        <td>Stenberg, D. (n.d.). <em>Command line concepts</em>. Everything curl. Retrieved May 16, 2026, from <a href="https://everything.curl.dev/cmdline/index.html">https://everything.curl.dev/cmdline/index.html</a></td>
      </tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
