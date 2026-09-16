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
 * Text Domain:       luiz0067-periodic
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
 * Enfileira bibliotecas essenciais locais (Bootstrap 5 e Font Awesome 6 Free).
 */
function periodic_team_member_enqueue_shared_assets() {
	if ( wp_style_is( 'periodic-vendor-fontawesome', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-fontawesome' );
	} elseif ( wp_style_is( 'font-awesome-6', 'registered' ) ) {
		wp_enqueue_style( 'font-awesome-6' );
	}

	if ( wp_style_is( 'periodic-vendor-bootstrap', 'registered' ) ) {
		wp_enqueue_style( 'periodic-vendor-bootstrap' );
	} elseif ( wp_style_is( 'bootstrap-5', 'registered' ) ) {
		wp_enqueue_style( 'bootstrap-5' );
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_team_member_enqueue_shared_assets' );
add_action( 'enqueue_block_editor_assets', 'periodic_team_member_enqueue_shared_assets' );

/**
 * Registra o bloco Gutenberg periodic/team-member a partir do block.json.
 */
function periodic_team_member_register_block() {
	// Registra o bloco com suporte a metadados do block.json.
	$block_type = register_block_type( __DIR__ );

	if ( $block_type && function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'periodic-team-member-editor-script',
			'luiz0067-periodic',
			PERIODIC_TEAM_MEMBER_DIR . 'languages'
		);
	}
}
add_action( 'init', 'periodic_team_member_register_block' );
