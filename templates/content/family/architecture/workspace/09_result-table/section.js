// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "09_result-table",
        "title": "result table",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
            [
                        196,
                        198
            ],
            [
                        207,
                        207
            ],
            [
                        3660,
                        3694
            ],
            [
                        3767,
                        3868
            ],
            [
                        4052,
                        4100
            ],
            [
                        6091,
                        6135
            ],
            [
                        6156,
                        6161
            ],
            [
                        6218,
                        6231
            ]
],
        "sourceDomIds": [
            "__DOM_PREFIX__OutputEmpty",
            "__DOM_PREFIX__OutputContent",
            "__DOM_PREFIX__InventoryTableBody",
            "__DOM_PREFIX__RoutingTableBody",
            "__DOM_PREFIX__ControlTableBody",
            "__DOM_PREFIX__PromptSummary",
            "__DOM_PREFIX__KeywordList",
            "__DOM_PREFIX__AssumptionList",
            "__DOM_PREFIX__ModelList",
            "__DOM_PREFIX__ProsList",
            "__DOM_PREFIX__ConsList",
            "__DOM_PREFIX__PillarBreakdown",
            "__DOM_PREFIX__RiskLevel",
            "__DOM_PREFIX__JsonOutput",
            "__DOM_PREFIX__ImportJson"
        ],
        "sourceClasses": [
            "tool-output-shell",
            "tool-empty-state",
            "__PREFIX__-output-content",
            "__PREFIX__-output-shell",
            "__PREFIX__-tabs-shell",
            "tool-tabs",
            "__PREFIX__-tab-btn",
            "__PREFIX__-tab-panel",
            "__PREFIX__-inventory-panel",
            "__PREFIX__-table-card",
            "__PREFIX__-table-wrap",
            "__PREFIX__-table",
            "__PREFIX__-row-copy",
            "__PREFIX__-prompt-notes-card",
            "__PREFIX__-assessment-card",
            "__PREFIX__-pillar-card",
            "__PREFIX__-risk-card",
            "tool-json-shell",
            "__PREFIX__-json-code"
        ],
        "sourceVariables": [
            "outputEmpty",
            "outputContent",
            "inventoryTableBody",
            "jsonOutput",
            "promptSummary",
            "keywordList",
            "assumptionList",
            "modelList",
            "prosList",
            "consList",
            "pillarBreakdownOutput",
            "riskLevelOutput",
            "tabButtons",
            "tabPanels"
        ],
        "sourceFunctions": [
            "buildExportPayload",
            "highlightJson",
            "renderInventory",
            "buildInventoryCopyText",
            "copyInventoryRow",
            "renderNotes",
            "buildPillarBreakdown",
            "buildRiskLevel",
            "renderAssessmentSections",
            "restoreFromImportedPayload",
            "handleImportChange",
            "activateTab"
        ],
        "sourceBehaviours": [
            "renders generated inventory rows with copy-row buttons",
            "renders prompt notes and advisory assessment tabs",
            "renders syntax-highlighted JSON export state",
            "validates and restores imported JSON state"
        ]
    };

    /**
     * Returns the extracted architecture result table JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function resultTableSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.resultTableSourceSection = resultTableSourceSection;
    registry.resultTable = resultTableSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
