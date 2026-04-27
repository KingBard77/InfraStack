<div class="content-card gcp-vpc-markdown-card gcp-vpc-markdown-card-overview">

## Overview

Visualizer GCP VPC Topology is an InfraStack prompt-driven workspace for turning a short GCP brief into a first-pass network diagram. The workspace reads explicit GCP terms such as <span class="gcp-vpc-term-accent">region</span>, <span class="gcp-vpc-term-accent">zone</span> count, <span class="gcp-vpc-term-accent">CIDR</span>, ingress services, workload tier, database tier, Cloud NAT mode, observability controls, and hybrid links, then uses that normalized model to render the stage, technical inventory, prompt notes, and export state.

Use the workspace first. Start with a prompt or preset, generate the initial model, then refine it through the inspector and stage instead of redrawing the architecture from scratch. You can change control values, drag and resize stage objects where supported, adjust layout for review clarity, and save the working state as JSON.

This workspace is most useful when you need to:

- Sketch a realistic GCP VPC baseline quickly
- Explain public, private, and data-tier placement to other teams
- Compare design tradeoffs such as `single Cloud NAT` versus `one Cloud NAT policy per zone`
- Prepare diagrams for architecture review, presales, handover, or internal documentation
- Save an editable version of a design and reopen it later without rebuilding the layout

It is less useful as a final source of implementation truth. The first pass is a structured design aid, not a substitute for engineering review, security review, capacity planning, or infrastructure-as-code implementation detail.

</div>

<div class="content-card gcp-vpc-markdown-card gcp-vpc-markdown-card-technical">

## Technical Details

The workspace builds one normalized architecture model from the prompt, the selected preset, and the current inspector state. That same model drives the SVG stage, the technical inventory, the prompt notes, the score banner, and the JSON export. The visual result and the structured output stay aligned because they come from the same state, not from separate page fragments.

### 1. Prompt interpretation and defaults

The parser is deterministic and GCP-specific. If you enter the same prompt, preset, and control values, the workspace will produce the same result.

The parser responds best to explicit terms such as:

- GCP region names like `us-central1`
- VPC CIDR ranges such as `10.0.0.0/16`
- `1`, `2`, or `3` zones
- Workload names such as `Virtual Machines`, `Cloud Run`, `GKE`, or `Cloud Functions with Serverless VPC Access`
- Database names such as `Cloud SQL`, `Cloud SQL for PostgreSQL`, `Firestore`, or `no database tier`
- Ingress and edge services such as `Cloud DNS`, `Cloud CDN`, `Cloud Armor`, and `External HTTP(S) Load Balancer`
- Egress phrases such as `single Cloud NAT`, `one Cloud NAT policy per zone`, or `no Cloud NAT`
- Supporting services such as `Private Service Connect`, `Cloud Monitoring`, `VPC Flow Logs`, `Cloud VPN`, `Network Connectivity Center`, and `Memorystore for Redis`

If the prompt omits one of those design choices, the workspace applies controlled defaults from the selected preset and records the result in the prompt notes. That makes the first pass faster, but it also means an incomplete prompt should be reviewed before you treat the output as settled architecture.

### 2. Regional boundary and placement layers

The VPC is rendered as a regional boundary with clear placement layers. Inside that boundary, the workspace separates components into public, private application, private data, edge, and shared-service positions so the traffic path and isolation model stay readable.

This layout is intentionally opinionated. It favors review clarity over low-level network detail, which is why the stage is good for planning and explanation but not a replacement for full subnet math or routing documentation.

### 3. Ingress path and edge services

If you enable `Cloud DNS`, `Cloud CDN`, or `Cloud Armor`, the workspace places them on the public edge before the `External HTTP(S) Load Balancer`. If you omit them, the ingress path becomes simpler and more direct.

That makes it easy to compare patterns such as:

- Direct public ingress through an `External HTTP(S) Load Balancer`
- CDN and request filtering in front of the load balancer
- Private application tiers that never accept direct public inbound traffic

