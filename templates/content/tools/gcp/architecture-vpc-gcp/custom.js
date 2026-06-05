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
            chipGrid.setAttribute('aria-label', 'Result summary chips');
            summaryCard.appendChild(chipGrid);
        }

        chipGrid.classList.remove(prefix + '-result-chip-row');
        chipGrid.classList.add(prefix + '-result-chip-grid');
        chipGrid.setAttribute('aria-label', 'Result summary chips');

        Array.from(chipGrid.querySelectorAll('.' + prefix + '-result-chip')).forEach(function (chip) {
            if (/^updated\b/i.test(chip.textContent.trim())) {
                chip.remove();
            }
        });

        const fallbackChips = [
            { text: 'Production Ready', tone: 'ready', icon: 'bi bi-shield-check' },
            { text: 'Region', tone: 'baseline', icon: 'bi bi-globe2' },
            { text: 'Zones', tone: 'baseline', icon: 'bi bi-grid-3x3-gap' },
            { text: 'Egress', tone: 'baseline', icon: 'bi bi-arrow-left-right' },
            { text: 'App tier', tone: 'baseline', icon: 'bi bi-hdd-network' },
            { text: 'Data tier', tone: 'baseline', icon: 'bi bi-database' }
        ];

        while (chipGrid.querySelectorAll('.' + prefix + '-result-chip').length < 6) {
            const chipCount = chipGrid.querySelectorAll('.' + prefix + '-result-chip').length;
            const fallback = fallbackChips[Math.min(chipCount, fallbackChips.length - 1)];

            chipGrid.appendChild(createChip(fallback.text, fallback.tone, fallback.icon));
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

installInfraStackResultSummaryNormalizer('architecture-vpc-gcp');
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
            "architectureVpcGcpPrompt",
            "architectureVpcGcpGenerate",
            "architectureVpcGcpReset",
            "architectureVpcGcpErrorState"
        ],
        "sourceClasses": [
            "tool-prompt-shell",
            "tool-main-row",
            "tool-main-label",
            "tool-main-input-grid",
            "architecture-vpc-gcp-prompt",
            "architecture-vpc-gcp-prompt-hint",
            "architecture-vpc-gcp-main-actions",
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
            "architectureVpcGcpPreset",
            "architectureVpcGcpPresetDescription",
            "architectureVpcGcpRegion",
            "architectureVpcGcpAzCount"
        ],
        "sourceClasses": [
            "architecture-vpc-gcp-basic-preset-section",
            "architecture-vpc-gcp-basic-grid",
            "architecture-vpc-gcp-control-stack",
            "architecture-vpc-gcp-native-select",
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
            "architectureVpcGcpNetworkConfigTab",
            "architectureVpcGcpWorkloadConfigTab",
            "architectureVpcGcpServicesConfigTab",
            "architectureVpcGcpNetworkConfigPanel",
            "architectureVpcGcpWorkloadConfigPanel",
            "architectureVpcGcpServicesConfigPanel",
            "architectureVpcGcpCidr",
            "architectureVpcGcpNatMode",
            "architectureVpcGcpAppTier",
            "architectureVpcGcpDatabase",
            "architectureVpcGcpRoute53",
            "architectureVpcGcpCloudFront",
            "architectureVpcGcpWaf",
            "architectureVpcGcpAlb",
            "architectureVpcGcpBastion",
            "architectureVpcGcpEndpoints",
            "architectureVpcGcpFlowLogs",
            "architectureVpcGcpCloudWatch",
            "architectureVpcGcpSiteToSiteVpn",
            "architectureVpcGcpTransitGateway",
            "architectureVpcGcpCache"
        ],
        "sourceClasses": [
            "architecture-vpc-gcp-custom-panel",
            "architecture-vpc-gcp-custom-panel-summary",
            "architecture-vpc-gcp-config-tabs",
            "architecture-vpc-gcp-config-tab",
            "architecture-vpc-gcp-config-panel",
            "architecture-vpc-gcp-config-grid",
            "architecture-vpc-gcp-toggle-grid",
            "architecture-vpc-gcp-toggle-item"
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
            "architectureVpcGcpSelectedShell",
            "architectureVpcGcpSelectedEmpty",
            "architectureVpcGcpSelectedEditor",
            "architectureVpcGcpSelectedName",
            "architectureVpcGcpSelectedX",
            "architectureVpcGcpSelectedY",
            "architectureVpcGcpSelectedWidth",
            "architectureVpcGcpSelectedHeight",
            "architectureVpcGcpHighlightCard",
            "architectureVpcGcpApplyCardSize",
            "architectureVpcGcpResetCardSize"
        ],
        "sourceClasses": [
            "architecture-vpc-gcp-selected-section",
            "architecture-vpc-gcp-selected-empty",
            "architecture-vpc-gcp-selected-empty-chips",
            "architecture-vpc-gcp-selected-hint-chip",
            "architecture-vpc-gcp-selected-editor",
            "architecture-vpc-gcp-selected-name",
            "architecture-vpc-gcp-selected-actions",
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
            "architectureVpcGcpStageTitle",
            "architectureVpcGcpStageSubtitle",
            "architectureVpcGcpStageMeta",
            "architectureVpcGcpOutputEmpty",
            "architectureVpcGcpPromptSummary",
            "architectureVpcGcpResultTextGenerated"
        ],
        "sourceClasses": [
            "architecture-vpc-gcp-stage-header",
            "architecture-vpc-gcp-stage-heading",
            "architecture-vpc-gcp-stage-preset-chip",
            "architecture-vpc-gcp-stage-meta",
            "architecture-vpc-gcp-prompt-notes-card",
            "architecture-vpc-gcp-note-card",
            "architecture-vpc-gcp-note-copy",
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
            "architectureVpcGcpStageShell",
            "architectureVpcGcpStageEmpty",
            "architectureVpcGcpStageCanvas",
            "architectureVpcGcpZoomControl",
            "architectureVpcGcpZoomLabel",
            "architectureVpcGcpZoomInput",
            "architectureVpcGcpZoomOut",
            "architectureVpcGcpZoomIn",
            "architectureVpcGcpZoomFit",
            "architectureVpcGcpZoomActual",
            "architectureVpcGcpUndoStageEdit",
            "architectureVpcGcpHighlightAll",
            "architectureVpcGcpZoomHideUi",
            "architectureVpcGcpUsageHelpButton",
            "architectureVpcGcpUsageHelpPopup",
            "architectureVpcGcpUsageHelpClose",
            "architectureVpcGcpFullscreen",
            "architectureVpcGcpResetLayout"
        ],
        "sourceClasses": [
            "tool-stage-shell",
            "tool-stage-toolbar",
            "tool-stage-body",
            "tool-stage-empty",
            "tool-stage-canvas",
            "architecture-vpc-gcp-stage-canvas",
            "architecture-vpc-gcp-zoom-control",
            "architecture-vpc-gcp-icon-btn",
            "architecture-vpc-gcp-stage-preview",
            "architecture-vpc-gcp-usage-overlay",
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
            "architectureVpcGcpOutputStatus",
            "architectureVpcGcpScoreValue",
            "architectureVpcGcpScoreEchart"
        ],
        "sourceClasses": [
            "architecture-vpc-gcp-output-summary",
            "architecture-vpc-gcp-output-status-card",
            "architecture-vpc-gcp-score-card",
            "architecture-vpc-gcp-score-ring-card",
            "architecture-vpc-gcp-score-value",
            "architecture-vpc-gcp-score-copy",
            "architecture-vpc-gcp-score-kicker",
            "architecture-vpc-gcp-score-summary",
            "architecture-vpc-gcp-score-detail",
            "architecture-vpc-gcp-score-tag"
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
            "architectureVpcGcpInventorySortSelect",
            "architectureVpcGcpInventorySortSummary",
            "architectureVpcGcpInventorySort",
            "architectureVpcGcpExportPng",
            "architectureVpcGcpDownloadSvg",
            "architectureVpcGcpCopyJson",
            "architectureVpcGcpDownloadJson",
            "architectureVpcGcpImportJsonButton"
        ],
        "sourceClasses": [
            "architecture-vpc-gcp-toolbar-shell",
            "architecture-vpc-gcp-toolbar",
            "architecture-vpc-gcp-toolbar-main",
            "tool-output-toolbar",
            "tool-output-actions",
            "architecture-vpc-gcp-sort-label",
            "architecture-vpc-gcp-sort-wrap",
            "architecture-vpc-gcp-sort-select",
            "architecture-vpc-gcp-sort-summary",
            "architecture-vpc-gcp-sort-menu",
            "architecture-vpc-gcp-sort-option"
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
            "architectureVpcGcpOutputEmpty",
            "architectureVpcGcpOutputContent",
            "architectureVpcGcpInventoryTableBody",
            "architectureVpcGcpRoutingTableBody",
            "architectureVpcGcpControlTableBody",
            "architectureVpcGcpPromptSummary",
            "architectureVpcGcpKeywordList",
            "architectureVpcGcpAssumptionList",
            "architectureVpcGcpModelList",
            "architectureVpcGcpProsList",
            "architectureVpcGcpConsList",
            "architectureVpcGcpPillarBreakdown",
            "architectureVpcGcpRiskLevel",
            "architectureVpcGcpJsonOutput",
            "architectureVpcGcpImportJson"
        ],
        "sourceClasses": [
            "tool-output-shell",
            "tool-empty-state",
            "architecture-vpc-gcp-output-content",
            "architecture-vpc-gcp-output-shell",
            "architecture-vpc-gcp-tabs-shell",
            "tool-tabs",
            "architecture-vpc-gcp-tab-btn",
            "architecture-vpc-gcp-tab-panel",
            "architecture-vpc-gcp-inventory-panel",
            "architecture-vpc-gcp-table-card",
            "architecture-vpc-gcp-table-wrap",
            "architecture-vpc-gcp-table",
            "architecture-vpc-gcp-row-copy",
            "architecture-vpc-gcp-prompt-notes-card",
            "architecture-vpc-gcp-assessment-card",
            "architecture-vpc-gcp-pillar-card",
            "architecture-vpc-gcp-risk-card",
            "tool-json-shell",
            "architecture-vpc-gcp-json-code"
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
{{ include('content/tools/gcp/architecture-vpc-gcp/assets/bin/engine-runtime.js')|raw }}
// ns:end family.architecture.workspace.04_visual-contract
{{ include('content/tools/gcp/architecture-vpc-gcp/assets/bin/model-core.js')|raw }}

const architectureVpcGcpPresetCatalog = [
    {
        id: 'three-tier-web',
        label: '3-Tier Web',
        description: 'Public External HTTP(S) Load Balancer, private managed instance groups, Cloud SQL, single Cloud NAT.',
        prompt: 'Create a GCP VPC topology in us-central1 with 2 zones. Use public subnets for an internet-facing External HTTP(S) Load Balancer, private app subnets for Managed Instance Groups, and private data subnets for Cloud SQL. Add a single Cloud NAT, Private Service Connect for Cloud Storage and Secret Manager, Cloud Monitoring, and VPC Flow Logs.',
        defaults: {
            region: 'us-central1',
            cidr: '10.0.0.0/16',
            azCount: 2,
            natMode: 'single',
            appTier: 'ec2',
            database: 'rds',
            route53: true,
            cloudFront: false,
            waf: false,
            alb: true,
            bastion: false,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: false,
            transitGateway: false,
            cache: false
        }
    },
    {
        id: 'ecs-fargate',
        label: 'Cloud Run',
        description: 'Cloud CDN, Cloud Armor, Cloud Run, PostgreSQL, Redis, and per-zone Cloud NAT.',
        prompt: 'Build a GCP VPC topology in europe-west1 across 2 zones for an internet-facing Cloud Run platform. Put Cloud CDN and Cloud Armor in front of an External HTTP(S) Load Balancer, keep Cloud Run in private app subnets, use Cloud SQL for PostgreSQL in private data subnets, add Memorystore for Redis, Private Service Connect, Cloud Monitoring, VPC Flow Logs, and one Cloud NAT policy per zone.',
        defaults: {
            region: 'europe-west1',
            cidr: '10.20.0.0/16',
            azCount: 2,
            natMode: 'per-az',
            appTier: 'ecs',
            database: 'aurora',
            route53: true,
            cloudFront: true,
            waf: true,
            alb: true,
            bastion: false,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: false,
            transitGateway: false,
            cache: true
        }
    },
    {
        id: 'eks-platform',
        label: 'Private GKE',
        description: 'Three zone platform with private node pools, Private Service Connect, IAP, and observability.',
        prompt: 'Generate a GCP VPC topology in asia-southeast1 across 3 zones for a private GKE platform. Keep an External HTTP(S) Load Balancer in public subnets, node pools in private app subnets, Cloud SQL for PostgreSQL in private data subnets, Identity-Aware Proxy for controlled admin access, Private Service Connect, Cloud Monitoring, and VPC Flow Logs. Use one Cloud NAT policy per zone.',
        defaults: {
            region: 'asia-southeast1',
            cidr: '10.30.0.0/16',
            azCount: 3,
            natMode: 'per-az',
            appTier: 'eks',
            database: 'aurora',
            route53: true,
            cloudFront: false,
            waf: false,
            alb: true,
            bastion: true,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: false,
            transitGateway: false,
            cache: false
        }
    },
    {
        id: 'hybrid-shared',
        label: 'Hybrid Shared Services',
        description: 'Cloud VPN or Network Connectivity Center connectivity with shared service layers.',
        prompt: 'Design a GCP VPC topology in us-west1 across 2 zones for a hybrid environment. Use Cloud DNS, an internet-facing External HTTP(S) Load Balancer, Managed Instance Groups in private app subnets, Cloud SQL in private data subnets, Identity-Aware Proxy, Private Service Connect, Cloud Monitoring, VPC Flow Logs, Cloud VPN, and Network Connectivity Center for shared services. Use a single Cloud NAT.',
        defaults: {
            region: 'us-west1',
            cidr: '10.40.0.0/16',
            azCount: 2,
            natMode: 'single',
            appTier: 'ec2',
            database: 'rds',
            route53: true,
            cloudFront: false,
            waf: false,
            alb: true,
            bastion: true,
            endpoints: true,
            flowLogs: true,
            cloudWatch: true,
            siteToSiteVpn: true,
            transitGateway: true,
            cache: false
        }
    }
];

const ARCHITECTURE_VPC_GCP_TOOL_ID = ArchitectureVpcGcpModelCore.toolId;
const ARCHITECTURE_VPC_GCP_TOOL_VERSION = ArchitectureVpcGcpModelCore.toolVersion;
const architectureVpcGcpRegionCatalog = ArchitectureVpcGcpModelCore.regionCatalog;
const architectureVpcGcpSupportedRegions = ArchitectureVpcGcpModelCore.supportedRegions;
const architectureVpcGcpAllowedNatModes = ArchitectureVpcGcpModelCore.allowedNatModes;
const architectureVpcGcpAllowedAppTiers = ArchitectureVpcGcpModelCore.allowedAppTiers;
const architectureVpcGcpAllowedDatabases = ArchitectureVpcGcpModelCore.allowedDatabases;
const architectureVpcGcpEngineRuntime = window.InfraStackArchitectureEngineRuntime || null;

const architectureVpcGcpIconSvgMap = {
    architectureVpcGcp: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-vpc.svg')|json_encode|raw }},
    route53: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-dns.svg')|json_encode|raw }},
    cloudFront: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-cdn.svg')|json_encode|raw }},
    waf: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-armor.svg')|json_encode|raw }},
    internetGateway: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-internet-edge.svg')|json_encode|raw }},
    applicationLoadBalancer: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-external-https-load-balancer.svg')|json_encode|raw }},
    vpcRouter: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-router.svg')|json_encode|raw }},
    natGateway: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-nat.svg')|json_encode|raw }},
    ec2: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-compute-engine.svg')|json_encode|raw }},
    ec2AutoScaling: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-managed-instance-groups.svg')|json_encode|raw }},
    ecs: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-run.svg')|json_encode|raw }},
    eks: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-gke.svg')|json_encode|raw }},
    fargate: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-run.svg')|json_encode|raw }},
    lambda: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-functions.svg')|json_encode|raw }},
    rds: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-sql.svg')|json_encode|raw }},
    aurora: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-sql-postgresql.svg')|json_encode|raw }},
    dynamodb: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-firestore.svg')|json_encode|raw }},
    elasticache: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-memorystore.svg')|json_encode|raw }},
    vpcEndpoints: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-private-service-connect.svg')|json_encode|raw }},
    vpcFlowLogs: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-vpc-flow-logs.svg')|json_encode|raw }},
    cloudWatch: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-monitoring.svg')|json_encode|raw }},
    systemsManager: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-secret-manager.svg')|json_encode|raw }},
    siteToSiteVpn: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-cloud-vpn.svg')|json_encode|raw }},
    transitGateway: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-network-connectivity-center.svg')|json_encode|raw }},
    bastion: {{ include('content/tools/gcp/architecture-vpc-gcp/assets/icon/gcp-arch-identity-aware-proxy.svg')|json_encode|raw }}
};

document.addEventListener('DOMContentLoaded', function () {
    const promptInput = document.getElementById('architectureVpcGcpPrompt');
    const generateButton = document.getElementById('architectureVpcGcpGenerate');
    const resetButton = document.getElementById('architectureVpcGcpReset');
    const errorState = document.getElementById('architectureVpcGcpErrorState');
    const presetInput = document.getElementById('architectureVpcGcpPreset');
    const presetDescription = document.getElementById('architectureVpcGcpPresetDescription');
    const stageTitle = document.getElementById('architectureVpcGcpStageTitle');
    const stageSubtitle = document.getElementById('architectureVpcGcpStageSubtitle');
    const stageMeta = document.getElementById('architectureVpcGcpStageMeta');
    const stageEmpty = document.getElementById('architectureVpcGcpStageEmpty');
    const stageCanvas = document.getElementById('architectureVpcGcpStageCanvas');
    const stageShell = document.getElementById('architectureVpcGcpStageShell');
    const zoomControl = document.getElementById('architectureVpcGcpZoomControl');
    const zoomLabel = document.getElementById('architectureVpcGcpZoomLabel');
    const zoomInput = document.getElementById('architectureVpcGcpZoomInput');
    const zoomOutButton = document.getElementById('architectureVpcGcpZoomOut');
    const zoomInButton = document.getElementById('architectureVpcGcpZoomIn');
    const zoomFitButton = document.getElementById('architectureVpcGcpZoomFit');
    const zoomActualButton = document.getElementById('architectureVpcGcpZoomActual');
    const undoStageEditButton = document.getElementById('architectureVpcGcpUndoStageEdit');
    const highlightAllButton = document.getElementById('architectureVpcGcpHighlightAll');
    const zoomHideUiButton = document.getElementById('architectureVpcGcpZoomHideUi');
    const usageHelpButton = document.getElementById('architectureVpcGcpUsageHelpButton');
    const usageHelpPopup = document.getElementById('architectureVpcGcpUsageHelpPopup');
    const usageHelpCloseButton = document.getElementById('architectureVpcGcpUsageHelpClose');
    const fullscreenButton = document.getElementById('architectureVpcGcpFullscreen');
    const resetLayoutButton = document.getElementById('architectureVpcGcpResetLayout');
    const outputEmpty = document.getElementById('architectureVpcGcpOutputEmpty');
    const outputContent = document.getElementById('architectureVpcGcpOutputContent');
    const outputStatus = document.getElementById('architectureVpcGcpOutputStatus');
    const pillarBreakdownOutput = document.getElementById('architectureVpcGcpPillarBreakdown');
    const riskLevelOutput = document.getElementById('architectureVpcGcpRiskLevel');
    const inventoryTableBody = document.getElementById('architectureVpcGcpInventoryTableBody');
    const inventorySortInput = document.getElementById('architectureVpcGcpInventorySort');
    const inventorySortSelect = document.getElementById('architectureVpcGcpInventorySortSelect');
    const inventorySortSummary = document.getElementById('architectureVpcGcpInventorySortSummary');
    const inventorySortOptions = Array.from(document.querySelectorAll('.architecture-vpc-gcp-sort-option'));
    const jsonOutput = document.getElementById('architectureVpcGcpJsonOutput');
    const promptSummary = document.getElementById('architectureVpcGcpPromptSummary');
    const keywordList = document.getElementById('architectureVpcGcpKeywordList');
    const assumptionList = document.getElementById('architectureVpcGcpAssumptionList');
    const modelList = document.getElementById('architectureVpcGcpModelList');
    const prosList = document.getElementById('architectureVpcGcpProsList');
    const consList = document.getElementById('architectureVpcGcpConsList');
    const selectedEmpty = document.getElementById('architectureVpcGcpSelectedEmpty');
    const selectedEditor = document.getElementById('architectureVpcGcpSelectedEditor');
    const selectedName = document.getElementById('architectureVpcGcpSelectedName');
    const selectedXInput = document.getElementById('architectureVpcGcpSelectedX');
    const selectedYInput = document.getElementById('architectureVpcGcpSelectedY');
    const selectedWidthInput = document.getElementById('architectureVpcGcpSelectedWidth');
    const selectedHeightInput = document.getElementById('architectureVpcGcpSelectedHeight');
    const highlightCardButton = document.getElementById('architectureVpcGcpHighlightCard');
    const applyCardSizeButton = document.getElementById('architectureVpcGcpApplyCardSize');
    const resetCardSizeButton = document.getElementById('architectureVpcGcpResetCardSize');
    const exportPngButton = document.getElementById('architectureVpcGcpExportPng');
    const downloadSvgButton = document.getElementById('architectureVpcGcpDownloadSvg');
    const copyJsonButton = document.getElementById('architectureVpcGcpCopyJson');
    const downloadJsonButton = document.getElementById('architectureVpcGcpDownloadJson');
    const importJsonButton = document.getElementById('architectureVpcGcpImportJsonButton');
    const importJsonInput = document.getElementById('architectureVpcGcpImportJson');
    const tabButtons = Array.from(document.querySelectorAll('.architecture-vpc-gcp-tab-btn'));
    const tabPanels = Array.from(document.querySelectorAll('.architecture-vpc-gcp-tab-panel'));
    const configTabButtons = Array.from(document.querySelectorAll('.architecture-vpc-gcp-config-tab'));
    const configTabPanels = Array.from(document.querySelectorAll('[data-config-panel]'));
    const regionInput = document.getElementById('architectureVpcGcpRegion');
    const cidrInput = document.getElementById('architectureVpcGcpCidr');
    const azCountInput = document.getElementById('architectureVpcGcpAzCount');
    const natModeInput = document.getElementById('architectureVpcGcpNatMode');
    const appTierInput = document.getElementById('architectureVpcGcpAppTier');
    const databaseInput = document.getElementById('architectureVpcGcpDatabase');
    const route53Input = document.getElementById('architectureVpcGcpRoute53');
    const cloudFrontInput = document.getElementById('architectureVpcGcpCloudFront');
    const wafInput = document.getElementById('architectureVpcGcpWaf');
    const albInput = document.getElementById('architectureVpcGcpAlb');
    const bastionInput = document.getElementById('architectureVpcGcpBastion');
    const endpointsInput = document.getElementById('architectureVpcGcpEndpoints');
    const flowLogsInput = document.getElementById('architectureVpcGcpFlowLogs');
    const cloudWatchInput = document.getElementById('architectureVpcGcpCloudWatch');
    const siteToSiteVpnInput = document.getElementById('architectureVpcGcpSiteToSiteVpn');
    const transitGatewayInput = document.getElementById('architectureVpcGcpTransitGateway');
    const cacheInput = document.getElementById('architectureVpcGcpCache');
    const customSelectElements = [
        presetInput,
        regionInput,
        azCountInput,
        natModeInput,
        appTierInput,
        databaseInput
    ];

    if (
        !promptInput ||
        !generateButton ||
        !resetButton ||
        !errorState ||
        !presetInput ||
        !presetDescription ||
        !stageTitle ||
        !stageSubtitle ||
        !stageMeta ||
        !stageEmpty ||
        !stageCanvas ||
        !stageShell ||
        !zoomControl ||
        !zoomLabel ||
        !zoomInput ||
        !zoomOutButton ||
        !zoomInButton ||
        !zoomFitButton ||
        !zoomActualButton ||
        !undoStageEditButton ||
        !highlightAllButton ||
        !zoomHideUiButton ||
        !usageHelpButton ||
        !usageHelpPopup ||
        !usageHelpCloseButton ||
        !fullscreenButton ||
        !resetLayoutButton ||
        !outputEmpty ||
        !outputContent ||
        !outputStatus ||
        !pillarBreakdownOutput ||
        !riskLevelOutput ||
        !inventoryTableBody ||
        !inventorySortInput ||
        !inventorySortSelect ||
        !inventorySortSummary ||
        !jsonOutput ||
        !promptSummary ||
        !keywordList ||
        !assumptionList ||
        !modelList ||
        !prosList ||
        !consList ||
        !selectedEmpty ||
        !selectedEditor ||
        !selectedName ||
        !selectedXInput ||
        !selectedYInput ||
        !selectedWidthInput ||
        !selectedHeightInput ||
        !highlightCardButton ||
        !applyCardSizeButton ||
        !resetCardSizeButton ||
        !exportPngButton ||
        !downloadSvgButton ||
        !copyJsonButton ||
        !downloadJsonButton ||
        !importJsonButton ||
        !importJsonInput ||
        !regionInput ||
        !cidrInput ||
        !azCountInput ||
        !natModeInput ||
        !appTierInput ||
        !databaseInput ||
        !route53Input ||
        !cloudFrontInput ||
        !wafInput ||
        !albInput ||
        !bastionInput ||
        !endpointsInput ||
        !flowLogsInput ||
        !cloudWatchInput ||
        !siteToSiteVpnInput ||
        !transitGatewayInput ||
        !cacheInput ||
        inventorySortOptions.length === 0 ||
        tabButtons.length === 0 ||
        tabPanels.length === 0 ||
        configTabButtons.length === 0 ||
        configTabPanels.length === 0
    ) {
        return;
    }

    let selectedPresetId = architectureVpcGcpPresetCatalog[0].id;
    let latestResult = null;
    let selectedCardId = '';
    let selectedCardIds = [];
    let selectedConnectorId = '';
    let stageUndoStack = [];
    let highlightedCardId = '';
    let highlightedCardIds = [];
    let highlightTimeoutId = 0;
    const defaultStageZoom = 0.5;
    let stageZoom = defaultStageZoom;
    let stageUiHidden = false;
    let stageDiagramHighlighted = false;
    let connectorOverrideContext = {};
    let inventorySortMode = 'id';
    let pendingStageFocusCardId = '';
    const minStageZoom = 0.15;
    const maxStageZoom = 2.4;
    const stageZoomStep = 0.01;
    const stageUndoLimit = 50;
    const engineRuntimeConfig = {
        zoom: {
            defaultValue: defaultStageZoom,
            min: minStageZoom,
            max: maxStageZoom,
            step: 0.1,
            wheelStep: stageZoomStep
        },
        movement: {
            step: 4,
            fastStep: 12,
            snap: 1,
            historyLimit: stageUndoLimit,
            minimumNodeWidth: 120,
            minimumNodeHeight: 70
        },
        selectors: {
            resizeHandle: '[data-engine-resize-handle], .diagram-resize-handle',
            keyboardFormTarget: 'input, textarea, select, button, summary, a[href], [contenteditable="true"]'
        },
        classes: {
            selected: 'is-selected',
            multiSelected: 'is-multi-selected',
            highlighted: 'is-highlighted',
            diagramHighlighted: 'architecture-vpc-gcp-stage-highlight-all',
            dragging: 'architecture-vpc-gcp-stage-dragging',
            resizing: 'architecture-vpc-gcp-stage-resizing',
            uiHidden: 'architecture-vpc-gcp-stage-ui-hidden',
            expanded: 'architecture-vpc-gcp-stage-expanded',
            bodyLock: 'architecture-vpc-gcp-stage-expanded-lock',
            hidden: 'd-none'
        }
    };
    const diagramShellCardId = 'architecture-vpc-gcp-shell';
    const baseStageMinWidth = 1120;
    const stageHeadingTitle = 'GCP VPC Topology';
    const selectedCardHintText = 'Select a draggable box in the stage to move, resize, or highlight it. Select a connector line to adjust its arrow handles. Arrow keys move the selected box; Shift moves faster; Alt + arrow keys resize; Cmd/Ctrl + Z undoes the last stage edit.';
    const selectedCardHintChips = [
        { icon: 'bi-cursor', label: 'Select a draggable box', tone: 'select' },
        { icon: 'bi-bezier2', label: 'Select a line to adjust arrows', tone: 'action' },
        { icon: 'bi-arrows-move', label: 'Move, resize, or highlight', tone: 'action' },
        { icon: 'bi-arrow-up-right-square', label: 'Arrow keys move selected box', tone: 'keyboard' },
        { icon: 'bi-shift', label: 'Shift moves faster', tone: 'keyboard' },
        { icon: 'bi-aspect-ratio', label: 'Alt + arrow keys resize', tone: 'resize' },
        { icon: 'bi-arrow-counterclockwise', label: 'Cmd/Ctrl + Z undoes last edit', tone: 'undo' }
    ];
    const inventoryColumnLabels = {
        index: '#',
        component: 'Component',
        placement: 'Placement',
        purpose: 'Purpose'
    };

    function renderSelectedEmptyMessage(message) {
        const messageText = String(message || '');

        selectedEmpty.classList.toggle('architecture-vpc-gcp-selected-empty-chips', messageText === selectedCardHintText);

        if (messageText !== selectedCardHintText) {
            selectedEmpty.removeAttribute('aria-label');
            selectedEmpty.textContent = messageText;
            return;
        }

        const copy = document.createElement('span');

        copy.className = 'architecture-vpc-gcp-selected-empty-copy';
        selectedEmpty.setAttribute('aria-label', selectedCardHintText);

        selectedCardHintChips.forEach(function renderHintChip(chip) {
            const chipElement = document.createElement('span');
            const iconElement = document.createElement('i');

            chipElement.className = 'architecture-vpc-gcp-selected-hint-chip architecture-vpc-gcp-selected-hint-chip-' + chip.tone;
            iconElement.className = 'bi ' + chip.icon;
            iconElement.setAttribute('aria-hidden', 'true');
            chipElement.appendChild(iconElement);
            chipElement.appendChild(document.createTextNode(chip.label));
            copy.appendChild(chipElement);
        });

        selectedEmpty.replaceChildren(copy);
    }

    function initMarkdownCopyButtons() {
        const promptBlocks = Array.from(document.querySelectorAll('.markdown-content pre.architecture-vpc-gcp-prompt-pre'));
        const promptCopyButtons = document.querySelectorAll('.architecture-vpc-gcp-prompt-copy-btn');

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

        const codeBlocks = document.querySelectorAll('.markdown-content pre:not(.architecture-vpc-gcp-prompt-pre)');

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

    function escapeHtml(value) {
        return String(value)
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
        const root = document.querySelector('.architecture-vpc-gcp-tool');
        const markerClass = 'architecture-vpc-gcp-info-marker';

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
                marker.innerHTML = '<span class="architecture-vpc-gcp-info-glyph" aria-hidden="true">i</span>';
                element.appendChild(marker);
            }

            let popover = marker.querySelector('.architecture-vpc-gcp-info-popover');

            if (!popover) {
                popover = document.createElement('span');
                popover.className = 'architecture-vpc-gcp-info-popover';
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

    function normalizePrompt(value) {
        return ArchitectureVpcGcpModelCore.normalizePrompt(value);
    }

    function normalizeCidrInput(value) {
        return ArchitectureVpcGcpModelCore.normalizeCidrInput(value);
    }

    function isValidIpv4Octet(segment) {
        if (!/^\d+$/.test(segment)) {
            return false;
        }

        const parsed = Number(segment);

        return Number.isInteger(parsed) && parsed >= 0 && parsed <= 255;
    }

    function isValidIpv4Cidr(value) {
        return ArchitectureVpcGcpModelCore.isValidIpv4Cidr(value);
    }

    function parseCidrValue(value) {
        return ArchitectureVpcGcpModelCore.parseCidrValue(value);
    }

    function getCidrValidationMessage() {
        return 'Enter a valid IPv4 VPC CIDR such as 10.0.0.0/16.';
    }

    function isSupportedImportVersion(version) {
        if (typeof version !== 'string' || version.trim() === '') {
            return false;
        }

        return version.split('.')[0] === ARCHITECTURE_VPC_GCP_TOOL_VERSION.split('.')[0];
    }

    function parseImportedEnum(value, allowedValues, fallbackValue) {
        if (value === undefined || value === null || value === '') {
            return fallbackValue;
        }

        const normalizedValue = String(value);

        return allowedValues.includes(normalizedValue) ? normalizedValue : null;
    }

    function parseImportedBoolean(value, fallbackValue) {
        if (value === undefined || value === null) {
            return fallbackValue;
        }

        if (typeof value === 'boolean') {
            return value;
        }

        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }

        return null;
    }

    function parseImportedAzCount(value, fallbackValue) {
        if (value === undefined || value === null || value === '') {
            return fallbackValue;
        }

        const parsed = Number.parseInt(String(value), 10);

        if ([1, 2, 3].includes(parsed)) {
            return parsed;
        }

        return null;
    }

    function normalizeImportedStringArray(value) {
        if (!Array.isArray(value)) {
            return [];
        }

        return value
            .filter(function (item) {
                return typeof item === 'string' && item.trim() !== '';
            })
            .map(function (item) {
                return item.trim();
            });
    }

    function buildImportedPayloadState(payload) {
        return ArchitectureVpcGcpModelCore.buildImportedPayloadState(payload, architectureVpcGcpPresetCatalog);
    }

    function readImportedVisualIds(payload, arrayKeys, scalarKeys) {
        const sources = [
            payload || {},
            payload && payload.selection && typeof payload.selection === 'object' ? payload.selection : {}
        ];

        for (let sourceIndex = 0; sourceIndex < sources.length; sourceIndex += 1) {
            const source = sources[sourceIndex];
            const arrayKey = arrayKeys.find(function (key) {
                return Array.isArray(source[key]);
            });

            if (arrayKey) {
                return normalizeImportedStringArray(source[arrayKey]);
            }

            const scalarKey = scalarKeys.find(function (key) {
                return typeof source[key] === 'string' && source[key].trim() !== '';
            });

            if (scalarKey) {
                return [source[scalarKey].trim()];
            }
        }

        return [];
    }

    function getImportedSelectedCardIds(payload) {
        return readImportedVisualIds(payload, ['selected_node_ids', 'selectedNodeIds', 'selected_card_ids', 'selectedCardIds', 'node_ids', 'nodeIds', 'card_ids', 'cardIds'], ['selected_node_id', 'selectedNodeId', 'selected_card_id', 'selectedCardId', 'node_id', 'nodeId', 'card_id', 'cardId']);
    }

    function getImportedHighlightedCardIds(payload) {
        return readImportedVisualIds(payload, ['highlighted_node_ids', 'highlightedNodeIds', 'highlighted_card_ids', 'highlightedCardIds'], ['highlighted_node_id', 'highlightedNodeId', 'highlighted_card_id', 'highlightedCardId']);
    }

    function getImportedSelectedConnectorId(payload) {
        const selectedConnectorIdKeys = ['selected_connector_id', 'selectedConnectorId', 'connector_id', 'connectorId'];
        const sources = [
            payload || {},
            payload && payload.selection && typeof payload.selection === 'object' ? payload.selection : {}
        ];

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

    function natModeLabel(value) {
        return ArchitectureVpcGcpModelCore.natModeLabel(value);
    }

    function appTierLabel(value) {
        return ArchitectureVpcGcpModelCore.appTierLabel(value);
    }

    function databaseLabel(value) {
        return ArchitectureVpcGcpModelCore.databaseLabel(value);
    }

    function findPresetById(presetId) {
        return architectureVpcGcpPresetCatalog.find(function (preset) {
            return preset.id === presetId;
        }) || architectureVpcGcpPresetCatalog[0];
    }

    function populateRegionOptions() {
        const currentValue = regionInput.value;

        regionInput.innerHTML = architectureVpcGcpRegionCatalog.map(function (region) {
            return '<option value="' + escapeHtml(region.value) + '">' + escapeHtml(region.label) + '</option>';
        }).join('');

        regionInput.value = architectureVpcGcpSupportedRegions.includes(currentValue)
            ? currentValue
            : architectureVpcGcpRegionCatalog[0].value;
    }

    function updatePresetSelection() {
        const selectedPreset = findPresetById(selectedPresetId);

        presetInput.value = selectedPreset.id;
        presetDescription.textContent = selectedPreset.description;
    }

    function activateTab(tabId) {
        tabButtons.forEach(function (button) {
            const isActive = button.dataset.tabTarget === tabId;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.tabIndex = isActive ? 0 : -1;
        });

        tabPanels.forEach(function (panel) {
            const isActive = panel.id === tabId;

            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function activateConfigTab(tabId) {
        configTabButtons.forEach(function (button) {
            const isActive = button.dataset.configTabTarget === tabId;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
            button.tabIndex = isActive ? 0 : -1;
        });

        configTabPanels.forEach(function (panel) {
            const isActive = panel.id === tabId;

            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function bindTabKeyboardNavigation(buttons, targetKey, activate) {
        buttons.forEach(function (button, index) {
            button.addEventListener('keydown', function (event) {
                let nextIndex = null;

                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    nextIndex = (index + 1) % buttons.length;
                }

                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    nextIndex = (index - 1 + buttons.length) % buttons.length;
                }

                if (event.key === 'Home') {
                    nextIndex = 0;
                }

                if (event.key === 'End') {
                    nextIndex = buttons.length - 1;
                }

                if (nextIndex === null) {
                    return;
                }

                event.preventDefault();
                activate(String(buttons[nextIndex].dataset[targetKey] || ''));
                buttons[nextIndex].focus();
            });
        });
    }

    function normalizeStageZoom(value) {
        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            return defaultStageZoom;
        }

        return Math.min(maxStageZoom, Math.max(minStageZoom, Math.round(parsed * 100) / 100));
    }

    function getStageSvgScale(svgElement) {
        const viewBox = svgElement && svgElement.viewBox && svgElement.viewBox.baseVal ? svgElement.viewBox.baseVal : null;
        const renderedWidth = svgElement ? svgElement.getBoundingClientRect().width : 0;

        if (!viewBox || viewBox.width <= 0 || renderedWidth <= 0) {
            return 1;
        }

        return renderedWidth / viewBox.width;
    }

    function readStageViewportCenter(svgElement) {
        const scale = getStageSvgScale(svgElement);

        if (!svgElement || !Number.isFinite(scale) || scale <= 0) {
            return null;
        }

        return {
            x: (stageCanvas.scrollLeft + (stageCanvas.clientWidth / 2)) / scale,
            y: (stageCanvas.scrollTop + (stageCanvas.clientHeight / 2)) / scale
        };
    }

    function restoreStageViewportCenter(svgElement, center, behavior) {
        if (!svgElement || !center || typeof stageCanvas.scrollTo !== 'function') {
            return;
        }

        window.requestAnimationFrame(function () {
            const scale = getStageSvgScale(svgElement);

            if (!Number.isFinite(scale) || scale <= 0) {
                return;
            }

            stageCanvas.scrollTo({
                left: Math.max(0, (center.x * scale) - (stageCanvas.clientWidth / 2)),
                top: Math.max(0, (center.y * scale) - (stageCanvas.clientHeight / 2)),
                behavior: behavior || 'auto'
            });
        });
    }

    function applyStageZoom() {
        const svgElement = stageCanvas.querySelector('svg');
        const zoomPercent = Math.round(stageZoom * 100);

        zoomOutButton.disabled = stageZoom <= minStageZoom;
        zoomInButton.disabled = stageZoom >= maxStageZoom;
        zoomLabel.textContent = '%';
        zoomInput.value = String(zoomPercent);
        zoomInput.setAttribute('min', String(Math.round(minStageZoom * 100)));
        zoomInput.setAttribute('max', String(Math.round(maxStageZoom * 100)));
        zoomInput.setAttribute('step', '1');

        if (!svgElement) {
            return;
        }

        const viewBox = svgElement.viewBox && svgElement.viewBox.baseVal ? svgElement.viewBox.baseVal : null;
        const baseWidth = viewBox && viewBox.width > 0 ? viewBox.width : baseStageMinWidth;

        svgElement.style.width = String(Math.round(baseWidth * stageZoom)) + 'px';
        svgElement.style.minWidth = '0';
    }

    function setStageZoom(value, options) {
        const zoomOptions = options || {};
        const svgElement = stageCanvas.querySelector('svg');
        const center = zoomOptions.preserveViewport === true ? readStageViewportCenter(svgElement) : null;

        stageZoom = normalizeStageZoom(value);
        applyStageZoom();
        restoreStageViewportCenter(svgElement, center, zoomOptions.behavior);
    }

    function setStageZoomFromPercent(percentValue, options) {
        const parsedPercent = Number.parseInt(String(percentValue || '').trim(), 10);

        if (!Number.isFinite(parsedPercent)) {
            setStageZoom(stageZoom, options);
            return;
        }

        setStageZoom(parsedPercent / 100, options);
    }

    function readRenderedStageCardsFromDom() {
        return Array.from(stageCanvas.querySelectorAll('.diagram-card-group[data-card-id]')).map(function (cardElement) {
            return {
                id: String(cardElement.dataset.cardId || ''),
                x: Number.parseFloat(cardElement.dataset.cardX),
                y: Number.parseFloat(cardElement.dataset.cardY),
                width: Number.parseFloat(cardElement.dataset.cardWidth),
                height: Number.parseFloat(cardElement.dataset.cardHeight)
            };
        }).filter(function (card) {
            return card.id !== '' &&
                Number.isFinite(card.x) &&
                Number.isFinite(card.y) &&
                Number.isFinite(card.width) &&
                Number.isFinite(card.height) &&
                card.width > 0 &&
                card.height > 0;
        });
    }

    function computeRenderedStageBounds(cards, padding) {
        const safeCards = Array.isArray(cards) && cards.length > 0 ? cards : readRenderedStageCardsFromDom();
        const safePadding = Number.isFinite(padding) ? Math.max(0, padding) : 0;
        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = 0;
        let maxY = 0;

        safeCards.forEach(function (card) {
            const x = Number(card.x);
            const y = Number(card.y);
            const width = Number(card.width);
            const height = Number(card.height);

            if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
                return;
            }

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + width);
            maxY = Math.max(maxY, y + height);
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
        const svgElement = stageCanvas.querySelector('svg');

        if (!bounds || !svgElement || typeof stageCanvas.scrollTo !== 'function') {
            return;
        }

        const scale = getStageSvgScale(svgElement);

        if (!Number.isFinite(scale) || scale <= 0) {
            return;
        }

        stageCanvas.scrollTo({
            left: Math.max(0, ((bounds.x + (bounds.width / 2)) * scale) - (stageCanvas.clientWidth / 2)),
            top: Math.max(0, ((bounds.y + (bounds.height / 2)) * scale) - (stageCanvas.clientHeight / 2)),
            behavior: behavior || 'auto'
        });
    }

    function fitStageToRenderedCards(cards, options) {
        const fitOptions = options || {};
        const svgElement = stageCanvas.querySelector('svg');
        const bounds = computeRenderedStageBounds(cards, 42);

        if (!svgElement || !bounds) {
            applyStageZoom();
            return;
        }

        if (stageCanvas.clientWidth <= 0 || stageCanvas.clientHeight <= 0) {
            applyStageZoom();

            if (fitOptions.defer !== false) {
                window.requestAnimationFrame(function () {
                    fitStageToRenderedCards(cards, Object.assign({}, fitOptions, {
                        defer: false
                    }));
                });
            }

            return;
        }

        const availableWidth = Math.max(1, stageCanvas.clientWidth - 40);
        const availableHeight = Math.max(1, stageCanvas.clientHeight - 40);
        const nextZoom = Math.min(availableWidth / bounds.width, availableHeight / bounds.height);

        stageZoom = normalizeStageZoom(nextZoom);
        applyStageZoom();
        scrollStageToBounds(bounds, fitOptions.behavior || 'auto');
    }

    function setStageZoomToFit(options) {
        const fitOptions = Object.assign({
            behavior: 'smooth'
        }, options || {});

        if (stageCanvas.clientWidth <= 0 || stageCanvas.clientHeight <= 0) {
            applyStageZoom();

            if (fitOptions.defer !== false) {
                window.requestAnimationFrame(function () {
                    setStageZoomToFit(Object.assign({}, fitOptions, {
                        defer: false
                    }));
                });
            }

            return;
        }

        fitStageToRenderedCards(latestResult && latestResult.renderedCards ? latestResult.renderedCards : null, fitOptions);
    }

    function setStageUiHidden(isHidden) {
        stageUiHidden = Boolean(isHidden);
        const label = stageUiHidden ? 'Show UI' : 'Hide UI';
        const icon = zoomHideUiButton.querySelector('i');

        stageShell.classList.toggle('architecture-vpc-gcp-stage-ui-hidden', stageUiHidden);
        zoomHideUiButton.setAttribute('aria-label', label);
        zoomHideUiButton.setAttribute('title', label);

        if (icon) {
            icon.className = stageUiHidden ? 'bi bi-eye' : 'bi bi-eye-slash';
        }
    }

    function updateStageUndoButton() {
        undoStageEditButton.disabled = stageUndoStack.length === 0;
        undoStageEditButton.setAttribute('aria-disabled', undoStageEditButton.disabled ? 'true' : 'false');
    }

    function syncStageDiagramHighlight() {
        const svgRoot = stageCanvas.querySelector('.diagram-root');
        const label = stageDiagramHighlighted ? 'Remove diagram highlight' : 'Highlight entire diagram';

        stageShell.classList.toggle('architecture-vpc-gcp-stage-highlight-all', stageDiagramHighlighted);
        highlightAllButton.setAttribute('aria-pressed', stageDiagramHighlighted ? 'true' : 'false');
        highlightAllButton.setAttribute('aria-label', label);
        highlightAllButton.setAttribute('title', label);

        if (svgRoot) {
            svgRoot.classList.toggle('is-highlight-all', stageDiagramHighlighted);
        }
    }

    function setStageDiagramHighlighted(isHighlighted) {
        stageDiagramHighlighted = Boolean(isHighlighted);
        syncStageDiagramHighlight();
    }

    function isUsageHelpOpen() {
        return !usageHelpPopup.classList.contains('d-none');
    }

    function getUsageHelpFocusableElements() {
        return Array.from(usageHelpPopup.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (element) {
            return !element.hasAttribute('disabled') && element.offsetParent !== null;
        });
    }

    function setUsageHelpOpen(isOpen) {
        const shouldOpen = Boolean(isOpen);

        usageHelpPopup.classList.toggle('d-none', !shouldOpen);
        usageHelpButton.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');

        if (shouldOpen) {
            usageHelpCloseButton.focus();
            return;
        }

        usageHelpButton.focus();
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

    function updateFullscreenButton() {
        const isFullscreen = document.fullscreenElement === stageShell || stageShell.classList.contains('architecture-vpc-gcp-stage-expanded');
        const icon = fullscreenButton.querySelector('i');
        const label = isFullscreen ? 'Exit fullscreen' : 'Open fullscreen';

        fullscreenButton.setAttribute('aria-label', label);
        fullscreenButton.setAttribute('title', label);

        if (icon) {
            icon.className = isFullscreen ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen';
        }
    }

    function setStageExpanded(isExpanded) {
        stageShell.classList.toggle('architecture-vpc-gcp-stage-expanded', Boolean(isExpanded));
        document.body.classList.toggle('architecture-vpc-gcp-stage-expanded-lock', Boolean(isExpanded));
        updateFullscreenButton();
        window.requestAnimationFrame(function () {
            applyStageZoom();
        });
    }

    function resetStageViewport() {
        const svgElement = stageCanvas.querySelector('svg');
        const vpcCard = getRenderedCardById('architecture-vpc-gcp-shell');

        if (!svgElement || !vpcCard || typeof stageCanvas.scrollTo !== 'function') {
            return;
        }

        const viewBox = svgElement.viewBox && svgElement.viewBox.baseVal ? svgElement.viewBox.baseVal : null;
        const renderedWidth = svgElement.getBoundingClientRect().width;
        const scale = viewBox && viewBox.width > 0 ? renderedWidth / viewBox.width : 1;
        const left = Math.max(0, (vpcCard.x - 48) * scale);
        const top = Math.max(0, (vpcCard.y - 64) * scale);

        stageCanvas.scrollTo({
            left: left,
            top: top,
            behavior: 'auto'
        });
    }

    function scrollStageToCard(cardId, behavior) {
        const svgElement = stageCanvas.querySelector('svg');
        const card = getRenderedCardById(cardId);

        if (!svgElement || !card || typeof stageCanvas.scrollTo !== 'function') {
            return;
        }

        const scale = getStageSvgScale(svgElement);

        if (!Number.isFinite(scale) || scale <= 0) {
            return;
        }

        stageCanvas.scrollTo({
            left: Math.max(0, ((card.x + (card.width / 2)) * scale) - (stageCanvas.clientWidth / 2)),
            top: Math.max(0, ((card.y + (card.height / 2)) * scale) - (stageCanvas.clientHeight / 2)),
            behavior: behavior || 'smooth'
        });
    }

    async function toggleFullscreen() {
        try {
            if (stageShell.classList.contains('architecture-vpc-gcp-stage-expanded')) {
                setStageExpanded(false);
                return;
            }

            if (document.fullscreenElement === stageShell) {
                if (typeof document.exitFullscreen !== 'function') {
                    setStageExpanded(false);
                    return;
                }

                await document.exitFullscreen();
                return;
            }

            if (typeof stageShell.requestFullscreen !== 'function') {
                setStageExpanded(true);
                return;
            }

            await stageShell.requestFullscreen();
            updateFullscreenButton();
            window.requestAnimationFrame(function () {
                applyStageZoom();
            });
        } catch (error) {
            setStageExpanded(true);
        }
    }

    function showError(message) {
        errorState.textContent = message;
        errorState.classList.remove('d-none');
    }

    function clearError() {
        errorState.textContent = '';
        errorState.classList.add('d-none');
    }

    function createChip(label) {
        return '<span class="tool-helper-chip">' + escapeHtml(label) + '</span>';
    }

    function createToneChip(iconClass, label, tone) {
        return [
            '<span class="architecture-vpc-gcp-score-tag architecture-vpc-gcp-score-tag-' + escapeHtml(tone) + '">',
            '<i class="' + escapeHtml(iconClass) + '" aria-hidden="true"></i>',
            '<span>' + escapeHtml(label) + '</span>',
            '</span>'
        ].join('');
    }

    function extractRegion(prompt, fallbackRegion, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);
        const matched = architectureVpcGcpSupportedRegions.find(function (region) {
            return normalizedPrompt.includes(region);
        });

        if (matched) {
            matchedKeywords.push(matched);
            return matched;
        }

        assumptions.push('Region not specified in the prompt. Kept the preset region.');

        return fallbackRegion;
    }

    function extractCidr(prompt, fallbackCidr, assumptions, matchedKeywords) {
        const cidrMatch = String(prompt || '').match(/\b(?:\d{1,3}\.){3}\d{1,3}\/\d{1,2}\b/);

        if (cidrMatch) {
            const validatedCidr = parseCidrValue(cidrMatch[0]);

            if (validatedCidr) {
                matchedKeywords.push(validatedCidr);
                return validatedCidr;
            }

            assumptions.push('Prompt included an invalid VPC CIDR. Kept the preset CIDR.');
            return fallbackCidr;
        }

        assumptions.push('VPC CIDR not specified in the prompt. Kept the preset CIDR.');

        return fallbackCidr;
    }

    function extractAzCount(prompt, fallbackAzCount, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);
        const patterns = [
            { count: 3, tests: [/3 zones/, /three zones/, /3 az/, /three az/] },
            { count: 2, tests: [/2 zones/, /two zones/, /2 az/, /two az/, /multi-az/, /multi-zone/] },
            { count: 1, tests: [/1 zone/, /one zone/, /1 az/, /single az/, /single zone/] }
        ];

        const matchedPattern = patterns.find(function (pattern) {
            return pattern.tests.some(function (test) {
                return test.test(normalizedPrompt);
            });
        });

        if (matchedPattern) {
            matchedKeywords.push(String(matchedPattern.count) + ' zone');
            return matchedPattern.count;
        }

        assumptions.push('Zone count not specified in the prompt. Kept the preset zone count.');

        return fallbackAzCount;
    }

    function resolveBooleanFeature(prompt, defaultValue, positivePatterns, negativePatterns, label, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);

        if (negativePatterns.some(function (pattern) {
            return pattern.test(normalizedPrompt);
        })) {
            matchedKeywords.push('no ' + label);
            return false;
        }

        if (positivePatterns.some(function (pattern) {
            return pattern.test(normalizedPrompt);
        })) {
            matchedKeywords.push(label);
            return true;
        }

        return defaultValue;
    }

    function extractNatMode(prompt, fallbackNatMode, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);

        if (/one cloud nat policy per zone|cloud nat per zone|nat per zone|one nat gateway per az|nat gateway per az|nat gateways in each az|per-az nat/.test(normalizedPrompt)) {
            matchedKeywords.push('Cloud NAT per zone');
            return 'per-az';
        }

        if (/no nat|without nat|private only with no nat/.test(normalizedPrompt)) {
            matchedKeywords.push('No Cloud NAT');
            return 'none';
        }

        if (/single cloud nat|single nat|one nat gateway|nat gateway|cloud nat/.test(normalizedPrompt)) {
            matchedKeywords.push('Single Cloud NAT');
            return 'single';
        }

        assumptions.push('Cloud NAT mode not specified in the prompt. Kept the preset mode.');

        return fallbackNatMode;
    }

    function extractAppTier(prompt, fallbackAppTier, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);
        const options = [
            { value: 'eks', tests: [/\bgke\b/, /google kubernetes engine/, /kubernetes/, /node pools?/, /worker nodes?/] },
            { value: 'ecs', tests: [/cloud run/, /serverless container/, /container services?/, /container apps?/] },
            { value: 'lambda', tests: [/cloud functions/, /\bfunctions\b/, /serverless/, /serverless vpc access/] },
            { value: 'ec2', tests: [/managed instance groups?/, /\bmig\b/, /compute engine/, /application servers?/, /virtual machines?/] }
        ];
        const matchedOption = options.find(function (option) {
            return option.tests.some(function (test) {
                return test.test(normalizedPrompt);
            });
        });

        if (matchedOption) {
            matchedKeywords.push(appTierLabel(matchedOption.value));
            return matchedOption.value;
        }

        assumptions.push('App tier not specified in the prompt. Kept the preset workload.');

        return fallbackAppTier;
    }

    function extractDatabase(prompt, fallbackDatabase, assumptions, matchedKeywords) {
        const normalizedPrompt = normalizePrompt(prompt);

        if (/without database|no database/.test(normalizedPrompt)) {
            matchedKeywords.push('No database');
            return 'none';
        }

        if (/firestore|cloud firestore|bigtable|nosql/.test(normalizedPrompt)) {
            matchedKeywords.push('Firestore');
            return 'dynamodb';
        }

        if (/cloud sql for postgresql|postgresql|postgres|mysql/.test(normalizedPrompt)) {
            matchedKeywords.push('Cloud SQL for PostgreSQL');
            return 'aurora';
        }

        if (/cloud sql|sql database|sql server/.test(normalizedPrompt)) {
            matchedKeywords.push('Cloud SQL');
            return 'rds';
        }

        assumptions.push('Database tier not specified in the prompt. Kept the preset data tier.');

        return fallbackDatabase;
    }

    function buildPromptTitle(prompt, fallbackLabel) {
        return ArchitectureVpcGcpModelCore.buildPromptTitle(prompt, fallbackLabel);
    }

    function inferFromPrompt(prompt, preset) {
        return ArchitectureVpcGcpModelCore.inferFromPrompt(prompt, preset);
    }

    function syncControls(spec) {
        regionInput.value = spec.region;
        cidrInput.value = spec.cidr;
        azCountInput.value = String(spec.azCount);
        natModeInput.value = spec.natMode;
        appTierInput.value = spec.appTier;
        databaseInput.value = spec.database;
        route53Input.checked = Boolean(spec.route53);
        cloudFrontInput.checked = Boolean(spec.cloudFront);
        wafInput.checked = Boolean(spec.waf);
        albInput.checked = Boolean(spec.alb);
        bastionInput.checked = Boolean(spec.bastion);
        endpointsInput.checked = Boolean(spec.endpoints);
        flowLogsInput.checked = Boolean(spec.flowLogs);
        cloudWatchInput.checked = Boolean(spec.cloudWatch);
        siteToSiteVpnInput.checked = Boolean(spec.siteToSiteVpn);
        transitGatewayInput.checked = Boolean(spec.transitGateway);
        cacheInput.checked = Boolean(spec.cache);
    }

    function buildSpecFromControls(prompt, presetId, inheritedNotes) {
        const selectedPreset = findPresetById(presetId || selectedPresetId);
        const cidrValue = String(cidrInput.value || '').trim();
        const parsedCidr = cidrValue === '' ? selectedPreset.defaults.cidr : parseCidrValue(cidrValue);
        const azCount = Math.min(3, Math.max(1, Number.parseInt(azCountInput.value, 10) || selectedPreset.defaults.azCount));
        const database = databaseInput.value;

        if (parsedCidr === null) {
            return null;
        }

        const spec = {
            presetId: selectedPreset.id,
            presetLabel: selectedPreset.label,
            title: buildPromptTitle(prompt, selectedPreset.label),
            prompt: String(prompt || '').trim(),
            region: regionInput.value || selectedPreset.defaults.region,
            cidr: parsedCidr,
            azCount: azCount,
            natMode: natModeInput.value || selectedPreset.defaults.natMode,
            appTier: appTierInput.value || selectedPreset.defaults.appTier,
            database: database,
            route53: route53Input.checked,
            cloudFront: cloudFrontInput.checked,
            waf: wafInput.checked,
            alb: albInput.checked,
            bastion: bastionInput.checked,
            endpoints: endpointsInput.checked,
            flowLogs: flowLogsInput.checked,
            cloudWatch: cloudWatchInput.checked,
            siteToSiteVpn: siteToSiteVpnInput.checked,
            transitGateway: transitGatewayInput.checked,
            cache: cacheInput.checked,
            assumptions: inheritedNotes && Array.isArray(inheritedNotes.assumptions) ? inheritedNotes.assumptions.slice() : [],
            matchedKeywords: inheritedNotes && Array.isArray(inheritedNotes.matchedKeywords) ? inheritedNotes.matchedKeywords.slice() : []
        };

        if (spec.database === 'none' && spec.cache === false && spec.natMode === 'none' && spec.alb === false && spec.cloudFront === false) {
            spec.route53 = false;
        }

        if (spec.database === 'dynamodb') {
            spec.cache = cacheInput.checked;
        }

        return spec;
    }

    function buildAzLabels(azCount) {
        const suffixes = ['a', 'b', 'c'];

        return suffixes.slice(0, azCount);
    }

    function describeInventoryItem(item, spec) {
        const component = String(item.component || '').toLowerCase();

        if (component === 'gcp vpc') {
            return 'Isolated regional network boundary where subnets, route tables, gateways, Private Service Connect, and security controls attach to the CIDR range.';
        }

        if (component === 'cloud dns') {
            return 'DNS entry point for the application hostname, resolving users toward Cloud CDN when present or directly toward the ingress tier.';
        }

        if (component === 'cloud cdn') {
            return 'Global edge distribution layer that receives client traffic, can cache content, and forwards dynamic requests to the origin path.';
        }

        if (component === 'cloud armor') {
            return 'Layer 7 request filtering policy that blocks or allows HTTP traffic before it reaches the application ingress tier.';
        }

        if (component === 'external http(s) load balancer') {
            return 'Public HTTP and HTTPS ingress tier that evaluates listener rules and routes accepted traffic to private application targets.';
        }

        if (component.indexOf('public subnet ') === 0) {
            return 'Subnet tier with an internet gateway route for public ingress components, IAP access, or managed Cloud NAT egress.';
        }

        if (component.indexOf('private app subnet ') === 0) {
            return 'Private workload subnet for ' + appTierLabel(spec.appTier) + ' resources without direct inbound internet routing.';
        }

        if (component.indexOf('cloud sql subnet ') === 0 || component.indexOf('cloud sql for postgresql subnet ') === 0) {
            return 'Private database subnet group member used to place the data tier across zones without public ingress.';
        }

        if (component === 'cloud nat') {
            return 'Managed source NAT in a public subnet, allowing private workloads to initiate outbound internet traffic without accepting inbound sessions.';
        }

        if (component === 'managed instance groups') {
            return 'Private compute fleet that scales virtual machines across app subnets, usually registered behind the ingress target pool.';
        }

        if (component === 'cloud run') {
            return 'Managed container workload tier running private application services with controlled ingress through the front-end path.';
        }

        if (component === 'gke') {
            return 'Kubernetes workload tier with private node pools, keeping cluster workloads off direct public subnet placement.';
        }

        if (component === 'gcp functions in vpc') {
            return 'Serverless compute attached to private subnets through managed network interfaces for access to internal resources.';
        }

        if (component === 'firestore') {
            return 'Regional managed data tier outside the VPC boundary, normally reached privately through Private Service Connect when enabled.';
        }

        if (component === 'memorystore for redis') {
            return 'Private in-memory cache tier used by application services for low-latency state, sessions, or query acceleration.';
        }

        if (component === 'private service connect') {
            return 'Private GCP service access path for services such as Cloud Storage and Secret Manager without depending on public internet routing.';
        }

        if (component === 'identity-aware proxy') {
            return 'Hardened administrative access layer for controlled access into private resources.';
        }

        if (component === 'cloud vpn') {
            return 'Encrypted hybrid connectivity path between on-premises networks and the VPC routing domain.';
        }

        if (component === 'network connectivity center') {
            return 'Regional routing hub for shared services, additional VPCs, and hybrid attachments with centralized route control.';
        }

        if (component === 'cloud monitoring') {
            return 'Operations plane for metrics, alarms, logs, dashboards, and service visibility across the generated architecture.';
        }

        if (component === 'vpc flow logs') {
            return 'Network telemetry capture for accepted and rejected traffic across subnet and network-security boundaries.';
        }

        return 'Generated architecture component included by the selected prompt, preset, or inspector configuration.';
    }

    function buildInventory(spec) {
        const inventory = [];
        const azLabels = buildAzLabels(spec.azCount);

        inventory.push({
            component: 'GCP VPC',
            placement: spec.region,
            purpose: spec.cidr + ' network boundary'
        });

        if (spec.route53) {
            inventory.push({
                component: 'Cloud DNS',
                placement: 'Edge',
                purpose: 'DNS entry point for the application'
            });
        }

        if (spec.cloudFront) {
            inventory.push({
                component: 'Cloud CDN',
                placement: 'Edge',
                purpose: 'Global content distribution and edge caching'
            });
        }

        if (spec.waf) {
            inventory.push({
                component: 'Cloud Armor',
                placement: 'Edge',
                purpose: 'Request filtering before the VPC ingress path'
            });
        }

        if (spec.alb) {
            inventory.push({
                component: 'External HTTP(S) Load Balancer',
                placement: 'Public subnets',
                purpose: 'Distributes inbound traffic to the application tier'
            });
        }

        azLabels.forEach(function (azLabel, index) {
            inventory.push({
                component: 'Public subnet ' + spec.region + azLabel,
                placement: 'zone ' + azLabel.toUpperCase(),
                purpose: 'Ingress and egress zone for public-facing services'
            });

            inventory.push({
                component: 'Private app subnet ' + spec.region + azLabel,
                placement: 'zone ' + azLabel.toUpperCase(),
                purpose: appTierLabel(spec.appTier)
            });

            if (spec.database === 'rds' || spec.database === 'aurora') {
                inventory.push({
                    component: databaseLabel(spec.database) + ' subnet ' + spec.region + azLabel,
                    placement: 'zone ' + azLabel.toUpperCase(),
                    purpose: index === 0 ? 'Primary database placement' : 'Standby or read replica placement'
                });
            }

            if (spec.natMode === 'per-az' || (spec.natMode === 'single' && index === 0)) {
                inventory.push({
                    component: 'Cloud NAT',
                    placement: 'Public subnet ' + spec.region + azLabel,
                    purpose: spec.natMode === 'single' ? 'Shared outbound internet path' : 'Local outbound internet path'
                });
            }
        });

        inventory.push({
            component: appTierLabel(spec.appTier),
            placement: spec.azCount + '-zone layout',
            purpose: 'Main application or platform workload'
        });

        if (spec.database === 'dynamodb') {
            inventory.push({
                component: 'Firestore',
                placement: 'Managed service outside the VPC',
                purpose: 'Serverless data tier'
            });
        }

        if (spec.cache) {
            inventory.push({
                component: 'Memorystore for Redis',
                placement: spec.database === 'none' && spec.azCount === 1 ? 'Shared VPC tier' : 'Private data services',
                purpose: 'Low-latency cache for the application tier'
            });
        }

        if (spec.endpoints) {
            inventory.push({
                component: 'Private Service Connect',
                placement: 'Private service access',
                purpose: 'Private connectivity to GCP managed services'
            });
        }

        if (spec.bastion) {
            inventory.push({
                component: 'Identity-Aware Proxy',
                placement: 'First public subnet',
                purpose: 'Controlled administrative access to private resources'
            });
        }

        if (spec.siteToSiteVpn) {
            inventory.push({
                component: 'Cloud VPN',
                placement: 'Hybrid edge',
                purpose: 'Extends on-premises connectivity into the VPC'
            });
        }

        if (spec.transitGateway) {
            inventory.push({
                component: 'Network Connectivity Center',
                placement: 'Shared network edge',
                purpose: 'Connects the VPC to shared services or additional networks'
            });
        }

        if (spec.cloudWatch) {
            inventory.push({
                component: 'Cloud Monitoring',
                placement: 'Operations',
                purpose: 'Metrics, alarms, and central visibility'
            });
        }

        if (spec.flowLogs) {
            inventory.push({
                component: 'VPC Flow Logs',
                placement: 'Operations',
                purpose: 'Captures network-level traffic telemetry'
            });
        }

        return inventory.map(function (item) {
            return Object.assign({}, item, {
                technicalDetail: describeInventoryItem(item, spec)
            });
        });
    }

    function buildModelSummary(spec) {
        const summary = [
            spec.region + ' region',
            String(spec.azCount) + ' zone' + (spec.azCount === 1 ? '' : 's'),
            natModeLabel(spec.natMode),
            appTierLabel(spec.appTier),
            databaseLabel(spec.database)
        ];

        if (spec.route53) {
            summary.push('Cloud DNS');
        }

        if (spec.cloudFront) {
            summary.push('Cloud CDN');
        }

        if (spec.waf) {
            summary.push('Cloud Armor');
        }

        if (spec.endpoints) {
            summary.push('Private Service Connect');
        }

        if (spec.siteToSiteVpn) {
            summary.push('Hybrid VPN');
        }

        if (spec.transitGateway) {
            summary.push('Network Connectivity Center');
        }

        return summary;
    }

    function clampScore(score) {
        return Math.max(0, Math.min(100, score));
    }

    function buildArchitectureProsCons(spec) {
        const pros = [];
        const cons = [];

        if (spec.azCount >= 2) {
            pros.push('Multi-zone placement improves workload and database resilience.');
        } else {
            pros.push('Single-zone placement keeps a lab or proof-of-concept topology simple.');
            cons.push('Single-zone placement limits failure tolerance.');
        }

        if (spec.alb) {
            pros.push('External HTTP(S) Load Balancer separates public ingress from private workloads.');
        } else {
            cons.push('No load balancer is modeled, so ingress scaling and health routing are unclear.');
        }

        if (spec.database === 'rds' || spec.database === 'aurora') {
            pros.push(databaseLabel(spec.database) + ' provides a managed relational data tier.');
        } else if (spec.database === 'dynamodb') {
            pros.push('Firestore removes database subnet and instance management from the VPC path.');
        } else {
            cons.push('No managed database tier is represented in the architecture.');
        }

        if (spec.endpoints) {
            pros.push('Private Service Connect reduces dependency on public internet paths for GCP service access.');
        } else {
            cons.push('Private workloads may rely on NAT or public paths for GCP service APIs.');
        }

        if (spec.cloudWatch && spec.flowLogs) {
            pros.push('Cloud Monitoring and VPC Flow Logs give the design baseline observability.');
        } else if (spec.cloudWatch || spec.flowLogs) {
            cons.push('Observability is partial; pair Cloud Monitoring with flow logs for better operations coverage.');
        } else {
            cons.push('No observability layer is modeled for metrics, logs, or network traffic inspection.');
        }

        if (spec.natMode === 'per-az') {
            pros.push('Cloud NAT per zone avoids a single outbound egress dependency.');
        } else if (spec.natMode === 'single' && spec.azCount >= 2) {
            pros.push('A single Cloud NAT keeps cost lower than per-zone NAT.');
            cons.push('A single Cloud NAT is a zone dependency for private subnet egress.');
        } else if (spec.natMode === 'none') {
            cons.push('No Cloud NAT is modeled, so private subnet outbound internet access may be blocked.');
        }

        if (spec.route53 && spec.cloudFront && spec.waf) {
            pros.push('Cloud DNS, Cloud CDN, and Cloud Armor create a stronger edge entry path.');
        } else if (!spec.waf && (spec.alb || spec.cloudFront)) {
            cons.push('No Cloud Armor layer is modeled in front of public HTTP ingress.');
        }

        if (spec.bastion) {
            cons.push('An IAP access path adds an administrative access surface that needs strict hardening.');
        }

        if (spec.siteToSiteVpn || spec.transitGateway) {
            cons.push('Hybrid connectivity needs explicit route control, segmentation, and monitoring.');
        }

        if (pros.length === 0) {
            pros.push('The diagram is restorable as JSON and can be iterated through the inspector controls.');
        }

        if (cons.length === 0) {
            cons.push('No major diagram-level gaps detected; still review IAM, firewall policies, and route tables before production.');
        }

        return {
            pros: pros,
            cons: cons
        };
    }

    function buildArchitectureScore(spec) {
        let score = 55;

        if (spec.azCount >= 2) {
            score += 12;
        } else {
            score -= 8;
        }

        if (spec.azCount >= 3) {
            score += 3;
        }

        if (spec.alb) {
            score += 7;
        }

        if (spec.route53) {
            score += 3;
        }

        if (spec.cloudFront) {
            score += 3;
        }

        if (spec.waf) {
            score += 5;
        }

        if (spec.database === 'rds' || spec.database === 'aurora') {
            score += 7;
        } else if (spec.database === 'dynamodb') {
            score += 5;
        } else {
            score -= 5;
        }

        if (spec.natMode === 'per-az') {
            score += 6;
        } else if (spec.natMode === 'single' && spec.azCount >= 2) {
            score += 1;
        } else if (spec.natMode === 'none') {
            score -= 5;
        }

        if (spec.endpoints) {
            score += 5;
        }

        if (spec.flowLogs) {
            score += 4;
        }

        if (spec.cloudWatch) {
            score += 4;
        }

        if (spec.cache) {
            score += 2;
        }

        if (spec.bastion) {
            score -= 3;
        }

        const normalizedScore = clampScore(score);
        let band = 'Needs architecture hardening';
        let badgeTone = 'review';
        let badgeLabel = 'Needs work';
        let badgeIcon = 'bi bi-exclamation-circle';
        let ringLabel = 'Needs work';
        let detail = 'Review resiliency, private tier placement, and service controls before handoff.';

        if (normalizedScore >= 85) {
            band = 'Strong production baseline';
            badgeTone = 'production';
            badgeLabel = 'Production Ready';
            badgeIcon = 'bi bi-shield-check';
            ringLabel = 'Production Ready';
            detail = 'Private tiers, managed data services, and observability are in place for a polished delivery.';
        } else if (normalizedScore >= 75) {
            band = 'Solid production-ready baseline';
            badgeTone = 'warning';
            badgeLabel = 'Delivery';
            badgeIcon = 'bi bi-exclamation-triangle';
            ringLabel = 'Delivery';
            detail = 'The architecture is presentation-ready with a few remaining resilience or cost trade-offs.';
        } else if (normalizedScore >= 65) {
            band = 'Useful baseline with clear trade-offs';
            badgeTone = 'balanced';
            badgeLabel = 'Balanced';
            badgeIcon = 'bi bi-diagram-3';
            ringLabel = 'Trade-offs';
            detail = 'The baseline is usable, but some networking or control choices still need tightening.';
        }

        return {
            score: normalizedScore,
            band: band,
            badgeTone: badgeTone,
            badgeLabel: badgeLabel,
            badgeIcon: badgeIcon,
            ringLabel: ringLabel,
            detail: detail,
            tags: [
                { icon: 'bi bi-globe2', label: spec.region + ' region', tone: 'region' },
                { icon: 'bi bi-grid-3x3-gap', label: String(spec.azCount) + ' zone' + (spec.azCount === 1 ? '' : 's'), tone: 'az' },
                { icon: 'bi bi-arrow-left-right', label: natModeLabel(spec.natMode), tone: 'network' },
                { icon: 'bi bi-hdd-network', label: appTierLabel(spec.appTier), tone: 'compute' },
                { icon: 'bi bi-database', label: databaseLabel(spec.database), tone: 'data' }
            ]
        };
    }

    function buildPillarBreakdown(spec) {
        return [
            {
                label: 'Security',
                score: clampScore(76 + (spec.endpoints ? 8 : 0) + (spec.flowLogs ? 6 : 0) + (!spec.bastion ? 5 : -6) + (spec.route53 ? 3 : 0) + (spec.waf ? 7 : 0)),
                icon: 'bi bi-shield-check',
                tone: 'security'
            },
            {
                label: 'Reliability',
                score: clampScore(63 + (spec.azCount >= 2 ? 18 : -10) + (spec.azCount >= 3 ? 3 : 0) + (spec.alb ? 8 : 0) + (spec.database === 'none' ? -6 : 6) + (spec.natMode === 'per-az' ? 5 : spec.natMode === 'single' ? 1 : -6)),
                icon: 'bi bi-cloud-check',
                tone: 'reliability'
            },
            {
                label: 'Performance',
                score: clampScore(74 + (spec.alb ? 6 : 0) + (spec.endpoints ? 4 : 0) + (spec.appTier === 'ec2' ? 4 : 5) + (spec.database !== 'none' ? 4 : -4) + (spec.cloudFront ? 4 : 0) + (spec.cache ? 3 : 0)),
                icon: 'bi bi-lightning-charge',
                tone: 'performance'
            },
            {
                label: 'Cost Optimization',
                score: clampScore(70 + (spec.natMode === 'single' ? 8 : spec.natMode === 'none' ? 10 : 2) + (spec.appTier === 'ec2' ? 4 : 2) + (!spec.cache ? 2 : -1) + (!spec.cloudFront ? 1 : 0)),
                icon: 'bi bi-currency-dollar',
                tone: 'cost'
            },
            {
                label: 'Operational Excellence',
                score: clampScore(70 + (spec.cloudWatch ? 8 : 0) + (spec.flowLogs ? 8 : 0) + (spec.endpoints ? 5 : 0) + (!spec.bastion ? 3 : -4)),
                icon: 'bi bi-gear',
                tone: 'operations'
            }
        ];
    }

    function buildRiskLevel(spec) {
        const scorePayload = buildArchitectureScore(spec);
        const consCount = buildArchitectureProsCons(spec).cons.length;
        let level = 'Low';
        let tone = 'low';
        let icon = 'bi bi-shield-check';
        let summary = 'No critical diagram-level gaps detected.';
        let detail = 'Review IAM, firewall rules, routes, and data protection settings before production change approval.';

        if (scorePayload.score < 65 || consCount >= 5) {
            level = 'High';
            tone = 'high';
            icon = 'bi bi-exclamation-octagon';
            summary = 'Several design gaps need attention.';
            detail = 'Prioritize zone spread, ingress protection, private routing, and monitoring before using this as a delivery baseline.';
        } else if (scorePayload.score < 75 || consCount >= 4) {
            level = 'Elevated';
            tone = 'elevated';
            icon = 'bi bi-exclamation-triangle';
            summary = 'Some architecture trade-offs need review.';
            detail = 'Check the highlighted resilience, access, and monitoring choices before handoff.';
        } else if (scorePayload.score < 85 || consCount >= 3) {
            level = 'Moderate';
            tone = 'moderate';
            icon = 'bi bi-shield-exclamation';
            summary = 'A few design choices need confirmation.';
            detail = 'Validate Cloud NAT placement, Private Service Connect coverage, and operational ownership before rollout.';
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

    function buildNotePayload(spec) {
        const prosCons = buildArchitectureProsCons(spec);

        return {
            prompt: spec.prompt,
            matched_keywords: spec.matchedKeywords,
            assumptions: spec.assumptions,
            current_model: buildModelSummary(spec),
            score: buildArchitectureScore(spec),
            pros: prosCons.pros,
            cons: prosCons.cons
        };
    }

    function inferEdgeCards(spec) {
        const cards = [
            { id: 'users', label: 'Users', short: 'USR', tone: 'edge' }
        ];

        if (spec.route53) {
            cards.push({ id: 'route53', label: 'Cloud DNS', short: 'DNS', tone: 'service' });
        }

        if (spec.cloudFront) {
            cards.push({ id: 'cloudfront', label: 'Cloud CDN', short: 'CDN', tone: 'service' });
        }

        if (spec.waf) {
            cards.push({ id: 'waf', label: 'Cloud Armor', short: 'WAF', tone: 'security' });
        }

        return cards;
    }

    function computeStageGeometry(spec) {
        const hasDataTier = spec.database === 'rds' || spec.database === 'aurora';
        const hasHybridRail = spec.siteToSiteVpn || spec.transitGateway;
        const outerMargin = 28;
        const azGap = spec.azCount === 1 ? 0 : spec.azCount === 2 ? 64 : 48;
        const innerPadding = spec.azCount === 3 ? 48 : 60;
        const azWidth = spec.azCount === 1 ? 640 : spec.azCount === 2 ? 360 : 300;
        const vpcWidth = (innerPadding * 2) + (azWidth * spec.azCount) + (azGap * (spec.azCount - 1));
        const rightRailGap = 48;
        const rightCardWidth = 208;
        const hasRightRail = spec.cloudWatch || spec.flowLogs || spec.database === 'dynamodb' || spec.endpoints;
        const rightRailWidth = hasRightRail ? rightRailGap + rightCardWidth + outerMargin : outerMargin;
        const hybridRailWidth = hasHybridRail ? 320 + outerMargin : outerMargin;
        const vpcY = 322;
        const edgeCards = inferEdgeCards(spec);
        const edgeCardWidth = 210;
        const edgeCardGap = 46;
        const edgeRowWidth = (edgeCards.length * edgeCardWidth) + ((edgeCards.length - 1) * edgeCardGap);
        const edgeRowOverflow = Math.max(0, (edgeRowWidth - vpcWidth) / 2);
        const leftRailWidth = Math.max(hybridRailWidth, outerMargin + edgeRowOverflow);
        const edgeRowRightEdge = leftRailWidth + (vpcWidth / 2) + (edgeRowWidth / 2);
        const width = Math.max(1180, leftRailWidth + vpcWidth + rightRailWidth, edgeRowRightEdge + outerMargin);
        const vpcX = leftRailWidth;
        const innerWidth = vpcWidth - (innerPadding * 2);
        const resolvedAzWidth = (innerWidth - (azGap * (spec.azCount - 1))) / spec.azCount;
        const topOffset = 112;
        const azXStart = vpcX + innerPadding;
        const azY = vpcY + topOffset;
        const azHeaderHeight = 78;
        const azBottomPadding = 44;
        const publicHeight = 170;
        const appHeight = hasDataTier ? 164 : 260;
        const dataHeight = hasDataTier ? 170 : 0;
        const interRowGap = 38;
        const dataTierGap = hasDataTier ? interRowGap + dataHeight : 0;
        const azHeight = azHeaderHeight + publicHeight + interRowGap + appHeight + dataTierGap + azBottomPadding;
        const sharedServicesLaneHeight = spec.cache ? 126 : 0;
        const sharedServicesY = azY + azHeight + 32;
        const vpcHeight = azHeight + topOffset + sharedServicesLaneHeight + 58;
        const rightCardGap = 56;
        const rightCardCount = [
            spec.database === 'dynamodb',
            spec.cloudWatch,
            spec.flowLogs,
            spec.endpoints
        ].filter(Boolean).length;
        const rightStackHeight = rightCardCount > 0
            ? (rightCardCount * 74) + ((rightCardCount - 1) * rightCardGap)
            : 0;
        const height = Math.max(1130, vpcY + vpcHeight + outerMargin);
        const rightX = vpcX + vpcWidth + rightRailGap;
        const rightStackY = rightCardCount > 0
            ? Math.max(vpcY + 190, vpcY + ((vpcHeight - rightStackHeight) / 2))
            : vpcY + topOffset;

        return {
            width: width,
            height: height,
            vpcX: vpcX,
            vpcY: vpcY,
            vpcWidth: vpcWidth,
            vpcHeight: vpcHeight,
            azWidth: resolvedAzWidth,
            azHeight: azHeight,
            azXStart: azXStart,
            azY: azY,
            azGap: azGap,
            edgeCards: edgeCards,
            edgeRowX: vpcX + (vpcWidth / 2) - (edgeRowWidth / 2),
            edgeRowY: 28,
            edgeCardWidth: edgeCardWidth,
            edgeCardGap: edgeCardGap,
            rightX: rightX,
            rightCardWidth: rightCardWidth,
            rightCardGap: rightCardGap,
            rightStackY: rightStackY,
            rightEdgeWidth: rightRailWidth,
            leftEdgeWidth: leftRailWidth,
            publicHeight: publicHeight,
            appHeight: appHeight,
            dataHeight: dataHeight,
            hasDataTier: hasDataTier,
            interRowGap: interRowGap,
            azHeaderHeight: azHeaderHeight,
            appCardTopInset: 74,
            sharedServicesLaneHeight: sharedServicesLaneHeight,
            sharedServicesY: sharedServicesY
        };
    }

    function buildMultilineText(x, y, lines, className, lineHeight) {
        const safeLines = lines.filter(function (line) {
            return String(line || '').trim() !== '';
        });

        if (safeLines.length === 0) {
            return '';
        }

        const textMarkup = safeLines.map(function (line, index) {
            const dy = index === 0 ? '0' : String(lineHeight);

            return '<tspan x="' + x + '" dy="' + dy + '">' + escapeHtml(line) + '</tspan>';
        }).join('');

        return '<text x="' + x + '" y="' + y + '" class="' + className + '">' + textMarkup + '</text>';
    }

    function buildSvgDataUri(svgString) {
        if (typeof svgString !== 'string' || svgString.trim() === '') {
            return '';
        }

        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    }

    function resolveCardIconHref(card) {
        if (!card.iconKey || !Object.prototype.hasOwnProperty.call(architectureVpcGcpIconSvgMap, card.iconKey)) {
            return '';
        }

        return buildSvgDataUri(architectureVpcGcpIconSvgMap[card.iconKey]);
    }

    function resolveAppTierIconKey(appTier) {
        return {
            ec2: 'ec2AutoScaling',
            ecs: 'ecs',
            eks: 'eks',
            lambda: 'lambda'
        }[appTier] || 'ec2AutoScaling';
    }

    function resolveDatabaseIconKey(database) {
        return {
            rds: 'rds',
            aurora: 'aurora',
            dynamodb: 'dynamodb'
        }[database] || 'rds';
    }

    function getDependentCardIds(cardId, spec) {
        const azLabels = buildAzLabels(spec.azCount);
        const zoneDependencies = {};
        const subnetDependencies = {};
        const architectureVpcGcpChildren = [];

        azLabels.forEach(function (azLabel, index) {
            const zoneChildren = [
                'public-subnet-' + azLabel,
                'private-app-subnet-' + azLabel,
                'app-tier-' + azLabel
            ];
            const publicSubnetChildren = [];
            const appSubnetChildren = [
                'app-tier-' + azLabel
            ];
            const dataSubnetChildren = [];

            if (spec.natMode === 'per-az' || (spec.natMode === 'single' && index === 0)) {
                zoneChildren.push('nat-gateway-' + azLabel);
                publicSubnetChildren.push('nat-gateway-' + azLabel);
            }

            if (spec.bastion && index === 0) {
                zoneChildren.push('bastion-host');
                publicSubnetChildren.push('bastion-host');
            }

            if (spec.database === 'rds' || spec.database === 'aurora') {
                zoneChildren.push('private-data-subnet-' + azLabel);
                zoneChildren.push('database-tier-' + azLabel);
                dataSubnetChildren.push('database-tier-' + azLabel);
            }

            zoneDependencies['availability-zone-' + azLabel] = zoneChildren;
            subnetDependencies['public-subnet-' + azLabel] = publicSubnetChildren;
            subnetDependencies['private-app-subnet-' + azLabel] = appSubnetChildren;

            if (spec.database === 'rds' || spec.database === 'aurora') {
                subnetDependencies['private-data-subnet-' + azLabel] = dataSubnetChildren;
            }

            architectureVpcGcpChildren.push('availability-zone-' + azLabel);
            Array.prototype.push.apply(architectureVpcGcpChildren, zoneChildren);
        });

        if (spec.alb) {
            architectureVpcGcpChildren.push('external-http-load-balancer');
        }

        architectureVpcGcpChildren.push('internet-edge');

        if (spec.cache) {
            architectureVpcGcpChildren.push('elasticache');
        }

        if (spec.endpoints) {
            architectureVpcGcpChildren.push('vpc-endpoints');
        }

        const dependencyMap = Object.assign({}, zoneDependencies, subnetDependencies, {
            'architecture-vpc-gcp-shell': architectureVpcGcpChildren
        });

        return Array.from(new Set(dependencyMap[cardId] || []));
    }

    function cloneLayoutOverrides(layoutOverrides) {
        if (architectureVpcGcpEngineRuntime && typeof architectureVpcGcpEngineRuntime.cloneLayoutOverrides === 'function') {
            return architectureVpcGcpEngineRuntime.cloneLayoutOverrides(layoutOverrides);
        }

        return ArchitectureVpcGcpModelCore.cloneLayoutOverrides(layoutOverrides);
    }

    function cloneConnectorOverrides(connectorOverrides) {
        if (architectureVpcGcpEngineRuntime && typeof architectureVpcGcpEngineRuntime.cloneConnectorOverrides === 'function') {
            return architectureVpcGcpEngineRuntime.cloneConnectorOverrides(connectorOverrides);
        }

        return ArchitectureVpcGcpModelCore.cloneConnectorOverrides(connectorOverrides);
    }

    function currentViewportState() {
        return {
            zoom: stageZoom,
            scrollLeft: stageCanvas ? stageCanvas.scrollLeft : 0,
            scrollTop: stageCanvas ? stageCanvas.scrollTop : 0,
            uiHidden: stageUiHidden,
            fullscreen: Boolean(stageShell && (document.fullscreenElement === stageShell || stageShell.classList.contains('architecture-vpc-gcp-stage-expanded'))),
            diagramHighlighted: stageDiagramHighlighted
        };
    }

    function currentSelectionState() {
        const cardIds = selectedCardIds.length > 0 ? selectedCardIds.slice() : (selectedCardId ? [selectedCardId] : []);

        return {
            nodeIds: cardIds,
            cardIds: cardIds,
            connectorId: selectedConnectorId || '',
            highlightedNodeId: highlightedCardId || '',
            highlightedNodeIds: highlightedCardIds.slice(),
            highlightedCardIds: highlightedCardIds.slice()
        };
    }

    function createEngineState(value) {
        const source = value || {};
        const stateValue = {
            viewport: Object.assign(currentViewportState(), source.viewport || {}),
            selection: Object.assign(currentSelectionState(), source.selection || {}),
            layoutOverrides: source.layoutOverrides || source.layout_overrides || getCurrentLayoutOverrides(),
            connectorOverrides: source.connectorOverrides || source.connector_overrides || getCurrentConnectorOverrides()
        };

        if (architectureVpcGcpEngineRuntime && typeof architectureVpcGcpEngineRuntime.createState === 'function') {
            return architectureVpcGcpEngineRuntime.createState(stateValue, engineRuntimeConfig);
        }

        return stateValue;
    }

    function toPersistedEngineState(value) {
        const state = createEngineState(value);

        if (architectureVpcGcpEngineRuntime && typeof architectureVpcGcpEngineRuntime.toPersistedState === 'function') {
            return architectureVpcGcpEngineRuntime.toPersistedState(state, engineRuntimeConfig);
        }

        return {
            viewport: {
                zoom: state.viewport.zoom,
                scroll_left: state.viewport.scrollLeft,
                scroll_top: state.viewport.scrollTop,
                ui_hidden: state.viewport.uiHidden,
                fullscreen: state.viewport.fullscreen,
                diagram_highlighted: state.viewport.diagramHighlighted
            },
            selection: {
                node_ids: Array.isArray(state.selection.nodeIds) ? state.selection.nodeIds.slice() : [],
                card_ids: Array.isArray(state.selection.nodeIds) ? state.selection.nodeIds.slice() : [],
                connector_id: state.selection.connectorId || '',
                highlighted_node_id: state.selection.highlightedNodeId || '',
                highlighted_node_ids: Array.isArray(state.selection.highlightedNodeIds) ? state.selection.highlightedNodeIds.slice() : [],
                highlighted_card_ids: Array.isArray(state.selection.highlightedNodeIds) ? state.selection.highlightedNodeIds.slice() : []
            },
            layout_overrides: cloneLayoutOverrides(state.layoutOverrides),
            connector_overrides: cloneConnectorOverrides(state.connectorOverrides)
        };
    }

    function restoreEngineStateFromPayload(payload, fallbackLayoutOverrides, fallbackConnectorOverrides) {
        const source = payload || {};
        const selection = Object.assign({}, source.selection || {});
        const restoredSelectedCardIds = getImportedSelectedCardIds(source);
        const restoredHighlightedCardIds = getImportedHighlightedCardIds(source);

        selection.nodeIds = restoredSelectedCardIds;
        selection.cardIds = restoredSelectedCardIds;
        selection.connectorId = getImportedSelectedConnectorId(source);
        selection.highlightedNodeId = restoredHighlightedCardIds[0] || '';
        selection.highlightedNodeIds = restoredHighlightedCardIds;
        selection.highlightedCardIds = restoredHighlightedCardIds;

        const runtimeState = createEngineState({
            viewport: source.viewport || {},
            selection: selection,
            layoutOverrides: fallbackLayoutOverrides || source.layout_overrides || source.layoutOverrides,
            connectorOverrides: fallbackConnectorOverrides || source.connector_overrides || source.connectorOverrides
        });

        selectedCardIds = Array.isArray(runtimeState.selection.nodeIds) ? runtimeState.selection.nodeIds.slice() : [];
        selectedCardId = selectedCardIds[0] || '';
        selectedConnectorId = String(runtimeState.selection.connectorId || '');
        highlightedCardIds = Array.isArray(runtimeState.selection.highlightedNodeIds) ? runtimeState.selection.highlightedNodeIds.slice() : [];
        highlightedCardId = highlightedCardIds[0] || '';
        stageDiagramHighlighted = Boolean(runtimeState.viewport.diagramHighlighted);
        stageUiHidden = Boolean(runtimeState.viewport.uiHidden);
        stageZoom = normalizeStageZoom(runtimeState.viewport.zoom || defaultStageZoom);

        return runtimeState;
    }

    function applyLayoutOverride(card, layoutOverrides) {
        if (!card.id) {
            return card;
        }

        const override = layoutOverrides && layoutOverrides[card.id] ? layoutOverrides[card.id] : null;

        if (!override) {
            return card;
        }

        return Object.assign({}, card, {
            x: Number.isFinite(override.x) ? override.x : card.x,
            y: Number.isFinite(override.y) ? override.y : card.y,
            width: Number.isFinite(override.width) ? override.width : card.width,
            height: Number.isFinite(override.height) ? override.height : card.height
        });
    }

    function getCardMinimumSize(card) {
        const cardId = String(card && card.id ? card.id : '');
        const tone = String(card && card.tone ? card.tone : '');

        if (cardId === 'architecture-vpc-gcp-shell') {
            return {
                width: 420,
                height: 280
            };
        }

        if (cardId.indexOf('availability-zone-') === 0 || tone === 'zone') {
            return {
                width: 220,
                height: 220
            };
        }

        if (cardId.indexOf('subnet-') !== -1) {
            return {
                width: 180,
                height: 96
            };
        }

        return {
            width: 120,
            height: 44
        };
    }

    function registerCard(cards, card, layoutOverrides) {
        const resolvedCard = applyLayoutOverride(card, layoutOverrides);

        cards.push(resolvedCard);

        return resolvedCard;
    }

    function buildWrappedLines(value, maxChars, maxLines) {
        const normalizedValue = String(value || '').replace(/\s+/g, ' ').trim();

        if (normalizedValue === '') {
            return [];
        }

        const words = normalizedValue.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(function (word) {
            const candidate = currentLine === '' ? word : currentLine + ' ' + word;

            if (candidate.length <= maxChars || currentLine === '') {
                currentLine = candidate;
                return;
            }

            lines.push(currentLine);
            currentLine = word;
        });

        if (currentLine !== '') {
            lines.push(currentLine);
        }

        if (lines.length <= maxLines) {
            return lines;
        }

        const trimmed = lines.slice(0, maxLines);
        const lastLine = trimmed[maxLines - 1];

        trimmed[maxLines - 1] = lastLine.length > Math.max(3, maxChars - 1)
            ? lastLine.slice(0, Math.max(3, maxChars - 1)).trim() + '…'
            : lastLine;

        return trimmed;
    }

    function formatSvgNumber(value) {
        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            return '0';
        }

        return String(Math.round(parsed * 100) / 100);
    }

    function normalizeConnectorSide(side) {
        const normalizedSide = String(side || '').trim().toLowerCase();
        const allowedSides = ['top', 'right', 'bottom', 'left'];

        if (allowedSides.includes(normalizedSide)) {
            return normalizedSide;
        }

        return '';
    }

    function getCardCenter(card) {
        return {
            x: card.x + (card.width / 2),
            y: card.y + (card.height / 2)
        };
    }

    function getOppositeSide(side) {
        const normalizedSide = normalizeConnectorSide(side);

        if (normalizedSide === 'top') {
            return 'bottom';
        }

        if (normalizedSide === 'bottom') {
            return 'top';
        }

        if (normalizedSide === 'left') {
            return 'right';
        }

        return 'left';
    }

    function inferConnectorSide(sourceCard, targetCard) {
        const sourceCenter = getCardCenter(sourceCard);
        const targetCenter = getCardCenter(targetCard);
        const dx = targetCenter.x - sourceCenter.x;
        const dy = targetCenter.y - sourceCenter.y;

        if (Math.abs(dx) >= Math.abs(dy)) {
            return dx >= 0 ? 'right' : 'left';
        }

        return dy >= 0 ? 'bottom' : 'top';
    }

    function resolveConnectorSides(sourceCard, targetCard, preferredSourceSide, preferredTargetSide) {
        const sourceSide = normalizeConnectorSide(preferredSourceSide) || inferConnectorSide(sourceCard, targetCard);
        const targetSide = normalizeConnectorSide(preferredTargetSide) || getOppositeSide(sourceSide);

        return {
            sourceSide: sourceSide,
            targetSide: targetSide
        };
    }

    function getCardAnchor(card, side, ratio) {
        const normalizedSide = normalizeConnectorSide(side);
        const normalizedRatio = normalizeAnchorRatio(ratio);
        const center = getCardCenter(card);

        if (normalizedRatio) {
            return {
                x: card.x + (card.width * normalizedRatio.x),
                y: card.y + (card.height * normalizedRatio.y)
            };
        }

        if (normalizedSide === 'top') {
            return {
                x: center.x,
                y: card.y
            };
        }

        if (normalizedSide === 'bottom') {
            return {
                x: center.x,
                y: card.y + card.height
            };
        }

        if (normalizedSide === 'left') {
            return {
                x: card.x,
                y: center.y
            };
        }

        return {
            x: card.x + card.width,
            y: center.y
        };
    }

    function getConnectorLeadPoint(point, side, distance) {
        const normalizedSide = normalizeConnectorSide(side);

        if (normalizedSide === 'top') {
            return {
                x: point.x,
                y: point.y - distance
            };
        }

        if (normalizedSide === 'bottom') {
            return {
                x: point.x,
                y: point.y + distance
            };
        }

        if (normalizedSide === 'left') {
            return {
                x: point.x - distance,
                y: point.y
            };
        }

        return {
            x: point.x + distance,
            y: point.y
        };
    }

    function normalizeAnchorRatio(ratio) {
        if (!ratio || typeof ratio !== 'object') {
            return null;
        }

        const x = Number(ratio.x);
        const y = Number(ratio.y);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: Math.min(1, Math.max(0, x)),
            y: Math.min(1, Math.max(0, y))
        };
    }

    function normalizeConnectorBend(bend) {
        if (!bend || typeof bend !== 'object') {
            return null;
        }

        const x = Number(bend.x);
        const y = Number(bend.y);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: x,
            y: y
        };
    }

    function buildAnchorRatio(card, x, y) {
        if (!card || !Number.isFinite(card.width) || !Number.isFinite(card.height) || card.width === 0 || card.height === 0) {
            return null;
        }

        return normalizeAnchorRatio({
            x: (x - card.x) / card.width,
            y: (y - card.y) / card.height
        });
    }

    function buildConnectorPathFromAnchors(start, end, sourceSide, targetSide) {
        const leadDistance = 28;
        const startLead = getConnectorLeadPoint(start, sourceSide, leadDistance);
        const endLead = getConnectorLeadPoint(end, targetSide, leadDistance);
        const sourceHorizontal = sourceSide === 'left' || sourceSide === 'right';
        const targetHorizontal = targetSide === 'left' || targetSide === 'right';
        const points = [start, startLead];

        if (sourceHorizontal && targetHorizontal) {
            const midX = startLead.x + ((endLead.x - startLead.x) / 2);

            points.push({
                x: midX,
                y: startLead.y
            });
            points.push({
                x: midX,
                y: endLead.y
            });
        } else if (!sourceHorizontal && !targetHorizontal) {
            const midY = startLead.y + ((endLead.y - startLead.y) / 2);

            points.push({
                x: startLead.x,
                y: midY
            });
            points.push({
                x: endLead.x,
                y: midY
            });
        } else {
            points.push({
                x: endLead.x,
                y: startLead.y
            });
        }

        points.push(endLead);
        points.push(end);

        return points.map(function (point, index) {
            const command = index === 0 ? 'M' : 'L';

            return command + ' ' + formatSvgNumber(point.x) + ' ' + formatSvgNumber(point.y);
        }).join(' ');
    }

    function buildConnectorPathFromAnchorsWithBend(start, end, sourceSide, targetSide, bend) {
        const leadDistance = 28;
        const startLead = getConnectorLeadPoint(start, sourceSide, leadDistance);
        const endLead = getConnectorLeadPoint(end, targetSide, leadDistance);
        const normalizedBend = normalizeConnectorBend(bend);

        if (!normalizedBend) {
            return buildConnectorPathFromAnchors(start, end, sourceSide, targetSide);
        }

        return [
            start,
            startLead,
            {
                x: normalizedBend.x,
                y: startLead.y
            },
            normalizedBend,
            {
                x: endLead.x,
                y: normalizedBend.y
            },
            endLead,
            end
        ].map(function (point, index) {
            const command = index === 0 ? 'M' : 'L';

            return command + ' ' + formatSvgNumber(point.x) + ' ' + formatSvgNumber(point.y);
        }).join(' ');
    }

    function buildConnectorPathFromCards(sourceCard, targetCard, preferredSourceSide, preferredTargetSide, sourceRatio, targetRatio, bend) {
        const sides = resolveConnectorSides(sourceCard, targetCard, preferredSourceSide, preferredTargetSide);
        const start = getCardAnchor(sourceCard, sides.sourceSide, sourceRatio);
        const end = getCardAnchor(targetCard, sides.targetSide, targetRatio);

        return buildConnectorPathFromAnchorsWithBend(start, end, sides.sourceSide, sides.targetSide, bend);
    }

    function renderResizeHandle(card, cornerRadius) {
        const handleSize = 20;
        const handleX = card.x + card.width - handleSize - 4;
        const handleY = card.y + card.height - handleSize - 4;

        return '<rect x="' + handleX + '" y="' + handleY + '" width="' + handleSize + '" height="' + handleSize + '" rx="' + cornerRadius + '" class="diagram-resize-handle" data-resize-card-id="' + escapeHtml(card.id || '') + '"></rect>';
    }

    function renderCardHighlight(card, cornerRadius) {
        const highlightPadding = 10;

        return '<rect x="' + (card.x - highlightPadding) + '" y="' + (card.y - highlightPadding) + '" width="' + (card.width + (highlightPadding * 2)) + '" height="' + (card.height + (highlightPadding * 2)) + '" rx="' + cornerRadius + '" class="diagram-card-highlight"></rect>';
    }

    function buildStageCardAriaLabel(card) {
        const subtitleValue = Array.isArray(card.subtitle) ? card.subtitle.join(' ') : String(card.subtitle || '').trim();
        const labelParts = [card.label];

        if (subtitleValue !== '') {
            labelParts.push(subtitleValue);
        }

        if (card.draggable === true) {
            labelParts.push('Press Enter to select. Use arrow keys to move. Use Alt plus arrow keys to resize.');
        }

        return labelParts.join('. ');
    }

    function renderSvgCard(card) {
        const draggable = card.draggable === true;
        const iconHref = resolveCardIconHref(card);
        const iconTileX = card.x + 12;
        const iconTileY = card.y + 12;
        const iconImageX = card.x + 18;
        const iconImageY = card.y + 18;
        const shortText = iconHref === '' ? buildMultilineText(card.x + 36, card.y + 33, [card.short], 'diagram-pill-text', 14) : '';
        const iconImage = iconHref !== '' ? '<image href="' + iconHref + '" x="' + iconImageX + '" y="' + iconImageY + '" width="20" height="20" preserveAspectRatio="xMidYMid meet"></image>' : '';
        const textAreaWidth = Math.max(10, card.width - 88);
        const titleLines = buildWrappedLines(card.label, Math.max(8, Math.floor(textAreaWidth / 6.5)), 1);
        const subtitleValue = Array.isArray(card.subtitle) ? card.subtitle.join(' ') : (card.subtitle || '');
        const subtitleLines = buildWrappedLines(subtitleValue, Math.max(10, Math.floor(textAreaWidth / 6)), 1);
        const titleY = card.y + 30;
        const subtitleY = card.y + 50 + ((titleLines.length - 1) * 14);

        return [
            '<g class="diagram-card-group' + (draggable ? ' diagram-card-group-draggable' : '') + '" data-card-id="' + escapeHtml(card.id || '') + '" data-card-x="' + card.x + '" data-card-y="' + card.y + '" data-card-width="' + card.width + '" data-card-height="' + card.height + '" data-draggable="' + (draggable ? 'true' : 'false') + '"' + (draggable ? ' tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml(buildStageCardAriaLabel(card)) + '"' : '') + '>',
            renderCardHighlight(card, 22),
            '<rect x="' + card.x + '" y="' + card.y + '" width="' + card.width + '" height="' + card.height + '" rx="16" class="diagram-card diagram-card-' + card.tone + '"></rect>',
            '<rect x="' + iconTileX + '" y="' + iconTileY + '" width="32" height="32" rx="10" class="diagram-pill diagram-pill-' + card.tone + '"></rect>',
            iconImage,
            shortText,
            buildMultilineText(card.x + 58, titleY, titleLines, 'diagram-card-title', 14),
            buildMultilineText(card.x + 58, subtitleY, subtitleLines, 'diagram-card-subtitle', 13),
            '<rect x="' + card.x + '" y="' + card.y + '" width="' + card.width + '" height="' + card.height + '" rx="16" class="diagram-card-hitbox"></rect>',
            renderResizeHandle(card, 7),
            '</g>'
        ].join('');
    }

    function getCardRenderLayer(card) {
        const cardId = String(card && card.id ? card.id : '');
        const tone = String(card && card.tone ? card.tone : '');

        if (cardId.indexOf('availability-zone-') === 0 || tone === 'zone') {
            return 10;
        }

        if (cardId.indexOf('subnet-') !== -1 || tone === 'public' || tone === 'private') {
            return 20;
        }

        return 40;
    }

    function splitCardsByLayer(cards) {
        const backgroundCards = [];
        const foregroundCards = [];

        cards.forEach(function (card) {
            if (getCardRenderLayer(card) < 40) {
                backgroundCards.push(card);
                return;
            }

            foregroundCards.push(card);
        });

        return {
            backgroundCards: backgroundCards.sort(function (firstCard, secondCard) {
                return getCardRenderLayer(firstCard) - getCardRenderLayer(secondCard);
            }),
            foregroundCards: foregroundCards
        };
    }

    function renderCardConnector(sourceCard, targetCard, options) {
        const resolvedOptions = options || {};
        const sides = resolveConnectorSides(sourceCard, targetCard, resolvedOptions.sourceSide, resolvedOptions.targetSide);
        const markerId = resolvedOptions.active ? 'architectureVpcGcpArrowActive' : 'architectureVpcGcpArrow';
        const connectorClass = 'diagram-connector' + (resolvedOptions.active ? ' diagram-connector-active' : '');
        const connectorId = String(resolvedOptions.id || sourceCard.id + '-to-' + targetCard.id);
        const connectorOverride = connectorOverrideContext[connectorId] || {};
        const sourceRatio = normalizeAnchorRatio(connectorOverride.sourceRatio) || normalizeAnchorRatio(resolvedOptions.sourceRatio);
        const targetRatio = normalizeAnchorRatio(connectorOverride.targetRatio) || normalizeAnchorRatio(resolvedOptions.targetRatio);
        const bend = normalizeConnectorBend(connectorOverride.bend) || normalizeConnectorBend(resolvedOptions.bend);
        const ratioAttributes = [];

        if (sourceRatio) {
            ratioAttributes.push(' data-source-ratio-x="' + formatSvgNumber(sourceRatio.x) + '"');
            ratioAttributes.push(' data-source-ratio-y="' + formatSvgNumber(sourceRatio.y) + '"');
        }

        if (targetRatio) {
            ratioAttributes.push(' data-target-ratio-x="' + formatSvgNumber(targetRatio.x) + '"');
            ratioAttributes.push(' data-target-ratio-y="' + formatSvgNumber(targetRatio.y) + '"');
        }

        if (bend) {
            ratioAttributes.push(' data-bend-x="' + formatSvgNumber(bend.x) + '"');
            ratioAttributes.push(' data-bend-y="' + formatSvgNumber(bend.y) + '"');
        }

        return [
            '<path d="' + buildConnectorPathFromCards(sourceCard, targetCard, sides.sourceSide, sides.targetSide, sourceRatio, targetRatio, bend) + '"',
            ' class="' + connectorClass + '"',
            ' data-connector-id="' + escapeHtml(connectorId) + '"',
            ' data-source-card="' + escapeHtml(sourceCard.id || '') + '"',
            ' data-target-card="' + escapeHtml(targetCard.id || '') + '"',
            ' data-source-side="' + sides.sourceSide + '"',
            ' data-target-side="' + sides.targetSide + '"',
            ratioAttributes.join(''),
            ' marker-end="url(#' + markerId + ')"></path>'
        ].join('');
    }

    function renderVpcShell(shell) {
        const iconHref = resolveCardIconHref(shell);
        const iconImage = iconHref !== ''
            ? '<image href="' + iconHref + '" x="' + (shell.x + 18) + '" y="' + (shell.y + 18) + '" width="24" height="24" preserveAspectRatio="xMidYMid meet"></image>'
            : '';

        return [
            '<g class="diagram-card-group diagram-card-group-draggable" data-card-id="' + shell.id + '" data-card-x="' + shell.x + '" data-card-y="' + shell.y + '" data-card-width="' + shell.width + '" data-card-height="' + shell.height + '" data-draggable="true" tabindex="0" focusable="true" role="button" aria-label="' + escapeHtml('GCP VPC. ' + shell.meta + '. Press Enter to select. Use arrow keys to move. Use Alt plus arrow keys to resize.') + '">',
            renderCardHighlight(shell, 30),
            '<rect x="' + shell.x + '" y="' + shell.y + '" width="' + shell.width + '" height="' + shell.height + '" rx="24" class="diagram-vpc"></rect>',
            '<rect x="' + (shell.x + 12) + '" y="' + (shell.y + 12) + '" width="36" height="36" rx="12" class="diagram-pill diagram-pill-service"></rect>',
            iconImage,
            buildMultilineText(shell.x + 60, shell.y + 34, ['GCP VPC'], 'diagram-vpc-title', 16),
            buildMultilineText(shell.x + 60, shell.y + 58, [shell.meta], 'diagram-vpc-meta', 16),
            '<rect x="' + shell.x + '" y="' + shell.y + '" width="' + shell.width + '" height="' + shell.height + '" rx="24" class="diagram-card-hitbox"></rect>',
            renderResizeHandle(shell, 8),
            '</g>'
        ].join('');
    }

    function computeSvgBounds(geometry, cards, vpcShell) {
        const boundsCards = cards.concat([vpcShell]);
        const maxX = boundsCards.reduce(function (currentMax, card) {
            return Math.max(currentMax, card.x + card.width);
        }, geometry.width);
        const maxY = boundsCards.reduce(function (currentMax, card) {
            return Math.max(currentMax, card.y + card.height);
        }, geometry.height);

        return {
            width: Math.max(geometry.width, Math.ceil(maxX + 80)),
            height: Math.max(geometry.height, Math.ceil(maxY + 80))
        };
    }

    function renderDiagramContentHighlight(cards, vpcShell) {
        const boundsCards = cards.concat([vpcShell]);
        const padding = 28;
        const minX = boundsCards.reduce(function (currentMin, card) {
            return Math.min(currentMin, card.x);
        }, Number.POSITIVE_INFINITY);
        const minY = boundsCards.reduce(function (currentMin, card) {
            return Math.min(currentMin, card.y);
        }, Number.POSITIVE_INFINITY);
        const maxX = boundsCards.reduce(function (currentMax, card) {
            return Math.max(currentMax, card.x + card.width);
        }, 0);
        const maxY = boundsCards.reduce(function (currentMax, card) {
            return Math.max(currentMax, card.y + card.height);
        }, 0);

        if (!Number.isFinite(minX) || !Number.isFinite(minY)) {
            return '';
        }

        return '<rect x="' + (minX - padding) + '" y="' + (minY - padding) + '" width="' + ((maxX - minX) + (padding * 2)) + '" height="' + ((maxY - minY) + (padding * 2)) + '" rx="34" class="diagram-content-highlight"></rect>';
    }

    function buildSvgMarkup(spec, layoutOverrides, connectorOverrides) {
        const geometry = computeStageGeometry(spec);
        const safeLayoutOverrides = cloneLayoutOverrides(layoutOverrides);
        const safeConnectorOverrides = cloneConnectorOverrides(connectorOverrides);
        const azLabels = buildAzLabels(spec.azCount);
        const cards = [];
        const connectors = [];
        const appCards = [];
        const databaseCards = [];
        connectorOverrideContext = safeConnectorOverrides;
        const vpcShellOverride = safeLayoutOverrides['architecture-vpc-gcp-shell'] || {};
        const vpcShell = {
            id: 'architecture-vpc-gcp-shell',
            x: Number.isFinite(vpcShellOverride.x) ? vpcShellOverride.x : geometry.vpcX,
            y: Number.isFinite(vpcShellOverride.y) ? vpcShellOverride.y : geometry.vpcY,
            width: Number.isFinite(vpcShellOverride.width) ? vpcShellOverride.width : geometry.vpcWidth,
            height: Number.isFinite(vpcShellOverride.height) ? vpcShellOverride.height : geometry.vpcHeight,
            meta: spec.region + ' • ' + spec.cidr,
            iconKey: 'architectureVpcGcp'
        };
        let currentEdgeCenterX = geometry.edgeRowX + (geometry.edgeCardWidth / 2);
        let previousEdgeCard = null;
        const vpcCenterX = geometry.vpcX + (geometry.vpcWidth / 2);
        const ingressTrunkX = vpcCenterX;
        const igwY = 158;
        const albY = 244;
        let albCard = null;
        let nextRightStackY = geometry.rightStackY;

        function addCard(card) {
            return registerCard(cards, card, safeLayoutOverrides);
        }

        function addRightRailCard(card) {
            const nextCard = addCard(Object.assign({}, card, {
                x: geometry.rightX,
                y: nextRightStackY,
                width: geometry.rightCardWidth
            }));

            nextRightStackY += nextCard.height + geometry.rightCardGap;

            return nextCard;
        }

        function resolveColumnOuterSide(card) {
            const cardCenterX = card.x + (card.width / 2);

            if (Math.abs(cardCenterX - ingressTrunkX) <= 8) {
                return null;
            }

            return cardCenterX < ingressTrunkX ? 'left' : 'right';
        }

        function buildCardSideRatio(card, side) {
            if (side === 'left') {
                return buildAnchorRatio(card, card.x, card.y + (card.height / 2));
            }

            if (side === 'right') {
                return buildAnchorRatio(card, card.x + card.width, card.y + (card.height / 2));
            }

            return buildAnchorRatio(card, card.x + (card.width / 2), card.y);
        }

        function buildIngressToAppConnectorOptions(card, connectorId) {
            const targetSide = resolveColumnOuterSide(card) || 'top';
            const appTierMinX = appCards.reduce(function (currentMin, appCard) {
                return Math.min(currentMin, appCard.x);
            }, card.x);
            const appTierMaxX = appCards.reduce(function (currentMax, appCard) {
                return Math.max(currentMax, appCard.x + appCard.width);
            }, card.x + card.width);
            const appTierTopY = appCards.reduce(function (currentMin, appCard) {
                return Math.min(currentMin, appCard.y);
            }, card.y);
            const appSubnetTopY = appTierTopY - geometry.appCardTopInset;
            const branchY = appSubnetTopY - (geometry.interRowGap / 2);

            return {
                id: connectorId,
                sourceSide: 'bottom',
                targetSide: targetSide,
                sourceRatio: {
                    x: 0.5,
                    y: 1
                },
                targetRatio: buildCardSideRatio(card, targetSide),
                bend: {
                    x: Math.min(appTierMaxX, Math.max(appTierMinX, ingressTrunkX)),
                    y: branchY
                },
                active: true
            };
        }

        function buildAppToDatabaseConnectorOptions(card, databaseCard) {
            const connectorSide = resolveColumnOuterSide(card);
            const connectorId = card.id + '-to-' + databaseCard.id;

            if (!connectorSide) {
                return {
                    id: connectorId,
                    sourceSide: 'bottom',
                    targetSide: 'top'
                };
            }

            return {
                id: connectorId,
                sourceSide: connectorSide,
                targetSide: connectorSide
            };
        }

        const igwCard = addCard({
            id: 'internet-edge',
            x: vpcCenterX - 110,
            y: igwY,
            width: 220,
            height: 64,
            label: 'Internet Edge',
            short: 'NET',
            subtitle: '',
            tone: 'service',
            iconKey: 'internetGateway',
            draggable: true
        });

        geometry.edgeCards.forEach(function (edgeCard) {
            const card = addCard({
                id: edgeCard.id,
                x: currentEdgeCenterX - (geometry.edgeCardWidth / 2),
                y: geometry.edgeRowY,
                width: geometry.edgeCardWidth,
                height: 70,
                label: edgeCard.label,
                short: edgeCard.short,
                subtitle: '',
                tone: edgeCard.tone,
                iconKey: edgeCard.id === 'users'
                    ? 'architectureVpcGcp'
                    : edgeCard.id === 'route53'
                        ? 'route53'
                        : edgeCard.id === 'cloudfront'
                            ? 'cloudFront'
                            : edgeCard.id === 'waf'
                                ? 'waf'
                                : '',
                draggable: true
            });

            if (previousEdgeCard !== null) {
                connectors.push(renderCardConnector(previousEdgeCard, card, {
                    id: previousEdgeCard.id + '-to-' + card.id,
                    sourceSide: 'right',
                    targetSide: 'left'
                }));
            }

            previousEdgeCard = card;
            currentEdgeCenterX += geometry.edgeCardWidth + geometry.edgeCardGap;
        });

        if (previousEdgeCard !== null) {
            connectors.push(renderCardConnector(previousEdgeCard, igwCard, {
                id: previousEdgeCard.id + '-to-internet-edge',
                sourceSide: 'bottom',
                targetSide: 'top',
                active: true
            }));
        }

        if (spec.alb) {
            albCard = addCard({
                id: 'external-http-load-balancer',
                x: vpcCenterX - 164,
                y: albY,
                width: 328,
                height: 74,
                label: 'External HTTP(S) Load Balancer',
                short: 'HTTPS',
                subtitle: ['Internet-facing ingress'],
                tone: 'security',
                iconKey: 'applicationLoadBalancer',
                draggable: true
            });

            connectors.push(renderCardConnector(igwCard, albCard, {
                id: 'internet-edge-to-external-http-load-balancer',
                sourceSide: 'bottom',
                targetSide: 'top',
                active: true
            }));
        }

        azLabels.forEach(function (azLabel, index) {
            const azX = geometry.azXStart + (index * (geometry.azWidth + geometry.azGap));
            const publicY = geometry.azY + geometry.azHeaderHeight;
            const appY = publicY + geometry.publicHeight + geometry.interRowGap;
            const dataY = appY + geometry.appHeight + geometry.interRowGap;
            const subnetInnerX = azX + 22;
            const subnetWidth = geometry.azWidth - 44;
            const hasNatInPublicSubnet = spec.natMode === 'per-az' || (spec.natMode === 'single' && index === 0);
            const hasBastionInPublicSubnet = spec.bastion && index === 0;
            const stackPublicCards = hasNatInPublicSubnet && hasBastionInPublicSubnet;
            const publicCardInset = 18;
            const publicCardY = stackPublicCards ? publicY + 54 : publicY + 76;
            const publicCardHeight = stackPublicCards ? 52 : 66;
            const publicCardWidth = subnetWidth - (publicCardInset * 2);
            const bastionCardY = stackPublicCards ? publicY + 112 : publicCardY;
            const appCard = addCard({
                id: 'app-tier-' + azLabel,
                x: subnetInnerX + 16,
                y: appY + geometry.appCardTopInset,
                width: subnetWidth - 32,
                height: 74,
                label: appTierLabel(spec.appTier),
                short: spec.appTier.toUpperCase().slice(0, 3),
                subtitle: ['zone ' + azLabel.toUpperCase() + ' workload'],
                tone: 'service',
                iconKey: resolveAppTierIconKey(spec.appTier),
                draggable: true
            });

            appCards.push(appCard);

            addCard({
                id: 'availability-zone-' + azLabel,
                x: azX,
                y: geometry.azY,
                width: geometry.azWidth,
                height: geometry.azHeight,
                label: 'Availability Zone ' + azLabel.toUpperCase(),
                short: 'zone ' + azLabel.toUpperCase(),
                subtitle: ['Subnet and workload grouping'],
                tone: 'zone',
                iconKey: 'architectureVpcGcp',
                draggable: true
            });

            addCard({
                id: 'public-subnet-' + azLabel,
                x: subnetInnerX,
                y: publicY,
                width: subnetWidth,
                height: geometry.publicHeight,
                label: 'Public Subnet ' + azLabel.toUpperCase(),
                short: 'PUB',
                subtitle: ['Ingress and egress tier'],
                tone: 'public',
                iconKey: 'vpcRouter',
                draggable: true
            });

            addCard({
                id: 'private-app-subnet-' + azLabel,
                x: subnetInnerX,
                y: appY,
                width: subnetWidth,
                height: geometry.appHeight,
                label: 'Private App Subnet ' + azLabel.toUpperCase(),
                short: 'APP',
                subtitle: ['Private workload tier'],
                tone: 'private',
                iconKey: 'vpcRouter',
                draggable: true
            });

            if (hasNatInPublicSubnet) {
                addCard({
                    id: 'nat-gateway-' + azLabel,
                    x: subnetInnerX + publicCardInset,
                    y: publicCardY,
                    width: publicCardWidth,
                    height: publicCardHeight,
                    label: 'Cloud NAT',
                    short: 'NAT',
                    subtitle: [spec.natMode === 'single' ? 'Shared outbound path' : 'Local outbound path'],
                    tone: 'public',
                    iconKey: 'natGateway',
                    draggable: true
                });
            }

            if (spec.bastion && index === 0) {
                addCard({
                    id: 'bastion-host',
                    x: subnetInnerX + publicCardInset,
                    y: bastionCardY,
                    width: publicCardWidth,
                    height: publicCardHeight,
                    label: 'Identity-Aware Proxy',
                    short: 'IAP',
                    subtitle: ['Admin entry point'],
                    tone: 'security',
                    iconKey: 'bastion',
                    draggable: true
                });
            }

            if (geometry.hasDataTier) {
                addCard({
                    id: 'private-data-subnet-' + azLabel,
                    x: subnetInnerX,
                    y: dataY,
                    width: subnetWidth,
                    height: geometry.dataHeight,
                    label: 'Private Data Subnet ' + azLabel.toUpperCase(),
                    short: 'DATA',
                    subtitle: ['Stateful data services'],
                    tone: 'private',
                    iconKey: 'vpcRouter',
                    draggable: true
                });

                databaseCards.push(addCard({
                    id: 'database-tier-' + azLabel,
                    x: subnetInnerX + 16,
                    y: dataY + 72,
                    width: subnetWidth - 32,
                    height: 64,
                    label: databaseLabel(spec.database) + (index === 0 ? ' Primary' : ' Standby'),
                    short: spec.database === 'aurora' ? 'PG' : 'SQL',
                    subtitle: [index === 0 ? 'Writer placement' : 'Replica or standby'],
                    tone: 'database',
                    iconKey: resolveDatabaseIconKey(spec.database),
                    draggable: true
                }));
            }
        });

        if (albCard) {
            appCards.forEach(function (card) {
                connectors.push(renderCardConnector(albCard, card, buildIngressToAppConnectorOptions(
                    card,
                    'external-http-load-balancer-to-' + card.id
                )));
            });
        } else {
            appCards.forEach(function (card) {
                connectors.push(renderCardConnector(igwCard, card, buildIngressToAppConnectorOptions(
                    card,
                    'internet-edge-to-' + card.id
                )));
            });
        }

        if (databaseCards.length > 0) {
            appCards.forEach(function (card, index) {
                if (!databaseCards[index]) {
                    return;
                }

                connectors.push(renderCardConnector(card, databaseCards[index], buildAppToDatabaseConnectorOptions(
                    card,
                    databaseCards[index]
                )));
            });

            if (databaseCards.length > 1) {
                connectors.push(renderCardConnector(databaseCards[0], databaseCards[databaseCards.length - 1], {
                    id: 'database-primary-to-standby',
                    sourceSide: 'right',
                    targetSide: 'left'
                }));
            }
        }

        if (spec.cache) {
            const cacheCard = addCard({
                id: 'elasticache',
                x: vpcCenterX - 140,
                y: geometry.sharedServicesY,
                width: 280,
                height: 62,
                label: 'Memorystore for Redis',
                short: 'RED',
                subtitle: ['Shared low-latency cache tier'],
                tone: 'service',
                iconKey: 'elasticache',
                draggable: true
            });

            appCards.forEach(function (card) {
                connectors.push(renderCardConnector(card, cacheCard, {
                    id: card.id + '-to-elasticache',
                    sourceSide: 'bottom',
                    targetSide: 'top'
                }));
            });
        }

        if (spec.siteToSiteVpn) {
            const onPremCard = addCard({
                id: 'on-premises',
                x: geometry.vpcX - 300,
                y: geometry.vpcY + 166,
                width: 188,
                height: 64,
                label: 'On-Premises',
                short: 'LAN',
                subtitle: ['Hybrid private network'],
                tone: 'edge',
                iconKey: 'siteToSiteVpn',
                draggable: true
            });

            const vpnCard = addCard({
                id: 'site-to-site-vpn',
                x: geometry.vpcX - 270,
                y: geometry.vpcY + 252,
                width: 164,
                height: 62,
                label: 'Cloud VPN',
                short: 'VPN',
                subtitle: ['Encrypted site link'],
                tone: 'security',
                iconKey: 'siteToSiteVpn',
                draggable: true
            });

            connectors.push(renderCardConnector(onPremCard, vpnCard, {
                id: 'on-premises-to-site-to-site-vpn',
                sourceSide: 'bottom',
                targetSide: 'top'
            }));
            connectors.push(renderCardConnector(vpnCard, vpcShell, {
                    id: 'site-to-site-vpn-to-gcp-vpc',
                sourceSide: 'right',
                targetSide: 'left',
                targetRatio: buildAnchorRatio(vpcShell, vpcShell.x, vpnCard.y + (vpnCard.height / 2)),
                active: true
            }));
        }

        if (spec.transitGateway) {
            const transitGatewayCard = addCard({
                id: 'transit-gateway',
                x: geometry.vpcX - 288,
                y: geometry.vpcY + 340,
                width: 176,
                height: 62,
                label: 'Network Connectivity Center',
                short: 'NCC',
                subtitle: ['Shared network hub'],
                tone: 'service',
                iconKey: 'transitGateway',
                draggable: true
            });

            connectors.push(renderCardConnector(transitGatewayCard, vpcShell, {
                    id: 'transit-gateway-to-gcp-vpc',
                sourceSide: 'right',
                targetSide: 'left',
                targetRatio: buildAnchorRatio(vpcShell, vpcShell.x, transitGatewayCard.y + (transitGatewayCard.height / 2)),
                active: true
            }));
        }

        if (spec.database === 'dynamodb') {
            const dynamoDbCard = addRightRailCard({
                id: 'dynamodb',
                height: 64,
                label: 'Firestore',
                short: 'FS',
                subtitle: ['Managed data tier'],
                tone: 'database',
                iconKey: 'dynamodb',
                draggable: true
            });

            appCards.forEach(function (card) {
                connectors.push(renderCardConnector(card, dynamoDbCard, {
                    id: card.id + '-to-dynamodb',
                    sourceSide: 'right',
                    targetSide: 'left'
                }));
            });
        }

        if (spec.cloudWatch) {
            addRightRailCard({
                id: 'cloudwatch',
                height: 64,
                label: 'Cloud Monitoring',
                short: 'MON',
                subtitle: ['Metrics and alarms'],
                tone: 'service',
                iconKey: 'cloudWatch',
                draggable: true
            });
        }

        if (spec.flowLogs) {
            addRightRailCard({
                id: 'vpc-flow-logs',
                height: 64,
                label: 'VPC Flow Logs',
                short: 'LOG',
                subtitle: ['Traffic telemetry'],
                tone: 'service',
                iconKey: 'vpcFlowLogs',
                draggable: true
            });
        }

        if (spec.endpoints) {
            addRightRailCard({
                id: 'vpc-endpoints',
                height: 64,
                label: 'Private Service Connect',
                short: 'EP',
                subtitle: ['Private service access'],
                tone: 'service',
                iconKey: 'vpcEndpoints',
                draggable: true
            });
        }

        cards.forEach(function (card) {
            if (card.id === 'cloudwatch' || card.id === 'vpc-flow-logs' || card.id === 'vpc-endpoints') {
                connectors.push(renderCardConnector(vpcShell, card, {
                    id: 'architecture-vpc-gcp-to-' + card.id,
                    sourceSide: 'right',
                    targetSide: 'left',
                    sourceRatio: buildAnchorRatio(vpcShell, vpcShell.x + vpcShell.width, card.y + (card.height / 2))
                }));
            }
        });

        const layeredCards = splitCardsByLayer(cards);
        const svgBackgroundCards = layeredCards.backgroundCards.map(renderSvgCard).join('');
        const svgForegroundCards = layeredCards.foregroundCards.map(renderSvgCard).join('');
        const svgConnectors = connectors.join('');
        const vpcShellMarkup = renderVpcShell(vpcShell);
        const svgContentHighlight = renderDiagramContentHighlight(cards, vpcShell);
        const svgBounds = computeSvgBounds(geometry, cards, vpcShell);

        return {
            svgMarkup: [
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + svgBounds.width + ' ' + svgBounds.height + '" role="img" aria-label="' + escapeHtml(spec.title) + '">',
                '<defs>',
                '<style><![CDATA[',
                '.diagram-root{font-family:Roboto,system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;--diagram-font-title:26px;--diagram-font-meta:15px;--diagram-font-pill:13px;--diagram-font-card-title:16px;--diagram-font-card-subtitle:12px;--diagram-font-zone-label:14px;}',
                '.diagram-vpc{fill:#ffffff;stroke:#AECBFA;stroke-width:2;}',
                '.diagram-card-group.is-selected .diagram-vpc{stroke:#4285F4;stroke-width:3;filter:drop-shadow(0 10px 18px rgba(66,133,244,0.18));}',
                '.diagram-vpc-title{fill:#174EA6;font-size:var(--diagram-font-title);font-weight:800;}',
                '.diagram-vpc-meta{fill:#1A73E8;font-size:var(--diagram-font-meta);font-weight:600;}',
                '.diagram-card{stroke:#C6DAFC;stroke-width:1.5;filter:drop-shadow(0 6px 10px rgba(12,82,126,0.08));}',
                '.diagram-card-zone{fill:#f8fdff;}',
                '.diagram-card-public{fill:#dff3ff;}',
                '.diagram-card-private{fill:#eef7ff;}',
                '.diagram-card-service{fill:#ffffff;}',
                '.diagram-card-edge{fill:#e6f5ff;}',
                '.diagram-card-security{fill:#eff6ff;stroke:#D2E3FC;}',
                '.diagram-card-database{fill:#ecfdf5;stroke:#86efac;}',
                '.diagram-card-hitbox{fill:transparent;pointer-events:all;}',
                '.diagram-card-highlight{display:none;fill:rgba(52,168,83,0.1);stroke:#34A853;stroke-width:3;stroke-dasharray:10 7;pointer-events:none;filter:drop-shadow(0 10px 18px rgba(52,168,83,0.22));}',
                '.diagram-card-group.is-selected .diagram-card-highlight{display:block;}',
                '.diagram-card-group.is-highlighted .diagram-card-highlight{display:block;stroke:#4285F4;stroke-width:4;filter:drop-shadow(0 12px 22px rgba(66,133,244,0.28));}',
                '.diagram-card-group.is-marquee-target .diagram-card-highlight{display:block;stroke:#34A853;stroke-width:3;filter:drop-shadow(0 12px 22px rgba(52,168,83,0.24));}',
                '.diagram-content-highlight{display:none;fill:rgba(52,168,83,0.06);stroke:#34A853;stroke-width:5;stroke-dasharray:18 10;pointer-events:none;filter:drop-shadow(0 16px 28px rgba(52,168,83,0.2));}',
                '.diagram-root.is-highlight-all .diagram-content-highlight{display:block;}',
                '.diagram-card-group.is-selected .diagram-card{stroke:#4285F4;stroke-width:3;filter:drop-shadow(0 10px 18px rgba(66,133,244,0.18));}',
                '.diagram-resize-handle{display:none;fill:#ffffff;stroke:#4285F4;stroke-width:2;cursor:nwse-resize;pointer-events:all;filter:drop-shadow(0 4px 8px rgba(66,133,244,0.24));}',
                '.diagram-card-group.is-selected .diagram-resize-handle{display:block;}',
                '.diagram-card-group.is-resizing{cursor:nwse-resize;opacity:0.96;}',
                '.diagram-resize-preview{fill:rgba(66,133,244,0.08);stroke:#4285F4;stroke-width:2;stroke-dasharray:8 6;pointer-events:none;}',
                '.diagram-pill{stroke:none;}',
                '.diagram-pill-zone{fill:#f3f4f6;}',
                '.diagram-pill-public{fill:#D2E3FC;}',
                '.diagram-pill-private{fill:#D2E3FC;}',
                '.diagram-pill-service{fill:#ccfbf1;}',
                '.diagram-pill-edge{fill:#A8DAB5;}',
                '.diagram-pill-security{fill:#D2E3FC;}',
                '.diagram-pill-database{fill:#81C995;}',
                '.diagram-pill-text{fill:#1f2937;font-size:var(--diagram-font-pill);font-weight:800;text-anchor:middle;}',
                '.diagram-card-title{fill:#1f2937;font-size:var(--diagram-font-card-title);font-weight:800;}',
                '.diagram-card-subtitle{fill:#6b7280;font-size:var(--diagram-font-card-subtitle);font-weight:500;}',
                '.diagram-zone-label{fill:#174EA6;font-size:var(--diagram-font-zone-label);font-weight:800;}',
                '.diagram-connector{fill:none;stroke:#111827;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round;opacity:0.88;pointer-events:stroke;vector-effect:non-scaling-stroke;}',
                '.diagram-connector-active{stroke:#111827;stroke-width:1.65;opacity:0.96;}',
                '.diagram-connector.is-selected{stroke:#111827;stroke-width:2;opacity:1;}',
                '.diagram-connector-anchor-handle{fill:#ffffff;stroke:#3367D6;stroke-width:2;cursor:grab;pointer-events:all;filter:drop-shadow(0 4px 8px rgba(51,103,214,0.24));}',
                '.diagram-connector-anchor-handle:active{cursor:grabbing;}',
                '.diagram-connector-bend-handle{fill:#3367D6;stroke:#ffffff;stroke-width:2;cursor:move;pointer-events:all;filter:drop-shadow(0 4px 8px rgba(51,103,214,0.28));}',
                '.diagram-connector-bend-handle:active{cursor:grabbing;}',
                '.diagram-card-group-draggable{cursor:grab;}',
                '.diagram-card-group-draggable.is-dragging{cursor:grabbing;opacity:0.96;}',
                '.diagram-card-group-draggable:hover .diagram-card{stroke:#4285F4;stroke-width:2.2;}',
                '.diagram-card-group-draggable:focus-visible{outline:none;}',
                '.diagram-card-group-draggable:focus-visible .diagram-card{stroke:#4285F4;stroke-width:2.6;filter:drop-shadow(0 10px 18px rgba(66,133,244,0.18));}',
                '.diagram-card-group-draggable:focus-visible .diagram-vpc{stroke:#4285F4;stroke-width:2.8;filter:drop-shadow(0 10px 18px rgba(66,133,244,0.18));}',
                ']]></style>',
                '<marker id="architectureVpcGcpArrow" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">',
                '<path d="M 0 0 L 11 5.5 L 0 11 z" fill="#111827"></path>',
                '</marker>',
                '<marker id="architectureVpcGcpArrowActive" markerWidth="11" markerHeight="11" refX="10" refY="5.5" orient="auto" markerUnits="userSpaceOnUse">',
                '<path d="M 0 0 L 11 5.5 L 0 11 z" fill="#111827"></path>',
                '</marker>',
                '</defs>',
                '<g class="diagram-root">',
                vpcShellMarkup,
                svgBackgroundCards,
                svgConnectors,
                svgForegroundCards,
                svgContentHighlight,
                '</g>',
                '</svg>'
            ].join(''),
            layoutOverrides: safeLayoutOverrides,
            connectorOverrides: safeConnectorOverrides,
            cards: cards.concat([{
                id: vpcShell.id,
                label: 'GCP VPC',
                x: vpcShell.x,
                y: vpcShell.y,
                width: vpcShell.width,
                height: vpcShell.height
            }])
        };
    }

    function buildExportPayload(spec, inventory, layoutOverrides, connectorOverrides) {
        return applyVisualStateToExportPayload(ArchitectureVpcGcpModelCore.buildExportPayload(spec, inventory, layoutOverrides, connectorOverrides, buildNotePayload(spec)));
    }

    function applyVisualStateToExportPayload(payload) {
        if (!payload) {
            return payload;
        }

        const persistedState = toPersistedEngineState({
            layoutOverrides: payload.layout_overrides || payload.layoutOverrides,
            connectorOverrides: payload.connector_overrides || payload.connectorOverrides
        });
        const selectedIds = Array.isArray(persistedState.selection.node_ids) ? persistedState.selection.node_ids.slice() : [];
        const highlightedIds = Array.isArray(persistedState.selection.highlighted_node_ids) ? persistedState.selection.highlighted_node_ids.slice() : [];

        payload.viewport = persistedState.viewport;
        payload.selection = persistedState.selection;
        payload.layout_overrides = cloneLayoutOverrides(persistedState.layout_overrides);
        payload.layoutOverrides = cloneLayoutOverrides(persistedState.layout_overrides);
        payload.connector_overrides = cloneConnectorOverrides(persistedState.connector_overrides);
        payload.connectorOverrides = cloneConnectorOverrides(persistedState.connector_overrides);
        payload.selected_node_id = selectedIds[0] || '';
        payload.selected_node_ids = selectedIds.slice();
        payload.selected_card_id = selectedIds[0] || '';
        payload.selected_card_ids = selectedIds.slice();
        payload.selected_connector_id = persistedState.selection.connector_id || '';
        payload.highlighted_node_id = highlightedIds[0] || '';
        payload.highlighted_node_ids = highlightedIds.slice();
        payload.highlighted_card_id = highlightedIds[0] || '';
        payload.highlighted_card_ids = highlightedIds.slice();

        return payload;
    }

    function syncVisualStateToExportPayload() {
        if (!latestResult || !latestResult.exportPayload) {
            return;
        }

        applyVisualStateToExportPayload(latestResult.exportPayload);
        jsonOutput.innerHTML = highlightJson(latestResult.exportPayload);
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

    function sortInventoryItems(inventory) {
        const sortedInventory = inventory.map(function (item, index) {
            return Object.assign({}, item, {
                inventoryIndex: index + 1
            });
        });

        if (inventorySortMode === 'id') {
            return sortedInventory;
        }

        const sortFields = {
            alphabetical: ['component', 'placement', 'purpose'],
            component: ['component', 'placement', 'purpose'],
            placement: ['placement', 'component', 'purpose'],
            purpose: ['purpose', 'component', 'placement']
        }[inventorySortMode] || ['inventoryIndex'];

        sortedInventory.sort(function (firstItem, secondItem) {
            return sortFields.reduce(function (result, field) {
                if (result !== 0) {
                    return result;
                }

                if (field === 'inventoryIndex') {
                    return firstItem.inventoryIndex - secondItem.inventoryIndex;
                }

                return String(firstItem[field] || '').localeCompare(String(secondItem[field] || ''), undefined, {
                    sensitivity: 'base',
                    numeric: true
                });
            }, 0);
        });

        return sortedInventory;
    }

    function syncInventorySortSelect() {
        const activeOption = inventorySortOptions.find(function (option) {
            return option.dataset.sortValue === inventorySortMode;
        }) || inventorySortOptions[0];

        inventorySortSummary.textContent = activeOption ? activeOption.textContent : 'ID';
        inventorySortOptions.forEach(function (option) {
            const isActive = option === activeOption;

            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    function setInventorySortMode(sortMode) {
        inventorySortMode = String(sortMode || 'id');
        inventorySortInput.value = inventorySortMode;
        syncInventorySortSelect();

        if (latestResult && Array.isArray(latestResult.inventory)) {
            renderInventory(latestResult.inventory);
        }
    }

    function applyInventorySortMode() {
        setInventorySortMode(inventorySortInput.value || 'id');
    }

    function renderInventory(inventory) {
        const sortedInventory = sortInventoryItems(inventory);

        inventoryTableBody.innerHTML = sortedInventory.map(function (item, index) {
            return [
                '<tr>',
                '<td>' + escapeHtml(item.inventoryIndex || index + 1) + '</td>',
                '<td>' + escapeHtml(item.component) + '</td>',
                '<td>' + escapeHtml(item.placement) + '</td>',
                '<td>' + escapeHtml(item.purpose) + '</td>',
                '<td class="architecture-vpc-gcp-table-action-cell tool-table-action-cell">',
                '<button type="button" class="architecture-vpc-gcp-row-copy" data-inventory-copy-row="' + escapeHtml(index) + '" aria-label="Copy inventory row ' + escapeHtml(item.inventoryIndex || index + 1) + '" title="Copy inventory row">',
                '<i class="bi bi-clipboard" aria-hidden="true"></i>',
                '</button>',
                '</td>',
                '</tr>'
            ].join('');
        }).join('');
    }

    function getInventoryColumnValue(item, index, column) {
        if (column === 'index') {
            return item.inventoryIndex || index + 1;
        }

        if (column === 'component') {
            return item.component || '';
        }

        if (column === 'placement') {
            return item.placement || '';
        }

        if (column === 'purpose') {
            return item.purpose || '';
        }

        return '';
    }

    function buildInventoryRowText(item, index) {
        const values = ['index', 'component', 'placement', 'purpose'].map(function (column) {
            const heading = inventoryColumnLabels[column] || column;
            const value = getInventoryColumnValue(item, index, column);

            return heading + ': ' + value;
        });

        return values.join('\n');
    }

    function buildInventoryCopyText(rowIndex) {
        const sortedInventory = sortInventoryItems(latestResult.inventory);
        const item = sortedInventory[rowIndex];

        if (!item) {
            return '';
        }

        return buildInventoryRowText(item, rowIndex);
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

    function fallbackInventoryClipboardText(text) {
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

    async function writeInventoryClipboardText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                fallbackInventoryClipboardText(text);
                return;
            }
        }

        fallbackInventoryClipboardText(text);
    }

    async function copyInventoryRow(rowIndex, button) {
        if (!latestResult || !Array.isArray(latestResult.inventory)) {
            return;
        }

        const normalizedRowIndex = Number.parseInt(rowIndex, 10);

        if (!Number.isInteger(normalizedRowIndex) || normalizedRowIndex < 0) {
            return;
        }


        const copyText = buildInventoryCopyText(normalizedRowIndex);

        if (copyText === '') {
            return;
        }

        try {
            await writeInventoryClipboardText(copyText);
            flashInventoryCopyButton(button);
        } catch (error) {
            showError('Failed to copy the inventory row to the clipboard.');
        }
    }

    function renderNotes(spec) {
        const notePayload = buildNotePayload(spec);

        promptSummary.textContent = spec.prompt !== '' ? spec.prompt : 'No prompt summary was captured for this state.';
        keywordList.innerHTML = notePayload.matched_keywords.length > 0
            ? notePayload.matched_keywords.map(function (item) {
                return '<li>' + escapeHtml(item) + '</li>';
            }).join('')
            : '<li>No explicit GCP keywords were matched. The diagram relies on the selected preset and inspector controls.</li>';
        assumptionList.innerHTML = notePayload.assumptions.length > 0
            ? notePayload.assumptions.map(function (item) {
                return '<li>' + escapeHtml(item) + '</li>';
            }).join('')
            : '<li>No fallback assumptions were required for the current prompt.</li>';
        modelList.innerHTML = notePayload.current_model.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('');
        prosList.innerHTML = notePayload.pros.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('');
        consList.innerHTML = notePayload.cons.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join('');
    }

    function renderAssessmentSections(spec) {
        const pillars = buildPillarBreakdown(spec);
        const risk = buildRiskLevel(spec);

        pillarBreakdownOutput.className = 'architecture-vpc-gcp-assessment-card architecture-vpc-gcp-pillar-card';
        riskLevelOutput.className = 'architecture-vpc-gcp-assessment-card architecture-vpc-gcp-risk-card architecture-vpc-gcp-risk-card-' + risk.tone;

        pillarBreakdownOutput.innerHTML = [
            '<h3 class="architecture-vpc-gcp-result-section-title">Pillar Breakdown</h3>',
            '<div class="architecture-vpc-gcp-pillar-list">',
            pillars.map(function (pillar) {
                return [
                    '<div class="architecture-vpc-gcp-pillar-row architecture-vpc-gcp-pillar-row-' + escapeHtml(pillar.tone) + '">',
                    '<span class="architecture-vpc-gcp-pillar-icon" aria-hidden="true"><i class="' + escapeHtml(pillar.icon) + '"></i></span>',
                    '<span class="architecture-vpc-gcp-pillar-name">' + escapeHtml(pillar.label) + '</span>',
                    '<span class="architecture-vpc-gcp-pillar-meter" aria-hidden="true"><span style="--pillar-score: ' + escapeHtml(String(pillar.score)) + '%;"></span></span>',
                    '<span class="architecture-vpc-gcp-pillar-score"><strong>' + escapeHtml(String(pillar.score)) + '</strong> /100</span>',
                    '</div>'
                ].join('');
            }).join(''),
            '</div>',
            '<div class="architecture-vpc-gcp-pillar-legend" aria-label="Pillar score legend">',
            '<span><i class="architecture-vpc-gcp-legend-dot architecture-vpc-gcp-legend-dot-excellent"></i>Excellent (90-100)</span>',
            '<span><i class="architecture-vpc-gcp-legend-dot architecture-vpc-gcp-legend-dot-good"></i>Good (70-89)</span>',
            '<span><i class="architecture-vpc-gcp-legend-dot architecture-vpc-gcp-legend-dot-fair"></i>Fair (50-69)</span>',
            '<span><i class="architecture-vpc-gcp-legend-dot architecture-vpc-gcp-legend-dot-needs"></i>Needs improvement (&lt;50)</span>',
            '</div>'
        ].join('');

        riskLevelOutput.innerHTML = [
            '<h3 class="architecture-vpc-gcp-result-section-title">Risk Level</h3>',
            '<div class="architecture-vpc-gcp-risk-body">',
            '<div class="architecture-vpc-gcp-risk-icon" aria-hidden="true"><i class="' + escapeHtml(risk.icon) + '"></i></div>',
            '<div class="architecture-vpc-gcp-risk-copy">',
            '<div class="architecture-vpc-gcp-risk-level">' + escapeHtml(risk.level) + '</div>',
            '<p>' + escapeHtml(risk.summary) + '<br>' + escapeHtml(risk.detail) + '</p>',
            '</div>',
            '</div>',
            '<div class="architecture-vpc-gcp-risk-meta">',
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

    function renderOutputScore(spec) {
        const scorePayload = buildArchitectureScore(spec);
        const ringProgressAngle = Math.round(Math.max(0, Math.min(100, scorePayload.score)) * 3.6);
        const resultTone = {
            production: 'success',
            warning: 'warning',
            balanced: 'ready',
            review: 'need-work'
        }[scorePayload.badgeTone] || 'need-work';
        const chipTone = function (tone) {
            if (tone === 'production') {
                return 'success';
            }

            if (tone === 'warning') {
                return 'warning';
            }

            if (tone === 'balanced') {
                return 'ready';
            }

            if (tone === 'review') {
                return 'need-work';
            }

            return 'baseline';
        };
        const summaryChipItems = [
            {
                icon: scorePayload.badgeIcon,
                label: scorePayload.badgeLabel,
                tone: scorePayload.badgeTone
            },
            scorePayload.tags[0],
            scorePayload.tags[1],
            scorePayload.tags[2],
            scorePayload.tags[3],
            scorePayload.tags[4]
        ].filter(Boolean);
        const summaryChips = summaryChipItems.map(function (item) {
            return [
                '<span class="architecture-vpc-gcp-result-chip architecture-vpc-gcp-result-chip-' + chipTone(item.tone) + '">',
                '<span class="architecture-vpc-gcp-result-chip-icon"><i class="' + escapeHtml(item.icon) + '" aria-hidden="true"></i></span>',
                escapeHtml(item.label),
                '</span>'
            ].join('');
        }).join('');

        outputStatus.className = 'architecture-vpc-gcp-score-card architecture-vpc-gcp-result-summary';
        outputStatus.dataset.resultTone = resultTone;
        outputStatus.dataset.resultLayout = 'architecture_score';
        outputStatus.innerHTML = [
            '<header class="architecture-vpc-gcp-result-header" aria-label="Result summary header">',
            '<div class="architecture-vpc-gcp-result-header-main">',
            '<span class="architecture-vpc-gcp-result-header-icon" aria-hidden="true"><i class="bi bi-diagram-3"></i></span>',
            '<div class="architecture-vpc-gcp-result-header-copy">',
            '<h2 class="architecture-vpc-gcp-result-header-title">Result Summary</h2>',
            '<p>Overview of the current architecture result and key metrics.</p>',
            '</div>',
            '</div>',
            '<div class="architecture-vpc-gcp-result-header-meta" aria-label="Result summary status">',
            '<span class="architecture-vpc-gcp-result-header-chip architecture-vpc-gcp-result-chip architecture-vpc-gcp-result-chip-ready"><span class="architecture-vpc-gcp-result-chip-icon" aria-hidden="true"><i class="bi bi-circle-fill"></i></span><span>Generated</span></span>',
            '<span class="architecture-vpc-gcp-result-header-chip architecture-vpc-gcp-result-chip architecture-vpc-gcp-result-chip-updated"><span class="architecture-vpc-gcp-result-chip-icon" aria-hidden="true"><i class="bi bi-calendar3"></i></span><span>Ready</span></span>',
            '</div>',
            '</header>',
            '<div class="architecture-vpc-gcp-result-hero-grid" aria-live="polite">',
            '<article class="architecture-vpc-gcp-result-card architecture-vpc-gcp-result-card-primary" data-result-visual="ring" aria-label="Primary result">',
            '<div class="architecture-vpc-gcp-result-primary-heading architecture-vpc-gcp-result-visual-copy architecture-vpc-gcp-result-visual-copy-top">',
            '<div class="architecture-vpc-gcp-result-kicker">Primary Result</div>',
            '<h3 class="architecture-vpc-gcp-result-title architecture-vpc-gcp-result-title-center">' + escapeHtml(scorePayload.ringLabel) + '</h3>',
            '</div>',
            '<div class="architecture-vpc-gcp-result-primary-visual" id="architectureVpcGcpResultVisual" aria-label="Primary result visual">',
            '<span class="architecture-vpc-gcp-result-card-icon architecture-vpc-gcp-result-card-icon-primary" aria-hidden="true"><i class="bi bi-speedometer2"></i></span>',
            '<div class="architecture-vpc-gcp-result-ring architecture-vpc-gcp-score-value" id="architectureVpcGcpScoreValue" style="--architecture-vpc-gcp-result-progress: ' + escapeHtml(String(ringProgressAngle)) + 'deg; --progress-angle: ' + escapeHtml(String(ringProgressAngle)) + 'deg; --architecture-vpc-gcp-result-value-chars: ' + escapeHtml(String(String(scorePayload.score).length)) + ';" aria-label="Architecture score ' + escapeHtml(String(scorePayload.score)) + ' out of 100">',
            '<div class="architecture-vpc-gcp-score-echart" id="architectureVpcGcpScoreEchart" aria-hidden="true"></div>',
            '<div class="architecture-vpc-gcp-result-ring-center architecture-vpc-gcp-score-center">',
            '<span class="architecture-vpc-gcp-result-ring-value architecture-vpc-gcp-score-value-number">' + escapeHtml(String(scorePayload.score)) + '</span>',
            '<span class="architecture-vpc-gcp-result-ring-unit architecture-vpc-gcp-score-caption">/100</span>',
            '</div>',
            '</div>',
            '</div>',
            '<div class="architecture-vpc-gcp-result-visual-copy">',
            '<p class="architecture-vpc-gcp-result-copy architecture-vpc-gcp-result-copy-center">' + escapeHtml(scorePayload.detail) + '</p>',
            '</div>',
            '<span class="architecture-vpc-gcp-result-card-divider" aria-hidden="true"></span>',
            '<div class="architecture-vpc-gcp-result-chip-row architecture-vpc-gcp-result-chip-row-center" aria-label="Primary result outcome">',
            '<span class="architecture-vpc-gcp-result-chip architecture-vpc-gcp-result-chip-' + chipTone(scorePayload.badgeTone) + '"><span class="architecture-vpc-gcp-result-chip-icon"><i class="' + escapeHtml(scorePayload.badgeIcon) + '" aria-hidden="true"></i></span>' + escapeHtml(scorePayload.badgeLabel) + '</span>',
            '</div>',
            '</article>',
            '<article class="architecture-vpc-gcp-result-card architecture-vpc-gcp-result-card-summary" aria-label="Result summary">',
            '<div class="architecture-vpc-gcp-result-summary-intro">',
            '<span class="architecture-vpc-gcp-result-card-icon architecture-vpc-gcp-result-card-icon-summary" aria-hidden="true"><i class="bi bi-clipboard-data"></i></span>',
            '<div class="architecture-vpc-gcp-result-summary-copy">',
            '<div class="architecture-vpc-gcp-result-kicker">Descriptive Summary</div>',
            '<h3 class="architecture-vpc-gcp-result-title">' + escapeHtml(scorePayload.band) + '</h3>',
            '<p class="architecture-vpc-gcp-result-copy">' + escapeHtml(scorePayload.detail) + '</p>',
            '</div>',
            '</div>',
            '<span class="architecture-vpc-gcp-result-card-divider" aria-hidden="true"></span>',
            '<div class="architecture-vpc-gcp-result-chip-grid" aria-label="Result summary chips">',
            summaryChips,
            '</div>',
            '</article>',
            '</div>',
            '<div class="architecture-vpc-gcp-result-metric-grid" aria-label="Architecture metrics">',
            '<section class="architecture-vpc-gcp-result-metric-card architecture-vpc-gcp-result-metric-success"><span class="architecture-vpc-gcp-result-metric-icon" aria-hidden="true"><i class="bi bi-globe2"></i></span><span class="architecture-vpc-gcp-result-metric-label">Region</span><strong class="architecture-vpc-gcp-result-metric-value">' + escapeHtml(spec.region) + '</strong><span class="architecture-vpc-gcp-result-metric-copy">Selected deployment geography.</span><span class="architecture-vpc-gcp-result-metric-accent" aria-hidden="true"></span></section>',
            '<section class="architecture-vpc-gcp-result-metric-card architecture-vpc-gcp-result-metric-info"><span class="architecture-vpc-gcp-result-metric-icon" aria-hidden="true"><i class="bi bi-grid-3x3-gap"></i></span><span class="architecture-vpc-gcp-result-metric-label">Zones</span><strong class="architecture-vpc-gcp-result-metric-value">' + escapeHtml(String(spec.azCount) + ' zone' + (spec.azCount === 1 ? '' : 's')) + '</strong><span class="architecture-vpc-gcp-result-metric-copy">Availability zone spread.</span><span class="architecture-vpc-gcp-result-metric-accent" aria-hidden="true"></span></section>',
            '<section class="architecture-vpc-gcp-result-metric-card architecture-vpc-gcp-result-metric-accent-tone"><span class="architecture-vpc-gcp-result-metric-icon" aria-hidden="true"><i class="bi bi-signpost-split"></i></span><span class="architecture-vpc-gcp-result-metric-label">Egress</span><strong class="architecture-vpc-gcp-result-metric-value">' + escapeHtml(natModeLabel(spec.natMode)) + '</strong><span class="architecture-vpc-gcp-result-metric-copy">Private tier outbound pattern.</span><span class="architecture-vpc-gcp-result-metric-accent" aria-hidden="true"></span></section>',
            '<section class="architecture-vpc-gcp-result-metric-card architecture-vpc-gcp-result-metric-warning"><span class="architecture-vpc-gcp-result-metric-icon" aria-hidden="true"><i class="bi bi-database"></i></span><span class="architecture-vpc-gcp-result-metric-label">Data tier</span><strong class="architecture-vpc-gcp-result-metric-value">' + escapeHtml(databaseLabel(spec.database)) + '</strong><span class="architecture-vpc-gcp-result-metric-copy">Modeled persistence layer.</span><span class="architecture-vpc-gcp-result-metric-accent" aria-hidden="true"></span></section>',
            '</div>'
        ].join('');
    }

    function renderStageMeta(spec) {
        stageMeta.innerHTML = [
            createToneChip('bi bi-globe2', spec.region, 'region'),
            createToneChip('bi bi-grid-3x3-gap', String(spec.azCount) + ' zone' + (spec.azCount === 1 ? '' : 's'), 'az'),
            createToneChip('bi bi-arrow-left-right', natModeLabel(spec.natMode), 'network'),
            createToneChip('bi bi-hdd-network', appTierLabel(spec.appTier), 'compute'),
            createToneChip('bi bi-database', databaseLabel(spec.database), 'data')
        ].join('');
    }

    function renderStageHeader(spec) {
        const presetLabel = spec && spec.presetLabel ? spec.presetLabel : '';
        const presetChipLabel = String(presetLabel || 'Custom architecture').trim() + ' preset';

        stageTitle.textContent = stageHeadingTitle;
        stageSubtitle.hidden = false;
        stageSubtitle.innerHTML = '<span class="architecture-vpc-gcp-stage-preset-chip" title="' + escapeHtml(presetChipLabel) + '">' + escapeHtml(presetChipLabel) + '</span>';
    }

    function getRenderedCardById(cardId) {
        if (!latestResult || !Array.isArray(latestResult.renderedCards) || cardId === '') {
            return null;
        }

        return latestResult.renderedCards.find(function (card) {
            return card.id === cardId;
        }) || null;
    }

    function normalizeSelectedCardIds(cardIds) {
        return Array.from(new Set((cardIds || []).map(function (cardId) {
            return String(cardId || '').trim();
        }).filter(function (cardId) {
            return cardId !== '' && getRenderedCardById(cardId) !== null;
        })));
    }

    function setHighlightedCardIds(cardIds) {
        highlightedCardIds = normalizeSelectedCardIds(cardIds);
        highlightedCardId = highlightedCardIds[0] || '';
        syncSelectedCardVisual();
        syncVisualStateToExportPayload();
    }

    function setSelectedCards(cardIds, primaryCardId, shouldFocus) {
        selectedCardIds = normalizeSelectedCardIds(cardIds);
        selectedCardId = selectedCardIds.includes(primaryCardId) ? primaryCardId : (selectedCardIds[0] || '');
        selectedConnectorId = '';
        updateSelectedCardEditor();
        syncVisualStateToExportPayload();

        if (shouldFocus !== false) {
            focusSelectedStageCard();
        }
    }

    function syncSelectedCardVisual() {
        const svgElement = stageCanvas.querySelector('svg');

        if (!svgElement) {
            return;
        }

        const selectedCardIdSet = new Set(selectedCardIds);

        Array.from(svgElement.querySelectorAll('.diagram-card-group')).forEach(function (group) {
            group.classList.toggle('is-selected', selectedCardIdSet.has(group.dataset.cardId || ''));
            group.classList.toggle('is-highlighted', highlightedCardIds.includes(group.dataset.cardId || ''));
        });

        Array.from(svgElement.querySelectorAll('.diagram-connector[data-connector-id]')).forEach(function (path) {
            path.classList.toggle('is-selected', selectedConnectorId !== '' && path.dataset.connectorId === selectedConnectorId);
        });
    }

    function getRenderedCardMap() {
        const cardMap = {};

        if (!latestResult || !Array.isArray(latestResult.renderedCards)) {
            return cardMap;
        }

        latestResult.renderedCards.forEach(function (card) {
            if (!card || !card.id) {
                return;
            }

            cardMap[card.id] = Object.assign({}, card);
        });

        return cardMap;
    }

    function findDiagramGroupByCardId(svgElement, cardId) {
        const groups = Array.from(svgElement.querySelectorAll('.diagram-card-group'));

        return groups.find(function (group) {
            return String(group.dataset.cardId || '') === cardId;
        }) || null;
    }

    function queueStageCardFocus(cardId) {
        pendingStageFocusCardId = String(cardId || '').trim();
    }

    function focusPendingStageCard(svgElement) {
        const cardId = pendingStageFocusCardId;

        if (!svgElement || cardId === '') {
            return;
        }

        pendingStageFocusCardId = '';

        const group = findDiagramGroupByCardId(svgElement, cardId);

        if (group && typeof group.focus === 'function') {
            group.focus();
        }
    }

    function focusSelectedStageCard() {
        if (selectedCardId === '') {
            return;
        }

        const svgElement = stageCanvas.querySelector('svg');

        if (!svgElement) {
            return;
        }

        queueStageCardFocus(selectedCardId);
        focusPendingStageCard(svgElement);
    }

    function buildDragPreviewCardMap(movingCardIds, dx, dy) {
        const cardMap = getRenderedCardMap();

        movingCardIds.forEach(function (cardId) {
            if (!cardMap[cardId]) {
                return;
            }

            cardMap[cardId] = Object.assign({}, cardMap[cardId], {
                x: cardMap[cardId].x + dx,
                y: cardMap[cardId].y + dy
            });
        });

        return cardMap;
    }

    function readPathAnchorRatio(path, prefix) {
        const x = Number(path.dataset[prefix + 'RatioX']);
        const y = Number(path.dataset[prefix + 'RatioY']);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return normalizeAnchorRatio({
            x: x,
            y: y
        });
    }

    function findConnectorPathById(svgElement, connectorId) {
        const connectorPaths = Array.from(svgElement.querySelectorAll('.diagram-connector[data-connector-id]'));

        return connectorPaths.find(function (path) {
            return String(path.dataset.connectorId || '') === connectorId;
        }) || null;
    }

    function getPathEndpointRatio(path, prefix, card) {
        const ratio = readPathAnchorRatio(path, prefix);

        if (ratio) {
            return ratio;
        }

        const side = path.dataset[prefix + 'Side'];
        const anchor = getCardAnchor(card, side, null);

        return buildAnchorRatio(card, anchor.x, anchor.y);
    }

    function buildSideAnchorRatio(card, side, point) {
        const normalizedSide = normalizeConnectorSide(side);
        const xRatio = card.width === 0 ? 0.5 : (point.x - card.x) / card.width;
        const yRatio = card.height === 0 ? 0.5 : (point.y - card.y) / card.height;

        if (normalizedSide === 'top') {
            return normalizeAnchorRatio({
                x: xRatio,
                y: 0
            });
        }

        if (normalizedSide === 'bottom') {
            return normalizeAnchorRatio({
                x: xRatio,
                y: 1
            });
        }

        if (normalizedSide === 'left') {
            return normalizeAnchorRatio({
                x: 0,
                y: yRatio
            });
        }

        return normalizeAnchorRatio({
            x: 1,
            y: yRatio
        });
    }

    function getConnectorEndpointPoint(path, prefix, card) {
        const ratio = getPathEndpointRatio(path, prefix, card);

        return getCardAnchor(card, path.dataset[prefix + 'Side'], ratio);
    }

    function setPathAnchorRatio(path, prefix, ratio) {
        const normalizedRatio = normalizeAnchorRatio(ratio);

        if (!normalizedRatio) {
            return;
        }

        path.dataset[prefix + 'RatioX'] = formatSvgNumber(normalizedRatio.x);
        path.dataset[prefix + 'RatioY'] = formatSvgNumber(normalizedRatio.y);
    }

    function readPathBend(path) {
        const x = Number(path.dataset.bendX);
        const y = Number(path.dataset.bendY);

        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            return null;
        }

        return {
            x: x,
            y: y
        };
    }

    function setPathBend(path, bend) {
        const normalizedBend = normalizeConnectorBend(bend);

        if (!normalizedBend) {
            return;
        }

        path.dataset.bendX = formatSvgNumber(normalizedBend.x);
        path.dataset.bendY = formatSvgNumber(normalizedBend.y);
    }

    function getPathDefaultBend(path) {
        if (typeof path.getTotalLength === 'function' && typeof path.getPointAtLength === 'function') {
            const length = path.getTotalLength();

            if (Number.isFinite(length) && length > 0) {
                const point = path.getPointAtLength(length / 2);

                return {
                    x: point.x,
                    y: point.y
                };
            }
        }

        return null;
    }

    function updateConnectorPathFromData(path, sourceCard, targetCard) {
        path.setAttribute(
            'd',
            buildConnectorPathFromCards(
                sourceCard,
                targetCard,
                path.dataset.sourceSide,
                path.dataset.targetSide,
                readPathAnchorRatio(path, 'source'),
                readPathAnchorRatio(path, 'target'),
                readPathBend(path)
            )
        );
    }

    function updateConnectorPreview(svgElement, cardMap) {
        const connectorPaths = Array.from(svgElement.querySelectorAll('.diagram-connector[data-source-card][data-target-card]'));

        connectorPaths.forEach(function (path) {
            const sourceCard = cardMap[path.dataset.sourceCard || ''];
            const targetCard = cardMap[path.dataset.targetCard || ''];
            const sourceRatio = readPathAnchorRatio(path, 'source');
            const targetRatio = readPathAnchorRatio(path, 'target');

            if (!sourceCard || !targetCard) {
                return;
            }

            path.setAttribute(
                'd',
                buildConnectorPathFromCards(
                    sourceCard,
                    targetCard,
                    path.dataset.sourceSide,
                    path.dataset.targetSide,
                    sourceRatio,
                    targetRatio,
                    readPathBend(path)
                )
            );
        });
    }

    function applyDragPreview(movingGroups, dx, dy) {
        movingGroups.forEach(function (movingGroup) {
            movingGroup.setAttribute('transform', 'translate(' + formatSvgNumber(dx) + ' ' + formatSvgNumber(dy) + ')');
        });
    }

    function clearDragPreview(movingGroups) {
        movingGroups.forEach(function (movingGroup) {
            movingGroup.removeAttribute('transform');
            movingGroup.classList.remove('is-dragging');
        });
    }

    function removeConnectorAnchorHandles(svgElement) {
        Array.from(svgElement.querySelectorAll('.diagram-connector-anchor-handle, .diagram-connector-bend-handle')).forEach(function (handle) {
            handle.remove();
        });
    }

    function renderConnectorAnchorHandles(svgElement) {
        const connectorPath = findConnectorPathById(svgElement, selectedConnectorId);
        const cardMap = getRenderedCardMap();
        const root = svgElement.querySelector('.diagram-root') || svgElement;

        removeConnectorAnchorHandles(svgElement);

        if (!connectorPath) {
            return;
        }

        const sourceCard = cardMap[connectorPath.dataset.sourceCard || ''];
        const targetCard = cardMap[connectorPath.dataset.targetCard || ''];

        if (!sourceCard || !targetCard) {
            return;
        }

        [
            {
                endpoint: 'source',
                card: sourceCard
            },
            {
                endpoint: 'target',
                card: targetCard
            }
        ].forEach(function (handleConfig) {
            const point = getConnectorEndpointPoint(connectorPath, handleConfig.endpoint, handleConfig.card);
            const handle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            handle.setAttribute('cx', formatSvgNumber(point.x));
            handle.setAttribute('cy', formatSvgNumber(point.y));
            handle.setAttribute('r', '10');
            handle.setAttribute('class', 'diagram-connector-anchor-handle');
            handle.dataset.connectorId = selectedConnectorId;
            handle.dataset.endpoint = handleConfig.endpoint;
            root.appendChild(handle);
            bindConnectorAnchorHandle(svgElement, handle);
        });

        const bend = readPathBend(connectorPath) || getPathDefaultBend(connectorPath);

        if (bend) {
            const bendHandle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

            bendHandle.setAttribute('x', formatSvgNumber(bend.x - 9));
            bendHandle.setAttribute('y', formatSvgNumber(bend.y - 9));
            bendHandle.setAttribute('width', '18');
            bendHandle.setAttribute('height', '18');
            bendHandle.setAttribute('rx', '5');
            bendHandle.setAttribute('class', 'diagram-connector-bend-handle');
            bendHandle.dataset.connectorId = selectedConnectorId;
            root.appendChild(bendHandle);
            bindConnectorBendHandle(svgElement, bendHandle);
        }
    }

    function updateSelectedCardEditor() {
        selectedCardIds = normalizeSelectedCardIds(selectedCardIds);

        if (selectedCardIds.length > 1) {
            selectedConnectorId = '';
            selectedCardId = selectedCardIds.includes(selectedCardId) ? selectedCardId : selectedCardIds[0];
            selectedEmpty.classList.remove('d-none');
            selectedEditor.classList.add('d-none');
            selectedName.textContent = '';
            selectedXInput.value = '';
            selectedYInput.value = '';
            selectedWidthInput.value = '';
            selectedHeightInput.value = '';
            renderSelectedEmptyMessage(String(selectedCardIds.length) + ' boxes selected. Drag any selected box or use arrow keys to move them together.');
            syncSelectedCardVisual();
            if (stageCanvas.querySelector('svg')) {
                removeConnectorAnchorHandles(stageCanvas.querySelector('svg'));
            }
            return;
        }

        selectedCardId = selectedCardIds[0] || selectedCardId;
        const selectedCard = getRenderedCardById(selectedCardId);

        if (!selectedCard) {
            selectedCardId = '';
            selectedCardIds = [];
            selectedEmpty.classList.remove('d-none');
            selectedEditor.classList.add('d-none');
            selectedName.textContent = '';
            selectedXInput.value = '';
            selectedYInput.value = '';
            selectedWidthInput.value = '';
            selectedHeightInput.value = '';
            renderSelectedEmptyMessage(selectedConnectorId === ''
                ? selectedCardHintText
                : 'Drag the arrow handles to adjust where this arrow sticks to each box.');
            syncSelectedCardVisual();
            if (stageCanvas.querySelector('svg')) {
                renderConnectorAnchorHandles(stageCanvas.querySelector('svg'));
            }
            return;
        }

        selectedConnectorId = '';
        selectedEmpty.classList.add('d-none');
        selectedEditor.classList.remove('d-none');
        renderSelectedEmptyMessage(selectedCardHintText);
        selectedName.textContent = selectedCard.label;
        selectedXInput.value = String(Math.round(selectedCard.x));
        selectedYInput.value = String(Math.round(selectedCard.y));
        selectedWidthInput.value = String(Math.round(selectedCard.width));
        selectedHeightInput.value = String(Math.round(selectedCard.height));
        selectedWidthInput.min = String(getCardMinimumSize(selectedCard).width);
        selectedHeightInput.min = String(getCardMinimumSize(selectedCard).height);
        syncSelectedCardVisual();
        if (stageCanvas.querySelector('svg')) {
            removeConnectorAnchorHandles(stageCanvas.querySelector('svg'));
        }
    }

    function setSelectedCard(cardId, shouldFocus) {
        const nextCardId = String(cardId || '').trim();

        setSelectedCards(nextCardId === '' ? [] : [nextCardId], nextCardId, shouldFocus);
    }

    function setSelectedConnector(connectorId) {
        selectedConnectorId = String(connectorId || '').trim();
        selectedCardId = '';
        selectedCardIds = [];
        updateSelectedCardEditor();
        syncVisualStateToExportPayload();
    }

    function highlightSelectedCard() {
        const targetCardIds = selectedCardIds.length > 0 ? selectedCardIds.slice() : (selectedCardId ? [selectedCardId] : []);
        const selectedCard = getRenderedCardById(targetCardIds[0] || '');

        if (!selectedCard) {
            return;
        }

        if (highlightTimeoutId !== 0) {
            window.clearTimeout(highlightTimeoutId);
        }

        highlightTimeoutId = 0;
        setHighlightedCardIds(targetCardIds);
        scrollStageToCard(targetCardIds[0], 'smooth');
        queueStageCardFocus(targetCardIds[0]);
        focusPendingStageCard(stageCanvas.querySelector('svg'));
    }

    function normalizeCardDimension(value, fallback, minValue) {
        const parsed = Number.parseInt(String(value || '').trim(), 10);

        if (!Number.isFinite(parsed)) {
            return fallback;
        }

        return Math.max(minValue, snapCoordinate(parsed));
    }

    function normalizeCardCoordinate(value, fallback) {
        const parsed = Number.parseInt(String(value || '').trim(), 10);

        if (!Number.isFinite(parsed)) {
            return fallback;
        }

        return Math.max(0, snapCoordinate(parsed));
    }

    function applySelectedCardSize() {
        const selectedCard = getRenderedCardById(selectedCardId);

        if (!selectedCard) {
            return;
        }

        const nextLayoutOverrides = getCurrentLayoutOverrides();
        const existingOverride = nextLayoutOverrides[selectedCardId] || {};
        const minimumSize = getCardMinimumSize(selectedCard);

        nextLayoutOverrides[selectedCardId] = {
            x: normalizeCardCoordinate(selectedXInput.value, Number.isFinite(existingOverride.x) ? existingOverride.x : selectedCard.x),
            y: normalizeCardCoordinate(selectedYInput.value, Number.isFinite(existingOverride.y) ? existingOverride.y : selectedCard.y),
            width: normalizeCardDimension(selectedWidthInput.value, selectedCard.width, minimumSize.width),
            height: normalizeCardDimension(selectedHeightInput.value, selectedCard.height, minimumSize.height)
        };

        renderStageEdit(nextLayoutOverrides, getCurrentConnectorOverrides());
    }

    function resetSelectedCardSize() {
        const selectedCard = getRenderedCardById(selectedCardId);

        if (!selectedCard) {
            return;
        }

        const nextLayoutOverrides = getCurrentLayoutOverrides();

        if (!nextLayoutOverrides[selectedCardId]) {
            return;
        }

        delete nextLayoutOverrides[selectedCardId].x;
        delete nextLayoutOverrides[selectedCardId].y;
        delete nextLayoutOverrides[selectedCardId].width;
        delete nextLayoutOverrides[selectedCardId].height;

        if (Object.keys(nextLayoutOverrides[selectedCardId]).length === 0) {
            delete nextLayoutOverrides[selectedCardId];
        }

        renderStageEdit(nextLayoutOverrides, getCurrentConnectorOverrides());
    }

    function getCurrentLayoutOverrides() {
        if (!latestResult || !latestResult.layoutOverrides) {
            return {};
        }

        return cloneLayoutOverrides(latestResult.layoutOverrides);
    }

    function getCurrentConnectorOverrides() {
        if (!latestResult || !latestResult.connectorOverrides) {
            return {};
        }

        return cloneConnectorOverrides(latestResult.connectorOverrides);
    }

    function createStageUndoSnapshot() {
        if (!latestResult) {
            return null;
        }

        return {
            layoutOverrides: getCurrentLayoutOverrides(),
            connectorOverrides: getCurrentConnectorOverrides(),
            selectedCardId: selectedCardId,
            selectedCardIds: selectedCardIds.slice(),
            selectedConnectorId: selectedConnectorId,
            highlightedCardId: highlightedCardId,
            highlightedCardIds: highlightedCardIds.slice(),
            stageZoom: stageZoom,
            stageDiagramHighlighted: stageDiagramHighlighted
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

        updateStageUndoButton();
    }

    function clearStageUndoHistory() {
        stageUndoStack = [];
        updateStageUndoButton();
    }

    function restoreStageUndoSnapshot(snapshot) {
        selectedCardId = String(snapshot.selectedCardId || '');
        selectedCardIds = Array.isArray(snapshot.selectedCardIds) ? snapshot.selectedCardIds.slice() : (selectedCardId ? [selectedCardId] : []);
        selectedConnectorId = String(snapshot.selectedConnectorId || '');
        highlightedCardIds = normalizeSelectedCardIds(Array.isArray(snapshot.highlightedCardIds) ? snapshot.highlightedCardIds : (snapshot.highlightedCardId ? [snapshot.highlightedCardId] : []));
        highlightedCardId = highlightedCardIds[0] || '';
        stageDiagramHighlighted = Boolean(snapshot.stageDiagramHighlighted);

        if (Number.isFinite(snapshot.stageZoom)) {
            stageZoom = snapshot.stageZoom;
        }

        renderResult(latestResult.spec, snapshot.layoutOverrides, snapshot.connectorOverrides);
        syncStageDiagramHighlight();

        if (selectedCardId !== '') {
            queueStageCardFocus(selectedCardId);
            focusPendingStageCard(stageCanvas.querySelector('svg'));
        }

        updateStageUndoButton();
        syncVisualStateToExportPayload();
    }

    function undoStageEdit() {
        if (!latestResult || stageUndoStack.length === 0) {
            updateStageUndoButton();
            return false;
        }

        restoreStageUndoSnapshot(stageUndoStack.pop());
        return true;
    }

    function renderStageEdit(layoutOverrides, connectorOverrides) {
        pushStageUndoSnapshot();
        renderResult(latestResult.spec, layoutOverrides, connectorOverrides);
    }

    function buildMovingCardIds(cardId) {
        if (!latestResult) {
            return [];
        }

        const selectedId = String(cardId || '').trim();
        const baseCardIds = selectedCardIds.length > 1 && selectedCardIds.includes(selectedId)
            ? selectedCardIds
            : [selectedId];
        const movingCardIds = [];

        baseCardIds.forEach(function (baseCardId) {
            movingCardIds.push(baseCardId);
            Array.prototype.push.apply(movingCardIds, getDependentCardIds(baseCardId, latestResult.spec));
        });

        return Array.from(new Set(movingCardIds)).filter(function (movingCardId) {
            return getRenderedCardById(movingCardId) !== null;
        });
    }

    function applyKeyboardCardPosition(cardId, dx, dy) {
        if (!latestResult) {
            return;
        }

        const movingCardIds = buildMovingCardIds(cardId);
        const nextLayoutOverrides = getCurrentLayoutOverrides();

        movingCardIds.forEach(function (movingCardId) {
            const renderedCard = getRenderedCardById(movingCardId);
            const existingOverride = nextLayoutOverrides[movingCardId] || {};

            if (!renderedCard) {
                return;
            }

            nextLayoutOverrides[movingCardId] = Object.assign({}, existingOverride, {
                x: Math.max(0, snapCoordinate(renderedCard.x + dx)),
                y: Math.max(0, snapCoordinate(renderedCard.y + dy))
            });
        });

        selectedCardId = cardId;
        selectedConnectorId = '';
        selectedCardIds = selectedCardIds.length > 1 && selectedCardIds.includes(cardId) ? selectedCardIds : [cardId];
        queueStageCardFocus(cardId);
        renderStageEdit(nextLayoutOverrides, getCurrentConnectorOverrides());
    }

    function applyKeyboardCardResize(cardId, deltaWidth, deltaHeight) {
        if (!latestResult) {
            return;
        }

        const selectedCard = getRenderedCardById(cardId);

        if (!selectedCard) {
            return;
        }

        const minimumSize = getCardMinimumSize(selectedCard);
        const nextLayoutOverrides = getCurrentLayoutOverrides();
        const existingOverride = nextLayoutOverrides[cardId] || {};

        nextLayoutOverrides[cardId] = Object.assign({}, existingOverride, {
            width: normalizeCardDimension(selectedCard.width + deltaWidth, selectedCard.width, minimumSize.width),
            height: normalizeCardDimension(selectedCard.height + deltaHeight, selectedCard.height, minimumSize.height)
        });

        selectedCardId = cardId;
        selectedCardIds = [cardId];
        selectedConnectorId = '';
        queueStageCardFocus(cardId);
        renderStageEdit(nextLayoutOverrides, getCurrentConnectorOverrides());
    }

    function isDiagramArrowKey(key) {
        return ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key);
    }

    function applyKeyboardCardArrow(cardId, event) {
        const selectedId = String(cardId || '').trim();
        const step = event.shiftKey ? 16 : 4;

        if (selectedId === '' || !isDiagramArrowKey(event.key)) {
            return false;
        }

        event.preventDefault();
        if (selectedCardIds.length > 1 && selectedCardIds.includes(selectedId)) {
            selectedCardId = selectedId;
            selectedConnectorId = '';
            updateSelectedCardEditor();
        } else {
            setSelectedCard(selectedId);
        }

        if (event.altKey) {
            if (event.key === 'ArrowLeft') {
                applyKeyboardCardResize(selectedId, -step, 0);
                return true;
            }

            if (event.key === 'ArrowRight') {
                applyKeyboardCardResize(selectedId, step, 0);
                return true;
            }

            if (event.key === 'ArrowUp') {
                applyKeyboardCardResize(selectedId, 0, -step);
                return true;
            }

            applyKeyboardCardResize(selectedId, 0, step);
            return true;
        }

        if (event.key === 'ArrowLeft') {
            applyKeyboardCardPosition(selectedId, -step, 0);
            return true;
        }

        if (event.key === 'ArrowRight') {
            applyKeyboardCardPosition(selectedId, step, 0);
            return true;
        }

        if (event.key === 'ArrowUp') {
            applyKeyboardCardPosition(selectedId, 0, -step);
            return true;
        }

        applyKeyboardCardPosition(selectedId, 0, step);
        return true;
    }

    function isKeyboardFormTarget(target) {
        if (!target || typeof target.closest !== 'function') {
            return false;
        }

        return target.closest('input, textarea, select, button, summary, a[href], [contenteditable="true"]') !== null;
    }

    function handleSelectedCardDocumentKeydown(event) {
        if (event.defaultPrevented || isUsageHelpOpen() || event.ctrlKey || event.metaKey || isKeyboardFormTarget(event.target)) {
            return;
        }

        if (applyKeyboardCardArrow(selectedCardId || selectedCardIds[0] || '', event)) {
            event.stopPropagation();
        }
    }

    function isUndoKeyboardShortcut(event) {
        return String(event.key || '').toLowerCase() === 'z' &&
            (event.metaKey || event.ctrlKey) &&
            !event.altKey &&
            !event.shiftKey;
    }

    function handleStageUndoKeydown(event) {
        if (
            event.defaultPrevented ||
            isUsageHelpOpen() ||
            !isUndoKeyboardShortcut(event) ||
            (isKeyboardFormTarget(event.target) && !stageCanvas.contains(event.target))
        ) {
            return;
        }

        if (undoStageEdit()) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function bindStageKeyboardEditing(group) {
        group.addEventListener('keydown', function (event) {
            const cardId = String(group.dataset.cardId || '').trim();

            if (cardId === '') {
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelectedCard(cardId);
                return;
            }

            applyKeyboardCardArrow(cardId, event);
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

    function readGroupRect(group) {
        return {
            x: Number.parseFloat(group.dataset.cardX || '0'),
            y: Number.parseFloat(group.dataset.cardY || '0'),
            width: Number.parseFloat(group.dataset.cardWidth || '0'),
            height: Number.parseFloat(group.dataset.cardHeight || '0')
        };
    }

    function getStageCanvasPoint(clientX, clientY) {
        const rect = stageCanvas.getBoundingClientRect();

        return {
            x: clientX - rect.left + stageCanvas.scrollLeft,
            y: clientY - rect.top + stageCanvas.scrollTop
        };
    }

    function updateMarqueeOverlay(element, rect) {
        element.style.left = Math.round(rect.x) + 'px';
        element.style.top = Math.round(rect.y) + 'px';
        element.style.width = Math.round(rect.width) + 'px';
        element.style.height = Math.round(rect.height) + 'px';
    }

    function isGroupRectSelectedByMarquee(selectionRect, groupRect) {
        const centerPoint = {
            x: groupRect.x + (groupRect.width / 2),
            y: groupRect.y + (groupRect.height / 2)
        };
        const groupArea = groupRect.width * groupRect.height;
        const intersectionArea = getRectIntersectionArea(selectionRect, groupRect);

        return rectContainsPoint(selectionRect, centerPoint) ||
            (
                groupArea > 0 &&
                intersectionArea / groupArea >= 0.35
            );
    }

    function findCardsIntersectingRect(svgElement, selectionRect) {
        return Array.from(svgElement.querySelectorAll('.diagram-card-group[data-draggable="true"]')).filter(function (group) {
            const cardId = String(group.dataset.cardId || '').trim();
            const groupRect = readGroupRect(group);

            return cardId !== '' &&
                cardId !== diagramShellCardId &&
                Number.isFinite(groupRect.x) &&
                Number.isFinite(groupRect.y) &&
                Number.isFinite(groupRect.width) &&
                Number.isFinite(groupRect.height) &&
                rectsIntersect(selectionRect, groupRect) &&
                isGroupRectSelectedByMarquee(selectionRect, groupRect);
        }).map(function (group) {
            return String(group.dataset.cardId || '').trim();
        });
    }

    function setMarqueeTargetCards(svgElement, cardIds) {
        const targetIds = new Set(normalizeSelectedCardIds(cardIds));

        Array.from(svgElement.querySelectorAll('.diagram-card-group[data-draggable="true"]')).forEach(function (group) {
            const cardId = String(group.dataset.cardId || '').trim();

            group.classList.toggle('is-marquee-target', targetIds.has(cardId));
        });
    }

    function isMarqueeBlockedTarget(target) {
        if (!target || typeof target.closest !== 'function') {
            return false;
        }

        if (target.closest('.diagram-connector, .diagram-connector-anchor-handle, .diagram-connector-bend-handle, .diagram-resize-handle')) {
            return true;
        }

        const group = target.closest('.diagram-card-group');

        return group !== null;
    }

    function isDiagramShellTarget(target) {
        if (!target || typeof target.closest !== 'function') {
            return false;
        }

        const group = target.closest('.diagram-card-group');

        return group !== null && String(group.dataset.cardId || '') === diagramShellCardId;
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
            const startCanvasPoint = getStageCanvasPoint(event.clientX, event.clientY);
            const startedOnDiagramShell = isDiagramShellTarget(event.target);

            if (!startPoint) {
                return;
            }

            const marquee = document.createElement('div');

            marquee.className = 'diagram-marquee-selection';
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
                const currentCanvasPoint = getStageCanvasPoint(moveEvent.clientX, moveEvent.clientY);
                const overlayRect = buildRectFromPoints(startCanvasPoint, currentCanvasPoint);

                updateMarqueeOverlay(marquee, overlayRect);

                if (!currentPoint) {
                    return;
                }

                setMarqueeTargetCards(svgElement, findCardsIntersectingRect(svgElement, buildRectFromPoints(startPoint, currentPoint)));
            }

            function handlePointerEnd(endEvent) {
                const endPoint = getSvgClientPoint(svgElement, endEvent.clientX, endEvent.clientY);
                const endCanvasPoint = getStageCanvasPoint(endEvent.clientX, endEvent.clientY);
                const overlayRect = buildRectFromPoints(startCanvasPoint, endCanvasPoint);

                safelyReleasePointerCapture(stageCanvasElement, endEvent.pointerId);

                stageCanvasElement.removeEventListener('pointermove', handlePointerMove);
                stageCanvasElement.removeEventListener('pointerup', handlePointerEnd);
                stageCanvasElement.removeEventListener('pointercancel', handlePointerEnd);
                setMarqueeTargetCards(svgElement, []);
                marquee.remove();

                if (!endPoint || endEvent.type === 'pointercancel') {
                    return;
                }

                const selectionRect = buildRectFromPoints(startPoint, endPoint);

                if (overlayRect.width < 6 && overlayRect.height < 6) {
                    if (startedOnDiagramShell) {
                        setSelectedCard(diagramShellCardId);
                        return;
                    }

                    setSelectedCards([]);
                    return;
                }

                setSelectedCards(findCardsIntersectingRect(svgElement, selectionRect));
            }

            stageCanvasElement.addEventListener('pointermove', handlePointerMove);
            stageCanvasElement.addEventListener('pointerup', handlePointerEnd);
            stageCanvasElement.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        }, true);
    }

    function snapCoordinate(value) {
        return Math.round(value / 4) * 4;
    }

    function createResizePreview(svgElement, card) {
        const preview = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        const root = svgElement.querySelector('.diagram-root') || svgElement;

        preview.setAttribute('x', formatSvgNumber(card.x));
        preview.setAttribute('y', formatSvgNumber(card.y));
        preview.setAttribute('width', formatSvgNumber(card.width));
        preview.setAttribute('height', formatSvgNumber(card.height));
        preview.setAttribute('rx', card.id === 'architecture-vpc-gcp-shell' ? '24' : '16');
        preview.setAttribute('class', 'diagram-resize-preview');
        root.appendChild(preview);

        return preview;
    }

    function updateResizePreview(preview, width, height) {
        preview.setAttribute('width', formatSvgNumber(width));
        preview.setAttribute('height', formatSvgNumber(height));
    }

    function bindConnectorAnchorHandle(svgElement, handle) {
        handle.addEventListener('pointerdown', function (event) {
            const connectorId = String(handle.dataset.connectorId || '').trim();
            const endpoint = String(handle.dataset.endpoint || '').trim();
            const path = findConnectorPathById(svgElement, connectorId);
            const cardMap = getRenderedCardMap();

            if (!path || (endpoint !== 'source' && endpoint !== 'target')) {
                return;
            }

            const sourceCard = cardMap[path.dataset.sourceCard || ''];
            const targetCard = cardMap[path.dataset.targetCard || ''];
            const editedCard = endpoint === 'source' ? sourceCard : targetCard;

            if (!sourceCard || !targetCard || !editedCard) {
                return;
            }

            if (selectedConnectorId !== connectorId) {
                setSelectedConnector(connectorId);
            }

            if (typeof handle.setPointerCapture === 'function') {
                handle.setPointerCapture(event.pointerId);
            }

            function applyHandleMove(moveEvent) {
                const currentPoint = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);

                if (!currentPoint) {
                    return null;
                }

                const ratio = buildSideAnchorRatio(editedCard, path.dataset[endpoint + 'Side'], currentPoint);
                const nextPoint = getCardAnchor(editedCard, path.dataset[endpoint + 'Side'], ratio);

                setPathAnchorRatio(path, endpoint, ratio);
                updateConnectorPathFromData(path, sourceCard, targetCard);
                handle.setAttribute('cx', formatSvgNumber(nextPoint.x));
                handle.setAttribute('cy', formatSvgNumber(nextPoint.y));

                return ratio;
            }

            function handlePointerMove(moveEvent) {
                applyHandleMove(moveEvent);
            }

            function handlePointerEnd(endEvent) {
                const ratio = applyHandleMove(endEvent);
                const nextConnectorOverrides = getCurrentConnectorOverrides();
                const existingOverride = nextConnectorOverrides[connectorId] || {};

                if (
                    typeof handle.releasePointerCapture === 'function' &&
                    typeof handle.hasPointerCapture === 'function' &&
                    handle.hasPointerCapture(endEvent.pointerId)
                ) {
                    handle.releasePointerCapture(endEvent.pointerId);
                }

                handle.removeEventListener('pointermove', handlePointerMove);
                handle.removeEventListener('pointerup', handlePointerEnd);
                handle.removeEventListener('pointercancel', handlePointerEnd);

                if (!ratio || endEvent.type === 'pointercancel') {
                    renderConnectorAnchorHandles(svgElement);
                    return;
                }

                nextConnectorOverrides[connectorId] = Object.assign({}, existingOverride, endpoint === 'source'
                    ? { sourceRatio: ratio }
                    : { targetRatio: ratio });

                renderStageEdit(getCurrentLayoutOverrides(), nextConnectorOverrides);
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
            const path = findConnectorPathById(svgElement, connectorId);
            const cardMap = getRenderedCardMap();

            if (!path) {
                return;
            }

            const sourceCard = cardMap[path.dataset.sourceCard || ''];
            const targetCard = cardMap[path.dataset.targetCard || ''];

            if (!sourceCard || !targetCard) {
                return;
            }

            if (selectedConnectorId !== connectorId) {
                setSelectedConnector(connectorId);
            }

            if (typeof handle.setPointerCapture === 'function') {
                handle.setPointerCapture(event.pointerId);
            }

            function applyBendMove(moveEvent) {
                const currentPoint = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);

                if (!currentPoint) {
                    return null;
                }

                const bend = {
                    x: snapCoordinate(currentPoint.x),
                    y: snapCoordinate(currentPoint.y)
                };

                setPathBend(path, bend);
                updateConnectorPathFromData(path, sourceCard, targetCard);
                handle.setAttribute('x', formatSvgNumber(bend.x - 9));
                handle.setAttribute('y', formatSvgNumber(bend.y - 9));

                return bend;
            }

            function handlePointerMove(moveEvent) {
                applyBendMove(moveEvent);
            }

            function handlePointerEnd(endEvent) {
                const bend = applyBendMove(endEvent);
                const nextConnectorOverrides = getCurrentConnectorOverrides();
                const existingOverride = nextConnectorOverrides[connectorId] || {};

                if (
                    typeof handle.releasePointerCapture === 'function' &&
                    typeof handle.hasPointerCapture === 'function' &&
                    handle.hasPointerCapture(endEvent.pointerId)
                ) {
                    handle.releasePointerCapture(endEvent.pointerId);
                }

                handle.removeEventListener('pointermove', handlePointerMove);
                handle.removeEventListener('pointerup', handlePointerEnd);
                handle.removeEventListener('pointercancel', handlePointerEnd);

                if (!bend || endEvent.type === 'pointercancel') {
                    renderConnectorAnchorHandles(svgElement);
                    return;
                }

                nextConnectorOverrides[connectorId] = Object.assign({}, existingOverride, {
                    bend: bend
                });

                renderStageEdit(getCurrentLayoutOverrides(), nextConnectorOverrides);
            }

            handle.addEventListener('pointermove', handlePointerMove);
            handle.addEventListener('pointerup', handlePointerEnd);
            handle.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    function buildResizePreviewCardMap(cardId, width, height) {
        const cardMap = getRenderedCardMap();

        if (cardMap[cardId]) {
            cardMap[cardId] = Object.assign({}, cardMap[cardId], {
                width: width,
                height: height
            });
        }

        return cardMap;
    }

    function bindStageResizing(svgElement, group) {
        const resizeHandle = group.querySelector('.diagram-resize-handle');

        if (!resizeHandle) {
            return;
        }

        resizeHandle.addEventListener('pointerdown', function (event) {
            const cardId = String(group.dataset.cardId || '').trim();
            const selectedCard = getRenderedCardById(cardId);

            if (!selectedCard) {
                return;
            }

            setSelectedCard(cardId);

            const startPoint = getSvgClientPoint(svgElement, event.clientX, event.clientY);

            if (!startPoint) {
                return;
            }

            const minimumSize = getCardMinimumSize(selectedCard);
            const preview = createResizePreview(svgElement, selectedCard);

            group.classList.add('is-resizing');

            if (typeof resizeHandle.setPointerCapture === 'function') {
                resizeHandle.setPointerCapture(event.pointerId);
            }

            function readResizeSize(resizeEvent) {
                const currentPoint = getSvgClientPoint(svgElement, resizeEvent.clientX, resizeEvent.clientY);

                if (!currentPoint) {
                    return {
                        width: selectedCard.width,
                        height: selectedCard.height
                    };
                }

                return {
                    width: normalizeCardDimension(selectedCard.width + (currentPoint.x - startPoint.x), selectedCard.width, minimumSize.width),
                    height: normalizeCardDimension(selectedCard.height + (currentPoint.y - startPoint.y), selectedCard.height, minimumSize.height)
                };
            }

            function handlePointerMove(moveEvent) {
                const size = readResizeSize(moveEvent);

                selectedWidthInput.value = String(size.width);
                selectedHeightInput.value = String(size.height);
                updateResizePreview(preview, size.width, size.height);
                updateConnectorPreview(svgElement, buildResizePreviewCardMap(cardId, size.width, size.height));
            }

            function handlePointerEnd(endEvent) {
                const size = readResizeSize(endEvent);
                const nextLayoutOverrides = getCurrentLayoutOverrides();
                const existingOverride = nextLayoutOverrides[cardId] || {};

                group.classList.remove('is-resizing');
                preview.remove();
                updateConnectorPreview(svgElement, getRenderedCardMap());

                if (
                    typeof resizeHandle.releasePointerCapture === 'function' &&
                    typeof resizeHandle.hasPointerCapture === 'function' &&
                    resizeHandle.hasPointerCapture(endEvent.pointerId)
                ) {
                    resizeHandle.releasePointerCapture(endEvent.pointerId);
                }

                resizeHandle.removeEventListener('pointermove', handlePointerMove);
                resizeHandle.removeEventListener('pointerup', handlePointerEnd);
                resizeHandle.removeEventListener('pointercancel', handlePointerEnd);

                if (endEvent.type === 'pointercancel') {
                    return;
                }

                nextLayoutOverrides[cardId] = Object.assign({}, existingOverride, {
                    width: size.width,
                    height: size.height
                });

                renderStageEdit(nextLayoutOverrides, getCurrentConnectorOverrides());
            }

            resizeHandle.addEventListener('pointermove', handlePointerMove);
            resizeHandle.addEventListener('pointerup', handlePointerEnd);
            resizeHandle.addEventListener('pointercancel', handlePointerEnd);
            event.preventDefault();
            event.stopPropagation();
        });
    }

    function bindStageDragging() {
        const svgElement = stageCanvas.querySelector('svg');

        if (!svgElement) {
            return;
        }

        bindStageMarqueeSelection(stageCanvas);

        Array.from(svgElement.querySelectorAll('.diagram-connector[data-connector-id]')).forEach(function (path) {
            path.addEventListener('pointerdown', function (event) {
                setSelectedConnector(String(path.dataset.connectorId || ''));
                event.preventDefault();
                event.stopPropagation();
            });
        });

        Array.from(svgElement.querySelectorAll('.diagram-card-group[data-draggable="true"]')).forEach(function (group) {
            bindStageResizing(svgElement, group);
            bindStageKeyboardEditing(group);

            group.addEventListener('pointerdown', function (event) {
                const cardId = String(group.dataset.cardId || '').trim();
                const startX = Number.parseFloat(group.dataset.cardX || '0');
                const startY = Number.parseFloat(group.dataset.cardY || '0');

                if (event.target && typeof event.target.closest === 'function' && event.target.closest('.diagram-resize-handle')) {
                    return;
                }

                if (cardId === '' || !Number.isFinite(startX) || !Number.isFinite(startY)) {
                    return;
                }

                if (selectedCardIds.length > 1 && selectedCardIds.includes(cardId)) {
                    selectedCardId = cardId;
                    selectedConnectorId = '';
                    updateSelectedCardEditor();
                } else {
                    setSelectedCard(cardId);
                }

                const startPoint = getSvgClientPoint(svgElement, event.clientX, event.clientY);
                const root = svgElement.querySelector('.diagram-root');
                const movingCardIds = buildMovingCardIds(cardId);
                const movingGroups = movingCardIds.map(function (movingCardId) {
                    return findDiagramGroupByCardId(svgElement, movingCardId);
                }).filter(function (movingGroup) {
                    return movingGroup !== null;
                });

                if (!startPoint || !root || movingGroups.length === 0) {
                    return;
                }

                if (cardId !== 'architecture-vpc-gcp-shell') {
                    root.appendChild(group);
                }

                movingGroups.forEach(function (movingGroup) {
                    movingGroup.classList.add('is-dragging');
                });

                safelySetPointerCapture(group, event.pointerId);

                function handlePointerMove(moveEvent) {
                    const currentPoint = getSvgClientPoint(svgElement, moveEvent.clientX, moveEvent.clientY);

                    if (!currentPoint) {
                        return;
                    }

                    const dx = currentPoint.x - startPoint.x;
                    const dy = currentPoint.y - startPoint.y;

                    applyDragPreview(movingGroups, dx, dy);
                    updateConnectorPreview(svgElement, buildDragPreviewCardMap(movingCardIds, dx, dy));
                }

                function handlePointerEnd(endEvent) {
                    const endPoint = getSvgClientPoint(svgElement, endEvent.clientX, endEvent.clientY);

                    clearDragPreview(movingGroups);
                    updateConnectorPreview(svgElement, getRenderedCardMap());

                    safelyReleasePointerCapture(group, endEvent.pointerId);

                    window.removeEventListener('pointermove', handlePointerMove);
                    window.removeEventListener('pointerup', handlePointerEnd);
                    window.removeEventListener('pointercancel', handlePointerEnd);

                    if (!endPoint || endEvent.type === 'pointercancel') {
                        return;
                    }

                    const dx = endPoint.x - startPoint.x;
                    const dy = endPoint.y - startPoint.y;
                    const nextLayoutOverrides = getCurrentLayoutOverrides();

                    movingCardIds.forEach(function (movingCardId) {
                        const renderedCard = getRenderedCardById(movingCardId);
                        const existingOverride = nextLayoutOverrides[movingCardId] || {};

                        if (!renderedCard) {
                            return;
                        }

                        nextLayoutOverrides[movingCardId] = Object.assign({}, existingOverride, {
                            x: snapCoordinate(renderedCard.x + dx),
                            y: snapCoordinate(renderedCard.y + dy)
                        });
                    });

                    renderStageEdit(nextLayoutOverrides, getCurrentConnectorOverrides());
                }

                window.addEventListener('pointermove', handlePointerMove);
                window.addEventListener('pointerup', handlePointerEnd);
                window.addEventListener('pointercancel', handlePointerEnd);
                event.preventDefault();
                event.stopPropagation();
            });
        });
    }

    function renderResult(spec, layoutOverrides, connectorOverrides, options) {
        const renderOptions = options || {};
        const inventory = buildInventory(spec);
        const renderedStage = buildSvgMarkup(spec, layoutOverrides, connectorOverrides);
        const svgMarkup = renderedStage.svgMarkup;
        const normalizedLayoutOverrides = renderedStage.layoutOverrides;
        const normalizedConnectorOverrides = renderedStage.connectorOverrides;
        const exportPayload = buildExportPayload(spec, inventory, normalizedLayoutOverrides, normalizedConnectorOverrides);

        latestResult = {
            spec: spec,
            svgMarkup: svgMarkup,
            inventory: inventory,
            exportPayload: exportPayload,
            layoutOverrides: normalizedLayoutOverrides,
            connectorOverrides: normalizedConnectorOverrides,
            renderedCards: renderedStage.cards
        };

        renderStageHeader(spec);
        renderStageMeta(spec);
        stageCanvas.classList.remove('architecture-vpc-gcp-stage-preview');
        stageCanvas.innerHTML = svgMarkup;
        syncStageDiagramHighlight();
        stageCanvas.classList.remove('d-none');
        stageEmpty.classList.add('d-none');

        if (renderOptions.autoFitStage === true) {
            fitStageToRenderedCards(renderedStage.cards, {
                behavior: 'auto'
            });
        } else {
            applyStageZoom();
        }

        bindStageDragging();
        focusPendingStageCard(stageCanvas.querySelector('svg'));
        outputContent.classList.remove('d-none');
        outputEmpty.classList.add('d-none');
        renderOutputScore(spec);
        normalizeInfraStackResultSummary('architecture-vpc-gcp');
        renderAssessmentSections(spec);
        renderInventory(inventory);
        jsonOutput.innerHTML = highlightJson(exportPayload);
        renderNotes(spec);
        updateSelectedCardEditor();
        updateStageUndoButton();
    }

    function resetGeneratedDiagramState() {
        latestResult = null;
        selectedCardId = '';
        selectedCardIds = [];
        selectedConnectorId = '';
        highlightedCardId = '';
        highlightedCardIds = [];
        pendingStageFocusCardId = '';
        stageDiagramHighlighted = false;
        connectorOverrideContext = {};
        pillarBreakdownOutput.innerHTML = '';
        riskLevelOutput.innerHTML = '';
        updateStageUndoButton();
        syncStageDiagramHighlight();
    }

    function createPresetPreviewOverlay() {
        return [
            '<div class="architecture-vpc-gcp-stage-preview-overlay" role="status">',
            '<div class="architecture-vpc-gcp-stage-preview-panel">',
            '<span class="architecture-vpc-gcp-stage-preview-icon"><i class="bi bi-stars" aria-hidden="true"></i></span>',
            '<strong>Choose a preset to generate diagram</strong>',
            '<span>Pick a preset or click Generate Diagram to create the editable workspace.</span>',
            '</div>',
            '</div>'
        ].join('');
    }

    function renderPresetPreview(preset, options) {
        const previewOptions = options || {};
        const previewPreset = preset || findPresetById(selectedPresetId);
        const previewPrompt = String(promptInput.value || previewPreset.prompt || '').trim();
        const inferredSpec = inferFromPrompt(previewPrompt, previewPreset);
        const previewSpec = buildSpecFromControls(previewPrompt, previewPreset.id, inferredSpec);

        if (!previewSpec) {
            showError(getCidrValidationMessage());
            return;
        }

        const renderedStage = buildSvgMarkup(previewSpec, {}, {});

        if (previewOptions.resetZoom === true) {
            stageZoom = defaultStageZoom;
        }

        clearError();
        clearStageUndoHistory();
        resetGeneratedDiagramState();
        renderStageHeader(previewSpec);
        renderStageMeta(previewSpec);
        stageCanvas.classList.add('architecture-vpc-gcp-stage-preview');
        stageCanvas.innerHTML = renderedStage.svgMarkup + createPresetPreviewOverlay();
        syncStageDiagramHighlight();
        stageCanvas.classList.remove('d-none');
        stageEmpty.classList.add('d-none');
        outputContent.classList.add('d-none');
        outputEmpty.classList.remove('d-none');
        if (previewOptions.resetZoom === true) {
            fitStageToRenderedCards(renderedStage.cards, {
                behavior: 'auto'
            });
        } else {
            applyStageZoom();
        }

        updateSelectedCardEditor();

        if (previewOptions.resetZoom !== true && typeof stageCanvas.scrollTo === 'function') {
            stageCanvas.scrollTo({
                left: 0,
                top: 0,
                behavior: 'auto'
            });
        }
    }

    function renderFromControls(inheritedNotes) {
        const nextSpec = buildSpecFromControls(promptInput.value, selectedPresetId, inheritedNotes);

        if (!nextSpec) {
            showError(getCidrValidationMessage());
            return;
        }

        clearError();
        clearStageUndoHistory();
        stageDiagramHighlighted = false;
        renderResult(nextSpec, getCurrentLayoutOverrides(), getCurrentConnectorOverrides());
    }

    function generateFromPrompt() {
        const prompt = String(promptInput.value || '').trim();
        const selectedPreset = findPresetById(selectedPresetId);

        if (prompt === '') {
            showError('Add a GCP VPC brief before generating the diagram.');
            return;
        }

        clearError();

        const inferredSpec = inferFromPrompt(prompt, selectedPreset);

        syncControls(inferredSpec);

        const nextSpec = buildSpecFromControls(prompt, selectedPreset.id, inferredSpec);

        if (!nextSpec) {
            showError(getCidrValidationMessage());
            return;
        }

        stageZoom = defaultStageZoom;
        clearError();
        clearStageUndoHistory();
        stageDiagramHighlighted = false;
        renderResult(nextSpec, {}, {}, {
            autoFitStage: true
        });
    }

    function applyPreset(presetId, shouldGenerate) {
        const preset = findPresetById(presetId);

        selectedPresetId = preset.id;
        updatePresetSelection();
        promptInput.value = preset.prompt;
        syncControls(preset.defaults);
        clearError();
        clearStageUndoHistory();
        stageDiagramHighlighted = false;

        if (shouldGenerate) {
            generateFromPrompt();
        } else {
            renderPresetPreview(preset, {
                resetZoom: true
            });
        }
    }

    function resetToDefault() {
        applyPreset(architectureVpcGcpPresetCatalog[0].id, false);
    }

    function resetStageLayout() {
        if (!latestResult) {
            return;
        }

        selectedCardId = '';
        selectedCardIds = [];
        selectedConnectorId = '';
        stageDiagramHighlighted = false;
        stageZoom = defaultStageZoom;
        renderStageEdit({}, {});
        fitStageToRenderedCards(latestResult && latestResult.renderedCards ? latestResult.renderedCards : null, {
            behavior: 'auto'
        });
    }

    function downloadFile(filename, content, mimeType) {
        const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = blobUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(blobUrl);
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
            window.setTimeout(function () {
                actionButton.classList.remove('copied', 'is-copied', 'failed');
                if (icon && actionButton.dataset.defaultIcon) {
                    icon.className = actionButton.dataset.defaultIcon;
                }
            }, 1400);
            return;
        }

        const labelTarget = button.querySelector ? button.querySelector('[data-button-label]') || button : button;
        const originalLabel = labelTarget.dataset.originalLabel || labelTarget.textContent;

        labelTarget.dataset.originalLabel = originalLabel;
        labelTarget.textContent = label;

        window.setTimeout(function () {
            labelTarget.textContent = originalLabel;
        }, 1400);
    }

    function downloadSvg() {
        if (!latestResult) {
            return;
        }

        downloadFile('architecture-vpc-gcp.svg', latestResult.svgMarkup, 'image/svg+xml;charset=utf-8');
    }

    async function exportPng() {
        if (!latestResult) {
            return;
        }

        try {
            const svgBlob = new Blob([latestResult.svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            const image = new Image();

            image.onload = function () {
                const viewBoxMatch = latestResult.svgMarkup.match(/viewBox="0 0 (\d+) (\d+)"/);
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const width = viewBoxMatch ? Number.parseInt(viewBoxMatch[1], 10) : 1520;
                const height = viewBoxMatch ? Number.parseInt(viewBoxMatch[2], 10) : 860;

                canvas.width = width;
                canvas.height = height;

                if (context) {
                    context.fillStyle = '#f8fdff';
                    context.fillRect(0, 0, width, height);
                    context.drawImage(image, 0, 0, width, height);
                    canvas.toBlob(function (blob) {
                        if (!blob) {
                            showError('Failed to prepare the PNG export.');
                            return;
                        }

                        downloadFile('architecture-vpc-gcp.png', blob, 'image/png');
                        flashButton(exportPngButton, 'Saved');
                    }, 'image/png');
                }

                URL.revokeObjectURL(svgUrl);
            };

            image.onerror = function () {
                URL.revokeObjectURL(svgUrl);
                showError('Failed to render the PNG export from the current SVG stage.');
            };

            image.src = svgUrl;
        } catch (error) {
            showError('Failed to export the current diagram as PNG.');
        }
    }

    async function copyJson() {
        if (!latestResult) {
            return;
        }

        try {
            await navigator.clipboard.writeText(JSON.stringify(latestResult.exportPayload, null, 2));
            flashButton(copyJsonButton, 'Copied');
        } catch (error) {
            showError('Failed to copy the JSON state to the clipboard.');
        }
    }

    function downloadJson() {
        if (!latestResult) {
            return;
        }

        downloadFile('architecture-vpc-gcp.json', JSON.stringify(latestResult.exportPayload, null, 2), 'application/json;charset=utf-8');
    }

    function restoreFromImportedPayload(payload) {
        const importedState = buildImportedPayloadState(payload);

        if (importedState.error) {
            showError(importedState.error);
            return;
        }

        selectedPresetId = importedState.presetId;
        updatePresetSelection();
        promptInput.value = importedState.prompt;
        syncControls(importedState.spec);
        clearError();
        clearStageUndoHistory();
        const runtimeState = restoreEngineStateFromPayload(payload, importedState.layoutOverrides, importedState.connectorOverrides);

        setStageUiHidden(Boolean(runtimeState.viewport.uiHidden));
        stageDiagramHighlighted = Boolean(runtimeState.viewport.diagramHighlighted);
        renderResult(buildSpecFromControls(importedState.prompt, selectedPresetId, {
            assumptions: importedState.assumptions,
            matchedKeywords: importedState.matchedKeywords
        }), runtimeState.layoutOverrides, runtimeState.connectorOverrides);
        stageCanvas.scrollLeft = runtimeState.viewport.scrollLeft;
        stageCanvas.scrollTop = runtimeState.viewport.scrollTop;

        const restoredSelectedCardIds = Array.isArray(runtimeState.selection.nodeIds) ? runtimeState.selection.nodeIds.slice() : [];
        const restoredSelectedConnectorId = String(runtimeState.selection.connectorId || '');

        if (restoredSelectedCardIds.length > 0) {
            setSelectedCards(restoredSelectedCardIds, restoredSelectedCardIds[0], false);
        } else if (restoredSelectedConnectorId !== '') {
            setSelectedConnector(restoredSelectedConnectorId);
        }

        setHighlightedCardIds(Array.isArray(runtimeState.selection.highlightedNodeIds) ? runtimeState.selection.highlightedNodeIds : []);
        syncVisualStateToExportPayload();
    }

    function handleImportChange(event) {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function (loadEvent) {
            try {
                const payload = JSON.parse(String(loadEvent.target && loadEvent.target.result ? loadEvent.target.result : '{}'));

                restoreFromImportedPayload(payload);
            } catch (error) {
                showError('Failed to parse the imported JSON file.');
            } finally {
                importJsonInput.value = '';
            }
        };

        reader.onerror = function () {
            showError('Failed to read the selected JSON file.');
            importJsonInput.value = '';
        };

        reader.readAsText(file);
    }

    populateRegionOptions();
    initMarkdownCopyButtons();
    syncInventorySortSelect();

    presetInput.addEventListener('change', function () {
        applyPreset(String(presetInput.value || architectureVpcGcpPresetCatalog[0].id), true);
    });

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activateTab(String(button.dataset.tabTarget || 'architectureVpcGcpInventoryPanel'));
        });
    });
    bindTabKeyboardNavigation(tabButtons, 'tabTarget', activateTab);

    configTabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            activateConfigTab(String(button.dataset.configTabTarget || 'architectureVpcGcpNetworkConfigPanel'));
        });
    });
    bindTabKeyboardNavigation(configTabButtons, 'configTabTarget', activateConfigTab);

    generateButton.addEventListener('click', generateFromPrompt);
    resetButton.addEventListener('click', resetToDefault);
    resetLayoutButton.addEventListener('click', resetStageLayout);
    zoomOutButton.addEventListener('click', function () {
        setStageZoom(stageZoom - stageZoomStep, {
            preserveViewport: true
        });
    });
    zoomInButton.addEventListener('click', function () {
        setStageZoom(stageZoom + stageZoomStep, {
            preserveViewport: true
        });
    });
    fullscreenButton.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && stageShell.classList.contains('architecture-vpc-gcp-stage-expanded')) {
            setStageExpanded(false);
        }
    });
    document.addEventListener('keydown', handleStageUndoKeydown);
    document.addEventListener('keydown', handleSelectedCardDocumentKeydown);
    highlightCardButton.addEventListener('click', highlightSelectedCard);
    applyCardSizeButton.addEventListener('click', applySelectedCardSize);
    resetCardSizeButton.addEventListener('click', resetSelectedCardSize);
    exportPngButton.addEventListener('click', exportPng);
    downloadSvgButton.addEventListener('click', downloadSvg);
    copyJsonButton.addEventListener('click', copyJson);
    downloadJsonButton.addEventListener('click', downloadJson);
    inventorySortInput.addEventListener('change', applyInventorySortMode);
    inventorySortOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            setInventorySortMode(option.dataset.sortValue || 'id');
            inventorySortSelect.removeAttribute('open');
        });
    });
    inventoryTableBody.addEventListener('click', function (event) {
        const button = event.target.closest('.architecture-vpc-gcp-row-copy');

        if (!button || !inventoryTableBody.contains(button)) {
            return;
        }

        if (!button.dataset.copyTitle) {
            button.dataset.copyTitle = button.getAttribute('title') || 'Copy row';
        }

        copyInventoryRow(button.dataset.inventoryCopyRow || '', button);
    });
    inventorySortSelect.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            inventorySortSelect.removeAttribute('open');
        }
    });
    importJsonButton.addEventListener('click', function () {
        importJsonInput.click();
    });
    // ns:start family._base.workspace.08_json-restore
    importJsonInput.addEventListener('change', handleImportChange);
    // ns:end family._base.workspace.08_json-restore
    zoomInput.addEventListener('change', function () {
        setStageZoomFromPercent(zoomInput.value, {
            preserveViewport: true
        });
    });
    zoomInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            setStageZoomFromPercent(zoomInput.value, {
                preserveViewport: true
            });
        }

        if (event.key === 'Escape') {
            zoomInput.blur();
        }
    });
    zoomFitButton.addEventListener('click', function () {
        setStageZoomToFit();
    });
    zoomActualButton.addEventListener('click', function () {
        setStageZoom(1, {
            preserveViewport: true
        });
    });
    undoStageEditButton.addEventListener('click', function () {
        undoStageEdit();
    });
    highlightAllButton.addEventListener('click', function () {
        pushStageUndoSnapshot();
        setStageDiagramHighlighted(!stageDiagramHighlighted);
    });
    zoomHideUiButton.addEventListener('click', function () {
        setStageUiHidden(!stageUiHidden);
    });
    usageHelpButton.addEventListener('click', function () {
        setUsageHelpOpen(true);
    });
    usageHelpCloseButton.addEventListener('click', function () {
        setUsageHelpOpen(false);
    });
    usageHelpPopup.addEventListener('click', function (event) {
        if (event.target !== usageHelpPopup) {
            return;
        }

        setUsageHelpOpen(false);
    });
    usageHelpPopup.addEventListener('keydown', handleUsageHelpKeydown);
    stageCanvas.addEventListener('wheel', function (event) {
        if ((!event.ctrlKey && !event.metaKey) || !stageCanvas.querySelector('svg')) {
            return;
        }

        event.preventDefault();
        setStageZoom(stageZoom + (event.deltaY > 0 ? -stageZoomStep : stageZoomStep), {
            preserveViewport: true
        });
    }, {
        passive: false
    });
    document.addEventListener('click', function (event) {
        if (inventorySortSelect.contains(event.target)) {
            return;
        }

        inventorySortSelect.removeAttribute('open');
    });

    [
        regionInput,
        cidrInput,
        azCountInput,
        natModeInput,
        appTierInput,
        databaseInput,
        route53Input,
        cloudFrontInput,
        wafInput,
        albInput,
        bastionInput,
        endpointsInput,
        flowLogsInput,
        cloudWatchInput,
        siteToSiteVpnInput,
        transitGatewayInput,
        cacheInput
    ].forEach(function (input) {
        input.addEventListener('change', function () {
            if (latestResult) {
                renderFromControls({
                    assumptions: latestResult.spec ? latestResult.spec.assumptions : [],
                    matchedKeywords: latestResult.spec ? latestResult.spec.matchedKeywords : []
                });
            } else if (promptInput.value.trim() !== '') {
                renderPresetPreview(findPresetById(selectedPresetId), {
                    resetZoom: false
                });
            }
        });
    });

    activateTab('architectureVpcGcpInventoryPanel');
    activateConfigTab('architectureVpcGcpNetworkConfigPanel');
    updateFullscreenButton();
    applyStageZoom();
    updatePresetSelection();
    applyPreset(architectureVpcGcpPresetCatalog[0].id, false);
    applyWorkspaceInfoMarkers();
});
/* table-output-standard:start */
(function setupArchitectureVpcGcpTableOutputStandard() {
    const rootSelector = '.architecture-vpc-gcp-tool';
    const tableSelector = '.tool-result-table tbody tr, .architecture-vpc-gcp-table tbody tr';
    const tbodySelector = '.tool-result-table tbody, .architecture-vpc-gcp-table tbody';
    const clampClass = 'architecture-vpc-gcp-table-cell-text';
    const cellClampClass = 'architecture-vpc-gcp-cell-clamp';
    const statusColumnClass = 'architecture-vpc-gcp-table-status-cell';

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
        root.querySelectorAll('.tool-result-table, .architecture-vpc-gcp-table').forEach(function alignStatusTable(table) {
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
