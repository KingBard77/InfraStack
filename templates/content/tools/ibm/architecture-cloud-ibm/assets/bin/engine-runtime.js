// engine-runtime.js
(function attachInfraStackArchitectureEngineRuntime(global) {
    'use strict';

    const defaultConfig = {
        zoom: {
            defaultValue: 0.5,
            min: 0.15,
            max: 2.4,
            step: 0.1,
            wheelStep: 0.01
        },
        movement: {
            step: 4,
            fastStep: 16,
            snap: 1,
            marqueeThreshold: 6,
            historyLimit: 60,
            minimumNodeWidth: 80,
            minimumNodeHeight: 48
        },
        selectors: {
            node: '[data-engine-node-id], [data-node-id], [data-card-id]',
            connector: '[data-engine-connector-id], [data-connector-id]',
            connectorAnchorHandle: '[data-engine-connector-anchor], .diagram-connector-anchor-handle',
            connectorBendHandle: '[data-engine-connector-bend], .diagram-connector-bend-handle',
            resizeHandle: '[data-engine-resize-handle], .diagram-resize-handle',
            keyboardFormTarget: 'input, textarea, select, button, summary, a[href], [contenteditable="true"]'
        },
        classes: {
            selected: 'is-selected',
            multiSelected: 'is-multi-selected',
            highlighted: 'is-highlighted',
            marqueeTarget: 'is-marquee-target',
            marqueeSelection: 'architecture-engine-marquee-selection',
            diagramHighlighted: 'is-diagram-highlighted',
            dragging: 'is-engine-dragging',
            resizing: 'is-engine-resizing',
            uiHidden: 'is-engine-ui-hidden',
            expanded: 'is-engine-expanded',
            bodyLock: 'is-engine-expanded-lock',
            hidden: 'd-none'
        }
    };

    function isPlainObject(value) {
        return Boolean(value) && Object.prototype.toString.call(value) === '[object Object]';
    }

    function finiteNumber(value, fallback) {
        const nextValue = Number(value);

        if (Number.isFinite(nextValue)) {
            return nextValue;
        }

        return fallback;
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function snap(value, gridSize) {
        const safeGrid = Math.max(1, finiteNumber(gridSize, 1));

        return Math.round(value / safeGrid) * safeGrid;
    }

    function uniqueStrings(values) {
        if (!Array.isArray(values)) {
            return [];
        }

        return Array.from(new Set(values.map(function mapValue(value) {
            return String(value || '').trim();
        }).filter(Boolean)));
    }

    function cloneRatio(value) {
        if (!isPlainObject(value)) {
            return null;
        }

        const x = finiteNumber(value.x, NaN);
        const y = finiteNumber(value.y, NaN);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: clamp(x, 0, 1),
            y: clamp(y, 0, 1)
        };
    }

    function clonePoint(value) {
        if (!isPlainObject(value)) {
            return null;
        }

        const x = finiteNumber(value.x, NaN);
        const y = finiteNumber(value.y, NaN);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: x,
            y: y
        };
    }

    function normalizeViewport(viewport, zoomConfig) {
        const safeViewport = isPlainObject(viewport) ? viewport : {};
        const zoom = clamp(
            finiteNumber(safeViewport.zoom, zoomConfig.defaultValue),
            zoomConfig.min,
            zoomConfig.max
        );

        return {
            zoom: zoom,
            scrollLeft: Math.max(0, finiteNumber(safeViewport.scrollLeft || safeViewport.scroll_left, 0)),
            scrollTop: Math.max(0, finiteNumber(safeViewport.scrollTop || safeViewport.scroll_top, 0)),
            uiHidden: Boolean(safeViewport.uiHidden || safeViewport.ui_hidden),
            fullscreen: Boolean(safeViewport.fullscreen),
            diagramHighlighted: Boolean(safeViewport.diagramHighlighted || safeViewport.diagram_highlighted)
        };
    }

    function normalizeSelection(selection) {
        const safeSelection = isPlainObject(selection) ? selection : {};
        const nodeIds = uniqueStrings(safeSelection.nodeIds || safeSelection.node_ids || safeSelection.cardIds || safeSelection.card_ids);
        const fallbackNodeId = String(safeSelection.nodeId || safeSelection.node_id || safeSelection.cardId || safeSelection.card_id || '').trim();
        const highlightedNodeIds = uniqueStrings(safeSelection.highlightedNodeIds || safeSelection.highlighted_node_ids || safeSelection.highlightedCardIds || safeSelection.highlighted_card_ids);
        const fallbackHighlightedNodeId = String(safeSelection.highlightedNodeId || safeSelection.highlighted_node_id || safeSelection.highlightedCardId || safeSelection.highlighted_card_id || '').trim();

        if (nodeIds.length === 0 && fallbackNodeId !== '') {
            nodeIds.push(fallbackNodeId);
        }

        if (highlightedNodeIds.length === 0 && fallbackHighlightedNodeId !== '') {
            highlightedNodeIds.push(fallbackHighlightedNodeId);
        }

        return {
            nodeIds: nodeIds,
            connectorId: String(safeSelection.connectorId || safeSelection.connector_id || '').trim(),
            highlightedNodeId: highlightedNodeIds[0] || '',
            highlightedNodeIds: highlightedNodeIds
        };
    }

    function cloneLayoutOverrides(layoutOverrides) {
        const safeOverrides = {};

        if (!isPlainObject(layoutOverrides)) {
            return safeOverrides;
        }

        Object.keys(layoutOverrides).forEach(function eachOverride(id) {
            const value = layoutOverrides[id];
            const nextOverride = {};

            if (!isPlainObject(value)) {
                return;
            }

            ['x', 'y', 'width', 'height'].forEach(function eachKey(key) {
                const nextValue = finiteNumber(value[key], NaN);

                if (Number.isFinite(nextValue)) {
                    nextOverride[key] = nextValue;
                }
            });

            if (Object.keys(nextOverride).length > 0) {
                safeOverrides[String(id)] = nextOverride;
            }
        });

        return safeOverrides;
    }

    function cloneConnectorOverrides(connectorOverrides) {
        const safeOverrides = {};

        if (!isPlainObject(connectorOverrides)) {
            return safeOverrides;
        }

        Object.keys(connectorOverrides).forEach(function eachOverride(id) {
            const value = connectorOverrides[id];
            const nextOverride = {};

            if (!isPlainObject(value)) {
                return;
            }

            const sourceRatio = cloneRatio(value.sourceRatio || value.source_ratio);
            const targetRatio = cloneRatio(value.targetRatio || value.target_ratio);
            const bend = clonePoint(value.bend);
            const bends = Array.isArray(value.bends)
                ? value.bends.map(clonePoint).filter(Boolean)
                : [];

            if (sourceRatio) {
                nextOverride.sourceRatio = sourceRatio;
            }

            if (targetRatio) {
                nextOverride.targetRatio = targetRatio;
            }

            if (bend) {
                nextOverride.bend = bend;
            }

            if (bends.length > 0) {
                nextOverride.bends = bends;
            }

            if (Object.keys(nextOverride).length > 0) {
                safeOverrides[String(id)] = nextOverride;
            }
        });

        return safeOverrides;
    }

    function cloneState(state) {
        return {
            viewport: Object.assign({}, state.viewport),
            selection: {
                nodeIds: state.selection.nodeIds.slice(),
                connectorId: state.selection.connectorId,
                highlightedNodeId: state.selection.highlightedNodeId,
                highlightedNodeIds: state.selection.highlightedNodeIds.slice()
            },
            layoutOverrides: cloneLayoutOverrides(state.layoutOverrides),
            connectorOverrides: cloneConnectorOverrides(state.connectorOverrides)
        };
    }

    function normalizeState(value, config) {
        const safeConfig = config || defaultConfig;
        const safeValue = isPlainObject(value) ? value : {};

        return {
            viewport: normalizeViewport(safeValue.viewport, safeConfig.zoom),
            selection: normalizeSelection(safeValue.selection),
            layoutOverrides: cloneLayoutOverrides(safeValue.layoutOverrides || safeValue.layout_overrides),
            connectorOverrides: cloneConnectorOverrides(safeValue.connectorOverrides || safeValue.connector_overrides)
        };
    }

    function mergeState(currentState, patch, config) {
        const safePatch = isPlainObject(patch) ? patch : {};
        const nextState = cloneState(currentState);

        if (safePatch.viewport !== undefined) {
            nextState.viewport = normalizeViewport(
                Object.assign({}, nextState.viewport, safePatch.viewport),
                config.zoom
            );
        }

        if (safePatch.selection !== undefined) {
            nextState.selection = normalizeSelection(Object.assign({}, nextState.selection, safePatch.selection));
        }

        if (safePatch.layoutOverrides !== undefined || safePatch.layout_overrides !== undefined) {
            nextState.layoutOverrides = cloneLayoutOverrides(safePatch.layoutOverrides || safePatch.layout_overrides);
        }

        if (safePatch.connectorOverrides !== undefined || safePatch.connector_overrides !== undefined) {
            nextState.connectorOverrides = cloneConnectorOverrides(safePatch.connectorOverrides || safePatch.connector_overrides);
        }

        return normalizeState(nextState, config);
    }

    function normalizeConfig(options) {
        const safeOptions = isPlainObject(options) ? options : {};

        return {
            zoom: Object.assign({}, defaultConfig.zoom, safeOptions.zoom || {}),
            movement: Object.assign({}, defaultConfig.movement, safeOptions.movement || {}),
            selectors: Object.assign({}, defaultConfig.selectors, safeOptions.selectors || {}),
            classes: Object.assign({}, defaultConfig.classes, safeOptions.classes || {})
        };
    }

    function resolveElement(value) {
        if (typeof value === 'string' && global.document) {
            return global.document.getElementById(value);
        }

        return value || null;
    }

    function normalizeElements(elements) {
        const safeElements = isPlainObject(elements) ? elements : {};
        const normalized = {};

        Object.keys(safeElements).forEach(function eachElement(key) {
            normalized[key] = resolveElement(safeElements[key]);
        });

        return normalized;
    }

    function dataId(element, keys) {
        if (!element || !element.dataset) {
            return '';
        }

        for (let index = 0; index < keys.length; index += 1) {
            const value = String(element.dataset[keys[index]] || '').trim();

            if (value !== '') {
                return value;
            }
        }

        return '';
    }

    function isFormTarget(target, selector) {
        return Boolean(target && typeof target.closest === 'function' && target.closest(selector));
    }

    function callHandler(handler, payload, context) {
        if (typeof handler === 'function') {
            handler(payload, context);
        }
    }

    function compactLayoutOverride(value) {
        const nextOverride = {};

        ['x', 'y', 'width', 'height'].forEach(function eachKey(key) {
            const nextValue = finiteNumber(value[key], NaN);

            if (Number.isFinite(nextValue)) {
                nextOverride[key] = nextValue;
            }
        });

        return nextOverride;
    }

    function buildRectFromPoints(startPoint, endPoint) {
        return {
            x: Math.min(startPoint.x, endPoint.x),
            y: Math.min(startPoint.y, endPoint.y),
            width: Math.abs(endPoint.x - startPoint.x),
            height: Math.abs(endPoint.y - startPoint.y)
        };
    }

    function rectsIntersect(firstRect, secondRect) {
        return firstRect.x < secondRect.x + secondRect.width &&
            firstRect.x + firstRect.width > secondRect.x &&
            firstRect.y < secondRect.y + secondRect.height &&
            firstRect.y + firstRect.height > secondRect.y;
    }

    function rectContainsPoint(rect, point) {
        return point.x >= rect.x &&
            point.x <= rect.x + rect.width &&
            point.y >= rect.y &&
            point.y <= rect.y + rect.height;
    }

    function getRectIntersectionArea(firstRect, secondRect) {
        const width = Math.max(0, Math.min(firstRect.x + firstRect.width, secondRect.x + secondRect.width) - Math.max(firstRect.x, secondRect.x));
        const height = Math.max(0, Math.min(firstRect.y + firstRect.height, secondRect.y + secondRect.height) - Math.max(firstRect.y, secondRect.y));

        return width * height;
    }

    function getResizeDirection(handle) {
        const explicitDirection = String(
            handle.dataset.engineResizeHandle ||
            handle.dataset.resizeHandle ||
            handle.dataset.direction ||
            ''
        ).trim().toLowerCase();

        if (explicitDirection !== '') {
            return explicitDirection;
        }

        return 'se';
    }

    function applyViewportToCanvas(elements, state, adapter) {
        if (adapter && typeof adapter.applyViewport === 'function') {
            adapter.applyViewport(cloneState(state));
            return;
        }

        const svg = elements.stageCanvas && elements.stageCanvas.querySelector('svg');

        if (!svg) {
            return;
        }

        svg.style.transformOrigin = '0 0';
        svg.style.transform = 'scale(' + state.viewport.zoom + ')';
    }

    /**
     * Creates a normalized architecture engine state object.
     *
     * @param {Record<string, unknown>} value Candidate persisted state.
     * @param {Record<string, unknown>} [options] Optional engine config.
     * @returns {Record<string, unknown>} Normalized engine state.
     */
    function createState(value, options) {
        return normalizeState(value, normalizeConfig(options));
    }

    /**
     * Converts engine state to the JSON fields shared by architecture tools.
     *
     * @param {Record<string, unknown>} value Candidate engine state.
     * @param {Record<string, unknown>} [options] Optional engine config.
     * @returns {Record<string, unknown>} Serializable engine state payload.
     */
    function toPersistedState(value, options) {
        const state = createState(value, options);

        return {
            viewport: {
                zoom: state.viewport.zoom,
                scroll_left: state.viewport.scrollLeft,
                scroll_top: state.viewport.scrollTop,
                ui_hidden: state.viewport.uiHidden,
                fullscreen: state.viewport.fullscreen,
                diagram_highlighted: state.viewport.diagramHighlighted
            },
            selection: {
                node_ids: state.selection.nodeIds.slice(),
                connector_id: state.selection.connectorId,
                highlighted_node_id: state.selection.highlightedNodeId,
                highlighted_node_ids: state.selection.highlightedNodeIds.slice()
            },
            layout_overrides: cloneLayoutOverrides(state.layoutOverrides),
            connector_overrides: cloneConnectorOverrides(state.connectorOverrides)
        };
    }

    /**
     * Mounts a reusable architecture interaction engine onto a stage.
     *
     * @param {Record<string, unknown>} options Engine mount options.
     * @returns {Record<string, Function>} Engine controller API.
     */
    function mount(options) {
        const safeOptions = isPlainObject(options) ? options : {};
        const config = normalizeConfig(safeOptions);
        const adapter = isPlainObject(safeOptions.adapter) ? safeOptions.adapter : {};
        const elements = normalizeElements(safeOptions.elements);
        const documentRef = safeOptions.document || global.document;
        let state = normalizeState(safeOptions.state, config);
        let mounted = false;
        let history = [];
        let suppressNextStageClick = false;
        const disposers = [];

        if (!elements.stageCanvas) {
            throw new Error('InfraStackArchitectureEngineRuntime requires elements.stageCanvas.');
        }

        function controllerContext() {
            return {
                controller: api,
                elements: elements,
                adapter: adapter,
                config: config
            };
        }

        function emit(reason) {
            syncDom();
            callHandler(safeOptions.onStateChange, cloneState(state), Object.assign({ reason: reason }, controllerContext()));
        }

        function getNode(nodeId) {
            if (typeof adapter.getNode === 'function') {
                return adapter.getNode(String(nodeId || ''), cloneState(state));
            }

            return null;
        }

        function getNodeMinimumSize(node) {
            if (typeof adapter.getMinimumNodeSize === 'function') {
                const size = adapter.getMinimumNodeSize(node, cloneState(state));

                if (isPlainObject(size)) {
                    return {
                        width: Math.max(1, finiteNumber(size.width, config.movement.minimumNodeWidth)),
                        height: Math.max(1, finiteNumber(size.height, config.movement.minimumNodeHeight))
                    };
                }
            }

            return {
                width: config.movement.minimumNodeWidth,
                height: config.movement.minimumNodeHeight
            };
        }

        function getNodeElementId(element) {
            return dataId(element, ['engineNodeId', 'nodeId', 'cardId']);
        }

        function getConnectorElementId(element) {
            return dataId(element, ['engineConnectorId', 'connectorId']);
        }

        function getStageCanvasPoint(clientX, clientY) {
            const rect = elements.stageCanvas.getBoundingClientRect();

            return {
                x: clientX - rect.left + elements.stageCanvas.scrollLeft,
                y: clientY - rect.top + elements.stageCanvas.scrollTop
            };
        }

        function getElementCanvasRect(element) {
            const canvasRect = elements.stageCanvas.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            return {
                x: elementRect.left - canvasRect.left + elements.stageCanvas.scrollLeft,
                y: elementRect.top - canvasRect.top + elements.stageCanvas.scrollTop,
                width: elementRect.width,
                height: elementRect.height
            };
        }

        function isElementSelectedByMarquee(selectionRect, itemRect) {
            const centerPoint = {
                x: itemRect.x + (itemRect.width / 2),
                y: itemRect.y + (itemRect.height / 2)
            };
            const itemArea = itemRect.width * itemRect.height;
            const intersectionArea = getRectIntersectionArea(selectionRect, itemRect);

            return rectContainsPoint(selectionRect, centerPoint) ||
                (
                    itemArea > 0 &&
                    intersectionArea / itemArea >= 0.35
                );
        }

        function findNodesIntersectingCanvasRect(selectionRect) {
            return Array.from(elements.stageCanvas.querySelectorAll(config.selectors.node)).filter(function eachNode(element) {
                const nodeId = getNodeElementId(element);
                const itemRect = getElementCanvasRect(element);

                return nodeId !== '' &&
                    itemRect.width > 0 &&
                    itemRect.height > 0 &&
                    rectsIntersect(selectionRect, itemRect) &&
                    isElementSelectedByMarquee(selectionRect, itemRect);
            }).map(getNodeElementId);
        }

        function updateMarqueeOverlay(element, rect) {
            element.style.left = Math.round(rect.x) + 'px';
            element.style.top = Math.round(rect.y) + 'px';
            element.style.width = Math.round(rect.width) + 'px';
            element.style.height = Math.round(rect.height) + 'px';
        }

        function setMarqueeTargetNodes(nodeIds) {
            const targetIds = new Set(uniqueStrings(nodeIds));

            elements.stageCanvas.querySelectorAll(config.selectors.node).forEach(function eachNode(element) {
                element.classList.toggle(config.classes.marqueeTarget, targetIds.has(getNodeElementId(element)));
            });
        }

        function setButtonPressed(button, value) {
            if (button) {
                button.setAttribute('aria-pressed', value ? 'true' : 'false');
            }
        }

        function syncDom() {
            const canvas = elements.stageCanvas;

            if (elements.zoomInput) {
                elements.zoomInput.value = String(Math.round(state.viewport.zoom * 100));
            }

            if (elements.zoomLabel) {
                elements.zoomLabel.textContent = '%';
            }

            if (elements.undoButton) {
                elements.undoButton.disabled = history.length === 0;
            }

            if (elements.stageShell) {
                elements.stageShell.classList.toggle(config.classes.uiHidden, state.viewport.uiHidden);
                elements.stageShell.classList.toggle(config.classes.expanded, state.viewport.fullscreen);
            }

            if (canvas) {
                canvas.classList.toggle(config.classes.dragging, false);
                canvas.classList.toggle(config.classes.resizing, false);
                canvas.scrollLeft = state.viewport.scrollLeft;
                canvas.scrollTop = state.viewport.scrollTop;
                canvas.querySelectorAll(config.selectors.node).forEach(function eachNode(element) {
                    const nodeId = getNodeElementId(element);
                    const isSelected = state.selection.nodeIds.includes(nodeId);
                    const isHighlighted = nodeId !== '' && state.selection.highlightedNodeIds.includes(nodeId);

                    element.classList.toggle(config.classes.selected, isSelected);
                    element.classList.toggle(config.classes.multiSelected, isSelected && state.selection.nodeIds.length > 1);
                    element.classList.toggle(config.classes.highlighted, isHighlighted);
                });
                canvas.querySelectorAll(config.selectors.connector).forEach(function eachConnector(element) {
                    const connectorId = getConnectorElementId(element);

                    element.classList.toggle(config.classes.selected, connectorId !== '' && state.selection.connectorId === connectorId);
                });
                canvas.classList.toggle(config.classes.diagramHighlighted, state.viewport.diagramHighlighted);
            }

            setButtonPressed(elements.highlightAllButton, state.viewport.diagramHighlighted);
            setButtonPressed(elements.hideUiButton, state.viewport.uiHidden);
            applyViewportToCanvas(elements, state, adapter);
        }

        function render(reason) {
            if (typeof adapter.render === 'function') {
                adapter.render(cloneState(state), controllerContext());
            }

            emit(reason || 'render');
        }

        function pushHistory() {
            history.push(cloneState(state));

            if (history.length > config.movement.historyLimit) {
                history.shift();
            }

            syncDom();
        }

        function setState(patch, reason) {
            state = mergeState(state, patch, config);
            render(reason || 'set-state');
        }

        function setZoom(value, optionsForZoom) {
            const nextZoom = clamp(finiteNumber(value, state.viewport.zoom), config.zoom.min, config.zoom.max);
            const nextViewport = Object.assign({}, state.viewport, {
                zoom: nextZoom
            });

            if (optionsForZoom && optionsForZoom.preserveViewport && elements.stageCanvas) {
                nextViewport.scrollLeft = elements.stageCanvas.scrollLeft;
                nextViewport.scrollTop = elements.stageCanvas.scrollTop;
            }

            setState({
                viewport: nextViewport
            }, 'viewport');
        }

        function zoomToFit() {
            if (typeof adapter.getFitZoom === 'function') {
                setZoom(adapter.getFitZoom(cloneState(state), controllerContext()));
                return;
            }

            const svg = elements.stageCanvas.querySelector('svg');
            const canvasBox = elements.stageCanvas.getBoundingClientRect();
            let contentWidth = 0;
            let contentHeight = 0;

            if (svg && svg.viewBox && svg.viewBox.baseVal) {
                contentWidth = finiteNumber(svg.viewBox.baseVal.width, 0);
                contentHeight = finiteNumber(svg.viewBox.baseVal.height, 0);
            }

            if (contentWidth <= 0 || contentHeight <= 0) {
                setZoom(config.zoom.defaultValue);
                return;
            }

            const nextZoom = Math.min(
                (canvasBox.width - 48) / contentWidth,
                (canvasBox.height - 48) / contentHeight
            );

            setZoom(nextZoom);
        }

        function selectNodes(nodeIds, reason) {
            const normalizedNodeIds = uniqueStrings(nodeIds);

            state = mergeState(state, {
                selection: {
                    nodeIds: normalizedNodeIds,
                    connectorId: ''
                }
            }, config);
            emit(reason || 'select-node');
            callHandler(safeOptions.onSelectionChange, cloneState(state).selection, controllerContext());
        }

        function selectConnector(connectorId, reason) {
            const normalizedConnectorId = String(connectorId || '').trim();

            state = mergeState(state, {
                selection: {
                    nodeIds: [],
                    connectorId: normalizedConnectorId
                }
            }, config);
            emit(reason || 'select-connector');
            callHandler(safeOptions.onSelectionChange, cloneState(state).selection, controllerContext());
        }

        function highlightNodes(nodeIds, reason) {
            const highlightedNodeIds = uniqueStrings(nodeIds);

            state = mergeState(state, {
                selection: {
                    highlightedNodeId: highlightedNodeIds[0] || '',
                    highlightedNodeIds: highlightedNodeIds
                }
            }, config);
            emit(reason || 'highlight-node');
            callHandler(safeOptions.onSelectionChange, cloneState(state).selection, controllerContext());
        }

        function clearSelection(reason) {
            state = mergeState(state, {
                selection: {
                    nodeIds: [],
                    connectorId: '',
                    highlightedNodeId: '',
                    highlightedNodeIds: []
                }
            }, config);
            emit(reason || 'clear-selection');
            callHandler(safeOptions.onSelectionChange, cloneState(state).selection, controllerContext());
        }

        function applyLayoutOverride(nodeId, override, reason) {
            const normalizedNodeId = String(nodeId || '').trim();
            const nextLayoutOverrides = cloneLayoutOverrides(state.layoutOverrides);
            const nextOverride = compactLayoutOverride(override || {});

            if (normalizedNodeId === '') {
                return;
            }

            if (Object.keys(nextOverride).length === 0) {
                delete nextLayoutOverrides[normalizedNodeId];
            } else {
                nextLayoutOverrides[normalizedNodeId] = nextOverride;
            }

            setState({
                layoutOverrides: nextLayoutOverrides
            }, reason || 'layout');
        }

        function applyConnectorOverride(connectorId, override, reason) {
            const normalizedConnectorId = String(connectorId || '').trim();
            const nextConnectorOverrides = cloneConnectorOverrides(state.connectorOverrides);
            const nextOverride = cloneConnectorOverrides({
                value: override
            }).value;

            if (normalizedConnectorId === '') {
                return;
            }

            if (!nextOverride || Object.keys(nextOverride).length === 0) {
                delete nextConnectorOverrides[normalizedConnectorId];
            } else {
                nextConnectorOverrides[normalizedConnectorId] = nextOverride;
            }

            setState({
                connectorOverrides: nextConnectorOverrides
            }, reason || 'connector');
        }

        function moveNodeBy(nodeId, dx, dy, reason) {
            const node = getNode(nodeId);
            const existingOverride = state.layoutOverrides[nodeId] || {};
            const baseX = finiteNumber(existingOverride.x, finiteNumber(node && node.x, 0));
            const baseY = finiteNumber(existingOverride.y, finiteNumber(node && node.y, 0));

            applyLayoutOverride(nodeId, Object.assign({}, existingOverride, {
                x: Math.max(0, snap(baseX + dx, config.movement.snap)),
                y: Math.max(0, snap(baseY + dy, config.movement.snap))
            }), reason || 'move-node');
        }

        function resizeNodeBy(nodeId, dWidth, dHeight, reason) {
            const node = getNode(nodeId);
            const minimumSize = getNodeMinimumSize(node);
            const existingOverride = state.layoutOverrides[nodeId] || {};
            const baseWidth = finiteNumber(existingOverride.width, finiteNumber(node && node.width, minimumSize.width));
            const baseHeight = finiteNumber(existingOverride.height, finiteNumber(node && node.height, minimumSize.height));

            applyLayoutOverride(nodeId, Object.assign({}, existingOverride, {
                width: Math.max(minimumSize.width, snap(baseWidth + dWidth, config.movement.snap)),
                height: Math.max(minimumSize.height, snap(baseHeight + dHeight, config.movement.snap))
            }), reason || 'resize-node');
        }

        function resetLayout() {
            pushHistory();
            setState({
                selection: {
                    nodeIds: [],
                    connectorId: '',
                    highlightedNodeId: '',
                    highlightedNodeIds: []
                },
                layoutOverrides: {},
                connectorOverrides: {},
                viewport: Object.assign({}, state.viewport, {
                    diagramHighlighted: false
                })
            }, 'reset-layout');
        }

        function undo() {
            const previous = history.pop();

            if (!previous) {
                syncDom();
                return false;
            }

            state = normalizeState(previous, config);
            render('undo');
            return true;
        }

        function toggleUiHidden() {
            setState({
                viewport: Object.assign({}, state.viewport, {
                    uiHidden: !state.viewport.uiHidden
                })
            }, 'toggle-ui');
        }

        function toggleDiagramHighlight() {
            pushHistory();
            setState({
                viewport: Object.assign({}, state.viewport, {
                    diagramHighlighted: !state.viewport.diagramHighlighted
                })
            }, 'toggle-highlight');
        }

        function setUsageHelpOpen(isOpen) {
            if (!elements.usageHelpPopup) {
                return;
            }

            elements.usageHelpPopup.classList.toggle(config.classes.hidden, !isOpen);

            if (elements.usageHelpButton) {
                elements.usageHelpButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            }
        }

        function setExpanded(isExpanded) {
            state = mergeState(state, {
                viewport: Object.assign({}, state.viewport, {
                    fullscreen: Boolean(isExpanded)
                })
            }, config);

            if (documentRef && documentRef.body) {
                documentRef.body.classList.toggle(config.classes.bodyLock, state.viewport.fullscreen);
            }

            syncDom();
        }

        function toggleFullscreen() {
            if (!elements.stageShell) {
                setExpanded(!state.viewport.fullscreen);
                return;
            }

            if (documentRef && documentRef.fullscreenElement === elements.stageShell && typeof documentRef.exitFullscreen === 'function') {
                documentRef.exitFullscreen().catch(function handleExitError() {
                    setExpanded(false);
                });
                return;
            }

            if (typeof elements.stageShell.requestFullscreen === 'function') {
                elements.stageShell.requestFullscreen().then(function handleFullscreen() {
                    setExpanded(true);
                }).catch(function handleFullscreenError() {
                    setExpanded(!state.viewport.fullscreen);
                });
                return;
            }

            setExpanded(!state.viewport.fullscreen);
        }

        function beginNodeDrag(event, nodeElement) {
            const nodeId = getNodeElementId(nodeElement);

            if (nodeId === '') {
                return;
            }

            const movingNodeIds = state.selection.nodeIds.includes(nodeId)
                ? state.selection.nodeIds.slice()
                : [nodeId];
            const startX = event.clientX;
            const startY = event.clientY;
            const startLayoutOverrides = cloneLayoutOverrides(state.layoutOverrides);

            pushHistory();
            selectNodes(movingNodeIds, 'drag-select');
            elements.stageCanvas.classList.add(config.classes.dragging);

            function handlePointerMove(moveEvent) {
                const dx = (moveEvent.clientX - startX) / state.viewport.zoom;
                const dy = (moveEvent.clientY - startY) / state.viewport.zoom;
                const nextLayoutOverrides = cloneLayoutOverrides(startLayoutOverrides);

                movingNodeIds.forEach(function eachNodeId(movingNodeId) {
                    const node = getNode(movingNodeId);
                    const existingOverride = startLayoutOverrides[movingNodeId] || {};
                    const baseX = finiteNumber(existingOverride.x, finiteNumber(node && node.x, 0));
                    const baseY = finiteNumber(existingOverride.y, finiteNumber(node && node.y, 0));

                    nextLayoutOverrides[movingNodeId] = Object.assign({}, existingOverride, {
                        x: Math.max(0, snap(baseX + dx, config.movement.snap)),
                        y: Math.max(0, snap(baseY + dy, config.movement.snap))
                    });
                });

                state = mergeState(state, {
                    layoutOverrides: nextLayoutOverrides
                }, config);
                render('drag-node');
            }

            function handlePointerEnd() {
                elements.stageCanvas.classList.remove(config.classes.dragging);
                documentRef.removeEventListener('pointermove', handlePointerMove);
                documentRef.removeEventListener('pointerup', handlePointerEnd);
                documentRef.removeEventListener('pointercancel', handlePointerEnd);
            }

            documentRef.addEventListener('pointermove', handlePointerMove);
            documentRef.addEventListener('pointerup', handlePointerEnd);
            documentRef.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
        }

        function beginNodeResize(event, handle) {
            const nodeElement = handle.closest(config.selectors.node);
            const nodeId = dataId(handle, ['engineNodeId', 'nodeId', 'cardId']) || getNodeElementId(nodeElement);
            const node = getNode(nodeId);

            if (nodeId === '' || !node) {
                return;
            }

            const direction = getResizeDirection(handle);
            const minimumSize = getNodeMinimumSize(node);
            const startX = event.clientX;
            const startY = event.clientY;
            const startLayoutOverrides = cloneLayoutOverrides(state.layoutOverrides);
            const startOverride = startLayoutOverrides[nodeId] || {};
            const base = {
                x: finiteNumber(startOverride.x, finiteNumber(node.x, 0)),
                y: finiteNumber(startOverride.y, finiteNumber(node.y, 0)),
                width: finiteNumber(startOverride.width, finiteNumber(node.width, minimumSize.width)),
                height: finiteNumber(startOverride.height, finiteNumber(node.height, minimumSize.height))
            };

            pushHistory();
            selectNodes([nodeId], 'resize-select');
            elements.stageCanvas.classList.add(config.classes.resizing);

            function handlePointerMove(moveEvent) {
                const dx = (moveEvent.clientX - startX) / state.viewport.zoom;
                const dy = (moveEvent.clientY - startY) / state.viewport.zoom;
                const nextOverride = Object.assign({}, startOverride, base);

                if (direction.includes('e')) {
                    nextOverride.width = Math.max(minimumSize.width, snap(base.width + dx, config.movement.snap));
                }

                if (direction.includes('s')) {
                    nextOverride.height = Math.max(minimumSize.height, snap(base.height + dy, config.movement.snap));
                }

                if (direction.includes('w')) {
                    const width = Math.max(minimumSize.width, snap(base.width - dx, config.movement.snap));
                    nextOverride.x = Math.max(0, snap(base.x + (base.width - width), config.movement.snap));
                    nextOverride.width = width;
                }

                if (direction.includes('n')) {
                    const height = Math.max(minimumSize.height, snap(base.height - dy, config.movement.snap));
                    nextOverride.y = Math.max(0, snap(base.y + (base.height - height), config.movement.snap));
                    nextOverride.height = height;
                }

                const nextLayoutOverrides = cloneLayoutOverrides(startLayoutOverrides);

                nextLayoutOverrides[nodeId] = nextOverride;
                state = mergeState(state, {
                    layoutOverrides: nextLayoutOverrides
                }, config);
                render('resize-node');
            }

            function handlePointerEnd() {
                elements.stageCanvas.classList.remove(config.classes.resizing);
                documentRef.removeEventListener('pointermove', handlePointerMove);
                documentRef.removeEventListener('pointerup', handlePointerEnd);
                documentRef.removeEventListener('pointercancel', handlePointerEnd);
            }

            documentRef.addEventListener('pointermove', handlePointerMove);
            documentRef.addEventListener('pointerup', handlePointerEnd);
            documentRef.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
        }

        function beginMarqueeSelection(event) {
            if (event.button !== 0 || !elements.stageCanvas) {
                return false;
            }

            const startPoint = getStageCanvasPoint(event.clientX, event.clientY);
            const marquee = documentRef.createElement('div');

            marquee.className = config.classes.marqueeSelection;
            updateMarqueeOverlay(marquee, {
                x: startPoint.x,
                y: startPoint.y,
                width: 0,
                height: 0
            });
            elements.stageCanvas.appendChild(marquee);

            if (typeof elements.stageCanvas.setPointerCapture === 'function') {
                try {
                    elements.stageCanvas.setPointerCapture(event.pointerId);
                } catch (error) {
                    void error;
                }
            }

            function handlePointerMove(moveEvent) {
                const currentPoint = getStageCanvasPoint(moveEvent.clientX, moveEvent.clientY);
                const selectionRect = buildRectFromPoints(startPoint, currentPoint);

                updateMarqueeOverlay(marquee, selectionRect);
                setMarqueeTargetNodes(findNodesIntersectingCanvasRect(selectionRect));
            }

            function handlePointerEnd(endEvent) {
                const endPoint = getStageCanvasPoint(endEvent.clientX, endEvent.clientY);
                const selectionRect = buildRectFromPoints(startPoint, endPoint);

                if (typeof elements.stageCanvas.releasePointerCapture === 'function') {
                    try {
                        if (typeof elements.stageCanvas.hasPointerCapture !== 'function' || elements.stageCanvas.hasPointerCapture(endEvent.pointerId)) {
                            elements.stageCanvas.releasePointerCapture(endEvent.pointerId);
                        }
                    } catch (error) {
                        void error;
                    }
                }

                documentRef.removeEventListener('pointermove', handlePointerMove);
                documentRef.removeEventListener('pointerup', handlePointerEnd);
                documentRef.removeEventListener('pointercancel', handlePointerEnd);
                setMarqueeTargetNodes([]);
                marquee.remove();

                if (endEvent.type === 'pointercancel') {
                    return;
                }

                suppressNextStageClick = true;

                if (selectionRect.width < config.movement.marqueeThreshold && selectionRect.height < config.movement.marqueeThreshold) {
                    clearSelection('marquee-click');
                    return;
                }

                selectNodes(findNodesIntersectingCanvasRect(selectionRect), 'marquee-select');
            }

            documentRef.addEventListener('pointermove', handlePointerMove);
            documentRef.addEventListener('pointerup', handlePointerEnd);
            documentRef.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            return true;
        }

        function handleStagePointerDown(event) {
            const anchorHandle = event.target.closest(config.selectors.connectorAnchorHandle);
            const bendHandle = event.target.closest(config.selectors.connectorBendHandle);
            const resizeHandle = event.target.closest(config.selectors.resizeHandle);
            const nodeElement = event.target.closest(config.selectors.node);
            const connectorElement = event.target.closest(config.selectors.connector);

            if (anchorHandle && typeof adapter.onConnectorAnchorPointerDown === 'function') {
                pushHistory();
                adapter.onConnectorAnchorPointerDown(event, controllerContext());
                return;
            }

            if (bendHandle && typeof adapter.onConnectorBendPointerDown === 'function') {
                pushHistory();
                adapter.onConnectorBendPointerDown(event, controllerContext());
                return;
            }

            if (resizeHandle) {
                beginNodeResize(event, resizeHandle);
                return;
            }

            if (nodeElement) {
                beginNodeDrag(event, nodeElement);
                return;
            }

            if (connectorElement) {
                selectConnector(getConnectorElementId(connectorElement));
                return;
            }

            beginMarqueeSelection(event);
        }

        function handleStageClick(event) {
            if (suppressNextStageClick) {
                suppressNextStageClick = false;
                event.preventDefault();
                return;
            }

            const nodeElement = event.target.closest(config.selectors.node);
            const connectorElement = event.target.closest(config.selectors.connector);

            if (nodeElement) {
                selectNodes([getNodeElementId(nodeElement)]);
                return;
            }

            if (connectorElement) {
                selectConnector(getConnectorElementId(connectorElement));
                return;
            }

            if (event.target === elements.stageCanvas) {
                clearSelection();
            }
        }

        function handleKeyboard(event) {
            const selectedNodeId = state.selection.nodeIds[0] || '';

            if (event.defaultPrevented || isFormTarget(event.target, config.selectors.keyboardFormTarget)) {
                return;
            }

            if ((event.metaKey || event.ctrlKey) && !event.shiftKey && !event.altKey && String(event.key || '').toLowerCase() === 'z') {
                event.preventDefault();
                undo();
                return;
            }

            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key) || selectedNodeId === '') {
                return;
            }

            const step = event.shiftKey ? config.movement.fastStep : config.movement.step;
            const dx = event.key === 'ArrowLeft' ? -step : (event.key === 'ArrowRight' ? step : 0);
            const dy = event.key === 'ArrowUp' ? -step : (event.key === 'ArrowDown' ? step : 0);

            event.preventDefault();
            pushHistory();

            if (event.altKey) {
                resizeNodeBy(selectedNodeId, dx, dy, 'keyboard-resize');
                return;
            }

            moveNodeBy(selectedNodeId, dx, dy, 'keyboard-move');
        }

        function handleWheel(event) {
            if (!event.ctrlKey && !event.metaKey) {
                return;
            }

            event.preventDefault();
            setZoom(state.viewport.zoom + (event.deltaY > 0 ? -config.zoom.wheelStep : config.zoom.wheelStep), {
                preserveViewport: true
            });
        }

        function handleScroll() {
            state = mergeState(state, {
                viewport: Object.assign({}, state.viewport, {
                    scrollLeft: elements.stageCanvas.scrollLeft,
                    scrollTop: elements.stageCanvas.scrollTop
                })
            }, config);
            callHandler(safeOptions.onViewportChange, cloneState(state).viewport, controllerContext());
        }

        function addListener(target, type, handler, listenerOptions) {
            if (!target || typeof target.addEventListener !== 'function') {
                return;
            }

            target.addEventListener(type, handler, listenerOptions);
            disposers.push(function removeListener() {
                target.removeEventListener(type, handler, listenerOptions);
            });
        }

        function bindControls() {
            addListener(elements.stageCanvas, 'pointerdown', handleStagePointerDown);
            addListener(elements.stageCanvas, 'click', handleStageClick);
            addListener(elements.stageCanvas, 'wheel', handleWheel, { passive: false });
            addListener(elements.stageCanvas, 'scroll', handleScroll);
            addListener(documentRef, 'keydown', handleKeyboard);
            addListener(elements.zoomOutButton, 'click', function zoomOut() {
                setZoom(state.viewport.zoom - config.zoom.step, { preserveViewport: true });
            });
            addListener(elements.zoomInButton, 'click', function zoomIn() {
                setZoom(state.viewport.zoom + config.zoom.step, { preserveViewport: true });
            });
            addListener(elements.zoomFitButton, 'click', zoomToFit);
            addListener(elements.zoomActualButton, 'click', function zoomActual() {
                setZoom(1, { preserveViewport: true });
            });
            addListener(elements.zoomInput, 'change', function zoomFromInput() {
                setZoom(finiteNumber(elements.zoomInput.value, 100) / 100, { preserveViewport: true });
            });
            addListener(elements.undoButton, 'click', undo);
            addListener(elements.highlightAllButton, 'click', toggleDiagramHighlight);
            addListener(elements.hideUiButton, 'click', toggleUiHidden);
            addListener(elements.fullscreenButton, 'click', toggleFullscreen);
            addListener(elements.resetLayoutButton, 'click', resetLayout);
            addListener(elements.usageHelpButton, 'click', function openUsageHelp() {
                setUsageHelpOpen(true);
            });
            addListener(elements.usageHelpCloseButton, 'click', function closeUsageHelp() {
                setUsageHelpOpen(false);
            });
            addListener(documentRef, 'fullscreenchange', function handleFullscreenChange() {
                setExpanded(Boolean(documentRef.fullscreenElement && documentRef.fullscreenElement === elements.stageShell));
            });
        }

        /**
         * Destroys event listeners attached by this engine instance.
         *
         * @returns {void}
         */
        function destroy() {
            while (disposers.length > 0) {
                disposers.pop()();
            }

            mounted = false;
        }

        const api = {
            /**
             * Mounts event listeners and renders the current state.
             *
             * @returns {Record<string, Function>} This controller.
             */
            mount: function mountController() {
                if (mounted) {
                    return api;
                }

                mounted = true;
                bindControls();
                render('mount');
                return api;
            },

            /**
             * Returns a cloned engine state.
             *
             * @returns {Record<string, unknown>} Cloned state.
             */
            getState: function getState() {
                return cloneState(state);
            },

            /**
             * Replaces parts of the engine state and renders.
             *
             * @param {Record<string, unknown>} patch State patch.
             * @returns {void}
             */
            setState: function setControllerState(patch) {
                setState(patch, 'api-set-state');
            },

            render: render,
            pushHistory: pushHistory,
            undo: undo,
            setZoom: setZoom,
            zoomToFit: zoomToFit,
            selectNodes: selectNodes,
            selectConnector: selectConnector,
            highlightNodes: highlightNodes,
            clearSelection: clearSelection,
            applyLayoutOverride: applyLayoutOverride,
            applyConnectorOverride: applyConnectorOverride,
            moveNodeBy: moveNodeBy,
            resizeNodeBy: resizeNodeBy,
            resetLayout: resetLayout,
            toggleUiHidden: toggleUiHidden,
            toggleFullscreen: toggleFullscreen,
            toPersistedState: function controllerPersistedState() {
                return toPersistedState(state, config);
            },
            destroy: destroy
        };

        return api.mount();
    }

    const runtime = {
        createState: createState,
        mergeState: function mergeRuntimeState(currentState, patch, options) {
            return mergeState(createState(currentState, options), patch, normalizeConfig(options));
        },
        toPersistedState: toPersistedState,
        cloneLayoutOverrides: cloneLayoutOverrides,
        cloneConnectorOverrides: cloneConnectorOverrides,
        mount: mount
    };

    global.InfraStackArchitectureEngineRuntime = runtime;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = runtime;
    }
}(typeof globalThis !== 'undefined' ? globalThis : window));
