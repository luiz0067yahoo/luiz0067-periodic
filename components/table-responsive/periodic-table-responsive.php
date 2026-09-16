<?php
/**
 * Plugin Name:       Periodic Table Responsive (Bootstrap 5)
 * Plugin URI:        https://github.com/periodicyahoo/periodic-table-responsive
 * Description:       Bloco Gutenberg para criação de tabelas responsivas estilizadas nativamente com Bootstrap 5, edição inline WYSIWYG e suporte a Font Awesome 6.
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
 * @package           PeriodicTableResponsive
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Definição de constantes do plugin.
define( 'PERIODIC_TABLE_VERSION', '1.0.0' );
define( 'PERIODIC_TABLE_PATH', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_TABLE_URL', plugin_dir_url( __FILE__ ) );

/**
 * Registra o bloco Gutenberg e suas dependências.
 */
function periodic_table_responsive_register_block() {
	// Registra o bloco a partir do metadata definido no block.json.
	register_block_type( __DIR__ );

	// Carrega traduções para o script do bloco no editor Gutenberg.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-table-responsive-editor-script',
			'luiz0067-periodic',
			PERIODIC_TABLE_PATH . 'languages'
		);
	}
}
add_action( 'init', 'periodic_table_responsive_register_block' );

/**
 * Enfileira recursos locais compartilhados (Bootstrap 5 e Font Awesome 6).
 */
function periodic_table_responsive_enqueue_assets() {
	if ( ! is_admin() ) {
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
}
add_action( 'wp_enqueue_scripts', 'periodic_table_responsive_enqueue_assets' );

/**
 * Enfileira recursos no editor de blocos (Gutenberg) para renderização fidedigna WYSIWYG.
 */
function periodic_table_responsive_enqueue_editor_assets() {
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
add_action( 'enqueue_block_editor_assets', 'periodic_table_responsive_enqueue_editor_assets' );
