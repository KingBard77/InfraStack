// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackScanningWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function resultTabsSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 39-39
                const findingTableBody = getById('__DOM_PREFIX__FindingTableBody');

            // Source custom.js lines 40-40
                const headerTableBody = getById('__DOM_PREFIX__HeaderTableBody');

            // Source custom.js lines 41-41
                const transportTableBody = getById('__DOM_PREFIX__TransportTableBody');

            // Source custom.js lines 42-42
                const knownFileTableBody = getById('__DOM_PREFIX__KnownFileTableBody');

            // Source custom.js lines 43-43
                const cookieTableBody = getById('__DOM_PREFIX__CookieTableBody');

            // Source custom.js lines 51-51
                const tabButtons = Array.from(root.querySelectorAll('.__TOOL_CLASS__-tab-btn'));

            // Source custom.js lines 52-53
                const tabPanels = Array.from(root.querySelectorAll('.__TOOL_CLASS__-tab-panel'));

            // Source custom.js lines 199-234
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

            // Source custom.js lines 290-383
                function renderScoreRingChart(score, tone) {
                    const chartElement = getById('__DOM_PREFIX__ScoreChart');
                    const ringElement = getById('__DOM_PREFIX__ScoreRing');

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

            // Source custom.js lines 441-446
                function getSelectedSingleValue(options, fallbackValue) {
                    const selectedOption = options.find((option) => option.classList.contains('is-active'));

                    return selectedOption ? selectedOption.dataset.optionValue : fallbackValue;
                }

            // Source custom.js lines 447-466
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

            // Source custom.js lines 481-496
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

            // Source custom.js lines 497-512
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

            // Source custom.js lines 513-527
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

            // Source custom.js lines 528-533
                function setResultState() {
                    resultEmpty.classList.add('d-none');
                    resultError.classList.add('d-none');
                    resultContent.classList.remove('d-none');
                }

            // Source custom.js lines 660-672
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

            // Source custom.js lines 883-890
                function buildCopyButton(copyValue, label) {
                    return `
                        <button type="button" class="__TOOL_CLASS__-copy-btn" data-copy="${escapeHtml(copyValue || '')}" data-icon-only="true" aria-label="${escapeHtml(label)}" title="Copy row">
                            <i class="bi bi-clipboard" aria-hidden="true"></i>
                        </button>
                    `;
                }

            // Source custom.js lines 909-927
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

            // Source custom.js lines 996-1027
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

            // Source custom.js lines 1028-1044
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

            // Source custom.js lines 1059-1102
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

            // Source custom.js lines 1175-1180
                tabButtons.forEach((button) => {
                    button.addEventListener('click', function () {
                        activateTab(button.dataset.tabTarget);
                    });
                });

            // Source custom.js lines 1256-1279
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
        }

        return {
            sourceTool: 'templates/content/tools/security/scan-web-security/',
            sourceJsLines: [[39, 39], [40, 40], [41, 41], [42, 42], [43, 43], [51, 51], [52, 53], [199, 234], [290, 383], [441, 446], [447, 466], [481, 496], [497, 512], [513, 527], [528, 533], [660, 672], [883, 890], [909, 927], [996, 1027], [1028, 1044], [1059, 1102], [1175, 1180], [1256, 1279]],
            sourceDomIds: ['scanWebSecurityCookieTableBody', 'scanWebSecurityFindingTableBody', 'scanWebSecurityFindingsPanel', 'scanWebSecurityFindingsTab', 'scanWebSecurityHeaderTableBody', 'scanWebSecurityHeadersPanel', 'scanWebSecurityHeadersTab', 'scanWebSecurityJsonTab', 'scanWebSecurityKnownFileTableBody', 'scanWebSecuritySurfacePanel', 'scanWebSecuritySurfaceTab', 'scanWebSecurityTransportTableBody'],
            sourceClasses: ['active', 'bi', 'bi-braces', 'bi-list-check', 'bi-shield-check', 'bi-table', 'd-none', 'mb-0', 'scan-web-security-cookies-table', 'scan-web-security-findings-table', 'scan-web-security-headers-table', 'scan-web-security-known-files-table', 'scan-web-security-section-card', 'scan-web-security-section-title', 'scan-web-security-surface-stack', 'scan-web-security-surface-table', 'scan-web-security-tab-btn', 'scan-web-security-tab-panel', 'scan-web-security-table-wrap', 'scan-web-security-tabs', 'scan-web-security-tabs-shell', 'table', 'table-responsive', 'tool-generated-rownum-head', 'tool-result-section-card', 'tool-result-section-stack', 'tool-result-section-title', 'tool-result-table', 'tool-result-table--compact', 'tool-result-table-wrap', 'tool-tab-btn', 'tool-tabs'],
            sourceVariables: ['cookieTableBody', 'findingTableBody', 'headerTableBody', 'knownFileTableBody', 'tabButtons', 'tabPanels', 'transportTableBody'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.resultTabsSourceSection = resultTabsSourceSection;
    global.InfraStackScanningWorkspaceSections = registry;
}(window));
