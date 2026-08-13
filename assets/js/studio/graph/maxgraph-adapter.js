import {
    DragSource,
    Graph,
    InternalEvent,
    Outline,
    RubberBandHandler,
    getDefaultPlugins
} from '@maxgraph/core';

const assetPrefix = 'asset:';
const connectionPrefix = 'connection:';

function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
}

function assetIdForCell(cell) {
    const id = cell && cell.getId ? String(cell.getId() || '') : '';
    return id.startsWith(assetPrefix) ? id.slice(assetPrefix.length) : null;
}

function connectionIdForCell(cell) {
    const id = cell && cell.getId ? String(cell.getId() || '') : '';
    return id.startsWith(connectionPrefix) ? id.slice(connectionPrefix.length) : null;
}

function edgeColor(type) {
    return {
        network: '#1f2937', vpn: '#7c3aed', peering: '#2563eb', trust: '#dc2626',
        api: '#0891b2', replication: '#16a34a', administration: '#d97706'
    }[type] || '#64748b';
}

function edgeDash(type) {
    return ['vpn', 'peering', 'trust', 'administration'].includes(type);
}

function boundaryColor(type) {
    return {
        domain: '#94a3b8', environment: '#a5b4fc', vpc: '#86bff0',
        'availability-zone': '#b9d7ee', subnet: '#c5ddec', rack: '#94a3b8'
    }[type] || '#64748b';
}

function nodeValue(asset, iconUrl) {
    const initials = String(asset.label || '').split(/\s+/).filter(Boolean).slice(0, 2).map(function (word) {
        return word[0];
    }).join('').toUpperCase();
    const icon = iconUrl ? `<img src="${escapeHtml(iconUrl)}" alt="">` : `<span class="studio-graph-card-glyph">${escapeHtml(initials)}</span>`;
    const detail = asset.properties.role || asset.category;

    return `<div class="studio-graph-card" style="--studio-cell-icon:${asset.layout.icon_size}px">` +
        `<span class="studio-graph-card-icon">${icon}</span>` +
        `<span class="studio-graph-card-copy"><strong>${escapeHtml(asset.label)}</strong><small>${escapeHtml(detail)}</small></span></div>`;
}

function boundaryValue(asset) {
    let detail = asset.properties.address || asset.properties.zone || asset.properties.role || asset.category;
    if (asset.type === 'vpc') {
        detail = [asset.properties.region, asset.properties.address].filter(Boolean).join(' · ');
    } else if (['availability-zone', 'subnet'].includes(asset.type)) {
        detail = asset.properties.role || asset.properties.address || asset.properties.zone || asset.category;
    }
    return `<div class="studio-graph-boundary-label is-${escapeHtml(asset.type)}"><strong>${escapeHtml(asset.label)}</strong><small>${escapeHtml(detail)}</small></div>`;
}

function globalGeometry(asset, view) {
    return asset.layout[view];
}

function relativePosition(asset, parentAsset, view) {
    const layout = globalGeometry(asset, view);
    const parentLayout = parentAsset ? globalGeometry(parentAsset, view) : null;

    return [
        layout.x - (parentLayout ? parentLayout.x : 0),
        layout.y - (parentLayout ? parentLayout.y : 0)
    ];
}

/**
 * Bridges InfraStack normalized architecture state to the maxGraph editor.
 */
export class StudioMaxGraphAdapter {
    /**
     * Creates an interactive graph editor.
     *
     * @param {HTMLElement} container Graph host.
     * @param {HTMLElement} outlineContainer Minimap host.
     * @param {object} callbacks Adapter event callbacks.
     */
    constructor(container, outlineContainer, callbacks = {}) {
        this.callbacks = callbacks;
        this.project = null;
        this.view = 'overview';
        this.iconUrls = {};
        this.rendering = false;
        this.snapEnabled = true;
        this.guidesEnabled = true;
        this.paletteDragSources = [];
        this.graph = new Graph(container, undefined, [...getDefaultPlugins(), RubberBandHandler]);
        this.outline = new Outline(this.graph, outlineContainer);
        this.configureGraph();
        this.attachListeners();
    }

