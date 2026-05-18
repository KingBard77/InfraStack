// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackAssessmentWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function scopeSelectorsSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 14-14
                const familyInput = document.getElementById('__DOM_PREFIX__Family');

            // Source custom.js lines 15-15
                const familySummary = document.getElementById('__DOM_PREFIX__FamilySummary');

            // Source custom.js lines 16-16
                const familySelect = document.getElementById('__DOM_PREFIX__FamilySelect');

            // Source custom.js lines 17-17
                const familyOptionsContainer = document.getElementById('__DOM_PREFIX__FamilyOptions');

            // Source custom.js lines 18-18
                const familyResetButton = document.getElementById('__DOM_PREFIX__FamilyReset');

            // Source custom.js lines 19-19
                const sectionPathInput = document.getElementById('__DOM_PREFIX__SectionPath');

            // Source custom.js lines 20-20
                const sectionSummary = document.getElementById('__DOM_PREFIX__SectionSummary');

            // Source custom.js lines 21-21
                const sectionSelect = document.getElementById('__DOM_PREFIX__SectionSelect');

            // Source custom.js lines 22-22
                const sectionOptionsContainer = document.getElementById('__DOM_PREFIX__SectionOptions');

            // Source custom.js lines 23-23
                const sectionResetButton = document.getElementById('__DOM_PREFIX__SectionReset');

            // Source custom.js lines 24-24
                const criticalityInput = document.getElementById('__DOM_PREFIX__Criticality');

            // Source custom.js lines 25-25
                const criticalitySummary = document.getElementById('__DOM_PREFIX__CriticalitySummary');

            // Source custom.js lines 26-26
                const criticalitySelect = document.getElementById('__DOM_PREFIX__CriticalitySelect');

            // Source custom.js lines 27-27
                const criticalityOptionsContainer = document.getElementById('__DOM_PREFIX__CriticalityOptions');

            // Source custom.js lines 28-28
                const selectedControlInput = document.getElementById('__DOM_PREFIX__SelectedControl');

            // Source custom.js lines 29-29
                const controlSummary = document.getElementById('__DOM_PREFIX__ControlSummary');

            // Source custom.js lines 30-30
                const controlSelect = document.getElementById('__DOM_PREFIX__ControlSelect');

            // Source custom.js lines 31-31
                const controlOptionsContainer = document.getElementById('__DOM_PREFIX__ControlOptions');

            // Source custom.js lines 32-32
                const controlResetButton = document.getElementById('__DOM_PREFIX__ControlReset');

            // Source custom.js lines 37-37
                const rowLimitInput = document.getElementById('__DOM_PREFIX__RowLimit');

            // Source custom.js lines 38-38
                const rowLimitSummary = document.getElementById('__DOM_PREFIX__RowLimitSummary');

            // Source custom.js lines 39-39
                const rowLimitSelect = document.getElementById('__DOM_PREFIX__RowLimitSelect');

            // Source custom.js lines 40-40
                const rowLimitOptionsContainer = document.getElementById('__DOM_PREFIX__RowLimitOptions');

            // Source custom.js lines 41-41
                const criticalityRow = document.getElementById('__DOM_PREFIX__CriticalityRow');

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

            // Source custom.js lines 404-422
                function renderSelectOptions(container, options, groupName, selectedValue) {
                    container.innerHTML = options.map(function (option) {
                        const isChecked = option.value === selectedValue;
                        const metaMarkup = option.meta
                            ? `<span class="__TOOL_CLASS__-select-meta">${escapeHtml(option.meta)}</span>`
                            : '';

                        return `
                            <label class="__TOOL_CLASS__-select-card">
                              <input type="radio" name="${escapeHtml(groupName)}" value="${escapeHtml(option.value)}"${isChecked ? ' checked' : ''}>
                              <span>
                                <span class="__TOOL_CLASS__-select-title">${escapeHtml(option.title)}</span>
                                ${metaMarkup}
                              </span>
                            </label>
                        `;
                    }).join('');
                }

            // Source custom.js lines 436-447
                function renderControlOptions(controlList, selectedValue) {
                    if (controlList.length === 0) {
                        controlOptionsContainer.innerHTML = '<div class="__TOOL_CLASS__-select-empty">No matched scripts in the current scope.</div>';
                        controlSelect.classList.add('__TOOL_CLASS__-select-inactive');
                        return;
                    }

                    controlSelect.classList.remove('__TOOL_CLASS__-select-inactive');

                    renderSelectOptions(controlOptionsContainer, buildControlCatalog(controlList), '__DOM_PREFIX__ControlOption', selectedValue);
                }

            // Source custom.js lines 505-520
                function renderStaticSelects(state, filteredControls, selectedControl) {
                    renderSelectOptions(familyOptionsContainer, familyCatalog, '__DOM_PREFIX__FamilyOption', state.family);
                    renderSelectOptions(sectionOptionsContainer, buildSectionCatalog(state.family), '__DOM_PREFIX__SectionOption', state.sectionPath);
                    renderSelectOptions(criticalityOptionsContainer, criticalityCatalog, '__DOM_PREFIX__CriticalityOption', state.criticality);
                    renderSortOptions(sortOptionsContainer, sortCatalog, state.sort);
                    renderSelectOptions(rowLimitOptionsContainer, rowLimitCatalog, '__DOM_PREFIX__RowLimitOption', state.rowLimit);
                    renderControlOptions(filteredControls, state.selectedControl);

                    updateSelectSummary(familySummary, familyCatalog, state.family, 'All sections');
                    updateSelectSummary(sectionSummary, buildSectionCatalog(state.family), state.sectionPath, 'All paths');
                    updateSelectSummary(criticalitySummary, criticalityCatalog, state.criticality, 'All criticality');
                    updateSelectSummary(sortSummary, sortCatalog, state.sort, 'ID');
                    updateSelectSummary(rowLimitSummary, rowLimitCatalog, state.rowLimit, '50 rows');
                    controlSummary.textContent = controlSummaryText(selectedControl);
                }

            // Source custom.js lines 562-574
                function renderCriticalityOverview() {
                    const counts = controls.reduce(function (accumulator, control) {
                        const key = Number(control.criticality) === 0 ? 'unspecified' : 'low';
                        accumulator[key] = (accumulator[key] || 0) + 1;
                        return accumulator;
                    }, {});

                    criticalityRow.innerHTML = `
                        <span class="__TOOL_CLASS__-criticality-pill" data-tone="low"><strong>${counts.low || 0}</strong><span>Low</span></span>
                        <span class="__TOOL_CLASS__-criticality-pill" data-tone="unspecified"><strong>${counts.unspecified || 0}</strong><span>Unspecified</span></span>
                    `;
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

            // Source custom.js lines 1258-1267
                function syncInputsFromResult(result) {
                    familyInput.value = result.state.family;
                    sectionPathInput.value = result.state.sectionPath;
                    criticalityInput.value = result.state.criticality;
                    selectedControlInput.value = result.state.selectedControl;
                    sortInput.value = result.state.sort;
                    rowLimitInput.value = result.state.rowLimit;
                    renderStaticSelects(result.state, result.filteredControls, result.selectedControl);
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

            // Source custom.js lines 1313-1333
                syncUrlQuery(initialResult);

                attachRadioChangeHandler(familyOptionsContainer, familyInput, familySelect, function () {
                    sectionPathInput.value = 'all';
                    selectedControlInput.value = '';
                    renderExplorer();
                });
                attachRadioChangeHandler(sectionOptionsContainer, sectionPathInput, sectionSelect, function () {
                    selectedControlInput.value = '';
                    renderExplorer();
                });
                attachRadioChangeHandler(criticalityOptionsContainer, criticalityInput, criticalitySelect, function () {
                    selectedControlInput.value = '';
                    renderExplorer();
                });
                attachRadioChangeHandler(controlOptionsContainer, selectedControlInput, controlSelect, function () {
                    renderExplorer();
                    if (latestResult) {
                        activateTab('__DOM_PREFIX__ScriptPanel');
                    }
                });

            // Source custom.js lines 1334-1338
                attachSortButtonHandler();
                attachRadioChangeHandler(rowLimitOptionsContainer, rowLimitInput, rowLimitSelect, function () {
                    renderExplorer();
                });

            // Source custom.js lines 1339-1344
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    selectedControlInput.value = '';
                    renderExplorer({ showResult: true });
                });

            // Source custom.js lines 1345-1351
                familyResetButton.addEventListener('click', function () {
                    familyInput.value = 'all';
                    sectionPathInput.value = 'all';
                    selectedControlInput.value = '';
                    renderExplorer();
                });

            // Source custom.js lines 1352-1357
                sectionResetButton.addEventListener('click', function () {
                    sectionPathInput.value = 'all';
                    selectedControlInput.value = '';
                    renderExplorer();
                });

            // Source custom.js lines 1358-1365
                controlResetButton.addEventListener('click', function () {
                    selectedControlInput.value = '';
                    renderExplorer();
                    if (latestResult) {
                        activateTab('__DOM_PREFIX__ScriptPanel');
                    }
                });

            // Source custom.js lines 1372-1393
                controlsTableBody.addEventListener('click', function (event) {
                    const target = event.target instanceof HTMLElement ? event.target : null;
                    const copyButton = target ? target.closest('.__TOOL_CLASS__-row-copy') : null;

                    if (copyButton && controlsTableBody.contains(copyButton)) {
                        event.preventDefault();
                        event.stopPropagation();
                        void copyControlRow(copyButton.dataset.controlCopyRow || '', copyButton);
                        return;
                    }

                    const row = target ? target.closest('tr[data-control-path]') : null;

                    if (!row) {
                        return;
                    }

                    selectedControlInput.value = row.getAttribute('data-control-path') || '';
                    renderExplorer();
                    activateTab('__DOM_PREFIX__ScriptPanel');
                });
        }

        return {
            sourceTool: 'templates/content/tools/cis/assess-ubuntu-2204-cis/',
            sourceJsLines: [[14, 14], [15, 15], [16, 16], [17, 17], [18, 18], [19, 19], [20, 20], [21, 21], [22, 22], [23, 23], [24, 24], [25, 25], [26, 26], [27, 27], [28, 28], [29, 29], [30, 30], [31, 31], [32, 32], [37, 37], [38, 38], [39, 39], [40, 40], [41, 41], [132, 187], [404, 422], [436, 447], [505, 520], [562, 574], [590, 601], [1258, 1267], [1303, 1310], [1313, 1333], [1334, 1338], [1339, 1344], [1345, 1351], [1352, 1357], [1358, 1365], [1372, 1393]],
            sourceDomIds: ['assessUbuntu2204CisControlOptions', 'assessUbuntu2204CisControlReset', 'assessUbuntu2204CisControlSelect', 'assessUbuntu2204CisControlSummary', 'assessUbuntu2204CisCriticality', 'assessUbuntu2204CisCriticalityOptions', 'assessUbuntu2204CisCriticalityRow', 'assessUbuntu2204CisCriticalitySelect', 'assessUbuntu2204CisCriticalitySummary', 'assessUbuntu2204CisFamily', 'assessUbuntu2204CisFamilyOptions', 'assessUbuntu2204CisFamilyReset', 'assessUbuntu2204CisFamilySelect', 'assessUbuntu2204CisFamilySummary', 'assessUbuntu2204CisRowLimit', 'assessUbuntu2204CisRowLimitOptions', 'assessUbuntu2204CisRowLimitSelect', 'assessUbuntu2204CisRowLimitSummary', 'assessUbuntu2204CisSectionOptions', 'assessUbuntu2204CisSectionPath', 'assessUbuntu2204CisSectionReset', 'assessUbuntu2204CisSectionSelect', 'assessUbuntu2204CisSectionSummary', 'assessUbuntu2204CisSelectedControl'],
            sourceClasses: ['assess-ubuntu-2204-cis-advanced', 'assess-ubuntu-2204-cis-advanced-body', 'assess-ubuntu-2204-cis-advanced-summary', 'assess-ubuntu-2204-cis-basic-panel', 'assess-ubuntu-2204-cis-criticality-row', 'assess-ubuntu-2204-cis-inner-panel', 'assess-ubuntu-2204-cis-select', 'assess-ubuntu-2204-cis-select-body', 'assess-ubuntu-2204-cis-select-body-scroll', 'assess-ubuntu-2204-cis-select-grid', 'assess-ubuntu-2204-cis-select-grid-two', 'assess-ubuntu-2204-cis-select-mini-btn', 'assess-ubuntu-2204-cis-select-summary', 'assess-ubuntu-2204-cis-select-tools', 'assess-ubuntu-2204-cis-setting-field', 'assess-ubuntu-2204-cis-setting-label', 'assess-ubuntu-2204-cis-setting-row', 'info-dot'],
            sourceVariables: ['controlOptionsContainer', 'controlResetButton', 'controlSelect', 'controlSummary', 'criticalityInput', 'criticalityOptionsContainer', 'criticalityRow', 'criticalitySelect', 'criticalitySummary', 'familyInput', 'familyOptionsContainer', 'familyResetButton', 'familySelect', 'familySummary', 'rowLimitInput', 'rowLimitOptionsContainer', 'rowLimitSelect', 'rowLimitSummary', 'sectionOptionsContainer', 'sectionPathInput', 'sectionResetButton', 'sectionSelect', 'sectionSummary', 'selectedControlInput'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.scopeSelectorsSourceSection = scopeSelectorsSourceSection;
    global.InfraStackAssessmentWorkspaceSections = registry;
}(window));
