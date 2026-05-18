# Result Tabs Workspace Section

## Purpose

Defines tabbed result views for a calculate-family tool.

Use it when users need multiple views such as breakdown, service mix, assumptions, recommendations, chart, or JSON.

## Baseline Reference

Use the AWS, Azure, and IBM Cloud cost calculators as the reference set. AWS supplies result-tab rhythm; Azure and IBM Cloud prove provider-native tab copy, JSON identity, and category/provider token cleanup.

## Expected Behavior

- Tabs must expose real output, not placeholder panels.
- Active tab state should be accessible.
- Tab labels should match available result views.
- Tables, charts, notes, and JSON should use the current model.
- Tabs should sit in a dedicated output shell below the toolbar so controls and content read as one result workspace.
- Result tabs should use ARIA roles and selected state when implemented with custom buttons.

## Typical UI

- breakdown tab
- assumptions tab
- mix or comparison tab
- recommendations tab when the calculator emits advisory text
- methodology notes may remain with assumptions when they explain the estimate basis
- JSON or export tab

## Validation Checklist

- Tab buttons and panels have matching ARIA references.
- Keyboard navigation is preserved when implemented.
- Hidden tabs do not contain stale result state.
- JSON tab matches current estimate.
- Switching tabs does not recompute from DOM-only state.
- Tab shell and table shell remain aligned on mobile and desktop widths.
