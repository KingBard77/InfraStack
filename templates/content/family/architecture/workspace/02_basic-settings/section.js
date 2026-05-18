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
            "__DOM_PREFIX__Preset",
            "__DOM_PREFIX__PresetDescription",
            "__DOM_PREFIX__Region",
            "__DOM_PREFIX__AzCount"
        ],
        "sourceClasses": [
            "__PREFIX__-basic-preset-section",
            "__PREFIX__-basic-grid",
            "__PREFIX__-control-stack",
            "__PREFIX__-native-select",
            "__PREFIX__-custom-select",
            "__PREFIX__-custom-select-trigger",
            "__PREFIX__-custom-select-menu"
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
