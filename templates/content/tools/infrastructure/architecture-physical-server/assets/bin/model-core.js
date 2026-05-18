const ArchitecturePhysicalServerModelCore = (function () {
    const toolId = 'architecture-physical-server';
    const toolVersion = '1.0.0';
    const allowedRackCounts = [1, 2, 3, 4];
    const allowedHypervisorCounts = [1, 2, 3, 4, 5, 6];
    const allowedPlatforms = ['proxmox-openstack', 'proxmox', 'openstack', 'vmware', 'mixed'];
    const allowedStorageModels = ['synology-ha', 'san-nas', 'local-raid', 'hybrid'];
    const allowedNetworkModes = ['segmented-vlans', 'dual-switch-ha', 'dmz-edge', 'flat-lab'];
    const booleanKeys = [
        'proxmox',
        'horizon',
        'synologyDsm',
        'zabbix',
        'syslog',
        'outOfBand',
        'snapshots',
        'offsiteBackup',
        'disasterRecovery',
        'redundantPower',
        'cooling',
        'physicalSecurity'
    ];
    const presetCatalog = [
        {
            id: 'onprem-private-cloud',
            label: 'On-Prem Private Cloud',
            description: 'Proxmox VE, OpenStack, Synology HA storage, segmented VLANs, monitoring, backup, and redundant facility controls.',
            prompt: 'Create an on-premises infrastructure stack with 2 racks and 3 hypervisor nodes. Use Proxmox VE for cluster management, OpenStack for tenant workloads, Synology HA NAS for iSCSI and NFS storage, VLAN 10 management 10.0.10.0/24, VLAN 20 storage 10.0.20.0/24, VLAN 30 tenant 10.0.30.0/24, VLAN 40 backup 10.0.40.0/24, firewall, core switch, Zabbix, syslog, snapshots, offsite backup, redundant power, cooling, IPMI, and physical security.',
            defaults: {
                rackCount: 2,
                hypervisorCount: 3,
                platform: 'proxmox-openstack',
                storageModel: 'synology-ha',
                networkMode: 'segmented-vlans',
                serverModel: 'Dell PowerEdge R740xd',
                storagePlatform: 'Synology NAS Cluster',
                managementTool: 'Proxmox VE + OpenStack Horizon',
                managementNetwork: 'VLAN 10 - 10.0.10.0/24',
                storageNetwork: 'VLAN 20 - 10.0.20.0/24',
                tenantNetwork: 'VLAN 30 - 10.0.30.0/24',
                backupNetwork: 'VLAN 40 - 10.0.40.0/24',
                networkNotes: 'Router / gateway, firewall, core switch, separated management, storage, tenant, and backup traffic.',
                proxmox: true,
                horizon: true,
                synologyDsm: true,
                zabbix: true,
                syslog: true,
                outOfBand: true,
                snapshots: true,
                offsiteBackup: true,
                disasterRecovery: true,
                redundantPower: true,
                cooling: true,
                physicalSecurity: true
            }
        },
        {
            id: 'storage-backed-virtualization',
            label: 'Storage-Backed Virtualization',
            description: 'Shared SAN/NAS storage with virtualization cluster, iSCSI block storage, NFS shares, and segmented traffic.',
            prompt: 'Design a storage-backed virtualization stack with 3 racks, 4 hypervisor nodes, shared SAN/NAS storage, iSCSI LUNs, NFS shares, segmented management storage tenant and backup VLANs, redundant switching, Proxmox management, monitoring, syslog, snapshots, and offsite backup.',
            defaults: {
                rackCount: 3,
                hypervisorCount: 4,
                platform: 'proxmox',
                storageModel: 'san-nas',
                networkMode: 'dual-switch-ha',
                serverModel: 'HPE ProLiant DL380',
                storagePlatform: 'Shared SAN / NAS Pair',
                managementTool: 'Proxmox VE Cluster',
                managementNetwork: 'VLAN 110 - 10.10.10.0/24',
                storageNetwork: 'VLAN 120 - 10.10.20.0/24',
                tenantNetwork: 'VLAN 130 - 10.10.30.0/24',
                backupNetwork: 'VLAN 140 - 10.10.40.0/24',
                networkNotes: 'Dual core switches, storage multipath, separated backup replication traffic.',
                proxmox: true,
                horizon: false,
                synologyDsm: false,
                zabbix: true,
                syslog: true,
                outOfBand: true,
                snapshots: true,
                offsiteBackup: true,
                disasterRecovery: false,
                redundantPower: true,
                cooling: true,
                physicalSecurity: true
            }
        },
        {
            id: 'backup-focused-cluster',
            label: 'Backup-Focused Cluster',
            description: 'Physical cluster with local RAID, Synology storage, snapshot replication, offsite backup, monitoring, and DR runbooks.',
            prompt: 'Build a backup-focused on-prem server stack with 2 hypervisor nodes, VMware or mixed virtualization, Synology NAS storage, local RAID, snapshot replication, offsite backup archive, Zabbix monitoring, centralized syslog, backup VLAN 10.0.40.0/24, management VLAN 10.0.10.0/24, redundant power, UPS, cooling, and locked rack access.',
            defaults: {
                rackCount: 2,
                hypervisorCount: 2,
                platform: 'mixed',
                storageModel: 'hybrid',
                networkMode: 'segmented-vlans',
                serverModel: 'Dell PowerEdge R650',
                storagePlatform: 'Synology NAS + Local RAID',
                managementTool: 'Hypervisor Manager + NAS Console',
                managementNetwork: 'VLAN 10 - 10.0.10.0/24',
                storageNetwork: 'VLAN 20 - 10.0.20.0/24',
                tenantNetwork: 'VLAN 30 - 10.0.30.0/24',
                backupNetwork: 'VLAN 40 - 10.0.40.0/24',
                networkNotes: 'Backup network is isolated from tenant VM traffic for replication windows.',
                proxmox: false,
                horizon: false,
                synologyDsm: true,
                zabbix: true,
                syslog: true,
                outOfBand: true,
                snapshots: true,
                offsiteBackup: true,
                disasterRecovery: true,
                redundantPower: true,
                cooling: true,
                physicalSecurity: true
            }
        },
        {
            id: 'edge-lab-stack',
            label: 'Edge Lab Stack',
            description: 'Compact lab or edge rack with local RAID, flat or lightly segmented network, basic monitoring, and local backup.',
            prompt: 'Create a compact edge lab physical server stack with 1 rack, 2 hypervisor nodes, Proxmox VE, local RAID SSD storage, flat lab network, firewall gateway, management network, backup network, local snapshots, Zabbix monitoring, syslog, UPS, cooling, and locked rack.',
            defaults: {
                rackCount: 1,
                hypervisorCount: 2,
                platform: 'proxmox',
                storageModel: 'local-raid',
                networkMode: 'flat-lab',
                serverModel: 'Compact 1U Server',
                storagePlatform: 'Local RAID / SSD',
                managementTool: 'Proxmox VE',
                managementNetwork: 'VLAN 10 - 10.20.10.0/24',
                storageNetwork: 'Local-only storage path',
                tenantNetwork: 'VLAN 30 - 10.20.30.0/24',
                backupNetwork: 'VLAN 40 - 10.20.40.0/24',
                networkNotes: 'Simple edge/lab path with firewall gateway and minimal segmentation.',
                proxmox: true,
                horizon: false,
                synologyDsm: false,
                zabbix: true,
                syslog: true,
                outOfBand: false,
                snapshots: true,
                offsiteBackup: false,
                disasterRecovery: false,
                redundantPower: true,
                cooling: true,
                physicalSecurity: true
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

    function normalizeFreeText(value, fallback) {
        const text = String(value || '').trim();

        return text || fallback;
    }

    function normalizeEnum(value, fallback, allowedValues) {
        const normalized = normalizeText(value);

        if (allowedValues.includes(normalized)) {
            return normalized;
        }

        return allowedValues.includes(fallback) ? fallback : allowedValues[0];
    }

    function normalizeInteger(value, fallback, allowedValues) {
        const parsed = Number(value);

        if (Number.isInteger(parsed) && allowedValues.includes(parsed)) {
            return parsed;
        }

        if (Number.isInteger(fallback) && allowedValues.includes(fallback)) {
            return fallback;
        }

        return allowedValues[0];
    }

    function normalizeBoolean(value, fallback) {
        if (typeof value === 'boolean') {
            return value;
        }

        if (typeof value === 'string') {
            const normalized = normalizeText(value);

            if (['true', 'yes', '1', 'enabled', 'on'].includes(normalized)) {
                return true;
            }

            if (['false', 'no', '0', 'disabled', 'off'].includes(normalized)) {
                return false;
            }
        }

        return Boolean(fallback);
    }

    function getPreset(presetId) {
        return presetCatalog.find(function (preset) {
            return preset.id === presetId;
        }) || presetCatalog[0];
    }

    function labelFromMap(value, fallback, map) {
        return map[value] || fallback;
    }

    function platformLabel(value) {
        return labelFromMap(value, 'Proxmox + OpenStack', {
            'proxmox-openstack': 'Proxmox + OpenStack',
            proxmox: 'Proxmox VE',
            openstack: 'OpenStack',
            vmware: 'VMware',
            mixed: 'Mixed platform'
        });
    }

    function storageModelLabel(value) {
        return labelFromMap(value, 'Synology HA NAS', {
            'synology-ha': 'Synology HA NAS',
            'san-nas': 'SAN / NAS',
            'local-raid': 'Local RAID / SSD',
            hybrid: 'Hybrid local + shared'
        });
    }

    function networkModeLabel(value) {
        return labelFromMap(value, 'Segmented VLANs', {
            'segmented-vlans': 'Segmented VLANs',
            'dual-switch-ha': 'Dual-switch HA',
            'dmz-edge': 'DMZ edge stack',
            'flat-lab': 'Flat lab network'
        });
    }

    function extractNumber(prompt, expressions, fallback, allowedValues) {
        for (let index = 0; index < expressions.length; index += 1) {
            const match = prompt.match(expressions[index]);

            if (match && match[1]) {
                return normalizeInteger(match[1], fallback, allowedValues);
            }
        }

        return fallback;
    }

    function includesAny(text, terms) {
        return terms.some(function (term) {
            return text.includes(term);
        });
    }

    function detectKeywords(promptText) {
        const text = normalizeText(promptText);
        const pairs = [
            ['Proxmox', ['proxmox']],
            ['OpenStack', ['openstack', 'horizon']],
            ['VMware', ['vmware', 'vsphere', 'esxi']],
            ['Synology', ['synology', 'dsm']],
            ['iSCSI', ['iscsi']],
            ['NFS', ['nfs']],
            ['VLAN', ['vlan', 'segmented']],
            ['Backup', ['backup', 'replication', 'snapshot', 'snapshots']],
            ['Offsite backup', ['offsite', 'archive']],
            ['Disaster recovery', ['disaster recovery', 'dr plan', 'runbook']],
            ['Monitoring', ['monitoring', 'zabbix']],
            ['Syslog', ['syslog', 'logs', 'logging']],
            ['IPMI', ['ipmi', 'out-of-band', 'out of band', 'oob']],
            ['Power', ['power', 'ups', 'pdu']],
            ['Cooling', ['cooling', 'crac', 'hot/cold', 'hot cold']],
            ['Physical security', ['physical security', 'locked rack', 'access control']]
        ];

        return pairs.filter(function (pair) {
            return includesAny(text, pair[1]);
        }).map(function (pair) {
            return pair[0];
        });
    }

    function inferFromPrompt(promptText, defaults) {
        const text = normalizeText(promptText);
        const inferred = {};
        const assumptions = [];
        const matchedKeywords = detectKeywords(promptText);

        inferred.rackCount = extractNumber(text, [
            /(\d+)\s*(?:rack|racks)/,
            /(?:rack|racks)\s*(?:count|of)?\s*(\d+)/
        ], defaults.rackCount, allowedRackCounts);

        inferred.hypervisorCount = extractNumber(text, [
            /(\d+)\s*(?:hypervisor|hypervisors|server|servers|node|nodes)/,
            /(?:hypervisor|server|node)s?\s*(?:count|of)?\s*(\d+)/
        ], defaults.hypervisorCount, allowedHypervisorCounts);

        if (text.includes('proxmox') && text.includes('openstack')) {
            inferred.platform = 'proxmox-openstack';
        } else if (text.includes('proxmox')) {
            inferred.platform = 'proxmox';
        } else if (text.includes('openstack') || text.includes('horizon')) {
            inferred.platform = 'openstack';
        } else if (includesAny(text, ['vmware', 'vsphere', 'esxi'])) {
            inferred.platform = 'vmware';
        } else if (includesAny(text, ['mixed', 'hybrid hypervisor'])) {
            inferred.platform = 'mixed';
        } else {
            inferred.platform = defaults.platform;
            assumptions.push('Virtualization platform was not explicit, so the preset platform was used.');
        }

        if (includesAny(text, ['synology', 'dsm'])) {
            inferred.storageModel = 'synology-ha';
            inferred.storagePlatform = defaults.storagePlatform.includes('Synology') ? defaults.storagePlatform : 'Synology NAS Cluster';
        } else if (includesAny(text, ['san', 'nas', 'iscsi', 'nfs'])) {
            inferred.storageModel = 'san-nas';
        } else if (includesAny(text, ['local raid', 'local ssd', 'local-only', 'local only'])) {
            inferred.storageModel = 'local-raid';
        } else if (includesAny(text, ['hybrid storage', 'local and shared'])) {
            inferred.storageModel = 'hybrid';
        } else {
            inferred.storageModel = defaults.storageModel;
            assumptions.push('Storage model was not explicit, so the preset storage pattern was used.');
        }

        if (includesAny(text, ['dual switch', 'redundant switch', 'mlag', 'stacked switch'])) {
            inferred.networkMode = 'dual-switch-ha';
        } else if (includesAny(text, ['dmz', 'edge stack'])) {
            inferred.networkMode = 'dmz-edge';
        } else if (includesAny(text, ['flat lab', 'flat network'])) {
            inferred.networkMode = 'flat-lab';
        } else if (includesAny(text, ['vlan', 'segmented'])) {
            inferred.networkMode = 'segmented-vlans';
        } else {
            inferred.networkMode = defaults.networkMode;
            assumptions.push('Network segmentation was not explicit, so the preset network pattern was used.');
        }

        inferred.proxmox = includesAny(text, ['proxmox']) || defaults.proxmox;
        inferred.horizon = includesAny(text, ['openstack', 'horizon']) || defaults.horizon;
        inferred.synologyDsm = includesAny(text, ['synology', 'dsm']) || defaults.synologyDsm;
        inferred.zabbix = includesAny(text, ['zabbix', 'monitoring']) || defaults.zabbix;
        inferred.syslog = includesAny(text, ['syslog', 'central log', 'logging']) || defaults.syslog;
        inferred.outOfBand = includesAny(text, ['ipmi', 'out-of-band', 'out of band', 'oob']) || defaults.outOfBand;
        inferred.snapshots = includesAny(text, ['snapshot', 'snapshots']) || defaults.snapshots;
        inferred.offsiteBackup = includesAny(text, ['offsite', 'archive', 'cloud backup']) || defaults.offsiteBackup;
        inferred.disasterRecovery = includesAny(text, ['disaster recovery', 'dr plan', 'runbook', 'rpo', 'rto']) || defaults.disasterRecovery;
        inferred.redundantPower = includesAny(text, ['redundant power', 'ups', 'pdu', 'a/b power', 'a b power']) || defaults.redundantPower;
        inferred.cooling = includesAny(text, ['cooling', 'hot/cold', 'hot cold', 'crac', 'ac']) || defaults.cooling;
        inferred.physicalSecurity = includesAny(text, ['physical security', 'locked rack', 'access control']) || defaults.physicalSecurity;

        if (!matchedKeywords.length) {
            assumptions.push('Prompt did not include recognized infrastructure keywords; preset defaults shaped the model.');
        }

        return {
            inferred,
            assumptions,
            matchedKeywords
        };
    }

    function normalizeControls(rawControls, defaults) {
        const controls = {};

        controls.rackCount = normalizeInteger(rawControls.rackCount, defaults.rackCount, allowedRackCounts);
        controls.hypervisorCount = normalizeInteger(rawControls.hypervisorCount, defaults.hypervisorCount, allowedHypervisorCounts);
        controls.platform = normalizeEnum(rawControls.platform, defaults.platform, allowedPlatforms);
        controls.storageModel = normalizeEnum(rawControls.storageModel, defaults.storageModel, allowedStorageModels);
        controls.networkMode = normalizeEnum(rawControls.networkMode, defaults.networkMode, allowedNetworkModes);
        controls.serverModel = normalizeFreeText(rawControls.serverModel, defaults.serverModel);
        controls.storagePlatform = normalizeFreeText(rawControls.storagePlatform, defaults.storagePlatform);
        controls.managementTool = normalizeFreeText(rawControls.managementTool, defaults.managementTool);
        controls.managementNetwork = normalizeFreeText(rawControls.managementNetwork, defaults.managementNetwork);
        controls.storageNetwork = normalizeFreeText(rawControls.storageNetwork, defaults.storageNetwork);
        controls.tenantNetwork = normalizeFreeText(rawControls.tenantNetwork, defaults.tenantNetwork);
        controls.backupNetwork = normalizeFreeText(rawControls.backupNetwork, defaults.backupNetwork);
        controls.networkNotes = normalizeFreeText(rawControls.networkNotes, defaults.networkNotes);

        booleanKeys.forEach(function (key) {
            controls[key] = normalizeBoolean(rawControls[key], defaults[key]);
        });

        return controls;
    }

    function mergeControlsWithPrompt(promptText, preset, rawControls) {
        const defaults = clone(preset.defaults);
        const promptResult = inferFromPrompt(promptText, defaults);
        const merged = Object.assign({}, defaults, promptResult.inferred, rawControls || {});

        return {
            controls: normalizeControls(merged, defaults),
            assumptions: promptResult.assumptions,
            matchedKeywords: promptResult.matchedKeywords
        };
    }

    function enabledList(model) {
        const values = [];

        if (model.controls.proxmox) {
            values.push('Proxmox VE');
        }

        if (model.controls.horizon) {
            values.push('OpenStack Horizon');
        }

        if (model.controls.synologyDsm) {
            values.push('Synology DSM');
        }

        if (model.controls.zabbix) {
            values.push('Zabbix');
        }

        if (model.controls.syslog) {
            values.push('Syslog');
        }

        if (model.controls.snapshots) {
            values.push('Snapshots');
        }

        if (model.controls.offsiteBackup) {
            values.push('Offsite backup');
        }

        return values;
    }

    function buildInventory(model) {
        const controls = model.controls;
        const inventory = [
            {
                id: '01',
                component: 'Users / Clients',
                placement: 'External access edge',
                purpose: 'Source traffic for administration, self-service, and tenant workloads.',
                action: 'Confirm user, admin, and service access paths.'
            },
            {
                id: '02',
                component: 'Router / Gateway',
                placement: 'Network edge',
                purpose: 'Routes north-south traffic and NAT where required.',
                action: 'Review upstream routing, public IPs, and failover.'
            },
            {
                id: '03',
                component: 'Firewall',
                placement: 'Security boundary',
                purpose: 'Filters user, management, storage, tenant, and backup paths.',
                action: 'Review zone policy and logging.'
            },
            {
                id: '04',
                component: 'Core / Access Switch',
                placement: networkModeLabel(controls.networkMode),
                purpose: 'Provides L2/L3 switching for server, storage, and backup segments.',
                action: 'Validate VLAN trunks, redundancy, MTU, and switch capacity.'
            },
            {
                id: '05',
                component: controls.hypervisorCount + ' hypervisor node' + (controls.hypervisorCount === 1 ? '' : 's'),
                placement: controls.rackCount + ' rack' + (controls.rackCount === 1 ? '' : 's'),
                purpose: platformLabel(controls.platform) + ' compute capacity on ' + controls.serverModel + '.',
                action: 'Confirm CPU, RAM, NIC, RAID, firmware, and cluster quorum.'
            },
            {
                id: '06',
                component: platformLabel(controls.platform),
                placement: 'Virtualization platform',
                purpose: 'Hosts VM, tenant, or private cloud workloads.',
                action: 'Review management plane, role split, and lifecycle operations.'
            },
            {
                id: '07',
                component: controls.storagePlatform,
                placement: storageModelLabel(controls.storageModel),
                purpose: 'Provides block, file, local, or hybrid storage for workloads and backups.',
                action: 'Validate multipath, RAID, snapshot, capacity, and restore behavior.'
            },
            {
                id: '08',
                component: 'Segmented networks',
                placement: 'Management / storage / tenant / backup',
                purpose: controls.managementNetwork + '; ' + controls.storageNetwork + '; ' + controls.tenantNetwork + '; ' + controls.backupNetwork + '.',
                action: 'Review VLAN IDs, CIDRs, routing, ACLs, and monitoring.'
            },
            {
                id: '09',
                component: 'Management and operations',
                placement: enabledList(model).join(', ') || 'Operations tooling',
                purpose: 'Centralizes management, monitoring, logging, and administration.',
                action: 'Confirm access controls, alerting, dashboards, and retention.'
            },
            {
                id: '10',
                component: 'Backup and DR',
                placement: controls.backupNetwork,
                purpose: 'Coordinates snapshots, replication, offsite copy, and recovery runbooks.',
                action: 'Validate RPO, RTO, retention, and restore tests.'
            },
            {
                id: '11',
                component: 'Physical infrastructure foundation',
                placement: 'Rack, cabling, power, cooling, and security',
                purpose: 'Supports the physical platform and operating envelope.',
                action: 'Confirm rack units, PDU load, UPS, cooling, and access control.'
            }
        ];

        return inventory;
    }

    function buildRouteRows(model) {
        const controls = model.controls;

        return [
            ['User traffic', 'Users -> Gateway -> Firewall -> Core switch -> Tenant / VM network'],
            ['Management traffic', controls.managementNetwork + ' -> hypervisors, storage console, IPMI, management tools'],
            ['Storage traffic', controls.storageNetwork + ' -> ' + storageModelLabel(controls.storageModel)],
            ['Backup traffic', controls.backupNetwork + ' -> snapshots, replication, and offsite copy']
        ];
    }

    function buildControlRows(model) {
        const controls = model.controls;
        const rows = [
            ['Management plane', controls.managementTool],
            ['Compute platform', platformLabel(controls.platform)],
            ['Storage platform', controls.storagePlatform],
            ['Network pattern', networkModeLabel(controls.networkMode)]
        ];

        if (controls.zabbix) {
            rows.push(['Monitoring', 'Zabbix infrastructure monitoring is enabled.']);
        }

        if (controls.syslog) {
            rows.push(['Logging', 'Central syslog collection is enabled.']);
        }

        if (controls.outOfBand) {
            rows.push(['Out-of-band', 'IPMI or dedicated server management network is enabled.']);
        }

        return rows;
    }

    function buildPillars(model) {
        const controls = model.controls;
        const redundancyScore = 50 + (controls.hypervisorCount >= 3 ? 16 : 0) + (controls.redundantPower ? 12 : 0) + (controls.storageModel !== 'local-raid' ? 12 : 0) + (controls.networkMode === 'dual-switch-ha' ? 10 : 0);
        const operationsScore = 50 + (controls.zabbix ? 12 : 0) + (controls.syslog ? 12 : 0) + (controls.outOfBand ? 12 : 0) + (controls.proxmox || controls.horizon ? 8 : 0);
        const dataScore = 48 + (controls.snapshots ? 16 : 0) + (controls.offsiteBackup ? 16 : 0) + (controls.disasterRecovery ? 12 : 0) + (controls.storageModel !== 'local-raid' ? 8 : 0);
        const facilityScore = 52 + (controls.redundantPower ? 14 : 0) + (controls.cooling ? 14 : 0) + (controls.physicalSecurity ? 14 : 0);

        return [
            {
                label: 'Compute and HA',
                score: Math.min(100, redundancyScore),
                tone: redundancyScore >= 82 ? 'excellent' : 'good',
                icon: 'bi bi-hdd-rack'
            },
            {
                label: 'Operations',
                score: Math.min(100, operationsScore),
                tone: operationsScore >= 82 ? 'excellent' : 'good',
                icon: 'bi bi-activity'
            },
            {
                label: 'Data protection',
                score: Math.min(100, dataScore),
                tone: dataScore >= 82 ? 'excellent' : (dataScore >= 70 ? 'good' : 'fair'),
                icon: 'bi bi-database-check'
            },
            {
                label: 'Facility controls',
                score: Math.min(100, facilityScore),
                tone: facilityScore >= 82 ? 'excellent' : 'good',
                icon: 'bi bi-building-lock'
            }
        ];
    }

    function buildRisk(model, score) {
        const controls = model.controls;
        const reviewPoints = [];

        if (controls.hypervisorCount < 3) {
            reviewPoints.push('Fewer than three hypervisor nodes may limit cluster maintenance and quorum options.');
        }

        if (controls.storageModel === 'local-raid') {
            reviewPoints.push('Local-only storage needs a clear VM placement and restore strategy.');
        }

        if (!controls.offsiteBackup) {
            reviewPoints.push('Offsite backup is disabled, so site-loss recovery needs review.');
        }

        if (!controls.syslog) {
            reviewPoints.push('Centralized log collection is disabled.');
        }

        if (!reviewPoints.length) {
            reviewPoints.push('Review exact capacity, cabling, restore tests, power, cooling, and access control before implementation.');
        }

        if (score >= 86) {
            return {
                level: 'Low review risk',
                tone: 'low',
                icon: 'bi bi-shield-check',
                summary: 'The generated model includes strong redundancy, operations, backup, and facility signals.',
                reviewPoints
            };
        }

        if (score >= 70) {
            return {
                level: 'Moderate review risk',
                tone: 'moderate',
                icon: 'bi bi-exclamation-triangle',
                summary: 'The generated model is usable for review, but several design details still need confirmation.',
                reviewPoints
            };
        }

        return {
            level: 'High review risk',
            tone: 'high',
            icon: 'bi bi-exclamation-octagon',
            summary: 'The generated model is incomplete for serious planning without additional design detail.',
            reviewPoints
        };
    }

    function buildPros(model) {
        const controls = model.controls;
        const pros = [
            'Physical compute, storage, network, operations, backup, and foundation layers are visible in one model.',
            'JSON state preserves the prompt, controls, generated notes, and layout overrides.'
        ];

        if (controls.networkMode !== 'flat-lab') {
            pros.push('Management, storage, tenant, and backup paths are separated for review.');
        }

        if (controls.zabbix || controls.syslog) {
            pros.push('Monitoring and logging signals are represented in the operations layer.');
        }

        if (controls.snapshots && controls.offsiteBackup) {
            pros.push('Backup flow includes both local snapshot and offsite copy intent.');
        }

        return pros;
    }

    function buildModelList(model) {
        const controls = model.controls;

        return [
            'Preset: ' + model.presetLabel,
            'Racks: ' + controls.rackCount,
            'Hypervisor nodes: ' + controls.hypervisorCount,
            'Platform: ' + platformLabel(controls.platform),
            'Storage: ' + storageModelLabel(controls.storageModel),
            'Network: ' + networkModeLabel(controls.networkMode)
        ];
    }

    function buildStageMeta(model) {
        const controls = model.controls;

        return [
            {
                icon: 'bi bi-hdd-rack',
                label: controls.hypervisorCount + ' nodes',
                tone: 'compute'
            },
            {
                icon: 'bi bi-diagram-3',
                label: networkModeLabel(controls.networkMode),
                tone: 'network'
            },
            {
                icon: 'bi bi-database',
                label: storageModelLabel(controls.storageModel),
                tone: 'data'
            },
            {
                icon: 'bi bi-building',
                label: controls.rackCount + ' rack' + (controls.rackCount === 1 ? '' : 's'),
                tone: 'facility'
            }
        ];
    }

    function buildModel(input) {
        const preset = getPreset(input && input.presetId);
        const prompt = String((input && input.prompt) || preset.prompt || '').trim();
        const mergeResult = mergeControlsWithPrompt(prompt, preset, input && input.controls);
        const model = {
            title: 'Physical Server Architecture',
            prompt,
            presetId: preset.id,
            presetLabel: preset.label,
            presetDescription: preset.description,
            controls: mergeResult.controls,
            assumptions: mergeResult.assumptions,
            matchedKeywords: mergeResult.matchedKeywords
        };
        const pillars = buildPillars(model);
        const score = Math.round(pillars.reduce(function (sum, pillar) {
            return sum + pillar.score;
        }, 0) / pillars.length);

        model.inventory = buildInventory(model);
        model.routeRows = buildRouteRows(model);
        model.controlRows = buildControlRows(model);
        model.pillars = pillars;
        model.score = score;
        model.risk = buildRisk(model, score);
        model.pros = buildPros(model);
        model.cons = model.risk.reviewPoints;
        model.modelList = buildModelList(model);
        model.stageMeta = buildStageMeta(model);
        model.promptSummary = 'Generated ' + model.presetLabel + ' with ' + model.controls.hypervisorCount + ' hypervisor node' + (model.controls.hypervisorCount === 1 ? '' : 's') + ', ' + storageModelLabel(model.controls.storageModel) + ', and ' + networkModeLabel(model.controls.networkMode).toLowerCase() + '.';

        return model;
    }

    function sanitizeLayoutOverrides(value) {
        const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
        const result = {};

        Object.keys(source).forEach(function (key) {
            const item = source[key];

            if (!item || typeof item !== 'object') {
                return;
            }

            const override = {};
            ['x', 'y', 'width', 'height'].forEach(function (field) {
                const number = Number(item[field]);

                if (Number.isFinite(number)) {
                    override[field] = number;
                }
            });

            if (Object.keys(override).length) {
                result[key] = override;
            }
        });

        return result;
    }

    function sanitizeSelectedIds(value) {
        if (!Array.isArray(value)) {
            return [];
        }

        return value.map(function (item) {
            return String(item || '').trim();
        }).filter(Boolean);
    }

    function buildExportPayload(input) {
        const model = buildModel({
            prompt: input.prompt,
            presetId: input.presetId,
            controls: input.controls
        });

        return {
            tool: toolId,
            version: toolVersion,
            generated_at: new Date().toISOString(),
            diagram: {
                title: model.title,
                prompt: model.prompt,
                preset_id: model.presetId,
                preset_label: model.presetLabel,
                controls: clone(model.controls)
            },
            layout_overrides: sanitizeLayoutOverrides(input.layoutOverrides),
            selected_ids: sanitizeSelectedIds(input.selectedIds),
            zoom: Number.isFinite(Number(input.zoom)) ? Number(input.zoom) : 1,
            inventory: clone(model.inventory),
            routing_summary: clone(model.routeRows),
            control_summary: clone(model.controlRows),
            prompt_notes: {
                summary: model.promptSummary,
                assumptions: clone(model.assumptions),
                matched_keywords: clone(model.matchedKeywords),
                model: clone(model.modelList),
                pros: clone(model.pros),
                review_points: clone(model.cons)
            },
            pillar_breakdown: clone(model.pillars),
            risk_level: clone(model.risk)
        };
    }

    function buildImportedPayloadState(payload) {
        if (!payload || typeof payload !== 'object') {
            throw new Error('Import file does not contain a valid architecture state.');
        }

        if (payload.tool !== toolId) {
            throw new Error('This JSON belongs to a different InfraStack tool.');
        }

        const majorVersion = String(payload.version || '').split('.')[0];

        if (majorVersion !== '1') {
            throw new Error('Unsupported Physical Server Architecture state version.');
        }

        const diagram = payload.diagram && typeof payload.diagram === 'object' ? payload.diagram : {};
        const preset = getPreset(diagram.preset_id);
        const controls = normalizeControls(diagram.controls || {}, preset.defaults);

        return {
            prompt: normalizeFreeText(diagram.prompt, preset.prompt),
            presetId: preset.id,
            controls,
            layoutOverrides: sanitizeLayoutOverrides(payload.layout_overrides),
            selectedIds: sanitizeSelectedIds(payload.selected_ids),
            zoom: Number.isFinite(Number(payload.zoom)) ? Number(payload.zoom) : 1
        };
    }

    /**
     * Gets a preset by ID and falls back to the default physical server preset.
     *
     * @param {string} presetId Preset identifier.
     * @returns {object} Preset definition.
     */
    function publicGetPreset(presetId) {
        return clone(getPreset(presetId));
    }

    /**
     * Builds a normalized physical server architecture model.
     *
     * @param {object} input Prompt, preset ID, and control values.
     * @returns {object} Normalized model with inventory, notes, advisory score, and risk summary.
     */
    function publicBuildModel(input) {
        return clone(buildModel(input || {}));
    }

    /**
     * Builds the restorable export payload for the current workspace state.
     *
     * @param {object} input Current prompt, controls, layout overrides, selected IDs, and zoom value.
     * @returns {object} Restorable JSON payload.
     */
    function publicBuildExportPayload(input) {
        return buildExportPayload(input || {});
    }

    /**
     * Validates and normalizes an imported Physical Server Architecture payload.
     *
     * @param {object} payload Parsed JSON import payload.
     * @returns {object} Normalized state ready for browser restore.
     */
    function publicBuildImportedPayloadState(payload) {
        return buildImportedPayloadState(payload);
    }

    return {
        toolId,
        toolVersion,
        presetCatalog: clone(presetCatalog),
        allowedRackCounts: clone(allowedRackCounts),
        allowedHypervisorCounts: clone(allowedHypervisorCounts),
        allowedPlatforms: clone(allowedPlatforms),
        allowedStorageModels: clone(allowedStorageModels),
        allowedNetworkModes: clone(allowedNetworkModes),
        booleanKeys: clone(booleanKeys),
        getPreset: publicGetPreset,
        platformLabel,
        storageModelLabel,
        networkModeLabel,
        inferFromPrompt,
        buildModel: publicBuildModel,
        buildExportPayload: publicBuildExportPayload,
        buildImportedPayloadState: publicBuildImportedPayloadState
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchitecturePhysicalServerModelCore;
}
