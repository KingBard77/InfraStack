# Scope Selectors Workspace Section

## Purpose

Defines scope controls for assessment-family tools.

Use it for family, section, severity, status, profile, selected item, and row-limit selectors.

## Baseline Reference

Use `templates/content/tools/cis/assess-ubuntu-2204-cis/` for compact custom selectors, reset buttons, and width-matched dropdown menus.

## Expected Behavior

- Scope selectors must update normalized state.
- Reset actions should be explicit and predictable.
- Dropdown menus should match the closed control width.
- Changing a parent scope should not leave a stale child selection hidden.
- Row limits affect visible tables, not the underlying selected item pool unless documented.

## Validation Checklist

- Every selector has a label.
- Reset buttons restore documented defaults.
- Dropdown menus fit mobile and desktop widths.
- Scope changes rerender summary, tables, artifact, exports, and JSON together.
