/**
 * GSAP Front Gate Tickets Style Menu
 * 
 * Replicates the smooth hamburger + search menu animation from 
 * https://www.frontgatetickets.com with improved stability.
 * 
 * Features:
 * - Exact feel of the original (line compression, stagger reveals)
 * - Prevents GSAP conflicts and double animations
 * - Clean body scroll locking
 * - ESC key + focus management
 * - Mobile-first responsive
 * 
 * License: MIT
 * Version: 1.2
 */

document.addEventListener('DOMContentLoaded', () => {
    // Safety guard - only run where needed
    if (document.body.dataset.pageGroup !== 'group-1') return;

    if (typeof gsap === 'undefined') {
        console.warn('GSAP is required for menu animations but was not found.');
        return;
    }

    // DOM elements (matching Front Gate Tickets selectors)
    const navMenuBtn     = document.querySelector('.nav-menu-button');
    const searchBtn      = document.querySelector('.search-icon');
    const navMenu        = document.querySelector('.nav-menu');
    const searchMenu     = document.querySelector('.search-menu');
    const overlay        = document.querySelector('.nav-menu-overlay');
    const overlaySearch  = document.querySelector('.search-menu-overlay');
    const body           = document.body;

    const mediumLine     = document.querySelector('.nav-menu-button-line.is-medium');
    const bottomLine     = document.querySelector('.nav-menu-button-line.is-bottom');

    const topButtons     = document.querySelectorAll('.button-group-wrap.is-nav');
    const navLinks       = document.querySelectorAll('.nav-link');
    const bottomButtons  = document.querySelectorAll('.button-group.is-follow.is-bottom-nav');

    const searchHeading      = document.querySelector('.search-menu h2');
    const searchForm         = document.querySelector('.global-search-form');
    const searchBottomGroup  = document.querySelector('.search-bottom-group');
    const searchInput        = document.querySelector('#search-input');

    // Initial setup to match original behavior
    gsap.set([mediumLine, bottomLine], { width: '100%' });
    gsap.set([navMenu, searchMenu], { x: '-105%', display: 'none', opacity: 1 });
    gsap.set([overlay, overlaySearch], { opacity: 0, display: 'none' });

    // Scroll lock helper
    function toggleBodyScroll(lock) {
        if (lock) {
            body.classList.add('no-scroll');
            body.style.overflow = 'hidden';
        } else {
            body.classList.remove('no-scroll');
            body.style.overflow = '';
        }
    }

    // Close menu
    async function closeMenu(menu, overlayElem, isNavMenu) {
        return new Promise(resolve => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(menu, { display: 'none' });
                    toggleBodyScroll(false);
                    resolve();
                }
            });

            tl.to(overlayElem, { opacity: 0, duration: 0.35, ease: 'power2.out' }, 0)
              .to([mediumLine, bottomLine], { width: '100%', duration: 0.35, ease: 'power2.out' }, 0);

            if (isNavMenu) {
                tl.to([topButtons, navLinks, bottomButtons], {
                    opacity: 0, x: -20, duration: 0.3, stagger: 0.05, ease: 'power2.out'
                }, 0);
            } else {
                tl.to([searchHeading, searchForm, searchBottomGroup], {
                    opacity: 0, x: -20, duration: 0.3, stagger: 0.05, ease: 'power2.out'
                }, 0);
            }

            tl.to(menu, { x: '-105%', duration: 0.4, ease: 'power2.inOut' }, 0.1);
        });
    }

    // Open menu
    async function openMenu(menu, overlayElem, isNavMenu) {
        gsap.killTweensOf([menu, overlayElem, mediumLine, bottomLine,
            ...topButtons, ...navLinks, ...bottomButtons,
            searchHeading, searchForm, searchBottomGroup]);

        return new Promise(resolve => {
            const tl = gsap.timeline({
                onComplete: () => {
                    toggleBodyScroll(true);
                    resolve();
                } Add main GASP menu animation script
