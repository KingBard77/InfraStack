const test = require('node:test');
const assert = require('node:assert/strict');
const ArchitectureCloudIbmModelCore = require('../templates/content/tools/ibm/architecture-cloud-ibm/assets/bin/model-core.js');

test('inferFromPrompt extracts hybrid connectivity, zones, VPC CIDR, resource group, and ASN', function () {
    const spec = ArchitectureCloudIbmModelCore.inferFromPrompt({
        preset: 'hybrid-connectivity',
        prompt: 'Generate a hybrid IBM Cloud architecture across 3 availability zones with VPC CIDR 10.110.0.0/16. Use Transit Gateway, Direct Link or VPN, edge ASN 64550, resource group hybrid-rg, Monitoring, Logs, and VPC flow logs.'
    });

    assert.equal(spec.routingMode, 'hybrid');
    assert.equal(spec.accessBlocks, 3);
    assert.equal(spec.trunkVlans, '10.110.0.0/16');
    assert.equal(spec.wan, true);
    assert.equal(spec.vpn, true);
    assert.equal(spec.monitoring, true);
    assert.equal(spec.acl, true);
    assert.equal(spec.ospfArea, 'hybrid-rg');
    assert.equal(spec.bgpAsn, '64550');
});

test('inferFromPrompt supports private-only data services without public gateway', function () {
    const spec = ArchitectureCloudIbmModelCore.inferFromPrompt({
        preset: 'data-services',
        prompt: 'Design a private-only IBM Cloud data services VPC across 2 zones with VPC CIDR 10.100.0.0/16, service endpoint subnet 10.100.30.0/24, Object Storage, Secrets Manager, Key Protect, Monitoring, flow logs, and no public gateway.'
    });

    assert.equal(spec.routingMode, 'private-only');
    assert.equal(spec.accessBlocks, 2);
    assert.equal(spec.trunkVlans, '10.100.0.0/16');
    assert.equal(spec.nat, false);
    assert.equal(spec.dhcpDns, true);
    assert.equal(spec.monitoring, true);
});

test('buildArchitecture creates IBM Cloud native stage nodes', function () {
    const spec = ArchitectureCloudIbmModelCore.inferFromPrompt({
        preset: 'hybrid-connectivity',
        prompt: 'Hybrid IBM Cloud VPC with Transit Gateway, Direct Link, VPN, Load Balancer, security groups, flow logs, and 3 zones.'
    });
    const architecture = ArchitectureCloudIbmModelCore.buildArchitecture(spec, {});
    const nodeIds = architecture.nodes.map(function (node) {
        return node.id;
    });

    assert.ok(nodeIds.includes('vpc'));
    assert.ok(nodeIds.includes('private-app-subnets'));
    assert.ok(nodeIds.includes('data-services'));
    assert.ok(nodeIds.includes('transit-gateway'));
    assert.ok(nodeIds.includes('direct-link-vpn'));
});

test('buildExportPayload preserves IBM Cloud identity and native diagram keys', function () {
    const spec = ArchitectureCloudIbmModelCore.inferFromPrompt({
        preset: 'secure-vpc-app',
        prompt: 'Create an IBM Cloud VPC with Cloud Internet Services and Load Balancer.'
    });
    const payload = ArchitectureCloudIbmModelCore.buildExportPayload(
        spec,
        { vpc: { x: 100, y: 120, width: 220, height: 90 } },
        [{ component: 'IBM Cloud VPC', placement: 'Region', purpose: 'Network boundary' }],
        { summary: 'Secure VPC App', keywords: [], assumptions: [], model: [], pros: [], cons: [] }
    );

    assert.equal(payload.tool, 'architecture-cloud-ibm');
    assert.equal(payload.version, '1.0.0');
    assert.equal(payload.diagram.vpc_cidr, spec.trunkVlans);
    assert.equal(payload.diagram.availability_zones, spec.accessBlocks);
    assert.equal(payload.diagram.load_balancer, true);
    assert.deepEqual(payload.layout_overrides.vpc, { x: 100, y: 120, width: 220, height: 90 });
});

test('buildImportedPayloadState rejects invalid payloads and restores valid false toggles', function () {
    const wrongTool = ArchitectureCloudIbmModelCore.buildImportedPayloadState({
        tool: 'wrong-tool',
        version: '1.0.0',
        diagram: {}
    });

    assert.equal(wrongTool.error, 'Invalid IBM Cloud architecture JSON.');

    const invalidZoneCount = ArchitectureCloudIbmModelCore.buildImportedPayloadState({
        tool: 'architecture-cloud-ibm',
        version: '1.0.0',
        diagram: {
            preset_id: 'secure-vpc-app',
            workload_scale: 'medium',
            availability_zones: 6,
            connectivity_pattern: 'edge-protected'
        }
    });

    assert.equal(invalidZoneCount.error, 'The imported JSON contains an invalid availability zone count.');

    const restored = ArchitectureCloudIbmModelCore.buildImportedPayloadState({
        tool: 'architecture-cloud-ibm',
        version: '1.0.0',
        diagram: {
            preset_id: 'data-services',
            preset_label: 'Data Services',
            workload_scale: 'medium',
            availability_zones: 2,
            subnet_tiers: ['Private app subnet 10.100.10.0/24', 'Private data subnet 10.100.20.0/24'],
            kubernetes_platform: false,
            network_security: true,
            transit_gateway: false,
            monitoring_logs: true,
            secrets_manager_key_protect: true,
            connectivity_pattern: 'private-only',
            cloud_internet_services: false,
            load_balancer: false,
            flow_logs: true,
            public_gateway: false,
            vpn_or_direct_link: false,
            vpc_cidr: '10.100.0.0/16',
            public_subnet_cidr: '10.100.30.0/24',
            private_app_subnet_cidr: '10.100.10.0/24',
            data_subnet_cidr: '10.100.20.0/24',
            resource_group: 'data-rg',
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
