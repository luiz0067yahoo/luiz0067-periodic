<?php
/**
 * Plugin Name:       periodic Columns Image (Imagem em Colunas)
 * Plugin URI:        https://github.com/periodicyahoo/periodic-cols-image
 * Description:       WordPress Gutenberg Block for responsive multi-column image cards with titles, descriptions, dark overlays, and Inspector Controls.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           Periodic_Cols_Image
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Carrega a internacionalização (Text Domain) do Plugin
 */


/**
 * Enfileira estilos compartilhados do bloco (Frontend e Canvas do Editor)
 */
function periodic_cols_image_enqueue_block_assets() {
	$style_css = plugin_dir_path( __FILE__ ) . 'css/style.css';
	if ( file_exists( $style_css ) ) {
		wp_enqueue_style(
			'periodic-cols-image-style',
			plugin_dir_url( __FILE__ ) . 'css/style.css',
			array(),
			filemtime( $style_css )
		);
	}
}
add_action( 'enqueue_block_assets', 'periodic_cols_image_enqueue_block_assets' );

/**
 * Registra o bloco Gutenberg e seus scripts do editor
 */
function periodic_cols_image_register_block() {
	$block_js   = plugin_dir_path( __FILE__ ) . 'js/blocks/cols-image.js';
	$editor_css = plugin_dir_path( __FILE__ ) . 'css/editor.css';
	$style_css  = plugin_dir_path( __FILE__ ) . 'css/style.css';

	// Registro do Script do Editor
	if ( file_exists( $block_js ) ) {
		wp_register_script(
			'periodic-cols-image-editor',
			plugins_url( 'js/blocks/cols-image.js', __FILE__ ),
			array(
				'wp-blocks',
				'wp-element',
				'wp-block-editor',
				'wp-components',
				'wp-i18n',
			),
			filemtime( $block_js ),
			true
		);

		// Habilita traduções automáticas para JavaScript via wp_set_script_translations
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations(
				'periodic-cols-image-editor',
				'luiz0067-periodic',
				plugin_dir_path( __FILE__ ) . 'languages'
			);
		}
	}

	// Registro do CSS específico do Editor
	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'periodic-cols-image-editor-style',
			plugins_url( 'css/editor.css', __FILE__ ),
			array( 'wp-edit-blocks' ),
			filemtime( $editor_css )
		);
	}

	// Registro do Bloco via API do WordPress
	register_block_type( 'custom-adm/cols-image', array(
		'editor_script' => 'periodic-cols-image-editor',
		'editor_style'  => 'periodic-cols-image-editor-style',
		'style'         => 'periodic-cols-image-style',
	) );
}
add_action( 'init', 'periodic_cols_image_register_block' );

/**
 * Suporte a editor styles para temas baseados em blocos (Full Site Editing / FSE)
 */
function periodic_cols_image_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'css/style.css' );
	add_editor_style( 'css/editor.css' );
}
add_action( 'after_setup_theme', 'periodic_cols_image_add_editor_styles' );
