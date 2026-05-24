// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "05_result-text",
        "title": "result text",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
            [
                        164,
                        166
            ],
            [
                        189,
                        190
            ],
            [
                        210,
                        215
            ],
            [
                        3871,
                        3894
            ],
            [
                        4167,
                        4185
            ],
            [
                        5683,
                        5727
            ],
            [
                        5750,
                        5810
            ]
],
        "sourceDomIds": [
            "__DOM_PREFIX__StageTitle",
            "__DOM_PREFIX__StageSubtitle",
            "__DOM_PREFIX__StageMeta",
            "__DOM_PREFIX__OutputEmpty",
            "__DOM_PREFIX__PromptSummary",
            "__DOM_PREFIX__ResultTextGenerated"
        ],
        "sourceClasses": [
            "__PREFIX__-stage-header",
            "__PREFIX__-stage-heading",
            "__PREFIX__-stage-preset-chip",
            "__PREFIX__-stage-meta",
            "__PREFIX__-prompt-notes-card",
            "__PREFIX__-note-card",
            "__PREFIX__-note-copy",
            "tool-empty-state"
        ],
        "sourceVariables": [
            "stageTitle",
            "stageSubtitle",
            "stageMeta",
            "outputEmpty",
            "promptSummary"
        ],
        "sourceFunctions": [
            "renderStageMeta",
            "renderStageHeader",
            "renderNotes",
            "renderResult",
            "renderPresetPreview"
        ],
        "sourceBehaviours": [
            "renders stage title and preset chip",
            "renders metadata chips from current model state",
            "keeps the exact pre-generate output notice visible until generation",
            "renders short generated review text from normalized notes"
        ]
    };

    /**
     * Returns the extracted architecture result text JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function resultTextSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.resultTextSourceSection = resultTextSourceSection;
    registry.resultText = resultTextSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
