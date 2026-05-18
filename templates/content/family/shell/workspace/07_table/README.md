# Table Workspace Section

Owns output tabs, operation rows, row copy actions, warning/error lists, JSON output, and JSON import boundaries when restore is implemented.

When `Import JSON` is visible, the final tool must include a hidden file input, JavaScript import handler, schema validation, normalized state restore, and visible output refresh. Do not show import controls when restore has not been implemented and validated.

Source baseline: `templates/content/family/shell/workspace/`, with historical snapshot ranges under `templates/content/family/shell/baseline/source/`.

Demo rule: before and after states must stack vertically as two rows in one column. Do not present these states side by side.

## Files

- `page.html.twig`: reusable shell workspace markup for this section.
- `section.css`: source CSS extracted from the shell family baseline and scoped with placeholders.
- `section.js`: source JavaScript metadata extracted from the shell family baseline.
- `demo.html`: static local preview for this section.
