// section.js
(function attachShellVisualContractSourceSection(global) {
    const registry = global.InfraStackShellWorkspaceSections || {};

    /**
     * Returns shell visual-contract source metadata.
     *
     * @returns {{section: string, title: string, family: string, role: string, sourceDomIds: string[], sourceClasses: string[], sourcePlaceholders: string[], sourceModelCore: string, sourceBlocks: Function}} Section metadata.
     */
    function visualContractSourceSection() {
        return {
            section: '04_visual-contract',
            title: 'visual contract',
            family: 'shell',
            role: 'command-neutral visual command and warning contract',
            sourceDomIds: [
                '__DOM_PREFIX__VisualContract',
                '__DOM_PREFIX__CommandPreview',
                '__DOM_PREFIX__CommandTokens',
                '__DOM_PREFIX__CommandMetrics',
                '__DOM_PREFIX__CommandOperations'
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
                '__PREFIX__-visual-contract-command',
                '__PREFIX__-visual-contract-grid',
                '__PREFIX__-visual-contract-model',
                '__PREFIX__-visual-contract-tokens',
                '__PREFIX__-visual-contract-token',
                '__PREFIX__-visual-contract-metrics',
                '__PREFIX__-visual-contract-metric',
                '__PREFIX__-visual-contract-operations',
                '__PREFIX__-visual-contract-operation'
            ],
            sourcePlaceholders: [
                '__SHELL_CONTRACT_LABEL__',
                '__SHELL_CONTRACT_TONE__',
                '__SHELL_CONTRACT_ICON__',
                '__SHELL_CONTRACT_TITLE__',
                '__SHELL_CONTRACT_COPY__',
                '__SHELL_CONTRACT_STATUS_ICON__',
                '__SHELL_CONTRACT_STATUS_LABEL__',
                '__SHELL_CONTRACT_SHELL_LABEL__',
                '__SHELL_COMMAND_KICKER__',
                '__SHELL_COMMAND_VALUE__',
                '__SHELL_COMMAND_COPY__',
                '__SHELL_MODEL_TITLE__',
                '__SHELL_MODEL_LABEL__'
            ],
            sourceModelCore: 'templates/content/factory/phase-1/_family/shell/workspace/04_visual-contract/model-core.js',
            sourceBlocks: function sourceBlocks() {
                return null;
            }
        };
    }

    /**
     * Updates visual-contract DOM nodes from normalized command visual state.
     *
     * @param {Element} root Visual contract root element.
     * @param {{tone?: string, command?: string, tokens?: string[], warnings?: Array}} contract Normalized visual contract state.
     * @returns {boolean} True when the root was updated.
     */
    function renderVisualContract(root, contract) {
        if (!root || !contract) {
            return false;
        }

        const tone = ['success', 'warning', 'danger'].includes(contract.tone) ? contract.tone : 'success';
        root.setAttribute('data-contract-tone', tone);

        const commandNode = root.querySelector('.__PREFIX__-visual-contract-command code');
        const tokenRoot = root.querySelector('.__PREFIX__-visual-contract-tokens');

        if (commandNode && contract.command !== undefined) {
            commandNode.textContent = String(contract.command);
        }

        if (tokenRoot && Array.isArray(contract.tokens)) {
            tokenRoot.replaceChildren(...contract.tokens.map((token) => {
                const node = document.createElement('span');
                node.className = '__PREFIX__-visual-contract-token';
                node.textContent = String(token);
                return node;
            }));
        }

        return true;
    }

    registry.visualContractSourceSection = visualContractSourceSection;
    registry.renderVisualContract = renderVisualContract;
    global.InfraStackShellWorkspaceSections = registry;
}(window));
