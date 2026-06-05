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
        if (/security|control|firewall|policy/.test(normalized)) {
            return 'bi bi-shield-check';
        }
        if (/compute|server|workload|host/.test(normalized)) {
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

installInfraStackResultSummaryNormalizer('architecture-vpc-huawei');
// ns:end family._base.workspace.05_result-summary
// ns:start family._base.workspace.01_input-brief
// section.js
(function attachSourceSection(global) {
    const registry = global.InfraStackArchitectureWorkspaceSections || {};
    const source = {
        "section": "01_input-brief",
        "title": "input brief",
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiPrompt",
            "architectureVpcHuaweiGenerate",
            "architectureVpcHuaweiReset",
            "architectureVpcHuaweiErrorState"
        ],
        "sourceClasses": [
            "tool-prompt-shell",
            "tool-main-row",
            "tool-main-label",
            "tool-main-input-grid",
            "architecture-vpc-huawei-prompt",
            "architecture-vpc-huawei-prompt-hint",
            "architecture-vpc-huawei-main-actions",
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
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiPreset",
            "architectureVpcHuaweiPresetDescription",
            "architectureVpcHuaweiRegion",
            "architectureVpcHuaweiAzCount"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-basic-preset-section",
            "architecture-vpc-huawei-basic-grid",
            "architecture-vpc-huawei-control-stack",
            "architecture-vpc-huawei-native-select",
        ],
        "sourceVariables": [
            "presetInput",
            "presetDescription",
            "regionInput",
            "azCountInput",
        ],
        "sourceFunctions": [
            "populateRegionOptions",
            "updatePresetSelection",
            "syncControls",
            "applyPreset"
        ],
        "sourceBehaviours": [
            "keeps the preset description synchronized",
            "populates region and zone choices",
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
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiNetworkConfigTab",
            "architectureVpcHuaweiWorkloadConfigTab",
            "architectureVpcHuaweiServicesConfigTab",
            "architectureVpcHuaweiNetworkConfigPanel",
            "architectureVpcHuaweiWorkloadConfigPanel",
            "architectureVpcHuaweiServicesConfigPanel",
            "architectureVpcHuaweiCidr",
            "architectureVpcHuaweiNatMode",
            "architectureVpcHuaweiAppTier",
            "architectureVpcHuaweiDatabase",
            "architectureVpcHuaweiRoute53",
            "architectureVpcHuaweiCloudFront",
            "architectureVpcHuaweiWaf",
            "architectureVpcHuaweiAlb",
            "architectureVpcHuaweiBastion",
            "architectureVpcHuaweiEndpoints",
            "architectureVpcHuaweiFlowLogs",
            "architectureVpcHuaweiCloudWatch",
            "architectureVpcHuaweiSiteToSiteVpn",
            "architectureVpcHuaweiTransitGateway",
            "architectureVpcHuaweiCache"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-custom-panel",
            "architecture-vpc-huawei-custom-panel-summary",
            "architecture-vpc-huawei-config-tabs",
            "architecture-vpc-huawei-config-tab",
            "architecture-vpc-huawei-config-panel",
            "architecture-vpc-huawei-config-grid",
            "architecture-vpc-huawei-toggle-grid",
            "architecture-vpc-huawei-toggle-item"
        ],
        "sourceVariables": [
            "cidrInput",
            "natModeInput",
            "appTierInput",
            "databaseInput",
            "route53Input",
            "cloudFrontInput",
            "wafInput",
            "albInput",
            "bastionInput",
            "endpointsInput",
            "flowLogsInput",
            "cloudWatchInput",
            "siteToSiteVpnInput",
            "transitGatewayInput",
            "cacheInput"
        ],
        "sourceFunctions": [
            "activateConfigTab",
            "bindTabKeyboardNavigation",
            "buildSpecFromControls",
            "renderFromControls"
        ],
        "sourceBehaviours": [
            "switches advanced tab panels accessibly",
            "reads advanced controls into normalized state",
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
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiSelectedShell",
            "architectureVpcHuaweiSelectedEmpty",
            "architectureVpcHuaweiSelectedEditor",
            "architectureVpcHuaweiSelectedName",
            "architectureVpcHuaweiSelectedX",
            "architectureVpcHuaweiSelectedY",
            "architectureVpcHuaweiSelectedWidth",
            "architectureVpcHuaweiSelectedHeight",
            "architectureVpcHuaweiHighlightCard",
            "architectureVpcHuaweiApplyCardSize",
            "architectureVpcHuaweiResetCardSize"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-selected-section",
            "architecture-vpc-huawei-selected-empty",
            "architecture-vpc-huawei-selected-empty-chips",
            "architecture-vpc-huawei-selected-hint-chip",
            "architecture-vpc-huawei-selected-editor",
            "architecture-vpc-huawei-selected-name",
            "architecture-vpc-huawei-selected-actions",
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
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiStageTitle",
            "architectureVpcHuaweiStageSubtitle",
            "architectureVpcHuaweiStageMeta",
            "architectureVpcHuaweiOutputEmpty",
            "architectureVpcHuaweiPromptSummary",
            "architectureVpcHuaweiResultTextGenerated"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-stage-header",
            "architecture-vpc-huawei-stage-heading",
            "architecture-vpc-huawei-stage-preset-chip",
            "architecture-vpc-huawei-stage-meta",
            "architecture-vpc-huawei-prompt-notes-card",
            "architecture-vpc-huawei-note-card",
            "architecture-vpc-huawei-note-copy",
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
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiStageShell",
            "architectureVpcHuaweiStageEmpty",
            "architectureVpcHuaweiStageCanvas",
            "architectureVpcHuaweiZoomControl",
            "architectureVpcHuaweiZoomLabel",
            "architectureVpcHuaweiZoomInput",
            "architectureVpcHuaweiZoomOut",
            "architectureVpcHuaweiZoomIn",
            "architectureVpcHuaweiZoomFit",
            "architectureVpcHuaweiZoomActual",
            "architectureVpcHuaweiUndoStageEdit",
            "architectureVpcHuaweiHighlightAll",
            "architectureVpcHuaweiZoomHideUi",
            "architectureVpcHuaweiUsageHelpButton",
            "architectureVpcHuaweiUsageHelpPopup",
            "architectureVpcHuaweiUsageHelpClose",
            "architectureVpcHuaweiFullscreen",
            "architectureVpcHuaweiResetLayout"
        ],
        "sourceClasses": [
            "tool-stage-shell",
            "tool-stage-toolbar",
            "tool-stage-body",
            "tool-stage-empty",
            "tool-stage-canvas",
            "architecture-vpc-huawei-stage-canvas",
            "architecture-vpc-huawei-zoom-control",
            "architecture-vpc-huawei-icon-btn",
            "architecture-vpc-huawei-stage-preview",
            "architecture-vpc-huawei-usage-overlay",
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
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiOutputStatus",
            "architectureVpcHuaweiScoreValue",
            "architectureVpcHuaweiScoreEchart"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-output-summary",
            "architecture-vpc-huawei-output-status-card",
            "architecture-vpc-huawei-score-card",
            "architecture-vpc-huawei-score-ring-card",
            "architecture-vpc-huawei-score-value",
            "architecture-vpc-huawei-score-copy",
            "architecture-vpc-huawei-score-kicker",
            "architecture-vpc-huawei-score-summary",
            "architecture-vpc-huawei-score-detail",
            "architecture-vpc-huawei-score-tag"
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
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiInventorySortSelect",
            "architectureVpcHuaweiInventorySortSummary",
            "architectureVpcHuaweiInventorySort",
            "architectureVpcHuaweiExportPng",
            "architectureVpcHuaweiDownloadSvg",
            "architectureVpcHuaweiCopyJson",
            "architectureVpcHuaweiDownloadJson",
            "architectureVpcHuaweiImportJsonButton"
        ],
        "sourceClasses": [
            "architecture-vpc-huawei-toolbar-shell",
            "architecture-vpc-huawei-toolbar",
            "architecture-vpc-huawei-toolbar-main",
            "tool-output-toolbar",
            "tool-output-actions",
            "architecture-vpc-huawei-sort-label",
            "architecture-vpc-huawei-sort-wrap",
            "architecture-vpc-huawei-sort-select",
            "architecture-vpc-huawei-sort-summary",
            "architecture-vpc-huawei-sort-menu",
            "architecture-vpc-huawei-sort-option"
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
        "sourceTool": "templates/content/tools/aws/architecture-vpc-aws/",
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
            "architectureVpcHuaweiOutputEmpty",
            "architectureVpcHuaweiOutputContent",
            "architectureVpcHuaweiInventoryTableBody",
            "architectureVpcHuaweiRoutingTableBody",
            "architectureVpcHuaweiControlTableBody",
            "architectureVpcHuaweiPromptSummary",
            "architectureVpcHuaweiKeywordList",
            "architectureVpcHuaweiAssumptionList",
            "architectureVpcHuaweiModelList",
            "architectureVpcHuaweiProsList",
            "architectureVpcHuaweiConsList",
            "architectureVpcHuaweiPillarBreakdown",
            "architectureVpcHuaweiRiskLevel",
            "architectureVpcHuaweiJsonOutput",
            "architectureVpcHuaweiImportJson"
        ],
        "sourceClasses": [
            "tool-output-shell",
            "tool-empty-state",
            "architecture-vpc-huawei-output-content",
            "architecture-vpc-huawei-output-shell",
            "architecture-vpc-huawei-tabs-shell",
            "tool-tabs",
            "architecture-vpc-huawei-tab-btn",
            "architecture-vpc-huawei-tab-panel",
            "architecture-vpc-huawei-inventory-panel",
            "architecture-vpc-huawei-table-card",
            "architecture-vpc-huawei-table-wrap",
            "architecture-vpc-huawei-table",
            "architecture-vpc-huawei-row-copy",
            "architecture-vpc-huawei-prompt-notes-card",
            "architecture-vpc-huawei-assessment-card",
            "architecture-vpc-huawei-pillar-card",
            "architecture-vpc-huawei-risk-card",
            "tool-json-shell",
            "architecture-vpc-huawei-json-code"
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
{{ include('content/tools/huawei/architecture-vpc-huawei/assets/bin/engine-runtime.js')|raw }}
// ns:end family.architecture.workspace.04_visual-contract
{{ include('content/tools/huawei/architecture-vpc-huawei/assets/bin/model-core.js')|raw }}

(function initArchitectureVpcHuaweiWorkspace(globalScope) {
    'use strict';

    const core = ArchitectureVpcHuaweiModelCore;
    const engineRuntime = globalScope.InfraStackArchitectureEngineRuntime || null;
    const iconSvgMap = {
        users: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-users.svg')|json_encode|raw }},
        vpc: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-vpc.svg')|json_encode|raw }},
        subnet: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-subnet.svg')|json_encode|raw }},
        vsi: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-vsi.svg')|json_encode|raw }},
        kubernetes: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-kubernetes.svg')|json_encode|raw }},
        cis: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-waf-dns.svg')|json_encode|raw }},
        security: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-security.svg')|json_encode|raw }},
        transitGateway: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-enterprise-router.svg')|json_encode|raw }},
        objectStorage: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-cloud-object-storage.svg')|json_encode|raw }},
        monitoring: {{ include('content/tools/huawei/architecture-vpc-huawei/assets/icon/huawei-arch-monitoring.svg')|json_encode|raw }}
    };

    let currentSpec = null;
    let currentArchitecture = null;
    let previewArchitecture = null;
    let currentInventory = [];
    let currentNotes = null;
    let currentPayload = null;
    let currentSvgMarkup = '';
    let selectedNodeId = '';
    let selectedNodeIds = [];
    let selectedConnectorId = '';
    let pendingStageFocusNodeId = '';
    let highlightedNodeId = '';
    let highlightedNodeIds = [];
    let layoutOverrides = {};
    let connectorOverrides = {};
    let stageZoom = 50;
    let dragState = null;
    let isStageUiHidden = false;
    let stageDiagramHighlighted = false;
    let stageUndoStack = [];
    const stageUndoLimit = 40;
    const engineRuntimeConfig = {
        zoom: {
            defaultValue: 0.5,
            min: 0.15,
            max: 2.4,
            step: 0.1,
            wheelStep: 0.01
        },
        movement: {
            step: 4,
            fastStep: 12,
            snap: 1,
            historyLimit: stageUndoLimit,
            minimumNodeWidth: 120,
            minimumNodeHeight: 58
        },
        selectors: {
            resizeHandle: '[data-engine-resize-handle], .diagram-resize-handle, .architecture-vpc-huawei-resize-handle',
            keyboardFormTarget: 'input, textarea, select, button, summary, a[href], [contenteditable="true"]'
        },
        classes: {
            selected: 'is-selected',
            multiSelected: 'is-multi-selected',
            highlighted: 'is-highlighted',
            diagramHighlighted: 'architecture-vpc-huawei-stage-highlighted',
            dragging: 'architecture-vpc-huawei-stage-dragging',
            resizing: 'architecture-vpc-huawei-stage-resizing',
            uiHidden: 'is-stage-ui-hidden',
            expanded: 'architecture-vpc-huawei-stage-expanded',
            bodyLock: 'architecture-vpc-huawei-stage-expanded-lock',
            hidden: 'd-none'
        }
    };
    const customSelectIds = [
        'architectureVpcHuaweiPreset',
        'architectureVpcHuaweiSize',
        'architectureVpcHuaweiAccessBlocks',
        'architectureVpcHuaweiRouting'
    ];
    const requiredIds = [
        'architectureVpcHuaweiPrompt',
        'architectureVpcHuaweiGenerate',
        'architectureVpcHuaweiReset',
        'architectureVpcHuaweiErrorState',
        'architectureVpcHuaweiPreset',
        'architectureVpcHuaweiPresetDescription',
        'architectureVpcHuaweiSize',
        'architectureVpcHuaweiAccessBlocks',
        'architectureVpcHuaweiRouting',
        'architectureVpcHuaweiVlans',
        'architectureVpcHuaweiTrunkVlans',
        'architectureVpcHuaweiNativeVlan',
        'architectureVpcHuaweiAccessVlan',
        'architectureVpcHuaweiSviGateway',
        'architectureVpcHuaweiOspfArea',
        'architectureVpcHuaweiBgpAsn',
        'architectureVpcHuaweiRedundancyVip',
        'architectureVpcHuaweiWireless',
        'architectureVpcHuaweiFirewall',
        'architectureVpcHuaweiWan',
        'architectureVpcHuaweiMonitoring',
        'architectureVpcHuaweiDhcpDns',
        'architectureVpcHuaweiHsrp',
        'architectureVpcHuaweiEtherChannel',
        'architectureVpcHuaweiAcl',
        'architectureVpcHuaweiNat',
        'architectureVpcHuaweiVpn',
        'architectureVpcHuaweiStageShell',
        'architectureVpcHuaweiStageTitle',
        'architectureVpcHuaweiStageSubtitle',
        'architectureVpcHuaweiStageMeta',
        'architectureVpcHuaweiStageEmpty',
        'architectureVpcHuaweiStageCanvas',
        'architectureVpcHuaweiZoomOut',
        'architectureVpcHuaweiZoomInput',
        'architectureVpcHuaweiZoomLabel',
        'architectureVpcHuaweiZoomIn',
        'architectureVpcHuaweiZoomFit',
        'architectureVpcHuaweiZoomActual',
        'architectureVpcHuaweiUndoStageEdit',
        'architectureVpcHuaweiHighlightAll',
        'architectureVpcHuaweiZoomHideUi',
        'architectureVpcHuaweiFullscreen',
        'architectureVpcHuaweiResetLayout',
        'architectureVpcHuaweiSelectedEmpty',
        'architectureVpcHuaweiSelectedEditor',
        'architectureVpcHuaweiSelectedName',
        'architectureVpcHuaweiSelectedX',
        'architectureVpcHuaweiSelectedY',
        'architectureVpcHuaweiSelectedWidth',
        'architectureVpcHuaweiSelectedHeight',
        'architectureVpcHuaweiOutputEmpty',
        'architectureVpcHuaweiOutputContent',
        'architectureVpcHuaweiOutputStatus',
        'architectureVpcHuaweiPillarBreakdown',
        'architectureVpcHuaweiRiskLevel',
        'architectureVpcHuaweiInventorySortSelect',
        'architectureVpcHuaweiInventorySortSummary',
        'architectureVpcHuaweiInventorySort',
        'architectureVpcHuaweiInventoryTableBody',
        'architectureVpcHuaweiPromptSummary',
        'architectureVpcHuaweiKeywordList',
        'architectureVpcHuaweiAssumptionList',
        'architectureVpcHuaweiModelList',
        'architectureVpcHuaweiProsList',
        'architectureVpcHuaweiConsList',
        'architectureVpcHuaweiJsonOutput',
        'architectureVpcHuaweiImportJson'
    ];

    function byId(id) {
        return document.getElementById(id);
    }

    function all(selector, root) {
        return Array.from((root || document).querySelectorAll(selector));
    }

    function valueOf(id) {
        const element = byId(id);

        return element ? element.value : '';
    }

    function checkedOf(id) {
        const element = byId(id);

        return element ? Boolean(element.checked) : false;
    }

    function setValue(id, value) {
        const element = byId(id);

        if (element) {
            element.value = value;
        }
    }

    function setChecked(id, value) {
        const element = byId(id);

        if (element) {
            element.checked = Boolean(value);
        }
    }

    function setText(id, value) {
        const element = byId(id);

        if (element) {
            element.textContent = value;
        }
    }

    function setHidden(element, isHidden) {
        if (!element) {
            return;
        }

        element.classList.toggle('d-none', Boolean(isHidden));
        element.hidden = Boolean(isHidden);
    }

    function cloneStageValue(value) {
        return JSON.parse(JSON.stringify(value || {}));
    }

    function cloneConnectorOverrides(value) {
        if (engineRuntime && typeof engineRuntime.cloneConnectorOverrides === 'function') {
            return engineRuntime.cloneConnectorOverrides(value);
        }

        return cloneStageValue(value);
    }

    function currentViewportState() {
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');
        const stageShell = byId('architectureVpcHuaweiStageShell');

        return {
            zoom: stageZoom / 100,
            scrollLeft: stageCanvas ? stageCanvas.scrollLeft : 0,
            scrollTop: stageCanvas ? stageCanvas.scrollTop : 0,
            uiHidden: isStageUiHidden,
            fullscreen: Boolean(stageShell && (
                document.fullscreenElement === stageShell ||
                stageShell.classList.contains('architecture-vpc-huawei-stage-expanded')
            )),
            diagramHighlighted: stageDiagramHighlighted
        };
    }

    function currentSelectionState() {
        const nodeIds = selectedNodeIds.length > 0
            ? selectedNodeIds.slice()
            : (selectedNodeId ? [selectedNodeId] : []);

        return {
            nodeIds: nodeIds,
            connectorId: selectedConnectorId || '',
            highlightedNodeId: highlightedNodeId || '',
            highlightedNodeIds: highlightedNodeIds.slice()
        };
    }

    function createEngineState(value) {
        const source = value || {};
        const stateValue = {
            viewport: Object.assign(currentViewportState(), source.viewport || {}),
            selection: Object.assign(currentSelectionState(), source.selection || {}),
            layoutOverrides: source.layoutOverrides || source.layout_overrides || layoutOverrides,
            connectorOverrides: source.connectorOverrides || source.connector_overrides || connectorOverrides
        };

        if (engineRuntime && typeof engineRuntime.createState === 'function') {
            return engineRuntime.createState(stateValue, engineRuntimeConfig);
        }

        return stateValue;
    }

    function toPersistedEngineState(value) {
        const state = createEngineState(value);

        if (engineRuntime && typeof engineRuntime.toPersistedState === 'function') {
            return engineRuntime.toPersistedState(state, engineRuntimeConfig);
        }

        const nodeIds = Array.isArray(state.selection.nodeIds)
            ? state.selection.nodeIds.slice()
            : [];

        return {
            viewport: {
                zoom: state.viewport.zoom,
                scroll_left: state.viewport.scrollLeft || 0,
                scroll_top: state.viewport.scrollTop || 0,
                ui_hidden: Boolean(state.viewport.uiHidden),
                fullscreen: Boolean(state.viewport.fullscreen),
                diagram_highlighted: Boolean(state.viewport.diagramHighlighted)
            },
            selection: {
                node_ids: nodeIds,
                connector_id: state.selection.connectorId || '',
                highlighted_node_id: state.selection.highlightedNodeId || '',
                highlighted_node_ids: Array.isArray(state.selection.highlightedNodeIds)
                    ? state.selection.highlightedNodeIds.slice()
                    : []
            },
            layout_overrides: cloneStageValue(state.layoutOverrides),
            connector_overrides: cloneConnectorOverrides(state.connectorOverrides)
        };
    }

    function syncConnectorPayloadState() {
        if (!currentPayload) {
            return;
        }

        const persistedState = toPersistedEngineState();

        currentPayload.viewport = persistedState.viewport;
        currentPayload.selection = persistedState.selection;
        currentPayload.layout_overrides = cloneStageValue(persistedState.layout_overrides);
        currentPayload.layoutOverrides = cloneStageValue(persistedState.layout_overrides);
        currentPayload.connector_overrides = cloneConnectorOverrides(persistedState.connector_overrides);
        currentPayload.connectorOverrides = cloneConnectorOverrides(persistedState.connector_overrides);
        currentPayload.selected_node_id = persistedState.selection.node_ids[0] || '';
        currentPayload.selected_node_ids = persistedState.selection.node_ids.slice();
        currentPayload.selected_connector_id = persistedState.selection.connector_id || '';
        currentPayload.highlighted_node_id = persistedState.selection.highlighted_node_id || '';
        currentPayload.highlighted_node_ids = highlightedNodeIds.slice();
    }

    function restoreEngineStateFromPayload(payload, restoredLayoutOverrides) {
        const source = payload || {};
        const restoredSelectedNodeIds = Array.isArray(source.selected_node_ids)
            ? source.selected_node_ids
            : (Array.isArray(source.selectedNodeIds) ? source.selectedNodeIds : (source.selected_node_id || source.selectedNodeId ? [source.selected_node_id || source.selectedNodeId] : []));
        const restoredHighlightedNodeIds = Array.isArray(source.highlighted_node_ids)
            ? source.highlighted_node_ids
            : (Array.isArray(source.highlightedNodeIds) ? source.highlightedNodeIds : (source.highlighted_node_id || source.highlightedNodeId ? [source.highlighted_node_id || source.highlightedNodeId] : []));
        const restoredSelectedConnectorId = source.selected_connector_id || source.selectedConnectorId || '';
        const runtimeState = createEngineState({
            viewport: source.viewport || {},
            selection: Object.assign({
                nodeIds: restoredSelectedNodeIds,
                connectorId: restoredSelectedConnectorId,
                highlightedNodeId: restoredHighlightedNodeIds[0] || source.highlighted_node_id || source.highlightedNodeId || ''
            }, source.selection || {}),
            layoutOverrides: restoredLayoutOverrides || source.layout_overrides || source.layoutOverrides,
            connectorOverrides: source.connector_overrides || source.connectorOverrides
        });

        layoutOverrides = cloneStageValue(runtimeState.layoutOverrides);
        connectorOverrides = cloneConnectorOverrides(runtimeState.connectorOverrides);
        selectedNodeIds = Array.isArray(runtimeState.selection.nodeIds) ? runtimeState.selection.nodeIds.slice() : [];
        selectedNodeId = selectedNodeIds[0] || '';
        selectedConnectorId = String(runtimeState.selection.connectorId || '');
        setHighlightedNodeIds(restoredHighlightedNodeIds.length > 0
            ? restoredHighlightedNodeIds
            : runtimeState.selection.highlightedNodeIds);
        stageDiagramHighlighted = Boolean(runtimeState.viewport.diagramHighlighted);
        isStageUiHidden = Boolean(runtimeState.viewport.uiHidden);
        stageZoom = Math.round(Number(runtimeState.viewport.zoom || 0.5) * 100);
        setValue('architectureVpcHuaweiZoomInput', stageZoom);

        const stageShell = byId('architectureVpcHuaweiStageShell');

        if (stageShell) {
            stageShell.classList.toggle('is-stage-ui-hidden', isStageUiHidden);
        }
    }

    function updateUndoButton() {
        const button = byId('architectureVpcHuaweiUndoStageEdit');

        if (!button) {
            return;
        }

        button.disabled = stageUndoStack.length === 0;
        button.setAttribute('aria-disabled', button.disabled ? 'true' : 'false');
    }

    function updateHighlightAllButton() {
        const button = byId('architectureVpcHuaweiHighlightAll');

        if (!button) {
            return;
        }

        button.setAttribute('aria-pressed', stageDiagramHighlighted ? 'true' : 'false');
    }

    function createStageUndoSnapshot() {
        if (!currentSpec) {
            return null;
        }

        return {
            spec: cloneStageValue(currentSpec),
            layoutOverrides: cloneStageValue(layoutOverrides),
            connectorOverrides: cloneConnectorOverrides(connectorOverrides),
            selectedNodeId: selectedNodeId,
            selectedNodeIds: selectedNodeIds.slice(),
            selectedConnectorId: selectedConnectorId,
            highlightedNodeId: highlightedNodeId,
            highlightedNodeIds: highlightedNodeIds.slice(),
            stageDiagramHighlighted: stageDiagramHighlighted,
            stageZoom: stageZoom
        };
    }

    function pushStageUndoSnapshot() {
        const snapshot = createStageUndoSnapshot();

        if (!snapshot) {
            return;
        }

        stageUndoStack.push(snapshot);

        if (stageUndoStack.length > stageUndoLimit) {
            stageUndoStack.shift();
        }

        updateUndoButton();
    }

    function clearStageUndoHistory() {
        stageUndoStack = [];
        updateUndoButton();
    }

    function undoStageEdit() {
        const snapshot = stageUndoStack.pop();

        if (!snapshot) {
            updateUndoButton();
            return false;
        }

        layoutOverrides = cloneStageValue(snapshot.layoutOverrides);
        connectorOverrides = cloneConnectorOverrides(snapshot.connectorOverrides);
        selectedNodeId = String(snapshot.selectedNodeId || '');
        selectedNodeIds = Array.isArray(snapshot.selectedNodeIds) ? snapshot.selectedNodeIds.slice() : (selectedNodeId ? [selectedNodeId] : []);
        selectedConnectorId = String(snapshot.selectedConnectorId || '');
        highlightedNodeId = String(snapshot.highlightedNodeId || '');
        highlightedNodeIds = Array.isArray(snapshot.highlightedNodeIds) ? snapshot.highlightedNodeIds.slice() : (highlightedNodeId ? [highlightedNodeId] : []);
        highlightedNodeId = highlightedNodeIds[0] || '';
        stageDiagramHighlighted = Boolean(snapshot.stageDiagramHighlighted);
        stageZoom = Number.isFinite(snapshot.stageZoom) ? snapshot.stageZoom : 50;
        setValue('architectureVpcHuaweiZoomInput', stageZoom);
        updateHighlightAllButton();
        updateUndoButton();
        renderResult(snapshot.spec);
        return true;
    }

    function setStageDiagramHighlighted(isHighlighted) {
        if (stageDiagramHighlighted === Boolean(isHighlighted)) {
            return;
        }

        if (currentSpec) {
            pushStageUndoSnapshot();
        }

        stageDiagramHighlighted = Boolean(isHighlighted);
        updateHighlightAllButton();

        if (currentSpec) {
            renderResult(currentSpec);
        } else if (previewArchitecture) {
            const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

            if (stageCanvas) {
                stageCanvas.innerHTML = buildSvgMarkup(previewArchitecture) + createPresetPreviewOverlay();
                applyStageZoom();
            }
        }
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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

    function textWithoutInfoMarker(element, markerClass) {
        const clone = element.cloneNode(true);

        clone.querySelectorAll('.' + markerClass).forEach(function (marker) {
            marker.remove();
        });

        return clone.textContent.replace(/\s+/g, ' ').trim();
    }

    function workspaceInfoText(element, markerClass) {
        const label = textWithoutInfoMarker(element, markerClass);

        return label;
    }

    function applyWorkspaceInfoMarkers() {
        const root = document.querySelector('.architecture-vpc-huawei-tool');
        const markerClass = 'architecture-vpc-huawei-info-marker';

        if (!root) {
            return;
        }

        Array.from(root.querySelectorAll([
            '.tool-control-hint'
        ].join(', '))).forEach(function (element) {
            const infoText = workspaceInfoText(element, markerClass);
            let marker = Array.from(element.children).find(function (child) {
                return child.classList && child.classList.contains(markerClass);
            });

            if (!infoText) {
                return;
            }

            if (!marker) {
                marker = document.createElement('span');
                marker.className = markerClass;
                marker.tabIndex = 0;
                marker.innerHTML = '<span class="architecture-vpc-huawei-info-glyph" aria-hidden="true">i</span>';
                element.appendChild(marker);
            }

            let popover = marker.querySelector('.architecture-vpc-huawei-info-popover');

            if (!popover) {
                popover = document.createElement('span');
                popover.className = 'architecture-vpc-huawei-info-popover';
                popover.setAttribute('role', 'tooltip');
                marker.appendChild(popover);
            }

            if (!marker.dataset.infoBound) {
                marker.dataset.infoBound = 'true';
                marker.addEventListener('mouseenter', function () {
                    marker.classList.add('is-open');
                });
                marker.addEventListener('mouseleave', function () {
                    marker.classList.remove('is-open');
                });
                marker.addEventListener('focus', function () {
                    marker.classList.add('is-open');
                });
                marker.addEventListener('blur', function () {
                    marker.classList.remove('is-open');
                });
                marker.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    marker.classList.toggle('is-open');
                });
                marker.addEventListener('keydown', function (event) {
                    if (event.key !== 'Enter' && event.key !== ' ') {
                        return;
                    }

                    event.preventDefault();
                    event.stopPropagation();
                    marker.classList.toggle('is-open');
                });
            }

            marker.dataset.info = infoText;
            marker.setAttribute('role', 'button');
            marker.setAttribute('aria-label', 'More info: ' + infoText);
            popover.textContent = infoText;
        });
    }

    function createStageToneChip(iconClass, label, tone) {
        return [
            '<span class="architecture-vpc-huawei-score-tag architecture-vpc-huawei-score-tag-' + escapeHtml(tone) + '">',
            '<i class="' + escapeHtml(iconClass) + '" aria-hidden="true"></i>',
            '<span>' + escapeHtml(label) + '</span>',
            '</span>'
        ].join('');
    }

    function showError(message) {
        const errorState = byId('architectureVpcHuaweiErrorState');

        if (!errorState) {
            return;
        }

        errorState.textContent = message;
        setHidden(errorState, false);
    }

    function clearError() {
        setHidden(byId('architectureVpcHuaweiErrorState'), true);
    }

    function getPreset(presetId) {
        return core.getPreset(presetId);
    }

    function validateRequiredElements(root) {
        const missingIds = requiredIds.filter(function (id) {
            return !byId(id);
        });

        if (!root || missingIds.length > 0 || !core) {
            const message = 'Huawei Cloud architecture markup is incomplete: ' + missingIds.join(', ');

            if (window.console && window.console.warn) {
                window.console.warn(message);
            }

            return false;
        }

        return true;
    }

    function bindClick(id, handler) {
        const element = byId(id);

        if (element) {
            element.addEventListener('click', handler);
        }
    }

    function buildDefaultPrompt(preset) {
        const defaults = preset.defaults;
        const subnetText = defaults.vlans.join(', ');
        const services = [];

        if (defaults.wireless) {
            services.push('Cloud Container Engine (CCE)');
        }

        if (defaults.firewall) {
            services.push('security groups and network ACLs');
        }

        if (defaults.wan) {
            services.push('Enterprise Router');
        }

        if (defaults.monitoring) {
            services.push('Cloud Eye and CTS');
        }

        if (defaults.dhcpDns) {
            services.push('DEW KMS and CSMS');
        }

        if (defaults.hsrp) {
            services.push('WAF and DNS');
        }

        if (defaults.etherChannel) {
            services.push('Elastic Load Balance');
        }

        if (defaults.acl) {
            services.push('VPC flow logs');
        }

        if (defaults.nat) {
            services.push('NAT Gateway egress');
        }

        if (defaults.vpn) {
            services.push('Direct Connect or VPN');
        }

        return [
            'Create a ' + defaults.cloudSize + ' Huawei Cloud architecture across ' + defaults.accessBlocks + ' availability zones.',
            'Use VPC CIDR ' + defaults.trunkVlans + ' with ' + subnetText + '.',
            'Add ' + services.join(', ') + ', enterprise project ' + defaults.ospfArea + ', and ' + core.routingLabel(defaults.routingMode) + '.'
        ].join(' ');
    }

    function syncPresetDescription() {
        setText('architectureVpcHuaweiPresetDescription', getPreset(valueOf('architectureVpcHuaweiPreset')).description);
    }

    function collectValues() {
        return {
            preset: valueOf('architectureVpcHuaweiPreset'),
            presetLabel: getPreset(valueOf('architectureVpcHuaweiPreset')).label,
            cloudSize: valueOf('architectureVpcHuaweiSize'),
            accessBlocks: Number(valueOf('architectureVpcHuaweiAccessBlocks')),
            vlans: valueOf('architectureVpcHuaweiVlans'),
            wireless: checkedOf('architectureVpcHuaweiWireless'),
            firewall: checkedOf('architectureVpcHuaweiFirewall'),
            wan: checkedOf('architectureVpcHuaweiWan'),
            monitoring: checkedOf('architectureVpcHuaweiMonitoring'),
            dhcpDns: checkedOf('architectureVpcHuaweiDhcpDns'),
            routingMode: valueOf('architectureVpcHuaweiRouting'),
            hsrp: checkedOf('architectureVpcHuaweiHsrp'),
            etherChannel: checkedOf('architectureVpcHuaweiEtherChannel'),
            acl: checkedOf('architectureVpcHuaweiAcl'),
            nat: checkedOf('architectureVpcHuaweiNat'),
            vpn: checkedOf('architectureVpcHuaweiVpn'),
            trunkVlans: valueOf('architectureVpcHuaweiTrunkVlans'),
            nativeVlan: valueOf('architectureVpcHuaweiNativeVlan'),
            accessVlan: valueOf('architectureVpcHuaweiAccessVlan'),
            sviGateway: valueOf('architectureVpcHuaweiSviGateway'),
            ospfArea: valueOf('architectureVpcHuaweiOspfArea'),
            bgpAsn: valueOf('architectureVpcHuaweiBgpAsn'),
            redundancyVip: valueOf('architectureVpcHuaweiRedundancyVip'),
            prompt: valueOf('architectureVpcHuaweiPrompt')
        };
    }

    function syncControlsFromSpec(spec) {
        setValue('architectureVpcHuaweiPreset', spec.preset);
        setValue('architectureVpcHuaweiSize', spec.cloudSize);
        setValue('architectureVpcHuaweiAccessBlocks', spec.accessBlocks);
        setValue('architectureVpcHuaweiRouting', spec.routingMode);
        setValue('architectureVpcHuaweiVlans', spec.vlans.join('\n'));
        setChecked('architectureVpcHuaweiWireless', spec.wireless);
        setChecked('architectureVpcHuaweiFirewall', spec.firewall);
        setChecked('architectureVpcHuaweiWan', spec.wan);
        setChecked('architectureVpcHuaweiMonitoring', spec.monitoring);
        setChecked('architectureVpcHuaweiDhcpDns', spec.dhcpDns);
        setChecked('architectureVpcHuaweiHsrp', spec.hsrp);
        setChecked('architectureVpcHuaweiEtherChannel', spec.etherChannel);
        setChecked('architectureVpcHuaweiAcl', spec.acl);
        setChecked('architectureVpcHuaweiNat', spec.nat);
        setChecked('architectureVpcHuaweiVpn', spec.vpn);
        setValue('architectureVpcHuaweiTrunkVlans', spec.trunkVlans);
        setValue('architectureVpcHuaweiNativeVlan', spec.nativeVlan);
        setValue('architectureVpcHuaweiAccessVlan', spec.accessVlan);
        setValue('architectureVpcHuaweiSviGateway', spec.sviGateway);
        setValue('architectureVpcHuaweiOspfArea', spec.ospfArea);
        setValue('architectureVpcHuaweiBgpAsn', spec.bgpAsn);
        setValue('architectureVpcHuaweiRedundancyVip', spec.redundancyVip);

        if (spec.prompt) {
            setValue('architectureVpcHuaweiPrompt', spec.prompt);
        }

        syncPresetDescription();
    }

    function applyPreset(presetId, shouldRender) {
        const preset = getPreset(presetId);
        const spec = core.inferFromPrompt(Object.assign({}, preset.defaults, {
            preset: preset.id,
            presetLabel: preset.label,
            prompt: buildDefaultPrompt(preset)
        }));

        layoutOverrides = {};
        connectorOverrides = {};
        selectedNodeId = '';
        selectedNodeIds = [];
        selectedConnectorId = '';
        highlightedNodeId = '';
        highlightedNodeIds = [];
        stageDiagramHighlighted = false;
        clearStageUndoHistory();
        updateHighlightAllButton();
        syncControlsFromSpec(spec);

        if (shouldRender) {
            renderResult(spec, {
                autoFitStage: true
            });
        } else {
            renderPresetPreview(preset, {
                resetZoom: true
            });
        }
    }

    function getNodeById(nodeId) {
        if (!currentArchitecture) {
            return null;
        }

        return currentArchitecture.nodes.find(function (node) {
            return node.id === nodeId;
        }) || null;
    }

    function getGroupById(groupId) {
        if (!currentArchitecture) {
            return null;
        }

        return (currentArchitecture.groups || []).find(function (group) {
            return group.id === groupId;
        }) || null;
    }

    function getBaseSvgBounds(architecture) {
        const items = [].concat(architecture.groups || [], architecture.nodes || []);
        const maxX = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.x + item.width);
        }, architecture.width || 1120);
        const maxY = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.y + item.height);
        }, architecture.height || 840);

        return {
            width: Math.max(architecture.width || 1120, Math.ceil(maxX + 80)),
            height: Math.max(architecture.height || 840, Math.ceil(maxY + 80))
        };
    }

    function getDiagramItemById(itemId) {
        return getNodeById(itemId) || getGroupById(itemId);
    }

    function getAllDiagramItems() {
        if (!currentArchitecture) {
            return [];
        }

        return [].concat(currentArchitecture.groups || [], currentArchitecture.nodes || []).filter(Boolean);
    }

    function isDiagramGroup(itemId) {
        return getGroupById(itemId) !== null;
    }

    function isDiagramItemSelected(itemId) {
        return selectedNodeIds.includes(itemId) || selectedNodeId === itemId;
    }

    function normalizeSelectedNodeIds(nodeIds) {
        return Array.from(new Set((nodeIds || []).map(function (nodeId) {
            return String(nodeId || '').trim();
        }).filter(function (nodeId) {
            return nodeId !== '' && getDiagramItemById(nodeId) !== null;
        })));
    }

    function normalizeImportedStringArray(value) {
        if (!Array.isArray(value)) {
            return [];
        }

        return value.map(function (item) {
            return String(item || '').trim();
        }).filter(Boolean);
    }

    function readImportedVisualIds(payload, arrayKeys, scalarKeys) {
        const arrayKey = arrayKeys.find(function (key) {
            return Array.isArray(payload[key]);
        });

        if (arrayKey) {
            return normalizeImportedStringArray(payload[arrayKey]);
        }

        const scalarKey = scalarKeys.find(function (key) {
            return typeof payload[key] === 'string' && payload[key].trim() !== '';
        });

        return scalarKey ? [payload[scalarKey].trim()] : [];
    }

    function getImportedSelectedNodeIds(payload) {
        return readImportedVisualIds(payload, ['selected_node_ids', 'selectedNodeIds'], ['selected_node_id', 'selectedNodeId']);
    }

    function getImportedHighlightedNodeIds(payload) {
        return readImportedVisualIds(payload, ['highlighted_node_ids', 'highlightedNodeIds'], ['highlighted_node_id', 'highlightedNodeId']);
    }

    function getImportedSelectedConnectorId(payload) {
        const selectedConnectorIdKeys = ['selected_connector_id', 'selectedConnectorId'];
        const selectedConnectorIdKey = selectedConnectorIdKeys.find(function (key) {
            return typeof payload[key] === 'string' && payload[key].trim() !== '';
        });

        return selectedConnectorIdKey ? payload[selectedConnectorIdKey].trim() : '';
    }

    function setHighlightedNodeIds(nodeIds) {
        highlightedNodeIds = normalizeSelectedNodeIds(nodeIds);
        highlightedNodeId = highlightedNodeIds[0] || '';
        syncConnectorPayloadState();
    }

    function getSelectedDiagramItems() {
        return normalizeSelectedNodeIds(selectedNodeIds).map(function (nodeId) {
            return getDiagramItemById(nodeId);
        }).filter(Boolean);
    }

    function isDiagramItemInsideGroup(item, group) {
        if (!item || !group || item.id === group.id) {
            return false;
        }

        const centerX = item.x + (item.width / 2);
        const centerY = item.y + (item.height / 2);

        return centerX >= group.x &&
            centerX <= group.x + group.width &&
            centerY >= group.y &&
            centerY <= group.y + group.height;
    }

    function getMovableDiagramItems(itemId) {
        const item = getDiagramItemById(itemId);

        if (!item) {
            return [];
        }

        if (!isDiagramGroup(itemId)) {
            return [item];
        }

        return getAllDiagramItems().filter(function (candidate) {
            return candidate.id === itemId || isDiagramItemInsideGroup(candidate, item);
        });
    }

    function getSelectionMoveItems(itemId) {
        const selectedIds = selectedNodeIds.length > 1 && selectedNodeIds.includes(itemId)
            ? selectedNodeIds
            : [itemId];
        const seenItems = {};

        selectedIds.forEach(function (selectedId) {
            getMovableDiagramItems(selectedId).forEach(function (item) {
                seenItems[item.id] = item;
            });
        });

        return Object.keys(seenItems).map(function (id) {
            return seenItems[id];
        });
    }

    function writeMoveLayoutOverrides(items, deltaX, deltaY) {
        items.forEach(function (item) {
            layoutOverrides[item.id] = {
                x: Math.max(0, Math.round(item.x + deltaX)),
                y: Math.max(0, Math.round(item.y + deltaY)),
                width: item.width,
                height: item.height
            };
        });
    }

    function applyGroupLayoutOverrides(architecture) {
        return Object.assign({}, architecture, {
            groups: (architecture.groups || []).map(function (group) {
                const override = layoutOverrides[group.id];

                return override ? Object.assign({}, group, override) : group;
            })
        });
    }

    function nodeCenter(node) {
        return {
            x: node.x + (node.width / 2),
            y: node.y + (node.height / 2)
        };
    }

    function formatSvgNumber(value) {
        return Math.round(Number(value || 0) * 100) / 100;
    }

    function snapCoordinate(value) {
        return Math.round(Number(value || 0) / 4) * 4;
    }

    function clampConnectorRatio(value, fallback) {
        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            return fallback;
        }

        return Math.min(1, Math.max(0, parsed));
    }

    function normalizeConnectorRatio(value) {
        if (!value || typeof value !== 'object') {
            return null;
        }

        return {
            x: clampConnectorRatio(value.x, 0.5),
            y: clampConnectorRatio(value.y, 0.5)
        };
    }

    function normalizeConnectorBend(value) {
        if (!value || typeof value !== 'object') {
            return null;
        }

        const x = Number(value.x);
        const y = Number(value.y);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: x,
            y: y
        };
    }

    function connectorAnchor(source, target) {
        const start = nodeCenter(source);
        const end = nodeCenter(target);
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const sourceSide = deltaX >= 0 ? 'right' : 'left';
            const targetSide = deltaX >= 0 ? 'left' : 'right';

            return {
                source: getConnectorAnchorPoint(source, sourceSide, null),
                target: getConnectorAnchorPoint(target, targetSide, null),
                sourceSide: sourceSide,
                targetSide: targetSide,
                mode: 'horizontal'
            };
        }

        const sourceSide = deltaY >= 0 ? 'bottom' : 'top';
        const targetSide = deltaY >= 0 ? 'top' : 'bottom';

        return {
            source: getConnectorAnchorPoint(source, sourceSide, null),
            target: getConnectorAnchorPoint(target, targetSide, null),
            sourceSide: sourceSide,
            targetSide: targetSide,
            mode: 'vertical'
        };
    }

    function defaultConnectorRatio(side) {
        if (side === 'left') {
            return { x: 0, y: 0.5 };
        }

        if (side === 'right') {
            return { x: 1, y: 0.5 };
        }

        if (side === 'top') {
            return { x: 0.5, y: 0 };
        }

        return { x: 0.5, y: 1 };
    }

    function getConnectorAnchorPoint(item, side, ratio) {
        const safeRatio = normalizeConnectorRatio(ratio) || defaultConnectorRatio(side);

        if (side === 'left') {
            return {
                x: item.x,
                y: item.y + (item.height * safeRatio.y)
            };
        }

        if (side === 'right') {
            return {
                x: item.x + item.width,
                y: item.y + (item.height * safeRatio.y)
            };
        }

        if (side === 'top') {
            return {
                x: item.x + (item.width * safeRatio.x),
                y: item.y
            };
        }

        return {
            x: item.x + (item.width * safeRatio.x),
            y: item.y + item.height
        };
    }

    function buildConnectorAnchorRatio(item, side, point) {
        if (!item || !point || item.width <= 0 || item.height <= 0) {
            return defaultConnectorRatio(side);
        }

        if (side === 'left') {
            return {
                x: 0,
                y: clampConnectorRatio((point.y - item.y) / item.height, 0.5)
            };
        }

        if (side === 'right') {
            return {
                x: 1,
                y: clampConnectorRatio((point.y - item.y) / item.height, 0.5)
            };
        }

        if (side === 'top') {
            return {
                x: clampConnectorRatio((point.x - item.x) / item.width, 0.5),
                y: 0
            };
        }

        return {
            x: clampConnectorRatio((point.x - item.x) / item.width, 0.5),
            y: 1
        };
    }

    function getConnectorLeadPoint(point, side, distance) {
        if (side === 'left') {
            return {
                x: point.x - distance,
                y: point.y
            };
        }

        if (side === 'right') {
            return {
                x: point.x + distance,
                y: point.y
            };
        }

        if (side === 'top') {
            return {
                x: point.x,
                y: point.y - distance
            };
        }

        return {
            x: point.x,
            y: point.y + distance
        };
    }

    function pathFromPoints(points) {
        return points.map(function (point, index) {
            return (index === 0 ? 'M ' : 'L ') + formatSvgNumber(point.x) + ' ' + formatSvgNumber(point.y);
        }).join(' ');
    }

    function buildConnectorPathFromAnchors(start, end, sourceSide, targetSide) {
        const leadDistance = 28;
        const startLead = getConnectorLeadPoint(start, sourceSide, leadDistance);
        const endLead = getConnectorLeadPoint(end, targetSide, leadDistance);
        const sourceHorizontal = sourceSide === 'left' || sourceSide === 'right';
        const targetHorizontal = targetSide === 'left' || targetSide === 'right';
        const points = [start, startLead];

        if (sourceHorizontal && targetHorizontal) {
            const midX = startLead.x + ((endLead.x - startLead.x) * 0.5);

            points.push({ x: midX, y: startLead.y });
            points.push({ x: midX, y: endLead.y });
        } else if (!sourceHorizontal && !targetHorizontal) {
            const midY = startLead.y + ((endLead.y - startLead.y) * 0.5);

            points.push({ x: startLead.x, y: midY });
            points.push({ x: endLead.x, y: midY });
        } else {
            points.push({ x: endLead.x, y: startLead.y });
        }

        points.push(endLead);
        points.push(end);

        return pathFromPoints(points);
    }

    function buildConnectorPathFromAnchorsWithBend(start, end, sourceSide, targetSide, bend) {
        const leadDistance = 28;
        const startLead = getConnectorLeadPoint(start, sourceSide, leadDistance);
        const endLead = getConnectorLeadPoint(end, targetSide, leadDistance);
        const normalizedBend = normalizeConnectorBend(bend);

        if (!normalizedBend) {
            return buildConnectorPathFromAnchors(start, end, sourceSide, targetSide);
        }

        return pathFromPoints([
            start,
            startLead,
            { x: normalizedBend.x, y: startLead.y },
            normalizedBend,
            { x: endLead.x, y: normalizedBend.y },
            endLead,
            end
        ]);
    }

    function defaultConnectorBend(start, end, sourceSide, targetSide) {
        const leadDistance = 28;
        const startLead = getConnectorLeadPoint(start, sourceSide, leadDistance);
        const endLead = getConnectorLeadPoint(end, targetSide, leadDistance);

        return {
            x: snapCoordinate(startLead.x + ((endLead.x - startLead.x) * 0.5)),
            y: snapCoordinate(startLead.y + ((endLead.y - startLead.y) * 0.5))
        };
    }

    function connectorGeometry(source, target, override) {
        const anchors = connectorAnchor(source, target);
        const safeOverride = override && typeof override === 'object' ? override : {};
        const sourceRatio = normalizeConnectorRatio(safeOverride.sourceRatio || safeOverride.source_ratio);
        const targetRatio = normalizeConnectorRatio(safeOverride.targetRatio || safeOverride.target_ratio);
        const start = getConnectorAnchorPoint(source, anchors.sourceSide, sourceRatio);
        const end = getConnectorAnchorPoint(target, anchors.targetSide, targetRatio);
        const bend = normalizeConnectorBend(safeOverride.bend);

        return {
            start: start,
            end: end,
            sourceSide: anchors.sourceSide,
            targetSide: anchors.targetSide,
            sourceRatio: sourceRatio || defaultConnectorRatio(anchors.sourceSide),
            targetRatio: targetRatio || defaultConnectorRatio(anchors.targetSide),
            bend: bend,
            bendHandle: bend || defaultConnectorBend(start, end, anchors.sourceSide, anchors.targetSide),
            path: buildConnectorPathFromAnchorsWithBend(start, end, anchors.sourceSide, anchors.targetSide, bend),
            label: bend || {
                x: start.x + ((end.x - start.x) * 0.5),
                y: start.y + ((end.y - start.y) * 0.5) - 8
            }
        };
    }

    function iconMarkup(key) {
        return iconSvgMap[key] || iconSvgMap.vpc || '';
    }

    function connectorLabelWidth(label) {
        return Math.min(168, Math.max(54, String(label || '').length * 6.6 + 18));
    }

    function diagramStyleMarkup() {
        return [
            '<style>',
            '.architecture-vpc-huawei-canvas-bg{fill:transparent;}',
            '.architecture-vpc-huawei-diagram-group-card{fill:#ffffff;stroke:#fecaca;stroke-width:1.2;stroke-dasharray:0;}',
            '.architecture-vpc-huawei-diagram-group-region .architecture-vpc-huawei-diagram-group-card{fill:#fff7f7;stroke:#ef4444;}',
            '.architecture-vpc-huawei-diagram-group-vpc .architecture-vpc-huawei-diagram-group-card{fill:#fff1f2;stroke:#C7000B;stroke-width:1.8;}',
            '.architecture-vpc-huawei-diagram-group-edge .architecture-vpc-huawei-diagram-group-card{fill:#f6f2ff;stroke:#a56eff;}',
            '.architecture-vpc-huawei-diagram-group-public .architecture-vpc-huawei-diagram-group-card{fill:#F8FAFC;stroke:#111827;}',
            '.architecture-vpc-huawei-diagram-group-private .architecture-vpc-huawei-diagram-group-card{fill:#fff8e1;stroke:#f1c21b;}',
            '.architecture-vpc-huawei-diagram-group-data .architecture-vpc-huawei-diagram-group-card{fill:#f7f3ff;stroke:#8a3ffc;}',
            '.architecture-vpc-huawei-diagram-group-services .architecture-vpc-huawei-diagram-group-card{fill:#f2fbf9;stroke:#334155;}',
            '.architecture-vpc-huawei-diagram-group-external .architecture-vpc-huawei-diagram-group-card{fill:#f6f8fa;stroke:#a2a9b0;}',
            '.architecture-vpc-huawei-diagram-group-title{fill:#0f1f35;font:800 14px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-vpc-huawei-diagram-group-subtitle{fill:#556b82;font:600 12px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-vpc-huawei-node-outline{fill:#fff;stroke:#ef4444;stroke-width:1.4;filter:url(#architectureVpcHuaweiCardShadow);}',
            '.architecture-vpc-huawei-connector-group{cursor:pointer;outline:none;}',
            '.architecture-vpc-huawei-connector-hit{fill:none;stroke:transparent;stroke-width:18;stroke-linecap:round;stroke-linejoin:round;pointer-events:stroke;vector-effect:non-scaling-stroke;}',
            '.architecture-vpc-huawei-connector{fill:none;stroke:#111827;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round;opacity:0.88;pointer-events:stroke;vector-effect:non-scaling-stroke;}',
            '.architecture-vpc-huawei-connector-label-bg{fill:#fff;stroke:#fecaca;stroke-width:1;}',
            '.architecture-vpc-huawei-connector-label{fill:#1f3349;font:700 11px Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;letter-spacing:0;}',
            '.architecture-vpc-huawei-connector-group.is-selected .architecture-vpc-huawei-connector{stroke:#111827;stroke-width:2;opacity:1;}',
            '.architecture-vpc-huawei-connector-group.is-selected .architecture-vpc-huawei-connector-label-bg{fill:#fff;stroke:#C7000B;stroke-width:2;}',
            '.architecture-vpc-huawei-connector-group.is-selected .architecture-vpc-huawei-connector-label{fill:#0f172a;}',
            '.architecture-vpc-huawei-diagram-group,.architecture-vpc-huawei-node-shell{cursor:grab;}',
            '.architecture-vpc-huawei-diagram-hitbox{fill:transparent;pointer-events:all;vector-effect:non-scaling-stroke;}',
            '.architecture-vpc-huawei-diagram-group:active,.architecture-vpc-huawei-node-shell:active{cursor:grabbing;}',
            '.architecture-vpc-huawei-diagram-group.is-selected .architecture-vpc-huawei-diagram-hitbox,.architecture-vpc-huawei-node-shell.is-selected .architecture-vpc-huawei-diagram-hitbox{stroke:#C7000B;stroke-width:3;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-diagram-group.is-highlighted .architecture-vpc-huawei-diagram-hitbox,.architecture-vpc-huawei-node-shell.is-highlighted .architecture-vpc-huawei-diagram-hitbox{stroke:#334155;stroke-width:3;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-diagram-group.is-marquee-target .architecture-vpc-huawei-diagram-hitbox,.architecture-vpc-huawei-node-shell.is-marquee-target .architecture-vpc-huawei-diagram-hitbox{stroke:#C7000B;stroke-width:3;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-diagram-group.is-selected .architecture-vpc-huawei-diagram-group-card{stroke:#C7000B;stroke-width:2.8;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-diagram-group.is-highlighted .architecture-vpc-huawei-diagram-group-card{stroke:#334155;stroke-width:2.8;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-diagram-group.is-marquee-target .architecture-vpc-huawei-diagram-group-card{stroke:#C7000B;stroke-width:2.8;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-node-shell.is-marquee-target .architecture-vpc-huawei-node-outline{stroke:#C7000B;stroke-width:2.8;stroke-dasharray:10 7;}',
            '.architecture-vpc-huawei-resize-handle{fill:#fff;stroke:#C7000B;stroke-width:2;cursor:nwse-resize;filter:url(#architectureVpcHuaweiCardShadow);}',
            '.architecture-vpc-huawei-stage-highlighted .architecture-vpc-huawei-diagram-group-card{stroke:#C7000B;stroke-width:2.2;}',
            '.architecture-vpc-huawei-stage-highlighted .architecture-vpc-huawei-node-outline{stroke:#C7000B;stroke-width:2.8;}',
            '.architecture-vpc-huawei-stage-highlighted .architecture-vpc-huawei-connector{stroke:#111827;stroke-width:1.65;opacity:0.96;}',
            '</style>'
        ].join('');
    }

    function diagramItemDataAttributes(item) {
        return [
            'data-node-id="' + escapeHtml(item.id) + '"',
            'data-node-x="' + formatSvgNumber(item.x) + '"',
            'data-node-y="' + formatSvgNumber(item.y) + '"',
            'data-node-width="' + formatSvgNumber(item.width) + '"',
            'data-node-height="' + formatSvgNumber(item.height) + '"'
        ].join(' ');
    }

    function renderDiagramGroup(group) {
        const subtitle = String(group.subtitle || '').trim();
        const classes = [
            'architecture-vpc-huawei-diagram-group',
            'architecture-vpc-huawei-diagram-group-' + (group.tone || 'default'),
            isDiagramItemSelected(group.id) ? 'is-selected' : '',
            highlightedNodeIds.includes(group.id) || stageDiagramHighlighted ? 'is-highlighted' : ''
        ].filter(Boolean).join(' ');

        return [
            '<g class="' + escapeHtml(classes) + '" ' + diagramItemDataAttributes(group) + ' tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml(group.title || '') + '">',
            '<rect class="architecture-vpc-huawei-diagram-group-card" x="' + group.x + '" y="' + group.y + '" width="' + group.width + '" height="' + group.height + '" rx="18" />',
            '<text class="architecture-vpc-huawei-diagram-group-title" x="' + (group.x + 18) + '" y="' + (group.y + 28) + '">' + escapeHtml(group.title || '') + '</text>',
            subtitle ? '<text class="architecture-vpc-huawei-diagram-group-subtitle" x="' + (group.x + 18) + '" y="' + (group.y + 48) + '">' + escapeHtml(subtitle) + '</text>' : '',
            '<rect class="architecture-vpc-huawei-diagram-hitbox" x="' + group.x + '" y="' + group.y + '" width="' + group.width + '" height="' + group.height + '" rx="18" />',
            '</g>'
        ].join('');
    }

    function renderResizeHandle(item) {
        return [
            '<rect class="architecture-vpc-huawei-resize-handle" data-node-id="' + escapeHtml(item.id) + '" x="' + formatSvgNumber(item.x + item.width - 14) + '" y="' + formatSvgNumber(item.y + item.height - 14) + '" width="14" height="14" rx="4" aria-hidden="true" />'
        ].join('');
    }

    function renderConnectorEditHandles(connectorId, geometry) {
        const bend = geometry.bendHandle;

        return [
            '<circle class="diagram-connector-anchor-handle architecture-vpc-huawei-connector-anchor-handle" data-connector-id="' + escapeHtml(connectorId) + '" data-endpoint="source" cx="' + formatSvgNumber(geometry.start.x) + '" cy="' + formatSvgNumber(geometry.start.y) + '" r="9" />',
            '<circle class="diagram-connector-anchor-handle architecture-vpc-huawei-connector-anchor-handle" data-connector-id="' + escapeHtml(connectorId) + '" data-endpoint="target" cx="' + formatSvgNumber(geometry.end.x) + '" cy="' + formatSvgNumber(geometry.end.y) + '" r="9" />',
            '<rect class="diagram-connector-bend-handle architecture-vpc-huawei-connector-bend-handle" data-connector-id="' + escapeHtml(connectorId) + '" x="' + formatSvgNumber(bend.x - 9) + '" y="' + formatSvgNumber(bend.y - 9) + '" width="18" height="18" rx="5" />'
        ].join('');
    }

    function computeSvgBounds(architecture) {
        const items = [].concat(architecture.groups || [], architecture.nodes || []).filter(Boolean);
        const maxX = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.x + item.width);
        }, architecture.width || 1120);
        const maxY = items.reduce(function (currentMax, item) {
            return Math.max(currentMax, item.y + item.height);
        }, architecture.height || 840);

        return {
            width: Math.max(architecture.width || 1120, Math.ceil(maxX + 80)),
            height: Math.max(architecture.height || 840, Math.ceil(maxY + 80))
        };
    }

    function computeDiagramContentBounds(architecture, padding) {
        const items = [].concat(architecture.groups || [], architecture.nodes || []).filter(Boolean);
        const safePadding = Number.isFinite(padding) ? Math.max(0, padding) : 0;
        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = 0;
        let maxY = 0;

        items.forEach(function (item) {
            if (!Number.isFinite(item.x) || !Number.isFinite(item.y) || !Number.isFinite(item.width) || !Number.isFinite(item.height)) {
                return;
            }

            minX = Math.min(minX, item.x);
            minY = Math.min(minY, item.y);
            maxX = Math.max(maxX, item.x + item.width);
            maxY = Math.max(maxY, item.y + item.height);
        });

        if (!Number.isFinite(minX) || !Number.isFinite(minY) || maxX <= minX || maxY <= minY) {
            return null;
        }

        return {
            x: minX - safePadding,
            y: minY - safePadding,
            width: (maxX - minX) + (safePadding * 2),
            height: (maxY - minY) + (safePadding * 2)
        };
    }

    function scrollStageToBounds(bounds, behavior) {
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');
        const svg = stageCanvas ? stageCanvas.querySelector('svg') : null;
        const viewBox = svg && svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : null;
        const renderedWidth = svg ? svg.getBoundingClientRect().width : 0;

        if (!stageCanvas || !svg || !bounds || !viewBox || viewBox.width <= 0 || renderedWidth <= 0 || typeof stageCanvas.scrollTo !== 'function') {
            return;
        }

        const scale = renderedWidth / viewBox.width;

        if (!Number.isFinite(scale) || scale <= 0) {
            return;
        }

        stageCanvas.scrollTo({
            left: Math.max(0, ((bounds.x + (bounds.width / 2)) * scale) - (stageCanvas.clientWidth / 2)),
            top: Math.max(0, ((bounds.y + (bounds.height / 2)) * scale) - (stageCanvas.clientHeight / 2)),
            behavior: behavior || 'auto'
        });
    }

    function buildSvgMarkup(architecture, options) {
        const renderOptions = options || {};
        const svgBounds = computeSvgBounds(architecture);
        const nodeMap = {};
        const groupMarkup = [];
        const connectorMarkup = [];
        const nodeMarkup = [];
        const resizeHandleMarkup = [];
        const connectorHandleMarkup = [];

        (architecture.groups || []).forEach(function (group) {
            groupMarkup.push(renderDiagramGroup(group));
        });

        architecture.nodes.forEach(function (node) {
            nodeMap[node.id] = node;
        });

        architecture.connectors.forEach(function (connector) {
            const source = nodeMap[connector.from];
            const target = nodeMap[connector.to];

            if (!source || !target) {
                return;
            }

            const connectorId = String(connector.id || '').trim();
            const override = connectorOverrides[connectorId] || {};
            const geometry = connectorGeometry(source, target, override);
            const label = geometry.label;
            const labelWidth = connectorLabelWidth(connector.label);
            const connectorPathValue = geometry.path;
            const connectorClasses = [
                'architecture-vpc-huawei-connector-group',
                selectedConnectorId === connectorId ? 'is-selected' : ''
            ].filter(Boolean).join(' ');

            connectorMarkup.push([
                '<g class="' + connectorClasses + '" data-connector-id="' + escapeHtml(connectorId) + '" data-source-node-id="' + escapeHtml(connector.from) + '" data-target-node-id="' + escapeHtml(connector.to) + '" data-source-side="' + escapeHtml(geometry.sourceSide) + '" data-target-side="' + escapeHtml(geometry.targetSide) + '" tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml((connector.label || 'Connector') + ' connector') + '">',
                '<path class="diagram-connector-hit-target architecture-vpc-huawei-connector-hit" d="' + connectorPathValue + '" />',
                '<path class="diagram-connector diagram-connector-active architecture-vpc-huawei-connector' + (selectedConnectorId === connectorId ? ' is-selected' : '') + '" d="' + connectorPathValue + '" marker-end="url(#architectureVpcHuaweiArrow)" />',
                '<rect class="architecture-vpc-huawei-connector-label-bg" x="' + formatSvgNumber(label.x - (labelWidth / 2)) + '" y="' + formatSvgNumber(label.y - 15) + '" width="' + formatSvgNumber(labelWidth) + '" height="18" rx="9" />',
                '<text class="architecture-vpc-huawei-connector-label" x="' + label.x + '" y="' + label.y + '" text-anchor="middle">' + escapeHtml(connector.label) + '</text>',
                '</g>'
            ].join(''));

            if (renderOptions.includeEditHandles === true && selectedConnectorId === connectorId) {
                connectorHandleMarkup.push(renderConnectorEditHandles(connectorId, geometry));
            }
        });

        architecture.nodes.forEach(function (node) {
            const classes = [
                'architecture-vpc-huawei-node-shell',
                isDiagramItemSelected(node.id) ? 'is-selected' : '',
                highlightedNodeIds.includes(node.id) || stageDiagramHighlighted ? 'is-highlighted' : ''
            ].filter(Boolean).join(' ');

            nodeMarkup.push([
                '<g class="' + classes + '" ' + diagramItemDataAttributes(node) + ' tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml(node.title) + '">',
                '<rect class="architecture-vpc-huawei-node-outline" x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '" rx="10" />',
                '<foreignObject x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '">',
                '<div xmlns="http://www.w3.org/1999/xhtml" class="architecture-vpc-huawei-node-card">',
                '<div class="architecture-vpc-huawei-node-icon">' + iconMarkup(node.icon) + '</div>',
                '<div class="architecture-vpc-huawei-node-copy">',
                '<div class="architecture-vpc-huawei-node-title">' + escapeHtml(node.title) + '</div>',
                '<div class="architecture-vpc-huawei-node-subtitle" title="' + escapeHtml(node.subtitle) + '">' + escapeHtml(node.subtitle) + '</div>',
                '</div>',
                '</div>',
                '</foreignObject>',
                '<rect class="architecture-vpc-huawei-diagram-hitbox" x="' + node.x + '" y="' + node.y + '" width="' + node.width + '" height="' + node.height + '" rx="10" />',
                '</g>'
            ].join(''));
        });

        if (renderOptions.includeEditHandles === true) {
            (architecture.groups || []).forEach(function (group) {
                if (group.id === selectedNodeId) {
                    resizeHandleMarkup.push(renderResizeHandle(group));
                }
            });

            architecture.nodes.forEach(function (node) {
                if (node.id === selectedNodeId) {
                    resizeHandleMarkup.push(renderResizeHandle(node));
                }
            });
        }

        return [
            '<svg xmlns="http://www.w3.org/2000/svg" class="architecture-vpc-huawei-stage-svg' + (stageDiagramHighlighted ? ' architecture-vpc-huawei-stage-highlighted' : '') + '" viewBox="0 0 ' + svgBounds.width + ' ' + svgBounds.height + '" width="' + svgBounds.width + '" height="' + svgBounds.height + '" role="img" aria-label="Huawei Cloud architecture">',
            '<defs>',
            '<filter id="architectureVpcHuaweiSoftShadow" x="-10%" y="-10%" width="120%" height="125%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.10"/></filter>',
            '<filter id="architectureVpcHuaweiCardShadow" x="-18%" y="-18%" width="136%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.12"/></filter>',
            '<marker id="architectureVpcHuaweiArrow" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">',
                '<path d="M 0 0 L 11 5.5 L 0 11 z" fill="#111827"></path>',
                '</marker>',
            '</defs>',
            diagramStyleMarkup(),
            '<rect class="architecture-vpc-huawei-canvas-bg" x="0" y="0" width="' + svgBounds.width + '" height="' + svgBounds.height + '" />',
            groupMarkup.join(''),
            connectorMarkup.join(''),
            nodeMarkup.join(''),
            resizeHandleMarkup.join(''),
            connectorHandleMarkup.join(''),
            '</svg>'
        ].join('');
    }

    function setStageZoom(nextZoom) {
        const parsed = Number(nextZoom);

        stageZoom = Math.min(240, Math.max(15, Number.isFinite(parsed) ? parsed : 50));
        setValue('architectureVpcHuaweiZoomInput', stageZoom);
        setText('architectureVpcHuaweiZoomLabel', '%');
        applyStageZoom();
    }

    function applyStageZoom() {
        const svg = byId('architectureVpcHuaweiStageCanvas') ? byId('architectureVpcHuaweiStageCanvas').querySelector('svg') : null;
        const architecture = currentArchitecture || previewArchitecture;

        if (!svg || !architecture) {
            return;
        }

        const bounds = computeSvgBounds(architecture);

        svg.style.width = Math.round(bounds.width * (stageZoom / 100)) + 'px';
        svg.style.height = Math.round(bounds.height * (stageZoom / 100)) + 'px';
    }

    function setStageZoomToFit(options) {
        const fitOptions = options || {};
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');
        const architecture = currentArchitecture || previewArchitecture;

        if (!stageCanvas || !architecture) {
            setStageZoom(50);
            return;
        }

        if (stageCanvas.clientWidth <= 0 || stageCanvas.clientHeight <= 0) {
            applyStageZoom();

            if (fitOptions.defer !== false && typeof window.requestAnimationFrame === 'function') {
                window.requestAnimationFrame(function () {
                    setStageZoomToFit(Object.assign({}, fitOptions, {
                        defer: false
                    }));
                });
            }

            return;
        }

        const availableWidth = Math.max(1, stageCanvas.clientWidth - 48);
        const availableHeight = Math.max(1, stageCanvas.clientHeight - 48);
        const bounds = computeDiagramContentBounds(architecture, 42) || computeSvgBounds(architecture);
        const widthZoom = (availableWidth / bounds.width) * 100;
        const heightZoom = (availableHeight / bounds.height) * 100;

        setStageZoom(Math.floor(Math.min(widthZoom, heightZoom, 100)));
        window.requestAnimationFrame(function () {
            scrollStageToBounds(bounds, 'auto');
        });
    }

    function renderStage(architecture) {
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

        if (!stageCanvas) {
            return;
        }

        currentSvgMarkup = buildSvgMarkup(architecture);
        stageCanvas.classList.remove('architecture-vpc-huawei-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(architecture, {
            includeEditHandles: true
        });
        applyStageZoom();
        bindStageNodes(stageCanvas);
        bindStageMarqueeSelection(stageCanvas);
        focusPendingStageNode(stageCanvas);
    }

    function renderStageHeader(spec) {
        const stageTitle = byId('architectureVpcHuaweiStageTitle');
        const stageSubtitle = byId('architectureVpcHuaweiStageSubtitle');
        const presetChipLabel = String(spec.presetLabel || 'Custom architecture').trim() + ' preset';

        if (stageTitle) {
            stageTitle.textContent = 'Huawei Cloud VPC Architecture';
        }

        if (stageSubtitle) {
            stageSubtitle.hidden = false;
            stageSubtitle.innerHTML = '<span class="architecture-vpc-huawei-stage-preset-chip" title="' + escapeHtml(presetChipLabel) + '">' + escapeHtml(presetChipLabel) + '</span>';
        }

        const meta = byId('architectureVpcHuaweiStageMeta');

        if (!meta) {
            return;
        }

        meta.innerHTML = [
            createStageToneChip('bi bi-cloud', core.cloudSizeLabel(spec.cloudSize), 'size'),
            createStageToneChip('bi bi-grid-3x3-gap', core.zoneCountLabel(spec.accessBlocks), 'blocks'),
            createStageToneChip('bi bi-arrow-left-right', core.routingLabel(spec.routingMode), 'routing'),
            createStageToneChip('bi bi-diagram-3', spec.vlans.length + ' subnet tiers', 'services'),
            createStageToneChip('bi bi-shield-check', [spec.hsrp ? 'WAF' : '', spec.etherChannel ? 'Elastic Load Balance' : ''].filter(Boolean).join(' + ') || 'VPC ' + spec.trunkVlans, 'redundancy')
        ].join('');
    }

    function renderInventory() {
        const tableBody = byId('architectureVpcHuaweiInventoryTableBody');
        const sortMode = valueOf('architectureVpcHuaweiInventorySort') || 'id';
        const rows = currentInventory.slice().sort(function (a, b) {
            if (sortMode === 'alphabetical' || sortMode === 'component') {
                return a.component.localeCompare(b.component);
            }

            if (sortMode === 'placement') {
                return a.placement.localeCompare(b.placement);
            }

            if (sortMode === 'purpose') {
                return a.purpose.localeCompare(b.purpose);
            }

            return a.index - b.index;
        });

        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = rows.map(function (row) {
            const copyText = [
                '#' + row.index + ' ' + row.component,
                'Placement: ' + row.placement,
                'Purpose: ' + row.purpose
            ].join('\n');

            return [
                '<tr>',
                '<td>' + row.index + '</td>',
                '<td>' + escapeHtml(row.component) + '</td>',
                '<td>' + escapeHtml(row.placement) + '</td>',
                '<td>' + escapeHtml(row.purpose) + '</td>',
                '<td class="tool-table-action-cell"><button type="button" class="architecture-vpc-huawei-row-copy" data-copy-row="' + escapeHtml(copyText) + '" aria-label="Copy inventory row for ' + escapeHtml(row.component) + '"><i class="bi bi-clipboard" aria-hidden="true"></i><span class="architecture-vpc-huawei-visually-hidden">Copy</span></button></td>',
                '</tr>'
            ].join('');
        }).join('');

        all('[data-copy-row]', tableBody).forEach(function (button) {
            button.addEventListener('click', function () {
                const label = button.querySelector('span') || button;

                copyTextToClipboard(button.dataset.copyRow || '').then(function () {
                    flashButton(label, 'Copied');
                }).catch(function () {
                    flashButton(label, 'Failed');
                });
            });
        });
    }

    function setInventorySortMode(sortMode) {
        const nextSortMode = ['id', 'alphabetical', 'component', 'placement', 'purpose'].includes(sortMode) ? sortMode : 'id';
        const hiddenInput = byId('architectureVpcHuaweiInventorySort');
        const summary = byId('architectureVpcHuaweiInventorySortSummary');
        const sortSelect = byId('architectureVpcHuaweiInventorySortSelect');
        const sortOptions = all('.architecture-vpc-huawei-sort-option');
        const activeOption = sortOptions.find(function (option) {
            return option.dataset.sortValue === nextSortMode;
        }) || sortOptions[0];

        if (hiddenInput) {
            hiddenInput.value = nextSortMode;
        }

        if (summary && activeOption) {
            summary.textContent = activeOption.textContent;
        }

        sortOptions.forEach(function (option) {
            const isActive = option === activeOption;

            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        if (sortSelect) {
            sortSelect.removeAttribute('open');
        }

        renderInventory();
    }

    function renderList(id, items) {
        const list = byId(id);

        if (!list) {
            return;
        }

        list.innerHTML = (items || []).map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('');
    }

    function renderNotes() {
        setText('architectureVpcHuaweiPromptSummary', currentNotes.summary || '');
        renderList('architectureVpcHuaweiKeywordList', currentNotes.keywords);
        renderList('architectureVpcHuaweiAssumptionList', currentNotes.assumptions);
        renderList('architectureVpcHuaweiModelList', currentNotes.model);
        renderList('architectureVpcHuaweiProsList', currentNotes.pros);
        renderList('architectureVpcHuaweiConsList', currentNotes.cons);
    }

    function scoreTone(score) {
        if (score >= 82) {
            return 'ready';
        }

        if (score >= 68) {
            return 'solid';
        }

        return 'review';
    }

    function scoreStatusIcon(tone) {
        return {
            ready: 'bi bi-check-circle',
            solid: 'bi bi-exclamation-triangle',
            review: 'bi bi-exclamation-triangle'
        }[tone] || 'bi bi-info-circle';
    }

    function scoreBand(tone) {
        return {
            ready: 'Strong production baseline',
            solid: 'Solid production-ready baseline',
            review: 'Needs architecture review'
        }[tone] || 'Cloud architecture draft';
    }

    function scoreDetail(tone) {
        return {
            ready: 'Private tiers, managed services, and observability are in place for a polished delivery.',
            solid: 'The architecture is delivery-ready with a few remaining resilience or routing trade-offs.',
            review: 'Review zone spread, ingress controls, and operational visibility before handoff.'
        }[tone] || 'The architecture baseline is ready for review.';
    }

    function buildScoreTags(spec, tone) {
        const tags = [
            {
                tone: 'status-' + tone,
                icon: scoreStatusIcon(tone),
                label: tone === 'ready' ? 'Production Ready' : tone === 'solid' ? 'Delivery' : 'Needs work'
            },
            {
                tone: 'size',
                icon: 'bi bi-building',
                label: core.cloudSizeLabel(spec.cloudSize)
            },
            {
                tone: 'blocks',
                icon: 'bi bi-grid-3x3-gap',
                label: core.zoneCountLabel(spec.accessBlocks)
            },
            {
                tone: 'routing',
                icon: 'bi bi-arrow-left-right',
                label: core.routingLabel(spec.routingMode)
            }
        ];

        if (spec.hsrp || spec.etherChannel) {
            tags.push({
                tone: 'redundancy',
                icon: 'bi bi-shield-check',
                label: [spec.hsrp ? 'WAF' : '', spec.etherChannel ? 'Elastic Load Balance' : ''].filter(Boolean).join(' + ')
            });
        }

        if (spec.firewall || spec.monitoring || spec.dhcpDns) {
            tags.push({
                tone: 'services',
                icon: 'bi bi-hdd-network',
                label: 'Services'
            });
        }

        return tags;
    }

    function renderScore(spec) {
        const score = core.buildArchitectureScore(spec);
        const status = byId('architectureVpcHuaweiOutputStatus');
        const tone = scoreTone(score.score);
        const ringProgressAngle = Math.round(Math.max(0, Math.min(100, score.score)) * 3.6);
        const tags = buildScoreTags(currentSpec || spec, tone);
        const resultTone = {
            ready: 'success',
            solid: 'ready',
            review: 'need-work'
        }[tone] || 'need-work';
        const chipTone = function (tagTone) {
            if (tagTone === 'status-ready') {
                return 'success';
            }

            if (tagTone === 'status-solid') {
                return 'ready';
            }

            if (tagTone === 'status-review') {
                return 'need-work';
            }

            return 'baseline';
        };
        const renderTagChip = function (tag) {
            return [
                '<span class="architecture-vpc-huawei-result-chip architecture-vpc-huawei-result-chip-' + chipTone(tag.tone) + '">',
                '<span class="architecture-vpc-huawei-result-chip-icon"><i class="' + escapeHtml(tag.icon) + '" aria-hidden="true"></i></span>',
                escapeHtml(tag.label),
                '</span>'
            ].join('');
        };
        const detail = scoreDetail(tone);
        const primaryChip = tags.slice(0, 1).map(renderTagChip).join('');
        const summaryChips = tags.slice(0, 6).map(renderTagChip).join('');
        const serviceLabels = [
            spec.firewall ? 'WAF' : '',
            spec.etherChannel ? 'Elastic Load Balance' : '',
            spec.monitoring ? 'Cloud Eye' : '',
            spec.dhcpDns ? 'DNS' : ''
        ].filter(Boolean);
        const metricCards = [
            {
                label: 'Scale',
                value: core.cloudSizeLabel(spec.cloudSize),
                copy: 'Selected cloud deployment size.',
                icon: 'bi bi-building',
                tone: 'success'
            },
            {
                label: 'Zones',
                value: core.zoneCountLabel(spec.accessBlocks),
                copy: 'Availability spread in the model.',
                icon: 'bi bi-grid-3x3-gap',
                tone: 'info'
            },
            {
                label: 'Routing',
                value: core.routingLabel(spec.routingMode),
                copy: 'Traffic control approach.',
                icon: 'bi bi-arrow-left-right',
                tone: 'accent-tone'
            },
            {
                label: 'Services',
                value: String(serviceLabels.length),
                copy: serviceLabels.length ? serviceLabels.join(', ') : 'No optional services selected.',
                icon: 'bi bi-hdd-network',
                tone: 'warning'
            }
        ].map(function (metric) {
            return [
                '<article class="architecture-vpc-huawei-result-metric-card architecture-vpc-huawei-result-metric-' + escapeHtml(metric.tone) + '">',
                '<span class="architecture-vpc-huawei-result-metric-icon" aria-hidden="true"><i class="' + escapeHtml(metric.icon) + '"></i></span>',
                '<span class="architecture-vpc-huawei-result-metric-label">' + escapeHtml(metric.label) + '</span>',
                '<strong class="architecture-vpc-huawei-result-metric-value">' + escapeHtml(metric.value) + '</strong>',
                '<span class="architecture-vpc-huawei-result-metric-copy">' + escapeHtml(metric.copy) + '</span>',
                '<span class="architecture-vpc-huawei-result-metric-accent" aria-hidden="true"></span>',
                '</article>'
            ].join('');
        }).join('');

        if (!status) {
            return;
        }

        status.className = 'architecture-vpc-huawei-score-card architecture-vpc-huawei-result-summary';
        status.dataset.resultTone = resultTone;
        status.dataset.resultLayout = 'architecture_score';
        status.innerHTML = [
            '<header class="architecture-vpc-huawei-result-header" aria-label="Result summary header">',
            '<div class="architecture-vpc-huawei-result-header-main">',
            '<span class="architecture-vpc-huawei-result-header-icon" aria-hidden="true"><i class="bi bi-diagram-3"></i></span>',
            '<div class="architecture-vpc-huawei-result-header-copy">',
            '<h2 class="architecture-vpc-huawei-result-header-title">Result Summary</h2>',
            '<p>Overview of the current architecture result and key metrics.</p>',
            '</div>',
            '</div>',
            '<div class="architecture-vpc-huawei-result-header-meta" aria-label="Result summary status">',
            '<span class="architecture-vpc-huawei-result-header-chip architecture-vpc-huawei-result-chip architecture-vpc-huawei-result-chip-ready"><span class="architecture-vpc-huawei-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span>',
            '<span class="architecture-vpc-huawei-result-header-chip architecture-vpc-huawei-result-chip architecture-vpc-huawei-result-chip-updated"><span class="architecture-vpc-huawei-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>Ready</span></span>',
            '</div>',
            '</header>',
            '<div class="architecture-vpc-huawei-result-hero-grid" aria-live="polite">',
            '<article class="architecture-vpc-huawei-result-card architecture-vpc-huawei-result-card-primary" data-result-visual="ring" aria-label="Primary result">',
            '<div class="architecture-vpc-huawei-result-primary-heading architecture-vpc-huawei-result-visual-copy architecture-vpc-huawei-result-visual-copy-top">',
            '<div class="architecture-vpc-huawei-result-kicker">Primary Result</div>',
            '<h3 class="architecture-vpc-huawei-result-title architecture-vpc-huawei-result-title-center">' + escapeHtml(score.label) + '</h3>',
            '</div>',
            '<div class="architecture-vpc-huawei-result-primary-visual" id="architectureVpcHuaweiResultVisual" aria-label="Primary result visual">',
            '<div class="architecture-vpc-huawei-result-ring architecture-vpc-huawei-score-value" id="architectureVpcHuaweiScoreValue" style="--architecture-vpc-huawei-result-progress: ' + escapeHtml(String(ringProgressAngle)) + 'deg; --progress-angle: ' + escapeHtml(String(ringProgressAngle)) + 'deg;" aria-label="Architecture score ' + escapeHtml(String(score.score)) + ' out of 100">',
            '<div class="architecture-vpc-huawei-score-echart" id="architectureVpcHuaweiScoreEchart" aria-hidden="true"></div>',
            '<div class="architecture-vpc-huawei-result-ring-center architecture-vpc-huawei-score-center">',
            '<span class="architecture-vpc-huawei-result-ring-value architecture-vpc-huawei-score-value-number">' + escapeHtml(String(score.score)) + '</span>',
            '<span class="architecture-vpc-huawei-result-ring-unit architecture-vpc-huawei-score-caption">/100</span>',
            '</div>',
            '</div>',
            '<div class="architecture-vpc-huawei-result-visual-copy">',
            '<p class="architecture-vpc-huawei-result-copy architecture-vpc-huawei-result-copy-center">' + escapeHtml(detail) + '</p>',
            '</div>',
            '<span class="architecture-vpc-huawei-result-card-divider" aria-hidden="true"></span>',
            '<div class="architecture-vpc-huawei-result-chip-row architecture-vpc-huawei-result-chip-row-center" aria-label="Primary result outcome">',
            primaryChip,
            '</div>',
            '</article>',
            '<article class="architecture-vpc-huawei-result-card architecture-vpc-huawei-result-card-summary" aria-label="Result summary">',
            '<div class="architecture-vpc-huawei-result-summary-intro">',
            '<span class="architecture-vpc-huawei-result-card-icon architecture-vpc-huawei-result-card-icon-summary" aria-hidden="true"><i class="bi bi-clipboard-data"></i></span>',
            '<div class="architecture-vpc-huawei-result-summary-copy">',
            '<div class="architecture-vpc-huawei-result-kicker">Descriptive Summary</div>',
            '<h3 class="architecture-vpc-huawei-result-title">' + escapeHtml(scoreBand(tone)) + '</h3>',
            '<p class="architecture-vpc-huawei-result-copy">' + escapeHtml(detail) + '</p>',
            '</div>',
            '</div>',
            '<span class="architecture-vpc-huawei-result-card-divider" aria-hidden="true"></span>',
            '<div class="architecture-vpc-huawei-result-chip-grid" aria-label="Result summary chips">',
            summaryChips,
            '</div>',
            '</article>',
            '</div>',
            '<div class="architecture-vpc-huawei-result-metric-grid" aria-label="Architecture metrics">',
            metricCards,
            '</div>'
        ].join('');
    }

    function clampAssessmentScore(score) {
        return Math.max(0, Math.min(100, Math.round(score)));
    }

    function buildPillarBreakdown(spec) {
        const zoneCount = Number(spec.accessBlocks) || 1;

        return [
            {
                label: 'Security',
                score: clampAssessmentScore(72 + (spec.firewall ? 10 : -8) + (spec.acl ? 5 : 0) + (spec.hsrp ? 5 : 0) + (spec.vpn ? 4 : 0)),
                icon: 'bi bi-shield-check',
                tone: 'security'
            },
            {
                label: 'Reliability',
                score: clampAssessmentScore(64 + (zoneCount >= 2 ? 14 : -8) + (spec.etherChannel ? 9 : 0) + (spec.hsrp ? 7 : 0) + (spec.wan ? 5 : 0)),
                icon: 'bi bi-cloud-check',
                tone: 'reliability'
            },
            {
                label: 'Performance',
                score: clampAssessmentScore(72 + (spec.etherChannel ? 10 : 0) + (zoneCount >= 3 ? 4 : 0) + (spec.routingMode !== 'static' ? 4 : 0) + (spec.wireless ? 3 : 0)),
                icon: 'bi bi-lightning-charge',
                tone: 'performance'
            },
            {
                label: 'Cost Optimization',
                score: clampAssessmentScore(76 + (zoneCount <= 2 ? 5 : 0) + (spec.nat ? 2 : 0) + (spec.firewall ? -1 : 1) + (!spec.wireless ? 2 : 0)),
                icon: 'bi bi-currency-dollar',
                tone: 'cost'
            },
            {
                label: 'Operational Excellence',
                score: clampAssessmentScore(64 + (spec.monitoring ? 16 : 0) + (spec.dhcpDns ? 7 : 0) + (spec.routingMode !== 'static' ? 5 : 0) + (spec.wan ? 4 : 0)),
                icon: 'bi bi-gear',
                tone: 'operations'
            }
        ];
    }

    function buildRiskLevel(spec) {
        const scorePayload = core.buildArchitectureScore(spec);
        const gapCount = [
            (Number(spec.accessBlocks) || 1) < 2,
            !spec.etherChannel,
            !spec.firewall,
            !spec.monitoring,
            !spec.dhcpDns
        ].filter(Boolean).length;
        let level = 'Low';
        let tone = 'low';
        let icon = 'bi bi-shield-check';
        let summary = 'No critical diagram-level gaps detected.';
        let detail = 'Review IAM, security groups, routing, and data protection settings before production change approval.';

        if (scorePayload.score < 65 || gapCount >= 4) {
            level = 'High';
            tone = 'high';
            icon = 'bi bi-exclamation-octagon';
            summary = 'Several design gaps need attention.';
            detail = 'Prioritize multi-zone placement, ingress protection, private routing, and monitoring before using this as a delivery baseline.';
        } else if (scorePayload.score < 75 || gapCount >= 3) {
            level = 'Elevated';
            tone = 'elevated';
            icon = 'bi bi-exclamation-triangle';
            summary = 'Some architecture trade-offs need review.';
            detail = 'Check the highlighted resilience, access control, and service ownership choices before handoff.';
        } else if (scorePayload.score < 85 || gapCount >= 2) {
            level = 'Moderate';
            tone = 'moderate';
            icon = 'bi bi-shield-exclamation';
            summary = 'A few design choices need confirmation.';
            detail = 'Validate zone spread, security controls, and operational ownership before rollout.';
        }

        return {
            level: level,
            tone: tone,
            icon: icon,
            summary: summary,
            detail: detail,
            generatedAt: new Date(),
            nextReviewAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };
    }

    function formatAssessmentDate(value) {
        return value.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    }

    function renderAssessmentSections(spec) {
        const pillarBreakdownOutput = byId('architectureVpcHuaweiPillarBreakdown');
        const riskLevelOutput = byId('architectureVpcHuaweiRiskLevel');

        if (!pillarBreakdownOutput || !riskLevelOutput) {
            return;
        }

        const pillars = buildPillarBreakdown(spec);
        const risk = buildRiskLevel(spec);

        pillarBreakdownOutput.className = 'architecture-vpc-huawei-assessment-card architecture-vpc-huawei-pillar-card';
        riskLevelOutput.className = 'architecture-vpc-huawei-assessment-card architecture-vpc-huawei-risk-card architecture-vpc-huawei-risk-card-' + risk.tone;

        pillarBreakdownOutput.innerHTML = [
            '<h3 class="architecture-vpc-huawei-result-section-title">Pillar Breakdown</h3>',
            '<div class="architecture-vpc-huawei-pillar-list">',
            pillars.map(function (pillar) {
                return [
                    '<div class="architecture-vpc-huawei-pillar-row architecture-vpc-huawei-pillar-row-' + escapeHtml(pillar.tone) + '">',
                    '<span class="architecture-vpc-huawei-pillar-icon" aria-hidden="true"><i class="' + escapeHtml(pillar.icon) + '"></i></span>',
                    '<span class="architecture-vpc-huawei-pillar-name">' + escapeHtml(pillar.label) + '</span>',
                    '<span class="architecture-vpc-huawei-pillar-meter" aria-hidden="true"><span style="--pillar-score: ' + escapeHtml(String(pillar.score)) + '%;"></span></span>',
                    '<span class="architecture-vpc-huawei-pillar-score"><strong>' + escapeHtml(String(pillar.score)) + '</strong> /100</span>',
                    '</div>'
                ].join('');
            }).join(''),
            '</div>',
            '<div class="architecture-vpc-huawei-pillar-legend" aria-label="Pillar score legend">',
            '<span><i class="architecture-vpc-huawei-legend-dot architecture-vpc-huawei-legend-dot-excellent"></i>Excellent (90-100)</span>',
            '<span><i class="architecture-vpc-huawei-legend-dot architecture-vpc-huawei-legend-dot-good"></i>Good (70-89)</span>',
            '<span><i class="architecture-vpc-huawei-legend-dot architecture-vpc-huawei-legend-dot-fair"></i>Fair (50-69)</span>',
            '<span><i class="architecture-vpc-huawei-legend-dot architecture-vpc-huawei-legend-dot-needs"></i>Needs improvement (&lt;50)</span>',
            '</div>'
        ].join('');

        riskLevelOutput.innerHTML = [
            '<h3 class="architecture-vpc-huawei-result-section-title">Risk Level</h3>',
            '<div class="architecture-vpc-huawei-risk-body">',
            '<div class="architecture-vpc-huawei-risk-icon" aria-hidden="true"><i class="' + escapeHtml(risk.icon) + '"></i></div>',
            '<div class="architecture-vpc-huawei-risk-copy">',
            '<div class="architecture-vpc-huawei-risk-level">' + escapeHtml(risk.level) + '</div>',
            '<p>' + escapeHtml(risk.summary) + '<br>' + escapeHtml(risk.detail) + '</p>',
            '</div>',
            '</div>',
            '<div class="architecture-vpc-huawei-risk-meta">',
            '<div>',
            '<span>Generated</span>',
            '<strong><i class="bi bi-calendar3" aria-hidden="true"></i>' + escapeHtml(formatAssessmentDate(risk.generatedAt)) + '</strong>',
            '</div>',
            '<div>',
            '<span>Next review</span>',
            '<strong><i class="bi bi-calendar3" aria-hidden="true"></i>' + escapeHtml(formatAssessmentDate(risk.nextReviewAt)) + '</strong>',
            '</div>',
            '</div>'
        ].join('');
    }

    function renderJson() {
        const jsonOutput = byId('architectureVpcHuaweiJsonOutput');

        if (jsonOutput) {
            jsonOutput.innerHTML = highlightJsonText(JSON.stringify(currentPayload, null, 2));
        }
    }

    function buildControlsAuthoritativeSpec(values) {
        const source = values || collectValues();
        const spec = core.inferFromPrompt(Object.assign({}, source, {
            prompt: ''
        }));

        spec.prompt = String(source.prompt || '').trim();

        return spec;
    }

    function renderResult(spec, options) {
        const renderOptions = options || {};

        clearError();
        previewArchitecture = null;
        currentSpec = renderOptions.controlsAuthoritative === true
            ? buildControlsAuthoritativeSpec(spec)
            : core.inferFromPrompt(spec);
        currentArchitecture = applyGroupLayoutOverrides(core.buildArchitecture(currentSpec, layoutOverrides));
        currentInventory = core.buildInventory(currentArchitecture);
        currentNotes = core.buildPromptNotes(currentSpec);
        currentPayload = core.buildExportPayload(currentSpec, layoutOverrides, currentInventory, currentNotes);
        syncConnectorPayloadState();

        setHidden(byId('architectureVpcHuaweiStageEmpty'), true);
        setHidden(byId('architectureVpcHuaweiStageCanvas'), false);
        setHidden(byId('architectureVpcHuaweiOutputEmpty'), true);
        setHidden(byId('architectureVpcHuaweiOutputContent'), false);
        setHidden(byId('architectureVpcHuaweiOutputStatus'), false);

        renderStageHeader(currentSpec);
        renderStage(currentArchitecture);

        if (renderOptions.autoFitStage === true) {
            setStageZoomToFit();
        }

        renderInventory();
        renderNotes();
        renderScore(currentSpec);
        normalizeInfraStackResultSummary('architecture-vpc-huawei');
        renderAssessmentSections(currentSpec);
        renderJson();
        updateSelectedNodeEditor();
        updateHighlightAllButton();
        updateUndoButton();
    }

    function resetGeneratedArchitectureState() {
        currentSpec = null;
        currentArchitecture = null;
        currentInventory = [];
        currentNotes = null;
        currentPayload = null;
        currentSvgMarkup = '';
        selectedNodeId = '';
        selectedNodeIds = [];
        selectedConnectorId = '';
        highlightedNodeId = '';
        highlightedNodeIds = [];
        layoutOverrides = {};
        connectorOverrides = {};
        stageDiagramHighlighted = false;
        if (byId('architectureVpcHuaweiPillarBreakdown')) {
            byId('architectureVpcHuaweiPillarBreakdown').innerHTML = '';
        }
        if (byId('architectureVpcHuaweiRiskLevel')) {
            byId('architectureVpcHuaweiRiskLevel').innerHTML = '';
        }
        clearStageUndoHistory();
        updateHighlightAllButton();
    }

    function createPresetPreviewOverlay() {
        return [
            '<div class="architecture-vpc-huawei-stage-preview-overlay" role="status">',
            '<div class="architecture-vpc-huawei-stage-preview-panel">',
            '<span class="architecture-vpc-huawei-stage-preview-icon"><i class="bi bi-stars" aria-hidden="true"></i></span>',
            '<strong>Choose a preset to generate diagram</strong>',
            '<span>Pick a preset or click Generate Architecture to create the editable Huawei Cloud workspace.</span>',
            '</div>',
            '</div>'
        ].join('');
    }

    function renderPresetPreview(preset, options) {
        const previewOptions = options || {};
        const previewPreset = preset || getPreset(valueOf('architectureVpcHuaweiPreset'));
        const previewSpec = core.inferFromPrompt(Object.assign({}, previewPreset.defaults, {
            preset: previewPreset.id,
            presetLabel: previewPreset.label,
            prompt: buildDefaultPrompt(previewPreset)
        }));
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

        if (!stageCanvas) {
            return;
        }

        if (previewOptions.resetZoom === true) {
            stageZoom = 50;
            setValue('architectureVpcHuaweiZoomInput', stageZoom);
        }

        clearError();
        resetGeneratedArchitectureState();
        previewArchitecture = core.buildArchitecture(previewSpec, {});
        renderStageHeader(previewSpec);
        stageCanvas.classList.add('architecture-vpc-huawei-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(previewArchitecture) + createPresetPreviewOverlay();
        setHidden(byId('architectureVpcHuaweiStageEmpty'), true);
        setHidden(stageCanvas, false);
        setHidden(byId('architectureVpcHuaweiOutputEmpty'), false);
        setHidden(byId('architectureVpcHuaweiOutputContent'), true);
        if (previewOptions.resetZoom === true) {
            setStageZoomToFit();
        } else {
            applyStageZoom();
        }

        updateSelectedNodeEditor();

        if (previewOptions.resetZoom !== true && typeof stageCanvas.scrollTo === 'function') {
            stageCanvas.scrollTo({
                left: 0,
                top: 0,
                behavior: 'auto'
            });
        }
    }

    function renderPreviewFromControls(options) {
        const previewOptions = options || {};
        const previewSpec = buildControlsAuthoritativeSpec();
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

        if (!stageCanvas) {
            return;
        }

        if (previewOptions.resetZoom === true) {
            stageZoom = 50;
            setValue('architectureVpcHuaweiZoomInput', stageZoom);
        }

        clearError();
        resetGeneratedArchitectureState();
        previewArchitecture = core.buildArchitecture(previewSpec, {});
        renderStageHeader(previewSpec);
        stageCanvas.classList.add('architecture-vpc-huawei-stage-preview');
        stageCanvas.innerHTML = buildSvgMarkup(previewArchitecture) + createPresetPreviewOverlay();
        setHidden(byId('architectureVpcHuaweiStageEmpty'), true);
        setHidden(stageCanvas, false);
        setHidden(byId('architectureVpcHuaweiOutputEmpty'), false);
        setHidden(byId('architectureVpcHuaweiOutputContent'), true);

        if (previewOptions.resetZoom === true) {
            setStageZoomToFit();
        } else {
            applyStageZoom();
        }

        updateSelectedNodeEditor();

        if (previewOptions.resetZoom !== true && typeof stageCanvas.scrollTo === 'function') {
            stageCanvas.scrollTo({
                left: 0,
                top: 0,
                behavior: 'auto'
            });
        }
    }

    function handleControlChange() {
        if (currentSpec) {
            clearStageUndoHistory();
            stageDiagramHighlighted = false;
            updateHighlightAllButton();
            renderResult(collectValues(), {
                controlsAuthoritative: true
            });
            syncControlsFromSpec(currentSpec);
            return;
        }

        renderPreviewFromControls({
            resetZoom: false
        });
    }

    function bindControlChangeHandlers() {
        [
            'architectureVpcHuaweiSize',
            'architectureVpcHuaweiAccessBlocks',
            'architectureVpcHuaweiRouting',
            'architectureVpcHuaweiVlans',
            'architectureVpcHuaweiWireless',
            'architectureVpcHuaweiFirewall',
            'architectureVpcHuaweiWan',
            'architectureVpcHuaweiMonitoring',
            'architectureVpcHuaweiDhcpDns',
            'architectureVpcHuaweiHsrp',
            'architectureVpcHuaweiEtherChannel',
            'architectureVpcHuaweiAcl',
            'architectureVpcHuaweiNat',
            'architectureVpcHuaweiVpn',
            'architectureVpcHuaweiTrunkVlans',
            'architectureVpcHuaweiNativeVlan',
            'architectureVpcHuaweiAccessVlan',
            'architectureVpcHuaweiSviGateway',
            'architectureVpcHuaweiOspfArea',
            'architectureVpcHuaweiBgpAsn',
            'architectureVpcHuaweiRedundancyVip'
        ].forEach(function (id) {
            const control = byId(id);

            if (control) {
                control.addEventListener('change', handleControlChange);
            }
        });
    }

    function generateFromControls() {
        layoutOverrides = {};
        connectorOverrides = {};
        highlightedNodeId = '';
        highlightedNodeIds = [];
        selectedNodeId = '';
        selectedNodeIds = [];
        selectedConnectorId = '';
        stageDiagramHighlighted = false;
        clearStageUndoHistory();
        updateHighlightAllButton();
        renderResult(core.inferFromPrompt(collectValues()), {
            autoFitStage: true
        });
        syncControlsFromSpec(currentSpec);
    }

    function selectNode(nodeId) {
        if (!getDiagramItemById(nodeId)) {
            return;
        }

        selectedNodeId = nodeId;
        selectedNodeIds = [nodeId];
        selectedConnectorId = '';
        queueStageNodeFocus(nodeId);
        renderResult(currentSpec);
    }

    function selectConnector(connectorId) {
        const safeConnectorId = String(connectorId || '').trim();
        const connector = currentArchitecture && Array.isArray(currentArchitecture.connectors)
            ? currentArchitecture.connectors.find(function (item) {
                return item.id === safeConnectorId;
            })
            : null;

        if (!connector) {
            return;
        }

        selectedNodeId = '';
        selectedNodeIds = [];
        selectedConnectorId = safeConnectorId;
        highlightedNodeId = '';
        highlightedNodeIds = [];
        syncConnectorPayloadState();
        updateSelectedNodeEditor();
        renderStage(currentArchitecture);
    }

    function updateSelectedNodeEditor() {
        selectedNodeIds = normalizeSelectedNodeIds(selectedNodeIds);

        if (selectedNodeId && !selectedNodeIds.includes(selectedNodeId)) {
            selectedNodeIds.unshift(selectedNodeId);
            selectedNodeIds = normalizeSelectedNodeIds(selectedNodeIds);
        }

        const selectedItems = getSelectedDiagramItems();
        const selectedNode = getDiagramItemById(selectedNodeId) || selectedItems[0] || null;

        setHidden(byId('architectureVpcHuaweiSelectedEmpty'), Boolean(selectedNode));
        setHidden(byId('architectureVpcHuaweiSelectedEditor'), !selectedNode);

        if (!selectedNode) {
            selectedNodeId = '';
            selectedNodeIds = [];
            syncConnectorPayloadState();
            renderJson();
            return;
        }

        selectedNodeId = selectedNode.id;
        selectedNodeIds = selectedNodeIds.length > 0 ? selectedNodeIds : [selectedNodeId];
        setText(
            'architectureVpcHuaweiSelectedName',
            selectedNodeIds.length > 1
                ? selectedNodeIds.length + ' items selected - Primary: ' + selectedNode.title
                : selectedNode.title
        );
        setValue('architectureVpcHuaweiSelectedX', Math.round(selectedNode.x));
        setValue('architectureVpcHuaweiSelectedY', Math.round(selectedNode.y));
        setValue('architectureVpcHuaweiSelectedWidth', Math.round(selectedNode.width));
        setValue('architectureVpcHuaweiSelectedHeight', Math.round(selectedNode.height));
        syncConnectorPayloadState();
        renderJson();
    }

    function getDiagramItemMinimumSize(item) {
        return getGroupById(item.id)
            ? {
                width: 120,
                height: 96
            }
            : {
                width: 120,
                height: 58
            };
    }

    function ensureNodeOverride(nodeId) {
        const node = getDiagramItemById(nodeId);

        if (!node) {
            return null;
        }

        if (!layoutOverrides[nodeId]) {
            layoutOverrides[nodeId] = {
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height
            };
        }

        return layoutOverrides[nodeId];
    }

    function applySelectedNodeValues() {
        const node = getDiagramItemById(selectedNodeId);

        if (!node) {
            return;
        }

        const minimumSize = getDiagramItemMinimumSize(node);
        const nextX = Number(valueOf('architectureVpcHuaweiSelectedX'));
        const nextY = Number(valueOf('architectureVpcHuaweiSelectedY'));
        const nextWidth = Math.max(minimumSize.width, Number(valueOf('architectureVpcHuaweiSelectedWidth')));
        const nextHeight = Math.max(minimumSize.height, Number(valueOf('architectureVpcHuaweiSelectedHeight')));

        pushStageUndoSnapshot();

        if (isDiagramGroup(selectedNodeId) && (nextX !== node.x || nextY !== node.y)) {
            writeMoveLayoutOverrides(getMovableDiagramItems(selectedNodeId), nextX - node.x, nextY - node.y);
        }

        layoutOverrides[selectedNodeId] = {
            x: nextX,
            y: nextY,
            width: nextWidth,
            height: nextHeight
        };
        renderResult(currentSpec);
    }

    function resetSelectedNode() {
        if (!selectedNodeId) {
            return;
        }

        pushStageUndoSnapshot();
        getSelectionMoveItems(selectedNodeId).forEach(function (item) {
            delete layoutOverrides[item.id];
        });
        renderResult(currentSpec);
    }

    function highlightSelectedNode() {
        const targetNodeIds = normalizeSelectedNodeIds(selectedNodeIds.length > 0 ? selectedNodeIds : [selectedNodeId]);

        if (targetNodeIds.length === 0) {
            return;
        }

        pushStageUndoSnapshot();
        setHighlightedNodeIds(targetNodeIds.length === highlightedNodeIds.length && targetNodeIds.every(function (nodeId) {
            return highlightedNodeIds.includes(nodeId);
        }) ? [] : targetNodeIds);
        renderResult(currentSpec);
    }

    function getCurrentConnectorOverrides() {
        return cloneConnectorOverrides(connectorOverrides);
    }

    function getConnectorPair(connectorId) {
        const safeConnectorId = String(connectorId || '').trim();
        const connector = currentArchitecture && Array.isArray(currentArchitecture.connectors)
            ? currentArchitecture.connectors.find(function (item) {
                return String(item.id || '') === safeConnectorId;
            })
            : null;

        if (!connector) {
            return null;
        }

        const source = getDiagramItemById(connector.from);
        const target = getDiagramItemById(connector.to);

        if (!source || !target) {
            return null;
        }

        return {
            connector: connector,
            source: source,
            target: target
        };
    }

    function findConnectorGroup(svgElement, connectorId) {
        const safeConnectorId = String(connectorId || '').trim();

        return Array.from(svgElement.querySelectorAll('.architecture-vpc-huawei-connector-group')).find(function (group) {
            return String(group.dataset.connectorId || '') === safeConnectorId;
        }) || null;
    }

    function updateConnectorDomGeometry(svgElement, connectorId, geometry) {
        const group = findConnectorGroup(svgElement, connectorId);

        if (!group) {
            return;
        }

        Array.from(group.querySelectorAll('.architecture-vpc-huawei-connector-hit, .architecture-vpc-huawei-connector')).forEach(function (path) {
            path.setAttribute('d', geometry.path);
        });

        const labelBg = group.querySelector('.architecture-vpc-huawei-connector-label-bg');
        const label = group.querySelector('.architecture-vpc-huawei-connector-label');

        if (label) {
            label.setAttribute('x', formatSvgNumber(geometry.label.x));
            label.setAttribute('y', formatSvgNumber(geometry.label.y));
        }

        if (labelBg) {
            const width = Number(labelBg.getAttribute('width')) || 54;

            labelBg.setAttribute('x', formatSvgNumber(geometry.label.x - (width / 2)));
            labelBg.setAttribute('y', formatSvgNumber(geometry.label.y - 15));
        }
    }

    function bindConnectorAnchorHandle(svgElement, handle) {
        handle.addEventListener('pointerdown', function (event) {
            const connectorId = String(handle.dataset.connectorId || '').trim();
            const endpoint = String(handle.dataset.endpoint || '').trim();
            const pair = getConnectorPair(connectorId);
            const existingOverride = connectorOverrides[connectorId] || {};

            if (!pair || (endpoint !== 'source' && endpoint !== 'target')) {
                return;
            }

            selectedConnectorId = connectorId;
            selectedNodeId = '';
            selectedNodeIds = [];
            setHighlightedNodeIds([]);
            safelySetPointerCapture(handle, event.pointerId);

            function applyHandleMove(moveEvent) {
                const point = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);
                const baseGeometry = connectorGeometry(pair.source, pair.target, existingOverride);
                const editedItem = endpoint === 'source' ? pair.source : pair.target;
                const side = endpoint === 'source' ? baseGeometry.sourceSide : baseGeometry.targetSide;
                const ratio = point ? buildConnectorAnchorRatio(editedItem, side, point) : null;
                const nextOverride = Object.assign({}, existingOverride, endpoint === 'source'
                    ? { sourceRatio: ratio }
                    : { targetRatio: ratio });
                const geometry = connectorGeometry(pair.source, pair.target, nextOverride);
                const nextPoint = endpoint === 'source' ? geometry.start : geometry.end;

                if (!ratio) {
                    return null;
                }

                updateConnectorDomGeometry(svgElement, connectorId, geometry);
                handle.setAttribute('cx', formatSvgNumber(nextPoint.x));
                handle.setAttribute('cy', formatSvgNumber(nextPoint.y));

                return ratio;
            }

            function handlePointerMove(moveEvent) {
                applyHandleMove(moveEvent);
            }

            function handlePointerEnd(endEvent) {
                const ratio = applyHandleMove(endEvent);

                safelyReleasePointerCapture(handle, endEvent.pointerId);
                handle.removeEventListener('pointermove', handlePointerMove);
                handle.removeEventListener('pointerup', handlePointerEnd);
                handle.removeEventListener('pointercancel', handlePointerEnd);

                if (!ratio || endEvent.type === 'pointercancel') {
                    renderStage(currentArchitecture);
                    return;
                }

                pushStageUndoSnapshot();
                connectorOverrides = getCurrentConnectorOverrides();
                connectorOverrides[connectorId] = Object.assign({}, connectorOverrides[connectorId] || {}, endpoint === 'source'
                    ? { sourceRatio: ratio }
                    : { targetRatio: ratio });
                renderResult(currentSpec);
            }

            handle.addEventListener('pointermove', handlePointerMove);
            handle.addEventListener('pointerup', handlePointerEnd);
            handle.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    function bindConnectorBendHandle(svgElement, handle) {
        handle.addEventListener('pointerdown', function (event) {
            const connectorId = String(handle.dataset.connectorId || '').trim();
            const pair = getConnectorPair(connectorId);
            const existingOverride = connectorOverrides[connectorId] || {};

            if (!pair) {
                return;
            }

            selectedConnectorId = connectorId;
            selectedNodeId = '';
            selectedNodeIds = [];
            setHighlightedNodeIds([]);
            safelySetPointerCapture(handle, event.pointerId);

            function applyBendMove(moveEvent) {
                const point = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);

                if (!point) {
                    return null;
                }

                const bend = {
                    x: snapCoordinate(point.x),
                    y: snapCoordinate(point.y)
                };
                const geometry = connectorGeometry(pair.source, pair.target, Object.assign({}, existingOverride, {
                    bend: bend
                }));

                updateConnectorDomGeometry(svgElement, connectorId, geometry);
                handle.setAttribute('x', formatSvgNumber(bend.x - 9));
                handle.setAttribute('y', formatSvgNumber(bend.y - 9));

                return bend;
            }

            function handlePointerMove(moveEvent) {
                applyBendMove(moveEvent);
            }

            function handlePointerEnd(endEvent) {
                const bend = applyBendMove(endEvent);

                safelyReleasePointerCapture(handle, endEvent.pointerId);
                handle.removeEventListener('pointermove', handlePointerMove);
                handle.removeEventListener('pointerup', handlePointerEnd);
                handle.removeEventListener('pointercancel', handlePointerEnd);

                if (!bend || endEvent.type === 'pointercancel') {
                    renderStage(currentArchitecture);
                    return;
                }

                pushStageUndoSnapshot();
                connectorOverrides = getCurrentConnectorOverrides();
                connectorOverrides[connectorId] = Object.assign({}, connectorOverrides[connectorId] || {}, {
                    bend: bend
                });
                renderResult(currentSpec);
            }

            handle.addEventListener('pointermove', handlePointerMove);
            handle.addEventListener('pointerup', handlePointerEnd);
            handle.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    function getSvgClientPoint(svgElement, clientX, clientY) {
        const point = svgElement.createSVGPoint();
        const screenMatrix = svgElement.getScreenCTM();

        if (!screenMatrix) {
            return null;
        }

        point.x = clientX;
        point.y = clientY;

        return point.matrixTransform(screenMatrix.inverse());
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

    function buildRectFromPoints(startPoint, endPoint) {
        return {
            x: Math.min(startPoint.x, endPoint.x),
            y: Math.min(startPoint.y, endPoint.y),
            width: Math.abs(endPoint.x - startPoint.x),
            height: Math.abs(endPoint.y - startPoint.y)
        };
    }

    function rectsIntersect(firstRect, secondRect) {
        return firstRect.x < secondRect.x + secondRect.width &&
            firstRect.x + firstRect.width > secondRect.x &&
            firstRect.y < secondRect.y + secondRect.height &&
            firstRect.y + firstRect.height > secondRect.y;
    }

    function getRectIntersectionArea(firstRect, secondRect) {
        const width = Math.max(0, Math.min(firstRect.x + firstRect.width, secondRect.x + secondRect.width) - Math.max(firstRect.x, secondRect.x));
        const height = Math.max(0, Math.min(firstRect.y + firstRect.height, secondRect.y + secondRect.height) - Math.max(firstRect.y, secondRect.y));

        return width * height;
    }

    function rectContainsPoint(rect, point) {
        return point.x >= rect.x &&
            point.x <= rect.x + rect.width &&
            point.y >= rect.y &&
            point.y <= rect.y + rect.height;
    }

    function readStageElementRect(element) {
        return {
            x: Number.parseFloat(element.dataset.nodeX || '0'),
            y: Number.parseFloat(element.dataset.nodeY || '0'),
            width: Number.parseFloat(element.dataset.nodeWidth || '0'),
            height: Number.parseFloat(element.dataset.nodeHeight || '0')
        };
    }

    function getStageCanvasPoint(stageCanvasElement, clientX, clientY) {
        const rect = stageCanvasElement.getBoundingClientRect();

        return {
            x: clientX - rect.left + stageCanvasElement.scrollLeft,
            y: clientY - rect.top + stageCanvasElement.scrollTop
        };
    }

    function updateMarqueeOverlay(element, rect) {
        element.style.left = Math.round(rect.x) + 'px';
        element.style.top = Math.round(rect.y) + 'px';
        element.style.width = Math.round(rect.width) + 'px';
        element.style.height = Math.round(rect.height) + 'px';
    }

    function isElementSelectedByMarquee(selectionRect, itemRect) {
        const centerPoint = {
            x: itemRect.x + (itemRect.width / 2),
            y: itemRect.y + (itemRect.height / 2)
        };
        const itemArea = itemRect.width * itemRect.height;
        const intersectionArea = getRectIntersectionArea(selectionRect, itemRect);

        return rectContainsPoint(selectionRect, centerPoint) ||
            (
                itemArea > 0 &&
                intersectionArea / itemArea >= 0.35
            );
    }

    function findItemsIntersectingRect(svgElement, selectionRect) {
        return Array.from(svgElement.querySelectorAll('.architecture-vpc-huawei-node-shell, .architecture-vpc-huawei-diagram-group')).filter(function (element) {
            const nodeId = String(element.dataset.nodeId || '').trim();
            const itemRect = readStageElementRect(element);

            return nodeId !== '' &&
                Number.isFinite(itemRect.x) &&
                Number.isFinite(itemRect.y) &&
                Number.isFinite(itemRect.width) &&
                Number.isFinite(itemRect.height) &&
                rectsIntersect(selectionRect, itemRect) &&
                isElementSelectedByMarquee(selectionRect, itemRect);
        }).map(function (element) {
            return String(element.dataset.nodeId || '').trim();
        });
    }

    function setMarqueeTargetNodes(svgElement, nodeIds) {
        const targetIds = new Set(normalizeSelectedNodeIds(nodeIds));

        Array.from(svgElement.querySelectorAll('.architecture-vpc-huawei-node-shell, .architecture-vpc-huawei-diagram-group')).forEach(function (element) {
            const nodeId = String(element.dataset.nodeId || '').trim();

            element.classList.toggle('is-marquee-target', targetIds.has(nodeId));
        });
    }

    function findStageNodeElement(stageCanvas, nodeId) {
        const selectedId = String(nodeId || '').trim();

        if (!stageCanvas || selectedId === '') {
            return null;
        }

        return Array.from(stageCanvas.querySelectorAll('[data-node-id]')).find(function (element) {
            return String(element.dataset.nodeId || '') === selectedId;
        }) || null;
    }

    function queueStageNodeFocus(nodeId) {
        pendingStageFocusNodeId = String(nodeId || '').trim();
    }

    function focusPendingStageNode(stageCanvas) {
        const nodeId = pendingStageFocusNodeId;

        if (!stageCanvas || nodeId === '') {
            return;
        }

        pendingStageFocusNodeId = '';

        const nodeElement = findStageNodeElement(stageCanvas, nodeId);

        if (nodeElement && typeof nodeElement.focus === 'function') {
            nodeElement.focus();
        }
    }

    function focusSelectedStageNode() {
        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

        if (!stageCanvas || selectedNodeId === '') {
            return;
        }

        queueStageNodeFocus(selectedNodeId);
        focusPendingStageNode(stageCanvas);
    }

    function isDiagramArrowKey(key) {
        return ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key);
    }

    function setSelectedNodes(nodeIds, primaryNodeId, shouldFocus) {
        selectedNodeIds = normalizeSelectedNodeIds(nodeIds);
        selectedNodeId = selectedNodeIds.includes(primaryNodeId) ? primaryNodeId : (selectedNodeIds[0] || '');
        selectedConnectorId = '';

        if (shouldFocus !== false) {
            queueStageNodeFocus(selectedNodeId);
        }

        if (currentSpec) {
            renderResult(currentSpec);
            return;
        }

        updateSelectedNodeEditor();
    }

    function isMarqueeBlockedTarget(target) {
        if (!target || typeof target.closest !== 'function') {
            return false;
        }

        if (target.closest('.architecture-vpc-huawei-resize-handle, .diagram-connector-anchor-handle, .diagram-connector-bend-handle, .architecture-vpc-huawei-node-shell')) {
            return true;
        }

        if (target.closest('.architecture-vpc-huawei-connector-group')) {
            return true;
        }

        const group = target.closest('.architecture-vpc-huawei-diagram-group');

        return group !== null;
    }

    function bindStageMarqueeSelection(stageCanvasElement) {
        if (!stageCanvasElement || stageCanvasElement.dataset.marqueeSelectionBound === 'true') {
            return;
        }

        stageCanvasElement.dataset.marqueeSelectionBound = 'true';

        stageCanvasElement.addEventListener('pointerdown', function (event) {
            const svgElement = stageCanvasElement.querySelector('svg');

            if (
                !svgElement ||
                event.button !== 0 ||
                isMarqueeBlockedTarget(event.target)
            ) {
                return;
            }

            const startPoint = getSvgClientPoint(svgElement, event.clientX, event.clientY);
            const startCanvasPoint = getStageCanvasPoint(stageCanvasElement, event.clientX, event.clientY);

            if (!startPoint) {
                return;
            }

            const marquee = document.createElement('div');

            marquee.className = 'architecture-vpc-huawei-marquee-selection';
            updateMarqueeOverlay(marquee, {
                x: startCanvasPoint.x,
                y: startCanvasPoint.y,
                width: 0,
                height: 0
            });
            stageCanvasElement.appendChild(marquee);
            safelySetPointerCapture(stageCanvasElement, event.pointerId);

            function handlePointerMove(moveEvent) {
                const currentPoint = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);
                const currentCanvasPoint = getStageCanvasPoint(stageCanvasElement, moveEvent.clientX, moveEvent.clientY);
                const overlayRect = buildRectFromPoints(startCanvasPoint, currentCanvasPoint);

                updateMarqueeOverlay(marquee, overlayRect);

                if (!currentPoint) {
                    return;
                }

                setMarqueeTargetNodes(svgElement, findItemsIntersectingRect(svgElement, buildRectFromPoints(startPoint, currentPoint)));
            }

            function handlePointerEnd(endEvent) {
                const endPoint = getSvgClientPoint(svgElement, endEvent.clientX, endEvent.clientY);
                const endCanvasPoint = getStageCanvasPoint(stageCanvasElement, endEvent.clientX, endEvent.clientY);
                const overlayRect = buildRectFromPoints(startCanvasPoint, endCanvasPoint);

                safelyReleasePointerCapture(stageCanvasElement, endEvent.pointerId);
                stageCanvasElement.removeEventListener('pointermove', handlePointerMove);
                stageCanvasElement.removeEventListener('pointerup', handlePointerEnd);
                stageCanvasElement.removeEventListener('pointercancel', handlePointerEnd);
                setMarqueeTargetNodes(svgElement, []);
                marquee.remove();

                if (!endPoint || endEvent.type === 'pointercancel') {
                    return;
                }

                const selectionRect = buildRectFromPoints(startPoint, endPoint);

                if (overlayRect.width < 6 && overlayRect.height < 6) {
                    setSelectedNodes([]);
                    return;
                }

                setSelectedNodes(findItemsIntersectingRect(svgElement, selectionRect));
            }

            stageCanvasElement.addEventListener('pointermove', handlePointerMove);
            stageCanvasElement.addEventListener('pointerup', handlePointerEnd);
            stageCanvasElement.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        }, true);
    }

    function bindStageNodes(stageCanvas) {
        const svgElement = stageCanvas.querySelector('svg');

        all('.architecture-vpc-huawei-connector-group', stageCanvas).forEach(function (connectorElement) {
            connectorElement.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter' && event.key !== ' ') {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                selectConnector(connectorElement.dataset.connectorId);
            });

            connectorElement.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                selectConnector(connectorElement.dataset.connectorId);
            });

            connectorElement.addEventListener('mousedown', function (event) {
                event.stopPropagation();
            });
        });

        all('.architecture-vpc-huawei-node-shell, .architecture-vpc-huawei-diagram-group', stageCanvas).forEach(function (nodeElement) {
            nodeElement.addEventListener('keydown', function (event) {
                const nodeId = String(nodeElement.dataset.nodeId || '').trim();

                if (!getDiagramItemById(nodeId)) {
                    return;
                }

                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopPropagation();
                    selectNode(nodeId);
                    return;
                }

                if (!isDiagramArrowKey(event.key)) {
                    return;
                }

                if (selectedNodeIds.length > 1 && selectedNodeIds.includes(nodeId)) {
                    selectedNodeId = nodeId;
                    selectedConnectorId = '';
                    updateSelectedNodeEditor();
                } else {
                    selectedNodeId = nodeId;
                    selectedNodeIds = [nodeId];
                    selectedConnectorId = '';
                    updateSelectedNodeEditor();
                }

                handleKeyboardMove(event);

                if (event.defaultPrevented) {
                    event.stopPropagation();
                }
            });

            nodeElement.addEventListener('click', function (event) {
                event.stopPropagation();
                selectNode(nodeElement.dataset.nodeId);
            });
            nodeElement.addEventListener('mousedown', function (event) {
                const nodeId = nodeElement.dataset.nodeId;
                const node = getDiagramItemById(nodeId);

                if (!node || event.button !== 0 || event.target.closest('.architecture-vpc-huawei-resize-handle')) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                selectedNodeId = nodeId;
                selectedNodeIds = selectedNodeIds.length > 1 && selectedNodeIds.includes(nodeId) ? selectedNodeIds : [nodeId];
                selectedConnectorId = '';
                queueStageNodeFocus(nodeId);
                dragState = {
                    nodeId: nodeId,
                    startX: event.clientX,
                    startY: event.clientY,
                    nodeX: node.x,
                    nodeY: node.y,
                    width: node.width,
                    height: node.height,
                    movingItems: getSelectionMoveItems(nodeId),
                    hasSnapshot: false
                };
                updateSelectedNodeEditor();
                renderStage(currentArchitecture);
            });
        });

        all('.architecture-vpc-huawei-resize-handle', stageCanvas).forEach(function (handleElement) {
            handleElement.addEventListener('mousedown', function (event) {
                const nodeId = handleElement.dataset.nodeId;
                const node = getDiagramItemById(nodeId);

                if (!node || event.button !== 0) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                selectedNodeId = nodeId;
                selectedNodeIds = [nodeId];
                selectedConnectorId = '';
                focusSelectedStageNode();
                dragState = {
                    nodeId: nodeId,
                    mode: 'resize',
                    startX: event.clientX,
                    startY: event.clientY,
                    nodeX: node.x,
                    nodeY: node.y,
                    width: node.width,
                    height: node.height,
                    hasSnapshot: false
                };
                updateSelectedNodeEditor();
            });
        });

        if (svgElement) {
            all('.diagram-connector-anchor-handle', stageCanvas).forEach(function (handleElement) {
                bindConnectorAnchorHandle(svgElement, handleElement);
            });
            all('.diagram-connector-bend-handle', stageCanvas).forEach(function (handleElement) {
                bindConnectorBendHandle(svgElement, handleElement);
            });
        }
    }

    function handlePointerMove(event) {
        if (!dragState) {
            return;
        }

        const deltaX = (event.clientX - dragState.startX) / (stageZoom / 100);
        const deltaY = (event.clientY - dragState.startY) / (stageZoom / 100);

        if (!dragState.hasSnapshot) {
            pushStageUndoSnapshot();
            dragState.hasSnapshot = true;
        }

        if (dragState.mode === 'resize') {
            const item = getDiagramItemById(dragState.nodeId);
            const minimumSize = item ? getDiagramItemMinimumSize(item) : {
                width: 120,
                height: 58
            };

            layoutOverrides[dragState.nodeId] = {
                x: dragState.nodeX,
                y: dragState.nodeY,
                width: Math.max(minimumSize.width, Math.round(dragState.width + deltaX)),
                height: Math.max(minimumSize.height, Math.round(dragState.height + deltaY))
            };
        } else {
            writeMoveLayoutOverrides(dragState.movingItems || [], deltaX, deltaY);
        }
        queueStageNodeFocus(dragState.nodeId);
        renderResult(currentSpec);
    }

    function handlePointerUp() {
        dragState = null;
    }

    function isKeyboardFormTarget(target) {
        if (!target || typeof target.closest !== 'function') {
            return false;
        }

        return target.closest('input, textarea, select, button, summary, a[href], [contenteditable="true"]') !== null;
    }

    function isUndoKeyboardShortcut(event) {
        return String(event.key || '').toLowerCase() === 'z' &&
            (event.metaKey || event.ctrlKey) &&
            !event.altKey &&
            !event.shiftKey;
    }

    function handleStageUndoKeydown(event) {
        if (event.defaultPrevented || !isUndoKeyboardShortcut(event) || isKeyboardFormTarget(event.target)) {
            return;
        }

        if (undoStageEdit()) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function handleKeyboardMove(event) {
        if (!selectedNodeId || isKeyboardFormTarget(event.target)) {
            return;
        }

        const keyMap = {
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0],
            ArrowUp: [0, -1],
            ArrowDown: [0, 1]
        };

        if (!keyMap[event.key]) {
            return;
        }

        const node = getDiagramItemById(selectedNodeId);
        const multiplier = event.shiftKey ? 12 : 4;
        const delta = keyMap[event.key];

        if (!node) {
            return;
        }

        event.preventDefault();
        pushStageUndoSnapshot();

        if (event.altKey) {
            const minimumSize = getDiagramItemMinimumSize(node);
            const override = ensureNodeOverride(selectedNodeId);

            if (!override) {
                return;
            }

            override.width = Math.max(minimumSize.width, override.width + (delta[0] * multiplier));
            override.height = Math.max(minimumSize.height, override.height + (delta[1] * multiplier));
        } else {
            writeMoveLayoutOverrides(getSelectionMoveItems(selectedNodeId), delta[0] * multiplier, delta[1] * multiplier);
        }

        queueStageNodeFocus(selectedNodeId);
        renderResult(currentSpec);
    }

    function handleWheelZoom(event) {
        if (!event.ctrlKey && !event.metaKey) {
            return;
        }

        const stageCanvas = byId('architectureVpcHuaweiStageCanvas');

        if (!stageCanvas || !stageCanvas.contains(event.target)) {
            return;
        }

        event.preventDefault();
        setStageZoom(stageZoom + (event.deltaY > 0 ? -1 : 1));
    }

    function setTabActive(buttons, panels, activeButton) {
        buttons.forEach(function (button) {
            const isActive = button === activeButton;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        panels.forEach(function (panel) {
            const activeTarget = activeButton.dataset.outputTabTarget ||
                activeButton.dataset.tabTarget ||
                activeButton.dataset.configTabTarget;
            const isActive = panel.id === activeTarget;

            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function bindTabs() {
        const outputButtons = all('.architecture-vpc-huawei-tab-btn');
        const outputPanels = all('.architecture-vpc-huawei-tab-panel');
        const configButtons = all('.architecture-vpc-huawei-config-tab');
        const configPanels = all('[data-config-panel]');

        outputButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                setTabActive(outputButtons, outputPanels, button);
            });
        });

        configButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                setTabActive(configButtons, configPanels, button);
            });
        });
    }

    function flashButton(button, label) {
        if (!button) {
            return;
        }

        const actionButton = button.closest ? button.closest('.tool-table-action-cell button') : null;

        if (actionButton) {
            const isCopied = label === 'Copied';
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
            globalScope.setTimeout(function () {
                actionButton.classList.remove('copied', 'is-copied', 'failed');
                if (icon && actionButton.dataset.defaultIcon) {
                    icon.className = actionButton.dataset.defaultIcon;
                }
            }, 1400);
            return;
        }

        const original = button.textContent;

        button.textContent = label;
        globalScope.setTimeout(function restoreLabel() {
            button.textContent = original;
        }, 1200);
    }

    function copyTextToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }

        const textarea = document.createElement('textarea');

        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

        return Promise.resolve();
    }

    function initMarkdownCopyButtons() {
        const promptBlocks = all('.markdown-content pre.architecture-vpc-huawei-prompt-pre');
        const promptCopyButtons = all('.architecture-vpc-huawei-prompt-copy-btn');

        promptCopyButtons.forEach(function bindPromptCopy(button) {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', function handlePromptCopy(event) {
                const label = button.querySelector('span') || button;

                event.preventDefault();
                event.stopPropagation();

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code.textContent.trim()).then(function handleCopied() {
                        flashButton(label, 'Copied');
                        button.classList.add('copied');
                        globalScope.setTimeout(function clearCopied() {
                            button.classList.remove('copied');
                        }, 1400);
                    }).catch(function handleCopyFailure() {
                        flashButton(label, 'Failed');
                    });
                    return;
                }

                const textarea = document.createElement('textarea');

                textarea.value = code.textContent.trim();
                textarea.setAttribute('readonly', 'readonly');
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
                flashButton(label, 'Copied');
                button.classList.add('copied');
                globalScope.setTimeout(function clearCopied() {
                    button.classList.remove('copied');
                }, 1400);
            });
        });
    }

    function downloadBlob(filename, mimeType, content) {
        const blob = new Blob([content], {
            type: mimeType
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function downloadSvg() {
        if (!currentSvgMarkup) {
            showError('Generate an architecture before downloading SVG.');
            return;
        }

        downloadBlob('architecture-vpc-huawei.svg', 'image/svg+xml;charset=utf-8', currentSvgMarkup);
    }

    function exportPng() {
        return new Promise(function (resolve, reject) {
            if (!currentSvgMarkup || !currentArchitecture) {
                showError('Generate an architecture before exporting PNG.');
                reject(new Error('No SVG available.'));
                return;
            }

            const image = new Image();
            const svgBlob = new Blob([currentSvgMarkup], {
                type: 'image/svg+xml;charset=utf-8'
            });
            const url = URL.createObjectURL(svgBlob);

            image.onload = function () {
                const canvas = document.createElement('canvas');
                const scale = 2;
                const bounds = computeSvgBounds(currentArchitecture);

                canvas.width = bounds.width * scale;
                canvas.height = bounds.height * scale;

                const context = canvas.getContext('2d');

                context.fillStyle = '#fbfdfc';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(url);

                canvas.toBlob(function (blob) {
                    if (!blob) {
                        reject(new Error('PNG export failed.'));
                        return;
                    }

                    const pngUrl = URL.createObjectURL(blob);
                    const link = document.createElement('a');

                    link.href = pngUrl;
                    link.download = 'architecture-vpc-huawei.png';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    URL.revokeObjectURL(pngUrl);
                    resolve();
                }, 'image/png');
            };
            image.onerror = function () {
                URL.revokeObjectURL(url);
                reject(new Error('SVG image load failed.'));
            };
            image.src = url;
        });
    }

    function downloadJson() {
        if (!currentPayload) {
            showError('Generate an architecture before downloading JSON.');
            return;
        }

        downloadBlob('architecture-vpc-huawei.json', 'application/json;charset=utf-8', JSON.stringify(currentPayload, null, 2));
    }

    function copyJson() {
        if (!currentPayload) {
            showError('Generate an architecture before copying JSON.');
            return Promise.reject(new Error('No JSON available.'));
        }

        const json = JSON.stringify(currentPayload, null, 2);

        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(json);
        }

        const textarea = document.createElement('textarea');

        textarea.value = json;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

        return Promise.resolve();
    }

    function handleImportChange(event) {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            try {
                const payload = JSON.parse(String(reader.result || '{}'));
                const restored = core.buildImportedPayloadState(payload);

                if (restored.error) {
                    showError(restored.error);
                    return;
                }

                restoreEngineStateFromPayload(payload, restored.layoutOverrides || {});
                clearStageUndoHistory();
                updateHighlightAllButton();
                syncControlsFromSpec(restored.spec);
                renderResult(restored.spec);
            } catch (error) {
                showError('The selected JSON file could not be parsed.');
            } finally {
                event.target.value = '';
            }
        };
        reader.readAsText(file);
    }

    function getUsageHelpElements() {
        return {
            popup: byId('architectureVpcHuaweiUsageHelpPopup'),
            button: byId('architectureVpcHuaweiUsageHelpButton'),
            closeButton: byId('architectureVpcHuaweiUsageHelpClose')
        };
    }

    function getUsageHelpFocusableElements() {
        const elements = getUsageHelpElements();

        if (!elements.popup) {
            return [];
        }

        return Array.from(elements.popup.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (element) {
            return !element.hasAttribute('disabled') && element.offsetParent !== null;
        });
    }

    function setUsageHelpOpen(isOpen) {
        const elements = getUsageHelpElements();
        const shouldOpen = Boolean(isOpen);

        setHidden(elements.popup, !shouldOpen);

        if (elements.button) {
            elements.button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        }

        if (shouldOpen && elements.closeButton) {
            elements.closeButton.focus();
            return;
        }

        if (!shouldOpen && elements.button) {
            elements.button.focus();
        }
    }

    function handleUsageHelpKeydown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            setUsageHelpOpen(false);
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        const focusableElements = getUsageHelpFocusableElements();

        if (focusableElements.length === 0) {
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            return;
        }

        if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    function toggleStageUi(stageShell) {
        if (!stageShell) {
            return;
        }

        isStageUiHidden = !isStageUiHidden;
        stageShell.classList.toggle('is-stage-ui-hidden', isStageUiHidden);
    }

    function updateFullscreenButton() {
        const stageShell = byId('architectureVpcHuaweiStageShell');
        const button = byId('architectureVpcHuaweiFullscreen');

        if (!stageShell || !button) {
            return;
        }

        const isExpanded = document.fullscreenElement === stageShell || stageShell.classList.contains('architecture-vpc-huawei-stage-expanded');
        const icon = button.querySelector('i');
        const label = isExpanded ? 'Close fullscreen' : 'Open fullscreen';

        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);

        if (icon) {
            icon.className = isExpanded ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen';
        }
    }

    function setStageExpanded(isExpanded) {
        const stageShell = byId('architectureVpcHuaweiStageShell');

        if (!stageShell) {
            return;
        }

        stageShell.classList.toggle('architecture-vpc-huawei-stage-expanded', Boolean(isExpanded));
        document.body.classList.toggle('architecture-vpc-huawei-stage-expanded-lock', Boolean(isExpanded));
        updateFullscreenButton();
    }

    async function toggleFullscreen() {
        const stageShell = byId('architectureVpcHuaweiStageShell');

        if (!stageShell) {
            return;
        }

        try {
            if (stageShell.classList.contains('architecture-vpc-huawei-stage-expanded')) {
                setStageExpanded(false);
                return;
            }

            if (document.fullscreenElement === stageShell) {
                if (typeof document.exitFullscreen === 'function') {
                    await document.exitFullscreen();
                } else {
                    setStageExpanded(false);
                }
                return;
            }

            if (typeof stageShell.requestFullscreen !== 'function') {
                setStageExpanded(true);
                return;
            }

            await stageShell.requestFullscreen();
            updateFullscreenButton();
        } catch (error) {
            setStageExpanded(true);
        }
    }

    function bindEvents(root) {
        bindClick('architectureVpcHuaweiGenerate', generateFromControls);
        bindClick('architectureVpcHuaweiReset', function () {
            applyPreset(valueOf('architectureVpcHuaweiPreset'), false);
        });
        byId('architectureVpcHuaweiPreset').addEventListener('change', function () {
            applyPreset(valueOf('architectureVpcHuaweiPreset'), true);
        });
        bindControlChangeHandlers();
        all('.architecture-vpc-huawei-sort-option').forEach(function (option) {
            option.addEventListener('click', function () {
                setInventorySortMode(option.dataset.sortValue || 'id');
            });
        });
        bindClick('architectureVpcHuaweiZoomOut', function () {
            setStageZoom(stageZoom - 10);
        });
        bindClick('architectureVpcHuaweiZoomIn', function () {
            setStageZoom(stageZoom + 10);
        });
        byId('architectureVpcHuaweiZoomInput').addEventListener('change', function (event) {
            setStageZoom(event.target.value);
        });
        bindClick('architectureVpcHuaweiZoomFit', function () {
            setStageZoomToFit();
        });
        bindClick('architectureVpcHuaweiZoomActual', function () {
            setStageZoom(100);
        });
        bindClick('architectureVpcHuaweiUndoStageEdit', function () {
            undoStageEdit();
        });
        bindClick('architectureVpcHuaweiHighlightAll', function () {
            setStageDiagramHighlighted(!stageDiagramHighlighted);
        });
        bindClick('architectureVpcHuaweiZoomHideUi', function () {
            toggleStageUi(byId('architectureVpcHuaweiStageShell'));
        });
        bindClick('architectureVpcHuaweiFullscreen', toggleFullscreen);
        bindClick('architectureVpcHuaweiResetLayout', function () {
            if (!currentSpec) {
                renderPresetPreview(getPreset(valueOf('architectureVpcHuaweiPreset')), {
                    resetZoom: true
                });
                return;
            }

            pushStageUndoSnapshot();
            layoutOverrides = {};
            connectorOverrides = {};
            selectedNodeId = '';
            selectedNodeIds = [];
            selectedConnectorId = '';
            highlightedNodeId = '';
            highlightedNodeIds = [];
            stageDiagramHighlighted = false;
            stageZoom = 50;
            setValue('architectureVpcHuaweiZoomInput', stageZoom);
            updateHighlightAllButton();
            renderResult(currentSpec, {
                autoFitStage: true
            });
        });
        bindClick('architectureVpcHuaweiUsageHelpButton', function () {
            setUsageHelpOpen(true);
        });
        bindClick('architectureVpcHuaweiUsageHelpClose', function () {
            setUsageHelpOpen(false);
        });
        byId('architectureVpcHuaweiUsageHelpPopup').addEventListener('click', function (event) {
            if (event.target !== byId('architectureVpcHuaweiUsageHelpPopup')) {
                return;
            }

            setUsageHelpOpen(false);
        });
        byId('architectureVpcHuaweiUsageHelpPopup').addEventListener('keydown', handleUsageHelpKeydown);
        bindClick('architectureVpcHuaweiHighlightNode', highlightSelectedNode);
        bindClick('architectureVpcHuaweiApplyNode', applySelectedNodeValues);
        bindClick('architectureVpcHuaweiResetNode', resetSelectedNode);
        bindClick('architectureVpcHuaweiDownloadSvg', downloadSvg);
        bindClick('architectureVpcHuaweiExportPng', function () {
            exportPng().catch(function () {
                showError('PNG export failed.');
            });
        });
        bindClick('architectureVpcHuaweiCopyJson', function () {
            copyJson().catch(function () {
                showError('Copy JSON failed.');
            });
        });
        bindClick('architectureVpcHuaweiDownloadJson', downloadJson);
        bindClick('architectureVpcHuaweiImportJsonButton', function () {
            byId('architectureVpcHuaweiImportJson').click();
        });
    // ns:start family._base.workspace.08_json-restore
        byId('architectureVpcHuaweiImportJson').addEventListener('change', handleImportChange);
    // ns:end family._base.workspace.08_json-restore
        document.addEventListener('mousemove', handlePointerMove);
        document.addEventListener('mouseup', handlePointerUp);
        document.addEventListener('keydown', handleStageUndoKeydown);
        document.addEventListener('keydown', handleKeyboardMove);
        document.addEventListener('fullscreenchange', function () {
            if (!document.fullscreenElement) {
                setStageExpanded(false);
                return;
            }

            updateFullscreenButton();
        });
        document.addEventListener('keydown', function (event) {
            const stageShell = byId('architectureVpcHuaweiStageShell');

            if (event.key === 'Escape' && stageShell && stageShell.classList.contains('architecture-vpc-huawei-stage-expanded')) {
                setStageExpanded(false);
            }
        });
        document.addEventListener('wheel', handleWheelZoom, {
            passive: false
        });
        bindTabs();
    }

    document.addEventListener('DOMContentLoaded', function () {
        const root = document.querySelector('.architecture-vpc-huawei-tool');

        if (!validateRequiredElements(root)) {
            return;
        }
        bindEvents(root);
        initMarkdownCopyButtons();
        syncPresetDescription();
        applyPreset('secure-vpc-app', false);
        applyWorkspaceInfoMarkers();
    });

    /**
     * Public browser API for the Huawei Cloud architecture workspace.
     *
     * @type {Object}
     */
    const publicApi = Object.freeze({
        toolId: core.toolId,
        collectValues: collectValues,
        renderResult: renderResult
    });

    globalScope.InfraStackArchitectureVpcHuawei = publicApi;
    globalScope.InfraStackArchitectureVpcHuaweiArchitecture = publicApi;
}(window));
/* table-output-standard:start */
(function setupArchitectureVpcHuaweiTableOutputStandard() {
    const rootSelector = '.architecture-vpc-huawei-tool';
    const tableSelector = '.tool-result-table tbody tr, .architecture-vpc-huawei-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .architecture-vpc-huawei-table tbody';
    const clampClass = 'architecture-vpc-huawei-table-cell-text';
    const cellClampClass = 'architecture-vpc-huawei-cell-clamp';
    const statusColumnClass = 'architecture-vpc-huawei-table-status-cell';

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
        root.querySelectorAll('.tool-result-table, .architecture-vpc-huawei-table').forEach(function alignStatusTable(table) {
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
