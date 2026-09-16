<?php
/**
 * Plugin Name:       Periodic Table of Contents
 * Plugin URI:        https://github.com/periodicyahoo/periodic-extras
 * Description:       Sumário / índice automático que escaneia títulos (H2, H3, H4) da página gerando links de ancoragem com rolagem suave e scrollspy.
 * Version:           1.0.0
 * Requires at least: 6.2
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * GitHub:            https://github.com/periodicyahoo
 * LinkedIn:          https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package           Periodic\TableOfContents
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registra o bloco Gutenberg a partir dos metadados definidos em block.json.
 */
function periodic_table_of_contents_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'periodic_table_of_contents_block_init' );

/**
 * Carrega as traduções do plugin.
 */

