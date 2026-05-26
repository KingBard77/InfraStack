// section.js
(function attachOutputToolbarSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        section: '08_sort-card',
        title: 'sort card',
        baseSource: 'templates/content/factory/phase-1/_base/workspace/06_output-toolbar',
        role: 'sortable output toolbar with five implemented actions',
        sortOptions: [
                  "ID",
                  "A-Z",
                  "Component",
                  "Placement",
                  "Purpose"
        ],
        actionLabels: [
                  "Export PNG",
                  "Download SVG",
                  "Copy JSON",
                  "Download JSON",
                  "Import JSON"
        ],
        sourceDomIds: [
                  "__DOM_PREFIX__InventorySort",
                  "__DOM_PREFIX__InventorySortSelect",
                  "__DOM_PREFIX__InventorySortSummary",
                  "__DOM_PREFIX__SortMenu",
                  "__DOM_PREFIX__ExportPng",
                  "__DOM_PREFIX__DownloadSvg",
                  "__DOM_PREFIX__CopyJson",
                  "__DOM_PREFIX__DownloadJson",
                  "__DOM_PREFIX__ImportJsonButton",
                  "__DOM_PREFIX__ImportJson"
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
        sourceBehaviours: [
            'keeps Sort as the left-side control and five output actions on the right on desktop',
            'keeps ID as the visible default sort summary and id as the hidden value',
            'uses a custom CSS dropdown with a menu matching the closed summary width',
            'keeps toolbar ancestors overflow-visible and raises open dropdowns above following cards',
            'stacks sort and action controls safely on mobile',
            'requires real JSON restore plumbing whenever Import JSON is visible in a final tool'
        ]
    };

    /**
     * Returns the sort card workspace source metadata.
     *
     * @returns {Record<string, unknown>} Section source metadata.
     */
    function sortCardSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.sortCardSourceSection = sortCardSourceSection;
    registry.sortCard = sortCardSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
