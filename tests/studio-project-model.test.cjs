const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const awsTemplates = require('./helpers/studio-aws-package.cjs');
let core;

test.before(async function () {
    ({ default: core } = await import('../assets/js/studio/core/studio-model.js'));
});

test('hybrid example restores containers, typed links, and four views', function () {
    const example = core.createExampleProject();
    const restored = core.normalizeProject(core.buildExportPayload(example));

    assert.equal(restored.ok, true);
    assert.equal(restored.project.version, '0.5.0');
    assert.equal(restored.project.assets.length, 15);
    assert.equal(restored.project.connections.length, 9);
    assert.deepEqual(core.supportedViews, ['overview', 'physical', 'network', 'availability']);
    assert.ok(restored.project.assets.some(function (asset) { return asset.type === 'availability-zone' && asset.is_container; }));
    assert.ok(restored.project.connections.some(function (connection) { return connection.type === 'replication'; }));
});

test('layout and viewport remain independent per projection', function () {
    const example = core.createExampleProject();
    const server = example.assets.find(function (asset) { return asset.type === 'server'; });
    const originalAvailability = { ...server.layout.availability };
    const moved = core.updateAssetLayout(example, server.id, 'physical', { x: 700, y: 420 });
    const zoomed = core.updateViewport(moved, 'network', { zoom: 1.2, pan_x: -100, pan_y: 40 });
    const movedServer = zoomed.assets.find(function (asset) { return asset.id === server.id; });

    assert.equal(movedServer.layout.physical.x, 700);
    assert.equal(movedServer.layout.physical.y, 420);
    assert.deepEqual(movedServer.layout.availability, originalAvailability);
    assert.equal(zoomed.viewports.network.zoom, 1.2);
    assert.notEqual(zoomed.viewports.overview.zoom, 1.2);
});

test('asset appearance remains independent per projection and restores safely', function () {
    const example = core.createExampleProject();
    const server = example.assets.find(function (asset) { return asset.type === 'server'; });
    let styled = core.updateAssetAppearance(example, server.id, 'overview', {
        shape: 'ellipse',
        fill_color: '#fff4cc',
        border_color: '#7c3aed',
        text_color: '#312e81',
        border_style: 'dotted',
        border_width: 5,
        font_size: 18,
        text_align: 'center',
        locked: true
    });
    const restored = core.normalizeProject(core.buildExportPayload(styled)).project;
    const restoredServer = restored.assets.find(function (asset) { return asset.id === server.id; });

    assert.deepEqual(restoredServer.appearance.overview, {
        shape: 'ellipse',
        fill_color: '#fff4cc',
        border_color: '#7c3aed',
        text_color: '#312e81',
        border_style: 'dotted',
        border_width: 5,
        font_size: 18,
        text_align: 'center',
        locked: true
    });
    assert.equal(restoredServer.appearance.physical.shape, 'rounded');
    assert.equal(restoredServer.appearance.physical.locked, false);

    styled = core.resetAssetAppearance(restored, server.id, 'overview');
    const resetServer = styled.assets.find(function (asset) { return asset.id === server.id; });
    assert.equal(resetServer.appearance.overview.shape, 'rounded');
    assert.equal(resetServer.appearance.overview.fill_color, '#ffffff');
    assert.equal(resetServer.appearance.overview.locked, false);
});

test('container appearance rejects ellipse while preserving provider boundary defaults', function () {
    const project = core.createExampleProject();
    const styled = core.updateAssetAppearance(project, 'vpc-production', 'overview', {
        shape: 'ellipse',
        fill_color: 'invalid',
        border_width: 99
    });
    const vpc = styled.assets.find(function (asset) { return asset.id === 'vpc-production'; });

    assert.equal(vpc.appearance.overview.shape, 'rounded');
    assert.equal(vpc.appearance.overview.fill_color, '#ffffff');
    assert.equal(vpc.appearance.overview.border_color, '#86bff0');
    assert.equal(vpc.appearance.overview.border_width, 8);
    assert.equal(vpc.appearance.overview.font_size, 16);
});

