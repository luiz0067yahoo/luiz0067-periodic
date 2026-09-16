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

$periodic_sim_title = isset( $attributes['simulatorTitle'] ) ? $attributes['simulatorTitle'] : __( 'Simulador de Software Interativo', 'luiz0067-periodic' );
$periodic_sim_steps = isset( $attributes['steps'] ) ? $attributes['steps'] : [];

// Normaliza URLs de imagens locais
if ( function_exists( 'periodic_simulador_software_normalize_steps' ) ) {
    $periodic_sim_steps = periodic_simulador_software_normalize_steps( $periodic_sim_steps );
}

$periodic_sim_config = array(
    'simulatorTitle'          => $periodic_sim_title,
    'steps'                   => $periodic_sim_steps,
    'showProgressBar'         => isset( $attributes['showProgressBar'] ) ? (bool) $attributes['showProgressBar'] : true,
    'showRestartButton'       => isset( $attributes['showRestartButton'] ) ? (bool) $attributes['showRestartButton'] : true,
    'showStepIndicator'       => isset( $attributes['showStepIndicator'] ) ? (bool) $attributes['showStepIndicator'] : true,
    'highlightHints'          => isset( $attributes['highlightHints'] ) ? (bool) $attributes['highlightHints'] : true,
    'allowClickAnywhereHint'   => isset( $attributes['allowClickAnywhereHint'] ) ? (bool) $attributes['allowClickAnywhereHint'] : true,
    'customSuccessMessage'    => isset( $attributes['customSuccessMessage'] ) ? $attributes['customSuccessMessage'] : __( 'Parabéns! Você completou com sucesso a simulação de software!', 'luiz0067-periodic' ),
);

$periodic_sim_wrapper_attributes = get_block_wrapper_attributes( array(
    'class' => 'wp-block-custom-simulador-software',
) );
?>

<div <?php echo wp_kses_data( $periodic_sim_wrapper_attributes ); ?>>
    <div class="sim-player-wrapper" data-initialized="false">
        <script type="application/json" class="sim-data-config">
            <?php echo wp_json_encode( $periodic_sim_config ); ?>
        </script>
        <noscript>
            <div class="sim-noscript-alert" style="padding: 20px; background: #1e293b; color: #ffffff; text-align: center; border-radius: 8px;">
                <p><?php esc_html_e( 'Este simulador interativo requer JavaScript ativado para ser executado.', 'luiz0067-periodic' ); ?></p>
            </div>
        </noscript>
    </div>
</div>
