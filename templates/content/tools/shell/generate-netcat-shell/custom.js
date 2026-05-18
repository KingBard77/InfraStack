// custom.js

document.addEventListener('DOMContentLoaded', function () {
// ns:start family.shell.workspace.01_input-target
    const form = document.getElementById('generateNetcatShellForm');
    const submitButton = document.getElementById('generateNetcatShellSubmit');
    const resetButton = document.getElementById('generateNetcatShellReset');
    const primaryHostInput = document.getElementById('generateNetcatShellPrimaryHost');
    const primaryHostLabel = document.getElementById('generateNetcatShellPrimaryHostLabel');
// ns:end family.shell.workspace.01_input-target
// ns:start family.shell.workspace.02_basic-setting
    const presetInput = document.getElementById('generateNetcatShellPreset');
    const applyPresetButton = document.getElementById('generateNetcatShellApplyPreset');
    const shellInput = document.getElementById('generateNetcatShellShell');
    const implementationInput = document.getElementById('generateNetcatShellImplementation');
    const flagStyleInput = document.getElementById('generateNetcatShellFlagStyle');
    const capabilityHint = document.getElementById('generateNetcatShellCapabilityHint');
    const customBinaryInput = document.getElementById('generateNetcatShellCustomBinary');
    const combineShortFlagsInput = document.getElementById('generateNetcatShellCombineShortFlags');
    const multilineInput = document.getElementById('generateNetcatShellMultiline');
    const shellHint = document.getElementById('generateNetcatShellShellHint');
// ns:end family.shell.workspace.02_basic-setting
// ns:start family.shell.workspace.03_advanced-setting
    const connectionTypeInput = document.getElementById('generateNetcatShellConnectionType');
    const useUdpInput = document.getElementById('generateNetcatShellUseUdp');
    const forceIpv6Input = document.getElementById('generateNetcatShellForceIpv6');
    const targetPortInput = document.getElementById('generateNetcatShellTargetPort');
    const listenPortInput = document.getElementById('generateNetcatShellListenPort');
    const startPortInput = document.getElementById('generateNetcatShellStartPort');
    const endPortInput = document.getElementById('generateNetcatShellEndPort');
    const targetPortWrap = document.getElementById('generateNetcatShellTargetPortWrap');
    const listenPortWrap = document.getElementById('generateNetcatShellListenPortWrap');
    const startPortWrap = document.getElementById('generateNetcatShellStartPortWrap');
    const endPortWrap = document.getElementById('generateNetcatShellEndPortWrap');
    const modeHint = document.getElementById('generateNetcatShellModeHint');
    const keepListeningInput = document.getElementById('generateNetcatShellKeepListening');
    const verboseInput = document.getElementById('generateNetcatShellVerbose');
    const zeroIoInput = document.getElementById('generateNetcatShellZeroIo');
    const numericOnlyInput = document.getElementById('generateNetcatShellNumericOnly');
    const timeoutInput = document.getElementById('generateNetcatShellTimeout');
    const quitAfterEofInput = document.getElementById('generateNetcatShellQuitAfterEof');
    const sendDelayInput = document.getElementById('generateNetcatShellSendDelay');
    const sourceAddressInput = document.getElementById('generateNetcatShellSourceAddress');
    const sourcePortInput = document.getElementById('generateNetcatShellSourcePort');
    const executionModeInput = document.getElementById('generateNetcatShellExecutionMode');
    const commandToRunInput = document.getElementById('generateNetcatShellCommandToRun');
    const commandToRunWrap = document.getElementById('generateNetcatShellCommandToRunWrap');
    const useTlsInput = document.getElementById('generateNetcatShellUseTls');
    const verifyCertInput = document.getElementById('generateNetcatShellVerifyCert');
    const verifyCertWrap = document.getElementById('generateNetcatShellVerifyCertWrap');
    const clientCertPathInput = document.getElementById('generateNetcatShellClientCertPath');
    const clientKeyPathInput = document.getElementById('generateNetcatShellClientKeyPath');
    const tlsCredentialsWrap = document.getElementById('generateNetcatShellTlsCredentialsWrap');
    const proxyTypeInput = document.getElementById('generateNetcatShellProxyType');
    const proxyHostInput = document.getElementById('generateNetcatShellProxyHost');
    const proxyPortInput = document.getElementById('generateNetcatShellProxyPort');
    const proxyAuthInput = document.getElementById('generateNetcatShellProxyAuth');
    const proxyHostWrap = document.getElementById('generateNetcatShellProxyHostWrap');
    const proxyPortWrap = document.getElementById('generateNetcatShellProxyPortWrap');
    const proxyAuthWrap = document.getElementById('generateNetcatShellProxyAuthWrap');
    const idleTimeoutInput = document.getElementById('generateNetcatShellIdleTimeout');
    const maxConnectionsInput = document.getElementById('generateNetcatShellMaxConnections');
    const logOutputInput = document.getElementById('generateNetcatShellLogOutput');
    const receiveOnlyInput = document.getElementById('generateNetcatShellReceiveOnly');
    const sendOnlyInput = document.getElementById('generateNetcatShellSendOnly');
    const shutdownAfterEofInput = document.getElementById('generateNetcatShellShutdownAfterEof');
    const extraFlagsInput = document.getElementById('generateNetcatShellExtraFlags');
// ns:end family.shell.workspace.03_advanced-setting
// ns:start family.shell.workspace.04_result-text
    const resultEmpty = document.getElementById('generateNetcatShellResultEmpty');
    const resultContent = document.getElementById('generateNetcatShellResultContent');
    const resultError = document.getElementById('generateNetcatShellResultError');
// ns:end family.shell.workspace.04_result-text
// ns:start family.shell.workspace.05_score-card
    const resultSummary = document.getElementById('generateNetcatShellResultSummary');
    const commandOutput = document.getElementById('generateNetcatShellCommandOutput');
// ns:end family.shell.workspace.05_score-card
// ns:start family.shell.workspace.07_table
    const optionsTableBody = document.getElementById('generateNetcatShellOptionsTableBody');
    const warningsList = document.getElementById('generateNetcatShellWarningsList');
    const errorsList = document.getElementById('generateNetcatShellErrorsList');
    const jsonOutput = document.getElementById('generateNetcatShellJsonOutput');
// ns:end family.shell.workspace.07_table
// ns:start family.shell.workspace.06_sort-card
    const sortInput = document.getElementById('generateNetcatShellSort');
    const sortSummary = document.getElementById('generateNetcatShellSortSummary');
    const sortOptionButtons = Array.from(document.querySelectorAll('.generate-netcat-shell-sort-option[data-sort-value]'));
    const sortSelect = document.getElementById('generateNetcatShellSortSelect');
    const copyCommandButton = document.getElementById('generateNetcatShellCopyCommand');
    const exportPdfButton = document.getElementById('generateNetcatShellExportPdf');
    const downloadCsvButton = document.getElementById('generateNetcatShellDownloadCsv');
    const copyJsonButton = document.getElementById('generateNetcatShellCopyJson');
    const downloadJsonButton = document.getElementById('generateNetcatShellDownloadJson');
    const importJsonButton = document.getElementById('generateNetcatShellImportJsonButton');
    const importJsonInput = document.getElementById('generateNetcatShellImportJson');
// ns:end family.shell.workspace.06_sort-card
// ns:start family.shell.workspace.07_table
    const tabButtons = Array.from(document.querySelectorAll('.generate-netcat-shell-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.generate-netcat-shell-tab-panel'));
    if (
        !form ||
        !submitButton ||
        !resetButton ||
        !primaryHostInput ||
        !primaryHostLabel ||
        !presetInput ||
        !applyPresetButton ||
        !shellInput ||
        !implementationInput ||
        !flagStyleInput ||
        !capabilityHint ||
        !customBinaryInput ||
        !combineShortFlagsInput ||
        !multilineInput ||
        !shellHint ||
        !connectionTypeInput ||
        !useUdpInput ||
        !forceIpv6Input ||
        !targetPortInput ||
        !listenPortInput ||
        !startPortInput ||
        !endPortInput ||
        !targetPortWrap ||
        !listenPortWrap ||
        !startPortWrap ||
        !endPortWrap ||
        !modeHint ||
        !keepListeningInput ||
        !verboseInput ||
        !zeroIoInput ||
        !numericOnlyInput ||
        !timeoutInput ||
        !quitAfterEofInput ||
        !sendDelayInput ||
        !sourceAddressInput ||
        !sourcePortInput ||
        !executionModeInput ||
        !commandToRunInput ||
        !commandToRunWrap ||
        !useTlsInput ||
        !verifyCertInput ||
        !verifyCertWrap ||
        !clientCertPathInput ||
        !clientKeyPathInput ||
        !tlsCredentialsWrap ||
        !proxyTypeInput ||
        !proxyHostInput ||
        !proxyPortInput ||
        !proxyAuthInput ||
        !proxyHostWrap ||
        !proxyPortWrap ||
        !proxyAuthWrap ||
        !idleTimeoutInput ||
        !maxConnectionsInput ||
        !logOutputInput ||
        !receiveOnlyInput ||
        !sendOnlyInput ||
        !shutdownAfterEofInput ||
        !extraFlagsInput ||
        !resultEmpty ||
        !resultContent ||
        !resultError ||
        !resultSummary ||
        !commandOutput ||
        !optionsTableBody ||
        !warningsList ||
        !errorsList ||
        !jsonOutput ||
        !sortInput ||
        !sortSummary ||
        !sortSelect ||
        sortOptionButtons.length === 0 ||
        !copyCommandButton ||
        !exportPdfButton ||
        !downloadCsvButton ||
        !copyJsonButton ||
        !downloadJsonButton ||
        !importJsonButton ||
        !importJsonInput ||
        tabButtons.length === 0 ||
        tabPanels.length === 0
    ) {
        return;
    }
// ns:end family.shell.workspace.07_table
// ns:start family.shell.workspace.02_basic-setting
    const shellCatalog = {
        bash: {
            label: 'Bash / Zsh',
            joiner: ' \\',
            lineIndent: '  '
        },
        powershell: {
            label: 'PowerShell',
            joiner: ' `',
            lineIndent: '  '
        },
        cmd: {
            label: 'Windows CMD',
            joiner: ' ^',
            lineIndent: '  '
        }
    };
    const implementationCatalog = {
        openbsd: {
            label: 'OpenBSD nc',
            binary: 'nc',
            supports: {
                keepListening: true,
                quitAfterEof: false,
                sendDelay: true,
                execution: false,
                tls: false,
                verifyCert: false,
                clientCredentials: false,
                idleTimeout: false,
                maxConnections: false,
                proxy: 'legacy',
                proxyAuth: true,
                logOutput: false,
                receiveOnly: false,
                sendOnly: false,
                shutdownAfterEof: true
            }
        },
        traditional: {
            label: 'Traditional netcat',
            binary: 'netcat',
            supports: {
                keepListening: false,
                quitAfterEof: true,
                sendDelay: true,
                execution: true,
                tls: false,
                verifyCert: false,
                clientCredentials: false,
                idleTimeout: false,
                maxConnections: false,
                proxy: 'legacy',
                proxyAuth: false,
                logOutput: true,
                receiveOnly: false,
                sendOnly: false,
                shutdownAfterEof: false
            }
        },
        busybox: {
            label: 'BusyBox nc',
            binary: 'nc',
            supports: {
                keepListening: false,
                quitAfterEof: false,
                sendDelay: true,
                execution: true,
                tls: false,
                verifyCert: false,
                clientCredentials: false,
                idleTimeout: false,
                maxConnections: false,
                proxy: false,
                proxyAuth: false,
                logOutput: true,
                receiveOnly: false,
                sendOnly: false,
                shutdownAfterEof: false
            }
        },
        ncat: {
            label: 'Nmap ncat',
            binary: 'ncat',
            supports: {
                keepListening: true,
                quitAfterEof: false,
                sendDelay: false,
                execution: true,
                tls: true,
                verifyCert: true,
                clientCredentials: true,
                idleTimeout: true,
                maxConnections: true,
                proxy: 'ncat',
                proxyAuth: true,
                logOutput: true,
                receiveOnly: true,
                sendOnly: true,
                shutdownAfterEof: false
            }
        }
    };
    const connectionTypeCatalog = {
        client: {
            label: 'Client'
        },
        listen: {
            label: 'Listen'
        },
        scan: {
            label: 'Scan'
        }
    };
    const proxyTypeCatalog = {
        http: {
            label: 'HTTP CONNECT',
            legacyValue: 'connect',
            ncatValue: 'http'
        },
        socks4: {
            label: 'SOCKS4',
            legacyValue: '4',
            ncatValue: 'socks4'
        },
        socks5: {
            label: 'SOCKS5',
            legacyValue: '5',
            ncatValue: 'socks5'
        }
    };
    const presetCatalog = {
        'tcp-client': {
            primaryHost: 'example.com',
            shell: 'bash',
            implementation: 'openbsd',
            flagStyle: 'mixed',
            combineShortFlags: true,
            multiline: true,
            customBinary: '',
            connectionType: 'client',
            useUdp: false,
            forceIpv6: false,
            targetPort: '443',
            listenPort: '9000',
            startPort: '20',
            endPort: '1024',
            keepListening: false,
            verbose: true,
            zeroIo: false,
            numericOnly: false,
            timeout: '5',
            quitAfterEof: '',
            sendDelay: '',
            sourceAddress: '',
            sourcePort: '',
            executionMode: 'none',
            commandToRun: '',
            useTls: false,
            verifyCert: true,
            clientCertPath: '',
            clientKeyPath: '',
            proxyType: 'none',
            proxyHost: '',
            proxyPort: '',
            proxyAuth: '',
            idleTimeout: '',
            maxConnections: '',
            logOutput: '',
            receiveOnly: false,
            sendOnly: false,
            shutdownAfterEof: false,
            extraFlags: ''
        },
        'udp-check': {
            primaryHost: 'loghost.internal',
            shell: 'bash',
            implementation: 'busybox',
            flagStyle: 'mixed',
            combineShortFlags: true,
            multiline: true,
            customBinary: '',
            connectionType: 'client',
            useUdp: true,
            forceIpv6: false,
            targetPort: '514',
            listenPort: '9000',
            startPort: '20',
            endPort: '1024',
            keepListening: false,
            verbose: false,
            zeroIo: false,
            numericOnly: true,
            timeout: '2',
            quitAfterEof: '',
            sendDelay: '',
            sourceAddress: '',
            sourcePort: '',
            executionMode: 'none',
            commandToRun: '',
            useTls: false,
            verifyCert: true,
            clientCertPath: '',
            clientKeyPath: '',
            proxyType: 'none',
            proxyHost: '',
            proxyPort: '',
            proxyAuth: '',
            idleTimeout: '',
            maxConnections: '',
            logOutput: '',
            receiveOnly: false,
            sendOnly: false,
            shutdownAfterEof: false,
            extraFlags: ''
        },
        'listen-verbose': {
            primaryHost: '0.0.0.0',
            shell: 'bash',
            implementation: 'openbsd',
            flagStyle: 'mixed',
            combineShortFlags: true,
            multiline: true,
            customBinary: '',
            connectionType: 'listen',
            useUdp: false,
            forceIpv6: false,
            targetPort: '443',
            listenPort: '9000',
            startPort: '20',
            endPort: '1024',
            keepListening: true,
            verbose: true,
            zeroIo: false,
            numericOnly: false,
            timeout: '15',
            quitAfterEof: '',
            sendDelay: '',
            sourceAddress: '',
            sourcePort: '',
            executionMode: 'none',
            commandToRun: '',
            useTls: false,
            verifyCert: true,
            clientCertPath: '',
            clientKeyPath: '',
            proxyType: 'none',
            proxyHost: '',
            proxyPort: '',
            proxyAuth: '',
            idleTimeout: '',
            maxConnections: '',
            logOutput: '',
            receiveOnly: false,
            sendOnly: false,
            shutdownAfterEof: true,
            extraFlags: ''
        },
        'port-scan': {
            primaryHost: 'example.com',
            shell: 'bash',
            implementation: 'openbsd',
            flagStyle: 'mixed',
            combineShortFlags: true,
            multiline: true,
            customBinary: '',
            connectionType: 'scan',
            useUdp: false,
            forceIpv6: false,
            targetPort: '443',
            listenPort: '9000',
            startPort: '20',
            endPort: '1024',
            keepListening: false,
            verbose: true,
            zeroIo: true,
            numericOnly: true,
            timeout: '3',
            quitAfterEof: '',
            sendDelay: '',
            sourceAddress: '',
            sourcePort: '',
            executionMode: 'none',
            commandToRun: '',
            useTls: false,
            verifyCert: true,
            clientCertPath: '',
            clientKeyPath: '',
            proxyType: 'none',
            proxyHost: '',
            proxyPort: '',
            proxyAuth: '',
            idleTimeout: '',
            maxConnections: '',
            logOutput: '',
            receiveOnly: false,
            sendOnly: false,
            shutdownAfterEof: false,
            extraFlags: ''
        },
        'tls-listener': {
            primaryHost: '0.0.0.0',
            shell: 'bash',
            implementation: 'ncat',
            flagStyle: 'mixed',
            combineShortFlags: true,
            multiline: true,
            customBinary: '',
            connectionType: 'listen',
            useUdp: false,
            forceIpv6: false,
            targetPort: '443',
            listenPort: '8443',
            startPort: '20',
            endPort: '1024',
            keepListening: true,
            verbose: true,
            zeroIo: false,
            numericOnly: false,
            timeout: '30',
            quitAfterEof: '',
            sendDelay: '',
            sourceAddress: '',
            sourcePort: '',
            executionMode: 'none',
            commandToRun: '',
            useTls: true,
            verifyCert: true,
            clientCertPath: '/etc/ssl/certs/service.crt',
            clientKeyPath: '/etc/ssl/private/service.key',
            proxyType: 'none',
            proxyHost: '',
            proxyPort: '',
            proxyAuth: '',
            idleTimeout: '60',
            maxConnections: '25',
            logOutput: '',
            receiveOnly: false,
            sendOnly: false,
            shutdownAfterEof: false,
            extraFlags: ''
        },
        'proxy-tunnel': {
            primaryHost: 'example.com',
            shell: 'bash',
            implementation: 'ncat',
            flagStyle: 'mixed',
            combineShortFlags: true,
            multiline: true,
            customBinary: '',
            connectionType: 'client',
            useUdp: false,
            forceIpv6: false,
            targetPort: '443',
            listenPort: '9000',
            startPort: '20',
            endPort: '1024',
            keepListening: false,
            verbose: true,
            zeroIo: false,
            numericOnly: false,
            timeout: '10',
            quitAfterEof: '',
            sendDelay: '',
            sourceAddress: '',
            sourcePort: '',
            executionMode: 'none',
            commandToRun: '',
            useTls: false,
            verifyCert: true,
            clientCertPath: '',
            clientKeyPath: '',
            proxyType: 'http',
            proxyHost: 'proxy.local',
            proxyPort: '3128',
            proxyAuth: '',
            idleTimeout: '',
            maxConnections: '',
            logOutput: '',
            receiveOnly: false,
            sendOnly: false,
            shutdownAfterEof: false,
            extraFlags: ''
        },
        custom: null
    };
    const enhancedSelects = [];
    let latestResult = null;
// ns:end family.shell.workspace.02_basic-setting
// ns:start family.shell.workspace.07_table
    function initMarkdownCopyButtons() {
        const codeBlocks = document.querySelectorAll('.markdown-content pre');

        codeBlocks.forEach((pre) => {
            const commandNote = pre.nextElementSibling;
            const commandSummary = commandNote && commandNote.classList.contains('generate-netcat-shell-command-note')
                ? commandNote.querySelector('summary')
                : null;

            if (pre.querySelector('.markdown-copy-btn') || (commandSummary && commandSummary.querySelector('.generate-netcat-shell-command-copy-btn'))) {
                return;
            }

            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            const button = document.createElement('button');

            button.type = 'button';
            button.innerHTML = '<i class="bi bi-clipboard"></i><span class="generate-netcat-shell-command-copy-label">Copy</span>';

            button.addEventListener('click', async function () {
                try {
                    await navigator.clipboard.writeText(code.textContent.trim());
                    flashButton(button, 'Copied');
                } catch (error) {
                    flashButton(button, 'Failed');
                }
            });

            if (commandSummary) {
                const labelGroup = document.createElement('span');

                labelGroup.className = 'generate-netcat-shell-command-note-summary-labels';

                while (commandSummary.firstChild) {
                    labelGroup.appendChild(commandSummary.firstChild);
                }

                button.className = 'generate-netcat-shell-command-copy-btn';
                button.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                commandSummary.appendChild(labelGroup);
                commandSummary.appendChild(button);
                pre.classList.add('generate-netcat-shell-command-pre');

                return;
            }

            button.className = 'markdown-copy-btn';
            button.querySelector('.generate-netcat-shell-command-copy-label').textContent = 'Copy';
            pre.appendChild(button);
        });
    }

    function flashButton(button, text) {
        const label = button.querySelector('[data-button-label]') || button.querySelector('.generate-netcat-shell-command-copy-label');

        if (!label && button.classList.contains('generate-netcat-shell-row-copy')) {
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

    function escapeJsonHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
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
        jsonOutput.innerHTML = highlightJsonText(JSON.stringify(payload, null, 2));
    }
// ns:end family.shell.workspace.07_table
// ns:start family.shell.workspace.02_basic-setting
    function closeEnhancedSelects(exceptSelect) {
        enhancedSelects.forEach((entry) => {
            if (exceptSelect && entry.select === exceptSelect) {
                return;
            }

            entry.wrapper.classList.remove('is-open');
            entry.toggle.setAttribute('aria-expanded', 'false');
        });
    }

    function syncEnhancedSelect(entry) {
        const selectedOption = entry.select.options[entry.select.selectedIndex] || entry.select.options[0];

        entry.toggle.textContent = selectedOption ? selectedOption.textContent : '';
        entry.wrapper.classList.toggle('is-disabled', Boolean(entry.select.disabled));

        entry.optionButtons.forEach((button) => {
            button.classList.toggle('is-active', button.dataset.value === entry.select.value);
        });
    }

    function syncAllEnhancedSelects() {
        enhancedSelects.forEach((entry) => {
            syncEnhancedSelect(entry);
        });
    }

    function enhanceNativeSelect(select) {
        if (!select || select.dataset.generateNetcatShellEnhanced === '1') {
            return;
        }

        const wrapper = document.createElement('div');
        const toggle = document.createElement('button');
        const menu = document.createElement('div');
        const optionButtons = [];

        select.dataset.generateNetcatShellEnhanced = '1';
        select.classList.add('generate-netcat-shell-native-select');
        wrapper.className = 'generate-netcat-shell-enhanced-select';
        toggle.type = 'button';
        toggle.className = 'generate-netcat-shell-enhanced-select-toggle';
        toggle.setAttribute('aria-haspopup', 'listbox');
        toggle.setAttribute('aria-expanded', 'false');
        menu.className = 'generate-netcat-shell-enhanced-select-menu';
        menu.setAttribute('role', 'listbox');

        Array.from(select.options).forEach((option) => {
            const optionButton = document.createElement('button');

            optionButton.type = 'button';
            optionButton.className = 'generate-netcat-shell-enhanced-select-option';
            optionButton.dataset.value = option.value;
            optionButton.textContent = option.textContent;
            optionButton.disabled = option.disabled;
            optionButton.setAttribute('role', 'option');

            optionButton.addEventListener('click', function () {
                if (select.disabled || option.disabled) {
                    return;
                }

                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                select.dispatchEvent(new Event('input', { bubbles: true }));
                closeEnhancedSelects();
            });

            menu.appendChild(optionButton);
            optionButtons.push(optionButton);
        });

        toggle.addEventListener('click', function () {
            if (select.disabled) {
                return;
            }

            const isOpen = wrapper.classList.contains('is-open');

            closeEnhancedSelects(select);
            wrapper.classList.toggle('is-open', !isOpen);
            toggle.setAttribute('aria-expanded', String(!isOpen));
        });

        wrapper.appendChild(toggle);
        wrapper.appendChild(menu);
        select.insertAdjacentElement('afterend', wrapper);

        const entry = {
            select,
            wrapper,
            toggle,
            menu,
            optionButtons
        };

        select.addEventListener('change', function () {
            syncEnhancedSelect(entry);
        });

        select.addEventListener('input', function () {
            syncEnhancedSelect(entry);
        });

        enhancedSelects.push(entry);
        syncEnhancedSelect(entry);
    }
// ns:end family.shell.workspace.02_basic-setting
// ns:start family.shell.workspace.03_advanced-setting
    function parseCommandString(command) {
        const normalizedCommand = String(command || '')
            .replace(/\\\r?\n/g, ' ')
            .replace(/`\r?\n/g, ' ')
            .replace(/\^\r?\n/g, ' ')
            .trim();
        const tokens = [];
        let currentToken = '';
        let quote = '';
        let escapeNext = false;

        for (let index = 0; index < normalizedCommand.length; index += 1) {
            const character = normalizedCommand[index];

            if (escapeNext) {
                currentToken += character;
                escapeNext = false;
                continue;
            }

            if (quote) {
                if (quote === character) {
                    quote = '';
                    continue;
                }

                if (character === '\\' && quote === '"') {
                    escapeNext = true;
                    continue;
                }

                currentToken += character;
                continue;
            }

            if (character === '\\') {
                escapeNext = true;
                continue;
            }

            if (character === '"' || character === "'" || character === '`') {
                quote = character;
                continue;
            }

            if (/\s/.test(character)) {
                if (currentToken) {
                    tokens.push(currentToken);
                    currentToken = '';
                }

                continue;
            }

            currentToken += character;
        }

        if (currentToken) {
            tokens.push(currentToken);
        }

        return tokens;
    }

    function quoteValue(value, shell) {
        const stringValue = String(value);

        if (shell === 'powershell') {
            return `'${stringValue.replaceAll("'", "''")}'`;
        }

        if (shell === 'cmd') {
            return `"${stringValue.replaceAll('"', '""')}"`;
        }

        return `'${stringValue.replaceAll("'", "'\"'\"'")}'`;
    }

    function formatValue(value, shell) {
        const stringValue = String(value || '').trim();

        if (!stringValue) {
            return '';
        }

        if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(stringValue)) {
            return stringValue;
        }

        return quoteValue(stringValue, shell);
    }

    function buildCommandFromTokens(tokens, shell, multiline) {
        if (!multiline || shell === 'cmd' || tokens.length <= 2) {
            return tokens.join(' ');
        }

        const shellConfig = shellCatalog[shell] || shellCatalog.bash;
        const firstToken = tokens[0];
        const remainingTokens = tokens.slice(1);

        return [firstToken]
            .concat(remainingTokens.map((token, index) => `${shellConfig.lineIndent}${token}${index === remainingTokens.length - 1 ? '' : shellConfig.joiner}`))
            .join('\n');
    }

    function cleanPort(value) {
        const trimmedValue = String(value || '').trim();

        if (!trimmedValue) {
            return '';
        }

        const numberValue = Number(trimmedValue);

        if (!Number.isInteger(numberValue) || numberValue < 1 || numberValue > 65535) {
            return null;
        }

        return String(numberValue);
    }

    function cleanNonNegativeInteger(value) {
        const trimmedValue = String(value || '').trim();

        if (!trimmedValue) {
            return '';
        }

        const numberValue = Number(trimmedValue);

        if (!Number.isFinite(numberValue) || numberValue < 0 || !Number.isInteger(numberValue)) {
            return null;
        }

        return String(numberValue);
    }

    function cleanNonNegativeNumber(value) {
        const trimmedValue = String(value || '').trim();

        if (!trimmedValue) {
            return '';
        }

        const numberValue = Number(trimmedValue);

        if (!Number.isFinite(numberValue) || numberValue < 0) {
            return null;
        }

        return String(numberValue);
    }

    function normalizeText(value) {
        return String(value || '').trim();
    }

    function normalizeImplementation(value) {
        return implementationCatalog[value] ? value : 'openbsd';
    }

    function normalizeShell(value) {
        return shellCatalog[value] ? value : 'bash';
    }

    function getImplementation() {
        return implementationCatalog[normalizeImplementation(implementationInput.value)];
    }

    function getCapabilityHintText() {
        const implementation = getImplementation();

        if (implementationInput.value === 'ncat') {
            return 'Nmap ncat is active. TLS, listener caps, idle timeouts, stream-direction flags, and richer proxy controls are available in addition to the classic client, listen, and scan switches.';
        }

        if (implementationInput.value === 'traditional') {
            return 'Traditional netcat is active. Execution and quit-after-EOF are available, while TLS, receive-only or send-only flags, and ncat-style listener caps are dropped with warnings.';
        }

        if (implementationInput.value === 'busybox') {
            return 'BusyBox nc is active. It stays compact: connect, listen, UDP, scans, pacing, execution, and hex-dump logging are available, while proxy and TLS helpers are not.';
        }

        return 'OpenBSD nc is active. TLS and execution helpers are dropped with warnings, while listen mode, UDP, scans, proxy routing, and shutdown-after-stdin EOF stay available.';
    }

    function updateShellHint() {
        if (shellInput.value === 'cmd') {
            multilineInput.checked = false;
            multilineInput.disabled = true;
            shellHint.textContent = 'CMD output is forced to a single line because caret continuations age badly in copied runbooks.';
            return;
        }

        multilineInput.disabled = false;
        shellHint.textContent = shellInput.value === 'powershell'
            ? 'PowerShell uses backticks for multi-line output. The builder keeps quoting aligned so long ncat commands do not turn into a punctuation quiz.'
            : 'Bash and Zsh use backslash continuations. Multi-line output keeps long netcat commands readable without changing the underlying token order.';
    }

    function updateConnectionState() {
        const connectionType = connectionTypeInput.value;

        primaryHostLabel.textContent = connectionType === 'listen' ? 'Bind address:' : 'Target host:';
        primaryHostInput.placeholder = connectionType === 'listen' ? '0.0.0.0' : 'example.com';

        targetPortWrap.classList.toggle('d-none', connectionType !== 'client');
        listenPortWrap.classList.toggle('d-none', connectionType !== 'listen');
        startPortWrap.classList.toggle('d-none', connectionType !== 'scan');
        endPortWrap.classList.toggle('d-none', connectionType !== 'scan');

        if (connectionType === 'scan') {
            zeroIoInput.checked = true;
            zeroIoInput.disabled = true;
            modeHint.textContent = 'Scan mode forces zero-I/O probing and uses a start and end port range. It is built for exposure checks, not for payload exchange.';
        } else if (connectionType === 'listen') {
            zeroIoInput.disabled = false;
            modeHint.textContent = 'Listen mode swaps the remote destination for a local port. Keep-open listeners, connection caps, and TLS only survive when the selected flavour actually supports them.';
        } else {
            zeroIoInput.disabled = false;
            modeHint.textContent = 'Client mode targets one remote host and port. Proxy routing is only meaningful here, while scans and listeners use different socket semantics.';
        }
    }

    function updateExecutionState() {
        const shouldShowCommand = executionModeInput.value !== 'none';

        commandToRunWrap.classList.toggle('d-none', !shouldShowCommand);
    }

    function updateTlsState() {
        const shouldShowVerify = useTlsInput.checked;
        const shouldShowCredentials = useTlsInput.checked;

        verifyCertWrap.classList.toggle('d-none', !shouldShowVerify);
        tlsCredentialsWrap.classList.toggle('d-none', !shouldShowCredentials);
    }

    function updateProxyState() {
        const shouldShowProxy = proxyTypeInput.value !== 'none';

        proxyHostWrap.classList.toggle('d-none', !shouldShowProxy);
        proxyPortWrap.classList.toggle('d-none', !shouldShowProxy);
        proxyAuthWrap.classList.toggle('d-none', !shouldShowProxy);
    }

    function markPresetCustom() {
        if (presetInput.value === 'custom') {
            return;
        }

        presetInput.value = 'custom';
        syncAllEnhancedSelects();
    }

    function getImportedText(query, key, fallback) {
        const value = query[key];

        if (typeof value === 'string' || typeof value === 'number') {
            return String(value);
        }

        return fallback;
    }

    function getImportedBoolean(query, key, fallback) {
        const value = query[key];

        if (typeof value === 'boolean') {
            return value;
        }

        if (value === 'true' || value === '1') {
            return true;
        }

        if (value === 'false' || value === '0') {
            return false;
        }

        return fallback;
    }

    function getSelectOptionValue(select, value, fallback) {
        const stringValue = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
        const hasOption = Array.from(select.options).some((option) => option.value === stringValue);

        return hasOption ? stringValue : fallback;
    }

    function getImportedQuery(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('The selected JSON file does not contain a netcat command payload.');
        }

        const candidate = payload.query && typeof payload.query === 'object' && !Array.isArray(payload.query)
            ? payload.query
            : payload;

        if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
            throw new Error('The selected JSON file does not include a restorable query.');
        }

        return candidate;
    }

    function applyImportedQuery(importedQuery) {
        const defaults = presetCatalog['tcp-client'];

        presetInput.value = getSelectOptionValue(presetInput, importedQuery.preset, 'custom');
        primaryHostInput.value = getImportedText(importedQuery, 'primaryHost', defaults.primaryHost);
        shellInput.value = getSelectOptionValue(shellInput, importedQuery.shell, defaults.shell);
        implementationInput.value = getSelectOptionValue(implementationInput, importedQuery.implementation, defaults.implementation);
        flagStyleInput.value = getSelectOptionValue(flagStyleInput, importedQuery.flagStyle, defaults.flagStyle);
        combineShortFlagsInput.checked = getImportedBoolean(importedQuery, 'combineShortFlags', defaults.combineShortFlags);
        multilineInput.checked = getImportedBoolean(importedQuery, 'multiline', defaults.multiline);
        customBinaryInput.value = getImportedText(importedQuery, 'customBinary', defaults.customBinary);
        connectionTypeInput.value = getSelectOptionValue(connectionTypeInput, importedQuery.connectionType, defaults.connectionType);
        useUdpInput.checked = getImportedBoolean(importedQuery, 'useUdp', defaults.useUdp);
        forceIpv6Input.checked = getImportedBoolean(importedQuery, 'forceIpv6', defaults.forceIpv6);
        targetPortInput.value = getImportedText(importedQuery, 'targetPort', defaults.targetPort);
        listenPortInput.value = getImportedText(importedQuery, 'listenPort', defaults.listenPort);
        startPortInput.value = getImportedText(importedQuery, 'startPort', defaults.startPort);
        endPortInput.value = getImportedText(importedQuery, 'endPort', defaults.endPort);
        keepListeningInput.checked = getImportedBoolean(importedQuery, 'keepListening', defaults.keepListening);
        verboseInput.checked = getImportedBoolean(importedQuery, 'verbose', defaults.verbose);
        zeroIoInput.checked = getImportedBoolean(importedQuery, 'zeroIo', defaults.zeroIo);
        numericOnlyInput.checked = getImportedBoolean(importedQuery, 'numericOnly', defaults.numericOnly);
        timeoutInput.value = getImportedText(importedQuery, 'timeout', defaults.timeout);
        quitAfterEofInput.value = getImportedText(importedQuery, 'quitAfterEof', defaults.quitAfterEof);
        sendDelayInput.value = getImportedText(importedQuery, 'sendDelay', defaults.sendDelay);
        sourceAddressInput.value = getImportedText(importedQuery, 'sourceAddress', defaults.sourceAddress);
        sourcePortInput.value = getImportedText(importedQuery, 'sourcePort', defaults.sourcePort);
        executionModeInput.value = getSelectOptionValue(executionModeInput, importedQuery.executionMode, defaults.executionMode);
        commandToRunInput.value = getImportedText(importedQuery, 'commandToRun', defaults.commandToRun);
        useTlsInput.checked = getImportedBoolean(importedQuery, 'useTls', defaults.useTls);
        verifyCertInput.checked = getImportedBoolean(importedQuery, 'verifyCert', defaults.verifyCert);
        clientCertPathInput.value = getImportedText(importedQuery, 'clientCertPath', defaults.clientCertPath);
        clientKeyPathInput.value = getImportedText(importedQuery, 'clientKeyPath', defaults.clientKeyPath);
        proxyTypeInput.value = getSelectOptionValue(proxyTypeInput, importedQuery.proxyType, defaults.proxyType);
        proxyHostInput.value = getImportedText(importedQuery, 'proxyHost', defaults.proxyHost);
        proxyPortInput.value = getImportedText(importedQuery, 'proxyPort', defaults.proxyPort);
        proxyAuthInput.value = getImportedText(importedQuery, 'proxyAuth', defaults.proxyAuth);
        idleTimeoutInput.value = getImportedText(importedQuery, 'idleTimeout', defaults.idleTimeout);
        maxConnectionsInput.value = getImportedText(importedQuery, 'maxConnections', defaults.maxConnections);
        logOutputInput.value = getImportedText(importedQuery, 'logOutput', defaults.logOutput);
        receiveOnlyInput.checked = getImportedBoolean(importedQuery, 'receiveOnly', defaults.receiveOnly);
        sendOnlyInput.checked = getImportedBoolean(importedQuery, 'sendOnly', defaults.sendOnly);
        shutdownAfterEofInput.checked = getImportedBoolean(importedQuery, 'shutdownAfterEof', defaults.shutdownAfterEof);
        extraFlagsInput.value = getImportedText(importedQuery, 'extraFlags', defaults.extraFlags);

        updateDynamicState();
        syncAllEnhancedSelects();
        generateAndRender();
    }

    function applyPreset(presetKey) {
        if (presetKey === 'custom') {
            syncAllEnhancedSelects();
            return;
        }

        const preset = presetCatalog[presetKey] || presetCatalog['tcp-client'];

        presetInput.value = presetKey;
        primaryHostInput.value = preset.primaryHost;
        shellInput.value = preset.shell;
        implementationInput.value = preset.implementation;
        flagStyleInput.value = preset.flagStyle;
        combineShortFlagsInput.checked = preset.combineShortFlags;
        multilineInput.checked = preset.multiline;
        customBinaryInput.value = preset.customBinary;
        connectionTypeInput.value = preset.connectionType;
        useUdpInput.checked = preset.useUdp;
        forceIpv6Input.checked = preset.forceIpv6;
        targetPortInput.value = preset.targetPort;
        listenPortInput.value = preset.listenPort;
        startPortInput.value = preset.startPort;
        endPortInput.value = preset.endPort;
        keepListeningInput.checked = preset.keepListening;
        verboseInput.checked = preset.verbose;
        zeroIoInput.checked = preset.zeroIo;
        numericOnlyInput.checked = preset.numericOnly;
        timeoutInput.value = preset.timeout;
        quitAfterEofInput.value = preset.quitAfterEof;
        sendDelayInput.value = preset.sendDelay;
        sourceAddressInput.value = preset.sourceAddress;
        sourcePortInput.value = preset.sourcePort;
        executionModeInput.value = preset.executionMode;
        commandToRunInput.value = preset.commandToRun;
        useTlsInput.checked = preset.useTls;
        verifyCertInput.checked = preset.verifyCert;
        clientCertPathInput.value = preset.clientCertPath;
        clientKeyPathInput.value = preset.clientKeyPath;
        proxyTypeInput.value = preset.proxyType;
        proxyHostInput.value = preset.proxyHost;
        proxyPortInput.value = preset.proxyPort;
        proxyAuthInput.value = preset.proxyAuth;
        idleTimeoutInput.value = preset.idleTimeout;
        maxConnectionsInput.value = preset.maxConnections;
        logOutputInput.value = preset.logOutput;
        receiveOnlyInput.checked = preset.receiveOnly;
        sendOnlyInput.checked = preset.sendOnly;
        shutdownAfterEofInput.checked = preset.shutdownAfterEof;
        extraFlagsInput.value = preset.extraFlags;

        updateDynamicState();
        syncAllEnhancedSelects();
    }

    function updateDynamicState() {
        capabilityHint.textContent = getCapabilityHintText();
        updateShellHint();
        updateConnectionState();
        updateExecutionState();
        updateTlsState();
        updateProxyState();
    }

    function buildQuery() {
        return {
            preset: presetInput.value,
            shell: normalizeShell(shellInput.value),
            implementation: normalizeImplementation(implementationInput.value),
            flagStyle: normalizeText(flagStyleInput.value) || 'mixed',
            combineShortFlags: combineShortFlagsInput.checked,
            multiline: shellInput.value === 'cmd' ? false : multilineInput.checked,
            primaryHost: normalizeText(primaryHostInput.value),
            customBinary: normalizeText(customBinaryInput.value),
            connectionType: connectionTypeInput.value,
            useUdp: useUdpInput.checked,
            forceIpv6: forceIpv6Input.checked,
            targetPort: cleanPort(targetPortInput.value),
            listenPort: cleanPort(listenPortInput.value),
            startPort: cleanPort(startPortInput.value),
            endPort: cleanPort(endPortInput.value),
            keepListening: keepListeningInput.checked,
            verbose: verboseInput.checked,
            zeroIo: zeroIoInput.checked,
            numericOnly: numericOnlyInput.checked,
            timeout: cleanNonNegativeInteger(timeoutInput.value),
            quitAfterEof: cleanNonNegativeInteger(quitAfterEofInput.value),
            sendDelay: cleanNonNegativeNumber(sendDelayInput.value),
            sourceAddress: normalizeText(sourceAddressInput.value),
            sourcePort: cleanPort(sourcePortInput.value),
            executionMode: executionModeInput.value,
            commandToRun: normalizeText(commandToRunInput.value),
            useTls: useTlsInput.checked,
            verifyCert: verifyCertInput.checked,
            clientCertPath: normalizeText(clientCertPathInput.value),
            clientKeyPath: normalizeText(clientKeyPathInput.value),
            proxyType: proxyTypeInput.value,
            proxyHost: normalizeText(proxyHostInput.value),
            proxyPort: cleanPort(proxyPortInput.value),
            proxyAuth: normalizeText(proxyAuthInput.value),
            idleTimeout: cleanNonNegativeInteger(idleTimeoutInput.value),
            maxConnections: cleanNonNegativeInteger(maxConnectionsInput.value),
            logOutput: normalizeText(logOutputInput.value),
            receiveOnly: receiveOnlyInput.checked,
            sendOnly: sendOnlyInput.checked,
            shutdownAfterEof: shutdownAfterEofInput.checked,
            extraFlags: normalizeText(extraFlagsInput.value)
        };
    }

    function getScriptExtension(shell) {
        if (shell === 'powershell') {
            return 'ps1';
        }

        if (shell === 'cmd') {
            return 'cmd';
        }

        return 'sh';
    }

    function pushCombinedShortFlags(tokens, shortFlags, query) {
        if (shortFlags.length === 0) {
            return;
        }

        if (query.combineShortFlags && shortFlags.length > 1) {
            tokens.push(`-${shortFlags.join('')}`);
        } else {
            shortFlags.forEach((flag) => {
                tokens.push(`-${flag}`);
            });
        }

        shortFlags.length = 0;
    }

    function addShortFlag(tokens, shortFlags, flag, derived) {
        shortFlags.push(flag);
        derived.flagCount += 1;
    }

    function addShortValue(tokens, shortFlags, flag, value, query, derived) {
        if (value === '') {
            return;
        }

        pushCombinedShortFlags(tokens, shortFlags, query);
        tokens.push(`-${flag}`, formatValue(value, query.shell));
        derived.flagCount += 1;
    }

    function addLongFlag(tokens, shortFlags, flag, query, derived) {
        pushCombinedShortFlags(tokens, shortFlags, query);
        tokens.push(`--${flag}`);
        derived.flagCount += 1;
    }

    function addLongValue(tokens, shortFlags, flag, value, query, derived) {
        if (value === '') {
            return;
        }

        pushCombinedShortFlags(tokens, shortFlags, query);
        tokens.push(`--${flag}`, formatValue(value, query.shell));
        derived.flagCount += 1;
    }

    function addNcatOption(tokens, shortFlags, shortFlag, longFlag, value, query, derived) {
        if (query.flagStyle === 'long' && longFlag) {
            if (value === null) {
                addLongFlag(tokens, shortFlags, longFlag, query, derived);
            } else {
                addLongValue(tokens, shortFlags, longFlag, value, query, derived);
            }

            return;
        }

        if (value === null) {
            addShortFlag(tokens, shortFlags, shortFlag, derived);
        } else {
            addShortValue(tokens, shortFlags, shortFlag, value, query, derived);
        }
    }
    function formatPortSpec(query) {
        if (query.connectionType === 'listen') {
            return query.listenPort || 'n/a';
        }

        if (query.connectionType === 'scan') {
            return query.startPort && query.endPort ? `${query.startPort}-${query.endPort}` : 'n/a';
        }

        return query.targetPort || 'n/a';
    }

    function buildModeSummary(query) {
        const hostValue = query.primaryHost || (query.connectionType === 'listen' ? '0.0.0.0' : 'n/a');
        const portValue = formatPortSpec(query);
        const protocolLabel = query.useUdp ? 'UDP' : 'TCP';

        if (query.connectionType === 'listen') {
            return `Listens on ${hostValue}:${portValue} over ${protocolLabel}.`;
        }

        if (query.connectionType === 'scan') {
            return `Scans ${hostValue} across ports ${portValue} over ${protocolLabel}.`;
        }

        return `Connects to ${hostValue}:${portValue} over ${protocolLabel}.`;
    }

    function buildSummaryRows(result) {
        return [
            ['Implementation', result.implementationLabel],
            ['Binary', result.binaryLabel],
            ['Shell', result.shellLabel],
            ['Connection type', result.modeLabel],
            ['Protocol', result.protocolLabel],
            ['Primary host', result.hostBadge],
            ['Port selection', result.portBadge],
            ['Timeouts', result.timeoutSummary],
            ['Execution', result.executionSummary],
            ['TLS', result.tlsSummary],
            ['Proxy', result.proxySummary],
            ['Extra flags', result.extraFlagsSummary]
        ];
    }

    function buildJsonPayload(result) {
        return {
            generated_at: result.generatedAtIso,
            query: result.query,
            derived: {
                command: result.command,
                implementation_label: result.implementationLabel,
                shell_label: result.shellLabel,
                mode_label: result.modeLabel,
                protocol_label: result.protocolLabel,
                host: result.hostBadge,
                port_spec: result.portBadge,
                summary_line: result.summaryLine,
                flag_count: result.flagCount
            },
            summary_rows: result.summaryRows,
            warnings: result.warnings,
            errors: result.errors
        };
    }

    function buildCsvRows(result, summaryRows) {
        const rows = [['section', 'key', 'value']];
        const summaryItems = Array.isArray(summaryRows) ? summaryRows : result.summaryRows;

        summaryItems.forEach((row) => {
            rows.push(['summary', row[0], row[1]]);
        });

        result.warnings.forEach((warning, index) => {
            rows.push(['warning', String(index + 1), warning]);
        });

        result.errors.forEach((errorMessage, index) => {
            rows.push(['error', String(index + 1), errorMessage]);
        });

        return rows;
    }

    function buildCommand(query) {
        const implementation = implementationCatalog[query.implementation];
        const warnings = [];
        const errors = [];
        const derived = {
            flagCount: 0
        };
        const hostBadge = query.primaryHost || (query.connectionType === 'listen' ? '0.0.0.0' : 'Not set');
        const portBadge = formatPortSpec(query);
        const protocolLabel = query.useUdp ? 'UDP' : 'TCP';
        const modeLabel = connectionTypeCatalog[query.connectionType].label;
        const shellLabel = shellCatalog[query.shell].label;

        if (!query.primaryHost && query.connectionType !== 'listen') {
            errors.push('Target host is required for client and scan mode.');
        }

        if (query.targetPort === null) {
            errors.push('Target port must be between 1 and 65535.');
        }

        if (query.connectionType === 'client' && query.targetPort === '') {
            errors.push('Target port is required for client mode.');
        }

        if (query.listenPort === null) {
            errors.push('Listen port must be between 1 and 65535.');
        }

        if (query.connectionType === 'listen' && query.listenPort === '') {
            errors.push('Listen port is required for listen mode.');
        }

        if (query.startPort === null) {
            errors.push('Start port must be between 1 and 65535.');
        }

        if (query.connectionType === 'scan' && query.startPort === '') {
            errors.push('Start port is required for scan mode.');
        }

        if (query.endPort === null) {
            errors.push('End port must be between 1 and 65535.');
        }

        if (query.connectionType === 'scan' && query.endPort === '') {
            errors.push('End port is required for scan mode.');
        }

        if (query.connectionType === 'scan' && query.startPort && query.endPort && Number(query.endPort) < Number(query.startPort)) {
            errors.push('End port must be greater than or equal to start port.');
        }

        if (query.timeout === null) {
            errors.push('Timeout must be a non-negative integer.');
        }

        if (query.quitAfterEof === null) {
            errors.push('Quit after EOF must be a non-negative integer.');
        }

        if (query.sendDelay === null) {
            errors.push('Send delay must be a non-negative number.');
        }

        if (query.idleTimeout === null) {
            errors.push('Idle timeout must be a non-negative integer.');
        }

        if (query.maxConnections === null) {
            errors.push('Max connections must be a non-negative integer.');
        }

        if (query.receiveOnly && query.sendOnly) {
            errors.push('Receive only and send only cannot both be enabled.');
        }

        if (query.proxyType !== 'none' && !query.proxyHost) {
            errors.push('Proxy host is required when a proxy type is selected.');
        }

        if (query.proxyPort === null) {
            errors.push('Proxy port must be between 1 and 65535.');
        }

        if (query.proxyType !== 'none' && query.proxyPort === '') {
            errors.push('Proxy port is required when a proxy type is selected.');
        }

        if (query.sourcePort === null) {
            errors.push('Source port must be between 1 and 65535.');
        }

        if (query.executionMode !== 'none' && !query.commandToRun) {
            errors.push('Command to run is required when execution mode is enabled.');
        }

        const tokens = query.customBinary ? parseCommandString(query.customBinary) : [implementation.binary];
        const shortFlags = [];
        const extraTokens = query.extraFlags ? parseCommandString(query.extraFlags) : [];

        if (tokens.length === 0) {
            tokens.push(implementation.binary);
        }

        if (query.flagStyle === 'long' && query.implementation !== 'ncat') {
            warnings.push('Long flag style has limited effect outside ncat because classic netcat builds expose mostly short switches.');
        }

        if (query.connectionType === 'scan') {
            if (!query.zeroIo) {
                warnings.push('Scan mode forces zero-I/O probing and adds the equivalent of -z.');
            }

            addShortFlag(tokens, shortFlags, 'z', derived);
        } else if (query.zeroIo) {
            if (query.connectionType === 'listen') {
                warnings.push('Zero-I/O probing is ignored in listen mode.');
            } else {
                addShortFlag(tokens, shortFlags, 'z', derived);
            }
        }

        if (query.connectionType === 'listen') {
            addShortFlag(tokens, shortFlags, 'l', derived);
        }

        if (query.useUdp) {
            addShortFlag(tokens, shortFlags, 'u', derived);
        }

        if (query.forceIpv6) {
            addShortFlag(tokens, shortFlags, '6', derived);
        }

        if (query.keepListening) {
            if (query.connectionType !== 'listen') {
                warnings.push('Keep listening is ignored outside listen mode.');
            } else if (!implementation.supports.keepListening) {
                warnings.push(`${implementation.label} does not support keep-open listeners in this builder, so -k was dropped.`);
            } else {
                addShortFlag(tokens, shortFlags, 'k', derived);
            }
        }

        if (query.verbose) {
            addShortFlag(tokens, shortFlags, 'v', derived);
        }

        if (query.numericOnly) {
            addShortFlag(tokens, shortFlags, 'n', derived);
        }

        if (query.timeout) {
            addShortValue(tokens, shortFlags, 'w', query.timeout, query, derived);
        }

        if (query.quitAfterEof) {
            if (!implementation.supports.quitAfterEof) {
                warnings.push(`${implementation.label} does not support quit-after-EOF timers in this builder, so -q was dropped.`);
            } else {
                addShortValue(tokens, shortFlags, 'q', query.quitAfterEof, query, derived);
            }
        }

        if (query.sendDelay) {
            if (!implementation.supports.sendDelay) {
                warnings.push(`${implementation.label} does not support send delay pacing in this builder, so -i was dropped.`);
            } else {
                addShortValue(tokens, shortFlags, 'i', query.sendDelay, query, derived);
            }
        }

        if (query.sourceAddress) {
            if (query.connectionType === 'listen') {
                warnings.push('Source address is ignored in listen mode because the primary host field already defines the bind address.');
            } else {
                addShortValue(tokens, shortFlags, 's', query.sourceAddress, query, derived);
            }
        }

        if (query.sourcePort) {
            if (query.connectionType === 'listen') {
                warnings.push('Source port is ignored in listen mode because the listen port already owns the local socket.');
            } else {
                addShortValue(tokens, shortFlags, 'p', query.sourcePort, query, derived);
            }
        }

        if (query.executionMode !== 'none') {
            if (query.connectionType === 'scan') {
                warnings.push('Execution mode is ignored in scan mode.');
            } else if (!implementation.supports.execution) {
                warnings.push(`${implementation.label} does not support execution helpers in this builder, so -e was dropped.`);
            } else {
                addShortValue(tokens, shortFlags, 'e', query.commandToRun, query, derived);
            }
        }

        if (query.useTls) {
            if (query.connectionType === 'scan') {
                warnings.push('TLS is ignored in scan mode.');
            } else if (!implementation.supports.tls) {
                warnings.push(`${implementation.label} does not support TLS in this builder, so the TLS request was dropped.`);
            } else {
                addLongFlag(tokens, shortFlags, 'ssl', query, derived);

                if (query.verifyCert) {
                    addLongFlag(tokens, shortFlags, 'ssl-verify', query, derived);
                } else {
                    warnings.push('Certificate verification is disabled. Keep that posture for lab work, not for trust decisions.');
                }

                if (query.clientCertPath) {
                    addLongValue(tokens, shortFlags, 'ssl-cert', query.clientCertPath, query, derived);
                }

                if (query.clientKeyPath) {
                    addLongValue(tokens, shortFlags, 'ssl-key', query.clientKeyPath, query, derived);
                }
            }
        }

        if (query.idleTimeout) {
            if (!implementation.supports.idleTimeout) {
                warnings.push(`${implementation.label} does not support idle timeout controls in this builder, so that value was dropped.`);
            } else {
                addLongValue(tokens, shortFlags, 'idle-timeout', query.idleTimeout, query, derived);
            }
        }

        if (query.maxConnections) {
            if (query.connectionType !== 'listen') {
                warnings.push('Max connections only applies to listen mode.');
            } else if (!implementation.supports.maxConnections) {
                warnings.push(`${implementation.label} does not support listener connection caps in this builder, so max connections was dropped.`);
            } else {
                addLongValue(tokens, shortFlags, 'max-conns', query.maxConnections, query, derived);
            }
        }

        if (query.proxyType !== 'none') {
            if (query.connectionType !== 'client') {
                warnings.push('Proxy settings only apply to outbound client mode.');
            } else if (!implementation.supports.proxy) {
                warnings.push(`${implementation.label} does not support proxy routing in this builder, so proxy settings were dropped.`);
            } else if (implementation.supports.proxy === 'legacy') {
                addShortValue(tokens, shortFlags, 'X', proxyTypeCatalog[query.proxyType].legacyValue, query, derived);
                addShortValue(tokens, shortFlags, 'x', `${query.proxyHost}:${query.proxyPort}`, query, derived);

                if (query.proxyAuth) {
                    if (implementation.supports.proxyAuth) {
                        addShortValue(tokens, shortFlags, 'P', query.proxyAuth, query, derived);
                    } else {
                        warnings.push(`${implementation.label} does not support proxy authentication in this builder, so proxy auth was dropped.`);
                    }
                }
            } else {
                addLongValue(tokens, shortFlags, 'proxy', `${query.proxyHost}:${query.proxyPort}`, query, derived);
                addLongValue(tokens, shortFlags, 'proxy-type', proxyTypeCatalog[query.proxyType].ncatValue, query, derived);

                if (query.proxyAuth) {
                    addLongValue(tokens, shortFlags, 'proxy-auth', query.proxyAuth, query, derived);
                }
            }
        } else if (query.proxyAuth) {
            warnings.push('Proxy auth was provided without selecting a proxy type, so it was ignored.');
        }

        if (query.logOutput) {
            if (!implementation.supports.logOutput) {
                warnings.push(`${implementation.label} does not support stream logging in this builder, so the log output path was dropped.`);
            } else if (query.implementation === 'ncat') {
                addLongValue(tokens, shortFlags, 'output', query.logOutput, query, derived);
            } else {
                addShortValue(tokens, shortFlags, 'o', query.logOutput, query, derived);
            }
        }

        if (query.receiveOnly) {
            if (!implementation.supports.receiveOnly) {
                warnings.push(`${implementation.label} does not support receive-only mode in this builder, so that flag was dropped.`);
            } else {
                addLongFlag(tokens, shortFlags, 'recv-only', query, derived);
            }
        }

        if (query.sendOnly) {
            if (!implementation.supports.sendOnly) {
                warnings.push(`${implementation.label} does not support send-only mode in this builder, so that flag was dropped.`);
            } else {
                addLongFlag(tokens, shortFlags, 'send-only', query, derived);
            }
        }

        if (query.shutdownAfterEof) {
            if (!implementation.supports.shutdownAfterEof) {
                warnings.push(`${implementation.label} does not support shutdown-after-stdin EOF in this builder, so -N was dropped.`);
            } else {
                addShortFlag(tokens, shortFlags, 'N', derived);
            }
        }

        extraTokens.forEach((token) => {
            pushCombinedShortFlags(tokens, shortFlags, query);
            tokens.push(token);
        });

        if (query.connectionType === 'client' && query.primaryHost && query.targetPort) {
            pushCombinedShortFlags(tokens, shortFlags, query);
            tokens.push(formatValue(query.primaryHost, query.shell), query.targetPort);
        }

        if (query.connectionType === 'listen' && query.listenPort) {
            if (query.implementation === 'traditional' || query.implementation === 'busybox') {
                addShortValue(tokens, shortFlags, 'p', query.listenPort, query, derived);
                pushCombinedShortFlags(tokens, shortFlags, query);

                if (query.primaryHost && query.primaryHost !== '0.0.0.0') {
                    tokens.push(formatValue(query.primaryHost, query.shell));
                }
            } else {
                pushCombinedShortFlags(tokens, shortFlags, query);

                if (query.primaryHost) {
                    tokens.push(formatValue(query.primaryHost, query.shell));
                }

                tokens.push(query.listenPort);
            }
        }

        if (query.connectionType === 'scan' && query.primaryHost && query.startPort && query.endPort) {
            pushCombinedShortFlags(tokens, shortFlags, query);
            tokens.push(formatValue(query.primaryHost, query.shell), query.startPort === query.endPort ? query.startPort : `${query.startPort}-${query.endPort}`);
        }

        pushCombinedShortFlags(tokens, shortFlags, query);

        const command = errors.length > 0 ? '' : buildCommandFromTokens(tokens, query.shell, query.multiline);
        const binaryLabel = query.customBinary || implementation.binary;
        const timeoutSummary = [
            query.timeout ? `Connect timeout ${query.timeout}s` : 'No timeout override',
            query.quitAfterEof ? `Quit after EOF ${query.quitAfterEof}s` : 'No EOF timer',
            query.sendDelay ? `Send delay ${query.sendDelay}s` : 'No pacing'
        ].join(' · ');
        const executionSummary = query.executionMode === 'none'
            ? 'No execution handler'
            : implementation.supports.execution && query.connectionType !== 'scan'
                ? `Execute ${query.commandToRun}`
                : 'Requested but dropped';
        const tlsSummary = query.useTls
            ? implementation.supports.tls && query.connectionType !== 'scan'
                ? query.verifyCert ? 'TLS with verification' : 'TLS without verification'
                : 'Requested but dropped'
            : 'Disabled';
        const proxySummary = query.proxyType === 'none'
            ? 'No proxy'
            : query.connectionType === 'client' && implementation.supports.proxy
                ? `${proxyTypeCatalog[query.proxyType].label} via ${query.proxyHost}:${query.proxyPort}`
                : 'Requested but dropped';
        const extraFlagsSummary = query.extraFlags || 'None';
        const result = {
            generatedAtIso: new Date().toISOString(),
            query,
            command,
            implementationLabel: implementation.label,
            shellLabel,
            modeLabel,
            protocolLabel,
            hostBadge,
            portBadge,
            binaryLabel,
            summaryLine: buildModeSummary(query),
            timeoutSummary,
            executionSummary,
            tlsSummary,
            proxySummary,
            extraFlagsSummary,
            flagCount: derived.flagCount,
            warnings,
            errors
        };

        result.summaryRows = buildSummaryRows(result);
        result.jsonPayload = buildJsonPayload(result);
        result.csvRows = buildCsvRows(result);

        return result;
    }
