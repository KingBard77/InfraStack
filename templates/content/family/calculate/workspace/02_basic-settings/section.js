// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function basicSettingsSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 6-6
                const presetInput = document.getElementById('__DOM_PREFIX__Preset');

            // Source custom.js lines 7-7
                const presetSummary = document.getElementById('__DOM_PREFIX__PresetSummary');

            // Source custom.js lines 8-8
                const presetOptionInputs = Array.from(document.querySelectorAll('input[name="__DOM_PREFIX__PresetOption"]'));

            // Source custom.js lines 9-9
                const presetSelect = document.getElementById('__DOM_PREFIX__PresetSelect');

            // Source custom.js lines 10-10
                const applyPresetButton = document.getElementById('__DOM_PREFIX__ApplyPreset');

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

            // Source custom.js lines 2549-2558
                function buildRecommendationsHtml(recommendations) {
                    return recommendations.map((recommendation) => `
                        <section class="__TOOL_CLASS__-recommendation-card">
                            <span class="__TOOL_CLASS__-basis-label">Recommendation</span>
                            <strong>${escapeHtml(recommendation.title)}</strong>
                            <span class="__TOOL_CLASS__-recommendation-copy">${escapeHtml(recommendation.copy)}</span>
                        </section>
                    `).join('');
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

            // Source custom.js lines 2760-2763
                applyPresetButton.addEventListener('click', function () {
                    applyPreset(presetInput.value);
                });
        }

        return {
            sourceTool: 'templates/content/tools/aws/calculate-cost-aws/',
            sourceJsLines: [[6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [104, 105], [136, 229], [230, 262], [1249, 1252], [1253, 1267], [1276, 1287], [1350, 1404], [1498, 1591], [1592, 1664], [1689, 1710], [2209, 2285], [2432, 2495], [2549, 2558], [2666, 2676], [2700, 2708], [2709, 2733], [2760, 2763]],
            sourceDomIds: ['calculateCostAwsApplyPreset', 'calculateCostAwsPreset', 'calculateCostAwsPresetSelect', 'calculateCostAwsPresetSummary'],
            sourceClasses: ['calculate-cost-aws-basic-panel', 'calculate-cost-aws-basis-card', 'calculate-cost-aws-basis-grid', 'calculate-cost-aws-basis-label', 'calculate-cost-aws-basis-note', 'calculate-cost-aws-basis-value', 'calculate-cost-aws-inline-grid', 'calculate-cost-aws-inline-grid-preset', 'calculate-cost-aws-inner-panel', 'calculate-cost-aws-secondary-btn', 'calculate-cost-aws-select', 'calculate-cost-aws-select-body', 'calculate-cost-aws-select-card', 'calculate-cost-aws-select-grid', 'calculate-cost-aws-select-grid-list', 'calculate-cost-aws-select-summary', 'calculate-cost-aws-select-title', 'calculate-cost-aws-setting-field', 'calculate-cost-aws-setting-label', 'calculate-cost-aws-setting-row', 'info-dot'],
            sourceVariables: ['applyPresetButton', 'dropdownSelects', 'presetInput', 'presetSelect', 'presetSummary'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.basicSettingsSourceSection = basicSettingsSourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
