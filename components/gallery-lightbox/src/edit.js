import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	Button,
	ButtonGroup,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextControl,
	TextareaControl,
	Notice,
	Modal,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Opções de Proporção de Miniatura (Ratio Bootstrap 5).
 */
const ASPECT_RATIO_OPTIONS = [
	{ label: __( 'Quadrado 1:1 (Padrão)', 'periodic-gallery-lightbox' ), value: '1x1' },
	{ label: __( 'Clássico 4:3', 'periodic-gallery-lightbox' ), value: '4x3' },
	{ label: __( 'Widescreen 16:9', 'periodic-gallery-lightbox' ), value: '16x9' },
	{ label: __( 'Proporção Original', 'periodic-gallery-lightbox' ), value: 'original' },
];

/**
 * Opções de Espaçamento entre Imagens (Gap Bootstrap 5).
 */
const GAP_OPTIONS = [
	{ label: __( 'Mínimo (g-1)', 'periodic-gallery-lightbox' ), value: 'g-1' },
	{ label: __( 'Pequeno (g-2)', 'periodic-gallery-lightbox' ), value: 'g-2' },
	{ label: __( 'Médio (g-3 - Padrão)', 'periodic-gallery-lightbox' ), value: 'g-3' },
	{ label: __( 'Grande (g-4)', 'periodic-gallery-lightbox' ), value: 'g-4' },
	{ label: __( 'Extra Grande (g-5)', 'periodic-gallery-lightbox' ), value: 'g-5' },
];

/**
 * Temas do Lightbox.
 */
const THEME_OPTIONS = [
	{ label: __( 'Escuro Elegante (Dark - Padrão)', 'periodic-gallery-lightbox' ), value: 'dark' },
	{ label: __( 'Claro Sofisticado (Light)', 'periodic-gallery-lightbox' ), value: 'light' },
];

