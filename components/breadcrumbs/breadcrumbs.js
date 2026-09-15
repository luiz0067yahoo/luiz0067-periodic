/**
 * @fileoverview Periodic Breadcrumbs Component
 * @module Periodic.Breadcrumbs
 * Provides structured navigation breadcrumb trail with microdata schema.
 */

class PeriodicBreadcrumbs {
    /**
     * Initialize breadcrumb trail
     * @param {string|HTMLElement} container - Selector or element
     * @param {Array<{label: string, url: string, active?: boolean}>} items
     */
    constructor(container, items = []) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.items = items;
        if (this.container && this.items.length) {
            this.render();
        }
    }

    render() {
        if (!this.container) return;
        const ol = document.createElement('ol');
        ol.className = 'periodic-breadcrumbs__list';
        ol.setAttribute('itemscope', '');
        ol.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');

        this.items.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = `periodic-breadcrumbs__item ${item.active ? 'is-active' : ''}`;
            li.setAttribute('itemprop', 'itemListElement');
            li.setAttribute('itemscope', '');
            li.setAttribute('itemtype', 'https://schema.org/ListItem');

            if (item.active) {
                li.innerHTML = `<span itemprop="name">${item.label}</span><meta itemprop="position" content="${index + 1}" />`;
            } else {
                li.innerHTML = `<a href="${item.url || '#'}" itemprop="item" class="periodic-breadcrumbs__link"><span itemprop="name">${item.label}</span></a><meta itemprop="position" content="${index + 1}" />`;
            }
            ol.appendChild(li);
        });

        this.container.innerHTML = '';
        this.container.classList.add('periodic-breadcrumbs');
        this.container.appendChild(ol);
    }
}

window.PeriodicBreadcrumbs = PeriodicBreadcrumbs;