    configureGraph() {
        InternalEvent.disableContextMenu(this.graph.container);
        this.graph.setPanning(true);
        this.graph.setTooltips(true);
        this.graph.setConnectable(true);
        this.graph.setAllowDanglingEdges(false);
        this.graph.setCellsEditable(true);
        this.graph.setCellsMovable(true);
        this.graph.setCellsResizable(true);
        this.graph.setCellsCloneable(true);
        this.graph.setDropEnabled(true);
        this.graph.setSwimlaneNesting(true);
        this.graph.setGridEnabled(true);
        this.graph.gridSize = 10;
        this.graph.keepEdgesInBackground = true;
        this.graph.htmlLabels = true;
        this.graph.isHtmlLabel = function () { return true; };
        this.graph.isValidDropTarget = (target, cells) => this.isValidAssetDropTarget(target, cells);
        const isToggleEvent = this.graph.isToggleEvent.bind(this.graph);
        this.graph.isToggleEvent = function (event) {
            return event.shiftKey || isToggleEvent(event);
        };
        this.graph.getEditingValue = (cell) => {
            const assetId = assetIdForCell(cell);
            const connectionId = connectionIdForCell(cell);
            const asset = this.project && this.project.assets.find(function (candidate) { return candidate.id === assetId; });
            const connection = this.project && this.project.connections.find(function (candidate) { return candidate.id === connectionId; });
            return asset ? asset.label : (connection ? connection.label || connection.type : '');
        };
        const panning = this.graph.getPlugin('PanningHandler');
        if (panning) panning.useLeftButtonForPanning = false;
    }

    attachListeners() {
        this.graph.getSelectionModel().addListener(InternalEvent.CHANGE, () => {
            if (this.rendering) return;
            const selection = this.selectedItems();
            if (this.callbacks.onSelectionChange) this.callbacks.onSelectionChange(selection);
        });
        [InternalEvent.CELLS_MOVED, InternalEvent.CELLS_RESIZED, InternalEvent.CELLS_ADDED].forEach((eventName) => {
            this.graph.addListener(eventName, (sender, event) => this.handleGraphMutation(eventName, event));
        });
        this.graph.addListener(InternalEvent.LABEL_CHANGED, (sender, event) => {
            if (this.rendering || !this.callbacks.onLabelChange) return;
            const cell = event.getProperty('cell');
            const assetId = assetIdForCell(cell);
            const connectionId = connectionIdForCell(cell);
            const label = String(event.getProperty('value') || '').replace(/<[^>]*>/g, '').trim();
            if (assetId) this.callbacks.onLabelChange(assetId, label);
            if (connectionId && this.callbacks.onConnectionLabelChange) {
                this.callbacks.onConnectionLabelChange(connectionId, label);
            }
        });
        this.graph.getView().addListener(InternalEvent.SCALE, () => this.emitViewport());
        this.graph.getView().addListener(InternalEvent.SCALE_AND_TRANSLATE, () => this.emitViewport());
        this.graph.getView().addListener(InternalEvent.TRANSLATE, () => this.emitViewport());
    }

    handleGraphMutation(eventName, event) {
        if (this.rendering) return;
        const pendingEdges = this.graph.getChildEdges(this.graph.getDefaultParent()).filter(function (cell) {
            return !connectionIdForCell(cell);
        });
        if (pendingEdges.length && this.callbacks.onConnectionCreate) {
            pendingEdges.forEach((edge) => {
                const source = assetIdForCell(edge.getTerminal(true));
                const target = assetIdForCell(edge.getTerminal(false));
                if (source && target) this.callbacks.onConnectionCreate(source, target);
            });
            return;
        }
        const changedCells = event && event.getProperty ? event.getProperty('cells') || [] : [];
        if (eventName === InternalEvent.CELLS_ADDED && changedCells.some(assetIdForCell)) return;
        let snapshot = this.snapshot();
        if (eventName === InternalEvent.CELLS_MOVED) {
            snapshot = this.resolveMovedParents(snapshot, changedCells);
        }
        if (this.callbacks.onGeometryChange) this.callbacks.onGeometryChange(snapshot, eventName);
    }

