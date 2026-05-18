// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackScanningWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function scanOptionsSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 16-16
                const methodInput = getById('__DOM_PREFIX__Method');

            // Source custom.js lines 17-17
                const methodSummary = getById('__DOM_PREFIX__MethodSummary');

            // Source custom.js lines 18-18
                const methodSelect = getById('__DOM_PREFIX__MethodSelect');

            // Source custom.js lines 19-19
                const methodOptions = Array.from(methodSelect ? methodSelect.querySelectorAll('.__TOOL_CLASS__-select-option') : []);

            // Source custom.js lines 20-20
                const followRedirectsInput = getById('__DOM_PREFIX__FollowRedirects');

            // Source custom.js lines 21-21
                const timeoutInput = getById('__DOM_PREFIX__Timeout');

            // Source custom.js lines 22-22
                const validateTlsInput = getById('__DOM_PREFIX__ValidateTls');

            // Source custom.js lines 23-23
                const fallbackGetInput = getById('__DOM_PREFIX__FallbackGet');

            // Source custom.js lines 24-24
                const userAgentInput = getById('__DOM_PREFIX__UserAgent');

            // Source custom.js lines 25-25
                const userAgentSummary = getById('__DOM_PREFIX__UserAgentSummary');

            // Source custom.js lines 26-26
                const userAgentSelect = getById('__DOM_PREFIX__UserAgentSelect');

            // Source custom.js lines 27-27
                const userAgentOptions = Array.from(userAgentSelect ? userAgentSelect.querySelectorAll('.__TOOL_CLASS__-select-option') : []);

            // Source custom.js lines 28-28
                const wellKnownInput = getById('__DOM_PREFIX__WellKnown');

            // Source custom.js lines 29-29
                const httpUpgradeInput = getById('__DOM_PREFIX__HttpUpgrade');

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

            // Source custom.js lines 467-480
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

            // Source custom.js lines 963-974
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

            // Source custom.js lines 1163-1168
                methodOptions.forEach((option) => {
                    option.addEventListener('click', function () {
                        updateSingleSelectState(methodOptions, methodInput, methodSummary, methodSelect, option.dataset.optionValue);
                    });
                });

            // Source custom.js lines 1169-1174
                userAgentOptions.forEach((option) => {
                    option.addEventListener('click', function () {
                        updateSingleSelectState(userAgentOptions, userAgentInput, userAgentSummary, userAgentSelect, option.dataset.optionValue);
                    });
                });

            // Source custom.js lines 1307-1307
                updateSingleSelectState(methodOptions, methodInput, methodSummary, null);

            // Source custom.js lines 1308-1308
                updateSingleSelectState(userAgentOptions, userAgentInput, userAgentSummary, null);
        }

        return {
            sourceTool: 'templates/content/tools/security/scan-web-security/',
            sourceJsLines: [[16, 16], [17, 17], [18, 18], [19, 19], [20, 20], [21, 21], [22, 22], [23, 23], [24, 24], [25, 25], [26, 26], [27, 27], [28, 28], [29, 29], [199, 234], [441, 446], [447, 466], [467, 480], [660, 672], [963, 974], [1059, 1102], [1163, 1168], [1169, 1174], [1307, 1307], [1308, 1308]],
            sourceDomIds: ['scanWebSecurityFallbackGet', 'scanWebSecurityFollowRedirects', 'scanWebSecurityHttpUpgrade', 'scanWebSecurityMethod', 'scanWebSecurityMethodSelect', 'scanWebSecurityMethodSummary', 'scanWebSecurityTimeout', 'scanWebSecurityUserAgent', 'scanWebSecurityUserAgentSelect', 'scanWebSecurityUserAgentSummary', 'scanWebSecurityValidateTls', 'scanWebSecurityWellKnown'],
            sourceClasses: ['form-control', 'info-dot', 'is-active', 'scan-web-security-advanced', 'scan-web-security-advanced-body', 'scan-web-security-advanced-summary', 'scan-web-security-inner-panel', 'scan-web-security-select', 'scan-web-security-select-body', 'scan-web-security-select-grid', 'scan-web-security-select-option', 'scan-web-security-select-summary', 'scan-web-security-setting-field', 'scan-web-security-setting-label', 'scan-web-security-setting-row', 'scan-web-security-timeout-unit', 'scan-web-security-timeout-wrap', 'slider', 'switch'],
            sourceVariables: ['fallbackGetInput', 'followRedirectsInput', 'httpUpgradeInput', 'methodInput', 'methodOptions', 'methodSelect', 'methodSummary', 'timeoutInput', 'userAgentInput', 'userAgentOptions', 'userAgentSelect', 'userAgentSummary', 'validateTlsInput', 'wellKnownInput'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.scanOptionsSourceSection = scanOptionsSourceSection;
    global.InfraStackScanningWorkspaceSections = registry;
}(window));
