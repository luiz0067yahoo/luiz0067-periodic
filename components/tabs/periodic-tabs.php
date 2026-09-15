<?php
/**
 * Plugin Name:       Periodic Tabs (Bootstrap 5 & Font Awesome 6)
 * Plugin URI:        https://github.com/periodicyahoo/periodic-tabs
 * Description:       Bloco Gutenberg profissional para abas e pílulas responsivas utilizando Bootstrap 5 e Font Awesome 6 com renderização nativa e suporte horizontal/vertical.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-tabs
 * Domain Path:       /languages
 *
 * Links do Autor:
 * WordPress.org: https://profiles.wordpress.org/periodic/
 * GitHub:        https://github.com/periodicyahoo
 * LinkedIn:      https://www.linkedin.com/in/luiz-ferreira-260277379/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Carrega a internacionalização do plugin.
 */
function periodic_tabs_load_textdomain() {
	load_plugin_textdomain(
		'periodic-tabs',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', 'periodic_tabs_load_textdomain' );

/**
 * Registra bibliotecas de terceiros (Bootstrap 5 e Font Awesome 6) com prevenção de duplicidade.
 */
function periodic_tabs_register_vendor_assets() {
	// Bootstrap 5 CSS
	if ( ! wp_style_is( 'bootstrap-5', 'registered' ) && ! wp_style_is( 'bootstrap', 'registered' ) ) {
		wp_register_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}

	// Bootstrap 5 JS Bundle (com Popper)
	if ( ! wp_script_is( 'bootstrap-5', 'registered' ) && ! wp_script_is( 'bootstrap', 'registered' ) ) {
		wp_register_script(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
			array(),
			'5.3.3',
			true
		);
	}

	// Font Awesome 6 CSS
	if ( ! wp_style_is( 'font-awesome-6', 'registered' ) && ! wp_style_is( 'font-awesome', 'registered' ) ) {
		wp_register_style(
			'font-awesome-6',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
			array(),
			'6.5.2'
		);
	}
}
add_action( 'init', 'periodic_tabs_register_vendor_assets', 5 );

/**
 * Enfileira Bootstrap e Font Awesome no frontend quando o bloco estiver em uso ou por padrão.
 */
function periodic_tabs_enqueue_frontend_assets() {
	if ( has_block( 'periodic/tabs' ) || is_admin() ) {
		if ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
			wp_enqueue_style( 'bootstrap-5' );
		}
		if ( wp_script_is( 'bootstrap-5', 'registered' ) ) {
			wp_enqueue_script( 'bootstrap-5' );
		}
		if ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
			wp_enqueue_style( 'font-awesome-6' );
		}
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_tabs_enqueue_frontend_assets' );

/**
 * Enfileira Bootstrap e Font Awesome no editor Gutenberg para fidelidade visual WYSIWYG.
 */
function periodic_tabs_enqueue_editor_assets() {
	if ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}
	if ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}
}
add_action( 'enqueue_block_editor_assets', 'periodic_tabs_enqueue_editor_assets' );

/**
 * Inicialização e registro do bloco Gutenberg via metadata block.json.
 */
function periodic_tabs_register_block() {
	register_block_type( __DIR__ );

	// Vincula arquivos de tradução Jed/Gutenberg ao script do editor
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-tabs-editor-script',
			'periodic-tabs',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_tabs_register_block', 10 );
