import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	ColorPalette,
	Button,
	FocalPointPicker,
	TabPanel,
	BaseControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		bgImageUrl,
		bgImageId,
		focalPoint,
		badgeText,
		showBadge,
		title,
		titleTag: TitleTag,
		subtitle,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonStyle,
		minHeight,
		minHeightMobile,
		hoverImageEffect,
		hoverTextEffect,
		overlayColor,
		overlayOpacity,
		overlayHoverOpacity,
		contentAlign,
		borderRadius,
	} = attributes;

	const [ isHoverSimulated, setIsHoverSimulated ] = useState( false );

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
		className: `periodic-advanced-banner-block hover-img-${ hoverImageEffect } hover-text-${ hoverTextEffect } ${
			isHoverSimulated ? 'is-simulated-hover' : ''
		}`,
		style: {
			'--periodic-banner-min-height': minHeight,
			'--periodic-banner-min-height-mobile': minHeightMobile,
			'--periodic-banner-radius': `${ borderRadius }px`,
			'--periodic-banner-overlay-color': overlayColor,
			'--periodic-banner-overlay-opacity': overlayOpacity,
			'--periodic-banner-overlay-hover-opacity': overlayHoverOpacity,
			'--periodic-banner-focal-x': `${ focalPoint.x * 100 }%`,
			'--periodic-banner-focal-y': `${ focalPoint.y * 100 }%`,
		},
	} );

	const alignClass =
		contentAlign === 'start'
			? 'text-start align-items-start'
			: contentAlign === 'end'
			? 'text-end align-items-end'
			: 'text-center align-items-center';

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="periodic-tab-panel"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'content',
							title: __( 'Conteúdo', 'periodic-advanced-banner' ),
							className: 'tab-content',
						},
						{
							name: 'background',
							title: __( 'Fundo', 'periodic-advanced-banner' ),
							className: 'tab-background',
						},
						{
							name: 'hover',
							title: __( 'Efeitos Hover', 'periodic-advanced-banner' ),
							className: 'tab-hover',
						},
						{
							name: 'layout',
							title: __( 'Layout', 'periodic-advanced-banner' ),
							className: 'tab-layout',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'content' ) {
							return (
								<PanelBody
									title={ __( 'Textos & Chamada para Ação (CTA)', 'periodic-advanced-banner' ) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Exibir Selo / Badge', 'periodic-advanced-banner' ) }
										checked={ showBadge }
										onChange={ ( val ) => setAttributes( { showBadge: val } ) }
									/>
									{ showBadge && (
										<TextControl
											label={ __( 'Texto do Selo', 'periodic-advanced-banner' ) }
											value={ badgeText }
											onChange={ ( val ) => setAttributes( { badgeText: val } ) }
										/>
									) }

									<SelectControl
										label={ __( 'Tag HTML do Título', 'periodic-advanced-banner' ) }
										value={ TitleTag }
										options={ [
											{ label: 'H2 (Recomendado)', value: 'h2' },
											{ label: 'H3', value: 'h3' },
											{ label: 'H4', value: 'h4' },
										] }
										onChange={ ( val ) => setAttributes( { titleTag: val } ) }
									/>

									<ToggleControl
										label={ __( 'Exibir Botão de Ação', 'periodic-advanced-banner' ) }
										checked={ showButton }
										onChange={ ( val ) => setAttributes( { showButton: val } ) }
									/>
									{ showButton && (
										<>
											<TextControl
												label={ __( 'Texto do Botão', 'periodic-advanced-banner' ) }
												value={ buttonText }
												onChange={ ( val ) => setAttributes( { buttonText: val } ) }
											/>
											<TextControl
												label={ __( 'URL / Link do Botão', 'periodic-advanced-banner' ) }
												value={ buttonUrl }
												onChange={ ( val ) => setAttributes( { buttonUrl: val } ) }
											/>
											<ToggleControl
												label={ __( 'Abrir em Nova Aba', 'periodic-advanced-banner' ) }
												checked={ buttonTarget }
												onChange={ ( val ) => setAttributes( { buttonTarget: val } ) }
											/>
											<SelectControl
												label={ __( 'Estilo do Botão (Bootstrap 5)', 'periodic-advanced-banner' ) }
												value={ buttonStyle }
												options={ [
													{ label: 'Primário (btn-primary)', value: 'btn-primary' },
													{ label: 'Claro (btn-light)', value: 'btn-light' },
													{ label: 'Contorno Claro (btn-outline-light)', value: 'btn-outline-light' },
													{ label: 'Destaque Amarelo (btn-warning)', value: 'btn-warning' },
													{ label: 'Escuro (btn-dark)', value: 'btn-dark' },
												] }
												onChange={ ( val ) => setAttributes( { buttonStyle: val } ) }
											/>
										</>
									) }
								</PanelBody>
							);
						}

						if ( tab.name === 'background' ) {
							return (
								<PanelBody
									title={ __( 'Imagem e Sobreposição', 'periodic-advanced-banner' ) }
									initialOpen={ true }
								>
									<BaseControl label={ __( 'Imagem de Capa (Cover Image)', 'periodic-advanced-banner' ) }>
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
																		height: '130px',
																		objectFit: 'cover',
																		borderRadius: '6px',
																	} }
																/>
																<div className="d-flex gap-2 mt-2">
																	<Button onClick={ open } variant="secondary" isSmall>
																		{ __( 'Substituir', 'periodic-advanced-banner' ) }
																	</Button>
																	<Button onClick={ onRemoveImage } isDestructive isSmall>
																		{ __( 'Remover', 'periodic-advanced-banner' ) }
																	</Button>
																</div>
															</div>
														) : (
															<Button onClick={ open } variant="primary" className="w-100 justify-content-center">
																{ __( 'Selecionar Imagem de Fundo', 'periodic-advanced-banner' ) }
															</Button>
														) }
													</div>
												) }
											/>
										</MediaUploadCheck>
									</BaseControl>

									{ bgImageUrl && (
										<BaseControl label={ __( 'Ponto Focal da Imagem', 'periodic-advanced-banner' ) }>
											<FocalPointPicker
												url={ bgImageUrl }
												value={ focalPoint }
												onChange={ ( val ) => setAttributes( { focalPoint: val } ) }
											/>
										</BaseControl>
									) }

									<BaseControl label={ __( 'Cor da Camada de Sobreposição', 'periodic-advanced-banner' ) }>
										<ColorPalette
											value={ overlayColor }
											onChange={ ( val ) => setAttributes( { overlayColor: val || '#0f172a' } ) }
										/>
									</BaseControl>

									<RangeControl
										label={ __( 'Opacidade Padrão da Sobreposição', 'periodic-advanced-banner' ) }
										value={ overlayOpacity }
										onChange={ ( val ) => setAttributes( { overlayOpacity: val } ) }
										min={ 0 }
										max={ 0.95 }
										step={ 0.05 }
									/>

									<RangeControl
										label={ __( 'Opacidade da Sobreposição no Hover', 'periodic-advanced-banner' ) }
										value={ overlayHoverOpacity }
										onChange={ ( val ) => setAttributes( { overlayHoverOpacity: val } ) }
										min={ 0 }
										max={ 0.95 }
										step={ 0.05 }
									/>
								</PanelBody>
							);
						}

						if ( tab.name === 'hover' ) {
							return (
								<PanelBody
									title={ __( 'Animações & Transições no Hover', 'periodic-advanced-banner' ) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Simular Efeito Hover no Editor', 'periodic-advanced-banner' ) }
										help={ __( 'Ative para testar visualmente a animação diretamente no painel de edição.', 'periodic-advanced-banner' ) }
										checked={ isHoverSimulated }
										onChange={ ( val ) => setIsHoverSimulated( val ) }
									/>
									<SelectControl
										label={ __( 'Efeito de Imagem no Hover', 'periodic-advanced-banner' ) }
										value={ hoverImageEffect }
										options={ [
											{ label: 'Zoom In Dinâmico (Aproximação)', value: 'zoom-in' },
											{ label: 'Zoom Out (Afastamento)', value: 'zoom-out' },
											{ label: 'Panorâmica Direita (Pan)', value: 'pan-right' },
											{ label: 'Rotação Sutil & Escala', value: 'rotate-subtle' },
											{ label: 'Monocromático para Colorido', value: 'grayscale-color' },
											{ label: 'Aumento de Brilho & Contraste', value: 'brighten' },
										] }
										onChange={ ( val ) => setAttributes( { hoverImageEffect: val } ) }
									/>
									<SelectControl
										label={ __( 'Efeito de Transição do Texto', 'periodic-advanced-banner' ) }
										value={ hoverTextEffect }
										options={ [
											{ label: 'Elevação Suave (Slide-Up com revelação)', value: 'slide-up' },
											{ label: 'Desvanecimento Suave (Fade-In)', value: 'fade-in' },
											{ label: 'Zoom-In no Texto', value: 'zoom-in' },
											{ label: 'Estático com Realce', value: 'none' },
										] }
										onChange={ ( val ) => setAttributes( { hoverTextEffect: val } ) }
									/>
								</PanelBody>
							);
						}

						if ( tab.name === 'layout' ) {
							return (
								<PanelBody
									title={ __( 'Layout & Dimensões', 'periodic-advanced-banner' ) }
									initialOpen={ true }
								>
									<SelectControl
										label={ __( 'Alinhamento do Conteúdo', 'periodic-advanced-banner' ) }
										value={ contentAlign }
										options={ [
											{ label: __( 'Esquerda', 'periodic-advanced-banner' ), value: 'start' },
											{ label: __( 'Centralizado', 'periodic-advanced-banner' ), value: 'center' },
											{ label: __( 'Direita', 'periodic-advanced-banner' ), value: 'end' },
										] }
										onChange={ ( val ) => setAttributes( { contentAlign: val } ) }
									/>
									<SelectControl
										label={ __( 'Altura Mínima (Desktop)', 'periodic-advanced-banner' ) }
										value={ minHeight }
										options={ [
											{ label: '350px', value: '350px' },
											{ label: '400px', value: '400px' },
											{ label: '450px (Padrão)', value: '450px' },
											{ label: '550px', value: '550px' },
											{ label: '650px', value: '650px' },
										] }
										onChange={ ( val ) => setAttributes( { minHeight: val } ) }
									/>
									<SelectControl
										label={ __( 'Altura Mínima (Mobile)', 'periodic-advanced-banner' ) }
										value={ minHeightMobile }
										options={ [
											{ label: '260px', value: '260px' },
											{ label: '300px', value: '300px' },
											{ label: '320px (Padrão)', value: '320px' },
											{ label: '380px', value: '380px' },
										] }
										onChange={ ( val ) => setAttributes( { minHeightMobile: val } ) }
									/>
									<RangeControl
										label={ __( 'Cantos Arredondados (Border Radius em px)', 'periodic-advanced-banner' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 40 }
										step={ 2 }
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
					className="periodic-banner-bg"
					style={ {
						backgroundImage: bgImageUrl ? `url(${ bgImageUrl })` : 'none',
						backgroundPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`,
					} }
				/>
				<div className="periodic-banner-overlay" />

				<div className={ `periodic-banner-content d-flex flex-column justify-content-center ${ alignClass }` }>
					{ showBadge && (
						<div className="periodic-banner-badge mb-2">
							<RichText
								tagName="span"
								className="badge bg-primary px-3 py-2 text-uppercase fw-semibold"
								value={ badgeText }
								onChange={ ( val ) => setAttributes( { badgeText: val } ) }
								placeholder={ __( 'Selo...', 'periodic-advanced-banner' ) }
							/>
						</div>
					) }

					<RichText
						tagName={ TitleTag }
						className="periodic-banner-title fw-bold text-white mb-2"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Digite o título...', 'periodic-advanced-banner' ) }
					/>

					<RichText
						tagName="p"
						className="periodic-banner-subtitle text-white-50 mb-4"
						value={ subtitle }
						onChange={ ( val ) => setAttributes( { subtitle: val } ) }
						placeholder={ __( 'Digite o subtítulo...', 'periodic-advanced-banner' ) }
					/>

					{ showButton && (
						<div className="periodic-banner-cta">
							<span className={ `btn ${ buttonStyle } px-4 py-2 fw-medium shadow-sm` }>
								{ buttonText || __( 'Saiba Mais', 'periodic-advanced-banner' ) }
							</span>
						</div>
					) }
				</div>

				{ ! bgImageUrl && (
					<div className="periodic-banner-placeholder-notice">
						<span>{ __( 'Selecione uma imagem de capa no painel lateral.', 'periodic-advanced-banner' ) }</span>
					</div>
				) }
			</div>
		</>
	);
}
