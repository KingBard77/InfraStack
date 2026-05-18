// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackShellWorkspaceSections || {};
    const source = {
            "section": "05_score-card",
            "title": "score card",
            "sourceTool": "templates/content/tools/shell/generate-netcat-shell/",
            "sourceFile": "custom.js",
            "sourceJsLines": [
                    [
                            75,
                            76
                    ],
                    [
                            1844,
                            1893
                    ]
            ],
            "sourceDomIds": [
                    "__DOM_PREFIX__ResultSummary"
            ],
            "sourceClasses": [
                    "__PREFIX__-summary-shell",
                    "__PREFIX__-summary-gauge",
                    "__PREFIX__-summary-method",
                    "__PREFIX__-summary-host",
                    "__PREFIX__-summary-shell-name",
                    "__PREFIX__-summary-side",
                    "__PREFIX__-summary-route",
                    "__PREFIX__-summary-cards",
                    "__PREFIX__-stat-card",
                    "__PREFIX__-badge"
            ],
            "sourceVariables": [
                    "resultSummary"
            ],
            "sourceFunctions": [
                    "renderSummary"
            ],
            "sourceBehaviours": [
                    "renders command state cards from the normalized result",
                    "surfaces mode, host, implementation, protocol, ports, flags, shell, warning count, and error count",
                    "keeps the score/status card derived from generated result data only"
            ]
    };

    /**
     * Returns the extracted shell score card JavaScript ownership map.
     *
     * @returns {{section: string, title: string, sourceTool: string, sourceFile: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceFunctions: string[], sourceBehaviours: string[]}} Section source metadata.
     */
    function scoreCardSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.scoreCardSourceSection = scoreCardSourceSection;
    registry.scoreCard = scoreCardSourceSection;
    global.InfraStackShellWorkspaceSections = registry;
}(window));
