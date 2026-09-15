<?php
/**
 * Plugin Name:       periodic Date Title Link File Upload
 * Plugin URI:        https://github.com/periodicyahoo/periodic-date-title-link-file-upload
 * Description:       WordPress Gutenberg Custom Block para publicação de documentos, editais e arquivos para download com data destacada, título descritivo (RichText), links internos/externos e gerenciamento de upload de anexos via MediaUpload. Totalmente compatível com o bloco legado cms-adm/date-title-link-file-upload do projeto customADM.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-adm
 * Domain Path:       /languages
 *
 * @package           Periodic_Date_Title_Link_File_Upload
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Constantes do Plugin
define( 'PERIODIC_DTLF_VERSION', '1.0.0' );
define( 'PERIODIC_DTLF_FILE', __FILE__ );
define( 'PERIODIC_DTLF_URL', plugin_dir_url( __FILE__ ) );
define( 'PERIODIC_DTLF_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Registra os scripts e estilos do bloco Gutenberg e registra os blocos no hook 'init'.
 */
function periodic_dtlf_register_block() {
	$block_js   = PERIODIC_DTLF_PATH . 'js/blocks/date-title-link-file-upload.js';
	$style_css  = PERIODIC_DTLF_PATH . 'css/style.css';
	$editor_css = PERIODIC_DTLF_PATH . 'css/editor.css';

	$js_version         = file_exists( $block_js ) ? filemtime( $block_js ) : PERIODIC_DTLF_VERSION;
	$style_version      = file_exists( $style_css ) ? filemtime( $style_css ) : PERIODIC_DTLF_VERSION;
	$editor_css_version = file_exists( $editor_css ) ? filemtime( $editor_css ) : PERIODIC_DTLF_VERSION;

	// Dependências essenciais do Gutenberg para o script Vanilla ES5
	$dependencies = array(
		'wp-blocks',
		'wp-element',
		'wp-block-editor',
		'wp-components',
		'wp-i18n',
	);

	// 1. Registro do script JS do editor
	wp_register_script(
		'periodic-date-title-link-file-upload-js',
		PERIODIC_DTLF_URL . 'js/blocks/date-title-link-file-upload.js',
		$dependencies,
		$js_version,
		true
	);

	// Configura as traduções do script Gutenberg se a função estiver disponível no WordPress
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-date-title-link-file-upload-js',
			'custom-adm',
			PERIODIC_DTLF_PATH . 'languages'
		);
	}

	// Injeta dicionário multilíngue direto como fallback (Português, Inglês, Espanhol, Italiano)
	wp_localize_script(
		'periodic-date-title-link-file-upload-js',
		'dateTitleLinkFileUploadI18n',
		periodic_dtlf_get_locale_strings()
	);

	// 2. Registro dos estilos para o frontend e para o canvas do editor
	wp_register_style(
		'periodic-date-title-link-file-upload-style',
		PERIODIC_DTLF_URL . 'css/style.css',
		array(),
		$style_version
	);

	// 3. Registro do estilo específico do painel do editor Gutenberg
	wp_register_style(
		'periodic-date-title-link-file-upload-editor-style',
		PERIODIC_DTLF_URL . 'css/editor.css',
		array( 'wp-edit-blocks' ),
		$editor_css_version
	);

	// Configuração padrão dos ativos do bloco
	$block_args = array(
		'editor_script' => 'periodic-date-title-link-file-upload-js',
		'editor_style'  => 'periodic-date-title-link-file-upload-editor-style',
		'style'         => 'periodic-date-title-link-file-upload-style',
	);

	// Registro do bloco canônico moderno
	register_block_type( 'periodic/date-title-link-file-upload', $block_args );

	// Registro de compatibilidade retroativa para cms-adm/date-title-link-file-upload
	if ( class_exists( 'WP_Block_Type_Registry' ) && ! WP_Block_Type_Registry::get_instance()->is_registered( 'cms-adm/date-title-link-file-upload' ) ) {
		register_block_type( 'cms-adm/date-title-link-file-upload', $block_args );
	}
}
add_action( 'init', 'periodic_dtlf_register_block' );

/**
 * Enfileira os estilos para frontend e Gutenberg canvas.
 */
function periodic_dtlf_enqueue_block_assets() {
	$style_css = PERIODIC_DTLF_PATH . 'css/style.css';
	$version   = file_exists( $style_css ) ? filemtime( $style_css ) : PERIODIC_DTLF_VERSION;

	wp_enqueue_style(
		'periodic-date-title-link-file-upload-style',
		PERIODIC_DTLF_URL . 'css/style.css',
		array(),
		$version
	);
}
add_action( 'enqueue_block_assets', 'periodic_dtlf_enqueue_block_assets' );

/**
 * Enfileira scripts e estilos específicos da área de edição do bloco (Gutenberg admin).
 */
function periodic_dtlf_enqueue_editor_assets() {
	wp_enqueue_script( 'periodic-date-title-link-file-upload-js' );
	wp_enqueue_style( 'periodic-date-title-link-file-upload-editor-style' );
}
add_action( 'enqueue_block_editor_assets', 'periodic_dtlf_enqueue_editor_assets' );

/**
 * Garante que os blocos estejam na lista de blocos permitidos caso um tema ou plugin restrinja.
 *
 * @param bool|array $allowed_block_types Lista de blocos permitidos.
 * @param object     $editor_context      Contexto do editor.
 * @return bool|array
 */
function periodic_dtlf_allow_block_type( $allowed_block_types, $editor_context = null ) {
	if ( is_array( $allowed_block_types ) ) {
		if ( ! in_array( 'periodic/date-title-link-file-upload', $allowed_block_types, true ) ) {
			$allowed_block_types[] = 'periodic/date-title-link-file-upload';
		}
		if ( ! in_array( 'cms-adm/date-title-link-file-upload', $allowed_block_types, true ) ) {
			$allowed_block_types[] = 'cms-adm/date-title-link-file-upload';
		}
	}
	return $allowed_block_types;
}
add_filter( 'allowed_block_types_all', 'periodic_dtlf_allow_block_type', 20, 2 );
add_filter( 'allowed_block_types', 'periodic_dtlf_allow_block_type', 20, 2 );

/**
 * Suporte a estilos de editor para temas clássicos e Block Themes (Full Site Editing).
 */
function periodic_dtlf_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'css/style.css' );
}
add_action( 'after_setup_theme', 'periodic_dtlf_add_editor_styles' );

/**
 * Carrega a internacionalização (Text Domain) do plugin.
 */
function periodic_dtlf_load_textdomain() {
	load_plugin_textdomain(
		'custom-adm',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_dtlf_load_textdomain' );

/**
 * Obtém o array de traduções com base no locale atual do WordPress (Italiano, Inglês, Espanhol, Português).
 *
 * @return array
 */
function periodic_dtlf_get_locale_strings() {
	$locale = function_exists( 'determine_locale' ) ? determine_locale() : ( function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale() );
	$lang = 'pt-br';

	if ( strpos( $locale, 'it' ) === 0 ) {
		$lang = 'it';
	} elseif ( strpos( $locale, 'es' ) === 0 ) {
		$lang = 'es';
	} elseif ( strpos( $locale, 'en' ) === 0 ) {
		$lang = 'en';
	}

	$json_file = PERIODIC_DTLF_PATH . 'languages/' . $lang . '.json';
	if ( file_exists( $json_file ) ) {
		$content = file_get_contents( $json_file );
		if ( $content ) {
			$data = json_decode( $content, true );
			if ( is_array( $data ) ) {
				return $data;
			}
		}
	}
	return array();
}
