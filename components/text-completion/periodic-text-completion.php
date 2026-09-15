<?php
/**
 * Plugin Name:       periodic Text Completion
 * Plugin URI:        https://github.com/periodicyahoo/periodic-text-completion
 * Description:       Interactive text completion (fill in the blanks) and dictation Gutenberg block with Bootstrap 5 and Vanilla JS.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-text-completion
 * Domain Path:       /languages
 *
 * @package           Periodic_Text_Completion
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using metadata from `block.json`.
 */
function periodic_text_completion_register_block() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'periodic_text_completion_register_block' );

/**
 * Enqueue common assets (Bootstrap 5 & Font Awesome 6) for block frontend and editor canvas
 */
function periodic_text_completion_enqueue_block_assets() {
	// Bootstrap 5 CSS
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'assets/bootstrap/css/bootstrap.min.css' ) ) {
		wp_enqueue_style(
			'periodic-completion-bootstrap',
			plugin_dir_url( __FILE__ ) . 'assets/bootstrap/css/bootstrap.min.css',
			array(),
			'5.3.8'
		);
	}

	// Font Awesome 6
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'assets/fontawesome/css/all.min.css' ) ) {
		wp_enqueue_style(
			'periodic-completion-fontawesome',
			plugin_dir_url( __FILE__ ) . 'assets/fontawesome/css/all.min.css',
			array(),
			'6.5.2'
		);
	}

	// Bootstrap 5 JS Bundle (with Popper)
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'assets/bootstrap/js/bootstrap.bundle.min.js' ) ) {
		wp_enqueue_script(
			'periodic-completion-bootstrap-bundle',
			plugin_dir_url( __FILE__ ) . 'assets/bootstrap/js/bootstrap.bundle.min.js',
			array(),
			'5.3.8',
			true
		);
	}
}
add_action( 'enqueue_block_assets', 'periodic_text_completion_enqueue_block_assets' );

/**
 * Register editor styles support for Gutenberg iframe canvas
 */
function periodic_text_completion_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/bootstrap/css/bootstrap.min.css' );
	add_editor_style( 'assets/fontawesome/css/all.min.css' );
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'build/style-index.css' ) ) {
		add_editor_style( 'build/style-index.css' );
	}
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'build/index.css' ) ) {
		add_editor_style( 'build/index.css' );
	}
}
add_action( 'after_setup_theme', 'periodic_text_completion_add_editor_styles' );

/**
 * Load plugin text domain for internationalization
 */
function periodic_text_completion_load_textdomain() {
	$loaded = load_plugin_textdomain(
		'periodic-text-completion',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
	if ( ! $loaded ) {
		load_plugin_textdomain(
			'periodic-text-completion',
			false,
			dirname( plugin_basename( __FILE__ ) ) . '/languagens'
		);
	}
}
add_action( 'init', 'periodic_text_completion_load_textdomain' );
