const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const twig = fs.readFileSync(path.join(projectRoot, 'templates/studio/index.html.twig'), 'utf8');
const js = fs.readFileSync(path.join(projectRoot, 'assets/js/studio/studio.js'), 'utf8');
const publisher = fs.readFileSync(path.join(projectRoot, 'assets/js/studio/publish/share-publish.js'), 'utf8');
const graphAdapter = fs.readFileSync(path.join(projectRoot, 'assets/js/studio/library/studio-maxgraph.js'), 'utf8');
const chartAdapter = fs.readFileSync(path.join(projectRoot, 'assets/js/studio/library/studio-chart.js'), 'utf8');
const contentModule = fs.readFileSync(path.join(projectRoot, 'assets/js/studio/content.js'), 'utf8');
const contentCss = fs.readFileSync(path.join(projectRoot, 'assets/styles/studio/content.css'), 'utf8');
const studioCss = fs.readFileSync(path.join(projectRoot, 'assets/styles/studio/studio.css'), 'utf8');
const advertisementTwig = fs.readFileSync(path.join(projectRoot, 'templates/layout/advertisement.html.twig'), 'utf8');
const studioController = fs.readFileSync(path.join(projectRoot, 'src/Controller/Studio/StudioController.php'), 'utf8');
const studioLibraryService = fs.readFileSync(path.join(projectRoot, 'src/Service/Studio/StudioLibraryService.php'), 'utf8');

