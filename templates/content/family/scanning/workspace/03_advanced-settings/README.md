# Advanced Settings Workspace Section

## Purpose

Optional advanced settings slot. The family keeps this empty until a source tool has controls that should be separated from basic settings.

This folder exists so every active family exposes the same persistent workspace section slots to the tool factory. Do not render fake controls from this section; omit it during assembly unless a final tool has real behavior for the slot.

## Files

- `page.html.twig`: intentionally empty fragment.
- `section.css`: intentionally empty style surface.
- `section.js`: registers section metadata only.
- `demo.html`: documents the no-op state for local review.
