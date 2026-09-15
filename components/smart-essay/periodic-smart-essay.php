<?php
/**
 * Plugin Name:       Periodic Smart Essay
 * Plugin URI:        https://github.com/periodic/periodic-smart-essay
 * Description:       Área de redação para submissão do aluno com pontuação automática baseada em palavras-chave obrigatórias, contagem mínima de palavras e densidade lexical. Padrão Bootstrap 5 e JS puro.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Luiz
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-smart-essay
 * Domain Path:       /languages
 *
 * @package           Periodic\SmartEssay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue Bootstrap 5 styles and scripts if not already registered or enqueued.
 */
function periodic_smart_essay_enqueue_bootstrap() {
	if ( ! wp_style_is( 'bootstrap', 'registered' ) && ! wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_register_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}

	if ( ! wp_script_is( 'bootstrap', 'registered' ) && ! wp_script_is( 'bootstrap-5', 'registered' ) ) {
		wp_register_script(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
			array(),
			'5.3.3',
			true
		);
	}
}
add_action( 'init', 'periodic_smart_essay_enqueue_bootstrap' );

/**
 * Registers the block using the metadata loaded from the `build/block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function periodic_smart_essay_block_init() {
	$build_path = __DIR__ . '/build';
	if ( file_exists( $build_path . '/block.json' ) ) {
		register_block_type( $build_path );
	} else {
		register_block_type( __DIR__ . '/src' );
	}

	// Make sure bootstrap 5 is enqueued on frontend and editor
	if ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}
	if ( wp_script_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_script( 'bootstrap-5' );
	}

	// Register block script translations
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'periodic-smart-essay-editor-script', 'periodic-smart-essay', plugin_dir_path( __FILE__ ) . 'languages' );
		wp_set_script_translations( 'periodic-smart-essay-view-script', 'periodic-smart-essay', plugin_dir_path( __FILE__ ) . 'languages' );
	}
}
add_action( 'init', 'periodic_smart_essay_block_init' );

/**
 * Load plugin textdomain for internationalization.
 */
function periodic_smart_essay_load_textdomain() {
	load_plugin_textdomain(
		'periodic-smart-essay',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', 'periodic_smart_essay_load_textdomain' );
