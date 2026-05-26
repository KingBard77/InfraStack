// sidebar.js

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
        if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) {
            return;
        }
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

})();