test('multi-asset styles and named presets remain provider-neutral and restorable', function () {
    const project = core.createExampleProject();
    const assetIds = ['internet', 'portal'];
    const styled = core.updateAssetAppearances(project, assetIds, 'overview', {
        fill_color: '#ecfeff',
        border_color: '#0891b2',
        text_color: '#164e63',
        border_style: 'dotted',
        border_width: 4,
        font_size: 15,
        text_align: 'right'
    });
    const saved = core.saveStylePreset(styled, 'Shared edge', styled.assets.find(function (asset) {
        return asset.id === 'internet';
    }).appearance.overview);
    const restored = core.normalizeProject(core.buildExportPayload(saved.project)).project;

    assetIds.forEach(function (assetId) {
        const appearance = restored.assets.find(function (asset) { return asset.id === assetId; }).appearance.overview;
        assert.equal(appearance.fill_color, '#ecfeff');
        assert.equal(appearance.border_color, '#0891b2');
        assert.equal(appearance.text_color, '#164e63');
        assert.equal(appearance.border_style, 'dotted');
        assert.equal(appearance.border_width, 4);
        assert.equal(appearance.font_size, 15);
        assert.equal(appearance.text_align, 'right');
    });
    assert.deepEqual(restored.style_presets.map(function (preset) { return preset.name; }), ['Database', 'Public', 'Critical', 'Shared edge']);
    assert.deepEqual(Object.keys(restored.style_presets[3].appearance), core.appearanceFields);
    assert.equal('provider' in restored.style_presets[3], false);

    const removed = core.removeStylePreset(restored, saved.presetId);
    assert.equal(removed.style_presets.some(function (preset) { return preset.id === saved.presetId; }), false);
});

test('box, icon, and reference geometry normalize and restore', function () {
    const example = core.createExampleProject();
    const server = example.assets.find(function (asset) { return asset.type === 'server'; });
    let resized = core.updateAssetLayout(example, server.id, 'physical', { width: 244, height: 136, icon_size: 58 });
    resized = core.updateReference(resized, { name: 'office.png', mime_type: 'image/png', visible: true, locked: false, x: 90, y: 70, width: 1800, height: 900 });
    const restored = core.normalizeProject(core.buildExportPayload(resized)).project;
    const restoredServer = restored.assets.find(function (asset) { return asset.id === server.id; });

    assert.equal(restoredServer.layout.physical.width, 244);
    assert.equal(restoredServer.layout.physical.height, 136);
    assert.equal(restoredServer.layout.physical.icon_size, 58);
    assert.deepEqual(restored.reference, {
        name: 'office.png',
        mime_type: 'image/png',
        visible: true,
        opacity: 0.28,
        x: 90,
        y: 70,
        width: 1800,
        height: 900,
        locked: false
    });
});

test('embedded image assets keep editable icon properties in Studio JSON', function () {
    const project = core.createEmptyProject();
    const imageData = 'data:image/png;base64,iVBORw0KGgo=';
    const added = core.addImageAsset(project, {
        label: 'Gateway mark',
        data_url: imageData,
        original_data_url: imageData,
        mode: 'icon',
        fit: 'contain',
        opacity: 0.8,
        show_label: true,
        x: 320,
        y: 240
    }, 'overview');
    const changed = core.updateAssetImage(added.project, added.assetId, {
        mode: 'image',
        fit: 'cover',
        opacity: 0.55,
        show_label: false,
        padding: 18,
        background: 'color',
        background_color: '#112233'
    });
    const restored = core.normalizeProject(core.buildExportPayload(changed)).project;
    const image = restored.assets.find(function (asset) { return asset.id === added.assetId; });

    assert.equal(image.type, 'image');
    assert.deepEqual(image.views, ['overview']);
    assert.equal(image.layout.overview.x, 320);
    assert.deepEqual(image.image, {
        data_url: imageData,
        original_data_url: imageData,
        mime_type: 'image/png',
        mode: 'image',
        fit: 'cover',
        opacity: 0.55,
        show_label: false,
        padding: 18,
        background: 'color',
        background_color: '#112233'
    });
});

test('invalid or oversized embedded image data is rejected', function () {
    const project = core.createEmptyProject();
    const invalid = core.addImageAsset(project, { data_url: 'https://example.com/image.png' }, 'overview');

    assert.equal(invalid.assetId, null);
    assert.equal(invalid.project.assets.length, 0);
});

