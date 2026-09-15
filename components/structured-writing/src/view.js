/**
 * Frontend script for Periodic Structured Writing
 * Manages LocalStorage autosave, @media print PDF export, formatted copy, and tabbed navigation.
 */

( function () {
	'use strict';

	/**
	 * Calculate word and character count
	 */
	function calculateCounts( text ) {
		const trimmed = ( text || '' ).trim();
		const words = trimmed.length === 0 ? 0 : trimmed.split( /\s+/ ).length;
		const chars = ( text || '' ).length;
		return { words, chars };
	}

	/**
	 * Initialize a single Structured Writing Block
	 */
	function initStructuredWritingBlock( container, blockIndex ) {
		if ( container.dataset.initialized === 'true' ) {
			return;
		}
		container.dataset.initialized = 'true';

		let config = {};
		try {
			config = JSON.parse( container.dataset.structuredWritingConfig || '{}' );
		} catch ( e ) {
			console.error( 'Error parsing structured writing config:', e );
		}

		// Unique storage key based on page path and block index/ID
		const storageKey = `periodic_writing_${ window.location.pathname }_${ blockIndex }`;

		const textareas = container.querySelectorAll( '.structured-textarea' );
		const autosaveStatus = container.querySelector( '.autosave-status' );
		const autosaveText = container.querySelector( '.autosave-text' );
		const totalWordsElem = container.querySelector( '.total-words' );
		const totalCharsElem = container.querySelector( '.total-chars' );
		const clearDraftBtn = container.querySelector( '.btn-clear-draft' );
		const copyFormattedBtn = container.querySelector( '.btn-copy-formatted' );
		const printPdfBtn = container.querySelector( '.btn-print-pdf' );

		// Step-by-step navigation elements
		const tabLinks = container.querySelectorAll( '.writing-nav-tabs .nav-link' );
		const sectionWrappers = container.querySelectorAll( '.section-wrapper' );
		const prevStepBtn = container.querySelector( '.btn-prev-step' );
		const nextStepBtn = container.querySelector( '.btn-next-step' );
		const stepIndicator = container.querySelector( '.current-step-indicator' );

		let currentStepIndex = 0;
		let saveTimeout = null;

		/**
		 * Update word and character counts
		 */
		function updateWordCounts() {
			let totalWords = 0;
			let totalChars = 0;

			textareas.forEach( ( textarea ) => {
				const { words, chars } = calculateCounts( textarea.value );
				totalWords += words;
				totalChars += chars;

				const wrapper = textarea.closest( '.section-wrapper' );
				if ( wrapper ) {
					const secWordsElem = wrapper.querySelector( '.section-words' );
					if ( secWordsElem ) {
						secWordsElem.textContent = words;
					}
				}
			} );

			if ( totalWordsElem ) {
				totalWordsElem.textContent = totalWords;
			}
			if ( totalCharsElem ) {
				totalCharsElem.textContent = totalChars;
			}
		}

		/**
		 * Save draft to LocalStorage
		 */
		function saveDraft() {
			const draftData = {};
			textareas.forEach( ( textarea ) => {
				const id = textarea.dataset.sectionId || textarea.id;
				draftData[ id ] = textarea.value;
			} );

			try {
				localStorage.setItem( storageKey, JSON.stringify( draftData ) );
				if ( autosaveText ) {
					const now = new Date();
					const timeStr = now.toLocaleTimeString( [], { hour: '2-digit', minute: '2-digit' } );
					autosaveText.textContent = `Salvo no navegador (${ timeStr })`;
				}
				if ( autosaveStatus ) {
					autosaveStatus.classList.add( 'text-white' );
					autosaveStatus.classList.remove( 'text-white-50' );
				}
			} catch ( err ) {
				console.warn( 'LocalStorage save failed:', err );
			}
		}

		/**
		 * Load draft from LocalStorage
		 */
		function loadDraft() {
			try {
				const saved = localStorage.getItem( storageKey );
				if ( saved ) {
					const draftData = JSON.parse( saved );
					textareas.forEach( ( textarea ) => {
						const id = textarea.dataset.sectionId || textarea.id;
						if ( draftData[ id ] !== undefined ) {
							textarea.value = draftData[ id ];
						}
					} );
					if ( autosaveText ) {
						autosaveText.textContent = 'Rascunho recuperado';
					}
				}
			} catch ( err ) {
				console.warn( 'LocalStorage load failed:', err );
			}
			updateWordCounts();
		}

		/**
		 * Set active step for Step-by-Step template
		 */
		function setActiveStep( stepIdx ) {
			if ( ! sectionWrappers.length ) {
				return;
			}
			const totalSteps = sectionWrappers.length;
			currentStepIndex = Math.max( 0, Math.min( stepIdx, totalSteps - 1 ) );

			// Update tabs
			tabLinks.forEach( ( link, idx ) => {
				const isActive = idx === currentStepIndex;
				link.classList.toggle( 'active', isActive );
				link.setAttribute( 'aria-selected', isActive ? 'true' : 'false' );
			} );

			// Update visible section wrapper
			sectionWrappers.forEach( ( wrapper, idx ) => {
				if ( idx === currentStepIndex ) {
					wrapper.classList.remove( 'd-none' );
				} else {
					wrapper.classList.add( 'd-none' );
				}
			} );

			// Update navigation buttons
			if ( prevStepBtn ) {
				prevStepBtn.disabled = currentStepIndex === 0;
			}
			if ( nextStepBtn ) {
				if ( currentStepIndex === totalSteps - 1 ) {
					nextStepBtn.innerHTML = 'Concluir & Revisar &check;';
				} else {
					nextStepBtn.innerHTML = 'Próxima Etapa &rarr;';
				}
			}
			if ( stepIndicator ) {
				stepIndicator.textContent = `Etapa ${ currentStepIndex + 1 } de ${ totalSteps }`;
			}
		}

		/**
		 * Listen for typing in textareas
		 */
		textareas.forEach( ( textarea ) => {
			textarea.addEventListener( 'input', function () {
				if ( autosaveText ) {
					autosaveText.textContent = 'Salvando rascunho...';
				}
				clearTimeout( saveTimeout );
				saveTimeout = setTimeout( () => {
					saveDraft();
				}, 400 );
				updateWordCounts();
			} );
		} );

		/**
		 * Step-by-step navigation listeners
		 */
		tabLinks.forEach( ( link ) => {
			link.addEventListener( 'click', function () {
				const targetIdx = parseInt( this.dataset.sectionIndex, 10 );
				setActiveStep( targetIdx );
			} );
		} );

		if ( prevStepBtn ) {
			prevStepBtn.addEventListener( 'click', () => {
				setActiveStep( currentStepIndex - 1 );
			} );
		}

		if ( nextStepBtn ) {
			nextStepBtn.addEventListener( 'click', () => {
				if ( currentStepIndex < sectionWrappers.length - 1 ) {
					setActiveStep( currentStepIndex + 1 );
				} else {
					// Final step - scroll to toolbar or show feedback
					const actions = container.querySelector( '.structured-writing-actions' );
					if ( actions ) {
						actions.scrollIntoView( { behavior: 'smooth' } );
					}
				}
			} );
		}

		/**
		 * Clear draft button
		 */
		if ( clearDraftBtn ) {
			clearDraftBtn.addEventListener( 'click', function () {
				if ( window.confirm( 'Deseja realmente limpar todo o rascunho deste documento? Esta ação não pode ser desfeita.' ) ) {
					textareas.forEach( ( t ) => {
						t.value = '';
					} );
					try {
						localStorage.removeItem( storageKey );
					} catch ( e ) {}
					updateWordCounts();
					if ( autosaveText ) {
						autosaveText.textContent = 'Rascunho limpo';
					}
				}
			} );
		}

		/**
		 * Copy Formatted content
		 */
		if ( copyFormattedBtn ) {
			copyFormattedBtn.addEventListener( 'click', function () {
				const title = config.documentTitle || 'Documento Estruturado';
				const subtitle = config.documentSubtitle || '';

				let formattedText = `# ${ title }\n`;
				if ( subtitle ) {
					formattedText += `> ${ subtitle }\n\n`;
				} else {
					formattedText += '\n';
				}

				const sections = config.sections || [];
				textareas.forEach( ( textarea, idx ) => {
					const secConfig = sections[ idx ] || {};
					const secTitle = secConfig.title || `Seção ${ idx + 1 }`;
					const content = textarea.value.trim() || '*(Nenhum conteúdo inserido)*';

					formattedText += `## ${ secTitle }\n\n${ content }\n\n`;
				} );

				formattedText += `---\n*Documento elaborado via Periodic Structured Writing*\n`;

				// Clipboard API with fallback
				if ( navigator.clipboard && window.isSecureContext ) {
					navigator.clipboard.writeText( formattedText ).then( () => {
						showToast( container, 'Documento copiado em formato Markdown com sucesso!' );
					} ).catch( () => {
						fallbackCopyText( formattedText, container );
					} );
				} else {
					fallbackCopyText( formattedText, container );
				}
			} );
		}

		/**
		 * Fallback copy
		 */
		function fallbackCopyText( text, parentContainer ) {
			const dummy = document.createElement( 'textarea' );
			dummy.value = text;
			dummy.style.position = 'fixed';
			dummy.style.left = '-9999px';
			document.body.appendChild( dummy );
			dummy.focus();
			dummy.select();
			try {
				document.execCommand( 'copy' );
				showToast( parentContainer, 'Documento copiado com sucesso!' );
			} catch ( err ) {
				alert( 'Não foi possível copiar automaticamente. Por favor selecione o texto manualmente.' );
			}
			document.body.removeChild( dummy );
		}

		/**
		 * Toast notification helper
		 */
		function showToast( parentContainer, message ) {
			let toast = parentContainer.querySelector( '.toast-feedback' );
			if ( ! toast ) {
				toast = document.createElement( 'div' );
				toast.className = 'toast-feedback alert alert-success d-flex align-items-center gap-2 fade show';
				parentContainer.appendChild( toast );
			}
			toast.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-circle-fill flex-shrink-0" viewBox="0 0 16 16">
					<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
				</svg>
				<div>${ message }</div>
			`;
			toast.style.display = 'flex';
			setTimeout( () => {
				if ( toast ) {
					toast.style.display = 'none';
				}
			}, 3000 );
		}

		/**
		 * Print / PDF Generation
		 */
		if ( printPdfBtn ) {
			printPdfBtn.addEventListener( 'click', function () {
				// 1. Sync textarea contents to print-content-view
				textareas.forEach( ( textarea ) => {
					const wrapper = textarea.closest( '.structured-section-box' );
					if ( wrapper ) {
						const printView = wrapper.querySelector( '.print-content-view' );
						if ( printView ) {
							printView.textContent = textarea.value.trim() || '(Em branco)';
						}
					}
				} );

				// 2. If step-by-step, temporarily unhide all steps for full document printing
				const isStepByStep = config.templateType === 'step-by-step';
				if ( isStepByStep ) {
					sectionWrappers.forEach( ( wrap ) => {
						wrap.classList.remove( 'd-none' );
					} );
				}

				// 3. Trigger native print dialog (PDF save)
				window.print();

				// 4. Restore step-by-step visibility
				if ( isStepByStep ) {
					setActiveStep( currentStepIndex );
				}
			} );
		}

		// Initial load
		loadDraft();
		if ( config.templateType === 'step-by-step' ) {
			setActiveStep( 0 );
		}
	}

	/**
	 * Initialize all blocks on DOM ready
	 */
	function initAllBlocks() {
		const blocks = document.querySelectorAll( '.wp-block-periodic-structured-writing, .periodic-structured-writing-container' );
		blocks.forEach( ( block, index ) => {
			initStructuredWritingBlock( block, index );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAllBlocks );
	} else {
		initAllBlocks();
	}

	// Expose for testing and re-renders
	window.initPeriodicStructuredWriting = initAllBlocks;
} )();
