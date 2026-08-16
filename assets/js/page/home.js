// home.js

(function () {
    'use strict';

    function initHomePreview() {
        const preview = document.querySelector('.home-studio-preview-wrap');

        if (!preview) {
            return;
        }

        document.documentElement.classList.add('home-studio-ready');

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        preview.addEventListener('pointermove', (event) => {
            const bounds = preview.getBoundingClientRect();
            const pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
            const pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;

            preview.style.setProperty('--preview-pointer-x', `${pointerX}%`);
            preview.style.setProperty('--preview-pointer-y', `${pointerY}%`);
        });

        preview.addEventListener('pointerleave', () => {
            preview.style.removeProperty('--preview-pointer-x');
            preview.style.removeProperty('--preview-pointer-y');
        });
    }

    window.addEventListener('DOMContentLoaded', initHomePreview, { once: true });
}());
