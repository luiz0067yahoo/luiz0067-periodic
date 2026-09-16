<?php
/**
 * Plugin Name:       Periodic - Grafic Line Bar & Torus
 * Plugin URI:        https://github.com/periodicyahoo/periodic-grafic-line-bar
 * Description:       WordPress Gutenberg Blocks para criação de Gráficos de Linha + Barras e Gráfico Torus / Donut elegantes, interativos e responsivos em SVG nativo.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz
 * Author URI:        https://github.com/periodicyahoo
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           Periodic_Grafic_Line_Bar
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin constants.
define( 'PERIODIC_GRAFIC_LINE_BAR_VERSION', '1.0.0' );
define( 'PERIODIC_GRAFIC_LINE_BAR_URL', plugin_dir_url( __FILE__ ) );
define( 'PERIODIC_GRAFIC_LINE_BAR_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Carrega a internacionalização (Text Domain) do Plugin
 */


/**
 * Garante o carregamento dos arquivos JSON de tradução sem prefixo ({locale}.json)
 */
function periodic_grafic_line_bar_script_translation_file( $file, $handle, $domain ) {
	if ( ( 'periodic-grafic-line-bar-editor' === $handle || 'periodic-grafic-torus-editor' === $handle ) &&
		( 'periodic-grafic-line-bar' === $domain || 'periodic-grafic-torus' === $domain ) ) {
		$locale     = function_exists( 'determine_locale' ) ? determine_locale() : get_locale();
		$unprefixed = PERIODIC_GRAFIC_LINE_BAR_PATH . 'languages/' . $locale . '.json';
		if ( file_exists( $unprefixed ) ) {
			return $unprefixed;
		}
	}
	return $file;
}
add_filter( 'load_script_translation_file', 'periodic_grafic_line_bar_script_translation_file', 10, 3 );

/**
 * Enfileira estilos compartilhados do bloco (Frontend e Canvas do Editor)
 */
function periodic_grafic_line_bar_enqueue_block_assets() {
	$style_css = PERIODIC_GRAFIC_LINE_BAR_PATH . 'css/style.css';
	if ( file_exists( $style_css ) ) {
		wp_enqueue_style(
			'periodic-grafic-line-bar-style',
			PERIODIC_GRAFIC_LINE_BAR_URL . 'css/style.css',
			array(),
			filemtime( $style_css )
		);
	}
}
add_action( 'enqueue_block_assets', 'periodic_grafic_line_bar_enqueue_block_assets' );

/**
 * Registra os blocos Gutenberg e seus scripts e estilos
 */
function periodic_grafic_line_bar_register_blocks() {
	$block_js        = PERIODIC_GRAFIC_LINE_BAR_PATH . 'js/block.js';
	$line_bar_js     = PERIODIC_GRAFIC_LINE_BAR_PATH . 'js/line-bar-block.js';
	$torus_js        = PERIODIC_GRAFIC_LINE_BAR_PATH . 'js/torus-block.js';
	$editor_css      = PERIODIC_GRAFIC_LINE_BAR_PATH . 'css/editor.css';
	$style_css       = PERIODIC_GRAFIC_LINE_BAR_PATH . 'css/style.css';

	// Registro do Script Principal do Editor
	if ( file_exists( $block_js ) ) {
		wp_register_script(
			'periodic-grafic-line-bar-editor',
			PERIODIC_GRAFIC_LINE_BAR_URL . 'js/block.js',
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

		// Traduções automáticas para JavaScript via wp_set_script_translations
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations(
				'periodic-grafic-line-bar-editor',
				'luiz0067-periodic',
				PERIODIC_GRAFIC_LINE_BAR_PATH . 'languages'
			);
		}
	}

	// Registro do CSS específico do Editor
	if ( file_exists( $editor_css ) ) {
		wp_register_style(
			'periodic-grafic-line-bar-editor-style',
			PERIODIC_GRAFIC_LINE_BAR_URL . 'css/editor.css',
			array( 'wp-edit-blocks' ),
			filemtime( $editor_css )
		);
	}

	// Registro do Bloco: periodic/grafic-line-bar (Linha + Barras)
	register_block_type( 'periodic/grafic-line-bar', array(
		'editor_script' => 'periodic-grafic-line-bar-editor',
		'editor_style'  => 'periodic-grafic-line-bar-editor-style',
		'style'         => 'periodic-grafic-line-bar-style',
		'attributes'    => array(
			'chartTitle'   => array(
				'type'    => 'string',
				'default' => '238 Threats Blocked',
			),
			'chartSubtitle' => array(
				'type'    => 'string',
				'default' => '',
			),
			'chartWidth'   => array(
				'type'    => 'number',
				'default' => 380,
			),
			'chartHeight'  => array(
				'type'    => 'number',
				'default' => 260,
			),
			'barColor'     => array(
				'type'    => 'string',
				'default' => '#cad9f7',
			),
			'lineColor'    => array(
				'type'    => 'string',
				'default' => '#1058d0',
			),
			'showBars'     => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'showLine'     => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'showPoints'   => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'maxY'         => array(
				'type'    => 'number',
				'default' => 90,
			),
			'items'        => array(
				'type'    => 'array',
				'default' => array(
					array( 'label' => 'Pt 1', 'value' => 28 ),
					array( 'label' => 'Pt 2', 'value' => 52 ),
					array( 'label' => 'Pt 3', 'value' => 33 ),
					array( 'label' => 'Pt 4', 'value' => 85 ),
					array( 'label' => 'Pt 5', 'value' => 50 ),
					array( 'label' => 'Pt 6', 'value' => 55 ),
					array( 'label' => 'Pt 7', 'value' => 33 ),
					array( 'label' => 'Pt 8', 'value' => 18 ),
				),
			),
		),
	) );

	// Registro do Bloco: periodic/grafic-torus (Rosca / Donut)
	register_block_type( 'periodic/grafic-torus', array(
		'editor_script' => 'periodic-grafic-line-bar-editor',
		'editor_style'  => 'periodic-grafic-line-bar-editor-style',
		'style'         => 'periodic-grafic-line-bar-style',
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
add_action( 'init', 'periodic_grafic_line_bar_register_blocks' );

/**
 * Suporte a editor styles para temas baseados em blocos (Full Site Editing / FSE)
 */
function periodic_grafic_line_bar_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'css/style.css' );
	add_editor_style( 'css/editor.css' );
}
add_action( 'after_setup_theme', 'periodic_grafic_line_bar_add_editor_styles' );
