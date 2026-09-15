<?php
/**
 * Plugin Name:       Periodic Custom Shapes
 * Plugin URI:        https://github.com/periodicyahoo/periodic-extras
 * Description:       Divisores de formas geométricas personalizados (ondas, inclinados, triângulos e curvas) para bordas de seções no Gutenberg.
 * Version:           1.0.0
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-custom-shapes
 * Domain Path:       /languages
 *
 * GitHub:            https://github.com/periodicyahoo
 * LinkedIn:          https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package           Periodic\CustomShapes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registra o bloco Gutenberg a partir dos metadados definidos em block.json.
 */
function periodic_custom_shapes_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'periodic_custom_shapes_block_init' );

/**
 * Carrega as traduções do plugin.
 */
function periodic_custom_shapes_load_textdomain() {
	load_plugin_textdomain(
		'periodic-custom-shapes',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_custom_shapes_load_textdomain' );
