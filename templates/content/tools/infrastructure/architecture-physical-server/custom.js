// custom.js

// ns:start family.architecture.workspace.01_input-brief
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "01_input-brief",
        "title": "input brief",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            154,
                            157
                  ],
                  [
                            597,
                            623
                  ],
                  [
                            1393,
                            1403
                  ],
                  [
                            1418,
                            1573
                  ],
                  [
                            5814,
                            5858
                  ],
                  [
                            5883,
                            5888
                  ],
                  [
                            6144,
                            6147
                  ],
                  [
                            6174,
                            6175
                  ]
        ],
        "sourceDomIds": [
            "architecturePhysicalServerPrompt",
            "architecturePhysicalServerGenerate",
            "architecturePhysicalServerReset",
            "architecturePhysicalServerErrorState"
        ],
        "sourceClasses": [
            "tool-prompt-shell",
            "tool-main-row",
            "tool-main-label",
            "tool-main-input-grid",
            "architecture-physical-server-prompt",
            "architecture-physical-server-prompt-hint",
            "architecture-physical-server-main-actions",
            "tool-error-state"
        ],
        "sourceVariables": [
            "promptInput",
            "generateButton",
            "resetButton",
            "errorState"
        ],
        "sourceFunctions": [
            "normalizePrompt",
            "showError",
            "clearError",
            "inferFromPrompt",
            "generateFromPrompt",
            "resetToDefault"
        ],
        "sourceBehaviours": [
            "normalizes the primary brief",
            "seeds the normalized model from prompt text",
            "binds Generate and Load Default actions",
            "renders parser errors without unlocking generated output"
        ]
    };

    /**
     * Returns the extracted architecture input brief JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function architecturePromptSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.architecturePromptSourceSection = architecturePromptSourceSection;
    registry.architecturePrompt = architecturePromptSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family.architecture.workspace.01_input-brief
// ns:start family.architecture.workspace.02_basic-settings
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "02_basic-settings",
        "title": "basic settings",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            160,
                            161
                  ],
                  [
                            243,
                            245
                  ],
                  [
                            711,
                            886
                  ],
                  [
                            892,
                            918
                  ],
                  [
                            1583,
                            1601
                  ],
                  [
                            5861,
                            5880
                  ],
                  [
                            6150,
                            6153
                  ]
        ],
        "sourceDomIds": [
            "architecturePhysicalServerPreset",
            "architecturePhysicalServerPresetDescription",
            "architecturePhysicalServerRegion",
            "architecturePhysicalServerAzCount"
        ],
        "sourceClasses": [
            "architecture-physical-server-basic-preset-section",
            "architecture-physical-server-basic-grid",
            "architecture-physical-server-control-stack",
            "architecture-physical-server-native-select",
            "architecture-physical-server-custom-select",
            "architecture-physical-server-custom-select-trigger",
            "architecture-physical-server-custom-select-menu"
        ],
        "sourceVariables": [
            "presetInput",
            "presetDescription",
            "regionInput",
            "azCountInput",
            "customSelectControls"
        ],
        "sourceFunctions": [
            "initializeCustomSelect",
            "initializeCustomSelects",
            "populateRegionOptions",
            "updatePresetSelection",
            "syncControls",
            "applyPreset"
        ],
        "sourceBehaviours": [
            "enhances native select fields with the baseline custom dropdown",
            "keeps the preset description synchronized",
            "populates region and zone choices",
            "applies preset defaults to the normalized model"
        ]
    };

    /**
     * Returns the extracted architecture basic settings JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function basicTabSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.basicTabSourceSection = basicTabSourceSection;
    registry.basicTab = basicTabSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family.architecture.workspace.02_basic-settings
// ns:start family.architecture.workspace.03_advanced-settings
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "03_advanced-settings",
        "title": "advanced settings",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            248,
                            261
                  ],
                  [
                            937,
                            954
                  ],
                  [
                            1606,
                            1652
                  ],
                  [
                            6165,
                            6170
                  ],
                  [
                            6339,
                            6354
                  ]
        ],
        "sourceDomIds": [
            "architecturePhysicalServerNetworkConfigTab",
            "architecturePhysicalServerWorkloadConfigTab",
            "architecturePhysicalServerServicesConfigTab",
            "architecturePhysicalServerNetworkConfigPanel",
            "architecturePhysicalServerWorkloadConfigPanel",
            "architecturePhysicalServerServicesConfigPanel",
            "architecturePhysicalServerCidr",
            "architecturePhysicalServerNatMode",
            "architecturePhysicalServerAppTier",
            "architecturePhysicalServerDatabase",
            "architecturePhysicalServerRoute53",
            "architecturePhysicalServerCloudFront",
            "architecturePhysicalServerWaf",
            "architecturePhysicalServerAlb",
            "architecturePhysicalServerBastion",
            "architecturePhysicalServerEndpoints",
            "architecturePhysicalServerFlowLogs",
            "architecturePhysicalServerCloudWatch",
            "architecturePhysicalServerSiteToSiteVpn",
            "architecturePhysicalServerTransitGateway",
            "architecturePhysicalServerCache"
        ],
        "sourceClasses": [
            "architecture-physical-server-custom-panel",
            "architecture-physical-server-custom-panel-summary",
            "architecture-physical-server-config-tabs",
            "architecture-physical-server-config-tab",
            "architecture-physical-server-config-panel",
            "architecture-physical-server-config-grid",
            "architecture-physical-server-toggle-grid",
            "architecture-physical-server-toggle-item"
        ],
        "sourceVariables": [
            "cidrInput",
            "natModeInput",
            "appTierInput",
            "databaseInput",
            "route53Input",
            "cloudFrontInput",
            "wafInput",
            "albInput",
            "bastionInput",
            "endpointsInput",
            "flowLogsInput",
            "cloudWatchInput",
            "siteToSiteVpnInput",
            "transitGatewayInput",
            "cacheInput"
        ],
        "sourceFunctions": [
            "activateConfigTab",
            "bindTabKeyboardNavigation",
            "buildSpecFromControls",
            "renderFromControls"
        ],
        "sourceBehaviours": [
            "switches advanced tab panels accessibly",
            "reads advanced controls into normalized state",
            "re-renders the preview or generated diagram after control changes"
        ]
    };

    /**
     * Returns the extracted architecture advanced settings JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function customTabSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.customTabSourceSection = customTabSourceSection;
    registry.customTab = customTabSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family.architecture.workspace.03_advanced-settings
// ns:start family.architecture.workspace.04_selected-item
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "04_selected-item",
        "title": "selected item",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            218,
                            228
                  ],
                  [
                            404,
                            439
                  ],
                  [
                            4188,
                            4629
                  ],
                  [
                            4641,
                            4998
                  ],
                  [
                            5242,
                            5680
                  ],
                  [
                            6198,
                            6202
                  ]
        ],
        "sourceDomIds": [
            "architecturePhysicalServerSelectedShell",
            "architecturePhysicalServerSelectedEmpty",
            "architecturePhysicalServerSelectedEditor",
            "architecturePhysicalServerSelectedName",
            "architecturePhysicalServerSelectedX",
            "architecturePhysicalServerSelectedY",
            "architecturePhysicalServerSelectedWidth",
            "architecturePhysicalServerSelectedHeight",
            "architecturePhysicalServerHighlightCard",
            "architecturePhysicalServerApplyCardSize",
            "architecturePhysicalServerResetCardSize"
        ],
        "sourceClasses": [
            "architecture-physical-server-selected-section",
            "architecture-physical-server-selected-empty",
            "architecture-physical-server-selected-empty-chips",
            "architecture-physical-server-selected-hint-chip",
            "architecture-physical-server-selected-editor",
            "architecture-physical-server-selected-name",
            "architecture-physical-server-selected-actions",
            "diagram-card-group",
            "diagram-resize-handle",
            "diagram-connector",
            "diagram-connector-hit-target",
            "diagram-connector-anchor-handle",
            "diagram-connector-bend-handle"
        ],
        "sourceVariables": [
            "selectedCardId",
            "selectedCardIds",
            "selectedConnectorId",
            "highlightedCardId",
            "stageUndoStack"
        ],
        "sourceFunctions": [
            "renderSelectedEmptyMessage",
            "showSelectedShell",
            "setSelectedCards",
            "syncSelectedCardVisual",
            "updateSelectedCardEditor",
            "highlightSelectedCard",
            "applySelectedCardSize",
            "resetSelectedCardSize",
            "undoStageEdit",
            "setSelectedConnector",
            "renderConnectorAnchorHandles",
            "bindConnectorAnchorHandle",
            "bindConnectorBendHandle",
            "getCurrentConnectorOverrides",
            "bindStageDragging",
            "bindStageResizing"
        ],
        "sourceBehaviours": [
            "shows empty hint chips before selection",
            "syncs selected card fields from rendered model state",
            "applies movement and size edits through layout overrides",
            "supports connector selection as an editable stage item when connectors are editable",
            "shows connector adjustment guidance while keeping selected box inspector state separate",
            "keeps connector overrides in normalized export and restore data",
            "preserves undo snapshots for stage edits"
        ]
    };

    /**
     * Returns the extracted architecture selected item JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function selectedItemSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.selectedItemSourceSection = selectedItemSourceSection;
    registry.selectedItem = selectedItemSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family.architecture.workspace.04_selected-item
// ns:start family.architecture.workspace.05_result-text
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
            "architecturePhysicalServerStageTitle",
            "architecturePhysicalServerStageSubtitle",
            "architecturePhysicalServerStageMeta",
            "architecturePhysicalServerOutputEmpty",
            "architecturePhysicalServerPromptSummary",
            "architecturePhysicalServerResultTextGenerated"
        ],
        "sourceClasses": [
            "architecture-physical-server-stage-header",
            "architecture-physical-server-stage-heading",
            "architecture-physical-server-stage-preset-chip",
            "architecture-physical-server-stage-meta",
            "architecture-physical-server-prompt-notes-card",
            "architecture-physical-server-note-card",
            "architecture-physical-server-note-copy",
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
// ns:end family.architecture.workspace.05_result-text
// ns:start family.architecture.workspace.06_result-diagram
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
            "architecturePhysicalServerStageShell",
            "architecturePhysicalServerStageEmpty",
            "architecturePhysicalServerStageCanvas",
            "architecturePhysicalServerZoomControl",
            "architecturePhysicalServerZoomLabel",
            "architecturePhysicalServerZoomInput",
            "architecturePhysicalServerZoomOut",
            "architecturePhysicalServerZoomIn",
            "architecturePhysicalServerZoomFit",
            "architecturePhysicalServerZoomActual",
            "architecturePhysicalServerUndoStageEdit",
            "architecturePhysicalServerHighlightAll",
            "architecturePhysicalServerZoomHideUi",
            "architecturePhysicalServerUsageHelpButton",
            "architecturePhysicalServerUsageHelpPopup",
            "architecturePhysicalServerUsageHelpClose",
            "architecturePhysicalServerFullscreen",
            "architecturePhysicalServerResetLayout"
        ],
        "sourceClasses": [
            "tool-stage-shell",
            "tool-stage-toolbar",
            "tool-stage-body",
            "tool-stage-empty",
            "tool-stage-canvas",
            "architecture-physical-server-stage-canvas",
            "architecture-physical-server-zoom-control",
            "architecture-physical-server-icon-btn",
            "architecture-physical-server-stage-preview",
            "architecture-physical-server-usage-overlay",
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
// ns:end family.architecture.workspace.06_result-diagram
// ns:start family.architecture.workspace.07_score-card
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
            "architecturePhysicalServerOutputStatus",
            "architecturePhysicalServerScoreValue",
            "architecturePhysicalServerScoreEchart"
        ],
        "sourceClasses": [
            "architecture-physical-server-output-summary",
            "architecture-physical-server-output-status-card",
            "architecture-physical-server-score-card",
            "architecture-physical-server-score-ring-card",
            "architecture-physical-server-score-value",
            "architecture-physical-server-score-copy",
            "architecture-physical-server-score-kicker",
            "architecture-physical-server-score-summary",
            "architecture-physical-server-score-detail",
            "architecture-physical-server-score-tag"
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
// ns:end family.architecture.workspace.07_score-card
// ns:start family.architecture.workspace.08_sort-card
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
            "architecturePhysicalServerInventorySortSelect",
            "architecturePhysicalServerInventorySortSummary",
            "architecturePhysicalServerInventorySort",
            "architecturePhysicalServerExportPng",
            "architecturePhysicalServerDownloadSvg",
            "architecturePhysicalServerCopyJson",
            "architecturePhysicalServerDownloadJson",
            "architecturePhysicalServerImportJsonButton"
        ],
        "sourceClasses": [
            "architecture-physical-server-toolbar-shell",
            "architecture-physical-server-toolbar",
            "architecture-physical-server-toolbar-main",
            "tool-output-toolbar",
            "tool-output-actions",
            "architecture-physical-server-sort-label",
            "architecture-physical-server-sort-wrap",
            "architecture-physical-server-sort-select",
            "architecture-physical-server-sort-summary",
            "architecture-physical-server-sort-menu",
            "architecture-physical-server-sort-option"
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
// ns:end family.architecture.workspace.08_sort-card
// ns:start family.architecture.workspace.09_result-table
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
            "architecturePhysicalServerOutputEmpty",
            "architecturePhysicalServerOutputContent",
            "architecturePhysicalServerInventoryTableBody",
            "architecturePhysicalServerRoutingTableBody",
            "architecturePhysicalServerControlTableBody",
            "architecturePhysicalServerPromptSummary",
            "architecturePhysicalServerKeywordList",
            "architecturePhysicalServerAssumptionList",
            "architecturePhysicalServerModelList",
            "architecturePhysicalServerProsList",
            "architecturePhysicalServerConsList",
            "architecturePhysicalServerPillarBreakdown",
            "architecturePhysicalServerRiskLevel",
            "architecturePhysicalServerJsonOutput",
            "architecturePhysicalServerImportJson"
        ],
        "sourceClasses": [
            "tool-output-shell",
            "tool-empty-state",
            "architecture-physical-server-output-content",
            "architecture-physical-server-output-shell",
            "architecture-physical-server-tabs-shell",
            "tool-tabs",
            "architecture-physical-server-tab-btn",
            "architecture-physical-server-tab-panel",
            "architecture-physical-server-inventory-panel",
            "architecture-physical-server-table-card",
            "architecture-physical-server-table-wrap",
            "architecture-physical-server-table",
            "architecture-physical-server-row-copy",
            "architecture-physical-server-prompt-notes-card",
            "architecture-physical-server-assessment-card",
            "architecture-physical-server-pillar-card",
            "architecture-physical-server-risk-card",
            "tool-json-shell",
            "architecture-physical-server-json-code"
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
// ns:end family.architecture.workspace.09_result-table

{{ include('content/tools/infrastructure/architecture-physical-server/assets/bin/model-core.js')|raw }}

(function initArchitecturePhysicalServerWorkspace(globalScope) {
    'use strict';

    const core = ArchitecturePhysicalServerModelCore;
    const iconSvgMap = {
        users: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/users.svg')|json_encode|raw }},
        router: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/router.svg')|json_encode|raw }},
        firewall: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/firewall.svg')|json_encode|raw }},
        switch: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/switch.svg')|json_encode|raw }},
        server: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/server.svg')|json_encode|raw }},
        virtualization: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/virtualization.svg')|json_encode|raw }},
        storage: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/storage.svg')|json_encode|raw }},
        network: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/network.svg')|json_encode|raw }},
        management: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/management.svg')|json_encode|raw }},
        backup: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/backup.svg')|json_encode|raw }},
        rack: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/rack.svg')|json_encode|raw }},
        power: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/power.svg')|json_encode|raw }},
        cooling: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/cooling.svg')|json_encode|raw }},
        security: {{ include('content/tools/infrastructure/architecture-physical-server/assets/icon/security.svg')|json_encode|raw }}
    };
    const dom = {};
    const state = {
        generated: false,
        presetId: 'onprem-private-cloud',
        prompt: '',
        controls: {},
        model: null,
        layoutOverrides: {},
        connectorOverrides: {},
        selectedIds: [],
        selectedConnectorId: '',
        stageHighlighted: false,
        zoom: 0.58,
        sortMode: 'id',
        undoStack: [],
        currentPayload: null
    };
    const itemRegistry = new Map();
    const childRegistry = new Map();
    const connectorRegistry = new Map();
    let currentSvgMarkup = '';
    let dragState = null;
    let resizeState = null;
    let connectorBendState = null;
    let marqueeState = null;
    let highlightedAllTimer = null;
    let activePointerSvg = null;
    let activeStageInteraction = {
        type: '',
        ids: []
    };
    let renderFrameId = 0;
    const inventoryColumnLabels = {
        index: '#',
        component: 'Component',
        placement: 'Placement',
        purpose: 'Purpose'
    };

    function byId(id) {
        return document.getElementById(id);
    }

    function all(selector, root) {
        return Array.from((root || document).querySelectorAll(selector));
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function iconHref(name) {
        const svg = iconSvgMap[name] || iconSvgMap.server;

        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    function downloadBlob(filename, mimeType, content) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function fallbackCopyText(value) {
        const textarea = document.createElement('textarea');

        textarea.value = value;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            return document.execCommand('copy');
        } finally {
            textarea.remove();
        }
    }

    async function writeClipboardText(value) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(value);
                return true;
            } catch (error) {
                return fallbackCopyText(value);
            }
        }

        return fallbackCopyText(value);
    }

    function showError(message) {
        if (!dom.errorState) {
            return;
        }

        dom.errorState.textContent = message;
        dom.errorState.hidden = false;
        dom.errorState.classList.remove('d-none');
    }

    function clearError() {
        if (!dom.errorState) {
            return;
        }

        dom.errorState.textContent = '';
        dom.errorState.hidden = true;
        dom.errorState.classList.add('d-none');
    }

    function collectDom() {
        const ids = [
            'Prompt',
            'Generate',
            'Reset',
            'ErrorState',
            'Preset',
            'RackCount',
            'HypervisorCount',
            'Platform',
            'StorageModel',
            'NetworkMode',
            'ServerModel',
            'StoragePlatform',
            'MgmtTool',
            'ManagementNetwork',
            'StorageNetwork',
            'TenantNetwork',
            'BackupNetwork',
            'NetworkNotes',
            'Proxmox',
            'Horizon',
            'SynologyDsm',
            'Zabbix',
            'Syslog',
            'OutOfBand',
            'Snapshots',
            'OffsiteBackup',
            'DisasterRecovery',
            'RedundantPower',
            'Cooling',
            'PhysicalSecurity',
            'PresetDescription',
            'StageShell',
            'StageTitle',
            'StageSubtitle',
            'StageMeta',
            'StageCanvas',
            'StageEmpty',
            'ZoomInput',
            'ZoomOut',
            'ZoomIn',
            'ZoomLabel',
            'ZoomFit',
            'ZoomActual',
            'UndoStageEdit',
            'HighlightAll',
            'ZoomHideUi',
            'Fullscreen',
            'ResetLayout',
            'UsageHelpButton',
            'UsageHelpClose',
            'UsageHelpPopup',
            'SelectedEmpty',
            'SelectedEditor',
            'SelectedName',
            'SelectedX',
            'SelectedY',
            'SelectedWidth',
            'SelectedHeight',
            'HighlightItem',
            'ApplyItemSize',
            'ResetItemSize',
            'OutputEmpty',
            'OutputContent',
            'OutputStatus',
            'Score',
            'ScoreSummary',
            'ScoreDetail',
            'Sort',
            'InventorySortSelect',
            'InventorySortMenu',
            'InventorySortSummary',
            'ExportPng',
            'DownloadSvg',
            'CopyJson',
            'DownloadJson',
            'ImportJsonButton',
            'ImportJson',
            'InventoryTableBody',
            'RoutingTableBody',
            'ControlTableBody',
            'PromptSummary',
            'KeywordList',
            'AssumptionList',
            'ModelList',
            'ProsList',
            'ConsList',
            'PillarBreakdown',
            'RiskLevel',
            'JsonOutput'
        ];

        ids.forEach(function (name) {
            dom[name.charAt(0).toLowerCase() + name.slice(1)] = byId('architecturePhysicalServer' + name);
        });

        dom.root = document.querySelector('.architecture-physical-server-tool');
        dom.outputTabs = all('.architecture-physical-server-tab-btn');
        dom.outputPanels = all('[data-output-panel]');
        dom.configTabs = all('.architecture-physical-server-config-tab');
        dom.configPanels = all('[data-config-panel]');
        dom.sortOptions = all('.architecture-physical-server-sort-option');
        dom.enhancedSelects = all('select.form-select', dom.root);

        return Boolean(dom.root && dom.prompt && dom.generate && dom.stageCanvas);
    }

    function syncEnhancedSelects() {
        all('select[data-custom-select-enhanced="true"]', dom.root).forEach(function (selectElement) {
            const wrapper = selectElement.nextElementSibling;
            const activeOption = Array.from(selectElement.options).find(function (option) {
                return option.value === selectElement.value;
            }) || selectElement.options[0];
            const value = wrapper && wrapper.querySelector('.architecture-physical-server-custom-select-value');

            if (value) {
                value.textContent = activeOption ? activeOption.textContent : '';
            }

            if (!wrapper) {
                return;
            }

            all('.architecture-physical-server-custom-select-option', wrapper).forEach(function (button) {
                const active = button.dataset.value === selectElement.value;

                button.classList.toggle('selected', active);
                button.setAttribute('aria-selected', String(active));
            });
        });
    }

    function collectControls() {
        return {
            rackCount: dom.rackCount.value,
            hypervisorCount: dom.hypervisorCount.value,
            platform: dom.platform.value,
            storageModel: dom.storageModel.value,
            networkMode: dom.networkMode.value,
            serverModel: dom.serverModel.value,
            storagePlatform: dom.storagePlatform.value,
            managementTool: dom.mgmtTool.value,
            managementNetwork: dom.managementNetwork.value,
            storageNetwork: dom.storageNetwork.value,
            tenantNetwork: dom.tenantNetwork.value,
            backupNetwork: dom.backupNetwork.value,
            networkNotes: dom.networkNotes.value,
            proxmox: dom.proxmox.checked,
            horizon: dom.horizon.checked,
            synologyDsm: dom.synologyDsm.checked,
            zabbix: dom.zabbix.checked,
            syslog: dom.syslog.checked,
            outOfBand: dom.outOfBand.checked,
            snapshots: dom.snapshots.checked,
            offsiteBackup: dom.offsiteBackup.checked,
            disasterRecovery: dom.disasterRecovery.checked,
            redundantPower: dom.redundantPower.checked,
            cooling: dom.cooling.checked,
            physicalSecurity: dom.physicalSecurity.checked
        };
    }

    function syncControls(controls) {
        const next = controls || core.getPreset(state.presetId).defaults;

        dom.rackCount.value = String(next.rackCount);
        dom.hypervisorCount.value = String(next.hypervisorCount);
        dom.platform.value = next.platform;
        dom.storageModel.value = next.storageModel;
        dom.networkMode.value = next.networkMode;
        dom.serverModel.value = next.serverModel;
        dom.storagePlatform.value = next.storagePlatform;
        dom.mgmtTool.value = next.managementTool;
        dom.managementNetwork.value = next.managementNetwork;
        dom.storageNetwork.value = next.storageNetwork;
        dom.tenantNetwork.value = next.tenantNetwork;
        dom.backupNetwork.value = next.backupNetwork;
        dom.networkNotes.value = next.networkNotes;
        dom.proxmox.checked = Boolean(next.proxmox);
        dom.horizon.checked = Boolean(next.horizon);
        dom.synologyDsm.checked = Boolean(next.synologyDsm);
        dom.zabbix.checked = Boolean(next.zabbix);
        dom.syslog.checked = Boolean(next.syslog);
        dom.outOfBand.checked = Boolean(next.outOfBand);
        dom.snapshots.checked = Boolean(next.snapshots);
        dom.offsiteBackup.checked = Boolean(next.offsiteBackup);
        dom.disasterRecovery.checked = Boolean(next.disasterRecovery);
        dom.redundantPower.checked = Boolean(next.redundantPower);
        dom.cooling.checked = Boolean(next.cooling);
        dom.physicalSecurity.checked = Boolean(next.physicalSecurity);
        syncEnhancedSelects();
    }

    function buildModelFromState() {
        state.prompt = dom.prompt.value.trim();
        state.controls = collectControls();
        state.model = core.buildModel({
            prompt: state.prompt,
            presetId: state.presetId,
            controls: state.controls
        });

        return state.model;
    }

    function pushUndoSnapshot() {
        state.undoStack.push(JSON.stringify({
            layoutOverrides: state.layoutOverrides,
            connectorOverrides: state.connectorOverrides
        }));

        if (state.undoStack.length > 30) {
            state.undoStack.shift();
        }

        updateUndoButton();
    }

    function updateUndoButton() {
        if (!dom.undoStageEdit) {
            return;
        }

        dom.undoStageEdit.disabled = state.undoStack.length === 0;
        dom.undoStageEdit.setAttribute('aria-disabled', dom.undoStageEdit.disabled ? 'true' : 'false');
    }

    function applyPreset(presetId, shouldGenerate) {
        const preset = core.getPreset(presetId);

        state.presetId = preset.id;
        dom.preset.value = preset.id;
        dom.prompt.value = preset.prompt;
        state.controls = preset.defaults;
        syncControls(preset.defaults);
        state.layoutOverrides = {};
        state.connectorOverrides = {};
        state.selectedIds = [];
        state.selectedConnectorId = '';
        state.stageHighlighted = false;
        state.undoStack = [];
        updateUndoButton();
        if (dom.presetDescription) {
            dom.presetDescription.textContent = preset.description;
        }

        if (shouldGenerate) {
            generateArchitecture();
        } else {
            state.model = core.buildModel({
                prompt: preset.prompt,
                presetId: preset.id,
                controls: preset.defaults
            });
            renderAll();
        }
    }

    function generateArchitecture() {
        clearError();

        if (!dom.prompt.value.trim()) {
            showError('Enter a physical server architecture prompt before generating.');
            return;
        }

        state.generated = true;
        state.selectedIds = [];
        state.selectedConnectorId = '';
        state.connectorOverrides = {};
        state.stageHighlighted = false;
        buildModelFromState();
        fitGeneratedDiagramToView();
        renderAll();
    }

    function setOutputVisible(visible) {
        if (!dom.outputEmpty || !dom.outputContent) {
            return;
        }

        dom.outputEmpty.classList.toggle('d-none', visible);
        dom.outputContent.classList.toggle('d-none', !visible);
    }

    function cloneRect(item) {
        return {
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height
        };
    }

    function applyOverride(item) {
        const override = state.layoutOverrides[item.id] || {};
        const next = Object.assign({}, item);

        if (Number.isFinite(Number(override.x))) {
            next.x = Number(override.x);
        }

        if (Number.isFinite(Number(override.y))) {
            next.y = Number(override.y);
        }

        if (Number.isFinite(Number(override.width))) {
            next.width = Math.max(80, Number(override.width));
        }

        if (Number.isFinite(Number(override.height))) {
            next.height = Math.max(48, Number(override.height));
        }

        return next;
    }

    function registerItem(item) {
        itemRegistry.set(item.id, cloneRect(item));

        if (item.parent) {
            if (!childRegistry.has(item.parent)) {
                childRegistry.set(item.parent, []);
            }

            childRegistry.get(item.parent).push(item.id);
        }
    }

    function buildDiagramItems(model) {
        itemRegistry.clear();
        childRegistry.clear();

        const controls = model.controls;
        const groups = [
            { id: 'compute-layer', title: 'Compute Layer (Hypervisor Cluster)', x: 30, y: 190, width: 930, height: 250, kind: 'group' },
            { id: 'virtualization-layer', title: 'Virtualization Platform', x: 30, y: 470, width: 930, height: 96, kind: 'group' },
            { id: 'storage-layer', title: 'Shared Storage Layer', x: 30, y: 595, width: 930, height: 150, kind: 'group' },
            { id: 'network-layer', title: 'Network Layer', x: 30, y: 775, width: 930, height: 126, kind: 'group' },
            { id: 'foundation-layer', title: 'Physical Infrastructure Foundation', x: 30, y: 930, width: 930, height: 124, kind: 'group' },
            { id: 'operations-panel', title: 'Management & Operations', x: 990, y: 45, width: 300, height: 395, kind: 'group' },
            { id: 'backup-panel', title: 'Backup & Disaster Recovery', x: 990, y: 470, width: 300, height: 270, kind: 'group' }
        ].map(applyOverride);
        const topNodes = [
            {
                id: 'users',
                title: 'Users / Clients',
                subtitle: 'Admin, tenant, app access',
                icon: 'users',
                x: 55,
                y: 70,
                width: 190,
                height: 82,
                details: ['North-south traffic']
            },
            {
                id: 'router-gateway',
                title: 'Router / Gateway',
                subtitle: 'Edge routing / NAT',
                icon: 'router',
                x: 300,
                y: 70,
                width: 210,
                height: 82,
                details: ['Upstream network']
            },
            {
                id: 'firewall',
                title: 'Firewall',
                subtitle: 'Network security',
                icon: 'firewall',
                x: 555,
                y: 70,
                width: 195,
                height: 82,
                details: ['Zone policy']
            },
            {
                id: 'core-switch',
                title: 'Core / Access Switch',
                subtitle: core.networkModeLabel(controls.networkMode),
                icon: 'switch',
                x: 790,
                y: 70,
                width: 190,
                height: 82,
                details: ['L2 / L3 switching']
            }
        ];
        const hypervisorNodes = [];
        const hypervisorDisplayCount = Math.min(controls.hypervisorCount, 4);
        const hypervisorGap = 40;
        const slotWidth = (850 - ((hypervisorDisplayCount - 1) * hypervisorGap)) / hypervisorDisplayCount;

        for (let index = 0; index < hypervisorDisplayCount; index += 1) {
            const labelNumber = controls.hypervisorCount > 4 && index === hypervisorDisplayCount - 1 ? controls.hypervisorCount : index + 1;

            hypervisorNodes.push({
                id: 'hypervisor-node-' + labelNumber,
                title: 'Hypervisor Node ' + labelNumber,
                subtitle: controls.serverModel,
                icon: 'server',
                parent: 'compute-layer',
                x: 70 + (index * (slotWidth + hypervisorGap)),
                y: 260,
                width: slotWidth,
                height: 155,
                details: ['CPU', 'RAM', 'NIC', 'Local RAID / SSD']
            });
        }

        const virtualNodes = [
            {
                id: 'virtualization-platform',
                title: core.platformLabel(controls.platform),
                subtitle: controls.managementTool,
                icon: 'virtualization',
                parent: 'virtualization-layer',
                x: 100,
                y: 512,
                width: 820,
                height: 50,
                details: ['Compute', 'Network', 'Identity', 'Images', 'Block storage']
            }
        ];
        const storageNodes = [
            {
                id: 'storage-cluster',
                title: controls.storagePlatform,
                subtitle: core.storageModelLabel(controls.storageModel),
                icon: 'storage',
                parent: 'storage-layer',
                x: 60,
                y: 638,
                width: 255,
                height: 82,
                details: ['HA / capacity pool']
            },
            {
                id: 'storage-iscsi',
                title: 'iSCSI LUNs',
                subtitle: 'Block storage',
                icon: 'storage',
                parent: 'storage-layer',
                x: 335,
                y: 638,
                width: 150,
                height: 82,
                details: ['VM disks']
            },
            {
                id: 'storage-nfs',
                title: 'NFS Shares',
                subtitle: 'File storage',
                icon: 'storage',
                parent: 'storage-layer',
                x: 505,
                y: 638,
                width: 150,
                height: 82,
                details: ['Templates / ISO']
            },
            {
                id: 'storage-snapshots',
                title: 'Snapshots',
                subtitle: 'Backup / DR',
                icon: 'backup',
                parent: 'storage-layer',
                x: 675,
                y: 638,
                width: 155,
                height: 82,
                details: ['Point-in-time']
            },
            {
                id: 'storage-raid',
                title: controls.storageModel === 'local-raid' ? 'Local RAID' : 'RAID 10/6',
                subtitle: 'Data protection',
                icon: 'storage',
                parent: 'storage-layer',
                x: 850,
                y: 638,
                width: 100,
                height: 82,
                details: ['Policy']
            }
        ];
        const networkNodes = [
            {
                id: 'management-network',
                title: 'Management Network',
                subtitle: controls.managementNetwork,
                icon: 'management',
                parent: 'network-layer',
                x: 65,
                y: 820,
                width: 205,
                height: 68,
                details: ['Server mgmt / IPMI']
            },
            {
                id: 'storage-network',
                title: 'Storage Network',
                subtitle: controls.storageNetwork,
                icon: 'network',
                parent: 'network-layer',
                x: 290,
                y: 820,
                width: 205,
                height: 68,
                details: ['iSCSI / NFS']
            },
            {
                id: 'tenant-network',
                title: 'Tenant / VM Network',
                subtitle: controls.tenantNetwork,
                icon: 'network',
                parent: 'network-layer',
                x: 515,
                y: 820,
                width: 205,
                height: 68,
                details: ['VM traffic']
            },
            {
                id: 'backup-network',
                title: 'Backup Network',
                subtitle: controls.backupNetwork,
                icon: 'backup',
                parent: 'network-layer',
                x: 740,
                y: 820,
                width: 205,
                height: 68,
                details: ['Replication']
            }
        ];
        const foundationNodes = [
            {
                id: 'rack-cabling',
                title: 'Rack & Cabling',
                subtitle: controls.rackCount + ' rack' + (controls.rackCount === 1 ? '' : 's'),
                icon: 'rack',
                parent: 'foundation-layer',
                x: 70,
                y: 974,
                width: 205,
                height: 64,
                details: ['Structured cabling']
            },
            {
                id: 'power',
                title: 'Power',
                subtitle: controls.redundantPower ? 'UPS / PDU A+B' : 'Single path review',
                icon: 'power',
                parent: 'foundation-layer',
                x: 295,
                y: 974,
                width: 205,
                height: 64,
                details: ['Load planning']
            },
            {
                id: 'cooling',
                title: 'Cooling',
                subtitle: controls.cooling ? 'CRAC / hot-cold aisle' : 'Cooling review',
                icon: 'cooling',
                parent: 'foundation-layer',
                x: 520,
                y: 974,
                width: 205,
                height: 64,
                details: ['Thermal path']
            },
            {
                id: 'physical-security',
                title: 'Physical Security',
                subtitle: controls.physicalSecurity ? 'Locked rack / access control' : 'Access review',
                icon: 'security',
                parent: 'foundation-layer',
                x: 745,
                y: 974,
                width: 205,
                height: 64,
                details: ['Access control']
            }
        ];
        const operationNodes = [
            controls.proxmox ? ['operations-proxmox', 'Proxmox VE', 'Hypervisor management', 'virtualization'] : null,
            controls.horizon ? ['operations-horizon', 'OpenStack Horizon', 'Cloud dashboard', 'virtualization'] : null,
            controls.synologyDsm ? ['operations-synology', 'Synology DSM', 'Storage management', 'storage'] : null,
            controls.zabbix ? ['operations-zabbix', 'Zabbix', 'Metrics and alerts', 'management'] : null,
            controls.syslog ? ['operations-syslog', 'Syslog Server', 'Central log collection', 'management'] : null
        ].filter(Boolean).map(function (entry, index) {
            return {
                id: entry[0],
                title: entry[1],
                subtitle: entry[2],
                icon: entry[3],
                parent: 'operations-panel',
                x: 1015,
                y: 92 + (index * 62),
                width: 245,
                height: 58,
                details: ['Operations']
            };
        });
        const backupNodes = [
            controls.snapshots ? ['backup-snapshots', 'Snapshot Replication', 'Scheduled snapshots', 'backup'] : null,
            controls.offsiteBackup ? ['backup-offsite', 'Offsite Backup', 'DR copy / archive', 'backup'] : null,
            controls.disasterRecovery ? ['backup-dr', 'Disaster Recovery Plan', 'RPO / RTO runbooks', 'security'] : null
        ].filter(Boolean).map(function (entry, index) {
            return {
                id: entry[0],
                title: entry[1],
                subtitle: entry[2],
                icon: entry[3],
                parent: 'backup-panel',
                x: 1015,
                y: 520 + (index * 66),
                width: 245,
                height: 60,
                details: ['Backup / DR']
            };
        });
        const nodes = topNodes.concat(hypervisorNodes, virtualNodes, storageNodes, networkNodes, foundationNodes, operationNodes, backupNodes).map(applyOverride);

        groups.concat(nodes).forEach(registerItem);

        return {
            width: 1340,
            height: 1070,
            groups,
            nodes,
            connectors: buildConnectors(nodes)
        };
    }

    function centerOf(item) {
        return {
            x: item.x + (item.width / 2),
            y: item.y + (item.height / 2)
        };
    }

    function anchorOf(item, side) {
        if (side === 'left') {
            return { x: item.x, y: item.y + (item.height / 2) };
        }

        if (side === 'right') {
            return { x: item.x + item.width, y: item.y + (item.height / 2) };
        }

        if (side === 'top') {
            return { x: item.x + (item.width / 2), y: item.y };
        }

        if (side === 'bottom') {
            return { x: item.x + (item.width / 2), y: item.y + item.height };
        }

        return centerOf(item);
    }

    function findNode(nodes, id) {
        return nodes.find(function (node) {
            return node.id === id;
        });
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, Number(value) || 0));
    }

    function sanitizeConnectorOverrides(value) {
        const result = {};

        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return result;
        }

        Object.keys(value).forEach(function (key) {
            const override = value[key];

            if (!override || typeof override !== 'object') {
                return;
            }

            if (Number.isFinite(Number(override.x))) {
                result[key] = { x: Math.round(Number(override.x)) };
                return;
            }

            if (Number.isFinite(Number(override.y))) {
                result[key] = { y: Math.round(Number(override.y)) };
            }
        });

        return result;
    }

    function applyConnectorOverride(id, points) {
        const override = id ? state.connectorOverrides[id] : null;
        const adjusted = points.map(function (point) {
            return { x: point.x, y: point.y };
        });

        if (!override || adjusted.length < 4) {
            return adjusted;
        }

        const firstLegVertical = Math.abs(adjusted[1].x - adjusted[0].x) < 1;

        if (firstLegVertical && Number.isFinite(Number(override.y))) {
            const y = Math.round(Number(override.y));

            adjusted[1].y = y;
            adjusted[2].y = y;
        } else if (!firstLegVertical && Number.isFinite(Number(override.x))) {
            const x = Math.round(Number(override.x));

            adjusted[1].x = x;
            adjusted[2].x = x;
        }

        return adjusted;
    }

    function connectorHandlePoint(points) {
        if (points.length >= 4) {
            return {
                x: (points[1].x + points[2].x) / 2,
                y: (points[1].y + points[2].y) / 2
            };
        }

        if (points.length >= 2) {
            return {
                x: (points[0].x + points[1].x) / 2,
                y: (points[0].y + points[1].y) / 2
            };
        }

        return points[0] || { x: 0, y: 0 };
    }

    function connectorBendOrientation(points) {
        if (points.length < 4) {
            return '';
        }

        return Math.abs(points[1].x - points[0].x) < 1 ? 'horizontal-lane' : 'vertical-lane';
    }

    function pathBetween(from, to, variant, fromSide, toSide, id) {
        const start = anchorOf(from, fromSide);
        const end = anchorOf(to, toSide);
        const horizontal = fromSide === 'left' || fromSide === 'right' || toSide === 'left' || toSide === 'right';
        const midX = start.x + ((end.x - start.x) / 2);
        const midY = start.y + ((end.y - start.y) / 2);

        if (Math.abs(start.y - end.y) < 6 || Math.abs(start.x - end.x) < 6) {
            return pathFromPoints([start, end], variant, id);
        }

        return pathFromPoints(
            horizontal
                ? [
                    start,
                    { x: midX, y: start.y },
                    { x: midX, y: end.y },
                    end
                ]
                : [
                    start,
                    { x: start.x, y: midY },
                    { x: end.x, y: midY },
                    end
                ],
            variant,
            id
        );
    }

    function pathFromPoints(points, variant, id) {
        const adjustedPoints = applyConnectorOverride(id, points);
        const path = adjustedPoints.map(function (point, index) {
            const command = index === 0 ? 'M' : 'L';

            return command + ' ' + point.x + ' ' + point.y;
        }).join(' ');

        return {
            id: id || '',
            path,
            points: adjustedPoints,
            handle: connectorHandlePoint(adjustedPoints),
            orientation: connectorBendOrientation(adjustedPoints),
            variant: variant || 'traffic'
        };
    }

    function buildConnectors(nodes) {
        const users = findNode(nodes, 'users');
        const router = findNode(nodes, 'router-gateway');
        const firewall = findNode(nodes, 'firewall');
        const sw = findNode(nodes, 'core-switch');
        const virtualPlatform = findNode(nodes, 'virtualization-platform');
        const storage = findNode(nodes, 'storage-cluster');
        const management = findNode(nodes, 'management-network');
        const storageNetwork = findNode(nodes, 'storage-network');
        const tenant = findNode(nodes, 'tenant-network');
        const backup = findNode(nodes, 'backup-network');
        const connectors = [];
        connectorRegistry.clear();

        [
            [users, router, 'traffic', 'users-to-router-gateway'],
            [router, firewall, 'traffic', 'router-gateway-to-firewall'],
            [firewall, sw, 'traffic', 'firewall-to-core-switch']
        ].forEach(function (pair) {
            connectors.push(pathBetween(pair[0], pair[1], pair[2], 'right', 'left', pair[3]));
        });

        nodes.filter(function (node) {
            return node.id.indexOf('hypervisor-node-') === 0;
        }).forEach(function (node) {
            const switchAnchor = anchorOf(sw, 'bottom');
            const nodeAnchor = anchorOf(node, 'top');
            const computeLaneY = Math.min(nodeAnchor.y - 14, 246);

            connectors.push(pathFromPoints([
                switchAnchor,
                { x: switchAnchor.x, y: computeLaneY },
                { x: nodeAnchor.x, y: computeLaneY },
                nodeAnchor
            ], 'traffic', 'core-switch-to-' + node.id));
            connectors.push(pathBetween(node, virtualPlatform, 'traffic', 'bottom', 'top', node.id + '-to-virtualization-platform'));
            connectors.push(pathBetween(storage, node, 'storage', 'top', 'bottom', 'storage-cluster-to-' + node.id));
        });

        [management, storageNetwork, tenant, backup].forEach(function (networkNode) {
            connectors.push(pathBetween(
                virtualPlatform,
                networkNode,
                networkNode.id === 'backup-network' ? 'backup' : 'traffic',
                'bottom',
                'top',
                'virtualization-platform-to-' + networkNode.id
            ));
        });

        connectors.forEach(function (connector) {
            if (connector.id) {
                connectorRegistry.set(connector.id, connector);
            }
        });

        return connectors;
    }

    function renderGroup(item) {
        const selected = state.selectedIds.includes(item.id) ? ' is-selected' : '';
        const highlighted = item.highlighted || state.stageHighlighted ? ' is-highlighted' : '';
        const dragging = isActiveStageItem(item.id, 'drag') ? ' is-dragging' : '';
        const resizing = isActiveStageItem(item.id, 'resize') ? ' is-resizing' : '';

        return [
            '<g class="architecture-physical-server-diagram-item architecture-physical-server-diagram-group' + selected + highlighted + dragging + resizing + '" data-item-id="' + escapeHtml(item.id) + '" data-item-kind="group">',
            renderSelectionRing(item, 22),
            '<rect class="architecture-physical-server-boundary" x="' + item.x + '" y="' + item.y + '" width="' + item.width + '" height="' + item.height + '" rx="18"></rect>',
            '<text class="architecture-physical-server-boundary-title" x="' + (item.x + (item.width / 2)) + '" y="' + (item.y + 24) + '" text-anchor="middle">' + escapeHtml(item.title) + '</text>',
            '<rect class="architecture-physical-server-diagram-hitbox" x="' + item.x + '" y="' + item.y + '" width="' + item.width + '" height="' + item.height + '" rx="18"></rect>',
            '<rect class="architecture-physical-server-resize-handle" data-resize-id="' + escapeHtml(item.id) + '" x="' + (item.x + item.width - 12) + '" y="' + (item.y + item.height - 12) + '" width="10" height="10" rx="2"></rect>',
            '</g>'
        ].join('');
    }

    function renderTextLines(lines, x, startY, className, maxLines, lineHeight) {
        const step = lineHeight || 17;

        return lines.slice(0, maxLines || lines.length).map(function (line, index) {
            return '<text class="' + className + '" x="' + x + '" y="' + (startY + (index * step)) + '">' + escapeHtml(line) + '</text>';
        }).join('');
    }

    function wrapSvgLines(value, maxChars, maxLines) {
        const text = String(value || '').replace(/\s+/g, ' ').trim();
        const limit = Math.max(8, Number(maxChars) || 18);
        const lineLimit = Math.max(1, Number(maxLines) || 1);
        const words = text.split(' ').filter(Boolean);
        const lines = [];
        let currentLine = '';

        words.forEach(function (word) {
            const nextLine = currentLine === '' ? word : currentLine + ' ' + word;

            if (nextLine.length <= limit || currentLine === '') {
                currentLine = nextLine;
                return;
            }

            lines.push(currentLine);
            currentLine = word;
        });

        if (currentLine !== '') {
            lines.push(currentLine);
        }

        return lines.slice(0, lineLimit);
    }

    function renderNode(item) {
        const selected = state.selectedIds.includes(item.id) ? ' is-selected' : '';
        const highlighted = item.highlighted || state.stageHighlighted ? ' is-highlighted' : '';
        const dragging = isActiveStageItem(item.id, 'drag') ? ' is-dragging' : '';
        const resizing = isActiveStageItem(item.id, 'resize') ? ' is-resizing' : '';
        const iconSize = item.height < 58 ? 26 : 34;
        const titleX = item.x + iconSize + 28;
        const titleY = item.y + (item.height < 66 ? 22 : 25);
        const details = item.details || [];
        const copyWidth = Math.max(60, item.width - iconSize - 46);
        const titleLines = wrapSvgLines(item.title, Math.floor(copyWidth / 6.7), item.height < 68 ? 1 : 2);
        const subtitleLines = wrapSvgLines(item.subtitle, Math.floor(copyWidth / 6.3), item.height < 54 ? 1 : 2);
        const subtitleY = titleY + (titleLines.length * 15) + 2;
        const maxDetails = item.height < 118 ? 0 : 3;

        return [
            '<g class="architecture-physical-server-diagram-item architecture-physical-server-node-shell' + selected + highlighted + dragging + resizing + '" data-item-id="' + escapeHtml(item.id) + '" data-item-kind="node">',
            renderSelectionRing(item, 20),
            '<rect class="architecture-physical-server-node-card" x="' + item.x + '" y="' + item.y + '" width="' + item.width + '" height="' + item.height + '" rx="16"></rect>',
            '<rect class="architecture-physical-server-icon-box" x="' + (item.x + 14) + '" y="' + (item.y + 16) + '" width="' + iconSize + '" height="' + iconSize + '" rx="9"></rect>',
            '<image href="' + iconHref(item.icon) + '" x="' + (item.x + 20) + '" y="' + (item.y + 22) + '" width="' + (iconSize - 12) + '" height="' + (iconSize - 12) + '"></image>',
            renderTextLines(titleLines, titleX, titleY, 'architecture-physical-server-node-title', titleLines.length, 15),
            renderTextLines(subtitleLines, titleX, subtitleY, 'architecture-physical-server-node-subtitle', subtitleLines.length, 14),
            maxDetails ? renderTextLines(details, item.x + 16, item.y + item.height - 20 - ((Math.min(details.length, maxDetails) - 1) * 17), 'architecture-physical-server-node-detail', maxDetails) : '',
            '<rect class="architecture-physical-server-diagram-hitbox" x="' + item.x + '" y="' + item.y + '" width="' + item.width + '" height="' + item.height + '" rx="16"></rect>',
            '<rect class="architecture-physical-server-resize-handle" data-resize-id="' + escapeHtml(item.id) + '" x="' + (item.x + item.width - 12) + '" y="' + (item.y + item.height - 12) + '" width="10" height="10" rx="2"></rect>',
            '</g>'
        ].join('');
    }

    function renderSelectionRing(item, cornerRadius) {
        const padding = 10;

        return [
            '<rect class="architecture-physical-server-selection-ring"',
            ' x="' + (item.x - padding) + '"',
            ' y="' + (item.y - padding) + '"',
            ' width="' + (item.width + (padding * 2)) + '"',
            ' height="' + (item.height + (padding * 2)) + '"',
            ' rx="' + cornerRadius + '"></rect>'
        ].join('');
    }

    function renderConnector(connector) {
        const selected = connector.id && state.selectedConnectorId === connector.id ? ' is-selected' : '';
        const className = connector.variant === 'storage'
            ? 'architecture-physical-server-connector architecture-physical-server-connector-storage'
            : (connector.variant === 'backup'
                ? 'architecture-physical-server-connector architecture-physical-server-connector-backup'
                : 'architecture-physical-server-connector');

        return [
            '<path class="architecture-physical-server-connector-hit-target" data-connector-id="' + escapeHtml(connector.id) + '" d="' + connector.path + '"></path>',
            '<path class="' + className + selected + '" data-connector-id="' + escapeHtml(connector.id) + '" d="' + connector.path + '" marker-end="url(#architecturePhysicalServerArrow)"></path>'
        ].join('');
    }

    function renderConnectorHandle(connector) {
        if (!connector.id || state.selectedConnectorId !== connector.id || !connector.orientation) {
            return '';
        }

        return [
            '<circle class="architecture-physical-server-connector-bend-handle"',
            ' data-connector-handle-id="' + escapeHtml(connector.id) + '"',
            ' cx="' + connector.handle.x + '"',
            ' cy="' + connector.handle.y + '"',
            ' r="9"></circle>'
        ].join('');
    }

    function serializeCurrentSvg() {
        const svg = dom.stageCanvas.querySelector('svg');

        if (!svg) {
            currentSvgMarkup = '';
            return '';
        }

        currentSvgMarkup = new XMLSerializer().serializeToString(svg);
        return currentSvgMarkup;
    }

    function renderDiagram(model, preview) {
        const diagram = buildDiagramItems(model);
        const allGroups = diagram.groups.map(renderGroup).join('');
        const allConnectors = diagram.connectors.map(renderConnector).join('');
        const allNodes = diagram.nodes.map(renderNode).join('');
        const connectorHandles = diagram.connectors.map(renderConnectorHandle).join('');
        const overlay = preview ? [
            '<div class="architecture-physical-server-stage-preview-overlay" role="status">',
            '<div class="architecture-physical-server-stage-preview-panel">',
            '<span class="architecture-physical-server-stage-preview-icon"><i class="bi bi-stars" aria-hidden="true"></i></span>',
            '<strong>Choose a preset to generate diagram</strong>',
            '<span>Pick a preset or click Generate Diagram to create the editable workspace.</span>',
            '</div>',
            '</div>'
        ].join('') : '';

        dom.stageCanvas.classList.toggle('architecture-physical-server-stage-preview', Boolean(preview));
        const scaledWidth = Math.ceil(diagram.width * state.zoom);
        const scaledHeight = Math.ceil(diagram.height * state.zoom);

        dom.stageCanvas.style.width = '100%';
        dom.stageCanvas.style.height = Math.max(620, scaledHeight + 48) + 'px';
        dom.stageCanvas.innerHTML = [
            '<svg class="architecture-physical-server-diagram" xmlns="http://www.w3.org/2000/svg" width="' + scaledWidth + '" height="' + scaledHeight + '" viewBox="0 0 ' + diagram.width + ' ' + diagram.height + '">',
            '<defs>',
            '<marker id="architecturePhysicalServerArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L9,4.5 L0,9 z" fill="#111827"></path></marker>',
            '</defs>',
            '<rect class="architecture-physical-server-diagram-background" x="0" y="0" width="' + diagram.width + '" height="' + diagram.height + '" fill="transparent"></rect>',
            allGroups,
            allConnectors,
            allNodes,
            connectorHandles,
            '</svg>',
            overlay
        ].join('');
        serializeCurrentSvg();
        bindStageEvents();
    }

    function renderStageMeta(model) {
        dom.stageTitle.textContent = model.title;
        dom.stageSubtitle.innerHTML = '<span class="architecture-physical-server-stage-preset-chip">' + escapeHtml(model.presetLabel) + ' preset</span>';
        dom.stageMeta.innerHTML = model.stageMeta.map(function (item) {
            return [
                '<span class="architecture-physical-server-score-tag architecture-physical-server-score-tag-' + escapeHtml(item.tone) + '">',
                '<i class="' + escapeHtml(item.icon) + '" aria-hidden="true"></i>',
                escapeHtml(item.label),
                '</span>'
            ].join('');
        }).join('');
    }

    function setSortMode(sortMode) {
        const labels = {
            id: 'ID',
            alphabetical: 'A-Z',
            component: 'Component',
            placement: 'Placement',
            purpose: 'Purpose'
        };

        state.sortMode = labels[sortMode] ? sortMode : 'id';

        if (dom.sort) {
            dom.sort.value = state.sortMode;
        }

        if (dom.inventorySortSummary) {
            dom.inventorySortSummary.textContent = labels[state.sortMode];
        }

        if (dom.sortOptions) {
            dom.sortOptions.forEach(function (button) {
                const active = button.getAttribute('data-sort-value') === state.sortMode;

                button.classList.toggle('is-active', active);
                button.setAttribute('aria-pressed', String(active));
            });
        }

        if (dom.inventorySortSelect) {
            setSortMenuOpen(false);
        }
    }

    function setSortMenuOpen(open) {
        if (!dom.inventorySortSelect || !dom.inventorySortMenu) {
            return;
        }

        if (dom.inventorySortSelect.tagName === 'DETAILS') {
            const summary = dom.inventorySortSelect.querySelector('summary');

            dom.inventorySortSelect.toggleAttribute('open', Boolean(open));
            if (summary) {
                summary.setAttribute('aria-expanded', String(Boolean(open)));
            }
            return;
        }

        dom.inventorySortSelect.setAttribute('aria-expanded', String(Boolean(open)));
        dom.inventorySortMenu.hidden = !open;
    }

    function sortedInventory(model) {
        const rows = model.inventory.slice();
        const fieldMap = {
            alphabetical: 'component',
            component: 'component',
            placement: 'placement',
            purpose: 'purpose'
        };
        const field = fieldMap[state.sortMode];

        if (!field) {
            return rows.sort(function (a, b) {
                return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
            });
        }

        return rows.sort(function (a, b) {
            return String(a[field]).localeCompare(String(b[field]));
        });
    }

    function getInventoryColumnValue(row, fallbackIndex, column) {
        if (column === 'index') {
            return row.id || fallbackIndex + 1;
        }

        if (column === 'component') {
            return row.component || '';
        }

        if (column === 'placement') {
            return row.placement || '';
        }

        if (column === 'purpose') {
            return row.purpose || '';
        }

        return '';
    }

    function buildInventoryRowText(row, fallbackIndex) {
        return ['index', 'component', 'placement', 'purpose'].map(function (column) {
            return inventoryColumnLabels[column] + ': ' + getInventoryColumnValue(row, fallbackIndex, column);
        }).join('\n');
    }

    function buildInventoryCopyText(rowIndex) {
        if (!state.model || !Array.isArray(state.model.inventory)) {
            return '';
        }

        const rows = sortedInventory(state.model);
        const row = rows[rowIndex];

        if (!row) {
            return '';
        }

        return buildInventoryRowText(row, rowIndex);
    }

    function flashInventoryCopyButton(button) {
        button.classList.add('copied');
        button.setAttribute('title', 'Copied');

        window.setTimeout(function () {
            button.classList.remove('copied');
            button.setAttribute('title', button.dataset.copyTitle || 'Copy row');
        }, 1400);
    }

    async function copyInventoryRow(rowIndex, button) {
        const normalizedRowIndex = Number.parseInt(rowIndex, 10);

        if (!Number.isInteger(normalizedRowIndex) || normalizedRowIndex < 0) {
            return;
        }

        const copyText = buildInventoryCopyText(normalizedRowIndex);

        if (copyText === '') {
            return;
        }

        if (await writeClipboardText(copyText)) {
            flashInventoryCopyButton(button);
            return;
        }

        showError('Failed to copy the inventory row to the clipboard.');
    }

    function renderInventory(model) {
        dom.inventoryTableBody.innerHTML = sortedInventory(model).map(function (row, index) {
            return [
                '<tr>',
                '<td>' + escapeHtml(row.id) + '</td>',
                '<td>' + escapeHtml(row.component) + '</td>',
                '<td>' + escapeHtml(row.placement) + '</td>',
                '<td>' + escapeHtml(row.purpose) + '</td>',
                '<td class="architecture-physical-server-table-action-cell">',
                '<button type="button" class="architecture-physical-server-row-copy" data-inventory-copy-row="' + escapeHtml(index) + '" aria-label="Copy inventory row ' + escapeHtml(row.id || index + 1) + '" title="Copy inventory row">',
                '<i class="bi bi-clipboard" aria-hidden="true"></i>',
                '</button>',
                '</td>',
                '</tr>'
            ].join('');
        }).join('');
        dom.routingTableBody.innerHTML = model.routeRows.map(function (row) {
            return '<tr><th scope="row">' + escapeHtml(row[0]) + '</th><td>' + escapeHtml(row[1]) + '</td></tr>';
        }).join('');
        dom.controlTableBody.innerHTML = model.controlRows.map(function (row) {
            return '<tr><th scope="row">' + escapeHtml(row[0]) + '</th><td>' + escapeHtml(row[1]) + '</td></tr>';
        }).join('');
    }

    function renderList(element, rows, fallback) {
        const values = rows && rows.length ? rows : [fallback || 'No notes generated.'];

        element.innerHTML = values.map(function (row) {
            return '<li>' + escapeHtml(row) + '</li>';
        }).join('');
    }

    function renderNotes(model) {
        dom.promptSummary.textContent = model.promptSummary;
        renderList(dom.keywordList, model.matchedKeywords, 'No explicit infrastructure keywords detected.');
        renderList(dom.assumptionList, model.assumptions, 'No parser assumptions were needed beyond current controls.');
        renderList(dom.modelList, model.modelList, 'Model details unavailable.');
        renderList(dom.prosList, model.pros, 'No generated strengths.');
        renderList(dom.consList, model.cons, 'Review physical and operational details before implementation.');
    }

    function renderPillars(model) {
        dom.pillarBreakdown.innerHTML = [
            '<h3 class="architecture-physical-server-result-section-title">Pillar Breakdown</h3>',
            '<div class="architecture-physical-server-pillar-list">',
            model.pillars.map(function (pillar) {
                return [
                    '<div class="architecture-physical-server-pillar-row architecture-physical-server-pillar-row-' + escapeHtml(pillar.tone) + '">',
                    '<span class="architecture-physical-server-pillar-icon"><i class="' + escapeHtml(pillar.icon) + '" aria-hidden="true"></i></span>',
                    '<span class="architecture-physical-server-pillar-name">' + escapeHtml(pillar.label) + '</span>',
                    '<span class="architecture-physical-server-pillar-meter" aria-hidden="true"><span style="--pillar-score: ' + escapeHtml(String(pillar.score)) + '%;"></span></span>',
                    '<span class="architecture-physical-server-pillar-score"><strong>' + escapeHtml(String(pillar.score)) + '</strong> /100</span>',
                    '</div>'
                ].join('');
            }).join(''),
            '</div>'
        ].join('');
    }

    function renderRisk(model) {
        const risk = model.risk;

        dom.riskLevel.className = 'architecture-physical-server-assessment-card architecture-physical-server-risk-card architecture-physical-server-risk-card-' + risk.tone;
        dom.riskLevel.innerHTML = [
            '<h3 class="architecture-physical-server-result-section-title">Risk Level</h3>',
            '<div class="architecture-physical-server-risk-body">',
            '<div class="architecture-physical-server-risk-icon"><i class="' + escapeHtml(risk.icon) + '" aria-hidden="true"></i></div>',
            '<div class="architecture-physical-server-risk-copy">',
            '<div class="architecture-physical-server-risk-level">' + escapeHtml(risk.level) + '</div>',
            '<p>' + escapeHtml(risk.summary) + '</p>',
            '<ul>',
            risk.reviewPoints.map(function (point) {
                return '<li>' + escapeHtml(point) + '</li>';
            }).join(''),
            '</ul>',
            '</div>',
            '</div>'
        ].join('');
    }

    function getScoreTone(score) {
        if (score >= 86) {
            return 'strong';
        }

        if (score >= 70) {
            return 'review';
        }

        return 'incomplete';
    }

    function getScoreLabel(tone) {
        const labels = {
            strong: 'Strong planning model',
            review: 'Review-ready planning model',
            incomplete: 'Incomplete planning model'
        };

        return labels[tone] || labels.review;
    }

    function getScoreIcon(tone) {
        const icons = {
            strong: 'bi bi-check-circle-fill',
            review: 'bi bi-activity',
            incomplete: 'bi bi-exclamation-triangle-fill'
        };

        return icons[tone] || icons.review;
    }

    function getScoreRingTone(tone) {
        const tones = {
            strong: 'production',
            review: 'ready',
            incomplete: 'review'
        };

        return tones[tone] || tones.review;
    }

    function renderScore(model) {
        const score = Math.max(0, Math.min(100, Number(model.score) || 0));
        const tone = getScoreTone(score);
        const ringTone = getScoreRingTone(tone);
        const radius = 52;
        const circumference = 2 * Math.PI * radius;
        const trackLength = Math.round(circumference * 100) / 100;
        const ratio = score >= 100 ? 1 : score / 100;
        const progressAngle = Math.round(Math.max(0, Math.min(100, score)) * 3.6);
        const progressLength = score >= 100
            ? trackLength
            : Math.round(ratio * circumference * 100) / 100;
        const gapLength = score >= 100
            ? 0
            : Math.round((trackLength - progressLength) * 100) / 100;

        dom.outputStatus.className = 'architecture-physical-server-score-card';
        dom.outputStatus.innerHTML = [
            '<div class="architecture-physical-server-score-ring-card architecture-physical-server-score-ring-card-' + ringTone + '" tabindex="0" role="group" aria-label="Architecture score ' + score + ' out of 100. ' + escapeHtml(getScoreLabel(tone)) + '">',
            '<div class="architecture-physical-server-score-value" id="architecturePhysicalServerScoreValue" style="--progress-angle: ' + progressAngle + 'deg;" aria-label="Architecture score ' + score + ' out of 100">',
            '<div class="architecture-physical-server-score-echart" id="architecturePhysicalServerScoreEchart" aria-hidden="true"></div>',
            '<svg class="architecture-physical-server-score-ring" viewBox="0 0 140 140" aria-hidden="true" focusable="false">',
            '<circle class="architecture-physical-server-score-ring-track" cx="70" cy="70" r="' + radius + '"></circle>',
            '<circle class="architecture-physical-server-score-ring-glow" cx="70" cy="70" r="' + radius + '" transform="rotate(-90 70 70)" stroke-dasharray="' + progressLength + ' ' + gapLength + '"></circle>',
            '<circle class="architecture-physical-server-score-ring-fill" cx="70" cy="70" r="' + radius + '" transform="rotate(-90 70 70)" stroke-dasharray="' + progressLength + ' ' + gapLength + '"></circle>',
            '</svg>',
            '<div class="architecture-physical-server-score-center">',
            '<span class="architecture-physical-server-score-value-number">' + score + '</span>',
            '<span class="architecture-physical-server-score-caption">/100</span>',
            '</div>',
            '</div>',
            '<span class="architecture-physical-server-score-label">',
            '<span class="architecture-physical-server-score-label-orb" aria-hidden="true"><i class="' + getScoreIcon(tone) + '"></i></span>',
            '<span class="architecture-physical-server-score-label-text">' + escapeHtml(getScoreLabel(tone)) + '</span>',
            '</span>',
            '</div>',
            '<div class="architecture-physical-server-score-copy">',
            '<div class="architecture-physical-server-score-kicker">Architecture Score</div>',
            '<div class="architecture-physical-server-score-summary">' + escapeHtml(getScoreLabel(tone)) + '</div>',
            '<div class="architecture-physical-server-score-detail">Advisory score only. Review capacity, security, backup, power, cooling, and vendor limits before implementation.</div>',
            '<div class="architecture-physical-server-score-tags">',
            '<span class="architecture-physical-server-score-tag architecture-physical-server-score-tag-status architecture-physical-server-score-tag-status-' + ringTone + '"><i class="' + getScoreIcon(tone) + '" aria-hidden="true"></i><span>' + escapeHtml(getScoreLabel(tone)) + '</span></span>',
            '<span class="architecture-physical-server-score-tag architecture-physical-server-score-tag-neutral"><i class="bi bi-hdd-rack" aria-hidden="true"></i>' + escapeHtml(model.inventory.length) + ' components</span>',
            '<span class="architecture-physical-server-score-tag architecture-physical-server-score-tag-network"><i class="bi bi-diagram-3" aria-hidden="true"></i>' + escapeHtml(core.networkModeLabel(model.controls.networkMode)) + '</span>',
            '<span class="architecture-physical-server-score-tag architecture-physical-server-score-tag-storage"><i class="bi bi-database" aria-hidden="true"></i>' + escapeHtml(core.storageModelLabel(model.controls.storageModel)) + '</span>',
            '</div>',
            '</div>'
        ].join('');
    }

    function buildPayload() {
        state.currentPayload = core.buildExportPayload({
            prompt: state.prompt,
            presetId: state.presetId,
            controls: state.controls,
            layoutOverrides: state.layoutOverrides,
            selectedIds: state.selectedIds,
            zoom: state.zoom
        });
        state.currentPayload.connector_overrides = sanitizeConnectorOverrides(state.connectorOverrides);
        state.currentPayload.selected_connector_id = state.selectedConnectorId || '';

        return state.currentPayload;
    }

    function highlightJson(value) {
        const json = JSON.stringify(value, null, 2);
        const tokenPattern = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"\s*:?)|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?/g;
        let lastIndex = 0;
        let output = '';
        let matchResult = tokenPattern.exec(json);

        while (matchResult !== null) {
            const match = matchResult[0];

            output += escapeHtml(json.slice(lastIndex, matchResult.index));

            if (/^"/.test(match)) {
                output += /:$/.test(match)
                    ? '<span class="json-key">' + escapeHtml(match) + '</span>'
                    : '<span class="json-string">' + escapeHtml(match) + '</span>';
            } else if (/true|false/.test(match)) {
                output += '<span class="json-boolean">' + escapeHtml(match) + '</span>';
            } else if (/null/.test(match)) {
                output += '<span class="json-null">' + escapeHtml(match) + '</span>';
            } else {
                output += '<span class="json-number">' + escapeHtml(match) + '</span>';
            }

            lastIndex = tokenPattern.lastIndex;
            matchResult = tokenPattern.exec(json);
        }

        output += escapeHtml(json.slice(lastIndex));

        return output;
    }

    function renderJson() {
        dom.jsonOutput.innerHTML = highlightJson(buildPayload());
    }

    function renderOutput(model) {
        setOutputVisible(state.generated);

        if (!state.generated) {
            return;
        }

        renderScore(model);
        renderInventory(model);
        renderNotes(model);
        renderPillars(model);
        renderRisk(model);
        renderJson();
    }

    function renderSelectedUi() {
        if (!state.selectedIds.length) {
            dom.selectedEmpty.classList.remove('d-none');
            dom.selectedEditor.classList.add('d-none');
            return;
        }

        const id = state.selectedIds[0];
        const item = itemRegistry.get(id);

        if (!item || state.selectedIds.length > 1) {
            dom.selectedEmpty.classList.add('d-none');
            dom.selectedEditor.classList.remove('d-none');
            dom.selectedName.textContent = state.selectedIds.length + ' items selected';
            [dom.selectedX, dom.selectedY, dom.selectedWidth, dom.selectedHeight].forEach(function (input) {
                input.value = '';
                input.disabled = true;
            });
            return;
        }

        dom.selectedEmpty.classList.add('d-none');
        dom.selectedEditor.classList.remove('d-none');
        dom.selectedName.textContent = id.replace(/-/g, ' ');
        dom.selectedX.disabled = false;
        dom.selectedY.disabled = false;
        dom.selectedWidth.disabled = false;
        dom.selectedHeight.disabled = false;
        dom.selectedX.value = Math.round(item.x);
        dom.selectedY.value = Math.round(item.y);
        dom.selectedWidth.value = Math.round(item.width);
        dom.selectedHeight.value = Math.round(item.height);
    }

    function renderAll() {
        const model = state.model || buildModelFromState();

        renderStageMeta(model);
        renderDiagram(model, !state.generated);
        renderOutput(model);
        renderSelectedUi();
        updateZoomInput();
        updateUndoButton();
        updateHighlightAllButton();
    }

    function scheduleRenderAll() {
        if (renderFrameId !== 0) {
            return;
        }

        renderFrameId = window.requestAnimationFrame(function () {
            renderFrameId = 0;
            renderAll();
        });
    }

    function updateZoomInput() {
        dom.zoomInput.value = String(Math.round(state.zoom * 100));
    }

    function fitGeneratedDiagramToView() {
        const model = state.model || buildModelFromState();
        const diagram = buildDiagramItems(model);
        const stageBody = dom.stageCanvas ? dom.stageCanvas.parentElement : null;
        const stageRect = stageBody ? stageBody.getBoundingClientRect() : { width: 0 };
        const availableWidth = Math.max(0, stageRect.width - 96);

        if (!availableWidth || !diagram.width) {
            state.zoom = Math.min(state.zoom, 0.58);
            return;
        }

        state.zoom = Math.max(0.48, Math.min(0.58, availableWidth / diagram.width));
    }

    function setZoom(nextZoom) {
        state.zoom = Math.min(1.8, Math.max(0.25, Number(nextZoom) || 1));
        renderAll();
    }

    function fitToView() {
        const svg = dom.stageCanvas.querySelector('svg');

        if (!svg) {
            return;
        }

        const stageRect = dom.stageCanvas.parentElement.getBoundingClientRect();
        const width = svg.viewBox && svg.viewBox.baseVal ? Number(svg.viewBox.baseVal.width) : 1240;
        const nextZoom = Math.max(0.25, Math.min(1.2, (stageRect.width - 64) / width));

        setZoom(nextZoom);
    }

    function isInputTarget(target) {
        return Boolean(target.closest('input, textarea, select, button, summary, a[href], .architecture-physical-server-custom-select, [contenteditable="true"]'));
    }

    function getSvgPoint(event) {
        const svg = dom.stageCanvas.querySelector('svg');
        const point = svg.createSVGPoint();
        const matrix = svg.getScreenCTM();

        point.x = event.clientX;
        point.y = event.clientY;

        if (!matrix) {
            return { x: 0, y: 0 };
        }

        return point.matrixTransform(matrix.inverse());
    }

    function safelySetPointerCapture(element, pointerId) {
        if (!element || typeof element.setPointerCapture !== 'function') {
            return;
        }

        try {
            element.setPointerCapture(pointerId);
        } catch (error) {
            return;
        }
    }

    function safelyReleasePointerCapture(element, pointerId) {
        if (!element || typeof element.releasePointerCapture !== 'function') {
            return;
        }

        try {
            if (typeof element.hasPointerCapture !== 'function' || element.hasPointerCapture(pointerId)) {
                element.releasePointerCapture(pointerId);
            }
        } catch (error) {
            return;
        }
    }

    function getMoveIds(targetId) {
        const ids = state.selectedIds.includes(targetId) ? state.selectedIds.slice() : [targetId];
        const expanded = new Set(ids);

        ids.forEach(function (id) {
            (childRegistry.get(id) || []).forEach(function (childId) {
                expanded.add(childId);
            });
        });

        return Array.from(expanded);
    }

    function getSelectedMoveIds() {
        const expanded = new Set();

        state.selectedIds.forEach(function (id) {
            getMoveIds(id).forEach(function (moveId) {
                expanded.add(moveId);
            });
        });

        return Array.from(expanded);
    }

    function paintSelectionClasses() {
        all('.architecture-physical-server-diagram-item', dom.stageCanvas).forEach(function (item) {
            item.classList.toggle('is-selected', state.selectedIds.includes(item.getAttribute('data-item-id')));
        });
    }

    function paintConnectorSelectionClasses() {
        all('.architecture-physical-server-connector', dom.stageCanvas).forEach(function (connector) {
            connector.classList.toggle('is-selected', state.selectedConnectorId === connector.getAttribute('data-connector-id'));
        });

        if (!state.selectedConnectorId) {
            all('.architecture-physical-server-connector-bend-handle', dom.stageCanvas).forEach(function (handle) {
                handle.remove();
            });
        }
    }

    function setActiveStageInteraction(type, ids) {
        activeStageInteraction = {
            type: type || '',
            ids: Array.isArray(ids) ? ids.slice() : []
        };

        if (!dom.stageCanvas) {
            return;
        }

        dom.stageCanvas.classList.toggle('is-dragging', activeStageInteraction.type === 'drag');
        dom.stageCanvas.classList.toggle('is-resizing', activeStageInteraction.type === 'resize');
        dom.stageCanvas.classList.toggle('is-adjusting-connector', activeStageInteraction.type === 'connector');
        dom.stageCanvas.classList.toggle('is-marquee-selecting', activeStageInteraction.type === 'marquee');
    }

    function isActiveStageItem(id, type) {
        return activeStageInteraction.type === type && activeStageInteraction.ids.includes(id);
    }

    function selectIds(ids) {
        state.selectedConnectorId = '';
        state.selectedIds = ids.filter(function (id, index, list) {
            return Boolean(itemRegistry.has(id)) && list.indexOf(id) === index;
        });
        renderSelectedUi();
        paintSelectionClasses();
        paintConnectorSelectionClasses();

        if (state.generated && dom.jsonOutput) {
            renderJson();
        }
    }

    function selectConnector(id) {
        state.selectedConnectorId = connectorRegistry.has(id) ? id : '';
        state.selectedIds = [];
        renderAll();
    }

    function toggleSelect(id) {
        if (state.selectedIds.includes(id)) {
            selectIds(state.selectedIds.filter(function (item) {
                return item !== id;
            }));
        } else {
            selectIds(state.selectedIds.concat(id));
        }
    }

    function startDrag(event, id) {
        const start = getSvgPoint(event);
        const ids = getMoveIds(id);
        const startRects = {};

        ids.forEach(function (itemId) {
            const rect = itemRegistry.get(itemId);

            if (rect) {
                startRects[itemId] = cloneRect(rect);
            }
        });

        dragState = {
            start,
            ids,
            startRects,
            undoCaptured: false
        };
        setActiveStageInteraction('drag', ids);
        event.preventDefault();
    }

    function startResize(event, id) {
        const start = getSvgPoint(event);
        const rect = itemRegistry.get(id);

        if (!rect) {
            return;
        }

        resizeState = {
            id,
            start,
            startRect: cloneRect(rect),
            undoCaptured: false
        };
        setActiveStageInteraction('resize', [id]);
        event.preventDefault();
        event.stopPropagation();
    }

    function startMarquee(event) {
        const point = getSvgPoint(event);

        marqueeState = {
            start: point,
            current: point
        };
        state.selectedConnectorId = '';
        setActiveStageInteraction('marquee', []);
        event.preventDefault();
    }

    function startConnectorBend(event, id) {
        const connector = connectorRegistry.get(id);

        if (!connector || !connector.orientation) {
            return;
        }

        connectorBendState = {
            id,
            orientation: connector.orientation,
            undoCaptured: false
        };
        state.selectedConnectorId = id;
        state.selectedIds = [];
        setActiveStageInteraction('connector', [id]);
        event.preventDefault();
        event.stopPropagation();
    }

    function updateLayoutOverride(id, rect) {
        state.layoutOverrides[id] = {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        };
    }

    function updateConnectorOverride(id, point, orientation) {
        const svg = dom.stageCanvas.querySelector('svg');
        const box = svg && svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : { width: 1240, height: 960 };

        if (orientation === 'horizontal-lane') {
            state.connectorOverrides[id] = {
                y: Math.round(clamp(point.y, 24, box.height - 24))
            };
            return;
        }

        state.connectorOverrides[id] = {
            x: Math.round(clamp(point.x, 24, box.width - 24))
        };
    }

    function handlePointerMove(event) {
        if (connectorBendState) {
            const point = getSvgPoint(event);

            if (!connectorBendState.undoCaptured) {
                pushUndoSnapshot();
                connectorBendState.undoCaptured = true;
            }

            updateConnectorOverride(connectorBendState.id, point, connectorBendState.orientation);
            scheduleRenderAll();
            return;
        }

        if (dragState) {
            const point = getSvgPoint(event);
            const dx = point.x - dragState.start.x;
            const dy = point.y - dragState.start.y;

            if (!dragState.undoCaptured) {
                pushUndoSnapshot();
                dragState.undoCaptured = true;
            }

            dragState.ids.forEach(function (id) {
                const rect = dragState.startRects[id];

                if (!rect) {
                    return;
                }

                updateLayoutOverride(id, Object.assign({}, rect, {
                    x: rect.x + dx,
                    y: rect.y + dy
                }));
            });

            scheduleRenderAll();
            return;
        }

        if (resizeState) {
            const point = getSvgPoint(event);
            const width = Math.max(80, resizeState.startRect.width + (point.x - resizeState.start.x));
            const height = Math.max(48, resizeState.startRect.height + (point.y - resizeState.start.y));

            if (!resizeState.undoCaptured) {
                pushUndoSnapshot();
                resizeState.undoCaptured = true;
            }

            updateLayoutOverride(resizeState.id, Object.assign({}, resizeState.startRect, {
                width,
                height
            }));
            scheduleRenderAll();
            return;
        }

        if (marqueeState) {
            marqueeState.current = getSvgPoint(event);
            renderMarquee();
        }
    }

    function renderMarquee() {
        const svg = dom.stageCanvas.querySelector('svg');

        if (!svg || !marqueeState) {
            return;
        }

        let rect = svg.querySelector('.architecture-physical-server-marquee-selection');
        const x = Math.min(marqueeState.start.x, marqueeState.current.x);
        const y = Math.min(marqueeState.start.y, marqueeState.current.y);
        const width = Math.abs(marqueeState.current.x - marqueeState.start.x);
        const height = Math.abs(marqueeState.current.y - marqueeState.start.y);

        if (!rect) {
            rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('class', 'architecture-physical-server-marquee-selection');
            svg.appendChild(rect);
        }

        rect.setAttribute('x', String(x));
        rect.setAttribute('y', String(y));
        rect.setAttribute('width', String(width));
        rect.setAttribute('height', String(height));
    }

    function finishMarquee() {
        if (!marqueeState) {
            return;
        }

        const minX = Math.min(marqueeState.start.x, marqueeState.current.x);
        const maxX = Math.max(marqueeState.start.x, marqueeState.current.x);
        const minY = Math.min(marqueeState.start.y, marqueeState.current.y);
        const maxY = Math.max(marqueeState.start.y, marqueeState.current.y);
        const selected = [];

        itemRegistry.forEach(function (rect, id) {
            const cx = rect.x + (rect.width / 2);
            const cy = rect.y + (rect.height / 2);

            if (cx >= minX && cx <= maxX && cy >= minY && cy <= maxY) {
                selected.push(id);
            }
        });

        marqueeState = null;

        if (selected.length) {
            selectIds(selected);
        } else {
            selectIds([]);
        }
    }

    function handlePointerUp(event) {
        const svg = activePointerSvg || dom.stageCanvas.querySelector('svg');
        const hadStageInteraction = Boolean(dragState || resizeState || connectorBendState || marqueeState || activeStageInteraction.type);

        if (event && svg) {
            safelyReleasePointerCapture(svg, event.pointerId);
        }

        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
        activePointerSvg = null;

        if (marqueeState) {
            finishMarquee();
        }

        dragState = null;
        resizeState = null;
        connectorBendState = null;
        setActiveStageInteraction('', []);

        if (hadStageInteraction) {
            scheduleRenderAll();
        }
    }

    function startPointerTracking(svg, event) {
        activePointerSvg = svg;
        safelySetPointerCapture(svg, event.pointerId);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);
    }

    function bindStageEvents() {
        const svg = dom.stageCanvas.querySelector('svg');

        if (!svg) {
            return;
        }

        svg.addEventListener('pointerdown', function (event) {
            if (event.button !== 0) {
                return;
            }

            const connectorHandle = event.target.closest('[data-connector-handle-id]');
            const resizeHandle = event.target.closest('[data-resize-id]');
            const item = event.target.closest('.architecture-physical-server-diagram-item');
            const connector = event.target.closest('[data-connector-id]');

            dom.stageCanvas.focus();
            startPointerTracking(svg, event);

            if (connectorHandle) {
                startConnectorBend(event, connectorHandle.getAttribute('data-connector-handle-id'));
                return;
            }

            if (resizeHandle) {
                startResize(event, resizeHandle.getAttribute('data-resize-id'));
                return;
            }

            if (item) {
                const id = item.getAttribute('data-item-id');

                if (event.shiftKey) {
                    toggleSelect(id);
                } else if (!state.selectedIds.includes(id)) {
                    state.selectedConnectorId = '';
                    state.selectedIds = [id];
                    renderSelectedUi();
                    paintSelectionClasses();
                    paintConnectorSelectionClasses();
                    if (state.generated && dom.jsonOutput) {
                        renderJson();
                    }
                }

                startDrag(event, id);
                return;
            }

            if (connector) {
                selectConnector(connector.getAttribute('data-connector-id'));
                event.preventDefault();
                return;
            }

            startMarquee(event);
        });
    }

    function moveSelection(dx, dy, resize) {
        if (!state.selectedIds.length) {
            return;
        }

        pushUndoSnapshot();
        getSelectedMoveIds().forEach(function (id) {
            const rect = itemRegistry.get(id);

            if (!rect) {
                return;
            }

            updateLayoutOverride(id, Object.assign({}, rect, resize ? {
                width: Math.max(80, rect.width + dx),
                height: Math.max(48, rect.height + dy)
            } : {
                x: rect.x + dx,
                y: rect.y + dy
            }));
        });
        renderAll();
    }

    function handleKeydown(event) {
        if (event.architecturePhysicalServerHandled) {
            return;
        }

        if (isInputTarget(event.target)) {
            return;
        }

        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
            event.architecturePhysicalServerHandled = true;
            undoLayout();
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (event.key === 'Escape' && (state.selectedIds.length || state.selectedConnectorId) && !dom.stageShell.classList.contains('architecture-physical-server-stage-expanded') && document.fullscreenElement !== dom.stageShell) {
            event.architecturePhysicalServerHandled = true;
            selectIds([]);
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const keyMap = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0]
        };
        const vector = keyMap[event.key];

        if (!vector || !state.selectedIds.length) {
            return;
        }

        const step = event.shiftKey ? 24 : 8;
        event.architecturePhysicalServerHandled = true;
        moveSelection(vector[0] * step, vector[1] * step, event.altKey);
        event.preventDefault();
        event.stopPropagation();
    }

    function undoLayout() {
        const last = state.undoStack.pop();
        let snapshot;

        if (!last) {
            updateUndoButton();
            return;
        }

        snapshot = JSON.parse(last);

        if (snapshot && typeof snapshot === 'object' && Object.prototype.hasOwnProperty.call(snapshot, 'layoutOverrides')) {
            state.layoutOverrides = snapshot.layoutOverrides || {};
            state.connectorOverrides = snapshot.connectorOverrides || {};
        } else {
            state.layoutOverrides = snapshot || {};
            state.connectorOverrides = {};
        }

        state.selectedConnectorId = '';
        renderAll();
        updateUndoButton();
    }

    function applySelectedInputs() {
        if (state.selectedIds.length !== 1) {
            return;
        }

        const id = state.selectedIds[0];
        const rect = itemRegistry.get(id);

        if (!rect) {
            return;
        }

        pushUndoSnapshot();
        updateLayoutOverride(id, {
            x: Number(dom.selectedX.value) || rect.x,
            y: Number(dom.selectedY.value) || rect.y,
            width: Number(dom.selectedWidth.value) || rect.width,
            height: Number(dom.selectedHeight.value) || rect.height
        });
        renderAll();
    }

    function resetSelectedItem() {
        if (state.selectedIds.length !== 1) {
            return;
        }

        pushUndoSnapshot();
        delete state.layoutOverrides[state.selectedIds[0]];
        renderAll();
    }

    function highlightSelected() {
        const svg = dom.stageCanvas.querySelector('svg');

        if (!svg || !state.selectedIds.length) {
            return;
        }

        state.selectedIds.forEach(function (id) {
            const element = svg.querySelector('[data-item-id="' + CSS.escape(id) + '"]');

            if (element) {
                element.classList.add('is-highlighted');
                setTimeout(function () {
                    element.classList.remove('is-highlighted');
                }, 1400);
            }
        });
    }

    function updateHighlightAllButton() {
        if (!dom.highlightAll) {
            return;
        }

        const label = state.stageHighlighted ? 'Remove diagram highlight' : 'Highlight entire diagram';

        dom.highlightAll.setAttribute('aria-pressed', state.stageHighlighted ? 'true' : 'false');
        dom.highlightAll.setAttribute('aria-label', label);
        dom.highlightAll.setAttribute('title', label);
    }

    function highlightAll() {
        clearTimeout(highlightedAllTimer);
        state.stageHighlighted = !state.stageHighlighted;
        renderAll();
    }

    function resetLayout() {
        pushUndoSnapshot();
        state.layoutOverrides = {};
        state.connectorOverrides = {};
        state.selectedIds = [];
        state.selectedConnectorId = '';
        state.stageHighlighted = false;
        renderAll();
    }

    function toggleStageUi() {
        const hidden = dom.stageShell.classList.toggle('architecture-physical-server-stage-ui-hidden');
        const label = dom.zoomHideUi.querySelector('span') || dom.zoomHideUi;

        if (label) {
            label.textContent = hidden ? 'Show UI' : 'Hide UI';
        }
    }

    function updateFullscreenButton() {
        const isExpanded = document.fullscreenElement === dom.stageShell || dom.stageShell.classList.contains('architecture-physical-server-stage-expanded');
        const icon = dom.fullscreen.querySelector('i');
        const label = isExpanded ? 'Close fullscreen' : 'Open fullscreen';

        dom.fullscreen.setAttribute('aria-label', label);
        dom.fullscreen.setAttribute('title', label);

        if (icon) {
            icon.className = isExpanded ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen';
        }
    }

    function setStageExpanded(isExpanded) {
        dom.stageShell.classList.toggle('architecture-physical-server-stage-expanded', Boolean(isExpanded));
        document.body.classList.toggle('architecture-physical-server-stage-expanded-lock', Boolean(isExpanded));
        updateFullscreenButton();
    }

    function toggleFullscreen() {
        if (dom.stageShell.classList.contains('architecture-physical-server-stage-expanded')) {
            setStageExpanded(false);
            return;
        }

        if (document.fullscreenElement === dom.stageShell) {
            document.exitFullscreen();
            return;
        }

        if (dom.stageShell.requestFullscreen) {
            dom.stageShell.requestFullscreen().then(updateFullscreenButton).catch(function () {
                setStageExpanded(true);
            });
        } else {
            setStageExpanded(true);
        }
    }

    function toggleHelp() {
        const nextHidden = !dom.usageHelpPopup.hidden;

        dom.usageHelpPopup.hidden = nextHidden;
        dom.usageHelpPopup.classList.toggle('d-none', nextHidden);
        dom.usageHelpButton.setAttribute('aria-expanded', String(!nextHidden));
    }

    function switchTabs(buttons, panels, targetId) {
        buttons.forEach(function (button) {
            const active = button.getAttribute('data-output-tab-target') === targetId
                || button.getAttribute('data-config-tab-target') === targetId
                || button.getAttribute('data-tab-target') === targetId;

            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', String(active));
            button.tabIndex = active ? 0 : -1;
        });
        panels.forEach(function (panel) {
            const active = panel.id === targetId;

            panel.classList.toggle('active', active);
            panel.hidden = !active;
        });
    }

    function enhanceSelects() {
        function closeSelects(exceptWrapper) {
            all('.architecture-physical-server-custom-select', dom.root).forEach(function (wrapper) {
                if (exceptWrapper && wrapper === exceptWrapper) {
                    return;
                }

                wrapper.classList.remove('open');
                const trigger = wrapper.querySelector('.architecture-physical-server-custom-select-trigger');

                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        }

        dom.enhancedSelects.forEach(function (selectElement) {
            if (selectElement.dataset.customSelectEnhanced === 'true') {
                return;
            }

            const label = selectElement.id ? document.querySelector('label[for="' + selectElement.id + '"]') : null;
            const wrapper = document.createElement('div');
            const trigger = document.createElement('button');
            const value = document.createElement('span');
            const icon = document.createElement('i');
            const menu = document.createElement('div');

            function syncSelect() {
                const activeOption = Array.from(selectElement.options).find(function (option) {
                    return option.value === selectElement.value;
                }) || selectElement.options[0];

                value.textContent = activeOption ? activeOption.textContent : '';
                all('.architecture-physical-server-custom-select-option', wrapper).forEach(function (button) {
                    const active = button.dataset.value === selectElement.value;

                    button.classList.toggle('selected', active);
                    button.setAttribute('aria-selected', String(active));
                });
            }

            wrapper.className = 'architecture-physical-server-custom-select';
            trigger.type = 'button';
            trigger.className = 'architecture-physical-server-custom-select-trigger';
            trigger.setAttribute('aria-haspopup', 'listbox');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('aria-label', label ? label.textContent.trim() : 'Select option');
            value.className = 'architecture-physical-server-custom-select-value';
            icon.className = 'bi bi-chevron-down';
            icon.setAttribute('aria-hidden', 'true');
            menu.className = 'architecture-physical-server-custom-select-menu';
            menu.setAttribute('role', 'listbox');
            if (selectElement.id) {
                menu.id = selectElement.id + 'CustomSelectMenu';
                trigger.setAttribute('aria-controls', menu.id);
            }

            Array.from(selectElement.options).forEach(function (option) {
                const optionButton = document.createElement('button');

                optionButton.type = 'button';
                optionButton.className = 'architecture-physical-server-custom-select-option';
                optionButton.dataset.value = option.value;
                optionButton.textContent = option.textContent;
                optionButton.setAttribute('role', 'option');
                optionButton.addEventListener('click', function () {
                    selectElement.value = option.value;
                    syncSelect();
                    closeSelects();
                    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
                    trigger.focus();
                });
                menu.appendChild(optionButton);
            });

            trigger.appendChild(value);
            trigger.appendChild(icon);
            wrapper.appendChild(trigger);
            wrapper.appendChild(menu);
            selectElement.classList.add('architecture-physical-server-native-select');
            selectElement.setAttribute('aria-hidden', 'true');
            selectElement.tabIndex = -1;
            selectElement.dataset.customSelectEnhanced = 'true';
            selectElement.insertAdjacentElement('afterend', wrapper);
            trigger.addEventListener('click', function () {
                const willOpen = !wrapper.classList.contains('open');

                closeSelects(wrapper);
                wrapper.classList.toggle('open', willOpen);
                trigger.setAttribute('aria-expanded', String(willOpen));
            });
            selectElement.addEventListener('change', syncSelect);
            syncSelect();
        });

        document.addEventListener('click', function (event) {
            if (!dom.root || !dom.root.contains(event.target)) {
                return;
            }

            if (event.target.closest('.architecture-physical-server-custom-select')) {
                return;
            }

            closeSelects();
        });
    }

    function exportSvg() {
        const svgMarkup = serializeCurrentSvg();

        if (!svgMarkup) {
            showError('Generate a diagram before exporting SVG.');
            return;
        }

        downloadBlob('architecture-physical-server.svg', 'image/svg+xml;charset=utf-8', svgMarkup);
    }

    function exportPng() {
        const svgMarkup = serializeCurrentSvg();

        if (!svgMarkup) {
            showError('Generate a diagram before exporting PNG.');
            return;
        }

        const svg = dom.stageCanvas.querySelector('svg');
        const width = Number(svg.getAttribute('width')) || 1240;
        const height = Number(svg.getAttribute('height')) || 1070;
        const image = new Image();
        const svgUrl = URL.createObjectURL(new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' }));

        image.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = width * 2;
            canvas.height = height * 2;
            context.fillStyle = '#f8fbff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(function (blob) {
                if (!blob) {
                    showError('PNG export failed in this browser.');
                    URL.revokeObjectURL(svgUrl);
                    return;
                }

                const pngUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');

                link.href = pngUrl;
                link.download = 'architecture-physical-server.png';
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(pngUrl);
                URL.revokeObjectURL(svgUrl);
            }, 'image/png');
        };
        image.onerror = function () {
            URL.revokeObjectURL(svgUrl);
            showError('PNG export failed while rendering the SVG.');
        };
        image.src = svgUrl;
    }

    function copyJson() {
        const json = JSON.stringify(buildPayload(), null, 2);

        writeClipboardText(json).then(function (copied) {
            if (!copied) {
                showError('Failed to copy the JSON state to the clipboard.');
            }
        }).catch(function () {
            showError('Failed to copy the JSON state to the clipboard.');
        });
    }

    function downloadJson() {
        downloadBlob('architecture-physical-server.json', 'application/json;charset=utf-8', JSON.stringify(buildPayload(), null, 2));
    }

    function copyPromptText(value) {
        writeClipboardText(value).catch(function () {});
    }

    function importJson(file) {
        const reader = new FileReader();

        reader.onload = function () {
            try {
                const payload = JSON.parse(String(reader.result || '{}'));
                const imported = core.buildImportedPayloadState(payload);

                state.presetId = imported.presetId;
                state.prompt = imported.prompt;
                state.controls = imported.controls;
                state.layoutOverrides = imported.layoutOverrides;
                state.connectorOverrides = sanitizeConnectorOverrides(payload.connector_overrides);
                state.selectedIds = imported.selectedIds;
                state.selectedConnectorId = typeof payload.selected_connector_id === 'string' ? payload.selected_connector_id : '';
                state.zoom = imported.zoom;
                state.generated = true;
                dom.preset.value = state.presetId;
                dom.prompt.value = state.prompt;
                syncControls(state.controls);
                buildModelFromState();
                clearError();
                renderAll();
            } catch (error) {
                showError(error.message || 'Could not import this JSON state.');
            }
        };
        reader.readAsText(file);
    }

    function bindEvents() {
        dom.generate.addEventListener('click', generateArchitecture);
        dom.reset.addEventListener('click', function () {
            applyPreset('onprem-private-cloud', true);
        });
        dom.preset.addEventListener('change', function () {
            applyPreset(dom.preset.value, true);
        });
        [
            dom.rackCount,
            dom.hypervisorCount,
            dom.platform,
            dom.storageModel,
            dom.networkMode,
            dom.serverModel,
            dom.storagePlatform,
            dom.mgmtTool,
            dom.managementNetwork,
            dom.storageNetwork,
            dom.tenantNetwork,
            dom.backupNetwork,
            dom.networkNotes,
            dom.proxmox,
            dom.horizon,
            dom.synologyDsm,
            dom.zabbix,
            dom.syslog,
            dom.outOfBand,
            dom.snapshots,
            dom.offsiteBackup,
            dom.disasterRecovery,
            dom.redundantPower,
            dom.cooling,
            dom.physicalSecurity
        ].forEach(function (element) {
            element.addEventListener('input', function () {
                if (!state.generated) {
                    return;
                }

                buildModelFromState();
                renderAll();
            });
            element.addEventListener('change', function () {
                if (!state.generated) {
                    return;
                }

                buildModelFromState();
                renderAll();
            });
        });
        dom.configTabs.forEach(function (button) {
            button.addEventListener('click', function () {
                switchTabs(dom.configTabs, dom.configPanels, button.getAttribute('data-config-tab-target'));
            });
        });
        dom.outputTabs.forEach(function (button) {
            button.addEventListener('click', function () {
                switchTabs(dom.outputTabs, dom.outputPanels, button.getAttribute('data-output-tab-target') || button.getAttribute('data-tab-target'));
            });
        });
        dom.zoomOut.addEventListener('click', function () {
            setZoom(state.zoom - 0.01);
        });
        dom.zoomIn.addEventListener('click', function () {
            setZoom(state.zoom + 0.01);
        });
        dom.zoomInput.addEventListener('change', function () {
            setZoom(Number(dom.zoomInput.value) / 100);
        });
        dom.zoomInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                setZoom(Number(dom.zoomInput.value) / 100);
            }

            if (event.key === 'Escape') {
                updateZoomInput();
            }
        });
        dom.zoomFit.addEventListener('click', fitToView);
        dom.zoomActual.addEventListener('click', function () {
            setZoom(1);
        });
        dom.undoStageEdit.addEventListener('click', undoLayout);
        dom.highlightAll.addEventListener('click', highlightAll);
        dom.zoomHideUi.addEventListener('click', toggleStageUi);
        dom.fullscreen.addEventListener('click', toggleFullscreen);
        dom.resetLayout.addEventListener('click', resetLayout);
        dom.usageHelpButton.addEventListener('click', toggleHelp);
        if (dom.usageHelpClose) {
            dom.usageHelpClose.addEventListener('click', toggleHelp);
        }
        dom.applyItemSize.addEventListener('click', applySelectedInputs);
        dom.resetItemSize.addEventListener('click', resetSelectedItem);
        dom.highlightItem.addEventListener('click', highlightSelected);
        if (dom.inventorySortSelect) {
            if (dom.inventorySortSelect.tagName === 'DETAILS') {
                dom.inventorySortSelect.addEventListener('toggle', function () {
                    const summary = dom.inventorySortSelect.querySelector('summary');

                    if (summary) {
                        summary.setAttribute('aria-expanded', String(dom.inventorySortSelect.open));
                    }
                });
            } else {
                dom.inventorySortSelect.addEventListener('click', function () {
                    setSortMenuOpen(dom.inventorySortSelect.getAttribute('aria-expanded') !== 'true');
                });
                dom.inventorySortSelect.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter' && event.key !== ' ') {
                        return;
                    }

                    event.preventDefault();
                    setSortMenuOpen(dom.inventorySortSelect.getAttribute('aria-expanded') !== 'true');
                });
            }

            document.addEventListener('click', function (event) {
                if (!dom.inventorySortSelect.contains(event.target) && (!dom.inventorySortMenu || !dom.inventorySortMenu.contains(event.target))) {
                    setSortMenuOpen(false);
                }
            });
        }
        dom.sortOptions.forEach(function (button) {
            button.addEventListener('click', function () {
                setSortMode(button.getAttribute('data-sort-value'));

                if (state.generated && state.model) {
                    renderInventory(state.model);
                }
            });
        });
        if (dom.sort && dom.sort.tagName === 'SELECT') {
            dom.sort.addEventListener('change', function () {
                setSortMode(dom.sort.value);

                if (state.generated && state.model) {
                    renderInventory(state.model);
                }
            });
        }
        dom.inventoryTableBody.addEventListener('click', function (event) {
            const button = event.target.closest('.architecture-physical-server-row-copy');

            if (!button || !dom.inventoryTableBody.contains(button)) {
                return;
            }

            if (!button.dataset.copyTitle) {
                button.dataset.copyTitle = button.getAttribute('title') || 'Copy row';
            }

            copyInventoryRow(button.dataset.inventoryCopyRow || '', button);
        });
        dom.exportPng.addEventListener('click', exportPng);
        dom.downloadSvg.addEventListener('click', exportSvg);
        dom.copyJson.addEventListener('click', copyJson);
        dom.downloadJson.addEventListener('click', downloadJson);
        dom.importJsonButton.addEventListener('click', function () {
            dom.importJson.click();
        });
        dom.importJson.addEventListener('change', function () {
            const file = dom.importJson.files && dom.importJson.files[0];

            if (file) {
                importJson(file);
            }

            dom.importJson.value = '';
        });
        dom.stageCanvas.addEventListener('keydown', handleKeydown);
        dom.stageCanvas.addEventListener('wheel', function (event) {
            if (!event.ctrlKey && !event.metaKey) {
                return;
            }

            event.preventDefault();
            setZoom(state.zoom + (event.deltaY > 0 ? -0.01 : 0.01));
        }, { passive: false });
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('fullscreenchange', function () {
            if (!document.fullscreenElement) {
                setStageExpanded(false);
                return;
            }

            updateFullscreenButton();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && dom.stageShell.classList.contains('architecture-physical-server-stage-expanded')) {
                setStageExpanded(false);
            }
        });
    }

    function setupPromptCopyButtons() {
        const prompts = all('.markdown-content pre.architecture-physical-server-prompt-pre');

        all('.architecture-physical-server-prompt-copy-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                const index = Number(button.getAttribute('data-prompt-copy-index'));
                const code = prompts[index] ? prompts[index].textContent.trim() : '';

                if (!code) {
                    return;
                }

                dom.prompt.value = code;
                copyPromptText(code);
            });
        });
    }

    function init() {
        if (!collectDom()) {
            return;
        }

        const preset = core.getPreset(state.presetId);

        state.prompt = preset.prompt;
        state.controls = preset.defaults;
        dom.prompt.value = preset.prompt;
        syncControls(preset.defaults);
        enhanceSelects();
        setSortMode('id');
        bindEvents();
        setupPromptCopyButtons();
        renderAll();
    }

    document.addEventListener('DOMContentLoaded', init);
}(window));
