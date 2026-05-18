// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackAssessmentWorkspaceSections || {};

    /**
     * Returns source JavaScript blocks extracted for this workspace section.
     *
     * @returns {{sourceTool: string, sourceJsLines: number[][], sourceDomIds: string[], sourceClasses: string[], sourceVariables: string[], sourceBlocks: Function}} Extracted source metadata and code holder.
     */
    function resultSummarySourceSection() {
        function sourceBlocks() {
            // Source custom.js lines 42-42
                const resultEmpty = document.getElementById('__DOM_PREFIX__ResultEmpty');

            // Source custom.js lines 43-43
                const resultError = document.getElementById('__DOM_PREFIX__ResultError');

            // Source custom.js lines 45-45
                const resultSummary = document.getElementById('__DOM_PREFIX__ResultSummary');

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

            // Source custom.js lines 1268-1273
                function showResultState() {
                    resultEmpty.classList.add('d-none');
                    resultError.classList.add('d-none');
                    resultContent.classList.remove('d-none');
                }

            // Source custom.js lines 1274-1286
                function renderResult(result) {
                    latestResult = result;
                    syncInputsFromResult(result);
                    showResultState();
                    resultSummary.innerHTML = buildSummaryMarkup(result);
                    renderToolbarMeta(result);
                    renderControlsTable(result);
                    renderSectionsTable(result);
                    renderJson(result);
                    toggleScriptButtons(false);
                    void loadSelectedScript(result);
                }
        }

        return {
            sourceTool: 'templates/content/tools/cis/assess-ubuntu-2204-cis/',
            sourceJsLines: [[42, 42], [43, 43], [45, 45], [132, 187], [1268, 1273], [1274, 1286]],
            sourceDomIds: ['assessUbuntu2204CisResultEmpty', 'assessUbuntu2204CisResultError', 'assessUbuntu2204CisResultSummary'],
            sourceClasses: ['assess-ubuntu-2204-cis-result-empty', 'assess-ubuntu-2204-cis-result-error', 'assess-ubuntu-2204-cis-result-summary', 'd-none'],
            sourceVariables: ['resultEmpty', 'resultError', 'resultSummary'],
            sourceBlocks: sourceBlocks
        };
    }

    registry.resultSummarySourceSection = resultSummarySourceSection;
    global.InfraStackAssessmentWorkspaceSections = registry;
}(window));
