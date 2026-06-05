// custom.js

// ns:start family._base.workspace.00_shell
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.00_shell

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

installInfraStackResultSummaryNormalizer('generate-chmod-shell');
// ns:end family._base.workspace.05_result-summary

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('generateChmodShellForm');
    const submitButton = document.getElementById('generateChmodShellSubmit');
    const resetButton = document.getElementById('generateChmodShellReset');
    const targetInput = document.getElementById('generateChmodShellTarget');
    const presetInput = document.getElementById('generateChmodShellPreset');
    const applyPresetButton = document.getElementById('generateChmodShellApplyPreset');
    const targetTypeInput = document.getElementById('generateChmodShellTargetType');
    const recursiveInput = document.getElementById('generateChmodShellRecursive');
    const verboseInput = document.getElementById('generateChmodShellVerbose');
    const scopeOctalBadges = Array.from(document.querySelectorAll('[data-scope-octal]'));
    const permissionInputs = Array.from(document.querySelectorAll('.generate-chmod-shell-perm-toggle input[type="checkbox"]'));
    const setuidInput = document.getElementById('generateChmodShellSetuid');
    const setgidInput = document.getElementById('generateChmodShellSetgid');
    const stickyInput = document.getElementById('generateChmodShellSticky');
    const numericInput = document.getElementById('generateChmodShellNumericMode');
    const numericFeedback = document.getElementById('generateChmodShellNumericFeedback');
    const symbolicInput = document.getElementById('generateChmodShellSymbolicMode');
    const symbolicFeedback = document.getElementById('generateChmodShellSymbolicFeedback');
    const operationInput = document.getElementById('generateChmodShellOperation');
    const applyOperationButton = document.getElementById('generateChmodShellApplyOperation');
    const operationFeedback = document.getElementById('generateChmodShellOperationFeedback');
    const quickOperationButtons = Array.from(document.querySelectorAll('[data-operation]'));
    const umaskInput = document.getElementById('generateChmodShellUmask');
    const umaskFileBaseInput = document.getElementById('generateChmodShellUmaskFileBase');
    const umaskDirBaseInput = document.getElementById('generateChmodShellUmaskDirBase');
    const umaskFileNumeric = document.getElementById('generateChmodShellUmaskFileNumeric');
    const umaskFileSymbolic = document.getElementById('generateChmodShellUmaskFileSymbolic');
    const umaskDirNumeric = document.getElementById('generateChmodShellUmaskDirNumeric');
    const umaskDirSymbolic = document.getElementById('generateChmodShellUmaskDirSymbolic');
    const umaskFeedback = document.getElementById('generateChmodShellUmaskFeedback');
    const resultEmpty = document.getElementById('generateChmodShellResultEmpty');
    const resultContent = document.getElementById('generateChmodShellResultContent');
    const resultError = document.getElementById('generateChmodShellResultError');
    const resultSummary = document.getElementById('generateChmodShellResultSummary');
    const commandOutput = document.getElementById('generateChmodShellCommandOutput');
    const lsOutput = document.getElementById('generateChmodShellLsOutput');
    const summaryTableBody = document.getElementById('generateChmodShellSummaryTableBody');
    const permissionTableBody = document.getElementById('generateChmodShellPermissionTableBody');
    const umaskTableBody = document.getElementById('generateChmodShellUmaskTableBody');
    const operationsTableBody = document.getElementById('generateChmodShellOperationsTableBody');
    const warningsList = document.getElementById('generateChmodShellWarningsList');
    const errorsList = document.getElementById('generateChmodShellErrorsList');
    const jsonOutput = document.getElementById('generateChmodShellJsonOutput');
    const sortInput = document.getElementById('generateChmodShellSort');
    const sortSummary = document.getElementById('generateChmodShellSortSummary');
    const sortOptionButtons = Array.from(document.querySelectorAll('.generate-chmod-shell-sort-option[data-sort-value]'));
    const sortSelect = document.getElementById('generateChmodShellSortSelect');
    const copyCommandButton = document.getElementById('generateChmodShellCopyCommand');
    const exportPdfButton = document.getElementById('generateChmodShellExportPdf');
    const downloadCsvButton = document.getElementById('generateChmodShellDownloadCsv');
    const copyJsonButton = document.getElementById('generateChmodShellCopyJson');
    const downloadJsonButton = document.getElementById('generateChmodShellDownloadJson');
    const importJsonButton = document.getElementById('generateChmodShellImportJsonButton');
    const importJsonInput = document.getElementById('generateChmodShellImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.generate-chmod-shell-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.generate-chmod-shell-tab-panel'));

    if (
        !form ||
        !submitButton ||
        !resetButton ||
        !targetInput ||
        !presetInput ||
        !applyPresetButton ||
        !targetTypeInput ||
        !recursiveInput ||
        !verboseInput ||
        scopeOctalBadges.length === 0 ||
        permissionInputs.length === 0 ||
        !setuidInput ||
        !setgidInput ||
        !stickyInput ||
        !numericInput ||
        !numericFeedback ||
        !symbolicInput ||
        !symbolicFeedback ||
        !operationInput ||
        !applyOperationButton ||
        !operationFeedback ||
        !umaskInput ||
        !umaskFileBaseInput ||
        !umaskDirBaseInput ||
        !umaskFileNumeric ||
        !umaskFileSymbolic ||
        !umaskDirNumeric ||
        !umaskDirSymbolic ||
        !umaskFeedback ||
        !resultEmpty ||
        !resultContent ||
        !resultError ||
        !resultSummary ||
        !commandOutput ||
        !lsOutput ||
        !summaryTableBody ||
        !permissionTableBody ||
        !umaskTableBody ||
        !operationsTableBody ||
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

    const resultEmptyDefaultText = resultEmpty.textContent.trim();

    const scopeCatalog = {
        user: {
            short: 'u',
            label: 'User',
            notes: 'Owner permissions on the target.'
        },
        group: {
            short: 'g',
            label: 'Group',
            notes: 'Shared group permissions.'
        },
        others: {
            short: 'o',
            label: 'Others',
            notes: 'Public access for everyone else.'
        }
    };
    const scopeOrder = ['user', 'group', 'others'];
    const permissionCatalog = [
        {
            key: 'read',
            token: 'r',
            weight: 4
        },
        {
            key: 'write',
            token: 'w',
            weight: 2
        },
        {
            key: 'execute',
            token: 'x',
            weight: 1
        }
    ];
    const operationExamples = [
        {
            operation: 'u=rwx,go=rx',
            effect: 'Common executable defaults for scripts and binaries.'
        },
        {
            operation: 'a+rwX',
            effect: 'Add read and write everywhere, with execute only where directory or existing execute rules allow it.'
        },
        {
            operation: 'g+w',
            effect: 'Grant group write without changing other scopes.'
        },
        {
            operation: 'o-rwx',
            effect: 'Remove public access from the current mode.'
        },
        {
            operation: 'u-s,g-s,o-t',
            effect: 'Clear all special bits from the current mode.'
        }
    ];
    const presetCatalog = {
        'deploy-script': {
            mode: '0755',
            target: './deploy.sh',
            targetType: 'file',
            recursive: false,
            verbose: false
        },
        'private-config': {
            mode: '0640',
            target: '/etc/app/config.env',
            targetType: 'file',
            recursive: false,
            verbose: false
        },
        'web-file': {
            mode: '0644',
            target: '/var/www/html/index.php',
            targetType: 'file',
            recursive: false,
            verbose: false
        },
        'web-directory': {
            mode: '0755',
            target: '/var/www/html',
            targetType: 'directory',
            recursive: false,
            verbose: false
        },
        'group-directory': {
            mode: '2775',
            target: '/srv/shared/project',
            targetType: 'directory',
            recursive: true,
            verbose: true
        },
        'shared-temp': {
            mode: '1777',
            target: '/tmp/build-cache',
            targetType: 'directory',
            recursive: false,
            verbose: false
        }
    };

    let permissionState = createBlankState('file');
    let latestResult = null;
    let numericEditorDirty = false;
    let symbolicEditorDirty = false;
    let lastEditedMode = null;
    function initMarkdownCopyButtons() {
        const codeBlocks = document.querySelectorAll('.markdown-content pre');

        codeBlocks.forEach((pre) => {
            const commandNote = pre.nextElementSibling;
            const commandSummary = commandNote && commandNote.classList.contains('generate-chmod-shell-command-note')
                ? commandNote.querySelector('summary')
                : null;

            if (pre.querySelector('.markdown-copy-btn') || (commandSummary && commandSummary.querySelector('.generate-chmod-shell-command-copy-btn'))) {
                return;
            }

            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            const button = document.createElement('button');

            button.type = 'button';
            button.innerHTML = '<i class="bi bi-clipboard"></i><span class="generate-chmod-shell-command-copy-label">Copy</span>';

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

                labelGroup.className = 'generate-chmod-shell-command-note-summary-labels';

                while (commandSummary.firstChild) {
                    labelGroup.appendChild(commandSummary.firstChild);
                }

                button.className = 'generate-chmod-shell-command-copy-btn';
                button.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                commandSummary.appendChild(labelGroup);
                commandSummary.appendChild(button);
                pre.classList.add('generate-chmod-shell-command-pre');

                return;
            }

            button.className = 'markdown-copy-btn';
            button.querySelector('.generate-chmod-shell-command-copy-label').textContent = 'Copy';
            pre.appendChild(button);
        });
    }

    function flashButton(button, text) {
        const label = button.querySelector('[data-button-label]') || button.querySelector('.generate-chmod-shell-command-copy-label');

        if (!label && (button.classList.contains('generate-chmod-shell-row-copy') || (button.closest && button.closest('.tool-table-action-cell')))) {
            const isCopied = text === 'Copied';
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

function createBlankState(targetType) {
        const state = {
            targetType: targetType || 'file',
            permissions: {},
            special: {
                setuid: false,
                setgid: false,
                sticky: false
            }
        };

        scopeOrder.forEach((scope) => {
            state.permissions[scope] = {
                read: false,
                write: false,
                execute: false
            };
        });

        return state;
    }

    function cloneState(state) {
        return JSON.parse(JSON.stringify(state));
    }

    function normalizeTarget(value) {
        return String(value || '').trim();
    }

    function getScopeDigit(scopeState) {
        let total = 0;

        permissionCatalog.forEach((permission) => {
            if (scopeState[permission.key]) {
                total += permission.weight;
            }
        });

        return total;
    }

    function getSpecialDigit(state) {
        let total = 0;

        if (state.special.setuid) {
            total += 4;
        }

        if (state.special.setgid) {
            total += 2;
        }

        if (state.special.sticky) {
            total += 1;
        }

        return total;
    }

    function buildNumericMode(state) {
        return `${getSpecialDigit(state)}${scopeOrder.map((scope) => String(getScopeDigit(state.permissions[scope]))).join('')}`;
    }

    function buildCommandMode(state) {
        const numeric = buildNumericMode(state);

        if (numeric.startsWith('0')) {
            return numeric.slice(1);
        }

        return numeric;
    }

    function buildPlainTriplet(scopeState) {
        return permissionCatalog
            .filter((permission) => scopeState[permission.key])
            .map((permission) => permission.token)
            .join('');
    }

    function buildDisplayTriplet(scopeState) {
        return permissionCatalog
            .map((permission) => scopeState[permission.key] ? permission.token : '-')
            .join('');
    }

    function buildLsTriplet(state, scope) {
        const scopeState = state.permissions[scope];
        const readChar = scopeState.read ? 'r' : '-';
        const writeChar = scopeState.write ? 'w' : '-';
        let executeChar = scopeState.execute ? 'x' : '-';

        if (scope === 'user' && state.special.setuid) {
            executeChar = scopeState.execute ? 's' : 'S';
        }

        if (scope === 'group' && state.special.setgid) {
            executeChar = scopeState.execute ? 's' : 'S';
        }

        if (scope === 'others' && state.special.sticky) {
            executeChar = scopeState.execute ? 't' : 'T';
        }

        return `${readChar}${writeChar}${executeChar}`;
    }

    function buildLsPreview(state) {
        const leadCharacter = state.targetType === 'directory' ? 'd' : '-';

        return `${leadCharacter}${scopeOrder.map((scope) => buildLsTriplet(state, scope)).join('')}`;
    }

    function buildSymbolicMode(state) {
        return scopeOrder
            .map((scope) => `${scopeCatalog[scope].short}=${buildPlainTriplet(state.permissions[scope])}`)
            .join(',');
    }

    function buildTripletSummary(state) {
        return scopeOrder
            .map((scope) => buildDisplayTriplet(state.permissions[scope]))
            .join(' · ');
    }

    function buildSpecialSummary(state) {
        const parts = [];

        if (state.special.setuid) {
            parts.push('u+s');
        }

        if (state.special.setgid) {
            parts.push('g+s');
        }

        if (state.special.sticky) {
            parts.push('o+t');
        }

        if (parts.length === 0) {
            return 'None';
        }

        return parts.join(' · ');
    }

    function hasAnyExecute(state) {
        return scopeOrder.some((scope) => state.permissions[scope].execute);
    }

    function quoteTarget(value) {
        const normalizedValue = normalizeTarget(value);

        if (!normalizedValue) {
            return '';
        }

        if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(normalizedValue)) {
            return normalizedValue;
        }

        return `'${normalizedValue.replaceAll("'", "'\"'\"'")}'`;
    }

    function buildFlagsLabel() {
        const flags = [];

        if (recursiveInput.checked) {
            flags.push('-R');
        }

        if (verboseInput.checked) {
            flags.push('-v');
        }

        if (!flags.length) {
            return 'Standard';
        }

        return flags.join(', ');
    }

    function buildCommand(state, targetValue) {
        const tokens = ['chmod'];

        if (recursiveInput.checked) {
            tokens.push('-R');
        }

        if (verboseInput.checked) {
            tokens.push('-v');
        }

        tokens.push(buildCommandMode(state));

        if (normalizeTarget(targetValue)) {
            tokens.push(quoteTarget(targetValue));
        }

        return tokens.join(' ');
    }

    function parseNumericMode(rawValue) {
        const value = String(rawValue || '').trim();
        let digits = value;

        if (!value) {
            return {
                valid: false,
                error: 'Enter a numeric mode such as 755 or 2755.'
            };
        }

        if (/^[0-7]{3}$/.test(value)) {
            digits = `0${value}`;
        } else if (!/^[0-7]{4}$/.test(value)) {
            return {
                valid: false,
                error: 'Numeric mode must be three or four octal digits.'
            };
        }

        const state = createBlankState('file');
        const specialValue = Number(digits[0]);

        scopeOrder.forEach((scope, index) => {
            const digitValue = Number(digits[index + 1]);

            permissionCatalog.forEach((permission) => {
                state.permissions[scope][permission.key] = Boolean(digitValue & permission.weight);
            });
        });

        state.special.setuid = Boolean(specialValue & 4);
        state.special.setgid = Boolean(specialValue & 2);
        state.special.sticky = Boolean(specialValue & 1);

        return {
            valid: true,
            digits,
            state
        };
    }

    function parseOctalTripletValue(rawValue, label) {
        const value = String(rawValue || '').trim();
        let digits = value;

        if (!value) {
            return {
                valid: false,
                error: `Enter ${label}.`
            };
        }

        if (/^[0-7]{4}$/.test(value) && value.startsWith('0')) {
            digits = value.slice(1);
        } else if (!/^[0-7]{3}$/.test(value)) {
            return {
                valid: false,
                error: `${label} must be three octal digits such as 022, 666, or 777.`
            };
        }

        return {
            valid: true,
            digits,
            number: parseInt(digits, 8)
        };
    }

    function getScopeFromShort(scopeShort) {
        if (scopeShort === 'u') {
            return 'user';
        }

        if (scopeShort === 'g') {
            return 'group';
        }

        return 'others';
    }

    function resolveWhoScopes(whoValue) {
        const characters = String(whoValue || 'a').split('');
        let scopes = [];

        characters.forEach((character) => {
            if (character === 'a') {
                scopes = scopes.concat(['u', 'g', 'o']);
                return;
            }

            if (character === 'u' || character === 'g' || character === 'o') {
                scopes.push(character);
            }
        });

        if (scopes.length === 0) {
            scopes = ['u', 'g', 'o'];
        }

        return scopes.filter((scope, index) => scopes.indexOf(scope) === index);
    }

    function resolveClauseBits(state, targetScopeShort, permissionText) {
        const bits = {
            read: false,
            write: false,
            execute: false
        };

        if (permissionText.includes('r')) {
            bits.read = true;
        }

        if (permissionText.includes('w')) {
            bits.write = true;
        }

        if (permissionText.includes('x')) {
            bits.execute = true;
        }

        if (permissionText.includes('X') && (state.targetType === 'directory' || hasAnyExecute(state))) {
            bits.execute = true;
        }

        ['u', 'g', 'o'].forEach((scopeShort) => {
            if (!permissionText.includes(scopeShort)) {
                return;
            }

            const sourceScope = getScopeFromShort(scopeShort);

            permissionCatalog.forEach((permission) => {
                if (state.permissions[sourceScope][permission.key]) {
                    bits[permission.key] = true;
                }
            });
        });

        return {
            bits,
            setuid: permissionText.includes('s') && targetScopeShort === 'u',
            setgid: permissionText.includes('s') && targetScopeShort === 'g',
            sticky: permissionText.includes('t') && targetScopeShort === 'o'
        };
    }

    function applyOperationClause(state, scopeShorts, operator, permissionText) {
        scopeShorts.forEach((scopeShort) => {
            const scope = getScopeFromShort(scopeShort);
            const scopeState = state.permissions[scope];
            const resolved = resolveClauseBits(state, scopeShort, permissionText);

            if (operator === '=') {
                permissionCatalog.forEach((permission) => {
                    scopeState[permission.key] = resolved.bits[permission.key];
                });

                if (scopeShort === 'u') {
                    state.special.setuid = resolved.setuid;
                }

                if (scopeShort === 'g') {
                    state.special.setgid = resolved.setgid;
                }

                if (scopeShort === 'o') {
                    state.special.sticky = resolved.sticky;
                }

                return;
            }

            if (operator === '+') {
                permissionCatalog.forEach((permission) => {
                    if (resolved.bits[permission.key]) {
                        scopeState[permission.key] = true;
                    }
                });

                if (resolved.setuid) {
                    state.special.setuid = true;
                }

                if (resolved.setgid) {
                    state.special.setgid = true;
                }

                if (resolved.sticky) {
                    state.special.sticky = true;
                }

                return;
            }

            permissionCatalog.forEach((permission) => {
                if (resolved.bits[permission.key]) {
                    scopeState[permission.key] = false;
                }
            });

            if (permissionText.includes('s') && scopeShort === 'u') {
                state.special.setuid = false;
            }

            if (permissionText.includes('s') && scopeShort === 'g') {
                state.special.setgid = false;
            }

            if (permissionText.includes('t') && scopeShort === 'o') {
                state.special.sticky = false;
            }
        });
    }

    function applySymbolicOperations(baseState, rawValue, options) {
        const clauses = String(rawValue || '')
            .split(',')
            .map((clause) => clause.trim())
            .filter(Boolean);
        const nextState = cloneState(baseState);

        nextState.targetType = options && options.targetType ? options.targetType : nextState.targetType;

        if (!clauses.length) {
            throw new Error('Enter at least one symbolic clause.');
        }

        clauses.forEach((clause) => {
            const match = clause.match(/^([ugoa]*)([=+-])([rwxXstugo]*)$/);

            if (!match) {
                throw new Error(`Unsupported symbolic clause: ${clause}`);
            }

            const whoValue = match[1] || 'a';
            const operator = match[2];
            const permissionText = match[3] || '';
            const scopeShorts = resolveWhoScopes(whoValue);

            if (options && options.requireEquals && operator !== '=') {
                throw new Error('Absolute symbolic mode only accepts assignment clauses.');
            }

            if ((operator === '+' || operator === '-') && permissionText === '') {
                throw new Error(`Symbolic clause is missing permission bits: ${clause}`);
            }

            applyOperationClause(nextState, scopeShorts, operator, permissionText);
        });

        return nextState;
    }

    function parseAbsoluteSymbolicMode(rawValue, targetType) {
        try {
            const nextState = applySymbolicOperations(createBlankState(targetType), rawValue, {
                requireEquals: true,
                targetType
            });

            return {
                valid: true,
                state: nextState
            };
        } catch (error) {
            return {
                valid: false,
                error: error.message || 'Invalid symbolic mode.'
            };
        }
    }

    function clearFeedback(element) {
        element.textContent = '';
        element.classList.add('d-none');
        element.classList.remove('generate-chmod-shell-feedback-success', 'generate-chmod-shell-feedback-error');
    }

    function showFeedback(element, type, message) {
        element.textContent = message;
        element.classList.remove('d-none', 'generate-chmod-shell-feedback-success', 'generate-chmod-shell-feedback-error');
        element.classList.add(type === 'error' ? 'generate-chmod-shell-feedback-error' : 'generate-chmod-shell-feedback-success');
    }

    function readStateFromControls() {
        const nextState = createBlankState(targetTypeInput.value);

        permissionInputs.forEach((input) => {
            nextState.permissions[input.dataset.scope][input.dataset.permission] = input.checked;
        });

        nextState.special.setuid = setuidInput.checked;
        nextState.special.setgid = setgidInput.checked;
        nextState.special.sticky = stickyInput.checked;

        return nextState;
    }

    function markPresetManual() {
        if (presetInput.value === 'manual') {
            return;
        }

        presetInput.value = 'manual';
    }

    function syncScopeBadges() {
        scopeOctalBadges.forEach((badge) => {
            const scope = badge.dataset.scopeOctal;

            if (!scope || !permissionState.permissions[scope]) {
                return;
            }

            badge.textContent = String(getScopeDigit(permissionState.permissions[scope]));
        });
    }

    function syncStateUi() {
        targetTypeInput.value = permissionState.targetType;

        permissionInputs.forEach((input) => {
            input.checked = Boolean(permissionState.permissions[input.dataset.scope][input.dataset.permission]);
        });

        setuidInput.checked = permissionState.special.setuid;
        setgidInput.checked = permissionState.special.setgid;
        stickyInput.checked = permissionState.special.sticky;

        syncScopeBadges();

        numericInput.value = buildNumericMode(permissionState);
        symbolicInput.value = buildSymbolicMode(permissionState);
        numericEditorDirty = false;
        symbolicEditorDirty = false;
        lastEditedMode = null;

        clearFeedback(numericFeedback);
        clearFeedback(symbolicFeedback);
        updateUmaskPreview();
    }

    function commitNumericEditor() {
        if (!numericEditorDirty) {
            return true;
        }

        const parsed = parseNumericMode(numericInput.value);

        if (!parsed.valid) {
            showFeedback(numericFeedback, 'error', parsed.error);
            return false;
        }

        permissionState = parsed.state;
        permissionState.targetType = targetTypeInput.value;
        clearFeedback(numericFeedback);
        clearFeedback(symbolicFeedback);
        syncStateUi();

        return true;
    }

    function commitSymbolicEditor() {
        if (!symbolicEditorDirty) {
            return true;
        }

        const parsed = parseAbsoluteSymbolicMode(symbolicInput.value, targetTypeInput.value);

        if (!parsed.valid) {
            showFeedback(symbolicFeedback, 'error', parsed.error);
            return false;
        }

        permissionState = parsed.state;
        permissionState.targetType = targetTypeInput.value;
        clearFeedback(symbolicFeedback);
        clearFeedback(numericFeedback);
        syncStateUi();

        return true;
    }

    function commitPendingEditors() {
        if (lastEditedMode === 'symbolic' && symbolicEditorDirty) {
            return commitSymbolicEditor();
        }

        if (lastEditedMode === 'numeric' && numericEditorDirty) {
            return commitNumericEditor();
        }

        if (!commitNumericEditor()) {
            return false;
        }

        return commitSymbolicEditor();
    }

    function formatFourDigitOctal(numberValue) {
        return `0${Number(numberValue).toString(8).padStart(3, '0')}`;
    }

    function computeUmaskResult() {
        const parsedUmask = parseOctalTripletValue(umaskInput.value, 'a umask');
        const parsedFileBase = parseOctalTripletValue(umaskFileBaseInput.value, 'a file base');
        const parsedDirBase = parseOctalTripletValue(umaskDirBaseInput.value, 'a directory base');

        if (!parsedUmask.valid) {
            return {
                valid: false,
                error: parsedUmask.error
            };
        }

        if (!parsedFileBase.valid) {
            return {
                valid: false,
                error: parsedFileBase.error
            };
        }

        if (!parsedDirBase.valid) {
            return {
                valid: false,
                error: parsedDirBase.error
            };
        }

        const fileResultNumber = parsedFileBase.number & (~parsedUmask.number & 0o777);
        const dirResultNumber = parsedDirBase.number & (~parsedUmask.number & 0o777);
        const fileResultMode = formatFourDigitOctal(fileResultNumber);
        const dirResultMode = formatFourDigitOctal(dirResultNumber);
        const fileState = parseNumericMode(fileResultMode).state;
        const dirState = parseNumericMode(dirResultMode).state;

        fileState.targetType = 'file';
        dirState.targetType = 'directory';

        return {
            valid: true,
            umask: parsedUmask.digits.padStart(3, '0'),
            rows: [
                {
                    item: 'File',
                    base: formatFourDigitOctal(parsedFileBase.number),
                    umask: parsedUmask.digits.padStart(3, '0'),
                    result: fileResultMode,
                    symbolic: buildSymbolicMode(fileState)
                },
                {
                    item: 'Directory',
                    base: formatFourDigitOctal(parsedDirBase.number),
                    umask: parsedUmask.digits.padStart(3, '0'),
                    result: dirResultMode,
                    symbolic: buildSymbolicMode(dirState)
                }
            ]
        };
    }

    function updateUmaskPreview() {
        const result = computeUmaskResult();

        if (!result.valid) {
            umaskFileNumeric.textContent = '--';
            umaskFileSymbolic.textContent = '--';
            umaskDirNumeric.textContent = '--';
            umaskDirSymbolic.textContent = '--';
            showFeedback(umaskFeedback, 'error', result.error);
            return result;
        }

        umaskFileNumeric.textContent = result.rows[0].result;
        umaskFileSymbolic.textContent = result.rows[0].symbolic;
        umaskDirNumeric.textContent = result.rows[1].result;
        umaskDirSymbolic.textContent = result.rows[1].symbolic;
        clearFeedback(umaskFeedback);

        return result;
    }

    function buildWarnings(state, umaskResult) {
        const warnings = [];

        if (!normalizeTarget(targetInput.value)) {
            warnings.push('Target path is blank. The generated command omits the final path token.');
        }

        if (recursiveInput.checked && state.targetType === 'file') {
            warnings.push('Recursive mode is enabled while the target type is set to file. That flag is usually meant for directory trees.');
        }

        if (state.special.setuid && !state.permissions.user.execute) {
            warnings.push('Setuid is enabled without owner execute, so the preview uses uppercase S.');
        }

        if (state.special.setgid && !state.permissions.group.execute) {
            warnings.push('Setgid is enabled without group execute, so the preview uses uppercase S.');
        }

        if (state.special.sticky && !state.permissions.others.execute) {
            warnings.push('Sticky is enabled without others execute, so the preview uses uppercase T.');
        }

        if (state.targetType === 'file' && state.special.sticky) {
            warnings.push('Sticky mode is mainly meaningful on directories. Regular files usually ignore it on modern Linux systems.');
        }

        if (state.targetType === 'directory' && state.permissions.others.write && !state.special.sticky) {
            warnings.push('World-writable directories usually need sticky mode so users cannot delete each other’s files.');
        }

        if (!umaskResult.valid) {
            warnings.push(umaskResult.error);
        }

        return warnings;
    }

    function buildPermissionRows(state) {
        const rows = scopeOrder.map((scope) => ({
            scope: scopeCatalog[scope].label,
            octal: String(getScopeDigit(state.permissions[scope])),
            symbolic: `${scopeCatalog[scope].short}=${buildPlainTriplet(state.permissions[scope])}`,
            preview: buildLsTriplet(state, scope),
            notes: scopeCatalog[scope].notes
        }));

        rows.push({
            scope: 'Special',
            octal: String(getSpecialDigit(state)),
            symbolic: buildSpecialSummary(state),
            preview: `${state.special.setuid ? 'u+s' : 'u-'} · ${state.special.setgid ? 'g+s' : 'g-'} · ${state.special.sticky ? 'o+t' : 'o-'}`,
            notes: 'Leading digit for setuid, setgid, and sticky.'
        });

        return rows;
    }

    function buildSummaryRows(result) {
        return [
            {
                field: 'Numeric',
                value: result.numeric
            },
            {
                field: 'Symbolic',
                value: result.symbolic
            },
            {
                field: 'chmod command',
                value: result.command
            },
            {
                field: 'ls -l preview',
                value: result.lsPreview
            },
            {
                field: 'Target',
                value: result.target || 'Not set'
            },
            {
                field: 'User / Group / Others',
                value: buildTripletSummary(result.state)
            },
            {
                field: 'Special bits',
                value: buildSpecialSummary(result.state)
            }
        ];
    }

    function buildOperationRows(state) {
        return operationExamples.map((example) => {
            try {
                const nextState = applySymbolicOperations(state, example.operation, {
                    targetType: state.targetType
                });

                return {
                    operation: example.operation,
                    effect: example.effect,
                    result: `${buildNumericMode(nextState)} · ${buildSymbolicMode(nextState)}`
                };
            } catch (error) {
                return {
                    operation: example.operation,
                    effect: example.effect,
                    result: 'Invalid for current mode'
                };
            }
        });
    }

    function buildJsonPayload(result) {
        return {
            generated_at: result.generatedAtIso,
            target: result.target,
            target_type: result.targetType,
            recursive: result.recursive,
            verbose: result.verbose,
            numeric: result.numeric,
            command_mode: result.commandMode,
            symbolic: result.symbolic,
            ls_preview: result.lsPreview,
            special_bits: {
                setuid: result.state.special.setuid,
                setgid: result.state.special.setgid,
                sticky: result.state.special.sticky,
                summary: buildSpecialSummary(result.state)
            },
            permissions: scopeOrder.reduce((accumulator, scope) => {
                accumulator[scope] = {
                    read: result.state.permissions[scope].read,
                    write: result.state.permissions[scope].write,
                    execute: result.state.permissions[scope].execute,
                    octal: getScopeDigit(result.state.permissions[scope]),
                    symbolic: buildDisplayTriplet(result.state.permissions[scope])
                };

                return accumulator;
            }, {}),
            summary_rows: result.summaryRows,
            permission_rows: result.permissionRows,
            operation_rows: result.operationRows,
            umask: result.umaskResult.valid ? {
                valid: true,
                umask: result.umaskResult.umask,
                rows: result.umaskResult.rows
            } : {
                valid: false,
                error: result.umaskResult.error
            },
            warnings: result.warnings,
            errors: result.errors
        };
    }

    function buildCsvRows(result, operationRows) {
        const rows = [['section', 'key', 'value']];
        const sortedOperationRows = Array.isArray(operationRows) ? operationRows : result.operationRows;

        result.summaryRows.forEach((row) => {
            rows.push(['summary', row.field, row.value]);
        });

        result.permissionRows.forEach((row) => {
            rows.push(['permission', row.scope, `${row.octal} | ${row.symbolic} | ${row.preview} | ${row.notes}`]);
        });

        sortedOperationRows.forEach((row) => {
            rows.push(['operation', row.operation, `${row.effect} | ${row.result}`]);
        });

        if (result.umaskResult.valid) {
            result.umaskResult.rows.forEach((row) => {
                rows.push(['umask', row.item, `${row.base} | ${row.umask} | ${row.result} | ${row.symbolic}`]);
            });
        } else {
            rows.push(['umask', 'error', result.umaskResult.error]);
        }

        result.warnings.forEach((warning, index) => {
            rows.push(['warning', String(index + 1), warning]);
        });

        result.errors.forEach((errorMessage, index) => {
            rows.push(['error', String(index + 1), errorMessage]);
        });

        return rows;
    }

    function convertRowsToCsv(rows) {
        return rows
            .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
            .join('\n');
    }

    function fallbackActionClipboardText(text) {
        const textarea = document.createElement('textarea');

        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        document.execCommand('copy');

        textarea.remove();
    }

    async function writeActionClipboardText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                fallbackActionClipboardText(text);
                return;
            }
        }

        fallbackActionClipboardText(text);
    }

    async function copyText(value, button) {
        try {
            await writeActionClipboardText(value);
            flashButton(button, 'Copied');
        } catch (error) {
            flashButton(button, 'Failed');
        }
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
        const shell = container.querySelector('.generate-chmod-shell-result-shell') || container;

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

    function activateTab(tabTarget) {
        tabButtons.forEach((button) => {
            const isActive = button.dataset.tabTarget === tabTarget;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        tabPanels.forEach((panel) => {
            const isActive = panel.dataset.tabPanel === tabTarget;
            panel.classList.toggle('active', isActive);
            if (isActive) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
    }

    function renderMessageList(element, messages, emptyLabel) {
        if (!messages.length) {
            element.className = 'generate-chmod-shell-message-list generate-chmod-shell-message-list-empty';
            element.innerHTML = `<li>${escapeHtml(emptyLabel)}</li>`;
            return;
        }

        element.className = 'generate-chmod-shell-message-list';
        element.innerHTML = messages
            .map((message) => `<li>${escapeHtml(message)}</li>`)
            .join('');
    }

    function renderEmptyTableRow(tableBody, colspan, label) {
        tableBody.innerHTML = `<tr class="generate-chmod-shell-empty-row"><td colspan="${colspan}">${escapeHtml(label)}</td></tr>`;
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
        const warningTone = result.warnings.length > 0 ? 'warning' : 'success';
        const resultTone = result.warnings.length > 0 ? 'warning' : 'ready';
        const updatedText = formatDateTime(new Date());

        resultSummary.dataset.resultTone = resultTone;
        resultSummary.dataset.resultLayout = 'command';
        resultSummary.innerHTML = `
            <header class="generate-chmod-shell-result-header" aria-label="Result summary header">
                <div class="generate-chmod-shell-result-header-main">
                    <span class="generate-chmod-shell-result-header-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span>
                    <div class="generate-chmod-shell-result-header-copy">
                        <h2 class="generate-chmod-shell-result-header-title">Result Summary</h2>
                        <p>Overview of the generated chmod command result and key metrics</p>
                    </div>
                </div>
                <div class="generate-chmod-shell-result-header-meta" aria-label="Result summary status">
                    <span class="generate-chmod-shell-result-header-chip generate-chmod-shell-result-chip-ready"><span class="generate-chmod-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span>
                    <span class="generate-chmod-shell-result-header-chip generate-chmod-shell-result-chip-updated"><span class="generate-chmod-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(updatedText)}</span></span>
                </div>
            </header>
            <div class="generate-chmod-shell-result-hero-grid" aria-live="polite">
                <article class="generate-chmod-shell-result-card generate-chmod-shell-result-card-primary" data-result-visual="command" aria-label="Primary command result">
                    <div class="generate-chmod-shell-result-primary-heading generate-chmod-shell-result-visual-copy generate-chmod-shell-result-visual-copy-top"><div class="generate-chmod-shell-result-kicker">Primary Result</div><h3 class="generate-chmod-shell-result-title generate-chmod-shell-result-title-center">Mode result</h3></div>
                    <div class="generate-chmod-shell-result-primary-visual" id="generateChmodShellResultVisual" aria-label="Primary chmod result">
                        <div class="generate-chmod-shell-result-command-output"><code class="generate-chmod-shell-result-command-value">${escapeHtml(`Mode ${result.numeric}`)}</code></div>
                    </div>
                    <div class="generate-chmod-shell-result-visual-copy"><p class="generate-chmod-shell-result-copy generate-chmod-shell-result-copy-center">Compact permission preview for the generated chmod command.</p></div>
                    <span class="generate-chmod-shell-result-card-divider" aria-hidden="true"></span>
                    <div class="generate-chmod-shell-result-chip-row generate-chmod-shell-result-chip-row-center" aria-label="Primary result outcome"><span class="generate-chmod-shell-result-chip generate-chmod-shell-result-chip-outcome generate-chmod-shell-result-chip-ready"><span class="generate-chmod-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>Command Generated</span></span></div>
                </article>
                <article class="generate-chmod-shell-result-card generate-chmod-shell-result-card-summary" aria-label="Command summary">
                    <div class="generate-chmod-shell-result-summary-intro"><span class="generate-chmod-shell-result-card-icon generate-chmod-shell-result-card-icon-summary" aria-hidden="true"><i class="bi bi-terminal"></i></span><div class="generate-chmod-shell-result-summary-copy"><div class="generate-chmod-shell-result-kicker">Descriptive Summary</div><h3 class="generate-chmod-shell-result-title">chmod mode preview</h3><p class="generate-chmod-shell-result-copy">Numeric, symbolic, and ls-style output stay aligned with the current target and permission controls.</p></div></div>
                    <span class="generate-chmod-shell-result-card-divider" aria-hidden="true"></span>
                    <div class="generate-chmod-shell-result-chip-grid" aria-label="Command state">
                        <span class="generate-chmod-shell-result-chip generate-chmod-shell-result-chip-baseline"><span class="generate-chmod-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-folder2"></i></span><span>${escapeHtml(result.targetType === 'directory' ? 'Directory' : 'File')}</span></span>
                        <span class="generate-chmod-shell-result-chip generate-chmod-shell-result-chip-ready"><span class="generate-chmod-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-check2-circle"></i></span><span>${escapeHtml(result.flagsLabel)}</span></span>
                        <span class="generate-chmod-shell-result-chip generate-chmod-shell-result-chip-${warningTone}"><span class="generate-chmod-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-exclamation-triangle"></i></span><span>${escapeHtml(`${result.warnings.length} warning${result.warnings.length === 1 ? '' : 's'}`)}</span></span>
                        <span class="generate-chmod-shell-result-chip generate-chmod-shell-result-chip-baseline"><span class="generate-chmod-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>${escapeHtml(`${result.commandMode} command mode`)}</span></span>
                    </div>
                </article>
            </div>
            <div class="generate-chmod-shell-result-metric-grid" aria-label="Command metrics">
                <article class="generate-chmod-shell-result-metric-card generate-chmod-shell-result-metric-success"><span class="generate-chmod-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-folder2"></i></span><span class="generate-chmod-shell-result-metric-label">Target</span><strong class="generate-chmod-shell-result-metric-value">${escapeHtml(result.target || 'No path')}</strong><span class="generate-chmod-shell-result-metric-copy">Path used in the command.</span><span class="generate-chmod-shell-result-metric-accent" aria-hidden="true"></span></article>
                <article class="generate-chmod-shell-result-metric-card generate-chmod-shell-result-metric-info"><span class="generate-chmod-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-person-check"></i></span><span class="generate-chmod-shell-result-metric-label">Triplets</span><strong class="generate-chmod-shell-result-metric-value">${escapeHtml(buildTripletSummary(result.state))}</strong><span class="generate-chmod-shell-result-metric-copy">Owner, group, and others.</span><span class="generate-chmod-shell-result-metric-accent" aria-hidden="true"></span></article>
                <article class="generate-chmod-shell-result-metric-card generate-chmod-shell-result-metric-accent-tone"><span class="generate-chmod-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-shield-lock"></i></span><span class="generate-chmod-shell-result-metric-label">Special</span><strong class="generate-chmod-shell-result-metric-value">${escapeHtml(buildSpecialSummary(result.state))}</strong><span class="generate-chmod-shell-result-metric-copy">Setuid, setgid, or sticky bits.</span><span class="generate-chmod-shell-result-metric-accent" aria-hidden="true"></span></article>
                <article class="generate-chmod-shell-result-metric-card generate-chmod-shell-result-metric-warning"><span class="generate-chmod-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-file-code"></i></span><span class="generate-chmod-shell-result-metric-label">ls -l</span><strong class="generate-chmod-shell-result-metric-value">${escapeHtml(result.lsPreview)}</strong><span class="generate-chmod-shell-result-metric-copy">Permission string preview.</span><span class="generate-chmod-shell-result-metric-accent" aria-hidden="true"></span></article>
            </div>
        `;
    }

// ns:end family._base.workspace.05_result-summary

// ns:start family._base.workspace.06_output-toolbar
    function updateSortExpandedState() {
        const summaryElement = sortSelect.querySelector('[aria-expanded]');

        if (summaryElement) {
            summaryElement.setAttribute('aria-expanded', sortSelect.open ? 'true' : 'false');
        }
    }

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

// ns:end family._base.workspace.06_output-toolbar
    function getSortedOperationRows(result) {
        if (!result) {
            return [];
        }

        const rows = result.operationRows.map((row, index) => ({
            ...row,
            index
        }));

        if (sortInput.value === 'alphabetical') {
            return rows.sort((left, right) => {
                const leftText = `${left.operation} ${left.effect} ${left.result}`;
                const rightText = `${right.operation} ${right.effect} ${right.result}`;
                const textSort = leftText.localeCompare(rightText, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });

                return textSort !== 0 ? textSort : left.index - right.index;
            });
        }

        if (sortInput.value === 'field' || sortInput.value === 'operation') {
            return rows.sort((left, right) => {
                const operationSort = left.operation.localeCompare(right.operation, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });

                if (operationSort !== 0) {
                    return operationSort;
                }

                return left.index - right.index;
            });
        }

        if (sortInput.value === 'value') {
            return rows.sort((left, right) => {
                const resultSort = left.result.localeCompare(right.result, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });

                return resultSort !== 0 ? resultSort : left.index - right.index;
            });
        }

        if (sortInput.value === 'length') {
            return rows.sort((left, right) => {
                if (left.result.length !== right.result.length) {
                    return right.result.length - left.result.length;
                }

                return left.index - right.index;
            });
        }

        return rows.sort((left, right) => left.index - right.index);
    }

// ns:start family._base.workspace.07_table-output
    function renderTables(result) {
        commandOutput.textContent = result.command;
        lsOutput.textContent = result.lsPreview;

        summaryTableBody.innerHTML = result.summaryRows
            .map((row, index) => `
                <tr>
                    <td class="tool-generated-rownum-cell">${index + 1}</td>
                    <td>${escapeHtml(row.field)}</td>
                    <td>${escapeHtml(row.value)}</td>
                </tr>
            `)
            .join('');

        permissionTableBody.innerHTML = result.permissionRows
            .map((row, index) => `
                <tr>
                    <td class="tool-generated-rownum-cell">${index + 1}</td>
                    <td>${escapeHtml(row.scope)}</td>
                    <td>${escapeHtml(row.octal)}</td>
                    <td>${escapeHtml(row.symbolic)}</td>
                    <td>${escapeHtml(row.preview)}</td>
                    <td>${escapeHtml(row.notes)}</td>
                </tr>
            `)
            .join('');

        if (!result.umaskResult.valid || !result.umaskResult.rows.length) {
            renderEmptyTableRow(umaskTableBody, 6, 'No valid umask calculation is available.');
        } else {
            umaskTableBody.innerHTML = result.umaskResult.rows
                .map((row, index) => `
                    <tr>
                        <td class="tool-generated-rownum-cell">${index + 1}</td>
                        <td>${escapeHtml(row.item)}</td>
                        <td>${escapeHtml(row.base)}</td>
                        <td>${escapeHtml(row.umask)}</td>
                        <td>${escapeHtml(row.result)}</td>
                        <td>${escapeHtml(row.symbolic)}</td>
                    </tr>
                `)
                .join('');
        }

        operationsTableBody.innerHTML = getSortedOperationRows(result)
            .map((row, index) => `
                <tr>
                    <td class="tool-generated-rownum-cell">${index + 1}</td>
                    <td>${escapeHtml(row.operation)}</td>
                    <td>${escapeHtml(row.effect)}</td>
                    <td>${escapeHtml(row.result)}</td>
                    <td class="generate-chmod-shell-table-copy-cell tool-table-action-cell">
                        <button type="button" class="generate-chmod-shell-row-copy generate-chmod-shell-row-copy-btn" data-operation-copy="${escapeHtml(row.result)}" aria-label="Copy operation row ${index + 1}" title="Copy operation row">
                            <i class="bi bi-clipboard" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            `)
            .join('');
    }

// ns:end family._base.workspace.07_table-output
// ns:start family._base.workspace.05_result-summary
// ns:start family.shell.workspace.04_result-text
    function renderResult(result) {
        latestResult = result;
        resultEmpty.classList.add('d-none');
        resultContent.classList.remove('d-none');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        renderSummary(result);
        renderTables(result);
        renderMessageList(warningsList, result.warnings, 'No warnings for the current chmod mode.');
        renderMessageList(errorsList, result.errors, 'No blocking errors for the current chmod mode.');
        renderJsonOutput(result.jsonPayload);
        activateTab('generateChmodShellOperationsPanel');
    }

// ns:end family.shell.workspace.04_result-text
// ns:end family._base.workspace.05_result-summary
    function showErrorState(message) {
        resultEmpty.classList.add('d-none');
        resultContent.classList.add('d-none');
        resultError.classList.remove('d-none');
        resultError.textContent = message;
    }

    function showEmptyState(message) {
        latestResult = null;
        resultEmpty.textContent = message || resultEmptyDefaultText;
        resultEmpty.classList.remove('d-none');
        resultContent.classList.add('d-none');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        resultSummary.innerHTML = '';
        commandOutput.textContent = '';
        lsOutput.textContent = '';
        summaryTableBody.innerHTML = '';
        permissionTableBody.innerHTML = '';
        umaskTableBody.innerHTML = '';
        operationsTableBody.innerHTML = '';
        warningsList.innerHTML = '';
        errorsList.innerHTML = '';
        jsonOutput.innerHTML = '';
        activateTab('generateChmodShellOperationsPanel');
    }

    function setSubmitButtonLabel(label) {
        submitButton.innerHTML = `<i class="bi bi-terminal" aria-hidden="true"></i><span>${escapeHtml(label)}</span>`;
    }

    function setGeneratingState(isLoading) {
        submitButton.disabled = isLoading;
        setSubmitButtonLabel(isLoading ? 'Generating...' : 'Generate');
    }

// ns:start family._base.workspace.03_custom-settings
    function buildResult() {
        if (!commitPendingEditors()) {
            throw new Error('Fix the direct editing fields before generating the chmod command.');
        }

        permissionState.targetType = targetTypeInput.value;

        const state = cloneState(permissionState);
        const umaskResult = updateUmaskPreview();
        const numeric = buildNumericMode(state);
        const commandMode = buildCommandMode(state);
        const result = {
            generatedAtIso: new Date().toISOString(),
            state,
            target: normalizeTarget(targetInput.value),
            targetType: state.targetType,
            recursive: recursiveInput.checked,
            verbose: verboseInput.checked,
            numeric,
            commandMode,
            symbolic: buildSymbolicMode(state),
            lsPreview: buildLsPreview(state),
            flagsLabel: buildFlagsLabel(),
            command: buildCommand(state, targetInput.value),
            permissionRows: buildPermissionRows(state),
            operationRows: buildOperationRows(state),
            umaskResult,
            warnings: [],
            errors: []
        };

        result.summaryRows = buildSummaryRows(result);
        result.warnings = buildWarnings(state, umaskResult);
        result.jsonPayload = buildJsonPayload(result);
        result.csvRows = buildCsvRows(result);

        return result;
    }

// ns:end family._base.workspace.03_custom-settings
    function syncUrlState(result) {
        const params = new URLSearchParams();

        params.set('mode', result.numeric);
        params.set('type', result.targetType);

        if (result.target) {
            params.set('target', result.target);
        }

        if (recursiveInput.checked) {
            params.set('recursive', '1');
        }

        if (verboseInput.checked) {
            params.set('verbose', '1');
        }

        const umaskResult = computeUmaskResult();

        if (umaskResult.valid) {
            params.set('umask', umaskResult.umask);
            params.set('fbase', umaskResult.rows[0].base.slice(1));
            params.set('dbase', umaskResult.rows[1].base.slice(1));
        }

        const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;

        window.history.replaceState({}, '', nextUrl);
    }

// ns:start family._base.workspace.01_input-brief
    function generateAndRender() {
        setGeneratingState(true);

        try {
            const result = buildResult();

            renderResult(result);
            syncUrlState(result);
        } catch (error) {
            showErrorState(error.message || 'Failed to generate the chmod command.');
        } finally {
            setGeneratingState(false);
        }
    }

// ns:end family._base.workspace.01_input-brief
// ns:start family._base.workspace.02_basic-settings
    function applyPreset(presetKey) {
        if (presetKey === 'manual') {
            return;
        }

        const preset = presetCatalog[presetKey] || presetCatalog['deploy-script'];
        const parsed = parseNumericMode(preset.mode);

        if (!parsed.valid) {
            return;
        }

        targetInput.value = preset.target;
        targetTypeInput.value = preset.targetType;
        recursiveInput.checked = preset.recursive;
        verboseInput.checked = preset.verbose;
        presetInput.value = presetKey;
        permissionState = parsed.state;
        permissionState.targetType = preset.targetType;
        operationInput.value = '';
        clearFeedback(operationFeedback);
        syncStateUi();
    }

// ns:end family._base.workspace.02_basic-settings
    function applyOperationValue(rawOperation) {
        if (!commitPendingEditors()) {
            throw new Error('Fix the direct editing fields before applying a symbolic operation.');
        }

        const value = String(rawOperation || '').trim();

        if (!value) {
            throw new Error('Enter a symbolic operation such as a+rwX or g=u.');
        }

        permissionState = applySymbolicOperations(permissionState, value, {
            targetType: targetTypeInput.value
        });
        permissionState.targetType = targetTypeInput.value;
        operationInput.value = value;
        syncStateUi();
        showFeedback(operationFeedback, 'success', `Applied ${value}.`);
    }

    function getImportedPayload(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('The selected JSON file does not contain a chmod payload.');
        }

        return payload.query && typeof payload.query === 'object' && !Array.isArray(payload.query)
            ? payload.query
            : payload;
    }

    function buildImportedPayloadState(payload) {
        return getImportedPayload(payload);
    }

    function getImportedText(payload, key, fallback) {
        const value = payload[key];

        return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback;
    }

    function getImportedBoolean(payload, key, fallback) {
        const value = payload[key];

        if (typeof value === 'boolean') {
            return value;
        }

        if (value === 'true' || value === '1' || value === 1) {
            return true;
        }

        if (value === 'false' || value === '0' || value === 0) {
            return false;
        }

        return fallback;
    }

    function applyImportedPayload(payload) {
        const importedPayload = buildImportedPayloadState(payload);
        const modeValue = getImportedText(importedPayload, 'numeric', getImportedText(importedPayload, 'command_mode', ''));
        const parsedMode = modeValue ? parseNumericMode(modeValue) : null;

        if (!parsedMode || !parsedMode.valid) {
            throw new Error('The selected JSON file does not include a restorable chmod mode.');
        }

        permissionState = parsedMode.state;
        permissionState.targetType = importedPayload.target_type === 'directory' ? 'directory' : 'file';
        targetInput.value = getImportedText(importedPayload, 'target', presetCatalog['deploy-script'].target);
        targetTypeInput.value = permissionState.targetType;
        recursiveInput.checked = getImportedBoolean(importedPayload, 'recursive', false);
        verboseInput.checked = getImportedBoolean(importedPayload, 'verbose', false);

        if (importedPayload.umask && typeof importedPayload.umask === 'object' && !Array.isArray(importedPayload.umask)) {
            umaskInput.value = getImportedText(importedPayload.umask, 'umask', umaskInput.value);

            if (Array.isArray(importedPayload.umask.rows)) {
                const fileRow = importedPayload.umask.rows.find((row) => row && row.item === 'file');
                const directoryRow = importedPayload.umask.rows.find((row) => row && row.item === 'directory');

                if (fileRow) {
                    umaskFileBaseInput.value = getImportedText(fileRow, 'base', umaskFileBaseInput.value).replace(/^0/, '');
                }

                if (directoryRow) {
                    umaskDirBaseInput.value = getImportedText(directoryRow, 'base', umaskDirBaseInput.value).replace(/^0/, '');
                }
            }
        }

        presetInput.value = 'manual';
        operationInput.value = '';
        clearFeedback(operationFeedback);
        clearFeedback(numericFeedback);
        clearFeedback(symbolicFeedback);
        clearFeedback(umaskFeedback);
        syncStateUi();
        generateAndRender();
    }

    function restoreStateFromQuery() {
        const params = new URLSearchParams(window.location.search);

        if (!params.toString()) {
            return false;
        }

        const modeValue = params.get('mode');
        const parsedMode = modeValue ? parseNumericMode(modeValue) : null;

        if (parsedMode && parsedMode.valid) {
            permissionState = parsedMode.state;
        } else {
            permissionState = parseNumericMode(presetCatalog['deploy-script'].mode).state;
        }

        permissionState.targetType = params.get('type') === 'directory' ? 'directory' : 'file';
        targetInput.value = params.get('target') || presetCatalog['deploy-script'].target;
        targetTypeInput.value = permissionState.targetType;
        recursiveInput.checked = params.get('recursive') === '1';
        verboseInput.checked = params.get('verbose') === '1';

        if (params.get('umask')) {
            umaskInput.value = params.get('umask');
        }

        if (params.get('fbase')) {
            umaskFileBaseInput.value = params.get('fbase');
        }

        if (params.get('dbase')) {
            umaskDirBaseInput.value = params.get('dbase');
        }

        presetInput.value = 'manual';
        syncStateUi();

        return true;
    }

    document.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof Node)) {
            return;
        }

    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
        }
    });

    initMarkdownCopyButtons();

    if (!restoreStateFromQuery()) {
        applyPreset('deploy-script');
    }

    permissionInputs.forEach((input) => {
        input.addEventListener('change', function () {
            permissionState = readStateFromControls();
            operationInput.value = '';
            clearFeedback(operationFeedback);
            markPresetManual();
            syncStateUi();

            if (latestResult) {
                generateAndRender();
            }
        });
    });

    [setuidInput, setgidInput, stickyInput].forEach((input) => {
        input.addEventListener('change', function () {
            permissionState = readStateFromControls();
            operationInput.value = '';
            clearFeedback(operationFeedback);
            markPresetManual();
            syncStateUi();

            if (latestResult) {
                generateAndRender();
            }
        });
    });

    targetTypeInput.addEventListener('change', function () {
        permissionState.targetType = targetTypeInput.value;
        operationInput.value = '';
        clearFeedback(operationFeedback);
        markPresetManual();
        syncStateUi();

        if (latestResult) {
            generateAndRender();
        }
    });

    recursiveInput.addEventListener('change', function () {
        markPresetManual();

        if (latestResult) {
            generateAndRender();
        }
    });

    verboseInput.addEventListener('change', function () {
        markPresetManual();

        if (latestResult) {
            generateAndRender();
        }
    });

    targetInput.addEventListener('change', function () {
        markPresetManual();

        if (latestResult) {
            generateAndRender();
        }
    });

    numericInput.addEventListener('input', function () {
        numericEditorDirty = true;
        lastEditedMode = 'numeric';
        clearFeedback(numericFeedback);
    });

    numericInput.addEventListener('change', function () {
        if (!commitNumericEditor()) {
            return;
        }

        markPresetManual();

        if (latestResult) {
            generateAndRender();
        }
    });

    symbolicInput.addEventListener('input', function () {
        symbolicEditorDirty = true;
        lastEditedMode = 'symbolic';
        clearFeedback(symbolicFeedback);
    });

    symbolicInput.addEventListener('change', function () {
        if (!commitSymbolicEditor()) {
            return;
        }

        markPresetManual();

        if (latestResult) {
            generateAndRender();
        }
    });

    applyOperationButton.addEventListener('click', function () {
        try {
            applyOperationValue(operationInput.value);
            markPresetManual();
            generateAndRender();
        } catch (error) {
            showFeedback(operationFeedback, 'error', error.message || 'Failed to apply the symbolic operation.');
        }
    });

    quickOperationButtons.forEach((button) => {
        button.addEventListener('click', function () {
            operationInput.value = button.dataset.operation || '';

            try {
                applyOperationValue(operationInput.value);
                markPresetManual();
                generateAndRender();
            } catch (error) {
                showFeedback(operationFeedback, 'error', error.message || 'Failed to apply the symbolic operation.');
            }
        });
    });

    [umaskInput, umaskFileBaseInput, umaskDirBaseInput].forEach((input) => {
        input.addEventListener('input', function () {
            updateUmaskPreview();
        });

        input.addEventListener('change', function () {
            updateUmaskPreview();

            if (latestResult) {
                generateAndRender();
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateAndRender();
    });

    resetButton.addEventListener('click', function () {
        applyPreset('deploy-script');
        clearFeedback(numericFeedback);
        clearFeedback(symbolicFeedback);
        clearFeedback(operationFeedback);
        clearFeedback(umaskFeedback);
        showEmptyState();
        setGeneratingState(false);
        window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`);
    });

    applyPresetButton.addEventListener('click', function () {
        applyPreset(presetInput.value);
        generateAndRender();
    });

    presetInput.addEventListener('change', function () {
    });

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

    operationsTableBody.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const copyButton = target.closest('.generate-chmod-shell-row-copy, .generate-chmod-shell-row-copy-btn');

        if (!copyButton || !operationsTableBody.contains(copyButton)) {
            return;
        }

        const copyValue = copyButton.getAttribute('data-operation-copy');

        if (copyValue === null) {
            return;
        }

        copyText(copyValue, copyButton);
    });

    updateSortState();

    sortOptionButtons.forEach((button) => {
        button.addEventListener('click', function () {
            sortInput.value = button.dataset.sortValue || 'id';
            updateSortState();

            if (latestResult) {
                renderTables(latestResult);
            }
        });
    });

    sortSelect.addEventListener('toggle', updateSortExpandedState);

    copyCommandButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(latestResult.command, copyCommandButton);
    });

    exportPdfButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        exportResultShellAsPdf('generate-chmod-shell', resultContent);
        flashButton(exportPdfButton, 'Opened');
    });

    downloadCsvButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile(
            'generate-chmod-shell.csv',
            `${convertRowsToCsv(buildCsvRows(latestResult, getSortedOperationRows(latestResult)))}\n`,
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

        downloadFile('generate-chmod-shell.json', `${JSON.stringify(latestResult.jsonPayload, null, 2)}\n`, 'application/json;charset=utf-8');
        flashButton(downloadJsonButton, 'Downloaded');
    });

    // ns:start family._base.workspace.08_json-restore
    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });

    importJsonInput.addEventListener('change', async function () {
        const file = importJsonInput.files && importJsonInput.files[0];

        if (!file) {
            return;
        }

        try {
            applyImportedPayload(JSON.parse(await file.text()));
            flashButton(importJsonButton, 'Imported');
        } catch (error) {
            showErrorState(error instanceof Error ? error.message : 'The selected JSON file could not be imported.');
            flashButton(importJsonButton, 'Failed');
        } finally {
            importJsonInput.value = '';
        }
    });
    // ns:end family._base.workspace.08_json-restore

    updateUmaskPreview();
    syncStateUi();
    generateAndRender();
});
/* ns:start family._base.workspace.07_table-output */
(function setupGenerateChmodShellTableOutputStandard() {
    const rootSelector = '.generate-chmod-shell-tool';
    const tableSelector = '.tool-result-table tbody tr, .generate-chmod-shell-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .generate-chmod-shell-table tbody';
    const clampClass = 'generate-chmod-shell-table-cell-text';
    const cellClampClass = 'generate-chmod-shell-cell-clamp';
    const statusColumnClass = 'generate-chmod-shell-table-status-cell';

    function hasActionColumn(cells, table) {
        const lastCell = cells[cells.length - 1];
        const lastHead = table ? table.querySelector('thead th:last-child') : null;
        const headText = lastHead ? String(lastHead.textContent || '') : '';

        return Boolean(
            lastCell && lastCell.querySelector('button, [data-copy-row], [data-inventory-copy-row], [data-control-copy-row], [data-options-copy], [data-operation-copy], [data-copy-value]')
        ) || /copy|action|actions/i.test(headText);
    }

    function isStatusLikeHeader(text) {
        return /^(status|signal|criticality|severity|state|health|outcome|result|level|label)$/i.test(String(text || '').trim());
    }

    function getBodyCells(row) {
        return Array.from(row.children).filter(function filterCells(cell) {
            return cell.tagName && cell.tagName.toLowerCase() === 'td';
        });
    }

    function applyStatusAlignment(root) {
        root.querySelectorAll('.tool-result-table, .generate-chmod-shell-table').forEach(function alignStatusTable(table) {
            const headers = Array.from(table.querySelectorAll('thead th'));
            const rows = Array.from(table.querySelectorAll('tbody tr'));

            table.querySelectorAll('.' + statusColumnClass).forEach(function clearStatusCell(cell) {
                cell.classList.remove(statusColumnClass);
            });

            headers.forEach(function alignStatusColumn(header, index) {
                const statusLike = isStatusLikeHeader(header.textContent);
                header.classList.toggle(statusColumnClass, statusLike);

                if (!statusLike) {
                    return;
                }

                rows.forEach(function alignStatusCell(row) {
                    const cells = getBodyCells(row);
                    const cell = cells[index];

                    if (cell && cell.colSpan <= 1) {
                        cell.classList.add(statusColumnClass);
                    }
                });
            });
        });
    }

    function clampCell(cell) {
        if (!cell || cell.colSpan > 1 || cell.querySelector('.' + clampClass + ', .' + cellClampClass)) {
            return;
        }

        if (cell.children.length === 1 && !cell.firstElementChild.matches('button')) {
            cell.firstElementChild.classList.add(clampClass);
            return;
        }

        const wrapper = document.createElement('span');
        wrapper.className = clampClass;

        while (cell.firstChild) {
            wrapper.appendChild(cell.firstChild);
        }

        cell.appendChild(wrapper);
    }

    function applyTableOutputClamp() {
        const root = document.querySelector(rootSelector);
        if (!root) {
            return;
        }

        applyStatusAlignment(root);

        root.querySelectorAll(tableSelector).forEach(function clampRow(row) {
            const cells = getBodyCells(row);
            const table = row.closest('table');
            const actionColumn = hasActionColumn(cells, table);

            cells.forEach(function clampDataCell(cell, index) {
                const isFirst = index === 0;
                const isAction = actionColumn && index === cells.length - 1;

                if (isAction && cell.colSpan <= 1) {
                    cell.classList.add('tool-table-action-cell');
                    return;
                }

                if (!isFirst) {
                    clampCell(cell);
                }
            });
        });
    }

    function observeTables() {
        const root = document.querySelector(rootSelector);
        if (!root) {
            return;
        }

        root.querySelectorAll(tbodySelector).forEach(function observeBody(tbody) {
            if (tbody.dataset.tableOutputClampObserver === 'true') {
                return;
            }

            tbody.dataset.tableOutputClampObserver = 'true';
            new MutationObserver(applyTableOutputClamp).observe(tbody, {
                childList: true,
                subtree: true
            });
        });

        applyTableOutputClamp();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeTables);
    } else {
        observeTables();
    }
}());
/* ns:end family._base.workspace.07_table-output */
