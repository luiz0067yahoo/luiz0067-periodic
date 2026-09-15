<?php
/**
 * Plugin Name: Periodic Multi PDF Image
 * Description: Gutenberg block that displays a grid of PDFs with thumbnail images, titles and descriptions.
 * Version: 1.0.0
 * Author: Periodic
 * Text Domain: custom-adm
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function periodic_multi_pdf_image_register_block() {
    $plugin_dir = plugin_dir_path( __FILE__ );
    $plugin_url = plugins_url( '/', __FILE__ );

    // Register block script.
    wp_register_script(
        'periodic-multi-pdf-image-js',
        $plugin_url . 'js/blocks/multi-pdf-image.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
        filemtime( $plugin_dir . 'js/blocks/multi-pdf-image.js' ),
        true
    );
    // Pass plugin URL to JS for asset loading
    wp_localize_script( 'periodic-multi-pdf-image-js', 'pluginData', array( 'pluginUrl' => $plugin_url ) );

    // Enqueue PDF.js from CDN (required for thumbnail generation).
    wp_register_script(
        'pdfjs-lib',
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.min.js',
        array(),
        '2.14.305',
        true
    );
    wp_register_script(
        'pdfjs-worker',
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js',
        array(),
        '2.14.305',
        true
    );
    wp_enqueue_script( 'pdfjs-lib' );
    wp_enqueue_script( 'pdfjs-worker' );

    // Register block style.
    wp_register_style(
        'periodic-multi-pdf-image-css',
        $plugin_url . 'css/style.css',
        array(),
        filemtime( $plugin_dir . 'css/style.css' )
    );

    // Register the block type.
    register_block_type( 'custom-adm/multi-pdf-image', array(
        'editor_script' => 'periodic-multi-pdf-image-js',
        'style'         => 'periodic-multi-pdf-image-css',
        'attributes'    => array(
            'columnsCount' => array(
                'type'    => 'number',
                'default' => 3,
            ),
            'items' => array(
                'type'    => 'array',
                'default' => array(),
            ),
        ),
    ) );

    // Load translations.
    wp_set_script_translations( 'periodic-multi-pdf-image-js', 'custom-adm', $plugin_dir . 'languages' );
}
add_action( 'init', 'periodic_multi_pdf_image_register_block' );

function periodic_multi_pdf_image_load_textdomain() {
    load_plugin_textdomain( 'custom-adm', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'periodic_multi_pdf_image_load_textdomain' );
?>
