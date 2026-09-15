import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPalette,
	ButtonGroup,
	Button,
	TabPanel,
	BaseControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		heightDesktop,
		heightTablet,
		heightMobile,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		dividerStyle,
		dividerColor,
		dividerThickness,
		dividerWidth,
		dividerAlign,
		dividerIcon,
	} = attributes;

	const [ previewDevice, setPreviewDevice ] = useState( 'desktop' );

	const currentHeight =
		previewDevice === 'mobile'
			? heightMobile
			: previewDevice === 'tablet'
			? heightTablet
			: heightDesktop;

	// Gerar classes de visibilidade Bootstrap 5
	const visibilityClasses = [
		hideOnDesktop ? 'd-lg-none' : '',
		hideOnTablet ? 'd-md-none-tablet' : '',
		hideOnMobile ? 'd-none d-sm-block' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps( {
		className: `periodic-advanced-spacer-block ${ visibilityClasses } is-preview-${ previewDevice }`,
		style: {
			'--periodic-spacer-desktop': `${ heightDesktop }px`,
			'--periodic-spacer-tablet': `${ heightTablet }px`,
			'--periodic-spacer-mobile': `${ heightMobile }px`,
			'--periodic-spacer-current': `${ currentHeight }px`,
			'--periodic-divider-color': dividerColor,
			'--periodic-divider-thickness': `${ dividerThickness }px`,
			'--periodic-divider-width': `${ dividerWidth }%`,
		},
	} );

	const alignClass =
		dividerAlign === 'start'
			? 'justify-content-start'
			: dividerAlign === 'end'
			? 'justify-content-end'
			: 'justify-content-center';

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="periodic-tab-panel"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'heights',
							title: __( 'Alturas', 'periodic-advanced-spacer' ),
							className: 'tab-heights',
						},
						{
							name: 'visibility',
							title: __( 'Visibilidade', 'periodic-advanced-spacer' ),
							className: 'tab-visibility',
						},
						{
							name: 'divider',
							title: __( 'Linha Divisória', 'periodic-advanced-spacer' ),
							className: 'tab-divider',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'heights' ) {
							return (
								<PanelBody
									title={ __( 'Alturas por Dispositivo', 'periodic-advanced-spacer' ) }
									initialOpen={ true }
								>
									<BaseControl label={ __( 'Simulação Visual no Editor', 'periodic-advanced-spacer' ) }>
										<ButtonGroup className="w-100 d-flex mb-3">
											<Button
												isPrimary={ previewDevice === 'desktop' }
												isSecondary={ previewDevice !== 'desktop' }
												className="flex-fill"
												onClick={ () => setPreviewDevice( 'desktop' ) }
											>
												Desktop
											</Button>
											<Button
												isPrimary={ previewDevice === 'tablet' }
												isSecondary={ previewDevice !== 'tablet' }
												className="flex-fill"
												onClick={ () => setPreviewDevice( 'tablet' ) }
											>
												Tablet
											</Button>
											<Button
												isPrimary={ previewDevice === 'mobile' }
												isSecondary={ previewDevice !== 'mobile' }
												className="flex-fill"
												onClick={ () => setPreviewDevice( 'mobile' ) }
											>
												Mobile
											</Button>
										</ButtonGroup>
									</BaseControl>

									<RangeControl
										label={ __( 'Altura no Desktop (≥ 992px)', 'periodic-advanced-spacer' ) }
										value={ heightDesktop }
										onChange={ ( val ) => setAttributes( { heightDesktop: val } ) }
										min={ 0 }
										max={ 300 }
										step={ 5 }
									/>
									<RangeControl
										label={ __( 'Altura no Tablet (768px a 991px)', 'periodic-advanced-spacer' ) }
										value={ heightTablet }
										onChange={ ( val ) => setAttributes( { heightTablet: val } ) }
										min={ 0 }
										max={ 200 }
										step={ 5 }
									/>
									<RangeControl
										label={ __( 'Altura no Mobile (< 768px)', 'periodic-advanced-spacer' ) }
										value={ heightMobile }
										onChange={ ( val ) => setAttributes( { heightMobile: val } ) }
										min={ 0 }
										max={ 150 }
										step={ 5 }
									/>
								</PanelBody>
							);
						}

						if ( tab.name === 'visibility' ) {
							return (
								<PanelBody
									title={ __( 'Regras de Visibilidade (Bootstrap 5)', 'periodic-advanced-spacer' ) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Ocultar no Desktop (d-lg-none)', 'periodic-advanced-spacer' ) }
										checked={ hideOnDesktop }
										onChange={ ( val ) => setAttributes( { hideOnDesktop: val } ) }
									/>
									<ToggleControl
										label={ __( 'Ocultar no Tablet', 'periodic-advanced-spacer' ) }
										checked={ hideOnTablet }
										onChange={ ( val ) => setAttributes( { hideOnTablet: val } ) }
									/>
									<ToggleControl
										label={ __( 'Ocultar no Mobile (d-none d-sm-block)', 'periodic-advanced-spacer' ) }
										checked={ hideOnMobile }
										onChange={ ( val ) => setAttributes( { hideOnMobile: val } ) }
									/>
								</PanelBody>
							);
						}

						if ( tab.name === 'divider' ) {
							return (
								<PanelBody
									title={ __( 'Estilização da Linha Divisória', 'periodic-advanced-spacer' ) }
									initialOpen={ true }
								>
									<SelectControl
										label={ __( 'Estilo da Linha', 'periodic-advanced-spacer' ) }
										value={ dividerStyle }
										options={ [
											{ label: __( 'Nenhuma (Apenas Espaço)', 'periodic-advanced-spacer' ), value: 'none' },
											{ label: __( 'Linha Sólida', 'periodic-advanced-spacer' ), value: 'solid' },
											{ label: __( 'Linha Tracejada (Dashed)', 'periodic-advanced-spacer' ), value: 'dashed' },
											{ label: __( 'Linha Pontilhada (Dotted)', 'periodic-advanced-spacer' ), value: 'dotted' },
											{ label: __( 'Gradiente de Luxo', 'periodic-advanced-spacer' ), value: 'gradient' },
										] }
										onChange={ ( val ) => setAttributes( { dividerStyle: val } ) }
									/>

									{ dividerStyle !== 'none' && (
										<>
											<BaseControl label={ __( 'Cor da Linha', 'periodic-advanced-spacer' ) }>
												<ColorPalette
													value={ dividerColor }
													onChange={ ( val ) => setAttributes( { dividerColor: val || '#cbd5e1' } ) }
												/>
											</BaseControl>
											<RangeControl
												label={ __( 'Espessura da Linha (px)', 'periodic-advanced-spacer' ) }
												value={ dividerThickness }
												onChange={ ( val ) => setAttributes( { dividerThickness: val } ) }
												min={ 1 }
												max={ 10 }
											/>
											<RangeControl
												label={ __( 'Largura da Linha (%)', 'periodic-advanced-spacer' ) }
												value={ dividerWidth }
												onChange={ ( val ) => setAttributes( { dividerWidth: val } ) }
												min={ 10 }
												max={ 100 }
												step={ 5 }
											/>
											<SelectControl
												label={ __( 'Alinhamento da Linha', 'periodic-advanced-spacer' ) }
												value={ dividerAlign }
												options={ [
													{ label: __( 'Esquerda', 'periodic-advanced-spacer' ), value: 'start' },
													{ label: __( 'Centralizado', 'periodic-advanced-spacer' ), value: 'center' },
													{ label: __( 'Direita', 'periodic-advanced-spacer' ), value: 'end' },
												] }
												onChange={ ( val ) => setAttributes( { dividerAlign: val } ) }
											/>
											<SelectControl
												label={ __( 'Ícone Decorativo Central', 'periodic-advanced-spacer' ) }
												value={ dividerIcon }
												options={ [
													{ label: __( 'Nenhum', 'periodic-advanced-spacer' ), value: 'none' },
													{ label: __( 'Estrela (★)', 'periodic-advanced-spacer' ), value: 'star' },
													{ label: __( 'Diamante (◆)', 'periodic-advanced-spacer' ), value: 'diamond' },
													{ label: __( 'Círculo (●)', 'periodic-advanced-spacer' ), value: 'circle' },
												] }
												onChange={ ( val ) => setAttributes( { dividerIcon: val } ) }
											/>
										</>
									) }
								</PanelBody>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `periodic-spacer-inner d-flex align-items-center ${ alignClass }` }>
					{ dividerStyle !== 'none' && (
						<div className={ `periodic-spacer-divider style-${ dividerStyle } has-icon-${ dividerIcon }` }>
							<span className="periodic-divider-line line-left" />
							{ dividerIcon !== 'none' && (
								<span className="periodic-divider-icon">
									{ dividerIcon === 'star' && '★' }
									{ dividerIcon === 'diamond' && '◆' }
									{ dividerIcon === 'circle' && '●' }
								</span>
							) }
							{ dividerIcon !== 'none' && <span className="periodic-divider-line line-right" /> }
						</div>
					) }
				</div>

				<div className="periodic-spacer-editor-overlay">
					<span className="badge bg-dark bg-opacity-75 text-white-50">
						{ `🖥️ ${ heightDesktop }px | 📱 ${ heightMobile }px` }
						{ ( hideOnDesktop || hideOnTablet || hideOnMobile ) && ' | 👁️ Filtros Ativos' }
					</span>
				</div>
			</div>
		</>
	);
}
