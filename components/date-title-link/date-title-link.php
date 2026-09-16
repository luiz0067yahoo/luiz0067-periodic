<?php
/**
 * Plugin Name:       periodic Date Title Link (Data, Título e Link)
 * Plugin URI:        https://github.com/periodicyahoo/periodic-date-title-link
 * Description:       WordPress Gutenberg Block para exibição cronológica de editais, publicações oficiais, notícias ou documentos associando Data, Título descritivo e URL de redirecionamento, baseado no padrão customADM da Prefeitura.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           Periodic_Date_Title_Link
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Definição de constantes do Plugin
if ( ! defined( 'PERIODIC_DATE_TITLE_LINK_VERSION' ) ) {
	define( 'PERIODIC_DATE_TITLE_LINK_VERSION', '1.0.0' );
}
if ( ! defined( 'PERIODIC_DATE_TITLE_LINK_FILE' ) ) {
	define( 'PERIODIC_DATE_TITLE_LINK_FILE', __FILE__ );
}
if ( ! defined( 'PERIODIC_DATE_TITLE_LINK_URL' ) ) {
	define( 'PERIODIC_DATE_TITLE_LINK_URL', plugin_dir_url( __FILE__ ) );
}
if ( ! defined( 'PERIODIC_DATE_TITLE_LINK_PATH' ) ) {
	define( 'PERIODIC_DATE_TITLE_LINK_PATH', plugin_dir_path( __FILE__ ) );
}

/**
 * Carrega a internacionalização (Text Domain) do plugin.
 */


/**
 * Registra os scripts e estilos do bloco Gutenberg e registra o bloco no hook 'init'.
 */
function custom_adm_date_title_link_register_block() {
	$block_js   = PERIODIC_DATE_TITLE_LINK_PATH . 'js/blocks/date-title-link.js';
	$style_css  = PERIODIC_DATE_TITLE_LINK_PATH . 'css/style.css';
	$editor_css = PERIODIC_DATE_TITLE_LINK_PATH . 'css/editor.css';

	$js_version         = file_exists( $block_js ) ? filemtime( $block_js ) : PERIODIC_DATE_TITLE_LINK_VERSION;
	$style_version      = file_exists( $style_css ) ? filemtime( $style_css ) : PERIODIC_DATE_TITLE_LINK_VERSION;
	$editor_css_version = file_exists( $editor_css ) ? filemtime( $editor_css ) : PERIODIC_DATE_TITLE_LINK_VERSION;

	// Dependências essenciais do Gutenberg para script Vanilla ES5
	$dependencies = array(
		'wp-blocks',
		'wp-element',
		'wp-block-editor',
		'wp-components',
		'wp-i18n',
	);

	// 1. Registro do script JS do editor
	if ( file_exists( $block_js ) ) {
		wp_register_script(
			'custom-adm-date-title-link-js',
			PERIODIC_DATE_TITLE_LINK_URL . 'js/blocks/date-title-link.js',
			$dependencies,
			$js_version,
			true
		);

		// Configuração oficial de traduções via wp_set_script_translations
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations(
				'custom-adm-date-title-link-js',
				'luiz0067-periodic',
				PERIODIC_DATE_TITLE_LINK_PATH . 'languages'
			);
		}

		// Injeção de fallback de dicionário multilíngue (Português, Inglês, Espanhol, Italiano)
		wp_localize_script(
			'custom-adm-date-title-link-js',
			'customAdmDateTitleLinkI18n',
			custom_adm_date_title_link_get_locale_strings()
		);
	}

	// 2. Registro do CSS de estilo (frontend e canvas do editor)
	if ( file_exists( $style_css ) ) {
		wp_register_style(
			'custom-adm-date-title-link-style',
			PERIODIC_DATE_TITLE_LINK_URL . 'css/style.css',
			array(),
			$style_version
		);
	}

	// 3. Registro do CSS exclusivo da interface do editor
	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'custom-adm-date-title-link-editor-style',
			PERIODIC_DATE_TITLE_LINK_URL . 'css/editor.css',
			array( 'wp-edit-blocks' ),
			$editor_css_version
		);
	}

	// Argumentos comuns de registro
	$block_args = array(
		'editor_script' => 'custom-adm-date-title-link-js',
		'editor_style'  => 'custom-adm-date-title-link-editor-style',
		'style'         => 'custom-adm-date-title-link-style',
	);

	// Registro do bloco primário no padrão prefeitura/customADM
	register_block_type( 'custom-adm/date-title-link', $block_args );

	// Registro de compatibilidade com namespace periodic
	register_block_type( 'periodic/date-title-link', $block_args );

	// Compatibilidade com bloco legado caso necessário
	if ( class_exists( 'WP_Block_Type_Registry' ) && ! WP_Block_Type_Registry::get_instance()->is_registered( 'cms-adm/date-title-link' ) ) {
		register_block_type( 'cms-adm/date-title-link', $block_args );
	}
}
add_action( 'init', 'custom_adm_date_title_link_register_block' );