// ns:end family.shell.workspace.03_advanced-setting
// ns:start family.shell.workspace.05_score-card
    function renderSummary(result) {
        const warningCount = result.warnings.length;
        const errorCount = result.errors.length;

        resultSummary.innerHTML = `
            <div class="generate-netcat-shell-summary-shell">
                <div class="generate-netcat-shell-summary-gauge">
                    <div class="generate-netcat-shell-summary-method">${escapeHtml(result.modeLabel)}</div>
                    <div class="generate-netcat-shell-summary-host">${escapeHtml(result.hostBadge)}</div>
                    <div class="generate-netcat-shell-summary-shell-name">${escapeHtml(result.implementationLabel)}</div>
                </div>

                <div class="generate-netcat-shell-summary-side">
                    <div class="generate-netcat-shell-summary-route">
                        <div class="generate-netcat-shell-summary-route-label">Generated command</div>
                        <div class="generate-netcat-shell-summary-route-value">${escapeHtml(result.command || 'No command generated while blocking errors remain.')}</div>
                    </div>

                    <div class="generate-netcat-shell-summary-cards">
                        <div class="generate-netcat-shell-stat-card">
                            <div class="generate-netcat-shell-stat-label">Protocol</div>
                            <div class="generate-netcat-shell-stat-value">${escapeHtml(result.protocolLabel)}</div>
                        </div>

                        <div class="generate-netcat-shell-stat-card">
                            <div class="generate-netcat-shell-stat-label">Ports</div>
                            <div class="generate-netcat-shell-stat-value">${escapeHtml(result.portBadge)}</div>
                        </div>

                        <div class="generate-netcat-shell-stat-card">
                            <div class="generate-netcat-shell-stat-label">Flags</div>
                            <div class="generate-netcat-shell-stat-value">${escapeHtml(String(result.flagCount))}</div>
                        </div>

                        <div class="generate-netcat-shell-stat-card">
                            <div class="generate-netcat-shell-stat-label">Shell</div>
                            <div class="generate-netcat-shell-stat-value">${escapeHtml(result.shellLabel)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="generate-netcat-shell-summary-badges">
                <span class="generate-netcat-shell-badge generate-netcat-shell-badge-neutral">${escapeHtml(result.implementationLabel)}</span>
                <span class="generate-netcat-shell-badge generate-netcat-shell-badge-success">${escapeHtml(result.summaryLine)}</span>
                <span class="generate-netcat-shell-badge ${warningCount > 0 ? 'generate-netcat-shell-badge-warn' : 'generate-netcat-shell-badge-success'}">${warningCount} warning${warningCount === 1 ? '' : 's'}</span>
                <span class="generate-netcat-shell-badge ${errorCount > 0 ? 'generate-netcat-shell-badge-danger' : 'generate-netcat-shell-badge-success'}">${errorCount} error${errorCount === 1 ? '' : 's'}</span>
            </div>
        `;
    }
