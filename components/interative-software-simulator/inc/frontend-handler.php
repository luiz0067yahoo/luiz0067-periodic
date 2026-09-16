<?php
/**
 * Frontend Handler & Render Helpers
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Normaliza caminhos de imagens locais do plugin para URLs absolutas válidas
 *
 * @param array $steps Lista de passos da simulação
 * @return array Lista de passos com URLs normalizadas
 */
function periodic_simulador_software_normalize_steps( $steps ) {
    if ( ! is_array( $steps ) ) {
        return [];
    }

    $base_url = defined( 'PERIODIC_SIMULADOR_SOFTWARE_URL' ) ? PERIODIC_SIMULADOR_SOFTWARE_URL : ( defined( 'PERIODIC_URL' ) ? PERIODIC_URL . 'components/interative-software-simulator/' : '' );

    foreach ( $steps as &$step ) {
        if ( ! empty( $step['imageUrl'] ) ) {
            // Se for relativo aos assets do plugin
            if ( strpos( $step['imageUrl'], 'assets/' ) === 0 ) {
                $step['imageUrl'] = $base_url . $step['imageUrl'];
            }
        }
    }

    return $steps;
}

