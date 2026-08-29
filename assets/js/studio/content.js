// content.js
// Owns deterministic Studio Result analysis and guided Improvement plans.

// [studio-result] Section: Start

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

    function gradeForScore(score, grades = []) {
        const configured = grades.find(function (grade) { return score >= Number(grade.minimum_score); });
        if (configured) return { grade: configured.grade, label: configured.label };
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

    function catalogIdsFor(resultDefinition, conditionType) {
        const rule = (resultDefinition?.rules || []).find(function (item) {
            return item?.condition?.type === conditionType;
        });
        return Array.isArray(rule?.condition?.catalog_ids) ? rule.condition.catalog_ids : [];
    }

    function isNatGateway(asset, resultDefinition) {
        return catalogIdsFor(resultDefinition, 'single_nat_multiple_zones').includes(asset.catalog_id)
            || String(asset.catalog_id || '').includes('nat-gateway')
            || /nat gateway/i.test(asset.label || '');
    }

    function isFlowLogs(asset, resultDefinition) {
        return catalogIdsFor(resultDefinition, 'missing_network_flow_logs').includes(asset.catalog_id)
            || String(asset.catalog_id || '').includes('flow-logs')
            || /flow logs/i.test(asset.label || '');
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

    function addSecurityFindings(assets, connections, assetMap, findings, resultDefinition) {
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
        if (vpcs.length > 0 && !assets.some(function (asset) { return isFlowLogs(asset, resultDefinition); })) {
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

    function addAvailabilityFindings(assets, connections, assetMap, findings, resultDefinition) {
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
        const natGateways = assets.filter(function (asset) { return isNatGateway(asset, resultDefinition); });
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

    function addKubernetesFindings(assets, connections, assetMap, findings) {
        const kubernetesAssets = assets.filter(function (asset) {
            return asset.properties.provider === 'kubernetes'
                || String(asset.catalog_id || '').startsWith('kubernetes-')
                || asset.type.startsWith('kubernetes-');
        });
        if (!kubernetesAssets.length) return;
        const workloadTypes = new Set([
            'kubernetes-pod', 'kubernetes-deployment', 'kubernetes-statefulset',
            'kubernetes-daemonset', 'kubernetes-job', 'kubernetes-cronjob'
        ]);
        const scalableTypes = new Set(['kubernetes-deployment', 'kubernetes-statefulset']);
        const workloads = kubernetesAssets.filter(function (asset) { return workloadTypes.has(asset.type); });
        workloads.forEach(function (asset) {
            if (asset.properties.critical && scalableTypes.has(asset.type) && asset.properties.replicas < 2) {
                findings.push(finding(
                    `kubernetes-replicas-${asset.id}`,
                    'high',
                    'Availability',
                    `${asset.label} has fewer than two replicas`,
                    'The workload is marked critical but its modeled replica count does not tolerate one Pod becoming unavailable.',
                    'Use at least two replicas and distribute them across independent failure domains where the workload permits it.',
                    [asset.id]
                ));
            }
            if (!asset.properties.cpu || !asset.properties.memory || !asset.properties.cpu_limit || !asset.properties.memory_limit) {
                findings.push(finding(
                    `kubernetes-resources-${asset.id}`,
                    'medium',
                    'Workload',
                    `${asset.label} has incomplete resource controls`,
                    'CPU or memory requests and limits are not fully documented for this workload.',
                    'Document CPU and memory requests and limits so scheduling and resource isolation can be reviewed.',
                    [asset.id]
                ));
            }
            if (scalableTypes.has(asset.type) && (!asset.properties.readiness_probe || !asset.properties.liveness_probe)) {
                findings.push(finding(
                    `kubernetes-probes-${asset.id}`,
                    'medium',
                    'Workload',
                    `${asset.label} has incomplete health probes`,
                    'Readiness or liveness behavior is not fully documented.',
                    'Model separate readiness and liveness probes that reflect whether the workload can receive traffic and make progress.',
                    [asset.id]
                ));
            }
            if (asset.properties.critical && asset.type === 'kubernetes-deployment' && !asset.properties.autoscaling) {
                findings.push(finding(
                    `kubernetes-autoscaling-${asset.id}`,
                    'medium',
                    'Availability',
                    `${asset.label} has no autoscaling fact`,
                    'The critical stateless workload has no modeled horizontal scaling control.',
                    'Document a HorizontalPodAutoscaler or record why fixed capacity is intentional.',
                    [asset.id]
                ));
            }
            if (asset.properties.critical && scalableTypes.has(asset.type) && !asset.properties.disruption_budget) {
                findings.push(finding(
                    `kubernetes-pdb-${asset.id}`,
                    'medium',
                    'Availability',
                    `${asset.label} has no disruption budget`,
                    'Voluntary disruption tolerance is not documented for this critical workload.',
                    'Add a PodDisruptionBudget that reflects the workload replica count and maintenance requirements.',
                    [asset.id]
                ));
            }
            if (!asset.properties.service_account || asset.properties.service_account.toLowerCase() === 'default') {
                findings.push(finding(
                    `kubernetes-service-account-${asset.id}`,
                    'medium',
                    'Security',
                    `${asset.label} has no dedicated service account`,
                    'The workload uses the default identity or has no workload identity documented.',
                    'Assign a dedicated ServiceAccount and bind only the API permissions required by this workload.',
                    [asset.id]
                ));
            }
        });
        kubernetesAssets.filter(function (asset) { return asset.type === 'kubernetes-namespace'; }).forEach(function (namespace) {
            if (!namespace.properties.network_policy) {
                findings.push(finding(
                    `kubernetes-network-policy-${namespace.id}`,
                    'high',
                    'Network',
                    `${namespace.label} has no default network policy`,
                    'The namespace has no modeled default traffic isolation.',
                    'Document default-deny ingress and egress policies, then add explicit workload traffic allowances.',
                    [namespace.id]
                ));
            }
            if (!['baseline', 'restricted'].includes(namespace.properties.pod_security_level)) {
                findings.push(finding(
                    `kubernetes-pod-security-${namespace.id}`,
                    'high',
                    'Security',
                    `${namespace.label} has no protective Pod Security level`,
                    'The namespace is not modeled with the Baseline or Restricted Pod Security standard.',
                    'Apply and document an appropriate Baseline or Restricted Pod Security level.',
                    [namespace.id]
                ));
            }
        });
        kubernetesAssets.filter(function (asset) { return asset.type === 'kubernetes-service'; }).forEach(function (service) {
            if (!['NodePort', 'LoadBalancer'].includes(service.properties.service_type)) return;
            const related = connectionsFor(connections, service.id);
            const hasGateway = related.some(function (connection) {
                const otherId = connection.source === service.id ? connection.target : connection.source;
                const other = assetMap.get(otherId);
                return other && ['kubernetes-gateway', 'kubernetes-ingress'].includes(other.type);
            });
            if (!hasGateway) {
                findings.push(finding(
                    `kubernetes-public-service-${service.id}`,
                    'high',
                    'Network',
                    `${service.label} exposes traffic without a modeled gateway`,
                    `The ${service.properties.service_type} Service has no direct relationship to a Gateway or Ingress control.`,
                    'Route public application traffic through a documented Gateway or Ingress implementation and its security controls.',
                    [service.id]
                ));
            }
        });
        kubernetesAssets.filter(function (asset) { return asset.type === 'kubernetes-statefulset'; }).forEach(function (statefulSet) {
            const hasStorage = connectionsFor(connections, statefulSet.id).some(function (connection) {
                const otherId = connection.source === statefulSet.id ? connection.target : connection.source;
                const other = assetMap.get(otherId);
                return other && ['kubernetes-pvc', 'kubernetes-pv'].includes(other.type);
            });
            if (!hasStorage) {
                findings.push(finding(
                    `kubernetes-stateful-storage-${statefulSet.id}`,
                    'high',
                    'Availability',
                    `${statefulSet.label} has no persistent storage relationship`,
                    'The StatefulSet has no modeled PersistentVolumeClaim or PersistentVolume dependency.',
                    'Connect the StatefulSet to its persistent storage and document the StorageClass and failure-domain behavior.',
                    [statefulSet.id]
                ));
            }
            if (statefulSet.properties.critical && !statefulSet.properties.backup) {
                findings.push(finding(
                    `kubernetes-stateful-backup-${statefulSet.id}`,
                    'high',
                    'Operations',
                    `${statefulSet.label} has no backup fact`,
                    'The critical stateful workload has no modeled backup and restore coverage.',
                    'Document backup scope, retention, restore testing, and ownership for the persistent data.',
                    [statefulSet.id]
                ));
            }
        });
        const hasMetrics = kubernetesAssets.some(function (asset) { return asset.type === 'kubernetes-monitoring'; });
        const hasLogging = kubernetesAssets.some(function (asset) { return asset.type === 'kubernetes-logging'; });
        if (!hasMetrics || !hasLogging) {
            findings.push(finding(
                'kubernetes-observability-missing',
                'medium',
                'Operations',
                'Kubernetes observability coverage is incomplete',
                `${hasMetrics ? 'Central logging' : hasLogging ? 'Metrics and alerting' : 'Metrics, alerting, and central logging'} is not modeled.`,
                'Add cluster and workload metrics, alerts, and centralized logs with clear operational ownership.',
                kubernetesAssets.filter(function (asset) { return asset.type === 'kubernetes-cluster'; }).map(function (asset) { return asset.id; })
            ));
        }
    }

    function categoryScores(findings, resultDefinition) {
        const configuredWeights = {};
        (resultDefinition?.categories || []).forEach(function (category) {
            if (category?.label && Number.isFinite(Number(category.weight))) configuredWeights[category.label] = Number(category.weight);
        });
        const weights = Object.keys(configuredWeights).length ? configuredWeights : categoryWeights;
        const scores = {};
        Object.keys(weights).forEach(function (category) {
            const deduction = findings.filter(function (item) { return item.category === category; }).reduce(function (total, item) {
                return total + (Number.isFinite(Number(item.score_deduction)) ? Number(item.score_deduction) : severityDeductions[item.severity]);
            }, 0);
            scores[category] = Math.max(0, 100 - deduction);
        });
        return scores;
    }

    function conditionTypeForFinding(findingId) {
        if (findingId.startsWith('cidr-')) return 'invalid_network_cidr';
        if (findingId.startsWith('subnet-outside-vpc-')) return 'subnet_outside_network';
        if (findingId.startsWith('duplicate-') || findingId.startsWith('overlap-')) return 'overlapping_networks';
        if (findingId.startsWith('subnet-routing-')) return 'incomplete_subnet_routing';
        if (findingId === 'security-boundary-missing') return 'internet_without_security_boundary';
        if (findingId.startsWith('public-database-')) return 'database_in_public_subnet';
        if (findingId === 'flow-logs-missing') return 'missing_network_flow_logs';
        if (findingId === 'critical-single-zone') return 'critical_workloads_single_zone';
        if (findingId === 'database-single-instance') return 'critical_database_single_instance';
        if (findingId === 'database-replication-missing') return 'critical_database_replication_missing';
        if (findingId === 'nat-single-zone') return 'single_nat_multiple_zones';
        if (findingId === 'firewall-single-instance') return 'critical_firewall_not_redundant';
        if (findingId.startsWith('orphan-')) return 'orphan_asset';
        if (findingId.startsWith('monitoring-')) return 'critical_asset_without_monitoring';
        if (findingId.startsWith('backup-')) return 'critical_stateful_asset_without_backup';
        if (findingId.startsWith('generic-link-')) return 'unlabeled_network_relationship';
        if (findingId.startsWith('kubernetes-replicas-')) return 'kubernetes_critical_workload_single_replica';
        if (findingId.startsWith('kubernetes-resources-')) return 'kubernetes_workload_without_resources';
        if (findingId.startsWith('kubernetes-probes-')) return 'kubernetes_workload_without_probes';
        if (findingId.startsWith('kubernetes-autoscaling-')) return 'kubernetes_critical_workload_without_autoscaling';
        if (findingId.startsWith('kubernetes-pdb-')) return 'kubernetes_critical_workload_without_pdb';
        if (findingId.startsWith('kubernetes-service-account-')) return 'kubernetes_workload_without_service_account';
        if (findingId.startsWith('kubernetes-network-policy-')) return 'kubernetes_namespace_without_network_policy';
        if (findingId.startsWith('kubernetes-pod-security-')) return 'kubernetes_namespace_without_pod_security';
        if (findingId.startsWith('kubernetes-public-service-')) return 'kubernetes_public_service_without_gateway';
        if (findingId.startsWith('kubernetes-stateful-storage-')) return 'kubernetes_statefulset_without_storage';
        if (findingId.startsWith('kubernetes-stateful-backup-')) return 'kubernetes_statefulset_without_backup';
        if (findingId === 'kubernetes-observability-missing') return 'kubernetes_cluster_without_observability';
        return null;
    }

    function applyResultRules(findings, resultDefinition) {
        if (!Array.isArray(resultDefinition?.rules)) return findings;
        const rulesByCondition = new Map(resultDefinition.rules.map(function (rule) {
            return [rule?.condition?.type, rule];
        }));
        return findings.map(function (item) {
            const rule = rulesByCondition.get(conditionTypeForFinding(item.id));
            if (!rule) return null;
            return {
                ...item,
                rule_id: rule.id,
                category: rule.category,
                severity: rule.severity,
                score_deduction: Number(rule.score_deduction),
                title: rule.message,
                recommendation: rule.recommendation,
                reference_ids: Array.isArray(rule.reference_ids) ? rule.reference_ids : []
            };
        }).filter(Boolean);
    }

    function confidenceScore(assets, connections) {
        const applicableFacts = [];
        assets.forEach(function (asset) {
            applicableFacts.push(Boolean(asset.label), Boolean(asset.type), Array.isArray(asset.views) && asset.views.length > 0);
            if (['vpc', 'subnet'].includes(asset.type)) applicableFacts.push(Boolean(asset.properties.address));
            if (asset.type === 'subnet') applicableFacts.push(Boolean(asset.properties.subnet_type), Boolean(asset.properties.route_table));
            if (asset.properties.critical) applicableFacts.push(typeof asset.properties.monitoring === 'boolean');
            if (asset.type.startsWith('kubernetes-')) {
                if (/pod|deployment|statefulset|daemonset|job|cronjob/.test(asset.type)) {
                    applicableFacts.push(Boolean(asset.properties.image_reference), Boolean(asset.properties.cpu), Boolean(asset.properties.memory));
                }
                if (asset.type === 'kubernetes-namespace') {
                    applicableFacts.push(Boolean(asset.properties.pod_security_level), typeof asset.properties.network_policy === 'boolean');
                }
            }
        });
        connections.forEach(function (connection) {
            applicableFacts.push(Boolean(connection.source), Boolean(connection.target), Boolean(connection.type), Boolean(connection.label));
        });
        const documented = applicableFacts.filter(Boolean).length;
        return applicableFacts.length ? Math.round((documented / applicableFacts.length) * 100) : 0;
    }

    /**
     * Evaluates deterministic result findings and an explainable grade.
     *
     * @param {object} project Normalized Studio project.
     * @param {object|null} [resultDefinition] Provider package result rules.
     * @returns {object} Grade, confidence, category scores, and open findings.
     */
    function evaluateProject(project, resultDefinition = null) {
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
        addSecurityFindings(assets, connections, assetMap, findings, resultDefinition);
        addAvailabilityFindings(assets, connections, assetMap, findings, resultDefinition);
        addOperationsFindings(assets, connections, findings);
        addKubernetesFindings(assets, connections, assetMap, findings);

        const configuredFindings = applyResultRules(findings, resultDefinition);
        const scores = categoryScores(configuredFindings, resultDefinition);
        const configuredWeights = {};
        (resultDefinition?.categories || []).forEach(function (category) {
            if (category?.label && Number.isFinite(Number(category.weight))) configuredWeights[category.label] = Number(category.weight);
        });
        const weights = Object.keys(configuredWeights).length ? configuredWeights : categoryWeights;
        let score = Math.round(Object.keys(weights).reduce(function (total, category) {
            return total + (scores[category] * weights[category]);
        }, 0));
        if (configuredFindings.some(function (item) { return item.severity === 'critical'; })) score = Math.min(score, Number(resultDefinition?.grade_caps?.critical ?? 69));
        else if (configuredFindings.some(function (item) { return item.severity === 'high'; })) score = Math.min(score, Number(resultDefinition?.grade_caps?.high ?? 89));
        const grade = gradeForScore(score, resultDefinition?.grades);
        const dimensions = {};
        Object.keys(scores).forEach(function (category) { dimensions[category.toLowerCase()] = scores[category]; });

        return {
            grade: grade.grade,
            grade_label: grade.label,
            score,
            confidence: confidenceScore(assets, connections),
            findings: configuredFindings,
            category_scores: scores,
            dimensions
        };
    }

    return { evaluateProject, cidrRange, cidrsOverlap, cidrContains };
}());

// [studio-result] Section: End

// [studio-improvements] Section: Start


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
        return rules.evaluateProject(applyPlan(project, improvement, core, options).project, options.resultDefinition || null);
    }

    return { buildPlan, applyPlan, previewPlan };
}());

// [studio-improvements] Section: End


export { InfraStackStudioImprovements as improvements, InfraStackStudioRules as rules };
