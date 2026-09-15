<?php
/**
 * Plugin Name: Periodic - Audio Embed
 * Plugin URI:  https://github.com/periodicyahoo/periodic-audio-embed
 * Description: Bloco Gutenberg elegante e responsivo para reprodução de áudio e podcasts com upload de arquivos de mídia (MP3, WAV, OGG, M4A) ou URL externa, capa personalizada, controles de reprodução e botão de download.
 * Version:     1.0.0
 * Author:      Luiz
 * Author URI:  https://github.com/periodicyahoo
 * License:     GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: periodic-audio-embed
 * Domain Path: /languages
 *
 * @package Periodic_Audio_Embed
 */

// Impedir acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Carrega o domínio de tradução do plugin.
 */
function periodic_audio_embed_load_textdomain() {
	load_plugin_textdomain(
		'periodic-audio-embed',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'periodic_audio_embed_load_textdomain' );

/**
 * Registra os scripts, estilos e o bloco Gutenberg periodic/audio-embed.
 */
function periodic_audio_embed_register_block() {
	$plugin_dir_url  = plugin_dir_url( __FILE__ );
	$plugin_dir_path = plugin_dir_path( __FILE__ );
	$version         = '1.0.0';

	// Registrar folha de estilo compartilhada (frontend e editor).
	wp_register_style(
		'periodic-audio-embed-style',
		$plugin_dir_url . 'css/style.css',
		array(),
		$version
	);

	// Registrar folha de estilo exclusiva do editor.
	wp_register_style(
		'periodic-audio-embed-editor-style',
		$plugin_dir_url . 'css/editor.css',
		array( 'wp-edit-blocks' ),
		$version
	);

	// Registrar script do bloco Gutenberg em Vanilla JS (ES5).
	wp_register_script(
		'periodic-audio-embed-editor-script',
		$plugin_dir_url . 'js/block.js',
		array(
			'wp-blocks',
			'wp-element',
			'wp-editor',
			'wp-components',
			'wp-i18n',
		),
		$version,
		true
	);

	// Habilitar suporte a traduções JSON JED no script do bloco.
	wp_set_script_translations(
		'periodic-audio-embed-editor-script',
		'periodic-audio-embed',
		$plugin_dir_path . 'languages'
	);

	// Registrar o tipo de bloco Gutenberg canônico.
	register_block_type(
		'periodic/audio-embed',
		array(
			'editor_script' => 'periodic-audio-embed-editor-script',
			'editor_style'  => 'periodic-audio-embed-editor-style',
			'style'         => 'periodic-audio-embed-style',
		)
	);
}
add_action( 'init', 'periodic_audio_embed_register_block' );
