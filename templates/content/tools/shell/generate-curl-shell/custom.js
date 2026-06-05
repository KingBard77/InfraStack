// custom.js

// ns:start family._base.workspace.00_shell
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family._base.workspace.00_shell

// ns:start family._base.workspace.05_result-summary
function installInfraStackResultSummaryNormalizer(prefix) {
    function normalizeSummary(summary) {
        const hero = summary.querySelector('.' + prefix + '-result-hero-grid');

        if (!hero) {
            return;
        }

        const cards = Array.from(hero.querySelectorAll(':scope > .' + prefix + '-result-card'));
        const primaryCard = cards.find(function (card) {
            return card.classList.contains(prefix + '-result-card-primary') || card.classList.contains(prefix + '-result-card-visual') || card.classList.contains(prefix + '-result-card-command');
        }) || cards[0];
        const summaryCard = cards.find(function (card) {
            return card !== primaryCard && (card.classList.contains(prefix + '-result-card-summary') || card.classList.contains(prefix + '-result-card-main'));
        }) || cards.find(function (card) {
            return card !== primaryCard;
        });

        if (primaryCard) {
            primaryCard.classList.add(prefix + '-result-card-primary');
            if (!primaryCard.dataset.resultVisual) {
                primaryCard.dataset.resultVisual = primaryCard.querySelector('.' + prefix + '-result-command-output') ? 'command' : 'text';
            }
        }

        if (summaryCard) {
            summaryCard.classList.add(prefix + '-result-card-summary');
            const chipRow = summaryCard.querySelector('.' + prefix + '-result-chip-row');

            if (chipRow && !summaryCard.querySelector('.' + prefix + '-result-chip-grid')) {
                chipRow.classList.add(prefix + '-result-chip-grid');
            }
        }

        if (primaryCard && hero.firstElementChild !== primaryCard) {
            hero.insertBefore(primaryCard, hero.firstElementChild);
        }

        if (primaryCard && summaryCard && primaryCard.nextElementSibling !== summaryCard) {
            hero.insertBefore(summaryCard, primaryCard.nextElementSibling);
        }
    }

    function normalize() {
        document.querySelectorAll('.' + prefix + '-result-summary').forEach(normalizeSummary);
    }

    function scheduleNormalize() {
        window.requestAnimationFrame(normalize);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            normalize();
            new MutationObserver(scheduleNormalize).observe(document.body, {
                childList: true,
                subtree: true
            });
        }, { once: true });
        return;
    }

    normalize();
    new MutationObserver(scheduleNormalize).observe(document.body, {
        childList: true,
        subtree: true
    });
}

