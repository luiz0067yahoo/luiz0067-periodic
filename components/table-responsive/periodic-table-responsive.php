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
 * Text Domain:       periodic-table-responsive
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
			'periodic-table-responsive',
			PERIODIC_TABLE_PATH . 'languages'
		);
	}
}
add_action( 'init', 'periodic_table_responsive_register_block' );

/**
 * Enfileira recursos externos essenciais (Bootstrap 5 e Font Awesome 6).
 */
function periodic_table_responsive_enqueue_assets() {
	// Bootstrap 5 (CSS) - Se não estiver registrado pelo tema ativo.
	if ( ! wp_style_is( 'bootstrap', 'registered' ) && ! wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_register_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}

	// Font Awesome 6 (CSS) - Se não estiver registrado pelo tema ativo.
	if ( ! wp_style_is( 'font-awesome', 'registered' ) && ! wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_register_style(
			'font-awesome-6',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
			array(),
			'6.5.2'
		);
	}

	// Enfileira no frontend se a página contiver o bloco ou na renderização.
	if ( ! is_admin() ) {
		wp_enqueue_style( 'bootstrap-5' );
		wp_enqueue_style( 'font-awesome-6' );
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_table_responsive_enqueue_assets' );

/**
 * Enfileira recursos no editor de blocos (Gutenberg) para renderização fidedigna WYSIWYG.
 */
function periodic_table_responsive_enqueue_editor_assets() {
	wp_enqueue_style(
		'bootstrap-5-editor',
		'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
		array(),
		'5.3.3'
	);

	wp_enqueue_style(
		'font-awesome-6-editor',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
		array(),
		'6.5.2'
	);
}
add_action( 'enqueue_block_editor_assets', 'periodic_table_responsive_enqueue_editor_assets' );

/**
 * Carrega o domínio de tradução do plugin para internacionalização.
 */
function periodic_table_responsive_load_textdomain() {
	load_plugin_textdomain(
		'periodic-table-responsive',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_table_responsive_load_textdomain' );
