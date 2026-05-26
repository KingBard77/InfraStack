// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackAssessmentWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function selectedArtifactSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 49-49
                const scriptMeta = document.getElementById('__DOM_PREFIX__ScriptMeta');

            // Source custom.js lines 50-50
                const scriptOutput = document.getElementById('__DOM_PREFIX__ScriptOutput');

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

            // Source custom.js lines 943-995
                function renderScriptState(control, statusText, scriptContent) {
                    if (!control) {
                        scriptMeta.innerHTML = `
                            <div class="__TOOL_CLASS__-script-chip">
                              <span class="__TOOL_CLASS__-script-chip-label">Selection</span>
                              <span class="__TOOL_CLASS__-script-chip-value">No matched script</span>
                            </div>
                        `;
                        scriptOutput.textContent = 'No script matches the current filter.';
                        toggleScriptButtons(false);
                        return;
                    }

                    const criticalityLabel = formatCriticalityLabel(control.criticality, control.criticality_label);
                    const statusMarkup = statusText
                        ? `
                        <div class="__TOOL_CLASS__-script-chip">
                          <span class="__TOOL_CLASS__-script-chip-label">Status</span>
                          <span class="__TOOL_CLASS__-script-chip-value">${escapeHtml(statusText)}</span>
                        </div>
                    `
                        : '';

                    scriptMeta.innerHTML = `
                        <div class="__TOOL_CLASS__-script-chip">
                          <span class="__TOOL_CLASS__-script-chip-label">Control ID</span>
                          <span class="__TOOL_CLASS__-script-chip-value">${escapeHtml(control.id)}</span>
                        </div>
                        <div class="__TOOL_CLASS__-script-chip">
                          <span class="__TOOL_CLASS__-script-chip-label">Title</span>
                          <span class="__TOOL_CLASS__-script-chip-value">${escapeHtml(control.title)}</span>
                        </div>
                        <div class="__TOOL_CLASS__-script-chip">
                          <span class="__TOOL_CLASS__-script-chip-label">Criticality</span>
                          <span class="__TOOL_CLASS__-script-chip-value">${escapeHtml(criticalityLabel)}</span>
                        </div>
                        <div class="__TOOL_CLASS__-script-chip">
                          <span class="__TOOL_CLASS__-script-chip-label">Section path</span>
                          <span class="__TOOL_CLASS__-script-chip-value">${escapeHtml(control.section_path)}</span>
                        </div>
                        <div class="__TOOL_CLASS__-script-chip">
                          <span class="__TOOL_CLASS__-script-chip-label">Script path</span>
                          <span class="__TOOL_CLASS__-script-chip-value">${escapeHtml(control.script_path)}</span>
                        </div>
                        <div class="__TOOL_CLASS__-script-chip">
                          <span class="__TOOL_CLASS__-script-chip-label">Lines</span>
                          <span class="__TOOL_CLASS__-script-chip-value">${control.script_line_count}</span>
                        </div>
                        ${statusMarkup}
                    `;
                    scriptOutput.textContent = scriptContent;
                }

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
            sourceJsLines: [[49, 49], [50, 50], [59, 60], [132, 187], [575, 589], [943, 995], [1313, 1333], [1358, 1365], [1372, 1393]],
            sourceDomIds: ['assessUbuntu2204CisScriptMeta', 'assessUbuntu2204CisScriptOutput', 'assessUbuntu2204CisScriptPanel'],
            sourceClasses: ['assess-ubuntu-2204-cis-script-meta', 'assess-ubuntu-2204-cis-script-pre', 'assess-ubuntu-2204-cis-script-shell', 'assess-ubuntu-2204-cis-section-card', 'assess-ubuntu-2204-cis-section-title', 'assess-ubuntu-2204-cis-tab-panel', 'tool-tab-panel'],
            sourceVariables: ['scriptMeta', 'scriptOutput', 'tabPanels'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.selectedArtifactSourceSection = selectedArtifactSourceSection;
    global.InfraStackAssessmentWorkspaceSections = registry;
}(window));
