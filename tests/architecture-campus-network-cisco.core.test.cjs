const test = require('node:test');
const assert = require('node:assert/strict');
const ArchitectureCampusNetworkCiscoModelCore = require('../templates/content/tools/cisco/architecture-campus-network-cisco/assets/bin/model-core.js');

test('inferFromPrompt extracts large campus, access count, routing, and services', function () {
    const result = ArchitectureCampusNetworkCiscoModelCore.inferFromPrompt({
        preset: 'enterprise-campus',
        presetLabel: 'Enterprise Campus',
        campusSize: 'medium',
        accessBlocks: 3,
        vlans: ['VLAN 10 Staff', 'VLAN 20 Voice', 'VLAN 30 Guest'],
        wireless: false,
        firewall: false,
        wan: false,
        monitoring: false,
        dhcpDns: false,
        routingMode: 'ospf',
        hsrp: false,
        etherChannel: false,
        prompt: 'Large Cisco campus with four access blocks, wireless, firewall, WAN edge, monitoring, DHCP, DNS, EIGRP, HSRP, and EtherChannel.'
    });

    assert.equal(result.campusSize, 'large');
    assert.equal(result.accessBlocks, 4);
    assert.equal(result.wireless, true);
    assert.equal(result.firewall, true);
    assert.equal(result.wan, true);
    assert.equal(result.monitoring, true);
    assert.equal(result.dhcpDns, true);
    assert.equal(result.routingMode, 'eigrp');
    assert.equal(result.hsrp, true);
    assert.equal(result.etherChannel, true);
});

test('buildTopology returns local icon keys and stable Cisco campus connectors', function () {
    const topology = ArchitectureCampusNetworkCiscoModelCore.buildTopology({
        campusSize: 'medium',
        accessBlocks: 3,
        vlans: ['VLAN 10 Staff', 'VLAN 20 Voice', 'VLAN 40 Servers'],
        wireless: true,
        firewall: true,
        wan: true,
        monitoring: true,
        dhcpDns: true,
        routingMode: 'ospf',
        hsrp: true,
        etherChannel: true
    }, {});

    const core = topology.nodes.find(function (node) {
        return node.id === 'core';
    });
    const accessOne = topology.nodes.find(function (node) {
        return node.id === 'access-1';
    });

    assert.equal(core.icon, 'coreSwitch');
    assert.equal(accessOne.icon, 'accessSwitch');
    assert.equal(topology.nodes.some(function (node) {
        return node.icon === 'wirelessController';
    }), true);
    assert.equal(topology.connectors.some(function (connector) {
        return connector.from === 'core' && connector.to === 'distribution-1' && connector.label === 'OSPF';
    }), true);
});

test('buildExportPayload preserves Cisco tool identity and restorable layout overrides', function () {
    const spec = {
        preset: 'enterprise-campus',
        presetLabel: 'Enterprise Campus',
        campusSize: 'medium',
        accessBlocks: 3,
        vlans: ['VLAN 10 Staff', 'VLAN 20 Voice'],
        wireless: true,
        firewall: true,
        wan: true,
        monitoring: true,
        dhcpDns: true,
        routingMode: 'ospf',
        hsrp: true,
        etherChannel: true,
        prompt: 'Create a Cisco campus network.'
    };
    const payload = ArchitectureCampusNetworkCiscoModelCore.buildExportPayload(spec, {
        core: {
            x: 520,
            y: 210,
            width: 190,
            height: 78
        }
    }, [
        {
            id: 'core',
            component: 'Core Switch Pair',
            placement: 'Core',
            purpose: 'Layer 3 campus routing'
        }
    ], {
        assumptions: ['Enterprise Campus preset applied.'],
        model: ['OSPF routing']
    });
    const restored = ArchitectureCampusNetworkCiscoModelCore.buildImportedPayloadState(payload);

    assert.equal(payload.tool, 'architecture-campus-network-cisco');
    assert.equal(payload.version, '1.0.0');
    assert.equal(payload.diagram.routing_mode, 'ospf');
    assert.equal(payload.diagram.dhcp_dns, true);
    assert.equal(payload.inventory.length, 1);
    assert.deepEqual(payload.prompt_notes.assumptions, ['Enterprise Campus preset applied.']);
    assert.equal(restored.error, undefined);
    assert.equal(restored.spec.routingMode, 'ospf');
    assert.deepEqual(restored.layoutOverrides.core, {
        x: 520,
        y: 210,
        width: 190,
        height: 78
    });
});

