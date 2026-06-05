// custom.js

// ns:start family.assessment.workspace.04_selected-item
// Retrofit marker: existing runtime remains tool-local until section-safe extraction is applied.
// ns:end family.assessment.workspace.04_selected-item
// ns:start family._base.workspace.05_result-summary
function installInfraStackResultSummaryNormalizer(prefix) {
    function normalizeSummary(summary) {
        const hero = summary.querySelector('.' + prefix + '-result-hero-grid');

        if (!hero) {
            return;
        }

        const cards = Array.from(hero.querySelectorAll(':scope > .' + prefix + '-result-card'));
        const primaryCard = cards.find(function (card) {
            return card.classList.contains(prefix + '-result-card-primary') || card.classList.contains(prefix + '-result-card-visual') || card.classList.contains(prefix + '-result-card-command');
        }) || cards[0];
        const summaryCard = cards.find(function (card) {
            return card !== primaryCard && (card.classList.contains(prefix + '-result-card-summary') || card.classList.contains(prefix + '-result-card-main'));
        }) || cards.find(function (card) {
            return card !== primaryCard;
        });

        if (primaryCard) {
            primaryCard.classList.add(prefix + '-result-card-primary');
            if (!primaryCard.dataset.resultVisual) {
                if (primaryCard.querySelector('.' + prefix + '-result-ring')) {
                    primaryCard.dataset.resultVisual = 'ring';
                } else if (primaryCard.querySelector('.' + prefix + '-result-primary-number')) {
                    primaryCard.dataset.resultVisual = 'number';
                } else if (primaryCard.querySelector('.' + prefix + '-result-primary-metric')) {
                    primaryCard.dataset.resultVisual = 'metric';
                } else if (primaryCard.querySelector('.' + prefix + '-result-card-icon-primary')) {
                    primaryCard.dataset.resultVisual = 'icon';
                } else {
                    primaryCard.dataset.resultVisual = 'text';
                }
            }
        }

        if (summaryCard) {
            summaryCard.classList.add(prefix + '-result-card-summary');
            const chipRow = summaryCard.querySelector('.' + prefix + '-result-chip-row');

            if (chipRow && !summaryCard.querySelector('.' + prefix + '-result-chip-grid')) {
                chipRow.classList.add(prefix + '-result-chip-grid');
            }
        }

        if (primaryCard && hero.firstElementChild !== primaryCard) {
            hero.insertBefore(primaryCard, hero.firstElementChild);
        }

        if (primaryCard && summaryCard && primaryCard.nextElementSibling !== summaryCard) {
            hero.insertBefore(summaryCard, primaryCard.nextElementSibling);
        }
    }

    function normalize() {
        document.querySelectorAll('.' + prefix + '-result-summary').forEach(normalizeSummary);
    }

    function scheduleNormalize() {
        window.requestAnimationFrame(normalize);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            normalize();
            new MutationObserver(scheduleNormalize).observe(document.body, {
                childList: true,
                subtree: true
            });
        }, { once: true });
        return;
    }

    normalize();
    new MutationObserver(scheduleNormalize).observe(document.body, {
        childList: true,
        subtree: true
    });
}

installInfraStackResultSummaryNormalizer('assess-ubuntu-2204-cis');
// ns:end family._base.workspace.05_result-summary

const assessUbuntu2204CisData = {{ include('content/tools/cis/assess-ubuntu-2204-cis/assets/custom.json.twig')|raw }};
const assessUbuntu2204CisScriptEndpoint = '{{ path('app_cis_assess_ubuntu_2204_cis_script') }}';