    /**
     * Checks whether maxGraph may use a boundary as a visual and semantic drop target.
     *
     * @param {object} target Candidate maxGraph cell.
     * @param {Array<object>} cells Cells being moved.
     * @returns {boolean} True when every moved asset may use the target boundary.
     */
    isValidAssetDropTarget(target, cells) {
        const targetId = assetIdForCell(target);
        const targetAsset = this.project && this.project.assets.find(function (asset) {
            return asset.id === targetId;
        });
        const assetIds = (Array.isArray(cells) ? cells : []).map(assetIdForCell).filter(Boolean);

        if (!targetAsset || !targetAsset.is_container || assetIds.length === 0) return false;
        if (!this.callbacks.canReparent) return true;

        return assetIds.every((assetId) => {
            const validation = this.callbacks.canReparent(assetId, targetId);
            return validation === true || Boolean(validation && validation.valid);
        });
    }

    /**
     * Resolves final hierarchy from moved asset centers and visible boundary geometry.
     *
     * @param {Array<object>} snapshot Current global geometry snapshot.
     * @param {Array<object>} movedCells maxGraph cells moved in the completed gesture.
     * @returns {Array<object>} Snapshot with validated parent assignments.
     */
    resolveMovedParents(snapshot, movedCells) {
        const rowMap = new Map(snapshot.map(function (row) { return [row.id, row]; }));
        const assetMap = new Map(this.project.assets.map(function (asset) { return [asset.id, asset]; }));
        const movedIds = new Set((Array.isArray(movedCells) ? movedCells : []).map(assetIdForCell).filter(Boolean));
        const rootMovedIds = [...movedIds].filter(function (assetId) {
            let parent = assetMap.get(assetMap.get(assetId) && assetMap.get(assetId).parent_id);
            while (parent) {
                if (movedIds.has(parent.id)) return false;
                parent = assetMap.get(parent.parent_id);
            }
            return true;
        });
        const visibleContainers = this.project.assets.filter((asset) => {
            return asset.is_container && asset.views.includes(this.view) && rowMap.has(asset.id);
        });

        rootMovedIds.forEach((assetId) => {
            const row = rowMap.get(assetId);
            const asset = assetMap.get(assetId);
            if (!row || !asset) return;
            const centerX = row.x + (row.width / 2);
            const centerY = row.y + (row.height / 2);
            const candidates = visibleContainers.filter((container) => {
                if (container.id === assetId) return false;
                const containerRow = rowMap.get(container.id);
                const containsCenter = centerX >= containerRow.x && centerX <= containerRow.x + containerRow.width &&
                    centerY >= containerRow.y && centerY <= containerRow.y + containerRow.height;
                if (!containsCenter) return false;
                if (!this.callbacks.canReparent) return true;
                const validation = this.callbacks.canReparent(assetId, container.id);
                return validation === true || Boolean(validation && validation.valid);
            }).sort(function (left, right) {
                const leftRow = rowMap.get(left.id);
                const rightRow = rowMap.get(right.id);
                return (leftRow.width * leftRow.height) - (rightRow.width * rightRow.height);
            });
            const originalParent = assetMap.get(asset.parent_id);
            row.parent_id = candidates.length > 0 ? candidates[0].id :
                (originalParent && !originalParent.views.includes(this.view) ? originalParent.id : null);
        });

        return snapshot;
    }

    emitViewport() {
        if (!this.rendering && this.callbacks.onViewportChange) this.callbacks.onViewportChange(this.viewport());
    }

