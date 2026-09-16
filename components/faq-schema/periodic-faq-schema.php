<?php
/**
 * Plugin Name:       Periodic FAQ Schema
 * Plugin URI:        https://github.com/periodicyahoo/periodic-faq-schema
 * Description:       Sanfona de Perguntas Frequentes (FAQ) com Bootstrap 5, Font Awesome 6 e injeção automática de dados estruturados Schema.org FAQPage em JSON-LD para indexação e rich snippets no Google.
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
 * - Desenvolvedor: Luiz Fernando Brogliatto Ferreira
 * - Perfil WordPress.org: https://profiles.wordpress.org/periodic/
 * - Perfil GitHub: https://github.com/periodicyahoo
 * - LinkedIn: https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package Periodic\FaqSchema
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registra o bloco Gutenberg a partir do arquivo block.json.
 */
function periodic_faq_schema_register_block() {
	register_block_type( __DIR__ );

	// Carrega traduções do script para o domínio de texto do bloco.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-faq-schema-editor-script',
			'luiz0067-periodic',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'periodic_faq_schema_register_block' );

/**
 * Enfileira a folha de estilos do Font Awesome 6 usando assets locais.
 */
function periodic_faq_schema_enqueue_assets() {
	if ( wp_style_is( 'periodic-vendor-fontawesome', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-fontawesome' );
	} elseif ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}
}
add_action( 'enqueue_block_assets', 'periodic_faq_schema_enqueue_assets' );