The workspace does not model every edge decision automatically. TLS policy, certificate scope, private hosted zones, advanced WAF rules, and multi-account edge strategy still need separate design review.

### 4. Private application and data tiers

Application workloads remain in private application subnets. Depending on the selected workload tier, the workspace models the application layer as `Managed Instance Groups`, `Cloud Run`, `GKE`, or `Cloud Functions with Serverless VPC Access`.

Data services follow a stricter isolation pattern:

- `Cloud SQL` and `Cloud SQL for PostgreSQL` are placed in private data subnets and treated as managed relational services
- `Firestore` is treated as a regional managed service outside the VPC boundary
- `Memorystore for Redis` is treated as an internal service shared with the application tier

This is enough for architectural intent, but it does not represent engine version, replication policy, maintenance windows, backup strategy, or encryption settings.

### 5. Egress and private GCP service access

The NAT setting communicates an architectural tradeoff, not just a visual difference.

- `Single Cloud NAT` lowers cost and keeps the layout simpler, but it centralizes outbound internet dependency and can introduce cross-zone egress paths.
- `One Cloud NAT per zone` improves resilience and zone-local routing, but increases cost.
- `No Cloud NAT` is appropriate only when the environment is intentionally private or uses endpoints and other controlled paths instead of general internet egress.

`Private Service Connect` is modeled as a private access path to GCP services such as Cloud Storage and Secret Manager. It matters when private workloads should reach GCP-managed services without depending on a general public internet route.

### 6. Observability and hybrid connectivity

`Cloud Monitoring` and `VPC Flow Logs` appear as operational visibility services. They help communicate that the design includes metrics, alarms, and network telemetry, even though those services are not on the direct request path.

`Cloud VPN` and `Network Connectivity Center` extend the model beyond a standalone VPC. Use them when the architecture needs to show on-premises integration, hub-and-spoke routing, shared services, or more complex network relationships.

### 7. What can be edited after generation

The first pass is meant to be refined.

After generation, you can:

- Change core inspector values such as region, CIDR, zone count, Cloud NAT mode, app tier, database tier, and supporting services
- Switch or correct preset-aligned defaults without rewriting the entire prompt
- Drag cards and resize stage objects where supported to improve review readability
- Inspect the technical inventory and prompt notes to confirm what the workspace actually interpreted
- Export the result as PNG, SVG, or JSON depending on whether you need an image, vector output, or a restorable model

The normalized model remains the source of truth. Stage edits help the diagram read better. JSON is what preserves the actual workspace state.

### 8. Limits and review points

This workspace does not infer or validate every engineering decision. It does not automatically build:

- VPC firewall rule sets
- Hierarchical firewall policy and subnet route strategy
- Exact subnet CIDR math per tier
- Route table contents
- IAM role, service account, and workload identity design
- Cloud KMS key usage
- Backup, retention, or recovery targets
- Compliance controls
- Service sizing or cost estimates
- Multi-region disaster recovery behavior

