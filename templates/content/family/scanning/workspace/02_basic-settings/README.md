# Scan Options Workspace Section

## Purpose

Defines advanced request, validation, client, and companion-probe controls for a scanning-family tool.

Use it when a scanner needs editable options beyond the primary target.

## Expected Behavior

- Dropdown menus use button options, not radio cards inside dropdowns.
- Dropdown menus render above following cards.
- Toggles and numeric inputs update the normalized query.
- Defaults are conservative and visible.

## Validation Checklist

- Option IDs match JavaScript.
- Dropdown summary, hidden value, and active option stay in sync.
- Escape/outside-click handling closes menus when implemented.
- Exported JSON includes option state when JSON output is implemented.
