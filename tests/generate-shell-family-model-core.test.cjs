const test = require('node:test');
const assert = require('node:assert/strict');
const NetcatCore = require('../templates/content/tools/shell/generate-netcat-shell/assets/bin/model-core.js');
const ChmodCore = require('../templates/content/tools/shell/generate-chmod-shell/assets/bin/model-core.js');
const CrontabCore = require('../templates/content/tools/shell/generate-crontab-shell/assets/bin/model-core.js');
const CurlCore = require('../templates/content/tools/shell/generate-curl-shell/assets/bin/model-core.js');

test('Netcat model-core normalizes scan ranges and command identity', function () {
    const state = NetcatCore.normalizeCommandState({
        connectionType: 'scan',
        startPort: 9000,
        endPort: 8000,
        shell: 'fish',
        implementation: 'ncat'
    });

    assert.equal(NetcatCore.getToolId(), 'generate-netcat-shell');
    assert.equal(state.shell, 'bash');
    assert.equal(state.implementation, 'ncat');
    assert.equal(state.connectionType, 'scan');
    assert.equal(state.startPort, 8000);
    assert.equal(state.endPort, 9000);
    assert.equal(state.zeroIo, true);
});

test('Chmod model-core expands octal modes into permission state', function () {
    const state = ChmodCore.normalizeCommandState({
        target: '/srv/shared/project',
        targetType: 'directory',
        mode: '2775',
        recursive: 'true'
    });

    assert.equal(ChmodCore.getToolId(), 'generate-chmod-shell');
    assert.equal(state.targetType, 'directory');
    assert.equal(state.mode, '2775');
    assert.equal(state.recursive, true);
    assert.equal(state.special.setgid, true);
    assert.equal(state.permissions.user.octal, 7);
    assert.equal(state.permissions.others.write, false);
});

test('Crontab model-core normalizes macro and five-field expressions', function () {
    const expression = CrontabCore.buildExpression({
        minute: '*/15',
        hour: '9',
        dayOfMonth: '*',
        month: 'jan',
        dayOfWeek: 'mon-fri'
    });
    const state = CrontabCore.normalizeCommandState({
        macro: '@daily',
        command: '/usr/local/bin/backup'
    });

    assert.equal(CrontabCore.getToolId(), 'generate-crontab-shell');
    assert.equal(expression, '*/15 9 * JAN MON-FRI');
    assert.equal(state.macro, '@daily');
    assert.equal(state.expression, '@daily');
    assert.equal(state.command, '/usr/local/bin/backup');
});

test('cURL model-core normalizes request fields and headers', function () {
    const state = CurlCore.normalizeCommandState({
        url: 'https://api.example.com/v1/resource',
        method: 'post',
        shell: 'powershell',
        bodyMode: 'json',
        authMode: 'bearer',
        followRedirects: '1',
        headers: [
            'Accept: application/json',
            {
                name: 'Content-Type',
                value: 'application/json'
            }
        ]
    });

    assert.equal(CurlCore.getToolId(), 'generate-curl-shell');
    assert.equal(state.method, 'POST');
    assert.equal(state.shell, 'powershell');
    assert.equal(state.bodyMode, 'json');
    assert.equal(state.authMode, 'bearer');
    assert.equal(state.options.followRedirects, true);
    assert.deepEqual(state.headers, [
        {
            name: 'Accept',
            value: 'application/json'
        },
        {
            name: 'Content-Type',
            value: 'application/json'
        }
    ]);
});
