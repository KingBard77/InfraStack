// main.js

(function() {
    "use strict";

    function initSwiper() {
        if (typeof Swiper === 'undefined') {
            return;
        }

        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
            const configElement = swiperElement.querySelector(".swiper-config");

            if (!configElement) {
                return;
            }

            const config = JSON.parse(configElement.innerHTML.trim());

            if (swiperElement.classList.contains("swiper-tab") && typeof initSwiperWithCustomPagination === 'function') {
                initSwiperWithCustomPagination(swiperElement, config);
                return;
            }

            new Swiper(swiperElement, config);
        });
    }

    window.addEventListener("load", initSwiper);
})();
