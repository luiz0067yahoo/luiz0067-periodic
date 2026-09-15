/**
 * Internationalization helper for periodic Section Container
 */

import { __ } from '@wordpress/i18n';

/**
 * Translate string with priority:
 * 1. window.periodic_section_container_i18n localized dictionary
 * 2. Core wp.i18n.__ with textdomain
 * 3. Fallback string provided
 *
 * @param {string} key
 * @param {string} fallback
 * @returns {string}
 */
export function getI18nString(key, fallback = '') {
	if (
		typeof window !== 'undefined' &&
		window.periodic_section_container_i18n &&
		typeof window.periodic_section_container_i18n[key] === 'string'
	) {
		return window.periodic_section_container_i18n[key];
	}

	return __(fallback, 'periodic-section-container');
}
