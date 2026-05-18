// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackScanningWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function resultSummarySourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 35-35
                const resultEmpty = getById('__DOM_PREFIX__ResultEmpty');

            // Source custom.js lines 38-38
                const resultSummary = getById('__DOM_PREFIX__ResultSummary');

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

            // Source custom.js lines 760-833
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
                        <div class="__PREFIX__-overview">
                            <div class="__PREFIX__-score-card">
                                <div class="__PREFIX__-score-ring" id="__DOM_PREFIX__ScoreRing" style="--__PREFIX__-progress: ${progressAngle.toFixed(1)}deg; --__PREFIX__-ring-color: ${tone.ringColor};" aria-label="Hardening score ${escapeHtml(score)} out of 100">
                                    <div class="__PREFIX__-score-echart" id="__DOM_PREFIX__ScoreChart" aria-hidden="true"></div>
                                    <div class="__PREFIX__-score-center">
                                        <div class="__PREFIX__-score-value">${escapeHtml(score)}</div>
                                        <div class="__PREFIX__-score-denominator">/100</div>
                                    </div>
                                </div>
                                <div class="__PREFIX__-score-label">Hardening Score</div>
                                <div class="__PREFIX__-score-grade">Grade ${escapeHtml(grade)}</div>
                                <div class="__PREFIX__-score-note">${escapeHtml(summary.scoreNote || 'Visible web posture only')}</div>
                            </div>
                            <div class="__PREFIX__-summary-panel">
                                <div class="__PREFIX__-badge-row">
                                    <span class="__PREFIX__-badge ${schemeLabel === 'HTTPS' ? '__PREFIX__-badge-pass' : '__PREFIX__-badge-fail'}">${escapeHtml(schemeLabel)} final</span>
                                    <span class="__PREFIX__-badge ${tone.badgeClass}">${escapeHtml(summary.failCount || 0)} fail</span>
                                    <span class="__PREFIX__-badge __PREFIX__-badge-warn">${escapeHtml(summary.warnCount || 0)} warn</span>
                                    <span class="__PREFIX__-badge ${getBadgeClassForState(summary.httpUpgradeState || 'info')}">${escapeHtml(summary.httpUpgradeLabel || 'HTTP upgrade not probed')}</span>
                                    <span class="__PREFIX__-badge ${getBadgeClassForState(summary.hstsState || 'info')}">${escapeHtml(summary.hstsLabel || 'HSTS unknown')}</span>
                                    <span class="__PREFIX__-badge __PREFIX__-badge-neutral">Last run: ${escapeHtml(lastRunText)}</span>
                                </div>
                                <div class="__PREFIX__-summary-url">
                                    <span class="__PREFIX__-summary-url-label">Final URL</span>
                                    <span class="__PREFIX__-summary-url-value">${escapeHtml(summary.finalUrl || result.query.url || '')}</span>
                                </div>
                                <div class="__PREFIX__-stat-grid">
                                    <div class="__PREFIX__-stat-card">
                                        <span class="__PREFIX__-stat-label">Findings</span>
                                        <span class="__PREFIX__-stat-value">${escapeHtml(summary.findingCount || 0)}</span>
                                    </div>
                                    <div class="__PREFIX__-stat-card">
                                        <span class="__PREFIX__-stat-label">Final status</span>
                                        <span class="__PREFIX__-stat-value">${escapeHtml(statusText || '0')}</span>
                                    </div>
                                    <div class="__PREFIX__-stat-card">
                                        <span class="__PREFIX__-stat-label">Duration</span>
                                        <span class="__PREFIX__-stat-value">${escapeHtml(summary.durationMs || 0)} ms</span>
                                    </div>
                                    <div class="__PREFIX__-stat-card">
                                        <span class="__PREFIX__-stat-label">Headers</span>
                                        <span class="__PREFIX__-stat-value">${escapeHtml(summary.headerCount || 0)}</span>
                                    </div>
                                    <div class="__PREFIX__-stat-card">
                                        <span class="__PREFIX__-stat-label">Cookies</span>
                                        <span class="__PREFIX__-stat-value">${escapeHtml(summary.cookieCount || 0)}</span>
                                    </div>
                                    <div class="__PREFIX__-stat-card">
                                        <span class="__PREFIX__-stat-label">Known files</span>
                                        <span class="__PREFIX__-stat-value">${escapeHtml(summary.knownFilePresentCount || 0)}/${escapeHtml(summary.knownFileCount || 0)}</span>
                                    </div>
                                </div>
                                <div class="__PREFIX__-chip-row">
                                    <span class="__PREFIX__-chip __PREFIX__-chip-neutral">Method used ${escapeHtml(summary.methodUsed || result.query.method || 'HEAD')}</span>
                                    <span class="__PREFIX__-chip ${result.query.followRedirects ? '__PREFIX__-chip-pass' : '__PREFIX__-chip-neutral'}">Redirects ${result.query.followRedirects ? 'followed' : 'not followed'}</span>
                                    <span class="__PREFIX__-chip ${result.query.validateTls ? '__PREFIX__-chip-pass' : '__PREFIX__-chip-warn'}">TLS validation ${result.query.validateTls ? 'on' : 'off'}</span>
                                    <span class="__PREFIX__-chip ${result.query.checkWellKnownFiles ? '__PREFIX__-chip-pass' : '__PREFIX__-chip-neutral'}">Well-known files ${result.query.checkWellKnownFiles ? 'checked' : 'skipped'}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }

            // Source custom.js lines 1024-1054
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
        }

        return {
            sourceTool: 'templates/content/tools/security/scan-web-security/',
            sourceJsLines: [[35, 35], [38, 38], [199, 234], [497, 512], [513, 527], [528, 533], [760, 833], [1024, 1054]],
            sourceDomIds: ['scanWebSecurityResultEmpty', 'scanWebSecurityResultSummary', 'scanWebSecurityScoreChart', 'scanWebSecurityScoreRing'],
            sourceClasses: ['scan-web-security-result-empty', 'scan-web-security-result-summary', 'scan-web-security-score-center', 'scan-web-security-score-denominator'],
            sourceVariables: ['resultEmpty', 'resultSummary'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.resultSummarySourceSection = resultSummarySourceSection;
    global.InfraStackScanningWorkspaceSections = registry;
}(window));
