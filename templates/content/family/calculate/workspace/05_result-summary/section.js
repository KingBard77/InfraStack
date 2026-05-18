// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function resultSummarySourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 81-81
                const resultEmpty = document.getElementById('__DOM_PREFIX__ResultEmpty');

            // Source custom.js lines 84-84
                const resultSummary = document.getElementById('__DOM_PREFIX__ResultSummary');

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

            // Source custom.js lines 2601-2612
                function renderResult(result) {
                    destroySpendRingChart();
                    resultSummary.innerHTML = buildSummaryHtml(result);
                    breakdownTableBody.innerHTML = getSortedLineItems().map(buildBreakdownRow).join('');
                    serviceTableBody.innerHTML = result.serviceRows.map(buildServiceRow).join('');
                    assumptionTableBody.innerHTML = result.assumptions.map(buildAssumptionRow).join('');
                    recommendationsWrap.innerHTML = buildRecommendationsHtml(result.recommendations);
                    methodologyWrap.innerHTML = buildMethodologyHtml(result);
                    renderJsonOutput(buildJsonPayload(result));
                    renderSpendRingChart(result);
                }
        }

        return {
            sourceTool: 'templates/content/tools/aws/calculate-cost-aws/',
            sourceJsLines: [[81, 81], [84, 84], [136, 229], [1302, 1317], [1318, 1332], [1333, 1338], [2601, 2612]],
            sourceDomIds: ['calculateCostAwsResultEmpty', 'calculateCostAwsResultSummary'],
            sourceClasses: ['calculate-cost-aws-result-empty', 'calculate-cost-aws-result-summary'],
            sourceVariables: ['resultEmpty', 'resultSummary'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.resultSummarySourceSection = resultSummarySourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
