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

        await inlineSvgImageReferences(clone);
        replaceSvgForeignObjects(clone);

        return new XMLSerializer().serializeToString(clone);
    }

    async function createGenericSvgShareBlob(overlay, adapter) {
        const svg = getVisibleSvgSnapshotElement();

        if (!svg) {
            throw new Error('Generate output before sharing. This tool does not expose a PNG snapshot yet.');
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
