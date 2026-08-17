import {
    DragSource,
    GeometryChange,
    Graph,
    InternalEvent,
    Outline,
    Point,
    Rectangle,
    RectangleShape,
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

function nodeValue(asset, iconUrl) {
    const initials = String(asset.label || '').split(/\s+/).filter(Boolean).slice(0, 2).map(function (word) {
        return word[0];
    }).join('').toUpperCase();
    const imageUrl = asset.image?.data_url || iconUrl;
    const icon = imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="" draggable="false">` : `<span class="studio-graph-card-glyph">${escapeHtml(initials)}</span>`;
    const detail = asset.properties.role || asset.category;

    if (asset.image?.mode === 'image') {
        const label = asset.image.show_label
            ? `<strong>${escapeHtml(asset.label)}</strong>`
            : '';
        const background = asset.image.background === 'color' ? asset.image.background_color : 'transparent';
        return `<div class="studio-graph-image-card" style="box-sizing:border-box;padding:${asset.image.padding}px;background:${escapeHtml(background)}"><img src="${escapeHtml(asset.image.data_url)}" alt="" draggable="false" style="object-fit:${escapeHtml(asset.image.fit)};opacity:${asset.image.opacity}">${label}</div>`;
    }

    return `<div class="studio-graph-card" style="--studio-cell-icon:${asset.layout.icon_size}px;--studio-cell-font:${asset.appearance.font_size}px;--studio-cell-text:${escapeHtml(asset.appearance.text_color)};--studio-cell-align:${escapeHtml(asset.appearance.text_align)};--studio-image-opacity:${asset.image?.opacity || 1}">` +
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
    return `<div class="studio-graph-boundary-label is-${escapeHtml(asset.type)}" style="--studio-cell-font:${asset.appearance.font_size}px;--studio-cell-text:${escapeHtml(asset.appearance.text_color)};--studio-cell-align:${escapeHtml(asset.appearance.text_align)}"><strong>${escapeHtml(asset.label)}</strong><small>${escapeHtml(detail)}</small></div>`;
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
        this.snapBypass = false;
        this.gridSize = 10;
        this.paletteDragSources = [];
        this.imageHitAreas = [];
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
        this.graph.setCellsBendable(true);
        this.graph.setCellsCloneable(true);
        this.graph.setDropEnabled(true);
        this.graph.setSwimlaneNesting(true);
        this.graph.setGridEnabled(true);
        this.graph.gridSize = this.gridSize;
        this.graph.keepEdgesInBackground = true;
        this.graph.htmlLabels = true;
        this.graph.isHtmlLabel = function () { return true; };
        this.graph.isValidDropTarget = (target, cells) => this.isValidAssetDropTarget(target, cells);
        const isCellMovable = this.graph.isCellMovable.bind(this.graph);
        const isCellResizable = this.graph.isCellResizable.bind(this.graph);
        this.graph.isCellMovable = (cell) => !this.isAssetLocked(cell) && isCellMovable(cell);
        this.graph.isCellResizable = (cell) => !this.isAssetLocked(cell) && isCellResizable(cell);
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
        this.installSmartGuides();
    }

    installSmartGuides() {
        const handler = this.graph.getPlugin('SelectionHandler') || this.graph.getPlugin('GraphHandler');
        if (!handler || typeof handler.createGuide !== 'function') return;
        this.guideOverlay = document.createElement('div');
        this.guideOverlay.className = 'studio-smart-guides';
        this.graph.container.append(this.guideOverlay);
        const createGuide = handler.createGuide.bind(handler);
        handler.createGuide = () => {
            const guide = createGuide();
            const move = guide.move.bind(guide);
            const hide = guide.hide.bind(guide);
            guide.getGuideColor = function (state, horizontal) {
                return horizontal ? '#7c3aed' : '#0891b2';
            };
            guide.move = (bounds, delta, gridEnabled, clone) => {
                const moved = move(bounds, delta, gridEnabled && !this.snapBypass, clone);
                return this.guidesEnabled && !this.snapBypass
                    ? this.applySmartSnapping(bounds, moved, guide.states || [])
                    : moved;
            };
            guide.hide = () => {
                hide();
                this.clearSmartGuides();
            };
            return guide;
        };
    }

    clearSmartGuides() {
        if (this.guideOverlay) this.guideOverlay.replaceChildren();
    }

    addSmartGuide(className, position, start, length, label) {
        if (!this.guideOverlay) return;
        const guide = document.createElement('span');
        guide.className = `studio-smart-guide ${className}`;
        if (className === 'is-vertical') {
            guide.style.left = `${position}px`;
            guide.style.top = `${start}px`;
            guide.style.height = `${length}px`;
        } else {
            guide.style.top = `${position}px`;
            guide.style.left = `${start}px`;
            guide.style.width = `${length}px`;
        }
        if (label) guide.dataset.label = label;
        this.guideOverlay.append(guide);
    }

    applySmartSnapping(bounds, delta, states) {
        this.clearSmartGuides();
        const tolerance = 7;
        const moving = {
            x: bounds.x + delta.x,
            y: bounds.y + delta.y,
            width: bounds.width,
            height: bounds.height
        };
        const candidates = states.filter(function (state) {
            return state && state.cell && assetIdForCell(state.cell);
        });
        const left = candidates.filter(function (state) {
            return state.x + state.width <= moving.x;
        }).sort(function (a, b) { return (moving.x - (a.x + a.width)) - (moving.x - (b.x + b.width)); })[0];
        const right = candidates.filter(function (state) {
            return state.x >= moving.x + moving.width;
        }).sort(function (a, b) { return (a.x - moving.x - moving.width) - (b.x - moving.x - moving.width); })[0];
        if (left && right) {
            const targetX = left.x + left.width + ((right.x - left.x - left.width - moving.width) / 2);
            if (Math.abs(targetX - moving.x) <= tolerance) {
                delta.x += targetX - moving.x;
                moving.x = targetX;
                const gap = Math.round(targetX - left.x - left.width);
                this.addSmartGuide('is-horizontal', moving.y + (moving.height / 2), left.x + left.width, right.x - left.x - left.width, `${gap}px equal`);
            }
        }
        const above = candidates.filter(function (state) {
            return state.y + state.height <= moving.y;
        }).sort(function (a, b) { return (moving.y - (a.y + a.height)) - (moving.y - (b.y + b.height)); })[0];
        const below = candidates.filter(function (state) {
            return state.y >= moving.y + moving.height;
        }).sort(function (a, b) { return (a.y - moving.y - moving.height) - (b.y - moving.y - moving.height); })[0];
        if (above && below) {
            const targetY = above.y + above.height + ((below.y - above.y - above.height - moving.height) / 2);
            if (Math.abs(targetY - moving.y) <= tolerance) {
                delta.y += targetY - moving.y;
                moving.y = targetY;
                const gap = Math.round(targetY - above.y - above.height);
                this.addSmartGuide('is-vertical', moving.x + (moving.width / 2), above.y + above.height, below.y - above.y - above.height, `${gap}px equal`);
            }
        }
        const containers = candidates.filter((state) => {
            const asset = this.project?.assets.find(function (candidate) { return candidate.id === assetIdForCell(state.cell); });
            return asset?.is_container && moving.x >= state.x && moving.y >= state.y && moving.x + moving.width <= state.x + state.width && moving.y + moving.height <= state.y + state.height;
        }).sort(function (a, b) { return (a.width * a.height) - (b.width * b.height); });
        const container = containers[0];
        if (container) {
            const padding = 24 * (this.graph.view.scale || 1);
            const horizontalTargets = [container.x + padding, container.x + container.width - padding - moving.width];
            const verticalTargets = [container.y + padding, container.y + container.height - padding - moving.height];
            const targetX = horizontalTargets.find(function (value) { return Math.abs(value - moving.x) <= tolerance; });
            const targetY = verticalTargets.find(function (value) { return Math.abs(value - moving.y) <= tolerance; });
            if (targetX !== undefined) {
                delta.x += targetX - moving.x;
                this.addSmartGuide('is-vertical', targetX, container.y, container.height, '24px padding');
            }
            if (targetY !== undefined) {
                delta.y += targetY - moving.y;
                this.addSmartGuide('is-horizontal', targetY, container.x, container.width, '24px padding');
            }
        }
        return delta;
    }

    /**
     * Switches the graph between editable Studio mode and read-only shared mode.
     *
     * @param {boolean} readOnly Whether editing must be disabled.
     */
    setReadOnly(readOnly) {
        const editable = readOnly !== true;
        this.graph.setEnabled(true);
        this.graph.setConnectable(editable);
        this.graph.setCellsEditable(editable);
        this.graph.setCellsMovable(editable);
        this.graph.setCellsResizable(editable);
        this.graph.setCellsBendable(editable);
        this.graph.setCellsCloneable(editable);
        this.graph.setDropEnabled(editable);
        this.graph.setPanning(true);
    }

    attachListeners() {
        this.graph.getSelectionModel().addListener(InternalEvent.CHANGE, () => {
            if (this.rendering) return;
            const selection = this.selectedItems();
            if (this.callbacks.onSelectionChange) this.callbacks.onSelectionChange(selection);
        });
        this.graph.getDataModel().addListener(InternalEvent.CHANGE, (sender, event) => {
            if (this.rendering || !this.callbacks.onConnectionRouteChange) return;
            const changes = event.getProperty('edit')?.changes || [];
            changes.filter(function (change) {
                return change instanceof GeometryChange && connectionIdForCell(change.cell);
            }).forEach((change) => {
                this.callbacks.onConnectionRouteChange(
                    connectionIdForCell(change.cell),
                    this.connectionRouteSnapshot(change.cell)
                );
            });
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
        this.graph.addListener(InternalEvent.CELL_CONNECTED, (sender, event) => {
            if (this.rendering || !this.callbacks.onConnectionEndpointsChange) return;
            const cell = event.getProperty('edge') || event.getProperty('cell');
            const connectionId = connectionIdForCell(cell);
            const source = assetIdForCell(cell && cell.getTerminal(true));
            const target = assetIdForCell(cell && cell.getTerminal(false));
            if (connectionId && source && target) {
                this.callbacks.onConnectionEndpointsChange(connectionId, source, target);
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

    isAssetLocked(cell) {
        const assetId = assetIdForCell(cell);
        const asset = assetId && this.project?.assets.find(function (candidate) { return candidate.id === assetId; });
        return asset?.appearance?.[this.view]?.locked === true;
    }

    assetStyle(asset) {
        const appearance = asset.appearance[this.view];
        const dashed = appearance.border_style !== 'solid';
        const dashPattern = appearance.border_style === 'dotted' ? '1 4' : '8 6';
        if (asset.image?.mode === 'image') {
            return {
                shape: 'rectangle', html: true, whiteSpace: 'wrap', overflow: 'visible',
                fillColor: 'none', strokeColor: 'none', strokeWidth: 0, shadow: false,
                fontColor: appearance.text_color, fontFamily: 'Roboto', fontSize: appearance.font_size,
                align: appearance.text_align, verticalAlign: 'middle', spacing: 0, rotatable: true
            };
        }
        if (asset.is_container) {
            const startSize = { vpc: 52, 'availability-zone': 46, subnet: 42 }[asset.type] || 38;
            return {
                shape: 'swimlane', html: true, rounded: appearance.shape === 'rounded', arcSize: 16, startSize,
                fillColor: appearance.fill_color, fillOpacity: 78, strokeColor: appearance.border_color,
                strokeWidth: appearance.border_width, dashed, dashPattern, fontColor: appearance.text_color,
                fontFamily: 'Roboto', fontSize: appearance.font_size, align: appearance.text_align,
                verticalAlign: 'top', spacingLeft: 8,
                collapsible: true, recursiveResize: false
            };
        }
        const shape = appearance.shape === 'ellipse' ? 'ellipse' : 'rectangle';
        return {
            shape, html: true, rounded: appearance.shape === 'rounded', arcSize: 12,
            whiteSpace: 'wrap', overflow: 'hidden', fillColor: appearance.fill_color,
            strokeColor: appearance.border_color, strokeWidth: appearance.border_width,
            dashed, dashPattern, shadow: true, fontColor: appearance.text_color,
            fontFamily: 'Roboto', fontSize: appearance.font_size, align: appearance.text_align, verticalAlign: 'middle',
            spacing: 0, rotatable: true
        };
    }

    connectionStyle(connection) {
        const route = connection.routing?.[this.view] || { style: 'orthogonal' };
        const routeStyles = {
            orthogonal: { edgeStyle: 'orthogonalEdgeStyle', rounded: true },
            straight: { edgeStyle: 'none', rounded: false },
            elbow: { edgeStyle: 'elbowEdgeStyle', rounded: true, elbow: 'horizontal' },
            curved: { edgeStyle: 'none', rounded: true, curved: true }
        };
        const direction = connection.direction || (connection.bidirectional ? 'bidirectional' : 'source-to-target');

        return {
            ...(routeStyles[route.style] || routeStyles.orthogonal), orthogonalLoop: true, jettySize: 'auto',
            strokeColor: edgeColor(connection.type), strokeWidth: connection.type === 'replication' ? 4 : 2,
            dashed: edgeDash(connection.type), endArrow: direction === 'target-to-source' ? 'none' : (direction === 'bidirectional' ? 'classic' : 'block'),
            startArrow: direction === 'bidirectional' || direction === 'target-to-source' ? 'classic' : 'none',
            html: true, fontFamily: 'Roboto',
            fontSize: 11, fontColor: '#475569', labelBackgroundColor: '#ffffff'
        };
    }

    connectionRouteSnapshot(cell) {
        const geometry = cell && cell.getGeometry ? cell.getGeometry() : null;

        return {
            points: (geometry && Array.isArray(geometry.points) ? geometry.points : []).map(function (point) {
                return { x: point.x, y: point.y };
            })
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

        this.clearImageHitAreas();
        this.graph.batchUpdate(() => {
            this.graph.removeCells(this.graph.getChildCells(root, true, true));
            const insertAsset = (asset) => {
                if (cells.has(asset.id)) return cells.get(asset.id);
                const parentAsset = assetMap.get(asset.parent_id) || null;
                const parentCell = parentAsset ? insertAsset(parentAsset) : root;
                const layout = globalGeometry(asset, view);
                const presentation = { ...asset, layout, appearance: asset.appearance[view] };
                const cell = this.graph.insertVertex({
                    parent: parentCell,
                    id: `${assetPrefix}${asset.id}`,
                    value: asset.is_container ? boundaryValue(presentation) : nodeValue(
                        presentation,
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
                const edge = this.graph.insertEdge({
                    parent: root,
                    id: `${connectionPrefix}${connection.id}`,
                    value: connection.label || connection.protocol || '',
                    source: cells.get(connection.source),
                    target: cells.get(connection.target),
                    style: this.connectionStyle(connection)
                });
                const route = connection.routing?.[view];
                if (route && route.points.length > 0) {
                    const geometry = edge.getGeometry().clone();
                    geometry.points = route.points.map(function (point) { return new Point(point.x, point.y); });
                    this.graph.getDataModel().setGeometry(edge, geometry);
                }
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
        visibleAssets.filter(function (asset) {
            return asset.image?.mode === 'image';
        }).forEach((asset) => {
            const state = this.graph.getView().getState(cells.get(asset.id));
            if (state) this.addImageHitArea(state);
        });
    }

    /** @param {object} state Rendered maxGraph state for an image asset. */
    addImageHitArea(state) {
        const hitArea = new RectangleShape(
            new Rectangle(state.x, state.y, state.width, state.height),
            '#ffffff',
            'none',
            0
        );
        const overlayPane = this.graph.getView().getOverlayPane();
        hitArea.dialect = 'svg';
        hitArea.opacity = 0;
        hitArea.svgPointerEvents = 'all';
        hitArea.init(overlayPane);
        hitArea.redraw();
        hitArea.node.style.cursor = 'move';
        InternalEvent.redirectMouseEvents(hitArea.node, this.graph, state);
        overlayPane.insertBefore(hitArea.node, overlayPane.firstChild);
        this.imageHitAreas.push(hitArea);
    }

    /** Removes image interaction overlays before graph states are rebuilt. */
    clearImageHitAreas() {
        this.imageHitAreas.forEach(function (hitArea) { hitArea.destroy(); });
        this.imageHitAreas = [];
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
        const horizontalPadding = 24;
        const topPadding = 84;
        const bottomPadding = 24;
        const boxes = assets.map((asset) => asset.layout[this.view]);
        const minimumX = Math.min(...boxes.map((box) => box.x));
        const minimumY = Math.min(...boxes.map((box) => box.y));
        const maximumX = Math.max(...boxes.map((box) => box.x + box.width));
        const maximumY = Math.max(...boxes.map((box) => box.y + box.height));
        const width = Math.max(1, maximumX - minimumX);
        const height = Math.max(1, maximumY - minimumY);
        const zoom = Math.max(0.2, Math.min(
            2.5,
            (this.graph.container.clientWidth - (horizontalPadding * 2)) / width,
            (this.graph.container.clientHeight - topPadding - bottomPadding) / height
        ));
        this.setViewport({
            zoom,
            pan_x: horizontalPadding - (minimumX * zoom),
            pan_y: topPadding - (minimumY * zoom)
        });
        this.emitViewport();
    }

    /** @param {number} factor Multiplicative zoom factor. */
    zoom(factor) {
        this.graph.zoom(factor);
        this.emitViewport();
    }

    /**
     * Zooms around a browser pointer position while preserving its world coordinate.
     *
     * @param {number} factor Multiplicative zoom factor.
     * @param {number} clientX Pointer X coordinate.
     * @param {number} clientY Pointer Y coordinate.
     */
    zoomAt(factor, clientX, clientY) {
        const bounds = this.graph.container.getBoundingClientRect();
        const viewport = this.viewport();
        const pointerX = clientX - bounds.left;
        const pointerY = clientY - bounds.top;
        const worldX = (pointerX - viewport.pan_x) / viewport.zoom;
        const worldY = (pointerY - viewport.pan_y) / viewport.zoom;
        const zoom = Math.max(0.2, Math.min(2.5, viewport.zoom * factor));
        this.setViewport({
            zoom,
            pan_x: pointerX - (worldX * zoom),
            pan_y: pointerY - (worldY * zoom)
        });
        this.emitViewport();
    }

    /** @param {boolean} enabled Whether left-button dragging temporarily pans. */
    setSpacePanning(enabled) {
        const panning = this.graph.getPlugin('PanningHandler');
        if (panning) panning.useLeftButtonForPanning = enabled === true;
        this.graph.container.classList.toggle('is-space-panning', enabled === true);
    }

    /** @param {boolean} enabled Whether movement snaps to the grid. */
    setSnapEnabled(enabled) {
        this.snapEnabled = enabled === true;
        this.graph.setGridEnabled(this.snapEnabled && !this.snapBypass);
        this.paletteDragSources.forEach(function (dragSource) {
            dragSource.setGridEnabled(this.snapEnabled && !this.snapBypass);
        }, this);
    }

    /** @param {boolean} enabled Whether alignment guides assist dragging. */
    setGuidesEnabled(enabled) {
        this.guidesEnabled = enabled === true;
        this.paletteDragSources.forEach(function (dragSource) {
            dragSource.setGuidesEnabled(this.guidesEnabled && !this.snapBypass);
        }, this);
        const handler = this.graph.getPlugin('SelectionHandler') || this.graph.getPlugin('GraphHandler');
        if (handler && typeof handler.setGuidesEnabled === 'function') {
            handler.setGuidesEnabled(this.guidesEnabled && !this.snapBypass);
        } else if (handler) {
            handler.guidesEnabled = this.guidesEnabled && !this.snapBypass;
        }
    }

    /**
     * Sets the grid spacing used by maxGraph snapping.
     *
     * @param {number} size Grid spacing in canvas units.
     * @returns {void}
     */
    setGridSize(size) {
        const allowed = [5, 10, 20, 40];
        this.gridSize = allowed.includes(Number(size)) ? Number(size) : 10;
        this.graph.gridSize = this.gridSize;
    }

    /**
     * Temporarily bypasses grid and guide snapping during an Alt-drag.
     *
     * @param {boolean} active Whether the bypass is active.
     * @returns {void}
     */
    setSnapBypass(active) {
        this.snapBypass = active === true;
        this.setSnapEnabled(this.snapEnabled);
        this.setGuidesEnabled(this.guidesEnabled);
        if (this.snapBypass) this.clearSmartGuides();
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

    /** Selects every asset visible in the active projection. */
    selectAllVisible() {
        const assetIds = this.project.assets.filter((asset) => asset.views.includes(this.view)).map(function (asset) {
            return asset.id;
        });
        this.selectAssets(assetIds);
    }

    /** Clears the active graph selection. */
    clearSelection() {
        this.graph.clearSelection();
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
        const cells = this.graph.getSelectionCells().filter((cell) => cell.isVertex() && !this.isAssetLocked(cell));
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
        this.clearImageHitAreas();
        if (this.outline) this.outline.destroy();
        this.graph.destroy();
    }
}
