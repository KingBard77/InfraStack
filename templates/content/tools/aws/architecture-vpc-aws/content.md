[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-overview">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>
  <p><strong>AWS VPC Architecture</strong> is an InfraStack prompt-driven workspace for turning a short AWS VPC brief into a first-pass architecture diagram. The workspace reads explicit terms such as <span class="architecture-vpc-aws-term-accent">region</span>, <span class="architecture-vpc-aws-term-accent">availability zone</span>, <span class="architecture-vpc-aws-term-accent">VPC CIDR</span>, ingress services, workload tier, data tier, egress mode, observability controls, and hybrid links, then uses that normalized model to render the stage, technical inventory, prompt notes, and export state.</p>
  <p><a id="architecture-vpc-aws-cite-primary" class="architecture-vpc-aws-citation-link" href="#architecture-vpc-aws-ref-primary"><span class="architecture-vpc-aws-citation-inline">Amazon Web Services (n.d.-a)</span></a> describes Amazon VPC as a logically isolated virtual network for AWS resources. The workspace uses that source-backed boundary as the anchor for placement, review, and restore behavior.</p>
  <p>Use the workspace first. Start with a prompt or preset, generate the initial model, then refine it through the inspector and stage instead of rebuilding the architecture from scratch. You can change control values, move supported stage objects, review inventory rows, and save the working state as JSON.</p>
  <p>This first pass is useful for review, presales, handover, documentation, and option comparison. It is not a final implementation source, certification result, or substitute for engineering review.</p>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-technical">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>
  <p>The workspace builds one normalized architecture model from the prompt, selected preset, and current inspector state. That same model drives the visual stage, technical inventory, prompt notes, score or status summary, and JSON export. <a id="architecture-vpc-aws-cite-technical-primary" class="architecture-vpc-aws-citation-link" href="#architecture-vpc-aws-ref-primary"><span class="architecture-vpc-aws-citation-inline">Amazon Web Services (n.d.-a)</span></a> describes Amazon VPC as a logically isolated virtual network for AWS resources, so the generated boundary is treated as a planning container rather than a decorative frame. <a id="architecture-vpc-aws-cite-method" class="architecture-vpc-aws-citation-link" href="#architecture-vpc-aws-ref-method"><span class="architecture-vpc-aws-citation-inline">Amazon Web Services (n.d.-b)</span></a> describes NAT gateways as an outbound path for private resources without allowing external services to initiate connections, which is why egress and private-access choices are exposed as reviewable architecture intent instead of hidden assumptions.</p>

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
      <li>Trace ingress, private placement, data dependencies, egress, and hybrid links.</li>
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

<h3 class="architecture-vpc-aws-technical-step-heading">1. Prompt interpretation and defaults</h3>
<p>The parser is deterministic and AWS VPC-specific. If the same prompt, preset, and control values are provided, the workspace should produce the same first-pass model. The prompt is not treated as prose to be admired; it is treated as structured design evidence. Explicit terms such as <code>us-east-1</code>, <code>10.0.0.0/16</code>, <code>EC2 Auto Scaling</code>, <code>ECS Fargate</code>, <code>EKS</code>, <code>RDS</code>, <code>Aurora</code>, <code>DynamoDB</code>, <code>Route 53</code>, <code>CloudFront</code>, <code>AWS WAF</code>, and <code>single NAT gateway</code>, <code>one NAT gateway per AZ</code>, <code>no NAT</code> give the parser concrete choices to map. When a prompt is short, the selected preset fills the gaps and the prompt notes surface those assumptions for review.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">2. Boundary and placement layers</h3>
<p>The VPC is rendered as the main workspace boundary, with placement layers for public entry, private workloads, protected data, operations, and external connectivity. This is deliberately higher level than an implementation diagram. It shows how components relate, where traffic enters, which layers should stay private, and where supporting services sit. It does not try to replace low-level address management, route-table documentation, interface-level cabling, policy design, or infrastructure-as-code. The useful review question is whether the visible boundary matches the intended ownership and trust model.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">3. Ingress and edge path</h3>
<p>Edge components such as <code>Route 53</code>, <code>CloudFront</code>, <code>AWS WAF</code>, <code>Application Load Balancer</code> are placed before the main workload path when they are enabled or named in the prompt. That makes public entry, request filtering, DNS, delivery, and load balancing visible in one line of sight. If those services are omitted, the generated path becomes simpler and the prompt notes should make the omission visible. The workspace does not infer every edge decision. TLS policy, certificate ownership, advanced filtering rules, identity-aware access, and traffic-management failover still require design review outside the generated first pass.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">4. Workload and data tiers</h3>
<p>Workload choices such as <code>EC2 Auto Scaling</code>, <code>ECS Fargate</code>, <code>EKS</code>, <code>Lambda in VPC</code> are placed in the application layer so reviewers can see runtime responsibility without reading a deployment plan. Data and dependency choices such as <code>RDS</code>, <code>Aurora</code>, <code>DynamoDB</code>, <code>ElastiCache Redis</code> are placed in protected or service-adjacent positions depending on how the tool models that provider or domain. The diagram uses these names as role markers. It does not validate engine versions, replication policies, maintenance windows, backup schedules, encryption keys, capacity limits, licensing constraints, or patch ownership. Those details belong in the review backlog or implementation plan.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">5. Egress, private access, and hybrid connectivity</h3>
<p>Egress settings communicate a design tradeoff. <code>single NAT gateway</code>, <code>one NAT gateway per AZ</code>, <code>no NAT</code> change the visual path and the inventory notes because outbound access affects resilience, cost, control, and troubleshooting. Private service access through <code>VPC endpoints</code> appears separately from general outbound access because it usually carries a different policy and review boundary. Hybrid choices such as <code>Site-to-Site VPN</code>, <code>Transit Gateway</code> extend the model beyond a standalone environment. Once those appear, reviewers should check routing ownership, propagated routes, segmentation, failure paths, and operational handoff rather than treating the connector as a finished network design.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">6. Operations, observability, and support surfaces</h3>
<p>Operations choices such as <code>CloudWatch</code>, <code>VPC Flow Logs</code> are not on the direct request path, but they matter because an architecture that cannot be observed or restored is hard to operate. The workspace places those surfaces near the model so reviewers remember to discuss metrics, logs, retention, ownership, alert routing, backup evidence, and support access. Their presence is a prompt for the conversation, not proof that monitoring or recovery is complete. The generated score or status summary is advisory and bounded to the model that the workspace can see.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">7. Editable stage and normalized state</h3>
<p>After generation, controls and stage edits refine the same normalized state. Users can adjust visible settings, move or resize supported stage objects, reset layout, inspect generated inventory, copy rows, and export the result. JSON is the durable state boundary because it preserves the prompt, preset, controls, inventory, notes, and layout overrides. PNG and SVG are presentation outputs. They are useful for tickets, documents, chat, and slides, but they do not preserve the full editable workspace. When a design needs to be revisited, the JSON should travel with any image export.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">8. Limits and review points</h3>
<p><a id="architecture-vpc-aws-cite-review" class="architecture-vpc-aws-citation-link" href="#architecture-vpc-aws-ref-review"><span class="architecture-vpc-aws-citation-inline">Amazon Web Services (2024)</span></a> frames workload review around the AWS Well-Architected pillars, so this page treats the generated output as review material rather than validation evidence. The workspace does not certify security, resilience, compliance, production readiness, cost accuracy, service availability, or implementation completeness. It also does not perform detailed subnet math, policy analysis, failover simulation, performance sizing, or change-control approval. A useful first pass can still be wrong when the prompt is vague, the selected preset is a poor fit, or the real environment has constraints that the browser-side model cannot see.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">9. Practical review workflow</h3>
<p>A practical review starts with the prompt notes, then moves through the diagram as a short design review rather than a slow essay. Use this sequence before sharing the output:</p>
<ul class="tool-technical-checklist">
  <li><strong>Intent:</strong> compare the prompt notes with the real design brief and mark every preset-filled assumption.</li>
  <li><strong>Boundary:</strong> confirm the main container matches ownership, trust, routing, and support scope.</li>
  <li><strong>Path:</strong> trace ingress, private workload placement, data dependencies, egress, and external links in order.</li>
  <li><strong>Operations:</strong> check whether monitoring, logging, backup, and support surfaces are visible enough for review.</li>
  <li><strong>State:</strong> export JSON when the design will be reopened, compared, or corrected later.</li>
</ul>

<h3 class="architecture-vpc-aws-technical-step-heading">10. Handoff checklist</h3>
<p>A clean handoff includes the diagram, the inventory rows, the prompt notes, and the JSON state. The diagram explains the visible model, but the notes explain how the workspace interpreted the prompt. The inventory gives reviewers a compact list of components, placements, and purposes. The JSON keeps the model editable so another reviewer can reopen the same state instead of recreating it from memory. For AWS VPC Architecture, the handoff should also state which choices came from the prompt, which choices came from the preset, and which choices were corrected after generation. That distinction matters because a diagram that looks polished can still hide a weak assumption if the team does not know where a value came from.</p>
<p>Before sharing the artifact outside the immediate design conversation, answer these handoff checks:</p>
<ul class="tool-technical-checklist">
  <li>Who owns each visible component, external connection, and operational surface?</li>
  <li>Which private layers must stay private, and what still needs policy or routing review?</li>
  <li>Which assumptions came from the prompt, the preset, or manual correction after generation?</li>
  <li>Which export format matches the next workflow: visual review, ticket attachment, approval prep, or later restoration?</li>
</ul>
<p>Use PNG or SVG when the next step is visual review. Use JSON when the next step is iteration, comparison, approval preparation, or later restoration. Do not let an image-only export become the only record of a design that still needs editing.</p>

<h3 class="architecture-vpc-aws-technical-step-heading">11. What the export does not prove</h3>
<p>Exported output is evidence of workspace state, not evidence that the architecture is ready to deploy. The workspace does not inspect a live account, device, tenant, rack, or provider subscription. It also does not confirm:</p>
<ul class="tool-technical-warning-list">
  <li>Environment facts such as quotas, subnet availability, route propagation, or service reachability;</li>
  <li>Control facts such as firewall policy, backup success, license coverage, or incident-response maturity;</li>
  <li>Provider facts such as regional service availability, platform limits, or live configuration drift;</li>
  <li>Organization facts such as internal standard approval, ownership assignment, or change-control acceptance.</li>
</ul>
<p>Those checks belong to engineering review, provider documentation review, implementation planning, and environment-specific validation.</p>
<p>The right use of the export is disciplined communication. The diagram should make the model easy to discuss; the table should make assumptions easy to scan; the JSON should make the work reproducible. Treat the output as a structured draft that reduces ambiguity before the real implementation decisions are made. That is useful precisely because it stays honest about its boundary: it can organize the conversation, but it cannot replace the architecture review.</p>
<p>For that reason, reviewers should keep source prompts, exported JSON, and meeting decisions together. If a later change alters placement, connectivity, or operations intent, regenerate or import the JSON state and make the change visible in the workspace instead of patching only a screenshot. That keeps the review trail inspectable and prevents stale diagram copies from becoming quiet design debt.</p>

<table>
  <thead>
    <tr>
      <th>Review area</th>
      <th>Workspace behavior</th>
      <th>Design implication</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Prompt</td><td>Extracts provider or domain terms and applies preset defaults when details are missing.</td><td>Check prompt notes before accepting inferred values.</td></tr>
    <tr><td>Boundary</td><td>Renders the VPC as the main ownership and placement container.</td><td>Confirm the boundary matches the intended trust and routing model.</td></tr>
    <tr><td>Ingress</td><td>Places edge services such as Route 53 and CloudFront before workloads when enabled.</td><td>Review public entry, filtering, and load-balancing assumptions.</td></tr>
    <tr><td>Private layers</td><td>Separates workload and data responsibilities into readable placement layers.</td><td>Validate isolation, dependency, backup, and support ownership outside the diagram.</td></tr>
    <tr><td>Egress</td><td>Shows outbound or private-access intent through the selected egress model.</td><td>Review routing, policy, failure mode, and cost implications separately.</td></tr>
    <tr><td>JSON</td><td>Preserves the editable model and layout state.</td><td>Use JSON for restore; use PNG or SVG only for presentation.</td></tr>
  </tbody>
</table>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.03_example-prompts -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-examples">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-chat-square-text" aria-hidden="true"></i><span>Example Prompts</span></h2>
  <p>Paste one of these prompts into the architecture prompt box, generate the first pass, then verify the prompt notes and technical inventory before exporting or sharing the result.</p>

<pre class="architecture-vpc-aws-prompt-pre"><code>Create an AWS VPC Architecture in us-east-1 with VPC CIDR 10.0.0.0/16. Use public subnets for an internet-facing Application Load Balancer, private app subnets for EC2 Auto Scaling, private data subnets for Multi-AZ RDS PostgreSQL, a single NAT gateway, VPC endpoints for S3 and Systems Manager, CloudWatch, and VPC Flow Logs.</code></pre>

<details class="architecture-vpc-aws-prompt-note">
  <summary>
    <span class="architecture-vpc-aws-prompt-note-label architecture-vpc-aws-prompt-note-label-closed">Show prompt use</span>
    <span class="architecture-vpc-aws-prompt-note-label architecture-vpc-aws-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="architecture-vpc-aws-prompt-copy-btn" data-prompt-copy-index="0">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-diagram-3 fs-5"></i>
    <div><strong>Baseline review:</strong> Use this when the visible model should start from a known review scenario and then be refined through controls.</div>
  </div>
</details>

<pre class="architecture-vpc-aws-prompt-pre"><code>Build an AWS VPC architecture in eu-west-1 across 2 availability zones for an ECS Fargate platform. Put CloudFront and AWS WAF in front of an Application Load Balancer, keep ECS services in private app subnets, use Aurora in private data subnets, add ElastiCache Redis, VPC endpoints, CloudWatch, flow logs, and one NAT gateway per AZ.</code></pre>

<details class="architecture-vpc-aws-prompt-note">
  <summary>
    <span class="architecture-vpc-aws-prompt-note-label architecture-vpc-aws-prompt-note-label-closed">Show prompt use</span>
    <span class="architecture-vpc-aws-prompt-note-label architecture-vpc-aws-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="architecture-vpc-aws-prompt-copy-btn" data-prompt-copy-index="1">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-hdd-network fs-5"></i>
    <div><strong>Platform pattern:</strong> Use this when the visible model should start from a known review scenario and then be refined through controls.</div>
  </div>
</details>

<pre class="architecture-vpc-aws-prompt-pre"><code>Draft a private AWS VPC in ap-southeast-1 with no public application tier, no NAT, VPC endpoints, Systems Manager access, Transit Gateway connectivity to shared services, RDS in private data subnets, CloudWatch, and VPC Flow Logs.</code></pre>

<details class="architecture-vpc-aws-prompt-note">
  <summary>
    <span class="architecture-vpc-aws-prompt-note-label architecture-vpc-aws-prompt-note-label-closed">Show prompt use</span>
    <span class="architecture-vpc-aws-prompt-note-label architecture-vpc-aws-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="architecture-vpc-aws-prompt-copy-btn" data-prompt-copy-index="2">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-signpost-split fs-5"></i>
    <div><strong>Private connectivity:</strong> Use this when the visible model should start from a known review scenario and then be refined through controls.</div>
  </div>
</details>
</div>
<!-- ns:end main.content.03_example-prompts -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-prompt-tips">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Prompt Tips</span></h2>
  <p>The generator works best when the prompt names the important AWS VPC decisions directly. Write for the parser and the reviewer, not for a marketing brief.</p>

<details class="tool-guidance-item" open>
  <summary><span class="tool-guidance-icon"><i class="bi bi-bullseye" aria-hidden="true"></i></span> <span>What should the prompt include?</span></summary>
  <div class="tool-guidance-answer">
    <p>Good prompts name the technical intent directly before listing optional detail.</p>
    <ul>
      <li>Name the region, availability zone count, and VPC CIDR when those values matter.</li>
<li>Describe the main entry path with terms such as <code>Route 53</code>, <code>CloudFront</code>, <code>AWS WAF</code>.</li>
<li>Call out workload, data, egress, observability, and hybrid choices explicitly.</li>
<li>State negative choices directly, such as <code>no public app tier</code>, <code>no NAT</code>, or <code>private only</code>.</li>
    </ul>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-pencil-square" aria-hidden="true"></i></span> <span>What prompt habits produce cleaner diagrams?</span></summary>
  <div class="tool-guidance-answer">
    <p>Clean prompts isolate one scenario and use exact AWS VPC terms the parser can map consistently.</p>
    <ul>
      <li>Keep one environment or site per prompt.</li>
<li>Use a preset for a stable baseline, then refine generated state with controls.</li>
<li>Separate design intent from implementation detail when the workspace only models the higher-level view.</li>
<li>Prefer explicit services and placement rules over broad phrases such as <code>secure backend</code>.</li>
    </ul>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-shield-check" aria-hidden="true"></i></span> <span>What needs explicit review after generation?</span></summary>
  <div class="tool-guidance-answer">
    <p>Generated output still needs human review where assumptions, risk, and unsupported details matter.</p>
    <ul>
      <li>Assumptions created from short or ambiguous prompts.</li>
<li>Security-sensitive, regulated, hybrid, or shared-service patterns.</li>
<li>Exact routing, identity, encryption, backup, retention, sizing, cost, and operations decisions.</li>
<li>Any dependency or constraint outside the workspace model.</li>
    </ul>
  </div>
</details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-how-to">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use this workflow to move from a rough architecture brief to a reviewed workspace artifact. Start with a preset or focused prompt, generate the first pass, then use the controls, stage, inventory, and export options to refine the model before sharing it.</p>

<details class="tool-guidance-item" open>
  <summary><span class="tool-guidance-icon"><i class="bi bi-card-checklist" aria-hidden="true"></i></span> <span>1. Start with a preset or brief</span></summary>
  <div class="tool-guidance-answer">
    <p>Select a preset when you want a stable AWS VPC pattern, or write a focused brief that names scope, placement, connectivity, and controls.</p>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-diagram-3" aria-hidden="true"></i></span> <span>2. Generate the first-pass diagram</span></summary>
  <div class="tool-guidance-answer">
    <p>Run the generate action to build the normalized model, visual stage, inventory rows, prompt notes, and JSON payload.</p>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-clipboard-check" aria-hidden="true"></i></span> <span>3. Review the stage and notes</span></summary>
  <div class="tool-guidance-answer">
    <p>Check the status summary, diagram stage, technical inventory, and prompt notes before treating the first pass as a review artifact.</p>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>4. Refine controls and layout</span></summary>
  <div class="tool-guidance-answer">
    <p>Use the inspector, selected-item controls, stage movement, zoom, fit, and reset actions to make the model match the intended handoff view.</p>
  </div>
</details>

<details class="tool-guidance-item">
  <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>5. Export or restore the workspace</span></summary>
  <div class="tool-guidance-answer">
    <p>Use <code>Export PNG</code> for a static image, <code>Download SVG</code> for vector output, and <code>Copy JSON</code>, <code>Download JSON</code>, or <code>Import JSON</code> when the editable workspace state must be preserved.</p>
  </div>
</details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-export">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The workspace supports several export paths, but they do not preserve the same information.</p>

<details class="tool-export-item" open>
  <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-image" aria-hidden="true"></i></span> <span>Export PNG</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Export PNG</code> when you need a quick visual snapshot for tickets, approvals, chat, slide decks, or static documentation.</p>
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
<li>The brief or prompt inputs and selected preset</li>
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
    <p>Use <code>Import JSON</code> to reopen a previously saved workspace state and rebuild the editable controls, diagram, inventory, notes, and output tables.</p>
  </div>
</details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-faq">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>Use these answers to confirm the workspace boundary before relying on the output. They clarify parser limits, review expectations, editable state, and what each export path preserves.</p>

<details class="faq-item" open>
  <summary><span>Does this tool call an external AI service?</span></summary>
  <div class="faq-answer"><p>No. The workspace uses deterministic AWS VPC-specific prompt extraction and local browser-side state handling.</p></div>
</details>

<details class="faq-item">
  <summary><span>What happens if my prompt is incomplete or ambiguous?</span></summary>
  <div class="faq-answer"><p>The tool applies controlled defaults from the selected preset and records assumptions in prompt notes. Review those notes before treating the first pass as final.</p></div>
</details>

<details class="faq-item">
  <summary><span>Can I edit the generated result after generation?</span></summary>
  <div class="faq-answer"><p>Yes. You can adjust inspector values, change supported controls, move or resize stage objects where implemented, and preserve those changes in JSON.</p></div>
</details>

<details class="faq-item">
  <summary><span>What is the best way to save work in progress?</span></summary>
  <div class="faq-answer"><p>Save the JSON export. PNG and SVG are presentation outputs; JSON preserves the restorable workspace model and layout state.</p></div>
</details>

<details class="faq-item">
  <summary><span>When should I not rely on the first-pass output alone?</span></summary>
  <div class="faq-answer"><p>Do not rely on the first pass alone when the design is security-sensitive, regulated, hybrid, unusually complex, or close to implementation. Review the unsupported engineering details separately.</p></div>
</details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.08_acronyms -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-acronyms">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-type" aria-hidden="true"></i><span>Acronyms</span></h2>
  <p>Use this table to define short technical terms and explain why each term matters in this architecture workspace.</p>
  <table>
    <thead><tr><th>Acronym</th><th>Meaning</th><th>Why it matters in this tool</th></tr></thead>
    <tbody>
      <tr><td>VPC</td><td>Virtual Private Cloud</td><td>The main AWS network boundary modeled by the workspace.</td></tr>
      <tr><td>AZ</td><td>Availability Zone</td><td>Shows how placement spans separate AWS fault domains.</td></tr>
      <tr><td>CIDR</td><td>Classless Inter-Domain Routing</td><td>Defines the VPC address range used for subnet planning.</td></tr>
      <tr><td>ALB</td><td>Application Load Balancer</td><td>Represents Layer 7 ingress into private application workloads.</td></tr>
      <tr><td>NAT</td><td>Network Address Translation</td><td>Represents outbound internet access for private workloads.</td></tr>
      <tr><td>TGW</td><td>Transit Gateway</td><td>Represents centralized routing across VPCs and external networks.</td></tr>
      <tr><td>SVG</td><td>Scalable Vector Graphics</td><td>Used when the current stage needs crisp vector export.</td></tr>
      <tr><td>PNG</td><td>Portable Network Graphics</td><td>Used when the current stage needs a quick image snapshot for sharing.</td></tr>
      <tr><td>JSON</td><td>JavaScript Object Notation</td><td>Used as the restore format for prompt state, layout state, and structured output.</td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.08_acronyms -->

<!-- ns:start main.content.10_references -->
<div class="content-card architecture-vpc-aws-markdown-card architecture-vpc-aws-markdown-card-citations">
  <h2 class="architecture-vpc-aws-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>
  <p>These sources support the in-text citations used in this tool page. They establish the main architecture boundary, egress or connectivity method, and review frame referenced above.</p>

  <table class="architecture-vpc-aws-citation-table">
    <thead>
      <tr>
        <th>Source type</th>
        <th>In-text citation</th>
        <th>Reference</th>
      </tr>
    </thead>
    <tbody>
      <tr id="architecture-vpc-aws-ref-primary"><td>Website</td><td><a class="architecture-vpc-aws-citation-backlink" href="#architecture-vpc-aws-cite-primary"><span class="architecture-vpc-aws-citation-inline">(Amazon Web Services, n.d.-a)</span></a></td><td>Amazon Web Services. (n.d.-a). <em>What is Amazon VPC?</em> Amazon Virtual Private Cloud User Guide. Retrieved May 17, 2026, from <a href="https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html">https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html</a></td></tr>
      <tr id="architecture-vpc-aws-ref-method"><td>Website</td><td><a class="architecture-vpc-aws-citation-backlink" href="#architecture-vpc-aws-cite-method"><span class="architecture-vpc-aws-citation-inline">(Amazon Web Services, n.d.-b)</span></a></td><td>Amazon Web Services. (n.d.-b). <em>NAT gateways</em>. Amazon Virtual Private Cloud User Guide. Retrieved May 17, 2026, from <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html</a></td></tr>
      <tr id="architecture-vpc-aws-ref-review"><td>Framework website</td><td><a class="architecture-vpc-aws-citation-backlink" href="#architecture-vpc-aws-cite-review"><span class="architecture-vpc-aws-citation-inline">(Amazon Web Services, 2024)</span></a></td><td>Amazon Web Services. (2024). <em>AWS Well-Architected Framework</em>. Retrieved May 17, 2026, from <a href="https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html">https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html</a></td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
