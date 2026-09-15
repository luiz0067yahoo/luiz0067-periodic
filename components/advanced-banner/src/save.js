import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		bgImageUrl,
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

	const blockProps = useBlockProps.save( {
		className: `periodic-advanced-banner-block hover-img-${ hoverImageEffect } hover-text-${ hoverTextEffect }`,
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
				{ showBadge && badgeText && (
					<div className="periodic-banner-badge mb-2">
						<RichText.Content
							tagName="span"
							className="badge bg-primary px-3 py-2 text-uppercase fw-semibold"
							value={ badgeText }
						/>
					</div>
				) }

				{ title && (
					<RichText.Content
						tagName={ TitleTag }
						className="periodic-banner-title fw-bold text-white mb-2"
						value={ title }
					/>
				) }

				{ subtitle && (
					<RichText.Content
						tagName="p"
						className="periodic-banner-subtitle text-white-50 mb-4"
						value={ subtitle }
					/>
				) }

				{ showButton && buttonText && (
					<div className="periodic-banner-cta">
						<a
							href={ buttonUrl || '#' }
							className={ `btn ${ buttonStyle } px-4 py-2 fw-medium shadow-sm` }
							target={ buttonTarget ? '_blank' : undefined }
							rel={ buttonTarget ? 'noopener noreferrer' : undefined }
						>
							{ buttonText }
						</a>
					</div>
				) }
			</div>
		</div>
	);
}