test('Studio uses a canvas projection dropdown instead of permanent view buttons', function () {
    assert.match(twig, /id="studio-view-select"/);
    assert.doesNotMatch(twig, /id="studio-view-buttons"/);
    assert.match(js, /elements\.viewSelect\.addEventListener\('change'/);
    assert.match(js, /function availableProjectViews\(\)/);
    assert.match(js, /projectViewSnapshot\(view\) !== overviewSnapshot/);
    assert.match(js, /hybrid\|on\[- \]\?prem\|data \?center\|physical/);
    assert.match(js, /connection\.type === 'replication'/);
    assert.match(js, /function renderViewOptions\(\)/);
    assert.doesNotMatch(js, /elements\.viewButtons/);
});

test('Studio catalogue exposes scalable native library and provider filters', function () {
    assert.match(twig, /id="studio-catalogue-library"/);
    assert.match(twig, /id="studio-catalogue-provider"/);
    assert.doesNotMatch(twig, /id="studio-catalogue-tabs"/);
    assert.match(js, /function renderCatalogueFilters\(\)/);
    assert.match(js, /activeCatalogueProvider/);
    assert.match(twig, /data-library-config=/);
    assert.match(twig, /studio_libraries\|json_encode/);
    assert.match(js, /async function loadCatalogueSource\(libraryId\)/);
    assert.match(js, /loadCatalogueSource\(source\.id\)/);
    assert.match(js, /async function loadProviderCatalogues\(provider\)/);
    assert.match(js, /async function loadProviderPackages\(provider\)/);
    assert.match(js, /async function loadProviderResources\(provider\)/);
    assert.match(js, /packageLoader\?\.loadProvider\(candidate\)/);
    assert.match(js, /await loadProviderCatalogues\(activeCatalogueProvider\)/);
    assert.match(js, /await loadProviderPackages\(activeTemplateProvider\)/);
    assert.match(js, /normalized\.icon_url = definition\.icon_url \|\| null/);
    assert.match(js, /resolvedIconUrls/);
    assert.match(js, /activeCatalogueLibrary = 'all'/);
    assert.match(js, /elements\.catalogueLibrary\.value = activeCatalogueLibrary/);
    assert.match(js, /let activeCatalogueProvider = ''/);
    assert.match(js, /let activeCatalogueLibrary = ''/);
    assert.match(js, /: \['generic', provider\]/);
    assert.match(js, /source\.loadPromise/);
    assert.match(js, /let activeLibraryTab = 'components'/);
    assert.match(js, /new Option\('Choose library', ''\)/);
    assert.match(js, /new Option\('Choose provider', ''\)/);
    assert.doesNotMatch(js, /loadCatalog\(\)/);
    assert.match(js, /icon\.loading = 'lazy'/);
    assert.match(js, /icon\.decoding = 'async'/);
    assert.doesNotMatch(js, /Promise\.all\(Object\.keys\(catalogueSources\)\.map\(loadCatalogueSource\)\)/);
    assert.match(studioController, /\/api\/studio\/libraries\/\{libraryId\}\/\{version\}/);
    assert.match(studioController, /->setImmutable\(\)/);
    assert.match(studioLibraryService, /public function catalogue\(string \$libraryId/);
    assert.doesNotMatch(studioLibraryService, /'icon_urls' =>/);
});

test('Studio starts with a blank session and keeps restore explicit', function () {
    assert.match(js, /let project = core\.createEmptyProject\(\)/);
    assert.doesNotMatch(js, /function loadLocalProject\(\)/);
    assert.doesNotMatch(js, /localStorage\.setItem\(storageKey/);
    assert.match(twig, /Blank project ready/);
    assert.match(twig, /id="studio-template-restore"/);
    assert.match(twig, /id="studio-components-tab" class="is-active"/);
    assert.match(twig, /id="studio-catalogue-browser">/);
    assert.match(twig, /id="studio-upload-custom-icon"/);
    assert.match(twig, /id="studio-content-sections" class="studio-content-rail-layout">/);
    assert.match(js, /function hasProjectData\(candidate\)/);
    assert.doesNotMatch(js, /elements\.contentSections\.hidden/);
    assert.match(studioCss, /\.infrastack-studio \{[^}]*overflow: clip/);
    assert.match(js, /if \(activeCatalogueProvider\) \{\s*await loadProviderCatalogues\(activeCatalogueProvider\)/);
});

test('Studio saves meaningful work for explicit previous-session recovery', function () {
    [
        'studio-recovery-card',
        'studio-recovery-name',
        'studio-recovery-meta',
        'studio-recover-session',
        'studio-discard-recovery'
    ].forEach(function (id) {
        assert.match(twig, new RegExp(`id="${id}"`));
    });
    assert.match(js, /recoveryStorageKey = 'infrastack-studio-recovery-v0\.2'/);
    assert.match(js, /function hasRecoverableProject\(candidate\)/);
    assert.match(js, /const recovery = \{ schema_version: '1\.0', saved_at: project\.updated_at, project: payload \}/);
    assert.match(js, /localStorage\.setItem\(recoveryStorageKey, JSON\.stringify\(recovery\)\)/);
    assert.match(js, /storedRecovery\.saved_at \|\| candidate\.updated_at/);
    assert.match(js, /const payload = core\.buildExportPayload\(project\)/);
    assert.match(js, /function recoverPreviousSession\(\)/);
    assert.match(js, /await loadProviderResources\(provider\)/);
    assert.match(js, /window\.confirm\(`Discard the saved recovery/);
    assert.match(js, /elements\.recoverSession\.addEventListener\('click', recoverPreviousSession\)/);
    assert.match(js, /elements\.discardRecovery\.addEventListener\('click', discardRecoveryProject\)/);
    assert.match(twig, /id="studio-history-panel"/);
    assert.ok(twig.indexOf('id="studio-history-panel"') < twig.indexOf('id="studio-recovery-card"'));
    assert.match(js, /elements\.railHistory\.addEventListener\('click', function \(\) \{ switchLibraryTab\('history'\); \}\)/);
    assert.match(js, /function renderHistoryPanel\(\)/);
    assert.match(js, /function restoreHistoryIndex\(index\)/);
    assert.match(js, /snapshot: JSON\.stringify\(candidate\)/);
    assert.match(studioCss, /\.studio-history-list/);
    assert.match(studioCss, /\.studio-recovery-card\[hidden\] \{ display: none; \}/);
    assert.match(studioCss, /\.studio-recovery-actions/);
});

test('Studio top toolbar contains only wired editor actions', function () {
    [
        'studio-palette-toggle',
        'studio-inspector-toggle',
        'studio-palette-collapse',
        'studio-inspector-collapse',
        'studio-palette-resizer',
        'studio-inspector-resizer',
        'studio-reset-layout',
        'studio-shortcuts-button',
        'studio-shortcuts-dialog',
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
    assert.match(js, /elements\.inspectorToggle\.addEventListener\('click'/);
    assert.match(js, /elements\.paletteCollapse\.addEventListener\('click', togglePalettePanel\)/);
    assert.match(js, /elements\.inspectorCollapse\.addEventListener\('click', toggleInspectorPanel\)/);
    assert.match(js, /elements\.paletteToggle\.hidden = !paletteCollapsed/);
    assert.match(js, /elements\.inspectorToggle\.hidden = !inspectorCollapsed/);
    assert.match(studioCss, /\.studio-project-switcher > :not\(i\):not\(input\)/);
    assert.match(studioCss, /\.studio-panel-collapse/);
    assert.match(studioCss, /\.studio-panel-expand/);
    assert.match(js, /startPanelResize\(event, 'palette'\)/);
    assert.match(js, /startPanelResize\(event, 'inspector'\)/);
    assert.match(js, /layoutStorageKey = 'infrastack-studio-layout-v0\.1'/);
    assert.match(js, /elements\.resetLayout\.addEventListener\('click'/);
    assert.match(js, /elements\.shortcutsDialog\.showModal\(\)/);
    assert.match(js, /graphAdapter\.selectAllVisible\(\)/);
    assert.match(js, /graphAdapter\.clearSelection\(\)/);
    assert.match(js, /graphAdapter\.zoomAt\(event\.deltaY/);
    assert.match(js, /setSpacePanning\(true\)/);
    assert.match(graphAdapter, /RubberBandHandler/);
    assert.match(graphAdapter, /zoomAt\(factor, clientX, clientY\)/);
    assert.match(graphAdapter, /selectAllVisible\(\)/);
    assert.match(graphAdapter, /clearSelection\(\)/);
    assert.match(studioCss, /--studio-palette-width: 250px/);
    assert.match(studioCss, /--studio-inspector-width: 280px/);
    assert.match(js, /elements\.deleteSelection\.addEventListener\('click'/);
    assert.match(js, /elements\.reviewAction\.addEventListener\('click'/);
    assert.match(js, /elements\.autoLayout\.addEventListener\('click', autoLayoutArchitecture\)/);
    assert.match(js, /core\.alignAssets\(project, assetIds, project\.active_view, alignment\)/);
    assert.match(js, /core\.distributeAssets\(project, assetIds, project\.active_view, axis\)/);
});

test('Studio application shell exposes wired navigation, tabs, display, and canvas controls', function () {
    [
        'studio-wide-screen',
        'studio-fullscreen',
        'studio-share',
        'studio-embed',
        'studio-components-tab',
        'studio-templates-tab',
        'studio-properties-tab',
        'studio-style-tab',
        'studio-select-tool',
        'studio-insert-image',
        'studio-grid-visible',
        'studio-snap-enabled',
        'studio-guides-enabled',
        'studio-grid-size',
        'studio-image-asset-file',
        'studio-upload-custom-icon',
        'studio-empty-upload-icon',
        'studio-cursor-position'
    ].forEach(function (id) {
        assert.match(twig, new RegExp(`id="${id}"`));
    });
    assert.match(js, /function switchLibraryTab\(tab\)/);
    assert.match(js, /function switchInspectorTab\(tab\)/);
    assert.match(js, /layoutPublishFactory\?\.create/);
    assert.match(publisher, /async function createPublishedSnapshot\(target\)/);
    assert.match(js, /graphAdapter\.setSnapEnabled\(snapEnabled\)/);
    assert.match(js, /graphAdapter\.setGuidesEnabled\(guidesEnabled\)/);
    assert.match(js, /elements\.wideScreen\.addEventListener\('click'/);
    assert.match(js, /elements\.fullscreen\.addEventListener\('click'/);
    assert.match(js, /requestFullscreen\.call\(root\)/);
    assert.match(js, /exitFullscreen\.call\(document\)/);
    assert.match(js, /'fullscreenchange', 'webkitfullscreenchange'/);
    assert.doesNotMatch(twig, /id="studio-preview"/);
    assert.match(graphAdapter, /setSnapEnabled\(enabled\)/);
    assert.match(graphAdapter, /setGuidesEnabled\(enabled\)/);
    assert.match(graphAdapter, /setGridSize\(size\)/);
    assert.match(graphAdapter, /setSnapBypass\(active\)/);
    assert.match(graphAdapter, /applySmartSnapping\(bounds, delta, states\)/);
    assert.match(js, /saveLayoutPreferences\(\)/);
    assert.match(js, /event\.key === 'Alt'/);
});

test('Studio exposes provider templates and infrastructure-aware inspector fields', function () {
    assert.match(twig, /id="studio-template-family"/);
    assert.match(twig, /id="studio-template-provider"/);
    assert.match(js, /let activeTemplateFamily = ''/);
    assert.match(js, /let activeTemplateProvider = ''/);
    assert.match(js, /function renderTemplateFilters\(\)/);
    assert.match(js, /new Option\('Choose library', ''\)/);
    assert.match(js, /new Option\('Choose provider', ''\)/);
    assert.match(js, /Choose a template library and provider to load examples/);
    assert.match(js, /elements\.templateFamily\.addEventListener\('change'/);
    assert.match(js, /elements\.templateProvider\.addEventListener\('change'/);
    assert.match(js, /async function loadSelectedTemplatePackages\(\)/);
    assert.doesNotMatch(js, /templateProvider\.disabled/);
    [
        'studio-template-list',
        'studio-context-fields',
        'studio-field-connection-direction',
        'studio-field-connection-protocol',
        'studio-field-connection-bandwidth',
        'studio-field-connection-source',
        'studio-field-connection-target',
        'studio-field-connection-route',
        'studio-reset-connection-route',
        'studio-field-shape',
        'studio-field-fill-color',
        'studio-field-border-color',
        'studio-field-text-color',
        'studio-field-border-style',
        'studio-field-border-width',
        'studio-field-font-size',
        'studio-field-text-align',
        'studio-field-asset-locked',
        'studio-duplicate-item',
        'studio-reset-asset-style',
        'studio-delete-item-style',
        'studio-style-selection-summary',
        'studio-style-preset',
        'studio-apply-style-preset',
        'studio-delete-style-preset',
        'studio-style-preset-name',
        'studio-save-style-preset',
        'studio-copy-asset-style',
        'studio-paste-asset-style',
        'studio-image-properties',
        'studio-field-image-mode',
        'studio-field-image-fit',
        'studio-field-image-opacity',
        'studio-field-image-padding',
        'studio-field-image-background',
        'studio-field-image-background-color',
        'studio-trim-image',
        'studio-reset-image',
        'studio-field-image-label',
        'studio-field-image-width',
        'studio-field-image-height',
        'studio-field-image-icon-size',
        'studio-field-image-locked'
    ].forEach(function (id) {
        assert.match(twig, new RegExp(`id="${id}"`));
    });
    assert.match(twig, /importmap\(\['app', 'studio'\]\)/);
    assert.match(js, /import providerRegistry from '\.\/providers\/registry\.js'/);
    assert.match(js, /import packageLoaderFactory from '\.\/packages\/studio-package\.js'/);
    assert.match(twig, /data-package-registry=/);
    assert.doesNotMatch(twig, /js\/studio\/providers\/(?:aws|azure)\/templates\.js/);
    assert.match(js, /function renderTemplates\(\)/);
    assert.match(js, /function renderContextualFields\(asset\)/);
    assert.match(js, /core\.addImageAsset\(project/);
    assert.match(js, /core\.updateAssetImage\(next, assetId/);
    assert.match(js, /elements\.uploadCustomIcon\.addEventListener\('click', openImageAssetPicker\)/);
    assert.match(js, /elements\.emptyUploadIcon\.addEventListener\('click', openImageAssetPicker\)/);
    assert.match(js, /inspectorCollapsed = false/);
    assert.match(js, /activeInspectorTab = 'properties'/);
    assert.match(js, /function trimTransparentImage\(image, mimeType\)/);
    assert.match(js, /pixels\[\(\(y \* canvas\.width\) \+ x\) \* 4 \+ 3\] <= 16/);
    assert.match(js, /cropped\.toDataURL\(mimeType\)/);
    assert.match(js, /function initialImageAssetSize\(imageWidth, imageHeight, zoom\)/);
    assert.match(js, /imageWidth \/ imageHeight/);
    assert.match(js, /show_label: false/);
    assert.match(js, /original_data_url: String\(reader\.result\)/);
    assert.match(js, /function updateSelectedImageSource\(dataUrl, trim\)/);
    assert.match(js, /updateSelectedImageSource\(asset\.image\.original_data_url, false\)/);
    assert.match(js, /background: elements\.fieldImageBackground\.value/);
    assert.match(js, /padding: elements\.fieldImagePadding\.value/);
    assert.match(twig, /<summary>Background reference<\/summary>/);
    assert.match(graphAdapter, /studio-graph-image-card/);
    assert.match(graphAdapter, /draggable="false"/);
    assert.match(graphAdapter, /addImageHitArea\(state\)/);
    assert.match(graphAdapter, /InternalEvent\.redirectMouseEvents\(hitArea\.node, this\.graph, state\)/);
    assert.match(graphAdapter, /asset\.image\?\.mode === 'image'/);
    assert.match(graphAdapter, /fillColor: 'none', strokeColor: 'none', strokeWidth: 0, shadow: false/);
    assert.match(graphAdapter, /asset\.image\.padding/);
    assert.match(graphAdapter, /asset\.image\.background === 'color'/);
    assert.match(studioCss, /\.studio-graph-image-card img \{[^}]*pointer-events: none;[^}]*-webkit-user-drag: none;/);
    assert.match(js, /elements\.assetForm\.addEventListener\('change'/);
    assert.match(js, /elements\.connectionForm\.addEventListener\('change'/);
    assert.match(js, /core\.validateConnection\(project/);
    assert.match(js, /core\.updateConnectionRoute\(project/);
    assert.match(js, /resetSelectedConnectionRoute/);
    assert.match(js, /style: 'orthogonal',[\s\S]*points: \[\]/);
    assert.match(graphAdapter, /Point/);
    assert.match(graphAdapter, /studio-connection-label-overlay/);
    assert.match(graphAdapter, /studio-graph-connection-label/);
    assert.match(graphAdapter, /labelBackgroundColor: 'none'/);
    assert.match(graphAdapter, /updateConnectionLabels\(\) \{/);
    assert.match(graphAdapter, /state\?\.absolutePoints/);
    assert.match(graphAdapter, /!collides\(candidate, obstacles\)/);
    assert.match(graphAdapter, /!collides\(candidate, placed\)/);
    assert.match(graphAdapter, /point\.horizontal/);
    assert.match(graphAdapter, /\(width \/ 2\) \+ 34/);
    assert.match(graphAdapter, /resolveConnectionLabelCollisions\(\) \{/);
    assert.match(graphAdapter, /querySelectorAll\('\.studio-graph-card, \.studio-graph-boundary-label'\)/);
    assert.match(graphAdapter, /for \(let radius = 16; radius <= 160; radius \+= 16\)/);
    assert.match(graphAdapter, /value: ''/);
    assert.match(studioCss, /\.studio-graph-connection-label \{[^}]*font: 800 12px\/1\.15[^}]*text-shadow:/);
    assert.match(studioCss, /\.studio-connection-label-overlay \{[^}]*z-index: 25/);
    assert.doesNotMatch(studioCss, /\.studio-graph-connection-label \{[^}]*(?:border|background|box-shadow):/);
    assert.match(graphAdapter, /change instanceof GeometryChange/);
    assert.match(graphAdapter, /onConnectionEndpointsChange/);
    assert.match(graphAdapter, /onConnectionRouteChange/);
    assert.match(graphAdapter, /setCellsBendable\(true\)/);
    assert.match(graphAdapter, /isAssetLocked\(cell\)/);
    assert.match(graphAdapter, /appearance\.fill_color/);
    assert.match(graphAdapter, /appearance\.border_color/);
    assert.match(graphAdapter, /appearance\.text_color/);
    assert.match(js, /core\.updateAssetAppearance\(next/);
    assert.match(js, /core\.updateAssetAppearances\(project, assetIds/);
    assert.match(js, /core\.saveStylePreset\(project/);
    assert.match(js, /core\.removeStylePreset\(project/);
    assert.match(js, /function copySelectedAssetStyle\(\)/);
    assert.match(js, /function pasteStyleToSelection\(\)/);
    assert.match(js, /core\.resetAssetAppearance\(project/);
    assert.match(js, /elements\.duplicateItem\.addEventListener\('click'/);
    assert.match(js, /elements\.deleteItemStyle\.addEventListener\('click'/);
    assert.match(studioCss, /\.studio-color-grid/);
    assert.match(studioCss, /--studio-cell-font/);
    assert.match(twig, /spellcheck="false"/);
    assert.match(twig, /class="studio-reference-toggle"/);
    assert.match(js, /control\.disabled = !hasReference/);
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
    assert.match(js, /import \{ improvements, rules \} from '\.\/content\.js'/);
    assert.match(js, /result\.category_scores/);
    assert.match(js, /Recommended improvement/);
    assert.match(js, /focusAssets\(item\.asset_ids\)/);
    assert.match(js, /graphAdapter\.selectAssets\(visibleIds\)/);
    assert.match(js, /Apply improvement/);
    assert.match(js, /Confirm apply/);
    assert.match(js, /Dismiss risk/);
    assert.match(js, /improvements\.previewPlan/);
    assert.match(js, /improvements\.applyPlan/);
    assert.match(js, /accepted_risks/);
});

test('Studio content follows the marked result, graph, improvements, inventory, and about hierarchy', function () {
    const graphPosition = twig.indexOf('aria-label="Studio Graph"');
    const resultPosition = twig.indexOf('id="studio-review-title"');
    const improvementsPosition = twig.indexOf('id="studio-improvements-title"');
    const inventoryPosition = twig.indexOf('id="studio-inventory-title"');
    const aboutPosition = twig.indexOf('id="studio-package-content"');

    assert.ok(graphPosition > -1);
    assert.ok(resultPosition < graphPosition);
    assert.ok(graphPosition < improvementsPosition);
    assert.ok(improvementsPosition < inventoryPosition);
    assert.ok(inventoryPosition < aboutPosition);
    assert.match(twig, /class="studio-content-rail-layout"/);
    assert.match(twig, /class="studio-content-column"/);
    assert.match(twig, /import 'layout\/advertisement\.html\.twig' as advertisement/);
    assert.match(twig, /advertisement\.rail\('studio-ad-rail-left', 'left', 'studio-content-left'\)/);
    assert.match(twig, /advertisement\.rail\('studio-ad-rail-right', 'right', 'studio-content-right'\)/);
    assert.match(advertisementTwig, /macro rail\(id, placement, slot\)/);
    assert.match(advertisementTwig, /data-ad-placement="\{\{ placement \}\}"/);
    assert.match(advertisementTwig, /data-ad-slot="\{\{ slot \}\}" data-ad-state="placeholder"/);
    assert.doesNotMatch(advertisementTwig, /googlesyndication|doubleclick|adsbygoogle|adservice|<script/i);
    [
        'result-grade.svg',
        'result-score.svg',
        'result-confidence.svg',
        'result-findings.svg',
        'result-categories.svg'
    ].forEach(function (filename) {
        assert.match(twig, new RegExp(`images/studio/${filename.replace('.', '\\.').replace('-', '\\-')}`));
        const iconPath = path.join(projectRoot, 'public/images/studio', filename);
        assert.ok(fs.existsSync(iconPath));
        const iconSource = fs.readFileSync(iconPath, 'utf8');
        assert.match(iconSource, /viewBox="0 0 64 64"/);
        assert.doesNotMatch(iconSource, /<script|<foreignObject|javascript:|onload=/i);
    });
    assert.equal((twig.match(/class="studio-score-card-icon"/g) || []).length, 4);
    assert.match(twig, /class="studio-category-review-icon"/);
    assert.ok(twig.indexOf('class="studio-content-rail-layout"') < resultPosition);
    assert.match(contentCss, /grid-template-columns: 160px minmax\(764px, 1180px\) 160px/);
    assert.match(contentCss, /grid-template-columns: minmax\(764px, 1180px\) 160px/);
    assert.match(contentCss, /@media \(min-width: 1280px\) and \(max-width: 1535px\)/);
    assert.match(contentCss, /@media \(min-width: 1536px\)/);
    assert.doesNotMatch(twig, /googlesyndication|doubleclick|adsbygoogle|adservice/);
    ['content', 'result', 'graph', 'improvements', 'inventory', 'about'].forEach(function (section) {
        assert.match(twig, new RegExp(`<!-- \\[studio-${section}\\] Section: Start -->`));
        assert.match(twig, new RegExp(`<!-- \\[studio-${section}\\] Section: End -->`));
        assert.match(contentCss, new RegExp(`/\\* \\[studio-${section}\\] Section: Start \\*/`));
        assert.match(contentCss, new RegExp(`/\\* \\[studio-${section}\\] Section: End \\*/`));
    });
    ['foundation', 'shell', 'workspace', 'library', 'canvas', 'inspector', 'dialogs', 'responsive'].forEach(function (section) {
        assert.match(studioCss, new RegExp(`/\\* \\[studio-${section}\\] Section: Start \\*/`));
        assert.match(studioCss, new RegExp(`/\\* \\[studio-${section}\\] Section: End \\*/`));
    });
    ['result', 'improvements'].forEach(function (section) {
        assert.match(contentModule, new RegExp(`// \\[studio-${section}\\] Section: Start`));
        assert.match(contentModule, new RegExp(`// \\[studio-${section}\\] Section: End`));
    });
    ['bootstrap', 'state', 'workspace', 'canvas', 'library', 'about', 'inspector', 'content-navigation', 'inventory', 'graph', 'result', 'improvements', 'shell', 'persistence', 'events', 'initialization'].forEach(function (section) {
        assert.match(js, new RegExp(`// \\[studio-${section}\\] Section: Start`));
        assert.match(js, new RegExp(`// \\[studio-${section}\\] Section: End`));
    });
    assert.match(twig, />Studio Improvement</);
    assert.doesNotMatch(twig, />Studio Overview</);
    assert.match(twig, />Studio Result</);
    assert.match(twig, />Studio Inventory</);
    assert.match(twig, /styles\/studio\/content\.css/);
    assert.match(js, /import \{ StudioChart \} from '\.\/library\/studio-chart\.js'/);
    assert.match(js, /overviewChart\.render\(project, provider, elements\.overviewChartSelect\.value\)/);
    assert.match(chartAdapter, /import \{ Chart, registerables \} from 'chart\.js'/);
    assert.match(chartAdapter, /type: 'line'/);
    assert.match(chartAdapter, /key: 'components'/);
    assert.match(chartAdapter, /key: 'boundaries'/);
    assert.match(chartAdapter, /key: 'relationships'/);
    assert.match(chartAdapter, /maintainAspectRatio: false/);
    assert.match(contentCss, /\/\* \[studio-graph\] Section: Start \*\//);
    assert.match(contentCss, /\.studio-chart-shell/);
    assert.match(contentCss, /position: relative/);
});

test('Studio Overview offers five wired provider-neutral Chart.js presentations', function () {
    [
        ['line-styling', 'Line Styling'],
        ['radar-controls', 'Radar Chart'],
        ['polar-assets', 'Polar Area Centered'],
        ['rounded-relationships', 'Bar · Border Radius'],
        ['time-combo', 'Time Scale · Combo']
    ].forEach(function ([value, label]) {
        assert.match(twig, new RegExp(`<option value="${value}">${label}<\\/option>`));
    });
    assert.match(twig, /id="studio-overview-chart-select"/);
    assert.match(js, /overviewChartSelect: byId\('studio-overview-chart-select'\)/);
    assert.match(js, /overviewChart\.render\(project, provider, elements\.overviewChartSelect\.value\)/);
    assert.match(js, /elements\.overviewChartSelect\.addEventListener\('change', renderOverview\)/);
    assert.match(js, /elements\.overviewChart\.setAttribute\('aria-label'/);
    assert.match(chartAdapter, /'line-styling': viewCoverageData/);
    assert.match(chartAdapter, /'radar-controls': operationalControlsData/);
    assert.match(chartAdapter, /'polar-assets': assetTypesData/);
    assert.match(chartAdapter, /'rounded-relationships': relationshipTypesData/);
    assert.match(chartAdapter, /'time-combo': timeComboData/);
    assert.match(chartAdapter, /type: 'radar'/);
    assert.match(chartAdapter, /type: 'polarArea'/);
    assert.match(chartAdapter, /type: 'bar'/);
    assert.match(chartAdapter, /scales\.x\.type = 'time'/);
    assert.match(chartAdapter, /import 'chartjs-adapter-date-fns'/);
});

test('Studio Overview exposes complete wired Chart.js accessories', function () {
    [
        'studio-chart-values',
        'studio-chart-reset',
        'studio-chart-download',
        'studio-chart-empty',
        'studio-chart-empty-message',
        'studio-chart-accessibility'
    ].forEach(function (id) {
        assert.match(twig, new RegExp(`id="${id}"`));
    });
    assert.match(twig, /role="toolbar" aria-label="Studio chart controls"/);
    assert.match(twig, /id="studio-chart-values"[^>]+aria-pressed="false"/);
    assert.match(twig, /id="studio-chart-reset"[^>]+disabled/);
    assert.match(twig, /id="studio-chart-accessibility"[^>]+aria-live="polite"/);
    assert.match(js, /overviewChart\.setDataLabelsVisible\(overviewValuesVisible\)/);
    assert.match(js, /overviewChart\.resetVisibility\(\)/);
    assert.match(js, /overviewChart\.downloadPng\(`/);
    assert.match(js, /overviewEmpty\.hidden = !totals\.empty/);
    assert.match(twig, /class="studio-section-heading"><div><span>Provider template metrics<\/span><h2 id="studio-improvements-title">Studio Improvement<\/h2>/);
    assert.match(twig, /id="studio-improvements-empty"[^>]+role="status"[^>]+hidden/);
    assert.match(twig, /id="studio-inventory-empty"[^>]+role="status"[^>]+hidden/);
    assert.match(twig, /id="studio-inventory-table"/);
    assert.match(js, /improvementsEmpty\.hidden = false/);
    assert.match(js, /inventoryEmpty\.hidden = project\.assets\.length > 0/);
    assert.match(contentCss, /\.studio-overview-actions[^}]+margin-left: auto/s);
    assert.match(contentCss, /\.studio-chart-heading[^}]+align-items: flex-end/s);
    assert.match(contentCss, /\.studio-content-empty \{/);
    assert.match(js, /overviewAccessibility\.textContent =/);
    assert.match(chartAdapter, /id: 'studioDataLabels'/);
    assert.match(chartAdapter, /id: 'studioCanvasBackground'/);
    assert.match(twig, /id="studio-chart-analysis-title"/);
    assert.match(twig, /id="studio-chart-title">Studio View Coverage<\/h2>/);
    assert.match(twig, /id="studio-chart-subtitle"/);
    assert.match(twig, /class="studio-section-heading studio-chart-heading"[\s\S]*class="studio-chart-copy"[\s\S]*class="studio-overview-actions"[\s\S]*class="studio-chart-shell"/);
    assert.match(js, /overviewAnalysisTitle: byId\('studio-chart-analysis-title'\)/);
    assert.match(js, /overviewAnalysisTitle\.textContent = totals\.analysisTitle/);
    assert.match(js, /overviewTitle\.textContent = totals\.title/);
    assert.match(js, /overviewSubtitle\.textContent = totals\.subtitle/);
    assert.match(chartAdapter, /analysisTitle: 'Architecture View Analysis'/);
    assert.match(chartAdapter, /analysisTitle: 'Operational Readiness Analysis'/);
    assert.match(chartAdapter, /analysisTitle: 'Architecture Inventory Analysis'/);
    assert.match(chartAdapter, /analysisTitle: 'Architecture Relationship Analysis'/);
    assert.match(chartAdapter, /analysisTitle: 'Architecture Coverage Analysis'/);
    assert.match(chartAdapter, /title: 'Studio View Coverage'/);
    assert.match(chartAdapter, /subtitle:/);
    assert.match(chartAdapter, /title: \{\s*display: false\s*\}/);
    assert.match(chartAdapter, /subtitle: \{\s*display: false\s*\}/);
    assert.match(chartAdapter, /plugins: \[studioCanvasBackgroundPlugin, studioDataLabelsPlugin\]/);
    assert.match(chartAdapter, /\['doughnut', 'polarArea'\]\.includes/);
    assert.match(chartAdapter, /Math\.round\(\(value \/ total\) \* 100\)/);
    assert.match(chartAdapter, /beginAtZero: true/);
    assert.match(chartAdapter, /Number\.isInteger\(value\)/);
    assert.match(chartAdapter, /centerPointLabels: true/);
    assert.match(chartAdapter, /borderRadius: 999/);
    assert.match(chartAdapter, /borderDash: \[8, 6\]/);
    assert.match(chartAdapter, /delay: function \(context\)/);
    assert.match(chartAdapter, /usePointStyle: true/);
    assert.match(chartAdapter, /align: 'center'/);
    assert.doesNotMatch(chartAdapter, /text: 'Studio metrics'/);
    assert.match(chartAdapter, /hasHiddenData\(\)/);
    assert.match(chartAdapter, /resetVisibility\(\)/);
    assert.match(chartAdapter, /downloadPng\(filename\)/);
    assert.match(contentCss, /\.studio-chart-toolbar/);
    assert.match(contentCss, /\.studio-chart-empty\[hidden\]/);
    assert.match(contentCss, /\.studio-chart-accessibility/);
});
