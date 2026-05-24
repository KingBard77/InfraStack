const GenerateSshShellModelCore = (function () {
    const toolId = 'generate-ssh-shell';
    const toolVersion = '1.0.0';
    const profiles = ['Direct SSH', 'Jump host', 'Verbose debug'];
    const shellTargets = ['Bash / Zsh', 'PowerShell', 'POSIX sh'];
    const addressFamilies = ['auto', 'ipv4', 'ipv6'];
    const logLevels = ['INFO', 'ERROR', 'QUIET', 'VERBOSE', 'DEBUG'];
    const preferredAuthMethods = ['default', 'publickey', 'publickey,password', 'password', 'keyboard-interactive'];
    const ttyModes = ['default', 'force', 'disable'];
    const identityPolicies = ['Optional', 'Required'];
    const controlMasterModes = ['no', 'auto', 'yes'];
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
     * Returns the current model contract version for the SSH generator.
     *
     * @returns {string} Semantic model contract version.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Normalizes a command profile to a supported SSH route mode.
     *
     * @param {unknown} value Command profile candidate.
     * @returns {string} Supported command profile label.
     */
    function normalizeProfile(value) {
        const profile = String(value || profiles[0]).trim();

        return profiles.includes(profile) ? profile : profiles[0];
    }

    /**
     * Normalizes a candidate shell target to a supported renderer.
     *
     * @param {unknown} value Shell target candidate.
     * @returns {string} Supported shell target label.
     */
    function normalizeShellTarget(value) {
        const target = String(value || shellTargets[0]).trim();

        return shellTargets.includes(target) ? target : shellTargets[0];
    }

    /**
     * Normalizes a TCP port number.
     *
     * @param {unknown} value Port candidate.
     * @param {number} fallback Port returned when the candidate is invalid.
     * @returns {number} Integer port between 1 and 65535.
     */
    function normalizePort(value, fallback) {
        const numericFallback = Number.isInteger(fallback) ? fallback : 22;
        const port = Number(value);

        if (!Number.isInteger(port) || port < 1 || port > 65535) {
            return numericFallback;
        }

        return port;
    }

    /**
     * Normalizes a positive integer setting.
     *
     * @param {unknown} value Number candidate.
     * @param {number} fallback Number returned when the candidate is invalid.
     * @returns {number} Positive integer value.
     */
    function normalizePositiveInteger(value, fallback) {
        const numericFallback = Number.isInteger(fallback) && fallback > 0 ? fallback : 1;
        const number = Number(value);

        if (!Number.isInteger(number) || number < 1) {
            return numericFallback;
        }

        return number;
    }

    /**
     * Normalizes a non-negative integer setting.
     *
     * @param {unknown} value Number candidate.
     * @param {number} fallback Number returned when the candidate is invalid.
     * @returns {number} Non-negative integer value.
     */
    function normalizeNonNegativeInteger(value, fallback) {
        const numericFallback = Number.isInteger(fallback) && fallback >= 0 ? fallback : 0;
        const number = Number(value);

        if (!Number.isInteger(number) || number < 0) {
            return numericFallback;
        }

        return number;
    }

    /**
     * Normalizes an address family selector to a supported OpenSSH family flag.
     *
     * @param {unknown} value Address family candidate.
     * @returns {string} Supported address family key.
     */
    function normalizeAddressFamily(value) {
        const family = String(value || addressFamilies[0]).toLowerCase();

        return addressFamilies.includes(family) ? family : addressFamilies[0];
    }

    /**
     * Normalizes a LogLevel selector to a supported OpenSSH value.
     *
     * @param {unknown} value LogLevel candidate.
     * @returns {string} Supported LogLevel value.
     */
    function normalizeLogLevel(value) {
        const level = String(value || logLevels[0]).toUpperCase();

        return logLevels.includes(level) ? level : logLevels[0];
    }

    /**
     * Normalizes a PreferredAuthentications selector to a supported value.
     *
     * @param {unknown} value PreferredAuthentications candidate.
     * @returns {string} Supported preferred authentication value.
     */
    function normalizePreferredAuth(value) {
        const auth = String(value || preferredAuthMethods[0]).toLowerCase();

        return preferredAuthMethods.includes(auth) ? auth : preferredAuthMethods[0];
    }

    /**
     * Normalizes a TTY selector to a supported request mode.
     *
     * @param {unknown} value TTY mode candidate.
     * @returns {string} Supported TTY mode key.
     */
    function normalizeTtyMode(value) {
        const mode = String(value || ttyModes[0]).toLowerCase();

        return ttyModes.includes(mode) ? mode : ttyModes[0];
    }

    /**
     * Normalizes an identity policy selector to a supported policy label.
     *
     * @param {unknown} value Identity policy candidate.
     * @returns {string} Supported identity policy label.
     */
    function normalizeIdentityPolicy(value) {
        const policy = String(value || identityPolicies[0]).trim();

        return identityPolicies.includes(policy) ? policy : identityPolicies[0];
    }

    /**
     * Normalizes a ControlMaster selector to a supported value.
     *
     * @param {unknown} value ControlMaster candidate.
     * @returns {string} Supported ControlMaster value.
     */
    function normalizeControlMaster(value) {
        const mode = String(value || controlMasterModes[0]).toLowerCase();

        return controlMasterModes.includes(mode) ? mode : controlMasterModes[0];
    }

    /**
     * Builds a normalized command state snapshot from raw form-like input.
     *
     * @param {Record<string, unknown>} input Raw command input.
     * @returns {Record<string, unknown>} Normalized command state.
     */
    function normalizeCommandState(input) {
        const source = input && typeof input === 'object' ? input : {};

        return {
            input: String(source.input || '').trim(),
            binary: String(source.binary || '').trim(),
            configFile: String(source.configFile || '').trim(),
            multiline: source.multiline !== false,
            profile: normalizeProfile(source.profile),
            mode: normalizeProfile(source.mode),
            shellStyle: normalizeShellTarget(source.shellStyle),
            host: String(source.host || 'host.example.com').trim() || 'host.example.com',
            keepAlive: source.keepAlive !== false,
            user: String(source.user || 'admin').trim() || 'admin',
            proxyJump: String(source.proxyJump || '').trim(),
            port: normalizePort(source.port, 22),
            aliveCountMax: normalizePositiveInteger(source.aliveCountMax, 3),
            connectTimeout: normalizeNonNegativeInteger(source.connectTimeout, 10),
            connectionAttempts: normalizePositiveInteger(source.connectionAttempts, 1),
            addressFamily: normalizeAddressFamily(source.addressFamily),
            compression: source.compression === true,
            exitOnForwardFailure: source.exitOnForwardFailure !== false,
            strictHostKey: source.strictHostKey !== false,
            identitiesOnly: source.identitiesOnly === true,
            knownHostsFile: String(source.knownHostsFile || '').trim(),
            logLevel: normalizeLogLevel(source.logLevel),
            checkHostIp: source.checkHostIp !== false,
            preferredAuth: normalizePreferredAuth(source.preferredAuth),
            agentForward: source.agentForward === true,
            batchMode: source.batchMode === true,
            identity: String(source.identity || '').trim(),
            forwarding: String(source.forwarding || '').trim(),
            ttyMode: normalizeTtyMode(source.ttyMode),
            remoteCommand: String(source.remoteCommand || '').trim(),
            sendEnv: String(source.sendEnv || '').trim(),
            x11Forward: source.x11Forward === true,
            clearForwardings: source.clearForwardings === true,
            proxyCommand: String(source.proxyCommand || '').trim(),
            controlMaster: normalizeControlMaster(source.controlMaster),
            controlPath: String(source.controlPath || '').trim(),
            identityPolicy: normalizeIdentityPolicy(source.identityPolicy),
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
        normalizeShellTarget,
        normalizePort,
        normalizePositiveInteger,
        normalizeNonNegativeInteger,
        normalizeAddressFamily,
        normalizeLogLevel,
        normalizePreferredAuth,
        normalizeTtyMode,
        normalizeIdentityPolicy,
        normalizeControlMaster,
        normalizeCommandState,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenerateSshShellModelCore;
}
