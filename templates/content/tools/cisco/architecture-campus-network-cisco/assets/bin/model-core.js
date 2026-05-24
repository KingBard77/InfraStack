const ArchitectureCampusNetworkCiscoModelCore = (function () {
    const toolId = 'architecture-campus-network-cisco';
    const toolVersion = '1.0.0';
    const legacyToolIds = ['cisco-campus-network-topology'];
    const allowedCampusSizes = ['small', 'medium', 'large'];
    const allowedAccessBlocks = [1, 2, 3, 4, 5, 6];
    const allowedRoutingModes = ['static', 'ospf', 'eigrp', 'bgp'];
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
            id: 'enterprise-campus',
            label: 'Enterprise Campus',
            description: 'Redundant core, dual distribution, access blocks, OSPF, HSRP, services, wireless, and edge security.',
            defaults: {
                campusSize: 'medium',
                accessBlocks: 3,
                vlans: ['VLAN 10 Staff', 'VLAN 20 Voice', 'VLAN 30 Guest', 'VLAN 40 Servers'],
                wireless: true,
                firewall: true,
                wan: true,
                monitoring: true,
                dhcpDns: true,
                routingMode: 'ospf',
                hsrp: true,
                etherChannel: true,
                acl: true,
                nat: true,
                vpn: false,
                trunkVlans: '10,20,30,40',
                nativeVlan: '999',
                accessVlan: '10',
                sviGateway: '10.10.10.1',
                ospfArea: '0',
                bgpAsn: '65010',
                redundancyVip: '10.10.10.254'
            }
        },
        {
            id: 'branch-campus',
            label: 'Branch Campus',
            description: 'Compact campus with two access blocks, static routing, WAN edge, firewall, DHCP, DNS, and EtherChannel trunks.',
            defaults: {
                campusSize: 'small',
                accessBlocks: 2,
                vlans: ['VLAN 10 Users', 'VLAN 20 Voice', 'VLAN 30 Guest'],
                wireless: false,
                firewall: true,
                wan: true,
                monitoring: false,
                dhcpDns: true,
                routingMode: 'static',
                hsrp: false,
                etherChannel: true,
                acl: true,
                nat: true,
                vpn: true,
                trunkVlans: '10,20,30',
                nativeVlan: '999',
                accessVlan: '10',
                sviGateway: '10.10.10.1',
                ospfArea: '0',
                bgpAsn: '65020',
                redundancyVip: '10.10.10.254'
            }
        },
        {
            id: 'wireless-campus',
            label: 'Wireless Campus',
            description: 'Campus switching with wireless controller, access points, guest VLANs, monitoring, and OSPF routing.',
            defaults: {
                campusSize: 'medium',
                accessBlocks: 4,
                vlans: ['VLAN 10 Staff', 'VLAN 20 Voice', 'VLAN 30 Guest', 'VLAN 50 Wireless'],
                wireless: true,
                firewall: true,
                wan: true,
                monitoring: true,
                dhcpDns: true,
                routingMode: 'ospf',
                hsrp: true,
                etherChannel: true,
                acl: true,
                nat: true,
                vpn: false,
                trunkVlans: '10,20,30,50',
                nativeVlan: '999',
                accessVlan: '50',
                sviGateway: '10.50.0.1',
                ospfArea: '0',
                bgpAsn: '65030',
                redundancyVip: '10.50.0.254'
            }
        },
        {
            id: 'data-center-edge',
            label: 'Data Center Edge',
            description: 'Larger campus core with server VLANs, WAN edge, firewall, monitoring, BGP handoff, and gateway redundancy.',
            defaults: {
                campusSize: 'large',
                accessBlocks: 5,
                vlans: ['VLAN 10 Staff', 'VLAN 20 Voice', 'VLAN 40 Servers', 'VLAN 60 Management'],
                wireless: false,
                firewall: true,
                wan: true,
                monitoring: true,
                dhcpDns: true,
                routingMode: 'bgp',
                hsrp: true,
                etherChannel: true,
                acl: true,
                nat: true,
                vpn: true,
                trunkVlans: '10,20,40,60',
                nativeVlan: '999',
                accessVlan: '10',
                sviGateway: '10.40.0.1',
                ospfArea: '0',
                bgpAsn: '65040',
                redundancyVip: '10.40.0.254'
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

    function toTitle(value) {
        return String(value || '')
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
    }

    function getPreset(presetId) {
        return presetCatalog.find(function (preset) {
            return preset.id === presetId;
        }) || presetCatalog[0];
    }

    function routingLabel(value) {
        return {
            static: 'Static',
            ospf: 'OSPF',
            eigrp: 'EIGRP',
            bgp: 'BGP'
        }[value] || 'OSPF';
    }

    function campusSizeLabel(value) {
        return {
            small: 'Small campus',
            medium: 'Medium campus',
            large: 'Large campus'
        }[value] || 'Medium campus';
    }

    function routingDetail(spec) {
        if (spec.routingMode === 'bgp') {
            return 'BGP AS ' + spec.bgpAsn;
        }

        if (spec.routingMode === 'ospf') {
            return 'OSPF area ' + spec.ospfArea;
        }

        return routingLabel(spec.routingMode) + ' routing';
    }

    function normalizeCampusSize(value, fallback) {
        const normalized = normalizeText(value);

        if (allowedCampusSizes.includes(normalized)) {
            return normalized;
        }

        return allowedCampusSizes.includes(fallback) ? fallback : 'medium';
    }

    function normalizeRoutingMode(value, fallback) {
        const normalized = normalizeText(value);

        if (allowedRoutingModes.includes(normalized)) {
            return normalized;
        }

        return allowedRoutingModes.includes(fallback) ? fallback : 'ospf';
    }

    function normalizeAccessBlocks(value, fallback) {
        const parsed = Number(value);

        if (Number.isInteger(parsed) && allowedAccessBlocks.includes(parsed)) {
            return parsed;
        }

        if (Number.isInteger(fallback) && allowedAccessBlocks.includes(fallback)) {
            return fallback;
        }

        return 3;
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

    function normalizeVlans(value, fallback) {
        const source = Array.isArray(value) ? value : String(value || '').split(/\n|,/);
        const vlans = source
            .map(function (item) {
                return String(item || '').trim();
            })
            .filter(Boolean)
            .map(function (item) {
                if (/^vlan\s+\d+/i.test(item)) {
                    return toTitle(item);
                }

                if (/^\d+\s+/.test(item)) {
                    return 'VLAN ' + item.trim();
                }

                return item;
            });

        if (vlans.length > 0) {
            return vlans.slice(0, 8);
        }

        if (Array.isArray(fallback) && fallback.length > 0) {
            return fallback.slice(0, 8);
        }

        return ['VLAN 10 Staff', 'VLAN 20 Voice', 'VLAN 30 Guest'];
    }

    function normalizeVlanList(value, fallback) {
        const rawValue = String(value || '').trim();
        const rawFallback = String(fallback || '').trim();
        const source = rawValue || rawFallback;
        const values = source.match(/\d{1,4}/g) || [];
        const uniqueValues = [];

        values.forEach(function (item) {
            const parsed = Number(item);

            if (parsed >= 1 && parsed <= 4094 && !uniqueValues.includes(String(parsed))) {
                uniqueValues.push(String(parsed));
            }
        });

        return uniqueValues.length > 0 ? uniqueValues.join(',') : rawFallback || '10,20,30';
    }

    function normalizeVlanId(value, fallback) {
        const match = String(value || '').match(/\d{1,4}/);
        const parsed = match ? Number(match[0]) : NaN;

        if (parsed >= 1 && parsed <= 4094) {
            return String(parsed);
        }

        return String(fallback || '10');
    }

    function normalizeIpv4(value, fallback) {
        const match = String(value || '').match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);

        if (!match) {
            return String(fallback || '').trim();
        }

        const octets = match[0].split('.').map(Number);

        if (octets.every(function (octet) {
            return Number.isInteger(octet) && octet >= 0 && octet <= 255;
        })) {
            return match[0];
        }

        return String(fallback || '').trim();
    }

    function normalizeArea(value, fallback) {
        const match = String(value || '').match(/\d+(?:\.\d+\.\d+\.\d+)?/);

        return match ? match[0] : String(fallback || '0');
    }

    function normalizeAsn(value, fallback) {
        const match = String(value || '').match(/\d{1,10}/);

        return match ? match[0] : String(fallback || '65010');
    }

    function wordNumberToInteger(value) {
        return {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6
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

    function extractVlansFromPrompt(prompt) {
        const matches = prompt.match(/vlan\s+\d+\s+[a-z0-9][a-z0-9 -]{1,30}/g) || [];

        return matches.map(function (match) {
            return toTitle(match);
        });
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

    function buildBaseSpec(values) {
        const preset = getPreset(values && values.preset);
        const defaults = preset.defaults;
        const source = values || {};

        return {
            preset: preset.id,
            presetLabel: source.presetLabel || preset.label,
            campusSize: normalizeCampusSize(source.campusSize, defaults.campusSize),
            accessBlocks: normalizeAccessBlocks(source.accessBlocks, defaults.accessBlocks),
            vlans: normalizeVlans(source.vlans, defaults.vlans),
            wireless: normalizeBoolean(source.wireless, defaults.wireless),
            firewall: normalizeBoolean(source.firewall, defaults.firewall),
            wan: normalizeBoolean(source.wan, defaults.wan),
            monitoring: normalizeBoolean(source.monitoring, defaults.monitoring),
            dhcpDns: normalizeBoolean(source.dhcpDns, defaults.dhcpDns),
            routingMode: normalizeRoutingMode(source.routingMode, defaults.routingMode),
            hsrp: normalizeBoolean(source.hsrp, defaults.hsrp),
            etherChannel: normalizeBoolean(source.etherChannel, defaults.etherChannel),
            acl: normalizeBoolean(source.acl, defaults.acl),
            nat: normalizeBoolean(source.nat, defaults.nat),
            vpn: normalizeBoolean(source.vpn, defaults.vpn),
            trunkVlans: normalizeVlanList(source.trunkVlans, defaults.trunkVlans),
            nativeVlan: normalizeVlanId(source.nativeVlan, defaults.nativeVlan),
            accessVlan: normalizeVlanId(source.accessVlan, defaults.accessVlan),
            sviGateway: normalizeIpv4(source.sviGateway, defaults.sviGateway),
            ospfArea: normalizeArea(source.ospfArea, defaults.ospfArea),
            bgpAsn: normalizeAsn(source.bgpAsn, defaults.bgpAsn),
            redundancyVip: normalizeIpv4(source.redundancyVip, defaults.redundancyVip),
            prompt: String(source.prompt || '')
        };
    }

    /**
     * Builds a normalized Cisco campus topology spec from controls and prompt text.
     *
     * @param {Object} values Raw control values and prompt text.
     * @returns {Object} Normalized Cisco campus topology spec.
     */
    function inferFromPrompt(values) {
        const spec = buildBaseSpec(values);
        const prompt = normalizeText(spec.prompt);
        const vlanMatches = extractVlansFromPrompt(prompt);
        const accessMatch = prompt.match(/\b([1-6])\s+(?:access\s+)?blocks?\b/) ||
            prompt.match(/\b(one|two|three|four|five|six)\s+(?:access\s+)?blocks?\b/);

        if (/\blarge\b|headquarters|hq|multi-building|enterprise/.test(prompt)) {
            spec.campusSize = 'large';
        } else if (/\bsmall\b|branch|single-building|small office/.test(prompt)) {
            spec.campusSize = 'small';
        } else if (/\bmedium\b|regional/.test(prompt)) {
            spec.campusSize = 'medium';
        }

        if (accessMatch) {
            spec.accessBlocks = normalizeAccessBlocks(
                Number(accessMatch[1]) || wordNumberToInteger(accessMatch[1]),
                spec.accessBlocks
            );
        }

        spec.wireless = resolveBooleanFromPrompt(
            prompt,
            spec.wireless,
            [/wireless/, /\bwlc\b/, /\bwi-?fi\b/, /access points?/],
            [/no wireless/, /without wireless/]
        );
        spec.firewall = resolveBooleanFromPrompt(
            prompt,
            spec.firewall,
            [/firewall/, /\basa\b/, /\bftd\b/, /secure firewall/],
            [/no firewall/, /without firewall/]
        );
        spec.wan = resolveBooleanFromPrompt(
            prompt,
            spec.wan,
            [/\bwan\b/, /internet edge/, /\bisp\b/, /edge router/],
            [/no wan/, /without wan/]
        );
        spec.monitoring = resolveBooleanFromPrompt(
            prompt,
            spec.monitoring,
            [/monitoring/, /\bsnmp\b/, /syslog/, /telemetry/, /netflow/],
            [/no monitoring/, /without monitoring/]
        );
        spec.dhcpDns = resolveBooleanFromPrompt(
            prompt,
            spec.dhcpDns,
            [/\bdhcp\b/, /\bdns\b/, /ip helper/],
            [/no dhcp/, /without dhcp/, /without dns/]
        );
        spec.hsrp = resolveBooleanFromPrompt(
            prompt,
            spec.hsrp,
            [/\bhsrp\b/, /\bvrrp\b/, /gateway redundancy/],
            [/no hsrp/, /without hsrp/, /no gateway redundancy/]
        );
        spec.etherChannel = resolveBooleanFromPrompt(
            prompt,
            spec.etherChannel,
            [/etherchannel/, /ether channel/, /port-channel/, /\blacp\b/],
            [/no etherchannel/, /without etherchannel/, /no port-channel/]
        );
        spec.acl = resolveBooleanFromPrompt(
            prompt,
            spec.acl,
            [/\bacl\b/, /access control list/, /filtering policy/],
            [/no acl/, /without acl/, /without access control/]
        );
        spec.nat = resolveBooleanFromPrompt(
            prompt,
            spec.nat,
            [/\bnat\b/, /overload/, /pat\b/, /address translation/],
            [/no nat/, /without nat/]
        );
        spec.vpn = resolveBooleanFromPrompt(
            prompt,
            spec.vpn,
            [/\bvpn\b/, /site-to-site/, /ipsec/, /tunnel/],
            [/no vpn/, /without vpn/, /no tunnel/]
        );

        if (/\beigrp\b/.test(prompt)) {
            spec.routingMode = 'eigrp';
        } else if (/\bospf\b/.test(prompt)) {
            spec.routingMode = 'ospf';
        } else if (/\bbgp\b/.test(prompt)) {
            spec.routingMode = 'bgp';
        } else if (/static routing|static routes?/.test(prompt)) {
            spec.routingMode = 'static';
        }

        if (vlanMatches.length > 0) {
            spec.vlans = normalizeVlans(vlanMatches, spec.vlans);
        }

        spec.trunkVlans = normalizeVlanList(extractFirst(prompt, [
            /trunk(?:\s+allowed)?\s+vlans?\s+([0-9,\s-]+)/,
            /allowed\s+vlans?\s+([0-9,\s-]+)/
        ]), spec.trunkVlans);
        spec.nativeVlan = normalizeVlanId(extractFirst(prompt, [
            /native\s+vlan\s+(\d{1,4})/
        ]), spec.nativeVlan);
        spec.accessVlan = normalizeVlanId(extractFirst(prompt, [
            /access\s+vlan\s+(\d{1,4})/,
            /switchport\s+access\s+vlan\s+(\d{1,4})/
        ]), spec.accessVlan);
        spec.sviGateway = normalizeIpv4(extractFirst(prompt, [
            /svi\s+(?:gateway\s+)?((?:\d{1,3}\.){3}\d{1,3})/,
            /gateway\s+((?:\d{1,3}\.){3}\d{1,3})/
        ]), spec.sviGateway);
        spec.ospfArea = normalizeArea(extractFirst(prompt, [
            /ospf\s+area\s+([0-9.]+)/,
            /area\s+([0-9.]+)/
        ]), spec.ospfArea);
        spec.bgpAsn = normalizeAsn(extractFirst(prompt, [
            /bgp\s+(?:asn|as)\s+(\d{1,10})/,
            /\bas\s+(\d{1,10})\s+(?:peer|bgp)/
        ]), spec.bgpAsn);
        spec.redundancyVip = normalizeIpv4(extractFirst(prompt, [
            /(?:hsrp|vrrp)\s+(?:vip|virtual ip|virtual address)\s+((?:\d{1,3}\.){3}\d{1,3})/,
            /vip\s+((?:\d{1,3}\.){3}\d{1,3})/
        ]), spec.redundancyVip);

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
            width: 168,
            height: 78,
            meta: ''
        }, config), layoutOverrides);
    }

    function buildAccessNodes(spec, layoutOverrides) {
        const nodes = [];
        const baseX = 335;
        const gap = 245;
        const rowCapacity = 3;
        const rowY = spec.accessBlocks <= 3 ? 830 : 820;
        const vlanText = spec.vlans.slice(0, 3).join(', ');

        for (let index = 0; index < spec.accessBlocks; index += 1) {
            const rowIndex = index % rowCapacity;
            const rowOffset = Math.floor(index / rowCapacity) * 120;

            nodes.push(createNode({
                id: 'access-' + (index + 1),
                title: 'Access Block ' + (index + 1),
                subtitle: vlanText,
                layer: 'Access',
                icon: 'accessSwitch',
                x: baseX + (rowIndex * gap),
                y: rowY + rowOffset,
                purpose: 'Connects endpoint ports, phones, access points, and VLAN trunks to distribution.'
            }, layoutOverrides));
        }

        return nodes;
    }

    /**
     * Builds stage nodes and connectors for the normalized Cisco campus spec.
     *
     * @param {Object} values Normalized or raw Cisco campus topology spec.
     * @param {Object} layoutOverrides Optional node layout overrides keyed by node ID.
     * @returns {Object} Topology stage model with width, height, nodes, and connectors.
     */
    function buildTopology(values, layoutOverrides) {
        const spec = buildBaseSpec(values);
        const safeOverrides = cloneLayoutOverrides(layoutOverrides);
        const nodes = [
            createNode({
                id: 'users',
                title: 'Users',
                subtitle: campusSizeLabel(spec.campusSize),
                layer: 'Client edge',
                icon: 'users',
                x: 100,
                y: 195,
                width: 142,
                purpose: 'Represents wired and wireless campus users entering the network.'
            }, safeOverrides),
            createNode({
                id: 'core',
                title: 'Core Switch Pair',
                subtitle: routingDetail(spec),
                layer: 'Core',
                icon: 'coreSwitch',
                x: 535,
                y: 430,
                width: 190,
                height: 82,
                purpose: 'Provides resilient Layer 3 campus routing and aggregation.'
            }, safeOverrides),
            createNode({
                id: 'distribution-1',
                title: 'Distribution A',
                subtitle: spec.hsrp ? 'VIP ' + spec.redundancyVip : 'SVI ' + spec.sviGateway,
                layer: 'Distribution',
                icon: 'distributionSwitch',
                x: 385,
                y: 620,
                purpose: 'Aggregates access switches and policy boundaries for the left side of the campus.'
            }, safeOverrides),
            createNode({
                id: 'distribution-2',
                title: 'Distribution B',
                subtitle: spec.hsrp ? 'HSRP/VRRP peer' : 'SVI gateway',
                layer: 'Distribution',
                icon: 'distributionSwitch',
                x: 720,
                y: 620,
                purpose: 'Aggregates access switches and policy boundaries for the right side of the campus.'
            }, safeOverrides)
        ];
        const connectors = [
            {
                id: 'core-to-distribution-1',
                from: 'core',
                to: 'distribution-1',
                label: routingLabel(spec.routingMode)
            },
            {
                id: 'core-to-distribution-2',
                from: 'core',
                to: 'distribution-2',
                label: routingLabel(spec.routingMode)
            },
            {
                id: 'users-to-core',
                from: 'users',
                to: spec.wan ? 'wan-edge' : spec.firewall ? 'firewall' : 'core',
                label: 'Campus access'
            }
        ];

        if (spec.wan) {
            nodes.push(createNode({
                id: 'wan-edge',
                title: 'WAN Edge Router',
                subtitle: 'ISP/MPLS handoff',
                layer: 'WAN edge',
                icon: 'router',
                x: 320,
                y: 195,
                purpose: 'Shows external routing handoff for internet, MPLS, or SD-WAN adjacency.'
            }, safeOverrides));
            connectors.push({
                id: 'wan-to-firewall',
                from: 'wan-edge',
                to: spec.firewall ? 'firewall' : 'core',
                label: spec.routingMode === 'bgp' ? 'BGP edge' : 'WAN handoff'
            });
        }

        if (spec.firewall) {
            nodes.push(createNode({
                id: 'firewall',
                title: 'Cisco Secure Firewall',
                subtitle: [spec.acl ? 'ACL' : '', spec.nat ? 'NAT' : 'Policy edge'].filter(Boolean).join(' / '),
                layer: 'Security edge',
                icon: 'firewall',
                x: 540,
                y: 195,
                purpose: 'Represents perimeter filtering before traffic reaches the campus core.'
            }, safeOverrides));
            connectors.push({
                id: 'firewall-to-core',
                from: 'firewall',
                to: 'core',
                label: 'Filtered transit'
            });
        }

        buildAccessNodes(spec, safeOverrides).forEach(function (node, index) {
            nodes.push(node);
            connectors.push({
                id: 'distribution-to-' + node.id,
                from: index % 2 === 0 ? 'distribution-1' : 'distribution-2',
                to: node.id,
                label: spec.etherChannel ? 'Po' + (index + 1) + ' trunk VLANs ' + spec.trunkVlans : '802.1Q native ' + spec.nativeVlan
            });
        });

        if (spec.vlans.some(function (vlan) {
            return /server|data|storage/i.test(vlan);
        })) {
            nodes.push(createNode({
                id: 'server-network',
                title: 'Server Network',
                subtitle: spec.vlans.find(function (vlan) {
                    return /server|data|storage/i.test(vlan);
                }) || 'Server VLAN',
                layer: 'Server network',
                icon: 'services',
                x: 1080,
                y: 620,
                purpose: 'Represents campus server or shared services VLAN placement.'
            }, safeOverrides));
            connectors.push({
                id: 'core-to-server-network',
                from: 'core',
                to: 'server-network',
                label: 'SVI gateway'
            });
        }

        if (spec.wireless) {
            nodes.push(createNode({
                id: 'wireless-controller',
                title: 'Wireless Controller',
                subtitle: 'WLC and AP control',
                layer: 'Wireless',
                icon: 'wirelessController',
                x: 105,
                y: 620,
                purpose: 'Centralizes wireless control and guest access segmentation.'
            }, safeOverrides));
            nodes.push(createNode({
                id: 'access-points',
                title: 'Access Points',
                subtitle: 'Campus WLAN',
                layer: 'Access',
                icon: 'accessPoint',
                x: 105,
                y: 830,
                width: 142,
                purpose: 'Represents APs connected into the access layer.'
            }, safeOverrides));
            connectors.push({
                id: 'core-to-wireless-controller',
                from: 'core',
                to: 'wireless-controller',
                label: 'CAPWAP/control'
            });
            connectors.push({
                id: 'wireless-controller-to-access-points',
                from: 'wireless-controller',
                to: 'access-points',
                label: 'WLAN'
            });
        }

        if (spec.dhcpDns) {
            nodes.push(createNode({
                id: 'campus-services',
                title: 'DHCP / DNS Services',
                subtitle: 'IP helper targets',
                layer: 'Services',
                icon: 'services',
                x: 1080,
                y: 760,
                purpose: 'Provides endpoint addressing and name resolution for campus VLANs.'
            }, safeOverrides));
            connectors.push({
                id: 'core-to-services',
                from: 'core',
                to: 'campus-services',
                label: 'Services'
            });
        }

        if (spec.vpn) {
            nodes.push(createNode({
                id: 'vpn-tunnel',
                title: 'VPN Tunnel',
                subtitle: 'IPsec site-to-site',
                layer: 'Remote access',
                icon: 'router',
                x: 105,
                y: 400,
                purpose: 'Shows remote or branch connectivity entering through the campus edge.'
            }, safeOverrides));
            connectors.push({
                id: 'vpn-to-edge',
                from: 'vpn-tunnel',
                to: spec.wan ? 'wan-edge' : spec.firewall ? 'firewall' : 'core',
                label: 'Encrypted tunnel'
            });
        }

        if (spec.monitoring) {
            nodes.push(createNode({
                id: 'monitoring',
                title: 'Monitoring / Syslog',
                subtitle: 'SNMP, NetFlow, logs',
                layer: 'Operations',
                icon: 'monitoring',
                x: 1080,
                y: 850,
                purpose: 'Captures operational telemetry for switches, routers, firewall, and wireless.'
            }, safeOverrides));
            connectors.push({
                id: 'core-to-monitoring',
                from: 'core',
                to: 'monitoring',
                label: 'Telemetry'
            });
        }

        const accessRowCount = spec.accessBlocks <= 3 ? 1 : Math.ceil(spec.accessBlocks / 3);
        const accessLayerX = 310;
        const accessLayerWidth = 710;
        const accessLayerHeight = accessRowCount > 1 ? 300 : 190;
        const canvasWidth = 1320;
        const canvasHeight = accessRowCount > 1 ? 1140 : 1020;

        return {
            width: canvasWidth,
            height: canvasHeight,
            groups: [
                {
                    id: 'campus-site-boundary',
                    title: 'Campus site',
                    subtitle: campusSizeLabel(spec.campusSize),
                    tone: 'site',
                    x: 34,
                    y: 92,
                    width: canvasWidth - 68,
                    height: canvasHeight - 122
                },
                {
                    id: 'edge-security-boundary',
                    title: 'WAN and security edge',
                    subtitle: spec.firewall ? 'Firewall policy boundary' : 'External routing boundary',
                    tone: 'edge',
                    x: 290,
                    y: 124,
                    width: 560,
                    height: 155
                },
                {
                    id: 'wireless-remote-boundary',
                    title: 'Wireless / VPN',
                    subtitle: spec.wireless || spec.vpn ? 'WLC, AP, remote edge' : 'Optional access',
                    tone: 'wireless',
                    x: 52,
                    y: 330,
                    width: 235,
                    height: canvasHeight - 360
                },
                {
                    id: 'core-layer-boundary',
                    title: 'Core layer',
                    subtitle: routingDetail(spec),
                    tone: 'core',
                    x: 485,
                    y: 350,
                    width: 330,
                    height: 210
                },
                {
                    id: 'distribution-layer-boundary',
                    title: 'Distribution layer',
                    subtitle: spec.hsrp ? 'Gateway redundancy enabled' : 'SVI gateway boundary',
                    tone: 'distribution',
                    x: 320,
                    y: 565,
                    width: 650,
                    height: 215
                },
                {
                    id: 'access-layer-boundary',
                    title: 'Access layer',
                    subtitle: spec.accessBlocks + ' access block' + (spec.accessBlocks === 1 ? '' : 's'),
                    tone: 'access',
                    x: accessLayerX,
                    y: 800,
                    width: accessLayerWidth,
                    height: accessLayerHeight
                },
                {
                    id: 'services-operations-boundary',
                    title: 'Services / ops',
                    subtitle: spec.dhcpDns || spec.monitoring ? 'DHCP, DNS, telemetry' : 'Optional services',
                    tone: 'services',
                    x: 1060,
                    y: 565,
                    width: 200,
                    height: canvasHeight - 595
                }
            ],
            nodes: nodes,
            connectors: connectors
        };
    }

    /**
     * Builds technical inventory rows from a Cisco topology stage model.
     *
     * @param {Object} topology Topology returned by buildTopology.
     * @returns {Array<Object>} Inventory rows.
     */
    function buildInventory(topology) {
        return (topology.nodes || []).map(function (node, index) {
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
     * Builds prompt interpretation notes from a normalized Cisco campus spec.
     *
     * @param {Object} values Normalized or raw Cisco campus topology spec.
     * @returns {Object} Prompt notes.
     */
    function buildPromptNotes(values) {
        const spec = buildBaseSpec(values);
        const prompt = normalizeText(spec.prompt);
        const keywords = [
            /\bcore\b/.test(prompt) ? 'Core switch' : '',
            /distribution/.test(prompt) ? 'Distribution switch' : '',
            /access/.test(prompt) ? 'Access switch' : '',
            /\bvlan\b/.test(prompt) ? 'VLAN' : '',
            /trunk|802\.1q|port-channel|etherchannel|lacp/.test(prompt) ? 'Trunk / EtherChannel' : '',
            /svi|gateway/.test(prompt) ? 'SVI gateway' : '',
            /ospf/.test(prompt) ? 'OSPF area ' + spec.ospfArea : '',
            /bgp/.test(prompt) ? 'BGP AS ' + spec.bgpAsn : '',
            /hsrp|vrrp|vip/.test(prompt) ? 'Gateway VIP' : '',
            /wireless|\bwlc\b|access points?/.test(prompt) ? 'WLC / AP' : '',
            /firewall|\bacl\b|nat/.test(prompt) ? 'Security edge' : '',
            /\bvpn\b|ipsec|tunnel/.test(prompt) ? 'VPN tunnel' : '',
            /monitoring|syslog|snmp|netflow/.test(prompt) ? 'Monitoring / NMS' : ''
        ].filter(Boolean);
        const assumptions = [
            spec.presetLabel + ' preset applied.',
            campusSizeLabel(spec.campusSize) + ' with ' + spec.accessBlocks + ' access block' + (spec.accessBlocks === 1 ? '.' : 's.'),
            'VLANs shown as logical access-layer labels, not switchport configuration.',
            'Trunk allowed VLANs ' + spec.trunkVlans + ', native VLAN ' + spec.nativeVlan + ', and access VLAN ' + spec.accessVlan + ' are planning annotations.'
        ];
        const model = [
            routingDetail(spec),
            'SVI gateway ' + spec.sviGateway,
            spec.hsrp ? 'Gateway redundancy enabled' : 'Gateway redundancy not shown',
            spec.hsrp ? 'HSRP/VRRP VIP ' + spec.redundancyVip : 'No gateway VIP shown',
            spec.etherChannel ? 'EtherChannel trunks enabled' : 'Standard 802.1Q trunks',
            spec.wireless ? 'Wireless controller included' : 'Wireless controller omitted',
            spec.firewall ? 'Cisco Secure Firewall included' : 'Firewall omitted',
            spec.acl ? 'ACL policy boundary included' : 'ACL policy boundary omitted',
            spec.nat ? 'NAT represented at the edge' : 'NAT not represented',
            spec.vpn ? 'VPN tunnel included' : 'VPN tunnel omitted',
            spec.wan ? 'WAN edge included' : 'WAN edge omitted',
            spec.monitoring ? 'Monitoring and syslog included' : 'Monitoring omitted',
            spec.dhcpDns ? 'DHCP and DNS services included' : 'DHCP and DNS services omitted'
        ];
        const pros = [];
        const cons = [];

        if (spec.hsrp && spec.etherChannel) {
            pros.push('Redundant gateway and bundled uplinks improve campus availability.');
        }

        if (spec.monitoring) {
            pros.push('Telemetry services make the topology easier to operate after handoff.');
        }

        if (spec.acl && spec.nat) {
            pros.push('Security edge annotations call out ACL and NAT review points.');
        }

        if (!spec.firewall) {
            cons.push('No perimeter firewall is shown; confirm the security boundary elsewhere.');
        }

        if (!spec.monitoring) {
            cons.push('Monitoring is omitted, so operational visibility needs separate planning.');
        }

        if (spec.accessBlocks > 4) {
            cons.push('Large access-layer fanout may need additional distribution capacity review.');
        }

        return {
            summary: spec.presetLabel + ' using ' + routingLabel(spec.routingMode) + ' with ' + spec.accessBlocks + ' access block' + (spec.accessBlocks === 1 ? '' : 's') + '.',
            keywords: keywords.length > 0 ? keywords : ['Cisco campus baseline'],
            assumptions: assumptions,
            model: model,
            pros: pros.length > 0 ? pros : ['Topology has a clear core, distribution, and access separation.'],
            cons: cons.length > 0 ? cons : ['Detailed interface numbering, QoS, and ACL policy are outside this draft.']
        };
    }

    /**
     * Builds a heuristic readiness score for the current Cisco campus model.
     *
     * @param {Object} values Normalized or raw Cisco campus topology spec.
     * @returns {Object} Score payload with score, label, and summary.
     */
    function buildTopologyScore(values) {
        const spec = buildBaseSpec(values);
        let score = 42;

        if (spec.hsrp) {
            score += 12;
        }

        if (spec.etherChannel) {
            score += 10;
        }

        if (spec.firewall) {
            score += 10;
        }

        if (spec.monitoring) {
            score += 10;
        }

        if (spec.dhcpDns) {
            score += 6;
        }

        if (spec.acl) {
            score += 4;
        }

        if (spec.nat) {
            score += 3;
        }

        if (spec.vpn) {
            score += 3;
        }

        if (spec.wan) {
            score += 5;
        }

        if (spec.accessBlocks >= 2 && spec.accessBlocks <= 4) {
            score += 5;
        }

        return {
            score: Math.min(100, score),
            label: score >= 82 ? 'Production Ready' : score >= 68 ? 'Delivery' : 'Needs work',
            summary: 'Heuristic topology score based on redundancy, services, security edge, and observability.'
        };
    }

    function diagramFromSpec(spec) {
        return {
            preset_id: spec.preset,
            preset_label: spec.presetLabel,
            campus_size: spec.campusSize,
            access_blocks: spec.accessBlocks,
            vlans: spec.vlans,
            wireless: spec.wireless,
            firewall: spec.firewall,
            wan: spec.wan,
            monitoring: spec.monitoring,
            dhcp_dns: spec.dhcpDns,
            routing_mode: spec.routingMode,
            hsrp: spec.hsrp,
            ether_channel: spec.etherChannel,
            acl: spec.acl,
            nat: spec.nat,
            vpn: spec.vpn,
            trunk_vlans: spec.trunkVlans,
            native_vlan: spec.nativeVlan,
            access_vlan: spec.accessVlan,
            svi_gateway: spec.sviGateway,
            ospf_area: spec.ospfArea,
            bgp_asn: spec.bgpAsn,
            redundancy_vip: spec.redundancyVip,
            prompt: spec.prompt
        };
    }

    /**
     * Builds a restorable Cisco campus JSON export payload.
     *
     * @param {Object} values Normalized or raw Cisco campus topology spec.
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

    function specFromDiagram(diagram) {
        return {
            preset: diagram.preset_id,
            presetLabel: diagram.preset_label,
            campusSize: diagram.campus_size,
            accessBlocks: diagram.access_blocks,
            vlans: diagram.vlans,
            wireless: diagram.wireless,
            firewall: diagram.firewall,
            wan: diagram.wan,
            monitoring: diagram.monitoring,
            dhcpDns: diagram.dhcp_dns,
            routingMode: diagram.routing_mode,
            hsrp: diagram.hsrp,
            etherChannel: diagram.ether_channel,
            acl: diagram.acl,
            nat: diagram.nat,
            vpn: diagram.vpn,
            trunkVlans: diagram.trunk_vlans,
            nativeVlan: diagram.native_vlan,
            accessVlan: diagram.access_vlan,
            sviGateway: diagram.svi_gateway,
            ospfArea: diagram.ospf_area,
            bgpAsn: diagram.bgp_asn,
            redundancyVip: diagram.redundancy_vip,
            prompt: diagram.prompt
        };
    }

    function validateImportedSpec(rawSpec) {
        const preset = getPreset(rawSpec.preset);
        const merged = Object.assign({}, preset.defaults, rawSpec);
        const accessBlocks = Number(merged.accessBlocks);
        const campusSize = normalizeText(merged.campusSize);
        const routingMode = normalizeText(merged.routingMode);

        if (!Number.isInteger(accessBlocks) || !allowedAccessBlocks.includes(accessBlocks)) {
            return {
                error: 'The imported JSON contains an invalid access block count.'
            };
        }

        if (!allowedCampusSizes.includes(campusSize)) {
            return {
                error: 'The imported JSON contains an invalid campus size.'
            };
        }

        if (!allowedRoutingModes.includes(routingMode)) {
            return {
                error: 'The imported JSON contains an invalid routing mode.'
            };
        }

        if (!booleanKeys.every(function (key) {
            return validateBoolean(merged[key]);
        })) {
            return {
                error: 'The imported JSON contains invalid Cisco service toggle values.'
            };
        }

        return {
            spec: buildBaseSpec(Object.assign({}, merged, {
                accessBlocks: accessBlocks,
                campusSize: campusSize,
                routingMode: routingMode
            }))
        };
    }

    /**
     * Validates and normalizes an imported Cisco campus workspace payload.
     *
     * @param {Object} payload Parsed JSON payload.
     * @returns {Object} Restored state or error.
     */
    function buildImportedPayloadState(payload) {
        if (!payload || typeof payload !== 'object' || (payload.tool !== toolId && !legacyToolIds.includes(payload.tool))) {
            return {
                error: 'Invalid Cisco campus topology JSON.'
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
        allowedCampusSizes: allowedCampusSizes,
        allowedAccessBlocks: allowedAccessBlocks,
        allowedRoutingModes: allowedRoutingModes,
        normalizeText: normalizeText,
        getPreset: getPreset,
        routingLabel: routingLabel,
        campusSizeLabel: campusSizeLabel,
        normalizeVlans: normalizeVlans,
        inferFromPrompt: inferFromPrompt,
        cloneLayoutOverrides: cloneLayoutOverrides,
        buildTopology: buildTopology,
        buildInventory: buildInventory,
        buildPromptNotes: buildPromptNotes,
        buildTopologyScore: buildTopologyScore,
        buildExportPayload: buildExportPayload,
        buildImportedPayloadState: buildImportedPayloadState
    };
}());

if (typeof globalThis !== 'undefined') {
    globalThis.ArchitectureCampusNetworkCiscoModelCore = ArchitectureCampusNetworkCiscoModelCore;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchitectureCampusNetworkCiscoModelCore;
}
