const GenerateSshShellModelCore = (function () {
    const toolId = 'generate-ssh-shell';
    const toolVersion = '1.0.0';
    const profiles = ['interactive', 'bastion', 'port-forward', 'batch'];
    const shellStyles = ['posix', 'bash', 'powershell'];
    const strictHostKeyModes = ['accept-new', 'yes', 'no'];
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

    function normalizePort(value) {
        const port = Number.parseInt(value, 10);

        return Number.isInteger(port) && port >= 1 && port <= 65535 ? String(port) : '22';
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
     * Returns the current SSH command model version.
     *
     * @returns {string} Semantic model contract version.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes an SSH target profile to a supported profile key.
     *
     * @param {unknown} value Profile candidate.
     * @returns {string} Supported profile key.
     */
    function normalizeProfile(value) {
        return normalizeChoice(value, profiles, 'interactive');
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
     * Normalizes StrictHostKeyChecking posture.
     *
     * @param {unknown} value StrictHostKeyChecking candidate.
     * @returns {string} Supported OpenSSH host-key posture.
     */
    function normalizeStrictHostKey(value) {
        return normalizeChoice(value, strictHostKeyModes, 'accept-new');
    }

    /**
     * Builds a normalized SSH command state snapshot from raw form-like input.
     *
     * @param {Record<string, unknown>} input Raw SSH command input.
     * @returns {Record<string, unknown>} Normalized SSH command state.
     */
    function normalizeCommandState(input) {
        const source = input && typeof input === 'object' ? input : {};

        return {
            target: normalizeText(source.target, 'deploy@app01.example.com'),
            profile: normalizeProfile(source.profile),
            shellStyle: normalizeShellStyle(source.shellStyle),
            loginUser: normalizeText(source.loginUser, 'deploy'),
            proxyEnabled: normalizeBoolean(source.proxyEnabled),
            proxyJump: normalizeText(source.proxyJump, 'bastion.example.com'),
            port: normalizePort(source.port),
            identityFile: String(source.identityFile || '').trim(),
            compression: normalizeBoolean(source.compression),
            strictHostKey: normalizeStrictHostKey(source.strictHostKey),
            sessionMode: String(source.sessionMode || '') === 'batch' ? 'batch' : 'interactive',
            agentForward: normalizeBoolean(source.agentForward),
            tty: normalizeBoolean(source.tty),
            extraArgs: String(source.extraArgs || '').trim()
        };
    }

    /**
     * Returns the export formats implemented by the SSH command workspace.
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
        normalizeStrictHostKey,
        normalizeCommandState,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenerateSshShellModelCore;
}
