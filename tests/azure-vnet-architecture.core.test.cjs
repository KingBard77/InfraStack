const test = require('node:test');
const assert = require('node:assert/strict');
const AzureVnetModelCore = require('../templates/content/tools/azure/azure-vnet-architecture/assets/bin/model-core.js');

const presets = [
    {
        id: 'three-tier-web',
        label: '3-Tier Web',
        defaults: {
            region: 'eastus',
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
        label: 'Azure Container Apps',
        defaults: {
            region: 'westeurope',
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

test('inferFromPrompt extracts Azure Container Apps, region, NAT mode, and PostgreSQL deterministically', function () {
    const prompt = 'Build an Azure VNet architecture in westeurope across 2 availability zones for an Azure Container Apps platform. Use Azure Database for PostgreSQL and one NAT gateway per AZ.';
    const result = AzureVnetModelCore.inferFromPrompt(prompt, presets[1]);

    assert.equal(result.region, 'westeurope');
    assert.equal(result.azCount, 2);
    assert.equal(result.appTier, 'ecs');
    assert.equal(result.database, 'aurora');
    assert.equal(result.natMode, 'per-az');
    assert.equal(result.title, 'Azure Container Apps');
});

test('inferFromPrompt keeps preset CIDR when prompt CIDR is invalid', function () {
    const prompt = 'Create a VNet in eastus with CIDR 999.0.0.0/16 and Virtual Machine Scale Sets.';
    const result = AzureVnetModelCore.inferFromPrompt(prompt, presets[0]);

    assert.equal(result.cidr, '10.0.0.0/16');
    assert.ok(result.assumptions.includes('Prompt included an invalid VNet CIDR. Kept the preset CIDR.'));
});

test('buildExportPayload preserves tool identity, version, and state payload shape', function () {
    const spec = {
        title: '3-Tier Web',
        prompt: 'Create a production Azure VNet.',
        presetId: 'three-tier-web',
        presetLabel: '3-Tier Web',
        region: 'eastus',
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
    const payload = AzureVnetModelCore.buildExportPayload(
        spec,
        [{ component: 'Azure VNet', placement: 'Region', purpose: 'Network boundary' }],
        { 'amazon-vpc-shell': { x: 100, y: 140 } },
        { 'igw-to-alb': { sourceRatio: { x: 1, y: 0.5 } } },
        { prompt: spec.prompt, assumptions: [], matched_keywords: [], current_model: [], score: {}, pros: [], cons: [] }
    );

    assert.equal(payload.tool, 'azure-vnet-architecture');
    assert.equal(payload.version, '1.0.0');
    assert.equal(payload.diagram.region, 'eastus');
    assert.deepEqual(payload.layout_overrides['amazon-vpc-shell'], { x: 100, y: 140 });
    assert.deepEqual(payload.connector_overrides['igw-to-alb'].sourceRatio, { x: 1, y: 0.5 });
});

test('buildImportedPayloadState rejects invalid tool id and invalid CIDR', function () {
    const wrongTool = AzureVnetModelCore.buildImportedPayloadState({
        tool: 'wrong-tool',
        version: '1.0.0',
        diagram: {}
    }, presets);

    assert.equal(wrongTool.error, 'The imported JSON is not a Visualizer Azure VNet Architecture workspace export.');

    const invalidCidr = AzureVnetModelCore.buildImportedPayloadState({
        tool: 'azure-vnet-architecture',
        version: '1.0.0',
        diagram: {
            preset_id: 'three-tier-web',
            region: 'eastus',
            cidr: '10.999.0.0/16',
            az_count: 2,
            nat_mode: 'single',
            app_tier: 'ec2',
            database: 'rds'
        }
    }, presets);

    assert.equal(invalidCidr.error, 'The imported JSON contains an invalid VNet CIDR.');
});

test('buildImportedPayloadState restores a valid exported payload', function () {
    const payload = {
        tool: 'azure-vnet-architecture',
        version: '1.0.0',
        diagram: {
            preset_id: 'three-tier-web',
            prompt: 'Create a production Azure VNet.',
            region: 'eastus',
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
    const restored = AzureVnetModelCore.buildImportedPayloadState(payload, presets);

    assert.equal(restored.error, undefined);
    assert.equal(restored.presetId, 'three-tier-web');
    assert.equal(restored.spec.region, 'eastus');
    assert.equal(restored.spec.cidr, '10.0.0.0/16');
    assert.equal(restored.spec.appTier, 'ec2');
    assert.deepEqual(restored.layoutOverrides['amazon-vpc-shell'], { x: 120, y: 180 });
    assert.deepEqual(restored.connectorOverrides['igw-to-alb'].sourceRatio, { x: 1, y: 0.5 });
});
