<?php
/**
 * Plugin Name:       Periodic Modal Popup
 * Plugin URI:        https://github.com/periodicyahoo/periodic-modal-popup
 * Description:       Plugin de bloco Gutenberg para criação de janelas modais nativas do Bootstrap 5 com gatilho estilizável, ícones Font Awesome e edição WYSIWYG.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-modal-popup
 * Domain Path:       /languages
 *
 * Author Socials:
 * - WordPress.org:   https://profiles.wordpress.org/periodic/
 * - GitHub:          https://github.com/periodicyahoo
 * - LinkedIn:        https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package Periodic\ModalPopup
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Constantes do Plugin.
define( 'PERIODIC_MODAL_POPUP_VERSION', '1.0.0' );
define( 'PERIODIC_MODAL_POPUP_PATH', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_MODAL_POPUP_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enfileira os estilos e scripts de Bootstrap 5 e Font Awesome 6 de forma segura e não intrusiva.
 */
function periodic_modal_popup_enqueue_assets() {
	// Bootstrap 5 CSS (caso não esteja previamente registrado pelo tema ou outro plugin).
	if ( ! wp_style_is( 'bootstrap', 'registered' ) && ! wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_register_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}

	// Bootstrap 5 JS Bundle (com Popper incluso).
	if ( ! wp_script_is( 'bootstrap', 'registered' ) && ! wp_script_is( 'bootstrap-5', 'registered' ) ) {
		wp_register_script(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
			array(),
			'5.3.3',
			true
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

	// Enfileira estilos no frontend.
	if ( ! is_admin() ) {
		if ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
			wp_enqueue_style( 'bootstrap-5' );
		}
		if ( wp_script_is( 'bootstrap-5', 'registered' ) ) {
			wp_enqueue_script( 'bootstrap-5' );
		}
		if ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
			wp_enqueue_style( 'font-awesome-6' );
		}
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_modal_popup_enqueue_assets', 10 );

/**
 * Enfileira os estilos no editor do Gutenberg para assegurar fidelidade visual WYSIWYG.
 */
function periodic_modal_popup_enqueue_editor_assets() {
	if ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}
	if ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}
}
add_action( 'enqueue_block_editor_assets', 'periodic_modal_popup_enqueue_editor_assets', 10 );

/**
 * Registra o bloco Gutenberg utilizando os metadados do block.json.
 */
function periodic_modal_popup_register_block() {
	register_block_type( __DIR__ );

	// Define os arquivos de tradução para os scripts do bloco.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-modal-popup-editor-script',
			'periodic-modal-popup',
			PERIODIC_MODAL_POPUP_PATH . 'languages'
		);
	}
}
add_action( 'init', 'periodic_modal_popup_register_block' );

/**
 * Carrega o domínio de tradução do plugin para internacionalização.
 */
function periodic_modal_popup_load_textdomain() {
	load_plugin_textdomain(
		'periodic-modal-popup',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_modal_popup_load_textdomain' );
