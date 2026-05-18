// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackScanningWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function scanTargetSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 14-14
                const form = getById('__DOM_PREFIX__Form');

            // Source custom.js lines 15-15
                const urlInput = getById('__DOM_PREFIX__Url');

            // Source custom.js lines 30-30
                const submitButton = getById('__DOM_PREFIX__Submit');

            // Source custom.js lines 51-51
                const tabButtons = Array.from(root.querySelectorAll('.__TOOL_CLASS__-tab-btn'));

            // Source custom.js lines 61-122
                function initMarkdownCopyButtons() {
                    const scanInputBlocks = Array.from(document.querySelectorAll('.markdown-content pre.__TOOL_CLASS__-example-input'));
                    const scanInputCopyButtons = document.querySelectorAll('.__TOOL_CLASS__-input-copy-btn');

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

                    const codeBlocks = document.querySelectorAll('.markdown-content .__TOOL_CLASS__-markdown-card pre:not(.__TOOL_CLASS__-example-input)');

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

            // Source custom.js lines 534-545
                function toggleSubmitState(isLoading) {
                    if (isLoading) {
                        submitButton.disabled = true;
                        submitButton.textContent = 'Scanning...';

                        return;
                    }

                    submitButton.disabled = false;
                    submitButton.textContent = 'Scan';
                }

            // Source custom.js lines 883-890
                function buildCopyButton(copyValue, label) {
                    return `
                        <button type="button" class="__TOOL_CLASS__-copy-btn" data-copy="${escapeHtml(copyValue || '')}" data-icon-only="true" aria-label="${escapeHtml(label)}" title="Copy row">
                            <i class="bi bi-clipboard" aria-hidden="true"></i>
                        </button>
                    `;
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

            // Source custom.js lines 1280-1305
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
        }

        return {
            sourceTool: 'templates/content/tools/security/scan-web-security/',
            sourceJsLines: [[14, 14], [15, 15], [30, 30], [51, 51], [61, 122], [199, 234], [467, 480], [534, 545], [883, 890], [963, 974], [1059, 1102], [1280, 1305]],
            sourceDomIds: ['scanWebSecurityForm', 'scanWebSecurityInputShell', 'scanWebSecuritySubmit', 'scanWebSecurityUrl'],
            sourceClasses: ['btn', 'btn-primary', 'form-control', 'info-dot', 'scan-web-security-form', 'scan-web-security-input-shell', 'scan-web-security-main-label', 'scan-web-security-main-row', 'scan-web-security-submit-btn', 'scan-web-security-target-grid', 'tool-shell', 'tool-shell-body'],
            sourceVariables: ['form', 'submitButton', 'urlInput'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.scanTargetSourceSection = scanTargetSourceSection;
    global.InfraStackScanningWorkspaceSections = registry;
}(window));
