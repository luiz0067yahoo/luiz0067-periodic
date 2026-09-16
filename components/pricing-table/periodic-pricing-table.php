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
 * Text Domain:       luiz0067-periodic
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
			'luiz0067-periodic',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_pricing_table_register_block' );

/**
 * Enfileira Bootstrap 5 e Font Awesome 6 no frontend e no editor usando assets locais.
 */
function periodic_pricing_table_enqueue_assets() {
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
add_action( 'wp_enqueue_scripts', 'periodic_pricing_table_enqueue_assets', 20 );
add_action( 'enqueue_block_editor_assets', 'periodic_pricing_table_enqueue_assets', 20 );

/**
 * Adiciona links rápidos de perfil do autor na lista de plugins instalados.
 *
 * @param array $links Links existentes do plugin.
 * @return array Links atualizados.
 */
function periodic_pricing_table_plugin_action_links( $links ) {
	$author_links = array(
		'<a href="https://profiles.wordpress.org/periodic/" target="_blank" rel="noopener noreferrer">' . esc_html__( 'WordPress.org', 'luiz0067-periodic' ) . '</a>',
		'<a href="https://github.com/periodicyahoo" target="_blank" rel="noopener noreferrer">' . esc_html__( 'GitHub', 'luiz0067-periodic' ) . '</a>',
		'<a href="https://www.linkedin.com/in/luiz-ferreira-260277379/" target="_blank" rel="noopener noreferrer">' . esc_html__( 'LinkedIn', 'luiz0067-periodic' ) . '</a>',
	);
	return array_merge( $links, $author_links );
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'periodic_pricing_table_plugin_action_links' );
