/**
 * Frontend script for periodic-text-completion
 * Vanilla JavaScript (no jQuery or React required)
 */

import { validateAnswer, normalizeText } from './utils';

( function () {
	function initTextCompletionBlocks() {
		const blocks = document.querySelectorAll( '.periodic-text-completion-wrapper' );
		if ( ! blocks.length ) return;

		blocks.forEach( ( block ) => {
			if ( block.dataset.initialized ) return;
			block.dataset.initialized = 'true';

			// Read configuration
			let config = {
				caseSensitive: false,
				acceptTypos: true,
				ignoreAccents: false,
				attempts: 3,
				totalGaps: 0,
			};

			try {
				if ( block.dataset.config ) {
					config = { ...config, ...JSON.parse( block.dataset.config ) };
				}
			} catch ( e ) {
				console.error( 'Error parsing text-completion config:', e );
			}

			const inputs = Array.from( block.querySelectorAll( '.text-completion-input' ) );
			const checkBtn = block.querySelector( '.btn-check-answers' );
			const retryBtn = block.querySelector( '.btn-retry' );
			const showAnswersBtn = block.querySelector( '.btn-show-answers' );
			const feedbackBanner = block.querySelector( '.feedback-banner' );
			const feedbackMsg = block.querySelector( '.feedback-message' );
			const solutionsBox = block.querySelector( '.solutions-box' );
			const solutionsList = block.querySelector( '.solutions-list' );
			const attemptsCountEl = block.querySelector( '.attempts-count' );
			const audioEl = block.querySelector( '.audio-element' );
			const rewindBtn = block.querySelector( '.btn-audio-rewind' );
			const speedBtn = block.querySelector( '.btn-audio-speed' );

			let remainingAttempts = config.attempts;

			// Handle Audio Player controls
			if ( audioEl ) {
				if ( rewindBtn ) {
					rewindBtn.addEventListener( 'click', () => {
						audioEl.currentTime = Math.max( 0, audioEl.currentTime - 5 );
						if ( audioEl.paused ) {
							audioEl.play().catch( () => {} );
						}
					} );
				}

				if ( speedBtn ) {
					const speeds = [ 1.0, 1.25, 1.5, 0.75 ];
					let currentSpeedIdx = 0;
					speedBtn.addEventListener( 'click', () => {
						currentSpeedIdx = ( currentSpeedIdx + 1 ) % speeds.length;
						const newSpeed = speeds[ currentSpeedIdx ];
						audioEl.playbackRate = newSpeed;
						speedBtn.textContent = `${ newSpeed }x`;
					} );
				}
			}

			// Allow pressing Enter in inputs to advance or submit
			inputs.forEach( ( input, idx ) => {
				input.addEventListener( 'keydown', ( evt ) => {
					if ( evt.key === 'Enter' ) {
						evt.preventDefault();
						if ( idx < inputs.length - 1 ) {
							inputs[ idx + 1 ].focus();
						} else if ( checkBtn && ! checkBtn.disabled ) {
							checkBtn.click();
						}
					}
				} );

				// Reset validation state when user types
				input.addEventListener( 'input', () => {
					input.classList.remove( 'is-valid', 'is-invalid' );
					input.removeAttribute( 'title' );
				} );
			} );

			// Build and display solutions list
			function populateSolutions() {
				if ( ! solutionsList ) return;
				solutionsList.innerHTML = '';
				const ol = document.createElement( 'ol' );
				ol.className = 'mb-0 ps-3';

				inputs.forEach( ( input, idx ) => {
					let answers = [];
					try {
						answers = JSON.parse( input.getAttribute( 'data-answers' ) || '[]' );
					} catch ( e ) {
						answers = [];
					}
					const li = document.createElement( 'li' );
					li.className = 'mb-1';
					li.innerHTML = `<strong>Lacuna ${ idx + 1 }:</strong> <span class="badge bg-primary-subtle text-primary border">${ answers.join( ' ou ' ) }</span>`;
					ol.appendChild( li );
				} );

				solutionsList.appendChild( ol );
			}

			// Check Answers logic
			function handleCheck() {
				let correctCount = 0;
				let hasEmpty = false;

				inputs.forEach( ( input ) => {
					const userVal = input.value.trim();
					let answers = [];
					try {
						answers = JSON.parse( input.getAttribute( 'data-answers' ) || '[]' );
					} catch ( e ) {
						answers = [];
					}

					if ( ! userVal ) {
						hasEmpty = true;
					}

					const result = validateAnswer( userVal, answers, config );

					if ( result.isValid ) {
						correctCount++;
						input.classList.remove( 'is-invalid' );
						input.classList.add( 'is-valid' );
						if ( result.isTypo ) {
							input.title = 'Correto (pequeno erro de digitação aceito)';
						} else {
							input.title = 'Correto!';
						}
					} else {
						input.classList.remove( 'is-valid' );
						input.classList.add( 'is-invalid' );
						input.title = 'Incorreto';
					}
				} );

				const total = inputs.length;
				const percent = Math.round( ( correctCount / total ) * 100 );
				const isAllCorrect = correctCount === total;

				// Decrement attempts if limited and not all correct
				if ( config.attempts > 0 && ! isAllCorrect ) {
					remainingAttempts--;
					if ( attemptsCountEl ) {
						attemptsCountEl.textContent = Math.max( 0, remainingAttempts );
					}
				}

				// Display Feedback
				if ( feedbackBanner && feedbackMsg ) {
					feedbackBanner.classList.remove( 'd-none', 'alert-success', 'alert-warning', 'alert-danger', 'alert-info' );

					if ( isAllCorrect ) {
						feedbackBanner.classList.add( 'alert-success' );
						feedbackMsg.innerHTML = `<i class="fa-solid fa-circle-check fs-4 text-success me-2"></i><div><strong>Parabéns!</strong> Você acertou todas as ${ total } lacunas! Pontuação: <strong>100%</strong></div>`;

						// Lock inputs
						inputs.forEach( ( inp ) => ( inp.disabled = true ) );
						if ( checkBtn ) checkBtn.classList.add( 'd-none' );
						if ( retryBtn ) retryBtn.classList.add( 'd-none' );
					} else if ( config.attempts > 0 && remainingAttempts <= 0 ) {
						// Attempts exhausted
						feedbackBanner.classList.add( 'alert-danger' );
						feedbackMsg.innerHTML = `<i class="fa-solid fa-circle-xmark fs-4 text-danger me-2"></i><div><strong>Tentativas esgotadas!</strong> Você acertou ${ correctCount } de ${ total } (${ percent }%). Confira o gabarito abaixo.</div>`;

						// Lock inputs & show solutions
						inputs.forEach( ( inp ) => {
							inp.disabled = true;
							// If incorrect, fill with correct answer
							if ( inp.classList.contains( 'is-invalid' ) ) {
								try {
									const ans = JSON.parse( inp.getAttribute( 'data-answers' ) || '[]' );
									inp.value = ans[ 0 ] || '';
								} catch ( e ) {}
							}
						} );

						if ( checkBtn ) checkBtn.classList.add( 'd-none' );
						if ( retryBtn ) retryBtn.classList.add( 'd-none' );

						populateSolutions();
						if ( solutionsBox ) solutionsBox.classList.remove( 'd-none' );
					} else {
						// Partial or wrong with remaining attempts
						feedbackBanner.classList.add( 'alert-warning' );
						const attemptsText = config.attempts > 0
							? `Você ainda tem <strong>${ remainingAttempts }</strong> tentativa(s).`
							: 'Você pode tentar quantas vezes quiser.';
						feedbackMsg.innerHTML = `<i class="fa-solid fa-triangle-exclamation fs-4 text-warning me-2"></i><div>Você acertou <strong>${ correctCount }</strong> de <strong>${ total }</strong> (${ percent }%). ${ attemptsText }</div>`;

						if ( retryBtn ) retryBtn.classList.remove( 'd-none' );
						if ( showAnswersBtn && config.attempts === 0 ) {
							showAnswersBtn.classList.remove( 'd-none' );
						}
					}
				}
			}

			// Handle Retry
			function handleRetry() {
				// Clear only invalid inputs so user doesn't have to re-type correct ones
				let firstInvalid = null;
				inputs.forEach( ( input ) => {
					if ( input.classList.contains( 'is-invalid' ) ) {
						input.value = '';
						input.classList.remove( 'is-invalid' );
						if ( ! firstInvalid ) firstInvalid = input;
					}
				} );

				if ( firstInvalid ) {
					firstInvalid.focus();
				}

				if ( feedbackBanner ) feedbackBanner.classList.add( 'd-none' );
				if ( retryBtn ) retryBtn.classList.add( 'd-none' );
				if ( checkBtn ) checkBtn.classList.remove( 'd-none' );
			}

			// Handle Show Answers
			function handleShowAnswers() {
				populateSolutions();
				if ( solutionsBox ) solutionsBox.classList.toggle( 'd-none' );
			}

			if ( checkBtn ) {
				checkBtn.addEventListener( 'click', handleCheck );
			}
			if ( retryBtn ) {
				retryBtn.addEventListener( 'click', handleRetry );
			}
			if ( showAnswersBtn ) {
				showAnswersBtn.addEventListener( 'click', handleShowAnswers );
			}
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initTextCompletionBlocks );
	} else {
		initTextCompletionBlocks();
	}
} )();
