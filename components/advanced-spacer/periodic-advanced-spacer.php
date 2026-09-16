<?php
/**
 * Plugin Name:       Periodic Advanced Spacer
 * Plugin URI:        https://github.com/periodicyahoo/periodic-extras
 * Description:       Espaçador vertical responsivo com controle de altura por dispositivo (desktop/tablet/mobile) e visibilidade Bootstrap 5.
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
 * @package           Periodic\AdvancedSpacer
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registra o bloco Gutenberg a partir dos metadados definidos em block.json.
 */
function periodic_advanced_spacer_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'periodic_advanced_spacer_block_init' );

/**
 * Carrega as traduções do plugin.
 */

