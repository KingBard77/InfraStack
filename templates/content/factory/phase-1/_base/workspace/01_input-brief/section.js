// section.js
(function attachBaseInputBriefSourceSection(global) {
    const registry = global.InfraStackBaseWorkspaceSections || {};
    const source = {
        section: '01_input-brief',
        title: 'input brief',
        role: 'neutral primary input card',
        sourceDomIds: [
            '__DOM_PREFIX__Input',
            '__DOM_PREFIX__PrimaryAction',
            '__DOM_PREFIX__SecondaryAction',
            '__DOM_PREFIX__InputError'
        ],
        sourceClasses: [
            '__PREFIX__-input-card',
            '__PREFIX__-input-brief',
            '__PREFIX__-input-row',
            '__PREFIX__-input-label-wrap',
            '__PREFIX__-input-label',
            '__PREFIX__-helper-chip',
            '__PREFIX__-input-stack',
            '__PREFIX__-input-control',
            '__PREFIX__-input-hint',
            '__PREFIX__-input-error',
            '__PREFIX__-input-actions',
            '__PREFIX__-input-helper-card',
            '__PREFIX__-action-btn',
            '__PREFIX__-action-btn-primary',
            '__PREFIX__-action-btn-secondary'
        ],
        sourcePlaceholders: [
            '__INPUT_LABEL__',
            '__INPUT_LAYOUT__',
            '__INPUT_ROWS__',
            '__INPUT_PLACEHOLDER__',
            '__INPUT_DEFAULT__',
            '__HELPER_CHIP_TEXT__',
            '__HELPER_TEXT__',
            '__PRIMARY_ACTION_LABEL__',
            '__PRIMARY_ACTION_ICON__',
            '__SECONDARY_ACTION_LABEL__',
            '__SECONDARY_ACTION_ICON__'
        ],
        sourceBehaviours: [
            'provides a neutral primary input card',
            'supports stacked prompt and inline row layouts',
            'provides helper chip hooks for label and helper copy',
            'provides primary action and Reset action hooks',
            'provides icon-ready primary and Reset action buttons',
            'provides an inline error slot',
            'aligns stacked helper cards with the input control column',
            'keeps inline input stacks as one full-width control column',
            'expects Reset to clear generated output and restore a valid first-view baseline in final runtime packages',
            'expects primary and Reset icons to remain visible during loading states',
            'keeps reset implementation, parser, formula, scanner, diagram, command, export, or restore behavior in the family or tool'
        ]
    };

    /**
     * Returns the base input brief workspace source metadata.
     *
     * @returns {Record<string, string | string[]>} Section source metadata.
     */
    function baseInputBriefSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.baseInputBriefSourceSection = baseInputBriefSourceSection;
    registry.inputBrief = baseInputBriefSourceSection;
    global.InfraStackBaseWorkspaceSections = registry;
}(window));
