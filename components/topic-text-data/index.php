<?php
/**
 * Plugin Name: Periodic Topic Text Data
 * Description: Gutenberg block that displays a title, description and optional link.
 * Version: 1.0.0
 * Author: Periodic
 * Text Domain: periodic-topic-text-data
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function periodic_topic_text_data_register_block() {
    // Register block editor script.
    wp_register_script(
        'periodic-topic-text-data-block',
        plugins_url( 'js/block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-i18n', 'wp-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'js/block.js' )
    );

    // Register editor and front-end styles.
    wp_register_style(
        'periodic-topic-text-data-editor',
        plugins_url( 'css/editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/editor.css' )
    );
    wp_register_style(
        'periodic-topic-text-data-style',
        plugins_url( 'css/style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'css/style.css' )
    );

    register_block_type( 'periodic/topic-text-data', array(
        'editor_script' => 'periodic-topic-text-data-block',
        'editor_style'  => 'periodic-topic-text-data-editor',
        'style'         => 'periodic-topic-text-data-style',
    ) );

    // Load translation files.
    load_plugin_textdomain( 'periodic-topic-text-data', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'periodic_topic_text_data_register_block' );
?>
