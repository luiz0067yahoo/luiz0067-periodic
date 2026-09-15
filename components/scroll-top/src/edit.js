import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	SelectControl,
	RangeControl,
	ColorPalette,
	TextControl,
	ToggleControl,
	BaseControl,
	Button,
	Card,
	CardBody,
	CardHeader,
	Notice,
	Flex,
	FlexItem,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Ícones populares de Font Awesome 6 para Voltar ao Topo.
 */
const POPULAR_ICONS = [
	{ label: 'Chevron para Cima', value: 'fas fa-chevron-up', icon: 'fa-chevron-up' },
	{ label: 'Seta para Cima', value: 'fas fa-arrow-up', icon: 'fa-arrow-up' },
	{ label: 'Seta Longa para Cima', value: 'fas fa-arrow-up-long', icon: 'fa-arrow-up-long' },
	{ label: 'Ângulo para Cima', value: 'fas fa-angle-up', icon: 'fa-angle-up' },
	{ label: 'Duplo Ângulo (Chevrons)', value: 'fas fa-angles-up', icon: 'fa-angles-up' },
	{ label: 'Caret para Cima', value: 'fas fa-caret-up', icon: 'fa-caret-up' },
	{ label: 'Foguete', value: 'fas fa-rocket', icon: 'fa-rocket' },
	{ label: 'Avião de Papel', value: 'fas fa-paper-plane', icon: 'fa-paper-plane' },
];

/**
 * Cores temáticas recomendadas Bootstrap 5.
 */
