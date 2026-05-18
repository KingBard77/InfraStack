[//]: # (content.md)

<div class="content-card __PREFIX__-markdown-card __PREFIX__-markdown-card-technical">
  <h2 class="__PREFIX__-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>
  <p>The workspace builds one normalized model from the prompt, selected preset, and current inspector state. That same model drives the SVG stage, technical inventory, prompt notes, score banner, and JSON export.</p>

  <div class="tool-technical-scan-grid" aria-label="Technical Details quick scan">
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">First scan</span>
      <strong>Read the model like evidence.</strong>
      <ul>
        <li>Start with prompt notes to separate explicit input from preset defaults.</li>
        <li>Check the generated boundary before trusting the rest of the diagram.</li>
      </ul>
    </section>
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">Design path</span>
      <strong>Follow traffic in order.</strong>
      <ul>
        <li>Trace ingress, private placement, data dependencies, egress, and external links.</li>
        <li>Use the table at the end as the fast review checklist.</li>
      </ul>
    </section>
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">Handoff</span>
      <strong>Keep editable state with the picture.</strong>
      <ul>
        <li>PNG and SVG are presentation exports.</li>
        <li>JSON is the restore format for follow-up edits and comparison.</li>
      </ul>
    </section>
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">Stop line</span>
      <strong>Do not overread the output.</strong>
      <ul>
        <li>The workspace organizes a first pass; it does not inspect a live environment.</li>
        <li>Implementation, policy, sizing, and approval checks stay outside the diagram.</li>
      </ul>
    </section>
  </div>

  <h3 class="__PREFIX__-technical-step-heading">1. Prompt interpretation and defaults</h3>
  <p>The parser should be deterministic and domain-specific. If the same prompt, preset, and control values are provided, the workspace should produce the same result.</p>
  <ul>
    <li>Name the scope, region or boundary when those values matter.</li>
    <li>Describe the visible components and their placement layers.</li>
    <li>Include ingress, private paths, observability, and external links explicitly.</li>
  </ul>
  <h3 class="__PREFIX__-technical-step-heading">2. Placement layers</h3>
  <p>The stage should use clear grouping so the traffic path, ownership boundary, or dependency chain stays readable. The layout favors review clarity over low-level implementation detail.</p>
  <h3 class="__PREFIX__-technical-step-heading">3. What can be edited after generation</h3>
  <p>After generation, users can adjust controls, drag or resize supported stage objects, inspect inventory and prompt notes, and export PNG, SVG, or JSON.</p>
  <h3 class="__PREFIX__-technical-step-heading">4. Practical review workflow</h3>
  <p>A practical review starts with the prompt notes, then moves through the diagram as a short design review. Use this sequence before sharing the output:</p>
  <ul class="tool-technical-checklist">
    <li><strong>Intent:</strong> Compare the prompt notes with the real design brief and mark every preset-filled assumption.</li>
    <li><strong>Boundary:</strong> Confirm the main container matches ownership, trust, routing, and support scope.</li>
    <li><strong>Path:</strong> Trace ingress, private workload placement, data dependencies, egress, and external links in order.</li>
    <li><strong>Operations:</strong> Check whether monitoring, logging, backup, and support surfaces are visible enough for review.</li>
    <li><strong>State:</strong> Export JSON when the design will be reopened, compared, or corrected later.</li>
  </ul>
  <h3 class="__PREFIX__-technical-step-heading">5. What the export does not prove</h3>
  <p>Exported output is evidence of workspace state, not evidence that the architecture is ready to deploy. The workspace does not confirm:</p>
  <ul class="tool-technical-warning-list">
    <li>Environment facts such as quotas, route propagation, service reachability, or live configuration drift.</li>
    <li>Control facts such as policy completeness, backup success, support ownership, or incident-response maturity.</li>
    <li>Organization facts such as internal standard approval, change-control acceptance, or implementation readiness.</li>
  </ul>
  <table>
    <thead>
      <tr>
        <th>Component area</th>
        <th>Technical behavior</th>
        <th>Design implication</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Prompt interpretation</td>
        <td>Deterministically extracts domain-specific terms and applies bounded defaults when the prompt is incomplete.</td>
        <td>Use explicit infrastructure language when accuracy matters, then check prompt notes for assumptions.</td>
      </tr>
      <tr>
        <td>Boundary model</td>
        <td>Defines the primary container for placement layers, routing intent, entry paths, dependencies, and service placement.</td>
        <td>Keep sizing and grouping realistic enough for future growth and expansion.</td>
      </tr>
      <tr>
        <td>Edge services</td>
        <td>Places DNS, filtering, public ingress, or controlled entry components before the application tier when enabled.</td>
        <td>Use these when traffic filtering, edge delivery, or controlled public entry matters.</td>
      </tr>
      <tr>
        <td>Public entry layer</td>
        <td>Hosts internet-relevant services such as the load balancer, public endpoint, gateway, or access broker.</td>
        <td>Keep internet-facing components limited and avoid moving private workloads into public space for convenience.</td>
      </tr>
      <tr>
        <td>Private workload layer</td>
        <td>Represents compute, runtime, or platform workloads that accept traffic through controlled ingress.</td>
        <td>Good default for application, API, container, and platform components that should not be directly reachable.</td>
      </tr>
      <tr>
        <td>Protected data layer</td>
        <td>Represents databases, caches, queues, and shared dependencies placed away from public ingress.</td>
        <td>Use this layer to communicate isolation, not detailed administration settings.</td>
      </tr>
      <tr>
        <td>Operations layer</td>
        <td>Adds monitoring, logging, backup, or support surfaces to the model when the tool implements them.</td>
        <td>Include them when the design needs to show operational readiness, not just request-path components.</td>
      </tr>
      <tr>
        <td>JSON state</td>
        <td>Preserves normalized values, prompt notes, layout overrides, connector overrides, and structured output.</td>
        <td>Use JSON for restore and ongoing work. PNG and SVG do not preserve editable workspace state.</td>
      </tr>
    </tbody>
  </table>
</div>
