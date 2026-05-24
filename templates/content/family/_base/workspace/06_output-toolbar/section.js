// section.js
(function attachBaseOutputToolbarSourceSection(global) {
    const registry = global.InfraStackBaseWorkspaceSections || {};
    const source = {
        section: '06_output-toolbar',
        title: 'output toolbar',
        role: 'neutral sortable output toolbar with five actions',
        compatibilitySections: [
            '06_sort-card',
            '07_table-export',
            '08_sort-card'
        ],
        sourceDomIds: [
            '__DOM_PREFIX__Sort',
            '__DOM_PREFIX__SortSelect',
            '__DOM_PREFIX__SortSummary',
            '__DOM_PREFIX__SortMenu',
            '__OUTPUT_ACTION_ONE_ID__',
            '__OUTPUT_ACTION_TWO_ID__',
            '__OUTPUT_ACTION_THREE_ID__',
            '__OUTPUT_ACTION_FOUR_ID__',
            '__OUTPUT_ACTION_FIVE_ID__'
        ],
        sourceClasses: [
            '__PREFIX__-toolbar-shell',
            '__PREFIX__-toolbar',
            '__PREFIX__-toolbar-main',
            '__PREFIX__-sort-label',
            '__PREFIX__-sort-wrap',
            '__PREFIX__-sort-select',
            '__PREFIX__-sort-summary',
            '__PREFIX__-sort-menu',
            '__PREFIX__-sort-grid',
            '__PREFIX__-sort-option',
            '__PREFIX__-toolbar-actions',
            '__PREFIX__-action-btn',
            'tool-output-toolbar',
            'tool-output-actions',
            'tool-action-btn'
        ],
        sourcePlaceholders: [
            '__SORT_OPTION_TWO_VALUE__',
            '__SORT_OPTION_TWO_LABEL__',
            '__SORT_OPTION_THREE_VALUE__',
            '__SORT_OPTION_THREE_LABEL__',
            '__SORT_OPTION_FOUR_VALUE__',
            '__SORT_OPTION_FOUR_LABEL__',
            '__SORT_OPTION_FIVE_VALUE__',
            '__SORT_OPTION_FIVE_LABEL__',
            '__OUTPUT_ACTION_ONE_ID__',
            '__OUTPUT_ACTION_ONE_ICON__',
            '__OUTPUT_ACTION_ONE_LABEL__',
            '__OUTPUT_ACTION_TWO_ID__',
            '__OUTPUT_ACTION_TWO_ICON__',
            '__OUTPUT_ACTION_TWO_LABEL__',
            '__OUTPUT_ACTION_THREE_ID__',
            '__OUTPUT_ACTION_THREE_ICON__',
            '__OUTPUT_ACTION_THREE_LABEL__',
            '__OUTPUT_ACTION_FOUR_ID__',
            '__OUTPUT_ACTION_FOUR_ICON__',
            '__OUTPUT_ACTION_FOUR_LABEL__',
            '__OUTPUT_ACTION_FIVE_ID__',
            '__OUTPUT_ACTION_FIVE_ICON__',
            '__OUTPUT_ACTION_FIVE_LABEL__'
        ],
        sourceBehaviours: [
            'keeps Sort as the left-side control and output actions on the right on desktop',
            'requires exactly five action buttons when this section is applied',
            'requires a Bootstrap Icon inside every action button',
            'uses square-like action button corners instead of pill corners',
            'keeps ID as the visible default sort summary',
            'keeps id as the hidden default sort value',
            'keeps ID as the first custom dropdown option',
            'uses a custom CSS dropdown instead of a native select popup',
            'keeps the dropdown menu the same width as the closed sort summary',
            'keeps toolbar and dropdown wrappers overflow-visible',
            'raises the open dropdown above nearby cards',
            'collapses to full-width sort and action controls on mobile',
            'keeps token fallback values when adapting base output colors into tool-local tokens',
            'does not define family sort state, export behavior, restore validation, table columns, or generated output content'
        ]
    };

    /**
     * Returns the base output toolbar workspace source metadata.
     *
     * @returns {Record<string, unknown>} Section source metadata.
     */
    function baseOutputToolbarSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.baseOutputToolbarSourceSection = baseOutputToolbarSourceSection;
    registry.outputToolbar = baseOutputToolbarSourceSection;
    global.InfraStackBaseWorkspaceSections = registry;
}(window));
