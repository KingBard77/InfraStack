const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const twig = fs.readFileSync(path.join(projectRoot, 'templates/studio/index.html.twig'), 'utf8');
const js = fs.readFileSync(path.join(projectRoot, 'assets/js/studio/index.js'), 'utf8');
const graphAdapter = fs.readFileSync(path.join(projectRoot, 'assets/js/studio/graph/maxgraph-adapter.js'), 'utf8');

test('Studio uses a canvas projection dropdown instead of permanent view buttons', function () {
    assert.match(twig, /id="studio-view-select"/);
    assert.doesNotMatch(twig, /id="studio-view-buttons"/);
    assert.match(js, /elements\.viewSelect\.addEventListener\('change'/);
    assert.doesNotMatch(js, /elements\.viewButtons/);
});

test('Studio catalogue exposes scalable native library and provider filters', function () {
    assert.match(twig, /id="studio-catalogue-library"/);
    assert.match(twig, /id="studio-catalogue-provider"/);
    assert.doesNotMatch(twig, /id="studio-catalogue-tabs"/);
    assert.match(js, /function renderCatalogueFilters\(\)/);
    assert.match(js, /activeCatalogueProvider/);
    assert.match(twig, /data-provider-config=/);
    assert.match(twig, /studio_providers\|json_encode/);
    assert.match(js, /async function loadCatalogueSource\(provider\)/);
    assert.match(js, /await loadCatalogueSource\(activeCatalogueProvider\)/);
    assert.match(js, /providerConfig\[provider\]\?\.icon_urls/);
    assert.match(js, /resolvedIconUrls/);
    assert.match(js, /activeCatalogueGroup = 'all'/);
    assert.match(js, /elements\.catalogueLibrary\.value = 'all'/);
});

test('Studio top toolbar contains only wired editor actions', function () {
    [
        'studio-palette-toggle',
        'studio-zoom-out',
        'studio-zoom-in',
        'studio-fit',
        'studio-undo',
        'studio-redo',
        'studio-duplicate',
        'studio-auto-layout',
        'studio-align-menu',
        'studio-distribute-menu',
        'studio-delete-selection',
        'studio-connect',
        'studio-review-action',
        'studio-download-json',
        'studio-import-json'
    ].forEach(function (id) {
        assert.match(twig, new RegExp(`id="${id}"`));
    });
    assert.match(js, /elements\.paletteToggle\.addEventListener\('click'/);
    assert.match(js, /elements\.deleteSelection\.addEventListener\('click'/);
    assert.match(js, /elements\.reviewAction\.addEventListener\('click'/);
    assert.match(js, /elements\.autoLayout\.addEventListener\('click', autoLayoutArchitecture\)/);
    assert.match(js, /core\.alignAssets\(project, assetIds, project\.active_view, alignment\)/);
    assert.match(js, /core\.distributeAssets\(project, assetIds, project\.active_view, axis\)/);
});

test('Studio application shell exposes wired navigation, tabs, preview, and canvas controls', function () {
    [
        'studio-preview',
        'studio-share',
        'studio-components-tab',
        'studio-templates-tab',
        'studio-properties-tab',
        'studio-style-tab',
        'studio-select-tool',
        'studio-insert-image',
        'studio-grid-visible',
        'studio-snap-enabled',
        'studio-guides-enabled',
        'studio-cursor-position'
    ].forEach(function (id) {
        assert.match(twig, new RegExp(`id="${id}"`));
    });
    assert.match(js, /function switchLibraryTab\(tab\)/);
    assert.match(js, /function switchInspectorTab\(tab\)/);
    assert.match(js, /async function shareProject\(\)/);
    assert.match(js, /graphAdapter\.setSnapEnabled\(snapEnabled\)/);
    assert.match(js, /graphAdapter\.setGuidesEnabled\(guidesEnabled\)/);
    assert.match(graphAdapter, /setSnapEnabled\(enabled\)/);
    assert.match(graphAdapter, /setGuidesEnabled\(enabled\)/);
});

test('Studio exposes provider templates and infrastructure-aware inspector fields', function () {
    [
        'studio-template-list',
        'studio-context-fields',
        'studio-field-connection-direction',
        'studio-field-connection-protocol',
        'studio-field-connection-bandwidth'
    ].forEach(function (id) {
        assert.match(twig, new RegExp(`id="${id}"`));
    });
    assert.match(twig, /js\/studio\/providers\/registry\.js/);
    assert.match(twig, /js\/studio\/providers\/aws\/templates\.js/);
    assert.match(js, /function renderTemplates\(\)/);
    assert.match(js, /function renderContextualFields\(asset\)/);
    assert.match(js, /elements\.assetForm\.addEventListener\('change'/);
    assert.match(js, /elements\.connectionForm\.addEventListener\('change'/);
});

test('Studio graph uses validated nested drop targets and recursive snapshots', function () {
    assert.match(graphAdapter, /setSwimlaneNesting\(true\)/);
    assert.match(graphAdapter, /isValidDropTarget = .*isValidAssetDropTarget/);
    assert.match(graphAdapter, /this\.callbacks\.canReparent/);
    assert.match(graphAdapter, /resolveMovedParents\(snapshot, changedCells\)/);
    assert.match(graphAdapter, /iconUrls\[asset\.catalog_id\]/);
    assert.match(graphAdapter, /row\.parent_id = candidates\.length > 0/);
    assert.match(graphAdapter, /for \(let index = 0; index < cell\.getChildCount\(\); index \+= 1\)/);
    assert.match(js, /core\.validateAssetParent\(project, assetId, parentId\)/);
});

test('architecture findings expose category scores, recommendations, and multi-asset focus', function () {
    assert.match(twig, /id="studio-category-scores"/);
    assert.match(twig, /id="studio-restore-dismissed"/);
    assert.match(twig, /review\/improvements\.js/);
    assert.match(js, /result\.category_scores/);
    assert.match(js, /Recommended improvement/);
    assert.match(js, /focusAssets\(item\.asset_ids\)/);
    assert.match(js, /graphAdapter\.selectAssets\(visibleIds\)/);
    assert.match(js, /Apply improvement/);
    assert.match(js, /Confirm apply/);
    assert.doesNotMatch(js, /window\.confirm/);
    assert.match(js, /Dismiss risk/);
    assert.match(js, /improvements\.previewPlan/);
    assert.match(js, /improvements\.applyPlan/);
    assert.match(js, /accepted_risks/);
});
