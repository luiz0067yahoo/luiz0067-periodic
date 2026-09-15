<?php
/**
 * Gutenberg Block Assets & Registration
 *
 * @package Periodic_Mini_PDF_Image
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get current plugin active language code (pt-br, en, es, it)
 *
 * @return string
 */
function periodic_mini_pdf_get_current_language() {
	$saved_lang = get_option( 'periodic_mini_pdf_language', 'auto' );
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
 * Register block types, scripts and styles
 */
function periodic_mini_pdf_register_block() {
	$main_file = dirname( dirname( __FILE__ ) ) . '/periodic-mini-pdf-image.php';
	$base_url  = plugin_dir_url( $main_file );
	$base_path = plugin_dir_path( $main_file );

	$block_js     = $base_path . 'assets/js/block.js';
	$pdfjs_file   = $base_path . 'assets/vendor/pdfjs/pdf.min.js';
	$worker_file  = $base_path . 'assets/vendor/pdfjs/pdf.worker.min.js';
	$style_file   = $base_path . 'assets/css/style.css';
	$editor_style = $base_path . 'assets/css/editor.css';

	// Enqueue PDF.js vendor library for block editor
	if ( file_exists( $pdfjs_file ) ) {
		wp_register_script(
			'periodic-pdfjs',
			$base_url . 'assets/vendor/pdfjs/pdf.min.js',
			array(),
			filemtime( $pdfjs_file ),
			true
		);

		if ( file_exists( $worker_file ) ) {
			wp_localize_script(
				'periodic-pdfjs',
				'periodicPdfWorkerData',
				array(
					'workerSrc' => $base_url . 'assets/vendor/pdfjs/pdf.worker.min.js',
				)
			);
		}
	}

	// Register Frontend Style
	if ( file_exists( $style_file ) ) {
		wp_register_style(
			'periodic-mini-pdf-style',
			$base_url . 'assets/css/style.css',
			array(),
			filemtime( $style_file )
		);
	}

	// Register Editor Style
	if ( file_exists( $editor_style ) ) {
		wp_register_style(
			'periodic-mini-pdf-editor-style',
			$base_url . 'assets/css/editor.css',
			array( 'wp-edit-blocks', 'periodic-mini-pdf-style' ),
			filemtime( $editor_style )
		);
	}

	// Register Gutenberg Block Editor Script
	if ( file_exists( $block_js ) ) {
		$deps = array(
			'wp-blocks',
			'wp-element',
			'wp-block-editor',
			'wp-editor',
			'wp-components',
			'wp-i18n',
			'jquery',
		);
		if ( wp_script_is( 'periodic-pdfjs', 'registered' ) ) {
			$deps[] = 'periodic-pdfjs';
		}

		wp_register_script(
			'periodic-mini-pdf-block-editor',
			$base_url . 'assets/js/block.js',
			$deps,
			filemtime( $block_js ),
			true
		);

		// Load localized strings
		$lang      = periodic_mini_pdf_get_current_language();
		$i18n_file = $base_path . 'languages/' . $lang . '.json';
		if ( ! file_exists( $i18n_file ) ) {
			$i18n_file = $base_path . 'languages/pt-br.json';
		}

		$i18n_data = array();
		if ( file_exists( $i18n_file ) ) {
			$json_content = file_get_contents( $i18n_file );
			$decoded      = json_decode( $json_content, true );
			if ( is_array( $decoded ) ) {
				$i18n_data = $decoded;
			}
		}

		$block_data = array(
			'i18n'      => $i18n_data,
			'workerUrl' => $base_url . 'assets/vendor/pdfjs/pdf.worker.min.js',
		);

		wp_localize_script( 'periodic-mini-pdf-block-editor', 'periodic_mini_pdf_vars', $block_data );
	}

	$block_args = array(
		'editor_script' => 'periodic-mini-pdf-block-editor',
		'editor_style'  => 'periodic-mini-pdf-editor-style',
		'style'         => 'periodic-mini-pdf-style',
	);

	// Register primary block type
	register_block_type( 'periodic/mini-pdf-image', $block_args );

	// Register backwards compatibility aliases
	register_block_type( 'cms-adm/mini-pdf-image', $block_args );
	register_block_type( 'cms-adm/mini-pdf', $block_args );
}
add_action( 'init', 'periodic_mini_pdf_register_block' );

/**
 * Enqueue media library for Gutenberg editor
 */
function periodic_mini_pdf_enqueue_editor_media() {
	if ( function_exists( 'wp_enqueue_media' ) ) {
		wp_enqueue_media();
	}
}
add_action( 'enqueue_block_editor_assets', 'periodic_mini_pdf_enqueue_editor_media' );
