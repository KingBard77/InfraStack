// studio.js

// [studio-bootstrap] Section: Start

import { improvements, rules } from './content.js';
import core from './core/studio-model.js';
import referenceStorage from './core/studio-storage.js';
import { StudioChart } from './library/studio-chart.js';
import { StudioMaxGraphAdapter } from './library/studio-maxgraph.js';
import packageLoaderFactory from './packages/studio-package.js';
import providerRegistry from './providers/registry.js';
import shareImageRenderer from './publish/share-image.js';
import layoutPublishFactory from './publish/share-publish.js';

const root = document.getElementById('infrastack-studio');

if (root && core && rules && improvements) {
    document.body.classList.add('studio-app-body');
    const layoutStorageKey = 'infrastack-studio-layout-v0.1';
    const recoveryStorageKey = 'infrastack-studio-recovery-v0.2';
    const layoutDefaults = {
        paletteCollapsed: false,
        inspectorCollapsed: false,
        paletteWidth: 250,
        inspectorWidth: 280,
        wideScreen: false,
        gridVisible: true,
        snapEnabled: true,
        guidesEnabled: true,
        gridSize: 10
    };
    const historyLimit = 40;
    const viewLabels = {
        overview: 'Overview',
        physical: 'Physical',
        network: 'Network',
        availability: 'Availability'
    };
    const byId = function (id) { return document.getElementById(id); };
    const libraryConfig = JSON.parse(root.dataset.libraryConfig || '{"groups":[],"libraries":[]}');
    const libraryDefinitions = Array.isArray(libraryConfig.libraries) ? libraryConfig.libraries : [];
    const providerLabels = Object.fromEntries(libraryDefinitions.map(function (definition) {
        return [definition.provider, definition.provider_label || definition.label];
    }));
    const packageRegistry = JSON.parse(root.dataset.packageRegistry || '{"packages":[]}');
    const packageLoader = packageLoaderFactory?.create(packageRegistry, providerRegistry);
    const defaultProvider = packageRegistry.packages?.find(function (entry) {
        return entry.provider && entry.provider !== 'generic';
    })?.provider || libraryDefinitions.find(function (definition) {
        return definition.provider !== 'generic';
    })?.provider || 'generic';
    const resolvedIconUrls = {};
    const elements = {
        projectName: byId('studio-project-name'),
        saveState: byId('studio-save-state'),
        shortcutsButton: byId('studio-shortcuts-button'),
        shortcutsDialog: byId('studio-shortcuts-dialog'),
        resetLayout: byId('studio-reset-layout'),
        wideScreen: byId('studio-wide-screen'),
        fullscreen: byId('studio-fullscreen'),
        paletteToggle: byId('studio-palette-toggle'),
        inspectorToggle: byId('studio-inspector-toggle'),
        paletteCollapse: byId('studio-palette-collapse'),
        inspectorCollapse: byId('studio-inspector-collapse'),
        paletteResizer: byId('studio-palette-resizer'),
        inspectorResizer: byId('studio-inspector-resizer'),
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
        historyPanel: byId('studio-history-panel'),
        historyList: byId('studio-history-list'),
        historyEmpty: byId('studio-history-empty'),
        historyCount: byId('studio-history-count'),
        catalogueBrowser: byId('studio-catalogue-browser'),
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
        templateFamily: byId('studio-template-family'),
        templateProvider: byId('studio-template-provider'),
        recoveryCard: byId('studio-recovery-card'),
        recoveryName: byId('studio-recovery-name'),
        recoveryMeta: byId('studio-recovery-meta'),
        recoverSession: byId('studio-recover-session'),
        discardRecovery: byId('studio-discard-recovery'),
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
        uploadCustomIcon: byId('studio-upload-custom-icon'),
        viewEyebrow: byId('studio-view-eyebrow'),
        stageTitle: byId('studio-stage-title'),
        stage: byId('studio-stage'),
        graph: byId('studio-graph'),
        emptyState: byId('studio-empty-state'),
        emptyUploadIcon: byId('studio-empty-upload-icon'),
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
        gridSize: byId('studio-grid-size'),
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
        imageAssetFile: byId('studio-image-asset-file'),
        imageProperties: byId('studio-image-properties'),
        fieldImageMode: byId('studio-field-image-mode'),
        fieldImageFit: byId('studio-field-image-fit'),
        fieldImageOpacity: byId('studio-field-image-opacity'),
        fieldImageOpacityValue: byId('studio-field-image-opacity-value'),
        fieldImagePadding: byId('studio-field-image-padding'),
        fieldImageBackground: byId('studio-field-image-background'),
        fieldImageBackgroundColor: byId('studio-field-image-background-color'),
        imageBackgroundColorWrap: byId('studio-image-background-color-wrap'),
        trimImage: byId('studio-trim-image'),
        resetImage: byId('studio-reset-image'),
        fieldImageLabel: byId('studio-field-image-label'),
        fieldImageWidth: byId('studio-field-image-width'),
        fieldImageHeight: byId('studio-field-image-height'),
        fieldImageIconSize: byId('studio-field-image-icon-size'),
        fieldImageLocked: byId('studio-field-image-locked'),
        fieldShape: byId('studio-field-shape'),
        fieldFillColor: byId('studio-field-fill-color'),
        fieldBorderColor: byId('studio-field-border-color'),
        fieldTextColor: byId('studio-field-text-color'),
        fieldBorderStyle: byId('studio-field-border-style'),
        fieldBorderWidth: byId('studio-field-border-width'),
        fieldFontSize: byId('studio-field-font-size'),
        fieldTextAlign: byId('studio-field-text-align'),
        fieldAssetLocked: byId('studio-field-asset-locked'),
        styleSelectionSummary: byId('studio-style-selection-summary'),
        styleDimensions: byId('studio-style-dimensions'),
        stylePreset: byId('studio-style-preset'),
        applyStylePreset: byId('studio-apply-style-preset'),
        deleteStylePreset: byId('studio-delete-style-preset'),
        stylePresetName: byId('studio-style-preset-name'),
        saveStylePreset: byId('studio-save-style-preset'),
        copyAssetStyle: byId('studio-copy-asset-style'),
        pasteAssetStyle: byId('studio-paste-asset-style'),
        duplicateItem: byId('studio-duplicate-item'),
        resetAssetStyle: byId('studio-reset-asset-style'),
        deleteItemStyle: byId('studio-delete-item-style'),
        connectionEndpoints: byId('studio-connection-endpoints'),
        fieldConnectionSource: byId('studio-field-connection-source'),
        fieldConnectionTarget: byId('studio-field-connection-target'),
        fieldConnectionType: byId('studio-field-connection-type'),
        fieldConnectionLabel: byId('studio-field-connection-label'),
        fieldConnectionDirection: byId('studio-field-connection-direction'),
        fieldConnectionProtocol: byId('studio-field-connection-protocol'),
        fieldConnectionBandwidth: byId('studio-field-connection-bandwidth'),
        fieldConnectionRoute: byId('studio-field-connection-route'),
        resetConnectionRoute: byId('studio-reset-connection-route'),
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
        overviewChart: byId('studio-overview-chart'),
        overviewChartSelect: byId('studio-overview-chart-select'),
        overviewSummary: byId('studio-overview-summary'),
        overviewAnalysisTitle: byId('studio-chart-analysis-title'),
        overviewTitle: byId('studio-chart-title'),
        overviewSubtitle: byId('studio-chart-subtitle'),
        overviewValues: byId('studio-chart-values'),
        overviewReset: byId('studio-chart-reset'),
        overviewDownload: byId('studio-chart-download'),
        overviewEmpty: byId('studio-chart-empty'),
        overviewEmptyMessage: byId('studio-chart-empty-message'),
        overviewAccessibility: byId('studio-chart-accessibility'),
        inventoryBody: byId('studio-inventory-body'),
        inventoryCount: byId('studio-inventory-count'),
        inventoryEmpty: byId('studio-inventory-empty'),
        inventoryTable: byId('studio-inventory-table'),
        grade: byId('studio-grade'),
        gradeLabel: byId('studio-grade-label'),
        score: byId('studio-score'),
        confidence: byId('studio-confidence'),
        findingCount: byId('studio-finding-count'),
        findingSummary: byId('studio-finding-summary'),
        categoryScores: byId('studio-category-scores'),
        restoreDismissed: byId('studio-restore-dismissed'),
        findings: byId('studio-findings'),
        improvementsEmpty: byId('studio-improvements-empty'),
        improvementsEmptyMessage: byId('studio-improvements-empty-message'),
        packageContent: byId('studio-package-content'),
        packageContentProvider: byId('studio-package-content-provider'),
        packageIntroductions: byId('studio-package-introductions'),
        packageIntroductionsEmpty: byId('studio-package-introductions-empty'),
        packageFaq: byId('studio-package-faq'),
        packageFaqEmpty: byId('studio-package-faq-empty'),
        packageReferences: byId('studio-package-references'),
        packageReferencesEmpty: byId('studio-package-references-empty'),
        contentSections: byId('studio-content-sections')
    };
    const appearanceControls = new Map([
        [elements.fieldShape, 'shape'],
        [elements.fieldFillColor, 'fill_color'],
        [elements.fieldBorderColor, 'border_color'],
        [elements.fieldTextColor, 'text_color'],
        [elements.fieldBorderStyle, 'border_style'],
        [elements.fieldBorderWidth, 'border_width'],
        [elements.fieldFontSize, 'font_size'],
        [elements.fieldTextAlign, 'text_align'],
        [elements.fieldAssetLocked, 'locked']
    ]);

// [studio-bootstrap] Section: End

// [studio-state] Section: Start

    let project = core.createEmptyProject();
    let catalog = [];
    let catalogueGroups = [];
    const catalogueSources = Object.fromEntries(libraryDefinitions.map(function (definition) {
        return [definition.id, {
            ...definition,
            url: definition.catalog_url,
            loaded: false,
            loadPromise: null
        }];
    }));
    let activeCatalogueLibrary = '';
    let activeCatalogueProvider = '';
    let activeTemplateFamily = '';
    let activeTemplateProvider = '';
    const layoutPreferences = loadLayoutPreferences();
    let paletteCollapsed = layoutPreferences.paletteCollapsed;
    let inspectorCollapsed = layoutPreferences.inspectorCollapsed;
    let paletteWidth = layoutPreferences.paletteWidth;
    let inspectorWidth = layoutPreferences.inspectorWidth;
    let wideScreenMode = layoutPreferences.wideScreen;
    let activeLibraryTab = 'components';
    let activeInspectorTab = 'properties';
    let gridVisible = layoutPreferences.gridVisible;
    let snapEnabled = layoutPreferences.snapEnabled;
    let guidesEnabled = layoutPreferences.guidesEnabled;
    let gridSize = layoutPreferences.gridSize;
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
    let overviewValuesVisible = false;
    let layoutFitTimer = null;
    let spacePanning = false;
    let styleClipboard = null;
    let recoveryProject = loadRecoveryProject();
    let recoveryDismissedForSession = false;
    let recoverySaveTimer = null;

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

    function hasRecoverableProject(candidate) {
        return candidate.assets.length > 0
            || candidate.connections.length > 0
            || Boolean(candidate.reference?.name)
            || candidate.name !== 'Untitled architecture';
    }

    function hasProjectData(candidate) {
        return candidate.assets.length > 0
            || candidate.connections.length > 0
            || Boolean(candidate.reference?.name);
    }

    function removeRecoveryStorage() {
        try {
            localStorage.removeItem(recoveryStorageKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    function loadRecoveryProject() {
        try {
            const stored = localStorage.getItem(recoveryStorageKey);
            if (!stored) return null;
            const storedRecovery = JSON.parse(stored);
            const candidate = storedRecovery.project || storedRecovery;
            const result = core.normalizeProject(candidate);
            if (result.ok && hasRecoverableProject(result.project)) {
                result.project.updated_at = storedRecovery.saved_at || candidate.updated_at || result.project.updated_at;
                return result.project;
            }
            removeRecoveryStorage();
        } catch (error) {
            removeRecoveryStorage();
        }
        return null;
    }

    function recoverySavedLabel(candidate) {
        const savedAt = new Date(candidate.updated_at);
        if (Number.isNaN(savedAt.getTime())) return 'Saved time unavailable';
        return `Saved ${new Intl.DateTimeFormat(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(savedAt)}`;
    }

    function renderRecoveryCard() {
        const visible = Boolean(recoveryProject) && !recoveryDismissedForSession;
        elements.recoveryCard.hidden = !visible;
        if (!visible) return;
        elements.recoveryName.textContent = recoveryProject.name;
        elements.recoveryMeta.textContent = `${recoveryProject.assets.length} assets · ${recoveryProject.connections.length} relationships · ${recoverySavedLabel(recoveryProject)}`;
    }

    function persistRecoveryProject() {
        window.clearTimeout(recoverySaveTimer);
        recoverySaveTimer = null;
        if (!hasRecoverableProject(project)) return;
        try {
            const payload = core.buildExportPayload(project);
            const recovery = { schema_version: '1.0', saved_at: project.updated_at, project: payload };
            localStorage.setItem(recoveryStorageKey, JSON.stringify(recovery));
            recoveryProject = { ...payload, updated_at: recovery.saved_at };
            recoveryDismissedForSession = true;
            elements.saveState.innerHTML = '<i aria-hidden="true"></i> Recovery saved locally';
            renderRecoveryCard();
        } catch (error) {
            elements.saveState.innerHTML = '<i aria-hidden="true"></i> Saved in this session only';
        }
    }

    function scheduleRecoverySave() {
        window.clearTimeout(recoverySaveTimer);
        recoverySaveTimer = window.setTimeout(persistRecoveryProject, 180);
    }

// [studio-workspace] Section: Start

    function clampPanelWidth(value) {
        return Math.min(420, Math.max(210, Number(value) || 0));
    }

    function loadLayoutPreferences() {
        try {
            const stored = JSON.parse(localStorage.getItem(layoutStorageKey) || '{}');
            return {
                paletteCollapsed: Boolean(stored.paletteCollapsed),
                inspectorCollapsed: Boolean(stored.inspectorCollapsed),
                paletteWidth: clampPanelWidth(stored.paletteWidth || layoutDefaults.paletteWidth),
                inspectorWidth: clampPanelWidth(stored.inspectorWidth || layoutDefaults.inspectorWidth),
                wideScreen: Boolean(stored.wideScreen),
                gridVisible: stored.gridVisible !== false,
                snapEnabled: stored.snapEnabled !== false,
                guidesEnabled: stored.guidesEnabled !== false,
                gridSize: [5, 10, 20, 40].includes(Number(stored.gridSize)) ? Number(stored.gridSize) : layoutDefaults.gridSize
            };
        } catch (error) {
            localStorage.removeItem(layoutStorageKey);
            return { ...layoutDefaults };
        }
    }

    function saveLayoutPreferences() {
        localStorage.setItem(layoutStorageKey, JSON.stringify({
            paletteCollapsed,
            inspectorCollapsed,
            paletteWidth,
            inspectorWidth,
            wideScreen: wideScreenMode,
            gridVisible,
            snapEnabled,
            guidesEnabled,
            gridSize
        }));
    }

    function applyPanelWidths() {
        root.style.setProperty('--studio-palette-width', `${paletteWidth}px`);
        root.style.setProperty('--studio-inspector-width', `${inspectorWidth}px`);
        elements.paletteResizer.setAttribute('aria-valuenow', String(paletteWidth));
        elements.inspectorResizer.setAttribute('aria-valuenow', String(inspectorWidth));
    }

    function scheduleLayoutFit() {
        window.clearTimeout(layoutFitTimer);
        layoutFitTimer = window.setTimeout(function () { graphAdapter.fit(); }, 100);
    }

    function isTypingTarget(target) {
        return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName) || target?.isContentEditable === true;
    }

    function setSpacePanning(enabled) {
        if (spacePanning === enabled) return;
        spacePanning = enabled;
        graphAdapter.setSpacePanning(enabled);
    }

    function updatePanelWidth(panel, width, persist = true) {
        if (panel === 'palette') paletteWidth = clampPanelWidth(width);
        if (panel === 'inspector') inspectorWidth = clampPanelWidth(width);
        applyPanelWidths();
        if (persist) saveLayoutPreferences();
    }

    function startPanelResize(event, panel) {
        if (event.button !== 0) return;
        event.preventDefault();
        const startX = event.clientX;
        const startWidth = panel === 'palette' ? paletteWidth : inspectorWidth;
        document.body.classList.add('is-studio-resizing');

        const resize = function (moveEvent) {
            const movement = moveEvent.clientX - startX;
            updatePanelWidth(panel, startWidth + (panel === 'palette' ? movement : -movement), false);
        };
        const stop = function () {
            document.body.classList.remove('is-studio-resizing');
            window.removeEventListener('pointermove', resize);
            window.removeEventListener('pointerup', stop);
            saveLayoutPreferences();
            scheduleLayoutFit();
        };

        window.addEventListener('pointermove', resize);
        window.addEventListener('pointerup', stop, { once: true });
    }

    function resizePanelWithKeyboard(event, panel) {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const currentWidth = panel === 'palette' ? paletteWidth : inspectorWidth;
        const movement = direction * (event.shiftKey ? 20 : 10) * (panel === 'palette' ? 1 : -1);
        updatePanelWidth(panel, currentWidth + movement);
        scheduleLayoutFit();
    }

// [studio-workspace] Section: End

    function createHistoryEntry(label, candidate = project) {
        return {
            label: label || 'Architecture changed',
            created_at: new Date().toISOString(),
            snapshot: JSON.stringify(candidate)
        };
    }

    function historyEntryProject(entry) {
        try {
            const result = core.normalizeProject(JSON.parse(entry.snapshot));
            return result.ok ? result.project : null;
        } catch (error) {
            return null;
        }
    }

    function historyEntryMeta(entry, candidate) {
        const timestamp = new Date(entry.created_at);
        const time = Number.isNaN(timestamp.getTime())
            ? 'This session'
            : new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(timestamp);
        return `${candidate.assets.length} assets · ${candidate.connections.length} relationships · ${time}`;
    }

    function renderHistoryPanel() {
        const fragment = document.createDocumentFragment();
        [...history].reverse().forEach(function (entry, reverseIndex) {
            const candidate = historyEntryProject(entry);
            if (!candidate) return;
            const index = history.length - reverseIndex - 1;
            const button = document.createElement('button');
            const icon = document.createElement('i');
            const copy = document.createElement('span');
            const title = document.createElement('strong');
            const meta = document.createElement('small');
            button.type = 'button';
            button.className = 'studio-history-item';
            button.setAttribute('aria-label', `Undo ${entry.label}`);
            icon.className = 'bi bi-arrow-counterclockwise';
            icon.setAttribute('aria-hidden', 'true');
            title.textContent = entry.label;
            meta.textContent = historyEntryMeta(entry, candidate);
            copy.append(title, meta);
            button.append(icon, copy);
            button.addEventListener('click', function () { restoreHistoryIndex(index); });
            fragment.append(button);
        });
        elements.historyList.replaceChildren(fragment);
        elements.historyCount.textContent = String(history.length);
        elements.historyEmpty.hidden = history.length > 0;
    }

    function pushHistory(label = 'Architecture changed') {
        history.push(createHistoryEntry(label));
        if (history.length > historyLimit) history.shift();
        future = [];
        renderHistoryPanel();
    }

    function projectChangeLabel(nextProject) {
        if (nextProject.name !== project.name) return 'Rename project';
        if (nextProject.assets.length > project.assets.length) return 'Add assets';
        if (nextProject.assets.length < project.assets.length) return 'Delete assets';
        if (nextProject.connections.length > project.connections.length) return 'Add relationships';
        if (nextProject.connections.length < project.connections.length) return 'Delete relationships';
        if (nextProject.active_view !== project.active_view) return 'Change Studio view';
        return 'Edit architecture';
    }

    function saveProject() {
        project.updated_at = new Date().toISOString();
        elements.saveState.innerHTML = '<i aria-hidden="true"></i> Changes saved in this session';
        scheduleRecoverySave();
    }

    function replaceProject(nextProject, options = {}) {
        if (options.history !== false) pushHistory(options.historyLabel || projectChangeLabel(nextProject));
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

    function projectViewSnapshot(view) {
        const assets = project.assets.filter(function (asset) {
            return asset.views.includes(view);
        }).map(function (asset) {
            return {
                id: asset.id,
                parent_id: asset.parent_id,
                layout: asset.layout[view]
            };
        }).sort(function (left, right) {
            return left.id.localeCompare(right.id);
        });
        const assetIds = new Set(assets.map(function (asset) { return asset.id; }));
        const connections = project.connections.filter(function (connection) {
            return assetIds.has(connection.source) && assetIds.has(connection.target);
        }).map(function (connection) {
            return {
                id: connection.id,
                source: connection.source,
                target: connection.target,
                routing: connection.routing?.[view] || null
            };
        }).sort(function (left, right) {
            return left.id.localeCompare(right.id);
        });

        return JSON.stringify({ assets, connections });
    }

    function availableProjectViews() {
        const overviewSnapshot = projectViewSnapshot('overview');

        return core.supportedViews.filter(function (view) {
            if (view === 'overview') return true;
            const viewAssets = project.assets.filter(function (asset) { return asset.views.includes(view); });
            const hasDistinctLayout = viewAssets.length > 0 && projectViewSnapshot(view) !== overviewSnapshot;
            if (!hasDistinctLayout) return false;
            if (view === 'physical') {
                const physicalProfile = /hybrid|on[- ]?prem|data ?center|physical/i.test(project.profile);
                const physicalAsset = viewAssets.some(function (asset) {
                    return asset.type === 'rack' || ['vendor', 'model', 'management_ip', 'interfaces', 'ports', 'vlans'].some(function (property) {
                        return Boolean(asset.properties[property]);
                    });
                });
                return physicalProfile || physicalAsset;
            }
            if (view === 'network') {
                return project.connections.length > 0 || viewAssets.some(function (asset) {
                    return ['vpc', 'subnet', 'router', 'switch', 'firewall', 'gateway'].some(function (type) {
                        return asset.type.includes(type);
                    });
                });
            }
            if (view === 'availability') {
                return project.connections.some(function (connection) { return connection.type === 'replication'; }) || viewAssets.some(function (asset) {
                    return asset.type === 'availability-zone' || Boolean(asset.properties.zone) || asset.properties.redundant === true;
                });
            }
            return true;
        });
    }

    function renderViewOptions() {
        const views = availableProjectViews();
        if (!views.includes(project.active_view)) project.active_view = 'overview';
        elements.viewSelect.replaceChildren(...views.map(function (view) {
            return new Option(viewLabels[view], view);
        }));
        elements.viewSelect.value = project.active_view;
    }

    function deleteItems(items) {
        if (!items.length) return;
        pushHistory('Delete selected items');
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

    function selectedAssets() {
        return selectedAssetIds().map(assetById).filter(Boolean);
    }

    function renderStylePresets() {
        const selectedPreset = elements.stylePreset.value;
        elements.stylePreset.replaceChildren();
        (project.style_presets || []).forEach(function (preset) {
            elements.stylePreset.add(new Option(preset.name, preset.id));
        });
        if (selectedPreset && [...elements.stylePreset.options].some(function (option) { return option.value === selectedPreset; })) {
            elements.stylePreset.value = selectedPreset;
        }
        const hasPreset = elements.stylePreset.options.length > 0;
        elements.stylePreset.disabled = !hasPreset;
        elements.applyStylePreset.disabled = !hasPreset || selectedAssetIds().length === 0;
        elements.deleteStylePreset.disabled = !hasPreset;
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

// [studio-state] Section: End

// [studio-canvas] Section: Start

    const overviewChart = new StudioChart(elements.overviewChart, {
        onVisibilityChange: function (hidden) {
            elements.overviewReset.disabled = !hidden;
        }
    });
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
            pushHistory('Move or resize assets');
            project = core.applyGraphSnapshot(project, project.active_view, snapshot);
            saveProject();
            renderInspector();
            renderOverview();
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
        onConnectionEndpointsChange: function (connectionId, source, target) {
            const connection = connectionById(connectionId);
            if (!connection) return;
            const validation = core.validateConnection(project, source, target, connection.type, connectionId);
            if (!validation.valid) {
                showMessage(validation.reason, 'error');
                renderStage();
                return;
            }
            replaceProject(core.updateConnection(project, connectionId, {
                type: connection.type,
                source,
                target
            }), { selected: { kind: 'connection', id: connectionId } });
        },
        onConnectionRouteChange: function (connectionId, route) {
            if (!connectionById(connectionId)) return;
            pushHistory('Edit relationship route');
            project = core.updateConnectionRoute(project, connectionId, project.active_view, route);
            saveProject();
            renderInspector();
            renderOverview();
            renderReview();
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

// [studio-canvas] Section: End

// [studio-library] Section: Start

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
        const iconUrl = definition.icon_url || resolvedIconUrls[definition.semantic_type || definition.type];
        const icon = iconUrl ? document.createElement('img') : document.createElement('span');
        const label = document.createElement('strong');
        button.type = 'button';
        button.className = 'studio-palette-item';
        button.title = `${definition.label} · ${definition.category}`;
        button.setAttribute('aria-label', `Add ${definition.label}`);
        if (icon instanceof HTMLImageElement) {
            icon.src = iconUrl;
            icon.alt = '';
            icon.loading = 'lazy';
            icon.decoding = 'async';
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
        if (providerLabels[provider]) return providerLabels[provider];
        return String(provider || '').split(/[-_]/).filter(Boolean).map(function (part) {
            return part.charAt(0).toUpperCase() + part.slice(1);
        }).join(' ');
    }

    function renderCatalogueFilters() {
        const libraryOptions = [
            new Option('Choose library', ''),
            new Option('All libraries', 'all')
        ];
        const groups = Array.isArray(libraryConfig.groups) ? libraryConfig.groups : [];
        groups.forEach(function (group) {
            const definitions = libraryDefinitions.filter(function (definition) {
                return definition.group === group.id;
            });
            if (!definitions.length) return;
            const optionGroup = document.createElement('optgroup');
            optionGroup.label = group.label;
            definitions.forEach(function (definition) {
                optionGroup.append(new Option(definition.label, definition.id));
            });
            libraryOptions.push(optionGroup);
        });
        elements.catalogueLibrary.replaceChildren(...libraryOptions);
        if (activeCatalogueLibrary !== 'all' && activeCatalogueLibrary && !catalogueSources[activeCatalogueLibrary]) {
            activeCatalogueLibrary = '';
        }
        elements.catalogueLibrary.value = activeCatalogueLibrary;

        const providers = [...new Set(libraryDefinitions.map(function (definition) {
            return definition.provider;
        }))].sort(function (left, right) {
            if (left === 'generic') return -1;
            if (right === 'generic') return 1;
            return left.localeCompare(right);
        });
        const providerOptions = [
            new Option('Choose provider', ''),
            new Option('All providers', 'all')
        ];
        providers.forEach(function (provider) {
            providerOptions.push(new Option(providerLabel(provider), provider));
        });
        elements.catalogueProvider.replaceChildren(...providerOptions);
        if (activeCatalogueProvider !== 'all' && activeCatalogueProvider && !providers.includes(activeCatalogueProvider)) {
            activeCatalogueProvider = '';
        }
        elements.catalogueProvider.value = activeCatalogueProvider;
    }

    function matchesCatalogueSearch(definition, query) {
        const matchesProvider = activeCatalogueProvider === 'all' || definition.provider === activeCatalogueProvider;
        const matchesLibrary = activeCatalogueLibrary === 'all' || definition.library_id === activeCatalogueLibrary;
        if (!matchesProvider) return false;
        if (!query) return matchesLibrary;
        const haystack = [
            definition.label,
            definition.category,
            definition.group,
            definition.section,
            definition.provider,
            definition.library_label,
            definition.library_group,
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
            empty.innerHTML = !activeCatalogueProvider && !activeCatalogueLibrary
                ? '<i class="bi bi-boxes"></i><strong>Choose a provider or library</strong><span>Components and icons load only when requested.</span>'
                : '<i class="bi bi-search"></i><strong>No matching assets</strong><span>Try another name, role, or provider.</span>';
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

    async function switchLibraryTab(tab) {
        activeLibraryTab = ['templates', 'history'].includes(tab) ? tab : 'components';
        const componentsActive = activeLibraryTab === 'components';
        const templatesActive = activeLibraryTab === 'templates';
        const historyActive = activeLibraryTab === 'history';
        elements.componentsTab.classList.toggle('is-active', componentsActive);
        elements.templatesTab.classList.toggle('is-active', templatesActive);
        elements.componentsTab.setAttribute('aria-selected', String(componentsActive));
        elements.templatesTab.setAttribute('aria-selected', String(templatesActive));
        elements.componentsPanel.hidden = !componentsActive;
        elements.templatesPanel.hidden = !templatesActive;
        elements.historyPanel.hidden = !historyActive;
        elements.railAssets.classList.toggle('is-active', componentsActive);
        elements.railTemplates.classList.toggle('is-active', templatesActive);
        elements.railHistory.classList.toggle('is-active', historyActive);
        elements.railHistory.setAttribute('aria-expanded', String(historyActive));
        if (historyActive) {
            renderHistoryPanel();
            renderRecoveryCard();
            return;
        }
        try {
            if (componentsActive) {
                if (activeCatalogueProvider || activeCatalogueLibrary) {
                    await loadProviderCatalogues(activeCatalogueProvider || catalogueSources[activeCatalogueLibrary]?.provider);
                }
                renderPalette();
            } else {
                renderTemplateFilters();
                renderTemplates();
            }
        } catch (error) {
            showMessage(`${providerLabel(activeCatalogueProvider)} ${componentsActive ? 'components' : 'templates'} could not be loaded.`, 'error');
        }
    }

    const contextualPropertyFields = {
        vpc: [
            { key: 'region', label: 'Cloud region', type: 'text', placeholder: 'ap-southeast-1 or southeastasia' },
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
        const providerService = /^(aws|azure|gcp)-/.test(String(asset.catalog_id || ''));
        if (['switch', 'router'].includes(asset.type) && !providerService) {
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

    function packageFamilyLabel(family) {
        return String(family || '').split(/[-_]/).filter(Boolean).map(function (part) {
            return part.charAt(0).toUpperCase() + part.slice(1);
        }).join(' ');
    }

    function renderTemplateFilters() {
        const entries = Array.isArray(packageRegistry.packages) ? packageRegistry.packages : [];
        const families = [...new Set(entries.map(function (entry) { return entry.family; }))].sort();
        const familyOptions = [new Option('Choose library', '')];
        families.forEach(function (family) {
            familyOptions.push(new Option(packageFamilyLabel(family), family));
        });
        elements.templateFamily.replaceChildren(...familyOptions);
        elements.templateFamily.value = activeTemplateFamily;

        const providers = [...new Set(entries.filter(function (entry) {
            return !activeTemplateFamily || entry.family === activeTemplateFamily;
        }).map(function (entry) { return entry.provider; }))].sort();
        const providerOptions = [new Option('Choose provider', '')];
        providers.forEach(function (provider) {
            providerOptions.push(new Option(providerLabel(provider), provider));
        });
        if (!providers.includes(activeTemplateProvider)) activeTemplateProvider = '';
        elements.templateProvider.replaceChildren(...providerOptions);
        elements.templateProvider.value = activeTemplateProvider;
    }

    function renderTemplates() {
        elements.templateList.replaceChildren();
        const templateProviders = activeTemplateFamily && activeTemplateProvider
            ? [activeTemplateProvider]
            : [];
        const visibleTemplates = templateProviders.flatMap(function (provider) {
            return (providerRegistry?.templates(provider) || []).map(function (definition) {
                return { ...definition, provider };
            });
        });
        elements.templateProviderLabel.textContent = activeTemplateFamily && activeTemplateProvider
            ? `${providerLabel(activeTemplateProvider)} ${packageFamilyLabel(activeTemplateFamily).toLowerCase()} examples`
            : 'Choose a library and provider';
        visibleTemplates.forEach(function (definition) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'studio-template-card';
            button.dataset.templateId = definition.id;
            button.innerHTML = `<i class="bi ${escapeHtml(definition.icon)}"></i><span><strong>${escapeHtml(definition.name)}</strong><small>${escapeHtml(definition.description)}</small></span>`;
            button.addEventListener('click', async function () {
                button.disabled = true;
                try {
                    await loadProviderCatalogues(definition.provider);
                } catch (error) {
                    showMessage(`${providerLabel(definition.provider)} icons could not be loaded.`, 'error');
                    button.disabled = false;
                    return;
                }
                const templateProject = providerRegistry?.createProject(definition.provider, core, definition.id);
                if (!templateProject) {
                    button.disabled = false;
                    return;
                }
                activeCatalogueProvider = definition.provider;
                activeCatalogueLibrary = 'all';
                replaceProject(templateProject, { historyLabel: `Load ${definition.name}` });
                renderCatalogueFilters();
                renderPalette();
                renderPackageContent();
                loadReference();
                showMessage(`${definition.name} loaded.`, 'success');
                window.setTimeout(function () { graphAdapter.fit(); }, 80);
                button.disabled = false;
            });
            elements.templateList.append(button);
        });
        if (!visibleTemplates.length) {
            const empty = document.createElement('p');
            empty.className = 'studio-template-empty';
            empty.textContent = activeTemplateFamily && activeTemplateProvider
                ? `No ${providerLabel(activeTemplateProvider)} templates are available for this library.`
                : 'Choose a template library and provider to load examples.';
            elements.templateList.append(empty);
        }
        elements.templateCount.textContent = String(visibleTemplates.length);
    }

// [studio-library] Section: End

// [studio-about] Section: Start

    function renderPackageContent() {
        const packages = !hasProjectData(project) || activeCatalogueProvider === 'all'
            ? []
            : (providerRegistry?.content(activeCatalogueProvider) || []);
        elements.packageContent.hidden = false;
        elements.packageIntroductions.replaceChildren();
        elements.packageFaq.replaceChildren();
        elements.packageReferences.replaceChildren();
        elements.packageContentProvider.textContent = packages.length
            ? providerLabel(activeCatalogueProvider)
            : 'No package selected';
        elements.packageIntroductionsEmpty.hidden = packages.length > 0;
        elements.packageFaqEmpty.hidden = false;
        elements.packageReferencesEmpty.hidden = false;
        if (!packages.length) return;

        const referenceUrls = new Set();
        packages.forEach(function (packageContent) {
            const introduction = document.createElement('article');
            const icon = document.createElement('span');
            const copy = document.createElement('div');
            const title = document.createElement('h3');
            const paragraph = document.createElement('p');
            icon.className = 'studio-package-introduction-icon';
            icon.innerHTML = '<i class="bi bi-diagram-3" aria-hidden="true"></i>';
            title.textContent = packageContent.package?.name || providerLabel(activeCatalogueProvider);
            paragraph.textContent = packageContent.introduction || '';
            copy.append(title, paragraph);
            introduction.append(icon, copy);
            elements.packageIntroductions.append(introduction);

            (packageContent.faq || []).forEach(function (item) {
                const details = document.createElement('details');
                const summary = document.createElement('summary');
                const rowIcon = document.createElement('span');
                const question = document.createElement('strong');
                const answer = document.createElement('p');
                rowIcon.innerHTML = '<i class="bi bi-question-lg" aria-hidden="true"></i>';
                question.textContent = item.question;
                answer.textContent = item.answer;
                summary.append(rowIcon, question);
                details.append(summary, answer);
                elements.packageFaq.append(details);
            });

            (packageContent.references || []).forEach(function (item) {
                if (referenceUrls.has(item.url)) return;
                referenceUrls.add(item.url);
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = item.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = item.title;
                listItem.append(link);
                elements.packageReferences.append(listItem);
            });
        });
        elements.packageFaqEmpty.hidden = elements.packageFaq.childElementCount > 0;
        elements.packageReferencesEmpty.hidden = elements.packageReferences.childElementCount > 0;
    }

// [studio-about] Section: End

// [studio-inspector] Section: Start

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

    function providerForProject(candidate, fallback = defaultProvider) {
        const providerIds = [...new Set(libraryDefinitions.map(function (definition) {
            return definition.provider;
        }))];
        const profileProvider = String(candidate.profile || '').split('-')[0].toLowerCase();
        if (providerIds.includes(profileProvider)) return profileProvider;
        const counts = candidate.assets.reduce(function (totals, asset) {
            const provider = String(asset.properties?.provider || '').toLowerCase();
            if (providerIds.includes(provider)) totals[provider] = (totals[provider] || 0) + 1;
            return totals;
        }, {});
        return Object.entries(counts).sort(function (left, right) { return right[1] - left[1]; })[0]?.[0] || fallback;
    }

    function projectProvider() {
        return providerForProject(project, activeCatalogueProvider);
    }

    function selectedPackageIntroduction() {
        const packageContent = providerRegistry?.content(projectProvider())?.[0];
        return packageContent?.introduction || 'Explore this read-only infrastructure architecture, its normalized inventory, and its Studio Result.';
    }

    const layoutPublish = layoutPublishFactory?.create({
        root,
        core,
        packageLoader,
        shareImageRenderer,
        resolvedIconUrls,
        getProject: function () { return project; },
        getProvider: projectProvider,
        getIntroduction: selectedPackageIntroduction,
        showMessage
    });

    function renderInspector() {
        const asset = selected && selected.kind === 'asset' ? assetById(selected.id) : null;
        const connection = selected && selected.kind === 'connection' ? connectionById(selected.id) : null;
        const assets = selectedAssets();
        const styleAsset = asset || assets[0] || null;
        const multipleAssets = assets.length > 1;
        elements.inspectorEmpty.hidden = Boolean(asset || connection || assets.length);
        elements.assetForm.hidden = assets.length === 0;
        elements.connectionForm.hidden = !connection;
        elements.deleteItem.disabled = selectedItems.length === 0;
        elements.propertiesTab.disabled = multipleAssets;
        if (multipleAssets && activeInspectorTab !== 'style') switchInspectorTab('style');
        if (multipleAssets) elements.selectedType.textContent = `${assets.length} assets selected`;
        if (!asset && !connection && assets.length === 0) {
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
            elements.imageProperties.hidden = !asset.image;
            if (asset.image) {
                elements.fieldImageMode.value = asset.image.mode;
                elements.fieldImageFit.value = asset.image.fit;
                elements.fieldImageOpacity.value = String(Math.round(asset.image.opacity * 100));
                elements.fieldImageOpacityValue.value = `${Math.round(asset.image.opacity * 100)}%`;
                elements.fieldImagePadding.value = String(asset.image.padding);
                elements.fieldImageBackground.value = asset.image.background;
                elements.fieldImageBackgroundColor.value = asset.image.background_color;
                elements.imageBackgroundColorWrap.hidden = asset.image.background !== 'color';
                elements.fieldImageLabel.checked = asset.image.show_label;
                elements.fieldImageWidth.value = String(Math.round(layout.width));
                elements.fieldImageHeight.value = String(Math.round(layout.height));
                elements.fieldImageIconSize.value = String(Math.round(layout.icon_size));
                elements.fieldImageLocked.checked = asset.appearance[project.active_view].locked;
            }
            renderContextualFields(asset);
        } else {
            elements.imageProperties.hidden = true;
        }
        if (styleAsset) {
            const appearance = styleAsset.appearance[project.active_view];
            const containsContainer = assets.some(function (candidate) { return candidate.is_container; });
            const ellipseOption = elements.fieldShape.querySelector('option[value="ellipse"]');
            ellipseOption.disabled = containsContainer;
            elements.fieldShape.value = containsContainer && appearance.shape === 'ellipse' ? 'rounded' : appearance.shape;
            elements.fieldFillColor.value = appearance.fill_color;
            elements.fieldBorderColor.value = appearance.border_color;
            elements.fieldTextColor.value = appearance.text_color;
            elements.fieldBorderStyle.value = appearance.border_style;
            elements.fieldBorderWidth.value = String(appearance.border_width);
            elements.fieldFontSize.value = String(appearance.font_size);
            elements.fieldTextAlign.value = appearance.text_align;
            elements.fieldAssetLocked.checked = assets.every(function (candidate) {
                return candidate.appearance[project.active_view].locked;
            });
            elements.styleDimensions.hidden = multipleAssets;
            elements.styleSelectionSummary.textContent = multipleAssets
                ? `${assets.length} assets selected. Appearance changes apply to every selected asset in ${viewLabels[project.active_view]}.`
                : `${styleAsset.label} · ${viewLabels[project.active_view]} style`;
            elements.duplicateItem.disabled = assets.length === 0;
            elements.resetAssetStyle.disabled = assets.length === 0;
            elements.deleteItemStyle.disabled = assets.length === 0;
            elements.copyAssetStyle.disabled = assets.length !== 1;
            elements.pasteAssetStyle.disabled = assets.length === 0 || !styleClipboard;
            renderStylePresets();
        }
        if (connection) {
            const source = assetById(connection.source);
            const target = assetById(connection.target);
            elements.connectionEndpoints.textContent = `${source ? source.label : 'Unknown'} → ${target ? target.label : 'Unknown'}`;
            const assets = visibleAssets().slice().sort(function (left, right) {
                return left.label.localeCompare(right.label);
            });
            [elements.fieldConnectionSource, elements.fieldConnectionTarget].forEach(function (select) {
                select.replaceChildren();
                assets.forEach(function (assetOption) {
                    select.add(new Option(assetOption.label, assetOption.id));
                });
            });
            elements.fieldConnectionSource.value = connection.source;
            elements.fieldConnectionTarget.value = connection.target;
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
            elements.fieldConnectionRoute.value = connection.routing?.[project.active_view]?.style || 'orthogonal';
            const bendCount = connection.routing?.[project.active_view]?.points?.length || 0;
            elements.resetConnectionRoute.disabled = bendCount === 0 && elements.fieldConnectionRoute.value === 'orthogonal';
        }
    }

// [studio-inspector] Section: End

// [studio-content-navigation] Section: Start

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

// [studio-content-navigation] Section: End

// [studio-inventory] Section: Start

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
        elements.inventoryEmpty.hidden = project.assets.length > 0;
        elements.inventoryTable.hidden = project.assets.length === 0;
    }

// [studio-inventory] Section: End

// [studio-graph] Section: Start

    function renderOverview() {
        const provider = projectProvider();
        const totals = overviewChart.render(project, provider, elements.overviewChartSelect.value);
        const providerName = providerLabel(provider);
        elements.overviewAnalysisTitle.textContent = totals.analysisTitle;
        elements.overviewTitle.textContent = totals.title;
        elements.overviewSubtitle.textContent = totals.subtitle;
        elements.overviewChart.setAttribute('aria-label', `${elements.overviewChartSelect.selectedOptions[0].text} for ${providerName} Studio project`);
        elements.overviewEmpty.hidden = !totals.empty;
        elements.overviewEmptyMessage.textContent = totals.emptyMessage;
        elements.overviewAccessibility.textContent = `${providerName}. ${totals.accessibilitySummary}`;
        elements.overviewSummary.textContent = totals.assets === 0
            ? `${providerName} · Empty project`
            : `${providerName} · ${totals.assets} assets · ${totals.connections} relationships`;
    }

// [studio-graph] Section: End

// [studio-result] Section: Start

    function renderReview() {
        const resultDefinition = providerRegistry?.results(projectProvider())?.[0] || null;
        const result = rules.evaluateProject(project, resultDefinition);
        const dismissedIds = new Set(project.accepted_risks || []);
        const findings = result.findings.filter(function (item) { return !dismissedIds.has(item.id); });
        const dismissedCount = result.findings.length - findings.length;
        elements.grade.textContent = result.grade || '—';
        elements.gradeLabel.textContent = result.grade_label;
        elements.score.textContent = result.score === null ? '—' : String(result.score);
        elements.confidence.textContent = result.score === null ? '—' : `${result.confidence}%`;
        elements.findingCount.textContent = String(findings.length);
        const high = findings.filter(function (item) { return ['critical', 'high'].includes(item.severity); }).length;
        elements.findingSummary.textContent = findings.length ? `${high} high priority · ${findings.length - high} guidance${dismissedCount ? ` · ${dismissedCount} dismissed` : ''}` : dismissedCount ? `${dismissedCount} finding${dismissedCount === 1 ? '' : 's'} dismissed` : 'No open deterministic findings';
        elements.restoreDismissed.hidden = dismissedCount === 0;
        elements.categoryScores.replaceChildren();
        Object.entries(result.category_scores).forEach(function (entry) {
            const item = document.createElement('div');
            item.className = 'studio-category-score';
            item.innerHTML = `<div><span>${escapeHtml(entry[0])}</span><strong>${escapeHtml(entry[1])}</strong></div><progress max="100" value="${escapeHtml(entry[1])}">${escapeHtml(entry[1])}</progress>`;
            elements.categoryScores.append(item);
        });
// [studio-improvements] Section: Start

        elements.findings.replaceChildren();
        if (!findings.length) {
            elements.findings.hidden = true;
            elements.improvementsEmpty.hidden = false;
            elements.improvementsEmptyMessage.textContent = dismissedCount
                ? 'All current findings are dismissed. Restore them to review the guidance again.'
                : project.assets.length
                    ? 'No deterministic findings are open for this rule pack.'
                    : 'Add assets to begin the architecture review.';
            return;
        }
        elements.findings.hidden = false;
        elements.improvementsEmpty.hidden = true;
        findings.forEach(function (item) {
            const card = document.createElement('article');
            const improvement = improvements.buildPlan(project, item);
            const projection = improvements.previewPlan(project, improvement, core, rules, {
                resolveDefinition: resolveCatalogueDefinition,
                resultDefinition
            });
            const categoryProjection = projection && result.category_scores[item.category] !== projection.category_scores[item.category]
                ? ` · ${item.category} ${result.category_scores[item.category]} → ${projection.category_scores[item.category]}`
                : '';
            card.className = 'studio-finding-card';
            card.dataset.severity = item.severity;
            card.innerHTML = `<div class="studio-finding-heading"><span class="studio-finding-severity">${escapeHtml(item.severity)}</span><small>${escapeHtml(item.category)}</small></div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p><div class="studio-finding-recommendation"><span>Recommended improvement</span><p>${escapeHtml(item.recommendation)}</p></div><div class="studio-improvement-plan"${previewFindingId === item.id ? '' : ' hidden'}><div><span>Guided plan</span>${projection ? `<strong>${escapeHtml(result.grade)} ${escapeHtml(result.score)} → ${escapeHtml(projection.grade)} ${escapeHtml(projection.score)}${escapeHtml(categoryProjection)}</strong>` : '<strong>Manual review</strong>'}</div><h3>${escapeHtml(improvement.title)}</h3><p>${escapeHtml(improvement.summary)}</p><ol>${improvement.changes.map(function (change) { return `<li>${escapeHtml(change)}</li>`; }).join('')}</ol></div>`;
            const references = (providerRegistry?.content(projectProvider())?.[0]?.references || []).filter(function (reference) {
                return (item.reference_ids || []).includes(reference.id);
            });
            if (references.length) {
                const referenceList = document.createElement('div');
                referenceList.className = 'studio-finding-references';
                const label = document.createElement('span');
                label.textContent = 'Official references';
                referenceList.append(label);
                references.forEach(function (reference) {
                    const link = document.createElement('a');
                    link.href = reference.url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.textContent = reference.title;
                    referenceList.append(link);
                });
                card.append(referenceList);
            }
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

// [studio-improvements] Section: End

    }

// [studio-result] Section: End

// [studio-shell] Section: Start

    function resolveCatalogueDefinition(catalogId) {
        const definition = catalog.find(function (item) {
            return item.catalog_id === catalogId || item.type === catalogId;
        });
        return definition ? { ...definition } : null;
    }

    function renderToolbar() {
        const fullscreenMode = document.fullscreenElement === root || document.webkitFullscreenElement === root;

        renderViewOptions();
        root.classList.toggle('is-palette-collapsed', paletteCollapsed);
        root.classList.toggle('is-inspector-collapsed', inspectorCollapsed);
        root.classList.toggle('is-wide-screen', wideScreenMode);
        root.classList.toggle('is-fullscreen-mode', fullscreenMode);
        root.classList.toggle('is-grid-visible', gridVisible);
        root.style.setProperty('--studio-grid-size', `${gridSize}px`);
        root.style.setProperty('--studio-grid-major', `${gridSize * 4}px`);
        applyPanelWidths();
        document.body.classList.toggle('is-studio-wide-screen', wideScreenMode && !fullscreenMode);
        elements.paletteToggle.hidden = !paletteCollapsed;
        elements.paletteToggle.setAttribute('aria-label', 'Expand component library');
        elements.paletteToggle.title = 'Expand component library';
        elements.inspectorToggle.hidden = !inspectorCollapsed;
        elements.inspectorToggle.setAttribute('aria-label', 'Expand inspector');
        elements.inspectorToggle.title = 'Expand inspector';
        elements.paletteCollapse.setAttribute('aria-label', 'Collapse component library');
        elements.paletteCollapse.title = 'Collapse component library';
        elements.inspectorCollapse.setAttribute('aria-label', 'Collapse inspector');
        elements.inspectorCollapse.title = 'Collapse inspector';
        elements.connect.classList.toggle('is-active', connectMode);
        elements.selectTool.classList.toggle('is-active', !connectMode);
        elements.railConnections.classList.toggle('is-active', connectMode);
        elements.connect.setAttribute('aria-pressed', String(connectMode));
        elements.wideScreen.classList.toggle('is-active', wideScreenMode);
        elements.wideScreen.setAttribute('aria-pressed', String(wideScreenMode));
        elements.wideScreen.setAttribute('aria-label', wideScreenMode ? 'Exit wide screen' : 'Enter wide screen');
        elements.wideScreen.title = wideScreenMode ? 'Exit wide screen' : 'Wide screen';
        elements.wideScreen.innerHTML = `<i class="bi ${wideScreenMode ? 'bi-arrows-angle-contract' : 'bi-aspect-ratio'}"></i>`;
        elements.fullscreen.classList.toggle('is-active', fullscreenMode);
        elements.fullscreen.setAttribute('aria-pressed', String(fullscreenMode));
        elements.fullscreen.setAttribute('aria-label', fullscreenMode ? 'Exit full screen' : 'Enter full screen');
        elements.fullscreen.title = fullscreenMode ? 'Exit full screen' : 'Full screen';
        elements.fullscreen.innerHTML = `<i class="bi ${fullscreenMode ? 'bi-fullscreen-exit' : 'bi-fullscreen'}"></i>`;
        elements.undo.disabled = history.length === 0;
        elements.redo.disabled = future.length === 0;
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
        elements.gridSize.value = String(gridSize);
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
        const hasReference = Boolean(reference.name);
        [elements.referenceVisible, elements.referenceLocked, elements.referenceOpacity, elements.referenceX, elements.referenceY, elements.referenceWidth, elements.referenceHeight, elements.referenceFit, elements.referenceRemove].forEach(function (control) {
            control.disabled = !hasReference;
        });
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
        renderOverview();
        renderReview();
        renderInventory();
        renderPackageContent();
        renderReference();
        renderHistoryPanel();
        renderRecoveryCard();
    }

    window.addEventListener('pagehide', function () { overviewChart.destroy(); }, { once: true });

// [studio-shell] Section: End

// [studio-persistence] Section: Start

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
        const entry = history.pop();
        const previousProject = historyEntryProject(entry);
        if (!previousProject) return;
        future.push(createHistoryEntry(entry.label, project));
        replaceProject(previousProject, { history: false });
    }

    function redo() {
        if (!future.length) return;
        const entry = future.pop();
        const nextProject = historyEntryProject(entry);
        if (!nextProject) return;
        history.push(createHistoryEntry(entry.label, project));
        replaceProject(nextProject, { history: false });
    }

    function restoreHistoryIndex(index) {
        if (!Number.isInteger(index) || index < 0 || index >= history.length) return;
        let nextProject = project;
        while (history.length > index) {
            const entry = history.pop();
            const previousProject = historyEntryProject(entry);
            if (!previousProject) continue;
            future.push(createHistoryEntry(entry.label, nextProject));
            nextProject = previousProject;
        }
        replaceProject(nextProject, { history: false });
        showMessage('Earlier Studio state restored.', 'success');
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
        reader.addEventListener('load', async function () {
            try {
                const result = core.normalizeProject(JSON.parse(String(reader.result || '')));
                if (!result.ok) return showMessage(result.error, 'error');
                const provider = providerForProject(result.project);
                await loadProviderResources(provider);
                activeCatalogueProvider = provider;
                activeCatalogueLibrary = 'all';
                renderCatalogueFilters();
                replaceProject(result.project);
                renderPalette();
                renderTemplates();
                renderPackageContent();
                loadReference();
                showMessage('Studio project restored.', 'success');
            } catch (error) {
                showMessage('The selected file is not valid Studio JSON.', 'error');
            }
        });
        reader.readAsText(file);
    }

    async function recoverPreviousSession() {
        if (!recoveryProject) return;
        const result = core.normalizeProject(recoveryProject);
        if (!result.ok) {
            removeRecoveryStorage();
            recoveryProject = null;
            renderRecoveryCard();
            showMessage('The previous session could not be recovered.', 'error');
            return;
        }
        const provider = providerForProject(result.project);
        elements.recoverSession.disabled = true;
        try {
            await loadProviderResources(provider);
            activeCatalogueProvider = provider;
            activeCatalogueLibrary = 'all';
            recoveryDismissedForSession = true;
            renderCatalogueFilters();
            replaceProject(result.project, { history: false });
            renderPalette();
            renderTemplates();
            renderPackageContent();
            await loadReference();
            showMessage(`${result.project.name} recovered.`, 'success');
            window.setTimeout(function () { graphAdapter.fit(); }, 80);
        } catch (error) {
            recoveryDismissedForSession = false;
            renderRecoveryCard();
            showMessage('The previous session resources could not be loaded.', 'error');
        } finally {
            elements.recoverSession.disabled = false;
        }
    }

    function discardRecoveryProject() {
        if (!recoveryProject) return;
        if (!window.confirm(`Discard the saved recovery for “${recoveryProject.name}”? This cannot be undone.`)) return;
        window.clearTimeout(recoverySaveTimer);
        recoverySaveTimer = null;
        if (!removeRecoveryStorage()) {
            showMessage('The saved recovery could not be discarded in this browser.', 'error');
            return;
        }
        recoveryProject = null;
        recoveryDismissedForSession = false;
        renderRecoveryCard();
        showMessage('Previous session recovery discarded.', 'neutral');
    }

    function normalizeCatalogueAsset(definition, source) {
        const provider = definition.provider || source.provider;
        const normalized = {
            ...definition,
            provider,
            library_id: source.id,
            library_group: source.group,
            library_label: source.label
        };
        const iconKey = definition.catalog_id || definition.type;
        normalized.icon_url = definition.icon_url || null;
        if (normalized.icon_url) resolvedIconUrls[iconKey] = normalized.icon_url;
        return normalized;
    }

    /**
     * Loads one provider catalogue once and merges it into the Studio palette.
     *
     * @param {string} libraryId Studio library identity.
     * @returns {Promise<void>} Resolves after the source is available.
     */
    async function loadCatalogueSource(libraryId) {
        const source = catalogueSources[libraryId];
        if (!source || source.loaded) return;
        if (!source.loadPromise) {
            source.loadPromise = fetch(source.url, { headers: { Accept: 'application/json' } })
                .then(function (response) {
                    if (!response.ok) throw new Error(`${libraryId} catalogue request failed.`);
                    return response.json();
                })
                .then(function (payload) {
                    const sourceAssets = Array.isArray(payload.assets) ? payload.assets : [];
                    const sourceGroups = Array.isArray(payload.groups) ? payload.groups : [];
                    catalog = catalog.concat(sourceAssets.map(function (definition) {
                        return normalizeCatalogueAsset(definition, source);
                    }));
                    sourceGroups.forEach(function (group) {
                        if (!catalogueGroups.some(function (candidate) { return candidate.id === group.id; })) {
                            catalogueGroups.push(group);
                        }
                    });
                    source.loaded = true;
                })
                .catch(function (error) {
                    source.loadPromise = null;
                    throw error;
                });
        }
        await source.loadPromise;
    }

    function requestedProviders(provider) {
        return provider === 'all'
            ? [...new Set(libraryDefinitions.map(function (definition) { return definition.provider; }))]
            : ['generic', provider];
    }

    /**
     * Loads Generic plus the requested provider catalogues once.
     *
     * @param {string} provider Provider identity or all.
     * @returns {Promise<void>} Resolves when component definitions are registered.
     */
    async function loadProviderCatalogues(provider) {
        const providers = requestedProviders(provider);
        const sources = Object.values(catalogueSources).filter(function (source) {
            return providers.includes(source.provider);
        });
        await Promise.all(sources.map(function (source) { return loadCatalogueSource(source.id); }));
    }

    /**
     * Loads the requested provider packages without loading component icons.
     *
     * @param {string} provider Provider identity or all.
     * @returns {Promise<void>} Resolves when template, result, and content data is registered.
     */
    async function loadProviderPackages(provider) {
        const packageProviders = requestedProviders(provider).filter(function (candidate) {
            return candidate !== 'generic';
        });
        await Promise.all(packageProviders.map(function (candidate) {
            return packageLoader?.loadProvider(candidate);
        }));
    }

    /**
     * Loads all resources required by a selected or restored project.
     *
     * @param {string} provider Provider identity or all.
     * @returns {Promise<void>} Resolves when catalogues and packages are registered.
     */
    async function loadProviderResources(provider) {
        await Promise.all([
            loadProviderCatalogues(provider),
            loadProviderPackages(provider)
        ]);
    }

// [studio-persistence] Section: End

// [studio-events] Section: Start

    elements.componentsTab.addEventListener('click', function () { switchLibraryTab('components'); });
    elements.templatesTab.addEventListener('click', function () { switchLibraryTab('templates'); });
    async function loadSelectedTemplatePackages() {
        if (!activeTemplateFamily || !activeTemplateProvider) {
            renderTemplates();
            return;
        }
        try {
            await loadProviderPackages(activeTemplateProvider);
            renderTemplates();
        } catch (error) {
            showMessage(`${providerLabel(activeTemplateProvider)} templates could not be loaded.`, 'error');
        }
    }
    elements.templateFamily.addEventListener('change', async function () {
        activeTemplateFamily = elements.templateFamily.value;
        renderTemplateFilters();
        await loadSelectedTemplatePackages();
    });
    elements.templateProvider.addEventListener('change', async function () {
        activeTemplateProvider = elements.templateProvider.value;
        await loadSelectedTemplatePackages();
    });
    elements.propertiesTab.addEventListener('click', function () { switchInspectorTab('properties'); });
    elements.styleTab.addEventListener('click', function () { switchInspectorTab('style'); });
    elements.templateRestore.addEventListener('click', function () { elements.importFile.click(); });
    elements.recoverSession.addEventListener('click', recoverPreviousSession);
    elements.discardRecovery.addEventListener('click', discardRecoveryProject);
    elements.restoreDismissed.addEventListener('click', function () {
        const next = { ...project, accepted_risks: [] };
        replaceProject(core.normalizeProject(next).project);
        showMessage('Dismissed findings restored.', 'neutral');
    });
    elements.wideScreen.addEventListener('click', function () {
        wideScreenMode = !wideScreenMode;
        saveLayoutPreferences();
        renderToolbar();
        scheduleLayoutFit();
    });
    elements.fullscreen.addEventListener('click', async function () {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
        const requestFullscreen = root.requestFullscreen || root.webkitRequestFullscreen;
        const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;

        try {
            if (fullscreenElement === root) {
                await exitFullscreen.call(document);
            } else if (requestFullscreen) {
                await requestFullscreen.call(root);
            } else {
                showMessage('Full screen is not supported by this browser.', 'error');
            }
        } catch (error) {
            showMessage('Full screen could not be opened.', 'error');
        }
    });
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (eventName) {
        document.addEventListener(eventName, function () {
            renderToolbar();
            window.setTimeout(function () { graphAdapter.fit(); }, 80);
        });
    });
    elements.selectTool.addEventListener('click', function () {
        connectMode = false;
        connectSourceId = null;
        renderToolbar();
        elements.stage.focus();
    });
    elements.insertImage.addEventListener('click', function () { elements.imageAssetFile.click(); });
    elements.bottomZoomIn.addEventListener('click', function () { graphAdapter.zoom(1.2); });
    elements.bottomZoomOut.addEventListener('click', function () { graphAdapter.zoom(1 / 1.2); });
    elements.bottomFit.addEventListener('click', function () { graphAdapter.fit(); });
    elements.gridVisible.addEventListener('change', function () {
        gridVisible = elements.gridVisible.checked;
        saveLayoutPreferences();
        renderToolbar();
    });
    elements.snapEnabled.addEventListener('change', function () {
        snapEnabled = elements.snapEnabled.checked;
        graphAdapter.setSnapEnabled(snapEnabled);
        saveLayoutPreferences();
        renderToolbar();
    });
    elements.guidesEnabled.addEventListener('change', function () {
        guidesEnabled = elements.guidesEnabled.checked;
        graphAdapter.setGuidesEnabled(guidesEnabled);
        saveLayoutPreferences();
        renderToolbar();
    });
    elements.gridSize.addEventListener('change', function () {
        gridSize = Number(elements.gridSize.value);
        graphAdapter.setGridSize(gridSize);
        saveLayoutPreferences();
        renderToolbar();
    });
    elements.railCanvas.addEventListener('click', function () { elements.stage.focus(); });
    elements.railProjects.addEventListener('click', function () { switchLibraryTab('templates'); });
    elements.railFiles.addEventListener('click', function () { elements.importFile.click(); });
    elements.railTemplates.addEventListener('click', function () { switchLibraryTab('templates'); });
    elements.railAssets.addEventListener('click', function () { switchLibraryTab('components'); });
    elements.railConnections.addEventListener('click', function () { elements.connect.click(); });
    elements.railHistory.addEventListener('click', function () { switchLibraryTab('history'); });
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
    elements.stage.addEventListener('pointerdown', function () {
        elements.stage.focus({ preventScroll: true });
    }, true);
    elements.graph.addEventListener('wheel', function (event) {
        event.preventDefault();
        graphAdapter.zoomAt(event.deltaY < 0 ? 1.12 : (1 / 1.12), event.clientX, event.clientY);
    }, { passive: false });
    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            switchLibraryTab('components');
            elements.catalogueSearch.focus();
        }
        if (event.key === ' ' && !isTypingTarget(event.target) && root.contains(event.target)) {
            event.preventDefault();
            setSpacePanning(true);
        }
        if (event.key === 'Alt') graphAdapter.setSnapBypass(true);
    });
    window.addEventListener('keyup', function (event) {
        if (event.key === ' ') setSpacePanning(false);
        if (event.key === 'Alt') graphAdapter.setSnapBypass(false);
    });
    window.addEventListener('blur', function () {
        setSpacePanning(false);
        graphAdapter.setSnapBypass(false);
    });
    elements.viewSelect.addEventListener('change', function () {
        project.active_view = elements.viewSelect.value;
        selectedItems = [];
        selected = null;
        connectSourceId = null;
        saveProject();
        render();
    });
    elements.overviewChartSelect.addEventListener('change', renderOverview);
    elements.overviewValues.addEventListener('click', function () {
        overviewValuesVisible = !overviewValuesVisible;
        overviewChart.setDataLabelsVisible(overviewValuesVisible);
        elements.overviewValues.classList.toggle('is-active', overviewValuesVisible);
        elements.overviewValues.setAttribute('aria-pressed', String(overviewValuesVisible));
        elements.overviewValues.querySelector('span').textContent = overviewValuesVisible ? 'Hide values' : 'Show values';
    });
    elements.overviewReset.addEventListener('click', function () {
        overviewChart.resetVisibility();
        showMessage('Chart legend visibility restored.', 'success');
    });
    elements.overviewDownload.addEventListener('click', function () {
        const chartName = elements.overviewChartSelect.selectedOptions[0].text;
        if (overviewChart.downloadPng(`${project.name}-${chartName}`)) {
            showMessage(`${chartName} chart downloaded as PNG.`, 'success');
        }
    });
    elements.catalogueLibrary.addEventListener('change', async function () {
        activeCatalogueLibrary = elements.catalogueLibrary.value;
        const selectedLibrary = catalogueSources[activeCatalogueLibrary];
        if (selectedLibrary) {
            activeCatalogueProvider = selectedLibrary.provider;
            elements.catalogueProvider.value = activeCatalogueProvider;
        } else if (!activeCatalogueLibrary) {
            activeCatalogueProvider = '';
            elements.catalogueProvider.value = '';
        }
        elements.catalogueSearch.value = '';
        try {
            if (selectedLibrary) {
                await loadProviderCatalogues(selectedLibrary.provider);
            }
            renderPalette();
        } catch (error) {
            showMessage('The selected Studio library could not be loaded.', 'error');
        }
    });
    elements.catalogueProvider.addEventListener('change', async function () {
        activeCatalogueProvider = elements.catalogueProvider.value;
        activeCatalogueLibrary = activeCatalogueProvider ? 'all' : '';
        elements.catalogueLibrary.value = activeCatalogueLibrary;
        elements.catalogueSearch.value = '';
        try {
            if (activeCatalogueProvider) {
                await loadProviderCatalogues(activeCatalogueProvider);
            }
            renderPalette();
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
    function togglePalettePanel() {
        paletteCollapsed = !paletteCollapsed;
        saveLayoutPreferences();
        renderToolbar();
        scheduleLayoutFit();
    }
    function toggleInspectorPanel() {
        inspectorCollapsed = !inspectorCollapsed;
        saveLayoutPreferences();
        renderToolbar();
        scheduleLayoutFit();
    }
    elements.paletteToggle.addEventListener('click', togglePalettePanel);
    elements.paletteCollapse.addEventListener('click', togglePalettePanel);
    elements.inspectorToggle.addEventListener('click', toggleInspectorPanel);
    elements.inspectorCollapse.addEventListener('click', toggleInspectorPanel);
    elements.paletteResizer.addEventListener('pointerdown', function (event) { startPanelResize(event, 'palette'); });
    elements.inspectorResizer.addEventListener('pointerdown', function (event) { startPanelResize(event, 'inspector'); });
    elements.paletteResizer.addEventListener('keydown', function (event) { resizePanelWithKeyboard(event, 'palette'); });
    elements.inspectorResizer.addEventListener('keydown', function (event) { resizePanelWithKeyboard(event, 'inspector'); });
    elements.resetLayout.addEventListener('click', function () {
        paletteCollapsed = layoutDefaults.paletteCollapsed;
        inspectorCollapsed = layoutDefaults.inspectorCollapsed;
        paletteWidth = layoutDefaults.paletteWidth;
        inspectorWidth = layoutDefaults.inspectorWidth;
        wideScreenMode = layoutDefaults.wideScreen;
        gridVisible = layoutDefaults.gridVisible;
        snapEnabled = layoutDefaults.snapEnabled;
        guidesEnabled = layoutDefaults.guidesEnabled;
        gridSize = layoutDefaults.gridSize;
        graphAdapter.setGridSize(gridSize);
        graphAdapter.setSnapEnabled(snapEnabled);
        graphAdapter.setGuidesEnabled(guidesEnabled);
        saveLayoutPreferences();
        renderToolbar();
        scheduleLayoutFit();
        showMessage('Studio panel layout reset.', 'success');
    });
    elements.shortcutsButton.addEventListener('click', function () { elements.shortcutsDialog.showModal(); });
    elements.newProject.addEventListener('click', function () {
        if (hasRecoverableProject(project)) persistRecoveryProject();
        replaceProject(core.createEmptyProject());
        recoveryDismissedForSession = false;
        renderRecoveryCard();
        loadReference();
        showMessage('New local project created.', 'success');
    });
    elements.projectName.addEventListener('change', function () {
        pushHistory('Rename project');
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
        pushHistory('Edit asset properties');
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
        const asset = assetById(assetId);
        if (asset?.image) {
            next = core.updateAssetImage(next, assetId, {
                mode: elements.fieldImageMode.value,
                fit: elements.fieldImageFit.value,
                opacity: Number(elements.fieldImageOpacity.value) / 100,
                show_label: elements.fieldImageLabel.checked,
                padding: elements.fieldImagePadding.value,
                background: elements.fieldImageBackground.value,
                background_color: elements.fieldImageBackgroundColor.value
            });
        }
        next = core.updateAssetLayout(next, assetId, project.active_view, {
            width: asset?.image ? elements.fieldImageWidth.value : elements.fieldWidth.value,
            height: asset?.image ? elements.fieldImageHeight.value : elements.fieldHeight.value,
            icon_size: asset?.image ? elements.fieldImageIconSize.value : elements.fieldIconSize.value
        });
        next = core.updateAssetAppearance(next, assetId, project.active_view, {
            shape: elements.fieldShape.value,
            fill_color: elements.fieldFillColor.value,
            border_color: elements.fieldBorderColor.value,
            text_color: elements.fieldTextColor.value,
            border_style: elements.fieldBorderStyle.value,
            border_width: elements.fieldBorderWidth.value,
            font_size: elements.fieldFontSize.value,
            text_align: elements.fieldTextAlign.value,
            locked: asset?.image ? elements.fieldImageLocked.checked : elements.fieldAssetLocked.checked
        });
        project = next;
        saveProject();
        renderStage();
        renderOverview();
        renderInventory();
        renderReview();
        renderToolbar();
        graphAdapter.selectAsset(assetId);
    }

    function applyAppearanceToSelection(changes, message) {
        const assetIds = selectedAssetIds();
        if (!assetIds.length) return;
        pushHistory('Apply asset style');
        project = core.updateAssetAppearances(project, assetIds, project.active_view, changes);
        saveProject();
        renderStage();
        renderInspector();
        renderOverview();
        renderInventory();
        renderReview();
        renderToolbar();
        graphAdapter.selectAssets(assetIds);
        if (message) showMessage(message, 'success');
    }

    function updateSelectionAppearanceFromControl(control) {
        const field = appearanceControls.get(control);
        if (!field) return;
        const value = field === 'locked' ? control.checked : control.value;
        applyAppearanceToSelection({ [field]: value });
    }

    function resetSelectedAssetStyle() {
        const assetIds = selectedAssetIds();
        if (!assetIds.length) return;
        pushHistory('Reset asset style');
        assetIds.forEach(function (assetId) {
            project = core.resetAssetAppearance(project, assetId, project.active_view);
        });
        saveProject();
        renderStage();
        renderInspector();
        renderToolbar();
        graphAdapter.selectAssets(assetIds);
        showMessage(`Style reset for ${assetIds.length} asset${assetIds.length === 1 ? '' : 's'} in ${viewLabels[project.active_view]}.`, 'success');
    }

    function copySelectedAssetStyle() {
        const assets = selectedAssets();
        if (assets.length !== 1) return;
        styleClipboard = core.appearanceFields.reduce(function (style, field) {
            style[field] = assets[0].appearance[project.active_view][field];
            return style;
        }, {});
        renderInspector();
        showMessage(`Style copied from ${assets[0].label}.`, 'success');
    }

    function pasteStyleToSelection() {
        if (!styleClipboard) return;
        const count = selectedAssetIds().length;
        applyAppearanceToSelection(styleClipboard, `Style pasted to ${count} asset${count === 1 ? '' : 's'}.`);
    }

    function applySelectedStylePreset() {
        const preset = (project.style_presets || []).find(function (candidate) {
            return candidate.id === elements.stylePreset.value;
        });
        if (!preset) return;
        const count = selectedAssetIds().length;
        applyAppearanceToSelection(preset.appearance, `${preset.name} applied to ${count} asset${count === 1 ? '' : 's'}.`);
    }

    function saveCurrentStylePreset() {
        const asset = selectedAssets()[0];
        if (!asset) return;
        const result = core.saveStylePreset(project, elements.stylePresetName.value, asset.appearance[project.active_view]);
        if (!result.presetId) {
            showMessage('Enter a preset name.', 'warning');
            elements.stylePresetName.focus();
            return;
        }
        pushHistory('Save style preset');
        project = result.project;
        elements.stylePresetName.value = '';
        saveProject();
        renderInspector();
        elements.stylePreset.value = result.presetId;
        showMessage('Style preset saved with the project.', 'success');
    }

    function deleteSelectedStylePreset() {
        const presetId = elements.stylePreset.value;
        if (!presetId) return;
        pushHistory('Delete style preset');
        project = core.removeStylePreset(project, presetId);
        saveProject();
        renderInspector();
        showMessage('Style preset removed.', 'neutral');
    }

    function updateSelectedConnectionFromInspector() {
        if (!selected || selected.kind !== 'connection') return;
        const direction = elements.fieldConnectionDirection.value;
        const validation = core.validateConnection(
            project,
            elements.fieldConnectionSource.value,
            elements.fieldConnectionTarget.value,
            elements.fieldConnectionType.value,
            selected.id
        );
        if (!validation.valid) {
            showMessage(validation.reason, 'error');
            renderInspector();
            renderStage();
            return;
        }
        pushHistory('Edit relationship');
        project = core.updateConnection(project, selected.id, {
            source: elements.fieldConnectionSource.value,
            target: elements.fieldConnectionTarget.value,
            type: elements.fieldConnectionType.value,
            label: elements.fieldConnectionLabel.value,
            direction,
            protocol: elements.fieldConnectionProtocol.value,
            bandwidth: elements.fieldConnectionBandwidth.value,
            bidirectional: direction === 'bidirectional' || elements.fieldBidirectional.checked
        });
        project = core.updateConnectionRoute(project, selected.id, project.active_view, {
            style: elements.fieldConnectionRoute.value
        });
        saveProject();
        renderStage();
        renderOverview();
        renderInventory();
        renderReview();
        renderToolbar();
    }

    function resetSelectedConnectionRoute() {
        if (!selected || selected.kind !== 'connection') return;
        pushHistory('Reset relationship route');
        project = core.updateConnectionRoute(project, selected.id, project.active_view, {
            style: 'orthogonal',
            points: []
        });
        saveProject();
        renderStage();
        renderInspector();
        showMessage(`Route reset for ${viewLabels[project.active_view]}.`, 'success');
    }

    elements.trimImage.addEventListener('click', function () {
        const asset = selected?.kind === 'asset' ? assetById(selected.id) : null;
        if (asset?.image) updateSelectedImageSource(asset.image.data_url, true);
    });
    elements.resetImage.addEventListener('click', function () {
        const asset = selected?.kind === 'asset' ? assetById(selected.id) : null;
        if (asset?.image) updateSelectedImageSource(asset.image.original_data_url, false);
    });
    elements.fieldImageBackground.addEventListener('change', function () {
        elements.imageBackgroundColorWrap.hidden = elements.fieldImageBackground.value !== 'color';
    });
    elements.assetForm.addEventListener('submit', function (event) {
        event.preventDefault();
        updateSelectedAssetFromInspector();
    });
    elements.assetForm.addEventListener('input', function (event) {
        if (!['INPUT', 'SELECT'].includes(event.target.tagName)) return;
        if ([elements.stylePreset, elements.stylePresetName].includes(event.target)) return;
        if (event.target === elements.fieldImageOpacity) {
            elements.fieldImageOpacityValue.value = `${elements.fieldImageOpacity.value}%`;
        }
        window.clearTimeout(inspectorUpdateTimer);
        inspectorUpdateTimer = window.setTimeout(function () {
            if (appearanceControls.has(event.target)) {
                updateSelectionAppearanceFromControl(event.target);
            } else {
                updateSelectedAssetFromInspector();
            }
        }, 280);
    });
    elements.assetForm.addEventListener('change', function (event) {
        if ([elements.stylePreset, elements.stylePresetName].includes(event.target)) return;
        window.clearTimeout(inspectorUpdateTimer);
        if (appearanceControls.has(event.target)) {
            updateSelectionAppearanceFromControl(event.target);
        } else {
            updateSelectedAssetFromInspector();
        }
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
    elements.resetConnectionRoute.addEventListener('click', resetSelectedConnectionRoute);
    elements.duplicateItem.addEventListener('click', function () {
        duplicateSelection(selectedAssetIds());
    });
    elements.resetAssetStyle.addEventListener('click', resetSelectedAssetStyle);
    elements.deleteItemStyle.addEventListener('click', function () {
        deleteItems(selectedAssetIds().map(function (id) { return { kind: 'asset', id: id }; }));
    });
    elements.copyAssetStyle.addEventListener('click', copySelectedAssetStyle);
    elements.pasteAssetStyle.addEventListener('click', pasteStyleToSelection);
    elements.applyStylePreset.addEventListener('click', applySelectedStylePreset);
    elements.saveStylePreset.addEventListener('click', saveCurrentStylePreset);
    elements.deleteStylePreset.addEventListener('click', deleteSelectedStylePreset);
    elements.deleteItem.addEventListener('click', function () { graphAdapter.requestDelete(); });
    elements.zoomIn.addEventListener('click', function () { graphAdapter.zoom(1.2); });
    elements.zoomOut.addEventListener('click', function () { graphAdapter.zoom(1 / 1.2); });
    elements.fit.addEventListener('click', function () { graphAdapter.fit(); });
    elements.reviewAction.addEventListener('click', function () {
        byId('studio-review-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    elements.stage.addEventListener('keydown', function (event) {
        if (isTypingTarget(event.target)) return;
        const modifier = event.ctrlKey || event.metaKey;
        if (event.key === '?') {
            event.preventDefault();
            elements.shortcutsDialog.showModal();
            return;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            if (connectMode) {
                connectMode = false;
                connectSourceId = null;
                renderToolbar();
            } else {
                graphAdapter.clearSelection();
            }
            return;
        }
        if (modifier && event.key.toLowerCase() === 'a') {
            event.preventDefault();
            graphAdapter.selectAllVisible();
            return;
        }
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
        if (!modifier && event.key.toLowerCase() === 'f') {
            event.preventDefault();
            graphAdapter.fit();
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
    function openImageAssetPicker() {
        elements.imageAssetFile.click();
    }

    function trimTransparentImage(image, mimeType) {
        const original = { dataUrl: image.src, width: image.naturalWidth, height: image.naturalHeight };
        if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 12000000) {
            return original;
        }
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context) return original;
        context.drawImage(image, 0, 0);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let left = canvas.width;
        let top = canvas.height;
        let right = -1;
        let bottom = -1;

        for (let y = 0; y < canvas.height; y += 1) {
            for (let x = 0; x < canvas.width; x += 1) {
                if (pixels[((y * canvas.width) + x) * 4 + 3] <= 16) continue;
                left = Math.min(left, x);
                top = Math.min(top, y);
                right = Math.max(right, x);
                bottom = Math.max(bottom, y);
            }
        }
        if (right < left || bottom < top || (left === 0 && top === 0 && right === canvas.width - 1 && bottom === canvas.height - 1)) {
            return original;
        }
        const width = right - left + 1;
        const height = bottom - top + 1;
        const cropped = document.createElement('canvas');
        cropped.width = width;
        cropped.height = height;
        cropped.getContext('2d').drawImage(canvas, left, top, width, height, 0, 0, width, height);
        const dataUrl = cropped.toDataURL(mimeType);

        return dataUrl.length <= 3000000 ? { dataUrl, width, height } : original;
    }

    function imageAssetSize(imageWidth, imageHeight, maximumDimension) {
        const aspectRatio = Math.max(0.1, Math.min(10, imageWidth / imageHeight));

        if (aspectRatio >= 1) {
            return { width: maximumDimension, height: Math.max(88, Math.round(maximumDimension / aspectRatio)) };
        }
        return { width: Math.max(132, Math.round(maximumDimension * aspectRatio)), height: maximumDimension };
    }

    function initialImageAssetSize(imageWidth, imageHeight, zoom) {
        const maximumDimension = Math.round(Math.min(640, Math.max(320, 260 / zoom)));
        return imageAssetSize(imageWidth, imageHeight, maximumDimension);
    }

    function loadEmbeddedImage(dataUrl) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.addEventListener('load', function () { resolve(image); }, { once: true });
            image.addEventListener('error', reject, { once: true });
            image.src = dataUrl;
        });
    }

    async function updateSelectedImageSource(dataUrl, trim) {
        if (!selected || selected.kind !== 'asset') return;
        const asset = assetById(selected.id);
        if (!asset?.image) return;

        try {
            const sourceImage = await loadEmbeddedImage(dataUrl);
            const source = trim ? trimTransparentImage(sourceImage, asset.image.mime_type) : {
                dataUrl,
                width: sourceImage.naturalWidth,
                height: sourceImage.naturalHeight
            };
            if (source.dataUrl === asset.image.data_url) {
                showMessage(trim ? 'The image has no additional transparent space to trim.' : 'The original image is already active.', 'neutral');
                return;
            }
            const currentLayout = asset.layout[project.active_view];
            const size = imageAssetSize(source.width, source.height, Math.max(currentLayout.width, currentLayout.height));
            pushHistory(trim ? 'Trim image transparency' : 'Reset image source');
            let next = core.updateAssetImage(project, asset.id, { data_url: source.dataUrl });
            next = core.updateAssetLayout(next, asset.id, project.active_view, size);
            project = next;
            saveProject();
            render();
            graphAdapter.selectAsset(asset.id);
            showMessage(trim ? 'Transparent image space trimmed.' : 'Original image restored.', 'success');
        } catch (error) {
            showMessage('The embedded image could not be processed.', 'error');
        }
    }

    elements.uploadCustomIcon.addEventListener('click', openImageAssetPicker);
    elements.emptyUploadIcon.addEventListener('click', openImageAssetPicker);
    elements.imageAssetFile.addEventListener('change', function () {
        const file = elements.imageAssetFile.files[0];
        elements.imageAssetFile.value = '';
        if (!file || !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) {
            showMessage('Choose a PNG, JPEG, or WebP image up to 2 MB.', 'error');
            return;
        }
        const reader = new FileReader();
        reader.addEventListener('error', function () {
            showMessage('The image could not be read.', 'error');
        });
        reader.addEventListener('load', function () {
            const uploadedImage = new Image();
            uploadedImage.addEventListener('error', function () {
                showMessage('The image dimensions could not be read.', 'error');
            });
            uploadedImage.addEventListener('load', function () {
                const viewport = graphAdapter.viewport();
                const trimmed = trimTransparentImage(uploadedImage, file.type);
                const size = initialImageAssetSize(trimmed.width, trimmed.height, viewport.zoom);
                const x = ((elements.graph.clientWidth / 2) - viewport.pan_x) / viewport.zoom - (size.width / 2);
                const y = ((elements.graph.clientHeight / 2) - viewport.pan_y) / viewport.zoom - (size.height / 2);
                const result = core.addImageAsset(project, {
                    label: file.name.replace(/\.[^.]+$/, ''),
                    data_url: trimmed.dataUrl,
                    original_data_url: String(reader.result),
                    mime_type: file.type,
                    mode: 'image',
                    fit: 'contain',
                    opacity: 1,
                    show_label: false,
                    padding: 0,
                    background: 'transparent',
                    background_color: '#ffffff',
                    x,
                    y,
                    width: size.width,
                    height: size.height
                }, project.active_view);
                if (!result.assetId) {
                    showMessage('The image format could not be embedded.', 'error');
                    return;
                }
                inspectorCollapsed = false;
                activeInspectorTab = 'properties';
                saveLayoutPreferences();
                replaceProject(result.project, { selected: { kind: 'asset', id: result.assetId } });
                switchInspectorTab('properties');
                graphAdapter.selectAsset(result.assetId);
                showMessage('Custom icon added. Image properties are open in the Inspector.', 'success');
            });
            uploadedImage.src = String(reader.result);
        });
        reader.readAsDataURL(file);
    });
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
        if (recoverySaveTimer) persistRecoveryProject();
        if (referenceUrl) URL.revokeObjectURL(referenceUrl);
        layoutPublish?.destroy();
        graphAdapter.destroy();
    });

// [studio-events] Section: End

// [studio-initialization] Section: Start

    function initializeStudio() {
        graphAdapter.setGridSize(gridSize);
        graphAdapter.setSnapEnabled(snapEnabled);
        graphAdapter.setGuidesEnabled(guidesEnabled);
        renderCatalogueFilters();
        renderPalette();
        render();
        loadReference();
    }

    initializeStudio();

// [studio-initialization] Section: End

}
