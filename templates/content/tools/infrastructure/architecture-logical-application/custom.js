// custom.js
// ns:start family._base.workspace.00_shell

// ns:start family._base.workspace.05_result-summary
function installInfraStackResultSummaryNormalizer(prefix) {
    function formatUpdatedLabel() {
        return new Intl.DateTimeFormat('en', {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date());
    }

    function createChip(text, tone, iconClass) {
        const chip = document.createElement('span');
        const icon = iconClass || 'bi bi-info-circle';

        chip.className = prefix + '-result-chip ' + prefix + '-result-chip-' + tone;
        chip.innerHTML = '<span class="' + prefix + '-result-chip-icon"><i class="' + icon + '" aria-hidden="true"></i></span>';
        chip.append(document.createTextNode(text));

        return chip;
    }


    function metricIconForLabel(label, index) {
        const normalized = String(label || '').toLowerCase();
        const fallback = ['bi bi-globe2', 'bi bi-grid-3x3-gap', 'bi bi-diagram-3', 'bi bi-database'];

        if (/region|location|geography|cloud/.test(normalized)) {
            return 'bi bi-globe2';
        }
        if (/zone|az|availability/.test(normalized)) {
            return 'bi bi-grid-3x3-gap';
        }
        if (/egress|nat|gateway|route|traffic|network/.test(normalized)) {
            return 'bi bi-signpost-split';
        }
        if (/data|database|storage|backup/.test(normalized)) {
            return 'bi bi-database';
        }
        if (/score|readiness|ready/.test(normalized)) {
            return 'bi bi-speedometer2';
        }
        if (/inventory|component|service|node/.test(normalized)) {
            return 'bi bi-boxes';
        }
        if (/security|control|identity|policy/.test(normalized)) {
            return 'bi bi-shield-check';
        }
        if (/compute|service|workload|runtime/.test(normalized)) {
            return 'bi bi-cpu';
        }

        return fallback[index % fallback.length];
    }

    function normalizeMetricCards(summary) {
        const tones = ['success', 'info', 'accent-tone', 'warning'];

        Array.from(summary.querySelectorAll('.' + prefix + '-result-metric-card')).forEach(function (card, index) {
            const tone = tones[index % tones.length];
            const label = card.querySelector('.' + prefix + '-result-metric-label');
            const value = card.querySelector('.' + prefix + '-result-metric-value');
            const copy = card.querySelector('.' + prefix + '-result-metric-copy');

            if (label && /^score$/i.test(label.textContent.trim())) {
                label.textContent = 'Model';
                if (value) {
                    value.textContent = 'Generated';
                }
                if (copy) {
                    copy.textContent = 'Current architecture model state.';
                }
            }

            if (!card.classList.contains(prefix + '-result-metric-success') &&
                    !card.classList.contains(prefix + '-result-metric-info') &&
                    !card.classList.contains(prefix + '-result-metric-accent-tone') &&
                    !card.classList.contains(prefix + '-result-metric-warning')) {
                card.classList.add(prefix + '-result-metric-' + tone);
            }

            if (!card.querySelector('.' + prefix + '-result-metric-icon')) {
                const icon = document.createElement('span');
                icon.className = prefix + '-result-metric-icon';
                icon.setAttribute('aria-hidden', 'true');
                icon.innerHTML = '<i class="' + metricIconForLabel(label ? label.textContent : '', index) + '"></i>';
                card.insertBefore(icon, card.firstChild);
            }

            if (!card.querySelector('.' + prefix + '-result-metric-accent')) {
                const accent = document.createElement('span');
                accent.className = prefix + '-result-metric-accent';
                accent.setAttribute('aria-hidden', 'true');
                card.appendChild(accent);
            }
        });
    }

    function textFrom(element, fallback) {
        const value = element ? element.textContent.trim() : '';

        return value || fallback;
    }

    function compactPrimaryText(primaryCard, summaryCard) {
        const summaryTitle = textFrom(summaryCard.querySelector('.' + prefix + '-result-title'), 'Primary result');
        const currentValue = textFrom(primaryCard.querySelector('.' + prefix + '-result-command-value'), '');
        const compactTitle = summaryTitle
            .replace(/\s+command$/i, '')
            .replace(/\s+preview$/i, '')
            .replace(/^generated\s+/i, '')
            .trim();

        if (!currentValue || currentValue.length > 48 || /\b(curl|chmod|nc|ncat|netcat|sudo|crontab)\b/i.test(currentValue)) {
            return compactTitle || 'Primary result';
        }

        return currentValue;
    }

    function ensureResultHeader(summary) {
        const hero = summary.querySelector('.' + prefix + '-result-hero-grid');
        if (!hero || summary.querySelector('.' + prefix + '-result-header')) {
            return;
        }

        const header = document.createElement('header');
        header.className = prefix + '-result-header';
        header.setAttribute('aria-label', 'Result summary header');
        header.innerHTML = [
            '<div class="' + prefix + '-result-header-main">',
            '<span class="' + prefix + '-result-header-icon" aria-hidden="true"><i class="bi bi-diagram-3"></i></span>',
            '<div class="' + prefix + '-result-header-copy">',
            '<h2 class="' + prefix + '-result-header-title">Result Summary</h2>',
            '<p>Overview of the current architecture result and key metrics</p>',
            '</div>',
            '</div>',
            '<div class="' + prefix + '-result-header-meta" aria-label="Result summary status">',
            '<span class="' + prefix + '-result-header-chip ' + prefix + '-result-chip ' + prefix + '-result-chip-ready"><span class="' + prefix + '-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span>',
            '<span class="' + prefix + '-result-header-chip ' + prefix + '-result-chip ' + prefix + '-result-chip-updated"><span class="' + prefix + '-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>' + formatUpdatedLabel() + '</span></span>',
            '</div>'
        ].join('');
        summary.insertBefore(header, hero);
    }

    function normalizeSummaryCard(summaryCard) {
        let intro = summaryCard.querySelector('.' + prefix + '-result-summary-intro');
        const chipRow = summaryCard.querySelector('.' + prefix + '-result-chip-row, .' + prefix + '-result-chip-grid');

        if (!intro) {
            const kicker = summaryCard.querySelector('.' + prefix + '-result-kicker');
            const title = summaryCard.querySelector('.' + prefix + '-result-title');
            const copy = summaryCard.querySelector('.' + prefix + '-result-copy');
            intro = document.createElement('div');
            intro.className = prefix + '-result-summary-intro';

            const icon = document.createElement('span');
            icon.className = prefix + '-result-card-icon ' + prefix + '-result-card-icon-summary';
            icon.setAttribute('aria-hidden', 'true');
            icon.innerHTML = '<i class="bi bi-clipboard-data"></i>';

            const copyWrap = document.createElement('div');
            copyWrap.className = prefix + '-result-summary-copy';
            [kicker, title, copy].forEach(function (node) {
                if (node) {
                    copyWrap.appendChild(node);
                }
            });

            intro.appendChild(icon);
            intro.appendChild(copyWrap);
            summaryCard.insertBefore(intro, summaryCard.firstChild);
        }

        const kicker = intro.querySelector('.' + prefix + '-result-kicker');
        if (kicker) {
            kicker.textContent = 'Descriptive Summary';
        }

        if (!summaryCard.querySelector('.' + prefix + '-result-card-divider')) {
            const divider = document.createElement('span');
            divider.className = prefix + '-result-card-divider';
            divider.setAttribute('aria-hidden', 'true');
            if (chipRow) {
                summaryCard.insertBefore(divider, chipRow);
            } else {
                summaryCard.appendChild(divider);
            }
        }
    }

    function ensureSummaryChips(summaryCard) {
        let chipGrid = summaryCard.querySelector('.' + prefix + '-result-chip-grid') || summaryCard.querySelector('.' + prefix + '-result-chip-row');

        if (!chipGrid) {
            chipGrid = document.createElement('div');
            chipGrid.className = prefix + '-result-chip-grid';
            chipGrid.setAttribute('aria-label', 'Result summary state');
            summaryCard.appendChild(chipGrid);
        }

        chipGrid.classList.remove(prefix + '-result-chip-row');
        chipGrid.classList.add(prefix + '-result-chip-grid');
        chipGrid.setAttribute('aria-label', 'Result summary state');

        Array.from(chipGrid.querySelectorAll('.' + prefix + '-result-chip')).forEach(function (chip) {
            if (/^updated\b/i.test(chip.textContent.trim())) {
                chip.remove();
            }
        });

        while (chipGrid.querySelectorAll('.' + prefix + '-result-chip').length < 4) {
            chipGrid.appendChild(createChip('Model ready', 'baseline', 'bi bi-check2-circle'));
        }
    }

    function normalizeRingValues(summary) {
        summary.querySelectorAll('.' + prefix + '-result-ring-value').forEach(function (value) {
            const length = Math.max(value.textContent.trim().length, 3);
            value.style.setProperty('--' + prefix + '-result-value-chars', String(length));
        });
    }

    function ensurePrimaryOutcome(primaryCard, summaryCard) {
        let outcomeRow = primaryCard.querySelector('.' + prefix + '-result-chip-row-center');

        if (!outcomeRow) {
            outcomeRow = document.createElement('div');
            outcomeRow.className = prefix + '-result-chip-row ' + prefix + '-result-chip-row-center';
            outcomeRow.setAttribute('aria-label', 'Primary result outcome');
            primaryCard.appendChild(outcomeRow);
        }

        let divider = Array.from(primaryCard.children).find(function (child) {
            return child.classList && child.classList.contains(prefix + '-result-card-divider');
        });

        if (!divider) {
            divider = document.createElement('span');
            divider.className = prefix + '-result-card-divider';
            divider.setAttribute('aria-hidden', 'true');
            primaryCard.insertBefore(divider, outcomeRow);
        } else if (divider.nextElementSibling !== outcomeRow) {
            primaryCard.insertBefore(divider, outcomeRow);
        }

        if (outcomeRow.querySelector('.' + prefix + '-result-chip')) {
            return;
        }

        const sourceChip = summaryCard.querySelector('.' + prefix + '-result-chip-ready, .' + prefix + '-result-chip-success, .' + prefix + '-result-chip-baseline, .' + prefix + '-result-chip-warning');
        const outcomeChip = sourceChip ? sourceChip.cloneNode(true) : createChip('Primary result', 'outcome', 'bi bi-check2-circle');

        outcomeChip.classList.add(prefix + '-result-chip-outcome');
        outcomeRow.appendChild(outcomeChip);
    }

    function normalizeRingPrimary(primaryCard, summaryCard) {
        const ring = primaryCard.querySelector('.' + prefix + '-result-ring');

        if (!ring) {
            return false;
        }

        primaryCard.dataset.resultVisual = 'ring';

        primaryCard.querySelectorAll([
            '.' + prefix + '-result-card-icon-primary',
            '.' + prefix + '-result-primary-number',
            '.' + prefix + '-result-primary-text'
        ].join(', ')).forEach(function (node) {
            node.remove();
        });

        const visualShell = ring.closest('.' + prefix + '-result-primary-visual') || ring;
        let topCopy = primaryCard.querySelector('.' + prefix + '-result-visual-copy-top');

        if (!topCopy) {
            topCopy = document.createElement('div');
            topCopy.className = prefix + '-result-visual-copy ' + prefix + '-result-visual-copy-top';
        }

        if (visualShell.parentElement === primaryCard && topCopy.parentElement !== primaryCard) {
            primaryCard.insertBefore(topCopy, visualShell);
        } else if (!topCopy.parentElement) {
            primaryCard.insertBefore(topCopy, primaryCard.firstChild);
        }

        const heading = primaryCard.querySelector('.' + prefix + '-result-primary-heading');
        let kicker = Array.from(primaryCard.querySelectorAll('.' + prefix + '-result-kicker')).find(function (item) {
            return /primary/i.test(item.textContent);
        }) || topCopy.querySelector('.' + prefix + '-result-kicker');

        if (!kicker) {
            kicker = document.createElement('span');
            kicker.className = prefix + '-result-kicker';
        }

        kicker.textContent = 'Primary Result';
        if (!topCopy.contains(kicker)) {
            topCopy.appendChild(kicker);
        }

        const title = primaryCard.querySelector('.' + prefix + '-result-title-center, .' + prefix + '-result-title');
        if (title) {
            title.querySelectorAll('i, svg').forEach(function (icon) {
                icon.remove();
            });
            if (!topCopy.contains(title)) {
                topCopy.appendChild(title);
            }
        }

        let bottomCopy = Array.from(primaryCard.querySelectorAll('.' + prefix + '-result-visual-copy')).find(function (item) {
            return item !== topCopy;
        });

        if (!bottomCopy) {
            bottomCopy = document.createElement('div');
            bottomCopy.className = prefix + '-result-visual-copy';
            if (visualShell.parentElement) {
                visualShell.insertAdjacentElement('afterend', bottomCopy);
            } else {
                primaryCard.appendChild(bottomCopy);
            }
        }

        Array.from(bottomCopy.querySelectorAll('.' + prefix + '-result-kicker')).forEach(function (item) {
            item.remove();
        });

        if (!bottomCopy.querySelector('.' + prefix + '-result-copy')) {
            const copy = document.createElement('p');
            const summaryCopy = summaryCard.querySelector('.' + prefix + '-result-copy');
            copy.className = prefix + '-result-copy ' + prefix + '-result-copy-center';
            copy.textContent = textFrom(summaryCopy, 'Primary output generated from the current inputs.');
            bottomCopy.appendChild(copy);
        }

        if (heading && !heading.textContent.trim()) {
            heading.remove();
        }

        ensurePrimaryOutcome(primaryCard, summaryCard);

        return true;
    }

    function normalizeTextPrimary(primaryCard, summaryCard) {
        primaryCard.dataset.resultVisual = primaryCard.classList.contains(prefix + '-result-card-command') ? 'command' : 'text';

        const kicker = primaryCard.querySelector('.' + prefix + '-result-kicker');
        if (kicker) {
            kicker.textContent = 'Primary Result';
        }

        const commandValue = primaryCard.querySelector('.' + prefix + '-result-command-value');
        if (commandValue) {
            commandValue.textContent = compactPrimaryText(primaryCard, summaryCard);
        }

        ensurePrimaryOutcome(primaryCard, summaryCard);
    }

    function normalize() {
        const summary = document.querySelector('.' + prefix + '-result-summary');
        if (!summary) {
            return;
        }

        const hero = summary.querySelector('.' + prefix + '-result-hero-grid');
        if (!hero) {
            return;
        }

        ensureResultHeader(summary);

        const cards = Array.from(hero.querySelectorAll(':scope > .' + prefix + '-result-card'));
        const primaryCard = cards.find(function (card) {
            return card.classList.contains(prefix + '-result-card-primary') || card.classList.contains(prefix + '-result-card-visual') || card.classList.contains(prefix + '-result-card-command');
        }) || cards[0];
        const summaryCard = cards.find(function (card) {
            return card !== primaryCard && (card.classList.contains(prefix + '-result-card-summary') || card.classList.contains(prefix + '-result-card-main'));
        }) || cards.find(function (card) {
            return card !== primaryCard;
        });

        if (!primaryCard || !summaryCard) {
            return;
        }

        primaryCard.classList.add(prefix + '-result-card-primary');
        summaryCard.classList.add(prefix + '-result-card-summary');
        normalizeSummaryCard(summaryCard);

        if (hero.firstElementChild !== primaryCard) {
            hero.insertBefore(primaryCard, hero.firstElementChild);
        }
        if (primaryCard.nextElementSibling !== summaryCard) {
            hero.insertBefore(summaryCard, primaryCard.nextElementSibling);
        }

        const hasRing = normalizeRingPrimary(primaryCard, summaryCard);
        if (!hasRing) {
            normalizeTextPrimary(primaryCard, summaryCard);
        }
        ensureSummaryChips(summaryCard);
        normalizeRingValues(summary);
        normalizeMetricCards(summary);
    }

    function scheduleNormalize() {
        window.requestAnimationFrame(normalize);
    }

    window.InfraStackResultSummaryNormalizers = window.InfraStackResultSummaryNormalizers || {};
    window.InfraStackResultSummaryNormalizers[prefix] = normalize;

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

function normalizeInfraStackResultSummary(prefix) {
    const normalizers = window.InfraStackResultSummaryNormalizers || {};

    if (typeof normalizers[prefix] === 'function') {
        normalizers[prefix]();
    }
}

installInfraStackResultSummaryNormalizer('architecture-logical-application');
// ns:end family._base.workspace.05_result-summary
// ns:start family._base.workspace.01_input-brief
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "01_input-brief",
        "title": "input brief",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            154,
                            157
                  ],
                  [
                            597,
                            623
                  ],
                  [
                            1393,
                            1403
                  ],
                  [
                            1418,
                            1573
                  ],
                  [
                            5814,
                            5858
                  ],
                  [
                            5883,
                            5888
                  ],
                  [
                            6144,
                            6147
                  ],
                  [
                            6174,
                            6175
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationPrompt",
            "architectureLogicalApplicationGenerate",
            "architectureLogicalApplicationReset",
            "architectureLogicalApplicationErrorState"
        ],
        "sourceClasses": [
            "tool-prompt-shell",
            "tool-main-row",
            "tool-main-label",
            "tool-main-input-grid",
            "architecture-logical-application-prompt",
            "architecture-logical-application-prompt-hint",
            "architecture-logical-application-main-actions",
            "tool-error-state"
        ],
        "sourceVariables": [
            "promptInput",
            "generateButton",
            "resetButton",
            "errorState"
        ],
        "sourceFunctions": [
            "normalizePrompt",
            "showError",
            "clearError",
            "inferFromPrompt",
            "generateFromPrompt",
            "resetToDefault"
        ],
        "sourceBehaviours": [
            "normalizes the primary brief",
            "seeds the normalized model from prompt text",
            "binds Generate and Reset actions",
            "renders parser errors without unlocking generated output"
        ]
    };

    /**
     * Returns the extracted architecture input brief JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function architecturePromptSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.architecturePromptSourceSection = architecturePromptSourceSection;
    registry.architecturePrompt = architecturePromptSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family._base.workspace.01_input-brief
// ns:start family._base.workspace.02_basic-settings
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "02_basic-settings",
        "title": "basic settings",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            160,
                            161
                  ],
                  [
                            243,
                            245
                  ],
                  [
                            711,
                            886
                  ],
                  [
                            892,
                            918
                  ],
                  [
                            1583,
                            1601
                  ],
                  [
                            5861,
                            5880
                  ],
                  [
                            6150,
                            6153
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationPreset",
            "architectureLogicalApplicationPresetDescription",
            "architectureLogicalApplicationDetailLevel",
            "architectureLogicalApplicationFlowDepth"
        ],
        "sourceClasses": [
            "architecture-logical-application-basic-preset-section",
            "architecture-logical-application-basic-grid",
            "architecture-logical-application-control-stack",
            "architecture-logical-application-native-select",
        ],
        "sourceVariables": [
            "presetInput",
            "presetDescription",
            "detailLevelInput",
            "flowDepthInput",
        ],
        "sourceFunctions": [
            "syncControls",
            "applyPreset"
        ],
        "sourceBehaviours": [
            "keeps the preset description synchronized",
            "keeps detail level and flow focus synchronized",
            "applies preset defaults to the normalized model"
        ]
    };

    /**
     * Returns the extracted architecture basic settings JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function basicTabSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.basicTabSourceSection = basicTabSourceSection;
    registry.basicTab = basicTabSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family._base.workspace.02_basic-settings
// ns:start family._base.workspace.03_custom-settings
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "03_advanced-settings",
        "title": "advanced settings",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            248,
                            261
                  ],
                  [
                            937,
                            954
                  ],
                  [
                            1606,
                            1652
                  ],
                  [
                            6165,
                            6170
                  ],
                  [
                            6339,
                            6354
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationOverviewTab",
            "architectureLogicalApplicationComponentsTab",
            "architectureLogicalApplicationIntegrationsTab",
            "architectureLogicalApplicationFlowTab",
            "architectureLogicalApplicationOverviewPanel",
            "architectureLogicalApplicationComponentsPanel",
            "architectureLogicalApplicationIntegrationsPanel",
            "architectureLogicalApplicationFlowPanel",
            "architectureLogicalApplicationApplicationName",
            "architectureLogicalApplicationBusinessPurpose",
            "architectureLogicalApplicationUsersActors",
            "architectureLogicalApplicationFrontendComponents",
            "architectureLogicalApplicationBackendServices",
            "architectureLogicalApplicationDatabases",
            "architectureLogicalApplicationCacheStorage",
            "architectureLogicalApplicationExternalIntegrations",
            "architectureLogicalApplicationAuthenticationMethod",
            "architectureLogicalApplicationNotifications",
            "architectureLogicalApplicationMonitoringLogging",
            "architectureLogicalApplicationBusinessFlow"
        ],
        "sourceClasses": [
            "architecture-logical-application-custom-panel",
            "architecture-logical-application-custom-panel-summary",
            "architecture-logical-application-config-tabs",
            "architecture-logical-application-config-tab",
            "architecture-logical-application-config-panel",
            "architecture-logical-application-config-grid",
            "architecture-logical-application-toggle-grid",
            "architecture-logical-application-toggle-item"
        ],
        "sourceVariables": [
            "applicationNameInput",
            "businessPurposeInput",
            "usersActorsInput",
            "frontendComponentsInput",
            "backendServicesInput",
            "databasesInput",
            "cacheStorageInput",
            "externalIntegrationsInput",
            "authenticationMethodInput",
            "notificationsInput",
            "monitoringLoggingInput",
            "businessFlowInput"
        ],
        "sourceFunctions": [
            "activateConfigTab",
            "bindTabKeyboardNavigation",
            "buildSpecFromControls",
            "renderFromControls"
        ],
        "sourceBehaviours": [
            "switches custom tab panels accessibly",
            "reads custom controls into normalized state",
            "re-renders the preview or generated diagram after control changes"
        ]
    };

    /**
     * Returns the extracted architecture advanced settings JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function customTabSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.customTabSourceSection = customTabSourceSection;
    registry.customTab = customTabSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family._base.workspace.03_custom-settings
// ns:start family.architecture.workspace.04_selected-item
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "04_selected-item",
        "title": "selected item",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            218,
                            228
                  ],
                  [
                            404,
                            439
                  ],
                  [
                            4188,
                            4629
                  ],
                  [
                            4641,
                            4998
                  ],
                  [
                            5242,
                            5680
                  ],
                  [
                            6198,
                            6202
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationSelectedShell",
            "architectureLogicalApplicationSelectedEmpty",
            "architectureLogicalApplicationSelectedEditor",
            "architectureLogicalApplicationSelectedName",
            "architectureLogicalApplicationSelectedX",
            "architectureLogicalApplicationSelectedY",
            "architectureLogicalApplicationSelectedWidth",
            "architectureLogicalApplicationSelectedHeight",
            "architectureLogicalApplicationHighlightCard",
            "architectureLogicalApplicationApplyCardSize",
            "architectureLogicalApplicationResetCardSize"
        ],
        "sourceClasses": [
            "architecture-logical-application-selected-section",
            "architecture-logical-application-selected-empty",
            "architecture-logical-application-selected-empty-chips",
            "architecture-logical-application-selected-hint-chip",
            "architecture-logical-application-selected-editor",
            "architecture-logical-application-selected-name",
            "architecture-logical-application-selected-actions",
            "diagram-card-group",
            "diagram-resize-handle",
            "diagram-connector",
            "diagram-connector-hit-target",
            "diagram-connector-anchor-handle",
            "diagram-connector-bend-handle"
        ],
        "sourceVariables": [
            "selectedCardId",
            "selectedCardIds",
            "selectedConnectorId",
            "highlightedCardId",
            "stageUndoStack"
        ],
        "sourceFunctions": [
            "renderSelectedEmptyMessage",
            "showSelectedShell",
            "setSelectedCards",
            "syncSelectedCardVisual",
            "updateSelectedCardEditor",
            "highlightSelectedCard",
            "applySelectedCardSize",
            "resetSelectedCardSize",
            "undoStageEdit",
            "setSelectedConnector",
            "renderConnectorAnchorHandles",
            "bindConnectorAnchorHandle",
            "bindConnectorBendHandle",
            "getCurrentConnectorOverrides",
            "bindStageDragging",
            "bindStageResizing"
        ],
        "sourceBehaviours": [
            "shows empty hint chips before selection",
            "syncs selected card fields from rendered model state",
            "applies movement and size edits through layout overrides",
            "supports connector selection as an editable stage item when connectors are editable",
            "shows connector adjustment guidance while keeping selected box inspector state separate",
            "keeps connector overrides in normalized export and restore data",
            "preserves undo snapshots for stage edits"
        ]
    };

    /**
     * Returns the extracted architecture selected item JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function selectedItemSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.selectedItemSourceSection = selectedItemSourceSection;
    registry.selectedItem = selectedItemSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family.architecture.workspace.04_selected-item
// ns:start family.architecture.workspace.04_visual-contract
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "05_result-text",
        "title": "result text",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            164,
                            166
                  ],
                  [
                            189,
                            190
                  ],
                  [
                            210,
                            215
                  ],
                  [
                            3871,
                            3894
                  ],
                  [
                            4167,
                            4185
                  ],
                  [
                            5683,
                            5727
                  ],
                  [
                            5750,
                            5810
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationStageTitle",
            "architectureLogicalApplicationStageSubtitle",
            "architectureLogicalApplicationStageMeta",
            "architectureLogicalApplicationOutputEmpty",
            "architectureLogicalApplicationPromptSummary",
            "architectureLogicalApplicationResultTextGenerated"
        ],
        "sourceClasses": [
            "architecture-logical-application-stage-header",
            "architecture-logical-application-stage-heading",
            "architecture-logical-application-stage-preset-chip",
            "architecture-logical-application-stage-meta",
            "architecture-logical-application-prompt-notes-card",
            "architecture-logical-application-note-card",
            "architecture-logical-application-note-copy",
            "tool-empty-state"
        ],
        "sourceVariables": [
            "stageTitle",
            "stageSubtitle",
            "stageMeta",
            "outputEmpty",
            "promptSummary"
        ],
        "sourceFunctions": [
            "renderStageMeta",
            "renderStageHeader",
            "renderNotes",
            "renderResult",
            "renderPresetPreview"
        ],
        "sourceBehaviours": [
            "renders stage title and preset chip",
            "renders metadata chips from current model state",
            "keeps the exact pre-generate output notice visible until generation",
            "renders short generated review text from normalized notes"
        ]
    };

    /**
     * Returns the extracted architecture result text JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function resultTextSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.resultTextSourceSection = resultTextSourceSection;
    registry.resultText = resultTextSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family.architecture.workspace.04_visual-contract
// ns:start family.architecture.workspace.04_visual-contract
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "06_result-diagram",
        "title": "result diagram",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            169,
                            186
                  ],
                  [
                            988,
                            1387
                  ],
                  [
                            2232,
                            3653
                  ],
                  [
                            5018,
                            5239
                  ],
                  [
                            6178,
                            6195
                  ],
                  [
                            6244,
                            6303
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationStageShell",
            "architectureLogicalApplicationStageEmpty",
            "architectureLogicalApplicationStageCanvas",
            "architectureLogicalApplicationZoomControl",
            "architectureLogicalApplicationZoomLabel",
            "architectureLogicalApplicationZoomInput",
            "architectureLogicalApplicationZoomOut",
            "architectureLogicalApplicationZoomIn",
            "architectureLogicalApplicationZoomFit",
            "architectureLogicalApplicationZoomActual",
            "architectureLogicalApplicationUndoStageEdit",
            "architectureLogicalApplicationHighlightAll",
            "architectureLogicalApplicationZoomHideUi",
            "architectureLogicalApplicationUsageHelpButton",
            "architectureLogicalApplicationUsageHelpPopup",
            "architectureLogicalApplicationUsageHelpClose",
            "architectureLogicalApplicationFullscreen",
            "architectureLogicalApplicationResetLayout"
        ],
        "sourceClasses": [
            "tool-stage-shell",
            "tool-stage-toolbar",
            "tool-stage-body",
            "tool-stage-empty",
            "tool-stage-canvas",
            "architecture-logical-application-stage-canvas",
            "architecture-logical-application-zoom-control",
            "architecture-logical-application-icon-btn",
            "architecture-logical-application-stage-preview",
            "architecture-logical-application-usage-overlay",
            "diagram-root",
            "diagram-card-group",
            "diagram-connector",
            "diagram-connector-hit-target",
            "diagram-connector-anchor-handle",
            "diagram-connector-bend-handle"
        ],
        "sourceVariables": [
            "stageCanvas",
            "stageShell",
            "stageZoom",
            "stageUiHidden",
            "stageDiagramHighlighted",
            "selectedConnectorId",
            "connectorOverrideContext",
            "defaultStageZoom"
        ],
        "sourceFunctions": [
            "applyStageZoom",
            "setStageZoom",
            "setStageZoomToFit",
            "setStageUiHidden",
            "syncStageDiagramHighlight",
            "setUsageHelpOpen",
            "toggleFullscreen",
            "resetStageViewport",
            "computeStageGeometry",
            "buildSvgMarkup",
            "renderCardConnector",
            "buildConnectorPathFromCards",
            "findConnectorPathById",
            "updateConnectorPreview",
            "renderConnectorAnchorHandles",
            "bindConnectorAnchorHandle",
            "bindConnectorBendHandle",
            "renderResult",
            "renderPresetPreview"
        ],
        "sourceBehaviours": [
            "renders the SVG diagram from normalized state",
            "supports zoom, fit, actual size, fullscreen, hide UI, usage help, and whole-diagram highlight",
            "keeps layout and connector edits synchronized with export state",
            "renders invisible connector hit targets separate from visible connector strokes",
            "keeps arrowhead sizing fixed through user-space marker geometry",
            "redraws connectors while connected boxes move or resize",
            "persists connector anchor and bend overrides",
            "shows preview state without unlocking generated output"
        ]
    };

    /**
     * Returns the extracted architecture result diagram JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function resultDiagramSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.resultDiagramSourceSection = resultDiagramSourceSection;
    registry.resultDiagram = resultDiagramSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family.architecture.workspace.04_visual-contract
// ns:start family._base.workspace.05_result-summary
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "05_result-summary",
        "title": "result summary",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            193,
                            193
                  ],
                  [
                            1937,
                            2126
                  ],
                  [
                            3898,
                            4049
                  ],
                  [
                            4104,
                            4162
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationOutputStatus",
            "architectureLogicalApplicationScoreValue",
            "architectureLogicalApplicationScoreEchart"
        ],
        "sourceClasses": [
            "architecture-logical-application-output-summary",
            "architecture-logical-application-output-status-card",
            "architecture-logical-application-score-card",
            "architecture-logical-application-score-ring-card",
            "architecture-logical-application-score-value",
            "architecture-logical-application-score-copy",
            "architecture-logical-application-score-kicker",
            "architecture-logical-application-score-summary",
            "architecture-logical-application-score-detail",
            "architecture-logical-application-score-tag"
        ],
        "sourceVariables": [
            "outputStatus",
            "scoreRingChart",
            "scoreRingRenderToken",
            "scoreRingResizeHandler"
        ],
        "sourceFunctions": [
            "clampScore",
            "buildArchitectureProsCons",
            "buildArchitectureScore",
            "loadECharts",
            "destroyScoreRingChart",
            "renderScoreRingChart",
            "renderOutputScore"
        ],
        "sourceBehaviours": [
            "derives advisory score from the normalized model",
            "renders score copy and tone tags",
            "keeps score copy advisory and non-validating",
            "destroys and redraws the optional ECharts ring safely"
        ]
    };

    /**
     * Returns the extracted architecture result summary JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function resultSummarySourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.resultSummarySourceSection = resultSummarySourceSection;
    registry.resultSummary = resultSummarySourceSection;
    registry.scoreCard = resultSummarySourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family._base.workspace.05_result-summary
// ns:start family._base.workspace.06_output-toolbar
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "08_sort-card",
        "title": "sort card",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            201,
                            204
                  ],
                  [
                            231,
                            236
                  ],
                  [
                            3699,
                            3763
                  ],
                  [
                            5905,
                            6088
                  ],
                  [
                            6205,
                            6215
                  ],
                  [
                            6238,
                            6241
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationInventorySortSelect",
            "architectureLogicalApplicationInventorySortSummary",
            "architectureLogicalApplicationInventorySort",
            "architectureLogicalApplicationExportPng",
            "architectureLogicalApplicationDownloadSvg",
            "architectureLogicalApplicationCopyJson",
            "architectureLogicalApplicationDownloadJson",
            "architectureLogicalApplicationImportJsonButton"
        ],
        "sourceClasses": [
            "architecture-logical-application-toolbar-shell",
            "architecture-logical-application-toolbar",
            "architecture-logical-application-toolbar-main",
            "tool-output-toolbar",
            "tool-output-actions",
            "architecture-logical-application-sort-label",
            "architecture-logical-application-sort-wrap",
            "architecture-logical-application-sort-select",
            "architecture-logical-application-sort-summary",
            "architecture-logical-application-sort-menu",
            "architecture-logical-application-sort-option"
        ],
        "sourceVariables": [
            "inventorySortInput",
            "inventorySortSelect",
            "inventorySortSummary",
            "inventorySortOptions",
            "inventorySortMode",
            "exportPngButton",
            "downloadSvgButton",
            "copyJsonButton",
            "downloadJsonButton",
            "importJsonButton"
        ],
        "sourceFunctions": [
            "sortInventoryItems",
            "syncInventorySortSelect",
            "setInventorySortMode",
            "applyInventorySortMode",
            "downloadFile",
            "downloadSvg",
            "exportPng",
            "copyJson",
            "downloadJson"
        ],
        "sourceBehaviours": [
            "sorts inventory presentation without mutating the model",
            "keeps the Sort trigger label synchronized",
            "binds implemented PNG, SVG, JSON copy/download, and import actions"
        ]
    };

    /**
     * Returns the extracted architecture sort card JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function sortCardSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.sortCardSourceSection = sortCardSourceSection;
    registry.sortCard = sortCardSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family._base.workspace.06_output-toolbar
// ns:start family._base.workspace.07_table-output
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "09_result-table",
        "title": "result table",
        "sourceTool": "templates/content/tools/infrastructure/architecture-logical-application/",
        "sourceFile": "custom.js",
        "sourceJsLines": [
                  [
                            196,
                            198
                  ],
                  [
                            207,
                            207
                  ],
                  [
                            3660,
                            3694
                  ],
                  [
                            3767,
                            3868
                  ],
                  [
                            4052,
                            4100
                  ],
                  [
                            6091,
                            6135
                  ],
                  [
                            6156,
                            6161
                  ],
                  [
                            6218,
                            6231
                  ]
        ],
        "sourceDomIds": [
            "architectureLogicalApplicationOutputEmpty",
            "architectureLogicalApplicationOutputContent",
            "architectureLogicalApplicationInventoryTableBody",
            "architectureLogicalApplicationRoutingTableBody",
            "architectureLogicalApplicationControlTableBody",
            "architectureLogicalApplicationPromptSummary",
            "architectureLogicalApplicationKeywordList",
            "architectureLogicalApplicationAssumptionList",
            "architectureLogicalApplicationModelList",
            "architectureLogicalApplicationProsList",
            "architectureLogicalApplicationConsList",
            "architectureLogicalApplicationPillarBreakdown",
            "architectureLogicalApplicationRiskLevel",
            "architectureLogicalApplicationJsonOutput",
            "architectureLogicalApplicationImportJson"
        ],
        "sourceClasses": [
            "tool-output-shell",
            "tool-empty-state",
            "architecture-logical-application-output-content",
            "architecture-logical-application-output-shell",
            "architecture-logical-application-tabs-shell",
            "tool-tabs",
            "architecture-logical-application-tab-btn",
            "architecture-logical-application-tab-panel",
            "architecture-logical-application-inventory-panel",
            "architecture-logical-application-table-card",
            "architecture-logical-application-table-wrap",
            "architecture-logical-application-table",
            "architecture-logical-application-row-copy",
            "architecture-logical-application-prompt-notes-card",
            "architecture-logical-application-assessment-card",
            "architecture-logical-application-pillar-card",
            "architecture-logical-application-risk-card",
            "tool-json-shell",
            "architecture-logical-application-json-code"
        ],
        "sourceVariables": [
            "outputEmpty",
            "outputContent",
            "inventoryTableBody",
            "jsonOutput",
            "promptSummary",
            "keywordList",
            "assumptionList",
            "modelList",
            "prosList",
            "consList",
            "pillarBreakdownOutput",
            "riskLevelOutput",
            "tabButtons",
            "tabPanels"
        ],
        "sourceFunctions": [
            "buildExportPayload",
            "highlightJson",
            "renderInventory",
            "buildInventoryCopyText",
            "copyInventoryRow",
            "renderNotes",
            "buildPillarBreakdown",
            "buildRiskLevel",
            "renderAssessmentSections",
            "restoreFromImportedPayload",
            "handleImportChange",
            "activateTab"
        ],
        "sourceBehaviours": [
            "renders generated inventory rows with copy-row buttons",
            "renders prompt notes and advisory assessment tabs",
            "renders syntax-highlighted JSON export state",
            "validates and restores imported JSON state"
        ]
    };

    /**
     * Returns the extracted architecture result table JavaScript ownership map.
     *
     * @returns {Record<string, string | string[] | number[][]>} Section source metadata.
     */
    function resultTableSourceSection() {
        return JSON.parse(JSON.stringify(source));
    }

    registry.resultTableSourceSection = resultTableSourceSection;
    registry.resultTable = resultTableSourceSection;
    global.InfraStackArchitectureWorkspaceSections = registry;
}(window));
// ns:end family._base.workspace.07_table-output

