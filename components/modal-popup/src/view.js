/**
 * Script Frontend Leve para Periodic Modal Popup
 *
 * Gerencia a inicialização, disparo e fechamento dos modais com suporte nativo
 * ao Bootstrap 5 e com fallback autônomo e seguro para compatibilidade máxima.
 */

document.addEventListener( 'DOMContentLoaded', () => {
	// Se a biblioteca nativa do Bootstrap 5 estiver presente, garante a inicialização padrão
	const hasBootstrapModal =
		typeof window.bootstrap !== 'undefined' &&
		typeof window.bootstrap.Modal !== 'undefined';

	if ( hasBootstrapModal ) {
		const modalTriggerList = document.querySelectorAll(
			'.periodic-modal-trigger-btn[data-bs-toggle="modal"]'
		);
		modalTriggerList.forEach( ( triggerEl ) => {
			const targetSelector = triggerEl.getAttribute( 'data-bs-target' );
			const targetModalEl = targetSelector
				? document.querySelector( targetSelector )
				: null;
			if (
				targetModalEl &&
				! window.bootstrap.Modal.getInstance( targetModalEl )
			) {
				new window.bootstrap.Modal( targetModalEl );
			}
		} );
		return;
	}

	// Fallback autônomo sem dependências externas (Pure Vanilla JS)
	const triggers = document.querySelectorAll(
		'.periodic-modal-trigger-btn[data-bs-toggle="modal"]'
	);

	function getBackdrop() {
		let backdrop = document.querySelector(
			'.periodic-modal-backdrop-fallback'
		);
		if ( ! backdrop ) {
			backdrop = document.createElement( 'div' );
			backdrop.className =
				'modal-backdrop fade show periodic-modal-backdrop-fallback';
			document.body.appendChild( backdrop );
		}
		return backdrop;
	}

	function removeBackdrop() {
		const backdrop = document.querySelector(
			'.periodic-modal-backdrop-fallback'
		);
		if ( backdrop && backdrop.parentNode ) {
			backdrop.parentNode.removeChild( backdrop );
		}
	}

	function openModal( modalEl ) {
		if ( ! modalEl ) {
			return;
		}
		getBackdrop();
		modalEl.classList.add( 'show' );
		modalEl.style.display = 'block';
		modalEl.removeAttribute( 'aria-hidden' );
		modalEl.setAttribute( 'aria-modal', 'true' );
		document.body.classList.add( 'modal-open' );

		const firstFocusable = modalEl.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		if ( firstFocusable ) {
			firstFocusable.focus();
		}
	}

	function closeModal( modalEl ) {
		if ( ! modalEl ) {
			return;
		}
		modalEl.classList.remove( 'show' );
		modalEl.style.display = 'none';
		modalEl.setAttribute( 'aria-hidden', 'true' );
		modalEl.removeAttribute( 'aria-modal' );
		removeBackdrop();
		document.body.classList.remove( 'modal-open' );
	}

	// Manipula o clique nos botões de disparo
	triggers.forEach( ( trigger ) => {
		trigger.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			const targetSelector = trigger.getAttribute( 'data-bs-target' );
			if ( targetSelector ) {
				const modalEl = document.querySelector( targetSelector );
				if ( modalEl ) {
					openModal( modalEl );
				}
			}
		} );
	} );

	// Manipula o clique em botões de fechar dentro dos modais
	document.addEventListener( 'click', ( e ) => {
		const dismissBtn = e.target.closest( '[data-bs-dismiss="modal"]' );
		if ( dismissBtn ) {
			e.preventDefault();
			const modalEl = dismissBtn.closest( '.periodic-modal-element' );
			if ( modalEl ) {
				closeModal( modalEl );
			}
			return;
		}

		// Fechar ao clicar no backdrop (se não for backdrop estático)
		if (
			e.target.classList.contains( 'modal' ) &&
			e.target.classList.contains( 'show' )
		) {
			const isStatic =
				e.target.getAttribute( 'data-bs-backdrop' ) === 'static';
			if ( ! isStatic ) {
				closeModal( e.target );
			}
		}
	} );

	// Fechar via tecla ESC (caso não seja estático)
	document.addEventListener( 'keydown', ( e ) => {
		if ( e.key === 'Escape' ) {
			const activeModal = document.querySelector(
				'.periodic-modal-element.show'
			);
			if ( activeModal ) {
				const isStatic =
					activeModal.getAttribute( 'data-bs-backdrop' ) === 'static';
				if ( ! isStatic ) {
					closeModal( activeModal );
				}
			}
		}
	} );
} );
