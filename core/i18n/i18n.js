/**
 * @fileoverview Periodic Unified Internationalization (i18n) Engine
 * @module Periodic.i18n
 * @description Supports 4 symmetric locales: pt-br, en-us, es, it.
 * Provides declarative DOM translations and dynamic reactivity.
 */

(function (window) {
    'use strict';

    window.Periodic = window.Periodic || {};

    class PeriodicI18n {
        constructor() {
            this.availableLocales = ['pt-br', 'en-us', 'es', 'it'];
            this.defaultLocale = 'pt-br';
            this.currentLocale = this.getSavedLocale() || this.defaultLocale;
            this.translations = {};
            this.isReady = false;
            this.readyListeners = [];
        }

        /**
         * Retrieve saved locale from localStorage if available
         * @returns {string|null}
         */
        getSavedLocale() {
            try {
                const saved = localStorage.getItem('periodic_locale');
                return this.availableLocales.includes(saved) ? saved : null;
            } catch (e) {
                return null;
            }
        }

        /**
         * Initialize i18n dictionaries
         * @param {Object} [inlineDictionaries] Optional pre-loaded dictionaries
         * @param {string} [basePath] Base path to load JSON files from
         * @returns {Promise<void>}
         */
        async init(inlineDictionaries = null, basePath = '../core/i18n/') {
            if (inlineDictionaries) {
                this.translations = inlineDictionaries;
                this.isReady = true;
                this.notifyReady();
                this.applyToDOM();
                return;
            }

            // Check if synchronous window.PeriodicTranslations is already loaded
            if (window.PeriodicTranslations && Object.keys(window.PeriodicTranslations).length > 0) {
                this.translations = window.PeriodicTranslations;
                this.isReady = true;
                this.notifyReady();
                this.applyToDOM();
                return;
            }

            try {
                // Fetch dictionaries in parallel
                const promises = this.availableLocales.map(async (loc) => {
                    const res = await fetch(`${basePath}${loc}.json`);
                    if (res.ok) {
                        this.translations[loc] = await res.json();
                    }
                });
                await Promise.all(promises);
                this.isReady = true;
                this.notifyReady();
                this.applyToDOM();
            } catch (err) {
                console.warn('[Periodic.i18n] Remote fetch failed (e.g. file:// protocol). Checking window.PeriodicTranslations:', err);
                if (window.PeriodicTranslations) {
                    this.translations = window.PeriodicTranslations;
                }
                this.isReady = true;
                this.notifyReady();
                this.applyToDOM();
            }
        }

        /**
         * Subscribe to ready state
         * @param {Function} cb 
         */
        onReady(cb) {
            if (this.isReady) {
                cb();
            } else {
                this.readyListeners.push(cb);
            }
        }

        notifyReady() {
            this.readyListeners.forEach(cb => cb());
            this.readyListeners = [];
        }

        /**
         * Switch active locale
         * @param {string} locale 'pt-br' | 'en-us' | 'es' | 'it'
         */
        setLocale(locale) {
            if (!this.availableLocales.includes(locale)) {
                console.warn(`[Periodic.i18n] Locale '${locale}' not supported. Keeping '${this.currentLocale}'`);
                return;
            }
            this.currentLocale = locale;
            try {
                localStorage.setItem('periodic_locale', locale);
            } catch (e) {}

            this.applyToDOM();

            const event = new CustomEvent('periodic:i18n:change', {
                detail: { locale: this.currentLocale }
            });
            window.dispatchEvent(event);
        }

        /**
         * Get translation by dot-notated key (e.g. 'ui.suite_title' or 'components.accordion.title')
         * @param {string} key 
         * @param {string} [fallback]
         * @returns {string}
         */
        t(key, fallback = '') {
            if (!key) return fallback;
            const dict = this.translations[this.currentLocale] || {};
            const keys = key.split('.');
            let val = dict;

            for (const k of keys) {
                if (val && typeof val === 'object' && k in val) {
                    val = val[k];
                } else {
                    val = null;
                    break;
                }
            }

            if (val !== null && typeof val === 'string') {
                return val;
            }

            // Try fallback to pt-br or en-us if key not present
            const fallbackDict = this.translations[this.defaultLocale] || {};
            let fVal = fallbackDict;
            for (const k of keys) {
                if (fVal && typeof fVal === 'object' && k in fVal) {
                    fVal = fVal[k];
                } else {
                    fVal = null;
                    break;
                }
            }

            return fVal !== null && typeof fVal === 'string' ? fVal : (fallback || key);
        }

        /**
         * Apply translations declaratively to elements with data-i18n attributes
         * @param {HTMLElement|Document} [root]
         */
        applyToDOM(root = document) {
            // Text content
            root.querySelectorAll('[data-i18n]').forEach((el) => {
                const key = el.getAttribute('data-i18n');
                const trans = this.t(key);
                if (trans) el.textContent = trans;
            });

            // HTML content
            root.querySelectorAll('[data-i18n-html]').forEach((el) => {
                const key = el.getAttribute('data-i18n-html');
                const trans = this.t(key);
                if (trans) el.innerHTML = trans;
            });

            // Placeholder
            root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
                const key = el.getAttribute('data-i18n-placeholder');
                const trans = this.t(key);
                if (trans) el.setAttribute('placeholder', trans);
            });

            // Title
            root.querySelectorAll('[data-i18n-title]').forEach((el) => {
                const key = el.getAttribute('data-i18n-title');
                const trans = this.t(key);
                if (trans) el.setAttribute('title', trans);
            });

            // Aria Label
            root.querySelectorAll('[data-i18n-aria]').forEach((el) => {
                const key = el.getAttribute('data-i18n-aria');
                const trans = this.t(key);
                if (trans) el.setAttribute('aria-label', trans);
            });
        }
    }

    window.Periodic.i18n = new PeriodicI18n();

})(window);
