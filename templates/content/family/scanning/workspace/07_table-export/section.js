// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackScanningWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function tableExportSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 31-31
                const sortInput = getById('__DOM_PREFIX__Sort');

            // Source custom.js lines 32-32
                const sortSummary = getById('__DOM_PREFIX__SortSummary');

            // Source custom.js lines 33-33
                const sortOptions = Array.from(root.querySelectorAll('.__TOOL_CLASS__-sort-option'));

            // Source custom.js lines 34-34
                const sortSelect = getById('__DOM_PREFIX__SortSelect');

            // Source custom.js lines 37-37
                const resultError = getById('__DOM_PREFIX__ResultError');

            // Source custom.js lines 45-45
                const exportPdfButton = getById('__DOM_PREFIX__ExportPdf');

            // Source custom.js lines 46-46
                const downloadCsvButton = getById('__DOM_PREFIX__DownloadCsv');

            // Source custom.js lines 47-47
                const copyJsonButton = getById('__DOM_PREFIX__CopyJson');

            // Source custom.js lines 48-48
                const downloadJsonButton = getById('__DOM_PREFIX__DownloadJson');

            // Source custom.js lines 49-49
                const importJsonButton = getById('__DOM_PREFIX__ImportJsonButton');

            // Source custom.js lines 50-50
                const importJsonInput = getById('__DOM_PREFIX__ImportJson');

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

            // Source custom.js lines 615-659
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

            // Source custom.js lines 673-681
                function setSortMode(sortMode, shouldRender = true) {
                    sortInput.value = String(sortMode || 'id');
                    syncSortSelect();

                    if (shouldRender) {
                        renderLatestResult();
                    }
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

            // Source custom.js lines 1146-1152
                sortOptions.forEach((option) => {
                    option.addEventListener('click', function () {
                        setSortMode(option.dataset.sortValue || 'id');
                        sortSelect.removeAttribute('open');
                    });
                });

            // Source custom.js lines 1153-1156
                sortInput.addEventListener('change', function () {
                    setSortMode(sortInput.value || 'id');
                });

            // Source custom.js lines 1157-1162
                sortSelect.addEventListener('keydown', function (event) {
                    if (event.key === 'Escape') {
                        sortSelect.removeAttribute('open');
                    }
                });

            // Source custom.js lines 1196-1206
                if (exportPdfButton) {
                    exportPdfButton.addEventListener('click', function () {
                        if (!latestResult) {
                            return;
                        }

                        exportResultShellAsPdf('__TOOL_CLASS__', resultContent);
                        flashButton(exportPdfButton, 'Opened');
                    });
                }

            // Source custom.js lines 1207-1221
                if (downloadCsvButton) {
                    downloadCsvButton.addEventListener('click', function () {
                        if (!latestResult) {
                            return;
                        }

                        downloadFile(
                            '__TOOL_CLASS__-findings.csv',
                            buildCsvContent(latestResult),
                            'text/csv;charset=utf-8'
                        );
                        flashButton(downloadCsvButton, 'Saved');
                    });
                }

            // Source custom.js lines 1222-1236
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

            // Source custom.js lines 1237-1251
                if (downloadJsonButton) {
                    downloadJsonButton.addEventListener('click', function () {
                        if (!latestResult) {
                            return;
                        }

                        downloadFile(
                            '__TOOL_CLASS__.json',
                            JSON.stringify(buildJsonPayload(latestResult), null, 2),
                            'application/json;charset=utf-8'
                        );
                        flashButton(downloadJsonButton, 'Saved');
                    });
                }

            // Source custom.js lines 1252-1255
                importJsonButton.addEventListener('click', function () {
                    importJsonInput.click();
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

            // Source custom.js lines 1306-1306
                setSortMode(sortInput.value || 'id', false);

            // Source custom.js lines 1311-1318
                document.addEventListener('click', function (event) {
                    if (sortSelect.contains(event.target)) {
                        return;
                    }

                    sortSelect.removeAttribute('open');
                });
        }

        return {
            sourceTool: 'templates/content/tools/security/scan-web-security/',
            sourceJsLines: [[31, 31], [32, 32], [33, 33], [34, 34], [37, 37], [45, 45], [46, 46], [47, 47], [48, 48], [49, 49], [50, 50], [199, 234], [290, 383], [441, 446], [447, 466], [481, 496], [497, 512], [513, 527], [528, 533], [615, 659], [660, 672], [673, 681], [883, 890], [909, 927], [1028, 1044], [1059, 1102], [1146, 1152], [1153, 1156], [1157, 1162], [1196, 1206], [1207, 1221], [1222, 1236], [1237, 1251], [1252, 1255], [1256, 1279], [1306, 1306], [1311, 1318]],
            sourceDomIds: ['scanWebSecurityCopyJson', 'scanWebSecurityDownloadCsv', 'scanWebSecurityDownloadJson', 'scanWebSecurityExportPdf', 'scanWebSecurityImportJson', 'scanWebSecurityImportJsonButton', 'scanWebSecurityResultError', 'scanWebSecuritySort', 'scanWebSecuritySortSelect', 'scanWebSecuritySortSummary'],
            sourceClasses: ['bi', 'bi-clipboard', 'bi-download', 'bi-filetype-pdf', 'bi-table', 'bi-upload', 'd-none', 'is-active', 'scan-web-security-action-btn', 'scan-web-security-result-error', 'scan-web-security-sort-grid', 'scan-web-security-sort-label', 'scan-web-security-sort-menu', 'scan-web-security-sort-option', 'scan-web-security-sort-select', 'scan-web-security-sort-summary', 'scan-web-security-sort-wrap', 'scan-web-securitybar', 'scan-web-securitybar-actions', 'scan-web-securitybar-left', 'scan-web-securitybar-shell', 'tool-action-btn', 'tool-action-btn-ghost', 'tool-action-btn-secondary', 'tool-output-actions', 'tool-output-toolbar', 'tool-result-toolbar-main'],
            sourceVariables: ['copyJsonButton', 'downloadCsvButton', 'downloadJsonButton', 'exportPdfButton', 'importJsonButton', 'importJsonInput', 'resultError', 'sortInput', 'sortOptions', 'sortSelect', 'sortSummary'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.tableExportSourceSection = tableExportSourceSection;
    global.InfraStackScanningWorkspaceSections = registry;
}(window));
