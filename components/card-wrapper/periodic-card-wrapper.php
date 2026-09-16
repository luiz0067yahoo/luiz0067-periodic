<?php
/**
 * Plugin Name:       Periodic Card Wrapper
 * Plugin URI:        https://github.com/periodicyahoo/periodic-card-wrapper
 * Description:       Bloco estrutural de Cartão Bootstrap 5 completo para WordPress/Gutenberg com suporte a InnerBlocks, cabeçalho, corpo e rodapé personalizáveis.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * Author Socials:
 * - WordPress.org:   https://profiles.wordpress.org/periodic/
 * - GitHub:          https://github.com/periodicyahoo
 * - LinkedIn:        https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package Periodic\CardWrapper
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Constantes do Plugin.
define( 'PERIODIC_CARD_WRAPPER_VERSION', '1.0.0' );
define( 'PERIODIC_CARD_WRAPPER_PATH', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_CARD_WRAPPER_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enfileira os estilos de Bootstrap 5 e Font Awesome 6 de forma local e segura.
 */
function periodic_card_wrapper_enqueue_assets() {
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
add_action( 'wp_enqueue_scripts', 'periodic_card_wrapper_enqueue_assets', 10 );
add_action( 'enqueue_block_editor_assets', 'periodic_card_wrapper_enqueue_assets', 10 );

/**
 * Registra o bloco usando a API de metadados block.json v3.
 */
function periodic_card_wrapper_init() {
	// Registra o bloco através do block.json.
	register_block_type( __DIR__ );

	// Configura as traduções do script do editor gerado pelo @wordpress/scripts.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-card-wrapper-editor-script',
			'luiz0067-periodic',
			PERIODIC_CARD_WRAPPER_PATH . 'languages'
		);
	}
}
add_action( 'init', 'periodic_card_wrapper_init' );
