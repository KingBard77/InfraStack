// section.js
(function attachBaseBasicSettingsSourceSection(global) {
    const registry = global.InfraStackBaseWorkspaceSections || {};
    const source = {
        section: '02_basic-settings',
        title: 'basic settings',
        role: 'neutral basic settings card',
        sourceDomIds: [
            '__DOM_PREFIX__BasicPrimary',
            '__DOM_PREFIX__BasicSelect',
            '__DOM_PREFIX__BasicText',
            '__DOM_PREFIX__BasicToggle'
        ],
        sourceClasses: [
            '__PREFIX__-basic-card',
            '__PREFIX__-example-card',
            '__PREFIX__-example-label',
            '__PREFIX__-example-value',
            '__PREFIX__-example-helper',
            '__PREFIX__-basic-grid',
            '__PREFIX__-setting-card',
            '__PREFIX__-setting-label-wrap',
            '__PREFIX__-setting-label',
            '__PREFIX__-helper-chip',
            '__PREFIX__-native-select',
            '__PREFIX__-native-select-wrap',
            '__PREFIX__-select',
            '__PREFIX__-select-control',
            '__PREFIX__-text-field',
            '__PREFIX__-switch-card',
            '__PREFIX__-switch-track',
            '__PREFIX__-switch-copy',
            '__PREFIX__-setting-hint'
        ],
        sourcePlaceholders: [
            '__BASIC_EXAMPLE_LABEL__',
            '__BASIC_EXAMPLE_VALUE__',
            '__BASIC_EXAMPLE_HELPER__',
            '__BASIC_PRIMARY_LABEL__',
            '__BASIC_PRIMARY_HELPER__',
            '__BASIC_SELECT_LABEL__',
            '__BASIC_SELECT_HELPER__',
            '__BASIC_TEXT_LABEL__',
            '__BASIC_TEXT_PLACEHOLDER__',
            '__BASIC_TEXT_HELPER__',
            '__BASIC_TOGGLE_LABEL__',
            '__BASIC_TOGGLE_HELPER__'
        ],
        sourceBehaviours: [
            'provides a neutral basic settings card',
            'requires controls to be card-contained',
            'does not require visible Basic settings title or subtitle copy in final runtime tools',
            'may be skipped when a tool has no real high-frequency basic controls',
            'provides helper chip hooks for every setting row',
            'requires Basic dropdowns to use native select popups inside the standard arrow-chip wrapper with a static centered down chevron that does not mutate on hover or focus',
            'forbids CSS popup menus, hidden radio option rows, listbox buttons, and per-option styling in Basic settings',
            'defines one-column mobile layout rules',
            'does not define family state, preset application, scanner behavior, formulas, command generation, or assessment filtering'
        ]
    };

    /**
     * Returns the base basic settings workspace source metadata.
     *
     * @returns {Record<string, string | string[]>} Section source metadata.
     */
    function baseBasicSettingsSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.baseBasicSettingsSourceSection = baseBasicSettingsSourceSection;
    registry.basicSettings = baseBasicSettingsSourceSection;
    global.InfraStackBaseWorkspaceSections = registry;
}(window));
