[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-overview">

<h2 class="scan-web-security-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

Web Security Scanner is an InfraStack security workspace for checking a public web endpoint from the application server and turning visible response behavior into reviewable findings. <a id="scan-web-security-cite-primary" class="scan-web-security-citation-link" href="#scan-web-security-ref-primary"><span class="scan-web-security-citation-inline">OWASP (n.d.)</span></a> organizes common HTTP security response headers for browser-facing hardening, so this scanner treats headers as review evidence rather than proof of application security.

<a id="scan-web-security-cite-method" class="scan-web-security-citation-link" href="#scan-web-security-ref-method"><span class="scan-web-security-citation-inline">IETF (2012)</span></a> standardizes HTTP Strict Transport Security, which is why HSTS appears as a separate HTTPS retention finding.

<a id="scan-web-security-cite-review" class="scan-web-security-citation-link" href="#scan-web-security-ref-review"><span class="scan-web-security-citation-inline">IETF (2022)</span></a> defines HTTP semantics for request and response behavior, so server-side header evidence still needs application-context review before remediation is assigned.

It inspects the signals that are exposed at the edge: <span class="scan-web-security-term-accent">HTTPS</span>, redirect posture, HSTS, CSP, frame protection, MIME sniffing protection, referrer and permissions policy, disclosure headers, cookie attributes, CORS exposure, and well-known files such as <code>security.txt</code> and <code>robots.txt</code>.

Use the workspace when you need a quick hardening review that can be copied into a ticket, shared as JSON, or exported as a findings table. The result is useful for triage, change validation, baseline checks, and review notes. Treat the result as visible response evidence, not as proof that the application, dependencies, cloud account, or runtime are secure.

<div class="scan-web-security-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Workspace area</th>
      <th>What it gives you</th>
      <th>What to review next</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Target</td>
      <td>A normalized public HTTP or HTTPS URL checked from the server side.</td>
      <td>Confirm you are authorized to review the target and that private targets are out of scope.</td>
    </tr>
    <tr>
      <td>Request options</td>
      <td>HEAD or GET selection, redirect handling, timeout, TLS validation, user-agent profile, and companion probes.</td>
      <td>Use GET or a browser-like user agent when the server sends different headers for normal content delivery.</td>
    </tr>
    <tr>
      <td>Findings</td>
      <td>Pass, warning, failure, or informational rows with evidence and remediation hints.</td>
      <td>Prioritize transport failures, missing HSTS on HTTPS, weak cookies, and permissive CORS first.</td>
    </tr>
    <tr>
      <td>Evidence</td>
      <td>Header matrix, cookie rows, transport summary, well-known file probes, and JSON output.</td>
      <td>Use the raw evidence when assigning remediation work.</td>
    </tr>
    <tr>
      <td>Exports</td>
      <td>PDF, CSV, copied JSON, and downloaded JSON for different review workflows.</td>
      <td>Use CSV for triage rows and JSON when the complete scan payload needs to be archived.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-technical">

<h2 class="scan-web-security-section-heading"><i class="bi bi-shield-lock" aria-hidden="true"></i><span>Technical Details</span></h2>

The scanner builds one result payload from the target URL, request options, server response, companion probes, and generated findings. That payload drives the hardening score, tabs, CSV output, copied JSON, and downloaded JSON.

The technical checks stay tied to security-header and protocol sources. <a id="scan-web-security-cite-technical-primary" class="scan-web-security-citation-link" href="#scan-web-security-ref-primary"><span class="scan-web-security-citation-inline">OWASP (n.d.)</span></a> anchors the response-header review scope, <a id="scan-web-security-cite-technical-method" class="scan-web-security-citation-link" href="#scan-web-security-ref-method"><span class="scan-web-security-citation-inline">IETF (2012)</span></a> anchors HSTS as an HTTPS retention signal, and <a id="scan-web-security-cite-technical-review" class="scan-web-security-citation-link" href="#scan-web-security-ref-review"><span class="scan-web-security-citation-inline">IETF (2022)</span></a> anchors the request and response semantics that make method, redirect, and final URL context matter.

<div class="tool-technical-scan-grid" aria-label="Technical Details quick scan">
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">First scan</span>
    <strong>Start with edge evidence.</strong>
    <ul>
      <li>Confirm the target, final URL, request method, redirect setting, TLS setting, and timestamp.</li>
      <li>Check transport failures before reading warnings or score changes.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Request path</span>
    <strong>Repeat with the right profile.</strong>
    <ul>
      <li>Use GET when HEAD hides application or CDN headers.</li>
      <li>Match user-agent and TLS validation to the review path you need to defend.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Handoff</span>
    <strong>Keep evidence with ownership.</strong>
    <ul>
      <li>Use CSV for triage rows and JSON for the full scan payload.</li>
      <li>Assign headers, cookies, CORS, transport, and disclosure findings to the layer that owns them.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Stop line</span>
    <strong>Do not overread the score.</strong>
    <ul>
      <li>The scanner observes public responses; it does not inspect code, auth, dependencies, or private networks.</li>
      <li>A high score is not security proof, and a low score still needs endpoint context.</li>
    </ul>
  </section>
</div>

<h3 class="scan-web-security-technical-step-heading">1. Server-side request model</h3>

The primary request runs from the Symfony backend so normal browser CORS restrictions do not block header inspection. The scanner accepts only HTTP and HTTPS URLs, normalizes missing schemes to HTTPS, resolves host addresses, and rejects local or private network targets.

That boundary matters. The tool is intended for public endpoints that you are allowed to review. It is not built for internal host discovery, SSRF testing, authenticated application crawling, or private service enumeration.

<h3 class="scan-web-security-technical-step-heading">2. Request controls</h3>

The workspace supports HEAD or GET, redirect following, timeout limits, TLS validation, GET fallback when HEAD returns <code>405</code>, user-agent profiles, well-known file probes, and HTTP-to-HTTPS upgrade probing. Those controls are synced into the page URL so the same scan setup can be reopened.

HEAD is faster and usually enough for response headers. GET is better when a server, CDN, WAF, reverse proxy, or application layer returns different headers for normal page delivery. Redirect following should stay enabled for most reviews because the final destination is usually the user-facing security boundary.

<h3 class="scan-web-security-technical-step-heading">3. Finding classification</h3>

Findings are practical posture checks. Transport failures and missing HTTPS are treated more severely than context-sensitive headers. Missing CSP, frame protection, referrer policy, permissions policy, and disclosure headers are warnings unless the surrounding response makes them more urgent.

The score is a triage aid. It helps compare visible hardening posture between runs, but it is not a compliance score, exploitability rating, or security certification.

<h3 class="scan-web-security-technical-step-heading">4. Header and cookie review</h3>

Header checks focus on common browser-facing controls:

- HSTS uses <code>Strict-Transport-Security</code> for HTTPS retention.
- CSP uses <code>Content-Security-Policy</code> for resource loading boundaries.
- Frame protection uses <code>X-Frame-Options</code> or <code>frame-ancestors</code> for clickjacking resistance.
- MIME protection uses <code>X-Content-Type-Options</code> for sniffing resistance.
- Referrer policy uses <code>Referrer-Policy</code> for referrer data exposure.
- Permissions policy uses <code>Permissions-Policy</code> for browser capability limits.
- Disclosure review catches headers that reveal framework, platform, proxy, or runtime details.

Cookie checks look for <code>Secure</code>, <code>HttpOnly</code>, and <code>SameSite</code> attributes when cookies are visible in the response. A response with no cookies is reported separately from a response with weak cookies.

<h3 class="scan-web-security-technical-step-heading">5. CORS and public file probes</h3>

CORS checks look for overly broad or risky cross-origin read behavior in visible response headers. A permissive value can be legitimate for a public API, but it should still be reviewed against the expected client origins and credential behavior.

Well-known file probes check public paths such as <code>/.well-known/security.txt</code>, <code>/security.txt</code>, <code>/robots.txt</code>, and related security discovery locations when that option is enabled. These probes help reveal coordination and indexing signals, not vulnerability proof.

<h3 class="scan-web-security-technical-step-heading">6. Visible surface inventory</h3>

The result keeps the raw review surface close to the score: returned headers, cookie attributes, final URL, redirect count, HTTP upgrade probe, well-known file rows, and generated timestamps. This helps reviewers move from "the score is low" to "this exact response header or cookie needs work."

<h3 class="scan-web-security-technical-step-heading">7. Scope boundaries</h3>

The scanner does not scan source code, dependencies, containers, CI pipelines, cloud accounts, authenticated pages, private networks, exploitability, malware, or runtime agents. It is an edge-observability and hardening review tool, not a penetration test or a full application security platform.

<ul class="tool-technical-warning-list">
  <li>Public response evidence does not prove authentication, authorization, session design, input validation, or business logic quality.</li>
  <li>Header evidence can be correct on one path and different on another path, method, region, device class, or CDN route.</li>
  <li>Scanner output should become a review queue, not a trophy or a blanket security statement.</li>
</ul>

<h3 class="scan-web-security-technical-step-heading">8. How to read the result</h3>

Start with reachability and final URL. If the request failed, redirected unexpectedly, or landed on a different host, the header findings may describe the wrong surface for your review goal. Then inspect transport results, security headers, cookies, CORS behavior, disclosure headers, and public file probes. That order keeps the review close to the evidence instead of jumping straight to the score.

The score is a triage signal. It is useful for comparing the same endpoint over time or for quickly spotting missing browser-facing controls. It is not a vulnerability severity score, compliance rating, or exploitability measure. A low score deserves investigation. A high score still needs context, especially for authenticated applications, APIs, CDN-fronted sites, redirects, and pages that serve different responses by method, device, region, or user-agent.

<h3 class="scan-web-security-technical-step-heading">9. Evidence discipline</h3>

Findings should be handled with their evidence. A missing HSTS finding means the HTTPS response did not include the expected header on this request path. A weak cookie finding means a visible <code>Set-Cookie</code> header missed one of the reviewed attributes. A CORS warning means the observed response advertised a broad or risky cross-origin read behavior. Those are concrete observations, but they still need owner review.

Keep the raw headers and cookie rows close to remediation work. Proxy layers, application frameworks, CDN rules, WAF policies, and platform defaults can all add, remove, or rewrite headers before the response reaches the scanner. The correct fix might belong in application code, an ingress controller, a reverse proxy, a CDN rule, or a hosting platform setting.

<h3 class="scan-web-security-technical-step-heading">10. Request option boundaries</h3>

HEAD and GET can produce different answers. Some sites return minimal headers to HEAD, block HEAD entirely, or route GET through a different application path. GET fallback helps when HEAD returns <code>405</code>, but it does not prove every page or route has the same posture. Redirect following is usually helpful, but it can hide where a policy is actually set. TLS validation should stay enabled for normal review so certificate problems remain visible.

User-agent selection also matters. A security appliance, CDN, or application may send different headers to a browser-like client than to a generic scanner. That does not make one result fake; it means the edge behavior varies by request profile. When a finding matters, repeat the scan with the profile that matches real traffic and keep that context in the handoff notes.

<h3 class="scan-web-security-technical-step-heading">11. Public target and authorization rules</h3>

The backend rejects local and private network targets because this tool is not for internal discovery or SSRF-style probing. Use it only for public endpoints you are authorized to review. Authorization is not a form field, but it is still required. A public URL can belong to another organization, customer, vendor, or shared platform.

Well-known file probes are intentionally narrow. They can reveal whether security contact files, robots rules, or related public paths exist, but they do not crawl the site. They should be read as coordination and indexing signals, not proof of security maturity.

<h3 class="scan-web-security-technical-step-heading">12. Export and remediation workflow</h3>

CSV is useful for turning findings into triage rows. JSON is better when the full scan context, options, evidence, and generated findings need to stay together. Neither export proves that a target is secure. They preserve what this scanner observed during one request sequence.

For remediation, group findings by owner. Transport and certificate issues may belong to platform or edge teams. Header policy may belong to application, ingress, CDN, or security engineering. Cookie flags may belong to the application framework or session layer. CORS may require API and frontend ownership together. Disclosure headers may be removed at several layers. Clear ownership beats a long list of undifferentiated warnings.

<h3 class="scan-web-security-technical-step-heading">13. Practical review checklist</h3>

Before sharing results, use the scanner output like a compact review file:

<ul class="tool-technical-checklist">
  <li><strong>Intent:</strong> Confirm the target URL, final URL, endpoint type, owner, and reason for the scan.</li>
  <li><strong>Request:</strong> Confirm the method, redirect setting, user-agent profile, TLS validation setting, companion probes, and timestamp.</li>
  <li><strong>Evidence:</strong> Review failures and warnings against the raw headers, cookies, transport rows, CORS fields, and public-file probes.</li>
  <li><strong>Assignment:</strong> Map each real issue to the layer that can fix it, such as app, ingress, CDN, WAF, platform, or DNS owner.</li>
  <li><strong>Closure:</strong> Keep before-and-after evidence with the ticket, not just a changed score.</li>
</ul>

The final question is whether the finding can be reproduced and assigned. If yes, export the evidence and create the remediation item with the exact header, cookie, CORS, or transport condition. If no, rerun with clearer options or collect a browser trace. The scanner is most useful when it turns public edge behavior into specific next work, not when it becomes a badge.

<h3 class="scan-web-security-technical-step-heading">14. Change tracking</h3>

Use repeated scans carefully. A changed score can mean the site improved, regressed, redirected somewhere else, changed CDN behavior, served a different response to the selected method, or exposed a temporary deployment state. Compare final URL, status code, headers, cookies, and request options before celebrating or panicking.

When a remediation is applied, keep before-and-after evidence. The useful proof is not "the score went up"; it is the exact header added, cookie flag changed, redirect fixed, CORS value narrowed, TLS issue resolved, or disclosure removed. That evidence helps the owner verify the fix and helps the next reviewer understand why the finding closed.

<h3 class="scan-web-security-technical-step-heading">15. Human review boundary</h3>

Public edge checks are only one layer of web security. They do not answer whether authentication is correct, authorization is enforced, input validation is strong, secrets are protected, dependencies are patched, or business logic is safe. Use this scanner to improve visible HTTP posture, then hand deeper questions to the right application, platform, or security process.

Final review should end with an owner, a finding, and evidence path. If the issue is real, say who fixes it, where the control belongs, and what response will prove closure. If the result is noisy, say which option should be rerun. If it is accepted risk, record who accepted it, why, and when it should be revisited. That discipline keeps scanner output useful after the initial score loses novelty during remediation review and follow up work later on too.

<div class="scan-web-security-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Review layer</th>
      <th>What the scanner observes</th>
      <th>Where the human still decides</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Reachability</td>
      <td>Final URL, status, redirects, timeout behavior, TLS validation behavior, and certificate handling.</td>
      <td>Whether this is the intended public surface and whether redirects land on the right owner.</td>
    </tr>
    <tr>
      <td>Browser guardrails</td>
      <td>HSTS, CSP, frame protection, MIME sniffing protection, referrer policy, and permissions policy.</td>
      <td>Whether the observed policy fits the endpoint type instead of merely looking tidy in a table.</td>
    </tr>
    <tr>
      <td>Session hints</td>
      <td>Visible <code>Set-Cookie</code> attributes such as <code>Secure</code>, <code>HttpOnly</code>, and <code>SameSite</code>.</td>
      <td>Whether the cookie belongs to a sensitive flow and whether framework defaults are doing the right job.</td>
    </tr>
    <tr>
      <td>Public coordination</td>
      <td><code>security.txt</code>, <code>robots.txt</code>, and related public discovery paths when probes are enabled.</td>
      <td>Whether the file content is current, owned, and useful to the team that receives reports.</td>
    </tr>
    <tr>
      <td>Export state</td>
      <td>CSV finding rows and JSON scan payloads generated from the same result model.</td>
      <td>Whether the handoff includes ownership, evidence path, accepted-risk notes, and retest criteria.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.09_example-commands -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-examples scan-web-security-markdown-card-commands">

<h2 class="scan-web-security-section-heading"><i class="bi bi-terminal" aria-hidden="true"></i><span>Example Scan Inputs</span></h2>

<p>Use these examples as scan briefs. Set the matching target and options, run the scan, then review the findings and evidence tabs before exporting.</p>

<pre class="scan-web-security-example-input scan-web-security-command-pre"><code>Target: https://example.com
Method: HEAD
Follow redirects: on
Validate TLS: on
Check well-known files: on
Probe HTTP upgrade path: on</code></pre>

<details class="scan-web-security-input-note" open>
  <summary>
    <span class="scan-web-security-input-note-label scan-web-security-input-note-label-closed">Show scan use</span>
    <span class="scan-web-security-input-note-label scan-web-security-input-note-label-open">Hide scan use</span>
    <button type="button" class="scan-web-security-input-copy-btn scan-web-security-command-copy-btn" data-scan-input-copy-index="0">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy input</span>
    </button>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-shield-check fs-5" aria-hidden="true"></i>
    <div><strong>Baseline:</strong> Useful for a first pass over transport, common headers, cookies, and public security files.</div>
  </div>
</details>

<pre class="scan-web-security-example-input scan-web-security-command-pre"><code>Target: https://www.example.com
Method: GET
User-Agent profile: Desktop browser
Follow redirects: on
Validate TLS: on
Fallback GET on 405: on</code></pre>

<details class="scan-web-security-input-note">
  <summary>
    <span class="scan-web-security-input-note-label scan-web-security-input-note-label-closed">Show scan use</span>
    <span class="scan-web-security-input-note-label scan-web-security-input-note-label-open">Hide scan use</span>
    <button type="button" class="scan-web-security-input-copy-btn scan-web-security-command-copy-btn" data-scan-input-copy-index="1">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy input</span>
    </button>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-window-stack fs-5" aria-hidden="true"></i>
    <div><strong>Content path:</strong> Useful when a site sends different headers for a browser-style request than for a lightweight HEAD request.</div>
  </div>
</details>

<pre class="scan-web-security-example-input scan-web-security-command-pre"><code>Target: http://example.com
Method: HEAD
Follow redirects: on
Validate TLS: on
Probe HTTP upgrade path: on
Check well-known files: off</code></pre>

<details class="scan-web-security-input-note">
  <summary>
    <span class="scan-web-security-input-note-label scan-web-security-input-note-label-closed">Show scan use</span>
    <span class="scan-web-security-input-note-label scan-web-security-input-note-label-open">Hide scan use</span>
    <button type="button" class="scan-web-security-input-copy-btn scan-web-security-command-copy-btn" data-scan-input-copy-index="2">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy input</span>
    </button>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-arrow-repeat fs-5" aria-hidden="true"></i>
    <div><strong>Upgrade path:</strong> Useful when the main question is whether HTTP traffic reaches the equivalent HTTPS endpoint cleanly.</div>
  </div>
</details>

<pre class="scan-web-security-example-input scan-web-security-command-pre"><code>Target: https://app.example.com
Method: GET
User-Agent profile: Desktop browser
Follow redirects: on
Validate TLS: on
Check well-known files: off
Probe HTTP upgrade path: on</code></pre>

<details class="scan-web-security-input-note scan-web-security-input-note-last">
  <summary>
    <span class="scan-web-security-input-note-label scan-web-security-input-note-label-closed">Show scan use</span>
    <span class="scan-web-security-input-note-label scan-web-security-input-note-label-open">Hide scan use</span>
    <button type="button" class="scan-web-security-input-copy-btn scan-web-security-command-copy-btn" data-scan-input-copy-index="3">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy input</span>
    </button>
  </summary>
  <div class="alert alert-info d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-clipboard2-pulse fs-5" aria-hidden="true"></i>
    <div><strong>Release review:</strong> Useful after CDN, reverse proxy, application framework, or deployment changes that may alter security headers.</div>
  </div>
</details>

</div>
<!-- ns:end main.content.09_example-commands -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-interpretation scan-web-security-markdown-card-input-tips">

<h2 class="scan-web-security-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Interpretation Notes</span></h2>

<p>Use the result as a structured review queue. Start with the status chips and score card, then move into the findings table and raw evidence tabs before assigning remediation work.</p>

<div class="scan-web-security-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Signal</th>
      <th>How to read it</th>
      <th>Practical next step</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Failure</td>
      <td>A visible edge control is missing, broken, or unsafe for a common public-web baseline.</td>
      <td>Confirm the evidence, then create a remediation ticket with the exact header, cookie, or transport condition.</td>
    </tr>
    <tr>
      <td>Warning</td>
      <td>The response may be acceptable in some contexts, but it deserves review.</td>
      <td>Check whether the target is a marketing page, API, redirect endpoint, file host, or application shell before deciding severity.</td>
    </tr>
    <tr>
      <td>Pass</td>
      <td>The expected visible signal was present for this request path.</td>
      <td>Keep the evidence with the review, especially after proxy, CDN, WAF, or deployment changes.</td>
    </tr>
    <tr>
      <td>Info</td>
      <td>The scanner observed a useful fact that may not be good or bad by itself.</td>
      <td>Use it as context when interpreting redirects, final URL, request method, and public files.</td>
    </tr>
  </tbody>
</table>
</div>

<p>Results can change between runs if the target uses geo routing, CDN cache variation, device-specific responses, per-path header policies, load-balanced origins, deployment rollouts, or bot detection. When accuracy matters, rerun with the same options and compare JSON outputs before treating a difference as a regression.</p>

</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-how-to">
  <h2 class="scan-web-security-section-heading"><i class="bi bi-list-check scan-web-security-section-heading-icon" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to move from a target URL to evidence-backed review notes. Keep the scan focused, then use the raw evidence before assigning remediation work.</p>

  <details class="tool-guidance-item" open>
    <summary><i class="bi bi-globe2 tool-guidance-icon" aria-hidden="true"></i> <span>1. Enter a public target</span></summary>
    <div class="tool-guidance-answer">
      <p>Enter the HTTP or HTTPS endpoint you are authorized to review, then confirm the normalized target before scanning.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><i class="bi bi-sliders tool-guidance-icon" aria-hidden="true"></i> <span>2. Set request and probe options</span></summary>
    <div class="tool-guidance-answer">
      <p>Choose the request method, redirect handling, timeout, TLS validation, user-agent profile, fallback behavior, and companion probes that match the evidence you need.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><i class="bi bi-radar tool-guidance-icon" aria-hidden="true"></i> <span>3. Run the scan</span></summary>
    <div class="tool-guidance-answer">
      <p>Run the scan to collect server-side response evidence, findings, score context, header rows, cookie rows, transport rows, and public-file probe results.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><i class="bi bi-table tool-guidance-icon" aria-hidden="true"></i> <span>4. Review findings and evidence</span></summary>
    <div class="tool-guidance-answer">
      <p>Start with failures and warnings, then inspect the raw evidence tables so each remediation item keeps the exact observed header, cookie, CORS, transport, or probe condition.</p>
    </div>
  </details>

  <details class="tool-guidance-item">
    <summary><i class="bi bi-download tool-guidance-icon" aria-hidden="true"></i> <span>5. Export or restore scan results</span></summary>
    <div class="tool-guidance-answer">
      <p>Use <code>Export PDF</code> for review notes, <code>Download CSV</code> for triage rows, and <code>Copy JSON</code>, <code>Download JSON</code>, or <code>Import JSON</code> when the full scan result should be preserved.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->
<!-- ns:start main.content.06_export-notes -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-export">
  <h2 class="scan-web-security-section-heading"><i class="bi bi-download scan-web-security-section-heading-icon" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The workspace exports scan evidence through several paths, but they do not preserve the same information.</p>

<details class="tool-export-item" open>
  <summary><i class="bi bi-filetype-pdf tool-export-icon" aria-hidden="true"></i> <span>Export PDF</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Export PDF</code> when the current scan result needs a printable review artifact for a ticket, audit note, change record, or meeting handoff.</p>
    <p>PDF is best for human review. It does not preserve editable scanner state.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-table tool-export-icon" aria-hidden="true"></i> <span>Download CSV</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Download CSV</code> when findings need spreadsheet triage, ticket import, remediation tracking, or repeated comparison.</p>
    <p>CSV focuses on finding rows. It does not preserve every raw header, cookie, transport, or well-known file detail.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-braces tool-export-icon" aria-hidden="true"></i> <span>Copy JSON / Download JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Copy JSON</code> or <code>Download JSON</code> when you want to preserve the full scan payload.</p>
    <ul>
      <li>Query options</li>
      <li>Summary counts</li>
      <li>Finding rows</li>
      <li>Header, transport, cookie, and well-known file evidence</li>
      <li>Generation time</li>
    </ul>
    <p>JSON is the restore format for this scanner payload.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-upload tool-export-icon" aria-hidden="true"></i> <span>Import JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Import JSON</code> to reopen a saved scan payload and rebuild the controls, summary, finding tables, evidence views, and JSON output.</p>
  </div>
</details>
</div>
<!-- ns:end main.content.06_export-notes -->


<!-- ns:start main.content.07_faq -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-faq">

<h2 class="scan-web-security-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>

<p>Use these answers to keep scan output in the right lane: public edge evidence, not a full security verdict.</p>

<div class="faq-accordion">

<details class="faq-item" open>
  <summary>Is this comparable to a full application security platform?</summary>
  <div class="faq-answer">
    No. It is narrower. The scanner checks visible public response posture from the edge. It does not inspect code, dependencies, cloud configuration, runtime agents, or authenticated application behavior.
  </div>
</details>

<details class="faq-item">
  <summary>Why does the scan run from the server?</summary>
  <div class="faq-answer">
    Server-side requests allow the tool to inspect response headers and cookies without browser CORS blocking the review. The backend still rejects local and private network targets.
  </div>
</details>

<details class="faq-item">
  <summary>Why is a missing header not always a failure?</summary>
  <div class="faq-answer">
    Some headers are context-sensitive. The scanner uses weighted severity so missing HTTPS or HSTS matters more than a low-impact advisory header.
  </div>
</details>

<details class="faq-item">
  <summary>Why can results change between scans?</summary>
  <div class="faq-answer">
    CDN cache state, redirects, WAF rules, load-balanced origins, geo routing, user-agent handling, and deployments can all change the response. Use the same options and compare JSON payloads when tracking a regression.
  </div>
</details>

<details class="faq-item">
  <summary>What should I do with a permissive CORS finding?</summary>
  <div class="faq-answer">
    Confirm whether the target is meant to be a public API or static asset endpoint. If credentials are allowed or sensitive responses are exposed, tighten allowed origins and review application behavior.
  </div>
</details>

<details class="faq-item">
  <summary>Can it scan authenticated or private applications?</summary>
  <div class="faq-answer">
    No. It is designed for public endpoints. Authenticated, internal, or private-network scanning needs separate authorization and tooling.
  </div>
</details>

</div>

</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.08_acronyms -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-acronyms">

<h2 class="scan-web-security-section-heading"><i class="bi bi-type" aria-hidden="true"></i><span>Acronyms</span></h2>

<div class="scan-web-security-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Acronym</th>
      <th>Meaning</th>
      <th>Why it matters in this tool</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HSTS</td>
      <td>HTTP Strict Transport Security</td>
      <td>Confirms browsers are told to keep using HTTPS after a secure response.</td>
    </tr>
    <tr>
      <td>CSP</td>
      <td>Content Security Policy</td>
      <td>Limits which resources a page can load or execute.</td>
    </tr>
    <tr>
      <td>CORS</td>
      <td>Cross-Origin Resource Sharing</td>
      <td>Controls which browser origins can read responses across sites.</td>
    </tr>
    <tr>
      <td>TLS</td>
      <td>Transport Layer Security</td>
      <td>Protects HTTPS connections and certificate validation checks.</td>
    </tr>
    <tr>
      <td>WAF</td>
      <td>Web Application Firewall</td>
      <td>May alter headers, redirects, status codes, and bot handling before the application responds.</td>
    </tr>
    <tr>
      <td>CDN</td>
      <td>Content Delivery Network</td>
      <td>May serve cached responses or apply edge header policies that differ from the origin.</td>
    </tr>
    <tr>
      <td>XFO</td>
      <td>X-Frame-Options</td>
      <td>Legacy frame protection header checked alongside CSP frame controls.</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>JavaScript Object Notation</td>
      <td>Used for the full structured scan result export.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.08_acronyms -->

<!-- ns:start main.content.10_references -->
<div class="content-card scan-web-security-markdown-card scan-web-security-markdown-card-citations">

<h2 class="scan-web-security-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>

<p>These sources support the in-text citations used in this tool page.</p>

<table class="scan-web-security-citation-table">
  <thead>
    <tr>
      <th>Source type</th>
      <th>In-text citation</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr id="scan-web-security-ref-primary">
      <td>Security cheat sheet</td>
      <td><a class="scan-web-security-citation-backlink" href="#scan-web-security-cite-primary"><span class="scan-web-security-citation-inline">(OWASP, n.d.)</span></a></td>
      <td>OWASP. (n.d.). <em>HTTP Security Response Headers Cheat Sheet</em>. Retrieved May 13, 2026, from <a href="https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html">https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html</a></td>
    </tr>
    <tr id="scan-web-security-ref-method">
      <td>RFC</td>
      <td><a class="scan-web-security-citation-backlink" href="#scan-web-security-cite-method"><span class="scan-web-security-citation-inline">(IETF, 2012)</span></a></td>
      <td>IETF. (2012). <em>RFC 6797: HTTP Strict Transport Security (HSTS)</em>. <a href="https://www.rfc-editor.org/rfc/rfc6797">https://www.rfc-editor.org/rfc/rfc6797</a></td>
    </tr>
    <tr id="scan-web-security-ref-review">
      <td>RFC</td>
      <td><a class="scan-web-security-citation-backlink" href="#scan-web-security-cite-review"><span class="scan-web-security-citation-inline">(IETF, 2022)</span></a></td>
      <td>IETF. (2022). <em>RFC 9110: HTTP Semantics</em>. <a href="https://www.rfc-editor.org/rfc/rfc9110">https://www.rfc-editor.org/rfc/rfc9110</a></td>
    </tr>
  </tbody>
</table>

</div>
<!-- ns:end main.content.10_references -->
