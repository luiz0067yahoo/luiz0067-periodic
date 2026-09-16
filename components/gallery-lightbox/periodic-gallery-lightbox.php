<?php
/**
 * Plugin Name:       Periodic Gallery Lightbox
 * Plugin URI:        https://github.com/periodicyahoo/periodic-gallery-lightbox
 * Description:       Galeria de imagens responsiva com popup lightbox em tela cheia estilo LC-Lightbox em Vanilla JS, miniaturas deslizantes, zoom e layout Bootstrap 5 com Font Awesome 6.
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
 * Metadados de Autoria:
 * - Autor: Luiz Fernando Brogliatto Ferreira
 * - WordPress.org: https://profiles.wordpress.org/periodic/
 * - GitHub: https://github.com/periodicyahoo
 * - LinkedIn: https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package Periodic\GalleryLightbox
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Encerra a execução caso acessado diretamente.
}

/**
 * Constantes do Plugin.
 */
define( 'PERIODIC_GALLERY_LIGHTBOX_VERSION', '1.0.0' );
define( 'PERIODIC_GALLERY_LIGHTBOX_DIR', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_GALLERY_LIGHTBOX_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enfileira bibliotecas essenciais locais (Bootstrap 5 e Font Awesome 6 Free).
 */
function periodic_gallery_lightbox_enqueue_shared_assets() {
	if ( wp_style_is( 'periodic-vendor-fontawesome', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-fontawesome' );
	} elseif ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}

	if ( wp_style_is( 'periodic-vendor-bootstrap', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-bootstrap' );
	} elseif ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_gallery_lightbox_enqueue_shared_assets', 5 );
add_action( 'enqueue_block_editor_assets', 'periodic_gallery_lightbox_enqueue_shared_assets', 5 );

/**
 * Inicialização do bloco e registro via block.json.
 */
function periodic_gallery_lightbox_block_init() {
	// Registra o bloco a partir dos metadados do block.json.
	$block = register_block_type_from_metadata( __DIR__ );

	// Vincula o arquivo de tradução do editor de blocos.
	if ( $block && function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-gallery-lightbox-editor-script',
			'luiz0067-periodic',
			PERIODIC_GALLERY_LIGHTBOX_DIR . 'languages'
		);
	}
}
add_action( 'init', 'periodic_gallery_lightbox_block_init' );