Treat the generated output as a serious architecture draft, not a final implementation design. Before build-out, review the model against security, operations, resilience, and workload-specific requirements.

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
      <td>Deterministically extracts GCP-specific terms and applies bounded defaults when the prompt is incomplete.</td>
      <td>Use explicit infrastructure language when accuracy matters, then check prompt notes for assumptions.</td>
    </tr>
    <tr>
      <td>VPC boundary</td>
      <td>Defines the regional container for subnet tiers, routing intent, gateways, endpoints, and service placement.</td>
      <td>Keep CIDR sizing realistic enough for future subnet growth and zone expansion.</td>
    </tr>
    <tr>
      <td>Edge services</td>
      <td>Places DNS, CDN, WAF, and public ingress components before the application tier when enabled.</td>
      <td>Use these when traffic filtering, edge delivery, or controlled public entry matters.</td>
    </tr>
    <tr>
      <td>Public subnets</td>
      <td>Host internet-relevant services such as the internet-facing load balancer, Cloud NAT, or IAP access path.</td>
      <td>Keep internet-facing components limited and avoid moving private workloads into public space for convenience.</td>
    </tr>
    <tr>
      <td>Private app subnets</td>
      <td>Represent compute workloads that accept traffic through controlled ingress rather than direct public exposure.</td>
      <td>Good default for web, API, container, and platform workloads that should not be internet reachable.</td>
    </tr>
    <tr>
      <td>Private data subnets</td>
      <td>Represent relational databases and cache services placed away from public ingress.</td>
      <td>Use this layer to communicate isolation, not detailed database administration settings.</td>
    </tr>
    <tr>
      <td>Cloud NAT mode</td>
      <td>Represents outbound internet strategy for private workloads.</td>
      <td>`Single Cloud NAT` favors cost. `One Cloud NAT per zone` favors resilience and routing locality.</td>
    </tr>
    <tr>
      <td>Private Service Connect</td>
      <td>Represent private access to GCP-managed services from inside the VPC.</td>
      <td>Useful when private workloads should avoid general internet paths for GCP service access.</td>
    </tr>
    <tr>
      <td>Observability</td>
      <td><code>Cloud Monitoring</code> and <code>VPC Flow Logs</code> add monitoring and network-visibility surfaces to the model.</td>
      <td>Include them when the design needs to show operational readiness, not just request-path components.</td>
    </tr>
    <tr>
      <td>JSON state</td>
      <td>Preserves normalized architecture values, prompt notes, layout overrides, and connector overrides.</td>
      <td>Use JSON for restore and ongoing work. PNG and SVG do not preserve editable workspace state.</td>
    </tr>
  </tbody>
</table>

</div>

<div class="content-card gcp-vpc-markdown-card gcp-vpc-markdown-card-examples">

## Example Prompts

<p>Paste one of these prompts into the architecture prompt box, generate the first pass, then verify the prompt notes and technical inventory before you export or share the result.</p>

<pre class="gcp-vpc-prompt-pre"><code>Create a production GCP VPC in us-central1 across 2 zones. Use public subnets for an internet-facing External HTTP(S) Load Balancer, private app subnets for Managed Instance Groups, private data subnets for Cloud SQL, a single Cloud NAT, Private Service Connect for Cloud Storage and Secret Manager, Cloud Monitoring, and VPC Flow Logs.</code></pre>

<details class="gcp-vpc-prompt-note">
  <summary>
    <span class="gcp-vpc-prompt-note-label gcp-vpc-prompt-note-label-closed">Show prompt use</span>
    <span class="gcp-vpc-prompt-note-label gcp-vpc-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="gcp-vpc-prompt-copy-btn" data-prompt-copy-index="0">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-diagram-3 fs-5"></i>
    <div><strong>Classic web stack:</strong> Good default for public ingress, private application placement, private relational data, and basic operational visibility.</div>
  </div>
</details>

<pre class="gcp-vpc-prompt-pre"><code>Build a GCP VPC topology in europe-west1 across 2 zones for a Cloud Run platform. Put Cloud CDN and Cloud Armor in front of an External HTTP(S) Load Balancer, keep Cloud Run in private app subnets, use Cloud SQL for PostgreSQL in private data subnets, add Memorystore for Redis, Private Service Connect, Cloud Monitoring, VPC Flow Logs, and one Cloud NAT policy per zone.</code></pre>

<details class="gcp-vpc-prompt-note">
  <summary>
    <span class="gcp-vpc-prompt-note-label gcp-vpc-prompt-note-label-closed">Show prompt use</span>
    <span class="gcp-vpc-prompt-note-label gcp-vpc-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="gcp-vpc-prompt-copy-btn" data-prompt-copy-index="1">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-boxes fs-5"></i>
    <div><strong>Container platform:</strong> Useful for a private container service with edge protection, cache, and zone-local outbound design.</div>
  </div>
