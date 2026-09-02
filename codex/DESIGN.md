# InfraStack Studio Design Contract

## Purpose

Studio is a web-based drawing application, not a collection of disconnected pages. New architecture releases reuse one visual shell and add file-based content.

## Shared Page Structure

The editable page stays in one structured Twig template:

```text
templates/studio/index.html.twig
```

Current application order:

1. Studio application bar
2. Design, Review, Inventory, and Share mode navigation
3. Design mode: Studio workspace
4. Review mode: Studio Result, Graph, and Finding content
5. Inventory mode: searchable, sortable, paginated inventory table followed by expanded architecture guidance
6. Share mode: diagram preview, publishing, embed, image, and project-file actions
7. Share and embed dialogs

Design is the default mode and must not expose the long review content beneath the canvas. Review, Inventory, and Share reuse the same normalized project state without a page reload. These content modes share one central width and the same advertisement rails; Design remains advertisement-free. Application-bar Share, Embed, and Export controls remain quick actions into the same publishing and project-file behavior exposed by Share mode.

Use paired section markers in Twig, `studio.css`, `content.css`, `studio.js`, and `content.js` so ownership remains searchable without splitting files unnecessarily.

## Asset Ownership

```text
assets/styles/studio/studio.css    application shell and editor
assets/styles/studio/content.css   result, graph, improvement, inventory, about
assets/js/studio/studio.js         editor and shared page orchestration
assets/js/studio/content.js        deterministic result and improvement logic
```

Share/embed styling and behavior stay under `assets/styles/layout/` and `assets/js/layout/`.

## Workspace Layout

Design mode contains:

- application bar
- navigation rail
- collapsible and resizable component library
- central canvas
- collapsible and resizable inspector
- visible save state
- real history, zoom, fit, share, embed, export, and restore controls

The project-name control must remain a single compact editable field. Unexpected injected elements must not expand or break its layout.

Panel collapse state and widths should persist locally. The canvas must reclaim available space when either panel collapses.

Loading a released template normally prepares every populated projection with expanded automatic spacing, clears stale bend points from the pre-layout geometry, then fits the active projection after the workspace has rendered. Automatic layout computes horizontal sibling gaps from the relationship labels local to that row while keeping vertical rhythm compact; long labels must not globally widen unrelated lanes. Layout positions may extend beyond the nominal canvas dimensions when a complex hierarchy needs the space, and Fit must include those full visible bounds rather than clamping multiple assets onto the same edge. A package may declare `layout_mode: preserve` for deliberate multi-boundary geometry; in that case Studio keeps the package layout and routing while still fitting the active projection. Auto Layout on a preserved project must retain the initial rows, columns, boundaries, and reading direction while correcting grid alignment, true overlaps, child containment, and connector routing. Fit centers the complete visible bounds rather than pinning them to the top-left. All diagram text scales with the canvas viewport; relationship labels are native edge labels anchored just above the connector rather than interface-sized floating overlays. At compact zoom levels, Studio reduces icon and secondary-copy emphasis before primary asset labels.

The mode navigation behaves as one compact floating, fully rounded segmented tab dock centered near the bottom of the viewport. It stays available across Design, Review, Inventory, and Share without reserving a full navigation row. The dock and its segments size themselves to their icon, label, and optional badge instead of stretching to equal or fixed widths. It must avoid the bottom-left minimap and bottom-right canvas settings, add enough bottom clearance to scrolling content, and respect mobile safe-area insets. Each segment uses an icon and short label without a permanent subtitle. Review and Inventory may show compact nonzero count badges derived from the current normalized project state. The active segment uses the primary purple treatment, while the shared container remains visually lighter than page content. Returning to Design must restore a usable graph viewport. Opening Review must render or resize its chart after the panel becomes visible. Opening Share must generate a current static preview without publishing a snapshot. Finding and inventory actions that locate modeled objects must return to Design before selecting and focusing those objects.

The Design inspector uses progressive disclosure. Asset Properties exposes Basic by default, followed by relevant Placement, Network, Resources, Image, and Advanced sections. Provider-specific fields render inside the matching section without changing normalized keys. Kubernetes workloads expose image, replica, resource-limit, probe, autoscaling, disruption-budget, and service-account facts; namespaces expose network-policy and Pod Security facts; Services and storage expose their relevant type and class facts. Style, Text, and Arrange are separate inspector tabs: Style owns shape, a reversible transparent-box option, fill, line, and reusable presets; Text owns font family, emphasis, colour, size, horizontal and vertical alignment, label background/border, opacity, wrapping, automatic sizing, and spacing; Arrange owns layer order, size, position, proportional resizing, rotation, horizontal and vertical flip, normalized grouping, grid snapping, locking, duplication, and deletion. Rotation and flips are stored per projection in layout state. Group creates a real boundary with child hierarchy; Ungroup removes only that boundary and preserves its children. Do not expose additional controls until normalized state and rendering genuinely support them. Relationship inspection uses Basic, Transport, Style, and Routing sections with Basic expanded by default. Relationship Style stays focused on line colour, width and pattern plus label colour, size, path position, and offset; these values persist independently per projection.

## Diagram Interaction

Current required behavior:

- activate the Hand tool and drag anywhere on the canvas to pan the viewport
- select a draggable asset or boundary
- select a relationship to adjust it
- drag to move
- resize through supported handles or controls
- arrow keys move selected assets
- Shift plus arrow keys moves faster
- Command/Control plus Z undoes the last edit
- mouse wheel zooms the stage
- selection remains visible while properties or style are adjusted
- preserve maxGraph's stable automatic connector paths across all packages and keep manually adjusted bend points authoritative; transparent assets mask connectors only beneath their visible icon and text content rather than globally rerouting the diagram

