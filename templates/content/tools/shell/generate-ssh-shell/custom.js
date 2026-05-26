// custom.js

// ns:start family._base.workspace.00_shell
function initializeGenerateSshShellDropdowns(root) {
    const scope = root || document;
    const dropdowns = Array.from(scope.querySelectorAll('[data-custom-dropdown-for]'));

    dropdowns.forEach(function (dropdown) {
        const targetId = dropdown.getAttribute('data-custom-dropdown-for');
        const targetInput = targetId ? document.getElementById(targetId) : null;
        const label = dropdown.querySelector('[data-custom-dropdown-label]');
        const options = Array.from(dropdown.querySelectorAll('[data-custom-dropdown-value]'));

        if (!targetInput || !label || !options.length || dropdown.dataset.customDropdownBound === 'true') {
            return;
        }

        function sync(value) {
            const fallback = options[0] ? options[0].dataset.customDropdownValue : '';
            const selectedValue = value || targetInput.value || fallback;
            const selectedOption = options.find(function (option) {
                return option.dataset.customDropdownValue === selectedValue;
            }) || options[0];

            if (!selectedOption) {
                return;
            }

            targetInput.value = selectedOption.dataset.customDropdownValue || '';
            label.textContent = selectedOption.textContent.trim();
            options.forEach(function (option) {
                const active = option === selectedOption;

                option.classList.toggle('active', active);
                option.classList.toggle('is-active', active);
                option.setAttribute('aria-selected', active ? 'true' : 'false');
            });
        }

        options.forEach(function (option) {
            option.addEventListener('click', function () {
                sync(option.dataset.customDropdownValue || '');
                targetInput.dispatchEvent(new Event('change', {
                    bubbles: true
                }));
                dropdown.removeAttribute('open');
            });
        });

        targetInput.addEventListener('change', function () {
            sync(targetInput.value);
        });
        sync(targetInput.value);
        dropdown.dataset.customDropdownBound = 'true';
    });
}
// ns:end family._base.workspace.00_shell

// ns:start family._base.workspace.05_result-summary
function installGenerateSshShellResultSummaryNormalizer(prefix) {
    function normalizeSummary(summary) {
        const hero = summary.querySelector('.' + prefix + '-result-hero-grid');

        if (!hero) {
            return;
        }

        const cards = Array.from(hero.querySelectorAll(':scope > .' + prefix + '-result-card'));
        const primaryCard = cards.find(function (card) {
            return card.classList.contains(prefix + '-result-card-primary');
        }) || cards[0];
        const summaryCard = cards.find(function (card) {
            return card !== primaryCard && card.classList.contains(prefix + '-result-card-summary');
        }) || cards.find(function (card) {
            return card !== primaryCard;
        });

        if (primaryCard) {
            primaryCard.classList.add(prefix + '-result-card-primary');
            primaryCard.dataset.resultVisual = 'command';
        }

        if (summaryCard) {
            summaryCard.classList.add(prefix + '-result-card-summary');
        }

        if (primaryCard && hero.firstElementChild !== primaryCard) {
            hero.insertBefore(primaryCard, hero.firstElementChild);
        }

        if (primaryCard && summaryCard && primaryCard.nextElementSibling !== summaryCard) {
            hero.insertBefore(summaryCard, primaryCard.nextElementSibling);
        }
    }

    function normalize() {
        document.querySelectorAll('.' + prefix + '-result-summary').forEach(normalizeSummary);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', normalize, { once: true });
        return;
    }

    normalize();
}

