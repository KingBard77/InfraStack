const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const libraryRoot = path.join(__dirname, '../assets/data/studio/libraries');
const iconRoot = path.join(__dirname, '../assets/icons/studio/libraries');
const registry = JSON.parse(fs.readFileSync(path.join(libraryRoot, 'registry.json'), 'utf8'));
const catalogPath = path.join(libraryRoot, 'infrastructure/generic/catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const genericIconRoot = path.join(iconRoot, 'infrastructure/generic');
const awsCatalogPath = path.join(libraryRoot, 'cloud/aws/catalog.json');
const awsCatalog = JSON.parse(fs.readFileSync(awsCatalogPath, 'utf8'));
const awsIconRoot = path.join(iconRoot, 'cloud/aws');
const azureCatalogPath = path.join(libraryRoot, 'cloud/azure/catalog.json');
const azureCatalog = JSON.parse(fs.readFileSync(azureCatalogPath, 'utf8'));
const azureIconRoot = path.join(iconRoot, 'cloud/azure');
const gcpCatalogPath = path.join(libraryRoot, 'cloud/gcp/catalog.json');
const gcpCatalog = JSON.parse(fs.readFileSync(gcpCatalogPath, 'utf8'));
const gcpIconRoot = path.join(iconRoot, 'cloud/gcp');
const kubernetesCatalogPath = path.join(libraryRoot, 'containers/kubernetes/catalog.json');
const kubernetesCatalog = JSON.parse(fs.readFileSync(kubernetesCatalogPath, 'utf8'));
const kubernetesIconRoot = path.join(iconRoot, 'containers/kubernetes');
const unifiCatalogPath = path.join(libraryRoot, 'vendors/ubiquiti/unifi/catalog.json');
const unifiCatalog = JSON.parse(fs.readFileSync(unifiCatalogPath, 'utf8'));
const unifiIconRoot = path.join(iconRoot, 'vendors/ubiquiti/unifi');

test('Studio library registry declares scalable groups and valid current sources', function () {
    assert.deepEqual(registry.groups.map(function (group) { return group.id; }), [
        'general', 'infrastructure', 'cloud', 'virtualization', 'containers', 'vendors'
    ]);
    assert.deepEqual(registry.libraries.map(function (library) { return library.id; }), [
        'infrastructure-generic', 'cloud-aws', 'cloud-azure', 'cloud-gcp', 'containers-kubernetes',
        'vendors-ubiquiti-unifi'
    ]);
    registry.libraries.forEach(function (library) {
        assert.ok(registry.groups.some(function (group) { return group.id === library.group; }));
        assert.ok(fs.existsSync(path.join(libraryRoot, library.catalog)));
        assert.ok(fs.existsSync(path.join(iconRoot, library.icons)));
    });
});

test('Studio catalogue exposes five populated groups', function () {
    const groupIds = catalog.groups.map(function (group) { return group.id; });

    assert.deepEqual(groupIds, ['basic', 'physical', 'network', 'platform', 'application-data']);
    groupIds.forEach(function (groupId) {
        assert.ok(catalog.assets.some(function (asset) { return asset.group === groupId; }));
    });
});

test('Studio catalogue assets have searchable grouping metadata and unique types', function () {
    const types = new Set();
    const supportedViews = new Set(['overview', 'physical', 'network', 'availability']);

    catalog.assets.forEach(function (asset) {
        assert.ok(asset.type);
        assert.equal(types.has(asset.type), false);
        assert.ok(catalog.groups.some(function (group) { return group.id === asset.group; }));
        assert.ok(asset.section);
        assert.equal(asset.provider, 'generic');
        assert.ok(Array.isArray(asset.keywords) && asset.keywords.length > 0);
        assert.ok(Array.isArray(asset.tags) && asset.tags.length > 0);
        assert.ok(asset.views.every(function (view) { return supportedViews.has(view); }));
        types.add(asset.type);
    });
});

test('Studio generic catalogue gives every drawable asset a monochrome SVG icon', function () {
    const suppliedTypes = new Set([
        'database', 'hub', 'internet', 'object-storage', 'postgresql', 'router',
        'website', 'wifi-router'
    ]);

    suppliedTypes.forEach(function (type) {
        assert.ok(catalog.assets.some(function (asset) { return asset.type === type; }));
    });
    catalog.assets.filter(function (asset) {
        return asset.category !== 'Boundary';
    }).forEach(function (asset) {
        const iconPath = path.join(genericIconRoot, asset.icon);

        assert.match(asset.icon, /^[a-z0-9-]+\.svg$/);
        assert.ok(fs.existsSync(iconPath));
        const source = fs.readFileSync(iconPath, 'utf8');

        assert.match(source, /viewBox="0 0 512 512"/);
        assert.match(source, /stroke="#000"/);
        assert.doesNotMatch(source, /<rect[^>]+width="512"[^>]+height="512"/);
    });
});

test('Studio AWS catalogue maps 24 service identities to semantic behavior and shared icons', function () {
    const catalogIds = new Set();
    const semanticTypes = new Set([
        'vpc', 'router', 'internet', 'firewall', 'api', 'monitoring', 'server',
        'cluster', 'kubernetes', 'container', 'application', 'database', 'cache'
    ]);

    assert.equal(awsCatalog.provider, 'aws');
    assert.equal(awsCatalog.assets.length, 24);
    awsCatalog.assets.forEach(function (asset) {
        assert.match(asset.catalog_id, /^aws-/);
        assert.equal(catalogIds.has(asset.catalog_id), false);
        assert.equal(asset.provider, 'aws');
        assert.ok(semanticTypes.has(asset.semantic_type));
        assert.ok(fs.existsSync(path.join(awsIconRoot, asset.icon)));
        assert.ok(Array.isArray(asset.keywords) && asset.keywords.length > 0);
        assert.ok(Array.isArray(asset.tags) && asset.tags.includes('aws'));
        catalogIds.add(asset.catalog_id);
    });
});

test('Studio Azure catalogue maps provider identities to semantic behavior and local icons', function () {
    const catalogIds = new Set();
    const semanticTypes = new Set([
        'vpc', 'subnet', 'router', 'internet', 'firewall', 'api', 'monitoring',
        'server', 'cluster', 'kubernetes', 'container', 'application', 'storage',
        'database', 'cache'
    ]);

    assert.equal(azureCatalog.provider, 'azure');
    assert.equal(azureCatalog.assets.length, 25);
    azureCatalog.assets.forEach(function (asset) {
        assert.match(asset.catalog_id, /^azure-/);
        assert.equal(catalogIds.has(asset.catalog_id), false);
        assert.equal(asset.provider, 'azure');
        assert.ok(semanticTypes.has(asset.semantic_type));
        assert.ok(fs.existsSync(path.join(azureIconRoot, asset.icon)));
        assert.ok(Array.isArray(asset.keywords) && asset.keywords.length > 0);
        assert.ok(Array.isArray(asset.tags) && asset.tags.includes('azure'));
        catalogIds.add(asset.catalog_id);
    });
});

test('Studio Google Cloud catalogue maps provider identities to official local icons', function () {
    const catalogIds = new Set();
    const semanticTypes = new Set([
        'vpc', 'subnet', 'router', 'firewall', 'server', 'cluster', 'application',
        'monitoring', 'storage', 'database'
    ]);

    assert.equal(gcpCatalog.provider, 'gcp');
    assert.equal(gcpCatalog.assets.length, 17);
    gcpCatalog.assets.forEach(function (asset) {
        assert.match(asset.catalog_id, /^gcp-/);
        assert.equal(catalogIds.has(asset.catalog_id), false);
        assert.equal(asset.provider, 'gcp');
        assert.ok(semanticTypes.has(asset.semantic_type));
        assert.ok(fs.existsSync(path.join(gcpIconRoot, asset.icon)));
        assert.ok(Array.isArray(asset.keywords) && asset.keywords.length > 0);
        assert.ok(Array.isArray(asset.tags) && asset.tags.includes('gcp'));
        catalogIds.add(asset.catalog_id);
    });
});

test('Studio Ubiquiti UniFi catalogue maps all supplied product identities to optimized local SVGs', function () {
    const catalogIds = new Set();
    const semanticTypes = new Set([
        'access-point', 'firewall', 'switch', 'monitoring', 'camera', 'storage', 'phone'
    ]);
    const groups = new Set([
        'wireless', 'gateways-security', 'switching', 'management', 'video-security', 'voice'
    ]);

    assert.equal(unifiCatalog.provider, 'ubiquiti');
    assert.equal(unifiCatalog.assets.length, 44);
    assert.deepEqual(new Set(unifiCatalog.groups.map(function (group) { return group.id; })), groups);
    unifiCatalog.assets.forEach(function (asset) {
        assert.match(asset.catalog_id, /^ubiquiti-unifi-/);
        assert.equal(catalogIds.has(asset.catalog_id), false);
        assert.equal(asset.provider, 'ubiquiti');
        assert.ok(semanticTypes.has(asset.semantic_type));
        assert.ok(groups.has(asset.group));
        assert.match(asset.icon, /^ubiquiti-unifi-[a-z0-9-]+\.svg$/);
        assert.ok(fs.existsSync(path.join(unifiIconRoot, asset.icon)));
        assert.ok(Array.isArray(asset.keywords) && asset.keywords.length > 0);
        assert.ok(Array.isArray(asset.tags) && asset.tags.includes('ubiquiti') && asset.tags.includes('unifi'));
        catalogIds.add(asset.catalog_id);
    });
    assert.ok(fs.existsSync(path.join(unifiIconRoot, 'NOTICE.md')));
});

test('Studio Kubernetes catalogue provides complete grouped container-platform components', function () {
    const catalogIds = new Set();
    const groupIds = new Set(kubernetesCatalog.groups.map(function (group) { return group.id; }));
    const withoutOfficialIcon = new Set([
        'kubernetes-container-runtime', 'kubernetes-gateway', 'kubernetes-dns',
        'kubernetes-cni', 'kubernetes-pod-security', 'kubernetes-csi',
        'kubernetes-pdb', 'kubernetes-monitoring', 'kubernetes-logging'
    ]);

    assert.equal(kubernetesCatalog.provider, 'kubernetes');
    assert.equal(kubernetesCatalog.assets.length, 36);
    assert.deepEqual(groupIds, new Set([
        'boundaries', 'control-plane', 'workloads', 'networking',
        'configuration-security', 'storage', 'operations'
    ]));
    kubernetesCatalog.assets.forEach(function (asset) {
        assert.match(asset.catalog_id, /^kubernetes-/);
        assert.equal(catalogIds.has(asset.catalog_id), false);
        assert.equal(asset.provider, 'kubernetes');
        assert.ok(groupIds.has(asset.group));
        assert.ok(Array.isArray(asset.keywords) && asset.keywords.length > 0);
        assert.ok(Array.isArray(asset.tags) && asset.tags.includes('kubernetes'));
        if (withoutOfficialIcon.has(asset.catalog_id)) assert.equal(asset.icon, '');
        else {
            assert.match(asset.icon, /^kubernetes-[a-z0-9-]+\.svg$/);
            const iconPath = path.join(kubernetesIconRoot, asset.icon);
            assert.ok(fs.existsSync(iconPath));
            const icon = fs.readFileSync(iconPath, 'utf8');
            assert.match(icon, /<svg/);
            assert.match(icon, /#326ce5/i);
        }
        catalogIds.add(asset.catalog_id);
    });
    assert.equal(kubernetesCatalog.assets.filter(function (asset) { return asset.icon; }).length, 27);
    assert.equal(fs.readdirSync(kubernetesIconRoot).filter(function (filename) { return filename.endsWith('.svg'); }).length, 26);
    assert.equal(fs.readdirSync(kubernetesIconRoot).some(function (filename) { return filename.startsWith('official-'); }), false);
    ['NOTICE.md', 'LICENSE-KUBERNETES-ICONS.txt', 'LICENSE-KUBERNETES-LOGO.txt', 'KUBERNETES-LOGO-USAGE.md'].forEach(function (filename) {
        assert.ok(fs.existsSync(path.join(kubernetesIconRoot, filename)));
    });
});
