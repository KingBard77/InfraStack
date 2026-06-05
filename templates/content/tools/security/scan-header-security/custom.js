// custom.js

// ns:start family._base.workspace.00_shell
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.00_shell
// ns:start family._base.workspace.01_input-brief
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.01_input-brief
// ns:start family._base.workspace.02_basic-settings
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.02_basic-settings
// ns:start family._base.workspace.03_custom-settings
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.03_custom-settings
// ns:start family.scanning.workspace.04_selected-item
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.04_selected-item
// ns:start family.scanning.workspace.04_visual-contract
const scanHeaderSecurityVisualContractMarker = 'family.scanning.workspace.04_visual-contract';
// ns:end family.scanning.workspace.04_visual-contract
// ns:start family._base.workspace.05_result-summary
function installInfraStackResultSummaryNormalizer(prefix) {
    function formatUpdatedLabel() {
        return new Intl.DateTimeFormat('en', {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date());
    }

    function createChip(text, tone, iconClass) {
        const chip = document.createElement('span');
        const icon = iconClass || 'bi bi-info-circle';

        chip.className = prefix + '-result-chip ' + prefix + '-result-chip-' + tone;
        chip.innerHTML = '<span class="' + prefix + '-result-chip-icon"><i class="' + icon + '" aria-hidden="true"></i></span>';
        chip.append(document.createTextNode(text));

        return chip;
    }

    function textFrom(element, fallback) {
        const value = element ? element.textContent.trim() : '';

        return value || fallback;
    }

    function compactPrimaryText(primaryCard, summaryCard) {
        const summaryTitle = textFrom(summaryCard.querySelector('.' + prefix + '-result-title'), 'Primary result');
        const currentValue = textFrom(primaryCard.querySelector('.' + prefix + '-result-command-value'), '');
        const compactTitle = summaryTitle
            .replace(/\s+command$/i, '')
            .replace(/\s+preview$/i, '')
            .replace(/^generated\s+/i, '')
            .trim();

        if (!currentValue || currentValue.length > 48 || /\b(curl|chmod|nc|ncat|netcat|sudo|crontab)\b/i.test(currentValue)) {
            return compactTitle || 'Primary result';
        }

        return currentValue;
    }

    function ensureSummaryChips(summaryCard) {
        let chipRow = summaryCard.querySelector('.' + prefix + '-result-chip-row');

        if (!chipRow) {
            chipRow = document.createElement('div');
            chipRow.className = prefix + '-result-chip-row';
            chipRow.setAttribute('aria-label', 'Result summary state');
            const copy = summaryCard.querySelector('.' + prefix + '-result-copy');
            if (copy && copy.nextSibling) {
                summaryCard.insertBefore(chipRow, copy.nextSibling);
            } else {
                summaryCard.appendChild(chipRow);
            }
        }

        const chipText = Array.from(chipRow.querySelectorAll('.' + prefix + '-result-chip'))
            .map(function (chip) {
                return chip.textContent.trim();
            })
            .join(' ');

        if (!/\b(updated|last run|generated at)\b/i.test(chipText)) {
            chipRow.appendChild(createChip('Updated ' + formatUpdatedLabel(), 'updated', 'bi bi-clock-history'));
        }

        while (chipRow.querySelectorAll('.' + prefix + '-result-chip').length < 4) {
            chipRow.appendChild(createChip('Result ready', 'baseline', 'bi bi-check2-circle'));
        }
    }

    function ensurePrimaryOutcome(primaryCard, summaryCard) {
        let outcomeRow = primaryCard.querySelector('.' + prefix + '-result-chip-row-center');

        if (!outcomeRow) {
            outcomeRow = document.createElement('div');
            outcomeRow.className = prefix + '-result-chip-row ' + prefix + '-result-chip-row-center';
            outcomeRow.setAttribute('aria-label', 'Primary result outcome');
            primaryCard.appendChild(outcomeRow);
        }

        if (outcomeRow.querySelector('.' + prefix + '-result-chip')) {
            return;
        }

        const sourceChip = summaryCard.querySelector('.' + prefix + '-result-chip-ready, .' + prefix + '-result-chip-success, .' + prefix + '-result-chip-baseline, .' + prefix + '-result-chip-warning');
        const outcomeChip = sourceChip ? sourceChip.cloneNode(true) : createChip('Primary result', 'outcome', 'bi bi-check2-circle');

        outcomeChip.classList.add(prefix + '-result-chip-outcome');
        outcomeRow.appendChild(outcomeChip);
    }

    function normalizeRingPrimary(primaryCard, summaryCard) {
        const ring = primaryCard.querySelector('.' + prefix + '-result-ring');

        if (!ring) {
            return false;
        }

        primaryCard.dataset.resultVisual = 'ring';
        let topCopy = primaryCard.querySelector('.' + prefix + '-result-visual-copy-top');

        if (!topCopy) {
            topCopy = document.createElement('div');
            topCopy.className = prefix + '-result-visual-copy ' + prefix + '-result-visual-copy-top';
            primaryCard.insertBefore(topCopy, ring);
        }

        let kicker = Array.from(primaryCard.querySelectorAll('.' + prefix + '-result-kicker')).find(function (item) {
            return /primary/i.test(item.textContent);
        }) || topCopy.querySelector('.' + prefix + '-result-kicker');

        if (!kicker) {
            kicker = document.createElement('span');
            kicker.className = prefix + '-result-kicker';
        }

        kicker.textContent = 'Primary Result';
        if (!topCopy.contains(kicker)) {
            topCopy.appendChild(kicker);
        }

        let bottomCopy = Array.from(primaryCard.querySelectorAll('.' + prefix + '-result-visual-copy')).find(function (item) {
            return item !== topCopy;
        });

        if (!bottomCopy) {
            bottomCopy = document.createElement('div');
            bottomCopy.className = prefix + '-result-visual-copy';
            ring.insertAdjacentElement('afterend', bottomCopy);
        }

        Array.from(bottomCopy.querySelectorAll('.' + prefix + '-result-kicker')).forEach(function (item) {
            if (item !== kicker) {
                item.remove();
            }
        });

        let title = topCopy.querySelector('.' + prefix + '-result-title-center, .' + prefix + '-result-title');

        if (!title) {
            title = bottomCopy.querySelector('.' + prefix + '-result-title-center, .' + prefix + '-result-title');
        }

        if (title && !topCopy.contains(title)) {
            topCopy.appendChild(title);
        }

        if (!bottomCopy.querySelector('.' + prefix + '-result-copy')) {
            const copy = document.createElement('p');
            const summaryCopy = summaryCard.querySelector('.' + prefix + '-result-copy');
            copy.className = prefix + '-result-copy ' + prefix + '-result-copy-center';
            copy.textContent = textFrom(summaryCopy, 'Primary output generated from the current inputs.');
            bottomCopy.appendChild(copy);
        }

        ensurePrimaryOutcome(primaryCard, summaryCard);

        return true;
    }

    function normalizeTextPrimary(primaryCard, summaryCard) {
        primaryCard.dataset.resultVisual = primaryCard.classList.contains(prefix + '-result-card-command') ? 'command' : 'text';

        const kicker = primaryCard.querySelector('.' + prefix + '-result-kicker');
        if (kicker) {
            kicker.textContent = 'Primary Result';
        }

        const commandValue = primaryCard.querySelector('.' + prefix + '-result-command-value');
        if (commandValue) {
            commandValue.textContent = compactPrimaryText(primaryCard, summaryCard);
        }

        ensurePrimaryOutcome(primaryCard, summaryCard);
    }

    function normalize() {
        const summary = document.querySelector('.' + prefix + '-result-summary');
        if (!summary) {
            return;
        }

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

        if (!primaryCard || !summaryCard) {
            return;
        }

        primaryCard.classList.add(prefix + '-result-card-primary');
        summaryCard.classList.add(prefix + '-result-card-summary');

        if (hero.firstElementChild !== primaryCard) {
            hero.insertBefore(primaryCard, hero.firstElementChild);
        }
        if (primaryCard.nextElementSibling !== summaryCard) {
            hero.insertBefore(summaryCard, primaryCard.nextElementSibling);
        }

        const hasRing = normalizeRingPrimary(primaryCard, summaryCard);
        if (!hasRing) {
            normalizeTextPrimary(primaryCard, summaryCard);
        }
        ensureSummaryChips(summaryCard);
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

installInfraStackResultSummaryNormalizer('scan-header-security');
// ns:end family._base.workspace.05_result-summary
// ns:start family._base.workspace.06_output-toolbar
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.06_output-toolbar
// ns:start family._base.workspace.08_json-restore
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.08_json-restore

document.addEventListener('DOMContentLoaded', function () {
    const root = document.querySelector('.scan-header-security-tool');

    if (!root) {
        return;
    }

    function getById(id) {
        return root.querySelector(`#${id}`);
    }

    const form = getById('scanHeaderSecurityForm');
    const urlInput = getById('scanHeaderSecurityInput');
    const inputError = getById('scanHeaderSecurityInputError');
    const methodInput = getById('scanHeaderSecurityMethod');
    const followRedirectsInput = getById('scanHeaderSecurityBasicToggle');
    const timeoutInput = getById('scanHeaderSecurityTimeout');
    const validateTlsInput = getById('scanHeaderSecurityValidateTls');
    const fallbackGetInput = getById('scanHeaderSecurityFallbackGet');
    const userAgentInput = getById('scanHeaderSecurityUserAgent');
    const wellKnownInput = getById('scanHeaderSecurityWellKnown');
    const httpUpgradeInput = getById('scanHeaderSecurityHttpUpgrade');
    const baselineInput = getById('scanHeaderSecurityBasicPrimary');
    const targetContextInput = getById('scanHeaderSecurityBasicText');
    const cspModeInput = getById('scanHeaderSecurityCspMode');
    const hstsMaxAgeInput = getById('scanHeaderSecurityHstsMaxAge');
    const cookieModeInput = getById('scanHeaderSecurityCookieMode');
    const headerListInput = getById('scanHeaderSecurityHeaderList');
    const policyNotesInput = getById('scanHeaderSecurityPolicyNotes');
    const submitButton = getById('scanHeaderSecurityPrimaryAction');
    const secondaryButton = getById('scanHeaderSecuritySecondaryAction');
    const sortInput = getById('scanHeaderSecuritySort');
    const sortSummary = getById('scanHeaderSecuritySortSummary');
    const sortOptions = Array.from(root.querySelectorAll('.scan-header-security-sort-option'));
    const sortSelect = getById('scanHeaderSecuritySortSelect');
    const resultEmpty = getById('scanHeaderSecurityResultEmpty');
    const resultContent = getById('scanHeaderSecurityResultContent');
    const resultError = getById('scanHeaderSecurityResultError');
    const resultSummary = getById('scanHeaderSecurityResultSummary');
    const findingTableBody = getById('scanHeaderSecurityFindingTableBody');
    const headerTableBody = getById('scanHeaderSecurityHeaderTableBody');
    const transportTableBody = getById('scanHeaderSecurityTransportTableBody');
    const knownFileTableBody = getById('scanHeaderSecurityKnownFileTableBody');
    const cookieTableBody = getById('scanHeaderSecurityCookieTableBody');
    const jsonOutput = getById('scanHeaderSecurityJsonOutput');
    const exportPdfButton = getById('scanHeaderSecurityExportPdf');
    const downloadCsvButton = getById('scanHeaderSecurityDownloadCsv');
    const copyJsonButton = getById('scanHeaderSecurityCopyJson');
    const downloadJsonButton = getById('scanHeaderSecurityDownloadJson');
    const importJsonButton = getById('scanHeaderSecurityImportJsonButton');
    const importJsonInput = getById('scanHeaderSecurityImportJson');
    const tabButtons = Array.from(root.querySelectorAll('.scan-header-security-tab-btn'));
    const tabPanels = Array.from(root.querySelectorAll('.scan-header-security-tab-panel'));

    const ECHARTS_CDN_URL = 'https://cdn.jsdelivr.net/npm/echarts@6/dist/echarts.min.js';

    let latestResult = null;
    let echartsPromise = null;
    let scoreRingChart = null;
    let scoreRingResizeHandler = null;

    function initMarkdownCopyButtons() {
        const scanInputBlocks = Array.from(document.querySelectorAll('.markdown-content pre.scan-header-security-example-input'));
        const scanInputCopyButtons = document.querySelectorAll('.scan-header-security-input-copy-btn');

        scanInputCopyButtons.forEach((button) => {
            const inputIndex = Number.parseInt(button.dataset.scanInputCopyIndex || '', 10);
            const inputBlock = Number.isFinite(inputIndex) ? scanInputBlocks[inputIndex] : null;
            const code = inputBlock ? inputBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', async function (event) {
                event.preventDefault();
                event.stopPropagation();

                try {
                    await writeClipboardText(code.textContent.trim());
                    flashButton(button.querySelector('span') || button, 'Copied');
                    button.classList.add('copied');
                    window.setTimeout(() => {
                        button.classList.remove('copied');
                    }, 1400);
                } catch (error) {
                    flashButton(button.querySelector('span') || button, 'Failed');
                }
            });
        });

        const codeBlocks = document.querySelectorAll('.markdown-content .scan-header-security-markdown-card pre:not(.scan-header-security-example-input)');

        codeBlocks.forEach((pre) => {
            if (pre.querySelector('.markdown-copy-btn')) {
                return;
            }

            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'markdown-copy-btn';
            button.textContent = 'Copy';

            button.addEventListener('click', async function () {
                try {
                    await writeClipboardText(code.textContent.trim());
                    flashButton(button, 'Copied');
                } catch (error) {
                    flashButton(button, 'Failed');
                }
            });

            pre.appendChild(button);
        });
    }

    function flashButton(button, text) {
        if (button.dataset.iconOnly === 'true' || (button.closest && button.closest('.tool-table-action-cell'))) {
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
            window.setTimeout(() => {
                button.classList.remove('copied', 'is-copied', 'failed');
                if (icon && button.dataset.defaultIcon) {
                    icon.className = button.dataset.defaultIcon;
                }
            }, 1400);
            return;
        }

        const labelElement = button.querySelector('[data-button-label]');
        const currentText = labelElement ? labelElement.textContent : button.textContent;
        const originalText = button.dataset.defaultLabel || currentText;

        button.dataset.defaultLabel = originalText;

        if (labelElement) {
            labelElement.textContent = text;
        } else {
            button.textContent = text;
        }

        window.setTimeout(() => {
            if (labelElement) {
                labelElement.textContent = originalText;
            } else {
                button.textContent = originalText;
            }
        }, 1400);
    }

    function fallbackClipboardWriteText(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();

        document.execCommand('copy');
        textarea.remove();
    }

    async function writeClipboardText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                fallbackClipboardWriteText(text);
                return;
            }
        }

        fallbackClipboardWriteText(text);
    }

    function escapeJsonHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');
    }

    initMarkdownCopyButtons();

    if (
        !form ||
        !urlInput ||
        !inputError ||
        !methodInput ||
        !followRedirectsInput ||
        !timeoutInput ||
        !validateTlsInput ||
        !fallbackGetInput ||
        !userAgentInput ||
        !wellKnownInput ||
        !httpUpgradeInput ||
        !baselineInput ||
        !targetContextInput ||
        !cspModeInput ||
        !hstsMaxAgeInput ||
        !cookieModeInput ||
        !headerListInput ||
        !policyNotesInput ||
        !submitButton ||
        !secondaryButton ||
        !sortInput ||
        !sortSummary ||
        !sortSelect ||
        sortOptions.length === 0 ||
        !resultEmpty ||
        !resultContent ||
        !resultError ||
        !resultSummary ||
        !findingTableBody ||
        !headerTableBody ||
        !transportTableBody ||
        !knownFileTableBody ||
        !cookieTableBody ||
        !jsonOutput ||
        !importJsonButton ||
        !importJsonInput
    ) {
        return;
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function cssVar(name, fallback) {
        const value = window.getComputedStyle(root).getPropertyValue(name).trim();

        return value || fallback;
    }

    function loadECharts() {
        if (window.echarts && typeof window.echarts.init === 'function') {
            return Promise.resolve(window.echarts);
        }

        if (!echartsPromise) {
            echartsPromise = new Promise((resolve) => {
                const existingScript = document.querySelector(`script[data-scan-header-security-echarts], script[src="${ECHARTS_CDN_URL}"]`);

                if (existingScript) {
                    existingScript.addEventListener('load', () => resolve(window.echarts || null), { once: true });
                    existingScript.addEventListener('error', () => resolve(null), { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.src = ECHARTS_CDN_URL;
                script.async = true;
                script.dataset.scanHeaderSecurityEcharts = 'true';
                script.addEventListener('load', () => resolve(window.echarts || null), { once: true });
                script.addEventListener('error', () => resolve(null), { once: true });
                document.head.appendChild(script);
            });
        }

        return echartsPromise;
    }

    function destroyScoreRingChart() {
        if (scoreRingResizeHandler) {
            window.removeEventListener('resize', scoreRingResizeHandler);
            scoreRingResizeHandler = null;
        }

        if (scoreRingChart) {
            scoreRingChart.dispose();
            scoreRingChart = null;
        }
    }

    function renderScoreRingChart(score, tone) {
        const chartElement = getById('scanHeaderSecurityScoreChart');
        const ringElement = getById('scanHeaderSecurityScoreRing');

        if (!chartElement || !ringElement) {
            return;
        }

        const chartValue = Math.max(0, Math.min(Number(score) || 0, 100));
        const ringColor = tone.ringColor || cssVar('--tool-accent', '#16A34A');
        const trackColor = cssVar('--tool-score-track', 'rgba(226, 232, 240, 0.96)');

        loadECharts().then((echarts) => {
            if (!echarts || !chartElement.isConnected || !ringElement.isConnected) {
                return;
            }

            destroyScoreRingChart();

            scoreRingChart = echarts.init(chartElement, null, {
                renderer: 'svg'
            });

            scoreRingChart.setOption({
                animationDuration: 640,
                animationEasing: 'cubicOut',
                tooltip: {
                    show: false
                },
                series: [
                    {
                        type: 'gauge',
                        radius: '96%',
                        center: ['50%', '50%'],
                        startAngle: 90,
                        endAngle: -270,
                        min: 0,
                        max: 100,
                        clockwise: true,
                        pointer: {
                            show: false
                        },
                        progress: {
                            show: true,
                            roundCap: false,
                            width: 15,
                            itemStyle: {
                                color: ringColor
                            }
                        },
                        axisLine: {
                            roundCap: false,
                            lineStyle: {
                                width: 15,
                                color: [[1, trackColor]]
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        anchor: {
                            show: false
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            show: false
                        },
                        data: [
                            {
                                value: chartValue
                            }
                        ]
                    }
                ]
            });

            ringElement.setAttribute('data-chart-ready', 'true');
            scoreRingResizeHandler = () => {
                if (scoreRingChart) {
                    scoreRingChart.resize();
                }
            };
            window.addEventListener('resize', scoreRingResizeHandler);
        });
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

    function normalizeUrl(value) {
        const trimmedValue = String(value || '').trim();

        if (!trimmedValue) {
            return '';
        }

        try {
            return new URL(trimmedValue).toString();
        } catch (error) {
            try {
                return new URL(`https://${trimmedValue}`).toString();
            } catch (secondError) {
                return '';
            }
        }
    }

    function normalizeTimeoutSeconds(value) {
        const timeoutSeconds = Number(value);

        if (!Number.isFinite(timeoutSeconds) || timeoutSeconds < 1) {
            return 12;
        }

        if (timeoutSeconds > 30) {
            return 30;
        }

        return Math.round(timeoutSeconds);
    }

    function normalizePositiveInteger(value, fallbackValue) {
        const nextValue = Number(value);

        if (!Number.isFinite(nextValue) || nextValue < 0) {
            return fallbackValue;
        }

        return Math.round(nextValue);
    }

    function splitLines(value) {
        return String(value || '')
            .split(/\n+/)
            .map((line) => line.trim())
            .filter(Boolean);
    }

    function setInlineDropdownValue(input, value, fallbackValue, allowedValues) {
        const requestedValue = String(value || input.value || fallbackValue);
        input.value = allowedValues.includes(requestedValue) ? requestedValue : fallbackValue;
    }

    function getInlineDropdownValue(input, fallbackValue, allowedValues) {
        setInlineDropdownValue(input, input.value, fallbackValue, allowedValues);

        return input.value || fallbackValue;
    }

    function buildQuery() {
        return {
            url: normalizeUrl(urlInput.value),
            baseline: getInlineDropdownValue(baselineInput, 'balanced', ['balanced', 'strict', 'api']).toLowerCase(),
            targetContext: String(targetContextInput.value || 'Web application').trim() || 'Web application',
            method: getInlineDropdownValue(methodInput, 'HEAD', ['HEAD', 'GET']).toUpperCase(),
            followRedirects: Boolean(followRedirectsInput.checked),
            timeoutSeconds: normalizeTimeoutSeconds(timeoutInput.value),
            validateTls: Boolean(validateTlsInput.checked),
            fallbackGetOn405: Boolean(fallbackGetInput.checked),
            userAgentProfile: getInlineDropdownValue(userAgentInput, 'default', ['default', 'desktop', 'mobile']).toLowerCase(),
            cspMode: getInlineDropdownValue(cspModeInput, 'enforced', ['enforced', 'report-only', 'both']).toLowerCase(),
            hstsMaxAge: normalizePositiveInteger(hstsMaxAgeInput.value, 31536000),
            cookieMode: getInlineDropdownValue(cookieModeInput, 'include', ['include', 'separate', 'skip']).toLowerCase(),
            emphasizedHeaders: splitLines(headerListInput.value),
            policyNotes: splitLines(policyNotesInput.value),
            checkWellKnownFiles: Boolean(wellKnownInput.checked),
            probeHttpUpgrade: Boolean(httpUpgradeInput.checked)
        };
    }

    function validateQuery(query) {
        if (!query.url) {
            return 'Enter a valid HTTP or HTTPS URL.';
        }

        if (!['HEAD', 'GET'].includes(query.method)) {
            return 'Choose a supported request method.';
        }

        if (!['default', 'desktop', 'mobile'].includes(query.userAgentProfile)) {
            return 'Choose a supported user-agent profile.';
        }

        return '';
    }

    function setInputError(message) {
        inputError.textContent = message;
        inputError.classList.toggle('d-none', !message);
    }

    function setLoadingState(message) {
        destroyScoreRingChart();
        resultEmpty.textContent = message;
        resultEmpty.classList.remove('d-none');
        resultContent.classList.add('d-none');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        resultSummary.innerHTML = '';
        findingTableBody.innerHTML = '';
        headerTableBody.innerHTML = '';
        transportTableBody.innerHTML = '';
        knownFileTableBody.innerHTML = '';
        cookieTableBody.innerHTML = '';
        jsonOutput.innerHTML = '';
    }

    function setErrorState(message) {
        destroyScoreRingChart();
        resultEmpty.classList.add('d-none');
        resultContent.classList.add('d-none');
        resultError.classList.remove('d-none');
        resultError.textContent = message;
        resultSummary.innerHTML = '';
        findingTableBody.innerHTML = '';
        headerTableBody.innerHTML = '';
        transportTableBody.innerHTML = '';
        knownFileTableBody.innerHTML = '';
        cookieTableBody.innerHTML = '';
        jsonOutput.innerHTML = '';
    }

    function setResultState() {
        resultEmpty.classList.add('d-none');
        resultError.classList.add('d-none');
        resultContent.classList.remove('d-none');
    }

    function setSubmitButtonLabel(label) {
        submitButton.innerHTML = `<i class="bi bi-search" aria-hidden="true"></i><span>${escapeHtml(label)}</span>`;
    }

    function toggleSubmitState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            setSubmitButtonLabel('Preparing...');

            return;
        }

        submitButton.disabled = false;
        setSubmitButtonLabel('Prepare Review');
    }

    async function scanTarget(query) {
        return buildHeaderReviewResult(query);
    }

    function titleCaseHeader(value) {
        return String(value || '')
            .split('-')
            .map((part) => part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part)
            .join('-');
    }

    function getBaselineLabel(value) {
        const labels = {
            balanced: 'Balanced browser security',
            strict: 'Strict public web baseline',
            api: 'API response baseline'
        };

        return labels[value] || labels.balanced;
    }

    function getCspLabel(value) {
        const labels = {
            enforced: 'Enforced policy',
            'report-only': 'Report-only policy',
            both: 'Enforce plus report-only'
        };

        return labels[value] || labels.enforced;
    }

    function getCookieLabel(value) {
        const labels = {
            include: 'Include cookie flags',
            separate: 'Track separately',
            skip: 'Skip for now'
        };

        return labels[value] || labels.include;
    }

    function getClientLabel(value) {
        const labels = {
            default: 'Default client',
            desktop: 'Desktop browser',
            mobile: 'Mobile browser'
        };

        return labels[value] || labels.default;
    }

    function getRequiredHeaders(query) {
        if (query.baseline === 'api') {
            return [
                'strict-transport-security',
                'content-type',
                'x-content-type-options',
                'cache-control',
                'access-control-allow-origin'
            ];
        }

        const headers = [
            'content-security-policy',
            'strict-transport-security',
            'x-frame-options',
            'x-content-type-options',
            'referrer-policy'
        ];

        if (query.baseline === 'strict') {
            headers.push('permissions-policy', 'cross-origin-opener-policy', 'cross-origin-embedder-policy');
        }

        return headers;
    }

    function normalizeHeaderKey(value) {
        return String(value || '')
            .split(':')[0]
            .trim()
            .toLowerCase();
    }

    function buildHeaderReviewResult(query) {
        const emphasizedHeaders = query.emphasizedHeaders.map(normalizeHeaderKey).filter(Boolean);
        const headerKeys = Array.from(new Set([...getRequiredHeaders(query), ...emphasizedHeaders]));
        const strictMode = query.baseline === 'strict';
        const hasShortHsts = query.hstsMaxAge > 0 && query.hstsMaxAge < 15552000;
        const findings = headerKeys.map((header, index) => {
            const emphasized = emphasizedHeaders.includes(header);
            const isCore = header === 'content-security-policy' || header === 'strict-transport-security';
            const status = emphasized ? 'info' : isCore || strictMode ? 'warn' : 'pass';
            const severity = isCore ? 'high' : strictMode ? 'medium' : 'low';
            const evidence = emphasized
                ? 'Added from custom emphasis list'
                : 'Expected by selected baseline';

            return {
                index: index + 1,
                category: header.includes('cors') || header.includes('access-control') ? 'CORS' : header.includes('transport') ? 'Transport' : 'Browser',
                control: titleCaseHeader(header),
                status,
                severity,
                evidence,
                recommendation: `Review ${titleCaseHeader(header)} on ${query.targetContext}.`,
                copyValue: `${titleCaseHeader(header)}: ${evidence}`
            };
        });

        if (query.cookieMode !== 'skip') {
            findings.push({
                index: findings.length + 1,
                category: 'Session',
                control: 'Set-Cookie flags',
                status: query.cookieMode === 'separate' ? 'info' : 'warn',
                severity: strictMode ? 'medium' : 'low',
                evidence: getCookieLabel(query.cookieMode),
                recommendation: 'Review Secure, HttpOnly, SameSite, scope, and lifetime for visible cookies.',
                copyValue: `Set-Cookie flags: ${getCookieLabel(query.cookieMode)}`
            });
        }

        if (hasShortHsts) {
            findings.push({
                index: findings.length + 1,
                category: 'Transport',
                control: 'HSTS max-age',
                status: 'warn',
                severity: 'medium',
                evidence: `${query.hstsMaxAge} seconds`,
                recommendation: 'Confirm this lower max-age is deliberate before using it on a public browser surface.',
                copyValue: `HSTS max-age: ${query.hstsMaxAge} seconds`
            });
        }

        const warnCount = findings.filter((row) => row.status === 'warn').length;
        const failCount = 0;
        const score = Math.max(55, 100 - (warnCount * 8) - (strictMode ? 4 : 0));
        const headerRows = [
            ['Policy', 'Content-Security-Policy', getCspLabel(query.cspMode)],
            ['Transport', 'Strict-Transport-Security', `max-age=${query.hstsMaxAge}`],
            ['Browser', 'X-Frame-Options / frame-ancestors', query.baseline === 'api' ? 'Review if browser-rendered' : 'Required'],
            ['Browser', 'X-Content-Type-Options', 'nosniff expected'],
            ['Privacy', 'Referrer-Policy', 'strict-origin-when-cross-origin expected'],
            ['Permissions', 'Permissions-Policy', query.baseline === 'strict' ? 'Required' : 'Recommended'],
            ...query.emphasizedHeaders.map((header) => ['Custom', titleCaseHeader(normalizeHeaderKey(header)), 'Emphasized'])
        ].map(([category, name, value]) => ({
            category,
            name,
            value,
            copyValue: `${name}: ${value}`
        }));
        const transportRows = [
            { label: 'Target', value: query.url, copyValue: query.url },
            { label: 'Context', value: query.targetContext, copyValue: query.targetContext },
            { label: 'Request intent', value: `${query.method}, ${query.timeoutSeconds}s, redirects ${query.followRedirects ? 'on' : 'off'}` },
            { label: 'TLS expectation', value: query.validateTls ? 'Validate certificate' : 'Intentional relaxed TLS review' },
            { label: 'Client profile', value: getClientLabel(query.userAgentProfile) },
            { label: 'GET fallback', value: query.fallbackGetOn405 ? 'Enabled for HEAD rejection' : 'Disabled' }
        ];
        const knownFileRows = [
            {
                path: 'CSP rollout',
                statusLabel: getCspLabel(query.cspMode),
                present: true,
                note: 'Use this row to track enforced or report-only policy handling.',
                copyValue: `CSP rollout: ${getCspLabel(query.cspMode)}`
            },
            {
                path: 'Evidence boundary',
                statusLabel: 'Local model',
                present: true,
                note: 'No network request is sent from this workspace.',
                copyValue: 'Evidence boundary: local model'
            },
            {
                path: 'Companion evidence',
                statusLabel: query.checkWellKnownFiles ? 'Included' : 'Skipped',
                present: query.checkWellKnownFiles,
                note: query.checkWellKnownFiles ? 'security.txt and public coordination notes are in scope.' : 'Public-file notes are hidden from this output.'
            },
            ...query.policyNotes.map((note) => ({
                path: 'Policy note',
                statusLabel: 'Custom',
                present: true,
                note,
                copyValue: note
            }))
        ];
        const cookieRows = query.cookieMode === 'skip'
            ? []
            : [
                {
                    name: 'Session cookies',
                    secure: 'Review Secure',
                    httpOnly: 'Review HttpOnly',
                    sameSite: 'Review SameSite',
                    issues: getCookieLabel(query.cookieMode),
                    raw: `Cookie posture: ${getCookieLabel(query.cookieMode)}`
                }
            ];

        return {
            tool: 'scan-header-security',
            query,
            summary: {
                score,
                grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D',
                finalUrl: query.url,
                finalScheme: new URL(query.url).protocol.replace(':', ''),
                finalStatus: 'review',
                finalStatusText: 'local',
                failCount,
                warnCount,
                findingCount: findings.length,
                methodUsed: query.method,
                durationMs: 0,
                knownFilePresentCount: query.checkWellKnownFiles ? 1 : 0,
                knownFileCount: 1,
                httpUpgradeState: query.probeHttpUpgrade ? 'pass' : 'info',
                httpUpgradeLabel: query.probeHttpUpgrade ? 'Upgrade note included' : 'Upgrade note skipped',
                hstsState: hasShortHsts ? 'warn' : 'pass',
                hstsLabel: `HSTS max-age ${query.hstsMaxAge}`,
                scoreNote: 'Local header review model; no endpoint request was sent.'
            },
            findings,
            headerRows,
            transportRows,
            knownFileRows,
            cookieRows,
            generatedAt: new Date().toISOString()
        };
    }

    function getSeverityRank(severity) {
        if (severity === 'high') {
            return 0;
        }

        if (severity === 'medium') {
            return 1;
        }

        if (severity === 'low') {
            return 2;
        }

        return 3;
    }

    function getStatusRank(status) {
        if (status === 'fail') {
            return 0;
        }

        if (status === 'warn') {
            return 1;
        }

        if (status === 'pass') {
            return 2;
        }

        return 3;
    }

    function getSortedFindings() {
        if (!latestResult) {
            return [];
        }

        const findings = [...latestResult.findings];
        const sortValue = sortInput.value;

        if (sortValue === 'severity') {
            return findings.sort((left, right) => {
                const severityDiff = getSeverityRank(left.severity) - getSeverityRank(right.severity);

                if (severityDiff !== 0) {
                    return severityDiff;
                }

                return getStatusRank(left.status) - getStatusRank(right.status);
            });
        }

        if (sortValue === 'status') {
            return findings.sort((left, right) => {
                const statusDiff = getStatusRank(left.status) - getStatusRank(right.status);

                if (statusDiff !== 0) {
                    return statusDiff;
                }

                return getSeverityRank(left.severity) - getSeverityRank(right.severity);
            });
        }
        if (sortValue === 'category') {
            return findings.sort((left, right) => {
                if (left.category !== right.category) {
                    return String(left.category).localeCompare(String(right.category));
                }

                return left.index - right.index;
            });
        }

        if (sortValue === 'evidence') {
            return findings.sort((left, right) => {
                const evidenceSort = String(left.evidence || '').localeCompare(String(right.evidence || ''), undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });

                if (evidenceSort !== 0) {
                    return evidenceSort;
                }

                return left.index - right.index;
            });
        }

        return findings.sort((left, right) => left.index - right.index);
    }

    function syncSortSelect() {
        const activeOption = sortOptions.find((option) => option.dataset.sortValue === sortInput.value) || sortOptions[0];

        sortInput.value = activeOption ? activeOption.dataset.sortValue : 'id';
        sortSummary.textContent = activeOption ? activeOption.textContent : 'ID';
        sortOptions.forEach((option) => {
            const isActive = option === activeOption;

            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    function setSortMode(sortMode, shouldRender = true) {
        sortInput.value = String(sortMode || 'id');
        syncSortSelect();

        if (shouldRender) {
            renderLatestResult();
        }
    }

    function getScoreTone(summary) {
        if (Number(summary.failCount || 0) > 0 || Number(summary.score || 0) < 70) {
            return {
                ringColor: '#DC2626',
                badgeClass: 'scan-header-security-badge-fail'
            };
        }

        if (Number(summary.warnCount || 0) > 0 || Number(summary.score || 0) < 85) {
            return {
                ringColor: '#F59E0B',
                badgeClass: 'scan-header-security-badge-warn'
            };
        }

        return {
            ringColor: '#16A34A',
            badgeClass: 'scan-header-security-badge-pass'
        };
    }

    function getStatusPillClass(status) {
        if (status === 'fail') {
            return 'scan-header-security-status-fail';
        }

        if (status === 'warn') {
            return 'scan-header-security-status-warn';
        }

        if (status === 'pass') {
            return 'scan-header-security-status-pass';
        }

        return 'scan-header-security-status-info';
    }

    function getBadgeClassForState(state) {
        if (state === 'fail') {
            return 'scan-header-security-badge-fail';
        }

        if (state === 'warn') {
            return 'scan-header-security-badge-warn';
        }

        if (state === 'pass') {
            return 'scan-header-security-badge-pass';
        }

        return 'scan-header-security-badge-neutral';
    }

    function buildSummaryHtml(result) {
        const summary = result.summary || {};
        const score = Number(summary.score || 0);
        const grade = String(summary.grade || 'F');
        const progressAngle = Math.max(0, Math.min(score, 100)) * 3.6;
        const lastRun = new Date(result.generatedAt);
        const lastRunText = Number.isNaN(lastRun.getTime()) ? 'Just now' : lastRun.toLocaleString();
        const tone = getScoreTone(summary);
        const schemeLabel = String(summary.finalScheme || '').toUpperCase() || 'UNKNOWN';
        const statusText = `${summary.finalStatus || 0} ${summary.finalStatusText || ''}`.trim();
        const schemeTone = schemeLabel === 'HTTPS' ? 'success' : 'error';
        const failTone = Number(summary.failCount || 0) > 0 ? 'error' : 'success';
        const warnTone = Number(summary.warnCount || 0) > 0 ? 'warning' : 'success';
        const resultStatusTone = Number(summary.failCount || 0) > 0 ? 'error' : Number(summary.warnCount || 0) > 0 ? 'warning' : 'success';
        const resultStatusLabel = Number(summary.failCount || 0) > 0 ? 'Needs review' : Number(summary.warnCount || 0) > 0 ? 'Warnings found' : 'Reviewed';
        const scoreChars = Math.max(3, String(score).length);
        const stateTone = function (state) {
            if (state === 'pass') {
                return 'success';
            }

            if (state === 'warn') {
                return 'warning';
            }

            if (state === 'fail') {
                return 'error';
            }

            return 'baseline';
        };

        return `
            <header class="scan-header-security-result-header" aria-label="Result summary header">
                <div class="scan-header-security-result-header-main">
                    <span class="scan-header-security-result-header-icon" aria-hidden="true"><i class="bi bi-shield-check"></i></span>
                    <div class="scan-header-security-result-header-copy">
                        <h2 class="scan-header-security-result-header-title">Result Summary</h2>
                        <p>Overview of the local header review result and key metrics.</p>
                    </div>
                </div>
                <div class="scan-header-security-result-header-meta" aria-label="Result summary status">
                    <span class="scan-header-security-result-header-chip scan-header-security-result-chip-${resultStatusTone}"><span class="scan-header-security-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>${escapeHtml(resultStatusLabel)}</span></span>
                    <span class="scan-header-security-result-header-chip scan-header-security-result-chip-updated"><span class="scan-header-security-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(lastRunText)}</span></span>
                </div>
            </header>

            <div class="scan-header-security-result-hero-grid" aria-live="polite">
                <article class="scan-header-security-result-card scan-header-security-result-card-primary" data-result-visual="ring" aria-label="Primary header review result">
                    <div class="scan-header-security-result-visual-copy scan-header-security-result-visual-copy-top">
                        <span class="scan-header-security-result-kicker">Primary Result</span>
                        <h3 class="scan-header-security-result-title scan-header-security-result-title-center">Grade ${escapeHtml(grade)}</h3>
                    </div>
                    <div class="scan-header-security-result-primary-visual" id="scanHeaderSecurityResultVisual" aria-label="Primary header review result">
                    <div class="scan-header-security-result-ring scan-header-security-score-ring" id="scanHeaderSecurityScoreRing" style="--scan-header-security-result-progress: ${escapeHtml(progressAngle.toFixed(1))}deg; --scan-header-security-progress: ${escapeHtml(progressAngle.toFixed(1))}deg; --scan-header-security-ring-color: ${tone.ringColor}; --scan-header-security-result-value-chars: ${escapeHtml(String(scoreChars))};" aria-label="Hardening score ${escapeHtml(score)} out of 100">
                        <div class="scan-header-security-score-echart" id="scanHeaderSecurityScoreChart" aria-hidden="true"></div>
                        <div class="scan-header-security-result-ring-center scan-header-security-score-center">
                            <div class="scan-header-security-result-ring-value scan-header-security-score-value">${escapeHtml(score)}</div>
                            <div class="scan-header-security-result-ring-unit scan-header-security-score-denominator">/100</div>
                        </div>
                    </div>
                    </div>
                    <div class="scan-header-security-result-visual-copy">
                        <p class="scan-header-security-result-copy">${escapeHtml(summary.scoreNote || 'Visible header posture only')}</p>
                    </div>
                    <span class="scan-header-security-result-card-divider" aria-hidden="true"></span>
                    <div class="scan-header-security-result-chip-row scan-header-security-result-chip-row-center" aria-label="Primary result outcome">
                        <span class="scan-header-security-result-chip scan-header-security-result-chip-outcome scan-header-security-result-chip-${schemeTone}"><span class="scan-header-security-result-chip-icon" aria-hidden="true"><i class="bi bi-shield-lock"></i></span><span>${escapeHtml(schemeLabel)} target</span></span>
                    </div>
                </article>

                <article class="scan-header-security-result-card scan-header-security-result-card-summary" aria-label="Header review summary">
                    <div class="scan-header-security-result-summary-intro">
                        <span class="scan-header-security-result-card-icon scan-header-security-result-card-icon-summary" aria-hidden="true"><i class="bi bi-shield-lock"></i></span>
                        <div class="scan-header-security-result-summary-copy">
                            <div class="scan-header-security-result-kicker">Descriptive Summary</div>
                            <h3 class="scan-header-security-result-title">Visible header posture review</h3>
                            <p class="scan-header-security-result-copy">Final target: ${escapeHtml(summary.finalUrl || result.query.url || '')}. Treat the score as local evidence organization, not a security guarantee.</p>
                        </div>
                    </div>
                    <span class="scan-header-security-result-card-divider" aria-hidden="true"></span>
                    <div class="scan-header-security-result-chip-grid" aria-label="Header review state">
                        <span class="scan-header-security-result-chip scan-header-security-result-chip-${schemeTone}"><span class="scan-header-security-result-chip-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span>${escapeHtml(schemeLabel)} target</span>
                        <span class="scan-header-security-result-chip scan-header-security-result-chip-${failTone}"><span class="scan-header-security-result-chip-icon"><i class="bi bi-x-circle" aria-hidden="true"></i></span>${escapeHtml(summary.failCount || 0)} fail</span>
                        <span class="scan-header-security-result-chip scan-header-security-result-chip-${warnTone}"><span class="scan-header-security-result-chip-icon"><i class="bi bi-exclamation-triangle" aria-hidden="true"></i></span>${escapeHtml(summary.warnCount || 0)} warn</span>
                        <span class="scan-header-security-result-chip scan-header-security-result-chip-${stateTone(summary.httpUpgradeState || 'info')}"><span class="scan-header-security-result-chip-icon"><i class="bi bi-arrow-up-right-circle" aria-hidden="true"></i></span>${escapeHtml(summary.httpUpgradeLabel || 'HTTP upgrade not probed')}</span>
                        <span class="scan-header-security-result-chip scan-header-security-result-chip-${stateTone(summary.hstsState || 'info')}"><span class="scan-header-security-result-chip-icon"><i class="bi bi-lock" aria-hidden="true"></i></span>${escapeHtml(summary.hstsLabel || 'HSTS unknown')}</span>
                        <span class="scan-header-security-result-chip scan-header-security-result-chip-baseline"><span class="scan-header-security-result-chip-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span>Method ${escapeHtml(summary.methodUsed || result.query.method || 'HEAD')}</span>
                    </div>
                </article>
            </div>

            <div class="scan-header-security-result-metric-grid" aria-label="Header review metrics">
                <article class="scan-header-security-result-metric-card scan-header-security-result-metric-success">
                    <span class="scan-header-security-result-metric-icon" aria-hidden="true"><i class="bi bi-card-checklist"></i></span>
                    <span class="scan-header-security-result-metric-label">Findings</span>
                    <strong class="scan-header-security-result-metric-value">${escapeHtml(summary.findingCount || 0)}</strong>
                    <span class="scan-header-security-result-metric-copy">Rows in the evidence table.</span>
                    <span class="scan-header-security-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="scan-header-security-result-metric-card scan-header-security-result-metric-info">
                    <span class="scan-header-security-result-metric-icon" aria-hidden="true"><i class="bi bi-activity"></i></span>
                    <span class="scan-header-security-result-metric-label">Final status</span>
                    <strong class="scan-header-security-result-metric-value">${escapeHtml(statusText || '0')}</strong>
                    <span class="scan-header-security-result-metric-copy">Review model status.</span>
                    <span class="scan-header-security-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="scan-header-security-result-metric-card scan-header-security-result-metric-accent-tone">
                    <span class="scan-header-security-result-metric-icon" aria-hidden="true"><i class="bi bi-clock-history"></i></span>
                    <span class="scan-header-security-result-metric-label">Runtime</span>
                    <strong class="scan-header-security-result-metric-value">${escapeHtml(summary.durationMs || 0)} ms</strong>
                    <span class="scan-header-security-result-metric-copy">Browser render timing.</span>
                    <span class="scan-header-security-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="scan-header-security-result-metric-card scan-header-security-result-metric-warning">
                    <span class="scan-header-security-result-metric-icon" aria-hidden="true"><i class="bi bi-file-earmark-check"></i></span>
                    <span class="scan-header-security-result-metric-label">Notes</span>
                    <strong class="scan-header-security-result-metric-value">${escapeHtml(summary.knownFilePresentCount || 0)}/${escapeHtml(summary.knownFileCount || 0)}</strong>
                    <span class="scan-header-security-result-metric-copy">Optional evidence notes.</span>
                    <span class="scan-header-security-result-metric-accent" aria-hidden="true"></span>
                </article>
            </div>

        `;
    }

    function buildFindingRow(row, index) {
        const copyValue = row.copyValue || `${row.control}: ${row.evidence}`;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td>${escapeHtml(row.category)}</td>
                <td class="scan-header-security-control-cell">
                    <strong>${escapeHtml(row.control)}</strong><br>
                    <span class="text-muted">${escapeHtml(String(row.severity || 'info').toUpperCase())}</span>
                </td>
                <td><span class="scan-header-security-status-pill ${getStatusPillClass(row.status)}">${escapeHtml(row.status)}</span></td>
                <td>${escapeHtml(row.evidence)}</td>
                <td>${escapeHtml(row.recommendation)}</td>
                <td class="scan-header-security-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy finding row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildHeaderRow(row, index) {
        const copyValue = row.copyValue || `${row.name}: ${row.value}`;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td>${escapeHtml(row.category)}</td>
                <td><strong>${escapeHtml(row.name)}</strong></td>
                <td class="scan-header-security-value-cell">${escapeHtml(row.value)}</td>
                <td class="scan-header-security-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy header row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildTransportRow(row, index) {
        const copyValue = row.copyValue || row.value;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><strong>${escapeHtml(row.label)}</strong></td>
                <td class="scan-header-security-value-cell">${escapeHtml(row.value)}</td>
                <td class="scan-header-security-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy transport row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildKnownFileRow(row, index) {
        const copyValue = row.copyValue || row.url || row.path;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><strong>${escapeHtml(row.path)}</strong></td>
                <td><span class="scan-header-security-status-pill ${getStatusPillClass(row.present ? 'pass' : 'info')}">${escapeHtml(row.statusLabel || `${row.status} ${row.statusText}`)}</span></td>
                <td class="scan-header-security-value-cell">${escapeHtml(row.note)}</td>
                <td class="scan-header-security-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy well-known file row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildCookieRow(row, index) {
        const copyValue = row.copyValue || row.raw;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><strong>${escapeHtml(row.name)}</strong></td>
                <td>${escapeHtml(row.secure)}</td>
                <td>${escapeHtml(row.httpOnly)}</td>
                <td>${escapeHtml(row.sameSite)}</td>
                <td class="scan-header-security-issues-cell">${escapeHtml(row.issues)}</td>
                <td class="scan-header-security-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy cookie row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildCopyButton(copyValue, label) {
        return `
            <button type="button" class="scan-header-security-copy-btn" data-copy="${escapeHtml(copyValue || '')}" data-icon-only="true" aria-label="${escapeHtml(label)}" title="Copy row">
                <i class="bi bi-clipboard" aria-hidden="true"></i>
            </button>
        `;
    }

    function buildEmptyRow(colspan, message) {
        return `<tr><td colspan="${colspan}"><div class="scan-header-security-empty-block">${escapeHtml(message)}</div></td></tr>`;
    }

    function buildJsonPayload(result) {
        return result;
    }

    function readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                resolve(String(reader.result || ''));
            });
            reader.addEventListener('error', function () {
                reject(new Error('The selected JSON file could not be read.'));
            });
            reader.readAsText(file);
        });
    }

    function normalizeImportedRows(rows) {
        return Array.isArray(rows)
            ? rows.map((row) => (row && typeof row === 'object' ? row : {}))
            : [];
    }

    function normalizeImportedBoolean(value, fallback) {
        return typeof value === 'boolean' ? value : fallback;
    }

    function normalizeImportedQuery(query, summary) {
        const rawQuery = query && typeof query === 'object' ? query : {};
        const rawSummary = summary && typeof summary === 'object' ? summary : {};
        const method = String(rawQuery.method || 'HEAD').toUpperCase();
        const userAgentProfile = String(rawQuery.userAgentProfile || 'default').toLowerCase();

        return {
            url: normalizeUrl(rawQuery.url || rawSummary.finalUrl || ''),
            baseline: ['balanced', 'strict', 'api'].includes(String(rawQuery.baseline || '').toLowerCase())
                ? String(rawQuery.baseline).toLowerCase()
                : 'balanced',
            targetContext: String(rawQuery.targetContext || 'Web application').trim() || 'Web application',
            method: ['HEAD', 'GET'].includes(method) ? method : 'HEAD',
            followRedirects: normalizeImportedBoolean(rawQuery.followRedirects, true),
            timeoutSeconds: normalizeTimeoutSeconds(rawQuery.timeoutSeconds || 12),
            validateTls: normalizeImportedBoolean(rawQuery.validateTls, true),
            fallbackGetOn405: normalizeImportedBoolean(rawQuery.fallbackGetOn405, true),
            userAgentProfile: ['default', 'desktop', 'mobile'].includes(userAgentProfile) ? userAgentProfile : 'default',
            cspMode: ['enforced', 'report-only', 'both'].includes(String(rawQuery.cspMode || '').toLowerCase())
                ? String(rawQuery.cspMode).toLowerCase()
                : 'enforced',
            hstsMaxAge: normalizePositiveInteger(rawQuery.hstsMaxAge, 31536000),
            cookieMode: ['include', 'separate', 'skip'].includes(String(rawQuery.cookieMode || '').toLowerCase())
                ? String(rawQuery.cookieMode).toLowerCase()
                : 'include',
            emphasizedHeaders: Array.isArray(rawQuery.emphasizedHeaders) ? rawQuery.emphasizedHeaders.map(String) : [],
            policyNotes: Array.isArray(rawQuery.policyNotes) ? rawQuery.policyNotes.map(String) : [],
            checkWellKnownFiles: normalizeImportedBoolean(rawQuery.checkWellKnownFiles, true),
            probeHttpUpgrade: normalizeImportedBoolean(rawQuery.probeHttpUpgrade, true)
        };
    }

    function normalizeImportedResult(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('Import a JSON object exported from Header Security Scanner.');
        }

        const summary = payload.summary && typeof payload.summary === 'object' ? payload.summary : {};
        const findings = normalizeImportedRows(payload.findings).map((row, index) => ({
            ...row,
            index: Number.isFinite(Number(row.index)) ? Number(row.index) : index + 1
        }));
        const result = {
            query: normalizeImportedQuery(payload.query, summary),
            summary,
            findings,
            headerRows: normalizeImportedRows(payload.headerRows),
            transportRows: normalizeImportedRows(payload.transportRows),
            knownFileRows: normalizeImportedRows(payload.knownFileRows),
            cookieRows: normalizeImportedRows(payload.cookieRows),
            generatedAt: payload.generatedAt || new Date().toISOString()
        };

        if (
            !result.query.url &&
            result.findings.length === 0 &&
            result.headerRows.length === 0 &&
            result.transportRows.length === 0 &&
            result.knownFileRows.length === 0 &&
            result.cookieRows.length === 0
        ) {
            throw new Error('Import a JSON payload with header review query or result rows.');
        }

        return result;
    }

    function buildImportedPayloadState(payload) {
        return normalizeImportedResult(payload);
    }

    function syncFormFromQuery(query) {
        urlInput.value = query.url || '';
        targetContextInput.value = query.targetContext || 'Web application';
        timeoutInput.value = String(query.timeoutSeconds || 12);
        hstsMaxAgeInput.value = String(query.hstsMaxAge || 31536000);
        headerListInput.value = Array.isArray(query.emphasizedHeaders) ? query.emphasizedHeaders.join('\n') : '';
        policyNotesInput.value = Array.isArray(query.policyNotes) ? query.policyNotes.join('\n') : '';
        followRedirectsInput.checked = query.followRedirects !== false;
        validateTlsInput.checked = query.validateTls !== false;
        fallbackGetInput.checked = query.fallbackGetOn405 !== false;
        wellKnownInput.checked = query.checkWellKnownFiles !== false;
        httpUpgradeInput.checked = query.probeHttpUpgrade !== false;
        setInlineDropdownValue(baselineInput, query.baseline || 'balanced', 'balanced', ['balanced', 'strict', 'api']);
        setInlineDropdownValue(methodInput, query.method || 'HEAD', 'HEAD', ['HEAD', 'GET']);
        setInlineDropdownValue(userAgentInput, query.userAgentProfile || 'default', 'default', ['default', 'desktop', 'mobile']);
        setInlineDropdownValue(cspModeInput, query.cspMode || 'enforced', 'enforced', ['enforced', 'report-only', 'both']);
        setInlineDropdownValue(cookieModeInput, query.cookieMode || 'include', 'include', ['include', 'separate', 'skip']);
    }

    function toCsv(rows) {
        return rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    }

    function buildCsvContent(result) {
        const rows = getSortedFindings().map((row) => [
            row.index,
            row.category,
            row.control,
            row.status,
            row.severity,
            row.evidence,
            row.recommendation
        ]);

        return toCsv([
            ['Index', 'Category', 'Control', 'Status', 'Severity', 'Evidence', 'Recommendation'],
            ...rows
        ]);
    }

    function renderLatestResult() {
        if (!latestResult) {
            return;
        }

        const sortedFindings = getSortedFindings();
        const summary = latestResult.summary || {};
        const score = Number(summary.score || 0);
        const tone = getScoreTone(summary);

        destroyScoreRingChart();
        resultSummary.classList.add('scan-header-security-result-summary');
        resultSummary.dataset.resultTone = Number(summary.failCount || 0) > 0 ? 'error' : Number(summary.warnCount || 0) > 0 ? 'warning' : 'success';
        resultSummary.dataset.resultLayout = 'scan_overview';
        resultSummary.innerHTML = buildSummaryHtml(latestResult);
        renderScoreRingChart(score, tone);
        findingTableBody.innerHTML = sortedFindings.length > 0
            ? sortedFindings.map((row, index) => buildFindingRow(row, index)).join('')
            : buildEmptyRow(7, 'The scan did not produce any findings for this target.');
        headerTableBody.innerHTML = latestResult.headerRows.length > 0
            ? latestResult.headerRows.map((row, index) => buildHeaderRow(row, index)).join('')
            : buildEmptyRow(5, 'No header evidence rows were generated for this review.');
        transportTableBody.innerHTML = latestResult.transportRows.length > 0
            ? latestResult.transportRows.map((row, index) => buildTransportRow(row, index)).join('')
            : buildEmptyRow(4, 'No transport summary is available for this scan.');
        knownFileTableBody.innerHTML = latestResult.knownFileRows.length > 0
            ? latestResult.knownFileRows.map((row, index) => buildKnownFileRow(row, index)).join('')
            : buildEmptyRow(5, 'Evidence notes were skipped for this review.');
        cookieTableBody.innerHTML = latestResult.cookieRows.length > 0
            ? latestResult.cookieRows.map((row, index) => buildCookieRow(row, index)).join('')
            : buildEmptyRow(7, 'The primary response did not expose any Set-Cookie headers.');
        renderJsonOutput(buildJsonPayload(latestResult));
        setResultState();
    }

    function activateTab(target) {
        tabButtons.forEach((button) => {
            const isActive = button.dataset.tabTarget === target;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        tabPanels.forEach((panel) => {
            const isActive = panel.dataset.tabPanel === target;

            panel.classList.toggle('d-none', !isActive);
            panel.toggleAttribute('hidden', !isActive);
        });
    }

    function syncQueryState(query) {
        const params = new URLSearchParams();
        params.set('url', query.url);
        params.set('baseline', query.baseline);
        params.set('context', query.targetContext);
        params.set('method', query.method);
        params.set('follow', query.followRedirects ? '1' : '0');
        params.set('timeout', String(query.timeoutSeconds));
        params.set('tls', query.validateTls ? '1' : '0');
        params.set('fallback', query.fallbackGetOn405 ? '1' : '0');
        params.set('ua', query.userAgentProfile);
        params.set('csp', query.cspMode);
        params.set('hsts', String(query.hstsMaxAge));
        params.set('cookies', query.cookieMode);
        params.set('files', query.checkWellKnownFiles ? '1' : '0');
        params.set('upgrade', query.probeHttpUpgrade ? '1' : '0');
        window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    }

    function restoreStateFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const url = params.get('url') || '';
        const method = (params.get('method') || '').toUpperCase();
        const timeoutSeconds = normalizeTimeoutSeconds(params.get('timeout') || '12');
        const userAgent = (params.get('ua') || '').toLowerCase();
        const baseline = (params.get('baseline') || '').toLowerCase();
        const cspMode = (params.get('csp') || '').toLowerCase();
        const cookieMode = (params.get('cookies') || '').toLowerCase();

        if (url) {
            urlInput.value = url;
        }

        if (params.get('context')) {
            targetContextInput.value = params.get('context');
        }

        if (['balanced', 'strict', 'api'].includes(baseline)) {
            setInlineDropdownValue(baselineInput, baseline, 'balanced', ['balanced', 'strict', 'api']);
        }

        if (['HEAD', 'GET'].includes(method)) {
            setInlineDropdownValue(methodInput, method, 'HEAD', ['HEAD', 'GET']);
        }

        timeoutInput.value = String(timeoutSeconds);
        hstsMaxAgeInput.value = String(normalizePositiveInteger(params.get('hsts') || '31536000', 31536000));

        if ((params.get('follow') || '') === '0') {
            followRedirectsInput.checked = false;
        }

        if ((params.get('tls') || '') === '0') {
            validateTlsInput.checked = false;
        }

        if ((params.get('fallback') || '') === '0') {
            fallbackGetInput.checked = false;
        }

        if (['default', 'desktop', 'mobile'].includes(userAgent)) {
            setInlineDropdownValue(userAgentInput, userAgent, 'default', ['default', 'desktop', 'mobile']);
        }

        if (['enforced', 'report-only', 'both'].includes(cspMode)) {
            setInlineDropdownValue(cspModeInput, cspMode, 'enforced', ['enforced', 'report-only', 'both']);
        }

        if (['include', 'separate', 'skip'].includes(cookieMode)) {
            setInlineDropdownValue(cookieModeInput, cookieMode, 'include', ['include', 'separate', 'skip']);
        }

        if ((params.get('files') || '') === '0') {
            wellKnownInput.checked = false;
        }

        if ((params.get('upgrade') || '') === '0') {
            httpUpgradeInput.checked = false;
        }

        return Boolean(url);
    }

    function resetWorkspace() {
        latestResult = null;
        urlInput.value = 'https://app.example.com/login';
        targetContextInput.value = 'Web application';
        timeoutInput.value = '12';
        hstsMaxAgeInput.value = '31536000';
        headerListInput.value = '';
        policyNotesInput.value = '';
        followRedirectsInput.checked = true;
        validateTlsInput.checked = true;
        fallbackGetInput.checked = true;
        wellKnownInput.checked = true;
        httpUpgradeInput.checked = true;
        setInlineDropdownValue(baselineInput, 'balanced', 'balanced', ['balanced', 'strict', 'api']);
        setInlineDropdownValue(methodInput, 'HEAD', 'HEAD', ['HEAD', 'GET']);
        setInlineDropdownValue(userAgentInput, 'default', 'default', ['default', 'desktop', 'mobile']);
        setInlineDropdownValue(cspModeInput, 'enforced', 'enforced', ['enforced', 'report-only', 'both']);
        setInlineDropdownValue(cookieModeInput, 'include', 'include', ['include', 'separate', 'skip']);
        setSortMode('id', false);
        destroyScoreRingChart();
        resultEmpty.textContent = 'Prepare a header review to inspect findings, evidence rows, surface notes, policy notes, and JSON restore data.';
        resultEmpty.classList.remove('d-none');
        resultContent.classList.add('d-none');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        setInputError('');
        resultSummary.innerHTML = '';
        findingTableBody.innerHTML = '';
        headerTableBody.innerHTML = '';
        transportTableBody.innerHTML = '';
        knownFileTableBody.innerHTML = '';
        cookieTableBody.innerHTML = '';
        jsonOutput.innerHTML = '';
        window.history.replaceState(null, '', window.location.pathname);
    }

    function downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(objectUrl);
    }

    function exportResultShellAsPdf(filenameStem, container) {
        const exportWindow = window.open('', '_blank', 'noopener,noreferrer');
        const shell = container;

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

    sortOptions.forEach((option) => {
        option.addEventListener('click', function () {
            setSortMode(option.dataset.sortValue || 'id');
            sortSelect.removeAttribute('open');
        });
    });

    sortInput.addEventListener('change', function () {
        setSortMode(sortInput.value || 'id');
    });

    sortSelect.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            sortSelect.removeAttribute('open');
        }
    });

    methodInput.addEventListener('change', function () {
        setInlineDropdownValue(methodInput, methodInput.value, 'HEAD', ['HEAD', 'GET']);
    });

    baselineInput.addEventListener('change', function () {
        setInlineDropdownValue(baselineInput, baselineInput.value, 'balanced', ['balanced', 'strict', 'api']);
    });

    userAgentInput.addEventListener('change', function () {
        setInlineDropdownValue(userAgentInput, userAgentInput.value, 'default', ['default', 'desktop', 'mobile']);
    });

    cspModeInput.addEventListener('change', function () {
        setInlineDropdownValue(cspModeInput, cspModeInput.value, 'enforced', ['enforced', 'report-only', 'both']);
    });

    cookieModeInput.addEventListener('change', function () {
        setInlineDropdownValue(cookieModeInput, cookieModeInput.value, 'include', ['include', 'separate', 'skip']);
    });

    root.querySelectorAll('input, textarea').forEach(function (control) {
        control.addEventListener('input', function () {
            if (latestResult) {
                latestResult = buildHeaderReviewResult(buildQuery());
                renderLatestResult();
            }
        });
        control.addEventListener('change', function () {
            if (latestResult) {
                latestResult = buildHeaderReviewResult(buildQuery());
                renderLatestResult();
            }
        });
    });

    secondaryButton.addEventListener('click', resetWorkspace);

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

    resultContent.addEventListener('click', async function (event) {
        const button = event.target.closest('[data-copy]');

        if (!button || button.disabled) {
            return;
        }

        try {
            await writeClipboardText(button.dataset.copy || '');
            flashButton(button, 'Copied');
        } catch (error) {
            flashButton(button, 'Failed');
        }
    });

    if (exportPdfButton) {
        exportPdfButton.addEventListener('click', function () {
            if (!latestResult) {
                return;
            }

            exportResultShellAsPdf('scan-header-security', resultContent);
            flashButton(exportPdfButton, 'Opened');
        });
    }

    if (downloadCsvButton) {
        downloadCsvButton.addEventListener('click', function () {
            if (!latestResult) {
                return;
            }

            downloadFile(
                'scan-header-security-findings.csv',
                buildCsvContent(latestResult),
                'text/csv;charset=utf-8'
            );
            flashButton(downloadCsvButton, 'Saved');
        });
    }

    if (copyJsonButton) {
        copyJsonButton.addEventListener('click', async function () {
            if (!latestResult) {
                return;
            }

            try {
                await writeClipboardText(JSON.stringify(buildJsonPayload(latestResult), null, 2));
                flashButton(copyJsonButton, 'Copied');
            } catch (error) {
                flashButton(copyJsonButton, 'Failed');
            }
        });
    }

    if (downloadJsonButton) {
        downloadJsonButton.addEventListener('click', function () {
            if (!latestResult) {
                return;
            }

            downloadFile(
                'scan-header-security.json',
                JSON.stringify(buildJsonPayload(latestResult), null, 2),
                'application/json;charset=utf-8'
            );
            flashButton(downloadJsonButton, 'Saved');
        });
    }

    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });

    importJsonInput.addEventListener('change', async function () {
        const file = importJsonInput.files && importJsonInput.files[0];

        if (!file) {
            return;
        }

        try {
            const payload = JSON.parse(await readFileAsText(file));
            latestResult = buildImportedPayloadState(payload);
            syncFormFromQuery(latestResult.query);
            syncQueryState(latestResult.query);
            renderLatestResult();
            activateTab('findings');
            flashButton(importJsonButton, 'Imported');
        } catch (error) {
            resultError.classList.remove('d-none');
            resultError.textContent = error.message || 'The selected JSON file could not be imported.';
            flashButton(importJsonButton, 'Failed');
        } finally {
            importJsonInput.value = '';
        }
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const query = buildQuery();
        const validationError = validateQuery(query);

        if (validationError) {
            setInputError(validationError);
            setErrorState(validationError);
            return;
        }

        setInputError('');
        syncQueryState(query);
        setLoadingState(`Preparing ${query.url} header policy review output...`);
        toggleSubmitState(true);

        try {
            latestResult = await scanTarget(query);
            renderLatestResult();
            activateTab('findings');
        } catch (error) {
            setErrorState(error.message);
        } finally {
            toggleSubmitState(false);
        }
    });

    setSortMode(sortInput.value || 'id', false);
    setInlineDropdownValue(baselineInput, baselineInput.value, 'balanced', ['balanced', 'strict', 'api']);
    setInlineDropdownValue(methodInput, methodInput.value, 'HEAD', ['HEAD', 'GET']);
    setInlineDropdownValue(userAgentInput, userAgentInput.value, 'default', ['default', 'desktop', 'mobile']);
    setInlineDropdownValue(cspModeInput, cspModeInput.value, 'enforced', ['enforced', 'report-only', 'both']);
    setInlineDropdownValue(cookieModeInput, cookieModeInput.value, 'include', ['include', 'separate', 'skip']);
    activateTab('findings');

    document.addEventListener('click', function (event) {
        if (sortSelect.contains(event.target)) {
            return;
        }

        sortSelect.removeAttribute('open');
    });

    restoreStateFromQuery();
});
// ns:start family._base.workspace.07_table-output
(function setupScanHeaderSecurityTableOutputStandard() {
    const rootSelector = '.scan-header-security-tool';
    const tableSelector = '.tool-result-table tbody tr, .scan-header-security-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .scan-header-security-table tbody';
    const clampClass = 'scan-header-security-table-cell-text';
    const cellClampClass = 'scan-header-security-cell-clamp';
    const statusColumnClass = 'scan-header-security-table-status-cell';

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
        root.querySelectorAll('.tool-result-table, .scan-header-security-table').forEach(function alignStatusTable(table) {
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
// ns:end family._base.workspace.07_table-output