</details>

<pre class="gcp-vpc-prompt-pre"><code>Generate a GCP VPC topology in asia-southeast1 across 3 zones for a private GKE platform. Keep an External HTTP(S) Load Balancer in public subnets, node pools in private app subnets, Cloud SQL for PostgreSQL in private data subnets, Identity-Aware Proxy for controlled admin access, Private Service Connect, Cloud Monitoring, and VPC Flow Logs. Use one Cloud NAT policy per zone.</code></pre>

<details class="gcp-vpc-prompt-note">
  <summary>
    <span class="gcp-vpc-prompt-note-label gcp-vpc-prompt-note-label-closed">Show prompt use</span>
    <span class="gcp-vpc-prompt-note-label gcp-vpc-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="gcp-vpc-prompt-copy-btn" data-prompt-copy-index="2">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-hdd-network fs-5"></i>
    <div><strong>Platform layout:</strong> Useful when you need three-zone placement, managed Kubernetes, and clearly separated admin access.</div>
  </div>
</details>

<pre class="gcp-vpc-prompt-pre"><code>Design a GCP VPC topology in us-west1 across 2 zones for a hybrid environment. Use Cloud DNS, an internet-facing External HTTP(S) Load Balancer, Managed Instance Groups in private app subnets, Cloud SQL in private data subnets, Identity-Aware Proxy, Private Service Connect, Cloud Monitoring, VPC Flow Logs, Cloud VPN, and Network Connectivity Center for shared services. Use a single Cloud NAT.</code></pre>

<details class="gcp-vpc-prompt-note gcp-vpc-prompt-note-last">
  <summary>
    <span class="gcp-vpc-prompt-note-label gcp-vpc-prompt-note-label-closed">Show prompt use</span>
    <span class="gcp-vpc-prompt-note-label gcp-vpc-prompt-note-label-open">Hide prompt use</span>
    <button type="button" class="gcp-vpc-prompt-copy-btn" data-prompt-copy-index="3">
      <i class="bi bi-clipboard" aria-hidden="true"></i>
      <span>Copy prompt</span>
    </button>
  </summary>
  <div class="alert alert-warning d-flex align-items-start gap-3 mb-0" role="alert">
    <i class="bi bi-signpost-split fs-5"></i>
    <div><strong>Hybrid network:</strong> Use this when cloud ingress, on-premises routing, and shared connectivity all need to appear in one review diagram.</div>
  </div>
</details>

</div>

<div class="content-card gcp-vpc-markdown-card gcp-vpc-markdown-card-prompt-tips">

## Prompt Tips

The generator works best when the prompt names the architecture decisions directly. Write for the parser, not for a marketing brief.

