/**
 * Periodic Smart Essay - Frontend View Script
 * Pure Vanilla JavaScript (No jQuery or external dependencies)
 */

( function () {
	'use strict';

	/**
	 * Common stop words for lexical density calculation
	 * (supports Portuguese, English, Spanish, Italian)
	 */
	const STOP_WORDS = new Set( [
		// Portuguese
		'de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'é', 'com', 'não', 'uma', 'os', 'no',
		'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'foi', 'ao', 'ele', 'das', 'tem', 'à', 'seu',
		'sua', 'ou', 'ser', 'quando', 'muito', 'há', 'nos', 'já', 'está', 'eu', 'também', 'só', 'pelo', 'pela',
		'até', 'isso', 'ela', 'entre', 'era', 'depois', 'sem', 'mesmo', 'aos', 'ter', 'seus', 'quem', 'nas',
		'me', 'esse', 'eles', 'estão', 'você', 'tinha', 'foram', 'essa', 'num', 'nem', 'suas', 'meu', 'às',
		'minha', 'têm', 'numa', 'pelos', 'elas', 'havia', 'seja', 'qual', 'será', 'nós', 'tenho', 'lhe', 'deles',
		'essas', 'esses', 'pelas', 'este', 'fosse', 'dele', 'tu', 'te', 'vocês', 'vos', 'lhes', 'meus', 'minhas',
		// English
		'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he',
		'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
		'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
		// Spanish
		'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no',
		'una', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'sí', 'porque', 'esta',
		// Italian
		'di', 'e', 'il', 'la', 'che', 'in', 'a', 'per', 'un', 'del', 'non', 'una', 'si', 'le', 'lo', 'da',
		'con', 'al', 'della', 'dei', 'delle', 'nel', 'anche', 'ma', 'ci', 'su', 'tra', 'fra', 'lui', 'lei'
	] );

	/**
	 * Normalize string: lowercase, remove accents/diacritics, strip punctuation
	 * @param {string} str
	 * @return {string}
	 */
	function normalizeText( str ) {
		if ( ! str ) return '';
		return str
			.toLowerCase()
			.normalize( 'NFD' )
			.replace( /[\u0300-\u036f]/g, '' )
			.replace( /[^\w\s]/g, ' ' )
			.replace( /\s+/g, ' ' )
			.trim();
	}

	/**
	 * Tokenize text into words
	 * @param {string} text
	 * @return {string[]}
	 */
	function getWords( text ) {
		if ( ! text || ! text.trim() ) return [];
		return text
			.trim()
			.split( /\s+/ )
			.filter( ( w ) => w.length > 0 );
	}

	/**
	 * Compute Lexical Density
	 * Formula: (Number of Lexical/Content Words / Total Words) * 100
	 * Content words = words not in STOP_WORDS
	 * @param {string[]} words
	 * @return {number} Percentage from 0 to 100
	 */
	function calculateLexicalDensity( words ) {
		if ( words.length === 0 ) return 0;

		let contentWordCount = 0;
		words.forEach( ( word ) => {
			const clean = normalizeText( word );
			if ( clean && ! STOP_WORDS.has( clean ) ) {
				contentWordCount++;
			}
		} );

		return Math.round( ( contentWordCount / words.length ) * 100 );
	}

	/**
	 * Check if a term or phrase exists in normalized text
	 * Supports multi-word expressions and word-boundary safety
	 * @param {string} fullNormalizedText
	 * @param {string} candidate
	 * @return {boolean}
	 */
	function matchesCandidate( fullNormalizedText, candidate ) {
		const normCand = normalizeText( candidate );
		if ( ! normCand ) return false;

		// Escape regex special chars
		const escaped = normCand.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
		const regex = new RegExp( '(?:^|\\s)' + escaped + '(?=\\s|$)', 'i' );
		return regex.test( fullNormalizedText );
	}

	/**
	 * Initialize a Smart Essay block instance
	 * @param {HTMLElement} container
	 */
	function initSmartEssayInstance( container ) {
		let config = {};
		try {
			const rawConfig = container.getAttribute( 'data-smart-essay-config' );
			if ( rawConfig ) {
				config = JSON.parse( rawConfig );
			}
		} catch ( err ) {
			console.error( 'Error parsing smart essay config:', err );
			return;
		}

		const minWords = Number( config.minWords ) || 50;
		const maxWords = Number( config.maxWords ) || 500;
		const passingPercentage = Number( config.passingPercentage ) || 70;
		const keywords = Array.isArray( config.keywords ) ? config.keywords : [];

		// DOM Elements
		const textarea = container.querySelector( '.smart-essay-textarea' );
		const currentWordsEl = container.querySelector( '.current-words' );
		const currentCharsEl = container.querySelector( '.current-chars' );
		const wordCountBadge = container.querySelector( '.word-count-badge' );
		const statusBadge = container.querySelector( '.status-badge' );
		const progressBar = container.querySelector( '.essay-progress-bar' );
		const submitBtn = container.querySelector( '.submit-essay-btn' );
		const resetBtn = container.querySelector( '.reset-essay-btn' );
		const resultsContainer = container.querySelector( '.smart-essay-results' );

		if ( ! textarea ) return;

		/**
		 * Auto-resize textarea according to content
		 */
		function autoResize() {
			textarea.style.height = 'auto';
			textarea.style.height = Math.max( 160, textarea.scrollHeight ) + 'px';
		}

		/**
		 * Update word counts, character counts, and progress bar
		 */
		function updateLiveMetrics() {
			const text = textarea.value;
			const words = getWords( text );
			const wordCount = words.length;
			const charCount = text.length;

			if ( currentWordsEl ) currentWordsEl.textContent = wordCount;
			if ( currentCharsEl ) currentCharsEl.textContent = charCount;

			// Progress percentage towards minWords
			const percentOfMin = Math.min( 100, Math.round( ( wordCount / minWords ) * 100 ) );

			if ( progressBar ) {
				progressBar.style.width = percentOfMin + '%';
				progressBar.setAttribute( 'aria-valuenow', wordCount );
			}

			// Update visual status indicators
			if ( wordCount < minWords ) {
				if ( wordCountBadge ) {
					wordCountBadge.className = 'badge bg-warning text-dark word-count-badge fs-6 px-3 py-2';
				}
				if ( statusBadge ) {
					statusBadge.className = 'badge bg-warning text-dark status-badge px-3 py-2';
					statusBadge.textContent = `Abaixo do mínimo (${ wordCount } / ${ minWords })`;
				}
				if ( progressBar ) {
					progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-warning essay-progress-bar';
				}
			} else if ( maxWords && wordCount > maxWords ) {
				if ( wordCountBadge ) {
					wordCountBadge.className = 'badge bg-info text-white word-count-badge fs-6 px-3 py-2';
				}
				if ( statusBadge ) {
					statusBadge.className = 'badge bg-info text-white status-badge px-3 py-2';
					statusBadge.textContent = `Acima do sugerido (${ wordCount } / ${ maxWords })`;
				}
				if ( progressBar ) {
					progressBar.className = 'progress-bar bg-info essay-progress-bar';
				}
			} else {
				if ( wordCountBadge ) {
					wordCountBadge.className = 'badge bg-success text-white word-count-badge fs-6 px-3 py-2';
				}
				if ( statusBadge ) {
					statusBadge.className = 'badge bg-success text-white status-badge px-3 py-2';
					statusBadge.textContent = `Extensão ideal (${ wordCount } palavras)`;
				}
				if ( progressBar ) {
					progressBar.className = 'progress-bar bg-success essay-progress-bar';
				}
			}
		}

		// Textarea input event
		textarea.addEventListener( 'input', function () {
			autoResize();
			updateLiveMetrics();
		} );

		// Reset action
		if ( resetBtn ) {
			resetBtn.addEventListener( 'click', function () {
				if ( textarea.value.trim() && ! window.confirm( 'Deseja realmente limpar todo o texto digitado?' ) ) {
					return;
				}
				textarea.value = '';
				autoResize();
				updateLiveMetrics();
				if ( resultsContainer ) {
					resultsContainer.classList.add( 'd-none' );
					resultsContainer.innerHTML = '';
				}
				textarea.focus();
			} );
		}

		/**
		 * Execute essay submission analysis
		 */
		function analyzeEssay() {
			const rawText = textarea.value.trim();
			const words = getWords( rawText );
			const wordCount = words.length;

			if ( wordCount === 0 ) {
				alert( 'Por favor, digite sua redação antes de solicitar a análise.' );
				textarea.focus();
				return;
			}

			const normalizedText = normalizeText( rawText );
			const lexicalDensity = calculateLexicalDensity( words );

			// Analyze keywords and compute scores
			let earnedWeight = 0;
			let totalWeight = 0;
			const keywordResults = [];

			keywords.forEach( ( item ) => {
				const itemWeight = Number( item.weight ) || 0;
				totalWeight += itemWeight;

				const candidates = [];
				if ( item.term && item.term.trim() ) {
					candidates.push( { term: item.term.trim(), isPrimary: true } );
				}
				if ( item.synonyms && typeof item.synonyms === 'string' ) {
					item.synonyms
						.split( ',' )
						.map( ( s ) => s.trim() )
						.filter( Boolean )
						.forEach( ( syn ) => {
							candidates.push( { term: syn, isPrimary: false } );
						} );
				}

				let matched = false;
				let matchedTerm = '';

				for ( const cand of candidates ) {
					if ( matchesCandidate( normalizedText, cand.term ) ) {
						matched = true;
						matchedTerm = cand.term;
						break;
					}
				}

				if ( matched ) {
					earnedWeight += itemWeight;
				}

				keywordResults.push( {
					originalTerm: item.term,
					weight: itemWeight,
					feedback: item.feedback,
					matched: matched,
					matchedTerm: matchedTerm,
				} );
			} );

			// Base score percentage
			let rawPercentage = 0;
			if ( totalWeight > 0 ) {
				rawPercentage = ( earnedWeight / totalWeight ) * 100;
			} else {
				rawPercentage = 100;
			}

			// Length requirement penalty: If below minWords, scale proportionally
			let finalScore = rawPercentage;
			let lengthPenaltyMessage = '';
			if ( wordCount < minWords ) {
				const lengthRatio = wordCount / minWords;
				finalScore = Math.round( rawPercentage * lengthRatio );
				lengthPenaltyMessage = `Nota ajustada devido à extensão abaixo do mínimo (${ wordCount } / ${ minWords } palavras).`;
			} else {
				finalScore = Math.round( rawPercentage );
			}

			const isPassed = finalScore >= passingPercentage;

			renderResults( {
				isPassed,
				finalScore,
				passingPercentage,
				wordCount,
				minWords,
				maxWords,
				lexicalDensity,
				earnedWeight,
				totalWeight,
				keywordResults,
				lengthPenaltyMessage,
			} );
		}

		/**
		 * Render detailed interactive analysis report
		 */
		function renderResults( data ) {
			if ( ! resultsContainer ) return;

			const {
				isPassed,
				finalScore,
				passingPercentage,
				wordCount,
				minWords,
				maxWords,
				lexicalDensity,
				earnedWeight,
				totalWeight,
				keywordResults,
				lengthPenaltyMessage,
			} = data;

			const alertTheme = isPassed ? 'success' : 'danger';
			const alertTitle = isPassed
				? 'Parabéns! Sua redação atingiu os critérios de aprovação!'
				: 'Atenção: Sua redação não atingiu a pontuação mínima necessária.';

			const coveredCount = keywordResults.filter( ( k ) => k.matched ).length;
			const totalCriteria = keywordResults.length;

			let criteriaRowsHtml = '';
			keywordResults.forEach( ( k ) => {
				const statusBadge = k.matched
					? '<span class="badge bg-success"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-check-circle-fill me-1" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>Abordado</span>'
					: '<span class="badge bg-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-x-circle-fill me-1" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>Não Identificado</span>';

				const pointsBadge = k.matched
					? `<span class="fw-bold text-success">+${ k.weight } pts</span>`
					: `<span class="text-muted">0 / ${ k.weight } pts</span>`;

				const matchDetail = k.matched
					? `<span class="text-success small d-block">Identificado termo ou variação: "<em>${ escapeHtml( k.matchedTerm ) }</em>"</span>`
					: '';

				const feedbackBox = k.feedback
					? `<div class="p-2 mt-2 rounded bg-light border-start border-3 ${ k.matched ? 'border-success' : 'border-warning' } small text-secondary"><strong>Feedback do Professor:</strong> ${ escapeHtml( k.feedback ) }</div>`
					: '';

				criteriaRowsHtml += `
					<div class="list-group-item list-group-item-action p-3">
						<div class="d-flex w-100 justify-content-between align-items-center mb-1">
							<h6 class="mb-0 fw-bold text-dark">${ escapeHtml( k.originalTerm ) }</h6>
							<div class="d-flex align-items-center gap-2">
								${ statusBadge }
								${ pointsBadge }
							</div>
						</div>
						${ matchDetail }
						${ feedbackBox }
					</div>
				`;
			} );

			resultsContainer.innerHTML = `
				<div class="card border-${ alertTheme } shadow-sm results-report-card">
					<div class="card-header bg-${ alertTheme } text-white py-3 px-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
						<h5 class="mb-0 fw-bold d-flex align-items-center gap-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-clipboard2-data-fill" viewBox="0 0 16 16">
								<path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
								<path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1"/>
							</svg>
							Relatório de Análise e Pontuação
						</h5>
						<span class="badge bg-white text-${ alertTheme } fs-6 px-3 py-2 fw-bold shadow-sm">
							Nota Final: ${ finalScore }%
						</span>
					</div>

					<div class="card-body p-4">
						<div class="alert alert-${ alertTheme } mb-4 shadow-sm" role="alert">
							<div class="d-flex align-items-center">
								<div>
									<h5 class="alert-heading fw-bold mb-1">${ alertTitle }</h5>
									<p class="mb-0">
										Você alcançou <strong>${ finalScore }%</strong> de aproveitamento. O critério estipulado para aprovação é de <strong>${ passingPercentage }%</strong>.
									</p>
									${ lengthPenaltyMessage ? `<p class="mt-2 mb-0 small text-danger fw-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-exclamation-triangle-fill me-1" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>${ lengthPenaltyMessage }</p>` : '' }
								</div>
							</div>
						</div>

						<div class="row g-3 mb-4 text-center">
							<div class="col-md-3 col-sm-6">
								<div class="p-3 border rounded-3 bg-light shadow-sm">
									<div class="text-muted small text-uppercase fw-semibold">Nota Obtida</div>
									<div class="display-6 fw-bold text-${ isPassed ? 'success' : 'danger' } mt-1">${ finalScore }%</div>
									<div class="small text-muted">Meta: ${ passingPercentage }%</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-6">
								<div class="p-3 border rounded-3 bg-light shadow-sm">
									<div class="text-muted small text-uppercase fw-semibold">Extensão do Texto</div>
									<div class="display-6 fw-bold text-dark mt-1">${ wordCount }</div>
									<div class="small text-muted">Mínimo: ${ minWords } palavras</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-6">
								<div class="p-3 border rounded-3 bg-light shadow-sm">
									<div class="text-muted small text-uppercase fw-semibold">Densidade Lexical</div>
									<div class="display-6 fw-bold text-primary mt-1">${ lexicalDensity }%</div>
									<div class="small text-muted">Riqueza vocabular</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-6">
								<div class="p-3 border rounded-3 bg-light shadow-sm">
									<div class="text-muted small text-uppercase fw-semibold">Critérios Cobertos</div>
									<div class="display-6 fw-bold text-secondary mt-1">${ coveredCount } / ${ totalCriteria }</div>
									<div class="small text-muted">${ earnedWeight } / ${ totalWeight } pontos</div>
								</div>
							</div>
						</div>

						${
							totalCriteria > 0
								? `
							<h6 class="fw-bold text-dark mb-3">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-card-checklist me-2 text-primary" viewBox="0 0 16 16">
									<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
									<path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
								</svg>
								Detalhamento dos Conceitos e Feedback Pedagógico:
							</h6>
							<div class="list-group shadow-sm mb-3">
								${ criteriaRowsHtml }
							</div>
						`
								: ''
						}
					</div>
				</div>
			`;

			resultsContainer.classList.remove( 'd-none' );

			// Smooth scroll to results
			resultsContainer.scrollIntoView( {
				behavior: 'smooth',
				block: 'start',
			} );
		}

		/**
		 * Helper to escape HTML to prevent XSS
		 * @param {string} str
		 * @return {string}
		 */
		function escapeHtml( str ) {
			if ( ! str ) return '';
			return String( str )
				.replace( /&/g, '&amp;' )
				.replace( /</g, '&lt;' )
				.replace( />/g, '&gt;' )
				.replace( /"/g, '&quot;' )
				.replace( /'/g, '&#039;' );
		}

		// Submit analysis handler
		if ( submitBtn ) {
			submitBtn.addEventListener( 'click', analyzeEssay );
		}
	}

	// Initialize all instances when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', function () {
			document
				.querySelectorAll( '.periodic-smart-essay-container' )
				.forEach( initSmartEssayInstance );
		} );
	} else {
		document
			.querySelectorAll( '.periodic-smart-essay-container' )
			.forEach( initSmartEssayInstance );
	}
} )();
