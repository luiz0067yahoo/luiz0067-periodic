<?php
/**
 * Plugin Name:       Periodic Antigravity Prompt / Floating Cards
 * Plugin URI:        https://github.com/periodicyahoo/periodic-topic-title-text
 * Description:       Native Gutenberg block for animated floating cards with smooth CSS antigravity levitation, prompt tags, and interactive actions.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://github.com/periodicyahoo
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           Periodic_Topic_Title_Text
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register block assets and Gutenberg block type.
 */
function periodic_antigravity_cards_register_block() {
	$block_script_path = plugin_dir_path( __FILE__ ) . 'js/blocks/topic-title-text.js';
	$frontend_js_path  = plugin_dir_path( __FILE__ ) . 'js/frontend.js';
	$style_css_path    = plugin_dir_path( __FILE__ ) . 'css/style.css';
	$editor_css_path   = plugin_dir_path( __FILE__ ) . 'css/editor.css';

	// Register block editor script (Native wp.* Gutenberg APIs).
	wp_register_script(
		'periodic-topic-title-text-block',
		plugins_url( 'js/blocks/topic-title-text.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		file_exists( $block_script_path ) ? filemtime( $block_script_path ) : '1.0.0',
		true
	);

	// Register frontend interactivity script (Clipboard copy, animations).
	wp_register_script(
		'periodic-topic-title-text-frontend',
		plugins_url( 'js/frontend.js', __FILE__ ),
		array(),
		file_exists( $frontend_js_path ) ? filemtime( $frontend_js_path ) : '1.0.0',
		true
	);

	// Register general block style (used in frontend and editor canvas).
	wp_register_style(
		'periodic-topic-title-text-style',
		plugins_url( 'css/style.css', __FILE__ ),
		array(),
		file_exists( $style_css_path ) ? filemtime( $style_css_path ) : '1.0.0'
	);

	// Register editor-specific style for WYSIWYG canvas overrides.
	wp_register_style(
		'periodic-topic-title-text-editor',
		plugins_url( 'css/editor.css', __FILE__ ),
		array( 'wp-edit-blocks', 'periodic-topic-title-text-style' ),
		file_exists( $editor_css_path ) ? filemtime( $editor_css_path ) : '1.0.0'
	);

	// Register native Gutenberg block.
	register_block_type( 'periodic/topic-title-text', array(
		'editor_script' => 'periodic-topic-title-text-block',
		'editor_style'  => 'periodic-topic-title-text-editor',
		'style'         => 'periodic-topic-title-text-style',
		'script'        => 'periodic-topic-title-text-frontend',
	) );
}
add_action( 'init', 'periodic_antigravity_cards_register_block' );

/**
 * Load plugin textdomain for translations.
 */


/**
 * Set script translations for Gutenberg block script.
 */
function periodic_antigravity_cards_set_script_translations() {
	wp_set_script_translations(
		'periodic-topic-title-text-block',
		'luiz0067-periodic',
		plugin_dir_path( __FILE__ ) . 'languages'
	);
}
add_action( 'init', 'periodic_antigravity_cards_set_script_translations' );

/**
 * Add editor style theme support to ensure WYSIWYG iframe support.
 */
function periodic_antigravity_cards_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'css/style.css' );
	add_editor_style( 'css/editor.css' );
}
add_action( 'after_setup_theme', 'periodic_antigravity_cards_add_editor_styles' );
