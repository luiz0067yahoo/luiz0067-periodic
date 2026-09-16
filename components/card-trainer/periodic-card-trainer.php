<?php
/**
 * Plugin Name:       Periodic Card Trainer
 * Plugin URI:        https://github.com/periodicyahoo/periodic-card-trainer
 * Description:       Interactive Gutenberg block for Flashcards, Dialog Cards (3D flip), and Memory Game with Bootstrap 5.
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
 * Register block types and assets.
 */
function periodic_card_trainer_register_block() {
	// Register Bootstrap 5 CSS if not already present
	if ( ! wp_style_is( 'bootstrap-5', 'registered' ) && ! wp_style_is( 'bootstrap', 'registered' ) ) {
		$bootstrap_css = defined( 'PERIODIC_URL' ) ? PERIODIC_URL . 'shared/vendor/bootstrap/css/bootstrap.min.css' : plugins_url( '../../shared/vendor/bootstrap/css/bootstrap.min.css', __FILE__ );
		wp_register_style(
			'bootstrap-5',
			$bootstrap_css,
			array(),
			'5.3.3'
		);
	}

	// Register the block from block.json metadata
	register_block_type( __DIR__ );
}
add_action( 'init', 'periodic_card_trainer_register_block' );

/**
 * Enqueue scripts and styles for frontend and editor.
 */
function periodic_card_trainer_enqueue_assets() {
	if ( wp_style_is( 'periodic-vendor-bootstrap', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-bootstrap' );
	} elseif ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}

	// Provide localized translation data to the frontend view script
	$locale = determine_locale();
	$lang_code = 'pt-br';
	if ( strpos( $locale, 'en' ) === 0 ) {
		$lang_code = 'en-us';
	} elseif ( strpos( $locale, 'it' ) === 0 ) {
		$lang_code = 'it';
	} elseif ( strpos( $locale, 'es' ) === 0 ) {
		$lang_code = 'es';
	}

	$lang_file = plugin_dir_path( __FILE__ ) . 'languages/' . $lang_code . '.json';
	if ( file_exists( $lang_file ) ) {
		$translations = json_decode( file_get_contents( $lang_file ), true );
		wp_add_inline_script(
			'periodic-card-trainer-view-script',
			'window.PeriodicCardTrainerI18n = ' . wp_json_encode( $translations ) . ';',
			'before'
		);
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_card_trainer_enqueue_assets' );
add_action( 'admin_enqueue_scripts', 'periodic_card_trainer_enqueue_assets' );
