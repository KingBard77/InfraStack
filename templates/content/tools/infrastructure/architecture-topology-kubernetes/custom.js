// custom.js
// ns:start family._base.workspace.00_shell
// ns:start family.architecture.workspace.04_visual-contract
{{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/bin/engine-runtime.js')|raw }}
// ns:end family.architecture.workspace.04_visual-contract
{{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/bin/model-core.js')|raw }}

(function () {
    const root = document.querySelector('.architecture-topology-kubernetes-tool');

    if (!root) {
        return;
    }

    const prefix = 'architectureTopologyKubernetes';
    const cssPrefix = 'architecture-topology-kubernetes';
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const modelCore = window.KubernetesTopologyModelCore;
    const engineRuntime = window.InfraStackArchitectureEngineRuntime || null;
    const kubernetesTopologyIconSvgMap = {
        controlPlane: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-infra-control-plane.svg')|json_encode|raw }},
        apiServer: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-control-api-server.svg')|json_encode|raw }},
        etcd: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-infra-etcd.svg')|json_encode|raw }},
        scheduler: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-control-scheduler.svg')|json_encode|raw }},
        controllerManager: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-control-controller-manager.svg')|json_encode|raw }},
        node: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-infra-node.svg')|json_encode|raw }},
        kubelet: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-control-kubelet.svg')|json_encode|raw }},
        kubeProxy: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-control-kube-proxy.svg')|json_encode|raw }},
        deployment: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-res-deployment.svg')|json_encode|raw }},
        pod: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-res-pod.svg')|json_encode|raw }},
        service: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-res-service.svg')|json_encode|raw }},
        ingress: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-res-ingress.svg')|json_encode|raw }},
        networkPolicy: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-res-network-policy.svg')|json_encode|raw }},
        persistentVolume: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-res-persistent-volume.svg')|json_encode|raw }},
        group: {{ include('content/tools/infrastructure/architecture-topology-kubernetes/assets/icon/k8s-res-group.svg')|json_encode|raw }},
    };

    if (!modelCore) {
        return;
    }

    const defaults = modelCore.defaults;
    const runtimeContracts = {
        // ns:start family._base.workspace.01_input-brief
        inputBrief: [
            'architectureTopologyKubernetesInput',
            'architectureTopologyKubernetesPrimaryAction',
            'architectureTopologyKubernetesSecondaryAction',
        ],
        // ns:end family._base.workspace.01_input-brief
        // ns:start family._base.workspace.02_basic-settings
        basicSettings: [
            'architectureTopologyKubernetesBasicPrimary',
            'architectureTopologyKubernetesClusterProfile',
            'architectureTopologyKubernetesBasicText',
            'architectureTopologyKubernetesBasicToggle',
        ],
        // ns:end family._base.workspace.02_basic-settings
        // ns:start family._base.workspace.03_custom-settings
        customSettings: [
            'architectureTopologyKubernetesCustomSettings',
            'architectureTopologyKubernetesNamespace',
            'architectureTopologyKubernetesServiceType',
            'architectureTopologyKubernetesIngressMode',
            'architectureTopologyKubernetesWorkerCount',
            'architectureTopologyKubernetesPodGroups',
            'architectureTopologyKubernetesReplicaTarget',
            'architectureTopologyKubernetesNodeRuntime',
        ],
        // ns:end family._base.workspace.03_custom-settings
        // ns:start family.architecture.workspace.04_visual-contract
        visualContract: [
            'architectureTopologyKubernetesStageCanvas',
            'architectureTopologyKubernetesDiagram',
            'architectureTopologyKubernetesConnectorLayer',
            'architectureTopologyKubernetesDiagramLayer',
        ],
        // ns:end family.architecture.workspace.04_visual-contract
        // ns:start family.architecture.workspace.04_selected-item
        selectedItem: [
            'architectureTopologyKubernetesSelectedEditor',
            'architectureTopologyKubernetesSelectedName',
            'architectureTopologyKubernetesSelectedX',
            'architectureTopologyKubernetesSelectedY',
            'architectureTopologyKubernetesSelectedWidth',
            'architectureTopologyKubernetesSelectedHeight',
            'architectureTopologyKubernetesApplyCardSize',
            'architectureTopologyKubernetesResetCardSize',
        ],
        // ns:end family.architecture.workspace.04_selected-item
        // ns:start family._base.workspace.05_result-summary
        resultSummary: [
            'architectureTopologyKubernetesResultEmpty',
            'architectureTopologyKubernetesResultContent',
            'architectureTopologyKubernetesResultSummary',
        ],
        // ns:end family._base.workspace.05_result-summary
        // ns:start family._base.workspace.06_output-toolbar
        outputToolbar: [
            'architectureTopologyKubernetesToolbar',
            'architectureTopologyKubernetesSort',
            'architectureTopologyKubernetesExportPng',
            'architectureTopologyKubernetesDownloadSvg',
            'architectureTopologyKubernetesCopyJson',
        ],
        // ns:end family._base.workspace.06_output-toolbar
        // ns:start family._base.workspace.07_table-output
        tableOutput: [
            'architectureTopologyKubernetesInventoryTableBody',
            'architectureTopologyKubernetesPromptSummary',
            'architectureTopologyKubernetesPillarBreakdown',
            'architectureTopologyKubernetesRiskLevel',
        ],
        // ns:end family._base.workspace.07_table-output
        // ns:start family._base.workspace.08_json-restore
        jsonRestore: [
            'architectureTopologyKubernetesJsonOutput',
            'architectureTopologyKubernetesDownloadJson',
            'architectureTopologyKubernetesImportJsonButton',
            'architectureTopologyKubernetesImportJson',
        ],
        // ns:end family._base.workspace.08_json-restore
    };

    const dom = {
        input: byId('Input'),
        promptAlias: byId('Prompt'),
        inputError: byId('InputError'),
        generate: byId('Generate'),
        reset: byId('Reset'),
        primaryAction: byId('PrimaryAction'),
        secondaryAction: byId('SecondaryAction'),
        errorState: byId('ErrorState'),
        preset: byId('BasicPrimary'),
        clusterProfile: byId('ClusterProfile'),
        environment: byId('BasicText'),
        showControlPlane: byId('BasicToggle'),
        presetDescription: byId('PresetDescription'),
        namespace: byId('Namespace'),
        serviceType: byId('ServiceType'),
        ingressMode: byId('IngressMode'),
        workerCount: byId('WorkerCount'),
        podGroups: byId('PodGroups'),
        replicaTarget: byId('ReplicaTarget'),
        nodeRuntime: byId('NodeRuntime'),
        workloads: byId('Workloads'),
        objects: byId('Objects'),
        showNetworkPolicy: byId('ShowNetworkPolicy'),
        showStorage: byId('ShowStorage'),
        showObservability: byId('ShowObservability'),
        selectedEmpty: byId('SelectedEmpty'),
        selectedEditor: byId('SelectedEditor'),
        selectedName: byId('SelectedName'),
        selectedX: byId('SelectedX'),
        selectedY: byId('SelectedY'),
        selectedWidth: byId('SelectedWidth'),
        selectedHeight: byId('SelectedHeight'),
        highlightCard: byId('HighlightCard'),
        applyCardSize: byId('ApplyCardSize'),
        resetCardSize: byId('ResetCardSize'),
        stageShell: byId('StageShell'),
        stageTitle: byId('StageTitle'),
        stageSubtitle: byId('StageSubtitle'),
        stageMeta: byId('StageMeta'),
        stageCanvas: byId('StageCanvas'),
        stageEmpty: byId('StageEmpty'),
        previewOverlay: byId('PreviewOverlay'),
        diagram: byId('Diagram'),
        connectorLayer: byId('ConnectorLayer'),
        diagramLayer: byId('DiagramLayer'),
        zoomControl: byId('ZoomControl'),
        zoomOut: byId('ZoomOut'),
        zoomInput: byId('ZoomInput'),
        zoomLabel: byId('ZoomLabel'),
        zoomIn: byId('ZoomIn'),
        zoomFit: byId('ZoomFit'),
        zoomActual: byId('ZoomActual'),
        undoStageEdit: byId('UndoStageEdit'),
        highlightAll: byId('HighlightAll'),
        zoomHideUi: byId('ZoomHideUi'),
        fullscreen: byId('Fullscreen'),
        resetLayout: byId('ResetLayout'),
        usageHelpButton: byId('UsageHelpButton'),
        usageHelpPopup: byId('UsageHelpPopup'),
        usageHelpClose: byId('UsageHelpClose'),
        resultEmpty: byId('ResultEmpty'),
        resultError: byId('ResultError'),
        resultContent: byId('ResultContent'),
        resultSummary: byId('ResultSummary'),
        outputStatus: byId('OutputStatus'),
        outputShell: byId('OutputShell'),
        outputEmpty: byId('OutputEmpty'),
        outputContent: byId('OutputContent'),
        toolbar: byId('Toolbar'),
        sort: byId('Sort'),
        inventorySort: byId('InventorySort'),
        sortSelect: byId('SortSelect'),
        sortSummary: byId('SortSummary'),
        inventorySortSummary: byId('InventorySortSummary'),
        exportPng: byId('ExportPng'),
        downloadSvg: byId('DownloadSvg'),
        copyJson: byId('CopyJson'),
        downloadJson: byId('DownloadJson'),
        importJsonButton: byId('ImportJsonButton'),
        importJson: byId('ImportJson'),
        inventoryTableBody: byId('InventoryTableBody'),
        promptSummary: byId('PromptSummary'),
        keywordList: byId('KeywordList'),
        assumptionList: byId('AssumptionList'),
        modelList: byId('ModelList'),
        prosList: byId('ProsList'),
        consList: byId('ConsList'),
        pillarBreakdown: byId('PillarBreakdown'),
        riskLevel: byId('RiskLevel'),
        jsonOutput: byId('JsonOutput'),
    };

    assertRuntimeContracts();

    let state = modelCore.normalizeKubernetesTopologyState(defaults);
    let currentModel = null;
    let selectedCardId = '';
    let selectedConnectorId = '';
    let selectedCardIds = [];
    let labelOverrides = {};
    let layoutOverrides = {};
    let connectorOverrides = {};
    let highlightedCardIds = [];
    let stageDiagramHighlighted = false;
    let stageRenderModel = null;
    let stageRenderPreview = true;
    let stageController = null;
    let generated = false;
    let dragSession = null;
    let undoStack = [];
    const stageEngineConfig = {
        zoom: {
            defaultValue: 1,
            min: 0.5,
            max: 1.6,
            step: 0.1,
            wheelStep: 0.04,
        },
        movement: {
            step: 2,
            fastStep: 10,
            snap: 1,
            historyLimit: 50,
            minimumNodeWidth: 96,
            minimumNodeHeight: 44,
        },
        selectors: {
            node: '[data-engine-node-id], [data-node-id], [data-card-id]',
            connector: '[data-engine-connector-id], [data-connector-id]',
            connectorAnchorHandle: '.diagram-connector-anchor-handle',
            connectorBendHandle: '.diagram-connector-bend-handle',
            resizeHandle: '[data-engine-resize-handle], .' + cssPrefix + '-resize-handle',
        },
        classes: {
            selected: 'is-selected',
            multiSelected: 'is-multi-selected',
            highlighted: 'is-highlighted',
            marqueeTarget: 'is-marquee-target',
            marqueeSelection: 'diagram-marquee-selection',
            diagramHighlighted: cssPrefix + '-stage-highlight-all',
            dragging: cssPrefix + '-stage-dragging',
            resizing: cssPrefix + '-stage-resizing',
            uiHidden: cssPrefix + '-stage-ui-hidden',
            expanded: cssPrefix + '-stage-expanded',
            bodyLock: cssPrefix + '-stage-expanded-lock',
            hidden: 'd-none',
        },
    };

    function byId(suffix) {
        return root.querySelector('#' + prefix + suffix);
    }

    function assertRuntimeContracts() {
        const missing = Object.keys(runtimeContracts).reduce(function (items, key) {
            runtimeContracts[key].forEach(function (id) {
                if (!root.querySelector('#' + id)) {
                    items.push(id);
                }
            });

            return items;
        }, []);

        if (missing.length) {
            throw new Error('Missing Kubernetes topology runtime hooks: ' + missing.join(', '));
        }
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function (char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            }[char];
        });
    }

    function normalizeState(rawState) {
        return modelCore.normalizeKubernetesTopologyState(rawState);
    }

    function cloneLayoutMap(map) {
        if (engineRuntime && typeof engineRuntime.cloneLayoutOverrides === 'function') {
            return engineRuntime.cloneLayoutOverrides(map);
        }

        return Object.assign({}, map || {});
    }

    function cloneConnectorMap(map) {
        if (engineRuntime && typeof engineRuntime.cloneConnectorOverrides === 'function') {
            return engineRuntime.cloneConnectorOverrides(map);
        }

        return Object.assign({}, map || {});
    }

    function createStageEngineState(viewportOverride) {
        const viewport = viewportOverride && typeof viewportOverride === 'object' ? viewportOverride : {};
        const zoomValue = Number(viewport.zoom);
        const scrollLeft = Number(viewport.scroll_left !== undefined ? viewport.scroll_left : viewport.scrollLeft);
        const scrollTop = Number(viewport.scroll_top !== undefined ? viewport.scroll_top : viewport.scrollTop);
        const uiHidden = viewport.ui_hidden !== undefined ? viewport.ui_hidden : viewport.uiHidden;
        const diagramHighlighted = viewport.diagram_highlighted !== undefined ? viewport.diagram_highlighted : viewport.diagramHighlighted;

        if (engineRuntime && typeof engineRuntime.createState === 'function') {
            return engineRuntime.createState({
                viewport: {
                    zoom: Number.isFinite(zoomValue) ? zoomValue : (Number(state.zoom) || 100) / 100,
                    scrollLeft: Number.isFinite(scrollLeft) ? scrollLeft : dom.stageCanvas.scrollLeft,
                    scrollTop: Number.isFinite(scrollTop) ? scrollTop : dom.stageCanvas.scrollTop,
                    uiHidden: uiHidden !== undefined ? Boolean(uiHidden) : dom.stageShell.classList.contains(cssPrefix + '-stage-ui-hidden'),
                    fullscreen: Boolean(document.fullscreenElement === dom.stageShell || dom.stageShell.classList.contains(cssPrefix + '-stage-expanded')),
                    diagramHighlighted: diagramHighlighted !== undefined ? Boolean(diagramHighlighted) : stageDiagramHighlighted,
                },
                selection: {
                    nodeIds: selectedCardIds.length ? selectedCardIds : (selectedCardId ? [selectedCardId] : []),
                    connectorId: selectedConnectorId,
                    highlightedNodeIds: highlightedCardIds,
                },
                layoutOverrides,
                connectorOverrides,
            }, stageEngineConfig);
        }

        return {
            viewport: {
                zoom: Number.isFinite(zoomValue) ? zoomValue : (Number(state.zoom) || 100) / 100,
                scrollLeft: Number.isFinite(scrollLeft) ? scrollLeft : dom.stageCanvas.scrollLeft,
                scrollTop: Number.isFinite(scrollTop) ? scrollTop : dom.stageCanvas.scrollTop,
                uiHidden: uiHidden !== undefined ? Boolean(uiHidden) : dom.stageShell.classList.contains(cssPrefix + '-stage-ui-hidden'),
                fullscreen: Boolean(document.fullscreenElement === dom.stageShell || dom.stageShell.classList.contains(cssPrefix + '-stage-expanded')),
                diagramHighlighted: diagramHighlighted !== undefined ? Boolean(diagramHighlighted) : stageDiagramHighlighted,
            },
            selection: {
                nodeIds: selectedCardIds.length ? selectedCardIds.slice() : (selectedCardId ? [selectedCardId] : []),
                connectorId: selectedConnectorId,
                highlightedNodeIds: highlightedCardIds.slice(),
            },
            layoutOverrides: cloneLayoutMap(layoutOverrides),
            connectorOverrides: cloneConnectorMap(connectorOverrides),
        };
    }

    function getStageModelForRender() {
        if (stageRenderModel) {
            return stageRenderModel;
        }

        if (currentModel) {
            return currentModel;
        }

        if (generated) {
            return buildModel(state);
        }

        return null;
    }

    function applyStageEngineState(engineState, modelOverride) {
        const safeState = engineRuntime && typeof engineRuntime.createState === 'function'
            ? engineRuntime.createState(engineState, stageEngineConfig)
            : createStageEngineState();
        const model = modelOverride || getStageModelForRender() || buildModel(state);
        const nodeIds = normalizeSelectableNodeIds(
            safeState.selection && Array.isArray(safeState.selection.nodeIds) ? safeState.selection.nodeIds : [],
            model
        );
        const highlightedIds = normalizeSelectableNodeIds(
            safeState.selection && Array.isArray(safeState.selection.highlightedNodeIds) ? safeState.selection.highlightedNodeIds : [],
            model
        );

        layoutOverrides = normalizeSelectableLayoutOverrides(cloneLayoutMap(safeState.layoutOverrides), model);
        connectorOverrides = cloneConnectorMap(safeState.connectorOverrides);
        selectedCardIds = nodeIds.slice();
        selectedCardId = selectedCardIds[0] || '';
        selectedConnectorId = safeState.selection ? String(safeState.selection.connectorId || '') : '';
        highlightedCardIds = highlightedIds.slice();
        stageDiagramHighlighted = Boolean(safeState.viewport && safeState.viewport.diagramHighlighted);
        state.zoom = Math.round((safeState.viewport && Number(safeState.viewport.zoom) ? safeState.viewport.zoom : 1) * 100);
        state.selectedCardId = selectedCardId;
        state.selectedConnectorId = selectedConnectorId;
        state.highlightedCardIds = highlightedCardIds.slice();
        state.layoutOverrides = cloneLayoutMap(layoutOverrides);
        state.connectorOverrides = cloneConnectorMap(connectorOverrides);
    }

    function getPersistedStageEngineState() {
        if (stageController && typeof stageController.toPersistedState === 'function') {
            return stageController.toPersistedState();
        }

        if (engineRuntime && typeof engineRuntime.toPersistedState === 'function') {
            return engineRuntime.toPersistedState(createStageEngineState(), stageEngineConfig);
        }

        return {
            viewport: {
                zoom: (Number(state.zoom) || 100) / 100,
                scroll_left: dom.stageCanvas.scrollLeft,
                scroll_top: dom.stageCanvas.scrollTop,
                ui_hidden: dom.stageShell.classList.contains(cssPrefix + '-stage-ui-hidden'),
                fullscreen: Boolean(document.fullscreenElement === dom.stageShell || dom.stageShell.classList.contains(cssPrefix + '-stage-expanded')),
                diagram_highlighted: stageDiagramHighlighted,
            },
            selection: {
                node_ids: selectedCardIds.slice(),
                connector_id: selectedConnectorId,
                highlighted_node_id: highlightedCardIds[0] || '',
                highlighted_node_ids: highlightedCardIds.slice(),
            },
            layout_overrides: cloneLayoutMap(layoutOverrides),
            connector_overrides: cloneConnectorMap(connectorOverrides),
        };
    }

    function applyStageViewport(engineState) {
        const viewport = engineState && engineState.viewport ? engineState.viewport : {};
        const zoomPercent = Math.round((Number(viewport.zoom) || 1) * 100);
        const hidden = Boolean(viewport.uiHidden);
        const expanded = Boolean(viewport.fullscreen);
        const fullscreenIcon = dom.fullscreen.querySelector('i');
        const fullscreenLabel = expanded ? 'Exit fullscreen' : 'Open fullscreen';

        updateZoom(zoomPercent);
        dom.stageShell.classList.toggle(cssPrefix + '-stage-ui-hidden', hidden);
        dom.stageShell.classList.toggle('stage-ui-hidden', hidden);
        dom.zoomHideUi.setAttribute('aria-pressed', hidden ? 'true' : 'false');
        dom.stageShell.classList.toggle(cssPrefix + '-stage-expanded', expanded);
        dom.stageShell.classList.toggle('stage-expanded', expanded);
        document.body.classList.toggle(cssPrefix + '-stage-expanded-lock', expanded);
        dom.fullscreen.setAttribute('aria-label', fullscreenLabel);
        dom.fullscreen.setAttribute('title', fullscreenLabel);

        if (fullscreenIcon) {
            fullscreenIcon.className = expanded ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen';
        }
    }

    function refreshStageSelection(engineState) {
        const model = getStageModelForRender();

        if (!model) {
            renderPreview();
            return;
        }

        applyStageEngineState(engineState || createStageEngineState(), model);
        renderStage(model, stageRenderPreview, {
            fromEngine: true,
        });
        updateSelectedEditor();
        updateJsonOutput();
    }

    function mountStageController() {
        if (stageController || !engineRuntime || typeof engineRuntime.mount !== 'function') {
            return;
        }

        stageController = engineRuntime.mount({
            zoom: stageEngineConfig.zoom,
            movement: stageEngineConfig.movement,
            selectors: stageEngineConfig.selectors,
            classes: stageEngineConfig.classes,
            state: createStageEngineState(),
            elements: {
                stageCanvas: dom.stageCanvas,
                stageShell: dom.stageShell,
                zoomInput: dom.zoomInput,
                zoomLabel: dom.zoomLabel,
                zoomOutButton: dom.zoomOut,
                zoomInButton: dom.zoomIn,
                zoomFitButton: dom.zoomFit,
                zoomActualButton: dom.zoomActual,
                undoButton: dom.undoStageEdit,
                highlightAllButton: dom.highlightAll,
                hideUiButton: dom.zoomHideUi,
                fullscreenButton: dom.fullscreen,
                resetLayoutButton: dom.resetLayout,
                usageHelpButton: dom.usageHelpButton,
                usageHelpPopup: dom.usageHelpPopup,
                usageHelpCloseButton: dom.usageHelpClose,
            },
            adapter: {
                getNode: function (nodeId) {
                    const model = getStageModelForRender();

                    return model ? getNodeById(model, nodeId) : null;
                },
                getMinimumNodeSize: function () {
                    return {
                        width: 96,
                        height: 44,
                    };
                },
                getFitZoom: function () {
                    const model = getStageModelForRender();
                    const size = model ? getDiagramSize(model) : {
                        width: 1180,
                        height: 820,
                    };
                    const rect = dom.stageCanvas.getBoundingClientRect();
                    const availableWidth = Math.max(1, rect.width - 56);
                    const availableHeight = Math.max(1, rect.height - 56);

                    return Math.max(
                        stageEngineConfig.zoom.min,
                        Math.min(
                            stageEngineConfig.zoom.max,
                            Math.min(availableWidth / size.width, availableHeight / size.height)
                        )
                    );
                },
                applyViewport: applyStageViewport,
                render: function (engineState) {
                    const model = getStageModelForRender();

                    if (!model) {
                        renderPreview();
                        return;
                    }

                    applyStageEngineState(engineState, model);
                    renderStage(model, stageRenderPreview, {
                        fromEngine: true,
                    });
                },
                onConnectorAnchorPointerDown: beginConnectorAnchorEdit,
                onConnectorBendPointerDown: beginConnectorBendEdit,
            },
            onStateChange: function (engineState, context) {
                if (context && context.reason === 'reset-layout') {
                    labelOverrides = {};
                }

                applyStageEngineState(engineState);
                updateSelectedEditor();
                updateJsonOutput();
            },
            onSelectionChange: function (selection, context) {
                const controller = context && context.controller ? context.controller : null;
                const engineState = controller && typeof controller.getState === 'function'
                    ? controller.getState()
                    : createStageEngineState();

                refreshStageSelection(engineState);
            },
        });
    }

    function renderStageWithEngine(model, preview, options) {
        const renderOptions = options || {};

        stageRenderModel = model;
        stageRenderPreview = Boolean(preview);

        if (stageController && !renderOptions.fromEngine) {
            stageController.setState(createStageEngineState(renderOptions.viewport || null));
            return;
        }

        renderStage(model, preview, renderOptions);
    }

    function requestStageAutoFit() {
        window.requestAnimationFrame(function fitStage() {
            if (stageController && typeof stageController.zoomToFit === 'function') {
                stageController.zoomToFit();
            }
        });
    }

    function buildModel(rawState) {
        return modelCore.buildKubernetesTopologyModel(rawState);
    }

    function listFromTextarea(value) {
        return String(value || '')
            .split(/\r?\n|,/)
            .map(function (item) {
                return item.trim();
            })
            .filter(Boolean);
    }

    function readControls() {
        return normalizeState({
            prompt: dom.input.value,
            preset: dom.preset.value,
            clusterProfile: dom.clusterProfile.value,
            environment: dom.environment.value,
            showControlPlane: dom.showControlPlane.checked,
            namespace: dom.namespace.value,
            serviceType: dom.serviceType.value,
            ingressMode: dom.ingressMode.value,
            workerCount: dom.workerCount.value,
            podGroups: dom.podGroups.value,
            replicaTarget: dom.replicaTarget.value,
            nodeRuntime: dom.nodeRuntime.value,
            workloads: listFromTextarea(dom.workloads.value),
            objects: listFromTextarea(dom.objects.value),
            showNetworkPolicy: dom.showNetworkPolicy.checked,
            showStorage: dom.showStorage.checked,
            showObservability: dom.showObservability.checked,
            zoom: dom.zoomInput.value,
            selectedCardId,
            selectedConnectorId,
            highlightedCardIds,
            layoutOverrides: cloneLayoutMap(layoutOverrides),
            connectorOverrides: cloneConnectorMap(connectorOverrides),
        });
    }

    function writeControls(nextState) {
        state = normalizeState(nextState);
        dom.input.value = state.prompt;
        dom.promptAlias.textContent = state.prompt;
        dom.preset.value = state.preset;
        dom.clusterProfile.value = state.clusterProfile;
        dom.environment.value = state.environment;
        dom.showControlPlane.checked = state.showControlPlane;
        dom.namespace.value = state.namespace;
        dom.serviceType.value = state.serviceType;
        dom.ingressMode.value = state.ingressMode;
        dom.workerCount.value = state.workerCount;
        dom.podGroups.value = state.podGroups;
        dom.replicaTarget.value = state.replicaTarget;
        dom.nodeRuntime.value = state.nodeRuntime;
        dom.workloads.value = state.workloads.join('\n');
        dom.objects.value = state.objects.join('\n');
        dom.showNetworkPolicy.checked = state.showNetworkPolicy;
        dom.showStorage.checked = state.showStorage;
        dom.showObservability.checked = state.showObservability;
        dom.zoomInput.value = state.zoom;
        selectedCardId = state.selectedCardId;
        selectedConnectorId = state.selectedConnectorId;
        const controlModel = buildModel(state);

        selectedCardIds = normalizeSelectableNodeIds(selectedCardId ? [selectedCardId] : [], controlModel);
        selectedCardId = selectedCardIds[0] || '';
        state.selectedCardId = selectedCardId;
        highlightedCardIds = normalizeSelectableNodeIds(state.highlightedCardIds, controlModel);
        state.highlightedCardIds = highlightedCardIds.slice();
        layoutOverrides = normalizeSelectableLayoutOverrides(cloneLayoutMap(state.layoutOverrides), controlModel);
        state.layoutOverrides = cloneLayoutMap(layoutOverrides);
        connectorOverrides = cloneConnectorMap(state.connectorOverrides);
        updatePresetDescription();
    }

    function updatePresetDescription() {
        const label = modelCore.presetLabels[dom.preset.value] || 'Cluster Topology';

        dom.presetDescription.textContent = label + ' prepares a Kubernetes model with worker nodes, Services, optional lanes, output rows, and restore state.';
    }

    function clearError() {
        dom.inputError.classList.add('d-none');
        dom.inputError.textContent = '';
        dom.errorState.classList.add('d-none');
        dom.errorState.textContent = '';
        if (dom.resultError) {
            dom.resultError.classList.add('d-none');
            dom.resultError.textContent = '';
        }
    }

    function showError(message) {
        const copy = String(message || 'Review the input and try again.');

        dom.inputError.textContent = copy;
        dom.inputError.classList.remove('d-none');
        dom.errorState.textContent = copy;
        dom.errorState.classList.remove('d-none');
        if (dom.resultError) {
            dom.resultError.textContent = copy;
            dom.resultError.classList.remove('d-none');
        }
    }

    function validateInput(nextState) {
        if (!nextState.prompt.trim()) {
            return 'Add a Kubernetes topology brief before generating the diagram.';
        }

        if (nextState.workerCount < 1 || nextState.workerCount > 6) {
            return 'Worker nodes must be between 1 and 6.';
        }

        return '';
    }

    function createSvgElement(name, attributes) {
        const element = document.createElementNS(svgNamespace, name);

        Object.keys(attributes || {}).forEach(function (key) {
            element.setAttribute(key, String(attributes[key]));
        });

        return element;
    }

    function getNodeRect(node) {
        const override = layoutOverrides[node.id] || {};

        return {
            x: Number.isFinite(Number(override.x)) ? Number(override.x) : node.x,
            y: Number.isFinite(Number(override.y)) ? Number(override.y) : node.y,
            width: Number.isFinite(Number(override.width)) ? Number(override.width) : node.width,
            height: Number.isFinite(Number(override.height)) ? Number(override.height) : node.height,
        };
    }

    function getNodeById(model, nodeId) {
        return model.nodes.find(function (node) {
            return node.id === nodeId;
        });
    }

    function isBoundaryNode(node) {
        return String(node && node.kind ? node.kind : '').toLowerCase() === 'boundary';
    }

    function normalizeSelectableNodeIds(nodeIds, model) {
        return (Array.isArray(nodeIds) ? nodeIds : []).filter(function (nodeId) {
            const node = getNodeById(model, nodeId);

            return node && !isBoundaryNode(node);
        });
    }

    function normalizeSelectableLayoutOverrides(overrides, model) {
        return Object.keys(overrides || {}).reduce(function (items, nodeId) {
            const node = getNodeById(model, nodeId);

            if (node && !isBoundaryNode(node)) {
                items[nodeId] = overrides[nodeId];
            }

            return items;
        }, {});
    }

    function getConnectorById(model, connectorId) {
        return model.connectors.find(function (connector) {
            return connector.id === connectorId;
        });
    }

    function clampRatio(value) {
        const nextValue = Number(value);

        if (!Number.isFinite(nextValue)) {
            return 0.5;
        }

        return Math.max(0, Math.min(1, nextValue));
    }

    function normalizeConnectorRatio(value) {
        if (!value || typeof value !== 'object') {
            return null;
        }

        return {
            x: clampRatio(value.x),
            y: clampRatio(value.y),
        };
    }

    function normalizeConnectorBend(value) {
        if (!value || typeof value !== 'object') {
            return null;
        }

        const x = Number(value.x);
        const y = Number(value.y);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x,
            y,
        };
    }

    function defaultAnchorRatio(sourceRect, targetRect, isSource) {
        const sourceCenter = {
            x: sourceRect.x + sourceRect.width / 2,
            y: sourceRect.y + sourceRect.height / 2,
        };
        const targetCenter = {
            x: targetRect.x + targetRect.width / 2,
            y: targetRect.y + targetRect.height / 2,
        };
        const dx = targetCenter.x - sourceCenter.x;
        const dy = targetCenter.y - sourceCenter.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (isSource) {
                return {
                    x: dx >= 0 ? 1 : 0,
                    y: 0.5,
                };
            }

            return {
                x: dx >= 0 ? 0 : 1,
                y: 0.5,
            };
        }

        if (isSource) {
            return {
                x: 0.5,
                y: dy >= 0 ? 1 : 0,
            };
        }

        return {
            x: 0.5,
            y: dy >= 0 ? 0 : 1,
        };
    }

    function pointForRatio(rect, ratio) {
        return {
            x: rect.x + rect.width * ratio.x,
            y: rect.y + rect.height * ratio.y,
        };
    }

    function ratioForPoint(rect, point) {
        return {
            x: clampRatio((point.x - rect.x) / Math.max(1, rect.width)),
            y: clampRatio((point.y - rect.y) / Math.max(1, rect.height)),
        };
    }

    function getSvgClientPoint(clientX, clientY) {
        const rect = dom.diagram.getBoundingClientRect();
        const viewBox = dom.diagram.viewBox && dom.diagram.viewBox.baseVal ? dom.diagram.viewBox.baseVal : null;
        const width = viewBox && viewBox.width ? viewBox.width : 1180;
        const height = viewBox && viewBox.height ? viewBox.height : 720;

        return {
            x: ((clientX - rect.left) / Math.max(1, rect.width)) * width,
            y: ((clientY - rect.top) / Math.max(1, rect.height)) * height,
        };
    }

    function getConnectorGeometry(connector, model) {
        const source = getNodeById(model, connector.source);
        const target = getNodeById(model, connector.target);

        if (!source || !target) {
            return null;
        }

        const sourceRect = getNodeRect(source);
        const targetRect = getNodeRect(target);
        const override = connectorOverrides[connector.id] || {};
        const sourceRatio = normalizeConnectorRatio(override.sourceRatio || override.source_ratio || connector.sourceRatio || connector.source_ratio) || defaultAnchorRatio(sourceRect, targetRect, true);
        const targetRatio = normalizeConnectorRatio(override.targetRatio || override.target_ratio || connector.targetRatio || connector.target_ratio) || defaultAnchorRatio(sourceRect, targetRect, false);
        const sourcePoint = pointForRatio(sourceRect, sourceRatio);
        const targetPoint = pointForRatio(targetRect, targetRatio);
        const bend = normalizeConnectorBend(override.bend || connector.bend) || {
            x: Math.round((sourcePoint.x + targetPoint.x) / 2),
            y: Math.round((sourcePoint.y + targetPoint.y) / 2),
        };

        return {
            source,
            target,
            sourceRect,
            targetRect,
            sourceRatio,
            targetRatio,
            sourcePoint,
            targetPoint,
            bend,
        };
    }

    function inferConnectorSideFromRatio(rect, ratio, oppositeRect, isSource) {
        if (ratio.y <= 0.04) {
            return 'top';
        }

        if (ratio.y >= 0.96) {
            return 'bottom';
        }

        if (ratio.x <= 0.04) {
            return 'left';
        }

        if (ratio.x >= 0.96) {
            return 'right';
        }

        const rectCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
        };
        const oppositeCenter = {
            x: oppositeRect.x + oppositeRect.width / 2,
            y: oppositeRect.y + oppositeRect.height / 2,
        };
        const dx = oppositeCenter.x - rectCenter.x;
        const dy = oppositeCenter.y - rectCenter.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            return dx >= 0 ? 'right' : 'left';
        }

        if (isSource) {
            return dy >= 0 ? 'bottom' : 'top';
        }

        return dy >= 0 ? 'top' : 'bottom';
    }

    function getConnectorLeadPoint(point, side, distance) {
        if (side === 'top') {
            return {
                x: point.x,
                y: point.y - distance,
            };
        }

        if (side === 'bottom') {
            return {
                x: point.x,
                y: point.y + distance,
            };
        }

        if (side === 'left') {
            return {
                x: point.x - distance,
                y: point.y,
            };
        }

        return {
            x: point.x + distance,
            y: point.y,
        };
    }

    function connectorPointsToPath(points) {
        return points.map(function (point, index) {
            return [
                index === 0 ? 'M' : 'L',
                Math.round(point.x),
                Math.round(point.y),
            ].join(' ');
        }).join(' ');
    }

    function buildConnectorPathData(geometry) {
        const sourceSide = inferConnectorSideFromRatio(geometry.sourceRect, geometry.sourceRatio, geometry.targetRect, true);
        const targetSide = inferConnectorSideFromRatio(geometry.targetRect, geometry.targetRatio, geometry.sourceRect, false);
        const sourceHorizontal = sourceSide === 'left' || sourceSide === 'right';
        const targetHorizontal = targetSide === 'left' || targetSide === 'right';
        const leadDistance = 28;
        const sourceLead = getConnectorLeadPoint(geometry.sourcePoint, sourceSide, leadDistance);
        const targetLead = getConnectorLeadPoint(geometry.targetPoint, targetSide, leadDistance);
        const points = [geometry.sourcePoint, sourceLead];

        if (sourceHorizontal && targetHorizontal) {
            points.push({
                x: geometry.bend.x,
                y: sourceLead.y,
            });
            points.push({
                x: geometry.bend.x,
                y: targetLead.y,
            });
        } else if (!sourceHorizontal && !targetHorizontal) {
            points.push({
                x: sourceLead.x,
                y: geometry.bend.y,
            });
            points.push({
                x: targetLead.x,
                y: geometry.bend.y,
            });
        } else {
            points.push({
                x: targetLead.x,
                y: sourceLead.y,
            });
        }

        points.push(targetLead, geometry.targetPoint);

        return connectorPointsToPath(points);
    }

    function getBaseDiagramSize(model) {
        const width = Number(model && model.diagram && model.diagram.width);
        const height = Number(model && model.diagram && model.diagram.height);

        return {
            width: Number.isFinite(width) && width > 0 ? width : 1180,
            height: Number.isFinite(height) && height > 0 ? height : 820,
        };
    }

    function getDiagramSize(model) {
        const size = getBaseDiagramSize(model);
        const padding = 88;
        let maxX = size.width;
        let maxY = size.height;

        if (!model || !Array.isArray(model.nodes)) {
            return size;
        }

        model.nodes.forEach(function (node) {
            const rect = getNodeRect(node);

            maxX = Math.max(maxX, rect.x + rect.width + padding);
            maxY = Math.max(maxY, rect.y + rect.height + padding);
        });

        if (Array.isArray(model.connectors)) {
            model.connectors.forEach(function (connector) {
                const geometry = getConnectorGeometry(connector, model);

                if (!geometry) {
                    return;
                }

                [geometry.sourcePoint, geometry.targetPoint, geometry.bend].forEach(function (point) {
                    maxX = Math.max(maxX, point.x + padding);
                    maxY = Math.max(maxY, point.y + padding);
                });
            });
        }

        return {
            width: Math.ceil(maxX),
            height: Math.ceil(maxY),
        };
    }

    function applyDiagramSize(model) {
        const size = getDiagramSize(model);

        dom.diagram.setAttribute('viewBox', '0 0 ' + size.width + ' ' + size.height);
        dom.diagram.dataset.diagramWidth = String(size.width);
        dom.diagram.dataset.diagramHeight = String(size.height);

        return size;
    }

    function renderConnectorHandles(group, connector, geometry) {
        [
            {
                endpoint: 'source',
                point: geometry.sourcePoint,
                cardId: connector.source,
            },
            {
                endpoint: 'target',
                point: geometry.targetPoint,
                cardId: connector.target,
            },
        ].forEach(function (handle) {
            group.appendChild(createSvgElement('circle', {
                class: 'diagram-connector-anchor-handle',
                cx: Math.round(handle.point.x),
                cy: Math.round(handle.point.y),
                r: 7,
                'data-connector-id': connector.id,
                'data-engine-connector-anchor': handle.endpoint,
                'data-connector-endpoint': handle.endpoint,
                'data-card-id': handle.cardId,
                tabindex: '0',
                role: 'button',
                'aria-label': 'Move ' + handle.endpoint + ' connector anchor',
            }));
        });

        group.appendChild(createSvgElement('circle', {
            class: 'diagram-connector-bend-handle',
            cx: Math.round(geometry.bend.x),
            cy: Math.round(geometry.bend.y),
            r: 7,
            'data-connector-id': connector.id,
            'data-engine-connector-bend': 'bend',
            tabindex: '0',
            role: 'button',
            'aria-label': 'Move connector bend',
        }));
    }

    function centerOf(node) {
        const rect = getNodeRect(node);

        return {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
        };
    }

    function wrapLines(value, maxLength, maxLines) {
        const words = String(value || '').split(/\s+/).filter(Boolean);
        const lines = [];
        const limit = Math.max(1, Number(maxLines) || 3);
        let current = '';

        words.forEach(function (word) {
            const next = current ? current + ' ' + word : word;

            if (next.length > maxLength && current) {
                lines.push(current);
                current = word;
            } else {
                current = next;
            }
        });

        if (current) {
            lines.push(current);
        }

        return lines.slice(0, limit);
    }

    function buildSvgDataUri(svgString) {
        if (typeof svgString !== 'string' || svgString.trim() === '') {
            return '';
        }

        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    }

    function resolveNodeIconHrefs(node) {
        const iconKeys = Array.isArray(node.iconKeys) && node.iconKeys.length ? node.iconKeys : ['pod'];

        return iconKeys.map(function (iconKey) {
            if (!Object.prototype.hasOwnProperty.call(kubernetesTopologyIconSvgMap, iconKey)) {
                return '';
            }

            return buildSvgDataUri(kubernetesTopologyIconSvgMap[iconKey]);
        }).filter(Boolean).slice(0, 2);
    }

    function renderTextLines(group, lines, x, y, className) {
        lines.forEach(function (line, index) {
            const text = createSvgElement('text', {
                x,
                y: y + index * 18,
                class: className,
            });

            text.textContent = line;
            group.appendChild(text);
        });
    }

    function renderNodeIconTile(group, rect, iconHrefs) {
        if (!iconHrefs.length) {
            return;
        }

        const tileX = rect.x + 14;
        const tileY = rect.y + 14;
        const tileSize = 34;

        group.appendChild(createSvgElement('rect', {
            class: cssPrefix + '-card-icon-tile',
            x: tileX,
            y: tileY,
            width: tileSize,
            height: tileSize,
            rx: 10,
            ry: 10,
        }));

        if (iconHrefs.length === 1) {
            group.appendChild(createSvgElement('image', {
                class: cssPrefix + '-card-icon-image',
                href: iconHrefs[0],
                x: tileX + 5,
                y: tileY + 5,
                width: 24,
                height: 24,
                preserveAspectRatio: 'xMidYMid meet',
            }));
            return;
        }

        iconHrefs.forEach(function (href, index) {
            group.appendChild(createSvgElement('image', {
                class: cssPrefix + '-card-icon-image ' + cssPrefix + '-card-icon-image-pair',
                href,
                x: tileX + 4 + index * 12,
                y: tileY + 4 + index * 10,
                width: 18,
                height: 18,
                preserveAspectRatio: 'xMidYMid meet',
            }));
        });
    }

    function renderNode(node, targetLayer) {
        const rect = getNodeRect(node);
        const boundaryNode = isBoundaryNode(node);
        const groupAttributes = {
            class: [
                'diagram-card-group',
                boundaryNode ? '' : 'diagram-card-group-draggable',
                cssPrefix + '-diagram-card',
                boundaryNode ? cssPrefix + '-diagram-card-boundary' : '',
                cssPrefix + '-diagram-card-' + node.tone,
                !boundaryNode && selectedCardId === node.id ? 'is-selected' : '',
                !boundaryNode && (highlightedCardIds.includes(node.id) || stageDiagramHighlighted) ? 'is-highlighted' : '',
            ].filter(Boolean).join(' '),
            'data-card-x': rect.x,
            'data-card-y': rect.y,
            'data-card-width': rect.width,
            'data-card-height': rect.height,
        };

        if (boundaryNode) {
            groupAttributes['data-boundary-id'] = node.id;
        } else {
            groupAttributes['data-card-id'] = node.id;
            groupAttributes['data-node-id'] = node.id;
            groupAttributes['data-engine-node-id'] = node.id;
            groupAttributes.tabindex = '0';
            groupAttributes.role = 'button';
            groupAttributes['aria-label'] = node.component;
        }

        const group = createSvgElement('g', groupAttributes);
        const box = createSvgElement('rect', {
            class: cssPrefix + '-card-box',
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            rx: 18,
            ry: 18,
        });
        const title = labelOverrides[node.id] || node.component;
        const subtitle = node.purpose;
        const iconHrefs = resolveNodeIconHrefs(node);
        const textX = iconHrefs.length ? rect.x + 58 : rect.x + 18;
        const textWidth = iconHrefs.length ? rect.width - 76 : rect.width - 32;

        group.appendChild(createSvgElement('rect', {
            class: 'diagram-card-highlight',
            x: rect.x - 8,
            y: rect.y - 8,
            width: rect.width + 16,
            height: rect.height + 16,
            rx: 22,
            ry: 22,
        }));
        group.appendChild(box);
        const compactCard = rect.height <= 76;
        const titleMax = Math.max(18, Math.floor(textWidth / 8.2));
        const subtitleMax = Math.max(20, Math.floor(textWidth / 8.8));
        const titleLines = wrapLines(title, titleMax, compactCard ? 2 : 3);
        const subtitleLines = wrapLines(subtitle, subtitleMax, compactCard ? 1 : 2);
        const titleY = compactCard ? rect.y + 33 : rect.y + 32;
        const subtitleY = compactCard ? rect.y + 56 : rect.y + 68;

        renderNodeIconTile(group, rect, iconHrefs);
        renderTextLines(group, titleLines, textX, titleY, cssPrefix + '-card-title');
        renderTextLines(group, subtitleLines, textX, subtitleY, cssPrefix + '-card-subtitle');

        if (!boundaryNode && selectedCardId === node.id) {
            [
                {
                    x: rect.x - 4,
                    y: rect.y - 4,
                    direction: 'nw',
                },
                {
                    x: rect.x + rect.width - 6,
                    y: rect.y - 4,
                    direction: 'ne',
                },
                {
                    x: rect.x - 4,
                    y: rect.y + rect.height - 6,
                    direction: 'sw',
                },
                {
                    x: rect.x + rect.width - 6,
                    y: rect.y + rect.height - 6,
                    direction: 'se',
                },
            ].forEach(function (point) {
                group.appendChild(createSvgElement('rect', {
                    class: cssPrefix + '-resize-handle diagram-resize-handle resize-handle',
                    x: point.x,
                    y: point.y,
                    width: 10,
                    height: 10,
                    rx: 3,
                    'data-engine-resize-handle': point.direction,
                    'data-resize-handle': point.direction,
                    'data-direction': point.direction,
                    'data-card-id': node.id,
                }));
            });
        }

        (targetLayer || dom.diagramLayer).appendChild(group);
    }

    function renderConnector(connector, model) {
        const geometry = getConnectorGeometry(connector, model);

        if (!geometry) {
            return;
        }

        const pathData = buildConnectorPathData(geometry);
        const group = createSvgElement('g', {
            class: selectedConnectorId === connector.id ? 'is-selected' : '',
            'data-connector-id': connector.id,
            'data-engine-connector-id': connector.id,
            'data-source-card': connector.source,
            'data-target-card': connector.target,
        });

        group.appendChild(createSvgElement('path', {
            class: cssPrefix + '-connector-hit-target diagram-connector-hit-target connector-hit-target',
            d: pathData,
            'data-connector-id': connector.id,
            'data-engine-connector-id': connector.id,
            'data-source-card': connector.source,
            'data-target-card': connector.target,
        }));
        group.appendChild(createSvgElement('path', {
            class: cssPrefix + '-connector diagram-connector',
            d: pathData,
            'data-connector-id': connector.id,
            'data-engine-connector-id': connector.id,
            'data-source-card': connector.source,
            'data-target-card': connector.target,
            'marker-end': selectedConnectorId === connector.id ? 'url(#architectureTopologyKubernetesArrowActive)' : 'url(#architectureTopologyKubernetesArrow)',
        }));

        dom.connectorLayer.appendChild(group);
    }

    function renderSelectedConnectorHandles(model) {
        if (!selectedConnectorId) {
            return;
        }

        const connector = getConnectorById(model, selectedConnectorId);
        const geometry = connector ? getConnectorGeometry(connector, model) : null;

        if (!connector || !geometry) {
            return;
        }

        const group = createSvgElement('g', {
            class: cssPrefix + '-connector-handle-layer',
            'data-connector-id': connector.id,
            'data-engine-connector-id': connector.id,
        });

        renderConnectorHandles(group, connector, geometry);
        dom.diagramLayer.appendChild(group);
    }

    function stageMetaChip(iconClass, label, tone) {
        return [
            '<span class="' + cssPrefix + '-score-tag ' + cssPrefix + '-score-tag-' + tone + '">',
            '<i class="' + escapeHtml(iconClass) + '" aria-hidden="true"></i>',
            '<span>' + escapeHtml(label) + '</span>',
            '</span>',
        ].join('');
    }

    function renderStage(model, preview, options) {
        const renderOptions = options || {};
        const diagramSize = applyDiagramSize(model);

        dom.connectorLayer.replaceChildren();
        dom.diagramLayer.replaceChildren();
        model.nodes.filter(isBoundaryNode).forEach(function (node) {
            renderNode(node, dom.connectorLayer);
        });
        model.connectors.forEach(function (connector) {
            renderConnector(connector, model);
        });
        model.nodes.filter(function (node) {
            return !isBoundaryNode(node);
        }).forEach(function (node) {
            renderNode(node, dom.diagramLayer);
        });
        renderSelectedConnectorHandles(model);
        dom.stageCanvas.classList.toggle(cssPrefix + '-stage-preview', Boolean(preview));
        dom.previewOverlay.classList.toggle('d-none', !preview);
        dom.previewOverlay.hidden = !preview;
        dom.previewOverlay.setAttribute('aria-hidden', preview ? 'false' : 'true');
        dom.stageSubtitle.hidden = false;
        dom.stageSubtitle.innerHTML = '<span class="' + cssPrefix + '-stage-preset-chip" title="' + escapeHtml(model.labels.preset + ' preset') + '">' + escapeHtml(model.labels.preset + ' preset') + '</span>';
        dom.stageMeta.innerHTML = [
            stageMetaChip('bi bi-diagram-3', preview ? 'Preview' : model.labels.clusterProfile, 'compute'),
            stageMetaChip('bi bi-boxes', String(model.state.workerCount) + ' workers', 'az'),
            stageMetaChip('bi bi-signpost-split', model.state.serviceType, 'network'),
            stageMetaChip('bi bi-shield-check', model.notes.risk.level, model.notes.risk.warnings.length ? 'status-review' : 'status-ready'),
        ].join('');
        dom.stageEmpty.classList.add('d-none');
        bindStageItems();
        updateSelectedEditor();
        if (!renderOptions.fromEngine) {
            updateZoom(state.zoom, diagramSize);
        }
    }

    function renderPreview() {
        const previewState = normalizeState(readControls());
        const presetLabel = modelCore.presetLabels[previewState.preset] || modelCore.presetLabels[defaults.preset];

        stageRenderModel = null;
        stageRenderPreview = true;
        currentModel = null;
        selectedCardId = '';
        selectedConnectorId = '';
        selectedCardIds = [];
        dom.diagram.setAttribute('viewBox', '0 0 1180 820');
        dom.diagram.dataset.diagramWidth = '1180';
        dom.diagram.dataset.diagramHeight = '820';
        dom.connectorLayer.replaceChildren();
        dom.diagramLayer.replaceChildren();
        dom.stageCanvas.classList.add(cssPrefix + '-stage-preview');
        dom.previewOverlay.classList.remove('d-none');
        dom.previewOverlay.hidden = false;
        dom.previewOverlay.setAttribute('aria-hidden', 'false');
        dom.stageSubtitle.hidden = false;
        dom.stageSubtitle.innerHTML = '<span class="' + cssPrefix + '-stage-preset-chip" title="' + escapeHtml(presetLabel + ' preset') + '">' + escapeHtml(presetLabel + ' preset') + '</span>';
        dom.stageMeta.innerHTML = [
            stageMetaChip('bi bi-diagram-3', 'Preview', 'compute'),
            stageMetaChip('bi bi-boxes', String(previewState.workerCount) + ' workers', 'az'),
            stageMetaChip('bi bi-signpost-split', previewState.serviceType, 'network'),
            stageMetaChip('bi bi-shield-check', 'Planning', 'status-ready'),
        ].join('');
        dom.stageEmpty.classList.add('d-none');
        dom.selectedEmpty.classList.remove('d-none');
        dom.selectedEditor.classList.add('d-none');
        dom.resultEmpty.classList.remove('d-none');
        dom.resultContent.classList.add('d-none');
        dom.outputShell.classList.add('is-empty');
        dom.outputEmpty.classList.remove('d-none');
        dom.outputContent.classList.add('d-none');
        dom.jsonOutput.textContent = '';
        updateZoom(previewState.zoom, {
            width: 1180,
            height: 820,
        });
    }

    function statusChip(label, tone, extraClass, iconClass) {
        const classes = [
            cssPrefix + '-result-chip',
            cssPrefix + '-result-chip-' + tone,
            extraClass || ''
        ].filter(Boolean).join(' ');
        const icon = iconClass || 'bi bi-circle-fill';

        return '<span class="' + classes + '"><span class="' + cssPrefix + '-result-chip-icon" aria-hidden="true"><i class="' + escapeHtml(icon) + '"></i></span><span>' + escapeHtml(label) + '</span></span>';
    }

    function normalizeDateValue(value) {
        const date = value instanceof Date ? value : new Date(value || Date.now());

        return Number.isNaN(date.getTime()) ? new Date() : date;
    }

    function formatGeneratedDate(value) {
        const date = normalizeDateValue(value);

        return new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    }

    function mapRiskTone(risk) {
        if (risk && risk.tone) {
            return risk.tone;
        }

        const warningCount = risk && Array.isArray(risk.warnings) ? risk.warnings.length : 0;

        if (warningCount >= 3) {
            return 'high';
        }

        if (warningCount >= 2) {
            return 'elevated';
        }

        if (warningCount === 1) {
            return 'moderate';
        }

        return 'low';
    }

    function mapRiskIcon(tone) {
        return {
            high: 'bi bi-exclamation-octagon',
            elevated: 'bi bi-exclamation-triangle',
            moderate: 'bi bi-shield-exclamation',
            low: 'bi bi-shield-check',
        }[tone] || 'bi bi-shield-check';
    }

    function topologyScore(model, warningCount) {
        let score = 96;

        score -= warningCount * 12;

        if (!model.state.showControlPlane) {
            score -= 8;
        }

        if (!model.state.showNetworkPolicy) {
            score -= 7;
        }

        if (!model.state.showStorage) {
            score -= 5;
        }

        if (!model.state.showObservability) {
            score -= 5;
        }

        return Math.max(62, Math.min(100, score));
    }

    function normalizePillarScore(pillar, index) {
        if (Number.isFinite(Number(pillar.score))) {
            return Math.max(0, Math.min(100, Math.round(Number(pillar.score))));
        }

        if (String(pillar.value || '').toLowerCase().includes('hidden') || String(pillar.value || '').toLowerCase().includes('needs')) {
            return 62;
        }

        return [86, 82, 78, 74][index] || 76;
    }

    function normalizePillarTone(pillar, index) {
        return pillar.tone || ['security', 'reliability', 'performance', 'operations'][index] || 'operations';
    }

    function normalizePillarIcon(pillar, index) {
        return pillar.icon || [
            'bi bi-diagram-3',
            'bi bi-signpost-split',
            'bi bi-activity',
            'bi bi-shield-check',
        ][index] || 'bi bi-check2-circle';
    }

    function renderSummary(model) {
        const warningCount = model.notes.risk.warnings.length;
        const score = topologyScore(model, warningCount);
        const ringProgressAngle = Math.round(score * 3.6);
        const primaryLabel = warningCount === 0 ? 'Planning Ready' : 'Review Needed';
        const primaryCopy = warningCount === 0
            ? 'Control plane, workers, Services, policy, storage, and observability are ready for architecture review.'
            : model.notes.risk.copy;
        const summaryTitle = warningCount === 0 ? 'Strong topology baseline' : 'Topology needs review';
        const summaryCopy = warningCount === 0
            ? 'Worker placement, Service routing, platform lanes, and restore state are in place for a polished handoff.'
            : 'Review the generated warnings before using this topology for planning handoff.';
        const resultTone = warningCount ? 'warning' : 'ready';
        const generatedLabel = formatGeneratedDate(model.generatedAt);

        dom.resultSummary.setAttribute('data-result-tone', resultTone);
        dom.resultSummary.setAttribute('data-result-layout', 'architecture_score');
        dom.resultSummary.innerHTML = [
            '<header class="' + cssPrefix + '-result-header" aria-label="Result summary header">',
            '<div class="' + cssPrefix + '-result-header-main">',
            '<span class="' + cssPrefix + '-result-header-icon" aria-hidden="true"><i class="bi bi-diagram-3"></i></span>',
            '<div class="' + cssPrefix + '-result-header-copy">',
            '<h2 class="' + cssPrefix + '-result-header-title">Result Summary</h2>',
            '<p>Overview of the current Kubernetes topology result and key metrics.</p>',
            '</div>',
            '</div>',
            '<div class="' + cssPrefix + '-result-header-meta" aria-label="Result summary status">',
            statusChip('Generated', 'ready', cssPrefix + '-result-header-chip', 'bi bi-circle-fill'),
            statusChip(generatedLabel, 'updated', cssPrefix + '-result-header-chip', 'bi bi-calendar3'),
            '</div>',
            '</header>',
            '<div class="' + cssPrefix + '-result-hero-grid" aria-live="polite">',
            '<article class="' + cssPrefix + '-result-card ' + cssPrefix + '-result-card-primary" data-result-visual="ring" aria-label="Primary result">',
            '<div class="' + cssPrefix + '-result-visual-copy ' + cssPrefix + '-result-visual-copy-top">',
            '<span class="' + cssPrefix + '-result-kicker">Primary Result</span>',
            '<h3 class="' + cssPrefix + '-result-title ' + cssPrefix + '-result-title-center">' + escapeHtml(primaryLabel) + '</h3>',
            '</div>',
            '<div class="' + cssPrefix + '-result-primary-visual" aria-label="Primary result visual">',
            '<div class="' + cssPrefix + '-result-ring" style="--progress-angle: ' + ringProgressAngle + 'deg; --' + cssPrefix + '-result-progress: ' + ringProgressAngle + 'deg; --' + cssPrefix + '-result-value-chars: ' + String(score).length + ';">',
            '<div class="' + cssPrefix + '-result-ring-center"><strong class="' + cssPrefix + '-result-ring-value">' + score + '</strong><span class="' + cssPrefix + '-result-ring-unit">/100</span></div>',
            '</div>',
            '</div>',
            '<div class="' + cssPrefix + '-result-visual-copy"><p class="' + cssPrefix + '-result-copy ' + cssPrefix + '-result-copy-center">' + escapeHtml(primaryCopy) + '</p></div>',
            '<span class="' + cssPrefix + '-result-card-divider" aria-hidden="true"></span>',
            '<div class="' + cssPrefix + '-result-chip-row ' + cssPrefix + '-result-chip-row-center" aria-label="Primary result outcome">' + statusChip(model.notes.risk.level, resultTone, '', warningCount ? 'bi bi-shield-exclamation' : 'bi bi-shield-check') + '</div>',
            '</article>',
            '<article class="' + cssPrefix + '-result-card ' + cssPrefix + '-result-card-summary" aria-label="Result summary">',
            '<div class="' + cssPrefix + '-result-summary-intro">',
            '<span class="' + cssPrefix + '-result-card-icon ' + cssPrefix + '-result-card-icon-summary" aria-hidden="true"><i class="bi bi-clipboard-data"></i></span>',
            '<div class="' + cssPrefix + '-result-summary-copy"><div class="' + cssPrefix + '-result-kicker">Descriptive Summary</div><h3 class="' + cssPrefix + '-result-title">' + escapeHtml(summaryTitle) + '</h3><p class="' + cssPrefix + '-result-copy">' + escapeHtml(summaryCopy) + '</p></div>',
            '</div>',
            '<span class="' + cssPrefix + '-result-card-divider" aria-hidden="true"></span>',
            '<div class="' + cssPrefix + '-result-chip-grid" aria-label="Result summary state">',
            statusChip(model.notes.risk.level, resultTone, '', warningCount ? 'bi bi-shield-exclamation' : 'bi bi-shield-check'),
            statusChip(model.labels.clusterProfile, 'baseline', '', 'bi bi-diagram-3'),
            statusChip(String(model.state.workerCount) + ' workers', 'updated', '', 'bi bi-boxes'),
            statusChip(model.state.serviceType, 'warning', '', 'bi bi-signpost-split'),
            statusChip(model.state.showNetworkPolicy ? 'NetworkPolicy' : 'Policy hidden', model.state.showNetworkPolicy ? 'ready' : 'warning', '', 'bi bi-shield-lock'),
            statusChip(model.state.showObservability ? 'Observability' : 'Ops hidden', model.state.showObservability ? 'baseline' : 'warning', '', 'bi bi-activity'),
            '</div>',
            '</article>',
            '</div>',
            '<div class="' + cssPrefix + '-result-metric-grid" aria-label="Result metrics">',
            '<section class="' + cssPrefix + '-result-metric-card ' + cssPrefix + '-result-metric-success"><span class="' + cssPrefix + '-result-metric-icon" aria-hidden="true"><i class="bi bi-hdd-network"></i></span><span class="' + cssPrefix + '-result-metric-label">Workers</span><strong class="' + cssPrefix + '-result-metric-value">' + model.state.workerCount + '</strong><span class="' + cssPrefix + '-result-metric-copy">Visible worker nodes.</span><span class="' + cssPrefix + '-result-metric-accent" aria-hidden="true"></span></section>',
            '<section class="' + cssPrefix + '-result-metric-card ' + cssPrefix + '-result-metric-info"><span class="' + cssPrefix + '-result-metric-icon" aria-hidden="true"><i class="bi bi-boxes"></i></span><span class="' + cssPrefix + '-result-metric-label">Pods</span><strong class="' + cssPrefix + '-result-metric-value">' + model.state.podGroups + '</strong><span class="' + cssPrefix + '-result-metric-copy">Pod groups.</span><span class="' + cssPrefix + '-result-metric-accent" aria-hidden="true"></span></section>',
            '<section class="' + cssPrefix + '-result-metric-card ' + cssPrefix + '-result-metric-accent-tone"><span class="' + cssPrefix + '-result-metric-icon" aria-hidden="true"><i class="bi bi-signpost-split"></i></span><span class="' + cssPrefix + '-result-metric-label">Service</span><strong class="' + cssPrefix + '-result-metric-value">' + escapeHtml(model.state.serviceType) + '</strong><span class="' + cssPrefix + '-result-metric-copy">Exposure model.</span><span class="' + cssPrefix + '-result-metric-accent" aria-hidden="true"></span></section>',
            '<section class="' + cssPrefix + '-result-metric-card ' + cssPrefix + '-result-metric-warning"><span class="' + cssPrefix + '-result-metric-icon" aria-hidden="true"><i class="bi bi-shield-check"></i></span><span class="' + cssPrefix + '-result-metric-label">Warnings</span><strong class="' + cssPrefix + '-result-metric-value">' + warningCount + '</strong><span class="' + cssPrefix + '-result-metric-copy">Review notes.</span><span class="' + cssPrefix + '-result-metric-accent" aria-hidden="true"></span></section>',
            '</div>',
        ].join('');
        if (dom.outputStatus && dom.outputStatus.classList.contains(cssPrefix + '-visually-hidden')) {
            dom.outputStatus.textContent = 'Generated ' + generatedLabel;
        }
    }

    function sortedInventoryRows(model) {
        const key = dom.inventorySort.value || 'id';

        return model.inventory.slice().sort(function (a, b) {
            if (key === 'id') {
                return Number(a.id) - Number(b.id);
            }

            return String(a[key] || '').localeCompare(String(b[key] || ''));
        });
    }

    function setSortMode(nextSort) {
        const sortValue = String(nextSort || 'id');
        const sortOptions = Array.from(root.querySelectorAll('.' + cssPrefix + '-sort-option'));
        const selectedOption = sortOptions.find(function (option) {
            return option.dataset.sortValue === sortValue;
        }) || sortOptions[0];
        const selectedValue = selectedOption ? selectedOption.dataset.sortValue || 'id' : 'id';
        const selectedLabel = selectedOption ? selectedOption.textContent.trim() : 'ID';

        dom.inventorySort.value = selectedValue;
        dom.sortSummary.textContent = selectedLabel;
        dom.inventorySortSummary.textContent = selectedLabel;
        sortOptions.forEach(function (option) {
            const active = option === selectedOption;

            option.classList.toggle('is-active', active);
            option.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        if (dom.sortSelect) {
            dom.sortSelect.removeAttribute('open');
        }
    }

    function renderInventory(model) {
        dom.inventoryTableBody.innerHTML = sortedInventoryRows(model).map(function (row) {
            const copyText = [row.component, row.placement, row.purpose].join(' | ');

            return [
                '<tr>',
                '<td>' + escapeHtml(row.id) + '</td>',
                '<td>' + escapeHtml(row.component) + '</td>',
                '<td>' + escapeHtml(row.placement) + '</td>',
                '<td>' + escapeHtml(row.purpose) + '</td>',
                '<td class="tool-table-action-cell"><button type="button" class="' + cssPrefix + '-row-copy" data-copy-value="' + escapeHtml(copyText) + '" aria-label="Copy row"><i class="bi bi-clipboard" aria-hidden="true"></i></button></td>',
                '</tr>',
            ].join('');
        }).join('');
        setSortMode(dom.inventorySort.value);
    }

    function renderList(target, values) {
        target.innerHTML = values.map(function (value) {
            return '<li>' + escapeHtml(value) + '</li>';
        }).join('');
    }

    function renderNotes(model) {
        dom.promptSummary.textContent = model.notes.promptSummary;
        renderList(dom.keywordList, model.notes.keywords);
        renderList(dom.assumptionList, model.notes.assumptions);
        renderList(dom.modelList, model.notes.modelItems.slice(0, 8));
        renderList(dom.prosList, model.notes.pros);
        renderList(dom.consList, model.notes.cons);
    }

    function renderPillars(model) {
        const pillars = Array.isArray(model.notes.pillars) ? model.notes.pillars : [];

        dom.pillarBreakdown.className = cssPrefix + '-assessment-card ' + cssPrefix + '-pillar-card';
        dom.pillarBreakdown.innerHTML = [
            '<h3 class="' + cssPrefix + '-result-section-title">Pillar Breakdown</h3>',
            '<div class="' + cssPrefix + '-pillar-list">',
            pillars.map(function (pillar, index) {
                const score = normalizePillarScore(pillar, index);
                const tone = normalizePillarTone(pillar, index);
                const icon = normalizePillarIcon(pillar, index);

                return [
                    '<div class="' + cssPrefix + '-pillar-row ' + cssPrefix + '-pillar-row-' + escapeHtml(tone) + '">',
                    '<span class="' + cssPrefix + '-pillar-icon" aria-hidden="true"><i class="' + escapeHtml(icon) + '"></i></span>',
                    '<span class="' + cssPrefix + '-pillar-name">' + escapeHtml(pillar.label) + '<small>' + escapeHtml(pillar.note) + '</small></span>',
                    '<span class="' + cssPrefix + '-pillar-meter" aria-hidden="true"><span style="--pillar-score: ' + escapeHtml(String(score)) + '%;"></span></span>',
                    '<span class="' + cssPrefix + '-pillar-score"><strong>' + escapeHtml(String(score)) + '</strong> /100</span>',
                    '</div>',
                ].join('');
            }).join(''),
            '</div>',
            '<div class="' + cssPrefix + '-pillar-legend" aria-label="Pillar score legend">',
            '<span><i class="' + cssPrefix + '-legend-dot ' + cssPrefix + '-legend-dot-excellent"></i>Excellent (90-100)</span>',
            '<span><i class="' + cssPrefix + '-legend-dot ' + cssPrefix + '-legend-dot-good"></i>Good (70-89)</span>',
            '<span><i class="' + cssPrefix + '-legend-dot ' + cssPrefix + '-legend-dot-fair"></i>Fair (50-69)</span>',
            '<span><i class="' + cssPrefix + '-legend-dot ' + cssPrefix + '-legend-dot-needs"></i>Needs improvement (&lt;50)</span>',
            '</div>',
        ].join('');
    }

    function renderRisk(model) {
        const risk = model.notes.risk || {};
        const warnings = risk.warnings && risk.warnings.length ? risk.warnings : ['No major planning warnings from the selected controls.'];
        const tone = mapRiskTone(risk);
        const generatedAt = formatGeneratedDate(model.generatedAt);

        dom.riskLevel.className = cssPrefix + '-assessment-card ' + cssPrefix + '-risk-card ' + cssPrefix + '-risk-card-' + tone;
        dom.riskLevel.innerHTML = [
            '<h3 class="' + cssPrefix + '-result-section-title">Risk Level</h3>',
            '<div class="' + cssPrefix + '-risk-body">',
            '<div class="' + cssPrefix + '-risk-icon" aria-hidden="true"><i class="' + escapeHtml(mapRiskIcon(tone)) + '"></i></div>',
            '<div class="' + cssPrefix + '-risk-copy">',
            '<div class="' + cssPrefix + '-risk-level">' + escapeHtml(risk.level || 'Planning Ready') + '</div>',
            '<p>' + escapeHtml(risk.copy || 'No major planning warnings from the selected controls.') + '</p>',
            '<ul class="' + cssPrefix + '-note-list">' + warnings.map(function (warning) {
                return '<li>' + escapeHtml(warning) + '</li>';
            }).join('') + '</ul>',
            '</div>',
            '</div>',
            '<div class="' + cssPrefix + '-risk-meta">',
            '<div><span>Generated</span><strong><i class="bi bi-calendar3" aria-hidden="true"></i>' + escapeHtml(generatedAt) + '</strong></div>',
            '<div><span>Warnings</span><strong><i class="bi bi-shield-exclamation" aria-hidden="true"></i>' + escapeHtml(String(risk.warnings ? risk.warnings.length : 0)) + ' planning note' + ((risk.warnings && risk.warnings.length === 1) ? '' : 's') + '</strong></div>',
            '</div>',
        ].join('');
    }

    function buildExportPayload() {
        const model = currentModel || buildModel(readControls());
        const persistedState = getPersistedStageEngineState();
        const nextState = Object.assign({}, state, {
            zoom: Math.round((Number(persistedState.viewport.zoom) || 1) * 100),
            selectedCardId: persistedState.selection.node_ids[0] || '',
            selectedConnectorId: persistedState.selection.connector_id || '',
            highlightedCardIds: persistedState.selection.highlighted_node_ids || [],
            layoutOverrides: persistedState.layout_overrides,
            connectorOverrides: persistedState.connector_overrides,
        });
        const payload = modelCore.buildExportPayload(
            nextState,
            model.inventory,
            persistedState.layout_overrides,
            persistedState.connector_overrides,
            model.notes
        );

        payload.viewport = persistedState.viewport;
        payload.selection = persistedState.selection;
        payload.layout_overrides = persistedState.layout_overrides;
        payload.connector_overrides = persistedState.connector_overrides;
        payload.generated_at = model.generatedAt || new Date().toISOString();
        payload.state = Object.assign({}, payload.state, {
            viewport: persistedState.viewport,
            selection: persistedState.selection,
            layoutOverrides: persistedState.layout_overrides,
            connectorOverrides: persistedState.connector_overrides,
            generatedAt: payload.generated_at,
        });

        return payload;
    }

    function updateJsonOutput() {
        if (!generated) {
            return;
        }

        dom.jsonOutput.textContent = JSON.stringify(buildExportPayload(), null, 2);
    }

    function renderGeneratedModel(model, options) {
        const renderOptions = options || {};

        currentModel = model;
        generated = true;
        renderStageWithEngine(model, false, renderOptions);
        renderSummary(model);
        renderInventory(model);
        renderNotes(model);
        renderPillars(model);
        renderRisk(model);
        dom.resultEmpty.classList.add('d-none');
        dom.resultContent.classList.remove('d-none');
        dom.outputShell.classList.remove('is-empty');
        dom.outputEmpty.classList.add('d-none');
        dom.outputContent.classList.remove('d-none');
        updateJsonOutput();

        if (renderOptions.autoFit !== false && !renderOptions.viewport) {
            requestStageAutoFit();
        }
    }

    function renderFromControls() {
        const nextState = readControls();
        const error = validateInput(nextState);

        if (error) {
            showError(error);
            return;
        }

        clearError();
        state = nextState;
        selectedCardId = '';
        selectedConnectorId = '';
        selectedCardIds = [];
        undoStack = [];
        renderGeneratedModel(buildModel(state));
    }

    function selectCard(cardId) {
        selectedCardId = cardId || '';
        selectedConnectorId = '';
        selectedCardIds = selectedCardId ? [selectedCardId] : [];
        state.selectedCardId = selectedCardId;
        state.selectedConnectorId = '';
        root.querySelectorAll('[data-card-id]').forEach(function (item) {
            item.classList.toggle('is-selected', item.dataset.cardId === selectedCardId);
        });
        root.querySelectorAll('[data-connector-id]').forEach(function (item) {
            item.classList.toggle('is-selected', false);
        });
        updateSelectedEditor();
        updateJsonOutput();
    }

    function selectConnector(connectorId) {
        selectedConnectorId = connectorId || '';
        selectedCardId = '';
        selectedCardIds = [];
        state.selectedConnectorId = selectedConnectorId;
        root.querySelectorAll('[data-card-id]').forEach(function (item) {
            item.classList.toggle('is-selected', false);
        });
        root.querySelectorAll('[data-connector-id]').forEach(function (item) {
            item.classList.toggle('is-selected', item.dataset.connectorId === selectedConnectorId);
        });
        updateSelectedEditor();
        updateJsonOutput();
    }

    function updateSelectedEditor() {
        if (!selectedCardId) {
            dom.selectedEmpty.classList.remove('d-none');
            dom.selectedEditor.classList.add('d-none');
            return;
        }

        const model = currentModel || buildModel(readControls());
        const node = selectedCardId ? getNodeById(model, selectedCardId) : null;

        dom.selectedEmpty.classList.toggle('d-none', Boolean(node));
        dom.selectedEditor.classList.toggle('d-none', !node);

        if (!node) {
            return;
        }

        const rect = getNodeRect(node);

        dom.selectedName.value = labelOverrides[node.id] || node.component;
        dom.selectedX.value = Math.round(rect.x);
        dom.selectedY.value = Math.round(rect.y);
        dom.selectedWidth.value = Math.round(rect.width);
        dom.selectedHeight.value = Math.round(rect.height);
    }

    function pushUndoSnapshot() {
        undoStack.push({
            layoutOverrides: JSON.parse(JSON.stringify(layoutOverrides)),
            labelOverrides: JSON.parse(JSON.stringify(labelOverrides)),
        });
        undoStack = undoStack.slice(-12);
        dom.undoStageEdit.disabled = false;
    }

    function applySelectedLayout() {
        if (!selectedCardId) {
            return;
        }

        const nextOverride = {
            x: Number(dom.selectedX.value) || 0,
            y: Number(dom.selectedY.value) || 0,
            width: Math.max(96, Number(dom.selectedWidth.value) || 120),
            height: Math.max(44, Number(dom.selectedHeight.value) || 64),
        };

        if (stageController) {
            stageController.pushHistory();
            stageController.applyLayoutOverride(selectedCardId, nextOverride, 'selected-layout');
            return;
        }

        pushUndoSnapshot();
        layoutOverrides[selectedCardId] = nextOverride;
        state.layoutOverrides = layoutOverrides;
        renderStageWithEngine(currentModel || buildModel(state), !generated);
        updateJsonOutput();
    }

    function resetSelectedLayout() {
        if (!selectedCardId) {
            return;
        }

        delete layoutOverrides[selectedCardId];
        delete labelOverrides[selectedCardId];

        if (stageController) {
            stageController.pushHistory();
            stageController.applyLayoutOverride(selectedCardId, {}, 'reset-selected-layout');
            updateSelectedEditor();
            updateJsonOutput();
            return;
        }

        pushUndoSnapshot();
        state.layoutOverrides = layoutOverrides;
        renderStageWithEngine(currentModel || buildModel(state), !generated);
        updateSelectedEditor();
        updateJsonOutput();
    }

    function handleSelectedNameInput() {
        if (!selectedCardId) {
            return;
        }

        labelOverrides[selectedCardId] = dom.selectedName.value.trim();
        const title = root.querySelector('[data-card-id="' + selectedCardId + '"] .' + cssPrefix + '-card-title');

        if (title) {
            title.textContent = labelOverrides[selectedCardId];
        }

        updateJsonOutput();
    }

    function undoStageEdit() {
        if (stageController && stageController.undo()) {
            updateJsonOutput();
            return;
        }

        const previous = undoStack.pop();

        if (!previous) {
            return;
        }

        layoutOverrides = previous.layoutOverrides || {};
        labelOverrides = previous.labelOverrides || {};
        state.layoutOverrides = layoutOverrides;
        dom.undoStageEdit.disabled = undoStack.length === 0;
        renderStageWithEngine(currentModel || buildModel(state), !generated);
        updateJsonOutput();
    }

    function resetLayoutOverrides() {
        labelOverrides = {};

        if (stageController) {
            stageController.resetLayout();
            updateJsonOutput();
            return;
        }

        pushUndoSnapshot();
        layoutOverrides = {};
        connectorOverrides = {};
        state.layoutOverrides = {};
        state.connectorOverrides = {};
        renderStageWithEngine(currentModel || buildModel(readControls()), !generated);
        updateJsonOutput();
    }

    function setStageDiagramHighlighted(enabled) {
        stageDiagramHighlighted = Boolean(enabled);
        dom.highlightAll.setAttribute('aria-pressed', stageDiagramHighlighted ? 'true' : 'false');
        root.querySelectorAll('[data-card-id]').forEach(function (item) {
            item.classList.toggle('is-highlighted', stageDiagramHighlighted || highlightedCardIds.includes(item.dataset.cardId));
        });
    }

    function highlightSelectedCard() {
        if (!selectedCardId) {
            return;
        }

        highlightedCardIds = highlightedCardIds.includes(selectedCardId) ? [] : [selectedCardId];

        if (stageController) {
            stageController.highlightNodes(highlightedCardIds, 'selected-highlight');
            return;
        }

        state.highlightedCardIds = highlightedCardIds;
        setStageDiagramHighlighted(stageDiagramHighlighted);
        updateJsonOutput();
    }

    function beginDrag(event) {
        const card = event.currentTarget;
        const nodeId = card.dataset.cardId;
        const model = currentModel || buildModel(readControls());
        const node = getNodeById(model, nodeId);

        if (!node || event.target.classList.contains(cssPrefix + '-resize-handle')) {
            return;
        }

        selectCard(nodeId);
        pushUndoSnapshot();
        dragSession = {
            nodeId,
            startX: event.clientX,
            startY: event.clientY,
            rect: getNodeRect(node),
        };
        event.preventDefault();
    }

    function handlePointerMove(event) {
        if (!dragSession) {
            return;
        }

        const zoomScale = Math.max(0.5, Number(dom.zoomInput.value) / 100);
        const dx = (event.clientX - dragSession.startX) / zoomScale;
        const dy = (event.clientY - dragSession.startY) / zoomScale;

        layoutOverrides[dragSession.nodeId] = Object.assign({}, dragSession.rect, {
            x: Math.round(dragSession.rect.x + dx),
            y: Math.round(dragSession.rect.y + dy),
        });
        state.layoutOverrides = layoutOverrides;
        renderStageWithEngine(currentModel || buildModel(state), !generated);
    }

    function handlePointerUp() {
        if (!dragSession) {
            return;
        }

        dragSession = null;
        updateJsonOutput();
    }

    function beginConnectorAnchorEdit(event, context) {
        const handle = event.target.closest('.diagram-connector-anchor-handle');
        const connectorId = handle ? String(handle.dataset.connectorId || '') : '';
        const endpoint = handle ? String(handle.dataset.connectorEndpoint || '') : '';
        const model = stageRenderModel || currentModel || buildModel(state);
        const connector = getConnectorById(model, connectorId);
        const nodeId = connector && endpoint === 'source' ? connector.source : (connector ? connector.target : '');
        const node = nodeId ? getNodeById(model, nodeId) : null;
        const controller = context && context.controller ? context.controller : null;

        if (!handle || !connector || !node || !controller || !['source', 'target'].includes(endpoint)) {
            return;
        }

        const rect = getNodeRect(node);
        const baseOverride = Object.assign({}, connectorOverrides[connectorId] || {});
        const key = endpoint === 'source' ? 'sourceRatio' : 'targetRatio';

        function applyMove(moveEvent) {
            const point = getSvgClientPoint(moveEvent.clientX, moveEvent.clientY);
            const nextOverride = Object.assign({}, baseOverride);

            nextOverride[key] = ratioForPoint(rect, point);
            controller.applyConnectorOverride(connectorId, nextOverride, 'connector-anchor');
        }

        function finishMove(moveEvent) {
            document.removeEventListener('pointermove', applyMove);
            document.removeEventListener('pointerup', finishMove);
            document.removeEventListener('pointercancel', finishMove);

            if (moveEvent.type !== 'pointercancel') {
                applyMove(moveEvent);
            }
        }

        event.preventDefault();
        event.stopPropagation();
        document.addEventListener('pointermove', applyMove);
        document.addEventListener('pointerup', finishMove);
        document.addEventListener('pointercancel', finishMove);
    }

    function beginConnectorBendEdit(event, context) {
        const handle = event.target.closest('.diagram-connector-bend-handle');
        const connectorId = handle ? String(handle.dataset.connectorId || '') : '';
        const controller = context && context.controller ? context.controller : null;

        if (!handle || !connectorId || !controller) {
            return;
        }

        const baseOverride = Object.assign({}, connectorOverrides[connectorId] || {});

        function applyMove(moveEvent) {
            const point = getSvgClientPoint(moveEvent.clientX, moveEvent.clientY);

            controller.applyConnectorOverride(connectorId, Object.assign({}, baseOverride, {
                bend: {
                    x: Math.round(point.x),
                    y: Math.round(point.y),
                },
            }), 'connector-bend');
        }

        function finishMove(moveEvent) {
            document.removeEventListener('pointermove', applyMove);
            document.removeEventListener('pointerup', finishMove);
            document.removeEventListener('pointercancel', finishMove);

            if (moveEvent.type !== 'pointercancel') {
                applyMove(moveEvent);
            }
        }

        event.preventDefault();
        event.stopPropagation();
        document.addEventListener('pointermove', applyMove);
        document.addEventListener('pointerup', finishMove);
        document.addEventListener('pointercancel', finishMove);
    }

    function bindStageItems() {
        root.querySelectorAll('[data-card-id]').forEach(function (card) {
            card.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();

                    if (stageController) {
                        stageController.selectNodes([card.dataset.cardId], 'keyboard-select-node');
                        return;
                    }

                    selectCard(card.dataset.cardId);
                }
            });
        });

        if (stageController || (engineRuntime && typeof engineRuntime.mount === 'function')) {
            return;
        }

        root.querySelectorAll('[data-card-id]').forEach(function (card) {
            card.addEventListener('click', function () {
                selectCard(card.dataset.cardId);
            });
            card.addEventListener('pointerdown', beginDrag);
        });
        root.querySelectorAll('[data-connector-id]').forEach(function (connector) {
            connector.addEventListener('click', function (event) {
                event.stopPropagation();
                selectConnector(connector.dataset.connectorId);
            });
        });
    }

    function updateZoom(value, diagramSize) {
        const zoom = Math.max(50, Math.min(160, Number(value) || 100));
        const size = diagramSize || {
            width: Number(dom.diagram.dataset.diagramWidth) || 1180,
            height: Number(dom.diagram.dataset.diagramHeight) || 820,
        };
        const zoomRatio = zoom / 100;
        const scaledWidth = Math.ceil(size.width * zoomRatio);
        const scaledHeight = Math.ceil(size.height * zoomRatio);

        state.zoom = zoom;
        dom.zoomInput.value = zoom;
        dom.diagram.style.transformOrigin = '';
        dom.diagram.style.transform = '';
        dom.diagram.style.width = scaledWidth + 'px';
        dom.diagram.style.height = scaledHeight + 'px';
        dom.diagram.style.minWidth = '0';
        dom.stageCanvas.style.minHeight = Math.max(520, scaledHeight + 32) + 'px';
    }

    function setStageUiHidden(hidden) {
        dom.stageShell.classList.toggle('stage-ui-hidden', Boolean(hidden));
        dom.stageShell.classList.toggle(cssPrefix + '-stage-ui-hidden', Boolean(hidden));
        dom.zoomHideUi.setAttribute('aria-pressed', hidden ? 'true' : 'false');
    }

    function toggleStageUi() {
        setStageUiHidden(!dom.stageShell.classList.contains('stage-ui-hidden'));
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement && dom.stageShell.requestFullscreen) {
            dom.stageShell.requestFullscreen();
            return;
        }

        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    function activateConfigTab(tab) {
        const targetId = tab.dataset.configTabTarget;

        root.querySelectorAll('[data-config-tab-target]').forEach(function (item) {
            const active = item === tab;

            item.classList.toggle('active', active);
            item.setAttribute('aria-selected', active ? 'true' : 'false');
            item.setAttribute('tabindex', active ? '0' : '-1');
        });
        root.querySelectorAll('[data-config-panel]').forEach(function (panel) {
            const active = panel.id === targetId;

            panel.classList.toggle('active', active);
            panel.hidden = !active;
        });
    }

    function activateTab(tab) {
        const targetId = tab.dataset.outputTabTarget;

        root.querySelectorAll('[data-output-tab-target]').forEach(function (item) {
            const active = item === tab;

            item.classList.toggle('active', active);
            item.setAttribute('aria-selected', active ? 'true' : 'false');
            item.setAttribute('tabindex', active ? '0' : '-1');
        });
        root.querySelectorAll('.' + cssPrefix + '-tab-panel').forEach(function (panel) {
            const active = panel.id === targetId;

            panel.classList.toggle('active', active);
            panel.hidden = !active;
        });
    }

            function copyText(value, button) {
        const text = String(value || '');

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                flashButton(button, 'Copied');
            }).catch(function () {
                fallbackCopy(text, button);
            });
            return;
        }

        fallbackCopy(text, button);
    }

    function fallbackCopy(text, button) {
        const textarea = document.createElement('textarea');

        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        flashButton(button, 'Copied');
    }

    function flashButton(button, label) {
        if (!button) {
            return;
        }

        const actionButton = button.closest ? button.closest('.tool-table-action-cell button') : null;

        if (actionButton) {
            const isCopied = label === 'Copied';
            const icon = actionButton.querySelector('i');
            const originalIcon = actionButton.dataset.defaultIcon || (icon ? icon.className : '');

            if (icon && !actionButton.dataset.defaultIcon) {
                actionButton.dataset.defaultIcon = originalIcon;
            }

            actionButton.classList.toggle('copied', isCopied);
            actionButton.classList.toggle('is-copied', isCopied);
            actionButton.classList.toggle('failed', !isCopied);
            if (icon) {
                icon.className = isCopied ? 'bi bi-check2' : 'bi bi-x-lg';
            }
            window.setTimeout(function () {
                actionButton.classList.remove('copied', 'is-copied', 'failed');
                if (icon && actionButton.dataset.defaultIcon) {
                    icon.className = actionButton.dataset.defaultIcon;
                }
            }, 1400);
            return;
        }

        const labelTarget = button.querySelector('[data-button-label]');
        const original = button.dataset.originalLabel || (labelTarget ? labelTarget.textContent : button.textContent);

        button.dataset.originalLabel = original;
        if (labelTarget) {
            labelTarget.textContent = label;
        } else {
            button.textContent = label;
        }
        window.setTimeout(function () {
            if (labelTarget) {
                labelTarget.textContent = original;
            } else {
                button.textContent = original;
            }
        }, 1400);
    }

    function initMarkdownCopyButtons() {
        const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.architecture-topology-kubernetes-prompt-pre'));
        const promptCopyButtons = document.querySelectorAll('.architecture-topology-kubernetes-prompt-copy-btn');

        promptCopyButtons.forEach(function (button) {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                copyText(code.textContent.trim(), button);
                button.classList.add('copied');
                window.setTimeout(function () {
                    button.classList.remove('copied');
                }, 1400);
            });
        });
    }

    function serializeSvg() {
        const clone = dom.diagram.cloneNode(true);

        clone.removeAttribute('style');
        clone.removeAttribute('data-diagram-width');
        clone.removeAttribute('data-diagram-height');

        return new XMLSerializer().serializeToString(clone);
    }

    function downloadBlob(filename, mimeType, content) {
        const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    function downloadSvg() {
        if (!generated) {
            showError('Generate a topology before downloading SVG.');
            return;
        }

        downloadBlob('architecture-topology-kubernetes.svg', 'image/svg+xml;charset=utf-8', serializeSvg());
    }

    function exportPng() {
        if (!generated) {
            showError('Generate a topology before exporting PNG.');
            return;
        }

        const image = new Image();
        const svgBlob = new Blob([serializeSvg()], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        image.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const viewBox = dom.diagram.viewBox && dom.diagram.viewBox.baseVal ? dom.diagram.viewBox.baseVal : null;
            const width = viewBox && viewBox.width ? Math.ceil(viewBox.width) : 1180;
            const height = viewBox && viewBox.height ? Math.ceil(viewBox.height) : 820;

            canvas.width = width;
            canvas.height = height;
            context.fillStyle = '#f8fafc';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0);
            canvas.toBlob(function (blob) {
                URL.revokeObjectURL(url);

                if (blob) {
                    downloadBlob('architecture-topology-kubernetes.png', 'image/png', blob);
                }
            }, 'image/png');
        };
        image.onerror = function () {
            URL.revokeObjectURL(url);
            showError('Failed to prepare PNG export.');
        };
        image.src = url;
    }

    function copyJson() {
        if (!generated) {
            showError('Generate a topology before copying JSON.');
            return;
        }

        copyText(JSON.stringify(buildExportPayload(), null, 2), dom.copyJson);
    }

    function downloadJson() {
        if (!generated) {
            showError('Generate a topology before downloading JSON.');
            return;
        }

        downloadBlob('architecture-topology-kubernetes.json', 'application/json;charset=utf-8', JSON.stringify(buildExportPayload(), null, 2));
    }

    function restoreFromPayload(payload) {
        const imported = modelCore.buildImportedPayloadState(payload);

        if (imported.error) {
            showError(imported.error);
            return;
        }

        const payloadSelection = payload.selection && typeof payload.selection === 'object' ? payload.selection : {};
        const payloadViewport = payload.viewport && typeof payload.viewport === 'object' ? payload.viewport : null;
        const selectedNodeIds = Array.isArray(payloadSelection.node_ids)
            ? payloadSelection.node_ids
            : (Array.isArray(payloadSelection.nodeIds) ? payloadSelection.nodeIds : []);
        const highlightedNodeIds = Array.isArray(payloadSelection.highlighted_node_ids)
            ? payloadSelection.highlighted_node_ids
            : (Array.isArray(payloadSelection.highlightedNodeIds) ? payloadSelection.highlightedNodeIds : []);
        const restoredZoom = payloadViewport && Number.isFinite(Number(payloadViewport.zoom))
            ? Math.round(Number(payloadViewport.zoom) * 100)
            : imported.state.zoom;
        const restoredState = Object.assign({}, imported.state, {
            zoom: restoredZoom,
            selectedCardId: selectedNodeIds[0] || imported.state.selectedCardId,
            selectedConnectorId: payloadSelection.connector_id || payloadSelection.connectorId || imported.state.selectedConnectorId,
            highlightedCardIds: highlightedNodeIds.length ? highlightedNodeIds : imported.state.highlightedCardIds,
            layoutOverrides: payload.layout_overrides || payload.layoutOverrides || imported.state.layoutOverrides,
            connectorOverrides: payload.connector_overrides || payload.connectorOverrides || imported.state.connectorOverrides,
        });

        clearError();
        writeControls(restoredState);
        selectedCardIds = selectedNodeIds.length ? selectedNodeIds.slice() : (selectedCardId ? [selectedCardId] : []);
        highlightedCardIds = highlightedNodeIds.length ? highlightedNodeIds.slice() : highlightedCardIds;
        stageDiagramHighlighted = Boolean(payloadViewport && (payloadViewport.diagram_highlighted || payloadViewport.diagramHighlighted));
        const restoredModel = buildModel(state);
        const restoredGeneratedAt = payload.generated_at || payload.generatedAt || payload.exported_at || payload.exportedAt || '';

        if (restoredGeneratedAt) {
            restoredModel.generatedAt = normalizeDateValue(restoredGeneratedAt).toISOString();
        }

        renderGeneratedModel(restoredModel, {
            viewport: payloadViewport,
        });
    }

    function handleImportChange(event) {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function (loadEvent) {
            try {
                restoreFromPayload(JSON.parse(String(loadEvent.target.result || '{}')));
            } catch (error) {
                showError('The selected JSON file could not be restored.');
            } finally {
                dom.importJson.value = '';
            }
        };
        reader.onerror = function () {
            showError('The selected JSON file could not be read.');
            dom.importJson.value = '';
        };
        reader.readAsText(file);
    }

    function handleKeydown(event) {
        if (!selectedCardId || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            return;
        }

        const model = currentModel || buildModel(state);
        const node = getNodeById(model, selectedCardId);

        if (!node) {
            return;
        }

        event.preventDefault();
        const rect = getNodeRect(node);
        const step = event.shiftKey ? 10 : 2;

        if (event.key === 'ArrowUp') {
            rect.y -= step;
        }

        if (event.key === 'ArrowDown') {
            rect.y += step;
        }

        if (event.key === 'ArrowLeft') {
            rect.x -= step;
        }

        if (event.key === 'ArrowRight') {
            rect.x += step;
        }

        layoutOverrides[selectedCardId] = rect;
        state.layoutOverrides = layoutOverrides;
        renderStageWithEngine(model, !generated);
        updateJsonOutput();
    }

    function bindEvents() {
        root.querySelectorAll('input, select, textarea').forEach(function (control) {
            if ([dom.importJson, dom.selectedName, dom.selectedX, dom.selectedY, dom.selectedWidth, dom.selectedHeight].includes(control)) {
                return;
            }

            control.addEventListener('input', function () {
                state = readControls();
                dom.promptAlias.textContent = state.prompt;

                if (generated) {
                    renderGeneratedModel(buildModel(state));
                } else {
                    renderPreview();
                }
            });
            control.addEventListener('change', function () {
                state = readControls();

                if (generated) {
                    renderGeneratedModel(buildModel(state));
                } else {
                    renderPreview();
                }
            });
        });
        root.querySelectorAll('[data-config-tab-target]').forEach(function (tab) {
            tab.addEventListener('click', function () {
                activateConfigTab(tab);
            });
        });
        root.querySelectorAll('[data-output-tab-target]').forEach(function (tab) {
            tab.addEventListener('click', function () {
                activateTab(tab);
            });
        });
        [dom.generate, dom.primaryAction].forEach(function (button) {
            button.addEventListener('click', renderFromControls);
        });
        [dom.reset, dom.secondaryAction].forEach(function (button) {
            button.addEventListener('click', function () {
                generated = false;
                currentModel = null;
                selectedCardId = '';
                selectedConnectorId = '';
                selectedCardIds = [];
                labelOverrides = {};
                layoutOverrides = {};
                connectorOverrides = {};
                highlightedCardIds = [];
                stageDiagramHighlighted = false;
                writeControls(defaults);
                clearError();
                renderPreview();
            });
        });
        root.querySelectorAll('.' + cssPrefix + '-sort-option').forEach(function (button) {
            button.addEventListener('click', function () {
                setSortMode(button.dataset.sortValue || 'id');
                if (currentModel) {
                    renderInventory(currentModel);
                }
            });
        });
        dom.sort.addEventListener('click', function () {
            dom.sort.setAttribute('aria-pressed', 'false');
        });
        if (!engineRuntime || typeof engineRuntime.mount !== 'function') {
            dom.zoomInput.addEventListener('change', function () {
                updateZoom(dom.zoomInput.value);
                updateJsonOutput();
            });
            dom.zoomOut.addEventListener('click', function () {
                updateZoom(Number(dom.zoomInput.value) - 10);
                updateJsonOutput();
            });
            dom.zoomIn.addEventListener('click', function () {
                updateZoom(Number(dom.zoomInput.value) + 10);
                updateJsonOutput();
            });
            dom.zoomFit.addEventListener('click', function () {
                updateZoom(90);
                updateJsonOutput();
            });
            dom.zoomActual.addEventListener('click', function () {
                updateZoom(100);
                updateJsonOutput();
            });
            dom.undoStageEdit.addEventListener('click', undoStageEdit);
            dom.highlightAll.addEventListener('click', function () {
                setStageDiagramHighlighted(!stageDiagramHighlighted);
                updateJsonOutput();
            });
            dom.zoomHideUi.addEventListener('click', toggleStageUi);
            dom.fullscreen.addEventListener('click', toggleFullscreen);
            dom.resetLayout.addEventListener('click', resetLayoutOverrides);
            dom.usageHelpButton.addEventListener('click', function () {
                const open = dom.usageHelpPopup.classList.contains('d-none');

                dom.usageHelpPopup.classList.toggle('d-none', !open);
                dom.usageHelpButton.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
            dom.usageHelpClose.addEventListener('click', function () {
                dom.usageHelpPopup.classList.add('d-none');
                dom.usageHelpButton.setAttribute('aria-expanded', 'false');
            });
        } else {
            dom.resetLayout.addEventListener('click', function () {
                window.setTimeout(function fitAfterAutoLayout() {
                    if (stageController) {
                        stageController.zoomToFit();
                    }
                }, 0);
            });
        }
        dom.highlightCard.addEventListener('click', highlightSelectedCard);
        dom.applyCardSize.addEventListener('click', applySelectedLayout);
        dom.resetCardSize.addEventListener('click', resetSelectedLayout);
        dom.selectedName.addEventListener('input', handleSelectedNameInput);
        [dom.selectedX, dom.selectedY, dom.selectedWidth, dom.selectedHeight].forEach(function (control) {
            control.addEventListener('change', applySelectedLayout);
        });
        dom.inventoryTableBody.addEventListener('click', function (event) {
            const button = event.target.closest('[data-copy-value]');

            if (button) {
                copyText(button.dataset.copyValue, button);
            }
        });
        dom.exportPng.addEventListener('click', exportPng);
        dom.downloadSvg.addEventListener('click', downloadSvg);
        dom.copyJson.addEventListener('click', copyJson);
        dom.downloadJson.addEventListener('click', downloadJson);
        dom.importJsonButton.addEventListener('click', function () {
            dom.importJson.click();
        });
        dom.importJson.addEventListener('change', handleImportChange);
        if (!engineRuntime || typeof engineRuntime.mount !== 'function') {
            document.addEventListener('pointermove', handlePointerMove);
            document.addEventListener('pointerup', handlePointerUp);
            document.addEventListener('keydown', handleKeydown);
            document.addEventListener('fullscreenchange', function () {
                dom.stageShell.classList.toggle('stage-expanded', Boolean(document.fullscreenElement));
                dom.stageShell.classList.toggle(cssPrefix + '-stage-expanded', Boolean(document.fullscreenElement));
            });
        }
    }

    writeControls(defaults);
    bindEvents();
    initMarkdownCopyButtons();
    activateConfigTab(root.querySelector('[data-config-tab-target]'));
    activateTab(root.querySelector('[data-output-tab-target]'));
    renderPreview();
    mountStageController();
}());
// ns:end family._base.workspace.00_shell
