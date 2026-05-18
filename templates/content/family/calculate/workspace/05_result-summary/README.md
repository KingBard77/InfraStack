# Result Summary Workspace Section

## Purpose

Defines the primary computed result surface for a calculate-family tool.

Use it for total cost, run rate, capacity answer, recommendation, status, or key result cards.

## Baseline Reference

Use the AWS, Azure, and IBM Cloud cost calculators as the reference set. AWS supplies result-summary structure; Azure and IBM Cloud prove provider-native summaries, chart palette replacement, and category/provider token cleanup.

## Expected Behavior

- Summary values must be computed from the normalized model.
- The main answer should be visible without opening a tab.
- Supporting cards should explain major drivers or assumptions.
- Empty state should not show stale previous results.
- The default layout should be a balanced overview shell: primary computed answer on the left and supporting metrics, top driver, chips, or caution cards on the right.
- A ring or chart may support the primary answer, but it must be optional, nonblocking, and backed by a CSS or SVG fallback when it depends on an external library.
- Do not present heuristic score copy as cost accuracy, billing readiness, production readiness, or certification.

## Typical UI

- primary total or answer card
- secondary metric cards
- status or caution copy
- applied assumption chips
- optional visual ring or small chart tied to the primary answer

## Validation Checklist

- Summary resets when input resets.
- Summary updates after every calculation change.
- Currency, units, and periods are clear.
- Values match the breakdown table and JSON.
- Supporting metrics are not narrower than their content and do not wrap major values awkwardly.
- Chart fallback renders a nonblank primary answer when the chart library does not load.
