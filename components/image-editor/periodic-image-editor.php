<?php
/**
 * Plugin Name:       Periodic Image Editor
 * Plugin URI:        https://github.com/periodicyahoo/periodic-image-editor
 * Description:       Editor e enquadrador visual de imagem para Gutenberg com controles em tempo real de Zoom, Rotação e Posicionamento nos eixos X e Y.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-image-editor
 * Domain Path:       /languages
 *
 * GitHub:            https://github.com/periodicyahoo
 * LinkedIn:          https://www.linkedin.com/in/luiz-ferreira-260277379/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'PERIODIC_IMAGE_EDITOR_VERSION', '1.0.0' );
define( 'PERIODIC_IMAGE_EDITOR_PATH', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_IMAGE_EDITOR_URL', plugin_dir_url( __FILE__ ) );

/**
 * Carregamento das traduções (i18n).
 */
function periodic_image_editor_load_textdomain() {
	load_plugin_textdomain(
		'periodic-image-editor',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_image_editor_load_textdomain' );

/**
 * Registro do bloco a partir do block.json.
 */
function periodic_image_editor_register_block() {
	register_block_type_from_metadata( __DIR__ );

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-image-editor-editor-script',
			'periodic-image-editor',
			PERIODIC_IMAGE_EDITOR_PATH . 'languages'
		);
	}
}
add_action( 'init', 'periodic_image_editor_register_block' );

/**
 * Enfileiramento de bibliotecas externas (Font Awesome 6 e utilitários Bootstrap 5).
 */
function periodic_image_editor_enqueue_assets() {
	wp_enqueue_style(
		'font-awesome-6',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
		array(),
		'6.5.1'
	);
}
add_action( 'wp_enqueue_scripts', 'periodic_image_editor_enqueue_assets' );
add_action( 'admin_enqueue_scripts', 'periodic_image_editor_enqueue_assets' );
