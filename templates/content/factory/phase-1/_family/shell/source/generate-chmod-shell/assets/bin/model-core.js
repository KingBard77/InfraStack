const __PASCAL_PREFIX__ModelCore = (function () {
    const toolId = '__TOOL_SLUG__';
    const toolVersion = '1.0.0';
    const targetTypes = ['file', 'directory'];
    const exportFormats = ['command', 'pdf', 'csv', 'json'];
    const permissionScopes = ['user', 'group', 'others'];

    function normalizeBoolean(value) {
        return value === true || value === 'true' || value === '1' || value === 1;
    }

    function normalizeText(value, fallback) {
        const text = String(value || '').trim();

        return text || fallback;
    }

    function normalizeModeCandidate(value, fallback) {
        const candidate = String(value || '').trim().replace(/^0o/i, '');
        const fallbackValue = String(fallback || '0755').trim();

        if (/^[0-7]{3}$/.test(candidate)) {
            return `0${candidate}`;
        }

        if (/^[0-7]{4}$/.test(candidate)) {
            return candidate;
        }

        return /^[0-7]{4}$/.test(fallbackValue) ? fallbackValue : '0755';
    }

    function digitToPermissions(digit) {
        const numeric = Number.parseInt(digit, 10);

        return {
            read: Boolean(numeric & 4),
            write: Boolean(numeric & 2),
            execute: Boolean(numeric & 1),
            octal: numeric
        };
    }

    /**
     * Returns the stable tool identifier used by package validation and exported payloads.
     *
     * @returns {string} Stable InfraStack tool identifier.
     */
    function getToolId() {
        return toolId;
    }

    /**
     * Returns the current model contract version for the chmod generator.
     *
     * @returns {string} Semantic model contract version.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes a candidate target type to a supported chmod target profile.
     *
     * @param {unknown} value Target type candidate.
     * @returns {string} Supported target type.
     */
    function normalizeTargetType(value) {
        const targetType = String(value || 'file').toLowerCase();

        return targetTypes.includes(targetType) ? targetType : 'file';
    }

    /**
     * Normalizes a chmod octal mode to a four-digit string.
     *
     * @param {unknown} value Octal mode candidate.
     * @param {string} [fallback='0755'] Fallback mode when the candidate is invalid.
     * @returns {string} Four-digit chmod mode.
     */
    function normalizeOctalMode(value, fallback = '0755') {
        return normalizeModeCandidate(value, fallback);
    }

    /**
     * Expands a normalized mode into scope permission booleans and special bits.
     *
     * @param {unknown} value Octal mode candidate.
     * @returns {Record<string, unknown>} Expanded permission state.
     */
    function expandMode(value) {
        const mode = normalizeOctalMode(value);
        const specialDigit = Number.parseInt(mode.charAt(0), 10);

        return {
            mode,
            special: {
                setuid: Boolean(specialDigit & 4),
                setgid: Boolean(specialDigit & 2),
                sticky: Boolean(specialDigit & 1)
            },
            permissions: permissionScopes.reduce(function (result, scope, index) {
                result[scope] = digitToPermissions(mode.charAt(index + 1));

                return result;
            }, {})
        };
    }

    /**
     * Builds a normalized chmod command state snapshot from raw form-like input.
     *
     * @param {Record<string, unknown>} input Raw command input.
     * @returns {Record<string, unknown>} Normalized chmod command state.
     */
    function normalizeCommandState(input) {
        const source = input && typeof input === 'object' ? input : {};
        const mode = normalizeOctalMode(source.mode || source.numericMode);
        const expanded = expandMode(mode);

        return {
            target: normalizeText(source.target, './deploy.sh'),
            targetType: normalizeTargetType(source.targetType),
            mode,
            recursive: normalizeBoolean(source.recursive),
            verbose: normalizeBoolean(source.verbose),
            special: expanded.special,
            permissions: expanded.permissions
        };
    }

    /**
     * Returns the export formats implemented by the chmod command workspace.
     *
     * @returns {string[]} Implemented export format identifiers.
     */
    function getExportFormats() {
        return exportFormats.slice();
    }

    return {
        getToolId,
        getToolVersion,
        normalizeTargetType,
        normalizeOctalMode,
        expandMode,
        normalizeCommandState,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = __PASCAL_PREFIX__ModelCore;
}
