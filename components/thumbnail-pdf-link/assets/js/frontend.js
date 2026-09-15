/**
 * periodic Mini PDF Image - Frontend Scripts
 *
 * @package Periodic_Mini_PDF_Image
 */

(function () {
  'use strict';

  function initPdfCards() {
    // Check if aspect-ratio is supported natively
    var supportsAspectRatio =
      window.CSS &&
      window.CSS.supports &&
      window.CSS.supports('aspect-ratio', '1 / 1');

    if (!supportsAspectRatio) {
      // Fallback calculation for older browsers
      var squareElements = document.querySelectorAll(
        '.periodic-pdf-thumb-link.ratio-square, .height-square'
      );
      for (var i = 0; i < squareElements.length; i++) {
        var el = squareElements[i];
        var width = el.getBoundingClientRect().width;
        if (width > 0) {
          el.style.height = width + 'px';
        }
      }
    }

    // Accessible card click enhancement:
    // If user clicks anywhere on the card outside of a direct link, trigger the primary link.
    var cards = document.querySelectorAll('.periodic-pdf-card');
    cards.forEach(function (card) {
      if (card.dataset.periodicBound) return;
      card.dataset.periodicBound = 'true';

      card.addEventListener('click', function (e) {
        // If the click target is already an anchor or inside one, let it proceed normally
        if (e.target.closest('a')) {
          return;
        }

        var primaryLink = card.querySelector('.periodic-pdf-thumb-link');
        if (primaryLink && primaryLink.href && primaryLink.href !== '#') {
          var target = primaryLink.getAttribute('target');
          if (target === '_blank') {
            window.open(primaryLink.href, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = primaryLink.href;
          }
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPdfCards);
  } else {
    initPdfCards();
  }

  // Handle window resize with debouncing for fallback
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initPdfCards, 150);
  });
})();
