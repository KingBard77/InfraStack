// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function resultTabsSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 85-85
                const breakdownTableBody = document.getElementById('__DOM_PREFIX__BreakdownTableBody');

            // Source custom.js lines 86-86
                const serviceTableBody = document.getElementById('__DOM_PREFIX__ServiceTableBody');

            // Source custom.js lines 87-87
                const assumptionTableBody = document.getElementById('__DOM_PREFIX__AssumptionTableBody');

            // Source custom.js lines 88-88
                const recommendationsWrap = document.getElementById('__DOM_PREFIX__Recommendations');

            // Source custom.js lines 89-89
                const methodologyWrap = document.getElementById('__DOM_PREFIX__Methodology');

            // Source custom.js lines 102-102
                const tabButtons = Array.from(document.querySelectorAll('.__TOOL_CLASS__-tab-btn'));

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

            // Source custom.js lines 287-597
                const EC2_CATALOG = {
                    't4g.micro': {
                        label: 't4g.micro',
                        family: 'Graviton general purpose',
                        vcpu: 2,
                        memoryGiB: 1,
                        rates: {
                            onDemand: 0.0084,
                            spot: 0.0028,
                            savings1: 0.0061,
                            savings3: 0.0042,
                            reserved1: 0.0053,
                            reserved3: 0.0036
                        }
                    },
                    't4g.small': {
                        label: 't4g.small',
                        family: 'Graviton general purpose',
                        vcpu: 2,
                        memoryGiB: 2,
                        rates: {
                            onDemand: 0.0168,
                            spot: 0.0064,
                            savings1: 0.0121,
                            savings3: 0.0084,
                            reserved1: 0.0105,
                            reserved3: 0.0073
                        }
                    },
                    't4g.medium': {
                        label: 't4g.medium',
                        family: 'Graviton general purpose',
                        vcpu: 2,
                        memoryGiB: 4,
                        rates: {
                            onDemand: 0.0336,
                            spot: 0.0128,
                            savings1: 0.0242,
                            savings3: 0.0167,
                            reserved1: 0.0211,
                            reserved3: 0.0145
                        }
                    },
                    't4g.large': {
                        label: 't4g.large',
                        family: 'Graviton general purpose',
                        vcpu: 2,
                        memoryGiB: 8,
                        rates: {
                            onDemand: 0.0672,
                            spot: 0.0241,
                            savings1: 0.0485,
                            savings3: 0.0334,
                            reserved1: 0.0421,
                            reserved3: 0.0290
                        }
                    },
                    't4g.xlarge': {
                        label: 't4g.xlarge',
                        family: 'Graviton general purpose',
                        vcpu: 4,
                        memoryGiB: 16,
                        rates: {
                            onDemand: 0.1344,
                            spot: 0.0482,
                            savings1: 0.0970,
                            savings3: 0.0668,
                            reserved1: 0.0842,
                            reserved3: 0.0580
                        }
                    },
                    't3.micro': {
                        label: 't3.micro',
                        family: 'Burstable x86 general purpose',
                        vcpu: 2,
                        memoryGiB: 1,
                        rates: {
                            onDemand: 0.0104,
                            spot: 0.0035,
                            savings1: 0.0075,
                            savings3: 0.0052,
                            reserved1: 0.0065,
                            reserved3: 0.0045
                        }
                    },
                    't3.small': {
                        label: 't3.small',
                        family: 'Burstable x86 general purpose',
                        vcpu: 2,
                        memoryGiB: 2,
                        rates: {
                            onDemand: 0.0208,
                            spot: 0.0065,
                            savings1: 0.0150,
                            savings3: 0.0103,
                            reserved1: 0.0130,
                            reserved3: 0.0090
                        }
                    },
                    't3.medium': {
                        label: 't3.medium',
                        family: 'Burstable x86 general purpose',
                        vcpu: 2,
                        memoryGiB: 4,
                        rates: {
                            onDemand: 0.0416,
                            spot: 0.0139,
                            savings1: 0.0300,
                            savings3: 0.0206,
                            reserved1: 0.0261,
                            reserved3: 0.0180
                        }
                    },
                    't3.large': {
                        label: 't3.large',
                        family: 'Burstable x86 general purpose',
                        vcpu: 2,
                        memoryGiB: 8,
                        rates: {
                            onDemand: 0.0832,
                            spot: 0.0278,
                            savings1: 0.0600,
                            savings3: 0.0412,
                            reserved1: 0.0522,
                            reserved3: 0.0360
                        }
                    },
                    't3.xlarge': {
                        label: 't3.xlarge',
                        family: 'Burstable x86 general purpose',
                        vcpu: 4,
                        memoryGiB: 16,
                        rates: {
                            onDemand: 0.1664,
                            spot: 0.0556,
                            savings1: 0.1200,
                            savings3: 0.0824,
                            reserved1: 0.1044,
                            reserved3: 0.0720
                        }
                    },
                    'c6g.medium': {
                        label: 'c6g.medium',
                        family: 'Graviton compute optimized',
                        vcpu: 1,
                        memoryGiB: 2,
                        rates: {
                            onDemand: 0.0340,
                            spot: 0.0041,
                            savings1: 0.0248,
                            savings3: 0.0164,
                            reserved1: 0.0214,
                            reserved3: 0.0147
                        }
                    },
                    'c6g.large': {
                        label: 'c6g.large',
                        family: 'Graviton compute optimized',
                        vcpu: 2,
                        memoryGiB: 4,
                        rates: {
                            onDemand: 0.0680,
                            spot: 0.0082,
                            savings1: 0.0496,
                            savings3: 0.0328,
                            reserved1: 0.0428,
                            reserved3: 0.0294
                        }
                    },
                    'c7g.medium': {
                        label: 'c7g.medium',
                        family: 'Graviton compute optimized',
                        vcpu: 1,
                        memoryGiB: 2,
                        rates: {
                            onDemand: 0.0363,
                            spot: 0.0066,
                            savings1: 0.0260,
                            savings3: 0.0176,
                            reserved1: 0.0239,
                            reserved3: 0.0159
                        }
                    },
                    'c7g.large': {
                        label: 'c7g.large',
                        family: 'Graviton compute optimized',
                        vcpu: 2,
                        memoryGiB: 4,
                        rates: {
                            onDemand: 0.0726,
                            spot: 0.0132,
                            savings1: 0.0520,
                            savings3: 0.0352,
                            reserved1: 0.0478,
                            reserved3: 0.0318
                        }
                    },
                    'm6g.medium': {
                        label: 'm6g.medium',
                        family: 'Graviton balanced general purpose',
                        vcpu: 1,
                        memoryGiB: 4,
                        rates: {
                            onDemand: 0.0385,
                            spot: 0.0096,
                            savings1: 0.0283,
                            savings3: 0.0200,
                            reserved1: 0.0241,
                            reserved3: 0.0167
                        }
                    },
                    'm6g.large': {
                        label: 'm6g.large',
                        family: 'Graviton balanced general purpose',
                        vcpu: 2,
                        memoryGiB: 8,
                        rates: {
                            onDemand: 0.0770,
                            spot: 0.0192,
                            savings1: 0.0566,
                            savings3: 0.0400,
                            reserved1: 0.0482,
                            reserved3: 0.0334
                        }
                    },
                    'm7g.medium': {
                        label: 'm7g.medium',
                        family: 'Graviton balanced general purpose',
                        vcpu: 1,
                        memoryGiB: 4,
                        rates: {
                            onDemand: 0.0408,
                            spot: 0.0130,
                            savings1: 0.0300,
                            savings3: 0.0207,
                            reserved1: 0.0270,
                            reserved3: 0.0185
                        }
                    },
                    'm7g.large': {
                        label: 'm7g.large',
                        family: 'Graviton balanced general purpose',
                        vcpu: 2,
                        memoryGiB: 8,
                        rates: {
                            onDemand: 0.0816,
                            spot: 0.0260,
                            savings1: 0.0600,
                            savings3: 0.0414,
                            reserved1: 0.0540,
                            reserved3: 0.0370
                        }
                    },
                    'r6g.medium': {
                        label: 'r6g.medium',
                        family: 'Graviton memory optimized',
                        vcpu: 1,
                        memoryGiB: 8,
                        rates: {
                            onDemand: 0.0504,
                            spot: 0.0095,
                            savings1: 0.0365,
                            savings3: 0.0264,
                            reserved1: 0.0318,
                            reserved3: 0.0218
                        }
                    },
                    'r6g.large': {
                        label: 'r6g.large',
                        family: 'Graviton memory optimized',
                        vcpu: 2,
                        memoryGiB: 16,
                        rates: {
                            onDemand: 0.1008,
                            spot: 0.0190,
                            savings1: 0.0730,
                            savings3: 0.0528,
                            reserved1: 0.0636,
                            reserved3: 0.0436
                        }
                    },
                    'r7g.medium': {
                        label: 'r7g.medium',
                        family: 'Graviton memory optimized',
                        vcpu: 1,
                        memoryGiB: 8,
                        rates: {
                            onDemand: 0.0536,
                            spot: 0.0154,
                            savings1: 0.0388,
                            savings3: 0.0279,
                            reserved1: 0.0354,
                            reserved3: 0.0243
                        }
                    },
                    'r7g.large': {
                        label: 'r7g.large',
                        family: 'Graviton memory optimized',
                        vcpu: 2,
                        memoryGiB: 16,
                        rates: {
                            onDemand: 0.1072,
                            spot: 0.0308,
                            savings1: 0.0776,
                            savings3: 0.0558,
                            reserved1: 0.0708,
                            reserved3: 0.0486
                        }
                    }
                };

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

            // Source custom.js lines 1253-1267
                function getDropdownBoundaryRect(element) {
                    const boundaryElement = element
                        ? element.closest('.__TOOL_CLASS__-service-card, .__TOOL_CLASS__-inner-panel, .__TOOL_CLASS__-section-card, .tool-box')
                        : null;

                    if (boundaryElement) {
                        return boundaryElement.getBoundingClientRect();
                    }

                    return {
                        top: 0,
                        bottom: window.innerHeight
                    };
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

            // Source custom.js lines 1846-1910
                function calculateS3(query, assumptions) {
                    if (
                        !query.includeS3 ||
                        (query.s3StorageGb <= 0 && query.s3GetRequestsK <= 0 && query.s3PutRequestsK <= 0 && query.s3EgressGb <= 0)
                    ) {
                        assumptions.push({
                            name: 'S3 pricing basis',
                            value: 'Disabled',
                            note: 'No S3 storage or request cost is included in this estimate.'
                        });

                        return {
                            lineItems: [],
                            egressGb: 0
                        };
                    }

                    const storageRate = resolveRate(STARTER_RATES.s3Storage, query.overrides.s3Storage, query.regionalUpliftPct);
                    const getRate = resolveRate(STARTER_RATES.s3GetPer1k, query.overrides.s3GetPer1k, query.regionalUpliftPct);
                    const putRate = resolveRate(STARTER_RATES.s3PutPer1k, query.overrides.s3PutPer1k, query.regionalUpliftPct);

                    const storageCost = query.s3StorageGb * storageRate.value;
                    const getCost = query.s3GetRequestsK * getRate.value;
                    const putCost = query.s3PutRequestsK * putRate.value;

                    assumptions.push({
                        name: 'S3 pricing basis',
                        value: 'S3 Standard starter model',
                        note: `Storage ${storageRate.source}. Request rates use editable starter assumptions for GET and PUT/LIST activity.`
                    });

                    return {
                        lineItems: [
                            {
                                service: 'S3',
                                component: 'Standard storage',
                                usage: `${formatNumber(query.s3StorageGb, 0)} GB stored`,
                                unitBasis: `${formatRate(storageRate.value, 4)} / GB-month`,
                                monthly: storageCost,
                                annual: storageCost * 12,
                                copyValue: `S3 storage | ${query.s3StorageGb} GB | ${formatCurrency(storageCost)}`
                            },
                            {
                                service: 'S3',
                                component: 'GET requests',
                                usage: `${formatNumber(query.s3GetRequestsK, 0)} × 1k requests`,
                                unitBasis: `${formatRate(getRate.value, 4)} / 1k requests`,
                                monthly: getCost,
                                annual: getCost * 12,
                                copyValue: `S3 GET requests | ${query.s3GetRequestsK} × 1k | ${formatCurrency(getCost)}`
                            },
                            {
                                service: 'S3',
                                component: 'PUT/LIST requests',
                                usage: `${formatNumber(query.s3PutRequestsK, 0)} × 1k requests`,
                                unitBasis: `${formatRate(putRate.value, 4)} / 1k requests`,
                                monthly: putCost,
                                annual: putCost * 12,
                                copyValue: `S3 PUT/LIST requests | ${query.s3PutRequestsK} × 1k | ${formatCurrency(putCost)}`
                            }
                        ].filter((item) => item.monthly > 0),
                        egressGb: query.s3EgressGb
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

            // Source custom.js lines 2613-2618
                function getActiveTab() {
                    const activeButton = tabButtons.find((button) => button.classList.contains('active'));

                    return activeButton ? activeButton.dataset.tabTarget : 'breakdown';
                }

            // Source custom.js lines 2764-2770
                resetButton.addEventListener('click', function () {
                    applyPreset('lean-web');
                    latestResult = null;
                    setLoadingState('Build an estimate to review line-item cost drivers, service mix, and exportable JSON.');
                    toggleSubmitState(false);
                });

            // Source custom.js lines 2771-2776
                tabButtons.forEach((button) => {
                    button.addEventListener('click', function () {
                        activateTab(button.dataset.tabTarget);
                    });
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

            // Source custom.js lines 2861-2861
                setLoadingState('Build an estimate to review line-item cost drivers, service mix, and exportable JSON.');
        }

        return {
            sourceTool: 'templates/content/tools/aws/calculate-cost-aws/',
            sourceJsLines: [[85, 85], [86, 86], [87, 87], [88, 88], [89, 89], [102, 102], [103, 103], [136, 229], [287, 597], [1045, 1060], [1253, 1267], [1302, 1317], [1318, 1332], [1333, 1338], [1678, 1688], [1784, 1845], [1846, 1910], [1911, 1964], [1965, 2023], [2024, 2055], [2114, 2168], [2209, 2285], [2334, 2431], [2432, 2495], [2496, 2514], [2515, 2532], [2533, 2548], [2559, 2573], [2588, 2600], [2601, 2612], [2613, 2618], [2764, 2770], [2771, 2776], [2796, 2811], [2861, 2861]],
            sourceDomIds: ['calculateCostAwsAssumptionTableBody', 'calculateCostAwsBreakdownTableBody', 'calculateCostAwsMethodology', 'calculateCostAwsRecommendations', 'calculateCostAwsServiceTableBody'],
            sourceClasses: ['active', 'bi', 'bi-braces', 'bi-card-list', 'bi-lightbulb', 'bi-list-check', 'bi-pie-chart', 'calculate-cost-aws-assumption-table', 'calculate-cost-aws-breakdown-table', 'calculate-cost-aws-method-grid', 'calculate-cost-aws-recommendation-grid', 'calculate-cost-aws-section-card', 'calculate-cost-aws-section-title', 'calculate-cost-aws-service-table', 'calculate-cost-aws-tab-btn', 'calculate-cost-aws-tab-panel', 'calculate-cost-aws-table-wrap', 'calculate-cost-aws-table-wrap-compact', 'calculate-cost-aws-tabs', 'calculate-cost-aws-tabs-shell', 'd-none', 'mb-0', 'table', 'table-responsive', 'tool-generated-rownum-head', 'tool-result-section-card', 'tool-result-section-title', 'tool-result-table', 'tool-result-table--compact', 'tool-result-table-wrap'],
            sourceVariables: ['assumptionTableBody', 'breakdownTableBody', 'methodologyWrap', 'recommendationsWrap', 'serviceTableBody', 'tabButtons', 'tabPanels'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.resultTabsSourceSection = resultTabsSourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
