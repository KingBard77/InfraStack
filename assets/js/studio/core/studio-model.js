const InfraStackStudioCore = (function () {
    const toolId = 'infrastack-studio';
    const toolVersion = '0.5.0';
    const supportedViews = ['overview', 'physical', 'network', 'availability'];
    const connectionTypes = ['network', 'vpn', 'peering', 'trust', 'api', 'replication', 'administration'];
    const connectionDirections = ['source-to-target', 'target-to-source', 'bidirectional'];
    const connectionRouteStyles = ['orthogonal', 'straight', 'elbow', 'curved'];
    const assetShapes = ['rectangle', 'rounded', 'ellipse'];
    const assetBorderStyles = ['solid', 'dashed', 'dotted'];
    const assetTextAlignments = ['left', 'center', 'right'];
    const assetVerticalAlignments = ['top', 'middle', 'bottom'];
    const assetFontFamilies = ['Roboto', 'Nunito', 'monospace'];
    const connectionLineStyles = ['solid', 'dashed', 'dotted'];
    const connectionLabelPositions = ['start', 'center', 'end'];
    const appearanceFields = ['shape', 'box_transparent', 'fill_color', 'border_color', 'text_color', 'border_style', 'border_width', 'font_size', 'text_align', 'font_family', 'font_bold', 'font_italic', 'font_underline', 'text_background_enabled', 'text_background_color', 'text_border_enabled', 'text_border_color', 'text_opacity', 'word_wrap', 'automatic_font_size', 'vertical_align', 'text_spacing'];
    const canvasSize = { width: 2400, height: 1400 };
    const containerParentTypes = {
        group: ['domain', 'environment', 'vpc', 'availability-zone', 'subnet', 'rack', 'group'],
        domain: [],
        environment: ['domain'],
        vpc: ['domain', 'environment'],
        'availability-zone': ['domain', 'environment', 'vpc'],
        subnet: ['domain', 'environment', 'vpc', 'availability-zone'],
        rack: ['domain', 'environment', 'availability-zone']
    };

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function createId(prefix) {
        return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    }

    function safeString(value, limit) {
        return String(value || '').trim().slice(0, limit);
    }

    function clamp(value, minimum, maximum, fallback) {
        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            return fallback;
        }

        return Math.min(maximum, Math.max(minimum, parsed));
    }

    function normalizeViewName(view) {
        return view === 'logical' ? 'network' : view;
    }

    function normalizeLayoutMode(value) {
        return value === 'preserve' ? 'preserve' : 'auto';
    }

    function normalizeViews(value, type) {
        const source = Array.isArray(value) ? value.map(normalizeViewName) : [];
        const views = supportedViews.filter(function (view) {
            return source.includes(view);
        });

        if (views.length > 0) {
            return views;
        }

        if (['rack', 'server', 'switch', 'router', 'firewall', 'storage'].includes(type)) {
            return ['physical'];
        }

        return ['network'];
    }

    function defaultViewport() {
        return { zoom: 0.75, pan_x: 24, pan_y: 24 };
    }

    function normalizeViewport(value) {
        const viewport = value && typeof value === 'object' ? value : {};

        return {
            zoom: clamp(viewport.zoom, 0.2, 2.5, 0.75),
            pan_x: clamp(viewport.pan_x, -canvasSize.width, canvasSize.width, 24),
            pan_y: clamp(viewport.pan_y, -canvasSize.height, canvasSize.height, 24)
        };
    }

    function normalizeViewports(value) {
        const viewports = value && typeof value === 'object' ? value : {};
        const normalized = {};

        supportedViews.forEach(function (view) {
            normalized[view] = normalizeViewport(viewports[view] || defaultViewport());
        });

        return normalized;
    }

    function normalizeLayoutEntry(value, index, isContainer) {
        const layout = value && typeof value === 'object' ? value : {};
        const defaultWidth = isContainer ? 520 : 156;
        const defaultHeight = isContainer ? 330 : 104;
        const maximumWidth = isContainer ? canvasSize.width - 24 : 1200;
        const maximumHeight = isContainer ? canvasSize.height - 24 : 900;
        const width = clamp(layout.width, isContainer ? 260 : 132, maximumWidth, defaultWidth);
        const height = clamp(layout.height, isContainer ? 180 : 88, maximumHeight, defaultHeight);
        const maximumIconSize = isContainer ? 96 : Math.max(24, Math.min(96, width - 60, height - 28));

        return {
            x: clamp(layout.x, 12, canvasSize.width * 2, 60 + ((index % 5) * 190)),
            y: clamp(layout.y, 12, canvasSize.height * 2, 60 + (Math.floor(index / 5) * 145)),
            width: width,
            height: height,
            icon_size: clamp(layout.icon_size, 24, maximumIconSize, 36),
            collapsed: layout.collapsed === true,
            rotation: clamp(layout.rotation, -180, 180, 0),
            flip_h: layout.flip_h === true,
            flip_v: layout.flip_v === true
        };
    }

    function normalizeLayout(value, index, isContainer) {
        const layout = value && typeof value === 'object' ? value : {};
        const normalized = {};

        supportedViews.forEach(function (view) {
            const legacyView = view === 'network' ? layout.logical : null;
            normalized[view] = normalizeLayoutEntry(layout[view] || legacyView, index, isContainer);
        });

        return normalized;
    }

    function defaultAssetBorderColor(type, isContainer) {
        if (!isContainer) return '#cbd5e1';

        return {
            domain: '#94a3b8',
            environment: '#a5b4fc',
            vpc: '#86bff0',
            'availability-zone': '#b9d7ee',
            subnet: '#c5ddec',
            rack: '#94a3b8'
        }[type] || '#64748b';
    }

    function normalizeColor(value, fallback) {
        const color = safeString(value, 7).toLowerCase();
        return /^#[0-9a-f]{6}$/.test(color) ? color : fallback;
    }

    function defaultAssetAppearance(type, isContainer) {
        const containerFontSize = { vpc: 16, 'availability-zone': 12, subnet: 11 }[type] || 13;
        return {
            shape: 'rounded',
            box_transparent: false,
            fill_color: '#ffffff',
            border_color: defaultAssetBorderColor(type, isContainer),
            text_color: '#172033',
            border_style: type === 'environment' ? 'dashed' : 'solid',
            border_width: isContainer ? 2 : 1,
            font_size: isContainer ? containerFontSize : 12,
            text_align: 'left',
            font_family: 'Roboto',
            font_bold: true,
            font_italic: false,
            font_underline: false,
            text_background_enabled: false,
            text_background_color: '#ffffff',
            text_border_enabled: false,
            text_border_color: '#cbd5e1',
            text_opacity: 1,
            word_wrap: false,
            automatic_font_size: false,
            vertical_align: 'middle',
            text_spacing: 0,
            locked: false
        };
    }

    function normalizeAppearanceEntry(value, type, isContainer) {
        const appearance = value && typeof value === 'object' ? value : {};
        const defaults = defaultAssetAppearance(type, isContainer);
        const shape = safeString(appearance.shape, 20).toLowerCase();
        const borderStyle = safeString(appearance.border_style, 20).toLowerCase();
        const textAlign = safeString(appearance.text_align, 20).toLowerCase();
        const verticalAlign = safeString(appearance.vertical_align, 20).toLowerCase();
        const fontFamily = safeString(appearance.font_family, 30);

        return {
            shape: assetShapes.includes(shape) && (!isContainer || shape !== 'ellipse') ? shape : defaults.shape,
            box_transparent: appearance.box_transparent === true,
            fill_color: normalizeColor(appearance.fill_color, defaults.fill_color),
            border_color: normalizeColor(appearance.border_color, defaults.border_color),
            text_color: normalizeColor(appearance.text_color, defaults.text_color),
            border_style: assetBorderStyles.includes(borderStyle) ? borderStyle : defaults.border_style,
            border_width: clamp(appearance.border_width, 1, 8, defaults.border_width),
            font_size: clamp(appearance.font_size, 9, 24, defaults.font_size),
            text_align: assetTextAlignments.includes(textAlign) ? textAlign : defaults.text_align,
            font_family: assetFontFamilies.includes(fontFamily) ? fontFamily : defaults.font_family,
            font_bold: appearance.font_bold !== false,
            font_italic: appearance.font_italic === true,
            font_underline: appearance.font_underline === true,
            text_background_enabled: appearance.text_background_enabled === true,
            text_background_color: normalizeColor(appearance.text_background_color, defaults.text_background_color),
            text_border_enabled: appearance.text_border_enabled === true,
            text_border_color: normalizeColor(appearance.text_border_color, defaults.text_border_color),
            text_opacity: clamp(appearance.text_opacity, 0.1, 1, defaults.text_opacity),
            word_wrap: appearance.word_wrap === true,
            automatic_font_size: appearance.automatic_font_size === true,
            vertical_align: assetVerticalAlignments.includes(verticalAlign) ? verticalAlign : defaults.vertical_align,
            text_spacing: clamp(appearance.text_spacing, 0, 40, defaults.text_spacing),
            locked: appearance.locked === true
        };
    }

    function defaultConnectionAppearance(type) {
        return {
            line_color: {
                network: '#1f2937', vpn: '#7c3aed', peering: '#2563eb', trust: '#dc2626',
                api: '#0891b2', replication: '#16a34a', administration: '#d97706'
            }[type] || '#64748b',
            line_width: type === 'replication' ? 4 : 2,
            line_style: ['vpn', 'peering', 'trust', 'administration'].includes(type) ? 'dashed' : 'solid',
            label_color: '#253247',
            label_font_size: 12,
            label_position: 'center',
            label_offset: -14
        };
    }

    function normalizeConnectionAppearanceEntry(value, type) {
        const appearance = value && typeof value === 'object' ? value : {};
        const defaults = defaultConnectionAppearance(type);
        const lineStyle = safeString(appearance.line_style, 20).toLowerCase();
        const labelPosition = safeString(appearance.label_position, 20).toLowerCase();

        return {
            line_color: normalizeColor(appearance.line_color, defaults.line_color),
            line_width: clamp(appearance.line_width, 1, 8, defaults.line_width),
            line_style: connectionLineStyles.includes(lineStyle) ? lineStyle : defaults.line_style,
            label_color: normalizeColor(appearance.label_color, defaults.label_color),
            label_font_size: clamp(appearance.label_font_size, 9, 24, defaults.label_font_size),
            label_position: connectionLabelPositions.includes(labelPosition) ? labelPosition : defaults.label_position,
            label_offset: clamp(appearance.label_offset, -80, 80, defaults.label_offset)
        };
    }

    function normalizeConnectionAppearance(value, type) {
        const appearance = value && typeof value === 'object' ? value : {};
        return Object.fromEntries(supportedViews.map(function (view) {
            return [view, normalizeConnectionAppearanceEntry(appearance[view], type)];
        }));
    }

    function normalizeAppearance(value, type, isContainer) {
        const appearance = value && typeof value === 'object' ? value : {};
        const normalized = {};

        supportedViews.forEach(function (view) {
            const legacyView = view === 'network' ? appearance.logical : null;
            normalized[view] = normalizeAppearanceEntry(appearance[view] || legacyView, type, isContainer);
        });

        return normalized;
    }

    function normalizePresetAppearance(value) {
        const normalized = normalizeAppearanceEntry(value, 'application', false);

        return appearanceFields.reduce(function (appearance, field) {
            appearance[field] = normalized[field];
            return appearance;
        }, {});
    }

    function defaultStylePresets() {
        return [
            {
                id: 'database',
                name: 'Database',
                appearance: normalizePresetAppearance({ fill_color: '#f5f3ff', border_color: '#7c3aed', text_color: '#4c1d95', border_width: 2, text_align: 'center' })
            },
            {
                id: 'public',
                name: 'Public',
                appearance: normalizePresetAppearance({ fill_color: '#eff6ff', border_color: '#2563eb', text_color: '#1e3a8a', border_width: 2, text_align: 'center' })
            },
            {
                id: 'critical',
                name: 'Critical',
                appearance: normalizePresetAppearance({ fill_color: '#fff1f2', border_color: '#e11d48', text_color: '#881337', border_style: 'dashed', border_width: 3, font_size: 13, text_align: 'center' })
            }
        ];
    }

    function normalizeStylePresets(value) {
        if (!Array.isArray(value)) return defaultStylePresets();
        const ids = new Set();

        return value.slice(0, 24).reduce(function (presets, preset, index) {
            const name = safeString(preset?.name, 40);
            let id = safeString(preset?.id, 60).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
            if (!name) return presets;
            if (!id || ids.has(id)) id = `style-${index + 1}`;
            while (ids.has(id)) id = `${id}-copy`;
            ids.add(id);
            presets.push({ id: id, name: name, appearance: normalizePresetAppearance(preset?.appearance) });
            return presets;
        }, []);
    }

    function normalizeProperties(value) {
        const properties = value && typeof value === 'object' ? value : {};

        return {
            role: safeString(properties.role, 100),
            address: safeString(properties.address, 64),
            hostname: safeString(properties.hostname, 80),
            provider: safeString(properties.provider, 60),
            environment: safeString(properties.environment, 40),
            zone: safeString(properties.zone, 40),
            owner: safeString(properties.owner, 80),
            cpu: safeString(properties.cpu, 30),
            memory: safeString(properties.memory, 30),
            storage: safeString(properties.storage, 40),
            region: safeString(properties.region, 40),
            dns_hostnames: properties.dns_hostnames !== false,
            dns_resolution: properties.dns_resolution !== false,
            tags: safeString(properties.tags, 240),
            subnet_type: safeString(properties.subnet_type, 20),
            route_table: safeString(properties.route_table, 80),
            instance_type: safeString(properties.instance_type, 40),
            operating_system: safeString(properties.operating_system, 60),
            private_ip: safeString(properties.private_ip, 64),
            public_ip: safeString(properties.public_ip, 64),
            vendor: safeString(properties.vendor, 60),
            interfaces: safeString(properties.interfaces, 160),
            security_zones: safeString(properties.security_zones, 160),
            policies: safeString(properties.policies, 240),
            model: safeString(properties.model, 80),
            vlans: safeString(properties.vlans, 160),
            ports: safeString(properties.ports, 80),
            management_ip: safeString(properties.management_ip, 64),
            image_reference: safeString(properties.image_reference, 200),
            replicas: Math.round(clamp(properties.replicas, 0, 10000, 0)),
            service_type: safeString(properties.service_type, 30),
            cpu_limit: safeString(properties.cpu_limit, 30),
            memory_limit: safeString(properties.memory_limit, 30),
            readiness_probe: properties.readiness_probe === true,
            liveness_probe: properties.liveness_probe === true,
            autoscaling: properties.autoscaling === true,
            disruption_budget: properties.disruption_budget === true,
            network_policy: properties.network_policy === true,
            pod_security_level: safeString(properties.pod_security_level, 20),
            service_account: safeString(properties.service_account, 80),
            storage_class: safeString(properties.storage_class, 80),
            monitoring: properties.monitoring === true,
            backup: properties.backup === true,
            redundant: properties.redundant === true,
            critical: properties.critical === true
        };
    }

    function normalizeAssetImage(value) {
        if (!value || typeof value !== 'object') return null;
        const dataUrl = String(value.data_url || '');
        const match = dataUrl.match(/^data:(image\/(?:png|jpeg|webp));base64,[a-z0-9+/=\r\n]+$/i);
        if (!match || dataUrl.length > 3000000) return null;
        const originalDataUrl = String(value.original_data_url || dataUrl);
        const originalMatch = originalDataUrl.match(/^data:(image\/(?:png|jpeg|webp));base64,[a-z0-9+/=\r\n]+$/i);
        const mode = safeString(value.mode, 10).toLowerCase();
        const fit = safeString(value.fit, 10).toLowerCase();
        const background = safeString(value.background, 12).toLowerCase();
        const backgroundColor = safeString(value.background_color, 7).toLowerCase();

        return {
            data_url: dataUrl,
            original_data_url: originalMatch && originalDataUrl.length <= 3000000 ? originalDataUrl : dataUrl,
            mime_type: match[1].toLowerCase(),
            mode: ['icon', 'image'].includes(mode) ? mode : 'icon',
            fit: ['contain', 'cover', 'fill'].includes(fit) ? fit : 'contain',
            opacity: clamp(value.opacity, 0.1, 1, 1),
            show_label: value.show_label !== false,
            padding: clamp(value.padding, 0, 120, 0),
            background: ['transparent', 'color'].includes(background) ? background : 'transparent',
            background_color: /^#[0-9a-f]{6}$/i.test(backgroundColor) ? backgroundColor : '#ffffff'
        };
    }

    function normalizeAsset(asset, index) {
        const value = asset && typeof asset === 'object' ? asset : {};
        const type = safeString(value.type || 'asset', 50).toLowerCase();
        const isContainer = value.is_container === true || Object.hasOwn(containerParentTypes, type);

        return {
            id: safeString(value.id || createId(type), 100),
            catalog_id: safeString(value.catalog_id, 100) || null,
            type: type,
            label: safeString(value.label || type || 'Asset', 80) || 'Asset',
            category: safeString(value.category || 'Infrastructure', 50),
            icon: safeString(value.icon, 120),
            views: normalizeViews(value.views, type),
            is_container: isContainer,
            parent_id: safeString(value.parent_id, 100) || null,
            properties: normalizeProperties(value.properties),
            image: normalizeAssetImage(value.image),
            layout: normalizeLayout(value.layout, index, isContainer),
            appearance: normalizeAppearance(value.appearance, type, isContainer)
        };
    }

    function normalizeAssets(value) {
        const assets = (Array.isArray(value) ? value : []).map(normalizeAsset);

        assets.forEach(function (asset) {
            const validation = validateParentInAssets(assets, asset.id, asset.parent_id);
            if (!validation.valid) asset.parent_id = null;
        });

        return assets;
    }

    function normalizeRoutePoint(value) {
        const point = value && typeof value === 'object' ? value : {};

        return {
            x: clamp(point.x, 0, canvasSize.width, 0),
            y: clamp(point.y, 0, canvasSize.height, 0)
        };
    }

    function normalizeConnectionRoute(value) {
        const route = value && typeof value === 'object' ? value : {};
        const style = safeString(route.style, 20).toLowerCase();
        const labelPosition = route.label_position && typeof route.label_position === 'object'
            ? normalizeRoutePoint(route.label_position)
            : null;

        return {
            style: connectionRouteStyles.includes(style) ? style : 'orthogonal',
            points: (Array.isArray(route.points) ? route.points : []).slice(0, 12).map(normalizeRoutePoint),
            label_position: labelPosition
        };
    }

    function normalizeConnectionRouting(value) {
        const routing = value && typeof value === 'object' ? value : {};
        const normalized = {};

        supportedViews.forEach(function (view) {
            const legacyRoute = view === 'network' ? routing.logical : null;
            normalized[view] = normalizeConnectionRoute(routing[view] || legacyRoute);
        });

        return normalized;
    }

    function validateParentInAssets(assets, assetId, parentId) {
        if (!parentId) return { valid: true, reason: '' };
        const assetMap = new Map(assets.map(function (asset) { return [asset.id, asset]; }));
        const asset = assetMap.get(assetId);
        const parent = assetMap.get(parentId);

        if (!asset) return { valid: false, reason: 'The asset does not exist.' };
        if (!parent || !parent.is_container) {
            return { valid: false, reason: 'The destination must be a boundary.' };
        }
        if (asset.id === parent.id) {
            return { valid: false, reason: 'A boundary cannot contain itself.' };
        }

        let ancestor = parent;
        const visited = new Set();
        while (ancestor) {
            if (ancestor.id === asset.id) {
                return { valid: false, reason: 'A boundary cannot be moved into one of its descendants.' };
            }
            if (visited.has(ancestor.id)) {
                return { valid: false, reason: 'The destination hierarchy contains a circular reference.' };
            }
            visited.add(ancestor.id);
            ancestor = assetMap.get(ancestor.parent_id);
        }

        const allowedParents = asset.is_container ? containerParentTypes[asset.type] : null;
        if (allowedParents && parent.type !== 'group' && !allowedParents.includes(parent.type)) {
            return { valid: false, reason: `${asset.type} cannot be nested inside ${parent.type}.` };
        }

        return { valid: true, reason: '' };
    }

    /**
     * Validates a requested parent boundary without changing project state.
     *
     * @param {object} project Current Studio project.
     * @param {string} assetId Asset to validate.
     * @param {?string} parentId Requested parent boundary or null for top level.
     * @returns {{valid: boolean, reason: string}} Validation result.
     */
    function validateAssetParent(project, assetId, parentId) {
        const assets = project && Array.isArray(project.assets) ? project.assets : [];
        return validateParentInAssets(assets, assetId, parentId);
    }

    function normalizeConnections(value, assetIds) {
        const seen = new Set();

        return (Array.isArray(value) ? value : []).reduce(function (connections, connection) {
            const source = safeString(connection && connection.source, 100);
            const target = safeString(connection && connection.target, 100);
            const rawType = safeString(connection && (connection.type || connection.relationship), 40).toLowerCase();
            const type = connectionTypes.includes(rawType) ? rawType : 'network';
            const key = [source, target].sort().join(':') + `:${type}`;

            if (!source || !target || source === target || !assetIds.has(source) || !assetIds.has(target) || seen.has(key)) {
                return connections;
            }

            seen.add(key);
            const rawDirection = safeString(connection.direction || (connection.bidirectional ? 'bidirectional' : 'source-to-target'), 30);
            const direction = connectionDirections.includes(rawDirection) ? rawDirection : 'source-to-target';
            connections.push({
                id: safeString(connection.id || createId('connection'), 100),
                source: source,
                target: target,
                type: type,
                label: safeString(connection.label, 80),
                bidirectional: direction === 'bidirectional',
                direction: direction,
                protocol: safeString(connection.protocol, 40),
                bandwidth: safeString(connection.bandwidth, 40),
                routing: normalizeConnectionRouting(connection.routing),
                appearance: normalizeConnectionAppearance(connection.appearance, type)
            });

            return connections;
        }, []);
    }

    function normalizeReference(value) {
        const reference = value && typeof value === 'object' ? value : {};
        const name = safeString(reference.name, 160);

        return {
            name: name,
            mime_type: safeString(reference.mime_type, 60),
            visible: Boolean(name) && reference.visible !== false,
            opacity: clamp(reference.opacity, 0.05, 1, 0.28),
            x: clamp(reference.x, 0, canvasSize.width - 100, 0),
            y: clamp(reference.y, 0, canvasSize.height - 100, 0),
            width: clamp(reference.width, 200, canvasSize.width, canvasSize.width),
            height: clamp(reference.height, 120, canvasSize.height, canvasSize.height),
            locked: reference.locked !== false
        };
    }

    function createBaseProject(name) {
        const viewports = {};

        supportedViews.forEach(function (view) {
            viewports[view] = defaultViewport();
        });

        return {
            tool: toolId,
            version: toolVersion,
            project_id: createId('project'),
            name: safeString(name || 'Untitled architecture', 80),
            profile: 'hybrid-production',
            layout_mode: 'auto',
            active_view: 'overview',
            canvas: clone(canvasSize),
            viewports: viewports,
            assets: [],
            connections: [],
            style_presets: defaultStylePresets(),
            accepted_risks: [],
            reference: normalizeReference({}),
            updated_at: new Date().toISOString()
        };
    }

    function layoutFor(overview, physical, network, availability) {
        return {
            overview: overview,
            physical: physical || overview,
            network: network || overview,
            availability: availability || overview
        };
    }

    function exampleAsset(id, type, label, options) {
        const settings = options || {};

        return {
            id: id,
            type: type,
            label: label,
            category: settings.category || 'Infrastructure',
            icon: settings.icon || '',
            views: settings.views || supportedViews,
            is_container: settings.isContainer === true,
            parent_id: settings.parentId || null,
            properties: settings.properties || {},
            layout: settings.layout
        };
    }

    /**
     * Creates a new empty, restorable Studio v0.2 project.
     *
     * @param {string} [name='Untitled architecture'] Project display name.
     * @returns {object} Normalized empty project.
     */
    function createEmptyProject(name = 'Untitled architecture') {
        return createBaseProject(name);
    }

    /**
     * Creates a hybrid multi-AZ example with shared semantic assets.
     *
     * @returns {object} Normalized example project.
     */
    function createExampleProject() {
        const project = createBaseProject('Hybrid multi-AZ platform');
        const allViews = ['overview', 'physical', 'network', 'availability'];
        const networkViews = ['overview', 'network'];
        const availabilityViews = ['overview', 'availability'];
        const assets = [
            exampleAsset('domain-government', 'domain', 'Government Network', { category: 'Domain', isContainer: true, views: ['overview', 'network'], properties: { provider: 'Government WAN', role: 'External trusted domain' }, layout: layoutFor({ x: 60, y: 60, width: 580, height: 520 }, null, { x: 60, y: 60, width: 650, height: 660 }) }),
            exampleAsset('domain-cloud', 'domain', 'Primary Cloud Platform', { category: 'Domain', isContainer: true, views: allViews, properties: { provider: 'Private cloud', role: 'Primary workload domain' }, layout: layoutFor({ x: 730, y: 60, width: 1540, height: 1180 }, { x: 60, y: 60, width: 900, height: 620 }, { x: 800, y: 60, width: 1450, height: 720 }, { x: 60, y: 60, width: 2180, height: 1220 }) }),
            exampleAsset('env-production', 'environment', 'Production', { category: 'Environment', isContainer: true, parentId: 'domain-cloud', views: allViews, properties: { environment: 'production', critical: true, role: 'Production workloads' }, layout: layoutFor({ x: 790, y: 150, width: 1420, height: 990 }, { x: 110, y: 140, width: 800, height: 470 }, { x: 850, y: 145, width: 1340, height: 600 }, { x: 120, y: 145, width: 2070, height: 1030 }) }),
            exampleAsset('vpc-production', 'vpc', 'Production VPC', { category: 'Network', isContainer: true, parentId: 'env-production', views: ['overview', 'network', 'availability'], properties: { address: '10.20.0.0/16', environment: 'production', critical: true, role: 'Production network boundary' }, layout: layoutFor({ x: 840, y: 220, width: 1310, height: 830 }, null, { x: 900, y: 220, width: 1230, height: 480 }, { x: 180, y: 230, width: 1950, height: 860 }) }),
            exampleAsset('az-one', 'availability-zone', 'Availability Zone 1', { category: 'Availability', isContainer: true, parentId: 'vpc-production', views: availabilityViews, properties: { zone: 'AZ1', environment: 'production', role: 'Primary failure domain' }, layout: layoutFor({ x: 910, y: 300, width: 540, height: 650 }, null, null, { x: 250, y: 330, width: 830, height: 650 }) }),
            exampleAsset('az-two', 'availability-zone', 'Availability Zone 2', { category: 'Availability', isContainer: true, parentId: 'vpc-production', views: availabilityViews, properties: { zone: 'AZ2', environment: 'production', role: 'Secondary failure domain' }, layout: layoutFor({ x: 1530, y: 300, width: 540, height: 650 }, null, null, { x: 1200, y: 330, width: 830, height: 650 }) }),
            exampleAsset('internet', 'internet', 'Internet', { category: 'External', icon: 'network-arch-internet.svg', views: networkViews, properties: { role: 'Public network' }, layout: layoutFor({ x: 130, y: 130, width: 156, height: 104 }, null, { x: 130, y: 140, width: 156, height: 104 }) }),
            exampleAsset('edge-firewall', 'firewall', 'Edge Firewall Pair', { category: 'Security', icon: 'security-arch-firewall.svg', parentId: 'domain-government', views: ['overview', 'physical', 'network'], properties: { role: 'Ingress security boundary', monitoring: true, redundant: true, critical: true }, layout: layoutFor({ x: 360, y: 180, width: 156, height: 104 }, { x: 180, y: 220, width: 156, height: 104 }, { x: 390, y: 150, width: 156, height: 104 }) }),
            exampleAsset('wan-router', 'router', 'WAN Router', { category: 'Network', icon: 'network-arch-router.svg', parentId: 'domain-government', views: ['overview', 'physical', 'network'], properties: { role: 'Carrier routing', monitoring: true, redundant: true }, layout: layoutFor({ x: 360, y: 350, width: 156, height: 104 }, { x: 390, y: 220, width: 156, height: 104 }, { x: 390, y: 350, width: 156, height: 104 }) }),
            exampleAsset('cloud-firewall', 'firewall', 'Cloud Firewall Pair', { category: 'Security', icon: 'security-arch-firewall.svg', parentId: 'vpc-production', views: ['overview', 'network', 'availability'], properties: { role: 'Cloud ingress boundary', monitoring: true, redundant: true, critical: true }, layout: layoutFor({ x: 930, y: 280, width: 156, height: 104 }, null, { x: 1010, y: 300, width: 156, height: 104 }, { x: 980, y: 250, width: 156, height: 104 }) }),
            exampleAsset('app-az1', 'server', 'Application Worker A', { category: 'Compute', icon: 'infrastructure-arch-server.svg', parentId: 'az-one', views: ['physical', 'availability'], properties: { hostname: 'app-worker-a', role: 'Application worker', environment: 'production', zone: 'AZ1', cpu: '4 vCPU', memory: '16 GB', monitoring: true, backup: true, critical: true }, layout: layoutFor({ x: 1020, y: 490, width: 156, height: 104 }, { x: 200, y: 410, width: 156, height: 104 }, null, { x: 420, y: 500, width: 156, height: 104 }) }),
            exampleAsset('app-az2', 'server', 'Application Worker B', { category: 'Compute', icon: 'infrastructure-arch-server.svg', parentId: 'az-two', views: ['physical', 'availability'], properties: { hostname: 'app-worker-b', role: 'Application worker', environment: 'production', zone: 'AZ2', cpu: '4 vCPU', memory: '16 GB', monitoring: true, backup: true, critical: true }, layout: layoutFor({ x: 1640, y: 490, width: 156, height: 104 }, { x: 410, y: 410, width: 156, height: 104 }, null, { x: 1380, y: 500, width: 156, height: 104 }) }),
            exampleAsset('db-az1', 'database', 'Database Primary', { category: 'Data', icon: 'infrastructure-arch-database.svg', parentId: 'az-one', views: availabilityViews, properties: { hostname: 'db-primary', role: 'Primary database', environment: 'production', zone: 'AZ1', cpu: '8 vCPU', memory: '32 GB', storage: '1 TB', monitoring: true, backup: true, critical: true }, layout: layoutFor({ x: 1020, y: 700, width: 156, height: 104 }, null, null, { x: 420, y: 730, width: 156, height: 104 }) }),
            exampleAsset('db-az2', 'database', 'Database Replica', { category: 'Data', icon: 'infrastructure-arch-database.svg', parentId: 'az-two', views: availabilityViews, properties: { hostname: 'db-replica', role: 'Standby database', environment: 'production', zone: 'AZ2', cpu: '8 vCPU', memory: '32 GB', storage: '1 TB', monitoring: true, backup: true, critical: true }, layout: layoutFor({ x: 1640, y: 700, width: 156, height: 104 }, null, null, { x: 1380, y: 730, width: 156, height: 104 }) }),
            exampleAsset('portal', 'application', 'Digital Identity Portal', { category: 'Application', icon: 'infrastructure-arch-application.svg', parentId: 'vpc-production', views: ['overview', 'availability'], properties: { role: 'Business application', environment: 'production', monitoring: true, critical: true }, layout: layoutFor({ x: 1300, y: 340, width: 180, height: 104 }, null, null, { x: 1000, y: 1080, width: 180, height: 104 }) })
        ];
        project.assets = normalizeAssets(assets);
        project.connections = normalizeConnections([
            { id: 'link-internet-edge', source: 'internet', target: 'edge-firewall', type: 'network', label: 'Public ingress' },
            { id: 'link-edge-wan', source: 'edge-firewall', target: 'wan-router', type: 'vpn', label: 'Government WAN', bidirectional: true },
            { id: 'link-wan-cloud', source: 'wan-router', target: 'cloud-firewall', type: 'peering', label: 'Private cloud link', bidirectional: true },
            { id: 'link-cloud-portal', source: 'cloud-firewall', target: 'portal', type: 'trust', label: 'Approved ingress' },
            { id: 'link-portal-a', source: 'portal', target: 'app-az1', type: 'api', label: 'Application traffic' },
            { id: 'link-portal-b', source: 'portal', target: 'app-az2', type: 'api', label: 'Application traffic' },
            { id: 'link-app-db-a', source: 'app-az1', target: 'db-az1', type: 'network', label: 'Database traffic' },
            { id: 'link-app-db-b', source: 'app-az2', target: 'db-az2', type: 'network', label: 'Database traffic' },
            { id: 'link-db-replication', source: 'db-az1', target: 'db-az2', type: 'replication', label: 'Synchronous replication', bidirectional: true }
        ], new Set(project.assets.map(function (asset) { return asset.id; })));

        return project;
    }

    /**
     * Validates and normalizes Studio v0.1 or v0.2 project payloads.
     *
     * @param {unknown} payload Candidate project payload.
     * @returns {{ok: boolean, project?: object, error?: string}} Normalization result.
     */
    function normalizeProject(payload) {
        if (!payload || typeof payload !== 'object') {
            return { ok: false, error: 'The selected file does not contain a Studio project.' };
        }

        if (payload.tool !== toolId) {
            return { ok: false, error: 'The selected JSON is not an InfraStack Studio project.' };
        }

        if (String(payload.version || '').split('.')[0] !== '0') {
            return { ok: false, error: 'This Studio project version is not supported.' };
        }

        const assets = normalizeAssets(payload.assets);
        const assetIds = new Set(assets.map(function (asset) { return asset.id; }));
        const activeView = normalizeViewName(payload.active_view);

        return {
            ok: true,
            project: {
                tool: toolId,
                version: toolVersion,
                project_id: safeString(payload.project_id || createId('project'), 100),
                name: safeString(payload.name || 'Untitled architecture', 80),
                profile: safeString(payload.profile || 'hybrid-production', 50),
                layout_mode: normalizeLayoutMode(payload.layout_mode),
                active_view: supportedViews.includes(activeView) ? activeView : 'overview',
                canvas: clone(canvasSize),
                viewports: normalizeViewports(payload.viewports),
                assets: assets,
                connections: normalizeConnections(payload.connections, assetIds),
                style_presets: normalizeStylePresets(payload.style_presets),
                accepted_risks: Array.isArray(payload.accepted_risks) ? payload.accepted_risks.map(String) : [],
                reference: normalizeReference(payload.reference),
                updated_at: new Date().toISOString()
            }
        };
    }

    /**
     * Adds one catalogue definition to a cloned project.
     *
     * @param {object} project Current project.
     * @param {object} definition Catalogue definition.
     * @returns {{project: object, assetId: string}} Updated project and asset ID.
     */
    function addAsset(project, definition) {
        const next = clone(project);
        const asset = normalizeAsset({
            id: createId(definition.semantic_type || definition.type || 'asset'),
            catalog_id: definition.catalog_id || definition.type,
            type: definition.semantic_type || definition.type,
            label: definition.label,
            category: definition.category,
            icon: definition.icon_url || definition.icon,
            views: definition.views,
            is_container: definition.is_container === true,
            properties: {
                role: definition.default_role || '',
                provider: definition.provider || ''
            }
        }, next.assets.length);
        next.assets.push(asset);
        next.updated_at = new Date().toISOString();

        return { project: next, assetId: asset.id };
    }

    /**
     * Adds an embedded image that behaves as a normal diagram asset.
     *
     * @param {object} project Current project.
     * @param {object} settings Image data and display settings.
     * @param {string} view Projection that receives the asset.
     * @returns {{project: object, assetId: string}} Updated project and asset ID.
     */
    function addImageAsset(project, settings, view) {
        const next = clone(project);
        const activeView = supportedViews.includes(view) ? view : next.active_view;
        const label = safeString(settings?.label || 'Image', 80) || 'Image';
        const asset = normalizeAsset({
            id: createId('image'),
            catalog_id: 'local-image',
            type: 'image',
            label: label,
            category: 'Image',
            views: [activeView],
            properties: { role: 'Diagram image' },
            image: settings,
            layout: {
                [activeView]: {
                    x: settings?.x,
                    y: settings?.y,
                    width: settings?.width || 180,
                    height: settings?.height || 140,
                    icon_size: settings?.icon_size || 72
                }
            }
        }, next.assets.length);
        if (!asset.image) return { project: next, assetId: null };
        next.assets.push(asset);
        next.updated_at = new Date().toISOString();
        return { project: next, assetId: asset.id };
    }

    /**
     * Updates display properties for one embedded image asset.
     *
     * @param {object} project Current project.
     * @param {string} assetId Target asset ID.
     * @param {object} changes Image display changes.
     * @returns {object} Updated project.
     */
    function updateAssetImage(project, assetId, changes) {
        const next = clone(project);
        const asset = next.assets.find(function (candidate) { return candidate.id === assetId; });
        if (!asset?.image) return next;
        asset.image = normalizeAssetImage({ ...asset.image, ...changes });
        next.updated_at = new Date().toISOString();
        return next;
    }

    /**
     * Updates editable asset identity, placement, and resource properties.
     *
     * @param {object} project Current project.
     * @param {string} assetId Target asset ID.
     * @param {object} changes Editable values.
     * @returns {object} Updated project.
     */
    function updateAsset(project, assetId, changes) {
        const next = clone(project);
        const asset = next.assets.find(function (candidate) { return candidate.id === assetId; });

        if (!asset) {
            return next;
        }

        asset.label = safeString(changes.label || asset.label, 80) || asset.label;
        if (Object.hasOwn(changes, 'parent_id')) {
            const parentId = safeString(changes.parent_id, 100) || null;
            const validation = validateParentInAssets(next.assets, assetId, parentId);
            if (validation.valid) asset.parent_id = parentId;
        }
        asset.properties = normalizeProperties({ ...asset.properties, ...changes });
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Moves or resizes one asset in one projection.
     *
     * @param {object} project Current project.
     * @param {string} assetId Target asset ID.
     * @param {string} view Projection to update.
     * @param {object} layout Layout changes.
     * @returns {object} Updated project.
     */
    function updateAssetLayout(project, assetId, view, layout) {
        const next = clone(project);
        const asset = next.assets.find(function (candidate) { return candidate.id === assetId; });

        if (!asset || !supportedViews.includes(view)) {
            return next;
        }

        asset.layout[view] = normalizeLayoutEntry({ ...asset.layout[view], ...layout }, 0, asset.is_container);
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Reorders assets for deterministic canvas stacking.
     *
     * @param {object} project Current project.
     * @param {string[]} assetIds Target asset IDs.
     * @param {'front'|'back'|'forward'|'backward'} direction Stacking operation.
     * @returns {object} Updated project.
     */
    function reorderAssets(project, assetIds, direction) {
        const next = clone(project);
        const ids = new Set(Array.isArray(assetIds) ? assetIds.map(String) : []);

        if (ids.size === 0) return next;
        if (direction === 'front') {
            next.assets = next.assets.filter(function (asset) { return !ids.has(asset.id); }).concat(
                next.assets.filter(function (asset) { return ids.has(asset.id); })
            );
        } else if (direction === 'back') {
            next.assets = next.assets.filter(function (asset) { return ids.has(asset.id); }).concat(
                next.assets.filter(function (asset) { return !ids.has(asset.id); })
            );
        } else if (direction === 'forward') {
            for (let index = next.assets.length - 2; index >= 0; index -= 1) {
                if (ids.has(next.assets[index].id) && !ids.has(next.assets[index + 1].id)) {
                    [next.assets[index], next.assets[index + 1]] = [next.assets[index + 1], next.assets[index]];
                }
            }
        } else if (direction === 'backward') {
            for (let index = 1; index < next.assets.length; index += 1) {
                if (ids.has(next.assets[index].id) && !ids.has(next.assets[index - 1].id)) {
                    [next.assets[index], next.assets[index - 1]] = [next.assets[index - 1], next.assets[index]];
                }
            }
        } else {
            return next;
        }
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Groups selected assets inside a normalized boundary.
     *
     * @param {object} project Current project.
     * @param {string[]} assetIds Selected asset IDs.
     * @returns {{project: object, groupId: (string|null)}} Updated project and group ID.
     */
    function groupAssets(project, assetIds) {
        const next = clone(project);
        const selected = new Set(Array.isArray(assetIds) ? assetIds.map(String) : []);
        const assetMap = new Map(next.assets.map(function (asset) { return [asset.id, asset]; }));
        const roots = next.assets.filter(function (asset) {
            if (!selected.has(asset.id)) return false;
            let parent = assetMap.get(asset.parent_id);
            while (parent) {
                if (selected.has(parent.id)) return false;
                parent = assetMap.get(parent.parent_id);
            }
            return true;
        });

        if (roots.length < 2) return { project: next, groupId: null };
        const groupId = createId('group');
        const commonParent = roots.every(function (asset) { return asset.parent_id === roots[0].parent_id; })
            ? roots[0].parent_id
            : null;
        const views = supportedViews.filter(function (view) {
            return roots.some(function (asset) { return asset.views.includes(view); });
        });
        const layout = {};
        supportedViews.forEach(function (view) {
            const visible = roots.filter(function (asset) { return asset.views.includes(view); });
            if (!visible.length) {
                layout[view] = { x: 60, y: 60, width: 520, height: 330 };
                return;
            }
            const left = Math.min(...visible.map(function (asset) { return asset.layout[view].x; }));
            const top = Math.min(...visible.map(function (asset) { return asset.layout[view].y; }));
            const right = Math.max(...visible.map(function (asset) { return asset.layout[view].x + asset.layout[view].width; }));
            const bottom = Math.max(...visible.map(function (asset) { return asset.layout[view].y + asset.layout[view].height; }));
            layout[view] = {
                x: Math.max(12, left - 30),
                y: Math.max(12, top - 52),
                width: Math.max(260, right - left + 60),
                height: Math.max(180, bottom - top + 82)
            };
        });
        const group = normalizeAsset({
            id: groupId,
            type: 'group',
            label: 'Group',
            category: 'Group',
            views,
            is_container: true,
            parent_id: commonParent,
            properties: { role: 'Grouped diagram assets' },
            layout
        }, next.assets.length);
        const insertAt = Math.min(...roots.map(function (asset) { return next.assets.indexOf(asset); }));
        next.assets.splice(insertAt, 0, group);
        roots.forEach(function (asset) { asset.parent_id = groupId; });
        next.updated_at = new Date().toISOString();

        return { project: normalizeProject(next).project, groupId };
    }

    /**
     * Removes selected group boundaries while preserving their children.
     *
     * @param {object} project Current project.
     * @param {string[]} groupIds Selected group IDs.
     * @returns {{project: object, assetIds: string[]}} Updated project and released child IDs.
     */
    function ungroupAssets(project, groupIds) {
        const next = clone(project);
        const ids = new Set(Array.isArray(groupIds) ? groupIds.map(String) : []);
        const groups = next.assets.filter(function (asset) { return ids.has(asset.id) && asset.type === 'group'; });
        const released = [];

        groups.forEach(function (group) {
            next.assets.forEach(function (asset) {
                if (asset.parent_id !== group.id) return;
                asset.parent_id = group.parent_id;
                released.push(asset.id);
            });
        });
        next.assets = next.assets.filter(function (asset) {
            return !groups.some(function (group) { return group.id === asset.id; });
        });
        if (groups.length) next.updated_at = new Date().toISOString();

        return { project: normalizeProject(next).project, assetIds: released };
    }

    /**
     * Updates one asset appearance in one projection.
     *
     * @param {object} project Current project.
     * @param {string} assetId Target asset ID.
     * @param {string} view Projection to update.
     * @param {object} changes Appearance changes.
     * @returns {object} Updated project.
     */
    function updateAssetAppearance(project, assetId, view, changes) {
        const next = clone(project);
        const asset = next.assets.find(function (candidate) { return candidate.id === assetId; });

        if (!asset || !supportedViews.includes(view)) return next;
        asset.appearance = normalizeAppearance(asset.appearance, asset.type, asset.is_container);
        asset.appearance[view] = normalizeAppearanceEntry({
            ...asset.appearance[view],
            ...changes
        }, asset.type, asset.is_container);
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Applies appearance changes to several assets in one projection.
     *
     * @param {object} project Current project.
     * @param {string[]} assetIds Target asset IDs.
     * @param {string} view Projection to update.
     * @param {object} changes Appearance changes.
     * @returns {object} Updated project.
     */
    function updateAssetAppearances(project, assetIds, view, changes) {
        const ids = new Set(Array.isArray(assetIds) ? assetIds.map(String) : []);
        const next = clone(project);

        if (!supportedViews.includes(view) || ids.size === 0) return next;
        next.assets.forEach(function (asset) {
            if (!ids.has(asset.id) || !asset.views.includes(view)) return;
            asset.appearance = normalizeAppearance(asset.appearance, asset.type, asset.is_container);
            asset.appearance[view] = normalizeAppearanceEntry({
                ...asset.appearance[view],
                ...changes
            }, asset.type, asset.is_container);
        });
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Saves or replaces a provider-neutral named style preset.
     *
     * @param {object} project Current project.
     * @param {string} name Preset display name.
     * @param {object} appearance Preset appearance values.
     * @returns {{project: object, presetId: (string|null)}} Updated project and preset ID.
     */
    function saveStylePreset(project, name, appearance) {
        const next = clone(project);
        const presetName = safeString(name, 40);
        if (!presetName) return { project: next, presetId: null };
        next.style_presets = normalizeStylePresets(next.style_presets);
        const existing = next.style_presets.find(function (preset) {
            return preset.name.toLowerCase() === presetName.toLowerCase();
        });
        const baseId = presetName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'style';
        const usedIds = new Set(next.style_presets.map(function (preset) { return preset.id; }));
        let presetId = existing?.id || baseId;
        let suffix = 2;
        while (!existing && usedIds.has(presetId)) {
            presetId = `${baseId}-${suffix}`;
            suffix += 1;
        }
        const saved = { id: presetId, name: presetName, appearance: normalizePresetAppearance(appearance) };
        if (existing) {
            next.style_presets = next.style_presets.map(function (preset) {
                return preset.id === existing.id ? saved : preset;
            });
        } else {
            next.style_presets = [...next.style_presets, saved].slice(-24);
        }
        next.updated_at = new Date().toISOString();

        return { project: next, presetId: presetId };
    }

    /**
     * Removes one named style preset.
     *
     * @param {object} project Current project.
     * @param {string} presetId Preset ID.
     * @returns {object} Updated project.
     */
    function removeStylePreset(project, presetId) {
        const next = clone(project);
        next.style_presets = normalizeStylePresets(next.style_presets).filter(function (preset) {
            return preset.id !== presetId;
        });
        next.updated_at = new Date().toISOString();
        return next;
    }

    /**
     * Restores one asset appearance to its projection defaults.
     *
     * @param {object} project Current project.
     * @param {string} assetId Target asset ID.
     * @param {string} view Projection to reset.
     * @returns {object} Updated project.
     */
    function resetAssetAppearance(project, assetId, view) {
        const next = clone(project);
        const asset = next.assets.find(function (candidate) { return candidate.id === assetId; });

        if (!asset || !supportedViews.includes(view)) return next;
        asset.appearance = normalizeAppearance(asset.appearance, asset.type, asset.is_container);
        asset.appearance[view] = defaultAssetAppearance(asset.type, asset.is_container);
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Adds one unique typed connection.
     *
     * @param {object} project Current project.
     * @param {string} source Source asset ID.
     * @param {string} target Target asset ID.
     * @param {string} [type='network'] Connection type.
     * @returns {{project: object, connectionId: (string|null)}} Updated project and connection ID.
     */
    function addConnection(project, source, target, type = 'network') {
        const next = clone(project);
        const assetIds = new Set(next.assets.map(function (asset) { return asset.id; }));
        const connectionType = connectionTypes.includes(type) ? type : 'network';

        if (!assetIds.has(source) || !assetIds.has(target) || source === target) {
            return { project: next, connectionId: null };
        }

        const duplicate = next.connections.find(function (connection) {
            return connection.type === connectionType &&
                ((connection.source === source && connection.target === target) ||
                (connection.source === target && connection.target === source));
        });

        if (duplicate) {
            return { project: next, connectionId: duplicate.id };
        }

        const connection = {
            id: createId('connection'),
            source: source,
            target: target,
            type: connectionType,
            label: '',
            bidirectional: false,
            direction: 'source-to-target',
            protocol: '',
            bandwidth: '',
            routing: normalizeConnectionRouting({}),
            appearance: normalizeConnectionAppearance({}, connectionType)
        };
        next.connections.push(connection);
        next.updated_at = new Date().toISOString();

        return { project: next, connectionId: connection.id };
    }

    /**
     * Updates one typed relationship.
     *
     * @param {object} project Current project.
     * @param {string} connectionId Target connection ID.
     * @param {object} changes Editable relationship values.
     * @returns {object} Updated project.
     */
    function updateConnection(project, connectionId, changes) {
        const next = clone(project);
        const connection = next.connections.find(function (candidate) { return candidate.id === connectionId; });

        if (!connection) {
            return next;
        }

        const type = connectionTypes.includes(changes.type) ? changes.type : connection.type;
        const source = safeString(changes.source || connection.source, 100);
        const target = safeString(changes.target || connection.target, 100);
        const validation = validateConnection(next, source, target, type, connectionId);

        if (!validation.valid) {
            return next;
        }

        connection.source = source;
        connection.target = target;
        connection.type = type;
        if (Object.hasOwn(changes, 'label')) connection.label = safeString(changes.label, 80);
        if (Object.hasOwn(changes, 'direction')) {
            const direction = safeString(changes.direction, 30);
            connection.direction = connectionDirections.includes(direction) ? direction : connection.direction;
        }
        if (Object.hasOwn(changes, 'bidirectional')) {
            if (changes.bidirectional === true) connection.direction = 'bidirectional';
            if (changes.bidirectional !== true && !Object.hasOwn(changes, 'direction') && connection.direction === 'bidirectional') {
                connection.direction = 'source-to-target';
            }
        }
        if (Object.hasOwn(changes, 'protocol')) connection.protocol = safeString(changes.protocol, 40);
        if (Object.hasOwn(changes, 'bandwidth')) connection.bandwidth = safeString(changes.bandwidth, 40);
        connection.bidirectional = connection.direction === 'bidirectional';
        connection.routing = normalizeConnectionRouting(connection.routing);
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Updates one relationship appearance in one projection.
     *
     * @param {object} project Current project.
     * @param {string} connectionId Target relationship ID.
     * @param {string} view Projection to update.
     * @param {object} changes Appearance changes.
     * @returns {object} Updated project.
     */
    function updateConnectionAppearance(project, connectionId, view, changes) {
        const next = clone(project);
        const connection = next.connections.find(function (candidate) { return candidate.id === connectionId; });
        if (!connection || !supportedViews.includes(view)) return next;
        connection.appearance = normalizeConnectionAppearance(connection.appearance, connection.type);
        connection.appearance[view] = normalizeConnectionAppearanceEntry({
            ...connection.appearance[view],
            ...changes
        }, connection.type);
        next.updated_at = new Date().toISOString();
        return next;
    }

    /**
     * Validates connection endpoints and duplicate type constraints.
     *
     * @param {object} project Current project.
     * @param {string} source Source asset ID.
     * @param {string} target Target asset ID.
     * @param {string} type Relationship type.
     * @param {?string} [excludeId=null] Connection ID excluded from duplicate checks.
     * @returns {{valid: boolean, reason: string}} Validation result.
     */
    function validateConnection(project, source, target, type, excludeId = null) {
        const connections = project && Array.isArray(project.connections) ? project.connections : [];
        const assetIds = new Set((project && Array.isArray(project.assets) ? project.assets : []).map(function (asset) {
            return asset.id;
        }));

        if (!assetIds.has(source) || !assetIds.has(target)) {
            return { valid: false, reason: 'Choose two existing assets.' };
        }
        if (source === target) {
            return { valid: false, reason: 'A relationship cannot connect an asset to itself.' };
        }
        const duplicate = connections.some(function (connection) {
            return connection.id !== excludeId && connection.type === type &&
                ((connection.source === source && connection.target === target) ||
                (connection.source === target && connection.target === source));
        });

        return duplicate ? { valid: false, reason: 'That relationship already exists.' } : { valid: true, reason: '' };
    }

    /**
     * Updates routing for one connection in one projection.
     *
     * @param {object} project Current project.
     * @param {string} connectionId Target connection ID.
     * @param {string} view Projection to update.
     * @param {object} changes Route style or bend points.
     * @returns {object} Updated project.
     */
    function updateConnectionRoute(project, connectionId, view, changes) {
        const next = clone(project);
        const connection = next.connections.find(function (candidate) { return candidate.id === connectionId; });

        if (!connection || !supportedViews.includes(view)) return next;
        connection.routing = normalizeConnectionRouting(connection.routing);
        connection.routing[view] = normalizeConnectionRoute({
            ...connection.routing[view],
            ...changes
        });
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Removes one connection from a cloned project.
     *
     * @param {object} project Current project.
     * @param {string} connectionId Target connection ID.
     * @returns {object} Updated project.
     */
    function removeConnection(project, connectionId) {
        const next = clone(project);
        next.connections = next.connections.filter(function (connection) {
            return connection.id !== connectionId;
        });
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Removes an asset, descendants, and their relationships.
     *
     * @param {object} project Current project.
     * @param {string} assetId Target asset ID.
     * @returns {object} Updated project.
     */
    function removeAsset(project, assetId) {
        const next = clone(project);
        const removeIds = new Set([assetId]);
        let expanded = true;

        while (expanded) {
            expanded = false;
            next.assets.forEach(function (asset) {
                if (removeIds.has(asset.parent_id) && !removeIds.has(asset.id)) {
                    removeIds.add(asset.id);
                    expanded = true;
                }
            });
        }

        next.assets = next.assets.filter(function (asset) { return !removeIds.has(asset.id); });
        next.connections = next.connections.filter(function (connection) {
            return !removeIds.has(connection.source) && !removeIds.has(connection.target);
        });
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Updates the persisted viewport for one projection.
     *
     * @param {object} project Current project.
     * @param {string} view Projection name.
     * @param {object} viewport Zoom and pan values.
     * @returns {object} Updated project.
     */
    function updateViewport(project, view, viewport) {
        const next = clone(project);

        if (supportedViews.includes(view)) {
            next.viewports[view] = normalizeViewport(viewport);
        }

        return next;
    }

    /**
     * Updates local reference-image metadata without embedding image bytes.
     *
     * @param {object} project Current project.
     * @param {object} reference Reference metadata.
     * @returns {object} Updated project.
     */
    function updateReference(project, reference) {
        const next = clone(project);
        next.reference = normalizeReference({ ...next.reference, ...reference });
        next.updated_at = new Date().toISOString();

        return next;
    }

    /**
     * Applies maxGraph geometry and hierarchy to one normalized projection.
     *
     * @param {object} project Current project.
     * @param {string} view Projection name.
     * @param {Array<object>} rows Graph asset geometry rows.
     * @returns {object} Updated normalized project.
     */
    function applyGraphSnapshot(project, view, rows) {
        const next = clone(project);
        const rowMap = new Map((Array.isArray(rows) ? rows : []).map(function (row) { return [row.id, row]; }));

        if (!supportedViews.includes(view)) return next;
        next.assets.forEach(function (asset) {
            const row = rowMap.get(asset.id);
            if (!row || !asset.views.includes(view)) return;
            asset.layout[view] = normalizeLayoutEntry({ ...asset.layout[view], ...row }, 0, asset.is_container);
            const parentId = safeString(row.parent_id, 100) || null;
            const validation = validateParentInAssets(next.assets, asset.id, parentId);
            if (validation.valid) asset.parent_id = parentId;
        });
        next.updated_at = new Date().toISOString();
        const normalized = normalizeProject(next);

        return normalized.ok ? normalized.project : next;
    }

    /**
     * Duplicates selected assets and relationships between them.
     *
     * @param {object} project Current project.
     * @param {Array<string>} assetIds Selected asset IDs.
     * @returns {{project: object, assetIds: Array<string>}} Updated project and duplicate IDs.
     */
    function duplicateAssets(project, assetIds) {
        const next = clone(project);
        const selected = new Set(Array.isArray(assetIds) ? assetIds : []);
        const originals = next.assets.filter(function (asset) { return selected.has(asset.id); });
        const idMap = new Map();

        originals.forEach(function (asset) { idMap.set(asset.id, createId(asset.type)); });
        originals.forEach(function (asset) {
            const duplicate = clone(asset);
            duplicate.id = idMap.get(asset.id);
            duplicate.label = safeString(`${asset.label} copy`, 80);
            duplicate.parent_id = idMap.get(asset.parent_id) || asset.parent_id;
            supportedViews.forEach(function (view) {
                duplicate.layout[view].x += 30;
                duplicate.layout[view].y += 30;
            });
            next.assets.push(duplicate);
        });
        next.connections.filter(function (connection) {
            return idMap.has(connection.source) && idMap.has(connection.target);
        }).forEach(function (connection) {
            next.connections.push({
                ...clone(connection),
                id: createId('connection'),
                source: idMap.get(connection.source),
                target: idMap.get(connection.target)
            });
        });
        next.updated_at = new Date().toISOString();

        return { project: next, assetIds: Array.from(idMap.values()) };
    }

    function visibleAssetContext(project, view) {
        const assets = project.assets.filter(function (asset) { return asset.views.includes(view); });
        const assetMap = new Map(assets.map(function (asset) { return [asset.id, asset]; }));
        const children = new Map();

        assets.forEach(function (asset) {
            const parentId = assetMap.has(asset.parent_id) ? asset.parent_id : null;
            if (!children.has(parentId)) children.set(parentId, []);
            children.get(parentId).push(asset);
        });

        return { assets: assets, assetMap: assetMap, children: children };
    }

    function semanticAssetOrder(asset) {
        return {
            domain: 10,
            environment: 20,
            vpc: 30,
            'availability-zone': 40,
            subnet: 50,
            internet: 60,
            router: 70,
            firewall: 80,
            application: 90,
            server: 100,
            cluster: 110,
            database: 120,
            storage: 130,
            monitoring: 140
        }[asset.type] || 200;
    }

    function sortAssetsForLayout(assets, view) {
        return [...assets].sort(function (left, right) {
            const typeDifference = semanticAssetOrder(left) - semanticAssetOrder(right);
            if (typeDifference !== 0) return typeDifference;
            const verticalDifference = left.layout[view].y - right.layout[view].y;
            if (verticalDifference !== 0) return verticalDifference;
            return left.label.localeCompare(right.label);
        });
    }

    function descendantIds(context, assetId) {
        const descendants = new Set();
        const queue = [assetId];

        while (queue.length > 0) {
            const parentId = queue.shift();
            (context.children.get(parentId) || []).forEach(function (child) {
                if (descendants.has(child.id)) return;
                descendants.add(child.id);
                queue.push(child.id);
            });
        }

        return descendants;
    }

    function translateAssetTree(project, context, assetId, view, deltaX, deltaY) {
        const ids = new Set([assetId, ...descendantIds(context, assetId)]);

        project.assets.forEach(function (asset) {
            if (!ids.has(asset.id) || !asset.views.includes(view)) return;
            asset.layout[view].x += deltaX;
            asset.layout[view].y += deltaY;
        });
    }

    function selectedLayoutRoots(context, assetIds) {
        const selectedIds = new Set((Array.isArray(assetIds) ? assetIds : []).filter(function (assetId) {
            return context.assetMap.has(assetId);
        }));

        return [...selectedIds].filter(function (assetId) {
            let parent = context.assetMap.get(context.assetMap.get(assetId).parent_id);
            while (parent) {
                if (selectedIds.has(parent.id)) return false;
                parent = context.assetMap.get(parent.parent_id);
            }
            return true;
        });
    }

    /**
     * Aligns selected visible assets while moving descendants with containers.
     *
     * @param {object} project Current project.
     * @param {Array<string>} assetIds Selected asset IDs.
     * @param {string} view Active projection.
     * @param {string} alignment Alignment mode.
     * @returns {object} Updated normalized project.
     */
    function alignAssets(project, assetIds, view, alignment) {
        const next = clone(project);
        const context = visibleAssetContext(next, view);
        const rootIds = selectedLayoutRoots(context, assetIds);
        const supported = ['left', 'center', 'right', 'top', 'middle', 'bottom'];

        if (!supportedViews.includes(view) || !supported.includes(alignment) || rootIds.length < 2) return next;
        const boxes = rootIds.map(function (assetId) { return context.assetMap.get(assetId).layout[view]; });
        const targets = {
            left: Math.min(...boxes.map(function (box) { return box.x; })),
            center: boxes.reduce(function (total, box) { return total + box.x + (box.width / 2); }, 0) / boxes.length,
            right: Math.max(...boxes.map(function (box) { return box.x + box.width; })),
            top: Math.min(...boxes.map(function (box) { return box.y; })),
            middle: boxes.reduce(function (total, box) { return total + box.y + (box.height / 2); }, 0) / boxes.length,
            bottom: Math.max(...boxes.map(function (box) { return box.y + box.height; }))
        };

        rootIds.forEach(function (assetId) {
            const box = context.assetMap.get(assetId).layout[view];
            const deltaX = alignment === 'left' ? targets.left - box.x :
                (alignment === 'center' ? targets.center - box.x - (box.width / 2) :
                    (alignment === 'right' ? targets.right - box.x - box.width : 0));
            const deltaY = alignment === 'top' ? targets.top - box.y :
                (alignment === 'middle' ? targets.middle - box.y - (box.height / 2) :
                    (alignment === 'bottom' ? targets.bottom - box.y - box.height : 0));
            translateAssetTree(next, context, assetId, view, deltaX, deltaY);
        });

        next.updated_at = new Date().toISOString();
        return normalizeProject(next).project;
    }

    /**
     * Distributes selected visible assets with equal gaps on one axis.
     *
     * @param {object} project Current project.
     * @param {Array<string>} assetIds Selected asset IDs.
     * @param {string} view Active projection.
     * @param {string} axis Distribution axis.
     * @returns {object} Updated normalized project.
     */
    function distributeAssets(project, assetIds, view, axis) {
        const next = clone(project);
        const context = visibleAssetContext(next, view);
        const rootIds = selectedLayoutRoots(context, assetIds);

        if (!supportedViews.includes(view) || !['horizontal', 'vertical'].includes(axis) || rootIds.length < 3) return next;
        const positionKey = axis === 'horizontal' ? 'x' : 'y';
        const sizeKey = axis === 'horizontal' ? 'width' : 'height';
        const ordered = rootIds.sort(function (leftId, rightId) {
            return context.assetMap.get(leftId).layout[view][positionKey] - context.assetMap.get(rightId).layout[view][positionKey];
        });
        const firstBox = context.assetMap.get(ordered[0]).layout[view];
        const lastBox = context.assetMap.get(ordered[ordered.length - 1]).layout[view];
        const span = (lastBox[positionKey] + lastBox[sizeKey]) - firstBox[positionKey];
        const occupied = ordered.reduce(function (total, assetId) {
            return total + context.assetMap.get(assetId).layout[view][sizeKey];
        }, 0);
        const gap = (span - occupied) / (ordered.length - 1);
        let cursor = firstBox[positionKey];

        ordered.forEach(function (assetId, index) {
            const box = context.assetMap.get(assetId).layout[view];
            if (index > 0 && index < ordered.length - 1) {
                const delta = cursor - box[positionKey];
                translateAssetTree(next, context, assetId, view, axis === 'horizontal' ? delta : 0, axis === 'vertical' ? delta : 0);
            }
            cursor += box[sizeKey] + gap;
        });

        next.updated_at = new Date().toISOString();
        return normalizeProject(next).project;
    }

    function layoutBoxesNeedClearance(left, right, gap) {
        return left.x < right.x + right.width + gap
            && left.x + left.width + gap > right.x
            && left.y < right.y + right.height + gap
            && left.y + left.height + gap > right.y;
    }

    /**
     * Returns horizontal spacing required for visible relationship labels.
     *
     * @param {object} project Current project.
     * @param {string} view Active projection.
     * @returns {number} Label-aware horizontal gap in canvas units.
     */
    function connectionLabelClearance(project, view) {
        const assets = new Map(project.assets.filter(function (asset) {
            return asset.views.includes(view);
        }).map(function (asset) { return [asset.id, asset]; }));
        const width = project.connections.reduce(function (maximum, connection) {
            if (!assets.has(connection.source) || !assets.has(connection.target)) return maximum;
            const text = connection.label || connection.protocol || '';
            return Math.max(maximum, (text.length * 7) + 28);
        }, 0);
        return Math.max(96, Math.min(220, Math.ceil(width / 10) * 10));
    }

    /**
     * Tidies a package-owned layout without replacing its visual composition.
     *
     * @param {object} project Current project.
     * @param {string} view Active projection.
     * @param {{gap?: number}} [options={}] Optional spacing controls.
     * @returns {object} Updated normalized project.
     */
    function tidyPreservedLayout(project, view, options = {}) {
        const next = clone(project);
        const context = visibleAssetContext(next, view);
        const gap = clamp(options.gap, 24, 72, 40);
        const grid = 10;

        if (!supportedViews.includes(view) || context.assets.length === 0) return next;
        context.assets.filter(function (asset) {
            return !context.assetMap.has(asset.parent_id);
        }).forEach(function (asset) {
            const box = asset.layout[view];
            const targetX = Math.round(box.x / grid) * grid;
            const targetY = Math.round(box.y / grid) * grid;
            translateAssetTree(next, context, asset.id, view, targetX - box.x, targetY - box.y);
        });
        context.children.forEach(function (siblings) {
            const ordered = [...siblings].sort(function (left, right) {
                return left.layout[view].y - right.layout[view].y
                    || left.layout[view].x - right.layout[view].x
                    || left.label.localeCompare(right.label);
            });
            for (let pass = 0; pass < ordered.length; pass += 1) {
                for (let leftIndex = 0; leftIndex < ordered.length; leftIndex += 1) {
                    for (let rightIndex = leftIndex + 1; rightIndex < ordered.length; rightIndex += 1) {
                        const left = ordered[leftIndex].layout[view];
                        const rightAsset = ordered[rightIndex];
                        const right = rightAsset.layout[view];
                        if (!layoutBoxesNeedClearance(left, right, gap)) continue;
                        const horizontalDirection = right.x + (right.width / 2) >= left.x + (left.width / 2) ? 1 : -1;
                        const horizontalTarget = horizontalDirection > 0 ? left.x + left.width + gap : left.x - right.width - gap;
                        const horizontalDelta = horizontalTarget - right.x;
                        const verticalDirection = right.y + (right.height / 2) >= left.y + (left.height / 2) ? 1 : -1;
                        const verticalTarget = verticalDirection > 0 ? left.y + left.height + gap : left.y - right.height - gap;
                        const verticalDelta = verticalTarget - right.y;
                        if (Math.abs(horizontalDelta) <= Math.abs(verticalDelta)) {
                            translateAssetTree(next, context, rightAsset.id, view, horizontalDelta, 0);
                        } else {
                            translateAssetTree(next, context, rightAsset.id, view, 0, verticalDelta);
                        }
                    }
                }
            }
        });
        context.assets.filter(function (asset) { return context.assetMap.has(asset.parent_id); }).forEach(function (asset) {
            const parent = context.assetMap.get(asset.parent_id);
            const parentBox = parent.layout[view];
            const box = asset.layout[view];
            const padding = 28;
            const minimumX = parentBox.x + padding;
            const minimumY = parentBox.y + 58 + padding;
            const maximumX = Math.max(minimumX, parentBox.x + parentBox.width - padding - box.width);
            const maximumY = Math.max(minimumY, parentBox.y + parentBox.height - padding - box.height);
            const targetX = Math.max(minimumX, Math.min(maximumX, box.x));
            const targetY = Math.max(minimumY, Math.min(maximumY, box.y));
            translateAssetTree(next, context, asset.id, view, targetX - box.x, targetY - box.y);
        });
        next.connections.forEach(function (connection) {
            if (connection.routing?.[view]) connection.routing[view].points = [];
        });
        next.updated_at = new Date().toISOString();
        return normalizeProject(next).project;
    }

    /**
     * Builds a deterministic hierarchy-aware layout for one projection.
     *
     * @param {object} project Current project.
     * @param {string} view Active projection.
     * @param {{gap?: number}} [options={}] Optional spacing controls.
     * @returns {object} Updated normalized project.
     */
    function autoLayoutProject(project, view, options = {}) {
        if (project.layout_mode === 'preserve') return tidyPreservedLayout(project, view, options);
        const next = clone(project);
        const context = visibleAssetContext(next, view);
        const metrics = new Map();
        const padding = 28;
        const header = 58;
        const verticalGap = clamp(options.gap, 40, 100, 48);
        const baseHorizontalGap = clamp(options.horizontalGap, 72, 160, 96);
        const containerMinimums = {
            domain: [800, 500],
            environment: [760, 460],
            vpc: [700, 420],
            'availability-zone': [420, 300],
            subnet: [360, 180],
            rack: [360, 220]
        };

        if (!supportedViews.includes(view) || context.assets.length === 0) return next;

        function labelGapForAssets(assets) {
            const ids = new Set(assets.map(function (asset) { return asset.id; }));
            const width = next.connections.reduce(function (maximum, connection) {
                if (!ids.has(connection.source) || !ids.has(connection.target)) return maximum;
                const text = connection.label || connection.protocol || '';
                return Math.max(maximum, (text.length * 7) + 28);
            }, 0);
            return Math.max(baseHorizontalGap, Math.min(220, Math.ceil(width / 10) * 10));
        }

        function measure(container) {
            const childAssets = sortAssetsForLayout(context.children.get(container.id) || [], view);
            const childContainers = childAssets.filter(function (asset) { return asset.is_container; });
            const leaves = childAssets.filter(function (asset) { return !asset.is_container; });
            const leafColumns = Math.min(2, Math.max(1, leaves.length));
            const leafWidth = leaves.length ? Math.max(...leaves.map(function (asset) { return asset.layout[view].width; })) : 0;
            const leafHeight = leaves.length ? Math.max(...leaves.map(function (asset) { return asset.layout[view].height; })) : 0;
            const leafRows = leaves.length ? Math.ceil(leaves.length / leafColumns) : 0;
            const leafGap = labelGapForAssets(leaves);
            const leafLaneWidth = leaves.length ? (leafColumns * leafWidth) + ((leafColumns - 1) * leafGap) : 0;
            const leafLaneHeight = leaves.length ? (leafRows * leafHeight) + ((leafRows - 1) * verticalGap) : 0;
            const childMetrics = childContainers.map(measure);
            const horizontal = childContainers.length <= 2 || childContainers.every(function (asset) {
                return asset.type === 'availability-zone';
            });
            const childWidth = horizontal ? childMetrics.reduce(function (total, item) { return total + item.width; }, 0) + (Math.max(0, childMetrics.length - 1) * baseHorizontalGap) :
                (childMetrics.length ? Math.max(...childMetrics.map(function (item) { return item.width; })) : 0);
            const childHeight = horizontal ? (childMetrics.length ? Math.max(...childMetrics.map(function (item) { return item.height; })) : 0) :
                childMetrics.reduce(function (total, item) { return total + item.height; }, 0) + (Math.max(0, childMetrics.length - 1) * verticalGap);
            const minimums = containerMinimums[container.type] || [320, 200];
            const width = Math.max(minimums[0], Math.max(leafLaneWidth, childWidth) + (padding * 2));
            const height = Math.max(minimums[1], header + padding + leafLaneHeight + (leaves.length && childContainers.length ? verticalGap : 0) + childHeight + padding);
            const result = { asset: container, leaves: leaves, children: childMetrics, horizontal: horizontal, width: Math.min(canvasSize.width - 24, width), height: Math.min(canvasSize.height - 24, height), leafWidth: leafWidth, leafHeight: leafHeight, leafColumns: leafColumns, leafLaneHeight: leafLaneHeight, leafGap: leafGap };
            metrics.set(container.id, result);
            return result;
        }

        function place(metric, x, y) {
            const layout = metric.asset.layout[view];
            layout.x = x;
            layout.y = y;
            layout.width = metric.width;
            layout.height = metric.height;
            let cursorY = y + header + padding;
            const usableWidth = metric.width - (padding * 2);

            metric.leaves.forEach(function (asset, index) {
                const column = index % metric.leafColumns;
                const row = Math.floor(index / metric.leafColumns);
                const rowCount = Math.min(metric.leafColumns, metric.leaves.length - (row * metric.leafColumns));
                const rowWidth = (rowCount * metric.leafWidth) + ((rowCount - 1) * metric.leafGap);
                asset.layout[view].x = x + padding + ((usableWidth - rowWidth) / 2) + (column * (metric.leafWidth + metric.leafGap));
                asset.layout[view].y = cursorY + (row * (metric.leafHeight + verticalGap));
            });
            if (metric.leaves.length) cursorY += metric.leafLaneHeight + (metric.children.length ? verticalGap : 0);

            if (metric.horizontal) {
                const childWidth = metric.children.reduce(function (total, child) { return total + child.width; }, 0) + (Math.max(0, metric.children.length - 1) * baseHorizontalGap);
                let cursorX = x + padding + Math.max(0, (usableWidth - childWidth) / 2);
                metric.children.forEach(function (child) {
                    place(child, cursorX, cursorY);
                    cursorX += child.width + baseHorizontalGap;
                });
            } else {
                metric.children.forEach(function (child) {
                    place(child, x + padding + Math.max(0, (usableWidth - child.width) / 2), cursorY);
                    cursorY += child.height + verticalGap;
                });
            }
        }

        const roots = sortAssetsForLayout(context.children.get(null) || [], view);
        const rootContainers = roots.filter(function (asset) { return asset.is_container; });
        const rootLeaves = roots.filter(function (asset) { return !asset.is_container; });
        const rootMetrics = rootContainers.map(measure);

        const insideIds = new Set();
        rootContainers.forEach(function (container) {
            insideIds.add(container.id);
            descendantIds(context, container.id).forEach(function (assetId) { insideIds.add(assetId); });
        });
        function distanceToInside(startId) {
            const visited = new Set([startId]);
            let queue = [{ id: startId, distance: 0 }];
            while (queue.length) {
                const item = queue.shift();
                const targets = next.connections.filter(function (connection) { return connection.source === item.id; }).map(function (connection) { return connection.target; });
                for (const target of targets) {
                    if (insideIds.has(target)) return item.distance + 1;
                    if (!visited.has(target)) {
                        visited.add(target);
                        queue.push({ id: target, distance: item.distance + 1 });
                    }
                }
            }
            return null;
        }

        const ingress = [];
        const support = [];
        rootLeaves.forEach(function (asset) {
            const distance = distanceToInside(asset.id);
            if (distance === null) support.push(asset);
            else ingress.push({ asset: asset, distance: distance });
        });
        support.sort(function (left, right) {
            return left.layout[view].y - right.layout[view].y || left.label.localeCompare(right.label);
        });
        const ingressGroups = new Map();
        ingress.forEach(function (item) {
            if (!ingressGroups.has(item.distance)) ingressGroups.set(item.distance, []);
            ingressGroups.get(item.distance).push(item.asset);
        });
        const ingressDistances = [...ingressGroups.keys()].sort(function (left, right) { return right - left; });
        const ingressHeight = ingressDistances.reduce(function (total, distance, index) {
            const rowHeight = Math.max(...ingressGroups.get(distance).map(function (asset) { return asset.layout[view].height; }));
            return total + rowHeight + (index > 0 ? verticalGap : 0);
        }, 0);
        let rootX = 160;
        const rootY = Math.max(450, 20 + ingressHeight + verticalGap);
        rootMetrics.forEach(function (metric) {
            place(metric, rootX, rootY);
            rootX += metric.width + baseHorizontalGap;
        });
        const primary = rootMetrics[0] || { width: 1100, height: 700 };
        const primaryX = rootContainers.length ? rootContainers[0].layout[view].x : 160;
        let ingressY = 20;
        ingressDistances.forEach(function (distance) {
            const assets = ingressGroups.get(distance);
            const ordered = sortAssetsForLayout(assets, view);
            const rowGap = labelGapForAssets(ordered);
            const rowWidth = ordered.reduce(function (total, asset) { return total + asset.layout[view].width; }, 0) + (Math.max(0, ordered.length - 1) * rowGap);
            let x = primaryX + ((primary.width - rowWidth) / 2);
            ordered.forEach(function (asset) {
                asset.layout[view].x = x;
                asset.layout[view].y = ingressY;
                x += asset.layout[view].width + rowGap;
            });
            ingressY += Math.max(...ordered.map(function (asset) { return asset.layout[view].height; })) + verticalGap;
        });
        support.forEach(function (asset, index) {
            asset.layout[view].x = Math.min(canvasSize.width - asset.layout[view].width - 24, primaryX + primary.width + 80);
            asset.layout[view].y = rootY + 100 + (index * 130);
        });

        next.updated_at = new Date().toISOString();
        return normalizeProject(next).project;
    }

    /**
     * Produces a normalized JSON-safe export payload.
     *
     * @param {object} project Current project.
     * @returns {object} Export payload.
     */
    function buildExportPayload(project) {
        const result = normalizeProject(project);

        return result.ok ? result.project : createEmptyProject();
    }

    return {
        toolId: toolId,
        toolVersion: toolVersion,
        supportedViews: supportedViews,
        connectionTypes: connectionTypes,
        connectionDirections: connectionDirections,
        connectionRouteStyles: connectionRouteStyles,
        assetShapes: assetShapes,
        assetBorderStyles: assetBorderStyles,
        assetTextAlignments: assetTextAlignments,
        appearanceFields: appearanceFields,
        canvasSize: canvasSize,
        createEmptyProject: createEmptyProject,
        createExampleProject: createExampleProject,
        normalizeProject: normalizeProject,
        addAsset: addAsset,
        addImageAsset: addImageAsset,
        updateAsset: updateAsset,
        updateAssetImage: updateAssetImage,
        updateAssetLayout: updateAssetLayout,
        reorderAssets: reorderAssets,
        groupAssets: groupAssets,
        ungroupAssets: ungroupAssets,
        updateAssetAppearance: updateAssetAppearance,
        updateAssetAppearances: updateAssetAppearances,
        resetAssetAppearance: resetAssetAppearance,
        saveStylePreset: saveStylePreset,
        removeStylePreset: removeStylePreset,
        addConnection: addConnection,
        updateConnection: updateConnection,
        updateConnectionAppearance: updateConnectionAppearance,
        validateConnection: validateConnection,
        updateConnectionRoute: updateConnectionRoute,
        removeConnection: removeConnection,
        removeAsset: removeAsset,
        updateViewport: updateViewport,
        updateReference: updateReference,
        validateAssetParent: validateAssetParent,
        applyGraphSnapshot: applyGraphSnapshot,
        duplicateAssets: duplicateAssets,
        alignAssets: alignAssets,
        distributeAssets: distributeAssets,
        autoLayoutProject: autoLayoutProject,
        connectionLabelClearance: connectionLabelClearance,
        buildExportPayload: buildExportPayload
    };
}());

export default InfraStackStudioCore;
