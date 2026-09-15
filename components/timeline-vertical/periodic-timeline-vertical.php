<?php
/**
 * Plugin Name:       Periodic Timeline Vertical
 * Plugin URI:        https://github.com/periodicyahoo/periodic-timeline-vertical
 * Description:       Bloco Gutenberg de Linha do Tempo Vertical elegante com marcadores circulares, ícones Font Awesome 6, datas e cards de conteúdo alternados ou alinhados.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-timeline-vertical
 * Domain Path:       /languages
 *
 * GitHub:            https://github.com/periodicyahoo
 * LinkedIn:          https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package           Periodic_Timeline_Vertical
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enfileira os estilos globais necessários (Bootstrap 5 e Font Awesome 6).
 */
function periodic_timeline_vertical_enqueue_dependencies() {
	// Bootstrap 5 CSS (se não registrado previamente por tema/plugin)
	if ( ! wp_style_is( 'bootstrap-5', 'enqueued' ) && ! wp_style_is( 'bootstrap', 'enqueued' ) ) {
		wp_enqueue_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}

	// Font Awesome 6 Free CDN
	if ( ! wp_style_is( 'font-awesome-6', 'enqueued' ) && ! wp_style_is( 'font-awesome', 'enqueued' ) ) {
		wp_enqueue_style(
			'font-awesome-6',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
			array(),
			'6.5.2'
		);
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_timeline_vertical_enqueue_dependencies' );
add_action( 'admin_enqueue_scripts', 'periodic_timeline_vertical_enqueue_dependencies' );

/**
 * Carrega a internacionalização (i18n) do plugin.
 */
function periodic_timeline_vertical_load_textdomain() {
	load_plugin_textdomain(
		'periodic-timeline-vertical',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_timeline_vertical_load_textdomain' );

/**
 * Registra o bloco Gutenberg a partir do metadata em block.json.
 */
function periodic_timeline_vertical_register_block() {
	register_block_type( __DIR__ );

	// Habilita a tradução das strings no JavaScript do editor
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-timeline-vertical-editor-script',
			'periodic-timeline-vertical',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_timeline_vertical_register_block' );
