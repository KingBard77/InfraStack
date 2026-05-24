// main.js

(function() {
    "use strict";

    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
        const selectBody = document.querySelector('body');
        const selectHeader = document.querySelector('#header');
        if (!selectHeader) {
            return;
        }
        if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
        window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const navmenu = document.querySelector('#navmenu');
    const mobileNavIcon = mobileNavToggleBtn ? mobileNavToggleBtn.querySelector('i') : null;

    function setMobileNavState(isActive) {
        document.body.classList.toggle('mobile-nav-active', isActive);

        if (mobileNavToggleBtn) {
            mobileNavToggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            mobileNavToggleBtn.setAttribute('aria-label', isActive ? 'Close navigation menu' : 'Open navigation menu');
        }

        if (mobileNavIcon) {
            mobileNavIcon.classList.toggle('bi-list', !isActive);
            mobileNavIcon.classList.toggle('bi-x', isActive);
        }
    }

    function mobileNavToggle() {
        setMobileNavState(!document.body.classList.contains('mobile-nav-active'));
    }

    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    }

    if (navmenu) {
        navmenu.addEventListener('click', event => {
            if (event.target === navmenu && document.body.classList.contains('mobile-nav-active')) {
                setMobileNavState(false);
            }
        });
    }

    document.addEventListener('click', event => {
        if (!document.body.classList.contains('mobile-nav-active') || !navmenu || !mobileNavToggleBtn) {
            return;
        }

        if (!navmenu.contains(event.target) && !mobileNavToggleBtn.contains(event.target)) {
            setMobileNavState(false);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && document.body.classList.contains('mobile-nav-active')) {
            setMobileNavState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200 && document.body.classList.contains('mobile-nav-active')) {
            setMobileNavState(false);
        }
    });

    window.addEventListener('load', () => {
        setMobileNavState(false);
    });

    window.addEventListener('pageshow', () => {
        setMobileNavState(false);
    });

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                setMobileNavState(false);
            }
        });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
    }
    if (scrollTop) {
        scrollTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    /**
     * Animation on scroll function and init
     */
    function aosInit() {
        if (typeof AOS === 'undefined') {
            return;
        }

        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    window.addEventListener('load', aosInit);

    /**
     * Init swiper sliders
     */
    function initSwiper() {
        if (typeof Swiper === 'undefined') {
            return;
        }

        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
            let config = JSON.parse(
                swiperElement.querySelector(".swiper-config").innerHTML.trim()
            );

            if (swiperElement.classList.contains("swiper-tab") && typeof initSwiperWithCustomPagination === 'function') {
                initSwiperWithCustomPagination(swiperElement, config);
            } else {
                new Swiper(swiperElement, config);
            }
        });
    }

    window.addEventListener("load", initSwiper);

    /**
     * Initiate Pure Counter
     */
    window.addEventListener('load', function () {
        if (typeof PureCounter !== 'undefined') {
            new PureCounter();
        }
    });

    /**
     * Initiate glightbox
     */
    window.addEventListener('load', function () {
        if (typeof GLightbox !== 'undefined') {
            GLightbox({
                selector: '.glightbox'
            });
        }
    });

    function copyTextWithTextarea(value) {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const didCopy = document.execCommand('copy');
        document.body.removeChild(textarea);

        return didCopy ? Promise.resolve() : Promise.reject(new Error('Copy command failed.'));
    }

    function copyText(value) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(value).catch(function () {
                return copyTextWithTextarea(value);
            });
        }

        return copyTextWithTextarea(value);
    }

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

    const toolShareState = {
        action: null,
        blob: null,
        objectUrl: '',
        snapshot: null,
        snapshotPending: false,
        requestId: 0,
        snapshotRequestId: 0,
        trigger: null,
    };

    function getToolShareOverlay() {
        return document.getElementById('toolShareOverlay');
    }

    function getToolShareElements() {
        const overlay = getToolShareOverlay();

        if (!overlay) {
            return null;
        }

        if (overlay.parentElement !== document.body) {
            document.body.appendChild(overlay);
        }

        return {
            overlay: overlay,
            closeButton: overlay.querySelector('.tool-share-close'),
            status: overlay.querySelector('.tool-share-status'),
            preview: overlay.querySelector('.tool-share-preview'),
            continueButton: overlay.querySelector('[data-tool-share-continue]'),
            nativeButton: overlay.querySelector('[data-tool-share-native]'),
            copyImageButton: overlay.querySelector('[data-tool-share-copy-image]'),
            downloadButton: overlay.querySelector('[data-tool-share-download]'),
        };
    }

    function getToolShareAdapter(overlay) {
        const adapters = window.InfraStackShareAdapters || {};
        const toolKey = String(overlay?.dataset.shareToolKey || '');

        return adapters[toolKey] || adapters.default || null;
    }

    function getPageMetaContent(selector) {
        const element = document.querySelector(selector);

        return element ? String(element.getAttribute('content') || '').trim() : '';
    }

    function getCanonicalShareUrl() {
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        const canonicalUrl = canonicalLink ? String(canonicalLink.getAttribute('href') || '').trim() : '';

        return canonicalUrl || window.location.href.split('#')[0];
    }

    function normalizeShareText(value) {
        return String(value || '').trim().replace(/\s+/g, ' ');
    }

    function getToolShareTitle(overlay, adapter) {
        if (adapter && typeof adapter.getTitle === 'function') {
            const adapterTitle = normalizeShareText(adapter.getTitle());

            if (adapterTitle !== '') {
                return adapterTitle;
            }
        }

        return normalizeShareText(overlay?.dataset.shareTitle)
            || getPageMetaContent('meta[property="og:title"]')
            || document.title
            || 'InfraStack Tool';
    }

    function getToolShareSummary(overlay, adapter) {
        if (adapter && typeof adapter.getSummary === 'function') {
            const adapterSummary = normalizeShareText(adapter.getSummary());

            if (adapterSummary !== '') {
                return adapterSummary;
            }
        }

        return normalizeShareText(overlay?.dataset.shareSummary)
            || getPageMetaContent('meta[property="og:description"]')
            || 'InfraStack snapshot.';
    }

    function isToolShareTextSourceVisible(element) {
        if (!element || !document.documentElement.contains(element)) {
            return false;
        }

        const style = window.getComputedStyle(element);

        return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
    }

    function collectToolShareMetaParts(element) {
        const childParts = Array.from(element.children || []).map(function (child) {
            return normalizeShareText(child.textContent);
        }).filter(Boolean);

        if (childParts.length > 1) {
            return childParts;
        }

        const text = normalizeShareText(element.textContent);

        return text === '' ? [] : [text];
    }

    function getVisibleToolShareMetaSubtitle() {
        const selectors = [
            '[data-share-subtitle-source]',
            '[id$="StageMeta"]',
            '[class*="stage-meta"]',
            '[class*="summary-meta"]',
        ];
        const seen = new Set();

        for (const selector of selectors) {
            const candidates = Array.from(document.querySelectorAll(selector));

            for (const candidate of candidates) {
                if (seen.has(candidate) || !isToolShareTextSourceVisible(candidate)) {
                    continue;
                }

                seen.add(candidate);

                const parts = collectToolShareMetaParts(candidate);
                const subtitle = parts.filter(function (part, index) {
                    return part !== '' && parts.indexOf(part) === index;
                }).join(' / ');

                if (subtitle !== '') {
                    return subtitle;
                }
            }
        }

        return '';
    }

    function getToolShareSubtitle(overlay, adapter) {
        if (adapter && typeof adapter.getSubtitle === 'function') {
            const adapterSubtitle = normalizeShareText(adapter.getSubtitle());

            if (adapterSubtitle !== '') {
                return adapterSubtitle;
            }
        }

        return normalizeShareText(overlay?.dataset.shareSubtitle)
            || getVisibleToolShareMetaSubtitle();
    }

    function getToolShareFileName(overlay, adapter) {
        const fileName = normalizeShareText(adapter?.fileName)
            || normalizeShareText(overlay?.dataset.shareFileName)
            || 'infrastack-share.png';

        return fileName.toLowerCase().endsWith('.png') ? fileName : fileName + '.png';
    }

    function escapeShareCssString(value) {
        if (window.CSS && typeof window.CSS.escape === 'function') {
            return window.CSS.escape(value);
        }

        return String(value || '').replace(/["\\]/g, '\\$&');
    }

    function getToolShareRoot(overlay) {
        const toolKey = normalizeShareText(overlay?.dataset.shareToolKey);
        const slug = toolKey.split('/').pop();
        const selectors = [];

        if (slug !== '') {
            const escapedSlug = escapeShareCssString(slug);

            selectors.push('[data-tool-slug="' + escapedSlug + '"]');
            selectors.push('.' + escapedSlug + '-tool');
        }

        selectors.push('[data-tool-slug]');
        selectors.push('.tool-box');

        for (const selector of selectors) {
            const root = document.querySelector(selector);

            if (root && root !== overlay && !overlay?.contains(root)) {
                return root;
            }
        }

        return document.querySelector('article.article') || document.body;
    }

    function isToolSharePreviewSvg(svg) {
        const stageCanvas = svg?.closest('.tool-stage-canvas, [id$="StageCanvas"]');

        if (!stageCanvas) {
            return false;
        }

        const className = getElementClassName(stageCanvas);

        return className.indexOf('stage-preview') !== -1;
    }

    function waitForToolShareFrame() {
        return new Promise(function (resolve) {
            if (typeof window.requestAnimationFrame !== 'function') {
                window.setTimeout(resolve, 80);
                return;
            }

            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(resolve);
            });
        });
    }

    function findGenericToolShareAction(overlay) {
        const root = getToolShareRoot(overlay);
        const selectors = [
            '[data-tool-share-generate]',
            'button[id$="Generate"]',
            'button[id$="PrimaryAction"]',
            'button[class*="action-btn-primary"]',
            '.tool-action-btn-primary',
        ];
        const seen = new Set();

        for (const selector of selectors) {
            const candidates = Array.from(root.querySelectorAll(selector));

            for (const candidate of candidates) {
                if (seen.has(candidate)) {
                    continue;
                }

                seen.add(candidate);

                const label = normalizeShareText(
                    candidate.getAttribute('aria-label') || candidate.textContent || ''
                );
                const canPrepare = /generate|prepare|build|render|draw|create/i.test(label)
                    || candidate.hasAttribute('data-tool-share-generate');

                if (
                    canPrepare &&
                    !candidate.disabled &&
                    isToolShareTextSourceVisible(candidate)
                ) {
                    return candidate;
                }
            }
        }

        return null;
    }

    async function ensureGenericToolShareReady(overlay) {
        const currentSvg = getVisibleSvgSnapshotElement();

        if (currentSvg && !isToolSharePreviewSvg(currentSvg)) {
            return;
        }

        const prepareAction = findGenericToolShareAction(overlay);

        if (!prepareAction) {
            return;
        }

        prepareAction.click();
        await waitForToolShareFrame();
    }

    function getShareActionLabel(action) {
        const ariaLabel = normalizeShareText(action?.getAttribute('aria-label'));

        if (ariaLabel === 'Share by email') {
            return {
                name: 'Email',
                buttonLabel: 'Open Email',
            };
        }

        if (ariaLabel === 'Copy article link') {
            return {
                name: 'Link',
                buttonLabel: 'Copy Snapshot Link',
            };
        }

        if (ariaLabel.indexOf('Share on ') === 0) {
            const name = ariaLabel.replace('Share on ', '').trim();

            return {
                name: name,
                buttonLabel: 'Continue to ' + name,
            };
        }

        return {
            name: 'Share',
            buttonLabel: 'Continue',
        };
    }

    function getShareActionContext(action) {
        if (!action || action.classList.contains('share-action-embed')) {
            return null;
        }

        const label = getShareActionLabel(action);
        const href = normalizeShareText(action.getAttribute('href'));
        const copyValue = normalizeShareText(action.dataset?.copyValue);

        if (href !== '') {
            return {
                type: 'link',
                href: href,
                label: label.name,
                buttonLabel: label.buttonLabel,
            };
        }

        if (copyValue !== '') {
            return {
                type: 'copy',
                value: copyValue,
                label: label.name,
                buttonLabel: label.buttonLabel,
            };
        }

        return null;
    }

    function requiresToolShareSnapshot(action) {
        return Boolean(action && (action.type === 'link' || action.type === 'copy'));
    }

    function getShareActionTone(action) {
        const label = action ? action.label : '';
        const tones = {
            X: {
                key: 'x',
                icon: 'bi-twitter-x',
            },
            Facebook: {
                key: 'facebook',
                icon: 'bi-facebook',
            },
            LinkedIn: {
                key: 'linkedin',
                icon: 'bi-linkedin',
            },
            WhatsApp: {
                key: 'whatsapp',
                icon: 'bi-whatsapp',
            },
            Telegram: {
                key: 'telegram',
                icon: 'bi-telegram',
            },
            Reddit: {
                key: 'reddit',
                icon: 'bi-reddit',
            },
            Email: {
                key: 'email',
                icon: 'bi-envelope',
            },
            Link: {
                key: 'link',
                icon: 'bi-link-45deg',
            },
        };

        return tones[label] || {
            key: 'share',
            icon: 'bi-arrow-up-right',
        };
    }

    function setButtonLabel(button, label) {
        const labelTarget = button?.querySelector('[data-button-label]') || button;

        if (labelTarget) {
            labelTarget.textContent = label;
        }
    }

    function syncContinueButtonTone(button, action) {
        if (!button) {
            return;
        }

        const icon = button.querySelector('i');
        const tone = getShareActionTone(action);

        button.dataset.shareTone = tone.key;

        if (icon) {
            icon.className = 'bi ' + tone.icon;
        }
    }

    function setToolShareStatus(elements, text, state) {
        if (!elements?.status) {
            return;
        }

        elements.status.textContent = text;
        elements.status.dataset.shareStatus = state || 'info';
    }

    function flashButton(button, label) {
        if (!button) {
            return;
        }

        const labelTarget = button.querySelector('[data-button-label]') || button;
        const originalLabel = labelTarget.textContent;

        labelTarget.textContent = label;
        button.classList.add('is-copied');

        window.setTimeout(function () {
            labelTarget.textContent = originalLabel;
            button.classList.remove('is-copied');
        }, 1400);
    }

    function createFileFromBlob(blob, fileName) {
        if (!blob || typeof File !== 'function') {
            return null;
        }

        return new File([blob], fileName, {
            type: 'image/png',
        });
    }

    function getNativeShareData(overlay, adapter, shareFile) {
        const shareUrl = toolShareState.snapshot?.snapshotUrl || getCanonicalShareUrl();
        const shareData = {
            files: [shareFile],
            title: getToolShareTitle(overlay, adapter),
            text: getToolShareSummary(overlay, adapter),
        };

        if (shareUrl !== '') {
            shareData.url = shareUrl;
        }

        return shareData;
    }

    function getSupportedNativeShareData(overlay, adapter, shareFile) {
        const shareData = getNativeShareData(overlay, adapter, shareFile);

        if (typeof navigator.canShare !== 'function') {
            return shareData;
        }

        if (navigator.canShare(shareData)) {
            return shareData;
        }

        const fallbackData = {
            files: shareData.files,
            title: shareData.title,
            text: shareData.url ? shareData.text + ' ' + shareData.url : shareData.text,
        };

        return navigator.canShare(fallbackData) ? fallbackData : null;
    }

    function canUseNativeShare(overlay, adapter) {
        const shareFile = createFileFromBlob(toolShareState.blob, getToolShareFileName(overlay, adapter));

        if (!shareFile || !navigator.share) {
            return false;
        }

        return typeof navigator.canShare === 'function'
            ? Boolean(getSupportedNativeShareData(overlay, adapter, shareFile))
            : true;
    }

    function canCopyShareImage() {
        return Boolean(
            toolShareState.blob &&
            navigator.clipboard &&
            typeof navigator.clipboard.write === 'function' &&
            typeof ClipboardItem === 'function'
        );
    }

    function getReadyShareStatusText() {
        const action = toolShareState.action;

        if (!action) {
            return 'Ready to share.';
        }

        if (requiresToolShareSnapshot(action) && toolShareState.snapshotPending) {
            return 'Saving snapshot link for social previews...';
        }

        if (requiresToolShareSnapshot(action) && !toolShareState.snapshot) {
            return 'Preview ready, but the snapshot link is not saved yet.';
        }

        if (requiresToolShareSnapshot(action)) {
            return 'Ready. Saved snapshot link will use this image.';
        }

        return 'Ready. ' + action.buttonLabel + ', or use the image actions.';
    }

    function syncToolShareButtons(elements) {
        if (!elements) {
            return;
        }

        const adapter = getToolShareAdapter(elements.overlay);
        const hasBlob = Boolean(toolShareState.blob);
        const snapshotRequired = requiresToolShareSnapshot(toolShareState.action);

        setButtonLabel(elements.continueButton, toolShareState.action ? toolShareState.action.buttonLabel : 'Continue');
        syncContinueButtonTone(elements.continueButton, toolShareState.action);

        if (elements.continueButton) {
            elements.continueButton.disabled = !hasBlob ||
                !toolShareState.action ||
                (snapshotRequired && (!toolShareState.snapshot || toolShareState.snapshotPending));
        }

        if (elements.nativeButton) {
            elements.nativeButton.disabled = !hasBlob || !canUseNativeShare(elements.overlay, adapter);
        }

        if (elements.copyImageButton) {
            elements.copyImageButton.disabled = !hasBlob || !canCopyShareImage();
        }

        if (elements.downloadButton) {
            elements.downloadButton.disabled = !hasBlob;
        }
    }

    function revokeToolSharePreviewUrl() {
        if (toolShareState.objectUrl !== '') {
            URL.revokeObjectURL(toolShareState.objectUrl);
            toolShareState.objectUrl = '';
        }
    }

    function resetToolShareSnapshot(elements) {
        toolShareState.snapshot = null;
        toolShareState.snapshotPending = false;
        toolShareState.snapshotRequestId += 1;

        if (elements?.overlay) {
            delete elements.overlay.dataset.snapshotUrl;
        }
    }

    function createCanvasBlob(canvas) {
        return new Promise(function (resolve, reject) {
            canvas.toBlob(function (blob) {
                if (blob) {
                    resolve(blob);
                    return;
                }

                reject(new Error('Canvas export failed.'));
            }, 'image/png');
        });
    }

    function loadImageFromUrl(sourceUrl) {
        return new Promise(function (resolve, reject) {
            const image = new Image();

            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject(new Error('Image rendering failed.'));
            };
            image.src = sourceUrl;
        });
    }

    function getVisibleSvgSnapshotElement() {
        const selectors = [
            '.tool-stage-canvas:not(.d-none) svg',
            '.tool-stage-canvas svg',
            '[id$="StageCanvas"] svg',
            '.tool-stage svg',
            'article.article .tool-box .tool-stage-canvas svg',
            'article.article .tool-box svg',
            '.tool-box svg',
            'article svg',
        ];

        for (const selector of selectors) {
            const matches = Array.from(document.querySelectorAll(selector));
            const svg = matches.find(function (candidate) {
                const rect = candidate.getBoundingClientRect();

                return rect.width > 10 && rect.height > 10;
            });

            if (svg) {
                return svg;
            }
        }

        return null;
    }

    function getSvgSnapshotSize(svg) {
        const rect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox?.baseVal;
        const widthAttribute = Number.parseFloat(svg.getAttribute('width') || '');
        const heightAttribute = Number.parseFloat(svg.getAttribute('height') || '');
        const width = Math.max(1, Math.round(viewBox?.width || widthAttribute || rect.width || 1200));
        const height = Math.max(1, Math.round(viewBox?.height || heightAttribute || rect.height || 800));
        const maxSide = 1800;
        const minSide = 1200;
        const longestSide = Math.max(width, height);
        const scale = Math.min(maxSide / longestSide, Math.max(1, minSide / longestSide));

        return {
            width: Math.round(width * scale),
            height: Math.round(height * scale),
            sourceWidth: width,
            sourceHeight: height,
        };
    }

    function blobToDataUrl(blob) {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();

            reader.onload = function () {
                resolve(String(reader.result || ''));
            };
            reader.onerror = function () {
                reject(new Error('Failed to inline SVG image asset.'));
            };
            reader.readAsDataURL(blob);
        });
    }

    async function inlineSvgImageReferences(svg) {
        const imageElements = Array.from(svg.querySelectorAll('image'));

        await Promise.all(imageElements.map(async function (imageElement) {
            const href = imageElement.getAttribute('href')
                || imageElement.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
                || '';

            if (href === '' || href.indexOf('data:') === 0) {
                return;
            }

            try {
                const imageUrl = new URL(href, window.location.href);
                const response = await fetch(imageUrl.toString(), {
                    credentials: 'same-origin',
                });

                if (!response.ok) {
                    return;
                }

                const dataUrl = await blobToDataUrl(await response.blob());

                imageElement.setAttribute('href', dataUrl);
                imageElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataUrl);
            } catch (error) {
                imageElement.removeAttribute('href');
                imageElement.removeAttributeNS('http://www.w3.org/1999/xlink', 'href');
            }
        }));
    }

    function createSvgNode(tagName) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }

    const shareSvgPresentationProperties = [
        'fill',
        'fill-opacity',
        'stroke',
        'stroke-opacity',
        'stroke-width',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-dasharray',
        'stroke-dashoffset',
        'opacity',
        'display',
        'visibility',
        'color',
        'font-family',
        'font-size',
        'font-style',
        'font-weight',
        'letter-spacing',
        'text-anchor',
        'dominant-baseline',
        'paint-order',
        'filter',
    ];

    function inlineComputedSvgStyles(sourceSvg, cloneSvg) {
        const sourceElements = [sourceSvg].concat(Array.from(sourceSvg.querySelectorAll('*')));
        const cloneElements = [cloneSvg].concat(Array.from(cloneSvg.querySelectorAll('*')));

        sourceElements.forEach(function (sourceElement, index) {
            const cloneElement = cloneElements[index];

            if (!cloneElement || typeof window.getComputedStyle !== 'function') {
                return;
            }

            const computedStyle = window.getComputedStyle(sourceElement);

            shareSvgPresentationProperties.forEach(function (property) {
                const value = computedStyle.getPropertyValue(property);

                if (value) {
                    cloneElement.style.setProperty(property, value);
                }
            });
        });
    }

    function parseSvgNumber(value, fallback) {
        const parsed = Number.parseFloat(value || '');

        return Number.isFinite(parsed) ? parsed : fallback;
    }

    function getElementClassName(element) {
        return typeof element.className === 'string'
            ? element.className
            : String(element.getAttribute('class') || '');
    }

    function getForeignObjectText(foreignObject, classNeedle, excludedNeedle) {
        const match = Array.from(foreignObject.querySelectorAll('*')).find(function (element) {
            const className = getElementClassName(element);

            return className.indexOf(classNeedle) !== -1
                && (excludedNeedle === '' || className.indexOf(excludedNeedle) === -1);
        });

        return normalizeShareText(match?.textContent || '');
    }

    function appendSvgTextLines(parent, text, x, y, maxWidth, fontSize, fontWeight, color, maxLines) {
        const words = normalizeShareText(text).split(' ').filter(Boolean);
        const maxCharacters = Math.max(8, Math.floor(maxWidth / (fontSize * 0.56)));
        const lines = [];
        let currentLine = '';

        words.forEach(function (word) {
            const nextLine = currentLine === '' ? word : currentLine + ' ' + word;

            if (nextLine.length <= maxCharacters || currentLine === '') {
                currentLine = nextLine;
                return;
            }

            lines.push(currentLine);
            currentLine = word;
        });

        if (currentLine !== '') {
            lines.push(currentLine);
        }

        const textNode = createSvgNode('text');

        textNode.setAttribute('x', String(x));
        textNode.setAttribute('y', String(y));
        textNode.setAttribute('fill', color);
        textNode.setAttribute('font-family', 'Inter, Arial, sans-serif');
        textNode.setAttribute('font-size', String(fontSize));
        textNode.setAttribute('font-weight', String(fontWeight));

        lines.slice(0, maxLines).forEach(function (line, index) {
            const tspan = createSvgNode('tspan');
            const visibleLine = index === maxLines - 1 && lines.length > maxLines && line.length > 3
                ? line.slice(0, Math.max(1, maxCharacters - 1)) + '...'
                : line;

            tspan.setAttribute('x', String(x));
            tspan.setAttribute('dy', index === 0 ? '0' : String(Math.round(fontSize * 1.24)));
            tspan.textContent = visibleLine;
            textNode.appendChild(tspan);
        });

        parent.appendChild(textNode);
    }

    function replaceSvgForeignObjects(svg) {
        Array.from(svg.querySelectorAll('foreignObject')).forEach(function (foreignObject) {
            const x = parseSvgNumber(foreignObject.getAttribute('x'), 0);
            const y = parseSvgNumber(foreignObject.getAttribute('y'), 0);
            const width = parseSvgNumber(foreignObject.getAttribute('width'), 160);
            const height = parseSvgNumber(foreignObject.getAttribute('height'), 72);
            const title = getForeignObjectText(foreignObject, 'node-title', 'subtitle')
                || getForeignObjectText(foreignObject, 'card-title', 'subtitle')
                || normalizeShareText(foreignObject.textContent).slice(0, 80);
            const subtitle = getForeignObjectText(foreignObject, 'node-subtitle', '')
                || getForeignObjectText(foreignObject, 'card-subtitle', '');
            const group = createSvgNode('g');
            const transform = foreignObject.getAttribute('transform') || '';
            const rect = createSvgNode('rect');
            const icon = createSvgNode('rect');
            const iconMark = createSvgNode('path');
            const textX = width > 118 ? x + 54 : x + 14;

            if (transform !== '') {
                group.setAttribute('transform', transform);
            }

            rect.setAttribute('x', String(x));
            rect.setAttribute('y', String(y));
            rect.setAttribute('width', String(width));
            rect.setAttribute('height', String(height));
            rect.setAttribute('rx', '10');
            rect.setAttribute('fill', '#ffffff');
            rect.setAttribute('stroke', '#bfdbfe');
            rect.setAttribute('stroke-width', '1.4');
            group.appendChild(rect);

            if (width > 118 && height > 52) {
                icon.setAttribute('x', String(x + 14));
                icon.setAttribute('y', String(y + 16));
                icon.setAttribute('width', '28');
                icon.setAttribute('height', '28');
                icon.setAttribute('rx', '8');
                icon.setAttribute('fill', '#ecfeff');
                icon.setAttribute('stroke', '#bae6fd');
                group.appendChild(icon);

                iconMark.setAttribute('d', 'M' + (x + 21) + ' ' + (y + 32) + 'h14');
                iconMark.setAttribute('stroke', '#0891b2');
                iconMark.setAttribute('stroke-width', '4');
                iconMark.setAttribute('stroke-linecap', 'round');
                group.appendChild(iconMark);
            }

            appendSvgTextLines(group, title, textX, y + 27, Math.max(24, width - (textX - x) - 12), 12, 800, '#0f172a', 2);

            if (subtitle !== '') {
                appendSvgTextLines(group, subtitle, textX, y + Math.min(height - 18, 51), Math.max(24, width - (textX - x) - 12), 10, 650, '#475569', 1);
            }

            foreignObject.parentNode.insertBefore(group, foreignObject);
            foreignObject.remove();
        });
    }

    function drawShareGridBackground(context, width, height) {
        const background = context.createLinearGradient(0, 0, width, height);

        background.addColorStop(0, '#ffffff');
        background.addColorStop(0.58, '#f8fafc');
        background.addColorStop(1, '#ffffff');
        context.fillStyle = background;
        context.fillRect(0, 0, width, height);
        context.fillStyle = 'rgba(148, 163, 184, 0.18)';

        for (let x = 0; x < width; x += 26) {
            context.fillRect(x, 0, 1, height);
        }

        context.fillStyle = 'rgba(148, 163, 184, 0.14)';

        for (let y = 0; y < height; y += 26) {
            context.fillRect(0, y, width, 1);
        }
    }

    function roundedCanvasRect(context, x, y, width, height, radius) {
        const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));

        context.beginPath();
        context.moveTo(x + safeRadius, y);
        context.lineTo(x + width - safeRadius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
        context.lineTo(x + width, y + height - safeRadius);
        context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
        context.lineTo(x + safeRadius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
        context.lineTo(x, y + safeRadius);
        context.quadraticCurveTo(x, y, x + safeRadius, y);
        context.closePath();
    }

    function drawFittedCanvasTitle(context, text, x, y, maxWidth) {
        const title = normalizeShareText(text);
        let fontSize = 34;

        while (fontSize > 22) {
            context.font = '800 ' + fontSize + 'px Inter, Arial, sans-serif';

            if (context.measureText(title).width <= maxWidth) {
                break;
            }

            fontSize -= 1;
        }

        context.fillStyle = '#17324d';
        context.font = '800 ' + fontSize + 'px Inter, Arial, sans-serif';
        context.fillText(title, x, y);
    }

    function drawFittedCanvasSubtitle(context, text, x, y, maxWidth) {
        const subtitle = normalizeShareText(text);
        let fontSize = 18;

        if (subtitle === '') {
            return;
        }

        while (fontSize > 13) {
            context.font = '700 ' + fontSize + 'px Inter, Arial, sans-serif';

            if (context.measureText(subtitle).width <= maxWidth) {
                break;
            }

            fontSize -= 1;
        }

        context.fillStyle = '#475569';
        context.font = '700 ' + fontSize + 'px Inter, Arial, sans-serif';
        context.fillText(subtitle, x, y);
    }

    function fillShareBrandMarkLayer(context, points, fillStyle) {
        context.beginPath();
        context.moveTo(points[0][0], points[0][1]);
        points.slice(1).forEach(function (point) {
            context.lineTo(point[0], point[1]);
        });
        context.closePath();
        context.fillStyle = fillStyle;
        context.fill();
    }

    function drawShareBrandMark(context, x, y, size) {
        const scale = size / 48;

        context.save();
        context.translate(x, y);
        context.scale(scale, scale);
        fillShareBrandMarkLayer(context, [[6, 32], [24, 40], [42, 32], [42, 28], [24, 36], [6, 28]], '#2563eb');
        fillShareBrandMarkLayer(context, [[6, 24], [24, 32], [42, 24], [42, 20], [24, 28], [6, 20]], '#3b82f6');
        fillShareBrandMarkLayer(context, [[6, 16], [24, 24], [42, 16], [42, 12], [24, 20], [6, 12]], '#f97316');
        fillShareBrandMarkLayer(context, [[24, 4], [42, 12], [24, 20], [6, 12]], '#fb923c');
        context.globalAlpha = 0.5;
        fillShareBrandMarkLayer(context, [[24, 4], [42, 12], [42, 16], [24, 24], [24, 20]], '#fdba74');
        context.restore();
    }

    function drawShareCanvasFooter(context, canvas, sidePadding) {
        const footerBaseline = canvas.height - 32;
        const brandMarkSize = 22;

        drawShareBrandMark(context, sidePadding, footerBaseline - brandMarkSize + 3, brandMarkSize);
        context.font = '600 18px Inter, Arial, sans-serif';
        context.fillStyle = '#17324d';
        context.textAlign = 'left';
        context.fillText('InfraStack', sidePadding + brandMarkSize + 8, footerBaseline);
        context.font = '500 16px Inter, Arial, sans-serif';
        context.fillStyle = '#64748b';
        context.textAlign = 'right';
        context.fillText('Static PNG snapshot. Use JSON to preserve editable state.', canvas.width - sidePadding, footerBaseline);
        context.textAlign = 'left';
    }

    function truncateShareLine(text, maxLength) {
        const normalized = normalizeShareText(text);

        if (normalized.length <= maxLength) {
            return normalized;
        }

        return normalized.slice(0, Math.max(1, maxLength - 3)).trim() + '...';
    }

    function collectGenericTextShareLines(overlay, adapter) {
        const root = getToolShareRoot(overlay);
        const selectors = [
            '[data-share-snapshot-source]',
            '[id$="Summary"]',
            '[class*="surface-state"]',
            '[class*="preview-rows"] li',
            '[class*="result-metric-card"]',
            '[class*="output-note"]',
        ];
        const lines = [];

        selectors.forEach(function (selector) {
            Array.from(root.querySelectorAll(selector)).forEach(function (candidate) {
                if (!isToolShareTextSourceVisible(candidate)) {
                    return;
                }

                const text = truncateShareLine(candidate.textContent, 140);

                if (text !== '' && !lines.includes(text)) {
                    lines.push(text);
                }
            });
        });

        if (lines.length === 0) {
            const summary = getToolShareSummary(overlay, adapter);

            if (summary !== '') {
                lines.push(truncateShareLine(summary, 140));
            }
        }

        return lines.slice(0, 8);
    }

    function drawWrappedShareText(context, text, x, y, maxWidth, lineHeight, maxLines) {
        const words = normalizeShareText(text).split(' ').filter(Boolean);
        const lines = [];
        let currentLine = '';

        words.forEach(function (word) {
            const nextLine = currentLine === '' ? word : currentLine + ' ' + word;

            if (context.measureText(nextLine).width <= maxWidth || currentLine === '') {
                currentLine = nextLine;
                return;
            }

            lines.push(currentLine);
            currentLine = word;
        });

        if (currentLine !== '') {
            lines.push(currentLine);
        }

        lines.slice(0, maxLines).forEach(function (line, index) {
            const visibleLine = index === maxLines - 1 && lines.length > maxLines
                ? truncateShareLine(line, Math.max(12, Math.floor(maxWidth / 8)))
                : line;

            context.fillText(visibleLine, x, y + (index * lineHeight));
        });
    }

    async function createGenericTextShareBlob(overlay, adapter) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const sidePadding = 56;
        const title = getToolShareTitle(overlay, adapter);
        const subtitle = getToolShareSubtitle(overlay, adapter);
        const lines = collectGenericTextShareLines(overlay, adapter);
        const cardHeight = 58;
        const lineGap = 12;
        const topContent = subtitle === '' ? 118 : 146;
        const contentHeight = Math.max(240, lines.length * (cardHeight + lineGap));

        if (!context) {
            throw new Error('Canvas rendering is not available.');
        }

        canvas.width = 1200;
        canvas.height = Math.min(900, topContent + contentHeight + 104);
        drawShareGridBackground(context, canvas.width, canvas.height);
        drawFittedCanvasTitle(context, title, sidePadding, 74, canvas.width - (sidePadding * 2));
        drawFittedCanvasSubtitle(context, subtitle, sidePadding, 106, canvas.width - (sidePadding * 2));

        context.font = '700 19px Roboto, Arial, sans-serif';
        context.fillStyle = '#17324d';

        lines.forEach(function (line, index) {
            const cardY = topContent + (index * (cardHeight + lineGap));

            roundedCanvasRect(context, sidePadding, cardY, canvas.width - (sidePadding * 2), cardHeight, 16);
            context.fillStyle = '#ffffff';
            context.fill();
            context.strokeStyle = 'rgba(203, 213, 225, 0.92)';
            context.lineWidth = 1.5;
            context.stroke();
            context.fillStyle = '#17324d';
            drawWrappedShareText(
                context,
                line,
                sidePadding + 24,
                cardY + 25,
                canvas.width - (sidePadding * 2) - 48,
                22,
                2
            );
        });

        drawShareCanvasFooter(context, canvas, sidePadding);

        return createCanvasBlob(canvas);
    }

    function getShareSnapshotSourceByKind(root, kind) {
        if (!root || kind === '') {
            return null;
        }

        return root.querySelector('[data-share-snapshot-source][data-share-kind="' + kind + '"], [data-share-kind="' + kind + '"]');
    }

    function hasCalculateShareSources(overlay) {
        const root = getToolShareRoot(overlay);

        return Boolean(
            getShareSnapshotSourceByKind(root, 'estimate-summary')
            && getShareSnapshotSourceByKind(root, 'cost-table')
        );
    }

    function isCalculateShareReady(root) {
        const summary = getShareSnapshotSourceByKind(root, 'estimate-summary');
        const costTable = getShareSnapshotSourceByKind(root, 'cost-table');
        const hasSummary = normalizeShareText(summary?.textContent || '') !== '';
        const hasCostRows = Boolean(costTable?.querySelector('tbody tr'));

        return hasSummary && hasCostRows;
    }

    function waitForCalculateShareReady(root) {
        return new Promise(function (resolve) {
            let attempt = 0;

            function tick() {
                if (isCalculateShareReady(root) || attempt >= 24) {
                    resolve();
                    return;
                }

                attempt += 1;
                window.setTimeout(tick, 50);
            }

            tick();
        });
    }

    async function ensureCalculateShareReady(overlay) {
        const root = getToolShareRoot(overlay);

        if (isCalculateShareReady(root)) {
            return;
        }

        const prepareAction = findGenericToolShareAction(overlay);

        if (prepareAction) {
            prepareAction.click();
        }

        await waitForToolShareFrame();
        await waitForCalculateShareReady(root);
    }

    function getFirstCalculateShareText(parent, selectors) {
        for (const selector of selectors) {
            const element = parent?.querySelector(selector);
            const text = normalizeShareText(element?.textContent || '');

            if (text !== '') {
                return text;
            }
        }

        return '';
    }

    function getCalculateShareInputValue(root) {
        const input = root?.querySelector('input[id^="calculateCost"][id$="Label"]:not([type="hidden"])');
        const value = normalizeShareText(input?.value || '');

        if (value !== '') {
            return value;
        }

        return getFirstCalculateShareText(root, [
            '[id$="PresetSummary"]',
            '[class*="preset-summary"]',
        ]);
    }

    function getCalculatePrimaryShareMetric(summary) {
        const card = summary?.querySelector('[class*="result-card-primary"], [data-result-visual]');
        const value = getFirstCalculateShareText(card, [
            '[class*="result-ring-value"]',
            '[class*="result-primary-number"]',
            '[class*="result-primary-metric"]',
            '[class*="result-primary-text"]',
        ]);
        const unit = getFirstCalculateShareText(card, [
            '[class*="result-ring-unit"]',
            '[class*="result-primary-unit"]',
        ]);
        const label = getFirstCalculateShareText(card, [
            '[class*="result-title-center"]',
            '[class*="result-title"]',
            '[class*="result-kicker"]',
        ]) || 'Estimated run rate';
        const copy = getFirstCalculateShareText(card, [
            '[class*="result-copy"]',
        ]);

        return {
            label: label,
            value: value,
            unit: unit,
            copy: copy,
        };
    }

    function collectCalculateMetricCards(summary) {
        return Array.from(summary?.querySelectorAll('[class*="result-metric-card"]') || []).map(function (card) {
            return {
                label: getFirstCalculateShareText(card, ['[class*="result-metric-label"]']),
                value: getFirstCalculateShareText(card, ['[class*="result-metric-value"]']),
                copy: getFirstCalculateShareText(card, ['[class*="result-metric-copy"]']),
            };
        }).filter(function (metric) {
            return metric.label !== '' || metric.value !== '';
        }).slice(0, 4);
    }

    function collectCalculateShareChips(summary, root) {
        const chips = [];
        const scenarioLabel = getCalculateShareInputValue(root);

        if (scenarioLabel !== '') {
            chips.push(scenarioLabel);
        }

        Array.from(summary?.querySelectorAll('[class*="result-chip-grid"] [class*="result-chip"], [class*="result-chip-row"] [class*="result-chip"]') || []).forEach(function (chip) {
            const text = truncateShareLine(chip.textContent, 54);

            if (text !== '' && !chips.includes(text)) {
                chips.push(text);
            }
        });

        return chips.slice(0, 6);
    }

    function getCalculateTableTitle(table) {
        return getFirstCalculateShareText(table?.closest('[class*="section-card"]'), [
            '[class*="section-title"]',
            'h3',
        ]) || 'Cost Table';
    }

    function getCalculateTableCellText(cell) {
        const clone = cell.cloneNode(true);

        clone.querySelectorAll('button, [aria-hidden="true"]').forEach(function (element) {
            element.remove();
        });

        return normalizeShareText(clone.textContent || '');
    }

    function collectCalculateCostRows(table) {
        const bodies = Array.from(table?.tBodies || []);
        const rows = bodies.flatMap(function (body) {
            return Array.from(body.querySelectorAll('tr'));
        });

        return rows.map(function (row) {
            const cells = Array.from(row.cells || []).map(getCalculateTableCellText);

            if (/^\d+$/.test(cells[0] || '')) {
                cells.shift();
            }

            return {
                service: cells[0] || '',
                monthly: cells[1] || '',
                annual: cells[2] || '',
                share: cells[3] || '',
                signal: cells[4] || '',
            };
        }).filter(function (row) {
            return row.service !== '';
        }).slice(0, 6);
    }

    function fitShareCanvasText(context, text, maxWidth) {
        const normalized = normalizeShareText(text);

        if (normalized === '' || context.measureText(normalized).width <= maxWidth) {
            return normalized;
        }

        let candidate = normalized;

        while (candidate.length > 4) {
            candidate = candidate.slice(0, -1).trim();

            if (context.measureText(candidate + '...').width <= maxWidth) {
                return candidate + '...';
            }
        }

        return '...';
    }

    function drawSingleLineShareText(context, text, x, y, maxWidth) {
        context.fillText(fitShareCanvasText(context, text, maxWidth), x, y);
    }

    function drawCalculateShareMetricCard(context, metric, x, y, width, height, index) {
        const accents = ['#14b8a6', '#2563eb', '#7c3aed', '#f97316'];

        roundedCanvasRect(context, x, y, width, height, 16);
        context.fillStyle = '#ffffff';
        context.fill();
        context.strokeStyle = 'rgba(203, 213, 225, 0.92)';
        context.lineWidth = 1.5;
        context.stroke();
        context.fillStyle = accents[index % accents.length];
        roundedCanvasRect(context, x + 16, y + 16, 7, height - 32, 4);
        context.fill();
        context.textAlign = 'left';
        context.font = '700 14px Roboto, Arial, sans-serif';
        context.fillStyle = '#64748b';
        drawSingleLineShareText(context, metric.label || 'Metric', x + 36, y + 31, width - 58);
        context.font = '800 27px Nunito, Roboto, Arial, sans-serif';
        context.fillStyle = '#17324d';
        drawSingleLineShareText(context, metric.value || '-', x + 36, y + 72, width - 58);
    }

    function drawCalculateShareChipRow(context, chips, x, y, maxWidth) {
        let cursorX = x;
        const maxY = y + 42;

        context.font = '700 14px Roboto, Arial, sans-serif';
        chips.forEach(function (chip) {
            if (cursorX >= x + maxWidth) {
                return;
            }

            const chipText = truncateShareLine(chip, 44);
            const chipWidth = Math.min(maxWidth, Math.ceil(context.measureText(chipText).width) + 34);

            if (cursorX + chipWidth > x + maxWidth) {
                return;
            }

            roundedCanvasRect(context, cursorX, y, chipWidth, 34, 17);
            context.fillStyle = '#eff6ff';
            context.fill();
            context.strokeStyle = '#bfdbfe';
            context.lineWidth = 1.2;
            context.stroke();
            context.fillStyle = '#17324d';
            drawSingleLineShareText(context, chipText, cursorX + 17, y + 22, chipWidth - 34);
            cursorX += chipWidth + 10;
        });

        if (cursorX === x) {
            context.fillStyle = '#64748b';
            context.fillText('Estimate summary', x, maxY - 14);
        }
    }

    function drawCalculateShareCostTable(context, tableTitle, rows, x, y, width, height) {
        const columns = [
            { key: 'service', label: 'Service', width: 310, align: 'left' },
            { key: 'monthly', label: 'Monthly', width: 156, align: 'right' },
            { key: 'annual', label: 'Annual', width: 156, align: 'right' },
            { key: 'share', label: 'Share', width: 150, align: 'right' },
            { key: 'signal', label: 'Signal', width: 212, align: 'left' },
        ];
        const rowHeight = 42;
        const headerHeight = 46;
        const tablePadding = 24;
        const tableTop = y + headerHeight;
        const leftTextInset = 22;
        const rightTextInset = 22;

        roundedCanvasRect(context, x, y, width, height, 18);
        context.fillStyle = '#ffffff';
        context.fill();
        context.strokeStyle = 'rgba(203, 213, 225, 0.95)';
        context.lineWidth = 1.5;
        context.stroke();
        context.font = '800 21px Nunito, Roboto, Arial, sans-serif';
        context.fillStyle = '#17324d';
        drawSingleLineShareText(context, tableTitle, x + tablePadding, y + 31, width - (tablePadding * 2));
        context.fillStyle = '#f8fafc';
        context.fillRect(x + 1, tableTop, width - 2, rowHeight);
        context.strokeStyle = '#e2e8f0';
        context.beginPath();
        context.moveTo(x + 1, tableTop + rowHeight);
        context.lineTo(x + width - 1, tableTop + rowHeight);
        context.stroke();

        let cursorX = x + tablePadding;

        context.font = '800 13px Roboto, Arial, sans-serif';
        context.fillStyle = '#475569';
        columns.forEach(function (column) {
            const textX = column.align === 'right'
                ? cursorX + column.width - rightTextInset
                : cursorX + (column.key === 'service' ? 0 : leftTextInset);

            context.textAlign = column.align;
            drawSingleLineShareText(
                context,
                column.label,
                textX,
                tableTop + 27,
                column.width - (rightTextInset * 2)
            );
            cursorX += column.width;
        });

        const visibleRows = rows.length > 0 ? rows : [{
            service: 'No cost rows captured',
            monthly: '-',
            annual: '-',
            share: '-',
            signal: 'Build estimate first',
        }];

        visibleRows.forEach(function (row, rowIndex) {
            const rowY = tableTop + rowHeight + (rowIndex * rowHeight);

            if (rowY + rowHeight > y + height - 10) {
                return;
            }

            if (rowIndex % 2 === 1) {
                context.fillStyle = '#fbfdff';
                context.fillRect(x + 1, rowY, width - 2, rowHeight);
            }

            context.strokeStyle = '#edf2f7';
            context.beginPath();
            context.moveTo(x + 1, rowY + rowHeight);
            context.lineTo(x + width - 1, rowY + rowHeight);
            context.stroke();
            cursorX = x + tablePadding;
            context.font = '700 14px Roboto, Arial, sans-serif';
            context.fillStyle = '#17324d';
            columns.forEach(function (column) {
                const value = row[column.key] || '-';
                const textX = column.align === 'right'
                    ? cursorX + column.width - rightTextInset
                    : cursorX + (column.key === 'service' ? 0 : leftTextInset);

                context.textAlign = column.align;
                drawSingleLineShareText(
                    context,
                    value,
                    textX,
                    rowY + 27,
                    column.width - rightTextInset - leftTextInset
                );
                cursorX += column.width;
            });
        });

        context.textAlign = 'left';
    }

    async function createCalculateShareBlob(overlay, adapter) {
        await ensureCalculateShareReady(overlay);

        const root = getToolShareRoot(overlay);
        const summary = getShareSnapshotSourceByKind(root, 'estimate-summary');
        const costTable = getShareSnapshotSourceByKind(root, 'cost-table');
        const primary = getCalculatePrimaryShareMetric(summary);
        const metrics = collectCalculateMetricCards(summary);
        const chips = collectCalculateShareChips(summary, root);
        const rows = collectCalculateCostRows(costTable);
        const title = getToolShareTitle(overlay, adapter);
        const summarySubtitle = getFirstCalculateShareText(summary, [
            '[class*="result-header-copy"] p',
            '[class*="result-summary-copy"] p',
        ]);
        const subtitle = summarySubtitle || getToolShareSummary(overlay, adapter);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const sidePadding = 56;

        if (!context) {
            throw new Error('Canvas rendering is not available.');
        }

        canvas.width = 1200;
        canvas.height = 900;
        drawShareGridBackground(context, canvas.width, canvas.height);
        drawFittedCanvasTitle(context, title, sidePadding, 78, canvas.width - (sidePadding * 2));
        drawFittedCanvasSubtitle(context, subtitle, sidePadding, 110, canvas.width - (sidePadding * 2));

        roundedCanvasRect(context, sidePadding, 142, 474, 214, 18);
        context.fillStyle = '#ffffff';
        context.fill();
        context.strokeStyle = 'rgba(203, 213, 225, 0.95)';
        context.lineWidth = 1.5;
        context.stroke();
        context.font = '800 15px Roboto, Arial, sans-serif';
        context.fillStyle = '#64748b';
        drawSingleLineShareText(context, primary.label, sidePadding + 26, 176, 420);
        context.font = '900 47px Nunito, Roboto, Arial, sans-serif';
        context.fillStyle = '#17324d';
        drawSingleLineShareText(context, primary.value || '-', sidePadding + 26, 236, 420);
        context.font = '800 16px Roboto, Arial, sans-serif';
        context.fillStyle = '#2563eb';
        drawSingleLineShareText(context, primary.unit || 'Monthly', sidePadding + 28, 268, 140);
        context.font = '500 14px Roboto, Arial, sans-serif';
        context.fillStyle = '#64748b';
        drawWrappedShareText(context, primary.copy, sidePadding + 26, 306, 410, 18, 2);

        const metricX = 548;
        const metricY = 142;
        const metricWidth = 290;
        const metricHeight = 99;
        const metricGap = 16;
        const filledMetrics = metrics.length > 0 ? metrics : [{
            label: 'Estimate',
            value: primary.value || '-',
            copy: primary.copy || 'Current modeled result.',
        }];

        filledMetrics.slice(0, 4).forEach(function (metric, index) {
            drawCalculateShareMetricCard(
                context,
                metric,
                metricX + ((index % 2) * (metricWidth + metricGap)),
                metricY + (Math.floor(index / 2) * (metricHeight + metricGap)),
                metricWidth,
                metricHeight,
                index
            );
        });

        drawCalculateShareChipRow(context, chips, sidePadding, 382, canvas.width - (sidePadding * 2));
        drawCalculateShareCostTable(
            context,
            getCalculateTableTitle(costTable),
            rows,
            sidePadding,
            432,
            canvas.width - (sidePadding * 2),
            330
        );
        drawShareCanvasFooter(context, canvas, sidePadding);

        return createCanvasBlob(canvas);
    }

    function hasScanningShareSources(overlay) {
        const root = getToolShareRoot(overlay);

        return Boolean(
            getShareSnapshotSourceByKind(root, 'scan-summary')
            && getShareSnapshotSourceByKind(root, 'severity-table')
        );
    }

    function isScanningShareReady(root) {
        const summary = getShareSnapshotSourceByKind(root, 'scan-summary');
        const findings = getShareSnapshotSourceByKind(root, 'severity-table');
        const hasSummary = normalizeShareText(summary?.textContent || '') !== '';
        const hasRows = Boolean(
            findings?.querySelector('tbody tr, [class*="finding"], li')
        );

        return hasSummary && hasRows;
    }

    function waitForScanningShareReady(root) {
        return new Promise(function (resolve) {
            let attempt = 0;

            function tick() {
                if (isScanningShareReady(root) || attempt >= 50) {
                    resolve();
                    return;
                }

                attempt += 1;
                window.setTimeout(tick, 80);
            }

            tick();
        });
    }

    async function ensureScanningShareReady(overlay) {
        const root = getToolShareRoot(overlay);

        if (isScanningShareReady(root)) {
            return;
        }

        const prepareAction = findGenericToolShareAction(overlay);

        if (prepareAction) {
            prepareAction.click();
        }

        await waitForToolShareFrame();
        await waitForScanningShareReady(root);
    }

    function getScanningPrimaryShareMetric(summary) {
        const visualCard = summary?.querySelector('[class*="result-card-visual"], [class*="visual-contract-primary"]');
        const mainCard = summary?.querySelector('[class*="result-card-main"], [class*="visual-contract-model"]');
        const value = getFirstCalculateShareText(visualCard, [
            '[class*="score-value"]',
            '[class*="ring-value"]',
            '[id$="VisualScore"]',
            'strong',
        ]);
        const unit = getFirstCalculateShareText(visualCard, [
            '[class*="score-denominator"]',
            '[class*="ring-unit"]',
            'small',
        ]);
        const label = getFirstCalculateShareText(visualCard, [
            '[class*="result-title-center"]',
            '[class*="visual-contract-kicker"]',
            '[class*="result-title"]',
        ]) || getFirstCalculateShareText(mainCard, [
            '[class*="result-title"]',
            '[class*="visual-contract-title"]',
            'h2',
            'h3',
        ]) || 'Scan summary';
        const copy = getFirstCalculateShareText(visualCard, [
            '[class*="result-copy"]',
            '[class*="visual-contract-note"]',
            'p',
        ]) || getFirstCalculateShareText(mainCard, [
            '[class*="result-copy"]',
            '[class*="visual-contract-copy"]',
            'p',
        ]);

        return {
            label: label,
            value: value || getFirstCalculateShareText(summary, ['[id$="PrimaryValue"]', 'strong']) || '-',
            unit: unit,
            copy: copy,
        };
    }

    function collectScanningMetricCards(summary) {
        return Array.from(summary?.querySelectorAll('[class*="result-metric-card"], [class*="visual-contract-metric"]') || []).map(function (card) {
            return {
                label: getFirstCalculateShareText(card, [
                    '[class*="result-metric-label"]',
                    'span',
                ]),
                value: getFirstCalculateShareText(card, [
                    '[class*="result-metric-value"]',
                    'strong',
                ]),
                copy: getFirstCalculateShareText(card, [
                    '[class*="result-metric-copy"]',
                    'small',
                ]),
            };
        }).filter(function (metric) {
            return metric.label !== '' || metric.value !== '';
        }).slice(0, 4);
    }

    function collectScanningShareChips(summary) {
        const chips = [];

        Array.from(summary?.querySelectorAll('[class*="result-chip"], [class*="visual-contract-chip"], [class*="surface-state"] span') || []).forEach(function (chip) {
            const text = truncateShareLine(chip.textContent, 58);

            if (text !== '' && !chips.includes(text)) {
                chips.push(text);
            }
        });

        return chips.slice(0, 6);
    }

    function normalizeScanningSeverity(value) {
        const normalized = normalizeShareText(value).toLowerCase();

        if (/critical|danger|fail|high/.test(normalized)) {
            return 'High';
        }

        if (/warn|medium|review/.test(normalized)) {
            return 'Medium';
        }

        if (/low|draft/.test(normalized)) {
            return 'Low';
        }

        if (/pass|info|ok|ready/.test(normalized)) {
            return 'Info';
        }

        return normalizeShareText(value) || 'Info';
    }

    function collectScanningRowsFromTable(table) {
        return Array.from(table?.querySelectorAll('tbody tr') || []).map(function (row) {
            const cells = Array.from(row.cells || []);
            const dataCells = /^\d+$/.test(getCalculateTableCellText(cells[0] || row) || '')
                ? cells.slice(1)
                : cells;
            const controlCell = dataCells[1] || dataCells[0] || row;
            const severityText = normalizeShareText(controlCell.querySelector?.('.text-muted')?.textContent || '');

            return {
                severity: normalizeScanningSeverity(severityText || getCalculateTableCellText(dataCells[2] || controlCell)),
                category: getCalculateTableCellText(dataCells[0] || row),
                control: getFirstCalculateShareText(controlCell, ['strong']) || getCalculateTableCellText(controlCell),
                status: getCalculateTableCellText(dataCells[2] || row),
                evidence: getCalculateTableCellText(dataCells[3] || row),
            };
        }).filter(function (row) {
            return row.control !== '' || row.evidence !== '';
        });
    }

    function collectScanningRowsFromVisual(findings) {
        const visualRows = Array.from(findings?.querySelectorAll('[class*="finding"], li') || []);

        return visualRows.map(function (row) {
            const tone = row.getAttribute('data-finding-tone') || '';
            const label = getFirstCalculateShareText(row, ['span']);
            const control = getFirstCalculateShareText(row, ['code', 'strong']) || normalizeShareText(row.textContent);
            const status = getFirstCalculateShareText(row, ['strong']) || normalizeScanningSeverity(tone);

            return {
                severity: normalizeScanningSeverity(tone || status),
                category: status || 'Finding',
                control: control,
                status: status,
                evidence: label,
            };
        }).filter(function (row) {
            return row.control !== '' || row.evidence !== '';
        });
    }

    function collectScanningShareRows(findings) {
        const tableRows = collectScanningRowsFromTable(findings);
        const rows = tableRows.length > 0 ? tableRows : collectScanningRowsFromVisual(findings);

        return rows.slice(0, 6);
    }

    function getScanningSeverityCounts(rows) {
        const counts = {
            High: 0,
            Medium: 0,
            Low: 0,
            Info: 0,
        };

        rows.forEach(function (row) {
            const severity = normalizeScanningSeverity(row.severity);

            if (severity === 'High') {
                counts.High += 1;
            } else if (severity === 'Medium') {
                counts.Medium += 1;
            } else if (severity === 'Low') {
                counts.Low += 1;
            } else {
                counts.Info += 1;
            }
        });

        return counts;
    }

    function drawScanningPrimaryCard(context, primary, x, y, width, height) {
        roundedCanvasRect(context, x, y, width, height, 18);
        context.fillStyle = '#ffffff';
        context.fill();
        context.strokeStyle = 'rgba(203, 213, 225, 0.95)';
        context.lineWidth = 1.5;
        context.stroke();
        context.font = '800 15px Roboto, Arial, sans-serif';
        context.fillStyle = '#64748b';
        drawSingleLineShareText(context, primary.label, x + 26, y + 34, width - 52);
        context.font = '900 48px Nunito, Roboto, Arial, sans-serif';
        context.fillStyle = '#17324d';
        drawSingleLineShareText(context, primary.value || '-', x + 26, y + 96, width - 52);

        if (primary.unit !== '') {
            context.font = '800 16px Roboto, Arial, sans-serif';
            context.fillStyle = '#2563eb';
            drawSingleLineShareText(context, primary.unit, x + 28, y + 128, 160);
        }

        context.font = '500 14px Roboto, Arial, sans-serif';
        context.fillStyle = '#64748b';
        drawWrappedShareText(context, primary.copy, x + 26, y + height - 46, width - 52, 18, 2);
    }

    function drawScanningSeverityCards(context, rows, x, y, width, height) {
        const counts = getScanningSeverityCounts(rows);
        const cards = [
            { label: 'High', value: counts.High, color: '#dc2626' },
            { label: 'Medium', value: counts.Medium, color: '#f97316' },
            { label: 'Low', value: counts.Low, color: '#2563eb' },
            { label: 'Info', value: counts.Info, color: '#64748b' },
        ];
        const gap = 14;
        const cardWidth = (width - gap) / 2;
        const cardHeight = (height - gap) / 2;

        cards.forEach(function (card, index) {
            const cardX = x + ((index % 2) * (cardWidth + gap));
            const cardY = y + (Math.floor(index / 2) * (cardHeight + gap));

            roundedCanvasRect(context, cardX, cardY, cardWidth, cardHeight, 16);
            context.fillStyle = '#ffffff';
            context.fill();
            context.strokeStyle = 'rgba(203, 213, 225, 0.92)';
            context.lineWidth = 1.5;
            context.stroke();
            context.fillStyle = card.color;
            roundedCanvasRect(context, cardX + 16, cardY + 16, 7, cardHeight - 32, 4);
            context.fill();
            context.font = '800 14px Roboto, Arial, sans-serif';
            context.fillStyle = '#64748b';
            drawSingleLineShareText(context, card.label, cardX + 36, cardY + 32, cardWidth - 58);
            context.font = '900 32px Nunito, Roboto, Arial, sans-serif';
            context.fillStyle = '#17324d';
            drawSingleLineShareText(context, String(card.value), cardX + 36, cardY + 73, cardWidth - 58);
        });
    }

    function drawScanningSeverityTable(context, rows, x, y, width, height) {
        const columns = [
            { key: 'severity', label: 'Severity', width: 118, align: 'left' },
            { key: 'control', label: 'Control', width: 286, align: 'left' },
            { key: 'status', label: 'Status', width: 156, align: 'left' },
            { key: 'evidence', label: 'Evidence', width: 424, align: 'left' },
        ];
        const rowHeight = 42;
        const headerHeight = 46;
        const tablePadding = 24;
        const tableTop = y + headerHeight;
        const textInset = 12;

        roundedCanvasRect(context, x, y, width, height, 18);
        context.fillStyle = '#ffffff';
        context.fill();
        context.strokeStyle = 'rgba(203, 213, 225, 0.95)';
        context.lineWidth = 1.5;
        context.stroke();
        context.font = '800 21px Nunito, Roboto, Arial, sans-serif';
        context.fillStyle = '#17324d';
        drawSingleLineShareText(context, 'Findings Summary', x + tablePadding, y + 31, width - (tablePadding * 2));
        context.fillStyle = '#f8fafc';
        context.fillRect(x + 1, tableTop, width - 2, rowHeight);
        context.strokeStyle = '#e2e8f0';
        context.beginPath();
        context.moveTo(x + 1, tableTop + rowHeight);
        context.lineTo(x + width - 1, tableTop + rowHeight);
        context.stroke();

        let cursorX = x + tablePadding;

        context.font = '800 13px Roboto, Arial, sans-serif';
        context.fillStyle = '#475569';
        columns.forEach(function (column) {
            drawSingleLineShareText(context, column.label, cursorX + textInset, tableTop + 27, column.width - (textInset * 2));
            cursorX += column.width;
        });

        const visibleRows = rows.length > 0 ? rows : [{
            severity: 'Info',
            control: 'No findings captured',
            status: 'Pending',
            evidence: 'Run the scan or prepare the review before sharing.',
        }];

        visibleRows.forEach(function (row, rowIndex) {
            const rowY = tableTop + rowHeight + (rowIndex * rowHeight);

            if (rowY + rowHeight > y + height - 10) {
                return;
            }

            if (rowIndex % 2 === 1) {
                context.fillStyle = '#fbfdff';
                context.fillRect(x + 1, rowY, width - 2, rowHeight);
            }

            context.strokeStyle = '#edf2f7';
            context.beginPath();
            context.moveTo(x + 1, rowY + rowHeight);
            context.lineTo(x + width - 1, rowY + rowHeight);
            context.stroke();
            cursorX = x + tablePadding;
            context.font = '700 14px Roboto, Arial, sans-serif';
            context.fillStyle = '#17324d';
            columns.forEach(function (column) {
                drawSingleLineShareText(
                    context,
                    row[column.key] || '-',
                    cursorX + textInset,
                    rowY + 27,
                    column.width - (textInset * 2)
                );
                cursorX += column.width;
            });
        });
    }

    async function createScanningShareBlob(overlay, adapter) {
        await ensureScanningShareReady(overlay);

        const root = getToolShareRoot(overlay);
        const summary = getShareSnapshotSourceByKind(root, 'scan-summary');
        const findings = getShareSnapshotSourceByKind(root, 'severity-table');
        const primary = getScanningPrimaryShareMetric(summary);
        const rows = collectScanningShareRows(findings);
        const chips = collectScanningShareChips(summary);
        const title = getToolShareTitle(overlay, adapter);
        const subtitle = getFirstCalculateShareText(summary, [
            '[class*="result-copy"]',
            '[class*="visual-contract-copy"]',
            '[id$="Summary"]',
            'p',
        ]) || getToolShareSummary(overlay, adapter);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const sidePadding = 56;

        if (!context) {
            throw new Error('Canvas rendering is not available.');
        }

        canvas.width = 1200;
        canvas.height = 900;
        drawShareGridBackground(context, canvas.width, canvas.height);
        drawFittedCanvasTitle(context, title, sidePadding, 78, canvas.width - (sidePadding * 2));
        drawFittedCanvasSubtitle(context, subtitle, sidePadding, 110, canvas.width - (sidePadding * 2));
        drawScanningPrimaryCard(context, primary, sidePadding, 142, 474, 214);
        drawScanningSeverityCards(context, rows, 548, 142, 596, 214);
        drawCalculateShareChipRow(context, chips, sidePadding, 382, canvas.width - (sidePadding * 2));
        drawScanningSeverityTable(context, rows, sidePadding, 432, canvas.width - (sidePadding * 2), 330);
        drawShareCanvasFooter(context, canvas, sidePadding);

        return createCanvasBlob(canvas);
    }

    function hasAssessmentShareSources(overlay) {
        const root = getToolShareRoot(overlay);

        return Boolean(
            getShareSnapshotSourceByKind(root, 'assessment-summary')
            && getShareSnapshotSourceByKind(root, 'assessment-table')
        );
    }

    function isAssessmentShareReady(root) {
        const summary = getShareSnapshotSourceByKind(root, 'assessment-summary');
        const table = getShareSnapshotSourceByKind(root, 'assessment-table');
        const hasSummary = normalizeShareText(summary?.textContent || '') !== '';
        const hasRows = Boolean(table?.querySelector('tbody tr'));

        return hasSummary && hasRows;
    }

    function waitForAssessmentShareReady(root) {
        return new Promise(function (resolve) {
            let attempt = 0;

            function tick() {
                if (isAssessmentShareReady(root) || attempt >= 50) {
                    resolve();
                    return;
                }

                attempt += 1;
                window.setTimeout(tick, 80);
            }

            tick();
        });
    }

    async function ensureAssessmentShareReady(overlay) {
        const root = getToolShareRoot(overlay);

        if (isAssessmentShareReady(root)) {
            return;
        }

        const prepareAction = findGenericToolShareAction(overlay);

        if (prepareAction) {
            prepareAction.click();
        }

        await waitForToolShareFrame();
        await waitForAssessmentShareReady(root);
    }

    function getAssessmentPrimaryShareMetric(summary) {
        const card = summary?.querySelector('[class*="result-card-primary"], [data-result-visual]');
        const value = getFirstCalculateShareText(card, [
            '[class*="result-primary-number-value"]',
            '[class*="result-primary-number"] strong',
            '[class*="result-primary-metric"]',
            'strong',
        ]);
        const unit = getFirstCalculateShareText(card, [
            '[class*="result-primary-number-unit"]',
            '[class*="result-primary-unit"]',
        ]);
        const label = getFirstCalculateShareText(card, [
            '[class*="result-title-center"]',
            '[class*="result-title"]',
            '[class*="result-kicker"]',
        ]) || 'Assessment rows';
        const copy = getFirstCalculateShareText(card, [
            '[class*="result-copy"]',
            'p',
        ]);

        return {
            label: label,
            value: value || '-',
            unit: unit || 'visible rows',
            copy: copy,
        };
    }

    function collectAssessmentShareChips(summary, selected) {
        const chips = collectScanningShareChips(summary);

        Array.from(selected?.querySelectorAll('[class*="script-chip"]') || []).forEach(function (chip) {
            const label = getFirstCalculateShareText(chip, ['[class*="chip-label"]']);
            const value = getFirstCalculateShareText(chip, ['[class*="chip-value"]']);
            const text = truncateShareLine(label && value ? label + ': ' + value : chip.textContent, 58);

            if (text !== '' && !chips.includes(text)) {
                chips.push(text);
            }
        });

        return chips.slice(0, 6);
    }

    function collectAssessmentRows(table) {
        return Array.from(table?.querySelectorAll('tbody tr') || []).map(function (row) {
            const cells = Array.from(row.cells || []);
            const dataCells = /^\d+$/.test(getCalculateTableCellText(cells[0] || row) || '')
                ? cells.slice(1)
                : cells;

            return {
                control: getCalculateTableCellText(dataCells[0] || row),
                title: getCalculateTableCellText(dataCells[1] || row),
                section: getCalculateTableCellText(dataCells[2] || row),
                criticality: getCalculateTableCellText(dataCells[3] || row),
                script: getCalculateTableCellText(dataCells[4] || row),
            };
        }).filter(function (row) {
            return row.control !== '' || row.title !== '';
        }).slice(0, 6);
    }

    function drawAssessmentControlsTable(context, rows, x, y, width, height) {
        const columns = [
            { key: 'control', label: 'Control', width: 130 },
            { key: 'title', label: 'Title', width: 382 },
            { key: 'criticality', label: 'Criticality', width: 132 },
            { key: 'section', label: 'Section', width: 230 },
            { key: 'script', label: 'Script', width: 110 },
        ];
        const rowHeight = 42;
        const headerHeight = 46;
        const tablePadding = 24;
        const tableTop = y + headerHeight;
        const textInset = 12;

        roundedCanvasRect(context, x, y, width, height, 18);
        context.fillStyle = '#ffffff';
        context.fill();
        context.strokeStyle = 'rgba(203, 213, 225, 0.95)';
        context.lineWidth = 1.5;
        context.stroke();
        context.font = '800 21px Nunito, Roboto, Arial, sans-serif';
        context.fillStyle = '#17324d';
        drawSingleLineShareText(context, 'Assessment Controls', x + tablePadding, y + 31, width - (tablePadding * 2));
        context.fillStyle = '#f8fafc';
        context.fillRect(x + 1, tableTop, width - 2, rowHeight);
        context.strokeStyle = '#e2e8f0';
        context.beginPath();
        context.moveTo(x + 1, tableTop + rowHeight);
        context.lineTo(x + width - 1, tableTop + rowHeight);
        context.stroke();

        let cursorX = x + tablePadding;

        context.font = '800 13px Roboto, Arial, sans-serif';
        context.fillStyle = '#475569';
        columns.forEach(function (column) {
            drawSingleLineShareText(context, column.label, cursorX + textInset, tableTop + 27, column.width - (textInset * 2));
            cursorX += column.width;
        });

        const visibleRows = rows.length > 0 ? rows : [{
            control: '-',
            title: 'No assessment controls captured',
            criticality: 'Pending',
            section: 'Run Explore before sharing.',
            script: '-',
        }];

        visibleRows.forEach(function (row, rowIndex) {
            const rowY = tableTop + rowHeight + (rowIndex * rowHeight);

            if (rowY + rowHeight > y + height - 10) {
                return;
            }

            if (rowIndex % 2 === 1) {
                context.fillStyle = '#fbfdff';
                context.fillRect(x + 1, rowY, width - 2, rowHeight);
            }

            context.strokeStyle = '#edf2f7';
            context.beginPath();
            context.moveTo(x + 1, rowY + rowHeight);
            context.lineTo(x + width - 1, rowY + rowHeight);
            context.stroke();
            cursorX = x + tablePadding;
            context.font = '700 14px Roboto, Arial, sans-serif';
            context.fillStyle = '#17324d';
            columns.forEach(function (column) {
                drawSingleLineShareText(
                    context,
                    row[column.key] || '-',
                    cursorX + textInset,
                    rowY + 27,
                    column.width - (textInset * 2)
                );
                cursorX += column.width;
            });
        });
    }

    async function createAssessmentShareBlob(overlay, adapter) {
        await ensureAssessmentShareReady(overlay);

        const root = getToolShareRoot(overlay);
        const summary = getShareSnapshotSourceByKind(root, 'assessment-summary');
        const table = getShareSnapshotSourceByKind(root, 'assessment-table');
        const selected = getShareSnapshotSourceByKind(root, 'assessment-selected');
        const primary = getAssessmentPrimaryShareMetric(summary);
        const metrics = collectScanningMetricCards(summary);
        const chips = collectAssessmentShareChips(summary, selected);
        const rows = collectAssessmentRows(table);
        const title = getToolShareTitle(overlay, adapter);
        const subtitle = getFirstCalculateShareText(summary, [
            '[class*="result-header-copy"] p',
            '[class*="result-summary-copy"] p',
            '[class*="result-copy"]',
        ]) || getToolShareSummary(overlay, adapter);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const sidePadding = 56;

        if (!context) {
            throw new Error('Canvas rendering is not available.');
        }

        canvas.width = 1200;
        canvas.height = 900;
        drawShareGridBackground(context, canvas.width, canvas.height);
        drawFittedCanvasTitle(context, title, sidePadding, 78, canvas.width - (sidePadding * 2));
        drawFittedCanvasSubtitle(context, subtitle, sidePadding, 110, canvas.width - (sidePadding * 2));
        drawScanningPrimaryCard(context, primary, sidePadding, 142, 474, 214);
        drawShellMetricCards(context, metrics, 548, 142, 596, 214);
        drawCalculateShareChipRow(context, chips.length > 0 ? chips : ['Assessment summary'], sidePadding, 382, canvas.width - (sidePadding * 2));
        drawAssessmentControlsTable(context, rows, sidePadding, 432, canvas.width - (sidePadding * 2), 330);
        drawShareCanvasFooter(context, canvas, sidePadding);

        return createCanvasBlob(canvas);
    }

    function hasShellShareSources(overlay) {
        const root = getToolShareRoot(overlay);

        return Boolean(
            getShareSnapshotSourceByKind(root, 'shell-summary')
            && getShareSnapshotSourceByKind(root, 'shell-command')
        );
    }

    function isShellShareReady(root) {
        const summary = getShareSnapshotSourceByKind(root, 'shell-summary');
        const command = getShareSnapshotSourceByKind(root, 'shell-command');
        const hasSummary = normalizeShareText(summary?.textContent || '') !== '';
        const hasCommand = normalizeShareText(command?.textContent || '') !== '';

        return hasSummary && hasCommand;
    }

    function waitForShellShareReady(root) {
        return new Promise(function (resolve) {
            let attempt = 0;

            function tick() {
                if (isShellShareReady(root) || attempt >= 50) {
                    resolve();
                    return;
                }

                attempt += 1;
                window.setTimeout(tick, 80);
            }

            tick();
        });
    }

    async function ensureShellShareReady(overlay) {
        const root = getToolShareRoot(overlay);

        if (isShellShareReady(root)) {
            return;
        }

        const prepareAction = findGenericToolShareAction(overlay);

        if (prepareAction) {
            prepareAction.click();
        }

        await waitForToolShareFrame();
        await waitForShellShareReady(root);
    }

    function collectShellShareChips(summary) {
        const chips = [];

        Array.from(summary?.querySelectorAll('[class*="result-chip-grid"] [class*="result-chip"], [class*="result-chip-row"] [class*="result-chip"]') || []).forEach(function (chip) {
            const text = truncateShareLine(chip.textContent, 54);

            if (text !== '' && !chips.includes(text)) {
                chips.push(text);
            }
        });

        return chips.slice(0, 6);
    }

    function isShellPlaceholderMessage(text) {
        return /^(no warnings|no blocking errors|no validation errors)/i.test(normalizeShareText(text));
    }

    function collectShellWarningRows(warnings) {
        const rows = [];

        Array.from(warnings?.querySelectorAll('[class*="message-card"]') || []).forEach(function (card) {
            const label = getFirstCalculateShareText(card, ['[class*="message-title"]', 'h3'])
                || 'Warnings';

            Array.from(card.querySelectorAll('li')).forEach(function (item) {
                const text = truncateShareLine(item.textContent, 160);

                if (text !== '' && !isShellPlaceholderMessage(text)) {
                    rows.push({
                        level: /error/i.test(label) ? 'Error' : 'Warning',
                        note: text,
                    });
                }
            });
        });

        if (rows.length === 0) {
            Array.from(warnings?.querySelectorAll('li') || []).forEach(function (item) {
                const text = truncateShareLine(item.textContent, 160);

                if (text !== '' && !isShellPlaceholderMessage(text)) {
                    rows.push({
                        level: /error/i.test(text) ? 'Error' : 'Warning',
                        note: text,
                    });
                }
            });
        }

        return rows.slice(0, 6);
    }

    function collectShellMetricCards(summary) {
        return collectCalculateMetricCards(summary).map(function (metric) {
            return {
                label: metric.label,
                value: metric.value,
                copy: metric.copy,
            };
        }).slice(0, 4);
    }

    function splitShellShareToken(context, token, maxWidth) {
        const pieces = [];
        let currentPiece = '';

        Array.from(String(token || '')).forEach(function (character) {
            const nextPiece = currentPiece + character;

            if (context.measureText(nextPiece).width <= maxWidth || currentPiece === '') {
                currentPiece = nextPiece;
                return;
            }

            pieces.push(currentPiece);
            currentPiece = character;
        });

        if (currentPiece !== '') {
            pieces.push(currentPiece);
        }

        return pieces;
    }

    function wrapShellCommandLines(context, command, maxWidth, maxLines) {
        const source = String(command || '').replace(/\r/g, '\n').trim();
        const sourceLines = source === '' ? ['No command generated yet.'] : source.split('\n');
        const lines = [];

        sourceLines.forEach(function (sourceLine) {
            const tokens = sourceLine.trim().split(/\s+/).filter(Boolean);
            let currentLine = '';

            if (tokens.length === 0) {
                lines.push('');
                return;
            }

            tokens.forEach(function (token) {
                if (context.measureText(token).width > maxWidth) {
                    if (currentLine !== '') {
                        lines.push(currentLine);
                        currentLine = '';
                    }

                    const tokenPieces = splitShellShareToken(context, token, maxWidth);

                    tokenPieces.forEach(function (piece, index) {
                        if (index === tokenPieces.length - 1) {
                            currentLine = piece;
                            return;
                        }

                        lines.push(piece);
                    });
                    return;
                }

                const nextLine = currentLine === '' ? token : currentLine + ' ' + token;

                if (context.measureText(nextLine).width <= maxWidth || currentLine === '') {
                    currentLine = nextLine;
                    return;
                }

                lines.push(currentLine);
                currentLine = token;
            });

            if (currentLine !== '') {
                lines.push(currentLine);
            }
        });

        return lines.slice(0, maxLines).map(function (line, index) {
            if (index !== maxLines - 1 || lines.length <= maxLines) {
                return line;
            }

            let candidate = line;

            while (candidate.length > 4 && context.measureText(candidate + '...').width > maxWidth) {
                candidate = candidate.slice(0, -1).trim();
            }

            return candidate + '...';
        });
    }

    function drawShellCommandPanel(context, command, x, y, width, height) {
        roundedCanvasRect(context, x, y, width, height, 18);
        context.fillStyle = '#10233a';
        context.fill();
        context.strokeStyle = 'rgba(148, 163, 184, 0.45)';
        context.lineWidth = 1.5;
        context.stroke();
        context.fillStyle = 'rgba(255, 255, 255, 0.08)';
        context.fillRect(x + 1, y + 1, width - 2, 46);
        context.font = '800 15px Roboto, Arial, sans-serif';
        context.fillStyle = '#e2e8f0';
        drawSingleLineShareText(context, 'Generated Command', x + 24, y + 30, width - 48);

        const dotColors = ['#22c55e', '#f97316', '#ef4444'];

        dotColors.forEach(function (color, index) {
            context.beginPath();
            context.arc(x + width - 76 + (index * 18), y + 24, 5, 0, Math.PI * 2);
            context.fillStyle = color;
            context.fill();
        });

        context.font = '700 18px Menlo, Consolas, monospace';
        context.fillStyle = '#dbeafe';

        wrapShellCommandLines(context, command, width - 48, 6).forEach(function (line, index) {
            context.fillText(line, x + 24, y + 78 + (index * 24));
        });
    }

    function drawShellMetricCards(context, metrics, x, y, width, height) {
        const fallbackMetrics = [{
            label: 'Command',
            value: 'Generated',
            copy: 'Current shell output.',
        }];
        const visibleMetrics = metrics.length > 0 ? metrics : fallbackMetrics;
        const gap = 14;
        const cardWidth = (width - gap) / 2;
        const cardHeight = (height - gap) / 2;

        visibleMetrics.slice(0, 4).forEach(function (metric, index) {
            drawCalculateShareMetricCard(
                context,
                metric,
                x + ((index % 2) * (cardWidth + gap)),
                y + (Math.floor(index / 2) * (cardHeight + gap)),
                cardWidth,
                cardHeight,
                index
            );
        });
    }

    function drawShellWarningTable(context, rows, x, y, width, height) {
        const rowHeight = 42;
        const headerHeight = 46;
        const tablePadding = 24;
        const tableTop = y + headerHeight;
        const visibleRows = rows.length > 0 ? rows : [{
            level: 'Info',
            note: 'No warnings captured for the current command.',
        }];

        roundedCanvasRect(context, x, y, width, height, 18);
        context.fillStyle = '#ffffff';
        context.fill();
        context.strokeStyle = 'rgba(203, 213, 225, 0.95)';
        context.lineWidth = 1.5;
        context.stroke();
        context.font = '800 21px Nunito, Roboto, Arial, sans-serif';
        context.fillStyle = '#17324d';
        drawSingleLineShareText(context, 'Warnings & Errors', x + tablePadding, y + 31, width - (tablePadding * 2));
        context.fillStyle = '#f8fafc';
        context.fillRect(x + 1, tableTop, width - 2, rowHeight);
        context.strokeStyle = '#e2e8f0';
        context.beginPath();
        context.moveTo(x + 1, tableTop + rowHeight);
        context.lineTo(x + width - 1, tableTop + rowHeight);
        context.stroke();
        context.font = '800 13px Roboto, Arial, sans-serif';
        context.fillStyle = '#475569';
        drawSingleLineShareText(context, 'Type', x + tablePadding, tableTop + 27, 128);
        drawSingleLineShareText(context, 'Review Note', x + tablePadding + 150, tableTop + 27, width - tablePadding - 174);

        visibleRows.forEach(function (row, index) {
            const rowY = tableTop + rowHeight + (index * rowHeight);
            const level = row.level || 'Info';
            const isError = level === 'Error';
            const isWarning = level === 'Warning';
            const pillColor = isError ? '#fee2e2' : isWarning ? '#ffedd5' : '#eff6ff';
            const textColor = isError ? '#b91c1c' : isWarning ? '#c2410c' : '#2563eb';

            if (rowY + rowHeight > y + height - 10) {
                return;
            }

            if (index % 2 === 1) {
                context.fillStyle = '#fbfdff';
                context.fillRect(x + 1, rowY, width - 2, rowHeight);
            }

            context.strokeStyle = '#edf2f7';
            context.beginPath();
            context.moveTo(x + 1, rowY + rowHeight);
            context.lineTo(x + width - 1, rowY + rowHeight);
            context.stroke();
            roundedCanvasRect(context, x + tablePadding, rowY + 10, 90, 23, 12);
            context.fillStyle = pillColor;
            context.fill();
            context.font = '800 12px Roboto, Arial, sans-serif';
            context.fillStyle = textColor;
            drawSingleLineShareText(context, level, x + tablePadding + 16, rowY + 26, 58);
            context.font = '700 14px Roboto, Arial, sans-serif';
            context.fillStyle = '#17324d';
            drawSingleLineShareText(context, row.note || '-', x + tablePadding + 150, rowY + 27, width - tablePadding - 174);
        });
    }

    async function createShellShareBlob(overlay, adapter) {
        await ensureShellShareReady(overlay);

        const root = getToolShareRoot(overlay);
        const summary = getShareSnapshotSourceByKind(root, 'shell-summary');
        const command = getShareSnapshotSourceByKind(root, 'shell-command');
        const warnings = getShareSnapshotSourceByKind(root, 'shell-warnings');
        const metrics = collectShellMetricCards(summary);
        const chips = collectShellShareChips(summary);
        const rows = collectShellWarningRows(warnings);
        const title = getToolShareTitle(overlay, adapter);
        const subtitle = getFirstCalculateShareText(summary, [
            '[class*="result-header-copy"] p',
            '[class*="result-summary-copy"] p',
            '[class*="result-copy"]',
        ]) || getToolShareSummary(overlay, adapter);
        const commandText = normalizeShareText(command?.textContent || '');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const sidePadding = 56;

        if (!context) {
            throw new Error('Canvas rendering is not available.');
        }

        canvas.width = 1200;
        canvas.height = 900;
        drawShareGridBackground(context, canvas.width, canvas.height);
        drawFittedCanvasTitle(context, title, sidePadding, 78, canvas.width - (sidePadding * 2));
        drawFittedCanvasSubtitle(context, subtitle, sidePadding, 110, canvas.width - (sidePadding * 2));
        drawShellCommandPanel(context, commandText, sidePadding, 142, 648, 214);
        drawShellMetricCards(context, metrics, 728, 142, 416, 214);
        drawCalculateShareChipRow(context, chips.length > 0 ? chips : ['Command summary'], sidePadding, 382, canvas.width - (sidePadding * 2));
        drawShellWarningTable(context, rows, sidePadding, 432, canvas.width - (sidePadding * 2), 330);
        drawShareCanvasFooter(context, canvas, sidePadding);

        return createCanvasBlob(canvas);
    }

    async function createGenericCanvasShareBlob(image, size, title, subtitle) {
        const maxCanvasWidth = 2400;
        const maxCanvasHeight = 1800;
        const sidePadding = 48;
        const framePadding = 22;
        const headerTop = 42;
        const normalizedSubtitle = normalizeShareText(subtitle);
        const headerHeight = normalizedSubtitle === '' ? 72 : 96;
        const bottomPadding = 76;
        const maxImageWidth = maxCanvasWidth - (sidePadding * 2) - (framePadding * 2);
        const maxImageHeight = maxCanvasHeight - headerTop - headerHeight - bottomPadding - (framePadding * 2);
        const imageScale = Math.min(1, maxImageWidth / size.width, maxImageHeight / size.height);
        const imageWidth = Math.max(1, Math.round(size.width * imageScale));
        const imageHeight = Math.max(1, Math.round(size.height * imageScale));
        const frameWidth = imageWidth + (framePadding * 2);
        const frameHeight = imageHeight + (framePadding * 2);
        const canvasWidth = frameWidth + (sidePadding * 2);
        const frameX = sidePadding;
        const frameY = headerTop + headerHeight;
        const canvasHeight = frameY + frameHeight + bottomPadding;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('Canvas rendering is not available.');
        }

        canvas.width = Math.round(canvasWidth);
        canvas.height = Math.round(canvasHeight);

        drawShareGridBackground(context, canvas.width, canvas.height);
        drawFittedCanvasTitle(context, title, sidePadding, headerTop + 32, canvas.width - (sidePadding * 2));
        drawFittedCanvasSubtitle(context, normalizedSubtitle, sidePadding, headerTop + 62, canvas.width - (sidePadding * 2));

        roundedCanvasRect(context, frameX, frameY, frameWidth, frameHeight, 18);
        context.fillStyle = '#ffffff';
        context.fill();
        context.strokeStyle = 'rgba(203, 213, 225, 0.92)';
        context.lineWidth = 2;
        context.stroke();
        context.drawImage(image, frameX + framePadding, frameY + framePadding, imageWidth, imageHeight);
        drawShareCanvasFooter(context, canvas, sidePadding);

        return createCanvasBlob(canvas);
    }

    async function serializeSvgForSnapshot(svg, size) {
        const clone = svg.cloneNode(true);

        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        clone.setAttribute('width', String(size.sourceWidth));
        clone.setAttribute('height', String(size.sourceHeight));

        if (!clone.getAttribute('viewBox')) {
            clone.setAttribute('viewBox', '0 0 ' + size.sourceWidth + ' ' + size.sourceHeight);
        }

        inlineComputedSvgStyles(svg, clone);
        await inlineSvgImageReferences(clone);
        replaceSvgForeignObjects(clone);

        return new XMLSerializer().serializeToString(clone);
    }

    async function createGenericSvgShareBlob(overlay, adapter) {
        let svg = getVisibleSvgSnapshotElement();

        if (!svg || isToolSharePreviewSvg(svg)) {
            await ensureGenericToolShareReady(overlay);
            svg = getVisibleSvgSnapshotElement();
        }

        if (!svg || isToolSharePreviewSvg(svg)) {
            return createGenericTextShareBlob(overlay, adapter);
        }

        const size = getSvgSnapshotSize(svg);
        const svgMarkup = await serializeSvgForSnapshot(svg, size);
        const svgBlob = new Blob([svgMarkup], {
            type: 'image/svg+xml;charset=utf-8',
        });
        const svgUrl = URL.createObjectURL(svgBlob);

        try {
            const image = await loadImageFromUrl(svgUrl);

            return await createGenericCanvasShareBlob(
                image,
                size,
                getToolShareTitle(overlay, adapter),
                getToolShareSubtitle(overlay, adapter)
            );
        } finally {
            URL.revokeObjectURL(svgUrl);
        }
    }

    async function createToolShareBlob(overlay, adapter) {
        if (adapter && typeof adapter.ensureReady === 'function') {
            await adapter.ensureReady();
        }

        if (adapter && typeof adapter.createImageBlob === 'function') {
            const blob = await adapter.createImageBlob();

            if (blob) {
                return blob;
            }
        }

        if (hasCalculateShareSources(overlay)) {
            return createCalculateShareBlob(overlay, adapter);
        }

        if (hasScanningShareSources(overlay)) {
            return createScanningShareBlob(overlay, adapter);
        }

        if (hasAssessmentShareSources(overlay)) {
            return createAssessmentShareBlob(overlay, adapter);
        }

        if (hasShellShareSources(overlay)) {
            return createShellShareBlob(overlay, adapter);
        }

        return createGenericSvgShareBlob(overlay, adapter);
    }

    async function saveToolShareSnapshot(elements, adapter, renderRequestId) {
        if (!toolShareState.blob) {
            throw new Error('No share image is available.');
        }

        const endpoint = normalizeShareText(elements.overlay.dataset.shareSnapshotEndpoint);

        if (endpoint === '') {
            throw new Error('This tool does not expose a snapshot endpoint.');
        }

        const uploadRequestId = toolShareState.snapshotRequestId + 1;
        const formData = new FormData();

        toolShareState.snapshotRequestId = uploadRequestId;
        toolShareState.snapshotPending = true;
        toolShareState.snapshot = null;
        syncToolShareButtons(elements);

        formData.append('image', toolShareState.blob, getToolShareFileName(elements.overlay, adapter));
        formData.append('title', getToolShareTitle(elements.overlay, adapter));
        formData.append('summary', getToolShareSummary(elements.overlay, adapter));

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                },
            });
            const payload = await response.json().catch(function () {
                return {};
            });

            if (!response.ok) {
                throw new Error(payload.error || 'Failed to save the snapshot link.');
            }

            if (!payload || !payload.snapshotUrl || !payload.imageUrl) {
                throw new Error('The snapshot link response was incomplete.');
            }

            if (renderRequestId !== toolShareState.requestId || uploadRequestId !== toolShareState.snapshotRequestId) {
                return null;
            }

            toolShareState.snapshot = {
                snapshotId: String(payload.snapshotId || ''),
                snapshotUrl: String(payload.snapshotUrl || ''),
                imageUrl: String(payload.imageUrl || ''),
            };
            elements.overlay.dataset.snapshotUrl = toolShareState.snapshot.snapshotUrl;

            return toolShareState.snapshot;
        } finally {
            if (renderRequestId === toolShareState.requestId && uploadRequestId === toolShareState.snapshotRequestId) {
                toolShareState.snapshotPending = false;
                syncToolShareButtons(elements);
            }
        }
    }

    async function openToolSharePreview(action, trigger) {
        const elements = getToolShareElements();

        if (!elements || !elements.overlay || !elements.preview || !elements.status) {
            return;
        }

        const adapter = getToolShareAdapter(elements.overlay);
        const renderRequestId = toolShareState.requestId + 1;

        toolShareState.action = action;
        toolShareState.trigger = trigger || null;
        toolShareState.requestId = renderRequestId;
        toolShareState.blob = null;
        resetToolShareSnapshot(elements);
        revokeToolSharePreviewUrl();
        elements.preview.removeAttribute('src');
        setToolShareStatus(elements, 'Preparing framed snapshot...', 'loading');
        syncToolShareButtons(elements);
        elements.overlay.classList.remove('d-none');
        document.body.classList.add('tool-share-lock');
        elements.closeButton?.focus();

        try {
            const blob = await createToolShareBlob(elements.overlay, adapter);

            if (renderRequestId !== toolShareState.requestId) {
                return;
            }

            toolShareState.blob = blob;
            toolShareState.objectUrl = URL.createObjectURL(blob);
            elements.preview.src = toolShareState.objectUrl;
            setToolShareStatus(elements, getReadyShareStatusText(), 'ready');
            syncToolShareButtons(elements);

            if (!requiresToolShareSnapshot(action)) {
                return;
            }

            setToolShareStatus(elements, 'Saving snapshot link for social previews...', 'saving');
            await saveToolShareSnapshot(elements, adapter, renderRequestId);

            if (renderRequestId !== toolShareState.requestId) {
                return;
            }

            setToolShareStatus(elements, getReadyShareStatusText(), 'ready');
            syncToolShareButtons(elements);
        } catch (error) {
            if (renderRequestId !== toolShareState.requestId) {
                return;
            }

            toolShareState.snapshotPending = false;
            setToolShareStatus(elements, error?.message || 'Failed to prepare the share image.', 'error');
            syncToolShareButtons(elements);
        }
    }

    function closeToolSharePreview() {
        const elements = getToolShareElements();

        toolShareState.requestId += 1;
        toolShareState.blob = null;
        toolShareState.action = null;
        resetToolShareSnapshot(elements);
        revokeToolSharePreviewUrl();

        if (elements) {
            elements.overlay.classList.add('d-none');
            elements.preview?.removeAttribute('src');
            if (elements.status) {
                setToolShareStatus(elements, 'Preparing framed snapshot...', 'loading');
            }
            syncToolShareButtons(elements);
        }

        document.body.classList.remove('tool-share-lock');

        if (toolShareState.trigger && document.contains(toolShareState.trigger)) {
            toolShareState.trigger.focus();
        }

        toolShareState.trigger = null;
    }

    function getActiveToolShareUrl() {
        return toolShareState.snapshot?.snapshotUrl || getCanonicalShareUrl();
    }

    function buildToolShareTargetHref(action, overlay, adapter) {
        const shareUrl = getActiveToolShareUrl();
        const shareTitle = getToolShareTitle(overlay, adapter);
        const shareSummary = getToolShareSummary(overlay, adapter);
        const shareText = shareSummary ? shareTitle + ' - ' + shareSummary : shareTitle;
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedTitle = encodeURIComponent(shareTitle);
        const encodedText = encodeURIComponent(shareText);
        const label = action ? action.label : '';

        if (label === 'X') {
            return 'https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedTitle;
        }

        if (label === 'Facebook') {
            return 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl;
        }

        if (label === 'LinkedIn') {
            return 'https://www.linkedin.com/feed/?shareActive=true&shareUrl=' + encodedUrl;
        }

        if (label === 'WhatsApp') {
            return 'https://api.whatsapp.com/send?text=' + encodedText + '%20' + encodedUrl;
        }

        if (label === 'Telegram') {
            return 'https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedTitle;
        }

        if (label === 'Reddit') {
            return 'https://www.reddit.com/submit?url=' + encodedUrl + '&title=' + encodedTitle;
        }

        if (label === 'Email') {
            return 'mailto:?subject=' + encodedTitle + '&body=' + encodedText + '%0A%0A' + encodedUrl;
        }

        return action?.href || shareUrl;
    }

    function needsManualImageUpload(label) {
        return label === 'Facebook' || label === 'LinkedIn';
    }

    async function copyToolShareImageToClipboard() {
        if (!canCopyShareImage()) {
            throw new Error('Clipboard image copy is not available in this browser.');
        }

        await navigator.clipboard.write([
            new ClipboardItem({
                'image/png': toolShareState.blob,
            }),
        ]);
    }

    async function nativeToolShareImage() {
        const elements = getToolShareElements();

        if (!elements || !toolShareState.blob) {
            return;
        }

        const adapter = getToolShareAdapter(elements.overlay);
        const shareFile = createFileFromBlob(toolShareState.blob, getToolShareFileName(elements.overlay, adapter));
        const shareData = shareFile ? getSupportedNativeShareData(elements.overlay, adapter, shareFile) : null;

        if (!shareFile || !shareData || !navigator.share) {
            setToolShareStatus(elements, 'System image sharing is not available in this browser.', 'warning');
            return;
        }

        try {
            await navigator.share(shareData);
            flashButton(elements.nativeButton, 'Shared');
        } catch (error) {
            if (!error || error.name !== 'AbortError') {
                setToolShareStatus(elements, 'Failed to open the system share dialog.', 'error');
            }
        }
    }

    async function copyToolShareImage() {
        const elements = getToolShareElements();

        if (!elements || !toolShareState.blob) {
            return;
        }

        try {
            await copyToolShareImageToClipboard();
            flashButton(elements.copyImageButton, 'Copied');
        } catch (error) {
            setToolShareStatus(elements, 'Failed to copy the share image to the clipboard.', 'error');
        }
    }

    function downloadBlob(fileName, blob) {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function downloadToolShareImage() {
        const elements = getToolShareElements();

        if (!elements || !toolShareState.blob) {
            return;
        }

        const adapter = getToolShareAdapter(elements.overlay);

        downloadBlob(getToolShareFileName(elements.overlay, adapter), toolShareState.blob);
        flashButton(elements.downloadButton, 'Saved');
    }

    async function continueToolShare() {
        const elements = getToolShareElements();

        if (!elements || !toolShareState.action || !toolShareState.blob) {
            return;
        }

        const action = toolShareState.action;
        const adapter = getToolShareAdapter(elements.overlay);

        if (action.type === 'copy') {
            if (!toolShareState.snapshot?.snapshotUrl) {
                setToolShareStatus(elements, 'Snapshot link is still being prepared.', 'saving');
                return;
            }

            try {
                await copyText(toolShareState.snapshot.snapshotUrl);
                flashButton(elements.continueButton, 'Copied');
                setToolShareStatus(elements, 'Snapshot link copied. It will preview this image.', 'ready');
            } catch (error) {
                setToolShareStatus(elements, 'Failed to copy the snapshot link to the clipboard.', 'error');
            }

            return;
        }

        if (action.type !== 'link') {
            return;
        }

        if (!toolShareState.snapshot?.snapshotUrl) {
            setToolShareStatus(elements, 'Snapshot link is still being prepared.', 'saving');
            return;
        }

        const shareTargetHref = buildToolShareTargetHref(action, elements.overlay, adapter);
        const isEmailShare = shareTargetHref.indexOf('mailto:') === 0;

        if (!isEmailShare) {
            window.open(shareTargetHref, '_blank', 'noopener,noreferrer');
        }

        try {
            await copyToolShareImageToClipboard();
            if (isEmailShare) {
                setToolShareStatus(elements, 'Image copied. Opening Email; paste the image into the message if your client supports it.', 'ready');
            } else if (needsManualImageUpload(action.label)) {
                setToolShareStatus(elements, action.label + ' opened with the snapshot link. Upload the PNG manually if the preview does not show.', 'warning');
            } else {
                setToolShareStatus(elements, 'Snapshot link opened. Image copied; paste it into ' + action.label + ' if needed.', 'ready');
            }
            flashButton(elements.continueButton, 'Copied');
        } catch (error) {
            if (isEmailShare) {
                setToolShareStatus(elements, 'Opening Email. Image copy failed in this browser; use Copy Image or Download PNG.', 'warning');
            } else if (needsManualImageUpload(action.label)) {
                setToolShareStatus(elements, action.label + ' opened with the snapshot link. Use Download PNG if the preview does not show.', 'warning');
            } else {
                setToolShareStatus(elements, 'Snapshot link opened. Image copy failed in this browser; use Copy Image or Download PNG.', 'warning');
            }
            flashButton(elements.continueButton, 'Opened');
        }

        if (isEmailShare) {
            window.location.href = shareTargetHref;
        }
    }

    document.addEventListener('click', function (event) {
        const action = event.target.closest('.article-share-panel .share-actions .share-action');

        if (!action || action.classList.contains('share-action-embed')) {
            return;
        }

        const context = getShareActionContext(action);

        if (!context || !getToolShareOverlay()) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        openToolSharePreview(context, action);
    }, true);

    document.addEventListener('click', function (event) {
        const elements = getToolShareElements();

        if (!elements || elements.overlay.classList.contains('d-none')) {
            return;
        }

        if (event.target.closest('[data-tool-share-continue]')) {
            continueToolShare();
            return;
        }

        if (event.target.closest('[data-tool-share-native]')) {
            nativeToolShareImage();
            return;
        }

        if (event.target.closest('[data-tool-share-copy-image]')) {
            copyToolShareImage();
            return;
        }

        if (event.target.closest('[data-tool-share-download]')) {
            downloadToolShareImage();
            return;
        }

        if (event.target.closest('.tool-share-close') || event.target === elements.overlay) {
            closeToolSharePreview();
        }
    });

    document.addEventListener('keydown', function (event) {
        const overlay = getToolShareOverlay();

        if (event.key === 'Escape' && overlay && !overlay.classList.contains('d-none')) {
            event.preventDefault();
            closeToolSharePreview();
        }
    });

    function closeRelatedLinkFrame(frame) {
        if (!frame) {
            return;
        }

        const iframe = frame.querySelector('[data-related-link-frame-iframe]');
        const openLink = frame.querySelector('[data-related-link-frame-open]');

        if (iframe) {
            iframe.removeAttribute('src');
            iframe.setAttribute('title', 'Embedded related tool');
        }

        if (openLink) {
            openLink.setAttribute('href', '#');
        }

        frame.setAttribute('hidden', '');
    }

    document.addEventListener('click', function (event) {
        const iframeButton = event.target.closest('[data-related-link-iframe]');

        if (!iframeButton) {
            return;
        }

        const section = iframeButton.closest('[data-related-link-section]');
        const frame = section ? section.querySelector('[data-related-link-frame]') : null;
        const iframe = frame ? frame.querySelector('[data-related-link-frame-iframe]') : null;
        const title = frame ? frame.querySelector('[data-related-link-frame-title]') : null;
        const openLink = frame ? frame.querySelector('[data-related-link-frame-open]') : null;
        const iframeUrl = iframeButton.getAttribute('data-related-link-iframe-url') || '';
        const browserUrl = iframeButton.getAttribute('data-related-link-browser-url') || iframeUrl;
        const iframeTitle = iframeButton.getAttribute('data-related-link-title') || 'Embedded related tool';

        if (!frame || !iframe || iframeUrl === '') {
            return;
        }

        event.preventDefault();

        document.querySelectorAll('[data-related-link-frame]').forEach(function (currentFrame) {
            if (currentFrame !== frame) {
                closeRelatedLinkFrame(currentFrame);
            }
        });

        if (title) {
            title.textContent = iframeTitle;
        }

        if (openLink) {
            openLink.setAttribute('href', browserUrl);
        }

        iframe.setAttribute('title', iframeTitle);
        iframe.setAttribute('src', iframeUrl);
        frame.removeAttribute('hidden');
    });

    document.addEventListener('click', function (event) {
        const closeButton = event.target.closest('[data-related-link-frame-close]');

        if (!closeButton) {
            return;
        }

        const frame = closeButton.closest('[data-related-link-frame]');

        event.preventDefault();
        closeRelatedLinkFrame(frame);
    });

    document.addEventListener('click', function (event) {
        const copyButton = event.target.closest('[data-share-copy]');

        if (!copyButton) {
            return;
        }

        const copyValue = copyButton.getAttribute('data-copy-value') || '';

        if (copyValue === '') {
            return;
        }

        copyText(copyValue).then(function () {
            const label = copyButton.querySelector('[data-share-copy-label]');
            const previousLabel = label ? label.textContent : copyButton.textContent;
            copyButton.classList.add('is-copied');

            if (copyButton.tagName === 'BUTTON' && previousLabel.trim() !== '') {
                if (label) {
                    label.textContent = 'Copied';
                } else {
                    copyButton.textContent = 'Copied';
                }
            }

            window.setTimeout(function () {
                copyButton.classList.remove('is-copied');

                if (copyButton.tagName === 'BUTTON' && previousLabel.trim() !== '') {
                    if (label) {
                        label.textContent = previousLabel;
                    } else {
                        copyButton.textContent = previousLabel;
                    }
                }
            }, 1400);
        });
    });

})();
