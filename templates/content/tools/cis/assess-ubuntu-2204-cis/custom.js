// custom.js

// ns:start family.assessment.workspace.01_input-brief
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.01_input-brief
// ns:start family.assessment.workspace.02_basic-settings
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.02_basic-settings
// ns:start family.assessment.workspace.03_advanced-settings
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.03_advanced-settings
// ns:start family.assessment.workspace.04_selected-item
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.04_selected-item
// ns:start family.assessment.workspace.05_result-summary
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.05_result-summary
// ns:start family.assessment.workspace.06_result-view
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.06_result-view
// ns:start family.assessment.workspace.07_table-export
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.07_table-export
// ns:start family.assessment.workspace.08_json-restore
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.08_json-restore

const assessUbuntu2204CisData = {{ include('content/tools/cis/assess-ubuntu-2204-cis/assets/custom.json.twig')|raw }};
const assessUbuntu2204CisScriptEndpoint = '{{ path('app_cis_assess_ubuntu_2204_cis_script') }}';

document.addEventListener('DOMContentLoaded', function () {
    const benchmark = assessUbuntu2204CisData.benchmark || {};
    const families = Array.isArray(assessUbuntu2204CisData.families) ? assessUbuntu2204CisData.families.slice() : [];
    const sections = Array.isArray(assessUbuntu2204CisData.sections) ? assessUbuntu2204CisData.sections.slice() : [];
    const controls = Array.isArray(assessUbuntu2204CisData.controls) ? assessUbuntu2204CisData.controls.slice() : [];
    const form = document.getElementById('assessUbuntu2204CisForm');
    const queryInput = document.getElementById('assessUbuntu2204CisQuery');
    const submitButton = document.getElementById('assessUbuntu2204CisSubmit');
    const familyInput = document.getElementById('assessUbuntu2204CisFamily');
    const familySummary = document.getElementById('assessUbuntu2204CisFamilySummary');
    const familySelect = document.getElementById('assessUbuntu2204CisFamilySelect');
    const familyOptionsContainer = document.getElementById('assessUbuntu2204CisFamilyOptions');
    const familyResetButton = document.getElementById('assessUbuntu2204CisFamilyReset');
    const sectionPathInput = document.getElementById('assessUbuntu2204CisSectionPath');
    const sectionSummary = document.getElementById('assessUbuntu2204CisSectionSummary');
    const sectionSelect = document.getElementById('assessUbuntu2204CisSectionSelect');
    const sectionOptionsContainer = document.getElementById('assessUbuntu2204CisSectionOptions');
    const sectionResetButton = document.getElementById('assessUbuntu2204CisSectionReset');
    const criticalityInput = document.getElementById('assessUbuntu2204CisCriticality');
    const criticalitySummary = document.getElementById('assessUbuntu2204CisCriticalitySummary');
    const criticalitySelect = document.getElementById('assessUbuntu2204CisCriticalitySelect');
    const criticalityOptionsContainer = document.getElementById('assessUbuntu2204CisCriticalityOptions');
    const selectedControlInput = document.getElementById('assessUbuntu2204CisSelectedControl');
    const controlSummary = document.getElementById('assessUbuntu2204CisControlSummary');
    const controlSelect = document.getElementById('assessUbuntu2204CisControlSelect');
    const controlOptionsContainer = document.getElementById('assessUbuntu2204CisControlOptions');
    const controlResetButton = document.getElementById('assessUbuntu2204CisControlReset');
    const sortInput = document.getElementById('assessUbuntu2204CisSort');
    const sortSummary = document.getElementById('assessUbuntu2204CisSortSummary');
    const sortSelect = document.getElementById('assessUbuntu2204CisSortSelect');
    const sortOptionsContainer = document.getElementById('assessUbuntu2204CisSortOptions');
    const rowLimitInput = document.getElementById('assessUbuntu2204CisRowLimit');
    const rowLimitSummary = document.getElementById('assessUbuntu2204CisRowLimitSummary');
    const rowLimitSelect = document.getElementById('assessUbuntu2204CisRowLimitSelect');
    const rowLimitOptionsContainer = document.getElementById('assessUbuntu2204CisRowLimitOptions');
    const criticalityRow = document.getElementById('assessUbuntu2204CisCriticalityRow');
    const resultEmpty = document.getElementById('assessUbuntu2204CisResultEmpty');
    const resultError = document.getElementById('assessUbuntu2204CisResultError');
    const resultContent = document.getElementById('assessUbuntu2204CisResultContent');
    const resultSummary = document.getElementById('assessUbuntu2204CisResultSummary');
    const toolbarMeta = document.getElementById('assessUbuntu2204CisToolbarMeta');
    const controlsTableBody = document.getElementById('assessUbuntu2204CisControlsTableBody');
    const sectionsTableBody = document.getElementById('assessUbuntu2204CisSectionsTableBody');
    const scriptMeta = document.getElementById('assessUbuntu2204CisScriptMeta');
    const scriptOutput = document.getElementById('assessUbuntu2204CisScriptOutput');
    const jsonOutput = document.getElementById('assessUbuntu2204CisJsonOutput');
    const copyScriptButton = document.getElementById('assessUbuntu2204CisCopyScript');
    const downloadScriptButton = document.getElementById('assessUbuntu2204CisDownloadScript');
    const exportPdfButton = document.getElementById('assessUbuntu2204CisExportPdf');
    const downloadCsvButton = document.getElementById('assessUbuntu2204CisDownloadCsv');
    const copyJsonButton = document.getElementById('assessUbuntu2204CisCopyJson');
    const downloadJsonButton = document.getElementById('assessUbuntu2204CisDownloadJson');
    const tabButtons = Array.from(document.querySelectorAll('.assess-ubuntu-2204-cis-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.assess-ubuntu-2204-cis-tab-panel'));

    let latestResult = null;
    let latestScriptRequestId = 0;

    const sortCatalog = [
        {
            value: 'id',
            title: 'ID',
            meta: 'Sort numerically by benchmark control number'
        },
        {
            value: 'title',
            title: 'Title',
            meta: 'Sort alphabetically by control title'
        },
        {
            value: 'section',
            title: 'Section path',
            meta: 'Group scripts by the directory path that contains them'
        },
        {
            value: 'criticality',
            title: 'Criticality',
            meta: 'Show declared criticality before unspecified scripts'
        }
    ];
    const rowLimitCatalog = [
        {
            value: '25',
            title: '25 rows',
            meta: 'Compact preview'
        },
        {
            value: '50',
            title: '50 rows',
            meta: 'Default review slice'
        },
        {
            value: '100',
            title: '100 rows',
            meta: 'Expanded review slice'
        },
        {
            value: 'all',
            title: 'All rows',
            meta: 'Render every matched script'
        }
    ];
    const defaultUrlState = {
        query: '',
        family: 'all',
        sectionPath: 'all',
        criticality: 'all',
        selectedControl: '',
        sort: 'id',
        rowLimit: '50'
    };
    const familyCatalog = [
        {
            value: 'all',
            title: 'All sections',
            meta: `${benchmark.control_count || controls.length} scripts across ${families.length} benchmark families`
        }
    ].concat(families.map(function (family) {
        return {
            value: family.key,
            title: family.label,
            meta: `${family.control_count} scripts across ${family.section_count} section paths`
        };
    }));
    const criticalityCatalog = buildCriticalityCatalog();

    if (
        !form ||
        !queryInput ||
        !submitButton ||
        !familyInput ||
        !familySummary ||
        !familySelect ||
        !familyOptionsContainer ||
        !familyResetButton ||
        !sectionPathInput ||
        !sectionSummary ||
        !sectionSelect ||
        !sectionOptionsContainer ||
        !sectionResetButton ||
        !criticalityInput ||
        !criticalitySummary ||
        !criticalitySelect ||
        !criticalityOptionsContainer ||
        !selectedControlInput ||
        !controlSummary ||
        !controlSelect ||
        !controlOptionsContainer ||
        !controlResetButton ||
        !sortInput ||
        !sortSummary ||
        !sortSelect ||
        !sortOptionsContainer ||
        !rowLimitInput ||
        !rowLimitSummary ||
        !rowLimitSelect ||
        !rowLimitOptionsContainer ||
        !criticalityRow ||
        !resultEmpty ||
        !resultError ||
        !resultContent ||
        !resultSummary ||
        !toolbarMeta ||
        !controlsTableBody ||
        !sectionsTableBody ||
        !scriptMeta ||
        !scriptOutput ||
        !jsonOutput ||
        !copyScriptButton ||
        !downloadScriptButton ||
        !exportPdfButton ||
        !downloadCsvButton ||
        !copyJsonButton ||
        !downloadJsonButton ||
        controls.length === 0 ||
        sections.length === 0 ||
        tabButtons.length === 0 ||
        tabPanels.length === 0
    ) {
        return;
    }

    function initMarkdownCopyButtons() {
        const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.assess-ubuntu-2204-cis-prompt-pre'));
        const promptCopyButtons = document.querySelectorAll('.assess-ubuntu-2204-cis-prompt-copy-btn');

        promptCopyButtons.forEach(function (button) {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', async function (event) {
                event.preventDefault();
                event.stopPropagation();

                try {
                    await navigator.clipboard.writeText(code.textContent.trim());
                    flashButton(button.querySelector('span') || button, 'Copied');
                    button.classList.add('copied');
                    window.setTimeout(function () {
                        button.classList.remove('copied');
                    }, 1400);
                } catch (error) {
                    flashButton(button.querySelector('span') || button, 'Failed');
                }
            });
        });

        const commandBlocks = Array.from(document.querySelectorAll('.markdown-content pre.assess-ubuntu-2204-cis-command-example-pre'));
        const commandCopyButtons = document.querySelectorAll('.assess-ubuntu-2204-cis-command-copy-btn');

        commandCopyButtons.forEach(function (button) {
            const commandIndex = Number.parseInt(button.dataset.commandCopyIndex || '', 10);
            const commandBlock = Number.isFinite(commandIndex) ? commandBlocks[commandIndex] : null;
            const code = commandBlock ? commandBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', async function (event) {
                event.preventDefault();
                event.stopPropagation();

                try {
                    await navigator.clipboard.writeText(code.textContent.trim());
                    flashButton(button.querySelector('span') || button, 'Copied');
                    button.classList.add('copied');
                    window.setTimeout(function () {
                        button.classList.remove('copied');
                    }, 1400);
                } catch (error) {
                    flashButton(button.querySelector('span') || button, 'Failed');
                }
            });
        });

        const codeBlocks = document.querySelectorAll('.markdown-content pre:not(.assess-ubuntu-2204-cis-prompt-pre):not(.assess-ubuntu-2204-cis-command-example-pre)');

        codeBlocks.forEach(function (pre) {
            if (pre.querySelector('.markdown-copy-btn')) {
                return;
            }

            const code = pre.querySelector('code');

            if (!code) {
                return;
            }

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'markdown-copy-btn';
            button.textContent = 'Copy';

            button.addEventListener('click', async function () {
                try {
                    await navigator.clipboard.writeText(code.textContent.trim());
                    flashButton(button, 'Copied');
                    button.classList.add('copied');
                    window.setTimeout(function () {
                        button.classList.remove('copied');
                    }, 1400);
                } catch (error) {
                    flashButton(button, 'Failed');
                }
            });

            pre.appendChild(button);
        });
    }

    function flashButton(button, text) {
        const labelTarget = button.querySelector('[data-button-label]') || button;
        const originalText = button.dataset.defaultLabel || labelTarget.textContent;
        button.dataset.defaultLabel = originalText;
        labelTarget.textContent = text;

        window.setTimeout(function () {
            labelTarget.textContent = originalText;
        }, 1400);
    }

    function escapeJsonHtml(value) {
        return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function highlightJsonText(text) {
        return escapeJsonHtml(text).replace(/("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            if (match.startsWith('"')) {
                return `<span class="${match.endsWith(':') ? 'tool-json-key' : 'tool-json-string'}">${match}</span>`;
            }
            if (match === 'true' || match === 'false') {
                return `<span class="tool-json-boolean">${match}</span>`;
            }
            if (match === 'null') {
                return `<span class="tool-json-null">${match}</span>`;
            }
            return `<span class="tool-json-number">${match}</span>`;
        });
    }

    function formatCriticalityLabel(value, fallbackLabel) {
        if (Number(value) === 0) {
            return 'Unspecified';
        }

        return fallbackLabel || `Level ${value}`;
    }

    function criticalityTone(value) {
        return Number(value) === 0 ? 'unspecified' : 'low';
    }

    function buildCriticalityCatalog() {
        const counts = controls.reduce(function (accumulator, control) {
            const key = String(Number(control.criticality || 0));
            accumulator[key] = (accumulator[key] || 0) + 1;
            return accumulator;
        }, {});
        const specificOptions = Object.keys(counts)
            .map(function (key) {
                return Number(key);
            })
            .sort(function (leftValue, rightValue) {
                if (leftValue === 0) {
                    return 1;
                }

                if (rightValue === 0) {
                    return -1;
                }

                return rightValue - leftValue;
            })
            .map(function (value) {
                return {
                    value: String(value),
                    title: formatCriticalityLabel(value),
                    meta: `${counts[String(value)]} scripts`
                };
            });

        return [
            {
                value: 'all',
                title: 'All criticality',
                meta: `${controls.length} scripts`
            }
        ].concat(specificOptions);
    }

    function normalizeQuery(value) {
        return String(value || '').trim().toLowerCase();
    }

    function naturalCompare(leftValue, rightValue) {
        return String(leftValue || '').localeCompare(String(rightValue || ''), undefined, {
            numeric: true,
            sensitivity: 'base'
        });
    }

    function normalizeRowLimit(value) {
        if (value === 'all') {
            return 'all';
        }

        const numericValue = Number(value);

        if (!Number.isFinite(numericValue) || numericValue <= 0) {
            return 50;
        }

        return Math.round(numericValue);
    }

    function findOptionByValue(options, value) {
        return options.find(function (option) {
            return option.value === value;
        }) || null;
    }

    function renderSelectOptions(container, options, groupName, selectedValue) {
        container.innerHTML = options.map(function (option) {
            const isChecked = option.value === selectedValue;
            const metaMarkup = option.meta
                ? `<span class="assess-ubuntu-2204-cis-select-meta">${escapeHtml(option.meta)}</span>`
                : '';

            return `
                <label class="assess-ubuntu-2204-cis-select-card">
                  <input type="radio" name="${escapeHtml(groupName)}" value="${escapeHtml(option.value)}"${isChecked ? ' checked' : ''}>
                  <span>
                    <span class="assess-ubuntu-2204-cis-select-title">${escapeHtml(option.title)}</span>
                    ${metaMarkup}
                  </span>
                </label>
            `;
        }).join('');
    }

    function renderSortOptions(container, options, selectedValue) {
        container.innerHTML = options.map(function (option) {
            const isActive = option.value === selectedValue;
            const metaAttribute = option.meta ? ` title="${escapeHtml(option.meta)}"` : '';

            return `
                <button type="button" class="assess-ubuntu-2204-cis-sort-option${isActive ? ' is-active' : ''}" data-sort-value="${escapeHtml(option.value)}" aria-pressed="${isActive ? 'true' : 'false'}"${metaAttribute}>
                  ${escapeHtml(option.title)}
                </button>
            `;
        }).join('');
    }

    function renderControlOptions(controlList, selectedValue) {
        if (controlList.length === 0) {
            controlOptionsContainer.innerHTML = '<div class="assess-ubuntu-2204-cis-select-empty">No matched scripts in the current scope.</div>';
            controlSelect.classList.add('assess-ubuntu-2204-cis-select-inactive');
            return;
        }

        controlSelect.classList.remove('assess-ubuntu-2204-cis-select-inactive');

        renderSelectOptions(controlOptionsContainer, buildControlCatalog(controlList), 'assessUbuntu2204CisControlOption', selectedValue);
    }

    function buildControlCatalog(controlList) {
        return controlList.map(function (control) {
            return {
                value: control.script_path,
                title: `${control.id} ${control.title}`,
                meta: `${formatCriticalityLabel(control.criticality, control.criticality_label)} • ${control.section_path}`
            };
        });
    }

    function buildSectionCatalog(familyValue) {
        const familyScopedControls = filterControlsByFamily(controls, familyValue);
        const scopedSections = familyValue === 'all'
            ? sections.slice()
            : sections.filter(function (section) {
                return section.family === familyValue;
            });

        return [
            {
                value: 'all',
                title: 'All paths',
                meta: `${familyScopedControls.length} scripts in the current family scope`
            }
        ].concat(scopedSections.map(function (section) {
            const detailParts = [
                `${section.control_count} scripts`,
                `depth ${section.depth}`
            ];

            if (section.is_leaf) {
                detailParts.push('leaf');
            } else if (section.child_count > 0) {
                detailParts.push(`${section.child_count} child paths`);
            }

            return {
                value: section.path,
                title: section.path,
                meta: detailParts.join(' • ')
            };
        }));
    }

    function updateSelectSummary(summaryElement, options, value, fallbackText) {
        const option = findOptionByValue(options, value);
        summaryElement.textContent = option ? option.title : fallbackText;
    }

    function controlSummaryText(control) {
        if (!control) {
            return 'No matched script';
        }

        return `${control.id} ${control.title}`;
    }

    function renderStaticSelects(state, filteredControls, selectedControl) {
        renderSelectOptions(familyOptionsContainer, familyCatalog, 'assessUbuntu2204CisFamilyOption', state.family);
        renderSelectOptions(sectionOptionsContainer, buildSectionCatalog(state.family), 'assessUbuntu2204CisSectionOption', state.sectionPath);
        renderSelectOptions(criticalityOptionsContainer, criticalityCatalog, 'assessUbuntu2204CisCriticalityOption', state.criticality);
        renderSortOptions(sortOptionsContainer, sortCatalog, state.sort);
        renderSelectOptions(rowLimitOptionsContainer, rowLimitCatalog, 'assessUbuntu2204CisRowLimitOption', state.rowLimit);
        renderControlOptions(filteredControls, state.selectedControl);

        updateSelectSummary(familySummary, familyCatalog, state.family, 'All sections');
        updateSelectSummary(sectionSummary, buildSectionCatalog(state.family), state.sectionPath, 'All paths');
        updateSelectSummary(criticalitySummary, criticalityCatalog, state.criticality, 'All criticality');
        updateSelectSummary(sortSummary, sortCatalog, state.sort, 'ID');
        updateSelectSummary(rowLimitSummary, rowLimitCatalog, state.rowLimit, '50 rows');
        controlSummary.textContent = controlSummaryText(selectedControl);
    }

    function attachRadioChangeHandler(container, hiddenInput, detailsElement, onAfterChange) {
        container.addEventListener('change', function (event) {
            const target = event.target;

            if (!(target instanceof HTMLInputElement) || target.type !== 'radio') {
                return;
            }

            hiddenInput.value = target.value;

            if (detailsElement) {
                detailsElement.removeAttribute('open');
            }

            if (typeof onAfterChange === 'function') {
                onAfterChange(target.value);
            }
        });
    }

    function attachSortButtonHandler() {
        sortOptionsContainer.addEventListener('click', function (event) {
            const target = event.target instanceof HTMLElement ? event.target : null;
            const button = target ? target.closest('button[data-sort-value]') : null;

            if (!button || !sortOptionsContainer.contains(button)) {
                return;
            }

            sortInput.value = button.getAttribute('data-sort-value') || 'id';
            sortSelect.removeAttribute('open');
            renderExplorer();
        });

        sortSelect.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                sortSelect.removeAttribute('open');
            }
        });
    }

    function renderCriticalityOverview() {
        const counts = controls.reduce(function (accumulator, control) {
            const key = Number(control.criticality) === 0 ? 'unspecified' : 'low';
            accumulator[key] = (accumulator[key] || 0) + 1;
            return accumulator;
        }, {});

        criticalityRow.innerHTML = `
            <span class="assess-ubuntu-2204-cis-criticality-pill" data-tone="low"><strong>${counts.low || 0}</strong><span>Low</span></span>
            <span class="assess-ubuntu-2204-cis-criticality-pill" data-tone="unspecified"><strong>${counts.unspecified || 0}</strong><span>Unspecified</span></span>
        `;
    }

    function activateTab(targetId) {
        tabButtons.forEach(function (button) {
            const isActive = button.dataset.tabTarget === targetId;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.tabIndex = isActive ? 0 : -1;
        });

        tabPanels.forEach(function (panel) {
            const isActive = panel.id === targetId;
            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function buildState() {
        return {
            query: String(queryInput.value || '').trim(),
            family: familyInput.value || 'all',
            sectionPath: sectionPathInput.value || 'all',
            criticality: criticalityInput.value || 'all',
            selectedControl: selectedControlInput.value || '',
            sort: sortInput.value || 'id',
            rowLimit: rowLimitInput.value || '50'
        };
    }

    function normalizeState(state) {
        const familyValue = findOptionByValue(familyCatalog, state.family) ? state.family : 'all';
        const sectionCatalog = buildSectionCatalog(familyValue);
        const sectionValue = findOptionByValue(sectionCatalog, state.sectionPath) ? state.sectionPath : 'all';
        const criticalityValue = findOptionByValue(criticalityCatalog, state.criticality) ? state.criticality : 'all';
        const sortValue = findOptionByValue(sortCatalog, state.sort) ? state.sort : 'id';
        const rowLimitValue = findOptionByValue(rowLimitCatalog, state.rowLimit) ? state.rowLimit : '50';

        return {
            query: String(state.query || '').trim(),
            family: familyValue,
            sectionPath: sectionValue,
            criticality: criticalityValue,
            selectedControl: String(state.selectedControl || ''),
            sort: sortValue,
            rowLimit: rowLimitValue
        };
    }

    function filterControlsByFamily(controlList, familyValue) {
        if (!familyValue || familyValue === 'all') {
            return controlList.slice();
        }

        return controlList.filter(function (control) {
            return control.family === familyValue;
        });
    }

    function filterControlsBySection(controlList, sectionPath) {
        if (!sectionPath || sectionPath === 'all') {
            return controlList.slice();
        }

        return controlList.filter(function (control) {
            return control.section_path === sectionPath || control.section_path.startsWith(`${sectionPath}/`);
        });
    }

    function filterControlsByCriticality(controlList, criticalityValue) {
        if (!criticalityValue || criticalityValue === 'all') {
            return controlList.slice();
        }

        return controlList.filter(function (control) {
            return String(Number(control.criticality || 0)) === criticalityValue;
        });
    }

    function applyQueryFilter(controlList, queryValue) {
        const normalizedQuery = normalizeQuery(queryValue);

        if (!normalizedQuery) {
            return controlList.slice();
        }

        return controlList.filter(function (control) {
            const haystack = [
                control.id,
                control.title,
                control.family,
                control.family_label,
                control.section_path,
                control.section_label,
                control.script_path,
                control.script_name
            ].join(' ').toLowerCase();

            return haystack.includes(normalizedQuery);
        });
    }

    function sortControls(controlList, sortValue) {
        const sortedControls = controlList.slice();

        sortedControls.sort(function (leftControl, rightControl) {
            if (sortValue === 'id') {
                return naturalCompare(leftControl.id, rightControl.id);
            }

            if (sortValue === 'title') {
                return naturalCompare(leftControl.title, rightControl.title);
            }

            if (sortValue === 'section') {
                return naturalCompare(leftControl.section_path, rightControl.section_path)
                    || naturalCompare(leftControl.id, rightControl.id);
            }

            if (sortValue === 'criticality') {
                const leftWeight = Number(leftControl.criticality) === 0 ? -1 : Number(leftControl.criticality);
                const rightWeight = Number(rightControl.criticality) === 0 ? -1 : Number(rightControl.criticality);

                return rightWeight - leftWeight || naturalCompare(leftControl.id, rightControl.id);
            }

            return Number(leftControl.order) - Number(rightControl.order);
        });

        return sortedControls;
    }

    function limitControls(controlList, rowLimitValue) {
        const normalizedLimit = normalizeRowLimit(rowLimitValue);

        if (normalizedLimit === 'all') {
            return controlList.slice();
        }

        return controlList.slice(0, normalizedLimit);
    }

    function buildVisibleSections(controlList) {
        const sectionAccumulator = new Map();

        controlList.forEach(function (control) {
            const pathParts = String(control.section_path || '').split('/');

            pathParts.forEach(function (_, index) {
                const currentPath = pathParts.slice(0, index + 1).join('/');
                sectionAccumulator.set(currentPath, (sectionAccumulator.get(currentPath) || 0) + 1);
            });
        });

        return sections
            .filter(function (section) {
                return sectionAccumulator.has(section.path);
            })
            .map(function (section) {
                return Object.assign({}, section, {
                    visible_control_count: sectionAccumulator.get(section.path) || 0
                });
            });
    }

    function buildSelectedControl(controlList, selectedControlPath) {
        if (controlList.length === 0) {
            return null;
        }

        return controlList.find(function (control) {
            return control.script_path === selectedControlPath;
        }) || controlList[0];
    }

    function buildSummaryMarkup(result) {
        const queryBadge = result.state.query
            ? `<span class="assess-ubuntu-2204-cis-badge">Filter: ${escapeHtml(result.state.query)}</span>`
            : '';
        const familyBadge = `<span class="assess-ubuntu-2204-cis-badge">Family: ${escapeHtml(result.state.family === 'all' ? 'All sections' : result.state.family)}</span>`;
        const sectionBadge = `<span class="assess-ubuntu-2204-cis-badge">Section: ${escapeHtml(result.state.sectionPath === 'all' ? 'All paths' : result.state.sectionPath)}</span>`;
        const criticalityBadge = `<span class="assess-ubuntu-2204-cis-badge">Criticality: ${escapeHtml(findOptionByValue(criticalityCatalog, result.state.criticality).title)}</span>`;
        const selectedMeta = result.selectedControl
            ? `${escapeHtml(result.selectedControl.id)} • ${escapeHtml(result.selectedControl.script_name)}`
            : 'No matched script';

        return `
            <div class="assess-ubuntu-2204-cis-summary-grid">
              <article class="assess-ubuntu-2204-cis-summary-card">
                <span class="assess-ubuntu-2204-cis-summary-kicker">Matched scripts</span>
                <strong class="assess-ubuntu-2204-cis-summary-value">${result.filteredControls.length}</strong>
                <span class="assess-ubuntu-2204-cis-summary-meta">Controls currently matching the selected filters</span>
              </article>
              <article class="assess-ubuntu-2204-cis-summary-card">
                <span class="assess-ubuntu-2204-cis-summary-kicker">Visible rows</span>
                <strong class="assess-ubuntu-2204-cis-summary-value">${result.visibleControls.length}</strong>
                <span class="assess-ubuntu-2204-cis-summary-meta">Rows rendered in the controls table</span>
              </article>
              <article class="assess-ubuntu-2204-cis-summary-card">
                <span class="assess-ubuntu-2204-cis-summary-kicker">Matched sections</span>
                <strong class="assess-ubuntu-2204-cis-summary-value">${result.visibleSections.length}</strong>
                <span class="assess-ubuntu-2204-cis-summary-meta">Section rollups built from the filtered control set</span>
              </article>
              <article class="assess-ubuntu-2204-cis-summary-card">
                <span class="assess-ubuntu-2204-cis-summary-kicker">Selected script</span>
                <strong class="assess-ubuntu-2204-cis-summary-value">${result.selectedControl ? result.selectedControl.script_line_count : 0}</strong>
                <span class="assess-ubuntu-2204-cis-summary-meta">${result.selectedControl ? 'Lines in the displayed script body' : 'No script currently selected'}</span>
              </article>
            </div>
            <div class="assess-ubuntu-2204-cis-badge-row">
              <span class="assess-ubuntu-2204-cis-badge">Benchmark: ${escapeHtml(benchmark.name || 'Ubuntu 22.04 CIS')}</span>
              ${familyBadge}
              ${sectionBadge}
              ${criticalityBadge}
              <span class="assess-ubuntu-2204-cis-badge">Selected: ${selectedMeta}</span>
              ${queryBadge}
            </div>
        `;
    }

    function renderToolbarMeta(result) {
        const rowLimitLabel = normalizeRowLimit(result.state.rowLimit) === 'all'
            ? 'All rows'
            : `${normalizeRowLimit(result.state.rowLimit)} row limit`;
        const selectedLabel = result.selectedControl
            ? result.selectedControl.id
            : 'None';

        toolbarMeta.innerHTML = `
            <span class="assess-ubuntu-2204-cis-toolbar-pill">Family scope: ${result.familyScopedControls.length}</span>
            <span class="assess-ubuntu-2204-cis-toolbar-pill">Section scope: ${result.sectionScopedControls.length}</span>
            <span class="assess-ubuntu-2204-cis-toolbar-pill">Criticality scope: ${result.criticalityScopedControls.length}</span>
            <span class="assess-ubuntu-2204-cis-toolbar-pill">${escapeHtml(rowLimitLabel)}</span>
            <span class="assess-ubuntu-2204-cis-toolbar-pill">Selected: ${escapeHtml(selectedLabel)}</span>
        `;
    }

    function renderControlsTable(result) {
        if (result.visibleControls.length === 0) {
            controlsTableBody.innerHTML = `
                <tr class="assess-ubuntu-2204-cis-empty-row">
                  <td colspan="7">No scripts matched the current filter.</td>
                </tr>
            `;
            return;
        }

        controlsTableBody.innerHTML = result.visibleControls.map(function (control, index) {
            const criticalityLabel = formatCriticalityLabel(control.criticality, control.criticality_label);
            const isSelected = result.selectedControl && result.selectedControl.script_path === control.script_path;
            const sectionDisplay = control.section_label || control.section_path;
            const scriptDisplay = control.script_name || control.script_path;

            return `
                <tr data-control-path="${escapeHtml(control.script_path)}" class="${isSelected ? 'assess-ubuntu-2204-cis-control-row-selected' : ''}">
                  <td class="tool-generated-rownum-cell">${index + 1}</td>
                  <td><span class="assess-ubuntu-2204-cis-control-id">${escapeHtml(control.id)}</span></td>
                  <td><span class="assess-ubuntu-2204-cis-title-text">${escapeHtml(control.title)}</span></td>
                  <td>
                    <div class="assess-ubuntu-2204-cis-section-cell">
                      <span class="assess-ubuntu-2204-cis-path-text" title="${escapeHtml(control.section_path)}">${escapeHtml(sectionDisplay)}</span>
                      <span class="assess-ubuntu-2204-cis-section-family">${escapeHtml(control.family_label)}</span>
                    </div>
                  </td>
                  <td><span class="assess-ubuntu-2204-cis-criticality-badge" data-tone="${escapeHtml(criticalityTone(control.criticality))}">${escapeHtml(criticalityLabel)}</span></td>
                  <td><span class="assess-ubuntu-2204-cis-script-text" title="${escapeHtml(control.script_path)}">${escapeHtml(scriptDisplay)}</span></td>
                  <td class="assess-ubuntu-2204-cis-table-action-cell">
                    <button type="button" class="assess-ubuntu-2204-cis-row-copy" data-control-copy-row="${index}" aria-label="Copy control row ${index + 1}" title="Copy control row">
                      <i class="bi bi-clipboard" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
            `;
        }).join('');
    }

    function renderSectionsTable(result) {
        if (result.visibleSections.length === 0) {
            sectionsTableBody.innerHTML = `
                <tr class="assess-ubuntu-2204-cis-empty-row">
                  <td colspan="6">No section paths matched the current result set.</td>
                </tr>
            `;
            return;
        }

        sectionsTableBody.innerHTML = result.visibleSections.map(function (section, index) {
            const rangeText = section.first_control_id && section.last_control_id
                ? section.first_control_id === section.last_control_id
                    ? section.first_control_id
                    : `${section.first_control_id} → ${section.last_control_id}`
                : 'n/a';

            return `
                <tr>
                  <td class="tool-generated-rownum-cell">${index + 1}</td>
                  <td>
                    <div class="assess-ubuntu-2204-cis-section-cell">
                      <span class="assess-ubuntu-2204-cis-path-text">${escapeHtml(section.path)}</span>
                      <span class="assess-ubuntu-2204-cis-section-family">${escapeHtml(section.full_label)}</span>
                    </div>
                  </td>
                  <td>${section.depth}</td>
                  <td>${section.visible_control_count}</td>
                  <td>${section.child_count}</td>
                  <td><span class="assess-ubuntu-2204-cis-range-text">${escapeHtml(rangeText)}</span></td>
                </tr>
            `;
        }).join('');
    }

    function buildControlRowCopyText(control, rowIndex) {
        const criticalityLabel = formatCriticalityLabel(control.criticality, control.criticality_label);

        return [
            `Row: ${rowIndex + 1}`,
            `Control: ${control.id || ''}`,
            `Title: ${control.title || ''}`,
            `Section: ${control.section_path || ''}`,
            `Criticality: ${criticalityLabel}`,
            `Script: ${control.script_path || ''}`
        ].join('\n');
    }

    function flashControlCopyButton(button, label) {
        const originalTitle = button.dataset.copyTitle || button.getAttribute('title') || 'Copy control row';
        const originalLabel = button.dataset.copyLabel || button.getAttribute('aria-label') || originalTitle;

        button.dataset.copyTitle = originalTitle;
        button.dataset.copyLabel = originalLabel;
        button.classList.add('copied');
        button.setAttribute('title', label);
        button.setAttribute('aria-label', label);

        window.setTimeout(function () {
            button.classList.remove('copied');
            button.setAttribute('title', originalTitle);
            button.setAttribute('aria-label', originalLabel);
        }, 1400);
    }

    async function copyControlRow(rowIndex, button) {
        if (!latestResult || !Array.isArray(latestResult.visibleControls)) {
            return;
        }

        const normalizedRowIndex = Number.parseInt(rowIndex, 10);

        if (!Number.isInteger(normalizedRowIndex) || normalizedRowIndex < 0) {
            return;
        }

        const control = latestResult.visibleControls[normalizedRowIndex];

        if (!control) {
            return;
        }

        try {
            await navigator.clipboard.writeText(buildControlRowCopyText(control, normalizedRowIndex));
            flashControlCopyButton(button, 'Copied');
        } catch (error) {
            flashControlCopyButton(button, 'Failed');
        }
    }

    function toggleScriptButtons(isEnabled) {
        copyScriptButton.disabled = !isEnabled;
        downloadScriptButton.disabled = !isEnabled;
    }

    function renderScriptState(control, statusText, scriptContent) {
        if (!control) {
            scriptMeta.innerHTML = `
                <div class="assess-ubuntu-2204-cis-script-chip">
                  <span class="assess-ubuntu-2204-cis-script-chip-label">Selection</span>
                  <span class="assess-ubuntu-2204-cis-script-chip-value">No matched script</span>
                </div>
            `;
            scriptOutput.textContent = 'No script matches the current filter.';
            toggleScriptButtons(false);
            return;
        }

        const criticalityLabel = formatCriticalityLabel(control.criticality, control.criticality_label);
        const statusMarkup = statusText
            ? `
            <div class="assess-ubuntu-2204-cis-script-chip">
              <span class="assess-ubuntu-2204-cis-script-chip-label">Status</span>
              <span class="assess-ubuntu-2204-cis-script-chip-value">${escapeHtml(statusText)}</span>
            </div>
        `
            : '';

        scriptMeta.innerHTML = `
            <div class="assess-ubuntu-2204-cis-script-chip">
              <span class="assess-ubuntu-2204-cis-script-chip-label">Control ID</span>
              <span class="assess-ubuntu-2204-cis-script-chip-value">${escapeHtml(control.id)}</span>
            </div>
            <div class="assess-ubuntu-2204-cis-script-chip">
              <span class="assess-ubuntu-2204-cis-script-chip-label">Title</span>
              <span class="assess-ubuntu-2204-cis-script-chip-value">${escapeHtml(control.title)}</span>
            </div>
            <div class="assess-ubuntu-2204-cis-script-chip">
              <span class="assess-ubuntu-2204-cis-script-chip-label">Criticality</span>
              <span class="assess-ubuntu-2204-cis-script-chip-value">${escapeHtml(criticalityLabel)}</span>
            </div>
            <div class="assess-ubuntu-2204-cis-script-chip">
              <span class="assess-ubuntu-2204-cis-script-chip-label">Section path</span>
              <span class="assess-ubuntu-2204-cis-script-chip-value">${escapeHtml(control.section_path)}</span>
            </div>
            <div class="assess-ubuntu-2204-cis-script-chip">
              <span class="assess-ubuntu-2204-cis-script-chip-label">Script path</span>
              <span class="assess-ubuntu-2204-cis-script-chip-value">${escapeHtml(control.script_path)}</span>
            </div>
            <div class="assess-ubuntu-2204-cis-script-chip">
              <span class="assess-ubuntu-2204-cis-script-chip-label">Lines</span>
              <span class="assess-ubuntu-2204-cis-script-chip-value">${control.script_line_count}</span>
            </div>
            ${statusMarkup}
        `;
        scriptOutput.textContent = scriptContent;
    }

    async function requestSelectedScript(scriptPath) {
        const response = await fetch(assessUbuntu2204CisScriptEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                scriptPath: scriptPath
            })
        });
        const payload = await response.json().catch(function () {
            return {};
        });

        if (!response.ok) {
            throw new Error(payload.error || 'Failed to load the selected script.');
        }

        if (!payload.script || typeof payload.script.script_content !== 'string') {
            throw new Error('Failed to load the selected script.');
        }

        return payload.script;
    }

    async function loadSelectedScript(result) {
        const requestId = latestScriptRequestId + 1;
        latestScriptRequestId = requestId;

        if (!result.selectedControl) {
            renderScriptState(null, '', '');
            return;
        }

        renderScriptState(result.selectedControl, 'Loading selected script...', 'Loading selected script...');

        try {
            const script = await requestSelectedScript(result.selectedControl.script_path);

            if (requestId !== latestScriptRequestId) {
                return;
            }

            if (
                !latestResult ||
                !latestResult.selectedControl ||
                latestResult.selectedControl.script_path !== script.script_path
            ) {
                return;
            }

            latestResult.selectedControl.script_content = script.script_content;
            latestResult.selectedControl.script_line_count = script.script_line_count;
            renderScriptState(latestResult.selectedControl, 'Ready', script.script_content);
            toggleScriptButtons(true);
        } catch (error) {
            if (requestId !== latestScriptRequestId) {
                return;
            }

            renderScriptState(
                result.selectedControl,
                error instanceof Error ? error.message : 'Failed to load the selected script.',
                'Failed to load the selected script.'
            );
            toggleScriptButtons(false);
        }
    }

    function buildJsonPayload(result) {
        const selectedControl = result.selectedControl
            ? {
                id: result.selectedControl.id,
                title: result.selectedControl.title,
                criticality: result.selectedControl.criticality,
                criticality_label: formatCriticalityLabel(result.selectedControl.criticality, result.selectedControl.criticality_label),
                family: result.selectedControl.family,
                section_path: result.selectedControl.section_path,
                script_path: result.selectedControl.script_path,
                script_name: result.selectedControl.script_name,
                script_line_count: result.selectedControl.script_line_count
            }
            : null;
        const controlRows = result.filteredControls.map(function (control) {
            return {
                id: control.id,
                title: control.title,
                criticality: control.criticality,
                criticality_label: formatCriticalityLabel(control.criticality, control.criticality_label),
                family: control.family,
                family_label: control.family_label,
                section_path: control.section_path,
                script_path: control.script_path,
                script_name: control.script_name,
                script_line_count: control.script_line_count
            };
        });

        return {
            benchmark: benchmark,
            filters: {
                query: result.state.query,
                family: result.state.family,
                section_path: result.state.sectionPath,
                criticality: result.state.criticality,
                sort: result.state.sort,
                row_limit: result.state.rowLimit,
                selected_control: result.state.selectedControl
            },
            summary: {
                family_scope_scripts: result.familyScopedControls.length,
                section_scope_scripts: result.sectionScopedControls.length,
                criticality_scope_scripts: result.criticalityScopedControls.length,
                matched_controls: result.filteredControls.length,
                rendered_controls: result.visibleControls.length,
                matched_sections: result.visibleSections.length
            },
            selected_control: selectedControl,
            controls: controlRows,
            sections: result.visibleSections
        };
    }

    function renderJson(result) {
        jsonOutput.innerHTML = highlightJsonText(JSON.stringify(result.jsonPayload, null, 2));
    }

    function convertValueToCsv(value) {
        const text = String(value == null ? '' : value);
        const escapedText = text.replaceAll('"', '""');
        return `"${escapedText}"`;
    }

    function buildCsv(result) {
        const header = ['#', 'Control ID', 'Title', 'Criticality', 'Family', 'Section Path', 'Script Path', 'Lines'];
        const rows = result.filteredControls.map(function (control, index) {
            return [
                index + 1,
                control.id,
                control.title,
                formatCriticalityLabel(control.criticality, control.criticality_label),
                control.family_label,
                control.section_path,
                control.script_path,
                control.script_line_count
            ];
        });

        return [header].concat(rows).map(function (row) {
            return row.map(convertValueToCsv).join(',');
        }).join('\n');
    }

    function downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
    }

    function exportResultShellAsPdf(filenameStem, container) {
        const exportWindow = window.open('', '_blank', 'noopener,noreferrer');

        if (!exportWindow || !container) {
            window.print();
            return;
        }

        const styles = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], style')).map((node) => node.outerHTML).join('\n');

        exportWindow.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${filenameStem}</title>${styles}</head><body>${container.outerHTML}</body></html>`);
        exportWindow.document.close();
        exportWindow.focus();
        window.setTimeout(function () {
            exportWindow.print();
        }, 250);
    }

    async function copyText(button, value) {
        try {
            await navigator.clipboard.writeText(value);
            flashButton(button, 'Copied');
        } catch (error) {
            flashButton(button, 'Failed');
        }
    }

    function setQueryParamIfChanged(params, key, value, defaultValue) {
        if (String(value || '') === String(defaultValue || '')) {
            params.delete(key);
            return;
        }

        params.set(key, value);
    }

    function syncUrlQuery(result) {
        const state = result.state;
        const params = new URLSearchParams(window.location.search);
        const defaultSelectedControl = result.filteredControls[0] ? result.filteredControls[0].script_path : '';

        setQueryParamIfChanged(params, 'cis_query', state.query, defaultUrlState.query);
        setQueryParamIfChanged(params, 'cis_family', state.family, defaultUrlState.family);
        setQueryParamIfChanged(params, 'cis_section', state.sectionPath, defaultUrlState.sectionPath);
        setQueryParamIfChanged(params, 'cis_criticality', state.criticality, defaultUrlState.criticality);
        setQueryParamIfChanged(params, 'cis_control', state.selectedControl, defaultSelectedControl || defaultUrlState.selectedControl);
        setQueryParamIfChanged(params, 'cis_sort', state.sort, defaultUrlState.sort);
        setQueryParamIfChanged(params, 'cis_rows', state.rowLimit, defaultUrlState.rowLimit);

        const queryString = params.toString();
        const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', nextUrl);
    }

    function readStateFromUrl() {
        const params = new URLSearchParams(window.location.search);

        return {
            query: params.get('cis_query') || '',
            family: params.get('cis_family') || 'all',
            sectionPath: params.get('cis_section') || 'all',
            criticality: params.get('cis_criticality') || 'all',
            selectedControl: params.get('cis_control') || '',
            sort: params.get('cis_sort') || 'id',
            rowLimit: params.get('cis_rows') || '50'
        };
    }

    function buildResult(state) {
        const normalizedState = normalizeState(state);
        const familyScopedControls = filterControlsByFamily(controls, normalizedState.family);
        const sectionScopedControls = filterControlsBySection(familyScopedControls, normalizedState.sectionPath);
        const criticalityScopedControls = filterControlsByCriticality(sectionScopedControls, normalizedState.criticality);
        const filteredControls = sortControls(applyQueryFilter(criticalityScopedControls, normalizedState.query), normalizedState.sort);
        const selectedControl = buildSelectedControl(filteredControls, normalizedState.selectedControl);
        const visibleControls = limitControls(filteredControls, normalizedState.rowLimit);
        const visibleSections = buildVisibleSections(filteredControls);
        const result = {
            state: Object.assign({}, normalizedState, {
                selectedControl: selectedControl ? selectedControl.script_path : ''
            }),
            familyScopedControls: familyScopedControls,
            sectionScopedControls: sectionScopedControls,
            criticalityScopedControls: criticalityScopedControls,
            filteredControls: filteredControls,
            visibleControls: visibleControls,
            visibleSections: visibleSections,
            selectedControl: selectedControl ? Object.assign({}, selectedControl) : null
        };

        result.csv = buildCsv(result);
        result.jsonPayload = buildJsonPayload(result);

        return result;
    }

    function syncInputsFromResult(result) {
        familyInput.value = result.state.family;
        sectionPathInput.value = result.state.sectionPath;
        criticalityInput.value = result.state.criticality;
        selectedControlInput.value = result.state.selectedControl;
        sortInput.value = result.state.sort;
        rowLimitInput.value = result.state.rowLimit;
        renderStaticSelects(result.state, result.filteredControls, result.selectedControl);
    }

    function showResultState() {
        resultEmpty.classList.add('d-none');
        resultError.classList.add('d-none');
        resultContent.classList.remove('d-none');
    }

    function renderResult(result) {
        latestResult = result;
        syncInputsFromResult(result);
        showResultState();
        resultSummary.innerHTML = buildSummaryMarkup(result);
        renderToolbarMeta(result);
        renderControlsTable(result);
        renderSectionsTable(result);
        renderJson(result);
        toggleScriptButtons(false);
        void loadSelectedScript(result);
    }

    function renderExplorer(options) {
        const result = buildResult(buildState());
        const shouldShowResult = options && options.showResult === true;

        if (shouldShowResult || latestResult) {
            syncUrlQuery(result);
            renderResult(result);
            return;
        }

        syncInputsFromResult(result);
    }

    initMarkdownCopyButtons();
    renderCriticalityOverview();

    const initialState = normalizeState(readStateFromUrl());
    queryInput.value = initialState.query;
    familyInput.value = initialState.family;
    sectionPathInput.value = initialState.sectionPath;
    criticalityInput.value = initialState.criticality;
    selectedControlInput.value = initialState.selectedControl;
    sortInput.value = initialState.sort;
    rowLimitInput.value = initialState.rowLimit;
    const initialResult = buildResult(initialState);
    syncInputsFromResult(initialResult);
    syncUrlQuery(initialResult);

    attachRadioChangeHandler(familyOptionsContainer, familyInput, familySelect, function () {
        sectionPathInput.value = 'all';
        selectedControlInput.value = '';
        renderExplorer();
    });
    attachRadioChangeHandler(sectionOptionsContainer, sectionPathInput, sectionSelect, function () {
        selectedControlInput.value = '';
        renderExplorer();
    });
    attachRadioChangeHandler(criticalityOptionsContainer, criticalityInput, criticalitySelect, function () {
        selectedControlInput.value = '';
        renderExplorer();
    });
    attachRadioChangeHandler(controlOptionsContainer, selectedControlInput, controlSelect, function () {
        renderExplorer();
        if (latestResult) {
            activateTab('assessUbuntu2204CisScriptPanel');
        }
    });
    attachSortButtonHandler();
    attachRadioChangeHandler(rowLimitOptionsContainer, rowLimitInput, rowLimitSelect, function () {
        renderExplorer();
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        selectedControlInput.value = '';
        renderExplorer({ showResult: true });
    });

    familyResetButton.addEventListener('click', function () {
        familyInput.value = 'all';
        sectionPathInput.value = 'all';
        selectedControlInput.value = '';
        renderExplorer();
    });

    sectionResetButton.addEventListener('click', function () {
        sectionPathInput.value = 'all';
        selectedControlInput.value = '';
        renderExplorer();
    });

    controlResetButton.addEventListener('click', function () {
        selectedControlInput.value = '';
        renderExplorer();
        if (latestResult) {
            activateTab('assessUbuntu2204CisScriptPanel');
        }
    });

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

    controlsTableBody.addEventListener('click', function (event) {
        const target = event.target instanceof HTMLElement ? event.target : null;
        const copyButton = target ? target.closest('.assess-ubuntu-2204-cis-row-copy') : null;

        if (copyButton && controlsTableBody.contains(copyButton)) {
            event.preventDefault();
            event.stopPropagation();
            void copyControlRow(copyButton.dataset.controlCopyRow || '', copyButton);
            return;
        }

        const row = target ? target.closest('tr[data-control-path]') : null;

        if (!row) {
            return;
        }

        selectedControlInput.value = row.getAttribute('data-control-path') || '';
        renderExplorer();
        activateTab('assessUbuntu2204CisScriptPanel');
    });

    copyScriptButton.addEventListener('click', function () {
        if (
            !latestResult ||
            !latestResult.selectedControl ||
            typeof latestResult.selectedControl.script_content !== 'string' ||
            latestResult.selectedControl.script_content === ''
        ) {
            return;
        }

        copyText(copyScriptButton, latestResult.selectedControl.script_content);
    });

    downloadScriptButton.addEventListener('click', function () {
        if (
            !latestResult ||
            !latestResult.selectedControl ||
            typeof latestResult.selectedControl.script_content !== 'string' ||
            latestResult.selectedControl.script_content === ''
        ) {
            return;
        }

        downloadFile(latestResult.selectedControl.script_name || 'cis-script.sh', latestResult.selectedControl.script_content, 'text/x-shellscript;charset=utf-8');
        flashButton(downloadScriptButton, 'Saved');
    });

    exportPdfButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        exportResultShellAsPdf('assess-ubuntu-2204-cis', resultContent);
        flashButton(exportPdfButton, 'Opened');
    });

    downloadCsvButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile('assess-ubuntu-2204-cis.csv', latestResult.csv, 'text/csv;charset=utf-8');
        flashButton(downloadCsvButton, 'Saved');
    });

    copyJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        copyText(copyJsonButton, JSON.stringify(latestResult.jsonPayload, null, 2));
    });

    downloadJsonButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile('assess-ubuntu-2204-cis.json', JSON.stringify(latestResult.jsonPayload, null, 2), 'application/json;charset=utf-8');
        flashButton(downloadJsonButton, 'Saved');
    });
});
