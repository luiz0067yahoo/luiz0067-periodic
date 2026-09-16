<?php
/**
 * Plugin Name: Periodic Maps Block
 * Description: Gutenberg block for embedding responsive interactive maps.
 * Version: 1.0.0
 * Author: Periodic
 * Text Domain: luiz0067-periodic
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Get active language code for the plugin
 *
 * @return string Language code (pt-br, en, es, it)
 */
function periodic_maps_get_current_language() {
    $saved_lang = get_option( 'periodic_maps_language', 'auto' );
    if ( 'auto' !== $saved_lang && in_array( $saved_lang, array( 'pt-br', 'en', 'es', 'it' ), true ) ) {
        return $saved_lang;
    }

    $locale = function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale();
    $locale = strtolower( str_replace( '_', '-', $locale ) );

    if ( strpos( $locale, 'pt' ) === 0 ) {
        return 'pt-br';
    } elseif ( strpos( $locale, 'es' ) === 0 ) {
        return 'es';
    } elseif ( strpos( $locale, 'it' ) === 0 ) {
        return 'it';
    }
    return 'en';
}

// Register block assets.
function periodic_maps_register_block() {
    $dir = plugin_dir_path( __FILE__ );
    $block_js   = plugins_url( 'js/block.js', __FILE__ );
    $editor_css = plugins_url( 'css/editor.css', __FILE__ );
    $style_css  = plugins_url( 'css/style.css', __FILE__ );

    wp_register_script(
        'periodic-maps-block',
        $block_js,
        array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor' ),
        filemtime( $dir . 'js/block.js' ),
        true
    );

    $lang      = periodic_maps_get_current_language();
    $i18n_file = $dir . 'languages/' . $lang . '.json';
    if ( ! file_exists( $i18n_file ) ) {
        $i18n_file = $dir . 'languages/pt-br.json';
    }
    $i18n_data = array();
    if ( file_exists( $i18n_file ) ) {
        $json_content = file_get_contents( $i18n_file );
        $decoded      = json_decode( $json_content, true );
        if ( is_array( $decoded ) ) {
            $i18n_data = $decoded;
        }
    }
    wp_localize_script( 'periodic-maps-block', 'periodic_maps_i18n', $i18n_data );

    wp_register_style( 'periodic-maps-editor', $editor_css, array(), filemtime( $dir . 'css/editor.css' ) );
    wp_register_style( 'periodic-maps-style', $style_css, array(), filemtime( $dir . 'css/style.css' ) );

    register_block_type( 'periodic/maps', array(
        'editor_script'   => 'periodic-maps-block',
        'editor_style'    => 'periodic-maps-editor',
        'style'           => 'periodic-maps-style',
        'render_callback' => 'periodic_maps_render_callback',
        'attributes'      => array(
            'mapUrl' => array(
                'type' => 'string',
                'default' => ''
            ),
            'height' => array(
                'type' => 'string',
                'default' => '400px'
            ),
            'alignment' => array(
                'type' => 'string',
                'default' => 'center'
            ),
            'borderRadius' => array(
                'type' => 'string',
                'default' => '0px'
            ),
            'caption' => array(
                'type' => 'string',
                'default' => ''
            ),
            'customClass' => array(
                'type' => 'string',
                'default' => ''
            ),
        ),
    ) );
}
add_action( 'init', 'periodic_maps_register_block' );

// Render callback for front‑end.
function periodic_maps_render_callback( $attributes ) {
    $url = esc_url( $attributes['mapUrl'] );
    if ( empty( $url ) ) {
        return '<p>' . esc_html__( 'Map URL not provided.', 'luiz0067-periodic' ) . '</p>';
    }
    $style  = sprintf( 'height:%s;', esc_attr( $attributes['height'] ) );
    $style .= sprintf( 'border-radius:%s;', esc_attr( $attributes['borderRadius'] ) );
    $wrapper = sprintf( 'text-align:%s;', esc_attr( $attributes['alignment'] ) );
    $class  = esc_attr( $attributes['customClass'] );

    $output  = sprintf( '<div class="periodic-maps %s" style="%s">', $class, $wrapper );
    $output .= sprintf( '<iframe src="%s" style="%s" frameborder="0" allowfullscreen></iframe>', $url, $style );
    if ( ! empty( $attributes['caption'] ) ) {
        $output .= sprintf( '<p class="periodic-maps-caption">%s</p>', esc_html( $attributes['caption'] ) );
    }
    $output .= '</div>';
    return $output;
}
?>
