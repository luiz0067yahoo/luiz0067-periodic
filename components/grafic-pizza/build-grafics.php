<?php
/**
 * Plugin Name:       periodic Build Grafics - Gráfico Pizza
 * Plugin URI:        https://github.com/periodicyahoo/periodic-grafic
 * Description:       WordPress Gutenberg Block for responsive Pie Charts powered by Chart.js (cms-adm/build-grafics).
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://github.com/periodicyahoo
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-build-grafics
 * Domain Path:       /languages
 *
 * @package           Periodic_Build_Grafics
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin constants.
define( 'PERIODIC_BUILD_GRAFICS_VERSION', '1.0.0' );
define( 'PERIODIC_BUILD_GRAFICS_URL', plugin_dir_url( __FILE__ ) );
define( 'PERIODIC_BUILD_GRAFICS_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Load plugin textdomain for translations
 */
function periodic_build_grafics_load_textdomain() {
	load_plugin_textdomain(
		'periodic-build-grafics',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_build_grafics_load_textdomain' );

/**
 * Register Gutenberg block, scripts and styles
 */
function periodic_build_grafics_register_block() {

	// 1. Chart.js (v3.6.1 local bundle)
	wp_register_script(
		'periodic-chartjs',
		PERIODIC_BUILD_GRAFICS_URL . 'assets/js/chart.min.js',
		array(),
		'3.6.1',
		true
	);

	// 2. Editor Script (Block definition, edit & save functions)
	wp_register_script(
		'periodic-build-grafics-block',
		PERIODIC_BUILD_GRAFICS_URL . 'assets/js/block.js',
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'jquery', 'periodic-chartjs' ),
		PERIODIC_BUILD_GRAFICS_VERSION,
		true
	);

	// Script translations for Gutenberg block
	wp_set_script_translations(
		'periodic-build-grafics-block',
		'periodic-build-grafics',
		PERIODIC_BUILD_GRAFICS_PATH . 'languages'
	);

	// 3. Frontend Script (Chart.js canvas initialization on public pages)
	wp_register_script(
		'periodic-build-grafics-frontend',
		PERIODIC_BUILD_GRAFICS_URL . 'assets/js/frontend.js',
		array( 'jquery', 'periodic-chartjs' ),
		PERIODIC_BUILD_GRAFICS_VERSION,
		true
	);

	// 4. Editor Style (Gutenberg admin canvas & edit popover styling)
	wp_register_style(
		'periodic-build-grafics-editor',
		PERIODIC_BUILD_GRAFICS_URL . 'assets/css/editor.css',
		array( 'wp-edit-blocks' ),
		PERIODIC_BUILD_GRAFICS_VERSION
	);

	// 5. Frontend & Block Common Style
	wp_register_style(
		'periodic-build-grafics-style',
		PERIODIC_BUILD_GRAFICS_URL . 'assets/css/style.css',
		array(),
		PERIODIC_BUILD_GRAFICS_VERSION
	);

	// Register block type cms-adm/build-grafics
	register_block_type( 'cms-adm/build-grafics', array(
		'editor_script' => 'periodic-build-grafics-block',
		'editor_style'  => 'periodic-build-grafics-editor',
		'script'        => 'periodic-build-grafics-frontend',
		'style'         => 'periodic-build-grafics-style',
		'attributes'    => array(
			'title'       => array(
				'type'    => 'array',
				'default' => array( '' ),
			),
			'subTitle'    => array(
				'type'    => 'array',
				'default' => array( '' ),
			),
			'legend'      => array(
				'type'    => 'array',
				'default' => array( array( 'legenda1', 'legenda2', 'legenda3' ) ),
			),
			'dataValue'   => array(
				'type'    => 'array',
				'default' => array( array( '70', '10', '20' ) ),
			),
			'colorItem'   => array(
				'type'    => 'array',
				'default' => array( array( '#f08f86', '#57a7ed', '#35cd76' ) ),
			),
			'mainBlockId' => array(
				'type'    => 'array',
				'default' => array(),
			),
		),
	) );
}
add_action( 'init', 'periodic_build_grafics_register_block' );

/**
 * Enqueue scripts and styles on frontend and editor
 */
function periodic_build_grafics_enqueue_assets() {
	wp_enqueue_style( 'periodic-build-grafics-style' );
}
add_action( 'wp_enqueue_scripts', 'periodic_build_grafics_enqueue_assets' );

/**
 * Register theme support for editor styles if needed
 */
function periodic_build_grafics_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/style.css' );
	add_editor_style( 'assets/css/editor.css' );
}
add_action( 'after_setup_theme', 'periodic_build_grafics_editor_styles' );