test('typed connections are unique and container deletion removes descendants', function () {
    const project = core.createExampleProject();
    const added = core.addConnection(project, 'internet', 'wan-router', 'vpn');
    const duplicate = core.addConnection(added.project, 'wan-router', 'internet', 'vpn');
    const matches = duplicate.project.connections.filter(function (connection) {
        return connection.type === 'vpn' && [connection.source, connection.target].includes('internet') && [connection.source, connection.target].includes('wan-router');
    });
    const removed = core.removeAsset(duplicate.project, 'az-one');

    assert.equal(matches.length, 1);
    assert.equal(removed.assets.some(function (asset) { return asset.id === 'az-one' || asset.parent_id === 'az-one'; }), false);
    assert.equal(removed.connections.some(function (connection) { return connection.source === 'app-az1' || connection.target === 'app-az1'; }), false);
});

test('v0.1 imports migrate logical view and relationship fields', function () {
    const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/studio-project-v0.1.json'), 'utf8'));
    const result = core.normalizeProject(fixture);

    assert.equal(result.ok, true);
    assert.equal(result.project.active_view, 'network');
    assert.ok(result.project.assets[0].views.includes('network'));
    assert.equal(result.project.connections[0].type, 'network');
    assert.equal(result.project.assets[0].layout.network.x, 80);
});

test('import rejects unrelated and unsupported payloads', function () {
    assert.equal(core.normalizeProject({ tool: 'another-tool', version: '0.1.0' }).ok, false);
    assert.equal(core.normalizeProject({ tool: 'infrastack-studio', version: '1.0.0' }).ok, false);
});

test('graph snapshots update one projection and normalized hierarchy', function () {
    const project = core.createExampleProject();
    const server = project.assets.find(function (asset) { return asset.type === 'server'; });
    const originalNetwork = { ...server.layout.network };
    const next = core.applyGraphSnapshot(project, 'physical', [{
        id: server.id,
        x: 880,
        y: 420,
        width: 252,
        height: 144,
        parent_id: 'az-two'
    }]);
    const updated = next.assets.find(function (asset) { return asset.id === server.id; });

    assert.deepEqual(updated.layout.network, originalNetwork);
    assert.equal(updated.layout.physical.x, 880);
    assert.equal(updated.layout.physical.width, 252);
    assert.equal(updated.parent_id, 'az-two');
});

test('parent validation allows valid boundaries and rejects invalid or circular nesting', function () {
    const project = core.createExampleProject();

    assert.equal(core.validateAssetParent(project, 'app-az1', 'az-two').valid, true);
    assert.equal(core.validateAssetParent(project, 'app-az1', null).valid, true);
    assert.equal(core.validateAssetParent(project, 'vpc-production', 'az-one').valid, false);
    assert.equal(core.validateAssetParent(project, 'domain-cloud', 'vpc-production').valid, false);
    assert.equal(core.validateAssetParent(project, 'env-production', 'az-one').valid, false);
});

test('invalid parent updates are rejected and unrelated edits preserve hierarchy', function () {
    const project = core.createExampleProject();
    const renamed = core.updateAsset(project, 'app-az1', { label: 'Renamed worker' });
    const rejected = core.updateAsset(renamed, 'vpc-production', { parent_id: 'az-one' });

    assert.equal(renamed.assets.find(function (asset) { return asset.id === 'app-az1'; }).parent_id, 'az-one');
    assert.equal(rejected.assets.find(function (asset) { return asset.id === 'vpc-production'; }).parent_id, 'env-production');
});

test('container graph snapshots retain descendant movement and valid reparenting', function () {
    const project = core.createExampleProject();
    const next = core.applyGraphSnapshot(project, 'availability', [
        { id: 'az-one', x: 350, y: 390, width: 830, height: 650, parent_id: 'vpc-production' },
        { id: 'app-az1', x: 520, y: 560, width: 156, height: 104, parent_id: 'az-one' },
        { id: 'db-az1', x: 520, y: 790, width: 156, height: 104, parent_id: 'az-one' }
    ]);

    assert.equal(next.assets.find(function (asset) { return asset.id === 'az-one'; }).layout.availability.x, 350);
    assert.equal(next.assets.find(function (asset) { return asset.id === 'app-az1'; }).layout.availability.x, 520);
    assert.equal(next.assets.find(function (asset) { return asset.id === 'db-az1'; }).layout.availability.y, 790);
});

