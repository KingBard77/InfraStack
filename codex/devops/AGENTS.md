# InfraStack Task Records

## Purpose

Task records preserve scope, progress, evidence, and the next action without generating a forest of boilerplate.

## Universal Template

All task kinds use:

```text
codex/devops/template/
├── README.md
├── tracking.md
└── evidence.md
```

Create a record with:

```bash
codex/bin/_init.sh <task_name> --kind <kind>
```

The kind may be inferred when the task name starts with an allowed kind. Otherwise it defaults to `change`.

## Task Kinds

- `create`: new Studio package, library, provider, or capability
- `change`: functional, visual, content, layout, refactor, or housekeeping change
- `fix`: bounded defect or regression
- `audit`: read-only inspection and recommendations
- `validate`: acceptance, smoke, schema, runtime, or release validation
- `performance`: performance measurement or optimization
- `platform`: contracts, Codex, tooling, schemas, or shared platform structure

There is no active `baseline` kind. Studio packages reuse the shared engine rather than copied family applications.

Batch work uses a normal kind with multiple targets recorded in `README.md`.

## Lifecycle

```text
codex/devops/tasks/processing/<task_name>/
codex/devops/tasks/archived/<task_name>/
codex/devops/tasks/abandoned/<task_name>/
```

Use `archived`, never `archieved`. Use `abandoned`, never `abondoned`.

Before starting a new record, search all three lifecycle folders. Resume a matching processing record instead of creating a duplicate.

Move a completed record to `archived/` after its evidence and next action are final. Move cancelled, zero-scope, or superseded work to `abandoned/` with the reason recorded.

Only records created with the current universal template belong in the lifecycle folders.

## File Ownership

### `README.md`

Owns:

- kind and status
- concrete goal
- targets
- included and excluded scope
- contracts read
- stable behavior to preserve

### `tracking.md`

Owns:

- current state
- next action
- blockers
- concise session log

### `evidence.md`

Owns:

- commands actually run
- pass/fail outcomes
- browser and VM results
- skipped checks and reasons
- remaining gaps

Record facts, not aspirations. Do not claim validation that did not run.

## Large Evidence

Keep task records text-first. Store large screenshots, Lighthouse JSON, HTML captures, and logs under:

```text
var/codex-evidence/<task_name>/
```

Reference the artifact path and important measurement from `evidence.md`. Do not store secrets or unredacted sensitive data.

## Required Workflow

1. Create or resume the record.
2. Fill the goal, targets, scope, and contracts.
3. Keep `tracking.md` current.
4. Run checks appropriate to the changed surface.
5. Record actual evidence and gaps.
6. Archive the task when complete.

## Validation Environment

Browser-visible checks use `https://infrastack.my` through Browser Use.

VM checks use `vm-host-infrastack`, `xxcd.iad.infrastack`, and `xxcomposercache`.

Do not use production hosts, tunnels, VM IP browser URLs, local proxies, or ad hoc local PHP servers as acceptance evidence.
