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
            "architectureVpcHuaweiPrompt",
            "architectureVpcHuaweiGenerate",
            "architectureVpcHuaweiReset",
            "architectureVpcHuaweiErrorState"
        ],
        "sourceClasses": [
            "tool-prompt-shell",
            "tool-main-row",
            "tool-main-label",
            "tool-main-input-grid",
            "architecture-vpc-huawei-prompt",
            "architecture-vpc-huawei-prompt-hint",
            "architecture-vpc-huawei-main-actions",
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
            "architectureVpcHuaweiPreset",
            "architectureVpcHuaweiPresetDescription",
            "architectureVpcHuaweiRegion",
            "architectureVpcHuaweiAzCount"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-basic-preset-section",
            "architecture-vpc-huawei-basic-grid",
            "architecture-vpc-huawei-control-stack",
            "architecture-vpc-huawei-native-select",
            "architecture-vpc-huawei-custom-select",
            "architecture-vpc-huawei-custom-select-trigger",
            "architecture-vpc-huawei-custom-select-menu"
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
            "architectureVpcHuaweiNetworkConfigTab",
            "architectureVpcHuaweiWorkloadConfigTab",
            "architectureVpcHuaweiServicesConfigTab",
            "architectureVpcHuaweiNetworkConfigPanel",
            "architectureVpcHuaweiWorkloadConfigPanel",
            "architectureVpcHuaweiServicesConfigPanel",
            "architectureVpcHuaweiCidr",
            "architectureVpcHuaweiNatMode",
            "architectureVpcHuaweiAppTier",
            "architectureVpcHuaweiDatabase",
            "architectureVpcHuaweiRoute53",
            "architectureVpcHuaweiCloudFront",
            "architectureVpcHuaweiWaf",
            "architectureVpcHuaweiAlb",
            "architectureVpcHuaweiBastion",
            "architectureVpcHuaweiEndpoints",
            "architectureVpcHuaweiFlowLogs",
            "architectureVpcHuaweiCloudWatch",
            "architectureVpcHuaweiSiteToSiteVpn",
            "architectureVpcHuaweiTransitGateway",
            "architectureVpcHuaweiCache"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-custom-panel",
            "architecture-vpc-huawei-custom-panel-summary",
            "architecture-vpc-huawei-config-tabs",
            "architecture-vpc-huawei-config-tab",
            "architecture-vpc-huawei-config-panel",
            "architecture-vpc-huawei-config-grid",
            "architecture-vpc-huawei-toggle-grid",
            "architecture-vpc-huawei-toggle-item"
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
            "architectureVpcHuaweiSelectedShell",
            "architectureVpcHuaweiSelectedEmpty",
            "architectureVpcHuaweiSelectedEditor",
            "architectureVpcHuaweiSelectedName",
            "architectureVpcHuaweiSelectedX",
            "architectureVpcHuaweiSelectedY",
            "architectureVpcHuaweiSelectedWidth",
            "architectureVpcHuaweiSelectedHeight",
            "architectureVpcHuaweiHighlightCard",
            "architectureVpcHuaweiApplyCardSize",
            "architectureVpcHuaweiResetCardSize"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-selected-section",
            "architecture-vpc-huawei-selected-empty",
            "architecture-vpc-huawei-selected-empty-chips",
            "architecture-vpc-huawei-selected-hint-chip",
            "architecture-vpc-huawei-selected-editor",
            "architecture-vpc-huawei-selected-name",
            "architecture-vpc-huawei-selected-actions",
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
            "architectureVpcHuaweiStageTitle",
            "architectureVpcHuaweiStageSubtitle",
            "architectureVpcHuaweiStageMeta",
            "architectureVpcHuaweiOutputEmpty",
            "architectureVpcHuaweiPromptSummary",
            "architectureVpcHuaweiResultTextGenerated"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-stage-header",
            "architecture-vpc-huawei-stage-heading",
            "architecture-vpc-huawei-stage-preset-chip",
            "architecture-vpc-huawei-stage-meta",
            "architecture-vpc-huawei-prompt-notes-card",
            "architecture-vpc-huawei-note-card",
            "architecture-vpc-huawei-note-copy",
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
            "architectureVpcHuaweiStageShell",
            "architectureVpcHuaweiStageEmpty",
            "architectureVpcHuaweiStageCanvas",
            "architectureVpcHuaweiZoomControl",
            "architectureVpcHuaweiZoomLabel",
            "architectureVpcHuaweiZoomInput",
            "architectureVpcHuaweiZoomOut",
            "architectureVpcHuaweiZoomIn",
            "architectureVpcHuaweiZoomFit",
            "architectureVpcHuaweiZoomActual",
            "architectureVpcHuaweiUndoStageEdit",
            "architectureVpcHuaweiHighlightAll",
            "architectureVpcHuaweiZoomHideUi",
            "architectureVpcHuaweiUsageHelpButton",
            "architectureVpcHuaweiUsageHelpPopup",
            "architectureVpcHuaweiUsageHelpClose",
            "architectureVpcHuaweiFullscreen",
            "architectureVpcHuaweiResetLayout"
        ],
        "sourceClasses": [
            "tool-stage-shell",
            "tool-stage-toolbar",
            "tool-stage-body",
            "tool-stage-empty",
            "tool-stage-canvas",
            "architecture-vpc-huawei-stage-canvas",
            "architecture-vpc-huawei-zoom-control",
            "architecture-vpc-huawei-icon-btn",
            "architecture-vpc-huawei-stage-preview",
            "architecture-vpc-huawei-usage-overlay",
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
            "architectureVpcHuaweiOutputStatus",
            "architectureVpcHuaweiScoreValue",
            "architectureVpcHuaweiScoreEchart"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-output-summary",
            "architecture-vpc-huawei-output-status-card",
            "architecture-vpc-huawei-score-card",
            "architecture-vpc-huawei-score-ring-card",
            "architecture-vpc-huawei-score-value",
            "architecture-vpc-huawei-score-copy",
            "architecture-vpc-huawei-score-kicker",
            "architecture-vpc-huawei-score-summary",
            "architecture-vpc-huawei-score-detail",
            "architecture-vpc-huawei-score-tag"
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
            "architectureVpcHuaweiInventorySortSelect",
            "architectureVpcHuaweiInventorySortSummary",
            "architectureVpcHuaweiInventorySort",
            "architectureVpcHuaweiExportPng",
            "architectureVpcHuaweiDownloadSvg",
            "architectureVpcHuaweiCopyJson",
            "architectureVpcHuaweiDownloadJson",
            "architectureVpcHuaweiImportJsonButton"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-toolbar-shell",
            "architecture-vpc-huawei-toolbar",
            "architecture-vpc-huawei-toolbar-main",
            "tool-output-toolbar",
            "tool-output-actions",
            "architecture-vpc-huawei-sort-label",
            "architecture-vpc-huawei-sort-wrap",
            "architecture-vpc-huawei-sort-select",
            "architecture-vpc-huawei-sort-summary",
            "architecture-vpc-huawei-sort-menu",
            "architecture-vpc-huawei-sort-option"
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
            "architectureVpcHuaweiOutputEmpty",
            "architectureVpcHuaweiOutputContent",
            "architectureVpcHuaweiInventoryTableBody",
            "architectureVpcHuaweiRoutingTableBody",
            "architectureVpcHuaweiControlTableBody",
            "architectureVpcHuaweiPromptSummary",
            "architectureVpcHuaweiKeywordList",
            "architectureVpcHuaweiAssumptionList",
            "architectureVpcHuaweiModelList",
            "architectureVpcHuaweiProsList",
            "architectureVpcHuaweiConsList",
            "architectureVpcHuaweiPillarBreakdown",
            "architectureVpcHuaweiRiskLevel",
            "architectureVpcHuaweiJsonOutput",
            "architectureVpcHuaweiImportJson"
        ],
        "sourceClasses": [
            "tool-output-shell",
            "tool-empty-state",
            "architecture-vpc-huawei-output-content",
            "architecture-vpc-huawei-output-shell",
            "architecture-vpc-huawei-tabs-shell",
            "tool-tabs",
            "architecture-vpc-huawei-tab-btn",
            "architecture-vpc-huawei-tab-panel",
            "architecture-vpc-huawei-inventory-panel",
            "architecture-vpc-huawei-table-card",
            "architecture-vpc-huawei-table-wrap",
            "architecture-vpc-huawei-table",
            "architecture-vpc-huawei-row-copy",
            "architecture-vpc-huawei-prompt-notes-card",
            "architecture-vpc-huawei-assessment-card",
            "architecture-vpc-huawei-pillar-card",
            "architecture-vpc-huawei-risk-card",
            "tool-json-shell",
            "architecture-vpc-huawei-json-code"
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

{{ include('content/tools/huawei/architecture-vpc-huawei/assets/bin/model-core.js')|raw }}

(function initArchitectureVpcHuaweiWorkspace(globalScope) {
    'use strict';

    const core = ArchitectureVpcHuaweiModelCore;
    const iconSvgMap = {
        users: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/users.svg')|json_encode|raw }},
        vpc: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/vpc.svg')|json_encode|raw }},
        subnet: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/subnet.svg')|json_encode|raw }},
        vsi: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/vsi.svg')|json_encode|raw }},
        kubernetes: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/kubernetes.svg')|json_encode|raw }},
        cis: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/waf-dns.svg')|json_encode|raw }},
        security: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/security.svg')|json_encode|raw }},
        transitGateway: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/enterprise-router.svg')|json_encode|raw }},
        objectStorage: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/cloud-object-storage.svg')|json_encode|raw }},
        monitoring: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/monitoring.svg')|json_encode|raw }}
    };

    let currentSpec = null;
    let currentArchitecture = null;
    let previewArchitecture = null;
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
    const stageUndoLimit = 40;
    const customSelectControls = [];
    const customSelectIds = [
        'architectureVpcHuaweiPreset',
        'architectureVpcHuaweiSize',
        'architectureVpcHuaweiAccessBlocks',
        'architectureVpcHuaweiRouting'
    ];
    const requiredIds = [
        'architectureVpcHuaweiPrompt',
        'architectureVpcHuaweiGenerate',
        'architectureVpcHuaweiReset',
        'architectureVpcHuaweiErrorState',
        'architectureVpcHuaweiPreset',
        'architectureVpcHuaweiPresetDescription',
        'architectureVpcHuaweiSize',
        'architectureVpcHuaweiAccessBlocks',
        'architectureVpcHuaweiRouting',
        'architectureVpcHuaweiVlans',
        'architectureVpcHuaweiTrunkVlans',
        'architectureVpcHuaweiNativeVlan',
        'architectureVpcHuaweiAccessVlan',
        'architectureVpcHuaweiSviGateway',
        'architectureVpcHuaweiOspfArea',
        'architectureVpcHuaweiBgpAsn',
        'architectureVpcHuaweiRedundancyVip',
        'architectureVpcHuaweiWireless',
        'architectureVpcHuaweiFirewall',
        'architectureVpcHuaweiWan',
        'architectureVpcHuaweiMonitoring',
        'architectureVpcHuaweiDhcpDns',
        'architectureVpcHuaweiHsrp',
        'architectureVpcHuaweiEtherChannel',
        'architectureVpcHuaweiAcl',
        'architectureVpcHuaweiNat',
        'architectureVpcHuaweiVpn',
        'architectureVpcHuaweiStageShell',
        'architectureVpcHuaweiStageTitle',
        'architectureVpcHuaweiStageSubtitle',
        'architectureVpcHuaweiStageMeta',
        'architectureVpcHuaweiStageEmpty',
        'architectureVpcHuaweiStageCanvas',
        'architectureVpcHuaweiZoomOut',
        'architectureVpcHuaweiZoomInput',
        'architectureVpcHuaweiZoomLabel',
        'architectureVpcHuaweiZoomIn',
        'architectureVpcHuaweiZoomFit',
        'architectureVpcHuaweiZoomActual',
        'architectureVpcHuaweiUndoStageEdit',
        'architectureVpcHuaweiHighlightAll',
        'architectureVpcHuaweiZoomHideUi',
        'architectureVpcHuaweiFullscreen',
        'architectureVpcHuaweiResetLayout',
        'architectureVpcHuaweiSelectedEmpty',
        'architectureVpcHuaweiSelectedEditor',
        'architectureVpcHuaweiSelectedName',
        'architectureVpcHuaweiSelectedX',
        'architectureVpcHuaweiSelectedY',
        'architectureVpcHuaweiSelectedWidth',
        'architectureVpcHuaweiSelectedHeight',
        'architectureVpcHuaweiOutputEmpty',
        'architectureVpcHuaweiOutputContent',
        'architectureVpcHuaweiOutputStatus',
        'architectureVpcHuaweiPillarBreakdown',
        'architectureVpcHuaweiRiskLevel',
        'architectureVpcHuaweiInventorySortSelect',
        'architectureVpcHuaweiInventorySortSummary',
        'architectureVpcHuaweiInventorySort',
        'architectureVpcHuaweiInventoryTableBody',
        'architectureVpcHuaweiPromptSummary',
        'architectureVpcHuaweiKeywordList',
        'architectureVpcHuaweiAssumptionList',
        'architectureVpcHuaweiModelList',
        'architectureVpcHuaweiProsList',
        'architectureVpcHuaweiConsList',
        'architectureVpcHuaweiJsonOutput',
        'architectureVpcHuaweiImportJson'
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
        const button = byId('architectureVpcHuaweiUndoStageEdit');

        if (!button) {
            return;
        }

        button.disabled = stageUndoStack.length === 0;
        button.setAttribute('aria-disabled', button.disabled ? 'true' : 'false');
    }

    function updateHighlightAllButton() {
        const button = byId('architectureVpcHuaweiHighlightAll');

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
        setValue('architectureVpcHuaweiZoomInput', stageZoom);
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
        } else if (previewArchitecture) {
            const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

            if (stageCanvas) {
                stageCanvas.innerHTML = buildSvgMarkup(previewArchitecture) + createPresetPreviewOverlay();
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
        const root = document.querySelector('.architecture-vpc-huawei-tool');
        const markerClass = 'architecture-vpc-huawei-info-marker';

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
                marker.innerHTML = '<span class="architecture-vpc-huawei-info-glyph" aria-hidden="true">i</span>';
                element.appendChild(marker);
            }

            let popover = marker.querySelector('.architecture-vpc-huawei-info-popover');

            if (!popover) {
                popover = document.createElement('span');
                popover.className = 'architecture-vpc-huawei-info-popover';
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
            '<span class="architecture-vpc-huawei-score-tag architecture-vpc-huawei-score-tag-' + escapeHtml(tone) + '">',
            '<i class="' + escapeHtml(iconClass) + '" aria-hidden="true"></i>',
            '<span>' + escapeHtml(label) + '</span>',
            '</span>'
        ].join('');
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

        if (!selectElement || selectElement.dataset.architectureVpcHuaweiEnhancedSelect === 'true') {
            return;
        }

        wrapper.className = 'architecture-vpc-huawei-custom-select';
        button.type = 'button';
        button.className = 'architecture-vpc-huawei-custom-select-trigger';
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');
        valueElement.className = 'architecture-vpc-huawei-custom-select-value';
        icon.className = 'bi bi-chevron-down';
        icon.setAttribute('aria-hidden', 'true');
        menu.className = 'architecture-vpc-huawei-custom-select-menu';
        menu.setAttribute('role', 'listbox');

        button.appendChild(valueElement);
        button.appendChild(icon);
        wrapper.appendChild(button);
        wrapper.appendChild(menu);
        selectElement.classList.add('architecture-vpc-huawei-native-select');
        selectElement.dataset.architectureVpcHuaweiEnhancedSelect = 'true';
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
            optionButton.className = 'architecture-vpc-huawei-custom-select-option';
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
        const errorState = byId('architectureVpcHuaweiErrorState');

        if (!errorState) {
            return;
        }

        errorState.textContent = message;
        setHidden(errorState, false);
    }

    function clearError() {
        setHidden(byId('architectureVpcHuaweiErrorState'), true);
    }

    function getPreset(presetId) {
        return core.getPreset(presetId);
    }

    function validateRequiredElements(root) {
        const missingIds = requiredIds.filter(function (id) {
            return !byId(id);
        });

        if (!root || missingIds.length > 0 || !core) {
            const message = 'Huawei Cloud architecture markup is incomplete: ' + missingIds.join(', ');

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
        const subnetText = defaults.vlans.join(', ');
        const services = [];

        if (defaults.wireless) {
            services.push('Cloud Container Engine (CCE)');
        }

        if (defaults.firewall) {
            services.push('security groups and network ACLs');
        }

        if (defaults.wan) {
            services.push('Enterprise Router');
        }

        if (defaults.monitoring) {
            services.push('Cloud Eye and CTS');
        }

        if (defaults.dhcpDns) {
            services.push('DEW KMS and CSMS');
        }

        if (defaults.hsrp) {
            services.push('WAF and DNS');
        }

        if (defaults.etherChannel) {
            services.push('Elastic Load Balance');
        }

        if (defaults.acl) {
            services.push('VPC flow logs');
        }

        if (defaults.nat) {
            services.push('NAT Gateway egress');
        }

        if (defaults.vpn) {
            services.push('Direct Connect or VPN');
        }

        return [
            'Create a ' + defaults.cloudSize + ' Huawei Cloud architecture across ' + defaults.accessBlocks + ' availability zones.',
            'Use VPC CIDR ' + defaults.trunkVlans + ' with ' + subnetText + '.',
            'Add ' + services.join(', ') + ', enterprise project ' + defaults.ospfArea + ', and ' + core.routingLabel(defaults.routingMode) + '.'
        ].join(' ');
    }

    function syncPresetDescription() {
        setText('architectureVpcHuaweiPresetDescription', getPreset(valueOf('architectureVpcHuaweiPreset')).description);
    }

    function collectValues() {
        return {
            preset: valueOf('architectureVpcHuaweiPreset'),
            presetLabel: getPreset(valueOf('architectureVpcHuaweiPreset')).label,
            cloudSize: valueOf('architectureVpcHuaweiSize'),
            accessBlocks: Number(valueOf('architectureVpcHuaweiAccessBlocks')),
            vlans: valueOf('architectureVpcHuaweiVlans'),
            wireless: checkedOf('architectureVpcHuaweiWireless'),
            firewall: checkedOf('architectureVpcHuaweiFirewall'),
            wan: checkedOf('architectureVpcHuaweiWan'),
            monitoring: checkedOf('architectureVpcHuaweiMonitoring'),
            dhcpDns: checkedOf('architectureVpcHuaweiDhcpDns'),
            routingMode: valueOf('architectureVpcHuaweiRouting'),
            hsrp: checkedOf('architectureVpcHuaweiHsrp'),
            etherChannel: checkedOf('architectureVpcHuaweiEtherChannel'),
            acl: checkedOf('architectureVpcHuaweiAcl'),
            nat: checkedOf('architectureVpcHuaweiNat'),
            vpn: checkedOf('architectureVpcHuaweiVpn'),
            trunkVlans: valueOf('architectureVpcHuaweiTrunkVlans'),
            nativeVlan: valueOf('architectureVpcHuaweiNativeVlan'),
            accessVlan: valueOf('architectureVpcHuaweiAccessVlan'),
            sviGateway: valueOf('architectureVpcHuaweiSviGateway'),
            ospfArea: valueOf('architectureVpcHuaweiOspfArea'),
            bgpAsn: valueOf('architectureVpcHuaweiBgpAsn'),
            redundancyVip: valueOf('architectureVpcHuaweiRedundancyVip'),
            prompt: valueOf('architectureVpcHuaweiPrompt')
        };
    }

    function syncControlsFromSpec(spec) {
        setValue('architectureVpcHuaweiPreset', spec.preset);
        setValue('architectureVpcHuaweiSize', spec.cloudSize);
        setValue('architectureVpcHuaweiAccessBlocks', spec.accessBlocks);
        setValue('architectureVpcHuaweiRouting', spec.routingMode);
        setValue('architectureVpcHuaweiVlans', spec.vlans.join('\n'));
        setChecked('architectureVpcHuaweiWireless', spec.wireless);
        setChecked('architectureVpcHuaweiFirewall', spec.firewall);
        setChecked('architectureVpcHuaweiWan', spec.wan);
        setChecked('architectureVpcHuaweiMonitoring', spec.monitoring);
        setChecked('architectureVpcHuaweiDhcpDns', spec.dhcpDns);
        setChecked('architectureVpcHuaweiHsrp', spec.hsrp);
        setChecked('architectureVpcHuaweiEtherChannel', spec.etherChannel);
        setChecked('architectureVpcHuaweiAcl', spec.acl);
        setChecked('architectureVpcHuaweiNat', spec.nat);
        setChecked('architectureVpcHuaweiVpn', spec.vpn);
        setValue('architectureVpcHuaweiTrunkVlans', spec.trunkVlans);
        setValue('architectureVpcHuaweiNativeVlan', spec.nativeVlan);
        setValue('architectureVpcHuaweiAccessVlan', spec.accessVlan);
        setValue('architectureVpcHuaweiSviGateway', spec.sviGateway);
        setValue('architectureVpcHuaweiOspfArea', spec.ospfArea);
        setValue('architectureVpcHuaweiBgpAsn', spec.bgpAsn);
        setValue('architectureVpcHuaweiRedundancyVip', spec.redundancyVip);

        if (spec.prompt) {
            setValue('architectureVpcHuaweiPrompt', spec.prompt);
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
        if (!currentArchitecture) {
            return null;
        }

        return currentArchitecture.nodes.find(function (node) {
            return node.id === nodeId;
        }) || null;
    }

    function getGroupById(groupId) {
        if (!currentArchitecture) {
            return null;
        }

        return (currentArchitecture.groups || []).find(function (group) {
            return group.id === groupId;
        }) || null;
    }

    function getBaseSvgBounds(architecture) {
        const items = [].concat(architecture.groups || [], architecture.nodes || []);
        const maxX = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.x + item.width);
        }, architecture.width || 1120);
        const maxY = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.y + item.height);
        }, architecture.height || 840);

        return {
            width: Math.max(architecture.width || 1120, Math.ceil(maxX + 80)),
            height: Math.max(architecture.height || 840, Math.ceil(maxY + 80))
        };
    }

    function getDiagramItemById(itemId) {
        return getNodeById(itemId) || getGroupById(itemId);
    }

    function getAllDiagramItems() {
        if (!currentArchitecture) {
            return [];
        }

        return [].concat(currentArchitecture.groups || [], currentArchitecture.nodes || []).filter(Boolean);
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

    function applyGroupLayoutOverrides(architecture) {
        return Object.assign({}, architecture, {
            groups: (architecture.groups || []).map(function (group) {
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
        return iconSvgMap[key] || iconSvgMap.vpc || '';
    }

    function connectorLabelWidth(label) {
        return Math.min(168, Math.max(54, String(label || '').length * 6.6 + 18));
    }

    function diagramStyleMarkup() {
        return [
            '<style>',
            '.architecture-vpc-huawei-canvas-bg{fill:transparent;}',
            '.architecture-vpc-huawei-diagram-group-card{fill:#ffffff;stroke:#fecaca;stroke-width:1.2;stroke-dasharray:0;}',
            '.architecture-vpc-huawei-diagram-group-region .architecture-vpc-huawei-diagram-group-card{fill:#fff7f7;stroke:#ef4444;}',
            '.architecture-vpc-huawei-diagram-group-vpc .architecture-vpc-huawei-diagram-group-card{fill:#fff1f2;stroke:#C7000B;stroke-width:1.8;}',
            '.architecture-vpc-huawei-diagram-group-edge .architecture-vpc-huawei-diagram-group-card{fill:#f6f2ff;stroke:#a56eff;}',
            '.architecture-vpc-huawei-diagram-group-public .architecture-vpc-huawei-diagram-group-card{fill:#F8FAFC;stroke:#111827;}',
            '.architecture-vpc-huawei-diagram-group-private .architecture-vpc-huawei-diagram-group-card{fill:#fff8e1;stroke:#f1c21b;}',
            '.architecture-vpc-huawei-diagram-group-data .architecture-vpc-huawei-diagram-group-card{fill:#f7f3ff;stroke:#8a3ffc;}',
            '.architecture-vpc-huawei-diagram-group-services .architecture-vpc-huawei-diagram-group-card{fill:#f2fbf9;stroke:#334155;}',
            '.architecture-vpc-huawei-diagram-group-external .architecture-vpc-huawei-diagram-group-card{fill:#f6f8fa;stroke:#a2a9b0;}',
            '.architecture-vpc-huawei-diagram-group-title{fill:#0f1f35;font:800 14px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-vpc-huawei-diagram-group-subtitle{fill:#556b82;font:600 12px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-vpc-huawei-node-outline{fill:#fff;stroke:#ef4444;stroke-width:1.4;filter:url(#architectureVpcHuaweiCardShadow);}',
            '.architecture-vpc-huawei-connector-group{cursor:pointer;outline:none;}',
            '.architecture-vpc-huawei-connector-hit{fill:none;stroke:transparent;stroke-width:14;stroke-linecap:round;stroke-linejoin:round;pointer-events:stroke;}',
            '.architecture-vpc-huawei-connector{fill:none;stroke:#111827;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}',
            '.architecture-vpc-huawei-connector-label-bg{fill:#fff;stroke:#fecaca;stroke-width:1;}',
            '.architecture-vpc-huawei-connector-label{fill:#1f3349;font:700 11px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-vpc-huawei-connector-group.is-selected .architecture-vpc-huawei-connector{stroke:#111827;stroke-width:3.2;}',
            '.architecture-vpc-huawei-connector-group.is-selected .architecture-vpc-huawei-connector-label-bg{fill:#fff;stroke:#C7000B;stroke-width:2;}',
            '.architecture-vpc-huawei-connector-group.is-selected .architecture-vpc-huawei-connector-label{fill:#0f172a;}',
            '.architecture-vpc-huawei-diagram-group,.architecture-vpc-huawei-node-shell{cursor:grab;}',
            '.architecture-vpc-huawei-diagram-hitbox{fill:transparent;pointer-events:all;vector-effect:non-scaling-stroke;}',
            '.architecture-vpc-huawei-diagram-group:active,.architecture-vpc-huawei-node-shell:active{cursor:grabbing;}',
            '.architecture-vpc-huawei-diagram-group.is-selected .architecture-vpc-huawei-diagram-hitbox,.architecture-vpc-huawei-node-shell.is-selected .architecture-vpc-huawei-diagram-hitbox{stroke:#C7000B;stroke-width:3;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-diagram-group.is-highlighted .architecture-vpc-huawei-diagram-hitbox,.architecture-vpc-huawei-node-shell.is-highlighted .architecture-vpc-huawei-diagram-hitbox{stroke:#334155;stroke-width:3;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-diagram-group.is-selected .architecture-vpc-huawei-diagram-group-card{stroke:#C7000B;stroke-width:2.8;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-diagram-group.is-highlighted .architecture-vpc-huawei-diagram-group-card{stroke:#334155;stroke-width:2.8;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-resize-handle{fill:#fff;stroke:#C7000B;stroke-width:2;cursor:nwse-resize;filter:url(#architectureVpcHuaweiCardShadow);}',
            '.architecture-vpc-huawei-marquee-selection{fill:rgba(199,0,11,0.12);stroke:#fff;stroke-width:3;stroke-dasharray:8 6;pointer-events:none;filter:drop-shadow(0 6px 14px rgba(15,23,42,0.24));}',
            '.architecture-vpc-huawei-stage-highlighted .architecture-vpc-huawei-diagram-group-card{stroke:#C7000B;stroke-width:2.2;}',
            '.architecture-vpc-huawei-stage-highlighted .architecture-vpc-huawei-node-outline{stroke:#C7000B;stroke-width:2.8;}',
            '.architecture-vpc-huawei-stage-highlighted .architecture-vpc-huawei-connector{stroke:#111827;stroke-width:2.4;}',
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
            'architecture-vpc-huawei-diagram-group',
            'architecture-vpc-huawei-diagram-group-' + (group.tone || 'default'),
            isDiagramItemSelected(group.id) ? 'is-selected' : '',
            group.id === highlightedNodeId || stageDiagramHighlighted ? 'is-highlighted' : ''
        ].filter(Boolean).join(' ');

        return [
            '<g class="' + escapeHtml(classes) + '" ' + diagramItemDataAttributes(group) + ' tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml(group.title || '') + '">',
            '<rect class="architecture-vpc-huawei-diagram-group-card" x="' + group.x + '" y="' + group.y + '" width="' + group.width + '" height="' + group.height + '" rx="18" />',
            '<text class="architecture-vpc-huawei-diagram-group-title" x="' + (group.x + 18) + '" y="' + (group.y + 28) + '">' + escapeHtml(group.title || '') + '</text>',
            subtitle ? '<text class="architecture-vpc-huawei-diagram-group-subtitle" x="' + (group.x + 18) + '" y="' + (group.y + 48) + '">' + escapeHtml(subtitle) + '</text>' : '',
            '<rect class="architecture-vpc-huawei-diagram-hitbox" x="' + group.x + '" y="' + group.y + '" width="' + group.width + '" height="' + group.height + '" rx="18" />',
            '</g>'
        ].join('');
    }

    function renderResizeHandle(item) {
        return [
            '<rect class="architecture-vpc-huawei-resize-handle" data-node-id="' + escapeHtml(item.id) + '" x="' + formatSvgNumber(item.x + item.width - 14) + '" y="' + formatSvgNumber(item.y + item.height - 14) + '" width="14" height="14" rx="4" aria-hidden="true" />'
        ].join('');
    }

    function computeSvgBounds(architecture) {
        const items = [].concat(architecture.groups || [], architecture.nodes || []).filter(Boolean);
        const maxX = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.x + item.width);
        }, architecture.width || 1120);
        const maxY = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.y + item.height);
        }, architecture.height || 840);

        return {
            width: Math.max(architecture.width || 1120, Math.ceil(maxX + 80)),
            height: Math.max(architecture.height || 840, Math.ceil(maxY + 80))
        };
    }

    function computeDiagramContentBounds(architecture, padding) {
        const items = [].concat(architecture.groups || [], architecture.nodes || []).filter(Boolean);
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
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');
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

    function buildSvgMarkup(architecture, options) {
        const renderOptions = options || {};
        const svgBounds = computeSvgBounds(architecture);
        const nodeMap = {};
        const groupMarkup = [];
        const connectorMarkup = [];
        const nodeMarkup = [];
        const resizeHandleMarkup = [];

        (architecture.groups || []).forEach(function (group) {
            groupMarkup.push(renderDiagramGroup(group));
        });

        architecture.nodes.forEach(function (node) {
            nodeMap[node.id] = node;
        });

        architecture.connectors.forEach(function (connector) {
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
                'architecture-vpc-huawei-connector-group',
                selectedConnectorId === connectorId ? 'is-selected' : ''
            ].filter(Boolean).join(' ');

            connectorMarkup.push([
                '<g class="' + connectorClasses + '" data-connector-id="' + escapeHtml(connectorId) + '" tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml((connector.label || 'Connector') + ' connector') + '">',
                '<path class="architecture-vpc-huawei-connector-hit" d="' + connectorPathValue + '" />',
                '<path class="architecture-vpc-huawei-connector" d="' + connectorPathValue + '" marker-end="url(#architectureVpcHuaweiArrow)" />',
                '<rect class="architecture-vpc-huawei-connector-label-bg" x="' + formatSvgNumber(label.x - (labelWidth / 2)) + '" y="' + formatSvgNumber(label.y - 15) + '" width="' + formatSvgNumber(labelWidth) + '" height="18" rx="9" />',
                '<text class="architecture-vpc-huawei-connector-label" x="' + label.x + '" y="' + label.y + '" text-anchor="middle">' + escapeHtml(connector.label) + '</text>',
                '</g>'
            ].join(''));
        });

        architecture.nodes.forEach(function (node) {
            const classes = [
                'architecture-vpc-huawei-node-shell',
                isDiagramItemSelected(node.id) ? 'is-selected' : '',
                node.id === highlightedNodeId || stageDiagramHighlighted ? 'is-highlighted' : ''
            ].filter(Boolean).join(' ');

            nodeMarkup.push([
                '<g class="' + classes + '" ' + diagramItemDataAttributes(node) + ' tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml(node.title) + '">',
                '<rect class="architecture-vpc-huawei-node-outline" x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '" rx="10" />',
                '<foreignObject x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '">',
                '<div xmlns="http://www.w3.org/1999/xhtml" class="architecture-vpc-huawei-node-card">',
                '<div class="architecture-vpc-huawei-node-icon">' + iconMarkup(node.icon) + '</div>',
                '<div class="architecture-vpc-huawei-node-copy">',
                '<div class="architecture-vpc-huawei-node-title">' + escapeHtml(node.title) + '</div>',
                '<div class="architecture-vpc-huawei-node-subtitle" title="' + escapeHtml(node.subtitle) + '">' + escapeHtml(node.subtitle) + '</div>',
                '</div>',
                '</div>',
                '</foreignObject>',
                '<rect class="architecture-vpc-huawei-diagram-hitbox" x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '" rx="10" />',
                '</g>'
            ].join(''));
        });

        if (renderOptions.includeEditHandles === true) {
            (architecture.groups || []).forEach(function (group) {
                if (group.id === selectedNodeId) {
                    resizeHandleMarkup.push(renderResizeHandle(group));
                }
            });

            architecture.nodes.forEach(function (node) {
                if (node.id === selectedNodeId) {
                    resizeHandleMarkup.push(renderResizeHandle(node));
                }
            });
        }

        return [
            '<svg xmlns="http://www.w3.org/2000/svg" class="architecture-vpc-huawei-stage-svg' + (stageDiagramHighlighted ? ' architecture-vpc-huawei-stage-highlighted' : '') + '" viewBox="0 0 ' + svgBounds.width + ' ' + svgBounds.height + '" width="' + svgBounds.width + '" height="' + svgBounds.height + '" role="img" aria-label="Huawei Cloud architecture">',
            '<defs>',
            '<filter id="architectureVpcHuaweiSoftShadow" x="-10%" y="-10%" width="120%" height="125%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.10"/></filter>',
            '<filter id="architectureVpcHuaweiCardShadow" x="-18%" y="-18%" width="136%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.12"/></filter>',
            '<marker id="architectureVpcHuaweiArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">',
            '<path d="M 0 0 L 10 5 L 0 10 z" fill="#111827" />',
            '</marker>',
            '</defs>',
            diagramStyleMarkup(),
            '<rect class="architecture-vpc-huawei-canvas-bg" x="0" y="0" width="' + svgBounds.width + '" height="' + svgBounds.height + '" />',
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
        setValue('architectureVpcHuaweiZoomInput', stageZoom);
        setText('architectureVpcHuaweiZoomLabel', '%');
        applyStageZoom();
    }

    function applyStageZoom() {
        const svg = byId('architectureVpcHuaweiStageCanvas') ? byId('architectureVpcHuaweiStageCanvas').querySelector('svg') : null;
        const architecture = currentArchitecture || previewArchitecture;

        if (!svg || !architecture) {
            return;
        }

        const bounds = computeSvgBounds(architecture);

        svg.style.width = Math.round(bounds.width * (stageZoom / 100)) + 'px';
        svg.style.height = Math.round(bounds.height * (stageZoom / 100)) + 'px';
    }

    function setStageZoomToFit() {
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');
        const architecture = currentArchitecture || previewArchitecture;

        if (!stageCanvas || !architecture) {
            setStageZoom(50);
            return;
        }

        const availableWidth = Math.max(1, stageCanvas.clientWidth - 48);
        const availableHeight = Math.max(1, stageCanvas.clientHeight - 48);
        const bounds = computeDiagramContentBounds(architecture, 42) || computeSvgBounds(architecture);
        const widthZoom = (availableWidth / bounds.width) * 100;
        const heightZoom = (availableHeight / bounds.height) * 100;

        setStageZoom(Math.floor(Math.min(widthZoom, heightZoom, 100)));
        window.requestAnimationFrame(function () {
            scrollStageToBounds(bounds, 'auto');
        });
    }

    function renderStage(architecture) {
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

        if (!stageCanvas) {
            return;
        }

        currentSvgMarkup = buildSvgMarkup(architecture);
        stageCanvas.classList.remove('architecture-vpc-huawei-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(architecture, {
            includeEditHandles: true
        });
        applyStageZoom();
        bindStageNodes(stageCanvas);
        bindStageMarqueeSelection(stageCanvas.querySelector('svg'));
        focusPendingStageNode(stageCanvas);
    }

    function renderStageHeader(spec) {
        const stageTitle = byId('architectureVpcHuaweiStageTitle');
        const stageSubtitle = byId('architectureVpcHuaweiStageSubtitle');
        const presetChipLabel = String(spec.presetLabel || 'Custom architecture').trim() + ' preset';

        if (stageTitle) {
            stageTitle.textContent = 'Huawei Cloud VPC Architecture';
        }

        if (stageSubtitle) {
            stageSubtitle.hidden = false;
            stageSubtitle.innerHTML = '<span class="architecture-vpc-huawei-stage-preset-chip" title="' + escapeHtml(presetChipLabel) + '">' + escapeHtml(presetChipLabel) + '</span>';
        }

        const meta = byId('architectureVpcHuaweiStageMeta');

        if (!meta) {
            return;
        }

        meta.innerHTML = [
            createStageToneChip('bi bi-cloud', core.cloudSizeLabel(spec.cloudSize), 'size'),
            createStageToneChip('bi bi-grid-3x3-gap', core.zoneCountLabel(spec.accessBlocks), 'blocks'),
            createStageToneChip('bi bi-arrow-left-right', core.routingLabel(spec.routingMode), 'routing'),
            createStageToneChip('bi bi-diagram-3', spec.vlans.length + ' subnet tiers', 'services'),
            createStageToneChip('bi bi-shield-check', [spec.hsrp ? 'WAF' : '', spec.etherChannel ? 'Elastic Load Balance' : ''].filter(Boolean).join(' + ') || 'VPC ' + spec.trunkVlans, 'redundancy')
        ].join('');
    }

    function renderInventory() {
        const tableBody = byId('architectureVpcHuaweiInventoryTableBody');
        const sortMode = valueOf('architectureVpcHuaweiInventorySort') || 'id';
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
                '<td><button type="button" class="architecture-vpc-huawei-row-copy" data-copy-row="' + escapeHtml(copyText) + '" aria-label="Copy inventory row for ' + escapeHtml(row.component) + '"><i class="bi bi-clipboard" aria-hidden="true"></i><span class="architecture-vpc-huawei-visually-hidden">Copy</span></button></td>',
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
        const hiddenInput = byId('architectureVpcHuaweiInventorySort');
        const summary = byId('architectureVpcHuaweiInventorySortSummary');
        const sortSelect = byId('architectureVpcHuaweiInventorySortSelect');
        const sortOptions = all('.architecture-vpc-huawei-sort-option');
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
        setText('architectureVpcHuaweiPromptSummary', currentNotes.summary || '');
        renderList('architectureVpcHuaweiKeywordList', currentNotes.keywords);
        renderList('architectureVpcHuaweiAssumptionList', currentNotes.assumptions);
        renderList('architectureVpcHuaweiModelList', currentNotes.model);
        renderList('architectureVpcHuaweiProsList', currentNotes.pros);
        renderList('architectureVpcHuaweiConsList', currentNotes.cons);
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
            ready: 'Production-ready cloud architecture',
            solid: 'Delivery architecture draft',
            review: 'Needs architecture review'
        }[tone] || 'Cloud architecture draft';
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
                label: core.cloudSizeLabel(spec.cloudSize)
            },
            {
                tone: 'blocks',
                icon: 'bi bi-grid-3x3-gap',
                label: core.zoneCountLabel(spec.accessBlocks)
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
                label: [spec.hsrp ? 'WAF' : '', spec.etherChannel ? 'Elastic Load Balance' : ''].filter(Boolean).join(' + ')
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
        const score = core.buildArchitectureScore(spec);
        const status = byId('architectureVpcHuaweiOutputStatus');
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

        status.innerHTML = [
            '<div class="architecture-vpc-huawei-score-ring-card architecture-vpc-huawei-score-ring-card-' + escapeHtml(tone) + '" tabindex="0" role="group" aria-label="Architecture score ' + escapeHtml(String(score.score)) + ' out of 100. ' + escapeHtml(score.label) + '">',
            '<div class="architecture-vpc-huawei-score-value" style="--progress-angle: ' + escapeHtml(String(ringProgressAngle)) + 'deg;" aria-label="Architecture score ' + escapeHtml(String(score.score)) + ' out of 100">',
            '<svg class="architecture-vpc-huawei-score-ring" viewBox="0 0 140 140" aria-hidden="true" focusable="false">',
            '<circle class="architecture-vpc-huawei-score-ring-track" cx="70" cy="70" r="' + escapeHtml(String(ringRadius)) + '"></circle>',
            '<circle class="architecture-vpc-huawei-score-ring-glow" cx="70" cy="70" r="' + escapeHtml(String(ringRadius)) + '" transform="rotate(-90 70 70)" stroke-dasharray="' + escapeHtml(String(ringProgressLength)) + ' ' + escapeHtml(String(ringGapLength)) + '"></circle>',
            '<circle class="architecture-vpc-huawei-score-ring-fill" cx="70" cy="70" r="' + escapeHtml(String(ringRadius)) + '" transform="rotate(-90 70 70)" stroke-dasharray="' + escapeHtml(String(ringProgressLength)) + ' ' + escapeHtml(String(ringGapLength)) + '"></circle>',
            '</svg>',
            '<div class="architecture-vpc-huawei-score-center">',
            '<span class="architecture-vpc-huawei-score-value-number">' + escapeHtml(String(score.score)) + '</span>',
            '<span class="architecture-vpc-huawei-score-caption">/100</span>',
            '</div>',
            '</div>',
            '<span class="architecture-vpc-huawei-score-label">',
            '<span class="architecture-vpc-huawei-score-label-orb" aria-hidden="true"><i class="' + escapeHtml(labelIcon) + '"></i></span>',
            '<span class="architecture-vpc-huawei-score-label-text">' + escapeHtml(score.label) + '</span>',
            '</span>',
            '</div>',
            '<div class="architecture-vpc-huawei-score-copy">',
            '<div class="architecture-vpc-huawei-score-kicker">Architecture Score</div>',
            '<div class="architecture-vpc-huawei-score-summary">' + escapeHtml(scoreBand(tone)) + '</div>',
            '<div class="architecture-vpc-huawei-score-detail">' + escapeHtml(score.summary) + '</div>',
            '<div class="architecture-vpc-huawei-score-tags">',
            tags.map(function (tag) {
                return [
                    '<span class="architecture-vpc-huawei-score-tag architecture-vpc-huawei-score-tag-' + escapeHtml(tag.tone) + '">',
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
        const zoneCount = Number(spec.accessBlocks) || 1;

        return [
            {
                label: 'Security',
                score: clampAssessmentScore(72 + (spec.firewall ? 10 : -8) + (spec.acl ? 5 : 0) + (spec.hsrp ? 5 : 0) + (spec.vpn ? 4 : 0)),
                icon: 'bi bi-shield-check',
                tone: 'security'
            },
            {
                label: 'Reliability',
                score: clampAssessmentScore(64 + (zoneCount >= 2 ? 14 : -8) + (spec.etherChannel ? 9 : 0) + (spec.hsrp ? 7 : 0) + (spec.wan ? 5 : 0)),
                icon: 'bi bi-cloud-check',
                tone: 'reliability'
            },
            {
                label: 'Performance',
                score: clampAssessmentScore(72 + (spec.etherChannel ? 10 : 0) + (zoneCount >= 3 ? 4 : 0) + (spec.routingMode !== 'static' ? 4 : 0) + (spec.wireless ? 3 : 0)),
                icon: 'bi bi-lightning-charge',
                tone: 'performance'
            },
            {
                label: 'Cost Optimization',
                score: clampAssessmentScore(76 + (zoneCount <= 2 ? 5 : 0) + (spec.nat ? 2 : 0) + (spec.firewall ? -1 : 1) + (!spec.wireless ? 2 : 0)),
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
        const scorePayload = core.buildArchitectureScore(spec);
        const gapCount = [
            (Number(spec.accessBlocks) || 1) < 2,
            !spec.etherChannel,
            !spec.firewall,
            !spec.monitoring,
            !spec.dhcpDns
        ].filter(Boolean).length;
        let level = 'Low';
        let tone = 'low';
        let icon = 'bi bi-shield-check';
        let summary = 'No critical diagram-level gaps detected.';
        let detail = 'Review IAM, security groups, routing, and data protection settings before production change approval.';

        if (scorePayload.score < 65 || gapCount >= 4) {
            level = 'High';
            tone = 'high';
            icon = 'bi bi-exclamation-octagon';
            summary = 'Several design gaps need attention.';
            detail = 'Prioritize multi-zone placement, ingress protection, private routing, and monitoring before using this as a delivery baseline.';
        } else if (scorePayload.score < 75 || gapCount >= 3) {
            level = 'Elevated';
            tone = 'elevated';
            icon = 'bi bi-exclamation-triangle';
            summary = 'Some architecture trade-offs need review.';
            detail = 'Check the highlighted resilience, access control, and service ownership choices before handoff.';
        } else if (scorePayload.score < 85 || gapCount >= 2) {
            level = 'Moderate';
            tone = 'moderate';
            icon = 'bi bi-shield-exclamation';
            summary = 'A few design choices need confirmation.';
            detail = 'Validate zone spread, security controls, and operational ownership before rollout.';
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
        const pillarBreakdownOutput = byId('architectureVpcHuaweiPillarBreakdown');
        const riskLevelOutput = byId('architectureVpcHuaweiRiskLevel');

        if (!pillarBreakdownOutput || !riskLevelOutput) {
            return;
        }

        const pillars = buildPillarBreakdown(spec);
        const risk = buildRiskLevel(spec);

        pillarBreakdownOutput.className = 'architecture-vpc-huawei-assessment-card architecture-vpc-huawei-pillar-card';
        riskLevelOutput.className = 'architecture-vpc-huawei-assessment-card architecture-vpc-huawei-risk-card architecture-vpc-huawei-risk-card-' + risk.tone;

        pillarBreakdownOutput.innerHTML = [
            '<h3 class="architecture-vpc-huawei-result-section-title">Pillar Breakdown</h3>',
            '<div class="architecture-vpc-huawei-pillar-list">',
            pillars.map(function (pillar) {
                return [
                    '<div class="architecture-vpc-huawei-pillar-row architecture-vpc-huawei-pillar-row-' + escapeHtml(pillar.tone) + '">',
                    '<span class="architecture-vpc-huawei-pillar-icon" aria-hidden="true"><i class="' + escapeHtml(pillar.icon) + '"></i></span>',
                    '<span class="architecture-vpc-huawei-pillar-name">' + escapeHtml(pillar.label) + '</span>',
                    '<span class="architecture-vpc-huawei-pillar-meter" aria-hidden="true"><span style="--pillar-score: ' + escapeHtml(String(pillar.score)) + '%;"></span></span>',
                    '<span class="architecture-vpc-huawei-pillar-score"><strong>' + escapeHtml(String(pillar.score)) + '</strong> /100</span>',
                    '</div>'
                ].join('');
            }).join(''),
            '</div>',
            '<div class="architecture-vpc-huawei-pillar-legend" aria-label="Pillar score legend">',
            '<span><i class="architecture-vpc-huawei-legend-dot architecture-vpc-huawei-legend-dot-excellent"></i>Excellent (90-100)</span>',
            '<span><i class="architecture-vpc-huawei-legend-dot architecture-vpc-huawei-legend-dot-good"></i>Good (70-89)</span>',
            '<span><i class="architecture-vpc-huawei-legend-dot architecture-vpc-huawei-legend-dot-fair"></i>Fair (50-69)</span>',
            '<span><i class="architecture-vpc-huawei-legend-dot architecture-vpc-huawei-legend-dot-needs"></i>Needs improvement (&lt;50)</span>',
            '</div>'
        ].join('');

        riskLevelOutput.innerHTML = [
            '<h3 class="architecture-vpc-huawei-result-section-title">Risk Level</h3>',
            '<div class="architecture-vpc-huawei-risk-body">',
            '<div class="architecture-vpc-huawei-risk-icon" aria-hidden="true"><i class="' + escapeHtml(risk.icon) + '"></i></div>',
            '<div class="architecture-vpc-huawei-risk-copy">',
            '<div class="architecture-vpc-huawei-risk-level">' + escapeHtml(risk.level) + '</div>',
            '<p>' + escapeHtml(risk.summary) + '<br>' + escapeHtml(risk.detail) + '</p>',
            '</div>',
            '</div>',
            '<div class="architecture-vpc-huawei-risk-meta">',
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
        const jsonOutput = byId('architectureVpcHuaweiJsonOutput');

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
        previewArchitecture = null;
        currentSpec = renderOptions.controlsAuthoritative === true
            ? buildControlsAuthoritativeSpec(spec)
            : core.inferFromPrompt(spec);
        currentArchitecture = applyGroupLayoutOverrides(core.buildArchitecture(currentSpec, layoutOverrides));
        currentInventory = core.buildInventory(currentArchitecture);
        currentNotes = core.buildPromptNotes(currentSpec);
        currentPayload = core.buildExportPayload(currentSpec, layoutOverrides, currentInventory, currentNotes);
        syncConnectorPayloadState();

        setHidden(byId('architectureVpcHuaweiStageEmpty'), true);
        setHidden(byId('architectureVpcHuaweiStageCanvas'), false);
        setHidden(byId('architectureVpcHuaweiOutputEmpty'), true);
        setHidden(byId('architectureVpcHuaweiOutputContent'), false);
        setHidden(byId('architectureVpcHuaweiOutputStatus'), false);

        renderStageHeader(currentSpec);
        renderStage(currentArchitecture);

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

    function resetGeneratedArchitectureState() {
        currentSpec = null;
        currentArchitecture = null;
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
        if (byId('architectureVpcHuaweiPillarBreakdown')) {
            byId('architectureVpcHuaweiPillarBreakdown').innerHTML = '';
        }
        if (byId('architectureVpcHuaweiRiskLevel')) {
            byId('architectureVpcHuaweiRiskLevel').innerHTML = '';
        }
        clearStageUndoHistory();
        updateHighlightAllButton();
    }

    function createPresetPreviewOverlay() {
        return [
            '<div class="architecture-vpc-huawei-stage-preview-overlay" role="status">',
            '<div class="architecture-vpc-huawei-stage-preview-panel">',
            '<span class="architecture-vpc-huawei-stage-preview-icon"><i class="bi bi-stars" aria-hidden="true"></i></span>',
            '<strong>Choose a preset to generate diagram</strong>',
            '<span>Pick a preset or click Generate Architecture to create the editable Huawei Cloud workspace.</span>',
            '</div>',
            '</div>'
        ].join('');
    }

    function renderPresetPreview(preset, options) {
        const previewOptions = options || {};
        const previewPreset = preset || getPreset(valueOf('architectureVpcHuaweiPreset'));
        const previewSpec = core.inferFromPrompt(Object.assign({}, previewPreset.defaults, {
            preset: previewPreset.id,
            presetLabel: previewPreset.label,
            prompt: buildDefaultPrompt(previewPreset)
        }));
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

        if (!stageCanvas) {
            return;
        }

        if (previewOptions.resetZoom === true) {
            stageZoom = 50;
            setValue('architectureVpcHuaweiZoomInput', stageZoom);
        }

        clearError();
        resetGeneratedArchitectureState();
        previewArchitecture = core.buildArchitecture(previewSpec, {});
        renderStageHeader(previewSpec);
        stageCanvas.classList.add('architecture-vpc-huawei-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(previewArchitecture) + createPresetPreviewOverlay();
        setHidden(byId('architectureVpcHuaweiStageEmpty'), true);
        setHidden(stageCanvas, false);
        setHidden(byId('architectureVpcHuaweiOutputEmpty'), false);
        setHidden(byId('architectureVpcHuaweiOutputContent'), true);
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
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

        if (!stageCanvas) {
            return;
        }

        if (previewOptions.resetZoom === true) {
            stageZoom = 50;
            setValue('architectureVpcHuaweiZoomInput', stageZoom);
        }

        clearError();
        resetGeneratedArchitectureState();
        previewArchitecture = core.buildArchitecture(previewSpec, {});
        renderStageHeader(previewSpec);
        stageCanvas.classList.add('architecture-vpc-huawei-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(previewArchitecture) + createPresetPreviewOverlay();
        setHidden(byId('architectureVpcHuaweiStageEmpty'), true);
        setHidden(stageCanvas, false);
        setHidden(byId('architectureVpcHuaweiOutputEmpty'), false);
        setHidden(byId('architectureVpcHuaweiOutputContent'), true);

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
            'architectureVpcHuaweiSize',
            'architectureVpcHuaweiAccessBlocks',
            'architectureVpcHuaweiRouting',
            'architectureVpcHuaweiVlans',
            'architectureVpcHuaweiWireless',
            'architectureVpcHuaweiFirewall',
            'architectureVpcHuaweiWan',
            'architectureVpcHuaweiMonitoring',
            'architectureVpcHuaweiDhcpDns',
            'architectureVpcHuaweiHsrp',
            'architectureVpcHuaweiEtherChannel',
            'architectureVpcHuaweiAcl',
            'architectureVpcHuaweiNat',
            'architectureVpcHuaweiVpn',
            'architectureVpcHuaweiTrunkVlans',
            'architectureVpcHuaweiNativeVlan',
            'architectureVpcHuaweiAccessVlan',
            'architectureVpcHuaweiSviGateway',
            'architectureVpcHuaweiOspfArea',
            'architectureVpcHuaweiBgpAsn',
            'architectureVpcHuaweiRedundancyVip'
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
        const connector = currentArchitecture && Array.isArray(currentArchitecture.connectors)
            ? currentArchitecture.connectors.find(function (item) {
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
        renderStage(currentArchitecture);
    }

    function updateSelectedNodeEditor() {
        selectedNodeIds = normalizeSelectedNodeIds(selectedNodeIds);

        if (selectedNodeId && !selectedNodeIds.includes(selectedNodeId)) {
            selectedNodeIds.unshift(selectedNodeId);
            selectedNodeIds = normalizeSelectedNodeIds(selectedNodeIds);
        }

        const selectedItems = getSelectedDiagramItems();
        const selectedNode = getDiagramItemById(selectedNodeId) || selectedItems[0] || null;

        setHidden(byId('architectureVpcHuaweiSelectedEmpty'), Boolean(selectedNode));
        setHidden(byId('architectureVpcHuaweiSelectedEditor'), !selectedNode);

        if (!selectedNode) {
            selectedNodeId = '';
            selectedNodeIds = [];
            return;
        }

        selectedNodeId = selectedNode.id;
        selectedNodeIds = selectedNodeIds.length > 0 ? selectedNodeIds : [selectedNodeId];
        setText(
            'architectureVpcHuaweiSelectedName',
            selectedNodeIds.length > 1
                ? selectedNodeIds.length + ' items selected - Primary: ' + selectedNode.title
                : selectedNode.title
        );
        setValue('architectureVpcHuaweiSelectedX', Math.round(selectedNode.x));
        setValue('architectureVpcHuaweiSelectedY', Math.round(selectedNode.y));
        setValue('architectureVpcHuaweiSelectedWidth', Math.round(selectedNode.width));
        setValue('architectureVpcHuaweiSelectedHeight', Math.round(selectedNode.height));
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
        const nextX = Number(valueOf('architectureVpcHuaweiSelectedX'));
        const nextY = Number(valueOf('architectureVpcHuaweiSelectedY'));
        const nextWidth = Math.max(minimumSize.width, Number(valueOf('architectureVpcHuaweiSelectedWidth')));
        const nextHeight = Math.max(minimumSize.height, Number(valueOf('architectureVpcHuaweiSelectedHeight')));

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
        return Array.from(svgElement.querySelectorAll('.architecture-vpc-huawei-node-shell, .architecture-vpc-huawei-diagram-group')).filter(function (element) {
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
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

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

        if (target.closest('.architecture-vpc-huawei-resize-handle, .architecture-vpc-huawei-node-shell')) {
            return true;
        }

        if (target.closest('.architecture-vpc-huawei-connector-group')) {
            return true;
        }

        const group = target.closest('.architecture-vpc-huawei-diagram-group');

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
            marquee.setAttribute('class', 'architecture-vpc-huawei-marquee-selection');
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
        all('.architecture-vpc-huawei-connector-group', stageCanvas).forEach(function (connectorElement) {
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

        all('.architecture-vpc-huawei-node-shell, .architecture-vpc-huawei-diagram-group', stageCanvas).forEach(function (nodeElement) {
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

                if (!node || event.button !== 0 || event.target.closest('.architecture-vpc-huawei-resize-handle')) {
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
                renderStage(currentArchitecture);
            });
        });

        all('.architecture-vpc-huawei-resize-handle', stageCanvas).forEach(function (handleElement) {
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

        return target.closest('input, textarea, select, button, summary, a[href], [contenteditable="true"], .architecture-vpc-huawei-custom-select') !== null;
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

        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

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
        const outputButtons = all('.architecture-vpc-huawei-tab-btn');
        const outputPanels = all('.architecture-vpc-huawei-tab-panel');
        const configButtons = all('.architecture-vpc-huawei-config-tab');
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
        const promptBlocks = all('.markdown-content pre.architecture-vpc-huawei-prompt-pre');
        const promptCopyButtons = all('.architecture-vpc-huawei-prompt-copy-btn');

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
            showError('Generate an architecture before downloading SVG.');
            return;
        }

        downloadBlob('architecture-vpc-huawei.svg', 'image/svg+xml;charset=utf-8', currentSvgMarkup);
    }

    function exportPng() {
        return new Promise(function (resolve, reject) {
            if (!currentSvgMarkup || !currentArchitecture) {
                showError('Generate an architecture before exporting PNG.');
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
                const bounds = computeSvgBounds(currentArchitecture);

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
                    link.download = 'architecture-vpc-huawei.png';
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
            showError('Generate an architecture before downloading JSON.');
            return;
        }

        downloadBlob('architecture-vpc-huawei.json', 'application/json;charset=utf-8', JSON.stringify(currentPayload, null, 2));
    }

    function copyJson() {
        if (!currentPayload) {
            showError('Generate an architecture before copying JSON.');
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
            popup: byId('architectureVpcHuaweiUsageHelpPopup'),
            button: byId('architectureVpcHuaweiUsageHelpButton'),
            closeButton: byId('architectureVpcHuaweiUsageHelpClose')
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
        const stageShell = byId('architectureVpcHuaweiStageShell');
        const button = byId('architectureVpcHuaweiFullscreen');

        if (!stageShell || !button) {
            return;
        }

        const isExpanded = document.fullscreenElement === stageShell || stageShell.classList.contains('architecture-vpc-huawei-stage-expanded');
        const icon = button.querySelector('i');
        const label = isExpanded ? 'Close fullscreen' : 'Open fullscreen';

        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);

        if (icon) {
            icon.className = isExpanded ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen';
        }
    }

    function setStageExpanded(isExpanded) {
        const stageShell = byId('architectureVpcHuaweiStageShell');

        if (!stageShell) {
            return;
        }

        stageShell.classList.toggle('architecture-vpc-huawei-stage-expanded', Boolean(isExpanded));
        document.body.classList.toggle('architecture-vpc-huawei-stage-expanded-lock', Boolean(isExpanded));
        updateFullscreenButton();
    }

    async function toggleFullscreen() {
        const stageShell = byId('architectureVpcHuaweiStageShell');

        if (!stageShell) {
            return;
        }

        try {
            if (stageShell.classList.contains('architecture-vpc-huawei-stage-expanded')) {
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
        bindClick('architectureVpcHuaweiGenerate', generateFromControls);
        bindClick('architectureVpcHuaweiReset', function () {
            applyPreset(valueOf('architectureVpcHuaweiPreset'), true);
        });
        byId('architectureVpcHuaweiPreset').addEventListener('change', function () {
            applyPreset(valueOf('architectureVpcHuaweiPreset'), true);
        });
        bindControlChangeHandlers();
        all('.architecture-vpc-huawei-sort-option').forEach(function (option) {
            option.addEventListener('click', function () {
                setInventorySortMode(option.dataset.sortValue || 'id');
            });
        });
        bindClick('architectureVpcHuaweiZoomOut', function () {
            setStageZoom(stageZoom - 10);
        });
        bindClick('architectureVpcHuaweiZoomIn', function () {
            setStageZoom(stageZoom + 10);
        });
        byId('architectureVpcHuaweiZoomInput').addEventListener('change', function (event) {
            setStageZoom(event.target.value);
        });
        bindClick('architectureVpcHuaweiZoomFit', function () {
            setStageZoomToFit();
        });
        bindClick('architectureVpcHuaweiZoomActual', function () {
            setStageZoom(100);
        });
        bindClick('architectureVpcHuaweiUndoStageEdit', function () {
            undoStageEdit();
        });
        bindClick('architectureVpcHuaweiHighlightAll', function () {
            setStageDiagramHighlighted(!stageDiagramHighlighted);
        });
        bindClick('architectureVpcHuaweiZoomHideUi', function () {
            toggleStageUi(byId('architectureVpcHuaweiStageShell'));
        });
        bindClick('architectureVpcHuaweiFullscreen', toggleFullscreen);
        bindClick('architectureVpcHuaweiResetLayout', function () {
            if (!currentSpec) {
                renderPresetPreview(getPreset(valueOf('architectureVpcHuaweiPreset')), {
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
            setValue('architectureVpcHuaweiZoomInput', stageZoom);
            updateHighlightAllButton();
            renderResult(currentSpec, {
                autoFitStage: true
            });
        });
        bindClick('architectureVpcHuaweiUsageHelpButton', function () {
            setUsageHelpOpen(true);
        });
        bindClick('architectureVpcHuaweiUsageHelpClose', function () {
            setUsageHelpOpen(false);
        });
        byId('architectureVpcHuaweiUsageHelpPopup').addEventListener('click', function (event) {
            if (event.target !== byId('architectureVpcHuaweiUsageHelpPopup')) {
                return;
            }

            setUsageHelpOpen(false);
        });
        byId('architectureVpcHuaweiUsageHelpPopup').addEventListener('keydown', handleUsageHelpKeydown);
        bindClick('architectureVpcHuaweiHighlightNode', highlightSelectedNode);
        bindClick('architectureVpcHuaweiApplyNode', applySelectedNodeValues);
        bindClick('architectureVpcHuaweiResetNode', resetSelectedNode);
        bindClick('architectureVpcHuaweiDownloadSvg', downloadSvg);
        bindClick('architectureVpcHuaweiExportPng', function () {
            exportPng().catch(function () {
                showError('PNG export failed.');
            });
        });
        bindClick('architectureVpcHuaweiCopyJson', function () {
            copyJson().catch(function () {
                showError('Copy JSON failed.');
            });
        });
        bindClick('architectureVpcHuaweiDownloadJson', downloadJson);
        bindClick('architectureVpcHuaweiImportJsonButton', function () {
            byId('architectureVpcHuaweiImportJson').click();
        });
        byId('architectureVpcHuaweiImportJson').addEventListener('change', handleImportChange);
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
            const stageShell = byId('architectureVpcHuaweiStageShell');

            if (event.key === 'Escape' && stageShell && stageShell.classList.contains('architecture-vpc-huawei-stage-expanded')) {
                setStageExpanded(false);
            }
        });
        document.addEventListener('wheel', handleWheelZoom, {
            passive: false
        });
        document.addEventListener('click', function (event) {
            if (event.target.closest('.architecture-vpc-huawei-custom-select')) {
                return;
            }

            closeCustomSelects();
        });
        bindTabs();
    }

    document.addEventListener('DOMContentLoaded', function () {
        const root = document.querySelector('.architecture-vpc-huawei-tool');

        if (!validateRequiredElements(root)) {
            return;
        }

        initializeCustomSelects();
        bindEvents(root);
        initMarkdownCopyButtons();
        syncPresetDescription();
        applyPreset('secure-vpc-app', false);
        applyWorkspaceInfoMarkers();
    });

    /**
     * Public browser API for the Huawei Cloud architecture workspace.
     *
     * @type {Object}
     */
    const publicApi = Object.freeze({
        toolId: core.toolId,
        collectValues: collectValues,
        renderResult: renderResult
    });

    globalScope.InfraStackArchitectureVpcHuawei = publicApi;
    globalScope.InfraStackArchitectureVpcHuaweiArchitecture = publicApi;
}(window));