// ns:end family.shell.workspace.05_score-card
// ns:start family.shell.workspace.06_sort-card
    function updateSortState() {
        const selectedButton = sortOptionButtons.find((button) => button.dataset.sortValue === sortInput.value) || sortOptionButtons[0];
        const selectedLabel = selectedButton
            ? selectedButton.textContent.trim()
            : 'ID';

        if (selectedButton) {
            sortInput.value = selectedButton.dataset.sortValue || 'id';
            sortSummary.textContent = selectedLabel;
            sortOptionButtons.forEach((button) => {
                const isActive = button === selectedButton;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
        }

        sortSelect.removeAttribute('open');
    }

    function getSortedSummaryRows(result) {
        if (!result) {
            return [];
        }

        const rows = result.summaryRows.map(([field, value], index) => ({
            field,
            value,
            index,
            id: index + 1
        }));

        if (sortInput.value === 'alphabetical' || sortInput.value === 'field') {
            return rows
                .sort((left, right) => {
                    const fieldSort = left.field.localeCompare(right.field, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });

                    if (fieldSort !== 0) {
                        return fieldSort;
                    }

                    return left.index - right.index;
                })
                .map((row) => [row.field, row.value, row.id]);
        }

        if (sortInput.value === 'value') {
            return rows
                .sort((left, right) => {
                    const valueSort = left.value.localeCompare(right.value, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });

                    if (valueSort !== 0) {
                        return valueSort;
                    }

                    return left.index - right.index;
                })
                .map((row) => [row.field, row.value, row.id]);
        }

        if (sortInput.value === 'length') {
            return rows
                .sort((left, right) => {
                    if (left.value.length !== right.value.length) {
                        return right.value.length - left.value.length;
                    }

                    return left.index - right.index;
                })
                .map((row) => [row.field, row.value, row.id]);
        }

        return rows
            .sort((left, right) => left.index - right.index)
            .map((row) => [row.field, row.value, row.id]);
    }
