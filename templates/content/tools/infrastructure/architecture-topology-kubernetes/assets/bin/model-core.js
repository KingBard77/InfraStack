// model-core.js
(function (global) {
    const defaults = {
        prompt: 'Create a Kubernetes topology with one managed control plane, three worker nodes, kubelet and kube-proxy on each node, frontend and API workloads, ClusterIP Services, ingress at the edge, NetworkPolicy boundaries, persistent storage, and platform observability.',
        preset: 'cluster',
        clusterProfile: 'managed-regional',
        environment: 'Staging',
        showControlPlane: true,
        namespace: 'platform',
        serviceType: 'ClusterIP',
        ingressMode: 'ingress-controller',
        workerCount: 3,
        podGroups: 3,
        replicaTarget: 3,
        nodeRuntime: 'containerd',
        workloads: ['frontend', 'api', 'worker'],
        objects: ['Deployment', 'Service', 'Ingress'],
        showNetworkPolicy: true,
        showStorage: true,
        showObservability: true,
        zoom: 100,
        selectedCardId: '',
        selectedConnectorId: '',
        highlightedCardIds: [],
        layoutOverrides: {},
        connectorOverrides: {},
    };

    const presetLabels = {
        cluster: 'Cluster Topology',
        traffic: 'Traffic Flow',
        workload: 'Workload Placement',
        platform: 'Platform Services',
    };

    const profileLabels = {
        'managed-regional': 'Managed Regional',
        'self-managed': 'Self Managed',
        'edge-small': 'Edge Small',
        'multi-tenant': 'Multi Tenant',
    };

    const ingressLabels = {
        'ingress-controller': 'Ingress Controller',
        'gateway-api': 'Gateway API',
        'service-mesh': 'Service Mesh',
    };

    const runtimeLabels = {
        containerd: 'containerd',
        'cri-o': 'CRI-O',
        mixed: 'Mixed Runtime',
    };
    const diagramWidth = 1180;
    const defaultDiagramHeight = 820;
    const controlPlaneDetailOffset = 42;

    function resolveLayoutMetrics(state) {
        const workerCount = Math.max(1, Math.min(6, state.workerCount));
        const workerColumns = workerCount <= 3 ? workerCount : (workerCount === 4 ? 4 : 3);
        const workerRows = Math.ceil(workerCount / workerColumns);
        const workerWidth = workerColumns >= 4 ? 264 : 312;
        const workerGap = workerColumns >= 4 ? 24 : 38;
        const workerHeight = 232;
        const workerRowGap = 52;
        const workerTotalWidth = workerColumns * workerWidth + (workerColumns - 1) * workerGap;
        const workerStartX = Math.max(48, Math.round((diagramWidth - workerTotalWidth) / 2));
        const workerStartY = state.showControlPlane ? 300 + controlPlaneDetailOffset : 112;
        const serviceY = workerStartY + workerRows * workerHeight + (workerRows - 1) * workerRowGap + 82;
        const lowerLaneY = serviceY + 116;

        return {
            workerCount,
            workerColumns,
            workerRows,
            workerWidth,
            workerGap,
            workerHeight,
            workerRowGap,
            workerStartX,
            workerStartY,
            serviceY,
            lowerLaneY,
        };
    }

    function toStringValue(value, fallback) {
        const next = typeof value === 'string' ? value.trim() : '';

        return next || fallback;
    }

    function toBooleanValue(value, fallback) {
        if (typeof value === 'boolean') {
            return value;
        }

        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }

        return fallback;
    }

    function clampNumber(value, fallback, min, max) {
        const next = Number(value);

        if (!Number.isFinite(next)) {
            return fallback;
        }

        return Math.max(min, Math.min(max, Math.round(next)));
    }

    function normalizeList(value, fallback) {
        const source = Array.isArray(value) ? value : String(value || '').split(/\r?\n|,/);
        const normalized = source
            .map((item) => String(item || '').trim())
            .filter(Boolean)
            .slice(0, 8);

        return normalized.length ? normalized : fallback.slice();
    }

    function normalizeMap(value) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return {};
        }

        return Object.keys(value).reduce((accumulator, key) => {
            const item = value[key];

            if (item && typeof item === 'object') {
                accumulator[key] = Object.assign({}, item);
            }

            return accumulator;
        }, {});
    }

    function pickAllowed(value, labels, fallback) {
        const normalized = toStringValue(value, fallback);

        return Object.prototype.hasOwnProperty.call(labels, normalized) ? normalized : fallback;
    }

    function buildControlPlaneNodes(state) {
        if (!state.showControlPlane) {
            return [];
        }

        return [
            {
                id: 'control-plane',
                component: 'Control plane',
                placement: profileLabels[state.clusterProfile],
                purpose: 'Cluster API and scheduling authority',
                kind: 'Boundary',
                x: 70,
                y: 78,
                width: 1040,
                height: 198,
                tone: 'control',
            },
            {
                id: 'api-server',
                component: 'kube-apiserver',
                placement: 'Control plane',
                purpose: 'Kubernetes API front door',
                kind: 'Control',
                x: 110,
                y: 170,
                width: 206,
                height: 70,
                tone: 'control',
            },
            {
                id: 'etcd',
                component: 'etcd',
                placement: 'Control plane',
                purpose: 'Cluster state store',
                kind: 'Control',
                x: 338,
                y: 170,
                width: 174,
                height: 70,
                tone: 'data',
            },
            {
                id: 'scheduler',
                component: 'kube-scheduler',
                placement: 'Control plane',
                purpose: 'Pod placement decisions',
                kind: 'Control',
                x: 550,
                y: 170,
                width: 206,
                height: 70,
                tone: 'control',
            },
            {
                id: 'controller-manager',
                component: 'controller manager',
                placement: 'Control plane',
                purpose: 'Reconciliation loops',
                kind: 'Control',
                x: 790,
                y: 170,
                width: 246,
                height: 70,
                tone: 'control',
            },
        ];
    }

    function buildWorkerNodes(state) {
        const metrics = resolveLayoutMetrics(state);
        const workerCount = metrics.workerCount;
        const workerWidth = metrics.workerWidth;
        const workloadLabels = state.workloads.slice(0, state.podGroups);
        const nodes = [];

        for (let index = 0; index < workerCount; index += 1) {
            const column = index % metrics.workerColumns;
            const row = Math.floor(index / metrics.workerColumns);
            const x = metrics.workerStartX + column * (workerWidth + metrics.workerGap);
            const y = metrics.workerStartY + row * (metrics.workerHeight + metrics.workerRowGap);
            const workerId = `worker-${index + 1}`;
            const workload = workloadLabels[index % workloadLabels.length] || `workload-${index + 1}`;

            nodes.push({
                id: workerId,
                component: `Worker node ${index + 1}`,
                placement: state.environment,
                purpose: `${runtimeLabels[state.nodeRuntime]} node with kubelet and kube-proxy`,
                kind: 'Node',
                x,
                y,
                width: workerWidth,
                height: metrics.workerHeight,
                tone: 'worker',
            });
            nodes.push({
                id: `${workerId}-agents`,
                component: 'kubelet / kube-proxy',
                placement: `Worker node ${index + 1}`,
                purpose: 'Node agent and network proxy',
                kind: 'Agent',
                x: x + 18,
                y: y + 58,
                width: workerWidth - 36,
                height: 72,
                tone: 'agent',
            });
            nodes.push({
                id: `${workerId}-pods`,
                component: `${workload} Pods`,
                placement: `Namespace ${state.namespace}`,
                purpose: `${state.replicaTarget} target replicas`,
                kind: 'Pod group',
                x: x + 18,
                y: y + 150,
                width: workerWidth - 36,
                height: 66,
                tone: 'pod',
            });
        }

        return nodes;
    }

    function buildServiceNodes(state) {
        const metrics = resolveLayoutMetrics(state);
        const serviceCenterY = metrics.serviceY;
        const lowerLaneY = metrics.lowerLaneY;
        const nodes = [
            {
                id: 'ingress',
                component: ingressLabels[state.ingressMode],
                placement: 'Cluster edge',
                purpose: 'North-south entry path',
                kind: 'Ingress',
                x: 162,
                y: serviceCenterY,
                width: 230,
                height: 76,
                tone: 'edge',
            },
            {
                id: 'service',
                component: `${state.serviceType} Service`,
                placement: `Namespace ${state.namespace}`,
                purpose: 'Stable access to selected Pods',
                kind: 'Service',
                x: 474,
                y: serviceCenterY,
                width: 232,
                height: 76,
                tone: 'service',
            },
        ];

        if (state.showNetworkPolicy) {
            nodes.push({
                id: 'network-policy',
                component: 'NetworkPolicy',
                placement: `Namespace ${state.namespace}`,
                purpose: 'Pod communication boundary to review',
                kind: 'Policy',
                x: 788,
                y: serviceCenterY,
                width: 230,
                height: 76,
                tone: 'policy',
            });
        }

        if (state.showStorage) {
            nodes.push({
                id: 'storage',
                component: 'Persistent storage',
                placement: 'Storage class / PVC',
                purpose: 'Stateful workload storage lane',
                kind: 'Storage',
                x: 216,
                y: lowerLaneY,
                width: 276,
                height: 68,
                tone: 'data',
            });
        }

        if (state.showObservability) {
            nodes.push({
                id: 'observability',
                component: 'Observability',
                placement: 'Logs, metrics, events',
                purpose: 'Operations review lane',
                kind: 'Operations',
                x: 686,
                y: lowerLaneY,
                width: 276,
                height: 68,
                tone: 'ops',
            });
        }

        return nodes;
    }

    function buildConnectors(state, nodes) {
        const has = (id) => nodes.some((node) => node.id === id);
        const workerIds = nodes.filter((node) => /^worker-\d+$/.test(node.id)).map((node) => node.id);
        const metrics = resolveLayoutMetrics(state);
        const connectors = [];

        if (has('api-server')) {
            workerIds.forEach((workerId) => {
                connectors.push({
                    id: `api-to-${workerId}`,
                    source: 'api-server',
                    target: workerId,
                    label: 'control',
                    purpose: 'Control plane to node agent path',
                    sourceRatio: { x: 0.5, y: 1 },
                    targetRatio: { x: 0.5, y: 0 },
                });
            });
        }

        connectors.push({
            id: 'ingress-to-service',
            source: 'ingress',
            target: 'service',
            label: 'routes',
            purpose: 'External HTTP or gateway path into the Service layer',
            sourceRatio: { x: 1, y: 0.5 },
            targetRatio: { x: 0, y: 0.5 },
        });

        workerIds.forEach((workerId) => {
            connectors.push({
                id: `service-to-${workerId}-pods`,
                source: 'service',
                target: `${workerId}-pods`,
                label: 'selects',
                purpose: 'Service selector path to Pod group',
                sourceRatio: { x: 0.5, y: 0 },
                targetRatio: { x: 0.5, y: 1 },
                bend: {
                    x: 590,
                    y: Math.max(metrics.workerStartY + metrics.workerHeight + 26, metrics.serviceY - 52),
                },
            });
        });

        if (state.showNetworkPolicy && has('network-policy')) {
            workerIds.forEach((workerId) => {
                connectors.push({
                    id: `policy-to-${workerId}-pods`,
                    source: 'network-policy',
                    target: `${workerId}-pods`,
                    label: 'guards',
                    purpose: 'Policy review relationship to Pod communication',
                    sourceRatio: { x: 0.5, y: 0 },
                    targetRatio: { x: 0.5, y: 1 },
                    bend: {
                        x: 806,
                        y: Math.max(metrics.workerStartY + metrics.workerHeight + 36, metrics.serviceY - 42),
                    },
                });
            });
        }

        if (state.showStorage && has('storage')) {
            connectors.push({
                id: 'storage-to-service',
                source: 'storage',
                target: 'service',
                label: 'claims',
                purpose: 'PersistentVolumeClaim review lane',
                sourceRatio: { x: 1, y: 0.5 },
                targetRatio: { x: 0.5, y: 1 },
                bend: {
                    x: 590,
                    y: metrics.lowerLaneY - 28,
                },
            });
        }

        if (state.showObservability && has('observability')) {
            connectors.push({
                id: 'observability-to-service',
                source: 'observability',
                target: 'service',
                label: 'signals',
                purpose: 'Logs, metrics, and events review lane',
                sourceRatio: { x: 0, y: 0.5 },
                targetRatio: { x: 0.5, y: 1 },
                bend: {
                    x: 590,
                    y: metrics.lowerLaneY - 28,
                },
            });
        }

        return connectors;
    }

    function collectKeywords(prompt) {
        const terms = ['control plane', 'worker', 'pod', 'service', 'ingress', 'gateway', 'networkpolicy', 'storage', 'observability', 'replica', 'namespace'];
        const lowerPrompt = prompt.toLowerCase();

        return terms.filter((term) => lowerPrompt.includes(term));
    }

    function buildNotes(state, nodes) {
        const keywords = collectKeywords(state.prompt);
        const warnings = [];

        if (!state.showNetworkPolicy) {
            warnings.push('NetworkPolicy lane is hidden; review Pod communication separately.');
        }

        if (state.workerCount < 2) {
            warnings.push('Single-worker topology has limited placement resilience.');
        }

        if (state.serviceType === 'NodePort') {
            warnings.push('NodePort exposure needs explicit node-edge routing review.');
        }

        return {
            promptSummary: state.prompt,
            keywords: keywords.length ? keywords : ['cluster', 'worker', 'service'],
            assumptions: [
                `${profileLabels[state.clusterProfile]} profile is modeled as a planning boundary.`,
                `${state.workerCount} worker node${state.workerCount === 1 ? '' : 's'} and ${state.podGroups} Pod group${state.podGroups === 1 ? '' : 's'} are shown.`,
                `${state.serviceType} is treated as the selected Service exposure model.`,
            ],
            modelItems: nodes.map((node) => `${node.component} - ${node.kind}`),
            pros: [
                'Control plane, worker nodes, Services, and optional lanes stay visible in one state model.',
                'JSON keeps controls, output, and layout edits restorable.',
            ],
            cons: [
                'The diagram does not inspect live API server objects.',
                'Capacity, security, and readiness still need environment validation.',
            ],
            pillars: [
                { label: 'Topology clarity', value: state.showControlPlane ? 'Strong' : 'Needs context', note: 'Control plane visibility changes reviewer context.' },
                { label: 'Traffic path', value: state.serviceType, note: `${ingressLabels[state.ingressMode]} feeds the Service layer.` },
                { label: 'Operations', value: state.showObservability ? 'Visible' : 'Hidden', note: 'Logs, metrics, and events lane is optional.' },
                { label: 'Policy', value: state.showNetworkPolicy ? 'Visible' : 'Hidden', note: 'NetworkPolicy is a review lane, not a guarantee.' },
            ],
            risk: {
                level: warnings.length > 1 ? 'Review Needed' : 'Planning Ready',
                copy: warnings.length ? warnings.join(' ') : 'No major planning warnings from the selected topology controls.',
                warnings,
            },
        };
    }

    function resolveNodeIconKeys(node) {
        if (!node || typeof node !== 'object') {
            return [];
        }

        if (node.id === 'control-plane') {
            return ['controlPlane'];
        }

        if (node.id === 'api-server') {
            return ['apiServer'];
        }

        if (node.id === 'etcd') {
            return ['etcd'];
        }

        if (node.id === 'scheduler') {
            return ['scheduler'];
        }

        if (node.id === 'controller-manager') {
            return ['controllerManager'];
        }

        if (/^worker-\d+$/.test(node.id)) {
            return ['node'];
        }

        if (/^worker-\d+-agents$/.test(node.id)) {
            return ['kubelet', 'kubeProxy'];
        }

        if (/^worker-\d+-pods$/.test(node.id)) {
            return ['deployment', 'pod'];
        }

        return {
            ingress: ['ingress'],
            service: ['service'],
            'network-policy': ['networkPolicy'],
            storage: ['persistentVolume'],
            observability: ['group'],
        }[node.id] || ['pod'];
    }

    function attachNodeIcons(node) {
        return Object.assign({}, node, {
            iconKeys: resolveNodeIconKeys(node),
        });
    }

    /**
     * Normalizes raw Kubernetes topology state into a stable runtime schema.
     *
     * @param {object} rawState Raw state from controls, URL, or JSON restore.
     * @returns {object} Normalized Kubernetes topology state.
     */
    function normalizeKubernetesTopologyState(rawState) {
        const source = rawState && typeof rawState === 'object' ? rawState : {};

        return {
            prompt: toStringValue(source.prompt || source.input, defaults.prompt),
            preset: pickAllowed(source.preset || source.viewpoint, presetLabels, defaults.preset),
            clusterProfile: pickAllowed(source.clusterProfile || source.profile, profileLabels, defaults.clusterProfile),
            environment: toStringValue(source.environment, defaults.environment),
            showControlPlane: toBooleanValue(source.showControlPlane, defaults.showControlPlane),
            namespace: toStringValue(source.namespace, defaults.namespace),
            serviceType: ['ClusterIP', 'NodePort', 'LoadBalancer', 'Gateway API'].includes(source.serviceType) ? source.serviceType : defaults.serviceType,
            ingressMode: pickAllowed(source.ingressMode, ingressLabels, defaults.ingressMode),
            workerCount: clampNumber(source.workerCount, defaults.workerCount, 1, 6),
            podGroups: clampNumber(source.podGroups, defaults.podGroups, 1, 8),
            replicaTarget: clampNumber(source.replicaTarget, defaults.replicaTarget, 1, 12),
            nodeRuntime: pickAllowed(source.nodeRuntime, runtimeLabels, defaults.nodeRuntime),
            workloads: normalizeList(source.workloads, defaults.workloads),
            objects: normalizeList(source.objects, defaults.objects),
            showNetworkPolicy: toBooleanValue(source.showNetworkPolicy, defaults.showNetworkPolicy),
            showStorage: toBooleanValue(source.showStorage, defaults.showStorage),
            showObservability: toBooleanValue(source.showObservability, defaults.showObservability),
            zoom: clampNumber(source.zoom, defaults.zoom, 50, 160),
            selectedCardId: toStringValue(source.selectedCardId, defaults.selectedCardId),
            selectedConnectorId: toStringValue(source.selectedConnectorId, defaults.selectedConnectorId),
            highlightedCardIds: normalizeList(source.highlightedCardIds, defaults.highlightedCardIds),
            layoutOverrides: normalizeMap(source.layoutOverrides || source.layout_overrides),
            connectorOverrides: normalizeMap(source.connectorOverrides || source.connector_overrides),
        };
    }

    /**
     * Builds the generated Kubernetes topology model from normalized state.
     *
     * @param {object} rawState Raw or normalized topology state.
     * @returns {object} Generated model with nodes, connectors, notes, and inventory.
     */
    function buildKubernetesTopologyModel(rawState) {
        const state = normalizeKubernetesTopologyState(rawState);
        const nodes = [
            ...buildControlPlaneNodes(state),
            ...buildWorkerNodes(state),
            ...buildServiceNodes(state),
        ].map(attachNodeIcons);
        const connectors = buildConnectors(state, nodes);
        const notes = buildNotes(state, nodes);
        const maxNodeBottom = nodes.reduce((maximum, node) => Math.max(maximum, node.y + node.height), 0);
        const diagramHeight = Math.max(defaultDiagramHeight, Math.ceil((maxNodeBottom + 96) / 20) * 20);

        return {
            tool: 'architecture-topology-kubernetes',
            version: 1,
            diagram: {
                width: diagramWidth,
                height: diagramHeight,
            },
            state,
            labels: {
                preset: presetLabels[state.preset],
                clusterProfile: profileLabels[state.clusterProfile],
                ingress: ingressLabels[state.ingressMode],
                runtime: runtimeLabels[state.nodeRuntime],
            },
            nodes,
            connectors,
            inventory: nodes.map((node, index) => ({
                id: String(index + 1),
                nodeId: node.id,
                component: node.component,
                placement: node.placement,
                purpose: node.purpose,
                kind: node.kind,
            })),
            notes,
            generatedAt: new Date().toISOString(),
        };
    }

    /**
     * Builds a portable export payload for JSON download, copy, and restore.
     *
     * @param {object} state Current normalized topology state.
     * @param {Array<object>} inventory Current generated inventory rows.
     * @param {object} layoutOverrides Current per-node layout overrides.
     * @param {object} connectorOverrides Current connector overrides.
     * @param {object} notes Current generated notes.
     * @returns {object} Portable export payload.
     */
    function buildExportPayload(state, inventory, layoutOverrides, connectorOverrides, notes) {
        const normalized = normalizeKubernetesTopologyState(Object.assign({}, state, {
            layoutOverrides,
            connectorOverrides,
        }));

        return {
            tool: 'architecture-topology-kubernetes',
            version: 1,
            exported_at: new Date().toISOString(),
            state: normalized,
            inventory: Array.isArray(inventory) ? inventory : [],
            layout_overrides: normalizeMap(layoutOverrides),
            connector_overrides: normalizeMap(connectorOverrides),
            notes: notes && typeof notes === 'object' ? notes : {},
        };
    }

    /**
     * Converts an imported payload into runtime state or a readable error.
     *
     * @param {object} payload Parsed JSON payload.
     * @returns {object} Import result with an error message or normalized state.
     */
    function buildImportedPayloadState(payload) {
        if (!payload || typeof payload !== 'object') {
            return {
                error: 'Imported JSON must be an object.',
            };
        }

        if (payload.tool && payload.tool !== 'architecture-topology-kubernetes') {
            return {
                error: 'Imported JSON is not a Kubernetes topology architecture payload.',
            };
        }

        return {
            error: null,
            state: normalizeKubernetesTopologyState(Object.assign({}, payload.state || payload, {
                layoutOverrides: payload.layout_overrides || payload.layoutOverrides || (payload.state && payload.state.layoutOverrides),
                connectorOverrides: payload.connector_overrides || payload.connectorOverrides || (payload.state && payload.state.connectorOverrides),
            })),
        };
    }

    global.KubernetesTopologyModelCore = {
        defaults,
        presetLabels,
        profileLabels,
        ingressLabels,
        runtimeLabels,
        normalizeKubernetesTopologyState,
        buildKubernetesTopologyModel,
        buildExportPayload,
        buildImportedPayloadState,
    };
}(window));
