// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackScanningWorkspaceSections || {};

    /**
     * Returns metadata for an optional empty workspace section slot.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Section metadata.
     */
    function advancedSettingsSourceSection() {
        return {
            sourceTool: '',
            sourceJsLines: [],
            sourceDomIds: [],
            sourceClasses: [],
            sourceVariables: [],
            sourceBlocks: function sourceBlocks() {
                return null;
            }
        };
    }

    registry.advancedSettingsSourceSection = advancedSettingsSourceSection;
    global.InfraStackScanningWorkspaceSections = registry;
}(window));
