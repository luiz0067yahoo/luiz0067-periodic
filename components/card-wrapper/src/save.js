import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		hasHeader,
		headerTitle,
		headerBgColor,
		headerTextColor,
		hasFooter,
		footerContent,
		footerBgColor,
		footerTextColor,
		cardShadow,
		borderStyle,
		borderRadius,
		cardBgColor,
		cardTextColor,
	} = attributes;

	const cardClasses = [
		'card',
		'periodic-card-wrapper',
		borderStyle || 'border',
		borderRadius || 'rounded',
		cardShadow && cardShadow !== 'none' ? cardShadow : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps.save( {
		className: cardClasses,
		style: {
			backgroundColor: cardBgColor || undefined,
			color: cardTextColor || undefined,
		},
	} );

	return (
		<div { ...blockProps }>
			{ hasHeader && (
				<div
					className="card-header periodic-card-header"
					style={ {
						backgroundColor: headerBgColor || undefined,
						color: headerTextColor || undefined,
					} }
				>
					<RichText.Content
						tagName="h5"
						className="card-title mb-0"
						value={ headerTitle }
					/>
				</div>
			) }

			<div className="card-body periodic-card-body">
				<InnerBlocks.Content />
			</div>

			{ hasFooter && (
				<div
					className="card-footer periodic-card-footer text-muted"
					style={ {
						backgroundColor: footerBgColor || undefined,
						color: footerTextColor || undefined,
					} }
				>
					<RichText.Content
						tagName="div"
						className="periodic-card-footer-content"
						value={ footerContent }
					/>
				</div>
			) }
		</div>
	);
}
