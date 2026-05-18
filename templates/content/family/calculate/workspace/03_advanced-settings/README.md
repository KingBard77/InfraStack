# Advanced Settings Workspace Section

## Purpose

Standard `03_advanced-settings` slot for the calculate family. This section combines component cards with visible assumptions, rates, overrides, and calculation policy controls.

The slot name is shared across all active families so the tool factory can assemble workspaces consistently while each family keeps domain-specific controls and output behavior.

## Component: Service Cards

# Service Cards Workspace Section

## Purpose

Defines repeated service, component, line-item, or workload cards for calculate-family tools.

Use it when the estimate is built from multiple components that can be included, excluded, or individually tuned.

## Baseline Reference

Use the AWS, Azure, and IBM Cloud cost calculators as the reference set. AWS supplies service-card composition; Azure and IBM Cloud prove provider-native component naming, category/provider tokens, and copied-token cleanup.

## Expected Behavior

- Each card must own a stable component key.
- Include toggles must affect totals and JSON.
- Card inputs must be grouped by component.
- Disabled or excluded cards should not silently contribute to totals.
- Card inputs should use stable dimensions so labels, addons, selected values, and helper text do not resize the card layout unexpectedly.

## Typical UI

- component heading
- include toggle
- quantity, size, rate, or usage inputs
- component subtotal or helper note
- domain-specific icon, chip, or badge only when it clarifies the component

## Validation Checklist

- Component keys are stable.
- Toggle state is represented in the model.
- Each visible input affects the current estimate.
- Totals, tables, and JSON use the same component model.
- Disabled components are excluded from summary metrics, table rows, exports, and JSON result totals.

## Component: Advanced Assumptions

# Advanced Assumptions Workspace Section

## Purpose

Defines advanced assumptions, editable rates, buffers, discounts, overrides, and calculation policy controls.

Use it when users need to inspect or tune values beyond the basic estimate shape.

## Baseline Reference

Use the AWS, Azure, and IBM Cloud cost calculators as the reference set. AWS supplies visible starter-rate structure; Azure and IBM Cloud prove provider-native rate labels, category/provider tokens, and copied-token cleanup.

## Expected Behavior

- Advanced values must be auditable.
- Default assumptions should be visible or documented.
- Overrides must update totals and JSON immediately or through a clear action.
- Invalid numeric values should fall back gracefully or show inline validation.
- Starter rates, catalogs, or default factors must be labeled as planning assumptions unless they are verified from a live source during the session.

## Typical UI

- rate inputs
- buffer or contingency controls
- discount or utilization controls
- assumption notes
- restore default rates action when useful
- named manual adjustment input when the calculator intentionally leaves some scope outside detailed component cards

## Validation Checklist

- Numeric inputs validate ranges.
- Assumption changes update totals.
- Exported JSON includes overrides.
- Content does not claim live pricing or billing accuracy unless actually validated.
- Manual adjustments are visible in summary, tables, assumptions, and JSON.
