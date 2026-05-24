# Shell Source Snapshot

Reference-only full source copy from:

```text
templates/content/tools/shell/generate-netcat-shell/
```

This snapshot preserves the original `tool.html.twig`, `custom.css`, `custom.js`, and `assets/bin/model-core.js` used to baseline the shell workspace sections.

Do not audit this as active source.

This snapshot is the maintained shell extraction source for `source:start/source:end family.shell.workspace.<section>` markers, but it is still reference material.

Final tools must not import these files at runtime. Use `templates/content/family/shell/workspace/` as the reusable section source. Reapplying the shell family to runtime packages means structural, visual, and runtime parity with that workspace source, not marker coverage, source markers, old snapshot equivalence, or copied support text.

For current shell generators, parity must be checked in the final runtime package for the visible `Custom` label, flattened Custom body, exact Sort option set, exact five output actions, working fifth-action toolbar layout, and real JSON restore plumbing whenever `Import JSON` is visible.
