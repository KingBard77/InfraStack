// section.js
(function attachBaseJsonRestoreSourceSection(global) {
    const registry = global.InfraStackBaseWorkspaceSections || {};
    const source = {
        section: '08_json-restore',
        title: 'json restore',
        role: 'neutral JSON output, import input, and restore status frame',
        compatibilitySections: [
            '07_table',
            '08_json-restore',
            '09_result-table'
        ],
        sourceDomIds: [
            '__DOM_PREFIX__JsonRestoreShell',
            '__DOM_PREFIX__JsonPanel',
            '__DOM_PREFIX__JsonOutput',
            '__DOM_PREFIX__ImportJson',
            '__DOM_PREFIX__JsonRestoreStatus',
            '__DOM_PREFIX__JsonRestoreEmpty'
        ],
        sourceClasses: [
            '__PREFIX__-json-restore-shell',
            '__PREFIX__-json-card',
            '__PREFIX__-json-head',
            '__PREFIX__-json-title-wrap',
            '__PREFIX__-json-title',
            '__PREFIX__-json-helper',
            '__PREFIX__-json-status',
            '__PREFIX__-json-output',
            '__PREFIX__-json-empty',
            '__PREFIX__-json-key',
            '__PREFIX__-json-string',
            '__PREFIX__-json-number',
            '__PREFIX__-json-boolean',
            '__PREFIX__-json-null',
            '__PREFIX__-import-input',
            'tool-json-panel',
            'tool-json-head',
            'tool-json-title',
            'tool-json-output'
        ],
        sourcePlaceholders: [
            '__JSON_RESTORE_ARIA_LABEL__',
            '__JSON_RESTORE_TITLE__',
            '__JSON_RESTORE_HELPER__',
            '__JSON_RESTORE_EMPTY_TEXT__',
            '__JSON_RESTORE_ACCEPT__'
        ],
        sourceBehaviours: [
            'renders JSON output inside a framed card',
            'uses a neutral role=region card instead of a section element to avoid global section padding',
            'keeps a visible JSON title before the code frame',
            'provides a restore status slot near the JSON title',
            'keeps empty JSON state explicit',
            'uses a hidden application/json import file input',
            'applies JSON syntax color highlighting by default',
            'keeps JSON readable when syntax highlighting is explicitly disabled',
            'keeps long JSON horizontally scrollable',
            'requires family or final tool code to validate imported schema before mutating state',
            'does not define family payload schema, restore mapping, export payloads, or state mutation'
        ]
    };

    /**
     * Returns the base JSON restore workspace source metadata.
     *
     * @returns {Record<string, unknown>} Section source metadata.
     */
    function baseJsonRestoreSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    /**
     * Escapes text so JSON can be rendered as HTML safely.
     *
     * @param {unknown} value Value to escape.
     * @returns {string} HTML-safe text.
     */
    function escapeBaseJsonHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Adds neutral syntax highlighting spans to a JSON string.
     *
     * @param {string} jsonText Formatted JSON string.
     * @returns {string} Highlighted HTML string.
     */
    function highlightBaseJsonText(jsonText) {
        return escapeBaseJsonHtml(jsonText).replace(
            /(&quot;(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\&])*&quot;(?:\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function highlightToken(match) {
                let tokenClass = 'number';

                if (match.startsWith('&quot;')) {
                    tokenClass = match.endsWith(':') ? 'key' : 'string';
                } else if (match === 'true' || match === 'false') {
                    tokenClass = 'boolean';
                } else if (match === 'null') {
                    tokenClass = 'null';
                }

                return '<span class="__PREFIX__-json-' + tokenClass + ' tool-json-' + tokenClass + '">' + match + '</span>';
            }
        );
    }

    /**
     * Applies JSON syntax highlighting to an existing code element.
     *
     * @param {HTMLElement} outputElement JSON code element.
     * @returns {boolean} True when highlighting completed.
     */
    function applyBaseJsonSyntaxHighlight(outputElement) {
        if (!outputElement) {
            return false;
        }

        outputElement.innerHTML = highlightBaseJsonText(outputElement.textContent || '{}');
        outputElement.dataset.baseJsonHighlighted = 'true';
        return true;
    }

    /**
     * Applies JSON syntax highlighting to all base JSON outputs in a root element.
     *
     * @param {ParentNode} [root] Root node to scan.
     * @returns {number} Number of JSON output elements highlighted.
     */
    function applyBaseJsonRestoreSyntax(root) {
        const scanRoot = root || global.document;
        const outputs = scanRoot.querySelectorAll('.__PREFIX__-json-output code, .tool-json-output code');
        let highlighted = 0;

        outputs.forEach(function highlightOutput(outputElement) {
            if (outputElement.dataset.baseJsonHighlighted === 'true') {
                return;
            }

            if (applyBaseJsonSyntaxHighlight(outputElement)) {
                highlighted += 1;
            }
        });

        return highlighted;
    }

    /**
     * Renders a JSON payload into a code element.
     *
     * @param {HTMLElement} outputElement Code or pre element that receives JSON.
     * @param {unknown} payload JSON-serializable payload.
     * @param {{highlight?: boolean}} [options] Render options.
     * @returns {boolean} True when rendering completed.
     */
    function renderBaseJsonOutput(outputElement, payload, options) {
        if (!outputElement) {
            return false;
        }

        const jsonText = JSON.stringify(payload == null ? {} : payload, null, 2);

        if (options && options.highlight === false) {
            outputElement.textContent = jsonText;
            outputElement.dataset.baseJsonHighlighted = 'false';
        } else {
            outputElement.innerHTML = highlightBaseJsonText(jsonText);
            outputElement.dataset.baseJsonHighlighted = 'true';
        }

        return true;
    }

    /**
     * Reads and parses the selected JSON file from a file input.
     *
     * @param {HTMLInputElement} input File input configured for JSON import.
     * @returns {Promise<unknown>} Parsed JSON payload.
     */
    async function readBaseJsonImport(input) {
        const file = input && input.files && input.files[0];

        if (!file) {
            throw new Error('Select a JSON file to import.');
        }

        return JSON.parse(await file.text());
    }

    /**
     * Updates the restore status slot.
     *
     * @param {HTMLElement} statusElement Status element near the JSON title.
     * @param {string} message Visible status message.
     * @param {'success'|'error'|''} tone Status tone.
     * @returns {boolean} True when status was updated.
     */
    function setBaseJsonRestoreStatus(statusElement, message, tone) {
        if (!statusElement) {
            return false;
        }

        statusElement.textContent = message || '';
        statusElement.classList.toggle('is-hidden', !message);
        statusElement.classList.toggle('is-success', tone === 'success');
        statusElement.classList.toggle('is-error', tone === 'error');
        return true;
    }

    registry.baseJsonRestoreSourceSection = baseJsonRestoreSourceSection;
    registry.jsonRestore = baseJsonRestoreSourceSection;
    registry.applyBaseJsonSyntaxHighlight = applyBaseJsonSyntaxHighlight;
    registry.applyBaseJsonRestoreSyntax = applyBaseJsonRestoreSyntax;
    registry.highlightBaseJsonText = highlightBaseJsonText;
    registry.renderBaseJsonOutput = renderBaseJsonOutput;
    registry.readBaseJsonImport = readBaseJsonImport;
    registry.setBaseJsonRestoreStatus = setBaseJsonRestoreStatus;
    global.InfraStackBaseWorkspaceSections = registry;

    if (global.document && global.document.readyState === 'loading') {
        global.document.addEventListener('DOMContentLoaded', function handleBaseJsonRestoreReady() {
            applyBaseJsonRestoreSyntax(global.document);
        });
    } else if (global.document) {
        applyBaseJsonRestoreSyntax(global.document);
    }
}(window));
