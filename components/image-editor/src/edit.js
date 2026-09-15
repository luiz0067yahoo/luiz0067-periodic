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
	TextControl,
	RangeControl,
	SelectControl,
	Button,
	ButtonGroup,
	Flex,
	FlexItem,
	Notice,
	Tooltip,
} from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		imageUrl,
		imageId,
		imageAlt,
		zoom = 1,
		rotation = 0,
		positionX = 0,
		positionY = 0,
		containerHeight = '450px',
		objectFit = 'cover',
		borderRadius = 'rounded-3',
		boxShadow = 'shadow-sm',
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'periodic-image-editor-block',
	} );

	const onSelectImage = ( media ) => {
		setAttributes( {
			imageUrl: media.url,
			imageId: media.id,
			imageAlt: media.alt || media.title || '',
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			imageUrl: '',
			imageId: 0,
			imageAlt: '',
		} );
	};

	// Controles rápidos de rotação
	const rotateClockwise = () => {
		setAttributes( { rotation: ( rotation + 90 ) % 360 } );
	};

	const rotateCounterClockwise = () => {
		setAttributes( { rotation: ( rotation - 90 + 360 ) % 360 } );
	};

	// Reset total
	const resetAllTransforms = () => {
		setAttributes( {
			zoom: 1,
			rotation: 0,
			positionX: 0,
			positionY: 0,
		} );
	};

	const resetPosition = () => {
		setAttributes( {
			positionX: 0,
			positionY: 0,
		} );
	};

	const transformStyle = {
		transform: `translate(${ positionX }px, ${ positionY }px) scale(${ zoom }) rotate(${ rotation }deg)`,
		transformOrigin: 'center center',
		objectFit,
		width: '100%',
		height: '100%',
		transition: 'transform 0.15s ease-out',
	};

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<TabPanel
					className="periodic-image-editor-tabs"
					activeClass="is-active"
					tabs={ [
						{
							name: 'media',
							title: __( 'Mídia e Seleção', 'periodic-image-editor' ),
							className: 'tab-media',
						},
						{
							name: 'transform',
							title: __( 'Zoom e Rotação', 'periodic-image-editor' ),
							className: 'tab-transform',
						},
						{
							name: 'position',
							title: __( 'Posicionamento X / Y', 'periodic-image-editor' ),
							className: 'tab-position',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'media' ) {
							return (
								<div className="periodic-tab-body">
									<PanelBody title={ __( 'Seleção de Imagem', 'periodic-image-editor' ) } initialOpen={ true }>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ onSelectImage }
												allowedTypes={ [ 'image' ] }
												value={ imageId }
												render={ ( { open } ) => (
													<div className="periodic-media-upload-ui">
														{ ! imageUrl ? (
															<Button
																variant="primary"
																onClick={ open }
																className="w-100 justify-content-center"
																style={ { height: '42px' } }
															>
																<i className="fa-solid fa-cloud-arrow-up" style={ { marginRight: '8px' } }></i>
																{ __( 'Selecionar Imagem', 'periodic-image-editor' ) }
															</Button>
														) : (
															<div className="d-flex flex-column gap-2">
																<Button
																	variant="secondary"
																	onClick={ open }
																	className="w-100 justify-content-center"
																>
																	<i className="fa-solid fa-arrows-rotate" style={ { marginRight: '8px' } }></i>
																	{ __( 'Trocar Imagem', 'periodic-image-editor' ) }
																</Button>
																<Button
																	isDestructive
																	variant="tertiary"
																	onClick={ onRemoveImage }
																	className="w-100 justify-content-center"
																>
																	<i className="fa-solid fa-trash-can" style={ { marginRight: '8px' } }></i>
																	{ __( 'Remover Imagem', 'periodic-image-editor' ) }
																</Button>
															</div>
														) }
													</div>
												) }
											/>
										</MediaUploadCheck>

										{ imageUrl && (
											<div className="mt-3">
												<TextControl
													label={ __( 'Texto Alternativo (Alt Text)', 'periodic-image-editor' ) }
													value={ imageAlt }
													onChange={ ( val ) => setAttributes( { imageAlt: val } ) }
													help={ __( 'Descreva a imagem para leitores de tela e SEO.', 'periodic-image-editor' ) }
												/>
											</div>
										) }
									</PanelBody>

									<PanelBody title={ __( 'Dimensões e Moldura', 'periodic-image-editor' ) } initialOpen={ true }>
										<SelectControl
											label={ __( 'Altura do Contêiner', 'periodic-image-editor' ) }
											value={ containerHeight }
											options={ [
												{ label: '300px (Compacto)', value: '300px' },
												{ label: '400px (Médio)', value: '400px' },
												{ label: '450px (Padrão)', value: '450px' },
												{ label: '550px (Grande)', value: '550px' },
												{ label: '650px (Extra Grande)', value: '650px' },
											] }
											onChange={ ( val ) => setAttributes( { containerHeight: val } ) }
										/>
										<SelectControl
											label={ __( 'Cantos Arredondados (Bootstrap 5)', 'periodic-image-editor' ) }
											value={ borderRadius }
											options={ [
												{ label: 'Reto (rounded-0)', value: 'rounded-0' },
												{ label: 'Leve (rounded)', value: 'rounded' },
												{ label: 'Médio (rounded-3)', value: 'rounded-3' },
												{ label: 'Arredondamento Forte (rounded-4)', value: 'rounded-4' },
												{ label: 'Circular (rounded-circle)', value: 'rounded-circle' },
											] }
											onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										/>
										<SelectControl
											label={ __( 'Sombra (Bootstrap 5)', 'periodic-image-editor' ) }
											value={ boxShadow }
											options={ [
												{ label: 'Sem sombra (shadow-none)', value: 'shadow-none' },
												{ label: 'Sombra suave (shadow-sm)', value: 'shadow-sm' },
												{ label: 'Sombra regular (shadow)', value: 'shadow' },
												{ label: 'Sombra destacada (shadow-lg)', value: 'shadow-lg' },
											] }
											onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
										/>
									</PanelBody>
								</div>
							);
						}

						if ( tab.name === 'transform' ) {
							return (
								<div className="periodic-tab-body">
									<PanelBody title={ __( 'Escala e Zoom', 'periodic-image-editor' ) } initialOpen={ true }>
										<RangeControl
											label={ __( 'Fator de Zoom', 'periodic-image-editor' ) }
											value={ zoom }
											onChange={ ( val ) => setAttributes( { zoom: parseFloat( val ) } ) }
											min={ 0.5 }
											max={ 3.5 }
											step={ 0.05 }
											help={ `${ Math.round( zoom * 100 ) }%` }
										/>
										<div className="d-flex justify-content-between gap-1 mt-2">
											<Button
												size="small"
												variant="secondary"
												onClick={ () => setAttributes( { zoom: 1 } ) }
											>
												100% (1x)
											</Button>
											<Button
												size="small"
												variant="secondary"
												onClick={ () => setAttributes( { zoom: 1.5 } ) }
											>
												150% (1.5x)
											</Button>
											<Button
												size="small"
												variant="secondary"
												onClick={ () => setAttributes( { zoom: 2 } ) }
											>
												200% (2x)
											</Button>
										</div>
									</PanelBody>

									<PanelBody title={ __( 'Giro e Rotação', 'periodic-image-editor' ) } initialOpen={ true }>
										<RangeControl
											label={ __( 'Ângulo em Graus', 'periodic-image-editor' ) }
											value={ rotation }
											onChange={ ( val ) => setAttributes( { rotation: parseInt( val, 10 ) } ) }
											min={ 0 }
											max={ 360 }
											step={ 1 }
											help={ `${ rotation }°` }
										/>

										<p style={ { fontSize: '12px', color: '#6c757d', marginBottom: '8px' } }>
											{ __( 'Giro Rápido:', 'periodic-image-editor' ) }
										</p>
										<div className="d-flex gap-2 mb-3">
											<Button
												variant="secondary"
												onClick={ rotateCounterClockwise }
												className="flex-fill justify-content-center"
											>
												<i className="fa-solid fa-rotate-left" style={ { marginRight: '6px' } }></i>
												-90°
											</Button>
											<Button
												variant="secondary"
												onClick={ rotateClockwise }
												className="flex-fill justify-content-center"
											>
												<i className="fa-solid fa-rotate-right" style={ { marginRight: '6px' } }></i>
												+90°
											</Button>
											<Button
												variant="secondary"
												onClick={ () => setAttributes( { rotation: 0 } ) }
											>
												0°
											</Button>
										</div>
									</PanelBody>
								</div>
							);
						}

						if ( tab.name === 'position' ) {
							return (
								<div className="periodic-tab-body">
									<PanelBody title={ __( 'Deslocamento nos Eixos X e Y', 'periodic-image-editor' ) } initialOpen={ true }>
										<RangeControl
											label={ __( 'Posição Horizontal (Eixo X)', 'periodic-image-editor' ) }
											value={ positionX }
											onChange={ ( val ) => setAttributes( { positionX: parseInt( val, 10 ) } ) }
											min={ -300 }
											max={ 300 }
											step={ 2 }
											help={ `${ positionX }px` }
										/>
										<RangeControl
											label={ __( 'Posição Vertical (Eixo Y)', 'periodic-image-editor' ) }
											value={ positionY }
											onChange={ ( val ) => setAttributes( { positionY: parseInt( val, 10 ) } ) }
											min={ -300 }
											max={ 300 }
											step={ 2 }
											help={ `${ positionY }px` }
										/>

										<div className="mt-3">
											<Button
												variant="secondary"
												onClick={ resetPosition }
												className="w-100 justify-content-center"
											>
												<i className="fa-solid fa-crosshairs" style={ { marginRight: '6px' } }></i>
												{ __( 'Centralizar Imagem (X: 0, Y: 0)', 'periodic-image-editor' ) }
											</Button>
										</div>
									</PanelBody>

									<PanelBody title={ __( 'Preenchimento e Ajustes Finos', 'periodic-image-editor' ) } initialOpen={ true }>
										<SelectControl
											label={ __( 'Comportamento (Object Fit)', 'periodic-image-editor' ) }
											value={ objectFit }
											options={ [
												{ label: __( 'Cobrir área mantendo proporção (cover)', 'periodic-image-editor' ), value: 'cover' },
												{ label: __( 'Conter imagem inteira (contain)', 'periodic-image-editor' ), value: 'contain' },
												{ label: __( 'Preencher esticando (fill)', 'periodic-image-editor' ), value: 'fill' },
											] }
											onChange={ ( val ) => setAttributes( { objectFit: val } ) }
										/>

										<div className="mt-4 pt-3 border-top">
											<Button
												isDestructive
												variant="secondary"
												onClick={ resetAllTransforms }
												className="w-100 justify-content-center"
											>
												<i className="fa-solid fa-arrow-rotate-left" style={ { marginRight: '6px' } }></i>
												{ __( 'Resetar Todas as Transformações', 'periodic-image-editor' ) }
											</Button>
										</div>
									</PanelBody>
								</div>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			{ /* Canvas de Edição WYSIWYG */ }
			<div className="periodic-canvas-container">
				{ ! imageUrl ? (
					<div
						className="periodic-placeholder p-5 text-center border rounded-3 bg-light d-flex flex-column align-items-center justify-content-center"
						style={ { minHeight: containerHeight } }
					>
						<div className="periodic-placeholder-icon mb-3">
							<i className="fa-regular fa-image fa-3x text-secondary"></i>
						</div>
						<h4 className="fw-bold text-dark mb-1">
							{ __( 'Periodic Image Editor', 'periodic-image-editor' ) }
						</h4>
						<p className="text-muted mb-3" style={ { maxWidth: '400px' } }>
							{ __( 'Selecione uma imagem para aplicar zoom, rotação e deslocamento visual em tempo real.', 'periodic-image-editor' ) }
						</p>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectImage }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<Button variant="primary" onClick={ open }>
										<i className="fa-solid fa-cloud-arrow-up me-2"></i>
										{ __( 'Carregar Imagem', 'periodic-image-editor' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</div>
				) : (
					<div className="periodic-preview-wrapper position-relative">
						{ /* Barra Flutuante de Atalhos Rápidos */ }
						<div className="periodic-floating-toolbar shadow-sm d-flex align-items-center gap-1">
							<Tooltip text={ __( 'Aumentar Zoom', 'periodic-image-editor' ) }>
								<button
									type="button"
									className="btn btn-sm btn-light"
									onClick={ () => setAttributes( { zoom: Math.min( 3.5, zoom + 0.1 ) } ) }
								>
									<i className="fa-solid fa-magnifying-glass-plus"></i>
								</button>
							</Tooltip>
							<Tooltip text={ __( 'Diminuir Zoom', 'periodic-image-editor' ) }>
								<button
									type="button"
									className="btn btn-sm btn-light"
									onClick={ () => setAttributes( { zoom: Math.max( 0.5, zoom - 0.1 ) } ) }
								>
									<i className="fa-solid fa-magnifying-glass-minus"></i>
								</button>
							</Tooltip>
							<span className="vr mx-1"></span>
							<Tooltip text={ __( 'Girar 90°', 'periodic-image-editor' ) }>
								<button
									type="button"
									className="btn btn-sm btn-light"
									onClick={ rotateClockwise }
								>
									<i className="fa-solid fa-rotate-right"></i>
								</button>
							</Tooltip>
							<Tooltip text={ __( 'Resetar Posição e Zoom', 'periodic-image-editor' ) }>
								<button
									type="button"
									className="btn btn-sm btn-light"
									onClick={ resetAllTransforms }
								>
									<i className="fa-solid fa-arrow-rotate-left"></i>
								</button>
							</Tooltip>
							<span className="badge bg-dark text-white ms-2" style={ { fontSize: '11px' } }>
								{ Math.round( zoom * 100 ) }% | { rotation }°
							</span>
						</div>

						{ /* Contêiner de Enquadramento */ }
						<div
							className={ `periodic-image-frame position-relative overflow-hidden ${ borderRadius } ${ boxShadow } d-flex justify-content-center align-items-center` }
							style={ {
								height: containerHeight,
								width: '100%',
								backgroundColor: '#000000',
							} }
						>
							<img
								src={ imageUrl }
								alt={ imageAlt }
								style={ transformStyle }
								className="periodic-transformed-img"
								draggable={ false }
							/>
						</div>
					</div>
				) }
			</div>
		</div>
	);
}
