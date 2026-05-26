# InfraStack Factory Phase 1

`phase-1/` owns the working tool contract.

Use it before content delivery:

- `_base/`: universal package, workspace, state, output, export, restore, and validation contracts.
- `_family/`: family-specific behavior, workspace grammar, normalized state expectations, output behavior, and parity rules.

New tools must satisfy `_base` first, then the matching `_family` source when a family baseline exists.
