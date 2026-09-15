<?php
/**
 * Plugin Name:       periodic Buttons Banner
 * Plugin URI:        https://github.com/periodicyahoo/periodic-buttons-banner
 * Description:       WordPress Gutenberg Block para Botões Banner com até 5 colunas responsivas, logotipos via mídia, descrições ricas com RichText, siglas/títulos e links rápidos, com suporte ao padrão clássico da prefeitura e total compatibilidade retroativa.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-buttons-banner
 * Domain Path:       /languages
 *
 * @package           Periodic_Buttons_Banner
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Constantes do Plugin
define( 'PERIODIC_BUTTONS_BANNER_VERSION', '1.0.0' );
define( 'PERIODIC_BUTTONS_BANNER_FILE', __FILE__ );
define( 'PERIODIC_BUTTONS_BANNER_URL', plugin_dir_url( __FILE__ ) );
define( 'PERIODIC_BUTTONS_BANNER_PATH', plugin_dir_path( __FILE__ ) );

// Carrega o registro do bloco, assets e hooks
require_once PERIODIC_BUTTONS_BANNER_PATH . 'registro.php';
