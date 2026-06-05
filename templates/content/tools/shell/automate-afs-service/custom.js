// custom.js

// ns:start family._base.workspace.00_shell
// ns:start family._base.workspace.05_result-summary
function installInfraStackResultSummaryNormalizer(prefix) {
    function normalizeSummary(summary) {
        const hero = summary.querySelector('.' + prefix + '-result-hero-grid');

        if (!hero) {
            return;
        }

        const cards = Array.from(hero.querySelectorAll(':scope > .' + prefix + '-result-card'));
        const primaryCard = cards.find(function (card) {
            return card.classList.contains(prefix + '-result-card-primary') || card.classList.contains(prefix + '-result-card-visual') || card.classList.contains(prefix + '-result-card-command');
        }) || cards[0];
        const summaryCard = cards.find(function (card) {
            return card !== primaryCard && (card.classList.contains(prefix + '-result-card-summary') || card.classList.contains(prefix + '-result-card-main'));
        }) || cards.find(function (card) {
            return card !== primaryCard;
        });

        if (primaryCard) {
            primaryCard.classList.add(prefix + '-result-card-primary');
            if (!primaryCard.dataset.resultVisual) {
                primaryCard.dataset.resultVisual = primaryCard.querySelector('.' + prefix + '-result-command-output') ? 'command' : 'text';
            }
        }

        if (summaryCard) {
            summaryCard.classList.add(prefix + '-result-card-summary');
            const chipRow = summaryCard.querySelector('.' + prefix + '-result-chip-row');

            if (chipRow && !summaryCard.querySelector('.' + prefix + '-result-chip-grid')) {
                chipRow.classList.add(prefix + '-result-chip-grid');
            }
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

    function scheduleNormalize() {
        window.requestAnimationFrame(normalize);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            normalize();
            new MutationObserver(scheduleNormalize).observe(document.body, {
                childList: true,
                subtree: true
            });
        }, { once: true });
        return;
    }

    normalize();
    new MutationObserver(scheduleNormalize).observe(document.body, {
        childList: true,
        subtree: true
    });
}

installInfraStackResultSummaryNormalizer('automate-afs-service');
// ns:end family._base.workspace.05_result-summary

