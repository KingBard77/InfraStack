import { StudioMaxGraphAdapter } from 'studio-maxgraph-adapter';

const root = document.getElementById('infrastack-studio');
const core = globalThis.InfraStackStudioCore;
const rules = globalThis.InfraStackStudioRules;
const improvements = globalThis.InfraStackStudioImprovements;
const referenceStorage = globalThis.InfraStackStudioReferenceStorage;
const providerRegistry = globalThis.InfraStackStudioProviderRegistry;

if (root && core && rules && improvements) {
    document.body.classList.add('studio-app-body');
    const storageKey = 'infrastack-studio-project-v0.2';
    const legacyStorageKey = 'infrastack-studio-project-v0.1';
    const historyLimit = 40;
    const viewLabels = {
        overview: 'Overview',
        physical: 'Physical',
        network: 'Network',
        availability: 'Availability'
    };
    const byId = function (id) { return document.getElementById(id); };
    const providerConfig = JSON.parse(root.dataset.providerConfig || '{}');
    const iconUrls = providerConfig.generic?.icon_urls || {};
    const resolvedIconUrls = Object.values(providerConfig).reduce(function (urls, definition) {
        return { ...urls, ...(definition.icon_urls || {}) };
    }, {});
    const elements = {
        projectName: byId('studio-project-name'),
        saveState: byId('studio-save-state'),
        preview: byId('studio-preview'),
        share: byId('studio-share'),
        paletteToggle: byId('studio-palette-toggle'),
        railCanvas: byId('studio-rail-canvas'),
        railProjects: byId('studio-rail-projects'),
        railFiles: byId('studio-rail-files'),
        railTemplates: byId('studio-rail-templates'),
        railAssets: byId('studio-rail-assets'),
        railConnections: byId('studio-rail-connections'),
        railHistory: byId('studio-rail-history'),
        railSettings: byId('studio-rail-settings'),
        componentsTab: byId('studio-components-tab'),
        templatesTab: byId('studio-templates-tab'),
        componentsPanel: byId('studio-components-panel'),
        templatesPanel: byId('studio-templates-panel'),
        templateRestore: byId('studio-template-restore'),
        propertiesTab: byId('studio-properties-tab'),
        styleTab: byId('studio-style-tab'),
        propertiesPanel: byId('studio-properties-panel'),
        stylePanel: byId('studio-style-panel'),
        selectTool: byId('studio-select-tool'),
        insertImage: byId('studio-insert-image'),
        viewSelect: byId('studio-view-select'),
        connectType: byId('studio-connect-type'),
        connect: byId('studio-connect'),
        undo: byId('studio-undo'),
        redo: byId('studio-redo'),
        duplicate: byId('studio-duplicate'),
        autoLayout: byId('studio-auto-layout'),
        alignMenu: byId('studio-align-menu'),
        distributeMenu: byId('studio-distribute-menu'),
        deleteSelection: byId('studio-delete-selection'),
        templateList: byId('studio-template-list'),
        templateCount: byId('studio-template-count'),
        templateProviderLabel: byId('studio-template-provider-label'),
        newProject: byId('studio-new-project'),
        downloadJson: byId('studio-download-json'),
        importJson: byId('studio-import-json'),
        importFile: byId('studio-import-file'),
        message: byId('studio-message'),
        palette: byId('studio-palette'),
        assetCount: byId('studio-asset-count'),
        catalogueSearch: byId('studio-catalogue-search'),
        catalogueLibrary: byId('studio-catalogue-library'),
        catalogueProvider: byId('studio-catalogue-provider'),
        viewEyebrow: byId('studio-view-eyebrow'),
        stageTitle: byId('studio-stage-title'),
        stage: byId('studio-stage'),
        graph: byId('studio-graph'),
        emptyState: byId('studio-empty-state'),
        stageSummary: byId('studio-stage-summary'),
        zoomOut: byId('studio-zoom-out'),
        zoomIn: byId('studio-zoom-in'),
        zoomValue: byId('studio-zoom-value'),
        bottomZoomOut: byId('studio-bottom-zoom-out'),
        bottomZoomIn: byId('studio-bottom-zoom-in'),
        bottomZoomValue: byId('studio-bottom-zoom-value'),
        bottomFit: byId('studio-bottom-fit'),
        gridVisible: byId('studio-grid-visible'),
        snapEnabled: byId('studio-snap-enabled'),
        guidesEnabled: byId('studio-guides-enabled'),
        cursorPosition: byId('studio-cursor-position'),
        fit: byId('studio-fit'),
        reviewAction: byId('studio-review-action'),
        minimap: byId('studio-minimap'),
        inspectorEmpty: byId('studio-inspector-empty'),
        assetForm: byId('studio-asset-form'),
        connectionForm: byId('studio-connection-form'),
        deleteItem: byId('studio-delete-item'),
        selectedType: byId('studio-selected-type'),
        fieldLabel: byId('studio-field-label'),
        fieldParent: byId('studio-field-parent'),
        fieldRole: byId('studio-field-role'),
        fieldHostname: byId('studio-field-hostname'),
        fieldAddress: byId('studio-field-address'),
        fieldProvider: byId('studio-field-provider'),
        fieldEnvironment: byId('studio-field-environment'),
        fieldZone: byId('studio-field-zone'),
        fieldOwner: byId('studio-field-owner'),
        fieldCpu: byId('studio-field-cpu'),
        fieldMemory: byId('studio-field-memory'),
        fieldStorage: byId('studio-field-storage'),
        contextFields: byId('studio-context-fields'),
        fieldMonitoring: byId('studio-field-monitoring'),
        fieldBackup: byId('studio-field-backup'),
        fieldRedundant: byId('studio-field-redundant'),
        fieldCritical: byId('studio-field-critical'),
        fieldWidth: byId('studio-field-width'),
        fieldHeight: byId('studio-field-height'),
        fieldIconSize: byId('studio-field-icon-size'),
        connectionEndpoints: byId('studio-connection-endpoints'),
        fieldConnectionType: byId('studio-field-connection-type'),
        fieldConnectionLabel: byId('studio-field-connection-label'),
        fieldConnectionDirection: byId('studio-field-connection-direction'),
        fieldConnectionProtocol: byId('studio-field-connection-protocol'),
        fieldConnectionBandwidth: byId('studio-field-connection-bandwidth'),
        fieldBidirectional: byId('studio-field-bidirectional'),
        referenceImport: byId('studio-reference-import'),
        referenceFile: byId('studio-reference-file'),
        referenceVisible: byId('studio-reference-visible'),
        referenceLocked: byId('studio-reference-locked'),
        referenceOpacity: byId('studio-reference-opacity'),
        referenceName: byId('studio-reference-name'),
        referenceX: byId('studio-reference-x'),
        referenceY: byId('studio-reference-y'),
        referenceWidth: byId('studio-reference-width'),
        referenceHeight: byId('studio-reference-height'),
        referenceFit: byId('studio-reference-fit'),
        referenceRemove: byId('studio-reference-remove'),
        referenceFrame: byId('studio-reference-frame'),
        referenceImage: byId('studio-reference-image'),
        inventoryBody: byId('studio-inventory-body'),
        inventoryCount: byId('studio-inventory-count'),
        grade: byId('studio-grade'),
        gradeLabel: byId('studio-grade-label'),
        score: byId('studio-score'),
        confidence: byId('studio-confidence'),
        findingCount: byId('studio-finding-count'),
        findingSummary: byId('studio-finding-summary'),
        categoryScores: byId('studio-category-scores'),
        restoreDismissed: byId('studio-restore-dismissed'),
        findings: byId('studio-findings')
    };

    let project = loadLocalProject();
    let catalog = [];
    let catalogueGroups = [];
    const catalogueSources = Object.fromEntries(Object.entries(providerConfig).map(function ([provider, definition]) {
        return [provider, { url: definition.catalog_url, loaded: false }];
    }));
    let activeCatalogueGroup = 'all';
    let activeCatalogueProvider = catalogueSources.aws ? 'aws' : 'generic';
    let paletteCollapsed = false;
    let previewMode = false;
    let activeLibraryTab = 'components';
    let activeInspectorTab = 'properties';
    let gridVisible = true;
    let snapEnabled = true;
    let guidesEnabled = true;
    let selectedItems = [];
    let selected = null;
    let connectMode = false;
    let connectSourceId = null;
    let history = [];
    let future = [];
    let referenceUrl = null;
    let viewportTimer = null;
    let inspectorUpdateTimer = null;
    let previewFindingId = null;

    function loadLocalProject() {
        for (const key of [storageKey, legacyStorageKey]) {
            try {
                const stored = localStorage.getItem(key);
                if (stored) {
                    const result = core.normalizeProject(JSON.parse(stored));
                    if (result.ok) return result.project;
                }
            } catch (error) {
                localStorage.removeItem(key);
            }
        }
        return core.createExampleProject();
    }

    function assetById(assetId) {
        return project.assets.find(function (asset) { return asset.id === assetId; });
    }

    function connectionById(connectionId) {
        return project.connections.find(function (connection) { return connection.id === connectionId; });
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, function (character) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
        });
    }

    function pushHistory() {
        history.push(JSON.stringify(project));
        if (history.length > historyLimit) history.shift();
        future = [];
    }

    function saveProject() {
        project.updated_at = new Date().toISOString();
        localStorage.setItem(storageKey, JSON.stringify(core.buildExportPayload(project)));
        elements.saveState.innerHTML = '<i aria-hidden="true"></i> All changes saved';
    }

    function replaceProject(nextProject, options = {}) {
        if (options.history !== false) pushHistory();
        project = nextProject;
        previewFindingId = null;
        selectedItems = options.selectedItems || (options.selected ? [options.selected] : []);
        selected = selectedItems.length === 1 ? selectedItems[0] : null;
        connectSourceId = null;
        saveProject();
        render();
        if (options.selectAssets) graphAdapter.selectAssets(options.selectAssets);
    }

    function showMessage(text, tone = 'neutral') {
        elements.message.textContent = text;
        elements.message.dataset.tone = tone;
        elements.message.classList.add('is-visible');
        window.clearTimeout(showMessage.timer);
        showMessage.timer = window.setTimeout(function () { elements.message.classList.remove('is-visible'); }, 3500);
    }

    function visibleAssets() {
        return project.assets.filter(function (asset) { return asset.views.includes(project.active_view); });
    }

    function visibleConnections() {
        const ids = new Set(visibleAssets().map(function (asset) { return asset.id; }));
        return project.connections.filter(function (connection) {
            return ids.has(connection.source) && ids.has(connection.target);
        });
    }

    function deleteItems(items) {
        if (!items.length) return;
        pushHistory();
        let next = project;
        items.filter(function (item) { return item.kind === 'connection'; }).forEach(function (item) {
            next = core.removeConnection(next, item.id);
        });
        const assetIds = new Set(items.filter(function (item) { return item.kind === 'asset'; }).map(function (item) { return item.id; }));
        const topLevelIds = [...assetIds].filter(function (assetId) {
            let parent = assetById(assetId);
            while (parent && parent.parent_id) {
                if (assetIds.has(parent.parent_id)) return false;
                parent = assetById(parent.parent_id);
            }
            return true;
        });
        topLevelIds.forEach(function (assetId) { next = core.removeAsset(next, assetId); });
        project = next;
        selectedItems = [];
        selected = null;
        saveProject();
        render();
    }

    function duplicateSelection(assetIds) {
        const result = core.duplicateAssets(project, assetIds);
        if (!result.assetIds.length) return;
        replaceProject(result.project, { selectAssets: result.assetIds });
        showMessage(`${result.assetIds.length} asset${result.assetIds.length === 1 ? '' : 's'} duplicated.`, 'success');
    }

    function selectedAssetIds() {
        return selectedItems.filter(function (item) { return item.kind === 'asset'; }).map(function (item) { return item.id; });
    }

    function autoLayoutArchitecture() {
        const next = core.autoLayoutProject(project, project.active_view);
        replaceProject(next);
        window.setTimeout(function () { graphAdapter.fit(); }, 80);
        showMessage('Architecture arranged from its boundaries and relationships.', 'success');
    }

    function alignSelection(alignment) {
        const assetIds = selectedAssetIds();
        if (assetIds.length < 2) return;
        const next = core.alignAssets(project, assetIds, project.active_view, alignment);
        replaceProject(next, { selectedItems: selectedItems, selectAssets: assetIds });
        elements.alignMenu.open = false;
        showMessage(`Selected assets aligned ${alignment}.`, 'success');
    }

    function distributeSelection(axis) {
        const assetIds = selectedAssetIds();
        if (assetIds.length < 3) return;
        const next = core.distributeAssets(project, assetIds, project.active_view, axis);
        replaceProject(next, { selectedItems: selectedItems, selectAssets: assetIds });
        elements.distributeMenu.open = false;
        showMessage(`Selected assets distributed ${axis === 'horizontal' ? 'horizontally' : 'vertically'}.`, 'success');
    }

    const graphAdapter = new StudioMaxGraphAdapter(elements.graph, elements.minimap, {
        onSelectionChange: function (items) {
            const assetItem = items.length === 1 && items[0].kind === 'asset' ? items[0] : null;
            if (connectMode && assetItem) {
                if (!connectSourceId) {
                    connectSourceId = assetItem.id;
                    showMessage('Choose the destination asset.', 'neutral');
                    return;
                }
                const result = core.addConnection(project, connectSourceId, assetItem.id, elements.connectType.value);
                connectSourceId = null;
                if (result.connectionId) replaceProject(result.project, { selected: { kind: 'connection', id: result.connectionId } });
                return;
            }
            selectedItems = items;
            selected = items.length === 1 ? items[0] : null;
            renderInspector();
            renderToolbar();
        },
        onGeometryChange: function (snapshot) {
            pushHistory();
            project = core.applyGraphSnapshot(project, project.active_view, snapshot);
            saveProject();
            renderInspector();
            renderInventory();
            renderReview();
            renderStage();
        },
        canReparent: function (assetId, parentId) {
            return core.validateAssetParent(project, assetId, parentId);
        },
        onLabelChange: function (assetId, label) {
            if (!label) return renderStage();
            replaceProject(core.updateAsset(project, assetId, { label }), { selected: { kind: 'asset', id: assetId } });
        },
        onConnectionLabelChange: function (connectionId, label) {
            const connection = connectionById(connectionId);
            if (!connection) return;
            replaceProject(core.updateConnection(project, connectionId, {
                type: connection.type,
                label,
                bidirectional: connection.bidirectional
            }), { selected: { kind: 'connection', id: connectionId } });
        },
        onConnectionCreate: function (source, target) {
            const result = core.addConnection(project, source, target, elements.connectType.value);
            replaceProject(result.project, result.connectionId ? { selected: { kind: 'connection', id: result.connectionId } } : {});
        },
        onPaletteDrop: function (definition, x, y, targetAssetId) {
            addCatalogueAsset(definition, cataloguePlacementAt(x, y, targetAssetId));
        },
        onDelete: deleteItems,
        onDuplicate: duplicateSelection,
        onViewportChange: function (nextViewport) {
            project = core.updateViewport(project, project.active_view, nextViewport);
            const zoomLabel = `${Math.round(nextViewport.zoom * 100)}%`;
            elements.zoomValue.textContent = zoomLabel;
            elements.bottomZoomValue.textContent = zoomLabel;
            renderReference();
            window.clearTimeout(viewportTimer);
            viewportTimer = window.setTimeout(saveProject, 150);
        }
    });

    function catalogueInitials(label) {
        return String(label || '').split(/\s+/).filter(Boolean).slice(0, 2).map(function (word) {
            return word[0];
        }).join('').toUpperCase();
    }

    function cataloguePlacementAt(x, y, targetAssetId = null) {
        let targetAsset = assetById(targetAssetId);
        while (targetAsset && !targetAsset.is_container) targetAsset = assetById(targetAsset.parent_id);
        const container = targetAsset || project.assets.filter(function (asset) {
            if (!asset.is_container || !asset.views.includes(project.active_view)) return false;
            const layout = asset.layout[project.active_view];
            return x >= layout.x && x <= layout.x + layout.width && y >= layout.y && y <= layout.y + layout.height;
        }).sort(function (left, right) {
            const leftLayout = left.layout[project.active_view];
            const rightLayout = right.layout[project.active_view];
            return (leftLayout.width * leftLayout.height) - (rightLayout.width * rightLayout.height);
        })[0] || null;
        return {
            x: Math.round(x / 10) * 10,
            y: Math.round(y / 10) * 10,
            parentId: container ? container.id : null,
            parentLabel: container ? container.label : 'Top level'
        };
    }

    function addCatalogueAsset(definition, placement = null) {
        const currentView = project.active_view;
        const dropDefinition = placement && !definition.views.includes(currentView) ? {
            ...definition,
            views: [...definition.views, currentView]
        } : definition;
        const result = core.addAsset(project, dropDefinition);
        let nextProject = result.project;
        const asset = nextProject.assets.find(function (candidate) { return candidate.id === result.assetId; });
        if (asset && placement) {
            const layout = asset.layout[currentView];
            const parent = nextProject.assets.find(function (candidate) { return candidate.id === placement.parentId; });
            let x = placement.x - (layout.width / 2);
            let y = placement.y - (layout.height / 2);
            if (parent) {
                const parentLayout = parent.layout[currentView];
                const minimumX = parentLayout.x + 10;
                const minimumY = parentLayout.y + 48;
                const maximumX = Math.max(minimumX, parentLayout.x + parentLayout.width - layout.width - 10);
                const maximumY = Math.max(minimumY, parentLayout.y + parentLayout.height - layout.height - 10);
                x = Math.max(minimumX, Math.min(maximumX, x));
                y = Math.max(minimumY, Math.min(maximumY, y));
            }
            nextProject = core.updateAssetLayout(nextProject, asset.id, currentView, {
                x,
                y
            });
            nextProject = core.updateAsset(nextProject, asset.id, { parent_id: placement.parentId });
        } else if (asset && !asset.views.includes(currentView)) {
            nextProject.active_view = asset.views[0];
        }
        replaceProject(nextProject, { selected: { kind: 'asset', id: result.assetId } });
        graphAdapter.selectAsset(result.assetId);
        const placementMessage = placement ? ` inside ${placement.parentLabel}` : '';
        showMessage(`${definition.label} added${placementMessage}.`, 'success');
    }

    function createCatalogueItem(definition) {
        const button = document.createElement('button');
        const iconUrl = definition.icon_url || iconUrls[definition.semantic_type || definition.type];
        const icon = iconUrl ? document.createElement('img') : document.createElement('span');
        const label = document.createElement('strong');
        button.type = 'button';
        button.className = 'studio-palette-item';
        button.title = `${definition.label} · ${definition.category}`;
        button.setAttribute('aria-label', `Add ${definition.label}`);
        if (icon instanceof HTMLImageElement) {
            icon.src = iconUrl;
            icon.alt = '';
        } else {
            icon.className = 'studio-palette-glyph';
            icon.textContent = catalogueInitials(definition.label);
        }
        label.textContent = definition.label;
        button.append(icon, label);
        button.addEventListener('click', function () { addCatalogueAsset(definition); });
        graphAdapter.makeCatalogueItemDraggable(button, definition);
        return button;
    }

    function providerLabel(provider) {
        if (providerConfig[provider]?.label) return providerConfig[provider].label;
        return String(provider || '').split(/[-_]/).filter(Boolean).map(function (part) {
            return part.charAt(0).toUpperCase() + part.slice(1);
        }).join(' ');
    }

    function renderCatalogueFilters() {
        const libraryOptions = [new Option('All libraries', 'all')];
        catalogueGroups.forEach(function (group) {
            libraryOptions.push(new Option(group.label, group.id));
        });
        elements.catalogueLibrary.replaceChildren(...libraryOptions);
        elements.catalogueLibrary.value = activeCatalogueGroup;

        const providers = Object.keys(catalogueSources).sort(function (left, right) {
            if (left === 'generic') return -1;
            if (right === 'generic') return 1;
            return left.localeCompare(right);
        });
        const providerOptions = [new Option('All providers', 'all')];
        providers.forEach(function (provider) {
            providerOptions.push(new Option(providerLabel(provider), provider));
        });
        elements.catalogueProvider.replaceChildren(...providerOptions);
        if (!providers.includes(activeCatalogueProvider)) activeCatalogueProvider = 'all';
        elements.catalogueProvider.value = activeCatalogueProvider;
    }

    function matchesCatalogueSearch(definition, query) {
        const matchesProvider = activeCatalogueProvider === 'all' || definition.provider === activeCatalogueProvider;
        const matchesLibrary = activeCatalogueGroup === 'all' || definition.group === activeCatalogueGroup;
        if (!matchesProvider) return false;
        if (!query) return matchesLibrary;
        const haystack = [
            definition.label,
            definition.category,
            definition.group,
            definition.section,
            definition.provider,
            ...(definition.keywords || []),
            ...(definition.tags || [])
        ].join(' ').toLowerCase();
        return haystack.includes(query);
    }

    function renderPalette() {
        graphAdapter.clearCatalogueDraggables();
        const query = elements.catalogueSearch.value.trim().toLowerCase();
        const matches = catalog.filter(function (definition) {
            return matchesCatalogueSearch(definition, query);
        });
        const sections = new Map();
        matches.forEach(function (definition) {
            const group = catalogueGroups.find(function (candidate) { return candidate.id === definition.group; });
            const sectionLabel = query && group ? `${group.label} · ${definition.section}` : definition.section;
            if (!sections.has(sectionLabel)) sections.set(sectionLabel, []);
            sections.get(sectionLabel).push(definition);
        });
        const fragment = document.createDocumentFragment();
        sections.forEach(function (definitions, sectionLabel) {
            const details = document.createElement('details');
            const summary = document.createElement('summary');
            const grid = document.createElement('div');
            details.className = 'studio-palette-section';
            details.open = true;
            summary.innerHTML = `<span>${escapeHtml(sectionLabel)}</span><small>${definitions.length}</small>`;
            grid.className = 'studio-palette-grid';
            definitions.forEach(function (definition) { grid.append(createCatalogueItem(definition)); });
            details.append(summary, grid);
            fragment.append(details);
        });
        if (!matches.length) {
            const empty = document.createElement('div');
            empty.className = 'studio-palette-empty';
            empty.innerHTML = '<i class="bi bi-search"></i><strong>No matching assets</strong><span>Try another name, role, or provider.</span>';
            fragment.append(empty);
        }
        elements.palette.replaceChildren(fragment);
        elements.assetCount.textContent = query ? `${matches.length}/${catalog.length}` : String(matches.length);
    }

    function renderStage() {
        const label = viewLabels[project.active_view];
        const assets = visibleAssets();
        const connections = visibleConnections();
        elements.viewEyebrow.textContent = `${label} projection`;
        elements.stageTitle.textContent = `${label} architecture`;
        elements.emptyState.hidden = assets.length > 0;
        elements.stageSummary.textContent = `${assets.length} assets · ${connections.length} relationships · maxGraph editor`;
        graphAdapter.render(project, project.active_view, resolvedIconUrls);
        const zoomLabel = `${Math.round(graphAdapter.viewport().zoom * 100)}%`;
        elements.zoomValue.textContent = zoomLabel;
        elements.bottomZoomValue.textContent = zoomLabel;
    }

    function switchLibraryTab(tab) {
        activeLibraryTab = tab === 'templates' ? 'templates' : 'components';
        const componentsActive = activeLibraryTab === 'components';
        elements.componentsTab.classList.toggle('is-active', componentsActive);
        elements.templatesTab.classList.toggle('is-active', !componentsActive);
        elements.componentsTab.setAttribute('aria-selected', String(componentsActive));
        elements.templatesTab.setAttribute('aria-selected', String(!componentsActive));
        elements.componentsPanel.hidden = !componentsActive;
        elements.templatesPanel.hidden = componentsActive;
        elements.railAssets.classList.toggle('is-active', componentsActive);
        elements.railTemplates.classList.toggle('is-active', !componentsActive);
        if (!componentsActive) renderTemplates();
    }

    const contextualPropertyFields = {
        vpc: [
            { key: 'region', label: 'AWS region', type: 'text', placeholder: 'ap-southeast-1' },
            { key: 'dns_hostnames', label: 'DNS hostnames', type: 'checkbox' },
            { key: 'dns_resolution', label: 'DNS resolution', type: 'checkbox' },
            { key: 'tags', label: 'Tags', type: 'text', placeholder: 'Environment=Production, Owner=Platform' }
        ],
        subnet: [
            { key: 'subnet_type', label: 'Subnet access', type: 'select', options: [['public', 'Public'], ['private', 'Private'], ['isolated', 'Isolated']] },
            { key: 'route_table', label: 'Route table', type: 'text', placeholder: 'rtb-private-a' },
            { key: 'tags', label: 'Tags', type: 'text', placeholder: 'Tier=Application' }
        ],
        server: [
            { key: 'instance_type', label: 'Instance type', type: 'text', placeholder: 'm7i.large' },
            { key: 'operating_system', label: 'Operating system', type: 'text', placeholder: 'Amazon Linux 2023' },
            { key: 'private_ip', label: 'Private IP', type: 'text', placeholder: '10.0.11.20' },
            { key: 'public_ip', label: 'Public IP', type: 'text', placeholder: 'Optional' }
        ],
        firewall: [
            { key: 'vendor', label: 'Vendor', type: 'text', placeholder: 'AWS, Palo Alto, Fortinet' },
            { key: 'interfaces', label: 'Interfaces', type: 'text', placeholder: 'outside, inside, management' },
            { key: 'security_zones', label: 'Security zones', type: 'text', placeholder: 'untrust, trust, dmz' },
            { key: 'policies', label: 'Policies', type: 'text', placeholder: 'Ingress, egress and inspection policies' },
            { key: 'management_ip', label: 'Management IP', type: 'text', placeholder: '10.0.0.10' }
        ],
        network_device: [
            { key: 'vendor', label: 'Vendor', type: 'text', placeholder: 'Cisco, Juniper, Aruba' },
            { key: 'model', label: 'Model', type: 'text', placeholder: 'Catalyst 9300' },
            { key: 'vlans', label: 'VLANs', type: 'text', placeholder: '10, 20, 30' },
            { key: 'ports', label: 'Ports', type: 'text', placeholder: '48 x 1G, 4 x 10G' },
            { key: 'management_ip', label: 'Management IP', type: 'text', placeholder: '10.0.0.2' }
        ]
    };

    function contextualFieldsFor(asset) {
        if (asset.type === 'vpc') return contextualPropertyFields.vpc;
        if (asset.type === 'subnet') return contextualPropertyFields.subnet;
        if (asset.type === 'server') return contextualPropertyFields.server;
        if (asset.type === 'firewall') return contextualPropertyFields.firewall;
        if (['switch', 'router'].includes(asset.type) && !String(asset.catalog_id || '').startsWith('aws-')) {
            return contextualPropertyFields.network_device;
        }
        return [];
    }

    function renderContextualFields(asset) {
        const fragment = document.createDocumentFragment();
        contextualFieldsFor(asset).forEach(function (definition) {
            const wrapper = document.createElement('div');
            const label = document.createElement('label');
            const fieldId = `studio-property-${definition.key.replaceAll('_', '-')}`;
            let input;
            wrapper.className = definition.type === 'checkbox' ? 'studio-context-check' : '';
            label.htmlFor = fieldId;
            label.textContent = definition.label;
            if (definition.type === 'select') {
                input = document.createElement('select');
                input.className = 'studio-select';
                input.append(new Option('Not specified', ''));
                definition.options.forEach(function (option) { input.add(new Option(option[1], option[0])); });
                input.value = asset.properties[definition.key] || '';
            } else {
                input = document.createElement('input');
                input.type = definition.type;
                if (definition.type === 'checkbox') input.checked = asset.properties[definition.key] === true;
                else input.value = asset.properties[definition.key] || '';
                input.placeholder = definition.placeholder || '';
                input.maxLength = definition.key === 'tags' || definition.key === 'policies' ? 240 : 160;
            }
            input.id = fieldId;
            input.dataset.property = definition.key;
            wrapper.append(label, input);
            fragment.append(wrapper);
        });
        elements.contextFields.replaceChildren(fragment);
        elements.contextFields.hidden = elements.contextFields.childElementCount === 0;
    }

    function renderTemplates() {
        elements.templateList.replaceChildren();
        const templateProviders = activeCatalogueProvider === 'all'
            ? (providerRegistry?.providerIds() || [])
            : [activeCatalogueProvider];
        const visibleTemplates = templateProviders.flatMap(function (provider) {
            return (providerRegistry?.templates(provider) || []).map(function (definition) {
                return { ...definition, provider };
            });
        });
        elements.templateProviderLabel.textContent = activeCatalogueProvider === 'all'
            ? 'All provider examples'
            : `${providerLabel(activeCatalogueProvider)} examples`;
        visibleTemplates.forEach(function (definition) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'studio-template-card';
            button.dataset.templateId = definition.id;
            button.innerHTML = `<i class="bi ${escapeHtml(definition.icon)}"></i><span><strong>${escapeHtml(definition.name)}</strong><small>${escapeHtml(definition.description)}</small></span>`;
            button.addEventListener('click', function () {
                const templateProject = providerRegistry?.createProject(definition.provider, core, definition.id);
                if (!templateProject) return;
                replaceProject(templateProject);
                loadReference();
                showMessage(`${definition.name} loaded.`, 'success');
                window.setTimeout(function () { graphAdapter.fit(); }, 80);
            });
            elements.templateList.append(button);
        });
        if (!visibleTemplates.length) {
            const empty = document.createElement('p');
            empty.className = 'studio-template-empty';
            empty.textContent = `No ${providerLabel(activeCatalogueProvider)} templates are available yet.`;
            elements.templateList.append(empty);
        }
        elements.templateCount.textContent = String(visibleTemplates.length);
    }

    function switchInspectorTab(tab) {
        activeInspectorTab = tab === 'style' ? 'style' : 'properties';
        const propertiesActive = activeInspectorTab === 'properties';
        elements.propertiesTab.classList.toggle('is-active', propertiesActive);
        elements.styleTab.classList.toggle('is-active', !propertiesActive);
        elements.propertiesTab.setAttribute('aria-selected', String(propertiesActive));
        elements.styleTab.setAttribute('aria-selected', String(!propertiesActive));
        elements.propertiesPanel.hidden = !propertiesActive;
        elements.stylePanel.hidden = propertiesActive;
    }

    async function shareProject() {
        const shareData = {
            title: project.name,
            text: `InfraStack Studio architecture: ${project.name}`,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showMessage('Share sheet opened.', 'success');
                return;
            }
            await navigator.clipboard.writeText(window.location.href);
            showMessage('Studio link copied.', 'success');
        } catch (error) {
            if (error && error.name === 'AbortError') return;
            showMessage('The Studio link could not be shared.', 'error');
        }
    }

    function renderInspector() {
        const asset = selected && selected.kind === 'asset' ? assetById(selected.id) : null;
        const connection = selected && selected.kind === 'connection' ? connectionById(selected.id) : null;
        elements.inspectorEmpty.hidden = Boolean(asset || connection);
        elements.assetForm.hidden = !asset;
        elements.connectionForm.hidden = !connection;
        elements.deleteItem.disabled = selectedItems.length === 0;
        if (!asset && !connection && selectedItems.length > 1) {
            elements.inspectorEmpty.hidden = false;
            elements.inspectorEmpty.querySelector('p').textContent = `${selectedItems.length} items selected. Drag, nudge, duplicate, or delete them together.`;
        } else if (!asset && !connection) {
            elements.inspectorEmpty.querySelector('p').textContent = 'Select an asset, boundary, or relationship to edit it.';
        }
        if (asset) {
            elements.selectedType.textContent = `${asset.category} · ${asset.type}`;
            elements.fieldLabel.value = asset.label;
            elements.fieldParent.replaceChildren(new Option('None', ''));
            project.assets.filter(function (candidate) {
                return candidate.is_container && core.validateAssetParent(project, asset.id, candidate.id).valid;
            }).forEach(function (candidate) { elements.fieldParent.add(new Option(candidate.label, candidate.id)); });
            elements.fieldParent.value = asset.parent_id || '';
            const layout = asset.layout[project.active_view];
            elements.fieldWidth.min = asset.is_container ? '260' : '132';
            elements.fieldHeight.min = asset.is_container ? '180' : '88';
            elements.fieldWidth.value = String(Math.round(layout.width));
            elements.fieldHeight.value = String(Math.round(layout.height));
            elements.fieldIconSize.value = String(Math.round(layout.icon_size));
            elements.fieldIconSize.disabled = asset.is_container;
            ['Role', 'Hostname', 'Address', 'Provider', 'Environment', 'Zone', 'Owner', 'Cpu', 'Memory', 'Storage'].forEach(function (name) {
                elements[`field${name}`].value = asset.properties[name.toLowerCase()] || '';
            });
            elements.fieldMonitoring.checked = asset.properties.monitoring;
            elements.fieldBackup.checked = asset.properties.backup;
            elements.fieldRedundant.checked = asset.properties.redundant;
            elements.fieldCritical.checked = asset.properties.critical;
            renderContextualFields(asset);
        }
        if (connection) {
            const source = assetById(connection.source);
            const target = assetById(connection.target);
            elements.connectionEndpoints.textContent = `${source ? source.label : 'Unknown'} → ${target ? target.label : 'Unknown'}`;
            elements.fieldConnectionType.replaceChildren();
            core.connectionTypes.forEach(function (type) {
                elements.fieldConnectionType.add(new Option(type[0].toUpperCase() + type.slice(1), type));
            });
            elements.fieldConnectionType.value = connection.type;
            elements.fieldConnectionLabel.value = connection.label;
            elements.fieldBidirectional.checked = connection.bidirectional;
            elements.fieldConnectionDirection.value = connection.direction || (connection.bidirectional ? 'bidirectional' : 'source-to-target');
            elements.fieldConnectionProtocol.value = connection.protocol || '';
            elements.fieldConnectionBandwidth.value = connection.bandwidth || '';
        }
    }

    function placementFor(asset) {
        const labels = [];
        let parent = assetById(asset.parent_id);
        while (parent) {
            labels.unshift(parent.label);
            parent = assetById(parent.parent_id);
        }
        return labels.join(' / ') || 'Top level';
    }

    function focusAsset(asset) {
        if (!asset.views.includes(project.active_view)) project.active_view = asset.views[0];
        selectedItems = [{ kind: 'asset', id: asset.id }];
        selected = selectedItems[0];
        saveProject();
        render();
        graphAdapter.selectAsset(asset.id);
        elements.stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function focusAssets(assetIds) {
        const assets = assetIds.map(assetById).filter(Boolean);
        if (!assets.length) return;
        if (!assets.some(function (asset) { return asset.views.includes(project.active_view); })) {
            project.active_view = assets[0].views[0];
        }
        const visibleIds = assets.filter(function (asset) {
            return asset.views.includes(project.active_view);
        }).map(function (asset) { return asset.id; });
        selectedItems = visibleIds.map(function (id) { return { kind: 'asset', id }; });
        selected = selectedItems.length === 1 ? selectedItems[0] : null;
        saveProject();
        render();
        graphAdapter.selectAssets(visibleIds);
        elements.stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showMessage(`${visibleIds.length} affected asset${visibleIds.length === 1 ? '' : 's'} highlighted.`, 'neutral');
    }

    function renderInventory() {
        const fragment = document.createDocumentFragment();
        project.assets.forEach(function (asset) {
            const row = document.createElement('tr');
            const controls = ['monitoring', 'backup', 'redundant', 'critical'].filter(function (key) {
                return asset.properties[key];
            }).join(', ') || '—';
            const resources = [asset.properties.cpu, asset.properties.memory, asset.properties.storage].filter(Boolean).join(' · ') || '—';
            [asset.label, asset.type, placementFor(asset), asset.properties.address || '—', resources, controls].forEach(function (value) {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.append(cell);
            });
            row.addEventListener('click', function () { focusAsset(asset); });
            fragment.append(row);
        });
        elements.inventoryBody.replaceChildren(fragment);
        elements.inventoryCount.textContent = `${project.assets.length} items`;
    }

    function renderReview() {
        const result = rules.evaluateProject(project);
        const dismissedIds = new Set(project.accepted_risks || []);
        const findings = result.findings.filter(function (item) { return !dismissedIds.has(item.id); });
        const dismissedCount = result.findings.length - findings.length;
        elements.grade.textContent = result.grade || '—';
        elements.gradeLabel.textContent = result.grade_label;
        elements.score.textContent = result.score === null ? '—' : String(result.score);
        elements.confidence.textContent = result.score === null ? '—' : `${result.confidence}%`;
        elements.findingCount.textContent = String(findings.length);
        const high = findings.filter(function (item) { return ['critical', 'high'].includes(item.severity); }).length;
        elements.findingSummary.textContent = findings.length ? `${high} high priority · ${findings.length - high} advisory${dismissedCount ? ` · ${dismissedCount} dismissed` : ''}` : dismissedCount ? `${dismissedCount} finding${dismissedCount === 1 ? '' : 's'} dismissed` : 'No open deterministic findings';
        elements.restoreDismissed.hidden = dismissedCount === 0;
        elements.categoryScores.replaceChildren();
        Object.entries(result.category_scores).forEach(function (entry) {
            const item = document.createElement('div');
            item.className = 'studio-category-score';
            item.innerHTML = `<div><span>${escapeHtml(entry[0])}</span><strong>${escapeHtml(entry[1])}</strong></div><progress max="100" value="${escapeHtml(entry[1])}">${escapeHtml(entry[1])}</progress>`;
            elements.categoryScores.append(item);
        });
        elements.findings.replaceChildren();
        if (!findings.length) {
            const empty = document.createElement('div');
            empty.className = 'studio-review-empty';
            empty.textContent = dismissedCount ? 'All current findings are dismissed. Restore them to review the guidance again.' : project.assets.length ? 'No deterministic findings are open for this rule pack.' : 'Add assets to begin the review.';
            elements.findings.append(empty);
            return;
        }
        findings.forEach(function (item) {
            const card = document.createElement('article');
            const improvement = improvements.buildPlan(project, item);
            const projection = improvements.previewPlan(project, improvement, core, rules, {
                resolveDefinition: resolveCatalogueDefinition
            });
            const categoryProjection = projection && result.category_scores[item.category] !== projection.category_scores[item.category]
                ? ` · ${item.category} ${result.category_scores[item.category]} → ${projection.category_scores[item.category]}`
                : '';
            card.className = 'studio-finding-card';
            card.dataset.severity = item.severity;
            card.innerHTML = `<div class="studio-finding-heading"><span class="studio-finding-severity">${escapeHtml(item.severity)}</span><small>${escapeHtml(item.category)}</small></div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p><div class="studio-finding-recommendation"><span>Recommended improvement</span><p>${escapeHtml(item.recommendation)}</p></div><div class="studio-improvement-plan"${previewFindingId === item.id ? '' : ' hidden'}><div><span>Guided plan</span>${projection ? `<strong>${escapeHtml(result.grade)} ${escapeHtml(result.score)} → ${escapeHtml(projection.grade)} ${escapeHtml(projection.score)}${escapeHtml(categoryProjection)}</strong>` : '<strong>Manual review</strong>'}</div><h3>${escapeHtml(improvement.title)}</h3><p>${escapeHtml(improvement.summary)}</p><ol>${improvement.changes.map(function (change) { return `<li>${escapeHtml(change)}</li>`; }).join('')}</ol></div>`;
            const actions = document.createElement('div');
            actions.className = 'studio-finding-actions';
            if (item.asset_ids.length) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'studio-finding-focus';
                button.textContent = `Show ${item.asset_ids.length} affected asset${item.asset_ids.length === 1 ? '' : 's'}`;
                button.addEventListener('click', function () {
                    focusAssets(item.asset_ids);
                });
                actions.append(button);
            }
            const preview = document.createElement('button');
            preview.type = 'button';
            preview.className = 'studio-finding-action';
            preview.textContent = previewFindingId === item.id ? 'Hide plan' : 'Preview plan';
            preview.addEventListener('click', function () {
                previewFindingId = previewFindingId === item.id ? null : item.id;
                if (previewFindingId && improvement.asset_ids.length) focusAssets(improvement.asset_ids);
                else renderReview();
            });
            actions.append(preview);
            if (improvement.applyable) {
                const apply = document.createElement('button');
                apply.type = 'button';
                apply.className = 'studio-finding-action studio-finding-apply';
                apply.textContent = 'Apply improvement';
                apply.addEventListener('click', function () {
                    if (card.querySelector('.studio-improvement-confirm')) return;
                    const confirmation = document.createElement('div');
                    confirmation.className = 'studio-improvement-confirm';
                    confirmation.innerHTML = '<span>Apply this change to the saved project?</span>';
                    const confirmApply = document.createElement('button');
                    const cancelApply = document.createElement('button');
                    confirmApply.type = 'button';
                    confirmApply.textContent = 'Confirm apply';
                    cancelApply.type = 'button';
                    cancelApply.textContent = 'Cancel';
                    confirmApply.addEventListener('click', function () {
                        const applied = improvements.applyPlan(project, improvement, core, {
                            resolveDefinition: resolveCatalogueDefinition
                        });
                        previewFindingId = null;
                        const selectedAssets = applied.assetIds.map(function (id) { return { kind: 'asset', id }; });
                        replaceProject(applied.project, { selectedItems: selectedAssets, selectAssets: applied.assetIds });
                        showMessage(`${improvement.title} applied.`, 'success');
                    });
                    cancelApply.addEventListener('click', function () { confirmation.remove(); });
                    confirmation.append(confirmApply, cancelApply);
                    card.append(confirmation);
                });
                actions.append(apply);
            }
            const dismiss = document.createElement('button');
            dismiss.type = 'button';
            dismiss.className = 'studio-finding-action studio-finding-dismiss';
            dismiss.textContent = 'Dismiss risk';
            dismiss.addEventListener('click', function () {
                const next = { ...project, accepted_risks: Array.from(new Set([...(project.accepted_risks || []), item.id])) };
                previewFindingId = null;
                replaceProject(core.normalizeProject(next).project);
                showMessage('Finding dismissed and recorded in the saved project.', 'neutral');
            });
            actions.append(dismiss);
            card.append(actions);
            elements.findings.append(card);
        });
    }

    function resolveCatalogueDefinition(catalogId) {
        const definition = catalog.find(function (item) {
            return item.catalog_id === catalogId || item.type === catalogId;
        });
        return definition ? { ...definition } : null;
    }

    function renderToolbar() {
        elements.viewSelect.value = project.active_view;
        root.classList.toggle('is-palette-collapsed', paletteCollapsed);
        root.classList.toggle('is-preview-mode', previewMode);
        root.classList.toggle('is-grid-visible', gridVisible);
        elements.paletteToggle.classList.toggle('is-active', !paletteCollapsed);
        elements.paletteToggle.setAttribute('aria-pressed', String(!paletteCollapsed));
        elements.paletteToggle.setAttribute('aria-label', paletteCollapsed ? 'Show asset catalogue' : 'Hide asset catalogue');
        elements.paletteToggle.title = paletteCollapsed ? 'Show asset catalogue' : 'Hide asset catalogue';
        elements.connect.classList.toggle('is-active', connectMode);
        elements.selectTool.classList.toggle('is-active', !connectMode);
        elements.railConnections.classList.toggle('is-active', connectMode);
        elements.connect.setAttribute('aria-pressed', String(connectMode));
        elements.preview.classList.toggle('is-active', previewMode);
        elements.preview.setAttribute('aria-pressed', String(previewMode));
        elements.preview.title = previewMode ? 'Exit preview' : 'Preview canvas';
        elements.undo.disabled = history.length === 0;
        elements.redo.disabled = future.length === 0;
        elements.railHistory.disabled = history.length === 0;
        elements.duplicate.disabled = !selectedItems.some(function (item) { return item.kind === 'asset'; });
        elements.autoLayout.disabled = visibleAssets().length < 2;
        elements.alignMenu.classList.toggle('is-disabled', selectedAssetIds().length < 2);
        elements.distributeMenu.classList.toggle('is-disabled', selectedAssetIds().length < 3);
        if (selectedAssetIds().length < 2) elements.alignMenu.open = false;
        if (selectedAssetIds().length < 3) elements.distributeMenu.open = false;
        elements.deleteSelection.disabled = selectedItems.length === 0;
        elements.projectName.value = project.name;
        elements.gridVisible.checked = gridVisible;
        elements.snapEnabled.checked = snapEnabled;
        elements.guidesEnabled.checked = guidesEnabled;
    }

    function renderReference() {
        const viewport = graphAdapter.viewport();
        const reference = project.reference;
        elements.referenceVisible.checked = reference.visible;
        elements.referenceLocked.checked = reference.locked;
        elements.referenceOpacity.value = String(Math.round(reference.opacity * 100));
        elements.referenceName.textContent = reference.name || 'None';
        elements.referenceX.value = String(Math.round(reference.x));
        elements.referenceY.value = String(Math.round(reference.y));
        elements.referenceWidth.value = String(Math.round(reference.width));
        elements.referenceHeight.value = String(Math.round(reference.height));
        elements.referenceRemove.disabled = !reference.name;
        elements.referenceFit.disabled = !reference.name;
        elements.referenceFrame.hidden = !referenceUrl || !reference.visible;
        elements.referenceFrame.classList.toggle('is-unlocked', !reference.locked);
        elements.referenceFrame.style.transform = `translate(${(reference.x * viewport.zoom) + viewport.pan_x}px, ${(reference.y * viewport.zoom) + viewport.pan_y}px)`;
        elements.referenceFrame.style.width = `${reference.width * viewport.zoom}px`;
        elements.referenceFrame.style.height = `${reference.height * viewport.zoom}px`;
        elements.referenceImage.style.opacity = String(reference.opacity);
        if (referenceUrl) elements.referenceImage.src = referenceUrl;
    }

    function render() {
        renderToolbar();
        renderStage();
        renderInspector();
        renderInventory();
        renderReview();
        renderReference();
    }

    async function loadReference() {
        if (!referenceStorage || !project.reference.name) {
            if (referenceUrl) URL.revokeObjectURL(referenceUrl);
            referenceUrl = null;
            renderReference();
            return;
        }
        try {
            const blob = await referenceStorage.loadReference(project.project_id);
            if (referenceUrl) URL.revokeObjectURL(referenceUrl);
            referenceUrl = blob ? URL.createObjectURL(blob) : null;
            renderReference();
        } catch (error) {
            showMessage('Reference image storage is unavailable.', 'warning');
        }
    }

    function beginReferenceTransform(event, resize) {
        if (project.reference.locked || event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        const initial = { ...project.reference };
        const startX = event.clientX;
        const startY = event.clientY;
        const viewport = graphAdapter.viewport();
        let changes = {};
        const handle = event.currentTarget;
        handle.setPointerCapture(event.pointerId);
        function move(moveEvent) {
            const deltaX = (moveEvent.clientX - startX) / viewport.zoom;
            const deltaY = (moveEvent.clientY - startY) / viewport.zoom;
            changes = resize ? {
                width: Math.max(200, Math.min(core.canvasSize.width, initial.width + deltaX)),
                height: Math.max(120, Math.min(core.canvasSize.height, initial.height + deltaY))
            } : {
                x: Math.max(0, Math.min(core.canvasSize.width - 100, initial.x + deltaX)),
                y: Math.max(0, Math.min(core.canvasSize.height - 100, initial.y + deltaY))
            };
            project.reference = { ...project.reference, ...changes };
            renderReference();
        }
        function end() {
            handle.removeEventListener('pointermove', move);
            handle.removeEventListener('pointerup', end);
            handle.removeEventListener('pointercancel', end);
            project = core.updateReference(project, changes);
            saveProject();
        }
        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', end);
        handle.addEventListener('pointercancel', end);
    }

    function undo() {
        if (!history.length) return;
        future.push(JSON.stringify(project));
        const result = core.normalizeProject(JSON.parse(history.pop()));
        if (result.ok) replaceProject(result.project, { history: false });
    }

    function redo() {
        if (!future.length) return;
        history.push(JSON.stringify(project));
        const result = core.normalizeProject(JSON.parse(future.pop()));
        if (result.ok) replaceProject(result.project, { history: false });
    }

    function downloadProject() {
        const blob = new Blob([JSON.stringify(core.buildExportPayload(project), null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'architecture'}.infrastack.json`;
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
        showMessage('Project JSON downloaded. Reference image bytes remain local.', 'success');
    }

    function importProject(file) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            try {
                const result = core.normalizeProject(JSON.parse(String(reader.result || '')));
                if (!result.ok) return showMessage(result.error, 'error');
                replaceProject(result.project);
                loadReference();
                showMessage('Studio project restored.', 'success');
            } catch (error) {
                showMessage('The selected file is not valid Studio JSON.', 'error');
            }
        });
        reader.readAsText(file);
    }

    function normalizeCatalogueAsset(definition, provider) {
        const normalized = { ...definition, provider: definition.provider || provider };
        const iconKey = definition.catalog_id || definition.type;
        normalized.icon_url = providerConfig[provider]?.icon_urls?.[iconKey] || null;
        return normalized;
    }

    /**
     * Loads one provider catalogue once and merges it into the Studio palette.
     *
     * @param {string} provider Provider catalogue identity.
     * @returns {Promise<void>} Resolves after the source is available.
     */
    async function loadCatalogueSource(provider) {
        const source = catalogueSources[provider];
        if (!source || source.loaded) return;
        const response = await fetch(source.url, { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`${provider} catalogue request failed.`);
        const payload = await response.json();
        const sourceAssets = Array.isArray(payload.assets) ? payload.assets : [];
        const sourceGroups = Array.isArray(payload.groups) ? payload.groups : [];
        catalog = catalog.concat(sourceAssets.map(function (definition) {
            return normalizeCatalogueAsset(definition, provider);
        }));
        sourceGroups.forEach(function (group) {
            if (!catalogueGroups.some(function (candidate) { return candidate.id === group.id; })) {
                catalogueGroups.push(group);
            }
        });
        source.loaded = true;
    }

    async function loadCatalog() {
        try {
            await Promise.all(Object.keys(catalogueSources).map(loadCatalogueSource));
            if (!catalogueGroups.some(function (group) { return group.id === activeCatalogueGroup; })) {
                activeCatalogueGroup = 'all';
            }
            renderCatalogueFilters();
            renderPalette();
        } catch (error) {
            showMessage('The asset catalogue could not be loaded.', 'error');
        }
    }

    elements.componentsTab.addEventListener('click', function () { switchLibraryTab('components'); });
    elements.templatesTab.addEventListener('click', function () { switchLibraryTab('templates'); });
    elements.propertiesTab.addEventListener('click', function () { switchInspectorTab('properties'); });
    elements.styleTab.addEventListener('click', function () { switchInspectorTab('style'); });
    elements.templateRestore.addEventListener('click', function () { elements.importFile.click(); });
    elements.restoreDismissed.addEventListener('click', function () {
        const next = { ...project, accepted_risks: [] };
        replaceProject(core.normalizeProject(next).project);
        showMessage('Dismissed findings restored.', 'neutral');
    });
    elements.preview.addEventListener('click', function () {
        previewMode = !previewMode;
        renderToolbar();
        window.setTimeout(function () { graphAdapter.fit(); }, 80);
    });
    elements.share.addEventListener('click', shareProject);
    elements.selectTool.addEventListener('click', function () {
        connectMode = false;
        connectSourceId = null;
        renderToolbar();
        elements.stage.focus();
    });
    elements.insertImage.addEventListener('click', function () { elements.referenceFile.click(); });
    elements.bottomZoomIn.addEventListener('click', function () { graphAdapter.zoom(1.2); });
    elements.bottomZoomOut.addEventListener('click', function () { graphAdapter.zoom(1 / 1.2); });
    elements.bottomFit.addEventListener('click', function () { graphAdapter.fit(); });
    elements.gridVisible.addEventListener('change', function () {
        gridVisible = elements.gridVisible.checked;
        renderToolbar();
    });
    elements.snapEnabled.addEventListener('change', function () {
        snapEnabled = elements.snapEnabled.checked;
        graphAdapter.setSnapEnabled(snapEnabled);
        renderToolbar();
    });
    elements.guidesEnabled.addEventListener('change', function () {
        guidesEnabled = elements.guidesEnabled.checked;
        graphAdapter.setGuidesEnabled(guidesEnabled);
        renderToolbar();
    });
    elements.railCanvas.addEventListener('click', function () { elements.stage.focus(); });
    elements.railProjects.addEventListener('click', function () { switchLibraryTab('templates'); });
    elements.railFiles.addEventListener('click', function () { elements.importFile.click(); });
    elements.railTemplates.addEventListener('click', function () { switchLibraryTab('templates'); });
    elements.railAssets.addEventListener('click', function () { switchLibraryTab('components'); });
    elements.railConnections.addEventListener('click', function () { elements.connect.click(); });
    elements.railHistory.addEventListener('click', undo);
    elements.railSettings.addEventListener('click', function () {
        elements.gridVisible.focus();
        showMessage('Canvas settings are available in the bottom-right corner.');
    });
    elements.stage.addEventListener('pointermove', function (event) {
        const bounds = elements.stage.getBoundingClientRect();
        const viewport = graphAdapter.viewport();
        const x = Math.round((event.clientX - bounds.left - 28 - viewport.pan_x) / viewport.zoom);
        const y = Math.round((event.clientY - bounds.top - 26 - viewport.pan_y) / viewport.zoom);
        elements.cursorPosition.textContent = `X: ${x}, Y: ${y}`;
    });
    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            switchLibraryTab('components');
            elements.catalogueSearch.focus();
        }
    });
    elements.viewSelect.addEventListener('change', function () {
        project.active_view = elements.viewSelect.value;
        selectedItems = [];
        selected = null;
        connectSourceId = null;
        saveProject();
        render();
    });
    elements.catalogueLibrary.addEventListener('change', function () {
        activeCatalogueGroup = elements.catalogueLibrary.value;
        elements.catalogueSearch.value = '';
        renderPalette();
    });
    elements.catalogueProvider.addEventListener('change', async function () {
        activeCatalogueProvider = elements.catalogueProvider.value;
        activeCatalogueGroup = 'all';
        elements.catalogueLibrary.value = 'all';
        elements.catalogueSearch.value = '';
        try {
            if (activeCatalogueProvider !== 'all') await loadCatalogueSource(activeCatalogueProvider);
            renderPalette();
            renderTemplates();
        } catch (error) {
            showMessage(`${providerLabel(activeCatalogueProvider)} assets could not be loaded.`, 'error');
        }
    });
    elements.catalogueSearch.addEventListener('input', function () {
        renderPalette();
    });
    elements.connect.addEventListener('click', function () {
        connectMode = !connectMode;
        connectSourceId = null;
        renderToolbar();
        showMessage(connectMode ? 'Connect mode: choose source and destination assets.' : 'Connect mode off.');
    });
    elements.undo.addEventListener('click', undo);
    elements.redo.addEventListener('click', redo);
    elements.duplicate.addEventListener('click', function () { graphAdapter.requestDuplicate(); });
    elements.autoLayout.addEventListener('click', autoLayoutArchitecture);
    elements.alignMenu.querySelectorAll('[data-align]').forEach(function (button) {
        button.addEventListener('click', function () { alignSelection(button.dataset.align); });
    });
    elements.distributeMenu.querySelectorAll('[data-distribute]').forEach(function (button) {
        button.addEventListener('click', function () { distributeSelection(button.dataset.distribute); });
    });
    elements.deleteSelection.addEventListener('click', function () { graphAdapter.requestDelete(); });
    elements.paletteToggle.addEventListener('click', function () {
        paletteCollapsed = !paletteCollapsed;
        renderToolbar();
    });
    elements.newProject.addEventListener('click', function () {
        replaceProject(core.createEmptyProject());
        loadReference();
        showMessage('New local project created.', 'success');
    });
    elements.projectName.addEventListener('change', function () {
        pushHistory();
        project.name = elements.projectName.value.trim().slice(0, 80) || 'Untitled architecture';
        saveProject();
        renderToolbar();
    });
    elements.downloadJson.addEventListener('click', downloadProject);
    elements.importJson.addEventListener('click', function () { elements.importFile.click(); });
    elements.importFile.addEventListener('change', function () {
        const file = elements.importFile.files[0];
        elements.importFile.value = '';
        if (file) importProject(file);
    });
    function collectContextualProperties() {
        return Array.from(elements.contextFields.querySelectorAll('[data-property]')).reduce(function (properties, input) {
            properties[input.dataset.property] = input.type === 'checkbox' ? input.checked : input.value;
            return properties;
        }, {});
    }

    function updateSelectedAssetFromInspector() {
        if (!selected || selected.kind !== 'asset') return;
        pushHistory();
        const assetId = selected.id;
        const values = {
            label: elements.fieldLabel.value,
            parent_id: elements.fieldParent.value || null,
            role: elements.fieldRole.value,
            hostname: elements.fieldHostname.value,
            address: elements.fieldAddress.value,
            provider: elements.fieldProvider.value,
            environment: elements.fieldEnvironment.value,
            zone: elements.fieldZone.value,
            owner: elements.fieldOwner.value,
            cpu: elements.fieldCpu.value,
            memory: elements.fieldMemory.value,
            storage: elements.fieldStorage.value,
            monitoring: elements.fieldMonitoring.checked,
            backup: elements.fieldBackup.checked,
            redundant: elements.fieldRedundant.checked,
            critical: elements.fieldCritical.checked,
            ...collectContextualProperties()
        };
        let next = core.updateAsset(project, assetId, values);
        next = core.updateAssetLayout(next, assetId, project.active_view, {
            width: elements.fieldWidth.value,
            height: elements.fieldHeight.value,
            icon_size: elements.fieldIconSize.value
        });
        project = next;
        saveProject();
        renderStage();
        renderInventory();
        renderReview();
        renderToolbar();
        graphAdapter.selectAsset(assetId);
    }

    function updateSelectedConnectionFromInspector() {
        if (!selected || selected.kind !== 'connection') return;
        pushHistory();
        const direction = elements.fieldConnectionDirection.value;
        project = core.updateConnection(project, selected.id, {
            type: elements.fieldConnectionType.value,
            label: elements.fieldConnectionLabel.value,
            direction,
            protocol: elements.fieldConnectionProtocol.value,
            bandwidth: elements.fieldConnectionBandwidth.value,
            bidirectional: direction === 'bidirectional' || elements.fieldBidirectional.checked
        });
        saveProject();
        renderStage();
        renderInventory();
        renderReview();
        renderToolbar();
    }

    elements.assetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        updateSelectedAssetFromInspector();
    });
    elements.assetForm.addEventListener('input', function (event) {
        if (!['INPUT', 'SELECT'].includes(event.target.tagName)) return;
        window.clearTimeout(inspectorUpdateTimer);
        inspectorUpdateTimer = window.setTimeout(updateSelectedAssetFromInspector, 280);
    });
    elements.assetForm.addEventListener('change', function () {
        window.clearTimeout(inspectorUpdateTimer);
        updateSelectedAssetFromInspector();
    });
    elements.connectionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        updateSelectedConnectionFromInspector();
    });
    elements.connectionForm.addEventListener('change', function (event) {
        window.clearTimeout(inspectorUpdateTimer);
        if (event.target === elements.fieldConnectionDirection) {
            elements.fieldBidirectional.checked = elements.fieldConnectionDirection.value === 'bidirectional';
        }
        if (event.target === elements.fieldBidirectional) {
            elements.fieldConnectionDirection.value = elements.fieldBidirectional.checked ? 'bidirectional' : 'source-to-target';
        }
        updateSelectedConnectionFromInspector();
    });
    elements.connectionForm.addEventListener('input', function (event) {
        if (event.target.type === 'checkbox') return;
        window.clearTimeout(inspectorUpdateTimer);
        inspectorUpdateTimer = window.setTimeout(updateSelectedConnectionFromInspector, 280);
    });
    elements.deleteItem.addEventListener('click', function () { graphAdapter.requestDelete(); });
    elements.zoomIn.addEventListener('click', function () { graphAdapter.zoom(1.2); });
    elements.zoomOut.addEventListener('click', function () { graphAdapter.zoom(1 / 1.2); });
    elements.fit.addEventListener('click', function () { graphAdapter.fit(); });
    elements.reviewAction.addEventListener('click', function () {
        byId('studio-review-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    elements.stage.addEventListener('keydown', function (event) {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
        const modifier = event.ctrlKey || event.metaKey;
        if (modifier && event.key.toLowerCase() === 'z') {
            event.preventDefault();
            event.shiftKey ? redo() : undo();
            return;
        }
        if (modifier && event.key.toLowerCase() === 'y') {
            event.preventDefault();
            redo();
            return;
        }
        if (modifier && event.key.toLowerCase() === 'd') {
            event.preventDefault();
            graphAdapter.requestDuplicate();
            return;
        }
        if (['Delete', 'Backspace'].includes(event.key)) {
            event.preventDefault();
            graphAdapter.requestDelete();
            return;
        }
        const step = event.shiftKey ? 10 : 1;
        const offsets = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
        if (offsets[event.key]) {
            event.preventDefault();
            graphAdapter.nudge(...offsets[event.key]);
        }
    });
    elements.referenceImport.addEventListener('click', function () { elements.referenceFile.click(); });
    elements.referenceFile.addEventListener('change', async function () {
        const file = elements.referenceFile.files[0];
        elements.referenceFile.value = '';
        if (!file || !['image/png', 'image/jpeg'].includes(file.type) || file.size > 15 * 1024 * 1024) {
            showMessage('Choose a PNG or JPEG up to 15 MB.', 'error');
            return;
        }
        try {
            await referenceStorage.saveReference(project.project_id, file);
            project = core.updateReference(project, {
                name: file.name,
                mime_type: file.type,
                visible: true,
                locked: true,
                x: 0,
                y: 0,
                width: core.canvasSize.width,
                height: core.canvasSize.height
            });
            saveProject();
            await loadReference();
            showMessage('Reference image stored in this browser.', 'success');
        } catch (error) {
            showMessage('The reference image could not be stored.', 'error');
        }
    });
    elements.referenceVisible.addEventListener('change', function () {
        project = core.updateReference(project, { visible: elements.referenceVisible.checked });
        saveProject();
        renderReference();
    });
    elements.referenceLocked.addEventListener('change', function () {
        project = core.updateReference(project, { locked: elements.referenceLocked.checked });
        saveProject();
        renderReference();
    });
    elements.referenceOpacity.addEventListener('input', function () {
        project = core.updateReference(project, { opacity: Number(elements.referenceOpacity.value) / 100 });
        saveProject();
        renderReference();
    });
    [elements.referenceX, elements.referenceY, elements.referenceWidth, elements.referenceHeight].forEach(function (input) {
        input.addEventListener('change', function () {
            project = core.updateReference(project, {
                x: elements.referenceX.value,
                y: elements.referenceY.value,
                width: elements.referenceWidth.value,
                height: elements.referenceHeight.value
            });
            saveProject();
            renderReference();
        });
    });
    elements.referenceFit.addEventListener('click', function () {
        project = core.updateReference(project, { x: 0, y: 0, width: core.canvasSize.width, height: core.canvasSize.height });
        saveProject();
        renderReference();
    });
    elements.referenceFrame.addEventListener('pointerdown', function (event) {
        if (!event.target.closest('.studio-reference-resize')) beginReferenceTransform(event, false);
    });
    elements.referenceFrame.querySelector('.studio-reference-resize').addEventListener('pointerdown', function (event) {
        beginReferenceTransform(event, true);
    });
    elements.referenceRemove.addEventListener('click', async function () {
        try {
            await referenceStorage.removeReference(project.project_id);
        } catch (error) {
            showMessage('Local reference storage could not be cleared.', 'warning');
        }
        project = core.updateReference(project, { name: '', mime_type: '', visible: false });
        saveProject();
        await loadReference();
        showMessage('Reference image removed.', 'success');
    });
    window.addEventListener('beforeunload', function () {
        if (referenceUrl) URL.revokeObjectURL(referenceUrl);
        graphAdapter.destroy();
    });

    render();
    loadCatalog();
    loadReference();
}
