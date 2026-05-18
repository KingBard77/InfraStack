// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackShellWorkspaceSections || {};
    const source = {
            "section": "03_advanced-setting",
            "title": "advanced setting",
            "sourceTool": "templates/content/tools/shell/generate-netcat-shell/",
            "sourceFile": "custom.js",
            "sourceJsLines": [
                    [
                            24,
                            67
                    ],
                    [
                            824,
                            1841
                    ]
            ],
            "sourceDomIds": [
                    "__DOM_PREFIX__Timeout",
                    "__DOM_PREFIX__QuitAfterEof",
                    "__DOM_PREFIX__SendDelay",
                    "__DOM_PREFIX__SourceAddress",
                    "__DOM_PREFIX__SourcePort",
                    "__DOM_PREFIX__ExecutionMode",
                    "__DOM_PREFIX__CommandToRun",
                    "__DOM_PREFIX__CommandToRunWrap",
                    "__DOM_PREFIX__UseTls",
                    "__DOM_PREFIX__VerifyCert",
                    "__DOM_PREFIX__VerifyCertWrap",
                    "__DOM_PREFIX__ClientCertPath",
                    "__DOM_PREFIX__ClientKeyPath",
                    "__DOM_PREFIX__TlsCredentialsWrap",
                    "__DOM_PREFIX__ProxyType",
                    "__DOM_PREFIX__ProxyHost",
                    "__DOM_PREFIX__ProxyPort",
                    "__DOM_PREFIX__ProxyAuth",
                    "__DOM_PREFIX__ProxyHostWrap",
                    "__DOM_PREFIX__ProxyPortWrap",
                    "__DOM_PREFIX__ProxyAuthWrap",
                    "__DOM_PREFIX__IdleTimeout",
                    "__DOM_PREFIX__MaxConnections",
                    "__DOM_PREFIX__LogOutput",
                    "__DOM_PREFIX__ReceiveOnly",
                    "__DOM_PREFIX__SendOnly",
                    "__DOM_PREFIX__ShutdownAfterEof",
                    "__DOM_PREFIX__ExtraFlags"
            ],
            "sourceClasses": [
                    "__PREFIX__-advanced-grid",
                    "__PREFIX__-advanced-panel",
                    "__PREFIX__-advanced-section",
                    "__PREFIX__-advanced-title",
                    "__PREFIX__-field-grid",
                    "__PREFIX__-enhanced-select",
                    "__PREFIX__-native-select"
            ],
            "sourceVariables": [
                    "timeoutInput",
                    "quitAfterEofInput",
                    "sendDelayInput",
                    "sourceAddressInput",
                    "sourcePortInput",
                    "executionModeInput",
                    "commandToRunInput",
                    "useTlsInput",
                    "verifyCertInput",
                    "proxyTypeInput",
                    "proxyHostInput",
                    "proxyPortInput",
                    "extraFlagsInput",
                    "enhancedSelects"
            ],
            "sourceFunctions": [
                    "closeEnhancedSelects",
                    "syncEnhancedSelect",
                    "syncAllEnhancedSelects",
                    "enhanceNativeSelect",
                    "parseCommandString",
                    "quoteValue",
                    "formatValue",
                    "buildCommandFromTokens",
                    "cleanPort",
                    "cleanNonNegativeInteger",
                    "cleanNonNegativeNumber",
                    "normalizeText",
                    "updateConnectionState",
                    "updateExecutionState",
                    "updateTlsState",
                    "updateProxyState",
                    "buildQuery",
                    "pushCombinedShortFlags",
                    "addShortFlag",
                    "addShortValue",
                    "addLongFlag",
                    "addLongValue",
                    "addNcatOption",
                    "buildCommand"
            ],
            "sourceBehaviours": [
                    "normalizes optional shell command inputs into a command query",
                    "shows and hides execution, TLS, proxy, and mode-specific advanced controls",
                    "parses custom binary and extra flag strings before token assembly",
                    "adds supported flags and records unsupported or risky options as warnings or blocking errors"
            ]
    };

    /**
     * Returns the extracted shell advanced setting JavaScript ownership map.
     *
     * @returns {{section: string, title: string, sourceTool: string, sourceFile: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceFunctions: string[], sourceBehaviours: string[]}} Section source metadata.
     */
    function advancedSettingSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.advancedSettingSourceSection = advancedSettingSourceSection;
    registry.advancedSetting = advancedSettingSourceSection;
    global.InfraStackShellWorkspaceSections = registry;
}(window));
