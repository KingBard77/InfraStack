// section.js
(function attachArchitectureVisualContractSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "04_visual-contract",
        "title": "visual contract",
        "family": "architecture",
        "role": "architecture diagram stage, connector, viewport, and visual model contract",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceDomIds": [
            "__DOM_PREFIX__StageTitle",
            "__DOM_PREFIX__StageSubtitle",
            "__DOM_PREFIX__StageMeta",
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
            "__DOM_PREFIX__ResetLayout",
            "__DOM_PREFIX__OutputEmpty",
            "__DOM_PREFIX__OutputContent"
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
            "architecture-engine-marquee-selection",
            "is-marquee-target",
            "diagram-connector",
            "diagram-connector-hit-target",
            "diagram-connector-anchor-handle",
            "diagram-connector-bend-handle"
        ],
        "sourceVariables": [
            "state",
            "selectedCardId",
            "selectedConnectorId",
            "stageCanvas",
            "stageShell",
            "stageZoom",
            "stageUiHidden",
            "stageDiagramHighlighted",
            "highlightedNodeIds",
            "connectorOverrideContext",
            "layoutOverrides",
            "connectorOverrides",
            "defaultStageZoom",
            "stageUndoStack"
        ],
        "sourceFunctions": [
            "InfraStackArchitectureEngineRuntime.mount",
            "InfraStackArchitectureEngineRuntime.createState",
            "InfraStackArchitectureEngineRuntime.toPersistedState",
            "InfraStackArchitectureEngineRuntime.cloneLayoutOverrides",
            "InfraStackArchitectureEngineRuntime.cloneConnectorOverrides",
            "applyStageZoom",
            "highlightNodes",
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
            "selectCard",
            "selectConnector",
            "moveSelectedCard",
            "resizeSelectedCard",
            "undoStageEdit",
            "renderResult",
            "renderPresetPreview"
        ],
        "sourceBehaviours": [
            "provides a reusable architecture stage interaction engine for per-tool adapters",
            "renders the SVG diagram from normalized state",
            "supports zoom, fit, actual size, fullscreen, hide UI, usage help, and whole-diagram highlight",
            "renders cursor marquee selection as a stage-canvas overlay so it is not clipped by the SVG drawing surface",
            "live-highlights boxes intersected by the cursor marquee while dragging",
            "persists multi-box highlight state through highlighted_node_ids with highlighted_node_id compatibility",
            "keeps layout and connector edits synchronized with export state",
            "renders invisible connector hit targets separate from visible connector strokes",
            "keeps connector stroke sizing consistent for base, active, selected, hit-target, anchor-handle, and bend-handle states",
            "requires rendered connector paths to carry shared connector classes before provider-specific classes",
            "keeps connector arrowheads on fixed shared 11x11 marker geometry instead of stroke-scaled marker units",
            "keeps arrowhead sizing fixed through user-space marker geometry",
            "redraws connectors while connected boxes move or resize",
            "persists connector anchor and bend overrides",
            "shows preview state without unlocking generated output",
            "softly blurs before-generate preset previews while keeping the diagram legible behind the overlay"
        ]
    };

    /**
     * Returns architecture visual-contract source metadata.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function visualContractSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.visualContractSourceSection = visualContractSourceSection;
    registry.visualContract = visualContractSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
