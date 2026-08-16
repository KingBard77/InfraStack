# InfraStack Checks

Use one public command:

```bash
codex/bin/check.sh repository
codex/bin/check.sh studio
codex/bin/check.sh performance
codex/bin/check.sh deployment
codex/bin/check.sh all
```

`repository` checks current ownership and contract paths. `studio` validates registries, packages, JavaScript, and Node tests. `performance` enforces documented source and lazy-registry budgets. `deployment` validates Twig, routes, Asset Mapper, and development/production cache paths on `vm-host-infrastack`.
