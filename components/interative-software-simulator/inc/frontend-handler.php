<?php
/**
 * Frontend Handler & Render Helpers for custom/simulador-software
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Retorna os passos padrão do cenário da simulação (Windows 11 + ABNT Word)
 * Garante que mesmo sem dados customizados no Gutenberg, o simulador sempre exiba o tutorial completo.
 *
 * @return array
 */
function periodic_simulador_software_get_default_steps() {
    return array(
        array(
            'id'          => 'step-1-desktop',
            'title'       => __( 'Área de Trabalho do Windows 11', 'luiz0067-periodic' ),
            'imageUrl'    => 'assets/step1-windows11-desktop.svg',
            'imageId'     => null,
            'instruction' => __( 'Passo 1: Clique no ícone do Menu Iniciar centralizado na barra de tarefas do Windows 11.', 'luiz0067-periodic' ),
            'elements'    => array(
                array(
                    'id'              => 'el-start-btn',
                    'type'            => 'click',
                    'top'             => 95.0,
                    'left'            => 44.5,
                    'width'           => 3.0,
                    'height'          => 4.8,
                    'label'           => __( 'Botão Iniciar', 'luiz0067-periodic' ),
                    'targetStepIndex' => 1,
                ),
            ),
        ),
        array(
            'id'          => 'step-2-startmenu',
            'title'       => __( 'Menu Iniciar e Pesquisa', 'luiz0067-periodic' ),
            'imageUrl'    => 'assets/step2-windows11-startmenu.svg',
            'imageId'     => null,
            'instruction' => __( 'Passo 2: Digite "Word" na caixa de pesquisa do Menu Iniciar e pressione Enter para abrir o programa.', 'luiz0067-periodic' ),
            'elements'    => array(
                array(
                    'id'              => 'el-search-input',
                    'type'            => 'input',
                    'top'             => 30.1,
                    'left'            => 35.4,
                    'width'           => 29.2,
                    'height'          => 4.3,
                    'expectedValue'   => 'Word',
                    'placeholder'     => __( 'Digite "Word" e pressione Enter...', 'luiz0067-periodic' ),
                    'label'           => __( 'Pesquisa do Menu Iniciar', 'luiz0067-periodic' ),
                    'targetStepIndex' => 2,
                ),
            ),
        ),
        array(
            'id'          => 'step-3-word-open',
            'title'       => __( 'Microsoft Word - Documento em Branco', 'luiz0067-periodic' ),
            'imageUrl'    => 'assets/step3-word-document.svg',
            'imageId'     => null,
            'instruction' => __( 'Passo 3: Com o Microsoft Word aberto, clique na aba "Layout" na faixa de opções superior.', 'luiz0067-periodic' ),
            'elements'    => array(
                array(
                    'id'              => 'el-tab-layout',
                    'type'            => 'click',
                    'top'             => 4.5,
                    'left'            => 22.4,
                    'width'           => 4.2,
                    'height'          => 3.6,
                    'label'           => __( 'Aba Layout', 'luiz0067-periodic' ),
                    'targetStepIndex' => 3,
                ),
            ),
        ),
        array(
            'id'          => 'step-4-layout-ribbon',
            'title'       => __( 'Aba Layout e Menu Margens', 'luiz0067-periodic' ),
            'imageUrl'    => 'assets/step4-word-layout-ribbon.svg',
            'imageId'     => null,
            'instruction' => __( 'Passo 4: No menu de Margens, role até o final da lista e clique em "Margens Personalizadas...".', 'luiz0067-periodic' ),
            'elements'    => array(
                array(
                    'id'              => 'el-custom-margins',
                    'type'            => 'click',
                    'top'             => 44.4,
                    'left'            => 1.5,
                    'width'           => 15.8,
                    'height'          => 4.9,
                    'label'           => __( 'Margens Personalizadas...', 'luiz0067-periodic' ),
                    'targetStepIndex' => 4,
                ),
            ),
        ),
        array(
            'id'          => 'step-5-page-setup-modal',
            'title'       => __( 'Configurar Página - Margens ABNT', 'luiz0067-periodic' ),
            'imageUrl'    => 'assets/step5-word-margins-modal.svg',
            'imageId'     => null,
            'instruction' => __( 'Passo 5: Preencha as 4 margens no padrão ABNT (Superior: 3, Esquerda: 3, Inferior: 2, Direita: 2) e clique em OK.', 'luiz0067-periodic' ),
            'elements'    => array(
                array(
                    'id'            => 'el-margin-superior',
                    'type'          => 'input',
                    'top'           => 32.3,
                    'left'          => 39.9,
                    'width'         => 5.5,
                    'height'        => 2.6,
                    'expectedValue' => '3',
                    'placeholder'   => '3',
                    'label'         => __( 'Superior (3)', 'luiz0067-periodic' ),
                    'group'         => 'abnt-margins',
                ),
                array(
                    'id'            => 'el-margin-esquerda',
                    'type'          => 'input',
                    'top'           => 36.4,
                    'left'          => 39.9,
                    'width'         => 5.5,
                    'height'        => 2.6,
                    'expectedValue' => '3',
                    'placeholder'   => '3',
                    'label'         => __( 'Esquerda (3)', 'luiz0067-periodic' ),
                    'group'         => 'abnt-margins',
                ),
                array(
                    'id'            => 'el-margin-inferior',
                    'type'          => 'input',
                    'top'           => 32.3,
                    'left'          => 54.0,
                    'width'         => 5.5,
                    'height'        => 2.6,
                    'expectedValue' => '2',
                    'placeholder'   => '2',
                    'label'         => __( 'Inferior (2)', 'luiz0067-periodic' ),
                    'group'         => 'abnt-margins',
                ),
                array(
                    'id'            => 'el-margin-direita',
                    'type'          => 'input',
                    'top'           => 36.4,
                    'left'          => 54.0,
                    'width'         => 5.5,
                    'height'        => 2.6,
                    'expectedValue' => '2',
                    'placeholder'   => '2',
                    'label'         => __( 'Direita (2)', 'luiz0067-periodic' ),
                    'group'         => 'abnt-margins',
                ),
                array(
                    'id'                      => 'el-btn-ok',
                    'type'                    => 'click',
                    'top'                     => 73.1,
                    'left'                    => 54.6,
                    'width'                   => 5.0,
                    'height'                  => 3.0,
                    'label'                   => __( 'Botão OK', 'luiz0067-periodic' ),
                    'requiresCompletedInputs' => true,
                    'targetStepIndex'         => -1,
                ),
            ),
        ),
    );
}

