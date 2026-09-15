/**
 * @fileoverview Periodic Counter Stats
 * @module Periodic.CounterStats
 * Smooth number ticker animation triggered upon viewport intersection.
 */

class PeriodicCounterStats {
    constructor(element) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        if (!this.element) return;
        this.target = parseFloat(this.element.getAttribute('data-periodic-target') || '100');
        this.duration = parseInt(this.element.getAttribute('data-periodic-duration') || '2000', 10);
        this.prefix = this.element.getAttribute('data-periodic-prefix') || '';
        this.suffix = this.element.getAttribute('data-periodic-suffix') || '';
        this.hasAnimated = false;
        this.observe();
    }

    observe() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animate();
                }
            });
        }, { threshold: 0.2 });
        observer.observe(this.element);
    }

    animate() {
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * this.target);
            this.element.textContent = `${this.prefix}${current.toLocaleString()}${this.suffix}`;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                this.element.textContent = `${this.prefix}${this.target.toLocaleString()}${this.suffix}`;
            }
        };
        requestAnimationFrame(update);
    }
}

window.PeriodicCounterStats = PeriodicCounterStats;
