<?php
/**
 * Plugin Name:       Periodic Team Member
 * Plugin URI:        https://github.com/periodicyahoo/periodic-team-member
 * Description:       Cartão institucional de apresentação de membros de equipe, instrutores ou professores com foto, nome, especialidade, resumo biográfico e links para redes sociais com ícones Font Awesome e grid Bootstrap 5.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       periodic-team-member
 * Domain Path:       /languages
 *
 * Metadados de Autoria:
 * - Autor: Luiz Fernando Brogliatto Ferreira
 * - WordPress.org: https://profiles.wordpress.org/periodic/
 * - GitHub: https://github.com/periodicyahoo
 * - LinkedIn: https://www.linkedin.com/in/luiz-ferreira-260277379/
 *
 * @package Periodic\TeamMember
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Encerra execução se acessado diretamente.
}

/**
 * Constantes do Plugin.
 */
define( 'PERIODIC_TEAM_MEMBER_VERSION', '1.0.0' );
define( 'PERIODIC_TEAM_MEMBER_DIR', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_TEAM_MEMBER_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enfileira bibliotecas essenciais compartilhadas (Bootstrap 5 Grid e Font Awesome 6 Free).
 */
function periodic_team_member_enqueue_shared_assets() {
	// Font Awesome 6 Free (CDN estável e segura).
	if ( ! wp_style_is( 'font-awesome-6', 'registered' ) && ! wp_style_is( 'font-awesome-6', 'enqueued' ) ) {
		wp_register_style(
			'font-awesome-6',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
			array(),
			'6.5.2',
			'all'
		);
	}
	wp_enqueue_style( 'font-awesome-6' );

	// Bootstrap 5 Grid / Utilitários essenciais.
	if ( ! wp_style_is( 'bootstrap-5-grid', 'registered' ) && ! wp_style_is( 'bootstrap-5-grid', 'enqueued' ) ) {
		wp_register_style(
			'bootstrap-5-grid',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap-grid.min.css',
			array(),
			'5.3.3',
			'all'
		);
	}
	wp_enqueue_style( 'bootstrap-5-grid' );
}
add_action( 'wp_enqueue_scripts', 'periodic_team_member_enqueue_shared_assets' );
add_action( 'enqueue_block_editor_assets', 'periodic_team_member_enqueue_shared_assets' );

/**
 * Registra o bloco Gutenberg periodic/team-member a partir do block.json.
 */
function periodic_team_member_register_block() {
	// Carrega traduções do domínio do plugin.
	load_plugin_textdomain(
		'periodic-team-member',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);

	// Registra o bloco com suporte a metadados do block.json.
	$block_type = register_block_type( __DIR__ );

	if ( $block_type && function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-team-member-editor-script',
			'periodic-team-member',
			PERIODIC_TEAM_MEMBER_DIR . 'languages'
		);
	}
}
add_action( 'init', 'periodic_team_member_register_block' );
