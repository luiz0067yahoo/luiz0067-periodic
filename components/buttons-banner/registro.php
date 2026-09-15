<?php
/**
 * Registro de Assets, Estilos e Bloco Gutenberg para periodic Buttons Banner
 *
 * @package           Periodic_Buttons_Banner
 * @author            Luiz Fernando Brogliatto Ferreira
 * @license           GPL-2.0-or-later
 * @link              https://github.com/periodicyahoo/periodic-buttons-banner
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Definição de constantes essenciais se ainda não definidas
if ( ! defined( 'PERIODIC_BUTTONS_BANNER_VERSION' ) ) {
	define( 'PERIODIC_BUTTONS_BANNER_VERSION', '1.0.0' );
}

if ( ! defined( 'PERIODIC_BUTTONS_BANNER_PATH' ) ) {
	define( 'PERIODIC_BUTTONS_BANNER_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'PERIODIC_BUTTONS_BANNER_URL' ) ) {
	define( 'PERIODIC_BUTTONS_BANNER_URL', plugin_dir_url( __FILE__ ) );
}

/**
 * Enfileira estilos comuns para frontend público e para o canvas do editor Gutenberg.
 */
function periodic_buttons_banner_enqueue_block_assets() {
	$style_css = PERIODIC_BUTTONS_BANNER_PATH . 'assets/css/style.css';
	$version   = file_exists( $style_css ) ? filemtime( $style_css ) : PERIODIC_BUTTONS_BANNER_VERSION;

	wp_enqueue_style(
		'periodic-buttons-banner-style',
		PERIODIC_BUTTONS_BANNER_URL . 'assets/css/style.css',
		array(),
		$version
	);
}
add_action( 'enqueue_block_assets', 'periodic_buttons_banner_enqueue_block_assets' );

/**
 * Enfileira scripts e estilos específicos para a área de edição do bloco (Gutenberg admin).
 */
function periodic_buttons_banner_enqueue_editor_assets() {
	$block_js   = PERIODIC_BUTTONS_BANNER_PATH . 'assets/js/buttons-banner.js';
	$editor_css = PERIODIC_BUTTONS_BANNER_PATH . 'assets/css/editor.css';

	$js_version  = file_exists( $block_js ) ? filemtime( $block_js ) : PERIODIC_BUTTONS_BANNER_VERSION;
	$css_version = file_exists( $editor_css ) ? filemtime( $editor_css ) : PERIODIC_BUTTONS_BANNER_VERSION;

	// Dependências essenciais do Gutenberg
	$dependencies = array(
		'wp-blocks',
		'wp-element',
		'wp-editor',
		'wp-block-editor',
		'wp-components',
		'wp-i18n',
	);

	// Garante o carregamento da biblioteca de mídia nativa do WordPress (wp.media)
	if ( function_exists( 'wp_enqueue_media' ) ) {
		wp_enqueue_media();
	}

	wp_register_script(
		'periodic-buttons-banner-block-js',
		PERIODIC_BUTTONS_BANNER_URL . 'assets/js/buttons-banner.js',
		$dependencies,
		$js_version,
		true
	);

	// Mapeia traduções para o script JavaScript no Gutenberg (formato JED/JSON)
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-buttons-banner-block-js',
			'periodic-buttons-banner',
			PERIODIC_BUTTONS_BANNER_PATH . 'languages'
		);
	}

	wp_register_style(
		'periodic-buttons-banner-editor-css',
		PERIODIC_BUTTONS_BANNER_URL . 'assets/css/editor.css',
		array( 'wp-edit-blocks' ),
		$css_version
	);

	wp_enqueue_script( 'periodic-buttons-banner-block-js' );
	wp_enqueue_style( 'periodic-buttons-banner-editor-css' );
}
add_action( 'enqueue_block_editor_assets', 'periodic_buttons_banner_enqueue_editor_assets' );

/**
 * Registra os blocos Gutenberg com suporte para o namespace periodic e compatibilidade com cms-adm.
 */
function periodic_buttons_banner_register_block() {
	// Registro do bloco oficial moderno
	register_block_type(
		'periodic/buttons-banner',
		array(
			'editor_script' => 'periodic-buttons-banner-block-js',
			'editor_style'  => 'periodic-buttons-banner-editor-css',
			'style'         => 'periodic-buttons-banner-style',
		)
	);

	// Registro de compatibilidade retroativa para cms-adm/buttons-banner caso não esteja ativo por outro plugin
	if ( class_exists( 'WP_Block_Type_Registry' ) && ! WP_Block_Type_Registry::get_instance()->is_registered( 'cms-adm/buttons-banner' ) ) {
		register_block_type(
			'cms-adm/buttons-banner',
			array(
				'editor_script' => 'periodic-buttons-banner-block-js',
				'editor_style'  => 'periodic-buttons-banner-editor-css',
				'style'         => 'periodic-buttons-banner-style',
			)
		);
	}
}
add_action( 'init', 'periodic_buttons_banner_register_block' );

/**
 * Garante que os blocos estejam na lista de blocos permitidos caso um filtro ativo restrinja os blocos.
 *
 * @param bool|array $allowed_block_types Lista de blocos permitidos.
 * @param object     $editor_context      Contexto do editor (post/tela).
 * @return bool|array
 */
function periodic_buttons_banner_allow_block_type( $allowed_block_types, $editor_context = null ) {
	if ( is_array( $allowed_block_types ) ) {
		if ( ! in_array( 'periodic/buttons-banner', $allowed_block_types, true ) ) {
			$allowed_block_types[] = 'periodic/buttons-banner';
		}
		if ( ! in_array( 'cms-adm/buttons-banner', $allowed_block_types, true ) ) {
			$allowed_block_types[] = 'cms-adm/buttons-banner';
		}
	}
	return $allowed_block_types;
}
add_filter( 'allowed_block_types_all', 'periodic_buttons_banner_allow_block_type', 20, 2 );
add_filter( 'allowed_block_types', 'periodic_buttons_banner_allow_block_type', 20, 2 );

/**
 * Suporte a estilos de editor para temas clássicos e Block Themes (Full Site Editing).
 */
function periodic_buttons_banner_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/style.css' );
}
add_action( 'after_setup_theme', 'periodic_buttons_banner_add_editor_styles' );

/**
 * Carrega a internacionalização do plugin a partir da pasta /languages.
 */
function periodic_buttons_banner_load_textdomain() {
	load_plugin_textdomain(
		'periodic-buttons-banner',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_buttons_banner_load_textdomain' );
