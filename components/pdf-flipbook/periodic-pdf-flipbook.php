<?php
/**
 * Plugin Name:       periodic PDF Flipbook
 * Plugin URI:        https://github.com/periodicyahoo/periodic-pdf-flipbook
 * Description:       WordPress Gutenberg Block for interactive 3D PDF flipbooks and digital magazines with Bootstrap 5 and Font Awesome 6.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Tested up to:      7.1
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira
 * Author URI:        https://profiles.wordpress.org/periodic/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /languages
 *
 * @package           Periodic_PDF_Flipbook
 */

// Impede o acesso direto ao arquivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Definições de constantes do plugin.
define( 'PERIODIC_PDF_FLIPBOOK_VERSION', '1.0.0' );
define( 'PERIODIC_PDF_FLIPBOOK_URL', plugin_dir_url( __FILE__ ) );
define( 'PERIODIC_PDF_FLIPBOOK_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Registra o bloco Gutenberg.
 */
function periodic_pdf_flipbook_init() {
	// Registra o bloco com base nos metadados de block.json.
	if ( function_exists( 'register_block_type' ) ) {
		register_block_type( __DIR__ );
	}
}
add_action( 'init', 'periodic_pdf_flipbook_init' );

/**
 * Enfileira os recursos compartilhados (Bootstrap 5 e Font Awesome 6) usando assets locais
 * tanto no editor do Gutenberg quanto no frontend do site.
 */
function periodic_pdf_flipbook_enqueue_shared_assets() {
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

	if ( wp_script_is( 'periodic-vendor-bootstrap-js', 'registered' ) ) {
		wp_enqueue_script( 'periodic-vendor-bootstrap-js' );
	} elseif ( wp_script_is( 'bootstrap-5-bundle', 'registered' ) ) {
		wp_enqueue_script( 'bootstrap-5-bundle' );
	}
}
add_action( 'enqueue_block_assets', 'periodic_pdf_flipbook_enqueue_shared_assets' );

/**
 * Enfileira a biblioteca PDF.js oficial local e dados de configuração no frontend.
 */
function periodic_pdf_flipbook_enqueue_frontend_scripts() {
	if ( ! is_admin() ) {
		// jQuery nativo do WordPress
		wp_enqueue_script( 'jquery' );

		// Turn.js v4.1.0 oficial
		wp_enqueue_script(
			'periodic-turnjs',
			PERIODIC_PDF_FLIPBOOK_URL . 'assets/js/turn.min.js',
			array( 'jquery' ),
			'4.1.0',
			true
		);

		// Mozilla PDF.js v3.11.174 local
		$worker_url = defined( 'PERIODIC_URL' )
			? PERIODIC_URL . 'shared/vendor/pdfjs/pdf.worker.min.js'
			: plugins_url( '../../shared/vendor/pdfjs/pdf.worker.min.js', __FILE__ );

		if ( ! wp_script_is( 'pdfjs-dist', 'registered' ) ) {
			$pdfjs_url = defined( 'PERIODIC_URL' )
				? PERIODIC_URL . 'shared/vendor/pdfjs/pdf.min.js'
				: plugins_url( '../../shared/vendor/pdfjs/pdf.min.js', __FILE__ );
			wp_register_script(
				'pdfjs-dist',
				$pdfjs_url,
				array(),
				'3.11.174',
				true
			);
		}
		wp_enqueue_script( 'pdfjs-dist' );

		// Passa configurações e worker URL local para o script view.js
		wp_localize_script(
			'periodic-pdf-flipbook-view-script',
			'periodicFlipbookConfig',
			array(
				'pdfWorkerUrl' => $worker_url,
				'pluginUrl'    => PERIODIC_PDF_FLIPBOOK_URL,
				'strings'      => array(
					'page'          => __( 'Página', 'luiz0067-periodic' ),
					'of'            => __( 'de', 'luiz0067-periodic' ),
					'loading'       => __( 'Carregando documento...', 'luiz0067-periodic' ),
					'errorLoading'  => __( 'Erro ao carregar o PDF. Verifique se a URL é válida ou configure o CORS do servidor.', 'luiz0067-periodic' ),
					'fullscreen'    => __( 'Tela Cheia', 'luiz0067-periodic' ),
					'exitFullscreen'=> __( 'Sair da Tela Cheia', 'luiz0067-periodic' ),
					'download'      => __( 'Baixar PDF', 'luiz0067-periodic' ),
					'zoomIn'        => __( 'Aumentar Zoom', 'luiz0067-periodic' ),
					'zoomOut'       => __( 'Diminuir Zoom', 'luiz0067-periodic' ),
					'toggleSound'   => __( 'Efeito Sonoro', 'luiz0067-periodic' ),
					'prevPage'      => __( 'Página Anterior', 'luiz0067-periodic' ),
					'nextPage'      => __( 'Próxima Página', 'luiz0067-periodic' ),
				),
			)
		);
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_pdf_flipbook_enqueue_frontend_scripts' );
