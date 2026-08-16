// layout.js
(function () {
    'use strict';

    const body = document.body;
    const header = document.querySelector('#header');
    const navMenu = document.querySelector('#navmenu');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileIcon = mobileToggle?.querySelector('i');
    const scrollTop = document.querySelector('.scroll-top');

    function setMobileNavigation(active) {
        body.classList.toggle('mobile-nav-active', active);
        mobileToggle?.setAttribute('aria-expanded', String(active));
        mobileToggle?.setAttribute('aria-label', active ? 'Close navigation menu' : 'Open navigation menu');
        mobileIcon?.classList.toggle('bi-list', !active);
        mobileIcon?.classList.toggle('bi-x', active);
    }

    function updateScrolledState() {
        if (header) body.classList.toggle('scrolled', window.scrollY > 100);
        scrollTop?.classList.toggle('active', window.scrollY > 100);
    }

    mobileToggle?.addEventListener('click', function () {
        setMobileNavigation(!body.classList.contains('mobile-nav-active'));
    });

    navMenu?.addEventListener('click', function (event) {
        if (event.target === navMenu || event.target.closest('a')) setMobileNavigation(false);
    });

    document.addEventListener('click', function (event) {
        if (!body.classList.contains('mobile-nav-active')) return;
        if (!navMenu?.contains(event.target) && !mobileToggle?.contains(event.target)) setMobileNavigation(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') setMobileNavigation(false);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1200) setMobileNavigation(false);
    });

    scrollTop?.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(function (toggle) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            toggle.parentNode?.classList.toggle('active');
            toggle.parentNode?.nextElementSibling?.classList.toggle('dropdown-active');
            event.stopImmediatePropagation();
        });
    });

    window.addEventListener('load', function () {
        setMobileNavigation(false);
        updateScrolledState();
        document.querySelector('#preloader')?.remove();
        if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
        }
    });
    window.addEventListener('pageshow', function () { setMobileNavigation(false); });
    document.addEventListener('scroll', updateScrolledState);
}());
