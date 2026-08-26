// share-publish.js
const InfraStackLayoutStudioPublish = (function () {
    'use strict';

    const byId = function (id) { return document.getElementById(id); };

    function collectElements() {
        return {
            share: byId('studio-share'),
            embed: byId('studio-embed'),
            shareDialog: byId('studio-share-dialog'),
            embedDialog: byId('studio-embed-dialog'),
            shareIntroduction: byId('studio-share-introduction'),
            sharePreview: byId('studio-share-preview'),
            shareStatusText: byId('studio-share-status-text'),
            shareWhatsapp: byId('studio-share-whatsapp'),
            shareFacebook: byId('studio-share-facebook'),
            shareLinkedin: byId('studio-share-linkedin'),
            shareX: byId('studio-share-x'),
            shareTelegram: byId('studio-share-telegram'),
            shareReddit: byId('studio-share-reddit'),
            shareEmail: byId('studio-share-email'),
            shareSystem: byId('studio-share-system'),
            shareCopyImage: byId('studio-share-copy-image'),
            shareDownloadImage: byId('studio-share-download-image'),
            embedInventory: byId('studio-embed-inventory'),
            embedAdvisory: byId('studio-embed-advisory'),
            embedCollapsible: byId('studio-embed-collapsible'),
            embedFullscreen: byId('studio-embed-fullscreen'),
            embedWidth: byId('studio-embed-width'),
            embedWidthUnit: byId('studio-embed-width-unit'),
            embedHeight: byId('studio-embed-height'),
            embedHeightUnit: byId('studio-embed-height-unit'),
            embedRatioWidth: byId('studio-embed-ratio-width'),
            embedRatioHeight: byId('studio-embed-ratio-height'),
            embedMaxHeight: byId('studio-embed-max-height'),
            embedMaxHeightUnit: byId('studio-embed-max-height-unit'),
            embedReferrer: byId('studio-embed-referrer'),
            embedSandbox: byId('studio-embed-sandbox'),
            embedCode: byId('studio-embed-code'),
            embedCopy: byId('studio-share-copy-embed'),
            embedDemo: byId('studio-embed-demo')
        };
    }

    function assertOptions(options, elements) {
        const requiredOptions = ['root', 'core', 'getProject', 'getProvider', 'getIntroduction', 'showMessage'];
        const missingOption = requiredOptions.find(function (name) { return !options[name]; });
        if (missingOption) throw new Error(`Studio publishing requires ${missingOption}.`);
        const missingElement = Object.entries(elements).find(function ([, element]) { return !element; });
        if (missingElement) throw new Error(`Studio publishing element ${missingElement[0]} is missing.`);
    }

    /**
     * Creates the Studio share and embed controller.
     *
     * @param {Object} options Publishing dependencies and Studio callbacks.
     * @param {HTMLElement} options.root Studio root element containing endpoint data.
     * @param {Object} options.core Studio project model API.
     * @param {Object|null} options.packageLoader Lazy package loader.
     * @param {Object|null} options.shareImageRenderer PNG share-image renderer.
     * @param {Object<string, string>} options.resolvedIconUrls Resolved provider icon URLs.
     * @param {Function} options.getProject Returns the current normalized project.
     * @param {Function} options.getProvider Returns the current project provider.
     * @param {Function} options.getIntroduction Returns the current package introduction.
     * @param {Function} options.showMessage Displays a Studio status message.
     * @returns {{destroy: Function, openShare: Function, openEmbed: Function, downloadPng: Function, previewImage: Function}} Controller API.
     */
    function create(options) {
        const elements = collectElements();
        assertOptions(options, elements);
        const eventController = new AbortController();
        const eventOptions = { signal: eventController.signal };
        let shareImageBlob = null;
        let shareImageUrl = null;
        let shareImageSignature = null;

        function project() {
            return options.getProject();
        }

        function embedUrlWithOptions(embedUrl) {
            const url = new URL(embedUrl, window.location.origin);
            if (elements.embedInventory.checked) url.searchParams.set('inventory', '1');
            if (elements.embedAdvisory.checked) url.searchParams.set('advisory', '1');
            return url.toString();
        }

        function embedDimension(input, unit, fallback) {
            const value = Number(input.value);
            if (!Number.isFinite(value) || value <= 0) return fallback;
            return `${Math.round(value)}${unit.value}`;
        }

        function updateEmbedControls() {
            const embedUrl = embedUrlWithOptions(elements.embedDialog.dataset.embedUrl || '');
            const width = embedDimension(elements.embedWidth, elements.embedWidthUnit, '100%');
            const height = embedDimension(elements.embedHeight, elements.embedHeightUnit, '100%');
            const ratioWidth = Math.max(1, Math.min(32, Number(elements.embedRatioWidth.value) || 16));
            const ratioHeight = Math.max(1, Math.min(32, Number(elements.embedRatioHeight.value) || 9));
            const maxHeightValue = Number(elements.embedMaxHeight.value);
            const maxHeight = maxHeightValue > 0 ? `${Math.round(maxHeightValue)}${elements.embedMaxHeightUnit.value}` : '';
            const fullscreen = elements.embedFullscreen.checked ? ' allowfullscreen' : '';
            const style = `aspect-ratio:${ratioWidth}/${ratioHeight};border:0${maxHeight ? `;max-height:${maxHeight}` : ''}`;
            const iframe = `<iframe src="${embedUrl}" title="InfraStack architecture" width="${width}" height="${height}" loading="lazy" referrerpolicy="${elements.embedReferrer.value}" sandbox="${elements.embedSandbox.value.trim()}" style="${style}"${fullscreen}></iframe>`;
            elements.embedCode.value = elements.embedCollapsible.checked ? `<details><summary>View architecture</summary>${iframe}</details>` : iframe;
            elements.embedDemo.href = embedUrl;
        }

        async function copyValue(value, button, successLabel) {
            await navigator.clipboard.writeText(value);
            const original = button.innerHTML;
            button.textContent = successLabel;
            window.setTimeout(function () { button.innerHTML = original; }, 1600);
        }

        function imageFileName() {
            const name = String(project().name || 'infrastack-architecture')
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            return `${name || 'infrastack-architecture'}.png`;
        }

        async function renderShareImage() {
            const currentProject = project();
            const signature = [currentProject.updated_at, currentProject.active_view, currentProject.name].join(':');
            if (shareImageUrl && shareImageBlob && shareImageSignature === signature) {
                return { blob: shareImageBlob, url: shareImageUrl };
            }
            if (!options.shareImageRenderer) throw new Error('The share image renderer is unavailable.');
            const shareImage = await options.shareImageRenderer.create(
                currentProject,
                currentProject.active_view,
                options.resolvedIconUrls,
                options.getIntroduction()
            );
            if (shareImageUrl) URL.revokeObjectURL(shareImageUrl);
            shareImageBlob = shareImage.blob;
            shareImageUrl = shareImage.url;
            shareImageSignature = signature;
            return shareImage;
        }

        async function openShareDialog(result) {
            const currentProject = project();
            const introduction = options.getIntroduction();
            const encodedUrl = encodeURIComponent(result.share_url);
            const encodedText = encodeURIComponent(`${currentProject.name}\n\n${introduction}`);
            await renderShareImage();
            elements.shareIntroduction.textContent = introduction;
            elements.shareStatusText.textContent = 'Read-only share link ready';
            elements.sharePreview.src = shareImageUrl;
            elements.shareWhatsapp.href = `https://wa.me/?text=${encodedText}%0A${encodedUrl}`;
            elements.shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            elements.shareLinkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            elements.shareX.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
            elements.shareTelegram.href = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
            elements.shareReddit.href = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(currentProject.name)}`;
            elements.shareEmail.href = `mailto:?subject=${encodeURIComponent(currentProject.name)}&body=${encodedText}%0A%0A${encodedUrl}`;
            elements.shareDialog.dataset.shareUrl = result.share_url;
            elements.shareDialog.dataset.embedUrl = result.embed_url;
            elements.embedInventory.checked = false;
            elements.embedAdvisory.checked = false;
            elements.shareDialog.showModal();
        }

        function openEmbedDialog(result) {
            elements.embedDialog.dataset.embedUrl = result.embed_url;
            elements.embedInventory.checked = false;
            elements.embedAdvisory.checked = false;
            elements.embedCollapsible.checked = false;
            elements.embedFullscreen.checked = false;
            elements.embedDialog.querySelectorAll('[data-embed-focus]').forEach(function (button) {
                const panel = byId(button.dataset.embedFocus);
                if (panel) panel.hidden = false;
                button.classList.add('is-active');
                button.setAttribute('aria-expanded', 'true');
            });
            updateEmbedControls();
            elements.embedDialog.showModal();
        }

        async function createPublishedSnapshot(target) {
            elements.share.disabled = true;
            elements.embed.disabled = true;
            options.showMessage('Creating a read-only shared project…', 'neutral');
            try {
                await options.packageLoader?.loadProvider(options.getProvider());
                const response = await fetch(options.root.dataset.shareUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': options.root.dataset.shareCsrf
                    },
                    body: JSON.stringify({ project: options.core.buildExportPayload(project()) })
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'The shared project could not be created.');
                if (target === 'embed') openEmbedDialog(result);
                else await openShareDialog(result);
                options.showMessage(target === 'embed' ? 'Embed options are ready.' : 'Social sharing options are ready.', 'success');
            } catch (error) {
                if (error && error.name === 'AbortError') return;
                options.showMessage(error.message || 'The Studio project could not be shared.', 'error');
            } finally {
                elements.share.disabled = false;
                elements.embed.disabled = false;
            }
        }

        async function downloadPng() {
            try {
                await renderShareImage();
                const download = document.createElement('a');
                download.href = shareImageUrl;
                download.download = imageFileName();
                document.body.appendChild(download);
                download.click();
                download.remove();
                options.showMessage('Architecture PNG downloaded.', 'success');
            } catch (error) {
                options.showMessage(error.message || 'The architecture image could not be created.', 'error');
            }
        }

        elements.share.addEventListener('click', function () { createPublishedSnapshot('share'); }, eventOptions);
        elements.embed.addEventListener('click', function () { createPublishedSnapshot('embed'); }, eventOptions);
        elements.embedCopy.addEventListener('click', function () {
            copyValue(elements.embedCode.value, elements.embedCopy, 'Embed copied').catch(function () {
                options.showMessage('The embed code could not be copied.', 'error');
            });
        }, eventOptions);
        elements.shareSystem.addEventListener('click', async function () {
            const shareData = {
                title: project().name,
                text: options.getIntroduction(),
                url: elements.shareDialog.dataset.shareUrl
            };
            try {
                if (navigator.share) {
                    const imageFile = shareImageBlob ? new File([shareImageBlob], imageFileName(), { type: 'image/png' }) : null;
                    const sharePayload = imageFile && navigator.canShare?.({ files: [imageFile] })
                        ? { ...shareData, files: [imageFile] }
                        : shareData;
                    await navigator.share(sharePayload);
                    return;
                }
                await copyValue(shareData.url, elements.shareSystem, 'Link copied');
            } catch (error) {
                if (!error || error.name !== 'AbortError') options.showMessage('System sharing is unavailable in this browser.', 'warning');
            }
        }, eventOptions);
        elements.shareCopyImage.addEventListener('click', async function () {
            if (!shareImageBlob || !navigator.clipboard || typeof ClipboardItem === 'undefined') {
                options.showMessage('Image copying is unavailable in this browser. Download the PNG instead.', 'warning');
                return;
            }
            try {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': shareImageBlob })]);
                const original = elements.shareCopyImage.innerHTML;
                elements.shareCopyImage.textContent = 'Image copied';
                window.setTimeout(function () { elements.shareCopyImage.innerHTML = original; }, 1600);
            } catch (error) {
                options.showMessage('The image could not be copied. Download the PNG instead.', 'warning');
            }
        }, eventOptions);
        elements.shareDownloadImage.addEventListener('click', downloadPng, eventOptions);
        [
            elements.embedInventory,
            elements.embedAdvisory,
            elements.embedCollapsible,
            elements.embedFullscreen,
            elements.embedWidth,
            elements.embedWidthUnit,
            elements.embedHeight,
            elements.embedHeightUnit,
            elements.embedRatioWidth,
            elements.embedRatioHeight,
            elements.embedMaxHeight,
            elements.embedMaxHeightUnit,
            elements.embedReferrer,
            elements.embedSandbox
        ].forEach(function (control) {
            control.addEventListener('change', updateEmbedControls, eventOptions);
        });
        elements.embedDialog.querySelectorAll('[data-embed-focus]').forEach(function (button) {
            button.addEventListener('click', function () {
                const target = byId(button.dataset.embedFocus);
                if (!target) return;
                target.hidden = !target.hidden;
                button.classList.toggle('is-active', !target.hidden);
                button.setAttribute('aria-expanded', String(!target.hidden));
                if (target.hidden) return;
                target.focus({ preventScroll: true });
                target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, eventOptions);
        });

        return {
            openShare: function () { return createPublishedSnapshot('share'); },
            openEmbed: function () { return createPublishedSnapshot('embed'); },
            downloadPng,
            previewImage: renderShareImage,
            destroy: function () {
                eventController.abort();
                if (shareImageUrl) URL.revokeObjectURL(shareImageUrl);
                shareImageUrl = null;
                shareImageBlob = null;
                shareImageSignature = null;
            }
        };
    }

    return { create };
}());

export default InfraStackLayoutStudioPublish;
