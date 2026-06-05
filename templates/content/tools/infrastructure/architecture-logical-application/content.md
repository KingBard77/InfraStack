[//]: # (content.md)

<!-- ns:start main.content.01_overview -->
<div class="content-card architecture-logical-application-markdown-card architecture-logical-application-markdown-card-overview">
  <h2 class="architecture-logical-application-section-heading"><i class="bi bi-compass" aria-hidden="true"></i><span>Overview</span></h2>
  <p><strong>Logical Application Architecture</strong> is an InfraStack workspace for turning an application brief into an editable logical diagram. It focuses on how actors, frontend channels, services, data stores, integrations, identity, notifications, observability, and business flow interact before anyone argues about servers, subnets, or deployment targets.</p>
  <p>The C4 model separates software architecture views into context, containers, components, and code; its own guidance says context and container views are often enough for many teams <a id="architecture-logical-application-cite-c4" class="architecture-logical-application-citation-link" href="#architecture-logical-application-ref-c4"><span class="architecture-logical-application-citation-inline">C4 Model</span></a>. This tool stays in that practical logical-design zone: visible enough for review, not so detailed that it pretends to be implementation truth.</p>
  <p>Start from one of the ten presets or fill the Custom fields directly. Generate the first model, edit the stage, inspect the inventory and notes, then export PNG, SVG, or restorable JSON.</p>
</div>
<!-- ns:end main.content.01_overview -->

<!-- ns:start main.content.02_technical-details -->
<div class="content-card architecture-logical-application-markdown-card architecture-logical-application-markdown-card-technical">
  <h2 class="architecture-logical-application-section-heading"><i class="bi bi-diagram-3" aria-hidden="true"></i><span>Technical Details</span></h2>

  <div class="tool-technical-scan-grid" aria-label="Technical Details quick scan">
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">Model scope</span>
      <strong>Logical first.</strong>
      <ul>
        <li>Actors and channels show who enters the application.</li>
        <li>Services and stores show responsibility and dependency shape.</li>
      </ul>
    </section>
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">Controls</span>
      <strong>Custom fields drive state.</strong>
      <ul>
        <li>Each field is exported in JSON.</li>
        <li>Preset changes update prompt and controls together.</li>
      </ul>
    </section>
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">Exports</span>
      <strong>Use the right artifact.</strong>
      <ul>
        <li>PNG and SVG are visual handoff outputs.</li>
        <li>JSON is the editable restore format.</li>
      </ul>
    </section>
    <section class="tool-technical-scan-card">
      <span class="tool-technical-scan-kicker">Boundary</span>
      <strong>Review, not certification.</strong>
      <ul>
        <li>The score is advisory model completeness.</li>
        <li>The tool does not validate security or production readiness.</li>
      </ul>
    </section>
  </div>

  <h3 class="architecture-logical-application-technical-step-heading">1. Presets and custom mode</h3>
  <p>The preset menu seeds a known logical pattern: Web Application, Mobile Application, Microservices, Enterprise Application, Government Application, AI/ML Application, Event-Driven Application, Data Processing Pipeline, Identity &amp; Access Management, or Service Dependency Map. Each preset fills the prompt, description, default components, routing summaries, control notes, and first-pass diagram shape. That makes the preset useful as a repeatable starting point instead of a screenshot-only template.</p>
  <p>Custom mode is the direct editing surface for the same normalized state. When you change Application Name, Business Purpose, Users / Actors, Frontend Components, Backend Services, Databases, Cache / Storage, External Integrations, Authentication Method, Notifications, Monitoring &amp; Logging, or Business Flow, the next generated model uses those values. The important rule is that the custom fields are not decorative text boxes. They are the source values that drive diagram grouping, inventory rows, prompt notes, advisory scoring, and JSON restore data.</p>
  <p>Use the preset when the architecture shape is already familiar and the review needs a fast baseline. Use the custom fields when the application has a specific domain, regulatory workflow, partner integration, or service boundary that should not be guessed from a generic prompt. The workspace keeps both paths visible so reviewers can see whether a generated model came from a standard pattern or from explicit application facts.</p>

  <h3 class="architecture-logical-application-technical-step-heading">2. Logical model shape</h3>
  <p>The generated model is intentionally logical. It renders business users and system actors first, then channels, access layer, business services, data platform, cross-cutting services, integration dock, and business flow. This follows the architecture-family goal of showing how application components interact while staying independent of cloud provider, runtime platform, network topology, server size, and deployment target.</p>
  <p>The C4 model names system context, container, component, and code as its core static diagram levels, and its guidance says system context and container diagrams are often sufficient for many software development teams <a id="architecture-logical-application-cite-c4" class="architecture-logical-application-citation-link" href="#architecture-logical-application-ref-c4"><span class="architecture-logical-application-citation-inline">C4 Model</span></a>. This tool operates in that practical middle ground. It is more detailed than a one-box context diagram because it shows services, stores, integrations, and supporting capabilities. It is less detailed than implementation architecture because it does not assign repositories, classes, pods, subnets, queues, instance sizes, or release pipelines.</p>
  <p>Actors connect to channels, channels connect to the API or access layer, the access layer fans into business services, and services connect to the data platform and integration dock. Cross-cutting services sit beside the main path so they can be read as shared capabilities rather than as one-off request hops. This layout is service-centric: the review conversation should quickly answer what the application does, which services own the behavior, which data stores are touched, and which external systems are part of the journey.</p>

  <h3 class="architecture-logical-application-technical-step-heading">3. Business flow as the review spine</h3>
  <p>The Business Flow banner is placed before the diagram because the process is usually easier to review than a component inventory. A useful flow names the actor, entry channel, authentication or session step, primary service sequence, data update, approval or decision point, integration call, and notification outcome. For example, Customer -> Portal -> Authentication -> User Service -> Approval Service -> Database -> Notification gives reviewers a clear path to compare against the cards below.</p>
  <p>The banner should not be treated as a separate caption. It is the spine for checking the rest of the model. If the flow mentions approval but there is no Approval Service, the model is incomplete. If the flow mentions a certificate download but no storage or certificate service exists, the data and service surfaces need more detail. If the flow contains an agency lookup but the integration dock has no external agency or government API, the integration boundary is missing.</p>
  <p>This is why the workspace keeps routing summaries and control notes under the canvas. Those tables make the generated diagram auditable without forcing every reviewer to inspect JSON. The visual canvas tells the story; the inventory tables show the underlying state that can be exported and restored.</p>

  <h3 class="architecture-logical-application-technical-step-heading">4. Identity and access boundary</h3>
  <p>Identity is shown as a first-class boundary because sign-in, federation, session handling, MFA, and service tokens strongly affect application behavior. OAuth 2.0 defines an authorization framework for delegated access <a id="architecture-logical-application-cite-oauth" class="architecture-logical-application-citation-link" href="#architecture-logical-application-ref-oauth"><span class="architecture-logical-application-citation-inline">RFC 6749</span></a>, and NIST digital identity guidance covers identity proofing, authentication, and federation models <a id="architecture-logical-application-cite-nist" class="architecture-logical-application-citation-link" href="#architecture-logical-application-ref-nist"><span class="architecture-logical-application-citation-inline">NIST SP 800-63-4</span></a>. The tool can represent these methods, but it does not verify token flows, directory policy, assurance levels, or MFA strength.</p>
  <p>For review, identity should answer who enters the system, where authentication happens, whether the system relies on SSO or local credentials, whether external users and internal staff share the same identity provider, and whether privileged actions require a stronger step-up control. The diagram can show OAuth2, OpenID Connect, SAML, LDAP, Active Directory, FreeIPA, MFA, or another method as architecture intent. It cannot prove that redirect URIs are configured safely, refresh token handling is correct, directory groups are clean, or administrative roles are least privilege.</p>
  <p>Keep identity as a shared capability when multiple frontend channels or services depend on it. Drawing identity once as a cross-cutting service prevents duplicate boxes from hiding the real access boundary. If a mobile app, web portal, admin portal, and public API all use the same identity provider, the diagram should show one shared authentication capability and several consumers, not four unrelated authentication islands.</p>

  <h3 class="architecture-logical-application-technical-step-heading">5. Service and data review</h3>
  <p>The service layer is the primary focus because it carries the business capability map. Authentication Service, User Service, Approval Service, Notification Service, Reporting Service, Verification Service, Certificate Service, AI Orchestrator Service, RAG Service, and similar names should describe behavior rather than deployment shape. A service card does not need to mean one microservice, one repository, or one team. It means the application has a distinct capability that deserves ownership, interface, data, and failure-mode review.</p>
  <p>The Data Platform section groups PostgreSQL, Reporting Database, Redis, Object Storage, File Storage, data lake, warehouse, vector database, or similar stores into one secondary region. Grouping the data layer reduces visual noise and gives reviewers one place to ask data questions. Which service writes the primary record? Which store is derived or analytical? Which data is cached? Which object files are retained? Which path handles backup, archival, and deletion?</p>
  <p>This grouping is logical, not physical. PostgreSQL and Redis may run in managed cloud services, Kubernetes, virtual machines, or a hosted platform. Object Storage may be S3-compatible, a cloud bucket, or an internal platform service. The diagram should not imply implementation unless the user explicitly names it. The correct next review step is data classification, access control, retention, replication, backup, restore testing, and reporting ownership.</p>

  <h3 class="architecture-logical-application-technical-step-heading">6. Integrations and cross-cutting services</h3>
  <p>External systems are grouped into a compact right-side integration dock. Payment Gateway, SMS Gateway, Email Service, Partner CRM, Government API, third-party identity service, analytics provider, model API, or external agency systems belong there when they are outside the application boundary. Keeping them in a dock makes dependency review easier: one column shows what the application must trust, call, retry, monitor, and contract with.</p>
  <p>Cross-cutting services are displayed as shared capabilities because they affect the entire architecture. Authentication, Notifications, Monitoring, Logging, audit, policy, and sometimes configuration are not always part of the main happy path, but they shape how every request is operated and governed. Showing them as shared capabilities avoids the old visual problem where monitoring or notifications appeared as random downstream boxes and created unnecessary line crossings.</p>
  <p>Use integration paths to check operational risk. For each external dependency, reviewers should ask who owns credentials, where secrets live, what timeout and retry behavior applies, whether requests are synchronous or asynchronous, whether events need replay, what happens when the provider is unavailable, and which logs or audit records prove the interaction happened. The diagram can reveal missing dependencies, but it cannot validate contracts or service-level agreements.</p>

  <h3 class="architecture-logical-application-technical-step-heading">7. Observability and review evidence</h3>
  <p>Monitoring and logging are modeled separately from the request path so reviewers can see whether the application has an operational story. OpenTelemetry describes telemetry signals such as traces, metrics, logs, and events <a id="architecture-logical-application-cite-otel" class="architecture-logical-application-citation-link" href="#architecture-logical-application-ref-otel"><span class="architecture-logical-application-citation-inline">OpenTelemetry</span></a>. This workspace uses that idea as a visual reminder: include dashboards, logs, metrics, tracing, alert routing, and retention decisions in the design conversation. The diagram does not prove that telemetry is implemented or sufficient.</p>
  <p>A logical architecture review should still name the expected operational evidence. For a customer portal, that may include login failures, approval latency, notification delivery status, database errors, API gateway errors, queue depth, third-party timeout rate, and dashboard ownership. For an AI/ML application, it may include prompt volume, guardrail outcomes, retrieval latency, model provider errors, token usage, and knowledge base freshness. For a data pipeline, it may include ingestion lag, failed batches, data quality checks, and warehouse load status.</p>
  <p>Monitoring and logging should be connected to service ownership. A diagram with Grafana, Prometheus, ELK, Splunk, APM, OpenTelemetry, or audit logging is only useful if the review also asks who watches it, which alerts page a team, which events are retained for audit, and which logs contain sensitive data. The tool keeps this as a visual and inventory prompt rather than a validation claim.</p>

  <h3 class="architecture-logical-application-technical-step-heading">8. Editable state and export boundary</h3>
  <p>The canvas is editable because a generated layout is rarely final. Supported stage items can be selected, moved, resized, highlighted, and reset through the architecture-family runtime. Connector paths and selection state are part of the generated diagram model. When a user exports JSON, the payload preserves prompt, preset, controls, model details, viewport, selection, layout overrides, connector overrides, inventory, notes, and advisory outputs that the tool owns.</p>
  <p>PNG and SVG exports have a different purpose. They are presentation outputs for review documents, tickets, chats, and slides. They should look clean, but they are not the durable source of truth for future editing. JSON is the restore format because it carries the model values and workspace state. This distinction matters in review workflows: share PNG or SVG when someone only needs to read the diagram; save JSON when the architecture needs another editing session later.</p>
  <p>Import is intentionally scoped to the tool state. The restore path should accept state that belongs to this tool and its schema, then regenerate the visible workspace from that normalized data. It should not be treated as a generic diagram parser, a Visio import, or a cloud-discovery source. The imported file is trusted only as workspace state, not as proof that infrastructure exists.</p>

  <h3 class="architecture-logical-application-technical-step-heading">9. Review limits</h3>
  <p>The generated score, risk level, and pillar breakdown are model-completeness signals. They help spot missing actors, services, data stores, authentication, monitoring, or flow details. They are not compliance, security, reliability, performance, cost, or production-readiness results. A good review should still confirm service ownership, data classification, access policy, failure handling, audit requirements, queue semantics, retry behavior, retention, alerting, and operational runbooks outside this browser-side model.</p>
  <p>The workspace also does not discover live systems. It does not scan cloud accounts, inspect source repositories, test API contracts, validate IAM policy, measure latency, simulate failure, classify data, or prove that business processes are implemented. Treat it as a structured architecture drafting and review tool. Its value is clarity: it turns an application brief into a diagram, tables, notes, and state that teams can inspect and improve.</p>

  <table class="tool-technical-table">
    <thead>
      <tr><th scope="col">Surface</th><th scope="col">What it shows</th><th scope="col">What to review next</th></tr>
    </thead>
    <tbody>
      <tr><td>Actors</td><td>People, agencies, partners, admins, and external systems.</td><td>Access rights, owner, channel, and trust boundary.</td></tr>
      <tr><td>Services</td><td>Business capabilities and dependency shape.</td><td>Ownership, contracts, failure modes, and deployment split.</td></tr>
      <tr><td>Data</td><td>Databases, cache, storage, and retained artifacts.</td><td>Classification, retention, backup, replication, and access.</td></tr>
      <tr><td>Integrations</td><td>Third-party, agency, payment, messaging, or partner systems.</td><td>Contracts, credentials, retry rules, audit, and fallback.</td></tr>
      <tr><td>Operations</td><td>Monitoring, logging, tracing, dashboards, and APM tools.</td><td>Alert routing, retention, ownership, and incident response.</td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.02_technical-details -->

<!-- ns:start main.content.03_example-prompts -->
<div class="content-card architecture-logical-application-markdown-card architecture-logical-application-markdown-card-examples">
  <h2 class="architecture-logical-application-section-heading"><i class="bi bi-chat-square-text" aria-hidden="true"></i><span>Example Prompts</span></h2>
  <p>Paste one of these prompts into the workspace prompt box, generate the first pass, then verify the prompt notes and technical inventory before exporting or sharing the result.</p>

<pre class="architecture-logical-application-prompt-pre"><code data-prompt-title="Government Application Prompt">Application Name: Citizen Service Portal
Business Purpose: Let citizens apply for services, verify eligibility, receive officer approval, and download certificates.
Users / Actors: Citizen, Officer, Admin, External Agency
Frontend Components: Government Portal, Officer Dashboard, Admin Portal
Backend Services: Authentication Service, Verification Service, Approval Service, Certificate Service, Notification Service, Audit Service
Databases: Government Database, Citizen Records Database
Cache / Storage: Object Storage, File Storage
External Integrations: Government API, National ID Service, SMS Gateway, Email Service
Authentication Method: SSO, OpenID Connect, MFA
Notifications: Email, SMS, WhatsApp
Monitoring & Logging: Grafana, Prometheus, ELK, Audit Logging
Business Flow: Citizen submits application, identity is verified, officer reviews, certificate is generated, notification is sent.</code></pre>
  <details class="architecture-logical-application-prompt-note">
    <summary>
      <span class="architecture-logical-application-prompt-note-label architecture-logical-application-prompt-note-label-closed">Show prompt use</span>
      <span class="architecture-logical-application-prompt-note-label architecture-logical-application-prompt-note-label-open">Hide prompt use</span>
      <button type="button" class="architecture-logical-application-prompt-copy-btn" data-prompt-copy-index="0"><i class="bi bi-clipboard" aria-hidden="true"></i><span data-button-label>Copy prompt</span></button>
    </summary>
    <div class="alert alert-primary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Government workflow:</strong> Useful when citizen intake, officer review, identity verification, certificate generation, and notifications need one logical application view.</div></div>
  </details>

<pre class="architecture-logical-application-prompt-pre"><code data-prompt-title="AI/ML Application Prompt">Build an AI knowledge assistant with User, Admin, Knowledge Manager, AI Chat Portal, API Gateway, AI Orchestrator Service, Guardrail Service, RAG Service, LLM Service, Vector Database, Knowledge Base, Object Storage, OAuth2, MFA, External LLM API, Email notifications, Grafana, Prometheus, tracing, and a prompt-to-response business flow.</code></pre>
  <details class="architecture-logical-application-prompt-note">
    <summary>
      <span class="architecture-logical-application-prompt-note-label architecture-logical-application-prompt-note-label-closed">Show prompt use</span>
      <span class="architecture-logical-application-prompt-note-label architecture-logical-application-prompt-note-label-open">Hide prompt use</span>
      <button type="button" class="architecture-logical-application-prompt-copy-btn" data-prompt-copy-index="1"><i class="bi bi-clipboard" aria-hidden="true"></i><span data-button-label>Copy prompt</span></button>
    </summary>
    <div class="alert alert-success d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>AI assistant shape:</strong> Useful when the architecture needs to show a chat channel, orchestration service, retrieval path, model dependency, and observability boundary.</div></div>
  </details>

<pre class="architecture-logical-application-prompt-pre"><code data-prompt-title="Service Dependency Prompt">Create a service dependency map with Frontend Client, API Gateway, User Service, Order Service, Payment Service, Inventory Service, Notification Service, Shared Database Service, Message Broker, OAuth2, OpenID Connect, Grafana, Prometheus, ELK, distributed tracing, and request dependency paths.</code></pre>
  <details class="architecture-logical-application-prompt-note architecture-logical-application-prompt-note-last">
    <summary>
      <span class="architecture-logical-application-prompt-note-label architecture-logical-application-prompt-note-label-closed">Show prompt use</span>
      <span class="architecture-logical-application-prompt-note-label architecture-logical-application-prompt-note-label-open">Hide prompt use</span>
      <button type="button" class="architecture-logical-application-prompt-copy-btn" data-prompt-copy-index="2"><i class="bi bi-clipboard" aria-hidden="true"></i><span data-button-label>Copy prompt</span></button>
    </summary>
    <div class="alert alert-secondary d-flex align-items-start gap-3 mb-0" role="alert"><div><strong>Dependency review:</strong> Useful when service-to-service paths, shared data, identity, observability, and downstream impact need to be inspected together.</div></div>
  </details>
</div>
<!-- ns:end main.content.03_example-prompts -->

<!-- ns:start main.content.04_tips-prompts -->
<div class="content-card architecture-logical-application-markdown-card architecture-logical-application-markdown-card-prompt-tips">
  <h2 class="architecture-logical-application-section-heading"><i class="bi bi-lightbulb" aria-hidden="true"></i><span>Prompt Tips</span></h2>
  <p>Write for the model and the reviewer. Exact application facts produce cleaner diagrams than broad architecture adjectives.</p>
  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-pencil-square" aria-hidden="true"></i></span><span>Name the application and purpose first</span></summary>
    <div class="tool-guidance-answer">
      <p>Start with the application name and the business outcome. That gives the generated boundary a useful title and keeps the diagram focused on business flow, not random component lists.</p>
    </div>
  </details>
  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-people" aria-hidden="true"></i></span><span>Separate users from systems</span></summary>
    <div class="tool-guidance-answer">
      <p>List people, agencies, partners, and external systems in the Users / Actors field. This makes access paths and trust boundaries easier to review.</p>
    </div>
  </details>
  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-boxes" aria-hidden="true"></i></span><span>Use service names, not team names</span></summary>
    <div class="tool-guidance-answer">
      <p>Backend Services should describe application capabilities such as Approval Service or Notification Service. Team ownership can be added later in implementation documentation.</p>
    </div>
  </details>
  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-arrow-left-right" aria-hidden="true"></i></span><span>Describe the business flow in order</span></summary>
    <div class="tool-guidance-answer">
      <p>Write the journey from actor to channel, access layer, services, data, integrations, and notification. Ordered flow text helps the banner and routing summary match the diagram.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.04_tips-prompts -->

<!-- ns:start main.content.05_how-to-use -->
<div class="content-card architecture-logical-application-markdown-card architecture-logical-application-markdown-card-how-to">
  <h2 class="architecture-logical-application-section-heading"><i class="bi bi-list-check" aria-hidden="true"></i><span>How To Use</span></h2>
  <p>Use the workspace as a short design review tool. Generate once, then refine the model through controls and stage edits.</p>
  <details class="tool-guidance-item" open>
    <summary><span class="tool-guidance-icon"><i class="bi bi-1-circle" aria-hidden="true"></i></span><span>Pick a preset</span></summary>
    <div class="tool-guidance-answer">
      <p>Choose the closest pattern from the Preset dropdown. The prompt and Custom fields update to match that pattern.</p>
    </div>
  </details>
  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-2-circle" aria-hidden="true"></i></span><span>Edit the custom fields</span></summary>
    <div class="tool-guidance-answer">
      <p>Fill the exact actors, components, services, stores, integrations, identity, notifications, monitoring, and business flow for the application.</p>
    </div>
  </details>
  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-3-circle" aria-hidden="true"></i></span><span>Generate and adjust</span></summary>
    <div class="tool-guidance-answer">
      <p>Click <code>Generate Diagram</code>, then move or resize supported stage items when the default layout needs cleanup.</p>
    </div>
  </details>
  <details class="tool-guidance-item">
    <summary><span class="tool-guidance-icon"><i class="bi bi-4-circle" aria-hidden="true"></i></span><span>Review output tabs</span></summary>
    <div class="tool-guidance-answer">
      <p>Check Technical Inventory, Prompt Notes, Pillar Breakdown, Risk Level, and JSON before sharing the result.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.05_how-to-use -->

<!-- ns:start main.content.06_export-notes -->
<div class="content-card architecture-logical-application-markdown-card architecture-logical-application-markdown-card-export">
  <h2 class="architecture-logical-application-section-heading"><i class="bi bi-box-arrow-up-right" aria-hidden="true"></i><span>Export Notes</span></h2>
  <p>The workspace supports several export paths, but they do not preserve the same information.</p>
  <details class="tool-export-item" open>
    <summary><span class="tool-export-icon"><i class="bi bi-file-earmark-image" aria-hidden="true"></i></span><span>Export PNG</span></summary>
    <div class="tool-export-answer">
      <p>Use PNG for quick visual sharing in tickets, chat, slides, or lightweight documentation. PNG preserves the current diagram as a bitmap image, not editable state.</p>
    </div>
  </details>
  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-bezier2" aria-hidden="true"></i></span><span>Download SVG</span></summary>
    <div class="tool-export-answer">
      <p>Use SVG when you need a scalable diagram that remains crisp in documentation or presentation tooling. SVG is a vector presentation output, not the full workspace model.</p>
    </div>
  </details>
  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-braces" aria-hidden="true"></i></span><span>Copy JSON / Download JSON</span></summary>
    <div class="tool-export-answer">
      <p>Use JSON when the design needs to be reopened with prompt, controls, inventory, selected items, viewport, connector edits, and layout overrides intact.</p>
    </div>
  </details>
  <details class="tool-export-item">
    <summary><span class="tool-export-icon"><i class="bi bi-upload" aria-hidden="true"></i></span><span>Import JSON</span></summary>
    <div class="tool-export-answer">
      <p>Use Import JSON to restore a saved Logical Application Architecture workspace state and continue editing the model.</p>
    </div>
  </details>
</div>
<!-- ns:end main.content.06_export-notes -->

<!-- ns:start main.content.07_faq -->
<div class="content-card architecture-logical-application-markdown-card architecture-logical-application-markdown-card-faq">
  <h2 class="architecture-logical-application-section-heading"><i class="bi bi-question-circle" aria-hidden="true"></i><span>FAQ</span></h2>
  <p>These answers define the tool boundary so the generated diagram stays useful without claiming more than it can prove.</p>
  <details class="faq-item" open>
    <summary><span>Is this a deployment architecture?</span></summary>
    <div class="faq-answer"><p>No. It is a logical application architecture. It can inform deployment work, but it does not assign servers, pods, subnets, regions, or capacity.</p></div>
  </details>
  <details class="faq-item">
    <summary><span>Does it validate security?</span></summary>
    <div class="faq-answer"><p>No. It can show identity methods and trust boundaries, but it does not test authentication, authorization, cryptography, policy, or compliance.</p></div>
  </details>
  <details class="faq-item">
    <summary><span>Why export JSON?</span></summary>
    <div class="faq-answer"><p>JSON is the durable workspace state. PNG and SVG are useful pictures; JSON is what lets the application model be restored for more editing.</p></div>
  </details>
  <details class="faq-item">
    <summary><span>Can I change the diagram after generation?</span></summary>
    <div class="faq-answer"><p>Yes. Use the supported stage controls, custom fields, selected item inspector, and Auto layout reset to refine the generated model.</p></div>
  </details>
</div>
<!-- ns:end main.content.07_faq -->

<!-- ns:start main.content.10_references -->
<div class="content-card architecture-logical-application-markdown-card architecture-logical-application-markdown-card-references">
  <h2 class="architecture-logical-application-section-heading"><i class="bi bi-link-45deg" aria-hidden="true"></i><span>References</span></h2>
  <p>These sources support the in-text citations used in the overview and technical details. They frame diagram abstraction, delegated authorization, digital identity guidance, and observability signal terminology.</p>
  <table class="architecture-logical-application-citation-table">
    <thead>
      <tr><th scope="col">Source type</th><th scope="col">In-text citation</th><th scope="col">Reference</th></tr>
    </thead>
    <tbody>
      <tr id="architecture-logical-application-ref-c4"><td>Architecture model</td><td><a class="architecture-logical-application-citation-backlink" href="#architecture-logical-application-cite-c4"><span class="architecture-logical-application-citation-inline">C4 Model</span></a></td><td><a href="https://c4model.com/diagrams" target="_blank" rel="noopener">C4 Model diagrams</a></td></tr>
      <tr id="architecture-logical-application-ref-oauth"><td>Authorization standard</td><td><a class="architecture-logical-application-citation-backlink" href="#architecture-logical-application-cite-oauth"><span class="architecture-logical-application-citation-inline">RFC 6749</span></a></td><td><a href="https://www.rfc-editor.org/info/rfc6749" target="_blank" rel="noopener">RFC 6749 OAuth 2.0 Authorization Framework</a></td></tr>
      <tr id="architecture-logical-application-ref-nist"><td>Digital identity guidance</td><td><a class="architecture-logical-application-citation-backlink" href="#architecture-logical-application-cite-nist"><span class="architecture-logical-application-citation-inline">NIST SP 800-63-4</span></a></td><td><a href="https://pages.nist.gov/800-63-4/sp800-63.html" target="_blank" rel="noopener">NIST SP 800-63-4 Digital Identity Guidelines</a></td></tr>
      <tr id="architecture-logical-application-ref-otel"><td>Observability terminology</td><td><a class="architecture-logical-application-citation-backlink" href="#architecture-logical-application-cite-otel"><span class="architecture-logical-application-citation-inline">OpenTelemetry</span></a></td><td><a href="https://opentelemetry.io/docs/concepts/signals/" target="_blank" rel="noopener">OpenTelemetry Signals</a></td></tr>
    </tbody>
  </table>
</div>
<!-- ns:end main.content.10_references -->
