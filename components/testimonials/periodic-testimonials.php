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
 * Text Domain:       luiz0067-periodic
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
 * Enfileira os estilos locais compartilhados (Bootstrap 5 e Font Awesome 6).
 */
function periodic_testimonials_enqueue_dependencies() {
	if ( wp_style_is( 'periodic-vendor-bootstrap', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-bootstrap' );
	} elseif ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}

	if ( wp_style_is( 'periodic-vendor-fontawesome', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-fontawesome' );
	} elseif ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_testimonials_enqueue_dependencies' );
add_action( 'admin_enqueue_scripts', 'periodic_testimonials_enqueue_dependencies' );

/**
 * Registra o bloco Gutenberg.
 */
function periodic_testimonials_register_block() {
	// Registra o bloco a partir do metadata em block.json
	register_block_type( __DIR__ );

	// Vincula as traduções ao script do editor caso haja catálogo JSON
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-testimonials-editor-script',
			'luiz0067-periodic',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_testimonials_register_block' );
