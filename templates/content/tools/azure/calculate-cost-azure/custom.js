// custom.js

function initializeInfraStackCustomDropdowns(root) {
    const scope = root || document;
    const dropdowns = Array.from(scope.querySelectorAll('[data-custom-dropdown-for]'));

    dropdowns.forEach(function (dropdown) {
        const targetId = dropdown.getAttribute('data-custom-dropdown-for');
        const targetInput = targetId ? document.getElementById(targetId) : null;
        const label = dropdown.querySelector('[data-custom-dropdown-label]');
        const options = Array.from(dropdown.querySelectorAll('[data-custom-dropdown-value]'));

        if (!targetInput || !label || !options.length || dropdown.dataset.customDropdownBound === 'true') {
            return;
        }

        function sync(value) {
            const selectedValue = value || targetInput.value || (options[0] ? options[0].dataset.customDropdownValue : '');
            let selectedOption = options.find(function (option) {
                return option.dataset.customDropdownValue === selectedValue;
            }) || options[0];

            if (!selectedOption) {
                return;
            }

            const nextValue = selectedOption.dataset.customDropdownValue || '';

            if (targetInput.value !== nextValue) {
                targetInput.value = nextValue;
            }
            label.textContent = selectedOption.textContent.trim();
            options.forEach(function (option) {
                const isActive = option === selectedOption;

                option.classList.toggle('active', isActive);
                option.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }

        if (targetInput instanceof HTMLInputElement && !targetInput.dataset.customDropdownValueProxy) {
            const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');

            if (descriptor && descriptor.get && descriptor.set) {
                Object.defineProperty(targetInput, 'value', {
                    configurable: true,
                    get: function () {
                        return descriptor.get.call(this);
                    },
                    set: function (nextValue) {
                        descriptor.set.call(this, nextValue);
                        window.requestAnimationFrame(function () {
                            sync(String(nextValue || ''));
                        });
                    }
                });
                targetInput.dataset.customDropdownValueProxy = 'true';
            }
        }

        options.forEach(function (option) {
            option.addEventListener('click', function () {
                sync(option.dataset.customDropdownValue || '');
                targetInput.dispatchEvent(new Event('change', {
                    bubbles: true
                }));
                dropdown.removeAttribute('open');
            });
        });

        targetInput.addEventListener('change', function () {
            sync(targetInput.value);
        });
        sync(targetInput.value);
        dropdown.dataset.customDropdownBound = 'true';
    });
}

// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:start family.calculate.workspace.04_selected-item
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.04_selected-item
// ns:start family._base.workspace.05_result-summary
function installInfraStackResultSummaryNormalizer(prefix) {
    function normalizeSummary(summary) {
        const hero = summary.querySelector('.' + prefix + '-result-hero-grid');

        if (!hero) {
            return;
        }

        const cards = Array.from(hero.querySelectorAll(':scope > .' + prefix + '-result-card'));
        const primaryCard = cards.find(function (card) {
            return card.classList.contains(prefix + '-result-card-primary') || card.classList.contains(prefix + '-result-card-visual') || card.classList.contains(prefix + '-result-card-command');
        }) || cards[0];
        const summaryCard = cards.find(function (card) {
            return card !== primaryCard && (card.classList.contains(prefix + '-result-card-summary') || card.classList.contains(prefix + '-result-card-main'));
        }) || cards.find(function (card) {
            return card !== primaryCard;
        });

        if (primaryCard) {
            primaryCard.classList.add(prefix + '-result-card-primary');
            if (!primaryCard.dataset.resultVisual) {
                if (primaryCard.querySelector('.' + prefix + '-result-ring')) {
                    primaryCard.dataset.resultVisual = 'ring';
                } else if (primaryCard.querySelector('.' + prefix + '-result-primary-number')) {
                    primaryCard.dataset.resultVisual = 'number';
                } else if (primaryCard.querySelector('.' + prefix + '-result-primary-metric')) {
                    primaryCard.dataset.resultVisual = 'metric';
                } else if (primaryCard.querySelector('.' + prefix + '-result-card-icon-primary')) {
                    primaryCard.dataset.resultVisual = 'icon';
                } else {
                    primaryCard.dataset.resultVisual = 'text';
                }
            }
        }

        if (summaryCard) {
            summaryCard.classList.add(prefix + '-result-card-summary');
            const chipRow = summaryCard.querySelector('.' + prefix + '-result-chip-row');

            if (chipRow && !summaryCard.querySelector('.' + prefix + '-result-chip-grid')) {
                chipRow.classList.add(prefix + '-result-chip-grid');
            }
        }

        if (primaryCard && hero.firstElementChild !== primaryCard) {
            hero.insertBefore(primaryCard, hero.firstElementChild);
        }

        if (primaryCard && summaryCard && primaryCard.nextElementSibling !== summaryCard) {
            hero.insertBefore(summaryCard, primaryCard.nextElementSibling);
        }
    }

    function normalize() {
        document.querySelectorAll('.' + prefix + '-result-summary').forEach(normalizeSummary);
    }

    function scheduleNormalize() {
        window.requestAnimationFrame(normalize);
    }

    if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function () {
            normalize();
            new MutationObserver(scheduleNormalize).observe(document.body, {
                childList: true,
                subtree: true
            });
        }, { once: true });
        return;
    }

    normalize();
    new MutationObserver(scheduleNormalize).observe(document.body, {
        childList: true,
        subtree: true
    });
}

installInfraStackResultSummaryNormalizer('calculate-cost-azure');
// ns:end family._base.workspace.05_result-summary

// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.

