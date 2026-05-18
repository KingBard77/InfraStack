// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackAssessmentWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function jsonOutputSourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 51-51
                const jsonOutput = document.getElementById('__DOM_PREFIX__JsonOutput');

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

            // Source custom.js lines 1120-1123
                function renderJson(result) {
                    jsonOutput.innerHTML = highlightJsonText(JSON.stringify(result.jsonPayload, null, 2));
                }
        }

        return {
            sourceTool: 'templates/content/tools/cis/assess-ubuntu-2204-cis/',
            sourceJsLines: [[51, 51], [59, 60], [132, 187], [575, 589], [1120, 1123]],
            sourceDomIds: ['assessUbuntu2204CisJsonOutput', 'assessUbuntu2204CisJsonPanel'],
            sourceClasses: ['assess-ubuntu-2204-cis-json-head', 'assess-ubuntu-2204-cis-json-pre', 'assess-ubuntu-2204-cis-json-shell', 'assess-ubuntu-2204-cis-json-title', 'assess-ubuntu-2204-cis-tab-panel', 'tool-json-head', 'tool-json-output', 'tool-json-panel', 'tool-json-title', 'tool-tab-panel'],
            sourceVariables: ['jsonOutput', 'tabPanels'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.jsonOutputSourceSection = jsonOutputSourceSection;
    global.InfraStackAssessmentWorkspaceSections = registry;
}(window));
