// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function jsonOutputSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 90-91
                const jsonOutput = document.getElementById('__DOM_PREFIX__JsonOutput');

            // Source custom.js lines 100-100
                const importJsonButton = document.getElementById('__DOM_PREFIX__ImportJsonButton');

            // Source custom.js lines 101-101
                const importJsonInput = document.getElementById('__DOM_PREFIX__ImportJson');

            // Source custom.js lines 103-103
                const tabPanels = Array.from(document.querySelectorAll('.__TOOL_CLASS__-tab-panel'));

            // Source custom.js lines 136-229
                if (
                    !form ||
                    !labelInput ||
                    !presetInput ||
                    !presetSummary ||
                    presetOptionInputs.length === 0 ||
                    !presetSelect ||
                    !applyPresetButton ||
                    !submitButton ||
                    !resetButton ||
                    !includeEc2Input ||
                    !includeEbsInput ||
                    !includeS3Input ||
                    !includeLambdaInput ||
                    !includeApiInput ||
                    !ec2InstanceInput ||
                    !ec2InstanceSummary ||
                    ec2InstanceOptionInputs.length === 0 ||
                    !ec2InstanceSelect ||
                    !ec2CustomOptionLabel ||
                    !ec2PurchaseInput ||
                    !ec2PurchaseSummary ||
                    ec2PurchaseOptionInputs.length === 0 ||
                    !ec2PurchaseSelect ||
                    !ec2CustomFields ||
                    !ec2CustomHint ||
                    !ec2CustomLabelInput ||
                    !ec2CustomVcpuInput ||
                    !ec2CustomMemoryGiBInput ||
                    !ec2CountInput ||
                    !ec2HoursInput ||
                    !ebsStorageGbInput ||
                    !ebsIopsInput ||
                    !ebsThroughputInput ||
                    !s3StorageGbInput ||
                    !s3EgressGbInput ||
                    !s3GetRequestsKInput ||
                    !s3PutRequestsKInput ||
                    !lambdaRequestsMillionInput ||
                    !lambdaDurationMsInput ||
                    !lambdaMemoryMbInput ||
                    !apiTypeInput ||
                    !apiTypeSummary ||
                    apiTypeOptionInputs.length === 0 ||
                    !apiTypeSelect ||
                    !apiRequestsMillionInput ||
                    !apiResponseKbInput ||
                    !sharedEgressGbInput ||
                    !supportPctInput ||
                    !contingencyPctInput ||
                    !manualAdjustmentInput ||
                    !freeTierLambdaInput ||
                    !freeTierApiInput ||
                    !freeTierEgressInput ||
                    !regionalUpliftPctInput ||
                    !ec2HourlyOverrideInput ||
                    !ebsStorageRateInput ||
                    !ebsIopsRateInput ||
                    !ebsThroughputRateInput ||
                    !s3StorageRateInput ||
                    !s3GetRateInput ||
                    !s3PutRateInput ||
                    !lambdaRequestRateInput ||
                    !lambdaGbSecondRateInput ||
                    !apiHttpFirstRateInput ||
                    !apiHttpNextRateInput ||
                    !apiRestRateInput ||
                    !egressRateInput ||
                    !resultEmpty ||
                    !resultContent ||
                    !resultError ||
                    !resultSummary ||
                    !breakdownTableBody ||
                    !serviceTableBody ||
                    !assumptionTableBody ||
                    !recommendationsWrap ||
                    !methodologyWrap ||
                    !jsonOutput ||
                    !sortInput ||
                    !sortSummary ||
                    sortOptionInputs.length === 0 ||
                    !sortSelect ||
                    !exportPdfButton ||
                    !downloadCsvButton ||
                    !copyJsonButton ||
                    !downloadJsonButton ||
                    !importJsonButton ||
                    !importJsonInput ||
                    tabButtons.length === 0 ||
                    tabPanels.length === 0
                ) {
                    return;
                }

            // Source custom.js lines 1018-1021
                function renderJsonOutput(payload) {
                    jsonOutput.innerHTML = highlightJsonText(JSON.stringify(payload, null, 2));
                }

            // Source custom.js lines 1302-1317
                function setLoadingState(message) {
                    destroySpendRingChart();
                    resultEmpty.textContent = message;
                    resultEmpty.classList.remove('d-none');
                    resultContent.classList.add('d-none');
                    resultError.classList.add('d-none');
                    resultError.textContent = '';
                    resultSummary.innerHTML = '';
                    breakdownTableBody.innerHTML = '';
                    serviceTableBody.innerHTML = '';
                    assumptionTableBody.innerHTML = '';
                    recommendationsWrap.innerHTML = '';
                    methodologyWrap.innerHTML = '';
                    jsonOutput.innerHTML = '';
                }

            // Source custom.js lines 1318-1332
                function setErrorState(message) {
                    destroySpendRingChart();
                    resultEmpty.classList.add('d-none');
                    resultContent.classList.add('d-none');
                    resultError.classList.remove('d-none');
                    resultError.textContent = message;
                    resultSummary.innerHTML = '';
                    breakdownTableBody.innerHTML = '';
                    serviceTableBody.innerHTML = '';
                    assumptionTableBody.innerHTML = '';
                    recommendationsWrap.innerHTML = '';
                    methodologyWrap.innerHTML = '';
                    jsonOutput.innerHTML = '';
                }

            // Source custom.js lines 1333-1338
                function setResultState() {
                    resultEmpty.classList.add('d-none');
                    resultError.classList.add('d-none');
                    resultContent.classList.remove('d-none');
                }

            // Source custom.js lines 1678-1688
                function syncCustomInstanceState() {
                    const isCustomInstance = ec2InstanceInput.value === 'custom' && includeEc2Input.checked;

                    ec2CustomFields.classList.toggle('d-none', !isCustomInstance);
                    ec2CustomHint.classList.toggle('d-none', !isCustomInstance);

                    [ec2CustomLabelInput, ec2CustomVcpuInput, ec2CustomMemoryGiBInput].forEach((input) => {
                        input.disabled = !isCustomInstance;
                    });
                }

            // Source custom.js lines 2588-2600
                function activateTab(target) {
                    tabButtons.forEach((button) => {
                        const isActive = button.dataset.tabTarget === target;
                        button.classList.toggle('active', isActive);
                        button.setAttribute('aria-selected', String(isActive));
                    });

                    tabPanels.forEach((panel) => {
                        const isActive = panel.dataset.tabPanel === target;
                        panel.classList.toggle('d-none', !isActive);
                    });
                }

            // Source custom.js lines 2838-2841
                importJsonButton.addEventListener('click', function () {
                    importJsonInput.click();
                });

            // Source custom.js lines 2842-2860
                importJsonInput.addEventListener('change', async function () {
                    const file = importJsonInput.files && importJsonInput.files[0];

                    if (!file) {
                        return;
                    }

                    try {
                        const payload = JSON.parse(await file.text());
                        applyImportedQuery(getImportedQuery(payload));
                        flashButton(importJsonButton, 'Imported');
                    } catch (error) {
                        setErrorState(error instanceof Error ? error.message : 'The JSON file could not be imported.');
                        flashButton(importJsonButton, 'Failed');
                    } finally {
                        importJsonInput.value = '';
                    }
                });
        }

        return {
            sourceTool: 'templates/content/tools/aws/calculate-cost-aws/',
            sourceJsLines: [[90, 91], [100, 100], [101, 101], [103, 103], [136, 229], [1018, 1021], [1302, 1317], [1318, 1332], [1333, 1338], [1678, 1688], [2588, 2600], [2838, 2841], [2842, 2860]],
            sourceDomIds: ['calculateCostAwsImportJson', 'calculateCostAwsJsonOutput'],
            sourceClasses: ['calculate-cost-aws-json-head', 'calculate-cost-aws-json-output', 'calculate-cost-aws-json-title', 'calculate-cost-aws-json-wrap', 'calculate-cost-aws-tab-panel', 'd-none', 'tool-json-head', 'tool-json-output', 'tool-json-panel', 'tool-json-title'],
            sourceVariables: ['importJsonInput', 'jsonOutput', 'tabPanels'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.jsonOutputSourceSection = jsonOutputSourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
