# InfraStack Studio Roadmap

## Purpose

Grow Studio through small file-based architecture releases while keeping one shared editor, normalized project state, inventory model, advisory engine, graph system, and share/embed flow.

This roadmap records intended work, not production-readiness claims. A release is complete only after its package, library assets, checks, and browser behavior are verified.

## Current Repository Baseline

| Capability | Current state |
| --- | --- |
| Shared Studio editor | Available for editable diagrams, inventory, deterministic results, graphs, JSON restore/export, share, and embed |
| Package model | `package.json`, `templates.json`, `result.json`, and `content.yml` |
| Registered cloud packages | AWS, Azure, and Google Cloud |
| Registered libraries | Generic infrastructure, AWS, Azure, and Google Cloud |
| Generic physical assets | Rack, server, storage, switch, router, and firewall catalogue entries |
| Release validation | Repository, Studio, performance, deployment, and browser checks |

Azure and GCP are already registered in the repository. Their next work is maintenance, broader templates, catalogue coverage, and release validation rather than creating duplicate providers.

## Deployment Order

### Phase 0 — Scale And Release Readiness

- Establish browser measurements using small, medium, and large reference projects.
- Remove repeated asset-parent lookup work during project normalization.
- Move expensive import normalization and advisory work off the browser main thread where practical.
- Render large diagrams progressively and virtualize large inventory tables.
- Replace large-project `localStorage` persistence with an IndexedDB-backed design while preserving normalized exports.
- Add import size and component-count guidance, progress feedback, cancellation, and graceful failure states.
- Add supported schema migrations so older exports remain restorable.
- Complete Alt plus arrow-key resizing and modifier-wheel one-percent zoom, then browser-verify them.
- Keep registries compact and provider packages lazily loaded.

### Phase 1 — Physical Infrastructure And Network Vendors

#### Physical Server And Data Centre

Create the first full generic physical-infrastructure package. The existing catalogue is a base, but it still needs released templates, rules, and content.

- Rack elevation and room or data-centre boundaries.
- Physical servers, chassis, storage arrays, SAN/NAS, UPS, PDU, switches, routers, firewalls, and load balancers.
- Power, network, storage, management, and replication relationships.
- Inventory fields for hostname, rack position, serial or asset identity, CPU, memory, storage, addressing, ownership, support, and lifecycle.
- Templates for standalone server, virtualized cluster, redundant network, backup, and disaster-recovery layouts.

#### Cisco

- Add a `vendors/cisco` catalogue and shared icon root using redistributable assets.
- Cover switching, routing, wireless, firewall, load balancing, management, and common data-centre patterns.
- Release editable campus, branch, data-centre, WAN, and high-availability templates.
- Keep Cisco product identities mapped to shared semantic types for inventory and advisory behavior.

#### Huawei

- Add a `vendors/huawei` catalogue and shared icon root using redistributable assets.
- Cover compute, storage, switching, routing, firewall, cloud, and management components selected for the first release.
- Release editable data-centre, campus, private-cloud, and high-availability templates.
- Keep vendor-specific fields in package data without forking the Studio shell.

### Phase 2 — Additional Cloud And Hybrid Releases

#### IBM Cloud

- Add an IBM Cloud library, icons, and an `architecture/ibm/cloud` package.
- Cover account and region boundaries, VPC, subnets, compute, Kubernetes, databases, object storage, IAM, security, monitoring, backup, and connectivity.
- Provide landing-zone, web application, private workload, Kubernetes, and resilient data templates.

#### TM Cloud

- Confirm whether the release targets TM Cloud, TM One Cloud Alpha, or another current service catalogue before fixing provider IDs.
- Use official service names and only icons with clear redistribution permission.
- Model local connectivity, compute, storage, security, backup, disaster recovery, managed services, and hybrid integration where supported.
- Provide Malaysian enterprise, government, hybrid, and disaster-recovery templates based on verified product capabilities.

#### Hybrid And Multi-Cloud

- Add shared patterns spanning on-premises, AWS, Azure, GCP, IBM Cloud, and later providers.
- Cover VPN, private circuits, transit, identity federation, DNS, observability, backup, and disaster recovery.
- Keep provider packages independent; hybrid templates should reference shared libraries rather than duplicate icons.

### Phase 3 — Virtualization, Containers, And Security

#### Virtualization

- VMware vSphere and VMware Cloud Foundation.
- Microsoft Hyper-V.
- Proxmox VE.
- OpenStack private cloud.
- Common clusters, hosts, virtual machines, storage, networks, migration, backup, and failure-domain templates.

#### Containers

- Kubernetes and Docker generic libraries.
- Red Hat OpenShift.
- Cluster, node pool, namespace, workload, ingress, service mesh, registry, secrets, observability, and persistent-storage patterns.

#### Network And Security Vendors

- Fortinet, Palo Alto Networks, Juniper, F5, and Check Point, added only when catalogue scope and icon licensing are confirmed.
- Shared patterns for segmentation, zero-trust access, internet edge, remote access, WAF, load balancing, IDS/IPS, and secure management.

### Phase 4 — Broader Architecture Families

- Application and microservice architecture.
- Data platform and analytics architecture.
- Security and zero-trust architecture.
- Business continuity and disaster recovery.
- Flowchart and process maps.
- Entity-relationship diagrams.
- Dependency, service, and operational topology maps.

These families must reuse normalized state and the shared canvas. Add family-specific code only when package data and configuration cannot express the required behavior.

## Definition Of Done For Every Release

Each provider or domain release must include:

1. A stable package identity registered in `assets/studio/packages/registry.json`.
2. Complete `package.json`, `templates.json`, `result.json`, and `content.yml` files.
3. A registered catalogue and shared icon root when new components are required.
4. Editable templates covering at least one realistic baseline and one resilient design.
5. Inventory fields derived from normalized project state.
6. Deterministic findings with stable IDs, recommendations, and supporting references.
7. Introduction, at least five FAQs, and three to five verified source-of-truth references.
8. JSON export/restore and share/embed compatibility without changing stable keys or URLs.
9. Lazy loading so unselected provider packages do not inflate initial Studio startup.
10. Passing repository, Studio, performance, deployment, and browser-visible acceptance checks appropriate to the release.

## Deployment Guardrails

- Do not copy the Studio editor into release packages.
- Do not duplicate shared icons or create view-specific icon trees.
- Do not change stable package, provider, library, route, DOM, state, export, share, or embed identities silently.
- Do not advertise export formats, controls, provider coverage, security, compliance, or production readiness before they are implemented and verified.
- Do not treat deterministic Studio findings as certification or approval.
- Deploy one complete provider or domain slice at a time; a long provider list without usable templates and rules is merely a logo parade.
