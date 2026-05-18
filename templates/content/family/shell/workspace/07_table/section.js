// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackShellWorkspaceSections || {};
    const source = {
            "section": "07_table",
            "title": "table",
            "sourceTool": "templates/content/tools/shell/generate-netcat-shell/",
            "sourceFile": "custom.js",
            "sourceJsLines": [
                    [
                            79,
                            82
                    ],
                    [
                            98,
                            184
                    ],
                    [
                            577,
                            711
                    ],
                    [
                            1980,
                            2255
                    ],
                    [
                            2286,
                            2387
                    ],
                    [
                            2432,
                            2528
                    ]
            ],
            "sourceDomIds": [
                    "__DOM_PREFIX__OptionsTableBody",
                    "__DOM_PREFIX__WarningsList",
                    "__DOM_PREFIX__ErrorsList",
                    "__DOM_PREFIX__JsonOutput",
                    "__DOM_PREFIX__ImportJsonButton",
                    "__DOM_PREFIX__ImportJson",
                    "__DOM_PREFIX__OptionsPanel",
                    "__DOM_PREFIX__WarningsPanel",
                    "__DOM_PREFIX__JsonPanel"
            ],
            "sourceClasses": [
                    "__PREFIX__-tab-btn",
                    "__PREFIX__-tab-panel",
                    "__PREFIX__-options-table",
                    "__PREFIX__-table-copy-cell",
                    "__PREFIX__-row-copy",
                    "__PREFIX__-message-list",
                    "__PREFIX__-message-list-empty",
                    "__PREFIX__-json-panel",
                    "tool-json-key",
                    "tool-json-string",
                    "tool-json-number",
                    "tool-json-boolean",
                    "tool-json-null"
            ],
            "sourceVariables": [
                    "optionsTableBody",
                    "warningsList",
                    "errorsList",
                    "jsonOutput",
                    "importJsonButton",
                    "importJsonInput",
                    "tabButtons",
                    "tabPanels"
            ],
            "sourceFunctions": [
                    "initMarkdownCopyButtons",
                    "flashButton",
                    "escapeJsonHtml",
                    "escapeHtml",
                    "highlightJsonText",
                    "renderJsonOutput",
                    "renderOptionsTable",
                    "renderMessageList",
                    "activateTab",
                    "syncSafeStateToUrl",
                    "restoreSafeStateFromUrl",
                    "getImportedText",
                    "getImportedBoolean",
                    "getSelectOptionValue",
                    "getImportedQuery",
                    "applyImportedQuery"
            ],
            "sourceBehaviours": [
                    "renders sortable operation rows with icon-only row copy actions",
                    "renders warnings and blocking errors from the generated command result",
                    "renders highlighted JSON from the normalized command payload",
                    "owns output tabs and JSON restore/import boundaries"
            ]
    };

    /**
     * Returns the extracted shell table JavaScript ownership map.
     *
     * @returns {{section: string, title: string, sourceTool: string, sourceFile: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceFunctions: string[], sourceBehaviours: string[]}} Section source metadata.
     */
    function tableSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.tableSourceSection = tableSourceSection;
    registry.table = tableSourceSection;
    global.InfraStackShellWorkspaceSections = registry;
}(window));