test('buildImportedPayloadState keeps compatibility with legacy Cisco exports', function () {
    const restored = ArchitectureCampusNetworkCiscoModelCore.buildImportedPayloadState({
        tool: 'cisco-campus-network-topology',
        version: 1,
        schemaVersion: '1.0.0',
        spec: {
            preset: 'branch-campus',
            presetLabel: 'Branch Campus',
            campusSize: 'small',
            accessBlocks: 2,
            vlans: ['VLAN 10 Users'],
            wireless: false,
            firewall: true,
            wan: true,
            monitoring: false,
            dhcpDns: true,
            routingMode: 'static',
            hsrp: false,
            etherChannel: true,
            prompt: 'Build a branch Cisco campus.'
        },
        layoutOverrides: {
            core: {
                x: 500,
                y: 220
            }
        }
    });

    assert.equal(restored.error, undefined);
    assert.equal(restored.spec.preset, 'branch-campus');
    assert.equal(restored.spec.routingMode, 'static');
    assert.equal(restored.spec.dhcpDns, true);
    assert.deepEqual(restored.layoutOverrides.core, {
        x: 500,
        y: 220
    });
});

test('buildImportedPayloadState rejects wrong tool exports', function () {
    const restored = ArchitectureCampusNetworkCiscoModelCore.buildImportedPayloadState({
        tool: 'wrong-tool',
        spec: {}
    });

    assert.equal(restored.error, 'Invalid Cisco campus topology JSON.');
});

test('buildImportedPayloadState rejects unsupported workspace versions', function () {
    const restored = ArchitectureCampusNetworkCiscoModelCore.buildImportedPayloadState({
        tool: 'architecture-campus-network-cisco',
        version: '2.0.0',
        diagram: {
            preset_id: 'enterprise-campus'
        }
    });

    assert.equal(restored.error, 'The imported JSON uses an unsupported workspace version.');
});

test('buildImportedPayloadState normalizes string booleans and rejects malformed toggles', function () {
    const restored = ArchitectureCampusNetworkCiscoModelCore.buildImportedPayloadState({
        tool: 'architecture-campus-network-cisco',
        version: '1.0.0',
        diagram: {
            preset_id: 'enterprise-campus',
            access_blocks: 3,
            campus_size: 'medium',
            routing_mode: 'ospf',
            wireless: 'false',
            firewall: 'true',
            wan: false,
            monitoring: true,
            dhcp_dns: 'false',
            hsrp: true,
            ether_channel: 'false'
        }
    });

    const rejected = ArchitectureCampusNetworkCiscoModelCore.buildImportedPayloadState({
        tool: 'architecture-campus-network-cisco',
        version: '1.0.0',
        diagram: {
            preset_id: 'enterprise-campus',
            access_blocks: 3,
            campus_size: 'medium',
            routing_mode: 'ospf',
            wireless: 'sometimes'
        }
    });

    assert.equal(restored.error, undefined);
    assert.equal(restored.spec.wireless, false);
    assert.equal(restored.spec.firewall, true);
    assert.equal(restored.spec.dhcpDns, false);
    assert.equal(restored.spec.etherChannel, false);
    assert.equal(rejected.error, 'The imported JSON contains invalid Cisco service toggle values.');
});

test('buildImportedPayloadState rejects unsupported campus options', function () {
    const restored = ArchitectureCampusNetworkCiscoModelCore.buildImportedPayloadState({
        tool: 'architecture-campus-network-cisco',
        version: '1.0.0',
        diagram: {
            preset_id: 'enterprise-campus',
            access_blocks: 9,
            campus_size: 'medium',
            routing_mode: 'ospf'
        }
    });

    assert.equal(restored.error, 'The imported JSON contains an invalid access block count.');
});
