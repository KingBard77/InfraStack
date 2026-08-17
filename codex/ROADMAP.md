# InfraStack Studio Roadmap

## Vision

Build one web-based tool for infrastructure diagrams and architecture design. InfraStack is not intended to copy every draw.io feature. It should be the focused alternative for cloud, physical infrastructure, virtualization, containers, networks, security, inventory, and architecture review.

One shared `/studio` editor owns the canvas and project behavior. Diagram types, technology libraries, and vendor packs are released as data packages instead of separate applications.

## Status

- `[x]` available in the repository
- `[-]` partially available or represented by the current generic model
- `[ ]` planned

## Available Now

### Studio Editor

- [x] One shared web-based diagram editor.
- [x] Editable assets, boundaries, labels, properties, styles, and relationships.
- [x] Drag, resize, multi-select, duplicate, delete, align, distribute, and auto-layout controls.
- [x] Relationship types, directions, labels, protocols, and connector routing.
- [x] Zoom, fit, grid, snapping, guides, keyboard movement, undo, and redo.
- [x] Collapsible and resizable component and inspector panels.
- [x] Reference-image overlay and custom image assets.
- [x] Normalized JSON export and restore.
- [x] Derived inventory, deterministic Studio Result, improvements, and graphs.
- [x] Read-only share and embed layouts.

### Architecture Packages

- [x] AWS Cloud Architecture: six editable templates.
- [x] Azure Cloud Architecture: three editable templates.
- [x] Google Cloud Architecture: three editable templates.
- [-] Generic physical, network, platform, application, and data components are available, but do not yet form complete released architecture packages.

### Current Views

- [x] Overview.
- [x] Physical.
- [x] Network.
- [x] Availability.
- [-] Logical diagrams currently use the Network projection.
- [ ] Dedicated Logical view.
- [ ] Dedicated Security view.

## Diagram Types To Build

### Infrastructure And Operations

- [ ] Production Infrastructure Architecture.
- [ ] Hybrid Infrastructure and Network Architecture.
- [ ] Physical Server and Data Centre Architecture.
- [ ] Rack Elevation and Equipment Layout.
- [ ] Campus, Branch, WAN, and Data Centre Network Architecture.
- [ ] High Availability and Failure-Domain Architecture.
- [ ] Backup, Restore, and Disaster-Recovery Architecture.
- [ ] Monitoring, Logging, and Operations Architecture.

### Cloud And Platform

- [ ] Hybrid Cloud Architecture.
- [ ] Multi-Cloud Architecture.
- [ ] Private Cloud Architecture.
- [ ] VMware Virtualization Architecture.
- [ ] Kubernetes Platform Architecture.
- [ ] Container and OpenShift Architecture.
- [ ] Application and Microservice Architecture.
- [ ] Data Platform and Analytics Architecture.

### Security And Business Systems

- [ ] Network Security Architecture.
- [ ] Zero-Trust Architecture.
- [ ] Identity and Access Architecture.
- [ ] Entity-Relationship Diagrams.
- [ ] Flowcharts and Process Maps.
- [ ] Service Dependency and Operational Topology Maps.

## Libraries To Build

### Available

- [x] AWS.
- [x] Azure.
- [x] Google Cloud.
- [x] Generic Infrastructure.
- [-] Generic Network components inside Generic Infrastructure.
- [-] Generic Kubernetes and container components inside Generic Infrastructure.

### Planned

- [ ] Generic Network as a complete expanded library.
- [ ] Generic Physical and Data Centre.
- [ ] VMware.
- [ ] Kubernetes.
- [ ] Docker and Containers.
- [ ] Red Hat OpenShift.
- [ ] Microsoft Hyper-V.
- [ ] Proxmox VE.
- [ ] OpenStack.
- [ ] IBM Cloud.
- [ ] TM Cloud, after confirming the exact current service catalogue.
- [ ] Oracle Cloud Infrastructure.
- [ ] Alibaba Cloud.

## Vendor Packs To Build

