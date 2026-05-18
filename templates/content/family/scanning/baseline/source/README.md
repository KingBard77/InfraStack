# Scanning Source Snapshot

Reference-only full source copy from:

```text
templates/content/tools/security/scan-web-security/
```

This snapshot preserves the stabilized `tool.html.twig`, `custom.css`, `custom.js`, and `assets/bin/model-core.js` used to baseline the scanning workspace sections.

Current snapshot: 2026-05-17 scanning baseline refresh.

Captured baseline behavior:

- compact circular score-card ring with centered score and `/100` denominator
- custom preferences without extra nested card framing
- separated summary, toolbar, tabs, and table shells without the unwanted divider line
- aligned `Sort` control and compact export/copy/import actions
- sticky/frozen copy columns in horizontally scrollable result tables

Final tools must not import these files at runtime. Use `templates/content/family/scanning/workspace/` as the reusable section source.
