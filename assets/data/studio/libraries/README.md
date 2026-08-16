# Studio Libraries And Packages

Studio keeps reusable component libraries separate from release packages:

```text
assets/data/studio/libraries/<group>/<library>/catalog.json
assets/icons/studio/libraries/<group>/<library>/
assets/studio/packages/<family>/<provider-or-domain>/<package>/
```

`registry.json` owns the user-facing library groups and catalogue paths. `catalog.json` defines searchable components, semantic types, and supported views. Matching icon directories contain shared local SVG files. A package stores released templates, result configuration, and support content without copying the Studio shell or shared icons.

Library folders answer what an asset belongs to. Logical, physical, network, overview, and availability remain `views` metadata because one asset can appear in multiple projections. Put genuinely different view artwork under a library-local `variants/` directory rather than duplicating the whole library.

Each compact package contains:

```text
package.json
templates.json
result.json
content.yml
```

`assets/studio/packages/registry.json` is the package source of truth. Symfony resolves Asset Mapper URLs and sends the small registry with the page. The browser then loads only the selected provider package. Templates must contain normalized project state so inventory, advisory, JSON export, sharing, and embedding continue to use the shared Studio engine.

Use package-local icons only when an icon cannot be reused from `assets/icons/studio/libraries/`.
