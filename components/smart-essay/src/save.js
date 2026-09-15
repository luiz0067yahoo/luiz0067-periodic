/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Block Save Component.
 */
export default function save( { attributes } ) {
	const {
		promptInstructions,
		minWords,
		maxWords,
		passingPercentage,
		keywords,
	} = attributes;

	// Encapsulate evaluation settings securely in JSON string for view.js
	const configData = JSON.stringify( {
		minWords: Number( minWords ) || 50,
		maxWords: Number( maxWords ) || 500,
		passingPercentage: Number( passingPercentage ) || 70,
		keywords: Array.isArray( keywords ) ? keywords : [],
	} );

	const blockProps = useBlockProps.save( {
		className: 'periodic-smart-essay-container my-4',
	} );

	return (
		<div
			{ ...blockProps }
			data-smart-essay-config={ configData }
		>
			<div className="card shadow-sm border-0 smart-essay-card">
				{ /* Header */ }
				<div className="card-header bg-primary text-white d-flex flex-wrap justify-content-between align-items-center py-3 px-4">
					<div className="d-flex align-items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							className="bi bi-journal-check"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0"
							/>
							<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
							<path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
						</svg>
						<h5 className="mb-0 fw-bold essay-title">
							Redação &amp; Análise Automatizada
						</h5>
					</div>
					<div className="d-flex gap-2 align-items-center mt-2 mt-sm-0">
						<span className="badge bg-light text-primary fw-semibold px-3 py-2">
							Mínimo: <span className="min-words-val">{ minWords }</span> palavras
						</span>
						<span className="badge bg-info text-white fw-semibold px-3 py-2">
							Aprovação: { passingPercentage }%
						</span>
					</div>
				</div>

				{ /* Body */ }
				<div className="card-body p-4">
					{ /* Instructions WYSIWYG render */ }
					{ promptInstructions && (
						<div className="prompt-instructions-box p-3 mb-4 rounded-3 border bg-light">
							<h6 className="fw-bold text-primary mb-2 d-flex align-items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="currentColor"
									className="bi bi-info-circle-fill"
									viewBox="0 0 16 16"
								>
									<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
								</svg>
								Instruções e Diretrizes da Proposta:
							</h6>
							<div className="prompt-content text-secondary">
								<RichText.Content value={ promptInstructions } />
							</div>
						</div>
					) }

					{ /* Expandable Textarea */ }
					<div className="mb-3 position-relative">
						<label
							htmlFor="smart-essay-textarea"
							className="form-label fw-semibold text-dark d-flex justify-content-between align-items-center"
						>
							<span>Sua Redação:</span>
							<span className="text-muted small">
								Área expansível automaticamente
							</span>
						</label>
						<textarea
							id="smart-essay-textarea"
							className="form-control smart-essay-textarea"
							rows={ 6 }
							placeholder="Comece a redigir seu texto aqui. Desenvolva seus argumentos com clareza, abordando os pontos essenciais do tema..."
							style={ { minHeight: '160px', overflowY: 'hidden' } }
						></textarea>
					</div>

					{ /* Metrics Bar */ }
					<div className="essay-metrics-bar p-3 bg-light rounded-3 border mb-3">
						<div className="d-flex flex-wrap justify-content-between align-items-center mb-2 gap-2">
							<div className="d-flex align-items-center gap-3">
								<span className="badge bg-secondary word-count-badge fs-6 px-3 py-2">
									<span className="current-words">0</span> / { minWords } palavras
								</span>
								<span className="text-muted small char-count-text">
									<span className="current-chars">0</span> caracteres
								</span>
							</div>
							<div className="status-indicator-badge">
								<span className="badge bg-warning text-dark status-badge px-3 py-2">
									Abaixo do mínimo exigido
								</span>
							</div>
						</div>

						{ /* Progress Bar */ }
						<div className="progress" style={ { height: '10px' } }>
							<div
								className="progress-bar progress-bar-striped progress-bar-animated bg-warning essay-progress-bar"
								role="progressbar"
								style={ { width: '0%' } }
								aria-valuenow="0"
								aria-valuemin="0"
								aria-valuemax={ minWords }
							></div>
						</div>
					</div>

					{ /* Action Buttons */ }
					<div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
						<button
							type="button"
							className="btn btn-outline-secondary reset-essay-btn px-3"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-arrow-counterclockwise me-1"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
								/>
								<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
							</svg>
							Limpar
						</button>

						<button
							type="button"
							className="btn btn-primary submit-essay-btn px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								fill="currentColor"
								className="bi bi-send-check-fill"
								viewBox="0 0 16 16"
							>
								<path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 1.59-1.59 1.59a.5.5 0 0 0 .707.707l2.096-2.096 4.995 3.178a.5.5 0 0 0 .887-.082l.18-.452z" />
								<path d="M12.354 5.646a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4a.5.5 0 1 0-.708-.708L14 7.293z" />
							</svg>
							Submeter &amp; Analisar Redação
						</button>
					</div>

					{ /* Results & Feedback Section (Hydrated by view.js) */ }
					<div
						className="smart-essay-results mt-4 d-none"
						aria-live="polite"
					>
						{ /* Injected via view.js */ }
					</div>
				</div>

				{ /* Footer */ }
				<div className="card-footer bg-light px-4 py-3 d-flex flex-wrap justify-content-between align-items-center text-muted small">
					<span>
						<strong>Dica:</strong> A análise computa pontuação semântica, contagem de palavras e densidade lexical.
					</span>
					<span>
						Algoritmo de Avaliação Local Periodic
					</span>
				</div>
			</div>
		</div>
	);
}
