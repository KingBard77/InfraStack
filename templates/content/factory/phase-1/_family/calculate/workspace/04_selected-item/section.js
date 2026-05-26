// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns metadata for an optional empty workspace section slot.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Section metadata.
     */
    function selectedItemSourceSection() {
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

    registry.selectedItemSourceSection = selectedItemSourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
