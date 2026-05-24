// custom.js

// ns:start family.scanning.workspace.01_input-brief
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.01_input-brief
// ns:start family.scanning.workspace.02_basic-settings
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.02_basic-settings
// ns:start family.scanning.workspace.03_advanced-settings
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.03_advanced-settings
// ns:start family.scanning.workspace.04_selected-item
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.04_selected-item
// ns:start family.scanning.workspace.05_result-summary
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.05_result-summary
// ns:start family.scanning.workspace.06_result-view
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.06_result-view
// ns:start family.scanning.workspace.07_table-export
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.07_table-export
// ns:start family.scanning.workspace.08_json-restore
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.scanning.workspace.08_json-restore

document.addEventListener('DOMContentLoaded', function () {
    const root = document.querySelector('.scan-web-security-tool');

    if (!root) {
        return;
    }

    function getById(id) {
        return root.querySelector(`#${id}`);
    }

    const form = getById('scanWebSecurityForm');
    const urlInput = getById('scanWebSecurityUrl');
    const methodInput = getById('scanWebSecurityMethod');
    const methodSummary = getById('scanWebSecurityMethodSummary');
    const methodSelect = getById('scanWebSecurityMethodSelect');
    const methodOptions = Array.from(methodSelect ? methodSelect.querySelectorAll('.scan-web-security-select-option') : []);
    const followRedirectsInput = getById('scanWebSecurityFollowRedirects');
    const timeoutInput = getById('scanWebSecurityTimeout');
    const validateTlsInput = getById('scanWebSecurityValidateTls');
    const fallbackGetInput = getById('scanWebSecurityFallbackGet');
    const userAgentInput = getById('scanWebSecurityUserAgent');
    const userAgentSummary = getById('scanWebSecurityUserAgentSummary');
    const userAgentSelect = getById('scanWebSecurityUserAgentSelect');
    const userAgentOptions = Array.from(userAgentSelect ? userAgentSelect.querySelectorAll('.scan-web-security-select-option') : []);
    const wellKnownInput = getById('scanWebSecurityWellKnown');
    const httpUpgradeInput = getById('scanWebSecurityHttpUpgrade');
    const submitButton = getById('scanWebSecuritySubmit');
    const sortInput = getById('scanWebSecuritySort');
    const sortSummary = getById('scanWebSecuritySortSummary');
    const sortOptions = Array.from(root.querySelectorAll('.scan-web-security-sort-option'));
    const sortSelect = getById('scanWebSecuritySortSelect');
    const resultEmpty = getById('scanWebSecurityResultEmpty');
    const resultContent = getById('scanWebSecurityResultContent');
    const resultError = getById('scanWebSecurityResultError');
    const resultSummary = getById('scanWebSecurityResultSummary');
    const findingTableBody = getById('scanWebSecurityFindingTableBody');
    const headerTableBody = getById('scanWebSecurityHeaderTableBody');
    const transportTableBody = getById('scanWebSecurityTransportTableBody');
    const knownFileTableBody = getById('scanWebSecurityKnownFileTableBody');
    const cookieTableBody = getById('scanWebSecurityCookieTableBody');
    const jsonOutput = getById('scanWebSecurityJsonOutput');
    const exportPdfButton = getById('scanWebSecurityExportPdf');
    const downloadCsvButton = getById('scanWebSecurityDownloadCsv');
    const copyJsonButton = getById('scanWebSecurityCopyJson');
    const downloadJsonButton = getById('scanWebSecurityDownloadJson');
    const importJsonButton = getById('scanWebSecurityImportJsonButton');
    const importJsonInput = getById('scanWebSecurityImportJson');
    const tabButtons = Array.from(root.querySelectorAll('.scan-web-security-tab-btn'));
    const tabPanels = Array.from(root.querySelectorAll('.scan-web-security-tab-panel'));

    const ECHARTS_CDN_URL = 'https://cdn.jsdelivr.net/npm/echarts@6/dist/echarts.min.js';

    let latestResult = null;
    let echartsPromise = null;
    let scoreRingChart = null;
    let scoreRingResizeHandler = null;

    function initMarkdownCopyButtons() {
        const scanInputBlocks = Array.from(document.querySelectorAll('.markdown-content pre.scan-web-security-example-input'));
        const scanInputCopyButtons = document.querySelectorAll('.scan-web-security-input-copy-btn');

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

        const codeBlocks = document.querySelectorAll('.markdown-content .scan-web-security-markdown-card pre:not(.scan-web-security-example-input)');

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
        if (button.dataset.iconOnly === 'true') {
            const originalTitle = button.dataset.defaultTitle || button.title;
            button.dataset.defaultTitle = originalTitle;
            button.title = text;
            button.classList.add('is-copied');

            window.setTimeout(() => {
                button.title = originalTitle;
                button.classList.remove('is-copied');
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

        const didCopy = document.execCommand('copy');
        textarea.remove();

        if (!didCopy) {
            throw new Error('Clipboard copy failed.');
        }
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
        !methodSummary ||
        methodOptions.length === 0 ||
        !followRedirectsInput ||
        !timeoutInput ||
        !validateTlsInput ||
        !fallbackGetInput ||
        !userAgentInput ||
        !userAgentSummary ||
        userAgentOptions.length === 0 ||
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
                const existingScript = document.querySelector(`script[data-scan-web-security-echarts], script[src="${ECHARTS_CDN_URL}"]`);

                if (existingScript) {
                    existingScript.addEventListener('load', () => resolve(window.echarts || null), { once: true });
                    existingScript.addEventListener('error', () => resolve(null), { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.src = ECHARTS_CDN_URL;
                script.async = true;
                script.dataset.scanWebSecurityEcharts = 'true';
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
        const chartElement = getById('scanWebSecurityScoreChart');
        const ringElement = getById('scanWebSecurityScoreRing');

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

    function getSelectedSingleValue(options, fallbackValue) {
        const selectedOption = options.find((option) => option.classList.contains('is-active'));

        return selectedOption ? selectedOption.dataset.optionValue : fallbackValue;
    }

    function updateSingleSelectState(options, hiddenInput, summaryElement, detailsElement, value) {
        const normalizedValue = value || hiddenInput.value;
        const selectedOption = options.find((option) => option.dataset.optionValue === normalizedValue) || options[0];

        options.forEach((option) => {
            const isActive = option === selectedOption;
            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        if (selectedOption) {
            hiddenInput.value = selectedOption.dataset.optionValue;
            summaryElement.textContent = selectedOption.textContent.trim();
        }

        if (detailsElement) {
            detailsElement.removeAttribute('open');
        }
    }

    function buildQuery() {
        return {
            url: normalizeUrl(urlInput.value),
            method: getSelectedSingleValue(methodOptions, 'HEAD').toUpperCase(),
            followRedirects: Boolean(followRedirectsInput.checked),
            timeoutSeconds: normalizeTimeoutSeconds(timeoutInput.value),
            validateTls: Boolean(validateTlsInput.checked),
            fallbackGetOn405: Boolean(fallbackGetInput.checked),
            userAgentProfile: getSelectedSingleValue(userAgentOptions, 'default').toLowerCase(),
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
        const response = await fetch('/api/security/scan-web-security', {
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
                badgeClass: 'scan-web-security-badge-fail'
            };
        }

        if (Number(summary.warnCount || 0) > 0 || Number(summary.score || 0) < 85) {
            return {
                ringColor: '#F59E0B',
                badgeClass: 'scan-web-security-badge-warn'
            };
        }

        return {
            ringColor: '#16A34A',
            badgeClass: 'scan-web-security-badge-pass'
        };
    }

    function getStatusPillClass(status) {
        if (status === 'fail') {
            return 'scan-web-security-status-fail';
        }

        if (status === 'warn') {
            return 'scan-web-security-status-warn';
        }

        if (status === 'pass') {
            return 'scan-web-security-status-pass';
        }

        return 'scan-web-security-status-info';
    }

    function getBadgeClassForState(state) {
        if (state === 'fail') {
            return 'scan-web-security-badge-fail';
        }

        if (state === 'warn') {
            return 'scan-web-security-badge-warn';
        }

        if (state === 'pass') {
            return 'scan-web-security-badge-pass';
        }

        return 'scan-web-security-badge-neutral';
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

        return `
            <div class="scan-web-security-overview">
                <div class="scan-web-security-score-card">
                    <div class="scan-web-security-score-ring" id="scanWebSecurityScoreRing" style="--scan-web-security-progress: ${progressAngle.toFixed(1)}deg; --scan-web-security-ring-color: ${tone.ringColor};" aria-label="Hardening score ${escapeHtml(score)} out of 100">
                        <div class="scan-web-security-score-echart" id="scanWebSecurityScoreChart" aria-hidden="true"></div>
                        <div class="scan-web-security-score-center">
                            <div class="scan-web-security-score-value">${escapeHtml(score)}</div>
                            <div class="scan-web-security-score-denominator">/100</div>
                        </div>
                    </div>
                    <div class="scan-web-security-score-label">Hardening Score</div>
                    <div class="scan-web-security-score-grade">Grade ${escapeHtml(grade)}</div>
                    <div class="scan-web-security-score-note">${escapeHtml(summary.scoreNote || 'Visible web posture only')}</div>
                </div>
                <div class="scan-web-security-summary-panel">
                    <div class="scan-web-security-badge-row">
                        <span class="scan-web-security-badge ${schemeLabel === 'HTTPS' ? 'scan-web-security-badge-pass' : 'scan-web-security-badge-fail'}">${escapeHtml(schemeLabel)} final</span>
                        <span class="scan-web-security-badge ${tone.badgeClass}">${escapeHtml(summary.failCount || 0)} fail</span>
                        <span class="scan-web-security-badge scan-web-security-badge-warn">${escapeHtml(summary.warnCount || 0)} warn</span>
                        <span class="scan-web-security-badge ${getBadgeClassForState(summary.httpUpgradeState || 'info')}">${escapeHtml(summary.httpUpgradeLabel || 'HTTP upgrade not probed')}</span>
                        <span class="scan-web-security-badge ${getBadgeClassForState(summary.hstsState || 'info')}">${escapeHtml(summary.hstsLabel || 'HSTS unknown')}</span>
                        <span class="scan-web-security-badge scan-web-security-badge-neutral">Last run: ${escapeHtml(lastRunText)}</span>
                    </div>
                    <div class="scan-web-security-summary-url">
                        <span class="scan-web-security-summary-url-label">Final URL</span>
                        <span class="scan-web-security-summary-url-value">${escapeHtml(summary.finalUrl || result.query.url || '')}</span>
                    </div>
                    <div class="scan-web-security-stat-grid">
                        <div class="scan-web-security-stat-card">
                            <span class="scan-web-security-stat-label">Findings</span>
                            <span class="scan-web-security-stat-value">${escapeHtml(summary.findingCount || 0)}</span>
                        </div>
                        <div class="scan-web-security-stat-card">
                            <span class="scan-web-security-stat-label">Final status</span>
                            <span class="scan-web-security-stat-value">${escapeHtml(statusText || '0')}</span>
                        </div>
                        <div class="scan-web-security-stat-card">
                            <span class="scan-web-security-stat-label">Duration</span>
                            <span class="scan-web-security-stat-value">${escapeHtml(summary.durationMs || 0)} ms</span>
                        </div>
                        <div class="scan-web-security-stat-card">
                            <span class="scan-web-security-stat-label">Headers</span>
                            <span class="scan-web-security-stat-value">${escapeHtml(summary.headerCount || 0)}</span>
                        </div>
                        <div class="scan-web-security-stat-card">
                            <span class="scan-web-security-stat-label">Cookies</span>
                            <span class="scan-web-security-stat-value">${escapeHtml(summary.cookieCount || 0)}</span>
                        </div>
                        <div class="scan-web-security-stat-card">
                            <span class="scan-web-security-stat-label">Known files</span>
                            <span class="scan-web-security-stat-value">${escapeHtml(summary.knownFilePresentCount || 0)}/${escapeHtml(summary.knownFileCount || 0)}</span>
                        </div>
                    </div>
                    <div class="scan-web-security-chip-row">
                        <span class="scan-web-security-chip scan-web-security-chip-neutral">Method used ${escapeHtml(summary.methodUsed || result.query.method || 'HEAD')}</span>
                        <span class="scan-web-security-chip ${result.query.followRedirects ? 'scan-web-security-chip-pass' : 'scan-web-security-chip-neutral'}">Redirects ${result.query.followRedirects ? 'followed' : 'not followed'}</span>
                        <span class="scan-web-security-chip ${result.query.validateTls ? 'scan-web-security-chip-pass' : 'scan-web-security-chip-warn'}">TLS validation ${result.query.validateTls ? 'on' : 'off'}</span>
                        <span class="scan-web-security-chip ${result.query.checkWellKnownFiles ? 'scan-web-security-chip-pass' : 'scan-web-security-chip-neutral'}">Well-known files ${result.query.checkWellKnownFiles ? 'checked' : 'skipped'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function buildFindingRow(row, index) {
        const copyValue = row.copyValue || `${row.control}: ${row.evidence}`;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td>${escapeHtml(row.category)}</td>
                <td class="scan-web-security-control-cell">
                    <strong>${escapeHtml(row.control)}</strong><br>
                    <span class="text-muted">${escapeHtml(String(row.severity || 'info').toUpperCase())}</span>
                </td>
                <td><span class="scan-web-security-status-pill ${getStatusPillClass(row.status)}">${escapeHtml(row.status)}</span></td>
                <td>${escapeHtml(row.evidence)}</td>
                <td>${escapeHtml(row.recommendation)}</td>
                <td class="scan-web-security-copy-cell">${buildCopyButton(copyValue, `Copy finding row ${index + 1}`)}</td>
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
                <td class="scan-web-security-value-cell">${escapeHtml(row.value)}</td>
                <td class="scan-web-security-copy-cell">${buildCopyButton(copyValue, `Copy header row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildTransportRow(row, index) {
        const copyValue = row.copyValue || row.value;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><strong>${escapeHtml(row.label)}</strong></td>
                <td class="scan-web-security-value-cell">${escapeHtml(row.value)}</td>
                <td class="scan-web-security-copy-cell">${buildCopyButton(copyValue, `Copy transport row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildKnownFileRow(row, index) {
        const copyValue = row.copyValue || row.url || row.path;

        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><strong>${escapeHtml(row.path)}</strong></td>
                <td><span class="scan-web-security-status-pill ${getStatusPillClass(row.present ? 'pass' : 'info')}">${escapeHtml(row.statusLabel || `${row.status} ${row.statusText}`)}</span></td>
                <td class="scan-web-security-value-cell">${escapeHtml(row.note)}</td>
                <td class="scan-web-security-copy-cell">${buildCopyButton(copyValue, `Copy well-known file row ${index + 1}`)}</td>
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
                <td class="scan-web-security-issues-cell">${escapeHtml(row.issues)}</td>
                <td class="scan-web-security-copy-cell">${buildCopyButton(copyValue, `Copy cookie row ${index + 1}`)}</td>
            </tr>
        `;
    }

    function buildCopyButton(copyValue, label) {
        return `
            <button type="button" class="scan-web-security-copy-btn" data-copy="${escapeHtml(copyValue || '')}" data-icon-only="true" aria-label="${escapeHtml(label)}" title="Copy row">
                <i class="bi bi-clipboard" aria-hidden="true"></i>
            </button>
        `;
    }

    function buildEmptyRow(colspan, message) {
        return `<tr><td colspan="${colspan}"><div class="scan-web-security-empty-block">${escapeHtml(message)}</div></td></tr>`;
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
            throw new Error('Import a JSON object exported from Web Security Scanner.');
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

    function syncFormFromQuery(query) {
        urlInput.value = query.url || '';
        timeoutInput.value = String(query.timeoutSeconds || 12);
        followRedirectsInput.checked = query.followRedirects !== false;
        validateTlsInput.checked = query.validateTls !== false;
        fallbackGetInput.checked = query.fallbackGetOn405 !== false;
        wellKnownInput.checked = query.checkWellKnownFiles !== false;
        httpUpgradeInput.checked = query.probeHttpUpgrade !== false;
        updateSingleSelectState(methodOptions, methodInput, methodSummary, null, query.method || 'HEAD');
        updateSingleSelectState(userAgentOptions, userAgentInput, userAgentSummary, null, query.userAgentProfile || 'default');
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
            updateSingleSelectState(methodOptions, methodInput, methodSummary, null, method);
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
            updateSingleSelectState(userAgentOptions, userAgentInput, userAgentSummary, null, userAgent);
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

    methodOptions.forEach((option) => {
        option.addEventListener('click', function () {
            updateSingleSelectState(methodOptions, methodInput, methodSummary, methodSelect, option.dataset.optionValue);
        });
    });

    userAgentOptions.forEach((option) => {
        option.addEventListener('click', function () {
            updateSingleSelectState(userAgentOptions, userAgentInput, userAgentSummary, userAgentSelect, option.dataset.optionValue);
        });
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

            exportResultShellAsPdf('scan-web-security', resultContent);
            flashButton(exportPdfButton, 'Opened');
        });
    }

    if (downloadCsvButton) {
        downloadCsvButton.addEventListener('click', function () {
            if (!latestResult) {
                return;
            }

            downloadFile(
                'scan-web-security-findings.csv',
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
                'scan-web-security.json',
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
            latestResult = normalizeImportedResult(payload);
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
    updateSingleSelectState(methodOptions, methodInput, methodSummary, null);
    updateSingleSelectState(userAgentOptions, userAgentInput, userAgentSummary, null);
    activateTab('findings');

    document.addEventListener('click', function (event) {
        if (sortSelect.contains(event.target)) {
            return;
        }

        sortSelect.removeAttribute('open');
    });

    restoreStateFromQuery();
});
