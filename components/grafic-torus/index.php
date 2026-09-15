<?php
/**
 * Plugin Name:       Periodic - Grafic Torus
 * Plugin URI:        https://github.com/periodicyahoo/periodic-grafic-torus
 * Description:       WordPress Gutenberg Block para criação de Gráficos Torus / Donut elegantes, interativos e responsivos em SVG nativo.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz
 * Author URI:        https://github.com/periodicyahoo
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-grafic-torus
 * Domain Path:       /languages
 *
 * @package           Periodic_Grafic_Torus
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin constants.
define( 'PERIODIC_GRAFIC_TORUS_VERSION', '1.0.0' );
define( 'PERIODIC_GRAFIC_TORUS_URL', plugin_dir_url( __FILE__ ) );
define( 'PERIODIC_GRAFIC_TORUS_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Carrega a internacionalização (Text Domain) do Plugin
 */
function periodic_grafic_torus_load_textdomain() {
	load_plugin_textdomain(
		'periodic-grafic-torus',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_grafic_torus_load_textdomain' );

/**
 * Garante o carregamento dos arquivos JSON de tradução sem prefixo ({locale}.json)
 */
function periodic_grafic_torus_script_translation_file( $file, $handle, $domain ) {
	if ( 'periodic-grafic-torus-editor' === $handle && 'periodic-grafic-torus' === $domain ) {
		$locale = function_exists( 'determine_locale' ) ? determine_locale() : get_locale();
		$unprefixed = PERIODIC_GRAFIC_TORUS_PATH . 'languages/' . $locale . '.json';
		if ( file_exists( $unprefixed ) ) {
			return $unprefixed;
		}
	}
	return $file;
}
add_filter( 'load_script_translation_file', 'periodic_grafic_torus_script_translation_file', 10, 3 );

/**
 * Enfileira estilos compartilhados do bloco (Frontend e Canvas do Editor)
 */
function periodic_grafic_torus_enqueue_block_assets() {
	$style_css = PERIODIC_GRAFIC_TORUS_PATH . 'css/style.css';
	if ( file_exists( $style_css ) ) {
		wp_enqueue_style(
			'periodic-grafic-torus-style',
			PERIODIC_GRAFIC_TORUS_URL . 'css/style.css',
			array(),
			filemtime( $style_css )
		);
	}
}
add_action( 'enqueue_block_assets', 'periodic_grafic_torus_enqueue_block_assets' );

/**
 * Registra o bloco Gutenberg e seus scripts e estilos
 */
function periodic_grafic_torus_register_block() {
	$block_js   = PERIODIC_GRAFIC_TORUS_PATH . 'js/block.js';
	$editor_css = PERIODIC_GRAFIC_TORUS_PATH . 'css/editor.css';
	$style_css  = PERIODIC_GRAFIC_TORUS_PATH . 'css/style.css';

	// Registro do Script do Editor
	if ( file_exists( $block_js ) ) {
		wp_register_script(
			'periodic-grafic-torus-editor',
			PERIODIC_GRAFIC_TORUS_URL . 'js/block.js',
			array(
				'wp-blocks',
				'wp-element',
				'wp-block-editor',
				'wp-editor',
				'wp-components',
				'wp-i18n',
			),
			filemtime( $block_js ),
			true
		);

		// Habilita traduções automáticas para JavaScript via wp_set_script_translations
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations(
				'periodic-grafic-torus-editor',
				'periodic-grafic-torus',
				PERIODIC_GRAFIC_TORUS_PATH . 'languages'
			);
		}
	}

	// Registro do CSS específico do Editor
	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'periodic-grafic-torus-editor-style',
			PERIODIC_GRAFIC_TORUS_URL . 'css/editor.css',
			array( 'wp-edit-blocks' ),
			filemtime( $editor_css )
		);
	}

	// Registro do Bloco via API do WordPress
	register_block_type( 'periodic/grafic-torus', array(
		'editor_script' => 'periodic-grafic-torus-editor',
		'editor_style'  => 'periodic-grafic-torus-editor-style',
		'style'         => 'periodic-grafic-torus-style',
		'attributes'    => array(
			'centerValue'  => array(
				'type'    => 'string',
				'default' => '256',
			),
			'centerLabel'  => array(
				'type'    => 'string',
				'default' => 'BANNED USERS',
			),
			'strokeWidth'  => array(
				'type'    => 'number',
				'default' => 22,
			),
			'chartSize'    => array(
				'type'    => 'number',
				'default' => 230,
			),
			'segments'     => array(
				'type'    => 'array',
				'default' => array(
					array(
						'label' => 'Login Attempts',
						'value' => 53,
						'color' => '#f85a68',
					),
					array(
						'label' => 'Login Using "admin"',
						'value' => 28,
						'color' => '#00b038',
					),
					array(
						'label' => 'Login Using "admin"',
						'value' => 29,
						'color' => '#7e42d7',
					),
				),
			),
		),
	) );
}
add_action( 'init', 'periodic_grafic_torus_register_block' );

/**
 * Suporte a editor styles para temas baseados em blocos (Full Site Editing / FSE)
 */
function periodic_grafic_torus_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'css/style.css' );
	add_editor_style( 'css/editor.css' );
}
add_action( 'after_setup_theme', 'periodic_grafic_torus_add_editor_styles' );
