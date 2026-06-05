const GenerateUfwCommandModelCore = (function () {
    const toolId = 'generate-ufw-command';
    const toolVersion = '1.0.0';
    const profiles = ['ssh-admin', 'web-service', 'deny-source', 'route-service', 'app-profile'];
    const shellStyles = ['posix', 'bash', 'review-note'];
    const actions = ['allow', 'deny', 'reject', 'limit'];
    const protocols = ['tcp', 'udp', 'any'];
    const exportFormats = ['command', 'pdf', 'csv', 'json'];

    function normalizeBoolean(value) {
        return value === true || value === 'true' || value === '1' || value === 1;
    }

    function normalizeText(value, fallback) {
        const text = String(value || '').trim();

        return text || fallback;
    }

    function normalizeChoice(value, allowed, fallback) {
        const text = String(value || '').trim();

        return allowed.includes(text) ? text : fallback;
    }

    function normalizePort(value, fallback) {
        const text = String(value || '').trim();
        const port = Number.parseInt(text, 10);

        if (!text) {
            return fallback;
        }

        return Number.isInteger(port) && String(port) === text && port >= 1 && port <= 65535 ? text : fallback;
    }

    /**
     * Returns the stable InfraStack tool identifier.
     *
     * @returns {string} Stable tool identifier.
     */
    function getToolId() {
        return toolId;
    }

    /**
     * Returns the current UFW command model version.
     *
     * @returns {string} Semantic model contract version.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes a UFW command profile to a supported profile key.
     *
     * @param {unknown} value Profile candidate.
     * @returns {string} Supported profile key.
     */
    function normalizeProfile(value) {
        return normalizeChoice(value, profiles, 'ssh-admin');
    }

    /**
     * Normalizes the generated shell output style.
     *
     * @param {unknown} value Shell style candidate.
     * @returns {string} Supported shell style key.
     */
    function normalizeShellStyle(value) {
        return normalizeChoice(value, shellStyles, 'posix');
    }

    /**
     * Normalizes a UFW rule action.
     *
     * @param {unknown} value Action candidate.
     * @returns {string} Supported UFW action.
     */
    function normalizeAction(value) {
        return normalizeChoice(value, actions, 'allow');
    }

    /**
     * Builds a normalized UFW command state snapshot from raw form-like input.
     *
     * @param {Record<string, unknown>} input Raw UFW command input.
     * @returns {Record<string, unknown>} Normalized UFW command state.
     */
    function normalizeCommandState(input) {
        const source = input && typeof input === 'object' ? input : {};

        return {
            target: normalizeText(source.target, '22/tcp'),
            profile: normalizeProfile(source.profile),
            shellStyle: normalizeShellStyle(source.shellStyle),
            sourceAddress: normalizeText(source.sourceAddress || source.source, '192.0.2.10'),
            destinationAddress: normalizeText(source.destinationAddress || source.destination, 'any'),
            useSudo: normalizeBoolean(source.useSudo),
            action: normalizeAction(source.action),
            protocol: normalizeChoice(source.protocol, protocols, 'tcp'),
            direction: String(source.direction || '') === 'out' ? 'out' : 'in',
            port: normalizePort(source.port, '22'),
            sourcePort: normalizePort(source.sourcePort, ''),
            interfaceName: String(source.interfaceName || '').trim(),
            routeOutInterface: String(source.routeOutInterface || '').trim(),
            logPackets: normalizeBoolean(source.logPackets),
            dryRun: normalizeBoolean(source.dryRun),
            routeRule: normalizeBoolean(source.routeRule),
            insertRule: normalizeBoolean(source.insertRule),
            insertPosition: String(source.insertPosition || '').trim(),
            attachComment: normalizeBoolean(source.attachComment),
            comment: String(source.comment || '').trim(),
            appMode: normalizeBoolean(source.appMode),
            appProfile: normalizeText(source.appProfile, 'OpenSSH'),
            appendExtraOptions: normalizeBoolean(source.appendExtraOptions),
            extraArgs: String(source.extraArgs || '').trim()
        };
    }

    /**
     * Returns the export formats implemented by the UFW command workspace.
     *
     * @returns {string[]} Implemented export format identifiers.
     */
    function getExportFormats() {
        return exportFormats.slice();
    }

    return {
        getToolId,
        getToolVersion,
        normalizeProfile,
        normalizeShellStyle,
        normalizeAction,
        normalizeCommandState,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenerateUfwCommandModelCore;
}
