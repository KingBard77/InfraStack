// custom.js

// ns:start family._base.workspace.00_shell
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.00_shell

function initializeInfraStackCustomDropdowns(root) {
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
            const selectedValue = value || targetInput.value || (options[0] ? options[0].dataset.customDropdownValue : '');
            let selectedOption = options.find(function (option) {
                return option.dataset.customDropdownValue === selectedValue;
            }) || options[0];

            if (!selectedOption) {
                return;
            }

            const nextValue = selectedOption.dataset.customDropdownValue || '';

            if (targetInput.value !== nextValue) {
                targetInput.value = nextValue;
            }
            label.textContent = selectedOption.textContent.trim();
            options.forEach(function (option) {
                const isActive = option === selectedOption;

                option.classList.toggle('active', isActive);
                option.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }

        if (targetInput instanceof HTMLInputElement && !targetInput.dataset.customDropdownValueProxy) {
            const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

            if (descriptor && descriptor.get && descriptor.set) {
                Object.defineProperty(targetInput, 'value', {
                    configurable: true,
                    get: function () {
                        return descriptor.get.call(this);
                    },
                    set: function (nextValue) {
                        descriptor.set.call(this, nextValue);
                        window.requestAnimationFrame(function () {
                            sync(String(nextValue || ''));
                        });
                    }
                });
                targetInput.dataset.customDropdownValueProxy = 'true';
            }
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

installInfraStackResultSummaryNormalizer('generate-crontab-shell');
// ns:end family._base.workspace.05_result-summary

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('generateCrontabShellForm');
    const submitButton = document.getElementById('generateCrontabShellSubmit');
    const resetButton = document.getElementById('generateCrontabShellReset');
    const commandInput = document.getElementById('generateCrontabShellCommand');
    const presetInput = document.getElementById('generateCrontabShellPreset');
    const applyPresetButton = document.getElementById('generateCrontabShellApplyPreset');
    const macroInput = document.getElementById('generateCrontabShellMacro');
    const macroNote = document.getElementById('generateCrontabShellMacroNote');
    const parseInput = document.getElementById('generateCrontabShellParseInput');
    const parseButton = document.getElementById('generateCrontabShellParseButton');
    const parseClearButton = document.getElementById('generateCrontabShellParseClear');
    const parseFeedback = document.getElementById('generateCrontabShellParseFeedback');
    const userInput = document.getElementById('generateCrontabShellUser');
    const mailtoInput = document.getElementById('generateCrontabShellMailto');
    const shellInput = document.getElementById('generateCrontabShellShell');
    const pathInput = document.getElementById('generateCrontabShellPath');
    const timezoneInput = document.getElementById('generateCrontabShellTimezone');
    const commentInput = document.getElementById('generateCrontabShellComment');
    const resultEmpty = document.getElementById('generateCrontabShellResultEmpty');
    const resultContent = document.getElementById('generateCrontabShellResultContent');
    const resultError = document.getElementById('generateCrontabShellResultError');
    const resultSummary = document.getElementById('generateCrontabShellResultSummary');
    const expressionOutput = document.getElementById('generateCrontabShellExpressionOutput');
    const lineOutput = document.getElementById('generateCrontabShellLineOutput');
    const upcomingTableBody = document.getElementById('generateCrontabShellUpcomingTableBody');
    const metadataTableBody = document.getElementById('generateCrontabShellMetadataTableBody');
    const fieldsTableBody = document.getElementById('generateCrontabShellFieldsTableBody');
    const warningsList = document.getElementById('generateCrontabShellWarningsList');
    const errorsList = document.getElementById('generateCrontabShellErrorsList');
    const jsonOutput = document.getElementById('generateCrontabShellJsonOutput');
    const sortInput = document.getElementById('generateCrontabShellSort');
    const sortSummary = document.getElementById('generateCrontabShellSortSummary');
    const sortOptionButtons = Array.from(document.querySelectorAll('.generate-crontab-shell-sort-option[data-sort-value]'));
    const sortSelect = document.getElementById('generateCrontabShellSortSelect');
    const copyExpressionButton = document.getElementById('generateCrontabShellCopyExpression');
    const copyLineButton = document.getElementById('generateCrontabShellCopyLine');
    const exportPdfButton = document.getElementById('generateCrontabShellExportPdf');
    const downloadCsvButton = document.getElementById('generateCrontabShellDownloadCsv');
    const copyJsonButton = document.getElementById('generateCrontabShellCopyJson');
    const downloadJsonButton = document.getElementById('generateCrontabShellDownloadJson');
    const importJsonButton = document.getElementById('generateCrontabShellImportJsonButton');
    const importJsonInput = document.getElementById('generateCrontabShellImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.generate-crontab-shell-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.generate-crontab-shell-tab-panel'));
    const fieldCards = Array.from(document.querySelectorAll('.generate-crontab-shell-field-card'));

    if (
        !form ||
        !submitButton ||
        !resetButton ||
        !commandInput ||
        !presetInput ||
        !applyPresetButton ||
        !macroInput ||
        !macroNote ||
        !parseInput ||
        !parseButton ||
        !parseClearButton ||
        !parseFeedback ||
        !userInput ||
        !mailtoInput ||
        !shellInput ||
        !pathInput ||
        !timezoneInput ||
        !commentInput ||
        !resultEmpty ||
        !resultContent ||
        !resultError ||
        !resultSummary ||
        !expressionOutput ||
        !lineOutput ||
        !upcomingTableBody ||
        !metadataTableBody ||
        !fieldsTableBody ||
        !warningsList ||
        !errorsList ||
        !jsonOutput ||
        !sortInput ||
        !sortSummary ||
        !sortSelect ||
        sortOptionButtons.length === 0 ||
        !copyExpressionButton ||
        !copyLineButton ||
        !exportPdfButton ||
        !downloadCsvButton ||
        !copyJsonButton ||
        !downloadJsonButton ||
        !importJsonButton ||
        !importJsonInput ||
        tabButtons.length === 0 ||
        tabPanels.length === 0 ||
        fieldCards.length === 0
    ) {
        return;
    }

    const monthNames = {
        JAN: 1,
        FEB: 2,
        MAR: 3,
        APR: 4,
        MAY: 5,
        JUN: 6,
        JUL: 7,
        AUG: 8,
        SEP: 9,
        OCT: 10,
        NOV: 11,
        DEC: 12
    };
    const monthLabels = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    };
    const dayNames = {
        SUN: 0,
        MON: 1,
        TUE: 2,
        WED: 3,
        THU: 4,
        FRI: 5,
        SAT: 6
    };
    const dayLabels = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    };
    const fieldOrder = ['minute', 'hour', 'day_of_month', 'month', 'day_of_week'];
    const fieldCatalog = {
        minute: {
            label: 'Minute',
            singular: 'minute',
            plural: 'minutes',
            min: 0,
            max: 59,
            supportsNames: false
        },
        hour: {
            label: 'Hour',
            singular: 'hour',
            plural: 'hours',
            min: 0,
            max: 23,
            supportsNames: false
        },
        day_of_month: {
            label: 'Day of month',
            singular: 'day',
            plural: 'days',
            min: 1,
            max: 31,
            supportsNames: false
        },
        month: {
            label: 'Month',
            singular: 'month',
            plural: 'months',
            min: 1,
            max: 12,
            supportsNames: true,
            nameMap: monthNames,
            labelMap: monthLabels
        },
        day_of_week: {
            label: 'Day of week',
            singular: 'weekday',
            plural: 'weekdays',
            min: 0,
            max: 7,
            supportsNames: true,
            nameMap: dayNames,
            labelMap: dayLabels
        }
    };
    const macroCatalog = {
        none: {
            label: 'Field expression',
            summary: 'Field expression mode is active. The generated schedule uses the five timing fields below.',
            humanSummary: '',
            previewable: true,
            tokens: null
        },
        '@reboot': {
            label: '@reboot',
            summary: '@reboot runs once when the system boots and does not use calendar fields.',
            humanSummary: 'Runs once when the system boots.',
            previewable: false,
            tokens: null
        },
        '@hourly': {
            label: '@hourly',
            summary: '@hourly replaces the five fields with the equivalent of `0 * * * *`.',
            humanSummary: 'Runs every hour at minute 0.',
            previewable: true,
            tokens: {
                minute: '0',
                hour: '*',
                day_of_month: '*',
                month: '*',
                day_of_week: '*'
            }
        },
        '@daily': {
            label: '@daily',
            summary: '@daily replaces the five fields with the equivalent of `0 0 * * *`.',
            humanSummary: 'Runs every day at 00:00.',
            previewable: true,
            tokens: {
                minute: '0',
                hour: '0',
                day_of_month: '*',
                month: '*',
                day_of_week: '*'
            }
        },
        '@midnight': {
            label: '@midnight',
            summary: '@midnight replaces the five fields with the equivalent of `0 0 * * *`.',
            humanSummary: 'Runs every day at 00:00.',
            previewable: true,
            tokens: {
                minute: '0',
                hour: '0',
                day_of_month: '*',
                month: '*',
                day_of_week: '*'
            }
        },
        '@weekly': {
            label: '@weekly',
            summary: '@weekly replaces the five fields with the equivalent of `0 0 * * 0`.',
            humanSummary: 'Runs every Sunday at 00:00.',
            previewable: true,
            tokens: {
                minute: '0',
                hour: '0',
                day_of_month: '*',
                month: '*',
                day_of_week: '0'
            }
        },
        '@monthly': {
            label: '@monthly',
            summary: '@monthly replaces the five fields with the equivalent of `0 0 1 * *`.',
            humanSummary: 'Runs every month on day 1 at 00:00.',
            previewable: true,
            tokens: {
                minute: '0',
                hour: '0',
                day_of_month: '1',
                month: '*',
                day_of_week: '*'
            }
        },
        '@yearly': {
            label: '@yearly',
            summary: '@yearly replaces the five fields with the equivalent of `0 0 1 1 *`.',
            humanSummary: 'Runs every year on January 1 at 00:00.',
            previewable: true,
            tokens: {
                minute: '0',
                hour: '0',
                day_of_month: '1',
                month: '1',
                day_of_week: '*'
            }
        },
        '@annually': {
            label: '@annually',
            summary: '@annually replaces the five fields with the equivalent of `0 0 1 1 *`.',
            humanSummary: 'Runs every year on January 1 at 00:00.',
            previewable: true,
            tokens: {
                minute: '0',
                hour: '0',
                day_of_month: '1',
                month: '1',
                day_of_week: '*'
            }
        }
    };
    const presetCatalog = {
        'daily-midnight': {
            macro: 'none',
            tokens: {
                minute: '0',
                hour: '0',
                day_of_month: '*',
                month: '*',
                day_of_week: '*'
            }
        },
        'every-five-minutes': {
            macro: 'none',
            tokens: {
                minute: '*/5',
                hour: '*',
                day_of_month: '*',
                month: '*',
                day_of_week: '*'
            }
        },
        'every-fifteen-minutes': {
            macro: 'none',
            tokens: {
                minute: '*/15',
                hour: '*',
                day_of_month: '*',
                month: '*',
                day_of_week: '*'
            }
        },
        'hourly-top': {
            macro: 'none',
            tokens: {
                minute: '0',
                hour: '*',
                day_of_month: '*',
                month: '*',
                day_of_week: '*'
            }
        },
        'weekday-morning': {
            macro: 'none',
            tokens: {
                minute: '30',
                hour: '9',
                day_of_month: '*',
                month: '*',
                day_of_week: '1-5'
            }
        },
        'monthly-first': {
            macro: 'none',
            tokens: {
                minute: '0',
                hour: '3',
                day_of_month: '1',
                month: '*',
                day_of_week: '*'
            }
        },
        'yearly-first': {
            macro: 'none',
            tokens: {
                minute: '0',
                hour: '0',
                day_of_month: '1',
                month: '1',
                day_of_week: '*'
            }
        },
        'macro-hourly': {
            macro: '@hourly',
            tokens: null
        },
        'macro-daily': {
            macro: '@daily',
            tokens: null
        },
        'macro-weekly': {
            macro: '@weekly',
            tokens: null
        },
        'macro-reboot': {
            macro: '@reboot',
            tokens: null
        }
    };
    const fieldElements = {};
    const enhancedSelects = [];
    let latestResult = null;

    fieldCards.forEach((card) => {
        const key = card.dataset.fieldKey;

        if (!key) {
            return;
        }

        fieldElements[key] = {
            card,
            modeButtons: Array.from(card.querySelectorAll('.generate-crontab-shell-mode-btn')),
            simplePanel: card.querySelector('[data-field-panel="simple"]'),
            advancedPanel: card.querySelector('[data-field-panel="advanced"]'),
            kindSelect: card.querySelector('.generate-crontab-shell-field-kind'),
            primaryInput: card.querySelector('.generate-crontab-shell-field-primary'),
            secondaryInput: card.querySelector('.generate-crontab-shell-field-secondary'),
            rawInput: card.querySelector('.generate-crontab-shell-field-raw'),
            hint: card.querySelector('[data-field-hint]'),
            feedback: card.querySelector('[data-field-feedback]'),
            preview: card.querySelector('[data-field-preview]')
        };
    });

    if (fieldOrder.some((fieldKey) => !fieldElements[fieldKey])) {
        return;
    }

    function initMarkdownCopyButtons() {
        const codeBlocks = document.querySelectorAll('.markdown-content pre');

        codeBlocks.forEach((pre) => {
            const commandNote = pre.nextElementSibling;
            const commandSummary = commandNote && commandNote.classList.contains('generate-crontab-shell-command-note')
                ? commandNote.querySelector('summary')
                : null;

            if (pre.querySelector('.markdown-copy-btn') || (commandSummary && commandSummary.querySelector('.generate-crontab-shell-command-copy-btn'))) {
                return;
            }

            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            const button = document.createElement('button');

            button.type = 'button';
            button.innerHTML = '<i class="bi bi-clipboard"></i><span class="generate-crontab-shell-command-copy-label">Copy</span>';

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

                labelGroup.className = 'generate-crontab-shell-command-note-summary-labels';

                while (commandSummary.firstChild) {
                    labelGroup.appendChild(commandSummary.firstChild);
                }

                button.className = 'generate-crontab-shell-command-copy-btn';
                button.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                commandSummary.appendChild(labelGroup);
                commandSummary.appendChild(button);
                pre.classList.add('generate-crontab-shell-command-pre');

                return;
            }

            button.className = 'markdown-copy-btn';
            button.querySelector('.generate-crontab-shell-command-copy-label').textContent = 'Copy';
            pre.appendChild(button);
        });
    }

    function flashButton(button, text) {
        const label = button.querySelector('[data-button-label]') || button.querySelector('.generate-crontab-shell-command-copy-label');

        if (!label && button.classList.contains('generate-crontab-shell-row-copy')) {
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
            button.disabled = entry.select.disabled || button.dataset.disabled === '1';
        });
    }

    function syncAllEnhancedSelects() {
        enhancedSelects.forEach((entry) => {
            syncEnhancedSelect(entry);
        });
    }

    function enhanceNativeSelect(select) {
        if (!select || select.dataset.generateCrontabShellEnhanced === '1') {
            return;
        }

        const wrapper = document.createElement('div');
        const toggle = document.createElement('button');
        const menu = document.createElement('div');
        const optionButtons = [];

        select.dataset.generateCrontabShellEnhanced = '1';
        select.classList.add('generate-crontab-shell-native-select');

        wrapper.className = 'generate-crontab-shell-enhanced-select';

        toggle.type = 'button';
        toggle.className = 'generate-crontab-shell-enhanced-select-toggle';
        toggle.setAttribute('aria-haspopup', 'listbox');
        toggle.setAttribute('aria-expanded', 'false');

        menu.className = 'generate-crontab-shell-enhanced-select-menu';
        menu.setAttribute('role', 'listbox');

        Array.from(select.options).forEach((option) => {
            const optionButton = document.createElement('button');
            optionButton.type = 'button';
            optionButton.className = 'generate-crontab-shell-enhanced-select-option';
            optionButton.dataset.value = option.value;
            optionButton.dataset.disabled = option.disabled ? '1' : '0';
            optionButton.textContent = option.textContent;
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

        select.addEventListener('change', function () {
            syncEnhancedSelect(entry);
        });

        select.addEventListener('input', function () {
            syncEnhancedSelect(entry);
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

        enhancedSelects.push(entry);
        syncEnhancedSelect(entry);
    }

    function normalizeFieldToken(value) {
        return String(value || '')
            .trim()
            .replace(/\s+/g, '')
            .toUpperCase();
    }

    function normalizeMetadataValue(value) {
        return String(value || '').trim();
    }

    function zeroPad(value) {
        return String(value).padStart(2, '0');
    }

    function getCurrentFieldMode(fieldKey) {
        return fieldElements[fieldKey].card.dataset.fieldMode || 'simple';
    }

    function setFieldMode(fieldKey, mode) {
        const entry = fieldElements[fieldKey];

        entry.card.dataset.fieldMode = mode;
        entry.modeButtons.forEach((button) => {
            const isActive = button.dataset.fieldMode === mode;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
        entry.simplePanel.classList.toggle('d-none', mode !== 'simple');
        entry.advancedPanel.classList.toggle('d-none', mode === 'simple');
    }

    function getFieldKindPlaceholders(fieldKey, kind) {
        const config = fieldCatalog[fieldKey];

        if (kind === 'value') {
            if (fieldKey === 'month') {
                return {
                    primary: 'JAN',
                    secondary: ''
                };
            }

            if (fieldKey === 'day_of_week') {
                return {
                    primary: 'MON',
                    secondary: ''
                };
            }

            if (fieldKey === 'day_of_month') {
                return {
                    primary: '1',
                    secondary: ''
                };
            }

            return {
                primary: config.min === 0 ? '0' : String(config.min),
                secondary: ''
            };
        }

        if (kind === 'every_n') {
            return {
                primary: fieldKey === 'month' ? '2' : fieldKey === 'day_of_week' ? '2' : '5',
                secondary: ''
            };
        }

        if (kind === 'range') {
            if (fieldKey === 'month') {
                return {
                    primary: 'JAN',
                    secondary: 'MAR'
                };
            }

            if (fieldKey === 'day_of_week') {
                return {
                    primary: 'MON',
                    secondary: 'FRI'
                };
            }

            if (fieldKey === 'day_of_month') {
                return {
                    primary: '1',
                    secondary: '7'
                };
            }

            if (fieldKey === 'hour') {
                return {
                    primary: '1',
                    secondary: '6'
                };
            }

            return {
                primary: '0',
                secondary: fieldKey === 'minute' ? '30' : '12'
            };
        }

        if (kind === 'list') {
            if (fieldKey === 'month') {
                return {
                    primary: 'JAN,MAR,JUL',
                    secondary: ''
                };
            }

            if (fieldKey === 'day_of_week') {
                return {
                    primary: 'MON,WED,FRI',
                    secondary: ''
                };
            }

            if (fieldKey === 'day_of_month') {
                return {
                    primary: '1,15',
                    secondary: ''
                };
            }

            if (fieldKey === 'hour') {
                return {
                    primary: '0,6,12,18',
                    secondary: ''
                };
            }

            return {
                primary: '0,15,30,45',
                secondary: ''
            };
        }

        return {
            primary: '',
            secondary: ''
        };
    }

    function parseFieldValue(fieldKey, rawValue) {
        const config = fieldCatalog[fieldKey];
        const normalizedValue = normalizeFieldToken(rawValue);

        if (!normalizedValue) {
            return {
                valid: false,
                error: 'Value is required.'
            };
        }

        if (config.supportsNames && config.nameMap && Object.prototype.hasOwnProperty.call(config.nameMap, normalizedValue)) {
            const numericValue = config.nameMap[normalizedValue];

            return {
                valid: true,
                display: normalizedValue,
                rawNumeric: numericValue,
                matchNumeric: numericValue
            };
        }

        if (!/^\d+$/.test(normalizedValue)) {
            return {
                valid: false,
                error: 'Unsupported value.'
            };
        }

        const numericValue = Number(normalizedValue);

        if (!Number.isFinite(numericValue) || numericValue < config.min || numericValue > config.max) {
            return {
                valid: false,
                error: `Value must stay between ${config.min} and ${config.max}.`
            };
        }

        return {
            valid: true,
            display: normalizedValue,
            rawNumeric: numericValue,
            matchNumeric: fieldKey === 'day_of_week' && numericValue === 7 ? 0 : numericValue
        };
    }

    function createRangeValues(fieldKey, startValue, endValue, stepValue) {
        const values = [];

        for (let index = startValue; index <= endValue; index += stepValue) {
            if (fieldKey === 'day_of_week' && index === 7) {
                values.push(0);
            } else {
                values.push(index);
            }
        }

        return values;
    }

    function getFullRangeValues(fieldKey) {
        const config = fieldCatalog[fieldKey];
        const values = [];

        for (let index = config.min; index <= config.max; index += 1) {
            if (fieldKey === 'day_of_week' && index === 7) {
                continue;
            }

            values.push(index);
        }

        return values;
    }

    function validateFieldSegment(fieldKey, segment) {
        if (segment === '*') {
            return {
                valid: true,
                values: getFullRangeValues(fieldKey)
            };
        }

        if (segment.includes('/')) {
            const stepParts = segment.split('/');

            if (stepParts.length !== 2) {
                return {
                    valid: false,
                    error: 'Malformed step syntax.'
                };
            }

            const base = stepParts[0];
            const stepText = stepParts[1];

            if (!/^\d+$/.test(stepText) || Number(stepText) < 1) {
                return {
                    valid: false,
                    error: 'Step must be a positive integer.'
                };
            }

            const stepValue = Number(stepText);

            if (base === '*') {
                const rangeValues = getFullRangeValues(fieldKey);

                return {
                    valid: true,
                    values: rangeValues.filter((_, index) => index % stepValue === 0)
                };
            }

            if (!base.includes('-')) {
                return {
                    valid: false,
                    error: 'Step syntax must use * or a range.'
                };
            }

            const rangeParts = base.split('-');

            if (rangeParts.length !== 2) {
                return {
                    valid: false,
                    error: 'Malformed range.'
                };
            }

            const startValue = parseFieldValue(fieldKey, rangeParts[0]);
            const endValue = parseFieldValue(fieldKey, rangeParts[1]);

            if (!startValue.valid || !endValue.valid) {
                return {
                    valid: false,
                    error: startValue.error || endValue.error
                };
            }

            if (startValue.rawNumeric > endValue.rawNumeric) {
                return {
                    valid: false,
                    error: 'Range start must not exceed range end.'
                };
            }

            return {
                valid: true,
                values: createRangeValues(fieldKey, startValue.rawNumeric, endValue.rawNumeric, stepValue)
            };
        }

        if (segment.includes('-')) {
            const rangeParts = segment.split('-');

            if (rangeParts.length !== 2) {
                return {
                    valid: false,
                    error: 'Malformed range.'
                };
            }

            const startValue = parseFieldValue(fieldKey, rangeParts[0]);
            const endValue = parseFieldValue(fieldKey, rangeParts[1]);

            if (!startValue.valid || !endValue.valid) {
                return {
                    valid: false,
                    error: startValue.error || endValue.error
                };
            }

            if (startValue.rawNumeric > endValue.rawNumeric) {
                return {
                    valid: false,
                    error: 'Range start must not exceed range end.'
                };
            }

            return {
                valid: true,
                values: createRangeValues(fieldKey, startValue.rawNumeric, endValue.rawNumeric, 1)
            };
        }

        const singleValue = parseFieldValue(fieldKey, segment);

        if (!singleValue.valid) {
            return {
                valid: false,
                error: singleValue.error
            };
        }

        return {
            valid: true,
            values: [singleValue.matchNumeric]
        };
    }

    function validateFieldToken(fieldKey, token) {
        const normalizedToken = normalizeFieldToken(token);

        if (!normalizedToken) {
            return {
                valid: false,
                error: 'Value is required.'
            };
        }

        const segments = normalizedToken.split(',');

        if (segments.some((segment) => segment === '')) {
            return {
                valid: false,
                error: 'Malformed comma list.'
            };
        }

        const valueSet = new Set();

        for (const segment of segments) {
            const validation = validateFieldSegment(fieldKey, segment);

            if (!validation.valid) {
                return {
                    valid: false,
                    error: validation.error
                };
            }

            validation.values.forEach((value) => {
                valueSet.add(value);
            });
        }

        return {
            valid: true,
            token: normalizedToken,
            values: Array.from(valueSet).sort((left, right) => left - right)
        };
    }

    function formatFieldValueLabel(fieldKey, value) {
        if (fieldKey === 'month' && fieldCatalog.month.labelMap[value]) {
            return fieldCatalog.month.labelMap[value];
        }

        if (fieldKey === 'day_of_week' && fieldCatalog.day_of_week.labelMap[value]) {
            return fieldCatalog.day_of_week.labelMap[value];
        }

        return String(value);
    }

    function describeFieldToken(fieldKey, token) {
        const config = fieldCatalog[fieldKey];
        const normalizedToken = normalizeFieldToken(token);

        if (normalizedToken === '*') {
            return `Every ${config.plural}.`;
        }

        const everyStepMatch = normalizedToken.match(/^\*\/(\d+)$/);

        if (everyStepMatch) {
            return `Every ${everyStepMatch[1]} ${config.plural}.`;
        }

        const rangeStepMatch = normalizedToken.match(/^([^,-]+)-([^,-]+)\/(\d+)$/);

        if (rangeStepMatch) {
            return `From ${rangeStepMatch[1]} through ${rangeStepMatch[2]}, every ${rangeStepMatch[3]} ${config.singular}${rangeStepMatch[3] === '1' ? '' : 's'}.`;
        }

        const rangeMatch = normalizedToken.match(/^([^,-]+)-([^,-]+)$/);

        if (rangeMatch) {
            return `From ${rangeMatch[1]} through ${rangeMatch[2]}.`;
        }

        if (normalizedToken.includes(',')) {
            return `List of ${config.plural}: ${normalizedToken}.`;
        }

        const singleValue = parseFieldValue(fieldKey, normalizedToken);

        if (singleValue.valid) {
            return `Only ${formatFieldValueLabel(fieldKey, singleValue.matchNumeric)}.`;
        }

        return `Matches ${normalizedToken}.`;
    }

    function buildFieldTokenFromUi(fieldKey, allowIncomplete) {
        const entry = fieldElements[fieldKey];
        const mode = getCurrentFieldMode(fieldKey);

        if (mode === 'advanced') {
            const rawToken = normalizeFieldToken(entry.rawInput.value);

            if (!rawToken) {
                return allowIncomplete ? {
                    valid: false,
                    incomplete: true,
                    token: '',
                    message: 'Enter a raw cron token.'
                } : {
                    valid: false,
                    error: 'Value is required.'
                };
            }

            const validation = validateFieldToken(fieldKey, rawToken);

            if (!validation.valid) {
                return {
                    valid: false,
                    error: validation.error
                };
            }

            return {
                valid: true,
                token: validation.token,
                values: validation.values,
                source: 'Raw'
            };
        }

        const kind = entry.kindSelect.value;
        const primary = normalizeFieldToken(entry.primaryInput.value);
        const secondary = normalizeFieldToken(entry.secondaryInput.value);
        let token = '*';

        if (kind === 'value') {
            if (!primary) {
                return allowIncomplete ? {
                    valid: false,
                    incomplete: true,
                    token: '',
                    message: 'Enter one value.'
                } : {
                    valid: false,
                    error: 'Value is required.'
                };
            }

            token = primary;
        } else if (kind === 'every_n') {
            if (!primary) {
                return allowIncomplete ? {
                    valid: false,
                    incomplete: true,
                    token: '',
                    message: 'Enter an interval.'
                } : {
                    valid: false,
                    error: 'Interval is required.'
                };
            }

            token = `*/${primary}`;
        } else if (kind === 'range') {
            if (!primary || !secondary) {
                return allowIncomplete ? {
                    valid: false,
                    incomplete: true,
                    token: '',
                    message: 'Enter both range endpoints.'
                } : {
                    valid: false,
                    error: 'Both range endpoints are required.'
                };
            }

            token = `${primary}-${secondary}`;
        } else if (kind === 'list') {
            if (!primary) {
                return allowIncomplete ? {
                    valid: false,
                    incomplete: true,
                    token: '',
                    message: 'Enter a comma-separated list.'
                } : {
                    valid: false,
                    error: 'List is required.'
                };
            }

            token = primary;
        }

        const validation = validateFieldToken(fieldKey, token);

        if (!validation.valid) {
            return {
                valid: false,
                error: validation.error
            };
        }

        return {
            valid: true,
            token: validation.token,
            values: validation.values,
            source: kind === 'every' ? 'Simple' : 'Simple'
        };
    }

    function updateFieldCardUi(fieldKey) {
        const entry = fieldElements[fieldKey];
        const kind = entry.kindSelect.value;
        const placeholders = getFieldKindPlaceholders(fieldKey, kind);
        const macroActive = macroInput.value !== 'none';
        const mode = getCurrentFieldMode(fieldKey);
        const showPrimary = kind !== 'every';
        const showSecondary = kind === 'range';

        setFieldMode(fieldKey, mode);

        entry.primaryInput.classList.toggle('d-none', !showPrimary);
        entry.secondaryInput.classList.toggle('d-none', !showSecondary);
        entry.primaryInput.placeholder = placeholders.primary;
        entry.secondaryInput.placeholder = placeholders.secondary;
        entry.card.classList.toggle('is-disabled', macroActive);
        entry.kindSelect.disabled = macroActive;
        entry.primaryInput.disabled = macroActive || !showPrimary;
        entry.secondaryInput.disabled = macroActive || !showSecondary;
        entry.rawInput.disabled = macroActive;
        entry.modeButtons.forEach((button) => {
            button.disabled = macroActive;
        });

        if (macroActive) {
            const macroConfig = macroCatalog[macroInput.value];

            if (macroConfig && macroConfig.tokens && macroConfig.tokens[fieldKey]) {
                entry.preview.textContent = macroConfig.tokens[fieldKey];
                entry.hint.textContent = `${macroConfig.label} supplies this field.`;
            } else {
                entry.preview.textContent = 'n/a';
                entry.hint.textContent = `${macroConfig.label} is event-based and ignores this field.`;
            }

            entry.feedback.classList.add('d-none');
            entry.feedback.classList.remove('is-error', 'is-success');
            entry.feedback.textContent = '';
            return;
        }

        const tokenState = buildFieldTokenFromUi(fieldKey, true);

        if (tokenState.valid) {
            entry.preview.textContent = tokenState.token;
            entry.hint.textContent = describeFieldToken(fieldKey, tokenState.token);
        } else if (tokenState.incomplete) {
            entry.preview.textContent = '...';
            entry.hint.textContent = tokenState.message;
        } else {
            entry.preview.textContent = '!';
            entry.hint.textContent = tokenState.error;
        }
    }

    function clearFieldFeedback(fieldKey) {
        const feedback = fieldElements[fieldKey].feedback;

        feedback.classList.add('d-none');
        feedback.classList.remove('is-error', 'is-success');
        feedback.textContent = '';
    }

    function setFieldFeedback(fieldKey, type, message) {
        const feedback = fieldElements[fieldKey].feedback;

        feedback.classList.remove('d-none', 'is-error', 'is-success');
        feedback.classList.add(type === 'error' ? 'is-error' : 'is-success');
        feedback.textContent = message;
    }

    function clearAllFieldFeedback() {
        fieldOrder.forEach((fieldKey) => {
            clearFieldFeedback(fieldKey);
        });
    }

    function clearParseFeedback() {
        parseFeedback.classList.add('d-none');
        parseFeedback.classList.remove('is-error', 'is-success');
        parseFeedback.textContent = '';
    }

    function setParseFeedback(type, message) {
        parseFeedback.classList.remove('d-none', 'is-error', 'is-success');
        parseFeedback.classList.add(type === 'error' ? 'is-error' : 'is-success');
        parseFeedback.textContent = message;
    }

    function applyTokenToField(fieldKey, token) {
        const entry = fieldElements[fieldKey];
        const normalizedToken = normalizeFieldToken(token);

        clearFieldFeedback(fieldKey);

        if (!normalizedToken || normalizedToken === '*') {
            entry.kindSelect.value = 'every';
            entry.primaryInput.value = '';
            entry.secondaryInput.value = '';
            entry.rawInput.value = '';
            setFieldMode(fieldKey, 'simple');
            updateFieldCardUi(fieldKey);
            return;
        }

        const everyStepMatch = normalizedToken.match(/^\*\/(\d+)$/);

        if (everyStepMatch) {
            entry.kindSelect.value = 'every_n';
            entry.primaryInput.value = everyStepMatch[1];
            entry.secondaryInput.value = '';
            entry.rawInput.value = '';
            setFieldMode(fieldKey, 'simple');
            updateFieldCardUi(fieldKey);
            return;
        }

        const rangeMatch = normalizedToken.match(/^([^,-\/]+)-([^,-\/]+)$/);

        if (rangeMatch) {
            entry.kindSelect.value = 'range';
            entry.primaryInput.value = rangeMatch[1];
            entry.secondaryInput.value = rangeMatch[2];
            entry.rawInput.value = '';
            setFieldMode(fieldKey, 'simple');
            updateFieldCardUi(fieldKey);
            return;
        }

        if (normalizedToken.includes(',')) {
            entry.kindSelect.value = 'list';
            entry.primaryInput.value = normalizedToken;
            entry.secondaryInput.value = '';
            entry.rawInput.value = '';
            setFieldMode(fieldKey, 'simple');
            updateFieldCardUi(fieldKey);
            return;
        }

        const singleValue = parseFieldValue(fieldKey, normalizedToken);

        if (singleValue.valid) {
            entry.kindSelect.value = 'value';
            entry.primaryInput.value = normalizedToken;
            entry.secondaryInput.value = '';
            entry.rawInput.value = '';
            setFieldMode(fieldKey, 'simple');
            updateFieldCardUi(fieldKey);
            return;
        }

        entry.kindSelect.value = 'every';
        entry.primaryInput.value = '';
        entry.secondaryInput.value = '';
        entry.rawInput.value = normalizedToken;
        setFieldMode(fieldKey, 'advanced');
        updateFieldCardUi(fieldKey);
    }

// ns:start family._base.workspace.02_basic-settings
    function applyPreset(presetKey) {
        const preset = presetCatalog[presetKey] || presetCatalog['daily-midnight'];

        macroInput.value = preset.macro;

        if (preset.tokens) {
            fieldOrder.forEach((fieldKey) => {
                applyTokenToField(fieldKey, preset.tokens[fieldKey]);
            });
        }

        syncMacroState();
        syncAllEnhancedSelects();
    }

// ns:end family._base.workspace.02_basic-settings
    function resetFormState() {
        commandInput.value = '/usr/bin/rotate-logs --quiet';
        presetInput.value = 'daily-midnight';
        parseInput.value = '';
        userInput.value = '';
        mailtoInput.value = '';
        shellInput.value = '';
        pathInput.value = '';
        timezoneInput.value = '';
        commentInput.value = '';
        clearParseFeedback();
        clearAllFieldFeedback();
        applyPreset('daily-midnight');
    }

    function syncMacroState() {
        const macroConfig = macroCatalog[macroInput.value] || macroCatalog.none;

        macroNote.textContent = macroConfig.summary;

        fieldOrder.forEach((fieldKey) => {
            updateFieldCardUi(fieldKey);
        });

        syncAllEnhancedSelects();
    }

    function getEffectiveFieldTokens() {
        if (macroInput.value !== 'none') {
            const macroConfig = macroCatalog[macroInput.value];

            if (!macroConfig || !macroConfig.tokens) {
                return null;
            }

            return {
                ...macroConfig.tokens
            };
        }

        const tokens = {};

        for (const fieldKey of fieldOrder) {
            const fieldResult = buildFieldTokenFromUi(fieldKey, false);

            if (!fieldResult.valid) {
                return {
                    error: `${fieldCatalog[fieldKey].label}: ${fieldResult.error}`,
                    fieldKey
                };
            }

            tokens[fieldKey] = fieldResult.token;
        }

        return tokens;
    }

    function buildFieldRows(tokens, modeLabel) {
        if (macroInput.value === '@reboot') {
            return fieldOrder.map((fieldKey) => ({
                field: fieldCatalog[fieldKey].label,
                token: 'n/a',
                source: modeLabel,
                meaning: 'Ignored because @reboot is event-based.'
            }));
        }

        return fieldOrder.map((fieldKey) => ({
            field: fieldCatalog[fieldKey].label,
            token: tokens[fieldKey],
            source: modeLabel,
            meaning: describeFieldToken(fieldKey, tokens[fieldKey])
        }));
    }

    function formatTimeSummary(hourToken, minuteToken) {
        const hourValue = parseFieldValue('hour', hourToken);
        const minuteValue = parseFieldValue('minute', minuteToken);

        if (!hourValue.valid || !minuteValue.valid) {
            return null;
        }

        return `${zeroPad(hourValue.matchNumeric)}:${zeroPad(minuteValue.matchNumeric)}`;
    }

    function isSinglePlainValue(fieldKey, token) {
        const normalizedToken = normalizeFieldToken(token);

        if (!normalizedToken || normalizedToken.includes(',') || normalizedToken.includes('-') || normalizedToken.includes('/')) {
            return false;
        }

        return parseFieldValue(fieldKey, normalizedToken).valid;
    }

    function buildHumanSummary(expression, tokens) {
        if (macroInput.value !== 'none') {
            const macroConfig = macroCatalog[macroInput.value];

            if (macroConfig && macroConfig.humanSummary) {
                return macroConfig.humanSummary;
            }
        }

        const minuteToken = tokens.minute;
        const hourToken = tokens.hour;
        const domToken = tokens.day_of_month;
        const monthToken = tokens.month;
        const dowToken = tokens.day_of_week;
        const timeLabel = formatTimeSummary(hourToken, minuteToken);
        const minuteStep = minuteToken.match(/^\*\/(\d+)$/);
        const hourStep = hourToken.match(/^\*\/(\d+)$/);

        if (expression === '* * * * *') {
            return 'Runs every minute.';
        }

        if (minuteStep && hourToken === '*' && domToken === '*' && monthToken === '*' && dowToken === '*') {
            return `Runs every ${minuteStep[1]} minutes.`;
        }

        if (hourStep && isSinglePlainValue('minute', minuteToken) && domToken === '*' && monthToken === '*' && dowToken === '*') {
            return `Runs every ${hourStep[1]} hours at minute ${normalizeFieldToken(minuteToken)}.`;
        }

        if (timeLabel && domToken === '*' && monthToken === '*' && dowToken === '*') {
            return `Runs every day at ${timeLabel}.`;
        }

        if (timeLabel && domToken === '*' && monthToken === '*' && isSinglePlainValue('day_of_week', dowToken)) {
            const dayValue = parseFieldValue('day_of_week', dowToken);

            return `Runs every ${formatFieldValueLabel('day_of_week', dayValue.matchNumeric)} at ${timeLabel}.`;
        }

        if (timeLabel && isSinglePlainValue('day_of_month', domToken) && monthToken === '*' && dowToken === '*') {
            return `Runs every month on day ${normalizeFieldToken(domToken)} at ${timeLabel}.`;
        }

        if (timeLabel && isSinglePlainValue('day_of_month', domToken) && isSinglePlainValue('month', monthToken) && dowToken === '*') {
            const monthValue = parseFieldValue('month', monthToken);

            return `Runs every year on ${formatFieldValueLabel('month', monthValue.matchNumeric)} ${normalizeFieldToken(domToken)} at ${timeLabel}.`;
        }

        return `Runs when minute is ${minuteToken}, hour is ${hourToken}, day of month is ${domToken}, month is ${monthToken}, and day of week is ${dowToken}.`;
    }

    function buildFullLine(expression, commandValue, userValue) {
        const trimmedCommand = normalizeMetadataValue(commandValue);
        const trimmedUser = normalizeMetadataValue(userValue);

        if (!trimmedCommand) {
            return expression;
        }

        if (trimmedUser) {
            return `${expression} ${trimmedUser} ${trimmedCommand}`;
        }

        return `${expression} ${trimmedCommand}`;
    }

    function buildWarnings(tokens, commandValue, userValue) {
        const warnings = [];

        if (!normalizeMetadataValue(commandValue)) {
            warnings.push('Command is blank, so the copied line contains only the schedule expression.');
        }

        if (normalizeMetadataValue(userValue) && !normalizeMetadataValue(commandValue)) {
            warnings.push('The system user value is ignored while the command field is blank.');
        }

        if (macroInput.value === '@reboot') {
            warnings.push('`@reboot` is event-based, so the upcoming-run preview is intentionally unavailable.');
        }

        if (macroInput.value === 'none' && tokens.day_of_month !== '*' && tokens.day_of_week !== '*') {
            warnings.push('Both day-of-month and day-of-week are restricted. Standard cron matches when either field is true.');
        }

        if (
            normalizeMetadataValue(mailtoInput.value) ||
            normalizeMetadataValue(shellInput.value) ||
            normalizeMetadataValue(pathInput.value) ||
            normalizeMetadataValue(timezoneInput.value) ||
            normalizeMetadataValue(commentInput.value)
        ) {
            warnings.push('Optional metadata is recorded below and in JSON export, but it is not inserted into the generated cron line.');
        }

        return warnings;
    }

    function buildMetadataRows() {
        return [
            {
                field: 'System user',
                value: normalizeMetadataValue(userInput.value) || '-'
            },
            {
                field: 'MAILTO',
                value: normalizeMetadataValue(mailtoInput.value) || '-'
            },
            {
                field: 'SHELL',
                value: normalizeMetadataValue(shellInput.value) || '-'
            },
            {
                field: 'PATH',
                value: normalizeMetadataValue(pathInput.value) || '-'
            },
            {
                field: 'TZ',
                value: normalizeMetadataValue(timezoneInput.value) || '-'
            },
            {
                field: 'Comment',
                value: normalizeMetadataValue(commentInput.value) || '-'
            }
        ];
    }

    function buildScheduleMatcher(tokens) {
        if (!tokens) {
            return null;
        }

        const minuteValues = validateFieldToken('minute', tokens.minute);
        const hourValues = validateFieldToken('hour', tokens.hour);
        const domValues = validateFieldToken('day_of_month', tokens.day_of_month);
        const monthValues = validateFieldToken('month', tokens.month);
        const dowValues = validateFieldToken('day_of_week', tokens.day_of_week);

        if (!minuteValues.valid || !hourValues.valid || !domValues.valid || !monthValues.valid || !dowValues.valid) {
            return null;
        }

        return {
            minute: new Set(minuteValues.values),
            hour: new Set(hourValues.values),
            day_of_month: new Set(domValues.values),
            month: new Set(monthValues.values),
            day_of_week: new Set(dowValues.values),
            domWildcard: tokens.day_of_month === '*',
            dowWildcard: tokens.day_of_week === '*'
        };
    }

    function matchesSchedule(dateValue, matcher) {
        const minuteMatch = matcher.minute.has(dateValue.getMinutes());
        const hourMatch = matcher.hour.has(dateValue.getHours());
        const monthMatch = matcher.month.has(dateValue.getMonth() + 1);
        const domMatch = matcher.day_of_month.has(dateValue.getDate());
        const dowMatch = matcher.day_of_week.has(dateValue.getDay());
        let dayMatch = false;

        if (matcher.domWildcard && matcher.dowWildcard) {
            dayMatch = true;
        } else if (matcher.domWildcard) {
            dayMatch = dowMatch;
        } else if (matcher.dowWildcard) {
            dayMatch = domMatch;
        } else {
            dayMatch = domMatch || dowMatch;
        }

        return minuteMatch && hourMatch && monthMatch && dayMatch;
    }

    function formatDateTime(dateValue) {
        return new Intl.DateTimeFormat(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(dateValue);
    }

    function formatLocalClock(dateValue) {
        return new Intl.DateTimeFormat(undefined, {
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
            month: 'short',
            day: '2-digit'
        }).format(dateValue);
    }

    function formatRelativeTime(dateValue) {
        const differenceMs = dateValue.getTime() - Date.now();
        const totalMinutes = Math.max(0, Math.round(differenceMs / 60000));
        const totalDays = Math.floor(totalMinutes / 1440);
        const totalHours = Math.floor((totalMinutes % 1440) / 60);
        const minutes = totalMinutes % 60;
        const parts = [];

        if (totalDays > 0) {
            parts.push(`${totalDays}d`);
        }

        if (totalHours > 0) {
            parts.push(`${totalHours}h`);
        }

        if (minutes > 0 || parts.length === 0) {
            parts.push(`${minutes}m`);
        }

        return `In ${parts.join(' ')}`;
    }

    function buildUpcomingRuns(tokens) {
        if (macroInput.value === '@reboot') {
            return [];
        }

        const matcher = buildScheduleMatcher(tokens);

        if (!matcher) {
            return [];
        }

        const rows = [];
        const cursor = new Date();
        let iterations = 0;
        const maxIterations = 60 * 24 * 366 * 6;

        cursor.setSeconds(0, 0);
        cursor.setMinutes(cursor.getMinutes() + 1);

        while (rows.length < 5 && iterations < maxIterations) {
            if (matchesSchedule(cursor, matcher)) {
                rows.push({
                    run: formatDateTime(cursor),
                    relative: formatRelativeTime(cursor),
                    localClock: formatLocalClock(cursor)
                });
            }

            cursor.setMinutes(cursor.getMinutes() + 1);
            iterations += 1;
        }

        return rows;
    }

    function buildJsonPayload(result) {
        return {
            generated_at: result.generatedAtIso,
            expression: result.expression,
            full_line: result.fullLine,
            mode: result.modeLabel,
            command: result.command,
            human_summary: result.humanSummary,
            warnings: result.warnings,
            errors: result.errors,
            fields: result.fieldRows.map((row) => ({
                field: row.field,
                token: row.token,
                source: row.source,
                meaning: row.meaning
            })),
            metadata: {
                user: result.metadataRows[0].value === '-' ? '' : result.metadataRows[0].value,
                mailto: result.metadataRows[1].value === '-' ? '' : result.metadataRows[1].value,
                shell: result.metadataRows[2].value === '-' ? '' : result.metadataRows[2].value,
                path: result.metadataRows[3].value === '-' ? '' : result.metadataRows[3].value,
                timezone: result.metadataRows[4].value === '-' ? '' : result.metadataRows[4].value,
                comment: result.metadataRows[5].value === '-' ? '' : result.metadataRows[5].value
            },
            upcoming_runs: result.upcomingRuns
        };
    }

    function buildCsvRows(result, fieldRows) {
        const sortedFieldRows = Array.isArray(fieldRows) ? fieldRows : result.fieldRows;
        const rows = [
            ['section', 'key', 'value'],
            ['summary', 'expression', result.expression],
            ['summary', 'full_line', result.fullLine],
            ['summary', 'mode', result.modeLabel],
            ['summary', 'command', result.command || ''],
            ['summary', 'human_summary', result.humanSummary]
        ];

        sortedFieldRows.forEach((row) => {
            rows.push(['field', row.field, `${row.token} | ${row.source} | ${row.meaning}`]);
        });

        result.metadataRows.forEach((row) => {
            rows.push(['metadata', row.field, row.value === '-' ? '' : row.value]);
        });

        result.warnings.forEach((warning, index) => {
            rows.push(['warning', String(index + 1), warning]);
        });

        result.errors.forEach((errorMessage, index) => {
            rows.push(['error', String(index + 1), errorMessage]);
        });

        result.upcomingRuns.forEach((row, index) => {
            rows.push(['upcoming_run', String(index + 1), `${row.run} | ${row.relative} | ${row.localClock}`]);
        });

        return rows;
    }

    function convertRowsToCsv(rows) {
        return rows
            .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
            .join('\n');
    }

    function copyText(value, button) {
        navigator.clipboard.writeText(value).then(function () {
            flashButton(button, 'Copied');
        }).catch(function () {
            flashButton(button, 'Failed');
        });
    }

    function downloadFile(filename, contents, mimeType) {
        const blob = new Blob([contents], { type: mimeType });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
    }

    function exportResultShellAsPdf(filenameStem, container) {
        const exportWindow = window.open('', '_blank', 'noopener,noreferrer');
        const shell = container.querySelector('.generate-crontab-shell-result-shell') || container;

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

    function renderMessageList(listElement, messages, emptyLabel) {
        if (messages.length === 0) {
            listElement.innerHTML = `<li class="generate-crontab-shell-message-empty">${escapeHtml(emptyLabel)}</li>`;
            return;
        }

        listElement.innerHTML = messages
            .map((message) => `<li>${escapeHtml(message)}</li>`)
            .join('');
    }

    function renderEmptyTableRow(tableBody, colspan, label) {
        tableBody.innerHTML = `<tr class="generate-crontab-shell-empty-row"><td colspan="${colspan}">${escapeHtml(label)}</td></tr>`;
    }

// ns:start family._base.workspace.05_result-summary
    function renderSummary(result) {
        const commandLabel = result.command ? result.command : 'Blank command';
        const nextRunLabel = result.upcomingRuns.length > 0 ? result.upcomingRuns[0].run : (macroInput.value === '@reboot' ? 'Boot event only' : 'No preview found');
        const warningTone = result.warnings.length > 0 ? 'warning' : 'success';
        const previewTone = macroInput.value === '@reboot' ? 'need-work' : 'baseline';
        const resultTone = result.warnings.length > 0 ? 'warning' : 'ready';
        const updatedText = new Date().toLocaleString();

        resultSummary.dataset.resultTone = resultTone;
        resultSummary.dataset.resultLayout = 'command';
        resultSummary.innerHTML = `
            <header class="generate-crontab-shell-result-header" aria-label="Result summary header"><div class="generate-crontab-shell-result-header-main"><span class="generate-crontab-shell-result-header-icon" aria-hidden="true"><i class="bi bi-calendar2-week"></i></span><div class="generate-crontab-shell-result-header-copy"><h2 class="generate-crontab-shell-result-header-title">Result Summary</h2><p>Overview of the generated crontab schedule and key metrics</p></div></div><div class="generate-crontab-shell-result-header-meta" aria-label="Result summary status"><span class="generate-crontab-shell-result-header-chip generate-crontab-shell-result-chip-ready"><span class="generate-crontab-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span><span class="generate-crontab-shell-result-header-chip generate-crontab-shell-result-chip-updated"><span class="generate-crontab-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(updatedText)}</span></span></div></header>
            <div class="generate-crontab-shell-result-hero-grid" aria-live="polite">
                <article class="generate-crontab-shell-result-card generate-crontab-shell-result-card-primary" data-result-visual="command" aria-label="Primary schedule result"><div class="generate-crontab-shell-result-primary-heading generate-crontab-shell-result-visual-copy generate-crontab-shell-result-visual-copy-top"><div class="generate-crontab-shell-result-kicker">Primary Result</div><h3 class="generate-crontab-shell-result-title generate-crontab-shell-result-title-center">Schedule expression</h3></div><div class="generate-crontab-shell-result-primary-visual" id="generateCrontabShellResultVisual" aria-label="Primary schedule expression"><div class="generate-crontab-shell-result-command-output"><code class="generate-crontab-shell-result-command-value">${escapeHtml(result.expression)}</code></div></div><div class="generate-crontab-shell-result-visual-copy"><p class="generate-crontab-shell-result-copy generate-crontab-shell-result-copy-center">Compact cron expression preview for the generated line.</p></div><span class="generate-crontab-shell-result-card-divider" aria-hidden="true"></span><div class="generate-crontab-shell-result-chip-row generate-crontab-shell-result-chip-row-center" aria-label="Primary result outcome"><span class="generate-crontab-shell-result-chip generate-crontab-shell-result-chip-outcome generate-crontab-shell-result-chip-ready"><span class="generate-crontab-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar-event"></i></span><span>Schedule Generated</span></span></div></article>
                <article class="generate-crontab-shell-result-card generate-crontab-shell-result-card-summary" aria-label="Schedule summary"><div class="generate-crontab-shell-result-summary-intro"><span class="generate-crontab-shell-result-card-icon generate-crontab-shell-result-card-icon-summary" aria-hidden="true"><i class="bi bi-calendar2-week"></i></span><div class="generate-crontab-shell-result-summary-copy"><div class="generate-crontab-shell-result-kicker">Descriptive Summary</div><h3 class="generate-crontab-shell-result-title">Crontab schedule preview</h3><p class="generate-crontab-shell-result-copy">The expression, next run preview, and generated line stay tied to the selected schedule mode and command.</p></div></div><span class="generate-crontab-shell-result-card-divider" aria-hidden="true"></span><div class="generate-crontab-shell-result-chip-grid" aria-label="Schedule state"><span class="generate-crontab-shell-result-chip generate-crontab-shell-result-chip-baseline"><span class="generate-crontab-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-clock"></i></span><span>${escapeHtml(result.modeLabel)}</span></span><span class="generate-crontab-shell-result-chip generate-crontab-shell-result-chip-${warningTone}"><span class="generate-crontab-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-exclamation-triangle"></i></span><span>${escapeHtml(`${result.warnings.length} warning${result.warnings.length === 1 ? '' : 's'}`)}</span></span><span class="generate-crontab-shell-result-chip generate-crontab-shell-result-chip-${previewTone}"><span class="generate-crontab-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar-event"></i></span><span>${escapeHtml(macroInput.value === '@reboot' ? 'Boot event preview' : 'Calendar preview')}</span></span></div></article>
            </div>
            <div class="generate-crontab-shell-result-metric-grid" aria-label="Schedule metrics"><article class="generate-crontab-shell-result-metric-card generate-crontab-shell-result-metric-success"><span class="generate-crontab-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span class="generate-crontab-shell-result-metric-label">Command</span><strong class="generate-crontab-shell-result-metric-value">${escapeHtml(commandLabel)}</strong><span class="generate-crontab-shell-result-metric-copy">Command field content.</span><span class="generate-crontab-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-crontab-shell-result-metric-card generate-crontab-shell-result-metric-info"><span class="generate-crontab-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-exclamation-triangle"></i></span><span class="generate-crontab-shell-result-metric-label">Warnings</span><strong class="generate-crontab-shell-result-metric-value">${escapeHtml(String(result.warnings.length))}</strong><span class="generate-crontab-shell-result-metric-copy">Validation notes for this schedule.</span><span class="generate-crontab-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-crontab-shell-result-metric-card generate-crontab-shell-result-metric-accent-tone"><span class="generate-crontab-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-calendar-check"></i></span><span class="generate-crontab-shell-result-metric-label">Next run</span><strong class="generate-crontab-shell-result-metric-value">${escapeHtml(nextRunLabel)}</strong><span class="generate-crontab-shell-result-metric-copy">First previewed execution.</span><span class="generate-crontab-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-crontab-shell-result-metric-card generate-crontab-shell-result-metric-warning"><span class="generate-crontab-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-braces"></i></span><span class="generate-crontab-shell-result-metric-label">Expression</span><strong class="generate-crontab-shell-result-metric-value">${escapeHtml(result.expression)}</strong><span class="generate-crontab-shell-result-metric-copy">Cron field expression.</span><span class="generate-crontab-shell-result-metric-accent" aria-hidden="true"></span></article></div>
        `;
    }

// ns:end family._base.workspace.05_result-summary

// ns:start family._base.workspace.06_output-toolbar
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
    function getSortedFieldRows(result) {
        if (!result) {
            return [];
        }

        const rows = result.fieldRows.map((row, index) => ({
            ...row,
            index
        }));

        if (sortInput.value === 'alphabetical') {
            return rows.sort((left, right) => {
                const leftText = `${left.field} ${left.token} ${left.source} ${left.meaning}`;
                const rightText = `${right.field} ${right.token} ${right.source} ${right.meaning}`;
                const textSort = leftText.localeCompare(rightText, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });

                return textSort !== 0 ? textSort : left.index - right.index;
            });
        }

        if (sortInput.value === 'field') {
            return rows.sort((left, right) => {
                const fieldSort = left.field.localeCompare(right.field, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });

                if (fieldSort !== 0) {
                    return fieldSort;
                }

                return left.index - right.index;
            });
        }

        if (sortInput.value === 'value') {
            return rows.sort((left, right) => {
                const tokenSort = left.token.localeCompare(right.token, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });

                return tokenSort !== 0 ? tokenSort : left.index - right.index;
            });
        }

        if (sortInput.value === 'length') {
            return rows.sort((left, right) => {
                if (left.token.length !== right.token.length) {
                    return right.token.length - left.token.length;
                }

                return left.index - right.index;
            });
        }

        return rows.sort((left, right) => left.index - right.index);
    }

// ns:start family._base.workspace.07_table-output
    function renderTables(result) {
        expressionOutput.textContent = result.expression;
        lineOutput.textContent = result.fullLine;

        if (result.upcomingRuns.length === 0) {
            renderEmptyTableRow(
                upcomingTableBody,
                4,
                macroInput.value === '@reboot'
                    ? 'No calendar preview for @reboot.'
                    : 'No upcoming runs found inside the preview window.'
            );
        } else {
            upcomingTableBody.innerHTML = result.upcomingRuns
                .map((row, index) => `
                    <tr>
                      <td class="tool-generated-rownum-cell">${index + 1}</td>
                      <td>${escapeHtml(row.run)}</td>
                      <td>${escapeHtml(row.relative)}</td>
                      <td>${escapeHtml(row.localClock)}</td>
                    </tr>
                `)
                .join('');
        }

        metadataTableBody.innerHTML = result.metadataRows
            .map((row, index) => `
                <tr>
                  <td class="tool-generated-rownum-cell">${index + 1}</td>
                  <td>${escapeHtml(row.field)}</td>
                  <td>${escapeHtml(row.value)}</td>
                </tr>
            `)
            .join('');

        fieldsTableBody.innerHTML = getSortedFieldRows(result)
            .map((row, index) => `
                <tr>
                  <td class="tool-generated-rownum-cell">${index + 1}</td>
                  <td>${escapeHtml(row.field)}</td>
                  <td>${escapeHtml(row.token)}</td>
                  <td>${escapeHtml(row.source)}</td>
                  <td>${escapeHtml(row.meaning)}</td>
                  <td class="generate-crontab-shell-table-copy-cell">
                    <button type="button" class="generate-crontab-shell-row-copy generate-crontab-shell-row-copy-btn" data-field-copy="${escapeHtml(row.token)}" aria-label="Copy schedule field row ${index + 1}" title="Copy schedule field row">
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
        renderMessageList(warningsList, result.warnings, 'No warnings.');
        renderMessageList(errorsList, result.errors, 'No validation errors.');
        renderJsonOutput(result.jsonPayload);
        activateTab('generateCrontabShellFieldsPanel');
    }

// ns:end family.shell.workspace.04_result-text
// ns:end family._base.workspace.05_result-summary
    function showErrorState(message) {
        resultEmpty.classList.add('d-none');
        resultContent.classList.add('d-none');
        resultError.classList.remove('d-none');
        resultError.textContent = message;
    }

    function setGeneratingState(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.textContent = isLoading ? 'Generating...' : 'Generate';
    }

// ns:start family._base.workspace.03_custom-settings
    function buildResult() {
        clearAllFieldFeedback();

        const effectiveTokens = getEffectiveFieldTokens();

        if (effectiveTokens && effectiveTokens.error) {
            setFieldFeedback(effectiveTokens.fieldKey, 'error', effectiveTokens.error);
            throw new Error(effectiveTokens.error);
        }

        const expression = macroInput.value !== 'none'
            ? macroInput.value
            : `${effectiveTokens.minute} ${effectiveTokens.hour} ${effectiveTokens.day_of_month} ${effectiveTokens.month} ${effectiveTokens.day_of_week}`;
        const fullLine = buildFullLine(expression, commandInput.value, userInput.value);
        const warnings = buildWarnings(effectiveTokens || {}, commandInput.value, userInput.value);
        const metadataRows = buildMetadataRows();
        const fieldRows = buildFieldRows(effectiveTokens || {}, macroInput.value !== 'none' ? macroCatalog[macroInput.value].label : 'Field builder');
        const upcomingRuns = buildUpcomingRuns(effectiveTokens);
        const errors = [];
        const result = {
            generatedAtIso: new Date().toISOString(),
            expression,
            fullLine,
            modeLabel: macroInput.value !== 'none' ? macroCatalog[macroInput.value].label : 'Field expression',
            command: normalizeMetadataValue(commandInput.value),
            humanSummary: buildHumanSummary(expression, effectiveTokens || {}),
            warnings,
            errors,
            fieldRows,
            metadataRows,
            upcomingRuns
        };

        result.jsonPayload = buildJsonPayload(result);
        result.csvRows = buildCsvRows(result);

        return result;
    }

// ns:end family._base.workspace.03_custom-settings
// ns:start family._base.workspace.01_input-brief
    function generateAndRender() {
        setGeneratingState(true);

        try {
            const result = buildResult();

            renderResult(result);
        } catch (error) {
            showErrorState(error.message || 'Failed to generate the crontab entry.');
        } finally {
            setGeneratingState(false);
        }
    }

// ns:end family._base.workspace.01_input-brief
    function shouldParseUserToken(tokens) {
        if (tokens.length < 2) {
            return false;
        }

        const candidate = tokens[0];
        const nextToken = tokens[1];

        if (!/^[a-z_][a-z0-9_-]*[$]?$/i.test(candidate)) {
            return false;
        }

        if (
            nextToken.startsWith('/') ||
            nextToken.startsWith('./') ||
            nextToken.startsWith('../') ||
            nextToken.startsWith('~/') ||
            nextToken.includes('/') ||
            nextToken.includes('=')
        ) {
            return true;
        }

        return false;
    }

    function parseCronLine() {
        const rawLine = String(parseInput.value || '')
            .split('\n')
            .map((line) => line.trim())
            .find((line) => line);

        if (!rawLine) {
            throw new Error('Paste a cron line to parse.');
        }

        if (rawLine.startsWith('#')) {
            throw new Error('Comment lines cannot be parsed as schedule entries.');
        }

        const tokens = rawLine.split(/\s+/);

        if (tokens[0] && tokens[0].startsWith('@')) {
            const macroValue = tokens[0].toLowerCase();

            if (!Object.prototype.hasOwnProperty.call(macroCatalog, macroValue) || macroValue === 'none') {
                throw new Error('Unsupported cron macro.');
            }

            macroInput.value = macroValue;

            if (tokens.length > 1) {
                if (shouldParseUserToken(tokens.slice(1))) {
                    userInput.value = tokens[1];
                    commandInput.value = tokens.slice(2).join(' ');
                } else {
                    userInput.value = '';
                    commandInput.value = tokens.slice(1).join(' ');
                }
            } else {
                userInput.value = '';
                commandInput.value = '';
            }

            syncMacroState();
            syncAllEnhancedSelects();
            return;
        }

        if (tokens.length < 5) {
            throw new Error('Cron lines must include at least five timing fields.');
        }

        const fieldTokens = {
            minute: tokens[0],
            hour: tokens[1],
            day_of_month: tokens[2],
            month: tokens[3],
            day_of_week: tokens[4]
        };

        fieldOrder.forEach((fieldKey) => {
            const validation = validateFieldToken(fieldKey, fieldTokens[fieldKey]);

            if (!validation.valid) {
                throw new Error(`${fieldCatalog[fieldKey].label}: ${validation.error}`);
            }
        });

        macroInput.value = 'none';
        fieldOrder.forEach((fieldKey) => {
            applyTokenToField(fieldKey, fieldTokens[fieldKey]);
        });

        const remainingTokens = tokens.slice(5);

        if (shouldParseUserToken(remainingTokens)) {
            userInput.value = remainingTokens[0];
            commandInput.value = remainingTokens.slice(1).join(' ');
        } else {
            userInput.value = '';
            commandInput.value = remainingTokens.join(' ');
        }

        syncMacroState();
        syncAllEnhancedSelects();
    }

    function getImportedPayload(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('The selected JSON file does not contain a crontab payload.');
        }

        return payload.query && typeof payload.query === 'object' && !Array.isArray(payload.query)
            ? payload.query
            : payload;
    }

    function getImportedText(payload, key, fallback) {
        const value = payload[key];

        return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback;
    }

    function applyImportedPayload(payload) {
        const importedPayload = getImportedPayload(payload);
        const metadata = importedPayload.metadata && typeof importedPayload.metadata === 'object' && !Array.isArray(importedPayload.metadata)
            ? importedPayload.metadata
            : {};
        const expression = getImportedText(importedPayload, 'expression', '');
        const fullLine = getImportedText(importedPayload, 'full_line', '');

        resetFormState();
        commandInput.value = getImportedText(importedPayload, 'command', commandInput.value);
        userInput.value = getImportedText(metadata, 'user', '');
        mailtoInput.value = getImportedText(metadata, 'mailto', '');
        shellInput.value = getImportedText(metadata, 'shell', '');
        pathInput.value = getImportedText(metadata, 'path', '');
        timezoneInput.value = getImportedText(metadata, 'timezone', '');
        commentInput.value = getImportedText(metadata, 'comment', '');

        if (expression.startsWith('@') && Object.prototype.hasOwnProperty.call(macroCatalog, expression)) {
            macroInput.value = expression;
        } else if (expression) {
            const tokens = expression.split(/\s+/);

            if (tokens.length < fieldOrder.length) {
                throw new Error('The selected JSON file does not include a restorable cron expression.');
            }

            macroInput.value = 'none';
            fieldOrder.forEach((fieldKey, index) => {
                applyTokenToField(fieldKey, tokens[index]);
            });
        } else if (fullLine) {
            parseInput.value = fullLine;
            parseCronLine();
        } else {
            throw new Error('The selected JSON file does not include a restorable cron expression.');
        }

        clearParseFeedback();
        syncMacroState();
        syncAllEnhancedSelects();
        generateAndRender();

        if (latestResult) {
            syncUrlState(latestResult);
        }
    }

    function restoreStateFromQuery() {
        const params = new URLSearchParams(window.location.search);

        if (!params.toString()) {
            return false;
        }

        const commandValue = params.get('command');
        const macroValue = params.get('macro');
        const userValue = params.get('user');
        const mailtoValue = params.get('mailto');
        const shellValue = params.get('shell');
        const pathValue = params.get('path');
        const timezoneValue = params.get('tz');
        const commentValue = params.get('comment');

        if (commandValue) {
            commandInput.value = commandValue;
        }

        if (userValue) {
            userInput.value = userValue;
        }

        if (mailtoValue) {
            mailtoInput.value = mailtoValue;
        }

        if (shellValue) {
            shellInput.value = shellValue;
        }

        if (pathValue) {
            pathInput.value = pathValue;
        }

        if (timezoneValue) {
            timezoneInput.value = timezoneValue;
        }

        if (commentValue) {
            commentInput.value = commentValue;
        }

        if (macroValue && Object.prototype.hasOwnProperty.call(macroCatalog, macroValue)) {
            macroInput.value = macroValue;
        }

        const queryTokens = {
            minute: params.get('min'),
            hour: params.get('hour'),
            day_of_month: params.get('dom'),
            month: params.get('mon'),
            day_of_week: params.get('dow')
        };

        fieldOrder.forEach((fieldKey) => {
            const tokenValue = queryTokens[fieldKey];

            if (tokenValue) {
                applyTokenToField(fieldKey, tokenValue);
            }
        });

        syncMacroState();
        syncAllEnhancedSelects();

        return true;
    }

    function syncUrlState(result) {
        const params = new URLSearchParams();

        if (result.command) {
            params.set('command', result.command);
        }

        if (macroInput.value !== 'none') {
            params.set('macro', macroInput.value);
        } else {
            params.set('min', result.fieldRows[0].token);
            params.set('hour', result.fieldRows[1].token);
            params.set('dom', result.fieldRows[2].token);
            params.set('mon', result.fieldRows[3].token);
            params.set('dow', result.fieldRows[4].token);
        }

        if (normalizeMetadataValue(userInput.value)) {
            params.set('user', normalizeMetadataValue(userInput.value));
        }

        if (normalizeMetadataValue(mailtoInput.value)) {
            params.set('mailto', normalizeMetadataValue(mailtoInput.value));
        }

        if (normalizeMetadataValue(shellInput.value)) {
            params.set('shell', normalizeMetadataValue(shellInput.value));
        }

        if (normalizeMetadataValue(pathInput.value)) {
            params.set('path', normalizeMetadataValue(pathInput.value));
        }

        if (normalizeMetadataValue(timezoneInput.value)) {
            params.set('tz', normalizeMetadataValue(timezoneInput.value));
        }

        if (normalizeMetadataValue(commentInput.value)) {
            params.set('comment', normalizeMetadataValue(commentInput.value));
        }

        const nextUrl = params.toString()
            ? `${window.location.pathname}?${params.toString()}${window.location.hash}`
            : `${window.location.pathname}${window.location.hash}`;

        window.history.replaceState({}, '', nextUrl);
    }

    document.addEventListener('click', function (event) {
        const isInsideEnhancedSelect = event.target.closest('.generate-crontab-shell-enhanced-select');

        if (!isInsideEnhancedSelect) {
            closeEnhancedSelects();
        }
    });

    initMarkdownCopyButtons();
    enhanceNativeSelect(presetInput);
    enhanceNativeSelect(macroInput);
    fieldOrder.forEach((fieldKey) => {
        enhanceNativeSelect(fieldElements[fieldKey].kindSelect);
        setFieldMode(fieldKey, 'simple');
        updateFieldCardUi(fieldKey);

        fieldElements[fieldKey].modeButtons.forEach((button) => {
            button.addEventListener('click', function () {
                if (button.disabled) {
                    return;
                }

                setFieldMode(fieldKey, button.dataset.fieldMode);
                clearFieldFeedback(fieldKey);
                updateFieldCardUi(fieldKey);
            });
        });

        fieldElements[fieldKey].kindSelect.addEventListener('change', function () {
            clearFieldFeedback(fieldKey);
            updateFieldCardUi(fieldKey);
        });

        fieldElements[fieldKey].primaryInput.addEventListener('input', function () {
            clearFieldFeedback(fieldKey);
            updateFieldCardUi(fieldKey);
        });

        fieldElements[fieldKey].secondaryInput.addEventListener('input', function () {
            clearFieldFeedback(fieldKey);
            updateFieldCardUi(fieldKey);
        });

        fieldElements[fieldKey].rawInput.addEventListener('input', function () {
            clearFieldFeedback(fieldKey);
            updateFieldCardUi(fieldKey);
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearParseFeedback();
        generateAndRender();

        if (latestResult) {
            syncUrlState(latestResult);
        }
    });

    resetButton.addEventListener('click', function () {
        resetFormState();
        generateAndRender();

        if (latestResult) {
            syncUrlState(latestResult);
        }
    });

    applyPresetButton.addEventListener('click', function () {
        clearParseFeedback();
        applyPreset(presetInput.value);
        generateAndRender();

        if (latestResult) {
            syncUrlState(latestResult);
        }
    });

    macroInput.addEventListener('change', function () {
        clearParseFeedback();
        syncMacroState();
        generateAndRender();

        if (latestResult) {
            syncUrlState(latestResult);
        }
    });

    parseButton.addEventListener('click', function () {
        try {
            parseCronLine();
            generateAndRender();
            setParseFeedback('success', 'Cron line parsed into the builder.');

            if (latestResult) {
                syncUrlState(latestResult);
            }
        } catch (error) {
            setParseFeedback('error', error.message || 'Failed to parse the cron line.');
        }
    });

    parseClearButton.addEventListener('click', function () {
        parseInput.value = '';
        clearParseFeedback();
    });

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

    fieldsTableBody.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const copyButton = target.closest('.generate-crontab-shell-row-copy, .generate-crontab-shell-row-copy-btn');

        if (!copyButton || !fieldsTableBody.contains(copyButton)) {
            return;
        }

        const copyValue = copyButton.getAttribute('data-field-copy');

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

    copyExpressionButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(latestResult.expression, copyExpressionButton);
    });

    copyLineButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(latestResult.fullLine, copyLineButton);
    });

    exportPdfButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        exportResultShellAsPdf('generate-crontab-shell', resultContent);
        flashButton(exportPdfButton, 'Opened');
    });

    downloadCsvButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile(
            'generate-crontab-shell.csv',
            `${convertRowsToCsv(buildCsvRows(latestResult, getSortedFieldRows(latestResult)))}\n`,
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

        downloadFile('generate-crontab-shell.json', `${JSON.stringify(latestResult.jsonPayload, null, 2)}\n`, 'application/json;charset=utf-8');
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
            setParseFeedback('success', 'JSON imported successfully.');
            flashButton(importJsonButton, 'Imported');
        } catch (error) {
            setParseFeedback('error', error instanceof Error ? error.message : 'The selected JSON file could not be imported.');
            flashButton(importJsonButton, 'Failed');
        } finally {
            importJsonInput.value = '';
        }
    });
    // ns:end family._base.workspace.08_json-restore

    if (!restoreStateFromQuery()) {
        resetFormState();
    }

    syncMacroState();
    syncAllEnhancedSelects();
    generateAndRender();

    if (latestResult) {
        syncUrlState(latestResult);
    }
    initializeInfraStackCustomDropdowns(document);
});
/* ns:start family._base.workspace.07_table-output */
(function setupGenerateCrontabShellTableOutputStandard() {
    const rootSelector = '.generate-crontab-shell-tool';
    const tableSelector = '.tool-result-table tbody tr, .generate-crontab-shell-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .generate-crontab-shell-table tbody';
    const clampClass = 'generate-crontab-shell-table-cell-text';
    const cellClampClass = 'generate-crontab-shell-cell-clamp';
    const statusColumnClass = 'generate-crontab-shell-table-status-cell';

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
        root.querySelectorAll('.tool-result-table, .generate-crontab-shell-table').forEach(function alignStatusTable(table) {
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

                if (!isFirst && !isAction) {
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