/**
 * Normaliza caminhos de imagens locais do plugin para URLs absolutas válidas
 *
 * @param array $steps Lista de passos da simulação
 * @return array Lista de passos com URLs normalizadas
 */
function periodic_simulador_software_normalize_steps( $steps ) {
    if ( ! is_array( $steps ) ) {
        return array();
    }

    $base_url = defined( 'PERIODIC_SIMULADOR_SOFTWARE_URL' )
        ? PERIODIC_SIMULADOR_SOFTWARE_URL
        : ( defined( 'PERIODIC_URL' )
            ? PERIODIC_URL . 'components/interative-software-simulator/'
            : plugin_dir_url( dirname( __DIR__ ) . '/interative-software-simulator.php' ) );

    $base_url = trailingslashit( $base_url );

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

/**
 * Renderiza o simulador de software via PHP (para blocos, shortcodes ou chamadas diretas no tema)
 *
 * @param array $attributes Atributos de configuração
 * @return string HTML renderizado
 */
function periodic_simulador_software_render( $attributes = array() ) {
    $plugin_url = defined( 'PERIODIC_SIMULADOR_SOFTWARE_URL' )
        ? PERIODIC_SIMULADOR_SOFTWARE_URL
        : ( defined( 'PERIODIC_URL' )
            ? PERIODIC_URL . 'components/interative-software-simulator/'
            : plugin_dir_url( dirname( __DIR__ ) . '/interative-software-simulator.php' ) );

    $plugin_url = trailingslashit( $plugin_url );
    $version    = defined( 'PERIODIC_SIMULADOR_SOFTWARE_VERSION' ) ? PERIODIC_SIMULADOR_SOFTWARE_VERSION : '1.1.0';

    // Garante o enfileiramento dos estilos e scripts mesmo em temas clássicos ou renderização tardia
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

    $title = ! empty( $attributes['simulatorTitle'] ) ? $attributes['simulatorTitle'] : __( 'Simulador de Software: Formatação ABNT no Windows 11', 'luiz0067-periodic' );
    $steps = ! empty( $attributes['steps'] ) ? $attributes['steps'] : periodic_simulador_software_get_default_steps();
    $steps = periodic_simulador_software_normalize_steps( $steps );

    $config = array(
        'simulatorTitle'         => $title,
        'steps'                  => $steps,
        'showProgressBar'        => isset( $attributes['showProgressBar'] ) ? (bool) $attributes['showProgressBar'] : true,
        'showRestartButton'      => isset( $attributes['showRestartButton'] ) ? (bool) $attributes['showRestartButton'] : true,
        'showStepIndicator'      => isset( $attributes['showStepIndicator'] ) ? (bool) $attributes['showStepIndicator'] : true,
        'highlightHints'         => isset( $attributes['highlightHints'] ) ? (bool) $attributes['highlightHints'] : true,
        'allowClickAnywhereHint'  => isset( $attributes['allowClickAnywhereHint'] ) ? (bool) $attributes['allowClickAnywhereHint'] : true,
        'customSuccessMessage'   => ! empty( $attributes['customSuccessMessage'] ) ? $attributes['customSuccessMessage'] : __( 'Parabéns! Você completou com sucesso a simulação de software!', 'luiz0067-periodic' ),
    );

    $wrapper_class = 'wp-block-custom-simulador-software';
    if ( ! empty( $attributes['className'] ) ) {
        $wrapper_class .= ' ' . sanitize_html_class( $attributes['className'] );
    }

    ob_start();
    ?>
    <div class="<?php echo esc_attr( $wrapper_class ); ?>">
        <div class="sim-player-wrapper" data-initialized="false">
            <script type="application/json" class="sim-data-config">
                <?php echo wp_json_encode( $config ); ?>
            </script>
            <div class="sim-loading-placeholder" style="padding: 40px 20px; text-align: center; background: #0f172a; color: #f8fafc; border-radius: 14px; min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="width: 38px; height: 38px; border: 3px solid rgba(59,130,246,0.3); border-top-color: #3b82f6; border-radius: 50%; animation: sim-spin 0.9s linear infinite; margin-bottom: 16px;"></div>
                <h3 style="margin: 0 0 8px 0; font-size: 1.15rem; color: #ffffff;"><?php echo esc_html( $title ); ?></h3>
                <p style="margin: 0; font-size: 0.875rem; color: #94a3b8;"><?php esc_html_e( 'Carregando simulação interativa...', 'luiz0067-periodic' ); ?></p>
            </div>
            <noscript>
                <div class="sim-noscript-alert" style="padding: 20px; background: #1e293b; color: #ffffff; text-align: center; border-radius: 8px; margin-top: 10px;">
                    <p><?php esc_html_e( 'Este simulador interativo requer JavaScript ativado para ser executado.', 'luiz0067-periodic' ); ?></p>
                </div>
            </noscript>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Suporte a Shortcode: [simulador_software] ou [simulador-software]
 *
 * @param array $atts Atributos do shortcode
 * @return string
 */
function periodic_simulador_software_shortcode( $atts = array() ) {
    $atts = shortcode_atts(
        array(
            'title'               => '',
            'show_progress'       => 'true',
            'show_restart'        => 'true',
            'show_step_indicator' => 'true',
            'class'               => '',
        ),
        $atts,
        'simulador_software'
    );

    $attributes = array(
        'simulatorTitle'    => ! empty( $atts['title'] ) ? sanitize_text_field( $atts['title'] ) : '',
        'showProgressBar'   => filter_var( $atts['show_progress'], FILTER_VALIDATE_BOOLEAN ),
        'showRestartButton' => filter_var( $atts['show_restart'], FILTER_VALIDATE_BOOLEAN ),
        'showStepIndicator' => filter_var( $atts['show_step_indicator'], FILTER_VALIDATE_BOOLEAN ),
        'className'         => sanitize_text_field( $atts['class'] ),
    );

    return periodic_simulador_software_render( $attributes );
}
add_shortcode( 'simulador_software', 'periodic_simulador_software_shortcode' );
add_shortcode( 'simulador-software', 'periodic_simulador_software_shortcode' );

/**
 * Função de template global para usar em arquivos PHP do tema (ex: single.php, page.php, front-page.php)
 *
 * @param array $args
 */
if ( ! function_exists( 'periodic_simulador_software' ) ) {
    function periodic_simulador_software( $args = array() ) {
        echo periodic_simulador_software_render( $args );
    }
}
