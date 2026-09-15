/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Block Save Component.
 */
export default function save( { attributes } ) {
	const {
		templateType = 'cornell',
		documentTitle = 'Anotações e Escrita Estruturada',
		documentSubtitle = 'Organize suas ideias, produza seu texto guiado e exporte o resultado final em PDF.',
		allowPrintPdf = true,
		allowCopy = true,
		allowClearDraft = true,
		showWordCount = true,
		sections = [],
	} = attributes;

	// Encapsulate block settings into JSON string for view.js
	const configData = JSON.stringify( {
		templateType,
		documentTitle,
		documentSubtitle,
		allowPrintPdf,
		allowCopy,
		allowClearDraft,
		showWordCount,
		sections,
	} );

	const blockProps = useBlockProps.save( {
		className: 'periodic-structured-writing-container my-4',
	} );

	return (
		<div
			{ ...blockProps }
			data-structured-writing-config={ configData }
		>
			<div className="card shadow-sm border-0 structured-writing-card">
				{ /* Header */ }
				<div className="card-header structured-writing-header text-white p-4">
					<div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
						<span className="badge bg-light text-primary fw-semibold px-3 py-1 text-uppercase template-type-badge">
							{ templateType === 'cornell' && 'Notas Cornell' }
							{ templateType === 'step-by-step' && 'Escrita Passo a Passo' }
							{ templateType === 'report-doc' && 'Relatório Técnico' }
						</span>
						<span className="autosave-status text-white-50">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-cloud-check me-1" viewBox="0 0 16 16">
								<path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
								<path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
							</svg>
							<span className="autosave-text">Salvamento local ativado</span>
						</span>
					</div>

					<h4 className="mb-1 text-white fw-bold document-title">{ documentTitle }</h4>
					{ documentSubtitle && (
						<p className="mb-0 text-white-50 small document-subtitle">{ documentSubtitle }</p>
					) }
				</div>

				{ /* Body */ }
				<div className="card-body p-4">
					{ /* Nav tabs if step-by-step */ }
					{ templateType === 'step-by-step' && (
						<ul className="nav nav-pills mb-4 flex-wrap gap-2 writing-nav-tabs" role="tablist">
							{ sections.map( ( sec, idx ) => (
								<li key={ sec.id || idx } className="nav-item" role="presentation">
									<button
										type="button"
										className={ `nav-link ${ idx === 0 ? 'active' : '' }` }
										data-section-index={ idx }
										role="tab"
										aria-selected={ idx === 0 ? 'true' : 'false' }
									>
										<span className="badge-step">{ idx + 1 }</span>
										{ sec.title }
									</button>
								</li>
							) ) }
						</ul>
					) }

					{ /* Sections grid */ }
					<div className={ `row g-4 ${ templateType === 'cornell' ? 'cornell-row' : '' }` }>
						{ sections.map( ( sec, idx ) => {
							let colClass = sec.colSpan || 'col-12';
							if ( templateType === 'cornell' ) {
								colClass = idx === 0 ? 'col-md-4 cornell-cues-col' : ( idx === 1 ? 'col-md-8 cornell-notes-col' : 'col-12 cornell-summary-col' );
							} else if ( templateType === 'report-doc' ) {
								colClass = sec.colSpan || ( idx < 2 ? 'col-md-6' : 'col-12' );
							}

							const isStep = templateType === 'step-by-step';
							const stepHiddenClass = isStep && idx !== 0 ? 'd-none' : '';

							return (
								<div
									key={ sec.id || idx }
									className={ `${ colClass } section-wrapper ${ stepHiddenClass }` }
									data-section-index={ idx }
								>
									<div className={ `p-3 structured-section-box h-100 ${ idx === 2 && templateType === 'cornell' ? 'cornell-summary-box' : '' }` }>
										<div className="d-flex justify-content-between align-items-center mb-2">
											<h6 className="fw-bold text-primary mb-0 section-header-title">
												{ sec.title }
											</h6>
											{ showWordCount && (
												<span className="badge bg-secondary-subtle text-secondary small section-counter">
													<span className="section-words">0</span> palavras
												</span>
											) }
										</div>

										{ sec.promptGuidance && (
											<div className="section-guidance-callout mb-3">
												<div className="d-flex align-items-start gap-2">
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightbulb-fill text-primary flex-shrink-0 mt-1" viewBox="0 0 16 16">
														<path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15.5a.5.5 0 0 1-.5-.5"/>
													</svg>
													<div>
														<strong className="text-dark">Dica / Orientação: </strong>
														<span>{ sec.promptGuidance }</span>
													</div>
												</div>
											</div>
										) }

										<textarea
											id={ `structured-field-${ idx }` }
											name={ `section_${ idx }` }
											className="form-control structured-textarea"
											rows={ colClass.includes( 'col-12' ) ? 4 : 8 }
											placeholder={ sec.placeholder }
											data-section-id={ sec.id || `sec_${ idx }` }
											aria-label={ sec.title }
										/>
										{ /* Print view helper */ }
										<div className="print-content-view d-none"></div>
									</div>
								</div>
							);
						} ) }
					</div>

					{ /* Step Navigation Buttons (for step-by-step mode) */ }
					{ templateType === 'step-by-step' && sections.length > 1 && (
						<div className="d-flex justify-content-between align-items-center mt-3 pt-2 step-nav-controls">
							<button type="button" className="btn btn-outline-secondary btn-prev-step" disabled>
								&larr; Etapa Anterior
							</button>
							<span className="small text-muted current-step-indicator">
								Etapa 1 de { sections.length }
							</span>
							<button type="button" className="btn btn-primary btn-next-step">
								Próxima Etapa &rarr;
							</button>
						</div>
					) }

					{ /* Action Toolbar */ }
					<div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4 pt-3 border-top structured-writing-actions">
						<div className="d-flex align-items-center gap-2">
							{ allowClearDraft && (
								<button
									type="button"
									className="btn btn-outline-secondary btn-sm btn-clear-draft d-flex align-items-center gap-1"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
										<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
										<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
									</svg>
									<span>Limpar Rascunho</span>
								</button>
							) }
							{ showWordCount && (
								<span className="text-muted small word-counter-badge ms-2">
									Total: <strong className="total-words">0</strong> palavras (<span className="total-chars">0</span> caracteres)
								</span>
							) }
						</div>

						<div className="d-flex align-items-center gap-2">
							{ allowCopy && (
								<button
									type="button"
									className="btn btn-outline-primary btn-sm btn-copy-formatted d-flex align-items-center gap-1"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
										<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
										<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
									</svg>
									<span>Copiar Formatado</span>
								</button>
							) }
							{ allowPrintPdf && (
								<button
									type="button"
									className="btn btn-primary btn-sm btn-print-pdf d-flex align-items-center gap-1 shadow-sm"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-printer-fill" viewBox="0 0 16 16">
										<path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1"/>
										<path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
									</svg>
									<span>Imprimir / PDF</span>
								</button>
							) }
						</div>
					</div>
				</div>

				<div className="card-footer bg-light px-4 py-2 text-muted small d-flex flex-wrap justify-content-between align-items-center">
					<span>Suas anotações são salvas continuamente no seu navegador.</span>
					<span>Periodic Structured Writing</span>
				</div>
			</div>
		</div>
	);
}