<details class="tool-guidance-item" open>
<summary><i class="bi bi-lightbulb-fill tool-guidance-icon" aria-hidden="true"></i> <span>What should the prompt include?</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Name the `region`, `zone count`, and `VPC CIDR` when those values matter.</li>
<li>Say whether ingress is through `External HTTP(S) Load Balancer`, `Cloud CDN`, `Cloud Armor`, or a simpler public path.</li>
<li>Describe the compute tier with words like `Virtual Machines`, `Cloud Run`, `GKE`, or `Cloud Functions with Serverless VPC Access`.</li>
<li>Mention the data tier explicitly: `Cloud SQL`, `Cloud SQL for PostgreSQL`, `Firestore`, or `no database tier`.</li>
<li>Include egress and private service controls such as `single Cloud NAT`, `one Cloud NAT policy per zone`, `Private Service Connect`, `Cloud Monitoring`, and `flow logs`.</li>
<li>Mention whether the design needs `Identity-Aware Proxy`, `VPN`, `Network Connectivity Center`, or `Memorystore for Redis`.</li>
<li>If the environment is private-only, say that clearly rather than assuming the tool will infer it.</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-pencil-square tool-guidance-icon" aria-hidden="true"></i> <span>What prompt habits produce cleaner diagrams?</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Keep one environment per prompt.</li>
<li>Prefer exact GCP terms over generic phrases such as "highly available backend."</li>
<li>State negative choices directly when they matter, such as `no database tier` or `no Cloud NAT`.</li>
<li>Use a preset when you want a stable baseline, then refine with the inspector instead of overloading the prompt.</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-shield-check tool-guidance-icon" aria-hidden="true"></i> <span>What does the first pass not infer safely?</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>Exact route-table behavior</li>
<li>VPC firewall rules, hierarchical firewall policies, and service perimeter design</li>
<li>Subnet sizing per tier</li>
<li>Managed identity, Secret Manager, backup, and retention controls</li>
<li>Service sizing, scaling thresholds, or cost targets</li>
<li>Organization, folder, project, or landing-zone structure unless you state it explicitly</li>
</ul>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-search tool-guidance-icon" aria-hidden="true"></i> <span>When should the first pass be reviewed closely?</span></summary>
<div class="tool-guidance-answer">
<ul>
<li>The prompt is short or ambiguous</li>
<li>The design is security-sensitive or regulated</li>
<li>Hybrid routing is involved</li>
<li>You need exact implementation detail rather than architectural intent</li>
<li>The environment depends on services or patterns not directly modeled by the workspace</li>
</ul>
</div>
</details>

</div>

<div class="content-card gcp-vpc-markdown-card gcp-vpc-markdown-card-how-to">

## How To Use

<details class="tool-guidance-item" open>
<summary><i class="bi bi-card-checklist tool-guidance-icon" aria-hidden="true"></i> <span>1. Start with a preset or architecture brief</span></summary>
<div class="tool-guidance-answer">
<p>Paste your GCP architecture brief into the prompt box, or select a preset when you want a stable pattern such as a web stack, container platform, private GKE layout, or hybrid VPC baseline.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-diagram-3 tool-guidance-icon" aria-hidden="true"></i> <span>2. Generate the first-pass diagram</span></summary>
<div class="tool-guidance-answer">
<p>Click <code>Generate Diagram</code>. The workspace applies deterministic GCP-specific extraction rules and builds the first-pass architecture model.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-clipboard-check tool-guidance-icon" aria-hidden="true"></i> <span>3. Review the generated result</span></summary>
<div class="tool-guidance-answer">
<p>Check the score banner, the stage, and the prompt notes to confirm the region, zone count, ingress path, data tier, Cloud NAT mode, and supporting services.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-sliders tool-guidance-icon" aria-hidden="true"></i> <span>4. Refine the model in the inspector</span></summary>
<div class="tool-guidance-answer">
<p>Correct or adjust region, CIDR, Cloud NAT mode, app tier, database type, and service toggles until the normalized state matches your intended design.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-bounding-box-circles tool-guidance-icon" aria-hidden="true"></i> <span>5. Adjust the stage layout</span></summary>
<div class="tool-guidance-answer">
<p>Drag cards, resize stage objects where supported, and clean up the layout for architecture review or documentation.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-table tool-guidance-icon" aria-hidden="true"></i> <span>6. Confirm the technical inventory</span></summary>
<div class="tool-guidance-answer">
<p>Use the inventory table to verify what each component is, where it sits, and why it exists in the generated model.</p>
</div>
</details>

<details class="tool-guidance-item">
<summary><i class="bi bi-download tool-guidance-icon" aria-hidden="true"></i> <span>7. Export or restore the workspace</span></summary>
<div class="tool-guidance-answer">
<p>Use <code>PNG</code> for quick image sharing, <code>SVG</code> for crisp vector output, and <code>JSON</code> when you need to preserve the full workspace state for later edits or review handoff.</p>
</div>
</details>

</div>

<div class="content-card gcp-vpc-markdown-card gcp-vpc-markdown-card-export">

## Export Notes

The workspace supports several export paths, but they do not preserve the same information.

