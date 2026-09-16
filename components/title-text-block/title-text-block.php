<?php
/**
 * Plugin Name: Custom ADM Title Text Block
 * Description: Gutenberg block for Title and Text with accent bar.
 * Version: 1.0.0
 * Author: Periodic
 * Text Domain: luiz0067-periodic
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function periodic_title_text_block_register() {
    // Register block script and style.
    wp_register_script(
        'custom-adm-title-text-block-js',
        plugins_url( 'js/blocks/title-text-block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'js/blocks/title-text-block.js' ),
        true
    );

    wp_register_style(
        'custom-adm-title-text-block-css',
        plugins_url( 'css/style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/style.css' )
    );

    register_block_type( 'custom-adm/title-text-block', array(
        'editor_script' => 'custom-adm-title-text-block-js',
        'editor_style'  => 'custom-adm-title-text-block-css',
        'style'         => 'custom-adm-title-text-block-css',
    ) );
}
add_action( 'init', 'periodic_title_text_block_register' );

function periodic_title_text_block_set_script_translations() {
    if ( function_exists( 'wp_set_script_translations' ) ) {
        wp_set_script_translations( 'custom-adm-title-text-block-js', 'luiz0067-periodic', plugin_dir_path( __FILE__ ) . 'languages' );
    }
}
add_action( 'init', 'periodic_title_text_block_set_script_translations' );
