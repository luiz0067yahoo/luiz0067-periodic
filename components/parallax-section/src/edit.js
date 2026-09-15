import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ColorPalette,
	Button,
	FocalPointPicker,
	TabPanel,
	BaseControl,
} from '@wordpress/components';

const TEMPLATE = [
	[
		'core/heading',
		{
			textAlign: 'center',
			content: __( 'Título Impressionante em Paralaxe', 'periodic-parallax-section' ),
			level: 2,
			textColor: 'white',
		},
	],
	[
		'core/paragraph',
		{
			align: 'center',
			content: __(
				'Adicione conteúdo interativo, botões ou outros blocos do ecossistema periodic dentro desta seção modular.',
				'periodic-parallax-section'
			),
			textColor: 'white',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		bgImageUrl,
		bgImageId,
		focalPoint,
		parallaxSpeed,
		parallaxDirection,
		minHeight,
		minHeightMobile,
		containerType,
		contentVerticalAlign,
		contentHorizontalAlign,
		overlayColor,
		overlayOpacity,
		overlayBlendMode,
		paddingTop,
		paddingBottom,
	} = attributes;

	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			return;
		}
		setAttributes( {
			bgImageUrl: media.url,
			bgImageId: media.id,
			bgImageAlt: media.alt || '',
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			bgImageUrl: '',
			bgImageId: undefined,
			bgImageAlt: '',
		} );
	};

	const blockProps = useBlockProps( {
		className: `periodic-parallax-section-block ${
			bgImageUrl ? 'has-bg-image' : 'no-bg-image'
		}`,
		style: {
			'--periodic-parallax-min-height': minHeight,
			'--periodic-parallax-min-height-mobile': minHeightMobile,
			'--periodic-parallax-padding-top': `${ paddingTop }px`,
			'--periodic-parallax-padding-bottom': `${ paddingBottom }px`,
			'--periodic-parallax-overlay-color': overlayColor,
			'--periodic-parallax-overlay-opacity': overlayOpacity,
			'--periodic-parallax-blend-mode': overlayBlendMode,
			'--periodic-parallax-focal-x': `${ focalPoint.x * 100 }%`,
			'--periodic-parallax-focal-y': `${ focalPoint.y * 100 }%`,
		},
	} );

	const justifyClass =
		contentHorizontalAlign === 'start'
			? 'justify-content-start text-start'
			: contentHorizontalAlign === 'end'
			? 'justify-content-end text-end'
			: 'justify-content-center text-center';

	const alignItemClass =
		contentVerticalAlign === 'top'
			? 'align-items-start'
			: contentVerticalAlign === 'bottom'
			? 'align-items-end'
			: 'align-items-center';

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="periodic-tab-panel"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'layout',
							title: __( 'Layout', 'periodic-parallax-section' ),
							className: 'tab-layout',
						},
						{
							name: 'background',
							title: __( 'Fundo', 'periodic-parallax-section' ),
							className: 'tab-background',
						},
						{
							name: 'overlay',
							title: __( 'Sobreposição', 'periodic-parallax-section' ),
							className: 'tab-overlay',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'layout' ) {
							return (
								<PanelBody
									title={ __( 'Configurações de Layout & Espaçamento', 'periodic-parallax-section' ) }
									initialOpen={ true }
								>
									<SelectControl
										label={ __( 'Tipo de Container (Bootstrap 5)', 'periodic-parallax-section' ) }
										value={ containerType }
										options={ [
											{ label: __( 'Container Padrão (container)', 'periodic-parallax-section' ), value: 'container' },
											{ label: __( 'Container Fluido (container-fluid)', 'periodic-parallax-section' ), value: 'container-fluid' },
											{ label: __( 'Sem Container (100% largura)', 'periodic-parallax-section' ), value: 'none' },
										] }
										onChange={ ( val ) => setAttributes( { containerType: val } ) }
									/>
									<SelectControl
										label={ __( 'Alinhamento Vertical do Conteúdo', 'periodic-parallax-section' ) }
										value={ contentVerticalAlign }
										options={ [
											{ label: __( 'Superior', 'periodic-parallax-section' ), value: 'top' },
											{ label: __( 'Centralizado', 'periodic-parallax-section' ), value: 'center' },
											{ label: __( 'Inferior', 'periodic-parallax-section' ), value: 'bottom' },
										] }
										onChange={ ( val ) => setAttributes( { contentVerticalAlign: val } ) }
									/>
									<SelectControl
										label={ __( 'Alinhamento Horizontal do Conteúdo', 'periodic-parallax-section' ) }
										value={ contentHorizontalAlign }
										options={ [
											{ label: __( 'Esquerda', 'periodic-parallax-section' ), value: 'start' },
											{ label: __( 'Centralizado', 'periodic-parallax-section' ), value: 'center' },
											{ label: __( 'Direita', 'periodic-parallax-section' ), value: 'end' },
										] }
										onChange={ ( val ) => setAttributes( { contentHorizontalAlign: val } ) }
									/>
									<SelectControl
										label={ __( 'Altura Mínima (Desktop)', 'periodic-parallax-section' ) }
										value={ minHeight }
										options={ [
											{ label: '350px', value: '350px' },
											{ label: '450px', value: '450px' },
											{ label: '500px (Padrão)', value: '500px' },
											{ label: '600px', value: '600px' },
											{ label: '700px', value: '700px' },
											{ label: '80vh (Tela Parcial)', value: '80vh' },
											{ label: '100vh (Tela Inteira)', value: '100vh' },
										] }
										onChange={ ( val ) => setAttributes( { minHeight: val } ) }
									/>
									<SelectControl
										label={ __( 'Altura Mínima (Mobile)', 'periodic-parallax-section' ) }
										value={ minHeightMobile }
										options={ [
											{ label: '250px', value: '250px' },
											{ label: '300px', value: '300px' },
											{ label: '350px (Padrão)', value: '350px' },
											{ label: '450px', value: '450px' },
											{ label: '60vh', value: '60vh' },
										] }
										onChange={ ( val ) => setAttributes( { minHeightMobile: val } ) }
									/>
									<RangeControl
										label={ __( 'Espaçamento Superior (Padding Top em px)', 'periodic-parallax-section' ) }
										value={ paddingTop }
										onChange={ ( val ) => setAttributes( { paddingTop: val } ) }
										min={ 0 }
										max={ 250 }
										step={ 5 }
									/>
									<RangeControl
										label={ __( 'Espaçamento Inferior (Padding Bottom em px)', 'periodic-parallax-section' ) }
										value={ paddingBottom }
										onChange={ ( val ) => setAttributes( { paddingBottom: val } ) }
										min={ 0 }
										max={ 250 }
										step={ 5 }
									/>
								</PanelBody>
							);
						}

						if ( tab.name === 'background' ) {
							return (
								<PanelBody
									title={ __( 'Imagem de Fundo e Efeito Paralaxe', 'periodic-parallax-section' ) }
									initialOpen={ true }
								>
									<BaseControl label={ __( 'Imagem de Fundo em Alta Resolução', 'periodic-parallax-section' ) }>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ onSelectImage }
												allowedTypes={ [ 'image' ] }
												value={ bgImageId }
												render={ ( { open } ) => (
													<div className="periodic-media-control">
														{ bgImageUrl ? (
															<div className="periodic-image-preview-wrapper mb-2">
																<img
																	src={ bgImageUrl }
																	alt=""
																	style={ {
																		maxWidth: '100%',
																		height: '140px',
																		objectFit: 'cover',
																		borderRadius: '6px',
																	} }
																/>
																<div className="d-flex gap-2 mt-2">
																	<Button onClick={ open } variant="secondary" isSmall>
																		{ __( 'Substituir Imagem', 'periodic-parallax-section' ) }
																	</Button>
																	<Button onClick={ onRemoveImage } isDestructive isSmall>
																		{ __( 'Remover', 'periodic-parallax-section' ) }
																	</Button>
																</div>
															</div>
														) : (
															<Button onClick={ open } variant="primary" className="w-100 justify-content-center">
																{ __( 'Selecionar Imagem da Biblioteca', 'periodic-parallax-section' ) }
															</Button>
														)}
													</div>
												) }
											/>
										</MediaUploadCheck>
									</BaseControl>

									{ bgImageUrl && (
										<>
											<BaseControl label={ __( 'Ponto Focal da Imagem', 'periodic-parallax-section' ) }>
												<FocalPointPicker
													url={ bgImageUrl }
													value={ focalPoint }
													onChange={ ( val ) => setAttributes( { focalPoint: val } ) }
												/>
											</BaseControl>
											<RangeControl
												label={ __( 'Velocidade do Paralaxe', 'periodic-parallax-section' ) }
												value={ parallaxSpeed }
												onChange={ ( val ) => setAttributes( { parallaxSpeed: val } ) }
												min={ 0.05 }
												max={ 0.8 }
												step={ 0.05 }
												help={ __( '0.3 proporciona rolagem suave e elegante. Valores mais altos intensificam a profundidade visual.', 'periodic-parallax-section' ) }
											/>
											<SelectControl
												label={ __( 'Direção do Efeito', 'periodic-parallax-section' ) }
												value={ parallaxDirection }
												options={ [
													{ label: __( 'Descendente Natural (down)', 'periodic-parallax-section' ), value: 'down' },
													{ label: __( 'Ascendente Inverso (up)', 'periodic-parallax-section' ), value: 'up' },
												] }
												onChange={ ( val ) => setAttributes( { parallaxDirection: val } ) }
											/>
										</>
									) }
								</PanelBody>
							);
						}

						if ( tab.name === 'overlay' ) {
							return (
								<PanelBody
									title={ __( 'Camada de Sobreposição (Overlay)', 'periodic-parallax-section' ) }
									initialOpen={ true }
								>
									<BaseControl label={ __( 'Cor da Sobreposição', 'periodic-parallax-section' ) }>
										<ColorPalette
											value={ overlayColor }
											onChange={ ( val ) => setAttributes( { overlayColor: val || '#000000' } ) }
										/>
									</BaseControl>
									<RangeControl
										label={ __( 'Opacidade da Sobreposição', 'periodic-parallax-section' ) }
										value={ overlayOpacity }
										onChange={ ( val ) => setAttributes( { overlayOpacity: val } ) }
										min={ 0 }
										max={ 0.95 }
										step={ 0.05 }
									/>
									<SelectControl
										label={ __( 'Modo de Mesclagem (Blend Mode)', 'periodic-parallax-section' ) }
										value={ overlayBlendMode }
										options={ [
											{ label: 'Normal', value: 'normal' },
											{ label: 'Multiply (Multiplicar)', value: 'multiply' },
											{ label: 'Overlay (Sobrepor)', value: 'overlay' },
											{ label: 'Darken (Escurecer)', value: 'darken' },
											{ label: 'Lighten (Clarear)', value: 'lighten' },
											{ label: 'Screen (Tela)', value: 'screen' },
										] }
										onChange={ ( val ) => setAttributes( { overlayBlendMode: val } ) }
									/>
								</PanelBody>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="periodic-parallax-bg"
					style={ {
						backgroundImage: bgImageUrl ? `url(${ bgImageUrl })` : 'none',
						backgroundPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`,
					} }
				/>
				<div className="periodic-parallax-overlay" />

				<div
					className={ `periodic-parallax-content-wrapper d-flex flex-column ${ alignItemClass } ${ justifyClass }` }
				>
					{ containerType !== 'none' ? (
						<div className={ containerType }>
							<InnerBlocks template={ TEMPLATE } />
						</div>
					) : (
						<div className="w-100">
							<InnerBlocks template={ TEMPLATE } />
						</div>
					) }
				</div>

				{ ! bgImageUrl && (
					<div className="periodic-parallax-editor-notice">
						<span>
							{ __( 'Defina uma imagem no painel lateral para ativar o efeito paralaxe.', 'periodic-parallax-section' ) }
						</span>
					</div>
				) }
			</div>
		</>
	);
}