// ns:end family.shell.workspace.06_sort-card
// ns:start family.shell.workspace.07_table
    function renderOptionsTable(result) {
        optionsTableBody.innerHTML = getSortedSummaryRows(result)
            .map((row, index) => `
                <tr>
                    <td>${escapeHtml(row[2] || index + 1)}</td>
                    <td>${escapeHtml(row[0])}</td>
                    <td>${escapeHtml(row[1])}</td>
                    <td class="generate-netcat-shell-table-copy-cell">
                        <button type="button" class="generate-netcat-shell-row-copy" data-options-copy="${escapeHtml(row[1])}" aria-label="Copy operation row ${escapeHtml(row[2] || index + 1)}" title="Copy operation row">
                            <i class="bi bi-clipboard" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            `)
            .join('');
    }

    function renderMessageList(element, messages, emptyText) {
        if (!messages.length) {
            element.className = 'generate-netcat-shell-message-list generate-netcat-shell-message-list-empty';
            element.innerHTML = `<li>${escapeHtml(emptyText)}</li>`;
            return;
        }

        element.className = 'generate-netcat-shell-message-list';
        element.innerHTML = messages
            .map((message) => `<li>${escapeHtml(message)}</li>`)
            .join('');
    }

    function renderResult(result) {
        latestResult = result;
        resultEmpty.classList.add('d-none');
        resultContent.classList.remove('d-none');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        renderSummary(result);
        renderOptionsTable(result);
        commandOutput.textContent = result.command || 'No command generated while blocking errors remain.';
        renderJsonOutput(result.jsonPayload);
        renderMessageList(warningsList, result.warnings, 'No warnings for the current netcat command.');
        renderMessageList(errorsList, result.errors, 'No blocking errors for the current netcat command.');
        activateTab('generateNetcatShellOptionsPanel');
    }

    function showResultError(message) {
        resultError.classList.remove('d-none');
        resultError.textContent = message;
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

    function exportResultShellAsPdf(filenameStem, container) {
        const exportWindow = window.open('', '_blank', 'noopener,noreferrer');
        const shell = container.querySelector('.generate-netcat-shell-result-shell') || container;

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

    async function copyText(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            flashButton(button, 'Copied');
        } catch (error) {
            flashButton(button, 'Failed');
        }
    }

    function activateTab(tabTarget) {
        tabButtons.forEach((button) => {
            const isActive = button.dataset.tabTarget === tabTarget;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        tabPanels.forEach((panel) => {
            const isActive = panel.id === tabTarget || panel.dataset.tabPanel === tabTarget;

            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function formatDateTime(dateValue) {
        return new Intl.DateTimeFormat('en', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(dateValue);
    }

    function syncSafeStateToUrl(result) {
        const params = new URLSearchParams();

        if (result.query.preset && result.query.preset !== 'custom') {
            params.set('preset', result.query.preset);
        }

        if (result.query.primaryHost) {
            params.set('host', result.query.primaryHost);
        }

        params.set('mode', result.query.connectionType);
        params.set('impl', result.query.implementation);
        params.set('shell', result.query.shell);

        if (result.query.flagStyle !== 'mixed') {
            params.set('flags', result.query.flagStyle);
        }

        if (result.query.useUdp) {
            params.set('udp', '1');
        }

        if (result.query.forceIpv6) {
            params.set('ipv6', '1');
        }

        if (result.query.keepListening) {
            params.set('keep', '1');
        }

        if (result.query.verbose) {
            params.set('v', '1');
        }

        if (result.query.numericOnly) {
            params.set('n', '1');
        }

        if (result.query.targetPort) {
            params.set('port', result.query.targetPort);
        }

        if (result.query.listenPort) {
            params.set('listen', result.query.listenPort);
        }

        if (result.query.startPort) {
            params.set('start', result.query.startPort);
        }

        if (result.query.endPort) {
            params.set('end', result.query.endPort);
        }

        if (result.query.timeout) {
            params.set('timeout', result.query.timeout);
        }

        const nextUrl = params.toString()
            ? `${window.location.pathname}?${params.toString()}${window.location.hash}`
            : `${window.location.pathname}${window.location.hash}`;

        window.history.replaceState({}, '', nextUrl);
    }

    function restoreSafeStateFromUrl() {
        const params = new URLSearchParams(window.location.search);

        if (!params.toString()) {
            return false;
        }

        if (params.get('preset') && presetCatalog[params.get('preset')]) {
            applyPreset(params.get('preset'));
        }

        if (params.get('host')) {
            primaryHostInput.value = params.get('host');
        }

        if (params.get('mode') && connectionTypeCatalog[params.get('mode')]) {
            connectionTypeInput.value = params.get('mode');
        }

        if (params.get('impl') && implementationCatalog[params.get('impl')]) {
            implementationInput.value = params.get('impl');
        }

        if (params.get('shell') && shellCatalog[params.get('shell')]) {
            shellInput.value = params.get('shell');
        }

        if (params.get('flags')) {
            flagStyleInput.value = params.get('flags');
        }

        if (params.get('udp') === '1') {
            useUdpInput.checked = true;
        }

        if (params.get('ipv6') === '1') {
            forceIpv6Input.checked = true;
        }

        if (params.get('keep') === '1') {
            keepListeningInput.checked = true;
        }

        if (params.get('v') === '1') {
            verboseInput.checked = true;
        }

        if (params.get('n') === '1') {
            numericOnlyInput.checked = true;
        }

        if (params.get('port')) {
            targetPortInput.value = params.get('port');
        }

        if (params.get('listen')) {
            listenPortInput.value = params.get('listen');
        }

        if (params.get('start')) {
            startPortInput.value = params.get('start');
        }

        if (params.get('end')) {
            endPortInput.value = params.get('end');
        }

        if (params.get('timeout')) {
            timeoutInput.value = params.get('timeout');
        }

        presetInput.value = 'custom';
        updateDynamicState();
        syncAllEnhancedSelects();

        return true;
    }
// ns:end family.shell.workspace.07_table
// ns:start family.shell.workspace.01_input-target
    function generateAndRender() {
        submitButton.disabled = true;
        submitButton.textContent = 'Generating...';

        window.setTimeout(() => {
            const result = buildCommand(buildQuery());

            renderResult(result);
            syncSafeStateToUrl(result);

            if (result.errors.length > 0) {
                activateTab('generateNetcatShellWarningsPanel');
                showResultError('Fix the blocking fields listed below to produce a valid netcat command.');
            }

            submitButton.disabled = false;
            submitButton.textContent = 'Generate';
        }, 60);
    }

    function resetBuilder() {
        applyPreset('tcp-client');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        generateAndRender();
    }
// ns:end family.shell.workspace.01_input-target
// ns:start family.shell.workspace.07_table
    initMarkdownCopyButtons();
    Array.from(document.querySelectorAll('.generate-netcat-shell-form select')).forEach((select) => {
        enhanceNativeSelect(select);
    });

    applyPreset('tcp-client');

    if (restoreSafeStateFromUrl()) {
        markPresetCustom();
    }

    document.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof Node)) {
            return;
        }

        if (!sortSelect.contains(target)) {
            sortSelect.removeAttribute('open');
        }

        if (enhancedSelects.some((entry) => entry.wrapper.contains(target))) {
            return;
        }

        closeEnhancedSelects();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeEnhancedSelects();
            sortSelect.removeAttribute('open');
        }
    });

    [
        shellInput,
        implementationInput,
        flagStyleInput,
        connectionTypeInput,
        executionModeInput,
        proxyTypeInput
    ].forEach((input) => {
        input.addEventListener('change', function () {
            updateDynamicState();
            markPresetCustom();
            generateAndRender();
        });
    });

    [
        combineShortFlagsInput,
        multilineInput,
        useUdpInput,
        forceIpv6Input,
        keepListeningInput,
        verboseInput,
        zeroIoInput,
        numericOnlyInput,
        useTlsInput,
        verifyCertInput,
        receiveOnlyInput,
        sendOnlyInput,
        shutdownAfterEofInput
    ].forEach((input) => {
        input.addEventListener('change', function () {
            updateDynamicState();
            markPresetCustom();
            generateAndRender();
        });
    });

    [
        primaryHostInput,
        customBinaryInput,
        targetPortInput,
        listenPortInput,
        startPortInput,
        endPortInput,
        timeoutInput,
        quitAfterEofInput,
        sendDelayInput,
        sourceAddressInput,
        sourcePortInput,
        commandToRunInput,
        clientCertPathInput,
        clientKeyPathInput,
        proxyHostInput,
        proxyPortInput,
        proxyAuthInput,
        idleTimeoutInput,
        maxConnectionsInput,
        logOutputInput,
        extraFlagsInput
    ].forEach((input) => {
        input.addEventListener('change', function () {
            markPresetCustom();
            generateAndRender();
        });
    });

// ns:end family.shell.workspace.07_table
// ns:start family.shell.workspace.01_input-target
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateAndRender();
    });

    resetButton.addEventListener('click', function () {
        resetBuilder();
    });

