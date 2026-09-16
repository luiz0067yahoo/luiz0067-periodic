<?php
/**
 * Plugin Name:       periodic Date Title Link
 * Plugin URI:        https://github.com/periodicyahoo/periodic-date-title-link
 * Description:       WordPress Gutenberg Block para exibição cronológica de editais, publicações oficiais, notícias ou documentos associando Data, Título descritivo e URL de redirecionamento.
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

// Carrega o arquivo principal do plugin
require_once __DIR__ . '/date-title-link.php';
