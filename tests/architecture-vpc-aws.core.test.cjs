const test = require('node:test');
const assert = require('node:assert/strict');
const ArchitectureVpcAwsModelCore = require('../templates/content/tools/aws/architecture-vpc-aws/assets/bin/model-core.js');

const presets = [
    {
        id: 'three-tier-web',
        label: '3-Tier Web',
        defaults: {
            region: 'us-east-1',
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
        label: 'ECS Fargate',
        defaults: {
            region: 'eu-west-1',
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

test('inferFromPrompt extracts ECS Fargate, region, NAT mode, and Aurora deterministically', function () {
    const prompt = 'Build an AWS VPC architecture in eu-west-1 across 2 availability zones for an ECS Fargate platform. Use Aurora and one NAT gateway per AZ.';
    const result = ArchitectureVpcAwsModelCore.inferFromPrompt(prompt, presets[1]);

    assert.equal(result.region, 'eu-west-1');
    assert.equal(result.azCount, 2);
    assert.equal(result.appTier, 'ecs');
    assert.equal(result.database, 'aurora');
    assert.equal(result.natMode, 'per-az');
    assert.equal(result.title, 'ECS Fargate');
});

test('inferFromPrompt keeps preset CIDR when prompt CIDR is invalid', function () {
    const prompt = 'Create a VPC in us-east-1 with CIDR 999.0.0.0/16 and EC2 Auto Scaling.';
    const result = ArchitectureVpcAwsModelCore.inferFromPrompt(prompt, presets[0]);

    assert.equal(result.cidr, '10.0.0.0/16');
    assert.ok(result.assumptions.includes('Prompt included an invalid VPC CIDR. Kept the preset CIDR.'));
});

test('buildExportPayload preserves tool identity, version, and state payload shape', function () {
    const spec = {
        title: '3-Tier Web',
        prompt: 'Create a production AWS VPC.',
        presetId: 'three-tier-web',
        presetLabel: '3-Tier Web',
        region: 'us-east-1',
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
    const payload = ArchitectureVpcAwsModelCore.buildExportPayload(
        spec,
        [{ component: 'Amazon VPC', placement: 'Region', purpose: 'Network boundary' }],
        { 'amazon-vpc-shell': { x: 100, y: 140 } },
        { 'igw-to-alb': { sourceRatio: { x: 1, y: 0.5 } } },
        { prompt: spec.prompt, assumptions: [], matched_keywords: [], current_model: [], score: {}, pros: [], cons: [] }
    );

    assert.equal(payload.tool, 'architecture-vpc-aws');
    assert.equal(payload.version, '1.0.0');
    assert.equal(payload.diagram.region, 'us-east-1');
    assert.deepEqual(payload.layout_overrides['amazon-vpc-shell'], { x: 100, y: 140 });
    assert.deepEqual(payload.connector_overrides['igw-to-alb'].sourceRatio, { x: 1, y: 0.5 });
});

test('buildImportedPayloadState rejects invalid tool id and invalid CIDR', function () {
    const wrongTool = ArchitectureVpcAwsModelCore.buildImportedPayloadState({
        tool: 'wrong-tool',
        version: '1.0.0',
        diagram: {}
    }, presets);

    assert.equal(wrongTool.error, 'The imported JSON is not an AWS VPC Architecture workspace export.');

    const invalidCidr = ArchitectureVpcAwsModelCore.buildImportedPayloadState({
        tool: 'architecture-vpc-aws',
        version: '1.0.0',
        diagram: {
            preset_id: 'three-tier-web',
            region: 'us-east-1',
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
        tool: 'architecture-vpc-aws',
        version: '1.0.0',
        diagram: {
            preset_id: 'three-tier-web',
            prompt: 'Create a production AWS VPC.',
            region: 'us-east-1',
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
            'amazon-vpc-shell': { x: 120, y: 180 }
        },
        connector_overrides: {
            'igw-to-alb': {
                sourceRatio: { x: 1, y: 0.5 }
            }
        },
        prompt_notes: {
            assumptions: ['No extra assumptions'],
            matched_keywords: ['us-east-1', '2 AZ']
        }
    };
    const restored = ArchitectureVpcAwsModelCore.buildImportedPayloadState(payload, presets);

    assert.equal(restored.error, undefined);
    assert.equal(restored.presetId, 'three-tier-web');
    assert.equal(restored.spec.region, 'us-east-1');
    assert.equal(restored.spec.cidr, '10.0.0.0/16');
    assert.equal(restored.spec.appTier, 'ec2');
    assert.deepEqual(restored.layoutOverrides['amazon-vpc-shell'], { x: 120, y: 180 });
    assert.deepEqual(restored.connectorOverrides['igw-to-alb'].sourceRatio, { x: 1, y: 0.5 });
});
