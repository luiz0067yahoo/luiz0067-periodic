<?php
/**
 * Plugin Name:       Periodic - Pricing Table (Bootstrap 5)
 * Plugin URI:        https://github.com/periodicyahoo/periodic-pricing-table
 * Description:       Tabela comparativa de planos de preços para landing pages com destaque para Plano Popular, lista de recursos com ícones de check/cross e botões de conversão integrados ao Bootstrap 5 e Font Awesome 6.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-pricing-table
 * Domain Path:       /languages
 *
 * GitHub:            https://github.com/periodicyahoo
 * LinkedIn:          https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package           Periodic\PricingTable
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registra o bloco Gutenberg 'periodic/pricing-table' e suas dependências.
 */
function periodic_pricing_table_register_block() {
	// Registra o bloco a partir dos metadados de block.json.
	register_block_type( __DIR__ );

	// Carrega traduções do script do editor.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-pricing-table-editor-script',
			'periodic-pricing-table',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_pricing_table_register_block' );

/**
 * Enfileira Bootstrap 5 e Font Awesome 6 no frontend e no editor com verificação de handle.
 */
function periodic_pricing_table_enqueue_assets() {
	// Bootstrap 5.3.3 CSS (CDN com fallback seguro).
	if ( ! wp_style_is( 'bootstrap', 'registered' ) && ! wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_register_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}
	if ( ! wp_style_is( 'bootstrap', 'enqueued' ) && ! wp_style_is( 'bootstrap-5', 'enqueued' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}

	// Font Awesome 6.5.2 CSS para ícones de check, xmark e navegação.
	if ( ! wp_style_is( 'font-awesome', 'registered' ) && ! wp_style_is( 'font-awesome-6', 'registered' ) && ! wp_style_is( 'fontawesome', 'registered' ) ) {
		wp_register_style(
			'font-awesome-6',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
			array(),
			'6.5.2'
		);
	}
	if ( ! wp_style_is( 'font-awesome', 'enqueued' ) && ! wp_style_is( 'font-awesome-6', 'enqueued' ) && ! wp_style_is( 'fontawesome', 'enqueued' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_pricing_table_enqueue_assets', 20 );
add_action( 'enqueue_block_editor_assets', 'periodic_pricing_table_enqueue_assets', 20 );

/**
 * Carrega o domínio de tradução para internacionalização do plugin.
 */
function periodic_pricing_table_load_textdomain() {
	load_plugin_textdomain(
		'periodic-pricing-table',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_pricing_table_load_textdomain' );

/**
 * Adiciona links rápidos de perfil do autor na lista de plugins instalados.
 *
 * @param array $links Links existentes do plugin.
 * @return array Links atualizados.
 */
function periodic_pricing_table_plugin_action_links( $links ) {
	$author_links = array(
		'<a href="https://profiles.wordpress.org/periodic/" target="_blank" rel="noopener noreferrer">' . esc_html__( 'WordPress.org', 'periodic-pricing-table' ) . '</a>',
		'<a href="https://github.com/periodicyahoo" target="_blank" rel="noopener noreferrer">' . esc_html__( 'GitHub', 'periodic-pricing-table' ) . '</a>',
		'<a href="https://www.linkedin.com/in/luiz-ferreira-260277379/" target="_blank" rel="noopener noreferrer">' . esc_html__( 'LinkedIn', 'periodic-pricing-table' ) . '</a>',
	);
	return array_merge( $links, $author_links );
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'periodic_pricing_table_plugin_action_links' );