Alt plus arrow-key resizing and one-percent modifier-wheel zoom are roadmap requirements until implemented and browser-verified. Do not document them as working controls before then.

## Canvas Controls

Controls must remain on or adjacent to the stage and must be wired:

- select/move
- hand/pan
- connect
- relationship type
- duplicate
- auto-layout
- align and distribute
- reference image
- delete
- review
- zoom and fit
- reset panel layout, wide screen, and full screen in the bottom-left viewport control group
- keyboard shortcuts

Reset panel layout, wide screen, and full screen belong with the minimap viewport controls rather than the application bar. All viewport and workspace-display actions remain in one horizontal icon row.

Do not display inactive decorative controls.

## Review Mode

Review contains Studio Result, Studio Graph, and Studio Finding in that order. Studio Result contains grade, score, confidence, open findings, and category scores. It explains deterministic facts and must not imply certification.

Studio Improvement contains actionable cards derived from advisory findings. Empty projects use a persistent centered empty state matching the graph and inventory rhythm.

Review groups open findings into high-priority and recommended guidance, shows dismissed totals, and exposes affected asset and relationship counts. Every applicable finding provides Show on diagram, which returns to Design, chooses the most relevant projection, and selects the affected objects. Preview improvement stays in Review; applying or dismissing a finding re-renders the deterministic result. The graph appears before findings.

## Graph

Studio Graph keeps its title and explanatory copy outside the chart card. Controls align to the right on wide layouts and wrap safely on smaller screens.

Supported graph presentations may include:

- line styling
- radar
- centered polar area
- rounded-border bar
- time combination

Every chart needs an accessible summary, honest empty state, readable title/subtitle alignment, usable tooltips, and restrained animation.

## Inventory

Studio Inventory is generated from normalized state and presented in its own mode as a readable table. It supports search across visible columns, ascending and descending column sorting, 10/25/50/All page sizes, compact pagination, matching-result counts, separate empty and no-match states, keyboard-accessible rows, and horizontal overflow without breaking the page. Inventory actions must not create or maintain a second data source. Architecture guidance, FAQ, and references follow the table and remain expanded rather than using a parent disclosure.

## About Content

Each released architecture should provide:

- concise introduction
- at least five FAQs
- three to five verified references
- related topics when the shared renderer supports them

FAQ and references are package content, not hard-coded provider copy in the shared shell.

## Studio Template Routes

Every released template has a stable workspace URL at `/studio/{provider}/{templateId}`. Opening that URL renders the same Studio shell, lazily loads the matching provider package and catalogue, and creates the normalized template project. Selecting another template updates the browser URL, canonical metadata, document title, description, and visually hidden page-level `h1` without reloading or duplicating Studio.

Starting a blank project, restoring exported JSON, or recovering local state returns to `/studio`. Editing a released template keeps its originating route because the URL identifies the starting template, not a public copy of the user's evolving local project. Back and forward navigation reload the corresponding released template or blank Studio state. View changes do not create additional routes.

## Share, Embed, And Watermarks

Share and embed are read-only layout surfaces. They must preserve context, provider identity, inventory, advisory meaning, and readable diagram output.

Share mode organizes the existing publisher rather than duplicating it. It shows a static preview of the active view and offers a read-only share snapshot, configurable embed, PNG download, editable project export, and project restore. Preview and PNG generation must export the shared fitted maxGraph presentation rather than reconstructing boxes and relationships in an independent renderer. This preserves Design geometry, routing, labels, icons, boundaries, and visual styles while adding only the Share header and watermark. Preview generation remains local and must not create a published snapshot. Publishing still uses the existing bounded snapshot endpoint, URLs, dialogs, social options, embed controls, and watermark behavior.

Generated share images and exported visual files should show an InfraStack watermark. Browser and operating-system screenshots cannot be reliably blocked or forced blank, so the interface must not promise that protection.

## Responsive Behavior

On narrower screens:

- allow application-bar controls to wrap
- keep the project field intact
- stack or collapse side panels
- preserve a usable canvas height
- prevent uncontrolled horizontal page overflow
- allow inventory tables to scroll
- keep primary actions visible

Text must not overlap buttons, tabs, cards, chips, canvas labels, or table cells.

## Typography And Color

- `Nunito`: headings and titles
- `Roboto`: body, controls, labels, navigation, tables, and support content
- monospace: JSON, code, commands, and preformatted output only

Use the existing restrained white Studio shell and semantic state colors. Do not introduce unrelated font families or provider colors as global shell colors.

The shared header and footer use `public/images/logo/infrastack-wordmark.png`. Light surfaces render the supplied image directly. Dark surfaces and `html[data-theme="dark"]` render a deterministic accessible composite with theme-aware white `InfraStack` text and the unchanged purple K, separator, and `Studio` artwork from the supplied wordmark. `public/images/logo/infrastack-icon.png` owns favicon and touch-icon contexts.

## Validation

Static checks validate paths, syntax, schemas, and known hooks. Browser Use must validate visible changes against `https://infrastack.my`.

For diagram work, inspect selection, movement, resizing, relationships, connector routing, zoom, fit, panels, inventory, advisory, graphs, export feedback, and responsive behavior. A passing static command is not visual acceptance.
