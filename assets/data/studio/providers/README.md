# Studio Provider Packages

Each provider owns the same three surfaces:

```text
assets/data/studio/providers/<provider>/catalog.json
assets/icons/providers/<provider>/
assets/js/studio/providers/<provider>/templates.js
```

`catalog.json` defines searchable components and semantic types. The icon directory contains only that provider's local SVG files. `templates.js` registers editable example architectures through `assets/js/studio/providers/registry.js`.

The Symfony controller exposes provider catalogue and icon URLs as one configuration object. Shared Studio code must consume that object and must not add provider-specific URL attributes.
