<?php
/**
 * Plugin Name:       Periodic Interactive Utilities
 * Plugin URI:        https://github.com/periodic/periodic-interactive-utilities
 * Description:       Advanced Gutenberg block suite: Dynamic QR Code Generator, 24-door Advent Calendar with calendar-date locking and Bootstrap 5 modals, and AR Marker Trigger clues.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            periodic
 * Author URI:        https://github.com/periodic
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-interactive-utilities
 * Domain Path:       /languages
 *
 * @package PeriodicInteractiveUtilities
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Define Plugin Constants
 */
define( 'PERIODIC_IU_VERSION', '1.0.0' );
define( 'PERIODIC_IU_PATH', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_IU_URL', plugin_dir_url( __FILE__ ) );

/**
 * Load plugin textdomain for translations.
 * Uses standard WordPress Domain Path: /languages.
 */
function periodic_iu_load_textdomain() {
	load_plugin_textdomain(
		'periodic-interactive-utilities',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_iu_load_textdomain' );

/**
 * Enqueue global vendor dependencies (FontAwesome & Bootstrap 5 Modal assets)
 */
function periodic_iu_enqueue_assets() {
	// Font Awesome for door icons and status indicators
	wp_register_style(
		'periodic-iu-fontawesome',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
		array(),
		'6.5.1'
	);

	// Bootstrap 5 (CSS & JS) for responsive grids and native modals
	wp_register_style(
		'periodic-iu-bootstrap',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
		array(),
		'5.3.3'
	);
	wp_register_script(
		'periodic-iu-bootstrap-js',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
		array(),
		'5.3.3',
		true
	);

	// QR Code library
	wp_register_script(
		'periodic-iu-qrcode',
		PERIODIC_IU_URL . 'src/lib/qrcode.min.js',
		array(),
		PERIODIC_IU_VERSION,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'periodic_iu_enqueue_assets' );
add_action( 'admin_enqueue_scripts', 'periodic_iu_enqueue_assets' );

/**
 * Enqueue editor preview assets
 */
function periodic_iu_admin_preview_assets() {
	wp_enqueue_style( 'periodic-iu-fontawesome' );
	wp_enqueue_script( 'periodic-iu-qrcode' );
}
add_action( 'admin_enqueue_scripts', 'periodic_iu_admin_preview_assets' );

/**
 * Register Gutenberg Block
 */
function periodic_iu_register_block() {
	if ( function_exists( 'register_block_type_from_metadata' ) ) {
		register_block_type_from_metadata(
			__DIR__,
			array(
				'render_callback' => 'periodic_iu_render_block_fallback',
			)
		);
	}
}
add_action( 'init', 'periodic_iu_register_block' );

/**
 * Fallback dynamic render callback if block is rendered server-side
 */
function periodic_iu_render_block_fallback( $attributes, $content ) {
	// If saved static content exists, return it with enqueued assets
	if ( ! empty( $content ) ) {
		wp_enqueue_style( 'periodic-iu-fontawesome' );
		wp_enqueue_style( 'periodic-iu-bootstrap' );
		wp_enqueue_script( 'periodic-iu-bootstrap-js' );
		wp_enqueue_script( 'periodic-iu-qrcode' );
		return $content;
	}
	return '';
}

/**
 * Pass translation strings to block script
 */
function periodic_iu_set_script_translations() {
	wp_set_script_translations(
		'periodic-interactive-utilities-editor-script',
		'periodic-interactive-utilities',
		PERIODIC_IU_PATH . 'languages'
	);
}
add_action( 'init', 'periodic_iu_set_script_translations' );
