// custom.js
(function () {
    const root = document.querySelector('.generate-ufw-command-tool');

    if (!root) {
        return;
    }

    const profileDefaults = {
        'ssh-admin': {
            target: '22/tcp',
            profile: 'ssh-admin',
            shellStyle: 'posix',
            source: '192.0.2.10',
            useSudo: true,
            destination: 'any',
            logPackets: false,
            dryRun: false,
            routeRule: false,
            insertRule: false,
            port: '22',
            interfaceName: 'eth0',
            attachComment: true,
            action: 'allow',
            comment: 'Allow SSH administration',
            protocol: 'tcp',
            direction: 'in',
            insertPosition: '',
            sourcePort: '',
            routeOutInterface: '',
            sourceAddress: '192.0.2.10',
            destinationAddress: 'any',
            appProfile: 'OpenSSH',
            appMode: false,
            appendExtraOptions: false,
            extraArgs: ''
        },
        'web-service': {
            target: '443/tcp',
            profile: 'web-service',
            shellStyle: 'posix',
            source: 'any',
            useSudo: true,
            destination: 'any',
            logPackets: false,
            dryRun: false,
            routeRule: false,
            insertRule: false,
            port: '443',
            interfaceName: '',
            attachComment: true,
            action: 'allow',
            comment: 'Allow HTTPS service',
            protocol: 'tcp',
            direction: 'in',
            insertPosition: '',
            sourcePort: '',
            routeOutInterface: '',
            sourceAddress: 'any',
            destinationAddress: 'any',
            appProfile: 'Nginx Full',
            appMode: false,
            appendExtraOptions: false,
            extraArgs: ''
        },
        'deny-source': {
            target: '203.0.113.50',
            profile: 'deny-source',
            shellStyle: 'posix',
            source: '203.0.113.50',
            useSudo: true,
            destination: 'any',
            logPackets: true,
            dryRun: false,
            routeRule: false,
            insertRule: false,
            port: '',
            interfaceName: '',
            attachComment: true,
            action: 'deny',
            comment: 'Block reviewed source host',
            protocol: 'any',
            direction: 'in',
            insertPosition: '',
            sourcePort: '',
            routeOutInterface: '',
            sourceAddress: '203.0.113.50',
            destinationAddress: 'any',
            appProfile: 'OpenSSH',
            appMode: false,
            appendExtraOptions: false,
            extraArgs: ''
        },
        'route-service': {
            target: '443/tcp',
            profile: 'route-service',
            shellStyle: 'posix',
            source: '10.0.0.0/24',
            useSudo: true,
            destination: '10.0.1.10',
            logPackets: false,
            dryRun: false,
            routeRule: true,
            insertRule: false,
            port: '443',
            interfaceName: 'eth0',
            attachComment: true,
            action: 'allow',
            comment: 'Allow routed HTTPS traffic',
            protocol: 'tcp',
            direction: 'in',
            insertPosition: '',
            sourcePort: '',
            routeOutInterface: 'eth1',
            sourceAddress: '10.0.0.0/24',
            destinationAddress: '10.0.1.10',
            appProfile: 'OpenSSH',
            appMode: false,
            appendExtraOptions: false,
            extraArgs: ''
        },
        'app-profile': {
            target: 'OpenSSH',
            profile: 'app-profile',
            shellStyle: 'posix',
            source: 'any',
            useSudo: true,
            destination: 'any',
            logPackets: false,
            dryRun: false,
            routeRule: false,
            insertRule: false,
            port: '',
            interfaceName: '',
            attachComment: true,
            action: 'allow',
            comment: 'Allow application profile',
            protocol: 'any',
            direction: 'in',
            insertPosition: '',
            sourcePort: '',
            routeOutInterface: '',
            sourceAddress: 'any',
            destinationAddress: 'any',
            appProfile: 'OpenSSH',
            appMode: true,
            appendExtraOptions: false,
            extraArgs: ''
        }
    };
    const actions = ['allow', 'deny', 'reject', 'limit'];
    const protocols = ['tcp', 'udp', 'any'];
    const shellStyles = ['posix', 'bash', 'review-note'];
    const routeParam = 'ufwState';

const byId = function (id) {
        return document.getElementById(id);
    };

    const form = byId('generateUfwCommandForm');
    const input = byId('generateUfwCommandInput');
    const inputError = byId('generateUfwCommandInputError');
    const primaryAction = byId('generateUfwCommandPrimaryAction');
    const resetAction = byId('generateUfwCommandSecondaryAction');
    const profile = byId('generateUfwCommandBasicPrimary');
    const applyPreset = byId('generateUfwCommandApplyPreset');
    const shellStyle = byId('generateUfwCommandShellStyle');
    const sourceInput = byId('generateUfwCommandBasicText');
    const useSudo = byId('generateUfwCommandBasicToggle');
    const destinationInput = byId('generateUfwCommandDestination');
    const logPackets = byId('generateUfwCommandVerbose');
    const dryRun = byId('generateUfwCommandQuiet');
    const routeRule = byId('generateUfwCommandIpv4');
    const insertRule = byId('generateUfwCommandIpv6');
    const port = byId('generateUfwCommandCustomNumber');
    const interfaceName = byId('generateUfwCommandCustomText');
    const attachComment = byId('generateUfwCommandCustomToggle');
    const action = byId('generateUfwCommandAction');
    const comment = byId('generateUfwCommandComment');
    const protocol = byId('generateUfwCommandProtocol');
    const insertPosition = byId('generateUfwCommandInsertPosition');
    const sourcePort = byId('generateUfwCommandSourcePort');
    const routeOutInterface = byId('generateUfwCommandRouteOutInterface');
    const sourceAddress = byId('generateUfwCommandSourceAddress');
    const destinationAddress = byId('generateUfwCommandDestinationAddress');
    const appProfile = byId('generateUfwCommandAppProfile');
    const appMode = byId('generateUfwCommandAppMode');
    const appendExtraOptions = byId('generateUfwCommandAppendExtraOptions');
    const extraArgs = byId('generateUfwCommandExtraArgs');
    const resultEmpty = byId('generateUfwCommandResultEmpty');
    const resultContent = byId('generateUfwCommandResultContent');
    const resultSummary = byId('generateUfwCommandResultSummary');
    const resultError = byId('generateUfwCommandResultError');
    const sortSelect = byId('generateUfwCommandSortSelect');
    const sortSummary = byId('generateUfwCommandSortSummary');
    const sortInput = byId('generateUfwCommandSort');
    const commandOutput = byId('generateUfwCommandCommand');
    const operationsTableBody = byId('generateUfwCommandOperationsTableBody');
    const summaryTableBody = byId('generateUfwCommandSummaryTableBody');
    const warningsList = byId('generateUfwCommandWarningsList');
    const errorsList = byId('generateUfwCommandErrorsList');
    const jsonOutput = byId('generateUfwCommandJsonOutput');
    const jsonStatus = byId('generateUfwCommandJsonRestoreStatus');
    const jsonEmpty = byId('generateUfwCommandJsonRestoreEmpty');
    const copyCommandButton = byId('generateUfwCommandCopyCommand');
    const exportPdfButton = byId('generateUfwCommandExportPdf');
    const downloadCsvButton = byId('generateUfwCommandDownloadCsv');
    const copyJsonButton = byId('generateUfwCommandCopyJson');
    const downloadJsonButton = byId('generateUfwCommandDownloadJson');
    const importJsonButton = byId('generateUfwCommandImportJsonButton');
    const importJsonInput = byId('generateUfwCommandImportJson');
    const sortOptionButtons = Array.from(root.querySelectorAll('[data-sort-value]'));
    const tabButtons = Array.from(root.querySelectorAll('[role="tab"][data-tab-target]'));
    const tabPanels = Array.from(root.querySelectorAll('[data-tab-panel]'));

    const requiredElements = [
        form,
        input,
        inputError,
        primaryAction,
        resetAction,
        profile,
        applyPreset,
        shellStyle,
        sourceInput,
        useSudo,
        destinationInput,
        logPackets,
        dryRun,
        routeRule,
        insertRule,
        port,
        interfaceName,
        attachComment,
        action,
        comment,
        protocol,
        insertPosition,
        sourcePort,
        routeOutInterface,
        sourceAddress,
        destinationAddress,
        appProfile,
        appMode,
        appendExtraOptions,
        extraArgs,
        resultEmpty,
        resultContent,
        resultSummary,
        resultError,
        sortSelect,
        sortSummary,
        sortInput,
        commandOutput,
        operationsTableBody,
        summaryTableBody,
        warningsList,
        errorsList,
        jsonOutput,
        jsonStatus,
        jsonEmpty,
        copyCommandButton,
        exportPdfButton,
        downloadCsvButton,
        copyJsonButton,
        downloadJsonButton,
        importJsonButton,
        importJsonInput
    ];

    if (requiredElements.some(function (element) {
        return !element;
    })) {
        return;
    }

    // ns:start family._base.workspace.00_shell
    let currentPayload = null;
    let hasGenerated = false;

    function trim(value) {
        return String(value || '').trim();
    }

    function setValue(element, value) {
        if (!element.options || !element.options.length) {
            element.value = value;
            element.dispatchEvent(new Event('change', {
                bubbles: true
            }));
            return;
        }

        if (Array.from(element.options || []).some(function (option) {
            return option.value === value;
        })) {
            element.value = value;
            element.dispatchEvent(new Event('change', {
                bubbles: true
            }));
        }
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

function formatDateTime(dateValue) {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue || Date.now());
    const normalized = Number.isNaN(date.getTime()) ? new Date() : date;

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(normalized);
}

    // ns:start family._base.workspace.01_input-brief
    function parseTarget(value) {
        const target = trim(value);
        const portMatch = target.match(/^(\d{1,5})(?:\/(tcp|udp))?$/i);

        if (portMatch) {
            return {
                raw: target,
                port: portMatch[1],
                protocol: (portMatch[2] || '').toLowerCase(),
                address: ''
            };
        }

        return {
            raw: target,
            port: '',
            protocol: '',
            address: target
        };
    }
    // ns:end family._base.workspace.01_input-brief

    // ns:start family._base.workspace.02_basic-settings
    function readDirection() {
        const selected = root.querySelector('input[name="generateUfwCommandSessionMode"]:checked');

        return selected && selected.value === 'out' ? 'out' : 'in';
    }

    function setDirection(value) {
        const nextValue = value === 'out' ? 'out' : 'in';
        const target = root.querySelector('input[name="generateUfwCommandSessionMode"][value="' + nextValue + '"]');

        if (target) {
            target.checked = true;
        }
    }

    function normalizeChoice(value, allowed, fallback) {
        const candidate = trim(value);

        return allowed.includes(candidate) ? candidate : fallback;
    }

    function readState() {
        const target = parseTarget(input.value);
        const selectedProfile = profileDefaults[profile.value] ? profile.value : 'ssh-admin';
        const nextProtocol = target.protocol || normalizeChoice(protocol.value, protocols, 'tcp');
        const destination = trim(destinationAddress.value) || trim(destinationInput.value) || target.address || 'any';
        const source = trim(sourceAddress.value) || trim(sourceInput.value) || 'any';

        return {
            target: target.raw || profileDefaults[selectedProfile].target,
            profile: selectedProfile,
            shellStyle: normalizeChoice(shellStyle.value, shellStyles, 'posix'),
            source: trim(sourceInput.value) || source,
            useSudo: useSudo.checked,
            destination: trim(destinationInput.value) || destination,
            logPackets: logPackets.checked,
            dryRun: dryRun.checked,
            routeRule: routeRule.checked,
            insertRule: insertRule.checked,
            port: trim(port.value) || target.port,
            interfaceName: trim(interfaceName.value),
            attachComment: attachComment.checked,
            action: normalizeChoice(action.value, actions, 'allow'),
            comment: trim(comment.value),
            protocol: nextProtocol,
            direction: readDirection(),
            insertPosition: trim(insertPosition.value),
            sourcePort: trim(sourcePort.value),
            routeOutInterface: trim(routeOutInterface.value),
            sourceAddress: source,
            destinationAddress: destination,
            appProfile: trim(appProfile.value) || target.address,
            appMode: appMode.checked,
            appendExtraOptions: appendExtraOptions.checked,
            extraArgs: trim(extraArgs.value)
        };
    }
    // ns:end family._base.workspace.02_basic-settings

    // ns:start family._base.workspace.03_custom-settings
    function validatePort(value, label, errors) {
        const text = trim(value);

        if (!text) {
            return '';
        }

        const number = Number.parseInt(text, 10);

        if (!Number.isInteger(number) || String(number) !== text || number < 1 || number > 65535) {
            errors.push(label + ' must be an integer from 1 to 65535.');
            return '';
        }

        return String(number);
    }

    function validateInsertPosition(value, errors) {
        const text = trim(value);

        if (!text) {
            errors.push('Insert mode needs an insert position from 1 to 999.');
            return '';
        }

        const number = Number.parseInt(text, 10);

        if (!Number.isInteger(number) || String(number) !== text || number < 1 || number > 999) {
            errors.push('Insert position must be an integer from 1 to 999.');
            return '';
        }

        return String(number);
    }

    function parseExtraOptions(value, enabled, warnings) {
        if (!enabled) {
            return [];
        }

        const tokens = trim(value).split(/\s+/).filter(Boolean);

        return tokens.filter(function (token) {
            const allowed = /^-{1,2}[A-Za-z0-9][A-Za-z0-9-]*(?:=.*)?$/.test(token);

            if (!allowed) {
                warnings.push('Ignored extra option "' + token + '" because it does not look like a CLI option.');
            }

            return allowed;
        });
    }
    // ns:end family._base.workspace.03_custom-settings

    function quoteToken(value) {
        const token = String(value || '');

        if (!token) {
            return "''";
        }

        if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(token)) {
            return token;
        }

        return "'" + token.replace(/'/g, "'\"'\"'") + "'";
    }

    // ns:start family.shell.workspace.04_result-text
    function formatCommand(tokens, style) {
        const command = tokens.map(quoteToken).join(' ');

        if (style === 'bash') {
            return '#!/usr/bin/env bash\nset -euo pipefail\n\n' + tokens.map(quoteToken).join(' \\\n  ');
        }

        if (style === 'review-note') {
            return '# Review generated UFW command before applying it on a host.\n' + command;
        }

        return command;
    }

    function buildModel(state) {
        const errors = [];
        const warnings = [];
        const tokens = [];
        const rulePort = state.appMode ? '' : validatePort(state.port, 'Destination port', errors);
        const ruleSourcePort = state.appMode ? '' : validatePort(state.sourcePort, 'Source port', errors);
        const source = trim(state.sourceAddress) || 'any';
        const destination = trim(state.destinationAddress) || trim(state.destination) || 'any';
        const appProfileValue = trim(state.appProfile);
        const commentValue = trim(state.comment).replace(/\s+/g, ' ');
        const extraOptions = parseExtraOptions(state.extraArgs, state.appendExtraOptions, warnings);
        const insertPositionValue = state.insertRule && !state.appMode ? validateInsertPosition(state.insertPosition, errors) : '';

        if (state.appMode && !appProfileValue) {
            errors.push('Application profile mode needs an application profile name.');
        }

        if (state.action === 'limit' && !rulePort && !state.appMode) {
            warnings.push('Limit rules are most useful when the rule targets a service port or application profile.');
        }

        if (state.action === 'allow' && source === 'any' && destination === 'any' && !rulePort && !state.appMode) {
            warnings.push('This allow rule is broad because it has any source, any destination, and no destination port.');
        }

        if (state.action === 'allow' && source === 'any' && rulePort) {
            warnings.push('Source is any; confirm the service should be reachable from all sources.');
        }

        if (state.dryRun) {
            warnings.push('Dry run is enabled, so the generated command previews UFW parsing without applying changes.');
        }

        if (!state.useSudo) {
            warnings.push('The command omits sudo; run it only from a shell that already has the needed privileges.');
        }

        if (state.appMode && (state.routeRule || state.insertRule || rulePort || source !== 'any' || destination !== 'any')) {
            warnings.push('Application profile mode ignores source, destination, route, insert, and port selectors.');
        }

        if (state.routeRule && state.insertRule && !state.appMode) {
            warnings.push('Route and insert are combined as "ufw route insert <n> ..."; confirm support on the target UFW version before applying.');
        }

        if (state.routeRule && state.direction === 'out') {
            warnings.push('Route mode uses inbound and optional outbound interfaces; the outbound direction radio is ignored.');
        }

        if (!errors.length) {
            if (state.useSudo) {
                tokens.push('sudo');
            }

            tokens.push('ufw');

            if (state.dryRun) {
                tokens.push('--dry-run');
            }

            extraOptions.forEach(function (option) {
                tokens.push(option);
            });

            if (state.appMode) {
                tokens.push(state.action, appProfileValue);

                if (state.attachComment && commentValue) {
                    tokens.push('comment', commentValue);
                }
            } else {
                if (state.routeRule) {
                    tokens.push('route');
                }

                if (state.insertRule) {
                    tokens.push('insert', insertPositionValue);
                }

                tokens.push(state.action);

                if (state.routeRule) {
                    if (state.interfaceName) {
                        tokens.push('in', 'on', state.interfaceName);
                    }

                    if (state.routeOutInterface) {
                        tokens.push('out', 'on', state.routeOutInterface);
                    }
                } else {
                    tokens.push(state.direction);

                    if (state.interfaceName) {
                        tokens.push('on', state.interfaceName);
                    }
                }

                if (state.logPackets) {
                    tokens.push('log');
                }

                if (state.protocol !== 'any') {
                    tokens.push('proto', state.protocol);
                }

                tokens.push('from', source);

                if (ruleSourcePort) {
                    tokens.push('port', ruleSourcePort);
                }

                tokens.push('to', destination);

                if (rulePort) {
                    tokens.push('port', rulePort);
                }

                if (state.attachComment && commentValue) {
                    tokens.push('comment', commentValue);
                }
            }
        }

        const command = errors.length ? '' : formatCommand(tokens, state.shellStyle);
        const mode = state.appMode ? 'application profile' : (state.routeRule ? 'route rule' : 'host rule');
        const optionRows = buildOptionRows(state, {
            source: source,
            destination: destination,
            port: rulePort || 'any',
            sourcePort: ruleSourcePort || 'any',
            appProfile: appProfileValue || 'not set',
            extraOptions: extraOptions.join(' ') || 'none',
            tokenCount: tokens.length
        });
        const summaryRows = [
            row(1, 'Rule target', state.target || '-'),
            row(2, 'Mode', mode),
            row(3, 'Action', state.action),
            row(4, 'Source', state.appMode ? 'profile controlled' : source),
            row(5, 'Destination', state.appMode ? appProfileValue : destination),
            row(6, 'Destination port', state.appMode ? 'profile controlled' : (rulePort || 'any')),
            row(7, 'Protocol', state.protocol),
            row(8, 'Warnings', String(warnings.length))
        ];

        return {
            tool: 'generate-ufw-command',
            version: '1.0.0',
            generatedAt: new Date().toISOString(),
            state: state,
            target: {
                raw: state.target,
                mode: mode,
                source: source,
                destination: destination,
                appProfile: appProfileValue
            },
            command: command,
            tokens: tokens,
            summaryRows: summaryRows,
            optionRows: optionRows,
            warnings: warnings,
            errors: errors
        };
    }
    // ns:end family.shell.workspace.04_result-text

    function row(id, field, value) {
        return {
            id: id,
            field: field,
            value: String(value)
        };
    }

    function buildOptionRows(state, computed) {
        return [
            row(1, 'Sudo', state.useSudo ? 'enabled' : 'omitted'),
            row(2, 'Shell style', state.shellStyle),
            row(3, 'Rule action', state.action),
            row(4, 'Rule direction', state.routeRule ? 'route' : state.direction),
            row(5, 'Interface', state.interfaceName || 'not set'),
            row(6, 'Route out interface', state.routeOutInterface || 'not set'),
            row(7, 'Log packets', state.logPackets ? 'enabled' : 'disabled'),
            row(8, 'Dry run', state.dryRun ? 'enabled' : 'disabled'),
            row(9, 'Insert rule', state.insertRule ? (state.insertPosition || 'missing position') : 'disabled'),
            row(10, 'Source port', computed.sourcePort),
            row(11, 'Application profile', state.appMode ? computed.appProfile : 'disabled'),
            row(12, 'Extra options', computed.extraOptions),
            row(13, 'Command tokens', String(computed.tokenCount))
        ];
    }

    // ns:start family.shell.workspace.04_visual-contract
    function renderResultSummary(payload) {
        const state = payload.state;
        const warningTone = payload.warnings.length > 0 ? 'warning' : 'success';
        const resultTone = payload.errors.length ? 'warning' : 'ready';
        const status = payload.errors.length ? 'Needs input' : 'Generated';
        const updated = formatDateTime(payload.generatedAt);
        const primaryTarget = payload.target.mode || 'Rule preview';
        const primaryStatus = payload.errors.length ? 'Needs Review' : 'Command Generated';
        const primaryStatusTone = payload.errors.length ? 'warning' : 'ready';

        resultSummary.dataset.resultTone = resultTone;
        resultSummary.dataset.resultLayout = 'command';
        resultSummary.innerHTML = `
            <header class="generate-ufw-command-result-header" aria-label="Result summary header">
                <div class="generate-ufw-command-result-header-main">
                    <span class="generate-ufw-command-result-header-icon" aria-hidden="true"><i class="bi bi-shield-lock"></i></span>
                    <div class="generate-ufw-command-result-header-copy">
                        <h2 class="generate-ufw-command-result-header-title">Result Summary</h2>
                        <p>Overview of the generated UFW command result and key metrics</p>
                    </div>
                </div>
                <div class="generate-ufw-command-result-header-meta" aria-label="Result summary status">
                    <span class="generate-ufw-command-result-header-chip generate-ufw-command-result-chip-ready"><span class="generate-ufw-command-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>${escapeHtml(status)}</span></span>
                    <span class="generate-ufw-command-result-header-chip generate-ufw-command-result-chip-updated"><span class="generate-ufw-command-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(updated)}</span></span>
                </div>
            </header>
            <div class="generate-ufw-command-result-hero-grid" aria-live="polite">
                <article class="generate-ufw-command-result-card generate-ufw-command-result-card-primary" data-result-visual="command" aria-label="Primary UFW command result">
                    <div class="generate-ufw-command-result-primary-heading generate-ufw-command-result-visual-copy generate-ufw-command-result-visual-copy-top"><div class="generate-ufw-command-result-kicker">Primary Result</div><h3 class="generate-ufw-command-result-title generate-ufw-command-result-title-center">Rule result</h3></div>
                    <div class="generate-ufw-command-result-primary-visual" id="generateUfwCommandResultVisual" aria-label="Primary UFW command result">
                        <div class="generate-ufw-command-result-command-output"><code class="generate-ufw-command-result-command-value">${escapeHtml(primaryTarget)}</code></div>
                    </div>
                    <div class="generate-ufw-command-result-visual-copy"><p class="generate-ufw-command-result-copy generate-ufw-command-result-copy-center">Compact rule preview for the generated UFW command.</p></div>
                    <span class="generate-ufw-command-result-card-divider" aria-hidden="true"></span>
                    <div class="generate-ufw-command-result-chip-row generate-ufw-command-result-chip-row-center" aria-label="Primary result outcome"><span class="generate-ufw-command-result-chip generate-ufw-command-result-chip-outcome generate-ufw-command-result-chip-${primaryStatusTone}"><span class="generate-ufw-command-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>${escapeHtml(primaryStatus)}</span></span></div>
                </article>
                <article class="generate-ufw-command-result-card generate-ufw-command-result-card-summary" aria-label="Command summary">
                    <div class="generate-ufw-command-result-summary-intro"><span class="generate-ufw-command-result-card-icon generate-ufw-command-result-card-icon-summary" aria-hidden="true"><i class="bi bi-shield-check"></i></span><div class="generate-ufw-command-result-summary-copy"><div class="generate-ufw-command-result-kicker">Descriptive Summary</div><h3 class="generate-ufw-command-result-title">UFW command preview</h3><p class="generate-ufw-command-result-copy">Rule controls, option rows, warning rows, and JSON output are generated locally from the visible UFW controls.</p></div></div>
                    <span class="generate-ufw-command-result-card-divider" aria-hidden="true"></span>
                    <div class="generate-ufw-command-result-chip-grid" aria-label="Command state">
                        <span class="generate-ufw-command-result-chip generate-ufw-command-result-chip-baseline"><span class="generate-ufw-command-result-chip-icon" aria-hidden="true"><i class="bi bi-shield"></i></span><span>${escapeHtml(state.action)}</span></span>
                        <span class="generate-ufw-command-result-chip generate-ufw-command-result-chip-ready"><span class="generate-ufw-command-result-chip-icon" aria-hidden="true"><i class="bi bi-ethernet"></i></span><span>${escapeHtml(state.protocol)}</span></span>
                        <span class="generate-ufw-command-result-chip generate-ufw-command-result-chip-${warningTone}"><span class="generate-ufw-command-result-chip-icon" aria-hidden="true"><i class="bi bi-exclamation-triangle"></i></span><span>${escapeHtml(`${payload.warnings.length} warning${payload.warnings.length === 1 ? '' : 's'}`)}</span></span>
                        <span class="generate-ufw-command-result-chip generate-ufw-command-result-chip-baseline"><span class="generate-ufw-command-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>${escapeHtml(state.shellStyle)} shell</span></span>
                    </div>
                </article>
            </div>
            <div class="generate-ufw-command-result-metric-grid" aria-label="Command metrics">
                ${renderMetric('Source', payload.target.source || '-', 'Rule source', 'success', 'bi-hdd-network')}
                ${renderMetric('Port', state.appMode ? 'profile' : (state.port || 'any'), 'Destination service', 'info', 'bi-ethernet')}
                ${renderMetric('Rows', payload.optionRows.length, 'Generated rows', 'accent-tone', 'bi-list-check')}
                ${renderMetric('Warnings', payload.warnings.length, 'Review notes', 'warning', 'bi-exclamation-triangle')}
            </div>
        `;
    }

    function renderMetric(label, value, copy, tone, icon) {
        return [
            '<article class="generate-ufw-command-result-metric-card generate-ufw-command-result-metric-' + escapeHtml(tone) + '">',
            '<span class="generate-ufw-command-result-metric-icon" aria-hidden="true"><i class="bi ' + escapeHtml(icon) + '"></i></span>',
            '<span class="generate-ufw-command-result-metric-label">' + escapeHtml(label) + '</span>',
            '<strong class="generate-ufw-command-result-metric-value">' + escapeHtml(value) + '</strong>',
            '<span class="generate-ufw-command-result-metric-copy">' + escapeHtml(copy) + '</span>',
            '<span class="generate-ufw-command-result-metric-accent" aria-hidden="true"></span>',
            '</article>'
        ].join('');
    }
    // ns:end family.shell.workspace.04_visual-contract

    function sortRows(rows) {
        const mode = sortInput.value || 'id';
        const sorted = rows.slice();

        sorted.sort(function (left, right) {
            if (mode === 'alphabetical') {
                return String(left.field).localeCompare(String(right.field), undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });
            }

            if (mode === 'field') {
                return String(left.field).localeCompare(String(right.field));
            }

            if (mode === 'value') {
                return String(left.value).localeCompare(String(right.value));
            }

            if (mode === 'length') {
                return String(right.value).length - String(left.value).length;
            }

            return Number(left.id) - Number(right.id);
        });

        return sorted;
    }

    function renderTableRows(rows, body, includeAction) {
        body.innerHTML = sortRows(rows).map(function (item, index) {
            const actionCell = includeAction
                ? '<td class="tool-table-action-cell"><button type="button" class="generate-ufw-command-action-btn generate-ufw-command-row-action" data-row-copy="' + escapeHtml(item.value) + '" aria-label="Copy row value"><i class="bi bi-clipboard" aria-hidden="true"></i></button></td>'
                : '';

            return [
                '<tr>',
                '<td class="text-center">' + String(index + 1) + '</td>',
                '<td>' + escapeHtml(item.field) + '</td>',
                '<td>' + escapeHtml(item.value) + '</td>',
                actionCell,
                '</tr>'
            ].join('');
        }).join('');
    }

    function renderList(list, values, emptyText) {
        list.innerHTML = values.length
            ? values.map(function (item) {
                return '<li>' + escapeHtml(item) + '</li>';
            }).join('')
            : '<li>' + escapeHtml(emptyText) + '</li>';
    }

    // ns:start family._base.workspace.05_result-summary
    function renderPayload(payload) {
        currentPayload = payload;
        hasGenerated = true;
        resultEmpty.classList.add('d-none');
        resultContent.classList.remove('d-none');
        resultError.classList.toggle('d-none', payload.errors.length === 0);
        resultError.textContent = payload.errors.join(' ');
        inputError.classList.toggle('d-none', payload.errors.length === 0);
        inputError.textContent = payload.errors[0] || '';
        commandOutput.textContent = payload.command || 'Resolve input errors before copying the command.';
        jsonEmpty.classList.add('is-hidden');
        renderResultSummary(payload);
        renderTableRows(payload.summaryRows, summaryTableBody, false);
        renderTableRows(payload.optionRows, operationsTableBody, true);
        renderList(warningsList, payload.warnings, 'No warnings for the current command preview.');
        renderList(errorsList, payload.errors, 'No input errors.');
        jsonOutput.textContent = JSON.stringify(payload, null, 2);
    }
    // ns:end family._base.workspace.05_result-summary

    function generateCommand() {
        const payload = buildModel(readState());

        renderPayload(payload);

        if (!payload.errors.length) {
            syncSafeStateToUrl(payload.state);
        }
    }

    function hideGeneratedOutput() {
        hasGenerated = false;
        currentPayload = null;
        resultEmpty.classList.remove('d-none');
        resultContent.classList.add('d-none');
        resultError.classList.add('d-none');
        inputError.classList.add('d-none');
        inputError.textContent = '';
        jsonOutput.textContent = '';
        jsonEmpty.classList.remove('is-hidden');
    }

    function applyProfileDefaults() {
        const defaults = profileDefaults[profile.value] || profileDefaults['ssh-admin'];

        applyStateToControls(defaults);

        if (hasGenerated) {
            generateCommand();
        }
    }

    function resetForm() {
        profile.value = 'ssh-admin';
        applyStateToControls(profileDefaults['ssh-admin']);
        hideGeneratedOutput();
        clearSafeStateFromUrl();
    }

    function buildCsvRows(payload) {
        const rows = [['Section', 'Field', 'Value']];

        payload.summaryRows.forEach(function (item) {
            rows.push(['Summary', item.field, item.value]);
        });
        payload.optionRows.forEach(function (item) {
            rows.push(['Option', item.field, item.value]);
        });
        payload.warnings.forEach(function (warning) {
            rows.push(['Warning', 'Review', warning]);
        });
        payload.errors.forEach(function (error) {
            rows.push(['Error', 'Input', error]);
        });

        return rows.map(function (csvRow) {
            return csvRow.map(function (cell) {
                return '"' + String(cell).replace(/"/g, '""') + '"';
            }).join(',');
        }).join('\n');
    }

    function downloadFile(name, content, type) {
        const blob = new Blob([content], {
            type: type
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            const didWrite = await navigator.clipboard.writeText(text).then(function () {
                return true;
            }).catch(function () {
                return false;
            });

            if (didWrite) {
                return;
            }
        }

        const area = document.createElement('textarea');

        area.value = text;
        area.setAttribute('readonly', 'readonly');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();

        document.execCommand('copy');

        document.body.removeChild(area);
    }

    function flashRowActionButton(button, isCopied) {
        const icon = button.querySelector('i');
        const originalIcon = button.dataset.defaultIcon || (icon ? icon.className : '');

        if (icon && !button.dataset.defaultIcon) {
            button.dataset.defaultIcon = originalIcon;
        }

        button.classList.toggle('copied', isCopied);
        button.classList.toggle('is-copied', isCopied);
        button.classList.toggle('failed', !isCopied);
        if (icon) {
            icon.className = isCopied ? 'bi bi-check2' : 'bi bi-x-lg';
        }

        window.setTimeout(function () {
            button.classList.remove('copied', 'is-copied', 'failed');
            if (icon && button.dataset.defaultIcon) {
                icon.className = button.dataset.defaultIcon;
            }
        }, 1400);
    }

    function flashMarkdownCopyButton(button, label) {
        const labelNode = button.querySelector('span') || button;
        const original = labelNode.dataset.originalLabel || labelNode.textContent;

        labelNode.dataset.originalLabel = original;
        labelNode.textContent = label;
        button.classList.add('copied');
        button.dataset.state = 'copied';

        window.setTimeout(function () {
            labelNode.textContent = original;
            button.classList.remove('copied');
            button.removeAttribute('data-state');
        }, 1400);
    }

    function initMarkdownCopyButtons() {
        const commandBlocks = Array.from(document.querySelectorAll('.markdown-content pre.generate-ufw-command-command-pre'));
        const commandCopyButtons = Array.from(document.querySelectorAll('.generate-ufw-command-command-copy-btn'));

        commandCopyButtons.forEach(function (button) {
            const commandIndex = Number.parseInt(button.dataset.commandCopyIndex || '', 10);
            const commandBlock = Number.isFinite(commandIndex) ? commandBlocks[commandIndex] : null;
            const code = commandBlock ? commandBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            button.dataset.defaultLabel = 'Copy';
            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                copyText(code.textContent.trim());
                flashMarkdownCopyButton(button, 'Copied');
            });
        });
    }

    function getExportPayload() {
        if (!currentPayload) {
            const payload = buildModel(readState());

            renderPayload(payload);
            return payload;
        }

        return currentPayload;
    }

    function applyStateToControls(state) {
        if (!state || typeof state !== 'object') {
            throw new Error('Imported JSON does not include a UFW state object.');
        }

        input.value = trim(state.target) || input.value;
        setValue(profile, profileDefaults[state.profile] ? state.profile : 'ssh-admin');
        setValue(shellStyle, normalizeChoice(state.shellStyle, shellStyles, 'posix'));
        sourceInput.value = trim(state.source) || trim(state.sourceAddress) || 'any';
        useSudo.checked = state.useSudo !== false;
        destinationInput.value = trim(state.destination) || trim(state.destinationAddress) || 'any';
        logPackets.checked = Boolean(state.logPackets);
        dryRun.checked = Boolean(state.dryRun);
        routeRule.checked = Boolean(state.routeRule);
        insertRule.checked = Boolean(state.insertRule);
        port.value = trim(state.port);
        interfaceName.value = trim(state.interfaceName);
        attachComment.checked = state.attachComment !== false;
        setValue(action, normalizeChoice(state.action, actions, 'allow'));
        comment.value = trim(state.comment);
        setValue(protocol, normalizeChoice(state.protocol, protocols, 'tcp'));
        setDirection(state.direction);
        insertPosition.value = trim(state.insertPosition);
        sourcePort.value = trim(state.sourcePort);
        routeOutInterface.value = trim(state.routeOutInterface);
        sourceAddress.value = trim(state.sourceAddress) || trim(state.source) || 'any';
        destinationAddress.value = trim(state.destinationAddress) || trim(state.destination) || 'any';
        appProfile.value = trim(state.appProfile) || 'OpenSSH';
        appMode.checked = Boolean(state.appMode);
        appendExtraOptions.checked = Boolean(state.appendExtraOptions);
        extraArgs.value = trim(state.extraArgs);
    }

    function buildImportedPayloadState(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('Imported JSON does not include a UFW state object.');
        }

        const state = payload.state && typeof payload.state === 'object' && !Array.isArray(payload.state)
            ? payload.state
            : payload;

        if (!state || typeof state !== 'object' || Array.isArray(state)) {
            throw new Error('Imported JSON does not include a UFW state object.');
        }

        return state;
    }

    function setJsonStatus(message) {
        jsonStatus.textContent = message;
        jsonStatus.classList.remove('is-hidden');
        window.setTimeout(function () {
            jsonStatus.classList.add('is-hidden');
        }, 2800);
    }

    function encodeState(state) {
        return window.btoa(unescape(encodeURIComponent(JSON.stringify(state))));
    }

    function decodeState(value) {
        return JSON.parse(decodeURIComponent(escape(window.atob(value))));
    }

    function syncSafeStateToUrl(state) {
        if (!window.history || !window.URLSearchParams) {
            return;
        }

        const url = new URL(window.location.href);

        url.searchParams.set(routeParam, encodeState(state));
        window.history.replaceState({}, '', url.toString());
    }

    function clearSafeStateFromUrl() {
        if (!window.history || !window.URLSearchParams) {
            return;
        }

        const url = new URL(window.location.href);

        url.searchParams.delete(routeParam);
        window.history.replaceState({}, '', url.toString());
    }

    function restoreSafeStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get(routeParam);

        if (!encoded) {
            hideGeneratedOutput();
            return;
        }

        try {
            applyStateToControls(decodeState(encoded));
            renderPayload(buildModel(readState()));
            setJsonStatus('Restored from URL state.');
        } catch (error) {
            hideGeneratedOutput();
        }
    }

    // ns:start family._base.workspace.06_output-toolbar
    function updateSortExpandedState() {
        const summaryElement = sortSelect.querySelector('[aria-expanded]');

        if (summaryElement) {
            summaryElement.setAttribute('aria-expanded', sortSelect.open ? 'true' : 'false');
        }
    }

    sortOptionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const value = button.dataset.sortValue || 'id';

            sortInput.value = value;
            sortSummary.textContent = button.textContent.trim();
            sortOptionButtons.forEach(function (option) {
                const active = option === button;

                option.classList.toggle('is-active', active);
                option.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            sortSelect.removeAttribute('open');

            if (currentPayload) {
                renderTableRows(currentPayload.summaryRows, summaryTableBody, false);
                renderTableRows(currentPayload.optionRows, operationsTableBody, true);
            }
        });
    });

    sortSelect.addEventListener('toggle', updateSortExpandedState);

    copyCommandButton.addEventListener('click', function () {
        copyText(getExportPayload().command || '');
    });

    exportPdfButton.addEventListener('click', function () {
        getExportPayload();
        window.print();
    });

    downloadCsvButton.addEventListener('click', function () {
        const payload = getExportPayload();

        downloadFile('generate-ufw-command.csv', buildCsvRows(payload), 'text/csv;charset=utf-8');
    });

    copyJsonButton.addEventListener('click', function () {
        copyText(JSON.stringify(getExportPayload(), null, 2));
    });

    downloadJsonButton.addEventListener('click', function () {
        downloadFile('generate-ufw-command.json', JSON.stringify(getExportPayload(), null, 2), 'application/json;charset=utf-8');
    });

    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });
    // ns:end family._base.workspace.06_output-toolbar

    // ns:start family._base.workspace.08_json-restore
    importJsonInput.addEventListener('change', function () {
        const file = importJsonInput.files && importJsonInput.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.addEventListener('load', function () {
            try {
                const payload = JSON.parse(String(reader.result || '{}'));
                const state = buildImportedPayloadState(payload);

                applyStateToControls(state);
                renderPayload(buildModel(readState()));
                syncSafeStateToUrl(readState());
                setJsonStatus('Imported JSON state.');
            } catch (error) {
                resultError.textContent = error.message;
                resultError.classList.remove('d-none');
            } finally {
                importJsonInput.value = '';
            }
        });
        reader.readAsText(file);
    });
    // ns:end family._base.workspace.08_json-restore

    // ns:start family._base.workspace.07_table-output
    function activateTab(button) {
        const targetId = button.dataset.tabTarget;

        tabButtons.forEach(function (tab) {
            const active = tab === button;

            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
            tab.setAttribute('tabindex', active ? '0' : '-1');
        });

        tabPanels.forEach(function (panel) {
            const active = panel.id === targetId;

            panel.classList.toggle('active', active);
            panel.hidden = !active;
        });
    }

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activateTab(button);
        });
    });

    operationsTableBody.addEventListener('click', function (event) {
        const button = event.target.closest('[data-row-copy]');

        if (button) {
            copyText(button.dataset.rowCopy || '').then(function () {
                flashRowActionButton(button, true);
            }).catch(function () {
                flashRowActionButton(button, false);
            });
        }
    });
    // ns:end family._base.workspace.07_table-output

    document.addEventListener('click', function (event) {
        if (!sortSelect.contains(event.target)) {
            sortSelect.removeAttribute('open');
        }
    });

    Array.from(form.elements).forEach(function (element) {
        element.addEventListener('input', function () {
            if (hasGenerated) {
                generateCommand();
            }
        });
        element.addEventListener('change', function () {
            if (hasGenerated) {
                generateCommand();
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateCommand();
    });

    primaryAction.addEventListener('click', function () {
        generateCommand();
    });

    resetAction.addEventListener('click', resetForm);
    applyPreset.addEventListener('click', applyProfileDefaults);

    applyStateToControls(profileDefaults['ssh-admin']);
    initMarkdownCopyButtons();
    restoreSafeStateFromUrl();
    // ns:end family._base.workspace.00_shell
}());
