# Selected Artifact Workspace Section

## Purpose

Defines the selected artifact review panel.

Use it for selected scripts, policy snippets, rules, requirements, evidence, source bodies, remediation notes, or finding details.

## Baseline Reference

Use `templates/content/tools/cis/assess-ubuntu-2204-cis/` for selected script metadata, loading state, source display, copy, and download boundaries.

## Expected Behavior

- The selected artifact must match the active row or selected control.
- Loading and unavailable states should be visible.
- Source bodies should be escaped before display.
- Copy and download actions should use the currently selected artifact.
- The browser must not execute scripts or apply fixes.

## Validation Checklist

- Selection changes rerender metadata and source body.
- Copy/download actions are disabled when no artifact is available.
- Long source lines scroll without breaking the page layout.
- Trust boundary copy is explicit for runnable artifacts.
