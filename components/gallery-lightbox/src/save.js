import { useBlockProps } from '@wordpress/block-editor';

/**
 * Renderização HTML semântica estática do Bloco Gutenberg.
 */
export default function save( { attributes } ) {
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

	if ( ! images || images.length === 0 ) {
		return null;
	}

	/**
	 * Obtém a classe de proporção do Bootstrap 5.
	 */
	const getRatioClass = () => {
		if ( aspectRatio === '1x1' ) return 'ratio ratio-1x1';
		if ( aspectRatio === '4x3' ) return 'ratio ratio-4x3';
		if ( aspectRatio === '16x9' ) return 'ratio ratio-16x9';
		return 'ratio-original';
	};

	const blockProps = useBlockProps.save( {
		className: `periodic-gallery-lightbox-wrapper theme-${ lightboxTheme }`,
		'data-theme': lightboxTheme,
		'data-enable-captions': enableCaptions ? 'true' : 'false',
		'data-enable-thumbnails': enableThumbnailsBar ? 'true' : 'false',
		'data-total-images': images.length,
	} );

	return (
		<div { ...blockProps }>
			{ /* Grade de Imagens Responsiva Bootstrap 5 */ }
			<div
				className={ `row row-cols-${ columnsMobile } row-cols-md-${ columnsTablet } row-cols-lg-${ columnsDesktop } ${ gapSize } periodic-gallery-grid` }
			>
				{ images.map( ( image, index ) => (
					<div
						key={ index }
						className="col periodic-gallery-item-col"
						data-index={ index }
					>
						<a
							href={ image.url }
							className={ `periodic-lightbox-trigger ${ getRatioClass() }` }
							data-lightbox-index={ index }
							data-full-url={ image.url }
							data-thumbnail-url={ image.thumbnailUrl || image.url }
							data-title={ image.title || '' }
							data-caption={ image.caption || '' }
							data-alt={ image.alt || '' }
							aria-label={ image.title || 'Visualizar imagem em tela cheia' }
						>
							<img
								src={ image.thumbnailUrl || image.url }
								alt={ image.alt || '' }
								className="periodic-gallery-thumbnail"
								loading="lazy"
							/>

							{ /* Ícone visual de expansão ao passar o mouse */ }
							<span className="periodic-zoom-indicator" aria-hidden="true">
								<i className="fa-solid fa-magnifying-glass-plus" />
							</span>

							{ /* Legenda / Título Sobreposto se habilitado */ }
							{ enableCaptions && ( image.title || image.caption ) && (
								<div className="periodic-caption-overlay">
									{ image.title && (
										<strong className="d-block text-truncate periodic-caption-title">
											{ image.title }
										</strong>
									) }
									{ image.caption && (
										<small className="d-block text-truncate periodic-caption-text">
											{ image.caption }
										</small>
									) }
								</div>
							) }
						</a>
					</div>
				) ) }
			</div>
		</div>
	);
}
