<?php
/**
 * Plugin Name:       Simulador de Software Interativo
 * Plugin URI:        https://github.com/periodicyahoo/periodic-interative-software-simulator
 * Description:       Bloco Gutenberg nativo para criar simulações guiadas passo a passo de softwares reais (ex: Windows 11, Microsoft Word) com prints e camadas interativas responsivas.
 * Version:           1.2.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           InterativeSoftwareSimulator
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! defined( 'PERIODIC_SIMULADOR_SOFTWARE_VERSION' ) ) {
    define( 'PERIODIC_SIMULADOR_SOFTWARE_VERSION', '1.2.0' );
}
if ( ! defined( 'PERIODIC_SIMULADOR_SOFTWARE_DIR' ) ) {
    define( 'PERIODIC_SIMULADOR_SOFTWARE_DIR', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'PERIODIC_SIMULADOR_SOFTWARE_URL' ) ) {
    define( 'PERIODIC_SIMULADOR_SOFTWARE_URL', plugin_dir_url( __FILE__ ) );
}

// Carrega os helpers auxiliares e renderizador frontend
require_once PERIODIC_SIMULADOR_SOFTWARE_DIR . 'inc/frontend-handler.php';

/**
 * Registra o bloco Gutenberg custom/simulador-software a partir do block.json
 */
function periodic_simulador_software_register_block() {
    register_block_type( __DIR__ . '/block.json' );

    // Garante que o script frontend e editor possam ser traduzidos
    if ( function_exists( 'wp_set_script_translations' ) ) {
        wp_set_script_translations(
            'custom-simulador-software-editor-script',
            'luiz0067-periodic',
            PERIODIC_SIMULADOR_SOFTWARE_DIR . 'languages'
        );
        wp_set_script_translations(
            'custom-simulador-software-view-script',
            'luiz0067-periodic',
            PERIODIC_SIMULADOR_SOFTWARE_DIR . 'languages'
        );
    }

    // Passa parâmetros auxiliares para o script do editor
    wp_localize_script(
        'custom-simulador-software-editor-script',
        'simuladorSoftwareSettings',
        array(
            'pluginUrl' => PERIODIC_SIMULADOR_SOFTWARE_URL,
        )
    );

    // Passa parâmetros auxiliares também para o script de visualização do frontend
    wp_localize_script(
        'custom-simulador-software-view-script',
        'simuladorSoftwareSettings',
        array(
            'pluginUrl' => PERIODIC_SIMULADOR_SOFTWARE_URL,
        )
    );
}
add_action( 'init', 'periodic_simulador_software_register_block' );

/**
 * Enfileira ativos no frontend para temas que usam o bloco em templates clássicos ou renderizações dinâmicas
 */
function periodic_simulador_software_enqueue_frontend() {
    // Registra antecipadamente para disponibilidade global
    if ( ! wp_style_is( 'custom-simulador-software-style', 'registered' ) ) {
        wp_register_style(
            'custom-simulador-software-style',
            PERIODIC_SIMULADOR_SOFTWARE_URL . 'build/style-index.css',
            array(),
            PERIODIC_SIMULADOR_SOFTWARE_VERSION
        );
    }

    if ( ! wp_script_is( 'custom-simulador-software-view-script', 'registered' ) ) {
        wp_register_script(
            'custom-simulador-software-view-script',
            PERIODIC_SIMULADOR_SOFTWARE_URL . 'build/view.js',
            array(),
            PERIODIC_SIMULADOR_SOFTWARE_VERSION,
            true
        );
    }

    wp_localize_script(
        'custom-simulador-software-view-script',
        'simuladorSoftwareSettings',
        array(
            'pluginUrl' => PERIODIC_SIMULADOR_SOFTWARE_URL,
        )
    );

    // Enfileira os estilos e scripts para compatibilidade total com qualquer tema (incluindo React e SPA)
    wp_enqueue_style( 'custom-simulador-software-style' );
    wp_enqueue_script( 'custom-simulador-software-view-script' );
}
add_action( 'wp_enqueue_scripts', 'periodic_simulador_software_enqueue_frontend' );
add_action( 'enqueue_block_assets', 'periodic_simulador_software_enqueue_frontend' );
