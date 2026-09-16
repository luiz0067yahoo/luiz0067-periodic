<?php
/**
 * Plugin Name:       Periodic Media Hotspot
 * Plugin URI:        https://github.com/periodic/periodic-media-hotspot
 * Description:       Interactive percentage Hotspots, Agamotto Layer Sliders, and 360 Panorama with Bootstrap 5 modals and Font Awesome pulsating markers.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Gutenberg Block
 */
function periodic_media_hotspot_register_block() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'periodic_media_hotspot_register_block' );

/**
 * Enqueue Font Awesome and Bootstrap 5 for Frontend & Editor using local shared assets
 */
function periodic_media_hotspot_enqueue_dependencies() {
	if ( wp_style_is( 'periodic-vendor-fontawesome', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-fontawesome' );
	} elseif ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}

	if ( wp_style_is( 'periodic-vendor-bootstrap', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-bootstrap' );
	} elseif ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}

	if ( wp_script_is( 'periodic-vendor-bootstrap-js', 'registered' ) ) {
		wp_enqueue_script( 'periodic-vendor-bootstrap-js' );
	} elseif ( wp_script_is( 'bootstrap-5-bundle', 'registered' ) ) {
		wp_enqueue_script( 'bootstrap-5-bundle' );
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_media_hotspot_enqueue_dependencies' );
add_action( 'enqueue_block_editor_assets', 'periodic_media_hotspot_enqueue_dependencies' );
