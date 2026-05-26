// link.js

(function() {
    "use strict";

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

})();
