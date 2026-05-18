// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "06_result-diagram",
        "title": "result diagram",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
            [
                        169,
                        186
            ],
            [
                        988,
                        1387
            ],
            [
                        2232,
                        3653
            ],
            [
                        5018,
                        5239
            ],
            [
                        6178,
                        6195
            ],
            [
                        6244,
                        6303
            ]
],
        "sourceDomIds": [
            "__DOM_PREFIX__StageShell",
            "__DOM_PREFIX__StageEmpty",
            "__DOM_PREFIX__StageCanvas",
            "__DOM_PREFIX__ZoomControl",
            "__DOM_PREFIX__ZoomLabel",
            "__DOM_PREFIX__ZoomInput",
            "__DOM_PREFIX__ZoomOut",
            "__DOM_PREFIX__ZoomIn",
            "__DOM_PREFIX__ZoomFit",
            "__DOM_PREFIX__ZoomActual",
            "__DOM_PREFIX__UndoStageEdit",
            "__DOM_PREFIX__HighlightAll",
            "__DOM_PREFIX__ZoomHideUi",
            "__DOM_PREFIX__UsageHelpButton",
            "__DOM_PREFIX__UsageHelpPopup",
            "__DOM_PREFIX__UsageHelpClose",
            "__DOM_PREFIX__Fullscreen",
            "__DOM_PREFIX__ResetLayout"
        ],
        "sourceClasses": [
            "tool-stage-shell",
            "tool-stage-toolbar",
            "tool-stage-body",
            "tool-stage-empty",
            "tool-stage-canvas",
            "__PREFIX__-stage-canvas",
            "__PREFIX__-zoom-control",
            "__PREFIX__-icon-btn",
            "__PREFIX__-stage-preview",
            "__PREFIX__-usage-overlay",
            "diagram-root",
            "diagram-card-group",
            "diagram-connector",
            "diagram-connector-hit-target",
            "diagram-connector-anchor-handle",
            "diagram-connector-bend-handle"
        ],
        "sourceVariables": [
            "stageCanvas",
            "stageShell",
            "stageZoom",
            "stageUiHidden",
            "stageDiagramHighlighted",
            "selectedConnectorId",
            "connectorOverrideContext",
            "defaultStageZoom"
        ],
        "sourceFunctions": [
            "applyStageZoom",
            "setStageZoom",
            "setStageZoomToFit",
            "setStageUiHidden",
            "syncStageDiagramHighlight",
            "setUsageHelpOpen",
            "toggleFullscreen",
            "resetStageViewport",
            "computeStageGeometry",
            "buildSvgMarkup",
            "renderCardConnector",
            "buildConnectorPathFromCards",
            "findConnectorPathById",
            "updateConnectorPreview",
            "renderConnectorAnchorHandles",
            "bindConnectorAnchorHandle",
            "bindConnectorBendHandle",
            "renderResult",
            "renderPresetPreview"
        ],
        "sourceBehaviours": [
            "renders the SVG diagram from normalized state",
            "supports zoom, fit, actual size, fullscreen, hide UI, usage help, and whole-diagram highlight",
            "keeps layout and connector edits synchronized with export state",
            "renders invisible connector hit targets separate from visible connector strokes",
            "keeps arrowhead sizing fixed through user-space marker geometry",
            "redraws connectors while connected boxes move or resize",
            "persists connector anchor and bend overrides",
            "shows preview state without unlocking generated output"
        ]
    };

    /**
     * Returns the extracted architecture result diagram JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function resultDiagramSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.resultDiagramSourceSection = resultDiagramSourceSection;
    registry.resultDiagram = resultDiagramSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