// ns:end family.shell.workspace.01_input-target
// ns:start family.shell.workspace.02_basic-setting
    applyPresetButton.addEventListener('click', function () {
        applyPreset(presetInput.value);
        generateAndRender();
    });

    presetInput.addEventListener('change', function () {
        syncAllEnhancedSelects();
    });

// ns:end family.shell.workspace.02_basic-setting
// ns:start family.shell.workspace.06_sort-card
    updateSortState();

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });
    sortOptionButtons.forEach((button) => {
        button.addEventListener('click', function () {
            sortInput.value = button.dataset.sortValue || 'id';
            updateSortState();

            if (latestResult) {
                renderOptionsTable(latestResult);
            }
        });
    });

// ns:end family.shell.workspace.06_sort-card
// ns:start family.shell.workspace.07_table
    optionsTableBody.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const copyButton = target.closest('.generate-netcat-shell-row-copy');

        if (!copyButton || !optionsTableBody.contains(copyButton)) {
            return;
        }

        const copyValue = copyButton.getAttribute('data-options-copy');

        if (copyValue === null) {
            return;
        }

        copyText(copyValue, copyButton);
    });

    copyCommandButton.addEventListener('click', function () {
        if (!latestResult || !latestResult.command) {
            return;
        }

        copyText(latestResult.command, copyCommandButton);
    });

    exportPdfButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        exportResultShellAsPdf('generate-netcat-shell', resultContent);
        flashButton(exportPdfButton, 'Opened');
    });

    downloadCsvButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile(
            'generate-netcat-shell-options.csv',
            `${convertRowsToCsv(buildCsvRows(latestResult, getSortedSummaryRows(latestResult)))}\n`,
            'text/csv;charset=utf-8'
        );
        flashButton(downloadCsvButton, 'Downloaded');
    });

    copyJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(JSON.stringify(latestResult.jsonPayload, null, 2), copyJsonButton);
    });

    downloadJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile('generate-netcat-shell.json', `${JSON.stringify(latestResult.jsonPayload, null, 2)}\n`, 'application/json;charset=utf-8');
        flashButton(downloadJsonButton, 'Downloaded');
    });

    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });

    importJsonInput.addEventListener('change', async function () {
        const file = importJsonInput.files && importJsonInput.files[0];

        if (!file) {
            return;
        }

        try {
            const payload = JSON.parse(await file.text());

            applyImportedQuery(getImportedQuery(payload));
            flashButton(importJsonButton, 'Imported');
        } catch (error) {
            showResultError(error instanceof Error ? error.message : 'The selected JSON file could not be imported.');
            flashButton(importJsonButton, 'Failed');
        } finally {
            importJsonInput.value = '';
        }
    });

    updateDynamicState();
    syncAllEnhancedSelects();
    generateAndRender();
});
// ns:end family.shell.workspace.07_table
