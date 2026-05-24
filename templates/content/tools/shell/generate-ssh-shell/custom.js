// custom.js
(function () {
    const root = document.querySelector('.generate-ssh-shell-tool');

    if (!root) {
        return;
    }

    const fields = {
        form: root.querySelector('#generateSshShellForm'),
        input: root.querySelector('#generateSshShellInput'),
        inputError: root.querySelector('#generateSshShellInputError'),
        primaryAction: root.querySelector('#generateSshShellPrimaryAction'),
        secondaryAction: root.querySelector('#generateSshShellSecondaryAction'),
        binary: root.querySelector('#generateSshShellBinary'),
	        configFile: root.querySelector('#generateSshShellConfigFile'),
	        multiline: root.querySelector('#generateSshShellMultiline'),
	        profile: root.querySelector('#generateSshShellBasicPrimary'),
	        shellStyle: root.querySelector('#generateSshShellBasicOption'),
	        shellSummary: root.querySelector('#generateSshShellBasicSelectSummary'),
	        host: root.querySelector('#generateSshShellBasicText'),
	        keepAlive: root.querySelector('#generateSshShellBasicToggle'),
	        user: root.querySelector('#generateSshShellCustomText'),
	        proxyJump: root.querySelector('#generateSshShellProxyJump'),
	        mode: root.querySelector('#generateSshShellCustomSelectValueInput'),
	        modeSummary: root.querySelector('#generateSshShellCustomSelectValue'),
	        port: root.querySelector('#generateSshShellCustomNumber'),
        aliveCountMax: root.querySelector('#generateSshShellServerAliveCountMax'),
        connectTimeout: root.querySelector('#generateSshShellConnectTimeout'),
        connectionAttempts: root.querySelector('#generateSshShellConnectionAttempts'),
        addressFamily: root.querySelector('#generateSshShellAddressFamily'),
        compression: root.querySelector('#generateSshShellCompression'),
        exitOnForwardFailure: root.querySelector('#generateSshShellExitOnForwardFailure'),
        strictHostKey: root.querySelector('#generateSshShellCustomToggle'),
        identitiesOnly: root.querySelector('#generateSshShellIdentitiesOnly'),
        knownHostsFile: root.querySelector('#generateSshShellKnownHostsFile'),
        logLevel: root.querySelector('#generateSshShellLogLevel'),
        checkHostIp: root.querySelector('#generateSshShellCheckHostIp'),
        preferredAuth: root.querySelector('#generateSshShellPreferredAuth'),
        agentForward: root.querySelector('#generateSshShellAgentForward'),
        batchMode: root.querySelector('#generateSshShellBatchMode'),
        identity: root.querySelector('#generateSshShellCustomTextarea'),
        forwarding: root.querySelector('#generateSshShellForwardTextarea'),
        ttyMode: root.querySelector('#generateSshShellTtyMode'),
        remoteCommand: root.querySelector('#generateSshShellRemoteCommand'),
        sendEnv: root.querySelector('#generateSshShellSendEnv'),
        x11Forward: root.querySelector('#generateSshShellX11Forward'),
        clearForwardings: root.querySelector('#generateSshShellClearForwardings'),
	        proxyCommand: root.querySelector('#generateSshShellProxyCommand'),
	        controlMaster: root.querySelector('#generateSshShellControlMaster'),
	        controlPath: root.querySelector('#generateSshShellControlPath'),
	        identityPolicy: root.querySelector('#generateSshShellIdentityPolicy'),
	        resultEmpty: root.querySelector('#generateSshShellResultEmpty'),
        resultContent: root.querySelector('#generateSshShellResultContent'),
        resultError: root.querySelector('#generateSshShellResultError'),
        resultSummary: root.querySelector('#generateSshShellResultSummary'),
        command: root.querySelector('#generateSshShellCommand'),
        optionsTableBody: root.querySelector('#generateSshShellOptionsTableBody'),
        warningsList: root.querySelector('#generateSshShellWarningsList'),
        errorsList: root.querySelector('#generateSshShellErrorsList'),
        jsonOutput: root.querySelector('#generateSshShellJsonOutput'),
        jsonStatus: root.querySelector('#generateSshShellJsonRestoreStatus'),
        jsonEmpty: root.querySelector('#generateSshShellJsonRestoreEmpty'),
        sortInput: root.querySelector('#generateSshShellSort'),
        sortSummary: root.querySelector('#generateSshShellSortSummary'),
        sortSelect: root.querySelector('#generateSshShellSortSelect'),
        copyCommandButton: root.querySelector('#generateSshShellCopyCommand'),
        exportPdfButton: root.querySelector('#generateSshShellExportPdf'),
        downloadCsvButton: root.querySelector('#generateSshShellDownloadCsv'),
        copyJsonButton: root.querySelector('#generateSshShellCopyJson'),
        downloadJsonButton: root.querySelector('#generateSshShellDownloadJson'),
        importJsonButton: root.querySelector('#generateSshShellImportJsonButton'),
        importJsonInput: root.querySelector('#generateSshShellImportJson'),
        contractStatus: root.querySelector('#generateSshShellContractStatus'),
        contractShell: root.querySelector('#generateSshShellContractShell'),
        contractCommand: root.querySelector('#generateSshShellContractCommand'),
        contractCommandCopy: root.querySelector('#generateSshShellContractCommandCopy'),
        modelLabel: root.querySelector('#generateSshShellModelLabel'),
        commandTokens: root.querySelector('#generateSshShellCommandTokens'),
        metricAuth: root.querySelector('#generateSshShellMetricAuth'),
        metricJump: root.querySelector('#generateSshShellMetricJump'),
        metricKeepalive: root.querySelector('#generateSshShellMetricKeepalive'),
        operationOne: root.querySelector('#generateSshShellOperationOne'),
        operationTwo: root.querySelector('#generateSshShellOperationTwo'),
    };
    const sortOptionButtons = Array.from(root.querySelectorAll('.generate-ssh-shell-sort-option[data-sort-value]'));
    const tabButtons = Array.from(root.querySelectorAll('.generate-ssh-shell-tab-btn'));
    const tabPanels = Array.from(root.querySelectorAll('.generate-ssh-shell-tab-panel'));

    if (
        !fields.form ||
        !fields.input ||
        !fields.inputError ||
        !fields.primaryAction ||
        !fields.secondaryAction ||
        !fields.binary ||
	        !fields.configFile ||
	        !fields.multiline ||
	        !fields.profile ||
	        !fields.shellStyle ||
	        !fields.shellSummary ||
        !fields.host ||
        !fields.keepAlive ||
	        !fields.user ||
	        !fields.proxyJump ||
	        !fields.mode ||
	        !fields.modeSummary ||
        !fields.port ||
        !fields.aliveCountMax ||
        !fields.connectTimeout ||
        !fields.connectionAttempts ||
        !fields.addressFamily ||
        !fields.compression ||
        !fields.exitOnForwardFailure ||
        !fields.strictHostKey ||
        !fields.identitiesOnly ||
        !fields.knownHostsFile ||
        !fields.logLevel ||
        !fields.checkHostIp ||
        !fields.preferredAuth ||
        !fields.agentForward ||
        !fields.batchMode ||
        !fields.identity ||
        !fields.forwarding ||
        !fields.ttyMode ||
        !fields.remoteCommand ||
        !fields.sendEnv ||
        !fields.x11Forward ||
        !fields.clearForwardings ||
        !fields.proxyCommand ||
	        !fields.controlMaster ||
	        !fields.controlPath ||
	        !fields.identityPolicy ||
        !fields.resultEmpty ||
        !fields.resultContent ||
        !fields.resultError ||
        !fields.resultSummary ||
        !fields.command ||
        !fields.optionsTableBody ||
        !fields.warningsList ||
        !fields.errorsList ||
        !fields.jsonOutput ||
        !fields.jsonStatus ||
        !fields.jsonEmpty ||
        !fields.sortInput ||
        !fields.sortSummary ||
        !fields.sortSelect ||
        !fields.copyCommandButton ||
        !fields.exportPdfButton ||
        !fields.downloadCsvButton ||
        !fields.copyJsonButton ||
        !fields.downloadJsonButton ||
        !fields.importJsonButton ||
        !fields.importJsonInput ||
        !fields.contractStatus ||
        !fields.contractShell ||
        !fields.contractCommand ||
        !fields.contractCommandCopy ||
        !fields.modelLabel ||
        !fields.commandTokens ||
        !fields.metricAuth ||
        !fields.metricJump ||
        !fields.metricKeepalive ||
        !fields.operationOne ||
        !fields.operationTwo ||
        sortOptionButtons.length === 0 ||
        tabButtons.length === 0 ||
        tabPanels.length === 0
    ) {
        return;
    }

    const defaults = {
        input: '',
        binary: '',
        configFile: '',
        multiline: true,
        profile: 'Direct SSH',
        mode: 'Direct SSH',
        shellStyle: 'Bash / Zsh',
        host: 'host.example.com',
        keepAlive: true,
        user: 'admin',
        proxyJump: '',
        port: '22',
        aliveCountMax: '3',
        connectTimeout: '10',
        connectionAttempts: '1',
        addressFamily: 'auto',
        compression: false,
        exitOnForwardFailure: true,
        strictHostKey: true,
        identitiesOnly: false,
        knownHostsFile: '',
        logLevel: 'INFO',
        checkHostIp: true,
        preferredAuth: 'default',
        agentForward: false,
        batchMode: false,
        identity: '',
        forwarding: '',
        ttyMode: 'default',
        remoteCommand: '',
        sendEnv: '',
        x11Forward: false,
        clearForwardings: false,
        proxyCommand: '',
        controlMaster: 'no',
        controlPath: '',
        identityPolicy: 'Optional',
    };
    let latestResult = null;

	    function cleanValue(value, fallback) {
	        const cleaned = String(value || '').trim();
	        return cleaned || fallback;
    }

    function validPort(value) {
        const port = Number.parseInt(value, 10);
        return Number.isInteger(port) && port >= 1 && port <= 65535 ? String(port) : defaults.port;
    }

    function positiveNumber(value, fallback) {
        const number = Number.parseInt(value, 10);
        return Number.isInteger(number) && number >= 1 ? String(number) : fallback;
    }

	    function shellQuote(value, shellStyle) {
        const text = String(value);

        if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(text)) {
            return text;
        }

        if (shellStyle === 'PowerShell') {
            return `'${text.replace(/'/g, "''")}'`;
        }

        return `'${text.replace(/'/g, "'\\''")}'`;
    }

    function splitWords(value) {
        return String(value || '')
            .split(/\s+/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    function splitLines(value) {
        return String(value || '')
            .split(/\n+/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function escapeJsonHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');
    }

    function highlightJsonText(text) {
        return escapeJsonHtml(text).replace(
            /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
                if (match.startsWith('"')) {
                    return `<span class="${match.endsWith(':') ? 'tool-json-key' : 'tool-json-string'}">${match}</span>`;
                }

                if (match === 'true' || match === 'false') {
                    return `<span class="tool-json-boolean">${match}</span>`;
                }

                if (match === 'null') {
                    return `<span class="tool-json-null">${match}</span>`;
                }

                return `<span class="tool-json-number">${match}</span>`;
            }
        );
    }

    function renderJsonOutput(payload) {
        fields.jsonOutput.innerHTML = highlightJsonText(JSON.stringify(payload, null, 2));
        fields.jsonEmpty.classList.toggle('is-hidden', Boolean(payload));
    }

    function setJsonRestoreStatus(message, tone) {
        fields.jsonStatus.textContent = message;
        fields.jsonStatus.classList.toggle('is-hidden', !message);
        fields.jsonStatus.classList.toggle('is-success', tone === 'success');
        fields.jsonStatus.classList.toggle('is-error', tone === 'error');
    }

    function briefRoute(brief) {
        const tokens = splitWords(brief);
        const routeToken = tokens.find((token) => /^[\w.-]+@[\w.-]+$/.test(token))
            || tokens.find((token) => /^([\w-]+\.)+[\w-]+$/.test(token))
            || tokens.find((token) => /^localhost$/.test(token))
            || tokens.find((token) => /^\d{1,3}(\.\d{1,3}){3}$/.test(token));
        const portIndex = tokens.findIndex((token) => token === '-p' || token.toLowerCase() === 'port');
        const parsed = {
            user: '',
            host: '',
            port: '',
        };

        if (routeToken) {
            const routeParts = routeToken.split('@');
            parsed.user = routeParts.length > 1 ? routeParts[0] : '';
            parsed.host = routeParts.length > 1 ? routeParts[1] : routeParts[0];
        }

        if (portIndex >= 0 && tokens[portIndex + 1]) {
            parsed.port = validPort(tokens[portIndex + 1]);
        }

        return parsed;
    }

    function identityConfig(shellStyle) {
        const config = {
            path: '',
            extraOptions: [],
        };

        splitLines(fields.identity.value).forEach((line) => {
            if (!config.path && !line.includes('=') && !line.startsWith('-')) {
                config.path = line;
                return;
            }

            if (line.startsWith('-o ')) {
                config.extraOptions.push(...splitWords(line));
                return;
            }

            if (line.startsWith('-')) {
                config.extraOptions.push(...splitWords(line));
                return;
            }

            config.extraOptions.push('-o', shellQuote(line, shellStyle));
        });

        return config;
    }

    function forwardingArgs() {
        return splitLines(fields.forwarding.value).flatMap((line) => splitWords(line));
    }

    function setError(message) {
        fields.inputError.textContent = message;
        fields.inputError.classList.toggle('d-none', !message);
    }

	    function syncCssDropdown(targetId, nextValue) {
	        const target = root.querySelector(`#${targetId}`);
	        const dropdown = root.querySelector(`[data-dropdown-target="${targetId}"]`);
	        const summary = dropdown
	            ? root.querySelector(`#${dropdown.dataset.dropdownSummary}`)
	            : null;
	        const options = dropdown
	            ? Array.from(dropdown.querySelectorAll('[data-dropdown-value]'))
	            : [];
	        const selectedOption = options.find((option) => option.dataset.dropdownValue === nextValue) || options[0];

	        if (!target || !selectedOption) {
	            return;
	        }

	        target.value = selectedOption.dataset.dropdownValue || '';

	        if (summary) {
	            summary.textContent = selectedOption.textContent.trim();
	        }

	        options.forEach((option) => {
	            const active = option === selectedOption;
	            option.classList.toggle('active', active);
	            option.classList.toggle('is-active', active);
	            option.setAttribute('aria-selected', active ? 'true' : 'false');
	        });
	    }

	    function setDropdownValue(button) {
	        const details = button.closest('details');
	        const targetId = details ? details.dataset.dropdownTarget : '';
	        const value = button.dataset.dropdownValue || button.textContent.trim();

	        if (targetId) {
	            syncCssDropdown(targetId, value);
	        }

	        if (details) {
	            details.open = false;
	        }
	    }

	    function syncAllCssDropdowns() {
	        root.querySelectorAll('[data-dropdown-target]').forEach((dropdown) => {
	            const targetId = dropdown.dataset.dropdownTarget;
	            const target = targetId ? root.querySelector(`#${targetId}`) : null;

	            if (target) {
	                syncCssDropdown(targetId, target.value);
	            }
	        });
	    }

    function workspaceState() {
	        const brief = fields.input.value.trim();
	        const parsedBrief = briefRoute(brief);
	        const profile = fields.profile.value || defaults.profile;
	        const shellStyle = fields.shellStyle.value || defaults.shellStyle;
	        const mode = fields.mode.value || defaults.mode;
        const identity = identityConfig(shellStyle);
        const proxyJump = fields.proxyJump.value.trim();
        const binary = fields.binary.value.trim() || (shellStyle === 'PowerShell' ? 'ssh.exe' : 'ssh');
        const route = {
            user: cleanValue(parsedBrief.user || fields.user.value, defaults.user),
            host: cleanValue(parsedBrief.host || fields.host.value, defaults.host),
            port: validPort(parsedBrief.port || fields.port.value),
        };
        const aliveCountMax = positiveNumber(fields.aliveCountMax.value, defaults.aliveCountMax);
        const connectTimeout = positiveNumber(fields.connectTimeout.value, defaults.connectTimeout);
        const connectionAttempts = positiveNumber(fields.connectionAttempts.value, defaults.connectionAttempts);
        const usesJump = profile === 'Jump host' || mode === 'Jump host' || Boolean(proxyJump);
        const verbose = profile === 'Verbose debug' || mode === 'Verbose debug';

        return {
            brief,
            binary,
            configFile: fields.configFile.value.trim(),
            multiline: fields.multiline.checked,
            profile,
            shellStyle,
            mode,
            identity,
            proxyJump,
            route,
            aliveCountMax,
            connectTimeout,
            connectionAttempts,
            addressFamily: fields.addressFamily.value,
            compression: fields.compression.checked,
            exitOnForwardFailure: fields.exitOnForwardFailure.checked,
            usesJump,
            verbose,
            keepAlive: fields.keepAlive.checked,
            strictHostKey: fields.strictHostKey.checked,
            identitiesOnly: fields.identitiesOnly.checked,
            knownHostsFile: fields.knownHostsFile.value.trim(),
            logLevel: fields.logLevel.value,
            checkHostIp: fields.checkHostIp.checked,
            preferredAuth: fields.preferredAuth.value,
            agentForward: fields.agentForward.checked,
            batchMode: fields.batchMode.checked,
            ttyMode: fields.ttyMode.value,
            remoteCommand: fields.remoteCommand.value.trim(),
            sendEnv: fields.sendEnv.value.trim(),
            x11Forward: fields.x11Forward.checked,
            clearForwardings: fields.clearForwardings.checked,
            proxyCommand: fields.proxyCommand.value.trim(),
            controlMaster: fields.controlMaster.value,
            controlPath: fields.controlPath.value.trim(),
	            identityPolicy: fields.identityPolicy.value || defaults.identityPolicy,
            forwarding: forwardingArgs(),
        };
    }

    function commandParts(state) {
        const parts = [state.binary, '-p', state.route.port];

        if (state.configFile) {
            parts.push('-F', shellQuote(state.configFile, state.shellStyle));
        }

        if (state.addressFamily === 'ipv4') {
            parts.push('-4');
        }

        if (state.addressFamily === 'ipv6') {
            parts.push('-6');
        }

        if (state.verbose) {
            parts.push('-vvv');
        }

        if (state.compression) {
            parts.push('-C');
        }

        if (state.agentForward) {
            parts.push('-A');
        }

        if (state.x11Forward) {
            parts.push('-X');
        }

        if (state.ttyMode === 'force') {
            parts.push('-t');
        }

        if (state.ttyMode === 'disable') {
            parts.push('-T');
        }

        if (state.identity.path) {
            parts.push('-i', shellQuote(state.identity.path, state.shellStyle));
        }

        parts.push('-o', `ConnectTimeout=${state.connectTimeout}`);
        parts.push('-o', `ConnectionAttempts=${state.connectionAttempts}`);

        if (state.keepAlive) {
            parts.push('-o', 'ServerAliveInterval=30');
            parts.push('-o', `ServerAliveCountMax=${state.aliveCountMax}`);
        }

        parts.push('-o', `StrictHostKeyChecking=${state.strictHostKey ? 'yes' : 'no'}`);
        parts.push('-o', `CheckHostIP=${state.checkHostIp ? 'yes' : 'no'}`);
        parts.push('-o', `LogLevel=${state.logLevel}`);

        if (state.knownHostsFile) {
            parts.push('-o', shellQuote(`UserKnownHostsFile=${state.knownHostsFile}`, state.shellStyle));
        }

        if (state.identitiesOnly) {
            parts.push('-o', 'IdentitiesOnly=yes');
        }

        if (state.preferredAuth !== 'default') {
            parts.push('-o', `PreferredAuthentications=${state.preferredAuth}`);
        }

        if (state.batchMode) {
            parts.push('-o', 'BatchMode=yes');
        }

        if (state.exitOnForwardFailure) {
            parts.push('-o', 'ExitOnForwardFailure=yes');
        }

        if (state.clearForwardings) {
            parts.push('-o', 'ClearAllForwardings=yes');
        }

        if (state.sendEnv) {
            parts.push('-o', shellQuote(`SendEnv=${state.sendEnv}`, state.shellStyle));
        }

        parts.push(...state.identity.extraOptions);

        if (state.proxyCommand) {
            parts.push('-o', shellQuote(`ProxyCommand=${state.proxyCommand}`, state.shellStyle));
        }

        if (state.controlMaster !== 'no') {
            parts.push('-o', `ControlMaster=${state.controlMaster}`);
        }

        if (state.controlPath) {
            parts.push('-o', shellQuote(`ControlPath=${state.controlPath}`, state.shellStyle));
        }

        if (state.usesJump && !state.proxyCommand) {
            parts.push('-J', shellQuote(state.proxyJump || 'jump-host', state.shellStyle));
        }

        parts.push(...state.forwarding);
        parts.push(`${state.route.user}@${state.route.host}`);

        if (state.remoteCommand) {
            parts.push(shellQuote(state.remoteCommand, state.shellStyle));
        }

        return parts;
    }

    function formatCommand(parts, shellStyle, multiline) {
        if (parts.length <= 4 || !multiline) {
            return parts.join(' ');
        }

        const joiner = shellStyle === 'PowerShell' ? ' `\n  ' : ' \\\n  ';
        return parts.join(joiner);
    }

    function buildWarnings(state) {
        const warnings = ['Preview only: no SSH connection is opened by this workspace.'];

        if (state.identityPolicy === 'Required' && !state.identity.path) {
            warnings.push('Identity is marked required, but no identity file path is provided.');
        }

        if (!state.strictHostKey) {
            warnings.push('StrictHostKeyChecking=no reduces host-key protection; keep it for controlled lab workflows only.');
        }

        if (state.agentForward) {
            warnings.push('Agent forwarding is enabled; review remote host trust before running the command.');
        }

        if (state.x11Forward) {
            warnings.push('X11 forwarding is enabled and should be limited to trusted paths.');
        }

        if (state.proxyCommand && state.usesJump) {
            warnings.push('ProxyCommand is set, so ProxyJump is represented in the route summary but omitted from the command tokens.');
        }

        if (state.batchMode && state.preferredAuth === 'password') {
            warnings.push('BatchMode with password-only authentication can fail without interactive prompting.');
        }

        if (state.remoteCommand && state.ttyMode === 'disable') {
            warnings.push('A remote command is present while TTY allocation is disabled.');
        }

        return warnings;
    }

    function buildErrors(state) {
        const errors = [];

        if (!state.route.host) {
            errors.push('Target host is required.');
        }

        if (!state.route.user) {
            errors.push('SSH user is required.');
        }

        return errors;
    }

    function summarizeRows(state, command, warnings, errors) {
        const route = `${state.route.user}@${state.route.host}`;
        const jumpLabel = state.proxyCommand
            ? 'ProxyCommand'
            : state.usesJump
                ? state.proxyJump || 'jump-host'
                : 'Direct';

        return [
            ['Brief', state.brief || 'No SSH intent entered'],
            ['Command', command],
            ['Binary', state.binary],
            ['Shell', state.shellStyle],
            ['Profile', state.profile],
            ['Connection mode', state.mode],
            ['Target route', route],
            ['Port', state.route.port],
            ['Config file', state.configFile || 'Default SSH config'],
            ['Address family', state.addressFamily],
            ['Connect timeout', `${state.connectTimeout}s`],
            ['Connection attempts', state.connectionAttempts],
            ['Compression', state.compression ? 'Enabled' : 'Not set'],
            ['Keepalive', state.keepAlive ? `ServerAliveInterval=30, ServerAliveCountMax=${state.aliveCountMax}` : 'Not set'],
            ['Strict host key', state.strictHostKey ? 'StrictHostKeyChecking=yes' : 'StrictHostKeyChecking=no'],
            ['CheckHostIP', state.checkHostIp ? 'Enabled' : 'Disabled'],
            ['Known hosts file', state.knownHostsFile || 'Default known_hosts'],
            ['LogLevel', state.logLevel],
            ['Identity policy', state.identityPolicy],
            ['Identity file', state.identity.path || 'Not provided'],
            ['IdentitiesOnly', state.identitiesOnly ? 'Enabled' : 'Not set'],
            ['Preferred auth', state.preferredAuth],
            ['Agent forwarding', state.agentForward ? 'Enabled' : 'Not set'],
            ['BatchMode', state.batchMode ? 'Enabled' : 'Not set'],
            ['Jump path', jumpLabel],
            ['ProxyJump', state.usesJump ? state.proxyJump || 'jump-host' : 'Not used'],
            ['ProxyCommand', state.proxyCommand || 'Not used'],
            ['ControlMaster', state.controlMaster],
            ['ControlPath', state.controlPath || 'Not set'],
            ['Forwarding args', state.forwarding.join(' ') || 'None'],
            ['TTY mode', state.ttyMode],
            ['Remote command', state.remoteCommand || 'None'],
            ['SendEnv', state.sendEnv || 'Not set'],
            ['X11 forwarding', state.x11Forward ? 'Enabled' : 'Not set'],
            ['ExitOnForwardFailure', state.exitOnForwardFailure ? 'Enabled' : 'Not set'],
            ['ClearAllForwardings', state.clearForwardings ? 'Enabled' : 'Not set'],
            ['Warnings', String(warnings.length)],
            ['Errors', String(errors.length)],
        ];
    }

    function buildJsonPayload(result) {
        return {
            tool: 'generate-ssh-shell',
            version: '1.0.0',
            generated_at: result.generatedAtIso,
            state: result.state,
            command: result.command,
            warnings: result.warnings,
            errors: result.errors,
            summary_rows: result.summaryRows.map((row, index) => ({
                id: index + 1,
                field: row[0],
                value: row[1],
            })),
        };
    }

    function buildResult() {
        const state = workspaceState();
        const parts = commandParts(state);
        const command = formatCommand(parts, state.shellStyle, state.multiline);
        const warnings = buildWarnings(state);
        const errors = buildErrors(state);
        const result = {
            generatedAtIso: new Date().toISOString(),
            state,
            parts,
            command,
            route: `${state.route.user}@${state.route.host}`,
            warnings,
            errors,
            summaryLine: `${state.profile} to ${state.route.user}@${state.route.host}:${state.route.port}`,
            jumpLabel: state.proxyCommand
                ? 'ProxyCommand'
                : state.usesJump
                    ? state.proxyJump || 'jump-host'
                    : 'Direct',
            authLabel: state.identity.path
                ? 'IdentityFile'
                : state.preferredAuth !== 'default'
                    ? state.preferredAuth
                    : state.identityPolicy === 'Required'
                        ? 'Required key missing'
                        : 'Optional key',
        };

        result.summaryRows = summarizeRows(state, command, warnings, errors);
        result.jsonPayload = buildJsonPayload(result);

        return result;
    }

    function renderSummary(result) {
        const warningCount = result.warnings.length;
        const errorCount = result.errors.length;
        const resultTone = errorCount > 0 ? 'error' : warningCount > 1 ? 'warning' : 'ready';
        const updatedText = new Date(result.generatedAtIso).toLocaleString();

        fields.resultSummary.dataset.resultTone = resultTone;
        fields.resultSummary.dataset.resultLayout = 'command';
        fields.resultSummary.innerHTML = `
            <header class="generate-ssh-shell-result-header" aria-label="Result summary header"><div class="generate-ssh-shell-result-header-main"><span class="generate-ssh-shell-result-header-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><div class="generate-ssh-shell-result-header-copy"><h2 class="generate-ssh-shell-result-header-title">Result Summary</h2><p>Overview of the generated SSH command and key review metrics</p></div></div><div class="generate-ssh-shell-result-header-meta" aria-label="Result summary status"><span class="generate-ssh-shell-result-header-chip generate-ssh-shell-result-chip-ready"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span><span class="generate-ssh-shell-result-header-chip generate-ssh-shell-result-chip-updated"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(updatedText)}</span></span></div></header>
            <div class="generate-ssh-shell-result-hero-grid" aria-live="polite"><article class="generate-ssh-shell-result-card generate-ssh-shell-result-card-primary" data-result-visual="command" aria-label="Primary SSH command result"><div class="generate-ssh-shell-result-primary-heading generate-ssh-shell-result-visual-copy generate-ssh-shell-result-visual-copy-top"><div class="generate-ssh-shell-result-kicker">Primary Result</div><h3 class="generate-ssh-shell-result-title generate-ssh-shell-result-title-center">SSH route</h3></div><div class="generate-ssh-shell-result-primary-visual" id="generateSshShellResultVisual" aria-label="Primary SSH route"><div class="generate-ssh-shell-result-command-output"><code class="generate-ssh-shell-result-command-value">${escapeHtml(result.summaryLine)}</code></div></div><div class="generate-ssh-shell-result-visual-copy"><p class="generate-ssh-shell-result-copy generate-ssh-shell-result-copy-center">Compact route preview for the generated SSH command.</p></div><span class="generate-ssh-shell-result-card-divider" aria-hidden="true"></span><div class="generate-ssh-shell-result-chip-row generate-ssh-shell-result-chip-row-center" aria-label="Primary result outcome"><span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-outcome generate-ssh-shell-result-chip-ready"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>Command Generated</span></span></div></article><article class="generate-ssh-shell-result-card generate-ssh-shell-result-card-summary" aria-label="SSH command summary"><div class="generate-ssh-shell-result-summary-intro"><span class="generate-ssh-shell-result-card-icon generate-ssh-shell-result-card-icon-summary" aria-hidden="true"><i class="bi bi-shield-lock"></i></span><div class="generate-ssh-shell-result-summary-copy"><div class="generate-ssh-shell-result-kicker">Descriptive Summary</div><h3 class="generate-ssh-shell-result-title">${escapeHtml(result.state.profile)} command</h3><p class="generate-ssh-shell-result-copy">The generated command and comparison output stay aligned with the selected shell, target, authentication, jump, and OpenSSH option model.</p></div></div><span class="generate-ssh-shell-result-card-divider" aria-hidden="true"></span><div class="generate-ssh-shell-result-chip-grid" aria-label="Command state"><span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-baseline"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>${escapeHtml(result.state.binary)}</span></span><span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-ready"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-check2-circle"></i></span><span>${escapeHtml(result.jumpLabel)}</span></span><span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-${warningCount > 1 ? 'warning' : 'success'}"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-exclamation-triangle"></i></span><span>${warningCount} warning${warningCount === 1 ? '' : 's'}</span></span><span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-${errorCount > 0 ? 'error' : 'success'}"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-x-circle"></i></span><span>${errorCount} error${errorCount === 1 ? '' : 's'}</span></span></div></article></div>
            <div class="generate-ssh-shell-result-metric-grid" aria-label="Command metrics"><article class="generate-ssh-shell-result-metric-card generate-ssh-shell-result-metric-success"><span class="generate-ssh-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-person"></i></span><span class="generate-ssh-shell-result-metric-label">Target</span><strong class="generate-ssh-shell-result-metric-value">${escapeHtml(result.route)}</strong><span class="generate-ssh-shell-result-metric-copy">Selected user and host.</span><span class="generate-ssh-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-ssh-shell-result-metric-card generate-ssh-shell-result-metric-info"><span class="generate-ssh-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-ethernet"></i></span><span class="generate-ssh-shell-result-metric-label">Port</span><strong class="generate-ssh-shell-result-metric-value">${escapeHtml(result.state.route.port)}</strong><span class="generate-ssh-shell-result-metric-copy">SSH destination port.</span><span class="generate-ssh-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-ssh-shell-result-metric-card generate-ssh-shell-result-metric-accent-tone"><span class="generate-ssh-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-list-check"></i></span><span class="generate-ssh-shell-result-metric-label">Tokens</span><strong class="generate-ssh-shell-result-metric-value">${escapeHtml(String(result.parts.length))}</strong><span class="generate-ssh-shell-result-metric-copy">Generated token count.</span><span class="generate-ssh-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-ssh-shell-result-metric-card generate-ssh-shell-result-metric-warning"><span class="generate-ssh-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span class="generate-ssh-shell-result-metric-label">Shell</span><strong class="generate-ssh-shell-result-metric-value">${escapeHtml(result.state.shellStyle)}</strong><span class="generate-ssh-shell-result-metric-copy">Output quoting mode.</span><span class="generate-ssh-shell-result-metric-accent" aria-hidden="true"></span></article></div>
        `;
    }

	    function updateSortState() {
	        const selectedButton = sortOptionButtons.find((button) => button.dataset.sortValue === fields.sortInput.value) || sortOptionButtons[0];

        if (!selectedButton) {
            return;
        }

        fields.sortInput.value = selectedButton.dataset.sortValue || 'id';
        fields.sortSummary.textContent = selectedButton.textContent.trim();
        sortOptionButtons.forEach((button) => {
            const active = button === selectedButton;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
	        });
	        fields.sortSelect.removeAttribute('open');
	        syncSortExpandedState();
	    }

	    function syncSortExpandedState() {
	        const summary = fields.sortSelect.querySelector('.generate-ssh-shell-sort-summary');

	        if (summary) {
	            summary.setAttribute('aria-expanded', fields.sortSelect.open ? 'true' : 'false');
	        }
	    }

    function sortRows(rows, sortValue) {
        const normalizedRows = rows.map(([field, value], index) => ({
            field,
            value,
            id: index + 1,
            index,
        }));

        if (sortValue === 'alphabetical' || sortValue === 'field') {
            return normalizedRows
                .sort((left, right) => left.field.localeCompare(right.field, undefined, {
                    numeric: true,
                    sensitivity: 'base',
                }) || left.index - right.index);
        }

        if (sortValue === 'value') {
            return normalizedRows
                .sort((left, right) => left.value.localeCompare(right.value, undefined, {
                    numeric: true,
                    sensitivity: 'base',
                }) || left.index - right.index);
        }

        if (sortValue === 'length') {
            return normalizedRows
                .sort((left, right) => right.value.length - left.value.length || left.index - right.index);
        }

        return normalizedRows.sort((left, right) => left.index - right.index);
    }

    function getSortedSummaryRows(result) {
        return sortRows(result.summaryRows, fields.sortInput.value)
            .map((row) => [row.field, row.value, row.id]);
    }

    function buildCsvRows(result, rows) {
        return [
            ['ID', 'Field', 'Value'],
            ...rows.map((row) => [row[2], row[0], row[1]]),
            [],
            ['Command', result.command],
            ['Warnings', result.warnings.join(' | ') || 'None'],
            ['Errors', result.errors.join(' | ') || 'None'],
        ];
    }

    function renderOptionsTable(result) {
        fields.optionsTableBody.innerHTML = getSortedSummaryRows(result)
            .map((row, index) => `
                <tr>
                    <td>${escapeHtml(row[2] || index + 1)}</td>
                    <td>${escapeHtml(row[0])}</td>
                    <td>${escapeHtml(row[1])}</td>
                    <td class="generate-ssh-shell-table-copy-cell">
                        <button type="button" class="generate-ssh-shell-row-copy generate-ssh-shell-row-copy-btn" data-options-copy="${escapeHtml(row[1])}" aria-label="Copy operation row ${escapeHtml(row[2] || index + 1)}" title="Copy operation row">
                            <i class="bi bi-clipboard" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            `)
            .join('');
    }

    function renderMessageList(element, messages, emptyText) {
        if (!messages.length) {
            element.className = 'generate-ssh-shell-message-list generate-ssh-shell-message-list-empty';
            element.innerHTML = `<li>${escapeHtml(emptyText)}</li>`;
            return;
        }

        element.className = 'generate-ssh-shell-message-list';
        element.innerHTML = messages
            .map((message) => `<li>${escapeHtml(message)}</li>`)
            .join('');
    }

    function replaceTokens(tokens) {
        fields.commandTokens.replaceChildren();
        tokens.forEach((token) => {
            const item = document.createElement('span');
            item.className = 'generate-ssh-shell-visual-contract-token';
            item.textContent = token;
            fields.commandTokens.appendChild(item);
        });
    }

    function renderVisualContract(result) {
        fields.contractStatus.textContent = result.state.brief ? 'Generated from brief' : 'Generated';
        fields.contractCommand.textContent = result.command;
        fields.contractShell.textContent = result.state.shellStyle;
        fields.contractCommandCopy.textContent = `${result.state.profile}; ${result.state.mode}; ${result.state.shellStyle}; preview only, no SSH connection is opened.`;
        fields.modelLabel.textContent = `${result.state.shellStyle} OpenSSH preview`;
        fields.metricAuth.textContent = result.authLabel;
        fields.metricJump.textContent = result.jumpLabel;
        fields.metricKeepalive.textContent = result.state.keepAlive ? `30 x ${result.state.aliveCountMax}` : `Off (${result.state.aliveCountMax} held)`;
        fields.operationOne.textContent = result.route;
        fields.operationTwo.textContent = result.state.strictHostKey ? 'StrictHostKeyChecking=yes' : 'StrictHostKeyChecking=no';
        replaceTokens(result.parts.slice(0, 18));
    }

    function renderResult(result) {
        latestResult = result;
        fields.resultEmpty.classList.add('d-none');
        fields.resultContent.classList.remove('d-none');
        fields.resultError.classList.add('d-none');
        fields.resultError.textContent = '';
        fields.command.textContent = result.command;
        renderSummary(result);
        renderOptionsTable(result);
        renderJsonOutput(result.jsonPayload);
        renderMessageList(fields.warningsList, result.warnings, 'No warnings for the current SSH command.');
        renderMessageList(fields.errorsList, result.errors, 'No blocking errors for the current SSH command.');
        renderVisualContract(result);
        activateTab('generateSshShellOptionsPanel');
    }

    function showResultError(message) {
        fields.resultError.classList.remove('d-none');
        fields.resultError.textContent = message;
    }

    function activateTab(tabTarget) {
        tabButtons.forEach((button) => {
            const active = button.dataset.tabTarget === tabTarget;
            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', active ? 'true' : 'false');
            button.setAttribute('tabindex', active ? '0' : '-1');
        });

        tabPanels.forEach((panel) => {
            const active = panel.id === tabTarget || panel.dataset.tabPanel === tabTarget;
            panel.classList.toggle('active', active);
            panel.hidden = !active;
        });
    }

    function flashButton(button, text) {
        const label = button.querySelector('[data-button-label]') || button.querySelector('.generate-ssh-shell-command-copy-label');

        if (!label && button.classList.contains('generate-ssh-shell-row-copy')) {
            button.classList.add('copied');
            window.setTimeout(function () {
                button.classList.remove('copied');
            }, 1400);
            return;
        }

        const originalText = button.dataset.defaultLabel || (label ? label.textContent : button.textContent);
        button.dataset.defaultLabel = originalText;
        button.dataset.state = text === 'Copied' ? 'copied' : '';

        if (label) {
            label.textContent = text;
        } else {
            button.textContent = text;
        }

        window.setTimeout(function () {
            if (label) {
                label.textContent = originalText;
                button.dataset.state = '';
                return;
            }

            button.textContent = originalText;
            button.dataset.state = '';
        }, 1400);
    }

    async function copyText(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            flashButton(button, 'Copied');
        } catch (error) {
            flashButton(button, 'Failed');
        }
    }

    function convertRowsToCsv(rows) {
        return rows
            .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
            .join('\n');
    }

    function downloadFile(filename, contents, mimeType) {
        const blob = new Blob([contents], { type: mimeType });
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(objectUrl);
    }

    function exportResultShellAsPdf(filenameStem) {
        const exportWindow = window.open('', '_blank', 'noopener,noreferrer');
        const shell = fields.resultContent.querySelector('.generate-ssh-shell-result-shell') || fields.resultContent;

        if (!exportWindow || !shell) {
            window.print();
            return;
        }

        const styles = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], style'))
            .map((node) => node.outerHTML)
            .join('\n');

        exportWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(filenameStem)}</title>
  ${styles}
</head>
<body>
  ${shell.outerHTML}
</body>
</html>`);
        exportWindow.document.close();
        exportWindow.focus();
        window.setTimeout(() => {
            exportWindow.print();
        }, 250);
    }

	    function getImportedState(payload) {
        const importedState = payload && typeof payload === 'object'
            ? payload.state || payload.query
            : null;

        if (!importedState || typeof importedState !== 'object' || payload.tool !== 'generate-ssh-shell') {
            throw new Error('The selected JSON is not a Generate SSH Shell export.');
        }

        return importedState;
    }

    function applyImportedState(importedState) {
        applyState(importedState);
        generateAndRender();
        setJsonRestoreStatus('Imported', 'success');
    }

    function applyState(state) {
        fields.input.value = state.input || state.brief || defaults.input;
        fields.binary.value = state.binary || defaults.binary;
        fields.configFile.value = state.configFile || defaults.configFile;
	        fields.multiline.checked = state.multiline !== undefined ? Boolean(state.multiline) : defaults.multiline;
	        fields.profile.value = state.profile || defaults.profile;
	        fields.shellStyle.value = state.shellStyle || defaults.shellStyle;
	        fields.host.value = state.route?.host || state.host || defaults.host;
	        fields.keepAlive.checked = state.keepAlive !== undefined ? Boolean(state.keepAlive) : defaults.keepAlive;
	        fields.user.value = state.route?.user || state.user || defaults.user;
	        fields.proxyJump.value = state.proxyJump || defaults.proxyJump;
	        fields.mode.value = state.mode || defaults.mode;
	        fields.port.value = state.route?.port || state.port || defaults.port;
        fields.aliveCountMax.value = state.aliveCountMax || defaults.aliveCountMax;
        fields.connectTimeout.value = state.connectTimeout || defaults.connectTimeout;
        fields.connectionAttempts.value = state.connectionAttempts || defaults.connectionAttempts;
        fields.addressFamily.value = state.addressFamily || defaults.addressFamily;
        fields.compression.checked = state.compression !== undefined ? Boolean(state.compression) : defaults.compression;
        fields.exitOnForwardFailure.checked = state.exitOnForwardFailure !== undefined ? Boolean(state.exitOnForwardFailure) : defaults.exitOnForwardFailure;
        fields.strictHostKey.checked = state.strictHostKey !== undefined ? Boolean(state.strictHostKey) : defaults.strictHostKey;
        fields.identitiesOnly.checked = state.identitiesOnly !== undefined ? Boolean(state.identitiesOnly) : defaults.identitiesOnly;
        fields.knownHostsFile.value = state.knownHostsFile || defaults.knownHostsFile;
        fields.logLevel.value = state.logLevel || defaults.logLevel;
        fields.checkHostIp.checked = state.checkHostIp !== undefined ? Boolean(state.checkHostIp) : defaults.checkHostIp;
        fields.preferredAuth.value = state.preferredAuth || defaults.preferredAuth;
        fields.agentForward.checked = state.agentForward !== undefined ? Boolean(state.agentForward) : defaults.agentForward;
        fields.batchMode.checked = state.batchMode !== undefined ? Boolean(state.batchMode) : defaults.batchMode;
        fields.identity.value = state.identity?.path || state.identityText || defaults.identity;
        fields.forwarding.value = Array.isArray(state.forwarding) ? state.forwarding.join('\n') : state.forwarding || defaults.forwarding;
        fields.ttyMode.value = state.ttyMode || defaults.ttyMode;
        fields.remoteCommand.value = state.remoteCommand || defaults.remoteCommand;
        fields.sendEnv.value = state.sendEnv || defaults.sendEnv;
        fields.x11Forward.checked = state.x11Forward !== undefined ? Boolean(state.x11Forward) : defaults.x11Forward;
        fields.clearForwardings.checked = state.clearForwardings !== undefined ? Boolean(state.clearForwardings) : defaults.clearForwardings;
	        fields.proxyCommand.value = state.proxyCommand || defaults.proxyCommand;
	        fields.controlMaster.value = state.controlMaster || defaults.controlMaster;
	        fields.controlPath.value = state.controlPath || defaults.controlPath;
	        fields.identityPolicy.value = state.identityPolicy || defaults.identityPolicy;

	        syncAllCssDropdowns();
	    }

    function syncSafeStateToUrl(result) {
        const params = new URLSearchParams();
        const state = result.state;

        if (state.brief) {
            params.set('q', state.brief);
        }

        params.set('host', state.route.host);
        params.set('user', state.route.user);
        params.set('port', state.route.port);
        params.set('profile', state.profile);
        params.set('mode', state.mode);
        params.set('shell', state.shellStyle);

        if (state.proxyJump) {
            params.set('jump', state.proxyJump);
        }

        if (!state.keepAlive) {
            params.set('keepalive', '0');
        }

        if (!state.strictHostKey) {
            params.set('strict', '0');
        }

        if (state.connectTimeout !== defaults.connectTimeout) {
            params.set('timeout', state.connectTimeout);
        }

        if (fields.sortInput.value !== 'id') {
            params.set('sort', fields.sortInput.value);
        }

        const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
        window.history.replaceState({}, '', nextUrl);
    }

    function restoreSafeStateFromUrl() {
        const params = new URLSearchParams(window.location.search);

        if (!params.toString()) {
            return false;
        }

        applyState({
            input: params.get('q') || defaults.input,
            host: params.get('host') || defaults.host,
            user: params.get('user') || defaults.user,
            port: params.get('port') || defaults.port,
            profile: params.get('profile') || defaults.profile,
            mode: params.get('mode') || defaults.mode,
            shellStyle: params.get('shell') || defaults.shellStyle,
            proxyJump: params.get('jump') || defaults.proxyJump,
            keepAlive: params.get('keepalive') === '0' ? false : defaults.keepAlive,
            strictHostKey: params.get('strict') === '0' ? false : defaults.strictHostKey,
            connectTimeout: params.get('timeout') || defaults.connectTimeout,
        });

        if (params.get('sort')) {
            fields.sortInput.value = params.get('sort');
        }

        return true;
    }

    function reset() {
        applyState(defaults);
        generateAndRender();
    }

    function generateAndRender() {
        fields.primaryAction.disabled = true;
        fields.primaryAction.querySelector('span').textContent = 'Generating...';

        window.setTimeout(() => {
            const result = buildResult();
            renderResult(result);
            syncSafeStateToUrl(result);
            setError('');

            if (result.errors.length > 0) {
                activateTab('generateSshShellWarningsPanel');
                showResultError('Fix the blocking fields listed below to produce a valid SSH command.');
            }

            fields.primaryAction.disabled = false;
            fields.primaryAction.querySelector('span').textContent = 'Generate';
        }, 30);
    }

	    root.querySelectorAll('input, textarea').forEach((control) => {
	        control.addEventListener('input', generateAndRender);
	        control.addEventListener('change', generateAndRender);
	    });

	    root.querySelectorAll('[data-dropdown-value]').forEach((button) => {
	        button.addEventListener('click', () => {
	            setDropdownValue(button);
	            generateAndRender();
	        });
    });

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

	    sortOptionButtons.forEach((button) => {
	        button.addEventListener('click', function () {
	            fields.sortInput.value = button.dataset.sortValue || 'id';
            updateSortState();

            if (latestResult) {
                renderOptionsTable(latestResult);
            }
	        });
	    });
	    fields.sortSelect.addEventListener('toggle', syncSortExpandedState);

    fields.optionsTableBody.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const copyButton = target.closest('.generate-ssh-shell-row-copy');

        if (!copyButton || !fields.optionsTableBody.contains(copyButton)) {
            return;
        }

        const copyValue = copyButton.getAttribute('data-options-copy');

        if (copyValue !== null) {
            copyText(copyValue, copyButton);
        }
    });

    fields.copyCommandButton.addEventListener('click', function () {
        if (latestResult && latestResult.command) {
            copyText(latestResult.command, fields.copyCommandButton);
        }
    });

    fields.exportPdfButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        exportResultShellAsPdf('generate-ssh-shell');
        flashButton(fields.exportPdfButton, 'Opened');
    });

    fields.downloadCsvButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile(
            'generate-ssh-shell-options.csv',
            `${convertRowsToCsv(buildCsvRows(latestResult, getSortedSummaryRows(latestResult)))}\n`,
            'text/csv;charset=utf-8'
        );
        flashButton(fields.downloadCsvButton, 'Downloaded');
    });

    fields.copyJsonButton.addEventListener('click', function () {
        if (latestResult) {
            copyText(JSON.stringify(latestResult.jsonPayload, null, 2), fields.copyJsonButton);
        }
    });

    fields.downloadJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile('generate-ssh-shell.json', `${JSON.stringify(latestResult.jsonPayload, null, 2)}\n`, 'application/json;charset=utf-8');
        flashButton(fields.downloadJsonButton, 'Downloaded');
    });

    fields.importJsonButton.addEventListener('click', function () {
        fields.importJsonInput.click();
    });

    fields.importJsonInput.addEventListener('change', async function () {
        const file = fields.importJsonInput.files && fields.importJsonInput.files[0];

        if (!file) {
            return;
        }

        try {
            const payload = JSON.parse(await file.text());

            applyImportedState(getImportedState(payload));
            flashButton(fields.importJsonButton, 'Imported');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'The selected JSON file could not be imported.';

            showResultError(message);
            setJsonRestoreStatus('Import failed', 'error');
            flashButton(fields.importJsonButton, 'Failed');
        } finally {
            fields.importJsonInput.value = '';
        }
    });

    fields.form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateAndRender();
    });
    fields.secondaryAction.addEventListener('click', reset);
    document.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof Node)) {
            return;
        }

	        if (!fields.sortSelect.contains(target)) {
	            fields.sortSelect.removeAttribute('open');
	            syncSortExpandedState();
	        }
	    });
	    document.addEventListener('keydown', function (event) {
	        if (event.key === 'Escape') {
	            fields.sortSelect.removeAttribute('open');
	            syncSortExpandedState();
	        }
	    });

	    syncAllCssDropdowns();
	    restoreSafeStateFromUrl();
	    updateSortState();
    generateAndRender();
}());
