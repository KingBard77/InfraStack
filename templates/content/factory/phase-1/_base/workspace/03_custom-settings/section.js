// section.js
(function attachBaseCustomSettingsSourceSection(global) {
    const registry = global.InfraStackBaseWorkspaceSections || {};
    const source = {
        section: '03_custom-settings',
        title: 'custom settings',
        role: 'neutral compact Custom panel',
        compatibilitySections: [
            '03_advanced-settings',
            '03_advanced-setting'
        ],
        sourceDomIds: [
            '__DOM_PREFIX__CustomSettings',
            '__DOM_PREFIX__CustomTabOne',
            '__DOM_PREFIX__CustomTabTwo',
            '__DOM_PREFIX__CustomTabThree',
            '__DOM_PREFIX__CustomPanelOne',
            '__DOM_PREFIX__CustomPanelTwo',
            '__DOM_PREFIX__CustomPanelThree',
            '__DOM_PREFIX__CustomText',
            '__DOM_PREFIX__CustomSelect',
            '__DOM_PREFIX__CustomRadioStandard',
            '__DOM_PREFIX__CustomRadioOverride',
            '__DOM_PREFIX__CustomNumber',
            '__DOM_PREFIX__CustomToggle',
            '__DOM_PREFIX__CustomTextarea'
        ],
        sourceClasses: [
            '__PREFIX__-custom-settings',
            '__PREFIX__-custom-summary',
            '__PREFIX__-custom-arrow-slot',
            '__PREFIX__-custom-body',
            '__PREFIX__-custom-tabs',
            '__PREFIX__-custom-tab',
            '__PREFIX__-custom-panel',
            '__PREFIX__-custom-grid',
            '__PREFIX__-custom-card',
            '__PREFIX__-custom-label-wrap',
            '__PREFIX__-custom-label',
            '__PREFIX__-custom-helper-chip',
            '__PREFIX__-native-select-wrap',
            '__PREFIX__-custom-dropdown',
            '__PREFIX__-custom-native-select',
            '__PREFIX__-custom-radio-group',
            '__PREFIX__-custom-radio-card',
            '__PREFIX__-custom-radio-title',
            '__PREFIX__-custom-radio-copy',
            '__PREFIX__-custom-group',
            '__PREFIX__-custom-group-head',
            '__PREFIX__-custom-group-title',
            '__PREFIX__-custom-group-body',
            '__PREFIX__-custom-field',
            '__PREFIX__-custom-text-field',
            '__PREFIX__-custom-number-field',
            '__PREFIX__-custom-checkbox-option',
            '__PREFIX__-custom-textarea',
            '__PREFIX__-custom-info',
            '__PREFIX__-custom-hint'
        ],
        sourcePlaceholders: [
            '__CUSTOM_ARIA_LABEL__',
            '__CUSTOM_LAYOUT__',
            '__CUSTOM_COLUMNS__',
            '__CUSTOM_TAB_ONE_LABEL__',
            '__CUSTOM_TAB_TWO_LABEL__',
            '__CUSTOM_TAB_THREE_LABEL__',
            '__CUSTOM_TEXT_LABEL__',
            '__CUSTOM_TEXT_PLACEHOLDER__',
            '__CUSTOM_TEXT_HELPER__',
            '__CUSTOM_SELECT_LABEL__',
            '__CUSTOM_SELECT_HELPER__',
            '__CUSTOM_RADIO_LABEL__',
            '__CUSTOM_RADIO_HELPER__',
            '__CUSTOM_RADIO_STANDARD_COPY__',
            '__CUSTOM_RADIO_OVERRIDE_COPY__',
            '__CUSTOM_GROUP_LABEL__',
            '__CUSTOM_NUMBER_LABEL__',
            '__CUSTOM_NUMBER_HELPER__',
            '__CUSTOM_TOGGLE_LABEL__',
            '__CUSTOM_TOGGLE_HELPER__',
            '__CUSTOM_TEXTAREA_LABEL__',
            '__CUSTOM_TEXTAREA_PLACEHOLDER__',
            '__CUSTOM_TEXTAREA_HELPER__',
            '__CUSTOM_INFO_ITEM_ONE__',
            '__CUSTOM_INFO_ITEM_TWO__'
        ],
        sourceBehaviours: [
            'uses visible Custom disclosure label instead of Advanced',
            'uses one right-aligned arrow slot with a button surface for the Custom disclosure',
            'uses right-facing default arrows and down-facing open arrows instead of up-facing open arrows',
            'requires Custom dropdown choices to use native select popups inside the standard arrow-chip wrapper with a static centered down chevron that does not mutate on hover or focus',
            'forbids CSS popup dropdown menus, listbox button options, and per-option styling inside Custom settings',
            'uses CSS-drawn Basic-settings radio card controls for radio choices instead of native radio rendering',
            'uses CSS-drawn switch-style checkbox controls with neutral off and strong accent on states instead of native checkbox rendering or custom switch cards',
            'keeps custom controls compact and card-contained',
            'uses grouped cards to divide dense Custom sections with many related controls',
            'orders each control card as label/helper first, active control second, and explanatory text last',
            'spaces optional sections with gaps instead of divider lines',
            'provides helper chip hooks for custom controls',
            'provides typed placeholder examples inside custom control cards, including CIDR values with slash notation and numeric quantity values',
            'provides explicit CSS hooks for disclosure arrow slots, native select wrappers, radio cards, text fields, number fields, textareas, placeholders, CSS-drawn checkbox switches, grouped cards, and dashed info rows',
            'hides native number input spinner boxes inside Custom controls',
            'allows dashed helper rows to span dense groups when explanatory text would crowd compact number inputs',
            'supports preference-driven one-column, auto-fit two-column, and multi-row layouts',
            'defines one-column mobile layout rules',
            'does not define family state, formulas, scanners, command generation, assessment filtering, export, or restore behavior'
        ]
    };

    /**
     * Returns the base custom settings workspace source metadata.
     *
     * @returns {Record<string, unknown>} Section source metadata.
     */
    function baseCustomSettingsSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.baseCustomSettingsSourceSection = baseCustomSettingsSourceSection;
    registry.customSettings = baseCustomSettingsSourceSection;
    global.InfraStackBaseWorkspaceSections = registry;
}(window));
