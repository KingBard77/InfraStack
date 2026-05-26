// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackShellWorkspaceSections || {};
    const source = {
            "section": "04_result-text",
            "title": "result text",
            "sourceTool": "templates/content/tools/shell/generate-netcat-shell/",
            "sourceFile": "custom.js",
            "sourceJsLines": [
                    [
                            70,
                            72
                    ]
            ],
            "sourceDomIds": [
                    "__DOM_PREFIX__ResultEmpty",
                    "__DOM_PREFIX__ResultContent",
                    "__DOM_PREFIX__ResultError",
                    "__DOM_PREFIX__CommandOutput",
                    "__DOM_PREFIX__CopyCommand"
            ],
            "sourceClasses": [
                    "__PREFIX__-result-empty",
                    "__PREFIX__-result-content",
                    "__PREFIX__-result-error",
                    "__PREFIX__-command-wrap",
                    "__PREFIX__-command-head",
                    "__PREFIX__-command-title",
                    "__PREFIX__-command-pre",
                    "__PREFIX__-action-btn",
                    "__PREFIX__-command-copy-label"
            ],
            "sourceVariables": [
                    "resultEmpty",
                    "resultContent",
                    "resultError",
                    "commandOutput",
                    "copyCommandButton",
                    "latestResult"
            ],
            "sourceFunctions": [
                    "formatPortSpec",
                    "buildModeSummary",
                    "buildSummaryRows",
                    "buildJsonPayload",
                    "buildCsvRows",
                    "renderResult",
                    "showResultError",
                    "copyText",
                    "generateAndRender"
            ],
            "sourceBehaviours": [
                    "renders the generated command text from the normalized result",
                    "keeps the pre-generate empty state separate from generated output",
                    "shows blocking command errors near the result text",
                    "copies only the generated command string when available"
            ]
    };

    /**
     * Returns the extracted shell result text JavaScript ownership map.
     *
     * @returns {{section: string, title: string, sourceTool: string, sourceFile: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceFunctions: string[], sourceBehaviours: string[]}} Section source metadata.
     */
    function resultTextSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.resultTextSourceSection = resultTextSourceSection;
    registry.resultText = resultTextSourceSection;
    global.InfraStackShellWorkspaceSections = registry;
}(window));
