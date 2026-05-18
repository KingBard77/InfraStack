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
            "__DOM_PREFIX__SelectedShell",
            "__DOM_PREFIX__SelectedEmpty",
            "__DOM_PREFIX__SelectedEditor",
            "__DOM_PREFIX__SelectedName",
            "__DOM_PREFIX__SelectedX",
            "__DOM_PREFIX__SelectedY",
            "__DOM_PREFIX__SelectedWidth",
            "__DOM_PREFIX__SelectedHeight",
            "__DOM_PREFIX__HighlightCard",
            "__DOM_PREFIX__ApplyCardSize",
            "__DOM_PREFIX__ResetCardSize"
        ],
        "sourceClasses": [
            "__PREFIX__-selected-section",
            "__PREFIX__-selected-empty",
            "__PREFIX__-selected-empty-chips",
            "__PREFIX__-selected-hint-chip",
            "__PREFIX__-selected-editor",
            "__PREFIX__-selected-name",
            "__PREFIX__-selected-actions",
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
