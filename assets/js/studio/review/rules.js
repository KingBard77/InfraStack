const InfraStackStudioRules = (function () {
    const categoryWeights = {
        Network: 0.2,
        Security: 0.25,
        Availability: 0.25,
        Operations: 0.18,
        Documentation: 0.12
    };
    const severityDeductions = { critical: 30, high: 22, medium: 10, low: 4 };

    function finding(id, severity, category, title, detail, recommendation, assetIds = [], connectionIds = []) {
        return {
            id,
            severity,
            category,
            title,
            detail,
            recommendation,
            asset_ids: assetIds,
            connection_ids: connectionIds
        };
    }

    function gradeForScore(score) {
        if (score >= 90) return { grade: 'A', label: 'Strong documented design' };
        if (score >= 80) return { grade: 'B', label: 'Good with manageable gaps' };
        if (score >= 70) return { grade: 'C', label: 'Functional with material gaps' };
        if (score >= 60) return { grade: 'D', label: 'Major improvements required' };
        return { grade: 'E', label: 'Incomplete or high-risk design' };
    }

    function ipv4ToInteger(address) {
        const parts = String(address || '').split('.');

        if (parts.length !== 4 || !parts.every(function (part) {
            return /^\d{1,3}$/.test(part) && Number(part) <= 255;
        })) {
            return null;
        }

        return parts.reduce(function (total, part) {
            return (total * 256) + Number(part);
        }, 0);
    }

    /**
     * Converts an IPv4 CIDR into an inclusive integer range.
     *
     * @param {string} value IPv4 CIDR.
     * @returns {{start: number, end: number}|null} Parsed range or null.
     */
    function cidrRange(value) {
        const parts = String(value || '').split('/');
        const address = ipv4ToInteger(parts[0]);
        const prefix = Number(parts[1]);

        if (parts.length !== 2 || address === null || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
            return null;
        }

        const size = 2 ** (32 - prefix);
        const start = Math.floor(address / size) * size;

        return { start, end: start + size - 1 };
    }

    /**
     * Tests whether two valid IPv4 CIDRs overlap.
     *
     * @param {string} left First CIDR.
     * @param {string} right Second CIDR.
     * @returns {boolean} Whether the ranges overlap.
     */
    function cidrsOverlap(left, right) {
        const leftRange = cidrRange(left);
        const rightRange = cidrRange(right);

        return Boolean(leftRange && rightRange && leftRange.start <= rightRange.end && rightRange.start <= leftRange.end);
    }

    /**
     * Tests whether a child CIDR is fully contained by a parent CIDR.
     *
     * @param {string} parent Parent CIDR.
     * @param {string} child Child CIDR.
     * @returns {boolean} Whether the child range is contained.
     */
    function cidrContains(parent, child) {
        const parentRange = cidrRange(parent);
        const childRange = cidrRange(child);

        return Boolean(parentRange && childRange && parentRange.start <= childRange.start && parentRange.end >= childRange.end);
    }

    function connectionsFor(connections, assetId) {
        return connections.filter(function (connection) {
            return connection.source === assetId || connection.target === assetId;
        });
    }

    function ancestorOfType(asset, type, assetMap) {
        let parent = assetMap.get(asset.parent_id);

        while (parent) {
            if (parent.type === type) return parent;
            parent = assetMap.get(parent.parent_id);
        }

        return null;
    }

    function assetZone(asset, assetMap) {
        if (asset.properties.zone) return asset.properties.zone;
        const zone = ancestorOfType(asset, 'availability-zone', assetMap);
        return zone ? zone.properties.zone || zone.label : '';
    }

    function isNatGateway(asset) {
        return String(asset.catalog_id || '').includes('nat-gateway') || /nat gateway/i.test(asset.label || '');
    }

    function isFlowLogs(asset) {
        return String(asset.catalog_id || '').includes('flow-logs') || /flow logs/i.test(asset.label || '');
    }

    function hasInternetExposure(assets, connections) {
        const internetIds = new Set(assets.filter(function (asset) {
            return asset.type === 'internet' || /internet|public users/i.test(asset.label || '');
        }).map(function (asset) { return asset.id; }));

        return internetIds.size > 0 && connections.some(function (connection) {
            return internetIds.has(connection.source) || internetIds.has(connection.target);
        });
    }

    function publicSubnetFor(asset, assetMap) {
        const subnet = ancestorOfType(asset, 'subnet', assetMap);
        return subnet && subnet.properties.subnet_type === 'public' ? subnet : null;
    }

    function addNetworkFindings(assets, assetMap, findings) {
        const networks = assets.filter(function (asset) { return ['vpc', 'subnet'].includes(asset.type); });
        const validNetworks = networks.filter(function (asset) { return cidrRange(asset.properties.address); });

        networks.forEach(function (asset) {
            if (!cidrRange(asset.properties.address)) {
                findings.push(finding(
                    `cidr-${asset.id}`,
                    'high',
                    'Network',
                    `${asset.label} has an invalid or missing CIDR`,
                    `The modeled value “${asset.properties.address || 'empty'}” is not a valid IPv4 CIDR.`,
                    'Enter a valid IPv4 CIDR and confirm it matches the intended address plan.',
                    [asset.id]
                ));
            }

            if (asset.type === 'subnet') {
                const vpc = ancestorOfType(asset, 'vpc', assetMap);
                if (vpc && cidrRange(asset.properties.address) && cidrRange(vpc.properties.address) && !cidrContains(vpc.properties.address, asset.properties.address)) {
                    findings.push(finding(
                        `subnet-outside-vpc-${asset.id}`,
                        'high',
                        'Network',
                        `${asset.label} is outside ${vpc.label}`,
                        `${asset.properties.address} is not contained by ${vpc.properties.address}.`,
                        'Move the subnet into the VPC address range or correct the parent VPC CIDR.',
                        [vpc.id, asset.id]
                    ));
                }
                if (!asset.properties.subnet_type || !asset.properties.route_table) {
                    findings.push(finding(
                        `subnet-routing-${asset.id}`,
                        'low',
                        'Documentation',
                        `${asset.label} has incomplete routing facts`,
                        `${asset.properties.subnet_type ? 'Route table' : 'Public/private classification'} is not documented.`,
                        'Set the subnet classification and its route table so exposure and routing can be reviewed.',
                        [asset.id]
                    ));
                }
            }
        });

        for (let leftIndex = 0; leftIndex < validNetworks.length; leftIndex += 1) {
            for (let rightIndex = leftIndex + 1; rightIndex < validNetworks.length; rightIndex += 1) {
                const left = validNetworks[leftIndex];
                const right = validNetworks[rightIndex];
                if (left.type !== right.type || !cidrsOverlap(left.properties.address, right.properties.address)) continue;
                if (left.type === 'subnet') {
                    const leftVpc = ancestorOfType(left, 'vpc', assetMap);
                    const rightVpc = ancestorOfType(right, 'vpc', assetMap);
                    if (!leftVpc || !rightVpc || leftVpc.id !== rightVpc.id) continue;
                }
                const duplicate = left.properties.address === right.properties.address;
                findings.push(finding(
                    `${duplicate ? 'duplicate' : 'overlap'}-${left.id}-${right.id}`,
                    'high',
                    'Network',
                    duplicate ? `${left.label} duplicates ${right.label}` : `${left.label} overlaps ${right.label}`,
                    `${left.properties.address} and ${right.properties.address} use ${duplicate ? 'the same' : 'intersecting'} address space.`,
                    'Assign unique, non-overlapping CIDRs within the same network boundary.',
                    [left.id, right.id]
                ));
            }
        }
    }

    function addSecurityFindings(assets, connections, assetMap, findings) {
        const firewalls = assets.filter(function (asset) { return asset.type === 'firewall'; });
        if (hasInternetExposure(assets, connections) && firewalls.length === 0) {
            const exposedIds = assets.filter(function (asset) {
                return asset.type === 'internet' || publicSubnetFor(asset, assetMap);
            }).map(function (asset) { return asset.id; });
            findings.push(finding(
                'security-boundary-missing',
                'high',
                'Security',
                'Internet path has no modeled firewall or WAF',
                'The diagram includes an active internet relationship but no firewall security boundary.',
                'Add a firewall or WAF to the ingress path, or document the equivalent managed control.',
                exposedIds
            ));
        }

        assets.filter(function (asset) { return asset.type === 'database'; }).forEach(function (database) {
            const subnet = publicSubnetFor(database, assetMap);
            if (subnet) {
                findings.push(finding(
                    `public-database-${database.id}`,
                    'critical',
                    'Security',
                    `${database.label} is placed in a public subnet`,
                    `${database.label} inherits public placement from ${subnet.label}.`,
                    'Move the database to a private data subnet and permit only required application traffic.',
                    [subnet.id, database.id]
                ));
            }
        });

        const vpcs = assets.filter(function (asset) { return asset.type === 'vpc'; });
        if (vpcs.length > 0 && !assets.some(isFlowLogs)) {
            findings.push(finding(
                'flow-logs-missing',
                'medium',
                'Security',
                'Network flow logging is not modeled',
                'No VPC flow-log or equivalent network telemetry component is present.',
                'Add flow logging and identify its destination, retention, and review owner.',
                vpcs.map(function (asset) { return asset.id; })
            ));
        }
    }

    function addAvailabilityFindings(assets, connections, assetMap, findings) {
        const criticalWorkloads = assets.filter(function (asset) {
            return ['server', 'cluster', 'application', 'database', 'firewall', 'router'].includes(asset.type)
                && asset.properties.critical
                && Boolean(assetZone(asset, assetMap));
        });
        const criticalZones = new Set(criticalWorkloads.map(function (asset) {
            return assetZone(asset, assetMap);
        }).filter(Boolean));

        if (criticalWorkloads.length > 0 && criticalZones.size < 2) {
            findings.push(finding(
                'critical-single-zone',
                'high',
                'Availability',
                'Critical workloads use fewer than two zones',
                `Only ${criticalZones.size || 'no'} independent zone${criticalZones.size === 1 ? ' is' : 's are'} documented for critical services.`,
                'Place critical compute and data services in at least two independent failure domains.',
                criticalWorkloads.map(function (asset) { return asset.id; })
            ));
        }

        const databases = assets.filter(function (asset) { return asset.type === 'database' && asset.properties.critical; });
        const replicatedDatabaseIds = new Set();
        connections.filter(function (connection) { return connection.type === 'replication'; }).forEach(function (connection) {
            replicatedDatabaseIds.add(connection.source);
            replicatedDatabaseIds.add(connection.target);
        });
        if (databases.length === 1 && !databases[0].properties.redundant) {
            findings.push(finding(
                'database-single-instance',
                'high',
                'Availability',
                'Critical database has no standby or redundancy fact',
                `${databases[0].label} is the only critical database instance and is not marked redundant.`,
                'Add a standby or replica in another failure domain and model the replication relationship.',
                [databases[0].id]
            ));
        } else if (databases.length > 1 && !databases.every(function (asset) { return replicatedDatabaseIds.has(asset.id) || asset.properties.redundant; })) {
            findings.push(finding(
                'database-replication-missing',
                'high',
                'Availability',
                'Database replication is incomplete',
                'One or more critical database instances have no replication relationship or redundancy fact.',
                'Connect primary and standby databases with a typed replication relationship.',
                databases.map(function (asset) { return asset.id; })
            ));
        }

        const zones = assets.filter(function (asset) { return asset.type === 'availability-zone'; });
        const natGateways = assets.filter(isNatGateway);
        if (zones.length > 1 && natGateways.length === 1) {
            findings.push(finding(
                'nat-single-zone',
                'medium',
                'Availability',
                'A single NAT gateway serves multiple zones',
                `${natGateways[0].label} is the only modeled private egress path across ${zones.length} availability zones.`,
                'Add a NAT gateway per active zone and route each private subnet to its local gateway.',
                [natGateways[0].id].concat(zones.map(function (asset) { return asset.id; }))
            ));
        }

        const firewalls = assets.filter(function (asset) { return asset.type === 'firewall'; });
        if (firewalls.length === 1
            && firewalls[0].properties.critical
            && !firewalls[0].properties.redundant
            && !String(firewalls[0].catalog_id || '').includes('aws-waf')) {
            findings.push(finding(
                'firewall-single-instance',
                'medium',
                'Availability',
                'Firewall is a single point of failure',
                `${firewalls[0].label} is critical but has no redundancy fact.`,
                'Model an active/standby or scale-out firewall design across failure domains.',
                [firewalls[0].id]
            ));
        }
    }

    function addOperationsFindings(assets, connections, findings) {
        assets.forEach(function (asset) {
            if (!asset.is_container && connectionsFor(connections, asset.id).length === 0) {
                findings.push(finding(
                    `orphan-${asset.id}`,
                    'medium',
                    'Documentation',
                    `${asset.label} has no relationship`,
                    'The asset is present but has no modeled dependency or traffic path.',
                    'Connect the asset to its dependency or remove it from the architecture.',
                    [asset.id]
                ));
            }
            if (asset.properties.critical && ['server', 'cluster', 'application', 'database', 'firewall', 'router', 'switch', 'storage'].includes(asset.type) && !asset.properties.monitoring) {
                findings.push(finding(
                    `monitoring-${asset.id}`,
                    'medium',
                    'Operations',
                    `${asset.label} has no monitoring definition`,
                    'The asset is critical, but monitoring is not enabled or documented.',
                    'Record health, performance, log, alert, and escalation coverage for this asset.',
                    [asset.id]
                ));
            }
            if (asset.properties.critical && ['server', 'database', 'storage'].includes(asset.type) && !asset.properties.backup) {
                findings.push(finding(
                    `backup-${asset.id}`,
                    'medium',
                    'Operations',
                    `${asset.label} has no backup definition`,
                    'The critical stateful asset has no backup fact.',
                    'Document backup scope, retention, restore target, testing frequency, and ownership.',
                    [asset.id]
                ));
            }
        });

        connections.forEach(function (connection) {
            if (connection.type === 'network' && !connection.label) {
                findings.push(finding(
                    `generic-link-${connection.id}`,
                    'low',
                    'Documentation',
                    'Network relationship has no purpose label',
                    'A network relationship does not explain the traffic purpose.',
                    'Name the protocol, carrier, trust boundary, or traffic purpose.',
                    [connection.source, connection.target],
                    [connection.id]
                ));
            }
        });
    }

    function categoryScores(findings) {
        const scores = {};
        Object.keys(categoryWeights).forEach(function (category) {
            const deduction = findings.filter(function (item) { return item.category === category; }).reduce(function (total, item) {
                return total + severityDeductions[item.severity];
            }, 0);
            scores[category] = Math.max(0, 100 - deduction);
        });
        return scores;
    }

    function confidenceScore(assets, connections) {
        const applicableFacts = [];
        assets.forEach(function (asset) {
            applicableFacts.push(Boolean(asset.label), Boolean(asset.type), Array.isArray(asset.views) && asset.views.length > 0);
            if (['vpc', 'subnet'].includes(asset.type)) applicableFacts.push(Boolean(asset.properties.address));
            if (asset.type === 'subnet') applicableFacts.push(Boolean(asset.properties.subnet_type), Boolean(asset.properties.route_table));
            if (asset.properties.critical) applicableFacts.push(typeof asset.properties.monitoring === 'boolean');
        });
        connections.forEach(function (connection) {
            applicableFacts.push(Boolean(connection.source), Boolean(connection.target), Boolean(connection.type), Boolean(connection.label));
        });
        const documented = applicableFacts.filter(Boolean).length;
        return applicableFacts.length ? Math.round((documented / applicableFacts.length) * 100) : 0;
    }

    /**
     * Evaluates deterministic advisory findings and an explainable A-E grade.
     *
     * @param {object} project Normalized Studio project.
     * @returns {object} Grade, confidence, category scores, and open findings.
     */
    function evaluateProject(project) {
        const assets = Array.isArray(project && project.assets) ? project.assets : [];
        const connections = Array.isArray(project && project.connections) ? project.connections : [];

        if (assets.length === 0) {
            return {
                grade: null,
                grade_label: 'Not graded',
                score: null,
                confidence: 0,
                findings: [],
                category_scores: {},
                dimensions: {}
            };
        }

        const findings = [];
        const assetMap = new Map(assets.map(function (asset) { return [asset.id, asset]; }));
        addNetworkFindings(assets, assetMap, findings);
        addSecurityFindings(assets, connections, assetMap, findings);
        addAvailabilityFindings(assets, connections, assetMap, findings);
        addOperationsFindings(assets, connections, findings);

        const scores = categoryScores(findings);
        let score = Math.round(Object.keys(categoryWeights).reduce(function (total, category) {
            return total + (scores[category] * categoryWeights[category]);
        }, 0));
        if (findings.some(function (item) { return item.severity === 'critical'; })) score = Math.min(score, 69);
        else if (findings.some(function (item) { return item.severity === 'high'; })) score = Math.min(score, 89);
        const grade = gradeForScore(score);
        const dimensions = {};
        Object.keys(scores).forEach(function (category) { dimensions[category.toLowerCase()] = scores[category]; });

        return {
            grade: grade.grade,
            grade_label: grade.label,
            score,
            confidence: confidenceScore(assets, connections),
            findings,
            category_scores: scores,
            dimensions
        };
    }

    return { evaluateProject, cidrRange, cidrsOverlap, cidrContains };
}());

if (typeof globalThis !== 'undefined') globalThis.InfraStackStudioRules = InfraStackStudioRules;
if (typeof module !== 'undefined' && module.exports) module.exports = InfraStackStudioRules;
