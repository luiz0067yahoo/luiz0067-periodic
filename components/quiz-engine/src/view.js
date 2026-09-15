/**
 * periodic Quiz Engine - Frontend Vanilla JavaScript
 * Handles interactive quiz flow, answer validation, Bootstrap 5 progress updates,
 * timer management, and custom event dispatching.
 */

( function () {
	'use strict';

	/**
	 * Initialize a single quiz instance
	 * @param {HTMLElement} quizBlock
	 */
	function initQuizEngine( quizBlock ) {
		// Prevent double initialization
		if ( quizBlock.dataset.quizInitialized === 'true' ) {
			return;
		}
		quizBlock.dataset.quizInitialized = 'true';

		const configAttr = quizBlock.getAttribute( 'data-quiz-config' );
		const questionsAttr = quizBlock.getAttribute( 'data-quiz-questions' );

		if ( ! configAttr || ! questionsAttr ) {
			return;
		}

		let config = {};
		let originalQuestions = [];

		try {
			config = JSON.parse( configAttr );
			originalQuestions = JSON.parse( questionsAttr );
		} catch ( err ) {
			console.error( '[periodic-quiz-engine] Error parsing quiz data:', err );
			return;
		}

		if ( ! Array.isArray( originalQuestions ) || originalQuestions.length === 0 ) {
			return;
		}

		// Unique identifier for this quiz instance
		const quizId = quizBlock.id || 'quiz_' + Math.random().toString( 36 ).substr( 2, 9 );
		if ( ! quizBlock.id ) {
			quizBlock.id = quizId;
		}

		// State variables
		let questions = [ ...originalQuestions ];
		if ( config.shuffleQuestions ) {
			questions = questions.sort( () => Math.random() - 0.5 );
		}

		let currentIndex = 0;
		const userAnswers = {}; // questionIndex -> answer (number, array, or string)
		const questionReviewed = {}; // questionIndex -> boolean (feedback already triggered)
		let timerSeconds = parseInt( config.timeLimit, 10 ) || 0;
		let timerInterval = null;
		let isCompleted = false;

		// DOM references
		const interactiveArea = quizBlock.querySelector( '.quiz-interactive-area' );
		const timerBadge = quizBlock.querySelector( '.quiz-timer-badge' );
		const timerValueEl = quizBlock.querySelector( '.timer-seconds' );
		const cardFooter = quizBlock.querySelector( '.card-footer' );
		const themeColor = config.themeColor || 'primary';

		/**
		 * Helper to dispatch Custom DOM Events
		 */
		function emitQuizEvent( eventName, detail ) {
			const event = new CustomEvent( eventName, {
				bubbles: true,
				cancelable: true,
				detail: {
					quizId,
					quizTitle: config.quizTitle,
					mode: config.mode,
					timestamp: new Date().toISOString(),
					...detail,
				},
			} );
			quizBlock.dispatchEvent( event );
		}

		/**
		 * Start the countdown timer if configured
		 */
		function startTimer() {
			if ( timerSeconds <= 0 ) return;

			updateTimerDisplay( timerSeconds );

			timerInterval = setInterval( () => {
				timerSeconds--;
				updateTimerDisplay( timerSeconds );

				if ( timerSeconds <= 0 ) {
					clearInterval( timerInterval );
					handleTimeExpired();
				}
			}, 1000 );
		}

		function updateTimerDisplay( sec ) {
			if ( ! timerBadge || ! timerValueEl ) return;
			timerValueEl.textContent = sec;

			if ( sec <= 5 ) {
				timerBadge.className = 'quiz-timer-badge badge bg-danger text-white shadow-sm timer-danger';
			} else if ( sec <= 15 ) {
				timerBadge.className = 'quiz-timer-badge badge bg-warning text-dark shadow-sm timer-warning';
			} else {
				timerBadge.className = 'quiz-timer-badge badge bg-light text-dark shadow-sm';
			}
		}

		function handleTimeExpired() {
			alert( 'Tempo esgotado para responder ao quiz!' );
			finishQuiz( true );
		}

		/**
		 * Check if an answer is correct for a specific question
		 */
		function isAnswerCorrect( qIndex ) {
			const q = questions[ qIndex ];
			const answer = userAnswers[ qIndex ];
			if ( answer === undefined || answer === null ) return false;

			if ( config.mode === 'multiple' ) {
				const expected = Array.isArray( q.correctIndices ) ? q.correctIndices.sort() : [];
				const actual = Array.isArray( answer ) ? [ ...answer ].sort() : [];
				if ( expected.length !== actual.length ) return false;
				return expected.every( ( val, idx ) => val === actual[ idx ] );
			}

			if ( config.mode === 'arithmetic' ) {
				if ( typeof q.correctIndex === 'number' ) {
					return answer === q.correctIndex;
				}
				// If text response in arithmetic mode
				return String( answer ).trim() === String( q.options[ q.correctIndex ] || '' ).trim();
			}

			// Single choice and true-false
			return answer === q.correctIndex;
		}

		/**
		 * Render the active question in the interactive area
		 */
		function renderCurrentQuestion() {
			if ( isCompleted ) return;

			const q = questions[ currentIndex ];
			const total = questions.length;
			const progressPercent = Math.round( ( ( currentIndex + 1 ) / total ) * 100 );
			const isAnswered = userAnswers[ currentIndex ] !== undefined;
			const showImmediate = config.showFeedback && isAnswered && config.mode !== 'survey';

			let html = `
				<div class="quiz-progress-wrapper">
					<div class="d-flex justify-content-between small text-muted mb-1">
						<span class="quiz-progress-label">Pergunta ${ currentIndex + 1 } de ${ total }</span>
						${ config.mode !== 'survey' ? `<span class="quiz-points-label"><strong>${ q.points || 10 }</strong> pontos</span>` : '' }
					</div>
					<div class="progress">
						<div
							class="progress-bar bg-${ themeColor }"
							role="progressbar"
							style="width: ${ progressPercent }%"
							aria-valuenow="${ currentIndex + 1 }"
							aria-valuemin="1"
							aria-valuemax="${ total }"
						></div>
					</div>
				</div>

				<div class="quiz-question-container">
					<h5 class="quiz-question-title mb-3">
						<i class="fa-regular fa-circle-question me-2 text-${ themeColor }"></i>
						${ q.question }
					</h5>

					<div class="quiz-options-list">
			`;

			// Render options based on mode
			q.options.forEach( ( optionText, optIdx ) => {
				let isSelected = false;
				if ( config.mode === 'multiple' ) {
					isSelected = Array.isArray( userAnswers[ currentIndex ] ) && userAnswers[ currentIndex ].includes( optIdx );
				} else {
					isSelected = userAnswers[ currentIndex ] === optIdx;
				}

				let feedbackClass = '';
				let feedbackIcon = '';

				if ( showImmediate ) {
					const isCorrectOpt = config.mode === 'multiple'
						? ( q.correctIndices || [] ).includes( optIdx )
						: q.correctIndex === optIdx;

					if ( isCorrectOpt ) {
						feedbackClass = 'is-correct';
						feedbackIcon = '<i class="fa-solid fa-circle-check option-feedback-icon text-success"></i>';
					} else if ( isSelected ) {
						feedbackClass = 'is-incorrect';
						feedbackIcon = '<i class="fa-solid fa-circle-xmark option-feedback-icon text-danger"></i>';
					}
				}

				const inputType = config.mode === 'multiple' ? 'checkbox' : 'radio';

				html += `
					<div
						class="quiz-option-item ${ isSelected ? 'selected' : '' } ${ feedbackClass }"
						data-opt-index="${ optIdx }"
					>
						<input
							type="${ inputType }"
							class="form-check-input"
							name="quiz_q_${ currentIndex }"
							value="${ optIdx }"
							${ isSelected ? 'checked' : '' }
							${ showImmediate ? 'disabled' : '' }
						/>
						<span class="option-text">${ optionText }</span>
						${ feedbackIcon }
					</div>
				`;
			} );

			html += `</div>`; // .quiz-options-list

			// Show explanation if configured
			if ( showImmediate && q.explanation ) {
				const correct = isAnswerCorrect( currentIndex );
				html += `
					<div class="quiz-explanation-alert alert ${ correct ? 'alert-success' : 'alert-danger' } d-flex align-items-start gap-2">
						<i class="fa-solid ${ correct ? 'fa-circle-check' : 'fa-circle-info' } fs-5 mt-1"></i>
						<div>
							<strong>${ correct ? 'Parabéns, você acertou!' : 'Ops, resposta incorreta!' }</strong>
							<p class="mb-0 mt-1 small">${ q.explanation }</p>
						</div>
					</div>
				`;
			}

			html += `</div>`; // .quiz-question-container

			interactiveArea.innerHTML = html;

			// Attach option click listeners
			const optionItems = interactiveArea.querySelectorAll( '.quiz-option-item' );
			optionItems.forEach( ( item ) => {
				item.addEventListener( 'click', function ( e ) {
					// Ignore if already showing feedback and disabled
					if ( showImmediate ) return;

					const optIdx = parseInt( this.dataset.optIndex, 10 );
					handleOptionSelect( optIdx );
				} );
			} );

			// Update Footer navigation buttons
			renderFooterButtons();
		}

		/**
		 * Handle selecting an option
		 */
		function handleOptionSelect( optIdx ) {
			if ( config.mode === 'multiple' ) {
				const current = userAnswers[ currentIndex ] || [];
				if ( current.includes( optIdx ) ) {
					userAnswers[ currentIndex ] = current.filter( ( i ) => i !== optIdx );
				} else {
					userAnswers[ currentIndex ] = [ ...current, optIdx ];
				}
			} else {
				userAnswers[ currentIndex ] = optIdx;
			}

			// Emit answered event
			const correct = isAnswerCorrect( currentIndex );
			const q = questions[ currentIndex ];
			const pointsEarned = correct ? ( q.points || 10 ) : 0;

			emitQuizEvent( 'quiz:answered', {
				questionIndex: currentIndex,
				questionId: q.id,
				selectedAnswers: userAnswers[ currentIndex ],
				isCorrect: correct,
				pointsEarned: config.mode === 'survey' ? 0 : pointsEarned,
			} );

			// Re-render to update selected state or feedback
			renderCurrentQuestion();
		}

		/**
		 * Render navigation buttons in card footer
		 */
		function renderFooterButtons() {
			if ( ! cardFooter ) return;

			const isFirst = currentIndex === 0;
			const isLast = currentIndex === questions.length - 1;
			const hasAnswered = userAnswers[ currentIndex ] !== undefined;

			cardFooter.innerHTML = `
				<button type="button" class="btn btn-outline-secondary btn-sm quiz-btn-prev" ${ isFirst ? 'disabled' : '' }>
					<i class="fa-solid fa-arrow-left me-1"></i> Anterior
				</button>
				<div>
					<span class="small text-muted me-3">
						${ Object.keys( userAnswers ).length } de ${ questions.length } respondidas
					</span>
					${
						isLast
							? `<button type="button" class="btn btn-${ themeColor } btn-sm quiz-btn-finish">
								<i class="fa-solid fa-flag-checkered me-1"></i> Finalizar Quiz
							</button>`
							: `<button type="button" class="btn btn-${ themeColor } btn-sm quiz-btn-next">
								Próxima <i class="fa-solid fa-arrow-right ms-1"></i>
							</button>`
					}
				</div>
			`;

			const prevBtn = cardFooter.querySelector( '.quiz-btn-prev' );
			if ( prevBtn ) {
				prevBtn.addEventListener( 'click', () => {
					if ( currentIndex > 0 ) {
						currentIndex--;
						renderCurrentQuestion();
					}
				} );
			}

			const nextBtn = cardFooter.querySelector( '.quiz-btn-next' );
			if ( nextBtn ) {
				nextBtn.addEventListener( 'click', () => {
					if ( currentIndex < questions.length - 1 ) {
						currentIndex++;
						renderCurrentQuestion();
					}
				} );
			}

			const finishBtn = cardFooter.querySelector( '.quiz-btn-finish' );
			if ( finishBtn ) {
				finishBtn.addEventListener( 'click', () => {
					finishQuiz();
				} );
			}
		}

		/**
		 * Finish quiz and display results screen
		 */
		function finishQuiz( timeExpired = false ) {
			if ( timerInterval ) {
				clearInterval( timerInterval );
			}
			isCompleted = true;

			// Calculate final score
			let totalEarned = 0;
			let maxPoints = 0;
			let correctCount = 0;

			questions.forEach( ( q, idx ) => {
				const qPoints = q.points || 10;
				maxPoints += qPoints;
				if ( isAnswerCorrect( idx ) ) {
					totalEarned += qPoints;
					correctCount++;
				}
			} );

			const percentage = maxPoints > 0 ? Math.round( ( totalEarned / maxPoints ) * 100 ) : 0;
			const passing = parseInt( config.passingScore, 10 ) || 70;
			const isPassed = percentage >= passing;

			// Hide timer badge in header
			if ( timerBadge ) {
				timerBadge.style.display = 'none';
			}

			// Render results view
			let resultsHtml = `
				<div class="quiz-results-card">
			`;

			if ( config.mode === 'survey' ) {
				resultsHtml += `
					<i class="fa-solid fa-heart results-icon text-primary"></i>
					<h3>Obrigado por responder!</h3>
					<p class="text-muted">Suas respostas foram registradas com sucesso.</p>
				`;
			} else {
				resultsHtml += `
					<i class="fa-solid ${ isPassed ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger' } results-icon"></i>
					<h3 class="mb-1">${ isPassed ? 'Parabéns, você foi aprovado!' : 'Que pena! Você não atingiu a pontuação mínima.' }</h3>
					<div class="results-score-badge text-${ isPassed ? 'success' : 'danger' }">
						${ percentage }%
					</div>
					<p class="text-muted mb-3">
						Você acertou <strong>${ correctCount }</strong> de <strong>${ questions.length }</strong> perguntas (${ totalEarned } de ${ maxPoints } pontos).
						<br>Nota de corte para aprovação: <strong>${ passing }%</strong>.
					</p>

					<div class="progress mb-4" style="height: 12px; max-width: 450px; margin: 0 auto;">
						<div
							class="progress-bar bg-${ isPassed ? 'success' : 'danger' }"
							role="progressbar"
							style="width: ${ percentage }%"
							aria-valuenow="${ percentage }"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
				`;
			}

			// Questions review summary
			resultsHtml += `
				<div class="results-summary-list list-group shadow-sm text-start mb-4">
			`;

			questions.forEach( ( q, idx ) => {
				const correct = isAnswerCorrect( idx );
				const userAns = userAnswers[ idx ];
				let answerLabel = 'Não respondida';

				if ( userAns !== undefined ) {
					if ( config.mode === 'multiple' && Array.isArray( userAns ) ) {
						answerLabel = userAns.map( ( i ) => q.options[ i ] ).join( ', ' );
					} else {
						answerLabel = q.options[ userAns ] || 'Opção selecionada';
					}
				}

				resultsHtml += `
					<div class="list-group-item">
						<div class="d-flex justify-content-between align-items-center">
							<span><strong>#${ idx + 1 }:</strong> ${ q.question }</span>
							${
								config.mode !== 'survey'
									? `<span class="badge bg-${ correct ? 'success' : 'danger' }">
										<i class="fa-solid ${ correct ? 'fa-check' : 'fa-xmark' } me-1"></i>
										${ correct ? 'Correto' : 'Incorreto' }
									</span>`
									: ''
							}
						</div>
						<div class="small text-muted mt-1">
							Sua resposta: <em>${ answerLabel }</em>
						</div>
						${
							! correct && config.mode !== 'survey' && q.explanation
								? `<div class="small text-info mt-1"><i class="fa-solid fa-lightbulb me-1"></i> ${ q.explanation }</div>`
								: ''
						}
					</div>
				`;
			} );

			resultsHtml += `
					</div>
				</div>
			`;

			interactiveArea.innerHTML = resultsHtml;

			// Footer with retry button
			cardFooter.innerHTML = `
				<button type="button" class="btn btn-outline-primary btn-sm quiz-btn-retry">
					<i class="fa-solid fa-rotate-right me-1"></i> Refazer Quiz
				</button>
				<span class="small text-muted">
					Quiz concluído em ${ new Date().toLocaleTimeString() }
				</span>
			`;

			const retryBtn = cardFooter.querySelector( '.quiz-btn-retry' );
			if ( retryBtn ) {
				retryBtn.addEventListener( 'click', () => {
					resetQuiz();
				} );
			}

			// Emit completed event
			emitQuizEvent( 'quiz:completed', {
				totalScore: totalEarned,
				maxScore: maxPoints,
				percentage,
				passed: isPassed,
				totalQuestions: questions.length,
				correctCount,
				timeExpired,
			} );
		}

		/**
		 * Reset the quiz to start fresh
		 */
		function resetQuiz() {
			isCompleted = false;
			currentIndex = 0;
			for ( const key in userAnswers ) {
				delete userAnswers[ key ];
			}
			timerSeconds = parseInt( config.timeLimit, 10 ) || 0;

			if ( config.shuffleQuestions ) {
				questions = [ ...originalQuestions ].sort( () => Math.random() - 0.5 );
			}

			if ( timerBadge && timerSeconds > 0 ) {
				timerBadge.style.display = 'inline-flex';
				startTimer();
			}

			emitQuizEvent( 'quiz:reset', {} );
			renderCurrentQuestion();
		}

		// Initial start
		emitQuizEvent( 'quiz:started', {
			totalQuestions: questions.length,
		} );

		renderCurrentQuestion();
		startTimer();
	}

	// Auto initialize all quizzes on page load
	function initAllQuizzes() {
		const quizBlocks = document.querySelectorAll( '.wp-block-periodic-quiz-engine' );
		quizBlocks.forEach( initQuizEngine );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAllQuizzes );
	} else {
		initAllQuizzes();
	}
} )();
