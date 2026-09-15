<?php
/**
 * Plugin Name:       Periodic Alert Callout
 * Plugin URI:        https://github.com/periodicyahoo/periodic-alert-callout
 * Description:       Plugin Gutenberg profissional para criação de alertas e callouts contextuais institucionais com Bootstrap 5 e Font Awesome 6.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-alert-callout
 * Domain Path:       /languages
 *
 * Autor: Luiz Fernando Brogliatto Ferreira
 * WordPress.org: https://profiles.wordpress.org/periodic/
 * GitHub: https://github.com/periodicyahoo
 * LinkedIn: https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package PeriodicAlertCallout
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registra os estilos e scripts de terceiros necessários (Bootstrap 5 e Font Awesome 6).
 */
function periodic_alert_callout_register_assets() {
	// Bootstrap 5.3.3 CSS.
	if ( ! wp_style_is( 'bootstrap', 'registered' ) && ! wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_register_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}

	// Bootstrap 5.3.3 Bundle JS (com Popper para dismiss dos alertas).
	if ( ! wp_script_is( 'bootstrap', 'registered' ) && ! wp_script_is( 'bootstrap-5-bundle', 'registered' ) ) {
		wp_register_script(
			'bootstrap-5-bundle',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
			array(),
			'5.3.3',
			true
		);
	}

	// Font Awesome 6.5.2 Free CSS.
	if ( ! wp_style_is( 'font-awesome', 'registered' ) && ! wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_register_style(
			'font-awesome-6',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
			array(),
			'6.5.2'
		);
	}
}
add_action( 'init', 'periodic_alert_callout_register_assets', 5 );

/**
 * Inicializa o bloco e carrega o domínio de tradução.
 */
function periodic_alert_callout_init() {
	// Carrega as traduções do plugin.
	load_plugin_textdomain(
		'periodic-alert-callout',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);

	// Registra o bloco baseado no block.json.
	register_block_type( __DIR__ );

	// Vincula as traduções ao script do editor gerado.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-alert-callout-editor-script',
			'periodic-alert-callout',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_alert_callout_init' );

/**
 * Enfileira Bootstrap e Font Awesome no editor Gutenberg para fidelidade visual absoluta (WYSIWYG).
 */
function periodic_alert_callout_enqueue_editor_assets() {
	wp_enqueue_style( 'bootstrap-5' );
	wp_enqueue_style( 'font-awesome-6' );
}
add_action( 'enqueue_block_editor_assets', 'periodic_alert_callout_enqueue_editor_assets' );

/**
 * Enfileira os scripts e estilos no frontend quando o bloco estiver presente na página.
 */
function periodic_alert_callout_enqueue_frontend_assets() {
	if ( ! is_admin() ) {
		wp_enqueue_style( 'bootstrap-5' );
		wp_enqueue_script( 'bootstrap-5-bundle' );
		wp_enqueue_style( 'font-awesome-6' );
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_alert_callout_enqueue_frontend_assets' );
