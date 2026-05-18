# Basic Settings Workspace Section

## Purpose

Defines preset and basic setting controls for a calculate-family tool.

Use it for common estimate shape, region, currency, unit system, period, environment, service mix, or high-level sizing choices.

## Baseline Reference

Use the AWS, Azure, and IBM Cloud cost calculators as the reference set. AWS supplies preset rhythm; Azure and IBM Cloud prove provider-native setting labels, category/provider tokens, and copied-token cleanup.

## Expected Behavior

- Preset changes must update visible controls and the normalized model.
- Basic settings should be visible before advanced assumptions.
- All controls must affect the computed output or be removed.
- Preset descriptions should explain what changed.
- Custom select or details-based controls should keep the closed control compact and the menu no wider than the intended control group unless the content needs more width.

## Typical UI

- preset selector
- apply preset action when preset changes are not immediate
- period, region, currency, or scope controls
- short setting hints
- compact summary labels that do not wrap awkwardly in the control

## Validation Checklist

- Preset values map to known model defaults.
- Basic setting labels match domain language.
- No fake controls remain.
- Changing a basic setting changes the result or JSON payload.
- Preset application resets output sorting to the family default when line-item output is regenerated.
