// section.js
(function attachBaseTableOutputSourceSection(global) {
    const registry = global.InfraStackBaseWorkspaceSections || {};
    const source = {
        section: '07_table-output',
        title: 'table output',
        role: 'neutral tabbed output shell with table frame, empty state, and icon-only row actions',
        compatibilitySections: [
            '07_table',
            '07_table-export',
            '09_result-table',
            '09_result_table'
        ],
        sourceDomIds: [
            '__DOM_PREFIX__TableOutputShell',
            '__DOM_PREFIX__TableEmpty',
            '__DOM_PREFIX__TableTabOne',
            '__DOM_PREFIX__TableTabTwo',
            '__DOM_PREFIX__TableTabThree',
            '__DOM_PREFIX__TableTabFour',
            '__DOM_PREFIX__TableTabFive',
            '__DOM_PREFIX__TableTabJson',
            '__DOM_PREFIX__TablePanelOne',
            '__DOM_PREFIX__TablePanelTwo',
            '__DOM_PREFIX__TablePanelThree',
            '__DOM_PREFIX__TablePanelFour',
            '__DOM_PREFIX__TablePanelFive',
            '__DOM_PREFIX__TablePanelJson',
            '__DOM_PREFIX__PrimaryTableBody',
            '__DOM_PREFIX__SecondaryTableBody',
            '__DOM_PREFIX__TertiaryTableBody',
            '__DOM_PREFIX__ExtraTableBody',
            '__DOM_PREFIX__JsonOutput'
        ],
        sourceClasses: [
            '__PREFIX__-table-output-shell',
            '__PREFIX__-table-empty',
            '__PREFIX__-table-tabs',
            '__PREFIX__-table-tab-btn',
            '__PREFIX__-table-tab-icon',
            '__PREFIX__-table-panel',
            '__PREFIX__-section-card',
            '__PREFIX__-section-title',
            '__PREFIX__-table-wrap',
            '__PREFIX__-output-table',
            '__PREFIX__-output-table-compact',
            '__PREFIX__-table-cell-text',
            '__PREFIX__-cell-clamp',
            '__PREFIX__-rownum-head',
            '__PREFIX__-rownum-cell',
            '__PREFIX__-status-head',
            '__PREFIX__-status-cell',
            '__PREFIX__-action-head',
            '__PREFIX__-action-cell',
            '__PREFIX__-row-copy-btn',
            '__PREFIX__-empty-row',
            '__PREFIX__-empty-block',
            '__PREFIX__-note-grid',
            '__PREFIX__-note-card',
            '__PREFIX__-note-title',
            '__PREFIX__-note-copy',
            '__PREFIX__-json-panel',
            '__PREFIX__-json-head',
            '__PREFIX__-json-title',
            '__PREFIX__-json-output'
        ],
        sourcePlaceholders: [
            '__TABLE_ARIA_LABEL__',
            '__TABLE_EMPTY_TEXT__',
            '__TABLE_TAB_ONE_LABEL__',
            '__TABLE_TAB_ONE_ICON__',
            '__TABLE_TAB_TWO_LABEL__',
            '__TABLE_TAB_TWO_ICON__',
            '__TABLE_TAB_THREE_LABEL__',
            '__TABLE_TAB_THREE_ICON__',
            '__TABLE_TAB_FOUR_LABEL__',
            '__TABLE_TAB_FOUR_ICON__',
            '__TABLE_TAB_FIVE_LABEL__',
            '__TABLE_TAB_FIVE_ICON__',
            '__TABLE_PRIMARY_TITLE__',
            '__TABLE_PRIMARY_COL_TWO__',
            '__TABLE_PRIMARY_COL_THREE__',
            '__TABLE_PRIMARY_COL_FOUR__',
            '__TABLE_PRIMARY_EMPTY__',
            '__TABLE_SECONDARY_TITLE__',
            '__TABLE_SECONDARY_COL_TWO__',
            '__TABLE_SECONDARY_COL_THREE__',
            '__TABLE_SECONDARY_COL_FOUR__',
            '__TABLE_SECONDARY_EMPTY__',
            '__TABLE_TERTIARY_TITLE__',
            '__TABLE_TERTIARY_COL_TWO__',
            '__TABLE_TERTIARY_COL_THREE__',
            '__TABLE_TERTIARY_COL_FOUR__',
            '__TABLE_TERTIARY_EMPTY__',
            '__TABLE_EXTRA_TITLE__',
            '__TABLE_EXTRA_COL_TWO__',
            '__TABLE_EXTRA_COL_THREE__',
            '__TABLE_EXTRA_COL_FOUR__',
            '__TABLE_EXTRA_EMPTY__',
            '__TABLE_NOTES_TITLE__',
            '__TABLE_NOTE_ONE_TITLE__',
            '__TABLE_NOTE_ONE_COPY__',
            '__TABLE_NOTE_TWO_TITLE__',
            '__TABLE_NOTE_TWO_COPY__',
            '__TABLE_NOTE_THREE_TITLE__',
            '__TABLE_NOTE_THREE_COPY__'
        ],
        sourceBehaviours: [
            'requires at least five top-level output tabs after adaptation',
            'keeps the tab section right-aligned on desktop',
            'keeps the tab section on one horizontal line with scrollable overflow when needed',
            'keeps tab states flat with no shadow or lifted transform',
            'requires final runtime overrides for older tool-local active-tab shadow or transform rules',
            'keeps the first tab as a table section',
            'keeps the final tab as JSON',
            'requires every tab button to be rounded and icon-bearing',
            'requires every panel to include a visible title before generated output',
            'keeps first table column as centered #',
            'keeps middle table columns aligned to logical start',
            'keeps status, signal, severity, criticality, health, state, result, and label columns centered when present',
            'keeps final table column as centered row action',
            'keeps the final action column sticky on horizontally scrolling tables',
            'keeps the sticky action column flat with no side shadow',
            'requires generated row text wrappers to clamp to two or three lines',
            'provides one optional extra tab and table panel before JSON for families that need another section',
            'uses icon-only row copy buttons with accessible labels',
            'keeps empty states inside the table or output frame',
            'uses compact table columns instead of wide spreadsheet layouts',
            'keeps tabs as intrinsic-width pills on one scrollable mobile row',
            'does not define family row state, sorting, copy payloads, exports, restore validation, or JSON schema'
        ]
    };

    /**
     * Returns the base table output workspace source metadata.
     *
     * @returns {Record<string, unknown>} Section source metadata.
     */
    function baseTableOutputSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    /**
     * Activates a table output panel inside an adapted source root.
     *
     * @param {HTMLElement} root Table output shell root.
     * @param {string} panelId Panel id to activate.
     * @returns {boolean} True when a matching panel was activated.
     */
    function activateBaseTableOutputPanel(root, panelId) {
        if (!root || !panelId) {
            return false;
        }

        const tabs = Array.from(root.querySelectorAll('[role="tab"][data-tab-target]'));
        const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
        const targetPanel = panels.find(function findPanel(panel) {
            return panel.id === panelId;
        });

        if (!targetPanel) {
            return false;
        }

        tabs.forEach(function updateTab(tab) {
            const active = tab.getAttribute('data-tab-target') === panelId;
            tab.classList.toggle('is-active', active);
            tab.classList.toggle('active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
            tab.setAttribute('tabindex', active ? '0' : '-1');
        });

        panels.forEach(function updatePanel(panel) {
            const active = panel === targetPanel;
            panel.classList.toggle('is-active', active);
            panel.hidden = !active;
        });

        return true;
    }

    registry.baseTableOutputSourceSection = baseTableOutputSourceSection;
    registry.tableOutput = baseTableOutputSourceSection;
    registry.activateBaseTableOutputPanel = activateBaseTableOutputPanel;
    global.InfraStackBaseWorkspaceSections = registry;
}(window));
