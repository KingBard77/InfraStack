[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-overview">

<h2 class="scan-header-security-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>

Scan Header Security is a browser-owned workspace for preparing a security-header review model before observed response data is collected. It records the target, baseline, request intent, CSP rollout, HSTS expectation, cookie posture, and policy notes, then turns those inputs into findings, evidence rows, review surface rows, notes, CSV output, and JSON restore data.

The workspace does not fetch a URL, crawl a site, or prove that an application is secure. Use it to standardize what should be checked, preserve a review artifact, and hand off header expectations before or alongside observed response evidence.

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
      <td>Target URL and review context.</td>
      <td>No network request is sent.</td>
    </tr>
    <tr>
      <td>Basic settings</td>
      <td>Baseline, method intent, timeout budget, and redirect handling.</td>
      <td>These are model settings, not observed server behavior.</td>
    </tr>
    <tr>
      <td>Custom settings</td>
      <td>CSP, HSTS, cookie posture, evidence notes, and emphasized headers.</td>
      <td>Use real response headers later to confirm each row.</td>
    </tr>
    <tr>
      <td>Output</td>
      <td>Findings, evidence rows, surface notes, policy notes, CSV, and JSON.</td>
      <td>Exports preserve the local review model for handoff and restore.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-how-to-use">

<h2 class="scan-header-security-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>

1. Enter the target URL or route being reviewed.
2. Choose the baseline that matches the surface: browser page, strict public web, or API response.
3. Tune CSP, HSTS, cookie posture, and any headers that deserve explicit attention.
4. Prepare the review and inspect the Findings, Evidence, Surface, Notes, and JSON tabs.
5. Export CSV for triage or JSON when the full state needs to be restored later.

</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-export">

<h2 class="scan-header-security-section-heading"><i class="bi bi-file-earmark-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>

CSV contains the generated finding rows. JSON contains the target, selected controls, generated summary, evidence rows, surface rows, notes, and restore-ready state. Import JSON only from this tool when you want to restore the same review model in the browser.

</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card scan-header-security-markdown-card scan-header-security-markdown-card-faq">

<h2 class="scan-header-security-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>

<details>
  <summary>Does this tool scan my target?</summary>
  <p>No. It prepares a local security-header review artifact. Use observed response evidence before assigning remediation.</p>
</details>

<details>
  <summary>Why keep request method and timeout settings?</summary>
  <p>They document how evidence should be gathered later, especially when HEAD and GET return different headers.</p>
</details>

<details>
  <summary>What should I export?</summary>
  <p>Use CSV for triage rows. Use JSON when you need to preserve and restore the full review state.</p>
</details>

</div>
<!-- ns:end main.content.07_faq -->
