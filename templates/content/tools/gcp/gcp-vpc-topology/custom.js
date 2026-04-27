{{ include('content/tools/gcp/gcp-vpc-topology/assets/bin/model-core.js')|raw }}

const gcpVpcPresetCatalog = [
    {
        id: 'three-tier-web',
        label: '3-Tier Web',
        description: 'Public External HTTP(S) Load Balancer, private managed instance groups, Cloud SQL, single Cloud NAT.',
        prompt: 'Create a GCP VPC topology in us-central1 with 2 zones. Use public subnets for an internet-facing External HTTP(S) Load Balancer, private app subnets for Managed Instance Groups, and private data subnets for Cloud SQL. Add a single Cloud NAT, Private Service Connect for Cloud Storage and Secret Manager, Cloud Monitoring, and VPC Flow Logs.',
        defaults: {
            region: 'us-central1',
            cidr: '10.0.0.0/16',
            azCount: 2,
            natMode: 'single',
            appTier: 'ec2',
            database: 'rds',
            route53: true,
            cloudFront: false,
            waf: false,
            alb: true,
            bastion: false,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: false,
            transitGateway: false,
            cache: false
        }
    },
    {
        id: 'ecs-fargate',
        label: 'Cloud Run',
        description: 'Cloud CDN, Cloud Armor, Cloud Run, PostgreSQL, Redis, and per-zone Cloud NAT.',
        prompt: 'Build a GCP VPC topology in europe-west1 across 2 zones for an internet-facing Cloud Run platform. Put Cloud CDN and Cloud Armor in front of an External HTTP(S) Load Balancer, keep Cloud Run in private app subnets, use Cloud SQL for PostgreSQL in private data subnets, add Memorystore for Redis, Private Service Connect, Cloud Monitoring, VPC Flow Logs, and one Cloud NAT policy per zone.',
        defaults: {
            region: 'europe-west1',
            cidr: '10.20.0.0/16',
            azCount: 2,
            natMode: 'per-az',
            appTier: 'ecs',
            database: 'aurora',
            route53: true,
            cloudFront: true,
            waf: true,
            alb: true,
            bastion: false,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: false,
            transitGateway: false,
            cache: true
        }
    },
    {
        id: 'eks-platform',
        label: 'Private GKE',
        description: 'Three zone platform with private node pools, Private Service Connect, IAP, and observability.',
        prompt: 'Generate a GCP VPC topology in asia-southeast1 across 3 zones for a private GKE platform. Keep an External HTTP(S) Load Balancer in public subnets, node pools in private app subnets, Cloud SQL for PostgreSQL in private data subnets, Identity-Aware Proxy for controlled admin access, Private Service Connect, Cloud Monitoring, and VPC Flow Logs. Use one Cloud NAT policy per zone.',
        defaults: {
            region: 'asia-southeast1',
            cidr: '10.30.0.0/16',
            azCount: 3,
            natMode: 'per-az',
            appTier: 'eks',
            database: 'aurora',
            route53: true,
            cloudFront: false,
            waf: false,
            alb: true,
            bastion: true,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: false,
            transitGateway: false,
            cache: false
        }
    },
    {
        id: 'hybrid-shared',
        label: 'Hybrid Shared Services',
        description: 'Cloud VPN or Network Connectivity Center connectivity with shared service layers.',
        prompt: 'Design a GCP VPC topology in us-west1 across 2 zones for a hybrid environment. Use Cloud DNS, an internet-facing External HTTP(S) Load Balancer, Managed Instance Groups in private app subnets, Cloud SQL in private data subnets, Identity-Aware Proxy, Private Service Connect, Cloud Monitoring, VPC Flow Logs, Cloud VPN, and Network Connectivity Center for shared services. Use a single Cloud NAT.',
        defaults: {
            region: 'us-west1',
            cidr: '10.40.0.0/16',
            azCount: 2,
            natMode: 'single',
            appTier: 'ec2',
            database: 'rds',
            route53: true,
            cloudFront: false,
            waf: false,
            alb: true,
            bastion: true,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: true,
            transitGateway: true,
            cache: false
        }
    }
];

const GCP_VPC_TOOL_ID = GcpVpcModelCore.toolId;
const GCP_VPC_TOOL_VERSION = GcpVpcModelCore.toolVersion;
const gcpVpcRegionCatalog = GcpVpcModelCore.regionCatalog;
const gcpVpcSupportedRegions = GcpVpcModelCore.supportedRegions;
const gcpVpcAllowedNatModes = GcpVpcModelCore.allowedNatModes;
const gcpVpcAllowedAppTiers = GcpVpcModelCore.allowedAppTiers;
const gcpVpcAllowedDatabases = GcpVpcModelCore.allowedDatabases;

const gcpVpcIconSvgMap = {
    gcpVpc: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-VPC.svg')|json_encode|raw }},
    route53: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-DNS.svg')|json_encode|raw }},
    cloudFront: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-CDN.svg')|json_encode|raw }},
    waf: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-Armor.svg')|json_encode|raw }},
    internetGateway: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Internet-Edge.svg')|json_encode|raw }},
    applicationLoadBalancer: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-External-HTTPS-Load-Balancer.svg')|json_encode|raw }},
    vpcRouter: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-Router.svg')|json_encode|raw }},
    natGateway: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-NAT.svg')|json_encode|raw }},
    ec2: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Compute-Engine.svg')|json_encode|raw }},
    ec2AutoScaling: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Managed-Instance-Groups.svg')|json_encode|raw }},
    ecs: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-Run.svg')|json_encode|raw }},
    eks: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-GKE.svg')|json_encode|raw }},
    fargate: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-Run.svg')|json_encode|raw }},
    lambda: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-Functions.svg')|json_encode|raw }},
    rds: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-SQL.svg')|json_encode|raw }},
    aurora: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-SQL-PostgreSQL.svg')|json_encode|raw }},
    dynamodb: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Firestore.svg')|json_encode|raw }},
    elasticache: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Memorystore.svg')|json_encode|raw }},
    vpcEndpoints: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Private-Service-Connect.svg')|json_encode|raw }},
    vpcFlowLogs: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-VPC-Flow-Logs.svg')|json_encode|raw }},
    cloudWatch: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-Monitoring.svg')|json_encode|raw }},
    systemsManager: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Secret-Manager.svg')|json_encode|raw }},
    siteToSiteVpn: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Cloud-VPN.svg')|json_encode|raw }},
    transitGateway: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Network-Connectivity-Center.svg')|json_encode|raw }},
    bastion: {{ include('content/tools/gcp/gcp-vpc-topology/assets/icon/GCP-Identity-Aware-Proxy.svg')|json_encode|raw }}
};

