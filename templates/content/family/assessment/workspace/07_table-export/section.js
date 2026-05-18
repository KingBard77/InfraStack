// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackAssessmentWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function outputToolbarSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 33-33
                const sortInput = document.getElementById('__DOM_PREFIX__Sort');

            // Source custom.js lines 34-34
                const sortSummary = document.getElementById('__DOM_PREFIX__SortSummary');

            // Source custom.js lines 35-35
                const sortSelect = document.getElementById('__DOM_PREFIX__SortSelect');

            // Source custom.js lines 36-36
                const sortOptionsContainer = document.getElementById('__DOM_PREFIX__SortOptions');

            // Source custom.js lines 46-46
                const toolbarMeta = document.getElementById('__DOM_PREFIX__ToolbarMeta');

            // Source custom.js lines 52-52
                const copyScriptButton = document.getElementById('__DOM_PREFIX__CopyScript');

            // Source custom.js lines 53-53
                const downloadScriptButton = document.getElementById('__DOM_PREFIX__DownloadScript');

            // Source custom.js lines 54-54
                const exportPdfButton = document.getElementById('__DOM_PREFIX__ExportPdf');

            // Source custom.js lines 55-55
                const downloadCsvButton = document.getElementById('__DOM_PREFIX__DownloadCsv');

            // Source custom.js lines 56-56
                const copyJsonButton = document.getElementById('__DOM_PREFIX__CopyJson');

            // Source custom.js lines 57-57
                const downloadJsonButton = document.getElementById('__DOM_PREFIX__DownloadJson');

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

            // Source custom.js lines 541-561
                function attachSortButtonHandler() {
                    sortOptionsContainer.addEventListener('click', function (event) {
                        const target = event.target instanceof HTMLElement ? event.target : null;
                        const button = target ? target.closest('button[data-sort-value]') : null;

                        if (!button || !sortOptionsContainer.contains(button)) {
                            return;
                        }

                        sortInput.value = button.getAttribute('data-sort-value') || 'id';
                        sortSelect.removeAttribute('open');
                        renderExplorer();
                    });

                    sortSelect.addEventListener('keydown', function (event) {
                        if (event.key === 'Escape') {
                            sortSelect.removeAttribute('open');
                        }
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

            // Source custom.js lines 792-808
                function renderToolbarMeta(result) {
                    const rowLimitLabel = normalizeRowLimit(result.state.rowLimit) === 'all'
                        ? 'All rows'
                        : `${normalizeRowLimit(result.state.rowLimit)} row limit`;
                    const selectedLabel = result.selectedControl
                        ? result.selectedControl.id
                        : 'None';

                    toolbarMeta.innerHTML = `
                        <span class="__TOOL_CLASS__-toolbar-pill">Family scope: ${result.familyScopedControls.length}</span>
                        <span class="__TOOL_CLASS__-toolbar-pill">Section scope: ${result.sectionScopedControls.length}</span>
                        <span class="__TOOL_CLASS__-toolbar-pill">Criticality scope: ${result.criticalityScopedControls.length}</span>
                        <span class="__TOOL_CLASS__-toolbar-pill">${escapeHtml(rowLimitLabel)}</span>
                        <span class="__TOOL_CLASS__-toolbar-pill">Selected: ${escapeHtml(selectedLabel)}</span>
                    `;
                }

            // Source custom.js lines 809-847
                function renderControlsTable(result) {
                    if (result.visibleControls.length === 0) {
                        controlsTableBody.innerHTML = `
                            <tr class="__TOOL_CLASS__-empty-row">
                              <td colspan="7">No scripts matched the current filter.</td>
                            </tr>
                        `;
                        return;
                    }

                    controlsTableBody.innerHTML = result.visibleControls.map(function (control, index) {
                        const criticalityLabel = formatCriticalityLabel(control.criticality, control.criticality_label);
                        const isSelected = result.selectedControl && result.selectedControl.script_path === control.script_path;
                        const sectionDisplay = control.section_label || control.section_path;
                        const scriptDisplay = control.script_name || control.script_path;

                        return `
                            <tr data-control-path="${escapeHtml(control.script_path)}" class="${isSelected ? '__TOOL_CLASS__-control-row-selected' : ''}">
                              <td class="tool-generated-rownum-cell">${index + 1}</td>
                              <td><span class="__TOOL_CLASS__-control-id">${escapeHtml(control.id)}</span></td>
                              <td><span class="__TOOL_CLASS__-title-text">${escapeHtml(control.title)}</span></td>
                              <td>
                                <div class="__TOOL_CLASS__-section-cell">
                                  <span class="__TOOL_CLASS__-path-text" title="${escapeHtml(control.section_path)}">${escapeHtml(sectionDisplay)}</span>
                                  <span class="__TOOL_CLASS__-section-family">${escapeHtml(control.family_label)}</span>
                                </div>
                              </td>
                              <td><span class="__TOOL_CLASS__-criticality-badge" data-tone="${escapeHtml(criticalityTone(control.criticality))}">${escapeHtml(criticalityLabel)}</span></td>
                              <td><span class="__TOOL_CLASS__-script-text" title="${escapeHtml(control.script_path)}">${escapeHtml(scriptDisplay)}</span></td>
                              <td class="__TOOL_CLASS__-table-action-cell">
                                <button type="button" class="__TOOL_CLASS__-row-copy" data-control-copy-row="${index}" aria-label="Copy control row ${index + 1}" title="Copy control row">
                                  <i class="bi bi-clipboard" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                        `;
                    }).join('');
                }

            // Source custom.js lines 938-942
                function toggleScriptButtons(isEnabled) {
                    copyScriptButton.disabled = !isEnabled;
                    downloadScriptButton.disabled = !isEnabled;
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

            // Source custom.js lines 1394-1406
                copyScriptButton.addEventListener('click', function () {
                    if (
                        !latestResult ||
                        !latestResult.selectedControl ||
                        typeof latestResult.selectedControl.script_content !== 'string' ||
                        latestResult.selectedControl.script_content === ''
                    ) {
                        return;
                    }

                    copyText(copyScriptButton, latestResult.selectedControl.script_content);
                });

            // Source custom.js lines 1407-1420
                downloadScriptButton.addEventListener('click', function () {
                    if (
                        !latestResult ||
                        !latestResult.selectedControl ||
                        typeof latestResult.selectedControl.script_content !== 'string' ||
                        latestResult.selectedControl.script_content === ''
                    ) {
                        return;
                    }

                    downloadFile(latestResult.selectedControl.script_name || 'cis-script.sh', latestResult.selectedControl.script_content, 'text/x-shellscript;charset=utf-8');
                    flashButton(downloadScriptButton, 'Saved');
                });

            // Source custom.js lines 1421-1429
                exportPdfButton.addEventListener('click', function () {
                    if (!latestResult) {
                        return;
                    }

                    exportResultShellAsPdf('__TOOL_CLASS__', resultContent);
                    flashButton(exportPdfButton, 'Opened');
                });

            // Source custom.js lines 1430-1438
                downloadCsvButton.addEventListener('click', function () {
                    if (!latestResult) {
                        return;
                    }

                    downloadFile('__TOOL_CLASS__.csv', latestResult.csv, 'text/csv;charset=utf-8');
                    flashButton(downloadCsvButton, 'Saved');
                });

            // Source custom.js lines 1439-1446
                copyJsonButton.addEventListener('click', function () {
                    if (!latestResult) {
                        return;
                    }

                    copyText(copyJsonButton, JSON.stringify(latestResult.jsonPayload, null, 2));
                });

            // Source custom.js lines 1447-1454
                downloadJsonButton.addEventListener('click', function () {
                    if (!latestResult) {
                        return;
                    }

                    downloadFile('__TOOL_CLASS__.json', JSON.stringify(latestResult.jsonPayload, null, 2), 'application/json;charset=utf-8');
                    flashButton(downloadJsonButton, 'Saved');
                });
        }

        return {
            sourceTool: 'templates/content/tools/cis/assess-ubuntu-2204-cis/',
            sourceJsLines: [[33, 33], [34, 34], [35, 35], [36, 36], [46, 46], [52, 52], [53, 53], [54, 54], [55, 55], [56, 56], [57, 57], [132, 187], [505, 520], [541, 561], [590, 601], [792, 808], [809, 847], [938, 942], [1258, 1267], [1303, 1310], [1394, 1406], [1407, 1420], [1421, 1429], [1430, 1438], [1439, 1446], [1447, 1454]],
            sourceDomIds: ['assessUbuntu2204CisCopyJson', 'assessUbuntu2204CisCopyScript', 'assessUbuntu2204CisDownloadCsv', 'assessUbuntu2204CisDownloadJson', 'assessUbuntu2204CisDownloadScript', 'assessUbuntu2204CisExportPdf', 'assessUbuntu2204CisSort', 'assessUbuntu2204CisSortOptions', 'assessUbuntu2204CisSortSelect', 'assessUbuntu2204CisSortSummary', 'assessUbuntu2204CisToolbarMeta'],
            sourceClasses: ['assess-ubuntu-2204-cis-action-btn', 'assess-ubuntu-2204-cis-sort-grid', 'assess-ubuntu-2204-cis-sort-label', 'assess-ubuntu-2204-cis-sort-menu', 'assess-ubuntu-2204-cis-sort-select', 'assess-ubuntu-2204-cis-sort-shell', 'assess-ubuntu-2204-cis-sort-summary', 'assess-ubuntu-2204-cis-sort-wrap', 'assess-ubuntu-2204-cisbar', 'assess-ubuntu-2204-cisbar-actions', 'assess-ubuntu-2204-cisbar-left', 'assess-ubuntu-2204-cisbar-meta', 'assess-ubuntu-2204-cisbar-shell', 'bi', 'bi-clipboard', 'bi-download', 'bi-filetype-pdf', 'tool-result-action-btn', 'tool-result-toolbar', 'tool-result-toolbar-actions', 'tool-result-toolbar-main'],
            sourceVariables: ['copyJsonButton', 'copyScriptButton', 'downloadCsvButton', 'downloadJsonButton', 'downloadScriptButton', 'exportPdfButton', 'sortInput', 'sortOptionsContainer', 'sortSelect', 'sortSummary', 'toolbarMeta'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.outputToolbarSourceSection = outputToolbarSourceSection;
    global.InfraStackAssessmentWorkspaceSections = registry;
}(window));
