// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function estimateBriefSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 5-5
                const labelInput = document.getElementById('__DOM_PREFIX__Label');

            // Source custom.js lines 11-11
                const submitButton = document.getElementById('__DOM_PREFIX__Submit');

            // Source custom.js lines 12-13
                const resetButton = document.getElementById('__DOM_PREFIX__Reset');

            // Source custom.js lines 102-102
                const tabButtons = Array.from(document.querySelectorAll('.__TOOL_CLASS__-tab-btn'));

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

            // Source custom.js lines 900-980
                function initMarkdownCopyButtons() {
                    const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.__TOOL_CLASS__-prompt-pre'));
                    const promptCopyButtons = document.querySelectorAll('.__TOOL_CLASS__-prompt-copy-btn');

                    promptCopyButtons.forEach((button) => {
                        const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
                        const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
                        const code = promptBlock ? promptBlock.querySelector('code') : null;
                        const label = button.querySelector('span') || button;

                        if (!code) {
                            button.disabled = true;
                            return;
                        }

                        if (button.dataset.__DOM_PREFIX__CopyBound === '1') {
                            return;
                        }

                        button.dataset.__DOM_PREFIX__CopyBound = '1';

                        button.addEventListener('click', async function (event) {
                            event.preventDefault();
                            event.stopPropagation();

                            try {
                                await writeClipboardText(code.textContent.trim());
                                flashButton(label, 'Copied');
                                button.classList.add('copied');
                                window.setTimeout(() => {
                                    button.classList.remove('copied');
                                }, 1400);
                            } catch (error) {
                                flashButton(label, 'Failed');
                            }
                        });
                    });

                    const codeBlocks = document.querySelectorAll('.markdown-content pre:not(.__TOOL_CLASS__-prompt-pre)');

                    codeBlocks.forEach((pre) => {
                        const code = pre.querySelector('code');

                        if (!code) {
                            return;
                        }

                        let button = pre.querySelector('.markdown-copy-btn');

                        if (button && button.dataset.__DOM_PREFIX__CopyBound === '1') {
                            return;
                        }

                        if (!button) {
                            button = document.createElement('button');
                            button.type = 'button';
                            button.className = 'markdown-copy-btn';
                            button.textContent = 'Copy';
                            pre.appendChild(button);
                        }

                        button.type = 'button';
                        if (!button.dataset.defaultLabel) {
                            button.dataset.defaultLabel = button.textContent.trim() || 'Copy';
                        }
                        button.textContent = button.dataset.defaultLabel;
                        button.setAttribute('aria-label', `Copy ${pre.dataset.copyLabel || 'example input'}`);

                        button.dataset.__DOM_PREFIX__CopyBound = '1';

                        button.addEventListener('click', async function () {
                            try {
                                await writeClipboardText(code.textContent.trim());
                                flashButton(button, 'Copied');
                            } catch (error) {
                                flashButton(button, 'Failed');
                            }
                        });
                    });
                }

            // Source custom.js lines 1339-1349
                function toggleSubmitState(isLoading) {
                    if (isLoading) {
                        submitButton.disabled = true;
                        submitButton.textContent = 'Estimating...';
                        return;
                    }

                    submitButton.disabled = false;
                    submitButton.textContent = 'Estimate';
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

            // Source custom.js lines 2764-2770
                resetButton.addEventListener('click', function () {
                    applyPreset('lean-web');
                    latestResult = null;
                    setLoadingState('Build an estimate to review line-item cost drivers, service mix, and exportable JSON.');
                    toggleSubmitState(false);
                });
        }

        return {
            sourceTool: 'templates/content/tools/aws/calculate-cost-aws/',
            sourceJsLines: [[5, 5], [11, 11], [12, 13], [102, 102], [136, 229], [900, 980], [1339, 1349], [1350, 1404], [1498, 1591], [1592, 1664], [2496, 2514], [2515, 2532], [2533, 2548], [2764, 2770]],
            sourceDomIds: ['calculateCostAwsLabel', 'calculateCostAwsReset', 'calculateCostAwsSubmit'],
            sourceClasses: ['btn', 'btn-primary', 'calculate-cost-aws-main-actions', 'calculate-cost-aws-main-input-grid', 'calculate-cost-aws-main-label', 'calculate-cost-aws-main-row', 'calculate-cost-aws-reset-btn', 'calculate-cost-aws-secondary-btn', 'calculate-cost-aws-submit-btn', 'form-control', 'info-dot'],
            sourceVariables: ['labelInput', 'resetButton', 'submitButton'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.estimateBriefSourceSection = estimateBriefSourceSection;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
