<?php
/**
 * Gutenberg Block Assets Registration
 *
 * @package Periodic_Accordion
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
function periodic_accordion_get_current_language() {
	$saved_lang = get_option( 'periodic_accordion_language', 'auto' );
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
function periodic_accordion_register_block() {
	$main_file    = dirname( dirname( __FILE__ ) ) . '/periodic-accordion.php';
	$single_js = dirname( dirname( __FILE__ ) ) . '/js/blocks/accordion-single.js';
	$double_js = dirname( dirname( __FILE__ ) ) . '/js/blocks/accordion-double.js';
	$triple_js = dirname( dirname( __FILE__ ) ) . '/js/blocks/accordion-triple.js';

	$shared_deps = array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-editor', 'wp-components', 'wp-i18n', 'jquery' );

	$lang      = periodic_accordion_get_current_language();
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

	// Register single-column script (accordion-single.js)
	if ( file_exists( $single_js ) ) {
		wp_register_script(
			'periodic-accordion-single-editor',
			plugins_url( 'js/blocks/accordion-single.js', $main_file ),
			$shared_deps,
			filemtime( $single_js ),
			true
		);
		wp_localize_script( 'periodic-accordion-single-editor', 'periodic_accordion_i18n', $i18n_data );
	}

	// Register double-column script (accordion-double.js)
	if ( file_exists( $double_js ) ) {
		wp_register_script(
			'periodic-accordion-double-editor',
			plugins_url( 'js/blocks/accordion-double.js', $main_file ),
			$shared_deps,
			filemtime( $double_js ),
			true
		);
		wp_localize_script( 'periodic-accordion-double-editor', 'periodic_accordion_i18n', $i18n_data );
	}

	// Register triple-column script (accordion-triple.js)
	if ( file_exists( $triple_js ) ) {
		wp_register_script(
			'periodic-accordion-triple-editor',
			plugins_url( 'js/blocks/accordion-triple.js', $main_file ),
			$shared_deps,
			filemtime( $triple_js ),
			true
		);
		wp_localize_script( 'periodic-accordion-triple-editor', 'periodic_accordion_i18n', $i18n_data );
	}

	// Register single-column block (1 coluna)
	register_block_type( 'periodic/accordion', array(
		'editor_script' => 'periodic-accordion-single-editor',
		'style'         => 'periodic-accordion-style',
	) );

	// Register double-column block (2 colunas)
	$double_script = file_exists( $double_js ) ? 'periodic-accordion-double-editor' : 'periodic-accordion-single-editor';
	register_block_type( 'periodic/accordion-double', array(
		'editor_script' => $double_script,
		'style'         => 'periodic-accordion-style',
	) );

	// Register triple-column block (3 colunas)
	$triple_script = file_exists( $triple_js ) ? 'periodic-accordion-triple-editor' : 'periodic-accordion-single-editor';
	register_block_type( 'periodic/accordion-triple', array(
		'editor_script' => $triple_script,
		'style'         => 'periodic-accordion-style',
	) );
}
add_action( 'init', 'periodic_accordion_register_block' );

/**
 * Remove o bloco nativo 'Sanfona' (core/details) e apresentação dos blocos permitidos no Gutenberg
 *
 * @param array|bool $allowed_block_types Lista de blocos permitidos ou true.
 * @param WP_Block_Editor_Context|WP_Post|null $context Contexto do editor.
 * @return array
 */
function periodic_accordion_filter_allowed_blocks( $allowed_block_types, $context = null ) {
	// Se todos os blocos estiverem permitidos (true ou vazio), obtém os blocos registrados
	if ( true === $allowed_block_types || empty( $allowed_block_types ) ) {
		$registered_blocks   = WP_Block_Type_Registry::get_instance()->get_all_registered();
		$allowed_block_types = array_keys( $registered_blocks );
	}

	// Remove toda a suíte de blocos nativos Accordion/Sanfona do WordPress
	$blocks_to_remove = array(
		'core/accordion',          // Accordion (Sanfona)
		'core/accordion-heading',  // Accordion Heading
		'core/accordion-item',     // Accordion Item
		'core/accordion-panel',    // Accordion Panel
		'core/details',            // Details (Sanfona)
	);

	if ( is_array( $allowed_block_types ) ) {
		$allowed_block_types = array_values( array_diff( $allowed_block_types, $blocks_to_remove ) );
	}

	return $allowed_block_types;
}
add_filter( 'allowed_block_types_all', 'periodic_accordion_filter_allowed_blocks', 10, 2 );
add_filter( 'allowed_block_types', 'periodic_accordion_filter_allowed_blocks', 10, 2 );

/**
 * Desregistra o bloco 'Sanfona' e toda a família core/accordion diretamente no JavaScript do Gutenberg
 */
function periodic_accordion_unregister_sanfona_js() {
	$inline_js = "(function() {
		function removeCoreAccordion() {
			if (!window.wp || !window.wp.blocks || !window.wp.blocks.unregisterBlockType) return;
			var coreAccordionBlocks = [
				'core/accordion',
				'core/accordion-heading',
				'core/accordion-item',
				'core/accordion-panel',
				'core/details'
			];
			coreAccordionBlocks.forEach(function(slug) {
				if (wp.blocks.getBlockType(slug)) {
					wp.blocks.unregisterBlockType(slug);
				}
			});
			if (wp.blocks.getBlockTypes) {
				wp.blocks.getBlockTypes().forEach(function(b) {
					if (b && b.name && b.name.indexOf('periodic/') !== 0) {
						var t = (b.title || '').toLowerCase();
						if (t.indexOf('sanfona') !== -1 || (b.name.indexOf('core/accordion') === 0) || b.name === 'core/details') {
							wp.blocks.unregisterBlockType(b.name);
						}
					}
				});
			}
		}
		if (window.wp && window.wp.domReady) {
			wp.domReady(function() {
				removeCoreAccordion();
				setTimeout(removeCoreAccordion, 200);
				setTimeout(removeCoreAccordion, 600);
				setTimeout(removeCoreAccordion, 1500);
			});
		}
	})();";

	wp_add_inline_script( 'wp-blocks', $inline_js );
	wp_add_inline_script( 'periodic-accordion-single-editor', $inline_js );
}
add_action( 'enqueue_block_editor_assets', 'periodic_accordion_unregister_sanfona_js', 99 );


