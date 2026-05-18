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
            "architectureCampusNetworkCiscoPrompt",
            "architectureCampusNetworkCiscoGenerate",
            "architectureCampusNetworkCiscoReset",
            "architectureCampusNetworkCiscoErrorState"
        ],
        "sourceClasses": [
            "tool-prompt-shell",
            "tool-main-row",
            "tool-main-label",
            "tool-main-input-grid",
            "architecture-campus-network-cisco-prompt",
            "architecture-campus-network-cisco-prompt-hint",
            "architecture-campus-network-cisco-main-actions",
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
            "architectureCampusNetworkCiscoPreset",
            "architectureCampusNetworkCiscoPresetDescription",
            "architectureCampusNetworkCiscoRegion",
            "architectureCampusNetworkCiscoAzCount"
        ],
        "sourceClasses": [
            "architecture-campus-network-cisco-basic-preset-section",
            "architecture-campus-network-cisco-basic-grid",
            "architecture-campus-network-cisco-control-stack",
            "architecture-campus-network-cisco-native-select",
            "architecture-campus-network-cisco-custom-select",
            "architecture-campus-network-cisco-custom-select-trigger",
            "architecture-campus-network-cisco-custom-select-menu"
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
            "architectureCampusNetworkCiscoNetworkConfigTab",
            "architectureCampusNetworkCiscoWorkloadConfigTab",
            "architectureCampusNetworkCiscoServicesConfigTab",
            "architectureCampusNetworkCiscoNetworkConfigPanel",
            "architectureCampusNetworkCiscoWorkloadConfigPanel",
            "architectureCampusNetworkCiscoServicesConfigPanel",
            "architectureCampusNetworkCiscoCidr",
            "architectureCampusNetworkCiscoNatMode",
            "architectureCampusNetworkCiscoAppTier",
            "architectureCampusNetworkCiscoDatabase",
            "architectureCampusNetworkCiscoRoute53",
            "architectureCampusNetworkCiscoCloudFront",
            "architectureCampusNetworkCiscoWaf",
            "architectureCampusNetworkCiscoAlb",
            "architectureCampusNetworkCiscoBastion",
            "architectureCampusNetworkCiscoEndpoints",
            "architectureCampusNetworkCiscoFlowLogs",
            "architectureCampusNetworkCiscoCloudWatch",
            "architectureCampusNetworkCiscoSiteToSiteVpn",
            "architectureCampusNetworkCiscoTransitGateway",
            "architectureCampusNetworkCiscoCache"
        ],
        "sourceClasses": [
            "architecture-campus-network-cisco-custom-panel",
            "architecture-campus-network-cisco-custom-panel-summary",
            "architecture-campus-network-cisco-config-tabs",
            "architecture-campus-network-cisco-config-tab",
            "architecture-campus-network-cisco-config-panel",
            "architecture-campus-network-cisco-config-grid",
            "architecture-campus-network-cisco-toggle-grid",
            "architecture-campus-network-cisco-toggle-item"
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
            "architectureCampusNetworkCiscoSelectedShell",
            "architectureCampusNetworkCiscoSelectedEmpty",
            "architectureCampusNetworkCiscoSelectedEditor",
            "architectureCampusNetworkCiscoSelectedName",
            "architectureCampusNetworkCiscoSelectedX",
            "architectureCampusNetworkCiscoSelectedY",
            "architectureCampusNetworkCiscoSelectedWidth",
            "architectureCampusNetworkCiscoSelectedHeight",
            "architectureCampusNetworkCiscoHighlightCard",
            "architectureCampusNetworkCiscoApplyCardSize",
            "architectureCampusNetworkCiscoResetCardSize"
        ],
        "sourceClasses": [
            "architecture-campus-network-cisco-selected-section",
            "architecture-campus-network-cisco-selected-empty",
            "architecture-campus-network-cisco-selected-empty-chips",
            "architecture-campus-network-cisco-selected-hint-chip",
            "architecture-campus-network-cisco-selected-editor",
            "architecture-campus-network-cisco-selected-name",
            "architecture-campus-network-cisco-selected-actions",
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
            "architectureCampusNetworkCiscoStageTitle",
            "architectureCampusNetworkCiscoStageSubtitle",
            "architectureCampusNetworkCiscoStageMeta",
            "architectureCampusNetworkCiscoOutputEmpty",
            "architectureCampusNetworkCiscoPromptSummary",
            "architectureCampusNetworkCiscoResultTextGenerated"
        ],
        "sourceClasses": [
            "architecture-campus-network-cisco-stage-header",
            "architecture-campus-network-cisco-stage-heading",
            "architecture-campus-network-cisco-stage-preset-chip",
            "architecture-campus-network-cisco-stage-meta",
            "architecture-campus-network-cisco-prompt-notes-card",
            "architecture-campus-network-cisco-note-card",
            "architecture-campus-network-cisco-note-copy",
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
            "architectureCampusNetworkCiscoStageShell",
            "architectureCampusNetworkCiscoStageEmpty",
            "architectureCampusNetworkCiscoStageCanvas",
            "architectureCampusNetworkCiscoZoomControl",
            "architectureCampusNetworkCiscoZoomLabel",
            "architectureCampusNetworkCiscoZoomInput",
            "architectureCampusNetworkCiscoZoomOut",
            "architectureCampusNetworkCiscoZoomIn",
            "architectureCampusNetworkCiscoZoomFit",
            "architectureCampusNetworkCiscoZoomActual",
            "architectureCampusNetworkCiscoUndoStageEdit",
            "architectureCampusNetworkCiscoHighlightAll",
            "architectureCampusNetworkCiscoZoomHideUi",
            "architectureCampusNetworkCiscoUsageHelpButton",
            "architectureCampusNetworkCiscoUsageHelpPopup",
            "architectureCampusNetworkCiscoUsageHelpClose",
            "architectureCampusNetworkCiscoFullscreen",
            "architectureCampusNetworkCiscoResetLayout"
        ],
        "sourceClasses": [
            "tool-stage-shell",
            "tool-stage-toolbar",
            "tool-stage-body",
            "tool-stage-empty",
            "tool-stage-canvas",
            "architecture-campus-network-cisco-stage-canvas",
            "architecture-campus-network-cisco-zoom-control",
            "architecture-campus-network-cisco-icon-btn",
            "architecture-campus-network-cisco-stage-preview",
            "architecture-campus-network-cisco-usage-overlay",
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
            "architectureCampusNetworkCiscoOutputStatus",
            "architectureCampusNetworkCiscoScoreValue",
            "architectureCampusNetworkCiscoScoreEchart"
        ],
        "sourceClasses": [
            "architecture-campus-network-cisco-output-summary",
            "architecture-campus-network-cisco-output-status-card",
            "architecture-campus-network-cisco-score-card",
            "architecture-campus-network-cisco-score-ring-card",
            "architecture-campus-network-cisco-score-value",
            "architecture-campus-network-cisco-score-copy",
            "architecture-campus-network-cisco-score-kicker",
            "architecture-campus-network-cisco-score-summary",
            "architecture-campus-network-cisco-score-detail",
            "architecture-campus-network-cisco-score-tag"
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
            "architectureCampusNetworkCiscoInventorySortSelect",
            "architectureCampusNetworkCiscoInventorySortSummary",
            "architectureCampusNetworkCiscoInventorySort",
            "architectureCampusNetworkCiscoExportPng",
            "architectureCampusNetworkCiscoDownloadSvg",
            "architectureCampusNetworkCiscoCopyJson",
            "architectureCampusNetworkCiscoDownloadJson",
            "architectureCampusNetworkCiscoImportJsonButton"
        ],
        "sourceClasses": [
            "architecture-campus-network-cisco-toolbar-shell",
            "architecture-campus-network-cisco-toolbar",
            "architecture-campus-network-cisco-toolbar-main",
            "tool-output-toolbar",
            "tool-output-actions",
            "architecture-campus-network-cisco-sort-label",
            "architecture-campus-network-cisco-sort-wrap",
            "architecture-campus-network-cisco-sort-select",
            "architecture-campus-network-cisco-sort-summary",
            "architecture-campus-network-cisco-sort-menu",
            "architecture-campus-network-cisco-sort-option"
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
            "architectureCampusNetworkCiscoOutputEmpty",
            "architectureCampusNetworkCiscoOutputContent",
            "architectureCampusNetworkCiscoInventoryTableBody",
            "architectureCampusNetworkCiscoRoutingTableBody",
            "architectureCampusNetworkCiscoControlTableBody",
            "architectureCampusNetworkCiscoPromptSummary",
            "architectureCampusNetworkCiscoKeywordList",
            "architectureCampusNetworkCiscoAssumptionList",
            "architectureCampusNetworkCiscoModelList",
            "architectureCampusNetworkCiscoProsList",
            "architectureCampusNetworkCiscoConsList",
            "architectureCampusNetworkCiscoPillarBreakdown",
            "architectureCampusNetworkCiscoRiskLevel",
            "architectureCampusNetworkCiscoJsonOutput",
            "architectureCampusNetworkCiscoImportJson"
        ],
        "sourceClasses": [
            "tool-output-shell",
            "tool-empty-state",
            "architecture-campus-network-cisco-output-content",
            "architecture-campus-network-cisco-output-shell",
            "architecture-campus-network-cisco-tabs-shell",
            "tool-tabs",
            "architecture-campus-network-cisco-tab-btn",
            "architecture-campus-network-cisco-tab-panel",
            "architecture-campus-network-cisco-inventory-panel",
            "architecture-campus-network-cisco-table-card",
            "architecture-campus-network-cisco-table-wrap",
            "architecture-campus-network-cisco-table",
            "architecture-campus-network-cisco-row-copy",
            "architecture-campus-network-cisco-prompt-notes-card",
            "architecture-campus-network-cisco-assessment-card",
            "architecture-campus-network-cisco-pillar-card",
            "architecture-campus-network-cisco-risk-card",
            "tool-json-shell",
            "architecture-campus-network-cisco-json-code"
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

{{ include('content/tools/cisco/architecture-campus-network-cisco/assets/bin/model-core.js')|raw }}

(function initArchitectureCampusNetworkCiscoWorkspace(globalScope) {
    'use strict';

    const core = ArchitectureCampusNetworkCiscoModelCore;
    const iconSvgMap = {
        users: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/users.svg')|json_encode|raw }},
        coreSwitch: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/core-switch.svg')|json_encode|raw }},
        distributionSwitch: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/distribution-switch.svg')|json_encode|raw }},
        accessSwitch: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/access-switch.svg')|json_encode|raw }},
        router: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/router.svg')|json_encode|raw }},
        firewall: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/firewall.svg')|json_encode|raw }},
        wirelessController: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/wireless-controller.svg')|json_encode|raw }},
        accessPoint: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/access-point.svg')|json_encode|raw }},
        services: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/services.svg')|json_encode|raw }},
        monitoring: {{ include('content/tools/cisco/architecture-campus-network-cisco/assets/icon/monitoring.svg')|json_encode|raw }}
    };

    let currentSpec = null;
    let currentTopology = null;
    let previewTopology = null;
    let currentInventory = [];
    let currentNotes = null;
    let currentPayload = null;
    let currentSvgMarkup = '';
    let selectedNodeId = '';
    let selectedNodeIds = [];
    let selectedConnectorId = '';
    let pendingStageFocusNodeId = '';
    let highlightedNodeId = '';
    let layoutOverrides = {};
    let connectorOverrides = {};
    let stageZoom = 50;
    let dragState = null;
    let isStageUiHidden = false;
    let stageDiagramHighlighted = false;
    let stageUndoStack = [];
    let chartJsPromise = null;
    let scoreChartInstance = null;
    const stageUndoLimit = 40;
    const customSelectControls = [];
    const customSelectIds = [
        'architectureCampusNetworkCiscoPreset',
        'architectureCampusNetworkCiscoSize',
        'architectureCampusNetworkCiscoAccessBlocks',
        'architectureCampusNetworkCiscoRouting'
    ];
    const requiredIds = [
        'architectureCampusNetworkCiscoPrompt',
        'architectureCampusNetworkCiscoGenerate',
        'architectureCampusNetworkCiscoReset',
        'architectureCampusNetworkCiscoErrorState',
        'architectureCampusNetworkCiscoPreset',
        'architectureCampusNetworkCiscoPresetDescription',
        'architectureCampusNetworkCiscoSize',
        'architectureCampusNetworkCiscoAccessBlocks',
        'architectureCampusNetworkCiscoRouting',
        'architectureCampusNetworkCiscoVlans',
        'architectureCampusNetworkCiscoTrunkVlans',
        'architectureCampusNetworkCiscoNativeVlan',
        'architectureCampusNetworkCiscoAccessVlan',
        'architectureCampusNetworkCiscoSviGateway',
        'architectureCampusNetworkCiscoOspfArea',
        'architectureCampusNetworkCiscoBgpAsn',
        'architectureCampusNetworkCiscoRedundancyVip',
        'architectureCampusNetworkCiscoWireless',
        'architectureCampusNetworkCiscoFirewall',
        'architectureCampusNetworkCiscoWan',
        'architectureCampusNetworkCiscoMonitoring',
        'architectureCampusNetworkCiscoDhcpDns',
        'architectureCampusNetworkCiscoHsrp',
        'architectureCampusNetworkCiscoEtherChannel',
        'architectureCampusNetworkCiscoAcl',
        'architectureCampusNetworkCiscoNat',
        'architectureCampusNetworkCiscoVpn',
        'architectureCampusNetworkCiscoStageShell',
        'architectureCampusNetworkCiscoStageTitle',
        'architectureCampusNetworkCiscoStageSubtitle',
        'architectureCampusNetworkCiscoStageMeta',
        'architectureCampusNetworkCiscoStageEmpty',
        'architectureCampusNetworkCiscoStageCanvas',
        'architectureCampusNetworkCiscoZoomOut',
        'architectureCampusNetworkCiscoZoomInput',
        'architectureCampusNetworkCiscoZoomLabel',
        'architectureCampusNetworkCiscoZoomIn',
        'architectureCampusNetworkCiscoZoomFit',
        'architectureCampusNetworkCiscoZoomActual',
        'architectureCampusNetworkCiscoUndoStageEdit',
        'architectureCampusNetworkCiscoHighlightAll',
        'architectureCampusNetworkCiscoZoomHideUi',
        'architectureCampusNetworkCiscoFullscreen',
        'architectureCampusNetworkCiscoResetLayout',
        'architectureCampusNetworkCiscoSelectedEmpty',
        'architectureCampusNetworkCiscoSelectedEditor',
        'architectureCampusNetworkCiscoSelectedName',
        'architectureCampusNetworkCiscoSelectedX',
        'architectureCampusNetworkCiscoSelectedY',
        'architectureCampusNetworkCiscoSelectedWidth',
        'architectureCampusNetworkCiscoSelectedHeight',
        'architectureCampusNetworkCiscoOutputEmpty',
        'architectureCampusNetworkCiscoOutputContent',
        'architectureCampusNetworkCiscoOutputStatus',
        'architectureCampusNetworkCiscoPillarBreakdown',
        'architectureCampusNetworkCiscoRiskLevel',
        'architectureCampusNetworkCiscoInventorySortSelect',
        'architectureCampusNetworkCiscoInventorySortSummary',
        'architectureCampusNetworkCiscoInventorySort',
        'architectureCampusNetworkCiscoInventoryTableBody',
        'architectureCampusNetworkCiscoPromptSummary',
        'architectureCampusNetworkCiscoKeywordList',
        'architectureCampusNetworkCiscoAssumptionList',
        'architectureCampusNetworkCiscoModelList',
        'architectureCampusNetworkCiscoProsList',
        'architectureCampusNetworkCiscoConsList',
        'architectureCampusNetworkCiscoJsonOutput',
        'architectureCampusNetworkCiscoImportJson'
    ];

    function byId(id) {
        return document.getElementById(id);
    }

    function all(selector, root) {
        return Array.from((root || document).querySelectorAll(selector));
    }

    function valueOf(id) {
        const element = byId(id);

        return element ? element.value : '';
    }

    function checkedOf(id) {
        const element = byId(id);

        return element ? Boolean(element.checked) : false;
    }

    function setValue(id, value) {
        const element = byId(id);

        if (element) {
            element.value = value;
            syncCustomSelectByElement(element);
        }
    }

    function setChecked(id, value) {
        const element = byId(id);

        if (element) {
            element.checked = Boolean(value);
        }
    }

    function setText(id, value) {
        const element = byId(id);

        if (element) {
            element.textContent = value;
        }
    }

    function setHidden(element, isHidden) {
        if (!element) {
            return;
        }

        element.classList.toggle('d-none', Boolean(isHidden));
        element.hidden = Boolean(isHidden);
    }

    function cloneStageValue(value) {
        return JSON.parse(JSON.stringify(value || {}));
    }

    function cloneConnectorOverrides(value) {
        return cloneStageValue(value);
    }

    function syncConnectorPayloadState() {
        if (!currentPayload) {
            return;
        }

        currentPayload.connector_overrides = cloneConnectorOverrides(connectorOverrides);
        currentPayload.connectorOverrides = cloneConnectorOverrides(connectorOverrides);
        currentPayload.selected_connector_id = selectedConnectorId || '';
    }

    function updateUndoButton() {
        const button = byId('architectureCampusNetworkCiscoUndoStageEdit');

        if (!button) {
            return;
        }

        button.disabled = stageUndoStack.length === 0;
        button.setAttribute('aria-disabled', button.disabled ? 'true' : 'false');
    }

    function updateHighlightAllButton() {
        const button = byId('architectureCampusNetworkCiscoHighlightAll');

        if (!button) {
            return;
        }

        button.setAttribute('aria-pressed', stageDiagramHighlighted ? 'true' : 'false');
    }

    function createStageUndoSnapshot() {
        if (!currentSpec) {
            return null;
        }

        return {
            spec: cloneStageValue(currentSpec),
            layoutOverrides: cloneStageValue(layoutOverrides),
            connectorOverrides: cloneConnectorOverrides(connectorOverrides),
            selectedNodeId: selectedNodeId,
            selectedNodeIds: selectedNodeIds.slice(),
            selectedConnectorId: selectedConnectorId,
            highlightedNodeId: highlightedNodeId,
            stageDiagramHighlighted: stageDiagramHighlighted,
            stageZoom: stageZoom
        };
    }

    function pushStageUndoSnapshot() {
        const snapshot = createStageUndoSnapshot();

        if (!snapshot) {
            return;
        }

        stageUndoStack.push(snapshot);

        if (stageUndoStack.length > stageUndoLimit) {
            stageUndoStack.shift();
        }

        updateUndoButton();
    }

    function clearStageUndoHistory() {
        stageUndoStack = [];
        updateUndoButton();
    }

    function undoStageEdit() {
        const snapshot = stageUndoStack.pop();

        if (!snapshot) {
            updateUndoButton();
            return false;
        }

        layoutOverrides = cloneStageValue(snapshot.layoutOverrides);
        connectorOverrides = cloneConnectorOverrides(snapshot.connectorOverrides);
        selectedNodeId = String(snapshot.selectedNodeId || '');
        selectedNodeIds = Array.isArray(snapshot.selectedNodeIds) ? snapshot.selectedNodeIds.slice() : (selectedNodeId ? [selectedNodeId] : []);
        selectedConnectorId = String(snapshot.selectedConnectorId || '');
        highlightedNodeId = String(snapshot.highlightedNodeId || '');
        stageDiagramHighlighted = Boolean(snapshot.stageDiagramHighlighted);
        stageZoom = Number.isFinite(snapshot.stageZoom) ? snapshot.stageZoom : 50;
        setValue('architectureCampusNetworkCiscoZoomInput', stageZoom);
        updateHighlightAllButton();
        updateUndoButton();
        renderResult(snapshot.spec);
        return true;
    }

    function setStageDiagramHighlighted(isHighlighted) {
        if (stageDiagramHighlighted === Boolean(isHighlighted)) {
            return;
        }

        if (currentSpec) {
            pushStageUndoSnapshot();
        }

        stageDiagramHighlighted = Boolean(isHighlighted);
        updateHighlightAllButton();

        if (currentSpec) {
            renderResult(currentSpec);
        } else if (previewTopology) {
            const stageCanvas = byId('architectureCampusNetworkCiscoStageCanvas');

            if (stageCanvas) {
                stageCanvas.innerHTML = buildSvgMarkup(previewTopology) + createPresetPreviewOverlay();
                applyStageZoom();
            }
        }
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function textWithoutInfoMarker(element, markerClass) {
        const clone = element.cloneNode(true);

        clone.querySelectorAll('.' + markerClass).forEach(function (marker) {
            marker.remove();
        });

        return clone.textContent.replace(/\s+/g, ' ').trim();
    }

    function workspaceInfoText(element, markerClass) {
        const label = textWithoutInfoMarker(element, markerClass);

        return label;
    }

    function applyWorkspaceInfoMarkers() {
        const root = document.querySelector('.architecture-campus-network-cisco-tool');
        const markerClass = 'architecture-campus-network-cisco-info-marker';

        if (!root) {
            return;
        }

        Array.from(root.querySelectorAll([
            '.tool-control-hint'
        ].join(', '))).forEach(function (element) {
            const infoText = workspaceInfoText(element, markerClass);
            let marker = Array.from(element.children).find(function (child) {
                return child.classList && child.classList.contains(markerClass);
            });

            if (!infoText) {
                return;
            }

            if (!marker) {
                marker = document.createElement('span');
                marker.className = markerClass;
                marker.tabIndex = 0;
                marker.innerHTML = '<span class="architecture-campus-network-cisco-info-glyph" aria-hidden="true">i</span>';
                element.appendChild(marker);
            }

            let popover = marker.querySelector('.architecture-campus-network-cisco-info-popover');

            if (!popover) {
                popover = document.createElement('span');
                popover.className = 'architecture-campus-network-cisco-info-popover';
                popover.setAttribute('role', 'tooltip');
                marker.appendChild(popover);
            }

            if (!marker.dataset.infoBound) {
                marker.dataset.infoBound = 'true';
                marker.addEventListener('mouseenter', function () {
                    marker.classList.add('is-open');
                });
                marker.addEventListener('mouseleave', function () {
                    marker.classList.remove('is-open');
                });
                marker.addEventListener('focus', function () {
                    marker.classList.add('is-open');
                });
                marker.addEventListener('blur', function () {
                    marker.classList.remove('is-open');
                });
                marker.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    marker.classList.toggle('is-open');
                });
            }

            marker.dataset.info = infoText;
            marker.setAttribute('aria-label', 'More info: ' + infoText);
            popover.textContent = infoText;
        });
    }

    function createStageToneChip(iconClass, label, tone) {
        return [
            '<span class="architecture-campus-network-cisco-score-tag architecture-campus-network-cisco-score-tag-' + escapeHtml(tone) + '">',
            '<i class="' + escapeHtml(iconClass) + '" aria-hidden="true"></i>',
            '<span>' + escapeHtml(label) + '</span>',
            '</span>'
        ].join('');
    }

    function getToolRoot() {
        return document.querySelector('.architecture-campus-network-cisco-tool');
    }

    function cssVar(name, fallback) {
        const root = getToolRoot();
        const value = root ? globalScope.getComputedStyle(root).getPropertyValue(name).trim() : '';

        return value || fallback;
    }

    function loadChartJs() {
        if (!chartJsPromise) {
            chartJsPromise = import('chart.js')
                .then(function (chartModule) {
                    if (!chartModule.Chart || !Array.isArray(chartModule.registerables)) {
                        return null;
                    }

                    if (!chartModule.Chart.__architectureCampusNetworkCiscoRegistered) {
                        chartModule.Chart.register.apply(chartModule.Chart, chartModule.registerables);
                        chartModule.Chart.__architectureCampusNetworkCiscoRegistered = true;
                    }

                    return chartModule.Chart;
                })
                .catch(function () {
                    return null;
                });
        }

        return chartJsPromise;
    }

    function destroyScoreChart() {
        if (scoreChartInstance) {
            scoreChartInstance.destroy();
            scoreChartInstance = null;
        }
    }

    function getSelectedNativeOption(selectElement) {
        return Array.from(selectElement.options).find(function (option) {
            return option.value === selectElement.value;
        }) || selectElement.options[0] || null;
    }

    function closeCustomSelects(exceptControl) {
        customSelectControls.forEach(function (control) {
            if (exceptControl && control === exceptControl) {
                return;
            }

            control.wrapper.classList.remove('open');
            control.button.setAttribute('aria-expanded', 'false');
        });
    }

    function syncCustomSelectControl(control) {
        const selectedOption = getSelectedNativeOption(control.selectElement);
        const selectedValue = selectedOption ? selectedOption.value : '';

        control.valueElement.textContent = selectedOption ? selectedOption.textContent : '';
        control.optionButtons.forEach(function (optionButton) {
            const isSelected = optionButton.dataset.value === selectedValue;

            optionButton.classList.toggle('selected', isSelected);
            optionButton.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });
    }

    function syncCustomSelectByElement(selectElement) {
        const control = customSelectControls.find(function (candidate) {
            return candidate.selectElement === selectElement;
        });

        if (control) {
            syncCustomSelectControl(control);
        }
    }

    function syncCustomSelects() {
        customSelectControls.forEach(syncCustomSelectControl);
    }

    function focusSelectedCustomOption(control) {
        const selectedButton = control.optionButtons.find(function (optionButton) {
            return optionButton.classList.contains('selected');
        }) || control.optionButtons[0];

        if (selectedButton) {
            selectedButton.focus();
        }
    }

    function openCustomSelect(control) {
        closeCustomSelects(control);
        syncCustomSelectControl(control);
        control.wrapper.classList.add('open');
        control.button.setAttribute('aria-expanded', 'true');
    }

    function toggleCustomSelect(control) {
        if (control.wrapper.classList.contains('open')) {
            closeCustomSelects();
            return;
        }

        openCustomSelect(control);
    }

    function selectCustomOption(control, value) {
        if (control.selectElement.value === value) {
            closeCustomSelects();
            return;
        }

        control.selectElement.value = value;
        syncCustomSelectControl(control);
        control.selectElement.dispatchEvent(new Event('change', {
            bubbles: true
        }));
        closeCustomSelects();
    }

    function initializeCustomSelect(selectElement) {
        const wrapper = document.createElement('div');
        const button = document.createElement('button');
        const valueElement = document.createElement('span');
        const icon = document.createElement('i');
        const menu = document.createElement('div');

        if (!selectElement || selectElement.dataset.architectureCampusNetworkCiscoEnhancedSelect === 'true') {
            return;
        }

        wrapper.className = 'architecture-campus-network-cisco-custom-select';
        button.type = 'button';
        button.className = 'architecture-campus-network-cisco-custom-select-trigger';
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');
        valueElement.className = 'architecture-campus-network-cisco-custom-select-value';
        icon.className = 'bi bi-chevron-down';
        icon.setAttribute('aria-hidden', 'true');
        menu.className = 'architecture-campus-network-cisco-custom-select-menu';
        menu.setAttribute('role', 'listbox');

        button.appendChild(valueElement);
        button.appendChild(icon);
        wrapper.appendChild(button);
        wrapper.appendChild(menu);
        selectElement.classList.add('architecture-campus-network-cisco-native-select');
        selectElement.dataset.architectureCampusNetworkCiscoEnhancedSelect = 'true';
        selectElement.setAttribute('aria-hidden', 'true');
        selectElement.tabIndex = -1;
        selectElement.insertAdjacentElement('afterend', wrapper);

        const control = {
            selectElement: selectElement,
            wrapper: wrapper,
            button: button,
            valueElement: valueElement,
            menu: menu,
            optionButtons: []
        };

        Array.from(selectElement.options).forEach(function (option) {
            const optionButton = document.createElement('button');

            optionButton.type = 'button';
            optionButton.className = 'architecture-campus-network-cisco-custom-select-option';
            optionButton.dataset.value = option.value;
            optionButton.textContent = option.textContent;
            optionButton.setAttribute('role', 'option');
            optionButton.addEventListener('click', function () {
                selectCustomOption(control, option.value);
                button.focus();
            });
            optionButton.addEventListener('keydown', function (event) {
                const currentIndex = control.optionButtons.indexOf(optionButton);

                event.stopPropagation();

                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    control.optionButtons[Math.min(control.optionButtons.length - 1, currentIndex + 1)].focus();
                }

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    control.optionButtons[Math.max(0, currentIndex - 1)].focus();
                }

                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectCustomOption(control, option.value);
                    button.focus();
                }

                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeCustomSelects();
                    button.focus();
                }
            });

            menu.appendChild(optionButton);
            control.optionButtons.push(optionButton);
        });

        button.addEventListener('click', function () {
            toggleCustomSelect(control);
        });
        button.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault();
                event.stopPropagation();
                openCustomSelect(control);
                focusSelectedCustomOption(control);
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                closeCustomSelects();
            }
        });
        selectElement.addEventListener('change', function () {
            syncCustomSelectControl(control);
        });

        customSelectControls.push(control);
        syncCustomSelectControl(control);
    }

    function initializeCustomSelects() {
        customSelectIds.forEach(function (id) {
            initializeCustomSelect(byId(id));
        });
    }

    function showError(message) {
        const errorState = byId('architectureCampusNetworkCiscoErrorState');

        if (!errorState) {
            return;
        }

        errorState.textContent = message;
        setHidden(errorState, false);
    }

    function clearError() {
        setHidden(byId('architectureCampusNetworkCiscoErrorState'), true);
    }

    function getPreset(presetId) {
        return core.getPreset(presetId);
    }

    function validateRequiredElements(root) {
        const missingIds = requiredIds.filter(function (id) {
            return !byId(id);
        });

        if (!root || missingIds.length > 0 || !core) {
            const message = 'Cisco campus topology markup is incomplete: ' + missingIds.join(', ');

            if (window.console && window.console.warn) {
                window.console.warn(message);
            }

            return false;
        }

        return true;
    }

    function bindClick(id, handler) {
        const element = byId(id);

        if (element) {
            element.addEventListener('click', handler);
        }
    }

    function buildDefaultPrompt(preset) {
        const defaults = preset.defaults;
        const vlanText = defaults.vlans.join(', ');
        const services = [];

        if (defaults.wireless) {
            services.push('wireless controller');
        }

        if (defaults.firewall) {
            services.push('Cisco Secure Firewall');
        }

        if (defaults.wan) {
            services.push('WAN edge');
        }

        if (defaults.monitoring) {
            services.push('monitoring');
        }

        if (defaults.dhcpDns) {
            services.push('DHCP and DNS');
        }

        if (defaults.hsrp) {
            services.push('HSRP');
        }

        if (defaults.etherChannel) {
            services.push('EtherChannel trunks');
        }

        if (defaults.acl) {
            services.push('ACL policy boundary');
        }

        if (defaults.nat) {
            services.push('NAT at the edge');
        }

        if (defaults.vpn) {
            services.push('VPN tunnel');
        }

        return [
            'Create a ' + defaults.campusSize + ' Cisco campus topology with ' + defaults.accessBlocks + ' access blocks.',
            'Use ' + vlanText + '.',
            'Add ' + services.join(', ') + ', and ' + core.routingLabel(defaults.routingMode) + ' routing.'
        ].join(' ');
    }

    function syncPresetDescription() {
        setText('architectureCampusNetworkCiscoPresetDescription', getPreset(valueOf('architectureCampusNetworkCiscoPreset')).description);
    }

    function collectValues() {
        return {
            preset: valueOf('architectureCampusNetworkCiscoPreset'),
            presetLabel: getPreset(valueOf('architectureCampusNetworkCiscoPreset')).label,
            campusSize: valueOf('architectureCampusNetworkCiscoSize'),
            accessBlocks: Number(valueOf('architectureCampusNetworkCiscoAccessBlocks')),
            vlans: valueOf('architectureCampusNetworkCiscoVlans'),
            wireless: checkedOf('architectureCampusNetworkCiscoWireless'),
            firewall: checkedOf('architectureCampusNetworkCiscoFirewall'),
            wan: checkedOf('architectureCampusNetworkCiscoWan'),
            monitoring: checkedOf('architectureCampusNetworkCiscoMonitoring'),
            dhcpDns: checkedOf('architectureCampusNetworkCiscoDhcpDns'),
            routingMode: valueOf('architectureCampusNetworkCiscoRouting'),
            hsrp: checkedOf('architectureCampusNetworkCiscoHsrp'),
            etherChannel: checkedOf('architectureCampusNetworkCiscoEtherChannel'),
            acl: checkedOf('architectureCampusNetworkCiscoAcl'),
            nat: checkedOf('architectureCampusNetworkCiscoNat'),
            vpn: checkedOf('architectureCampusNetworkCiscoVpn'),
            trunkVlans: valueOf('architectureCampusNetworkCiscoTrunkVlans'),
            nativeVlan: valueOf('architectureCampusNetworkCiscoNativeVlan'),
            accessVlan: valueOf('architectureCampusNetworkCiscoAccessVlan'),
            sviGateway: valueOf('architectureCampusNetworkCiscoSviGateway'),
            ospfArea: valueOf('architectureCampusNetworkCiscoOspfArea'),
            bgpAsn: valueOf('architectureCampusNetworkCiscoBgpAsn'),
            redundancyVip: valueOf('architectureCampusNetworkCiscoRedundancyVip'),
            prompt: valueOf('architectureCampusNetworkCiscoPrompt')
        };
    }

    function syncControlsFromSpec(spec) {
        setValue('architectureCampusNetworkCiscoPreset', spec.preset);
        setValue('architectureCampusNetworkCiscoSize', spec.campusSize);
        setValue('architectureCampusNetworkCiscoAccessBlocks', spec.accessBlocks);
        setValue('architectureCampusNetworkCiscoRouting', spec.routingMode);
        setValue('architectureCampusNetworkCiscoVlans', spec.vlans.join('\n'));
        setChecked('architectureCampusNetworkCiscoWireless', spec.wireless);
        setChecked('architectureCampusNetworkCiscoFirewall', spec.firewall);
        setChecked('architectureCampusNetworkCiscoWan', spec.wan);
        setChecked('architectureCampusNetworkCiscoMonitoring', spec.monitoring);
        setChecked('architectureCampusNetworkCiscoDhcpDns', spec.dhcpDns);
        setChecked('architectureCampusNetworkCiscoHsrp', spec.hsrp);
        setChecked('architectureCampusNetworkCiscoEtherChannel', spec.etherChannel);
        setChecked('architectureCampusNetworkCiscoAcl', spec.acl);
        setChecked('architectureCampusNetworkCiscoNat', spec.nat);
        setChecked('architectureCampusNetworkCiscoVpn', spec.vpn);
        setValue('architectureCampusNetworkCiscoTrunkVlans', spec.trunkVlans);
        setValue('architectureCampusNetworkCiscoNativeVlan', spec.nativeVlan);
        setValue('architectureCampusNetworkCiscoAccessVlan', spec.accessVlan);
        setValue('architectureCampusNetworkCiscoSviGateway', spec.sviGateway);
        setValue('architectureCampusNetworkCiscoOspfArea', spec.ospfArea);
        setValue('architectureCampusNetworkCiscoBgpAsn', spec.bgpAsn);
        setValue('architectureCampusNetworkCiscoRedundancyVip', spec.redundancyVip);

        if (spec.prompt) {
            setValue('architectureCampusNetworkCiscoPrompt', spec.prompt);
        }

        syncPresetDescription();
    }

    function applyPreset(presetId, shouldRender) {
        const preset = getPreset(presetId);
        const spec = core.inferFromPrompt(Object.assign({}, preset.defaults, {
            preset: preset.id,
            presetLabel: preset.label,
            prompt: buildDefaultPrompt(preset)
        }));

        layoutOverrides = {};
        connectorOverrides = {};
        selectedNodeId = '';
        selectedNodeIds = [];
        selectedConnectorId = '';
        highlightedNodeId = '';
        stageDiagramHighlighted = false;
        clearStageUndoHistory();
        updateHighlightAllButton();
        syncControlsFromSpec(spec);

        if (shouldRender) {
            renderResult(spec, {
                autoFitStage: true
            });
        } else {
            renderPresetPreview(preset, {
                resetZoom: true
            });
        }
    }

    function getNodeById(nodeId) {
        if (!currentTopology) {
            return null;
        }

        return currentTopology.nodes.find(function (node) {
            return node.id === nodeId;
        }) || null;
    }

    function getGroupById(groupId) {
        if (!currentTopology) {
            return null;
        }

        return (currentTopology.groups || []).find(function (group) {
            return group.id === groupId;
        }) || null;
    }

    function getBaseSvgBounds(topology) {
        const items = [].concat(topology.groups || [], topology.nodes || []);
        const maxX = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.x + item.width);
        }, topology.width || 1120);
        const maxY = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.y + item.height);
        }, topology.height || 840);

        return {
            width: Math.max(topology.width || 1120, Math.ceil(maxX + 80)),
            height: Math.max(topology.height || 840, Math.ceil(maxY + 80))
        };
    }

    function getDiagramItemById(itemId) {
        return getNodeById(itemId) || getGroupById(itemId);
    }

    function getAllDiagramItems() {
        if (!currentTopology) {
            return [];
        }

        return [].concat(currentTopology.groups || [], currentTopology.nodes || []).filter(Boolean);
    }

    function isDiagramGroup(itemId) {
        return getGroupById(itemId) !== null;
    }

    function isDiagramItemSelected(itemId) {
        return selectedNodeIds.includes(itemId) || selectedNodeId === itemId;
    }

    function normalizeSelectedNodeIds(nodeIds) {
        return Array.from(new Set((nodeIds || []).map(function (nodeId) {
            return String(nodeId || '').trim();
        }).filter(function (nodeId) {
            return nodeId !== '' && getDiagramItemById(nodeId) !== null;
        })));
    }

    function getSelectedDiagramItems() {
        return normalizeSelectedNodeIds(selectedNodeIds).map(function (nodeId) {
            return getDiagramItemById(nodeId);
        }).filter(Boolean);
    }

    function isDiagramItemInsideGroup(item, group) {
        if (!item || !group || item.id === group.id) {
            return false;
        }

        const centerX = item.x + (item.width / 2);
        const centerY = item.y + (item.height / 2);

        return centerX >= group.x &&
            centerX <= group.x + group.width &&
            centerY >= group.y &&
            centerY <= group.y + group.height;
    }

    function getMovableDiagramItems(itemId) {
        const item = getDiagramItemById(itemId);

        if (!item) {
            return [];
        }

        if (!isDiagramGroup(itemId)) {
            return [item];
        }

        return getAllDiagramItems().filter(function (candidate) {
            return candidate.id === itemId || isDiagramItemInsideGroup(candidate, item);
        });
    }

    function getSelectionMoveItems(itemId) {
        const selectedIds = selectedNodeIds.length > 1 && selectedNodeIds.includes(itemId)
            ? selectedNodeIds
            : [itemId];
        const seenItems = {};

        selectedIds.forEach(function (selectedId) {
            getMovableDiagramItems(selectedId).forEach(function (item) {
                seenItems[item.id] = item;
            });
        });

        return Object.keys(seenItems).map(function (id) {
            return seenItems[id];
        });
    }

    function writeMoveLayoutOverrides(items, deltaX, deltaY) {
        items.forEach(function (item) {
            layoutOverrides[item.id] = {
                x: Math.max(0, Math.round(item.x + deltaX)),
                y: Math.max(0, Math.round(item.y + deltaY)),
                width: item.width,
                height: item.height
            };
        });
    }

    function applyGroupLayoutOverrides(topology) {
        return Object.assign({}, topology, {
            groups: (topology.groups || []).map(function (group) {
                const override = layoutOverrides[group.id];

                return override ? Object.assign({}, group, override) : group;
            })
        });
    }

    function nodeCenter(node) {
        return {
            x: node.x + (node.width / 2),
            y: node.y + (node.height / 2)
        };
    }

    function formatSvgNumber(value) {
        return Math.round(Number(value || 0) * 100) / 100;
    }

    function connectorAnchor(source, target) {
        const start = nodeCenter(source);
        const end = nodeCenter(target);
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return {
                source: {
                    x: deltaX >= 0 ? source.x + source.width : source.x,
                    y: start.y
                },
                target: {
                    x: deltaX >= 0 ? target.x : target.x + target.width,
                    y: end.y
                },
                mode: 'horizontal'
            };
        }

        return {
            source: {
                x: start.x,
                y: deltaY >= 0 ? source.y + source.height : source.y
            },
            target: {
                x: end.x,
                y: deltaY >= 0 ? target.y : target.y + target.height
            },
            mode: 'vertical'
        };
    }

    function connectorPath(source, target) {
        const anchors = connectorAnchor(source, target);
        const start = anchors.source;
        const end = anchors.target;

        if (anchors.mode === 'horizontal') {
            const midX = start.x + ((end.x - start.x) * 0.5);

            return [
                'M', formatSvgNumber(start.x), formatSvgNumber(start.y),
                'L', formatSvgNumber(midX), formatSvgNumber(start.y),
                'L', formatSvgNumber(midX), formatSvgNumber(end.y),
                'L', formatSvgNumber(end.x), formatSvgNumber(end.y)
            ].join(' ');
        }

        const midY = start.y + ((end.y - start.y) * 0.5);

        return [
            'M', formatSvgNumber(start.x), formatSvgNumber(start.y),
            'L', formatSvgNumber(start.x), formatSvgNumber(midY),
            'L', formatSvgNumber(end.x), formatSvgNumber(midY),
            'L', formatSvgNumber(end.x), formatSvgNumber(end.y)
        ].join(' ');
    }

    function connectorLabelPoint(source, target) {
        const anchors = connectorAnchor(source, target);
        const start = anchors.source;
        const end = anchors.target;

        return {
            x: start.x + ((end.x - start.x) * 0.5),
            y: start.y + ((end.y - start.y) * 0.5) - 8
        };
    }

    function iconMarkup(key) {
        return iconSvgMap[key] || iconSvgMap.accessSwitch || '';
    }

    function connectorLabelWidth(label) {
        return Math.min(174, Math.max(54, String(label || '').length * 6.6 + 18));
    }

    function diagramStyleMarkup() {
        return [
            '<style>',
            '.architecture-campus-network-cisco-canvas-bg{fill:transparent;}',
            '.architecture-campus-network-cisco-diagram-group-card{fill:#ffffff;stroke:#c7d7ea;stroke-width:1.2;}',
            '.architecture-campus-network-cisco-diagram-group-site .architecture-campus-network-cisco-diagram-group-card{fill:#f4f8ff;stroke:#8fb3dd;}',
            '.architecture-campus-network-cisco-diagram-group-edge .architecture-campus-network-cisco-diagram-group-card{fill:#ecfeff;stroke:#06B6D4;}',
            '.architecture-campus-network-cisco-diagram-group-wireless .architecture-campus-network-cisco-diagram-group-card{fill:#ecfdf5;stroke:#10B981;}',
            '.architecture-campus-network-cisco-diagram-group-core .architecture-campus-network-cisco-diagram-group-card{fill:#edf5ff;stroke:#06B6D4;stroke-width:1.8;}',
            '.architecture-campus-network-cisco-diagram-group-distribution .architecture-campus-network-cisco-diagram-group-card{fill:#ecfdf5;stroke:#10B981;}',
            '.architecture-campus-network-cisco-diagram-group-access .architecture-campus-network-cisco-diagram-group-card{fill:#ecfeff;stroke:#0891b2;}',
            '.architecture-campus-network-cisco-diagram-group-services .architecture-campus-network-cisco-diagram-group-card{fill:#f2fbf9;stroke:#0f766e;}',
            '.architecture-campus-network-cisco-diagram-group-title{fill:#0f1f35;font:800 14px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-campus-network-cisco-diagram-group-subtitle{fill:#556b82;font:600 12px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-campus-network-cisco-node-outline{fill:#fff;stroke:#8fb3dd;stroke-width:1.4;filter:url(#architectureCampusNetworkCiscoCardShadow);}',
            '.architecture-campus-network-cisco-connector-group{cursor:pointer;outline:none;}',
            '.architecture-campus-network-cisco-connector-hit{fill:none;stroke:transparent;stroke-width:14;stroke-linecap:round;stroke-linejoin:round;pointer-events:stroke;}',
            '.architecture-campus-network-cisco-connector{fill:none;stroke:#111827;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}',
            '.architecture-campus-network-cisco-connector-label-bg{fill:#fff;stroke:#c7d7ea;stroke-width:1;}',
            '.architecture-campus-network-cisco-connector-label{fill:#1f3349;font:700 11px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-campus-network-cisco-connector-group.is-selected .architecture-campus-network-cisco-connector{stroke:#111827;stroke-width:3.2;}',
            '.architecture-campus-network-cisco-connector-group.is-selected .architecture-campus-network-cisco-connector-label-bg{fill:#fff;stroke:#06B6D4;stroke-width:2;}',
            '.architecture-campus-network-cisco-connector-group.is-selected .architecture-campus-network-cisco-connector-label{fill:#0f172a;}',
            '.architecture-campus-network-cisco-diagram-group,.architecture-campus-network-cisco-node-shell{cursor:grab;}',
            '.architecture-campus-network-cisco-diagram-hitbox{fill:transparent;pointer-events:all;vector-effect:non-scaling-stroke;}',
            '.architecture-campus-network-cisco-diagram-group:active,.architecture-campus-network-cisco-node-shell:active{cursor:grabbing;}',
            '.architecture-campus-network-cisco-diagram-group.is-selected .architecture-campus-network-cisco-diagram-hitbox,.architecture-campus-network-cisco-node-shell.is-selected .architecture-campus-network-cisco-diagram-hitbox{stroke:#06B6D4;stroke-width:3;stroke-dasharray:10 7;}',
            '.architecture-campus-network-cisco-diagram-group.is-highlighted .architecture-campus-network-cisco-diagram-hitbox,.architecture-campus-network-cisco-node-shell.is-highlighted .architecture-campus-network-cisco-diagram-hitbox{stroke:#0f766e;stroke-width:3;stroke-dasharray:10 7;}',
            '.architecture-campus-network-cisco-diagram-group.is-selected .architecture-campus-network-cisco-diagram-group-card{stroke:#06B6D4;stroke-width:2.8;stroke-dasharray:10 7;}',
            '.architecture-campus-network-cisco-diagram-group.is-highlighted .architecture-campus-network-cisco-diagram-group-card{stroke:#0f766e;stroke-width:2.8;stroke-dasharray:10 7;}',
            '.architecture-campus-network-cisco-resize-handle{fill:#fff;stroke:#06B6D4;stroke-width:2;cursor:nwse-resize;filter:url(#architectureCampusNetworkCiscoCardShadow);}',
            '.architecture-campus-network-cisco-marquee-selection{fill:rgba(6,182,212,0.1);stroke:#fff;stroke-width:3;stroke-dasharray:8 6;pointer-events:none;filter:drop-shadow(0 6px 14px rgba(15,23,42,0.24));}',
            '.architecture-campus-network-cisco-stage-highlighted .architecture-campus-network-cisco-diagram-group-card{stroke:#06B6D4;stroke-width:2.2;}',
            '.architecture-campus-network-cisco-stage-highlighted .architecture-campus-network-cisco-node-outline{stroke:#06B6D4;stroke-width:2.8;}',
            '.architecture-campus-network-cisco-stage-highlighted .architecture-campus-network-cisco-connector{stroke:#111827;stroke-width:2.4;}',
            '</style>'
        ].join('');
    }

    function diagramItemDataAttributes(item) {
        return [
            'data-node-id="' + escapeHtml(item.id) + '"',
            'data-node-x="' + formatSvgNumber(item.x) + '"',
            'data-node-y="' + formatSvgNumber(item.y) + '"',
            'data-node-width="' + formatSvgNumber(item.width) + '"',
            'data-node-height="' + formatSvgNumber(item.height) + '"'
        ].join(' ');
    }

    function renderDiagramGroup(group) {
        const subtitle = String(group.subtitle || '').trim();
        const classes = [
            'architecture-campus-network-cisco-diagram-group',
            'architecture-campus-network-cisco-diagram-group-' + (group.tone || 'default'),
            isDiagramItemSelected(group.id) ? 'is-selected' : '',
            group.id === highlightedNodeId || stageDiagramHighlighted ? 'is-highlighted' : ''
        ].filter(Boolean).join(' ');

        return [
            '<g class="' + escapeHtml(classes) + '" ' + diagramItemDataAttributes(group) + ' tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml(group.title || '') + '">',
            '<rect class="architecture-campus-network-cisco-diagram-group-card" x="' + group.x + '" y="' + group.y + '" width="' + group.width + '" height="' + group.height + '" rx="18" />',
            '<text class="architecture-campus-network-cisco-diagram-group-title" x="' + (group.x + 18) + '" y="' + (group.y + 28) + '">' + escapeHtml(group.title || '') + '</text>',
            subtitle ? '<text class="architecture-campus-network-cisco-diagram-group-subtitle" x="' + (group.x + 18) + '" y="' + (group.y + 48) + '">' + escapeHtml(subtitle) + '</text>' : '',
            '<rect class="architecture-campus-network-cisco-diagram-hitbox" x="' + group.x + '" y="' + group.y + '" width="' + group.width + '" height="' + group.height + '" rx="18" />',
            '</g>'
        ].join('');
    }

    function renderResizeHandle(item) {
        return [
            '<rect class="architecture-campus-network-cisco-resize-handle" data-node-id="' + escapeHtml(item.id) + '" x="' + formatSvgNumber(item.x + item.width - 14) + '" y="' + formatSvgNumber(item.y + item.height - 14) + '" width="14" height="14" rx="4" aria-hidden="true" />'
        ].join('');
    }

    function computeSvgBounds(topology) {
        const items = [].concat(topology.groups || [], topology.nodes || []).filter(Boolean);
        const maxX = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.x + item.width);
        }, topology.width || 1120);
        const maxY = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.y + item.height);
        }, topology.height || 840);

        return {
            width: Math.max(topology.width || 1120, Math.ceil(maxX + 80)),
            height: Math.max(topology.height || 840, Math.ceil(maxY + 80))
        };
    }

    function computeDiagramContentBounds(topology, padding) {
        const items = [].concat(topology.groups || [], topology.nodes || []).filter(Boolean);
        const safePadding = Number.isFinite(padding) ? Math.max(0, padding) : 0;
        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = 0;
        let maxY = 0;

        items.forEach(function (item) {
            if (!Number.isFinite(item.x) || !Number.isFinite(item.y) || !Number.isFinite(item.width) || !Number.isFinite(item.height)) {
                return;
            }

            minX = Math.min(minX, item.x);
            minY = Math.min(minY, item.y);
            maxX = Math.max(maxX, item.x + item.width);
            maxY = Math.max(maxY, item.y + item.height);
        });

        if (!Number.isFinite(minX) || !Number.isFinite(minY) || maxX <= minX || maxY <= minY) {
            return null;
        }

        return {
            x: minX - safePadding,
            y: minY - safePadding,
            width: (maxX - minX) + (safePadding * 2),
            height: (maxY - minY) + (safePadding * 2)
        };
    }

    function scrollStageToBounds(bounds, behavior) {
        const stageCanvas = byId('architectureCampusNetworkCiscoStageCanvas');
        const svg = stageCanvas ? stageCanvas.querySelector('svg') : null;
        const viewBox = svg && svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : null;
        const renderedWidth = svg ? svg.getBoundingClientRect().width : 0;

        if (!stageCanvas || !svg || !bounds || !viewBox || viewBox.width <= 0 || renderedWidth <= 0 || typeof stageCanvas.scrollTo !== 'function') {
            return;
        }

        const scale = renderedWidth / viewBox.width;

        if (!Number.isFinite(scale) || scale <= 0) {
            return;
        }

        stageCanvas.scrollTo({
            left: Math.max(0, ((bounds.x + (bounds.width / 2)) * scale) - (stageCanvas.clientWidth / 2)),
            top: Math.max(0, ((bounds.y + (bounds.height / 2)) * scale) - (stageCanvas.clientHeight / 2)),
            behavior: behavior || 'auto'
        });
    }

    function buildSvgMarkup(topology, options) {
        const renderOptions = options || {};
        const svgBounds = computeSvgBounds(topology);
        const nodeMap = {};
        const groupMarkup = [];
        const connectorMarkup = [];
        const nodeMarkup = [];
        const resizeHandleMarkup = [];

        (topology.groups || []).forEach(function (group) {
            groupMarkup.push(renderDiagramGroup(group));
        });

        topology.nodes.forEach(function (node) {
            nodeMap[node.id] = node;
        });

        topology.connectors.forEach(function (connector) {
            const source = nodeMap[connector.from];
            const target = nodeMap[connector.to];

            if (!source || !target) {
                return;
            }

            const label = connectorLabelPoint(source, target);
            const labelWidth = connectorLabelWidth(connector.label);
            const connectorId = String(connector.id || '').trim();
            const connectorPathValue = connectorPath(source, target);
            const connectorClasses = [
                'architecture-campus-network-cisco-connector-group',
                selectedConnectorId === connectorId ? 'is-selected' : ''
            ].filter(Boolean).join(' ');

            connectorMarkup.push([
                '<g class="' + connectorClasses + '" data-connector-id="' + escapeHtml(connectorId) + '" tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml((connector.label || 'Connector') + ' connector') + '">',
                '<path class="architecture-campus-network-cisco-connector-hit" d="' + connectorPathValue + '" />',
                '<path class="architecture-campus-network-cisco-connector" d="' + connectorPathValue + '" marker-end="url(#architectureCampusNetworkCiscoArrow)" />',
                '<rect class="architecture-campus-network-cisco-connector-label-bg" x="' + formatSvgNumber(label.x - (labelWidth / 2)) + '" y="' + formatSvgNumber(label.y - 15) + '" width="' + formatSvgNumber(labelWidth) + '" height="18" rx="9" />',
                '<text class="architecture-campus-network-cisco-connector-label" x="' + label.x + '" y="' + label.y + '" text-anchor="middle">' + escapeHtml(connector.label) + '</text>',
                '</g>'
            ].join(''));
        });

        topology.nodes.forEach(function (node) {
            const classes = [
                'architecture-campus-network-cisco-node-shell',
                isDiagramItemSelected(node.id) ? 'is-selected' : '',
                node.id === highlightedNodeId || stageDiagramHighlighted ? 'is-highlighted' : ''
            ].filter(Boolean).join(' ');

            nodeMarkup.push([
                '<g class="' + classes + '" ' + diagramItemDataAttributes(node) + ' tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml(node.title) + '">',
                '<rect class="architecture-campus-network-cisco-node-outline" x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '" rx="10" />',
                '<foreignObject x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '">',
                '<div xmlns="http://www.w3.org/1999/xhtml" class="architecture-campus-network-cisco-node-card">',
                '<div class="architecture-campus-network-cisco-node-icon">' + iconMarkup(node.icon) + '</div>',
                '<div class="architecture-campus-network-cisco-node-copy">',
                '<div class="architecture-campus-network-cisco-node-title">' + escapeHtml(node.title) + '</div>',
                '<div class="architecture-campus-network-cisco-node-subtitle" title="' + escapeHtml(node.subtitle) + '">' + escapeHtml(node.subtitle) + '</div>',
                '</div>',
                '</div>',
                '</foreignObject>',
                '<rect class="architecture-campus-network-cisco-diagram-hitbox" x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '" rx="10" />',
                '</g>'
            ].join(''));
        });

        if (renderOptions.includeEditHandles === true) {
            (topology.groups || []).forEach(function (group) {
                if (group.id === selectedNodeId) {
                    resizeHandleMarkup.push(renderResizeHandle(group));
                }
            });

            topology.nodes.forEach(function (node) {
                if (node.id === selectedNodeId) {
                    resizeHandleMarkup.push(renderResizeHandle(node));
                }
            });
        }

        return [
            '<svg xmlns="http://www.w3.org/2000/svg" class="architecture-campus-network-cisco-stage-svg' + (stageDiagramHighlighted ? ' architecture-campus-network-cisco-stage-highlighted' : '') + '" viewBox="0 0 ' + svgBounds.width + ' ' + svgBounds.height + '" width="' + svgBounds.width + '" height="' + svgBounds.height + '" role="img" aria-label="Cisco campus network topology">',
            '<defs>',
            '<filter id="architectureCampusNetworkCiscoSoftShadow" x="-10%" y="-10%" width="120%" height="125%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.10"/></filter>',
            '<filter id="architectureCampusNetworkCiscoCardShadow" x="-18%" y="-18%" width="136%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.12"/></filter>',
            '<marker id="architectureCampusNetworkCiscoArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">',
            '<path d="M 0 0 L 10 5 L 0 10 z" fill="#111827" />',
            '</marker>',
            '</defs>',
            diagramStyleMarkup(),
            '<rect class="architecture-campus-network-cisco-canvas-bg" x="0" y="0" width="' + svgBounds.width + '" height="' + svgBounds.height + '" />',
            groupMarkup.join(''),
            connectorMarkup.join(''),
            nodeMarkup.join(''),
            resizeHandleMarkup.join(''),
            '</svg>'
        ].join('');
    }

    function setStageZoom(nextZoom) {
        const parsed = Number(nextZoom);

        stageZoom = Math.min(240, Math.max(15, Number.isFinite(parsed) ? parsed : 50));
        setValue('architectureCampusNetworkCiscoZoomInput', stageZoom);
        setText('architectureCampusNetworkCiscoZoomLabel', '%');
        applyStageZoom();
    }

    function applyStageZoom() {
        const svg = byId('architectureCampusNetworkCiscoStageCanvas') ? byId('architectureCampusNetworkCiscoStageCanvas').querySelector('svg') : null;
        const topology = currentTopology || previewTopology;

        if (!svg || !topology) {
            return;
        }

        const bounds = computeSvgBounds(topology);

        svg.style.width = Math.round(bounds.width * (stageZoom / 100)) + 'px';
        svg.style.height = Math.round(bounds.height * (stageZoom / 100)) + 'px';
    }

    function setStageZoomToFit() {
        const stageCanvas = byId('architectureCampusNetworkCiscoStageCanvas');
        const topology = currentTopology || previewTopology;

        if (!stageCanvas || !topology) {
            setStageZoom(50);
            return;
        }

        const availableWidth = Math.max(1, stageCanvas.clientWidth - 48);
        const availableHeight = Math.max(1, stageCanvas.clientHeight - 48);
        const bounds = computeDiagramContentBounds(topology, 42) || computeSvgBounds(topology);
        const widthZoom = (availableWidth / bounds.width) * 100;
        const heightZoom = (availableHeight / bounds.height) * 100;

        setStageZoom(Math.floor(Math.min(widthZoom, heightZoom, 100)));
        window.requestAnimationFrame(function () {
            scrollStageToBounds(bounds, 'auto');
        });
    }

    function renderStage(topology) {
        const stageCanvas = byId('architectureCampusNetworkCiscoStageCanvas');

        if (!stageCanvas) {
            return;
        }

        currentSvgMarkup = buildSvgMarkup(topology);
        stageCanvas.classList.remove('architecture-campus-network-cisco-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(topology, {
            includeEditHandles: true
        });
        applyStageZoom();
        bindStageNodes(stageCanvas);
        bindStageMarqueeSelection(stageCanvas.querySelector('svg'));
        focusPendingStageNode(stageCanvas);
    }

    function renderStageHeader(spec) {
        const stageTitle = byId('architectureCampusNetworkCiscoStageTitle');
        const stageSubtitle = byId('architectureCampusNetworkCiscoStageSubtitle');
        const presetChipLabel = String(spec.presetLabel || 'Custom architecture').trim() + ' preset';

        if (stageTitle) {
            stageTitle.textContent = 'Cisco Campus Network Architecture';
        }

        if (stageSubtitle) {
            stageSubtitle.hidden = false;
            stageSubtitle.innerHTML = '<span class="architecture-campus-network-cisco-stage-preset-chip" title="' + escapeHtml(presetChipLabel) + '">' + escapeHtml(presetChipLabel) + '</span>';
        }

        const meta = byId('architectureCampusNetworkCiscoStageMeta');

        if (!meta) {
            return;
        }

        meta.innerHTML = [
            createStageToneChip('bi bi-building', core.campusSizeLabel(spec.campusSize), 'size'),
            createStageToneChip('bi bi-grid-3x3-gap', spec.accessBlocks + ' access block' + (spec.accessBlocks === 1 ? '' : 's'), 'blocks'),
            createStageToneChip('bi bi-arrow-left-right', core.routingLabel(spec.routingMode), 'routing'),
            createStageToneChip('bi bi-diagram-3', spec.vlans.length + ' VLANs', 'services'),
            createStageToneChip('bi bi-shield-check', [spec.hsrp ? 'HSRP' : '', spec.etherChannel ? 'EtherChannel' : ''].filter(Boolean).join(' + ') || 'Trunk ' + spec.trunkVlans, 'redundancy')
        ].join('');
    }

    function renderInventory() {
        const tableBody = byId('architectureCampusNetworkCiscoInventoryTableBody');
        const sortMode = valueOf('architectureCampusNetworkCiscoInventorySort') || 'id';
        const rows = currentInventory.slice().sort(function (a, b) {
            if (sortMode === 'component') {
                return a.component.localeCompare(b.component);
            }

            if (sortMode === 'placement') {
                return a.placement.localeCompare(b.placement);
            }

            return a.index - b.index;
        });

        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = rows.map(function (row) {
            const copyText = [
                '#' + row.index + ' ' + row.component,
                'Placement: ' + row.placement,
                'Purpose: ' + row.purpose
            ].join('\n');

            return [
                '<tr>',
                '<td>' + row.index + '</td>',
                '<td>' + escapeHtml(row.component) + '</td>',
                '<td>' + escapeHtml(row.placement) + '</td>',
                '<td>' + escapeHtml(row.purpose) + '</td>',
                '<td><button type="button" class="architecture-campus-network-cisco-row-copy" data-copy-row="' + escapeHtml(copyText) + '" aria-label="Copy inventory row for ' + escapeHtml(row.component) + '"><i class="bi bi-clipboard" aria-hidden="true"></i><span class="architecture-campus-network-cisco-visually-hidden">Copy</span></button></td>',
                '</tr>'
            ].join('');
        }).join('');

        all('[data-copy-row]', tableBody).forEach(function (button) {
            button.addEventListener('click', function () {
                const label = button.querySelector('span') || button;

                copyTextToClipboard(button.dataset.copyRow || '').then(function () {
                    flashButton(label, 'Copied');
                }).catch(function () {
                    flashButton(label, 'Failed');
                });
            });
        });
    }

    function setInventorySortMode(sortMode) {
        const nextSortMode = ['id', 'component', 'placement'].includes(sortMode) ? sortMode : 'id';
        const hiddenInput = byId('architectureCampusNetworkCiscoInventorySort');
        const summary = byId('architectureCampusNetworkCiscoInventorySortSummary');
        const sortSelect = byId('architectureCampusNetworkCiscoInventorySortSelect');
        const sortOptions = all('.architecture-campus-network-cisco-sort-option');
        const activeOption = sortOptions.find(function (option) {
            return option.dataset.sortValue === nextSortMode;
        }) || sortOptions[0];

        if (hiddenInput) {
            hiddenInput.value = nextSortMode;
        }

        if (summary && activeOption) {
            summary.textContent = activeOption.textContent;
        }

        sortOptions.forEach(function (option) {
            const isActive = option === activeOption;

            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        if (sortSelect) {
            sortSelect.removeAttribute('open');
        }

        renderInventory();
    }

    function renderList(id, items) {
        const list = byId(id);

        if (!list) {
            return;
        }

        list.innerHTML = (items || []).map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('');
    }

    function renderNotes() {
        setText('architectureCampusNetworkCiscoPromptSummary', currentNotes.summary || '');
        renderList('architectureCampusNetworkCiscoKeywordList', currentNotes.keywords);
        renderList('architectureCampusNetworkCiscoAssumptionList', currentNotes.assumptions);
        renderList('architectureCampusNetworkCiscoModelList', currentNotes.model);
        renderList('architectureCampusNetworkCiscoProsList', currentNotes.pros);
        renderList('architectureCampusNetworkCiscoConsList', currentNotes.cons);
    }

    function scoreTone(score) {
        if (score >= 82) {
            return 'ready';
        }

        if (score >= 68) {
            return 'solid';
        }

        return 'review';
    }

    function scoreStatusIcon(tone) {
        return {
            ready: 'bi bi-check-circle',
            solid: 'bi bi-exclamation-triangle',
            review: 'bi bi-exclamation-triangle'
        }[tone] || 'bi bi-info-circle';
    }

    function scoreBand(tone) {
        return {
            ready: 'Production-ready campus architecture',
            solid: 'Delivery architecture draft',
            review: 'Needs architecture review'
        }[tone] || 'Campus architecture draft';
    }

    function renderScoreChart(score, tone) {
        const canvas = byId('architectureCampusNetworkCiscoScoreChart');
        const chartValue = Math.max(0, Math.min(100, Number(score) || 0));
        const chartGap = Math.max(0, 100 - chartValue);
        const scoreRingColor = cssVar('--tool-score-ring', '#15803d');

        if (!canvas) {
            return;
        }

        loadChartJs().then(function (Chart) {
            if (!Chart || !canvas.isConnected) {
                return;
            }

            scoreChartInstance = new Chart(canvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Score', 'Review gap'],
                    datasets: [{
                        data: [chartValue, chartGap],
                        backgroundColor: [
                            scoreRingColor,
                            cssVar('--tool-score-track', 'rgba(200, 220, 231, 0.96)')
                        ],
                        borderWidth: 0,
                        hoverOffset: 0,
                        spacing: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '72%',
                    rotation: -90,
                    circumference: 360,
                    events: [],
                    animation: {
                        duration: 360
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                }
            });
        });
    }

    function buildScoreTags(spec, tone) {
        const tags = [
            {
                tone: 'status-' + tone,
                icon: scoreStatusIcon(tone),
                label: tone === 'ready' ? 'Production Ready' : tone === 'solid' ? 'Delivery' : 'Needs work'
            },
            {
                tone: 'size',
                icon: 'bi bi-building',
                label: core.campusSizeLabel(spec.campusSize)
            },
            {
                tone: 'blocks',
                icon: 'bi bi-grid-3x3-gap',
                label: spec.accessBlocks + ' access block' + (spec.accessBlocks === 1 ? '' : 's')
            },
            {
                tone: 'routing',
                icon: 'bi bi-arrow-left-right',
                label: core.routingLabel(spec.routingMode)
            }
        ];

        if (spec.hsrp || spec.etherChannel) {
            tags.push({
                tone: 'redundancy',
                icon: 'bi bi-shield-check',
                label: [spec.hsrp ? 'HSRP' : '', spec.etherChannel ? 'EtherChannel' : ''].filter(Boolean).join(' + ')
            });
        }

        if (spec.firewall || spec.monitoring || spec.dhcpDns) {
            tags.push({
                tone: 'services',
                icon: 'bi bi-hdd-network',
                label: 'Services'
            });
        }

        return tags;
    }

    function renderScore(spec) {
        const score = core.buildTopologyScore(spec);
        const status = byId('architectureCampusNetworkCiscoOutputStatus');
        const tone = scoreTone(score.score);
        const ringRadius = 52;
        const ringCircumference = 2 * Math.PI * ringRadius;
        const ringTrackLength = Math.round(ringCircumference * 100) / 100;
        const ringRatio = score.score >= 100 ? 1 : score.score / 100;
        const ringProgressAngle = Math.round(Math.max(0, Math.min(100, score.score)) * 3.6);
        const ringProgressLength = score.score >= 100
            ? ringTrackLength
            : Math.round(ringRatio * ringCircumference * 100) / 100;
        const ringGapLength = score.score >= 100
            ? 0
            : Math.round((ringTrackLength - ringProgressLength) * 100) / 100;
        const tags = buildScoreTags(currentSpec || spec, tone);
        const labelIcon = scoreStatusIcon(tone);

        if (!status) {
            return;
        }

        destroyScoreChart();
        status.innerHTML = [
            '<div class="architecture-campus-network-cisco-score-ring-card architecture-campus-network-cisco-score-ring-card-' + escapeHtml(tone) + '" tabindex="0" role="group" aria-label="Topology score ' + escapeHtml(String(score.score)) + ' out of 100. ' + escapeHtml(score.label) + '">',
            '<div class="architecture-campus-network-cisco-score-value" style="--progress-angle: ' + escapeHtml(String(ringProgressAngle)) + 'deg;" aria-label="Topology score ' + escapeHtml(String(score.score)) + ' out of 100">',
            '<svg class="architecture-campus-network-cisco-score-ring" viewBox="0 0 140 140" aria-hidden="true" focusable="false">',
            '<circle class="architecture-campus-network-cisco-score-ring-track" cx="70" cy="70" r="' + escapeHtml(String(ringRadius)) + '"></circle>',
            '<circle class="architecture-campus-network-cisco-score-ring-glow" cx="70" cy="70" r="' + escapeHtml(String(ringRadius)) + '" transform="rotate(-90 70 70)" stroke-dasharray="' + escapeHtml(String(ringProgressLength)) + ' ' + escapeHtml(String(ringGapLength)) + '"></circle>',
            '<circle class="architecture-campus-network-cisco-score-ring-fill" cx="70" cy="70" r="' + escapeHtml(String(ringRadius)) + '" transform="rotate(-90 70 70)" stroke-dasharray="' + escapeHtml(String(ringProgressLength)) + ' ' + escapeHtml(String(ringGapLength)) + '"></circle>',
            '</svg>',
            '<div class="architecture-campus-network-cisco-score-center">',
            '<span class="architecture-campus-network-cisco-score-value-number">' + escapeHtml(String(score.score)) + '</span>',
            '<span class="architecture-campus-network-cisco-score-caption">/100</span>',
            '</div>',
            '</div>',
            '<span class="architecture-campus-network-cisco-score-label">',
            '<span class="architecture-campus-network-cisco-score-label-orb" aria-hidden="true"><i class="' + escapeHtml(labelIcon) + '"></i></span>',
            '<span class="architecture-campus-network-cisco-score-label-text">' + escapeHtml(score.label) + '</span>',
            '</span>',
            '</div>',
            '<div class="architecture-campus-network-cisco-score-copy">',
            '<div class="architecture-campus-network-cisco-score-kicker">Architecture Score</div>',
            '<div class="architecture-campus-network-cisco-score-summary">' + escapeHtml(scoreBand(tone)) + '</div>',
            '<div class="architecture-campus-network-cisco-score-detail">' + escapeHtml(score.summary) + '</div>',
            '<div class="architecture-campus-network-cisco-score-tags">',
            tags.map(function (tag) {
                return [
                    '<span class="architecture-campus-network-cisco-score-tag architecture-campus-network-cisco-score-tag-' + escapeHtml(tag.tone) + '">',
                    '<i class="' + escapeHtml(tag.icon) + '" aria-hidden="true"></i>',
                    '<span>' + escapeHtml(tag.label) + '</span>',
                    '</span>'
                ].join('');
            }).join(''),
            '</div>',
            '</div>'
        ].join('');
    }

    function clampAssessmentScore(score) {
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    function buildPillarBreakdown(spec) {
        const accessBlocks = Number(spec.accessBlocks) || 1;

        return [
            {
                label: 'Security',
                score: clampAssessmentScore(70 + (spec.firewall ? 12 : -8) + (spec.acl ? 5 : 0) + (spec.dhcpDns ? 4 : 0) + (spec.vpn ? 4 : 0)),
                icon: 'bi bi-shield-check',
                tone: 'security'
            },
            {
                label: 'Reliability',
                score: clampAssessmentScore(62 + (accessBlocks >= 2 ? 12 : -8) + (spec.hsrp ? 12 : 0) + (spec.etherChannel ? 8 : 0) + (spec.wan ? 5 : 0)),
                icon: 'bi bi-cloud-check',
                tone: 'reliability'
            },
            {
                label: 'Performance',
                score: clampAssessmentScore(72 + (spec.etherChannel ? 10 : 0) + (accessBlocks >= 3 ? 4 : 0) + (spec.routingMode === 'ospf' ? 5 : 0) + (spec.wireless ? 3 : 0)),
                icon: 'bi bi-lightning-charge',
                tone: 'performance'
            },
            {
                label: 'Cost Optimization',
                score: clampAssessmentScore(76 + (accessBlocks <= 2 ? 5 : 0) + (spec.routingMode === 'static' ? 3 : 0) + (spec.nat ? 2 : 0) + (spec.firewall ? -2 : 1)),
                icon: 'bi bi-currency-dollar',
                tone: 'cost'
            },
            {
                label: 'Operational Excellence',
                score: clampAssessmentScore(64 + (spec.monitoring ? 16 : 0) + (spec.dhcpDns ? 7 : 0) + (spec.routingMode !== 'static' ? 5 : 0) + (spec.wan ? 4 : 0)),
                icon: 'bi bi-gear',
                tone: 'operations'
            }
        ];
    }

    function buildRiskLevel(spec) {
        const scorePayload = core.buildTopologyScore(spec);
        const gapCount = [
            !spec.hsrp,
            !spec.etherChannel,
            !spec.firewall,
            !spec.monitoring,
            (Number(spec.accessBlocks) || 1) < 2
        ].filter(Boolean).length;
        let level = 'Low';
        let tone = 'low';
        let icon = 'bi bi-shield-check';
        let summary = 'No critical topology gaps detected.';
        let detail = 'Review VLAN segmentation, ACLs, routing policy, and change controls before production change approval.';

        if (scorePayload.score < 65 || gapCount >= 4) {
            level = 'High';
            tone = 'high';
            icon = 'bi bi-exclamation-octagon';
            summary = 'Several topology gaps need attention.';
            detail = 'Prioritize redundancy, security edge controls, routing resiliency, and monitoring before using this as a delivery baseline.';
        } else if (scorePayload.score < 75 || gapCount >= 3) {
            level = 'Elevated';
            tone = 'elevated';
            icon = 'bi bi-exclamation-triangle';
            summary = 'Some campus design trade-offs need review.';
            detail = 'Check the highlighted resilience, access control, and service ownership choices before handoff.';
        } else if (scorePayload.score < 85 || gapCount >= 2) {
            level = 'Moderate';
            tone = 'moderate';
            icon = 'bi bi-shield-exclamation';
            summary = 'A few design choices need confirmation.';
            detail = 'Validate uplink redundancy, segmentation policy, and operational ownership before rollout.';
        }

        return {
            level: level,
            tone: tone,
            icon: icon,
            summary: summary,
            detail: detail,
            generatedAt: new Date(),
            nextReviewAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };
    }

    function formatAssessmentDate(value) {
        return value.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    }

    function renderAssessmentSections(spec) {
        const pillarBreakdownOutput = byId('architectureCampusNetworkCiscoPillarBreakdown');
        const riskLevelOutput = byId('architectureCampusNetworkCiscoRiskLevel');

        if (!pillarBreakdownOutput || !riskLevelOutput) {
            return;
        }

        const pillars = buildPillarBreakdown(spec);
        const risk = buildRiskLevel(spec);

        pillarBreakdownOutput.className = 'architecture-campus-network-cisco-assessment-card architecture-campus-network-cisco-pillar-card';
        riskLevelOutput.className = 'architecture-campus-network-cisco-assessment-card architecture-campus-network-cisco-risk-card architecture-campus-network-cisco-risk-card-' + risk.tone;

        pillarBreakdownOutput.innerHTML = [
            '<h3 class="architecture-campus-network-cisco-result-section-title">Pillar Breakdown</h3>',
            '<div class="architecture-campus-network-cisco-pillar-list">',
            pillars.map(function (pillar) {
                return [
                    '<div class="architecture-campus-network-cisco-pillar-row architecture-campus-network-cisco-pillar-row-' + escapeHtml(pillar.tone) + '">',
                    '<span class="architecture-campus-network-cisco-pillar-icon" aria-hidden="true"><i class="' + escapeHtml(pillar.icon) + '"></i></span>',
                    '<span class="architecture-campus-network-cisco-pillar-name">' + escapeHtml(pillar.label) + '</span>',
                    '<span class="architecture-campus-network-cisco-pillar-meter" aria-hidden="true"><span style="--pillar-score: ' + escapeHtml(String(pillar.score)) + '%;"></span></span>',
                    '<span class="architecture-campus-network-cisco-pillar-score"><strong>' + escapeHtml(String(pillar.score)) + '</strong> /100</span>',
                    '</div>'
                ].join('');
            }).join(''),
            '</div>',
            '<div class="architecture-campus-network-cisco-pillar-legend" aria-label="Pillar score legend">',
            '<span><i class="architecture-campus-network-cisco-legend-dot architecture-campus-network-cisco-legend-dot-excellent"></i>Excellent (90-100)</span>',
            '<span><i class="architecture-campus-network-cisco-legend-dot architecture-campus-network-cisco-legend-dot-good"></i>Good (70-89)</span>',
            '<span><i class="architecture-campus-network-cisco-legend-dot architecture-campus-network-cisco-legend-dot-fair"></i>Fair (50-69)</span>',
            '<span><i class="architecture-campus-network-cisco-legend-dot architecture-campus-network-cisco-legend-dot-needs"></i>Needs improvement (&lt;50)</span>',
            '</div>'
        ].join('');

        riskLevelOutput.innerHTML = [
            '<h3 class="architecture-campus-network-cisco-result-section-title">Risk Level</h3>',
            '<div class="architecture-campus-network-cisco-risk-body">',
            '<div class="architecture-campus-network-cisco-risk-icon" aria-hidden="true"><i class="' + escapeHtml(risk.icon) + '"></i></div>',
            '<div class="architecture-campus-network-cisco-risk-copy">',
            '<div class="architecture-campus-network-cisco-risk-level">' + escapeHtml(risk.level) + '</div>',
            '<p>' + escapeHtml(risk.summary) + '<br>' + escapeHtml(risk.detail) + '</p>',
            '</div>',
            '</div>',
            '<div class="architecture-campus-network-cisco-risk-meta">',
            '<div>',
            '<span>Generated</span>',
            '<strong><i class="bi bi-calendar3" aria-hidden="true"></i>' + escapeHtml(formatAssessmentDate(risk.generatedAt)) + '</strong>',
            '</div>',
            '<div>',
            '<span>Next review</span>',
            '<strong><i class="bi bi-calendar3" aria-hidden="true"></i>' + escapeHtml(formatAssessmentDate(risk.nextReviewAt)) + '</strong>',
            '</div>',
            '</div>'
        ].join('');
    }

    function renderJson() {
        const jsonOutput = byId('architectureCampusNetworkCiscoJsonOutput');

        if (jsonOutput) {
            jsonOutput.textContent = JSON.stringify(currentPayload, null, 2);
        }
    }

    function buildControlsAuthoritativeSpec(values) {
        const source = values || collectValues();
        const spec = core.inferFromPrompt(Object.assign({}, source, {
            prompt: ''
        }));

        spec.prompt = String(source.prompt || '').trim();

        return spec;
    }

    function renderResult(spec, options) {
        const renderOptions = options || {};

        clearError();
        previewTopology = null;
        currentSpec = renderOptions.controlsAuthoritative === true
            ? buildControlsAuthoritativeSpec(spec)
            : core.inferFromPrompt(spec);
        currentTopology = applyGroupLayoutOverrides(core.buildTopology(currentSpec, layoutOverrides));
        currentInventory = core.buildInventory(currentTopology);
        currentNotes = core.buildPromptNotes(currentSpec);
        currentPayload = core.buildExportPayload(currentSpec, layoutOverrides, currentInventory, currentNotes);
        syncConnectorPayloadState();

        setHidden(byId('architectureCampusNetworkCiscoStageEmpty'), true);
        setHidden(byId('architectureCampusNetworkCiscoStageCanvas'), false);
        setHidden(byId('architectureCampusNetworkCiscoOutputEmpty'), true);
        setHidden(byId('architectureCampusNetworkCiscoOutputContent'), false);
        setHidden(byId('architectureCampusNetworkCiscoOutputStatus'), false);

        renderStageHeader(currentSpec);
        renderStage(currentTopology);

        if (renderOptions.autoFitStage === true) {
            setStageZoomToFit();
        }

        renderInventory();
        renderNotes();
        renderScore(currentSpec);
        renderAssessmentSections(currentSpec);
        renderJson();
        updateSelectedNodeEditor();
        updateHighlightAllButton();
        updateUndoButton();
    }

    function resetGeneratedTopologyState() {
        currentSpec = null;
        currentTopology = null;
        currentInventory = [];
        currentNotes = null;
        currentPayload = null;
        currentSvgMarkup = '';
        selectedNodeId = '';
        selectedNodeIds = [];
        selectedConnectorId = '';
        highlightedNodeId = '';
        layoutOverrides = {};
        connectorOverrides = {};
        stageDiagramHighlighted = false;
        if (byId('architectureCampusNetworkCiscoPillarBreakdown')) {
            byId('architectureCampusNetworkCiscoPillarBreakdown').innerHTML = '';
        }
        if (byId('architectureCampusNetworkCiscoRiskLevel')) {
            byId('architectureCampusNetworkCiscoRiskLevel').innerHTML = '';
        }
        clearStageUndoHistory();
        updateHighlightAllButton();
        destroyScoreChart();
    }

    function createPresetPreviewOverlay() {
        return [
            '<div class="architecture-campus-network-cisco-stage-preview-overlay" role="status">',
            '<div class="architecture-campus-network-cisco-stage-preview-panel">',
            '<span class="architecture-campus-network-cisco-stage-preview-icon"><i class="bi bi-stars" aria-hidden="true"></i></span>',
            '<strong>Choose a preset to generate diagram</strong>',
            '<span>Pick a preset or click Generate Topology to create the editable workspace.</span>',
            '</div>',
            '</div>'
        ].join('');
    }

    function renderPresetPreview(preset, options) {
        const previewOptions = options || {};
        const previewPreset = preset || getPreset(valueOf('architectureCampusNetworkCiscoPreset'));
        const previewSpec = core.inferFromPrompt(Object.assign({}, previewPreset.defaults, {
            preset: previewPreset.id,
            presetLabel: previewPreset.label,
            prompt: buildDefaultPrompt(previewPreset)
        }));
        const stageCanvas = byId('architectureCampusNetworkCiscoStageCanvas');

        if (!stageCanvas) {
            return;
        }

        if (previewOptions.resetZoom === true) {
            stageZoom = 50;
            setValue('architectureCampusNetworkCiscoZoomInput', stageZoom);
        }

        clearError();
        resetGeneratedTopologyState();
        previewTopology = core.buildTopology(previewSpec, {});
        renderStageHeader(previewSpec);
        stageCanvas.classList.add('architecture-campus-network-cisco-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(previewTopology) + createPresetPreviewOverlay();
        setHidden(byId('architectureCampusNetworkCiscoStageEmpty'), true);
        setHidden(stageCanvas, false);
        setHidden(byId('architectureCampusNetworkCiscoOutputEmpty'), false);
        setHidden(byId('architectureCampusNetworkCiscoOutputContent'), true);
        if (previewOptions.resetZoom === true) {
            setStageZoomToFit();
        } else {
            applyStageZoom();
        }

        updateSelectedNodeEditor();

        if (previewOptions.resetZoom !== true && typeof stageCanvas.scrollTo === 'function') {
            stageCanvas.scrollTo({
                left: 0,
                top: 0,
                behavior: 'auto'
            });
        }
    }

    function renderPreviewFromControls(options) {
        const previewOptions = options || {};
        const previewSpec = buildControlsAuthoritativeSpec();
        const stageCanvas = byId('architectureCampusNetworkCiscoStageCanvas');

        if (!stageCanvas) {
            return;
        }

        if (previewOptions.resetZoom === true) {
            stageZoom = 50;
            setValue('architectureCampusNetworkCiscoZoomInput', stageZoom);
        }

        clearError();
        resetGeneratedTopologyState();
        previewTopology = core.buildTopology(previewSpec, {});
        renderStageHeader(previewSpec);
        stageCanvas.classList.add('architecture-campus-network-cisco-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(previewTopology) + createPresetPreviewOverlay();
        setHidden(byId('architectureCampusNetworkCiscoStageEmpty'), true);
        setHidden(stageCanvas, false);
        setHidden(byId('architectureCampusNetworkCiscoOutputEmpty'), false);
        setHidden(byId('architectureCampusNetworkCiscoOutputContent'), true);

        if (previewOptions.resetZoom === true) {
            setStageZoomToFit();
        } else {
            applyStageZoom();
        }

        updateSelectedNodeEditor();

        if (previewOptions.resetZoom !== true && typeof stageCanvas.scrollTo === 'function') {
            stageCanvas.scrollTo({
                left: 0,
                top: 0,
                behavior: 'auto'
            });
        }
    }

    function handleControlChange() {
        if (currentSpec) {
            clearStageUndoHistory();
            stageDiagramHighlighted = false;
            updateHighlightAllButton();
            renderResult(collectValues(), {
                controlsAuthoritative: true
            });
            syncControlsFromSpec(currentSpec);
            return;
        }

        renderPreviewFromControls({
            resetZoom: false
        });
    }

    function bindControlChangeHandlers() {
        [
            'architectureCampusNetworkCiscoSize',
            'architectureCampusNetworkCiscoAccessBlocks',
            'architectureCampusNetworkCiscoRouting',
            'architectureCampusNetworkCiscoVlans',
            'architectureCampusNetworkCiscoWireless',
            'architectureCampusNetworkCiscoFirewall',
            'architectureCampusNetworkCiscoWan',
            'architectureCampusNetworkCiscoMonitoring',
            'architectureCampusNetworkCiscoDhcpDns',
            'architectureCampusNetworkCiscoHsrp',
            'architectureCampusNetworkCiscoEtherChannel',
            'architectureCampusNetworkCiscoAcl',
            'architectureCampusNetworkCiscoNat',
            'architectureCampusNetworkCiscoVpn',
            'architectureCampusNetworkCiscoTrunkVlans',
            'architectureCampusNetworkCiscoNativeVlan',
            'architectureCampusNetworkCiscoAccessVlan',
            'architectureCampusNetworkCiscoSviGateway',
            'architectureCampusNetworkCiscoOspfArea',
            'architectureCampusNetworkCiscoBgpAsn',
            'architectureCampusNetworkCiscoRedundancyVip'
        ].forEach(function (id) {
            const control = byId(id);

            if (control) {
                control.addEventListener('change', handleControlChange);
            }
        });
    }

    function generateFromControls() {
        layoutOverrides = {};
        connectorOverrides = {};
        highlightedNodeId = '';
        selectedNodeId = '';
        selectedNodeIds = [];
        selectedConnectorId = '';
        stageDiagramHighlighted = false;
        clearStageUndoHistory();
        updateHighlightAllButton();
        renderResult(core.inferFromPrompt(collectValues()), {
            autoFitStage: true
        });
        syncControlsFromSpec(currentSpec);
    }

    function selectNode(nodeId) {
        if (!getDiagramItemById(nodeId)) {
            return;
        }

        selectedNodeId = nodeId;
        selectedNodeIds = [nodeId];
        selectedConnectorId = '';
        queueStageNodeFocus(nodeId);
        renderResult(currentSpec);
    }

    function selectConnector(connectorId) {
        const safeConnectorId = String(connectorId || '').trim();
        const connector = currentTopology && Array.isArray(currentTopology.connectors)
            ? currentTopology.connectors.find(function (item) {
                return item.id === safeConnectorId;
            })
            : null;

        if (!connector) {
            return;
        }

        selectedNodeId = '';
        selectedNodeIds = [];
        selectedConnectorId = safeConnectorId;
        highlightedNodeId = '';
        syncConnectorPayloadState();
        updateSelectedNodeEditor();
        renderStage(currentTopology);
    }

    function updateSelectedNodeEditor() {
        selectedNodeIds = normalizeSelectedNodeIds(selectedNodeIds);

        if (selectedNodeId && !selectedNodeIds.includes(selectedNodeId)) {
            selectedNodeIds.unshift(selectedNodeId);
            selectedNodeIds = normalizeSelectedNodeIds(selectedNodeIds);
        }

        const selectedItems = getSelectedDiagramItems();
        const selectedNode = getDiagramItemById(selectedNodeId) || selectedItems[0] || null;

        setHidden(byId('architectureCampusNetworkCiscoSelectedEmpty'), Boolean(selectedNode));
        setHidden(byId('architectureCampusNetworkCiscoSelectedEditor'), !selectedNode);

        if (!selectedNode) {
            selectedNodeId = '';
            selectedNodeIds = [];
            return;
        }

        selectedNodeId = selectedNode.id;
        selectedNodeIds = selectedNodeIds.length > 0 ? selectedNodeIds : [selectedNodeId];
        setText(
            'architectureCampusNetworkCiscoSelectedName',
            selectedNodeIds.length > 1
                ? selectedNodeIds.length + ' items selected - Primary: ' + selectedNode.title
                : selectedNode.title
        );
        setValue('architectureCampusNetworkCiscoSelectedX', Math.round(selectedNode.x));
        setValue('architectureCampusNetworkCiscoSelectedY', Math.round(selectedNode.y));
        setValue('architectureCampusNetworkCiscoSelectedWidth', Math.round(selectedNode.width));
        setValue('architectureCampusNetworkCiscoSelectedHeight', Math.round(selectedNode.height));
    }

    function getDiagramItemMinimumSize(item) {
        return getGroupById(item.id)
            ? {
                width: 120,
                height: 96
            }
            : {
                width: 120,
                height: 58
            };
    }

    function ensureNodeOverride(nodeId) {
        const node = getDiagramItemById(nodeId);

        if (!node) {
            return null;
        }

        if (!layoutOverrides[nodeId]) {
            layoutOverrides[nodeId] = {
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height
            };
        }

        return layoutOverrides[nodeId];
    }

    function applySelectedNodeValues() {
        const node = getDiagramItemById(selectedNodeId);

        if (!node) {
            return;
        }

        const minimumSize = getDiagramItemMinimumSize(node);
        const nextX = Number(valueOf('architectureCampusNetworkCiscoSelectedX'));
        const nextY = Number(valueOf('architectureCampusNetworkCiscoSelectedY'));
        const nextWidth = Math.max(minimumSize.width, Number(valueOf('architectureCampusNetworkCiscoSelectedWidth')));
        const nextHeight = Math.max(minimumSize.height, Number(valueOf('architectureCampusNetworkCiscoSelectedHeight')));

        pushStageUndoSnapshot();

        if (isDiagramGroup(selectedNodeId) && (nextX !== node.x || nextY !== node.y)) {
            writeMoveLayoutOverrides(getMovableDiagramItems(selectedNodeId), nextX - node.x, nextY - node.y);
        }

        layoutOverrides[selectedNodeId] = {
            x: nextX,
            y: nextY,
            width: nextWidth,
            height: nextHeight
        };
        renderResult(currentSpec);
    }

    function resetSelectedNode() {
        if (!selectedNodeId) {
            return;
        }

        pushStageUndoSnapshot();
        getSelectionMoveItems(selectedNodeId).forEach(function (item) {
            delete layoutOverrides[item.id];
        });
        renderResult(currentSpec);
    }

    function highlightSelectedNode() {
        if (!selectedNodeId) {
            return;
        }

        pushStageUndoSnapshot();
        highlightedNodeId = highlightedNodeId === selectedNodeId ? '' : selectedNodeId;
        renderResult(currentSpec);
    }

    function getSvgClientPoint(svgElement, clientX, clientY) {
        const point = svgElement.createSVGPoint();
        const screenMatrix = svgElement.getScreenCTM();

        if (!screenMatrix) {
            return null;
        }

        point.x = clientX;
        point.y = clientY;

        return point.matrixTransform(screenMatrix.inverse());
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

    function buildRectFromPoints(startPoint, endPoint) {
        return {
            x: Math.min(startPoint.x, endPoint.x),
            y: Math.min(startPoint.y, endPoint.y),
            width: Math.abs(endPoint.x - startPoint.x),
            height: Math.abs(endPoint.y - startPoint.y)
        };
    }

    function rectsIntersect(firstRect, secondRect) {
        return firstRect.x < secondRect.x + secondRect.width &&
            firstRect.x + firstRect.width > secondRect.x &&
            firstRect.y < secondRect.y + secondRect.height &&
            firstRect.y + firstRect.height > secondRect.y;
    }

    function getRectIntersectionArea(firstRect, secondRect) {
        const width = Math.max(0, Math.min(firstRect.x + firstRect.width, secondRect.x + secondRect.width) - Math.max(firstRect.x, secondRect.x));
        const height = Math.max(0, Math.min(firstRect.y + firstRect.height, secondRect.y + secondRect.height) - Math.max(firstRect.y, secondRect.y));

        return width * height;
    }

    function rectContainsPoint(rect, point) {
        return point.x >= rect.x &&
            point.x <= rect.x + rect.width &&
            point.y >= rect.y &&
            point.y <= rect.y + rect.height;
    }

    function readStageElementRect(element) {
        return {
            x: Number.parseFloat(element.dataset.nodeX || '0'),
            y: Number.parseFloat(element.dataset.nodeY || '0'),
            width: Number.parseFloat(element.dataset.nodeWidth || '0'),
            height: Number.parseFloat(element.dataset.nodeHeight || '0')
        };
    }

    function updateMarqueeRect(rectElement, rect) {
        rectElement.setAttribute('x', formatSvgNumber(rect.x));
        rectElement.setAttribute('y', formatSvgNumber(rect.y));
        rectElement.setAttribute('width', formatSvgNumber(rect.width));
        rectElement.setAttribute('height', formatSvgNumber(rect.height));
    }

    function isElementSelectedByMarquee(selectionRect, itemRect) {
        const centerPoint = {
            x: itemRect.x + (itemRect.width / 2),
            y: itemRect.y + (itemRect.height / 2)
        };
        const itemArea = itemRect.width * itemRect.height;
        const intersectionArea = getRectIntersectionArea(selectionRect, itemRect);

        return rectContainsPoint(selectionRect, centerPoint) ||
            (
                itemArea > 0 &&
                intersectionArea / itemArea >= 0.35
            );
    }

    function findItemsIntersectingRect(svgElement, selectionRect) {
        return Array.from(svgElement.querySelectorAll('.architecture-campus-network-cisco-node-shell, .architecture-campus-network-cisco-diagram-group')).filter(function (element) {
            const nodeId = String(element.dataset.nodeId || '').trim();
            const itemRect = readStageElementRect(element);

            return nodeId !== '' &&
                Number.isFinite(itemRect.x) &&
                Number.isFinite(itemRect.y) &&
                Number.isFinite(itemRect.width) &&
                Number.isFinite(itemRect.height) &&
                rectsIntersect(selectionRect, itemRect) &&
                isElementSelectedByMarquee(selectionRect, itemRect);
        }).map(function (element) {
            return String(element.dataset.nodeId || '').trim();
        });
    }

    function findStageNodeElement(stageCanvas, nodeId) {
        const selectedId = String(nodeId || '').trim();

        if (!stageCanvas || selectedId === '') {
            return null;
        }

        return Array.from(stageCanvas.querySelectorAll('[data-node-id]')).find(function (element) {
            return String(element.dataset.nodeId || '') === selectedId;
        }) || null;
    }

    function queueStageNodeFocus(nodeId) {
        pendingStageFocusNodeId = String(nodeId || '').trim();
    }

    function focusPendingStageNode(stageCanvas) {
        const nodeId = pendingStageFocusNodeId;

        if (!stageCanvas || nodeId === '') {
            return;
        }

        pendingStageFocusNodeId = '';

        const nodeElement = findStageNodeElement(stageCanvas, nodeId);

        if (nodeElement && typeof nodeElement.focus === 'function') {
            nodeElement.focus();
        }
    }

    function focusSelectedStageNode() {
        const stageCanvas = byId('architectureCampusNetworkCiscoStageCanvas');

        if (!stageCanvas || selectedNodeId === '') {
            return;
        }

        queueStageNodeFocus(selectedNodeId);
        focusPendingStageNode(stageCanvas);
    }

    function isDiagramArrowKey(key) {
        return ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key);
    }

    function setSelectedNodes(nodeIds, primaryNodeId, shouldFocus) {
        selectedNodeIds = normalizeSelectedNodeIds(nodeIds);
        selectedNodeId = selectedNodeIds.includes(primaryNodeId) ? primaryNodeId : (selectedNodeIds[0] || '');
        selectedConnectorId = '';

        if (shouldFocus !== false) {
            queueStageNodeFocus(selectedNodeId);
        }

        if (currentSpec) {
            renderResult(currentSpec);
            return;
        }

        updateSelectedNodeEditor();
    }

    function isMarqueeBlockedTarget(target) {
        if (!target || typeof target.closest !== 'function') {
            return false;
        }

        if (target.closest('.architecture-campus-network-cisco-resize-handle, .architecture-campus-network-cisco-node-shell')) {
            return true;
        }

        if (target.closest('.architecture-campus-network-cisco-connector-group')) {
            return true;
        }

        const group = target.closest('.architecture-campus-network-cisco-diagram-group');

        return group !== null;
    }

    function bindStageMarqueeSelection(svgElement) {
        if (!svgElement) {
            return;
        }

        svgElement.addEventListener('pointerdown', function (event) {
            if (
                event.button !== 0 ||
                isMarqueeBlockedTarget(event.target)
            ) {
                return;
            }

            const startPoint = getSvgClientPoint(svgElement, event.clientX, event.clientY);

            if (!startPoint) {
                return;
            }

            const marquee = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

            marquee.setAttribute('rx', '6');
            marquee.setAttribute('class', 'architecture-campus-network-cisco-marquee-selection');
            updateMarqueeRect(marquee, {
                x: startPoint.x,
                y: startPoint.y,
                width: 0,
                height: 0
            });
            svgElement.appendChild(marquee);
            safelySetPointerCapture(svgElement, event.pointerId);

            function handlePointerMove(moveEvent) {
                const currentPoint = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);

                if (!currentPoint) {
                    return;
                }

                updateMarqueeRect(marquee, buildRectFromPoints(startPoint, currentPoint));
            }

            function handlePointerEnd(endEvent) {
                const endPoint = getSvgClientPoint(svgElement, endEvent.clientX, endEvent.clientY);

                safelyReleasePointerCapture(svgElement, endEvent.pointerId);
                svgElement.removeEventListener('pointermove', handlePointerMove);
                svgElement.removeEventListener('pointerup', handlePointerEnd);
                svgElement.removeEventListener('pointercancel', handlePointerEnd);
                marquee.remove();

                if (!endPoint || endEvent.type === 'pointercancel') {
                    return;
                }

                const selectionRect = buildRectFromPoints(startPoint, endPoint);

                if (selectionRect.width < 6 && selectionRect.height < 6) {
                    setSelectedNodes([]);
                    return;
                }

                setSelectedNodes(findItemsIntersectingRect(svgElement, selectionRect));
            }

            svgElement.addEventListener('pointermove', handlePointerMove);
            svgElement.addEventListener('pointerup', handlePointerEnd);
            svgElement.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        }, true);
    }

    function bindStageNodes(stageCanvas) {
        all('.architecture-campus-network-cisco-connector-group', stageCanvas).forEach(function (connectorElement) {
            connectorElement.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter' && event.key !== ' ') {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                selectConnector(connectorElement.dataset.connectorId);
            });

            connectorElement.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                selectConnector(connectorElement.dataset.connectorId);
            });

            connectorElement.addEventListener('mousedown', function (event) {
                event.stopPropagation();
            });
        });

        all('.architecture-campus-network-cisco-node-shell, .architecture-campus-network-cisco-diagram-group', stageCanvas).forEach(function (nodeElement) {
            nodeElement.addEventListener('keydown', function (event) {
                const nodeId = String(nodeElement.dataset.nodeId || '').trim();

                if (!getDiagramItemById(nodeId)) {
                    return;
                }

                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopPropagation();
                    selectNode(nodeId);
                    return;
                }

                if (!isDiagramArrowKey(event.key)) {
                    return;
                }

                if (selectedNodeIds.length > 1 && selectedNodeIds.includes(nodeId)) {
                    selectedNodeId = nodeId;
                    selectedConnectorId = '';
                    updateSelectedNodeEditor();
                } else {
                    selectedNodeId = nodeId;
                    selectedNodeIds = [nodeId];
                    selectedConnectorId = '';
                    updateSelectedNodeEditor();
                }

                handleKeyboardMove(event);

                if (event.defaultPrevented) {
                    event.stopPropagation();
                }
            });

            nodeElement.addEventListener('click', function (event) {
                event.stopPropagation();
                selectNode(nodeElement.dataset.nodeId);
            });
            nodeElement.addEventListener('mousedown', function (event) {
                const nodeId = nodeElement.dataset.nodeId;
                const node = getDiagramItemById(nodeId);

                if (!node || event.button !== 0 || event.target.closest('.architecture-campus-network-cisco-resize-handle')) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                selectedNodeId = nodeId;
                selectedNodeIds = selectedNodeIds.length > 1 && selectedNodeIds.includes(nodeId) ? selectedNodeIds : [nodeId];
                selectedConnectorId = '';
                queueStageNodeFocus(nodeId);
                dragState = {
                    nodeId: nodeId,
                    startX: event.clientX,
                    startY: event.clientY,
                    nodeX: node.x,
                    nodeY: node.y,
                    width: node.width,
                    height: node.height,
                    movingItems: getSelectionMoveItems(nodeId),
                    hasSnapshot: false
                };
                updateSelectedNodeEditor();
                renderStage(currentTopology);
            });
        });

        all('.architecture-campus-network-cisco-resize-handle', stageCanvas).forEach(function (handleElement) {
            handleElement.addEventListener('mousedown', function (event) {
                const nodeId = handleElement.dataset.nodeId;
                const node = getDiagramItemById(nodeId);

                if (!node || event.button !== 0) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                selectedNodeId = nodeId;
                selectedNodeIds = [nodeId];
                selectedConnectorId = '';
                focusSelectedStageNode();
                dragState = {
                    nodeId: nodeId,
                    mode: 'resize',
                    startX: event.clientX,
                    startY: event.clientY,
                    nodeX: node.x,
                    nodeY: node.y,
                    width: node.width,
                    height: node.height,
                    hasSnapshot: false
                };
                updateSelectedNodeEditor();
            });
        });
    }

    function handlePointerMove(event) {
        if (!dragState) {
            return;
        }

        const deltaX = (event.clientX - dragState.startX) / (stageZoom / 100);
        const deltaY = (event.clientY - dragState.startY) / (stageZoom / 100);

        if (!dragState.hasSnapshot) {
            pushStageUndoSnapshot();
            dragState.hasSnapshot = true;
        }

        if (dragState.mode === 'resize') {
            const item = getDiagramItemById(dragState.nodeId);
            const minimumSize = item ? getDiagramItemMinimumSize(item) : {
                width: 120,
                height: 58
            };

            layoutOverrides[dragState.nodeId] = {
                x: dragState.nodeX,
                y: dragState.nodeY,
                width: Math.max(minimumSize.width, Math.round(dragState.width + deltaX)),
                height: Math.max(minimumSize.height, Math.round(dragState.height + deltaY))
            };
        } else {
            writeMoveLayoutOverrides(dragState.movingItems || [], deltaX, deltaY);
        }
        queueStageNodeFocus(dragState.nodeId);
        renderResult(currentSpec);
    }

    function handlePointerUp() {
        dragState = null;
    }

    function isKeyboardFormTarget(target) {
        if (!target || typeof target.closest !== 'function') {
            return false;
        }

        return target.closest('input, textarea, select, button, summary, a[href], [contenteditable="true"], .architecture-campus-network-cisco-custom-select') !== null;
    }

    function isUndoKeyboardShortcut(event) {
        return String(event.key || '').toLowerCase() === 'z' &&
            (event.metaKey || event.ctrlKey) &&
            !event.altKey &&
            !event.shiftKey;
    }

    function handleStageUndoKeydown(event) {
        if (event.defaultPrevented || !isUndoKeyboardShortcut(event) || isKeyboardFormTarget(event.target)) {
            return;
        }

        if (undoStageEdit()) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function handleKeyboardMove(event) {
        if (!selectedNodeId || isKeyboardFormTarget(event.target)) {
            return;
        }

        const keyMap = {
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0],
            ArrowUp: [0, -1],
            ArrowDown: [0, 1]
        };

        if (!keyMap[event.key]) {
            return;
        }

        const node = getDiagramItemById(selectedNodeId);
        const multiplier = event.shiftKey ? 12 : 4;
        const delta = keyMap[event.key];

        if (!node) {
            return;
        }

        event.preventDefault();
        pushStageUndoSnapshot();

        if (event.altKey) {
            const minimumSize = getDiagramItemMinimumSize(node);
            const override = ensureNodeOverride(selectedNodeId);

            if (!override) {
                return;
            }

            override.width = Math.max(minimumSize.width, override.width + (delta[0] * multiplier));
            override.height = Math.max(minimumSize.height, override.height + (delta[1] * multiplier));
        } else {
            writeMoveLayoutOverrides(getSelectionMoveItems(selectedNodeId), delta[0] * multiplier, delta[1] * multiplier);
        }

        queueStageNodeFocus(selectedNodeId);
        renderResult(currentSpec);
    }

    function handleWheelZoom(event) {
        if (!event.ctrlKey && !event.metaKey) {
            return;
        }

        const stageCanvas = byId('architectureCampusNetworkCiscoStageCanvas');

        if (!stageCanvas || !stageCanvas.contains(event.target)) {
            return;
        }

        event.preventDefault();
        setStageZoom(stageZoom + (event.deltaY > 0 ? -1 : 1));
    }

    function setTabActive(buttons, panels, activeButton) {
        buttons.forEach(function (button) {
            const isActive = button === activeButton;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        panels.forEach(function (panel) {
            const activeTarget = activeButton.dataset.outputTabTarget ||
                activeButton.dataset.tabTarget ||
                activeButton.dataset.configTabTarget;
            const isActive = panel.id === activeTarget;

            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function bindTabs() {
        const outputButtons = all('.architecture-campus-network-cisco-tab-btn');
        const outputPanels = all('.architecture-campus-network-cisco-tab-panel');
        const configButtons = all('.architecture-campus-network-cisco-config-tab');
        const configPanels = all('[data-config-panel]');

        outputButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                setTabActive(outputButtons, outputPanels, button);
            });
        });

        configButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                setTabActive(configButtons, configPanels, button);
            });
        });
    }

    function flashButton(button, label) {
        if (!button) {
            return;
        }

        const original = button.textContent;

        button.textContent = label;
        globalScope.setTimeout(function restoreLabel() {
            button.textContent = original;
        }, 1200);
    }

    function copyTextToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }

        const textarea = document.createElement('textarea');

        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

        return Promise.resolve();
    }

    function initMarkdownCopyButtons() {
        const promptBlocks = all('.markdown-content pre.architecture-campus-network-cisco-prompt-pre');
        const promptCopyButtons = all('.architecture-campus-network-cisco-prompt-copy-btn');

        promptCopyButtons.forEach(function bindPromptCopy(button) {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', function handlePromptCopy(event) {
                const label = button.querySelector('span') || button;

                event.preventDefault();
                event.stopPropagation();

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code.textContent.trim()).then(function handleCopied() {
                        flashButton(label, 'Copied');
                        button.classList.add('copied');
                        globalScope.setTimeout(function clearCopied() {
                            button.classList.remove('copied');
                        }, 1400);
                    }).catch(function handleCopyFailure() {
                        flashButton(label, 'Failed');
                    });
                    return;
                }

                const textarea = document.createElement('textarea');

                textarea.value = code.textContent.trim();
                textarea.setAttribute('readonly', 'readonly');
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
                flashButton(label, 'Copied');
                button.classList.add('copied');
                globalScope.setTimeout(function clearCopied() {
                    button.classList.remove('copied');
                }, 1400);
            });
        });
    }

    function downloadBlob(filename, mimeType, content) {
        const blob = new Blob([content], {
            type: mimeType
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function downloadSvg() {
        if (!currentSvgMarkup) {
            showError('Generate a topology before downloading SVG.');
            return;
        }

        downloadBlob('architecture-campus-network-cisco.svg', 'image/svg+xml;charset=utf-8', currentSvgMarkup);
    }

    function exportPng() {
        return new Promise(function (resolve, reject) {
            if (!currentSvgMarkup || !currentTopology) {
                showError('Generate a topology before exporting PNG.');
                reject(new Error('No SVG available.'));
                return;
            }

            const image = new Image();
            const svgBlob = new Blob([currentSvgMarkup], {
                type: 'image/svg+xml;charset=utf-8'
            });
            const url = URL.createObjectURL(svgBlob);

            image.onload = function () {
                const canvas = document.createElement('canvas');
                const scale = 2;
                const bounds = computeSvgBounds(currentTopology);

                canvas.width = bounds.width * scale;
                canvas.height = bounds.height * scale;

                const context = canvas.getContext('2d');

                context.fillStyle = '#fbfdfc';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(url);

                canvas.toBlob(function (blob) {
                    if (!blob) {
                        reject(new Error('PNG export failed.'));
                        return;
                    }

                    const pngUrl = URL.createObjectURL(blob);
                    const link = document.createElement('a');

                    link.href = pngUrl;
                    link.download = 'architecture-campus-network-cisco.png';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    URL.revokeObjectURL(pngUrl);
                    resolve();
                }, 'image/png');
            };
            image.onerror = function () {
                URL.revokeObjectURL(url);
                reject(new Error('SVG image load failed.'));
            };
            image.src = url;
        });
    }

    function downloadJson() {
        if (!currentPayload) {
            showError('Generate a topology before downloading JSON.');
            return;
        }

        downloadBlob('architecture-campus-network-cisco.json', 'application/json;charset=utf-8', JSON.stringify(currentPayload, null, 2));
    }

    function copyJson() {
        if (!currentPayload) {
            showError('Generate a topology before copying JSON.');
            return Promise.reject(new Error('No JSON available.'));
        }

        const json = JSON.stringify(currentPayload, null, 2);

        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(json);
        }

        const textarea = document.createElement('textarea');

        textarea.value = json;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

        return Promise.resolve();
    }

    function handleImportChange(event) {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            try {
                const payload = JSON.parse(String(reader.result || '{}'));
                const restored = core.buildImportedPayloadState(payload);

                if (restored.error) {
                    showError(restored.error);
                    return;
                }

                layoutOverrides = restored.layoutOverrides || {};
                connectorOverrides = cloneConnectorOverrides(payload.connector_overrides || payload.connectorOverrides);
                selectedNodeId = '';
                selectedNodeIds = [];
                selectedConnectorId = typeof payload.selected_connector_id === 'string' ? payload.selected_connector_id : '';
                highlightedNodeId = '';
                stageDiagramHighlighted = false;
                clearStageUndoHistory();
                updateHighlightAllButton();
                syncControlsFromSpec(restored.spec);
                renderResult(restored.spec);
            } catch (error) {
                showError('The selected JSON file could not be parsed.');
            } finally {
                event.target.value = '';
            }
        };
        reader.readAsText(file);
    }

    function getUsageHelpElements() {
        return {
            popup: byId('architectureCampusNetworkCiscoUsageHelpPopup'),
            button: byId('architectureCampusNetworkCiscoUsageHelpButton'),
            closeButton: byId('architectureCampusNetworkCiscoUsageHelpClose')
        };
    }

    function getUsageHelpFocusableElements() {
        const elements = getUsageHelpElements();

        if (!elements.popup) {
            return [];
        }

        return Array.from(elements.popup.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (element) {
            return !element.hasAttribute('disabled') && element.offsetParent !== null;
        });
    }

    function setUsageHelpOpen(isOpen) {
        const elements = getUsageHelpElements();
        const shouldOpen = Boolean(isOpen);

        setHidden(elements.popup, !shouldOpen);

        if (elements.button) {
            elements.button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        }

        if (shouldOpen && elements.closeButton) {
            elements.closeButton.focus();
            return;
        }

        if (!shouldOpen && elements.button) {
            elements.button.focus();
        }
    }

    function handleUsageHelpKeydown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            setUsageHelpOpen(false);
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        const focusableElements = getUsageHelpFocusableElements();

        if (focusableElements.length === 0) {
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            return;
        }

        if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    function toggleStageUi(stageShell) {
        if (!stageShell) {
            return;
        }

        isStageUiHidden = !isStageUiHidden;
        stageShell.classList.toggle('is-stage-ui-hidden', isStageUiHidden);
    }

    function updateFullscreenButton() {
        const stageShell = byId('architectureCampusNetworkCiscoStageShell');
        const button = byId('architectureCampusNetworkCiscoFullscreen');

        if (!stageShell || !button) {
            return;
        }

        const isExpanded = document.fullscreenElement === stageShell || stageShell.classList.contains('architecture-campus-network-cisco-stage-expanded');
        const icon = button.querySelector('i');
        const label = isExpanded ? 'Close fullscreen' : 'Open fullscreen';

        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);

        if (icon) {
            icon.className = isExpanded ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen';
        }
    }

    function setStageExpanded(isExpanded) {
        const stageShell = byId('architectureCampusNetworkCiscoStageShell');

        if (!stageShell) {
            return;
        }

        stageShell.classList.toggle('architecture-campus-network-cisco-stage-expanded', Boolean(isExpanded));
        document.body.classList.toggle('architecture-campus-network-cisco-stage-expanded-lock', Boolean(isExpanded));
        updateFullscreenButton();
    }

    async function toggleFullscreen() {
        const stageShell = byId('architectureCampusNetworkCiscoStageShell');

        if (!stageShell) {
            return;
        }

        try {
            if (stageShell.classList.contains('architecture-campus-network-cisco-stage-expanded')) {
                setStageExpanded(false);
                return;
            }

            if (document.fullscreenElement === stageShell) {
                if (typeof document.exitFullscreen === 'function') {
                    await document.exitFullscreen();
                } else {
                    setStageExpanded(false);
                }
                return;
            }

            if (typeof stageShell.requestFullscreen !== 'function') {
                setStageExpanded(true);
                return;
            }

            await stageShell.requestFullscreen();
            updateFullscreenButton();
        } catch (error) {
            setStageExpanded(true);
        }
    }

    function bindEvents(root) {
        bindClick('architectureCampusNetworkCiscoGenerate', generateFromControls);
        bindClick('architectureCampusNetworkCiscoReset', function () {
            applyPreset(valueOf('architectureCampusNetworkCiscoPreset'), true);
        });
        byId('architectureCampusNetworkCiscoPreset').addEventListener('change', function () {
            applyPreset(valueOf('architectureCampusNetworkCiscoPreset'), true);
        });
        bindControlChangeHandlers();
        all('.architecture-campus-network-cisco-sort-option').forEach(function (option) {
            option.addEventListener('click', function () {
                setInventorySortMode(option.dataset.sortValue || 'id');
            });
        });
        bindClick('architectureCampusNetworkCiscoZoomOut', function () {
            setStageZoom(stageZoom - 10);
        });
        bindClick('architectureCampusNetworkCiscoZoomIn', function () {
            setStageZoom(stageZoom + 10);
        });
        byId('architectureCampusNetworkCiscoZoomInput').addEventListener('change', function (event) {
            setStageZoom(event.target.value);
        });
        bindClick('architectureCampusNetworkCiscoZoomFit', function () {
            setStageZoomToFit();
        });
        bindClick('architectureCampusNetworkCiscoZoomActual', function () {
            setStageZoom(100);
        });
        bindClick('architectureCampusNetworkCiscoUndoStageEdit', function () {
            undoStageEdit();
        });
        bindClick('architectureCampusNetworkCiscoHighlightAll', function () {
            setStageDiagramHighlighted(!stageDiagramHighlighted);
        });
        bindClick('architectureCampusNetworkCiscoZoomHideUi', function () {
            toggleStageUi(byId('architectureCampusNetworkCiscoStageShell'));
        });
        bindClick('architectureCampusNetworkCiscoFullscreen', toggleFullscreen);
        bindClick('architectureCampusNetworkCiscoResetLayout', function () {
            if (!currentSpec) {
                renderPresetPreview(getPreset(valueOf('architectureCampusNetworkCiscoPreset')), {
                    resetZoom: true
                });
                return;
            }

            pushStageUndoSnapshot();
            layoutOverrides = {};
            connectorOverrides = {};
            selectedNodeId = '';
            selectedNodeIds = [];
            selectedConnectorId = '';
            highlightedNodeId = '';
            stageDiagramHighlighted = false;
            stageZoom = 50;
            setValue('architectureCampusNetworkCiscoZoomInput', stageZoom);
            updateHighlightAllButton();
            renderResult(currentSpec, {
                autoFitStage: true
            });
        });
        bindClick('architectureCampusNetworkCiscoUsageHelpButton', function () {
            setUsageHelpOpen(true);
        });
        bindClick('architectureCampusNetworkCiscoUsageHelpClose', function () {
            setUsageHelpOpen(false);
        });
        byId('architectureCampusNetworkCiscoUsageHelpPopup').addEventListener('click', function (event) {
            if (event.target !== byId('architectureCampusNetworkCiscoUsageHelpPopup')) {
                return;
            }

            setUsageHelpOpen(false);
        });
        byId('architectureCampusNetworkCiscoUsageHelpPopup').addEventListener('keydown', handleUsageHelpKeydown);
        bindClick('architectureCampusNetworkCiscoHighlightNode', highlightSelectedNode);
        bindClick('architectureCampusNetworkCiscoApplyNode', applySelectedNodeValues);
        bindClick('architectureCampusNetworkCiscoResetNode', resetSelectedNode);
        bindClick('architectureCampusNetworkCiscoDownloadSvg', downloadSvg);
        bindClick('architectureCampusNetworkCiscoExportPng', function () {
            exportPng().catch(function () {
                showError('PNG export failed.');
            });
        });
        bindClick('architectureCampusNetworkCiscoCopyJson', function () {
            copyJson().catch(function () {
                showError('Copy JSON failed.');
            });
        });
        bindClick('architectureCampusNetworkCiscoDownloadJson', downloadJson);
        bindClick('architectureCampusNetworkCiscoImportJsonButton', function () {
            byId('architectureCampusNetworkCiscoImportJson').click();
        });
        byId('architectureCampusNetworkCiscoImportJson').addEventListener('change', handleImportChange);
        document.addEventListener('mousemove', handlePointerMove);
        document.addEventListener('mouseup', handlePointerUp);
        document.addEventListener('keydown', handleStageUndoKeydown);
        document.addEventListener('keydown', handleKeyboardMove);
        document.addEventListener('fullscreenchange', function () {
            if (!document.fullscreenElement) {
                setStageExpanded(false);
                return;
            }

            updateFullscreenButton();
        });
        document.addEventListener('keydown', function (event) {
            const stageShell = byId('architectureCampusNetworkCiscoStageShell');

            if (event.key === 'Escape' && stageShell && stageShell.classList.contains('architecture-campus-network-cisco-stage-expanded')) {
                setStageExpanded(false);
            }
        });
        document.addEventListener('wheel', handleWheelZoom, {
            passive: false
        });
        document.addEventListener('click', function (event) {
            if (event.target.closest('.architecture-campus-network-cisco-custom-select')) {
                return;
            }

            closeCustomSelects();
        });
        bindTabs();
    }

    document.addEventListener('DOMContentLoaded', function () {
        const root = document.querySelector('.architecture-campus-network-cisco-tool');

        if (!validateRequiredElements(root)) {
            return;
        }

        initializeCustomSelects();
        bindEvents(root);
        initMarkdownCopyButtons();
        syncPresetDescription();
        applyPreset('enterprise-campus', false);
        applyWorkspaceInfoMarkers();
    });

    /**
     * Public browser API for the Cisco campus architecture workspace.
     *
     * @type {Object}
     */
    const publicApi = Object.freeze({
        toolId: core.toolId,
        collectValues: collectValues,
        renderResult: renderResult
    });

    globalScope.InfraStackArchitectureCampusNetworkCisco = publicApi;
    globalScope.InfraStackArchitectureCampusNetworkCiscoTopology = publicApi;
}(window));
