const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../assets/js/studio/core/project-model.js');
const azureTemplates = require('../assets/js/studio/providers/azure/templates.js');

test('Azure template catalogue exposes an editable provider-native example', function () {
    const definitions = azureTemplates.listTemplates();

    assert.deepEqual(definitions.map(function (template) { return template.id; }), ['azure-three-tier']);
});

test('Azure production template restores its network hierarchy and service identities', function () {
    const project = azureTemplates.createProject(core, 'azure-three-tier');
    const restored = core.normalizeProject(core.buildExportPayload(project));
    const vnet = project.assets.find(function (asset) { return asset.catalog_id === 'azure-virtual-network'; });
    const subnets = project.assets.filter(function (asset) { return asset.type === 'subnet'; });

    assert.equal(restored.ok, true);
    assert.equal(project.profile, 'azure-three-tier');
    assert.equal(project.assets.length, 19);
    assert.equal(project.connections.length, 16);
    assert.equal(vnet.properties.address, '10.20.0.0/16');
    assert.equal(subnets.length, 3);
    assert.ok(subnets.every(function (subnet) { return subnet.parent_id === vnet.id; }));
    assert.ok(project.assets.some(function (asset) { return asset.catalog_id === 'azure-front-door'; }));
    assert.ok(project.assets.some(function (asset) { return asset.catalog_id === 'azure-waf-policy'; }));
    assert.equal(project.assets.filter(function (asset) { return asset.catalog_id === 'azure-vm-scale-set'; }).length, 2);
    assert.equal(project.assets.filter(function (asset) { return asset.catalog_id === 'azure-postgresql'; }).length, 2);
    project.assets.forEach(function (asset) {
        assert.equal(core.validateAssetParent(project, asset.id, asset.parent_id).valid, true, asset.id);
    });
});
