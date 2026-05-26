# InfraStack Tool Factory

`factory/` owns source contracts used to create and refresh InfraStack tools. It is not a runtime package path.

## Phases

- `phase-1/_base/`: universal base contracts for package shape, workspace markers, state, output, export, restore, and validation.
- `phase-1/_family/`: reusable family behavior baselines for architecture, assessment, calculate, scanning, shell, and future family contracts.
- `phase-2/_content/`: package scaffold and reusable support content sections.

## Rules

- Keep `_base` and `_family` lowercase.
- Keep `scaffold/` and `sections/` under `phase-2/_content/`.
- Keep final tools under `templates/content/tools/<category>/<tool-slug>/`.
- Keep namespace IDs stable unless a deliberate migration is scoped.
- Use `phase-1/_base` first to confirm universal contracts, then `phase-1/_family` to confirm family-specific behavior, then `phase-2/_content` to deliver the package shell and support text.
