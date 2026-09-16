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
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           Periodic\SmartEssay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue Bootstrap 5 styles and scripts using local shared assets.
 */
function periodic_smart_essay_enqueue_bootstrap() {
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
add_action( 'init', 'periodic_smart_essay_enqueue_bootstrap' );

/**
 * Registers the block using metadata.
 */
function periodic_smart_essay_block_init() {
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
		wp_set_script_translations( 'periodic-smart-essay-editor-script', 'luiz0067-periodic', plugin_dir_path( __FILE__ ) . 'languages' );
		wp_set_script_translations( 'periodic-smart-essay-view-script', 'luiz0067-periodic', plugin_dir_path( __FILE__ ) . 'languages' );
	}
}
add_action( 'init', 'periodic_smart_essay_block_init' );
