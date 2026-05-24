# Architecture Source Snapshot

Reference-only full source copy from:

```text
templates/content/tools/aws/architecture-vpc-aws/
```

This snapshot preserves the original `tool.html.twig`, `custom.css`, `custom.js`, and `assets/bin/model-core.js` used to baseline the architecture workspace sections. Do not audit this as active source.

Snapshot date: `2026-05-18`.

The snapshot carries namespace extraction markers in `tool.html.twig`, `custom.css`, and `custom.js`. The markers and section-owned `section.js` files define which ranges informed each reusable workspace section.

Final tools must not import these files at runtime. Use `templates/content/family/architecture/workspace/` as the reusable section source.
