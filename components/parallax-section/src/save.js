import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		bgImageUrl,
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

	const blockProps = useBlockProps.save( {
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
		'data-parallax-speed': parallaxSpeed,
		'data-parallax-direction': parallaxDirection,
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
						<InnerBlocks.Content />
					</div>
				) : (
					<div className="w-100">
						<InnerBlocks.Content />
					</div>
				) }
			</div>
		</div>
	);
}
