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

$simulator_title = isset( $attributes['simulatorTitle'] ) ? $attributes['simulatorTitle'] : __( 'Simulador de Software Interativo', 'simulador-software-abnt' );
$steps = isset( $attributes['steps'] ) ? $attributes['steps'] : [];

// Normaliza URLs de imagens locais
if ( function_exists( 'simulador_software_normalize_steps' ) ) {
    $steps = simulador_software_normalize_steps( $steps );
}

$config = array(
    'simulatorTitle'          => $simulator_title,
    'steps'                   => $steps,
    'showProgressBar'         => isset( $attributes['showProgressBar'] ) ? (bool) $attributes['showProgressBar'] : true,
    'showRestartButton'       => isset( $attributes['showRestartButton'] ) ? (bool) $attributes['showRestartButton'] : true,
    'showStepIndicator'       => isset( $attributes['showStepIndicator'] ) ? (bool) $attributes['showStepIndicator'] : true,
    'highlightHints'          => isset( $attributes['highlightHints'] ) ? (bool) $attributes['highlightHints'] : true,
    'allowClickAnywhereHint'   => isset( $attributes['allowClickAnywhereHint'] ) ? (bool) $attributes['allowClickAnywhereHint'] : true,
    'customSuccessMessage'    => isset( $attributes['customSuccessMessage'] ) ? $attributes['customSuccessMessage'] : __( 'Parabéns! Você completou com sucesso a simulação de software!', 'simulador-software-abnt' ),
);

$wrapper_attributes = get_block_wrapper_attributes( array(
    'class' => 'wp-block-custom-simulador-software',
) );
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="sim-player-wrapper" data-initialized="false">
        <script type="application/json" class="sim-data-config">
            <?php echo wp_json_encode( $config ); ?>
        </script>
        <noscript>
            <div class="sim-noscript-alert" style="padding: 20px; background: #1e293b; color: #ffffff; text-align: center; border-radius: 8px;">
                <p><?php esc_html_e( 'Este simulador interativo requer JavaScript ativado para ser executado.', 'simulador-software-abnt' ); ?></p>
            </div>
        </noscript>
    </div>
</div>
