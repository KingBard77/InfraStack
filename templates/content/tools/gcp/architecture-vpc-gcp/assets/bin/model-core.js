const ArchitectureVpcGcpModelCore = (function () {
    const toolId = 'architecture-vpc-gcp';
    const legacyToolIds = ['gcp-vpc-topology'];
    const toolVersion = '1.0.0';
    const regionCatalog = [
        { value: 'us-central1', label: 'us-central1' },
        { value: 'us-east1', label: 'us-east1' },
        { value: 'us-east4', label: 'us-east4' },
        { value: 'us-west1', label: 'us-west1' },
        { value: 'us-west2', label: 'us-west2' },
        { value: 'us-west3', label: 'us-west3' },
        { value: 'northamerica-northeast1', label: 'northamerica-northeast1' },
        { value: 'southamerica-east1', label: 'southamerica-east1' },
        { value: 'europe-north1', label: 'europe-north1' },
        { value: 'europe-west1', label: 'europe-west1' },
        { value: 'europe-west2', label: 'europe-west2' },
        { value: 'europe-west3', label: 'europe-west3' },
        { value: 'europe-west4', label: 'europe-west4' },
        { value: 'europe-west9', label: 'europe-west9' },
        { value: 'me-central2', label: 'me-central2' },
        { value: 'asia-south1', label: 'asia-south1' },
        { value: 'asia-south2', label: 'asia-south2' },
        { value: 'asia-east1', label: 'asia-east1' },
        { value: 'asia-east2', label: 'asia-east2' },
        { value: 'asia-northeast1', label: 'asia-northeast1' },
        { value: 'asia-northeast3', label: 'asia-northeast3' },
        { value: 'asia-southeast1', label: 'asia-southeast1' },
        { value: 'asia-southeast2', label: 'asia-southeast2' },
        { value: 'australia-southeast1', label: 'australia-southeast1' }
    ];
    const supportedRegions = regionCatalog.map(function (region) {
        return region.value;
    });
    const allowedNatModes = ['none', 'single', 'per-az'];
    const allowedAppTiers = ['ec2', 'ecs', 'eks', 'lambda'];
    const allowedDatabases = ['none', 'rds', 'aurora', 'dynamodb'];

    function normalizePrompt(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim();
    }

    function normalizeCidrInput(value) {
        return String(value || '').trim();
    }

    function isValidIpv4Octet(segment) {
        if (!/^\d+$/.test(segment)) {
            return false;
        }

        const parsed = Number(segment);

        return Number.isInteger(parsed) && parsed >= 0 && parsed <= 255;
    }

    function isValidIpv4Cidr(value) {
        const normalizedValue = normalizeCidrInput(value);

        if (!/^\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2}$/.test(normalizedValue)) {
            return false;
        }

        const parts = normalizedValue.split('/');
        const octets = parts[0].split('.');
        const mask = Number(parts[1]);

        return octets.length === 4 &&
            octets.every(isValidIpv4Octet) &&
            Number.isInteger(mask) &&
            mask >= 0 &&
            mask <= 32;
    }

    function parseCidrValue(value) {
        const normalizedValue = normalizeCidrInput(value);

        if (normalizedValue === '') {
            return '';
        }

        return isValidIpv4Cidr(normalizedValue) ? normalizedValue : null;
    }

    function natModeLabel(value) {
        return {
            none: 'No Cloud NAT',
            single: 'Single Cloud NAT',
            'per-az': 'Cloud NAT per zone'
        }[value] || value;
    }

    function appTierLabel(value) {
        return {
            ec2: 'Managed Instance Groups',
            ecs: 'Cloud Run',
            eks: 'GKE',
            lambda: 'Cloud Functions with Serverless VPC Access'
        }[value] || value;
    }

    function databaseLabel(value) {
        return {
            none: 'No database tier',
            rds: 'Cloud SQL',
            aurora: 'Cloud SQL for PostgreSQL',
            dynamodb: 'Firestore'
        }[value] || value;
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

    function cloneLayoutOverrides(layoutOverrides) {
        const safeOverrides = {};

        Object.keys(layoutOverrides || {}).forEach(function (key) {
            const value = layoutOverrides[key];

            if (!value || typeof value !== 'object') {
                return;
            }

            const nextOverride = {};

            if (Number.isFinite(value.x)) {
                nextOverride.x = value.x;
            }

            if (Number.isFinite(value.y)) {
                nextOverride.y = value.y;
            }

            if (Number.isFinite(value.width)) {
                nextOverride.width = value.width;
            }

            if (Number.isFinite(value.height)) {
                nextOverride.height = value.height;
            }

            if (Object.keys(nextOverride).length === 0) {
                return;
            }

            safeOverrides[key] = nextOverride;
        });

        return safeOverrides;
    }

    function cloneConnectorOverrides(connectorOverrides) {
        const safeOverrides = {};

        Object.keys(connectorOverrides || {}).forEach(function (key) {
            const value = connectorOverrides[key];

            if (!value || typeof value !== 'object') {
                return;
            }

            const sourceRatio = normalizeAnchorRatio(value.sourceRatio || value.source_ratio);
            const targetRatio = normalizeAnchorRatio(value.targetRatio || value.target_ratio);
            const nextOverride = {};

            if (sourceRatio) {
                nextOverride.sourceRatio = sourceRatio;
            }

            if (targetRatio) {
                nextOverride.targetRatio = targetRatio;
            }

            if (
                value.bend &&
                typeof value.bend === 'object' &&
                Number.isFinite(Number(value.bend.x)) &&
                Number.isFinite(Number(value.bend.y))
            ) {
                nextOverride.bend = normalizeConnectorBend(value.bend);
            }

            if (Object.keys(nextOverride).length === 0) {
                return;
            }

            safeOverrides[key] = nextOverride;
        });

        return safeOverrides;
    }

    function buildPromptTitle(prompt, fallbackLabel) {
        const compactPrompt = String(prompt || '').replace(/\s+/g, ' ').trim();
        const normalized = normalizePrompt(compactPrompt);

        if (compactPrompt === '') {
            return fallbackLabel;
        }

        if (/cloud run|serverless container|container services?|container apps?/.test(normalized)) {
            return 'Cloud Run';
        }

        if (/\bgke\b|google kubernetes engine|kubernetes|node pools?|worker nodes/.test(normalized)) {
            return 'Private GKE';
        }

        if (/hybrid|cloud vpn|\bvpn\b|interconnect|network connectivity center|\bncc\b|hub-and-spoke|on-prem/.test(normalized)) {
            return 'Hybrid Shared Services';
        }

        if (/cloud functions|\bfunctions\b|serverless|serverless vpc access/.test(normalized)) {
            return 'Cloud Functions with Serverless VPC Access';
        }

        return fallbackLabel;
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

    function extractRegion(prompt, fallbackRegion, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);
        const matched = supportedRegions.find(function (region) {
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

    function inferFromPrompt(prompt, preset) {
        const assumptions = [];
        const matchedKeywords = [];
        const defaults = preset.defaults;
        const route53 = resolveBooleanFeature(prompt, defaults.route53, [/cloud dns/, /\bdns\b/], [/without cloud dns/, /no cloud dns/, /without dns/], 'Cloud DNS', matchedKeywords);
        const cloudFront = resolveBooleanFeature(prompt, defaults.cloudFront, [/cloud cdn/, /\bcdn\b/, /edge cache/], [/without cloud cdn/, /no cloud cdn/, /no cdn/], 'Cloud CDN', matchedKeywords);
        const waf = resolveBooleanFeature(prompt, defaults.waf, [/cloud armor/, /\bwaf\b/, /web application firewall/], [/without cloud armor/, /no cloud armor/, /without waf/, /no waf/], 'Cloud Armor', matchedKeywords);
        const alb = resolveBooleanFeature(prompt, defaults.alb, [/external http\(s\) load balancer/, /https load balancer/, /http load balancer/, /load balancer/, /global load balancer/], [/without load balancer/, /no load balancer/], 'External HTTP(S) Load Balancer', matchedKeywords);
        const bastion = resolveBooleanFeature(prompt, defaults.bastion, [/identity-aware proxy/, /\biap\b/, /bastion/, /jump host/], [/without identity-aware proxy/, /without iap/, /no iap/, /without bastion/, /no bastion/, /without jump host/], 'Identity-Aware Proxy', matchedKeywords);
        const endpoints = resolveBooleanFeature(prompt, defaults.endpoints, [/private service connect/, /\bpsc\b/, /private google access/, /private service access/, /private endpoint/], [/without private service connect/, /without psc/, /no psc/, /without endpoints/, /no endpoints/], 'Private Service Connect', matchedKeywords);
        const flowLogs = resolveBooleanFeature(prompt, defaults.flowLogs, [/vpc flow logs?/, /flow logs?/], [/without flow logs/, /no flow logs/], 'VPC Flow Logs', matchedKeywords);
        const cloudWatch = resolveBooleanFeature(prompt, defaults.cloudWatch, [/cloud monitoring/, /operations suite/, /monitoring/, /alerts?/, /observability/], [/without cloud monitoring/, /no cloud monitoring/, /without monitoring/], 'Cloud Monitoring', matchedKeywords);
        const siteToSiteVpn = resolveBooleanFeature(prompt, defaults.siteToSiteVpn, [/cloud vpn/, /site-to-site vpn/, /\bvpn\b/, /on-prem/, /interconnect/], [/without vpn/, /no vpn/, /without interconnect/], 'Cloud VPN', matchedKeywords);
        const transitGateway = resolveBooleanFeature(prompt, defaults.transitGateway, [/network connectivity center/, /\bncc\b/, /hub-and-spoke/, /cloud router/], [/without network connectivity center/, /without ncc/, /no ncc/], 'Network Connectivity Center', matchedKeywords);
        const cache = resolveBooleanFeature(prompt, defaults.cache, [/memorystore/, /\bredis\b/, /\bcache\b/], [/without cache/, /no cache/, /without redis/], 'Memorystore for Redis', matchedKeywords);

        return {
            presetId: preset.id,
            presetLabel: preset.label,
            title: buildPromptTitle(prompt, preset.label),
            prompt: String(prompt || '').trim(),
            region: extractRegion(prompt, defaults.region, assumptions, matchedKeywords),
            cidr: extractCidr(prompt, defaults.cidr, assumptions, matchedKeywords),
            azCount: extractAzCount(prompt, defaults.azCount, assumptions, matchedKeywords),
            natMode: extractNatMode(prompt, defaults.natMode, assumptions, matchedKeywords),
            appTier: extractAppTier(prompt, defaults.appTier, assumptions, matchedKeywords),
            database: extractDatabase(prompt, defaults.database, assumptions, matchedKeywords),
            route53: route53,
            cloudFront: cloudFront,
            waf: waf,
            alb: alb,
            bastion: bastion,
            endpoints: endpoints,
            flowLogs: flowLogs,
            cloudWatch: cloudWatch,
            siteToSiteVpn: siteToSiteVpn,
            transitGateway: transitGateway,
            cache: cache,
            assumptions: assumptions,
            matchedKeywords: Array.from(new Set(matchedKeywords))
        };
    }

    function isSupportedImportVersion(version) {
        if (typeof version !== 'string' || version.trim() === '') {
            return false;
        }

        return version.split('.')[0] === toolVersion.split('.')[0];
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

    function findPresetById(presets, presetId) {
        return presets.find(function (preset) {
            return preset.id === presetId;
        }) || presets[0];
    }

    function buildImportedPayloadState(payload, presets) {
        if (!payload || typeof payload !== 'object') {
            return {
                error: 'The imported JSON does not contain a valid diagram payload.'
            };
        }

        if (payload.tool !== toolId && !legacyToolIds.includes(payload.tool)) {
            return {
                error: 'The imported JSON is not a GCP VPC Topology workspace export.'
            };
        }

        if (!isSupportedImportVersion(payload.version)) {
            return {
                error: 'The imported JSON uses an unsupported workspace version.'
            };
        }

        if (!payload.diagram || typeof payload.diagram !== 'object') {
            return {
                error: 'The imported JSON does not contain a valid diagram payload.'
            };
        }

        const diagram = payload.diagram;
        const restoredPresetId = typeof diagram.preset_id === 'string' ? diagram.preset_id : presets[0].id;
        const restoredPreset = findPresetById(presets, restoredPresetId);
        const region = parseImportedEnum(diagram.region, supportedRegions, restoredPreset.defaults.region);
        const natMode = parseImportedEnum(diagram.nat_mode, allowedNatModes, restoredPreset.defaults.natMode);
        const appTier = parseImportedEnum(diagram.app_tier, allowedAppTiers, restoredPreset.defaults.appTier);
        const database = parseImportedEnum(diagram.database, allowedDatabases, restoredPreset.defaults.database);
        const azCount = parseImportedAzCount(diagram.az_count, restoredPreset.defaults.azCount);
        const cidr = diagram.cidr === undefined || diagram.cidr === null || diagram.cidr === ''
            ? restoredPreset.defaults.cidr
            : parseCidrValue(diagram.cidr);

        const route53 = parseImportedBoolean(diagram.route53, restoredPreset.defaults.route53);
        const cloudFront = parseImportedBoolean(diagram.cloudfront, restoredPreset.defaults.cloudFront);
        const waf = parseImportedBoolean(diagram.waf, restoredPreset.defaults.waf);
        const alb = parseImportedBoolean(diagram.alb, restoredPreset.defaults.alb);
        const bastion = parseImportedBoolean(diagram.bastion, restoredPreset.defaults.bastion);
        const endpoints = parseImportedBoolean(diagram.endpoints, restoredPreset.defaults.endpoints);
        const flowLogs = parseImportedBoolean(diagram.flow_logs, restoredPreset.defaults.flowLogs);
        const cloudWatch = parseImportedBoolean(diagram.cloudwatch, restoredPreset.defaults.cloudWatch);
        const siteToSiteVpn = parseImportedBoolean(diagram.site_to_site_vpn, restoredPreset.defaults.siteToSiteVpn);
        const transitGateway = parseImportedBoolean(diagram.transit_gateway, restoredPreset.defaults.transitGateway);
        const cache = parseImportedBoolean(diagram.cache, restoredPreset.defaults.cache);

        if (region === null) {
            return {
                error: 'The imported JSON contains an unsupported GCP region.'
            };
        }

        if (cidr === null) {
            return {
                error: 'The imported JSON contains an invalid VPC CIDR.'
            };
        }

        if (azCount === null) {
            return {
                error: 'The imported JSON contains an invalid zone count.'
            };
        }

        if (natMode === null || appTier === null || database === null) {
            return {
                error: 'The imported JSON contains unsupported architecture options.'
            };
        }

        if (
            route53 === null ||
            cloudFront === null ||
            waf === null ||
            alb === null ||
            bastion === null ||
            endpoints === null ||
            flowLogs === null ||
            cloudWatch === null ||
            siteToSiteVpn === null ||
            transitGateway === null ||
            cache === null
        ) {
            return {
                error: 'The imported JSON contains invalid service toggle values.'
            };
        }

        return {
            presetId: restoredPreset.id,
            prompt: typeof diagram.prompt === 'string' ? diagram.prompt : '',
            spec: {
                region: region,
                cidr: cidr,
                azCount: azCount,
                natMode: natMode,
                appTier: appTier,
                database: database,
                route53: route53,
                cloudFront: cloudFront,
                waf: waf,
                alb: alb,
                bastion: bastion,
                endpoints: endpoints,
                flowLogs: flowLogs,
                cloudWatch: cloudWatch,
                siteToSiteVpn: siteToSiteVpn,
                transitGateway: transitGateway,
                cache: cache
            },
            layoutOverrides: cloneLayoutOverrides(payload.layout_overrides),
            connectorOverrides: cloneConnectorOverrides(payload.connector_overrides),
            assumptions: normalizeImportedStringArray(payload.prompt_notes && payload.prompt_notes.assumptions),
            matchedKeywords: normalizeImportedStringArray(payload.prompt_notes && payload.prompt_notes.matched_keywords)
        };
    }

    function buildExportPayload(spec, inventory, layoutOverrides, connectorOverrides, notePayload) {
        return {
            tool: toolId,
            version: toolVersion,
            generated_at: new Date().toISOString(),
            diagram: {
                title: spec.title,
                prompt: spec.prompt,
                preset_id: spec.presetId,
                preset_label: spec.presetLabel,
                region: spec.region,
                cidr: spec.cidr,
                az_count: spec.azCount,
                nat_mode: spec.natMode,
                app_tier: spec.appTier,
                database: spec.database,
                route53: spec.route53,
                cloudfront: spec.cloudFront,
                waf: spec.waf,
                alb: spec.alb,
                bastion: spec.bastion,
                endpoints: spec.endpoints,
                flow_logs: spec.flowLogs,
                cloudwatch: spec.cloudWatch,
                site_to_site_vpn: spec.siteToSiteVpn,
                transit_gateway: spec.transitGateway,
                cache: spec.cache
            },
            layout_overrides: cloneLayoutOverrides(layoutOverrides),
            connector_overrides: cloneConnectorOverrides(connectorOverrides),
            inventory: inventory,
            prompt_notes: notePayload
        };
    }

    return {
        toolId: toolId,
        legacyToolIds: legacyToolIds,
        toolVersion: toolVersion,
        regionCatalog: regionCatalog,
        supportedRegions: supportedRegions,
        allowedNatModes: allowedNatModes,
        allowedAppTiers: allowedAppTiers,
        allowedDatabases: allowedDatabases,
        normalizePrompt: normalizePrompt,
        normalizeCidrInput: normalizeCidrInput,
        isValidIpv4Cidr: isValidIpv4Cidr,
        parseCidrValue: parseCidrValue,
        natModeLabel: natModeLabel,
        appTierLabel: appTierLabel,
        databaseLabel: databaseLabel,
        normalizeAnchorRatio: normalizeAnchorRatio,
        normalizeConnectorBend: normalizeConnectorBend,
        cloneLayoutOverrides: cloneLayoutOverrides,
        cloneConnectorOverrides: cloneConnectorOverrides,
        buildPromptTitle: buildPromptTitle,
        inferFromPrompt: inferFromPrompt,
        buildImportedPayloadState: buildImportedPayloadState,
        buildExportPayload: buildExportPayload
    };
}());

if (typeof globalThis !== 'undefined') {
    globalThis.ArchitectureVpcGcpModelCore = ArchitectureVpcGcpModelCore;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchitectureVpcGcpModelCore;
}
