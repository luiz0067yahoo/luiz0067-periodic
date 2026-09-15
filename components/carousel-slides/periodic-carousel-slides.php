<?php
/**
 * Plugin Name:       periodic Carousel Slides
 * Plugin URI:        https://github.com/periodicyahoo/periodic-carousel-slides
 * Description:       WordPress Gutenberg Block for responsive Bootstrap 5 Carousels, compatible with any theme.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-carousel-slides
 *
 * @package           Periodic_Carousel_Slides
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue styles and scripts for block frontend and editor canvas
 */
function periodic_carousel_enqueue_block_assets() { 
	// Bootstrap 5 CSS (local)
	wp_enqueue_style( 'periodic-carousel-bootstrap', plugin_dir_url( __FILE__ ) . 'assets/bootstrap/css/bootstrap.min.css', array(), '5.3.8' );
	
	// Font Awesome (local)
	wp_enqueue_style( 'periodic-carousel-fontawesome', plugin_dir_url( __FILE__ ) . 'assets/fontawesome/css/all.min.css', array(), '6.5.2' );
	
	// Custom Plugin Styles
	wp_enqueue_style( 'periodic-carousel-style', plugin_dir_url( __FILE__ ) . 'style.css', array( 'periodic-carousel-bootstrap' ), '1.0.0' );

	// Bootstrap 5 JS Bundle (includes Popper, local)
	wp_enqueue_script( 'periodic-carousel-bootstrap-bundle', plugin_dir_url( __FILE__ ) . 'assets/bootstrap/js/bootstrap.bundle.min.js', array( 'jquery' ), '5.3.8', true );
}
// Enqueue on frontend and inside Gutenberg canvas iframe
add_action( 'enqueue_block_assets', 'periodic_carousel_enqueue_block_assets' );

/**
 * Register editor styles support for block themes / iframed Gutenberg canvas
 */
function periodic_carousel_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/bootstrap/css/bootstrap.min.css' );
	add_editor_style( 'assets/fontawesome/css/all.min.css' );
	add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'periodic_carousel_add_editor_styles' );

require_once plugin_dir_path( __FILE__ ) . 'plugin/settings.php';
require_once plugin_dir_path( __FILE__ ) . 'plugin/blocks.php';
