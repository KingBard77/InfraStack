[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-overview">

## Overview

GCP Cost Calculator is an InfraStack workspace for building a first-pass monthly Google Cloud run-rate estimate from visible workload assumptions. It focuses on the spend drivers this workspace can model directly: <span class="calculate-cost-gcp-term-accent">Compute Engine</span>, <span class="calculate-cost-gcp-term-accent">Persistent Disk</span>, <span class="calculate-cost-gcp-term-accent">Cloud Storage</span>, <span class="calculate-cost-gcp-term-accent">Cloud Functions</span>, <span class="calculate-cost-gcp-term-accent">API Gateway</span>, shared internet egress, support uplift, contingency, and manual monthly adjustments. <a id="calculate-cost-gcp-cite-primary" class="calculate-cost-gcp-citation-link" href="#calculate-cost-gcp-ref-primary"><span class="calculate-cost-gcp-citation-inline">Google Cloud (n.d.-a)</span></a> says its pricing calculator can add and configure products to produce shareable cost estimates, so this workspace keeps totals positioned as planning numbers.

<a id="calculate-cost-gcp-cite-method" class="calculate-cost-gcp-citation-link" href="#calculate-cost-gcp-ref-method"><span class="calculate-cost-gcp-citation-inline">Google Cloud (n.d.-b)</span></a> publishes Compute Engine VM pricing separately from other services, which is why compute shape and monthly hours remain visible estimate drivers.

<a id="calculate-cost-gcp-cite-review" class="calculate-cost-gcp-citation-link" href="#calculate-cost-gcp-ref-review"><span class="calculate-cost-gcp-citation-inline">Google Cloud (n.d.-c)</span></a> documents Cloud Run functions pricing separately, so request and execution assumptions should be checked as their own serverless cost surface.

The calculator is useful when a team needs a planning number that can be inspected, challenged, copied, and exported. It is not a Google Cloud bill, a pricing quote, a contract-aware calculator, or a replacement for Google Cloud Pricing Calculator, billing exports, or private rate-card review.

Use it when you need to:

- Build a quick monthly estimate before a deeper FinOps review
- Compare VM purchase-model assumptions against the same workload shape
- Identify which services are driving the total
- Keep buffers, support, and manual adjustments visible
- Export the estimate as a report, CSV table, or JSON snapshot

<div class="calculate-cost-gcp-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Workspace area</th>
      <th>What it gives you</th>
      <th>What to review before sharing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Preset</td>
      <td>A starting workload shape for lean web, serverless API, steady platform, or blank estimates.</td>
      <td>Preset values are only a launch point. Replace them with the workload you actually expect.</td>
    </tr>
    <tr>
      <td>Service cards</td>
      <td>Visible inputs for compute, storage, requests, egress, and overhead.</td>
      <td>Disable services that are outside scope so unused cards do not contribute to the total.</td>
    </tr>
    <tr>
      <td>Custom assumptions</td>
      <td>Editable starter rates, free-tier toggles, regional uplift, and buffers.</td>
      <td>Override material rates when region, agreement, or known usage differs from the starter catalog.</td>
    </tr>
    <tr>
      <td>Results</td>
      <td>Monthly total, service mix, line-item breakdown, assumptions, recommendations, and JSON.</td>
      <td>Review the highest-cost line items first. Spreadsheet courage is not a discount program.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-technical">

<h2 class="calculate-cost-gcp-section-heading"><i class="bi bi-calculator" aria-hidden="true"></i><span>Technical Details</span></h2>

The calculator builds one estimate payload from the current form values. That payload drives the summary cards, line-item breakdown, service mix, assumptions table, recommendations, methodology notes, CSV exports, and JSON output.

The estimate notes stay tied to official Google Cloud pricing sources. <a id="calculate-cost-gcp-cite-technical-primary" class="calculate-cost-gcp-citation-link" href="#calculate-cost-gcp-ref-primary"><span class="calculate-cost-gcp-citation-inline">Google Cloud (n.d.-a)</span></a> anchors the pricing-calculator framing, and <a id="calculate-cost-gcp-cite-technical-method" class="calculate-cost-gcp-citation-link" href="#calculate-cost-gcp-ref-method"><span class="calculate-cost-gcp-citation-inline">Google Cloud (n.d.-b)</span></a> anchors the Compute Engine pricing assumptions that appear in the service drivers below. <a id="calculate-cost-gcp-cite-technical-review" class="calculate-cost-gcp-citation-link" href="#calculate-cost-gcp-ref-review"><span class="calculate-cost-gcp-citation-inline">Google Cloud (n.d.-c)</span></a> anchors the Cloud Run functions and serverless pricing review surface that should be reviewed before the estimate is shared.

<div class="tool-technical-scan-grid" aria-label="Technical Details quick scan">
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">First scan</span>
    <strong>Read the estimate like a model.</strong>
    <ul>
      <li>Confirm the scenario label, preset, included components, scope, and monthly horizon.</li>
      <li>Check the largest line item before polishing smaller inputs.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Rates</span>
    <strong>Keep assumptions visible.</strong>
    <ul>
      <li>Review custom rates, discounts, uplifts, buffers, free-tier toggles, and manual adjustments.</li>
      <li>Replace starter catalog values when a quote, price sheet, or billing history is available.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Handoff</span>
    <strong>Export the model, not just the number.</strong>
    <ul>
      <li>Use CSV for finance review and JSON when another reviewer needs to reopen the estimate.</li>
      <li>Record the owner, excluded services, largest uncertainty, and source for any override.</li>
    </ul>
  </section>
  <section class="tool-technical-scan-card">
    <span class="tool-technical-scan-kicker">Stop line</span>
    <strong>Do not sell it as a bill.</strong>
    <ul>
      <li>The calculator does not read live billing, account contracts, telemetry, tax, or marketplace charges.</li>
      <li>Treat totals as planning numbers until commercial and usage evidence are checked.</li>
    </ul>
  </section>
</div>

<h3 class="calculate-cost-gcp-technical-step-heading">1. Estimate model</h3>

Each estimate starts with a label, preset, included services, usage quantities, editable rates, and overhead settings. The result is recalculated from the current inputs instead of from separate table state.

<h3 class="calculate-cost-gcp-technical-step-heading">2. Starter catalog and overrides</h3>

The workspace includes a compact starter catalog for common Google Cloud pricing inputs. These rates are intentionally visible in Custom controls so they can be replaced when your region, enterprise agreement, discount model, or workload shape differs.

<h3 class="calculate-cost-gcp-technical-step-heading">3. Service drivers</h3>

<div class="calculate-cost-gcp-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Service</th>
      <th>Modeled drivers</th>
      <th>Useful challenge question</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Compute Engine</td>
      <td>Machine profile, instance count, monthly hours, purchase model, and optional custom hourly rate.</td>
      <td>Is the instance family and purchase model realistic for this workload?</td>
    </tr>
    <tr>
      <td>Persistent Disk</td>
      <td>persistent disk capacity, additional IOPS, additional throughput, and rate overrides.</td>
      <td>Is storage sized from real data growth or just a comfortable round number?</td>
    </tr>
    <tr>
      <td>Cloud Storage</td>
      <td>Storage, GET requests, PUT/LIST requests, and Cloud Storage egress.</td>
      <td>Will hot object access or outbound transfer dominate the storage number?</td>
    </tr>
    <tr>
      <td>Cloud Functions</td>
      <td>Monthly requests, average duration, memory, request rate, GB-second rate, and free-tier toggle.</td>
      <td>Are duration and memory based on measured behavior or optimism with a badge?</td>
    </tr>
    <tr>
      <td>API Gateway</td>
      <td>HTTP or Standard gateway type, monthly requests, response size, egress contribution, and API free-tier toggle.</td>
      <td>Does high-volume gateway pricing materially change the estimate compared with the standard request model?</td>
    </tr>
    <tr>
      <td>Shared egress</td>
      <td>Combined internet egress, free-tier toggle, and egress rate override.</td>
      <td>Is egress separated clearly enough to survive review?</td>
    </tr>
  </tbody>
</table>
</div>

<h3 class="calculate-cost-gcp-technical-step-heading">4. Formula boundaries</h3>

The output is arithmetic from visible assumptions. It does not discover real accounts, read billing history, validate live Google Cloud regional prices, include every Google Cloud service, calculate taxes, apply private pricing, or prove budget readiness.

<ul class="tool-technical-warning-list">
  <li>Starter rates are local assumptions and may differ by region, contract, discount, support plan, or purchasing model.</li>
  <li>Manual adjustments can explain known gaps, but they should not hide missing services or uncertain usage.</li>
  <li>JSON preserves the estimate model, not proof that a provider or partner would bill the same amount.</li>
</ul>

<h3 class="calculate-cost-gcp-technical-step-heading">5. Review boundaries</h3>

<div class="calculate-cost-gcp-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Boundary</th>
      <th>Workspace behavior</th>
      <th>Review action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Rates</td>
      <td>Uses starter rates unless the user overrides them.</td>
      <td>Verify expensive rates in Google Cloud Pricing Calculator, Cloud Billing export, Cloud Billing Catalog data, or committed-use agreement sheets.</td>
    </tr>
    <tr>
      <td>Free tier</td>
      <td>Applies only the free-tier toggles exposed in the workspace.</td>
      <td>Confirm account eligibility and monthly limits separately.</td>
    </tr>
    <tr>
      <td>Manual adjustment</td>
      <td>Adds a visible positive or negative monthly adjustment.</td>
      <td>Use it for known scope gaps, then name the reason during handoff.</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>Exports the current estimate payload.</td>
      <td>Use it for snapshots, comparison, and restore through Import JSON.</td>
    </tr>
  </tbody>
</table>
</div>

<h3 class="calculate-cost-gcp-technical-step-heading">6. How to read the estimate</h3>

Read the output as a planning model, not a bill. The calculator is useful because every material number is visible: usage, rate, purchase model, regional uplift, buffer, free-tier toggle, and manual adjustment. That visibility makes the estimate easier to challenge than a pasted total from a private spreadsheet. It also means the estimate is only as strong as the assumptions you feed it.

For Google Cloud, the first review pass should separate workload shape from commercial reality. Workload shape covers instance count, monthly hours, storage size, request volume, response size, and expected egress. Commercial reality covers purchase model, committed-use discounts, sustained-use effects, negotiated pricing, credits, support charges, and billing-account behavior. The workspace can expose fields for those ideas, but it does not know your agreement, project policy, or live usage history.

<h3 class="calculate-cost-gcp-technical-step-heading">7. Scenario discipline</h3>

Use presets as named starting points, then rename the estimate to match the real scenario. A useful label explains the workload and scope, such as a staging web API, production worker pool, migration test, or shared platform baseline. If two scenarios differ in traffic, resilience, purchase model, or data transfer, keep them as separate exports. One overloaded estimate tends to hide the cost driver that reviewers actually need to discuss.

The service mix chart is a triage surface. It tells you where to spend review time first. If Compute Engine dominates, inspect machine family, purchase model, and utilization hours. If storage dominates, inspect growth, IOPS, throughput, request counts, and retention assumptions. If egress dominates, challenge response size, CDN use, public transfer paths, and whether data movement belongs to the application, backup process, analytics flow, or integration path.

<h3 class="calculate-cost-gcp-technical-step-heading">8. Assumption hygiene</h3>

Treat every override as a note to future reviewers. A custom hourly rate, egress rate, request price, uplift, or manual adjustment should have a reason outside the tool: a quote, pricing page, historical bill, architecture decision, or known scope gap. The calculator will carry the number, but it will not defend the number in a budget meeting.

Free-tier toggles need the same care. They are useful for rough early estimates, but they can mislead when a shared billing account, mature workload, or production environment has already consumed those allowances. When the estimate is meant for a business decision, review free-tier assumptions separately and turn them off if they are not material or dependable.

Manual adjustment is intentionally blunt. Use it when a known cost is outside the modeled service cards or when you need to represent a credit, migration overlap, one-off reduction, or placeholder for a service not yet modeled. Do not use it to bury uncertainty. Name the gap in handoff notes so the adjustment remains reviewable.

<h3 class="calculate-cost-gcp-technical-step-heading">9. Export and handoff behavior</h3>

CSV is for spreadsheet review and line-item comparison. JSON is for preserving the normalized estimate payload. Copying the visible result is fine for quick discussion, but JSON is the better handoff artifact when another person needs to reopen the assumptions, compare scenarios, or keep a record of the exact inputs behind the number.

The estimate does not read Cloud Billing exports, Pricing Calculator sessions, live Cloud Billing Catalog data, or deployment telemetry. It also does not calculate taxes, support plans, marketplace charges, committed-use utilization, sustained-use behavior, or enterprise discounts unless you express those effects through visible overrides or adjustments. That boundary is a feature, not a defect: it keeps the page fast, transparent, and honest about what it knows.

<h3 class="calculate-cost-gcp-technical-step-heading">10. Practical review checklist</h3>

Before sharing a Google Cloud estimate, confirm that the scenario label, preset, included services, monthly hours, data sizes, request counts, and egress assumptions describe the same workload. Mixed scopes are the fastest way to produce a confident-looking number that nobody can actually defend.

<ul class="tool-technical-checklist">
  <li><strong>Scope:</strong> Confirm the label, preset, included components, excluded components, monthly horizon, and target environment.</li>
  <li><strong>Usage:</strong> Review monthly hours, units, storage, requests, data transfer, and utilization against the same workload.</li>
  <li><strong>Rates:</strong> Check starter rates, custom overrides, discounts, support uplift, buffer, free-tier toggles, and manual adjustments.</li>
  <li><strong>Drivers:</strong> Review the largest service line items first and attach source notes for the number.</li>
  <li><strong>Handoff:</strong> Export CSV and JSON when the estimate will be reviewed, compared, restored, or approved.</li>
</ul>


Then review the largest line items in order. For Compute Engine, check whether the machine profile, count, purchase model, and running hours match the expected operating pattern. A workload that sleeps overnight should not look like a continuous production fleet unless that is deliberate. For Persistent Disk, check capacity and performance separately; storage size, IOPS, and throughput can tell different stories. For Cloud Storage, look beyond stored gigabytes and inspect request volume plus outbound transfer. For Cloud Functions and API Gateway, make sure request count, duration, memory, gateway shape, and response size are tied to real traffic assumptions rather than a nice round guess.

Use the buffer as a risk control, not a hiding place. A small buffer can cover early uncertainty. A large buffer should trigger a note about what is unknown: traffic, retention, data transfer, purchase model, or missing service scope. If the estimate needs a manual adjustment, describe it during handoff so another reviewer knows whether it represents a gap, a credit, a migration overlap, or a deliberate placeholder.

Finally, export both CSV and JSON when the estimate matters. CSV supports finance review, spreadsheet comparison, and line-item comments. JSON preserves the model that produced the result. If the estimate changes later, the exported JSON gives you a clean starting point for explaining what moved and why.

<h3 class="calculate-cost-gcp-technical-step-heading">11. What the number should trigger</h3>

A good Google Cloud estimate should create better questions, not end the conversation. Ask whether the architecture can reduce always-on compute, whether storage retention matches the actual recovery need, whether response payloads can be cached or compressed, and whether traffic belongs behind a different delivery path. Ask who owns the cost once the workload moves from planning to operations. Ask which metric will prove the estimate is drifting after launch.

When the estimate supports a decision, attach the context that made the number reasonable: date, region, workload label, traffic model, purchase model, included services, excluded services, and the largest uncertainty. That small discipline turns the output into a review artifact instead of a lonely total. It also makes later comparison fair. If a future estimate increases, reviewers can see whether the workload grew, the rate changed, the buffer moved, or a missing service finally entered scope.

Use the final number with plain language. Say what the estimate includes, what it excludes, and which inputs deserve the next review. If the number is used for budget approval, pair it with a low, expected, and high scenario rather than pretending one draft is precise. If it is used for engineering planning, pair it with the architecture diagram, expected scaling event, and first measurement checkpoint. The estimate should make the next decision easier: approve discovery, resize the workload, compare purchase models, collect real usage data, or stop an expensive design.

Keep the exported model close to the decision so later cost drift has a cause, not a mystery, for reviewers.

</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.03_example-prompts -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-examples">

## Example Prompts

<p>Copy one preset-aligned prompt, use it as the estimate brief, then apply the matching preset and set the visible controls before sharing the result.</p>

<pre class="calculate-cost-gcp-prompt-pre"><code>Estimate a lean Google Cloud web platform from the Lean web platform preset. Include 2 e2-standard-2 instances running 730 hours on on-demand pricing, 120 GB Persistent Disk storage at baseline IOPS and throughput, 250 GB Cloud Storage capacity, 80 GB Cloud Storage egress, 2 million API Gateway standard requests with 32 KB average response size, 120 GB shared internet egress, 5% support uplift, and 10% contingency.</code></pre>

<details class="calculate-cost-gcp-prompt-note" open>
  <summary>
    <span class="calculate-cost-gcp-prompt-note-label calculate-cost-gcp-prompt-note-label-closed">Show prompt use</span>
    <span class="calculate-cost-gcp-prompt-note-label calculate-cost-gcp-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="calculate-cost-gcp-prompt-copy-btn" data-prompt-copy-index="0">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-cash-stack fs-5" aria-hidden="true"></i>
    <div><strong>Baseline:</strong> Useful for a small always-on application where compute, block storage, and modest internet transfer are the first values to challenge.</div>
  </div>
</details>

<pre class="calculate-cost-gcp-prompt-pre"><code>Estimate a serverless Google Cloud API from the Serverless API preset. Disable Compute Engine and Persistent Disk unless a companion instance is in scope. Include 80 GB Cloud Storage capacity, 40 GB Cloud Storage egress, 12 million Cloud Functions requests at 180 ms average duration and 512 MB memory, 12 million API Gateway standard requests with 24 KB average response size, 120 GB shared egress, applicable free-tier toggles, 8% support uplift, and 12% contingency.</code></pre>

<details class="calculate-cost-gcp-prompt-note">
  <summary>
    <span class="calculate-cost-gcp-prompt-note-label calculate-cost-gcp-prompt-note-label-closed">Show prompt use</span>
    <span class="calculate-cost-gcp-prompt-note-label calculate-cost-gcp-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="calculate-cost-gcp-prompt-copy-btn" data-prompt-copy-index="1">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-lightning-charge fs-5" aria-hidden="true"></i>
    <div><strong>Request-heavy:</strong> Useful when monthly request volume, duration, memory, and egress drive the conversation more than always-on compute.</div>
  </div>
</details>

<pre class="calculate-cost-gcp-prompt-pre"><code>Estimate a steady Google Cloud application platform from the Steady application platform preset. Include 6 e2-standard-4 instances running 730 hours with committed use comparison, 900 GB Persistent Disk storage with 6000 IOPS and 250 MB/s throughput, 2 TB Cloud Storage capacity, 600 GB Cloud Storage egress, 8 million API Gateway high-volume requests with 48 KB average response size, 600 GB shared egress, 10% support uplift, and 15% contingency.</code></pre>

<details class="calculate-cost-gcp-prompt-note">
  <summary>
    <span class="calculate-cost-gcp-prompt-note-label calculate-cost-gcp-prompt-note-label-closed">Show prompt use</span>
    <span class="calculate-cost-gcp-prompt-note-label calculate-cost-gcp-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="calculate-cost-gcp-prompt-copy-btn" data-prompt-copy-index="2">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-bar-chart-line fs-5" aria-hidden="true"></i>
    <div><strong>Commitment review:</strong> Useful when a stable workload may justify comparing On-demand, committed use, and reserved coverage assumptions.</div>
  </div>
</details>

<pre class="calculate-cost-gcp-prompt-pre"><code>Estimate a mixed Google Cloud workload from the Blank estimate preset. Include a custom worker profile with 4 vCPU, 16 GiB memory, 4 instances, 500 monthly hours, on-demand pricing, 600 GB Persistent Disk storage with 5000 IOPS and 200 MB/s throughput, 1200 GB Cloud Storage capacity, 350 GB Cloud Storage egress, 3 million Cloud Functions requests at 250 ms and 1024 MB memory, 4 million API Gateway standard requests with 40 KB response size, 300 GB shared egress, a named manual adjustment for known NAT, load balancer, observability, or backup costs, 10% support uplift, and 10% contingency.</code></pre>

<details class="calculate-cost-gcp-prompt-note calculate-cost-gcp-prompt-note-last">
  <summary>
    <span class="calculate-cost-gcp-prompt-note-label calculate-cost-gcp-prompt-note-label-closed">Show prompt use</span>
    <span class="calculate-cost-gcp-prompt-note-label calculate-cost-gcp-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="calculate-cost-gcp-prompt-copy-btn" data-prompt-copy-index="3">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-info d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-diagram-3 fs-5" aria-hidden="true"></i>
    <div><strong>Scope-gap review:</strong> Useful when the calculator covers most of the workload, but a few known Google Cloud services must be added as explicit manual adjustments.</div>
  </div>
</details>

</div>
<!-- ns:end main.content.03_example-prompts -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-prompt-tips calculate-cost-gcp-markdown-card-input-tips">

## Input Tips

The calculator works best when the estimate is built from explicit quantities and visible assumptions.

<details class="tool-guidance-item" open>
<summary><i class="bi bi-lightbulb-fill tool-guidance-icon" aria-hidden="true"></i> <span>Start from the boundary</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Name the workload, environment, or decision being estimated.</li>
<li>Use one estimate for one workload boundary.</li>
<li>Disable services outside the scope instead of leaving harmless-looking defaults.</li>
<li>Add known missing services as manual adjustment only when the amount has a source.</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-sliders tool-guidance-icon" aria-hidden="true"></i> <span>Make assumptions reviewable</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Keep support, contingency, regional uplift, and manual adjustment separate.</li>
<li>Override starter rates for the line items that materially affect the total.</li>
<li>Use real monthly request counts where possible, not peak-second guesses dressed up for finance.</li>
<li>Record any known service gaps before the estimate is used in approval work.</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-search tool-guidance-icon" aria-hidden="true"></i> <span>Review high-risk estimates closely</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>The number will be used for approval, procurement, or budget ownership.</li>
<li>The workload depends on private pricing, enterprise discounts, or credits.</li>
<li>Network egress, Cloud Storage requests, or Functions duration are large enough to dominate the result.</li>
<li>The architecture includes services this calculator does not model directly.</li>
</ul>
</div>
</details>

</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-how-to">
  <h2 class="calculate-cost-gcp-section-heading"><i class="bi bi-list-check calculate-cost-gcp-section-heading-icon" aria-hidden="true"></i><span>How To Use</span></h2>

  <details class="tool-guidance-item" open>
    <summary><i class="bi bi-card-checklist tool-guidance-icon" aria-hidden="true"></i> <span>1. Start with a preset or estimate label</span></summary>
    <div class="tool-guidance-answer">
      <p>Choose the closest GCP Cost Calculator preset, then name the estimate or scenario so exported results can be traced back to the workload being reviewed.</p>
    </div>
  </details>
  
  <details class="tool-guidance-item">
    <summary><i class="bi bi-sliders tool-guidance-icon" aria-hidden="true"></i> <span>2. Set quantities, rates, and assumptions</span></summary>
    <div class="tool-guidance-answer">
      <p>Tune the service cards, sizing values, purchase model, traffic, storage, support, discounts, buffer, and other visible assumptions before building the result.</p>
    </div>
  </details>
  
  <details class="tool-guidance-item">
    <summary><i class="bi bi-calculator tool-guidance-icon" aria-hidden="true"></i> <span>3. Build and review the estimate</span></summary>
    <div class="tool-guidance-answer">
      <p>Run the estimate and check the total, monthly and annual views, service mix, top drivers, and assumption summary before using the numbers in a handoff.</p>
    </div>
  </details>
  
  <details class="tool-guidance-item">
    <summary><i class="bi bi-table tool-guidance-icon" aria-hidden="true"></i> <span>4. Inspect line items and copied rows</span></summary>
    <div class="tool-guidance-answer">
      <p>Use the line-item, service-mix, and assumption tables to verify how the total was assembled, then copy individual rows when a ticket or note needs exact context.</p>
    </div>
  </details>
  
  <details class="tool-guidance-item">
    <summary><i class="bi bi-download tool-guidance-icon" aria-hidden="true"></i> <span>5. Export or restore the estimate</span></summary>
    <div class="tool-guidance-answer">
      <p>Use <code>Export PDF</code> for a shareable report, <code>Download CSV</code> for table work, and <code>Copy JSON</code>, <code>Download JSON</code>, or <code>Import JSON</code> when the editable estimate should be preserved.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->
<!-- ns:start main.content.06_export-notes -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-export">
  <h2 class="calculate-cost-gcp-section-heading"><i class="bi bi-download calculate-cost-gcp-section-heading-icon" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The workspace supports report, table, row-copy, JSON, and restore paths, but they do not preserve the same information.</p>

<details class="tool-export-item" open>
  <summary><i class="bi bi-file-earmark-pdf tool-export-icon" aria-hidden="true"></i> <span>Export PDF</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Export PDF</code> when the current estimate needs a printable report for a ticket, approval note, review packet, or handoff.</p>
    <p>PDF captures the visible result report. It does not preserve editable calculator state.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-table tool-export-icon" aria-hidden="true"></i> <span>Download CSV</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Download CSV</code> when line items, service mix, assumptions, or totals need spreadsheet review.</p>
    <p>CSV follows the active result table. It is useful for comparison, but it is not a restore format.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-clipboard tool-export-icon" aria-hidden="true"></i> <span>Copy row values</span></summary>
  <div class="tool-export-answer">
    <p>Use row copy buttons when you need one line item, service total, recommendation, or assumption in a note or handoff comment.</p>
    <p>Copied row values reflect the current estimate result.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-braces tool-export-icon" aria-hidden="true"></i> <span>Copy JSON / Download JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Copy JSON</code> or <code>Download JSON</code> when you want to preserve the actual calculator state.</p>
    <ul>
      <li>Visible input values</li>
      <li>Service quantities and rate assumptions</li>
      <li>Line items, totals, and recommendations</li>
      <li>Result tables and generated timestamp</li>
    </ul>
    <p>JSON is the restore format, not just a report export.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-upload tool-export-icon" aria-hidden="true"></i> <span>Import JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Import JSON</code> to reopen a previously saved calculator snapshot and rebuild the visible inputs, assumptions, totals, and result tables.</p>
  </div>
</details>
</div>
<!-- ns:end main.content.06_export-notes -->


<!-- ns:start main.content.10_references -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-citations">

## References

These sources support the in-text citations used in this tool page.

<table class="calculate-cost-gcp-citation-table">
  <thead>
    <tr>
      <th>Source type</th>
      <th>In-text citation</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr id="calculate-cost-gcp-ref-primary">
      <td>Pricing website</td>
      <td><a class="calculate-cost-gcp-citation-backlink" href="#calculate-cost-gcp-cite-primary"><span class="calculate-cost-gcp-citation-inline">(Google Cloud, n.d.-a)</span></a></td>
      <td>Google Cloud. (n.d.-a). <em>Google Cloud Pricing Calculator</em>. Retrieved May 13, 2026, from <a href="https://cloud.google.com/products/calculator">https://cloud.google.com/products/calculator</a></td>
    </tr>
    <tr id="calculate-cost-gcp-ref-method">
      <td>Pricing page</td>
      <td><a class="calculate-cost-gcp-citation-backlink" href="#calculate-cost-gcp-cite-method"><span class="calculate-cost-gcp-citation-inline">(Google Cloud, n.d.-b)</span></a></td>
      <td>Google Cloud. (n.d.-b). <em>VM instance pricing</em>. Retrieved May 13, 2026, from <a href="https://cloud.google.com/products/compute/pricing">https://cloud.google.com/products/compute/pricing</a></td>
    </tr>
    <tr id="calculate-cost-gcp-ref-review">
      <td>Pricing page</td>
      <td><a class="calculate-cost-gcp-citation-backlink" href="#calculate-cost-gcp-cite-review"><span class="calculate-cost-gcp-citation-inline">(Google Cloud, n.d.-c)</span></a></td>
      <td>Google Cloud. (n.d.-c). <em>Cloud Run functions pricing overview</em>. Retrieved May 13, 2026, from <a href="https://cloud.google.com/functions/pricing-overview">https://cloud.google.com/functions/pricing-overview</a></td>
    </tr>
  </tbody>
</table>

</div>
<!-- ns:end main.content.10_references -->

<!-- ns:start main.content.07_faq -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-faq">

## FAQ

<details class="faq-item" open>
  <summary>Is this the Google Cloud pricing calculator?</summary>
  <div class="faq-answer">
    No. It is an InfraStack planning calculator with visible starter assumptions and editable overrides.
  </div>
</details>

<details class="faq-item">
  <summary>Does it use live Google Cloud pricing?</summary>
  <div class="faq-answer">
    No. It uses browser-side starter rates and any overrides you enter. Verify material numbers in Google Cloud Pricing Calculator, Cloud Billing export, Cloud Billing Catalog data, committed-use agreement sheets, or contract data.
  </div>
</details>

<details class="faq-item">
  <summary>Which services are modeled directly?</summary>
  <div class="faq-answer">
    The current calculator models Compute Engine, Persistent Disk, Cloud Storage, Cloud Functions, API Gateway, shared internet egress, support uplift, contingency, and manual monthly adjustments.
  </div>
</details>

<details class="faq-item">
  <summary>What should I do with services that are missing?</summary>
  <div class="faq-answer">
    Add known monthly values as a manual adjustment, then document the source. If the missing service is material, review it outside this calculator before using the total.
  </div>
</details>

<details class="faq-item">
  <summary>Can the JSON file restore the calculator later?</summary>
  <div class="faq-answer">
    Yes. Download JSON stores the calculator inputs and estimate output. Import JSON restores the inputs, rebuilds the estimate, and refreshes the breakdown, service mix, assumptions, and JSON view.
  </div>
</details>

<details class="faq-item">
  <summary>Does this replace financial review?</summary>
  <div class="faq-answer">
    No. Use it to frame the estimate, identify cost drivers, and expose assumptions before a deeper pricing or budget review.
  </div>
</details>

</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.08_acronyms -->
<div class="content-card calculate-cost-gcp-markdown-card calculate-cost-gcp-markdown-card-acronyms">

## Acronyms

<div class="calculate-cost-gcp-markdown-table-wrap">
<table>
  <thead>
    <tr>
      <th>Acronym</th>
      <th>Meaning</th>
      <th>Why it matters here</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Google Cloud</td>
      <td>Google Cloud</td>
      <td>The cloud provider modeled by this calculator.</td>
    </tr>
    <tr>
      <td>VM</td>
      <td>Virtual Machine</td>
      <td>Instance runtime, size, count, and purchase model often drive the estimate.</td>
    </tr>
    <tr>
      <td>Persistent Disk</td>
      <td>Google Cloud Persistent Disk</td>
      <td>Block storage capacity, IOPS, and throughput can add steady monthly cost.</td>
    </tr>
    <tr>
      <td>Cloud Storage</td>
      <td>Google Cloud Storage</td>
      <td>Object storage, request volume, and egress assumptions can change the result.</td>
    </tr>
    <tr>
      <td>API</td>
      <td>Application Programming Interface</td>
      <td>API Gateway request volume and response size are modeled inputs.</td>
    </tr>
    <tr>
      <td>CSV</td>
      <td>Comma-Separated Values</td>
      <td>Used for spreadsheet-friendly table export.</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>JavaScript Object Notation</td>
      <td>Used for structured estimate snapshots.</td>
    </tr>
    <tr>
      <td>PDF</td>
      <td>Portable Document Format</td>
      <td>Used for quick report export.</td>
    </tr>
  </tbody>
</table>
</div>

</div>
<!-- ns:end main.content.08_acronyms -->
