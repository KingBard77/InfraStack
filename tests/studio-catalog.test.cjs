const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const catalogPath = path.join(__dirname, '../assets/data/studio/providers/generic/catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const awsCatalogPath = path.join(__dirname, '../assets/data/studio/providers/aws/catalog.json');
const awsCatalog = JSON.parse(fs.readFileSync(awsCatalogPath, 'utf8'));
const awsIconRoot = path.join(__dirname, '../assets/icons/providers/aws');

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
