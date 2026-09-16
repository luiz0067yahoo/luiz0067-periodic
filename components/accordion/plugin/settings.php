<?php
/**
 * Settings Page for periodic Bootstrap Accordion
 *
 * @package Periodic_Accordion
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register plugin settings
 */
function periodic_accordion_register_settings() {
	register_setting(
		'periodic_accordion_settings_group',
		'periodic_accordion_language',
		array(
			'type'              => 'string',
			'sanitize_callback' => 'periodic_accordion_sanitize_language',
			'default'           => 'auto',
		)
	);
}
add_action( 'admin_init', 'periodic_accordion_register_settings' );

/**
 * Sanitize language input
 *
 * @param string $input Selected language code.
 * @return string
 */
function periodic_accordion_sanitize_language( $input ) {
	$valid_languages = array( 'auto', 'pt-br', 'en', 'es', 'it' );
	if ( in_array( $input, $valid_languages, true ) ) {
		return $input;
	}
	return 'auto';
}

/**
 * Add settings page to WordPress Admin Menu under "Settings"
 */
function periodic_accordion_add_admin_menu() {
	add_options_page(
		'periodic Accordion',
		'periodic Accordion',
		'manage_options',
		'periodic-accordion-settings',
		'periodic_accordion_render_settings_page'
	);
}
add_action( 'admin_menu', 'periodic_accordion_add_admin_menu' );

/**
 * Add Settings shortcut link to Plugins list page
 *
 * @param array $links Array of action links.
 * @return array
 */
function periodic_accordion_add_action_links( $links ) {
	$settings_url  = admin_url( 'options-general.php?page=periodic-accordion-settings' );
	$settings_link = '<a href="' . esc_url( $settings_url ) . '">' . esc_html__( 'Settings', 'luiz0067-periodic' ) . '</a>';
	array_unshift( $links, $settings_link );
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( dirname( __DIR__ ) . '/periodic-accordion.php' ), 'periodic_accordion_add_action_links' );

/**
 * Render the settings page HTML
 */
function periodic_accordion_render_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$current_lang = get_option( 'periodic_accordion_language', 'auto' );
	?>
	<div class="wrap">
		<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		
		<div class="card" style="max-width: 680px; margin-top: 20px; padding: 24px 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); border-radius: 8px; border: 1px solid #ccd0d4;">
			<form method="post" action="options.php">
				<?php
				settings_fields( 'periodic_accordion_settings_group' );
				?>
				
				<h2 style="margin-top: 0; padding-bottom: 12px; border-bottom: 1px solid #e2e4e7; font-size: 1.25rem;">
					<?php esc_html_e( 'Block Editor Language / Idioma do Bloco', 'luiz0067-periodic' ); ?>
				</h2>

				<p style="color: #646970; font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
					<?php esc_html_e( 'Select the language displayed in the Gutenberg block editor interface for the Bootstrap Accordion block:', 'luiz0067-periodic' ); ?>
				</p>

				<table class="form-table" role="presentation" style="margin-top: 0;">
					<tbody>
						<tr>
							<th scope="row" style="padding-top: 10px;">
								<label for="periodic_accordion_language"><strong><?php esc_html_e( 'Language / Idioma', 'luiz0067-periodic' ); ?></strong></label>
							</th>
							<td style="padding-top: 10px;">
								<select name="periodic_accordion_language" id="periodic_accordion_language" style="min-width: 280px; height: 38px; border-radius: 4px;">
									<option value="auto" <?php selected( $current_lang, 'auto' ); ?>>
										<?php esc_html_e( 'Auto (WordPress Default / Detect)', 'luiz0067-periodic' ); ?>
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
									<?php esc_html_e( 'Choose a specific language to override the WordPress locale in the block editor.', 'luiz0067-periodic' ); ?>
								</p>
							</td>
						</tr>
					</tbody>
				</table>

				<?php submit_button( esc_html__( 'Save Changes', 'luiz0067-periodic' ), 'primary', 'submit', true, array( 'style' => 'margin-top: 15px;' ) ); ?>
			</form>
		</div>
	</div>
	<?php
}
