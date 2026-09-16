<?php
/**
 * Plugin Name: Periodic Multi PDF Image
 * Description: Gutenberg block that displays a grid of PDFs with thumbnail images, titles and descriptions.
 * Version: 1.0.0
 * Author: Periodic
 * Text Domain: luiz0067-periodic
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

    // Local PDF.js assets (required for thumbnail generation).
    if ( ! wp_script_is( 'pdfjs-lib', 'registered' ) ) {
        $pdfjs_url = defined( 'PERIODIC_URL' )
            ? PERIODIC_URL . 'shared/vendor/pdfjs/pdf.min.js'
            : plugins_url( '../../shared/vendor/pdfjs/pdf.min.js', __FILE__ );
        wp_register_script(
            'pdfjs-lib',
            $pdfjs_url,
            array(),
            '3.11.174',
            true
        );
    }
    if ( ! wp_script_is( 'pdfjs-worker', 'registered' ) ) {
        $worker_url = defined( 'PERIODIC_URL' )
            ? PERIODIC_URL . 'shared/vendor/pdfjs/pdf.worker.min.js'
            : plugins_url( '../../shared/vendor/pdfjs/pdf.worker.min.js', __FILE__ );
        wp_register_script(
            'pdfjs-worker',
            $worker_url,
            array(),
            '3.11.174',
            true
        );
    }
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
    if ( function_exists( 'wp_set_script_translations' ) ) {
        wp_set_script_translations( 'periodic-multi-pdf-image-js', 'luiz0067-periodic', $plugin_dir . 'languages' );
    }
}
add_action( 'init', 'periodic_multi_pdf_image_register_block' );