    assetStyle(asset) {
        if (asset.is_container) {
            const color = boundaryColor(asset.type);
            const startSize = { vpc: 52, 'availability-zone': 46, subnet: 42 }[asset.type] || 38;
            return {
                shape: 'swimlane', html: true, rounded: true, arcSize: 16, startSize,
                fillColor: '#ffffff', fillOpacity: 78, strokeColor: color, strokeWidth: 2,
                dashed: asset.type === 'environment', fontColor: '#172033',
                fontFamily: 'Roboto', fontSize: 13, align: 'left', verticalAlign: 'top', spacingLeft: 8,
                collapsible: true, recursiveResize: false
            };
        }
        return {
            shape: 'rectangle', html: true, rounded: true, arcSize: 12, whiteSpace: 'wrap', overflow: 'hidden',
            fillColor: '#ffffff', strokeColor: '#cbd5e1', strokeWidth: 1, shadow: true,
            fontColor: '#172033', fontFamily: 'Roboto', fontSize: 12, align: 'left', verticalAlign: 'middle',
            spacing: 0, rotatable: true
        };
    }

    connectionStyle(connection) {
        return {
            edgeStyle: 'orthogonalEdgeStyle', rounded: true, orthogonalLoop: true, jettySize: 'auto',
            strokeColor: edgeColor(connection.type), strokeWidth: connection.type === 'replication' ? 4 : 2,
            dashed: edgeDash(connection.type), endArrow: connection.bidirectional ? 'classic' : 'block',
            startArrow: connection.bidirectional ? 'classic' : 'none', html: true, fontFamily: 'Roboto',
            fontSize: 11, fontColor: '#475569', labelBackgroundColor: '#ffffff'
        };
    }

    /**
     * Renders a normalized project projection into maxGraph.
     *
     * @param {object} project Normalized Studio project.
     * @param {string} view Active projection.
     * @param {object} iconUrls Asset icon URLs keyed by type.
     */
    render(project, view, iconUrls) {
        this.project = project;
        this.view = view;
        this.iconUrls = iconUrls;
        this.rendering = true;
        const selectedIds = this.selectedItems().map(function (item) { return `${item.kind}:${item.id}`; });
        const visibleAssets = project.assets.filter(function (asset) { return asset.views.includes(view); });
        const visibleIds = new Set(visibleAssets.map(function (asset) { return asset.id; }));
        const assetMap = new Map(visibleAssets.map(function (asset) { return [asset.id, asset]; }));
        const cells = new Map();
        const root = this.graph.getDefaultParent();

        this.graph.batchUpdate(() => {
            this.graph.removeCells(this.graph.getChildCells(root, true, true));
            const insertAsset = (asset) => {
                if (cells.has(asset.id)) return cells.get(asset.id);
                const parentAsset = assetMap.get(asset.parent_id) || null;
                const parentCell = parentAsset ? insertAsset(parentAsset) : root;
                const layout = globalGeometry(asset, view);
                const cell = this.graph.insertVertex({
                    parent: parentCell,
                    id: `${assetPrefix}${asset.id}`,
                    value: asset.is_container ? boundaryValue(asset) : nodeValue(
                        { ...asset, layout },
                        iconUrls[asset.catalog_id] || iconUrls[asset.type] || asset.icon
                    ),
                    position: relativePosition(asset, parentAsset, view),
                    size: [layout.width, layout.height],
                    style: this.assetStyle(asset)
                });
                cells.set(asset.id, cell);
                return cell;
            };
            visibleAssets.filter(function (asset) { return asset.is_container; }).forEach(insertAsset);
            visibleAssets.filter(function (asset) { return !asset.is_container; }).forEach(insertAsset);
            project.connections.forEach((connection) => {
                if (!visibleIds.has(connection.source) || !visibleIds.has(connection.target)) return;
                this.graph.insertEdge({
                    parent: root,
                    id: `${connectionPrefix}${connection.id}`,
                    value: '',
                    source: cells.get(connection.source),
                    target: cells.get(connection.target),
                    style: this.connectionStyle(connection)
                });
            });
        });
        this.setViewport(project.viewports[view]);
        const selection = selectedIds.map((key) => {
            const [kind, id] = key.split(':');
            return this.graph.getDataModel().getCell(`${kind === 'asset' ? assetPrefix : connectionPrefix}${id}`);
        }).filter(Boolean);
        this.graph.setSelectionCells(selection);
        this.rendering = false;
        this.graph.refresh();
    }

