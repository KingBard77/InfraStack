// custom.js

const cisBenchmarkData = {{ include('content/tools/cis/cis-ubuntu-benchmark-ubuntu-2204/assets/custom.json.twig')|raw }};
const cisBenchmarkScriptEndpoint = '{{ path('app_cis_cis_ubuntu_benchmark_ubuntu_2204_script') }}';

document.addEventListener('DOMContentLoaded', function () {
    const benchmark = cisBenchmarkData.benchmark || {};
    const families = Array.isArray(cisBenchmarkData.families) ? cisBenchmarkData.families.slice() : [];
    const sections = Array.isArray(cisBenchmarkData.sections) ? cisBenchmarkData.sections.slice() : [];
    const controls = Array.isArray(cisBenchmarkData.controls) ? cisBenchmarkData.controls.slice() : [];
    const form = document.getElementById('cisbenchForm');
    const queryInput = document.getElementById('cisbenchQuery');
    const submitButton = document.getElementById('cisbenchSubmit');
    const familyInput = document.getElementById('cisbenchFamily');
    const familySummary = document.getElementById('cisbenchFamilySummary');
    const familySelect = document.getElementById('cisbenchFamilySelect');
    const familyOptionsContainer = document.getElementById('cisbenchFamilyOptions');
    const familyResetButton = document.getElementById('cisbenchFamilyReset');
    const sectionPathInput = document.getElementById('cisbenchSectionPath');
    const sectionSummary = document.getElementById('cisbenchSectionSummary');
    const sectionSelect = document.getElementById('cisbenchSectionSelect');
    const sectionOptionsContainer = document.getElementById('cisbenchSectionOptions');
    const sectionResetButton = document.getElementById('cisbenchSectionReset');
    const criticalityInput = document.getElementById('cisbenchCriticality');
    const criticalitySummary = document.getElementById('cisbenchCriticalitySummary');
    const criticalitySelect = document.getElementById('cisbenchCriticalitySelect');
    const criticalityOptionsContainer = document.getElementById('cisbenchCriticalityOptions');
    const selectedControlInput = document.getElementById('cisbenchSelectedControl');
    const controlSummary = document.getElementById('cisbenchControlSummary');
    const controlSelect = document.getElementById('cisbenchControlSelect');
    const controlOptionsContainer = document.getElementById('cisbenchControlOptions');
    const controlResetButton = document.getElementById('cisbenchControlReset');
    const sortInput = document.getElementById('cisbenchSort');
    const sortSummary = document.getElementById('cisbenchSortSummary');
    const sortSelect = document.getElementById('cisbenchSortSelect');
    const sortOptionsContainer = document.getElementById('cisbenchSortOptions');
    const rowLimitInput = document.getElementById('cisbenchRowLimit');
    const rowLimitSummary = document.getElementById('cisbenchRowLimitSummary');
    const rowLimitSelect = document.getElementById('cisbenchRowLimitSelect');
    const rowLimitOptionsContainer = document.getElementById('cisbenchRowLimitOptions');
    const criticalityRow = document.getElementById('cisbenchCriticalityRow');
    const resultEmpty = document.getElementById('cisbenchResultEmpty');
    const resultError = document.getElementById('cisbenchResultError');
    const resultContent = document.getElementById('cisbenchResultContent');
    const resultSummary = document.getElementById('cisbenchResultSummary');
    const toolbarMeta = document.getElementById('cisbenchToolbarMeta');
    const controlsTableBody = document.getElementById('cisbenchControlsTableBody');
    const sectionsTableBody = document.getElementById('cisbenchSectionsTableBody');
    const scriptMeta = document.getElementById('cisbenchScriptMeta');
    const scriptOutput = document.getElementById('cisbenchScriptOutput');
    const jsonOutput = document.getElementById('cisbenchJsonOutput');
    const copyScriptButton = document.getElementById('cisbenchCopyScript');
    const downloadScriptButton = document.getElementById('cisbenchDownloadScript');
    const exportPdfButton = document.getElementById('cisbenchExportPdf');
    const downloadCsvButton = document.getElementById('cisbenchDownloadCsv');
    const copyJsonButton = document.getElementById('cisbenchCopyJson');
    const downloadJsonButton = document.getElementById('cisbenchDownloadJson');
    const tabButtons = Array.from(document.querySelectorAll('.cisbench-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.cisbench-tab-panel'));

    let latestResult = null;
    let latestScriptRequestId = 0;

    const sortCatalog = [
        {
            value: 'benchmark',
            title: 'Benchmark order',
            meta: 'Keep the copied benchmark tree order'
        },
        {
            value: 'id',
            title: 'Control ID',
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
        const codeBlocks = document.querySelectorAll('.markdown-content pre');

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
                } catch (error) {
                    flashButton(button, 'Failed');
                }
            });

            pre.appendChild(button);
        });
    }

    function flashButton(button, text) {
        const originalText = button.dataset.defaultLabel || button.textContent;
        button.dataset.defaultLabel = originalText;
        button.textContent = text;

        window.setTimeout(function () {
            button.textContent = originalText;
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
                ? `<span class="cisbench-select-meta">${escapeHtml(option.meta)}</span>`
                : '';

            return `
                <label class="cisbench-select-card">
                  <input type="radio" name="${escapeHtml(groupName)}" value="${escapeHtml(option.value)}"${isChecked ? ' checked' : ''}>
                  <span>
                    <span class="cisbench-select-title">${escapeHtml(option.title)}</span>
                    ${metaMarkup}
                  </span>
                </label>
            `;
        }).join('');
    }

    function renderControlOptions(controlList, selectedValue) {
        if (controlList.length === 0) {
            controlOptionsContainer.innerHTML = '<div class="cisbench-select-empty">No matched scripts in the current scope.</div>';
            controlSelect.classList.add('cisbench-select-inactive');
            return;
        }

        controlSelect.classList.remove('cisbench-select-inactive');

        renderSelectOptions(controlOptionsContainer, buildControlCatalog(controlList), 'cisbenchControlOption', selectedValue);
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
        renderSelectOptions(familyOptionsContainer, familyCatalog, 'cisbenchFamilyOption', state.family);
        renderSelectOptions(sectionOptionsContainer, buildSectionCatalog(state.family), 'cisbenchSectionOption', state.sectionPath);
        renderSelectOptions(criticalityOptionsContainer, criticalityCatalog, 'cisbenchCriticalityOption', state.criticality);
        renderSelectOptions(sortOptionsContainer, sortCatalog, 'cisbenchSortOption', state.sort);
        renderSelectOptions(rowLimitOptionsContainer, rowLimitCatalog, 'cisbenchRowLimitOption', state.rowLimit);
        renderControlOptions(filteredControls, state.selectedControl);

        updateSelectSummary(familySummary, familyCatalog, state.family, 'All sections');
        updateSelectSummary(sectionSummary, buildSectionCatalog(state.family), state.sectionPath, 'All paths');
        updateSelectSummary(criticalitySummary, criticalityCatalog, state.criticality, 'All criticality');
        updateSelectSummary(sortSummary, sortCatalog, state.sort, 'Benchmark order');
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

    function renderCriticalityOverview() {
        const counts = controls.reduce(function (accumulator, control) {
            const key = Number(control.criticality) === 0 ? 'unspecified' : 'low';
            accumulator[key] = (accumulator[key] || 0) + 1;
            return accumulator;
        }, {});

        criticalityRow.innerHTML = `
            <span class="cisbench-criticality-pill" data-tone="low"><strong>${counts.low || 0}</strong><span>Low</span></span>
            <span class="cisbench-criticality-pill" data-tone="unspecified"><strong>${counts.unspecified || 0}</strong><span>Unspecified</span></span>
        `;
    }

    function activateTab(targetId) {
        tabButtons.forEach(function (button) {
            const isActive = button.dataset.tabTarget === targetId;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        tabPanels.forEach(function (panel) {
            panel.classList.toggle('active', panel.id === targetId);
        });
    }

    function buildState() {
        return {
            query: String(queryInput.value || '').trim(),
            family: familyInput.value || 'all',
            sectionPath: sectionPathInput.value || 'all',
            criticality: criticalityInput.value || 'all',
            selectedControl: selectedControlInput.value || '',
            sort: sortInput.value || 'benchmark',
            rowLimit: rowLimitInput.value || '50'
        };
    }

    function normalizeState(state) {
        const familyValue = findOptionByValue(familyCatalog, state.family) ? state.family : 'all';
        const sectionCatalog = buildSectionCatalog(familyValue);
        const sectionValue = findOptionByValue(sectionCatalog, state.sectionPath) ? state.sectionPath : 'all';
        const criticalityValue = findOptionByValue(criticalityCatalog, state.criticality) ? state.criticality : 'all';
        const sortValue = findOptionByValue(sortCatalog, state.sort) ? state.sort : 'benchmark';
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
            ? `<span class="cisbench-badge">Filter: ${escapeHtml(result.state.query)}</span>`
            : '';
        const familyBadge = `<span class="cisbench-badge">Family: ${escapeHtml(result.state.family === 'all' ? 'All sections' : result.state.family)}</span>`;
        const sectionBadge = `<span class="cisbench-badge">Section: ${escapeHtml(result.state.sectionPath === 'all' ? 'All paths' : result.state.sectionPath)}</span>`;
        const criticalityBadge = `<span class="cisbench-badge">Criticality: ${escapeHtml(findOptionByValue(criticalityCatalog, result.state.criticality).title)}</span>`;
        const selectedMeta = result.selectedControl
            ? `${escapeHtml(result.selectedControl.id)} • ${escapeHtml(result.selectedControl.script_name)}`
            : 'No matched script';

        return `
            <div class="cisbench-summary-grid">
              <article class="cisbench-summary-card">
                <span class="cisbench-summary-kicker">Matched scripts</span>
                <strong class="cisbench-summary-value">${result.filteredControls.length}</strong>
                <span class="cisbench-summary-meta">Controls currently matching the selected filters</span>
              </article>
              <article class="cisbench-summary-card">
                <span class="cisbench-summary-kicker">Visible rows</span>
                <strong class="cisbench-summary-value">${result.visibleControls.length}</strong>
                <span class="cisbench-summary-meta">Rows rendered in the controls table</span>
              </article>
              <article class="cisbench-summary-card">
                <span class="cisbench-summary-kicker">Matched sections</span>
                <strong class="cisbench-summary-value">${result.visibleSections.length}</strong>
                <span class="cisbench-summary-meta">Section rollups built from the filtered control set</span>
              </article>
              <article class="cisbench-summary-card">
                <span class="cisbench-summary-kicker">Selected script</span>
                <strong class="cisbench-summary-value">${result.selectedControl ? result.selectedControl.script_line_count : 0}</strong>
                <span class="cisbench-summary-meta">${result.selectedControl ? 'Lines in the displayed script body' : 'No script currently selected'}</span>
              </article>
            </div>
            <div class="cisbench-badge-row">
              <span class="cisbench-badge">Benchmark: ${escapeHtml(benchmark.name || 'Ubuntu 22.04 CIS')}</span>
              ${familyBadge}
              ${sectionBadge}
              ${criticalityBadge}
              <span class="cisbench-badge">Selected: ${selectedMeta}</span>
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
            <span class="cisbench-toolbar-pill">Family scope: ${result.familyScopedControls.length}</span>
            <span class="cisbench-toolbar-pill">Section scope: ${result.sectionScopedControls.length}</span>
            <span class="cisbench-toolbar-pill">Criticality scope: ${result.criticalityScopedControls.length}</span>
            <span class="cisbench-toolbar-pill">${escapeHtml(rowLimitLabel)}</span>
            <span class="cisbench-toolbar-pill">Selected: ${escapeHtml(selectedLabel)}</span>
        `;
    }

    function renderControlsTable(result) {
        if (result.visibleControls.length === 0) {
            controlsTableBody.innerHTML = `
                <tr class="cisbench-empty-row">
                  <td colspan="6">No scripts matched the current filter.</td>
                </tr>
            `;
            return;
        }

        controlsTableBody.innerHTML = result.visibleControls.map(function (control, index) {
            const criticalityLabel = formatCriticalityLabel(control.criticality, control.criticality_label);
            const isSelected = result.selectedControl && result.selectedControl.script_path === control.script_path;

            return `
                <tr data-control-path="${escapeHtml(control.script_path)}" class="${isSelected ? 'cisbench-control-row-selected' : ''}">
                  <td class="tool-generated-rownum-cell">${index + 1}</td>
                  <td><span class="cisbench-control-id">${escapeHtml(control.id)}</span></td>
                  <td><span class="cisbench-title-text">${escapeHtml(control.title)}</span></td>
                  <td>
                    <div class="cisbench-section-cell">
                      <span class="cisbench-path-text">${escapeHtml(control.section_path)}</span>
                      <span class="cisbench-section-family">${escapeHtml(control.family_label)}</span>
                    </div>
                  </td>
                  <td><span class="cisbench-criticality-badge" data-tone="${escapeHtml(criticalityTone(control.criticality))}">${escapeHtml(criticalityLabel)}</span></td>
                  <td><span class="cisbench-script-text">${escapeHtml(control.script_path)}</span></td>
                </tr>
            `;
        }).join('');
    }

    function renderSectionsTable(result) {
        if (result.visibleSections.length === 0) {
            sectionsTableBody.innerHTML = `
                <tr class="cisbench-empty-row">
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
                    <div class="cisbench-section-cell">
                      <span class="cisbench-path-text">${escapeHtml(section.path)}</span>
                      <span class="cisbench-section-family">${escapeHtml(section.full_label)}</span>
                    </div>
                  </td>
                  <td>${section.depth}</td>
                  <td>${section.visible_control_count}</td>
                  <td>${section.child_count}</td>
                  <td><span class="cisbench-range-text">${escapeHtml(rangeText)}</span></td>
                </tr>
            `;
        }).join('');
    }

    function toggleScriptButtons(isEnabled) {
        copyScriptButton.disabled = !isEnabled;
        downloadScriptButton.disabled = !isEnabled;
    }

    function renderScriptState(control, statusText, scriptContent) {
        if (!control) {
            scriptMeta.innerHTML = `
                <div class="cisbench-script-chip">
                  <span class="cisbench-script-chip-label">Selection</span>
                  <span class="cisbench-script-chip-value">No matched script</span>
                </div>
            `;
            scriptOutput.textContent = 'No script matches the current filter.';
            toggleScriptButtons(false);
            return;
        }

        const criticalityLabel = formatCriticalityLabel(control.criticality, control.criticality_label);
        const statusMarkup = statusText
            ? `
            <div class="cisbench-script-chip">
              <span class="cisbench-script-chip-label">Status</span>
              <span class="cisbench-script-chip-value">${escapeHtml(statusText)}</span>
            </div>
        `
            : '';

        scriptMeta.innerHTML = `
            <div class="cisbench-script-chip">
              <span class="cisbench-script-chip-label">Control ID</span>
              <span class="cisbench-script-chip-value">${escapeHtml(control.id)}</span>
            </div>
            <div class="cisbench-script-chip">
              <span class="cisbench-script-chip-label">Title</span>
              <span class="cisbench-script-chip-value">${escapeHtml(control.title)}</span>
            </div>
            <div class="cisbench-script-chip">
              <span class="cisbench-script-chip-label">Criticality</span>
              <span class="cisbench-script-chip-value">${escapeHtml(criticalityLabel)}</span>
            </div>
            <div class="cisbench-script-chip">
              <span class="cisbench-script-chip-label">Section path</span>
              <span class="cisbench-script-chip-value">${escapeHtml(control.section_path)}</span>
            </div>
            <div class="cisbench-script-chip">
              <span class="cisbench-script-chip-label">Script path</span>
              <span class="cisbench-script-chip-value">${escapeHtml(control.script_path)}</span>
            </div>
            <div class="cisbench-script-chip">
              <span class="cisbench-script-chip-label">Lines</span>
              <span class="cisbench-script-chip-value">${control.script_line_count}</span>
            </div>
            ${statusMarkup}
        `;
        scriptOutput.textContent = scriptContent;
    }

    async function requestSelectedScript(scriptPath) {
        const response = await fetch(cisBenchmarkScriptEndpoint, {
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

    function syncUrlQuery(state) {
        const params = new URLSearchParams(window.location.search);

        if (state.query) {
            params.set('cis_query', state.query);
        } else {
            params.delete('cis_query');
        }

        params.set('cis_family', state.family);
        params.set('cis_section', state.sectionPath);
        params.set('cis_criticality', state.criticality);
        params.set('cis_control', state.selectedControl);
        params.set('cis_sort', state.sort);
        params.set('cis_rows', state.rowLimit);

        const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
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
            sort: params.get('cis_sort') || 'benchmark',
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

    function renderExplorer() {
        const result = buildResult(buildState());
        syncUrlQuery(result.state);
        renderResult(result);
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
    renderExplorer();

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
        activateTab('cisbenchScriptPanel');
    });
    attachRadioChangeHandler(sortOptionsContainer, sortInput, sortSelect, function () {
        renderExplorer();
    });
    attachRadioChangeHandler(rowLimitOptionsContainer, rowLimitInput, rowLimitSelect, function () {
        renderExplorer();
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        selectedControlInput.value = '';
        renderExplorer();
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
        activateTab('cisbenchScriptPanel');
    });

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activateTab(button.dataset.tabTarget);
        });
    });

    controlsTableBody.addEventListener('click', function (event) {
        const target = event.target instanceof HTMLElement ? event.target : null;
        const row = target ? target.closest('tr[data-control-path]') : null;

        if (!row) {
            return;
        }

        selectedControlInput.value = row.getAttribute('data-control-path') || '';
        renderExplorer();
        activateTab('cisbenchScriptPanel');
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

        exportResultShellAsPdf('cis-ubuntu-benchmark-ubuntu-2204', resultContent);
        flashButton(exportPdfButton, 'Opened');
    });

    downloadCsvButton.addEventListener('click', function () {
        if (!latestResult) {
            return;
        }

        downloadFile('cis-ubuntu-benchmark-ubuntu-2204.csv', latestResult.csv, 'text/csv;charset=utf-8');
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

        downloadFile('cis-ubuntu-benchmark-ubuntu-2204.json', JSON.stringify(latestResult.jsonPayload, null, 2), 'application/json;charset=utf-8');
        flashButton(downloadJsonButton, 'Saved');
    });
});
