const InfraStackStudioImprovements = (function () {
    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function assetById(project, assetId) {
        return project.assets.find(function (asset) { return asset.id === assetId; }) || null;
    }

    function ancestorOfType(project, asset, type) {
        let parent = assetById(project, asset && asset.parent_id);
        while (parent) {
            if (parent.type === type) return parent;
            parent = assetById(project, parent.parent_id);
        }
        return null;
    }

    function descendantOf(project, asset, ancestorId) {
        let parent = asset;
        while (parent) {
            if (parent.id === ancestorId) return true;
            parent = assetById(project, parent.parent_id);
        }
        return false;
    }

    function providerFor(project) {
        return project.assets.some(function (asset) { return asset.properties.provider === 'aws'; }) ? 'aws' : 'generic';
    }

    function plan(kind, title, summary, changes, assetIds, applyable, data = {}) {
        return {
            kind,
            title,
            summary,
            changes,
            asset_ids: assetIds,
            applyable,
            data
        };
    }

    function securityBoundaryPlan(project, finding) {
        const internet = project.assets.find(function (asset) { return asset.type === 'internet'; });
        const connection = internet && (project.connections.find(function (item) {
            return item.source === internet.id;
        }) || project.connections.find(function (item) {
            return item.target === internet.id;
        }));
        if (!internet || !connection) return null;
        const targetId = connection.source === internet.id ? connection.target : connection.source;
        const provider = providerFor(project);
        return plan(
            'insert-security-boundary',
            provider === 'aws' ? 'Insert AWS WAF into the public path' : 'Insert a firewall into the public path',
            'Adds a managed security boundary and replaces the direct internet relationship with two inspected relationships.',
            ['Add the security asset', 'Replace the direct public connection', 'Preserve its protocol and purpose label'],
            [internet.id, targetId],
            true,
            { internet_id: internet.id, target_id: targetId, connection_id: connection.id, provider }
        );
    }

    function flowLogsPlan(project, finding) {
        const vpc = assetById(project, finding.asset_ids[0]) || project.assets.find(function (asset) { return asset.type === 'vpc'; });
        if (!vpc) return null;
        return plan(
            'add-flow-logs',
            'Add network flow logging',
            'Adds a VPC Flow Logs component and a telemetry relationship to the affected VPC.',
            ['Add VPC Flow Logs', `Connect telemetry to ${vpc.label}`, 'Record monitoring as enabled'],
            [vpc.id],
            true,
            { vpc_id: vpc.id, provider: providerFor(project) }
        );
    }

    function natPlan(project, finding) {
        const source = assetById(project, finding.asset_ids[0]);
        const zones = finding.asset_ids.slice(1).map(function (id) { return assetById(project, id); }).filter(Boolean);
        const sourceZone = source && (source.properties.zone || (ancestorOfType(project, source, 'availability-zone') || {}).id);
        const targetZone = zones.find(function (zone) {
            return zone.id !== sourceZone && zone.properties.zone !== sourceZone;
        });
        const publicSubnet = targetZone && project.assets.find(function (asset) {
            return asset.type === 'subnet' && asset.properties.subnet_type === 'public' && descendantOf(project, asset, targetZone.id);
        });
        if (!source || !targetZone || !publicSubnet) return null;
        return plan(
            'add-zone-nat',
            `Add a NAT gateway to ${targetZone.label}`,
            'Duplicates the existing NAT gateway into the uncovered zone and reconnects that zone’s private workloads to local egress.',
            [`Duplicate ${source.label}`, `Place it in ${publicSubnet.label}`, 'Reconnect matching private-egress relationships'],
            [source.id, targetZone.id, publicSubnet.id],
            true,
            { source_id: source.id, target_zone_id: targetZone.id, subnet_id: publicSubnet.id }
        );
    }

    function publicDatabasePlan(project, finding) {
        const database = assetById(project, finding.asset_ids[finding.asset_ids.length - 1]);
        const vpc = database && ancestorOfType(project, database, 'vpc');
        const privateSubnet = database && project.assets.find(function (asset) {
            return asset.type === 'subnet'
                && asset.properties.subnet_type === 'private'
                && (!vpc || descendantOf(project, asset, vpc.id));
        });
        if (!database || !privateSubnet) return null;
        const zone = ancestorOfType(project, privateSubnet, 'availability-zone');
        return plan(
            'move-database-private',
            `Move ${database.label} into ${privateSubnet.label}`,
            'Changes the database parent boundary from a public subnet to an available private subnet.',
            [`Reparent ${database.label}`, `Use ${privateSubnet.label}`, 'Preserve existing relationships and resource properties'],
            [database.id, privateSubnet.id],
            true,
            { database_id: database.id, subnet_id: privateSubnet.id, zone: zone ? zone.properties.zone || zone.label : '' }
        );
    }

    function singleDatabasePlan(project, finding) {
        const database = assetById(project, finding.asset_ids[0]);
        const currentZone = database && ancestorOfType(project, database, 'availability-zone');
        const targetZone = project.assets.find(function (asset) {
            return asset.type === 'availability-zone' && (!currentZone || asset.id !== currentZone.id);
        });
        const privateSubnet = targetZone && project.assets.find(function (asset) {
            return asset.type === 'subnet' && asset.properties.subnet_type === 'private' && descendantOf(project, asset, targetZone.id);
        });
        if (!database || !targetZone) return null;
        return plan(
            'add-database-standby',
            `Add a standby for ${database.label}`,
            'Duplicates the database into another failure domain, marks both instances redundant, and adds replication.',
            [`Duplicate ${database.label}`, `Place the standby in ${privateSubnet ? privateSubnet.label : targetZone.label}`, 'Add a typed replication relationship'],
            [database.id, targetZone.id].concat(privateSubnet ? [privateSubnet.id] : []),
            true,
            { database_id: database.id, parent_id: privateSubnet ? privateSubnet.id : targetZone.id, zone: targetZone.properties.zone || targetZone.label }
        );
    }

    function replicationPlan(project, finding) {
        const databases = finding.asset_ids.map(function (id) { return assetById(project, id); }).filter(Boolean);
        if (databases.length < 2) return null;
        return plan(
            'add-database-replication',
            'Connect database replication',
            'Adds a typed bidirectional replication relationship between the first two affected database instances.',
            [`Connect ${databases[0].label} and ${databases[1].label}`, 'Set relationship type to replication', 'Mark both instances redundant'],
            databases.slice(0, 2).map(function (asset) { return asset.id; }),
            true,
            { source_id: databases[0].id, target_id: databases[1].id }
        );
    }

    function propertyPlan(project, finding, property, title) {
        const asset = assetById(project, finding.asset_ids[0]);
        if (!asset) return null;
        return plan(
            `enable-${property}`,
            title.replace('{asset}', asset.label),
            `Records ${property} as enabled for the affected critical asset.`,
            [`Enable ${property} for ${asset.label}`, 'Preserve all other asset properties'],
            [asset.id],
            true,
            { asset_id: asset.id, property }
        );
    }

    /**
     * Builds a deterministic guided-improvement plan for one finding.
     *
     * @param {object} project Normalized Studio project.
     * @param {object} finding Review finding.
     * @returns {object} Guided plan.
     */
    function buildPlan(project, finding) {
        let result = null;
        if (finding.id === 'security-boundary-missing') result = securityBoundaryPlan(project, finding);
        else if (finding.id === 'flow-logs-missing') result = flowLogsPlan(project, finding);
        else if (finding.id === 'nat-single-zone') result = natPlan(project, finding);
        else if (finding.id.startsWith('public-database-')) result = publicDatabasePlan(project, finding);
        else if (finding.id === 'database-single-instance') result = singleDatabasePlan(project, finding);
        else if (finding.id === 'database-replication-missing') result = replicationPlan(project, finding);
        else if (finding.id.startsWith('monitoring-')) result = propertyPlan(project, finding, 'monitoring', 'Enable monitoring for {asset}');
        else if (finding.id.startsWith('backup-')) result = propertyPlan(project, finding, 'backup', 'Enable backup for {asset}');

        return result || plan(
            'manual',
            'Manual architecture change required',
            finding.recommendation,
            ['Review the affected assets', 'Edit the architecture with the required design facts', 'Run the review again'],
            finding.asset_ids,
            false
        );
    }

    function resolvedDefinition(options, catalogId, fallback) {
        const definition = options && typeof options.resolveDefinition === 'function' ? options.resolveDefinition(catalogId) : null;
        return definition ? { ...definition } : fallback;
    }

    function addAsset(project, core, definition, changes) {
        const result = core.addAsset(project, definition);
        return {
            project: core.updateAsset(result.project, result.assetId, changes || {}),
            assetId: result.assetId
        };
    }

    function applySecurityBoundary(project, planData, core, options) {
        const previous = project.connections.find(function (connection) { return connection.id === planData.connection_id; });
        const definition = planData.provider === 'aws'
            ? resolvedDefinition(options, 'aws-waf', { catalog_id: 'aws-waf', semantic_type: 'firewall', label: 'AWS WAF', category: 'Security', provider: 'aws', views: ['overview', 'network', 'availability'] })
            : resolvedDefinition(options, 'firewall', { type: 'firewall', semantic_type: 'firewall', label: 'Firewall', category: 'Security', provider: 'generic', views: ['overview', 'physical', 'network', 'availability'] });
        const added = addAsset(project, core, definition, {
            vendor: planData.provider === 'aws' ? 'AWS' : '',
            policies: 'Approved ingress policy',
            security_zones: 'Internet, application',
            monitoring: true,
            critical: true
        });
        let next = core.removeConnection(added.project, planData.connection_id);
        let first = core.addConnection(next, planData.internet_id, added.assetId, 'trust');
        next = first.project;
        if (first.connectionId) next = core.updateConnection(next, first.connectionId, { label: 'Inspected ingress', protocol: previous ? previous.protocol : 'HTTPS' });
        let second = core.addConnection(next, added.assetId, planData.target_id, previous ? previous.type : 'network');
        next = second.project;
        if (second.connectionId) next = core.updateConnection(next, second.connectionId, { label: previous && previous.label ? previous.label : 'Approved ingress', protocol: previous ? previous.protocol : 'HTTPS' });
        return { project: next, assetIds: [added.assetId, planData.internet_id, planData.target_id] };
    }

    function applyFlowLogs(project, planData, core, options) {
        const definition = planData.provider === 'aws'
            ? resolvedDefinition(options, 'aws-vpc-flow-logs', { catalog_id: 'aws-vpc-flow-logs', semantic_type: 'monitoring', label: 'VPC Flow Logs', category: 'Operations', provider: 'aws', views: ['network', 'availability'] })
            : resolvedDefinition(options, 'monitoring', { type: 'monitoring', semantic_type: 'monitoring', label: 'Network Flow Logs', category: 'Operations', provider: 'generic', views: ['overview', 'network', 'availability'] });
        const added = addAsset(project, core, definition, { role: 'Network traffic telemetry', monitoring: true });
        const connected = core.addConnection(added.project, planData.vpc_id, added.assetId, 'administration');
        const next = connected.connectionId ? core.updateConnection(connected.project, connected.connectionId, { label: 'Traffic telemetry' }) : connected.project;
        return { project: next, assetIds: [planData.vpc_id, added.assetId] };
    }

    function applyZoneNat(project, planData, core) {
        const duplicated = core.duplicateAssets(project, [planData.source_id]);
        const assetId = duplicated.assetIds[0];
        const zone = assetById(duplicated.project, planData.target_zone_id);
        let next = core.updateAsset(duplicated.project, assetId, {
            label: `NAT Gateway ${zone ? zone.label : 'standby'}`,
            parent_id: planData.subnet_id,
            zone: zone ? zone.properties.zone || zone.label : '',
            monitoring: true,
            critical: true
        });
        const sourceConnections = project.connections.filter(function (connection) {
            return connection.source === planData.source_id || connection.target === planData.source_id;
        });
        sourceConnections.forEach(function (connection) {
            const peerId = connection.source === planData.source_id ? connection.target : connection.source;
            const peer = assetById(project, peerId);
            if (!peer || !descendantOf(project, peer, planData.target_zone_id)) return;
            const added = core.addConnection(next, assetId, peerId, connection.type);
            next = added.connectionId ? core.updateConnection(added.project, added.connectionId, {
                label: connection.label,
                protocol: connection.protocol,
                bandwidth: connection.bandwidth
            }) : added.project;
        });
        return { project: next, assetIds: [assetId, planData.target_zone_id, planData.subnet_id] };
    }

    function applyDatabaseStandby(project, planData, core) {
        const duplicated = core.duplicateAssets(project, [planData.database_id]);
        const standbyId = duplicated.assetIds[0];
        const source = assetById(duplicated.project, planData.database_id);
        let next = core.updateAsset(duplicated.project, planData.database_id, { redundant: true });
        next = core.updateAsset(next, standbyId, {
            label: `${source ? source.label : 'Database'} Standby`,
            parent_id: planData.parent_id,
            zone: planData.zone,
            redundant: true
        });
        const connected = core.addConnection(next, planData.database_id, standbyId, 'replication');
        next = connected.connectionId ? core.updateConnection(connected.project, connected.connectionId, {
            label: 'Standby replication',
            direction: 'bidirectional',
            bidirectional: true
        }) : connected.project;
        return { project: next, assetIds: [planData.database_id, standbyId] };
    }

    /**
     * Applies one previously built guided-improvement plan.
     *
     * @param {object} project Normalized Studio project.
     * @param {object} improvement Guided plan.
     * @param {object} core Studio project-model API.
     * @param {object} [options] Catalogue resolution options.
     * @returns {{project: object, assetIds: string[]}} Updated project and affected assets.
     */
    function applyPlan(project, improvement, core, options = {}) {
        if (!improvement || !improvement.applyable) return { project: clone(project), assetIds: [] };
        const data = improvement.data;
        if (improvement.kind === 'insert-security-boundary') return applySecurityBoundary(project, data, core, options);
        if (improvement.kind === 'add-flow-logs') return applyFlowLogs(project, data, core, options);
        if (improvement.kind === 'add-zone-nat') return applyZoneNat(project, data, core);
        if (improvement.kind === 'move-database-private') {
            return { project: core.updateAsset(project, data.database_id, { parent_id: data.subnet_id, zone: data.zone }), assetIds: [data.database_id, data.subnet_id] };
        }
        if (improvement.kind === 'add-database-standby') return applyDatabaseStandby(project, data, core);
        if (improvement.kind === 'add-database-replication') {
            let next = core.updateAsset(project, data.source_id, { redundant: true });
            next = core.updateAsset(next, data.target_id, { redundant: true });
            const connected = core.addConnection(next, data.source_id, data.target_id, 'replication');
            next = connected.connectionId ? core.updateConnection(connected.project, connected.connectionId, { label: 'Database replication', bidirectional: true, direction: 'bidirectional' }) : connected.project;
            return { project: next, assetIds: [data.source_id, data.target_id] };
        }
        if (improvement.kind === 'enable-monitoring' || improvement.kind === 'enable-backup') {
            return { project: core.updateAsset(project, data.asset_id, { [data.property]: true }), assetIds: [data.asset_id] };
        }
        return { project: clone(project), assetIds: [] };
    }

    /**
     * Simulates a guided improvement and returns its projected review.
     *
     * @param {object} project Normalized Studio project.
     * @param {object} improvement Guided plan.
     * @param {object} core Studio project-model API.
     * @param {object} rules Studio review rules API.
     * @param {object} [options] Catalogue resolution options.
     * @returns {object|null} Projected review or null for manual plans.
     */
    function previewPlan(project, improvement, core, rules, options = {}) {
        if (!improvement.applyable) return null;
        return rules.evaluateProject(applyPlan(project, improvement, core, options).project);
    }

    return { buildPlan, applyPlan, previewPlan };
}());

if (typeof globalThis !== 'undefined') globalThis.InfraStackStudioImprovements = InfraStackStudioImprovements;
if (typeof module !== 'undefined' && module.exports) module.exports = InfraStackStudioImprovements;
