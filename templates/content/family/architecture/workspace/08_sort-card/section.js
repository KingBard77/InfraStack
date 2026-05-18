// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "08_sort-card",
        "title": "sort card",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
            [
                        201,
                        204
            ],
            [
                        231,
                        236
            ],
            [
                        3699,
                        3763
            ],
            [
                        5905,
                        6088
            ],
            [
                        6205,
                        6215
            ],
            [
                        6238,
                        6241
            ]
],
        "sourceDomIds": [
            "__DOM_PREFIX__InventorySortSelect",
            "__DOM_PREFIX__InventorySortSummary",
            "__DOM_PREFIX__InventorySort",
            "__DOM_PREFIX__ExportPng",
            "__DOM_PREFIX__DownloadSvg",
            "__DOM_PREFIX__CopyJson",
            "__DOM_PREFIX__DownloadJson",
            "__DOM_PREFIX__ImportJsonButton"
        ],
        "sourceClasses": [
            "__TOOL_CLASS__bar-shell",
            "__TOOL_CLASS__bar",
            "__TOOL_CLASS__bar-main",
            "tool-output-toolbar",
            "tool-output-actions",
            "__PREFIX__-sort-label",
            "__PREFIX__-sort-wrap",
            "__PREFIX__-sort-select",
            "__PREFIX__-sort-summary",
            "__PREFIX__-sort-menu",
            "__PREFIX__-sort-option"
        ],
        "sourceVariables": [
            "inventorySortInput",
            "inventorySortSelect",
            "inventorySortSummary",
            "inventorySortOptions",
            "inventorySortMode",
            "exportPngButton",
            "downloadSvgButton",
            "copyJsonButton",
            "downloadJsonButton",
            "importJsonButton"
        ],
        "sourceFunctions": [
            "sortInventoryItems",
            "syncInventorySortSelect",
            "setInventorySortMode",
            "applyInventorySortMode",
            "downloadFile",
            "downloadSvg",
            "exportPng",
            "copyJson",
            "downloadJson"
        ],
        "sourceBehaviours": [
            "sorts inventory presentation without mutating the model",
            "keeps the Sort trigger label synchronized",
            "binds implemented PNG, SVG, JSON copy/download, and import actions"
        ]
    };

    /**
     * Returns the extracted architecture sort card JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function sortCardSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.sortCardSourceSection = sortCardSourceSection;
    registry.sortCard = sortCardSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
