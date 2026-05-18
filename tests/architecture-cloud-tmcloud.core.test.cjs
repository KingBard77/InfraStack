const test = require('node:test');
const assert = require('node:assert/strict');
const ArchitectureCloudTmcloudModelCore = require('../templates/content/tools/tmcloud/architecture-cloud-tmcloud/assets/bin/model-core.js');

test('inferFromPrompt extracts hybrid connectivity, zones, VPC CIDR, environment group, and ASN', function () {
    const spec = ArchitectureCloudTmcloudModelCore.inferFromPrompt({
        preset: 'hybrid-connectivity',
        prompt: 'Generate a hybrid TM Cloud Alpha architecture across 3 availability zones with VPC CIDR 10.110.0.0/16. Use Secure Digital Connectivity, Private Connect or VPN, edge ASN 64550, environment group hybrid-env, Monitoring, Logs, and VPC flow logs.'
    });

    assert.equal(spec.routingMode, 'hybrid');
    assert.equal(spec.accessBlocks, 3);
    assert.equal(spec.trunkVlans, '10.110.0.0/16');
    assert.equal(spec.wan, true);
    assert.equal(spec.vpn, true);
    assert.equal(spec.monitoring, true);
    assert.equal(spec.acl, true);
    assert.equal(spec.ospfArea, 'hybrid-env');
    assert.equal(spec.bgpAsn, '64550');
});

test('inferFromPrompt supports private-only data services without egress gateway', function () {
    const spec = ArchitectureCloudTmcloudModelCore.inferFromPrompt({
        preset: 'data-services',
        prompt: 'Design a private-only TM Cloud Alpha data services VPC across 2 zones with VPC CIDR 10.100.0.0/16, service endpoint subnet 10.100.30.0/24, Object Storage, Identity controls, key controls, Monitoring, flow logs, and no egress gateway.'
    });

    assert.equal(spec.routingMode, 'private-only');
    assert.equal(spec.accessBlocks, 2);
    assert.equal(spec.trunkVlans, '10.100.0.0/16');
    assert.equal(spec.nat, false);
    assert.equal(spec.dhcpDns, true);
    assert.equal(spec.monitoring, true);
});

test('buildArchitecture creates TM Cloud Alpha native stage nodes', function () {
    const spec = ArchitectureCloudTmcloudModelCore.inferFromPrompt({
        preset: 'hybrid-connectivity',
        prompt: 'Hybrid TM Cloud Alpha VPC with Secure Digital Connectivity, Private Connect, VPN, Load Balancer, security groups, flow logs, and 3 zones.'
    });
    const architecture = ArchitectureCloudTmcloudModelCore.buildArchitecture(spec, {});
    const nodeIds = architecture.nodes.map(function (node) {
        return node.id;
    });

    assert.ok(nodeIds.includes('vpc'));
    assert.ok(nodeIds.includes('private-app-subnets'));
    assert.ok(nodeIds.includes('data-services'));
    assert.ok(nodeIds.includes('secure-digital-connectivity'));
    assert.ok(nodeIds.includes('private-connect-vpn'));
});

test('buildExportPayload preserves TM Cloud Alpha identity and native diagram keys', function () {
    const spec = ArchitectureCloudTmcloudModelCore.inferFromPrompt({
        preset: 'secure-vpc-app',
        prompt: 'Create a TM Cloud Alpha VPC with Cloud Alpha Edge and Load Balancer.'
    });
    const payload = ArchitectureCloudTmcloudModelCore.buildExportPayload(
        spec,
        { vpc: { x: 100, y: 120, width: 220, height: 90 } },
        [{ component: 'TM Cloud Alpha VPC', placement: 'Region', purpose: 'Network boundary' }],
        { summary: 'Secure VPC App', keywords: [], assumptions: [], model: [], pros: [], cons: [] }
    );

    assert.equal(payload.tool, 'architecture-cloud-tmcloud');
    assert.equal(payload.version, '1.0.0');
    assert.equal(payload.diagram.vpc_cidr, spec.trunkVlans);
    assert.equal(payload.diagram.availability_zones, spec.accessBlocks);
    assert.equal(payload.diagram.load_balancer, true);
    assert.equal(payload.diagram.cloud_alpha_edge, true);
    assert.equal(Object.prototype.hasOwnProperty.call(payload.diagram, 'cloud_internet_services'), false);
    assert.deepEqual(payload.layout_overrides.vpc, { x: 100, y: 120, width: 220, height: 90 });
});

test('buildImportedPayloadState rejects invalid payloads and restores valid false toggles', function () {
    const wrongTool = ArchitectureCloudTmcloudModelCore.buildImportedPayloadState({
        tool: 'wrong-tool',
        version: '1.0.0',
        diagram: {}
    });

    assert.equal(wrongTool.error, 'Invalid TM Cloud Alpha architecture JSON.');

    const invalidZoneCount = ArchitectureCloudTmcloudModelCore.buildImportedPayloadState({
        tool: 'architecture-cloud-tmcloud',
        version: '1.0.0',
        diagram: {
            preset_id: 'secure-vpc-app',
            workload_scale: 'medium',
            availability_zones: 6,
            connectivity_pattern: 'edge-protected'
        }
    });

    assert.equal(invalidZoneCount.error, 'The imported JSON contains an invalid availability zone count.');

    const restored = ArchitectureCloudTmcloudModelCore.buildImportedPayloadState({
        tool: 'architecture-cloud-tmcloud',
        version: '1.0.0',
        diagram: {
            preset_id: 'data-services',
            preset_label: 'Data Services',
            workload_scale: 'medium',
            availability_zones: 2,
            subnet_tiers: ['Private app subnet 10.100.10.0/24', 'Private data subnet 10.100.20.0/24'],
            kubernetes_platform: false,
            network_security: true,
            secure_digital_connectivity: false,
            monitoring_logs: true,
            identity_key_controls: true,
            connectivity_pattern: 'private-only',
            cloud_alpha_edge: false,
            load_balancer: false,
            flow_logs: true,
            egress_gateway: false,
            private_connect_or_vpn: false,
            vpc_cidr: '10.100.0.0/16',
            public_subnet_cidr: '10.100.30.0/24',
            private_app_subnet_cidr: '10.100.10.0/24',
            data_subnet_cidr: '10.100.20.0/24',
            environment_group: 'data-env',
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