/**
 * Componente de Edição do Bloco Gutenberg.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		images,
		columnsDesktop,
		columnsTablet,
		columnsMobile,
		gapSize,
		aspectRatio,
		enableCaptions,
		enableThumbnailsBar,
		lightboxTheme,
	} = attributes;

	// Estados do editor
	const [ activeImageIndex, setActiveImageIndex ] = useState( 0 );
	const [ isPreviewOpen, setIsPreviewOpen ] = useState( false );
	const [ previewActiveIndex, setPreviewActiveIndex ] = useState( 0 );
	const [ isZoomed, setIsZoomed ] = useState( false );

	const blockProps = useBlockProps( {
		className: 'periodic-gallery-editor-container',
	} );

	/**
	 * Manipulador de seleção de mídia no WordPress.
	 */
	const onSelectImages = ( newImages ) => {
		const formattedImages = newImages.map( ( img ) => ( {
			id: img.id,
			url: img.url,
			thumbnailUrl:
				( img.sizes && img.sizes.medium && img.sizes.medium.url ) ||
				( img.sizes && img.sizes.thumbnail && img.sizes.thumbnail.url ) ||
				img.url,
			title: img.title || '',
			caption: img.caption || '',
			alt: img.alt || img.title || '',
		} ) );

		setAttributes( { images: formattedImages } );
		if ( formattedImages.length > 0 ) {
			setActiveImageIndex( 0 );
		}
	};

	/**
	 * Adiciona mais imagens à galeria existente.
	 */
	const onAddMoreImages = ( newImages ) => {
		const formattedImages = newImages.map( ( img ) => ( {
			id: img.id,
			url: img.url,
			thumbnailUrl:
				( img.sizes && img.sizes.medium && img.sizes.medium.url ) ||
				( img.sizes && img.sizes.thumbnail && img.sizes.thumbnail.url ) ||
				img.url,
			title: img.title || '',
			caption: img.caption || '',
			alt: img.alt || img.title || '',
		} ) );

		const merged = [ ...images, ...formattedImages ];
		setAttributes( { images: merged } );
	};

	/**
	 * Atualiza campo de uma imagem específica.
	 */
	const updateImageField = ( index, field, value ) => {
		const updated = [ ...images ];
		if ( updated[ index ] ) {
			updated[ index ] = {
				...updated[ index ],
				[ field ]: value,
			};
			setAttributes( { images: updated } );
		}
	};

	/**
	 * Remove uma imagem da galeria.
	 */
	const removeImage = ( index ) => {
		const updated = images.filter( ( _, i ) => i !== index );
		setAttributes( { images: updated } );
		if ( activeImageIndex >= updated.length ) {
			setActiveImageIndex( Math.max( 0, updated.length - 1 ) );
		}
	};

	/**
	 * Move uma imagem para a esquerda/anterior.
	 */
	const moveImageUp = ( index ) => {
		if ( index === 0 ) return;
		const updated = [ ...images ];
		const temp = updated[ index - 1 ];
		updated[ index - 1 ] = updated[ index ];
		updated[ index ] = temp;
		setAttributes( { images: updated } );
		setActiveImageIndex( index - 1 );
	};

	/**
	 * Move uma imagem para a direita/posterior.
	 */
	const moveImageDown = ( index ) => {
		if ( index >= images.length - 1 ) return;
		const updated = [ ...images ];
		const temp = updated[ index + 1 ];
		updated[ index + 1 ] = updated[ index ];
		updated[ index ] = temp;
		setAttributes( { images: updated } );
		setActiveImageIndex( index + 1 );
	};

	/**
	 * Obtém a classe de proporção do Bootstrap.
	 */
	const getRatioClass = () => {
		if ( aspectRatio === '1x1' ) return 'ratio ratio-1x1';
		if ( aspectRatio === '4x3' ) return 'ratio ratio-4x3';
		if ( aspectRatio === '16x9' ) return 'ratio ratio-16x9';
		return 'ratio-original';
	};

	// Imagem atualmente selecionada no painel lateral
	const currentImage = images[ activeImageIndex ] || null;

	// Navegação no preview modal
	const nextPreviewImage = () => {
		setPreviewActiveIndex( ( prev ) => ( prev + 1 ) % images.length );
		setIsZoomed( false );
	};

	const prevPreviewImage = () => {
		setPreviewActiveIndex(
			( prev ) => ( prev - 1 + images.length ) % images.length
		);
		setIsZoomed( false );
	};

	return (
		<div { ...blockProps }>
			{ /* Painel Lateral InspectorControls com 3 Abas Dedicadas */ }
			<InspectorControls>
				<TabPanel
					className="periodic-inspector-tabs"
					activeClass="is-active-tab"
					tabs={ [
						{
							name: 'gallery',
							title: __( 'Galeria de Imagens', 'periodic-gallery-lightbox' ),
							className: 'tab-gallery',
						},
						{
							name: 'layout',
							title: __( 'Layout da Grade', 'periodic-gallery-lightbox' ),
							className: 'tab-layout',
						},
						{
							name: 'lightbox',
							title: __( 'Configurações do Lightbox', 'periodic-gallery-lightbox' ),
							className: 'tab-lightbox',
						},
					] }
				>
					{ ( tab ) => {
						// ABA 1: GALERIA DE IMAGENS
						if ( tab.name === 'gallery' ) {
							return (
								<PanelBody
									title={ __( 'Gerenciar Imagens da Galeria', 'periodic-gallery-lightbox' ) }
									initialOpen={ true }
								>
									<Notice status="info" isDismissible={ false }>
										{ __(
											'Total de fotos na galeria: ',
											'periodic-gallery-lightbox'
										) }
										<strong>{ images.length }</strong>
									</Notice>

									<div className="periodic-gallery-upload-buttons my-3">
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ onSelectImages }
												allowedTypes={ [ 'image' ] }
												multiple={ true }
												gallery={ true }
												value={ images.map( ( img ) => img.id ) }
												render={ ( { open } ) => (
													<Button
														variant="secondary"
														className="w-100 mb-2"
														onClick={ open }
													>
														{ images.length === 0
															? __( 'Selecionar Imagens da Biblioteca', 'periodic-gallery-lightbox' )
															: __( 'Substituir / Reabrir Biblioteca', 'periodic-gallery-lightbox' ) }
													</Button>
												) }
											/>
										</MediaUploadCheck>

										{ images.length > 0 && (
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ onAddMoreImages }
													allowedTypes={ [ 'image' ] }
													multiple={ true }
													render={ ( { open } ) => (
														<Button
															variant="primary"
															className="w-100"
															onClick={ open }
														>
															{ __( '+ Adicionar Mais Imagens', 'periodic-gallery-lightbox' ) }
														</Button>
													) }
												/>
											</MediaUploadCheck>
										) }
									</div>

									{ currentImage && (
										<div className="periodic-image-editor-box mt-3 p-3 border rounded">
											<div className="d-flex justify-content-between align-items-center mb-2">
												<span className="fw-bold">
													{ __( 'Editando Foto', 'periodic-gallery-lightbox' ) } #{ activeImageIndex + 1 }
												</span>
												<div className="btn-group btn-group-sm">
													<Button
														isSmall
														variant="secondary"
														disabled={ activeImageIndex === 0 }
														onClick={ () => moveImageUp( activeImageIndex ) }
														title={ __( 'Mover para esquerda/anterior', 'periodic-gallery-lightbox' ) }
													>
														←
													</Button>
													<Button
														isSmall
														variant="secondary"
														disabled={ activeImageIndex >= images.length - 1 }
														onClick={ () => moveImageDown( activeImageIndex ) }
														title={ __( 'Mover para direita/próxima', 'periodic-gallery-lightbox' ) }
													>
														→
													</Button>
													<Button
														isSmall
														isDestructive
														variant="secondary"
														onClick={ () => removeImage( activeImageIndex ) }
														title={ __( 'Remover esta foto', 'periodic-gallery-lightbox' ) }
													>
														✕
													</Button>
												</div>
											</div>

											<div className="text-center mb-3">
												<img
													src={ currentImage.thumbnailUrl || currentImage.url }
													alt={ currentImage.alt }
													style={ {
														maxHeight: '120px',
														maxWidth: '100%',
														objectFit: 'cover',
														borderRadius: '4px',
													} }
												/>
											</div>

											<TextControl
												label={ __( 'Título da Imagem', 'periodic-gallery-lightbox' ) }
												value={ currentImage.title || '' }
												placeholder={ __( 'Ex: Pôr do sol na praia', 'periodic-gallery-lightbox' ) }
												onChange={ ( val ) =>
													updateImageField( activeImageIndex, 'title', val )
												}
											/>

											<TextareaControl
												label={ __( 'Legenda Descritiva', 'periodic-gallery-lightbox' ) }
												value={ currentImage.caption || '' }
												placeholder={ __( 'Ex: Fotografia tirada durante a viagem de 2025...', 'periodic-gallery-lightbox' ) }
												onChange={ ( val ) =>
													updateImageField( activeImageIndex, 'caption', val )
												}
											/>

											<TextControl
												label={ __( 'Texto Alternativo (Alt)', 'periodic-gallery-lightbox' ) }
												value={ currentImage.alt || '' }
												placeholder={ __( 'Descrição acessível da imagem...', 'periodic-gallery-lightbox' ) }
												onChange={ ( val ) =>
													updateImageField( activeImageIndex, 'alt', val )
												}
											/>
										</div>
									) }
								</PanelBody>
							);
						}

						// ABA 2: LAYOUT DA GRADE
						if ( tab.name === 'layout' ) {
							return (
								<PanelBody
									title={ __( 'Layout e Responsividade da Grade', 'periodic-gallery-lightbox' ) }
									initialOpen={ true }
								>
									<RangeControl
										label={ __( 'Colunas no Desktop (Telas Grandes)', 'periodic-gallery-lightbox' ) }
										value={ columnsDesktop }
										onChange={ ( val ) => setAttributes( { columnsDesktop: val } ) }
										min={ 1 }
										max={ 6 }
										step={ 1 }
										help={ __( 'Padrão recomendado: 3 ou 4 colunas.', 'periodic-gallery-lightbox' ) }
									/>

									<RangeControl
										label={ __( 'Colunas no Tablet (Telas Médias)', 'periodic-gallery-lightbox' ) }
										value={ columnsTablet }
										onChange={ ( val ) => setAttributes( { columnsTablet: val } ) }
										min={ 1 }
										max={ 4 }
										step={ 1 }
										help={ __( 'Padrão recomendado: 2 colunas.', 'periodic-gallery-lightbox' ) }
									/>

									<RangeControl
										label={ __( 'Colunas no Celular (Mobile)', 'periodic-gallery-lightbox' ) }
										value={ columnsMobile }
										onChange={ ( val ) => setAttributes( { columnsMobile: val } ) }
										min={ 1 }
										max={ 2 }
										step={ 1 }
										help={ __( 'Padrão recomendado: 1 ou 2 colunas.', 'periodic-gallery-lightbox' ) }
									/>

									<hr />

									<SelectControl
										label={ __( 'Espaçamento da Grade (Bootstrap Gap)', 'periodic-gallery-lightbox' ) }
										value={ gapSize }
										options={ GAP_OPTIONS }
										onChange={ ( val ) => setAttributes( { gapSize: val } ) }
										help={ __( 'Define a distância entre as fotos na grade.', 'periodic-gallery-lightbox' ) }
									/>

									<SelectControl
										label={ __( 'Proporção das Miniaturas (Corte da Imagem)', 'periodic-gallery-lightbox' ) }
										value={ aspectRatio }
										options={ ASPECT_RATIO_OPTIONS }
										onChange={ ( val ) => setAttributes( { aspectRatio: val } ) }
										help={ __( 'Formato visual de exibição de cada foto na grade.', 'periodic-gallery-lightbox' ) }
									/>
								</PanelBody>
							);
						}

						// ABA 3: CONFIGURAÇÕES DO LIGHTBOX
						if ( tab.name === 'lightbox' ) {
							return (
								<PanelBody
									title={ __( 'Configurações do Lightbox em Tela Cheia', 'periodic-gallery-lightbox' ) }
									initialOpen={ true }
								>
									<SelectControl
										label={ __( 'Tema Visual do Lightbox', 'periodic-gallery-lightbox' ) }
										value={ lightboxTheme }
										options={ THEME_OPTIONS }
										onChange={ ( val ) => setAttributes( { lightboxTheme: val } ) }
										help={ __( 'Escolha entre fundo escuro profundo ou claro moderno.', 'periodic-gallery-lightbox' ) }
									/>

									<ToggleControl
										label={ __( 'Exibir Títulos e Legendas', 'periodic-gallery-lightbox' ) }
										checked={ enableCaptions }
										onChange={ ( val ) => setAttributes( { enableCaptions: val } ) }
										help={ __( 'Mostra textos explicativos na galeria e no lightbox.', 'periodic-gallery-lightbox' ) }
									/>

									<ToggleControl
										label={ __( 'Barra de Miniaturas Inferior', 'periodic-gallery-lightbox' ) }
										checked={ enableThumbnailsBar }
										onChange={ ( val ) =>
											setAttributes( { enableThumbnailsBar: val } )
										}
										help={ __( 'Habilita carrossel de miniaturas deslizantes na base do popup.', 'periodic-gallery-lightbox' ) }
									/>

									<hr />

									<Notice status="info" isDismissible={ false }>
										<strong>{ __( 'Recursos de Navegação Inclusos:', 'periodic-gallery-lightbox' ) }</strong>
										<ul style={ { margin: '8px 0 0 16px', padding: 0 } }>
											<li>{ __( 'Navegação circular pelas setas laterais', 'periodic-gallery-lightbox' ) }</li>
											<li>{ __( 'Teclas de atalho: [←] Anterior, [→] Próxima, [Esc] Sair', 'periodic-gallery-lightbox' ) }</li>
											<li>{ __( 'Zoom interativo com cursor panorâmico', 'periodic-gallery-lightbox' ) }</li>
											<li>{ __( 'Suporte a gestos touch (deslize horizontal no mobile)', 'periodic-gallery-lightbox' ) }</li>
										</ul>
									</Notice>
								</PanelBody>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			{ /* BARRA SUPERIOR DO EDITOR */ }
			<div className="periodic-editor-top-bar d-flex justify-content-between align-items-center mb-3 p-2 bg-light border rounded">
				<div className="d-flex align-items-center">
					<i className="fa-solid fa-images text-primary me-2 fs-5" aria-hidden="true" />
					<span className="fw-bold">
						{ __( 'Galeria com Lightbox', 'periodic-gallery-lightbox' ) }
					</span>
					<span className="badge bg-secondary ms-2">
						{ images.length } { images.length === 1 ? __( 'foto', 'periodic-gallery-lightbox' ) : __( 'fotos', 'periodic-gallery-lightbox' ) }
					</span>
				</div>

				{ images.length > 0 && (
					<Button
						variant="secondary"
						isSmall
						onClick={ () => {
							setPreviewActiveIndex( 0 );
							setIsPreviewOpen( true );
						} }
					>
						<i className="fa-solid fa-expand me-1" aria-hidden="true" />
						{ __( 'Testar Lightbox Interativo', 'periodic-gallery-lightbox' ) }
					</Button>
				) }
			</div>

			{ /* ESTADO VAZIO / PLACEHOLDER */ }
			{ images.length === 0 ? (
				<div className="periodic-gallery-empty-state text-center p-5 border border-2 border-dashed rounded bg-light">
					<i className="fa-solid fa-cloud-arrow-up display-3 text-secondary mb-3" aria-hidden="true" />
					<h4 className="fw-bold">
						{ __( 'Sua Galeria está Vazia', 'periodic-gallery-lightbox' ) }
					</h4>
					<p className="text-muted mb-4">
						{ __(
							'Adicione fotografias da sua biblioteca de mídia do WordPress para iniciar a exibição com lightbox em tela cheia.',
							'periodic-gallery-lightbox'
						) }
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImages }
							allowedTypes={ [ 'image' ] }
							multiple={ true }
							gallery={ true }
							render={ ( { open } ) => (
								<Button variant="primary" onClick={ open }>
									<i className="fa-solid fa-plus me-2" aria-hidden="true" />
									{ __( 'Selecionar Imagens para a Galeria', 'periodic-gallery-lightbox' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</div>
			) : (
				/* GRADE WYSIWYG RESPONSIVA BOOTSTRAP 5 */
				<div className="container-fluid p-0">
					<div
						className={ `row row-cols-${ columnsMobile } row-cols-md-${ columnsTablet } row-cols-lg-${ columnsDesktop } ${ gapSize } periodic-gallery-grid` }
					>
						{ images.map( ( image, index ) => {
							const isCurrent = activeImageIndex === index;
							return (
								<div key={ index } className="col periodic-gallery-item-col">
									<div
										className={ `periodic-gallery-card ${ isCurrent ? 'is-selected' : '' }` }
										onClick={ () => setActiveImageIndex( index ) }
										role="button"
										tabIndex={ 0 }
										onKeyDown={ ( e ) => {
											if ( e.key === 'Enter' || e.key === ' ' ) {
												setActiveImageIndex( index );
											}
										} }
									>
										<div className={ `periodic-image-wrapper ${ getRatioClass() }` }>
											<img
												src={ image.thumbnailUrl || image.url }
												alt={ image.alt || '' }
												className="periodic-gallery-thumbnail"
											/>

											{ /* Overlay de Ações Rápidas */ }
											<div className="periodic-card-overlay">
												<span className="periodic-item-counter">
													#{ index + 1 }
												</span>
												<div className="periodic-quick-actions">
													<button
														type="button"
														className="btn btn-sm btn-light py-0 px-1"
														disabled={ index === 0 }
														onClick={ ( e ) => {
															e.stopPropagation();
															moveImageUp( index );
														} }
														title={ __( 'Mover para esquerda', 'periodic-gallery-lightbox' ) }
													>
														←
													</button>
													<button
														type="button"
														className="btn btn-sm btn-light py-0 px-1"
														disabled={ index >= images.length - 1 }
														onClick={ ( e ) => {
															e.stopPropagation();
															moveImageDown( index );
														} }
														title={ __( 'Mover para direita', 'periodic-gallery-lightbox' ) }
													>
														→
													</button>
													<button
														type="button"
														className="btn btn-sm btn-danger py-0 px-1"
														onClick={ ( e ) => {
															e.stopPropagation();
															removeImage( index );
														} }
														title={ __( 'Excluir', 'periodic-gallery-lightbox' ) }
													>
														✕
													</button>
												</div>
											</div>

											{ /* Legenda / Título Sobreposto */ }
											{ enableCaptions && ( image.title || image.caption ) && (
												<div className="periodic-caption-bar">
													{ image.title && (
														<strong className="d-block text-truncate">
															{ image.title }
														</strong>
													) }
													{ image.caption && (
														<small className="d-block text-truncate">
															{ image.caption }
														</small>
													) }
												</div>
											) }
										</div>
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
			) }

			{ /* MODAL DE TESTE DE VISUALIZAÇÃO DO LIGHTBOX NO EDITOR */ }
			{ isPreviewOpen && images.length > 0 && (
				<Modal
					title={ `${ __( 'Modo de Teste do Lightbox', 'periodic-gallery-lightbox' ) } (${ previewActiveIndex + 1 } / ${ images.length })` }
					onRequestClose={ () => {
						setIsPreviewOpen( false );
						setIsZoomed( false );
					} }
					className={ `periodic-lightbox-test-modal theme-${ lightboxTheme }` }
				>
					<div className="periodic-modal-lightbox-stage">
						<button
							type="button"
							className="periodic-nav-btn prev-btn"
							onClick={ prevPreviewImage }
							title={ __( 'Imagem Anterior', 'periodic-gallery-lightbox' ) }
						>
							<i className="fa-solid fa-chevron-left" aria-hidden="true" />
						</button>

						<div
							className={ `periodic-modal-image-container ${ isZoomed ? 'is-zoomed' : '' }` }
							onClick={ () => setIsZoomed( ! isZoomed ) }
							role="presentation"
						>
							<img
								src={ images[ previewActiveIndex ].url }
								alt={ images[ previewActiveIndex ].alt || '' }
								className="periodic-modal-full-image"
							/>
						</div>

						<button
							type="button"
							className="periodic-nav-btn next-btn"
							onClick={ nextPreviewImage }
							title={ __( 'Próxima Imagem', 'periodic-gallery-lightbox' ) }
						>
							<i className="fa-solid fa-chevron-right" aria-hidden="true" />
						</button>
					</div>

					{ /* Controles de Zoom */ }
					<div className="periodic-modal-toolbar text-center my-2">
						<Button
							isSmall
							variant="secondary"
							onClick={ () => setIsZoomed( ! isZoomed ) }
						>
							<i
								className={ `fa-solid ${ isZoomed ? 'fa-magnifying-glass-minus' : 'fa-magnifying-glass-plus' } me-1` }
								aria-hidden="true"
							/>
							{ isZoomed
								? __( 'Reduzir Zoom (100%)', 'periodic-gallery-lightbox' )
								: __( 'Ampliar Zoom (200%)', 'periodic-gallery-lightbox' ) }
						</Button>
					</div>

					{ /* Legenda */ }
					{ enableCaptions && (
						<div className="periodic-modal-caption text-center py-2">
							{ images[ previewActiveIndex ].title && (
								<h6 className="fw-bold mb-1">
									{ images[ previewActiveIndex ].title }
								</h6>
							) }
							{ images[ previewActiveIndex ].caption && (
								<p className="small text-muted mb-0">
									{ images[ previewActiveIndex ].caption }
								</p>
							) }
						</div>
					) }

					{ /* Barra de Miniaturas Inferior no Modal */ }
					{ enableThumbnailsBar && images.length > 1 && (
						<div className="periodic-modal-thumbs-tray mt-3">
							<div className="periodic-modal-thumbs-scroll">
								{ images.map( ( thumb, tIdx ) => (
									<button
										type="button"
										key={ tIdx }
										className={ `periodic-modal-thumb-btn ${ tIdx === previewActiveIndex ? 'is-active' : '' }` }
										onClick={ () => {
											setPreviewActiveIndex( tIdx );
											setIsZoomed( false );
										} }
									>
										<img
											src={ thumb.thumbnailUrl || thumb.url }
											alt={ thumb.alt || '' }
										/>
									</button>
								) ) }
							</div>
						</div>
					) }
				</Modal>
			) }
		</div>
	);
}