const THEME_COLORS = [
	{ name: 'Azul Bootstrap (Primary)', color: '#0d6efd' },
	{ name: 'Cinza Escuro (Dark)', color: '#212529' },
	{ name: 'Verde (Success)', color: '#198754' },
	{ name: 'Vermelho (Danger)', color: '#dc3545' },
	{ name: 'Azul Claro (Info)', color: '#0dcaf0' },
	{ name: 'Índigo Moderno', color: '#6610f2' },
	{ name: 'Roxo Elegante', color: '#6f42c1' },
	{ name: 'Rosa Vibrante', color: '#d63384' },
	{ name: 'Branco Puro', color: '#ffffff' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		iconClass = 'fas fa-chevron-up',
		position = 'bottom-right',
		scrollOffset = 300,
		buttonShape = 'circle',
		bgColor = '#0d6efd',
		iconColor = '#ffffff',
		buttonSize = 48,
		offsetX = 24,
		offsetY = 24,
		zIndex = 9999,
		ariaLabel = 'Voltar ao topo',
	} = attributes;

	const [ forceFloatingPreview, setForceFloatingPreview ] = useState( true );

	const blockProps = useBlockProps( {
		className: 'periodic-scroll-top-editor-wrapper',
	} );

	// Formato geométrico
	const getBorderRadius = () => {
		if ( buttonShape === 'circle' ) {
			return '50%';
		}
		if ( buttonShape === 'rounded' ) {
			return '0.65rem';
		}
		return '0'; // square
	};

	// Estilo dinâmico para pré-visualização
	const previewButtonStyle = {
		backgroundColor: bgColor,
		color: iconColor,
		width: `${ buttonSize }px`,
		height: `${ buttonSize }px`,
		fontSize: `${ Math.round( buttonSize * 0.42 ) }px`,
		borderRadius: getBorderRadius(),
	};

	// Posição flutuante simulada no editor
	const floatingStyle = {
		...previewButtonStyle,
		position: 'fixed',
		bottom: `${ offsetY }px`,
		...( position === 'bottom-right'
			? { right: `${ offsetX }px` }
			: { left: `${ offsetX }px` } ),
		zIndex,
	};

	return (
		<div { ...blockProps }>
			{ /* Controles do Inspetor / Painel Lateral */ }
			<InspectorControls>
				<div className="periodic-inspector-tabs">
					<TabPanel
						className="periodic-tab-panel"
						activeClass="is-active"
						tabs={ [
							{
								name: 'positioning',
								title: __( 'Posicionamento', 'periodic-scroll-top' ),
								className: 'tab-positioning',
							},
							{
								name: 'appearance',
								title: __( 'Aparência', 'periodic-scroll-top' ),
								className: 'tab-appearance',
							},
							{
								name: 'scrollTrigger',
								title: __( 'Gatilho de Rolagem', 'periodic-scroll-top' ),
								className: 'tab-scroll-trigger',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name === 'positioning' ) {
								return (
									<PanelBody title={ __( 'Configurações de Posicionamento', 'periodic-scroll-top' ) }>
										<SelectControl
											label={ __( 'Posição na Tela', 'periodic-scroll-top' ) }
											value={ position }
											options={ [
												{
													label: __( 'Canto Inferior Direito', 'periodic-scroll-top' ),
													value: 'bottom-right',
												},
												{
													label: __( 'Canto Inferior Esquerdo', 'periodic-scroll-top' ),
													value: 'bottom-left',
												},
											] }
											onChange={ ( value ) => setAttributes( { position: value } ) }
											help={ __( 'Define o canto da página onde o botão ficará fixado.', 'periodic-scroll-top' ) }
										/>

										<RangeControl
											label={ __( 'Distância Horizontal (px)', 'periodic-scroll-top' ) }
											value={ offsetX }
											onChange={ ( value ) => setAttributes( { offsetX: value } ) }
											min={ 8 }
											max={ 120 }
											step={ 2 }
											help={ __( 'Distância da lateral da tela (direita ou esquerda).', 'periodic-scroll-top' ) }
										/>

										<RangeControl
											label={ __( 'Distância Inferior (px)', 'periodic-scroll-top' ) }
											value={ offsetY }
											onChange={ ( value ) => setAttributes( { offsetY: value } ) }
											min={ 8 }
											max={ 120 }
											step={ 2 }
											help={ __( 'Distância da margem inferior da janela.', 'periodic-scroll-top' ) }
										/>

										<RangeControl
											label={ __( 'Ordem de Camada (z-index)', 'periodic-scroll-top' ) }
											value={ zIndex }
											onChange={ ( value ) => setAttributes( { zIndex: value } ) }
											min={ 100 }
											max={ 99999 }
											step={ 100 }
											help={ __( 'Garante que o botão flutuante fique acima de cabeçalhos e rodapés.', 'periodic-scroll-top' ) }
										/>
									</PanelBody>
								);
							}

							if ( tab.name === 'appearance' ) {
								return (
									<PanelBody title={ __( 'Customização Visual', 'periodic-scroll-top' ) }>
										<SelectControl
											label={ __( 'Formato do Botão', 'periodic-scroll-top' ) }
											value={ buttonShape }
											options={ [
												{ label: __( 'Círculo (Circular)', 'periodic-scroll-top' ), value: 'circle' },
												{ label: __( 'Quadrado Arredondado', 'periodic-scroll-top' ), value: 'rounded' },
												{ label: __( 'Quadrado Reto', 'periodic-scroll-top' ), value: 'square' },
											] }
											onChange={ ( value ) => setAttributes( { buttonShape: value } ) }
										/>

										<RangeControl
											label={ __( 'Tamanho do Botão (px)', 'periodic-scroll-top' ) }
											value={ buttonSize }
											onChange={ ( value ) => setAttributes( { buttonSize: value } ) }
											min={ 36 }
											max={ 80 }
											step={ 2 }
										/>

										<BaseControl
											label={ __( 'Cor de Fundo', 'periodic-scroll-top' ) }
											id="periodic-bg-color-control"
										>
											<ColorPalette
												colors={ THEME_COLORS }
												value={ bgColor }
												onChange={ ( color ) => setAttributes( { bgColor: color || '#0d6efd' } ) }
												clearable={ false }
											/>
										</BaseControl>

										<BaseControl
											label={ __( 'Cor do Ícone', 'periodic-scroll-top' ) }
											id="periodic-icon-color-control"
										>
											<ColorPalette
												colors={ THEME_COLORS }
												value={ iconColor }
												onChange={ ( color ) => setAttributes( { iconColor: color || '#ffffff' } ) }
												clearable={ false }
											/>
										</BaseControl>

										<hr className="my-3" />

										<BaseControl
											label={ __( 'Seleção Rápida de Ícone', 'periodic-scroll-top' ) }
											id="periodic-popular-icons-control"
											help={ __( 'Clique em um dos modelos sugeridos ou digite uma classe personalizada abaixo.', 'periodic-scroll-top' ) }
										>
											<div className="periodic-icon-grid">
												{ POPULAR_ICONS.map( ( item ) => (
													<Button
														key={ item.value }
														isPrimary={ iconClass === item.value }
														isSecondary={ iconClass !== item.value }
														className="periodic-icon-btn"
														onClick={ () => setAttributes( { iconClass: item.value } ) }
														title={ item.label }
													>
														<i className={ `${ item.value } fa-fw` } aria-hidden="true"></i>
													</Button>
												) ) }
											</div>
										</BaseControl>

										<TextControl
											label={ __( 'Classe CSS do Ícone Font Awesome', 'periodic-scroll-top' ) }
											value={ iconClass }
											onChange={ ( value ) => setAttributes( { iconClass: value } ) }
											placeholder="fas fa-chevron-up"
											help={ __( 'Ex: fas fa-chevron-up, fas fa-arrow-up, fas fa-rocket', 'periodic-scroll-top' ) }
										/>
									</PanelBody>
								);
							}

							if ( tab.name === 'scrollTrigger' ) {
								return (
									<PanelBody title={ __( 'Gatilho de Rolagem e Acessibilidade', 'periodic-scroll-top' ) }>
										<RangeControl
											label={ __( 'Distância de Rolagem para Exibir (px)', 'periodic-scroll-top' ) }
											value={ scrollOffset }
											onChange={ ( value ) => setAttributes( { scrollOffset: value } ) }
											min={ 50 }
											max={ 1500 }
											step={ 50 }
											help={ __( 'Quantidade de pixels que o visitante precisa rolar a página para que o botão surja suavemente.', 'periodic-scroll-top' ) }
										/>

										<TextControl
											label={ __( 'Texto Acessível (aria-label)', 'periodic-scroll-top' ) }
											value={ ariaLabel }
											onChange={ ( value ) => setAttributes( { ariaLabel: value } ) }
											help={ __( 'Descrição lida por leitores de tela para usuários com deficiência visual.', 'periodic-scroll-top' ) }
										/>

										<ToggleControl
											label={ __( 'Exibir Preview Flutuante no Editor', 'periodic-scroll-top' ) }
											checked={ forceFloatingPreview }
											onChange={ ( checked ) => setForceFloatingPreview( checked ) }
											help={ __( 'Simula a posição exata e aparência que o visitante terá no site.', 'periodic-scroll-top' ) }
										/>
									</PanelBody>
								);
							}

							return null;
						} }
					</TabPanel>
				</div>
			</InspectorControls>

			{ /* Painel Informativo / Card WYSIWYG dentro do canvas do Gutenberg */ }
			<Card className="periodic-editor-card shadow-sm border">
				<CardHeader className="bg-light py-3 px-4 d-flex align-items-center justify-content-between">
					<Flex align="center" gap={ 3 }>
						<FlexItem>
							<div
								className="periodic-mini-icon-badge d-flex align-items-center justify-content-center"
								style={ {
									backgroundColor: bgColor,
									color: iconColor,
									width: '36px',
									height: '36px',
									borderRadius: getBorderRadius(),
								} }
							>
								<i className={ iconClass } aria-hidden="true"></i>
							</div>
						</FlexItem>
						<FlexItem>
							<h4 className="m-0 fw-bold fs-6">
								{ __( 'Bloco: Voltar ao Topo (Scroll Top)', 'periodic-scroll-top' ) }
							</h4>
							<small className="text-muted">
								{ __( 'Configurado com animação suave e Bootstrap 5', 'periodic-scroll-top' ) }
							</small>
						</FlexItem>
					</Flex>
					<span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 rounded">
						{ position === 'bottom-right'
							? __( 'Inferior Direito', 'periodic-scroll-top' )
							: __( 'Inferior Esquerdo', 'periodic-scroll-top' ) }
					</span>
				</CardHeader>
				<CardBody className="p-4">
					<Notice status="info" isDismissible={ false } className="mb-3">
						<p className="m-0">
							<strong>{ __( 'Nota do Desenvolvedor:', 'periodic-scroll-top' ) }</strong>{ ' ' }
							{ __(
								'Este bloco funciona de maneira flutuante e assíncrona. No frontend do site, o botão permanecerá oculto até que o visitante role a página além de',
								'periodic-scroll-top'
							) }{ ' ' }
							<strong>{ scrollOffset }px</strong>.
						</p>
					</Notice>

					<div className="row g-3 align-items-center mt-1">
						<div className="col-12 col-md-5 text-center p-3 border rounded bg-light">
							<span className="text-muted small d-block mb-2">
								{ __( 'Pré-visualização do Botão:', 'periodic-scroll-top' ) }
							</span>
							<div className="d-inline-flex justify-content-center align-items-center p-3">
								<button
									type="button"
									className="btn periodic-preview-interactive-btn d-inline-flex align-items-center justify-content-center shadow"
									style={ previewButtonStyle }
									title={ ariaLabel }
								>
									<i className={ iconClass } aria-hidden="true"></i>
								</button>
							</div>
							<div className="small text-muted mt-2">
								<span>{ buttonSize }x{ buttonSize }px &bull; { buttonShape }</span>
							</div>
						</div>

						<div className="col-12 col-md-7 ps-md-4">
							<h5 className="fs-6 fw-bold mb-3">{ __( 'Resumo das Configurações:', 'periodic-scroll-top' ) }</h5>
							<ul className="list-unstyled small mb-0">
								<li className="mb-2">
									<i className="fas fa-location-dot text-primary me-2 fa-fw"></i>
									<strong>{ __( 'Posicionamento:', 'periodic-scroll-top' ) }</strong>{ ' ' }
									{ position === 'bottom-right'
										? __( 'Canto inferior direito', 'periodic-scroll-top' )
										: __( 'Canto inferior esquerdo', 'periodic-scroll-top' ) }{ ' ' }
									({ offsetX }px x { offsetY }px)
								</li>
								<li className="mb-2">
									<i className="fas fa-arrows-up-down text-success me-2 fa-fw"></i>
									<strong>{ __( 'Gatilho de Ativação:', 'periodic-scroll-top' ) }</strong>{ ' ' }
									{ scrollOffset }px { __( 'de rolagem', 'periodic-scroll-top' ) }
								</li>
								<li className="mb-2">
									<i className="fas fa-palette text-info me-2 fa-fw"></i>
									<strong>{ __( 'Cores:', 'periodic-scroll-top' ) }</strong>{ ' ' }
									<span className="d-inline-block border rounded-circle me-1" style={ { width: '12px', height: '12px', backgroundColor: bgColor, verticalAlign: 'middle' } }></span>
									{ bgColor } / { iconColor }
								</li>
								<li className="mb-0">
									<i className="fas fa-universal-access text-warning me-2 fa-fw"></i>
									<strong>{ __( 'Acessibilidade:', 'periodic-scroll-top' ) }</strong> { ariaLabel }
								</li>
							</ul>
						</div>
					</div>
				</CardBody>
			</Card>

			{ /* Preview Flutuante ao Vivo no Canto da Janela do Editor */ }
			{ forceFloatingPreview && (
				<div
					className={ `periodic-floating-editor-preview periodic-pos-${ position }` }
					style={ floatingStyle }
					title={ __( 'Preview flutuante no editor (simulação ao vivo)', 'periodic-scroll-top' ) }
				>
					<i className={ iconClass } aria-hidden="true"></i>
				</div>
			) }
		</div>
	);
}
