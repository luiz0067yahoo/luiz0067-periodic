/**
 * Antigravity Prompt / Floating Cards - Frontend Script
 * Package: Periodic_Topic_Title_Text
 * Interactivity: Clipboard Copy, Micro-interactions, Accessibility
 */

(function () {
	'use strict';

	/**
	 * Copy text to clipboard with modern API and fallback support.
	 */
	function copyTextToClipboard(text, callback) {
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard.writeText(text).then(
				function () { callback(true); },
				function () { fallbackCopyTextToClipboard(text, callback); }
			);
		} else {
			fallbackCopyTextToClipboard(text, callback);
		}
	}

	/**
	 * Fallback using textarea execCommand for non-HTTPS or legacy environments.
	 */
	function fallbackCopyTextToClipboard(text, callback) {
		var textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.top = '-9999px';
		textArea.style.left = '-9999px';
		textArea.setAttribute('readonly', '');
		document.body.appendChild(textArea);
		textArea.select();

		var successful = false;
		try {
			successful = document.execCommand('copy');
		} catch (err) {
			successful = false;
		}

		document.body.removeChild(textArea);
		if (callback) {
			callback(successful);
		}
	}

	/**
	 * Initialize event delegation for interactive actions
	 */
	function initAntigravityCards() {
		document.addEventListener('click', function (event) {
			var copyBtn = event.target.closest('[data-antigravity-action="copy"]');
			if (!copyBtn) {
				return;
			}

			event.preventDefault();

			var actionWrapper = copyBtn.closest('.antigravity-card-action');
			var cardFloat = copyBtn.closest('.antigravity-card-float');

			// Determine text to copy: explicit data-prompt or fallback to card description
			var textToCopy = copyBtn.getAttribute('data-prompt');
			if (!textToCopy || textToCopy.trim().length === 0) {
				if (cardFloat) {
					var contentEl = cardFloat.querySelector('.antigravity-card-content');
					if (contentEl) {
						textToCopy = contentEl.innerText || contentEl.textContent || '';
					}
				}
			}

			if (!textToCopy) {
				return;
			}

			copyTextToClipboard(textToCopy.trim(), function (success) {
				if (!success || !actionWrapper) {
					return;
				}

				// Trigger visual feedback toast
				actionWrapper.classList.add('copied');

				// Clear existing timer if any
				if (actionWrapper._copyTimer) {
					clearTimeout(actionWrapper._copyTimer);
				}

				actionWrapper._copyTimer = setTimeout(function () {
					actionWrapper.classList.remove('copied');
					actionWrapper._copyTimer = null;
				}, 2200);
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAntigravityCards);
	} else {
		initAntigravityCards();
	}
})();