### Priority Vendor Packs

- [ ] Cisco: switching, routing, wireless, security, management, and data-centre components.
- [ ] Fortinet: firewall, secure access, SD-WAN, management, and security components.
- [ ] Dell: servers, chassis, storage, networking, and infrastructure management components.
- [ ] Synology: NAS, storage, backup, replication, and surveillance components.
- [ ] Huawei: compute, storage, switching, routing, firewall, cloud, and management components.

### Later Vendor Packs

- [ ] HPE.
- [ ] Lenovo.
- [ ] NetApp.
- [ ] Juniper Networks.
- [ ] Palo Alto Networks.
- [ ] F5.
- [ ] Check Point.
- [ ] Arista.

Every vendor pack must map vendor products to shared semantic asset types. Vendor icons must have clear redistribution permission and must not be copied into architecture packages.

## Editor Capabilities To Build

### Diagram Creation

- [ ] Layers with visibility, locking, and ordering.
- [ ] Groups and reusable user-defined components.
- [ ] Multiple diagram pages within one project.
- [ ] Free text, notes, callouts, legends, basic shapes, and containers.
- [ ] Rulers, minimap, improved guides, and canvas search.
- [ ] More connector styles, endpoint controls, labels, and crossing behavior.
- [ ] Copy and paste between projects.
- [ ] Reusable personal templates and custom libraries.
- [ ] Alt plus arrow-key resizing and modifier-wheel one-percent zoom.

### Import, Export, And Publishing

- [ ] Large-file import progress, cancellation, validation details, and recovery.
- [ ] Versioned project-schema migrations for older exports.
- [ ] Verified PNG, SVG, PDF, and print exports with InfraStack watermarking where required.
- [ ] Optional draw.io XML import after a safe mapping into normalized Studio state is defined.
- [ ] Share access controls, expiry, revocation, and protected embeds.

### Projects And Collaboration

- [ ] Signed-in project storage while retaining downloadable JSON ownership.
- [ ] Project folders, search, tags, duplication, and archive.
- [ ] Named versions, change history, restore points, and comparison.
- [ ] Comments, review requests, and approval notes.
- [ ] Team workspaces and role-based access.
- [ ] Real-time collaboration after project locking, conflict handling, and audit history are defined.

### Large Architecture Performance

- [ ] Browser performance baselines for small, medium, and large projects.
- [ ] Faster parent and relationship validation during normalization.
- [ ] Background import normalization and advisory evaluation where practical.
- [ ] Progressive or viewport-aware canvas rendering.
- [ ] Virtualized inventory for large projects.
- [ ] IndexedDB-backed local persistence for projects too large for `localStorage`.
- [ ] Clear size guidance and graceful handling of browser memory limits.

## Next Delivery Order

1. Production Infrastructure Architecture using the current generic library.
2. Expanded Generic Network library and Hybrid Infrastructure / Network templates.
3. VMware and Kubernetes libraries with one complete template package each.
4. Cisco, Fortinet, Dell, and Synology priority vendor packs.
5. Dedicated Logical and Security views.
6. Large-project import, persistence, inventory, and canvas performance.
7. Huawei, IBM Cloud, and the confirmed TM Cloud offering.
8. Project storage, versions, comments, and team collaboration.
9. Additional diagram families, cloud providers, and vendor packs.

## Complete Release Standard

A checked architecture release means more than displaying a set of icons. It must include:

1. A registered package with stable identity and complete manifest, templates, result rules, and content.
2. Registered reusable libraries and icons when new components are required.
3. At least one realistic editable baseline and one resilient design.
4. Working normalized inventory, advisory results, graphs, JSON restore/export, share, and embed behavior.
5. Lazy loading without copying the Studio shell or duplicating shared icons.
6. Verified repository, Studio, performance, deployment, and browser behavior appropriate to the release.

The roadmap is a target list, not a production-readiness claim. A box becomes checked only when the working result is present and verified—otherwise it is just enthusiastic Markdown.
