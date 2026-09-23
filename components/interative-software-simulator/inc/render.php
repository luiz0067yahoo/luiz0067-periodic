<?php
/**
 * Dynamic Render Template for custom/simulador-software
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once __DIR__ . '/frontend-handler.php';

$plugin_url = defined( 'PERIODIC_SIMULADOR_SOFTWARE_URL' )
    ? PERIODIC_SIMULADOR_SOFTWARE_URL
    : ( defined( 'PERIODIC_URL' )
        ? PERIODIC_URL . 'components/interative-software-simulator/'
        : plugin_dir_url( dirname( __FILE__ ) . '/interative-software-simulator.php' ) );

$plugin_url = trailingslashit( $plugin_url );
$version    = defined( 'PERIODIC_SIMULADOR_SOFTWARE_VERSION' ) ? PERIODIC_SIMULADOR_SOFTWARE_VERSION : '1.1.0';

// Força o registro e enfileiramento de CSS e JS no momento do render para compatibilidade com qualquer tema
if ( ! wp_style_is( 'custom-simulador-software-style', 'registered' ) ) {
    wp_register_style(
        'custom-simulador-software-style',
        $plugin_url . 'build/style-index.css',
        array(),
        $version
    );
}
wp_enqueue_style( 'custom-simulador-software-style' );

if ( ! wp_script_is( 'custom-simulador-software-view-script', 'registered' ) ) {
    wp_register_script(
        'custom-simulador-software-view-script',
        $plugin_url . 'build/view.js',
        array(),
        $version,
        true
    );
}
wp_enqueue_script( 'custom-simulador-software-view-script' );

wp_localize_script(
    'custom-simulador-software-view-script',
    'simuladorSoftwareSettings',
    array(
        'pluginUrl' => $plugin_url,
    )
);

$periodic_sim_title = ! empty( $attributes['simulatorTitle'] ) ? $attributes['simulatorTitle'] : __( 'Simulador de Software: Formatação ABNT no Windows 11', 'luiz0067-periodic' );
$periodic_sim_steps = ! empty( $attributes['steps'] ) ? $attributes['steps'] : periodic_simulador_software_get_default_steps();
$periodic_sim_steps = periodic_simulador_software_normalize_steps( $periodic_sim_steps );

$periodic_sim_config = array(
    'simulatorTitle'         => $periodic_sim_title,
    'steps'                  => $periodic_sim_steps,
    'showProgressBar'        => isset( $attributes['showProgressBar'] ) ? (bool) $attributes['showProgressBar'] : true,
    'showRestartButton'      => isset( $attributes['showRestartButton'] ) ? (bool) $attributes['showRestartButton'] : true,
    'showStepIndicator'      => isset( $attributes['showStepIndicator'] ) ? (bool) $attributes['showStepIndicator'] : true,
    'highlightHints'         => isset( $attributes['highlightHints'] ) ? (bool) $attributes['highlightHints'] : true,
    'allowClickAnywhereHint'  => isset( $attributes['allowClickAnywhereHint'] ) ? (bool) $attributes['allowClickAnywhereHint'] : true,
    'customSuccessMessage'   => ! empty( $attributes['customSuccessMessage'] ) ? $attributes['customSuccessMessage'] : __( 'Parabéns! Você completou com sucesso a simulação de software!', 'luiz0067-periodic' ),
);

$periodic_sim_wrapper_attributes = get_block_wrapper_attributes( array(
    'class' => 'wp-block-custom-simulador-software',
) );
?>

<div <?php echo $periodic_sim_wrapper_attributes; ?>>
    <div class="sim-player-wrapper" data-initialized="false" style="overflow: visible !important;">
        <script type="application/json" class="sim-data-config">
            <?php echo wp_json_encode( $periodic_sim_config ); ?>
        </script>
        <div class="sim-loading-placeholder" style="padding: 40px 20px; text-align: center; background: #0f172a; color: #f8fafc; border-radius: 14px; min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
            <div style="width: 38px; height: 38px; border: 3px solid rgba(59,130,246,0.3); border-top-color: #3b82f6; border-radius: 50%; animation: sim-spin 0.9s linear infinite; margin-bottom: 16px;"></div>
            <h3 style="margin: 0 0 8px 0; font-size: 1.15rem; color: #ffffff;"><?php echo esc_html( $periodic_sim_title ); ?></h3>
            <p style="margin: 0; font-size: 0.875rem; color: #94a3b8;"><?php esc_html_e( 'Carregando simulação interativa...', 'luiz0067-periodic' ); ?></p>
        </div>
        <noscript>
            <div class="sim-noscript-alert" style="padding: 20px; background: #1e293b; color: #ffffff; text-align: center; border-radius: 8px; margin-top: 10px;">
                <p><?php esc_html_e( 'Este simulador interativo requer JavaScript ativado para ser executado.', 'luiz0067-periodic' ); ?></p>
            </div>
        </noscript>
    </div>
</div>
