[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-overview">

<h2 class="scan-header-security-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

Header Security Scanner is a browser-owned workspace for preparing a security-header review model before observed response data is collected. It records the target, review baseline, request method intent, timeout budget, redirect handling, CSP rollout mode, HSTS expectation, cookie posture, emphasized headers, and policy notes, then turns those inputs into findings, evidence rows, review surface rows, policy notes, CSV output, and restore-ready JSON.

The workspace does not fetch a URL, crawl a site, or prove that an application is secure. Use it to standardize what should be checked, preserve a review artifact, and hand off header expectations before or alongside observed response evidence. <a id="scan-header-security-cite-csp" class="scan-header-security-citation-link" href="#scan-header-security-ref-csp"><span class="scan-header-security-citation-inline">MDN contributors (2026a)</span></a> describe Content Security Policy as a response-header mechanism for controlling resource loading, so this tool keeps CSP mode and policy notes explicit instead of hiding them in a generic "header present" row.

Security headers are only one part of application review. <a id="scan-header-security-cite-hsts" class="scan-header-security-citation-link" href="#scan-header-security-ref-hsts"><span class="scan-header-security-citation-inline">MDN contributors (2026b)</span></a> explain that HSTS affects future browser requests after an HTTPS response sets the policy, while <a id="scan-header-security-cite-cookies" class="scan-header-security-citation-link" href="#scan-header-security-ref-cookies"><span class="scan-header-security-citation-inline">MDN contributors (2026c)</span></a> describe cookie attributes such as <code>Secure</code>, <code>HttpOnly</code>, and <code>SameSite</code> as request and storage controls. The workspace therefore separates CSP, HSTS, and cookies into visible review fields.

<div class="scan-header-security-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Workspace area</th>
      <th>What it produces</th>
      <th>Review boundary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Input brief</td>
      <td>Target URL or route plus application context.</td>
      <td>No network request is sent from the browser or server.</td>
    </tr>
    <tr>
      <td>Basic settings</td>
      <td>Baseline, request method, timeout, and redirect handling.</td>
      <td>These are intended evidence settings, not observed server behavior.</td>
    </tr>
    <tr>
      <td>Custom settings</td>
      <td>TLS validation intent, fallback behavior, user-agent profile, CSP mode, HSTS max-age, cookie posture, public-file notes, and header emphasis.</td>
      <td>Use real response headers later to confirm each finding row.</td>
    </tr>
    <tr>
      <td>Output</td>
      <td>Findings, evidence rows, surface notes, cookie review rows, policy notes, CSV, and JSON.</td>
      <td>Exports preserve the local review model for handoff and restore.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-technical">

<h2 class="scan-header-security-section-heading"><i class="bi bi-shield-lock" aria-hidden="true"></i><span>Technical Details</span></h2>

The workspace builds one normalized header-review model from the target, baseline, request options, header policy controls, cookie posture, and notes. That model drives the score card, metric chips, findings table, evidence table, review surface rows, cookie rows, CSV output, copied JSON, downloaded JSON, and JSON restore. The model is local and deterministic: changing a control changes the generated output, but the page never turns the target into observed evidence by itself.

The content model follows source-backed header concepts. <a id="scan-header-security-cite-technical-csp" class="scan-header-security-citation-link" href="#scan-header-security-ref-csp"><span class="scan-header-security-citation-inline">MDN contributors (2026a)</span></a> document CSP as a response header with directives that constrain resource loading and reporting behavior. <a id="scan-header-security-cite-technical-hsts" class="scan-header-security-citation-link" href="#scan-header-security-ref-hsts"><span class="scan-header-security-citation-inline">MDN contributors (2026b)</span></a> document HSTS as an HTTPS response header that tells browsers to use HTTPS for future access to the host. <a id="scan-header-security-cite-technical-owasp" class="scan-header-security-citation-link" href="#scan-header-security-ref-owasp"><span class="scan-header-security-citation-inline">OWASP Cheat Sheet Series (n.d.)</span></a> groups common HTTP response headers as hardening guidance, but the tool still treats every row as a review prompt rather than a security verdict.

<div class="tool-technical-scan-grid" aria-label="Technical Details quick scan">
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">First pass</span>
    <strong>Start with intended evidence.</strong>
    <ul>
      <li>Confirm the target, context label, baseline, request method, redirect setting, TLS setting, and timestamp.</li>
      <li>Check generated findings against the policy fields before assigning remediation.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Header model</span>
    <strong>Separate policy classes.</strong>
    <ul>
      <li>Read CSP, HSTS, cookies, disclosure headers, and public-file notes as different review surfaces.</li>
      <li>Use the evidence tab to preserve the expected header names and generated finding text.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Handoff</span>
    <strong>Keep context with rows.</strong>
    <ul>
      <li>Use CSV for triage rows and JSON for the full restore payload.</li>
      <li>Keep policy notes close to the finding because ownership often differs by header.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Stop line</span>
    <strong>Do not overread the score.</strong>
    <ul>
      <li>The workspace does not collect response headers, test TLS, crawl routes, or inspect application code.</li>
      <li>A complete model is not proof that a live endpoint is hardened.</li>
    </ul>
  </section>
</div>

<h3 class="scan-header-security-technical-step-heading">1. Header Review Model</h3>

The tool starts from the target and treats every other field as review intent. The target identifies the application, route, API, or environment being discussed. The context label helps human reviewers separate a login page from an API endpoint, an admin route, a CDN edge, or a staging host. The baseline selects how strict the generated findings should be, but it does not create a live measurement.

This difference matters because security-header review can be confused with security-header scanning. A scanner sends a request and records the actual response. This workspace prepares the model that says what will be checked, what request style should be used, which policy families matter, and what notes should travel with the result. It is useful when the team needs a repeatable review artifact before a change, during design review, or after collecting external evidence in another workflow.

<h3 class="scan-header-security-technical-step-heading">2. Request Intent And Evidence Settings</h3>

The Basic panel records whether the intended request should use <code>HEAD</code> or <code>GET</code>, whether redirects should be followed, and how long a future evidence request should wait. HEAD is often enough for response headers, but GET can be necessary when a proxy, WAF, CDN, or application framework returns different headers for normal content delivery. Redirect following is usually useful because the final user-facing URL may be where the policy actually appears.

The Custom panel adds TLS validation intent, GET fallback intent, user-agent profile, optional public-file review, and HTTP upgrade notes. These fields are deliberately named as intent. They tell the reviewer how evidence should be collected later. They do not say that the certificate chain was checked, that a redirect was followed, or that the public files exist.

<h3 class="scan-header-security-technical-step-heading">3. CSP Interpretation</h3>

CSP is modeled separately because it is rarely a yes-or-no control. A policy can be enforced, report-only, both, missing, too permissive, or staged during rollout. <a id="scan-header-security-cite-csp-reporting" class="scan-header-security-citation-link" href="#scan-header-security-ref-csp"><span class="scan-header-security-citation-inline">MDN contributors (2026a)</span></a> describe both enforcement and reporting behavior, including report endpoints. That is why the workspace exposes CSP mode and policy notes instead of only asking for a header name.

For human review, CSP should be read against the endpoint type. A public marketing page, authenticated app, embedded widget, and API response have different resource-loading needs. A strict policy that breaks required scripts is not a successful rollout. A loose policy that allows broad inline script or unbounded origins may be a warning even if the header exists. The generated finding should become a prompt to inspect the actual policy string and rollout context.

<h3 class="scan-header-security-technical-step-heading">4. HSTS Interpretation</h3>

HSTS is modeled as a transport-retention signal. <a id="scan-header-security-cite-hsts-max-age" class="scan-header-security-citation-link" href="#scan-header-security-ref-hsts"><span class="scan-header-security-citation-inline">MDN contributors (2026b)</span></a> describe <code>max-age</code>, <code>includeSubDomains</code>, and <code>preload</code> as directives with host-level effects. A long max-age can be appropriate for stable HTTPS-only sites, but it can also lock users into failures if certificate or subdomain readiness is poor. The tool records the expected max-age so that review can separate "header absent" from "header present but rollout needs care."

Do not read the HSTS row as live browser behavior. It says what the model expects and what should be checked when observed evidence is available. The reviewer still needs to confirm the final HTTPS response, whether all intended subdomains are ready, whether preload is intentionally in scope, and whether rollback or certificate operations have been considered.

<h3 class="scan-header-security-technical-step-heading">5. Cookie Posture</h3>

Cookie review is context-sensitive. <a id="scan-header-security-cite-cookie-attributes" class="scan-header-security-citation-link" href="#scan-header-security-ref-cookies"><span class="scan-header-security-citation-inline">MDN contributors (2026c)</span></a> describe how cookies carry state and how attributes such as <code>Secure</code>, <code>HttpOnly</code>, and <code>SameSite</code> influence transport, script access, and cross-site request behavior. The workspace therefore lets the reviewer include cookies, review them separately, or skip cookie rows when the endpoint should not set cookies.

A cookie row is not automatically a vulnerability row. Some responses should not set cookies at all. Some cookies are non-sensitive. Some application frameworks set multiple cookies where only a subset represents session state. Use the generated rows to preserve the expected review path, then confirm actual <code>Set-Cookie</code> headers and classify ownership with the application team.

<h3 class="scan-header-security-technical-step-heading">6. Disclosure And Public Coordination Signals</h3>

The tool includes emphasized header names and public-file review notes because real remediation often happens at several layers. Server, framework, platform, CDN, and proxy headers can disclose versions, runtime details, or internal routing hints. Public files such as <code>security.txt</code> and <code>robots.txt</code> can communicate coordination or indexing intent. None of those rows proves exploitability, but they help a reviewer decide where a cleanup or ownership task belongs.

The emphasized-header field is especially useful for local standards. If a team cares about <code>Permissions-Policy</code>, <code>Referrer-Policy</code>, <code>X-Content-Type-Options</code>, or a house-specific header, put it in the model instead of relying on memory. The generated output then keeps that local expectation visible in the findings and export.

<h3 class="scan-header-security-technical-step-heading">7. Score And Finding Boundaries</h3>

The score card is a triage aid. It summarizes the local model, warning count, failure count, and readiness language. It is not a compliance rating, exploitability score, vulnerability severity, browser compatibility proof, or production readiness claim. The wording should stay close to the evidence: what is expected, what is missing from the model, what needs observed evidence, and what should be reviewed by an owner.

Findings should travel with notes. A CSP row needs policy context. An HSTS row needs rollout context. A cookie row needs session context. A disclosure row needs ownership context. A public-file row needs coordination context. The CSV export is useful because it keeps those rows easy to sort and assign, while the JSON export keeps the model restorable.

<h3 class="scan-header-security-technical-step-heading">8. Export And Restore Data</h3>

CSV contains generated triage rows. JSON contains target, baseline, method intent, timeout, redirect handling, Custom controls, generated summary, findings, evidence rows, policy notes, cookie rows, and tool metadata. Import JSON restores the review model in the browser. It should be imported only into this tool because the schema is tool-specific.

JSON restore is valuable when a review needs to be reopened after the observed header evidence arrives. Start with a local model, export JSON, collect evidence, reopen the model, and update notes. That creates a small audit trail without pretending the browser owns live network truth.

<h3 class="scan-header-security-technical-step-heading">9. Practical Review Checklist</h3>

Use the output as a compact review file:

<ul class="tool-technical-checklist">
  <li><strong>Intent:</strong> Confirm the target, route, context label, owner, and reason for review.</li>
  <li><strong>Request:</strong> Confirm method, redirect behavior, timeout, TLS validation intent, fallback behavior, and user-agent profile.</li>
  <li><strong>Policy:</strong> Check CSP mode, HSTS max-age, cookie posture, public-file choice, and emphasized header list.</li>
  <li><strong>Evidence:</strong> Pair generated rows with real headers before assigning remediation.</li>
  <li><strong>Ownership:</strong> Map each row to application, ingress, CDN, proxy, security, platform, or operations owner.</li>
  <li><strong>Closure:</strong> Keep before-and-after evidence with the ticket instead of closing work from the score alone.</li>
</ul>

<h3 class="scan-header-security-technical-step-heading">10. What The Workspace Does Not Prove</h3>

The workspace does not prove authentication quality, authorization rules, input validation, dependency health, TLS certificate validity, browser compatibility, cookie sensitivity, endpoint reachability, WAF behavior, CDN behavior, or production readiness. It does not replace a public scanner, browser trace, curl capture, proxy log, penetration test, or application security review.

<ul class="tool-technical-warning-list">
  <li>A clean local model does not prove that a live endpoint sends the expected headers.</li>
  <li>A missing expected header in the model does not prove exploitability.</li>
  <li>A strong HSTS expectation still needs certificate, subdomain, and rollout review.</li>
  <li>A cookie-posture warning still needs session sensitivity and application-flow context.</li>
  <li>Exports preserve workspace state; they do not verify external systems.</li>
</ul>

<div class="scan-header-security-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Review layer</th>
      <th>What the workspace models</th>
      <th>What evidence must confirm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Transport</td>
      <td>HTTPS expectation, HSTS max-age, redirect handling, TLS validation intent, and HTTP upgrade notes.</td>
      <td>Actual final URL, certificate behavior, HTTPS response, HSTS value, and redirect chain.</td>
    </tr>
    <tr>
      <td>Browser policy</td>
      <td>CSP mode, emphasized security headers, referrer and permissions review notes.</td>
      <td>Actual header names, header values, policy syntax, and endpoint-specific fit.</td>
    </tr>
    <tr>
      <td>Session hints</td>
      <td>Cookie review scope and expected attribute posture.</td>
      <td>Actual <code>Set-Cookie</code> rows and whether each cookie belongs to a sensitive flow.</td>
    </tr>
    <tr>
      <td>Coordination</td>
      <td>Public-file review intent and policy notes.</td>
      <td>Whether files exist, are owned, and contain current contact or indexing guidance.</td>
    </tr>
    <tr>
      <td>Handoff</td>
      <td>Findings, evidence rows, notes, CSV, and JSON restore data from one normalized model.</td>
      <td>Owner assignment, retest method, acceptance notes, and final observed response evidence.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-examples scan-header-security-markdown-card-commands">

<h2 class="scan-header-security-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Review Inputs</span></h2>

<p>Copy one of these review inputs into the target field, then match the Basic and Custom settings to the scenario before preparing the review artifact.</p>

<pre class="scan-header-security-example-input"><code>https://app.example.com/login</code></pre>
<details class="scan-header-security-input-note">
  <summary>
    <span class="scan-header-security-input-note-label scan-header-security-input-note-label-closed">Show input use</span>
    <span class="scan-header-security-input-note-label scan-header-security-input-note-label-open">Hide input use</span>
    <button type="button" class="scan-header-security-input-copy-btn" data-scan-input-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy input</span></button>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Login route:</strong> Include cookies, review CSP as enforced or staged, and keep HSTS expectations visible.</div></div>
</details>

<pre class="scan-header-security-example-input"><code>https://api.example.com/v1/session</code></pre>
<details class="scan-header-security-input-note">
  <summary>
    <span class="scan-header-security-input-note-label scan-header-security-input-note-label-closed">Show input use</span>
    <span class="scan-header-security-input-note-label scan-header-security-input-note-label-open">Hide input use</span>
    <button type="button" class="scan-header-security-input-copy-btn" data-scan-input-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy input</span></button>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>API route:</strong> Use the API baseline, decide whether cookies apply, and note expected CORS ownership separately.</div></div>
</details>

<pre class="scan-header-security-example-input"><code>https://static.example.com/assets/app.js</code></pre>
<details class="scan-header-security-input-note">
  <summary>
    <span class="scan-header-security-input-note-label scan-header-security-input-note-label-closed">Show input use</span>
    <span class="scan-header-security-input-note-label scan-header-security-input-note-label-open">Hide input use</span>
    <button type="button" class="scan-header-security-input-copy-btn" data-scan-input-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy input</span></button>
  </summary>
  <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Static asset:</strong> Emphasize MIME sniffing, cache boundaries, and disclosure headers rather than session cookies.</div></div>
</details>

<pre class="scan-header-security-example-input"><code>https://www.example.com/.well-known/security.txt</code></pre>
<details class="scan-header-security-input-note scan-header-security-input-note-last">
  <summary>
    <span class="scan-header-security-input-note-label scan-header-security-input-note-label-closed">Show input use</span>
    <span class="scan-header-security-input-note-label scan-header-security-input-note-label-open">Hide input use</span>
    <button type="button" class="scan-header-security-input-copy-btn" data-scan-input-copy-index="3"><i class="bi bi-clipboard" aria-hidden="true"></i><span>Copy input</span></button>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Coordination file:</strong> Keep public-file review enabled and document who owns the contact or policy content.</div></div>
</details>

</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-interpretation scan-header-security-markdown-card-input-tips">

<h2 class="scan-header-security-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Input Tips</span></h2>

<p>Use the controls to describe how evidence should be reviewed later. The tool is strongest when the input separates route type, expected header policy, and ownership notes.</p>

<details class="tool-guidance-item" open>
  <summary><span class="tool-guidance-icon"><i class="bi bi-bullseye" aria-hidden="true"></i></span> <span>Name the reviewed surface</span></summary>
  <div class="tool-guidance-answer">
    <p>Use a route or endpoint that matches the intended evidence. A homepage, login route, API response, static asset, and security contact file can produce different header expectations.</p>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-shield-check" aria-hidden="true"></i></span> <span>Keep CSP rollout explicit</span></summary>
  <div class="tool-guidance-answer">
    <p>Set CSP to enforced, report-only, or both. Put rollout notes in the policy field so reviewers know whether a missing or report-only policy is a deliberate transition state.</p>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-clock-history" aria-hidden="true"></i></span> <span>Review HSTS as an operational commitment</span></summary>
  <div class="tool-guidance-answer">
    <p>A long HSTS max-age can be desirable, but only when HTTPS, certificates, subdomains, and rollback expectations are understood. Record the expected value before checking live evidence.</p>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-cookie" aria-hidden="true"></i></span> <span>Classify cookie relevance</span></summary>
  <div class="tool-guidance-answer">
    <p>Include cookies for login, session, and authenticated app routes. Skip or separate cookie review for public static routes where cookies are not expected.</p>
  </div>
</details>

</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-how-to">
  <h2 class="scan-header-security-section-heading"><i class="bi bi-list-check scan-header-security-section-heading-icon" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to turn header-review intent into a portable artifact. Generate the model first, collect observed response evidence separately, then return to the model when notes or ownership need to be updated.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-link-45deg" aria-hidden="true"></i></span> <span>1. Enter the target</span></summary>
    <div class="tool-guidance-answer">
      <p>Paste the route, endpoint, API path, or public-file URL being reviewed. Add a short context label in Basic settings when the route type matters.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>2. Select request intent</span></summary>
    <div class="tool-guidance-answer">
      <p>Choose the baseline, method, timeout, and redirect behavior that should be used when observed evidence is gathered later.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span> <span>3. Tune Custom controls</span></summary>
    <div class="tool-guidance-answer">
      <p>Set TLS validation intent, user-agent profile, CSP mode, HSTS max-age, cookie posture, public-file review, emphasized headers, and policy notes.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-table" aria-hidden="true"></i></span> <span>4. Prepare and inspect rows</span></summary>
    <div class="tool-guidance-answer">
      <p>Click <code>Prepare Review</code>, then read Findings, Evidence, Surface, Notes, and JSON before assigning work.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>5. Export or restore</span></summary>
    <div class="tool-guidance-answer">
      <p>Use CSV for triage rows and JSON when the full review model should be saved, shared, or restored later.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-export">
  <h2 class="scan-header-security-section-heading"><i class="bi bi-download scan-header-security-section-heading-icon" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>Exports preserve the local review model. They do not prove that a target has been contacted or that response headers match the generated rows.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i></span> <span>Export PDF</span></summary>
    <div class="tool-export-answer">
      <p>Opens a print-ready review report with the target, score card, findings, evidence, notes, and generated context.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i></span> <span>Download CSV</span></summary>
    <div class="tool-export-answer">
      <p>Downloads the finding rows for ticket triage, owner assignment, or comparison with observed evidence.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span> <span>Copy JSON / Download JSON</span></summary>
    <div class="tool-export-answer">
      <p>Preserves the complete review state, including target, controls, findings, evidence rows, notes, generated output, and tool metadata.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-upload" aria-hidden="true"></i></span> <span>Import JSON</span></summary>
    <div class="tool-export-answer">
      <p>Restores JSON created by this tool so the review model can be reopened and updated in the browser.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-faq">

<h2 class="scan-header-security-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>

<p>These answers keep the review boundary clear before anyone treats generated rows as live evidence.</p>

<details class="faq-item" open>
  <summary><span>Does this tool scan my target?</span></summary>
  <div class="faq-answer"><p>No. It prepares a local security-header review artifact. Use observed response evidence before assigning remediation.</p></div>
</details>

<details class="faq-item">
  <summary><span>Why keep request method and timeout settings?</span></summary>
  <div class="faq-answer"><p>They document how evidence should be gathered later, especially when HEAD and GET return different headers or when a proxy responds differently by request profile.</p></div>
</details>

<details class="faq-item">
  <summary><span>Can I use the score as a security rating?</span></summary>
  <div class="faq-answer"><p>No. The score summarizes the local model and generated rows. It is not a vulnerability severity, compliance score, or production-readiness result.</p></div>
</details>

<details class="faq-item">
  <summary><span>What should I export?</span></summary>
  <div class="faq-answer"><p>Use CSV for triage rows. Use JSON when you need to preserve and restore the full review state.</p></div>
</details>

</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.11_glossary -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-glossary">
  <h2 class="scan-header-security-section-heading"><i class="bi bi-book" aria-hidden="true"></i><span>Glossary</span></h2>
  <p>Use these terms to keep the review language precise when moving from pasted header evidence to a browser or command-line validation pass.</p>
  <table>
    <thead><tr><th>Term</th><th>Meaning</th><th>Why it matters in this tool</th></tr></thead>
    <tbody>
      <tr><td>Content Security Policy</td><td>A response header that tells supporting browsers which sources are allowed for scripts, styles, frames, images, and other content.</td><td>The tool treats CSP as a high-value hardening signal, but the final policy still needs route-specific review.</td></tr>
      <tr><td>Strict Transport Security</td><td>A response header that asks browsers to use HTTPS for future requests to the host for a declared period.</td><td>Missing, tiny, or preload-incomplete HSTS values often become follow-up items in the generated review notes.</td></tr>
      <tr><td>Cookie Attribute</td><td>A flag or property on a Set-Cookie value, such as Secure, HttpOnly, SameSite, Path, Domain, Max-Age, or Expires.</td><td>Cookie attribute coverage helps separate transport, script-access, and cross-site request risks in the output.</td></tr>
      <tr><td>Observed Evidence</td><td>The pasted URL, response headers, cookies, manual notes, and requested header inventory captured in the workspace state.</td><td>Exports preserve this evidence so another reviewer can understand exactly what was assessed.</td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.11_glossary -->

<!-- ns:start main.content.10_references -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-citations">

<h2 class="scan-header-security-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>

<p>These sources support the in-text citations used in this tool page.</p>

<table class="scan-header-security-citation-table">
  <thead>
    <tr>
      <th>Source type</th>
      <th>In-text citation</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr id="scan-header-security-ref-csp">
      <td>Website</td>
      <td><a class="scan-header-security-citation-backlink" href="#scan-header-security-cite-csp"><span class="scan-header-security-citation-inline">(MDN contributors, 2026a)</span></a></td>
      <td>MDN contributors. (2026a). <em>Content-Security-Policy (CSP) header</em>. MDN Web Docs. Retrieved May 31, 2026. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy">https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy</a></td>
    </tr>
    <tr id="scan-header-security-ref-hsts">
      <td>Website</td>
      <td><a class="scan-header-security-citation-backlink" href="#scan-header-security-cite-hsts"><span class="scan-header-security-citation-inline">(MDN contributors, 2026b)</span></a></td>
      <td>MDN contributors. (2026b). <em>Strict-Transport-Security header</em>. MDN Web Docs. Retrieved May 31, 2026. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security">https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security</a></td>
    </tr>
    <tr id="scan-header-security-ref-cookies">
      <td>Website</td>
      <td><a class="scan-header-security-citation-backlink" href="#scan-header-security-cite-cookies"><span class="scan-header-security-citation-inline">(MDN contributors, 2026c)</span></a></td>
      <td>MDN contributors. (2026c). <em>Using HTTP cookies</em>. MDN Web Docs. Retrieved May 31, 2026. <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies">https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies</a></td>
    </tr>
    <tr id="scan-header-security-ref-owasp">
      <td>Website</td>
      <td><a class="scan-header-security-citation-backlink" href="#scan-header-security-cite-technical-owasp"><span class="scan-header-security-citation-inline">(OWASP Cheat Sheet Series, n.d.)</span></a></td>
      <td>OWASP Cheat Sheet Series. (n.d.). <em>HTTP Headers Cheat Sheet</em>. Retrieved May 31, 2026. <a href="https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html">https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html</a></td>
    </tr>
  </tbody>
</table>

</div>
<!-- ns:end main.content.10_references -->
