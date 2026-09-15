<?php
/**
 * Settings Page for periodic Mini PDF Image
 *
 * @package Periodic_Mini_PDF_Image
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register plugin settings
 */
function periodic_mini_pdf_register_settings() {
	register_setting(
		'periodic_mini_pdf_settings_group',
		'periodic_mini_pdf_language',
		array(
			'type'              => 'string',
			'sanitize_callback' => 'periodic_mini_pdf_sanitize_language',
			'default'           => 'auto',
		)
	);
}
add_action( 'admin_init', 'periodic_mini_pdf_register_settings' );

/**
 * Sanitize language input
 *
 * @param string $input Selected language code.
 * @return string
 */
function periodic_mini_pdf_sanitize_language( $input ) {
	$valid_languages = array( 'auto', 'pt-br', 'en', 'es', 'it' );
	if ( in_array( $input, $valid_languages, true ) ) {
		return $input;
	}
	return 'auto';
}

/**
 * Add settings page to WordPress Admin Menu under "Settings"
 */
function periodic_mini_pdf_add_admin_menu() {
	add_options_page(
		'periodic Mini PDF Image',
		'periodic Mini PDF',
		'manage_options',
		'periodic-mini-pdf-settings',
		'periodic_mini_pdf_render_settings_page'
	);
}
add_action( 'admin_menu', 'periodic_mini_pdf_add_admin_menu' );

/**
 * Add Settings shortcut link to Plugins list page
 *
 * @param array $links Array of action links.
 * @return array
 */
function periodic_mini_pdf_add_action_links( $links ) {
	$settings_url  = admin_url( 'options-general.php?page=periodic-mini-pdf-settings' );
	$settings_link = '<a href="' . esc_url( $settings_url ) . '">' . esc_html__( 'Settings', 'periodic-mini-pdf-image' ) . '</a>';
	array_unshift( $links, $settings_link );
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( dirname( __DIR__ ) . '/periodic-mini-pdf-image.php' ), 'periodic_mini_pdf_add_action_links' );

/**
 * Render the settings page HTML
 */
function periodic_mini_pdf_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$current_lang = get_option( 'periodic_mini_pdf_language', 'auto' );
	?>
	<div class="wrap">
		<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		
		<div class="card" style="max-width: 680px; margin-top: 20px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px;">
			<form method="post" action="options.php">
				<?php
				settings_fields( 'periodic_mini_pdf_settings_group' );
				?>
				
				<h2 style="margin-top: 0; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0; font-size: 18px;">
					<?php esc_html_e( 'Block Editor Language / Idioma do Bloco', 'periodic-mini-pdf-image' ); ?>
				</h2>

				<p style="color: #646970; font-size: 14px; margin-bottom: 20px;">
					<?php esc_html_e( 'Selecione o idioma a ser exibido nos controles do editor Gutenberg / Select the language displayed in the Gutenberg block editor interface:', 'periodic-mini-pdf-image' ); ?>
				</p>

				<table class="form-table" role="presentation" style="margin-top: 0;">
					<tbody>
						<tr>
							<th scope="row" style="padding-top: 10px; width: 220px;">
								<label for="periodic_mini_pdf_language"><strong><?php esc_html_e( 'Language / Idioma', 'periodic-mini-pdf-image' ); ?></strong></label>
							</th>
							<td style="padding-top: 10px;">
								<select name="periodic_mini_pdf_language" id="periodic_mini_pdf_language" style="min-width: 280px; height: 38px; border-radius: 4px;">
									<option value="auto" <?php selected( $current_lang, 'auto' ); ?>>
										<?php esc_html_e( 'Auto (WordPress Default / Detect)', 'periodic-mini-pdf-image' ); ?>
									</option>
									<option value="pt-br" <?php selected( $current_lang, 'pt-br' ); ?>>
										Português (Brasil)
									</option>
									<option value="en" <?php selected( $current_lang, 'en' ); ?>>
										English
									</option>
									<option value="es" <?php selected( $current_lang, 'es' ); ?>>
										Español
									</option>
									<option value="it" <?php selected( $current_lang, 'it' ); ?>>
										Italiano
									</option>
								</select>
								<p class="description" style="margin-top: 8px;">
									<?php esc_html_e( 'Escolha um idioma fixo ou mantenha Auto para usar o idioma padrão da conta de usuário no WordPress.', 'periodic-mini-pdf-image' ); ?>
								</p>
							</td>
						</tr>
					</tbody>
				</table>

				<div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
					<?php submit_button( esc_html__( 'Salvar Alterações / Save Changes', 'periodic-mini-pdf-image' ), 'primary', 'submit', true ); ?>
				</div>
			</form>
		</div>
	</div>
	<?php
}
