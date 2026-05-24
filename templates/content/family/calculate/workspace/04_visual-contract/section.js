// section.js
(function attachVisualContractSourceSection(global) {
    const registry = global.InfraStackCalculateWorkspaceSections || {};

    /**
     * Returns calculate visual-contract source metadata.
     *
     * @returns {{section: string, title: string, family: string, role: string, sourceDomIds: string[], sourceClasses: string[], sourcePlaceholders: string[], sourceModelCore: string, sourceBlocks: Function}} Section metadata.
     */
    function visualContractSourceSection() {
        return {
            section: '04_visual-contract',
            title: 'visual contract',
            family: 'calculate',
            role: 'provider-neutral calculate model and visual output contract',
            sourceDomIds: [
                '__DOM_PREFIX__VisualContract',
                '__DOM_PREFIX__VisualPrimary',
                '__DOM_PREFIX__VisualMetrics',
                '__DOM_PREFIX__VisualDrivers',
                '__DOM_PREFIX__VisualFormulas'
            ],
            sourceClasses: [
                '__PREFIX__-visual-contract',
                '__PREFIX__-visual-contract-header',
                '__PREFIX__-visual-contract-heading',
                '__PREFIX__-visual-contract-icon',
                '__PREFIX__-visual-contract-title',
                '__PREFIX__-visual-contract-copy',
                '__PREFIX__-visual-contract-status',
                '__PREFIX__-visual-contract-chip',
                '__PREFIX__-visual-contract-grid',
                '__PREFIX__-visual-contract-primary',
                '__PREFIX__-visual-contract-ring',
                '__PREFIX__-visual-contract-model',
                '__PREFIX__-visual-contract-metrics',
                '__PREFIX__-visual-contract-metric',
                '__PREFIX__-visual-contract-drivers',
                '__PREFIX__-visual-contract-driver',
                '__PREFIX__-visual-contract-formulas',
                '__PREFIX__-visual-contract-formula'
            ],
            sourcePlaceholders: [
                '__VISUAL_CONTRACT_LABEL__',
                '__VISUAL_CONTRACT_TONE__',
                '__VISUAL_CONTRACT_ICON__',
                '__VISUAL_CONTRACT_TITLE__',
                '__VISUAL_CONTRACT_COPY__',
                '__VISUAL_CONTRACT_STATUS_ICON__',
                '__VISUAL_CONTRACT_STATUS_LABEL__',
                '__VISUAL_CONTRACT_UPDATED_LABEL__',
                '__VISUAL_PRIMARY_KICKER__',
                '__VISUAL_PRIMARY_VALUE__',
                '__VISUAL_PRIMARY_UNIT__',
                '__VISUAL_PRIMARY_PROGRESS__',
                '__VISUAL_PRIMARY_RING_LABEL__',
                '__VISUAL_PRIMARY_RING_VALUE__',
                '__VISUAL_PRIMARY_RING_UNIT__',
                '__VISUAL_PRIMARY_NOTE__',
                '__VISUAL_MODEL_TITLE__',
                '__VISUAL_MODEL_LABEL__'
            ],
            sourceModelCore: 'templates/content/family/calculate/workspace/04_visual-contract/model-core.js',
            sourceBlocks: function sourceBlocks() {
                return null;
            }
        };
    }

    /**
     * Updates visual-contract DOM nodes from normalized contract state.
     *
     * @param {Element} root Visual contract root element.
     * @param {{tone?: string, primaryMetric?: {label?: string, value?: string, unit?: string, progress?: number}, metrics?: Array<{label?: string, value?: string, copy?: string}>, components?: Array<{label?: string, value?: string, copy?: string, icon?: string}>, formulas?: Array<{label?: string, expression?: string, result?: string}>}} contract Normalized visual contract state.
     * @returns {boolean} True when the root was updated.
     */
    function renderVisualContract(root, contract) {
        if (!root || !contract) {
            return false;
        }

        const tone = ['success', 'warning', 'danger'].includes(contract.tone) ? contract.tone : 'success';
        root.setAttribute('data-contract-tone', tone);

        const primary = contract.primaryMetric || {};
        const primaryValue = root.querySelector('.__PREFIX__-visual-contract-value');
        const primaryUnit = root.querySelector('.__PREFIX__-visual-contract-unit');
        const ring = root.querySelector('.__PREFIX__-visual-contract-ring');

        if (primaryValue && primary.value !== undefined) {
            primaryValue.textContent = String(primary.value);
        }

        if (primaryUnit && primary.unit !== undefined) {
            primaryUnit.textContent = String(primary.unit);
        }

        if (ring && Number.isFinite(primary.progress)) {
            const degrees = Math.max(0, Math.min(360, primary.progress));
            ring.style.setProperty('--__PREFIX__-visual-contract-progress', `${degrees}deg`);
        }

        return true;
    }

    registry.visualContractSourceSection = visualContractSourceSection;
    registry.renderVisualContract = renderVisualContract;
    global.InfraStackCalculateWorkspaceSections = registry;
}(window));
