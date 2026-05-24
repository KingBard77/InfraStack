// section.js
(function attachBaseShellSourceSection(global) {
    const registry = global.InfraStackBaseWorkspaceSections || {};
    const source = {
        section: '00_shell',
        title: 'shell',
        role: 'shared workspace frame',
        sourceDomIds: [
            '__DOM_PREFIX__ControlsTitle',
            '__DOM_PREFIX__OutputTitle'
        ],
        sourceClasses: [
            '__TOOL_CLASS__',
            '__PREFIX__-workspace',
            '__PREFIX__-workspace-column',
            '__PREFIX__-panel',
            '__PREFIX__-panel-header',
            '__PREFIX__-panel-title',
            '__PREFIX__-panel-subtitle',
            '__PREFIX__-panel-body',
            '__PREFIX__-section-slot',
            '__PREFIX__-surface-state'
        ],
        sourceBehaviours: [
            'defines a neutral two-column workspace shell',
            'provides generic controls and output slots',
            'provides neutral empty/loading/error surface shape',
            'stacks workspace columns on narrow screens'
        ]
    };

    /**
     * Returns the base shell workspace source metadata.
     *
     * @returns {Record<string, string | string[]>} Section source metadata.
     */
    function baseShellSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.baseShellSourceSection = baseShellSourceSection;
    registry.shell = baseShellSourceSection;
    global.InfraStackBaseWorkspaceSections = registry;
}(window));
