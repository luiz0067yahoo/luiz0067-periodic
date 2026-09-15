/**
 * @fileoverview Periodic Core Orchestrator & Component Registry
 * @module Periodic.Core
 * @version 2.0.0
 * @author Luiz & Periodic Team
 * Consolidates 61 modular components under a clean, isolated namespace.
 */

(function (window) {
    'use strict';

    if (window.Periodic && window.Periodic.isInitialized) {
        return;
    }

    const Periodic = window.Periodic || {};
    Periodic.version = '2.0.0';
    Periodic.components = new Map();
    Periodic.instances = new Map();
    Periodic._events = {};

    /**
     * Publish/Subscribe Event Bus to isolate events and avoid collisions
     */
    Periodic.on = function (event, handler) {
        if (!Periodic._events[event]) {
            Periodic._events[event] = [];
        }
        Periodic._events[event].push(handler);
    };

    Periodic.off = function (event, handler) {
        if (!Periodic._events[event]) return;
        Periodic._events[event] = Periodic._events[event].filter(h => h !== handler);
    };

    Periodic.emit = function (event, data) {
        if (!Periodic._events[event]) return;
        Periodic._events[event].forEach(handler => {
            try {
                handler(data);
            } catch (err) {
                console.error(`[Periodic.Core] Error in event handler for '${event}':`, err);
            }
        });
    };

    /**
     * Register a new component definition
     * @param {string} name - Component slug or name
     * @param {Object|Function} definition - Class or factory object
     */
    Periodic.register = function (name, definition) {
        if (Periodic.components.has(name)) {
            console.warn(`[Periodic.Core] Component '${name}' is already registered. Overwriting.`);
        }
        Periodic.components.set(name, definition);
        Periodic.emit('component:registered', { name, definition });
    };

    /**
     * Retrieve a registered component definition
     * @param {string} name
     * @returns {Object|Function|null}
     */
    Periodic.get = function (name) {
        return Periodic.components.get(name) || null;
    };

    /**
     * Auto-initialize declarative components in DOM
     * Looks for [data-periodic-component]
     * @param {HTMLElement|Document} root
     */
    Periodic.initAll = function (root = document) {
        // Auto initialize counter stats
        if (window.PeriodicCounterStats) {
            root.querySelectorAll('.periodic-counter-stats__number').forEach(el => {
                new window.PeriodicCounterStats(el);
            });
        }

        // Auto initialize ad banner
        if (window.PeriodicAdBanner) {
            root.querySelectorAll('.periodic-ad-banner').forEach(el => {
                new window.PeriodicAdBanner(el);
            });
        }

        // Auto initialize carousel plus
        if (window.PeriodicCarouselPlus) {
            root.querySelectorAll('.periodic-carousel-plus').forEach(el => {
                new window.PeriodicCarouselPlus(el);
            });
        }

        // Apply i18n
        if (Periodic.i18n && typeof Periodic.i18n.applyToDOM === 'function') {
            Periodic.i18n.applyToDOM(root);
        }
    };

    Periodic.isInitialized = true;
    window.Periodic = Periodic;

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Periodic.initAll());
    } else {
        Periodic.initAll();
    }

})(window);
