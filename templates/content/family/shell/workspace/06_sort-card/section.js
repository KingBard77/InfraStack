// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackShellWorkspaceSections || {};
    const source = {
            "section": "06_sort-card",
            "title": "sort card",
            "sourceTool": "templates/content/tools/shell/generate-netcat-shell/",
            "sourceFile": "custom.js",
            "sourceJsLines": [
                    [
                            85,
                            95
                    ],
                    [
                            1896,
                            1977
                    ],
                    [
                            2412,
                            2429
                    ]
            ],
            "sourceDomIds": [
                    "__DOM_PREFIX__Sort",
                    "__DOM_PREFIX__SortSummary",
                    "__DOM_PREFIX__SortSelect",
                    "__DOM_PREFIX__ExportPdf",
                    "__DOM_PREFIX__DownloadCsv",
                    "__DOM_PREFIX__CopyJson",
                    "__DOM_PREFIX__DownloadJson"
            ],
            "sourceClasses": [
                    "__PREFIX__-result-toolbar",
                    "__PREFIX__-sort-select",
                    "__PREFIX__-sort-summary",
                    "__PREFIX__-sort-menu",
                    "__PREFIX__-sort-option",
                    "__PREFIX__-toolbar-actions",
                    "__PREFIX__-action-btn"
            ],
            "sourceVariables": [
                    "sortInput",
                    "sortSummary",
                    "sortOptionButtons",
                    "sortSelect",
                    "exportPdfButton",
                    "downloadCsvButton",
                    "copyJsonButton",
                    "downloadJsonButton"
            ],
            "sourceFunctions": [
                    "updateSortState",
                    "getSortedSummaryRows",
                    "convertRowsToCsv",
                    "downloadFile",
                    "exportResultShellAsPdf",
                    "getScriptExtension",
                    "formatDateTime"
            ],
            "sourceBehaviours": [
                    "keeps ID as the default stable sort state",
                    "sorts operation rows without mutating the original generated summary rows",
                    "opens print/PDF export from the current result shell",
                    "downloads CSV and JSON exports from the current normalized result"
            ]
    };

    /**
     * Returns the extracted shell sort card JavaScript ownership map.
     *
     * @returns {{section: string, title: string, sourceTool: string, sourceFile: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceFunctions: string[], sourceBehaviours: string[]}} Section source metadata.
     */
    function sortCardSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.sortCardSourceSection = sortCardSourceSection;
    registry.sortCard = sortCardSourceSection;
    global.InfraStackShellWorkspaceSections = registry;
}(window));
