const InfraStackScaffoldModelCore = (function () {
    const toolId = 'scaffold-tool';
    const toolVersion = '0.1.0';

    /**
     * Returns the scaffold model identifier.
     *
     * @returns {string} Stable placeholder model identifier.
     */
    function getToolId() {
        return toolId;
    }

    /**
     * Returns the scaffold model version.
     *
     * @returns {string} Semantic model version.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes a shallow state object for scaffold-generated packages.
     *
     * @param {Record<string, unknown>} value Raw state candidate.
     * @returns {Record<string, unknown>} Normalized state object.
     */
    function normalizeState(value) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return {};
        }

        return { ...value };
    }

    /**
     * Creates a JSON-safe export payload for scaffold-generated packages.
     *
     * @param {Record<string, unknown>} value Raw state candidate.
     * @returns {{tool: string, version: string, state: Record<string, unknown>}} Export payload.
     */
    function exportState(value) {
        return {
            tool: toolId,
            version: toolVersion,
            state: normalizeState(value)
        };
    }

    /**
     * Builds normalized state from an imported scaffold JSON payload.
     *
     * @param {Record<string, unknown>} payload Imported JSON payload.
     * @returns {Record<string, unknown>} Normalized restorable state.
     */
    function buildImportedPayloadState(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            return {};
        }

        if (payload.state && typeof payload.state === 'object' && !Array.isArray(payload.state)) {
            return normalizeState(payload.state);
        }

        return normalizeState(payload);
    }

    return {
        buildImportedPayloadState,
        exportState,
        getToolId,
        getToolVersion,
        normalizeState
    };
}());
