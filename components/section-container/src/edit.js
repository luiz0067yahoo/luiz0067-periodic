/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	SelectControl,
	RangeControl,
	Button,
	TextControl,
	ColorPalette,
	GradientPicker,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getI18nString } from './i18n';

/**
 * Palette colors for quick selection
 */
const THEME_COLORS = [
	{ name: 'Branco / White', color: '#ffffff' },
	{ name: 'Escuro / Dark (#212529)', color: '#212529' },
	{ name: 'Cinza Claro / Light (#f8f9fa)', color: '#f8f9fa' },
	{ name: 'Cinza Secundário / Gray (#6c757d)', color: '#6c757d' },
	{ name: 'Azul Bootstrap / Primary (#0d6efd)', color: '#0d6efd' },
	{ name: 'Verde / Success (#198754)', color: '#198754' },
	{ name: 'Vermelho / Danger (#dc3545)', color: '#dc3545' },
	{ name: 'Amarelo / Warning (#ffc107)', color: '#ffc107' },
	{ name: 'Ciano / Info (#0dcaf0)', color: '#0dcaf0' },
	{ name: 'Preto Puro / Pure Black (#000000)', color: '#000000' },
];

/**
 * Edit Component
 */
export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		containerType,
		htmlTag,
		backgroundColor,
		bgGradient,
		bgImageUrl,
		bgImageId,
		bgOverlayColor,
		bgOverlayOpacity,
		paddingTop,
		paddingBottom,
		marginTop,
		marginBottom,
		textColor,
		minHeight,
	} = attributes;

	// Tag Semântica
	const Tag = htmlTag || 'section';

	// Montagem das classes CSS do Bootstrap
	const sectionClasses = [
		'wp-block-periodic-section-container',
		'is-editor-canvas',
		containerType === 'full-width-no-gutters' ? 'is-full-width-no-gutters' : '',
		paddingTop || '',
		paddingBottom || '',
		marginTop || '',
		marginBottom || '',
	]
		.filter( Boolean )
		.join( ' ' );

	// Estilos dinâmicos do wrapper
	const sectionStyles = {
		backgroundColor: backgroundColor || undefined,
		backgroundImage:
			bgGradient && bgImageUrl
				? `${ bgGradient }, url("${ bgImageUrl }")`
				: bgGradient || ( bgImageUrl ? `url("${ bgImageUrl }")` : undefined ),
		color: textColor || undefined,
		minHeight: minHeight || undefined,
	};

	// Container interno Bootstrap 5
	let innerContainerClass = 'periodic-section-content';
	if ( containerType === 'container' ) {
		innerContainerClass += ' container';
	} else if ( containerType === 'container-fluid' ) {
		innerContainerClass += ' container-fluid';
	} else if ( containerType === 'full-width-no-gutters' ) {
		innerContainerClass += ' container-fluid p-0';
	}

	const blockProps = useBlockProps( {
		className: sectionClasses,
		style: sectionStyles,
	} );

	// Opções de espaçamento Bootstrap
	const spacingOptionsPadding = [
		{ label: getI18nString( 'spacing_none', '0 - Nenhum (0rem)' ), value: '' },
		{ label: 'pt-0 (0rem)', value: 'pt-0' },
		{ label: 'pt-1 (0.25rem)', value: 'pt-1' },
		{ label: 'pt-2 (0.5rem)', value: 'pt-2' },
		{ label: 'pt-3 (1rem)', value: 'pt-3' },
		{ label: 'pt-4 (1.5rem)', value: 'pt-4' },
		{ label: 'pt-5 (3rem)', value: 'pt-5' },
		{ label: 'py-1 (0.25rem vertical)', value: 'py-1' },
		{ label: 'py-2 (0.5rem vertical)', value: 'py-2' },
		{ label: 'py-3 (1rem vertical)', value: 'py-3' },
		{ label: 'py-4 (1.5rem vertical)', value: 'py-4' },
		{ label: 'py-5 (3rem vertical)', value: 'py-5' },
	];

	const spacingOptionsPaddingBottom = [
		{ label: getI18nString( 'spacing_none', '0 - Nenhum (0rem)' ), value: '' },
		{ label: 'pb-0 (0rem)', value: 'pb-0' },
		{ label: 'pb-1 (0.25rem)', value: 'pb-1' },
		{ label: 'pb-2 (0.5rem)', value: 'pb-2' },
		{ label: 'pb-3 (1rem)', value: 'pb-3' },
		{ label: 'pb-4 (1.5rem)', value: 'pb-4' },
		{ label: 'pb-5 (3rem)', value: 'pb-5' },
	];

	const spacingOptionsMargin = [
		{ label: getI18nString( 'spacing_none', '0 - Nenhum (0rem)' ), value: '' },
		{ label: 'mt-0 (0rem)', value: 'mt-0' },
		{ label: 'mt-1 (0.25rem)', value: 'mt-1' },
		{ label: 'mt-2 (0.5rem)', value: 'mt-2' },
		{ label: 'mt-3 (1rem)', value: 'mt-3' },
		{ label: 'mt-4 (1.5rem)', value: 'mt-4' },
		{ label: 'mt-5 (3rem)', value: 'mt-5' },
		{ label: 'my-0 (0rem vertical)', value: 'my-0' },
		{ label: 'my-1 (0.25rem vertical)', value: 'my-1' },
		{ label: 'my-2 (0.5rem vertical)', value: 'my-2' },
		{ label: 'my-3 (1rem vertical)', value: 'my-3' },
		{ label: 'my-4 (1.5rem vertical)', value: 'my-4' },
		{ label: 'my-5 (3rem vertical)', value: 'my-5' },
	];

	const spacingOptionsMarginBottom = [
		{ label: getI18nString( 'spacing_none', '0 - Nenhum (0rem)' ), value: '' },
		{ label: 'mb-0 (0rem)', value: 'mb-0' },
		{ label: 'mb-1 (0.25rem)', value: 'mb-1' },
		{ label: 'mb-2 (0.5rem)', value: 'mb-2' },
		{ label: 'mb-3 (1rem)', value: 'mb-3' },
		{ label: 'mb-4 (1.5rem)', value: 'mb-4' },
		{ label: 'mb-5 (3rem)', value: 'mb-5' },
	];

	return (
		<>
			<InspectorControls>
				<div className="periodic-inspector-panel">
					<TabPanel
						className="periodic-inspector-tabs"
						activeClass="is-active"
						tabs={ [
							{
								name: 'layout',
								title: getI18nString( 'tab_layout', 'Layout' ),
								className: 'tab-layout',
							},
							{
								name: 'background',
								title: getI18nString( 'tab_background', 'Fundo' ),
								className: 'tab-background',
							},
							{
								name: 'spacing',
								title: getI18nString( 'tab_spacing', 'Espaçamento' ),
								className: 'tab-spacing',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name === 'layout' ) {
								return (
									<PanelBody title={ getI18nString( 'tab_layout', 'Layout' ) } initialOpen={ true }>
										<SelectControl
											label={ getI18nString(
												'inspector_container_type_label',
												'Tipo de Container'
											) }
											help={ getI18nString(
												'inspector_container_type_help',
												'Define a largura e comportamento responsivo do container interno.'
											) }
											value={ containerType }
											options={ [
												{
													label: getI18nString(
														'container_type_boxed',
														'Container Padrão (.container - centralizado)'
													),
													value: 'container',
												},
												{
													label: getI18nString(
														'container_type_fluid',
														'Container Fluido (.container-fluid - largura total com calhas)'
													),
													value: 'container-fluid',
												},
												{
													label: getI18nString(
														'container_type_full_no_gutters',
														'Largura Total sem Calhas (.container-fluid p-0)'
													),
													value: 'full-width-no-gutters',
												},
											] }
											onChange={ ( val ) => setAttributes( { containerType: val } ) }
										/>

										<SelectControl
											label={ getI18nString( 'inspector_html_tag_label', 'Tag Semântica HTML' ) }
											help={ getI18nString(
												'inspector_html_tag_help',
												'Escolha a tag semântica ideal para acessibilidade e SEO.'
											) }
											value={ htmlTag }
											options={ [
												{ label: '<section> (Seção genérica de conteúdo)', value: 'section' },
												{ label: '<div> (Divisão estilística semântica neutra)', value: 'div' },
												{ label: '<article> (Artigo ou conteúdo independente)', value: 'article' },
												{ label: '<aside> (Conteúdo lateral ou complementar)', value: 'aside' },
												{ label: '<header> (Cabeçalho de página ou seção)', value: 'header' },
												{ label: '<footer> (Rodapé de página ou seção)', value: 'footer' },
											] }
											onChange={ ( val ) => setAttributes( { htmlTag: val } ) }
										/>

										<TextControl
											label={ getI18nString(
												'inspector_min_height_label',
												'Altura Mínima CSS (ex: 450px, 70vh)'
											) }
											value={ minHeight || '' }
											placeholder="ex: 400px ou 60vh"
											onChange={ ( val ) => setAttributes( { minHeight: val } ) }
										/>

										<hr style={ { margin: '15px 0', borderColor: '#eee' } } />

										<SelectControl
											label={ getI18nString(
												'inspector_margin_top_label',
												'Margem Superior (mt / my)'
											) }
											value={ marginTop }
											options={ spacingOptionsMargin }
											onChange={ ( val ) => setAttributes( { marginTop: val } ) }
										/>

										<SelectControl
											label={ getI18nString(
												'inspector_margin_bottom_label',
												'Margem Inferior (mb)'
											) }
											value={ marginBottom }
											options={ spacingOptionsMarginBottom }
											onChange={ ( val ) => setAttributes( { marginBottom: val } ) }
										/>
									</PanelBody>
								);
							}

							if ( tab.name === 'background' ) {
								return (
									<PanelBody title={ getI18nString( 'tab_background', 'Fundo' ) } initialOpen={ true }>
										<span className="periodic-control-label">
											{ getI18nString( 'inspector_bg_solid_label', 'Cor de Fundo Sólida' ) }
										</span>
										<ColorPalette
											colors={ THEME_COLORS }
											value={ backgroundColor }
											onChange={ ( val ) => setAttributes( { backgroundColor: val || '' } ) }
										/>

										<hr style={ { margin: '20px 0', borderColor: '#eee' } } />

										<span className="periodic-control-label">
											{ getI18nString( 'inspector_bg_gradient_label', 'Gradiente de Fundo' ) }
										</span>
										<GradientPicker
											value={ bgGradient }
											onChange={ ( val ) => setAttributes( { bgGradient: val || '' } ) }
										/>

										<hr style={ { margin: '20px 0', borderColor: '#eee' } } />

										<span className="periodic-control-label">
											{ getI18nString( 'inspector_bg_image_label', 'Imagem de Fundo' ) }
										</span>

										{ bgImageUrl && (
											<div className="periodic-media-preview-box">
												<img src={ bgImageUrl } alt="Preview da imagem de fundo" />
											</div>
										) }

										<div className="periodic-media-buttons">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( media ) =>
														setAttributes( {
															bgImageUrl: media.url,
															bgImageId: media.id,
														} )
													}
													allowedTypes={ [ 'image' ] }
													value={ bgImageId }
													render={ ( { open } ) => (
														<Button
															variant={ bgImageUrl ? 'secondary' : 'primary' }
															onClick={ open }
														>
															{ bgImageUrl
																? getI18nString( 'inspector_replace_image', 'Substituir Imagem' )
																: getI18nString(
																		'inspector_select_image',
																		'Selecionar Imagem de Fundo'
																  ) }
														</Button>
													) }
												/>
											</MediaUploadCheck>

											{ bgImageUrl && (
												<Button
													isDestructive
													variant="link"
													onClick={ () =>
														setAttributes( { bgImageUrl: '', bgImageId: 0 } )
													}
												>
													{ getI18nString( 'inspector_remove_image', 'Remover Imagem' ) }
												</Button>
											) }
										</div>

										<hr style={ { margin: '20px 0', borderColor: '#eee' } } />

										<span className="periodic-control-label">
											{ getI18nString(
												'inspector_overlay_settings',
												'Sobreposição (Overlay)'
											) }
										</span>
										<ColorPalette
											colors={ THEME_COLORS }
											value={ bgOverlayColor }
											onChange={ ( val ) =>
												setAttributes( { bgOverlayColor: val || '' } )
											}
										/>

										<RangeControl
											label={ getI18nString(
												'inspector_overlay_opacity_label',
												'Opacidade da Sobreposição (%)'
											) }
											value={ bgOverlayOpacity }
											onChange={ ( val ) =>
												setAttributes( { bgOverlayOpacity: val } )
											}
											min={ 0 }
											max={ 100 }
											step={ 5 }
										/>

										<hr style={ { margin: '20px 0', borderColor: '#eee' } } />

										<span className="periodic-control-label">
											{ getI18nString( 'inspector_text_color_label', 'Cor Geral do Texto' ) }
										</span>
										<ColorPalette
											colors={ THEME_COLORS }
											value={ textColor }
											onChange={ ( val ) => setAttributes( { textColor: val || '' } ) }
										/>
									</PanelBody>
								);
							}

							if ( tab.name === 'spacing' ) {
								return (
									<PanelBody
										title={ getI18nString( 'tab_spacing', 'Espaçamento' ) }
										initialOpen={ true }
									>
										<SelectControl
											label={ getI18nString(
												'inspector_padding_top_label',
												'Padding Superior (pt / py)'
											) }
											value={ paddingTop }
											options={ spacingOptionsPadding }
											onChange={ ( val ) => setAttributes( { paddingTop: val } ) }
										/>

										<SelectControl
											label={ getI18nString(
												'inspector_padding_bottom_label',
												'Padding Inferior (pb)'
											) }
											value={ paddingBottom }
											options={ spacingOptionsPaddingBottom }
											onChange={ ( val ) => setAttributes( { paddingBottom: val } ) }
										/>

										<div
											style={ {
												marginTop: '20px',
												padding: '12px',
												background: '#f8f9fa',
												borderRadius: '6px',
												fontSize: '12px',
												border: '1px solid #e9ecef',
												lineHeight: '1.5',
											} }
										>
											<strong>Referência Bootstrap 5:</strong>
											<ul style={ { margin: '8px 0 0 16px', padding: 0 } } role="list">
												<li><code>0</code>: 0rem (0px)</li>
												<li><code>1</code>: 0.25rem (4px)</li>
												<li><code>2</code>: 0.5rem (8px)</li>
												<li><code>3</code>: 1rem (16px)</li>
												<li><code>4</code>: 1.5rem (24px)</li>
												<li><code>5</code>: 3rem (48px)</li>
											</ul>
										</div>
									</PanelBody>
								);
							}

							return null;
						} }
					</TabPanel>
				</div>
			</InspectorControls>

			<Tag { ...blockProps }>
				{ isSelected && (
					<div className="periodic-section-editor-badge">
						<span className="dashicons dashicons-layout" style={ { fontSize: '13px', width: '13px', height: '13px' } }></span>
						{ getI18nString( 'section_badge', 'Seção Bootstrap 5' ) } &bull; { containerType }
					</div>
				) }

				{ ( bgImageUrl || bgOverlayColor ) && bgOverlayOpacity > 0 && (
					<div
						className="periodic-section-overlay"
						style={ {
							backgroundColor: bgOverlayColor || 'rgba(0,0,0,0.4)',
							opacity: bgOverlayOpacity / 100,
						} }
					/>
				) }

				<div className={ innerContainerClass }>
					<InnerBlocks
						renderAppender={ InnerBlocks.ButtonBlockAppender }
						placeholder={ getI18nString(
							'innerblocks_placeholder',
							'Arraste blocos ou clique em "+" para inserir conteúdo nesta seção...'
						) }
					/>
				</div>
			</Tag>
		</>
	);
}
