const AutomateAfsServiceModelCore = (function () {
    const toolId = 'automate-afs-service';
    const toolVersion = '1.0.0';
    const defaultState = {
        scriptPath: '/Users/badrulamin/Dropbox/Project/IaS/service/service-afs/Workspace/service-afs/service-afs.sh',
        action: 'install',
        mode: 'test',
        environment: 'lab',
        debug: '1',
        exportPath: '/exportfs/etc/sudoers',
        subnet: '172.16.64.0/24',
        exportFile: '/etc/exports',
        exportOptions: 'rw,sync,no_subtree_check,no_root_squash',
        confirmDelete: false
    };
    const actionFlags = {
        install: '-i',
        check: '-c',
        remove: '-r',
        delete: '-d'
    };
    const exportFormats = ['command', 'pdf', 'csv', 'json'];

    function normalizeText(value, fallback) {
        const text = String(value || '').trim();

        return text || fallback;
    }

    function normalizeBoolean(value) {
        return value === true || value === 'true' || value === 'TRUE' || value === '1' || value === 1;
    }

    function normalizeAction(value) {
        const action = String(value || defaultState.action).toLowerCase();

        return Object.prototype.hasOwnProperty.call(actionFlags, action) ? action : defaultState.action;
    }

    function normalizeMode(value) {
        const mode = String(value || defaultState.mode).toLowerCase();

        return ['test', 'default', 'sudo'].includes(mode) ? mode : defaultState.mode;
    }

    function normalizeDebug(value) {
        const debug = String(value || defaultState.debug);

        return ['0', '1', '2'].includes(debug) ? debug : defaultState.debug;
    }

    function normalizeOptions(value) {
        return String(value || defaultState.exportOptions)
            .split(',')
            .map(function (item) {
                return item.trim();
            })
            .filter(Boolean)
            .join(',');
    }

    function shellQuote(value) {
        return `'${String(value || '').replace(/'/g, `'\"'\"'`)}'`;
    }

    function isAbsolutePath(value) {
        return /^\//.test(String(value || ''));
    }

    function isValidCidr(value) {
        const match = String(value || '').match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);

        if (!match) {
            return false;
        }

        const octets = match.slice(1, 5).map(function (part) {
            return Number.parseInt(part, 10);
        });
        const prefix = Number.parseInt(match[5], 10);

        return octets.every(function (octet) {
            return octet >= 0 && octet <= 255;
        }) && prefix >= 0 && prefix <= 32;
    }

    function validateOptions(value) {
        const items = String(value || '').split(',').map(function (item) {
            return item.trim();
        }).filter(Boolean);

        return items.length > 0 && items.every(function (item) {
            return /^[A-Za-z0-9_=:.-]+$/.test(item);
        });
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
     * Returns the model contract version used by exported payloads.
     *
     * @returns {string} Semantic model version.
     */
    function getToolVersion() {
        return toolVersion;
    }

    /**
     * Returns a cloned default state for the AFS service command model.
     *
     * @returns {Record<string, unknown>} Default AFS service state.
     */
    function getDefaultState() {
        return Object.assign({}, defaultState);
    }

    /**
     * Normalizes raw form, URL, or JSON input into the AFS service command state.
     *
     * @param {Record<string, unknown>} input Raw AFS command input.
     * @returns {Record<string, unknown>} Normalized AFS command state.
     */
    function normalizeCommandState(input) {
        const source = input && typeof input === 'object' ? input : {};

        return {
            scriptPath: normalizeText(source.scriptPath || source.target, defaultState.scriptPath),
            action: normalizeAction(source.action),
            mode: normalizeMode(source.mode),
            environment: normalizeText(source.environment, defaultState.environment),
            debug: normalizeDebug(source.debug),
            exportPath: normalizeText(source.exportPath, defaultState.exportPath),
            subnet: normalizeText(source.subnet, defaultState.subnet),
            exportFile: normalizeText(source.exportFile || source.exportConfig, defaultState.exportFile),
            exportOptions: normalizeOptions(source.exportOptions || source.options),
            confirmDelete: normalizeBoolean(source.confirmDelete)
        };
    }

    /**
     * Validates a normalized AFS service command state.
     *
     * @param {Record<string, unknown>} input Raw or normalized state.
     * @returns {string[]} Blocking validation messages.
     */
    function validateCommandState(input) {
        const state = normalizeCommandState(input);
        const errors = [];

        if (!isAbsolutePath(state.scriptPath)) {
            errors.push('Script path must be absolute.');
        }

        if (!isAbsolutePath(state.exportPath)) {
            errors.push('AFS export path must be absolute.');
        }

        if (!isAbsolutePath(state.exportFile)) {
            errors.push('NFS export file path must be absolute.');
        }

        if (!isValidCidr(state.subnet)) {
            errors.push('Allowed subnet must be a valid IPv4 CIDR.');
        }

        if (!validateOptions(state.exportOptions)) {
            errors.push('Export options must be comma-separated option tokens.');
        }

        if (state.action === 'delete' && state.mode !== 'test' && !state.confirmDelete) {
            errors.push('Live delete requires CONFIRM_DELETE=TRUE.');
        }

        return errors;
    }

    /**
     * Builds the NFS exports file line for the normalized state.
     *
     * @param {Record<string, unknown>} input Raw or normalized AFS state.
     * @returns {string} NFS exports line.
     */
    function buildExportLine(input) {
        const state = normalizeCommandState(input);

        return `${state.exportPath} ${state.subnet}(${state.exportOptions})`;
    }

    /**
     * Builds environment variable rows passed to service-afs.sh.
     *
     * @param {Record<string, unknown>} input Raw or normalized AFS state.
     * @returns {Array<Record<string, string>>} Environment rows.
     */
    function buildEnvironmentRows(input) {
        const state = normalizeCommandState(input);
        const rows = [
            { field: 'DEBUG', value: state.debug },
            { field: 'ENABLE_DEBUG', value: state.debug },
            { field: 'AFS_EXPORT_PATH', value: state.exportPath },
            { field: 'AFS_CONF_EXPORT', value: state.exportFile },
            { field: 'AFS_CONF_SUBNET', value: state.subnet },
            { field: 'AFS_CONF_OPTIONS', value: state.exportOptions }
        ];

        if (state.action === 'delete' && state.confirmDelete) {
            rows.push({ field: 'CONFIRM_DELETE', value: 'TRUE' });
        }

        return rows;
    }

    /**
     * Builds the copy-ready service-afs.sh command for the normalized state.
     *
     * @param {Record<string, unknown>} input Raw or normalized AFS state.
     * @returns {string} Generated shell command.
     */
    function buildCommand(input) {
        const state = normalizeCommandState(input);
        const errors = validateCommandState(state);

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }

        const envAssignments = buildEnvironmentRows(state).map(function (row) {
            return `${row.field}=${shellQuote(row.value)}`;
        }).join(' ');
        const parts = [
            'env',
            envAssignments,
            'bash',
            '-x',
            shellQuote(state.scriptPath),
            actionFlags[state.action]
        ];

        if (state.environment) {
            parts.push('-e', shellQuote(state.environment));
        }

        if (state.mode === 'test') {
            parts.push('test');
        } else if (state.mode === 'sudo') {
            parts.push('sudo');
        }

        const command = parts.join(' ').replace(/\s+/g, ' ').trim();

        if (state.mode === 'default' && state.action !== 'check') {
            return `sudo ${command}`;
        }

        return command;
    }

    /**
     * Returns the export formats implemented by this command workspace.
     *
     * @returns {string[]} Export format identifiers.
     */
    function getExportFormats() {
        return exportFormats.slice();
    }

    return {
        getToolId,
        getToolVersion,
        getDefaultState,
        normalizeCommandState,
        validateCommandState,
        buildExportLine,
        buildEnvironmentRows,
        buildCommand,
        getExportFormats
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutomateAfsServiceModelCore;
}
