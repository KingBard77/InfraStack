const test = require('node:test');
const assert = require('node:assert/strict');
const ArchitectureVpcHuaweiModelCore = require('../templates/content/tools/huawei/architecture-vpc-huawei/assets/bin/model-core.js');

test('inferFromPrompt extracts hybrid connectivity, zones, VPC CIDR, enterprise project, and ASN', function () {
    const spec = ArchitectureVpcHuaweiModelCore.inferFromPrompt({
        preset: 'hybrid-connectivity',
        prompt: 'Generate a hybrid Huawei Cloud architecture across 3 availability zones with VPC CIDR 10.110.0.0/16. Use Enterprise Router, Direct Connect or VPN, edge ASN 64550, enterprise project hybrid-app, Cloud Eye, CTS, and VPC flow logs.'
    });

    assert.equal(spec.routingMode, 'hybrid');
    assert.equal(spec.accessBlocks, 3);
    assert.equal(spec.trunkVlans, '10.110.0.0/16');
    assert.equal(spec.wan, true);
    assert.equal(spec.vpn, true);
    assert.equal(spec.monitoring, true);
    assert.equal(spec.acl, true);
    assert.equal(spec.ospfArea, 'hybrid-app');
    assert.equal(spec.bgpAsn, '64550');
});

test('inferFromPrompt supports private-only data services without NAT Gateway', function () {
    const spec = ArchitectureVpcHuaweiModelCore.inferFromPrompt({
        preset: 'data-services',
        prompt: 'Design a private-only Huawei Cloud data services VPC across 2 zones with VPC CIDR 10.100.0.0/16, service endpoint subnet 10.100.30.0/24, OBS, RDS, DEW KMS, CSMS, Cloud Eye, flow logs, and no NAT Gateway.'
    });

    assert.equal(spec.routingMode, 'private-only');
    assert.equal(spec.accessBlocks, 2);
    assert.equal(spec.trunkVlans, '10.100.0.0/16');
    assert.equal(spec.nat, false);
    assert.equal(spec.dhcpDns, true);
    assert.equal(spec.monitoring, true);
});

test('inferFromPrompt keeps explicit medium scale with enterprise project labels', function () {
    const spec = ArchitectureVpcHuaweiModelCore.inferFromPrompt({
        preset: 'secure-vpc-app',
        prompt: 'Create a medium Huawei Cloud architecture across 3 availability zones with VPC CIDR 10.80.0.0/16, enterprise project prod-app, WAF and DNS, Elastic Load Balance, security groups, Cloud Eye, CTS, and edge protected ingress.'
    });

    assert.equal(spec.cloudSize, 'medium');
    assert.equal(spec.ospfArea, 'prod-app');
});

test('buildArchitecture creates Huawei Cloud native stage nodes', function () {
    const spec = ArchitectureVpcHuaweiModelCore.inferFromPrompt({
        preset: 'hybrid-connectivity',
        prompt: 'Hybrid Huawei Cloud VPC with Enterprise Router, Direct Connect, VPN, Elastic Load Balance, security groups, flow logs, and 3 zones.'
    });
    const architecture = ArchitectureVpcHuaweiModelCore.buildArchitecture(spec, {});
    const nodeIds = architecture.nodes.map(function (node) {
        return node.id;
    });

    assert.ok(nodeIds.includes('vpc'));
    assert.ok(nodeIds.includes('private-app-subnets'));
    assert.ok(nodeIds.includes('data-services'));
    assert.ok(nodeIds.includes('enterprise-router'));
    assert.ok(nodeIds.includes('direct-connect-vpn'));
});

test('buildExportPayload preserves Huawei Cloud identity and native diagram keys', function () {
    const spec = ArchitectureVpcHuaweiModelCore.inferFromPrompt({
        preset: 'secure-vpc-app',
        prompt: 'Create a Huawei Cloud VPC with WAF and DNS, Enterprise Router, and Elastic Load Balance.'
    });
    const payload = ArchitectureVpcHuaweiModelCore.buildExportPayload(
        spec,
        { vpc: { x: 100, y: 120, width: 220, height: 90 } },
        [{ component: 'Huawei Cloud VPC', placement: 'Region', purpose: 'Network boundary' }],
        { summary: 'Secure VPC App', keywords: [], assumptions: [], model: [], pros: [], cons: [] }
    );

    assert.equal(payload.tool, 'architecture-vpc-huawei');
    assert.equal(payload.version, '1.0.0');
    assert.equal(payload.diagram.vpc_cidr, spec.trunkVlans);
    assert.equal(payload.diagram.availability_zones, spec.accessBlocks);
    assert.equal(payload.diagram.elastic_load_balance, true);
    assert.equal(payload.diagram.enterprise_router, true);
    assert.deepEqual(payload.layout_overrides.vpc, { x: 100, y: 120, width: 220, height: 90 });
});

test('buildImportedPayloadState rejects invalid payloads and restores valid false toggles', function () {
    const wrongTool = ArchitectureVpcHuaweiModelCore.buildImportedPayloadState({
        tool: 'wrong-tool',
        version: '1.0.0',
        diagram: {}
    });

    assert.equal(wrongTool.error, 'Invalid Huawei Cloud architecture JSON.');

    const invalidZoneCount = ArchitectureVpcHuaweiModelCore.buildImportedPayloadState({
        tool: 'architecture-vpc-huawei',
        version: '1.0.0',
        diagram: {
            preset_id: 'secure-vpc-app',
            workload_scale: 'medium',
            availability_zones: 6,
            connectivity_pattern: 'edge-protected'
        }
    });

    assert.equal(invalidZoneCount.error, 'The imported JSON contains an invalid availability zone count.');

    const restored = ArchitectureVpcHuaweiModelCore.buildImportedPayloadState({
        tool: 'architecture-vpc-huawei',
        version: '1.0.0',
        diagram: {
            preset_id: 'data-services',
            preset_label: 'Data Services',
            workload_scale: 'medium',
            availability_zones: 2,
            subnet_tiers: ['Private app subnet 10.100.10.0/24', 'Private data subnet 10.100.20.0/24'],
            cce_platform: false,
            network_security: true,
            enterprise_router: false,
            cloud_eye_cts: true,
            dew_kms_csms: true,
            connectivity_pattern: 'private-only',
            waf_dns: false,
            elastic_load_balance: false,
            flow_logs: true,
            nat_gateway: false,
            vpn_or_direct_connect: false,
            vpc_cidr: '10.100.0.0/16',
            public_subnet_cidr: '10.100.30.0/24',
            private_app_subnet_cidr: '10.100.10.0/24',
            data_subnet_cidr: '10.100.20.0/24',
            enterprise_project: 'data-app',
            edge_asn: '64540',
            dns_zone: 'private.example.com'
        },
        layout_overrides: {
            vpc: { x: 120, y: 180 }
        }
    });

    assert.equal(restored.error, undefined);
    assert.equal(restored.spec.routingMode, 'private-only');
    assert.equal(restored.spec.hsrp, false);
    assert.equal(restored.spec.etherChannel, false);
    assert.equal(restored.spec.nat, false);
    assert.deepEqual(restored.layoutOverrides.vpc, { x: 120, y: 180 });
});
