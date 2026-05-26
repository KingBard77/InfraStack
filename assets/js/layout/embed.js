// embed.js

(function() {
    "use strict";

    function escapeEmbedAttribute(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function buildEmbedSource(baseUrl, includeCurrentInputs) {
        try {
            const url = new URL(baseUrl, window.location.origin);

            if (includeCurrentInputs) {
                const currentUrl = new URL(window.location.href, window.location.origin);
                currentUrl.searchParams.forEach(function (value, key) {
                    if (key !== 'share') {
                        url.searchParams.set(key, value);
                    }
                });
            }

            url.searchParams.set('share', 'embed');
            return url.toString();
        } catch (error) {
            return baseUrl;
        }
    }

    const embedSizePresets = {
        responsive: {
            width: 100,
            widthUnit: '%',
            height: 100,
            heightUnit: '%',
            aspectWidth: 16,
            aspectHeight: 9,
        },
        compact: {
            width: 100,
            widthUnit: '%',
            height: 520,
            heightUnit: 'px',
            aspectWidth: 16,
            aspectHeight: 9,
        },
        tall: {
            width: 100,
            widthUnit: '%',
            height: 900,
            heightUnit: 'px',
            aspectWidth: 16,
            aspectHeight: 9,
        },
        fixed: {
            width: 960,
            widthUnit: 'px',
            height: 720,
            heightUnit: 'px',
            aspectWidth: 16,
            aspectHeight: 9,
        },
    };

    function normalizeEmbedText(value) {
        return String(value || '').trim().replace(/\s+/g, ' ');
    }

    function getEmbedSelectValue(builder, selector, fallback) {
        const control = builder.querySelector(selector);
        const value = control ? normalizeEmbedText(control.value) : '';

        return value || fallback;
    }

    function getEmbedNumberValue(builder, selector, fallback, min, max) {
        const control = builder.querySelector(selector);
        const parsed = control ? Number.parseInt(control.value, 10) : Number.NaN;

        if (!Number.isFinite(parsed)) {
            return fallback;
        }

        return Math.min(Math.max(parsed, min), max);
    }

    function setEmbedInputValue(builder, selector, value) {
        const control = builder.querySelector(selector);

        if (control) {
            control.value = value;
        }
    }

    function setEmbedSelectValue(builder, selector, value) {
        const control = builder.querySelector(selector);

        if (!control) {
            return;
        }

        const hasOption = Array.from(control.options).some(function (option) {
            return option.value === value;
        });

        if (hasOption) {
            control.value = value;
            syncEmbedCustomSelect(control);
        }
    }

    function applyEmbedSizePreset(builder, size) {
        const preset = embedSizePresets[size] || embedSizePresets.responsive;

        setEmbedInputValue(builder, '[data-embed-width]', preset.width);
        setEmbedSelectValue(builder, '[data-embed-width-unit]', preset.widthUnit);
        setEmbedInputValue(builder, '[data-embed-height]', preset.height);
        setEmbedSelectValue(builder, '[data-embed-height-unit]', preset.heightUnit);
        setEmbedInputValue(builder, '[data-embed-aspect-width]', preset.aspectWidth);
        setEmbedInputValue(builder, '[data-embed-aspect-height]', preset.aspectHeight);
    }

    function formatEmbedAttributeDimension(value, unit) {
        if (unit === 'px') {
            return String(value);
        }

        return String(value) + unit;
    }

    function formatEmbedStyleDimension(value, unit) {
        return String(value) + unit;
    }

    function getEmbedDimensions(builder) {
        const widthUnit = getEmbedSelectValue(builder, '[data-embed-width-unit]', '%');
        const heightUnit = getEmbedSelectValue(builder, '[data-embed-height-unit]', '%');
        const width = getEmbedNumberValue(builder, '[data-embed-width]', 100, 1, 1600);
        const height = getEmbedNumberValue(builder, '[data-embed-height]', 100, 1, 1600);

        return {
            width: formatEmbedAttributeDimension(width, widthUnit),
            height: formatEmbedAttributeDimension(height, heightUnit),
            styleWidth: formatEmbedStyleDimension(width, widthUnit),
            styleHeight: formatEmbedStyleDimension(height, heightUnit),
        };
    }

    function getEmbedAspectRatio(builder) {
        const width = getEmbedNumberValue(builder, '[data-embed-aspect-width]', 16, 1, 64);
        const height = getEmbedNumberValue(builder, '[data-embed-aspect-height]', 9, 1, 64);

        return String(width) + ' / ' + String(height);
    }

    function getEmbedMaxHeight(builder) {
        const control = builder.querySelector('[data-embed-max-height]');
        const value = control ? Number.parseInt(control.value, 10) : Number.NaN;

        if (!Number.isFinite(value) || value < 1) {
            return '';
        }

        const unit = getEmbedSelectValue(builder, '[data-embed-max-height-unit]', 'px');

        return formatEmbedStyleDimension(Math.min(value, 2400), unit);
    }

    function buildEmbedCode(builder) {
        const baseUrl = builder.getAttribute('data-embed-base-url') || window.location.href;
        const title = builder.getAttribute('data-embed-title') || document.title || 'InfraStack Tool';
        const includeCurrent = builder.querySelector('[data-embed-include-current]')?.checked !== false;
        const loading = builder.querySelector('[data-embed-loading]')?.value === 'eager' ? 'eager' : 'lazy';
        const dimensions = getEmbedDimensions(builder);
        const referrerPolicy = getEmbedSelectValue(builder, '[data-embed-referrer-policy]', 'no-referrer-when-downgrade');
        const sandboxTokens = normalizeEmbedText(builder.querySelector('[data-embed-sandbox]')?.value || '');
        const maxHeight = getEmbedMaxHeight(builder);
        const sourceUrl = buildEmbedSource(baseUrl, includeCurrent);
        const attributes = [
            'src="' + escapeEmbedAttribute(sourceUrl) + '"',
            'title="' + escapeEmbedAttribute(title) + '"',
            'width="' + escapeEmbedAttribute(dimensions.width) + '"',
            'height="' + escapeEmbedAttribute(dimensions.height) + '"',
            'loading="' + loading + '"',
            'referrerpolicy="' + escapeEmbedAttribute(referrerPolicy) + '"',
        ];
        const style = [
            'width:' + dimensions.styleWidth,
            'height:' + dimensions.styleHeight,
            'aspect-ratio:' + getEmbedAspectRatio(builder),
            'border:1px solid #dbe4ee',
            'border-radius:14px',
        ];

        if (maxHeight !== '') {
            style.push('max-height:' + maxHeight);
        }

        if (sandboxTokens !== '') {
            attributes.push('sandbox="' + escapeEmbedAttribute(sandboxTokens) + '"');
        }

        if (builder.querySelector('[data-embed-fullscreen]')?.checked === true) {
            attributes.push('allowfullscreen');
        }

        if (builder.querySelector('[data-embed-collapsible]')?.checked === true) {
            attributes.push('data-collapsible="true"');
        }

        attributes.push('style="' + escapeEmbedAttribute(style.join(';')) + ';"');

        return '<iframe ' + attributes.join(' ') + '></iframe>';
    }

    function updateEmbedBuilder(builder) {
        const code = buildEmbedCode(builder);
        const codeInput = builder.querySelector('[data-embed-code]');
        const copyButton = builder.querySelector('[data-embed-copy]');
        const demoLink = builder.querySelector('[data-embed-demo]');
        const baseUrl = builder.getAttribute('data-embed-base-url') || window.location.href;
        const includeCurrent = builder.querySelector('[data-embed-include-current]')?.checked !== false;

        if (codeInput) {
            codeInput.value = code;
        }

        if (copyButton) {
            copyButton.setAttribute('data-copy-value', code);
        }

        if (demoLink) {
            const previewUrl = buildEmbedSource(baseUrl, includeCurrent);

            demoLink.setAttribute('data-embed-preview-url', previewUrl);

            if (demoLink.tagName === 'A') {
                demoLink.href = previewUrl;
            }
        }
    }

    function closeEmbedSection(builder, section) {
        const sectionName = section.getAttribute('data-embed-section');
        const trigger = builder.querySelector('[data-embed-focus="' + sectionName + '"]');

        section.hidden = true;
        section.classList.remove('is-open');

        if (trigger) {
            trigger.classList.remove('is-active');
            trigger.setAttribute('aria-expanded', 'false');
        }
    }

    function openEmbedSection(builder, section) {
        const sectionName = section.getAttribute('data-embed-section');
        const trigger = builder.querySelector('[data-embed-focus="' + sectionName + '"]');

        section.hidden = false;
        section.classList.add('is-open');

        if (trigger) {
            trigger.classList.add('is-active');
            trigger.setAttribute('aria-expanded', 'true');
        }
    }

    function toggleEmbedSection(builder, target) {
        const section = builder.querySelector('[data-embed-section="' + target + '"]');

        if (!section) {
            return;
        }

        if (section.hidden) {
            openEmbedSection(builder, section);
            return;
        }

        closeEmbedSection(builder, section);
    }

    function buildEmbedPopupFeatures() {
        const availableWidth = window.screen?.availWidth || 1200;
        const availableHeight = window.screen?.availHeight || 860;
        const width = Math.min(920, Math.max(760, Math.floor(availableWidth * 0.68)));
        const height = Math.min(760, Math.max(620, Math.floor(availableHeight * 0.82)));
        const left = Math.max(0, Math.floor((availableWidth - width) / 2));
        const top = Math.max(0, Math.floor((availableHeight - height) / 2));

        return [
            'popup=yes',
            'width=' + width,
            'height=' + height,
            'left=' + left,
            'top=' + top,
            'resizable=yes',
            'scrollbars=yes',
            'toolbar=yes',
            'location=yes',
            'menubar=no',
            'status=no',
        ].join(',');
    }

    function openEmbedPreview(builder, opener) {
        const baseUrl = builder.getAttribute('data-embed-base-url') || window.location.href;
        const includeCurrent = builder.querySelector('[data-embed-include-current]')?.checked !== false;
        const previewUrl = opener.getAttribute('data-embed-preview-url') || buildEmbedSource(baseUrl, includeCurrent);
        const previewWindow = window.open(previewUrl, 'infrastackEmbedPreview', buildEmbedPopupFeatures());

        if (previewWindow) {
            previewWindow.focus();
        }

        return Boolean(previewWindow);
    }

    let embedSelectSequence = 0;
    let embedSelectDocumentListenersReady = false;

    function closeEmbedSelect(shell) {
        const trigger = shell.querySelector('[data-embed-select-trigger]');

        shell.classList.remove('is-open');

        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
        }
    }

    function closeEmbedSelects(exceptShell) {
        document.querySelectorAll('.embed-share-select.is-open').forEach(function (shell) {
            if (shell !== exceptShell) {
                closeEmbedSelect(shell);
            }
        });
    }

    function getEmbedSelectedOption(select) {
        return select.selectedOptions?.[0]
            || Array.from(select.options).find(function (option) {
                return option.value === select.value;
            })
            || select.options[0];
    }

    function syncEmbedCustomSelect(select) {
        const shell = select.closest('.embed-share-select');

        if (!shell) {
            return;
        }

        const selectedOption = getEmbedSelectedOption(select);
        const triggerValue = shell.querySelector('[data-embed-select-value]');

        if (triggerValue && selectedOption) {
            triggerValue.textContent = selectedOption.textContent;
        }

        shell.querySelectorAll('[data-embed-select-option]').forEach(function (optionButton) {
            const isSelected = optionButton.getAttribute('data-value') === select.value;

            optionButton.classList.toggle('is-selected', isSelected);
            optionButton.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });
    }

    function openEmbedSelect(shell, shouldFocusOption) {
        const trigger = shell.querySelector('[data-embed-select-trigger]');
        const select = shell.querySelector('select');

        closeEmbedSelects(shell);
        shell.classList.add('is-open');

        if (trigger) {
            trigger.setAttribute('aria-expanded', 'true');
        }

        if (shouldFocusOption && select) {
            const selectedOption = shell.querySelector('[data-embed-select-option][aria-selected="true"]')
                || shell.querySelector('[data-embed-select-option]');

            selectedOption?.focus();
        }
    }

    function selectEmbedCustomOption(select, value) {
        if (select.value !== value) {
            select.value = value;
        }

        syncEmbedCustomSelect(select);
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function moveEmbedSelectFocus(optionButton, direction) {
        const shell = optionButton.closest('.embed-share-select');
        const options = Array.from(shell.querySelectorAll('[data-embed-select-option]:not(:disabled)'));
        const currentIndex = options.indexOf(optionButton);
        const nextIndex = Math.min(Math.max(currentIndex + direction, 0), options.length - 1);

        options[nextIndex]?.focus();
    }

    function handleEmbedSelectOptionKeydown(event, select, optionButton) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            moveEmbedSelectFocus(optionButton, 1);
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            moveEmbedSelectFocus(optionButton, -1);
            return;
        }

        if (event.key === 'Home' || event.key === 'End') {
            const shell = optionButton.closest('.embed-share-select');
            const options = Array.from(shell.querySelectorAll('[data-embed-select-option]:not(:disabled)'));

            event.preventDefault();
            options[event.key === 'Home' ? 0 : options.length - 1]?.focus();
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            const shell = optionButton.closest('.embed-share-select');

            event.preventDefault();
            selectEmbedCustomOption(select, optionButton.getAttribute('data-value'));
            closeEmbedSelect(shell);
            shell.querySelector('[data-embed-select-trigger]')?.focus();
            return;
        }

        if (event.key === 'Escape') {
            const shell = optionButton.closest('.embed-share-select');

            event.preventDefault();
            closeEmbedSelect(shell);
            shell.querySelector('[data-embed-select-trigger]')?.focus();
        }
    }

    function enhanceEmbedSelect(select) {
        if (select.getAttribute('data-embed-select-enhanced') === 'true') {
            return;
        }

        const shell = document.createElement('span');
        const trigger = document.createElement('button');
        const triggerValue = document.createElement('span');
        const triggerIcon = document.createElement('i');
        const menu = document.createElement('span');
        const menuId = 'embed-share-select-menu-' + String(++embedSelectSequence);

        shell.className = 'embed-share-select';
        trigger.type = 'button';
        trigger.className = 'embed-share-select-trigger';
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', menuId);
        trigger.setAttribute('data-embed-select-trigger', '');
        triggerValue.className = 'embed-share-select-value';
        triggerValue.setAttribute('data-embed-select-value', '');
        triggerIcon.className = 'bi bi-chevron-down';
        triggerIcon.setAttribute('aria-hidden', 'true');
        menu.id = menuId;
        menu.className = 'embed-share-select-menu';
        menu.setAttribute('role', 'listbox');

        Array.from(select.options).forEach(function (option) {
            const optionButton = document.createElement('button');
            const checkIcon = document.createElement('i');
            const optionLabel = document.createElement('span');

            optionButton.type = 'button';
            optionButton.className = 'embed-share-select-option';
            optionButton.setAttribute('role', 'option');
            optionButton.setAttribute('data-embed-select-option', '');
            optionButton.setAttribute('data-value', option.value);
            optionButton.disabled = option.disabled;
            checkIcon.className = 'bi bi-check2';
            checkIcon.setAttribute('aria-hidden', 'true');
            optionLabel.textContent = option.textContent;
            optionButton.append(checkIcon, optionLabel);
            optionButton.addEventListener('click', function () {
                selectEmbedCustomOption(select, option.value);
                closeEmbedSelect(shell);
                trigger.focus();
            });
            optionButton.addEventListener('keydown', function (event) {
                handleEmbedSelectOptionKeydown(event, select, optionButton);
            });
            menu.appendChild(optionButton);
        });

        select.parentNode.insertBefore(shell, select);
        shell.appendChild(select);
        trigger.append(triggerValue, triggerIcon);
        shell.append(trigger, menu);
        select.setAttribute('data-embed-select-enhanced', 'true');
        select.setAttribute('data-embed-native-select', '');
        select.tabIndex = -1;

        trigger.addEventListener('click', function () {
            if (shell.classList.contains('is-open')) {
                closeEmbedSelect(shell);
                return;
            }

            openEmbedSelect(shell, false);
        });

        trigger.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openEmbedSelect(shell, true);
            }
        });

        select.addEventListener('change', function () {
            syncEmbedCustomSelect(select);
        });

        syncEmbedCustomSelect(select);
    }

    function initEmbedSelectDocumentListeners() {
        if (embedSelectDocumentListenersReady) {
            return;
        }

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.embed-share-select')) {
                closeEmbedSelects();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeEmbedSelects();
            }
        });

        embedSelectDocumentListenersReady = true;
    }

    function initEmbedBuilders() {
        document.querySelectorAll('[data-embed-builder]').forEach(function (builder) {
            builder.querySelectorAll('select').forEach(enhanceEmbedSelect);
            initEmbedSelectDocumentListeners();

            const updateControls = builder.querySelectorAll('[data-embed-include-current], [data-embed-loading], [data-embed-aspect-width], [data-embed-aspect-height], [data-embed-max-height], [data-embed-max-height-unit], [data-embed-collapsible], [data-embed-fullscreen], [data-embed-referrer-policy], [data-embed-sandbox]');
            const dimensionControls = builder.querySelectorAll('[data-embed-width], [data-embed-width-unit], [data-embed-height], [data-embed-height-unit]');
            const sizeSelect = builder.querySelector('[data-embed-size]');

            updateControls.forEach(function (control) {
                control.addEventListener('input', function () {
                    updateEmbedBuilder(builder);
                });
                control.addEventListener('change', function () {
                    updateEmbedBuilder(builder);
                });
            });

            dimensionControls.forEach(function (control) {
                control.addEventListener('input', function () {
                    if (sizeSelect) {
                        setEmbedSelectValue(builder, '[data-embed-size]', 'fixed');
                    }
                    updateEmbedBuilder(builder);
                });
                control.addEventListener('change', function () {
                    if (sizeSelect) {
                        setEmbedSelectValue(builder, '[data-embed-size]', 'fixed');
                    }
                    updateEmbedBuilder(builder);
                });
            });

            if (sizeSelect) {
                sizeSelect.addEventListener('change', function () {
                    applyEmbedSizePreset(builder, sizeSelect.value);
                    updateEmbedBuilder(builder);
                });
            }

            builder.querySelectorAll('[data-embed-focus]').forEach(function (button) {
                button.addEventListener('click', function (event) {
                    event.stopPropagation();
                    const target = button.getAttribute('data-embed-focus');

                    toggleEmbedSection(builder, target);
                });
            });

            builder.querySelectorAll('[data-embed-demo]').forEach(function (button) {
                button.addEventListener('click', function (event) {
                    if (openEmbedPreview(builder, button)) {
                        event.preventDefault();
                    }
                });
            });

            updateEmbedBuilder(builder);
        });
    }

    initEmbedBuilders();

})();
