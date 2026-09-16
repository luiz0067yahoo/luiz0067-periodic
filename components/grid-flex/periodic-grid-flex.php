<?php
/**
 * Plugin Name:       periodic Grid Flex
 * Plugin URI:        https://github.com/periodicyahoo/periodic-grid-flex
 * Description:       WordPress Gutenberg Block for responsive Bootstrap 5 Flexbox Grid with custom child columns and InnerBlocks support.
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
 * @package           Periodic_Grid_Flex
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get active language code for the plugin
 *
 * @return string Language code (pt-br, en-us, es, it)
 */
function periodic_grid_flex_get_current_language() {
	$saved_lang = get_option( 'periodic_grid_flex_language', 'auto' );
	if ( 'auto' !== $saved_lang && in_array( $saved_lang, array( 'pt-br', 'en-us', 'es', 'it' ), true ) ) {
		return $saved_lang;
	}

	$locale = function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale();
	$locale = strtolower( str_replace( '_', '-', $locale ) );

	if ( strpos( $locale, 'pt' ) === 0 ) {
		return 'pt-br';
	} elseif ( strpos( $locale, 'es' ) === 0 ) {
		return 'es';
	} elseif ( strpos( $locale, 'it' ) === 0 ) {
		return 'it';
	}
	return 'en-us';
}

/**
 * Load plugin textdomain for standard WordPress i18n
 */


/**
 * Enqueue styles and scripts for block frontend and editor canvas
 */
function periodic_grid_flex_enqueue_block_assets() {
	// Bootstrap 5 CSS (local)
	wp_enqueue_style(
		'periodic-grid-flex-bootstrap',
		plugin_dir_url( __FILE__ ) . 'assets/bootstrap/css/bootstrap.min.css',
		array(),
		'5.3.8'
	);

	// Font Awesome 6 (local)
	wp_enqueue_style(
		'periodic-grid-flex-fontawesome',
		plugin_dir_url( __FILE__ ) . 'assets/fontawesome/css/all.min.css',
		array(),
		'6.5.2'
	);

	// Bootstrap 5 JS Bundle (includes Popper, local)
	wp_enqueue_script(
		'periodic-grid-flex-bootstrap-bundle',
		plugin_dir_url( __FILE__ ) . 'assets/bootstrap/js/bootstrap.bundle.min.js',
		array(),
		'5.3.8',
		true
	);
}
add_action( 'enqueue_block_assets', 'periodic_grid_flex_enqueue_block_assets' );

/**
 * Register editor styles support for block themes / iframed Gutenberg canvas
 */
function periodic_grid_flex_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/bootstrap/css/bootstrap.min.css' );
	add_editor_style( 'assets/fontawesome/css/all.min.css' );
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'build/style-index.css' ) ) {
		add_editor_style( 'build/style-index.css' );
	}
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'build/index.css' ) ) {
		add_editor_style( 'build/index.css' );
	}
}
add_action( 'after_setup_theme', 'periodic_grid_flex_add_editor_styles' );

/**
 * Register Gutenberg Block Type and localize translation dictionary
 */
function periodic_grid_flex_register_block() {
	$lang      = periodic_grid_flex_get_current_language();
	$i18n_file = plugin_dir_path( __FILE__ ) . 'languages/' . $lang . '.json';
	if ( ! file_exists( $i18n_file ) ) {
		$i18n_file = plugin_dir_path( __FILE__ ) . 'languages/pt-br.json';
	}

	$i18n_data = array();
	if ( file_exists( $i18n_file ) ) {
		$json_content = file_get_contents( $i18n_file );
		$decoded      = json_decode( $json_content, true );
		if ( is_array( $decoded ) ) {
			$i18n_data = $decoded;
		}
	}

	// Register block via block.json metadata
	$block_type = register_block_type( __DIR__ );

	// Localize script with the loaded language dictionary for WYSIWYG editor
	if ( $block_type && isset( $block_type->editor_script_handles[0] ) ) {
		wp_localize_script(
			$block_type->editor_script_handles[0],
			'periodic_grid_flex_i18n',
			$i18n_data
		);
	}

	// Register column block definition on server side
	register_block_type(
		'periodic/grid-column',
		array(
			'category'        => 'layout',
			'parent'          => array( 'periodic/grid-flex' ),
			'supports'        => array(
				'html'            => false,
				'reusable'        => false,
				'customClassName' => true,
			),
			'render_callback' => null,
		)
	);
}
add_action( 'init', 'periodic_grid_flex_register_block' );