test('provider catalogue assets preserve exact identity and semantic behavior', function () {
    const project = core.createEmptyProject();
    const result = core.addAsset(project, {
        catalog_id: 'aws-ec2',
        type: 'aws-ec2',
        semantic_type: 'server',
        label: 'Amazon EC2',
        category: 'Compute',
        provider: 'aws',
        icon_url: '/api/studio/icons/aws/aws-arch-amazon-ec2-48.svg',
        views: ['overview', 'physical', 'availability'],
        default_role: 'Elastic compute instance'
    });
    const asset = result.project.assets[0];

    assert.equal(asset.catalog_id, 'aws-ec2');
    assert.equal(asset.type, 'server');
    assert.equal(asset.properties.provider, 'aws');
    assert.equal(asset.icon, '/api/studio/icons/aws/aws-arch-amazon-ec2-48.svg');
});

test('infrastructure-aware asset and connection properties survive export and restore', function () {
    let project = core.createExampleProject();
    project = core.updateAsset(project, 'vpc-production', {
        region: 'ap-southeast-1',
        dns_hostnames: true,
        dns_resolution: true,
        tags: 'Environment=Production'
    });
    project = core.updateAsset(project, 'app-az1', {
        instance_type: 'm7i.large',
        operating_system: 'Amazon Linux 2023',
        private_ip: '10.20.11.20'
    });
    project = core.updateConnection(project, 'link-portal-a', {
        direction: 'source-to-target',
        protocol: 'HTTPS',
        bandwidth: '1 Gbps'
    });
    const restored = core.normalizeProject(core.buildExportPayload(project)).project;
    const vpc = restored.assets.find(function (asset) { return asset.id === 'vpc-production'; });
    const instance = restored.assets.find(function (asset) { return asset.id === 'app-az1'; });
    const connection = restored.connections.find(function (item) { return item.id === 'link-portal-a'; });

    assert.equal(vpc.properties.region, 'ap-southeast-1');
    assert.equal(vpc.properties.tags, 'Environment=Production');
    assert.equal(instance.properties.instance_type, 'm7i.large');
    assert.equal(instance.properties.private_ip, '10.20.11.20');
    assert.equal(connection.protocol, 'HTTPS');
    assert.equal(connection.bandwidth, '1 Gbps');
});

test('connection endpoints, direction, and per-view routes validate and restore', function () {
    let project = core.createExampleProject();
    const original = project.connections.find(function (connection) { return connection.id === 'link-portal-a'; });
    project = core.updateConnection(project, original.id, {
        source: 'portal',
        target: 'db-az1',
        type: 'api',
        direction: 'target-to-source'
    });
    project = core.updateConnectionRoute(project, original.id, 'overview', {
        style: 'curved',
        points: [{ x: 620, y: 430 }, { x: 760, y: 540 }]
    });
    const restored = core.normalizeProject(core.buildExportPayload(project)).project;
    const connection = restored.connections.find(function (item) { return item.id === original.id; });

    assert.equal(connection.source, 'portal');
    assert.equal(connection.target, 'db-az1');
    assert.equal(connection.direction, 'target-to-source');
    assert.equal(connection.bidirectional, false);
    assert.deepEqual(connection.routing.overview, {
        style: 'curved',
        points: [{ x: 620, y: 430 }, { x: 760, y: 540 }]
    });
    assert.deepEqual(connection.routing.physical, { style: 'orthogonal', points: [] });
    assert.equal(core.validateConnection(project, 'portal', 'portal', 'api', original.id).valid, false);
    assert.equal(core.validateConnection(project, 'portal', 'app-az2', 'api', original.id).valid, false);
});