<details class="tool-export-item" open>
  <summary><i class="bi bi-file-earmark-image tool-export-icon" aria-hidden="true"></i> <span>Export PNG</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Export PNG</code> when you need a quick visual snapshot for:</p>
    <ul>
      <li>Tickets</li>
      <li>Approvals</li>
      <li>Architecture review notes</li>
      <li>Chat discussions</li>
      <li>Slide decks</li>
      <li>Static documentation</li>
    </ul>
    <p>PNG preserves the current visible diagram as a bitmap image. It is useful for communication, but it does not preserve an editable workspace state.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-bezier2 tool-export-icon" aria-hidden="true"></i> <span>Download SVG</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Download SVG</code> when you need a clean vector version for:</p>
    <ul>
      <li>Documentation that must stay sharp at multiple sizes</li>
      <li>Architecture decks</li>
      <li>Internal diagrams that may be edited in vector tools</li>
      <li>Crisp sharing without bitmap blur</li>
    </ul>
    <p>SVG preserves the current stage drawing as vector output. It is the best export for visual quality, but it is still a presentation format, not a restore format.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-braces tool-export-icon" aria-hidden="true"></i> <span>Copy JSON / Download JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Copy JSON</code> or <code>Download JSON</code> when you want to preserve the actual workspace state.</p>
    <p>JSON keeps:</p>
    <ul>
      <li>The normalized architecture values</li>
      <li>The prompt and selected preset</li>
      <li>Service toggles and inspector choices</li>
      <li>Card positions</li>
      <li>Box dimensions</li>
      <li>Connector routing overrides</li>
      <li>Technical inventory data</li>
      <li>Prompt notes and assumptions</li>
    </ul>
    <p>JSON is the best format for work in progress because it is the restorable model, not just a visual export.</p>
  </div>
</details>

<details class="tool-export-item">
  <summary><i class="bi bi-upload tool-export-icon" aria-hidden="true"></i> <span>Import JSON</span></summary>
  <div class="tool-export-answer">
    <p>Use <code>Import JSON</code> to reopen a previously saved workspace state.</p>
    <p>This is useful when:</p>
    <ul>
      <li>Continuing work later</li>
      <li>Sharing an editable draft with teammates</li>
      <li>Comparing versions of the same design</li>
      <li>Preserving custom layout work without rewriting the original prompt</li>
    </ul>
    <p>If the output will move toward implementation, keep the JSON alongside review notes. It is the only export that preserves the full workspace context.</p>
  </div>
</details>

</div>

<div class="content-card gcp-vpc-markdown-card gcp-vpc-markdown-card-faq">

## FAQ

<details class="faq-item" open>
  <summary>Does this tool call an external AI service?</summary>
  <div class="faq-answer">
    No. The workspace uses deterministic GCP-specific prompt extraction and local browser-side state handling. It does not depend on an external AI call to build the diagram.
  </div>
</details>

<details class="faq-item">
  <summary>What happens if my prompt is incomplete or ambiguous?</summary>
  <div class="faq-answer">
    The tool applies controlled defaults from the selected preset and records the resulting assumptions in the prompt notes. Review those notes before treating the first pass as final.
  </div>
</details>

<details class="faq-item">
  <summary>Can I edit the generated result after generation?</summary>
  <div class="faq-answer">
    Yes. You can adjust inspector values, change supported service toggles, drag cards, resize stage objects where supported, and preserve those changes in JSON.
  </div>
</details>

<details class="faq-item">
  <summary>What is the best way to save work in progress?</summary>
  <div class="faq-answer">
    Save the JSON export. It preserves the normalized architecture model, prompt notes, layout overrides, and connector state. PNG and SVG are presentation outputs, not restore formats.
  </div>
</details>

<details class="faq-item">
  <summary>Do PNG and SVG preserve an editable workspace?</summary>
  <div class="faq-answer">
    No. PNG preserves a bitmap snapshot of the stage. SVG preserves the vector drawing. Only JSON preserves the restorable workspace state.
  </div>
