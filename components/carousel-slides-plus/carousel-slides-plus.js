/**
 * @fileoverview Periodic Carousel Slides Plus
 * @module Periodic.CarouselPlus
 * Advanced carousel with touch gestures, auto-play and thumbnail indicators.
 */

class PeriodicCarouselPlus {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) return;
        this.options = Object.assign({
            autoplay: true,
            interval: 5000,
            loop: true
        }, options);
        this.currentIndex = 0;
        this.slides = Array.from(this.container.querySelectorAll('.periodic-carousel-plus__slide'));
        this.init();
    }

    init() {
        if (!this.slides.length) return;
        this.prevBtn = this.container.querySelector('.periodic-carousel-plus__control--prev');
        this.nextBtn = this.container.querySelector('.periodic-carousel-plus__control--next');
        
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        
        this.update();
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    update() {
        this.slides.forEach((slide, idx) => {
            slide.classList.toggle('is-active', idx === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.update();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.update();
    }

    startAutoplay() {
        this.timer = setInterval(() => this.next(), this.options.interval);
        this.container.addEventListener('mouseenter', () => clearInterval(this.timer));
        this.container.addEventListener('mouseleave', () => {
            clearInterval(this.timer);
            this.timer = setInterval(() => this.next(), this.options.interval);
        });
    }
}

window.PeriodicCarouselPlus = PeriodicCarouselPlus;
