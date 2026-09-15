/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save Component
 */
export default function save( { attributes } ) {
	const {
		containerType,
		htmlTag,
		backgroundColor,
		bgGradient,
		bgImageUrl,
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

	const blockProps = useBlockProps.save( {
		className: sectionClasses,
		style: sectionStyles,
	} );

	return (
		<Tag { ...blockProps }>
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
				<InnerBlocks.Content />
			</div>
		</Tag>
	);
}
