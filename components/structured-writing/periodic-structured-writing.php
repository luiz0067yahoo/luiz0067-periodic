<?php
/**
 * Plugin Name:       Periodic Structured Writing
 * Plugin URI:        https://github.com/periodicyahoo/periodic-structured-writing
 * Description:       Guia a escrita do usuário em seções estruturadas (Notas Cornell, Escrita Passo a Passo e Relatório Técnico) com salvamento no LocalStorage, cópia formatada e exportação/impressão em PDF.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Luiz
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           Periodic\StructuredWriting
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue Bootstrap 5 styles and scripts using local shared assets.
 */
function periodic_structured_writing_enqueue_bootstrap() {
	if ( ! wp_style_is( 'bootstrap', 'registered' ) && ! wp_style_is( 'bootstrap-5', 'registered' ) ) {
		$bootstrap_css = defined( 'PERIODIC_URL' ) ? PERIODIC_URL . 'shared/vendor/bootstrap/css/bootstrap.min.css' : plugins_url( '../../shared/vendor/bootstrap/css/bootstrap.min.css', __FILE__ );
		wp_register_style(
			'bootstrap-5',
			$bootstrap_css,
			array(),
			'5.3.3'
		);
	}

	if ( ! wp_script_is( 'bootstrap', 'registered' ) && ! wp_script_is( 'bootstrap-5', 'registered' ) ) {
		$bootstrap_js = defined( 'PERIODIC_URL' ) ? PERIODIC_URL . 'shared/vendor/bootstrap/js/bootstrap.bundle.min.js' : plugins_url( '../../shared/vendor/bootstrap/js/bootstrap.bundle.min.js', __FILE__ );
		wp_register_script(
			'bootstrap-5',
			$bootstrap_js,
			array(),
			'5.3.3',
			true
		);
	}
}
add_action( 'init', 'periodic_structured_writing_enqueue_bootstrap' );

/**
 * Registers the block using metadata.
 */
function periodic_structured_writing_block_init() {
	$build_path = __DIR__ . '/build';
	if ( file_exists( $build_path . '/block.json' ) ) {
		register_block_type( $build_path );
	} else {
		register_block_type( __DIR__ . '/src' );
	}

	// Make sure bootstrap 5 is enqueued on frontend and editor
	if ( wp_style_is( 'periodic-vendor-bootstrap', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-bootstrap' );
	} elseif ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}

	if ( wp_script_is( 'periodic-vendor-bootstrap-js', 'registered' ) ) {
		wp_enqueue_script( 'periodic-vendor-bootstrap-js' );
	} elseif ( wp_script_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_script( 'bootstrap-5' );
	}

	// Register block script translations
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'periodic-structured-writing-editor-script', 'luiz0067-periodic', plugin_dir_path( __FILE__ ) . 'languages' );
		wp_set_script_translations( 'periodic-structured-writing-view-script', 'luiz0067-periodic', plugin_dir_path( __FILE__ ) . 'languages' );
	}
}
add_action( 'init', 'periodic_structured_writing_block_init' );
