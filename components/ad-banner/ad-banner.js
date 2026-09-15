/**
 * @fileoverview Periodic Ad Banner Component
 * @module Periodic.AdBanner
 * Handles advertising banners, impressions and dismissible calls-to-action.
 */

class PeriodicAdBanner {
    constructor(element) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        if (!this.element) return;
        this.init();
    }

    init() {
        const closeBtn = this.element.querySelector('.periodic-ad-banner__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.dismiss();
            });
        }
    }

    dismiss() {
        this.element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            this.element.style.display = 'none';
        }, 300);
    }
}

window.PeriodicAdBanner = PeriodicAdBanner;