// ns:start family._base.workspace.00_shell
document.addEventListener('DOMContentLoaded', function () {
// ns:start family._base.workspace.01_input-brief
    const form = document.getElementById('calculateCostAzureForm');
    const labelInput = document.getElementById('calculateCostAzureLabel');
// ns:end family._base.workspace.01_input-brief
// ns:start family._base.workspace.02_basic-settings
    const presetInput = document.getElementById('calculateCostAzurePreset');
    const presetSummary = document.getElementById('calculateCostAzurePresetSummary');
    const presetOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostAzurePresetOption"]'));
    const presetSelect = document.getElementById('calculateCostAzurePresetSelect');
    const applyPresetButton = document.getElementById('calculateCostAzureApplyPreset');
// ns:end family._base.workspace.02_basic-settings
    const submitButton = document.getElementById('calculateCostAzureSubmit');
    const resetButton = document.getElementById('calculateCostAzureReset');

// ns:start family._base.workspace.03_custom-settings
    const includeComputeInput = document.getElementById('calculateCostAzureIncludeCompute');
    const includeDiskInput = document.getElementById('calculateCostAzureIncludeDisk');
    const includeBlobInput = document.getElementById('calculateCostAzureIncludeBlob');
    const includeFunctionsInput = document.getElementById('calculateCostAzureIncludeFunctions');
    const includeApiInput = document.getElementById('calculateCostAzureIncludeApi');

    const computeInstanceInput = document.getElementById('calculateCostAzureComputeInstance');
    const computeInstanceSummary = document.getElementById('calculateCostAzureComputeInstanceSummary');
    const computeInstanceOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostAzureComputeInstanceOption"]'));
    const computeInstanceSelect = document.getElementById('calculateCostAzureComputeInstanceSelect');
    const computeCustomOptionLabel = document.getElementById('calculateCostAzureComputeCustomOptionLabel');
    const computePurchaseInput = document.getElementById('calculateCostAzureComputePurchase');
    const computePurchaseSummary = document.getElementById('calculateCostAzureComputePurchaseSummary');
    const computePurchaseOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostAzureComputePurchaseOption"]'));
    const computePurchaseSelect = document.getElementById('calculateCostAzureComputePurchaseSelect');
    const computeCustomFields = document.getElementById('calculateCostAzureComputeCustomFields');
    const computeCustomHint = document.getElementById('calculateCostAzureComputeCustomHint');
    const computeCustomLabelInput = document.getElementById('calculateCostAzureComputeCustomLabel');
    const computeCustomVcpuInput = document.getElementById('calculateCostAzureComputeCustomVcpu');
    const computeCustomMemoryGiBInput = document.getElementById('calculateCostAzureComputeCustomMemoryGiB');
    const computeCountInput = document.getElementById('calculateCostAzureComputeCount');
    const computeHoursInput = document.getElementById('calculateCostAzureComputeHours');

    const diskStorageGbInput = document.getElementById('calculateCostAzureDiskStorageGb');
    const diskIopsInput = document.getElementById('calculateCostAzureDiskIops');
    const diskThroughputInput = document.getElementById('calculateCostAzureDiskThroughput');

    const blobStorageGbInput = document.getElementById('calculateCostAzureBlobStorageGb');
    const blobEgressGbInput = document.getElementById('calculateCostAzureBlobEgressGb');
    const blobGetRequestsKInput = document.getElementById('calculateCostAzureBlobGetRequestsK');
    const blobPutRequestsKInput = document.getElementById('calculateCostAzureBlobPutRequestsK');

    const functionsRequestsMillionInput = document.getElementById('calculateCostAzureFunctionsRequestsMillion');
    const functionsDurationMsInput = document.getElementById('calculateCostAzureFunctionsDurationMs');
    const functionsMemoryMbInput = document.getElementById('calculateCostAzureFunctionsMemoryMb');

    const apiTypeInput = document.getElementById('calculateCostAzureApiType');
    const apiTypeSummary = document.getElementById('calculateCostAzureApiTypeSummary');
    const apiTypeOptionInputs = Array.from(document.querySelectorAll('input[name="calculateCostAzureApiTypeOption"]'));
    const apiTypeSelect = document.getElementById('calculateCostAzureApiTypeSelect');
    const apiRequestsMillionInput = document.getElementById('calculateCostAzureApiRequestsMillion');
    const apiResponseKbInput = document.getElementById('calculateCostAzureApiResponseKb');

    const sharedEgressGbInput = document.getElementById('calculateCostAzureSharedEgressGb');
    const supportPctInput = document.getElementById('calculateCostAzureSupportPct');
    const contingencyPctInput = document.getElementById('calculateCostAzureContingencyPct');
    const manualAdjustmentInput = document.getElementById('calculateCostAzureManualAdjustment');

    const freeTierFunctionsInput = document.getElementById('calculateCostAzureFreeTierFunctions');
    const freeTierApiInput = document.getElementById('calculateCostAzureFreeTierApi');
    const freeTierEgressInput = document.getElementById('calculateCostAzureFreeTierEgress');
    const regionalUpliftPctInput = document.getElementById('calculateCostAzureRegionalUpliftPct');

    const computeHourlyOverrideInput = document.getElementById('calculateCostAzureComputeHourlyOverride');
    const diskStorageRateInput = document.getElementById('calculateCostAzureDiskStorageRate');
    const diskIopsRateInput = document.getElementById('calculateCostAzureDiskIopsRate');
    const diskThroughputRateInput = document.getElementById('calculateCostAzureDiskThroughputRate');
    const blobStorageRateInput = document.getElementById('calculateCostAzureBlobStorageRate');
    const blobGetRateInput = document.getElementById('calculateCostAzureBlobGetRate');
    const blobPutRateInput = document.getElementById('calculateCostAzureBlobPutRate');
    const functionsRequestRateInput = document.getElementById('calculateCostAzureFunctionsRequestRate');
    const functionsGbSecondRateInput = document.getElementById('calculateCostAzureFunctionsGbSecondRate');
    const apiHttpFirstRateInput = document.getElementById('calculateCostAzureApiHttpFirstRate');
    const apiHttpNextRateInput = document.getElementById('calculateCostAzureApiHttpNextRate');
    const apiRestRateInput = document.getElementById('calculateCostAzureApiRestRate');
    const egressRateInput = document.getElementById('calculateCostAzureEgressRate');

// ns:end family._base.workspace.03_custom-settings
    const resultEmpty = document.getElementById('calculateCostAzureResultEmpty');
    const resultContent = document.getElementById('calculateCostAzureResultContent');
    const resultError = document.getElementById('calculateCostAzureResultError');
    const resultSummary = document.getElementById('calculateCostAzureResultSummary');
    const breakdownTableBody = document.getElementById('calculateCostAzureBreakdownTableBody');
    const serviceTableBody = document.getElementById('calculateCostAzureServiceTableBody');
    const assumptionTableBody = document.getElementById('calculateCostAzureAssumptionTableBody');
    const recommendationsWrap = document.getElementById('calculateCostAzureRecommendations');
    const methodologyWrap = document.getElementById('calculateCostAzureMethodology');
    const jsonOutput = document.getElementById('calculateCostAzureJsonOutput');

    const sortInput = document.getElementById('calculateCostAzureSort');
    const sortSummary = document.getElementById('calculateCostAzureSortSummary');
    const sortOptionButtons = Array.from(document.querySelectorAll('.calculate-cost-azure-sort-option'));
    const sortSelect = document.getElementById('calculateCostAzureSortSelect');
    const exportPdfButton = document.getElementById('calculateCostAzureExportPdf');
    const downloadCsvButton = document.getElementById('calculateCostAzureDownloadCsv');
    const copyJsonButton = document.getElementById('calculateCostAzureCopyJson');
    const downloadJsonButton = document.getElementById('calculateCostAzureDownloadJson');
    const importJsonButton = document.getElementById('calculateCostAzureImportJsonButton');
    const importJsonInput = document.getElementById('calculateCostAzureImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.calculate-cost-azure-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.calculate-cost-azure-tab-panel'));
    const dropdownSelects = Array.from(document.querySelectorAll('.calculate-cost-azure-select'));

    const serviceRefs = {
        compute: {
            checkbox: includeComputeInput,
            body: document.getElementById('calculateCostAzureComputeBody'),
            card: document.querySelector('[data-service-card="compute"]')
        },
        disk: {
            checkbox: includeDiskInput,
            body: document.getElementById('calculateCostAzureDiskBody'),
            card: document.querySelector('[data-service-card="disk"]')
        },
        blob: {
            checkbox: includeBlobInput,
            body: document.getElementById('calculateCostAzureBlobBody'),
            card: document.querySelector('[data-service-card="blob"]')
        },
        functions: {
            checkbox: includeFunctionsInput,
            body: document.getElementById('calculateCostAzureFunctionsBody'),
            card: document.querySelector('[data-service-card="functions"]')
        },
        api: {
            checkbox: includeApiInput,
            body: document.getElementById('calculateCostAzureApiBody'),
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
        sortOptionButtons.length === 0 ||
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
        }
    ];

    const PURCHASE_MODE_LABELS = {
        onDemand: 'Pay-as-you-go',
        spot: 'Spot',
        savings1: 'Savings plan 1yr',
        savings3: 'Savings plan 3yr',
        reserved1: 'Reserved instance 1yr',
        reserved3: 'Reserved instance 3yr'
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
            label: 'B2s',
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
            label: 'B2ms',
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
            label: 'D2s v5',
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
            label: 'D4s v5',
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
            label: 'D8s v5',
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
            label: 'Azure workload estimate',
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
        calculateCostAzureComputeCustomVcpu: {
            suffix: 'vCPU'
        },
        calculateCostAzureComputeCustomMemoryGiB: {
            suffix: 'GiB'
        },
        calculateCostAzureComputeCount: {
            suffix: 'instances'
        },
        calculateCostAzureComputeHours: {
            suffix: 'hours'
        },
        calculateCostAzureDiskStorageGb: {
            suffix: 'GB'
        },
        calculateCostAzureDiskIops: {
            suffix: 'IOPS'
        },
        calculateCostAzureDiskThroughput: {
            suffix: 'MB/s'
        },
        calculateCostAzureBlobStorageGb: {
            suffix: 'GB'
        },
        calculateCostAzureBlobEgressGb: {
            suffix: 'GB'
        },
        calculateCostAzureBlobGetRequestsK: {
            suffix: '1k'
        },
        calculateCostAzureBlobPutRequestsK: {
            suffix: '1k'
        },
        calculateCostAzureFunctionsRequestsMillion: {
            suffix: '1M'
        },
        calculateCostAzureFunctionsDurationMs: {
            suffix: 'ms'
        },
        calculateCostAzureFunctionsMemoryMb: {
            suffix: 'MB'
        },
        calculateCostAzureApiRequestsMillion: {
            suffix: '1M'
        },
        calculateCostAzureApiResponseKb: {
            suffix: 'KB'
        },
        calculateCostAzureSharedEgressGb: {
            suffix: 'GB'
        },
        calculateCostAzureSupportPct: {
            suffix: '%'
        },
        calculateCostAzureContingencyPct: {
            suffix: '%'
        },
        calculateCostAzureManualAdjustment: {
            prefix: '$'
        },
        calculateCostAzureRegionalUpliftPct: {
            suffix: '%'
        },
        calculateCostAzureComputeHourlyOverride: {
            prefix: '$',
            suffix: 'instance-hour'
        },
        calculateCostAzureDiskStorageRate: {
            prefix: '$',
            suffix: 'GB-month'
        },
        calculateCostAzureDiskIopsRate: {
            prefix: '$',
            suffix: 'IOPS-month'
        },
        calculateCostAzureDiskThroughputRate: {
            prefix: '$',
            suffix: 'MB/s-month'
        },
        calculateCostAzureBlobStorageRate: {
            prefix: '$',
            suffix: 'GB-month'
        },
        calculateCostAzureBlobGetRate: {
            prefix: '$',
            suffix: '1k GET'
        },
        calculateCostAzureBlobPutRate: {
            prefix: '$',
            suffix: '1k PUT'
        },
        calculateCostAzureFunctionsRequestRate: {
            prefix: '$',
            suffix: '1M req'
        },
        calculateCostAzureFunctionsGbSecondRate: {
            prefix: '$',
            suffix: 'GB-s'
        },
        calculateCostAzureApiHttpFirstRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostAzureApiHttpNextRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostAzureApiRestRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostAzureEgressRate: {
            prefix: '$',
            suffix: 'GB'
        }
    };

    function buildInputAddon(text, position) {
        const addon = document.createElement('span');

        addon.className = `calculate-cost-azure-input-addon calculate-cost-azure-input-addon--${position}`;
        addon.textContent = text;

        return addon;
    }

    function decorateNumericInput(input, decorator) {
        if (!input || input.dataset.calculateCostAzureDecorated === '1') {
            return;
        }

        const parent = input.parentNode;
        const wrapper = document.createElement('div');

        if (!parent) {
            return;
        }

        wrapper.className = 'calculate-cost-azure-input-group';
        input.classList.add('calculate-cost-azure-input-group-control');
        input.dataset.calculateCostAzureDecorated = '1';

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
        const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.calculate-cost-azure-prompt-pre'));
        const promptCopyButtons = document.querySelectorAll('.calculate-cost-azure-prompt-copy-btn');

        promptCopyButtons.forEach((button) => {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;
            const label = button.querySelector('span') || button;

            if (!code) {
                button.disabled = true;
                return;
            }

            if (button.dataset.calculateCostAzureCopyBound === '1') {
                return;
            }

            button.dataset.calculateCostAzureCopyBound = '1';

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

        const codeBlocks = document.querySelectorAll('.markdown-content pre:not(.calculate-cost-azure-prompt-pre)');

        codeBlocks.forEach((pre) => {
            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            let button = pre.querySelector('.markdown-copy-btn');

            if (button && button.dataset.calculateCostAzureCopyBound === '1') {
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

            button.dataset.calculateCostAzureCopyBound = '1';

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
                const existingScript = document.querySelector('script[data-calculate-cost-azure-echarts]');

                if (existingScript) {
                    existingScript.addEventListener('load', () => resolve(window.echarts || null), { once: true });
                    existingScript.addEventListener('error', () => resolve(null), { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.src = ECHARTS_CDN_URL;
                script.async = true;
                script.dataset.calculateCostAzureEcharts = 'true';
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
        return String(value || 'azure-cost-estimate')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'azure-cost-estimate';
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
        return selectElement.closest('.calculate-cost-azure-field-stack, .calculate-cost-azure-toolbar-left, .calculate-cost-azure-setting-field') || selectElement.parentElement;
    }

    function getDropdownBoundaryRect(element) {
        const boundaryElement = element
            ? element.closest('.calculate-cost-azure-service-card, .calculate-cost-azure-inner-panel, .calculate-cost-azure-section-card, .tool-box')
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

        const labelElement = selectedInput.closest('.calculate-cost-azure-select-card').querySelector('.calculate-cost-azure-select-title');

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

    function setSortOption(value, shouldRender) {
        const selectedValue = sortOptionButtons.some((button) => button.dataset.sortValue === value) ? value : 'id';
        const activeButton = sortOptionButtons.find((button) => button.dataset.sortValue === selectedValue);

        sortInput.value = selectedValue;
        sortOptionButtons.forEach((button) => {
            const isActive = button === activeButton;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        sortSummary.textContent = activeButton ? activeButton.textContent.trim() : 'ID';
        sortSelect.removeAttribute('open');

        if (shouldRender && latestResult) {
            renderResult(latestResult);
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
            label: String(labelInput.value || '').trim() || 'Azure cost estimate',
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
                    return 'Set VM hourly override in Custom when using Custom size.';
                }
            } else if (!COMPUTE_CATALOG[query.computeInstance]) {
                return 'Choose a supported VM profile.';
            }

            if (!PURCHASE_MODE_LABELS[query.computePurchase]) {
                return 'Choose a supported VM purchase model.';
            }
        }

        if (!['http', 'rest'].includes(query.apiType)) {
            return 'Choose a supported API Management type.';
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
        setSortOption('id', false);
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

        labelInput.value = String(importedQuery.label || preset.label || 'Azure cost estimate').trim() || 'Azure cost estimate';
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

            Array.from(serviceRef.body.querySelectorAll('.calculate-cost-azure-select')).forEach((selectElement) => {
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
                note: 'No VM runtime cost is included in this estimate.'
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
            note: `${resolvedRate.source}. ${instance.vcpu} vCPU, ${instance.memoryGiB} GiB memory.${query.computeInstance === 'custom' ? ' Custom size is priced from the VM hourly override.' : ''}`
        });

        return {
            lineItems: [
                {
                    service: 'Virtual Machines',
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
                name: 'Managed Disks pricing basis',
                value: 'Disabled',
                note: 'No Managed Disks volume storage cost is included in this estimate.'
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
            name: 'Managed Disks pricing basis',
            value: 'Managed disk starter model',
            note: `Baseline 3000 IOPS and 125 MB/s included. Storage ${storageRate.source}, IOPS ${iopsRate.source}, throughput ${throughputRate.source}.`
        });

        return {
            lineItems: [
                {
                    service: 'Managed Disks',
                    component: 'managed disk storage',
                    usage: `${formatNumber(query.diskStorageGb, 0)} GB provisioned`,
                    unitBasis: `${formatRate(storageRate.value, 4)} / GB-month`,
                    monthly: storageCost,
                    annual: storageCost * 12,
                    copyValue: `Managed Disks managed disk storage | ${query.diskStorageGb} GB | ${formatCurrency(storageCost)}`
                },
                {
                    service: 'Managed Disks',
                    component: 'Additional disk IOPS',
                    usage: `${formatNumber(additionalIops, 0)} billable IOPS`,
                    unitBasis: `${formatRate(iopsRate.value, 4)} / IOPS-month`,
                    monthly: iopsCost,
                    annual: iopsCost * 12,
                    copyValue: `Managed Disks additional IOPS | ${additionalIops} billable IOPS | ${formatCurrency(iopsCost)}`
                },
                {
                    service: 'Managed Disks',
                    component: 'Additional disk throughput',
                    usage: `${formatNumber(additionalThroughput, 0)} billable MB/s`,
                    unitBasis: `${formatRate(throughputRate.value, 4)} / MB/s-month`,
                    monthly: throughputCost,
                    annual: throughputCost * 12,
                    copyValue: `Managed Disks additional throughput | ${additionalThroughput} MB/s | ${formatCurrency(throughputCost)}`
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
                name: 'Blob Storage pricing basis',
                value: 'Disabled',
                note: 'No Blob Storage storage or request cost is included in this estimate.'
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
            name: 'Blob Storage pricing basis',
            value: 'Blob Storage starter model',
            note: `Storage ${storageRate.source}. Request rates use editable starter assumptions for GET and PUT/LIST activity.`
        });

        return {
            lineItems: [
                {
                    service: 'Blob Storage',
                    component: 'Standard storage',
                    usage: `${formatNumber(query.blobStorageGb, 0)} GB stored`,
                    unitBasis: `${formatRate(storageRate.value, 4)} / GB-month`,
                    monthly: storageCost,
                    annual: storageCost * 12,
                    copyValue: `Blob Storage | ${query.blobStorageGb} GB | ${formatCurrency(storageCost)}`
                },
                {
                    service: 'Blob Storage',
                    component: 'GET requests',
                    usage: `${formatNumber(query.blobGetRequestsK, 0)} x 1k requests`,
                    unitBasis: `${formatRate(getRate.value, 4)} / 1k requests`,
                    monthly: getCost,
                    annual: getCost * 12,
                    copyValue: `Blob Storage GET requests | ${query.blobGetRequestsK} x 1k | ${formatCurrency(getCost)}`
                },
                {
                    service: 'Blob Storage',
                    component: 'PUT/LIST requests',
                    usage: `${formatNumber(query.blobPutRequestsK, 0)} x 1k requests`,
                    unitBasis: `${formatRate(putRate.value, 4)} / 1k requests`,
                    monthly: putCost,
                    annual: putCost * 12,
                    copyValue: `Blob Storage PUT/LIST requests | ${query.blobPutRequestsK} x 1k | ${formatCurrency(putCost)}`
                }
            ].filter((item) => item.monthly > 0),
            egressGb: query.blobEgressGb
        };
    }

    function calculateFunctions(query, assumptions) {
        if (!query.includeFunctions || query.functionsRequestsMillion <= 0) {
            assumptions.push({
                name: 'Azure Functions pricing basis',
                value: 'Disabled',
                note: 'No Azure Functions request or duration cost is included in this estimate.'
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
            name: 'Azure Functions pricing basis',
            value: query.freeTierFunctions ? 'Starter rate with free tier' : 'Starter rate without free tier',
            note: `Request pricing ${requestRate.source}. Compute pricing ${gbSecondRate.source}. Memory set to ${formatNumber(query.functionsMemoryMb, 0)} MB.`
        });

        return {
            lineItems: [
                {
                    service: 'Azure Functions',
                    component: 'Request charges',
                    usage: `${formatNumber(requestCount, 0)} requests (${formatNumber(billableRequests, 0)} billable)`,
                    unitBasis: `${formatRate(requestRate.value, 2)} / 1M requests`,
                    monthly: requestCost,
                    annual: requestCost * 12,
                    copyValue: `Azure Functions requests | ${requestCount} requests | ${formatCurrency(requestCost)}`
                },
                {
                    service: 'Azure Functions',
                    component: 'Compute duration',
                    usage: `${formatNumber(totalGbSeconds, 0)} GB-s (${formatNumber(billableGbSeconds, 0)} billable)`,
                    unitBasis: `${formatRate(gbSecondRate.value, 10)} / GB-s`,
                    monthly: computeCost,
                    annual: computeCost * 12,
                    copyValue: `Azure Functions compute | ${formatNumber(totalGbSeconds, 0)} GB-s | ${formatCurrency(computeCost)}`
                }
            ].filter((item) => item.monthly > 0)
        };
    }

    function calculateApiManagement(query, assumptions) {
        if (!query.includeApi || query.apiRequestsMillion <= 0) {
            assumptions.push({
                name: 'API Management pricing basis',
                value: 'Disabled',
                note: 'No API Management request cost is included in this estimate.'
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
            name: 'API Management pricing basis',
            value: query.apiType === 'http' ? 'Consumption gateway starter model' : 'Standard gateway starter model',
            note: query.apiType === 'http'
                ? `HTTP first-tier pricing ${httpFirstRate.source}; next-tier pricing ${httpNextRate.source}.`
                : `REST pricing ${restRate.source}.`
        });

        return {
            lineItems: [
                {
                    service: 'API Management',
                    component: query.apiType === 'http' ? 'Consumption gateway calls' : 'Standard gateway calls',
                    usage: `${formatNumber(requestCount, 0)} requests (${formatNumber(billableRequests, 0)} billable)`,
                    unitBasis,
                    monthly: requestCost,
                    annual: requestCost * 12,
                    copyValue: `API Management ${query.apiType.toUpperCase()} calls | ${requestCount} requests | ${formatCurrency(requestCost)}`
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
            note: `${egressRate.source}. Egress includes Blob Storage transfer out, API responses, and shared outbound traffic.`
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
                title: 'Steady VM runtime',
                copy: 'Virtual Machines are modeled as a steady workload on pay-as-you-go pricing. Compare that same shape against savings plan or reserved coverage before anyone signs a budget with a brave face.'
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
                title: 'Azure Functions compute is noticeable',
                copy: 'Duration-heavy Azure Functions workloads can creep from elegant to expensive. Review memory sizing, cold-start behavior, and whether any request path belongs on a steadier service.'
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
                copy: 'You are using the bundled starter rates without manual overrides. That is fine for planning, but it is the moment to validate the expensive lines in Azure pricing before the estimate becomes policy.'
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
                let signalClass = 'calculate-cost-azure-signal-light';

                if (sharePct >= 40) {
                    signal = 'Heavy';
                    signalClass = 'calculate-cost-azure-signal-heavy';
                } else if (sharePct >= 15) {
                    signal = 'Medium';
                    signalClass = 'calculate-cost-azure-signal-medium';
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
                value: 'Azure starter cost estimate',
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

        if (sortInput.value === 'basis') {
            return items.sort((left, right) => {
                const basisSort = String(left.unitBasis || '').localeCompare(String(right.unitBasis || ''), undefined, {
                    numeric: true,
                    sensitivity: 'base'
                });

                if (basisSort !== 0) {
                    return basisSort;
                }

                return right.monthly - left.monthly;
            });
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
        const chartElement = document.getElementById('calculateCostAzureSpendChart');
        const ringElement = document.getElementById('calculateCostAzureSpendRing');

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
                                    { offset: 0, color: '#bae6fd' },
                                    { offset: 0.42, color: '#06B6D4' },
                                    { offset: 1, color: '#2563EB' }
                                ]),
                                shadowBlur: 14,
                                shadowColor: 'rgba(6, 182, 212, 0.26)'
                            }
                        },
                        axisLine: {
                            roundCap: true,
                            lineStyle: {
                                width: 15,
                                color: [[1, 'rgba(224, 242, 254, 0.98)']]
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
        const overrideTone = overrideCount > 0 ? 'warning' : 'baseline';
        const progressAngle = Math.round(getRunRateRingPercent(result.totals.monthlyTotal) * 3.6);
        const activeServices = Number(result.totals.activeServices || 0);
        const topDriver = result.totals.topDriver || 'Modeled services';
        const monthlyTotal = formatCurrency(result.totals.monthlyTotal);
        const primaryValueChars = Math.max(monthlyTotal.length, 3);
        const combinedEgress = `${formatNumber(result.totals.combinedEgressGb, 1)} GB`;

        resultSummary.dataset.resultTone = overrideCount > 0 ? 'warning' : 'success';
        resultSummary.dataset.resultLayout = 'ring';

        return `
            <header class="calculate-cost-azure-result-header" aria-label="Result summary header">
                <div class="calculate-cost-azure-result-header-main">
                    <span class="calculate-cost-azure-result-header-icon" aria-hidden="true"><i class="bi bi-calculator"></i></span>
                    <div class="calculate-cost-azure-result-header-copy">
                        <h2 class="calculate-cost-azure-result-header-title">Result Summary</h2>
                        <p>Overview of the current Azure estimate result and key metrics</p>
                    </div>
                </div>
                <div class="calculate-cost-azure-result-header-meta" aria-label="Result summary status">
                    <span class="calculate-cost-azure-result-header-chip calculate-cost-azure-result-chip-ready"><span class="calculate-cost-azure-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Estimated</span></span>
                    <span class="calculate-cost-azure-result-header-chip calculate-cost-azure-result-chip-updated"><span class="calculate-cost-azure-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(generatedAtText)}</span></span>
                </div>
            </header>

            <div class="calculate-cost-azure-result-hero-grid" aria-live="polite">
                <article class="calculate-cost-azure-result-card calculate-cost-azure-result-card-primary" data-result-visual="ring" aria-label="Primary estimate result">
                    <div class="calculate-cost-azure-result-primary-heading calculate-cost-azure-result-visual-copy calculate-cost-azure-result-visual-copy-top"><div class="calculate-cost-azure-result-kicker">Primary Result</div><h3 class="calculate-cost-azure-result-title calculate-cost-azure-result-title-center">Estimated run rate</h3></div>
                    <div class="calculate-cost-azure-result-primary-visual" id="calculateCostAzureResultVisual" aria-label="Primary estimate result visual">
                        <span class="calculate-cost-azure-result-card-icon calculate-cost-azure-result-card-icon-primary" aria-hidden="true"><i class="bi bi-cash-coin"></i></span>
                        <div class="calculate-cost-azure-result-ring calculate-cost-azure-spend-ring" id="calculateCostAzureSpendRing" style="--calculate-cost-azure-result-progress: ${escapeHtml(String(progressAngle))}deg; --progress-angle: ${escapeHtml(String(progressAngle))}deg; --calculate-cost-azure-result-value-chars: ${escapeHtml(String(primaryValueChars))};" aria-label="Estimated monthly Azure run rate ${escapeHtml(monthlyTotal)}">
                            <div class="calculate-cost-azure-spend-chart" id="calculateCostAzureSpendChart" aria-hidden="true"></div>
                            <div class="calculate-cost-azure-result-ring-center calculate-cost-azure-spend-value">
                                <strong class="calculate-cost-azure-result-ring-value">${escapeHtml(monthlyTotal)}</strong>
                                <span class="calculate-cost-azure-result-ring-unit">Monthly</span>
                            </div>
                        </div>
                    </div>
                    <div class="calculate-cost-azure-result-visual-copy">
                        <p class="calculate-cost-azure-result-copy calculate-cost-azure-result-copy-center">Modeled monthly total from the current assumptions.</p>
                    </div>
                    <span class="calculate-cost-azure-result-card-divider" aria-hidden="true"></span>
                    <div class="calculate-cost-azure-result-chip-row calculate-cost-azure-result-chip-row-center" aria-label="Primary result outcome">
                        <span class="calculate-cost-azure-result-chip calculate-cost-azure-result-chip-outcome calculate-cost-azure-result-chip-ready"><span class="calculate-cost-azure-result-chip-icon" aria-hidden="true"><i class="bi bi-cash-coin"></i></span><span>Monthly Estimate</span></span>
                    </div>
                </article>

                <article class="calculate-cost-azure-result-card calculate-cost-azure-result-card-summary" aria-label="Estimate summary">
                    <div class="calculate-cost-azure-result-summary-intro">
                        <span class="calculate-cost-azure-result-card-icon calculate-cost-azure-result-card-icon-summary" aria-hidden="true"><i class="bi bi-receipt"></i></span>
                        <div class="calculate-cost-azure-result-summary-copy">
                            <div class="calculate-cost-azure-result-kicker">Descriptive Summary</div>
                            <h3 class="calculate-cost-azure-result-title">Azure run-rate estimate</h3>
                            <p class="calculate-cost-azure-result-copy">Top driver: ${escapeHtml(topDriver)}. Totals are derived from the current assumptions, visible overrides, and generated service mix.</p>
                        </div>
                    </div>
                    <span class="calculate-cost-azure-result-card-divider" aria-hidden="true"></span>
                    <div class="calculate-cost-azure-result-chip-grid" aria-label="Estimate state">
                        <span class="calculate-cost-azure-result-chip calculate-cost-azure-result-chip-ready"><span class="calculate-cost-azure-result-chip-icon" aria-hidden="true"><i class="bi bi-check2-circle"></i></span><span>${escapeHtml(presetLabel)}</span></span>
                        <span class="calculate-cost-azure-result-chip calculate-cost-azure-result-chip-baseline"><span class="calculate-cost-azure-result-chip-icon" aria-hidden="true"><i class="bi bi-grid-3x3-gap"></i></span><span>${escapeHtml(String(activeServices))} services</span></span>
                        <span class="calculate-cost-azure-result-chip calculate-cost-azure-result-chip-${overrideTone}"><span class="calculate-cost-azure-result-chip-icon" aria-hidden="true"><i class="bi bi-sliders"></i></span><span>${escapeHtml(String(overrideCount))} overrides</span></span>
                        <span class="calculate-cost-azure-result-chip calculate-cost-azure-result-chip-baseline"><span class="calculate-cost-azure-result-chip-icon" aria-hidden="true"><i class="bi bi-graph-up-arrow"></i></span><span>Top driver: ${escapeHtml(topDriver)}</span></span>
                        <span class="calculate-cost-azure-result-chip calculate-cost-azure-result-chip-warning"><span class="calculate-cost-azure-result-chip-icon" aria-hidden="true"><i class="bi bi-hdd-network"></i></span><span>Egress: ${escapeHtml(combinedEgress)}</span></span>
                    </div>
                </article>
            </div>

            <div class="calculate-cost-azure-result-metric-grid" aria-label="Estimate metrics">
                <article class="calculate-cost-azure-result-metric-card calculate-cost-azure-result-metric-success">
                    <span class="calculate-cost-azure-result-metric-icon" aria-hidden="true"><i class="bi bi-calendar2-check"></i></span>
                    <span class="calculate-cost-azure-result-metric-label">Annual</span>
                    <strong class="calculate-cost-azure-result-metric-value">${escapeHtml(formatCurrency(result.totals.annualTotal))}</strong>
                    <span class="calculate-cost-azure-result-metric-copy">Projected from the current monthly run rate.</span>
                    <span class="calculate-cost-azure-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="calculate-cost-azure-result-metric-card calculate-cost-azure-result-metric-info">
                    <span class="calculate-cost-azure-result-metric-icon" aria-hidden="true"><i class="bi bi-sun"></i></span>
                    <span class="calculate-cost-azure-result-metric-label">Daily</span>
                    <strong class="calculate-cost-azure-result-metric-value">${escapeHtml(formatCurrency(result.totals.dailyTotal))}</strong>
                    <span class="calculate-cost-azure-result-metric-copy">Thirty-day planning average.</span>
                    <span class="calculate-cost-azure-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="calculate-cost-azure-result-metric-card calculate-cost-azure-result-metric-accent-tone">
                    <span class="calculate-cost-azure-result-metric-icon" aria-hidden="true"><i class="bi bi-clock"></i></span>
                    <span class="calculate-cost-azure-result-metric-label">Hourly</span>
                    <strong class="calculate-cost-azure-result-metric-value">${escapeHtml(formatCurrency(result.totals.hourlyTotal))}</strong>
                    <span class="calculate-cost-azure-result-metric-copy">Useful for long-running workload checks.</span>
                    <span class="calculate-cost-azure-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="calculate-cost-azure-result-metric-card calculate-cost-azure-result-metric-warning">
                    <span class="calculate-cost-azure-result-metric-icon" aria-hidden="true"><i class="bi bi-hdd-network"></i></span>
                    <span class="calculate-cost-azure-result-metric-label">Egress</span>
                    <strong class="calculate-cost-azure-result-metric-value">${escapeHtml(combinedEgress)}</strong>
                    <span class="calculate-cost-azure-result-metric-copy">Combined modeled outbound traffic.</span>
                    <span class="calculate-cost-azure-result-metric-accent" aria-hidden="true"></span>
                </article>
            </div>
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
                <td class="calculate-cost-azure-currency">${escapeHtml(formatCurrency(item.monthly))}</td>
                <td class="calculate-cost-azure-currency">${escapeHtml(formatCurrency(item.annual))}</td>
                <td class="calculate-cost-azure-copy-cell">
                    <button type="button" class="calculate-cost-azure-copy-btn" data-copy="${escapeHtml(item.copyValue)}" aria-label="Copy breakdown row ${index + 1}" title="Copy row">
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
                <td class="calculate-cost-azure-currency">${escapeHtml(formatCurrency(row.monthly))}</td>
                <td class="calculate-cost-azure-currency">${escapeHtml(formatCurrency(row.annual))}</td>
                <td>${escapeHtml(formatPercent(row.sharePct))}</td>
                <td><span class="calculate-cost-azure-signal ${escapeHtml(row.signalClass)}">${escapeHtml(row.signal)}</span></td>
                <td class="calculate-cost-azure-copy-cell">
                    <button type="button" class="calculate-cost-azure-copy-btn" data-copy="${escapeHtml(row.copyValue)}" aria-label="Copy service mix row ${index + 1}" title="Copy row">
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
                <td class="calculate-cost-azure-copy-cell">
                    <button type="button" class="calculate-cost-azure-copy-btn" data-copy="${escapeHtml(`${row.name}: ${row.value}`)}" aria-label="Copy assumption row ${index + 1}" title="Copy row">
                        <i class="bi bi-clipboard" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    function buildRecommendationsHtml(recommendations) {
        return recommendations.map((recommendation) => `
            <section class="calculate-cost-azure-recommendation-card">
                <span class="calculate-cost-azure-basis-label">Recommendation</span>
                <strong>${escapeHtml(recommendation.title)}</strong>
                <span class="calculate-cost-azure-recommendation-copy">${escapeHtml(recommendation.copy)}</span>
            </section>
        `).join('');
    }

    function buildMethodologyHtml(result) {
        return `
            <section class="calculate-cost-azure-method-card">
                <span class="calculate-cost-azure-method-label">Model Scope</span>
                <span class="calculate-cost-azure-method-title">Included spend drivers</span>
                <span class="calculate-cost-azure-method-copy">This model covers Virtual Machines, Managed Disks, Blob Storage, Azure Functions, API Management, combined internet egress, support uplift, contingency, and any manual monthly adjustment you applied.</span>
            </section>
            <section class="calculate-cost-azure-method-card">
                <span class="calculate-cost-azure-method-label">Model Gaps</span>
                <span class="calculate-cost-azure-method-title">What is not priced automatically</span>
                <span class="calculate-cost-azure-method-copy">Taxes, Azure Front Door or CDN, NAT Gateway, load balancers, managed databases, observability, backups, support plan minimums, and private discount agreements are not automatically derived. Add them as explicit overrides or manual adjustments when they matter.</span>
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
        resultSummary.classList.add('calculate-cost-azure-result-summary');
        resultSummary.dataset.resultTone = 'ready';
        resultSummary.dataset.resultLayout = 'cost_overview';
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

                if (config.hiddenInput === computeInstanceInput) {
                    syncCustomInstanceState();
                }
            });
        });
    });

    setSortOption(sortInput.value || 'id', false);

    sortOptionButtons.forEach((button) => {
        button.addEventListener('click', function () {
            setSortOption(button.dataset.sortValue || 'id', true);
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
        setLoadingState('Estimating Azure monthly spend...');

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

// ns:start family._base.workspace.06_output-toolbar
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

// ns:end family._base.workspace.06_output-toolbar
// ns:start family._base.workspace.08_json-restore
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

// ns:end family._base.workspace.08_json-restore
    setLoadingState('Build an estimate to review line-item cost drivers, service mix, and exportable JSON.');
    initializeInfraStackCustomDropdowns(document);
});
// ns:end family._base.workspace.00_shell
// ns:start family._base.workspace.07_table-output
/* table-output-standard:start */
(function setupCalculateCostAzureTableOutputStandard() {
    const rootSelector = '.calculate-cost-azure-tool';
    const tableSelector = '.tool-result-table tbody tr, .calculate-cost-azure-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .calculate-cost-azure-table tbody';
    const clampClass = 'calculate-cost-azure-table-cell-text';
    const cellClampClass = 'calculate-cost-azure-cell-clamp';
    const statusColumnClass = 'calculate-cost-azure-table-status-cell';

    function hasActionColumn(cells, table) {
        const lastCell = cells[cells.length - 1];
        const lastHead = table ? table.querySelector('thead th:last-child') : null;
        const headText = lastHead ? String(lastHead.textContent || '') : '';

        return Boolean(
            lastCell && lastCell.querySelector('button, [data-copy-row], [data-inventory-copy-row], [data-control-copy-row], [data-options-copy], [data-operation-copy], [data-copy-value]')
        ) || /copy|action|actions/i.test(headText);
    }

    function isStatusLikeHeader(text) {
        return /^(status|signal|criticality|severity|state|health|outcome|result|level|label)$/i.test(String(text || '').trim());
    }

    function getBodyCells(row) {
        return Array.from(row.children).filter(function filterCells(cell) {
            return cell.tagName && cell.tagName.toLowerCase() === 'td';
        });
    }

    function applyStatusAlignment(root) {
        root.querySelectorAll('.tool-result-table, .calculate-cost-azure-table').forEach(function alignStatusTable(table) {
            const headers = Array.from(table.querySelectorAll('thead th'));
            const rows = Array.from(table.querySelectorAll('tbody tr'));

            table.querySelectorAll('.' + statusColumnClass).forEach(function clearStatusCell(cell) {
                cell.classList.remove(statusColumnClass);
            });

            headers.forEach(function alignStatusColumn(header, index) {
                const statusLike = isStatusLikeHeader(header.textContent);
                header.classList.toggle(statusColumnClass, statusLike);

                if (!statusLike) {
                    return;
                }

                rows.forEach(function alignStatusCell(row) {
                    const cells = getBodyCells(row);
                    const cell = cells[index];

                    if (cell && cell.colSpan <= 1) {
                        cell.classList.add(statusColumnClass);
                    }
                });
            });
        });
    }

    function clampCell(cell) {
        if (!cell || cell.colSpan > 1 || cell.querySelector('.' + clampClass + ', .' + cellClampClass)) {
            return;
        }

        if (cell.children.length === 1 && !cell.firstElementChild.matches('button')) {
            cell.firstElementChild.classList.add(clampClass);
            return;
        }

        const wrapper = document.createElement('span');
        wrapper.className = clampClass;

        while (cell.firstChild) {
            wrapper.appendChild(cell.firstChild);
        }

        cell.appendChild(wrapper);
    }

    function applyTableOutputClamp() {
        const root = document.querySelector(rootSelector);
        if (!root) {
            return;
        }

        applyStatusAlignment(root);

        root.querySelectorAll(tableSelector).forEach(function clampRow(row) {
            const cells = getBodyCells(row);
            const table = row.closest('table');
            const actionColumn = hasActionColumn(cells, table);

            cells.forEach(function clampDataCell(cell, index) {
                const isFirst = index === 0;
                const isAction = actionColumn && index === cells.length - 1;

                if (!isFirst && !isAction) {
                    clampCell(cell);
                }
            });
        });
    }

    function observeTables() {
        const root = document.querySelector(rootSelector);
        if (!root) {
            return;
        }

        root.querySelectorAll(tbodySelector).forEach(function observeBody(tbody) {
            if (tbody.dataset.tableOutputClampObserver === 'true') {
                return;
            }

            tbody.dataset.tableOutputClampObserver = 'true';
            new MutationObserver(applyTableOutputClamp).observe(tbody, {
                childList: true,
                subtree: true
            });
        });

        applyTableOutputClamp();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeTables);
    } else {
        observeTables();
    }
}());
/* table-output-standard:end */
// ns:end family._base.workspace.07_table-output
