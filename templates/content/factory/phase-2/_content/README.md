# InfraStack Factory Content

`_content/` owns the phase-2 content delivery source.

```text
_content/
├── MAIN.md
├── scaffold/
│   ├── assets/
│   ├── card.yml
│   ├── content.md
│   ├── meta.yml
│   ├── README.md
│   └── tool.html.twig
└── sections/
    ├── 01_overview/
    ├── 02_technical-details/
    ├── 03_example-prompts/
    ├── 04_tips-prompts/
    ├── 05_how-to-use/
    ├── 06_export-notes/
    ├── 07_faq/
    ├── 08_acronyms/
    ├── 09_example-commands/
    ├── 10_references/
    └── 11_glossary/
```

Final tools copy or adapt this source into `templates/content/tools/<category>/<tool-slug>/`; they do not depend on it at runtime.
