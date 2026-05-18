const ArchitectureVpcHuaweiModelCore = (function () {
    const toolId = 'architecture-vpc-huawei';
    const toolVersion = '1.0.0';
    const legacyToolIds = ['huawei-cloud-architecture'];
    const allowedCloudSizes = ['small', 'medium', 'large'];
    const allowedAccessBlocks = [1, 2, 3];
    const allowedRoutingModes = ['public-private', 'private-only', 'hybrid', 'edge-protected'];
    const booleanKeys = [
        'wireless',
        'firewall',
        'wan',
        'monitoring',
        'dhcpDns',
        'hsrp',
        'etherChannel',
        'acl',
        'nat',
        'vpn'
    ];
    const presetCatalog = [
        {
            id: 'secure-vpc-app',
            label: 'Secure VPC App',
            description: 'WAF and DNS, public ingress, private app/data subnets, security groups, flow logs, and monitored operations.',
            defaults: {
                cloudSize: 'medium',
                accessBlocks: 3,
                vlans: [
                    'Public ingress subnet 10.80.0.0/24',
                    'Private app subnet 10.80.10.0/24',
                    'Private data subnet 10.80.20.0/24'
                ],
                wireless: false,
                firewall: true,
                wan: false,
                monitoring: true,
                dhcpDns: true,
                routingMode: 'edge-protected',
                hsrp: true,
                etherChannel: true,
                acl: true,
                nat: true,
                vpn: false,
                trunkVlans: '10.80.0.0/16',
                nativeVlan: '10.80.0.0/24',
                accessVlan: '10.80.10.0/24',
                sviGateway: '10.80.20.0/24',
                ospfArea: 'prod-app',
                bgpAsn: '64520',
                redundancyVip: 'app.example.com'
            }
        },
        {
            id: 'openshift-platform',
            label: 'CCE Platform',
            description: 'Three-zone VPC for Cloud Container Engine (CCE) with private workers, load balancing, service endpoints, secrets, and observability.',
            defaults: {
                cloudSize: 'large',
                accessBlocks: 3,
                vlans: [
                    'Ingress subnet 10.90.0.0/24',
                    'Worker subnet 10.90.10.0/22',
                    'Data services subnet 10.90.30.0/24'
                ],
                wireless: true,
                firewall: true,
                wan: false,
                monitoring: true,
                dhcpDns: true,
                routingMode: 'public-private',
                hsrp: true,
                etherChannel: true,
                acl: true,
                nat: true,
                vpn: false,
                trunkVlans: '10.90.0.0/16',
                nativeVlan: '10.90.0.0/24',
                accessVlan: '10.90.10.0/22',
                sviGateway: '10.90.30.0/24',
                ospfArea: 'platform-app',
                bgpAsn: '64530',
                redundancyVip: 'apps.example.com'
            }
        },
        {
            id: 'data-services',
            label: 'Data Services',
            description: 'Private-first VPC with app and data subnets, OBS, PostgreSQL, DEW KMS, CSMS, logging, and private endpoints.',
            defaults: {
                cloudSize: 'medium',
                accessBlocks: 2,
                vlans: [
                    'Private app subnet 10.100.10.0/24',
                    'Private data subnet 10.100.20.0/24',
                    'Service endpoint subnet 10.100.30.0/24'
                ],
                wireless: false,
                firewall: true,
                wan: false,
                monitoring: true,
                dhcpDns: true,
                routingMode: 'private-only',
                hsrp: false,
                etherChannel: false,
                acl: true,
                nat: false,
                vpn: false,
                trunkVlans: '10.100.0.0/16',
                nativeVlan: '10.100.30.0/24',
                accessVlan: '10.100.10.0/24',
                sviGateway: '10.100.20.0/24',
                ospfArea: 'data-app',
                bgpAsn: '64540',
                redundancyVip: 'private.example.com'
            }
        },
        {
            id: 'hybrid-connectivity',
            label: 'Hybrid Connectivity',
            description: 'Hybrid VPC with Enterprise Router, Direct Connect or VPN, private tiers, NAT Gateway egress, flow logs, and monitored controls.',
            defaults: {
                cloudSize: 'large',
                accessBlocks: 3,
                vlans: [
                    'Hybrid ingress subnet 10.110.0.0/24',
                    'Private workload subnet 10.110.10.0/23',
                    'Shared services subnet 10.110.30.0/24'
                ],
                wireless: false,
                firewall: true,
                wan: true,
                monitoring: true,
                dhcpDns: true,
                routingMode: 'hybrid',
                hsrp: false,
                etherChannel: true,
                acl: true,
                nat: true,
                vpn: true,
                trunkVlans: '10.110.0.0/16',
                nativeVlan: '10.110.0.0/24',
                accessVlan: '10.110.10.0/23',
                sviGateway: '10.110.30.0/24',
                ospfArea: 'hybrid-app',
                bgpAsn: '64550',
                redundancyVip: 'hybrid.example.com'
            }
        }
    ];

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function normalizeText(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getPreset(presetId) {
        return presetCatalog.find(function (preset) {
            return preset.id === presetId;
        }) || presetCatalog[0];
    }

    function routingLabel(value) {
        return {
            'public-private': 'Public/private tiers',
            'private-only': 'Private endpoint only',
            hybrid: 'Hybrid connectivity',
            'edge-protected': 'Edge protected ingress'
        }[value] || 'Public/private tiers';
    }

    function cloudSizeLabel(value) {
        return {
            small: 'Small workload',
            medium: 'Medium workload',
            large: 'Large workload'
        }[value] || 'Medium workload';
    }

    function zoneCountLabel(value) {
        const count = Number(value) || 2;

        return count + ' availability zone' + (count === 1 ? '' : 's');
    }

    function normalizeEnum(value, fallback, allowedValues) {
        const normalized = normalizeText(value);

        if (allowedValues.includes(normalized)) {
            return normalized;
        }

        return allowedValues.includes(fallback) ? fallback : allowedValues[0];
    }

    function normalizeAccessBlocks(value, fallback) {
        const parsed = Number(value);

        if (Number.isInteger(parsed) && allowedAccessBlocks.includes(parsed)) {
            return parsed;
        }

        if (Number.isInteger(fallback) && allowedAccessBlocks.includes(fallback)) {
            return fallback;
        }

        return 2;
    }

    function normalizeBoolean(value, fallback) {
        if (typeof value === 'boolean') {
            return value;
        }

        if (typeof value === 'string') {
            const normalized = normalizeText(value);

            if (normalized === 'true') {
                return true;
            }

            if (normalized === 'false') {
                return false;
            }
        }

        return Boolean(fallback);
    }

    function validateBoolean(value) {
        return typeof value === 'undefined' ||
            typeof value === 'boolean' ||
            value === 'true' ||
            value === 'false';
    }

    function isValidIpv4Cidr(value) {
        const normalized = String(value || '').trim();

        if (!/^\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2}$/.test(normalized)) {
            return false;
        }

        const parts = normalized.split('/');
        const octets = parts[0].split('.').map(Number);
        const mask = Number(parts[1]);

        return octets.every(function (octet) {
            return Number.isInteger(octet) && octet >= 0 && octet <= 255;
        }) && Number.isInteger(mask) && mask >= 0 && mask <= 32;
    }

    function normalizeCidr(value, fallback) {
        const normalized = String(value || '').trim();

        if (isValidIpv4Cidr(normalized)) {
            return normalized;
        }

        return isValidIpv4Cidr(fallback) ? String(fallback).trim() : '10.80.0.0/16';
    }

    function normalizeShortText(value, fallback) {
        const normalized = String(value || '').trim().replace(/\s+/g, '-').slice(0, 64);

        return normalized || fallback;
    }

    function normalizeAsn(value, fallback) {
        const match = String(value || '').match(/\d{1,10}/);

        return match ? match[0] : String(fallback || '64520');
    }

    function normalizeSubnetTiers(value, fallback) {
        const source = Array.isArray(value) ? value : String(value || '').split(/\n|;/);
        const tiers = source
            .map(function (item) {
                return String(item || '').trim();
            })
            .filter(Boolean);

        if (tiers.length > 0) {
            return tiers.slice(0, 8);
        }

        if (Array.isArray(fallback) && fallback.length > 0) {
            return fallback.slice(0, 8);
        }

        return [
            'Public ingress subnet 10.80.0.0/24',
            'Private app subnet 10.80.10.0/24',
            'Private data subnet 10.80.20.0/24'
        ];
    }

    function normalizeVlans(value, fallback) {
        return normalizeSubnetTiers(value, fallback);
    }

    function wordNumberToInteger(value) {
        return {
            one: 1,
            two: 2,
            three: 3
        }[normalizeText(value)] || null;
    }

    function resolveBooleanFromPrompt(prompt, currentValue, positivePatterns, negativePatterns) {
        if (negativePatterns.some(function (pattern) {
            return pattern.test(prompt);
        })) {
            return false;
        }

        if (positivePatterns.some(function (pattern) {
            return pattern.test(prompt);
        })) {
            return true;
        }

        return currentValue;
    }

    function extractFirst(prompt, patterns) {
        for (let index = 0; index < patterns.length; index += 1) {
            const match = prompt.match(patterns[index]);

            if (match && match[1]) {
                return match[1];
            }
        }

        return '';
    }

    function extractCidr(prompt, labelPatterns, fallback) {
        const value = extractFirst(prompt, labelPatterns);

        if (value) {
            return normalizeCidr(value, fallback);
        }

        const anyCidr = prompt.match(/\b\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2}\b/);

        return anyCidr ? normalizeCidr(anyCidr[0], fallback) : fallback;
    }

    function extractSubnetTiersFromPrompt(prompt) {
        const tiers = [];
        const patterns = [
            /(public(?:\s+ingress)?\s+subnet\s+\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/g,
            /(private\s+app\s+subnet\s+\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/g,
            /(private\s+data\s+subnet\s+\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/g,
            /(service\s+endpoint\s+subnet\s+\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/g,
            /(workload\s+subnet\s+\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/g
        ];

        patterns.forEach(function (pattern) {
            let match = pattern.exec(prompt);

            while (match) {
                tiers.push(match[1].replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                }));
                match = pattern.exec(prompt);
            }
        });

        return tiers;
    }

    function buildBaseSpec(values) {
        const preset = getPreset(values && values.preset);
        const defaults = preset.defaults;
        const source = values || {};

        return {
            preset: preset.id,
            presetLabel: source.presetLabel || preset.label,
            cloudSize: normalizeEnum(source.cloudSize, defaults.cloudSize, allowedCloudSizes),
            accessBlocks: normalizeAccessBlocks(source.accessBlocks, defaults.accessBlocks),
            vlans: normalizeSubnetTiers(source.vlans, defaults.vlans),
            wireless: normalizeBoolean(source.wireless, defaults.wireless),
            firewall: normalizeBoolean(source.firewall, defaults.firewall),
            wan: normalizeBoolean(source.wan, defaults.wan),
            monitoring: normalizeBoolean(source.monitoring, defaults.monitoring),
            dhcpDns: normalizeBoolean(source.dhcpDns, defaults.dhcpDns),
            routingMode: normalizeEnum(source.routingMode, defaults.routingMode, allowedRoutingModes),
            hsrp: normalizeBoolean(source.hsrp, defaults.hsrp),
            etherChannel: normalizeBoolean(source.etherChannel, defaults.etherChannel),
            acl: normalizeBoolean(source.acl, defaults.acl),
            nat: normalizeBoolean(source.nat, defaults.nat),
            vpn: normalizeBoolean(source.vpn, defaults.vpn),
            trunkVlans: normalizeCidr(source.trunkVlans || source.vpcCidr, defaults.trunkVlans),
            nativeVlan: normalizeCidr(source.nativeVlan || source.publicSubnetCidr, defaults.nativeVlan),
            accessVlan: normalizeCidr(source.accessVlan || source.privateSubnetCidr, defaults.accessVlan),
            sviGateway: normalizeCidr(source.sviGateway || source.dataSubnetCidr, defaults.sviGateway),
            ospfArea: normalizeShortText(source.ospfArea || source.enterpriseProject || source.resourceGroup, defaults.ospfArea),
            bgpAsn: normalizeAsn(source.bgpAsn, defaults.bgpAsn),
            redundancyVip: String(source.redundancyVip || source.dnsZone || defaults.redundancyVip).trim(),
            prompt: String(source.prompt || '')
        };
    }

    /**
     * Builds a normalized Huawei Cloud architecture spec from controls and prompt text.
     *
     * @param {Object} values Raw control values and prompt text.
     * @returns {Object} Normalized Huawei Cloud architecture spec.
     */
    function inferFromPrompt(values) {
        const spec = buildBaseSpec(values);
        const prompt = normalizeText(spec.prompt);
        const zoneMatch = prompt.match(/\b([1-3])\s+(?:availability\s+)?zones?\b/) ||
            prompt.match(/\b(one|two|three)\s+(?:availability\s+)?zones?\b/);
        const subnetTiers = extractSubnetTiersFromPrompt(prompt);

        if (/\blarge\b|enterprise[- ]scale|enterprise\s+workload|production|multi-zone|cce|cloud container engine|kubernetes/.test(prompt)) {
            spec.cloudSize = 'large';
        } else if (/\bsmall\b|dev|sandbox|single-zone/.test(prompt)) {
            spec.cloudSize = 'small';
        } else if (/\bmedium\b|standard/.test(prompt)) {
            spec.cloudSize = 'medium';
        }

        if (zoneMatch) {
            spec.accessBlocks = normalizeAccessBlocks(
                Number(zoneMatch[1]) || wordNumberToInteger(zoneMatch[1]),
                spec.accessBlocks
            );
        }

        spec.wireless = resolveBooleanFromPrompt(
            prompt,
            spec.wireless,
            [/\bcce\b/, /cloud container engine/, /kubernetes/, /worker nodes?/],
            [/no cce/, /without cce/, /no kubernetes/, /without kubernetes/]
        );
        spec.firewall = resolveBooleanFromPrompt(
            prompt,
            spec.firewall,
            [/security group/, /network acl/, /\bacl\b/, /firewall/, /microsegmentation/],
            [/no security group/, /without security group/, /no acl/, /without acl/]
        );
        spec.wan = resolveBooleanFromPrompt(
            prompt,
            spec.wan,
            [/enterprise router/, /hub and spoke/, /shared services hub/],
            [/no enterprise router/, /without enterprise router/]
        );
        spec.monitoring = resolveBooleanFromPrompt(
            prompt,
            spec.monitoring,
            [/cloud eye/, /\bcts\b/, /monitoring/, /log analysis/, /\blogs\b/, /observability/],
            [/no cloud eye/, /without cloud eye/, /no cts/, /no monitoring/, /without monitoring/, /no logs/]
        );
        spec.dhcpDns = resolveBooleanFromPrompt(
            prompt,
            spec.dhcpDns,
            [/\bdew\b/, /\bkms\b/, /\bcsms\b/, /secrets/, /key management/],
            [/no dew/, /without dew/, /no secrets/, /without secrets/, /no kms/]
        );
        spec.hsrp = resolveBooleanFromPrompt(
            prompt,
            spec.hsrp,
            [/\bwaf\b/, /\bdns\b/, /\bcdn\b/, /edge protected/],
            [/no waf/, /without waf/, /no dns/, /no edge/]
        );
        spec.etherChannel = resolveBooleanFromPrompt(
            prompt,
            spec.etherChannel,
            [/\belb\b/, /elastic load balance/, /load balancer/, /ingress/],
            [/no elb/, /no load balancer/, /without load balancer/]
        );
        spec.acl = resolveBooleanFromPrompt(
            prompt,
            spec.acl,
            [/flow logs?/, /vpc logs?/, /logging/, /\bcts\b/],
            [/no flow logs?/, /without flow logs?/]
        );
        spec.nat = resolveBooleanFromPrompt(
            prompt,
            spec.nat,
            [/nat gateway/, /\bnat\b/, /egress/],
            [/no nat gateway/, /without nat gateway/, /no nat/]
        );
        spec.vpn = resolveBooleanFromPrompt(
            prompt,
            spec.vpn,
            [/direct connect/, /\bvpn\b/, /site-to-site/, /on-prem/, /on premises/, /hybrid/],
            [/no vpn/, /without vpn/, /no direct connect/]
        );

        if (/private[- ]only|private endpoint|no public|service endpoint/.test(prompt)) {
            spec.routingMode = 'private-only';
        } else if (/hybrid|direct connect|\bvpn\b|enterprise router|on-prem|on premises/.test(prompt)) {
            spec.routingMode = 'hybrid';
        } else if (/\bwaf\b|\bdns\b|edge protected|cdn/.test(prompt)) {
            spec.routingMode = 'edge-protected';
        } else if (/public.*private|public ingress|private app/.test(prompt)) {
            spec.routingMode = 'public-private';
        }

        if (subnetTiers.length > 0) {
            spec.vlans = normalizeSubnetTiers(subnetTiers, spec.vlans);
        }

        spec.trunkVlans = extractCidr(prompt, [
            /vpc\s+cidr\s+(\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/,
            /cidr\s+(\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/
        ], spec.trunkVlans);
        spec.nativeVlan = normalizeCidr(extractFirst(prompt, [
            /public(?:\s+ingress)?\s+subnet\s+(\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/
        ]), spec.nativeVlan);
        spec.accessVlan = normalizeCidr(extractFirst(prompt, [
            /private\s+(?:app|workload|worker)\s+subnet\s+(\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/
        ]), spec.accessVlan);
        spec.sviGateway = normalizeCidr(extractFirst(prompt, [
            /private\s+data\s+subnet\s+(\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/,
            /data\s+subnet\s+(\d{1,3}(?:\.\d{1,3}){3}\/\d{1,2})/
        ]), spec.sviGateway);
        spec.ospfArea = normalizeShortText(extractFirst(prompt, [
            /enterprise\s+project\s+([a-z0-9-]+)/,
            /project\s+([a-z0-9-]+)/
        ]), spec.ospfArea);
        spec.bgpAsn = normalizeAsn(extractFirst(prompt, [
            /(?:edge\s+)?asn\s+(\d{1,10})/,
            /\bbgp\s+as\s+(\d{1,10})/
        ]), spec.bgpAsn);
        spec.redundancyVip = extractFirst(prompt, [
            /dns\s+zone\s+([a-z0-9.-]+\.[a-z]{2,})/,
            /domain\s+([a-z0-9.-]+\.[a-z]{2,})/
        ]) || spec.redundancyVip;

        return spec;
    }

    function cloneLayoutOverrides(layoutOverrides) {
        const safeOverrides = {};

        Object.keys(layoutOverrides || {}).forEach(function (key) {
            const value = layoutOverrides[key];

            if (!value || typeof value !== 'object') {
                return;
            }

            const nextOverride = {};

            ['x', 'y', 'width', 'height'].forEach(function (property) {
                const parsed = Number(value[property]);

                if (Number.isFinite(parsed)) {
                    nextOverride[property] = parsed;
                }
            });

            if (Object.keys(nextOverride).length > 0) {
                safeOverrides[key] = nextOverride;
            }
        });

        return safeOverrides;
    }

    function applyOverride(node, layoutOverrides) {
        const override = layoutOverrides[node.id];

        if (!override) {
            return node;
        }

        return Object.assign({}, node, override);
    }

    function createNode(config, layoutOverrides) {
        return applyOverride(Object.assign({
            width: 184,
            height: 90,
            meta: ''
        }, config), layoutOverrides);
    }

    function buildSubnetNodes(spec, layoutOverrides) {
        return [
            createNode({
                id: 'public-subnets',
                title: 'Public Ingress Subnets',
                subtitle: spec.nativeVlan,
                layer: 'Subnet tier',
                icon: 'subnet',
                x: 309,
                y: 585,
                purpose: 'Hosts public ingress and edge-facing resources when the design allows public entry.'
            }, layoutOverrides),
            createNode({
                id: 'private-app-subnets',
                title: 'Private App Subnets',
                subtitle: spec.accessVlan,
                layer: 'Subnet tier',
                icon: 'subnet',
                x: 531,
                y: 585,
                purpose: 'Places application instances, workers, or service runtimes away from direct public exposure.'
            }, layoutOverrides),
            createNode({
                id: 'private-data-subnets',
                title: 'Private Data Subnets',
                subtitle: spec.sviGateway,
                layer: 'Subnet tier',
                icon: 'subnet',
                x: 753,
                y: 585,
                purpose: 'Keeps database and data-service traffic in private network space.'
            }, layoutOverrides)
        ];
    }

    /**
     * Builds stage nodes and connectors for the normalized Huawei Cloud spec.
     *
     * @param {Object} values Normalized or raw Huawei Cloud architecture spec.
     * @param {Object} layoutOverrides Optional node layout overrides keyed by node ID.
     * @returns {Object} Architecture stage model with width, height, nodes, and connectors.
     */
    function buildArchitecture(values, layoutOverrides) {
        const spec = buildBaseSpec(values);
        const safeOverrides = cloneLayoutOverrides(layoutOverrides);
        const nodes = [
            createNode({
                id: 'users',
                title: 'Users / Clients',
                subtitle: routingLabel(spec.routingMode),
                layer: 'External access',
                icon: 'users',
                x: 70,
                y: 172,
                width: 152,
                purpose: 'Represents application users, partner systems, or operators reaching the Huawei Cloud environment.'
            }, safeOverrides),
            createNode({
                id: 'vpc',
                title: 'Huawei Cloud VPC',
                subtitle: spec.trunkVlans,
                layer: zoneCountLabel(spec.accessBlocks),
                icon: 'vpc',
                x: 515,
                y: 390,
                width: 210,
                height: 86,
                purpose: 'Defines the regional Huawei Cloud network boundary, address space, route tables, and subnet grouping.'
            }, safeOverrides)
        ];
        const connectors = [];
        let ingressTarget = 'vpc';

        if (spec.etherChannel) {
            nodes.push(createNode({
                id: 'load-balancer',
                title: 'Elastic Load Balance',
                subtitle: spec.routingMode === 'private-only' ? 'Private ingress' : 'Application ingress',
                layer: 'Ingress',
                icon: 'vpc',
                x: 515,
                y: 172,
                width: 210,
                purpose: 'Distributes application traffic into the private workload tier.'
            }, safeOverrides));
            connectors.push({
                id: 'load-balancer-to-vpc',
                from: 'load-balancer',
                to: 'vpc',
                label: 'Ingress path'
            });
            ingressTarget = 'load-balancer';
        }

        if (spec.hsrp) {
            nodes.push(createNode({
                id: 'waf-dns',
                title: 'WAF and DNS',
                subtitle: spec.redundancyVip || 'DNS / CDN / WAF',
                layer: 'Edge',
                icon: 'cis',
                x: 290,
                y: 172,
                width: 190,
                purpose: 'Adds DNS, edge security, acceleration, or WAF-style protection before application ingress.'
            }, safeOverrides));
            connectors.push({
                id: 'users-to-waf-dns',
                from: 'users',
                to: 'waf-dns',
                label: 'DNS / edge'
            });
            connectors.push({
                id: 'waf-dns-to-ingress',
                from: 'waf-dns',
                to: ingressTarget,
                label: 'Protected ingress'
            });
        } else {
            connectors.push({
                id: 'users-to-ingress',
                from: 'users',
                to: ingressTarget,
                label: 'Application access'
            });
        }

        if (spec.firewall) {
            nodes.push(createNode({
                id: 'security-controls',
                title: 'Security Groups / ACLs',
                subtitle: spec.acl ? 'Flow logs enabled' : 'Policy boundary',
                layer: 'Security',
                icon: 'security',
                x: 745,
                y: 172,
                width: 196,
                purpose: 'Represents Huawei Cloud security groups, network ACLs, and subnet policy boundaries.'
            }, safeOverrides));
            connectors.push({
                id: 'security-to-vpc',
                from: 'security-controls',
                to: 'vpc',
                label: 'Policy'
            });
        }

        buildSubnetNodes(spec, safeOverrides).forEach(function (node) {
            nodes.push(node);
            connectors.push({
                id: 'vpc-to-' + node.id,
                from: 'vpc',
                to: node.id,
                label: 'Zone spread'
            });
        });

        nodes.push(createNode({
            id: 'workload-runtime',
            title: spec.wireless ? 'Cloud Container Engine (CCE)' : 'Elastic Cloud Server (ECS)',
            subtitle: spec.wireless ? 'Worker nodes' : cloudSizeLabel(spec.cloudSize),
            layer: 'Workload',
            icon: spec.wireless ? 'kubernetes' : 'vsi',
            x: 524,
            y: 735,
            width: 190,
            purpose: 'Runs the application workload in private Huawei Cloud network space.'
        }, safeOverrides));
        connectors.push({
            id: 'app-subnets-to-workload',
            from: 'private-app-subnets',
            to: 'workload-runtime',
            label: 'Private traffic'
        });

        nodes.push(createNode({
            id: 'data-services',
            title: 'Data Services',
            subtitle: 'RDS / OBS',
            layer: 'Managed services',
            icon: 'objectStorage',
            x: 746,
            y: 735,
            width: 190,
            purpose: 'Represents Huawei Cloud RDS, OBS, and private service endpoint consumption.'
        }, safeOverrides));
        connectors.push({
            id: 'data-subnets-to-data-services',
            from: 'private-data-subnets',
            to: 'data-services',
            label: 'Private endpoint'
        });

        if (spec.nat) {
            nodes.push(createNode({
                id: 'nat-gateway',
                title: 'NAT Gateway',
                subtitle: 'Controlled egress',
                layer: 'Egress',
                icon: 'vpc',
                x: 309,
                y: 735,
                purpose: 'Provides outbound internet egress for private workloads where required.'
            }, safeOverrides));
            connectors.push({
                id: 'public-subnets-to-gateway',
                from: 'public-subnets',
                to: 'nat-gateway',
                label: 'Egress'
            });
        }

        if (spec.dhcpDns) {
            nodes.push(createNode({
                id: 'secrets-key-protect',
                title: 'DEW KMS / CSMS',
                subtitle: spec.ospfArea,
                layer: 'Security service',
                icon: 'security',
                x: 995,
                y: 585,
                purpose: 'Stores secrets and key material referenced by workloads and managed services.'
            }, safeOverrides));
            connectors.push({
                id: 'vpc-to-secrets',
                from: 'vpc',
                to: 'secrets-key-protect',
                label: 'Private access'
            });
        }

        if (spec.wan || spec.vpn) {
            nodes.push(createNode({
                id: 'enterprise-router',
                title: 'Enterprise Router',
                subtitle: 'Hub / spoke routing',
                layer: 'Hybrid network',
                icon: 'transitGateway',
                x: 995,
                y: 390,
                purpose: 'Connects the VPC to other VPCs, classic infrastructure, or shared services networks.'
            }, safeOverrides));
            connectors.push({
                id: 'vpc-to-enterprise-router',
                from: 'vpc',
                to: 'enterprise-router',
                label: 'Route exchange'
            });
        }

        if (spec.vpn) {
            nodes.push(createNode({
                id: 'direct-connect-vpn',
                title: 'Direct Connect / VPN',
                subtitle: 'ASN ' + spec.bgpAsn,
                layer: 'On-premises edge',
                icon: 'transitGateway',
                x: 995,
                y: 172,
                purpose: 'Shows private hybrid connectivity from Huawei Cloud to external networks.'
            }, safeOverrides));
            connectors.push({
                id: 'direct-connect-to-enterprise-router',
                from: 'direct-connect-vpn',
                to: spec.wan ? 'enterprise-router' : 'vpc',
                label: 'Hybrid path'
            });
        }

        if (spec.monitoring) {
            nodes.push(createNode({
                id: 'monitoring-logs',
                title: 'Cloud Eye / CTS',
                subtitle: spec.acl ? 'Flow logs + metrics' : 'Metrics and events',
                layer: 'Operations',
                icon: 'monitoring',
                x: 995,
                y: 735,
                purpose: 'Captures platform metrics, logs, events, and operational signals for review.'
            }, safeOverrides));
            connectors.push({
                id: 'vpc-to-monitoring',
                from: 'vpc',
                to: 'monitoring-logs',
                label: 'Telemetry'
            });
        }

        return {
            width: 1200,
            height: 900,
            groups: [
                {
                    id: 'external-edge-boundary',
                    title: 'External edge',
                    subtitle: 'Users, partners, operators',
                    tone: 'external',
                    x: 40,
                    y: 92,
                    width: 205,
                    height: 790
                },
                {
                    id: 'huawei-cloud-region-boundary',
                    title: 'Huawei Cloud region',
                    subtitle: zoneCountLabel(spec.accessBlocks) + ' / ' + spec.ospfArea,
                    tone: 'region',
                    x: 265,
                    y: 92,
                    width: 955,
                    height: 790
                },
                {
                    id: 'edge-services-boundary',
                    title: 'Edge and ingress services',
                    subtitle: spec.hsrp ? 'WAF and DNS path' : 'Direct application path',
                    tone: 'edge',
                    x: 275,
                    y: 108,
                    width: 680,
                    height: 162
                },
                {
                    id: 'vpc-boundary',
                    title: 'Huawei Cloud VPC',
                    subtitle: spec.trunkVlans,
                    tone: 'vpc',
                    x: 275,
                    y: 340,
                    width: 680,
                    height: 520
                },
                {
                    id: 'public-subnet-boundary',
                    title: 'Public ingress tier',
                    subtitle: spec.nativeVlan,
                    tone: 'public',
                    x: 294,
                    y: 545,
                    width: 204,
                    height: 300
                },
                {
                    id: 'private-app-boundary',
                    title: 'Private application tier',
                    subtitle: spec.accessVlan,
                    tone: 'private',
                    x: 516,
                    y: 545,
                    width: 206,
                    height: 300
                },
                {
                    id: 'private-data-boundary',
                    title: 'Private data tier',
                    subtitle: spec.sviGateway,
                    tone: 'data',
                    x: 738,
                    y: 545,
                    width: 206,
                    height: 300
                },
                {
                    id: 'services-operations-boundary',
                    title: 'Ops / hybrid',
                    subtitle: spec.vpn || spec.wan ? 'Enterprise Router, Direct Connect, VPN' : 'Keys and monitoring',
                    tone: 'services',
                    x: 970,
                    y: 108,
                    width: 240,
                    height: 737
                }
            ],
            nodes: nodes,
            connectors: connectors
        };
    }

    /**
     * Builds technical inventory rows from a Huawei Cloud architecture stage model.
     *
     * @param {Object} architecture Architecture returned by buildArchitecture.
     * @returns {Array<Object>} Inventory rows.
     */
    function buildInventory(architecture) {
        return (architecture.nodes || []).map(function (node, index) {
            return {
                id: node.id,
                index: index + 1,
                component: node.title,
                placement: node.layer,
                purpose: node.purpose
            };
        });
    }

    /**
     * Builds prompt interpretation notes from a normalized Huawei Cloud spec.
     *
     * @param {Object} values Normalized or raw Huawei Cloud architecture spec.
     * @returns {Object} Prompt notes.
     */
    function buildPromptNotes(values) {
        const spec = buildBaseSpec(values);
        const prompt = normalizeText(spec.prompt);
        const keywords = [
            /vpc/.test(prompt) ? 'Huawei Cloud VPC' : '',
            /waf|dns|cdn/.test(prompt) ? 'WAF and DNS' : '',
            /elb|elastic load balance|load balancer|ingress/.test(prompt) ? 'Elastic Load Balance' : '',
            /subnet|cidr/.test(prompt) ? 'Subnet tiers' : '',
            /cce|cloud container engine|kubernetes/.test(prompt) ? 'CCE' : '',
            /ecs|elastic cloud server|instances?/.test(prompt) ? 'Elastic Cloud Server (ECS)' : '',
            /obs|rds|postgres|database|data services/.test(prompt) ? 'Data services' : '',
            /enterprise router|direct connect|\bvpn\b|on-prem/.test(prompt) ? 'Hybrid connectivity' : '',
            /dew|kms|csms|secret/.test(prompt) ? 'Secrets and keys' : '',
            /cloud eye|cts|flow logs/.test(prompt) ? 'Cloud Eye and logs' : ''
        ].filter(Boolean);
        const assumptions = [
            spec.presetLabel + ' preset applied.',
            zoneCountLabel(spec.accessBlocks) + ' with ' + cloudSizeLabel(spec.cloudSize).toLowerCase() + ' scale.',
            'VPC CIDR ' + spec.trunkVlans + ' with public, private app, and private data subnet tiers.',
            'Enterprise project ' + spec.ospfArea + ' is used as the workspace grouping label.'
        ];
        const model = [
            routingLabel(spec.routingMode),
            'Public subnet ' + spec.nativeVlan,
            'Private app subnet ' + spec.accessVlan,
            'Private data subnet ' + spec.sviGateway,
            spec.hsrp ? 'WAF and DNS included' : 'WAF and DNS omitted',
            spec.etherChannel ? 'Elastic Load Balance included' : 'Elastic Load Balance omitted',
            spec.firewall ? 'Security groups and network ACLs included' : 'Network security controls omitted',
            spec.nat ? 'NAT Gateway egress included' : 'NAT Gateway egress omitted',
            spec.vpn ? 'Direct Connect or VPN included' : 'Direct Connect or VPN omitted',
            spec.wan ? 'Enterprise Router included' : 'Enterprise Router omitted',
            spec.dhcpDns ? 'DEW KMS or CSMS included' : 'DEW key and secret services omitted',
            spec.monitoring ? 'Cloud Eye and logs included' : 'Cloud Eye and logs omitted'
        ];
        const pros = [];
        const cons = [];

        if (spec.accessBlocks >= 2) {
            pros.push('Multi-zone placement improves review coverage for availability and subnet spread.');
        }

        if (spec.firewall && spec.acl) {
            pros.push('Security groups, network ACLs, and flow logs are visible in the draft.');
        }

        if (spec.monitoring && spec.dhcpDns) {
            pros.push('Operational and secret-management surfaces are represented.');
        }

        if (!spec.firewall) {
            cons.push('Network security controls are omitted; confirm policy boundaries separately.');
        }

        if (!spec.monitoring) {
            cons.push('Cloud Eye and logging are omitted, so operational visibility needs review.');
        }

        if (spec.routingMode === 'hybrid' && !spec.vpn && !spec.wan) {
            cons.push('Hybrid pattern selected without Direct Connect, VPN, or Enterprise Router in the model.');
        }

        return {
            summary: spec.presetLabel + ' using ' + routingLabel(spec.routingMode) + ' across ' + zoneCountLabel(spec.accessBlocks) + '.',
            keywords: keywords.length > 0 ? keywords : ['Huawei Cloud architecture baseline'],
            assumptions: assumptions,
            model: model,
            pros: pros.length > 0 ? pros : ['Architecture has clear VPC, subnet, workload, data, and operations placement.'],
            cons: cons.length > 0 ? cons : ['Detailed Huawei Cloud account, IAM, quota, and service-plan choices are outside this draft.']
        };
    }

    /**
     * Builds a heuristic readiness score for the current Huawei Cloud model.
     *
     * @param {Object} values Normalized or raw Huawei Cloud architecture spec.
     * @returns {Object} Score payload with score, label, and summary.
     */
    function buildArchitectureScore(values) {
        const spec = buildBaseSpec(values);
        let score = 44;

        if (spec.accessBlocks >= 2) {
            score += 10;
        }

        if (spec.hsrp) {
            score += 8;
        }

        if (spec.etherChannel) {
            score += 8;
        }

        if (spec.firewall) {
            score += 9;
        }

        if (spec.acl) {
            score += 5;
        }

        if (spec.monitoring) {
            score += 8;
        }

        if (spec.dhcpDns) {
            score += 6;
        }

        if (spec.nat) {
            score += 4;
        }

        if (spec.vpn || spec.wan) {
            score += 5;
        }

        if (spec.wireless) {
            score += 3;
        }

        return {
            score: Math.min(100, score),
            label: score >= 82 ? 'Production Ready' : score >= 68 ? 'Delivery' : 'Needs work',
            summary: 'Heuristic architecture score based on zone spread, ingress, security controls, operations, and hybrid visibility.'
        };
    }

    function diagramFromSpec(spec) {
        return {
            preset_id: spec.preset,
            preset_label: spec.presetLabel,
            workload_scale: spec.cloudSize,
            availability_zones: spec.accessBlocks,
            subnet_tiers: spec.vlans,
            cce_platform: spec.wireless,
            network_security: spec.firewall,
            enterprise_router: spec.wan,
            cloud_eye_cts: spec.monitoring,
            dew_kms_csms: spec.dhcpDns,
            connectivity_pattern: spec.routingMode,
            waf_dns: spec.hsrp,
            elastic_load_balance: spec.etherChannel,
            flow_logs: spec.acl,
            nat_gateway: spec.nat,
            vpn_or_direct_connect: spec.vpn,
            vpc_cidr: spec.trunkVlans,
            public_subnet_cidr: spec.nativeVlan,
            private_app_subnet_cidr: spec.accessVlan,
            data_subnet_cidr: spec.sviGateway,
            enterprise_project: spec.ospfArea,
            edge_asn: spec.bgpAsn,
            dns_zone: spec.redundancyVip,
            prompt: spec.prompt
        };
    }

    /**
     * Builds a restorable Huawei Cloud JSON export payload.
     *
     * @param {Object} values Normalized or raw Huawei Cloud architecture spec.
     * @param {Object} layoutOverrides Node layout overrides keyed by node ID.
     * @param {Array<Object>} inventory Technical inventory rows.
     * @param {Object} notes Prompt notes.
     * @returns {Object} JSON export payload.
     */
    function buildExportPayload(values, layoutOverrides, inventory, notes) {
        const spec = buildBaseSpec(values);

        return {
            tool: toolId,
            version: toolVersion,
            exported_at: new Date().toISOString(),
            diagram: diagramFromSpec(spec),
            spec: spec,
            layout_overrides: cloneLayoutOverrides(layoutOverrides),
            layoutOverrides: cloneLayoutOverrides(layoutOverrides),
            inventory: Array.isArray(inventory) ? clone(inventory) : [],
            prompt_notes: notes && typeof notes === 'object' ? clone(notes) : buildPromptNotes(spec)
        };
    }

    function readDiagramValue(diagram, primaryKey, legacyKey) {
        if (Object.prototype.hasOwnProperty.call(diagram, primaryKey)) {
            return diagram[primaryKey];
        }

        return diagram[legacyKey];
    }

    function specFromDiagram(diagram) {
        return {
            preset: diagram.preset_id,
            presetLabel: diagram.preset_label,
            cloudSize: readDiagramValue(diagram, 'workload_scale', 'cloud_size'),
            accessBlocks: readDiagramValue(diagram, 'availability_zones', 'access_blocks'),
            vlans: readDiagramValue(diagram, 'subnet_tiers', 'vlans'),
            wireless: readDiagramValue(diagram, 'cce_platform', 'wireless'),
            firewall: readDiagramValue(diagram, 'network_security', 'firewall'),
            wan: readDiagramValue(diagram, 'enterprise_router', 'transit_gateway'),
            monitoring: readDiagramValue(diagram, 'cloud_eye_cts', 'monitoring'),
            dhcpDns: readDiagramValue(diagram, 'dew_kms_csms', 'dhcp_dns'),
            routingMode: readDiagramValue(diagram, 'connectivity_pattern', 'routing_mode'),
            hsrp: readDiagramValue(diagram, 'waf_dns', 'hsrp'),
            etherChannel: readDiagramValue(diagram, 'elastic_load_balance', 'load_balancer'),
            acl: readDiagramValue(diagram, 'flow_logs', 'acl'),
            nat: readDiagramValue(diagram, 'nat_gateway', 'nat'),
            vpn: readDiagramValue(diagram, 'vpn_or_direct_connect', 'vpn'),
            trunkVlans: readDiagramValue(diagram, 'vpc_cidr', 'trunk_vlans'),
            nativeVlan: readDiagramValue(diagram, 'public_subnet_cidr', 'native_vlan'),
            accessVlan: readDiagramValue(diagram, 'private_app_subnet_cidr', 'access_vlan'),
            sviGateway: readDiagramValue(diagram, 'data_subnet_cidr', 'svi_gateway'),
            ospfArea: readDiagramValue(diagram, 'enterprise_project', 'ospf_area'),
            bgpAsn: readDiagramValue(diagram, 'edge_asn', 'bgp_asn'),
            redundancyVip: readDiagramValue(diagram, 'dns_zone', 'redundancy_vip'),
            prompt: diagram.prompt
        };
    }

    function validateImportedSpec(rawSpec) {
        const preset = getPreset(rawSpec.preset);
        const merged = Object.assign({}, preset.defaults, rawSpec);
        const accessBlocks = Number(merged.accessBlocks);
        const cloudSize = normalizeText(merged.cloudSize);
        const routingMode = normalizeText(merged.routingMode);

        if (!Number.isInteger(accessBlocks) || !allowedAccessBlocks.includes(accessBlocks)) {
            return {
                error: 'The imported JSON contains an invalid availability zone count.'
            };
        }

        if (!allowedCloudSizes.includes(cloudSize)) {
            return {
                error: 'The imported JSON contains an invalid workload scale.'
            };
        }

        if (!allowedRoutingModes.includes(routingMode)) {
            return {
                error: 'The imported JSON contains an invalid connectivity pattern.'
            };
        }

        if (!booleanKeys.every(function (key) {
            return validateBoolean(merged[key]);
        })) {
            return {
                error: 'The imported JSON contains invalid Huawei Cloud service toggle values.'
            };
        }

        return {
            spec: buildBaseSpec(Object.assign({}, merged, {
                accessBlocks: accessBlocks,
                cloudSize: cloudSize,
                routingMode: routingMode
            }))
        };
    }

    /**
     * Validates and normalizes an imported Huawei Cloud workspace payload.
     *
     * @param {Object} payload Parsed JSON payload.
     * @returns {Object} Restored state or error.
     */
    function buildImportedPayloadState(payload) {
        if (!payload || typeof payload !== 'object' || (payload.tool !== toolId && !legacyToolIds.includes(payload.tool))) {
            return {
                error: 'Invalid Huawei Cloud architecture JSON.'
            };
        }

        if (payload.version !== toolVersion) {
            const isLegacyV1 = payload.version === 1 && payload.schemaVersion === toolVersion;

            if (!isLegacyV1) {
                return {
                    error: 'The imported JSON uses an unsupported workspace version.'
                };
            }
        }

        const rawSpec = payload.diagram && typeof payload.diagram === 'object'
            ? specFromDiagram(payload.diagram)
            : payload.spec || {};
        const validated = validateImportedSpec(rawSpec);

        if (validated.error) {
            return validated;
        }

        return {
            spec: validated.spec,
            layoutOverrides: cloneLayoutOverrides(payload.layout_overrides || payload.layoutOverrides),
            notes: payload.prompt_notes || payload.promptNotes || {}
        };
    }

    return {
        toolId: toolId,
        toolVersion: toolVersion,
        legacyToolIds: legacyToolIds,
        presetCatalog: presetCatalog,
        allowedCloudSizes: allowedCloudSizes,
        allowedAccessBlocks: allowedAccessBlocks,
        allowedRoutingModes: allowedRoutingModes,
        normalizeText: normalizeText,
        getPreset: getPreset,
        routingLabel: routingLabel,
        cloudSizeLabel: cloudSizeLabel,
        zoneCountLabel: zoneCountLabel,
        normalizeVlans: normalizeVlans,
        inferFromPrompt: inferFromPrompt,
        cloneLayoutOverrides: cloneLayoutOverrides,
        buildArchitecture: buildArchitecture,
        buildInventory: buildInventory,
        buildPromptNotes: buildPromptNotes,
        buildArchitectureScore: buildArchitectureScore,
        buildExportPayload: buildExportPayload,
        buildImportedPayloadState: buildImportedPayloadState
    };
}());

if (typeof globalThis !== 'undefined') {
    globalThis.ArchitectureVpcHuaweiModelCore = ArchitectureVpcHuaweiModelCore;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchitectureVpcHuaweiModelCore;
}
