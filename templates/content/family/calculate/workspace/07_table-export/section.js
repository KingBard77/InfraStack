// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function tableExportSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 83-83
                const resultError = document.getElementById('__DOM_PREFIX__ResultError');

            // Source custom.js lines 92-92
                const sortInput = document.getElementById('__DOM_PREFIX__Sort');

            // Source custom.js lines 93-93
                const sortSummary = document.getElementById('__DOM_PREFIX__SortSummary');

            // Source custom.js lines 94-94
                const sortOptionInputs = Array.from(document.querySelectorAll('input[name="__DOM_PREFIX__SortOption"]'));

            // Source custom.js lines 95-95
                const sortSelect = document.getElementById('__DOM_PREFIX__SortSelect');

            // Source custom.js lines 96-96
                const exportPdfButton = document.getElementById('__DOM_PREFIX__ExportPdf');

            // Source custom.js lines 97-97
                const downloadCsvButton = document.getElementById('__DOM_PREFIX__DownloadCsv');

            // Source custom.js lines 98-98
                const copyJsonButton = document.getElementById('__DOM_PREFIX__CopyJson');

            // Source custom.js lines 99-99
                const downloadJsonButton = document.getElementById('__DOM_PREFIX__DownloadJson');

            // Source custom.js lines 100-100
                const importJsonButton = document.getElementById('__DOM_PREFIX__ImportJsonButton');

            // Source custom.js lines 101-101
                const importJsonInput = document.getElementById('__DOM_PREFIX__ImportJson');

            // Source custom.js lines 104-105
                const dropdownSelects = Array.from(document.querySelectorAll('.__TOOL_CLASS__-select'));

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

            // Source custom.js lines 230-262
                const singleSelectConfigs = [
                    {
                        inputs: presetOptionInputs,
                        hiddenInput: presetInput,
                        summaryElement: presetSummary,
                        detailsElement: presetSelect
                    },
                    {
                        inputs: ec2InstanceOptionInputs,
                        hiddenInput: ec2InstanceInput,
                        summaryElement: ec2InstanceSummary,
                        detailsElement: ec2InstanceSelect
                    },
                    {
                        inputs: ec2PurchaseOptionInputs,
                        hiddenInput: ec2PurchaseInput,
                        summaryElement: ec2PurchaseSummary,
                        detailsElement: ec2PurchaseSelect
                    },
                    {
                        inputs: apiTypeOptionInputs,
                        hiddenInput: apiTypeInput,
                        summaryElement: apiTypeSummary,
                        detailsElement: apiTypeSelect
                    },
                    {
                        inputs: sortOptionInputs,
                        hiddenInput: sortInput,
                        summaryElement: sortSummary,
                        detailsElement: sortSelect
                    }
                ];

            // Source custom.js lines 1045-1060
                function flashCopyButton(button, state) {
                    const isCopied = state === 'copied';
                    const originalHtml = button.dataset.defaultHtml || button.innerHTML;
                    button.dataset.defaultHtml = originalHtml;
                    button.classList.toggle('copied', isCopied);
                    button.classList.toggle('failed', !isCopied);
                    button.innerHTML = isCopied
                        ? '<i class="bi bi-check2" aria-hidden="true"></i>'
                        : '<i class="bi bi-x-lg" aria-hidden="true"></i>';

                    window.setTimeout(() => {
                        button.classList.remove('copied', 'failed');
                        button.innerHTML = originalHtml;
                    }, 1400);
                }

            // Source custom.js lines 1276-1287
                function getSelectedSingleLabel(inputs, fallbackLabel) {
                    const selectedInput = inputs.find((input) => input.checked);

                    if (!selectedInput) {
                        return fallbackLabel;
                    }

                    const labelElement = selectedInput.closest('.__TOOL_CLASS__-select-card').querySelector('.__TOOL_CLASS__-select-title');

                    return labelElement ? labelElement.textContent.trim() : fallbackLabel;
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

            // Source custom.js lines 1494-1497
                function resetResultSort() {
                    setImportedSingleSelect(sortOptionInputs, sortInput, sortSummary, 'id');
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

            // Source custom.js lines 1689-1710
                function syncServiceState() {
                    Object.values(serviceRefs).forEach((serviceRef) => {
                        const enabled = serviceRef.checkbox.checked;

                        serviceRef.card.classList.toggle('is-disabled', !enabled);

                        Array.from(serviceRef.body.querySelectorAll('input, textarea, button')).forEach((element) => {
                            element.disabled = !enabled;
                        });

                        Array.from(serviceRef.body.querySelectorAll('.__TOOL_CLASS__-select')).forEach((selectElement) => {
                            selectElement.classList.toggle('is-disabled', !enabled);

                            if (!enabled) {
                                selectElement.removeAttribute('open');
                            }
                        });
                    });

                    syncCustomInstanceState();
                }

            // Source custom.js lines 1784-1845
                function calculateEbs(query, assumptions) {
                    if (!query.includeEbs || query.ebsStorageGb <= 0) {
                        assumptions.push({
                            name: 'EBS pricing basis',
                            value: 'Disabled',
                            note: 'No EBS volume storage cost is included in this estimate.'
                        });

                        return {
                            lineItems: []
                        };
                    }

                    const storageRate = resolveRate(STARTER_RATES.ebsStorage, query.overrides.ebsStorage, query.regionalUpliftPct);
                    const iopsRate = resolveRate(STARTER_RATES.ebsIops, query.overrides.ebsIops, query.regionalUpliftPct);
                    const throughputRate = resolveRate(STARTER_RATES.ebsThroughput, query.overrides.ebsThroughput, query.regionalUpliftPct);

                    const additionalIops = Math.max(0, query.ebsIops - 3000);
                    const additionalThroughput = Math.max(0, query.ebsThroughput - 125);
                    const storageCost = query.ebsStorageGb * storageRate.value;
                    const iopsCost = additionalIops * iopsRate.value;
                    const throughputCost = additionalThroughput * throughputRate.value;

                    assumptions.push({
                        name: 'EBS pricing basis',
                        value: 'gp3 starter model',
                        note: `Baseline 3000 IOPS and 125 MB/s included. Storage ${storageRate.source}, IOPS ${iopsRate.source}, throughput ${throughputRate.source}.`
                    });

                    return {
                        lineItems: [
                            {
                                service: 'EBS',
                                component: 'gp3 storage',
                                usage: `${formatNumber(query.ebsStorageGb, 0)} GB provisioned`,
                                unitBasis: `${formatRate(storageRate.value, 4)} / GB-month`,
                                monthly: storageCost,
                                annual: storageCost * 12,
                                copyValue: `EBS gp3 storage | ${query.ebsStorageGb} GB | ${formatCurrency(storageCost)}`
                            },
                            {
                                service: 'EBS',
                                component: 'Additional gp3 IOPS',
                                usage: `${formatNumber(additionalIops, 0)} billable IOPS`,
                                unitBasis: `${formatRate(iopsRate.value, 4)} / IOPS-month`,
                                monthly: iopsCost,
                                annual: iopsCost * 12,
                                copyValue: `EBS additional IOPS | ${additionalIops} billable IOPS | ${formatCurrency(iopsCost)}`
                            },
                            {
                                service: 'EBS',
                                component: 'Additional gp3 throughput',
                                usage: `${formatNumber(additionalThroughput, 0)} billable MB/s`,
                                unitBasis: `${formatRate(throughputRate.value, 4)} / MB/s-month`,
                                monthly: throughputCost,
                                annual: throughputCost * 12,
                                copyValue: `EBS additional throughput | ${additionalThroughput} MB/s | ${formatCurrency(throughputCost)}`
                            }
                        ].filter((item) => item.monthly > 0)
                    };
                }

            // Source custom.js lines 1911-1964
                function calculateLambda(query, assumptions) {
                    if (!query.includeLambda || query.lambdaRequestsMillion <= 0) {
                        assumptions.push({
                            name: 'Lambda pricing basis',
                            value: 'Disabled',
                            note: 'No Lambda request or duration cost is included in this estimate.'
                        });

                        return {
                            lineItems: []
                        };
                    }

                    const requestRate = resolveRate(STARTER_RATES.lambdaRequestsPerMillion, query.overrides.lambdaRequestsPerMillion, query.regionalUpliftPct);
                    const gbSecondRate = resolveRate(STARTER_RATES.lambdaGbSecond, query.overrides.lambdaGbSecond, query.regionalUpliftPct);

                    const requestCount = query.lambdaRequestsMillion * 1000000;
                    const totalComputeSeconds = requestCount * (query.lambdaDurationMs / 1000);
                    const totalGbSeconds = totalComputeSeconds * (query.lambdaMemoryMb / 1024);
                    const billableRequests = query.freeTierLambda ? Math.max(0, requestCount - 1000000) : requestCount;
                    const billableGbSeconds = query.freeTierLambda ? Math.max(0, totalGbSeconds - 400000) : totalGbSeconds;
                    const requestCost = (billableRequests / 1000000) * requestRate.value;
                    const computeCost = billableGbSeconds * gbSecondRate.value;

                    assumptions.push({
                        name: 'Lambda pricing basis',
                        value: query.freeTierLambda ? 'Starter rate with free tier' : 'Starter rate without free tier',
                        note: `Request pricing ${requestRate.source}. Compute pricing ${gbSecondRate.source}. Memory set to ${formatNumber(query.lambdaMemoryMb, 0)} MB.`
                    });

                    return {
                        lineItems: [
                            {
                                service: 'Lambda',
                                component: 'Request charges',
                                usage: `${formatNumber(requestCount, 0)} requests (${formatNumber(billableRequests, 0)} billable)`,
                                unitBasis: `${formatRate(requestRate.value, 2)} / 1M requests`,
                                monthly: requestCost,
                                annual: requestCost * 12,
                                copyValue: `Lambda requests | ${requestCount} requests | ${formatCurrency(requestCost)}`
                            },
                            {
                                service: 'Lambda',
                                component: 'Compute duration',
                                usage: `${formatNumber(totalGbSeconds, 0)} GB-s (${formatNumber(billableGbSeconds, 0)} billable)`,
                                unitBasis: `${formatRate(gbSecondRate.value, 10)} / GB-s`,
                                monthly: computeCost,
                                annual: computeCost * 12,
                                copyValue: `Lambda compute | ${formatNumber(totalGbSeconds, 0)} GB-s | ${formatCurrency(computeCost)}`
                            }
                        ].filter((item) => item.monthly > 0)
                    };
                }

            // Source custom.js lines 1965-2023
                function calculateApiGateway(query, assumptions) {
                    if (!query.includeApi || query.apiRequestsMillion <= 0) {
                        assumptions.push({
                            name: 'API Gateway pricing basis',
                            value: 'Disabled',
                            note: 'No API Gateway request cost is included in this estimate.'
                        });

                        return {
                            lineItems: [],
                            egressGb: 0
                        };
                    }

                    const httpFirstRate = resolveRate(STARTER_RATES.apiHttpFirstPerMillion, query.overrides.apiHttpFirstPerMillion, query.regionalUpliftPct);
                    const httpNextRate = resolveRate(STARTER_RATES.apiHttpNextPerMillion, query.overrides.apiHttpNextPerMillion, query.regionalUpliftPct);
                    const restRate = resolveRate(STARTER_RATES.apiRestPerMillion, query.overrides.apiRestPerMillion, query.regionalUpliftPct);

                    const requestCount = query.apiRequestsMillion * 1000000;
                    const billableRequests = query.freeTierApi ? Math.max(0, requestCount - 1000000) : requestCount;
                    let requestCost = 0;
                    let unitBasis = '';

                    if (query.apiType === 'http') {
                        const firstTierRequests = Math.min(billableRequests, 300000000);
                        const nextTierRequests = Math.max(0, billableRequests - 300000000);
                        requestCost = (firstTierRequests / 1000000) * httpFirstRate.value + (nextTierRequests / 1000000) * httpNextRate.value;
                        unitBasis = `${formatRate(httpFirstRate.value, 2)} / 1M first tier, ${formatRate(httpNextRate.value, 2)} / 1M next tier`;
                    } else {
                        requestCost = (billableRequests / 1000000) * restRate.value;
                        unitBasis = `${formatRate(restRate.value, 2)} / 1M requests`;
                    }

                    const egressGb = (requestCount * query.apiResponseKb) / (1024 * 1024);

                    assumptions.push({
                        name: 'API Gateway pricing basis',
                        value: query.apiType === 'http' ? 'HTTP API starter model' : 'REST API starter model',
                        note: query.apiType === 'http'
                            ? `HTTP first-tier pricing ${httpFirstRate.source}; next-tier pricing ${httpNextRate.source}.`
                            : `REST pricing ${restRate.source}.`
                    });

                    return {
                        lineItems: [
                            {
                                service: 'API Gateway',
                                component: query.apiType === 'http' ? 'HTTP API calls' : 'REST API calls',
                                usage: `${formatNumber(requestCount, 0)} requests (${formatNumber(billableRequests, 0)} billable)`,
                                unitBasis,
                                monthly: requestCost,
                                annual: requestCost * 12,
                                copyValue: `API Gateway ${query.apiType.toUpperCase()} calls | ${requestCount} requests | ${formatCurrency(requestCost)}`
                            }
                        ].filter((item) => item.monthly > 0),
                        egressGb
                    };
                }

            // Source custom.js lines 2024-2055
                function calculateNetwork(query, combinedEgressGb, assumptions) {
                    const egressRate = resolveRate(STARTER_RATES.egressPerGb, query.overrides.egressPerGb, query.regionalUpliftPct);
                    const billableEgressGb = query.freeTierEgress ? Math.max(0, combinedEgressGb - 100) : combinedEgressGb;
                    const egressCost = billableEgressGb * egressRate.value;

                    assumptions.push({
                        name: 'Internet egress basis',
                        value: query.freeTierEgress ? 'Shared 100 GB free tier applied' : 'No egress free tier applied',
                        note: `${egressRate.source}. Egress includes S3 transfer out, API responses, and shared outbound traffic.`
                    });

                    if (combinedEgressGb <= 0) {
                        return {
                            lineItems: []
                        };
                    }

                    return {
                        lineItems: [
                            {
                                service: 'Network',
                                component: 'Internet egress',
                                usage: `${formatNumber(combinedEgressGb, 1)} GB total (${formatNumber(billableEgressGb, 1)} billable)`,
                                unitBasis: `${formatRate(egressRate.value, 2)} / GB`,
                                monthly: egressCost,
                                annual: egressCost * 12,
                                copyValue: `Internet egress | ${formatNumber(combinedEgressGb, 1)} GB | ${formatCurrency(egressCost)}`
                            }
                        ]
                    };
                }

            // Source custom.js lines 2114-2168
                function buildRecommendations(query, serviceRows, totals, combinedEgressGb, overridesUsed) {
                    const recommendations = [];

                    if (query.includeEc2 && query.ec2Purchase === 'onDemand' && query.ec2Hours >= 500 && query.ec2Count > 0) {
                        recommendations.push({
                            title: 'Steady EC2 runtime',
                            copy: 'EC2 is modeled as a steady workload on On-Demand pricing. Compare that same shape against Savings Plan or reserved coverage before anyone signs a budget with a brave face.'
                        });
                    }

                    if (combinedEgressGb >= 500) {
                        recommendations.push({
                            title: 'Egress is material',
                            copy: 'Network transfer is large enough to deserve its own review. CDN caching, object compression, or reducing hot downloads may move the estimate more than instance tuning.'
                        });
                    }

                    if (serviceRows.length > 0 && serviceRows[0].sharePct >= 45) {
                        recommendations.push({
                            title: `${serviceRows[0].service} dominates the mix`,
                            copy: `${serviceRows[0].service} owns ${formatPercent(serviceRows[0].sharePct)} of the monthly estimate. Optimize the top driver first or the rest of the spreadsheet is just decorative cardio.`
                        });
                    }

                    if (query.includeLambda && query.lambdaRequestsMillion >= 3 && query.lambdaDurationMs >= 250) {
                        recommendations.push({
                            title: 'Lambda compute is noticeable',
                            copy: 'Duration-heavy Lambda workloads can creep from elegant to expensive. Review memory sizing, cold-start behavior, and whether any request path belongs on a steadier service.'
                        });
                    }

                    if (query.supportPct + query.contingencyPct >= 18) {
                        recommendations.push({
                            title: 'Buffer stack is wide',
                            copy: 'Support and contingency consume a large slice of the estimate. That may be correct, but it usually means the model still has services or discounts you should price more directly.'
                        });
                    }

                    if (overridesUsed === 0) {
                        recommendations.push({
                            title: 'Starter catalog still in control',
                            copy: 'You are using the bundled starter rates without manual overrides. That is fine for planning, but it is the moment to validate the expensive lines in AWS pricing before the estimate becomes policy.'
                        });
                    }

                    if (recommendations.length === 0) {
                        recommendations.push({
                            title: 'Estimate looks balanced',
                            copy: 'No single warning is screaming for attention. Review the assumptions tab, verify regional pricing, and compare the top two services against actual billing signals before you trust the calm.'
                        });
                    }

                    return recommendations;
                }

            // Source custom.js lines 2209-2285
                function buildEstimate(query) {
                    const assumptions = [
                        {
                            name: 'Model basis',
                            value: 'AWS starter cost estimate',
                            note: 'Starter catalog in USD with transparent assumptions and editable overrides.'
                        },
                        {
                            name: 'Preset',
                            value: getSelectedSingleLabel(presetOptionInputs, presetSummary.textContent.trim()),
                            note: 'Presets accelerate setup, then yield to your current inputs.'
                        },
                        {
                            name: 'Regional uplift',
                            value: formatPercent(query.regionalUpliftPct),
                            note: query.regionalUpliftPct > 0
                                ? 'Applied only to starter rates that were not manually overridden.'
                                : 'Starter rates are used without an extra regional uplift.'
                        }
                    ];

                    const ec2Result = calculateEc2(query, assumptions);
                    const ebsResult = calculateEbs(query, assumptions);
                    const s3Result = calculateS3(query, assumptions);
                    const lambdaResult = calculateLambda(query, assumptions);
                    const apiResult = calculateApiGateway(query, assumptions);

                    const combinedEgressGb = query.sharedEgressGb + s3Result.egressGb + apiResult.egressGb;
                    const networkResult = calculateNetwork(query, combinedEgressGb, assumptions);

                    const modeledLineItems = [
                        ...ec2Result.lineItems,
                        ...ebsResult.lineItems,
                        ...s3Result.lineItems,
                        ...lambdaResult.lineItems,
                        ...apiResult.lineItems,
                        ...networkResult.lineItems
                    ];

                    const modeledSubtotal = modeledLineItems.reduce((sum, item) => sum + item.monthly, 0);
                    const overheadResult = calculateOverhead(query, modeledSubtotal, assumptions);
                    const lineItems = [
                        ...modeledLineItems,
                        ...overheadResult.lineItems
                    ];

                    const monthlyTotal = lineItems.reduce((sum, item) => sum + item.monthly, 0);
                    const annualTotal = monthlyTotal * 12;
                    const serviceRows = groupServiceRows(lineItems, monthlyTotal);
                    const topDriver = serviceRows.length > 0 ? serviceRows[0].service : 'None';
                    const overridesUsed = Object.values(query.overrides).filter((value) => value !== null).length;
                    const recommendations = buildRecommendations(query, serviceRows, {
                        monthlyTotal,
                        annualTotal
                    }, combinedEgressGb, overridesUsed);

                    return {
                        label: query.label,
                        preset: query.preset,
                        query,
                        generatedAt: new Date().toISOString(),
                        lineItems,
                        serviceRows,
                        assumptions,
                        recommendations,
                        totals: {
                            monthlyTotal,
                            annualTotal,
                            dailyTotal: monthlyTotal / 30,
                            hourlyTotal: monthlyTotal / 730,
                            combinedEgressGb,
                            activeServices: serviceRows.length,
                            topDriver
                        }
                    };
                }

            // Source custom.js lines 2286-2321
                function getSortedLineItems() {
                    if (!latestResult) {
                        return [];
                    }

                    const items = [...latestResult.lineItems];

                    if (sortInput.value === 'id') {
                        return items;
                    }

                    if (sortInput.value === 'service') {
                        return items.sort((left, right) => {
                            const serviceSort = left.service.localeCompare(right.service, undefined, {
                                numeric: true,
                                sensitivity: 'base'
                            });

                            if (serviceSort !== 0) {
                                return serviceSort;
                            }

                            return right.monthly - left.monthly;
                        });
                    }

                    if (sortInput.value === 'component') {
                        return items.sort((left, right) => left.component.localeCompare(right.component, undefined, {
                            numeric: true,
                            sensitivity: 'base'
                        }));
                    }

                    return items.sort((left, right) => right.monthly - left.monthly);
                }

            // Source custom.js lines 2334-2431
                function renderSpendRingChart(result) {
                    const chartElement = document.getElementById('__DOM_PREFIX__SpendChart');
                    const ringElement = document.getElementById('__DOM_PREFIX__SpendRing');

                    if (!chartElement || !ringElement) {
                        return;
                    }

                    loadECharts().then((echarts) => {
                        if (!echarts || !chartElement.isConnected) {
                            return;
                        }

                        destroySpendRingChart();

                        const progressValue = getRunRateRingPercent(result.totals.monthlyTotal);

                        spendRingChart = echarts.init(chartElement, null, {
                            renderer: 'svg'
                        });

                        spendRingChart.setOption({
                            animationDuration: 760,
                            animationEasing: 'cubicOut',
                            tooltip: {
                                show: false
                            },
                            series: [
                                {
                                    type: 'gauge',
                                    radius: '94%',
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
                                        roundCap: true,
                                        width: 15,
                                        itemStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                                                { offset: 0, color: '#FDBA74' },
                                                { offset: 0.42, color: '#FDBA74' },
                                                { offset: 1, color: '#7C3AED' }
                                            ]),
                                            shadowBlur: 14,
                                            shadowColor: 'rgba(249, 115, 22, 0.26)'
                                        }
                                    },
                                    axisLine: {
                                        roundCap: true,
                                        lineStyle: {
                                            width: 15,
                                            color: [[1, 'rgba(255, 237, 213, 0.98)']]
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
                                            value: progressValue
                                        }
                                    ]
                                }
                            ]
                        });

                        ringElement.setAttribute('data-chart-ready', 'true');
                        spendRingResizeHandler = () => {
                            if (spendRingChart) {
                                spendRingChart.resize();
                            }
                        };
                        window.addEventListener('resize', spendRingResizeHandler);
                    });
                }

            // Source custom.js lines 2432-2495
                function buildSummaryHtml(result) {
                    const presetLabel = getSelectedSingleLabel(presetOptionInputs, presetSummary.textContent.trim());
                    const generatedAt = new Date(result.generatedAt);
                    const generatedAtText = Number.isNaN(generatedAt.getTime()) ? 'Just now' : generatedAt.toLocaleString();
                    const overrideCount = getOverrideCount(result.query);
                    const progressAngle = Math.round(getRunRateRingPercent(result.totals.monthlyTotal) * 3.6);

                    return `
                        <section class="__TOOL_CLASS__-overview" aria-live="polite">
                            <article class="__TOOL_CLASS__-spend-card">
                                <div class="__TOOL_CLASS__-spend-ring" id="__DOM_PREFIX__SpendRing" style="--progress-angle: ${escapeHtml(String(progressAngle))}deg;" aria-label="Estimated monthly AWS run rate ${escapeHtml(formatCurrency(result.totals.monthlyTotal))}">
                                    <div class="__TOOL_CLASS__-spend-chart" id="__DOM_PREFIX__SpendChart" aria-hidden="true"></div>
                                    <div class="__TOOL_CLASS__-spend-value">
                                        <strong>${escapeHtml(formatCurrency(result.totals.monthlyTotal))}</strong>
                                        <span>Monthly</span>
                                    </div>
                                </div>
                                <h3 class="__TOOL_CLASS__-spend-label">Estimated AWS run rate</h3>
                                <p class="__TOOL_CLASS__-spend-copy">Built from current workload assumptions, not from your billing account. The math is visible so the argument can be too.</p>
                            </article>

                            <section class="__TOOL_CLASS__-summary-panel" aria-label="AWS estimate summary">
                                <div class="__TOOL_CLASS__-badge-row">
                                    <span class="__TOOL_CLASS__-badge">${escapeHtml(presetLabel)}</span>
                                    <span class="__TOOL_CLASS__-badge">Services ${escapeHtml(String(result.totals.activeServices))}</span>
                                    <span class="__TOOL_CLASS__-badge">Overrides ${escapeHtml(String(overrideCount))}</span>
                                    <span class="__TOOL_CLASS__-badge __TOOL_CLASS__-badge-muted">Updated ${escapeHtml(generatedAtText)}</span>
                                </div>

                                <div class="__TOOL_CLASS__-summary-route">
                                    <span class="__TOOL_CLASS__-summary-route-label">Top driver</span>
                                    <span class="__TOOL_CLASS__-summary-route-value">${escapeHtml(result.totals.topDriver)}</span>
                                </div>

                                <div class="__TOOL_CLASS__-stat-grid">
                                    <div class="__TOOL_CLASS__-stat-card">
                                        <span class="__TOOL_CLASS__-stat-label">Annual</span>
                                        <span class="__TOOL_CLASS__-stat-value">${escapeHtml(formatCurrency(result.totals.annualTotal))}</span>
                                        <span class="__TOOL_CLASS__-stat-note">Projected from the current monthly run rate.</span>
                                    </div>

                                    <div class="__TOOL_CLASS__-stat-card">
                                        <span class="__TOOL_CLASS__-stat-label">Daily</span>
                                        <span class="__TOOL_CLASS__-stat-value">${escapeHtml(formatCurrency(result.totals.dailyTotal))}</span>
                                        <span class="__TOOL_CLASS__-stat-note">Thirty-day planning average.</span>
                                    </div>

                                    <div class="__TOOL_CLASS__-stat-card">
                                        <span class="__TOOL_CLASS__-stat-label">Hourly</span>
                                        <span class="__TOOL_CLASS__-stat-value">${escapeHtml(formatCurrency(result.totals.hourlyTotal))}</span>
                                        <span class="__TOOL_CLASS__-stat-note">Useful for sanity-checking long-running workloads.</span>
                                    </div>

                                    <div class="__TOOL_CLASS__-stat-card">
                                        <span class="__TOOL_CLASS__-stat-label">Egress</span>
                                        <span class="__TOOL_CLASS__-stat-value">${escapeHtml(formatNumber(result.totals.combinedEgressGb, 1))} GB</span>
                                        <span class="__TOOL_CLASS__-stat-note">Combined S3, API response, and shared outbound traffic.</span>
                                    </div>
                                </div>
                            </section>
                        </section>
                    `;
                }

            // Source custom.js lines 2496-2514
                function buildBreakdownRow(item, index) {
                    return `
                        <tr>
                            <td class="tool-generated-rownum-cell">${index + 1}</td>
                            <td>${escapeHtml(item.service)}</td>
                            <td>${escapeHtml(item.component)}</td>
                            <td>${escapeHtml(item.usage)}</td>
                            <td>${escapeHtml(item.unitBasis)}</td>
                            <td class="__TOOL_CLASS__-currency">${escapeHtml(formatCurrency(item.monthly))}</td>
                            <td class="__TOOL_CLASS__-currency">${escapeHtml(formatCurrency(item.annual))}</td>
                            <td class="__TOOL_CLASS__-copy-cell">
                                <button type="button" class="__TOOL_CLASS__-copy-btn" data-copy="${escapeHtml(item.copyValue)}" aria-label="Copy breakdown row ${index + 1}" title="Copy row">
                                    <i class="bi bi-clipboard" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }

            // Source custom.js lines 2515-2532
                function buildServiceRow(row, index) {
                    return `
                        <tr>
                            <td class="tool-generated-rownum-cell">${index + 1}</td>
                            <td>${escapeHtml(row.service)}</td>
                            <td class="__TOOL_CLASS__-currency">${escapeHtml(formatCurrency(row.monthly))}</td>
                            <td class="__TOOL_CLASS__-currency">${escapeHtml(formatCurrency(row.annual))}</td>
                            <td>${escapeHtml(formatPercent(row.sharePct))}</td>
                            <td><span class="__TOOL_CLASS__-signal ${escapeHtml(row.signalClass)}">${escapeHtml(row.signal)}</span></td>
                            <td class="__TOOL_CLASS__-copy-cell">
                                <button type="button" class="__TOOL_CLASS__-copy-btn" data-copy="${escapeHtml(row.copyValue)}" aria-label="Copy service mix row ${index + 1}" title="Copy row">
                                    <i class="bi bi-clipboard" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }

            // Source custom.js lines 2533-2548
                function buildAssumptionRow(row, index) {
                    return `
                        <tr>
                            <td class="tool-generated-rownum-cell">${index + 1}</td>
                            <td>${escapeHtml(row.name)}</td>
                            <td>${escapeHtml(row.value)}</td>
                            <td>${escapeHtml(row.note)}</td>
                            <td class="__TOOL_CLASS__-copy-cell">
                                <button type="button" class="__TOOL_CLASS__-copy-btn" data-copy="${escapeHtml(`${row.name}: ${row.value}`)}" aria-label="Copy assumption row ${index + 1}" title="Copy row">
                                    <i class="bi bi-clipboard" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }

            // Source custom.js lines 2559-2573
                function buildMethodologyHtml(result) {
                    return `
                        <section class="__TOOL_CLASS__-method-card">
                            <span class="__TOOL_CLASS__-method-label">Model Scope</span>
                            <span class="__TOOL_CLASS__-method-title">Included spend drivers</span>
                            <span class="__TOOL_CLASS__-method-copy">This model covers EC2, EBS, S3, Lambda, API Gateway, combined internet egress, support uplift, contingency, and any manual monthly adjustment you applied.</span>
                        </section>
                        <section class="__TOOL_CLASS__-method-card">
                            <span class="__TOOL_CLASS__-method-label">Model Gaps</span>
                            <span class="__TOOL_CLASS__-method-title">What is not priced automatically</span>
                            <span class="__TOOL_CLASS__-method-copy">Taxes, CloudFront, NAT gateways, load balancers, RDS, observability, backups, support plan minimums, and private discount agreements are not automatically derived. Add them as explicit overrides or manual adjustments when they matter.</span>
                        </section>
                    `;
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

            // Source custom.js lines 2666-2676
                dropdownSelects.forEach((selectElement) => {
                    selectElement.addEventListener('toggle', function () {
                        if (selectElement.open) {
                            applySelectSpace(selectElement);
                            return;
                        }

                        clearSelectSpace(selectElement);
                    });
                });

            // Source custom.js lines 2677-2694
                singleSelectConfigs.forEach((config) => {
                    updateSingleSelectState(config.inputs, config.hiddenInput, config.summaryElement, null);

                    config.inputs.forEach((input) => {
                        input.addEventListener('change', function () {
                                    updateSingleSelectState(config.inputs, config.hiddenInput, config.summaryElement, config.detailsElement);

                                    if (config.hiddenInput === sortInput && latestResult) {
                                        renderResult(latestResult);
                                    }

                                    if (config.hiddenInput === ec2InstanceInput) {
                                        syncCustomInstanceState();
                                    }
                                });
                    });
                });

            // Source custom.js lines 2700-2708
                document.addEventListener('click', function (event) {
                    dropdownSelects.forEach((selectElement) => {
                        if (!selectElement.contains(event.target)) {
                            selectElement.removeAttribute('open');
                            clearSelectSpace(selectElement);
                        }
                    });
                });

            // Source custom.js lines 2709-2733
                document.addEventListener('keydown', function (event) {
                    if (event.key !== 'Escape') {
                        return;
                    }

                    dropdownSelects.forEach((selectElement) => {
                        selectElement.removeAttribute('open');
                        clearSelectSpace(selectElement);
                    });
                });

                Object.values(serviceRefs).forEach((serviceRef) => {
                    serviceRef.checkbox.addEventListener('change', syncServiceState);
                });

                [ec2CustomLabelInput, ec2CustomVcpuInput, ec2CustomMemoryGiBInput].forEach((input) => {
                    input.addEventListener('input', function () {
                        updateCustomInstanceLabel();

                        if (ec2InstanceInput.value === 'custom') {
                            updateSingleSelectState(ec2InstanceOptionInputs, ec2InstanceInput, ec2InstanceSummary, null);
                        }
                    });
                });

            // Source custom.js lines 2787-2795
                exportPdfButton.addEventListener('click', function () {
                    if (!latestResult) {
                        return;
                    }

                    exportResultShellAsPdf(slugify(latestResult.label), resultContent);
                    flashButton(exportPdfButton, 'Opened');
                });

            // Source custom.js lines 2796-2811
                downloadCsvButton.addEventListener('click', function () {
                    if (!latestResult) {
                        return;
                    }

                    const activeTab = getActiveTab();
                    const rows = activeTab === 'services'
                        ? buildCsvRowsForServices()
                        : activeTab === 'assumptions'
                            ? buildCsvRowsForAssumptions()
                            : buildCsvRowsForBreakdown();

                    downloadFile(`${slugify(latestResult.label)}-${activeTab}.csv`, rowsToCsv(rows), 'text/csv;charset=utf-8');
                    flashButton(downloadCsvButton, 'Saved');
                });

            // Source custom.js lines 2812-2824
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

            // Source custom.js lines 2825-2837
                downloadJsonButton.addEventListener('click', function () {
                    if (!latestResult) {
                        return;
                    }

                    downloadFile(
                        `${slugify(latestResult.label)}.json`,
                        JSON.stringify(buildJsonPayload(latestResult), null, 2),
                        'application/json;charset=utf-8'
                    );
                    flashButton(downloadJsonButton, 'Saved');
                });

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
            sourceJsLines: [[83, 83], [92, 92], [93, 93], [94, 94], [95, 95], [96, 96], [97, 97], [98, 98], [99, 99], [100, 100], [101, 101], [104, 105], [136, 229], [230, 262], [1045, 1060], [1276, 1287], [1302, 1317], [1318, 1332], [1333, 1338], [1494, 1497], [1678, 1688], [1689, 1710], [1784, 1845], [1911, 1964], [1965, 2023], [2024, 2055], [2114, 2168], [2209, 2285], [2286, 2321], [2334, 2431], [2432, 2495], [2496, 2514], [2515, 2532], [2533, 2548], [2559, 2573], [2588, 2600], [2666, 2676], [2677, 2694], [2700, 2708], [2709, 2733], [2787, 2795], [2796, 2811], [2812, 2824], [2825, 2837], [2838, 2841], [2842, 2860]],
            sourceDomIds: ['calculateCostAwsCopyJson', 'calculateCostAwsDownloadCsv', 'calculateCostAwsDownloadJson', 'calculateCostAwsExportPdf', 'calculateCostAwsImportJson', 'calculateCostAwsImportJsonButton', 'calculateCostAwsResultError', 'calculateCostAwsSort', 'calculateCostAwsSortSelect', 'calculateCostAwsSortSummary'],
            sourceClasses: ['bi', 'bi-clipboard', 'bi-download', 'bi-file-earmark-pdf', 'bi-table', 'bi-upload', 'calculate-cost-aws-action-btn', 'calculate-cost-aws-result-error', 'calculate-cost-aws-select', 'calculate-cost-aws-select-body', 'calculate-cost-aws-select-card', 'calculate-cost-aws-select-grid', 'calculate-cost-aws-select-summary', 'calculate-cost-aws-select-title', 'calculate-cost-aws-sort-label', 'calculate-cost-aws-sort-select', 'calculate-cost-aws-sort-wrap', 'calculate-cost-awsbar', 'calculate-cost-awsbar-actions', 'calculate-cost-awsbar-left', 'calculate-cost-awsbar-shell', 'd-none', 'tool-action-btn', 'tool-action-btn-secondary', 'tool-output-actions', 'tool-output-toolbar', 'tool-result-action-btn', 'tool-result-toolbar', 'tool-result-toolbar-actions', 'tool-result-toolbar-main'],
            sourceVariables: ['copyJsonButton', 'downloadCsvButton', 'downloadJsonButton', 'dropdownSelects', 'exportPdfButton', 'importJsonButton', 'importJsonInput', 'resultError', 'sortInput', 'sortSelect', 'sortSummary'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.tableExportSourceSection = tableExportSourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
