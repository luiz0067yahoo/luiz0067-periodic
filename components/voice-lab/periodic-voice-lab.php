<?php
/**
 * Plugin Name:       Periodic Voice Lab
 * Plugin URI:        https://github.com/periodicyahoo/periodic-voice-lab
 * Description:       Native browser voice laboratory for WordPress utilizing Web Audio API (.wav recorder) and Web Speech API (pronunciation validator with Levenshtein scoring).
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Periodic
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using metadata loaded from the `block.json` file.
 */
function periodic_voice_lab_block_init() {
    register_block_type( __DIR__ );
}
add_action( 'init', 'periodic_voice_lab_block_init' );

/**
 * Enqueue common assets (Bootstrap 5 styles, Font Awesome 6 icons) for editor & frontend using local shared assets.
 */
function periodic_voice_lab_enqueue_dependencies() {
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
}
add_action( 'wp_enqueue_scripts', 'periodic_voice_lab_enqueue_dependencies' );
add_action( 'admin_enqueue_scripts', 'periodic_voice_lab_enqueue_dependencies' );
