<?php
/**
 * Plugin Name:       periodic Separator
 * Plugin URI:        https://github.com/periodicyahoo/periodic-separator
 * Description:       WordPress Gutenberg Block para separadores e divisores de conteúdo personalizados, com suporte ao estilo clássico verde institucional da prefeitura, estilos sólidos, tracejados, pontilhados, duplos, gradientes, dimensões ajustáveis e total compatibilidade retroativa.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-separator
 * Domain Path:       /languages
 *
 * @package           Periodic_Separator
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Constantes do Plugin
define( 'PERIODIC_SEPARATOR_VERSION', '1.0.0' );
define( 'PERIODIC_SEPARATOR_FILE', __FILE__ );
define( 'PERIODIC_SEPARATOR_URL', plugin_dir_url( __FILE__ ) );
define( 'PERIODIC_SEPARATOR_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Enfileira estilos comuns para frontend público e para o canvas do editor Gutenberg.
 */
function periodic_separator_enqueue_block_assets() {
	$style_css = PERIODIC_SEPARATOR_PATH . 'assets/css/style.css';
	$version   = file_exists( $style_css ) ? filemtime( $style_css ) : PERIODIC_SEPARATOR_VERSION;

	wp_enqueue_style(
		'periodic-separator-style',
		PERIODIC_SEPARATOR_URL . 'assets/css/style.css',
		array(),
		$version
	);
}
add_action( 'enqueue_block_assets', 'periodic_separator_enqueue_block_assets' );

/**
 * Enfileira scripts e estilos específicos para a área de edição do bloco (Gutenberg admin).
 */
function periodic_separator_enqueue_editor_assets() {
	$block_js   = PERIODIC_SEPARATOR_PATH . 'assets/js/block.js';
	$editor_css = PERIODIC_SEPARATOR_PATH . 'assets/css/editor.css';

	$js_version  = file_exists( $block_js ) ? filemtime( $block_js ) : PERIODIC_SEPARATOR_VERSION;
	$css_version = file_exists( $editor_css ) ? filemtime( $editor_css ) : PERIODIC_SEPARATOR_VERSION;

	// Dependências essenciais do Gutenberg
	$dependencies = array(
		'wp-blocks',
		'wp-element',
		'wp-editor',
		'wp-block-editor',
		'wp-components',
		'wp-i18n',
	);

	wp_register_script(
		'periodic-separator-block-js',
		PERIODIC_SEPARATOR_URL . 'assets/js/block.js',
		$dependencies,
		$js_version,
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-separator-block-js',
			'periodic-separator',
			PERIODIC_SEPARATOR_PATH . 'languages'
		);
	}

	wp_register_style(
		'periodic-separator-editor-css',
		PERIODIC_SEPARATOR_URL . 'assets/css/editor.css',
		array( 'wp-edit-blocks' ),
		$css_version
	);

	wp_enqueue_script( 'periodic-separator-block-js' );
	wp_enqueue_style( 'periodic-separator-editor-css' );
}
add_action( 'enqueue_block_editor_assets', 'periodic_separator_enqueue_editor_assets' );

/**
 * Registra os blocos Gutenberg com suporte para o namespace periodic e compatibilidade com cms-adm.
 */
function periodic_separator_register_block() {
	// Registro do bloco oficial moderno
	register_block_type(
		'periodic/separator',
		array(
			'editor_script' => 'periodic-separator-block-js',
			'editor_style'  => 'periodic-separator-editor-css',
			'style'         => 'periodic-separator-style',
		)
	);

	// Registro de compatibilidade retroativa para cms-adm/separator caso não esteja ativo por outro plugin
	if ( class_exists( 'WP_Block_Type_Registry' ) && ! WP_Block_Type_Registry::get_instance()->is_registered( 'cms-adm/separator' ) ) {
		register_block_type(
			'cms-adm/separator',
			array(
				'editor_script' => 'periodic-separator-block-js',
				'editor_style'  => 'periodic-separator-editor-css',
				'style'         => 'periodic-separator-style',
			)
		);
	}
}
add_action( 'init', 'periodic_separator_register_block' );

/**
 * Garante que os blocos estejam na lista de blocos permitidos caso um filtro ativo restrinja os blocos.
 *
 * @param bool|array $allowed_block_types Lista de blocos permitidos.
 * @param object     $editor_context      Contexto do editor (post/tela).
 * @return bool|array
 */
function periodic_separator_allow_block_type( $allowed_block_types, $editor_context = null ) {
	if ( is_array( $allowed_block_types ) ) {
		if ( ! in_array( 'periodic/separator', $allowed_block_types, true ) ) {
			$allowed_block_types[] = 'periodic/separator';
		}
		if ( ! in_array( 'cms-adm/separator', $allowed_block_types, true ) ) {
			$allowed_block_types[] = 'cms-adm/separator';
		}
	}
	return $allowed_block_types;
}
add_filter( 'allowed_block_types_all', 'periodic_separator_allow_block_type', 20, 2 );
add_filter( 'allowed_block_types', 'periodic_separator_allow_block_type', 20, 2 );

/**
 * Suporte a estilos de editor para temas clássicos e Block Themes (Full Site Editing).
 */
function periodic_separator_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/style.css' );
}
add_action( 'after_setup_theme', 'periodic_separator_add_editor_styles' );

/**
 * Carrega a internacionalização do plugin se necessário.
 */
function periodic_separator_load_textdomain() {
	load_plugin_textdomain(
		'periodic-separator',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_separator_load_textdomain' );
