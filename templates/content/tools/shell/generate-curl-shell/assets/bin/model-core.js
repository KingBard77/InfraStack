const GenerateCurlShellModelCore = (function () {
    const toolId = 'generate-curl-shell';
    const toolVersion = '1.0.0';
    const shellTargets = ['bash', 'powershell', 'cmd'];
    const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
    const bodyModes = ['none', 'json', 'form', 'raw', 'binary'];
    const authModes = ['none', 'basic', 'bearer', 'api-key'];
    const exportFormats = ['command', 'pdf', 'csv', 'json'];

    function normalizeText(value, fallback) {
        const text = String(value || '').trim();

        return text || fallback;
    }

    function normalizeBoolean(value) {
        return value === true || value === 'true' || value === '1' || value === 1;
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
     * Returns the current model contract version for the cURL generator.
     *
     * @returns {string} Semantic model contract version.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes a candidate shell target to a supported renderer.
     *
     * @param {unknown} value Shell target candidate.
     * @returns {string} Supported shell target.
     */
    function normalizeShellTarget(value) {
        const target = String(value || 'bash').toLowerCase();

        return shellTargets.includes(target) ? target : 'bash';
    }

    /**
     * Normalizes a candidate HTTP method to a supported curl request method.
     *
     * @param {unknown} value HTTP method candidate.
     * @returns {string} Supported uppercase HTTP method.
     */
    function normalizeHttpMethod(value) {
        const method = String(value || 'GET').toUpperCase();

        return httpMethods.includes(method) ? method : 'GET';
    }

    /**
     * Normalizes a candidate request body mode to a supported curl payload renderer.
     *
     * @param {unknown} value Body mode candidate.
     * @returns {string} Supported body mode.
     */
    function normalizeBodyMode(value) {
        const mode = String(value || 'none').toLowerCase();

        return bodyModes.includes(mode) ? mode : 'none';
    }

    /**
     * Normalizes a candidate authentication mode to a supported helper type.
     *
     * @param {unknown} value Authentication mode candidate.
     * @returns {string} Supported authentication mode.
     */
    function normalizeAuthMode(value) {
        const mode = String(value || 'none').toLowerCase();

        return authModes.includes(mode) ? mode : 'none';
    }

    /**
     * Normalizes a request URL and preserves only HTTP or HTTPS targets.
     *
     * @param {unknown} value URL candidate.
     * @returns {string} Normalized request URL.
     */
    function normalizeUrl(value) {
        const url = normalizeText(value, 'https://api.example.com/v1/resource');

        return /^https?:\/\//i.test(url) ? url : 'https://api.example.com/v1/resource';
    }

    /**
     * Normalizes a header list into explicit name/value pairs.
     *
     * @param {unknown} value Header list candidate.
     * @returns {{name: string, value: string}[]} Normalized header entries.
     */
    function normalizeHeaders(value) {
        if (!Array.isArray(value)) {
            return [];
        }

        return value
            .map(function (entry) {
                if (typeof entry === 'string') {
                    const separatorIndex = entry.indexOf(':');

                    if (separatorIndex === -1) {
                        return null;
                    }

                    return {
                        name: entry.slice(0, separatorIndex).trim(),
                        value: entry.slice(separatorIndex + 1).trim()
                    };
                }

                if (entry && typeof entry === 'object') {
                    return {
                        name: normalizeText(entry.name, ''),
                        value: normalizeText(entry.value, '')
                    };
                }

                return null;
            })
            .filter(function (entry) {
                return entry && entry.name && entry.value;
            });
    }

    /**
     * Builds a normalized cURL command state snapshot from raw form-like input.
     *
     * @param {Record<string, unknown>} input Raw request input.
     * @returns {Record<string, unknown>} Normalized cURL command state.
     */
    function normalizeCommandState(input) {
        const source = input && typeof input === 'object' ? input : {};

        return {
            url: normalizeUrl(source.url),
            method: normalizeHttpMethod(source.method),
            shell: normalizeShellTarget(source.shell),
            multiline: source.multiline !== false,
            queryString: normalizeText(source.queryString, ''),
            headers: normalizeHeaders(source.headers),
            authMode: normalizeAuthMode(source.authMode),
            bodyMode: normalizeBodyMode(source.bodyMode),
            body: normalizeText(source.body, ''),
            outputFile: normalizeText(source.outputFile, ''),
            options: {
                followRedirects: normalizeBoolean(source.followRedirects),
                insecureTls: normalizeBoolean(source.insecureTls),
                compressed: normalizeBoolean(source.compressed),
                failWithBody: normalizeBoolean(source.failWithBody),
                includeHeaders: normalizeBoolean(source.includeHeaders),
                verbose: normalizeBoolean(source.verbose)
            }
        };
    }

    /**
     * Returns the export formats implemented by the cURL command workspace.
     *
     * @returns {string[]} Implemented export format identifiers.
     */
    function getExportFormats() {
        return exportFormats.slice();
    }

    return {
        getToolId,
        getToolVersion,
        normalizeShellTarget,
        normalizeHttpMethod,
        normalizeBodyMode,
        normalizeAuthMode,
        normalizeUrl,
        normalizeHeaders,
        normalizeCommandState,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenerateCurlShellModelCore;
}
