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
const __DOM_ID_PREFIX__VisualContractMarker = 'family.scanning.workspace.04_visual-contract';
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

installInfraStackResultSummaryNormalizer('__TOOL_SLUG__');
// ns:end family._base.workspace.05_result-summary
// ns:start family._base.workspace.06_output-toolbar
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.06_output-toolbar
// ns:start family._base.workspace.08_json-restore
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.08_json-restore

document.addEventListener('DOMContentLoaded', function () {
    const root = document.querySelector('.__TOOL_CLASS__');

    if (!root) {
        return;
    }

    function getById(id) {
        return root.querySelector(`#${id}`);
    }

    const form = getById('__DOM_ID_PREFIX__Form');
    const urlInput = getById('__DOM_ID_PREFIX__Url');
    const methodInput = getById('__DOM_ID_PREFIX__Method');
    const followRedirectsInput = getById('__DOM_ID_PREFIX__FollowRedirects');
    const timeoutInput = getById('__DOM_ID_PREFIX__Timeout');
    const validateTlsInput = getById('__DOM_ID_PREFIX__ValidateTls');
    const fallbackGetInput = getById('__DOM_ID_PREFIX__FallbackGet');
    const userAgentInput = getById('__DOM_ID_PREFIX__UserAgent');
    const wellKnownInput = getById('__DOM_ID_PREFIX__WellKnown');
    const httpUpgradeInput = getById('__DOM_ID_PREFIX__HttpUpgrade');
    const submitButton = getById('__DOM_ID_PREFIX__Submit');
    const sortInput = getById('__DOM_ID_PREFIX__Sort');
    const sortSummary = getById('__DOM_ID_PREFIX__SortSummary');
    const sortOptions = Array.from(root.querySelectorAll('.__PREFIX__-sort-option'));
    const sortSelect = getById('__DOM_ID_PREFIX__SortSelect');
    const resultEmpty = getById('__DOM_ID_PREFIX__ResultEmpty');
    const resultContent = getById('__DOM_ID_PREFIX__ResultContent');
    const resultError = getById('__DOM_ID_PREFIX__ResultError');
    const resultSummary = getById('__DOM_ID_PREFIX__ResultSummary');
    const findingTableBody = getById('__DOM_ID_PREFIX__FindingTableBody');
    const headerTableBody = getById('__DOM_ID_PREFIX__HeaderTableBody');
    const transportTableBody = getById('__DOM_ID_PREFIX__TransportTableBody');
    const knownFileTableBody = getById('__DOM_ID_PREFIX__KnownFileTableBody');
    const cookieTableBody = getById('__DOM_ID_PREFIX__CookieTableBody');
    const jsonOutput = getById('__DOM_ID_PREFIX__JsonOutput');
    const exportPdfButton = getById('__DOM_ID_PREFIX__ExportPdf');
    const downloadCsvButton = getById('__DOM_ID_PREFIX__DownloadCsv');
    const copyJsonButton = getById('__DOM_ID_PREFIX__CopyJson');
    const downloadJsonButton = getById('__DOM_ID_PREFIX__DownloadJson');
    const importJsonButton = getById('__DOM_ID_PREFIX__ImportJsonButton');
    const importJsonInput = getById('__DOM_ID_PREFIX__ImportJson');
    const tabButtons = Array.from(root.querySelectorAll('.__PREFIX__-tab-btn'));
    const tabPanels = Array.from(root.querySelectorAll('.__PREFIX__-tab-panel'));

    const ECHARTS_CDN_URL = 'https://cdn.jsdelivr.net/npm/echarts@6/dist/echarts.min.js';

    let latestResult = null;
    let echartsPromise = null;
    let scoreRingChart = null;
    let scoreRingResizeHandler = null;

    function initMarkdownCopyButtons() {
        const scanInputBlocks = Array.from(document.querySelectorAll('.markdown-content pre.__PREFIX__-example-input'));
        const scanInputCopyButtons = document.querySelectorAll('.__PREFIX__-input-copy-btn');

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

        const codeBlocks = document.querySelectorAll('.markdown-content .__PREFIX__-markdown-card pre:not(.__PREFIX__-example-input)');

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
        !methodInput ||
        !followRedirectsInput ||
        !timeoutInput ||
        !validateTlsInput ||
        !fallbackGetInput ||
        !userAgentInput ||
        !wellKnownInput ||
        !httpUpgradeInput ||
        !submitButton ||
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
                const existingScript = document.querySelector(`script[data-__PREFIX__-echarts], script[src="${ECHARTS_CDN_URL}"]`);

                if (existingScript) {
                    existingScript.addEventListener('load', () => resolve(window.echarts || null), { once: true });
                    existingScript.addEventListener('error', () => resolve(null), { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.src = ECHARTS_CDN_URL;
                script.async = true;
                script.dataset.__DOM_ID_PREFIX__Echarts = 'true';
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
        const chartElement = getById('__DOM_ID_PREFIX__ScoreChart');
        const ringElement = getById('__DOM_ID_PREFIX__ScoreRing');

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
            method: getInlineDropdownValue(methodInput, 'HEAD', ['HEAD', 'GET']).toUpperCase(),
            followRedirects: Boolean(followRedirectsInput.checked),
            timeoutSeconds: normalizeTimeoutSeconds(timeoutInput.value),
            validateTls: Boolean(validateTlsInput.checked),
            fallbackGetOn405: Boolean(fallbackGetInput.checked),
            userAgentProfile: getInlineDropdownValue(userAgentInput, 'default', ['default', 'desktop', 'mobile']).toLowerCase(),
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

    function toggleSubmitState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.textContent = 'Scanning...';

            return;
        }

        submitButton.disabled = false;
        submitButton.textContent = 'Scan';
    }

    async function scanTarget(query) {
        const response = await fetch('/api/__CATEGORY__/__TOOL_SLUG__', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        });
        const responseText = await response.text();
        let payload = {};

        try {
            payload = responseText ? JSON.parse(responseText) : {};
        } catch (error) {
            if (!response.ok) {
                throw new Error(`The web security scan API returned HTTP ${response.status} instead of readable JSON.`);
            }

            throw new Error('The server returned an unreadable response while running the web security scan.');
        }

        if (!response.ok) {
            throw new Error(payload.error || 'The server could not complete the web security scan.');
        }

        return {
            query: payload.query || query,
            summary: payload.summary || {},
            findings: Array.isArray(payload.findings) ? payload.findings : [],
            headerRows: Array.isArray(payload.headerRows) ? payload.headerRows : [],
            transportRows: Array.isArray(payload.transportRows) ? payload.transportRows : [],
            knownFileRows: Array.isArray(payload.knownFileRows) ? payload.knownFileRows : [],
            cookieRows: Array.isArray(payload.cookieRows) ? payload.cookieRows : [],
            generatedAt: payload.generatedAt || new Date().toISOString()
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
                badgeClass: '__PREFIX__-badge-fail'
            };
        }

        if (Number(summary.warnCount || 0) > 0 || Number(summary.score || 0) < 85) {
            return {
                ringColor: '#F59E0B',
                badgeClass: '__PREFIX__-badge-warn'
            };
        }

        return {
            ringColor: '#16A34A',
            badgeClass: '__PREFIX__-badge-pass'
        };
    }

    function getStatusPillClass(status) {
        if (status === 'fail') {
            return '__PREFIX__-status-fail';
        }

        if (status === 'warn') {
            return '__PREFIX__-status-warn';
        }

        if (status === 'pass') {
            return '__PREFIX__-status-pass';
        }

        return '__PREFIX__-status-info';
    }

    function getBadgeClassForState(state) {
        if (state === 'fail') {
            return '__PREFIX__-badge-fail';
        }

        if (state === 'warn') {
            return '__PREFIX__-badge-warn';
        }

        if (state === 'pass') {
            return '__PREFIX__-badge-pass';
        }

        return '__PREFIX__-badge-neutral';
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
            <div class="__PREFIX__-result-hero-grid" aria-live="polite">
                <article class="__PREFIX__-result-card __PREFIX__-result-card-main">
                    <span class="__PREFIX__-result-kicker">Scan summary</span>
                    <h3 class="__PREFIX__-result-title">Visible web posture review</h3>
                    <p class="__PREFIX__-result-copy">Final target: ${escapeHtml(summary.finalUrl || result.query.url || '')}. Treat the score as local evidence organization, not a security guarantee.</p>
                    <div class="__PREFIX__-result-chip-row" aria-label="Scan state">
                        <span class="__PREFIX__-result-chip __PREFIX__-result-chip-${schemeTone}"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-shield-lock" aria-hidden="true"></i></span>${escapeHtml(schemeLabel)} final</span>
                        <span class="__PREFIX__-result-chip __PREFIX__-result-chip-${failTone}"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-x-circle" aria-hidden="true"></i></span>${escapeHtml(summary.failCount || 0)} fail</span>
                        <span class="__PREFIX__-result-chip __PREFIX__-result-chip-${warnTone}"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-exclamation-triangle" aria-hidden="true"></i></span>${escapeHtml(summary.warnCount || 0)} warn</span>
                        <span class="__PREFIX__-result-chip __PREFIX__-result-chip-${stateTone(summary.httpUpgradeState || 'info')}"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-arrow-up-right-circle" aria-hidden="true"></i></span>${escapeHtml(summary.httpUpgradeLabel || 'HTTP upgrade not probed')}</span>
                        <span class="__PREFIX__-result-chip __PREFIX__-result-chip-${stateTone(summary.hstsState || 'info')}"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-lock" aria-hidden="true"></i></span>${escapeHtml(summary.hstsLabel || 'HSTS unknown')}</span>
                        <span class="__PREFIX__-result-chip __PREFIX__-result-chip-baseline"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-clock-history" aria-hidden="true"></i></span>Last run: ${escapeHtml(lastRunText)}</span>
                    </div>
                </article>

                <article class="__PREFIX__-result-card __PREFIX__-result-card-visual">
                    <div class="__PREFIX__-result-visual-copy __PREFIX__-result-visual-copy-top">
                        <span class="__PREFIX__-result-kicker">Primary Result</span>
                        <h3 class="__PREFIX__-result-title __PREFIX__-result-title-center">Grade ${escapeHtml(grade)}</h3>
                    </div>
                    <div class="__PREFIX__-result-ring __PREFIX__-score-ring" id="__DOM_ID_PREFIX__ScoreRing" style="--__PREFIX__-result-progress: ${escapeHtml(progressAngle.toFixed(1))}deg; --__PREFIX__-progress: ${escapeHtml(progressAngle.toFixed(1))}deg; --__PREFIX__-ring-color: ${tone.ringColor};" aria-label="Hardening score ${escapeHtml(score)} out of 100">
                        <div class="__PREFIX__-score-echart" id="__DOM_ID_PREFIX__ScoreChart" aria-hidden="true"></div>
                        <div class="__PREFIX__-result-ring-center __PREFIX__-score-center">
                            <div class="__PREFIX__-result-ring-value __PREFIX__-score-value">${escapeHtml(score)}</div>
                            <div class="__PREFIX__-result-ring-unit __PREFIX__-score-denominator">/100</div>
                        </div>
                    </div>
                    <div class="__PREFIX__-result-visual-copy">
                        <p class="__PREFIX__-result-copy">${escapeHtml(summary.scoreNote || 'Visible web posture only')}</p>
                    </div>
                </article>
            </div>

            <div class="__PREFIX__-result-metric-grid" aria-label="Scan metrics">
                <article class="__PREFIX__-result-metric-card">
                    <span class="__PREFIX__-result-metric-label">Findings</span>
                    <strong class="__PREFIX__-result-metric-value">${escapeHtml(summary.findingCount || 0)}</strong>
                    <span class="__PREFIX__-result-metric-copy">Rows in the evidence table.</span>
                </article>
                <article class="__PREFIX__-result-metric-card">
                    <span class="__PREFIX__-result-metric-label">Final status</span>
                    <strong class="__PREFIX__-result-metric-value">${escapeHtml(statusText || '0')}</strong>
                    <span class="__PREFIX__-result-metric-copy">Observed response status.</span>
                </article>
                <article class="__PREFIX__-result-metric-card">
                    <span class="__PREFIX__-result-metric-label">Duration</span>
                    <strong class="__PREFIX__-result-metric-value">${escapeHtml(summary.durationMs || 0)} ms</strong>
                    <span class="__PREFIX__-result-metric-copy">Client-side scan timing.</span>
                </article>
                <article class="__PREFIX__-result-metric-card">
                    <span class="__PREFIX__-result-metric-label">Known files</span>
                    <strong class="__PREFIX__-result-metric-value">${escapeHtml(summary.knownFilePresentCount || 0)}/${escapeHtml(summary.knownFileCount || 0)}</strong>
                    <span class="__PREFIX__-result-metric-copy">Well-known file probes.</span>
                </article>
            </div>

            <div class="__PREFIX__-result-chip-row" aria-label="Scan options">
                <span class="__PREFIX__-result-chip __PREFIX__-result-chip-baseline"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-terminal" aria-hidden="true"></i></span>Method ${escapeHtml(summary.methodUsed || result.query.method || 'HEAD')}</span>
                <span class="__PREFIX__-result-chip __PREFIX__-result-chip-${result.query.followRedirects ? 'ready' : 'baseline'}"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-signpost-split" aria-hidden="true"></i></span>Redirects ${result.query.followRedirects ? 'followed' : 'not followed'}</span>
                <span class="__PREFIX__-result-chip __PREFIX__-result-chip-${result.query.validateTls ? 'ready' : 'warning'}"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-patch-check" aria-hidden="true"></i></span>TLS validation ${result.query.validateTls ? 'on' : 'off'}</span>
                <span class="__PREFIX__-result-chip __PREFIX__-result-chip-${result.query.checkWellKnownFiles ? 'ready' : 'baseline'}"><span class="__PREFIX__-result-chip-icon"><i class="bi bi-file-earmark-check" aria-hidden="true"></i></span>Well-known files ${result.query.checkWellKnownFiles ? 'checked' : 'skipped'}</span>
            </div>
        `;
    }

    function buildFindingRow(row, index) {
        const copyValue = row.copyValue || `${row.control}: ${row.evidence}`;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td>${escapeHtml(row.category)}</td>
                <td class="__PREFIX__-control-cell">
                    <strong>${escapeHtml(row.control)}</strong><br>
                    <span class="text-muted">${escapeHtml(String(row.severity || 'info').toUpperCase())}</span>
                </td>
                <td><span class="__PREFIX__-status-pill ${getStatusPillClass(row.status)}">${escapeHtml(row.status)}</span></td>
                <td>${escapeHtml(row.evidence)}</td>
                <td>${escapeHtml(row.recommendation)}</td>
                <td class="__PREFIX__-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy finding row ${index + 1}`)}</td>
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
                <td class="__PREFIX__-value-cell">${escapeHtml(row.value)}</td>
                <td class="__PREFIX__-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy header row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildTransportRow(row, index) {
        const copyValue = row.copyValue || row.value;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><strong>${escapeHtml(row.label)}</strong></td>
                <td class="__PREFIX__-value-cell">${escapeHtml(row.value)}</td>
                <td class="__PREFIX__-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy transport row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildKnownFileRow(row, index) {
        const copyValue = row.copyValue || row.url || row.path;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><strong>${escapeHtml(row.path)}</strong></td>
                <td><span class="__PREFIX__-status-pill ${getStatusPillClass(row.present ? 'pass' : 'info')}">${escapeHtml(row.statusLabel || `${row.status} ${row.statusText}`)}</span></td>
                <td class="__PREFIX__-value-cell">${escapeHtml(row.note)}</td>
                <td class="__PREFIX__-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy well-known file row ${index + 1}`)}</td>
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
                <td class="__PREFIX__-issues-cell">${escapeHtml(row.issues)}</td>
                <td class="__PREFIX__-copy-cell tool-table-action-cell">${buildCopyButton(copyValue, `Copy cookie row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildCopyButton(copyValue, label) {
        return `
            <button type="button" class="__PREFIX__-copy-btn" data-copy="${escapeHtml(copyValue || '')}" data-icon-only="true" aria-label="${escapeHtml(label)}" title="Copy row">
                <i class="bi bi-clipboard" aria-hidden="true"></i>
            </button>
        `;
    }

    function buildEmptyRow(colspan, message) {
        return `<tr><td colspan="${colspan}"><div class="__PREFIX__-empty-block">${escapeHtml(message)}</div></td></tr>`;
    }

    function buildJsonPayload(result) {
        return result;
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
            method: ['HEAD', 'GET'].includes(method) ? method : 'HEAD',
            followRedirects: normalizeImportedBoolean(rawQuery.followRedirects, true),
            timeoutSeconds: normalizeTimeoutSeconds(rawQuery.timeoutSeconds || 12),
            validateTls: normalizeImportedBoolean(rawQuery.validateTls, true),
            fallbackGetOn405: normalizeImportedBoolean(rawQuery.fallbackGetOn405, true),
            userAgentProfile: ['default', 'desktop', 'mobile'].includes(userAgentProfile) ? userAgentProfile : 'default',
            checkWellKnownFiles: normalizeImportedBoolean(rawQuery.checkWellKnownFiles, true),
            probeHttpUpgrade: normalizeImportedBoolean(rawQuery.probeHttpUpgrade, true)
        };
    }

    function normalizeImportedResult(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('Import a JSON object exported from __TOOL_TITLE__.');
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
            throw new Error('Import a JSON payload with scanner query or result rows.');
        }

        return result;
    }

    function buildImportedPayloadState(payload) {
        return normalizeImportedResult(payload);
    }

    function syncFormFromQuery(query) {
        urlInput.value = query.url || '';
        timeoutInput.value = String(query.timeoutSeconds || 12);
        followRedirectsInput.checked = query.followRedirects !== false;
        validateTlsInput.checked = query.validateTls !== false;
        fallbackGetInput.checked = query.fallbackGetOn405 !== false;
        wellKnownInput.checked = query.checkWellKnownFiles !== false;
        httpUpgradeInput.checked = query.probeHttpUpgrade !== false;
        setInlineDropdownValue(methodInput, query.method || 'HEAD', 'HEAD', ['HEAD', 'GET']);
        setInlineDropdownValue(userAgentInput, query.userAgentProfile || 'default', 'default', ['default', 'desktop', 'mobile']);
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
        resultSummary.classList.add('__PREFIX__-result-summary');
        resultSummary.dataset.resultTone = Number(summary.failCount || 0) > 0 ? 'error' : Number(summary.warnCount || 0) > 0 ? 'warning' : 'success';
        resultSummary.dataset.resultLayout = 'scan_overview';
        resultSummary.innerHTML = buildSummaryHtml(latestResult);
        renderScoreRingChart(score, tone);
        findingTableBody.innerHTML = sortedFindings.length > 0
            ? sortedFindings.map((row, index) => buildFindingRow(row, index)).join('')
            : buildEmptyRow(7, 'The scan did not produce any findings for this target.');
        headerTableBody.innerHTML = latestResult.headerRows.length > 0
            ? latestResult.headerRows.map((row, index) => buildHeaderRow(row, index)).join('')
            : buildEmptyRow(5, 'No readable response headers were captured from the primary request.');
        transportTableBody.innerHTML = latestResult.transportRows.length > 0
            ? latestResult.transportRows.map((row, index) => buildTransportRow(row, index)).join('')
            : buildEmptyRow(4, 'No transport summary is available for this scan.');
        knownFileTableBody.innerHTML = latestResult.knownFileRows.length > 0
            ? latestResult.knownFileRows.map((row, index) => buildKnownFileRow(row, index)).join('')
            : buildEmptyRow(5, 'Well-known file probes were skipped for this scan.');
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
        params.set('method', query.method);
        params.set('follow', query.followRedirects ? '1' : '0');
        params.set('timeout', String(query.timeoutSeconds));
        params.set('tls', query.validateTls ? '1' : '0');
        params.set('fallback', query.fallbackGetOn405 ? '1' : '0');
        params.set('ua', query.userAgentProfile);
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

        if (url) {
            urlInput.value = url;
        }

        if (['HEAD', 'GET'].includes(method)) {
            setInlineDropdownValue(methodInput, method, 'HEAD', ['HEAD', 'GET']);
        }

        timeoutInput.value = String(timeoutSeconds);

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

        if ((params.get('files') || '') === '0') {
            wellKnownInput.checked = false;
        }

        if ((params.get('upgrade') || '') === '0') {
            httpUpgradeInput.checked = false;
        }

        return Boolean(url);
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

    userAgentInput.addEventListener('change', function () {
        setInlineDropdownValue(userAgentInput, userAgentInput.value, 'default', ['default', 'desktop', 'mobile']);
    });

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

            exportResultShellAsPdf('__TOOL_SLUG__', resultContent);
            flashButton(exportPdfButton, 'Opened');
        });
    }

    if (downloadCsvButton) {
        downloadCsvButton.addEventListener('click', function () {
            if (!latestResult) {
                return;
            }

            downloadFile(
                '__PREFIX__-findings.csv',
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
                '__TOOL_SLUG__.json',
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
            const payload = JSON.parse(await file.text());
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
            setErrorState(validationError);
            return;
        }

        syncQueryState(query);
        setLoadingState(`Scanning ${query.url} for visible web security posture signals...`);
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
    setInlineDropdownValue(methodInput, methodInput.value, 'HEAD', ['HEAD', 'GET']);
    setInlineDropdownValue(userAgentInput, userAgentInput.value, 'default', ['default', 'desktop', 'mobile']);
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
(function setup__PASCAL_PREFIX__TableOutputStandard() {
    const rootSelector = '.__TOOL_CLASS__';
    const tableSelector = '.tool-result-table tbody tr, .__PREFIX__-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .__PREFIX__-table tbody';
    const clampClass = '__PREFIX__-table-cell-text';
    const cellClampClass = '__PREFIX__-cell-clamp';
    const statusColumnClass = '__PREFIX__-table-status-cell';

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
        root.querySelectorAll('.tool-result-table, .__PREFIX__-table').forEach(function alignStatusTable(table) {
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
