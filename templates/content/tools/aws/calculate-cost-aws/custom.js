// custom.js

// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:start family.calculate.workspace.04_visual-contract
// Accepted divergence: calculate visual contract remains tool-local until section-safe extraction is applied.
// ns:end family.calculate.workspace.04_visual-contract
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

installInfraStackResultSummaryNormalizer('calculate-cost-aws');
// ns:end family._base.workspace.05_result-summary

// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.

// ns:start family._base.workspace.00_shell
document.addEventListener('DOMContentLoaded', function () {
// ns:start family._base.workspace.01_input-brief
    const form = document.getElementById('calculateCostAwsForm');
    const labelInput = document.getElementById('calculateCostAwsLabel');
// ns:end family._base.workspace.01_input-brief
// ns:start family._base.workspace.02_basic-settings
    const presetInput = document.getElementById('calculateCostAwsPreset');
    const applyPresetButton = document.getElementById('calculateCostAwsApplyPreset');
// ns:end family._base.workspace.02_basic-settings
    const submitButton = document.getElementById('calculateCostAwsSubmit');
    const resetButton = document.getElementById('calculateCostAwsReset');

// ns:start family._base.workspace.03_custom-settings
    const includeEc2Input = document.getElementById('calculateCostAwsIncludeEc2');
    const includeEbsInput = document.getElementById('calculateCostAwsIncludeEbs');
    const includeS3Input = document.getElementById('calculateCostAwsIncludeS3');
    const includeLambdaInput = document.getElementById('calculateCostAwsIncludeLambda');
    const includeApiInput = document.getElementById('calculateCostAwsIncludeApi');

    const ec2InstanceInput = document.getElementById('calculateCostAwsEc2Instance');
    const ec2CustomOptionLabel = document.getElementById('calculateCostAwsEc2CustomOptionLabel');
    const ec2PurchaseInput = document.getElementById('calculateCostAwsEc2Purchase');
    const ec2CustomFields = document.getElementById('calculateCostAwsEc2CustomFields');
    const ec2CustomHint = document.getElementById('calculateCostAwsEc2CustomHint');
    const ec2CustomLabelInput = document.getElementById('calculateCostAwsEc2CustomLabel');
    const ec2CustomVcpuInput = document.getElementById('calculateCostAwsEc2CustomVcpu');
    const ec2CustomMemoryGiBInput = document.getElementById('calculateCostAwsEc2CustomMemoryGiB');
    const ec2CountInput = document.getElementById('calculateCostAwsEc2Count');
    const ec2HoursInput = document.getElementById('calculateCostAwsEc2Hours');

    const ebsStorageGbInput = document.getElementById('calculateCostAwsEbsStorageGb');
    const ebsIopsInput = document.getElementById('calculateCostAwsEbsIops');
    const ebsThroughputInput = document.getElementById('calculateCostAwsEbsThroughput');

    const s3StorageGbInput = document.getElementById('calculateCostAwsS3StorageGb');
    const s3EgressGbInput = document.getElementById('calculateCostAwsS3EgressGb');
    const s3GetRequestsKInput = document.getElementById('calculateCostAwsS3GetRequestsK');
    const s3PutRequestsKInput = document.getElementById('calculateCostAwsS3PutRequestsK');

    const lambdaRequestsMillionInput = document.getElementById('calculateCostAwsLambdaRequestsMillion');
    const lambdaDurationMsInput = document.getElementById('calculateCostAwsLambdaDurationMs');
    const lambdaMemoryMbInput = document.getElementById('calculateCostAwsLambdaMemoryMb');

    const apiTypeInput = document.getElementById('calculateCostAwsApiType');
    const apiRequestsMillionInput = document.getElementById('calculateCostAwsApiRequestsMillion');
    const apiResponseKbInput = document.getElementById('calculateCostAwsApiResponseKb');

    const sharedEgressGbInput = document.getElementById('calculateCostAwsSharedEgressGb');
    const supportPctInput = document.getElementById('calculateCostAwsSupportPct');
    const contingencyPctInput = document.getElementById('calculateCostAwsContingencyPct');
    const manualAdjustmentInput = document.getElementById('calculateCostAwsManualAdjustment');

    const freeTierLambdaInput = document.getElementById('calculateCostAwsFreeTierLambda');
    const freeTierApiInput = document.getElementById('calculateCostAwsFreeTierApi');
    const freeTierEgressInput = document.getElementById('calculateCostAwsFreeTierEgress');
    const regionalUpliftPctInput = document.getElementById('calculateCostAwsRegionalUpliftPct');

    const ec2HourlyOverrideInput = document.getElementById('calculateCostAwsEc2HourlyOverride');
    const ebsStorageRateInput = document.getElementById('calculateCostAwsEbsStorageRate');
    const ebsIopsRateInput = document.getElementById('calculateCostAwsEbsIopsRate');
    const ebsThroughputRateInput = document.getElementById('calculateCostAwsEbsThroughputRate');
    const s3StorageRateInput = document.getElementById('calculateCostAwsS3StorageRate');
    const s3GetRateInput = document.getElementById('calculateCostAwsS3GetRate');
    const s3PutRateInput = document.getElementById('calculateCostAwsS3PutRate');
    const lambdaRequestRateInput = document.getElementById('calculateCostAwsLambdaRequestRate');
    const lambdaGbSecondRateInput = document.getElementById('calculateCostAwsLambdaGbSecondRate');
    const apiHttpFirstRateInput = document.getElementById('calculateCostAwsApiHttpFirstRate');
    const apiHttpNextRateInput = document.getElementById('calculateCostAwsApiHttpNextRate');
    const apiRestRateInput = document.getElementById('calculateCostAwsApiRestRate');
    const egressRateInput = document.getElementById('calculateCostAwsEgressRate');

// ns:end family._base.workspace.03_custom-settings
    const resultEmpty = document.getElementById('calculateCostAwsResultEmpty');
    const resultContent = document.getElementById('calculateCostAwsResultContent');
    const resultError = document.getElementById('calculateCostAwsResultError');
    const resultSummary = document.getElementById('calculateCostAwsResultSummary');
    const breakdownTableBody = document.getElementById('calculateCostAwsBreakdownTableBody');
    const serviceTableBody = document.getElementById('calculateCostAwsServiceTableBody');
    const assumptionTableBody = document.getElementById('calculateCostAwsAssumptionTableBody');
    const recommendationsWrap = document.getElementById('calculateCostAwsRecommendations');
    const methodologyWrap = document.getElementById('calculateCostAwsMethodology');
    const jsonOutput = document.getElementById('calculateCostAwsJsonOutput');

    const sortInput = document.getElementById('calculateCostAwsSort');
    const sortSummary = document.getElementById('calculateCostAwsSortSummary');
    const sortOptionButtons = Array.from(document.querySelectorAll('.calculate-cost-aws-sort-option'));
    const sortSelect = document.getElementById('calculateCostAwsSortSelect');
    const exportPdfButton = document.getElementById('calculateCostAwsExportPdf');
    const downloadCsvButton = document.getElementById('calculateCostAwsDownloadCsv');
    const copyJsonButton = document.getElementById('calculateCostAwsCopyJson');
    const downloadJsonButton = document.getElementById('calculateCostAwsDownloadJson');
    const importJsonButton = document.getElementById('calculateCostAwsImportJsonButton');
    const importJsonInput = document.getElementById('calculateCostAwsImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.calculate-cost-aws-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.calculate-cost-aws-tab-panel'));

    const serviceRefs = {
        ec2: {
            checkbox: includeEc2Input,
            body: document.getElementById('calculateCostAwsEc2Body'),
            card: document.querySelector('[data-service-card="ec2"]')
        },
        ebs: {
            checkbox: includeEbsInput,
            body: document.getElementById('calculateCostAwsEbsBody'),
            card: document.querySelector('[data-service-card="ebs"]')
        },
        s3: {
            checkbox: includeS3Input,
            body: document.getElementById('calculateCostAwsS3Body'),
            card: document.querySelector('[data-service-card="s3"]')
        },
        lambda: {
            checkbox: includeLambdaInput,
            body: document.getElementById('calculateCostAwsLambdaBody'),
            card: document.querySelector('[data-service-card="lambda"]')
        },
        api: {
            checkbox: includeApiInput,
            body: document.getElementById('calculateCostAwsApiBody'),
            card: document.querySelector('[data-service-card="api"]')
        }
    };

    initMarkdownCopyButtons();

    if (
        !form ||
        !labelInput ||
        !presetInput ||
        !applyPresetButton ||
        !submitButton ||
        !resetButton ||
        !includeEc2Input ||
        !includeEbsInput ||
        !includeS3Input ||
        !includeLambdaInput ||
        !includeApiInput ||
        !ec2InstanceInput ||
        !ec2CustomOptionLabel ||
        !ec2PurchaseInput ||
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

    const nativeSelectInputs = [
        presetInput,
        ec2InstanceInput,
        ec2PurchaseInput,
        apiTypeInput
    ];

    const PURCHASE_MODE_LABELS = {
        onDemand: 'On-Demand',
        spot: 'Spot',
        savings1: 'Savings Plan 1yr',
        savings3: 'Savings Plan 3yr',
        reserved1: 'Reserved 1yr',
        reserved3: 'Reserved 3yr'
    };

    const STARTER_RATES = {
        ebsStorage: 0.08,
        ebsIops: 0.005,
        ebsThroughput: 0.06,
        s3Storage: 0.023,
        s3GetPer1k: 0.0004,
        s3PutPer1k: 0.005,
        lambdaRequestsPerMillion: 0.20,
        lambdaGbSecond: 0.0000166667,
        apiHttpFirstPerMillion: 1.00,
        apiHttpNextPerMillion: 0.90,
        apiRestPerMillion: 3.50,
        egressPerGb: 0.09
    };

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

    const PRESETS = {
        blank: {
            label: 'AWS workload estimate',
            includeEc2: false,
            includeEbs: false,
            includeS3: false,
            includeLambda: false,
            includeApi: false,
            ec2Instance: 't4g.medium',
            ec2Purchase: 'onDemand',
            ec2Count: 1,
            ec2Hours: 730,
            ebsStorageGb: 0,
            ebsIops: 3000,
            ebsThroughput: 125,
            s3StorageGb: 0,
            s3EgressGb: 0,
            s3GetRequestsK: 0,
            s3PutRequestsK: 0,
            lambdaRequestsMillion: 0,
            lambdaDurationMs: 120,
            lambdaMemoryMb: 512,
            apiType: 'http',
            apiRequestsMillion: 0,
            apiResponseKb: 16,
            sharedEgressGb: 0,
            supportPct: 0,
            contingencyPct: 10,
            manualAdjustment: 0,
            freeTierLambda: true,
            freeTierApi: true,
            freeTierEgress: true,
            regionalUpliftPct: 0
        },
        'serverless-api': {
            label: 'Serverless API',
            includeEc2: false,
            includeEbs: false,
            includeS3: true,
            includeLambda: true,
            includeApi: true,
            ec2Instance: 't4g.medium',
            ec2Purchase: 'onDemand',
            ec2Count: 0,
            ec2Hours: 730,
            ebsStorageGb: 0,
            ebsIops: 3000,
            ebsThroughput: 125,
            s3StorageGb: 80,
            s3EgressGb: 40,
            s3GetRequestsK: 900,
            s3PutRequestsK: 120,
            lambdaRequestsMillion: 6,
            lambdaDurationMs: 180,
            lambdaMemoryMb: 512,
            apiType: 'http',
            apiRequestsMillion: 12,
            apiResponseKb: 48,
            sharedEgressGb: 20,
            supportPct: 0,
            contingencyPct: 12,
            manualAdjustment: 0,
            freeTierLambda: true,
            freeTierApi: true,
            freeTierEgress: true,
            regionalUpliftPct: 0
        },
        'lean-web': {
            label: 'Lean web platform',
            includeEc2: true,
            includeEbs: true,
            includeS3: true,
            includeLambda: true,
            includeApi: true,
            ec2Instance: 't4g.medium',
            ec2Purchase: 'onDemand',
            ec2Count: 2,
            ec2Hours: 730,
            ebsStorageGb: 160,
            ebsIops: 3000,
            ebsThroughput: 125,
            s3StorageGb: 250,
            s3EgressGb: 180,
            s3GetRequestsK: 2200,
            s3PutRequestsK: 120,
            lambdaRequestsMillion: 1.2,
            lambdaDurationMs: 140,
            lambdaMemoryMb: 512,
            apiType: 'http',
            apiRequestsMillion: 8,
            apiResponseKb: 32,
            sharedEgressGb: 120,
            supportPct: 8,
            contingencyPct: 10,
            manualAdjustment: 0,
            freeTierLambda: true,
            freeTierApi: true,
            freeTierEgress: true,
            regionalUpliftPct: 0
        },
        'steady-platform': {
            label: 'Steady application platform',
            includeEc2: true,
            includeEbs: true,
            includeS3: true,
            includeLambda: true,
            includeApi: true,
            ec2Instance: 'm7g.medium',
            ec2Purchase: 'savings1',
            ec2Count: 6,
            ec2Hours: 730,
            ebsStorageGb: 900,
            ebsIops: 6000,
            ebsThroughput: 250,
            s3StorageGb: 1200,
            s3EgressGb: 350,
            s3GetRequestsK: 8000,
            s3PutRequestsK: 500,
            lambdaRequestsMillion: 4.5,
            lambdaDurationMs: 220,
            lambdaMemoryMb: 1024,
            apiType: 'rest',
            apiRequestsMillion: 25,
            apiResponseKb: 28,
            sharedEgressGb: 500,
            supportPct: 10,
            contingencyPct: 8,
            manualAdjustment: 0,
            freeTierLambda: false,
            freeTierApi: false,
            freeTierEgress: false,
            regionalUpliftPct: 0
        }
    };

    let latestResult = null;
    let echartsPromise = null;
    let spendRingChart = null;
    let spendRingResizeHandler = null;
    const ECHARTS_CDN_URL = 'https://cdn.jsdelivr.net/npm/echarts@6/dist/echarts.min.js';
    const NUMERIC_INPUT_DECORATORS = {
        calculateCostAwsEc2CustomVcpu: {
            suffix: 'vCPU'
        },
        calculateCostAwsEc2CustomMemoryGiB: {
            suffix: 'GiB'
        },
        calculateCostAwsEc2Count: {
            suffix: 'instances'
        },
        calculateCostAwsEc2Hours: {
            suffix: 'hours'
        },
        calculateCostAwsEbsStorageGb: {
            suffix: 'GB'
        },
        calculateCostAwsEbsIops: {
            suffix: 'IOPS'
        },
        calculateCostAwsEbsThroughput: {
            suffix: 'MB/s'
        },
        calculateCostAwsS3StorageGb: {
            suffix: 'GB'
        },
        calculateCostAwsS3EgressGb: {
            suffix: 'GB'
        },
        calculateCostAwsS3GetRequestsK: {
            suffix: '1k'
        },
        calculateCostAwsS3PutRequestsK: {
            suffix: '1k'
        },
        calculateCostAwsLambdaRequestsMillion: {
            suffix: '1M'
        },
        calculateCostAwsLambdaDurationMs: {
            suffix: 'ms'
        },
        calculateCostAwsLambdaMemoryMb: {
            suffix: 'MB'
        },
        calculateCostAwsApiRequestsMillion: {
            suffix: '1M'
        },
        calculateCostAwsApiResponseKb: {
            suffix: 'KB'
        },
        calculateCostAwsSharedEgressGb: {
            suffix: 'GB'
        },
        calculateCostAwsSupportPct: {
            suffix: '%'
        },
        calculateCostAwsContingencyPct: {
            suffix: '%'
        },
        calculateCostAwsManualAdjustment: {
            prefix: '$'
        },
        calculateCostAwsRegionalUpliftPct: {
            suffix: '%'
        },
        calculateCostAwsEc2HourlyOverride: {
            prefix: '$',
            suffix: 'instance-hour'
        },
        calculateCostAwsEbsStorageRate: {
            prefix: '$',
            suffix: 'GB-month'
        },
        calculateCostAwsEbsIopsRate: {
            prefix: '$',
            suffix: 'IOPS-month'
        },
        calculateCostAwsEbsThroughputRate: {
            prefix: '$',
            suffix: 'MB/s-month'
        },
        calculateCostAwsS3StorageRate: {
            prefix: '$',
            suffix: 'GB-month'
        },
        calculateCostAwsS3GetRate: {
            prefix: '$',
            suffix: '1k GET'
        },
        calculateCostAwsS3PutRate: {
            prefix: '$',
            suffix: '1k PUT'
        },
        calculateCostAwsLambdaRequestRate: {
            prefix: '$',
            suffix: '1M req'
        },
        calculateCostAwsLambdaGbSecondRate: {
            prefix: '$',
            suffix: 'GB-s'
        },
        calculateCostAwsApiHttpFirstRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostAwsApiHttpNextRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostAwsApiRestRate: {
            prefix: '$',
            suffix: '1M'
        },
        calculateCostAwsEgressRate: {
            prefix: '$',
            suffix: 'GB'
        }
    };

    function buildInputAddon(text, position) {
        const addon = document.createElement('span');

        addon.className = `calculate-cost-aws-input-addon calculate-cost-aws-input-addon--${position}`;
        addon.textContent = text;

        return addon;
    }

    function decorateNumericInput(input, decorator) {
        if (!input || input.dataset.calculateCostAwsDecorated === '1') {
            return;
        }

        const parent = input.parentNode;
        const wrapper = document.createElement('div');

        if (!parent) {
            return;
        }

        wrapper.className = 'calculate-cost-aws-input-group';
        input.classList.add('calculate-cost-aws-input-group-control');
        input.dataset.calculateCostAwsDecorated = '1';

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
        const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.calculate-cost-aws-prompt-pre'));
        const promptCopyButtons = document.querySelectorAll('.calculate-cost-aws-prompt-copy-btn');

        promptCopyButtons.forEach((button) => {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;
            const label = button.querySelector('span') || button;

            if (!code) {
                button.disabled = true;
                return;
            }

            if (button.dataset.calculateCostAwsCopyBound === '1') {
                return;
            }

            button.dataset.calculateCostAwsCopyBound = '1';

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

        const codeBlocks = document.querySelectorAll('.markdown-content pre:not(.calculate-cost-aws-prompt-pre)');

        codeBlocks.forEach((pre) => {
            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            let button = pre.querySelector('.markdown-copy-btn');

            if (button && button.dataset.calculateCostAwsCopyBound === '1') {
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

            button.dataset.calculateCostAwsCopyBound = '1';

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
        const icon = button.querySelector('i');
        const originalIcon = button.dataset.defaultIcon || (icon ? icon.className : '');

        if (icon && !button.dataset.defaultIcon) {
            button.dataset.defaultIcon = originalIcon;
        }

        button.classList.toggle('copied', isCopied);
        button.classList.toggle('is-copied', isCopied);
        button.classList.toggle('failed', !isCopied);
        if (icon) {
            icon.className = isCopied ? 'bi bi-check2' : 'bi bi-x-lg';
        }

        window.setTimeout(() => {
            button.classList.remove('copied', 'is-copied', 'failed');
            if (icon && button.dataset.defaultIcon) {
                icon.className = button.dataset.defaultIcon;
            }
        }, 1400);
    }

    function loadECharts() {
        if (window.echarts && typeof window.echarts.init === 'function') {
            return Promise.resolve(window.echarts);
        }

        if (!echartsPromise) {
            echartsPromise = new Promise((resolve) => {
                const existingScript = document.querySelector('script[data-calculate-cost-aws-echarts]');

                if (existingScript) {
                    existingScript.addEventListener('load', () => resolve(window.echarts || null), { once: true });
                    existingScript.addEventListener('error', () => resolve(null), { once: true });
                    return;
                }

                const script = document.createElement('script');
                script.src = ECHARTS_CDN_URL;
                script.async = true;
                script.dataset.calculateCostAwsEcharts = 'true';
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

        document.execCommand('copy');
        textarea.remove();
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
        return String(value || 'aws-cost-estimate')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'aws-cost-estimate';
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

    function setNativeSelectValue(selectElement, value, fallbackValue) {
        const requestedValue = String(value || '');
        const fallback = typeof fallbackValue === 'undefined' ? selectElement.value : String(fallbackValue || '');
        const options = Array.from(selectElement.options);
        const hasRequestedValue = options.some((option) => option.value === requestedValue);
        const hasFallbackValue = options.some((option) => option.value === fallback);

        selectElement.value = hasRequestedValue
            ? requestedValue
            : hasFallbackValue
                ? fallback
                : options.length
                    ? options[0].value
                    : '';
    }

    function getNativeSelectLabel(selectElement, fallbackLabel) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];

        return selectedOption ? selectedOption.textContent.trim() : fallbackLabel;
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

    function setSubmitButtonLabel(label) {
        submitButton.innerHTML = `<i class="bi bi-calculator" aria-hidden="true"></i><span>${escapeHtml(label)}</span>`;
    }

    function toggleSubmitState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            setSubmitButtonLabel('Estimating...');
            return;
        }

        submitButton.disabled = false;
        setSubmitButtonLabel('Estimate');
    }

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

    function validateQuery(query) {
        if (!PRESETS[query.preset]) {
            return 'Choose a supported preset.';
        }

        if (query.includeEc2) {
            if (query.ec2Instance === 'custom') {
                if (query.ec2CustomVcpu <= 0 || query.ec2CustomMemoryGiB <= 0) {
                    return 'Set custom EC2 vCPU and memory when using Custom size.';
                }

                if (query.overrides.ec2Hourly === null) {
                    return 'Set EC2 hourly override in Custom when using Custom size.';
                }
            } else if (!EC2_CATALOG[query.ec2Instance]) {
                return 'Choose a supported EC2 instance type.';
            }

            if (!PURCHASE_MODE_LABELS[query.ec2Purchase]) {
                return 'Choose a supported EC2 purchase model.';
            }
        }

        if (!['http', 'rest'].includes(query.apiType)) {
            return 'Choose a supported API Gateway type.';
        }

        if (!Number.isFinite(query.manualAdjustment)) {
            return 'Enter a valid manual adjustment value.';
        }

        const hasActiveServiceUsage = (
            (query.includeEc2 && query.ec2Count > 0 && query.ec2Hours > 0) ||
            (query.includeEbs && query.ebsStorageGb > 0) ||
            (query.includeS3 && (query.s3StorageGb > 0 || query.s3EgressGb > 0 || query.s3GetRequestsK > 0 || query.s3PutRequestsK > 0)) ||
            (query.includeLambda && query.lambdaRequestsMillion > 0) ||
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

    function buildImportedPayloadState(payload) {
        return getImportedQuery(payload);
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

    function resetResultSort() {
        setSortOption('id', false);
    }

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
        setNativeSelectValue(presetInput, presetKey, 'lean-web');

        includeEc2Input.checked = getBooleanValue(importedQuery.includeEc2, preset.includeEc2);
        includeEbsInput.checked = getBooleanValue(importedQuery.includeEbs, preset.includeEbs);
        includeS3Input.checked = getBooleanValue(importedQuery.includeS3, preset.includeS3);
        includeLambdaInput.checked = getBooleanValue(importedQuery.includeLambda, preset.includeLambda);
        includeApiInput.checked = getBooleanValue(importedQuery.includeApi, preset.includeApi);

        ec2CustomLabelInput.value = String(importedQuery.ec2CustomLabel || '').trim();
        setNumberInputValue(ec2CustomVcpuInput, importedQuery.ec2CustomVcpu, 4);
        setNumberInputValue(ec2CustomMemoryGiBInput, importedQuery.ec2CustomMemoryGiB, 16);
        setNativeSelectValue(ec2InstanceInput, ec2Instance, preset.ec2Instance);
        setNativeSelectValue(ec2PurchaseInput, ec2Purchase, preset.ec2Purchase);
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

        setNativeSelectValue(apiTypeInput, apiType, preset.apiType);
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

    function applyPreset(presetKey) {
        const preset = PRESETS[presetKey] || PRESETS['lean-web'];

        labelInput.value = preset.label;
        setNativeSelectValue(presetInput, presetKey, 'lean-web');

        includeEc2Input.checked = preset.includeEc2;
        includeEbsInput.checked = preset.includeEbs;
        includeS3Input.checked = preset.includeS3;
        includeLambdaInput.checked = preset.includeLambda;
        includeApiInput.checked = preset.includeApi;

        setNativeSelectValue(ec2InstanceInput, preset.ec2Instance, 'custom');
        ec2CustomLabelInput.value = '';
        ec2CustomVcpuInput.value = 4;
        ec2CustomMemoryGiBInput.value = 16;
        setNativeSelectValue(ec2PurchaseInput, preset.ec2Purchase, 'onDemand');
        updateCustomInstanceLabel();
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

        setNativeSelectValue(apiTypeInput, preset.apiType, 'http');
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

    function syncCustomInstanceState() {
        const isCustomInstance = ec2InstanceInput.value === 'custom' && includeEc2Input.checked;

        ec2CustomFields.classList.toggle('d-none', !isCustomInstance);
        ec2CustomHint.classList.toggle('d-none', !isCustomInstance);

        [ec2CustomLabelInput, ec2CustomVcpuInput, ec2CustomMemoryGiBInput].forEach((input) => {
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

            Array.from(serviceRef.body.querySelectorAll('.calculate-cost-aws-select')).forEach((selectElement) => {
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

    function calculateEc2(query, assumptions) {
        if (!query.includeEc2 || query.ec2Count <= 0 || query.ec2Hours <= 0) {
            assumptions.push({
                name: 'EC2 pricing basis',
                value: 'Disabled',
                note: 'No EC2 runtime cost is included in this estimate.'
            });

            return {
                lineItems: []
            };
        }

        const instance = query.ec2Instance === 'custom'
            ? {
                label: query.ec2CustomLabel || 'Custom instance',
                family: 'User-defined profile',
                vcpu: query.ec2CustomVcpu,
                memoryGiB: query.ec2CustomMemoryGiB,
                rates: {
                    onDemand: query.overrides.ec2Hourly,
                    spot: query.overrides.ec2Hourly,
                    savings1: query.overrides.ec2Hourly,
                    savings3: query.overrides.ec2Hourly,
                    reserved1: query.overrides.ec2Hourly,
                    reserved3: query.overrides.ec2Hourly
                }
            }
            : EC2_CATALOG[query.ec2Instance];
        const resolvedRate = resolveRate(instance.rates[query.ec2Purchase], query.overrides.ec2Hourly, query.regionalUpliftPct);
        const monthlyCost = resolvedRate.value * query.ec2Count * query.ec2Hours;

        assumptions.push({
            name: 'EC2 pricing basis',
            value: `${instance.label} • ${PURCHASE_MODE_LABELS[query.ec2Purchase]}`,
            note: `${resolvedRate.source}. ${instance.vcpu} vCPU, ${instance.memoryGiB} GiB memory.${query.ec2Instance === 'custom' ? ' Custom size is priced from the EC2 hourly override.' : ''}`
        });

        return {
            lineItems: [
                {
                    service: 'EC2',
                    component: `${instance.label} ${PURCHASE_MODE_LABELS[query.ec2Purchase]}`,
                    usage: `${query.ec2Count} instance(s) × ${formatNumber(query.ec2Hours, 0)} h`,
                    unitBasis: `${formatRate(resolvedRate.value, 4)} / instance-hour`,
                    monthly: monthlyCost,
                    annual: monthlyCost * 12,
                    copyValue: `${instance.label} ${PURCHASE_MODE_LABELS[query.ec2Purchase]} | ${query.ec2Count} instances | ${query.ec2Hours} hours | ${formatCurrency(monthlyCost)}`
                }
            ]
        };
    }

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
                let signalClass = 'calculate-cost-aws-signal-light';

                if (sharePct >= 40) {
                    signal = 'Heavy';
                    signalClass = 'calculate-cost-aws-signal-heavy';
                } else if (sharePct >= 15) {
                    signal = 'Medium';
                    signalClass = 'calculate-cost-aws-signal-medium';
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
                value: 'AWS starter cost estimate',
                note: 'Starter catalog in USD with transparent assumptions and editable overrides.'
            },
            {
                name: 'Preset',
                value: getNativeSelectLabel(presetInput, 'Selected preset'),
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
        const chartElement = document.getElementById('calculateCostAwsSpendChart');
        const ringElement = document.getElementById('calculateCostAwsSpendRing');

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

    function buildSummaryHtml(result) {
        const presetLabel = getNativeSelectLabel(presetInput, 'Selected preset');
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
            <header class="calculate-cost-aws-result-header" aria-label="Result summary header">
                <div class="calculate-cost-aws-result-header-main">
                    <span class="calculate-cost-aws-result-header-icon" aria-hidden="true"><i class="bi bi-calculator"></i></span>
                    <div class="calculate-cost-aws-result-header-copy">
                        <h2 class="calculate-cost-aws-result-header-title">Result Summary</h2>
                        <p>Overview of the current AWS estimate result and key metrics</p>
                    </div>
                </div>
                <div class="calculate-cost-aws-result-header-meta" aria-label="Result summary status">
                    <span class="calculate-cost-aws-result-header-chip calculate-cost-aws-result-chip-ready"><span class="calculate-cost-aws-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Estimated</span></span>
                    <span class="calculate-cost-aws-result-header-chip calculate-cost-aws-result-chip-updated"><span class="calculate-cost-aws-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(generatedAtText)}</span></span>
                </div>
            </header>

            <div class="calculate-cost-aws-result-hero-grid" aria-live="polite">
                <article class="calculate-cost-aws-result-card calculate-cost-aws-result-card-primary" data-result-visual="ring" aria-label="Primary estimate result">
                    <div class="calculate-cost-aws-result-primary-heading calculate-cost-aws-result-visual-copy calculate-cost-aws-result-visual-copy-top"><div class="calculate-cost-aws-result-kicker">Primary Result</div><h3 class="calculate-cost-aws-result-title calculate-cost-aws-result-title-center">Estimated run rate</h3></div>
                    <div class="calculate-cost-aws-result-primary-visual" id="calculateCostAwsResultVisual" aria-label="Primary estimate result visual">
                        <span class="calculate-cost-aws-result-card-icon calculate-cost-aws-result-card-icon-primary" aria-hidden="true"><i class="bi bi-cash-coin"></i></span>
                        <div class="calculate-cost-aws-result-ring calculate-cost-aws-spend-ring" id="calculateCostAwsSpendRing" style="--calculate-cost-aws-result-progress: ${escapeHtml(String(progressAngle))}deg; --progress-angle: ${escapeHtml(String(progressAngle))}deg; --calculate-cost-aws-result-value-chars: ${escapeHtml(String(primaryValueChars))};" aria-label="Estimated monthly AWS run rate ${escapeHtml(monthlyTotal)}">
                            <div class="calculate-cost-aws-spend-chart" id="calculateCostAwsSpendChart" aria-hidden="true"></div>
                            <div class="calculate-cost-aws-result-ring-center calculate-cost-aws-spend-value">
                                <strong class="calculate-cost-aws-result-ring-value">${escapeHtml(monthlyTotal)}</strong>
                                <span class="calculate-cost-aws-result-ring-unit">Monthly</span>
                            </div>
                        </div>
                    </div>
                    <div class="calculate-cost-aws-result-visual-copy">
                        <p class="calculate-cost-aws-result-copy calculate-cost-aws-result-copy-center">Modeled monthly total from the current assumptions.</p>
                    </div>
                    <span class="calculate-cost-aws-result-card-divider" aria-hidden="true"></span>
                    <div class="calculate-cost-aws-result-chip-row calculate-cost-aws-result-chip-row-center" aria-label="Primary result outcome">
                        <span class="calculate-cost-aws-result-chip calculate-cost-aws-result-chip-outcome calculate-cost-aws-result-chip-ready"><span class="calculate-cost-aws-result-chip-icon" aria-hidden="true"><i class="bi bi-cash-coin"></i></span><span>Monthly Estimate</span></span>
                    </div>
                </article>

                <article class="calculate-cost-aws-result-card calculate-cost-aws-result-card-summary" aria-label="Estimate summary">
                    <div class="calculate-cost-aws-result-summary-intro">
                        <span class="calculate-cost-aws-result-card-icon calculate-cost-aws-result-card-icon-summary" aria-hidden="true"><i class="bi bi-receipt"></i></span>
                        <div class="calculate-cost-aws-result-summary-copy">
                            <div class="calculate-cost-aws-result-kicker">Descriptive Summary</div>
                            <h3 class="calculate-cost-aws-result-title">AWS run-rate estimate</h3>
                            <p class="calculate-cost-aws-result-copy">Top driver: ${escapeHtml(topDriver)}. Totals are derived from the current assumptions, visible overrides, and generated service mix.</p>
                        </div>
                    </div>
                    <span class="calculate-cost-aws-result-card-divider" aria-hidden="true"></span>
                    <div class="calculate-cost-aws-result-chip-grid" aria-label="Estimate state">
                        <span class="calculate-cost-aws-result-chip calculate-cost-aws-result-chip-ready"><span class="calculate-cost-aws-result-chip-icon" aria-hidden="true"><i class="bi bi-check2-circle"></i></span><span>${escapeHtml(presetLabel)}</span></span>
                        <span class="calculate-cost-aws-result-chip calculate-cost-aws-result-chip-baseline"><span class="calculate-cost-aws-result-chip-icon" aria-hidden="true"><i class="bi bi-grid-3x3-gap"></i></span><span>${escapeHtml(String(activeServices))} services</span></span>
                        <span class="calculate-cost-aws-result-chip calculate-cost-aws-result-chip-${overrideTone}"><span class="calculate-cost-aws-result-chip-icon" aria-hidden="true"><i class="bi bi-sliders"></i></span><span>${escapeHtml(String(overrideCount))} overrides</span></span>
                        <span class="calculate-cost-aws-result-chip calculate-cost-aws-result-chip-baseline"><span class="calculate-cost-aws-result-chip-icon" aria-hidden="true"><i class="bi bi-graph-up-arrow"></i></span><span>Top driver: ${escapeHtml(topDriver)}</span></span>
                        <span class="calculate-cost-aws-result-chip calculate-cost-aws-result-chip-warning"><span class="calculate-cost-aws-result-chip-icon" aria-hidden="true"><i class="bi bi-hdd-network"></i></span><span>Egress: ${escapeHtml(combinedEgress)}</span></span>
                    </div>
                </article>
            </div>

            <div class="calculate-cost-aws-result-metric-grid" aria-label="Estimate metrics">
                <article class="calculate-cost-aws-result-metric-card calculate-cost-aws-result-metric-success">
                    <span class="calculate-cost-aws-result-metric-icon" aria-hidden="true"><i class="bi bi-calendar2-check"></i></span>
                    <span class="calculate-cost-aws-result-metric-label">Annual</span>
                    <strong class="calculate-cost-aws-result-metric-value">${escapeHtml(formatCurrency(result.totals.annualTotal))}</strong>
                    <span class="calculate-cost-aws-result-metric-copy">Projected from the current monthly run rate.</span>
                    <span class="calculate-cost-aws-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="calculate-cost-aws-result-metric-card calculate-cost-aws-result-metric-info">
                    <span class="calculate-cost-aws-result-metric-icon" aria-hidden="true"><i class="bi bi-sun"></i></span>
                    <span class="calculate-cost-aws-result-metric-label">Daily</span>
                    <strong class="calculate-cost-aws-result-metric-value">${escapeHtml(formatCurrency(result.totals.dailyTotal))}</strong>
                    <span class="calculate-cost-aws-result-metric-copy">Thirty-day planning average.</span>
                    <span class="calculate-cost-aws-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="calculate-cost-aws-result-metric-card calculate-cost-aws-result-metric-accent-tone">
                    <span class="calculate-cost-aws-result-metric-icon" aria-hidden="true"><i class="bi bi-clock"></i></span>
                    <span class="calculate-cost-aws-result-metric-label">Hourly</span>
                    <strong class="calculate-cost-aws-result-metric-value">${escapeHtml(formatCurrency(result.totals.hourlyTotal))}</strong>
                    <span class="calculate-cost-aws-result-metric-copy">Useful for long-running workload checks.</span>
                    <span class="calculate-cost-aws-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="calculate-cost-aws-result-metric-card calculate-cost-aws-result-metric-warning">
                    <span class="calculate-cost-aws-result-metric-icon" aria-hidden="true"><i class="bi bi-hdd-network"></i></span>
                    <span class="calculate-cost-aws-result-metric-label">Egress</span>
                    <strong class="calculate-cost-aws-result-metric-value">${escapeHtml(combinedEgress)}</strong>
                    <span class="calculate-cost-aws-result-metric-copy">Combined modeled outbound traffic.</span>
                    <span class="calculate-cost-aws-result-metric-accent" aria-hidden="true"></span>
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
                <td class="calculate-cost-aws-currency">${escapeHtml(formatCurrency(item.monthly))}</td>
                <td class="calculate-cost-aws-currency">${escapeHtml(formatCurrency(item.annual))}</td>
                <td class="calculate-cost-aws-copy-cell tool-table-action-cell">
                    <button type="button" class="calculate-cost-aws-copy-btn" data-copy="${escapeHtml(item.copyValue)}" aria-label="Copy breakdown row ${index + 1}" title="Copy row">
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
                <td class="calculate-cost-aws-currency">${escapeHtml(formatCurrency(row.monthly))}</td>
                <td class="calculate-cost-aws-currency">${escapeHtml(formatCurrency(row.annual))}</td>
                <td>${escapeHtml(formatPercent(row.sharePct))}</td>
                <td><span class="calculate-cost-aws-signal ${escapeHtml(row.signalClass)}">${escapeHtml(row.signal)}</span></td>
                <td class="calculate-cost-aws-copy-cell tool-table-action-cell">
                    <button type="button" class="calculate-cost-aws-copy-btn" data-copy="${escapeHtml(row.copyValue)}" aria-label="Copy service mix row ${index + 1}" title="Copy row">
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
                <td class="calculate-cost-aws-copy-cell tool-table-action-cell">
                    <button type="button" class="calculate-cost-aws-copy-btn" data-copy="${escapeHtml(`${row.name}: ${row.value}`)}" aria-label="Copy assumption row ${index + 1}" title="Copy row">
                        <i class="bi bi-clipboard" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    function buildRecommendationsHtml(recommendations) {
        return recommendations.map((recommendation) => `
            <section class="calculate-cost-aws-recommendation-card">
                <span class="calculate-cost-aws-basis-label">Recommendation</span>
                <strong>${escapeHtml(recommendation.title)}</strong>
                <span class="calculate-cost-aws-recommendation-copy">${escapeHtml(recommendation.copy)}</span>
            </section>
        `).join('');
    }

    function buildMethodologyHtml(result) {
        return `
            <section class="calculate-cost-aws-method-card">
                <span class="calculate-cost-aws-method-label">Model Scope</span>
                <span class="calculate-cost-aws-method-title">Included spend drivers</span>
                <span class="calculate-cost-aws-method-copy">This model covers EC2, EBS, S3, Lambda, API Gateway, combined internet egress, support uplift, contingency, and any manual monthly adjustment you applied.</span>
            </section>
            <section class="calculate-cost-aws-method-card">
                <span class="calculate-cost-aws-method-label">Model Gaps</span>
                <span class="calculate-cost-aws-method-title">What is not priced automatically</span>
                <span class="calculate-cost-aws-method-copy">Taxes, CloudFront, NAT gateways, load balancers, RDS, observability, backups, support plan minimums, and private discount agreements are not automatically derived. Add them as explicit overrides or manual adjustments when they matter.</span>
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
        resultSummary.classList.add('calculate-cost-aws-result-summary');
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

    nativeSelectInputs.forEach((selectElement) => {
        selectElement.addEventListener('change', function () {
            if (selectElement === ec2InstanceInput) {
                syncCustomInstanceState();
            }
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

    Object.values(serviceRefs).forEach((serviceRef) => {
        serviceRef.checkbox.addEventListener('change', syncServiceState);
    });

    [ec2CustomLabelInput, ec2CustomVcpuInput, ec2CustomMemoryGiBInput].forEach((input) => {
        input.addEventListener('input', function () {
            updateCustomInstanceLabel();

            if (ec2InstanceInput.value === 'custom') {
                syncCustomInstanceState();
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        toggleSubmitState(true);
        setLoadingState('Estimating AWS monthly spend...');

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
            applyImportedQuery(buildImportedPayloadState(payload));
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
});
// ns:end family._base.workspace.00_shell
// ns:start family._base.workspace.07_table-output
/* table-output-standard:start */
(function setupCalculateCostAwsTableOutputStandard() {
    const rootSelector = '.calculate-cost-aws-tool';
    const tableSelector = '.tool-result-table tbody tr, .calculate-cost-aws-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .calculate-cost-aws-table tbody';
    const clampClass = 'calculate-cost-aws-table-cell-text';
    const cellClampClass = 'calculate-cost-aws-cell-clamp';
    const statusColumnClass = 'calculate-cost-aws-table-status-cell';

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
        root.querySelectorAll('.tool-result-table, .calculate-cost-aws-table').forEach(function alignStatusTable(table) {
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

                if (isAction && cell.colSpan <= 1) {
                    cell.classList.add('tool-table-action-cell');
                    return;
                }

                if (!isFirst) {
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
