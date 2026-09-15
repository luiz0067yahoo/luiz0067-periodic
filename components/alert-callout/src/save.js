import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		alertType,
		alertTitle,
		alertMessage,
		iconClass,
		isDismissible,
		hasBorderLeftHighlight,
	} = attributes;

	const dismissibleClasses = isDismissible ? 'alert-dismissible fade show' : '';
	const borderHighlightClass = hasBorderLeftHighlight ? 'callout-border-highlight' : '';

	const blockProps = useBlockProps.save( {
		className: `alert alert-${ alertType } ${ dismissibleClasses } ${ borderHighlightClass } d-flex align-items-start position-relative`,
		role: 'alert',
	} );

	return (
		<div { ...blockProps }>
			{ iconClass && (
				<div className="alert-icon-container me-3 flex-shrink-0 mt-1">
					<i className={ `${ iconClass } fs-4` }></i>
				</div>
			) }

			<div className="alert-content-container flex-grow-1 pe-4">
				{ alertTitle && (
					<RichText.Content
						tagName="h5"
						className="alert-heading fw-semibold mb-1"
						value={ alertTitle }
					/>
				) }
				{ alertMessage && (
					<RichText.Content
						tagName="div"
						className="alert-body-content mb-0"
						value={ alertMessage }
					/>
				) }
			</div>

			{ isDismissible && (
				<button
					type="button"
					className="btn-close"
					data-bs-dismiss="alert"
					aria-label={ __( 'Fechar', 'periodic-alert-callout' ) }
				></button>
			) }
		</div>
	);
}