// ns:start family.architecture.workspace.04_visual-contract
{{ include('content/tools/infrastructure/architecture-logical-application/assets/bin/engine-runtime.js')|raw }}
// ns:end family.architecture.workspace.04_visual-contract
{{ include('content/tools/infrastructure/architecture-logical-application/assets/bin/model-core.js')|raw }}

(function initArchitectureLogicalApplicationWorkspace(globalScope) {
    'use strict';

    const core = ArchitectureLogicalApplicationModelCore;
    const engineRuntime = globalScope.InfraStackArchitectureEngineRuntime || null;
    const iconSvgMap = {
        actors: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-actors.svg')|json_encode|raw }},
        frontend: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-frontend.svg')|json_encode|raw }},
        gateway: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-api-gateway.svg')|json_encode|raw }},
        service: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-service.svg')|json_encode|raw }},
        database: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-database.svg')|json_encode|raw }},
        cache: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-cache-storage.svg')|json_encode|raw }},
        integration: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-integration.svg')|json_encode|raw }},
        identity: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-identity.svg')|json_encode|raw }},
        notification: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-notification.svg')|json_encode|raw }},
        monitoring: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-observability.svg')|json_encode|raw }},
        flow: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-flow.svg')|json_encode|raw }},
        portal: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-web-portal.svg')|json_encode|raw }},
        mobileApp: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-mobile-app.svg')|json_encode|raw }},
        adminPortal: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-admin-portal.svg')|json_encode|raw }},
        apiConsumer: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-api-consumer.svg')|json_encode|raw }},
        authService: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-auth-service.svg')|json_encode|raw }},
        userService: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-user-service.svg')|json_encode|raw }},
        approvalService: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-approval-service.svg')|json_encode|raw }},
        notificationService: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-notification-service.svg')|json_encode|raw }},
        reportingService: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-reporting-service.svg')|json_encode|raw }},
        dataWarehouse: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-data-warehouse.svg')|json_encode|raw }},
        redisCache: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-redis-cache.svg')|json_encode|raw }},
        objectStorage: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-object-storage.svg')|json_encode|raw }},
        paymentGateway: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-payment-gateway.svg')|json_encode|raw }},
        smsGateway: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-sms-gateway.svg')|json_encode|raw }},
        emailService: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-email-service.svg')|json_encode|raw }},
        partnerSystem: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-partner-system.svg')|json_encode|raw }},
        logging: {{ include('content/tools/infrastructure/architecture-logical-application/assets/icon/infra-arch-logging.svg')|json_encode|raw }}
    };
    const dom = {};
    const state = {
        generated: false,
        presetId: 'web-application',
        prompt: '',
        controls: {},
        model: null,
        layoutOverrides: {},
        connectorOverrides: {},
        selectedIds: [],
        selectedConnectorId: '',
        highlightedIds: [],
        stageHighlighted: false,
        zoom: 0.58,
        sortMode: 'id',
        undoStack: [],
        currentPayload: null
    };
    const itemRegistry = new Map();
    const childRegistry = new Map();
    const connectorRegistry = new Map();
    let currentSvgMarkup = '';
    let dragState = null;
    let resizeState = null;
    let connectorBendState = null;
    let marqueeState = null;
    let highlightedAllTimer = null;
    let activePointerSvg = null;
    let activeStageInteraction = {
        type: '',
        ids: []
    };
    let renderFrameId = 0;
    const inventoryColumnLabels = {
        index: '#',
        component: 'Component',
        placement: 'Placement',
        purpose: 'Purpose'
    };
    const engineRuntimeConfig = {
        zoom: {
            defaultValue: 0.58,
            min: 0.25,
            max: 1.8,
            step: 0.1,
            wheelStep: 0.01
        },
        movement: {
            step: 8,
            fastStep: 24,
            snap: 4,
            historyLimit: 30,
            minimumNodeWidth: 120,
            minimumNodeHeight: 58
        },
        selectors: {
            node: '[data-engine-node-id], [data-node-id], [data-item-id]',
            connector: '[data-engine-connector-id], [data-connector-id]',
            connectorBendHandle: '[data-engine-connector-bend], .architecture-logical-application-connector-bend-handle',
            resizeHandle: '[data-engine-resize-handle], .architecture-logical-application-resize-handle',
            keyboardFormTarget: 'input, textarea, select, button, summary, a[href], [contenteditable="true"]'
        },
        classes: {
            selected: 'is-selected',
            multiSelected: 'is-multi-selected',
            highlighted: 'is-highlighted',
            marqueeTarget: 'is-marquee-target',
            diagramHighlighted: 'architecture-logical-application-stage-highlighted',
            dragging: 'architecture-logical-application-stage-dragging',
            resizing: 'architecture-logical-application-stage-resizing',
            uiHidden: 'architecture-logical-application-stage-ui-hidden',
            expanded: 'architecture-logical-application-stage-expanded',
            bodyLock: 'architecture-logical-application-stage-expanded-lock',
            hidden: 'd-none'
        }
    };

    function byId(id) {
        return document.getElementById(id);
    }

    function all(selector, root) {
        return Array.from((root || document).querySelectorAll(selector));
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function highlightJsonText(text) {
        return escapeHtml(text).replace(
            /(&quot;(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\&])*&quot;(?:\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function highlightToken(match) {
                let tokenClass = 'number';

                if (match.startsWith('&quot;')) {
                    tokenClass = match.endsWith(':') ? 'key' : 'string';
                } else if (match === 'true' || match === 'false') {
                    tokenClass = 'boolean';
                } else if (match === 'null') {
                    tokenClass = 'null';
                }

                return '<span class="tool-json-' + tokenClass + '">' + match + '</span>';
            }
        );
    }

    function iconHref(name) {
        const svg = iconSvgMap[name] || iconSvgMap.service;

        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    function downloadBlob(filename, mimeType, content) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function fallbackCopyText(value) {
        const textarea = document.createElement('textarea');

        textarea.value = value;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            return document.execCommand('copy');
        } finally {
            textarea.remove();
        }
    }

    async function writeClipboardText(value) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(value);
                return true;
            } catch (error) {
                return fallbackCopyText(value);
            }
        }

        return fallbackCopyText(value);
    }

    function showError(message) {
        if (!dom.errorState) {
            return;
        }

        dom.errorState.textContent = message;
        dom.errorState.hidden = false;
        dom.errorState.classList.remove('d-none');
    }

    function clearError() {
        if (!dom.errorState) {
            return;
        }

        dom.errorState.textContent = '';
        dom.errorState.hidden = true;
        dom.errorState.classList.add('d-none');
    }

    function collectDom() {
        const ids = [
            'Prompt',
            'Generate',
            'Reset',
            'ErrorState',
            'Preset',
            'DetailLevel',
            'FlowDepth',
            'ApplicationName',
            'BusinessPurpose',
            'UsersActors',
            'FrontendComponents',
            'BackendServices',
            'Databases',
            'CacheStorage',
            'ExternalIntegrations',
            'AuthenticationMethod',
            'Notifications',
            'MonitoringLogging',
            'BusinessFlow',
            'PresetDescription',
            'StageShell',
            'StageTitle',
            'StageSubtitle',
            'StageMeta',
            'StageCanvas',
            'StageEmpty',
            'ZoomInput',
            'ZoomOut',
            'ZoomIn',
            'ZoomLabel',
            'ZoomFit',
            'ZoomActual',
            'UndoStageEdit',
            'HighlightAll',
            'ZoomHideUi',
            'Fullscreen',
            'ResetLayout',
            'UsageHelpButton',
            'UsageHelpClose',
            'UsageHelpPopup',
            'SelectedEmpty',
            'SelectedEditor',
            'SelectedName',
            'SelectedX',
            'SelectedY',
            'SelectedWidth',
            'SelectedHeight',
            'HighlightItem',
            'ApplyItemSize',
            'ResetItemSize',
            'OutputEmpty',
            'OutputContent',
            'OutputStatus',
            'Score',
            'ScoreSummary',
            'ScoreDetail',
            'Sort',
            'InventorySortSelect',
            'InventorySortMenu',
            'InventorySortSummary',
            'ExportPng',
            'DownloadSvg',
            'CopyJson',
            'DownloadJson',
            'ImportJsonButton',
            'ImportJson',
            'InventoryTableBody',
            'RoutingTableBody',
            'ControlTableBody',
            'PromptSummary',
            'KeywordList',
            'AssumptionList',
            'ModelList',
            'ProsList',
            'ConsList',
            'PillarBreakdown',
            'RiskLevel',
            'JsonOutput'
        ];

        ids.forEach(function (name) {
            dom[name.charAt(0).toLowerCase() + name.slice(1)] = byId('architectureLogicalApplication' + name);
        });

        dom.root = document.querySelector('.architecture-logical-application-tool');
        dom.outputTabs = all('.architecture-logical-application-tab-btn');
        dom.outputPanels = all('[data-output-panel]');
        dom.configTabs = all('.architecture-logical-application-config-tab');
        dom.configPanels = all('[data-config-panel]');
        dom.sortOptions = all('.architecture-logical-application-sort-option');

        return Boolean(dom.root && dom.prompt && dom.generate && dom.stageCanvas);
    }

    function collectControls() {
        return {
            detailLevel: dom.detailLevel.value,
            flowDepth: dom.flowDepth.value,
            applicationName: dom.applicationName.value,
            businessPurpose: dom.businessPurpose.value,
            usersActors: dom.usersActors.value,
            frontendComponents: dom.frontendComponents.value,
            backendServices: dom.backendServices.value,
            databases: dom.databases.value,
            cacheStorage: dom.cacheStorage.value,
            externalIntegrations: dom.externalIntegrations.value,
            authenticationMethod: dom.authenticationMethod.value,
            notifications: dom.notifications.value,
            monitoringLogging: dom.monitoringLogging.value,
            businessFlow: dom.businessFlow.value
        };
    }

    function syncControls(controls) {
        const next = controls || core.getPreset(state.presetId).defaults;

        dom.detailLevel.value = next.detailLevel;
        dom.flowDepth.value = next.flowDepth;
        dom.applicationName.value = next.applicationName;
        dom.businessPurpose.value = next.businessPurpose;
        dom.usersActors.value = next.usersActors;
        dom.frontendComponents.value = next.frontendComponents;
        dom.backendServices.value = next.backendServices;
        dom.databases.value = next.databases;
        dom.cacheStorage.value = next.cacheStorage;
        dom.externalIntegrations.value = next.externalIntegrations;
        dom.authenticationMethod.value = next.authenticationMethod;
        dom.notifications.value = next.notifications;
        dom.monitoringLogging.value = next.monitoringLogging;
        dom.businessFlow.value = next.businessFlow;
    }

    function buildModelFromState() {
        state.prompt = dom.prompt.value.trim();
        state.controls = collectControls();
        state.model = core.buildModel({
            prompt: state.prompt,
            presetId: state.presetId,
            controls: state.controls
        });

        return state.model;
    }

    function pushUndoSnapshot() {
        state.undoStack.push(JSON.stringify({
            layoutOverrides: state.layoutOverrides,
            connectorOverrides: state.connectorOverrides,
            selectedIds: state.selectedIds,
            selectedConnectorId: state.selectedConnectorId,
            highlightedIds: state.highlightedIds,
            stageHighlighted: state.stageHighlighted,
            zoom: state.zoom
        }));

        if (state.undoStack.length > 30) {
            state.undoStack.shift();
        }

        updateUndoButton();
    }

    function updateUndoButton() {
        if (!dom.undoStageEdit) {
            return;
        }

        dom.undoStageEdit.disabled = state.undoStack.length === 0;
        dom.undoStageEdit.setAttribute('aria-disabled', dom.undoStageEdit.disabled ? 'true' : 'false');
    }

    function applyPreset(presetId, shouldGenerate) {
        const preset = core.getPreset(presetId);

        state.presetId = preset.id;
        dom.preset.value = preset.id;
        dom.prompt.value = preset.prompt;
        state.controls = preset.defaults;
        syncControls(preset.defaults);
        state.layoutOverrides = {};
        state.connectorOverrides = {};
        state.selectedIds = [];
        state.selectedConnectorId = '';
        state.highlightedIds = [];
        state.stageHighlighted = false;
        state.undoStack = [];
        updateUndoButton();
        if (dom.presetDescription) {
            dom.presetDescription.textContent = preset.description;
        }

        if (shouldGenerate) {
            generateArchitecture();
        } else {
            state.model = core.buildModel({
                prompt: preset.prompt,
                presetId: preset.id,
                controls: preset.defaults
            });
            renderAll();
        }
    }

    function generateArchitecture() {
        clearError();

        if (!dom.prompt.value.trim()) {
            showError('Enter a logical application architecture brief before generating.');
            return;
        }

        state.generated = true;
        state.selectedIds = [];
        state.selectedConnectorId = '';
        state.highlightedIds = [];
        state.connectorOverrides = {};
        state.stageHighlighted = false;
        buildModelFromState();
        fitGeneratedDiagramToView();
        renderAll();
    }

    function setOutputVisible(visible) {
        if (!dom.outputEmpty || !dom.outputContent) {
            return;
        }

        dom.outputEmpty.classList.toggle('d-none', visible);
        dom.outputContent.classList.toggle('d-none', !visible);
    }

    function cloneRect(item) {
        return {
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height
        };
    }

    function applyOverride(item) {
        const override = state.layoutOverrides[item.id] || {};
        const next = Object.assign({}, item);

        if (Number.isFinite(Number(override.x))) {
            next.x = Number(override.x);
        }

        if (Number.isFinite(Number(override.y))) {
            next.y = Number(override.y);
        }

        if (Number.isFinite(Number(override.width))) {
            next.width = Math.max(80, Number(override.width));
        }

        if (Number.isFinite(Number(override.height))) {
            next.height = Math.max(48, Number(override.height));
        }

        return next;
    }

    function registerItem(item) {
        itemRegistry.set(item.id, cloneRect(item));

        if (item.parent) {
            if (!childRegistry.has(item.parent)) {
                childRegistry.set(item.parent, []);
            }

            childRegistry.get(item.parent).push(item.id);
        }
    }

    function buildDiagramItems(model) {
        itemRegistry.clear();
        childRegistry.clear();

        const controls = model.controls;
        const lists = model.lists;
        const groups = [
            { id: 'flow-layer', title: 'Business Flow Banner', x: 40, y: 34, width: 1260, height: 132, kind: 'group' },
            { id: 'actor-layer', title: 'User Layer', x: 40, y: 195, width: 895, height: 116, kind: 'group' },
            { id: 'access-layer', title: 'Access Layer', x: 40, y: 338, width: 895, height: 150, kind: 'group' },
            { id: 'service-layer', title: 'Business Services', x: 40, y: 516, width: 895, height: 246, kind: 'group' },
            { id: 'data-layer', title: 'Data Platform', x: 40, y: 790, width: 895, height: 168, kind: 'group' },
            { id: 'control-panel', title: 'Cross-Cutting Services', x: 970, y: 195, width: 330, height: 300, kind: 'group' },
            { id: 'integration-panel', title: 'Integration Dock', x: 970, y: 525, width: 330, height: 433, kind: 'group' }
        ].map(applyOverride);

        function cleanId(prefix, label, index) {
            const segment = String(label || prefix)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
                .slice(0, 34) || String(index + 1);

            return prefix + '-' + segment + '-' + (index + 1);
        }

        function first(values, fallback) {
            return values && values.length ? values[0] : fallback;
        }

        function listText(values, fallback, limit) {
            const selected = (values || []).slice(0, limit || 3);

            return selected.length ? selected.join(', ') : fallback;
        }

        function listByKeyword(values, pattern, fallback, limit) {
            const selected = (values || []).filter(function (item) {
                return pattern.test(item);
            }).slice(0, limit || 2);

            return selected.length ? selected.join(', ') : fallback;
        }

        function frontendSubtitle(label, index) {
            if (/mobile|ios|android|tablet|field/i.test(label)) {
                return 'Mobile app';
            }

            if (/admin|officer|dashboard|console|backoffice/i.test(label)) {
                return 'Admin UI';
            }

            if (/api|consumer|partner|client|integration/i.test(label)) {
                return 'API client';
            }

            return index === 0 ? 'Primary UI' : 'Channel';
        }

        function iconForFrontend(label) {
            if (/mobile|ios|android|tablet|field/i.test(label)) {
                return 'mobileApp';
            }

            if (/admin|officer|dashboard|console|backoffice/i.test(label)) {
                return 'adminPortal';
            }

            if (/api|consumer|partner|client|integration/i.test(label)) {
                return 'apiConsumer';
            }

            return 'portal';
        }

        function iconForService(label) {
            if (/auth|identity|sso|login|access/i.test(label)) {
                return 'authService';
            }

            if (/user|profile|account|customer|citizen/i.test(label)) {
                return 'userService';
            }

            if (/approval|verify|verification|certificate|case|workflow/i.test(label)) {
                return 'approvalService';
            }

            if (/notify|notification|email|sms|push|whatsapp|telegram/i.test(label)) {
                return 'notificationService';
            }

            if (/report|analytics|dashboard|bi|warehouse/i.test(label)) {
                return 'reportingService';
            }

            return 'service';
        }

        function iconForData(label, fallback) {
            if (/cache|redis|memcache/i.test(label)) {
                return 'redisCache';
            }

            if (/object|file|bucket|blob|storage|document/i.test(label)) {
                return 'objectStorage';
            }

            if (/report|warehouse|analytics|lake/i.test(label)) {
                return 'dataWarehouse';
            }

            return fallback || 'database';
        }

        function iconForIntegration(label) {
            if (/payment|pay|gateway|stripe|bank/i.test(label)) {
                return 'paymentGateway';
            }

            if (/sms|text|whatsapp|telegram/i.test(label)) {
                return 'smsGateway';
            }

            if (/email|mail|smtp/i.test(label)) {
                return 'emailService';
            }

            if (/partner|crm|registry|agency|third|external|government/i.test(label)) {
                return 'partnerSystem';
            }

            return 'integration';
        }

        const flowNode = {
            id: 'business-flow',
            title: 'Business Flow',
            subtitle: controls.businessFlow,
            icon: 'flow',
            parent: 'flow-layer',
            x: 70,
            y: 82,
            width: 1200,
            height: 58,
            details: [core.flowDepthLabel(controls.flowDepth)]
        };
        const actorsNode = {
            id: 'users-actors',
            title: 'Users',
            subtitle: listText(lists.usersActors, 'Customers, admins, partners', 4),
            icon: 'actors',
            parent: 'actor-layer',
            x: 78,
            y: 238,
            width: 282,
            height: 60,
            details: ['Access source', core.detailLevelLabel(controls.detailLevel)]
        };
        const frontendNodes = (lists.frontendComponents.length ? lists.frontendComponents : ['Web Portal']).slice(0, 3).map(function (label, index) {
            return {
                id: cleanId('frontend', label, index),
                title: label,
                subtitle: frontendSubtitle(label, index),
                icon: iconForFrontend(label),
                parent: 'access-layer',
                x: 72 + (index * 184),
                y: 388,
                width: 164,
                height: 76,
                details: ['UI / consumer']
            };
        });
        const gatewayNode = {
            id: 'api-access-layer',
            title: 'API / Access Layer',
            subtitle: lists.backendServices.some(function (item) {
                return /gateway|bff|api/i.test(item);
            }) ? first(lists.backendServices.filter(function (item) {
                return /gateway|bff|api/i.test(item);
            }), 'API Gateway') : 'API Gateway / BFF',
            icon: 'gateway',
            parent: 'access-layer',
            x: 684,
            y: 380,
            width: 218,
            height: 82,
            details: ['Routing', 'Policy']
        };
        const serviceSource = lists.backendServices.length ? lists.backendServices : ['Application Service'];
        const filteredServices = serviceSource.filter(function (label) {
            return !/gateway|bff/i.test(label);
        });
        const serviceLabels = (filteredServices.length ? filteredServices : ['Application Service']).slice(0, controls.detailLevel === 'executive' ? 3 : 6);
        const serviceNodes = serviceLabels.map(function (label, index) {
            const column = index % 3;
            const row = Math.floor(index / 3);

            return {
                id: cleanId('service', label, index),
                title: label,
                subtitle: row === 0 ? 'Core capability' : 'Supporting capability',
                icon: iconForService(label),
                parent: 'service-layer',
                x: 74 + (column * 286),
                y: 566 + (row * 92),
                width: 246,
                height: 70,
                details: ['Service boundary']
            };
        });
        const databaseEntries = (lists.databases.length ? lists.databases : ['Application Database']).slice(0, 3).map(function (label, index) {
            return {
                label,
                id: cleanId('database', label, index),
                icon: iconForData(label, 'database'),
                subtitle: index === 0 ? 'Primary DB' : 'Data store',
                details: ['Persistence']
            };
        });
        const storageEntries = (lists.cacheStorage.length ? lists.cacheStorage : ['Cache / Storage']).slice(0, 2).map(function (label, index) {
            return {
                label,
                id: index === 0 ? 'cache-storage' : cleanId('storage', label, index),
                icon: iconForData(label, 'cache'),
                subtitle: /object|file|storage/i.test(label) ? 'Object store' : 'Fast access',
                details: ['Platform data']
            };
        });
        const dataNodes = databaseEntries.concat(storageEntries).slice(0, 5).map(function (entry, index) {
            return {
                id: entry.id,
                title: entry.label,
                subtitle: entry.subtitle,
                icon: entry.icon,
                parent: 'data-layer',
                x: 72 + (index * 172),
                y: 842,
                width: 156,
                height: 72,
                details: entry.details
            };
        });
        const controlNodes = [
            {
                id: 'identity-method',
                title: 'Authentication',
                subtitle: listText(lists.authenticationMethod, 'SSO / OAuth2 / MFA', 3),
                icon: 'identity',
                y: 250
            },
            {
                id: 'notifications',
                title: 'Notifications',
                subtitle: listText(lists.notifications, 'Email / SMS / Push', 3),
                icon: 'notification',
                y: 316
            },
            {
                id: 'monitoring',
                title: 'Monitoring',
                subtitle: listByKeyword(lists.monitoringLogging, /grafana|prometheus|monitor|metric|apm/i, listText(lists.monitoringLogging, 'Metrics / health', 2), 2),
                icon: 'monitoring',
                y: 382
            },
            {
                id: 'monitoring-logging',
                title: 'Logging',
                subtitle: listByKeyword(lists.monitoringLogging, /log|elk|splunk|audit|trace/i, 'Logs / audit / traces', 2),
                icon: 'logging',
                y: 448
            }
        ].map(function (item) {
            return Object.assign({
                parent: 'control-panel',
                x: 1002,
                width: 266,
                height: 50,
                details: ['Shared capability']
            }, item);
        });
        const integrationNodes = (lists.externalIntegrations.length ? lists.externalIntegrations : ['External System']).slice(0, 4).map(function (label, index) {
            return {
                id: cleanId('integration', label, index),
                title: label,
                subtitle: 'Docked dependency',
                icon: iconForIntegration(label),
                parent: 'integration-panel',
                x: 1002,
                y: 594 + (index * 72),
                width: 266,
                height: 54,
                details: []
            };
        });
        const nodes = [flowNode, actorsNode]
            .concat(frontendNodes, [gatewayNode], serviceNodes, dataNodes, controlNodes, integrationNodes)
            .map(applyOverride);

        groups.concat(nodes).forEach(registerItem);

        return {
            width: 1340,
            height: 990,
            groups,
            nodes,
            connectors: buildConnectors(nodes)
        };
    }

    function centerOf(item) {
        return {
            x: item.x + (item.width / 2),
            y: item.y + (item.height / 2)
        };
    }

    function anchorOf(item, side) {
        if (side === 'left') {
            return { x: item.x, y: item.y + (item.height / 2) };
        }

        if (side === 'right') {
            return { x: item.x + item.width, y: item.y + (item.height / 2) };
        }

        if (side === 'top') {
            return { x: item.x + (item.width / 2), y: item.y };
        }

        if (side === 'bottom') {
            return { x: item.x + (item.width / 2), y: item.y + item.height };
        }

        return centerOf(item);
    }

    function findNode(nodes, id) {
        return nodes.find(function (node) {
            return node.id === id;
        });
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, Number(value) || 0));
    }

    function snapCoordinate(value) {
        const gridSize = Math.max(1, Number(engineRuntimeConfig.movement.snap) || 1);

        return Math.round((Number(value) || 0) / gridSize) * gridSize;
    }

    function sanitizeConnectorOverrides(value) {
        const result = {};

        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return result;
        }

        Object.keys(value).forEach(function (key) {
            const override = value[key];

            if (!override || typeof override !== 'object') {
                return;
            }

            if (Number.isFinite(Number(override.x))) {
                result[key] = { x: Math.round(Number(override.x)) };
                return;
            }

            if (Number.isFinite(Number(override.y))) {
                result[key] = { y: Math.round(Number(override.y)) };
            }
        });

        return result;
    }

    function getCurrentConnectorOverrides() {
        return sanitizeConnectorOverrides(state.connectorOverrides);
    }

    function cloneLayoutOverrides(value) {
        if (engineRuntime && typeof engineRuntime.cloneLayoutOverrides === 'function') {
            return engineRuntime.cloneLayoutOverrides(value);
        }

        return JSON.parse(JSON.stringify(value || {}));
    }

    function currentViewportState() {
        return {
            zoom: state.zoom,
            scrollLeft: dom.stageCanvas ? dom.stageCanvas.scrollLeft : 0,
            scrollTop: dom.stageCanvas ? dom.stageCanvas.scrollTop : 0,
            uiHidden: Boolean(dom.stageShell && dom.stageShell.classList.contains('architecture-logical-application-stage-ui-hidden')),
            fullscreen: Boolean(dom.stageShell && (
                document.fullscreenElement === dom.stageShell ||
                dom.stageShell.classList.contains('architecture-logical-application-stage-expanded')
            )),
            diagramHighlighted: state.stageHighlighted
        };
    }

    function currentSelectionState() {
        return {
            nodeIds: state.selectedIds.slice(),
            connectorId: state.selectedConnectorId || '',
            highlightedNodeId: state.highlightedIds[0] || '',
            highlightedNodeIds: state.highlightedIds.slice()
        };
    }

    function createEngineState(value) {
        const source = value || {};
        const connectorOverrideSource = source.connectorOverrides || source.connector_overrides || state.connectorOverrides;
        const stateValue = {
            viewport: Object.assign(currentViewportState(), source.viewport || {}),
            selection: Object.assign(currentSelectionState(), source.selection || {}),
            layoutOverrides: source.layoutOverrides || source.layout_overrides || state.layoutOverrides,
            connectorOverrides: {}
        };
        let runtimeState = stateValue;

        if (engineRuntime && typeof engineRuntime.createState === 'function') {
            runtimeState = engineRuntime.createState(stateValue, engineRuntimeConfig);
        }

        runtimeState.connectorOverrides = sanitizeConnectorOverrides(connectorOverrideSource);

        return runtimeState;
    }

    function toPersistedEngineState(value) {
        const stateValue = createEngineState(value);
        let persistedState;

        if (engineRuntime && typeof engineRuntime.toPersistedState === 'function') {
            persistedState = engineRuntime.toPersistedState(Object.assign({}, stateValue, {
                connectorOverrides: {}
            }), engineRuntimeConfig);
        } else {
            persistedState = {
                viewport: {
                    zoom: stateValue.viewport.zoom,
                    scroll_left: stateValue.viewport.scrollLeft || 0,
                    scroll_top: stateValue.viewport.scrollTop || 0,
                    ui_hidden: Boolean(stateValue.viewport.uiHidden),
                    fullscreen: Boolean(stateValue.viewport.fullscreen),
                    diagram_highlighted: Boolean(stateValue.viewport.diagramHighlighted)
                },
                selection: {
                    node_ids: Array.isArray(stateValue.selection.nodeIds) ? stateValue.selection.nodeIds.slice() : [],
                    connector_id: stateValue.selection.connectorId || '',
                    highlighted_node_id: stateValue.selection.highlightedNodeId || '',
                    highlighted_node_ids: Array.isArray(stateValue.selection.highlightedNodeIds) ? stateValue.selection.highlightedNodeIds.slice() : []
                },
                layout_overrides: cloneLayoutOverrides(stateValue.layoutOverrides),
                connector_overrides: {}
            };
        }

        persistedState.connector_overrides = sanitizeConnectorOverrides(stateValue.connectorOverrides);

        return persistedState;
    }

    function restoreEngineStateFromPayload(payload, imported) {
        const source = payload || {};
        const restoredSelectedIds = getImportedSelectedIds(source, imported.selectedIds);
        const restoredHighlightedIds = getImportedHighlightedIds(source);
        const runtimeState = createEngineState({
            viewport: source.viewport || {
                zoom: imported.zoom
            },
            selection: Object.assign({
                nodeIds: restoredSelectedIds,
                connectorId: getImportedSelectedConnectorId(source),
                highlightedNodeId: restoredHighlightedIds[0] || '',
                highlightedNodeIds: restoredHighlightedIds
            }, source.selection || {}),
            layoutOverrides: imported.layoutOverrides || source.layout_overrides || source.layoutOverrides,
            connectorOverrides: source.connector_overrides || source.connectorOverrides
        });

        state.layoutOverrides = cloneLayoutOverrides(runtimeState.layoutOverrides);
        state.connectorOverrides = sanitizeConnectorOverrides(runtimeState.connectorOverrides);
        state.selectedIds = Array.isArray(runtimeState.selection.nodeIds) ? runtimeState.selection.nodeIds.slice() : [];
        state.selectedConnectorId = String(runtimeState.selection.connectorId || '');
        state.highlightedIds = Array.isArray(runtimeState.selection.highlightedNodeIds) ? runtimeState.selection.highlightedNodeIds.slice() : [];
        state.stageHighlighted = Boolean(runtimeState.viewport.diagramHighlighted);
        state.zoom = Math.min(1.8, Math.max(0.25, Number(runtimeState.viewport.zoom) || 0.58));

        if (dom.stageShell) {
            dom.stageShell.classList.toggle('architecture-logical-application-stage-ui-hidden', Boolean(runtimeState.viewport.uiHidden));
        }

        if (dom.zoomHideUi) {
            const label = dom.zoomHideUi.querySelector('span') || dom.zoomHideUi;

            label.textContent = runtimeState.viewport.uiHidden ? 'Show UI' : 'Hide UI';
        }

        return runtimeState;
    }

    function applyConnectorOverride(id, points) {
        const override = id ? state.connectorOverrides[id] : null;
        const adjusted = points.map(function (point) {
            return { x: point.x, y: point.y };
        });

        if (!override || adjusted.length < 4) {
            return adjusted;
        }

        const firstLegVertical = Math.abs(adjusted[1].x - adjusted[0].x) < 1;

        if (firstLegVertical && Number.isFinite(Number(override.y))) {
            const y = Math.round(Number(override.y));

            adjusted[1].y = y;
            adjusted[2].y = y;
        } else if (!firstLegVertical && Number.isFinite(Number(override.x))) {
            const x = Math.round(Number(override.x));

            adjusted[1].x = x;
            adjusted[2].x = x;
        }

        return adjusted;
    }

    function connectorHandlePoint(points) {
        if (points.length >= 4) {
            return {
                x: (points[1].x + points[2].x) / 2,
                y: (points[1].y + points[2].y) / 2
            };
        }

        if (points.length >= 2) {
            return {
                x: (points[0].x + points[1].x) / 2,
                y: (points[0].y + points[1].y) / 2
            };
        }

        return points[0] || { x: 0, y: 0 };
    }

    function connectorBendOrientation(points) {
        if (points.length < 4) {
            return '';
        }

        return Math.abs(points[1].x - points[0].x) < 1 ? 'horizontal-lane' : 'vertical-lane';
    }

    function pathBetween(from, to, variant, fromSide, toSide, id) {
        const start = anchorOf(from, fromSide);
        const end = anchorOf(to, toSide);
        const horizontal = fromSide === 'left' || fromSide === 'right' || toSide === 'left' || toSide === 'right';
        const midX = start.x + ((end.x - start.x) / 2);
        const midY = start.y + ((end.y - start.y) / 2);

        if (Math.abs(start.y - end.y) < 6 || Math.abs(start.x - end.x) < 6) {
            return pathFromPoints([start, end], variant, id);
        }

        return pathFromPoints(
            horizontal
                ? [
                    start,
                    { x: midX, y: start.y },
                    { x: midX, y: end.y },
                    end
                ]
                : [
                    start,
                    { x: start.x, y: midY },
                    { x: end.x, y: midY },
                    end
                ],
            variant,
            id
        );
    }

    function pathFromPoints(points, variant, id) {
        const adjustedPoints = applyConnectorOverride(id, points);
        const path = adjustedPoints.map(function (point, index) {
            const command = index === 0 ? 'M' : 'L';

            return command + ' ' + point.x + ' ' + point.y;
        }).join(' ');

        return {
            id: id || '',
            path,
            points: adjustedPoints,
            handle: connectorHandlePoint(adjustedPoints),
            orientation: connectorBendOrientation(adjustedPoints),
            variant: variant || 'traffic'
        };
    }

    function buildConnectors(nodes) {
        const actors = findNode(nodes, 'users-actors');
        const gateway = findNode(nodes, 'api-access-layer');
        const identity = findNode(nodes, 'identity-method');
        const frontendNodes = nodes.filter(function (node) {
            return node.id.indexOf('frontend-') === 0;
        });
        const serviceNodes = nodes.filter(function (node) {
            return node.id.indexOf('service-') === 0;
        });
        const dataNodes = nodes.filter(function (node) {
            return node.id.indexOf('database-') === 0 || node.id === 'cache-storage' || node.id.indexOf('storage-') === 0;
        });
        const integrationNodes = nodes.filter(function (node) {
            return node.id.indexOf('integration-') === 0;
        });
        const connectors = [];
        connectorRegistry.clear();

        function addSharedFanOut(source, targets, variant, sourceSide, targetSide, laneY, idPrefix) {
            if (!source || !targets.length) {
                return;
            }

            const start = anchorOf(source, sourceSide);

            targets.forEach(function (target) {
                const end = anchorOf(target, targetSide);

                connectors.push(pathFromPoints([
                    start,
                    { x: start.x, y: laneY },
                    { x: end.x, y: laneY },
                    end
                ], variant, idPrefix + '-to-' + target.id));
            });
        }

        addSharedFanOut(actors, frontendNodes, 'traffic', 'bottom', 'top', 326, 'users-actors');

        if (gateway) {
            frontendNodes.forEach(function (frontend, index) {
                const start = anchorOf(frontend, 'right');
                const nextFrontend = frontendNodes[index + 1];
                const end = nextFrontend
                    ? anchorOf(nextFrontend, 'left')
                    : anchorOf(gateway, 'left');
                const target = {
                    x: end.x,
                    y: start.y
                };

                connectors.push(pathFromPoints([
                    start,
                    target
                ], 'traffic', frontend.id + '-to-api-access-layer'));
            });
        }

        serviceNodes.forEach(function (service) {
            const gatewayAnchor = gateway ? anchorOf(gateway, 'bottom') : { x: 790, y: 462 };
            const serviceAnchor = anchorOf(service, 'top');
            const laneY = 504;

            connectors.push(pathFromPoints([
                gatewayAnchor,
                { x: gatewayAnchor.x, y: laneY },
                { x: serviceAnchor.x, y: laneY },
                serviceAnchor
            ], 'traffic', 'api-access-layer-to-' + service.id));
        });

        dataNodes.forEach(function (dataNode, index) {
            const service = serviceNodes[Math.min(index, Math.max(0, serviceNodes.length - 1))] || gateway;

            if (!service) {
                return;
            }

            const start = anchorOf(service, 'bottom');
            const end = anchorOf(dataNode, 'top');
            const laneY = 778;

            connectors.push(pathFromPoints([
                start,
                { x: start.x, y: laneY },
                { x: end.x, y: laneY },
                end
            ], 'storage', service.id + '-to-' + dataNode.id));
        });

        if (identity && gateway) {
            connectors.push(pathBetween(identity, gateway, 'backup', 'left', 'right', 'identity-method-to-api-access-layer'));
        }

        integrationNodes.forEach(function (integration, index) {
            const source = serviceNodes[index % Math.max(1, serviceNodes.length)] || gateway;

            if (!source) {
                return;
            }

            const start = anchorOf(source, 'right');
            const end = anchorOf(integration, 'left');
            const laneX = 952;

            connectors.push(pathFromPoints([
                start,
                { x: laneX, y: start.y },
                { x: laneX, y: end.y },
                end
            ], 'traffic', source.id + '-to-' + integration.id));
        });

        connectors.filter(Boolean).forEach(function (connector) {
            if (connector.id) {
                connectorRegistry.set(connector.id, connector);
            }
        });

        return connectors.filter(Boolean);
    }

    function diagramGroupTone(item) {
        const tones = {
            'flow-layer': 'flow',
            'actor-layer': 'actor',
            'access-layer': 'access',
            'service-layer': 'service',
            'data-layer': 'data',
            'control-panel': 'control',
            'integration-panel': 'integration'
        };

        return tones[item.id] || 'default';
    }

    function diagramNodeTone(item) {
        if (item.icon === 'database' || item.icon === 'cache') {
            return 'data';
        }

        if (item.icon === 'identity' || item.icon === 'notification' || item.icon === 'monitoring') {
            return 'control';
        }

        if (item.icon === 'integration') {
            return 'integration';
        }

        if (item.icon === 'flow') {
            return 'flow';
        }

        if (item.parent === 'access-layer') {
            return 'access';
        }

        if (item.parent === 'service-layer') {
            return 'service';
        }

        return 'actor';
    }

    function connectorTone(connector) {
        if (connector.variant === 'storage') {
            return 'storage';
        }

        if (connector.variant === 'backup') {
            return 'control';
        }

        return 'traffic';
    }

    function connectorMarkerId(tone) {
        const markerMap = {
            storage: 'architectureLogicalApplicationArrowStorage',
            control: 'architectureLogicalApplicationArrowControl',
            traffic: 'architectureLogicalApplicationArrowTraffic'
        };

        return markerMap[tone] || markerMap.traffic;
    }

    function renderGroup(item) {
        const selected = state.selectedIds.includes(item.id) ? ' is-selected' : '';
        const highlighted = item.highlighted || state.highlightedIds.includes(item.id) || state.stageHighlighted ? ' is-highlighted' : '';
        const dragging = isActiveStageItem(item.id, 'drag') ? ' is-dragging' : '';
        const resizing = isActiveStageItem(item.id, 'resize') ? ' is-resizing' : '';
        const tone = diagramGroupTone(item);
        const titleWidth = Math.min(item.width - 44, Math.max(188, (item.title.length * 8.2) + 34));
        const titleX = item.x + 22;

        return [
            '<g class="architecture-logical-application-diagram-item architecture-logical-application-diagram-group architecture-logical-application-group-tone-' + tone + selected + highlighted + dragging + resizing + '" data-item-id="' + escapeHtml(item.id) + '" data-item-kind="group">',
            renderSelectionRing(item, 22),
            '<rect class="architecture-logical-application-boundary" x="' + item.x + '" y="' + item.y + '" width="' + item.width + '" height="' + item.height + '" rx="18"></rect>',
            '<rect class="architecture-logical-application-boundary-title-pill" x="' + titleX + '" y="' + (item.y + 9) + '" width="' + titleWidth + '" height="28" rx="14"></rect>',
            '<text class="architecture-logical-application-boundary-title" x="' + (titleX + 16) + '" y="' + (item.y + 28) + '" text-anchor="start">' + escapeHtml(item.title) + '</text>',
            '<rect class="architecture-logical-application-diagram-hitbox" x="' + item.x + '" y="' + item.y + '" width="' + item.width + '" height="' + item.height + '" rx="18"></rect>',
            '<rect class="architecture-logical-application-resize-handle" data-resize-id="' + escapeHtml(item.id) + '" x="' + (item.x + item.width - 12) + '" y="' + (item.y + item.height - 12) + '" width="10" height="10" rx="2"></rect>',
            '</g>'
        ].join('');
    }

    function renderTextLines(lines, x, startY, className, maxLines, lineHeight) {
        const step = lineHeight || 17;
        const lineCount = typeof maxLines === 'number' ? Math.max(0, maxLines) : lines.length;

        return lines.slice(0, lineCount).map(function (line, index) {
            return '<text class="' + className + '" x="' + x + '" y="' + (startY + (index * step)) + '">' + escapeHtml(line) + '</text>';
        }).join('');
    }

    function visibleLineCount(startY, lineHeight, bottomY, preferredLines) {
        const availableLines = Math.floor((bottomY - startY) / lineHeight) + 1;

        return Math.max(0, Math.min(preferredLines, availableLines));
    }

    function wrapSvgLines(value, maxChars, maxLines) {
        const text = String(value || '').replace(/\s+/g, ' ').trim();
        const limit = Math.max(8, Number(maxChars) || 18);
        const requestedLines = Number(maxLines);
        const lineLimit = requestedLines <= 0 ? 0 : Math.max(1, requestedLines || 1);
        const words = text.split(' ').filter(Boolean);
        const lines = [];
        let currentLine = '';

        if (lineLimit === 0) {
            return [];
        }

        words.forEach(function (word) {
            const nextLine = currentLine === '' ? word : currentLine + ' ' + word;

            if (nextLine.length <= limit || currentLine === '') {
                currentLine = nextLine;
                return;
            }

            lines.push(currentLine);
            currentLine = word;
        });

        if (currentLine !== '') {
            lines.push(currentLine);
        }

        return lines.slice(0, lineLimit);
    }

    function renderNode(item) {
        const selected = state.selectedIds.includes(item.id) ? ' is-selected' : '';
        const highlighted = item.highlighted || state.highlightedIds.includes(item.id) || state.stageHighlighted ? ' is-highlighted' : '';
        const dragging = isActiveStageItem(item.id, 'drag') ? ' is-dragging' : '';
        const resizing = isActiveStageItem(item.id, 'resize') ? ' is-resizing' : '';
        const iconSize = item.height < 58 ? 26 : 34;
        const titleX = item.x + iconSize + 28;
        const titleY = item.y + (item.height < 66 ? 22 : 25);
        const contentBottom = item.y + item.height - 12;
        const details = item.details || [];
        const copyWidth = Math.max(60, item.width - iconSize - 46);
        const titleLineHeight = 15;
        const subtitleLineHeight = 14;
        const preferredTitleLines = item.height < 58 ? 1 : 2;
        const maxTitleLines = visibleLineCount(titleY, titleLineHeight, contentBottom, preferredTitleLines);
        const titleLines = wrapSvgLines(item.title, Math.floor(copyWidth / 6.7), maxTitleLines);
        const subtitleY = titleY + (titleLines.length * titleLineHeight) + 2;
        const preferredSubtitleLines = item.height < 54 ? 1 : 2;
        const maxSubtitleLines = visibleLineCount(subtitleY, subtitleLineHeight, contentBottom, preferredSubtitleLines);
        const subtitleLines = maxSubtitleLines > 0 ? wrapSvgLines(item.subtitle, Math.floor(copyWidth / 6.3), maxSubtitleLines) : [];
        const maxDetails = item.height < 118 ? 0 : 3;
        const tone = diagramNodeTone(item);

        return [
            '<g class="architecture-logical-application-diagram-item architecture-logical-application-node-shell architecture-logical-application-node-tone-' + tone + selected + highlighted + dragging + resizing + '" data-item-id="' + escapeHtml(item.id) + '" data-item-kind="node">',
            renderSelectionRing(item, 20),
            '<rect class="architecture-logical-application-node-card" x="' + item.x + '" y="' + item.y + '" width="' + item.width + '" height="' + item.height + '" rx="16"></rect>',
            '<rect class="architecture-logical-application-icon-box" x="' + (item.x + 14) + '" y="' + (item.y + 16) + '" width="' + iconSize + '" height="' + iconSize + '" rx="9"></rect>',
            '<image href="' + iconHref(item.icon) + '" x="' + (item.x + 20) + '" y="' + (item.y + 22) + '" width="' + (iconSize - 12) + '" height="' + (iconSize - 12) + '"></image>',
            renderTextLines(titleLines, titleX, titleY, 'architecture-logical-application-node-title', titleLines.length, 15),
            renderTextLines(subtitleLines, titleX, subtitleY, 'architecture-logical-application-node-subtitle', subtitleLines.length, 14),
            maxDetails ? renderTextLines(details, item.x + 16, item.y + item.height - 20 - ((Math.min(details.length, maxDetails) - 1) * 17), 'architecture-logical-application-node-detail', maxDetails) : '',
            '<rect class="architecture-logical-application-diagram-hitbox" x="' + item.x + '" y="' + item.y + '" width="' + item.width + '" height="' + item.height + '" rx="16"></rect>',
            '<rect class="architecture-logical-application-resize-handle" data-resize-id="' + escapeHtml(item.id) + '" x="' + (item.x + item.width - 12) + '" y="' + (item.y + item.height - 12) + '" width="10" height="10" rx="2"></rect>',
            '</g>'
        ].join('');
    }

    function renderSelectionRing(item, cornerRadius) {
        const padding = 10;

        return [
            '<rect class="architecture-logical-application-selection-ring"',
            ' x="' + (item.x - padding) + '"',
            ' y="' + (item.y - padding) + '"',
            ' width="' + (item.width + (padding * 2)) + '"',
            ' height="' + (item.height + (padding * 2)) + '"',
            ' rx="' + cornerRadius + '"></rect>'
        ].join('');
    }

    function renderConnector(connector) {
        const selected = connector.id && state.selectedConnectorId === connector.id ? ' is-selected' : '';
        const tone = connectorTone(connector);
        const className = connector.variant === 'storage'
            ? 'diagram-connector diagram-connector-active architecture-logical-application-connector architecture-logical-application-connector-storage architecture-logical-application-connector-tone-' + tone
            : (connector.variant === 'backup'
                ? 'diagram-connector diagram-connector-active architecture-logical-application-connector architecture-logical-application-connector-backup architecture-logical-application-connector-tone-' + tone
                : 'diagram-connector diagram-connector-active architecture-logical-application-connector architecture-logical-application-connector-tone-' + tone);

        return [
            '<path class="diagram-connector-hit-target architecture-logical-application-connector-hit-target" data-connector-id="' + escapeHtml(connector.id) + '" d="' + connector.path + '"></path>',
            '<path class="' + className + selected + '" data-connector-id="' + escapeHtml(connector.id) + '" d="' + connector.path + '" marker-end="url(#' + connectorMarkerId(tone) + ')"></path>'
        ].join('');
    }

    function renderConnectorHandle(connector) {
        if (!connector.id || state.selectedConnectorId !== connector.id || !connector.orientation) {
            return '';
        }

        return [
            '<circle class="diagram-connector-bend-handle architecture-logical-application-connector-bend-handle"',
            ' data-connector-handle-id="' + escapeHtml(connector.id) + '"',
            ' cx="' + connector.handle.x + '"',
            ' cy="' + connector.handle.y + '"',
            ' r="9"></circle>'
        ].join('');
    }

    function serializeCurrentSvg() {
        const svg = dom.stageCanvas.querySelector('svg');

        if (!svg) {
            currentSvgMarkup = '';
            return '';
        }

        currentSvgMarkup = new XMLSerializer().serializeToString(svg);
        return currentSvgMarkup;
    }

    function renderDiagram(model, preview) {
        const diagram = buildDiagramItems(model);
        const allGroups = diagram.groups.map(renderGroup).join('');
        const allConnectors = diagram.connectors.map(renderConnector).join('');
        const allNodes = diagram.nodes.map(renderNode).join('');
        const connectorHandles = diagram.connectors.map(renderConnectorHandle).join('');
        const overlay = preview ? [
            '<div class="architecture-logical-application-stage-preview-overlay" role="status">',
            '<div class="architecture-logical-application-stage-preview-panel">',
            '<span class="architecture-logical-application-stage-preview-icon"><i class="bi bi-stars" aria-hidden="true"></i></span>',
            '<strong>Choose a preset to generate diagram</strong>',
            '<span>Pick a preset or click Generate Diagram to create the editable workspace.</span>',
            '</div>',
            '</div>'
        ].join('') : '';

        dom.stageCanvas.classList.toggle('architecture-logical-application-stage-preview', Boolean(preview));
        const scaledWidth = Math.ceil(diagram.width * state.zoom);
        const scaledHeight = Math.ceil(diagram.height * state.zoom);

        dom.stageCanvas.style.width = '100%';
        dom.stageCanvas.style.height = Math.max(620, scaledHeight + 48) + 'px';
        dom.stageCanvas.innerHTML = [
            '<svg class="architecture-logical-application-diagram" xmlns="http://www.w3.org/2000/svg" width="' + scaledWidth + '" height="' + scaledHeight + '" viewBox="0 0 ' + diagram.width + ' ' + diagram.height + '">',
            '<defs>',
            '<marker id="architectureLogicalApplicationArrowTraffic" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L11,5.5 L0,11 z" fill="#111827"></path></marker>',
            '<marker id="architectureLogicalApplicationArrowStorage" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L11,5.5 L0,11 z" fill="#111827"></path></marker>',
            '<marker id="architectureLogicalApplicationArrowControl" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L11,5.5 L0,11 z" fill="#111827"></path></marker>',
            '</defs>',
            '<rect class="architecture-logical-application-diagram-background" x="0" y="0" width="' + diagram.width + '" height="' + diagram.height + '" fill="transparent"></rect>',
            allGroups,
            allConnectors,
            allNodes,
            connectorHandles,
            '</svg>',
            overlay
        ].join('');
        serializeCurrentSvg();
        bindStageEvents();
    }

    function renderStageMeta(model) {
        dom.stageTitle.textContent = model.title;
        dom.stageSubtitle.innerHTML = '<span class="architecture-logical-application-stage-preset-chip">' + escapeHtml(model.presetLabel) + ' preset</span>';
        dom.stageMeta.innerHTML = model.stageMeta.map(function (item) {
            return [
                '<span class="architecture-logical-application-score-tag architecture-logical-application-score-tag-' + escapeHtml(item.tone) + '">',
                '<i class="' + escapeHtml(item.icon) + '" aria-hidden="true"></i>',
                escapeHtml(item.label),
                '</span>'
            ].join('');
        }).join('');
    }

    function setSortMode(sortMode) {
        const labels = {
            id: 'ID',
            alphabetical: 'A-Z',
            component: 'Component',
            placement: 'Placement',
            purpose: 'Purpose'
        };

        state.sortMode = labels[sortMode] ? sortMode : 'id';

        if (dom.sort) {
            dom.sort.value = state.sortMode;
        }

        if (dom.inventorySortSummary) {
            dom.inventorySortSummary.textContent = labels[state.sortMode];
        }

        if (dom.sortOptions) {
            dom.sortOptions.forEach(function (button) {
                const active = button.getAttribute('data-sort-value') === state.sortMode;

                button.classList.toggle('is-active', active);
                button.setAttribute('aria-pressed', String(active));
            });
        }

        if (dom.inventorySortSelect) {
            setSortMenuOpen(false);
        }
    }

    function setSortMenuOpen(open) {
        if (!dom.inventorySortSelect || !dom.inventorySortMenu) {
            return;
        }

        if (dom.inventorySortSelect.tagName === 'DETAILS') {
            const summary = dom.inventorySortSelect.querySelector('summary');

            dom.inventorySortSelect.toggleAttribute('open', Boolean(open));
            if (summary) {
                summary.setAttribute('aria-expanded', String(Boolean(open)));
            }
            return;
        }

        dom.inventorySortSelect.setAttribute('aria-expanded', String(Boolean(open)));
        dom.inventorySortMenu.hidden = !open;
    }

    function sortedInventory(model) {
        const rows = model.inventory.slice();
        const fieldMap = {
            alphabetical: 'component',
            component: 'component',
            placement: 'placement',
            purpose: 'purpose'
        };
        const field = fieldMap[state.sortMode];

        if (!field) {
            return rows.sort(function (a, b) {
                return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
            });
        }

        return rows.sort(function (a, b) {
            return String(a[field]).localeCompare(String(b[field]));
        });
    }

    function getInventoryColumnValue(row, fallbackIndex, column) {
        if (column === 'index') {
            return row.id || fallbackIndex + 1;
        }

        if (column === 'component') {
            return row.component || '';
        }

        if (column === 'placement') {
            return row.placement || '';
        }

        if (column === 'purpose') {
            return row.purpose || '';
        }

        return '';
    }

    function buildInventoryRowText(row, fallbackIndex) {
        return ['index', 'component', 'placement', 'purpose'].map(function (column) {
            return inventoryColumnLabels[column] + ': ' + getInventoryColumnValue(row, fallbackIndex, column);
        }).join('\n');
    }

    function buildInventoryCopyText(rowIndex) {
        if (!state.model || !Array.isArray(state.model.inventory)) {
            return '';
        }

        const rows = sortedInventory(state.model);
        const row = rows[rowIndex];

        if (!row) {
            return '';
        }

        return buildInventoryRowText(row, rowIndex);
    }

    function flashInventoryCopyButton(button) {
        const icon = button.querySelector('i');
        const originalIcon = button.dataset.defaultIcon || (icon ? icon.className : '');

        if (icon && !button.dataset.defaultIcon) {
            button.dataset.defaultIcon = originalIcon;
        }

        button.classList.add('copied', 'is-copied');
        if (icon) {
            icon.className = 'bi bi-check2';
        }

        window.setTimeout(function () {
            button.classList.remove('copied', 'is-copied', 'failed');
            if (icon && button.dataset.defaultIcon) {
                icon.className = button.dataset.defaultIcon;
            }
        }, 1400);
    }

    async function copyInventoryRow(rowIndex, button) {
        const normalizedRowIndex = Number.parseInt(rowIndex, 10);

        if (!Number.isInteger(normalizedRowIndex) || normalizedRowIndex < 0) {
            return;
        }

        const copyText = buildInventoryCopyText(normalizedRowIndex);

        if (copyText === '') {
            return;
        }

        if (await writeClipboardText(copyText)) {
            flashInventoryCopyButton(button);
            return;
        }

        showError('Failed to copy the inventory row to the clipboard.');
    }

    function renderInventory(model) {
        dom.inventoryTableBody.innerHTML = sortedInventory(model).map(function (row, index) {
            return [
                '<tr>',
                '<td>' + escapeHtml(row.id) + '</td>',
                '<td>' + escapeHtml(row.component) + '</td>',
                '<td>' + escapeHtml(row.placement) + '</td>',
                '<td>' + escapeHtml(row.purpose) + '</td>',
                '<td class="architecture-logical-application-table-action-cell tool-table-action-cell">',
                '<button type="button" class="architecture-logical-application-row-copy" data-inventory-copy-row="' + escapeHtml(index) + '" aria-label="Copy inventory row ' + escapeHtml(row.id || index + 1) + '" title="Copy inventory row">',
                '<i class="bi bi-clipboard" aria-hidden="true"></i>',
                '</button>',
                '</td>',
                '</tr>'
            ].join('');
        }).join('');
        dom.routingTableBody.innerHTML = model.routeRows.map(function (row) {
            return renderSectionTableRow(row);
        }).join('');
        dom.controlTableBody.innerHTML = model.controlRows.map(function (row) {
            return renderSectionTableRow(row);
        }).join('');
    }

    function renderSectionTableRow(row) {
        return [
            '<tr>',
            '<th scope="row" class="architecture-logical-application-section-key">',
            '<span>' + escapeHtml(row[0]) + '</span>',
            '</th>',
            '<td class="architecture-logical-application-section-value">',
            '<span class="architecture-logical-application-section-value-text">' + escapeHtml(row[1]) + '</span>',
            '</td>',
            '</tr>'
        ].join('');
    }

    function renderList(element, rows, fallback) {
        const values = rows && rows.length ? rows : [fallback || 'No notes generated.'];

        element.innerHTML = values.map(function (row) {
            return '<li>' + escapeHtml(row) + '</li>';
        }).join('');
    }

    function renderNotes(model) {
        dom.promptSummary.textContent = model.promptSummary;
        renderList(dom.keywordList, model.matchedKeywords, 'No explicit application architecture keywords detected.');
        renderList(dom.assumptionList, model.assumptions, 'No parser assumptions were needed beyond current controls.');
        renderList(dom.modelList, model.modelList, 'Model details unavailable.');
        renderList(dom.prosList, model.pros, 'No generated strengths.');
        renderList(dom.consList, model.cons, 'Review application ownership, data, identity, and operational details before implementation.');
    }

    function renderPillars(model) {
        dom.pillarBreakdown.innerHTML = [
            '<h3 class="architecture-logical-application-result-section-title">Pillar Breakdown</h3>',
            '<div class="architecture-logical-application-pillar-list">',
            model.pillars.map(function (pillar) {
                return [
                    '<div class="architecture-logical-application-pillar-row architecture-logical-application-pillar-row-' + escapeHtml(pillar.tone) + '">',
                    '<span class="architecture-logical-application-pillar-icon"><i class="' + escapeHtml(pillar.icon) + '" aria-hidden="true"></i></span>',
                    '<span class="architecture-logical-application-pillar-name">' + escapeHtml(pillar.label) + '</span>',
                    '<span class="architecture-logical-application-pillar-meter" aria-hidden="true"><span style="--pillar-score: ' + escapeHtml(String(pillar.score)) + '%;"></span></span>',
                    '<span class="architecture-logical-application-pillar-score"><strong>' + escapeHtml(String(pillar.score)) + '</strong> /100</span>',
                    '</div>'
                ].join('');
            }).join(''),
            '</div>'
        ].join('');
    }

    function renderRisk(model) {
        const risk = model.risk;

        dom.riskLevel.className = 'architecture-logical-application-assessment-card architecture-logical-application-risk-card architecture-logical-application-risk-card-' + risk.tone;
        dom.riskLevel.innerHTML = [
            '<h3 class="architecture-logical-application-result-section-title">Risk Level</h3>',
            '<div class="architecture-logical-application-risk-body">',
            '<div class="architecture-logical-application-risk-icon"><i class="' + escapeHtml(risk.icon) + '" aria-hidden="true"></i></div>',
            '<div class="architecture-logical-application-risk-copy">',
            '<div class="architecture-logical-application-risk-level">' + escapeHtml(risk.level) + '</div>',
            '<p>' + escapeHtml(risk.summary) + '</p>',
            '<ul>',
            risk.reviewPoints.map(function (point) {
                return '<li>' + escapeHtml(point) + '</li>';
            }).join(''),
            '</ul>',
            '</div>',
            '</div>'
        ].join('');
    }

    function getScoreTone(score) {
        if (score >= 86) {
            return 'strong';
        }

        if (score >= 70) {
            return 'review';
        }

        return 'incomplete';
    }

    function getScoreLabel(tone) {
        const labels = {
            strong: 'Strong planning model',
            review: 'Review-ready planning model',
            incomplete: 'Incomplete planning model'
        };

        return labels[tone] || labels.review;
    }

    function getScoreIcon(tone) {
        const icons = {
            strong: 'bi bi-check-circle-fill',
            review: 'bi bi-activity',
            incomplete: 'bi bi-exclamation-triangle-fill'
        };

        return icons[tone] || icons.review;
    }

    function getScoreRingTone(tone) {
        const tones = {
            strong: 'production',
            review: 'ready',
            incomplete: 'review'
        };

        return tones[tone] || tones.review;
    }

    function renderScore(model) {
        const score = Math.max(0, Math.min(100, Number(model.score) || 0));
        const tone = getScoreTone(score);
        const ringTone = getScoreRingTone(tone);
        const resultTone = {
            strong: 'success',
            review: 'ready',
            incomplete: 'need-work'
        }[tone] || 'need-work';
        const progressAngle = Math.round(Math.max(0, Math.min(100, score)) * 3.6);

        dom.outputStatus.className = 'architecture-logical-application-score-card architecture-logical-application-result-summary';
        dom.outputStatus.dataset.resultTone = resultTone;
        dom.outputStatus.dataset.resultLayout = 'architecture_score';
        dom.outputStatus.innerHTML = [
            '<div class="architecture-logical-application-result-hero-grid" aria-live="polite">',
            '<article class="architecture-logical-application-result-card architecture-logical-application-result-card-main">',
            '<span class="architecture-logical-application-result-kicker">Architecture score</span>',
            '<h3 class="architecture-logical-application-result-title">' + escapeHtml(getScoreLabel(tone)) + '</h3>',
            '<p class="architecture-logical-application-result-copy">Advisory score only. Review service ownership, data contracts, access policy, failure paths, and operations before implementation.</p>',
            '<div class="architecture-logical-application-result-chip-row" aria-label="Architecture score state">',
            '<span class="architecture-logical-application-result-chip architecture-logical-application-result-chip-' + resultTone + '"><span class="architecture-logical-application-result-chip-icon"><i class="' + getScoreIcon(tone) + '" aria-hidden="true"></i></span>' + escapeHtml(getScoreLabel(tone)) + '</span>',
            '<span class="architecture-logical-application-result-chip architecture-logical-application-result-chip-baseline"><span class="architecture-logical-application-result-chip-icon"><i class="bi bi-boxes" aria-hidden="true"></i></span>' + escapeHtml(String(model.inventory.length)) + ' components</span>',
            '<span class="architecture-logical-application-result-chip architecture-logical-application-result-chip-baseline"><span class="architecture-logical-application-result-chip-icon"><i class="bi bi-diagram-3" aria-hidden="true"></i></span>' + escapeHtml(core.detailLevelLabel(model.controls.detailLevel)) + '</span>',
            '<span class="architecture-logical-application-result-chip architecture-logical-application-result-chip-baseline"><span class="architecture-logical-application-result-chip-icon"><i class="bi bi-signpost-split" aria-hidden="true"></i></span>' + escapeHtml(core.flowDepthLabel(model.controls.flowDepth)) + '</span>',
            '</div>',
            '</article>',
            '<article class="architecture-logical-application-result-card architecture-logical-application-result-card-visual">',
            '<div class="architecture-logical-application-result-ring architecture-logical-application-score-value architecture-logical-application-score-ring-card-' + ringTone + '" id="architectureLogicalApplicationScoreValue" style="--architecture-logical-application-result-progress: ' + progressAngle + 'deg; --progress-angle: ' + progressAngle + 'deg;" aria-label="Architecture score ' + score + ' out of 100">',
            '<div class="architecture-logical-application-score-echart" id="architectureLogicalApplicationScoreEchart" aria-hidden="true"></div>',
            '<div class="architecture-logical-application-result-ring-center architecture-logical-application-score-center">',
            '<span class="architecture-logical-application-result-ring-value architecture-logical-application-score-value-number">' + score + '</span>',
            '<span class="architecture-logical-application-result-ring-unit architecture-logical-application-score-caption">/100</span>',
            '</div>',
            '</div>',
            '<div class="architecture-logical-application-result-visual-copy">',
            '<span class="architecture-logical-application-result-kicker">Primary result</span>',
            '<h3 class="architecture-logical-application-result-title architecture-logical-application-result-title-center">' + escapeHtml(getScoreLabel(tone)) + '</h3>',
            '</div>',
            '</article>',
            '</div>',
            '<div class="architecture-logical-application-result-metric-grid" aria-label="Architecture metrics">',
            '<article class="architecture-logical-application-result-metric-card"><span class="architecture-logical-application-result-metric-label">Actors</span><strong class="architecture-logical-application-result-metric-value">' + escapeHtml(String(model.lists.usersActors.length)) + '</strong><span class="architecture-logical-application-result-metric-copy">Modeled users and external actors.</span></article>',
            '<article class="architecture-logical-application-result-metric-card"><span class="architecture-logical-application-result-metric-label">Services</span><strong class="architecture-logical-application-result-metric-value">' + escapeHtml(String(model.lists.backendServices.length)) + '</strong><span class="architecture-logical-application-result-metric-copy">Application service boundaries.</span></article>',
            '<article class="architecture-logical-application-result-metric-card"><span class="architecture-logical-application-result-metric-label">Data stores</span><strong class="architecture-logical-application-result-metric-value">' + escapeHtml(String(model.lists.databases.length + model.lists.cacheStorage.length)) + '</strong><span class="architecture-logical-application-result-metric-copy">Database, cache, and storage nodes.</span></article>',
            '<article class="architecture-logical-application-result-metric-card"><span class="architecture-logical-application-result-metric-label">Integrations</span><strong class="architecture-logical-application-result-metric-value">' + escapeHtml(String(model.lists.externalIntegrations.length)) + '</strong><span class="architecture-logical-application-result-metric-copy">External systems and channels.</span></article>',
            '</div>'
        ].join('');
    }

    function buildPayload() {
        state.currentPayload = core.buildExportPayload({
            prompt: state.prompt,
            presetId: state.presetId,
            controls: state.controls,
            layoutOverrides: state.layoutOverrides,
            selectedIds: state.selectedIds,
            zoom: state.zoom
        });

        const persistedState = toPersistedEngineState({
            layoutOverrides: state.layoutOverrides,
            connectorOverrides: state.connectorOverrides
        });
        const selectedIds = Array.isArray(persistedState.selection.node_ids)
            ? persistedState.selection.node_ids.slice()
            : [];
        const highlightedIds = Array.isArray(persistedState.selection.highlighted_node_ids)
            ? persistedState.selection.highlighted_node_ids.slice()
            : [];

        state.currentPayload.viewport = persistedState.viewport;
        state.currentPayload.selection = persistedState.selection;
        state.currentPayload.layout_overrides = cloneLayoutOverrides(persistedState.layout_overrides);
        state.currentPayload.layoutOverrides = cloneLayoutOverrides(persistedState.layout_overrides);
        state.currentPayload.connector_overrides = sanitizeConnectorOverrides(persistedState.connector_overrides);
        state.currentPayload.connectorOverrides = sanitizeConnectorOverrides(persistedState.connector_overrides);
        state.currentPayload.selected_node_id = selectedIds[0] || '';
        state.currentPayload.selected_node_ids = selectedIds.slice();
        state.currentPayload.selected_ids = selectedIds.slice();
        state.currentPayload.selected_connector_id = persistedState.selection.connector_id || '';
        state.currentPayload.highlighted_node_id = highlightedIds[0] || '';
        state.currentPayload.highlighted_node_ids = highlightedIds.slice();
        state.currentPayload.zoom = persistedState.viewport.zoom;

        return state.currentPayload;
    }

    function normalizeImportedStringArray(value) {
        if (Array.isArray(value)) {
            return value.filter(function (item, index, list) {
                return typeof item === 'string' && item && list.indexOf(item) === index;
            });
        }

        return [];
    }

    function readImportedVisualIds(payload, arrayKeys, scalarKeys) {
        const sources = [
            payload || {},
            payload && payload.selection && typeof payload.selection === 'object' ? payload.selection : {}
        ];
        let ids = [];

        sources.some(function (source) {
            arrayKeys.some(function (key) {
                ids = normalizeImportedStringArray(source[key]);

                return ids.length > 0;
            });

            scalarKeys.forEach(function (key) {
                if (typeof source[key] === 'string' && source[key] && !ids.includes(source[key])) {
                    ids.push(source[key]);
                }
            });

            return ids.length > 0;
        });

        return ids;
    }

    function getImportedSelectedIds(payload, importedSelectedIds) {
        const visualIds = readImportedVisualIds(payload, ['selected_node_ids', 'selectedNodeIds', 'node_ids', 'nodeIds'], ['selected_node_id', 'selectedNodeId', 'node_id', 'nodeId']);

        return visualIds.length ? visualIds : normalizeImportedStringArray(importedSelectedIds);
    }

    function getImportedHighlightedIds(payload) {
        return readImportedVisualIds(payload, ['highlighted_node_ids', 'highlightedNodeIds'], ['highlighted_node_id', 'highlightedNodeId']);
    }

    function getImportedSelectedConnectorId(payload) {
        const sources = [
            payload || {},
            payload && payload.selection && typeof payload.selection === 'object' ? payload.selection : {}
        ];
        const selectedConnectorIdKeys = ['selected_connector_id', 'selectedConnectorId', 'connector_id', 'connectorId'];

        for (let sourceIndex = 0; sourceIndex < sources.length; sourceIndex += 1) {
            const source = sources[sourceIndex];
            const selectedConnectorIdKey = selectedConnectorIdKeys.find(function (key) {
                return typeof source[key] === 'string' && source[key].trim() !== '';
            });

            if (selectedConnectorIdKey) {
                return source[selectedConnectorIdKey].trim();
            }
        }

        return '';
    }

    function highlightJson(value) {
        const json = JSON.stringify(value, null, 2);
        const tokenPattern = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"\s*:?)|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?/g;
        let lastIndex = 0;
        let output = '';
        let matchResult = tokenPattern.exec(json);

        while (matchResult !== null) {
            const match = matchResult[0];

            output += escapeHtml(json.slice(lastIndex, matchResult.index));

            if (/^"/.test(match)) {
                output += /:$/.test(match)
                    ? '<span class="json-key tool-json-key">' + escapeHtml(match) + '</span>'
                    : '<span class="json-string tool-json-string">' + escapeHtml(match) + '</span>';
            } else if (/true|false/.test(match)) {
                output += '<span class="json-boolean tool-json-boolean">' + escapeHtml(match) + '</span>';
            } else if (/null/.test(match)) {
                output += '<span class="json-null tool-json-null">' + escapeHtml(match) + '</span>';
            } else {
                output += '<span class="json-number tool-json-number">' + escapeHtml(match) + '</span>';
            }

            lastIndex = tokenPattern.lastIndex;
            matchResult = tokenPattern.exec(json);
        }

        output += escapeHtml(json.slice(lastIndex));

        return output;
    }

    function renderJson() {
        dom.jsonOutput.innerHTML = highlightJson(buildPayload());
    }

    function renderOutput(model) {
        setOutputVisible(state.generated);

        if (!state.generated) {
            return;
        }

        renderScore(model);
        normalizeInfraStackResultSummary('architecture-logical-application');
        renderInventory(model);
        renderNotes(model);
        renderPillars(model);
        renderRisk(model);
        renderJson();
    }

    function renderSelectedUi() {
        if (!state.selectedIds.length) {
            dom.selectedEmpty.classList.remove('d-none');
            dom.selectedEditor.classList.add('d-none');
            return;
        }

        const id = state.selectedIds[0];
        const item = itemRegistry.get(id);

        if (!item || state.selectedIds.length > 1) {
            dom.selectedEmpty.classList.add('d-none');
            dom.selectedEditor.classList.remove('d-none');
            dom.selectedName.textContent = state.selectedIds.length + ' items selected';
            [dom.selectedX, dom.selectedY, dom.selectedWidth, dom.selectedHeight].forEach(function (input) {
                input.value = '';
                input.disabled = true;
            });
            return;
        }

        dom.selectedEmpty.classList.add('d-none');
        dom.selectedEditor.classList.remove('d-none');
        dom.selectedName.textContent = id.replace(/-/g, ' ');
        dom.selectedX.disabled = false;
        dom.selectedY.disabled = false;
        dom.selectedWidth.disabled = false;
        dom.selectedHeight.disabled = false;
        dom.selectedX.value = Math.round(item.x);
        dom.selectedY.value = Math.round(item.y);
        dom.selectedWidth.value = Math.round(item.width);
        dom.selectedHeight.value = Math.round(item.height);
    }

    function renderAll() {
        const model = state.model || buildModelFromState();

        renderStageMeta(model);
        renderDiagram(model, !state.generated);
        renderOutput(model);
        renderSelectedUi();
        updateZoomInput();
        updateUndoButton();
        updateHighlightAllButton();
    }

    function scheduleRenderAll() {
        if (renderFrameId !== 0) {
            return;
        }

        renderFrameId = window.requestAnimationFrame(function () {
            renderFrameId = 0;
            renderAll();
        });
    }

    function updateZoomInput() {
        dom.zoomInput.value = String(Math.round(state.zoom * 100));
    }

    function fitGeneratedDiagramToView() {
        const model = state.model || buildModelFromState();
        const diagram = buildDiagramItems(model);
        const stageBody = dom.stageCanvas ? dom.stageCanvas.parentElement : null;
        const stageRect = stageBody ? stageBody.getBoundingClientRect() : { width: 0 };
        const availableWidth = Math.max(0, stageRect.width - 96);

        if (!availableWidth || !diagram.width) {
            state.zoom = Math.min(state.zoom, 0.58);
            return;
        }

        state.zoom = Math.max(0.48, Math.min(0.58, availableWidth / diagram.width));
    }

    function setZoom(nextZoom) {
        state.zoom = Math.min(1.8, Math.max(0.25, Number(nextZoom) || 1));
        renderAll();
    }

    function setStageZoomToFit(options) {
        const fitOptions = options || {};
        const stageCanvas = dom.stageCanvas;
        const svg = stageCanvas.querySelector('svg');

        if (!svg) {
            return;
        }

        if (stageCanvas.clientWidth <= 0 || stageCanvas.clientHeight <= 0) {
            if (fitOptions.defer !== false && typeof window.requestAnimationFrame === 'function') {
                window.requestAnimationFrame(function () {
                    setStageZoomToFit(Object.assign({}, fitOptions, {
                        defer: false
                    }));
                });
            }

            return;
        }

        const stageRect = stageCanvas.parentElement.getBoundingClientRect();
        const width = svg.viewBox && svg.viewBox.baseVal ? Number(svg.viewBox.baseVal.width) : 1240;
        const nextZoom = Math.max(0.25, Math.min(1.2, (stageRect.width - 64) / width));

        setZoom(nextZoom);
    }

    function fitToView() {
        setStageZoomToFit({
            behavior: 'smooth'
        });
    }

    function isInputTarget(target) {
        return Boolean(target.closest('input, textarea, select, button, summary, a[href], [contenteditable="true"]'));
    }

    function getSvgPoint(event) {
        const svg = dom.stageCanvas.querySelector('svg');
        const point = svg.createSVGPoint();
        const matrix = svg.getScreenCTM();

        point.x = event.clientX;
        point.y = event.clientY;

        if (!matrix) {
            return { x: 0, y: 0 };
        }

        return point.matrixTransform(matrix.inverse());
    }

    function getStageCanvasPoint(event) {
        const rect = dom.stageCanvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left + dom.stageCanvas.scrollLeft,
            y: event.clientY - rect.top + dom.stageCanvas.scrollTop
        };
    }

    function updateMarqueeOverlay(element, rect) {
        element.style.left = Math.round(rect.x) + 'px';
        element.style.top = Math.round(rect.y) + 'px';
        element.style.width = Math.round(rect.width) + 'px';
        element.style.height = Math.round(rect.height) + 'px';
    }

    function safelySetPointerCapture(element, pointerId) {
        if (!element || typeof element.setPointerCapture !== 'function') {
            return;
        }

        try {
            element.setPointerCapture(pointerId);
        } catch (error) {
            return;
        }
    }

    function safelyReleasePointerCapture(element, pointerId) {
        if (!element || typeof element.releasePointerCapture !== 'function') {
            return;
        }

        try {
            if (typeof element.hasPointerCapture !== 'function' || element.hasPointerCapture(pointerId)) {
                element.releasePointerCapture(pointerId);
            }
        } catch (error) {
            return;
        }
    }

    function getMoveIds(targetId) {
        const ids = state.selectedIds.includes(targetId) ? state.selectedIds.slice() : [targetId];
        const expanded = new Set(ids);

        ids.forEach(function (id) {
            (childRegistry.get(id) || []).forEach(function (childId) {
                expanded.add(childId);
            });
        });

        return Array.from(expanded);
    }

    function getSelectedMoveIds() {
        const expanded = new Set();

        state.selectedIds.forEach(function (id) {
            getMoveIds(id).forEach(function (moveId) {
                expanded.add(moveId);
            });
        });

        return Array.from(expanded);
    }

    function paintSelectionClasses() {
        all('.architecture-logical-application-diagram-item', dom.stageCanvas).forEach(function (item) {
            item.classList.toggle('is-selected', state.selectedIds.includes(item.getAttribute('data-item-id')));
            item.classList.toggle('is-highlighted', state.highlightedIds.includes(item.getAttribute('data-item-id')));
        });
    }

    function paintMarqueeTargetClasses(ids) {
        const targetIds = new Set(ids || []);

        all('.architecture-logical-application-diagram-item', dom.stageCanvas).forEach(function (item) {
            item.classList.toggle('is-marquee-target', targetIds.has(item.getAttribute('data-item-id')));
        });
    }

    function paintConnectorSelectionClasses() {
        all('.architecture-logical-application-connector', dom.stageCanvas).forEach(function (connector) {
            connector.classList.toggle('is-selected', state.selectedConnectorId === connector.getAttribute('data-connector-id'));
        });

        if (!state.selectedConnectorId) {
            all('.architecture-logical-application-connector-bend-handle', dom.stageCanvas).forEach(function (handle) {
                handle.remove();
            });
        }
    }

    function setActiveStageInteraction(type, ids) {
        activeStageInteraction = {
            type: type || '',
            ids: Array.isArray(ids) ? ids.slice() : []
        };

        if (!dom.stageCanvas) {
            return;
        }

        dom.stageCanvas.classList.toggle('is-dragging', activeStageInteraction.type === 'drag');
        dom.stageCanvas.classList.toggle('is-resizing', activeStageInteraction.type === 'resize');
        dom.stageCanvas.classList.toggle('is-adjusting-connector', activeStageInteraction.type === 'connector');
        dom.stageCanvas.classList.toggle('is-marquee-selecting', activeStageInteraction.type === 'marquee');
    }

    function isActiveStageItem(id, type) {
        return activeStageInteraction.type === type && activeStageInteraction.ids.includes(id);
    }

    function selectIds(ids) {
        state.selectedConnectorId = '';
        state.selectedIds = ids.filter(function (id, index, list) {
            return Boolean(itemRegistry.has(id)) && list.indexOf(id) === index;
        });
        renderSelectedUi();
        paintSelectionClasses();
        paintConnectorSelectionClasses();

        if (state.generated && dom.jsonOutput) {
            renderJson();
        }
    }

    function selectConnector(id) {
        state.selectedConnectorId = connectorRegistry.has(id) ? id : '';
        state.selectedIds = [];
        state.highlightedIds = [];
        renderAll();
    }

    function toggleSelect(id) {
        if (state.selectedIds.includes(id)) {
            selectIds(state.selectedIds.filter(function (item) {
                return item !== id;
            }));
        } else {
            selectIds(state.selectedIds.concat(id));
        }
    }

    function startDrag(event, id) {
        const start = getSvgPoint(event);
        const ids = getMoveIds(id);
        const startRects = {};

        ids.forEach(function (itemId) {
            const rect = itemRegistry.get(itemId);

            if (rect) {
                startRects[itemId] = cloneRect(rect);
            }
        });

        dragState = {
            start,
            ids,
            startRects,
            undoCaptured: false
        };
        setActiveStageInteraction('drag', ids);
        event.preventDefault();
    }

    function startResize(event, id) {
        const start = getSvgPoint(event);
        const rect = itemRegistry.get(id);

        if (!rect) {
            return;
        }

        resizeState = {
            id,
            start,
            startRect: cloneRect(rect),
            undoCaptured: false
        };
        setActiveStageInteraction('resize', [id]);
        event.preventDefault();
        event.stopPropagation();
    }

    function startMarquee(event) {
        const point = getSvgPoint(event);
        const canvasPoint = getStageCanvasPoint(event);

        marqueeState = {
            start: point,
            current: point,
            startCanvas: canvasPoint,
            currentCanvas: canvasPoint,
            targetIds: []
        };
        state.selectedConnectorId = '';
        setActiveStageInteraction('marquee', []);
        event.preventDefault();
    }

    function startConnectorBend(event, id) {
        const connector = connectorRegistry.get(id);

        if (!connector || !connector.orientation) {
            return;
        }

        connectorBendState = {
            id,
            orientation: connector.orientation,
            undoCaptured: false
        };
        state.selectedConnectorId = id;
        state.selectedIds = [];
        setActiveStageInteraction('connector', [id]);
        event.preventDefault();
        event.stopPropagation();
    }

    function updateLayoutOverride(id, rect) {
        state.layoutOverrides[id] = {
            x: snapCoordinate(rect.x),
            y: snapCoordinate(rect.y),
            width: snapCoordinate(rect.width),
            height: snapCoordinate(rect.height)
        };
    }

    function updateConnectorOverride(id, point, orientation) {
        const svg = dom.stageCanvas.querySelector('svg');
        const box = svg && svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : { width: 1240, height: 960 };

        if (orientation === 'horizontal-lane') {
            state.connectorOverrides[id] = {
                y: snapCoordinate(clamp(point.y, 24, box.height - 24))
            };
            return;
        }

        state.connectorOverrides[id] = {
            x: snapCoordinate(clamp(point.x, 24, box.width - 24))
        };
    }

    function handlePointerMove(event) {
        if (connectorBendState) {
            const point = getSvgPoint(event);

            if (!connectorBendState.undoCaptured) {
                pushUndoSnapshot();
                connectorBendState.undoCaptured = true;
            }

            updateConnectorOverride(connectorBendState.id, point, connectorBendState.orientation);
            scheduleRenderAll();
            return;
        }

        if (dragState) {
            const point = getSvgPoint(event);
            const dx = point.x - dragState.start.x;
            const dy = point.y - dragState.start.y;

            if (!dragState.undoCaptured) {
                pushUndoSnapshot();
                dragState.undoCaptured = true;
            }

            dragState.ids.forEach(function (id) {
                const rect = dragState.startRects[id];

                if (!rect) {
                    return;
                }

                updateLayoutOverride(id, Object.assign({}, rect, {
                    x: rect.x + dx,
                    y: rect.y + dy
                }));
            });

            scheduleRenderAll();
            return;
        }

        if (resizeState) {
            const point = getSvgPoint(event);
            const width = Math.max(80, resizeState.startRect.width + (point.x - resizeState.start.x));
            const height = Math.max(48, resizeState.startRect.height + (point.y - resizeState.start.y));

            if (!resizeState.undoCaptured) {
                pushUndoSnapshot();
                resizeState.undoCaptured = true;
            }

            updateLayoutOverride(resizeState.id, Object.assign({}, resizeState.startRect, {
                width,
                height
            }));
            scheduleRenderAll();
            return;
        }

        if (marqueeState) {
            marqueeState.current = getSvgPoint(event);
            marqueeState.currentCanvas = getStageCanvasPoint(event);
            renderMarquee();
        }
    }

    function buildMarqueeRect(startPoint, currentPoint) {
        return {
            x: Math.min(startPoint.x, currentPoint.x),
            y: Math.min(startPoint.y, currentPoint.y),
            width: Math.abs(currentPoint.x - startPoint.x),
            height: Math.abs(currentPoint.y - startPoint.y)
        };
    }

    function findItemsInsideMarquee(startPoint, currentPoint) {
        const minX = Math.min(startPoint.x, currentPoint.x);
        const maxX = Math.max(startPoint.x, currentPoint.x);
        const minY = Math.min(startPoint.y, currentPoint.y);
        const maxY = Math.max(startPoint.y, currentPoint.y);
        const selected = [];

        itemRegistry.forEach(function (rect, id) {
            const cx = rect.x + (rect.width / 2);
            const cy = rect.y + (rect.height / 2);

            if (cx >= minX && cx <= maxX && cy >= minY && cy <= maxY) {
                selected.push(id);
            }
        });

        return selected;
    }

    function renderMarquee() {
        if (!marqueeState) {
            return;
        }

        let marquee = dom.stageCanvas.querySelector(':scope > .architecture-logical-application-marquee-selection');
        const overlayRect = buildMarqueeRect(marqueeState.startCanvas, marqueeState.currentCanvas);

        if (!marquee) {
            marquee = document.createElement('div');
            marquee.className = 'architecture-logical-application-marquee-selection';
            dom.stageCanvas.appendChild(marquee);
        }

        updateMarqueeOverlay(marquee, overlayRect);
        marqueeState.targetIds = findItemsInsideMarquee(marqueeState.start, marqueeState.current);
        paintMarqueeTargetClasses(marqueeState.targetIds);
    }

    function finishMarquee() {
        if (!marqueeState) {
            return;
        }

        const overlayRect = buildMarqueeRect(marqueeState.startCanvas, marqueeState.currentCanvas);
        const selected = overlayRect.width < 6 && overlayRect.height < 6
            ? []
            : findItemsInsideMarquee(marqueeState.start, marqueeState.current);
        const marquee = dom.stageCanvas.querySelector(':scope > .architecture-logical-application-marquee-selection');

        marqueeState = null;
        paintMarqueeTargetClasses([]);

        if (marquee) {
            marquee.remove();
        }

        if (selected.length) {
            selectIds(selected);
        } else {
            selectIds([]);
        }
    }

    function handlePointerUp(event) {
        const svg = activePointerSvg || dom.stageCanvas.querySelector('svg');
        const hadStageInteraction = Boolean(dragState || resizeState || connectorBendState || marqueeState || activeStageInteraction.type);

        if (event && svg) {
            safelyReleasePointerCapture(svg, event.pointerId);
        }

        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
        activePointerSvg = null;

        if (marqueeState) {
            finishMarquee();
        }

        dragState = null;
        resizeState = null;
        connectorBendState = null;
        setActiveStageInteraction('', []);

        if (hadStageInteraction) {
            scheduleRenderAll();
        }
    }

    function startPointerTracking(svg, event) {
        activePointerSvg = svg;
        safelySetPointerCapture(svg, event.pointerId);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);
    }

    function bindStageEvents() {
        const svg = dom.stageCanvas.querySelector('svg');

        if (!svg) {
            return;
        }

        svg.addEventListener('pointerdown', function (event) {
            if (event.button !== 0) {
                return;
            }

            const connectorHandle = event.target.closest('[data-connector-handle-id]');
            const resizeHandle = event.target.closest('[data-resize-id]');
            const item = event.target.closest('.architecture-logical-application-diagram-item');
            const connector = event.target.closest('[data-connector-id]');

            dom.stageCanvas.focus();
            startPointerTracking(svg, event);

            if (connectorHandle) {
                startConnectorBend(event, connectorHandle.getAttribute('data-connector-handle-id'));
                return;
            }

            if (resizeHandle) {
                startResize(event, resizeHandle.getAttribute('data-resize-id'));
                return;
            }

            if (item) {
                const id = item.getAttribute('data-item-id');

                if (event.shiftKey) {
                    toggleSelect(id);
                } else if (!state.selectedIds.includes(id)) {
                    state.selectedConnectorId = '';
                    state.selectedIds = [id];
                    renderSelectedUi();
                    paintSelectionClasses();
                    paintConnectorSelectionClasses();
                    if (state.generated && dom.jsonOutput) {
                        renderJson();
                    }
                }

                startDrag(event, id);
                return;
            }

            if (connector) {
                selectConnector(connector.getAttribute('data-connector-id'));
                event.preventDefault();
                return;
            }

            startMarquee(event);
        });
    }

    function moveSelection(dx, dy, resize) {
        if (!state.selectedIds.length) {
            return;
        }

        pushUndoSnapshot();
        getSelectedMoveIds().forEach(function (id) {
            const rect = itemRegistry.get(id);

            if (!rect) {
                return;
            }

            updateLayoutOverride(id, Object.assign({}, rect, resize ? {
                width: Math.max(80, rect.width + dx),
                height: Math.max(48, rect.height + dy)
            } : {
                x: rect.x + dx,
                y: rect.y + dy
            }));
        });
        renderAll();
    }

    function handleKeydown(event) {
        if (event.architectureLogicalApplicationHandled) {
            return;
        }

        if (isInputTarget(event.target)) {
            return;
        }

        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
            event.architectureLogicalApplicationHandled = true;
            undoLayout();
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (event.key === 'Escape' && (state.selectedIds.length || state.selectedConnectorId) && !dom.stageShell.classList.contains('architecture-logical-application-stage-expanded') && document.fullscreenElement !== dom.stageShell) {
            event.architectureLogicalApplicationHandled = true;
            selectIds([]);
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const keyMap = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0]
        };
        const vector = keyMap[event.key];

        if (!vector || !state.selectedIds.length) {
            return;
        }

        const step = event.shiftKey ? 24 : 8;
        event.architectureLogicalApplicationHandled = true;
        moveSelection(vector[0] * step, vector[1] * step, event.altKey);
        event.preventDefault();
        event.stopPropagation();
    }

    function undoLayout() {
        const last = state.undoStack.pop();
        let snapshot;

        if (!last) {
            updateUndoButton();
            return;
        }

        snapshot = JSON.parse(last);

        if (snapshot && typeof snapshot === 'object' && Object.prototype.hasOwnProperty.call(snapshot, 'layoutOverrides')) {
            state.layoutOverrides = snapshot.layoutOverrides || {};
            state.connectorOverrides = snapshot.connectorOverrides || {};
            state.selectedIds = Array.isArray(snapshot.selectedIds) ? snapshot.selectedIds.slice() : [];
            state.selectedConnectorId = typeof snapshot.selectedConnectorId === 'string' ? snapshot.selectedConnectorId : '';
            state.highlightedIds = Array.isArray(snapshot.highlightedIds) ? snapshot.highlightedIds.slice() : [];
            state.stageHighlighted = Boolean(snapshot.stageHighlighted);
            state.zoom = Number.isFinite(snapshot.zoom) ? snapshot.zoom : state.zoom;
        } else {
            state.layoutOverrides = snapshot || {};
            state.connectorOverrides = {};
            state.selectedIds = [];
            state.selectedConnectorId = '';
            state.highlightedIds = [];
        }
        renderAll();
        updateUndoButton();
    }

    function applySelectedInputs() {
        if (state.selectedIds.length !== 1) {
            return;
        }

        const id = state.selectedIds[0];
        const rect = itemRegistry.get(id);

        if (!rect) {
            return;
        }

        pushUndoSnapshot();
        updateLayoutOverride(id, {
            x: Number(dom.selectedX.value) || rect.x,
            y: Number(dom.selectedY.value) || rect.y,
            width: Number(dom.selectedWidth.value) || rect.width,
            height: Number(dom.selectedHeight.value) || rect.height
        });
        renderAll();
    }

    function resetSelectedItem() {
        if (state.selectedIds.length !== 1) {
            return;
        }

        pushUndoSnapshot();
        delete state.layoutOverrides[state.selectedIds[0]];
        renderAll();
    }

    function highlightSelected() {
        if (!state.selectedIds.length) {
            return;
        }

        pushUndoSnapshot();
        state.highlightedIds = state.highlightedIds.length === state.selectedIds.length && state.selectedIds.every(function (id) {
            return state.highlightedIds.includes(id);
        }) ? [] : state.selectedIds.slice();
        renderAll();
    }

    function updateHighlightAllButton() {
        if (!dom.highlightAll) {
            return;
        }

        const label = state.stageHighlighted ? 'Remove diagram highlight' : 'Highlight entire diagram';

        dom.highlightAll.setAttribute('aria-pressed', state.stageHighlighted ? 'true' : 'false');
        dom.highlightAll.setAttribute('aria-label', label);
        dom.highlightAll.setAttribute('title', label);
    }

    function highlightAll() {
        clearTimeout(highlightedAllTimer);
        state.stageHighlighted = !state.stageHighlighted;
        renderAll();
    }

    function resetLayout() {
        pushUndoSnapshot();
        state.layoutOverrides = {};
        state.connectorOverrides = {};
        state.selectedIds = [];
        state.selectedConnectorId = '';
        state.highlightedIds = [];
        state.stageHighlighted = false;
        renderAll();
    }

    function toggleStageUi() {
        const hidden = dom.stageShell.classList.toggle('architecture-logical-application-stage-ui-hidden');
        const label = dom.zoomHideUi.querySelector('span') || dom.zoomHideUi;

        if (label) {
            label.textContent = hidden ? 'Show UI' : 'Hide UI';
        }
    }

    function updateFullscreenButton() {
        const isExpanded = document.fullscreenElement === dom.stageShell || dom.stageShell.classList.contains('architecture-logical-application-stage-expanded');
        const icon = dom.fullscreen.querySelector('i');
        const label = isExpanded ? 'Close fullscreen' : 'Open fullscreen';

        dom.fullscreen.setAttribute('aria-label', label);
        dom.fullscreen.setAttribute('title', label);

        if (icon) {
            icon.className = isExpanded ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen';
        }
    }

    function setStageExpanded(isExpanded) {
        dom.stageShell.classList.toggle('architecture-logical-application-stage-expanded', Boolean(isExpanded));
        document.body.classList.toggle('architecture-logical-application-stage-expanded-lock', Boolean(isExpanded));
        updateFullscreenButton();
    }

    function toggleFullscreen() {
        if (dom.stageShell.classList.contains('architecture-logical-application-stage-expanded')) {
            setStageExpanded(false);
            return;
        }

        if (document.fullscreenElement === dom.stageShell) {
            document.exitFullscreen();
            return;
        }

        if (dom.stageShell.requestFullscreen) {
            dom.stageShell.requestFullscreen().then(updateFullscreenButton).catch(function () {
                setStageExpanded(true);
            });
        } else {
            setStageExpanded(true);
        }
    }

    function toggleHelp() {
        const nextHidden = !dom.usageHelpPopup.hidden;

        dom.usageHelpPopup.hidden = nextHidden;
        dom.usageHelpPopup.classList.toggle('d-none', nextHidden);
        dom.usageHelpButton.setAttribute('aria-expanded', String(!nextHidden));
    }

    function switchTabs(buttons, panels, targetId) {
        buttons.forEach(function (button) {
            const active = button.getAttribute('data-output-tab-target') === targetId
                || button.getAttribute('data-config-tab-target') === targetId
                || button.getAttribute('data-tab-target') === targetId;

            button.classList.toggle('active', active);
            button.setAttribute('aria-selected', String(active));
            button.tabIndex = active ? 0 : -1;
        });
        panels.forEach(function (panel) {
            const active = panel.id === targetId;

            panel.classList.toggle('active', active);
            panel.hidden = !active;
        });
    }

        function exportSvg() {
        const svgMarkup = serializeCurrentSvg();

        if (!svgMarkup) {
            showError('Generate a diagram before exporting SVG.');
            return;
        }

        downloadBlob('architecture-logical-application.svg', 'image/svg+xml;charset=utf-8', svgMarkup);
    }

    function exportPng() {
        const svgMarkup = serializeCurrentSvg();

        if (!svgMarkup) {
            showError('Generate a diagram before exporting PNG.');
            return;
        }

        const svg = dom.stageCanvas.querySelector('svg');
        const width = Number(svg.getAttribute('width')) || 1240;
        const height = Number(svg.getAttribute('height')) || 1070;
        const image = new Image();
        const svgUrl = URL.createObjectURL(new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' }));

        image.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = width * 2;
            canvas.height = height * 2;
            context.fillStyle = '#f8fbff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(function (blob) {
                if (!blob) {
                    showError('PNG export failed in this browser.');
                    URL.revokeObjectURL(svgUrl);
                    return;
                }

                const pngUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');

                link.href = pngUrl;
                link.download = 'architecture-logical-application.png';
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(pngUrl);
                URL.revokeObjectURL(svgUrl);
            }, 'image/png');
        };
        image.onerror = function () {
            URL.revokeObjectURL(svgUrl);
            showError('PNG export failed while rendering the SVG.');
        };
        image.src = svgUrl;
    }

    function copyJson() {
        const json = JSON.stringify(buildPayload(), null, 2);

        writeClipboardText(json).then(function (copied) {
            if (!copied) {
                showError('Failed to copy the JSON state to the clipboard.');
            }
        }).catch(function () {
            showError('Failed to copy the JSON state to the clipboard.');
        });
    }

    function downloadJson() {
        downloadBlob('architecture-logical-application.json', 'application/json;charset=utf-8', JSON.stringify(buildPayload(), null, 2));
    }

    function copyPromptText(value) {
        writeClipboardText(value).catch(function () {});
    }

    function importJson(file) {
        const reader = new FileReader();

        reader.onload = function () {
            try {
                const payload = JSON.parse(String(reader.result || '{}'));
                const imported = core.buildImportedPayloadState(payload);

                state.presetId = imported.presetId;
                state.prompt = imported.prompt;
                state.controls = imported.controls;
                state.generated = true;
                const runtimeState = restoreEngineStateFromPayload(payload, imported);

                dom.preset.value = state.presetId;
                dom.prompt.value = state.prompt;
                syncControls(state.controls);
                buildModelFromState();
                clearError();
                renderAll();
                dom.stageCanvas.scrollLeft = runtimeState.viewport.scrollLeft;
                dom.stageCanvas.scrollTop = runtimeState.viewport.scrollTop;
            } catch (error) {
                showError(error.message || 'Could not import this JSON state.');
            }
        };
        reader.readAsText(file);
    }

    function bindEvents() {
        dom.generate.addEventListener('click', generateArchitecture);
        dom.reset.addEventListener('click', function () {
            applyPreset('web-application', false);
        });
        dom.preset.addEventListener('change', function () {
            applyPreset(dom.preset.value, true);
        });
        [
            dom.detailLevel,
            dom.flowDepth,
            dom.applicationName,
            dom.businessPurpose,
            dom.usersActors,
            dom.frontendComponents,
            dom.backendServices,
            dom.databases,
            dom.cacheStorage,
            dom.externalIntegrations,
            dom.authenticationMethod,
            dom.notifications,
            dom.monitoringLogging,
            dom.businessFlow
        ].forEach(function (element) {
            element.addEventListener('input', function () {
                if (!state.generated) {
                    return;
                }

                buildModelFromState();
                renderAll();
            });
            element.addEventListener('change', function () {
                if (!state.generated) {
                    return;
                }

                buildModelFromState();
                renderAll();
            });
        });
        dom.configTabs.forEach(function (button) {
            button.addEventListener('click', function () {
                switchTabs(dom.configTabs, dom.configPanels, button.getAttribute('data-config-tab-target'));
            });
        });
        dom.outputTabs.forEach(function (button) {
            button.addEventListener('click', function () {
                switchTabs(dom.outputTabs, dom.outputPanels, button.getAttribute('data-output-tab-target') || button.getAttribute('data-tab-target'));
            });
        });
        dom.zoomOut.addEventListener('click', function () {
            setZoom(state.zoom - 0.01);
        });
        dom.zoomIn.addEventListener('click', function () {
            setZoom(state.zoom + 0.01);
        });
        dom.zoomInput.addEventListener('change', function () {
            setZoom(Number(dom.zoomInput.value) / 100);
        });
        dom.zoomInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                setZoom(Number(dom.zoomInput.value) / 100);
            }

            if (event.key === 'Escape') {
                updateZoomInput();
            }
        });
        dom.zoomFit.addEventListener('click', fitToView);
        dom.zoomActual.addEventListener('click', function () {
            setZoom(1);
        });
        dom.undoStageEdit.addEventListener('click', undoLayout);
        dom.highlightAll.addEventListener('click', highlightAll);
        dom.zoomHideUi.addEventListener('click', toggleStageUi);
        dom.fullscreen.addEventListener('click', toggleFullscreen);
        dom.resetLayout.addEventListener('click', resetLayout);
        dom.usageHelpButton.addEventListener('click', toggleHelp);
        if (dom.usageHelpClose) {
            dom.usageHelpClose.addEventListener('click', toggleHelp);
        }
        dom.applyItemSize.addEventListener('click', applySelectedInputs);
        dom.resetItemSize.addEventListener('click', resetSelectedItem);
        dom.highlightItem.addEventListener('click', highlightSelected);
        if (dom.inventorySortSelect) {
            if (dom.inventorySortSelect.tagName === 'DETAILS') {
                dom.inventorySortSelect.addEventListener('toggle', function () {
                    const summary = dom.inventorySortSelect.querySelector('summary');

                    if (summary) {
                        summary.setAttribute('aria-expanded', String(dom.inventorySortSelect.open));
                    }
                });
            } else {
                dom.inventorySortSelect.addEventListener('click', function () {
                    setSortMenuOpen(dom.inventorySortSelect.getAttribute('aria-expanded') !== 'true');
                });
                dom.inventorySortSelect.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter' && event.key !== ' ') {
                        return;
                    }

                    event.preventDefault();
                    setSortMenuOpen(dom.inventorySortSelect.getAttribute('aria-expanded') !== 'true');
                });
            }

            document.addEventListener('click', function (event) {
                if (!dom.inventorySortSelect.contains(event.target) && (!dom.inventorySortMenu || !dom.inventorySortMenu.contains(event.target))) {
                    setSortMenuOpen(false);
                }
            });
        }
        dom.sortOptions.forEach(function (button) {
            button.addEventListener('click', function () {
                setSortMode(button.getAttribute('data-sort-value'));

                if (state.generated && state.model) {
                    renderInventory(state.model);
                }
            });
        });
        if (dom.sort && dom.sort.tagName === 'SELECT') {
            dom.sort.addEventListener('change', function () {
                setSortMode(dom.sort.value);

                if (state.generated && state.model) {
                    renderInventory(state.model);
                }
            });
        }
        dom.inventoryTableBody.addEventListener('click', function (event) {
            const button = event.target.closest('.architecture-logical-application-row-copy');

            if (!button || !dom.inventoryTableBody.contains(button)) {
                return;
            }

            if (!button.dataset.copyTitle) {
                button.dataset.copyTitle = button.getAttribute('title') || 'Copy row';
            }

            copyInventoryRow(button.dataset.inventoryCopyRow || '', button);
        });
        dom.exportPng.addEventListener('click', exportPng);
        dom.downloadSvg.addEventListener('click', exportSvg);
        dom.copyJson.addEventListener('click', copyJson);
        dom.downloadJson.addEventListener('click', downloadJson);
        dom.importJsonButton.addEventListener('click', function () {
            dom.importJson.click();
        });
    // ns:start family._base.workspace.08_json-restore
        dom.importJson.addEventListener('change', function () {
    // ns:end family._base.workspace.08_json-restore
            const file = dom.importJson.files && dom.importJson.files[0];

            if (file) {
                importJson(file);
            }

            dom.importJson.value = '';
        });
        dom.stageCanvas.addEventListener('keydown', handleKeydown);
        dom.stageCanvas.addEventListener('wheel', function (event) {
            if (!event.ctrlKey && !event.metaKey) {
                return;
            }

            event.preventDefault();
            setZoom(state.zoom + (event.deltaY > 0 ? -0.01 : 0.01));
        }, { passive: false });
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('fullscreenchange', function () {
            if (!document.fullscreenElement) {
                setStageExpanded(false);
                return;
            }

            updateFullscreenButton();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && dom.stageShell.classList.contains('architecture-logical-application-stage-expanded')) {
                setStageExpanded(false);
            }
        });
    }

    function setupPromptCopyButtons() {
        const prompts = all('.markdown-content pre.architecture-logical-application-prompt-pre');

        all('.architecture-logical-application-prompt-copy-btn').forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                const index = Number(button.getAttribute('data-prompt-copy-index'));
                const code = prompts[index] ? prompts[index].textContent.trim() : '';

                if (!code) {
                    return;
                }

                dom.prompt.value = code;
                copyPromptText(code);
            });
        });
    }

    function init() {
        if (!collectDom()) {
            return;
        }

        const preset = core.getPreset(state.presetId);

        state.prompt = preset.prompt;
        state.controls = preset.defaults;
        dom.prompt.value = preset.prompt;
        syncControls(preset.defaults);
        setSortMode('id');
        bindEvents();
        setupPromptCopyButtons();
        renderAll();
    }

    document.addEventListener('DOMContentLoaded', init);
}(window));
/* table-output-standard:start */
(function setupArchitectureLogicalApplicationTableOutputStandard() {
    const rootSelector = '.architecture-logical-application-tool';
    const tableSelector = '.tool-result-table tbody tr, .architecture-logical-application-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .architecture-logical-application-table tbody';
    const clampClass = 'architecture-logical-application-table-cell-text';
    const cellClampClass = 'architecture-logical-application-cell-clamp';
    const statusColumnClass = 'architecture-logical-application-table-status-cell';

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
        root.querySelectorAll('.tool-result-table, .architecture-logical-application-table').forEach(function alignStatusTable(table) {
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
/* table-output-standard:end */
// ns:end family._base.workspace.00_shell
