// section.js


// Source section: 03_advanced-settings
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function serviceCardsSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 14-14
                const includeEc2Input = document.getElementById('__DOM_PREFIX__IncludeEc2');

            // Source custom.js lines 15-15
                const includeEbsInput = document.getElementById('__DOM_PREFIX__IncludeEbs');

            // Source custom.js lines 16-16
                const includeS3Input = document.getElementById('__DOM_PREFIX__IncludeS3');

            // Source custom.js lines 17-17
                const includeLambdaInput = document.getElementById('__DOM_PREFIX__IncludeLambda');

            // Source custom.js lines 18-19
                const includeApiInput = document.getElementById('__DOM_PREFIX__IncludeApi');

            // Source custom.js lines 20-20
                const ec2InstanceInput = document.getElementById('__DOM_PREFIX__Ec2Instance');

            // Source custom.js lines 21-21
                const ec2InstanceSummary = document.getElementById('__DOM_PREFIX__Ec2InstanceSummary');

            // Source custom.js lines 22-22
                const ec2InstanceOptionInputs = Array.from(document.querySelectorAll('input[name="__DOM_PREFIX__Ec2InstanceOption"]'));

            // Source custom.js lines 23-23
                const ec2InstanceSelect = document.getElementById('__DOM_PREFIX__Ec2InstanceSelect');

            // Source custom.js lines 24-24
                const ec2CustomOptionLabel = document.getElementById('__DOM_PREFIX__Ec2CustomOptionLabel');

            // Source custom.js lines 25-25
                const ec2PurchaseInput = document.getElementById('__DOM_PREFIX__Ec2Purchase');

            // Source custom.js lines 26-26
                const ec2PurchaseSummary = document.getElementById('__DOM_PREFIX__Ec2PurchaseSummary');

            // Source custom.js lines 27-27
                const ec2PurchaseOptionInputs = Array.from(document.querySelectorAll('input[name="__DOM_PREFIX__Ec2PurchaseOption"]'));

            // Source custom.js lines 28-28
                const ec2PurchaseSelect = document.getElementById('__DOM_PREFIX__Ec2PurchaseSelect');

            // Source custom.js lines 29-29
                const ec2CustomFields = document.getElementById('__DOM_PREFIX__Ec2CustomFields');

            // Source custom.js lines 30-30
                const ec2CustomHint = document.getElementById('__DOM_PREFIX__Ec2CustomHint');

            // Source custom.js lines 31-31
                const ec2CustomLabelInput = document.getElementById('__DOM_PREFIX__Ec2CustomLabel');

            // Source custom.js lines 32-32
                const ec2CustomVcpuInput = document.getElementById('__DOM_PREFIX__Ec2CustomVcpu');

            // Source custom.js lines 33-33
                const ec2CustomMemoryGiBInput = document.getElementById('__DOM_PREFIX__Ec2CustomMemoryGiB');

            // Source custom.js lines 34-34
                const ec2CountInput = document.getElementById('__DOM_PREFIX__Ec2Count');

            // Source custom.js lines 35-36
                const ec2HoursInput = document.getElementById('__DOM_PREFIX__Ec2Hours');

            // Source custom.js lines 37-37
                const ebsStorageGbInput = document.getElementById('__DOM_PREFIX__EbsStorageGb');

            // Source custom.js lines 38-38
                const ebsIopsInput = document.getElementById('__DOM_PREFIX__EbsIops');

            // Source custom.js lines 39-40
                const ebsThroughputInput = document.getElementById('__DOM_PREFIX__EbsThroughput');

            // Source custom.js lines 41-41
                const s3StorageGbInput = document.getElementById('__DOM_PREFIX__S3StorageGb');

            // Source custom.js lines 42-42
                const s3EgressGbInput = document.getElementById('__DOM_PREFIX__S3EgressGb');

            // Source custom.js lines 43-43
                const s3GetRequestsKInput = document.getElementById('__DOM_PREFIX__S3GetRequestsK');

            // Source custom.js lines 44-45
                const s3PutRequestsKInput = document.getElementById('__DOM_PREFIX__S3PutRequestsK');

            // Source custom.js lines 46-46
                const lambdaRequestsMillionInput = document.getElementById('__DOM_PREFIX__LambdaRequestsMillion');

            // Source custom.js lines 47-47
                const lambdaDurationMsInput = document.getElementById('__DOM_PREFIX__LambdaDurationMs');

            // Source custom.js lines 48-49
                const lambdaMemoryMbInput = document.getElementById('__DOM_PREFIX__LambdaMemoryMb');

            // Source custom.js lines 50-50
                const apiTypeInput = document.getElementById('__DOM_PREFIX__ApiType');

            // Source custom.js lines 51-51
                const apiTypeSummary = document.getElementById('__DOM_PREFIX__ApiTypeSummary');

            // Source custom.js lines 52-52
                const apiTypeOptionInputs = Array.from(document.querySelectorAll('input[name="__DOM_PREFIX__ApiTypeOption"]'));

            // Source custom.js lines 53-53
                const apiTypeSelect = document.getElementById('__DOM_PREFIX__ApiTypeSelect');

            // Source custom.js lines 54-54
                const apiRequestsMillionInput = document.getElementById('__DOM_PREFIX__ApiRequestsMillion');

            // Source custom.js lines 55-56
                const apiResponseKbInput = document.getElementById('__DOM_PREFIX__ApiResponseKb');

            // Source custom.js lines 57-57
                const sharedEgressGbInput = document.getElementById('__DOM_PREFIX__SharedEgressGb');

            // Source custom.js lines 58-58
                const supportPctInput = document.getElementById('__DOM_PREFIX__SupportPct');

            // Source custom.js lines 59-59
                const contingencyPctInput = document.getElementById('__DOM_PREFIX__ContingencyPct');

            // Source custom.js lines 60-61
                const manualAdjustmentInput = document.getElementById('__DOM_PREFIX__ManualAdjustment');

            // Source custom.js lines 69-69
                const ebsIopsRateInput = document.getElementById('__DOM_PREFIX__EbsIopsRate');

            // Source custom.js lines 70-70
                const ebsThroughputRateInput = document.getElementById('__DOM_PREFIX__EbsThroughputRate');

            // Source custom.js lines 104-105
                const dropdownSelects = Array.from(document.querySelectorAll('.__TOOL_CLASS__-select'));

            // Source custom.js lines 106-133
                const serviceRefs = {
                    ec2: {
                        checkbox: includeEc2Input,
                        body: document.getElementById('__DOM_PREFIX__Ec2Body'),
                        card: document.querySelector('[data-service-card="ec2"]')
                    },
                    ebs: {
                        checkbox: includeEbsInput,
                        body: document.getElementById('__DOM_PREFIX__EbsBody'),
                        card: document.querySelector('[data-service-card="ebs"]')
                    },
                    s3: {
                        checkbox: includeS3Input,
                        body: document.getElementById('__DOM_PREFIX__S3Body'),
                        card: document.querySelector('[data-service-card="s3"]')
                    },
                    lambda: {
                        checkbox: includeLambdaInput,
                        body: document.getElementById('__DOM_PREFIX__LambdaBody'),
                        card: document.querySelector('[data-service-card="lambda"]')
                    },
                    api: {
                        checkbox: includeApiInput,
                        body: document.getElementById('__DOM_PREFIX__ApiBody'),
                        card: document.querySelector('[data-service-card="api"]')
                    }
                };

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

            // Source custom.js lines 738-855
                const NUMERIC_INPUT_DECORATORS = {
                    __DOM_PREFIX__Ec2CustomVcpu: {
                        suffix: 'vCPU'
                    },
                    __DOM_PREFIX__Ec2CustomMemoryGiB: {
                        suffix: 'GiB'
                    },
                    __DOM_PREFIX__Ec2Count: {
                        suffix: 'instances'
                    },
                    __DOM_PREFIX__Ec2Hours: {
                        suffix: 'hours'
                    },
                    __DOM_PREFIX__EbsStorageGb: {
                        suffix: 'GB'
                    },
                    __DOM_PREFIX__EbsIops: {
                        suffix: 'IOPS'
                    },
                    __DOM_PREFIX__EbsThroughput: {
                        suffix: 'MB/s'
                    },
                    __DOM_PREFIX__S3StorageGb: {
                        suffix: 'GB'
                    },
                    __DOM_PREFIX__S3EgressGb: {
                        suffix: 'GB'
                    },
                    __DOM_PREFIX__S3GetRequestsK: {
                        suffix: '1k'
                    },
                    __DOM_PREFIX__S3PutRequestsK: {
                        suffix: '1k'
                    },
                    __DOM_PREFIX__LambdaRequestsMillion: {
                        suffix: '1M'
                    },
                    __DOM_PREFIX__LambdaDurationMs: {
                        suffix: 'ms'
                    },
                    __DOM_PREFIX__LambdaMemoryMb: {
                        suffix: 'MB'
                    },
                    __DOM_PREFIX__ApiRequestsMillion: {
                        suffix: '1M'
                    },
                    __DOM_PREFIX__ApiResponseKb: {
                        suffix: 'KB'
                    },
                    __DOM_PREFIX__SharedEgressGb: {
                        suffix: 'GB'
                    },
                    __DOM_PREFIX__SupportPct: {
                        suffix: '%'
                    },
                    __DOM_PREFIX__ContingencyPct: {
                        suffix: '%'
                    },
                    __DOM_PREFIX__ManualAdjustment: {
                        prefix: '$'
                    },
                    __DOM_PREFIX__RegionalUpliftPct: {
                        suffix: '%'
                    },
                    __DOM_PREFIX__Ec2HourlyOverride: {
                        prefix: '$',
                        suffix: 'instance-hour'
                    },
                    __DOM_PREFIX__EbsStorageRate: {
                        prefix: '$',
                        suffix: 'GB-month'
                    },
                    __DOM_PREFIX__EbsIopsRate: {
                        prefix: '$',
                        suffix: 'IOPS-month'
                    },
                    __DOM_PREFIX__EbsThroughputRate: {
                        prefix: '$',
                        suffix: 'MB/s-month'
                    },
                    __DOM_PREFIX__S3StorageRate: {
                        prefix: '$',
                        suffix: 'GB-month'
                    },
                    __DOM_PREFIX__S3GetRate: {
                        prefix: '$',
                        suffix: '1k GET'
                    },
                    __DOM_PREFIX__S3PutRate: {
                        prefix: '$',
                        suffix: '1k PUT'
                    },
                    __DOM_PREFIX__LambdaRequestRate: {
                        prefix: '$',
                        suffix: '1M req'
                    },
                    __DOM_PREFIX__LambdaGbSecondRate: {
                        prefix: '$',
                        suffix: 'GB-s'
                    },
                    __DOM_PREFIX__ApiHttpFirstRate: {
                        prefix: '$',
                        suffix: '1M'
                    },
                    __DOM_PREFIX__ApiHttpNextRate: {
                        prefix: '$',
                        suffix: '1M'
                    },
                    __DOM_PREFIX__ApiRestRate: {
                        prefix: '$',
                        suffix: '1M'
                    },
                    __DOM_PREFIX__EgressRate: {
                        prefix: '$',
                        suffix: 'GB'
                    }
                };

            // Source custom.js lines 1249-1252
                function getSelectSpaceContainer(selectElement) {
                    return selectElement.closest('.__TOOL_CLASS__-field-stack, .__TOOL_CLASS__-toolbar-left, .__TOOL_CLASS__-setting-field') || selectElement.parentElement;
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

            // Source custom.js lines 1350-1404
                function buildQuery() {
                    return {
                        label: String(labelInput.value || '').trim() || 'AWS cost estimate',
                        preset: presetInput.value,
                        includeEc2: Boolean(includeEc2Input.checked),
                        includeEbs: Boolean(includeEbsInput.checked),
                        includeS3: Boolean(includeS3Input.checked),
                        includeLambda: Boolean(includeLambdaInput.checked),
                        includeApi: Boolean(includeApiInput.checked),
                        ec2Instance: ec2InstanceInput.value,
                        ec2CustomLabel: String(ec2CustomLabelInput.value || '').trim(),
                        ec2CustomVcpu: normalizeNonNegativeNumber(ec2CustomVcpuInput.value, 0),
                        ec2CustomMemoryGiB: normalizeNonNegativeNumber(ec2CustomMemoryGiBInput.value, 0),
                        ec2Purchase: ec2PurchaseInput.value,
                        ec2Count: Math.round(normalizeNonNegativeNumber(ec2CountInput.value, 0)),
                        ec2Hours: normalizeNonNegativeNumber(ec2HoursInput.value, 0),
                        ebsStorageGb: normalizeNonNegativeNumber(ebsStorageGbInput.value, 0),
                        ebsIops: normalizeNonNegativeNumber(ebsIopsInput.value, 0),
                        ebsThroughput: normalizeNonNegativeNumber(ebsThroughputInput.value, 0),
                        s3StorageGb: normalizeNonNegativeNumber(s3StorageGbInput.value, 0),
                        s3EgressGb: normalizeNonNegativeNumber(s3EgressGbInput.value, 0),
                        s3GetRequestsK: normalizeNonNegativeNumber(s3GetRequestsKInput.value, 0),
                        s3PutRequestsK: normalizeNonNegativeNumber(s3PutRequestsKInput.value, 0),
                        lambdaRequestsMillion: normalizeNonNegativeNumber(lambdaRequestsMillionInput.value, 0),
                        lambdaDurationMs: normalizeNonNegativeNumber(lambdaDurationMsInput.value, 0),
                        lambdaMemoryMb: Math.max(128, Math.round(normalizeNonNegativeNumber(lambdaMemoryMbInput.value, 128))),
                        apiType: apiTypeInput.value,
                        apiRequestsMillion: normalizeNonNegativeNumber(apiRequestsMillionInput.value, 0),
                        apiResponseKb: normalizeNonNegativeNumber(apiResponseKbInput.value, 0),
                        sharedEgressGb: normalizeNonNegativeNumber(sharedEgressGbInput.value, 0),
                        supportPct: normalizeNonNegativeNumber(supportPctInput.value, 0),
                        contingencyPct: normalizeNonNegativeNumber(contingencyPctInput.value, 0),
                        manualAdjustment: Number(manualAdjustmentInput.value || 0),
                        freeTierLambda: Boolean(freeTierLambdaInput.checked),
                        freeTierApi: Boolean(freeTierApiInput.checked),
                        freeTierEgress: Boolean(freeTierEgressInput.checked),
                        regionalUpliftPct: normalizeNonNegativeNumber(regionalUpliftPctInput.value, 0),
                        overrides: {
                            ec2Hourly: normalizeOptionalRate(ec2HourlyOverrideInput.value),
                            ebsStorage: normalizeOptionalRate(ebsStorageRateInput.value),
                            ebsIops: normalizeOptionalRate(ebsIopsRateInput.value),
                            ebsThroughput: normalizeOptionalRate(ebsThroughputRateInput.value),
                            s3Storage: normalizeOptionalRate(s3StorageRateInput.value),
                            s3GetPer1k: normalizeOptionalRate(s3GetRateInput.value),
                            s3PutPer1k: normalizeOptionalRate(s3PutRateInput.value),
                            lambdaRequestsPerMillion: normalizeOptionalRate(lambdaRequestRateInput.value),
                            lambdaGbSecond: normalizeOptionalRate(lambdaGbSecondRateInput.value),
                            apiHttpFirstPerMillion: normalizeOptionalRate(apiHttpFirstRateInput.value),
                            apiHttpNextPerMillion: normalizeOptionalRate(apiHttpNextRateInput.value),
                            apiRestPerMillion: normalizeOptionalRate(apiRestRateInput.value),
                            egressPerGb: normalizeOptionalRate(egressRateInput.value)
                        }
                    };
                }

            // Source custom.js lines 1498-1591
                function applyImportedQuery(importedQuery) {
                    const presetKey = PRESETS[importedQuery.preset] ? importedQuery.preset : 'lean-web';
                    const preset = PRESETS[presetKey];
                    const overrides = importedQuery.overrides && typeof importedQuery.overrides === 'object'
                        ? importedQuery.overrides
                        : {};
                    const ec2Instance = importedQuery.ec2Instance === 'custom' || EC2_CATALOG[importedQuery.ec2Instance]
                        ? importedQuery.ec2Instance
                        : preset.ec2Instance;
                    const ec2Purchase = PURCHASE_MODE_LABELS[importedQuery.ec2Purchase]
                        ? importedQuery.ec2Purchase
                        : preset.ec2Purchase;
                    const apiType = ['http', 'rest'].includes(importedQuery.apiType)
                        ? importedQuery.apiType
                        : preset.apiType;

                    applyPreset(presetKey);

                    labelInput.value = String(importedQuery.label || preset.label || 'AWS cost estimate').trim() || 'AWS cost estimate';
                    setImportedSingleSelect(presetOptionInputs, presetInput, presetSummary, presetKey);

                    includeEc2Input.checked = getBooleanValue(importedQuery.includeEc2, preset.includeEc2);
                    includeEbsInput.checked = getBooleanValue(importedQuery.includeEbs, preset.includeEbs);
                    includeS3Input.checked = getBooleanValue(importedQuery.includeS3, preset.includeS3);
                    includeLambdaInput.checked = getBooleanValue(importedQuery.includeLambda, preset.includeLambda);
                    includeApiInput.checked = getBooleanValue(importedQuery.includeApi, preset.includeApi);

                    ec2CustomLabelInput.value = String(importedQuery.ec2CustomLabel || '').trim();
                    setNumberInputValue(ec2CustomVcpuInput, importedQuery.ec2CustomVcpu, 4);
                    setNumberInputValue(ec2CustomMemoryGiBInput, importedQuery.ec2CustomMemoryGiB, 16);
                    setImportedSingleSelect(ec2InstanceOptionInputs, ec2InstanceInput, ec2InstanceSummary, ec2Instance);
                    setImportedSingleSelect(ec2PurchaseOptionInputs, ec2PurchaseInput, ec2PurchaseSummary, ec2Purchase);
                    setNumberInputValue(ec2CountInput, importedQuery.ec2Count, preset.ec2Count);
                    setNumberInputValue(ec2HoursInput, importedQuery.ec2Hours, preset.ec2Hours);

                    setNumberInputValue(ebsStorageGbInput, importedQuery.ebsStorageGb, preset.ebsStorageGb);
                    setNumberInputValue(ebsIopsInput, importedQuery.ebsIops, preset.ebsIops);
                    setNumberInputValue(ebsThroughputInput, importedQuery.ebsThroughput, preset.ebsThroughput);

                    setNumberInputValue(s3StorageGbInput, importedQuery.s3StorageGb, preset.s3StorageGb);
                    setNumberInputValue(s3EgressGbInput, importedQuery.s3EgressGb, preset.s3EgressGb);
                    setNumberInputValue(s3GetRequestsKInput, importedQuery.s3GetRequestsK, preset.s3GetRequestsK);
                    setNumberInputValue(s3PutRequestsKInput, importedQuery.s3PutRequestsK, preset.s3PutRequestsK);

                    setNumberInputValue(lambdaRequestsMillionInput, importedQuery.lambdaRequestsMillion, preset.lambdaRequestsMillion);
                    setNumberInputValue(lambdaDurationMsInput, importedQuery.lambdaDurationMs, preset.lambdaDurationMs);
                    setNumberInputValue(lambdaMemoryMbInput, importedQuery.lambdaMemoryMb, preset.lambdaMemoryMb);

                    setImportedSingleSelect(apiTypeOptionInputs, apiTypeInput, apiTypeSummary, apiType);
                    setNumberInputValue(apiRequestsMillionInput, importedQuery.apiRequestsMillion, preset.apiRequestsMillion);
                    setNumberInputValue(apiResponseKbInput, importedQuery.apiResponseKb, preset.apiResponseKb);

                    setNumberInputValue(sharedEgressGbInput, importedQuery.sharedEgressGb, preset.sharedEgressGb);
                    setNumberInputValue(supportPctInput, importedQuery.supportPct, preset.supportPct);
                    setNumberInputValue(contingencyPctInput, importedQuery.contingencyPct, preset.contingencyPct);
                    setNumberInputValue(manualAdjustmentInput, importedQuery.manualAdjustment, preset.manualAdjustment);

                    freeTierLambdaInput.checked = getBooleanValue(importedQuery.freeTierLambda, preset.freeTierLambda);
                    freeTierApiInput.checked = getBooleanValue(importedQuery.freeTierApi, preset.freeTierApi);
                    freeTierEgressInput.checked = getBooleanValue(importedQuery.freeTierEgress, preset.freeTierEgress);
                    setNumberInputValue(regionalUpliftPctInput, importedQuery.regionalUpliftPct, preset.regionalUpliftPct);

                    setOptionalRateInputValue(ec2HourlyOverrideInput, overrides.ec2Hourly);
                    setOptionalRateInputValue(ebsStorageRateInput, overrides.ebsStorage);
                    setOptionalRateInputValue(ebsIopsRateInput, overrides.ebsIops);
                    setOptionalRateInputValue(ebsThroughputRateInput, overrides.ebsThroughput);
                    setOptionalRateInputValue(s3StorageRateInput, overrides.s3Storage);
                    setOptionalRateInputValue(s3GetRateInput, overrides.s3GetPer1k);
                    setOptionalRateInputValue(s3PutRateInput, overrides.s3PutPer1k);
                    setOptionalRateInputValue(lambdaRequestRateInput, overrides.lambdaRequestsPerMillion);
                    setOptionalRateInputValue(lambdaGbSecondRateInput, overrides.lambdaGbSecond);
                    setOptionalRateInputValue(apiHttpFirstRateInput, overrides.apiHttpFirstPerMillion);
                    setOptionalRateInputValue(apiHttpNextRateInput, overrides.apiHttpNextPerMillion);
                    setOptionalRateInputValue(apiRestRateInput, overrides.apiRestPerMillion);
                    setOptionalRateInputValue(egressRateInput, overrides.egressPerGb);

                    updateCustomInstanceLabel();
                    syncServiceState();
                    syncCustomInstanceState();

                    const normalizedQuery = buildQuery();
                    const validationError = validateQuery(normalizedQuery);

                    if (validationError) {
                        throw new Error(validationError);
                    }

                    latestResult = buildEstimate(normalizedQuery);
                    resetResultSort();
                    renderResult(latestResult);
                    setResultState();
                    activateTab('breakdown');
                }

            // Source custom.js lines 1592-1664
                function applyPreset(presetKey) {
                    const preset = PRESETS[presetKey] || PRESETS['lean-web'];

                    labelInput.value = preset.label;
                    presetInput.value = presetKey;
                    setSelectedSingleValue(presetOptionInputs, presetKey);
                    updateSingleSelectState(presetOptionInputs, presetInput, presetSummary, presetSelect);

                    includeEc2Input.checked = preset.includeEc2;
                    includeEbsInput.checked = preset.includeEbs;
                    includeS3Input.checked = preset.includeS3;
                    includeLambdaInput.checked = preset.includeLambda;
                    includeApiInput.checked = preset.includeApi;

                    ec2InstanceInput.value = preset.ec2Instance;
                    ec2CustomLabelInput.value = '';
                    ec2CustomVcpuInput.value = 4;
                    ec2CustomMemoryGiBInput.value = 16;
                    ec2PurchaseInput.value = preset.ec2Purchase;
                    setSelectedSingleValue(ec2InstanceOptionInputs, preset.ec2Instance);
                    setSelectedSingleValue(ec2PurchaseOptionInputs, preset.ec2Purchase);
                    updateCustomInstanceLabel();
                    updateSingleSelectState(ec2InstanceOptionInputs, ec2InstanceInput, ec2InstanceSummary, ec2InstanceSelect);
                    updateSingleSelectState(ec2PurchaseOptionInputs, ec2PurchaseInput, ec2PurchaseSummary, ec2PurchaseSelect);
                    ec2CountInput.value = preset.ec2Count;
                    ec2HoursInput.value = preset.ec2Hours;

                    ebsStorageGbInput.value = preset.ebsStorageGb;
                    ebsIopsInput.value = preset.ebsIops;
                    ebsThroughputInput.value = preset.ebsThroughput;

                    s3StorageGbInput.value = preset.s3StorageGb;
                    s3EgressGbInput.value = preset.s3EgressGb;
                    s3GetRequestsKInput.value = preset.s3GetRequestsK;
                    s3PutRequestsKInput.value = preset.s3PutRequestsK;

                    lambdaRequestsMillionInput.value = preset.lambdaRequestsMillion;
                    lambdaDurationMsInput.value = preset.lambdaDurationMs;
                    lambdaMemoryMbInput.value = preset.lambdaMemoryMb;

                    apiTypeInput.value = preset.apiType;
                    setSelectedSingleValue(apiTypeOptionInputs, preset.apiType);
                    updateSingleSelectState(apiTypeOptionInputs, apiTypeInput, apiTypeSummary, apiTypeSelect);
                    apiRequestsMillionInput.value = preset.apiRequestsMillion;
                    apiResponseKbInput.value = preset.apiResponseKb;

                    sharedEgressGbInput.value = preset.sharedEgressGb;
                    supportPctInput.value = preset.supportPct;
                    contingencyPctInput.value = preset.contingencyPct;
                    manualAdjustmentInput.value = preset.manualAdjustment;

                    freeTierLambdaInput.checked = preset.freeTierLambda;
                    freeTierApiInput.checked = preset.freeTierApi;
                    freeTierEgressInput.checked = preset.freeTierEgress;
                    regionalUpliftPctInput.value = preset.regionalUpliftPct;

                    ec2HourlyOverrideInput.value = '';
                    ebsStorageRateInput.value = '';
                    ebsIopsRateInput.value = '';
                    ebsThroughputRateInput.value = '';
                    s3StorageRateInput.value = '';
                    s3GetRateInput.value = '';
                    s3PutRateInput.value = '';
                    lambdaRequestRateInput.value = '';
                    lambdaGbSecondRateInput.value = '';
                    apiHttpFirstRateInput.value = '';
                    apiHttpNextRateInput.value = '';
                    apiRestRateInput.value = '';
                    egressRateInput.value = '';

                    syncServiceState();
                }

            // Source custom.js lines 1665-1677
                function updateCustomInstanceLabel() {
                    const customVcpu = Math.max(0, normalizeNonNegativeNumber(ec2CustomVcpuInput.value, 0));
                    const customMemoryGiB = Math.max(0, normalizeNonNegativeNumber(ec2CustomMemoryGiBInput.value, 0));
                    const customLabel = String(ec2CustomLabelInput.value || '').trim();
                    const sizeLabel = customVcpu > 0 && customMemoryGiB > 0
                        ? `${formatNumber(customVcpu, 0)} vCPU • ${formatNumber(customMemoryGiB, customMemoryGiB % 1 === 0 ? 0 : 1)} GiB`
                        : 'user defined';

                    ec2CustomOptionLabel.textContent = customLabel
                        ? `${customLabel} • ${sizeLabel}`
                        : `Custom size • ${sizeLabel}`;
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
        }

        return {
            sourceTool: 'templates/content/tools/aws/calculate-cost-aws/',
            sourceJsLines: [[14, 14], [15, 15], [16, 16], [17, 17], [18, 19], [20, 20], [21, 21], [22, 22], [23, 23], [24, 24], [25, 25], [26, 26], [27, 27], [28, 28], [29, 29], [30, 30], [31, 31], [32, 32], [33, 33], [34, 34], [35, 36], [37, 37], [38, 38], [39, 40], [41, 41], [42, 42], [43, 43], [44, 45], [46, 46], [47, 47], [48, 49], [50, 50], [51, 51], [52, 52], [53, 53], [54, 54], [55, 56], [57, 57], [58, 58], [59, 59], [60, 61], [69, 69], [70, 70], [104, 105], [106, 133], [136, 229], [230, 262], [738, 855], [1249, 1252], [1253, 1267], [1276, 1287], [1302, 1317], [1318, 1332], [1333, 1338], [1350, 1404], [1498, 1591], [1592, 1664], [1665, 1677], [1678, 1688], [1689, 1710], [2588, 2600], [2666, 2676], [2677, 2694], [2700, 2708], [2709, 2733]],
            sourceDomIds: ['calculateCostAwsApiBody', 'calculateCostAwsApiRequestsMillion', 'calculateCostAwsApiResponseKb', 'calculateCostAwsApiType', 'calculateCostAwsApiTypeSelect', 'calculateCostAwsApiTypeSummary', 'calculateCostAwsContingencyPct', 'calculateCostAwsEbsBody', 'calculateCostAwsEbsIops', 'calculateCostAwsEbsStorageGb', 'calculateCostAwsEbsThroughput', 'calculateCostAwsEc2Body', 'calculateCostAwsEc2Count', 'calculateCostAwsEc2CustomFields', 'calculateCostAwsEc2CustomHint', 'calculateCostAwsEc2CustomLabel', 'calculateCostAwsEc2CustomMemoryGiB', 'calculateCostAwsEc2CustomOptionLabel', 'calculateCostAwsEc2CustomVcpu', 'calculateCostAwsEc2Hours', 'calculateCostAwsEc2Instance', 'calculateCostAwsEc2InstanceSelect', 'calculateCostAwsEc2InstanceSummary', 'calculateCostAwsEc2Purchase', 'calculateCostAwsEc2PurchaseSelect', 'calculateCostAwsEc2PurchaseSummary', 'calculateCostAwsIncludeApi', 'calculateCostAwsIncludeEbs', 'calculateCostAwsIncludeEc2', 'calculateCostAwsIncludeLambda', 'calculateCostAwsIncludeS3', 'calculateCostAwsLambdaBody', 'calculateCostAwsLambdaDurationMs', 'calculateCostAwsLambdaMemoryMb', 'calculateCostAwsLambdaRequestsMillion', 'calculateCostAwsManualAdjustment', 'calculateCostAwsS3Body', 'calculateCostAwsS3EgressGb', 'calculateCostAwsS3GetRequestsK', 'calculateCostAwsS3PutRequestsK', 'calculateCostAwsS3StorageGb', 'calculateCostAwsSharedEgressGb', 'calculateCostAwsSupportPct'],
            sourceClasses: ['calculate-cost-aws-card-grid', 'calculate-cost-aws-card-grid-two', 'calculate-cost-aws-card-span-two', 'calculate-cost-aws-custom-instance-grid', 'calculate-cost-aws-field-hint', 'calculate-cost-aws-field-label', 'calculate-cost-aws-field-stack', 'calculate-cost-aws-select', 'calculate-cost-aws-select-body', 'calculate-cost-aws-select-card', 'calculate-cost-aws-select-grid', 'calculate-cost-aws-select-grid-list', 'calculate-cost-aws-select-grid-two', 'calculate-cost-aws-select-summary', 'calculate-cost-aws-select-title', 'calculate-cost-aws-service-body', 'calculate-cost-aws-service-card', 'calculate-cost-aws-service-copy', 'calculate-cost-aws-service-grid', 'calculate-cost-aws-service-head', 'calculate-cost-aws-service-title', 'calculate-cost-aws-switch-label', 'calculate-cost-aws-switch-wrap', 'd-none', 'form-control', 'slider', 'switch'],
            sourceVariables: ['apiRequestsMillionInput', 'apiResponseKbInput', 'apiTypeInput', 'apiTypeSelect', 'apiTypeSummary', 'contingencyPctInput', 'dropdownSelects', 'ebsIopsInput', 'ebsStorageGbInput', 'ebsThroughputInput', 'ec2CountInput', 'ec2CustomFields', 'ec2CustomHint', 'ec2CustomLabelInput', 'ec2CustomMemoryGiBInput', 'ec2CustomOptionLabel', 'ec2CustomVcpuInput', 'ec2HoursInput', 'ec2InstanceInput', 'ec2InstanceSelect', 'ec2InstanceSummary', 'ec2PurchaseInput', 'ec2PurchaseSelect', 'ec2PurchaseSummary', 'includeApiInput', 'includeEbsInput', 'includeEc2Input', 'includeLambdaInput', 'includeS3Input', 'lambdaDurationMsInput', 'lambdaMemoryMbInput', 'lambdaRequestsMillionInput', 'manualAdjustmentInput', 's3EgressGbInput', 's3GetRequestsKInput', 's3PutRequestsKInput', 's3StorageGbInput', 'sharedEgressGbInput', 'supportPctInput'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.serviceCardsSourceSection = serviceCardsSourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));


// Source section: 03_advanced-settings
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function advancedAssumptionsSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 62-62
                const freeTierLambdaInput = document.getElementById('__DOM_PREFIX__FreeTierLambda');

            // Source custom.js lines 63-63
                const freeTierApiInput = document.getElementById('__DOM_PREFIX__FreeTierApi');

            // Source custom.js lines 64-64
                const freeTierEgressInput = document.getElementById('__DOM_PREFIX__FreeTierEgress');

            // Source custom.js lines 65-66
                const regionalUpliftPctInput = document.getElementById('__DOM_PREFIX__RegionalUpliftPct');

            // Source custom.js lines 67-67
                const ec2HourlyOverrideInput = document.getElementById('__DOM_PREFIX__Ec2HourlyOverride');

            // Source custom.js lines 68-68
                const ebsStorageRateInput = document.getElementById('__DOM_PREFIX__EbsStorageRate');

            // Source custom.js lines 69-69
                const ebsIopsRateInput = document.getElementById('__DOM_PREFIX__EbsIopsRate');

            // Source custom.js lines 70-70
                const ebsThroughputRateInput = document.getElementById('__DOM_PREFIX__EbsThroughputRate');

            // Source custom.js lines 71-71
                const s3StorageRateInput = document.getElementById('__DOM_PREFIX__S3StorageRate');

            // Source custom.js lines 72-72
                const s3GetRateInput = document.getElementById('__DOM_PREFIX__S3GetRate');

            // Source custom.js lines 73-73
                const s3PutRateInput = document.getElementById('__DOM_PREFIX__S3PutRate');

            // Source custom.js lines 74-74
                const lambdaRequestRateInput = document.getElementById('__DOM_PREFIX__LambdaRequestRate');

            // Source custom.js lines 75-75
                const lambdaGbSecondRateInput = document.getElementById('__DOM_PREFIX__LambdaGbSecondRate');

            // Source custom.js lines 76-76
                const apiHttpFirstRateInput = document.getElementById('__DOM_PREFIX__ApiHttpFirstRate');

            // Source custom.js lines 77-77
                const apiHttpNextRateInput = document.getElementById('__DOM_PREFIX__ApiHttpNextRate');

            // Source custom.js lines 78-78
                const apiRestRateInput = document.getElementById('__DOM_PREFIX__ApiRestRate');

            // Source custom.js lines 79-80
                const egressRateInput = document.getElementById('__DOM_PREFIX__EgressRate');

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

            // Source custom.js lines 738-855
                const NUMERIC_INPUT_DECORATORS = {
                    __DOM_PREFIX__Ec2CustomVcpu: {
                        suffix: 'vCPU'
                    },
                    __DOM_PREFIX__Ec2CustomMemoryGiB: {
                        suffix: 'GiB'
                    },
                    __DOM_PREFIX__Ec2Count: {
                        suffix: 'instances'
                    },
                    __DOM_PREFIX__Ec2Hours: {
                        suffix: 'hours'
                    },
                    __DOM_PREFIX__EbsStorageGb: {
                        suffix: 'GB'
                    },
                    __DOM_PREFIX__EbsIops: {
                        suffix: 'IOPS'
                    },
                    __DOM_PREFIX__EbsThroughput: {
                        suffix: 'MB/s'
                    },
                    __DOM_PREFIX__S3StorageGb: {
                        suffix: 'GB'
                    },
                    __DOM_PREFIX__S3EgressGb: {
                        suffix: 'GB'
                    },
                    __DOM_PREFIX__S3GetRequestsK: {
                        suffix: '1k'
                    },
                    __DOM_PREFIX__S3PutRequestsK: {
                        suffix: '1k'
                    },
                    __DOM_PREFIX__LambdaRequestsMillion: {
                        suffix: '1M'
                    },
                    __DOM_PREFIX__LambdaDurationMs: {
                        suffix: 'ms'
                    },
                    __DOM_PREFIX__LambdaMemoryMb: {
                        suffix: 'MB'
                    },
                    __DOM_PREFIX__ApiRequestsMillion: {
                        suffix: '1M'
                    },
                    __DOM_PREFIX__ApiResponseKb: {
                        suffix: 'KB'
                    },
                    __DOM_PREFIX__SharedEgressGb: {
                        suffix: 'GB'
                    },
                    __DOM_PREFIX__SupportPct: {
                        suffix: '%'
                    },
                    __DOM_PREFIX__ContingencyPct: {
                        suffix: '%'
                    },
                    __DOM_PREFIX__ManualAdjustment: {
                        prefix: '$'
                    },
                    __DOM_PREFIX__RegionalUpliftPct: {
                        suffix: '%'
                    },
                    __DOM_PREFIX__Ec2HourlyOverride: {
                        prefix: '$',
                        suffix: 'instance-hour'
                    },
                    __DOM_PREFIX__EbsStorageRate: {
                        prefix: '$',
                        suffix: 'GB-month'
                    },
                    __DOM_PREFIX__EbsIopsRate: {
                        prefix: '$',
                        suffix: 'IOPS-month'
                    },
                    __DOM_PREFIX__EbsThroughputRate: {
                        prefix: '$',
                        suffix: 'MB/s-month'
                    },
                    __DOM_PREFIX__S3StorageRate: {
                        prefix: '$',
                        suffix: 'GB-month'
                    },
                    __DOM_PREFIX__S3GetRate: {
                        prefix: '$',
                        suffix: '1k GET'
                    },
                    __DOM_PREFIX__S3PutRate: {
                        prefix: '$',
                        suffix: '1k PUT'
                    },
                    __DOM_PREFIX__LambdaRequestRate: {
                        prefix: '$',
                        suffix: '1M req'
                    },
                    __DOM_PREFIX__LambdaGbSecondRate: {
                        prefix: '$',
                        suffix: 'GB-s'
                    },
                    __DOM_PREFIX__ApiHttpFirstRate: {
                        prefix: '$',
                        suffix: '1M'
                    },
                    __DOM_PREFIX__ApiHttpNextRate: {
                        prefix: '$',
                        suffix: '1M'
                    },
                    __DOM_PREFIX__ApiRestRate: {
                        prefix: '$',
                        suffix: '1M'
                    },
                    __DOM_PREFIX__EgressRate: {
                        prefix: '$',
                        suffix: 'GB'
                    }
                };

            // Source custom.js lines 1249-1252
                function getSelectSpaceContainer(selectElement) {
                    return selectElement.closest('.__TOOL_CLASS__-field-stack, .__TOOL_CLASS__-toolbar-left, .__TOOL_CLASS__-setting-field') || selectElement.parentElement;
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

            // Source custom.js lines 1350-1404
                function buildQuery() {
                    return {
                        label: String(labelInput.value || '').trim() || 'AWS cost estimate',
                        preset: presetInput.value,
                        includeEc2: Boolean(includeEc2Input.checked),
                        includeEbs: Boolean(includeEbsInput.checked),
                        includeS3: Boolean(includeS3Input.checked),
                        includeLambda: Boolean(includeLambdaInput.checked),
                        includeApi: Boolean(includeApiInput.checked),
                        ec2Instance: ec2InstanceInput.value,
                        ec2CustomLabel: String(ec2CustomLabelInput.value || '').trim(),
                        ec2CustomVcpu: normalizeNonNegativeNumber(ec2CustomVcpuInput.value, 0),
                        ec2CustomMemoryGiB: normalizeNonNegativeNumber(ec2CustomMemoryGiBInput.value, 0),
                        ec2Purchase: ec2PurchaseInput.value,
                        ec2Count: Math.round(normalizeNonNegativeNumber(ec2CountInput.value, 0)),
                        ec2Hours: normalizeNonNegativeNumber(ec2HoursInput.value, 0),
                        ebsStorageGb: normalizeNonNegativeNumber(ebsStorageGbInput.value, 0),
                        ebsIops: normalizeNonNegativeNumber(ebsIopsInput.value, 0),
                        ebsThroughput: normalizeNonNegativeNumber(ebsThroughputInput.value, 0),
                        s3StorageGb: normalizeNonNegativeNumber(s3StorageGbInput.value, 0),
                        s3EgressGb: normalizeNonNegativeNumber(s3EgressGbInput.value, 0),
                        s3GetRequestsK: normalizeNonNegativeNumber(s3GetRequestsKInput.value, 0),
                        s3PutRequestsK: normalizeNonNegativeNumber(s3PutRequestsKInput.value, 0),
                        lambdaRequestsMillion: normalizeNonNegativeNumber(lambdaRequestsMillionInput.value, 0),
                        lambdaDurationMs: normalizeNonNegativeNumber(lambdaDurationMsInput.value, 0),
                        lambdaMemoryMb: Math.max(128, Math.round(normalizeNonNegativeNumber(lambdaMemoryMbInput.value, 128))),
                        apiType: apiTypeInput.value,
                        apiRequestsMillion: normalizeNonNegativeNumber(apiRequestsMillionInput.value, 0),
                        apiResponseKb: normalizeNonNegativeNumber(apiResponseKbInput.value, 0),
                        sharedEgressGb: normalizeNonNegativeNumber(sharedEgressGbInput.value, 0),
                        supportPct: normalizeNonNegativeNumber(supportPctInput.value, 0),
                        contingencyPct: normalizeNonNegativeNumber(contingencyPctInput.value, 0),
                        manualAdjustment: Number(manualAdjustmentInput.value || 0),
                        freeTierLambda: Boolean(freeTierLambdaInput.checked),
                        freeTierApi: Boolean(freeTierApiInput.checked),
                        freeTierEgress: Boolean(freeTierEgressInput.checked),
                        regionalUpliftPct: normalizeNonNegativeNumber(regionalUpliftPctInput.value, 0),
                        overrides: {
                            ec2Hourly: normalizeOptionalRate(ec2HourlyOverrideInput.value),
                            ebsStorage: normalizeOptionalRate(ebsStorageRateInput.value),
                            ebsIops: normalizeOptionalRate(ebsIopsRateInput.value),
                            ebsThroughput: normalizeOptionalRate(ebsThroughputRateInput.value),
                            s3Storage: normalizeOptionalRate(s3StorageRateInput.value),
                            s3GetPer1k: normalizeOptionalRate(s3GetRateInput.value),
                            s3PutPer1k: normalizeOptionalRate(s3PutRateInput.value),
                            lambdaRequestsPerMillion: normalizeOptionalRate(lambdaRequestRateInput.value),
                            lambdaGbSecond: normalizeOptionalRate(lambdaGbSecondRateInput.value),
                            apiHttpFirstPerMillion: normalizeOptionalRate(apiHttpFirstRateInput.value),
                            apiHttpNextPerMillion: normalizeOptionalRate(apiHttpNextRateInput.value),
                            apiRestPerMillion: normalizeOptionalRate(apiRestRateInput.value),
                            egressPerGb: normalizeOptionalRate(egressRateInput.value)
                        }
                    };
                }

            // Source custom.js lines 1498-1591
                function applyImportedQuery(importedQuery) {
                    const presetKey = PRESETS[importedQuery.preset] ? importedQuery.preset : 'lean-web';
                    const preset = PRESETS[presetKey];
                    const overrides = importedQuery.overrides && typeof importedQuery.overrides === 'object'
                        ? importedQuery.overrides
                        : {};
                    const ec2Instance = importedQuery.ec2Instance === 'custom' || EC2_CATALOG[importedQuery.ec2Instance]
                        ? importedQuery.ec2Instance
                        : preset.ec2Instance;
                    const ec2Purchase = PURCHASE_MODE_LABELS[importedQuery.ec2Purchase]
                        ? importedQuery.ec2Purchase
                        : preset.ec2Purchase;
                    const apiType = ['http', 'rest'].includes(importedQuery.apiType)
                        ? importedQuery.apiType
                        : preset.apiType;

                    applyPreset(presetKey);

                    labelInput.value = String(importedQuery.label || preset.label || 'AWS cost estimate').trim() || 'AWS cost estimate';
                    setImportedSingleSelect(presetOptionInputs, presetInput, presetSummary, presetKey);

                    includeEc2Input.checked = getBooleanValue(importedQuery.includeEc2, preset.includeEc2);
                    includeEbsInput.checked = getBooleanValue(importedQuery.includeEbs, preset.includeEbs);
                    includeS3Input.checked = getBooleanValue(importedQuery.includeS3, preset.includeS3);
                    includeLambdaInput.checked = getBooleanValue(importedQuery.includeLambda, preset.includeLambda);
                    includeApiInput.checked = getBooleanValue(importedQuery.includeApi, preset.includeApi);

                    ec2CustomLabelInput.value = String(importedQuery.ec2CustomLabel || '').trim();
                    setNumberInputValue(ec2CustomVcpuInput, importedQuery.ec2CustomVcpu, 4);
                    setNumberInputValue(ec2CustomMemoryGiBInput, importedQuery.ec2CustomMemoryGiB, 16);
                    setImportedSingleSelect(ec2InstanceOptionInputs, ec2InstanceInput, ec2InstanceSummary, ec2Instance);
                    setImportedSingleSelect(ec2PurchaseOptionInputs, ec2PurchaseInput, ec2PurchaseSummary, ec2Purchase);
                    setNumberInputValue(ec2CountInput, importedQuery.ec2Count, preset.ec2Count);
                    setNumberInputValue(ec2HoursInput, importedQuery.ec2Hours, preset.ec2Hours);

                    setNumberInputValue(ebsStorageGbInput, importedQuery.ebsStorageGb, preset.ebsStorageGb);
                    setNumberInputValue(ebsIopsInput, importedQuery.ebsIops, preset.ebsIops);
                    setNumberInputValue(ebsThroughputInput, importedQuery.ebsThroughput, preset.ebsThroughput);

                    setNumberInputValue(s3StorageGbInput, importedQuery.s3StorageGb, preset.s3StorageGb);
                    setNumberInputValue(s3EgressGbInput, importedQuery.s3EgressGb, preset.s3EgressGb);
                    setNumberInputValue(s3GetRequestsKInput, importedQuery.s3GetRequestsK, preset.s3GetRequestsK);
                    setNumberInputValue(s3PutRequestsKInput, importedQuery.s3PutRequestsK, preset.s3PutRequestsK);

                    setNumberInputValue(lambdaRequestsMillionInput, importedQuery.lambdaRequestsMillion, preset.lambdaRequestsMillion);
                    setNumberInputValue(lambdaDurationMsInput, importedQuery.lambdaDurationMs, preset.lambdaDurationMs);
                    setNumberInputValue(lambdaMemoryMbInput, importedQuery.lambdaMemoryMb, preset.lambdaMemoryMb);

                    setImportedSingleSelect(apiTypeOptionInputs, apiTypeInput, apiTypeSummary, apiType);
                    setNumberInputValue(apiRequestsMillionInput, importedQuery.apiRequestsMillion, preset.apiRequestsMillion);
                    setNumberInputValue(apiResponseKbInput, importedQuery.apiResponseKb, preset.apiResponseKb);

                    setNumberInputValue(sharedEgressGbInput, importedQuery.sharedEgressGb, preset.sharedEgressGb);
                    setNumberInputValue(supportPctInput, importedQuery.supportPct, preset.supportPct);
                    setNumberInputValue(contingencyPctInput, importedQuery.contingencyPct, preset.contingencyPct);
                    setNumberInputValue(manualAdjustmentInput, importedQuery.manualAdjustment, preset.manualAdjustment);

                    freeTierLambdaInput.checked = getBooleanValue(importedQuery.freeTierLambda, preset.freeTierLambda);
                    freeTierApiInput.checked = getBooleanValue(importedQuery.freeTierApi, preset.freeTierApi);
                    freeTierEgressInput.checked = getBooleanValue(importedQuery.freeTierEgress, preset.freeTierEgress);
                    setNumberInputValue(regionalUpliftPctInput, importedQuery.regionalUpliftPct, preset.regionalUpliftPct);

                    setOptionalRateInputValue(ec2HourlyOverrideInput, overrides.ec2Hourly);
                    setOptionalRateInputValue(ebsStorageRateInput, overrides.ebsStorage);
                    setOptionalRateInputValue(ebsIopsRateInput, overrides.ebsIops);
                    setOptionalRateInputValue(ebsThroughputRateInput, overrides.ebsThroughput);
                    setOptionalRateInputValue(s3StorageRateInput, overrides.s3Storage);
                    setOptionalRateInputValue(s3GetRateInput, overrides.s3GetPer1k);
                    setOptionalRateInputValue(s3PutRateInput, overrides.s3PutPer1k);
                    setOptionalRateInputValue(lambdaRequestRateInput, overrides.lambdaRequestsPerMillion);
                    setOptionalRateInputValue(lambdaGbSecondRateInput, overrides.lambdaGbSecond);
                    setOptionalRateInputValue(apiHttpFirstRateInput, overrides.apiHttpFirstPerMillion);
                    setOptionalRateInputValue(apiHttpNextRateInput, overrides.apiHttpNextPerMillion);
                    setOptionalRateInputValue(apiRestRateInput, overrides.apiRestPerMillion);
                    setOptionalRateInputValue(egressRateInput, overrides.egressPerGb);

                    updateCustomInstanceLabel();
                    syncServiceState();
                    syncCustomInstanceState();

                    const normalizedQuery = buildQuery();
                    const validationError = validateQuery(normalizedQuery);

                    if (validationError) {
                        throw new Error(validationError);
                    }

                    latestResult = buildEstimate(normalizedQuery);
                    resetResultSort();
                    renderResult(latestResult);
                    setResultState();
                    activateTab('breakdown');
                }

            // Source custom.js lines 1592-1664
                function applyPreset(presetKey) {
                    const preset = PRESETS[presetKey] || PRESETS['lean-web'];

                    labelInput.value = preset.label;
                    presetInput.value = presetKey;
                    setSelectedSingleValue(presetOptionInputs, presetKey);
                    updateSingleSelectState(presetOptionInputs, presetInput, presetSummary, presetSelect);

                    includeEc2Input.checked = preset.includeEc2;
                    includeEbsInput.checked = preset.includeEbs;
                    includeS3Input.checked = preset.includeS3;
                    includeLambdaInput.checked = preset.includeLambda;
                    includeApiInput.checked = preset.includeApi;

                    ec2InstanceInput.value = preset.ec2Instance;
                    ec2CustomLabelInput.value = '';
                    ec2CustomVcpuInput.value = 4;
                    ec2CustomMemoryGiBInput.value = 16;
                    ec2PurchaseInput.value = preset.ec2Purchase;
                    setSelectedSingleValue(ec2InstanceOptionInputs, preset.ec2Instance);
                    setSelectedSingleValue(ec2PurchaseOptionInputs, preset.ec2Purchase);
                    updateCustomInstanceLabel();
                    updateSingleSelectState(ec2InstanceOptionInputs, ec2InstanceInput, ec2InstanceSummary, ec2InstanceSelect);
                    updateSingleSelectState(ec2PurchaseOptionInputs, ec2PurchaseInput, ec2PurchaseSummary, ec2PurchaseSelect);
                    ec2CountInput.value = preset.ec2Count;
                    ec2HoursInput.value = preset.ec2Hours;

                    ebsStorageGbInput.value = preset.ebsStorageGb;
                    ebsIopsInput.value = preset.ebsIops;
                    ebsThroughputInput.value = preset.ebsThroughput;

                    s3StorageGbInput.value = preset.s3StorageGb;
                    s3EgressGbInput.value = preset.s3EgressGb;
                    s3GetRequestsKInput.value = preset.s3GetRequestsK;
                    s3PutRequestsKInput.value = preset.s3PutRequestsK;

                    lambdaRequestsMillionInput.value = preset.lambdaRequestsMillion;
                    lambdaDurationMsInput.value = preset.lambdaDurationMs;
                    lambdaMemoryMbInput.value = preset.lambdaMemoryMb;

                    apiTypeInput.value = preset.apiType;
                    setSelectedSingleValue(apiTypeOptionInputs, preset.apiType);
                    updateSingleSelectState(apiTypeOptionInputs, apiTypeInput, apiTypeSummary, apiTypeSelect);
                    apiRequestsMillionInput.value = preset.apiRequestsMillion;
                    apiResponseKbInput.value = preset.apiResponseKb;

                    sharedEgressGbInput.value = preset.sharedEgressGb;
                    supportPctInput.value = preset.supportPct;
                    contingencyPctInput.value = preset.contingencyPct;
                    manualAdjustmentInput.value = preset.manualAdjustment;

                    freeTierLambdaInput.checked = preset.freeTierLambda;
                    freeTierApiInput.checked = preset.freeTierApi;
                    freeTierEgressInput.checked = preset.freeTierEgress;
                    regionalUpliftPctInput.value = preset.regionalUpliftPct;

                    ec2HourlyOverrideInput.value = '';
                    ebsStorageRateInput.value = '';
                    ebsIopsRateInput.value = '';
                    ebsThroughputRateInput.value = '';
                    s3StorageRateInput.value = '';
                    s3GetRateInput.value = '';
                    s3PutRateInput.value = '';
                    lambdaRequestRateInput.value = '';
                    lambdaGbSecondRateInput.value = '';
                    apiHttpFirstRateInput.value = '';
                    apiHttpNextRateInput.value = '';
                    apiRestRateInput.value = '';
                    egressRateInput.value = '';

                    syncServiceState();
                }
        }

        return {
            sourceTool: 'templates/content/tools/aws/calculate-cost-aws/',
            sourceJsLines: [[62, 62], [63, 63], [64, 64], [65, 66], [67, 67], [68, 68], [69, 69], [70, 70], [71, 71], [72, 72], [73, 73], [74, 74], [75, 75], [76, 76], [77, 77], [78, 78], [79, 80], [136, 229], [738, 855], [1249, 1252], [1253, 1267], [1350, 1404], [1498, 1591], [1592, 1664]],
            sourceDomIds: ['calculateCostAwsAdvanced', 'calculateCostAwsApiHttpFirstRate', 'calculateCostAwsApiHttpNextRate', 'calculateCostAwsApiRestRate', 'calculateCostAwsEbsIopsRate', 'calculateCostAwsEbsStorageRate', 'calculateCostAwsEbsThroughputRate', 'calculateCostAwsEc2HourlyOverride', 'calculateCostAwsEgressRate', 'calculateCostAwsFreeTierApi', 'calculateCostAwsFreeTierEgress', 'calculateCostAwsFreeTierLambda', 'calculateCostAwsLambdaGbSecondRate', 'calculateCostAwsLambdaRequestRate', 'calculateCostAwsRegionalUpliftPct', 'calculateCostAwsS3GetRate', 'calculateCostAwsS3PutRate', 'calculateCostAwsS3StorageRate'],
            sourceClasses: ['calculate-cost-aws-advanced', 'calculate-cost-aws-advanced-body', 'calculate-cost-aws-advanced-summary', 'calculate-cost-aws-card-span-two', 'calculate-cost-aws-field-label', 'calculate-cost-aws-field-stack', 'calculate-cost-aws-field-stack-compact', 'calculate-cost-aws-inline-grid', 'calculate-cost-aws-inline-grid-regional', 'calculate-cost-aws-inline-note', 'calculate-cost-aws-inner-panel', 'calculate-cost-aws-override-card', 'calculate-cost-aws-override-card--single', 'calculate-cost-aws-override-card-body', 'calculate-cost-aws-override-card-head', 'calculate-cost-aws-override-card-title', 'calculate-cost-aws-override-grid', 'calculate-cost-aws-setting-field', 'calculate-cost-aws-setting-label', 'calculate-cost-aws-setting-row', 'calculate-cost-aws-setting-row-stacked', 'calculate-cost-aws-switch-card', 'calculate-cost-aws-switch-label', 'calculate-cost-aws-switch-wrap', 'calculate-cost-aws-toggle-grid', 'form-control', 'info-dot', 'slider', 'switch'],
            sourceVariables: ['apiHttpFirstRateInput', 'apiHttpNextRateInput', 'apiRestRateInput', 'ebsIopsRateInput', 'ebsStorageRateInput', 'ebsThroughputRateInput', 'ec2HourlyOverrideInput', 'egressRateInput', 'freeTierApiInput', 'freeTierEgressInput', 'freeTierLambdaInput', 'lambdaGbSecondRateInput', 'lambdaRequestRateInput', 'regionalUpliftPctInput', 's3GetRateInput', 's3PutRateInput', 's3StorageRateInput'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.advancedAssumptionsSourceSection = advancedAssumptionsSourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
