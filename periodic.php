<?php
/**
 * Plugin Name:       Periodic Component Suite
 * Plugin URI:        https://github.com/luiz0067yahoo/luiz0067-periodic
 * Description:       Unified suite of 61 frontend modular components and Gutenberg blocks with i18n in 4 languages (en-US, pt-BR, es, it) and isolated BEM scoping.
 * Version:           2.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz Fernando Brogliatto Ferreira & Periodic Team
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-periodic
 * Domain Path:       /core/i18n
 *
 * @package           Periodic_Suite
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'PERIODIC_VERSION', '2.0.0' );
define( 'PERIODIC_DIR', plugin_dir_path( __FILE__ ) );
define( 'PERIODIC_URL', plugin_dir_url( __FILE__ ) );

/**
 * Register Periodic Gutenberg Block Category
 */
function periodic_register_block_category( $categories ) {
    return array_merge(
        array(
            array(
                'slug'  => 'periodic-blocks',
                'title' => __( 'Periodic Suite', 'luiz0067-periodic' ),
                'icon'  => 'screenoptions',
            ),
        ),
        $categories
    );
}
add_filter( 'block_categories_all', 'periodic_register_block_category', 10, 1 );

/**
 * Centralize common vendor assets (Bootstrap 5, FontAwesome 6, and PDF.js)
 */
function periodic_enqueue_shared_assets() {
    // Bootstrap CSS
    if ( ! wp_style_is( 'periodic-vendor-bootstrap', 'registered' ) ) {
        wp_register_style(
            'periodic-vendor-bootstrap',
            PERIODIC_URL . 'shared/vendor/bootstrap/css/bootstrap.min.css',
            array(),
            '5.3.0'
        );
    }
    if ( ! wp_style_is( 'bootstrap-5', 'registered' ) ) {
        wp_register_style(
            'bootstrap-5',
            PERIODIC_URL . 'shared/vendor/bootstrap/css/bootstrap.min.css',
            array(),
            '5.3.0'
        );
    }

    // FontAwesome CSS
    if ( ! wp_style_is( 'periodic-vendor-fontawesome', 'registered' ) ) {
        wp_register_style(
            'periodic-vendor-fontawesome',
            PERIODIC_URL . 'shared/vendor/fontawesome/css/all.min.css',
            array(),
            '6.5.0'
        );
    }
    if ( ! wp_style_is( 'font-awesome-6', 'registered' ) ) {
        wp_register_style(
            'font-awesome-6',
            PERIODIC_URL . 'shared/vendor/fontawesome/css/all.min.css',
            array(),
            '6.5.0'
        );
    }

    // Bootstrap JS
    if ( ! wp_script_is( 'periodic-vendor-bootstrap-js', 'registered' ) ) {
        wp_register_script(
            'periodic-vendor-bootstrap-js',
            PERIODIC_URL . 'shared/vendor/bootstrap/js/bootstrap.bundle.min.js',
            array(),
            '5.3.0',
            true
        );
    }
    if ( ! wp_script_is( 'bootstrap-5-bundle', 'registered' ) ) {
        wp_register_script(
            'bootstrap-5-bundle',
            PERIODIC_URL . 'shared/vendor/bootstrap/js/bootstrap.bundle.min.js',
            array(),
            '5.3.0',
            true
        );
    }

    // PDF.js local assets
    if ( ! wp_script_is( 'pdfjs-dist', 'registered' ) ) {
        wp_register_script(
            'pdfjs-dist',
            PERIODIC_URL . 'shared/vendor/pdfjs/pdf.min.js',
            array(),
            '3.11.174',
            true
        );
    }
    if ( ! wp_script_is( 'pdfjs-lib', 'registered' ) ) {
        wp_register_script(
            'pdfjs-lib',
            PERIODIC_URL . 'shared/vendor/pdfjs/pdf.min.js',
            array(),
            '3.11.174',
            true
        );
    }
    if ( ! wp_script_is( 'pdfjs-worker', 'registered' ) ) {
        wp_register_script(
            'pdfjs-worker',
            PERIODIC_URL . 'shared/vendor/pdfjs/pdf.worker.min.js',
            array(),
            '3.11.174',
            true
        );
    }

    // Periodic Core Design Tokens & Base CSS
    wp_register_style(
        'periodic-core-variables',
        PERIODIC_URL . 'core/styles/variables.css',
        array(),
        PERIODIC_VERSION
    );

    wp_register_style(
        'periodic-core-base',
        PERIODIC_URL . 'core/styles/base.css',
        array( 'periodic-core-variables' ),
        PERIODIC_VERSION
    );

    // Bootstrap JS
    wp_register_script(
        'periodic-vendor-bootstrap-js',
        PERIODIC_URL . 'shared/vendor/bootstrap/js/bootstrap.bundle.min.js',
        array(),
        '5.3.0',
        true
    );

    // Periodic Core JS & i18n
    wp_register_script(
        'periodic-i18n',
        PERIODIC_URL . 'core/i18n/i18n.js',
        array(),
        PERIODIC_VERSION,
        true
    );

    wp_register_script(
        'periodic-core',
        PERIODIC_URL . 'core/js/periodic-core.js',
        array( 'periodic-i18n' ),
        PERIODIC_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'periodic_enqueue_shared_assets', 5 );
add_action( 'admin_enqueue_scripts', 'periodic_enqueue_shared_assets', 5 );

/**
 * Autoload available component loaders
 */
function periodic_load_components() {
    $components_dir = PERIODIC_DIR . 'components/';
    if ( is_dir( $components_dir ) ) {
        $components = scandir( $components_dir );
        foreach ( $components as $comp ) {
            if ( $comp === '.' || $comp === '..' ) {
                continue;
            }
            $loader = $components_dir . $comp . '/periodic-' . $comp . '.php';
            if ( file_exists( $loader ) ) {
                require_once $loader;
            }
        }
    }
}
periodic_load_components();