installGenerateSshShellResultSummaryNormalizer('generate-ssh-shell');
// ns:end family._base.workspace.05_result-summary

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('generateSshShellForm');
    const input = document.getElementById('generateSshShellInput');
    const inputError = document.getElementById('generateSshShellInputError');
    const primaryAction = document.getElementById('generateSshShellPrimaryAction');
    const secondaryAction = document.getElementById('generateSshShellSecondaryAction');
    const profile = document.getElementById('generateSshShellBasicPrimary');
    const applyPreset = document.getElementById('generateSshShellApplyPreset');
    const shellStyle = document.getElementById('generateSshShellShellStyle');
    const loginUser = document.getElementById('generateSshShellBasicText');
    const proxyEnabled = document.getElementById('generateSshShellBasicToggle');
    const proxyJump = document.getElementById('generateSshShellProxyJump');
    const previewShell = document.getElementById('generateSshShellPreviewShell');
    const previewTarget = document.getElementById('generateSshShellPreviewTarget');
    const previewRoute = document.getElementById('generateSshShellPreviewRoute');
    const verbose = document.getElementById('generateSshShellVerbose');
    const quiet = document.getElementById('generateSshShellQuiet');
    const ipv4 = document.getElementById('generateSshShellIpv4');
    const ipv6 = document.getElementById('generateSshShellIpv6');
    const port = document.getElementById('generateSshShellCustomNumber');
    const identityFile = document.getElementById('generateSshShellCustomText');
    const compression = document.getElementById('generateSshShellCustomToggle');
    const strictHostKey = document.getElementById('generateSshShellStrictHostKey');
    const knownHostsFile = document.getElementById('generateSshShellKnownHostsFile');
    const logLevel = document.getElementById('generateSshShellLogLevel');
    const sessionModes = Array.from(document.querySelectorAll('input[name="generateSshShellSessionMode"]'));
    const agentForward = document.getElementById('generateSshShellAgentForward');
    const tty = document.getElementById('generateSshShellTty');
    const connectTimeout = document.getElementById('generateSshShellConnectTimeout');
    const serverAliveInterval = document.getElementById('generateSshShellServerAliveInterval');
    const serverAliveCountMax = document.getElementById('generateSshShellServerAliveCountMax');
    const localForward = document.getElementById('generateSshShellLocalForward');
    const remoteForward = document.getElementById('generateSshShellRemoteForward');
    const dynamicForward = document.getElementById('generateSshShellDynamicForward');
    const extraArgs = document.getElementById('generateSshShellCustomTextarea');
    const resultEmpty = document.getElementById('generateSshShellResultEmpty');
    const resultContent = document.getElementById('generateSshShellResultContent');
    const resultError = document.getElementById('generateSshShellResultError');
    const resultSummary = document.getElementById('generateSshShellResultSummary');
    const commandOutput = document.getElementById('generateSshShellCommand');
    const summaryTableBody = document.getElementById('generateSshShellSummaryTableBody');
    const operationsTableBody = document.getElementById('generateSshShellOperationsTableBody');
    const warningsList = document.getElementById('generateSshShellWarningsList');
    const errorsList = document.getElementById('generateSshShellErrorsList');
    const jsonOutput = document.getElementById('generateSshShellJsonOutput');
    const jsonStatus = document.getElementById('generateSshShellJsonRestoreStatus');
    const sortInput = document.getElementById('generateSshShellSort');
    const sortSummary = document.getElementById('generateSshShellSortSummary');
    const sortSelect = document.getElementById('generateSshShellSortSelect');
    const sortOptionButtons = Array.from(document.querySelectorAll('.generate-ssh-shell-sort-option[data-sort-value]'));
    const copyCommandButton = document.getElementById('generateSshShellCopyCommand');
    const exportPdfButton = document.getElementById('generateSshShellExportPdf');
    const downloadCsvButton = document.getElementById('generateSshShellDownloadCsv');
    const copyJsonButton = document.getElementById('generateSshShellCopyJson');
    const downloadJsonButton = document.getElementById('generateSshShellDownloadJson');
    const importJsonButton = document.getElementById('generateSshShellImportJsonButton');
    const importJsonInput = document.getElementById('generateSshShellImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.generate-ssh-shell-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.generate-ssh-shell-tab-panel'));

    if (
        !form ||
        !input ||
        !inputError ||
        !primaryAction ||
        !secondaryAction ||
        !profile ||
        !applyPreset ||
        !shellStyle ||
        !loginUser ||
        !proxyEnabled ||
        !proxyJump ||
        !previewShell ||
        !previewTarget ||
        !previewRoute ||
        !verbose ||
        !quiet ||
        !ipv4 ||
        !ipv6 ||
        !port ||
        !identityFile ||
        !compression ||
        !strictHostKey ||
        !knownHostsFile ||
        !logLevel ||
        sessionModes.length === 0 ||
        !agentForward ||
        !tty ||
        !connectTimeout ||
        !serverAliveInterval ||
        !serverAliveCountMax ||
        !localForward ||
        !remoteForward ||
        !dynamicForward ||
        !extraArgs ||
        !resultEmpty ||
        !resultContent ||
        !resultError ||
        !resultSummary ||
        !commandOutput ||
        !summaryTableBody ||
        !operationsTableBody ||
        !warningsList ||
        !errorsList ||
        !jsonOutput ||
        !jsonStatus ||
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

    let currentPayload = null;
    let hasGenerated = false;
    const enhancedSelects = [];

    const profileDefaults = {
        interactive: {
            proxy: false,
            sessionMode: 'interactive',
            port: '22',
            tty: false,
            agent: false,
            compression: false,
            strict: 'accept-new',
            knownHosts: '',
            logLevel: '',
            connectTimeout: '',
            serverAliveInterval: '',
            serverAliveCountMax: '',
            localForward: '',
            remoteForward: '',
            dynamicForward: '',
            verbose: false,
            quiet: false,
            ipv4: false,
            ipv6: false,
            extra: ''
        },
        bastion: {
            proxy: true,
            sessionMode: 'interactive',
            port: '22',
            tty: false,
            agent: false,
            compression: true,
            strict: 'accept-new',
            knownHosts: '',
            logLevel: '',
            connectTimeout: '',
            serverAliveInterval: '30',
            serverAliveCountMax: '3',
            localForward: '',
            remoteForward: '',
            dynamicForward: '',
            verbose: false,
            quiet: false,
            ipv4: false,
            ipv6: false,
            extra: ''
        },
        'port-forward': {
            proxy: true,
            sessionMode: 'interactive',
            port: '22',
            tty: false,
            agent: false,
            compression: true,
            strict: 'accept-new',
            knownHosts: '',
            logLevel: '',
            connectTimeout: '',
            serverAliveInterval: '30',
            serverAliveCountMax: '3',
            localForward: '15432:db.internal:5432',
            remoteForward: '',
            dynamicForward: '',
            verbose: false,
            quiet: false,
            ipv4: false,
            ipv6: false,
            extra: '-N'
        },
        batch: {
            proxy: false,
            sessionMode: 'batch',
            port: '22',
            tty: false,
            agent: false,
            compression: false,
            strict: 'yes',
            knownHosts: '',
            logLevel: 'ERROR',
            connectTimeout: '10',
            serverAliveInterval: '',
            serverAliveCountMax: '',
            localForward: '',
            remoteForward: '',
            dynamicForward: '',
            verbose: false,
            quiet: true,
            ipv4: false,
            ipv6: false,
            extra: ''
        }
    };

    function trim(value) {
        return String(value || '').trim();
    }

    function closeEnhancedSelects(exceptSelect) {
        enhancedSelects.forEach(function (entry) {
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
        entry.optionButtons.forEach(function (button) {
            button.classList.toggle('is-active', button.dataset.value === entry.select.value);
        });
    }

    function enhanceNativeSelect(select) {
        if (!select || select.dataset.generateSshShellEnhanced === '1') {
            return;
        }

        const wrapper = document.createElement('div');
        const toggle = document.createElement('button');
        const menu = document.createElement('div');
        const optionButtons = [];

        select.dataset.generateSshShellEnhanced = '1';
        select.classList.add('generate-ssh-shell-native-select');
        wrapper.className = 'generate-ssh-shell-enhanced-select';
        toggle.type = 'button';
        toggle.className = 'generate-ssh-shell-enhanced-select-toggle';
        toggle.setAttribute('aria-haspopup', 'listbox');
        toggle.setAttribute('aria-expanded', 'false');
        menu.className = 'generate-ssh-shell-enhanced-select-menu';
        menu.setAttribute('role', 'listbox');

        Array.from(select.options).forEach(function (option) {
            const optionButton = document.createElement('button');

            optionButton.type = 'button';
            optionButton.className = 'generate-ssh-shell-enhanced-select-option';
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
            select: select,
            wrapper: wrapper,
            toggle: toggle,
            menu: menu,
            optionButtons: optionButtons
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

    function getSessionMode() {
        const selected = sessionModes.find(function (item) {
            return item.checked;
        });

        return selected ? selected.value : 'interactive';
    }

    function setSessionMode(value) {
        const nextValue = value === 'batch' ? 'batch' : 'interactive';

        sessionModes.forEach(function (item) {
            item.checked = item.value === nextValue;
        });
    }

    function setValue(element, value) {
        element.value = value;
        element.dispatchEvent(new Event('change', {
            bubbles: true
        }));
    }

    function quoteShell(value) {
        const text = String(value || '');

        if (/^[A-Za-z0-9_@%+=:,./~-]+$/.test(text)) {
            return text;
        }

        return "'" + text.replace(/'/g, "'\"'\"'") + "'";
    }

    function tokenizeExtra(value) {
        return trim(value).split(/\s+/).filter(Boolean);
    }

    function parseTarget(rawTarget, fallbackUser) {
        const stripped = trim(rawTarget).replace(/^ssh\s+/i, '');
        const parts = stripped.split(/\s+/).filter(Boolean);
        let target = parts.length ? parts[parts.length - 1] : '';

        if (target.startsWith('-')) {
            target = '';
        }

        const atIndex = target.indexOf('@');
        const user = atIndex > 0 ? target.slice(0, atIndex) : trim(fallbackUser);
        const host = atIndex > 0 ? target.slice(atIndex + 1) : target;

        return {
            raw: stripped,
            user: user,
            host: host,
            target: user ? user + '@' + host : host
        };
    }

    function readState() {
        return {
            target: trim(input.value),
            profile: profile.value,
            shellStyle: shellStyle.value || 'posix',
            loginUser: trim(loginUser.value),
            proxyEnabled: proxyEnabled.checked,
            proxyJump: trim(proxyJump.value),
            verbose: verbose.checked,
            quiet: quiet.checked,
            ipv4: ipv4.checked,
            ipv6: ipv6.checked,
            port: trim(port.value),
            identityFile: trim(identityFile.value),
            compression: compression.checked,
            strictHostKey: strictHostKey.value || 'accept-new',
            knownHostsFile: trim(knownHostsFile.value),
            logLevel: logLevel.value || '',
            sessionMode: getSessionMode(),
            agentForward: agentForward.checked,
            tty: tty.checked,
            connectTimeout: trim(connectTimeout.value),
            serverAliveInterval: trim(serverAliveInterval.value),
            serverAliveCountMax: trim(serverAliveCountMax.value),
            localForward: trim(localForward.value),
            remoteForward: trim(remoteForward.value),
            dynamicForward: trim(dynamicForward.value),
            extraArgs: trim(extraArgs.value)
        };
    }

    function validateState(state) {
        const errors = [];
        const target = parseTarget(state.target, state.loginUser);
        const portNumber = Number.parseInt(state.port, 10);

        if (!target.host || /[<>]/.test(target.host)) {
            errors.push('Enter a valid SSH host or user@host target.');
        }

        if (!Number.isInteger(portNumber) || portNumber < 1 || portNumber > 65535) {
            errors.push('Port must be a number from 1 to 65535.');
        }

        if (state.proxyEnabled && !state.proxyJump) {
            errors.push('ProxyJump is enabled, so enter a jump host.');
        }

        if (state.ipv4 && state.ipv6) {
            errors.push('Choose IPv4 or IPv6, not both address-family flags.');
        }

        [
            ['ConnectTimeout', state.connectTimeout, 1, 600],
            ['ServerAliveInterval', state.serverAliveInterval, 1, 3600],
            ['ServerAliveCountMax', state.serverAliveCountMax, 1, 20]
        ].forEach(function (item) {
            const label = item[0];
            const value = item[1];
            const min = item[2];
            const max = item[3];
            const number = Number.parseInt(value, 10);

            if (value && (!Number.isInteger(number) || number < min || number > max)) {
                errors.push(label + ' must be a number from ' + min + ' to ' + max + '.');
            }
        });

        return errors;
    }

    function updateBasicPreview() {
        const state = readState();
        const target = parseTarget(state.target, state.loginUser);
        const selectedShell = shellStyle.options[shellStyle.selectedIndex]
            ? shellStyle.options[shellStyle.selectedIndex].text
            : state.shellStyle;

        previewShell.textContent = selectedShell.replace(/\s+note$/i, '');
        previewTarget.textContent = target.target || 'target required';
        previewRoute.textContent = state.proxyEnabled ? 'via ' + (state.proxyJump || 'jump host') : 'direct';
    }

    // ns:start family.shell.workspace.04_result-text
    function buildModel(state) {
        const errors = validateState(state);
        const target = parseTarget(state.target, state.loginUser);
        const warnings = [];
        const tokens = ['ssh'];
        const optionRows = [];

        function addOption(field, value, action, optionTokens) {
            const rowTokens = optionTokens || [];

            optionRows.push({
                id: optionRows.length + 1,
                field: field,
                value: value,
                action: action
            });
            rowTokens.forEach(function (token) {
                tokens.push(token);
            });
        }

        if (!errors.length) {
            if (state.verbose) {
                addOption('Verbose output', 'enabled', 'Add -v', ['-v']);
            }

            if (state.quiet) {
                addOption('Quiet mode', 'enabled', 'Add -q', ['-q']);
            }

            if (state.ipv4) {
                addOption('Address family', 'IPv4 only', 'Add -4', ['-4']);
            }

            if (state.ipv6) {
                addOption('Address family', 'IPv6 only', 'Add -6', ['-6']);
            }

            if (String(state.port) !== '22') {
                addOption('Port', state.port, 'Add -p', ['-p', state.port]);
            }

            if (state.identityFile) {
                addOption('Identity file', state.identityFile, 'Add -i', ['-i', quoteShell(state.identityFile)]);
            }

            if (state.proxyEnabled) {
                addOption('ProxyJump', state.proxyJump, 'Add -J', ['-J', quoteShell(state.proxyJump)]);
            }

            if (state.strictHostKey) {
                addOption('StrictHostKeyChecking', state.strictHostKey, 'Add -o', ['-o', 'StrictHostKeyChecking=' + state.strictHostKey]);
            }

            if (state.knownHostsFile) {
                addOption('UserKnownHostsFile', state.knownHostsFile, 'Add -o', ['-o', 'UserKnownHostsFile=' + quoteShell(state.knownHostsFile)]);
            }

            if (state.logLevel) {
                addOption('LogLevel', state.logLevel, 'Add -o', ['-o', 'LogLevel=' + state.logLevel]);
            }

            if (state.compression) {
                addOption('Compression', 'enabled', 'Add -C', ['-C']);
            }

            if (state.agentForward) {
                addOption('Agent forwarding', 'enabled', 'Add -A', ['-A']);
                warnings.push('Agent forwarding can expose agent access to the remote session. Use it only when the trust boundary is understood.');
            }

            if (state.tty || state.sessionMode === 'interactive') {
                addOption('TTY', state.tty ? 'forced' : 'default interactive', state.tty ? 'Add -tt' : 'No explicit flag', state.tty ? ['-tt'] : []);
            }

            if (state.sessionMode === 'batch') {
                addOption('BatchMode', 'enabled', 'Add -o', ['-o', 'BatchMode=yes']);
            }

            if (state.connectTimeout) {
                addOption('ConnectTimeout', state.connectTimeout + 's', 'Add -o', ['-o', 'ConnectTimeout=' + state.connectTimeout]);
            }

            if (state.serverAliveInterval) {
                addOption('ServerAliveInterval', state.serverAliveInterval + 's', 'Add -o', ['-o', 'ServerAliveInterval=' + state.serverAliveInterval]);
            }

            if (state.serverAliveCountMax) {
                addOption('ServerAliveCountMax', state.serverAliveCountMax, 'Add -o', ['-o', 'ServerAliveCountMax=' + state.serverAliveCountMax]);
            }

            if (state.localForward) {
                addOption('LocalForward', state.localForward, 'Add -L', ['-L', quoteShell(state.localForward)]);
                warnings.push('Local forwarding opens a local listener. Confirm bind address and exposed port before running the command.');
            }

            if (state.remoteForward) {
                addOption('RemoteForward', state.remoteForward, 'Add -R', ['-R', quoteShell(state.remoteForward)]);
                warnings.push('Remote forwarding opens a listener on the remote side. Confirm remote bind policy before using it.');
            }

            if (state.dynamicForward) {
                addOption('DynamicForward', state.dynamicForward, 'Add -D', ['-D', quoteShell(state.dynamicForward)]);
                warnings.push('Dynamic forwarding starts a SOCKS listener. Confirm local exposure before routing traffic through it.');
            }

            tokenizeExtra(state.extraArgs).forEach(function (token) {
                tokens.push(token);
            });

            if (state.extraArgs) {
                addOption('Extra arguments', state.extraArgs.replace(/\s+/g, ' '), 'Append before target');
                warnings.push('Extra arguments are appended as entered. Review quoting before running the command.');
            }

            if (state.strictHostKey === 'no') {
                warnings.push('StrictHostKeyChecking=no relaxes host-key verification and should not be used as a normal default.');
            }

            if (state.quiet && state.verbose) {
                warnings.push('Quiet and verbose flags are unusual together. Review the command output expectation before use.');
            }

            tokens.push(quoteShell(target.target));
        }

        const command = errors.length ? '' : formatCommand(tokens, state.shellStyle);
        const summaryRows = [
            {
                id: 1,
                field: 'Target',
                value: target.target || 'Not set'
            },
            {
                id: 2,
                field: 'Profile',
                value: profile.options[profile.selectedIndex] ? profile.options[profile.selectedIndex].text : state.profile
            },
            {
                id: 3,
                field: 'Shell style',
                value: state.shellStyle
            },
            {
                id: 4,
                field: 'Generated options',
                value: String(optionRows.length)
            }
        ];

        return {
            tool: 'generate-ssh-shell',
            version: '1.0.0',
            generatedAt: new Date().toISOString(),
            state: state,
            target: target,
            command: command,
            summaryRows: summaryRows,
            optionRows: optionRows,
            warnings: warnings,
            errors: errors
        };
    }

    function formatCommand(tokens, style) {
        if (style === 'bash') {
            return tokens.map(quoteRenderedToken).join(' \\\n  ');
        }

        if (style === 'powershell') {
            return tokens.map(quoteRenderedToken).join(' `\n  ');
        }

        return tokens.map(quoteRenderedToken).join(' ');
    }

    function quoteRenderedToken(token) {
        return String(token || '');
    }
    // ns:end family.shell.workspace.04_result-text

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // ns:start family.shell.workspace.04_visual-contract
    function renderResultSummary(payload) {
        const state = payload.state;
        const warningTone = payload.warnings.length > 0 ? 'warning' : 'success';
        const resultTone = payload.errors.length ? 'warning' : 'ready';
        const status = payload.errors.length ? 'Needs input' : 'Generated';
        const updated = new Date(payload.generatedAt).toLocaleString();
        const commandPreview = payload.command || 'No command generated';

        resultSummary.dataset.resultTone = resultTone;
        resultSummary.dataset.resultLayout = 'command';
        resultSummary.innerHTML = `
            <header class="generate-ssh-shell-result-header" aria-label="Result summary header">
                <div class="generate-ssh-shell-result-header-main">
                    <span class="generate-ssh-shell-result-header-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span>
                    <div class="generate-ssh-shell-result-header-copy">
                        <h2 class="generate-ssh-shell-result-header-title">Result Summary</h2>
                        <p>Overview of the generated SSH command result and key metrics</p>
                    </div>
                </div>
                <div class="generate-ssh-shell-result-header-meta" aria-label="Result summary status">
                    <span class="generate-ssh-shell-result-header-chip generate-ssh-shell-result-chip-ready"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>${escapeHtml(status)}</span></span>
                    <span class="generate-ssh-shell-result-header-chip generate-ssh-shell-result-chip-updated"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(updated)}</span></span>
                </div>
            </header>
            <div class="generate-ssh-shell-result-hero-grid" aria-live="polite">
                <article class="generate-ssh-shell-result-card generate-ssh-shell-result-card-primary" data-result-visual="command" aria-label="Primary SSH command result">
                    <div class="generate-ssh-shell-result-primary-heading generate-ssh-shell-result-visual-copy generate-ssh-shell-result-visual-copy-top"><div class="generate-ssh-shell-result-kicker">Primary Result</div><h3 class="generate-ssh-shell-result-title generate-ssh-shell-result-title-center">SSH command</h3></div>
                    <div class="generate-ssh-shell-result-primary-visual" id="generateSshShellResultVisual" aria-label="Primary SSH command result">
                        <div class="generate-ssh-shell-result-command-output"><code class="generate-ssh-shell-result-command-value">${escapeHtml(commandPreview)}</code></div>
                    </div>
                    <div class="generate-ssh-shell-result-visual-copy"><p class="generate-ssh-shell-result-copy generate-ssh-shell-result-copy-center">Compact command preview for the selected OpenSSH options.</p></div>
                    <span class="generate-ssh-shell-result-card-divider" aria-hidden="true"></span>
                    <div class="generate-ssh-shell-result-chip-row generate-ssh-shell-result-chip-row-center" aria-label="Primary result outcome"><span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-outcome generate-ssh-shell-result-chip-ready"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>Command Generated</span></span></div>
                </article>
                <article class="generate-ssh-shell-result-card generate-ssh-shell-result-card-summary" aria-label="Command summary">
                    <div class="generate-ssh-shell-result-summary-intro"><span class="generate-ssh-shell-result-card-icon generate-ssh-shell-result-card-icon-summary" aria-hidden="true"><i class="bi bi-terminal"></i></span><div class="generate-ssh-shell-result-summary-copy"><div class="generate-ssh-shell-result-kicker">Descriptive Summary</div><h3 class="generate-ssh-shell-result-title">OpenSSH command preview</h3><p class="generate-ssh-shell-result-copy">Target, option rows, warning rows, and JSON output are generated locally from the visible SSH controls.</p></div></div>
                    <span class="generate-ssh-shell-result-card-divider" aria-hidden="true"></span>
                    <div class="generate-ssh-shell-result-chip-grid" aria-label="Command state">
                        <span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-baseline"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-person"></i></span><span>${escapeHtml(state.profile)}</span></span>
                        <span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-ready"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-shield-check"></i></span><span>${escapeHtml(state.strictHostKey)}</span></span>
                        <span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-${warningTone}"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-exclamation-triangle"></i></span><span>${escapeHtml(`${payload.warnings.length} warning${payload.warnings.length === 1 ? '' : 's'}`)}</span></span>
                        <span class="generate-ssh-shell-result-chip generate-ssh-shell-result-chip-baseline"><span class="generate-ssh-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>${escapeHtml(state.shellStyle)} shell</span></span>
                    </div>
                </article>
            </div>
            <div class="generate-ssh-shell-result-metric-grid" aria-label="Command metrics">
                ${renderMetric('Host', payload.target.host || '-', 'Parsed SSH host', 'success', 'bi-hdd-network')}
                ${renderMetric('Port', state.port || '22', 'Connection port', 'info', 'bi-ethernet')}
                ${renderMetric('Options', payload.optionRows.length, 'Generated rows', 'accent-tone', 'bi-list-check')}
                ${renderMetric('Warnings', payload.warnings.length, 'Review notes', 'warning', 'bi-exclamation-triangle')}
            </div>
        `;
    }

    function renderMetric(label, value, copy, tone, icon) {
        return [
            '<article class="generate-ssh-shell-result-metric-card generate-ssh-shell-result-metric-' + escapeHtml(tone) + '">',
            '<span class="generate-ssh-shell-result-metric-icon" aria-hidden="true"><i class="bi ' + escapeHtml(icon) + '"></i></span>',
            '<span class="generate-ssh-shell-result-metric-label">' + escapeHtml(label) + '</span>',
            '<strong class="generate-ssh-shell-result-metric-value">' + escapeHtml(value) + '</strong>',
            '<span class="generate-ssh-shell-result-metric-copy">' + escapeHtml(copy) + '</span>',
            '<span class="generate-ssh-shell-result-metric-accent" aria-hidden="true"></span>',
            '</article>'
        ].join('');
    }
    // ns:end family.shell.workspace.04_visual-contract

    function sortRows(rows) {
        const mode = sortInput.value || 'id';
        const sorted = rows.slice();

        sorted.sort(function (left, right) {
            if (mode === 'alphabetical') {
                return String(left.field).localeCompare(String(right.field));
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
        body.innerHTML = sortRows(rows).map(function (row, index) {
            const action = includeAction
                ? '<td><button type="button" class="generate-ssh-shell-action-btn generate-ssh-shell-row-action" data-row-copy="' + escapeHtml(row.value) + '" aria-label="Copy row value"><i class="bi bi-clipboard" aria-hidden="true"></i></button></td>'
                : '';

            return [
                '<tr>',
                '<td class="text-center">' + String(index + 1) + '</td>',
                '<td>' + escapeHtml(row.field) + '</td>',
                '<td>' + escapeHtml(row.value) + '</td>',
                action,
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
        renderResultSummary(payload);
        renderTableRows(payload.summaryRows, summaryTableBody, false);
        renderTableRows(payload.optionRows.length ? payload.optionRows : [{
            id: 1,
            field: 'Command',
            value: payload.errors.length ? 'Blocked by input error' : 'No optional flags selected',
            action: 'Review'
        }], operationsTableBody, true);
        renderList(warningsList, payload.warnings, 'No warnings for the current command preview.');
        renderList(errorsList, payload.errors, 'No input errors.');
        jsonOutput.textContent = JSON.stringify(payload, null, 2);
    }

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
    }

    function applyProfileDefaults() {
        const defaults = profileDefaults[profile.value] || profileDefaults.interactive;

        proxyEnabled.checked = defaults.proxy;
        setSessionMode(defaults.sessionMode);
        verbose.checked = defaults.verbose;
        quiet.checked = defaults.quiet;
        ipv4.checked = defaults.ipv4;
        ipv6.checked = defaults.ipv6;
        port.value = defaults.port;
        tty.checked = defaults.tty;
        agentForward.checked = defaults.agent;
        compression.checked = defaults.compression;
        setValue(strictHostKey, defaults.strict);
        knownHostsFile.value = defaults.knownHosts;
        logLevel.value = defaults.logLevel;
        connectTimeout.value = defaults.connectTimeout;
        serverAliveInterval.value = defaults.serverAliveInterval;
        serverAliveCountMax.value = defaults.serverAliveCountMax;
        localForward.value = defaults.localForward;
        remoteForward.value = defaults.remoteForward;
        dynamicForward.value = defaults.dynamicForward;
        extraArgs.value = defaults.extra;
        updateBasicPreview();

        if (hasGenerated) {
            generateCommand();
        }
    }

    function resetForm() {
        input.value = 'deploy@app01.example.com';
        profile.value = 'interactive';
        setValue(shellStyle, 'posix');
        loginUser.value = 'deploy';
        proxyEnabled.checked = false;
        proxyJump.value = 'bastion.example.com';
        verbose.checked = false;
        quiet.checked = false;
        ipv4.checked = false;
        ipv6.checked = false;
        port.value = '22';
        identityFile.value = '~/.ssh/id_ed25519';
        compression.checked = false;
        setValue(strictHostKey, 'accept-new');
        knownHostsFile.value = '';
        logLevel.value = '';
        setSessionMode('interactive');
        agentForward.checked = false;
        tty.checked = false;
        connectTimeout.value = '';
        serverAliveInterval.value = '';
        serverAliveCountMax.value = '';
        localForward.value = '';
        remoteForward.value = '';
        dynamicForward.value = '';
        extraArgs.value = '';
        updateBasicPreview();
        hideGeneratedOutput();
        clearSafeStateFromUrl();
    }

    function buildCsvRows(payload) {
        const rows = [['Section', 'Field', 'Value']];

        payload.summaryRows.forEach(function (row) {
            rows.push(['Summary', row.field, row.value]);
        });
        payload.optionRows.forEach(function (row) {
            rows.push(['Option', row.field, row.value]);
        });
        payload.warnings.forEach(function (warning) {
            rows.push(['Warning', 'Review', warning]);
        });
        payload.errors.forEach(function (error) {
            rows.push(['Error', 'Input', error]);
        });

        return rows.map(function (row) {
            return row.map(function (cell) {
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

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
            return;
        }

        const area = document.createElement('textarea');

        area.value = text;
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
    }

    function getExportPayload() {
        if (!currentPayload) {
            const payload = buildModel(readState());

            renderPayload(payload);
            return payload;
        }

        return currentPayload;
    }

    function applyImportedState(state) {
        if (!state || typeof state !== 'object') {
            throw new Error('Imported JSON does not include an SSH state object.');
        }

        input.value = trim(state.target) || input.value;
        profile.value = state.profile || 'interactive';
        setValue(shellStyle, state.shellStyle || 'posix');
        loginUser.value = trim(state.loginUser);
        proxyEnabled.checked = Boolean(state.proxyEnabled);
        proxyJump.value = trim(state.proxyJump);
        verbose.checked = Boolean(state.verbose);
        quiet.checked = Boolean(state.quiet);
        ipv4.checked = Boolean(state.ipv4);
        ipv6.checked = Boolean(state.ipv6);
        port.value = trim(state.port) || '22';
        identityFile.value = trim(state.identityFile);
        compression.checked = Boolean(state.compression);
        setValue(strictHostKey, state.strictHostKey || 'accept-new');
        knownHostsFile.value = trim(state.knownHostsFile);
        logLevel.value = state.logLevel || '';
        setSessionMode(state.sessionMode);
        agentForward.checked = Boolean(state.agentForward);
        tty.checked = Boolean(state.tty);
        connectTimeout.value = trim(state.connectTimeout);
        serverAliveInterval.value = trim(state.serverAliveInterval);
        serverAliveCountMax.value = trim(state.serverAliveCountMax);
        localForward.value = trim(state.localForward);
        remoteForward.value = trim(state.remoteForward);
        dynamicForward.value = trim(state.dynamicForward);
        extraArgs.value = trim(state.extraArgs);
        updateBasicPreview();
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

        url.searchParams.set('sshState', encodeState(state));
        window.history.replaceState({}, '', url.toString());
    }

    function clearSafeStateFromUrl() {
        if (!window.history || !window.URLSearchParams) {
            return;
        }

        const url = new URL(window.location.href);

        url.searchParams.delete('sshState');
        window.history.replaceState({}, '', url.toString());
    }

    function restoreSafeStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get('sshState');

        if (!encoded) {
            hideGeneratedOutput();
            return;
        }

        try {
            applyImportedState(decodeState(encoded));
            renderPayload(buildModel(readState()));
            setJsonStatus('Restored from URL state.');
        } catch (error) {
            hideGeneratedOutput();
        }
    }

    // ns:start family._base.workspace.06_output-toolbar
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
                renderTableRows(currentPayload.optionRows.length ? currentPayload.optionRows : [{
                    id: 1,
                    field: 'Command',
                    value: currentPayload.errors.length ? 'Blocked by input error' : 'No optional flags selected',
                    action: 'Review'
                }], operationsTableBody, true);
            }
        });
    });

    copyCommandButton.addEventListener('click', function () {
        copyText(getExportPayload().command || '');
    });

    exportPdfButton.addEventListener('click', function () {
        getExportPayload();
        window.print();
    });

    downloadCsvButton.addEventListener('click', function () {
        const payload = getExportPayload();

        downloadFile('generate-ssh-shell.csv', buildCsvRows(payload), 'text/csv;charset=utf-8');
    });

    copyJsonButton.addEventListener('click', function () {
        copyText(JSON.stringify(getExportPayload(), null, 2));
    });

    downloadJsonButton.addEventListener('click', function () {
        downloadFile('generate-ssh-shell.json', JSON.stringify(getExportPayload(), null, 2), 'application/json;charset=utf-8');
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
                const state = payload.state || payload;

                applyImportedState(state);
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
            copyText(button.dataset.rowCopy || '');
        }
    });
    // ns:end family._base.workspace.07_table-output

    document.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof Node)) {
            return;
        }

        if (enhancedSelects.some(function (entry) {
            return entry.wrapper.contains(target);
        })) {
            return;
        }

        closeEnhancedSelects();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeEnhancedSelects();
        }
    });

    // ns:start family._base.workspace.01_input-brief
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateCommand();
    });

    primaryAction.addEventListener('click', function (event) {
        event.preventDefault();
        generateCommand();
    });

    secondaryAction.addEventListener('click', resetForm);

    input.addEventListener('input', function () {
        inputError.classList.add('d-none');
        updateBasicPreview();
        if (hasGenerated) {
            generateCommand();
        }
    });
    // ns:end family._base.workspace.01_input-brief

    // ns:start family._base.workspace.02_basic-settings
    applyPreset.addEventListener('click', applyProfileDefaults);

    [profile, shellStyle, loginUser, proxyEnabled, proxyJump].forEach(function (field) {
        field.addEventListener('change', function () {
            updateBasicPreview();
            if (hasGenerated) {
                generateCommand();
            }
        });
        field.addEventListener('input', updateBasicPreview);
    });
    // ns:end family._base.workspace.02_basic-settings

    // ns:start family._base.workspace.03_custom-settings
    [
        verbose,
        quiet,
        ipv4,
        ipv6,
        port,
        identityFile,
        compression,
        strictHostKey,
        knownHostsFile,
        logLevel,
        agentForward,
        tty,
        connectTimeout,
        serverAliveInterval,
        serverAliveCountMax,
        localForward,
        remoteForward,
        dynamicForward,
        extraArgs
    ].forEach(function (field) {
        field.addEventListener('change', function () {
            if (hasGenerated) {
                generateCommand();
            }
        });
    });
    sessionModes.forEach(function (field) {
        field.addEventListener('change', function () {
            if (hasGenerated) {
                generateCommand();
            }
        });
    });
    // ns:end family._base.workspace.03_custom-settings

    initializeGenerateSshShellDropdowns(document.querySelector('.generate-ssh-shell-tool'));
    Array.from(form.querySelectorAll('select')).forEach(enhanceNativeSelect);
    updateBasicPreview();
    restoreSafeStateFromUrl();
});
