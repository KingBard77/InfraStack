const test = require('node:test');
const assert = require('node:assert/strict');
const ArchitectureVpcGcpModelCore = require('../templates/content/tools/gcp/architecture-vpc-gcp/assets/bin/model-core.js');

const presets = [
    {
        id: 'three-tier-web',
        label: '3-Tier Web',
        defaults: {
            region: 'us-central1',
            cidr: '10.0.0.0/16',
            azCount: 2,
            natMode: 'single',
            appTier: 'ec2',
            database: 'rds',
            route53: true,
            cloudFront: false,
            waf: false,
            alb: true,
            bastion: false,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: false,
            transitGateway: false,
            cache: false
        }
    },
    {
        id: 'ecs-fargate',
        label: 'Cloud Run',
        defaults: {
            region: 'europe-west1',
            cidr: '10.20.0.0/16',
            azCount: 2,
            natMode: 'per-az',
            appTier: 'ecs',
            database: 'aurora',
            route53: true,
            cloudFront: true,
            waf: true,
            alb: true,
            bastion: false,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: false,
            transitGateway: false,
            cache: true
        }
    }
];

test('inferFromPrompt extracts Cloud Run, region, Cloud NAT mode, and PostgreSQL deterministically', function () {
    const prompt = 'Build a GCP VPC topology in europe-west1 across 2 zones for a Cloud Run platform. Use Cloud SQL for PostgreSQL and one Cloud NAT policy per zone.';
    const result = ArchitectureVpcGcpModelCore.inferFromPrompt(prompt, presets[1]);

    assert.equal(result.region, 'europe-west1');
    assert.equal(result.azCount, 2);
    assert.equal(result.appTier, 'ecs');
    assert.equal(result.database, 'aurora');
    assert.equal(result.natMode, 'per-az');
    assert.equal(result.title, 'Cloud Run');
});

test('inferFromPrompt keeps preset CIDR when prompt CIDR is invalid', function () {
    const prompt = 'Create a GCP VPC in us-central1 with CIDR 999.0.0.0/16 and Managed Instance Groups.';
    const result = ArchitectureVpcGcpModelCore.inferFromPrompt(prompt, presets[0]);

    assert.equal(result.cidr, '10.0.0.0/16');
    assert.ok(result.assumptions.includes('Prompt included an invalid VPC CIDR. Kept the preset CIDR.'));
});

test('buildExportPayload preserves tool identity, version, and state payload shape', function () {
    const spec = {
        title: '3-Tier Web',
        prompt: 'Create a production GCP VPC.',
        presetId: 'three-tier-web',
        presetLabel: '3-Tier Web',
        region: 'us-central1',
        cidr: '10.0.0.0/16',
        azCount: 2,
        natMode: 'single',
        appTier: 'ec2',
        database: 'rds',
        route53: true,
        cloudFront: false,
        waf: false,
        alb: true,
        bastion: false,
        endpoints: true,
        flowLogs: true,
        cloudWatch: true,
        siteToSiteVpn: false,
        transitGateway: false,
        cache: false
    };
    const payload = ArchitectureVpcGcpModelCore.buildExportPayload(
        spec,
        [{ component: 'GCP VPC', placement: 'Region', purpose: 'Network boundary' }],
        { 'architecture-vpc-gcp-shell': { x: 100, y: 140 } },
        { 'internet-edge-to-external-http-load-balancer': { sourceRatio: { x: 1, y: 0.5 } } },
        { prompt: spec.prompt, assumptions: [], matched_keywords: [], current_model: [], score: {}, pros: [], cons: [] }
    );

    assert.equal(payload.tool, 'architecture-vpc-gcp');
    assert.equal(payload.version, '1.0.0');
    assert.equal(payload.diagram.region, 'us-central1');
    assert.deepEqual(payload.layout_overrides['architecture-vpc-gcp-shell'], { x: 100, y: 140 });
    assert.deepEqual(payload.connector_overrides['internet-edge-to-external-http-load-balancer'].sourceRatio, { x: 1, y: 0.5 });
});

test('buildImportedPayloadState rejects invalid tool id and invalid CIDR', function () {
    const wrongTool = ArchitectureVpcGcpModelCore.buildImportedPayloadState({
        tool: 'wrong-tool',
        version: '1.0.0',
        diagram: {}
    }, presets);

    assert.equal(wrongTool.error, 'The imported JSON is not a GCP VPC Topology workspace export.');

    const invalidCidr = ArchitectureVpcGcpModelCore.buildImportedPayloadState({
        tool: 'architecture-vpc-gcp',
        version: '1.0.0',
        diagram: {
            preset_id: 'three-tier-web',
            region: 'us-central1',
            cidr: '10.999.0.0/16',
            az_count: 2,
            nat_mode: 'single',
            app_tier: 'ec2',
            database: 'rds'
        }
    }, presets);

    assert.equal(invalidCidr.error, 'The imported JSON contains an invalid VPC CIDR.');
});

test('buildImportedPayloadState restores a valid exported payload', function () {
    const payload = {
        tool: 'architecture-vpc-gcp',
        version: '1.0.0',
        diagram: {
            preset_id: 'three-tier-web',
            prompt: 'Create a production GCP VPC.',
            region: 'us-central1',
            cidr: '10.0.0.0/16',
            az_count: 2,
            nat_mode: 'single',
            app_tier: 'ec2',
            database: 'rds',
            route53: true,
            cloudfront: false,
            waf: false,
            alb: true,
            bastion: false,
            endpoints: true,
            flow_logs: true,
            cloudwatch: true,
            site_to_site_vpn: false,
            transit_gateway: false,
            cache: false
        },
        layout_overrides: {
            'architecture-vpc-gcp-shell': { x: 120, y: 180 }
        },
        connector_overrides: {
            'internet-edge-to-external-http-load-balancer': {
                sourceRatio: { x: 1, y: 0.5 }
            }
        },
        prompt_notes: {
            assumptions: ['No extra assumptions'],
            matched_keywords: ['us-central1', '2 zones']
        }
    };
    const restored = ArchitectureVpcGcpModelCore.buildImportedPayloadState(payload, presets);

    assert.equal(restored.error, undefined);
    assert.equal(restored.presetId, 'three-tier-web');
    assert.equal(restored.spec.region, 'us-central1');
    assert.equal(restored.spec.cidr, '10.0.0.0/16');
    assert.equal(restored.spec.appTier, 'ec2');
    assert.deepEqual(restored.layoutOverrides['architecture-vpc-gcp-shell'], { x: 120, y: 180 });
    assert.deepEqual(restored.connectorOverrides['internet-edge-to-external-http-load-balancer'].sourceRatio, { x: 1, y: 0.5 });
});