test('dismissed architecture risks survive export and restore', function () {
    const project = core.createExampleProject();
    project.accepted_risks = ['security-boundary-missing', 'nat-single-zone'];
    const restored = core.normalizeProject(core.buildExportPayload(project));

    assert.equal(restored.ok, true);
    assert.deepEqual(restored.project.accepted_risks, ['security-boundary-missing', 'nat-single-zone']);
});

test('multi-asset duplication remaps hierarchy and internal relationships', function () {
    const project = core.createExampleProject();
    const result = core.duplicateAssets(project, ['az-one', 'app-az1', 'db-az1']);
    const duplicateIds = new Set(result.assetIds);
    const duplicateAz = result.project.assets.find(function (asset) {
        return duplicateIds.has(asset.id) && asset.type === 'availability-zone';
    });
    const duplicateApp = result.project.assets.find(function (asset) {
        return duplicateIds.has(asset.id) && asset.type === 'server';
    });

    assert.equal(result.assetIds.length, 3);
    assert.equal(duplicateApp.parent_id, duplicateAz.id);
    assert.ok(result.project.connections.some(function (connection) {
        return duplicateIds.has(connection.source) && duplicateIds.has(connection.target);
    }));
});

test('auto layout arranges AWS ingress, nested boundaries, and operations rail', function () {
    const project = awsTemplates.createProject(core, 'aws-three-tier');
    const arranged = core.autoLayoutProject(project, 'overview');
    const asset = function (id) { return arranged.assets.find(function (candidate) { return candidate.id === id; }); };
    const contains = function (parent, child) {
        const outer = parent.layout.overview;
        const inner = child.layout.overview;
        return inner.x >= outer.x && inner.y >= outer.y &&
            inner.x + inner.width <= outer.x + outer.width &&
            inner.y + inner.height <= outer.y + outer.height;
    };

    assert.ok(asset('users').layout.overview.y < asset('vpc').layout.overview.y);
    assert.ok(asset('cloudwatch').layout.overview.x > asset('vpc').layout.overview.x + asset('vpc').layout.overview.width);
    assert.ok(asset('cloudwatch').layout.overview.y < asset('flow-logs').layout.overview.y);
    assert.ok(asset('flow-logs').layout.overview.y < asset('endpoints').layout.overview.y);
    assert.equal(contains(asset('vpc'), asset('az-a')), true);
    assert.equal(contains(asset('az-a'), asset('private-app-a')), true);
    assert.equal(contains(asset('private-app-a'), asset('ec2-a')), true);
    assert.deepEqual(
        core.autoLayoutProject(arranged, 'overview').assets.map(function (item) { return item.layout.overview; }),
        arranged.assets.map(function (item) { return item.layout.overview; })
    );
});

test('alignment and distribution preserve selected container descendants', function () {
    const project = awsTemplates.createProject(core, 'aws-three-tier');
    const originalAzB = project.assets.find(function (asset) { return asset.id === 'az-b'; }).layout.overview;
    const originalSubnetB = project.assets.find(function (asset) { return asset.id === 'private-app-b'; }).layout.overview;
    const aligned = core.alignAssets(project, ['az-a', 'az-b'], 'overview', 'left');
    const alignedAzA = aligned.assets.find(function (asset) { return asset.id === 'az-a'; }).layout.overview;
    const alignedAzB = aligned.assets.find(function (asset) { return asset.id === 'az-b'; }).layout.overview;
    const alignedSubnetB = aligned.assets.find(function (asset) { return asset.id === 'private-app-b'; }).layout.overview;
    const distributed = core.distributeAssets(project, ['users', 'route53', 'internet'], 'overview', 'horizontal');
    const ordered = ['users', 'route53', 'internet'].map(function (id) {
        return distributed.assets.find(function (asset) { return asset.id === id; }).layout.overview;
    }).sort(function (left, right) { return left.x - right.x; });
    const firstGap = ordered[1].x - (ordered[0].x + ordered[0].width);
    const secondGap = ordered[2].x - (ordered[1].x + ordered[1].width);

    assert.equal(alignedAzA.x, alignedAzB.x);
    assert.equal(alignedSubnetB.x - originalSubnetB.x, alignedAzB.x - originalAzB.x);
    assert.ok(Math.abs(firstGap - secondGap) < 0.001);
});
