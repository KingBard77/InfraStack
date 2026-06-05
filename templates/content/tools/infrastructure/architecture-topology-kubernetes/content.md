[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-overview">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>
  <p><strong>Kubernetes Topology Architecture</strong> is a browser-owned workspace for turning a short cluster brief into an editable topology diagram. The tool focuses on the control plane, worker nodes, kubelet and kube-proxy agents, Pod groups, Services, ingress, policy lanes, storage, and observability surfaces. It does not connect to a cluster, read kubeconfig, or inspect live objects.</p>
  <p>The generated model is review material. It gives architects, platform engineers, and application teams a shared first pass that can be adjusted on the stage, exported as SVG or PNG, and restored later from JSON state. <a id="architecture-topology-kubernetes-cite-components" class="architecture-topology-kubernetes-citation-link" href="#architecture-topology-kubernetes-ref-components"><span class="architecture-topology-kubernetes-citation-inline">Kubernetes (n.d.-a)</span></a> describes the control-plane and node components that make up a Kubernetes cluster, and this workspace uses those concepts as the starting boundary for its diagram model.</p>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-technical">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>
  <p>The workspace builds a normalized topology model from the prompt, Basic settings, Custom settings, imported JSON, and any selected-item stage edits. That same model drives the preview stage, generated SVG, inventory rows, prompt notes, pillar breakdown, review table, and JSON export. Keeping one state object is deliberate: a topology that cannot be restored is only a screenshot, while a normalized model can be inspected, changed, shared, and reopened without replaying the original prompt. The tool treats the diagram as editable planning data, not as a live scan, cluster audit, or manifest validator.</p>
  <p>The model stays close to Kubernetes vocabulary without pretending to replace Kubernetes documentation. It represents control-plane components, node components, Pods, Services, Ingress, NetworkPolicy, and PersistentVolumes as architecture review surfaces. Those concepts are anchored to upstream Kubernetes documentation so the support copy and diagram labels stay explainable, but the tool still remains a drafting workspace. Real implementation decisions still depend on cluster version, cloud or on-prem platform, CNI behavior, storage class behavior, admission controls, RBAC, node lifecycle, and the manifests that actually run the workloads.</p>

  <h3 class="architecture-topology-kubernetes-technical-step-heading">1. Cluster Model</h3>
  <p><a class="architecture-topology-kubernetes-citation-link" href="#architecture-topology-kubernetes-ref-components"><span class="architecture-topology-kubernetes-citation-inline">Kubernetes (n.d.-a)</span></a> separates cluster architecture into control-plane components and node components. Control-plane context includes the API server, scheduler, controller manager, and etcd. Node context includes kubelet, kube-proxy, and the container runtime that runs workload containers. This workspace represents those surfaces as reviewable architecture roles rather than claiming a particular managed-service implementation.</p>
  <p>The Basic settings choose the primary viewpoint: cluster topology, traffic flow, workload placement, or platform services. The cluster profile changes the shape of the generated model. A managed regional profile keeps the control plane visible as an ownership boundary because many managed Kubernetes platforms abstract some control-plane operation away from the application team. A self-managed profile makes control-plane components more prominent because the team usually owns more of the API server, scheduler, controller, and etcd responsibility. Edge and multi-tenant profiles influence note language, worker count defaults, namespace emphasis, and the type of review guidance that appears in the output.</p>
  <p>The control-plane toggle is not a security or readiness decision. It only changes diagram context. Some teams prefer hiding the control plane for an application-focused handoff, while others want it visible because API access, scheduling, reconciliation, and state storage are part of the architecture conversation. When the control plane is hidden, the output still records the cluster profile and keeps the worker, workload, service, policy, storage, and observability surfaces intact.</p>

  <section class="tool-technical-scan-card">
    <h3>Model Inputs</h3>
    <ul>
      <li><strong>Prompt:</strong> The human brief that names cluster intent, workloads, Services, ingress, storage, policy, and observability.</li>
      <li><strong>Basic settings:</strong> Preset, cluster profile, environment label, and whether the control plane is visible.</li>
      <li><strong>Custom settings:</strong> Namespace focus, Service exposure, ingress pattern, worker count, Pod groups, replica target, runtime, Kubernetes objects, and optional lanes.</li>
      <li><strong>Stage edits:</strong> User-adjusted labels, positions, dimensions, highlighted cards, and selected connector state.</li>
    </ul>
  </section>

  <h3 class="architecture-topology-kubernetes-technical-step-heading">2. Workload And Service Placement</h3>
  <p><a id="architecture-topology-kubernetes-cite-pods" class="architecture-topology-kubernetes-citation-link" href="#architecture-topology-kubernetes-ref-pods"><span class="architecture-topology-kubernetes-citation-inline">Kubernetes (n.d.-b)</span></a> defines Pods as the smallest deployable units that can be created and managed in Kubernetes. The tool groups workload labels such as <code>frontend</code>, <code>api</code>, and <code>worker</code> into Pod group cards, then links them through a Service card. Pod group count and replica target are review assumptions, not a scheduler simulation. They are useful for showing whether the topology expects one application lane, several workload lanes, a batch or telemetry lane, or a multi-tenant namespace boundary that needs clearer separation.</p>
  <p><a id="architecture-topology-kubernetes-cite-services" class="architecture-topology-kubernetes-citation-link" href="#architecture-topology-kubernetes-ref-services"><span class="architecture-topology-kubernetes-citation-inline">Kubernetes (n.d.-c)</span></a> describes Services as an abstraction for exposing applications running as Pods. Service exposure can be set to <code>ClusterIP</code>, <code>NodePort</code>, <code>LoadBalancer</code>, or <code>Gateway API</code>. The selection changes output notes and diagram labels, but it remains a planning assumption until real manifests, cluster networking, cloud load balancer behavior, and DNS ownership are reviewed. A <code>ClusterIP</code> review is usually about in-cluster discovery. A <code>NodePort</code> review raises worker-node exposure questions. A <code>LoadBalancer</code> review raises cloud or platform integration questions. A Gateway API review usually belongs with broader routing and platform ownership decisions.</p>
  <p><a id="architecture-topology-kubernetes-cite-ingress" class="architecture-topology-kubernetes-citation-link" href="#architecture-topology-kubernetes-ref-ingress"><span class="architecture-topology-kubernetes-citation-inline">Kubernetes (n.d.-d)</span></a> frames Ingress as a way to expose HTTP and HTTPS routes from outside the cluster to Services inside the cluster. The ingress pattern is modeled separately from Service exposure because north-south routing is usually a different decision surface from in-cluster service discovery. The diagram does not validate host rules, TLS settings, controller-specific annotations, route precedence, or mesh policy. It only makes the intended path visible.</p>

  <section class="tool-technical-scan-card">
    <h3>Generated Topology Rows</h3>
    <table>
      <thead>
        <tr><th>Area</th><th>Rendered Surface</th><th>Review Use</th></tr>
      </thead>
      <tbody>
        <tr><td>Control plane</td><td>API server, scheduler, controller manager, and etcd boundary.</td><td>Check ownership, access path, and operational responsibility.</td></tr>
        <tr><td>Workers</td><td>Node cards with kubelet, kube-proxy, and runtime labels.</td><td>Check capacity assumptions, placement, and node pool intent.</td></tr>
        <tr><td>Workloads</td><td>Pod group cards based on the workload labels.</td><td>Check application grouping and replica assumptions.</td></tr>
        <tr><td>Services</td><td>Service and ingress cards with selected exposure pattern.</td><td>Check request path, discovery model, and public edge posture.</td></tr>
        <tr><td>Policies</td><td>Optional NetworkPolicy lane.</td><td>Check whether segmentation is intended and visible.</td></tr>
        <tr><td>Storage</td><td>Optional PersistentVolume lane.</td><td>Check stateful workload dependencies and handoff notes.</td></tr>
      </tbody>
    </table>
  </section>

  <h3 class="architecture-topology-kubernetes-technical-step-heading">3. Policy, Storage, And Operations Lanes</h3>
  <p>NetworkPolicy, storage, and observability are optional lanes because not every topology review needs the same operational depth. When NetworkPolicy is enabled, the diagram shows a policy lane and the output asks reviewers to check whether segmentation intent is explicit. <a id="architecture-topology-kubernetes-cite-network-policy" class="architecture-topology-kubernetes-citation-link" href="#architecture-topology-kubernetes-ref-network-policy"><span class="architecture-topology-kubernetes-citation-inline">Kubernetes (n.d.-e)</span></a> describes network policies as rules that specify allowed traffic for selected Pods, while this tool avoids any claim that the generated diagram has verified enforcement by the cluster CNI.</p>
  <p>Persistent storage is also a lane rather than a full storage model. <a id="architecture-topology-kubernetes-cite-storage" class="architecture-topology-kubernetes-citation-link" href="#architecture-topology-kubernetes-ref-storage"><span class="architecture-topology-kubernetes-citation-inline">Kubernetes (n.d.-f)</span></a> documents PersistentVolumes as storage resources in a cluster, with lifecycle and binding behavior that depends on platform configuration. Showing the storage lane is still useful because it keeps stateful dependencies visible before implementation review. A topology with application Pods and no storage lane may be correct for stateless workloads, or it may expose a missing handoff question for databases, queues, uploads, caches, and logs.</p>
  <p>The observability lane records intent for metrics, logs, and operational review without prescribing a stack. It can represent platform metrics, application telemetry, alert routing, audit trails, or log collection, depending on the cluster environment. The tool intentionally avoids naming a default product because the right answer may be managed cloud monitoring, OpenTelemetry, Prometheus, Grafana, Loki, an enterprise SIEM, or an internal platform service. The important workspace behavior is that observability becomes visible in the topology and export state, so the handoff does not bury it in prose.</p>

  <h3 class="architecture-topology-kubernetes-technical-step-heading">4. Editable Stage</h3>
  <p>The stage is not a static illustration. Each generated card can be selected, dragged, resized, renamed, highlighted, and restored through JSON. The selected-item editor mirrors the selected diagram card so precise values can be adjusted without guessing. This is especially useful when the first generated topology is conceptually correct but needs a cleaner handoff layout, clearer labels, or different spacing for a design review slide.</p>
  <p>Layout edits are stored separately from generated defaults. The generated model owns the base topology, while layout overrides capture user movement, dimensions, and label edits. Connector overrides capture path edits where supported. This split matters because a user can regenerate or restore without losing the distinction between model intent and presentation tuning. It also keeps the tool aligned with the architecture-family contract: visible state changes must be exportable and restorable, not trapped in transient DOM changes.</p>
  <p>The workspace keeps preview behavior hidden-first for generated outputs. On first view, the stage shows a preview prompt and the result/output sections stay empty. The user must generate or import JSON before result cards, inventory tables, and export actions become active. This avoids a subtle trust problem: a prefilled result can look like completed analysis even when the user has not accepted a topology. The first deliberate generation step makes the state boundary obvious.</p>

  <h3 class="architecture-topology-kubernetes-technical-step-heading">5. Output Model</h3>
  <p>The output area translates the diagram into reviewable text and tables. Summary cards describe the selected profile, worker count, workload shape, service exposure, ingress pattern, optional lanes, and planning warnings. Inventory rows list the generated control-plane, node, workload, service, policy, storage, and observability components. The JSON tab shows the same normalized state that can be exported. This gives users three ways to inspect the same topology: visually on the stage, structurally in the inventory, and mechanically in JSON.</p>
  <p>Review notes are intentionally conservative. The tool may point out that a single-worker topology has limited placement resilience, that hidden policy or observability lanes deserve review, or that a public exposure pattern needs a separate traffic and access-control review. It must not claim the cluster is secure, compliant, highly available, production-ready, cost-optimized, or correctly configured. A topology diagram can help frame those reviews, but it cannot prove them.</p>
  <p>Sorting and table output are kept predictable so a reviewer can compare exports between sessions. The stable default order follows the generated component sequence instead of alphabetizing everything into a less useful shape. When a user changes prompt text or settings, the output is rebuilt from normalized state. When a user edits the stage, the output keeps the updated labels and layout references in JSON so the exported state still matches the visible diagram.</p>

  <h3 class="architecture-topology-kubernetes-technical-step-heading">6. Export And Restore</h3>
  <p>SVG and PNG exports reflect the current stage. JSON export stores the normalized prompt, settings, layout overrides, connector overrides, selected card, highlight state, inventory rows, and review notes. Importing JSON restores the workspace from that payload. The restore workflow validates the tool id where possible and normalizes missing fields so older payloads can still load with sensible defaults.</p>
  <p>JSON is the canonical handoff format because it preserves behavior, not just appearance. A PNG can be pasted into a ticket, and an SVG can go into a design document, but neither can restore control values, selected card state, or layout overrides. JSON keeps those surfaces available for a later review session. That is why the tool includes copy, download, and import behavior around the JSON tab rather than treating export as a final screenshot-only action.</p>
  <p>Exports are planning artifacts. They do not prove security, readiness, compliance, capacity, cost, or cluster health. The output is most useful when paired with real manifests, platform standards, cluster access controls, network diagrams, storage classes, operational ownership notes, and live validation from the actual environment. The tool is useful because it makes topology assumptions explicit; it is not evidence by itself.</p>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.03_example-prompts -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-examples">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-chat-square-text" aria-hidden="true"></i><span>Example Prompts</span></h2>
  <p>Paste one of these prompts into the workspace prompt box, generate the first pass, then verify the prompt notes and technical inventory before exporting or sharing the result.</p>

  <pre class="architecture-topology-kubernetes-prompt-pre"><code>Create a Kubernetes topology with one managed control plane, three worker nodes, frontend and API Pods, ClusterIP Services, an ingress controller, NetworkPolicy boundaries, persistent storage for stateful components, and observability for platform metrics and logs.</code></pre>
  <details class="architecture-topology-kubernetes-prompt-note">
    <summary>
      <span class="architecture-topology-kubernetes-prompt-note-label architecture-topology-kubernetes-prompt-note-label-closed">Show prompt use</span>
      <span class="architecture-topology-kubernetes-prompt-note-label architecture-topology-kubernetes-prompt-note-label-open">Hide prompt use</span>
      <button type="button" class="architecture-topology-kubernetes-prompt-copy-btn" data-prompt-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span data-button-label>Copy prompt</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Managed baseline:</strong> Good default for a regional application cluster with visible workload, policy, storage, and operations lanes.</div></div>
  </details>

  <pre class="architecture-topology-kubernetes-prompt-pre"><code>Map a multi-tenant Kubernetes platform for namespace platform, six worker nodes, Gateway API entry, service mesh traffic, Deployments, Services, ConfigMaps, Secrets, NetworkPolicy lanes, persistent volumes, and observability ownership.</code></pre>
  <details class="architecture-topology-kubernetes-prompt-note">
    <summary>
      <span class="architecture-topology-kubernetes-prompt-note-label architecture-topology-kubernetes-prompt-note-label-closed">Show prompt use</span>
      <span class="architecture-topology-kubernetes-prompt-note-label architecture-topology-kubernetes-prompt-note-label-open">Hide prompt use</span>
      <button type="button" class="architecture-topology-kubernetes-prompt-copy-btn" data-prompt-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span data-button-label>Copy prompt</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Tenant review:</strong> Useful when namespace ownership, routing posture, shared services, and policy boundaries need one diagram.</div></div>
  </details>

  <pre class="architecture-topology-kubernetes-prompt-pre"><code>Draft a small edge Kubernetes topology with a compact control plane, two worker nodes, local ingress, NodePort Services, workload Pods for telemetry and API collection, containerd runtime, storage lane, and limited observability notes.</code></pre>
  <details class="architecture-topology-kubernetes-prompt-note architecture-topology-kubernetes-prompt-note-last">
    <summary>
      <span class="architecture-topology-kubernetes-prompt-note-label architecture-topology-kubernetes-prompt-note-label-closed">Show prompt use</span>
      <span class="architecture-topology-kubernetes-prompt-note-label architecture-topology-kubernetes-prompt-note-label-open">Hide prompt use</span>
      <button type="button" class="architecture-topology-kubernetes-prompt-copy-btn" data-prompt-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span data-button-label>Copy prompt</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Edge shape:</strong> Useful when the cluster is small, local, capacity-sensitive, and should not look like a full regional platform.</div></div>
  </details>
</div>
<!-- ns:end main.content.03_example-prompts -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-prompt-tips">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Prompt Tips</span></h2>
  <p>Good topology prompts name the cluster purpose, entry path, workload groups, Service exposure, policy posture, and optional platform lanes. Keep the prompt short enough to review, but concrete enough that the generated diagram does not hide important assumptions.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-pencil-square" aria-hidden="true"></i></span> <span>State the cluster boundary</span></summary>
    <div class="tool-guidance-answer"><p>Name whether the cluster is managed, self-managed, edge, or multi-tenant. Add the environment label when it matters for handoff.</p></div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-boxes" aria-hidden="true"></i></span> <span>Name the workload groups</span></summary>
    <div class="tool-guidance-answer"><p>Use labels such as <code>frontend</code>, <code>api</code>, <code>worker</code>, <code>batch</code>, or <code>telemetry</code>. The tool turns those into Pod group cards.</p></div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-signpost-split" aria-hidden="true"></i></span> <span>Be explicit about traffic</span></summary>
    <div class="tool-guidance-answer"><p>Include <code>Ingress</code>, <code>Gateway API</code>, <code>Service Mesh</code>, <code>ClusterIP</code>, <code>NodePort</code>, or <code>LoadBalancer</code> when traffic posture matters.</p></div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-shield-check" aria-hidden="true"></i></span> <span>Call out policy and storage</span></summary>
    <div class="tool-guidance-answer"><p>Say whether NetworkPolicy, persistent storage, and observability should be visible. Missing items are treated as omissions for review, not proof that they are unnecessary.</p></div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-how-to">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use the workspace as a topology drafting surface before deeper implementation review. Generate, adjust, export, and restore the model as needed.</p>

  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-card-checklist" aria-hidden="true"></i></span> <span>1. Describe the topology</span></summary>
    <div class="tool-guidance-answer"><p>Enter a short Kubernetes cluster brief. Include workers, workloads, Services, ingress, policy, storage, and observability when those surfaces matter.</p></div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-sliders" aria-hidden="true"></i></span> <span>2. Tune Basic and Custom settings</span></summary>
    <div class="tool-guidance-answer"><p>Choose the preset, cluster profile, environment, Service exposure, ingress mode, worker count, Pod groups, object list, runtime, and optional lanes.</p></div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-diagram-3" aria-hidden="true"></i></span> <span>3. Edit the stage</span></summary>
    <div class="tool-guidance-answer"><p>Select cards, drag them, resize them, rename them, or use the selected-item editor for exact placement values.</p></div>
  </details>

  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-download" aria-hidden="true"></i></span> <span>4. Export or restore</span></summary>
    <div class="tool-guidance-answer"><p>Download SVG or PNG for review artifacts, copy or download JSON for state handoff, and import JSON to reopen the same model later.</p></div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-export">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-box-arrow-down" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The workspace supports several export paths, but they do not preserve the same information.</p>

  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-image" aria-hidden="true"></i></span> <span>Export PNG</span></summary>
    <div class="tool-export-answer">
      <p>Use <code>Export PNG</code> when you need a quick visual snapshot for tickets, approvals, review notes, chat, slide decks, or static documentation.</p>
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
        <li>The prompt and selected preset</li>
        <li>Basic and Custom setting choices</li>
        <li>Layout and connector overrides</li>
        <li>Inventory, notes, selected item, and assumptions</li>
      </ul>
      <p>JSON is the restore format, not just a visual export.</p>
    </div>
  </details>

  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-upload" aria-hidden="true"></i></span> <span>Import JSON</span></summary>
    <div class="tool-export-answer"><p>Use <code>Import JSON</code> to reopen a previously saved workspace state. Validate the tool ID, version, and required fields before syncing controls and re-rendering output.</p></div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-faq">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>These answers define the boundary of the tool so reviewers do not mistake a generated diagram for a live cluster assessment.</p>

  <details class="faq-item" open>
    <summary><span>Does it connect to Kubernetes?</span></summary>
    <div class="faq-answer"><p>No. The workspace is browser-owned and does not connect to an API server, kubeconfig, cloud account, registry, or monitoring system.</p></div>
  </details>

  <details class="faq-item">
    <summary><span>Does it validate security?</span></summary>
    <div class="faq-answer"><p>No. NetworkPolicy, ingress, storage, and observability lanes are review prompts. They are not evidence of security, compliance, reliability, or readiness.</p></div>
  </details>

  <details class="faq-item">
    <summary><span>Can I restore a diagram?</span></summary>
    <div class="faq-answer"><p>Yes. Export JSON after generating or editing the diagram, then import that JSON later to restore the prompt, settings, stage layout, connector paths, and output data.</p></div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.08_acronyms -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-acronyms">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-type" aria-hidden="true"></i><span>Acronyms</span></h2>
  <p>These abbreviations appear in Kubernetes architecture discussions and in the generated topology output.</p>
  <table>
    <thead>
      <tr><th>Acronym</th><th>Meaning</th><th>Tool Context</th></tr>
    </thead>
    <tbody>
      <tr><td>API</td><td>Application Programming Interface</td><td>Represents Kubernetes API server access and object control.</td></tr>
      <tr><td>CNI</td><td>Container Network Interface</td><td>Relevant to Pod networking, policy, and cluster traffic.</td></tr>
      <tr><td>CRI</td><td>Container Runtime Interface</td><td>Relevant to runtime labels such as containerd or CRI-O.</td></tr>
      <tr><td>PV</td><td>PersistentVolume</td><td>Represents storage that can outlive individual Pods.</td></tr>
      <tr><td>RBAC</td><td>Role-Based Access Control</td><td>Important for real review, although not validated by this diagram tool.</td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.08_acronyms -->

<!-- ns:start main.content.10_references -->
<div class="content-card architecture-topology-kubernetes-markdown-card architecture-topology-kubernetes-markdown-card-citations">
  <h2 class="architecture-topology-kubernetes-section-heading"><i class="bi bi-journal-text" aria-hidden="true"></i><span>References</span></h2>
  <p>These official Kubernetes documentation pages support the in-text citations used in this tool page. They establish the component, workload, networking, policy, and storage concepts referenced above.</p>
  <table class="architecture-topology-kubernetes-citation-table">
    <thead>
      <tr>
        <th>Type</th>
        <th>In-text citation</th>
        <th>Reference</th>
      </tr>
    </thead>
    <tbody>
      <tr id="architecture-topology-kubernetes-ref-components"><td>Documentation</td><td><a class="architecture-topology-kubernetes-citation-backlink" href="#architecture-topology-kubernetes-cite-components"><span class="architecture-topology-kubernetes-citation-inline">(Kubernetes, n.d.-a)</span></a></td><td>Kubernetes. (n.d.-a). <em>Kubernetes Components</em>. Kubernetes Documentation. Retrieved May 31, 2026, from <a href="https://kubernetes.io/docs/concepts/overview/components/">https://kubernetes.io/docs/concepts/overview/components/</a></td></tr>
      <tr id="architecture-topology-kubernetes-ref-pods"><td>Documentation</td><td><a class="architecture-topology-kubernetes-citation-backlink" href="#architecture-topology-kubernetes-cite-pods"><span class="architecture-topology-kubernetes-citation-inline">(Kubernetes, n.d.-b)</span></a></td><td>Kubernetes. (n.d.-b). <em>Pods</em>. Kubernetes Documentation. Retrieved May 31, 2026, from <a href="https://kubernetes.io/docs/concepts/workloads/pods/">https://kubernetes.io/docs/concepts/workloads/pods/</a></td></tr>
      <tr id="architecture-topology-kubernetes-ref-services"><td>Documentation</td><td><a class="architecture-topology-kubernetes-citation-backlink" href="#architecture-topology-kubernetes-cite-services"><span class="architecture-topology-kubernetes-citation-inline">(Kubernetes, n.d.-c)</span></a></td><td>Kubernetes. (n.d.-c). <em>Service</em>. Kubernetes Documentation. Retrieved May 31, 2026, from <a href="https://kubernetes.io/docs/concepts/services-networking/service/">https://kubernetes.io/docs/concepts/services-networking/service/</a></td></tr>
      <tr id="architecture-topology-kubernetes-ref-ingress"><td>Documentation</td><td><a class="architecture-topology-kubernetes-citation-backlink" href="#architecture-topology-kubernetes-cite-ingress"><span class="architecture-topology-kubernetes-citation-inline">(Kubernetes, n.d.-d)</span></a></td><td>Kubernetes. (n.d.-d). <em>Ingress</em>. Kubernetes Documentation. Retrieved May 31, 2026, from <a href="https://kubernetes.io/docs/concepts/services-networking/ingress/">https://kubernetes.io/docs/concepts/services-networking/ingress/</a></td></tr>
      <tr id="architecture-topology-kubernetes-ref-network-policy"><td>Documentation</td><td><a class="architecture-topology-kubernetes-citation-backlink" href="#architecture-topology-kubernetes-cite-network-policy"><span class="architecture-topology-kubernetes-citation-inline">(Kubernetes, n.d.-e)</span></a></td><td>Kubernetes. (n.d.-e). <em>Network Policies</em>. Kubernetes Documentation. Retrieved May 31, 2026, from <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/">https://kubernetes.io/docs/concepts/services-networking/network-policies/</a></td></tr>
      <tr id="architecture-topology-kubernetes-ref-storage"><td>Documentation</td><td><a class="architecture-topology-kubernetes-citation-backlink" href="#architecture-topology-kubernetes-cite-storage"><span class="architecture-topology-kubernetes-citation-inline">(Kubernetes, n.d.-f)</span></a></td><td>Kubernetes. (n.d.-f). <em>Persistent Volumes</em>. Kubernetes Documentation. Retrieved May 31, 2026, from <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/">https://kubernetes.io/docs/concepts/storage/persistent-volumes/</a></td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