installInfraStackResultSummaryNormalizer('generate-curl-shell');
// ns:end family._base.workspace.05_result-summary

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('generateCurlShellForm');
    const submitButton = document.getElementById('generateCurlShellSubmit');
    const resetButton = document.getElementById('generateCurlShellReset');
    const presetInput = document.getElementById('generateCurlShellPreset');
    const applyPresetButton = document.getElementById('generateCurlShellApplyPreset');
    const urlInput = document.getElementById('generateCurlShellUrl');
    const shellInput = document.getElementById('generateCurlShellShell');
    const methodInput = document.getElementById('generateCurlShellMethod');
    const multilineInput = document.getElementById('generateCurlShellMultiline');
    const queryStringInput = document.getElementById('generateCurlShellQueryString');
    const userAgentPresetInput = document.getElementById('generateCurlShellUserAgentPreset');
    const customUserAgentInput = document.getElementById('generateCurlShellCustomUserAgent');
    const refererInput = document.getElementById('generateCurlShellReferer');
    const bodyModeInput = document.getElementById('generateCurlShellBodyMode');
    const bodyInput = document.getElementById('generateCurlShellBody');
    const bodyFileInput = document.getElementById('generateCurlShellBodyFile');
    const bodyHint = document.getElementById('generateCurlShellBodyHint');
    const headerNameInput = document.getElementById('generateCurlShellHeaderName');
    const headerValueInput = document.getElementById('generateCurlShellHeaderValue');
    const addHeaderButton = document.getElementById('generateCurlShellAddHeader');
    const headerFeedback = document.getElementById('generateCurlShellHeaderFeedback');
    const headerTableBody = document.getElementById('generateCurlShellHeaderTableBody');
    const authModeInput = document.getElementById('generateCurlShellAuthMode');
    const basicAuthFields = document.getElementById('generateCurlShellBasicAuthFields');
    const basicUsernameInput = document.getElementById('generateCurlShellBasicUsername');
    const basicPasswordInput = document.getElementById('generateCurlShellBasicPassword');
    const bearerTokenInput = document.getElementById('generateCurlShellBearerToken');
    const headerAuthFields = document.getElementById('generateCurlShellHeaderAuthFields');
    const apiKeyHeaderInput = document.getElementById('generateCurlShellApiKeyHeader');
    const apiKeyValueInput = document.getElementById('generateCurlShellApiKeyValue');
    const flagStyleInput = document.getElementById('generateCurlShellFlagStyle');
    const combineShortFlagsInput = document.getElementById('generateCurlShellCombineShortFlags');
    const followRedirectsInput = document.getElementById('generateCurlShellFollowRedirects');
    const insecureTlsInput = document.getElementById('generateCurlShellInsecureTls');
    const compressedInput = document.getElementById('generateCurlShellCompressed');
    const failWithBodyInput = document.getElementById('generateCurlShellFailWithBody');
    const includeHeadersInput = document.getElementById('generateCurlShellIncludeHeaders');
    const silentErrorsInput = document.getElementById('generateCurlShellSilentErrors');
    const retryAllErrorsInput = document.getElementById('generateCurlShellRetryAllErrors');
    const verboseInput = document.getElementById('generateCurlShellVerbose');
    const disableKeepAliveInput = document.getElementById('generateCurlShellDisableKeepAlive');
    const traceTimingInput = document.getElementById('generateCurlShellTraceTiming');
    const forceRequestInput = document.getElementById('generateCurlShellForceRequest');
    const httpVersionInput = document.getElementById('generateCurlShellHttpVersion');
    const timeoutInput = document.getElementById('generateCurlShellTimeout');
    const connectTimeoutInput = document.getElementById('generateCurlShellConnectTimeout');
    const maxRedirectsInput = document.getElementById('generateCurlShellMaxRedirects');
    const retryAttemptsInput = document.getElementById('generateCurlShellRetryAttempts');
    const retryDelayInput = document.getElementById('generateCurlShellRetryDelay');
    const limitRateInput = document.getElementById('generateCurlShellLimitRate');
    const outputFileInput = document.getElementById('generateCurlShellOutputFile');
    const importInput = document.getElementById('generateCurlShellImportInput');
    const importButton = document.getElementById('generateCurlShellImportButton');
    const importClearButton = document.getElementById('generateCurlShellImportClear');
    const importFeedback = document.getElementById('generateCurlShellImportFeedback');
    const resultEmpty = document.getElementById('generateCurlShellResultEmpty');
    const resultContent = document.getElementById('generateCurlShellResultContent');
    const resultError = document.getElementById('generateCurlShellResultError');
    const resultSummary = document.getElementById('generateCurlShellResultSummary');
    const commandOutput = document.getElementById('generateCurlShellCommandOutput');
    const optionsTableBody = document.getElementById('generateCurlShellOptionsTableBody');
    const warningsList = document.getElementById('generateCurlShellWarningsList');
    const errorsList = document.getElementById('generateCurlShellErrorsList');
    const jsonOutput = document.getElementById('generateCurlShellJsonOutput');
    const sortInput = document.getElementById('generateCurlShellSort');
    const sortSummary = document.getElementById('generateCurlShellSortSummary');
    const sortOptionButtons = Array.from(document.querySelectorAll('.generate-curl-shell-sort-option[data-sort-value]'));
    const sortSelect = document.getElementById('generateCurlShellSortSelect');
    const copyCommandButton = document.getElementById('generateCurlShellCopyCommand');
    const exportPdfButton = document.getElementById('generateCurlShellExportPdf');
    const downloadCsvButton = document.getElementById('generateCurlShellDownloadCsv');
    const copyJsonButton = document.getElementById('generateCurlShellCopyJson');
    const downloadJsonButton = document.getElementById('generateCurlShellDownloadJson');
    const importJsonButton = document.getElementById('generateCurlShellImportJsonButton');
    const importJsonInput = document.getElementById('generateCurlShellImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.generate-curl-shell-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.generate-curl-shell-tab-panel'));

    if (
        !form ||
        !submitButton ||
        !resetButton ||
        !presetInput ||
        !applyPresetButton ||
        !urlInput ||
        !shellInput ||
        !methodInput ||
        !multilineInput ||
        !queryStringInput ||
        !userAgentPresetInput ||
        !customUserAgentInput ||
        !refererInput ||
        !bodyModeInput ||
        !bodyInput ||
        !bodyFileInput ||
        !bodyHint ||
        !headerNameInput ||
        !headerValueInput ||
        !addHeaderButton ||
        !headerFeedback ||
        !headerTableBody ||
        !authModeInput ||
        !basicAuthFields ||
        !basicUsernameInput ||
        !basicPasswordInput ||
        !bearerTokenInput ||
        !headerAuthFields ||
        !apiKeyHeaderInput ||
        !apiKeyValueInput ||
        !flagStyleInput ||
        !combineShortFlagsInput ||
        !followRedirectsInput ||
        !insecureTlsInput ||
        !compressedInput ||
        !failWithBodyInput ||
        !includeHeadersInput ||
        !silentErrorsInput ||
        !retryAllErrorsInput ||
        !verboseInput ||
        !disableKeepAliveInput ||
        !traceTimingInput ||
        !forceRequestInput ||
        !httpVersionInput ||
        !timeoutInput ||
        !connectTimeoutInput ||
        !maxRedirectsInput ||
        !retryAttemptsInput ||
        !retryDelayInput ||
        !limitRateInput ||
        !outputFileInput ||
        !importInput ||
        !importButton ||
        !importClearButton ||
        !importFeedback ||
        !resultEmpty ||
        !resultContent ||
        !resultError ||
        !resultSummary ||
        !commandOutput ||
        !optionsTableBody ||
        !warningsList ||
        !errorsList ||
        !jsonOutput ||
        !sortInput ||
        !sortSummary ||
        !sortSelect ||
        sortOptionButtons.length === 0 ||
        !copyCommandButton ||
        !exportPdfButton ||
        !downloadCsvButton ||
        !copyJsonButton ||
        !downloadJsonButton ||
        !importJsonButton ||
        !importJsonInput ||
        tabButtons.length === 0 ||
        tabPanels.length === 0
    ) {
        return;
    }

    const resultEmptyDefaultText = resultEmpty.textContent.trim();

    const shellCatalog = {
        bash: {
            label: 'Bash / Zsh',
            joiner: ' \\',
            lineIndent: '  '
        },
        powershell: {
            label: 'PowerShell',
            joiner: ' `',
            lineIndent: '  '
        },
        cmd: {
            label: 'Windows CMD',
            joiner: ' ^',
            lineIndent: '  '
        }
    };
    const userAgentCatalog = {
        default: '',
        browser: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
        monitor: 'InfraStack-Monitor/1.0 (+https://infrastack.local)',
        custom: ''
    };
    const bodyModeHints = {
        none: 'No request body will be added.',
        json: 'JSON mode uses --data-raw and adds Content-Type: application/json when that header is missing.',
        form: 'Form mode expects key=value pairs separated by new lines or ampersands and converts them into --data-urlencode flags.',
        raw: 'Raw text mode sends the value as-is with --data-raw.',
        binary: 'Binary mode expects a file reference such as @./payload.bin and sends it with --data-binary.'
    };
    const presetCatalog = {
        blank: {
            url: 'https://api.example.com/v1/resource',
            method: 'GET',
            queryString: '',
            userAgentPreset: 'default',
            customUserAgent: '',
            referer: '',
            bodyMode: 'none',
            body: '',
            bodyFile: '',
            authMode: 'none',
            basicUsername: '',
            basicPassword: '',
            bearerToken: '',
            apiKeyHeader: 'X-API-Key',
            apiKeyValue: '',
            outputFile: '',
            timeout: '',
            connectTimeout: '',
            maxRedirects: '',
            retryAttempts: '0',
            retryDelay: '',
            limitRate: '',
            flagStyle: 'mixed',
            followRedirects: false,
            insecureTls: false,
            compressed: false,
            failWithBody: false,
            includeHeaders: false,
            silentErrors: false,
            retryAllErrors: false,
            verbose: false,
            disableKeepAlive: false,
            traceTiming: false,
            forceRequest: false,
            combineShortFlags: true,
            multiline: true,
            httpVersion: 'default',
            headers: []
        },
        'api-get': {
            url: 'https://api.example.com/v1/resource',
            method: 'GET',
            queryString: 'page=1&limit=25',
            userAgentPreset: 'default',
            customUserAgent: '',
            referer: '',
            bodyMode: 'none',
            body: '',
            bodyFile: '',
            authMode: 'none',
            basicUsername: '',
            basicPassword: '',
            bearerToken: '',
            apiKeyHeader: 'X-API-Key',
            apiKeyValue: '',
            outputFile: '',
            timeout: '20',
            connectTimeout: '',
            maxRedirects: '5',
            retryAttempts: '2',
            retryDelay: '2',
            limitRate: '',
            flagStyle: 'mixed',
            followRedirects: true,
            insecureTls: false,
            compressed: true,
            failWithBody: true,
            includeHeaders: false,
            silentErrors: true,
            retryAllErrors: false,
            verbose: false,
            disableKeepAlive: false,
            traceTiming: false,
            forceRequest: false,
            combineShortFlags: true,
            multiline: true,
            httpVersion: 'default',
            headers: [
                { name: 'Accept', value: 'application/json' }
            ]
        },
        'api-post': {
            url: 'https://api.example.com/v1/resource',
            method: 'POST',
            queryString: '',
            userAgentPreset: 'default',
            customUserAgent: '',
            referer: '',
            bodyMode: 'json',
            body: '{\n  "name": "example",\n  "enabled": true\n}',
            bodyFile: '',
            authMode: 'none',
            basicUsername: '',
            basicPassword: '',
            bearerToken: '',
            apiKeyHeader: 'X-API-Key',
            apiKeyValue: '',
            outputFile: '',
            timeout: '20',
            connectTimeout: '',
            maxRedirects: '5',
            retryAttempts: '0',
            retryDelay: '',
            limitRate: '',
            flagStyle: 'mixed',
            followRedirects: true,
            insecureTls: false,
            compressed: true,
            failWithBody: true,
            includeHeaders: false,
            silentErrors: true,
            retryAllErrors: false,
            verbose: false,
            disableKeepAlive: false,
            traceTiming: false,
            forceRequest: true,
            combineShortFlags: true,
            multiline: true,
            httpVersion: 'default',
            headers: [
                { name: 'Accept', value: 'application/json' },
                { name: 'Content-Type', value: 'application/json' }
            ]
        },
        'form-post': {
            url: 'https://app.example.com/session',
            method: 'POST',
            queryString: '',
            userAgentPreset: 'browser',
            customUserAgent: '',
            referer: 'https://app.example.com/login',
            bodyMode: 'form',
            body: 'email=alice@example.com\nremember=true',
            bodyFile: '',
            authMode: 'none',
            basicUsername: '',
            basicPassword: '',
            bearerToken: '',
            apiKeyHeader: 'X-API-Key',
            apiKeyValue: '',
            outputFile: '',
            timeout: '20',
            connectTimeout: '',
            maxRedirects: '5',
            retryAttempts: '0',
            retryDelay: '',
            limitRate: '',
            flagStyle: 'mixed',
            followRedirects: true,
            insecureTls: false,
            compressed: true,
            failWithBody: false,
            includeHeaders: true,
            silentErrors: true,
            retryAllErrors: false,
            verbose: false,
            disableKeepAlive: false,
            traceTiming: false,
            forceRequest: true,
            combineShortFlags: true,
            multiline: true,
            httpVersion: 'default',
            headers: [
                { name: 'Accept', value: 'text/html,application/xhtml+xml' }
            ]
        },
        download: {
            url: 'https://downloads.example.com/releases/app.tar.gz',
            method: 'GET',
            queryString: '',
            userAgentPreset: 'monitor',
            customUserAgent: '',
            referer: '',
            bodyMode: 'none',
            body: '',
            bodyFile: '',
            authMode: 'none',
            basicUsername: '',
            basicPassword: '',
            bearerToken: '',
            apiKeyHeader: 'X-API-Key',
            apiKeyValue: '',
            outputFile: 'app.tar.gz',
            timeout: '60',
            connectTimeout: '10',
            maxRedirects: '8',
            retryAttempts: '4',
            retryDelay: '3',
            limitRate: '',
            flagStyle: 'mixed',
            followRedirects: true,
            insecureTls: false,
            compressed: false,
            failWithBody: false,
            includeHeaders: false,
            silentErrors: true,
            retryAllErrors: true,
            verbose: false,
            disableKeepAlive: false,
            traceTiming: true,
            forceRequest: false,
            combineShortFlags: true,
            multiline: true,
            httpVersion: 'default',
            headers: []
        },
        bearer: {
            url: 'https://api.example.com/v1/private',
            method: 'GET',
            queryString: '',
            userAgentPreset: 'default',
            customUserAgent: '',
            referer: '',
            bodyMode: 'none',
            body: '',
            bodyFile: '',
            authMode: 'bearer',
            basicUsername: '',
            basicPassword: '',
            bearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            apiKeyHeader: 'X-API-Key',
            apiKeyValue: '',
            outputFile: '',
            timeout: '20',
            connectTimeout: '',
            maxRedirects: '5',
            retryAttempts: '1',
            retryDelay: '2',
            limitRate: '',
            flagStyle: 'mixed',
            followRedirects: true,
            insecureTls: false,
            compressed: true,
            failWithBody: true,
            includeHeaders: false,
            silentErrors: true,
            retryAllErrors: false,
            verbose: false,
            disableKeepAlive: false,
            traceTiming: false,
            forceRequest: false,
            combineShortFlags: true,
            multiline: true,
            httpVersion: 'default',
            headers: [
                { name: 'Accept', value: 'application/json' }
            ]
        }
    };

    let latestResult = null;
    let latestHeaders = [];
    let editingHeaderIndex = -1;
    function initMarkdownCopyButtons() {
        const codeBlocks = document.querySelectorAll('.markdown-content pre');

        codeBlocks.forEach((pre) => {
            const commandNote = pre.nextElementSibling;
            const commandSummary = commandNote && commandNote.classList.contains('generate-curl-shell-command-note')
                ? commandNote.querySelector('summary')
                : null;

            if (pre.querySelector('.markdown-copy-btn') || (commandSummary && commandSummary.querySelector('.generate-curl-shell-command-copy-btn'))) {
                return;
            }

            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            const button = document.createElement('button');

            button.type = 'button';
            button.innerHTML = '<i class="bi bi-clipboard"></i><span class="generate-curl-shell-command-copy-label">Copy</span>';

            button.addEventListener('click', async function () {
                try {
                    await navigator.clipboard.writeText(code.textContent.trim());
                    flashButton(button, 'Copied');
                } catch (error) {
                    flashButton(button, 'Failed');
                }
            });

            if (commandSummary) {
                const labelGroup = document.createElement('span');

                labelGroup.className = 'generate-curl-shell-command-note-summary-labels';

                while (commandSummary.firstChild) {
                    labelGroup.appendChild(commandSummary.firstChild);
                }

                button.className = 'generate-curl-shell-command-copy-btn';
                button.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                commandSummary.appendChild(labelGroup);
                commandSummary.appendChild(button);
                pre.classList.add('generate-curl-shell-command-pre');

                return;
            }

            button.className = 'markdown-copy-btn';
            button.querySelector('.generate-curl-shell-command-copy-label').textContent = 'Copy';
            pre.appendChild(button);
        });
    }

    function flashButton(button, text) {
        const label = button.querySelector('[data-button-label]') || button.querySelector('.generate-curl-shell-command-copy-label');

        if (!label && (button.classList.contains('generate-curl-shell-row-copy') || (button.closest && button.closest('.tool-table-action-cell')))) {
            const isCopied = text === 'Copied';
            const icon = button.querySelector('i');
            const originalIcon = button.dataset.defaultIcon || (icon ? icon.className : '');

            if (icon && !button.dataset.defaultIcon) {
                button.dataset.defaultIcon = originalIcon;
            }

            button.classList.toggle('copied', isCopied);
            button.classList.toggle('is-copied', isCopied);
            button.classList.toggle('failed', !isCopied);
            if (icon) {
                icon.className = isCopied ? 'bi bi-check2' : 'bi bi-x-lg';
            }
            window.setTimeout(function () {
                button.classList.remove('copied', 'is-copied', 'failed');
                if (icon && button.dataset.defaultIcon) {
                    icon.className = button.dataset.defaultIcon;
                }
            }, 1400);
            return;
        }

        const originalText = button.dataset.defaultLabel || (label ? label.textContent : button.textContent);

        button.dataset.defaultLabel = originalText;
        button.dataset.state = text === 'Copied' ? 'copied' : '';

        if (label) {
            label.textContent = text;
        } else {
            button.textContent = text;
        }

        window.setTimeout(function () {
            if (label) {
                label.textContent = originalText;
                button.dataset.state = '';
                return;
            }

            button.textContent = originalText;
            button.dataset.state = '';
        }, 1400);
    }

    function escapeJsonHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

function formatDateTime(dateValue) {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue || Date.now());
    const normalized = Number.isNaN(date.getTime()) ? new Date() : date;

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(normalized);
}

    function highlightJsonText(text) {
        return escapeJsonHtml(text).replace(
            /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
                if (match.startsWith('"')) {
                    return `<span class="${match.endsWith(':') ? 'tool-json-key' : 'tool-json-string'}">${match}</span>`;
                }

                if (match === 'true' || match === 'false') {
                    return `<span class="tool-json-boolean">${match}</span>`;
                }

                if (match === 'null') {
                    return `<span class="tool-json-null">${match}</span>`;
                }

                return `<span class="tool-json-number">${match}</span>`;
            }
        );
    }

    function renderJsonOutput(payload) {
        jsonOutput.innerHTML = highlightJsonText(JSON.stringify(payload, null, 2));
    }

