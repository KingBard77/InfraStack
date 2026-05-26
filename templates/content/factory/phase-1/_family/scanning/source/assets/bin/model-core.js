const ScanWebSecurityModelCore = (function () {
    const toolId = 'scan-web-security';
    const toolVersion = '1.0.0';
    const allowedMethods = ['HEAD', 'GET'];
    const allowedUserAgentProfiles = ['default', 'desktop', 'mobile'];
    const exportFormats = ['pdf', 'csv', 'json'];

    /**
     * Returns the stable tool identifier used by scan snapshots and package validation.
     *
     * @returns {string} Stable InfraStack tool identifier.
     */
    function getToolId() {
        return toolId;
    }

    /**
     * Returns the current model contract version.
     *
     * @returns {string} Semantic version for the scanner model contract.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes a request method to a scanner-supported method.
     *
     * @param {unknown} value Request method candidate.
     * @returns {string} Supported method value.
     */
    function normalizeMethod(value) {
        const method = String(value || 'HEAD').toUpperCase();

        return allowedMethods.includes(method) ? method : 'HEAD';
    }

    /**
     * Normalizes scanner timeout seconds.
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
     * Normalizes the user-agent profile used by the scanner.
     *
     * @param {unknown} value User-agent profile candidate.
     * @returns {string} Supported user-agent profile.
     */
    function normalizeUserAgentProfile(value) {
        const profile = String(value || 'default').toLowerCase();

        return allowedUserAgentProfiles.includes(profile) ? profile : 'default';
    }

    /**
     * Builds a normalized scan query from raw input values.
     *
     * @param {Record<string, unknown>} input Raw query input.
     * @returns {Record<string, unknown>} Normalized scanner query.
     */
    function normalizeQuery(input) {
        const source = input && typeof input === 'object' ? input : {};

        return {
            url: String(source.url || '').trim(),
            method: normalizeMethod(source.method),
            followRedirects: source.followRedirects !== false,
            timeoutSeconds: normalizeTimeoutSeconds(source.timeoutSeconds),
            validateTls: source.validateTls !== false,
            fallbackGetOn405: source.fallbackGetOn405 !== false,
            userAgentProfile: normalizeUserAgentProfile(source.userAgentProfile),
            checkWellKnownFiles: source.checkWellKnownFiles !== false,
            probeHttpUpgrade: source.probeHttpUpgrade !== false
        };
    }

    /**
     * Counts finding statuses for scan summaries or validation checks.
     *
     * @param {Array<Record<string, unknown>>} findings Scanner findings.
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
     * Returns the export formats implemented by the scanner workspace.
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
        normalizeQuery,
        countFindingStatuses,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScanWebSecurityModelCore;
}
