const test = require('node:test');
const assert = require('node:assert/strict');
const AzureCore = require('../templates/content/tools/azure/calculate-cost-azure/assets/bin/model-core.js');
const IbmCore = require('../templates/content/tools/ibm/calculate-cost-ibm/assets/bin/model-core.js');
const GcpCore = require('../templates/content/tools/gcp/calculate-cost-gcp/assets/bin/model-core.js');
const CiscoCore = require('../templates/content/tools/cisco/calculate-cost-cisco/assets/bin/model-core.js');

test('Azure estimate builds visible line items and totals from normalized state', function () {
    const state = AzureCore.buildPresetState('balanced-web');
    const estimate = AzureCore.buildEstimate(state);

    assert.equal(estimate.tool, 'calculate-cost-azure');
    assert.equal(estimate.version, '1.0.0');
    assert.ok(estimate.totals.monthlyTotal > 0);
    assert.ok(estimate.lineItems.some(function (line) {
        return line.item.includes('Azure Virtual Machines');
    }));
    assert.ok(estimate.assumptionRows.some(function (row) {
        return row[0] === 'Support uplift';
    }));
});

test('Azure export and restore preserve state identity', function () {
    const state = AzureCore.buildPresetState('data-platform');
    state.assumptions.manualAdjustment = 125;

    const payload = AzureCore.buildExportPayload(state);
    const restored = AzureCore.buildImportedPayloadState(payload);

    assert.equal(payload.tool, 'calculate-cost-azure');
    assert.equal(payload.provider, 'Azure');
    assert.equal(restored.error, undefined);
    assert.equal(restored.state.preset, 'data-platform');
    assert.equal(restored.state.assumptions.manualAdjustment, 125);
    assert.ok(restored.estimate.totals.monthlyTotal > 0);
});

test('Azure restore rejects payloads for other tools', function () {
    const restored = AzureCore.buildImportedPayloadState({
        tool: 'calculate-cost-ibm',
        state: {}
    });

    assert.equal(restored.error, 'Invalid Azure cost calculator JSON.');
});

test('IBM Cloud estimate builds visible line items and totals from normalized state', function () {
    const state = IbmCore.buildPresetState('vpc-app');
    const estimate = IbmCore.buildEstimate(state);

    assert.equal(estimate.tool, 'calculate-cost-ibm');
    assert.equal(estimate.version, '1.0.0');
    assert.ok(estimate.totals.monthlyTotal > 0);
    assert.ok(estimate.lineItems.some(function (line) {
        return line.item.includes('IBM Cloud Virtual Server');
    }));
    assert.ok(estimate.assumptionRows.some(function (row) {
        return row[0] === 'Support uplift';
    }));
});

test('IBM Cloud export and restore preserve state identity', function () {
    const state = IbmCore.buildPresetState('data-services');
    state.assumptions.commitmentDiscountPct = 20;

    const payload = IbmCore.buildExportPayload(state);
    const restored = IbmCore.buildImportedPayloadState(payload);

    assert.equal(payload.tool, 'calculate-cost-ibm');
    assert.equal(payload.provider, 'IBM Cloud');
    assert.equal(restored.error, undefined);
    assert.equal(restored.state.preset, 'data-services');
    assert.equal(restored.state.assumptions.commitmentDiscountPct, 20);
    assert.ok(restored.estimate.totals.monthlyTotal > 0);
});

test('IBM Cloud restore rejects payloads for other tools', function () {
    const restored = IbmCore.buildImportedPayloadState({
        tool: 'calculate-cost-azure',
        state: {}
    });

    assert.equal(restored.error, 'Invalid IBM Cloud cost calculator JSON.');
});

test('GCP estimate builds visible line items and totals from normalized state', function () {
    const state = GcpCore.buildPresetState('balanced-web');
    const estimate = GcpCore.buildEstimate(state);

    assert.equal(estimate.tool, 'calculate-cost-gcp');
    assert.equal(estimate.version, '1.0.0');
    assert.ok(estimate.totals.monthlyTotal > 0);
    assert.ok(estimate.lineItems.some(function (line) {
        return line.item.includes('Google Cloud Compute Engine');
    }));
    assert.ok(estimate.assumptionRows.some(function (row) {
        return row[0] === 'Support uplift';
    }));
});

test('GCP export and restore preserve state identity', function () {
    const state = GcpCore.buildPresetState('data-platform');
    state.assumptions.manualAdjustment = 88;

    const payload = GcpCore.buildExportPayload(state);
    const restored = GcpCore.buildImportedPayloadState(payload);

    assert.equal(payload.tool, 'calculate-cost-gcp');
    assert.equal(payload.provider, 'Google Cloud');
    assert.equal(restored.error, undefined);
    assert.equal(restored.state.preset, 'data-platform');
    assert.equal(restored.state.assumptions.manualAdjustment, 88);
    assert.ok(restored.estimate.totals.monthlyTotal > 0);
});

test('GCP restore rejects payloads for other tools', function () {
    const restored = GcpCore.buildImportedPayloadState({
        tool: 'calculate-cost-azure',
        state: {}
    });

    assert.equal(restored.error, 'Invalid GCP cost calculator JSON.');
});

test('Cisco estimate builds visible line items and totals from normalized state', function () {
    const state = CiscoCore.buildPresetState('balanced-web');
    const estimate = CiscoCore.buildEstimate(state);

    assert.equal(estimate.tool, 'calculate-cost-cisco');
    assert.equal(estimate.version, '1.0.0');
    assert.ok(estimate.totals.monthlyTotal > 0);
    assert.ok(estimate.lineItems.some(function (line) {
        return line.item.includes('Cisco Switching hardware');
    }));
    assert.ok(estimate.assumptionRows.some(function (row) {
        return row[0] === 'Support uplift';
    }));
});

test('Cisco export and restore preserve state identity', function () {
    const state = CiscoCore.buildPresetState('data-platform');
    state.assumptions.manualAdjustment = 144;

    const payload = CiscoCore.buildExportPayload(state);
    const restored = CiscoCore.buildImportedPayloadState(payload);

    assert.equal(payload.tool, 'calculate-cost-cisco');
    assert.equal(payload.provider, 'Cisco');
    assert.equal(restored.error, undefined);
    assert.equal(restored.state.preset, 'data-platform');
    assert.equal(restored.state.assumptions.manualAdjustment, 144);
    assert.ok(restored.estimate.totals.monthlyTotal > 0);
});

test('Cisco restore rejects payloads for other tools', function () {
    const restored = CiscoCore.buildImportedPayloadState({
        tool: 'calculate-cost-gcp',
        state: {}
    });

    assert.equal(restored.error, 'Invalid Cisco network cost calculator JSON.');
});