function normalizeUrl(value) {
        const trimmedValue = String(value || '').trim();

        if (!trimmedValue) {
            return '';
        }

        try {
            return new URL(trimmedValue).toString();
        } catch (error) {
            try {
                return new URL(`https://${trimmedValue}`).toString();
            } catch (secondError) {
                return '';
            }
        }
    }

    function cleanInteger(value, minValue, maxValue, fallbackValue) {
        if (String(value || '').trim() === '') {
            return fallbackValue;
        }

        const numberValue = Number(value);

        if (!Number.isFinite(numberValue)) {
            return fallbackValue;
        }

        const roundedValue = Math.round(numberValue);

        if (roundedValue < minValue) {
            return minValue;
        }

        if (typeof maxValue === 'number' && roundedValue > maxValue) {
            return maxValue;
        }

        return roundedValue;
    }

    function normalizeHeaderName(value) {
        return String(value || '')
            .trim()
            .replace(/\s+/g, '-');
    }

    function normalizeHeaderValue(value) {
        return String(value || '').trim();
    }

    function quoteValue(value, shell) {
        const stringValue = String(value);

        if (shell === 'powershell') {
            return `'${stringValue.replaceAll("'", "''")}'`;
        }

        if (shell === 'cmd') {
            return `"${stringValue.replaceAll('"', '""')}"`;
        }

        return `'${stringValue.replaceAll("'", "'\"'\"'")}'`;
    }

    function buildCommandFromTokens(tokens, shell, multiline) {
        if (!multiline || tokens.length <= 2) {
            return tokens.join(' ');
        }

        const shellConfig = shellCatalog[shell] || shellCatalog.bash;
        const firstToken = tokens[0];
        const remainingTokens = tokens.slice(1);

        return [firstToken]
            .concat(remainingTokens.map((token, index) => `${shellConfig.lineIndent}${token}${index === remainingTokens.length - 1 ? '' : shellConfig.joiner}`))
            .join('\n');
    }

    function addTokenPair(tokens, shortFlag, longFlag, value, query) {
        const normalizedValue = String(value || '').trim();

        if (!normalizedValue) {
            return;
        }

        const preferredFlag = selectFlag(shortFlag, longFlag, query.flagStyle);
        tokens.push(preferredFlag, quoteValue(normalizedValue, query.shell));
    }

    function selectFlag(shortFlag, longFlag, flagStyle) {
        if (flagStyle === 'long' || !shortFlag) {
            return longFlag;
        }

        if (flagStyle === 'short') {
            return shortFlag || longFlag;
        }

        return shortFlag || longFlag;
    }

    function combineShortFlagTokens(shortFlags) {
        if (shortFlags.length === 0) {
            return [];
        }

        return [`-${shortFlags.join('')}`];
    }

    function upsertHeader(headers, name, value) {
        const normalizedName = normalizeHeaderName(name);
        const normalizedValue = normalizeHeaderValue(value);

        if (!normalizedName || !normalizedValue) {
            return headers;
        }

        const nextHeaders = Array.isArray(headers) ? headers.map((header) => ({ ...header })) : [];
        const existingIndex = nextHeaders.findIndex((header) => header.name.toLowerCase() === normalizedName.toLowerCase());
        const nextHeader = {
            name: normalizedName,
            value: normalizedValue
        };

        if (existingIndex > -1) {
            nextHeaders[existingIndex] = nextHeader;
        } else {
            nextHeaders.push(nextHeader);
        }

        return nextHeaders;
    }

    function parseFormPairs(bodyValue) {
        return String(bodyValue || '')
            .split(/\n|&/)
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const separatorIndex = line.indexOf('=');

                if (separatorIndex < 1) {
                    return null;
                }

                return {
                    name: line.slice(0, separatorIndex).trim(),
                    value: line.slice(separatorIndex + 1).trim()
                };
            })
            .filter(Boolean);
    }

    function isJsonLike(value) {
        const trimmedValue = String(value || '').trim();

        if (!trimmedValue) {
            return false;
        }

        if (!['{', '['].includes(trimmedValue.charAt(0))) {
            return false;
        }

        try {
            JSON.parse(trimmedValue);
            return true;
        } catch (error) {
            return false;
        }
    }

    function getSafeQueryState() {
        return {
            url: urlInput.value.trim(),
            preset: presetInput.value,
            shell: shellInput.value,
            method: methodInput.value,
            multiline: multilineInput.checked ? '1' : '',
            query: queryStringInput.value.trim(),
            ua: userAgentPresetInput.value,
            referer: refererInput.value.trim(),
            bodyMode: bodyModeInput.value,
            authMode: authModeInput.value,
            flagStyle: flagStyleInput.value,
            combineShort: combineShortFlagsInput.checked ? '1' : '',
            followRedirects: followRedirectsInput.checked ? '1' : '',
            insecure: insecureTlsInput.checked ? '1' : '',
            compressed: compressedInput.checked ? '1' : '',
            failWithBody: failWithBodyInput.checked ? '1' : '',
            includeHeaders: includeHeadersInput.checked ? '1' : '',
            silentErrors: silentErrorsInput.checked ? '1' : '',
            retryAllErrors: retryAllErrorsInput.checked ? '1' : '',
            verbose: verboseInput.checked ? '1' : '',
            disableKeepAlive: disableKeepAliveInput.checked ? '1' : '',
            traceTiming: traceTimingInput.checked ? '1' : '',
            forceRequest: forceRequestInput.checked ? '1' : '',
            httpVersion: httpVersionInput.value,
            timeout: timeoutInput.value.trim(),
            connectTimeout: connectTimeoutInput.value.trim(),
            maxRedirects: maxRedirectsInput.value.trim(),
            retryAttempts: retryAttemptsInput.value.trim(),
            retryDelay: retryDelayInput.value.trim(),
            limitRate: limitRateInput.value.trim(),
            outputFile: outputFileInput.value.trim()
        };
    }

    function syncSafeStateToUrl() {
        const url = new URL(window.location.href);
        const state = getSafeQueryState();

        Object.entries(state).forEach(([key, value]) => {
            if (!value) {
                url.searchParams.delete(key);
                return;
            }

            url.searchParams.set(key, value);
        });

        window.history.replaceState({}, '', url.toString());
    }

    function restoreSafeStateFromUrl() {
        const params = new URLSearchParams(window.location.search);

        if (params.has('url')) {
            urlInput.value = params.get('url') || '';
        }

        if (params.has('preset') && presetCatalog[params.get('preset') || '']) {
            presetInput.value = params.get('preset') || 'blank';
        }

        if (params.has('shell') && shellCatalog[params.get('shell') || '']) {
            shellInput.value = params.get('shell') || 'bash';
        }

        if (params.has('method')) {
            methodInput.value = params.get('method') || 'GET';
        }

        if (params.has('multiline')) {
            multilineInput.checked = params.get('multiline') !== '0';
        }

        if (params.has('query')) {
            queryStringInput.value = params.get('query') || '';
        }

        if (params.has('ua')) {
            userAgentPresetInput.value = params.get('ua') || 'default';
        }

        if (params.has('referer')) {
            refererInput.value = params.get('referer') || '';
        }

        if (params.has('bodyMode')) {
            bodyModeInput.value = params.get('bodyMode') || 'none';
        }

        if (params.has('authMode')) {
            authModeInput.value = params.get('authMode') || 'none';
        }

        if (params.has('flagStyle')) {
            flagStyleInput.value = params.get('flagStyle') || 'mixed';
        }

        if (params.has('combineShort')) {
            combineShortFlagsInput.checked = params.get('combineShort') !== '0';
        }

        if (params.has('followRedirects')) {
            followRedirectsInput.checked = params.get('followRedirects') !== '0';
        }

        if (params.has('insecure')) {
            insecureTlsInput.checked = params.get('insecure') === '1';
        }

        if (params.has('compressed')) {
            compressedInput.checked = params.get('compressed') !== '0';
        }

        if (params.has('failWithBody')) {
            failWithBodyInput.checked = params.get('failWithBody') === '1';
        }

        if (params.has('includeHeaders')) {
            includeHeadersInput.checked = params.get('includeHeaders') === '1';
        }

        if (params.has('silentErrors')) {
            silentErrorsInput.checked = params.get('silentErrors') !== '0';
        }

        if (params.has('retryAllErrors')) {
            retryAllErrorsInput.checked = params.get('retryAllErrors') === '1';
        }

        if (params.has('verbose')) {
            verboseInput.checked = params.get('verbose') === '1';
        }

        if (params.has('disableKeepAlive')) {
            disableKeepAliveInput.checked = params.get('disableKeepAlive') === '1';
        }

        if (params.has('traceTiming')) {
            traceTimingInput.checked = params.get('traceTiming') === '1';
        }

        if (params.has('forceRequest')) {
            forceRequestInput.checked = params.get('forceRequest') === '1';
        }

        if (params.has('httpVersion')) {
            httpVersionInput.value = params.get('httpVersion') || 'default';
        }

        if (params.has('timeout')) {
            timeoutInput.value = params.get('timeout') || '';
        }

        if (params.has('connectTimeout')) {
            connectTimeoutInput.value = params.get('connectTimeout') || '';
        }

        if (params.has('maxRedirects')) {
            maxRedirectsInput.value = params.get('maxRedirects') || '';
        }

        if (params.has('retryAttempts')) {
            retryAttemptsInput.value = params.get('retryAttempts') || '';
        }

        if (params.has('retryDelay')) {
            retryDelayInput.value = params.get('retryDelay') || '';
        }

        if (params.has('limitRate')) {
            limitRateInput.value = params.get('limitRate') || '';
        }

        if (params.has('outputFile')) {
            outputFileInput.value = params.get('outputFile') || '';
        }

    }

    function showFeedback(element, message, type) {
        element.textContent = message;
        element.className = `generate-curl-shell-feedback generate-curl-shell-feedback-${type}`;
        element.classList.remove('d-none');
    }

    function hideFeedback(element) {
        element.textContent = '';
        element.className = 'generate-curl-shell-feedback d-none';
    }

    function clearHeaderEditor(preserveFeedback) {
        headerNameInput.value = '';
        headerValueInput.value = '';
        editingHeaderIndex = -1;
        addHeaderButton.textContent = 'Add header';

        if (!preserveFeedback) {
            hideFeedback(headerFeedback);
        }
    }

    function renderHeadersTable() {
        if (latestHeaders.length === 0) {
            headerTableBody.innerHTML = `
                <tr class="generate-curl-shell-table-empty-row">
                    <td colspan="4">No extra headers added yet.</td>
                </tr>
            `;

            return;
        }

        headerTableBody.innerHTML = latestHeaders.map((header, index) => `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><code>${escapeHtml(header.name)}</code></td>
                <td>${escapeHtml(header.value)}</td>
                <td class="generate-curl-shell-header-action-cell tool-table-action-cell">
                    <div class="generate-curl-shell-header-actions">
                        <button type="button" class="generate-curl-shell-table-btn" data-header-edit="${index}">Edit</button>
                        <button type="button" class="generate-curl-shell-table-btn" data-header-remove="${index}">Remove</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function updateBodyModeState() {
        const bodyMode = bodyModeInput.value;
        const isBinary = bodyMode === 'binary';
        const hasTextarea = ['json', 'form', 'raw'].includes(bodyMode);

        bodyInput.classList.toggle('d-none', !hasTextarea);
        bodyFileInput.classList.toggle('d-none', !isBinary);
        bodyHint.textContent = bodyModeHints[bodyMode] || bodyModeHints.none;

        if (bodyMode === 'json' && !bodyInput.value.trim()) {
            bodyInput.value = '{\n  "name": "example"\n}';
        }

        if (bodyMode === 'form' && !bodyInput.value.trim()) {
            bodyInput.value = 'key=value';
        }

        if (bodyMode === 'raw' && !bodyInput.value.trim()) {
            bodyInput.value = 'plain text payload';
        }

        if (bodyMode === 'binary' && !bodyFileInput.value.trim()) {
            bodyFileInput.value = '@./payload.bin';
        }

    }

    function updateAuthModeState() {
        const authMode = authModeInput.value;

        basicAuthFields.classList.toggle('d-none', authMode !== 'basic');
        bearerTokenInput.classList.toggle('d-none', authMode !== 'bearer');
        headerAuthFields.classList.toggle('d-none', authMode !== 'header');
    }

    function updateUserAgentState() {
        const isCustom = userAgentPresetInput.value === 'custom';

        customUserAgentInput.disabled = !isCustom;

        if (!isCustom) {
            customUserAgentInput.value = '';
        }

    }

    function collectHeadersFromUi() {
        return latestHeaders.map((header) => ({ ...header }));
    }

    function buildEffectiveUserAgent() {
        if (userAgentPresetInput.value === 'custom') {
            return customUserAgentInput.value.trim();
        }

        return userAgentCatalog[userAgentPresetInput.value] || '';
    }

// ns:start family._base.workspace.03_custom-settings
    function buildQuery() {
        return {
            preset: presetInput.value,
            url: normalizeUrl(urlInput.value),
            shell: shellInput.value,
            method: String(methodInput.value || 'GET').toUpperCase(),
            multiline: Boolean(multilineInput.checked),
            queryString: String(queryStringInput.value || '').trim().replace(/^\?+/, ''),
            userAgentPreset: userAgentPresetInput.value,
            customUserAgent: customUserAgentInput.value.trim(),
            userAgent: buildEffectiveUserAgent(),
            referer: refererInput.value.trim(),
            bodyMode: bodyModeInput.value,
            body: bodyInput.value,
            bodyFile: bodyFileInput.value.trim(),
            headers: collectHeadersFromUi(),
            authMode: authModeInput.value,
            basicUsername: basicUsernameInput.value.trim(),
            basicPassword: basicPasswordInput.value,
            bearerToken: bearerTokenInput.value.trim(),
            apiKeyHeader: normalizeHeaderName(apiKeyHeaderInput.value),
            apiKeyValue: apiKeyValueInput.value.trim(),
            flagStyle: flagStyleInput.value,
            combineShortFlags: Boolean(combineShortFlagsInput.checked),
            followRedirects: Boolean(followRedirectsInput.checked),
            insecureTls: Boolean(insecureTlsInput.checked),
            compressed: Boolean(compressedInput.checked),
            failWithBody: Boolean(failWithBodyInput.checked),
            includeHeaders: Boolean(includeHeadersInput.checked),
            silentErrors: Boolean(silentErrorsInput.checked),
            retryAllErrors: Boolean(retryAllErrorsInput.checked),
            verbose: Boolean(verboseInput.checked),
            disableKeepAlive: Boolean(disableKeepAliveInput.checked),
            traceTiming: Boolean(traceTimingInput.checked),
            forceRequest: Boolean(forceRequestInput.checked),
            httpVersion: httpVersionInput.value,
            timeout: cleanInteger(timeoutInput.value, 0, 86400, 0),
            connectTimeout: cleanInteger(connectTimeoutInput.value, 0, 86400, 0),
            maxRedirects: cleanInteger(maxRedirectsInput.value, 0, 999, 0),
            retryAttempts: cleanInteger(retryAttemptsInput.value, 0, 999, 0),
            retryDelay: cleanInteger(retryDelayInput.value, 0, 3600, 0),
            limitRate: String(limitRateInput.value || '').trim(),
            outputFile: outputFileInput.value.trim()
        };
    }

// ns:end family._base.workspace.03_custom-settings
    function getImportedPayload(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('The selected JSON file does not contain a cURL payload.');
        }

        return payload.query && typeof payload.query === 'object' && !Array.isArray(payload.query)
            ? payload.query
            : payload;
    }

    function buildImportedPayloadState(payload) {
        return getImportedPayload(payload);
    }

    function getImportedText(payload, key, fallback) {
        const value = payload[key];

        return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback;
    }

    function getImportedBoolean(payload, key, fallback) {
        const value = payload[key];

        if (typeof value === 'boolean') {
            return value;
        }

        if (value === 'true' || value === '1' || value === 1) {
            return true;
        }

        if (value === 'false' || value === '0' || value === 0) {
            return false;
        }

        return fallback;
    }

    function getImportedSelectValue(select, value, fallback) {
        const stringValue = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
        const optionValues = select && select.options
            ? Array.from(select.options).map((option) => option.value)
            : [];
        const hasOption = optionValues.includes(stringValue);

        return hasOption ? stringValue : fallback;
    }

    function applyImportedQuery(payload) {
        const importedPayload = getImportedPayload(payload);
        const defaults = presetCatalog.blank;

        presetInput.value = getImportedSelectValue(presetInput, importedPayload.preset, 'blank');
        urlInput.value = getImportedText(importedPayload, 'url', getImportedText(importedPayload, 'finalUrl', defaults.url));
        shellInput.value = getImportedSelectValue(shellInput, importedPayload.shell, 'bash');
        methodInput.value = getImportedSelectValue(methodInput, importedPayload.method, defaults.method);
        multilineInput.checked = getImportedBoolean(importedPayload, 'multiline', defaults.multiline);
        queryStringInput.value = getImportedText(importedPayload, 'queryString', getImportedText(importedPayload, 'query', defaults.queryString));
        userAgentPresetInput.value = getImportedSelectValue(userAgentPresetInput, importedPayload.userAgentPreset, defaults.userAgentPreset);
        customUserAgentInput.value = getImportedText(importedPayload, 'customUserAgent', defaults.customUserAgent);
        refererInput.value = getImportedText(importedPayload, 'referer', defaults.referer);
        bodyModeInput.value = getImportedSelectValue(bodyModeInput, importedPayload.bodyMode, defaults.bodyMode);
        bodyInput.value = getImportedText(importedPayload, 'body', defaults.body);
        bodyFileInput.value = getImportedText(importedPayload, 'bodyFile', defaults.bodyFile);
        authModeInput.value = getImportedSelectValue(authModeInput, importedPayload.authMode, defaults.authMode);
        basicUsernameInput.value = getImportedText(importedPayload, 'basicUsername', defaults.basicUsername);
        basicPasswordInput.value = getImportedText(importedPayload, 'basicPassword', defaults.basicPassword);
        bearerTokenInput.value = getImportedText(importedPayload, 'bearerToken', defaults.bearerToken);
        apiKeyHeaderInput.value = getImportedText(importedPayload, 'apiKeyHeader', defaults.apiKeyHeader);
        apiKeyValueInput.value = getImportedText(importedPayload, 'apiKeyValue', defaults.apiKeyValue);
        flagStyleInput.value = getImportedSelectValue(flagStyleInput, importedPayload.flagStyle, defaults.flagStyle);
        combineShortFlagsInput.checked = getImportedBoolean(importedPayload, 'combineShortFlags', defaults.combineShortFlags);
        followRedirectsInput.checked = getImportedBoolean(importedPayload, 'followRedirects', defaults.followRedirects);
        insecureTlsInput.checked = getImportedBoolean(importedPayload, 'insecureTls', defaults.insecureTls);
        compressedInput.checked = getImportedBoolean(importedPayload, 'compressed', defaults.compressed);
        failWithBodyInput.checked = getImportedBoolean(importedPayload, 'failWithBody', defaults.failWithBody);
        includeHeadersInput.checked = getImportedBoolean(importedPayload, 'includeHeaders', defaults.includeHeaders);
        silentErrorsInput.checked = getImportedBoolean(importedPayload, 'silentErrors', defaults.silentErrors);
        retryAllErrorsInput.checked = getImportedBoolean(importedPayload, 'retryAllErrors', defaults.retryAllErrors);
        verboseInput.checked = getImportedBoolean(importedPayload, 'verbose', defaults.verbose);
        disableKeepAliveInput.checked = getImportedBoolean(importedPayload, 'disableKeepAlive', defaults.disableKeepAlive);
        traceTimingInput.checked = getImportedBoolean(importedPayload, 'traceTiming', defaults.traceTiming);
        forceRequestInput.checked = getImportedBoolean(importedPayload, 'forceRequest', defaults.forceRequest);
        httpVersionInput.value = getImportedSelectValue(httpVersionInput, importedPayload.httpVersion, defaults.httpVersion);
        timeoutInput.value = getImportedText(importedPayload, 'timeout', defaults.timeout);
        connectTimeoutInput.value = getImportedText(importedPayload, 'connectTimeout', defaults.connectTimeout);
        maxRedirectsInput.value = getImportedText(importedPayload, 'maxRedirects', defaults.maxRedirects);
        retryAttemptsInput.value = getImportedText(importedPayload, 'retryAttempts', defaults.retryAttempts);
        retryDelayInput.value = getImportedText(importedPayload, 'retryDelay', defaults.retryDelay);
        limitRateInput.value = getImportedText(importedPayload, 'limitRate', defaults.limitRate);
        outputFileInput.value = getImportedText(importedPayload, 'outputFile', defaults.outputFile);
        latestHeaders = Array.isArray(importedPayload.headers)
            ? importedPayload.headers.map((header) => ({
                name: normalizeHeaderName(header && header.name),
                value: normalizeHeaderValue(header && header.value)
            })).filter((header) => header.name && header.value)
            : defaults.headers.map((header) => ({ ...header }));

        renderHeadersTable();
        clearHeaderEditor();
        updateUserAgentState();
        updateBodyModeState();
        updateAuthModeState();
        syncSafeStateToUrl();
        generateAndRender();
    }

    function validateQuery(query) {
        const errors = [];

        if (!query.url) {
            errors.push('Enter a valid absolute URL.');
        }

        if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].includes(query.method)) {
            errors.push('Choose a supported HTTP method.');
        }

        if (!['bash', 'powershell', 'cmd'].includes(query.shell)) {
            errors.push('Choose a supported shell.');
        }

        if (!['none', 'json', 'form', 'raw', 'binary'].includes(query.bodyMode)) {
            errors.push('Choose a supported body mode.');
        }

        if (query.authMode === 'basic' && !query.basicUsername) {
            errors.push('HTTP Basic auth requires a username.');
        }

        if (query.authMode === 'bearer' && !query.bearerToken) {
            errors.push('Bearer auth requires a token value.');
        }

        if (query.authMode === 'header' && (!query.apiKeyHeader || !query.apiKeyValue)) {
            errors.push('API key header auth requires both a header name and a value.');
        }

        if (query.bodyMode === 'binary' && !query.bodyFile) {
            errors.push('Binary body mode requires a file reference such as @./payload.bin.');
        }

        if (query.bodyMode === 'json' && query.body.trim() && !isJsonLike(query.body)) {
            errors.push('JSON body mode requires valid JSON text.');
        }

        if (query.bodyMode === 'form' && query.body.trim() && parseFormPairs(query.body).length === 0) {
            errors.push('Form body mode expects key=value pairs separated by new lines or ampersands.');
        }

        query.headers.forEach((header) => {
            if (!header.name || !header.value) {
                errors.push('Each header row must include both a name and a value.');
            }
        });

        return errors;
    }

    function buildWarnings(query, derived) {
        const warnings = [];

        if (query.queryString && query.url.includes('?')) {
            warnings.push('The base URL already contains a query string. The extra query parameters will be appended after it.');
        }

        if (query.retryDelay > 0 && query.retryAttempts === 0) {
            warnings.push('Retry delay is set, but retry attempts is zero.');
        }

        if (query.retryAllErrors && query.retryAttempts === 0) {
            warnings.push('Retry all errors is enabled, but retry attempts is zero.');
        }

        if (query.insecureTls) {
            warnings.push('Insecure TLS disables certificate verification. Use it only in controlled test paths.');
        }

        if (query.authMode !== 'none') {
            warnings.push('Secrets are not written into the shareable page URL, but they still appear in the generated command once copied or saved.');
        }

        if (query.bodyMode === 'binary' && query.shell === 'cmd' && query.multiline) {
            warnings.push('Windows CMD multi-line output is more fragile than Bash or PowerShell. Prefer single-line copy for production use.');
        }

        if (query.method === 'GET' && derived.bodyBytes > 0) {
            warnings.push('This command sends a body with GET. Some servers ignore or reject that pattern.');
        }

        if (query.httpVersion === 'http3') {
            warnings.push('HTTP/3 support depends on your local curl build and transport stack.');
        }

        if (query.userAgentPreset === 'custom' && !query.customUserAgent.trim()) {
            warnings.push('Custom user agent mode is selected, but the user agent value is empty.');
        }

        return warnings;
    }

    function buildFinalUrl(query) {
        if (!query.url) {
            return '';
        }

        const baseUrl = new URL(query.url);

        if (!query.queryString) {
            return baseUrl.toString();
        }

        const existingQuery = baseUrl.search.replace(/^\?/, '');
        const nextQuery = existingQuery ? `${existingQuery}&${query.queryString}` : query.queryString;

        baseUrl.search = nextQuery;

        return baseUrl.toString();
    }

    function deriveHeaders(query) {
        let headers = query.headers.map((header) => ({
            name: normalizeHeaderName(header.name),
            value: normalizeHeaderValue(header.value)
        })).filter((header) => header.name && header.value);

        if (query.userAgent) {
            headers = upsertHeader(headers, 'User-Agent', query.userAgent);
        }

        if (query.referer) {
            headers = upsertHeader(headers, 'Referer', query.referer);
        }

        if (query.bodyMode === 'json') {
            const hasJsonHeader = headers.some((header) => header.name.toLowerCase() === 'content-type');

            if (!hasJsonHeader) {
                headers = upsertHeader(headers, 'Content-Type', 'application/json');
            }
        }

        if (query.authMode === 'bearer') {
            headers = upsertHeader(headers, 'Authorization', `Bearer ${query.bearerToken}`);
        }

        if (query.authMode === 'header') {
            headers = upsertHeader(headers, query.apiKeyHeader, query.apiKeyValue);
        }

        return headers;
    }

    function deriveBodyTokens(query) {
        if (query.bodyMode === 'none') {
            return [];
        }

        if (query.bodyMode === 'binary') {
            return [{
                short: null,
                long: '--data-binary',
                value: query.bodyFile
            }];
        }

        if (query.bodyMode === 'form') {
            return parseFormPairs(query.body).map((pair) => ({
                short: null,
                long: '--data-urlencode',
                value: `${pair.name}=${pair.value}`
            }));
        }

        if (query.bodyMode === 'raw') {
            return [{
                short: '-d',
                long: '--data-raw',
                value: query.body
            }];
        }

        return [{
            short: '-d',
            long: '--data-raw',
            value: query.body
        }];
    }

    function buildFlagTokens(query) {
        const tokens = [];
        const shortFlags = [];
        const pushBooleanFlag = function (enabled, shortFlag, longFlag) {
            if (!enabled) {
                return;
            }

            if (query.flagStyle === 'short' && shortFlag) {
                shortFlags.push(shortFlag.replace(/^-/, ''));
                return;
            }

            if (query.flagStyle === 'mixed' && shortFlag) {
                shortFlags.push(shortFlag.replace(/^-/, ''));
                return;
            }

            tokens.push(longFlag);
        };

        pushBooleanFlag(query.followRedirects, '-L', '--location');
        pushBooleanFlag(query.insecureTls, '-k', '--insecure');
        pushBooleanFlag(query.includeHeaders, '-i', '--include');
        pushBooleanFlag(query.verbose, '-v', '--verbose');

        if (query.silentErrors) {
            if (query.flagStyle === 'long') {
                tokens.push('--silent', '--show-error');
            } else {
                shortFlags.push('s', 'S');
            }
        }

        if (query.compressed) {
            tokens.push('--compressed');
        }

        if (query.failWithBody) {
            tokens.push('--fail-with-body');
        }

        if (query.retryAllErrors) {
            tokens.push('--retry-all-errors');
        }

        if (query.disableKeepAlive) {
            tokens.push('--no-keepalive');
        }

        if (query.httpVersion === 'http2') {
            tokens.push('--http2');
        }

        if (query.httpVersion === 'http3') {
            tokens.push('--http3');
        }

        if (query.combineShortFlags && shortFlags.length > 0) {
            tokens.unshift(...combineShortFlagTokens(shortFlags));
        } else if (shortFlags.length > 0) {
            tokens.unshift(...shortFlags.map((flag) => `-${flag}`));
        }

        return tokens;
    }

    function buildCommand(query) {
        const finalUrl = buildFinalUrl(query);
        const headers = deriveHeaders(query);
        const bodyTokens = deriveBodyTokens(query);
        const commandTokens = ['curl'];
        const bodySource = query.bodyMode === 'binary' ? query.bodyFile : query.body;
        const bodyBytes = new TextEncoder().encode(bodySource).length;
        const errors = validateQuery(query);
        const derived = {
            finalUrl,
            headers,
            bodyTokens,
            bodyBytes,
            flagCount: 0,
            shellLabel: shellCatalog[query.shell].label,
            host: finalUrl ? new URL(finalUrl).host : '',
            method: query.method
        };
        const summaryRows = [
            ['Shell', derived.shellLabel],
            ['Flag style', query.flagStyle],
            ['Method', query.method],
            ['URL', finalUrl || 'Pending valid URL'],
            ['Headers', String(headers.length)],
            ['User-Agent', query.userAgent || 'Default cURL'],
            ['Referer', query.referer || 'None'],
            ['Body mode', query.bodyMode],
            ['Body bytes', String(derived.bodyBytes)],
            ['Auth', query.authMode],
            ['Timeout', query.timeout > 0 ? `${query.timeout}s` : 'None'],
            ['Connect timeout', query.connectTimeout > 0 ? `${query.connectTimeout}s` : 'None'],
            ['Retries', query.retryAttempts > 0 ? `${query.retryAttempts} attempt(s)` : 'Disabled'],
            ['Retry delay', query.retryDelay > 0 ? `${query.retryDelay}s` : 'None'],
            ['Rate limit', query.limitRate || 'None'],
            ['Output file', query.outputFile || 'Stdout'],
            ['HTTP version', query.httpVersion === 'default' ? 'Default' : query.httpVersion.toUpperCase()],
            ['Follow redirects', query.followRedirects ? 'Enabled' : 'Disabled'],
            ['Compression', query.compressed ? 'Enabled' : 'Disabled']
        ];
        const buildJsonPayload = function (tokens) {
            return {
                generated_at: new Date().toISOString(),
                query: {
                    ...query,
                    headers,
                    finalUrl
                },
                derived: {
                    command_tokens: tokens,
                    summary_rows: summaryRows.map(([field, value]) => ({ field, value })),
                    header_count: headers.length,
                    body_bytes: derived.bodyBytes,
                    flag_count: derived.flagCount
                }
            };
        };
        const warnings = buildWarnings(query, derived);

        if (errors.length > 0) {
            return {
                command: '',
                tokens: [],
                finalUrl,
                headers,
                bodyTokens,
                warnings,
                errors,
                summaryRows,
                jsonPayload: buildJsonPayload([])
            };
        }

        commandTokens.push(...buildFlagTokens(query));

        if (query.method !== 'GET' || query.forceRequest || bodyTokens.length > 0 || query.method === 'HEAD' || query.method === 'OPTIONS') {
            addTokenPair(commandTokens, '-X', '--request', query.method, query);
        }

        headers.forEach((header) => {
            addTokenPair(commandTokens, '-H', '--header', `${header.name}: ${header.value}`, query);
        });

        if (query.authMode === 'basic') {
            addTokenPair(commandTokens, '-u', '--user', `${query.basicUsername}:${query.basicPassword}`, query);
        }

        if (query.timeout > 0) {
            addTokenPair(commandTokens, '-m', '--max-time', String(query.timeout), query);
        }

        if (query.connectTimeout > 0) {
            addTokenPair(commandTokens, null, '--connect-timeout', String(query.connectTimeout), query);
        }

        if (query.maxRedirects > 0) {
            addTokenPair(commandTokens, null, '--max-redirs', String(query.maxRedirects), query);
        }

        if (query.retryAttempts > 0) {
            addTokenPair(commandTokens, null, '--retry', String(query.retryAttempts), query);
        }

        if (query.retryDelay > 0) {
            addTokenPair(commandTokens, null, '--retry-delay', String(query.retryDelay), query);
        }

        if (query.limitRate) {
            addTokenPair(commandTokens, null, '--limit-rate', query.limitRate, query);
        }

        if (query.outputFile) {
            addTokenPair(commandTokens, '-o', '--output', query.outputFile, query);
        }

        if (query.traceTiming) {
            addTokenPair(commandTokens, '-w', '--write-out', '\\nTotal: %{time_total}s\\n', query);
        }

        bodyTokens.forEach((token) => {
            addTokenPair(commandTokens, token.short, token.long, token.value, query);
        });

        commandTokens.push(quoteValue(finalUrl, query.shell));
        derived.flagCount = commandTokens.length - 2;

        return {
            command: buildCommandFromTokens(commandTokens, query.shell, query.multiline),
            tokens: commandTokens,
            finalUrl,
            headers,
            bodyTokens,
            warnings,
            errors,
            summaryRows,
            jsonPayload: buildJsonPayload(commandTokens)
        };
    }

    function activateTab(tabTarget) {
        tabButtons.forEach((button) => {
            const isActive = button.dataset.tabTarget === tabTarget;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        tabPanels.forEach((panel) => {
            const isActive = panel.dataset.tabPanel === tabTarget;
            panel.classList.toggle('active', isActive);
            if (isActive) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
    }

    function renderMessageList(element, messages, emptyText) {
        if (!messages.length) {
            element.className = 'generate-curl-shell-message-list generate-curl-shell-message-list-empty';
            element.innerHTML = `<li>${escapeHtml(emptyText)}</li>`;
            return;
        }

        element.className = 'generate-curl-shell-message-list';
        element.innerHTML = messages.map((message) => `<li>${escapeHtml(message)}</li>`).join('');
    }

// ns:start family._base.workspace.05_result-summary
    function renderSummary(result) {
        const warningCount = result.warnings.length;
        const errorCount = result.errors.length;
        const bodyMode = result.jsonPayload.query.bodyMode;
        const bodyBytes = result.jsonPayload.derived.body_bytes;
        const headerCount = result.headers.length;
        const flagCount = result.jsonPayload.derived.flag_count;
        const method = result.jsonPayload.query.method;
        const resultTone = errorCount > 0 ? 'error' : warningCount > 0 ? 'warning' : 'ready';
        const updatedText = formatDateTime(new Date());

        resultSummary.dataset.resultTone = resultTone;
        resultSummary.dataset.resultLayout = 'command';
        resultSummary.innerHTML = `
            <header class="generate-curl-shell-result-header" aria-label="Result summary header"><div class="generate-curl-shell-result-header-main"><span class="generate-curl-shell-result-header-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><div class="generate-curl-shell-result-header-copy"><h2 class="generate-curl-shell-result-header-title">Result Summary</h2><p>Overview of the generated cURL request and key metrics</p></div></div><div class="generate-curl-shell-result-header-meta" aria-label="Result summary status"><span class="generate-curl-shell-result-header-chip generate-curl-shell-result-chip-ready"><span class="generate-curl-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span><span class="generate-curl-shell-result-header-chip generate-curl-shell-result-chip-updated"><span class="generate-curl-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(updatedText)}</span></span></div></header>
            <div class="generate-curl-shell-result-hero-grid" aria-live="polite"><article class="generate-curl-shell-result-card generate-curl-shell-result-card-primary" data-result-visual="command" aria-label="Primary request result"><div class="generate-curl-shell-result-primary-heading generate-curl-shell-result-visual-copy generate-curl-shell-result-visual-copy-top"><div class="generate-curl-shell-result-kicker">Primary Result</div><h3 class="generate-curl-shell-result-title generate-curl-shell-result-title-center">Request mode</h3></div><div class="generate-curl-shell-result-primary-visual" id="generateCurlShellResultVisual" aria-label="Primary request mode"><div class="generate-curl-shell-result-command-output"><code class="generate-curl-shell-result-command-value">${escapeHtml(`${method} ${bodyMode === 'none' ? 'request' : bodyMode}`)}</code></div></div><div class="generate-curl-shell-result-visual-copy"><p class="generate-curl-shell-result-copy generate-curl-shell-result-copy-center">Compact request preview for the generated cURL command.</p></div><span class="generate-curl-shell-result-card-divider" aria-hidden="true"></span><div class="generate-curl-shell-result-chip-row generate-curl-shell-result-chip-row-center" aria-label="Primary result outcome"><span class="generate-curl-shell-result-chip generate-curl-shell-result-chip-outcome generate-curl-shell-result-chip-ready"><span class="generate-curl-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-terminal"></i></span><span>Command Generated</span></span></div></article><article class="generate-curl-shell-result-card generate-curl-shell-result-card-summary" aria-label="Request summary"><div class="generate-curl-shell-result-summary-intro"><span class="generate-curl-shell-result-card-icon generate-curl-shell-result-card-icon-summary" aria-hidden="true"><i class="bi bi-globe2"></i></span><div class="generate-curl-shell-result-summary-copy"><div class="generate-curl-shell-result-kicker">Descriptive Summary</div><h3 class="generate-curl-shell-result-title">${escapeHtml(method)} request command</h3><p class="generate-curl-shell-result-copy">Final target and command evidence stay derived from the current URL, headers, body, and flag settings.</p></div></div><span class="generate-curl-shell-result-card-divider" aria-hidden="true"></span><div class="generate-curl-shell-result-chip-grid" aria-label="Command state"><span class="generate-curl-shell-result-chip generate-curl-shell-result-chip-baseline"><span class="generate-curl-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-sliders"></i></span><span>${escapeHtml(result.jsonPayload.query.flagStyle)} flags</span></span><span class="generate-curl-shell-result-chip generate-curl-shell-result-chip-ready"><span class="generate-curl-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-globe2"></i></span><span>${escapeHtml(result.jsonPayload.query.httpVersion === 'default' ? 'Default HTTP' : result.jsonPayload.query.httpVersion.toUpperCase())}</span></span><span class="generate-curl-shell-result-chip generate-curl-shell-result-chip-${warningCount > 0 ? 'warning' : 'success'}"><span class="generate-curl-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-exclamation-triangle"></i></span><span>${warningCount} warning${warningCount === 1 ? '' : 's'}</span></span><span class="generate-curl-shell-result-chip generate-curl-shell-result-chip-${errorCount > 0 ? 'error' : 'success'}"><span class="generate-curl-shell-result-chip-icon" aria-hidden="true"><i class="bi bi-x-circle"></i></span><span>${errorCount} error${errorCount === 1 ? '' : 's'}</span></span></div></article></div>
            <div class="generate-curl-shell-result-metric-grid" aria-label="Command metrics"><article class="generate-curl-shell-result-metric-card generate-curl-shell-result-metric-success"><span class="generate-curl-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-card-heading"></i></span><span class="generate-curl-shell-result-metric-label">Headers</span><strong class="generate-curl-shell-result-metric-value">${headerCount}</strong><span class="generate-curl-shell-result-metric-copy">Request headers included.</span><span class="generate-curl-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-curl-shell-result-metric-card generate-curl-shell-result-metric-info"><span class="generate-curl-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-file-earmark-binary"></i></span><span class="generate-curl-shell-result-metric-label">Body bytes</span><strong class="generate-curl-shell-result-metric-value">${bodyBytes}</strong><span class="generate-curl-shell-result-metric-copy">Estimated payload size.</span><span class="generate-curl-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-curl-shell-result-metric-card generate-curl-shell-result-metric-accent-tone"><span class="generate-curl-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-list-check"></i></span><span class="generate-curl-shell-result-metric-label">Flags</span><strong class="generate-curl-shell-result-metric-value">${flagCount}</strong><span class="generate-curl-shell-result-metric-copy">Generated command flags.</span><span class="generate-curl-shell-result-metric-accent" aria-hidden="true"></span></article><article class="generate-curl-shell-result-metric-card generate-curl-shell-result-metric-warning"><span class="generate-curl-shell-result-metric-icon" aria-hidden="true"><i class="bi bi-filetype-json"></i></span><span class="generate-curl-shell-result-metric-label">Body mode</span><strong class="generate-curl-shell-result-metric-value">${escapeHtml(bodyMode)}</strong><span class="generate-curl-shell-result-metric-copy">Request payload mode.</span><span class="generate-curl-shell-result-metric-accent" aria-hidden="true"></span></article></div>
        `;
    }

// ns:end family._base.workspace.05_result-summary

// ns:start family._base.workspace.06_output-toolbar
    function updateSortExpandedState() {
        const summaryElement = sortSelect.querySelector('[aria-expanded]');

        if (summaryElement) {
            summaryElement.setAttribute('aria-expanded', sortSelect.open ? 'true' : 'false');
        }
    }

    function updateSortState() {
        const selectedButton = sortOptionButtons.find((button) => button.dataset.sortValue === sortInput.value) || sortOptionButtons[0];
        const selectedLabel = selectedButton
            ? selectedButton.textContent.trim()
            : 'ID';

        if (selectedButton) {
            sortInput.value = selectedButton.dataset.sortValue || 'id';
            sortSummary.textContent = selectedLabel;
            sortOptionButtons.forEach((button) => {
                const isActive = button === selectedButton;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
        }

        sortSelect.removeAttribute('open');
    }

// ns:end family._base.workspace.06_output-toolbar
    function getSortedSummaryRows(result) {
        if (!result) {
            return [];
        }

        const rows = result.summaryRows.map(([field, value], index) => ({
            field,
            value,
            index
        }));

        if (sortInput.value === 'alphabetical') {
            return rows
                .sort((left, right) => {
                    const leftText = `${left.field} ${left.value}`;
                    const rightText = `${right.field} ${right.value}`;
                    const textSort = leftText.localeCompare(rightText, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });

                    return textSort !== 0 ? textSort : left.index - right.index;
                })
                .map((row) => [row.field, row.value]);
        }

        if (sortInput.value === 'field') {
            return rows
                .sort((left, right) => {
                    const fieldSort = left.field.localeCompare(right.field, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });

                    if (fieldSort !== 0) {
                        return fieldSort;
                    }

                    return left.index - right.index;
                })
                .map((row) => [row.field, row.value]);
        }

        if (sortInput.value === 'value') {
            return rows
                .sort((left, right) => {
                    const valueSort = left.value.localeCompare(right.value, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                    });

                    return valueSort !== 0 ? valueSort : left.index - right.index;
                })
                .map((row) => [row.field, row.value]);
        }

        if (sortInput.value === 'length') {
            return rows
                .sort((left, right) => {
                    if (left.value.length !== right.value.length) {
                        return right.value.length - left.value.length;
                    }

                    return left.index - right.index;
                })
                .map((row) => [row.field, row.value]);
        }

        return rows
            .sort((left, right) => left.index - right.index)
            .map((row) => [row.field, row.value]);
    }

// ns:start family._base.workspace.07_table-output
    function renderOptionsTable(result) {
        optionsTableBody.innerHTML = getSortedSummaryRows(result).map(([field, value], index) => `
            <tr>
                <td class="tool-generated-rownum-cell">${index + 1}</td>
                <td><strong>${escapeHtml(field)}</strong></td>
                <td>${escapeHtml(value)}</td>
                <td class="generate-curl-shell-table-copy-cell tool-table-action-cell">
                    <button type="button" class="generate-curl-shell-row-copy generate-curl-shell-row-copy-btn" data-options-copy="${escapeHtml(value)}" aria-label="Copy request summary row ${index + 1}" title="Copy request summary row">
                        <i class="bi bi-clipboard" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

// ns:end family._base.workspace.07_table-output
// ns:start family._base.workspace.05_result-summary
// ns:start family.shell.workspace.04_result-text
    function renderResult(result) {
        latestResult = result;
        resultEmpty.classList.add('d-none');
        resultContent.classList.remove('d-none');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        renderSummary(result);
        renderOptionsTable(result);
        commandOutput.textContent = result.command;
        renderJsonOutput(result.jsonPayload);
        renderMessageList(warningsList, result.warnings, 'No warnings for the current command.');
        renderMessageList(errorsList, result.errors, 'No blocking errors for the current command.');
        activateTab('generateCurlShellOptionsPanel');
    }

// ns:end family.shell.workspace.04_result-text
// ns:end family._base.workspace.05_result-summary
    function showResultError(message) {
        resultError.classList.remove('d-none');
        resultError.textContent = message;
    }

    function showEmptyState(message) {
        latestResult = null;
        resultEmpty.textContent = message || resultEmptyDefaultText;
        resultEmpty.classList.remove('d-none');
        resultContent.classList.add('d-none');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        resultSummary.innerHTML = '';
        commandOutput.textContent = '';
        optionsTableBody.innerHTML = '';
        warningsList.innerHTML = '';
        errorsList.innerHTML = '';
        jsonOutput.innerHTML = '';
        activateTab('generateCurlShellOptionsPanel');
    }

    function setSubmitButtonLabel(label) {
        submitButton.innerHTML = `<i class="bi bi-terminal" aria-hidden="true"></i><span>${escapeHtml(label)}</span>`;
    }

    function convertRowsToCsv(rows) {
        return rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    }

    function downloadFile(filename, contents, mimeType) {
        const blob = new Blob([contents], { type: mimeType });
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(objectUrl);
    }

    function exportResultShellAsPdf(filenameStem, container) {
        const exportWindow = window.open('', '_blank', 'noopener,noreferrer');
        const shell = container.querySelector('.generate-curl-shell-result-shell') || container;

        if (!exportWindow || !shell) {
            window.print();
            return;
        }

        const styles = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], style'))
            .map((node) => node.outerHTML)
            .join('\n');

        exportWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(filenameStem)}</title>
  ${styles}
</head>
<body>
  ${shell.outerHTML}
</body>
</html>`);
        exportWindow.document.close();
        exportWindow.focus();
        window.setTimeout(() => {
            exportWindow.print();
        }, 250);
    }

    function getScriptExtension(shell) {
        if (shell === 'powershell') {
            return 'ps1';
        }

        if (shell === 'cmd') {
            return 'cmd';
        }

        return 'sh';
    }

// ns:start family._base.workspace.02_basic-settings
    function applyPreset(presetKey, shouldSync) {
        const resolvedPresetKey = presetCatalog[presetKey] ? presetKey : 'blank';
        const preset = presetCatalog[resolvedPresetKey];
        presetInput.value = resolvedPresetKey;
        urlInput.value = preset.url;
        methodInput.value = preset.method;
        queryStringInput.value = preset.queryString;
        userAgentPresetInput.value = preset.userAgentPreset;
        customUserAgentInput.value = preset.customUserAgent;
        refererInput.value = preset.referer;
        bodyModeInput.value = preset.bodyMode;
        bodyInput.value = preset.body;
        bodyFileInput.value = preset.bodyFile;
        authModeInput.value = preset.authMode;
        basicUsernameInput.value = preset.basicUsername;
        basicPasswordInput.value = preset.basicPassword;
        bearerTokenInput.value = preset.bearerToken;
        apiKeyHeaderInput.value = preset.apiKeyHeader;
        apiKeyValueInput.value = preset.apiKeyValue;
        outputFileInput.value = preset.outputFile;
        timeoutInput.value = preset.timeout;
        connectTimeoutInput.value = preset.connectTimeout;
        maxRedirectsInput.value = preset.maxRedirects;
        retryAttemptsInput.value = preset.retryAttempts;
        retryDelayInput.value = preset.retryDelay;
        limitRateInput.value = preset.limitRate;
        flagStyleInput.value = preset.flagStyle;
        followRedirectsInput.checked = preset.followRedirects;
        insecureTlsInput.checked = preset.insecureTls;
        compressedInput.checked = preset.compressed;
        failWithBodyInput.checked = preset.failWithBody;
        includeHeadersInput.checked = preset.includeHeaders;
        silentErrorsInput.checked = preset.silentErrors;
        retryAllErrorsInput.checked = preset.retryAllErrors;
        verboseInput.checked = preset.verbose;
        disableKeepAliveInput.checked = preset.disableKeepAlive;
        traceTimingInput.checked = preset.traceTiming;
        forceRequestInput.checked = preset.forceRequest;
        combineShortFlagsInput.checked = preset.combineShortFlags;
        multilineInput.checked = preset.multiline;
        httpVersionInput.value = preset.httpVersion;
        latestHeaders = preset.headers.map((header) => ({ ...header }));
        renderHeadersTable();
        clearHeaderEditor();
        updateUserAgentState();
        updateBodyModeState();
        updateAuthModeState();

        if (shouldSync !== false) {
            syncSafeStateToUrl();
        }
    }

// ns:end family._base.workspace.02_basic-settings
    function parseCommandString(command) {
        const normalizedCommand = String(command || '')
            .replace(/\\\r?\n/g, ' ')
            .replace(/`\r?\n/g, ' ')
            .replace(/\^\r?\n/g, ' ')
            .trim();
        const tokens = [];
        let currentToken = '';
        let quote = '';
        let escapeNext = false;

        for (let index = 0; index < normalizedCommand.length; index += 1) {
            const character = normalizedCommand[index];

            if (escapeNext) {
                currentToken += character;
                escapeNext = false;
                continue;
            }

            if (quote) {
                if (quote === character) {
                    quote = '';
                    continue;
                }

                if (character === '\\' && quote === '"') {
                    escapeNext = true;
                    continue;
                }

                currentToken += character;
                continue;
            }

            if (character === '\\') {
                escapeNext = true;
                continue;
            }

            if (character === '"' || character === "'" || character === '`') {
                quote = character;
                continue;
            }

            if (/\s/.test(character)) {
                if (currentToken) {
                    tokens.push(currentToken);
                    currentToken = '';
                }

                continue;
            }

            currentToken += character;
        }

        if (currentToken) {
            tokens.push(currentToken);
        }

        return tokens;
    }

    function importCommand() {
        const source = importInput.value.trim();

        if (!source) {
            showFeedback(importFeedback, 'Paste a curl command to import.', 'error');
            return;
        }

        const tokens = parseCommandString(source);

        if (tokens.length === 0 || !/^curl(?:\.exe)?$/i.test(tokens[0])) {
            showFeedback(importFeedback, 'Only commands starting with curl are supported.', 'error');
            return;
        }

        applyPreset('blank');
        shellInput.value = source.includes('`') ? 'powershell' : source.includes('^') ? 'cmd' : 'bash';
        multilineInput.checked = /\\\s*[\r\n]|`\s*[\r\n]|\^\s*[\r\n]/.test(source);
        latestHeaders = [];

        for (let index = 1; index < tokens.length; index += 1) {
            const token = tokens[index];

            if (!token.startsWith('-')) {
                if (!urlInput.value || urlInput.value === presetCatalog.blank.url) {
                    urlInput.value = token;
                }

                continue;
            }

            const nextToken = tokens[index + 1] || '';

            if (token === '-X' || token === '--request') {
                methodInput.value = String(nextToken || 'GET').toUpperCase();
                index += 1;
                continue;
            }

            if (token === '-A' || token === '--user-agent') {
                userAgentPresetInput.value = 'custom';
                customUserAgentInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '-e' || token === '--referer') {
                refererInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '-H' || token === '--header') {
                const separatorIndex = nextToken.indexOf(':');

                if (separatorIndex > 0) {
                    const headerName = nextToken.slice(0, separatorIndex).trim();
                    const headerValue = nextToken.slice(separatorIndex + 1).trim();
                    const headerNameLower = headerName.toLowerCase();

                    if (headerNameLower === 'authorization' && /^bearer\s+/i.test(headerValue)) {
                        authModeInput.value = 'bearer';
                        bearerTokenInput.value = headerValue.replace(/^bearer\s+/i, '').trim();
                    } else if (headerNameLower === 'user-agent') {
                        userAgentPresetInput.value = 'custom';
                        customUserAgentInput.value = headerValue;
                    } else if (headerNameLower === 'referer') {
                        refererInput.value = headerValue;
                    } else {
                        latestHeaders = upsertHeader(latestHeaders, headerName, headerValue);
                    }
                }

                index += 1;
                continue;
            }

            if (token === '-u' || token === '--user') {
                authModeInput.value = 'basic';
                basicUsernameInput.value = nextToken.split(':')[0] || '';
                basicPasswordInput.value = nextToken.includes(':') ? nextToken.split(':').slice(1).join(':') : '';
                index += 1;
                continue;
            }

            if (['-d', '--data', '--data-raw'].includes(token)) {
                bodyModeInput.value = 'raw';
                bodyInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '--data-binary') {
                bodyModeInput.value = 'binary';
                bodyFileInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '--data-urlencode') {
                bodyModeInput.value = 'form';
                bodyInput.value = `${bodyInput.value}${bodyInput.value ? '\n' : ''}${nextToken}`;
                index += 1;
                continue;
            }

            if (token === '-m' || token === '--max-time') {
                timeoutInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '--connect-timeout') {
                connectTimeoutInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '--max-redirs') {
                maxRedirectsInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '--retry') {
                retryAttemptsInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '--retry-delay') {
                retryDelayInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '--limit-rate') {
                limitRateInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '-o' || token === '--output') {
                outputFileInput.value = nextToken;
                index += 1;
                continue;
            }

            if (token === '-L' || token === '--location') {
                followRedirectsInput.checked = true;
                continue;
            }

            if (token === '-k' || token === '--insecure') {
                insecureTlsInput.checked = true;
                continue;
            }

            if (token === '-i' || token === '--include') {
                includeHeadersInput.checked = true;
                continue;
            }

            if (token === '-v' || token === '--verbose') {
                verboseInput.checked = true;
                continue;
            }

            if (token === '--compressed') {
                compressedInput.checked = true;
                continue;
            }

            if (token === '--fail-with-body') {
                failWithBodyInput.checked = true;
                continue;
            }

            if (token === '--retry-all-errors') {
                retryAllErrorsInput.checked = true;
                continue;
            }

            if (token === '--no-keepalive') {
                disableKeepAliveInput.checked = true;
                continue;
            }

            if (token === '--http2') {
                httpVersionInput.value = 'http2';
                continue;
            }

            if (token === '--http3') {
                httpVersionInput.value = 'http3';
                continue;
            }

            if (token === '-w' || token === '--write-out') {
                traceTimingInput.checked = true;
                index += 1;
                continue;
            }

            if (token === '--silent') {
                silentErrorsInput.checked = true;
                continue;
            }

            if (token === '--show-error') {
                silentErrorsInput.checked = true;
                continue;
            }

            if (/^-[A-Za-z]{2,}$/.test(token)) {
                token.slice(1).split('').forEach((flag) => {
                    if (flag === 'L') {
                        followRedirectsInput.checked = true;
                    }

                    if (flag === 'k') {
                        insecureTlsInput.checked = true;
                    }

                    if (flag === 'i') {
                        includeHeadersInput.checked = true;
                    }

                    if (flag === 'v') {
                        verboseInput.checked = true;
                    }

                    if (flag === 's' || flag === 'S') {
                        silentErrorsInput.checked = true;
                    }
                });
            }
        }

        renderHeadersTable();
        updateUserAgentState();
        updateBodyModeState();
        updateAuthModeState();
        syncSafeStateToUrl();
        showFeedback(importFeedback, 'Command imported successfully.', 'success');
    }

    function fallbackActionClipboardText(text) {
        const textarea = document.createElement('textarea');

        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        document.execCommand('copy');

        textarea.remove();
    }

    async function writeActionClipboardText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                fallbackActionClipboardText(text);
                return;
            }
        }

        fallbackActionClipboardText(text);
    }

    async function copyText(text, button) {
        try {
            await writeActionClipboardText(text);
            flashButton(button, 'Copied');
        } catch (error) {
            flashButton(button, 'Failed');
        }
    }

// ns:start family._base.workspace.01_input-brief
    function generateAndRender() {
        syncSafeStateToUrl();
        const query = buildQuery();
        const result = buildCommand(query);

        if (result.errors.length > 0) {
            renderResult(result);
            activateTab('generateCurlShellWarningsPanel');
            showResultError('Fix the blocking fields listed below to produce a valid cURL command.');
            return;
        }

        renderResult(result);
    }

// ns:end family._base.workspace.01_input-brief
    function resetBuilder() {
        applyPreset('blank', false);
        importInput.value = '';
        hideFeedback(importFeedback);
        hideFeedback(headerFeedback);
        clearHeaderEditor();
        resultError.classList.add('d-none');
        resultError.textContent = '';
        showEmptyState();
        setSubmitButtonLabel('Generate');
        submitButton.disabled = false;
        window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`);
    }

    initMarkdownCopyButtons();
    applyPreset(new URLSearchParams(window.location.search).get('preset') || 'blank', false);
    restoreSafeStateFromUrl();
    updateUserAgentState();
    updateBodyModeState();
    updateAuthModeState();
    renderHeadersTable();

    document.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof Node)) {
            return;
        }

    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitButton.disabled = true;
        setSubmitButtonLabel('Generating...');

        window.setTimeout(() => {
            generateAndRender();
            submitButton.disabled = false;
            setSubmitButtonLabel('Generate');
        }, 60);
    });

    resetButton.addEventListener('click', function () {
        resetBuilder();
    });

    applyPresetButton.addEventListener('click', function () {
        applyPreset(presetInput.value);
    });

    presetInput.addEventListener('change', function () {
        applyPreset(presetInput.value);
    });

    userAgentPresetInput.addEventListener('change', function () {
        updateUserAgentState();
        syncSafeStateToUrl();
    });

    bodyModeInput.addEventListener('change', function () {
        updateBodyModeState();
        syncSafeStateToUrl();
    });

    authModeInput.addEventListener('change', function () {
        updateAuthModeState();
        syncSafeStateToUrl();
    });

    addHeaderButton.addEventListener('click', function () {
        const headerName = normalizeHeaderName(headerNameInput.value);
        const headerValue = normalizeHeaderValue(headerValueInput.value);

        if (!headerName || !headerValue) {
            showFeedback(headerFeedback, 'Both header name and header value are required.', 'error');
            return;
        }

        if (editingHeaderIndex > -1) {
            latestHeaders[editingHeaderIndex] = {
                name: headerName,
                value: headerValue
            };
            showFeedback(headerFeedback, 'Header updated.', 'success');
        } else {
            latestHeaders = upsertHeader(latestHeaders, headerName, headerValue);
            showFeedback(headerFeedback, 'Header added.', 'success');
        }

        renderHeadersTable();
        clearHeaderEditor(true);
    });

    headerTableBody.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const removeIndex = target.getAttribute('data-header-remove');
        const editIndex = target.getAttribute('data-header-edit');

        if (removeIndex !== null) {
            latestHeaders.splice(Number(removeIndex), 1);
            renderHeadersTable();
            clearHeaderEditor();
            return;
        }

        if (editIndex !== null) {
            const header = latestHeaders[Number(editIndex)];

            if (!header) {
                return;
            }

            editingHeaderIndex = Number(editIndex);
            headerNameInput.value = header.name;
            headerValueInput.value = header.value;
            addHeaderButton.textContent = 'Save header';
            showFeedback(headerFeedback, `Editing ${header.name}.`, 'success');
        }
    });

    optionsTableBody.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const copyButton = target.closest('.generate-curl-shell-row-copy, .generate-curl-shell-row-copy-btn');

        if (!copyButton || !optionsTableBody.contains(copyButton)) {
            return;
        }

        const copyValue = copyButton.getAttribute('data-options-copy');

        if (copyValue === null) {
            return;
        }

        copyText(copyValue, copyButton);
    });

    importButton.addEventListener('click', function () {
        importCommand();
    });

    importClearButton.addEventListener('click', function () {
        importInput.value = '';
        hideFeedback(importFeedback);
    });

    updateSortState();

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

    sortOptionButtons.forEach((button) => {
        button.addEventListener('click', function () {
            sortInput.value = button.dataset.sortValue || 'id';
            updateSortState();

            if (latestResult) {
                renderOptionsTable(latestResult);
            }
        });
    });

    sortSelect.addEventListener('toggle', updateSortExpandedState);

    copyCommandButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(latestResult.command, copyCommandButton);
    });

    exportPdfButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        exportResultShellAsPdf('generate-curl-shell', resultContent);
        flashButton(exportPdfButton, 'Opened');
    });

    downloadCsvButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        const rows = [['Field', 'Value']].concat(getSortedSummaryRows(latestResult));
        downloadFile('generate-curl-shell-options.csv', `${convertRowsToCsv(rows)}\n`, 'text/csv;charset=utf-8');
        flashButton(downloadCsvButton, 'Downloaded');
    });

    copyJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(JSON.stringify(latestResult.jsonPayload, null, 2), copyJsonButton);
    });

    downloadJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile('generate-curl-shell.json', `${JSON.stringify(latestResult.jsonPayload, null, 2)}\n`, 'application/json;charset=utf-8');
        flashButton(downloadJsonButton, 'Downloaded');
    });

    // ns:start family._base.workspace.08_json-restore
    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });

    importJsonInput.addEventListener('change', async function () {
        const file = importJsonInput.files && importJsonInput.files[0];

        if (!file) {
            return;
        }

        try {
            applyImportedQuery(buildImportedPayloadState(JSON.parse(await file.text())));
            flashButton(importJsonButton, 'Imported');
        } catch (error) {
            showResultError(error instanceof Error ? error.message : 'The selected JSON file could not be imported.');
            flashButton(importJsonButton, 'Failed');
        } finally {
            importJsonInput.value = '';
        }
    });
    // ns:end family._base.workspace.08_json-restore

    [
        urlInput,
        shellInput,
        methodInput,
        multilineInput,
        queryStringInput,
        refererInput,
        flagStyleInput,
        combineShortFlagsInput,
        followRedirectsInput,
        insecureTlsInput,
        compressedInput,
        failWithBodyInput,
        includeHeadersInput,
        silentErrorsInput,
        retryAllErrorsInput,
        verboseInput,
        disableKeepAliveInput,
        traceTimingInput,
        forceRequestInput,
        httpVersionInput,
        timeoutInput,
        connectTimeoutInput,
        maxRedirectsInput,
        retryAttemptsInput,
        retryDelayInput,
        limitRateInput,
        outputFileInput
    ].forEach((element) => {
        element.addEventListener('change', syncSafeStateToUrl);
        element.addEventListener('input', syncSafeStateToUrl);
    });
});
/* ns:start family._base.workspace.07_table-output */
(function setupGenerateCurlShellTableOutputStandard() {
    const rootSelector = '.generate-curl-shell-tool';
    const tableSelector = '.tool-result-table tbody tr, .generate-curl-shell-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .generate-curl-shell-table tbody';
    const clampClass = 'generate-curl-shell-table-cell-text';
    const cellClampClass = 'generate-curl-shell-cell-clamp';
    const statusColumnClass = 'generate-curl-shell-table-status-cell';

    function hasActionColumn(cells, table) {
        const lastCell = cells[cells.length - 1];
        const lastHead = table ? table.querySelector('thead th:last-child') : null;
        const headText = lastHead ? String(lastHead.textContent || '') : '';

        return Boolean(
            lastCell && lastCell.querySelector('button, [data-copy-row], [data-inventory-copy-row], [data-control-copy-row], [data-options-copy], [data-operation-copy], [data-copy-value]')
        ) || /copy|action|actions/i.test(headText);
    }

    function isStatusLikeHeader(text) {
        return /^(status|signal|criticality|severity|state|health|outcome|result|level|label)$/i.test(String(text || '').trim());
    }

    function getBodyCells(row) {
        return Array.from(row.children).filter(function filterCells(cell) {
            return cell.tagName && cell.tagName.toLowerCase() === 'td';
        });
    }

    function applyStatusAlignment(root) {
        root.querySelectorAll('.tool-result-table, .generate-curl-shell-table').forEach(function alignStatusTable(table) {
            const headers = Array.from(table.querySelectorAll('thead th'));
            const rows = Array.from(table.querySelectorAll('tbody tr'));

            table.querySelectorAll('.' + statusColumnClass).forEach(function clearStatusCell(cell) {
                cell.classList.remove(statusColumnClass);
            });

            headers.forEach(function alignStatusColumn(header, index) {
                const statusLike = isStatusLikeHeader(header.textContent);
                header.classList.toggle(statusColumnClass, statusLike);

                if (!statusLike) {
                    return;
                }

                rows.forEach(function alignStatusCell(row) {
                    const cells = getBodyCells(row);
                    const cell = cells[index];

                    if (cell && cell.colSpan <= 1) {
                        cell.classList.add(statusColumnClass);
                    }
                });
            });
        });
    }

    function clampCell(cell) {
        if (!cell || cell.colSpan > 1 || cell.querySelector('.' + clampClass + ', .' + cellClampClass)) {
            return;
        }

        if (cell.children.length === 1 && !cell.firstElementChild.matches('button')) {
            cell.firstElementChild.classList.add(clampClass);
            return;
        }

        const wrapper = document.createElement('span');
        wrapper.className = clampClass;

        while (cell.firstChild) {
            wrapper.appendChild(cell.firstChild);
        }

        cell.appendChild(wrapper);
    }

    function applyTableOutputClamp() {
        const root = document.querySelector(rootSelector);
        if (!root) {
            return;
        }

        applyStatusAlignment(root);

        root.querySelectorAll(tableSelector).forEach(function clampRow(row) {
            const cells = getBodyCells(row);
            const table = row.closest('table');
            const actionColumn = hasActionColumn(cells, table);

            cells.forEach(function clampDataCell(cell, index) {
                const isFirst = index === 0;
                const isAction = actionColumn && index === cells.length - 1;

                if (isAction && cell.colSpan <= 1) {
                    cell.classList.add('tool-table-action-cell');
                    return;
                }

                if (!isFirst) {
                    clampCell(cell);
                }
            });
        });
    }

    function observeTables() {
        const root = document.querySelector(rootSelector);
        if (!root) {
            return;
        }

        root.querySelectorAll(tbodySelector).forEach(function observeBody(tbody) {
            if (tbody.dataset.tableOutputClampObserver === 'true') {
                return;
            }

            tbody.dataset.tableOutputClampObserver = 'true';
            new MutationObserver(applyTableOutputClamp).observe(tbody, {
                childList: true,
                subtree: true
            });
        });

        applyTableOutputClamp();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeTables);
    } else {
        observeTables();
    }
}());
/* ns:end family._base.workspace.07_table-output */
