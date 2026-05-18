# Sort Card Workspace Section

Owns the sort dropdown, toolbar card, export/copy action surface, and compact output action layout.

Shell parity requires Sort options exactly `ID`, `A-Z`, `Field`, `Value`, and `Length` unless a command-native divergence is recorded. Current shell generators use exactly five output actions: `Export PDF`, `Download CSV`, `Copy JSON`, `Download JSON`, and `Import JSON`. The fifth action must have deliberate responsive toolbar layout.

Source baseline: `templates/content/family/shell/workspace/`, with historical snapshot ranges under `templates/content/family/shell/baseline/source/`.

Demo rule: before and after states must stack vertically as two rows in one column. Do not present these states side by side.

## Files

- `page.html.twig`: reusable shell workspace markup for this section.
- `section.css`: source CSS extracted from the shell family baseline and scoped with placeholders.
- `section.js`: source JavaScript metadata extracted from the shell family baseline.
- `demo.html`: static local preview for this section.
