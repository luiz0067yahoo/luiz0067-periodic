<?php
/**
 * Plugin Name:       Simulador de Software Interativo
 * Plugin URI:        https://github.com/periodicyahoo/periodic-interative-software-simulator
 * Description:       Bloco Gutenberg nativo para criar simulações guiadas passo a passo de softwares reais (ex: Windows 11, Microsoft Word) com prints e camadas interativas responsivas.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simulador-software-abnt
 * Domain Path:       /languages
 *
 * @package           InterativeSoftwareSimulator
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'SIMULADOR_SOFTWARE_VERSION', '1.0.0' );
define( 'SIMULADOR_SOFTWARE_DIR', plugin_dir_path( __FILE__ ) );
define( 'SIMULADOR_SOFTWARE_URL', plugin_dir_url( __FILE__ ) );

/**
 * Carrega a internacionalização do plugin
 */
function simulador_software_load_textdomain() {
    load_plugin_textdomain(
        'simulador-software-abnt',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'init', 'simulador_software_load_textdomain' );

/**
 * Registra o bloco Gutenberg custom/simulador-software a partir do block.json
 */
function simulador_software_register_block() {
    register_block_type( __DIR__ . '/block.json' );

    // Garante que o script frontend e editor possam ser traduzidos
    if ( function_exists( 'wp_set_script_translations' ) ) {
        wp_set_script_translations(
            'custom-simulador-software-editor-script',
            'simulador-software-abnt',
            SIMULADOR_SOFTWARE_DIR . 'languages'
        );
        wp_set_script_translations(
            'custom-simulador-software-view-script',
            'simulador-software-abnt',
            SIMULADOR_SOFTWARE_DIR . 'languages'
        );
    }

    // Passa parâmetros auxiliares para o script do editor
    wp_localize_script(
        'custom-simulador-software-editor-script',
        'simuladorSoftwareSettings',
        array(
            'pluginUrl' => SIMULADOR_SOFTWARE_URL,
        )
    );
}
add_action( 'init', 'simulador_software_register_block' );

// Carrega os helpers auxiliares
require_once SIMULADOR_SOFTWARE_DIR . 'inc/frontend-handler.php';
