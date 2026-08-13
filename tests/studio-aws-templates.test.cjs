const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../assets/js/studio/core/project-model.js');
const awsTemplates = require('../assets/js/studio/providers/aws/templates.js');

test('AWS template catalogue exposes six editable architecture examples', function () {
    const definitions = awsTemplates.listTemplates();

    assert.equal(definitions.length, 6);
    assert.deepEqual(definitions.map(function (template) { return template.id; }), [
        'aws-three-tier',
        'aws-serverless',
        'aws-eks',
        'aws-hybrid',
        'aws-secure-web',
        'aws-disaster-recovery'
    ]);
});

test('every AWS template produces a normalized editable and connected project', function () {
    awsTemplates.listTemplates().forEach(function (definition) {
        const project = awsTemplates.createProject(core, definition.id);
        const restored = core.normalizeProject(core.buildExportPayload(project));

        assert.equal(restored.ok, true, definition.id);
        assert.equal(restored.project.profile, definition.id);
        assert.ok(restored.project.assets.length >= 7, definition.id);
        assert.ok(restored.project.connections.length >= 4, definition.id);
        assert.ok(restored.project.assets.some(function (asset) {
            return asset.properties.provider === 'aws' || asset.properties.provider === 'on-premises';
        }), definition.id);
        restored.project.assets.forEach(function (asset) {
            assert.equal(core.validateAssetParent(restored.project, asset.id, asset.parent_id).valid, true, `${definition.id}:${asset.id}`);
        });
    });
});

test('AWS templates include provider identities and infrastructure-aware properties', function () {
    const threeTier = awsTemplates.createProject(core, 'aws-three-tier');
    const hybrid = awsTemplates.createProject(core, 'aws-hybrid');
    const vpc = threeTier.assets.find(function (asset) { return asset.type === 'vpc'; });
    const ec2 = threeTier.assets.find(function (asset) { return asset.catalog_id === 'aws-ec2-auto-scaling'; });
    const firewall = hybrid.assets.find(function (asset) { return asset.type === 'firewall'; });
    const vpn = hybrid.connections.find(function (connection) { return connection.type === 'vpn'; });

    assert.equal(vpc.properties.region, 'ap-southeast-1');
    assert.equal(vpc.properties.dns_hostnames, true);
    assert.equal(ec2.properties.instance_type, 'm7i.large');
    assert.equal(firewall.properties.vendor, 'Palo Alto Networks');
    assert.equal(vpn.protocol, 'IPSec');
    assert.equal(vpn.bandwidth, '1 Gbps');
});

test('AWS three-tier template follows the editable reference architecture hierarchy', function () {
    const project = awsTemplates.createProject(core, 'aws-three-tier');
    const vpc = project.assets.find(function (asset) { return asset.id === 'vpc'; });
    const zones = project.assets.filter(function (asset) { return asset.parent_id === 'vpc' && asset.type === 'availability-zone'; });
    const subnets = project.assets.filter(function (asset) { return asset.type === 'subnet'; });
    const externalIds = ['users', 'route53', 'internet', 'alb', 'cloudwatch', 'flow-logs', 'endpoints'];

    assert.equal(project.assets.length, 21);
    assert.equal(project.connections.length, 13);
    assert.equal(vpc.parent_id, null);
    assert.equal(vpc.properties.address, '10.0.0.0/16');
    assert.equal(zones.length, 2);
    assert.equal(subnets.length, 6);
    assert.equal(subnets.filter(function (subnet) { return subnet.parent_id === 'az-a'; }).length, 3);
    assert.equal(subnets.filter(function (subnet) { return subnet.parent_id === 'az-b'; }).length, 3);
    assert.ok(externalIds.every(function (id) {
        return project.assets.find(function (asset) { return asset.id === id && asset.parent_id === null; });
    }));
    assert.ok(project.assets.some(function (asset) { return asset.catalog_id === 'aws-nat-gateway'; }));
    assert.equal(project.assets.filter(function (asset) { return asset.catalog_id === 'aws-rds'; }).length, 2);
});