    /**
     * Returns selected normalized asset and connection identities.
     *
     * @returns {Array<{kind: string, id: string}>} Selected identities.
     */
    selectedItems() {
        return this.graph.getSelectionCells().map(function (cell) {
            const assetId = assetIdForCell(cell);
            return assetId ? { kind: 'asset', id: assetId } : { kind: 'connection', id: connectionIdForCell(cell) };
        }).filter(function (item) { return Boolean(item.id); });
    }

    absolutePosition(cell) {
        const geometry = cell.getGeometry();
        let x = geometry.x;
        let y = geometry.y;
        let parent = cell.getParent();
        while (parent && assetIdForCell(parent)) {
            const parentGeometry = parent.getGeometry();
            x += parentGeometry.x;
            y += parentGeometry.y;
            parent = parent.getParent();
        }
        return { x, y };
    }

    /**
     * Returns normalized geometry and hierarchy from the current graph.
     *
     * @returns {Array<object>} Asset layout snapshot.
     */
    snapshot() {
        const rows = [];
        const visit = (cell) => {
            const id = assetIdForCell(cell);
            if (id) {
                const geometry = cell.getGeometry();
                const position = this.absolutePosition(cell);
                rows.push({
                    id,
                    x: position.x,
                    y: position.y,
                    width: geometry.width,
                    height: geometry.height,
                    parent_id: this.snapshotParentId(cell, id)
                });
            }
            for (let index = 0; index < cell.getChildCount(); index += 1) {
                visit(cell.getChildAt(index));
            }
        };
        visit(this.graph.getDataModel().getRoot());
        return rows;
    }

    snapshotParentId(cell, assetId) {
        const graphParentId = assetIdForCell(cell.getParent());
        if (graphParentId) return graphParentId;
        const asset = this.project.assets.find(function (candidate) { return candidate.id === assetId; });
        const originalParent = asset && this.project.assets.find(function (candidate) {
            return candidate.id === asset.parent_id;
        });
        if (originalParent && !originalParent.views.includes(this.view)) return originalParent.id;
        return null;
    }

    /** @returns {{zoom: number, pan_x: number, pan_y: number}} Current viewport. */
    viewport() {
        const view = this.graph.getView();
        return { zoom: view.getScale(), pan_x: view.getTranslate().x * view.getScale(), pan_y: view.getTranslate().y * view.getScale() };
    }

    /** @param {object} viewport Persisted zoom and pan. */
    setViewport(viewport) {
        const zoom = Number(viewport && viewport.zoom) || 1;
        const panX = Number(viewport && viewport.pan_x) || 0;
        const panY = Number(viewport && viewport.pan_y) || 0;
        this.graph.getView().scaleAndTranslate(zoom, panX / zoom, panY / zoom);
    }

    /** Fits all visible cells inside the stage. */
    fit() {
        const assets = this.project.assets.filter((asset) => asset.views.includes(this.view));
        if (!assets.length) return;
        const boxes = assets.map((asset) => asset.layout[this.view]);
        const minimumX = Math.min(...boxes.map((box) => box.x));
        const minimumY = Math.min(...boxes.map((box) => box.y));
        const maximumX = Math.max(...boxes.map((box) => box.x + box.width));
        const maximumY = Math.max(...boxes.map((box) => box.y + box.height));
        const width = Math.max(1, maximumX - minimumX);
        const height = Math.max(1, maximumY - minimumY);
        const zoom = Math.max(0.2, Math.min(
            2.5,
            (this.graph.container.clientWidth - 48) / width,
            (this.graph.container.clientHeight - 48) / height
        ));
        this.setViewport({
            zoom,
            pan_x: 24 - (minimumX * zoom),
            pan_y: 24 - (minimumY * zoom)
        });
        this.emitViewport();
    }

    /** @param {number} factor Multiplicative zoom factor. */
    zoom(factor) {
        this.graph.zoom(factor);
        this.emitViewport();
    }

