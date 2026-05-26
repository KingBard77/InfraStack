const ScanHeaderSecurityModelCore = (function () {
    const toolId = 'scan-header-security';
    const toolVersion = '1.0.0';
    const allowedMethods = ['HEAD', 'GET'];
    const allowedUserAgentProfiles = ['default', 'desktop', 'mobile'];
    const allowedBaselines = ['balanced', 'strict', 'api'];
    const allowedCspModes = ['enforced', 'report-only', 'both'];
    const allowedCookieModes = ['include', 'separate', 'skip'];
    const exportFormats = ['pdf', 'csv', 'json'];

    /**
     * Returns the stable tool identifier used by review snapshots and package validation.
     *
     * @returns {string} Stable InfraStack tool identifier.
     */
    function getToolId() {
        return toolId;
    }

    /**
     * Returns the current model contract version.
     *
     * @returns {string} Semantic version for the header review model contract.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes a request method intent to a supported value.
     *
     * @param {unknown} value Request method candidate.
     * @returns {string} Supported method value.
     */
    function normalizeMethod(value) {
        const method = String(value || 'HEAD').toUpperCase();

        return allowedMethods.includes(method) ? method : 'HEAD';
    }

    /**
     * Normalizes review timeout seconds.
     *
     * @param {unknown} value Timeout candidate.
     * @returns {number} Integer timeout between 1 and 30 seconds.
     */
    function normalizeTimeoutSeconds(value) {
        const timeoutSeconds = Number(value);

        if (!Number.isFinite(timeoutSeconds) || timeoutSeconds < 1) {
            return 12;
        }

        return Math.min(30, Math.round(timeoutSeconds));
    }

    /**
     * Normalizes the client profile recorded by the review model.
     *
     * @param {unknown} value User-agent profile candidate.
     * @returns {string} Supported user-agent profile.
     */
    function normalizeUserAgentProfile(value) {
        const profile = String(value || 'default').toLowerCase();

        return allowedUserAgentProfiles.includes(profile) ? profile : 'default';
    }

    /**
     * Normalizes a value against an allowed set.
     *
     * @param {unknown} value Value candidate.
     * @param {string[]} allowedValues Allowed values.
     * @param {string} fallback Fallback value.
     * @returns {string} Normalized value.
     */
    function normalizeChoice(value, allowedValues, fallback) {
        const normalized = String(value || fallback).toLowerCase();

        return allowedValues.includes(normalized) ? normalized : fallback;
    }

    /**
     * Normalizes a positive integer with a fallback.
     *
     * @param {unknown} value Number candidate.
     * @param {number} fallback Fallback integer.
     * @returns {number} Normalized integer.
     */
    function normalizePositiveInteger(value, fallback) {
        const nextValue = Number(value);

        if (!Number.isFinite(nextValue) || nextValue < 0) {
            return fallback;
        }

        return Math.round(nextValue);
    }

    /**
     * Normalizes an array of text lines.
     *
     * @param {unknown} value Value candidate.
     * @returns {string[]} Non-empty text lines.
     */
    function normalizeLines(value) {
        const lines = Array.isArray(value) ? value : String(value || '').split(/\n+/);

        return lines.map((line) => String(line).trim()).filter(Boolean);
    }

    /**
     * Builds a normalized header review query from raw input values.
     *
     * @param {Record<string, unknown>} input Raw query input.
     * @returns {Record<string, unknown>} Normalized header review query.
     */
    function normalizeQuery(input) {
        const source = input && typeof input === 'object' ? input : {};

        return {
            url: String(source.url || '').trim(),
            baseline: normalizeChoice(source.baseline, allowedBaselines, 'balanced'),
            targetContext: String(source.targetContext || 'Web application').trim() || 'Web application',
            method: normalizeMethod(source.method),
            followRedirects: source.followRedirects !== false,
            timeoutSeconds: normalizeTimeoutSeconds(source.timeoutSeconds),
            validateTls: source.validateTls !== false,
            fallbackGetOn405: source.fallbackGetOn405 !== false,
            userAgentProfile: normalizeUserAgentProfile(source.userAgentProfile),
            cspMode: normalizeChoice(source.cspMode, allowedCspModes, 'enforced'),
            hstsMaxAge: normalizePositiveInteger(source.hstsMaxAge, 31536000),
            cookieMode: normalizeChoice(source.cookieMode, allowedCookieModes, 'include'),
            emphasizedHeaders: normalizeLines(source.emphasizedHeaders),
            policyNotes: normalizeLines(source.policyNotes),
            checkWellKnownFiles: source.checkWellKnownFiles !== false,
            probeHttpUpgrade: source.probeHttpUpgrade !== false
        };
    }

    /**
     * Counts finding statuses for review summaries or validation checks.
     *
     * @param {Array<Record<string, unknown>>} findings Header review findings.
     * @returns {{fail: number, warn: number, pass: number, info: number}} Status counts.
     */
    function countFindingStatuses(findings) {
        return (Array.isArray(findings) ? findings : []).reduce(
            function (counts, finding) {
                const status = String((finding && finding.status) || 'info');

                if (Object.prototype.hasOwnProperty.call(counts, status)) {
                    counts[status] += 1;
                } else {
                    counts.info += 1;
                }

                return counts;
            },
            {
                fail: 0,
                warn: 0,
                pass: 0,
                info: 0
            }
        );
    }

    /**
     * Returns the export formats implemented by the header review workspace.
     *
     * @returns {string[]} Implemented export format identifiers.
     */
    function getExportFormats() {
        return exportFormats.slice();
    }

    return {
        getToolId,
        getToolVersion,
        normalizeMethod,
        normalizeTimeoutSeconds,
        normalizeUserAgentProfile,
        normalizeChoice,
        normalizePositiveInteger,
        normalizeLines,
        normalizeQuery,
        countFindingStatuses,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScanHeaderSecurityModelCore;
}
