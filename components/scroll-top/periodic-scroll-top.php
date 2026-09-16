<?php
/**
 * Plugin Name:       Periodic Scroll Top
 * Plugin URI:        https://github.com/periodicyahoo/periodic-scroll-top
 * Description:       Botão flutuante para voltar ao topo da página com rolagem suave (window.scrollTo({ top: 0, behavior: 'smooth' })), visível apenas após rolar determinada distância da página.
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
 * @package Periodic\ScrollTop
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Encerra execução se acessado diretamente.
}

/**
 * Constantes do Plugin.
 */
define( 'PERIODIC_SCROLL_TOP_VERSION', '1.0.0' );
define( 'PERIODIC_SCROLL_TOP_DIR', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_SCROLL_TOP_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enfileira bibliotecas essenciais locais (Bootstrap 5 e Font Awesome 6 Free).
 */
function periodic_scroll_top_enqueue_shared_assets() {
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
add_action( 'wp_enqueue_scripts', 'periodic_scroll_top_enqueue_shared_assets', 20 );
add_action( 'enqueue_block_editor_assets', 'periodic_scroll_top_enqueue_shared_assets', 20 );

/**
 * Registra o bloco Gutenberg a partir do arquivo block.json e inicializa as traduções.
 */
function periodic_scroll_top_block_init() {
	// Registra o bloco via block.json
	register_block_type( __DIR__ );

	// Vincula arquivos de tradução aos scripts compilados
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-scroll-top-editor-script',
			'luiz0067-periodic',
			PERIODIC_SCROLL_TOP_DIR . 'languages'
		);
		wp_set_script_translations(
			'periodic-scroll-top-view-script',
			'luiz0067-periodic',
			PERIODIC_SCROLL_TOP_DIR . 'languages'
		);
	}
}
add_action( 'init', 'periodic_scroll_top_block_init' );
