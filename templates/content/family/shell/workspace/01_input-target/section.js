// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackShellWorkspaceSections || {};
    const source = {
            "section": "01_input-target",
            "title": "input target",
            "sourceTool": "templates/content/tools/shell/generate-netcat-shell/",
            "sourceFile": "custom.js",
            "sourceJsLines": [
                    [
                            5,
                            9
                    ],
                    [
                            2258,
                            2283
                    ],
                    [
                            2390,
                            2398
                    ]
            ],
            "sourceDomIds": [
                    "__DOM_PREFIX__Form",
                    "__DOM_PREFIX__Submit",
                    "__DOM_PREFIX__Reset",
                    "__DOM_PREFIX__PrimaryHost",
                    "__DOM_PREFIX__PrimaryHostLabel"
            ],
            "sourceClasses": [
                    "__TOOL_CLASS__",
                    "__PREFIX__-form",
                    "__PREFIX__-main-row",
                    "__PREFIX__-main-label",
                    "__PREFIX__-main-input-grid",
                    "__PREFIX__-main-actions",
                    "__PREFIX__-submit-btn",
                    "__PREFIX__-reset-btn"
            ],
            "sourceVariables": [
                    "form",
                    "submitButton",
                    "resetButton",
                    "primaryHostInput",
                    "primaryHostLabel"
            ],
            "sourceFunctions": [
                    "generateAndRender",
                    "resetBuilder"
            ],
            "sourceBehaviours": [
                    "binds the primary command target field",
                    "owns Generate and Reset actions",
                    "switches submit state while generation is running",
                    "starts rendering from the normalized command query"
            ]
    };

    /**
     * Returns the extracted shell input target JavaScript ownership map.
     *
     * @returns {{section: string, title: string, sourceTool: string, sourceFile: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceFunctions: string[], sourceBehaviours: string[]}} Section source metadata.
     */
    function inputTargetSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.inputTargetSourceSection = inputTargetSourceSection;
    registry.inputTarget = inputTargetSourceSection;
    global.InfraStackShellWorkspaceSections = registry;
}(window));