document.addEventListener('DOMContentLoaded', function () {
    const promptInput = document.getElementById('gcpVpcPrompt');
    const generateButton = document.getElementById('gcpVpcGenerate');
    const resetButton = document.getElementById('gcpVpcReset');
    const errorState = document.getElementById('gcpVpcErrorState');
    const presetInput = document.getElementById('gcpVpcPreset');
    const presetDescription = document.getElementById('gcpVpcPresetDescription');
    const stageTitle = document.getElementById('gcpVpcStageTitle');
    const stageSubtitle = document.getElementById('gcpVpcStageSubtitle');
    const stageMeta = document.getElementById('gcpVpcStageMeta');
    const stageEmpty = document.getElementById('gcpVpcStageEmpty');
    const stageCanvas = document.getElementById('gcpVpcStageCanvas');
    const stageShell = document.getElementById('gcpVpcStageShell');
    const zoomControl = document.getElementById('gcpVpcZoomControl');
    const zoomLabel = document.getElementById('gcpVpcZoomLabel');
    const zoomInput = document.getElementById('gcpVpcZoomInput');
    const zoomOutButton = document.getElementById('gcpVpcZoomOut');
    const zoomInButton = document.getElementById('gcpVpcZoomIn');
    const zoomFitButton = document.getElementById('gcpVpcZoomFit');
    const zoomActualButton = document.getElementById('gcpVpcZoomActual');
    const zoomHideUiButton = document.getElementById('gcpVpcZoomHideUi');
    const fullscreenButton = document.getElementById('gcpVpcFullscreen');
    const resetLayoutButton = document.getElementById('gcpVpcResetLayout');
    const outputEmpty = document.getElementById('gcpVpcOutputEmpty');
    const outputContent = document.getElementById('gcpVpcOutputContent');
    const outputStatus = document.getElementById('gcpVpcOutputStatus');
    const inventoryTableBody = document.getElementById('gcpVpcInventoryTableBody');
    const inventorySortInput = document.getElementById('gcpVpcInventorySort');
    const inventorySortSelect = document.getElementById('gcpVpcInventorySortSelect');
    const inventorySortSummary = document.getElementById('gcpVpcInventorySortSummary');
    const inventorySortOptions = Array.from(document.querySelectorAll('.gcp-vpc-sort-option'));
    const jsonOutput = document.getElementById('gcpVpcJsonOutput');
    const promptSummary = document.getElementById('gcpVpcPromptSummary');
    const keywordList = document.getElementById('gcpVpcKeywordList');
    const assumptionList = document.getElementById('gcpVpcAssumptionList');
    const modelList = document.getElementById('gcpVpcModelList');
    const prosList = document.getElementById('gcpVpcProsList');
    const consList = document.getElementById('gcpVpcConsList');
    const selectedEmpty = document.getElementById('gcpVpcSelectedEmpty');
    const selectedEditor = document.getElementById('gcpVpcSelectedEditor');
    const selectedName = document.getElementById('gcpVpcSelectedName');
    const selectedXInput = document.getElementById('gcpVpcSelectedX');
    const selectedYInput = document.getElementById('gcpVpcSelectedY');
    const selectedWidthInput = document.getElementById('gcpVpcSelectedWidth');
    const selectedHeightInput = document.getElementById('gcpVpcSelectedHeight');
    const applyCardSizeButton = document.getElementById('gcpVpcApplyCardSize');
    const resetCardSizeButton = document.getElementById('gcpVpcResetCardSize');
    const exportPngButton = document.getElementById('gcpVpcExportPng');
    const downloadSvgButton = document.getElementById('gcpVpcDownloadSvg');
    const copyJsonButton = document.getElementById('gcpVpcCopyJson');
    const downloadJsonButton = document.getElementById('gcpVpcDownloadJson');
    const importJsonButton = document.getElementById('gcpVpcImportJsonButton');
    const importJsonInput = document.getElementById('gcpVpcImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.gcp-vpc-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.gcp-vpc-tab-panel'));
    const configTabButtons = Array.from(document.querySelectorAll('.gcp-vpc-config-tab'));
    const configTabPanels = Array.from(document.querySelectorAll('[data-config-panel]'));
    const regionInput = document.getElementById('gcpVpcRegion');
    const cidrInput = document.getElementById('gcpVpcCidr');
    const azCountInput = document.getElementById('gcpVpcAzCount');
    const natModeInput = document.getElementById('gcpVpcNatMode');
    const appTierInput = document.getElementById('gcpVpcAppTier');
    const databaseInput = document.getElementById('gcpVpcDatabase');
    const route53Input = document.getElementById('gcpVpcRoute53');
    const cloudFrontInput = document.getElementById('gcpVpcCloudFront');
    const wafInput = document.getElementById('gcpVpcWaf');
    const albInput = document.getElementById('gcpVpcAlb');
    const bastionInput = document.getElementById('gcpVpcBastion');
    const endpointsInput = document.getElementById('gcpVpcEndpoints');
    const flowLogsInput = document.getElementById('gcpVpcFlowLogs');
    const cloudWatchInput = document.getElementById('gcpVpcCloudWatch');
    const siteToSiteVpnInput = document.getElementById('gcpVpcSiteToSiteVpn');
    const transitGatewayInput = document.getElementById('gcpVpcTransitGateway');
    const cacheInput = document.getElementById('gcpVpcCache');
    const customSelectElements = [
        presetInput,
        regionInput,
        azCountInput,
        natModeInput,
        appTierInput,
        databaseInput
    ];

    if (
        !promptInput ||
        !generateButton ||
        !resetButton ||
        !errorState ||
        !presetInput ||
        !presetDescription ||
        !stageTitle ||
        !stageSubtitle ||
        !stageMeta ||
        !stageEmpty ||
        !stageCanvas ||
        !stageShell ||
        !zoomControl ||
        !zoomLabel ||
        !zoomInput ||
        !zoomOutButton ||
        !zoomInButton ||
        !zoomFitButton ||
        !zoomActualButton ||
        !zoomHideUiButton ||
        !fullscreenButton ||
        !resetLayoutButton ||
        !outputEmpty ||
        !outputContent ||
        !outputStatus ||
        !inventoryTableBody ||
        !inventorySortInput ||
        !inventorySortSelect ||
        !inventorySortSummary ||
        !jsonOutput ||
        !promptSummary ||
        !keywordList ||
        !assumptionList ||
        !modelList ||
        !prosList ||
        !consList ||
        !selectedEmpty ||
        !selectedEditor ||
        !selectedName ||
        !selectedXInput ||
        !selectedYInput ||
        !selectedWidthInput ||
        !selectedHeightInput ||
        !applyCardSizeButton ||
        !resetCardSizeButton ||
        !exportPngButton ||
        !downloadSvgButton ||
        !copyJsonButton ||
        !downloadJsonButton ||
        !importJsonButton ||
        !importJsonInput ||
        !regionInput ||
        !cidrInput ||
        !azCountInput ||
        !natModeInput ||
        !appTierInput ||
        !databaseInput ||
        !route53Input ||
        !cloudFrontInput ||
        !wafInput ||
        !albInput ||
        !bastionInput ||
        !endpointsInput ||
        !flowLogsInput ||
        !cloudWatchInput ||
        !siteToSiteVpnInput ||
        !transitGatewayInput ||
        !cacheInput ||
        inventorySortOptions.length === 0 ||
        tabButtons.length === 0 ||
        tabPanels.length === 0 ||
        configTabButtons.length === 0 ||
        configTabPanels.length === 0
    ) {
        return;
    }

    let selectedPresetId = gcpVpcPresetCatalog[0].id;
    let latestResult = null;
    let selectedCardId = '';
    let selectedConnectorId = '';
    const defaultStageZoom = 0.5;
    let stageZoom = defaultStageZoom;
    let stageUiHidden = false;
    let customSelectControls = [];
    let connectorOverrideContext = {};
    let inventorySortMode = 'id';
    let pendingStageFocusCardId = '';
    const minStageZoom = 0.35;
    const maxStageZoom = 2.4;
    const stageZoomStep = 0.1;
    const baseStageMinWidth = 1120;
    const selectedCardHintText = 'Select any draggable item in the stage to adjust its position and size. Keyboard: arrow keys move, Alt + arrow keys resize.';
    const inventoryColumnLabels = {
        index: '#',
        component: 'Component',
        placement: 'Placement',
        purpose: 'Purpose'
    };

    function initMarkdownCopyButtons() {
        const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.gcp-vpc-prompt-pre'));
        const promptCopyButtons = document.querySelectorAll('.gcp-vpc-prompt-copy-btn');

        promptCopyButtons.forEach(function (button) {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', async function (event) {
                event.preventDefault();
                event.stopPropagation();

                try {
                    await navigator.clipboard.writeText(code.textContent.trim());
                    flashButton(button.querySelector('span') || button, 'Copied');
                    button.classList.add('copied');
                    window.setTimeout(function () {
                        button.classList.remove('copied');
                    }, 1400);
                } catch (error) {
                    flashButton(button.querySelector('span') || button, 'Failed');
                }
            });
        });

        const codeBlocks = document.querySelectorAll('.markdown-content pre:not(.gcp-vpc-prompt-pre)');

        codeBlocks.forEach(function (pre) {
            if (pre.querySelector('.markdown-copy-btn')) {
                return;
            }

            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'markdown-copy-btn';
            button.textContent = 'Copy';

            button.addEventListener('click', async function () {
                try {
                    await navigator.clipboard.writeText(code.textContent.trim());
                    flashButton(button, 'Copied');
                    button.classList.add('copied');
                    window.setTimeout(function () {
                        button.classList.remove('copied');
                    }, 1400);
                } catch (error) {
                    flashButton(button, 'Failed');
                }
            });

            pre.appendChild(button);
        });
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function normalizePrompt(value) {
        return GcpVpcModelCore.normalizePrompt(value);
    }

    function normalizeCidrInput(value) {
        return GcpVpcModelCore.normalizeCidrInput(value);
    }

    function isValidIpv4Octet(segment) {
        if (!/^\d+$/.test(segment)) {
            return false;
        }

        const parsed = Number(segment);

        return Number.isInteger(parsed) && parsed >= 0 && parsed <= 255;
    }

    function isValidIpv4Cidr(value) {
        return GcpVpcModelCore.isValidIpv4Cidr(value);
    }

    function parseCidrValue(value) {
        return GcpVpcModelCore.parseCidrValue(value);
    }

    function getCidrValidationMessage() {
        return 'Enter a valid IPv4 VPC CIDR such as 10.0.0.0/16.';
    }

    function isSupportedImportVersion(version) {
        if (typeof version !== 'string' || version.trim() === '') {
            return false;
        }

        return version.split('.')[0] === GCP_VPC_TOOL_VERSION.split('.')[0];
    }

    function parseImportedEnum(value, allowedValues, fallbackValue) {
        if (value === undefined || value === null || value === '') {
            return fallbackValue;
        }

        const normalizedValue = String(value);

        return allowedValues.includes(normalizedValue) ? normalizedValue : null;
    }

    function parseImportedBoolean(value, fallbackValue) {
        if (value === undefined || value === null) {
            return fallbackValue;
        }

        if (typeof value === 'boolean') {
            return value;
        }

        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }

        return null;
    }

    function parseImportedAzCount(value, fallbackValue) {
        if (value === undefined || value === null || value === '') {
            return fallbackValue;
        }

        const parsed = Number.parseInt(String(value), 10);

        if ([1, 2, 3].includes(parsed)) {
            return parsed;
        }

        return null;
    }

    function normalizeImportedStringArray(value) {
        if (!Array.isArray(value)) {
            return [];
        }

        return value
            .filter(function (item) {
                return typeof item === 'string' && item.trim() !== '';
            })
            .map(function (item) {
                return item.trim();
            });
    }

    function buildImportedPayloadState(payload) {
        return GcpVpcModelCore.buildImportedPayloadState(payload, gcpVpcPresetCatalog);
    }

    function natModeLabel(value) {
        return GcpVpcModelCore.natModeLabel(value);
    }

    function appTierLabel(value) {
        return GcpVpcModelCore.appTierLabel(value);
    }

    function databaseLabel(value) {
        return GcpVpcModelCore.databaseLabel(value);
    }

    function getSelectedNativeOption(selectElement) {
        return Array.from(selectElement.options).find(function (option) {
            return option.value === selectElement.value;
        }) || selectElement.options[0] || null;
    }

    function closeCustomSelects(exceptControl) {
        customSelectControls.forEach(function (control) {
            if (exceptControl && control === exceptControl) {
                return;
            }

            control.wrapper.classList.remove('open');
            control.button.setAttribute('aria-expanded', 'false');
        });
    }

    function syncCustomSelectControl(control) {
        const selectedOption = getSelectedNativeOption(control.selectElement);
        const selectedValue = selectedOption ? selectedOption.value : '';

        control.valueElement.textContent = selectedOption ? selectedOption.textContent : '';
        control.optionButtons.forEach(function (optionButton) {
            const isSelected = optionButton.dataset.value === selectedValue;

            optionButton.classList.toggle('selected', isSelected);
            optionButton.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });
    }

    function syncCustomSelects() {
        customSelectControls.forEach(syncCustomSelectControl);
    }

    function focusSelectedCustomOption(control) {
        const selectedButton = control.optionButtons.find(function (optionButton) {
            return optionButton.classList.contains('selected');
        }) || control.optionButtons[0];

        if (selectedButton) {
            selectedButton.focus();
        }
    }

    function openCustomSelect(control) {
        closeCustomSelects(control);
        syncCustomSelectControl(control);
        control.wrapper.classList.add('open');
        control.button.setAttribute('aria-expanded', 'true');
    }

    function toggleCustomSelect(control) {
        if (control.wrapper.classList.contains('open')) {
            closeCustomSelects();
            return;
        }

        openCustomSelect(control);
    }

    function selectCustomOption(control, value) {
        if (control.selectElement.value === value) {
            closeCustomSelects();
            return;
        }

        control.selectElement.value = value;
        syncCustomSelectControl(control);
        control.selectElement.dispatchEvent(new Event('change', {
            bubbles: true
        }));
        closeCustomSelects();
    }

    function initializeCustomSelect(selectElement) {
        const wrapper = document.createElement('div');
        const button = document.createElement('button');
        const valueElement = document.createElement('span');
        const icon = document.createElement('i');
        const menu = document.createElement('div');

        wrapper.className = 'gcp-vpc-custom-select';
        button.type = 'button';
        button.className = 'gcp-vpc-custom-select-trigger';
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');
        valueElement.className = 'gcp-vpc-custom-select-value';
        icon.className = 'bi bi-chevron-down';
        icon.setAttribute('aria-hidden', 'true');
        menu.className = 'gcp-vpc-custom-select-menu';
        menu.setAttribute('role', 'listbox');

        button.appendChild(valueElement);
        button.appendChild(icon);
        wrapper.appendChild(button);
        wrapper.appendChild(menu);
        selectElement.classList.add('gcp-vpc-native-select');
        selectElement.setAttribute('aria-hidden', 'true');
        selectElement.tabIndex = -1;
        selectElement.insertAdjacentElement('afterend', wrapper);

        const control = {
            selectElement: selectElement,
            wrapper: wrapper,
            button: button,
            valueElement: valueElement,
            menu: menu,
            optionButtons: []
        };

        Array.from(selectElement.options).forEach(function (option) {
            const optionButton = document.createElement('button');

            optionButton.type = 'button';
            optionButton.className = 'gcp-vpc-custom-select-option';
            optionButton.dataset.value = option.value;
            optionButton.textContent = option.textContent;
            optionButton.setAttribute('role', 'option');
            optionButton.addEventListener('click', function () {
                selectCustomOption(control, option.value);
                button.focus();
            });
            optionButton.addEventListener('keydown', function (event) {
                const currentIndex = control.optionButtons.indexOf(optionButton);

                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    control.optionButtons[Math.min(control.optionButtons.length - 1, currentIndex + 1)].focus();
                }

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    control.optionButtons[Math.max(0, currentIndex - 1)].focus();
                }

                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectCustomOption(control, option.value);
                    button.focus();
                }

                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeCustomSelects();
                    button.focus();
                }
            });

            menu.appendChild(optionButton);
            control.optionButtons.push(optionButton);
        });

        button.addEventListener('click', function () {
            toggleCustomSelect(control);
        });
        button.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                event.preventDefault();
                openCustomSelect(control);
                focusSelectedCustomOption(control);
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                closeCustomSelects();
            }
        });
        selectElement.addEventListener('change', function () {
            syncCustomSelectControl(control);
        });

        customSelectControls.push(control);
        syncCustomSelectControl(control);
    }

    function initializeCustomSelects() {
        customSelectElements.forEach(initializeCustomSelect);
    }

    function findPresetById(presetId) {
        return gcpVpcPresetCatalog.find(function (preset) {
            return preset.id === presetId;
        }) || gcpVpcPresetCatalog[0];
    }

    function populateRegionOptions() {
        const currentValue = regionInput.value;

        regionInput.innerHTML = gcpVpcRegionCatalog.map(function (region) {
            return '<option value="' + escapeHtml(region.value) + '">' + escapeHtml(region.label) + '</option>';
        }).join('');

        regionInput.value = gcpVpcSupportedRegions.includes(currentValue)
            ? currentValue
            : gcpVpcRegionCatalog[0].value;
    }

    function updatePresetSelection() {
        const selectedPreset = findPresetById(selectedPresetId);

        presetInput.value = selectedPreset.id;
        presetDescription.textContent = selectedPreset.description;
        syncCustomSelects();
    }

    function activateTab(tabId) {
        tabButtons.forEach(function (button) {
            const isActive = button.dataset.tabTarget === tabId;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.tabIndex = isActive ? 0 : -1;
        });

        tabPanels.forEach(function (panel) {
            const isActive = panel.id === tabId;

            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function activateConfigTab(tabId) {
        configTabButtons.forEach(function (button) {
            const isActive = button.dataset.configTabTarget === tabId;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.tabIndex = isActive ? 0 : -1;
        });

        configTabPanels.forEach(function (panel) {
            const isActive = panel.id === tabId;

            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function bindTabKeyboardNavigation(buttons, targetKey, activate) {
        buttons.forEach(function (button, index) {
            button.addEventListener('keydown', function (event) {
                let nextIndex = null;

                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    nextIndex = (index + 1) % buttons.length;
                }

                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    nextIndex = (index - 1 + buttons.length) % buttons.length;
                }

                if (event.key === 'Home') {
                    nextIndex = 0;
                }

                if (event.key === 'End') {
                    nextIndex = buttons.length - 1;
                }

                if (nextIndex === null) {
                    return;
                }

                event.preventDefault();
                activate(String(buttons[nextIndex].dataset[targetKey] || ''));
                buttons[nextIndex].focus();
            });
        });
    }

    function normalizeStageZoom(value) {
        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            return defaultStageZoom;
        }

        return Math.min(maxStageZoom, Math.max(minStageZoom, Math.round(parsed * 10) / 10));
    }

    function applyStageZoom() {
        const svgElement = stageCanvas.querySelector('svg');
        const zoomPercent = Math.round(stageZoom * 100);

        zoomOutButton.disabled = stageZoom <= minStageZoom;
        zoomInButton.disabled = stageZoom >= maxStageZoom;
        zoomLabel.textContent = '%';
        zoomInput.value = String(zoomPercent);
        zoomInput.setAttribute('min', String(Math.round(minStageZoom * 100)));
        zoomInput.setAttribute('max', String(Math.round(maxStageZoom * 100)));

        if (!svgElement) {
            return;
        }

        const viewBox = svgElement.viewBox && svgElement.viewBox.baseVal ? svgElement.viewBox.baseVal : null;
        const baseWidth = viewBox && viewBox.width > 0 ? viewBox.width : baseStageMinWidth;

        svgElement.style.width = String(Math.round(baseWidth * stageZoom)) + 'px';
        svgElement.style.minWidth = '0';
    }

    function setStageZoom(value) {
        stageZoom = normalizeStageZoom(value);
        applyStageZoom();
    }

    function setStageZoomFromPercent(percentValue) {
        const parsedPercent = Number.parseInt(String(percentValue || '').trim(), 10);

        if (!Number.isFinite(parsedPercent)) {
            setStageZoom(stageZoom);
            return;
        }

        setStageZoom(parsedPercent / 100);
    }

    function setStageZoomToFit() {
        const svgElement = stageCanvas.querySelector('svg');
        const viewBox = svgElement && svgElement.viewBox && svgElement.viewBox.baseVal ? svgElement.viewBox.baseVal : null;
        const baseWidth = viewBox && viewBox.width > 0 ? viewBox.width : baseStageMinWidth;
        const availableWidth = Math.max(320, stageCanvas.clientWidth - 24);

        setStageZoom(availableWidth / baseWidth);

        if (stageCanvas.scrollTo) {
            stageCanvas.scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    function setStageUiHidden(isHidden) {
        stageUiHidden = Boolean(isHidden);
        const label = stageUiHidden ? 'Show UI' : 'Hide UI';
        const icon = zoomHideUiButton.querySelector('i');

        stageShell.classList.toggle('gcp-vpc-stage-ui-hidden', stageUiHidden);
        zoomHideUiButton.setAttribute('aria-label', label);
        zoomHideUiButton.setAttribute('title', label);

        if (icon) {
            icon.className = stageUiHidden ? 'bi bi-eye' : 'bi bi-eye-slash';
        }
    }

    function updateFullscreenButton() {
        const isFullscreen = document.fullscreenElement === stageShell || stageShell.classList.contains('gcp-vpc-stage-expanded');
        const icon = fullscreenButton.querySelector('i');
        const label = isFullscreen ? 'Exit fullscreen' : 'Open fullscreen';

        fullscreenButton.setAttribute('aria-label', label);
        fullscreenButton.setAttribute('title', label);

        if (icon) {
            icon.className = isFullscreen ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen';
        }
    }

    function setStageExpanded(isExpanded) {
        stageShell.classList.toggle('gcp-vpc-stage-expanded', Boolean(isExpanded));
        document.body.classList.toggle('gcp-vpc-stage-expanded-lock', Boolean(isExpanded));
        updateFullscreenButton();
        window.requestAnimationFrame(function () {
            applyStageZoom();
        });
    }

    function resetStageViewport() {
        const svgElement = stageCanvas.querySelector('svg');
        const vpcCard = getRenderedCardById('gcp-vpc-shell');

        if (!svgElement || !vpcCard || typeof stageCanvas.scrollTo !== 'function') {
            return;
        }

        const viewBox = svgElement.viewBox && svgElement.viewBox.baseVal ? svgElement.viewBox.baseVal : null;
        const renderedWidth = svgElement.getBoundingClientRect().width;
        const scale = viewBox && viewBox.width > 0 ? renderedWidth / viewBox.width : 1;
        const left = Math.max(0, (vpcCard.x - 48) * scale);
        const top = Math.max(0, (vpcCard.y - 64) * scale);

        stageCanvas.scrollTo({
            left: left,
            top: top,
            behavior: 'auto'
        });
    }

    async function toggleFullscreen() {
        try {
            if (stageShell.classList.contains('gcp-vpc-stage-expanded')) {
                setStageExpanded(false);
                return;
            }

            if (document.fullscreenElement === stageShell) {
                if (typeof document.exitFullscreen !== 'function') {
                    setStageExpanded(false);
                    return;
                }

                await document.exitFullscreen();
                return;
            }

            if (typeof stageShell.requestFullscreen !== 'function') {
                setStageExpanded(true);
                return;
            }

            await stageShell.requestFullscreen();
            updateFullscreenButton();
            window.requestAnimationFrame(function () {
                applyStageZoom();
            });
        } catch (error) {
            setStageExpanded(true);
        }
    }

    function showError(message) {
        errorState.textContent = message;
        errorState.classList.remove('d-none');
    }

    function clearError() {
        errorState.textContent = '';
        errorState.classList.add('d-none');
    }

    function createChip(label) {
        return '<span class="tool-helper-chip">' + escapeHtml(label) + '</span>';
    }

    function createToneChip(iconClass, label, tone) {
        return [
            '<span class="gcp-vpc-score-tag gcp-vpc-score-tag-' + escapeHtml(tone) + '">',
            '<i class="' + escapeHtml(iconClass) + '" aria-hidden="true"></i>',
            '<span>' + escapeHtml(label) + '</span>',
            '</span>'
        ].join('');
    }

    function extractRegion(prompt, fallbackRegion, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);
        const matched = gcpVpcSupportedRegions.find(function (region) {
            return normalizedPrompt.includes(region);
        });

        if (matched) {
            matchedKeywords.push(matched);
            return matched;
        }

        assumptions.push('Region not specified in the prompt. Kept the preset region.');

        return fallbackRegion;
    }

    function extractCidr(prompt, fallbackCidr, assumptions, matchedKeywords) {
        const cidrMatch = String(prompt || '').match(/\b(?:\d{1,3}\.){3}\d{1,3}\/\d{1,2}\b/);

        if (cidrMatch) {
            const validatedCidr = parseCidrValue(cidrMatch[0]);

            if (validatedCidr) {
                matchedKeywords.push(validatedCidr);
                return validatedCidr;
            }

            assumptions.push('Prompt included an invalid VPC CIDR. Kept the preset CIDR.');
            return fallbackCidr;
        }

        assumptions.push('VPC CIDR not specified in the prompt. Kept the preset CIDR.');

        return fallbackCidr;
    }

    function extractAzCount(prompt, fallbackAzCount, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);
        const patterns = [
            { count: 3, tests: [/3 zones/, /three zones/, /3 az/, /three az/] },
            { count: 2, tests: [/2 zones/, /two zones/, /2 az/, /two az/, /multi-az/, /multi-zone/] },
            { count: 1, tests: [/1 zone/, /one zone/, /1 az/, /single az/, /single zone/] }
        ];

        const matchedPattern = patterns.find(function (pattern) {
            return pattern.tests.some(function (test) {
                return test.test(normalizedPrompt);
            });
        });

        if (matchedPattern) {
            matchedKeywords.push(String(matchedPattern.count) + ' zone');
            return matchedPattern.count;
        }

        assumptions.push('Zone count not specified in the prompt. Kept the preset zone count.');

        return fallbackAzCount;
    }

    function resolveBooleanFeature(prompt, defaultValue, positivePatterns, negativePatterns, label, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);

        if (negativePatterns.some(function (pattern) {
            return pattern.test(normalizedPrompt);
        })) {
            matchedKeywords.push('no ' + label);
            return false;
        }

        if (positivePatterns.some(function (pattern) {
            return pattern.test(normalizedPrompt);
        })) {
            matchedKeywords.push(label);
            return true;
        }

        return defaultValue;
    }

    function extractNatMode(prompt, fallbackNatMode, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);

        if (/one cloud nat policy per zone|cloud nat per zone|nat per zone|one nat gateway per az|nat gateway per az|nat gateways in each az|per-az nat/.test(normalizedPrompt)) {
            matchedKeywords.push('Cloud NAT per zone');
            return 'per-az';
        }

        if (/no nat|without nat|private only with no nat/.test(normalizedPrompt)) {
            matchedKeywords.push('No Cloud NAT');
            return 'none';
        }

        if (/single cloud nat|single nat|one nat gateway|nat gateway|cloud nat/.test(normalizedPrompt)) {
            matchedKeywords.push('Single Cloud NAT');
            return 'single';
        }

        assumptions.push('Cloud NAT mode not specified in the prompt. Kept the preset mode.');

        return fallbackNatMode;
    }

    function extractAppTier(prompt, fallbackAppTier, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);
        const options = [
            { value: 'eks', tests: [/\bgke\b/, /google kubernetes engine/, /kubernetes/, /node pools?/, /worker nodes?/] },
            { value: 'ecs', tests: [/cloud run/, /serverless container/, /container services?/, /container apps?/] },
            { value: 'lambda', tests: [/cloud functions/, /\bfunctions\b/, /serverless/, /serverless vpc access/] },
            { value: 'ec2', tests: [/managed instance groups?/, /\bmig\b/, /compute engine/, /application servers?/, /virtual machines?/] }
        ];
        const matchedOption = options.find(function (option) {
            return option.tests.some(function (test) {
                return test.test(normalizedPrompt);
            });
        });

        if (matchedOption) {
            matchedKeywords.push(appTierLabel(matchedOption.value));
            return matchedOption.value;
        }

        assumptions.push('App tier not specified in the prompt. Kept the preset workload.');

        return fallbackAppTier;
    }

    function extractDatabase(prompt, fallbackDatabase, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);

        if (/without database|no database/.test(normalizedPrompt)) {
            matchedKeywords.push('No database');
            return 'none';
        }

        if (/firestore|cloud firestore|bigtable|nosql/.test(normalizedPrompt)) {
            matchedKeywords.push('Firestore');
            return 'dynamodb';
        }

        if (/cloud sql for postgresql|postgresql|postgres|mysql/.test(normalizedPrompt)) {
            matchedKeywords.push('Cloud SQL for PostgreSQL');
            return 'aurora';
        }

        if (/cloud sql|sql database|sql server/.test(normalizedPrompt)) {
            matchedKeywords.push('Cloud SQL');
            return 'rds';
        }

        assumptions.push('Database tier not specified in the prompt. Kept the preset data tier.');

        return fallbackDatabase;
    }

    function buildPromptTitle(prompt, fallbackLabel) {
        return GcpVpcModelCore.buildPromptTitle(prompt, fallbackLabel);
    }

    function inferFromPrompt(prompt, preset) {
        return GcpVpcModelCore.inferFromPrompt(prompt, preset);
    }

    function syncControls(spec) {
        regionInput.value = spec.region;
        cidrInput.value = spec.cidr;
        azCountInput.value = String(spec.azCount);
        natModeInput.value = spec.natMode;
        appTierInput.value = spec.appTier;
        databaseInput.value = spec.database;
        route53Input.checked = Boolean(spec.route53);
        cloudFrontInput.checked = Boolean(spec.cloudFront);
        wafInput.checked = Boolean(spec.waf);
        albInput.checked = Boolean(spec.alb);
        bastionInput.checked = Boolean(spec.bastion);
        endpointsInput.checked = Boolean(spec.endpoints);
        flowLogsInput.checked = Boolean(spec.flowLogs);
        cloudWatchInput.checked = Boolean(spec.cloudWatch);
        siteToSiteVpnInput.checked = Boolean(spec.siteToSiteVpn);
        transitGatewayInput.checked = Boolean(spec.transitGateway);
        cacheInput.checked = Boolean(spec.cache);
        syncCustomSelects();
    }

    function buildSpecFromControls(prompt, presetId, inheritedNotes) {
        const selectedPreset = findPresetById(presetId || selectedPresetId);
        const cidrValue = String(cidrInput.value || '').trim();
        const parsedCidr = cidrValue === '' ? selectedPreset.defaults.cidr : parseCidrValue(cidrValue);
        const azCount = Math.min(3, Math.max(1, Number.parseInt(azCountInput.value, 10) || selectedPreset.defaults.azCount));
        const database = databaseInput.value;

        if (parsedCidr === null) {
            return null;
        }

        const spec = {
            presetId: selectedPreset.id,
            presetLabel: selectedPreset.label,
            title: buildPromptTitle(prompt, selectedPreset.label),
            prompt: String(prompt || '').trim(),
            region: regionInput.value || selectedPreset.defaults.region,
            cidr: parsedCidr,
            azCount: azCount,
            natMode: natModeInput.value || selectedPreset.defaults.natMode,
            appTier: appTierInput.value || selectedPreset.defaults.appTier,
            database: database,
            route53: route53Input.checked,
            cloudFront: cloudFrontInput.checked,
            waf: wafInput.checked,
            alb: albInput.checked,
            bastion: bastionInput.checked,
            endpoints: endpointsInput.checked,
            flowLogs: flowLogsInput.checked,
            cloudWatch: cloudWatchInput.checked,
            siteToSiteVpn: siteToSiteVpnInput.checked,
            transitGateway: transitGatewayInput.checked,
            cache: cacheInput.checked,
            assumptions: inheritedNotes && Array.isArray(inheritedNotes.assumptions) ? inheritedNotes.assumptions.slice() : [],
            matchedKeywords: inheritedNotes && Array.isArray(inheritedNotes.matchedKeywords) ? inheritedNotes.matchedKeywords.slice() : []
        };

        if (spec.database === 'none' && spec.cache === false && spec.natMode === 'none' && spec.alb === false && spec.cloudFront === false) {
            spec.route53 = false;
        }

        if (spec.database === 'dynamodb') {
            spec.cache = cacheInput.checked;
        }

        return spec;
    }

    function buildAzLabels(azCount) {
        const suffixes = ['a', 'b', 'c'];

        return suffixes.slice(0, azCount);
    }

    function describeInventoryItem(item, spec) {
        const component = String(item.component || '').toLowerCase();

        if (component === 'gcp vpc') {
            return 'Isolated regional network boundary where subnets, route tables, gateways, Private Service Connect, and security controls attach to the CIDR range.';
        }

        if (component === 'cloud dns') {
            return 'DNS entry point for the application hostname, resolving users toward Cloud CDN when present or directly toward the ingress tier.';
        }

        if (component === 'cloud cdn') {
            return 'Global edge distribution layer that receives client traffic, can cache content, and forwards dynamic requests to the origin path.';
        }

        if (component === 'cloud armor') {
            return 'Layer 7 request filtering policy that blocks or allows HTTP traffic before it reaches the application ingress tier.';
        }

        if (component === 'external http(s) load balancer') {
            return 'Public HTTP and HTTPS ingress tier that evaluates listener rules and routes accepted traffic to private application targets.';
        }

        if (component.indexOf('public subnet ') === 0) {
            return 'Subnet tier with an internet gateway route for public ingress components, IAP access, or managed Cloud NAT egress.';
        }

        if (component.indexOf('private app subnet ') === 0) {
            return 'Private workload subnet for ' + appTierLabel(spec.appTier) + ' resources without direct inbound internet routing.';
        }

        if (component.indexOf('cloud sql subnet ') === 0 || component.indexOf('cloud sql for postgresql subnet ') === 0) {
            return 'Private database subnet group member used to place the data tier across zones without public ingress.';
        }

        if (component === 'cloud nat') {
            return 'Managed source NAT in a public subnet, allowing private workloads to initiate outbound internet traffic without accepting inbound sessions.';
        }

        if (component === 'managed instance groups') {
            return 'Private compute fleet that scales virtual machines across app subnets, usually registered behind the ingress target pool.';
        }

        if (component === 'cloud run') {
            return 'Managed container workload tier running private application services with controlled ingress through the front-end path.';
        }

        if (component === 'gke') {
            return 'Kubernetes workload tier with private node pools, keeping cluster workloads off direct public subnet placement.';
        }

        if (component === 'gcp functions in vpc') {
            return 'Serverless compute attached to private subnets through managed network interfaces for access to internal resources.';
        }

        if (component === 'firestore') {
            return 'Regional managed data tier outside the VPC boundary, normally reached privately through Private Service Connect when enabled.';
        }

        if (component === 'memorystore for redis') {
            return 'Private in-memory cache tier used by application services for low-latency state, sessions, or query acceleration.';
        }

        if (component === 'private service connect') {
            return 'Private GCP service access path for services such as Cloud Storage and Secret Manager without depending on public internet routing.';
        }

        if (component === 'identity-aware proxy') {
            return 'Hardened administrative access layer for controlled access into private resources.';
        }

        if (component === 'cloud vpn') {
            return 'Encrypted hybrid connectivity path between on-premises networks and the VPC routing domain.';
        }

        if (component === 'network connectivity center') {
            return 'Regional routing hub for shared services, additional VPCs, and hybrid attachments with centralized route control.';
        }

        if (component === 'cloud monitoring') {
            return 'Operations plane for metrics, alarms, logs, dashboards, and service visibility across the generated architecture.';
        }

        if (component === 'vpc flow logs') {
            return 'Network telemetry capture for accepted and rejected traffic across subnet and network-security boundaries.';
        }

        return 'Generated architecture component included by the selected prompt, preset, or inspector configuration.';
    }

    function buildInventory(spec) {
        const inventory = [];
        const azLabels = buildAzLabels(spec.azCount);

        inventory.push({
            component: 'GCP VPC',
            placement: spec.region,
            purpose: spec.cidr + ' network boundary'
        });

        if (spec.route53) {
            inventory.push({
                component: 'Cloud DNS',
                placement: 'Edge',
                purpose: 'DNS entry point for the application'
            });
        }

        if (spec.cloudFront) {
            inventory.push({
                component: 'Cloud CDN',
                placement: 'Edge',
                purpose: 'Global content distribution and edge caching'
            });
        }

        if (spec.waf) {
            inventory.push({
                component: 'Cloud Armor',
                placement: 'Edge',
                purpose: 'Request filtering before the VPC ingress path'
            });
        }

        if (spec.alb) {
            inventory.push({
                component: 'External HTTP(S) Load Balancer',
                placement: 'Public subnets',
                purpose: 'Distributes inbound traffic to the application tier'
            });
        }

        azLabels.forEach(function (azLabel, index) {
            inventory.push({
                component: 'Public subnet ' + spec.region + azLabel,
                placement: 'zone ' + azLabel.toUpperCase(),
                purpose: 'Ingress and egress zone for public-facing services'
            });

            inventory.push({
                component: 'Private app subnet ' + spec.region + azLabel,
                placement: 'zone ' + azLabel.toUpperCase(),
                purpose: appTierLabel(spec.appTier)
            });

            if (spec.database === 'rds' || spec.database === 'aurora') {
                inventory.push({
                    component: databaseLabel(spec.database) + ' subnet ' + spec.region + azLabel,
                    placement: 'zone ' + azLabel.toUpperCase(),
                    purpose: index === 0 ? 'Primary database placement' : 'Standby or read replica placement'
                });
            }

            if (spec.natMode === 'per-az' || (spec.natMode === 'single' && index === 0)) {
                inventory.push({
                    component: 'Cloud NAT',
                    placement: 'Public subnet ' + spec.region + azLabel,
                    purpose: spec.natMode === 'single' ? 'Shared outbound internet path' : 'Local outbound internet path'
                });
            }
        });

        inventory.push({
            component: appTierLabel(spec.appTier),
            placement: spec.azCount + ' zone layout',
            purpose: 'Main application or platform workload'
        });

        if (spec.database === 'dynamodb') {
            inventory.push({
                component: 'Firestore',
                placement: 'Managed service outside the VPC',
                purpose: 'Serverless data tier'
            });
        }

        if (spec.cache) {
            inventory.push({
                component: 'Memorystore for Redis',
                placement: spec.database === 'none' && spec.azCount === 1 ? 'Shared VPC tier' : 'Private data services',
                purpose: 'Low-latency cache for the application tier'
            });
        }

        if (spec.endpoints) {
            inventory.push({
                component: 'Private Service Connect',
                placement: 'Private service access',
                purpose: 'Private connectivity to GCP managed services'
            });
        }

        if (spec.bastion) {
            inventory.push({
                component: 'Identity-Aware Proxy',
                placement: 'First public subnet',
                purpose: 'Controlled administrative access to private resources'
            });
        }

        if (spec.siteToSiteVpn) {
            inventory.push({
                component: 'Cloud VPN',
                placement: 'Hybrid edge',
                purpose: 'Extends on-premises connectivity into the VPC'
            });
        }

        if (spec.transitGateway) {
            inventory.push({
                component: 'Network Connectivity Center',
                placement: 'Shared network edge',
                purpose: 'Connects the VPC to shared services or additional networks'
            });
        }

        if (spec.cloudWatch) {
            inventory.push({
                component: 'Cloud Monitoring',
                placement: 'Operations',
                purpose: 'Metrics, alarms, and central visibility'
            });
        }

        if (spec.flowLogs) {
            inventory.push({
                component: 'VPC Flow Logs',
                placement: 'Operations',
                purpose: 'Captures network-level traffic telemetry'
            });
        }

        return inventory.map(function (item) {
            return Object.assign({}, item, {
                technicalDetail: describeInventoryItem(item, spec)
            });
        });
    }

    function buildModelSummary(spec) {
        const summary = [
            spec.region + ' region',
            spec.azCount + ' zone',
            natModeLabel(spec.natMode),
            appTierLabel(spec.appTier),
            databaseLabel(spec.database)
        ];

        if (spec.route53) {
            summary.push('Cloud DNS');
        }

        if (spec.cloudFront) {
            summary.push('Cloud CDN');
        }

        if (spec.waf) {
            summary.push('Cloud Armor');
        }

        if (spec.endpoints) {
            summary.push('Private Service Connect');
        }

        if (spec.siteToSiteVpn) {
            summary.push('Hybrid VPN');
        }

        if (spec.transitGateway) {
            summary.push('Network Connectivity Center');
        }

        return summary;
    }

    function clampScore(score) {
        return Math.max(0, Math.min(100, score));
    }

    function buildArchitectureProsCons(spec) {
        const pros = [];
        const cons = [];

        if (spec.azCount >= 2) {
            pros.push('Multi-zone placement improves workload and database resilience.');
        } else {
            pros.push('Single-zone placement keeps a lab or proof-of-concept topology simple.');
            cons.push('Single-zone placement limits failure tolerance.');
        }

        if (spec.alb) {
            pros.push('External HTTP(S) Load Balancer separates public ingress from private workloads.');
        } else {
            cons.push('No load balancer is modeled, so ingress scaling and health routing are unclear.');
        }

        if (spec.database === 'rds' || spec.database === 'aurora') {
            pros.push(databaseLabel(spec.database) + ' provides a managed relational data tier.');
        } else if (spec.database === 'dynamodb') {
            pros.push('Firestore removes database subnet and instance management from the VPC path.');
        } else {
            cons.push('No managed database tier is represented in the architecture.');
        }

        if (spec.endpoints) {
            pros.push('Private Service Connect reduces dependency on public internet paths for GCP service access.');
        } else {
            cons.push('Private workloads may rely on NAT or public paths for GCP service APIs.');
        }

        if (spec.cloudWatch && spec.flowLogs) {
            pros.push('Cloud Monitoring and VPC Flow Logs give the design baseline observability.');
        } else if (spec.cloudWatch || spec.flowLogs) {
            cons.push('Observability is partial; pair Cloud Monitoring with flow logs for better operations coverage.');
        } else {
            cons.push('No observability layer is modeled for metrics, logs, or network traffic inspection.');
        }

        if (spec.natMode === 'per-az') {
            pros.push('Cloud NAT per zone avoids a single outbound egress dependency.');
        } else if (spec.natMode === 'single' && spec.azCount >= 2) {
            pros.push('A single Cloud NAT keeps cost lower than per-zone NAT.');
            cons.push('A single Cloud NAT is a zone dependency for private subnet egress.');
        } else if (spec.natMode === 'none') {
            cons.push('No Cloud NAT is modeled, so private subnet outbound internet access may be blocked.');
        }

        if (spec.route53 && spec.cloudFront && spec.waf) {
            pros.push('Cloud DNS, Cloud CDN, and Cloud Armor create a stronger edge entry path.');
        } else if (!spec.waf && (spec.alb || spec.cloudFront)) {
            cons.push('No Cloud Armor layer is modeled in front of public HTTP ingress.');
        }

        if (spec.bastion) {
            cons.push('An IAP access path adds an administrative access surface that needs strict hardening.');
        }

        if (spec.siteToSiteVpn || spec.transitGateway) {
            cons.push('Hybrid connectivity needs explicit route control, segmentation, and monitoring.');
        }

        if (pros.length === 0) {
            pros.push('The diagram is restorable as JSON and can be iterated through the inspector controls.');
        }

        if (cons.length === 0) {
            cons.push('No major diagram-level gaps detected; still review IAM, firewall policies, and route tables before production.');
        }

        return {
            pros: pros,
            cons: cons
        };
    }

    function buildArchitectureScore(spec) {
        let score = 55;

        if (spec.azCount >= 2) {
            score += 12;
        } else {
            score -= 8;
        }

        if (spec.azCount >= 3) {
            score += 3;
        }

        if (spec.alb) {
            score += 7;
        }

        if (spec.route53) {
            score += 3;
        }

        if (spec.cloudFront) {
            score += 3;
        }

        if (spec.waf) {
            score += 5;
        }

        if (spec.database === 'rds' || spec.database === 'aurora') {
            score += 7;
        } else if (spec.database === 'dynamodb') {
            score += 5;
        } else {
            score -= 5;
        }

        if (spec.natMode === 'per-az') {
            score += 6;
        } else if (spec.natMode === 'single' && spec.azCount >= 2) {
            score += 1;
        } else if (spec.natMode === 'none') {
            score -= 5;
        }

        if (spec.endpoints) {
            score += 5;
        }

        if (spec.flowLogs) {
            score += 4;
        }

        if (spec.cloudWatch) {
            score += 4;
        }

        if (spec.cache) {
            score += 2;
        }

        if (spec.bastion) {
            score -= 3;
        }

        const normalizedScore = clampScore(score);
        let band = 'Needs architecture hardening';
        let badgeTone = 'review';
        let badgeLabel = 'Review';
        let badgeIcon = 'bi bi-exclamation-circle';
        let ringLabel = 'Needs work';
        let detail = 'Review resiliency, private tier placement, and service controls before handoff.';

        if (normalizedScore >= 85) {
            band = 'Strong production baseline';
            badgeTone = 'production';
            badgeLabel = 'Production';
            badgeIcon = 'bi bi-shield-check';
            ringLabel = 'Baseline';
            detail = 'Private tiers, managed data services, and observability are in place for a polished delivery.';
        } else if (normalizedScore >= 75) {
            band = 'Solid production-ready baseline';
            badgeTone = 'ready';
            badgeLabel = 'Ready';
            badgeIcon = 'bi bi-check2-circle';
            ringLabel = 'Delivery';
            detail = 'The architecture is presentation-ready with a few remaining resilience or cost trade-offs.';
        } else if (normalizedScore >= 65) {
            band = 'Useful baseline with clear trade-offs';
            badgeTone = 'balanced';
            badgeLabel = 'Balanced';
            badgeIcon = 'bi bi-diagram-3';
            ringLabel = 'Trade-offs';
            detail = 'The baseline is usable, but some networking or control choices still need tightening.';
        }

        return {
            score: normalizedScore,
            angle: Math.max(18, Math.round((normalizedScore / 100) * 352)),
            band: band,
            badgeTone: badgeTone,
            badgeLabel: badgeLabel,
            badgeIcon: badgeIcon,
            ringLabel: ringLabel,
            detail: detail,
            tags: [
                { icon: 'bi bi-globe2', label: spec.region + ' region', tone: 'region' },
                { icon: 'bi bi-grid-3x3-gap', label: spec.azCount + ' zone', tone: 'az' },
                { icon: 'bi bi-arrow-left-right', label: natModeLabel(spec.natMode), tone: 'network' },
                { icon: 'bi bi-hdd-network', label: appTierLabel(spec.appTier), tone: 'compute' },
                { icon: 'bi bi-database', label: databaseLabel(spec.database), tone: 'data' }
            ]
        };
    }

    function buildNotePayload(spec) {
        const prosCons = buildArchitectureProsCons(spec);

        return {
            prompt: spec.prompt,
            matched_keywords: spec.matchedKeywords,
            assumptions: spec.assumptions,
            current_model: buildModelSummary(spec),
            score: buildArchitectureScore(spec),
            pros: prosCons.pros,
            cons: prosCons.cons
        };
    }

    function inferEdgeCards(spec) {
        const cards = [
            { id: 'users', label: 'Users', short: 'USR', tone: 'edge' }
        ];

        if (spec.route53) {
            cards.push({ id: 'route53', label: 'Cloud DNS', short: 'DNS', tone: 'service' });
        }

        if (spec.cloudFront) {
            cards.push({ id: 'cloudfront', label: 'Cloud CDN', short: 'CDN', tone: 'service' });
        }

        if (spec.waf) {
            cards.push({ id: 'waf', label: 'Cloud Armor', short: 'WAF', tone: 'security' });
        }

        return cards;
    }

    function computeStageGeometry(spec) {
        const width = 1680;
        const hasDataTier = spec.database === 'rds' || spec.database === 'aurora';
        const leftEdgeWidth = spec.siteToSiteVpn || spec.transitGateway ? 248 : 184;
        const hasRightRail = spec.cloudWatch || spec.flowLogs || spec.database === 'dynamodb' || spec.endpoints;
        const rightEdgeWidth = hasRightRail ? 360 : 184;
        const outerMargin = 48;
        const vpcX = leftEdgeWidth + outerMargin;
        const vpcY = 148;
        const vpcWidth = width - vpcX - rightEdgeWidth - outerMargin;
        const edgeCards = inferEdgeCards(spec);
        const edgeCardWidth = 172;
        const edgeCardGap = 32;
        const edgeRowWidth = (edgeCards.length * edgeCardWidth) + ((edgeCards.length - 1) * edgeCardGap);
        const topOffset = spec.alb ? 148 : 76;
        const azGap = 34;
        const innerPadding = 34;
        const innerWidth = vpcWidth - (innerPadding * 2);
        const azWidth = (innerWidth - (azGap * (spec.azCount - 1))) / spec.azCount;
        const azXStart = vpcX + innerPadding;
        const azY = vpcY + topOffset;
        const publicHeight = 144;
        const appHeight = hasDataTier ? 190 : 276;
        const dataHeight = hasDataTier ? 156 : 0;
        const interRowGap = 28;
        const azHeight = publicHeight + appHeight + dataHeight + (hasDataTier ? (interRowGap * 2) : interRowGap) + 92;
        const sharedServicesLaneHeight = spec.cache ? 126 : 0;
        const sharedServicesY = azY + azHeight + 28;
        const vpcHeight = azHeight + topOffset + sharedServicesLaneHeight + 64;
        const height = Math.max(860, vpcY + vpcHeight + 88);
        const rightX = vpcX + vpcWidth + 48;
        const rightCardWidth = 240;
        const rightCardGap = 40;
        const rightStackY = vpcY + 254;

        return {
            width: width,
            height: height,
            vpcX: vpcX,
            vpcY: vpcY,
            vpcWidth: vpcWidth,
            vpcHeight: vpcHeight,
            azWidth: azWidth,
            azHeight: azHeight,
            azXStart: azXStart,
            azY: azY,
            azGap: azGap,
            edgeCards: edgeCards,
            edgeRowX: vpcX + (vpcWidth / 2) - (edgeRowWidth / 2),
            edgeRowY: 28,
            edgeCardWidth: edgeCardWidth,
            edgeCardGap: edgeCardGap,
            rightX: rightX,
            rightCardWidth: rightCardWidth,
            rightCardGap: rightCardGap,
            rightStackY: rightStackY,
            rightEdgeWidth: rightEdgeWidth,
            leftEdgeWidth: leftEdgeWidth,
            publicHeight: publicHeight,
            appHeight: appHeight,
            dataHeight: dataHeight,
            hasDataTier: hasDataTier,
            interRowGap: interRowGap,
            sharedServicesLaneHeight: sharedServicesLaneHeight,
            sharedServicesY: sharedServicesY
        };
    }

    function buildMultilineText(x, y, lines, className, lineHeight) {
        const safeLines = lines.filter(function (line) {
            return String(line || '').trim() !== '';
        });

        if (safeLines.length === 0) {
            return '';
        }

        const textMarkup = safeLines.map(function (line, index) {
            const dy = index === 0 ? '0' : String(lineHeight);

            return '<tspan x="' + x + '" dy="' + dy + '">' + escapeHtml(line) + '</tspan>';
        }).join('');

        return '<text x="' + x + '" y="' + y + '" class="' + className + '">' + textMarkup + '</text>';
    }

    function buildSvgDataUri(svgString) {
        if (typeof svgString !== 'string' || svgString.trim() === '') {
            return '';
        }

        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    }

    function resolveCardIconHref(card) {
        if (!card.iconKey || !Object.prototype.hasOwnProperty.call(gcpVpcIconSvgMap, card.iconKey)) {
            return '';
        }

        return buildSvgDataUri(gcpVpcIconSvgMap[card.iconKey]);
    }

    function resolveAppTierIconKey(appTier) {
        return {
            ec2: 'ec2AutoScaling',
            ecs: 'ecs',
            eks: 'eks',
            lambda: 'lambda'
        }[appTier] || 'ec2AutoScaling';
    }

    function resolveDatabaseIconKey(database) {
        return {
            rds: 'rds',
            aurora: 'aurora',
            dynamodb: 'dynamodb'
        }[database] || 'rds';
    }

    function getDependentCardIds(cardId, spec) {
        const azLabels = buildAzLabels(spec.azCount);
        const zoneDependencies = {};
        const subnetDependencies = {};
        const gcpVpcChildren = [];

        azLabels.forEach(function (azLabel, index) {
            const zoneChildren = [
                'public-subnet-' + azLabel,
                'private-app-subnet-' + azLabel,
                'app-tier-' + azLabel
            ];
            const publicSubnetChildren = [];
            const appSubnetChildren = [
                'app-tier-' + azLabel
            ];
            const dataSubnetChildren = [];

            if (spec.natMode === 'per-az' || (spec.natMode === 'single' && index === 0)) {
                zoneChildren.push('nat-gateway-' + azLabel);
                publicSubnetChildren.push('nat-gateway-' + azLabel);
            }

            if (spec.bastion && index === 0) {
                zoneChildren.push('bastion-host');
                publicSubnetChildren.push('bastion-host');
            }

            if (spec.database === 'rds' || spec.database === 'aurora') {
                zoneChildren.push('private-data-subnet-' + azLabel);
                zoneChildren.push('database-tier-' + azLabel);
                dataSubnetChildren.push('database-tier-' + azLabel);
            }

            zoneDependencies['availability-zone-' + azLabel] = zoneChildren;
            subnetDependencies['public-subnet-' + azLabel] = publicSubnetChildren;
            subnetDependencies['private-app-subnet-' + azLabel] = appSubnetChildren;

            if (spec.database === 'rds' || spec.database === 'aurora') {
                subnetDependencies['private-data-subnet-' + azLabel] = dataSubnetChildren;
            }

            gcpVpcChildren.push('availability-zone-' + azLabel);
            Array.prototype.push.apply(gcpVpcChildren, zoneChildren);
        });

        if (spec.alb) {
            gcpVpcChildren.push('external-http-load-balancer');
        }

        gcpVpcChildren.push('internet-edge');

        if (spec.cache) {
            gcpVpcChildren.push('elasticache');
        }

        if (spec.endpoints) {
            gcpVpcChildren.push('vpc-endpoints');
        }

        const dependencyMap = Object.assign({}, zoneDependencies, subnetDependencies, {
            'gcp-vpc-shell': gcpVpcChildren
        });

        return Array.from(new Set(dependencyMap[cardId] || []));
    }

    function cloneLayoutOverrides(layoutOverrides) {
        return GcpVpcModelCore.cloneLayoutOverrides(layoutOverrides);
    }

    function cloneConnectorOverrides(connectorOverrides) {
        return GcpVpcModelCore.cloneConnectorOverrides(connectorOverrides);
    }

    function applyLayoutOverride(card, layoutOverrides) {
        if (!card.id) {
            return card;
        }

        const override = layoutOverrides && layoutOverrides[card.id] ? layoutOverrides[card.id] : null;

        if (!override) {
            return card;
        }

        return Object.assign({}, card, {
            x: Number.isFinite(override.x) ? override.x : card.x,
            y: Number.isFinite(override.y) ? override.y : card.y,
            width: Number.isFinite(override.width) ? override.width : card.width,
            height: Number.isFinite(override.height) ? override.height : card.height
        });
    }

    function getCardMinimumSize(card) {
        const cardId = String(card && card.id ? card.id : '');
        const tone = String(card && card.tone ? card.tone : '');

        if (cardId === 'gcp-vpc-shell') {
            return {
                width: 420,
                height: 280
            };
        }

        if (cardId.indexOf('availability-zone-') === 0 || tone === 'zone') {
            return {
                width: 220,
                height: 220
            };
        }

        if (cardId.indexOf('subnet-') !== -1) {
            return {
                width: 180,
                height: 96
            };
        }

        return {
            width: 120,
            height: 44
        };
    }

    function registerCard(cards, card, layoutOverrides) {
        const resolvedCard = applyLayoutOverride(card, layoutOverrides);

        cards.push(resolvedCard);

        return resolvedCard;
    }

    function buildWrappedLines(value, maxChars, maxLines) {
        const normalizedValue = String(value || '').replace(/\s+/g, ' ').trim();

        if (normalizedValue === '') {
            return [];
        }

        const words = normalizedValue.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(function (word) {
            const candidate = currentLine === '' ? word : currentLine + ' ' + word;

            if (candidate.length <= maxChars || currentLine === '') {
                currentLine = candidate;
                return;
            }

            lines.push(currentLine);
            currentLine = word;
        });

        if (currentLine !== '') {
            lines.push(currentLine);
        }

        if (lines.length <= maxLines) {
            return lines;
        }

        const trimmed = lines.slice(0, maxLines);
        const lastLine = trimmed[maxLines - 1];

        trimmed[maxLines - 1] = lastLine.length > Math.max(3, maxChars - 1)
            ? lastLine.slice(0, Math.max(3, maxChars - 1)).trim() + '…'
            : lastLine;

        return trimmed;
    }

    function formatSvgNumber(value) {
        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            return '0';
        }

        return String(Math.round(parsed * 100) / 100);
    }

    function normalizeConnectorSide(side) {
        const normalizedSide = String(side || '').trim().toLowerCase();
        const allowedSides = ['top', 'right', 'bottom', 'left'];

        if (allowedSides.includes(normalizedSide)) {
            return normalizedSide;
        }

        return '';
    }

    function getCardCenter(card) {
        return {
            x: card.x + (card.width / 2),
            y: card.y + (card.height / 2)
        };
    }

    function getOppositeSide(side) {
        const normalizedSide = normalizeConnectorSide(side);

        if (normalizedSide === 'top') {
            return 'bottom';
        }

        if (normalizedSide === 'bottom') {
            return 'top';
        }

        if (normalizedSide === 'left') {
            return 'right';
        }

        return 'left';
    }

    function inferConnectorSide(sourceCard, targetCard) {
        const sourceCenter = getCardCenter(sourceCard);
        const targetCenter = getCardCenter(targetCard);
        const dx = targetCenter.x - sourceCenter.x;
        const dy = targetCenter.y - sourceCenter.y;

        if (Math.abs(dx) >= Math.abs(dy)) {
            return dx >= 0 ? 'right' : 'left';
        }

        return dy >= 0 ? 'bottom' : 'top';
    }

    function resolveConnectorSides(sourceCard, targetCard, preferredSourceSide, preferredTargetSide) {
        const sourceSide = normalizeConnectorSide(preferredSourceSide) || inferConnectorSide(sourceCard, targetCard);
        const targetSide = normalizeConnectorSide(preferredTargetSide) || getOppositeSide(sourceSide);

        return {
            sourceSide: sourceSide,
            targetSide: targetSide
        };
    }

    function getCardAnchor(card, side, ratio) {
        const normalizedSide = normalizeConnectorSide(side);
        const normalizedRatio = normalizeAnchorRatio(ratio);
        const center = getCardCenter(card);

        if (normalizedRatio) {
            return {
                x: card.x + (card.width * normalizedRatio.x),
                y: card.y + (card.height * normalizedRatio.y)
            };
        }

        if (normalizedSide === 'top') {
            return {
                x: center.x,
                y: card.y
            };
        }

        if (normalizedSide === 'bottom') {
            return {
                x: center.x,
                y: card.y + card.height
            };
        }

        if (normalizedSide === 'left') {
            return {
                x: card.x,
                y: center.y
            };
        }

        return {
            x: card.x + card.width,
            y: center.y
        };
    }

    function getConnectorLeadPoint(point, side, distance) {
        const normalizedSide = normalizeConnectorSide(side);

        if (normalizedSide === 'top') {
            return {
                x: point.x,
                y: point.y - distance
            };
        }

        if (normalizedSide === 'bottom') {
            return {
                x: point.x,
                y: point.y + distance
            };
        }

        if (normalizedSide === 'left') {
            return {
                x: point.x - distance,
                y: point.y
            };
        }

        return {
            x: point.x + distance,
            y: point.y
        };
    }

    function normalizeAnchorRatio(ratio) {
        if (!ratio || typeof ratio !== 'object') {
            return null;
        }

        const x = Number(ratio.x);
        const y = Number(ratio.y);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: Math.min(1, Math.max(0, x)),
            y: Math.min(1, Math.max(0, y))
        };
    }

    function normalizeConnectorBend(bend) {
        if (!bend || typeof bend !== 'object') {
            return null;
        }

        const x = Number(bend.x);
        const y = Number(bend.y);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: x,
            y: y
        };
    }

    function buildAnchorRatio(card, x, y) {
        if (!card || !Number.isFinite(card.width) || !Number.isFinite(card.height) || card.width === 0 || card.height === 0) {
            return null;
        }

        return normalizeAnchorRatio({
            x: (x - card.x) / card.width,
            y: (y - card.y) / card.height
        });
    }

    function buildConnectorPathFromAnchors(start, end, sourceSide, targetSide) {
        const leadDistance = 28;
        const startLead = getConnectorLeadPoint(start, sourceSide, leadDistance);
        const endLead = getConnectorLeadPoint(end, targetSide, leadDistance);
        const sourceHorizontal = sourceSide === 'left' || sourceSide === 'right';
        const targetHorizontal = targetSide === 'left' || targetSide === 'right';
        const points = [start, startLead];

        if (sourceHorizontal && targetHorizontal) {
            const midX = startLead.x + ((endLead.x - startLead.x) / 2);

            points.push({
                x: midX,
                y: startLead.y
            });
            points.push({
                x: midX,
                y: endLead.y
            });
        } else if (!sourceHorizontal && !targetHorizontal) {
            const midY = startLead.y + ((endLead.y - startLead.y) / 2);

            points.push({
                x: startLead.x,
                y: midY
            });
            points.push({
                x: endLead.x,
                y: midY
            });
        } else {
            points.push({
                x: endLead.x,
                y: startLead.y
            });
        }

        points.push(endLead);
        points.push(end);

        return points.map(function (point, index) {
            const command = index === 0 ? 'M' : 'L';

            return command + ' ' + formatSvgNumber(point.x) + ' ' + formatSvgNumber(point.y);
        }).join(' ');
    }

    function buildConnectorPathFromAnchorsWithBend(start, end, sourceSide, targetSide, bend) {
        const leadDistance = 28;
        const startLead = getConnectorLeadPoint(start, sourceSide, leadDistance);
        const endLead = getConnectorLeadPoint(end, targetSide, leadDistance);
        const normalizedBend = normalizeConnectorBend(bend);

        if (!normalizedBend) {
            return buildConnectorPathFromAnchors(start, end, sourceSide, targetSide);
        }

        return [
            start,
            startLead,
            {
                x: normalizedBend.x,
                y: startLead.y
            },
            normalizedBend,
            {
                x: endLead.x,
                y: normalizedBend.y
            },
            endLead,
            end
        ].map(function (point, index) {
            const command = index === 0 ? 'M' : 'L';

            return command + ' ' + formatSvgNumber(point.x) + ' ' + formatSvgNumber(point.y);
        }).join(' ');
    }

    function buildConnectorPathFromCards(sourceCard, targetCard, preferredSourceSide, preferredTargetSide, sourceRatio, targetRatio, bend) {
        const sides = resolveConnectorSides(sourceCard, targetCard, preferredSourceSide, preferredTargetSide);
        const start = getCardAnchor(sourceCard, sides.sourceSide, sourceRatio);
        const end = getCardAnchor(targetCard, sides.targetSide, targetRatio);

        return buildConnectorPathFromAnchorsWithBend(start, end, sides.sourceSide, sides.targetSide, bend);
    }

    function renderResizeHandle(card, cornerRadius) {
        const handleSize = 20;
        const handleX = card.x + card.width - handleSize - 4;
        const handleY = card.y + card.height - handleSize - 4;

        return '<rect x="' + handleX + '" y="' + handleY + '" width="' + handleSize + '" height="' + handleSize + '" rx="' + cornerRadius + '" class="diagram-resize-handle" data-resize-card-id="' + escapeHtml(card.id || '') + '"></rect>';
    }

    function buildStageCardAriaLabel(card) {
        const subtitleValue = Array.isArray(card.subtitle) ? card.subtitle.join(' ') : String(card.subtitle || '').trim();
        const labelParts = [card.label];

        if (subtitleValue !== '') {
            labelParts.push(subtitleValue);
        }

        if (card.draggable === true) {
            labelParts.push('Press Enter to select. Use arrow keys to move. Use Alt plus arrow keys to resize.');
        }

        return labelParts.join('. ');
    }

    function renderSvgCard(card) {
        const draggable = card.draggable === true;
        const iconHref = resolveCardIconHref(card);
        const iconTileX = card.x + 12;
        const iconTileY = card.y + 12;
        const iconImageX = card.x + 18;
        const iconImageY = card.y + 18;
        const shortText = iconHref === '' ? buildMultilineText(card.x + 36, card.y + 33, [card.short], 'diagram-pill-text', 14) : '';
        const iconImage = iconHref !== '' ? '<image href="' + iconHref + '" x="' + iconImageX + '" y="' + iconImageY + '" width="20" height="20" preserveAspectRatio="xMidYMid meet"></image>' : '';
        const textAreaWidth = Math.max(10, card.width - 88);
        const titleLines = buildWrappedLines(card.label, Math.max(8, Math.floor(textAreaWidth / 6.5)), 1);
        const subtitleValue = Array.isArray(card.subtitle) ? card.subtitle.join(' ') : (card.subtitle || '');
        const subtitleLines = buildWrappedLines(subtitleValue, Math.max(10, Math.floor(textAreaWidth / 6)), 1);
        const titleY = card.y + 30;
        const subtitleY = card.y + 50 + ((titleLines.length - 1) * 14);

        return [
            '<g class="diagram-card-group' + (draggable ? ' diagram-card-group-draggable' : '') + '" data-card-id="' + escapeHtml(card.id || '') + '" data-card-x="' + card.x + '" data-card-y="' + card.y + '" data-card-width="' + card.width + '" data-card-height="' + card.height + '" data-draggable="' + (draggable ? 'true' : 'false') + '"' + (draggable ? ' tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml(buildStageCardAriaLabel(card)) + '"' : '') + '>',
            '<rect x="' + card.x + '" y="' + card.y + '" width="' + card.width + '" height="' + card.height + '" rx="16" class="diagram-card diagram-card-' + card.tone + '"></rect>',
            '<rect x="' + iconTileX + '" y="' + iconTileY + '" width="32" height="32" rx="10" class="diagram-pill diagram-pill-' + card.tone + '"></rect>',
            iconImage,
            shortText,
            buildMultilineText(card.x + 58, titleY, titleLines, 'diagram-card-title', 14),
            buildMultilineText(card.x + 58, subtitleY, subtitleLines, 'diagram-card-subtitle', 13),
            '<rect x="' + card.x + '" y="' + card.y + '" width="' + card.width + '" height="' + card.height + '" rx="16" class="diagram-card-hitbox"></rect>',
            renderResizeHandle(card, 7),
            '</g>'
        ].join('');
    }

    function getCardRenderLayer(card) {
        const cardId = String(card && card.id ? card.id : '');
        const tone = String(card && card.tone ? card.tone : '');

        if (cardId.indexOf('availability-zone-') === 0 || tone === 'zone') {
            return 10;
        }

        if (cardId.indexOf('subnet-') !== -1 || tone === 'public' || tone === 'private') {
            return 20;
        }

        return 40;
    }

    function splitCardsByLayer(cards) {
        const backgroundCards = [];
        const foregroundCards = [];

        cards.forEach(function (card) {
            if (getCardRenderLayer(card) < 40) {
                backgroundCards.push(card);
                return;
            }

            foregroundCards.push(card);
        });

        return {
            backgroundCards: backgroundCards.sort(function (firstCard, secondCard) {
                return getCardRenderLayer(firstCard) - getCardRenderLayer(secondCard);
            }),
            foregroundCards: foregroundCards
        };
    }

    function renderCardConnector(sourceCard, targetCard, options) {
        const resolvedOptions = options || {};
        const sides = resolveConnectorSides(sourceCard, targetCard, resolvedOptions.sourceSide, resolvedOptions.targetSide);
        const markerId = resolvedOptions.active ? 'gcpVpcArrowActive' : 'gcpVpcArrow';
        const connectorClass = 'diagram-connector' + (resolvedOptions.active ? ' diagram-connector-active' : '');
        const connectorId = String(resolvedOptions.id || sourceCard.id + '-to-' + targetCard.id);
        const connectorOverride = connectorOverrideContext[connectorId] || {};
        const sourceRatio = normalizeAnchorRatio(connectorOverride.sourceRatio) || normalizeAnchorRatio(resolvedOptions.sourceRatio);
        const targetRatio = normalizeAnchorRatio(connectorOverride.targetRatio) || normalizeAnchorRatio(resolvedOptions.targetRatio);
        const bend = normalizeConnectorBend(connectorOverride.bend);
        const ratioAttributes = [];

        if (sourceRatio) {
            ratioAttributes.push(' data-source-ratio-x="' + formatSvgNumber(sourceRatio.x) + '"');
            ratioAttributes.push(' data-source-ratio-y="' + formatSvgNumber(sourceRatio.y) + '"');
        }

        if (targetRatio) {
            ratioAttributes.push(' data-target-ratio-x="' + formatSvgNumber(targetRatio.x) + '"');
            ratioAttributes.push(' data-target-ratio-y="' + formatSvgNumber(targetRatio.y) + '"');
        }

        if (bend) {
            ratioAttributes.push(' data-bend-x="' + formatSvgNumber(bend.x) + '"');
            ratioAttributes.push(' data-bend-y="' + formatSvgNumber(bend.y) + '"');
        }

        return [
            '<path d="' + buildConnectorPathFromCards(sourceCard, targetCard, sides.sourceSide, sides.targetSide, sourceRatio, targetRatio, bend) + '"',
            ' class="' + connectorClass + '"',
            ' data-connector-id="' + escapeHtml(connectorId) + '"',
            ' data-source-card="' + escapeHtml(sourceCard.id || '') + '"',
            ' data-target-card="' + escapeHtml(targetCard.id || '') + '"',
            ' data-source-side="' + sides.sourceSide + '"',
            ' data-target-side="' + sides.targetSide + '"',
            ratioAttributes.join(''),
            ' marker-end="url(#' + markerId + ')"></path>'
        ].join('');
    }

    function renderVpcShell(shell) {
        const iconHref = resolveCardIconHref(shell);
        const iconImage = iconHref !== ''
            ? '<image href="' + iconHref + '" x="' + (shell.x + 18) + '" y="' + (shell.y + 18) + '" width="24" height="24" preserveAspectRatio="xMidYMid meet"></image>'
            : '';

        return [
            '<g class="diagram-card-group diagram-card-group-draggable" data-card-id="' + shell.id + '" data-card-x="' + shell.x + '" data-card-y="' + shell.y + '" data-card-width="' + shell.width + '" data-card-height="' + shell.height + '" data-draggable="true" tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml('GCP VPC. ' + shell.meta + '. Press Enter to select. Use arrow keys to move. Use Alt plus arrow keys to resize.') + '">',
            '<rect x="' + shell.x + '" y="' + shell.y + '" width="' + shell.width + '" height="' + shell.height + '" rx="24" class="diagram-vpc"></rect>',
            '<rect x="' + (shell.x + 12) + '" y="' + (shell.y + 12) + '" width="36" height="36" rx="12" class="diagram-pill diagram-pill-service"></rect>',
            iconImage,
            buildMultilineText(shell.x + 60, shell.y + 34, ['GCP VPC'], 'diagram-vpc-title', 16),
            buildMultilineText(shell.x + 60, shell.y + 58, [shell.meta], 'diagram-vpc-meta', 16),
            '<rect x="' + shell.x + '" y="' + shell.y + '" width="' + shell.width + '" height="' + shell.height + '" rx="24" class="diagram-card-hitbox"></rect>',
            renderResizeHandle(shell, 8),
            '</g>'
        ].join('');
    }

    function computeSvgBounds(geometry, cards, vpcShell) {
        const boundsCards = cards.concat([vpcShell]);
        const maxX = boundsCards.reduce(function (currentMax, card) {
            return Math.max(currentMax, card.x + card.width);
        }, geometry.width);
        const maxY = boundsCards.reduce(function (currentMax, card) {
            return Math.max(currentMax, card.y + card.height);
        }, geometry.height);

        return {
            width: Math.max(geometry.width, Math.ceil(maxX + 80)),
            height: Math.max(geometry.height, Math.ceil(maxY + 80))
        };
    }

    function buildSvgMarkup(spec, layoutOverrides, connectorOverrides) {
        const geometry = computeStageGeometry(spec);
        const safeLayoutOverrides = cloneLayoutOverrides(layoutOverrides);
        const safeConnectorOverrides = cloneConnectorOverrides(connectorOverrides);
        const azLabels = buildAzLabels(spec.azCount);
        const cards = [];
        const connectors = [];
        const appCards = [];
        const databaseCards = [];
        connectorOverrideContext = safeConnectorOverrides;
        const vpcShellOverride = safeLayoutOverrides['gcp-vpc-shell'] || {};
        const vpcShell = {
            id: 'gcp-vpc-shell',
            x: Number.isFinite(vpcShellOverride.x) ? vpcShellOverride.x : geometry.vpcX,
            y: Number.isFinite(vpcShellOverride.y) ? vpcShellOverride.y : geometry.vpcY,
            width: Number.isFinite(vpcShellOverride.width) ? vpcShellOverride.width : geometry.vpcWidth,
            height: Number.isFinite(vpcShellOverride.height) ? vpcShellOverride.height : geometry.vpcHeight,
            meta: spec.region + ' • ' + spec.cidr,
            iconKey: 'gcpVpc'
        };
        let currentEdgeCenterX = geometry.edgeRowX + (geometry.edgeCardWidth / 2);
        let previousEdgeCard = null;
        const vpcCenterX = geometry.vpcX + (geometry.vpcWidth / 2);
        const igwY = geometry.vpcY + 18;
        const albY = geometry.vpcY + 88;
        let albCard = null;
        let nextRightStackY = geometry.rightStackY;

        function addCard(card) {
            return registerCard(cards, card, safeLayoutOverrides);
        }

        function addRightRailCard(card) {
            const nextCard = addCard(Object.assign({}, card, {
                x: geometry.rightX,
                y: nextRightStackY,
                width: geometry.rightCardWidth
            }));

            nextRightStackY += nextCard.height + geometry.rightCardGap;

            return nextCard;
        }

        const igwCard = addCard({
            id: 'internet-edge',
            x: vpcCenterX - 86,
            y: igwY,
            width: 188,
            height: 44,
            label: 'Internet Edge',
            short: 'NET',
            subtitle: '',
            tone: 'service',
            iconKey: 'internetGateway',
            draggable: true
        });

        geometry.edgeCards.forEach(function (edgeCard) {
            const card = addCard({
                id: edgeCard.id,
                x: currentEdgeCenterX - (geometry.edgeCardWidth / 2),
                y: geometry.edgeRowY,
                width: geometry.edgeCardWidth,
                height: 64,
                label: edgeCard.label,
                short: edgeCard.short,
                subtitle: '',
                tone: edgeCard.tone,
                iconKey: edgeCard.id === 'users'
                    ? 'gcpVpc'
                    : edgeCard.id === 'route53'
                        ? 'route53'
                        : edgeCard.id === 'cloudfront'
                            ? 'cloudFront'
                            : edgeCard.id === 'waf'
                                ? 'waf'
                                : '',
                draggable: true
            });

            if (previousEdgeCard !== null) {
                connectors.push(renderCardConnector(previousEdgeCard, card, {
                    id: previousEdgeCard.id + '-to-' + card.id,
                    sourceSide: 'right',
                    targetSide: 'left'
                }));
            }

            previousEdgeCard = card;
            currentEdgeCenterX += geometry.edgeCardWidth + geometry.edgeCardGap;
        });

        if (previousEdgeCard !== null) {
            connectors.push(renderCardConnector(previousEdgeCard, igwCard, {
                id: previousEdgeCard.id + '-to-internet-edge',
                sourceSide: 'bottom',
                targetSide: 'top',
                active: true
            }));
        }

        if (spec.alb) {
            albCard = addCard({
                id: 'external-http-load-balancer',
                x: vpcCenterX - 152,
                y: albY,
                width: 304,
                height: 64,
                label: 'External HTTP(S) Load Balancer',
                short: 'HTTPS',
                subtitle: ['Internet-facing ingress'],
                tone: 'security',
                iconKey: 'applicationLoadBalancer',
                draggable: true
            });

            connectors.push(renderCardConnector(igwCard, albCard, {
                id: 'internet-edge-to-external-http-load-balancer',
                sourceSide: 'bottom',
                targetSide: 'top',
                active: true
            }));
        }

        azLabels.forEach(function (azLabel, index) {
            const azX = geometry.azXStart + (index * (geometry.azWidth + geometry.azGap));
            const publicY = geometry.azY + 38;
            const appY = publicY + geometry.publicHeight + geometry.interRowGap;
            const dataY = appY + geometry.appHeight + geometry.interRowGap;
            const subnetInnerX = azX + 12;
            const subnetWidth = geometry.azWidth - 24;
            const hasNatInPublicSubnet = spec.natMode === 'per-az' || (spec.natMode === 'single' && index === 0);
            const hasBastionInPublicSubnet = spec.bastion && index === 0;
            const stackPublicCards = hasNatInPublicSubnet && hasBastionInPublicSubnet;
            const publicCardInset = 16;
            const publicCardY = stackPublicCards ? publicY + 22 : publicY + 34;
            const publicCardHeight = stackPublicCards ? 52 : 64;
            const publicCardWidth = subnetWidth - (publicCardInset * 2);
            const bastionCardY = stackPublicCards ? publicY + 84 : publicCardY;
            const appCard = addCard({
                id: 'app-tier-' + azLabel,
                x: subnetInnerX + 12,
                y: appY + 40,
                width: subnetWidth - 24,
                height: 72,
                label: appTierLabel(spec.appTier),
                short: spec.appTier.toUpperCase().slice(0, 3),
                subtitle: ['zone ' + azLabel.toUpperCase() + ' workload'],
                tone: 'service',
                iconKey: resolveAppTierIconKey(spec.appTier),
                draggable: true
            });

            appCards.push(appCard);

            addCard({
                id: 'availability-zone-' + azLabel,
                x: azX,
                y: geometry.azY,
                width: geometry.azWidth,
                height: geometry.azHeight,
                label: 'Availability Zone ' + azLabel.toUpperCase(),
                short: 'zone ' + azLabel.toUpperCase(),
                subtitle: ['Subnet and workload grouping'],
                tone: 'zone',
                iconKey: 'gcpVpc',
                draggable: true
            });

            addCard({
                id: 'public-subnet-' + azLabel,
                x: subnetInnerX,
                y: publicY,
                width: subnetWidth,
                height: geometry.publicHeight,
                label: 'Public Subnet ' + azLabel.toUpperCase(),
                short: 'PUB',
                subtitle: ['Ingress and egress tier'],
                tone: 'public',
                iconKey: 'vpcRouter',
                draggable: true
            });

            addCard({
                id: 'private-app-subnet-' + azLabel,
                x: subnetInnerX,
                y: appY,
                width: subnetWidth,
                height: geometry.appHeight,
                label: 'Private App Subnet ' + azLabel.toUpperCase(),
                short: 'APP',
                subtitle: ['Private workload tier'],
                tone: 'private',
                iconKey: 'vpcRouter',
                draggable: true
            });

            if (hasNatInPublicSubnet) {
                addCard({
                    id: 'nat-gateway-' + azLabel,
                    x: subnetInnerX + publicCardInset,
                    y: publicCardY,
                    width: publicCardWidth,
                    height: publicCardHeight,
                    label: 'Cloud NAT',
                    short: 'NAT',
                    subtitle: [spec.natMode === 'single' ? 'Shared outbound path' : 'Local outbound path'],
                    tone: 'public',
                    iconKey: 'natGateway',
                    draggable: true
                });
            }

            if (spec.bastion && index === 0) {
                addCard({
                    id: 'bastion-host',
                    x: subnetInnerX + publicCardInset,
                    y: bastionCardY,
                    width: publicCardWidth,
                    height: publicCardHeight,
                    label: 'Identity-Aware Proxy',
                    short: 'IAP',
                    subtitle: ['Admin entry point'],
                    tone: 'security',
                    iconKey: 'bastion',
                    draggable: true
                });
            }

            if (geometry.hasDataTier) {
                addCard({
                    id: 'private-data-subnet-' + azLabel,
                    x: subnetInnerX,
                    y: dataY,
                    width: subnetWidth,
                    height: geometry.dataHeight,
                    label: 'Private Data Subnet ' + azLabel.toUpperCase(),
                    short: 'DATA',
                    subtitle: ['Stateful data services'],
                    tone: 'private',
                    iconKey: 'vpcRouter',
                    draggable: true
                });

                databaseCards.push(addCard({
                    id: 'database-tier-' + azLabel,
                    x: subnetInnerX + 12,
                    y: dataY + 38,
                    width: subnetWidth - 24,
                    height: 64,
                    label: databaseLabel(spec.database) + (index === 0 ? ' Primary' : ' Standby'),
                    short: spec.database === 'aurora' ? 'PG' : 'SQL',
                    subtitle: [index === 0 ? 'Writer placement' : 'Replica or standby'],
                    tone: 'database',
                    iconKey: resolveDatabaseIconKey(spec.database),
                    draggable: true
                }));
            }
        });

        if (albCard) {
            appCards.forEach(function (card) {
                connectors.push(renderCardConnector(albCard, card, {
                    id: 'external-http-load-balancer-to-' + card.id,
                    sourceSide: 'bottom',
                    targetSide: 'top',
                    active: true
                }));
            });
        } else {
            appCards.forEach(function (card) {
                connectors.push(renderCardConnector(igwCard, card, {
                    id: 'internet-edge-to-' + card.id,
                    sourceSide: 'bottom',
                    targetSide: 'top',
                    active: true
                }));
            });
        }

        if (databaseCards.length > 0) {
            appCards.forEach(function (card, index) {
                if (!databaseCards[index]) {
                    return;
                }

                connectors.push(renderCardConnector(card, databaseCards[index], {
                    id: card.id + '-to-' + databaseCards[index].id,
                    sourceSide: 'bottom',
                    targetSide: 'top'
                }));
            });

            if (databaseCards.length > 1) {
                connectors.push(renderCardConnector(databaseCards[0], databaseCards[databaseCards.length - 1], {
                    id: 'database-primary-to-standby',
                    sourceSide: 'right',
                    targetSide: 'left'
                }));
            }
        }

        if (spec.cache) {
            const cacheCard = addCard({
                id: 'elasticache',
                x: vpcCenterX - 140,
                y: geometry.sharedServicesY,
                width: 280,
                height: 62,
                label: 'Memorystore for Redis',
                short: 'RED',
                subtitle: ['Shared low-latency cache tier'],
                tone: 'service',
                iconKey: 'elasticache',
                draggable: true
            });

            appCards.forEach(function (card) {
                connectors.push(renderCardConnector(card, cacheCard, {
                    id: card.id + '-to-elasticache',
                    sourceSide: 'bottom',
                    targetSide: 'top'
                }));
            });
        }

        if (spec.siteToSiteVpn) {
            const onPremCard = addCard({
                id: 'on-premises',
                x: 32,
                y: geometry.vpcY + 166,
                width: 188,
                height: 64,
                label: 'On-Premises',
                short: 'LAN',
                subtitle: ['Hybrid private network'],
                tone: 'edge',
                iconKey: 'siteToSiteVpn',
                draggable: true
            });

            const vpnCard = addCard({
                id: 'site-to-site-vpn',
                x: 62,
                y: geometry.vpcY + 252,
                width: 164,
                height: 62,
                label: 'Cloud VPN',
                short: 'VPN',
                subtitle: ['Encrypted site link'],
                tone: 'security',
                iconKey: 'siteToSiteVpn',
                draggable: true
            });

            connectors.push(renderCardConnector(onPremCard, vpnCard, {
                id: 'on-premises-to-site-to-site-vpn',
                sourceSide: 'bottom',
                targetSide: 'top'
            }));
            connectors.push(renderCardConnector(vpnCard, vpcShell, {
                    id: 'site-to-site-vpn-to-gcp-vpc',
                sourceSide: 'right',
                targetSide: 'left',
                targetRatio: buildAnchorRatio(vpcShell, vpcShell.x, vpnCard.y + (vpnCard.height / 2)),
                active: true
            }));
        }

        if (spec.transitGateway) {
            const transitGatewayCard = addCard({
                id: 'transit-gateway',
                x: 44,
                y: geometry.vpcY + 340,
                width: 176,
                height: 62,
                label: 'Network Connectivity Center',
                short: 'NCC',
                subtitle: ['Shared network hub'],
                tone: 'service',
                iconKey: 'transitGateway',
                draggable: true
            });

            connectors.push(renderCardConnector(transitGatewayCard, vpcShell, {
                    id: 'transit-gateway-to-gcp-vpc',
                sourceSide: 'right',
                targetSide: 'left',
                targetRatio: buildAnchorRatio(vpcShell, vpcShell.x, transitGatewayCard.y + (transitGatewayCard.height / 2)),
                active: true
            }));
        }

        if (spec.database === 'dynamodb') {
            const dynamoDbCard = addRightRailCard({
                id: 'dynamodb',
                height: 64,
                label: 'Firestore',
                short: 'FS',
                subtitle: ['Managed data tier'],
                tone: 'database',
                iconKey: 'dynamodb',
                draggable: true
            });

            appCards.forEach(function (card) {
                connectors.push(renderCardConnector(card, dynamoDbCard, {
                    id: card.id + '-to-dynamodb',
                    sourceSide: 'right',
                    targetSide: 'left'
                }));
            });
        }

        if (spec.cloudWatch) {
            addRightRailCard({
                id: 'cloudwatch',
                height: 64,
                label: 'Cloud Monitoring',
                short: 'MON',
                subtitle: ['Metrics and alarms'],
                tone: 'service',
                iconKey: 'cloudWatch',
                draggable: true
            });
        }

        if (spec.flowLogs) {
            addRightRailCard({
                id: 'vpc-flow-logs',
                height: 64,
                label: 'VPC Flow Logs',
                short: 'LOG',
                subtitle: ['Traffic telemetry'],
                tone: 'service',
                iconKey: 'vpcFlowLogs',
                draggable: true
            });
        }

        if (spec.endpoints) {
            addRightRailCard({
                id: 'vpc-endpoints',
                height: 64,
                label: 'Private Service Connect',
                short: 'EP',
                subtitle: ['Private service access'],
                tone: 'service',
                iconKey: 'vpcEndpoints',
                draggable: true
            });
        }

        cards.forEach(function (card) {
            if (card.id === 'cloudwatch' || card.id === 'vpc-flow-logs' || card.id === 'vpc-endpoints') {
                connectors.push(renderCardConnector(vpcShell, card, {
                    id: 'gcp-vpc-to-' + card.id,
                    sourceSide: 'right',
                    targetSide: 'left',
                    sourceRatio: buildAnchorRatio(vpcShell, vpcShell.x + vpcShell.width, card.y + (card.height / 2))
                }));
            }
        });

        const layeredCards = splitCardsByLayer(cards);
        const svgBackgroundCards = layeredCards.backgroundCards.map(renderSvgCard).join('');
        const svgForegroundCards = layeredCards.foregroundCards.map(renderSvgCard).join('');
        const svgConnectors = connectors.join('');
        const vpcShellMarkup = renderVpcShell(vpcShell);
        const svgBounds = computeSvgBounds(geometry, cards, vpcShell);

        return {
            svgMarkup: [
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + svgBounds.width + ' ' + svgBounds.height + '" role="img" aria-label="' + escapeHtml(spec.title) + '">',
                '<defs>',
                '<style><![CDATA[',
                '.diagram-root{font-family:Roboto,Arial,sans-serif;--diagram-font-title:26px;--diagram-font-meta:15px;--diagram-font-pill:13px;--diagram-font-card-title:16px;--diagram-font-card-subtitle:12px;--diagram-font-zone-label:14px;}',
                '.diagram-vpc{fill:#eef7ff;stroke:#7ec1e8;stroke-width:2;}',
                '.diagram-card-group.is-selected .diagram-vpc{stroke:#2563eb;stroke-width:3;filter:drop-shadow(0 10px 18px rgba(37,99,235,0.18));}',
                '.diagram-vpc-title{fill:#0c4a6e;font-size:var(--diagram-font-title);font-weight:800;}',
                '.diagram-vpc-meta{fill:#075985;font-size:var(--diagram-font-meta);font-weight:600;}',
                '.diagram-card{stroke:#98c7e3;stroke-width:1.5;filter:drop-shadow(0 6px 10px rgba(12,82,126,0.08));}',
                '.diagram-card-zone{fill:#f8fdff;}',
                '.diagram-card-public{fill:#dff3ff;}',
                '.diagram-card-private{fill:#eef7ff;}',
                '.diagram-card-service{fill:#ffffff;}',
                '.diagram-card-edge{fill:#e6f5ff;}',
                '.diagram-card-security{fill:#eff6ff;stroke:#bfdbfe;}',
                '.diagram-card-database{fill:#ecfdf5;stroke:#86efac;}',
                '.diagram-card-hitbox{fill:transparent;pointer-events:all;}',
                '.diagram-card-group.is-selected .diagram-card{stroke:#2563eb;stroke-width:3;filter:drop-shadow(0 10px 18px rgba(37,99,235,0.18));}',
                '.diagram-resize-handle{display:none;fill:#ffffff;stroke:#2563eb;stroke-width:2;cursor:nwse-resize;pointer-events:all;filter:drop-shadow(0 4px 8px rgba(37,99,235,0.24));}',
                '.diagram-card-group.is-selected .diagram-resize-handle{display:block;}',
                '.diagram-card-group.is-resizing{cursor:nwse-resize;opacity:0.96;}',
                '.diagram-resize-preview{fill:rgba(37,99,235,0.08);stroke:#2563eb;stroke-width:2;stroke-dasharray:8 6;pointer-events:none;}',
                '.diagram-pill{stroke:none;}',
                '.diagram-pill-zone{fill:#f3f4f6;}',
                '.diagram-pill-public{fill:#bae6fd;}',
                '.diagram-pill-private{fill:#bfdbfe;}',
                '.diagram-pill-service{fill:#ccfbf1;}',
                '.diagram-pill-edge{fill:#7dd3fc;}',
                '.diagram-pill-security{fill:#bfdbfe;}',
                '.diagram-pill-database{fill:#6ee7b7;}',
                '.diagram-pill-text{fill:#1f2937;font-size:var(--diagram-font-pill);font-weight:800;text-anchor:middle;}',
                '.diagram-card-title{fill:#1f2937;font-size:var(--diagram-font-card-title);font-weight:800;}',
                '.diagram-card-subtitle{fill:#6b7280;font-size:var(--diagram-font-card-subtitle);font-weight:500;}',
                '.diagram-zone-label{fill:#0c4a6e;font-size:var(--diagram-font-zone-label);font-weight:800;}',
                '.diagram-connector{fill:none;stroke:#2563eb;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;opacity:0.92;pointer-events:stroke;}',
                '.diagram-connector-active{stroke:#0ea5e9;stroke-width:2.8;}',
                '.diagram-connector.is-selected{stroke:#0369a1;stroke-width:4;opacity:1;}',
                '.diagram-connector-anchor-handle{fill:#ffffff;stroke:#0369a1;stroke-width:3;cursor:grab;pointer-events:all;filter:drop-shadow(0 4px 8px rgba(3,105,161,0.24));}',
                '.diagram-connector-anchor-handle:active{cursor:grabbing;}',
                '.diagram-connector-bend-handle{fill:#0369a1;stroke:#ffffff;stroke-width:3;cursor:move;pointer-events:all;filter:drop-shadow(0 4px 8px rgba(3,105,161,0.28));}',
                '.diagram-connector-bend-handle:active{cursor:grabbing;}',
                '.diagram-card-group-draggable{cursor:grab;}',
                '.diagram-card-group-draggable.is-dragging{cursor:grabbing;opacity:0.96;}',
                '.diagram-card-group-draggable:hover .diagram-card{stroke:#2563eb;stroke-width:2.2;}',
                '.diagram-card-group-draggable:focus-visible{outline:none;}',
                '.diagram-card-group-draggable:focus-visible .diagram-card{stroke:#2563eb;stroke-width:2.6;filter:drop-shadow(0 10px 18px rgba(37,99,235,0.18));}',
                '.diagram-card-group-draggable:focus-visible .diagram-vpc{stroke:#2563eb;stroke-width:2.8;filter:drop-shadow(0 10px 18px rgba(37,99,235,0.18));}',
                ']]></style>',
                '<marker id="gcpVpcArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
                '<path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb"></path>',
                '</marker>',
                '<marker id="gcpVpcArrowActive" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">',
                '<path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9"></path>',
                '</marker>',
                '</defs>',
                '<g class="diagram-root">',
                vpcShellMarkup,
                svgBackgroundCards,
                svgConnectors,
                svgForegroundCards,
                '</g>',
                '</svg>'
            ].join(''),
            layoutOverrides: safeLayoutOverrides,
            connectorOverrides: safeConnectorOverrides,
            cards: cards.concat([{
                id: vpcShell.id,
                label: 'GCP VPC',
                x: vpcShell.x,
                y: vpcShell.y,
                width: vpcShell.width,
                height: vpcShell.height
            }])
        };
    }

    function buildExportPayload(spec, inventory, layoutOverrides, connectorOverrides) {
        return GcpVpcModelCore.buildExportPayload(spec, inventory, layoutOverrides, connectorOverrides, buildNotePayload(spec));
    }

    function highlightJson(value) {
        const json = JSON.stringify(value, null, 2);
        const tokenPattern = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"\s*:?)|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?/g;
        let lastIndex = 0;
        let output = '';
        let matchResult = tokenPattern.exec(json);

        while (matchResult !== null) {
            const match = matchResult[0];

            output += escapeHtml(json.slice(lastIndex, matchResult.index));

            if (/^"/.test(match)) {
                output += /:$/.test(match)
                    ? '<span class="json-key">' + escapeHtml(match) + '</span>'
                    : '<span class="json-string">' + escapeHtml(match) + '</span>';
            } else if (/true|false/.test(match)) {
                output += '<span class="json-boolean">' + escapeHtml(match) + '</span>';
            } else if (/null/.test(match)) {
                output += '<span class="json-null">' + escapeHtml(match) + '</span>';
            } else {
                output += '<span class="json-number">' + escapeHtml(match) + '</span>';
            }

            lastIndex = tokenPattern.lastIndex;
            matchResult = tokenPattern.exec(json);
        }

        output += escapeHtml(json.slice(lastIndex));

        return output;
    }

    function sortInventoryItems(inventory) {
        const sortedInventory = inventory.map(function (item, index) {
            return Object.assign({}, item, {
                inventoryIndex: index + 1
            });
        });

        if (inventorySortMode === 'id') {
            return sortedInventory;
        }

        const sortFields = {
            alphabetical: ['component', 'placement', 'purpose'],
            component: ['component', 'placement', 'purpose'],
            placement: ['placement', 'component', 'purpose'],
            purpose: ['purpose', 'component', 'placement']
        }[inventorySortMode] || ['inventoryIndex'];

        sortedInventory.sort(function (firstItem, secondItem) {
            return sortFields.reduce(function (result, field) {
                if (result !== 0) {
                    return result;
                }

                if (field === 'inventoryIndex') {
                    return firstItem.inventoryIndex - secondItem.inventoryIndex;
                }

                return String(firstItem[field] || '').localeCompare(String(secondItem[field] || ''), undefined, {
                    sensitivity: 'base',
                    numeric: true
                });
            }, 0);
        });

        return sortedInventory;
    }

    function syncInventorySortSelect() {
        const activeOption = inventorySortOptions.find(function (option) {
            return option.dataset.sortValue === inventorySortMode;
        }) || inventorySortOptions[0];

        inventorySortSummary.textContent = activeOption ? activeOption.textContent : 'ID';
        inventorySortOptions.forEach(function (option) {
            const isActive = option === activeOption;

            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    function setInventorySortMode(sortMode) {
        inventorySortMode = String(sortMode || 'id');
        inventorySortInput.value = inventorySortMode;
        syncInventorySortSelect();

        if (latestResult && Array.isArray(latestResult.inventory)) {
            renderInventory(latestResult.inventory);
        }
    }

    function applyInventorySortMode() {
        setInventorySortMode(inventorySortInput.value || 'id');
    }

    function renderInventory(inventory) {
        const sortedInventory = sortInventoryItems(inventory);

        inventoryTableBody.innerHTML = sortedInventory.map(function (item, index) {
            return [
                '<tr>',
                '<td>' + escapeHtml(item.inventoryIndex || index + 1) + '</td>',
                '<td>' + escapeHtml(item.component) + '</td>',
                '<td>' + escapeHtml(item.placement) + '</td>',
                '<td>' + escapeHtml(item.purpose) + '</td>',
                '<td class="gcp-vpc-table-action-cell">',
                '<button type="button" class="gcp-vpc-row-copy" data-inventory-copy-row="' + escapeHtml(index) + '" aria-label="Copy inventory row ' + escapeHtml(item.inventoryIndex || index + 1) + '" title="Copy inventory row">',
                '<i class="bi bi-clipboard" aria-hidden="true"></i>',
                '</button>',
                '</td>',
                '</tr>'
            ].join('');
        }).join('');
    }

    function getInventoryColumnValue(item, index, column) {
        if (column === 'index') {
            return item.inventoryIndex || index + 1;
        }

        if (column === 'component') {
            return item.component || '';
        }

        if (column === 'placement') {
            return item.placement || '';
        }

        if (column === 'purpose') {
            return item.purpose || '';
        }

        return '';
    }

    function buildInventoryRowText(item, index) {
        const values = ['index', 'component', 'placement', 'purpose'].map(function (column) {
            const heading = inventoryColumnLabels[column] || column;
            const value = getInventoryColumnValue(item, index, column);

            return heading + ': ' + value;
        });

        return values.join('\n');
    }

    function buildInventoryCopyText(rowIndex) {
        const sortedInventory = sortInventoryItems(latestResult.inventory);
        const item = sortedInventory[rowIndex];

        if (!item) {
            return '';
        }

        return buildInventoryRowText(item, rowIndex);
    }

    function flashInventoryCopyButton(button) {
        button.classList.add('copied');
        button.setAttribute('title', 'Copied');

        window.setTimeout(function () {
            button.classList.remove('copied');
            button.setAttribute('title', button.dataset.copyTitle || 'Copy row');
        }, 1400);
    }

    async function copyInventoryRow(rowIndex, button) {
        if (!latestResult || !Array.isArray(latestResult.inventory)) {
            return;
        }

        const normalizedRowIndex = Number.parseInt(rowIndex, 10);

        if (!Number.isInteger(normalizedRowIndex) || normalizedRowIndex < 0) {
            return;
        }

        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            showError('Clipboard access is not available in this browser.');
            return;
        }

        const copyText = buildInventoryCopyText(normalizedRowIndex);

        if (copyText === '') {
            return;
        }

        try {
            await navigator.clipboard.writeText(copyText);
            flashInventoryCopyButton(button);
        } catch (error) {
            showError('Failed to copy the inventory row to the clipboard.');
        }
    }

    function renderNotes(spec) {
        const notePayload = buildNotePayload(spec);

        promptSummary.textContent = spec.prompt !== '' ? spec.prompt : 'No prompt summary was captured for this state.';
        keywordList.innerHTML = notePayload.matched_keywords.length > 0
            ? notePayload.matched_keywords.map(function (item) {
                return '<li>' + escapeHtml(item) + '</li>';
            }).join('')
            : '<li>No explicit GCP keywords were matched. The diagram relies on the selected preset and inspector controls.</li>';
        assumptionList.innerHTML = notePayload.assumptions.length > 0
            ? notePayload.assumptions.map(function (item) {
                return '<li>' + escapeHtml(item) + '</li>';
            }).join('')
            : '<li>No fallback assumptions were required for the current prompt.</li>';
        modelList.innerHTML = notePayload.current_model.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('');
        prosList.innerHTML = notePayload.pros.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('');
        consList.innerHTML = notePayload.cons.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('');
    }

    function renderOutputScore(spec) {
        const scorePayload = buildArchitectureScore(spec);

        outputStatus.innerHTML = [
            '<div class="gcp-vpc-score-ring-card">',
            '<div class="gcp-vpc-score-value" data-score-angle="' + escapeHtml(String(scorePayload.angle)) + 'deg" aria-label="Architecture score ' + escapeHtml(String(scorePayload.score)) + ' out of 100">',
            '<span class="gcp-vpc-score-value-number">' + escapeHtml(String(scorePayload.score)) + '</span>',
            '<span class="gcp-vpc-score-value-scale">/100</span>',
            '</div>',
            '<div class="gcp-vpc-score-ring-label">' + escapeHtml(scorePayload.ringLabel) + '</div>',
            '</div>',
            '<div class="gcp-vpc-score-copy">',
            '<div class="gcp-vpc-score-kicker">Architecture Score</div>',
            '<div class="gcp-vpc-score-summary">' + escapeHtml(scorePayload.band) + '</div>',
            '<div class="gcp-vpc-score-detail">' + escapeHtml(scorePayload.detail) + '</div>',
            '<div class="gcp-vpc-score-tags">',
            [
                '<span class="gcp-vpc-score-tag gcp-vpc-score-tag-status gcp-vpc-score-tag-status-' + escapeHtml(scorePayload.badgeTone) + '">',
                '<i class="' + escapeHtml(scorePayload.badgeIcon) + '" aria-hidden="true"></i>',
                '<span>' + escapeHtml(scorePayload.badgeLabel) + '</span>',
                '</span>'
            ].join(''),
            scorePayload.tags.map(function (item) {
                return [
                    '<span class="gcp-vpc-score-tag gcp-vpc-score-tag-' + escapeHtml(item.tone) + '">',
                    '<i class="' + escapeHtml(item.icon) + '" aria-hidden="true"></i>',
                    '<span>' + escapeHtml(item.label) + '</span>',
                    '</span>'
                ].join('');
            }).join(''),
            '</div>',
            '</div>'
        ].join('');

        const scoreValue = outputStatus.querySelector('.gcp-vpc-score-value');

        if (scoreValue) {
            scoreValue.style.setProperty('--gcp-vpc-score-fill-angle', '0deg');

            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    scoreValue.style.setProperty('--gcp-vpc-score-fill-angle', String(scoreValue.dataset.scoreAngle || '0deg'));
                });
            });
        }
    }

    function renderStageMeta(spec) {
        stageMeta.innerHTML = [
            createToneChip('bi bi-globe2', spec.region, 'region'),
            createToneChip('bi bi-grid-3x3-gap', String(spec.azCount) + ' zone', 'az'),
            createToneChip('bi bi-arrow-left-right', natModeLabel(spec.natMode), 'network'),
            createToneChip('bi bi-hdd-network', appTierLabel(spec.appTier), 'compute'),
            createToneChip('bi bi-database', databaseLabel(spec.database), 'data')
        ].join('');
    }

    function getRenderedCardById(cardId) {
        if (!latestResult || !Array.isArray(latestResult.renderedCards) || cardId === '') {
            return null;
        }

        return latestResult.renderedCards.find(function (card) {
            return card.id === cardId;
        }) || null;
    }

    function syncSelectedCardVisual() {
        const svgElement = stageCanvas.querySelector('svg');

        if (!svgElement) {
            return;
        }

        Array.from(svgElement.querySelectorAll('.diagram-card-group')).forEach(function (group) {
            group.classList.toggle('is-selected', selectedCardId !== '' && group.dataset.cardId === selectedCardId);
        });

        Array.from(svgElement.querySelectorAll('.diagram-connector[data-connector-id]')).forEach(function (path) {
            path.classList.toggle('is-selected', selectedConnectorId !== '' && path.dataset.connectorId === selectedConnectorId);
        });
    }

    function getRenderedCardMap() {
        const cardMap = {};

        if (!latestResult || !Array.isArray(latestResult.renderedCards)) {
            return cardMap;
        }

        latestResult.renderedCards.forEach(function (card) {
            if (!card || !card.id) {
                return;
            }

            cardMap[card.id] = Object.assign({}, card);
        });

        return cardMap;
    }

    function findDiagramGroupByCardId(svgElement, cardId) {
        const groups = Array.from(svgElement.querySelectorAll('.diagram-card-group'));

        return groups.find(function (group) {
            return String(group.dataset.cardId || '') === cardId;
        }) || null;
    }

    function queueStageCardFocus(cardId) {
        pendingStageFocusCardId = String(cardId || '').trim();
    }

    function focusPendingStageCard(svgElement) {
        const cardId = pendingStageFocusCardId;

        if (!svgElement || cardId === '') {
            return;
        }

        pendingStageFocusCardId = '';

        const group = findDiagramGroupByCardId(svgElement, cardId);

        if (group && typeof group.focus === 'function') {
            group.focus();
        }
    }

    function buildDragPreviewCardMap(movingCardIds, dx, dy) {
        const cardMap = getRenderedCardMap();

        movingCardIds.forEach(function (cardId) {
            if (!cardMap[cardId]) {
                return;
            }

            cardMap[cardId] = Object.assign({}, cardMap[cardId], {
                x: cardMap[cardId].x + dx,
                y: cardMap[cardId].y + dy
            });
        });

        return cardMap;
    }

    function readPathAnchorRatio(path, prefix) {
        const x = Number(path.dataset[prefix + 'RatioX']);
        const y = Number(path.dataset[prefix + 'RatioY']);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return normalizeAnchorRatio({
            x: x,
            y: y
        });
    }

    function findConnectorPathById(svgElement, connectorId) {
        const connectorPaths = Array.from(svgElement.querySelectorAll('.diagram-connector[data-connector-id]'));

        return connectorPaths.find(function (path) {
            return String(path.dataset.connectorId || '') === connectorId;
        }) || null;
    }

    function getPathEndpointRatio(path, prefix, card) {
        const ratio = readPathAnchorRatio(path, prefix);

        if (ratio) {
            return ratio;
        }

        const side = path.dataset[prefix + 'Side'];
        const anchor = getCardAnchor(card, side, null);

        return buildAnchorRatio(card, anchor.x, anchor.y);
    }

    function buildSideAnchorRatio(card, side, point) {
        const normalizedSide = normalizeConnectorSide(side);
        const xRatio = card.width === 0 ? 0.5 : (point.x - card.x) / card.width;
        const yRatio = card.height === 0 ? 0.5 : (point.y - card.y) / card.height;

        if (normalizedSide === 'top') {
            return normalizeAnchorRatio({
                x: xRatio,
                y: 0
            });
        }

        if (normalizedSide === 'bottom') {
            return normalizeAnchorRatio({
                x: xRatio,
                y: 1
            });
        }

        if (normalizedSide === 'left') {
            return normalizeAnchorRatio({
                x: 0,
                y: yRatio
            });
        }

        return normalizeAnchorRatio({
            x: 1,
            y: yRatio
        });
    }

    function getConnectorEndpointPoint(path, prefix, card) {
        const ratio = getPathEndpointRatio(path, prefix, card);

        return getCardAnchor(card, path.dataset[prefix + 'Side'], ratio);
    }

    function setPathAnchorRatio(path, prefix, ratio) {
        const normalizedRatio = normalizeAnchorRatio(ratio);

        if (!normalizedRatio) {
            return;
        }

        path.dataset[prefix + 'RatioX'] = formatSvgNumber(normalizedRatio.x);
        path.dataset[prefix + 'RatioY'] = formatSvgNumber(normalizedRatio.y);
    }

    function readPathBend(path) {
        const x = Number(path.dataset.bendX);
        const y = Number(path.dataset.bendY);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: x,
            y: y
        };
    }

    function setPathBend(path, bend) {
        const normalizedBend = normalizeConnectorBend(bend);

        if (!normalizedBend) {
            return;
        }

        path.dataset.bendX = formatSvgNumber(normalizedBend.x);
        path.dataset.bendY = formatSvgNumber(normalizedBend.y);
    }

    function getPathDefaultBend(path) {
        if (typeof path.getTotalLength === 'function' && typeof path.getPointAtLength === 'function') {
            const length = path.getTotalLength();

            if (Number.isFinite(length) && length > 0) {
                const point = path.getPointAtLength(length / 2);

                return {
                    x: point.x,
                    y: point.y
                };
            }
        }

        return null;
    }

    function updateConnectorPathFromData(path, sourceCard, targetCard) {
        path.setAttribute(
            'd',
            buildConnectorPathFromCards(
                sourceCard,
                targetCard,
                path.dataset.sourceSide,
                path.dataset.targetSide,
                readPathAnchorRatio(path, 'source'),
                readPathAnchorRatio(path, 'target'),
                readPathBend(path)
            )
        );
    }

    function updateConnectorPreview(svgElement, cardMap) {
        const connectorPaths = Array.from(svgElement.querySelectorAll('.diagram-connector[data-source-card][data-target-card]'));

        connectorPaths.forEach(function (path) {
            const sourceCard = cardMap[path.dataset.sourceCard || ''];
            const targetCard = cardMap[path.dataset.targetCard || ''];
            const sourceRatio = readPathAnchorRatio(path, 'source');
            const targetRatio = readPathAnchorRatio(path, 'target');

            if (!sourceCard || !targetCard) {
                return;
            }

            path.setAttribute(
                'd',
                buildConnectorPathFromCards(
                    sourceCard,
                    targetCard,
                    path.dataset.sourceSide,
                    path.dataset.targetSide,
                    sourceRatio,
                    targetRatio,
                    readPathBend(path)
                )
            );
        });
    }

    function applyDragPreview(movingGroups, dx, dy) {
        movingGroups.forEach(function (movingGroup) {
            movingGroup.setAttribute('transform', 'translate(' + formatSvgNumber(dx) + ' ' + formatSvgNumber(dy) + ')');
        });
    }

    function clearDragPreview(movingGroups) {
        movingGroups.forEach(function (movingGroup) {
            movingGroup.removeAttribute('transform');
            movingGroup.classList.remove('is-dragging');
        });
    }

    function removeConnectorAnchorHandles(svgElement) {
        Array.from(svgElement.querySelectorAll('.diagram-connector-anchor-handle, .diagram-connector-bend-handle')).forEach(function (handle) {
            handle.remove();
        });
    }

    function renderConnectorAnchorHandles(svgElement) {
        const connectorPath = findConnectorPathById(svgElement, selectedConnectorId);
        const cardMap = getRenderedCardMap();
        const root = svgElement.querySelector('.diagram-root') || svgElement;

        removeConnectorAnchorHandles(svgElement);

        if (!connectorPath) {
            return;
        }

        const sourceCard = cardMap[connectorPath.dataset.sourceCard || ''];
        const targetCard = cardMap[connectorPath.dataset.targetCard || ''];

        if (!sourceCard || !targetCard) {
            return;
        }

        [
            {
                endpoint: 'source',
                card: sourceCard
            },
            {
                endpoint: 'target',
                card: targetCard
            }
        ].forEach(function (handleConfig) {
            const point = getConnectorEndpointPoint(connectorPath, handleConfig.endpoint, handleConfig.card);
            const handle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            handle.setAttribute('cx', formatSvgNumber(point.x));
            handle.setAttribute('cy', formatSvgNumber(point.y));
            handle.setAttribute('r', '10');
            handle.setAttribute('class', 'diagram-connector-anchor-handle');
            handle.dataset.connectorId = selectedConnectorId;
            handle.dataset.endpoint = handleConfig.endpoint;
            root.appendChild(handle);
            bindConnectorAnchorHandle(svgElement, handle);
        });

        const bend = readPathBend(connectorPath) || getPathDefaultBend(connectorPath);

        if (bend) {
            const bendHandle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

            bendHandle.setAttribute('x', formatSvgNumber(bend.x - 9));
            bendHandle.setAttribute('y', formatSvgNumber(bend.y - 9));
            bendHandle.setAttribute('width', '18');
            bendHandle.setAttribute('height', '18');
            bendHandle.setAttribute('rx', '5');
            bendHandle.setAttribute('class', 'diagram-connector-bend-handle');
            bendHandle.dataset.connectorId = selectedConnectorId;
            root.appendChild(bendHandle);
            bindConnectorBendHandle(svgElement, bendHandle);
        }
    }

    function updateSelectedCardEditor() {
        const selectedCard = getRenderedCardById(selectedCardId);

        if (!selectedCard) {
            selectedCardId = '';
            selectedEmpty.classList.remove('d-none');
            selectedEditor.classList.add('d-none');
            selectedName.textContent = '';
            selectedXInput.value = '';
            selectedYInput.value = '';
            selectedWidthInput.value = '';
            selectedHeightInput.value = '';
            selectedEmpty.textContent = selectedConnectorId === ''
                ? selectedCardHintText
                : 'Drag the blue arrow handles to adjust where this arrow sticks to each box.';
            syncSelectedCardVisual();
            if (stageCanvas.querySelector('svg')) {
                renderConnectorAnchorHandles(stageCanvas.querySelector('svg'));
            }
            return;
        }

        selectedConnectorId = '';
        selectedEmpty.classList.add('d-none');
        selectedEditor.classList.remove('d-none');
        selectedEmpty.textContent = selectedCardHintText;
        selectedName.textContent = selectedCard.label;
        selectedXInput.value = String(Math.round(selectedCard.x));
        selectedYInput.value = String(Math.round(selectedCard.y));
        selectedWidthInput.value = String(Math.round(selectedCard.width));
        selectedHeightInput.value = String(Math.round(selectedCard.height));
        selectedWidthInput.min = String(getCardMinimumSize(selectedCard).width);
        selectedHeightInput.min = String(getCardMinimumSize(selectedCard).height);
        syncSelectedCardVisual();
        if (stageCanvas.querySelector('svg')) {
            removeConnectorAnchorHandles(stageCanvas.querySelector('svg'));
        }
    }

    function setSelectedCard(cardId) {
        selectedCardId = String(cardId || '').trim();
        updateSelectedCardEditor();
    }

    function setSelectedConnector(connectorId) {
        selectedConnectorId = String(connectorId || '').trim();
        selectedCardId = '';
        updateSelectedCardEditor();
    }

    function normalizeCardDimension(value, fallback, minValue) {
        const parsed = Number.parseInt(String(value || '').trim(), 10);

        if (!Number.isFinite(parsed)) {
            return fallback;
        }

        return Math.max(minValue, snapCoordinate(parsed));
    }

    function normalizeCardCoordinate(value, fallback) {
        const parsed = Number.parseInt(String(value || '').trim(), 10);

        if (!Number.isFinite(parsed)) {
            return fallback;
        }

        return Math.max(0, snapCoordinate(parsed));
    }

    function applySelectedCardSize() {
        const selectedCard = getRenderedCardById(selectedCardId);

        if (!selectedCard) {
            return;
        }

        const nextLayoutOverrides = getCurrentLayoutOverrides();
        const existingOverride = nextLayoutOverrides[selectedCardId] || {};
        const minimumSize = getCardMinimumSize(selectedCard);

        nextLayoutOverrides[selectedCardId] = {
            x: normalizeCardCoordinate(selectedXInput.value, Number.isFinite(existingOverride.x) ? existingOverride.x : selectedCard.x),
            y: normalizeCardCoordinate(selectedYInput.value, Number.isFinite(existingOverride.y) ? existingOverride.y : selectedCard.y),
            width: normalizeCardDimension(selectedWidthInput.value, selectedCard.width, minimumSize.width),
            height: normalizeCardDimension(selectedHeightInput.value, selectedCard.height, minimumSize.height)
        };

        renderResult(latestResult.spec, nextLayoutOverrides, getCurrentConnectorOverrides());
    }

    function resetSelectedCardSize() {
        const selectedCard = getRenderedCardById(selectedCardId);

        if (!selectedCard) {
            return;
        }

        const nextLayoutOverrides = getCurrentLayoutOverrides();

        if (!nextLayoutOverrides[selectedCardId]) {
            return;
        }

        delete nextLayoutOverrides[selectedCardId].x;
        delete nextLayoutOverrides[selectedCardId].y;
        delete nextLayoutOverrides[selectedCardId].width;
        delete nextLayoutOverrides[selectedCardId].height;

        if (Object.keys(nextLayoutOverrides[selectedCardId]).length === 0) {
            delete nextLayoutOverrides[selectedCardId];
        }

        renderResult(latestResult.spec, nextLayoutOverrides, getCurrentConnectorOverrides());
    }

    function getCurrentLayoutOverrides() {
        if (!latestResult || !latestResult.layoutOverrides) {
            return {};
        }

        return cloneLayoutOverrides(latestResult.layoutOverrides);
    }

    function getCurrentConnectorOverrides() {
        if (!latestResult || !latestResult.connectorOverrides) {
            return {};
        }

        return cloneConnectorOverrides(latestResult.connectorOverrides);
    }

    function applyKeyboardCardPosition(cardId, dx, dy) {
        if (!latestResult) {
            return;
        }

        const movingCardIds = Array.from(new Set([cardId].concat(getDependentCardIds(cardId, latestResult.spec)))).filter(function (movingCardId) {
            return getRenderedCardById(movingCardId) !== null;
        });
        const nextLayoutOverrides = getCurrentLayoutOverrides();

        movingCardIds.forEach(function (movingCardId) {
            const renderedCard = getRenderedCardById(movingCardId);
            const existingOverride = nextLayoutOverrides[movingCardId] || {};

            if (!renderedCard) {
                return;
            }

            nextLayoutOverrides[movingCardId] = Object.assign({}, existingOverride, {
                x: Math.max(0, snapCoordinate(renderedCard.x + dx)),
                y: Math.max(0, snapCoordinate(renderedCard.y + dy))
            });
        });

        selectedCardId = cardId;
        selectedConnectorId = '';
        queueStageCardFocus(cardId);
        renderResult(latestResult.spec, nextLayoutOverrides, getCurrentConnectorOverrides());
    }

    function applyKeyboardCardResize(cardId, deltaWidth, deltaHeight) {
        if (!latestResult) {
            return;
        }

        const selectedCard = getRenderedCardById(cardId);

        if (!selectedCard) {
            return;
        }

        const minimumSize = getCardMinimumSize(selectedCard);
        const nextLayoutOverrides = getCurrentLayoutOverrides();
        const existingOverride = nextLayoutOverrides[cardId] || {};

        nextLayoutOverrides[cardId] = Object.assign({}, existingOverride, {
            width: normalizeCardDimension(selectedCard.width + deltaWidth, selectedCard.width, minimumSize.width),
            height: normalizeCardDimension(selectedCard.height + deltaHeight, selectedCard.height, minimumSize.height)
        });

        selectedCardId = cardId;
        selectedConnectorId = '';
        queueStageCardFocus(cardId);
        renderResult(latestResult.spec, nextLayoutOverrides, getCurrentConnectorOverrides());
    }

    function bindStageKeyboardEditing(group) {
        group.addEventListener('keydown', function (event) {
            const cardId = String(group.dataset.cardId || '').trim();
            const step = event.shiftKey ? 16 : 4;

            if (cardId === '') {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelectedCard(cardId);
                return;
            }

            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                return;
            }

            event.preventDefault();
            setSelectedCard(cardId);

            if (event.altKey) {
                if (event.key === 'ArrowLeft') {
                    applyKeyboardCardResize(cardId, -step, 0);
                    return;
                }

                if (event.key === 'ArrowRight') {
                    applyKeyboardCardResize(cardId, step, 0);
                    return;
                }

                if (event.key === 'ArrowUp') {
                    applyKeyboardCardResize(cardId, 0, -step);
                    return;
                }

                applyKeyboardCardResize(cardId, 0, step);
                return;
            }

            if (event.key === 'ArrowLeft') {
                applyKeyboardCardPosition(cardId, -step, 0);
                return;
            }

            if (event.key === 'ArrowRight') {
                applyKeyboardCardPosition(cardId, step, 0);
                return;
            }

            if (event.key === 'ArrowUp') {
                applyKeyboardCardPosition(cardId, 0, -step);
                return;
            }

            applyKeyboardCardPosition(cardId, 0, step);
        });
    }

    function getSvgClientPoint(svgElement, clientX, clientY) {
        const point = svgElement.createSVGPoint();
        const screenMatrix = svgElement.getScreenCTM();

        if (!screenMatrix) {
            return null;
        }

        point.x = clientX;
        point.y = clientY;

        return point.matrixTransform(screenMatrix.inverse());
    }

    function snapCoordinate(value) {
        return Math.round(value / 4) * 4;
    }

    function createResizePreview(svgElement, card) {
        const preview = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const root = svgElement.querySelector('.diagram-root') || svgElement;

        preview.setAttribute('x', formatSvgNumber(card.x));
        preview.setAttribute('y', formatSvgNumber(card.y));
        preview.setAttribute('width', formatSvgNumber(card.width));
        preview.setAttribute('height', formatSvgNumber(card.height));
        preview.setAttribute('rx', card.id === 'gcp-vpc-shell' ? '24' : '16');
        preview.setAttribute('class', 'diagram-resize-preview');
        root.appendChild(preview);

        return preview;
    }

    function updateResizePreview(preview, width, height) {
        preview.setAttribute('width', formatSvgNumber(width));
        preview.setAttribute('height', formatSvgNumber(height));
    }

    function bindConnectorAnchorHandle(svgElement, handle) {
        handle.addEventListener('pointerdown', function (event) {
            const connectorId = String(handle.dataset.connectorId || '').trim();
            const endpoint = String(handle.dataset.endpoint || '').trim();
            const path = findConnectorPathById(svgElement, connectorId);
            const cardMap = getRenderedCardMap();

            if (!path || (endpoint !== 'source' && endpoint !== 'target')) {
                return;
            }

            const sourceCard = cardMap[path.dataset.sourceCard || ''];
            const targetCard = cardMap[path.dataset.targetCard || ''];
            const editedCard = endpoint === 'source' ? sourceCard : targetCard;

            if (!sourceCard || !targetCard || !editedCard) {
                return;
            }

            if (selectedConnectorId !== connectorId) {
                setSelectedConnector(connectorId);
            }

            if (typeof handle.setPointerCapture === 'function') {
                handle.setPointerCapture(event.pointerId);
            }

            function applyHandleMove(moveEvent) {
                const currentPoint = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);

                if (!currentPoint) {
                    return null;
                }

                const ratio = buildSideAnchorRatio(editedCard, path.dataset[endpoint + 'Side'], currentPoint);
                const nextPoint = getCardAnchor(editedCard, path.dataset[endpoint + 'Side'], ratio);

                setPathAnchorRatio(path, endpoint, ratio);
                updateConnectorPathFromData(path, sourceCard, targetCard);
                handle.setAttribute('cx', formatSvgNumber(nextPoint.x));
                handle.setAttribute('cy', formatSvgNumber(nextPoint.y));

                return ratio;
            }

            function handlePointerMove(moveEvent) {
                applyHandleMove(moveEvent);
            }

            function handlePointerEnd(endEvent) {
                const ratio = applyHandleMove(endEvent);
                const nextConnectorOverrides = getCurrentConnectorOverrides();
                const existingOverride = nextConnectorOverrides[connectorId] || {};

                if (
                    typeof handle.releasePointerCapture === 'function' &&
                    typeof handle.hasPointerCapture === 'function' &&
                    handle.hasPointerCapture(endEvent.pointerId)
                ) {
                    handle.releasePointerCapture(endEvent.pointerId);
                }

                handle.removeEventListener('pointermove', handlePointerMove);
                handle.removeEventListener('pointerup', handlePointerEnd);
                handle.removeEventListener('pointercancel', handlePointerEnd);

                if (!ratio || endEvent.type === 'pointercancel') {
                    renderConnectorAnchorHandles(svgElement);
                    return;
                }

                nextConnectorOverrides[connectorId] = Object.assign({}, existingOverride, endpoint === 'source'
                    ? { sourceRatio: ratio }
                    : { targetRatio: ratio });

                renderResult(latestResult.spec, getCurrentLayoutOverrides(), nextConnectorOverrides);
            }

            handle.addEventListener('pointermove', handlePointerMove);
            handle.addEventListener('pointerup', handlePointerEnd);
            handle.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    function bindConnectorBendHandle(svgElement, handle) {
        handle.addEventListener('pointerdown', function (event) {
            const connectorId = String(handle.dataset.connectorId || '').trim();
            const path = findConnectorPathById(svgElement, connectorId);
            const cardMap = getRenderedCardMap();

            if (!path) {
                return;
            }

            const sourceCard = cardMap[path.dataset.sourceCard || ''];
            const targetCard = cardMap[path.dataset.targetCard || ''];

            if (!sourceCard || !targetCard) {
                return;
            }

            if (selectedConnectorId !== connectorId) {
                setSelectedConnector(connectorId);
            }

            if (typeof handle.setPointerCapture === 'function') {
                handle.setPointerCapture(event.pointerId);
            }

            function applyBendMove(moveEvent) {
                const currentPoint = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);

                if (!currentPoint) {
                    return null;
                }

                const bend = {
                    x: snapCoordinate(currentPoint.x),
                    y: snapCoordinate(currentPoint.y)
                };

                setPathBend(path, bend);
                updateConnectorPathFromData(path, sourceCard, targetCard);
                handle.setAttribute('x', formatSvgNumber(bend.x - 9));
                handle.setAttribute('y', formatSvgNumber(bend.y - 9));

                return bend;
            }

            function handlePointerMove(moveEvent) {
                applyBendMove(moveEvent);
            }

            function handlePointerEnd(endEvent) {
                const bend = applyBendMove(endEvent);
                const nextConnectorOverrides = getCurrentConnectorOverrides();
                const existingOverride = nextConnectorOverrides[connectorId] || {};

                if (
                    typeof handle.releasePointerCapture === 'function' &&
                    typeof handle.hasPointerCapture === 'function' &&
                    handle.hasPointerCapture(endEvent.pointerId)
                ) {
                    handle.releasePointerCapture(endEvent.pointerId);
                }

                handle.removeEventListener('pointermove', handlePointerMove);
                handle.removeEventListener('pointerup', handlePointerEnd);
                handle.removeEventListener('pointercancel', handlePointerEnd);

                if (!bend || endEvent.type === 'pointercancel') {
                    renderConnectorAnchorHandles(svgElement);
                    return;
                }

                nextConnectorOverrides[connectorId] = Object.assign({}, existingOverride, {
                    bend: bend
                });

                renderResult(latestResult.spec, getCurrentLayoutOverrides(), nextConnectorOverrides);
            }

            handle.addEventListener('pointermove', handlePointerMove);
            handle.addEventListener('pointerup', handlePointerEnd);
            handle.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    function buildResizePreviewCardMap(cardId, width, height) {
        const cardMap = getRenderedCardMap();

        if (cardMap[cardId]) {
            cardMap[cardId] = Object.assign({}, cardMap[cardId], {
                width: width,
                height: height
            });
        }

        return cardMap;
    }

    function bindStageResizing(svgElement, group) {
        const resizeHandle = group.querySelector('.diagram-resize-handle');

        if (!resizeHandle) {
            return;
        }

        resizeHandle.addEventListener('pointerdown', function (event) {
            const cardId = String(group.dataset.cardId || '').trim();
            const selectedCard = getRenderedCardById(cardId);

            if (!selectedCard) {
                return;
            }

            setSelectedCard(cardId);

            const startPoint = getSvgClientPoint(svgElement, event.clientX, event.clientY);

            if (!startPoint) {
                return;
            }

            const minimumSize = getCardMinimumSize(selectedCard);
            const preview = createResizePreview(svgElement, selectedCard);

            group.classList.add('is-resizing');

            if (typeof resizeHandle.setPointerCapture === 'function') {
                resizeHandle.setPointerCapture(event.pointerId);
            }

            function readResizeSize(resizeEvent) {
                const currentPoint = getSvgClientPoint(svgElement, resizeEvent.clientX, resizeEvent.clientY);

                if (!currentPoint) {
                    return {
                        width: selectedCard.width,
                        height: selectedCard.height
                    };
                }

                return {
                    width: normalizeCardDimension(selectedCard.width + (currentPoint.x - startPoint.x), selectedCard.width, minimumSize.width),
                    height: normalizeCardDimension(selectedCard.height + (currentPoint.y - startPoint.y), selectedCard.height, minimumSize.height)
                };
            }

            function handlePointerMove(moveEvent) {
                const size = readResizeSize(moveEvent);

                selectedWidthInput.value = String(size.width);
                selectedHeightInput.value = String(size.height);
                updateResizePreview(preview, size.width, size.height);
                updateConnectorPreview(svgElement, buildResizePreviewCardMap(cardId, size.width, size.height));
            }

            function handlePointerEnd(endEvent) {
                const size = readResizeSize(endEvent);
                const nextLayoutOverrides = getCurrentLayoutOverrides();
                const existingOverride = nextLayoutOverrides[cardId] || {};

                group.classList.remove('is-resizing');
                preview.remove();
                updateConnectorPreview(svgElement, getRenderedCardMap());

                if (
                    typeof resizeHandle.releasePointerCapture === 'function' &&
                    typeof resizeHandle.hasPointerCapture === 'function' &&
                    resizeHandle.hasPointerCapture(endEvent.pointerId)
                ) {
                    resizeHandle.releasePointerCapture(endEvent.pointerId);
                }

                resizeHandle.removeEventListener('pointermove', handlePointerMove);
                resizeHandle.removeEventListener('pointerup', handlePointerEnd);
                resizeHandle.removeEventListener('pointercancel', handlePointerEnd);

                if (endEvent.type === 'pointercancel') {
                    return;
                }

                nextLayoutOverrides[cardId] = Object.assign({}, existingOverride, {
                    width: size.width,
                    height: size.height
                });

                renderResult(latestResult.spec, nextLayoutOverrides, getCurrentConnectorOverrides());
            }

            resizeHandle.addEventListener('pointermove', handlePointerMove);
            resizeHandle.addEventListener('pointerup', handlePointerEnd);
            resizeHandle.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    function bindStageDragging() {
        const svgElement = stageCanvas.querySelector('svg');

        if (!svgElement) {
            return;
        }

        Array.from(svgElement.querySelectorAll('.diagram-connector[data-connector-id]')).forEach(function (path) {
            path.addEventListener('pointerdown', function (event) {
                setSelectedConnector(String(path.dataset.connectorId || ''));
                event.preventDefault();
                event.stopPropagation();
            });
        });

        Array.from(svgElement.querySelectorAll('.diagram-card-group[data-draggable="true"]')).forEach(function (group) {
            bindStageResizing(svgElement, group);
            bindStageKeyboardEditing(group);

            group.addEventListener('pointerdown', function (event) {
                const cardId = String(group.dataset.cardId || '').trim();
                const startX = Number.parseFloat(group.dataset.cardX || '0');
                const startY = Number.parseFloat(group.dataset.cardY || '0');

                if (event.target && typeof event.target.closest === 'function' && event.target.closest('.diagram-resize-handle')) {
                    return;
                }

                if (cardId === '' || !Number.isFinite(startX) || !Number.isFinite(startY)) {
                    return;
                }

                setSelectedCard(cardId);

                const startPoint = getSvgClientPoint(svgElement, event.clientX, event.clientY);
                const root = svgElement.querySelector('.diagram-root');
                const dependentCardIds = getDependentCardIds(cardId, latestResult.spec).filter(function (dependentCardId) {
                    return dependentCardId !== cardId;
                });
                const movingCardIds = Array.from(new Set([cardId].concat(dependentCardIds))).filter(function (movingCardId) {
                    return getRenderedCardById(movingCardId) !== null;
                });
                const movingGroups = movingCardIds.map(function (movingCardId) {
                    return findDiagramGroupByCardId(svgElement, movingCardId);
                }).filter(function (movingGroup) {
                    return movingGroup !== null;
                });

                if (!startPoint || !root || movingGroups.length === 0) {
                    return;
                }

                if (cardId !== 'gcp-vpc-shell') {
                    root.appendChild(group);
                }

                movingGroups.forEach(function (movingGroup) {
                    movingGroup.classList.add('is-dragging');
                });

                if (typeof group.setPointerCapture === 'function') {
                    group.setPointerCapture(event.pointerId);
                }

                function handlePointerMove(moveEvent) {
                    const currentPoint = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);

                    if (!currentPoint) {
                        return;
                    }

                    const dx = currentPoint.x - startPoint.x;
                    const dy = currentPoint.y - startPoint.y;

                    applyDragPreview(movingGroups, dx, dy);
                    updateConnectorPreview(svgElement, buildDragPreviewCardMap(movingCardIds, dx, dy));
                }

                function handlePointerEnd(endEvent) {
                    const endPoint = getSvgClientPoint(svgElement, endEvent.clientX, endEvent.clientY);

                    clearDragPreview(movingGroups);
                    updateConnectorPreview(svgElement, getRenderedCardMap());

                    if (
                        typeof group.releasePointerCapture === 'function' &&
                        typeof group.hasPointerCapture === 'function' &&
                        group.hasPointerCapture(endEvent.pointerId)
                    ) {
                        group.releasePointerCapture(endEvent.pointerId);
                    }

                    group.removeEventListener('pointermove', handlePointerMove);
                    group.removeEventListener('pointerup', handlePointerEnd);
                    group.removeEventListener('pointercancel', handlePointerEnd);

                    if (!endPoint || endEvent.type === 'pointercancel') {
                        return;
                    }

                    const dx = endPoint.x - startPoint.x;
                    const dy = endPoint.y - startPoint.y;
                    const nextLayoutOverrides = getCurrentLayoutOverrides();

                    movingCardIds.forEach(function (movingCardId) {
                        const renderedCard = getRenderedCardById(movingCardId);
                        const existingOverride = nextLayoutOverrides[movingCardId] || {};

                        if (!renderedCard) {
                            return;
                        }

                        nextLayoutOverrides[movingCardId] = Object.assign({}, existingOverride, {
                            x: snapCoordinate(renderedCard.x + dx),
                            y: snapCoordinate(renderedCard.y + dy)
                        });
                    });

                    renderResult(latestResult.spec, nextLayoutOverrides, getCurrentConnectorOverrides());
                }

                group.addEventListener('pointermove', handlePointerMove);
                group.addEventListener('pointerup', handlePointerEnd);
                group.addEventListener('pointercancel', handlePointerEnd);
                event.preventDefault();
            });
        });
    }

    function renderResult(spec, layoutOverrides, connectorOverrides) {
        const inventory = buildInventory(spec);
        const renderedStage = buildSvgMarkup(spec, layoutOverrides, connectorOverrides);
        const svgMarkup = renderedStage.svgMarkup;
        const normalizedLayoutOverrides = renderedStage.layoutOverrides;
        const normalizedConnectorOverrides = renderedStage.connectorOverrides;
        const exportPayload = buildExportPayload(spec, inventory, normalizedLayoutOverrides, normalizedConnectorOverrides);

        latestResult = {
            spec: spec,
            svgMarkup: svgMarkup,
            inventory: inventory,
            exportPayload: exportPayload,
            layoutOverrides: normalizedLayoutOverrides,
            connectorOverrides: normalizedConnectorOverrides,
            renderedCards: renderedStage.cards
        };

        stageTitle.textContent = spec.title;
        stageSubtitle.textContent = spec.region + ' • ' + spec.cidr + ' • ' + appTierLabel(spec.appTier);
        renderStageMeta(spec);
        stageCanvas.innerHTML = svgMarkup;
        applyStageZoom();
        bindStageDragging();
        stageCanvas.classList.remove('d-none');
        stageEmpty.classList.add('d-none');
        focusPendingStageCard(stageCanvas.querySelector('svg'));
        outputContent.classList.remove('d-none');
        outputEmpty.classList.add('d-none');
        renderOutputScore(spec);
        renderInventory(inventory);
        jsonOutput.innerHTML = highlightJson(exportPayload);
        renderNotes(spec);
        updateSelectedCardEditor();
    }

    function renderFromControls(inheritedNotes) {
        const nextSpec = buildSpecFromControls(promptInput.value, selectedPresetId, inheritedNotes);

        if (!nextSpec) {
            showError(getCidrValidationMessage());
            return;
        }

        clearError();
        renderResult(nextSpec, getCurrentLayoutOverrides(), getCurrentConnectorOverrides());
    }

    function generateFromPrompt() {
        const prompt = String(promptInput.value || '').trim();
        const selectedPreset = findPresetById(selectedPresetId);

        if (prompt === '') {
            showError('Add a GCP VPC brief before generating the diagram.');
            return;
        }

        clearError();

        const inferredSpec = inferFromPrompt(prompt, selectedPreset);
        
        syncControls(inferredSpec);

        const nextSpec = buildSpecFromControls(prompt, selectedPreset.id, inferredSpec);

        if (!nextSpec) {
            showError(getCidrValidationMessage());
            return;
        }

        stageZoom = defaultStageZoom;
        clearError();
        renderResult(nextSpec, {}, {});
    }

    function applyPreset(presetId, shouldGenerate) {
        const preset = findPresetById(presetId);

        selectedPresetId = preset.id;
        updatePresetSelection();
        promptInput.value = preset.prompt;
        syncControls(preset.defaults);
        clearError();

        if (shouldGenerate) {
            generateFromPrompt();
        } else {
            stageTitle.textContent = preset.label;
            stageSubtitle.textContent = preset.description;
            stageMeta.innerHTML = '';
            stageCanvas.innerHTML = '';
            stageCanvas.classList.add('d-none');
            stageEmpty.classList.remove('d-none');
            outputContent.classList.add('d-none');
            outputEmpty.classList.remove('d-none');
        }
    }

    function resetToDefault() {
        applyPreset(gcpVpcPresetCatalog[0].id, true);
    }

    function resetStageLayout() {
        if (!latestResult) {
            return;
        }

        selectedCardId = '';
        selectedConnectorId = '';
        stageZoom = defaultStageZoom;
        renderResult(latestResult.spec, {}, {});
        resetStageViewport();
    }

    function downloadFile(filename, content, mimeType) {
        const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = blobUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(blobUrl);
    }

    function flashButton(button, label) {
        const labelTarget = button.querySelector ? button.querySelector('[data-button-label]') || button : button;
        const originalLabel = labelTarget.dataset.originalLabel || labelTarget.textContent;

        labelTarget.dataset.originalLabel = originalLabel;
        labelTarget.textContent = label;

        window.setTimeout(function () {
            labelTarget.textContent = originalLabel;
        }, 1400);
    }

    function downloadSvg() {
        if (!latestResult) {
            return;
        }

        downloadFile('gcp-vpc-topology.svg', latestResult.svgMarkup, 'image/svg+xml;charset=utf-8');
    }

    async function exportPng() {
        if (!latestResult) {
            return;
        }

        try {
            const svgBlob = new Blob([latestResult.svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            const image = new Image();

            image.onload = function () {
                const viewBoxMatch = latestResult.svgMarkup.match(/viewBox="0 0 (\d+) (\d+)"/);
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const width = viewBoxMatch ? Number.parseInt(viewBoxMatch[1], 10) : 1520;
                const height = viewBoxMatch ? Number.parseInt(viewBoxMatch[2], 10) : 860;

                canvas.width = width;
                canvas.height = height;

                if (context) {
                    context.fillStyle = '#f8fdff';
                    context.fillRect(0, 0, width, height);
                    context.drawImage(image, 0, 0, width, height);
                    canvas.toBlob(function (blob) {
                        if (!blob) {
                            showError('Failed to prepare the PNG export.');
                            return;
                        }

                        downloadFile('gcp-vpc-topology.png', blob, 'image/png');
                        flashButton(exportPngButton, 'Saved');
                    }, 'image/png');
                }

                URL.revokeObjectURL(svgUrl);
            };

            image.onerror = function () {
                URL.revokeObjectURL(svgUrl);
                showError('Failed to render the PNG export from the current SVG stage.');
            };

            image.src = svgUrl;
        } catch (error) {
            showError('Failed to export the current diagram as PNG.');
        }
    }

    async function copyJson() {
        if (!latestResult) {
            return;
        }

        try {
            await navigator.clipboard.writeText(JSON.stringify(latestResult.exportPayload, null, 2));
            flashButton(copyJsonButton, 'Copied');
        } catch (error) {
            showError('Failed to copy the JSON state to the clipboard.');
        }
    }

    function downloadJson() {
        if (!latestResult) {
            return;
        }

        downloadFile('gcp-vpc-topology.json', JSON.stringify(latestResult.exportPayload, null, 2), 'application/json;charset=utf-8');
    }

    function restoreFromImportedPayload(payload) {
        const importedState = buildImportedPayloadState(payload);

        if (importedState.error) {
            showError(importedState.error);
            return;
        }

        selectedPresetId = importedState.presetId;
        updatePresetSelection();
        promptInput.value = importedState.prompt;
        syncControls(importedState.spec);
        clearError();
        renderResult(buildSpecFromControls(importedState.prompt, selectedPresetId, {
            assumptions: importedState.assumptions,
            matchedKeywords: importedState.matchedKeywords
        }), importedState.layoutOverrides, importedState.connectorOverrides);
    }

    function handleImportChange(event) {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function (loadEvent) {
            try {
                const payload = JSON.parse(String(loadEvent.target && loadEvent.target.result ? loadEvent.target.result : '{}'));

                restoreFromImportedPayload(payload);
            } catch (error) {
                showError('Failed to parse the imported JSON file.');
            } finally {
                importJsonInput.value = '';
            }
        };

        reader.onerror = function () {
            showError('Failed to read the selected JSON file.');
            importJsonInput.value = '';
        };

        reader.readAsText(file);
    }

    populateRegionOptions();
    initMarkdownCopyButtons();
    initializeCustomSelects();
    syncInventorySortSelect();

    presetInput.addEventListener('change', function () {
        applyPreset(String(presetInput.value || gcpVpcPresetCatalog[0].id), true);
    });

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activateTab(String(button.dataset.tabTarget || 'gcpVpcInventoryPanel'));
        });
    });
    bindTabKeyboardNavigation(tabButtons, 'tabTarget', activateTab);

    configTabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activateConfigTab(String(button.dataset.configTabTarget || 'gcpVpcNetworkConfigPanel'));
        });
    });
    bindTabKeyboardNavigation(configTabButtons, 'configTabTarget', activateConfigTab);

    generateButton.addEventListener('click', generateFromPrompt);
    resetButton.addEventListener('click', resetToDefault);
    resetLayoutButton.addEventListener('click', resetStageLayout);
    zoomOutButton.addEventListener('click', function () {
        setStageZoom(stageZoom - stageZoomStep);
    });
    zoomInButton.addEventListener('click', function () {
        setStageZoom(stageZoom + stageZoomStep);
    });
    fullscreenButton.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && stageShell.classList.contains('gcp-vpc-stage-expanded')) {
            setStageExpanded(false);
        }
    });
    applyCardSizeButton.addEventListener('click', applySelectedCardSize);
    resetCardSizeButton.addEventListener('click', resetSelectedCardSize);
    exportPngButton.addEventListener('click', exportPng);
    downloadSvgButton.addEventListener('click', downloadSvg);
    copyJsonButton.addEventListener('click', copyJson);
    downloadJsonButton.addEventListener('click', downloadJson);
    inventorySortInput.addEventListener('change', applyInventorySortMode);
    inventorySortOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            setInventorySortMode(option.dataset.sortValue || 'id');
            inventorySortSelect.removeAttribute('open');
        });
    });
    inventoryTableBody.addEventListener('click', function (event) {
        const button = event.target.closest('.gcp-vpc-row-copy');

        if (!button || !inventoryTableBody.contains(button)) {
            return;
        }

        if (!button.dataset.copyTitle) {
            button.dataset.copyTitle = button.getAttribute('title') || 'Copy row';
        }

        copyInventoryRow(button.dataset.inventoryCopyRow || '', button);
    });
    inventorySortSelect.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            inventorySortSelect.removeAttribute('open');
        }
    });
    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });
    importJsonInput.addEventListener('change', handleImportChange);
    zoomInput.addEventListener('change', function () {
        setStageZoomFromPercent(zoomInput.value);
    });
    zoomInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            setStageZoomFromPercent(zoomInput.value);
        }

        if (event.key === 'Escape') {
            zoomInput.blur();
        }
    });
    zoomFitButton.addEventListener('click', function () {
        setStageZoomToFit();
    });
    zoomActualButton.addEventListener('click', function () {
        setStageZoom(1);
    });
    zoomHideUiButton.addEventListener('click', function () {
        setStageUiHidden(!stageUiHidden);
    });
    document.addEventListener('click', function (event) {
        if (inventorySortSelect.contains(event.target)) {
            return;
        }

        inventorySortSelect.removeAttribute('open');
    });
    document.addEventListener('click', function (event) {
        if (event.target.closest('.gcp-vpc-custom-select')) {
            return;
        }

        closeCustomSelects();
    });

    [
        regionInput,
        cidrInput,
        azCountInput,
        natModeInput,
        appTierInput,
        databaseInput,
        route53Input,
        cloudFrontInput,
        wafInput,
        albInput,
        bastionInput,
        endpointsInput,
        flowLogsInput,
        cloudWatchInput,
        siteToSiteVpnInput,
        transitGatewayInput,
        cacheInput
    ].forEach(function (input) {
        input.addEventListener('change', function () {
            if (promptInput.value.trim() !== '' || latestResult) {
                renderFromControls({
                    assumptions: latestResult && latestResult.spec ? latestResult.spec.assumptions : [],
                    matchedKeywords: latestResult && latestResult.spec ? latestResult.spec.matchedKeywords : []
                });
            }
        });
    });

    activateTab('gcpVpcInventoryPanel');
    activateConfigTab('gcpVpcNetworkConfigPanel');
    updateFullscreenButton();
    applyStageZoom();
    updatePresetSelection();
    applyPreset(gcpVpcPresetCatalog[0].id, true);
});
