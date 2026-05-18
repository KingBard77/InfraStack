const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');

const cardBasedArchitectureTools = [
    {
        name: 'AWS',
        directory: 'templates/content/tools/aws/architecture-vpc-aws'
    },
    {
        name: 'Azure',
        directory: 'templates/content/tools/azure/architecture-vnet-azure'
    },
    {
        name: 'GCP',
        directory: 'templates/content/tools/gcp/architecture-vpc-gcp'
    }
];

const nodeBasedArchitectureTools = [
    {
        name: 'Cisco',
        directory: 'templates/content/tools/cisco/architecture-campus-network-cisco'
    },
    {
        name: 'IBM',
        directory: 'templates/content/tools/ibm/architecture-cloud-ibm'
    },
    {
        name: 'Huawei',
        directory: 'templates/content/tools/huawei/architecture-vpc-huawei'
    }
];

function readCustomJs(tool) {
    return fs.readFileSync(path.join(projectRoot, tool.directory, 'custom.js'), 'utf8');
}

function assertArrowKeySurface(tool, js) {
    ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].forEach(function (key) {
        assert.match(js, new RegExp(key), `${tool.name} missing ${key} keyboard handling`);
    });

    assert.match(js, /document\.addEventListener\('keydown'/, `${tool.name} missing document keydown binding`);
    assert.match(js, /event\.preventDefault\(\)/, `${tool.name} missing keyboard preventDefault path`);
    assert.match(js, /event\.shiftKey/, `${tool.name} missing faster keyboard movement`);
    assert.match(js, /event\.altKey/, `${tool.name} missing keyboard resize modifier`);
    assert.match(js, /tabindex="0"/, `${tool.name} missing stage item tabindex`);
    assert.match(js, /focusable="true"/, `${tool.name} missing SVG focusable contract`);
    assert.match(js, /role="button"/, `${tool.name} missing stage item button role`);
}

test('card-based architecture tools keep AWS keyboard focus behavior', function () {
    cardBasedArchitectureTools.forEach(function (tool) {
        const js = readCustomJs(tool);

        assertArrowKeySurface(tool, js);
        assert.match(js, /function setSelectedCards\(cardIds, primaryCardId, shouldFocus\)/, `${tool.name} selection does not support focus control`);
        assert.match(js, /function setSelectedCard\(cardId, shouldFocus\)/, `${tool.name} single selection does not support focus control`);
        assert.match(js, /function queueStageCardFocus/, `${tool.name} missing queued card focus`);
        assert.match(js, /function focusPendingStageCard/, `${tool.name} missing pending card focus`);
        assert.match(js, /function focusSelectedStageCard/, `${tool.name} missing selected card focus`);
        assert.match(js, /bindStageKeyboardEditing/, `${tool.name} missing focused SVG keyboard handler`);
        assert.match(js, /handleSelectedCardDocumentKeydown/, `${tool.name} missing document selected-card keyboard handler`);
        assert.match(js, /focusPendingStageCard\(stageCanvas\.querySelector\('svg'\)\)/, `${tool.name} missing post-render card focus`);
    });
});

test('node-based architecture tools restore focus after selection and render', function () {
    nodeBasedArchitectureTools.forEach(function (tool) {
        const js = readCustomJs(tool);

        assertArrowKeySurface(tool, js);
        assert.match(js, /let pendingStageFocusNodeId = '';/, `${tool.name} missing pending node focus state`);
        assert.match(js, /function queueStageNodeFocus/, `${tool.name} missing queued node focus`);
        assert.match(js, /function focusPendingStageNode/, `${tool.name} missing pending node focus`);
        assert.match(js, /function focusSelectedStageNode/, `${tool.name} missing selected node focus`);
        assert.match(js, /focusPendingStageNode\(stageCanvas\)/, `${tool.name} missing post-render node focus`);
        assert.match(js, /queueStageNodeFocus\(selectedNodeId\);[\s\S]*renderResult\(currentSpec\);/, `${tool.name} keyboard edits do not preserve focus through render`);
        assert.match(js, /document\.addEventListener\('keydown', handleKeyboardMove\)/, `${tool.name} missing node keyboard move binding`);
    });
});