/**
 * Enfileira os estilos para frontend e canvas do Gutenberg.
 */
function custom_adm_date_title_link_enqueue_block_assets() {
	$style_css = PERIODIC_DATE_TITLE_LINK_PATH . 'css/style.css';
	$version   = file_exists( $style_css ) ? filemtime( $style_css ) : PERIODIC_DATE_TITLE_LINK_VERSION;

	if ( file_exists( $style_css ) ) {
		wp_enqueue_style(
			'custom-adm-date-title-link-style',
			PERIODIC_DATE_TITLE_LINK_URL . 'css/style.css',
			array(),
			$version
		);
	}
}
add_action( 'enqueue_block_assets', 'custom_adm_date_title_link_enqueue_block_assets' );

/**
 * Enfileira os scripts e estilos da área de edição do bloco.
 */
function custom_adm_date_title_link_enqueue_editor_assets() {
	wp_enqueue_script( 'custom-adm-date-title-link-js' );
	wp_enqueue_style( 'custom-adm-date-title-link-editor-style' );
}
add_action( 'enqueue_block_editor_assets', 'custom_adm_date_title_link_enqueue_editor_assets' );

/**
 * Garante que os blocos estejam na lista de blocos permitidos se houver filtro ativo.
 *
 * @param bool|array $allowed_block_types Lista de blocos permitidos.
 * @param object     $editor_context      Contexto do editor.
 * @return bool|array
 */
function custom_adm_date_title_link_allow_block_type( $allowed_block_types, $editor_context = null ) {
	if ( is_array( $allowed_block_types ) ) {
		$blocks_to_allow = array(
			'custom-adm/date-title-link',
			'periodic/date-title-link',
			'cms-adm/date-title-link',
		);
		foreach ( $blocks_to_allow as $blk ) {
			if ( ! in_array( $blk, $allowed_block_types, true ) ) {
				$allowed_block_types[] = $blk;
			}
		}
	}
	return $allowed_block_types;
}
add_filter( 'allowed_block_types_all', 'custom_adm_date_title_link_allow_block_type', 20, 2 );
add_filter( 'allowed_block_types', 'custom_adm_date_title_link_allow_block_type', 20, 2 );

/**
 * Suporte a editor styles para temas clássicos e Block Themes (Full Site Editing).
 */
function custom_adm_date_title_link_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'css/style.css' );
	add_editor_style( 'css/editor.css' );
}
add_action( 'after_setup_theme', 'custom_adm_date_title_link_add_editor_styles' );

/**
 * Retorna as traduções correspondentes ao locale do WordPress para injeção direta.
 *
 * @return array Mapeamento de termos traduzidos.
 */
function custom_adm_date_title_link_get_locale_strings() {
	$locale = function_exists( 'determine_locale' ) ? determine_locale() : ( function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale() );
	$lang   = 'pt_BR';

	if ( strpos( $locale, 'it' ) === 0 ) {
		$lang = 'it_IT';
	} elseif ( strpos( $locale, 'es' ) === 0 ) {
		$lang = 'es_ES';
	} elseif ( strpos( $locale, 'en' ) === 0 ) {
		$lang = 'en_US';
	}

	$json_file = PERIODIC_DATE_TITLE_LINK_PATH . 'languages/' . $lang . '.json';
	if ( file_exists( $json_file ) ) {
		$content = file_get_contents( $json_file );
		$decoded = json_decode( $content, true );
		if ( is_array( $decoded ) ) {
			return $decoded;
		}
	}

	return array();
}
