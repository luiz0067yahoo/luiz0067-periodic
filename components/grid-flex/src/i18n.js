/**
 * Internationalization helper for periodic Grid Flex
 */

import { __ } from '@wordpress/i18n';

/**
 * Translate string with priority:
 * 1. window.periodic_grid_flex_i18n localized dictionary
 * 2. Core wp.i18n.__ with textdomain
 * 3. Fallback string provided
 *
 * @param {string} key
 * @param {string} fallback
 * @returns {string}
 */
export function getI18nString( key, fallback = '' ) {
	if (
		typeof window !== 'undefined' &&
		window.periodic_grid_flex_i18n &&
		typeof window.periodic_grid_flex_i18n[ key ] === 'string'
	) {
		return window.periodic_grid_flex_i18n[ key ];
	}

	return __( fallback || key, 'periodic-grid-flex' );
}
