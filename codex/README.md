# InfraStack Codex Workspace

## Purpose

This folder contains the current Studio contracts, lightweight task workflow, and validation tooling.

```text
codex/
├── README.md
├── PROMPT.md
├── DESIGN.md
├── bin/
│   ├── _init.sh
│   └── check.sh
├── tooling/
│   ├── cli.py
│   └── checks/
└── devops/
    ├── AGENTS.md
    ├── template/
    └── tasks/
```

## Documentation Ownership

- Root `AGENTS.md`: short routing map and non-negotiable rules.
- `PROMPT.md`: Studio implementation and release contract.
- `DESIGN.md`: Studio visual and interaction contract.
- `devops/AGENTS.md`: task-record lifecycle.
- External `SKILL.md`: execution workflow that defers to repository contracts.

## Task Records

```bash
codex/bin/_init.sh create_gcp_architecture --kind create
codex/bin/_init.sh performance_studio --kind performance
```

New records contain only:

```text
README.md
tracking.md
evidence.md
```

The task history starts clean. New records use only this three-file shape.

## Validation

```bash
codex/bin/check.sh repository
codex/bin/check.sh studio
codex/bin/check.sh performance
codex/bin/check.sh deployment
codex/bin/check.sh all
```

The public interface stays small. Internal checks may remain modular.

## Evidence Storage

Keep concise results in task `evidence.md`. Store large screenshots, Lighthouse files, HTML captures, and logs under ignored `var/codex-evidence/<task-name>/` when they must persist.

## Versioning Boundary

Contracts, the universal template, and active tooling should be versioned. Generated task records, reports, caches, and bulky evidence remain local or ignored. Production deployment does not need Codex files to serve Studio.
