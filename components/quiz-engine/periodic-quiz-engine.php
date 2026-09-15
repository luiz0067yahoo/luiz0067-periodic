<?php
/**
 * Plugin Name:       periodic Quiz Engine
 * Plugin URI:        https://github.com/periodicyahoo/periodic-quiz-engine
 * Description:       WordPress Gutenberg Block for interactive quizzes, tests, assessments and surveys with Bootstrap 5 and Font Awesome 6.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-quiz-engine
 *
 * @package           Periodic_Quiz_Engine
 */

// Exit if accessed directly.
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
function periodic_quiz_engine_register_block() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'periodic_quiz_engine_register_block' );

/**
 * Enqueue common assets (Bootstrap 5 & Font Awesome 6) for block frontend and editor canvas
 */
function periodic_quiz_engine_enqueue_block_assets() {
	// Bootstrap 5 CSS (local bundle)
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'assets/bootstrap/css/bootstrap.min.css' ) ) {
		wp_enqueue_style(
			'periodic-quiz-bootstrap',
			plugin_dir_url( __FILE__ ) . 'assets/bootstrap/css/bootstrap.min.css',
			array(),
			'5.3.8'
		);
	}

	// Font Awesome 6 (local bundle)
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'assets/fontawesome/css/all.min.css' ) ) {
		wp_enqueue_style(
			'periodic-quiz-fontawesome',
			plugin_dir_url( __FILE__ ) . 'assets/fontawesome/css/all.min.css',
			array(),
			'6.5.2'
		);
	}

	// Bootstrap 5 JS Bundle (includes Popper, local bundle)
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'assets/bootstrap/js/bootstrap.bundle.min.js' ) ) {
		wp_enqueue_script(
			'periodic-quiz-bootstrap-bundle',
			plugin_dir_url( __FILE__ ) . 'assets/bootstrap/js/bootstrap.bundle.min.js',
			array(),
			'5.3.8',
			true
		);
	}
}
add_action( 'enqueue_block_assets', 'periodic_quiz_engine_enqueue_block_assets' );

/**
 * Register editor styles support for block themes and Gutenberg iframe canvas
 */
function periodic_quiz_engine_add_editor_styles() {
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
add_action( 'after_setup_theme', 'periodic_quiz_engine_add_editor_styles' );

/**
 * Load plugin text domain for internationalization
 */
function periodic_quiz_engine_load_textdomain() {
	load_plugin_textdomain(
		'periodic-quiz-engine',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_quiz_engine_load_textdomain' );
