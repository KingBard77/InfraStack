# Custom Setting Workspace Section

Owns optional command settings, raw extra flags, proxy/TLS/session extras, and warnings for unsupported option combinations.

The folder and namespace remain `03_advanced-setting` for compatibility. The visible shell panel label is `Custom`.

Shell parity requires the opened Custom panel body to be flat: no direct nested card frame inside the panel body. Keep the compatibility folder and namespace name, but do not reintroduce a visible `Advanced` label in runtime tools.

Source baseline: `templates/content/family/shell/workspace/`, with historical snapshot ranges under `templates/content/family/shell/baseline/source/`.

## Files

- `page.html.twig`: reusable shell workspace markup for this section.
- `section.css`: source CSS extracted from the shell family baseline and scoped with placeholders.
- `section.js`: source JavaScript metadata extracted from the shell family baseline.
- `demo.html`: static local preview for this section.
