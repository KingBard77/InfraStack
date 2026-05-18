// custom.js

// ns:start family.calculate.workspace.01_input-brief
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.01_input-brief
// ns:start family.calculate.workspace.02_basic-settings
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.02_basic-settings
// ns:start family.calculate.workspace.03_advanced-settings
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.03_advanced-settings
// ns:start family.calculate.workspace.04_selected-item
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.04_selected-item
// ns:start family.calculate.workspace.05_result-summary
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.05_result-summary
// ns:start family.calculate.workspace.06_result-view
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.06_result-view
// ns:start family.calculate.workspace.07_table-export
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.07_table-export
// ns:start family.calculate.workspace.08_json-restore
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.08_json-restore

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('calculateCostGcpForm');
    const labelInput = document.getElementById('calculateCostGcpLabel');
    const presetInput = document.getElementById('calculateCostGcpPreset');
    const presetSummary = document.getElementById('calculateCostGcpPresetSummary');
    const presetOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostGcpPresetOption"]'));
    const presetSelect = document.getElementById('calculateCostGcpPresetSelect');
    const applyPresetButton = document.getElementById('calculateCostGcpApplyPreset');
    const submitButton = document.getElementById('calculateCostGcpSubmit');
    const resetButton = document.getElementById('calculateCostGcpReset');

    const includeComputeInput = document.getElementById('calculateCostGcpIncludeCompute');
    const includeDiskInput = document.getElementById('calculateCostGcpIncludeDisk');
    const includeBlobInput = document.getElementById('calculateCostGcpIncludeBlob');
    const includeFunctionsInput = document.getElementById('calculateCostGcpIncludeFunctions');
    const includeApiInput = document.getElementById('calculateCostGcpIncludeApi');

    const computeInstanceInput = document.getElementById('calculateCostGcpComputeInstance');
    const computeInstanceSummary = document.getElementById('calculateCostGcpComputeInstanceSummary');
    const computeInstanceOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostGcpComputeInstanceOption"]'));
    const computeInstanceSelect = document.getElementById('calculateCostGcpComputeInstanceSelect');
    const computeCustomOptionLabel = document.getElementById('calculateCostGcpComputeCustomOptionLabel');
    const computePurchaseInput = document.getElementById('calculateCostGcpComputePurchase');
    const computePurchaseSummary = document.getElementById('calculateCostGcpComputePurchaseSummary');
    const computePurchaseOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostGcpComputePurchaseOption"]'));
    const computePurchaseSelect = document.getElementById('calculateCostGcpComputePurchaseSelect');
    const computeCustomFields = document.getElementById('calculateCostGcpComputeCustomFields');
    const computeCustomHint = document.getElementById('calculateCostGcpComputeCustomHint');
    const computeCustomLabelInput = document.getElementById('calculateCostGcpComputeCustomLabel');
    const computeCustomVcpuInput = document.getElementById('calculateCostGcpComputeCustomVcpu');
    const computeCustomMemoryGiBInput = document.getElementById('calculateCostGcpComputeCustomMemoryGiB');
    const computeCountInput = document.getElementById('calculateCostGcpComputeCount');
    const computeHoursInput = document.getElementById('calculateCostGcpComputeHours');

    const diskStorageGbInput = document.getElementById('calculateCostGcpDiskStorageGb');
    const diskIopsInput = document.getElementById('calculateCostGcpDiskIops');
    const diskThroughputInput = document.getElementById('calculateCostGcpDiskThroughput');

    const blobStorageGbInput = document.getElementById('calculateCostGcpBlobStorageGb');
    const blobEgressGbInput = document.getElementById('calculateCostGcpBlobEgressGb');
    const blobGetRequestsKInput = document.getElementById('calculateCostGcpBlobGetRequestsK');
    const blobPutRequestsKInput = document.getElementById('calculateCostGcpBlobPutRequestsK');

    const functionsRequestsMillionInput = document.getElementById('calculateCostGcpFunctionsRequestsMillion');
    const functionsDurationMsInput = document.getElementById('calculateCostGcpFunctionsDurationMs');
    const functionsMemoryMbInput = document.getElementById('calculateCostGcpFunctionsMemoryMb');

    const apiTypeInput = document.getElementById('calculateCostGcpApiType');
    const apiTypeSummary = document.getElementById('calculateCostGcpApiTypeSummary');
    const apiTypeOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostGcpApiTypeOption"]'));
    const apiTypeSelect = document.getElementById('calculateCostGcpApiTypeSelect');
    const apiRequestsMillionInput = document.getElementById('calculateCostGcpApiRequestsMillion');
    const apiResponseKbInput = document.getElementById('calculateCostGcpApiResponseKb');

    const sharedEgressGbInput = document.getElementById('calculateCostGcpSharedEgressGb');
    const supportPctInput = document.getElementById('calculateCostGcpSupportPct');
    const contingencyPctInput = document.getElementById('calculateCostGcpContingencyPct');
    const manualAdjustmentInput = document.getElementById('calculateCostGcpManualAdjustment');

    const freeTierFunctionsInput = document.getElementById('calculateCostGcpFreeTierFunctions');
    const freeTierApiInput = document.getElementById('calculateCostGcpFreeTierApi');
    const freeTierEgressInput = document.getElementById('calculateCostGcpFreeTierEgress');
    const regionalUpliftPctInput = document.getElementById('calculateCostGcpRegionalUpliftPct');

    const computeHourlyOverrideInput = document.getElementById('calculateCostGcpComputeHourlyOverride');
    const diskStorageRateInput = document.getElementById('calculateCostGcpDiskStorageRate');
    const diskIopsRateInput = document.getElementById('calculateCostGcpDiskIopsRate');
    const diskThroughputRateInput = document.getElementById('calculateCostGcpDiskThroughputRate');
    const blobStorageRateInput = document.getElementById('calculateCostGcpBlobStorageRate');
    const blobGetRateInput = document.getElementById('calculateCostGcpBlobGetRate');
    const blobPutRateInput = document.getElementById('calculateCostGcpBlobPutRate');
    const functionsRequestRateInput = document.getElementById('calculateCostGcpFunctionsRequestRate');
    const functionsGbSecondRateInput = document.getElementById('calculateCostGcpFunctionsGbSecondRate');
    const apiHttpFirstRateInput = document.getElementById('calculateCostGcpApiHttpFirstRate');
    const apiHttpNextRateInput = document.getElementById('calculateCostGcpApiHttpNextRate');
    const apiRestRateInput = document.getElementById('calculateCostGcpApiRestRate');
    const egressRateInput = document.getElementById('calculateCostGcpEgressRate');

    const resultEmpty = document.getElementById('calculateCostGcpResultEmpty');
    const resultContent = document.getElementById('calculateCostGcpResultContent');
    const resultError = document.getElementById('calculateCostGcpResultError');
    const resultSummary = document.getElementById('calculateCostGcpResultSummary');
    const breakdownTableBody = document.getElementById('calculateCostGcpBreakdownTableBody');
    const serviceTableBody = document.getElementById('calculateCostGcpServiceTableBody');
    const assumptionTableBody = document.getElementById('calculateCostGcpAssumptionTableBody');
    const recommendationsWrap = document.getElementById('calculateCostGcpRecommendations');
    const methodologyWrap = document.getElementById('calculateCostGcpMethodology');
    const jsonOutput = document.getElementById('calculateCostGcpJsonOutput');

    const sortInput = document.getElementById('calculateCostGcpSort');
    const sortSummary = document.getElementById('calculateCostGcpSortSummary');
    const sortOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostGcpSortOption"]'));
    const sortSelect = document.getElementById('calculateCostGcpSortSelect');
    const exportPdfButton = document.getElementById('calculateCostGcpExportPdf');
    const downloadCsvButton = document.getElementById('calculateCostGcpDownloadCsv');
    const copyJsonButton = document.getElementById('calculateCostGcpCopyJson');
    const downloadJsonButton = document.getElementById('calculateCostGcpDownloadJson');
    const importJsonButton = document.getElementById('calculateCostGcpImportJsonButton');
    const importJsonInput = document.getElementById('calculateCostGcpImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.calculate-cost-gcp-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.calculate-cost-gcp-tab-panel'));
    const dropdownSelects = Array.from(document.querySelectorAll('.calculate-cost-gcp-select'));

    const serviceRefs = {
        compute: {
            checkbox: includeComputeInput,
            body: document.getElementById('calculateCostGcpComputeBody'),
            card: document.querySelector('[data-service-card="compute"]')
        },
        disk: {
            checkbox: includeDiskInput,
            body: document.getElementById('calculateCostGcpDiskBody'),
            card: document.querySelector('[data-service-card="disk"]')
        },
        blob: {
            checkbox: includeBlobInput,
            body: document.getElementById('calculateCostGcpBlobBody'),
            card: document.querySelector('[data-service-card="blob"]')
        },
        functions: {
            checkbox: includeFunctionsInput,
            body: document.getElementById('calculateCostGcpFunctionsBody'),
            card: document.querySelector('[data-service-card="functions"]')
        },
        api: {
            checkbox: includeApiInput,
            body: document.getElementById('calculateCostGcpApiBody'),
            card: document.querySelector('[data-service-card="api"]')
        }
    };

    initMarkdownCopyButtons();

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
        !includeComputeInput ||
        !includeDiskInput ||
        !includeBlobInput ||
        !includeFunctionsInput ||
        !includeApiInput ||
        !computeInstanceInput ||
        !computeInstanceSummary ||
        computeInstanceOptionInputs.length === 0 ||
        !computeInstanceSelect ||
        !computeCustomOptionLabel ||
        !computePurchaseInput ||
        !computePurchaseSummary ||
        computePurchaseOptionInputs.length === 0 ||
        !computePurchaseSelect ||
        !computeCustomFields ||
        !computeCustomHint ||
        !computeCustomLabelInput ||
        !computeCustomVcpuInput ||
        !computeCustomMemoryGiBInput ||
        !computeCountInput ||
        !computeHoursInput ||
        !diskStorageGbInput ||
        !diskIopsInput ||
        !diskThroughputInput ||
        !blobStorageGbInput ||
        !blobEgressGbInput ||
        !blobGetRequestsKInput ||
        !blobPutRequestsKInput ||
        !functionsRequestsMillionInput ||
        !functionsDurationMsInput ||
        !functionsMemoryMbInput ||
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
        !freeTierFunctionsInput ||
        !freeTierApiInput ||
        !freeTierEgressInput ||
        !regionalUpliftPctInput ||
        !computeHourlyOverrideInput ||
        !diskStorageRateInput ||
        !diskIopsRateInput ||
        !diskThroughputRateInput ||
        !blobStorageRateInput ||
        !blobGetRateInput ||
        !blobPutRateInput ||
        !functionsRequestRateInput ||
        !functionsGbSecondRateInput ||
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

    const singleSelectConfigs = [
        {
            inputs: presetOptionInputs,
            hiddenInput: presetInput,
            summaryElement: presetSummary,
            detailsElement: presetSelect
        },
        {
            inputs: computeInstanceOptionInputs,
            hiddenInput: computeInstanceInput,
            summaryElement: computeInstanceSummary,
            detailsElement: computeInstanceSelect
        },
        {
            inputs: computePurchaseOptionInputs,
            hiddenInput: computePurchaseInput,
            summaryElement: computePurchaseSummary,
            detailsElement: computePurchaseSelect
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

    const PURCHASE_MODE_LABELS = {
        onDemand: 'On-demand',
        spot: 'Spot',
        savings1: 'Committed use 1yr',
        savings3: 'Committed use 3yr',
        reserved1: 'Committed use 1yr',
        reserved3: 'Committed use 3yr'
    };

        const STARTER_RATES = {
        diskStorage: 0.1,
        diskIops: 0.006,
        diskThroughput: 0.07,
        blobStorage: 0.0208,
        blobGetPer1k: 0.0004,
        blobPutPer1k: 0.005,
        functionsRequestsPerMillion: 0.2,
        functionsGbSecond: 0.000016,
        apiHttpFirstPerMillion: 3.5,
        apiHttpNextPerMillion: 2.8,
        apiRestPerMillion: 4.25,
        egressPerGb: 0.087
    };

        const COMPUTE_CATALOG = {
        'b2s': {
            label: 'e2-medium',
            family: 'Burstable general purpose',
            vcpu: 2,
            memoryGiB: 4,
            rates: {
                onDemand: 0.0416,
                spot: 0.0125,
                savings1: 0.0312,
                savings3: 0.0249,
                reserved1: 0.03,
                reserved3: 0.022
            }
        },
        'b2ms': {
            label: 'e2-standard-2',
            family: 'Burstable memory balanced',
            vcpu: 2,
            memoryGiB: 8,
            rates: {
                onDemand: 0.0832,
                spot: 0.0249,
                savings1: 0.0624,
                savings3: 0.0499,
                reserved1: 0.06,
                reserved3: 0.044
            }
        },
        'd2s-v5': {
            label: 'e2-standard-2',
            family: 'General purpose',
            vcpu: 2,
            memoryGiB: 8,
            rates: {
                onDemand: 0.096,
                spot: 0.0288,
                savings1: 0.072,
                savings3: 0.0576,
                reserved1: 0.0672,
                reserved3: 0.0528
            }
        },
        'd4s-v5': {
            label: 'e2-standard-4',
            family: 'General purpose',
            vcpu: 4,
            memoryGiB: 16,
            rates: {
                onDemand: 0.192,
                spot: 0.0576,
                savings1: 0.144,
                savings3: 0.1152,
                reserved1: 0.1344,
                reserved3: 0.1056
            }
        },
        'd8s-v5': {
            label: 'e2-standard-8',
            family: 'General purpose',
            vcpu: 8,
            memoryGiB: 32,
            rates: {
                onDemand: 0.384,
                spot: 0.1152,
                savings1: 0.288,
                savings3: 0.2304,
                reserved1: 0.2688,
                reserved3: 0.2112
            }
        },
        'f4s-v2': {
            label: 'F4s v2',
            family: 'Compute optimized',
            vcpu: 4,
            memoryGiB: 8,
            rates: {
                onDemand: 0.169,
                spot: 0.0507,
                savings1: 0.1268,
                savings3: 0.1014,
                reserved1: 0.1183,
                reserved3: 0.0929
            }
        },
        'e4s-v5': {
            label: 'E4s v5',
            family: 'Memory optimized',
            vcpu: 4,
            memoryGiB: 32,
            rates: {
                onDemand: 0.252,
                spot: 0.0756,
                savings1: 0.189,
                savings3: 0.1512,
                reserved1: 0.1764,
                reserved3: 0.1386
            }
        }
    };

        const PRESETS = {
        'blank': {
            label: 'Google Cloud workload estimate',
            includeCompute: false,
            includeDisk: false,
            includeBlob: false,
            includeFunctions: false,
            includeApi: false,
            computeInstance: 'd2s-v5',
            computePurchase: 'onDemand',
            computeCount: 1,
            computeHours: 730,
            diskStorageGb: 0,
            diskIops: 3000,
            diskThroughput: 125,
            blobStorageGb: 0,
            blobEgressGb: 0,
            blobGetRequestsK: 0,
            blobPutRequestsK: 0,
            functionsRequestsMillion: 0,
            functionsDurationMs: 120,
            functionsMemoryMb: 512,
            apiType: 'http',
            apiRequestsMillion: 0,
            apiResponseKb: 16,
            sharedEgressGb: 0,
            supportPct: 0,
            contingencyPct: 10,
            manualAdjustment: 0,
            freeTierFunctions: true,
            freeTierApi: true,
            freeTierEgress: true,
            regionalUpliftPct: 0
        },
        'serverless-api': {
            label: 'Serverless API',
            includeCompute: false,
            includeDisk: false,
            includeBlob: true,
            includeFunctions: true,
            includeApi: true,
            computeInstance: 'd2s-v5',
            computePurchase: 'onDemand',
            computeCount: 0,
            computeHours: 730,
            diskStorageGb: 0,
            diskIops: 3000,
            diskThroughput: 125,
            blobStorageGb: 80,
            blobEgressGb: 40,
            blobGetRequestsK: 900,
            blobPutRequestsK: 120,
            functionsRequestsMillion: 12,
            functionsDurationMs: 180,
            functionsMemoryMb: 512,
            apiType: 'http',
            apiRequestsMillion: 12,
            apiResponseKb: 48,
            sharedEgressGb: 120,
            supportPct: 8,
            contingencyPct: 12,
            manualAdjustment: 0,
            freeTierFunctions: true,
            freeTierApi: true,
            freeTierEgress: true,
            regionalUpliftPct: 0
        },
        'lean-web': {
            label: 'Lean web platform',
            includeCompute: true,
            includeDisk: true,
            includeBlob: true,
            includeFunctions: true,
            includeApi: true,
            computeInstance: 'd2s-v5',
            computePurchase: 'onDemand',
            computeCount: 2,
            computeHours: 730,
            diskStorageGb: 160,
            diskIops: 3000,
            diskThroughput: 125,
            blobStorageGb: 250,
            blobEgressGb: 80,
            blobGetRequestsK: 2200,
            blobPutRequestsK: 120,
            functionsRequestsMillion: 1.2,
            functionsDurationMs: 140,
            functionsMemoryMb: 512,
            apiType: 'http',
            apiRequestsMillion: 8,
            apiResponseKb: 32,
            sharedEgressGb: 120,
            supportPct: 5,
            contingencyPct: 10,
            manualAdjustment: 0,
            freeTierFunctions: true,
            freeTierApi: true,
            freeTierEgress: true,
            regionalUpliftPct: 0
        },
        'steady-platform': {
            label: 'Steady application platform',
            includeCompute: true,
            includeDisk: true,
            includeBlob: true,
            includeFunctions: true,
            includeApi: true,
            computeInstance: 'd4s-v5',
            computePurchase: 'savings1',
            computeCount: 6,
            computeHours: 730,
            diskStorageGb: 900,
            diskIops: 6000,
            diskThroughput: 250,
            blobStorageGb: 1200,
            blobEgressGb: 350,
            blobGetRequestsK: 8000,
            blobPutRequestsK: 500,
            functionsRequestsMillion: 4.5,
            functionsDurationMs: 220,
            functionsMemoryMb: 1024,
            apiType: 'rest',
            apiRequestsMillion: 25,
            apiResponseKb: 28,
            sharedEgressGb: 500,
            supportPct: 10,
            contingencyPct: 8,
            manualAdjustment: 0,
            freeTierFunctions: false,
            freeTierApi: false,
            freeTierEgress: false,
            regionalUpliftPct: 3
        }
    };

    let latestResult = null;
    let echartsPromise = null;
    let spendRingChart = null;
    let spendRingResizeHandler = null;
    const ECHARTS_CDN_URL = 'https://cdn.jsdelivr.net/npm/echarts@6/dist/echarts.min.js';
    const NUMERIC_INPUT_DECORATORS = {
        calculateCostGcpComputeCustomVcpu: {
            suffix: 'vCPU'
        },
        calculateCostGcpComputeCustomMemoryGiB: {
            suffix: 'GiB'
        },
        calculateCostGcpComputeCount: {
            suffix: 'instances'
        },
        calculateCostGcpComputeHours: {
            suffix: 'hours'
        },
        calculateCostGcpDiskStorageGb: {
            suffix: 'GB'
        },
        calculateCostGcpDiskIops: {
            suffix: 'IOPS'
        },
        calculateCostGcpDiskThroughput: {
            suffix: 'MB/s'
        },
        calculateCostGcpBlobStorageGb: {
            suffix: 'GB'
        },
        calculateCostGcpBlobEgressGb: {
            suffix: 'GB'
        },
        calculateCostGcpBlobGetRequestsK: {
            suffix: '1k'
        },
        calculateCostGcpBlobPutRequestsK: {
            suffix: '1k'
        },
        calculateCostGcpFunctionsRequestsMillion: {
            suffix: '1M'
        },
        calculateCostGcpFunctionsDurationMs: {
            suffix: 'ms'
        },
        calculateCostGcpFunctionsMemoryMb: {
            suffix: 'MB'
        },
        calculateCostGcpApiRequestsMillion: {
            suffix: '1M'
        },
        calculateCostGcpApiResponseKb: {
            suffix: 'KB'
        },
        calculateCostGcpSharedEgressGb: {
            suffix: 'GB'
        },
        calculateCostGcpSupportPct: {
            suffix: '%'
        },
        calculateCostGcpContingencyPct: {
            suffix: '%'
        },
        calculateCostGcpManualAdjustment: {
            prefix: '$'
        },
        calculateCostGcpRegionalUpliftPct: {
            suffix: '%'
        },
        calculateCostGcpComputeHourlyOverride: {
            prefix: '$',
            suffix: 'instance-hour'
        },
        calculateCostGcpDiskStorageRate: {
            prefix: '$',
            suffix: 'GB-month'
        },
        calculateCostGcpDiskIopsRate: {
            prefix: '$',
            suffix: 'IOPS-month'
        },
        calculateCostGcpDiskThroughputRate: {
            prefix: '$',
            suffix: 'MB/s-month'
        },
        calculateCostGcpBlobStorageRate: {
            prefix: '$',
            suffix: 'GB-month'
        },
        calculateCostGcpBlobGetRate: {
            prefix: '$',
            suffix: '1k GET'
        },
        calculateCostGcpBlobPutRate: {
            prefix: '$',
            suffix: '1k PUT'
        },
        calculateCostGcpFunctionsRequestRate: {
            prefix: '$',
            suffix: '1M req'
        },
        calculateCostGcpFunctionsGbSecondRate: {
            prefix: '$',
            suffix: 'GB-s'
        },
        calculateCostGcpApiHttpFirstRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostGcpApiHttpNextRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostGcpApiRestRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostGcpEgressRate: {
            prefix: '$',
            suffix: 'GB'
        }
    };

    function buildInputAddon(text, position) {
        const addon = document.createElement('span');

        addon.className = `calculate-cost-gcp-input-addon calculate-cost-gcp-input-addon--${position}`;
        addon.textContent = text;

        return addon;
    }

    function decorateNumericInput(input, decorator) {
        if (!input || input.dataset.calculateCostGcpDecorated === '1') {
            return;
        }

        const parent = input.parentNode;
        const wrapper = document.createElement('div');

        if (!parent) {
            return;
        }

        wrapper.className = 'calculate-cost-gcp-input-group';
        input.classList.add('calculate-cost-gcp-input-group-control');
        input.dataset.calculateCostGcpDecorated = '1';

        parent.insertBefore(wrapper, input);

        if (decorator.prefix) {
            wrapper.appendChild(buildInputAddon(decorator.prefix, 'prefix'));
        }

        wrapper.appendChild(input);

        if (decorator.suffix) {
            wrapper.appendChild(buildInputAddon(decorator.suffix, 'suffix'));
        }
    }

    function initNumericInputGroups() {
        Object.entries(NUMERIC_INPUT_DECORATORS).forEach(([inputId, decorator]) => {
            decorateNumericInput(document.getElementById(inputId), decorator);
        });
    }

    function initMarkdownCopyButtons() {
        const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.calculate-cost-gcp-prompt-pre'));
        const promptCopyButtons = document.querySelectorAll('.calculate-cost-gcp-prompt-copy-btn');

        promptCopyButtons.forEach((button) => {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;
            const label = button.querySelector('span') || button;

            if (!code) {
                button.disabled = true;
                return;
            }

            if (button.dataset.calculateCostGcpCopyBound === '1') {
                return;
            }

            button.dataset.calculateCostGcpCopyBound = '1';

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

        const codeBlocks = document.querySelectorAll('.markdown-content pre:not(.calculate-cost-gcp-prompt-pre)');

        codeBlocks.forEach((pre) => {
            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            let button = pre.querySelector('.markdown-copy-btn');

            if (button && button.dataset.calculateCostGcpCopyBound === '1') {
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

            button.dataset.calculateCostGcpCopyBound = '1';

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

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function escapeJsonHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');
    }

    function highlightJsonText(text) {
        return escapeJsonHtml(text).replace(
            /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
                if (match.startsWith('"')) {
                    return `<span class="${match.endsWith(':') ? 'tool-json-key' : 'tool-json-string'}">${match}</span>`;
                }

                if (match === 'true' || match === 'false') {
                    return `<span class="tool-json-boolean">${match}</span>`;
                }

                if (match === 'null') {
                    return `<span class="tool-json-null">${match}</span>`;
                }

                return `<span class="tool-json-number">${match}</span>`;
            }
        );
    }

    function renderJsonOutput(payload) {
        jsonOutput.innerHTML = highlightJsonText(JSON.stringify(payload, null, 2));
    }

    function flashButton(button, text) {
        const label = button.querySelector('[data-button-label]');

        if (label) {
            const originalLabel = button.dataset.defaultLabel || label.textContent;
            button.dataset.defaultLabel = originalLabel;
            label.textContent = text;

            window.setTimeout(() => {
                label.textContent = originalLabel;
            }, 1400);
            return;
        }

        const originalText = button.dataset.defaultLabel || button.textContent;
        button.dataset.defaultLabel = originalText;
        button.textContent = text;

        window.setTimeout(() => {
            button.textContent = originalText;
        }, 1400);
    }

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

    function loadECharts() {
        if (window.echarts && typeof window.echarts.init === 'function') {
            return Promise.resolve(window.echarts);
        }

        if (!echartsPromise) {
            echartsPromise = new Promise((resolve) => {
                const existingScript = document.querySelector('script[data-calculate-cost-gcp-echarts]');

                if (existingScript) {
                    existingScript.addEventListener('load', () => resolve(window.echarts || null), { once: true });
                    existingScript.addEventListener('error', () => resolve(null), { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.src = ECHARTS_CDN_URL;
                script.async = true;
                script.dataset.calculateCostGcpEcharts = 'true';
                script.addEventListener('load', () => resolve(window.echarts || null), { once: true });
                script.addEventListener('error', () => resolve(null), { once: true });
                document.head.appendChild(script);
            });
        }

        return echartsPromise;
    }

    function destroySpendRingChart() {
        if (spendRingResizeHandler) {
            window.removeEventListener('resize', spendRingResizeHandler);
            spendRingResizeHandler = null;
        }

        if (spendRingChart) {
            spendRingChart.dispose();
            spendRingChart = null;
        }
    }

    function fallbackClipboardWriteText(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();

        const didCopy = document.execCommand('copy');
        textarea.remove();

        if (!didCopy) {
            throw new Error('Clipboard copy failed.');
        }
    }

    async function writeClipboardText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                fallbackClipboardWriteText(text);
                return;
            }
        }

        fallbackClipboardWriteText(text);
    }

    async function copyText(text, button) {
        try {
            await writeClipboardText(text);
            flashCopyButton(button, 'copied');
        } catch (error) {
            flashCopyButton(button, 'failed');
        }
    }

    function downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(objectUrl);
    }

    function exportResultShellAsPdf(filenameStem, container) {
        const exportWindow = window.open('', '_blank', 'noopener,noreferrer');

        if (!exportWindow || !container) {
            window.print();
            return;
        }

        const styles = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], style'))
            .map((node) => node.outerHTML)
            .join('\n');

        exportWindow.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${filenameStem}</title>${styles}</head><body>${container.outerHTML}</body></html>`);
        exportWindow.document.close();
        exportWindow.focus();
        window.setTimeout(() => exportWindow.print(), 250);
    }

    function slugify(value) {
        return String(value || 'gcp-cost-estimate')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'gcp-cost-estimate';
    }

    function normalizeNonNegativeNumber(value, fallbackValue) {
        const numericValue = Number(value);

        if (!Number.isFinite(numericValue) || numericValue < 0) {
            return fallbackValue;
        }

        return numericValue;
    }

    function normalizeOptionalRate(value) {
        const trimmedValue = String(value || '').trim();

        if (!trimmedValue) {
            return null;
        }

        const numericValue = Number(trimmedValue);

        if (!Number.isFinite(numericValue) || numericValue < 0) {
            return null;
        }

        return numericValue;
    }

    function formatCurrency(value) {
        const absoluteValue = Math.abs(Number(value || 0));
        const sign = Number(value || 0) < 0 ? '-' : '';

        return `${sign}$${absoluteValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }

    function formatRate(value, precision) {
        return `$${Number(value || 0).toLocaleString(undefined, {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
        })}`;
    }

    function formatPercent(value) {
        return `${Number(value || 0).toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        })}%`;
    }

    function formatNumber(value, precision) {
        return Number(value || 0).toLocaleString(undefined, {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
        });
    }

    function getSelectedSingleValue(inputs, fallbackValue) {
        const selectedInput = inputs.find((input) => input.checked);

        return selectedInput ? selectedInput.value : fallbackValue;
    }

    function setSelectedSingleValue(inputs, value) {
        inputs.forEach((input) => {
            input.checked = input.value === value;
        });
    }

    function getSelectSpaceContainer(selectElement) {
        return selectElement.closest('.calculate-cost-gcp-field-stack, .calculate-cost-gcp-toolbar-left, .calculate-cost-gcp-setting-field') || selectElement.parentElement;
    }

    function getDropdownBoundaryRect(element) {
        const boundaryElement = element
            ? element.closest('.calculate-cost-gcp-service-card, .calculate-cost-gcp-inner-panel, .calculate-cost-gcp-section-card, .tool-box')
            : null;

        if (boundaryElement) {
            return boundaryElement.getBoundingClientRect();
        }

        return {
            top: 0,
            bottom: window.innerHeight
        };
    }

    function clearSelectSpace(selectElement) {
        return;
    }

    function applySelectSpace(selectElement) {
        return;
    }

    function getSelectedSingleLabel(inputs, fallbackLabel) {
        const selectedInput = inputs.find((input) => input.checked);

        if (!selectedInput) {
            return fallbackLabel;
        }

        const labelElement = selectedInput.closest('.calculate-cost-gcp-select-card').querySelector('.calculate-cost-gcp-select-title');

        return labelElement ? labelElement.textContent.trim() : fallbackLabel;
    }

    function updateSingleSelectState(inputs, hiddenInput, summaryElement, detailsElement) {
        const selectedInput = inputs.find((input) => input.checked);

        if (selectedInput) {
            hiddenInput.value = selectedInput.value;
            summaryElement.textContent = getSelectedSingleLabel(inputs, summaryElement.textContent.trim());
        }

        if (detailsElement) {
            detailsElement.removeAttribute('open');
            clearSelectSpace(detailsElement);
        }
    }

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

    function setResultState() {
        resultEmpty.classList.add('d-none');
        resultError.classList.add('d-none');
        resultContent.classList.remove('d-none');
    }

    function toggleSubmitState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.textContent = 'Estimating...';
            return;
        }

        submitButton.disabled = false;
        submitButton.textContent = 'Estimate';
    }

    function buildQuery() {
        return {
            label: String(labelInput.value || '').trim() || 'Google Cloud cost estimate',
            preset: presetInput.value,
            includeCompute: Boolean(includeComputeInput.checked),
            includeDisk: Boolean(includeDiskInput.checked),
            includeBlob: Boolean(includeBlobInput.checked),
            includeFunctions: Boolean(includeFunctionsInput.checked),
            includeApi: Boolean(includeApiInput.checked),
            computeInstance: computeInstanceInput.value,
            computeCustomLabel: String(computeCustomLabelInput.value || '').trim(),
            computeCustomVcpu: normalizeNonNegativeNumber(computeCustomVcpuInput.value, 0),
            computeCustomMemoryGiB: normalizeNonNegativeNumber(computeCustomMemoryGiBInput.value, 0),
            computePurchase: computePurchaseInput.value,
            computeCount: Math.round(normalizeNonNegativeNumber(computeCountInput.value, 0)),
            computeHours: normalizeNonNegativeNumber(computeHoursInput.value, 0),
            diskStorageGb: normalizeNonNegativeNumber(diskStorageGbInput.value, 0),
            diskIops: normalizeNonNegativeNumber(diskIopsInput.value, 0),
            diskThroughput: normalizeNonNegativeNumber(diskThroughputInput.value, 0),
            blobStorageGb: normalizeNonNegativeNumber(blobStorageGbInput.value, 0),
            blobEgressGb: normalizeNonNegativeNumber(blobEgressGbInput.value, 0),
            blobGetRequestsK: normalizeNonNegativeNumber(blobGetRequestsKInput.value, 0),
            blobPutRequestsK: normalizeNonNegativeNumber(blobPutRequestsKInput.value, 0),
            functionsRequestsMillion: normalizeNonNegativeNumber(functionsRequestsMillionInput.value, 0),
            functionsDurationMs: normalizeNonNegativeNumber(functionsDurationMsInput.value, 0),
            functionsMemoryMb: Math.max(128, Math.round(normalizeNonNegativeNumber(functionsMemoryMbInput.value, 128))),
            apiType: apiTypeInput.value,
            apiRequestsMillion: normalizeNonNegativeNumber(apiRequestsMillionInput.value, 0),
            apiResponseKb: normalizeNonNegativeNumber(apiResponseKbInput.value, 0),
            sharedEgressGb: normalizeNonNegativeNumber(sharedEgressGbInput.value, 0),
            supportPct: normalizeNonNegativeNumber(supportPctInput.value, 0),
            contingencyPct: normalizeNonNegativeNumber(contingencyPctInput.value, 0),
            manualAdjustment: Number(manualAdjustmentInput.value || 0),
            freeTierFunctions: Boolean(freeTierFunctionsInput.checked),
            freeTierApi: Boolean(freeTierApiInput.checked),
            freeTierEgress: Boolean(freeTierEgressInput.checked),
            regionalUpliftPct: normalizeNonNegativeNumber(regionalUpliftPctInput.value, 0),
            overrides: {
                computeHourly: normalizeOptionalRate(computeHourlyOverrideInput.value),
                diskStorage: normalizeOptionalRate(diskStorageRateInput.value),
                diskIops: normalizeOptionalRate(diskIopsRateInput.value),
                diskThroughput: normalizeOptionalRate(diskThroughputRateInput.value),
                blobStorage: normalizeOptionalRate(blobStorageRateInput.value),
                blobGetPer1k: normalizeOptionalRate(blobGetRateInput.value),
                blobPutPer1k: normalizeOptionalRate(blobPutRateInput.value),
                functionsRequestsPerMillion: normalizeOptionalRate(functionsRequestRateInput.value),
                functionsGbSecond: normalizeOptionalRate(functionsGbSecondRateInput.value),
                apiHttpFirstPerMillion: normalizeOptionalRate(apiHttpFirstRateInput.value),
                apiHttpNextPerMillion: normalizeOptionalRate(apiHttpNextRateInput.value),
                apiRestPerMillion: normalizeOptionalRate(apiRestRateInput.value),
                egressPerGb: normalizeOptionalRate(egressRateInput.value)
            }
        };
    }

    function validateQuery(query) {
        if (!PRESETS[query.preset]) {
            return 'Choose a supported preset.';
        }

        if (query.includeCompute) {
            if (query.computeInstance === 'custom') {
                if (query.computeCustomVcpu <= 0 || query.computeCustomMemoryGiB <= 0) {
                    return 'Set custom VM vCPU and memory when using Custom size.';
                }

                if (query.overrides.computeHourly === null) {
                    return 'Set Machine hourly override in Advanced when using Custom size.';
                }
            } else if (!COMPUTE_CATALOG[query.computeInstance]) {
                return 'Choose a supported Machine profile.';
            }

            if (!PURCHASE_MODE_LABELS[query.computePurchase]) {
                return 'Choose a supported VM purchase model.';
            }
        }

        if (!['http', 'rest'].includes(query.apiType)) {
            return 'Choose a supported API Gateway type.';
        }

        if (!Number.isFinite(query.manualAdjustment)) {
            return 'Enter a valid manual adjustment value.';
        }

        const hasActiveServiceUsage = (
            (query.includeCompute && query.computeCount > 0 && query.computeHours > 0) ||
            (query.includeDisk && query.diskStorageGb > 0) ||
            (query.includeBlob && (query.blobStorageGb > 0 || query.blobEgressGb > 0 || query.blobGetRequestsK > 0 || query.blobPutRequestsK > 0)) ||
            (query.includeFunctions && query.functionsRequestsMillion > 0) ||
            (query.includeApi && query.apiRequestsMillion > 0) ||
            query.sharedEgressGb > 0 ||
            query.manualAdjustment !== 0
        );

        if (!hasActiveServiceUsage) {
            return 'Add at least one priced workload input before estimating.';
        }

        return '';
    }

    function getImportedQuery(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('Import a JSON object exported by this calculator.');
        }

        if (payload.inputs && typeof payload.inputs === 'object' && !Array.isArray(payload.inputs)) {
            return payload.inputs;
        }

        if (payload.query && typeof payload.query === 'object' && !Array.isArray(payload.query)) {
            return payload.query;
        }

        throw new Error('Imported JSON must include an inputs object.');
    }

    function getFiniteValue(value, fallbackValue) {
        const parsedValue = Number(value);

        return Number.isFinite(parsedValue) ? parsedValue : fallbackValue;
    }

    function getBooleanValue(value, fallbackValue) {
        return typeof value === 'boolean' ? value : fallbackValue;
    }

    function setNumberInputValue(input, value, fallbackValue) {
        input.value = String(getFiniteValue(value, fallbackValue));
    }

    function setOptionalRateInputValue(input, value) {
        const parsedValue = Number(value);
        input.value = Number.isFinite(parsedValue) && parsedValue >= 0 ? String(parsedValue) : '';
    }

    function setImportedSingleSelect(inputs, hiddenInput, summaryElement, value) {
        hiddenInput.value = value;
        setSelectedSingleValue(inputs, value);
        updateSingleSelectState(inputs, hiddenInput, summaryElement, null);
    }

    function resetResultSort() {
        setImportedSingleSelect(sortOptionInputs, sortInput, sortSummary, 'id');
    }

    function applyImportedQuery(importedQuery) {
        const presetKey = PRESETS[importedQuery.preset] ? importedQuery.preset : 'lean-web';
        const preset = PRESETS[presetKey];
        const overrides = importedQuery.overrides && typeof importedQuery.overrides === 'object'
            ? importedQuery.overrides
            : {};
        const computeInstance = importedQuery.computeInstance === 'custom' || COMPUTE_CATALOG[importedQuery.computeInstance]
            ? importedQuery.computeInstance
            : preset.computeInstance;
        const computePurchase = PURCHASE_MODE_LABELS[importedQuery.computePurchase]
            ? importedQuery.computePurchase
            : preset.computePurchase;
        const apiType = ['http', 'rest'].includes(importedQuery.apiType)
            ? importedQuery.apiType
            : preset.apiType;

        applyPreset(presetKey);

        labelInput.value = String(importedQuery.label || preset.label || 'Google Cloud cost estimate').trim() || 'Google Cloud cost estimate';
        setImportedSingleSelect(presetOptionInputs, presetInput, presetSummary, presetKey);

        includeComputeInput.checked = getBooleanValue(importedQuery.includeCompute, preset.includeCompute);
        includeDiskInput.checked = getBooleanValue(importedQuery.includeDisk, preset.includeDisk);
        includeBlobInput.checked = getBooleanValue(importedQuery.includeBlob, preset.includeBlob);
        includeFunctionsInput.checked = getBooleanValue(importedQuery.includeFunctions, preset.includeFunctions);
        includeApiInput.checked = getBooleanValue(importedQuery.includeApi, preset.includeApi);

        computeCustomLabelInput.value = String(importedQuery.computeCustomLabel || '').trim();
        setNumberInputValue(computeCustomVcpuInput, importedQuery.computeCustomVcpu, 4);
        setNumberInputValue(computeCustomMemoryGiBInput, importedQuery.computeCustomMemoryGiB, 16);
        setImportedSingleSelect(computeInstanceOptionInputs, computeInstanceInput, computeInstanceSummary, computeInstance);
        setImportedSingleSelect(computePurchaseOptionInputs, computePurchaseInput, computePurchaseSummary, computePurchase);
        setNumberInputValue(computeCountInput, importedQuery.computeCount, preset.computeCount);
        setNumberInputValue(computeHoursInput, importedQuery.computeHours, preset.computeHours);

        setNumberInputValue(diskStorageGbInput, importedQuery.diskStorageGb, preset.diskStorageGb);
        setNumberInputValue(diskIopsInput, importedQuery.diskIops, preset.diskIops);
        setNumberInputValue(diskThroughputInput, importedQuery.diskThroughput, preset.diskThroughput);

        setNumberInputValue(blobStorageGbInput, importedQuery.blobStorageGb, preset.blobStorageGb);
        setNumberInputValue(blobEgressGbInput, importedQuery.blobEgressGb, preset.blobEgressGb);
        setNumberInputValue(blobGetRequestsKInput, importedQuery.blobGetRequestsK, preset.blobGetRequestsK);
        setNumberInputValue(blobPutRequestsKInput, importedQuery.blobPutRequestsK, preset.blobPutRequestsK);

        setNumberInputValue(functionsRequestsMillionInput, importedQuery.functionsRequestsMillion, preset.functionsRequestsMillion);
        setNumberInputValue(functionsDurationMsInput, importedQuery.functionsDurationMs, preset.functionsDurationMs);
        setNumberInputValue(functionsMemoryMbInput, importedQuery.functionsMemoryMb, preset.functionsMemoryMb);

        setImportedSingleSelect(apiTypeOptionInputs, apiTypeInput, apiTypeSummary, apiType);
        setNumberInputValue(apiRequestsMillionInput, importedQuery.apiRequestsMillion, preset.apiRequestsMillion);
        setNumberInputValue(apiResponseKbInput, importedQuery.apiResponseKb, preset.apiResponseKb);

        setNumberInputValue(sharedEgressGbInput, importedQuery.sharedEgressGb, preset.sharedEgressGb);
        setNumberInputValue(supportPctInput, importedQuery.supportPct, preset.supportPct);
        setNumberInputValue(contingencyPctInput, importedQuery.contingencyPct, preset.contingencyPct);
        setNumberInputValue(manualAdjustmentInput, importedQuery.manualAdjustment, preset.manualAdjustment);

        freeTierFunctionsInput.checked = getBooleanValue(importedQuery.freeTierFunctions, preset.freeTierFunctions);
        freeTierApiInput.checked = getBooleanValue(importedQuery.freeTierApi, preset.freeTierApi);
        freeTierEgressInput.checked = getBooleanValue(importedQuery.freeTierEgress, preset.freeTierEgress);
        setNumberInputValue(regionalUpliftPctInput, importedQuery.regionalUpliftPct, preset.regionalUpliftPct);

        setOptionalRateInputValue(computeHourlyOverrideInput, overrides.computeHourly);
        setOptionalRateInputValue(diskStorageRateInput, overrides.diskStorage);
        setOptionalRateInputValue(diskIopsRateInput, overrides.diskIops);
        setOptionalRateInputValue(diskThroughputRateInput, overrides.diskThroughput);
        setOptionalRateInputValue(blobStorageRateInput, overrides.blobStorage);
        setOptionalRateInputValue(blobGetRateInput, overrides.blobGetPer1k);
        setOptionalRateInputValue(blobPutRateInput, overrides.blobPutPer1k);
        setOptionalRateInputValue(functionsRequestRateInput, overrides.functionsRequestsPerMillion);
        setOptionalRateInputValue(functionsGbSecondRateInput, overrides.functionsGbSecond);
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

    function applyPreset(presetKey) {
        const preset = PRESETS[presetKey] || PRESETS['lean-web'];

        labelInput.value = preset.label;
        presetInput.value = presetKey;
        setSelectedSingleValue(presetOptionInputs, presetKey);
        updateSingleSelectState(presetOptionInputs, presetInput, presetSummary, presetSelect);

        includeComputeInput.checked = preset.includeCompute;
        includeDiskInput.checked = preset.includeDisk;
        includeBlobInput.checked = preset.includeBlob;
        includeFunctionsInput.checked = preset.includeFunctions;
        includeApiInput.checked = preset.includeApi;

        computeInstanceInput.value = preset.computeInstance;
        computeCustomLabelInput.value = '';
        computeCustomVcpuInput.value = 4;
        computeCustomMemoryGiBInput.value = 16;
        computePurchaseInput.value = preset.computePurchase;
        setSelectedSingleValue(computeInstanceOptionInputs, preset.computeInstance);
        setSelectedSingleValue(computePurchaseOptionInputs, preset.computePurchase);
        updateCustomInstanceLabel();
        updateSingleSelectState(computeInstanceOptionInputs, computeInstanceInput, computeInstanceSummary, computeInstanceSelect);
        updateSingleSelectState(computePurchaseOptionInputs, computePurchaseInput, computePurchaseSummary, computePurchaseSelect);
        computeCountInput.value = preset.computeCount;
        computeHoursInput.value = preset.computeHours;

        diskStorageGbInput.value = preset.diskStorageGb;
        diskIopsInput.value = preset.diskIops;
        diskThroughputInput.value = preset.diskThroughput;

        blobStorageGbInput.value = preset.blobStorageGb;
        blobEgressGbInput.value = preset.blobEgressGb;
        blobGetRequestsKInput.value = preset.blobGetRequestsK;
        blobPutRequestsKInput.value = preset.blobPutRequestsK;

        functionsRequestsMillionInput.value = preset.functionsRequestsMillion;
        functionsDurationMsInput.value = preset.functionsDurationMs;
        functionsMemoryMbInput.value = preset.functionsMemoryMb;

        apiTypeInput.value = preset.apiType;
        setSelectedSingleValue(apiTypeOptionInputs, preset.apiType);
        updateSingleSelectState(apiTypeOptionInputs, apiTypeInput, apiTypeSummary, apiTypeSelect);
        apiRequestsMillionInput.value = preset.apiRequestsMillion;
        apiResponseKbInput.value = preset.apiResponseKb;

        sharedEgressGbInput.value = preset.sharedEgressGb;
        supportPctInput.value = preset.supportPct;
        contingencyPctInput.value = preset.contingencyPct;
        manualAdjustmentInput.value = preset.manualAdjustment;

        freeTierFunctionsInput.checked = preset.freeTierFunctions;
        freeTierApiInput.checked = preset.freeTierApi;
        freeTierEgressInput.checked = preset.freeTierEgress;
        regionalUpliftPctInput.value = preset.regionalUpliftPct;

        computeHourlyOverrideInput.value = '';
        diskStorageRateInput.value = '';
        diskIopsRateInput.value = '';
        diskThroughputRateInput.value = '';
        blobStorageRateInput.value = '';
        blobGetRateInput.value = '';
        blobPutRateInput.value = '';
        functionsRequestRateInput.value = '';
        functionsGbSecondRateInput.value = '';
        apiHttpFirstRateInput.value = '';
        apiHttpNextRateInput.value = '';
        apiRestRateInput.value = '';
        egressRateInput.value = '';

        syncServiceState();
    }

    function updateCustomInstanceLabel() {
        const customVcpu = Math.max(0, normalizeNonNegativeNumber(computeCustomVcpuInput.value, 0));
        const customMemoryGiB = Math.max(0, normalizeNonNegativeNumber(computeCustomMemoryGiBInput.value, 0));
        const customLabel = String(computeCustomLabelInput.value || '').trim();
        const sizeLabel = customVcpu > 0 && customMemoryGiB > 0
            ? `${formatNumber(customVcpu, 0)} vCPU - ${formatNumber(customMemoryGiB, customMemoryGiB % 1 === 0 ? 0 : 1)} GiB`
            : 'user defined';

        computeCustomOptionLabel.textContent = customLabel
            ? `${customLabel} - ${sizeLabel}`
            : `Custom size - ${sizeLabel}`;
    }

    function syncCustomInstanceState() {
        const isCustomInstance = computeInstanceInput.value === 'custom' && includeComputeInput.checked;

        computeCustomFields.classList.toggle('d-none', !isCustomInstance);
        computeCustomHint.classList.toggle('d-none', !isCustomInstance);

        [computeCustomLabelInput, computeCustomVcpuInput, computeCustomMemoryGiBInput].forEach((input) => {
            input.disabled = !isCustomInstance;
        });
    }

    function syncServiceState() {
        Object.values(serviceRefs).forEach((serviceRef) => {
            const enabled = serviceRef.checkbox.checked;

            serviceRef.card.classList.toggle('is-disabled', !enabled);

            Array.from(serviceRef.body.querySelectorAll('input, textarea, button')).forEach((element) => {
                element.disabled = !enabled;
            });

            Array.from(serviceRef.body.querySelectorAll('.calculate-cost-gcp-select')).forEach((selectElement) => {
                selectElement.classList.toggle('is-disabled', !enabled);

                if (!enabled) {
                    selectElement.removeAttribute('open');
                }
            });
        });

        syncCustomInstanceState();
    }

    function resolveRate(defaultRate, overrideRate, regionalUpliftPct) {
        if (overrideRate !== null) {
            return {
                value: overrideRate,
                source: 'Manual override',
                override: true
            };
        }

        const upliftMultiplier = 1 + (regionalUpliftPct / 100);

        return {
            value: defaultRate * upliftMultiplier,
            source: regionalUpliftPct > 0
                ? `Starter rate + ${formatPercent(regionalUpliftPct)} uplift`
                : 'Starter rate',
            override: false
        };
    }

    function calculateCompute(query, assumptions) {
        if (!query.includeCompute || query.computeCount <= 0 || query.computeHours <= 0) {
            assumptions.push({
                name: 'VM pricing basis',
                value: 'Disabled',
                note: 'No Compute runtime cost is included in this estimate.'
            });

            return {
                lineItems: []
            };
        }

        const instance = query.computeInstance === 'custom'
            ? {
                label: query.computeCustomLabel || 'Custom instance',
                family: 'User-defined profile',
                vcpu: query.computeCustomVcpu,
                memoryGiB: query.computeCustomMemoryGiB,
                rates: {
                    onDemand: query.overrides.computeHourly,
                    spot: query.overrides.computeHourly,
                    savings1: query.overrides.computeHourly,
                    savings3: query.overrides.computeHourly,
                    reserved1: query.overrides.computeHourly,
                    reserved3: query.overrides.computeHourly
                }
            }
            : COMPUTE_CATALOG[query.computeInstance];
        const resolvedRate = resolveRate(instance.rates[query.computePurchase], query.overrides.computeHourly, query.regionalUpliftPct);
        const monthlyCost = resolvedRate.value * query.computeCount * query.computeHours;

        assumptions.push({
            name: 'VM pricing basis',
            value: `${instance.label} - ${PURCHASE_MODE_LABELS[query.computePurchase]}`,
            note: `${resolvedRate.source}. ${instance.vcpu} vCPU, ${instance.memoryGiB} GiB memory.${query.computeInstance === 'custom' ? ' Custom size is priced from the Machine hourly override.' : ''}`
        });

        return {
            lineItems: [
                {
                    service: 'Compute Engine',
                    component: `${instance.label} ${PURCHASE_MODE_LABELS[query.computePurchase]}`,
                    usage: `${query.computeCount} instance(s) x ${formatNumber(query.computeHours, 0)} h`,
                    unitBasis: `${formatRate(resolvedRate.value, 4)} / instance-hour`,
                    monthly: monthlyCost,
                    annual: monthlyCost * 12,
                    copyValue: `${instance.label} ${PURCHASE_MODE_LABELS[query.computePurchase]} | ${query.computeCount} instances | ${query.computeHours} hours | ${formatCurrency(monthlyCost)}`
                }
            ]
        };
    }

    function calculateDisk(query, assumptions) {
        if (!query.includeDisk || query.diskStorageGb <= 0) {
            assumptions.push({
                name: 'Persistent Disk pricing basis',
                value: 'Disabled',
                note: 'No Persistent Disk volume storage cost is included in this estimate.'
            });

            return {
                lineItems: []
            };
        }

        const storageRate = resolveRate(STARTER_RATES.diskStorage, query.overrides.diskStorage, query.regionalUpliftPct);
        const iopsRate = resolveRate(STARTER_RATES.diskIops, query.overrides.diskIops, query.regionalUpliftPct);
        const throughputRate = resolveRate(STARTER_RATES.diskThroughput, query.overrides.diskThroughput, query.regionalUpliftPct);

        const additionalIops = Math.max(0, query.diskIops - 3000);
        const additionalThroughput = Math.max(0, query.diskThroughput - 125);
        const storageCost = query.diskStorageGb * storageRate.value;
        const iopsCost = additionalIops * iopsRate.value;
        const throughputCost = additionalThroughput * throughputRate.value;

        assumptions.push({
            name: 'Persistent Disk pricing basis',
            value: 'Managed disk starter model',
            note: `Baseline 3000 IOPS and 125 MB/s included. Storage ${storageRate.source}, IOPS ${iopsRate.source}, throughput ${throughputRate.source}.`
        });

        return {
            lineItems: [
                {
                    service: 'Persistent Disk',
                    component: 'persistent disk storage',
                    usage: `${formatNumber(query.diskStorageGb, 0)} GB provisioned`,
                    unitBasis: `${formatRate(storageRate.value, 4)} / GB-month`,
                    monthly: storageCost,
                    annual: storageCost * 12,
                    copyValue: `Persistent Disk storage | ${query.diskStorageGb} GB | ${formatCurrency(storageCost)}`
                },
                {
                    service: 'Persistent Disk',
                    component: 'Additional disk IOPS',
                    usage: `${formatNumber(additionalIops, 0)} billable IOPS`,
                    unitBasis: `${formatRate(iopsRate.value, 4)} / IOPS-month`,
                    monthly: iopsCost,
                    annual: iopsCost * 12,
                    copyValue: `Persistent Disk additional IOPS | ${additionalIops} billable IOPS | ${formatCurrency(iopsCost)}`
                },
                {
                    service: 'Persistent Disk',
                    component: 'Additional disk throughput',
                    usage: `${formatNumber(additionalThroughput, 0)} billable MB/s`,
                    unitBasis: `${formatRate(throughputRate.value, 4)} / MB/s-month`,
                    monthly: throughputCost,
                    annual: throughputCost * 12,
                    copyValue: `Persistent Disk additional throughput | ${additionalThroughput} MB/s | ${formatCurrency(throughputCost)}`
                }
            ].filter((item) => item.monthly > 0)
        };
    }

    function calculateBlob(query, assumptions) {
        if (
            !query.includeBlob ||
            (query.blobStorageGb <= 0 && query.blobGetRequestsK <= 0 && query.blobPutRequestsK <= 0 && query.blobEgressGb <= 0)
        ) {
            assumptions.push({
                name: 'Cloud Storage pricing basis',
                value: 'Disabled',
                note: 'No Cloud Storage storage or request cost is included in this estimate.'
            });

            return {
                lineItems: [],
                egressGb: 0
            };
        }

        const storageRate = resolveRate(STARTER_RATES.blobStorage, query.overrides.blobStorage, query.regionalUpliftPct);
        const getRate = resolveRate(STARTER_RATES.blobGetPer1k, query.overrides.blobGetPer1k, query.regionalUpliftPct);
        const putRate = resolveRate(STARTER_RATES.blobPutPer1k, query.overrides.blobPutPer1k, query.regionalUpliftPct);

        const storageCost = query.blobStorageGb * storageRate.value;
        const getCost = query.blobGetRequestsK * getRate.value;
        const putCost = query.blobPutRequestsK * putRate.value;

        assumptions.push({
            name: 'Cloud Storage pricing basis',
            value: 'Cloud Storage starter model',
            note: `Storage ${storageRate.source}. Request rates use editable starter assumptions for GET and PUT/LIST activity.`
        });

        return {
            lineItems: [
                {
                    service: 'Cloud Storage',
                    component: 'Standard storage',
                    usage: `${formatNumber(query.blobStorageGb, 0)} GB stored`,
                    unitBasis: `${formatRate(storageRate.value, 4)} / GB-month`,
                    monthly: storageCost,
                    annual: storageCost * 12,
                    copyValue: `Cloud Storage | ${query.blobStorageGb} GB | ${formatCurrency(storageCost)}`
                },
                {
                    service: 'Cloud Storage',
                    component: 'GET requests',
                    usage: `${formatNumber(query.blobGetRequestsK, 0)} x 1k requests`,
                    unitBasis: `${formatRate(getRate.value, 4)} / 1k requests`,
                    monthly: getCost,
                    annual: getCost * 12,
                    copyValue: `Cloud Storage GET requests | ${query.blobGetRequestsK} x 1k | ${formatCurrency(getCost)}`
                },
                {
                    service: 'Cloud Storage',
                    component: 'PUT/LIST requests',
                    usage: `${formatNumber(query.blobPutRequestsK, 0)} x 1k requests`,
                    unitBasis: `${formatRate(putRate.value, 4)} / 1k requests`,
                    monthly: putCost,
                    annual: putCost * 12,
                    copyValue: `Cloud Storage PUT/LIST requests | ${query.blobPutRequestsK} x 1k | ${formatCurrency(putCost)}`
                }
            ].filter((item) => item.monthly > 0),
            egressGb: query.blobEgressGb
        };
    }

    function calculateFunctions(query, assumptions) {
        if (!query.includeFunctions || query.functionsRequestsMillion <= 0) {
            assumptions.push({
                name: 'Cloud Functions pricing basis',
                value: 'Disabled',
                note: 'No Cloud Functions request or duration cost is included in this estimate.'
            });

            return {
                lineItems: []
            };
        }

        const requestRate = resolveRate(STARTER_RATES.functionsRequestsPerMillion, query.overrides.functionsRequestsPerMillion, query.regionalUpliftPct);
        const gbSecondRate = resolveRate(STARTER_RATES.functionsGbSecond, query.overrides.functionsGbSecond, query.regionalUpliftPct);

        const requestCount = query.functionsRequestsMillion * 1000000;
        const totalComputeSeconds = requestCount * (query.functionsDurationMs / 1000);
        const totalGbSeconds = totalComputeSeconds * (query.functionsMemoryMb / 1024);
        const billableRequests = query.freeTierFunctions ? Math.max(0, requestCount - 1000000) : requestCount;
        const billableGbSeconds = query.freeTierFunctions ? Math.max(0, totalGbSeconds - 400000) : totalGbSeconds;
        const requestCost = (billableRequests / 1000000) * requestRate.value;
        const computeCost = billableGbSeconds * gbSecondRate.value;

        assumptions.push({
            name: 'Cloud Functions pricing basis',
            value: query.freeTierFunctions ? 'Starter rate with free tier' : 'Starter rate without free tier',
            note: `Request pricing ${requestRate.source}. Compute pricing ${gbSecondRate.source}. Memory set to ${formatNumber(query.functionsMemoryMb, 0)} MB.`
        });

        return {
            lineItems: [
                {
                    service: 'Cloud Functions',
                    component: 'Request charges',
                    usage: `${formatNumber(requestCount, 0)} requests (${formatNumber(billableRequests, 0)} billable)`,
                    unitBasis: `${formatRate(requestRate.value, 2)} / 1M requests`,
                    monthly: requestCost,
                    annual: requestCost * 12,
                    copyValue: `Cloud Functions requests | ${requestCount} requests | ${formatCurrency(requestCost)}`
                },
                {
                    service: 'Cloud Functions',
                    component: 'Compute duration',
                    usage: `${formatNumber(totalGbSeconds, 0)} GB-s (${formatNumber(billableGbSeconds, 0)} billable)`,
                    unitBasis: `${formatRate(gbSecondRate.value, 10)} / GB-s`,
                    monthly: computeCost,
                    annual: computeCost * 12,
                    copyValue: `Cloud Functions compute | ${formatNumber(totalGbSeconds, 0)} GB-s | ${formatCurrency(computeCost)}`
                }
            ].filter((item) => item.monthly > 0)
        };
    }

    function calculateApiManagement(query, assumptions) {
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
            value: query.apiType === 'http' ? 'Standard gateway starter model' : 'High-volume gateway starter model',
            note: query.apiType === 'http'
                ? `HTTP first-tier pricing ${httpFirstRate.source}; next-tier pricing ${httpNextRate.source}.`
                : `REST pricing ${restRate.source}.`
        });

        return {
            lineItems: [
                {
                    service: 'API Gateway',
                    component: query.apiType === 'http' ? 'Standard gateway calls' : 'High-volume gateway calls',
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

    function calculateNetwork(query, combinedEgressGb, assumptions) {
        const egressRate = resolveRate(STARTER_RATES.egressPerGb, query.overrides.egressPerGb, query.regionalUpliftPct);
        const billableEgressGb = query.freeTierEgress ? Math.max(0, combinedEgressGb - 100) : combinedEgressGb;
        const egressCost = billableEgressGb * egressRate.value;

        assumptions.push({
            name: 'Internet egress basis',
            value: query.freeTierEgress ? 'Shared 100 GB free tier applied' : 'No egress free tier applied',
            note: `${egressRate.source}. Egress includes Cloud Storage transfer out, API responses, and shared outbound traffic.`
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

    function calculateOverhead(query, modeledSubtotal, assumptions) {
        const supportCost = modeledSubtotal * (query.supportPct / 100);
        const contingencyBase = modeledSubtotal + supportCost;
        const contingencyCost = contingencyBase * (query.contingencyPct / 100);

        assumptions.push({
            name: 'Support uplift',
            value: formatPercent(query.supportPct),
            note: 'Applied to the modeled service subtotal before contingency.'
        });

        assumptions.push({
            name: 'Contingency buffer',
            value: formatPercent(query.contingencyPct),
            note: 'Applied after support uplift to leave room for model drift or growth.'
        });

        if (query.manualAdjustment !== 0) {
            assumptions.push({
                name: 'Manual adjustment',
                value: formatCurrency(query.manualAdjustment),
                note: 'Useful for credits, omitted services, or other monthly corrections.'
            });
        }

        return {
            lineItems: [
                {
                    service: 'Overhead',
                    component: 'Support uplift',
                    usage: `${formatPercent(query.supportPct)} of modeled subtotal`,
                    unitBasis: 'Percentage uplift',
                    monthly: supportCost,
                    annual: supportCost * 12,
                    copyValue: `Support uplift | ${formatPercent(query.supportPct)} | ${formatCurrency(supportCost)}`
                },
                {
                    service: 'Overhead',
                    component: 'Contingency buffer',
                    usage: `${formatPercent(query.contingencyPct)} of subtotal + support`,
                    unitBasis: 'Percentage uplift',
                    monthly: contingencyCost,
                    annual: contingencyCost * 12,
                    copyValue: `Contingency buffer | ${formatPercent(query.contingencyPct)} | ${formatCurrency(contingencyCost)}`
                },
                {
                    service: 'Overhead',
                    component: 'Manual adjustment',
                    usage: query.manualAdjustment < 0 ? 'Credit or offset' : 'Manual add-on',
                    unitBasis: 'Flat monthly amount',
                    monthly: query.manualAdjustment,
                    annual: query.manualAdjustment * 12,
                    copyValue: `Manual adjustment | ${formatCurrency(query.manualAdjustment)}`
                }
            ].filter((item) => item.monthly !== 0)
        };
    }

    function buildRecommendations(query, serviceRows, totals, combinedEgressGb, overridesUsed) {
        const recommendations = [];

        if (query.includeCompute && query.computePurchase === 'onDemand' && query.computeHours >= 500 && query.computeCount > 0) {
            recommendations.push({
                title: 'Steady Compute runtime',
                copy: 'Compute Engine are modeled as a steady workload on pay-as-you-go pricing. Compare that same shape against committed use or reserved coverage before anyone signs a budget with a brave face.'
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

        if (query.includeFunctions && query.functionsRequestsMillion >= 3 && query.functionsDurationMs >= 250) {
            recommendations.push({
                title: 'Cloud Functions compute is noticeable',
                copy: 'Duration-heavy Cloud Functions workloads can creep from elegant to expensive. Review memory sizing, cold-start behavior, and whether any request path belongs on a steadier service.'
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
                copy: 'You are using the bundled starter rates without manual overrides. That is fine for planning, but it is the moment to validate the expensive lines in Google Cloud pricing before the estimate becomes policy.'
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

    function groupServiceRows(lineItems, monthlyTotal) {
        const totalsByService = new Map();

        lineItems.forEach((item) => {
            const existingItem = totalsByService.get(item.service) || {
                service: item.service,
                monthly: 0,
                annual: 0
            };

            existingItem.monthly += item.monthly;
            existingItem.annual += item.annual;
            totalsByService.set(item.service, existingItem);
        });

        return Array.from(totalsByService.values())
            .sort((left, right) => right.monthly - left.monthly)
            .map((row) => {
                const sharePct = monthlyTotal !== 0 ? (row.monthly / monthlyTotal) * 100 : 0;
                let signal = 'Light';
                let signalClass = 'calculate-cost-gcp-signal-light';

                if (sharePct >= 40) {
                    signal = 'Heavy';
                    signalClass = 'calculate-cost-gcp-signal-heavy';
                } else if (sharePct >= 15) {
                    signal = 'Medium';
                    signalClass = 'calculate-cost-gcp-signal-medium';
                }

                return {
                    ...row,
                    sharePct,
                    signal,
                    signalClass,
                    copyValue: `${row.service} | ${formatCurrency(row.monthly)} monthly | ${formatPercent(sharePct)} share`
                };
            });
    }

    function buildEstimate(query) {
        const assumptions = [
            {
                name: 'Model basis',
                value: 'Google Cloud starter cost estimate',
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

        const computeResult = calculateCompute(query, assumptions);
        const diskResult = calculateDisk(query, assumptions);
        const blobResult = calculateBlob(query, assumptions);
        const functionsResult = calculateFunctions(query, assumptions);
        const apiResult = calculateApiManagement(query, assumptions);

        const combinedEgressGb = query.sharedEgressGb + blobResult.egressGb + apiResult.egressGb;
        const networkResult = calculateNetwork(query, combinedEgressGb, assumptions);

        const modeledLineItems = [
            ...computeResult.lineItems,
            ...diskResult.lineItems,
            ...blobResult.lineItems,
            ...functionsResult.lineItems,
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

    function getOverrideCount(query) {
        return Object.values(query.overrides).filter((value) => value !== null).length;
    }

    function getRunRateRingPercent(monthlyTotal) {
        if (monthlyTotal <= 0) {
            return 0;
        }

        return Math.max(14, Math.min(92, Math.round((monthlyTotal / 500) * 100)));
    }

    function renderSpendRingChart(result) {
        const chartElement = document.getElementById('calculateCostGcpSpendChart');
        const ringElement = document.getElementById('calculateCostGcpSpendRing');

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
                                    { offset: 0, color: '#d2e3fc' },
                                    { offset: 0.46, color: '#4285f4' },
                                    { offset: 1, color: '#34a853' }
                                ]),
                                shadowBlur: 14,
                                shadowColor: 'rgba(66, 133, 244, 0.26)'
                            }
                        },
                        axisLine: {
                            roundCap: true,
                            lineStyle: {
                                width: 15,
                                color: [[1, 'rgba(232, 240, 254, 0.98)']]
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

    function buildSummaryHtml(result) {
        const presetLabel = getSelectedSingleLabel(presetOptionInputs, presetSummary.textContent.trim());
        const generatedAt = new Date(result.generatedAt);
        const generatedAtText = Number.isNaN(generatedAt.getTime()) ? 'Just now' : generatedAt.toLocaleString();
        const overrideCount = getOverrideCount(result.query);
        const progressAngle = Math.round(getRunRateRingPercent(result.totals.monthlyTotal) * 3.6);

        return `
            <section class="calculate-cost-gcp-overview" aria-live="polite">
                <article class="calculate-cost-gcp-spend-card">
                    <div class="calculate-cost-gcp-spend-ring" id="calculateCostGcpSpendRing" style="--progress-angle: ${escapeHtml(String(progressAngle))}deg;" aria-label="Estimated monthly Google Cloud run rate ${escapeHtml(formatCurrency(result.totals.monthlyTotal))}">
                        <div class="calculate-cost-gcp-spend-chart" id="calculateCostGcpSpendChart" aria-hidden="true"></div>
                        <div class="calculate-cost-gcp-spend-value">
                            <strong>${escapeHtml(formatCurrency(result.totals.monthlyTotal))}</strong>
                            <span>Monthly</span>
                        </div>
                    </div>
                    <h3 class="calculate-cost-gcp-spend-label">Estimated Google Cloud run rate</h3>
                    <p class="calculate-cost-gcp-spend-copy">Built from current workload assumptions, not from your billing account. The math is visible so the argument can be too.</p>
                </article>

                <section class="calculate-cost-gcp-summary-panel" aria-label="Google Cloud estimate summary">
                    <div class="calculate-cost-gcp-badge-row">
                        <span class="calculate-cost-gcp-badge">${escapeHtml(presetLabel)}</span>
                        <span class="calculate-cost-gcp-badge">Services ${escapeHtml(String(result.totals.activeServices))}</span>
                        <span class="calculate-cost-gcp-badge">Overrides ${escapeHtml(String(overrideCount))}</span>
                        <span class="calculate-cost-gcp-badge calculate-cost-gcp-badge-muted">Updated ${escapeHtml(generatedAtText)}</span>
                    </div>

                    <div class="calculate-cost-gcp-summary-route">
                        <span class="calculate-cost-gcp-summary-route-label">Top driver</span>
                        <span class="calculate-cost-gcp-summary-route-value">${escapeHtml(result.totals.topDriver)}</span>
                    </div>

                    <div class="calculate-cost-gcp-stat-grid">
                        <div class="calculate-cost-gcp-stat-card">
                            <span class="calculate-cost-gcp-stat-label">Annual</span>
                            <span class="calculate-cost-gcp-stat-value">${escapeHtml(formatCurrency(result.totals.annualTotal))}</span>
                            <span class="calculate-cost-gcp-stat-note">Projected from the current monthly run rate.</span>
                        </div>

                        <div class="calculate-cost-gcp-stat-card">
                            <span class="calculate-cost-gcp-stat-label">Daily</span>
                            <span class="calculate-cost-gcp-stat-value">${escapeHtml(formatCurrency(result.totals.dailyTotal))}</span>
                            <span class="calculate-cost-gcp-stat-note">Thirty-day planning average.</span>
                        </div>

                        <div class="calculate-cost-gcp-stat-card">
                            <span class="calculate-cost-gcp-stat-label">Hourly</span>
                            <span class="calculate-cost-gcp-stat-value">${escapeHtml(formatCurrency(result.totals.hourlyTotal))}</span>
                            <span class="calculate-cost-gcp-stat-note">Useful for sanity-checking long-running workloads.</span>
                        </div>

                        <div class="calculate-cost-gcp-stat-card">
                            <span class="calculate-cost-gcp-stat-label">Egress</span>
                            <span class="calculate-cost-gcp-stat-value">${escapeHtml(formatNumber(result.totals.combinedEgressGb, 1))} GB</span>
                            <span class="calculate-cost-gcp-stat-note">Combined Cloud Storage, API response, and shared outbound traffic.</span>
                        </div>
                    </div>
                </section>
            </section>
        `;
    }

    function buildBreakdownRow(item, index) {
        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td>${escapeHtml(item.service)}</td>
                <td>${escapeHtml(item.component)}</td>
                <td>${escapeHtml(item.usage)}</td>
                <td>${escapeHtml(item.unitBasis)}</td>
                <td class="calculate-cost-gcp-currency">${escapeHtml(formatCurrency(item.monthly))}</td>
                <td class="calculate-cost-gcp-currency">${escapeHtml(formatCurrency(item.annual))}</td>
                <td class="calculate-cost-gcp-copy-cell">
                    <button type="button" class="calculate-cost-gcp-copy-btn" data-copy="${escapeHtml(item.copyValue)}" aria-label="Copy breakdown row ${index + 1}" title="Copy row">
                        <i class="bi bi-clipboard" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    function buildServiceRow(row, index) {
        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td>${escapeHtml(row.service)}</td>
                <td class="calculate-cost-gcp-currency">${escapeHtml(formatCurrency(row.monthly))}</td>
                <td class="calculate-cost-gcp-currency">${escapeHtml(formatCurrency(row.annual))}</td>
                <td>${escapeHtml(formatPercent(row.sharePct))}</td>
                <td><span class="calculate-cost-gcp-signal ${escapeHtml(row.signalClass)}">${escapeHtml(row.signal)}</span></td>
                <td class="calculate-cost-gcp-copy-cell">
                    <button type="button" class="calculate-cost-gcp-copy-btn" data-copy="${escapeHtml(row.copyValue)}" aria-label="Copy service mix row ${index + 1}" title="Copy row">
                        <i class="bi bi-clipboard" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    function buildAssumptionRow(row, index) {
        return `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td>${escapeHtml(row.name)}</td>
                <td>${escapeHtml(row.value)}</td>
                <td>${escapeHtml(row.note)}</td>
                <td class="calculate-cost-gcp-copy-cell">
                    <button type="button" class="calculate-cost-gcp-copy-btn" data-copy="${escapeHtml(`${row.name}: ${row.value}`)}" aria-label="Copy assumption row ${index + 1}" title="Copy row">
                        <i class="bi bi-clipboard" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    function buildRecommendationsHtml(recommendations) {
        return recommendations.map((recommendation) => `
            <section class="calculate-cost-gcp-recommendation-card">
                <span class="calculate-cost-gcp-basis-label">Recommendation</span>
                <strong>${escapeHtml(recommendation.title)}</strong>
                <span class="calculate-cost-gcp-recommendation-copy">${escapeHtml(recommendation.copy)}</span>
            </section>
        `).join('');
    }

    function buildMethodologyHtml(result) {
        return `
            <section class="calculate-cost-gcp-method-card">
                <span class="calculate-cost-gcp-method-label">Model Scope</span>
                <span class="calculate-cost-gcp-method-title">Included spend drivers</span>
                <span class="calculate-cost-gcp-method-copy">This model covers Compute Engine, Persistent Disk, Cloud Storage, Cloud Functions, API Gateway, combined internet egress, support uplift, contingency, and any manual monthly adjustment you applied.</span>
            </section>
            <section class="calculate-cost-gcp-method-card">
                <span class="calculate-cost-gcp-method-label">Model Gaps</span>
                <span class="calculate-cost-gcp-method-title">What is not priced automatically</span>
                <span class="calculate-cost-gcp-method-copy">Taxes, Google Cloud Front Door or CDN, NAT Gateway, load balancers, managed databases, observability, backups, support plan minimums, and private discount agreements are not automatically derived. Add them as explicit overrides or manual adjustments when they matter.</span>
            </section>
        `;
    }

    function buildJsonPayload(result) {
        return {
            label: result.label,
            preset: result.preset,
            generatedAt: result.generatedAt,
            inputs: result.query,
            totals: result.totals,
            lineItems: result.lineItems,
            serviceMix: result.serviceRows,
            assumptions: result.assumptions,
            recommendations: result.recommendations
        };
    }

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

    function getActiveTab() {
        const activeButton = tabButtons.find((button) => button.classList.contains('active'));

        return activeButton ? activeButton.dataset.tabTarget : 'breakdown';
    }

    function buildCsvRowsForBreakdown() {
        return [
            ['#', 'Service', 'Driver', 'Usage', 'Unit basis', 'Monthly', 'Annual']
        ].concat(getSortedLineItems().map((item, index) => [
            index + 1,
            item.service,
            item.component,
            item.usage,
            item.unitBasis,
            Number(item.monthly).toFixed(2),
            Number(item.annual).toFixed(2)
        ]));
    }

    function buildCsvRowsForServices() {
        return [
            ['#', 'Service', 'Monthly', 'Annual', 'Share %', 'Signal']
        ].concat(latestResult.serviceRows.map((row, index) => [
            index + 1,
            row.service,
            Number(row.monthly).toFixed(2),
            Number(row.annual).toFixed(2),
            Number(row.sharePct).toFixed(2),
            row.signal
        ]));
    }

    function buildCsvRowsForAssumptions() {
        return [
            ['#', 'Assumption', 'Value', 'Note']
        ].concat(latestResult.assumptions.map((row, index) => [
            index + 1,
            row.name,
            row.value,
            row.note
        ]));
    }

    function rowsToCsv(rows) {
        return rows
            .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
            .join('\n');
    }

    initNumericInputGroups();
    initMarkdownCopyButtons();

    dropdownSelects.forEach((selectElement) => {
        selectElement.addEventListener('toggle', function () {
            if (selectElement.open) {
                applySelectSpace(selectElement);
                return;
            }

            clearSelectSpace(selectElement);
        });
    });

    singleSelectConfigs.forEach((config) => {
        updateSingleSelectState(config.inputs, config.hiddenInput, config.summaryElement, null);

        config.inputs.forEach((input) => {
            input.addEventListener('change', function () {
                        updateSingleSelectState(config.inputs, config.hiddenInput, config.summaryElement, config.detailsElement);

                        if (config.hiddenInput === sortInput && latestResult) {
                            renderResult(latestResult);
                        }

                        if (config.hiddenInput === computeInstanceInput) {
                            syncCustomInstanceState();
                        }
                    });
        });
    });

    applyPreset('lean-web');
    activateTab('breakdown');
    updateCustomInstanceLabel();
    syncCustomInstanceState();

    document.addEventListener('click', function (event) {
        dropdownSelects.forEach((selectElement) => {
            if (!selectElement.contains(event.target)) {
                selectElement.removeAttribute('open');
                clearSelectSpace(selectElement);
            }
        });
    });

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

    [computeCustomLabelInput, computeCustomVcpuInput, computeCustomMemoryGiBInput].forEach((input) => {
        input.addEventListener('input', function () {
            updateCustomInstanceLabel();

            if (computeInstanceInput.value === 'custom') {
                updateSingleSelectState(computeInstanceOptionInputs, computeInstanceInput, computeInstanceSummary, null);
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        toggleSubmitState(true);
        setLoadingState('Estimating Google Cloud monthly spend...');

        try {
            const query = buildQuery();
            const validationError = validateQuery(query);

            if (validationError) {
                setErrorState(validationError);
                return;
            }

            latestResult = buildEstimate(query);
            resetResultSort();
            renderResult(latestResult);
            setResultState();
            activateTab('breakdown');
        } catch (error) {
            setErrorState(error instanceof Error ? error.message : 'The estimator could not build the result.');
        } finally {
            toggleSubmitState(false);
        }
    });

    applyPresetButton.addEventListener('click', function () {
        applyPreset(presetInput.value);
    });

    resetButton.addEventListener('click', function () {
        applyPreset('lean-web');
        latestResult = null;
        setLoadingState('Build an estimate to review line-item cost drivers, service mix, and exportable JSON.');
        toggleSubmitState(false);
    });

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

    resultContent.addEventListener('click', async function (event) {
        const button = event.target.closest('[data-copy]');

        if (!button) {
            return;
        }

        await copyText(button.getAttribute('data-copy') || '', button);
    });

    exportPdfButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        exportResultShellAsPdf(slugify(latestResult.label), resultContent);
        flashButton(exportPdfButton, 'Opened');
    });

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

    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });

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

    setLoadingState('Build an estimate to review line-item cost drivers, service mix, and exportable JSON.');
});
