<?php
/**
 * Plugin Name:       periodic Mini PDF Image
 * Plugin URI:        https://github.com/periodicyahoo/periodic-thumbnail-pdf-link
 * Description:       WordPress Gutenberg Block for responsive PDF document cards and image thumbnails, with automatic PDF page preview and customizable layouts.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      6.7
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 *
 * @package           Periodic_Mini_PDF_Image
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue styles and scripts for block frontend and editor canvas
 */
function periodic_mini_pdf_enqueue_block_assets() {
	$base_url  = plugin_dir_url( __FILE__ );
	$base_path = plugin_dir_path( __FILE__ );

	// Frontend and Canvas Style
	$style_css = $base_path . 'assets/css/style.css';
	if ( file_exists( $style_css ) ) {
		wp_enqueue_style(
			'periodic-mini-pdf-style',
			$base_url . 'assets/css/style.css',
			array(),
			filemtime( $style_css )
		);
	}

	// Frontend Script
	$frontend_js = $base_path . 'assets/js/frontend.js';
	if ( file_exists( $frontend_js ) ) {
		wp_enqueue_script(
			'periodic-mini-pdf-frontend',
			$base_url . 'assets/js/frontend.js',
			array(),
			filemtime( $frontend_js ),
			true
		);
	}
}
add_action( 'enqueue_block_assets', 'periodic_mini_pdf_enqueue_block_assets' );

/**
 * Register editor styles support for block themes / iframed Gutenberg canvas
 */
function periodic_mini_pdf_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/style.css' );
	add_editor_style( 'assets/css/editor.css' );
}
add_action( 'after_setup_theme', 'periodic_mini_pdf_add_editor_styles' );

// Include Settings and Blocks modules
require_once plugin_dir_path( __FILE__ ) . 'plugin/settings.php';
require_once plugin_dir_path( __FILE__ ) . 'plugin/blocks.php';
