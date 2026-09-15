/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save component for periodic Quiz Engine
 * Outputs semantic Bootstrap 5 markup with serialized data-* attributes for frontend hydration
 */
export default function Save( { attributes } ) {
	const {
		quizTitle,
		quizDescription,
		mode,
		questions,
		showFeedback,
		timeLimit,
		passingScore,
		shuffleQuestions,
		themeColor,
	} = attributes;

	const configData = JSON.stringify( {
		mode,
		showFeedback,
		timeLimit,
		passingScore,
		shuffleQuestions,
		themeColor,
		quizTitle,
	} );

	const questionsData = JSON.stringify( questions );

	const blockProps = useBlockProps.save( {
		className: 'wp-block-periodic-quiz-engine',
		'data-quiz-config': configData,
		'data-quiz-questions': questionsData,
	} );

	const firstQuestion = questions && questions.length > 0 ? questions[ 0 ] : null;

	return (
		<div { ...blockProps }>
			<div className={ `quiz-engine-card card border-${ themeColor } shadow-sm` }>
				{ /* Card Header */ }
				<div className={ `card-header bg-${ themeColor } text-white d-flex justify-content-between align-items-center` }>
					<div>
						<RichText.Content tagName="h4" className="card-title mb-1 text-white" value={ quizTitle } />
						{ quizDescription && (
							<RichText.Content tagName="p" className="card-subtitle small opacity-75 mb-0" value={ quizDescription } />
						) }
					</div>
					{ timeLimit > 0 && (
						<span className="quiz-timer-badge badge bg-light text-dark shadow-sm">
							<i className="fa-regular fa-clock me-1"></i>
							<span className="timer-seconds">{ timeLimit }</span>s
						</span>
					) }
				</div>

				{ /* Card Body - Container hydrated by view.js */ }
				<div className="card-body quiz-interactive-area">
					{ /* Progress Bar */ }
					<div className="quiz-progress-wrapper">
						<div className="d-flex justify-content-between small text-muted mb-1">
							<span className="quiz-progress-label">
								Pergunta 1 de { questions ? questions.length : 1 }
							</span>
							{ mode !== 'survey' && firstQuestion && (
								<span className="quiz-points-label">
									<strong>{ firstQuestion.points || 10 }</strong> pontos
								</span>
							) }
						</div>
						<div className="progress">
							<div
								className={ `progress-bar bg-${ themeColor }` }
								role="progressbar"
								style={ { width: `${ ( 1 / ( questions ? questions.length : 1 ) ) * 100 }%` } }
								aria-valuenow={ 1 }
								aria-valuemin={ 0 }
								aria-valuemax={ questions ? questions.length : 1 }
							></div>
						</div>
					</div>

					{ /* Initial Question Fallback / SEO */ }
					{ firstQuestion && (
						<div className="quiz-question-container">
							<h5 className="quiz-question-title mb-3">
								<i className="fa-regular fa-circle-question me-2 text-primary"></i>
								{ firstQuestion.question }
							</h5>

							<div className="quiz-options-list list-group">
								{ firstQuestion.options.map( ( opt, idx ) => (
									<label key={ idx } className="quiz-option-item list-group-item list-group-item-action d-flex align-items-center">
										<input
											type={ mode === 'multiple' ? 'checkbox' : 'radio' }
											name="initial-quiz-opt"
											className="form-check-input me-3"
											value={ idx }
										/>
										<span className="option-text">{ opt }</span>
									</label>
								) ) }
							</div>
						</div>
					) }
				</div>

				{ /* Card Footer */ }
				<div className="card-footer d-flex justify-content-between align-items-center bg-light">
					<button type="button" className="btn btn-outline-secondary btn-sm quiz-btn-prev" disabled>
						<i className="fa-solid fa-arrow-left me-1"></i> Anterior
					</button>

					<button type="button" className={ `btn btn-${ themeColor } btn-sm quiz-btn-next` }>
						Próxima <i className="fa-solid fa-arrow-right ms-1"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
