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
 * Text Domain:       periodic-card-wrapper
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
 * Enfileira os estilos de Bootstrap 5 e Font Awesome 6 de forma segura e não intrusiva.
 */
function periodic_card_wrapper_enqueue_assets() {
	// Bootstrap 5 CSS (caso não esteja previamente registrado pelo tema ou outro plugin).
	if ( ! wp_style_is( 'bootstrap', 'registered' ) && ! wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_register_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}

	// Font Awesome 6 Free CSS.
	if ( ! wp_style_is( 'font-awesome', 'registered' ) && ! wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_register_style(
			'font-awesome-6',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
			array(),
			'6.5.2'
		);
	}

	$bootstrap_handle = wp_style_is( 'bootstrap', 'registered' ) ? 'bootstrap' : 'bootstrap-5';
	$fa_handle        = wp_style_is( 'font-awesome', 'registered' ) ? 'font-awesome' : 'font-awesome-6';

	wp_enqueue_style( $bootstrap_handle );
	wp_enqueue_style( $fa_handle );
}
add_action( 'wp_enqueue_scripts', 'periodic_card_wrapper_enqueue_assets', 10 );
add_action( 'enqueue_block_editor_assets', 'periodic_card_wrapper_enqueue_assets', 10 );

/**
 * Registra o bloco usando a API de metadados block.json v3 e carrega os arquivos de tradução.
 */
function periodic_card_wrapper_init() {
	// Carrega o domínio de tradução para arquivos PHP/MO.
	load_plugin_textdomain(
		'periodic-card-wrapper',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);

	// Registra o bloco através do block.json.
	register_block_type( __DIR__ );

	// Configura as traduções do script do editor gerado pelo @wordpress/scripts.
	wp_set_script_translations(
		'periodic-card-wrapper-editor-script',
		'periodic-card-wrapper',
		PERIODIC_CARD_WRAPPER_PATH . 'languages'
	);
}
add_action( 'init', 'periodic_card_wrapper_init' );
