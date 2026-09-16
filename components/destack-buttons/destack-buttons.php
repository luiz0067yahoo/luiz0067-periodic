<?php
/**
 * Plugin Name:       Destack Buttons (Botões de Destaque)
 * Plugin URI:        https://github.com/periodicyahoo/periodic-destack-buttons
 * Description:       Bloco customizado Gutenberg para exibir botões de destaque e atalhos rápidos com ícones, títulos e links customizados.
 * Version:           1.0.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            periodic
 * Author URI:        https://github.com/periodicyahoo
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           DestackButtons
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Constantes do plugin
 */
define( 'PERIODIC_DESTACK_BUTTONS_VERSION', '1.0.0' );
define( 'PERIODIC_DESTACK_BUTTONS_PATH', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_DESTACK_BUTTONS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Filtro para carregar arquivos de tradução do script sem prefixo (ex: languages/pt_BR.json).
 */
function periodic_destack_buttons_script_translations( $file, $handle, $domain ) {
	if ( 'destack-buttons-editor-script' === $handle || 'luiz0067-periodic' === $domain ) {
		$locale = determine_locale();
		$json_file = PERIODIC_DESTACK_BUTTONS_PATH . 'languages/' . $locale . '.json';
		if ( file_exists( $json_file ) ) {
			return $json_file;
		}
	}
	return $file;
}
add_filter( 'load_script_translation_file', 'periodic_destack_buttons_script_translations', 10, 3 );

/**
 * Registra os scripts, estilos e o tipo de bloco Gutenberg.
 */
function periodic_destack_buttons_register_block() {
	// Verifica se a função de registro de bloco existe (WordPress 5.0+).
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// 1. Registra o script do bloco para o editor Gutenberg
	wp_register_script(
		'destack-buttons-editor-script',
		PERIODIC_DESTACK_BUTTONS_URL . 'js/blocks/destack-buttons.js',
		array(
			'wp-blocks',
			'wp-element',
			'wp-block-editor',
			'wp-components',
			'wp-i18n',
		),
		PERIODIC_DESTACK_BUTTONS_VERSION,
		true
	);

	// Configura as traduções para o script do bloco no Gutenberg
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'destack-buttons-editor-script',
			'luiz0067-periodic',
			PERIODIC_DESTACK_BUTTONS_PATH . 'languages'
		);
	}

	// 2. Registra o estilo compartilhado (Front-end e Editor)
	wp_register_style(
		'destack-buttons-style',
		PERIODIC_DESTACK_BUTTONS_URL . 'css/style.css',
		array(),
		PERIODIC_DESTACK_BUTTONS_VERSION
	);

	// 3. Registra o estilo específico do Editor
	wp_register_style(
		'destack-buttons-editor-style',
		PERIODIC_DESTACK_BUTTONS_URL . 'css/editor.css',
		array( 'wp-edit-blocks', 'destack-buttons-style' ),
		PERIODIC_DESTACK_BUTTONS_VERSION
	);

	// 4. Registra o bloco customizado no WordPress
	register_block_type( 'periodic/destack-buttons', array(
		'editor_script' => 'destack-buttons-editor-script',
		'editor_style'  => 'destack-buttons-editor-style',
		'style'         => 'destack-buttons-style',
	) );
}
add_action( 'init', 'periodic_destack_buttons_register_block' );
