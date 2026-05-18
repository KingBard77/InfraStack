// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackScanningWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function jsonOutputSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 44-44
                const jsonOutput = getById('__DOM_PREFIX__JsonOutput');

            // Source custom.js lines 49-49
                const importJsonButton = getById('__DOM_PREFIX__ImportJsonButton');

            // Source custom.js lines 50-50
                const importJsonInput = getById('__DOM_PREFIX__ImportJson');

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

            // Source custom.js lines 405-408
                function renderJsonOutput(payload) {
                    jsonOutput.innerHTML = highlightJsonText(JSON.stringify(payload, null, 2));
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
        }

        return {
            sourceTool: 'templates/content/tools/security/scan-web-security/',
            sourceJsLines: [[44, 44], [49, 49], [50, 50], [52, 53], [199, 234], [405, 408], [497, 512], [513, 527], [528, 533], [1028, 1044], [1252, 1255], [1256, 1279]],
            sourceDomIds: ['scanWebSecurityImportJson', 'scanWebSecurityJsonOutput', 'scanWebSecurityJsonPanel'],
            sourceClasses: ['d-none', 'scan-web-security-json-head', 'scan-web-security-json-output', 'scan-web-security-json-title', 'scan-web-security-json-wrap', 'scan-web-security-tab-panel', 'tool-json-head', 'tool-json-output', 'tool-json-panel', 'tool-json-title'],
            sourceVariables: ['importJsonInput', 'jsonOutput', 'tabPanels'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.jsonOutputSourceSection = jsonOutputSourceSection;
    global.InfraStackScanningWorkspaceSections = registry;
}(window));
