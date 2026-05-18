[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-overview">

## Overview

Cisco Network Cost Calculator is an InfraStack workspace for building a first-pass monthly Cisco network planning estimate from visible workload assumptions. It focuses on the spend drivers this workspace can model directly: <span class="calculate-cost-cisco-term-accent">switching hardware</span>, <span class="calculate-cost-cisco-term-accent">wireless access</span>, <span class="calculate-cost-cisco-term-accent">licensing</span>, <span class="calculate-cost-cisco-term-accent">controller automation</span>, <span class="calculate-cost-cisco-term-accent">cloud management</span>, shared telemetry transfer, support uplift, contingency, and manual monthly adjustments. <a id="calculate-cost-cisco-cite-primary" class="calculate-cost-cisco-citation-link" href="#calculate-cost-cisco-ref-primary"><span class="calculate-cost-cisco-citation-inline">Cisco (2024)</span></a> lists Catalyst switches, access points, WAN edge, and cloud management as campus design components, so this calculator keeps hardware, wireless, edge, and management drivers visible.

<a id="calculate-cost-cisco-cite-method" class="calculate-cost-cisco-citation-link" href="#calculate-cost-cisco-ref-method"><span class="calculate-cost-cisco-citation-inline">Cisco (n.d.)</span></a> documents Catalyst subscription tiers and software support packaging, which is why licensing assumptions remain editable rather than hidden inside a fixed number.

<a id="calculate-cost-cisco-cite-review" class="calculate-cost-cisco-citation-link" href="#calculate-cost-cisco-ref-review"><span class="calculate-cost-cisco-citation-inline">Cisco Meraki (n.d.)</span></a> documents subscription, co-termination, and per-device licensing models, so renewal and management assumptions need review before the estimate becomes a budget note.

The calculator is useful when a team needs a planning number that can be inspected, challenged, copied, and exported. It is not a Cisco bill, a pricing quote, a contract-aware calculator, or a replacement for Cisco commerce tooling, partner pricing, billing exports, or private rate-card review.

Use it when you need to:

- Build a quick monthly estimate before a deeper network cost review
- Compare purchase-model assumptions against the same campus or branch shape
- Identify which services are driving the total
- Keep buffers, support, and manual adjustments visible
- Export the estimate as a report, CSV table, or JSON snapshot

<div class="calculate-cost-cisco-markdown-table-wrap">
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
      <td>A starting network shape for branch access, wireless refresh, campus core, or blank estimates.</td>
      <td>Preset values are only a launch point. Replace them with the workload you actually expect.</td>
    </tr>
    <tr>
      <td>Service cards</td>
      <td>Visible inputs for switching, wireless, licensing, automation, management, transfer, and overhead.</td>
      <td>Disable services that are outside scope so unused cards do not contribute to the total.</td>
    </tr>
    <tr>
      <td>Advanced assumptions</td>
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
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-technical">

<h2 class="calculate-cost-cisco-section-heading"><i class="bi bi-calculator" aria-hidden="true"></i><span>Technical Details</span></h2>

The calculator builds one estimate payload from the current form values. That payload drives the summary cards, line-item breakdown, service mix, assumptions table, recommendations, methodology notes, CSV exports, and JSON output.

The estimate notes stay tied to Cisco source material. <a id="calculate-cost-cisco-cite-technical-primary" class="calculate-cost-cisco-citation-link" href="#calculate-cost-cisco-ref-primary"><span class="calculate-cost-cisco-citation-inline">Cisco (2024)</span></a> anchors the campus hardware and management categories, <a id="calculate-cost-cisco-cite-technical-method" class="calculate-cost-cisco-citation-link" href="#calculate-cost-cisco-ref-method"><span class="calculate-cost-cisco-citation-inline">Cisco (n.d.)</span></a> anchors the licensing assumptions that remain editable in the calculator, and <a id="calculate-cost-cisco-cite-technical-review" class="calculate-cost-cisco-citation-link" href="#calculate-cost-cisco-ref-review"><span class="calculate-cost-cisco-citation-inline">Cisco Meraki (n.d.)</span></a> anchors the subscription and management-license review surface that should be checked before the estimate becomes a budget note.

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

<h3 class="calculate-cost-cisco-technical-step-heading">1. Estimate model</h3>

Each estimate starts with a label, preset, included services, usage quantities, editable rates, and overhead settings. The result is recalculated from the current inputs instead of from separate table state.

<h3 class="calculate-cost-cisco-technical-step-heading">2. Starter catalog and overrides</h3>

The workspace includes a compact starter catalog for common Cisco commercial pricing inputs. These rates are intentionally visible in Advanced controls so they can be replaced when your region, enterprise agreement, discount model, or workload shape differs.

<h3 class="calculate-cost-cisco-technical-step-heading">3. Service drivers</h3>

<div class="calculate-cost-cisco-markdown-table-wrap">
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
      <td>Switching hardware</td>
      <td>Switch platform, unit count, lifecycle window, purchase model, and optional custom hourly rate.</td>
      <td>Is the platform tier realistic for this site count and port density?</td>
    </tr>
    <tr>
      <td>Wireless access</td>
      <td>Access point units, controller capacity units, throughput allowance, and rate overrides.</td>
      <td>Is the access point count sized from real coverage and client-density assumptions?</td>
    </tr>
    <tr>
      <td>Licensing</td>
      <td>License units, telemetry transfer, policy checks, configuration changes, and rate overrides.</td>
      <td>Will entitlement tier or telemetry volume dominate the licensing number?</td>
    </tr>
    <tr>
      <td>Controller automation</td>
      <td>Monthly jobs, average duration, worker memory, job rate, GB-second rate, and free-tier toggle.</td>
      <td>Are automation runs based on measured operations or optimism with a badge?</td>
    </tr>
    <tr>
      <td>Cloud management</td>
      <td>Essentials or Advantage management model, monthly API calls, response size, transfer contribution, and free-tier toggle.</td>
      <td>Does the management tier materially change the estimate compared with a lighter model?</td>
    </tr>
    <tr>
      <td>Shared transfer</td>
      <td>Combined telemetry transfer, free-tier toggle, and transfer rate override.</td>
      <td>Is transfer separated clearly enough to survive review?</td>
    </tr>
  </tbody>
</table>
</div>

<h3 class="calculate-cost-cisco-technical-step-heading">4. Formula boundaries</h3>

The output is arithmetic from visible assumptions. It does not discover real accounts, read billing history, validate live Cisco regional prices, include every Cisco component, calculate taxes, apply private pricing, or prove budget readiness.

<ul class="tool-technical-warning-list">
  <li>Starter rates are local assumptions and may differ by region, contract, discount, support plan, or purchasing model.</li>
  <li>Manual adjustments can explain known gaps, but they should not hide missing services or uncertain usage.</li>
  <li>JSON preserves the estimate model, not proof that a provider or partner would bill the same amount.</li>
</ul>

<h3 class="calculate-cost-cisco-technical-step-heading">5. Review boundaries</h3>

<div class="calculate-cost-cisco-markdown-table-wrap">
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
      <td>Verify expensive rates in Cisco Commerce, partner quotes, billing exports, agreement price sheets, or contract data.</td>
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

<h3 class="calculate-cost-cisco-technical-step-heading">6. How to read the estimate</h3>

Read the output as a planning model, not a bill. The calculator is useful because every material number is visible: usage, rate, purchase model, regional uplift, buffer, free-tier toggle, and manual adjustment. That visibility makes the estimate easier to challenge than a pasted total from a private spreadsheet. It also means the estimate is only as strong as the assumptions you feed it.

For Cisco network planning, the first review pass should separate site shape from commercial reality. Site shape covers switch count, access point count, licensing units, controller automation volume, cloud management tier, telemetry transfer, and lifecycle window. Commercial reality covers purchase model, partner discounts, Smart Account entitlements, support coverage, refresh timing, and contract-specific pricing. The workspace can expose fields for those ideas, but it does not know your quote, standard platform list, or live asset inventory.

<h3 class="calculate-cost-cisco-technical-step-heading">7. Scenario discipline</h3>

Use presets as named starting points, then rename the estimate to match the real scenario. A useful label explains the site and scope, such as a branch refresh, campus access expansion, wireless uplift, controller migration, or shared network baseline. If two scenarios differ in port density, access point count, licensing tier, support model, or management plane, keep them as separate exports. One overloaded estimate tends to hide the cost driver that reviewers actually need to discuss.

The service mix chart is a triage surface. It tells you where to spend review time first. If switching dominates, inspect platform tier, lifecycle window, and unit count. If wireless dominates, inspect coverage assumptions, access point density, and controller capacity. If licensing or cloud management dominates, challenge entitlement tier, telemetry volume, API usage, and whether the estimate reflects rollout or steady-state operations.

<h3 class="calculate-cost-cisco-technical-step-heading">8. Assumption hygiene</h3>

Treat every override as a note to future reviewers. A custom hardware rate, transfer rate, management price, uplift, or manual adjustment should have a reason outside the tool: a partner quote, contract sheet, historical purchase, architecture decision, or known scope gap. The calculator will carry the number, but it will not defend the number in a budget meeting.

Free-tier toggles need the same care. They are useful for rough early estimates, but they can mislead when shared tooling, mature operations, or production monitoring has already consumed those allowances. When the estimate is meant for a business decision, review free-tier assumptions separately and turn them off if they are not material or dependable.

Manual adjustment is intentionally blunt. Use it when a known cost is outside the modeled service cards or when you need to represent a credit, migration overlap, one-off reduction, or placeholder for hardware, support, or services not yet modeled. Do not use it to bury uncertainty. Name the gap in handoff notes so the adjustment remains reviewable.

<h3 class="calculate-cost-cisco-technical-step-heading">9. Export and handoff behavior</h3>

CSV is for spreadsheet review and line-item comparison. JSON is for preserving the normalized estimate payload. Copying the visible result is fine for quick discussion, but JSON is the better handoff artifact when another person needs to reopen the assumptions, compare scenarios, or keep a record of the exact inputs behind the number.

The estimate does not read Cisco Commerce, partner portals, inventory systems, live telemetry, license portals, or procurement data. It also does not calculate taxes, support renewals, professional services, shipping, spares, cabling, optics, rack work, or private discounts unless you express those effects through visible overrides or adjustments. That boundary keeps the page fast, transparent, and honest about what it knows.

<h3 class="calculate-cost-cisco-technical-step-heading">10. Practical review checklist</h3>

Before sharing a Cisco network estimate, confirm that the scenario label, preset, included components, lifecycle window, site count, device quantities, license units, and transfer assumptions describe the same scope. Mixed scopes are the fastest way to produce a confident-looking number that nobody can actually defend.

<ul class="tool-technical-checklist">
  <li><strong>Scope:</strong> Confirm the label, preset, included components, excluded components, monthly horizon, and target environment.</li>
  <li><strong>Usage:</strong> Review monthly hours, units, storage, requests, data transfer, and utilization against the same workload.</li>
  <li><strong>Rates:</strong> Check starter rates, custom overrides, discounts, support uplift, buffer, free-tier toggles, and manual adjustments.</li>
  <li><strong>Drivers:</strong> Review the largest service line items first and attach source notes for the number.</li>
  <li><strong>Handoff:</strong> Export CSV and JSON when the estimate will be reviewed, compared, restored, or approved.</li>
</ul>


Then review the largest line items in order. For switching hardware, check whether the platform tier, unit count, port density, and lifecycle window match the expected site design. For wireless access, check access point count against coverage, density, mounting, and controller assumptions. For licensing, check whether the entitlement tier matches required features rather than a convenient default. For controller automation and cloud management, make sure job volume, API calls, transfer, and management tier are tied to real operational assumptions.

Use the buffer as a risk control, not a hiding place. A small buffer can cover early uncertainty. A large buffer should trigger a note about what is unknown: site readiness, cabling, optics, spares, support, licensing, or missing service scope. If the estimate needs a manual adjustment, describe it during handoff so another reviewer knows whether it represents a gap, a credit, a migration overlap, or a deliberate placeholder.

Finally, export both CSV and JSON when the estimate matters. CSV supports finance review, spreadsheet comparison, and line-item comments. JSON preserves the model that produced the result. If the estimate changes later, the exported JSON gives you a clean starting point for explaining what moved and why.

<h3 class="calculate-cost-cisco-technical-step-heading">11. What the number should trigger</h3>

A good Cisco network estimate should create better questions, not end the conversation. Ask whether the design can reduce hardware tiers, whether wireless density matches real coverage needs, whether management licensing maps to required features, and whether telemetry or support costs are being hidden outside the model. Ask who owns the cost once the design moves from planning to operations. Ask which metric will prove the estimate is drifting after rollout.

When the estimate supports a decision, attach the context that made the number reasonable: date, site scope, workload label, lifecycle model, purchase model, included components, excluded components, and the largest uncertainty. That small discipline turns the output into a review artifact instead of a lonely total. It also makes later comparison fair. If a future estimate increases, reviewers can see whether the site grew, the rate changed, the buffer moved, or a missing component finally entered scope.

Use the final number with plain language. Say what the estimate includes, what it excludes, and which inputs deserve the next review. If the number is used for budget approval, pair it with a low, expected, and high scenario rather than pretending one draft is precise. If it is used for engineering planning, pair it with the topology diagram, expected rollout event, and first measurement checkpoint. The estimate should make the next decision easier: approve discovery, resize the site, compare purchase models, collect real inventory data, or stop a design that is already too expensive for its goal.

When reviewers can trace a total back to explicit assumptions, the estimate becomes useful before it is perfect, because the team knows which quantities to measure, which quotes to verify, and which scope gaps need owners.

</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.03_example-prompts -->
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-examples">

## Example Prompts

<p>Copy one preset-aligned prompt, use it as the estimate brief, then apply the matching preset and set the visible controls before sharing the result.</p>

<pre class="calculate-cost-cisco-prompt-pre"><code>Estimate a Cisco branch access bundle from the Branch access bundle preset. Include 2 Catalyst 9300 stack units across the monthly lifecycle window, 120 access point units, 250 license units, 80 GB telemetry transfer, 2 million cloud management calls with 32 KB average response size, 120 GB shared transfer, 5% support uplift, and 10% contingency.</code></pre>

<details class="calculate-cost-cisco-prompt-note" open>
  <summary>
    <span class="calculate-cost-cisco-prompt-note-label calculate-cost-cisco-prompt-note-label-closed">Show prompt use</span>
    <span class="calculate-cost-cisco-prompt-note-label calculate-cost-cisco-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="calculate-cost-cisco-prompt-copy-btn" data-prompt-copy-index="0">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-cash-stack fs-5" aria-hidden="true"></i>
    <div><strong>Baseline:</strong> Useful for a small branch or campus edge where switching, wireless, licensing, and modest transfer are the first values to challenge.</div>
  </div>
</details>

<pre class="calculate-cost-cisco-prompt-pre"><code>Estimate a Cisco wireless refresh from the Wireless refresh preset. Disable switching hardware if the refresh is access-point only. Include 80 license units, 40 GB telemetry transfer, 12 million controller automation jobs at 180 ms average duration and 512 MB worker memory, 12 million cloud management calls with 24 KB average response size, 120 GB shared transfer, applicable free-tier toggles, 8% support uplift, and 12% contingency.</code></pre>

<details class="calculate-cost-cisco-prompt-note">
  <summary>
    <span class="calculate-cost-cisco-prompt-note-label calculate-cost-cisco-prompt-note-label-closed">Show prompt use</span>
    <span class="calculate-cost-cisco-prompt-note-label calculate-cost-cisco-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="calculate-cost-cisco-prompt-copy-btn" data-prompt-copy-index="1">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-lightning-charge fs-5" aria-hidden="true"></i>
    <div><strong>Automation-heavy:</strong> Useful when management activity, automation duration, telemetry, and licensing drive the conversation more than hardware count.</div>
  </div>
</details>

<pre class="calculate-cost-cisco-prompt-pre"><code>Estimate a Cisco campus core refresh from the Campus core refresh preset. Include 6 Catalyst 9500 distribution units across the monthly lifecycle window with enterprise agreement comparison, 900 access point units, 2 TB-equivalent license units, 600 GB telemetry transfer, 8 million Advantage management calls with 48 KB average response size, 600 GB shared transfer, 10% support uplift, and 15% contingency.</code></pre>

<details class="calculate-cost-cisco-prompt-note">
  <summary>
    <span class="calculate-cost-cisco-prompt-note-label calculate-cost-cisco-prompt-note-label-closed">Show prompt use</span>
    <span class="calculate-cost-cisco-prompt-note-label calculate-cost-cisco-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="calculate-cost-cisco-prompt-copy-btn" data-prompt-copy-index="2">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-bar-chart-line fs-5" aria-hidden="true"></i>
    <div><strong>Commitment review:</strong> Useful when a stable workload may justify comparing Monthly allocation, enterprise agreement, and reserved coverage assumptions.</div>
  </div>
</details>

<pre class="calculate-cost-cisco-prompt-pre"><code>Estimate a mixed Cisco network plan from the Blank estimate preset. Include a custom switching profile with 4 units, 500 monthly lifecycle hours, monthly allocation pricing, 600 access point units, 1200 license units, 350 GB telemetry transfer, 3 million controller automation jobs at 250 ms and 1024 MB worker memory, 4 million Essentials management calls with 40 KB response size, 300 GB shared transfer, a named manual adjustment for known support, cabling, optics, observability, or backup costs, 10% support uplift, and 10% contingency.</code></pre>

<details class="calculate-cost-cisco-prompt-note calculate-cost-cisco-prompt-note-last">
  <summary>
    <span class="calculate-cost-cisco-prompt-note-label calculate-cost-cisco-prompt-note-label-closed">Show prompt use</span>
    <span class="calculate-cost-cisco-prompt-note-label calculate-cost-cisco-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="calculate-cost-cisco-prompt-copy-btn" data-prompt-copy-index="3">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-info d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-diagram-3 fs-5" aria-hidden="true"></i>
    <div><strong>Scope-gap review:</strong> Useful when the calculator covers most of the workload, but a few known Cisco network components must be added as explicit manual adjustments.</div>
  </div>
</details>

</div>
<!-- ns:end main.content.03_example-prompts -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-prompt-tips calculate-cost-cisco-markdown-card-input-tips">

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
<li>Telemetry transfer, licensing checks, or controller automation duration are large enough to dominate the result.</li>
<li>The architecture includes services this calculator does not model directly.</li>
</ul>
</div>
</details>

</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-how-to">
  <h2 class="calculate-cost-cisco-section-heading"><i class="bi bi-list-check calculate-cost-cisco-section-heading-icon" aria-hidden="true"></i><span>How To Use</span></h2>

  <details class="tool-guidance-item" open>
    <summary><i class="bi bi-card-checklist tool-guidance-icon" aria-hidden="true"></i> <span>1. Start with a preset or estimate label</span></summary>
    <div class="tool-guidance-answer">
      <p>Choose the closest Cisco Network Cost Calculator preset, then name the estimate or scenario so exported results can be traced back to the workload being reviewed.</p>
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
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-export">
  <h2 class="calculate-cost-cisco-section-heading"><i class="bi bi-download calculate-cost-cisco-section-heading-icon" aria-hidden="true"></i><span>Export Notes</span></h2>
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
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-citations">

## References

These sources support the in-text citations used in this tool page.

<table class="calculate-cost-cisco-citation-table">
  <thead>
    <tr>
      <th>Source type</th>
      <th>In-text citation</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr id="calculate-cost-cisco-ref-primary">
      <td>Design guide</td>
      <td><a class="calculate-cost-cisco-citation-backlink" href="#calculate-cost-cisco-cite-primary"><span class="calculate-cost-cisco-citation-inline">(Cisco, 2024)</span></a></td>
      <td>Cisco. (2024, August 27). <em>Cisco Cloud Campus LAN Design Guide (CVD)</em>. <a href="https://www.cisco.com/c/en/us/solutions/collateral/enterprise/design-zone-campus/cloud-campus-lan-design-guide.html">https://www.cisco.com/c/en/us/solutions/collateral/enterprise/design-zone-campus/cloud-campus-lan-design-guide.html</a></td>
    </tr>
    <tr id="calculate-cost-cisco-ref-method">
      <td>Data sheet</td>
      <td><a class="calculate-cost-cisco-citation-backlink" href="#calculate-cost-cisco-cite-method"><span class="calculate-cost-cisco-citation-inline">(Cisco, n.d.)</span></a></td>
      <td>Cisco. (n.d.). <em>Cisco Catalyst Software Subscription for Switching data sheet</em>. Retrieved May 13, 2026, from <a href="https://www.cisco.com/c/en/us/products/collateral/software/one-subscription-switching/nb-06-dna-sw-sub-access-sw-ctp-en.html">https://www.cisco.com/c/en/us/products/collateral/software/one-subscription-switching/nb-06-dna-sw-sub-access-sw-ctp-en.html</a></td>
    </tr>
    <tr id="calculate-cost-cisco-ref-review">
      <td>Documentation</td>
      <td><a class="calculate-cost-cisco-citation-backlink" href="#calculate-cost-cisco-cite-review"><span class="calculate-cost-cisco-citation-inline">(Cisco Meraki, n.d.)</span></a></td>
      <td>Cisco Meraki. (n.d.). <em>Meraki Licensing</em>. Retrieved May 13, 2026, from <a href="https://documentation.meraki.com/General_Administration/Product_Information/Licensing/Meraki_Licensing">https://documentation.meraki.com/General_Administration/Product_Information/Licensing/Meraki_Licensing</a></td>
    </tr>
  </tbody>
</table>

</div>
<!-- ns:end main.content.10_references -->

<!-- ns:start main.content.07_faq -->
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-faq">

## FAQ

<details class="faq-item" open>
  <summary>Is this the Cisco commercial pricing calculator?</summary>
  <div class="faq-answer">
    No. It is an InfraStack planning calculator with visible starter assumptions and editable overrides.
  </div>
</details>

<details class="faq-item">
  <summary>Does it use live Cisco commercial pricing?</summary>
  <div class="faq-answer">
    No. It uses browser-side starter rates and any overrides you enter. Verify material numbers in Cisco Commerce, partner quotes, billing exports, agreement price sheets, or contract data.
  </div>
</details>

<details class="faq-item">
  <summary>Which services are modeled directly?</summary>
  <div class="faq-answer">
    The current calculator models switching hardware, wireless access, licensing, controller automation, cloud management, shared transfer, support uplift, contingency, and manual monthly adjustments.
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
<div class="content-card calculate-cost-cisco-markdown-card calculate-cost-cisco-markdown-card-acronyms">

## Acronyms

<div class="calculate-cost-cisco-markdown-table-wrap">
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
      <td>Cisco</td>
      <td>Cisco Systems</td>
      <td>The network vendor modeled by this calculator.</td>
    </tr>
    <tr>
      <td>SKU</td>
      <td>Stock Keeping Unit</td>
      <td>Commercial assumptions, purchase model, and unit count often drive the estimate.</td>
    </tr>
    <tr>
      <td>Wireless access</td>
      <td>Cisco Wireless access</td>
      <td>Access point units, controller capacity, and throughput assumptions can add steady monthly cost.</td>
    </tr>
    <tr>
      <td>Licensing</td>
      <td>Cisco Licensing</td>
      <td>License units, policy checks, configuration changes, and telemetry transfer assumptions can change the result.</td>
    </tr>
    <tr>
      <td>API</td>
      <td>Application Programming Interface</td>
      <td>Cloud management request volume and response size are modeled inputs.</td>
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
