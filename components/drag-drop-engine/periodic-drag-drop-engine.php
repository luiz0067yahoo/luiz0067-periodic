<?php
/**
 * Plugin Name:       Periodic Drag & Drop Engine
 * Plugin URI:        https://github.com/periodic/periodic-drag-drop-engine
 * Description:       Bloco Gutenberg para reordenação de blocos/parágrafos, arraste de palavras/tokens de texto e alvos sobre imagens, com suporte completo a toque e mobile.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Periodic
 * Author URI:        https://github.com/periodic
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registra o bloco Gutenberg periodic/drag-drop-engine.
 */
function periodic_drag_drop_engine_init() {
	// Verifica se a pasta build existe para registrar
	if ( file_exists( __DIR__ . '/build/block.json' ) ) {
		register_block_type( __DIR__ . '/build' );
	} elseif ( file_exists( __DIR__ . '/block.json' ) ) {
		register_block_type( __DIR__ );
	}
}
add_action( 'init', 'periodic_drag_drop_engine_init' );

/**
 * Carrega a internacionalização do plugin.
 */