document.addEventListener('DOMContentLoaded', function () {
    // ns:start family._base.workspace.01_input-brief
    const form = document.getElementById('automateAfsServiceForm');
    const targetInput = document.getElementById('automateAfsServiceInput');
    const primaryActionButton = document.getElementById('automateAfsServicePrimaryAction');
    const resetButton = document.getElementById('automateAfsServiceSecondaryAction');
    // ns:end family._base.workspace.01_input-brief

    // ns:start family._base.workspace.02_basic-settings
    const actionInput = document.getElementById('automateAfsServiceBasicPrimary');
    const modeInput = document.getElementById('automateAfsServiceMode');
    const environmentInput = document.getElementById('automateAfsServiceEnvironment');
    const debugInput = document.getElementById('automateAfsServiceDebug');
    const exportPathInput = document.getElementById('automateAfsServiceExportPath');
    const subnetInput = document.getElementById('automateAfsServiceSubnet');
    // ns:end family._base.workspace.02_basic-settings

    // ns:start family._base.workspace.03_custom-settings
    const exportFileInput = document.getElementById('automateAfsServiceExportFile');
    const optionsInput = document.getElementById('automateAfsServiceOptions');
    const confirmDeleteInput = document.getElementById('automateAfsServiceConfirmDelete');
    const customSettings = document.getElementById('automateAfsServiceCustomSettings');
    // ns:end family._base.workspace.03_custom-settings

    const inputError = document.getElementById('automateAfsServiceInputError');
    const resultEmpty = document.getElementById('automateAfsServiceResultEmpty');
    const resultContent = document.getElementById('automateAfsServiceResultContent');
    const resultError = document.getElementById('automateAfsServiceResultError');
    const resultSummary = document.getElementById('automateAfsServiceResultSummary');
    const commandOutput = document.getElementById('automateAfsServiceCommandOutput');
    const exportLineOutput = document.getElementById('automateAfsServiceExportLineOutput');
    const operationsTableBody = document.getElementById('automateAfsServiceOperationsTableBody');
    const environmentTableBody = document.getElementById('automateAfsServiceEnvironmentTableBody');
    const warningsList = document.getElementById('automateAfsServiceWarningsList');
    const errorsList = document.getElementById('automateAfsServiceErrorsList');
    const jsonOutput = document.getElementById('automateAfsServiceJsonOutput');
    const jsonRestoreStatus = document.getElementById('automateAfsServiceJsonRestoreStatus');
    const jsonRestoreEmpty = document.getElementById('automateAfsServiceJsonRestoreEmpty');
    const sortInput = document.getElementById('automateAfsServiceSort');
    const sortSummary = document.getElementById('automateAfsServiceSortSummary');
    const sortSelect = document.getElementById('automateAfsServiceSortSelect');
    const sortOptionButtons = Array.from(document.querySelectorAll('.automate-afs-service-sort-option[data-sort-value]'));
    const copyCommandButton = document.getElementById('automateAfsServiceCopyCommand');
    const exportPdfButton = document.getElementById('automateAfsServiceExportPdf');
    const downloadCsvButton = document.getElementById('automateAfsServiceDownloadCsv');
    const copyJsonButton = document.getElementById('automateAfsServiceCopyJson');
    const downloadJsonButton = document.getElementById('automateAfsServiceDownloadJson');
    const importJsonButton = document.getElementById('automateAfsServiceImportJsonButton');
    const importJsonInput = document.getElementById('automateAfsServiceImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.automate-afs-service-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.automate-afs-service-tab-panel'));

    if (
        !form ||
        !targetInput ||
        !primaryActionButton ||
        !actionInput ||
        !modeInput ||
        !environmentInput ||
        !debugInput ||
        !exportPathInput ||
        !subnetInput ||
        !exportFileInput ||
        !optionsInput ||
        !confirmDeleteInput ||
        !customSettings ||
        !resetButton ||
        !inputError ||
        !resultEmpty ||
        !resultContent ||
        !resultError ||
        !resultSummary ||
        !commandOutput ||
        !exportLineOutput ||
        !operationsTableBody ||
        !environmentTableBody ||
        !warningsList ||
        !errorsList ||
        !jsonOutput ||
        !jsonRestoreStatus ||
        !jsonRestoreEmpty ||
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

    // ns:start family.shell.workspace.04_visual-contract
    const actionCatalog = {
        install: {
            flag: '-i',
            label: 'Install',
            tone: 'ready',
            description: 'Install nfs-kernel-server, create the export path, write the export line, reload exportfs, and enable the service.'
        },
        check: {
            flag: '-c',
            label: 'Check',
            tone: 'baseline',
            description: 'Inspect package, export path, export file, expected export line, service state, and exportfs output without mutating the host.'
        },
        remove: {
            flag: '-r',
            label: 'Remove',
            tone: 'warning',
            description: 'Remove the export line, reload exportfs, stop and disable nfs-kernel-server, and remove the package while keeping the export path.'
        },
        delete: {
            flag: '-d',
            label: 'Delete',
            tone: 'need-work',
            description: 'Run the remove flow and delete the configured export path when live delete is explicitly confirmed.'
        }
    };

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

    let latestResult = null;

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function shellQuote(value) {
        return `'${String(value || '').replace(/'/g, `'\"'\"'`)}'`;
    }

    function normalizeText(value, fallback) {
        const text = String(value || '').trim();

        return text || fallback;
    }

    function normalizeAction(value) {
        return Object.prototype.hasOwnProperty.call(actionCatalog, value) ? value : defaultState.action;
    }

    function normalizeMode(value) {
        return ['test', 'default', 'sudo'].includes(value) ? value : defaultState.mode;
    }

    function normalizeDebug(value) {
        return ['0', '1', '2'].includes(String(value)) ? String(value) : defaultState.debug;
    }

    function normalizeBoolean(value) {
        return value === true || value === 'true' || value === 'TRUE' || value === '1' || value === 1;
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

    function normalizeState(input) {
        const source = input && typeof input === 'object' ? input : {};

        return {
            scriptPath: normalizeText(source.scriptPath || source.target, defaultState.scriptPath),
            action: normalizeAction(String(source.action || defaultState.action)),
            mode: normalizeMode(String(source.mode || defaultState.mode)),
            environment: normalizeText(source.environment, defaultState.environment),
            debug: normalizeDebug(source.debug),
            exportPath: normalizeText(source.exportPath, defaultState.exportPath),
            subnet: normalizeText(source.subnet, defaultState.subnet),
            exportFile: normalizeText(source.exportFile || source.exportConfig, defaultState.exportFile),
            exportOptions: normalizeOptions(source.exportOptions || source.options),
            confirmDelete: normalizeBoolean(source.confirmDelete)
        };
    }

    function collectState() {
        return normalizeState({
            scriptPath: targetInput.value,
            action: actionInput.value,
            mode: modeInput.value,
            environment: environmentInput.value,
            debug: debugInput.value,
            exportPath: exportPathInput.value,
            subnet: subnetInput.value,
            exportFile: exportFileInput.value,
            exportOptions: optionsInput.value,
            confirmDelete: confirmDeleteInput.checked
        });
    }

    function writeState(state) {
        targetInput.value = state.scriptPath;
        actionInput.value = state.action;
        modeInput.value = state.mode;
        environmentInput.value = state.environment;
        debugInput.value = state.debug;
        exportPathInput.value = state.exportPath;
        subnetInput.value = state.subnet;
        exportFileInput.value = state.exportFile;
        optionsInput.value = state.exportOptions;
        confirmDeleteInput.checked = state.confirmDelete;
    }

    function isAbsolutePath(value) {
        return /^\//.test(value);
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

    function validateState(state) {
        const errors = [];

        if (!state.scriptPath) {
            errors.push('Script path is required.');
        } else if (!isAbsolutePath(state.scriptPath)) {
            errors.push('Script path must be an absolute path.');
        }

        if (!isAbsolutePath(state.exportPath)) {
            errors.push('AFS export path must be absolute.');
        }

        if (!isAbsolutePath(state.exportFile)) {
            errors.push('NFS export file path must be absolute.');
        }

        if (!isValidCidr(state.subnet)) {
            errors.push('Allowed subnet must be a valid IPv4 CIDR, such as 172.16.64.0/24.');
        }

        if (!validateOptions(state.exportOptions)) {
            errors.push('Export options must be a comma-separated list of option tokens.');
        }

        if (state.action === 'delete' && state.mode !== 'test' && !state.confirmDelete) {
            errors.push('Live delete requires the delete guard so CONFIRM_DELETE=TRUE is generated.');
        }

        return errors;
    }

    function buildExportLine(state) {
        return `${state.exportPath} ${state.subnet}(${state.exportOptions})`;
    }

    function buildEnvironmentRows(state) {
        const rows = [
            {
                id: '01',
                field: 'DEBUG',
                value: state.debug,
                purpose: 'Controls service-afs.sh debug logging level.'
            },
            {
                id: '02',
                field: 'ENABLE_DEBUG',
                value: state.debug,
                purpose: 'Keeps the debug default aligned with DEBUG.'
            },
            {
                id: '03',
                field: 'AFS_EXPORT_PATH',
                value: state.exportPath,
                purpose: 'Path exported by nfs-kernel-server.'
            },
            {
                id: '04',
                field: 'AFS_CONF_EXPORT',
                value: state.exportFile,
                purpose: 'Exports file modified by install, remove, and check.'
            },
            {
                id: '05',
                field: 'AFS_CONF_SUBNET',
                value: state.subnet,
                purpose: 'Client subnet allowed in the generated export line.'
            },
            {
                id: '06',
                field: 'AFS_CONF_OPTIONS',
                value: state.exportOptions,
                purpose: 'NFS options placed inside the export line.'
            }
        ];

        if (state.action === 'delete' && state.confirmDelete) {
            rows.push({
                id: '07',
                field: 'CONFIRM_DELETE',
                value: 'TRUE',
                purpose: 'Allows the script delete path to remove the export directory outside test mode.'
            });
        }

        return rows;
    }

    // ns:start family.shell.workspace.04_result-text
    function buildCommand(state, environmentRows) {
        const envAssignments = environmentRows.map(function (row) {
            return `${row.field}=${shellQuote(row.value)}`;
        }).join(' ');
        const action = actionCatalog[state.action];
        const parts = [
            'env',
            envAssignments,
            'bash',
            '-x',
            shellQuote(state.scriptPath),
            action.flag
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
    // ns:end family.shell.workspace.04_result-text

    function makeRow(id, operation, effect, result) {
        return {
            id,
            operation,
            effect,
            result
        };
    }

    function buildOperationRows(state) {
        const modeLabel = state.mode === 'test' ? 'Preview only' : 'Script controlled';
        const exportLine = buildExportLine(state);
        const rows = {
            install: [
                makeRow('01', 'Package update', 'apt --assume-yes update', modeLabel),
                makeRow('02', 'Install package', 'apt --assume-yes install nfs-kernel-server', modeLabel),
                makeRow('03', 'Create export path', `mkdir -p "${state.exportPath}"`, modeLabel),
                makeRow('04', 'Set ownership', `chown -R root:root "${state.exportPath}"`, modeLabel),
                makeRow('05', 'Set permissions', `chmod -R 755 "${state.exportPath}"`, modeLabel),
                makeRow('06', 'Ensure export file', `touch "${state.exportFile}" when missing`, modeLabel),
                makeRow('07', 'Append export line', exportLine, modeLabel),
                makeRow('08', 'Reload exports', 'exportfs -ra', modeLabel),
                makeRow('09', 'Restart service', 'systemctl restart nfs-kernel-server', modeLabel),
                makeRow('10', 'Enable service', 'systemctl enable nfs-kernel-server', modeLabel),
                makeRow('11', 'Package cleanup', 'apt --assume-yes autoremove && apt --assume-yes autoclean', modeLabel)
            ],
            check: [
                makeRow('01', 'Package check', 'dpkg -s nfs-kernel-server', 'Read-only check'),
                makeRow('02', 'Export path check', `test -d "${state.exportPath}"`, 'Read-only check'),
                makeRow('03', 'Export file check', `test -f "${state.exportFile}"`, 'Read-only check'),
                makeRow('04', 'Export line check', `grep -F -- "${exportLine}" "${state.exportFile}"`, 'Read-only check'),
                makeRow('05', 'Service check', 'systemctl is-active --quiet nfs-kernel-server', 'Read-only check'),
                makeRow('06', 'Exportfs check', `exportfs -v | grep -F -- "${state.exportPath}"`, 'Read-only check')
            ],
            remove: [
                makeRow('01', 'Remove export line', `awk filter for "${state.exportPath}" in "${state.exportFile}"`, modeLabel),
                makeRow('02', 'Reload exports', 'exportfs -ra', modeLabel),
                makeRow('03', 'Stop service', 'systemctl stop nfs-kernel-server', modeLabel),
                makeRow('04', 'Disable service', 'systemctl disable nfs-kernel-server', modeLabel),
                makeRow('05', 'Remove package', 'apt --assume-yes remove nfs-kernel-server', modeLabel),
                makeRow('06', 'Package cleanup', 'apt --assume-yes autoremove && apt --assume-yes autoclean', modeLabel),
                makeRow('07', 'Keep export path', state.exportPath, 'Directory is not removed')
            ],
            delete: [
                makeRow('01', 'Run remove flow', 'remove_afs', modeLabel),
                makeRow('02', 'Delete export path', `rm -rf -- "${state.exportPath}"`, state.mode === 'test' ? 'Preview only' : 'Requires CONFIRM_DELETE=TRUE')
            ]
        };

        return rows[state.action] || rows.install;
    }

    function buildWarnings(state) {
        const warnings = [];

        if (state.mode !== 'test' && state.action !== 'check') {
            warnings.push('This generated command is a live host-changing run. Review it on the target host before execution.');
        }

        if (state.mode === 'test') {
            warnings.push('Test mode prints the commands through service-afs.sh and should be used before a live run.');
        }

        if (state.action === 'remove') {
            warnings.push('Remove mode keeps the export path and only removes the export entry, service package, and service enablement.');
        }

        if (state.action === 'delete') {
            warnings.push('Delete mode runs remove first and then removes the export path. Live delete needs CONFIRM_DELETE=TRUE.');
        }

        if (state.exportOptions.split(',').includes('no_root_squash')) {
            warnings.push('no_root_squash is powerful. Confirm that root mapping is intentional for this export.');
        }

        if (state.exportOptions.split(',').includes('rw')) {
            warnings.push('rw allows client writes. Confirm the subnet and exported path before using live mode.');
        }

        if (!/service-afs\.sh$/.test(state.scriptPath)) {
            warnings.push('The script path does not end with service-afs.sh. Confirm this is the intended IaS service script.');
        }

        return warnings;
    }
    // ns:end family.shell.workspace.04_visual-contract

    function buildResult(state) {
        const errors = validateState(state);

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }

        const environmentRows = buildEnvironmentRows(state);
        const exportLine = buildExportLine(state);
        const command = buildCommand(state, environmentRows);
        const operationRows = buildOperationRows(state);
        const warnings = buildWarnings(state);
        const action = actionCatalog[state.action];

        return {
            tool: 'automate-afs-service',
            version: '1.0.0',
            generatedAt: new Date().toISOString(),
            state,
            action: {
                key: state.action,
                label: action.label,
                flag: action.flag,
                tone: action.tone,
                description: action.description
            },
            command,
            exportLine,
            environmentRows,
            operationRows,
            warnings,
            errors: []
        };
    }

    function getSortValue(row, sortValue) {
        if (sortValue === 'alphabetical' || sortValue === 'field') {
            return String(row.operation || row.field || '').toLowerCase();
        }

        if (sortValue === 'value') {
            return String(row.effect || row.value || '').toLowerCase();
        }

        if (sortValue === 'length') {
            return String(row.effect || row.value || '').length;
        }

        return String(row.id || '');
    }

    function sortRows(rows) {
        const sortValue = sortInput.value || 'id';

        return rows.slice().sort(function (left, right) {
            const leftValue = getSortValue(left, sortValue);
            const rightValue = getSortValue(right, sortValue);

            if (typeof leftValue === 'number' && typeof rightValue === 'number') {
                return leftValue - rightValue;
            }

            return String(leftValue).localeCompare(String(rightValue), undefined, {
                numeric: true,
                sensitivity: 'base'
            });
        });
    }

    function renderCopyButton(value, attributeName) {
        return `<button type="button" class="automate-afs-service-table-btn" ${attributeName}="${escapeHtml(value)}" aria-label="Copy row value" title="Copy row value"><i class="bi bi-clipboard" aria-hidden="true"></i></button>`;
    }

    // ns:start family._base.workspace.07_table-output
    function renderOperationRows(result) {
        operationsTableBody.innerHTML = sortRows(result.operationRows).map(function (row, index) {
            return `
                <tr>
                    <td class="tool-generated-rownum-cell">${index + 1}</td>
                    <td>${escapeHtml(row.operation)}</td>
                    <td><code>${escapeHtml(row.effect)}</code></td>
                    <td>${escapeHtml(row.result)}</td>
                    <td class="tool-table-action-cell">${renderCopyButton(row.effect, 'data-operation-copy')}</td>
                </tr>
            `;
        }).join('');
    }

    function renderEnvironmentRows(result) {
        environmentTableBody.innerHTML = sortRows(result.environmentRows).map(function (row, index) {
            return `
                <tr>
                    <td class="tool-generated-rownum-cell">${index + 1}</td>
                    <td>${escapeHtml(row.field)}</td>
                    <td><code>${escapeHtml(row.value)}</code><span class="automate-afs-service-row-note">${escapeHtml(row.purpose)}</span></td>
                    <td class="tool-table-action-cell">${renderCopyButton(`${row.field}=${row.value}`, 'data-field-copy')}</td>
                </tr>
            `;
        }).join('');
    }
    // ns:end family._base.workspace.07_table-output

    function renderMessageList(list, messages, emptyText) {
        if (!messages || messages.length === 0) {
            list.innerHTML = `<li>${escapeHtml(emptyText)}</li>`;
            return;
        }

        list.innerHTML = messages.map(function (message) {
            return `<li>${escapeHtml(message)}</li>`;
        }).join('');
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

// ns:start family._base.workspace.05_result-summary
    function renderSummary(result) {
        const resultTone = result.warnings.length > 0 ? 'warning' : 'ready';
        const modeLabel = {
            default: 'Default live',
            sudo: 'Sudo live',
            test: 'Test preview'
        }[result.state.mode] || result.state.mode;
        const modeTone = result.state.mode === 'test' ? 'ready' : 'warning';
        const warningTone = result.warnings.length > 0 ? 'warning' : 'success';
        const updatedText = formatDateTime(result.generatedAt);
        const commandPreview = [
            'service-afs.sh',
            result.action.flag,
            result.state.mode === 'test' ? 'test' : '',
            result.state.mode === 'sudo' ? 'sudo' : ''
        ].filter(Boolean).join(' ');
        const optionCount = result.state.exportOptions.split(',').filter(Boolean).length;

        resultSummary.dataset.resultTone = resultTone;
        resultSummary.dataset.resultLayout = 'command';

        resultSummary.innerHTML = `
            <header class="automate-afs-service-result-header" aria-label="Result summary header">
                <div class="automate-afs-service-result-header-main">
                    <span class="automate-afs-service-result-header-icon" aria-hidden="true"><i class="bi bi-hdd-network"></i></span>
                    <div class="automate-afs-service-result-header-copy">
                        <h2 class="automate-afs-service-result-header-title">Result Summary</h2>
                        <p>Overview of the generated service-afs.sh command, export target, operation rows, and review warnings.</p>
                    </div>
                </div>
                <div class="automate-afs-service-result-header-meta" aria-label="Result summary status">
                    <span class="automate-afs-service-result-header-chip automate-afs-service-result-chip-ready"><span class="automate-afs-service-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span>
                    <span class="automate-afs-service-result-header-chip automate-afs-service-result-chip-updated"><span class="automate-afs-service-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(updatedText)}</span></span>
                </div>
            </header>
            <div class="automate-afs-service-result-hero-grid" aria-live="polite">
                <article class="automate-afs-service-result-card automate-afs-service-result-card-primary" data-result-visual="command" aria-label="Primary AFS command result">
                    <div class="automate-afs-service-result-primary-heading automate-afs-service-result-visual-copy automate-afs-service-result-visual-copy-top">
                        <div class="automate-afs-service-result-kicker">Primary Result</div>
                        <h3 class="automate-afs-service-result-title automate-afs-service-result-title-center">${escapeHtml(result.action.label)} mode</h3>
                    </div>
                    <div class="automate-afs-service-result-primary-visual" id="automateAfsServiceResultVisual" aria-label="Primary service-afs.sh mode">
                        <div class="automate-afs-service-result-command-output"><code class="automate-afs-service-result-command-value">${escapeHtml(commandPreview)}</code></div>
                    </div>
                    <div class="automate-afs-service-result-visual-copy"><p class="automate-afs-service-result-copy automate-afs-service-result-copy-center">Compact command preview for the selected AFS service action. The full command stays in the Command tab.</p></div>
                    <span class="automate-afs-service-result-card-divider" aria-hidden="true"></span>
                    <div class="automate-afs-service-result-chip-row automate-afs-service-result-chip-row-center" aria-label="Primary result outcome">
                        <span class="automate-afs-service-result-chip automate-afs-service-result-chip-outcome automate-afs-service-result-chip-${modeTone}"><span class="automate-afs-service-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>${escapeHtml(modeLabel)}</span></span>
                    </div>
                </article>
                <article class="automate-afs-service-result-card automate-afs-service-result-card-summary" aria-label="AFS service summary">
                    <div class="automate-afs-service-result-summary-intro">
                        <span class="automate-afs-service-result-card-icon automate-afs-service-result-card-icon-summary" aria-hidden="true"><i class="bi bi-card-checklist"></i></span>
                        <div class="automate-afs-service-result-summary-copy">
                            <div class="automate-afs-service-result-kicker">Descriptive Summary</div>
                            <h3 class="automate-afs-service-result-title">${escapeHtml(result.action.label)} AFS service command</h3>
                            <p class="automate-afs-service-result-copy">${escapeHtml(result.action.description)}</p>
                        </div>
                    </div>
                    <span class="automate-afs-service-result-card-divider" aria-hidden="true"></span>
                    <div class="automate-afs-service-result-chip-grid" aria-label="Command state">
                        <span class="automate-afs-service-result-chip automate-afs-service-result-chip-baseline"><span class="automate-afs-service-result-chip-icon" aria-hidden="true"><i class="bi bi-flag"></i></span><span>${escapeHtml(result.action.flag)}</span></span>
                        <span class="automate-afs-service-result-chip automate-afs-service-result-chip-${modeTone}"><span class="automate-afs-service-result-chip-icon" aria-hidden="true"><i class="bi bi-play-circle"></i></span><span>${escapeHtml(modeLabel)}</span></span>
                        <span class="automate-afs-service-result-chip automate-afs-service-result-chip-baseline"><span class="automate-afs-service-result-chip-icon" aria-hidden="true"><i class="bi bi-list-check"></i></span><span>Rows ${result.operationRows.length}</span></span>
                        <span class="automate-afs-service-result-chip automate-afs-service-result-chip-${warningTone}"><span class="automate-afs-service-result-chip-icon" aria-hidden="true"><i class="bi bi-exclamation-triangle"></i></span><span>${result.warnings.length} warning${result.warnings.length === 1 ? '' : 's'}</span></span>
                        <span class="automate-afs-service-result-chip automate-afs-service-result-chip-updated"><span class="automate-afs-service-result-chip-icon" aria-hidden="true"><i class="bi bi-filetype-json"></i></span><span>JSON restore ready</span></span>
                    </div>
                </article>
            </div>
            <div class="automate-afs-service-result-metric-grid" aria-label="Command metrics">
                <article class="automate-afs-service-result-metric-card automate-afs-service-result-metric-success"><span class="automate-afs-service-result-metric-icon" aria-hidden="true"><i class="bi bi-folder2-open"></i></span><span class="automate-afs-service-result-metric-label">Export path</span><strong class="automate-afs-service-result-metric-value">${escapeHtml(result.state.exportPath)}</strong><span class="automate-afs-service-result-metric-copy">Directory prepared by the generated action.</span><span class="automate-afs-service-result-metric-accent" aria-hidden="true"></span></article>
                <article class="automate-afs-service-result-metric-card automate-afs-service-result-metric-info"><span class="automate-afs-service-result-metric-icon" aria-hidden="true"><i class="bi bi-diagram-3"></i></span><span class="automate-afs-service-result-metric-label">Subnet</span><strong class="automate-afs-service-result-metric-value">${escapeHtml(result.state.subnet)}</strong><span class="automate-afs-service-result-metric-copy">Client network for the export line.</span><span class="automate-afs-service-result-metric-accent" aria-hidden="true"></span></article>
                <article class="automate-afs-service-result-metric-card automate-afs-service-result-metric-accent-tone"><span class="automate-afs-service-result-metric-icon" aria-hidden="true"><i class="bi bi-sliders"></i></span><span class="automate-afs-service-result-metric-label">Options</span><strong class="automate-afs-service-result-metric-value">${optionCount}</strong><span class="automate-afs-service-result-metric-copy">NFS export options generated.</span><span class="automate-afs-service-result-metric-accent" aria-hidden="true"></span></article>
                <article class="automate-afs-service-result-metric-card automate-afs-service-result-metric-warning"><span class="automate-afs-service-result-metric-icon" aria-hidden="true"><i class="bi bi-braces"></i></span><span class="automate-afs-service-result-metric-label">Environment</span><strong class="automate-afs-service-result-metric-value">${result.environmentRows.length}</strong><span class="automate-afs-service-result-metric-copy">Exported variables in the command.</span><span class="automate-afs-service-result-metric-accent" aria-hidden="true"></span></article>
            </div>
        `;
    }
// ns:end family._base.workspace.05_result-summary

    function activateTab(panelId) {
        tabButtons.forEach(function (button) {
            const isActive = button.dataset.tabTarget === panelId;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        tabPanels.forEach(function (panel) {
            const isActive = panel.id === panelId;
            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function clearErrorState() {
        inputError.classList.add('d-none');
        inputError.textContent = '';
        resultError.classList.add('d-none');
        resultError.textContent = '';
    }

    function showErrorState(message) {
        inputError.textContent = message;
        inputError.classList.remove('d-none');
        resultError.textContent = message;
        resultError.classList.remove('d-none');
        resultEmpty.classList.remove('d-none');
        resultContent.classList.add('d-none');
    }

    function renderResult(result) {
        latestResult = result;
        clearErrorState();
        renderSummary(result);
        commandOutput.textContent = result.command;
        exportLineOutput.textContent = result.exportLine;
        renderOperationRows(result);
        renderEnvironmentRows(result);
        renderMessageList(warningsList, result.warnings, 'No warnings for the current AFS service command.');
        renderMessageList(errorsList, result.errors, 'No blocking errors for the current AFS service command.');
        jsonOutput.textContent = JSON.stringify(result, null, 2);
        jsonRestoreEmpty.classList.add('is-hidden');
        resultEmpty.classList.add('d-none');
        resultContent.classList.remove('d-none');
        activateTab('automateAfsServiceOperationsPanel');
    }

    function generateCommand(options) {
        const state = collectState();
        const result = buildResult(state);

        writeState(state);
        renderResult(result);

        if (!options || options.syncUrl !== false) {
            syncSafeStateToUrl(state);
        }

        return result;
    }

// ns:start family._base.workspace.06_output-toolbar
    function updateSortExpandedState() {
        const summaryElement = sortSelect.querySelector('[aria-expanded]');

        if (summaryElement) {
            summaryElement.setAttribute('aria-expanded', sortSelect.open ? 'true' : 'false');
        }
    }

    function updateSort(value) {
        const sortLabels = {
            alphabetical: 'A-Z',
            field: 'Field',
            id: 'ID',
            length: 'Length',
            value: 'Value'
        };

        sortInput.value = value;
        sortSummary.textContent = sortLabels[value] || 'ID';
        sortOptionButtons.forEach(function (button) {
            const isActive = button.dataset.sortValue === value;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        if (latestResult) {
            renderOperationRows(latestResult);
            renderEnvironmentRows(latestResult);
        }
    }
    // ns:end family._base.workspace.06_output-toolbar

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).catch(function () {
                return fallbackCopyText(text);
            });
        }

        return fallbackCopyText(text);
    }

    function fallbackCopyText(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        return Promise.resolve();
    }

    function markCopied(button) {
        const icon = button.querySelector('i');

        button.classList.add('copied');

        if (icon) {
            icon.className = 'bi bi-check2';
        }

        window.setTimeout(function () {
            button.classList.remove('copied');

            if (icon) {
                icon.className = 'bi bi-clipboard';
            }
        }, 1200);
    }

    function downloadFile(filename, mimeType, content) {
        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    function csvEscape(value) {
        return `"${String(value || '').replace(/"/g, '""')}"`;
    }

    function buildCsv(result) {
        const rows = [
            ['Type', 'Field', 'Value', 'Result'],
            ['Command', 'Generated command', result.command, result.action.label],
            ['Export', 'Export line', result.exportLine, result.state.subnet]
        ];

        result.environmentRows.forEach(function (row) {
            rows.push(['Environment', row.field, row.value, row.purpose]);
        });

        result.operationRows.forEach(function (row) {
            rows.push(['Operation', row.operation, row.effect, row.result]);
        });

        result.warnings.forEach(function (warning) {
            rows.push(['Warning', 'Review', warning, '']);
        });

        return rows.map(function (row) {
            return row.map(csvEscape).join(',');
        }).join('\n');
    }

    // ns:start family._base.workspace.08_json-restore
    function showRestoreStatus(message) {
        jsonRestoreStatus.textContent = message;
        jsonRestoreStatus.classList.remove('is-hidden');
        window.setTimeout(function () {
            jsonRestoreStatus.classList.add('is-hidden');
        }, 2200);
    }

    function buildImportedPayloadState(payload) {
        if (!payload || typeof payload !== 'object') {
            throw new Error('The selected JSON file does not contain an AFS service payload.');
        }

        const sourceState = payload.state && typeof payload.state === 'object' ? payload.state : payload;

        return normalizeState(sourceState);
    }

    function handleImport(payload) {
        const state = buildImportedPayloadState(payload);

        writeState(state);
        generateCommand({ syncUrl: true });
        showRestoreStatus('JSON restored');
    }
    // ns:end family._base.workspace.08_json-restore

    function syncSafeStateToUrl(state) {
        const params = new URLSearchParams(window.location.search);

        params.set('action', state.action);
        params.set('mode', state.mode);
        params.set('env', state.environment);
        params.set('debug', state.debug);

        const nextQuery = params.toString();
        const nextUrl = `${window.location.pathname}${nextQuery ? '?' + nextQuery : ''}${window.location.hash || ''}`;
        window.history.replaceState(null, '', nextUrl);
    }

    function restoreSafeStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const state = {};

        if (params.has('action')) {
            state.action = params.get('action');
        }

        if (params.has('mode')) {
            state.mode = params.get('mode');
        }

        if (params.has('env')) {
            state.environment = params.get('env');
        }

        if (params.has('debug')) {
            state.debug = params.get('debug');
        }

        return state;
    }

    function clearSafeStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        ['action', 'mode', 'env', 'debug'].forEach(function (key) {
            params.delete(key);
        });

        const nextQuery = params.toString();
        const nextUrl = `${window.location.pathname}${nextQuery ? '?' + nextQuery : ''}${window.location.hash || ''}`;
        window.history.replaceState(null, '', nextUrl);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        try {
            generateCommand();
        } catch (error) {
            showErrorState(error.message || 'Failed to generate the AFS service command.');
        }
    });

    resetButton.addEventListener('click', function () {
        writeState(defaultState);
        latestResult = null;
        clearErrorState();
        clearSafeStateFromUrl();
        resultSummary.innerHTML = '';
        commandOutput.textContent = '';
        exportLineOutput.textContent = '';
        operationsTableBody.innerHTML = '';
        environmentTableBody.innerHTML = '';
        warningsList.innerHTML = '';
        errorsList.innerHTML = '';
        jsonOutput.textContent = '';
        jsonRestoreEmpty.classList.remove('is-hidden');
        jsonRestoreStatus.classList.add('is-hidden');
        resultEmpty.classList.remove('d-none');
        resultContent.classList.add('d-none');
        updateSort('id');
        activateTab('automateAfsServiceOperationsPanel');
    });

    sortOptionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            updateSort(button.dataset.sortValue || 'id');
            sortSelect.open = false;
        });
    });

    sortSelect.addEventListener('toggle', updateSortExpandedState);

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

    copyCommandButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(latestResult.command).then(function () {
            markCopied(copyCommandButton);
        });
    });

    exportPdfButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        window.print();
    });

    downloadCsvButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile('automate-afs-service.csv', 'text/csv;charset=utf-8', buildCsv(latestResult));
    });

    copyJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(JSON.stringify(latestResult, null, 2)).then(function () {
            markCopied(copyJsonButton);
        });
    });

    downloadJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile('automate-afs-service.json', 'application/json;charset=utf-8', JSON.stringify(latestResult, null, 2));
    });

    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });

    importJsonInput.addEventListener('change', function () {
        const file = importJsonInput.files && importJsonInput.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.addEventListener('load', function () {
            try {
                handleImport(JSON.parse(String(reader.result || '{}')));
            } catch (error) {
                showErrorState(error.message || 'Failed to restore the selected JSON file.');
            } finally {
                importJsonInput.value = '';
            }
        });

        reader.readAsText(file);
    });

    operationsTableBody.addEventListener('click', function (event) {
        const button = event.target.closest('[data-operation-copy]');

        if (!button) {
            return;
        }

        copyText(button.getAttribute('data-operation-copy') || '').then(function () {
            markCopied(button);
        });
    });

    environmentTableBody.addEventListener('click', function (event) {
        const button = event.target.closest('[data-field-copy]');

        if (!button) {
            return;
        }

        copyText(button.getAttribute('data-field-copy') || '').then(function () {
            markCopied(button);
        });
    });

    document.querySelectorAll('.automate-afs-service-command-copy-btn').forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const details = button.closest('details');
            const previous = details ? details.previousElementSibling : null;
            const command = previous ? previous.textContent.trim() : '';

            if (!command) {
                return;
            }

            copyText(command).then(function () {
                markCopied(button);
            });
        });
    });

    const restoredState = restoreSafeStateFromUrl();

    if (Object.keys(restoredState).length > 0) {
        writeState(normalizeState(Object.assign({}, defaultState, restoredState)));

        try {
            generateCommand({ syncUrl: false });
        } catch (error) {
            showErrorState(error.message || 'Failed to restore URL state.');
        }
    } else {
        writeState(defaultState);
        updateSort('id');
        jsonRestoreEmpty.classList.remove('is-hidden');
    }
});
// ns:end family._base.workspace.00_shell