    /** @param {boolean} enabled Whether movement snaps to the grid. */
    setSnapEnabled(enabled) {
        this.snapEnabled = enabled === true;
        this.graph.setGridEnabled(this.snapEnabled);
        this.paletteDragSources.forEach(function (dragSource) {
            dragSource.setGridEnabled(this.snapEnabled);
        }, this);
    }

    /** @param {boolean} enabled Whether alignment guides assist dragging. */
    setGuidesEnabled(enabled) {
        this.guidesEnabled = enabled === true;
        this.paletteDragSources.forEach(function (dragSource) {
            dragSource.setGuidesEnabled(this.guidesEnabled);
        }, this);
        const handler = this.graph.getPlugin('SelectionHandler') || this.graph.getPlugin('GraphHandler');
        if (handler && typeof handler.setGuidesEnabled === 'function') {
            handler.setGuidesEnabled(this.guidesEnabled);
        } else if (handler) {
            handler.guidesEnabled = this.guidesEnabled;
        }
    }

    /** @param {string} assetId Asset to select. */
    selectAsset(assetId) {
        const cell = this.graph.getDataModel().getCell(`${assetPrefix}${assetId}`);
        if (cell) this.graph.setSelectionCell(cell);
    }

    /** @param {string[]} assetIds Assets to select. */
    selectAssets(assetIds) {
        const cells = assetIds.map((assetId) => {
            return this.graph.getDataModel().getCell(`${assetPrefix}${assetId}`);
        }).filter(Boolean);
        this.graph.setSelectionCells(cells);
    }

    /**
     * Makes a catalogue tile draggable onto the graph.
     *
     * @param {HTMLElement} element Catalogue tile.
     * @param {object} definition Catalogue asset definition.
     */
    makeCatalogueItemDraggable(element, definition) {
        const dragSource = new DragSource(element, (graph, event, target, x, y) => {
            if (this.callbacks.onPaletteDrop) {
                this.callbacks.onPaletteDrop(definition, x, y, assetIdForCell(target));
            }
        });
        dragSource.getGraphForEvent = () => this.graph;
        dragSource.createPreviewElement = () => {
            const preview = document.createElement('div');
            preview.className = `studio-drag-source-preview${definition.is_container ? ' is-container' : ''}`;
            preview.style.width = `${definition.is_container ? 260 : 156}px`;
            preview.style.height = `${definition.is_container ? 180 : 104}px`;
            preview.innerHTML = `<strong>${escapeHtml(definition.label)}</strong><span>Drop on canvas</span>`;
            return preview;
        };
        dragSource.previewOffset = { x: -78, y: -52 };
        dragSource.setGuidesEnabled(this.guidesEnabled);
        dragSource.setGridEnabled(this.snapEnabled);
        this.paletteDragSources.push(dragSource);
    }

    /** Removes catalogue drag listeners before the palette is rebuilt. */
    clearCatalogueDraggables() {
        this.paletteDragSources.forEach(function (dragSource) { dragSource.reset(); });
        this.paletteDragSources = [];
    }

    /** Removes selected graph identities through the application callback. */
    requestDelete() {
        const items = this.selectedItems();
        if (items.length && this.callbacks.onDelete) this.callbacks.onDelete(items);
    }

    /** Nudges selected movable cells on the grid. @param {number} dx X delta. @param {number} dy Y delta. */
    nudge(dx, dy) {
        const cells = this.graph.getSelectionCells().filter(function (cell) { return cell.isVertex(); });
        if (cells.length) this.graph.moveCells(cells, dx, dy);
    }

    /** Creates graph clones and delegates semantic duplication. */
    requestDuplicate() {
        const ids = this.selectedItems().filter(function (item) { return item.kind === 'asset'; }).map(function (item) { return item.id; });
        if (ids.length && this.callbacks.onDuplicate) this.callbacks.onDuplicate(ids);
    }

    /** Destroys graph and outline listeners. */
    destroy() {
        this.clearCatalogueDraggables();
        if (this.outline) this.outline.destroy();
        this.graph.destroy();
    }
}
