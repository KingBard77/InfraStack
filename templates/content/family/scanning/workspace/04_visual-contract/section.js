// section.js
(function attachScanningVisualContractSourceSection(global) {
    const registry = global.InfraStackScanningWorkspaceSections || {};

    /**
     * Returns scanning visual-contract source metadata.
     *
     * @returns {{section: string, title: string, family: string, role: string, sourceDomIds: string[], sourceClasses: string[], sourcePlaceholders: string[], sourceModelCore: string, sourceBlocks: Function}} Section metadata.
     */
    function visualContractSourceSection() {
        return {
            section: '04_visual-contract',
            title: 'visual contract',
            family: 'scanning',
            role: 'scanner-neutral visual result and evidence contract',
            sourceDomIds: [
                '__DOM_PREFIX__VisualContract',
                '__DOM_PREFIX__ScanPrimary',
                '__DOM_PREFIX__ScanMetrics',
                '__DOM_PREFIX__ScanEvidence',
                '__DOM_PREFIX__ScanFindings'
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
                '__PREFIX__-visual-contract-evidence',
                '__PREFIX__-visual-contract-card',
                '__PREFIX__-visual-contract-findings',
                '__PREFIX__-visual-contract-finding'
            ],
            sourcePlaceholders: [
                '__SCAN_CONTRACT_LABEL__',
                '__SCAN_CONTRACT_TONE__',
                '__SCAN_CONTRACT_ICON__',
                '__SCAN_CONTRACT_TITLE__',
                '__SCAN_CONTRACT_COPY__',
                '__SCAN_CONTRACT_STATUS_ICON__',
                '__SCAN_CONTRACT_STATUS_LABEL__',
                '__SCAN_CONTRACT_TARGET_LABEL__',
                '__SCAN_PRIMARY_KICKER__',
                '__SCAN_PRIMARY_PROGRESS__',
                '__SCAN_PRIMARY_RING_LABEL__',
                '__SCAN_PRIMARY_SCORE__',
                '__SCAN_PRIMARY_UNIT__',
                '__SCAN_PRIMARY_VALUE__',
                '__SCAN_PRIMARY_NOTE__',
                '__SCAN_MODEL_TITLE__',
                '__SCAN_MODEL_LABEL__'
            ],
            sourceModelCore: 'templates/content/family/scanning/workspace/04_visual-contract/model-core.js',
            sourceBlocks: function sourceBlocks() {
                return null;
            }
        };
    }

    /**
     * Updates visual-contract DOM nodes from normalized scan visual state.
     *
     * @param {Element} root Visual contract root element.
     * @param {{tone?: string, score?: number, status?: string, metrics?: Array<{label?: string, value?: string, copy?: string}>}} contract Normalized visual contract state.
     * @returns {boolean} True when the root was updated.
     */
    function renderVisualContract(root, contract) {
        if (!root || !contract) {
            return false;
        }

        const tone = ['success', 'warning', 'danger'].includes(contract.tone) ? contract.tone : 'success';
        root.setAttribute('data-contract-tone', tone);

        const score = Number.isFinite(contract.score) ? Math.max(0, Math.min(100, contract.score)) : 0;
        const ring = root.querySelector('.__PREFIX__-visual-contract-ring');
        const scoreNode = root.querySelector('.__PREFIX__-visual-contract-ring-center strong');
        const valueNode = root.querySelector('.__PREFIX__-visual-contract-value');

        if (ring) {
            ring.style.setProperty('--__PREFIX__-visual-contract-progress', `${score * 3.6}deg`);
        }

        if (scoreNode) {
            scoreNode.textContent = String(Math.round(score));
        }

        if (valueNode && contract.status) {
            valueNode.textContent = String(contract.status);
        }

        return true;
    }

    registry.visualContractSourceSection = visualContractSourceSection;
    registry.renderVisualContract = renderVisualContract;
    global.InfraStackScanningWorkspaceSections = registry;
}(window));
