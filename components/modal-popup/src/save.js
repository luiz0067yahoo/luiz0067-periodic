import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		modalId,
		buttonText,
		buttonIcon,
		buttonVariant,
		buttonSize,
		modalTitle,
		modalSize,
		modalContent,
		closeButtonText,
		staticBackdrop,
		centeredModal,
		scrollableModal,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'periodic-modal-popup-wrapper',
	} );

	const buttonClasses = [
		'btn',
		buttonVariant || 'btn-primary',
		buttonSize || '',
		'periodic-modal-trigger-btn',
	]
		.filter( Boolean )
		.join( ' ' );

	const dialogClasses = [
		'modal-dialog',
		modalSize || '',
		centeredModal ? 'modal-dialog-centered' : '',
		scrollableModal ? 'modal-dialog-scrollable' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div { ...blockProps }>
			{ /* Botão de Gatilho */ }
			<button
				type="button"
				className={ buttonClasses }
				data-bs-toggle="modal"
				data-bs-target={ `#${ modalId }` }
				aria-controls={ modalId }
			>
				{ buttonIcon && (
					<i
						className={ `${ buttonIcon } me-2 periodic-btn-icon` }
						aria-hidden="true"
					></i>
				) }
				<span>{ buttonText }</span>
			</button>

			{ /* Estrutura Semântica do Modal Bootstrap 5 */ }
			<div
				className="modal fade periodic-modal-element"
				id={ modalId }
				tabIndex="-1"
				aria-labelledby={ `${ modalId }Label` }
				aria-hidden="true"
				data-bs-backdrop={ staticBackdrop ? 'static' : undefined }
				data-bs-keyboard={ staticBackdrop ? 'false' : undefined }
			>
				<div className={ dialogClasses }>
					<div className="modal-content">
						<div className="modal-header">
							<h5
								className="modal-title"
								id={ `${ modalId }Label` }
							>
								{ modalTitle }
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label={ closeButtonText || 'Fechar' }
							></button>
						</div>
						<div className="modal-body">
							<RichText.Content
								tagName="div"
								value={ modalContent }
							/>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								{ closeButtonText || 'Fechar' }
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
