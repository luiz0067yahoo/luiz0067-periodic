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
 * Text Domain:       periodic-pdf-flipbook
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
 * Registra o bloco Gutenberg e carrega os domínios de tradução.
 */
function periodic_pdf_flipbook_init() {
	// Carrega as traduções da pasta /languages.
	load_plugin_textdomain(
		'periodic-pdf-flipbook',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);

	// Registra o bloco com base nos metadados de block.json.
	if ( function_exists( 'register_block_type' ) ) {
		register_block_type( __DIR__ );
	}
}
add_action( 'init', 'periodic_pdf_flipbook_init' );

/**
 * Enfileira os recursos compartilhados (Bootstrap 5 e Font Awesome 6)
 * tanto no editor do Gutenberg quanto no frontend do site.
 */
function periodic_pdf_flipbook_enqueue_shared_assets() {
	// Font Awesome 6 Free (ícones para navegação, zoom, tela cheia, som e download).
	if ( ! wp_style_is( 'font-awesome-6', 'enqueued' ) && ! wp_style_is( 'font-awesome', 'enqueued' ) ) {
		wp_enqueue_style(
			'font-awesome-6',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
			array(),
			'6.5.2'
		);
	}

	// Bootstrap 5.3 CSS para estilização moderna e componentes estruturados.
	if ( ! wp_style_is( 'bootstrap-5', 'enqueued' ) && ! wp_style_is( 'bootstrap', 'enqueued' ) ) {
		wp_enqueue_style(
			'bootstrap-5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
	}

	// Bootstrap 5.3 JS Bundle (com Popper).
	if ( ! wp_script_is( 'bootstrap-5-bundle', 'enqueued' ) && ! wp_script_is( 'bootstrap', 'enqueued' ) ) {
		wp_enqueue_script(
			'bootstrap-5-bundle',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
			array(),
			'5.3.3',
			true
		);
	}
}
add_action( 'enqueue_block_assets', 'periodic_pdf_flipbook_enqueue_shared_assets' );

/**
 * Enfileira a biblioteca PDF.js oficial e dados de configuração no frontend.
 */
function periodic_pdf_flipbook_enqueue_frontend_scripts() {
	if ( ! is_admin() ) {
		// jQuery nativo do WordPress
		wp_enqueue_script( 'jquery' );

		// Turn.js v4.1.0 oficial (mesmo motor utilizado no catálogo periodicyahoo)
		wp_enqueue_script(
			'periodic-turnjs',
			PERIODIC_PDF_FLIPBOOK_URL . 'assets/js/turn.min.js',
			array( 'jquery' ),
			'4.1.0',
			true
		);

		// Mozilla PDF.js v3.11.174
		wp_enqueue_script(
			'pdfjs-dist',
			'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
			array(),
			'3.11.174',
			true
		);

		// Passa configurações e worker URL para o script view.js
		wp_localize_script(
			'periodic-pdf-flipbook-view-script',
			'periodicFlipbookConfig',
			array(
				'pdfWorkerUrl' => 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
				'pluginUrl'    => PERIODIC_PDF_FLIPBOOK_URL,
				'strings'      => array(
					'page'          => __( 'Página', 'periodic-pdf-flipbook' ),
					'of'            => __( 'de', 'periodic-pdf-flipbook' ),
					'loading'       => __( 'Carregando documento...', 'periodic-pdf-flipbook' ),
					'errorLoading'  => __( 'Erro ao carregar o PDF. Verifique se a URL é válida ou configure o CORS do servidor.', 'periodic-pdf-flipbook' ),
					'fullscreen'    => __( 'Tela Cheia', 'periodic-pdf-flipbook' ),
					'exitFullscreen'=> __( 'Sair da Tela Cheia', 'periodic-pdf-flipbook' ),
					'download'      => __( 'Baixar PDF', 'periodic-pdf-flipbook' ),
					'zoomIn'        => __( 'Aumentar Zoom', 'periodic-pdf-flipbook' ),
					'zoomOut'       => __( 'Diminuir Zoom', 'periodic-pdf-flipbook' ),
					'toggleSound'   => __( 'Efeito Sonoro', 'periodic-pdf-flipbook' ),
					'prevPage'      => __( 'Página Anterior', 'periodic-pdf-flipbook' ),
					'nextPage'      => __( 'Próxima Página', 'periodic-pdf-flipbook' ),
				),
			)
		);
	}
}
add_action( 'wp_enqueue_scripts', 'periodic_pdf_flipbook_enqueue_frontend_scripts' );
