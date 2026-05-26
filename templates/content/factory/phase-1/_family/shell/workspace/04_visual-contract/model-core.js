// model-core.js
(function attachShellVisualContractCore(global) {
    const VALID_TONES = new Set(['success', 'warning', 'danger']);

    /**
     * Normalizes a command token.
     *
     * @param {*} token Raw token.
     * @param {number} index Token index.
     * @returns {{id: string, value: string}} Normalized token.
     */
    function normalizeToken(token, index) {
        if (token && typeof token === 'object') {
            return {
                id: String(token.id || `token-${index + 1}`),
                value: String(token.value ?? '')
            };
        }

        return {
            id: `token-${index + 1}`,
            value: String(token ?? '')
        };
    }

    /**
     * Normalizes a command option.
     *
     * @param {{id?: string, label?: string, value?: *, copy?: string, enabled?: boolean}} option Raw option.
     * @param {number} index Option index.
     * @returns {{id: string, label: string, value: string, copy: string, enabled: boolean}} Normalized option.
     */
    function normalizeOption(option, index) {
        const source = option && typeof option === 'object' ? option : {};

        return {
            id: String(source.id || `option-${index + 1}`),
            label: String(source.label || `Option ${index + 1}`),
            value: String(source.value ?? ''),
            copy: String(source.copy || ''),
            enabled: source.enabled !== false
        };
    }

    /**
     * Normalizes a command warning.
     *
     * @param {{id?: string, label?: string, message?: string, blocking?: boolean, tone?: string}} warning Raw warning.
     * @param {number} index Warning index.
     * @returns {{id: string, label: string, message: string, blocking: boolean, tone: string}} Normalized warning.
     */
    function normalizeWarning(warning, index) {
        const source = warning && typeof warning === 'object' ? warning : {};
        const tone = VALID_TONES.has(source.tone) ? source.tone : source.blocking ? 'danger' : 'warning';

        return {
            id: String(source.id || `warning-${index + 1}`),
            label: String(source.label || `Warning ${index + 1}`),
            message: String(source.message || ''),
            blocking: Boolean(source.blocking),
            tone
        };
    }

    /**
     * Normalizes shell visual contract state.
     *
     * @param {{command?: string, shell?: string, tone?: string, tokens?: Array, options?: Array, warnings?: Array, operations?: Array}} contract Raw contract.
     * @returns {{command: string, shell: string, tone: string, tokens: Array, options: Array, warnings: Array, operations: Array}} Normalized contract.
     */
    function normalizeVisualContract(contract) {
        const source = contract && typeof contract === 'object' ? contract : {};
        const warnings = Array.isArray(source.warnings) ? source.warnings.map(normalizeWarning) : [];
        const tone = VALID_TONES.has(source.tone)
            ? source.tone
            : warnings.some((warning) => warning.blocking)
                ? 'danger'
                : warnings.length
                    ? 'warning'
                    : 'success';

        return {
            command: String(source.command || ''),
            shell: String(source.shell || 'POSIX shell'),
            tone,
            tokens: Array.isArray(source.tokens) ? source.tokens.map(normalizeToken) : [],
            options: Array.isArray(source.options) ? source.options.map(normalizeOption) : [],
            warnings,
            operations: Array.isArray(source.operations) ? source.operations.map(normalizeOption) : []
        };
    }

    /**
     * Summarizes normalized shell visual contract state.
     *
     * @param {{tokens?: Array, options?: Array, warnings?: Array, operations?: Array}} contract Normalized contract.
     * @returns {{tokenCount: number, optionCount: number, warningCount: number, blockingCount: number, operationCount: number}} Summary.
     */
    function summarizeVisualContract(contract) {
        const source = normalizeVisualContract(contract);

        return {
            tokenCount: source.tokens.length,
            optionCount: source.options.filter((option) => option.enabled).length,
            warningCount: source.warnings.length,
            blockingCount: source.warnings.filter((warning) => warning.blocking).length,
            operationCount: source.operations.length
        };
    }

    const api = {
        normalizeOption,
        normalizeToken,
        normalizeVisualContract,
        normalizeWarning,
        summarizeVisualContract
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
        return;
    }

    global.InfraStackShellVisualContractCore = api;
}(typeof globalThis !== 'undefined' ? globalThis : window));
