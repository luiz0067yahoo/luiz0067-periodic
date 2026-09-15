<?php
/**
 * Plugin Name:       Periodic Testimonials
 * Plugin URI:        https://github.com/periodicyahoo/periodic-testimonials
 * Description:       Bloco Gutenberg de Depoimentos responsivo com cards Bootstrap 5, classificação por estrelas Font Awesome 6, fotos de perfil arredondadas e suporte WYSIWYG nativo.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-testimonials
 * Domain Path:       /languages
 *
 * GitHub:            https://github.com/periodicyahoo
 * LinkedIn:          https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package           Periodic_Testimonials
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enfileira os estilos globais necessários (Bootstrap 5 e Font Awesome 6).
 */
function periodic_testimonials_enqueue_dependencies() {
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
add_action( 'wp_enqueue_scripts', 'periodic_testimonials_enqueue_dependencies' );
add_action( 'admin_enqueue_scripts', 'periodic_testimonials_enqueue_dependencies' );

/**
 * Carrega a internacionalização (i18n) e registra o bloco Gutenberg.
 */
function periodic_testimonials_register_block() {
	// Carrega arquivo de tradução do plugin
	load_plugin_textdomain(
		'periodic-testimonials',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);

	// Registra o bloco a partir do metadata em block.json
	register_block_type( __DIR__ );

	// Vincula as traduções ao script do editor caso haja catálogo JSON
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-testimonials-editor-script',
			'periodic-testimonials',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_testimonials_register_block' );