/**
 * Register plugin settings
 */
function periodic_grid_flex_register_settings() {
	register_setting(
		'periodic_grid_flex_settings_group',
		'periodic_grid_flex_language',
		array(
			'type'              => 'string',
			'sanitize_callback' => 'periodic_grid_flex_sanitize_language',
			'default'           => 'auto',
		)
	);
}
add_action( 'admin_init', 'periodic_grid_flex_register_settings' );

/**
 * Sanitize language input
 *
 * @param string $input Selected language code.
 * @return string
 */
function periodic_grid_flex_sanitize_language( $input ) {
	$valid_languages = array( 'auto', 'pt-br', 'en-us', 'es', 'it' );
	if ( in_array( $input, $valid_languages, true ) ) {
		return $input;
	}
	return 'auto';
}

/**
 * Add settings page to WordPress Admin Menu under "Settings"
 */
function periodic_grid_flex_add_admin_menu() {
	add_options_page(
		'periodic Grid Flex',
		'periodic Grid Flex',
		'manage_options',
		'periodic-grid-flex',
		'periodic_grid_flex_render_settings_page'
	);
}
add_action( 'admin_menu', 'periodic_grid_flex_add_admin_menu' );

/**
 * Render Plugin Settings Page in WP Admin
 */
function periodic_grid_flex_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$current_lang = get_option( 'periodic_grid_flex_language', 'auto' );
	$detected     = periodic_grid_flex_get_current_language();
	?>
	<div class="wrap">
		<h1 style="display:flex;align-items:center;gap:10px;">
			<span class="dashicons dashicons-columns" style="font-size:32px;width:32px;height:32px;"></span>
			periodic Grid Flex &mdash; Configurações
		</h1>
		<div style="background:#fff;border:1px solid #ccd0d4;padding:20px 28px;border-radius:8px;max-width:760px;margin-top:20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
			<form method="post" action="options.php">
				<?php
				settings_fields( 'periodic_grid_flex_settings_group' );
				do_settings_sections( 'periodic_grid_flex_settings_group' );
				?>
				<table class="form-table" role="presentation">
					<tbody>
						<tr>
							<th scope="row">
								<label for="periodic_grid_flex_language">Idioma do Bloco / Block Language</label>
							</th>
							<td>
								<select name="periodic_grid_flex_language" id="periodic_grid_flex_language" style="min-width:240px;padding:6px 10px;">
									<option value="auto" <?php selected( $current_lang, 'auto' ); ?>>Automático / Auto-detect (<?php echo esc_html( strtoupper( $detected ) ); ?>)</option>
									<option value="pt-br" <?php selected( $current_lang, 'pt-br' ); ?>>Português do Brasil (pt-BR)</option>
									<option value="en-us" <?php selected( $current_lang, 'en-us' ); ?>>English (en-US)</option>
									<option value="es" <?php selected( $current_lang, 'es' ); ?>>Español (es)</option>
									<option value="it" <?php selected( $current_lang, 'it' ); ?>>Italiano (it)</option>
								</select>
								<p class="description" style="margin-top:8px;">
									Selecione o idioma das instruções e do painel lateral do bloco no editor Gutenberg.
								</p>
							</td>
						</tr>
					</tbody>
				</table>

				<?php submit_button( 'Salvar Configurações' ); ?>
			</form>

			<hr style="margin:24px 0;border:none;border-top:1px solid #e2e4e7;" />

			<div style="font-size:13px;color:#50575e;line-height:1.6;">
				<p><strong>Desenvolvido por:</strong> Luiz Fernando Brogliatto Ferreira</p>
				<p>
					<a href="https://profiles.wordpress.org/periodic/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">WordPress.org</a> &bull;
					<a href="https://github.com/periodicyahoo" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">GitHub</a> &bull;
					<a href="https://www.linkedin.com/in/luiz-ferreira-260277379/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">LinkedIn</a>
				</p>
			</div>
		</div>
	</div>
	<?php
}
