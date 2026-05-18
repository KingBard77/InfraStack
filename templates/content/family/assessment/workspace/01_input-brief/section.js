// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackAssessmentWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function assessmentFilterSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 12-12
                const queryInput = document.getElementById('__DOM_PREFIX__Query');

            // Source custom.js lines 13-13
                const submitButton = document.getElementById('__DOM_PREFIX__Submit');

            // Source custom.js lines 58-58
                const tabButtons = Array.from(document.querySelectorAll('.__TOOL_CLASS__-tab-btn'));

            // Source custom.js lines 132-187
                if (
                    !form ||
                    !queryInput ||
                    !submitButton ||
                    !familyInput ||
                    !familySummary ||
                    !familySelect ||
                    !familyOptionsContainer ||
                    !familyResetButton ||
                    !sectionPathInput ||
                    !sectionSummary ||
                    !sectionSelect ||
                    !sectionOptionsContainer ||
                    !sectionResetButton ||
                    !criticalityInput ||
                    !criticalitySummary ||
                    !criticalitySelect ||
                    !criticalityOptionsContainer ||
                    !selectedControlInput ||
                    !controlSummary ||
                    !controlSelect ||
                    !controlOptionsContainer ||
                    !controlResetButton ||
                    !sortInput ||
                    !sortSummary ||
                    !sortSelect ||
                    !sortOptionsContainer ||
                    !rowLimitInput ||
                    !rowLimitSummary ||
                    !rowLimitSelect ||
                    !rowLimitOptionsContainer ||
                    !criticalityRow ||
                    !resultEmpty ||
                    !resultError ||
                    !resultContent ||
                    !resultSummary ||
                    !toolbarMeta ||
                    !controlsTableBody ||
                    !sectionsTableBody ||
                    !scriptMeta ||
                    !scriptOutput ||
                    !jsonOutput ||
                    !copyScriptButton ||
                    !downloadScriptButton ||
                    !exportPdfButton ||
                    !downloadCsvButton ||
                    !copyJsonButton ||
                    !downloadJsonButton ||
                    controls.length === 0 ||
                    sections.length === 0 ||
                    tabButtons.length === 0 ||
                    tabPanels.length === 0
                ) {
                    return;
                }

            // Source custom.js lines 188-283
                function initMarkdownCopyButtons() {
                    const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.__TOOL_CLASS__-prompt-pre'));
                    const promptCopyButtons = document.querySelectorAll('.__TOOL_CLASS__-prompt-copy-btn');

                    promptCopyButtons.forEach(function (button) {
                        const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
                        const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
                        const code = promptBlock ? promptBlock.querySelector('code') : null;

                        if (!code) {
                            button.disabled = true;
                            return;
                        }

                        button.addEventListener('click', async function (event) {
                            event.preventDefault();
                            event.stopPropagation();

                            try {
                                await navigator.clipboard.writeText(code.textContent.trim());
                                flashButton(button.querySelector('span') || button, 'Copied');
                                button.classList.add('copied');
                                window.setTimeout(function () {
                                    button.classList.remove('copied');
                                }, 1400);
                            } catch (error) {
                                flashButton(button.querySelector('span') || button, 'Failed');
                            }
                        });
                    });

                    const commandBlocks = Array.from(document.querySelectorAll('.markdown-content pre.__TOOL_CLASS__-command-example-pre'));
                    const commandCopyButtons = document.querySelectorAll('.__TOOL_CLASS__-command-copy-btn');

                    commandCopyButtons.forEach(function (button) {
                        const commandIndex = Number.parseInt(button.dataset.commandCopyIndex || '', 10);
                        const commandBlock = Number.isFinite(commandIndex) ? commandBlocks[commandIndex] : null;
                        const code = commandBlock ? commandBlock.querySelector('code') : null;

                        if (!code) {
                            button.disabled = true;
                            return;
                        }

                        button.addEventListener('click', async function (event) {
                            event.preventDefault();
                            event.stopPropagation();

                            try {
                                await navigator.clipboard.writeText(code.textContent.trim());
                                flashButton(button.querySelector('span') || button, 'Copied');
                                button.classList.add('copied');
                                window.setTimeout(function () {
                                    button.classList.remove('copied');
                                }, 1400);
                            } catch (error) {
                                flashButton(button.querySelector('span') || button, 'Failed');
                            }
                        });
                    });

                    const codeBlocks = document.querySelectorAll('.markdown-content pre:not(.__TOOL_CLASS__-prompt-pre):not(.__TOOL_CLASS__-command-example-pre)');

                    codeBlocks.forEach(function (pre) {
                        if (pre.querySelector('.markdown-copy-btn')) {
                            return;
                        }

                        const code = pre.querySelector('code');

                        if (!code) {
                            return;
                        }

                        const button = document.createElement('button');
                        button.type = 'button';
                        button.className = 'markdown-copy-btn';
                        button.textContent = 'Copy';

                        button.addEventListener('click', async function () {
                            try {
                                await navigator.clipboard.writeText(code.textContent.trim());
                                flashButton(button, 'Copied');
                                button.classList.add('copied');
                                window.setTimeout(function () {
                                    button.classList.remove('copied');
                                }, 1400);
                            } catch (error) {
                                flashButton(button, 'Failed');
                            }
                        });

                        pre.appendChild(button);
                    });
                }

            // Source custom.js lines 590-601
                function buildState() {
                    return {
                        query: String(queryInput.value || '').trim(),
                        family: familyInput.value || 'all',
                        sectionPath: sectionPathInput.value || 'all',
                        criticality: criticalityInput.value || 'all',
                        selectedControl: selectedControlInput.value || '',
                        sort: sortInput.value || 'id',
                        rowLimit: rowLimitInput.value || '50'
                    };
                }

            // Source custom.js lines 1303-1310
                const initialState = normalizeState(readStateFromUrl());
                queryInput.value = initialState.query;
                familyInput.value = initialState.family;
                sectionPathInput.value = initialState.sectionPath;
                criticalityInput.value = initialState.criticality;
                selectedControlInput.value = initialState.selectedControl;
                sortInput.value = initialState.sort;
                rowLimitInput.value = initialState.rowLimit;
        }

        return {
            sourceTool: 'templates/content/tools/cis/assess-ubuntu-2204-cis/',
            sourceJsLines: [[12, 12], [13, 13], [58, 58], [132, 187], [188, 283], [590, 601], [1303, 1310]],
            sourceDomIds: ['assessUbuntu2204CisQuery', 'assessUbuntu2204CisSubmit'],
            sourceClasses: ['assess-ubuntu-2204-cis-main-input-grid', 'assess-ubuntu-2204-cis-main-label', 'assess-ubuntu-2204-cis-main-row', 'assess-ubuntu-2204-cis-submit-btn', 'btn', 'btn-primary', 'form-control', 'info-dot'],
            sourceVariables: ['queryInput', 'submitButton'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.assessmentFilterSourceSection = assessmentFilterSourceSection;
    global.InfraStackAssessmentWorkspaceSections = registry;
}(window));
