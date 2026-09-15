<?php
/**
 * Plugin Name: Periodic - Imagem de Destaque
 * Plugin URI:  https://github.com/periodicyahoo/periodic-image-destaque
 * Description: Bloco Gutenberg customizado para exibição de Imagem de Destaque / Banner Promocional com link, legenda e acessibilidade.
 * Version:     1.0.0
 * Author:      Luiz Alberto
 * Author URI:  https://github.com/periodicyahoo
 * License:     GPL-2.0-or-later
 * Text Domain: periodic-image-destaque
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Segurança contra acesso direto
}

/**
 * Registra o bloco customizado, assets de script e estilo.
 */
function periodic_image_destaque_register_block() {
    $plugin_dir_url  = plugin_dir_url( __FILE__ );
    $plugin_dir_path = plugin_dir_path( __FILE__ );

    // Script do editor do bloco (Vanilla ES5)
    $script_path = 'js/blocks/image-destaque.js';
    $script_ver  = file_exists( $plugin_dir_path . $script_path ) ? filemtime( $plugin_dir_path . $script_path ) : '1.0.0';

    wp_register_script(
        'periodic-image-destaque-editor',
        $plugin_dir_url . $script_path,
        array(
            'wp-blocks',
            'wp-element',
            'wp-block-editor',
            'wp-components',
            'wp-i18n',
        ),
        $script_ver,
        true
    );

    // Internacionalização dos scripts do Gutenberg
    if ( function_exists( 'wp_set_script_translations' ) ) {
        wp_set_script_translations(
            'periodic-image-destaque-editor',
            'periodic-image-destaque',
            $plugin_dir_path . 'languages'
        );
    }

    // Estilos compartilhados entre frontend e editor
    $style_path = 'css/style.css';
    $style_ver  = file_exists( $plugin_dir_path . $style_path ) ? filemtime( $plugin_dir_path . $style_path ) : '1.0.0';

    wp_register_style(
        'periodic-image-destaque-style',
        $plugin_dir_url . $style_path,
        array(),
        $style_ver
    );

    // Registro do Bloco Gutenberg
    register_block_type( 'periodic/image-destaque', array(
        'editor_script' => 'periodic-image-destaque-editor',
        'style'         => 'periodic-image-destaque-style',
        'attributes'    => array(
            'imageUrl'    => array(
                'type'    => 'string',
                'default' => '',
            ),
            'imageId'     => array(
                'type'    => 'number',
                'default' => 0,
            ),
            'altText'     => array(
                'type'    => 'string',
                'default' => '',
            ),
            'caption'     => array(
                'type'    => 'string',
                'default' => '',
            ),
            'url'         => array(
                'type'    => 'string',
                'default' => '',
            ),
            'targetBlank' => array(
                'type'    => 'boolean',
                'default' => false,
            ),
            'alignment'   => array(
                'type'    => 'string',
                'default' => 'center',
            ),
        ),
    ) );
}
add_action( 'init', 'periodic_image_destaque_register_block' );

/**
 * Carrega arquivos de tradução do plugin (textdomain).
 */
function periodic_image_destaque_load_textdomain() {
    load_plugin_textdomain(
        'periodic-image-destaque',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'plugins_loaded', 'periodic_image_destaque_load_textdomain' );
