// section.js


// Source section: 06_result-view
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackAssessmentWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function findingsTableSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 47-47
                const controlsTableBody = document.getElementById('__DOM_PREFIX__ControlsTableBody');

            // Source custom.js lines 59-60
                const tabPanels = Array.from(document.querySelectorAll('.__TOOL_CLASS__-tab-panel'));

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

            // Source custom.js lines 423-435
                function renderSortOptions(container, options, selectedValue) {
                    container.innerHTML = options.map(function (option) {
                        const isActive = option.value === selectedValue;
                        const metaAttribute = option.meta ? ` title="${escapeHtml(option.meta)}"` : '';

                        return `
                            <button type="button" class="__TOOL_CLASS__-sort-option${isActive ? ' is-active' : ''}" data-sort-value="${escapeHtml(option.value)}" aria-pressed="${isActive ? 'true' : 'false'}"${metaAttribute}>
                              ${escapeHtml(option.title)}
                            </button>
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

            // Source custom.js lines 575-589
                function activateTab(targetId) {
                    tabButtons.forEach(function (button) {
                        const isActive = button.dataset.tabTarget === targetId;
                        button.classList.toggle('active', isActive);
                        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
                        button.tabIndex = isActive ? 0 : -1;
                    });

                    tabPanels.forEach(function (panel) {
                        const isActive = panel.id === targetId;
                        panel.classList.toggle('active', isActive);
                        panel.hidden = !isActive;
                    });
                }

            // Source custom.js lines 747-791
                function buildSummaryMarkup(result) {
                    const queryBadge = result.state.query
                        ? `<span class="__TOOL_CLASS__-badge">Filter: ${escapeHtml(result.state.query)}</span>`
                        : '';
                    const familyBadge = `<span class="__TOOL_CLASS__-badge">Family: ${escapeHtml(result.state.family === 'all' ? 'All sections' : result.state.family)}</span>`;
                    const sectionBadge = `<span class="__TOOL_CLASS__-badge">Section: ${escapeHtml(result.state.sectionPath === 'all' ? 'All paths' : result.state.sectionPath)}</span>`;
                    const criticalityBadge = `<span class="__TOOL_CLASS__-badge">Criticality: ${escapeHtml(findOptionByValue(criticalityCatalog, result.state.criticality).title)}</span>`;
                    const selectedMeta = result.selectedControl
                        ? `${escapeHtml(result.selectedControl.id)} • ${escapeHtml(result.selectedControl.script_name)}`
                        : 'No matched script';

                    return `
                        <div class="__TOOL_CLASS__-summary-grid">
                          <article class="__TOOL_CLASS__-summary-card">
                            <span class="__TOOL_CLASS__-summary-kicker">Matched scripts</span>
                            <strong class="__TOOL_CLASS__-summary-value">${result.filteredControls.length}</strong>
                            <span class="__TOOL_CLASS__-summary-meta">Controls currently matching the selected filters</span>
                          </article>
                          <article class="__TOOL_CLASS__-summary-card">
                            <span class="__TOOL_CLASS__-summary-kicker">Visible rows</span>
                            <strong class="__TOOL_CLASS__-summary-value">${result.visibleControls.length}</strong>
                            <span class="__TOOL_CLASS__-summary-meta">Rows rendered in the controls table</span>
                          </article>
                          <article class="__TOOL_CLASS__-summary-card">
                            <span class="__TOOL_CLASS__-summary-kicker">Matched sections</span>
                            <strong class="__TOOL_CLASS__-summary-value">${result.visibleSections.length}</strong>
                            <span class="__TOOL_CLASS__-summary-meta">Section rollups built from the filtered control set</span>
                          </article>
                          <article class="__TOOL_CLASS__-summary-card">
                            <span class="__TOOL_CLASS__-summary-kicker">Selected script</span>
                            <strong class="__TOOL_CLASS__-summary-value">${result.selectedControl ? result.selectedControl.script_line_count : 0}</strong>
                            <span class="__TOOL_CLASS__-summary-meta">${result.selectedControl ? 'Lines in the displayed script body' : 'No script currently selected'}</span>
                          </article>
                        </div>
                        <div class="__TOOL_CLASS__-badge-row">
                          <span class="__TOOL_CLASS__-badge">Benchmark: ${escapeHtml(benchmark.name || 'Ubuntu 22.04 CIS')}</span>
                          ${familyBadge}
                          ${sectionBadge}
                          ${criticalityBadge}
                          <span class="__TOOL_CLASS__-badge">Selected: ${selectedMeta}</span>
                          ${queryBadge}
                        </div>
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
            sourceJsLines: [[47, 47], [59, 60], [132, 187], [423, 435], [436, 447], [575, 589], [747, 791], [809, 847], [1372, 1393]],
            sourceDomIds: ['assessUbuntu2204CisControlsPanel', 'assessUbuntu2204CisControlsTableBody'],
            sourceClasses: ['active', 'assess-ubuntu-2204-cis-col-copy', 'assess-ubuntu-2204-cis-col-criticality', 'assess-ubuntu-2204-cis-col-id', 'assess-ubuntu-2204-cis-col-index', 'assess-ubuntu-2204-cis-col-script', 'assess-ubuntu-2204-cis-col-section', 'assess-ubuntu-2204-cis-col-title', 'assess-ubuntu-2204-cis-controls-table', 'assess-ubuntu-2204-cis-section-card', 'assess-ubuntu-2204-cis-section-title', 'assess-ubuntu-2204-cis-tab-panel', 'assess-ubuntu-2204-cis-table', 'assess-ubuntu-2204-cis-table-card', 'assess-ubuntu-2204-cis-table-wrap', 'mb-0', 'table', 'tool-generated-rownum-head', 'tool-result-table', 'tool-result-table-wrap', 'tool-tab-panel'],
            sourceVariables: ['controlsTableBody', 'tabPanels'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.findingsTableSourceSection = findingsTableSourceSection;
    global.InfraStackAssessmentWorkspaceSections = registry;
}(window));


// Source section: 06_result-view
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackAssessmentWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function groupRollupsSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 48-48
                const sectionsTableBody = document.getElementById('__DOM_PREFIX__SectionsTableBody');

            // Source custom.js lines 59-60
                const tabPanels = Array.from(document.querySelectorAll('.__TOOL_CLASS__-tab-panel'));

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

            // Source custom.js lines 575-589
                function activateTab(targetId) {
                    tabButtons.forEach(function (button) {
                        const isActive = button.dataset.tabTarget === targetId;
                        button.classList.toggle('active', isActive);
                        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
                        button.tabIndex = isActive ? 0 : -1;
                    });

                    tabPanels.forEach(function (panel) {
                        const isActive = panel.id === targetId;
                        panel.classList.toggle('active', isActive);
                        panel.hidden = !isActive;
                    });
                }

            // Source custom.js lines 747-791
                function buildSummaryMarkup(result) {
                    const queryBadge = result.state.query
                        ? `<span class="__TOOL_CLASS__-badge">Filter: ${escapeHtml(result.state.query)}</span>`
                        : '';
                    const familyBadge = `<span class="__TOOL_CLASS__-badge">Family: ${escapeHtml(result.state.family === 'all' ? 'All sections' : result.state.family)}</span>`;
                    const sectionBadge = `<span class="__TOOL_CLASS__-badge">Section: ${escapeHtml(result.state.sectionPath === 'all' ? 'All paths' : result.state.sectionPath)}</span>`;
                    const criticalityBadge = `<span class="__TOOL_CLASS__-badge">Criticality: ${escapeHtml(findOptionByValue(criticalityCatalog, result.state.criticality).title)}</span>`;
                    const selectedMeta = result.selectedControl
                        ? `${escapeHtml(result.selectedControl.id)} • ${escapeHtml(result.selectedControl.script_name)}`
                        : 'No matched script';

                    return `
                        <div class="__TOOL_CLASS__-summary-grid">
                          <article class="__TOOL_CLASS__-summary-card">
                            <span class="__TOOL_CLASS__-summary-kicker">Matched scripts</span>
                            <strong class="__TOOL_CLASS__-summary-value">${result.filteredControls.length}</strong>
                            <span class="__TOOL_CLASS__-summary-meta">Controls currently matching the selected filters</span>
                          </article>
                          <article class="__TOOL_CLASS__-summary-card">
                            <span class="__TOOL_CLASS__-summary-kicker">Visible rows</span>
                            <strong class="__TOOL_CLASS__-summary-value">${result.visibleControls.length}</strong>
                            <span class="__TOOL_CLASS__-summary-meta">Rows rendered in the controls table</span>
                          </article>
                          <article class="__TOOL_CLASS__-summary-card">
                            <span class="__TOOL_CLASS__-summary-kicker">Matched sections</span>
                            <strong class="__TOOL_CLASS__-summary-value">${result.visibleSections.length}</strong>
                            <span class="__TOOL_CLASS__-summary-meta">Section rollups built from the filtered control set</span>
                          </article>
                          <article class="__TOOL_CLASS__-summary-card">
                            <span class="__TOOL_CLASS__-summary-kicker">Selected script</span>
                            <strong class="__TOOL_CLASS__-summary-value">${result.selectedControl ? result.selectedControl.script_line_count : 0}</strong>
                            <span class="__TOOL_CLASS__-summary-meta">${result.selectedControl ? 'Lines in the displayed script body' : 'No script currently selected'}</span>
                          </article>
                        </div>
                        <div class="__TOOL_CLASS__-badge-row">
                          <span class="__TOOL_CLASS__-badge">Benchmark: ${escapeHtml(benchmark.name || 'Ubuntu 22.04 CIS')}</span>
                          ${familyBadge}
                          ${sectionBadge}
                          ${criticalityBadge}
                          <span class="__TOOL_CLASS__-badge">Selected: ${selectedMeta}</span>
                          ${queryBadge}
                        </div>
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

            // Source custom.js lines 848-882
                function renderSectionsTable(result) {
                    if (result.visibleSections.length === 0) {
                        sectionsTableBody.innerHTML = `
                            <tr class="__TOOL_CLASS__-empty-row">
                              <td colspan="6">No section paths matched the current result set.</td>
                            </tr>
                        `;
                        return;
                    }

                    sectionsTableBody.innerHTML = result.visibleSections.map(function (section, index) {
                        const rangeText = section.first_control_id && section.last_control_id
                            ? section.first_control_id === section.last_control_id
                                ? section.first_control_id
                                : `${section.first_control_id} → ${section.last_control_id}`
                            : 'n/a';

                        return `
                            <tr>
                              <td class="tool-generated-rownum-cell">${index + 1}</td>
                              <td>
                                <div class="__TOOL_CLASS__-section-cell">
                                  <span class="__TOOL_CLASS__-path-text">${escapeHtml(section.path)}</span>
                                  <span class="__TOOL_CLASS__-section-family">${escapeHtml(section.full_label)}</span>
                                </div>
                              </td>
                              <td>${section.depth}</td>
                              <td>${section.visible_control_count}</td>
                              <td>${section.child_count}</td>
                              <td><span class="__TOOL_CLASS__-range-text">${escapeHtml(rangeText)}</span></td>
                            </tr>
                        `;
                    }).join('');
                }
        }

        return {
            sourceTool: 'templates/content/tools/cis/assess-ubuntu-2204-cis/',
            sourceJsLines: [[48, 48], [59, 60], [132, 187], [575, 589], [747, 791], [809, 847], [848, 882]],
            sourceDomIds: ['assessUbuntu2204CisSectionsPanel', 'assessUbuntu2204CisSectionsTableBody'],
            sourceClasses: ['assess-ubuntu-2204-cis-col-children', 'assess-ubuntu-2204-cis-col-controls', 'assess-ubuntu-2204-cis-col-depth', 'assess-ubuntu-2204-cis-col-index', 'assess-ubuntu-2204-cis-col-path', 'assess-ubuntu-2204-cis-col-range', 'assess-ubuntu-2204-cis-section-card', 'assess-ubuntu-2204-cis-section-title', 'assess-ubuntu-2204-cis-sections-table', 'assess-ubuntu-2204-cis-tab-panel', 'assess-ubuntu-2204-cis-table', 'assess-ubuntu-2204-cis-table-card', 'assess-ubuntu-2204-cis-table-wrap', 'assess-ubuntu-2204-cis-table-wrap-compact', 'mb-0', 'table', 'tool-generated-rownum-head', 'tool-result-table', 'tool-result-table--compact', 'tool-result-table-wrap', 'tool-tab-panel'],
            sourceVariables: ['sectionsTableBody', 'tabPanels'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.groupRollupsSourceSection = groupRollupsSourceSection;
    global.InfraStackAssessmentWorkspaceSections = registry;
}(window));
