<?php
/**
 * Gutenberg Block Assets Registration
 *
 * @package Periodic_Carousel_Slides
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get the active language code for the plugin
 *
 * @return string Language code (pt-br, en, es, it)
 */
function periodic_carousel_get_current_language() {
	$saved_lang = get_option( 'periodic_carousel_language', 'auto' );
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

/**
 * Register block type and editor script
 */
function periodic_carousel_register_block() {
	$main_file     = dirname( dirname( __FILE__ ) ) . '/periodic-carousel-slides.php';
	$slide_show_js = dirname( dirname( __FILE__ ) ) . '/js/blocks/slide-show.js';

	if ( file_exists( $slide_show_js ) ) {
		wp_register_script(
			'periodic-carousel-block-editor',
			plugins_url( 'js/blocks/slide-show.js', $main_file ),
			array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-editor', 'wp-components', 'wp-i18n', 'jquery' ),
			filemtime( $slide_show_js ),
			true
		);

		$lang      = periodic_carousel_get_current_language();
		$i18n_file = dirname( dirname( __FILE__ ) ) . '/languages/' . $lang . '.json';
		if ( ! file_exists( $i18n_file ) ) {
			$i18n_file = dirname( dirname( __FILE__ ) ) . '/languages/pt-br.json';
		}
		$i18n_data = array();
		if ( file_exists( $i18n_file ) ) {
			$json_content = file_get_contents( $i18n_file );
			$decoded      = json_decode( $json_content, true );
			if ( is_array( $decoded ) ) {
				$i18n_data = $decoded;
			}
		}
		wp_localize_script( 'periodic-carousel-block-editor', 'periodic_carousel_i18n', $i18n_data );
	}

	register_block_type( 'periodic/carousel-slides', array(
		'editor_script' => 'periodic-carousel-block-editor',
		'style'         => 'periodic-carousel-style',
	) );
}
add_action( 'init', 'periodic_carousel_register_block' );

/**
 * Enqueue media library for Gutenberg editor
 */
function periodic_carousel_enqueue_editor_media() {
	if ( function_exists( 'wp_enqueue_media' ) ) {
		wp_enqueue_media();
	}
}
add_action( 'enqueue_block_editor_assets', 'periodic_carousel_enqueue_editor_media' );
