<?php
/**
 * Plugin Name:       Periodic Code
 * Plugin URI:        https://github.com/periodicyahoo/periodic-code
 * Description:       Native Gutenberg code editor block with authorial syntax highlighting, multi-language, and theming support.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-code
 * Domain Path:       /languages
 *
 * @package           PeriodicCode
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function periodic_code_init() {
	// Register the block from metadata
	register_block_type( __DIR__ );

	// Set script translations for Gutenberg i18n
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-code-editor-script',
			'periodic-code',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_code_init' );

/**
 * Load plugin textdomain for internationalization.
 */
function periodic_code_load_textdomain() {
	load_plugin_textdomain(
		'periodic-code',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', 'periodic_code_load_textdomain' );
