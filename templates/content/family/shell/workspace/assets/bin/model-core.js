const GenerateNetcatShellModelCore = (function () {
    const toolId = 'generate-netcat-shell';
    const toolVersion = '1.0.0';
    const implementations = ['openbsd', 'traditional', 'busybox', 'ncat'];
    const connectionTypes = ['client', 'listen', 'scan'];
    const shellTargets = ['bash', 'powershell', 'cmd'];
    const exportFormats = ['command', 'pdf', 'csv', 'json'];

    /**
     * Returns the stable tool identifier used by package validation and exported payloads.
     *
     * @returns {string} Stable InfraStack tool identifier.
     */
    function getToolId() {
        return toolId;
    }

    /**
     * Returns the current model contract version for the netcat generator.
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
     * Normalizes a candidate netcat implementation to a supported flavor.
     *
     * @param {unknown} value Implementation candidate.
     * @returns {string} Supported implementation key.
     */
    function normalizeImplementation(value) {
        const implementation = String(value || 'openbsd').toLowerCase();

        return implementations.includes(implementation) ? implementation : 'openbsd';
    }

    /**
     * Normalizes a candidate connection type to a supported socket role.
     *
     * @param {unknown} value Connection type candidate.
     * @returns {string} Supported connection type.
     */
    function normalizeConnectionType(value) {
        const connectionType = String(value || 'client').toLowerCase();

        return connectionTypes.includes(connectionType) ? connectionType : 'client';
    }

    /**
     * Normalizes a TCP or UDP port number.
     *
     * @param {unknown} value Port candidate.
     * @param {number} fallback Port returned when the candidate is invalid.
     * @returns {number} Integer port between 1 and 65535.
     */
    function normalizePort(value, fallback) {
        const numericFallback = Number.isInteger(fallback) ? fallback : 443;
        const port = Number(value);

        if (!Number.isInteger(port) || port < 1 || port > 65535) {
            return numericFallback;
        }

        return port;
    }

    /**
     * Normalizes a scan port range and keeps the lower port first.
     *
     * @param {unknown} startValue Start port candidate.
     * @param {unknown} endValue End port candidate.
     * @returns {{startPort: number, endPort: number}} Normalized scan range.
     */
    function normalizePortRange(startValue, endValue) {
        const startPort = normalizePort(startValue, 20);
        const endPort = normalizePort(endValue, 1024);

        if (startPort <= endPort) {
            return {
                startPort,
                endPort
            };
        }

        return {
            startPort: endPort,
            endPort: startPort
        };
    }

    /**
     * Builds a normalized command state snapshot from raw form-like input.
     *
     * @param {Record<string, unknown>} input Raw command input.
     * @returns {Record<string, unknown>} Normalized command state.
     */
    function normalizeCommandState(input) {
        const source = input && typeof input === 'object' ? input : {};
        const connectionType = normalizeConnectionType(source.connectionType);
        const portRange = normalizePortRange(source.startPort, source.endPort);

        return {
            primaryHost: String(source.primaryHost || 'example.com').trim() || 'example.com',
            shell: normalizeShellTarget(source.shell),
            implementation: normalizeImplementation(source.implementation),
            connectionType,
            useUdp: source.useUdp === true,
            forceIpv6: source.forceIpv6 === true,
            targetPort: normalizePort(source.targetPort, 443),
            listenPort: normalizePort(source.listenPort, 9000),
            startPort: portRange.startPort,
            endPort: portRange.endPort,
            zeroIo: source.zeroIo === true || connectionType === 'scan',
            useTls: source.useTls === true,
            proxyType: String(source.proxyType || 'none').toLowerCase(),
            extraFlags: String(source.extraFlags || '').trim()
        };
    }

    /**
     * Returns the export formats implemented by the netcat command workspace.
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
        normalizeImplementation,
        normalizeConnectionType,
        normalizePort,
        normalizePortRange,
        normalizeCommandState,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenerateNetcatShellModelCore;
}
