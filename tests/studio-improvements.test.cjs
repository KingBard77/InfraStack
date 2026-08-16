const test = require('node:test');
const assert = require('node:assert/strict');
const awsTemplates = require('./helpers/studio-aws-package.cjs');
let core;
let rules;
let improvements;

test.before(async function () {
    [
        { default: core },
        { rules, improvements }
    ] = await Promise.all([
        import('../assets/js/studio/core/studio-model.js'),
        import('../assets/js/studio/content.js')
    ]);
});

test('security boundary plan previews and applies a real WAF insertion', function () {
    const project = awsTemplates.createProject(core, 'aws-three-tier');
    const before = rules.evaluateProject(project);
    const finding = before.findings.find(function (item) { return item.id === 'security-boundary-missing'; });
    const plan = improvements.buildPlan(project, finding);
    const preview = improvements.previewPlan(project, plan, core, rules);
    const applied = improvements.applyPlan(project, plan, core);
    const after = rules.evaluateProject(applied.project);
    const firewall = applied.project.assets.find(function (asset) { return asset.type === 'firewall'; });

    assert.equal(plan.applyable, true);
    assert.ok(preview.score > before.score);
    assert.ok(firewall);
    assert.equal(applied.project.connections.some(function (connection) {
        return connection.source === 'internet' && connection.target === firewall.id;
    }), true);
    assert.equal(after.findings.some(function (item) { return item.id === 'security-boundary-missing'; }), false);
});

test('per-zone NAT plan places a second gateway and resolves the shared NAT finding', function () {
    const project = awsTemplates.createProject(core, 'aws-three-tier');
    const finding = rules.evaluateProject(project).findings.find(function (item) { return item.id === 'nat-single-zone'; });
    const plan = improvements.buildPlan(project, finding);
    const applied = improvements.applyPlan(project, plan, core);
    const normalized = core.normalizeProject(applied.project);

    assert.equal(normalized.ok, true);
    assert.equal(applied.project.assets.filter(function (asset) {
        return String(asset.catalog_id || '').includes('nat-gateway');
    }).length, 2);
    assert.equal(rules.evaluateProject(applied.project).findings.some(function (item) { return item.id === 'nat-single-zone'; }), false);
    assert.ok(applied.project.connections.some(function (connection) {
        return applied.assetIds[0] === connection.source && connection.target === 'ec2-b';
    }));
});

test('flow log plan adds telemetry and resolves the missing control', function () {
    const project = awsTemplates.createProject(core, 'aws-eks');
    const finding = rules.evaluateProject(project).findings.find(function (item) { return item.id === 'flow-logs-missing'; });
    const plan = improvements.buildPlan(project, finding);
    const applied = improvements.applyPlan(project, plan, core);

    assert.ok(applied.project.assets.some(function (asset) {
        return String(asset.catalog_id || '').includes('flow-logs');
    }));
    assert.equal(rules.evaluateProject(applied.project).findings.some(function (item) { return item.id === 'flow-logs-missing'; }), false);
});

test('monitoring and backup plans update normalized asset properties', function () {
    let project = core.createEmptyProject();
    project.assets = [{
        id: 'database',
        type: 'database',
        label: 'Critical Database',
        category: 'Data',
        views: ['availability'],
        parent_id: null,
        properties: { critical: true, monitoring: false, backup: false, redundant: true },
        layout: { availability: { x: 40, y: 40 } }
    }];
    project = core.normalizeProject(project).project;
    const firstReview = rules.evaluateProject(project);
    const monitoringFinding = firstReview.findings.find(function (item) { return item.id === 'monitoring-database'; });
    const backupFinding = firstReview.findings.find(function (item) { return item.id === 'backup-database'; });
    project = improvements.applyPlan(project, improvements.buildPlan(project, monitoringFinding), core).project;
    project = improvements.applyPlan(project, improvements.buildPlan(project, backupFinding), core).project;

    assert.equal(project.assets[0].properties.monitoring, true);
    assert.equal(project.assets[0].properties.backup, true);
    assert.equal(rules.evaluateProject(project).findings.some(function (item) {
        return ['monitoring-database', 'backup-database'].includes(item.id);
    }), false);
});

test('unsupported CIDR remediation remains a visible manual plan', function () {
    let project = core.createEmptyProject();
    project.assets = [{
        id: 'vpc',
        type: 'vpc',
        label: 'Invalid VPC',
        category: 'Network',
        views: ['network'],
        is_container: true,
        properties: { address: 'invalid' },
        layout: { network: { x: 40, y: 40 } }
    }];
    project = core.normalizeProject(project).project;
    const finding = rules.evaluateProject(project).findings.find(function (item) { return item.id === 'cidr-vpc'; });
    const plan = improvements.buildPlan(project, finding);

    assert.equal(plan.applyable, false);
    assert.equal(plan.kind, 'manual');
    assert.equal(improvements.previewPlan(project, plan, core, rules), null);
});
