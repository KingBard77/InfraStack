const ArchitectureVpcAwsModelCore = (function () {
    const toolId = 'architecture-vpc-aws';
    const legacyToolIds = ['aws-vpc-architecture'];
    const toolVersion = '1.0.0';
    const regionCatalog = [
        { value: 'us-east-1', label: 'us-east-1' },
        { value: 'us-east-2', label: 'us-east-2' },
        { value: 'us-west-1', label: 'us-west-1' },
        { value: 'us-west-2', label: 'us-west-2' },
        { value: 'ca-central-1', label: 'ca-central-1' },
        { value: 'sa-east-1', label: 'sa-east-1' },
        { value: 'eu-central-1', label: 'eu-central-1' },
        { value: 'eu-west-1', label: 'eu-west-1' },
        { value: 'eu-west-2', label: 'eu-west-2' },
        { value: 'eu-west-3', label: 'eu-west-3' },
        { value: 'eu-north-1', label: 'eu-north-1' },
        { value: 'eu-south-1', label: 'eu-south-1' },
        { value: 'ap-south-1', label: 'ap-south-1' },
        { value: 'ap-south-2', label: 'ap-south-2' },
        { value: 'ap-southeast-1', label: 'ap-southeast-1' },
        { value: 'ap-southeast-2', label: 'ap-southeast-2' },
        { value: 'ap-northeast-1', label: 'ap-northeast-1' },
        { value: 'ap-northeast-2', label: 'ap-northeast-2' },
        { value: 'ap-northeast-3', label: 'ap-northeast-3' },
        { value: 'ap-east-1', label: 'ap-east-1' },
        { value: 'me-south-1', label: 'me-south-1' },
        { value: 'me-central-1', label: 'me-central-1' },
        { value: 'il-central-1', label: 'il-central-1' }
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
            none: 'No NAT',
            single: 'Single NAT',
            'per-az': 'NAT per AZ'
        }[value] || value;
    }

    function appTierLabel(value) {
        return {
            ec2: 'EC2 Auto Scaling',
            ecs: 'ECS / Fargate',
            eks: 'EKS',
            lambda: 'Lambda in VPC'
        }[value] || value;
    }

    function databaseLabel(value) {
        return {
            none: 'No database tier',
            rds: 'RDS',
            aurora: 'Aurora',
            dynamodb: 'DynamoDB'
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

        if (/\bfargate\b|\becs\b/.test(normalized)) {
            return 'ECS Fargate';
        }

        if (/\beks\b|kubernetes|worker nodes/.test(normalized)) {
            return 'Private EKS';
        }

        if (/hybrid|site-to-site vpn|\bvpn\b|transit gateway|\btgw\b|on-prem/.test(normalized)) {
            return 'Hybrid Shared Services';
        }

        if (/\blambda\b|serverless/.test(normalized)) {
            return 'Lambda in VPC';
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
            { count: 3, tests: [/3 availability zones/, /three availability zones/, /3 az/, /three az/] },
            { count: 2, tests: [/2 availability zones/, /two availability zones/, /2 az/, /two az/, /multi-az/] },
            { count: 1, tests: [/1 availability zone/, /one availability zone/, /1 az/, /single az/] }
        ];

        const matchedPattern = patterns.find(function (pattern) {
            return pattern.tests.some(function (test) {
                return test.test(normalizedPrompt);
            });
        });

        if (matchedPattern) {
            matchedKeywords.push(String(matchedPattern.count) + ' AZ');
            return matchedPattern.count;
        }

        assumptions.push('Availability zone count not specified in the prompt. Kept the preset AZ count.');

        return fallbackAzCount;
    }

    function extractNatMode(prompt, fallbackNatMode, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);

        if (/one nat gateway per az|nat gateway per az|nat gateways in each az|per-az nat/.test(normalizedPrompt)) {
            matchedKeywords.push('NAT per AZ');
            return 'per-az';
        }

        if (/no nat|without nat|private only with no nat/.test(normalizedPrompt)) {
            matchedKeywords.push('No NAT');
            return 'none';
        }

        if (/single nat|one nat gateway|nat gateway/.test(normalizedPrompt)) {
            matchedKeywords.push('Single NAT');
            return 'single';
        }

        assumptions.push('NAT mode not specified in the prompt. Kept the preset mode.');

        return fallbackNatMode;
    }

    function extractAppTier(prompt, fallbackAppTier, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);
        const options = [
            { value: 'eks', tests: [/\beks\b/, /kubernetes/, /worker nodes/] },
            { value: 'ecs', tests: [/\becs\b/, /fargate/] },
            { value: 'lambda', tests: [/\blambda\b/, /serverless/] },
            { value: 'ec2', tests: [/\bec2\b/, /auto scaling/, /application servers/] }
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

        if (/dynamodb/.test(normalizedPrompt)) {
            matchedKeywords.push('DynamoDB');
            return 'dynamodb';
        }

        if (/aurora/.test(normalizedPrompt)) {
            matchedKeywords.push('Aurora');
            return 'aurora';
        }

        if (/\brds\b|postgres|mysql|mariadb|sql server/.test(normalizedPrompt)) {
            matchedKeywords.push('RDS');
            return 'rds';
        }

        assumptions.push('Database tier not specified in the prompt. Kept the preset data tier.');

        return fallbackDatabase;
    }

    function inferFromPrompt(prompt, preset) {
        const assumptions = [];
        const matchedKeywords = [];
        const defaults = preset.defaults;
        const route53 = resolveBooleanFeature(prompt, defaults.route53, [/route\s*53/, /\bdns\b/], [/without route\s*53/, /no route\s*53/], 'Route 53', matchedKeywords);
        const cloudFront = resolveBooleanFeature(prompt, defaults.cloudFront, [/cloudfront/, /\bcdn\b/], [/without cloudfront/, /no cloudfront/, /no cdn/], 'CloudFront', matchedKeywords);
        const waf = resolveBooleanFeature(prompt, defaults.waf, [/\bwaf\b/, /web application firewall/], [/without waf/, /no waf/], 'AWS WAF', matchedKeywords);
        const alb = resolveBooleanFeature(prompt, defaults.alb, [/\balb\b/, /application load balancer/, /load balancer/], [/without alb/, /no alb/, /without load balancer/, /no load balancer/], 'ALB', matchedKeywords);
        const bastion = resolveBooleanFeature(prompt, defaults.bastion, [/bastion/, /jump host/], [/without bastion/, /no bastion/, /without jump host/], 'Bastion', matchedKeywords);
        const endpoints = resolveBooleanFeature(prompt, defaults.endpoints, [/vpc endpoint/, /vpc endpoints/, /private link/, /privatelink/, /ssm endpoint/, /s3 endpoint/], [/without endpoints/, /no endpoints/, /without private link/], 'VPC endpoints', matchedKeywords);
        const flowLogs = resolveBooleanFeature(prompt, defaults.flowLogs, [/flow logs?/, /vpc flow logs?/], [/without flow logs/, /no flow logs/], 'Flow logs', matchedKeywords);
        const cloudWatch = resolveBooleanFeature(prompt, defaults.cloudWatch, [/cloudwatch/, /monitoring/, /alarms?/, /observability/, /centralized logs?/], [/without cloudwatch/, /no cloudwatch/, /without monitoring/], 'CloudWatch', matchedKeywords);
        const siteToSiteVpn = resolveBooleanFeature(prompt, defaults.siteToSiteVpn, [/site-to-site vpn/, /\bvpn\b/, /on-prem/], [/without vpn/, /no vpn/], 'Site-to-site VPN', matchedKeywords);
        const transitGateway = resolveBooleanFeature(prompt, defaults.transitGateway, [/transit gateway/, /\btgw\b/], [/without transit gateway/, /no transit gateway/, /without tgw/], 'Transit Gateway', matchedKeywords);
        const cache = resolveBooleanFeature(prompt, defaults.cache, [/elasticache/, /\bredis\b/, /\bcache\b/], [/without cache/, /no cache/, /without redis/], 'ElastiCache', matchedKeywords);

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
                error: 'The imported JSON is not an AWS VPC Architecture workspace export.'
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
                error: 'The imported JSON contains an unsupported AWS region.'
            };
        }

        if (cidr === null) {
            return {
                error: 'The imported JSON contains an invalid VPC CIDR.'
            };
        }

        if (azCount === null) {
            return {
                error: 'The imported JSON contains an invalid availability zone count.'
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
    globalThis.ArchitectureVpcAwsModelCore = ArchitectureVpcAwsModelCore;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchitectureVpcAwsModelCore;
}
