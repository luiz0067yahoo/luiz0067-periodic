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
 * Text Domain:       periodic-voice-lab
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
 * Enqueue common assets (Bootstrap 5 styles, Font Awesome 6 icons) for editor & frontend.
 */
function periodic_voice_lab_enqueue_dependencies() {
    // Font Awesome 6
    wp_register_style(
        'font-awesome-6',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        array(),
        '6.5.1'
    );
    wp_enqueue_style( 'font-awesome-6' );

    // Bootstrap 5 Buttons & Grid utility subset
    wp_register_style(
        'bootstrap-5-core',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        array(),
        '5.3.3'
    );
    wp_enqueue_style( 'bootstrap-5-core' );
}
add_action( 'wp_enqueue_scripts', 'periodic_voice_lab_enqueue_dependencies' );
add_action( 'admin_enqueue_scripts', 'periodic_voice_lab_enqueue_dependencies' );

/**
 * Load plugin text domain for internationalization.
 */
function periodic_voice_lab_load_textdomain() {
    load_plugin_textdomain(
        'periodic-voice-lab',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'init', 'periodic_voice_lab_load_textdomain' );
