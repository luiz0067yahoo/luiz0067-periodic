<?php
/**
 * Plugin Name: Periodic - Video Embed
 * Plugin URI:  https://github.com/periodicyahoo/periodic-video-embed
 * Description: Bloco Gutenberg elegante e responsivo para incorporação de vídeos do YouTube, Vimeo ou tags iframe com proporções personalizáveis (16:9, 4:3, 1:1), largura máxima ajustável, cantos arredondados e sombra de destaque.
 * Version:     1.0.0
 * Author:      Luiz
 * Author URI:  https://github.com/periodicyahoo
 * License:     GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: luiz0067-periodic
 * Domain Path: /languages
 *
 * @package Periodic_Video_Embed
 */

// Impedir acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Carrega o domínio de tradução do plugin.
 */


/**
 * Registra os scripts, estilos e o bloco Gutenberg periodic/video-embed.
 */
function periodic_video_embed_register_block() {
	$plugin_dir_url  = plugin_dir_url( __FILE__ );
	$plugin_dir_path = plugin_dir_path( __FILE__ );
	$version         = '1.0.0';

	// Registrar folha de estilo compartilhada (frontend e editor).
	wp_register_style(
		'periodic-video-embed-style',
		$plugin_dir_url . 'css/style.css',
		array(),
		$version
	);

	// Registrar folha de estilo exclusiva do editor.
	wp_register_style(
		'periodic-video-embed-editor-style',
		$plugin_dir_url . 'css/editor.css',
		array( 'wp-edit-blocks' ),
		$version
	);

	// Registrar script do bloco Gutenberg em Vanilla JS (ES5).
	wp_register_script(
		'periodic-video-embed-editor-script',
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
		'periodic-video-embed-editor-script',
		'luiz0067-periodic',
		$plugin_dir_path . 'languages'
	);

	// Registrar o tipo de bloco Gutenberg canônico.
	register_block_type(
		'periodic/video-embed',
		array(
			'editor_script' => 'periodic-video-embed-editor-script',
			'editor_style'  => 'periodic-video-embed-editor-style',
			'style'         => 'periodic-video-embed-style',
		)
	);
}
add_action( 'init', 'periodic_video_embed_register_block' );
