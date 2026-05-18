# Assessment Filter Workspace Section

## Purpose

Defines the primary query, brief, or filter that starts an assessment-family workspace.

Use it when the user needs to search by control ID, finding title, section path, requirement name, asset, owner, or other assessment key.

## Baseline Reference

Use `templates/content/tools/cis/assess-ubuntu-2204-cis/` for the working filter row and Explore action behavior.

## Expected Behavior

- The filter input must be visibly paired with the primary action.
- The row should fill the available tool-box width.
- Helper text should explain filter scope without claiming validation.
- The primary action should build the normalized result model.
- Results should not render as final output until the user runs the primary action or restores a deliberate state.

## Validation Checklist

- Input, label, and primary action are accessible.
- Empty and broad queries are handled gracefully.
- The filter updates normalized state, not only visible text.
- The result boundary is clear before the first run.
