/**
 * @fileoverview Periodic Icons Component
 * @module Periodic.Icons
 * Lightweight SVG & FontAwesome icon helper and renderer.
 */

class PeriodicIcons {
    static render(name, size = '1em', color = 'currentColor') {
        const span = document.createElement('span');
        span.className = `periodic-icon periodic-icon--${name}`;
        span.style.fontSize = size;
        span.style.color = color;
        span.innerHTML = `<i class="fa-solid fa-${name}"></i>`;
        return span;
    }
}

window.PeriodicIcons = PeriodicIcons;
