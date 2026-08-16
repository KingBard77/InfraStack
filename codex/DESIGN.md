# InfraStack Studio Design Contract

## Purpose

Studio is a web-based drawing application, not a collection of disconnected pages. New architecture releases reuse one visual shell and add file-based content.

## Shared Page Structure

The editable page stays in one structured Twig template:

```text
templates/studio/index.html.twig
```

Content order:

1. Studio workspace
2. Studio Result
3. Studio Graph
4. Studio Improvement
5. Studio Inventory
6. Studio About: introduction, FAQ, references, and supported related topics

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

The workspace contains:

- application bar
- navigation rail
- collapsible and resizable component library
- central canvas
- collapsible and resizable inspector
- visible save state
- real history, zoom, fit, share, embed, export, and restore controls

The project-name control must remain a single compact editable field. Unexpected injected elements must not expand or break its layout.

Panel collapse state and widths should persist locally. The canvas must reclaim available space when either panel collapses.

## Diagram Interaction

Current required behavior:

- select a draggable asset or boundary
- select a relationship to adjust it
- drag to move
- resize through supported handles or controls
- arrow keys move selected assets
- Shift plus arrow keys moves faster
- Command/Control plus Z undoes the last edit
- mouse wheel zooms the stage
- selection remains visible while properties or style are adjusted

Alt plus arrow-key resizing and one-percent modifier-wheel zoom are roadmap requirements until implemented and browser-verified. Do not document them as working controls before then.

## Canvas Controls

Controls must remain on or adjacent to the stage and must be wired:

- select/move
- connect
- relationship type
- duplicate
- auto-layout
- align and distribute
- reference image
- delete
- review
- zoom and fit
- keyboard shortcuts

Do not display inactive decorative controls.

## Result And Improvement

Studio Result contains grade, score, confidence, open findings, and category scores. It explains deterministic facts and must not imply certification.

Studio Improvement contains actionable cards derived from advisory findings. Empty projects use a persistent centered empty state matching the graph and inventory rhythm.

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

Studio Inventory is generated from normalized state and presented as a readable table. It must support horizontal overflow without breaking the page and show a persistent empty state when no rows exist.

## About Content

Each released architecture should provide:

- concise introduction
- at least five FAQs
- three to five verified references
- related topics when the shared renderer supports them

FAQ and references are package content, not hard-coded provider copy in the shared shell.

## Share, Embed, And Watermarks

Share and embed are read-only layout surfaces. They must preserve context, provider identity, inventory, advisory meaning, and readable diagram output.

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

## Validation

Static checks validate paths, syntax, schemas, and known hooks. Browser Use must validate visible changes against `https://infrastack.my`.

For diagram work, inspect selection, movement, resizing, relationships, connector routing, zoom, fit, panels, inventory, advisory, graphs, export feedback, and responsive behavior. A passing static command is not visual acceptance.
