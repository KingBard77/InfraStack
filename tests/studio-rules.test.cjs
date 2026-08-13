const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../assets/js/studio/core/project-model.js');
const rules = require('../assets/js/studio/review/rules.js');

test('empty projects are not assigned a misleading grade', function () {
    const result = rules.evaluateProject(core.createEmptyProject());
    assert.equal(result.grade, null);
    assert.equal(result.score, null);
    assert.equal(result.confidence, 0);
});

test('hybrid example recognizes multi-zone replication facts', function () {
    const result = rules.evaluateProject(core.createExampleProject());
    const ids = result.findings.map(function (finding) { return finding.id; });

    assert.equal(ids.includes('critical-single-zone'), false);
    assert.equal(ids.includes('database-replication-missing'), false);
    assert.ok(result.confidence > 50);
});

test('CIDR parsing and peer overlap detection are deterministic', function () {
    assert.deepEqual(rules.cidrRange('10.10.10.0/24'), { start: 168430080, end: 168430335 });
    assert.equal(rules.cidrRange('999.10.10.0/24'), null);
    assert.equal(rules.cidrsOverlap('10.10.10.0/24', '10.10.10.128/25'), true);
    assert.equal(rules.cidrsOverlap('10.10.10.0/24', '10.10.11.0/24'), false);
    assert.equal(rules.cidrContains('10.10.0.0/16', '10.10.10.0/24'), true);
    assert.equal(rules.cidrContains('10.10.0.0/24', '10.10.10.0/24'), false);
});

test('review flags overlapping peer networks and single-zone critical workloads', function () {
    let project = core.createEmptyProject();
    project.assets = [
        { id: 'vpc-a', type: 'vpc', label: 'VPC A', category: 'Network', views: ['network'], is_container: true, properties: { address: '10.0.0.0/16' }, layout: { network: { x: 20, y: 20 } } },
        { id: 'vpc-b', type: 'vpc', label: 'VPC B', category: 'Network', views: ['network'], is_container: true, properties: { address: '10.0.1.0/24' }, layout: { network: { x: 400, y: 20 } } },
        { id: 'server-a', type: 'server', label: 'Critical App', category: 'Compute', views: ['availability'], parent_id: null, properties: { critical: true, zone: 'AZ1', monitoring: true, backup: true }, layout: { availability: { x: 50, y: 50 } } }
    ];
    project = core.normalizeProject(project).project;
    const ids = rules.evaluateProject(project).findings.map(function (finding) { return finding.id; });

    assert.ok(ids.includes('overlap-vpc-a-vpc-b'));
    assert.ok(ids.includes('critical-single-zone'));
});

test('review separates CIDR containment, duplicate, and overlap findings', function () {
    let project = core.createEmptyProject();
    project.assets = [
        { id: 'vpc', type: 'vpc', label: 'VPC', category: 'Network', views: ['network'], is_container: true, properties: { address: '10.0.0.0/16' }, layout: { network: { x: 20, y: 20 } } },
        { id: 'az', type: 'availability-zone', label: 'AZ', category: 'Availability', views: ['network'], is_container: true, parent_id: 'vpc', properties: { zone: 'az-a' }, layout: { network: { x: 40, y: 40 } } },
        { id: 'subnet-a', type: 'subnet', label: 'Subnet A', category: 'Network', views: ['network'], is_container: true, parent_id: 'az', properties: { address: '10.0.1.0/24', subnet_type: 'private', route_table: 'rt-a' }, layout: { network: { x: 60, y: 60 } } },
        { id: 'subnet-b', type: 'subnet', label: 'Subnet B', category: 'Network', views: ['network'], is_container: true, parent_id: 'az', properties: { address: '10.0.1.0/24', subnet_type: 'private', route_table: 'rt-b' }, layout: { network: { x: 300, y: 60 } } },
        { id: 'subnet-c', type: 'subnet', label: 'Subnet C', category: 'Network', views: ['network'], is_container: true, parent_id: 'az', properties: { address: '10.1.0.0/24', subnet_type: 'private', route_table: 'rt-c' }, layout: { network: { x: 540, y: 60 } } }
    ];
    project = core.normalizeProject(project).project;
    const result = rules.evaluateProject(project);
    const ids = result.findings.map(function (item) { return item.id; });

    assert.ok(ids.includes('duplicate-subnet-a-subnet-b'));
    assert.ok(ids.includes('subnet-outside-vpc-subnet-c'));
    assert.equal(ids.includes('overlap-vpc-subnet-a'), false);
    assert.equal(result.category_scores.Network < 100, true);
});

test('review detects public database placement and returns exact recommendations', function () {
    let project = core.createEmptyProject();
    project.assets = [
        { id: 'internet', type: 'internet', label: 'Internet', category: 'External', views: ['network'], properties: {}, layout: { network: { x: 20, y: 20 } } },
        { id: 'vpc', type: 'vpc', label: 'VPC', category: 'Network', views: ['network'], is_container: true, properties: { address: '10.0.0.0/16' }, layout: { network: { x: 200, y: 20 } } },
        { id: 'subnet', type: 'subnet', label: 'Public Subnet', category: 'Network', views: ['network'], is_container: true, parent_id: 'vpc', properties: { address: '10.0.1.0/24', subnet_type: 'public', route_table: 'rt-public' }, layout: { network: { x: 220, y: 80 } } },
        { id: 'database', type: 'database', label: 'Database', category: 'Database', views: ['network'], parent_id: 'subnet', properties: { critical: true, monitoring: true, backup: true }, layout: { network: { x: 240, y: 120 } } }
    ];
    project.connections = [{ id: 'internet-db', source: 'internet', target: 'database', type: 'network', label: 'Database traffic', direction: 'source-to-target', bidirectional: false }];
    project = core.normalizeProject(project).project;
    const result = rules.evaluateProject(project);
    const publicDatabase = result.findings.find(function (item) { return item.id === 'public-database-database'; });

    assert.equal(result.grade, 'D');
    assert.deepEqual(publicDatabase.asset_ids, ['subnet', 'database']);
    assert.match(publicDatabase.recommendation, /private data subnet/);
    assert.ok(result.findings.some(function (item) { return item.id === 'security-boundary-missing'; }));
});

test('multi-zone design identifies a shared NAT single point of failure', function () {
    let project = core.createEmptyProject();
    project.assets = [
        { id: 'vpc', type: 'vpc', label: 'VPC', category: 'Network', views: ['network'], is_container: true, properties: { address: '10.0.0.0/16' }, layout: { network: { x: 20, y: 20 } } },
        { id: 'az-a', type: 'availability-zone', label: 'AZ A', category: 'Availability', views: ['network'], is_container: true, parent_id: 'vpc', properties: { zone: 'az-a' }, layout: { network: { x: 40, y: 40 } } },
        { id: 'az-b', type: 'availability-zone', label: 'AZ B', category: 'Availability', views: ['network'], is_container: true, parent_id: 'vpc', properties: { zone: 'az-b' }, layout: { network: { x: 300, y: 40 } } },
        { id: 'nat', type: 'router', label: 'NAT Gateway', category: 'Network', views: ['network'], parent_id: 'az-a', properties: { monitoring: true }, layout: { network: { x: 60, y: 80 } } }
    ];
    project = core.normalizeProject(project).project;
    const result = rules.evaluateProject(project);
    const natFinding = result.findings.find(function (item) { return item.id === 'nat-single-zone'; });

    assert.deepEqual(natFinding.asset_ids, ['nat', 'az-a', 'az-b']);
    assert.equal(result.category_scores.Availability, 90);
});