</details>

<details class="faq-item">
  <summary>When should I not rely on the first-pass output alone?</summary>
  <div class="faq-answer">
    Do not rely on the first pass alone when the design is security-sensitive, regulated, hybrid, unusually complex, or close to implementation. Review routing, IAM, security groups, subnet math, encryption, backup, and workload-specific requirements before build-out.
  </div>
</details>

<details class="faq-item">
  <summary>Can I use it for 1-zone, 2-zone, and 3-zone layouts?</summary>
  <div class="faq-answer">
    Yes. The workspace supports one, two, or three zones and rebuilds the placement model when the zone count changes.
  </div>
</details>

<details class="faq-item">
  <summary>Can it represent any GCP architecture I can describe?</summary>
  <div class="faq-answer">
    No. It is bounded to the GCP patterns the workspace models directly: common ingress services, private application tiers, private data tiers, egress choices, observability controls, and selected hybrid connectivity. Use the stage as a review aid, not as a complete model of every GCP feature.
  </div>
</details>

</div>

<div class="content-card gcp-vpc-markdown-card gcp-vpc-markdown-card-acronyms">

## Acronyms

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
      <td>VPC</td>
      <td>Virtual Network</td>
      <td>The main GCP network boundary being modeled by the workspace.</td>
    </tr>
    <tr>
      <td>zone</td>
      <td>Availability Zone</td>
      <td>Shows how the design is distributed across separate GCP fault domains.</td>
    </tr>
    <tr>
      <td>CIDR</td>
      <td>Classless Inter-Domain Routing</td>
      <td>Defines the IP range for the VPC and shapes subnet planning.</td>
    </tr>
    <tr>
      <td>App GW</td>
      <td>External HTTP(S) Load Balancer</td>
      <td>Represents Layer 7 ingress into private application workloads.</td>
    </tr>
    <tr>
      <td>WAF</td>
      <td>Web Application Firewall</td>
      <td>Represents request filtering and edge protection in front of public workloads.</td>
    </tr>
    <tr>
      <td>VMSS</td>
      <td>Managed Instance Groups</td>
      <td>Represents scalable virtual machine-based application workloads inside the VPC.</td>
    </tr>
    <tr>
      <td>ACA</td>
      <td>Cloud Run</td>
      <td>Represents managed container workloads in the application tier.</td>
    </tr>
    <tr>
      <td>GKE</td>
      <td>Google Kubernetes Engine</td>
      <td>Represents Kubernetes-based platform workloads inside private subnets.</td>
    </tr>
    <tr>
      <td>Cloud SQL</td>
      <td>Managed relational database service</td>
      <td>Represents managed relational databases placed in private data subnets.</td>
    </tr>
    <tr>
      <td>NAT</td>
      <td>Network Address Translation</td>
      <td>Represents outbound internet access for private workloads without opening inbound access.</td>
    </tr>
    <tr>
      <td>VPN</td>
      <td>Virtual Private Network</td>
      <td>Represents hybrid connectivity between GCP and on-premises environments.</td>
    </tr>
    <tr>
      <td>NCC</td>
      <td>Network Connectivity Center</td>
      <td>Represents centralized routing across multiple VPCs, networks, or shared-service environments.</td>
    </tr>
    <tr>
      <td>KV</td>
      <td>GCP Secret Manager</td>
      <td>Often appears alongside Private Service Connect when private secret and certificate access is required.</td>
    </tr>
    <tr>
      <td>SVG</td>
      <td>Scalable Vector Graphics</td>
      <td>Used when the current stage needs crisp vector export.</td>
    </tr>
    <tr>
      <td>PNG</td>
      <td>Portable Network Graphics</td>
      <td>Used when the current stage needs a quick image snapshot for sharing.</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td>JavaScript Object Notation</td>
      <td>Used as the full restore format for prompt state, layout state, and structured output.</td>
    </tr>
  </tbody>
</table>

</div>
