// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackShellWorkspaceSections || {};
    const source = {
            "section": "02_basic-setting",
            "title": "basic setting",
            "sourceTool": "templates/content/tools/shell/generate-netcat-shell/",
            "sourceFile": "custom.js",
            "sourceJsLines": [
                    [
                            12,
                            21
                    ],
                    [
                            187,
                            574
                    ],
                    [
                            714,
                            821
                    ],
                    [
                            2401,
                            2409
                    ]
            ],
            "sourceDomIds": [
                    "__DOM_PREFIX__Preset",
                    "__DOM_PREFIX__ApplyPreset",
                    "__DOM_PREFIX__Shell",
                    "__DOM_PREFIX__Implementation",
                    "__DOM_PREFIX__FlagStyle",
                    "__DOM_PREFIX__CapabilityHint",
                    "__DOM_PREFIX__CustomBinary",
                    "__DOM_PREFIX__CombineShortFlags",
                    "__DOM_PREFIX__Multiline",
                    "__DOM_PREFIX__ShellHint",
                    "__DOM_PREFIX__ConnectionType",
                    "__DOM_PREFIX__UseUdp",
                    "__DOM_PREFIX__ForceIpv6",
                    "__DOM_PREFIX__TargetPort",
                    "__DOM_PREFIX__ListenPort",
                    "__DOM_PREFIX__StartPort",
                    "__DOM_PREFIX__EndPort",
                    "__DOM_PREFIX__TargetPortWrap",
                    "__DOM_PREFIX__ListenPortWrap",
                    "__DOM_PREFIX__StartPortWrap",
                    "__DOM_PREFIX__EndPortWrap",
                    "__DOM_PREFIX__ModeHint",
                    "__DOM_PREFIX__KeepListening",
                    "__DOM_PREFIX__Verbose",
                    "__DOM_PREFIX__ZeroIo",
                    "__DOM_PREFIX__NumericOnly"
            ],
            "sourceClasses": [
                    "__PREFIX__-basic-panel",
                    "__PREFIX__-inner-panel",
                    "__PREFIX__-setting-row",
                    "__PREFIX__-setting-label",
                    "__PREFIX__-setting-field",
                    "__PREFIX__-inline-grid",
                    "__PREFIX__-toggle-group",
                    "__PREFIX__-toggle-card",
                    "__PREFIX__-capability-hint",
                    "__PREFIX__-enhanced-select"
            ],
            "sourceVariables": [
                    "presetInput",
                    "applyPresetButton",
                    "shellInput",
                    "implementationInput",
                    "flagStyleInput",
                    "capabilityHint",
                    "customBinaryInput",
                    "combineShortFlagsInput",
                    "multilineInput",
                    "shellHint",
                    "connectionTypeInput",
                    "targetPortInput",
                    "listenPortInput",
                    "startPortInput",
                    "endPortInput",
                    "modeHint"
            ],
            "sourceFunctions": [
                    "normalizeImplementation",
                    "normalizeShell",
                    "getImplementation",
                    "getCapabilityHintText",
                    "updateShellHint",
                    "markPresetCustom",
                    "applyPreset",
                    "updateDynamicState"
            ],
            "sourceBehaviours": [
                    "defines shell, implementation, connection type, proxy type, and preset catalog data",
                    "applies baseline presets without locking user edits",
                    "keeps shell and implementation helper text in sync",
                    "marks preset state as custom when basic controls change"
            ]
    };

    /**
     * Returns the extracted shell basic setting JavaScript ownership map.
     *
     * @returns {{section: string, title: string, sourceTool: string, sourceFile: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceFunctions: string[], sourceBehaviours: string[]}} Section source metadata.
     */
    function basicSettingSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.basicSettingSourceSection = basicSettingSourceSection;
    registry.basicSetting = basicSettingSourceSection;
    global.InfraStackShellWorkspaceSections = registry;
}(window));
