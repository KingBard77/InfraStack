// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "07_score-card",
        "title": "score card",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
            [
                        193,
                        193
            ],
            [
                        1937,
                        2126
            ],
            [
                        3898,
                        4049
            ],
            [
                        4104,
                        4162
            ]
],
        "sourceDomIds": [
            "__DOM_PREFIX__OutputStatus",
            "__DOM_PREFIX__ScoreValue",
            "__DOM_PREFIX__ScoreEchart"
        ],
        "sourceClasses": [
            "__PREFIX__-output-summary",
            "__PREFIX__-output-status-card",
            "__PREFIX__-score-card",
            "__PREFIX__-score-ring-card",
            "__PREFIX__-score-value",
            "__PREFIX__-score-copy",
            "__PREFIX__-score-kicker",
            "__PREFIX__-score-summary",
            "__PREFIX__-score-detail",
            "__PREFIX__-score-tag"
        ],
        "sourceVariables": [
            "outputStatus",
            "scoreRingChart",
            "scoreRingRenderToken",
            "scoreRingResizeHandler"
        ],
        "sourceFunctions": [
            "clampScore",
            "buildArchitectureProsCons",
            "buildArchitectureScore",
            "loadECharts",
            "destroyScoreRingChart",
            "renderScoreRingChart",
            "renderOutputScore"
        ],
        "sourceBehaviours": [
            "derives advisory score from the normalized model",
            "renders score copy and tone tags",
            "keeps score copy advisory and non-validating",
            "destroys and redraws the optional ECharts ring safely"
        ]
    };

    /**
     * Returns the extracted architecture score card JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function scoreCardSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.scoreCardSourceSection = scoreCardSourceSection;
    registry.scoreCard = scoreCardSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
