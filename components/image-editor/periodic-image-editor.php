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
 * Text Domain:       luiz0067-periodic
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
 * Registro do bloco a partir do block.json.
 */
function periodic_image_editor_register_block() {
	register_block_type_from_metadata( __DIR__ );

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-image-editor-editor-script',
			'luiz0067-periodic',
			PERIODIC_IMAGE_EDITOR_PATH . 'languages'
		);
	}
}
add_action( 'init', 'periodic_image_editor_register_block' );

/**
 * Enfileiramento de bibliotecas compartilhadas locais (Font Awesome 6).
 */
function periodic_image_editor_enqueue_assets() {
	if ( wp_style_is( 'periodic-vendor-fontawesome', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-fontawesome' );
	} elseif ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_image_editor_enqueue_assets' );
add_action( 'admin_enqueue_scripts', 'periodic_image_editor_enqueue_assets' );