// ns:start family._base.workspace.00_shell
document.addEventListener('DOMContentLoaded', function () {
    const benchmark = assessUbuntu2204CisData.benchmark || {};
    const families = Array.isArray(assessUbuntu2204CisData.families) ? assessUbuntu2204CisData.families.slice() : [];
    const sections = Array.isArray(assessUbuntu2204CisData.sections) ? assessUbuntu2204CisData.sections.slice() : [];
    const controls = Array.isArray(assessUbuntu2204CisData.controls) ? assessUbuntu2204CisData.controls.slice() : [];
// ns:start family._base.workspace.01_input-brief
    const form = document.getElementById('assessUbuntu2204CisForm');
    const queryInput = document.getElementById('assessUbuntu2204CisQuery');
    const submitButton = document.getElementById('assessUbuntu2204CisSubmit');
    const resetButton = document.getElementById('assessUbuntu2204CisReset');
// ns:end family._base.workspace.01_input-brief
// ns:start family._base.workspace.02_basic-settings
    const familyInput = document.getElementById('assessUbuntu2204CisFamily');
    const sectionPathInput = document.getElementById('assessUbuntu2204CisSectionPath');
    const criticalityInput = document.getElementById('assessUbuntu2204CisCriticality');
    const selectedControlInput = document.getElementById('assessUbuntu2204CisSelectedControl');
    const selectedControlTrigger = document.getElementById('assessUbuntu2204CisSelectedControlTrigger');
    const selectedControlLabel = document.getElementById('assessUbuntu2204CisSelectedControlLabel');
    const selectedControlPanel = document.getElementById('assessUbuntu2204CisControlPickerPanel');
    const selectedControlSearch = document.getElementById('assessUbuntu2204CisControlPickerSearch');
    const selectedControlOptions = document.getElementById('assessUbuntu2204CisControlPickerOptions');
// ns:end family._base.workspace.02_basic-settings
    const sortInput = document.getElementById('assessUbuntu2204CisSort');
    const sortSummary = document.getElementById('assessUbuntu2204CisSortSummary');
    const sortSelect = document.getElementById('assessUbuntu2204CisSortSelect');
    const sortOptionsContainer = document.getElementById('assessUbuntu2204CisSortOptions');
    const rowLimitInput = document.getElementById('assessUbuntu2204CisRowLimit');
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
    const fullScriptButton = document.getElementById('assessUbuntu2204CisFullScript');
    const bundleModal = document.getElementById('assessUbuntu2204CisBundleModal');
    const bundleCloseButton = document.getElementById('assessUbuntu2204CisBundleClose');
    const bundleCancelButton = document.getElementById('assessUbuntu2204CisBundleCancel');
    const bundleDetails = document.getElementById('assessUbuntu2204CisBundleDetails');
    const bundleRequestText = document.getElementById('assessUbuntu2204CisBundleRequestText');
    const bundleEmailLink = document.getElementById('assessUbuntu2204CisBundleEmail');
    const bundleCopyButton = document.getElementById('assessUbuntu2204CisBundleCopy');
    const exportPdfButton = document.getElementById('assessUbuntu2204CisExportPdf');
    const downloadCsvButton = document.getElementById('assessUbuntu2204CisDownloadCsv');
    const copyJsonButton = document.getElementById('assessUbuntu2204CisCopyJson');
    const downloadJsonButton = document.getElementById('assessUbuntu2204CisDownloadJson');
    const importJsonButton = document.getElementById('assessUbuntu2204CisImportJsonButton');
    const importJsonInput = document.getElementById('assessUbuntu2204CisImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.assess-ubuntu-2204-cis-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.assess-ubuntu-2204-cis-tab-panel'));

    let latestResult = null;
    let latestScriptRequestId = 0;
    let controlPickerCatalog = [];
    let bundleModalLastFocus = null;
    let latestBundleRequest = '';

    const sortCatalog = [
        {
            value: 'id',
            title: 'ID',
            meta: 'Sort numerically by benchmark control number'
        },
        {
            value: 'title',
            title: 'A-Z',
            meta: 'Sort alphabetically by control title'
        },
        {
            value: 'section',
            title: 'Section',
            meta: 'Group scripts by the directory path that contains them'
        },
        {
            value: 'criticality',
            title: 'Criticality',
            meta: 'Show declared criticality before unspecified scripts'
        },
        {
            value: 'script',
            title: 'Script',
            meta: 'Sort by script filename'
        }
    ];
// ns:start family._base.workspace.03_custom-settings
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
// ns:end family._base.workspace.03_custom-settings
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
        !resetButton ||
        !familyInput ||
        !sectionPathInput ||
        !criticalityInput ||
        !selectedControlInput ||
        !selectedControlTrigger ||
        !selectedControlLabel ||
        !selectedControlPanel ||
        !selectedControlSearch ||
        !selectedControlOptions ||
        !sortInput ||
        !sortSummary ||
        !sortSelect ||
        !sortOptionsContainer ||
        !rowLimitInput ||
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
        !fullScriptButton ||
        !bundleModal ||
        !bundleCloseButton ||
        !bundleCancelButton ||
        !bundleDetails ||
        !bundleRequestText ||
        !bundleEmailLink ||
        !bundleCopyButton ||
        !exportPdfButton ||
        !downloadCsvButton ||
        !copyJsonButton ||
        !downloadJsonButton ||
        !importJsonButton ||
        !importJsonInput ||
        controls.length === 0 ||
        sections.length === 0 ||
        tabButtons.length === 0 ||
        tabPanels.length === 0
    ) {
        return;
    }

    const resultEmptyDefaultText = resultEmpty.textContent.trim();

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
        if (!button) {
            return;
        }

        const actionButton = button.closest ? button.closest('.tool-table-action-cell button') : null;

        if (actionButton) {
            const isCopied = text === 'Copied';
            const icon = actionButton.querySelector('i');
            const originalIcon = actionButton.dataset.defaultIcon || (icon ? icon.className : '');

            if (icon && !actionButton.dataset.defaultIcon) {
                actionButton.dataset.defaultIcon = originalIcon;
            }

            actionButton.classList.toggle('copied', isCopied);
            actionButton.classList.toggle('is-copied', isCopied);
            actionButton.classList.toggle('failed', !isCopied);
            if (icon) {
                icon.className = isCopied ? 'bi bi-check2' : 'bi bi-x-lg';
            }
            window.setTimeout(function () {
                actionButton.classList.remove('copied', 'is-copied', 'failed');
                if (icon && actionButton.dataset.defaultIcon) {
                    icon.className = actionButton.dataset.defaultIcon;
                }
            }, 1400);
            return;
        }

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

    function renderNativeSelectOptions(select, options, selectedValue, emptyText) {
        select.innerHTML = '';

        if (!options.length) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = emptyText || 'No options available';
            select.appendChild(option);
            select.disabled = true;
            return;
        }

        select.disabled = false;
        options.forEach(function (optionData) {
            const option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.meta ? optionData.title + ' - ' + optionData.meta : optionData.title;
            select.appendChild(option);
        });

        select.value = findOptionByValue(options, selectedValue) ? selectedValue : options[0].value;
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

    function setControlPickerOpen(isOpen) {
        selectedControlPanel.hidden = !isOpen;
        selectedControlTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        if (isOpen) {
            selectedControlSearch.focus();
        }
    }

    function updateControlPickerLabel(selectedValue) {
        const selectedOption = findOptionByValue(controlPickerCatalog, selectedValue);
        selectedControlLabel.textContent = selectedOption
            ? (selectedOption.meta ? selectedOption.title + ' - ' + selectedOption.meta : selectedOption.title)
            : 'No matched script';
    }

    function filterControlPickerCatalog(query) {
        const normalizedQuery = normalizeQuery(query);

        if (!normalizedQuery) {
            return controlPickerCatalog;
        }

        return controlPickerCatalog.filter(function (option) {
            return normalizeQuery(option.title + ' ' + (option.meta || '')).includes(normalizedQuery);
        });
    }

    function renderControlPickerButtons(options, selectedValue) {
        if (!options.length) {
            selectedControlOptions.innerHTML = '<div class="assess-ubuntu-2204-cis-control-picker-empty">No matched scripts.</div>';
            return;
        }

        selectedControlOptions.innerHTML = options.map(function (option) {
            const isActive = option.value === selectedValue;
            const meta = option.meta ? '<span>' + escapeHtml(option.meta) + '</span>' : '';

            return '<button type="button" class="assess-ubuntu-2204-cis-control-picker-option' + (isActive ? ' is-active' : '') + '" data-control-value="' + escapeHtml(option.value) + '" role="option" aria-selected="' + (isActive ? 'true' : 'false') + '"><strong>' + escapeHtml(option.title) + '</strong>' + meta + '</button>';
        }).join('');
    }

    function renderControlOptions(controlList, selectedValue) {
        controlPickerCatalog = buildControlCatalog(controlList);
        const selectedOption = findOptionByValue(controlPickerCatalog, selectedValue);
        const nextValue = selectedOption
            ? selectedValue
            : (controlPickerCatalog[0] ? controlPickerCatalog[0].value : '');

        selectedControlInput.value = nextValue;
        selectedControlTrigger.disabled = controlPickerCatalog.length === 0;
        selectedControlSearch.disabled = controlPickerCatalog.length === 0;
        updateControlPickerLabel(nextValue);
        renderControlPickerButtons(filterControlPickerCatalog(selectedControlSearch.value), nextValue);
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

    function setRowLimitValue(value, fallbackValue) {
        const requestedValue = String(value || rowLimitInput.value || fallbackValue);
        const allowedValues = ['25', '50', '100', 'all'];
        rowLimitInput.value = allowedValues.includes(requestedValue) ? requestedValue : fallbackValue;
    }

    function controlSummaryText(control) {
        if (!control) {
            return 'No matched script';
        }

        return `${control.id} ${control.title}`;
    }

    function renderStaticSelects(state, filteredControls, selectedControl) {
        const sectionCatalog = buildSectionCatalog(state.family);

        renderNativeSelectOptions(familyInput, familyCatalog, state.family, 'All sections');
        renderNativeSelectOptions(sectionPathInput, sectionCatalog, state.sectionPath, 'All paths');
        renderNativeSelectOptions(criticalityInput, criticalityCatalog, state.criticality, 'All criticality');
        renderNativeSelectOptions(rowLimitInput, rowLimitCatalog, state.rowLimit, '50 rows');
        renderSortOptions(sortOptionsContainer, sortCatalog, state.sort);
        renderControlOptions(filteredControls, state.selectedControl);
        setRowLimitValue(state.rowLimit, '50');
        updateSelectSummary(sortSummary, sortCatalog, state.sort, 'ID');
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

            if (sortValue === 'script') {
                return naturalCompare(leftControl.script_name, rightControl.script_name)
                    || naturalCompare(leftControl.id, rightControl.id);
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
        const familyLabel = result.state.family === 'all' ? 'All sections' : result.state.family;
        const sectionLabel = result.state.sectionPath === 'all' ? 'All paths' : result.state.sectionPath;
        const criticalityLabel = findOptionByValue(criticalityCatalog, result.state.criticality).title;
        const selectedMeta = result.selectedControl
            ? `${result.selectedControl.id} / ${result.selectedControl.script_name}`
            : 'No matched script';
        const queryLabel = result.state.query ? `Filter: ${result.state.query}` : 'Filter: none';
        const updatedText = new Date().toLocaleString();
        const visibleRows = String(result.visibleControls.length);
        const matchedScripts = String(result.filteredControls.length);
        const visibleSections = String(result.visibleSections.length);
        const selectedScriptLines = String(result.selectedControl ? result.selectedControl.script_line_count : 0);
        const selectedScriptCopy = result.selectedControl ? 'Lines in the displayed script body.' : 'No script currently selected.';

        resultSummary.dataset.resultTone = result.filteredControls.length > 0 ? 'success' : 'warning';
        resultSummary.dataset.resultLayout = 'number';

        return `
            <header class="assess-ubuntu-2204-cis-result-header" aria-label="Result summary header">
                <div class="assess-ubuntu-2204-cis-result-header-main">
                    <span class="assess-ubuntu-2204-cis-result-header-icon" aria-hidden="true"><i class="bi bi-bar-chart-line"></i></span>
                    <div class="assess-ubuntu-2204-cis-result-header-copy">
                        <h2 class="assess-ubuntu-2204-cis-result-header-title">Result Summary</h2>
                        <p>Overview of the current assessment results and key metrics</p>
                    </div>
                </div>
                <div class="assess-ubuntu-2204-cis-result-header-meta" aria-label="Result summary status">
                    <span class="assess-ubuntu-2204-cis-result-header-chip assess-ubuntu-2204-cis-result-chip-ready"><span class="assess-ubuntu-2204-cis-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span>
                    <span class="assess-ubuntu-2204-cis-result-header-chip assess-ubuntu-2204-cis-result-chip-updated"><span class="assess-ubuntu-2204-cis-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>${escapeHtml(updatedText)}</span></span>
                </div>
            </header>

            <div class="assess-ubuntu-2204-cis-result-hero-grid" aria-live="polite">
                <article class="assess-ubuntu-2204-cis-result-card assess-ubuntu-2204-cis-result-card-primary" data-result-visual="number" aria-label="Primary result">
                    <div class="assess-ubuntu-2204-cis-result-primary-heading assess-ubuntu-2204-cis-result-visual-copy assess-ubuntu-2204-cis-result-visual-copy-top"><div class="assess-ubuntu-2204-cis-result-kicker">Primary Result</div><h3 class="assess-ubuntu-2204-cis-result-title assess-ubuntu-2204-cis-result-title-center">${escapeHtml(visibleRows)} visible rows</h3></div>
                    <div class="assess-ubuntu-2204-cis-result-primary-visual" id="assessUbuntu2204CisResultVisual" aria-label="Primary assessment result">
                        <span class="assess-ubuntu-2204-cis-result-card-icon assess-ubuntu-2204-cis-result-card-icon-primary" aria-hidden="true"><i class="bi bi-clipboard-check"></i></span>
                        <div class="assess-ubuntu-2204-cis-result-primary-number">
                            <strong class="assess-ubuntu-2204-cis-result-primary-number-value">${escapeHtml(visibleRows)}</strong>
                            <span class="assess-ubuntu-2204-cis-result-primary-number-unit">visible rows</span>
                        </div>
                    </div>
                    <div class="assess-ubuntu-2204-cis-result-visual-copy">
                        <p class="assess-ubuntu-2204-cis-result-copy assess-ubuntu-2204-cis-result-copy-center">Selected: ${escapeHtml(selectedMeta)}</p>
                    </div>
                    <span class="assess-ubuntu-2204-cis-result-card-divider" aria-hidden="true"></span>
                    <div class="assess-ubuntu-2204-cis-result-chip-row assess-ubuntu-2204-cis-result-chip-row-center" aria-label="Primary result source">
                        <span class="assess-ubuntu-2204-cis-result-chip assess-ubuntu-2204-cis-result-chip-outcome assess-ubuntu-2204-cis-result-chip-ready"><span class="assess-ubuntu-2204-cis-result-chip-icon" aria-hidden="true"><i class="bi bi-shield-check"></i></span><span>Benchmark: ${escapeHtml(benchmark.name || 'Ubuntu 22.04 CIS')}</span></span>
                    </div>
                </article>

                <article class="assess-ubuntu-2204-cis-result-card assess-ubuntu-2204-cis-result-card-summary" aria-label="Assessment summary">
                    <div class="assess-ubuntu-2204-cis-result-summary-intro">
                        <span class="assess-ubuntu-2204-cis-result-card-icon assess-ubuntu-2204-cis-result-card-icon-summary" aria-hidden="true"><i class="bi bi-clipboard-data"></i></span>
                        <div class="assess-ubuntu-2204-cis-result-summary-copy">
                            <div class="assess-ubuntu-2204-cis-result-kicker">Descriptive Summary</div>
                            <h3 class="assess-ubuntu-2204-cis-result-title">Filtered CIS control set</h3>
                            <p class="assess-ubuntu-2204-cis-result-copy">The table, section rollups, selected script body, JSON, and exports are all derived from the current filters.</p>
                        </div>
                    </div>
                    <span class="assess-ubuntu-2204-cis-result-card-divider" aria-hidden="true"></span>
                    <div class="assess-ubuntu-2204-cis-result-chip-grid" aria-label="Assessment state">
                        <span class="assess-ubuntu-2204-cis-result-chip assess-ubuntu-2204-cis-result-chip-ready"><span class="assess-ubuntu-2204-cis-result-chip-icon" aria-hidden="true"><i class="bi bi-shield-check"></i></span><span>Benchmark: ${escapeHtml(benchmark.name || 'Ubuntu 22.04 CIS')}</span></span>
                        <span class="assess-ubuntu-2204-cis-result-chip assess-ubuntu-2204-cis-result-chip-baseline"><span class="assess-ubuntu-2204-cis-result-chip-icon" aria-hidden="true"><i class="bi bi-diagram-3"></i></span><span>Family: ${escapeHtml(familyLabel)}</span></span>
                        <span class="assess-ubuntu-2204-cis-result-chip assess-ubuntu-2204-cis-result-chip-baseline"><span class="assess-ubuntu-2204-cis-result-chip-icon" aria-hidden="true"><i class="bi bi-folder2-open"></i></span><span>Section: ${escapeHtml(sectionLabel)}</span></span>
                        <span class="assess-ubuntu-2204-cis-result-chip assess-ubuntu-2204-cis-result-chip-baseline"><span class="assess-ubuntu-2204-cis-result-chip-icon" aria-hidden="true"><i class="bi bi-flag"></i></span><span>Criticality: ${escapeHtml(criticalityLabel)}</span></span>
                        <span class="assess-ubuntu-2204-cis-result-chip assess-ubuntu-2204-cis-result-chip-warning"><span class="assess-ubuntu-2204-cis-result-chip-icon" aria-hidden="true"><i class="bi bi-funnel"></i></span><span>${escapeHtml(queryLabel)}</span></span>
                    </div>
                </article>
            </div>

            <div class="assess-ubuntu-2204-cis-result-metric-grid" aria-label="Assessment metrics">
                <article class="assess-ubuntu-2204-cis-result-metric-card assess-ubuntu-2204-cis-result-metric-success">
                    <span class="assess-ubuntu-2204-cis-result-metric-icon" aria-hidden="true"><i class="bi bi-file-earmark-text"></i></span>
                    <span class="assess-ubuntu-2204-cis-result-metric-label">Matched Scripts</span>
                    <strong class="assess-ubuntu-2204-cis-result-metric-value">${escapeHtml(matchedScripts)}</strong>
                    <span class="assess-ubuntu-2204-cis-result-metric-copy">Controls matching the selected filters.</span>
                    <span class="assess-ubuntu-2204-cis-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="assess-ubuntu-2204-cis-result-metric-card assess-ubuntu-2204-cis-result-metric-info">
                    <span class="assess-ubuntu-2204-cis-result-metric-icon" aria-hidden="true"><i class="bi bi-eye"></i></span>
                    <span class="assess-ubuntu-2204-cis-result-metric-label">Visible Rows</span>
                    <strong class="assess-ubuntu-2204-cis-result-metric-value">${escapeHtml(visibleRows)}</strong>
                    <span class="assess-ubuntu-2204-cis-result-metric-copy">Rows rendered in the controls table.</span>
                    <span class="assess-ubuntu-2204-cis-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="assess-ubuntu-2204-cis-result-metric-card assess-ubuntu-2204-cis-result-metric-accent-tone">
                    <span class="assess-ubuntu-2204-cis-result-metric-icon" aria-hidden="true"><i class="bi bi-layers"></i></span>
                    <span class="assess-ubuntu-2204-cis-result-metric-label">Sections</span>
                    <strong class="assess-ubuntu-2204-cis-result-metric-value">${escapeHtml(visibleSections)}</strong>
                    <span class="assess-ubuntu-2204-cis-result-metric-copy">Section rollups from the filtered set.</span>
                    <span class="assess-ubuntu-2204-cis-result-metric-accent" aria-hidden="true"></span>
                </article>
                <article class="assess-ubuntu-2204-cis-result-metric-card assess-ubuntu-2204-cis-result-metric-warning">
                    <span class="assess-ubuntu-2204-cis-result-metric-icon" aria-hidden="true"><i class="bi bi-code"></i></span>
                    <span class="assess-ubuntu-2204-cis-result-metric-label">Selected Script</span>
                    <strong class="assess-ubuntu-2204-cis-result-metric-value">${escapeHtml(selectedScriptLines)}</strong>
                    <span class="assess-ubuntu-2204-cis-result-metric-copy">${escapeHtml(selectedScriptCopy)}</span>
                    <span class="assess-ubuntu-2204-cis-result-metric-accent" aria-hidden="true"></span>
                </article>
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
                  <td class="assess-ubuntu-2204-cis-table-action-cell tool-table-action-cell">
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

    function toggleFullScriptButton(result) {
        fullScriptButton.disabled = !result || !Array.isArray(result.filteredControls) || result.filteredControls.length === 0;
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

    function getOptionTitle(options, value, fallbackText) {
        const option = findOptionByValue(options, value);

        return option ? option.title : fallbackText;
    }

    function buildBundleRequest(result) {
        const sectionCatalog = buildSectionCatalog(result.state.family);
        const familyLabel = getOptionTitle(familyCatalog, result.state.family, 'All sections');
        const sectionLabel = getOptionTitle(sectionCatalog, result.state.sectionPath, 'All paths');
        const criticalityLabel = getOptionTitle(criticalityCatalog, result.state.criticality, 'All criticality');
        const queryLabel = result.state.query || 'No search filter';
        const selectedLabel = result.selectedControl
            ? `${result.selectedControl.id} ${result.selectedControl.title}`
            : 'No single script selected';
        const selectedPath = result.selectedControl ? result.selectedControl.script_path : 'Not selected';
        const currentUrl = window.location.href;
        const detailRows = [
            ['Benchmark', benchmark.title || 'CIS Ubuntu Benchmark 2204'],
            ['Version', benchmark.version || 'CIS_Ubuntu_Benchmark_v22.04'],
            ['Matched scripts', String(result.filteredControls.length)],
            ['Family', familyLabel],
            ['Section', sectionLabel],
            ['Criticality', criticalityLabel],
            ['Search filter', queryLabel],
            ['Selected script', selectedLabel]
        ];
        const requestLines = [
            'Full benchmark script bundle request',
            '',
            `Benchmark: ${benchmark.title || 'CIS Ubuntu Benchmark 2204'}`,
            `Version: ${benchmark.version || 'CIS_Ubuntu_Benchmark_v22.04'}`,
            `Matched scripts: ${result.filteredControls.length}`,
            `Family: ${familyLabel}`,
            `Section: ${sectionLabel}`,
            `Criticality: ${criticalityLabel}`,
            `Search filter: ${queryLabel}`,
            `Selected control: ${selectedLabel}`,
            `Selected script path: ${selectedPath}`,
            `Current page: ${currentUrl}`,
            '',
            'Intended use:',
            '- Review and planning',
            '- Controlled internal use after script review'
        ];

        return {
            detailRows: detailRows,
            requestText: requestLines.join('\n'),
            subject: `Full script request: ${benchmark.title || 'CIS Ubuntu Benchmark 2204'}`
        };
    }

    function renderBundleModal(result) {
        const bundleRequest = buildBundleRequest(result);

        latestBundleRequest = bundleRequest.requestText;
        bundleDetails.innerHTML = bundleRequest.detailRows.map(function (row) {
            return `
                <div class="assess-ubuntu-2204-cis-bundle-detail">
                  <dt>${escapeHtml(row[0])}</dt>
                  <dd>${escapeHtml(row[1])}</dd>
                </div>
            `;
        }).join('');
        bundleRequestText.textContent = bundleRequest.requestText;
        bundleEmailLink.href = `mailto:hello@infrastack.my?subject=${encodeURIComponent(bundleRequest.subject)}&body=${encodeURIComponent(bundleRequest.requestText)}`;
    }

    function openBundleModal() {
        if (!latestResult || !Array.isArray(latestResult.filteredControls) || latestResult.filteredControls.length === 0) {
            return;
        }

        renderBundleModal(latestResult);
        bundleModalLastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        bundleModal.hidden = false;
        document.body.classList.add('assess-ubuntu-2204-cis-modal-open');
        bundleCloseButton.focus();
    }

    function closeBundleModal() {
        bundleModal.hidden = true;
        document.body.classList.remove('assess-ubuntu-2204-cis-modal-open');

        if (bundleModalLastFocus) {
            bundleModalLastFocus.focus();
        }
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

    function fallbackActionClipboardText(text) {
        const textarea = document.createElement('textarea');

        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        document.execCommand('copy');

        textarea.remove();
    }

    async function writeActionClipboardText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                fallbackActionClipboardText(text);
                return;
            }
        }

        fallbackActionClipboardText(text);
    }

    async function copyText(button, value) {
        try {
            await writeActionClipboardText(value);
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

    function readStateFromJsonPayload(payload) {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('Import a JSON object exported by this assessment tool.');
        }

        const filters = payload.filters && typeof payload.filters === 'object'
            ? payload.filters
            : payload.state && typeof payload.state === 'object'
                ? payload.state
                : payload;

        if (!filters || typeof filters !== 'object' || Array.isArray(filters)) {
            throw new Error('The JSON file does not include restorable filter state.');
        }

        return normalizeState({
            query: filters.query || '',
            family: filters.family || 'all',
            sectionPath: filters.section_path || filters.sectionPath || 'all',
            criticality: filters.criticality || 'all',
            selectedControl: filters.selected_control || filters.selectedControl || '',
            sort: filters.sort || 'id',
            rowLimit: filters.row_limit || filters.rowLimit || '50'
        });
    }

    function buildImportedPayloadState(payload) {
        return readStateFromJsonPayload(payload);
    }

// ns:start family._base.workspace.08_json-restore
    function showImportError(message) {
        resultError.textContent = message || 'Unable to import JSON.';
        resultError.classList.remove('d-none');
    }

    function restoreFromJsonPayload(payload) {
        const restoredState = buildImportedPayloadState(payload);
        const result = buildResult(restoredState);

        queryInput.value = restoredState.query;
        syncUrlQuery(result);
        renderResult(result);
        resultError.classList.add('d-none');
        flashButton(importJsonButton, 'Imported');
    }

    function handleJsonImportFile(file) {
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.addEventListener('load', function () {
            try {
                restoreFromJsonPayload(JSON.parse(String(reader.result || '{}')));
            } catch (error) {
                showImportError(error instanceof Error ? error.message : 'Unable to import JSON.');
                flashButton(importJsonButton, 'Failed');
            } finally {
                importJsonInput.value = '';
            }
        });

        reader.addEventListener('error', function () {
            showImportError('Unable to read the selected JSON file.');
            flashButton(importJsonButton, 'Failed');
            importJsonInput.value = '';
        });

        reader.readAsText(file);
    }
// ns:end family._base.workspace.08_json-restore

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

    function showEmptyState(message) {
        latestResult = null;
        latestScriptRequestId += 1;
        resultEmpty.textContent = message || resultEmptyDefaultText;
        resultEmpty.classList.remove('d-none');
        resultError.classList.add('d-none');
        resultError.textContent = '';
        resultContent.classList.add('d-none');
        resultSummary.innerHTML = '';
        toolbarMeta.innerHTML = '';
        controlsTableBody.innerHTML = '';
        sectionsTableBody.innerHTML = '';
        scriptMeta.textContent = 'No script selected.';
        scriptOutput.textContent = '';
        jsonOutput.innerHTML = '';
        toggleScriptButtons(false);
        toggleFullScriptButton(null);
    }

    function renderResult(result) {
        latestResult = result;
        syncInputsFromResult(result);
        showResultState();
        resultSummary.classList.add('assess-ubuntu-2204-cis-result-summary');
        resultSummary.dataset.resultTone = 'ready';
        resultSummary.dataset.resultLayout = 'assessment_overview';
        resultSummary.innerHTML = buildSummaryMarkup(result);
        renderToolbarMeta(result);
        renderControlsTable(result);
        renderSectionsTable(result);
        renderJson(result);
        toggleScriptButtons(false);
        toggleFullScriptButton(result);
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

    familyInput.addEventListener('change', function () {
        sectionPathInput.value = 'all';
        selectedControlInput.value = '';
        renderExplorer();
    });
    sectionPathInput.addEventListener('change', function () {
        selectedControlInput.value = '';
        renderExplorer();
    });
    criticalityInput.addEventListener('change', function () {
        selectedControlInput.value = '';
        renderExplorer();
    });
    selectedControlTrigger.addEventListener('click', function () {
        setControlPickerOpen(selectedControlPanel.hidden);
    });
    selectedControlSearch.addEventListener('input', function () {
        renderControlPickerButtons(filterControlPickerCatalog(selectedControlSearch.value), selectedControlInput.value);
    });
    selectedControlOptions.addEventListener('click', function (event) {
        const target = event.target instanceof HTMLElement ? event.target : null;
        const button = target ? target.closest('button[data-control-value]') : null;

        if (!button || !selectedControlOptions.contains(button)) {
            return;
        }

        selectedControlInput.value = button.getAttribute('data-control-value') || '';
        selectedControlSearch.value = '';
        setControlPickerOpen(false);
        renderExplorer();
        if (latestResult) {
            activateTab('assessUbuntu2204CisScriptPanel');
        }
    });
    selectedControlPanel.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            setControlPickerOpen(false);
            selectedControlTrigger.focus();
        }
    });
    document.addEventListener('click', function (event) {
        const target = event.target instanceof HTMLElement ? event.target : null;

        if (target && (selectedControlPanel.contains(target) || selectedControlTrigger.contains(target))) {
            return;
        }

        setControlPickerOpen(false);
    });
    attachSortButtonHandler();
    rowLimitInput.addEventListener('change', function () {
        setRowLimitValue(rowLimitInput.value, '50');
        renderExplorer();
    });

    resetButton.addEventListener('click', function () {
        const defaultResult = buildResult(defaultUrlState);

        queryInput.value = defaultUrlState.query;
        syncInputsFromResult(defaultResult);
        showEmptyState();
        activateTab('assessUbuntu2204CisControlsPanel');
        window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        renderExplorer({ showResult: true });
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

    fullScriptButton.addEventListener('click', function () {
        openBundleModal();
    });

    bundleCloseButton.addEventListener('click', closeBundleModal);
    bundleCancelButton.addEventListener('click', closeBundleModal);

    bundleModal.addEventListener('click', function (event) {
        const target = event.target instanceof HTMLElement ? event.target : null;

        if (target && target.hasAttribute('data-bundle-dismiss')) {
            closeBundleModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !bundleModal.hidden) {
            closeBundleModal();
        }
    });

    bundleCopyButton.addEventListener('click', function () {
        if (!latestBundleRequest) {
            return;
        }

        copyText(bundleCopyButton, latestBundleRequest);
    });

// ns:start family._base.workspace.06_output-toolbar
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
// ns:end family._base.workspace.06_output-toolbar

    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });

    importJsonInput.addEventListener('change', function () {
        const file = importJsonInput.files && importJsonInput.files[0] ? importJsonInput.files[0] : null;
        handleJsonImportFile(file);
    });

});
// ns:end family._base.workspace.00_shell
// ns:start family._base.workspace.07_table-output
(function setupAssessUbuntu2204CisTableOutputStandard() {
    const rootSelector = '.assess-ubuntu-2204-cis-tool';
    const tableSelector = '.tool-result-table tbody tr, .assess-ubuntu-2204-cis-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .assess-ubuntu-2204-cis-table tbody';
    const clampClass = 'assess-ubuntu-2204-cis-table-cell-text';
    const cellClampClass = 'assess-ubuntu-2204-cis-cell-clamp';
    const statusColumnClass = 'assess-ubuntu-2204-cis-table-status-cell';

    function hasActionColumn(cells, table) {
        const lastCell = cells[cells.length - 1];
        const lastHead = table ? table.querySelector('thead th:last-child') : null;
        const headText = lastHead ? String(lastHead.textContent || '') : '';

        return Boolean(
            lastCell && lastCell.querySelector('button, [data-copy-row], [data-inventory-copy-row], [data-control-copy-row], [data-options-copy], [data-operation-copy], [data-copy-value]')
        ) || /copy|action|actions/i.test(headText);
    }

    function isStatusLikeHeader(text) {
        return /^(status|signal|criticality|severity|state|health|outcome|result|level|label)$/i.test(String(text || '').trim());
    }

    function getBodyCells(row) {
        return Array.from(row.children).filter(function filterCells(cell) {
            return cell.tagName && cell.tagName.toLowerCase() === 'td';
        });
    }

    function applyStatusAlignment(root) {
        root.querySelectorAll('.tool-result-table, .assess-ubuntu-2204-cis-table').forEach(function alignStatusTable(table) {
            const headers = Array.from(table.querySelectorAll('thead th'));
            const rows = Array.from(table.querySelectorAll('tbody tr'));

            table.querySelectorAll('.' + statusColumnClass).forEach(function clearStatusCell(cell) {
                cell.classList.remove(statusColumnClass);
            });

            headers.forEach(function alignStatusColumn(header, index) {
                const statusLike = isStatusLikeHeader(header.textContent);
                header.classList.toggle(statusColumnClass, statusLike);

                if (!statusLike) {
                    return;
                }

                rows.forEach(function alignStatusCell(row) {
                    const cells = getBodyCells(row);
                    const cell = cells[index];

                    if (cell && cell.colSpan <= 1) {
                        cell.classList.add(statusColumnClass);
                    }
                });
            });
        });
    }

    function clampCell(cell) {
        if (!cell || cell.colSpan > 1 || cell.querySelector('.' + clampClass + ', .' + cellClampClass)) {
            return;
        }

        if (cell.children.length === 1 && !cell.firstElementChild.matches('button')) {
            cell.firstElementChild.classList.add(clampClass);
            return;
        }

        const wrapper = document.createElement('span');
        wrapper.className = clampClass;

        while (cell.firstChild) {
            wrapper.appendChild(cell.firstChild);
        }

        cell.appendChild(wrapper);
    }

    function applyTableOutputClamp() {
        const root = document.querySelector(rootSelector);
        if (!root) {
            return;
        }

        applyStatusAlignment(root);

        root.querySelectorAll(tableSelector).forEach(function clampRow(row) {
            const cells = getBodyCells(row);
            const table = row.closest('table');
            const actionColumn = hasActionColumn(cells, table);

            cells.forEach(function clampDataCell(cell, index) {
                const isFirst = index === 0;
                const isAction = actionColumn && index === cells.length - 1;

                if (isAction && cell.colSpan <= 1) {
                    cell.classList.add('tool-table-action-cell');
                    return;
                }

                if (!isFirst) {
                    clampCell(cell);
                }
            });
        });
    }

    function observeTables() {
        const root = document.querySelector(rootSelector);
        if (!root) {
            return;
        }

        root.querySelectorAll(tbodySelector).forEach(function observeBody(tbody) {
            if (tbody.dataset.tableOutputClampObserver === 'true') {
                return;
            }

            tbody.dataset.tableOutputClampObserver = 'true';
            new MutationObserver(applyTableOutputClamp).observe(tbody, {
                childList: true,
                subtree: true
            });
        });

        applyTableOutputClamp();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeTables);
    } else {
        observeTables();
    }
}());
// ns:end family._base.workspace.07_table-output
