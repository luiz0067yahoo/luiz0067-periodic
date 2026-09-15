/**
 * Frontend script para alternância dinâmica de abas Bootstrap 5.
 * Suporta o componente nativo bootstrap.Tab e inclui fallback 100% autônomo.
 */
document.addEventListener( 'DOMContentLoaded', () => {
	const initTabs = () => {
		const tabTriggers = document.querySelectorAll(
			'.periodic-tabs-wrapper [data-bs-toggle="tab"], .periodic-tabs-wrapper [data-bs-toggle="pill"]'
		);

		// Inicialização com a biblioteca Bootstrap se presente
		if ( typeof window.bootstrap !== 'undefined' && window.bootstrap.Tab ) {
			tabTriggers.forEach( ( triggerEl ) => {
				try {
					window.bootstrap.Tab.getOrCreateInstance( triggerEl );
				} catch ( e ) {
					// Ignora silenciosamente se o elemento já estiver inicializado
				}
			} );
		}
	};

	// Fallback autônomo baseado em delegação de eventos para máxima resiliência
	document.addEventListener( 'click', ( event ) => {
		const trigger = event.target.closest(
			'.periodic-tabs-wrapper [data-bs-toggle="tab"], .periodic-tabs-wrapper [data-bs-toggle="pill"]'
		);

		if ( ! trigger ) {
			return;
		}

		event.preventDefault();

		// Se o Bootstrap estiver disponível, usa a API nativa
		if ( typeof window.bootstrap !== 'undefined' && window.bootstrap.Tab ) {
			try {
				const bsTab = window.bootstrap.Tab.getOrCreateInstance( trigger );
				bsTab.show();
				return;
			} catch ( e ) {
				// Prossegue para o fallback manual caso ocorra erro
			}
		}

		// Fallback manual de alternância de abas
		const wrapper = trigger.closest( '.periodic-tabs-wrapper' );
		if ( ! wrapper ) {
			return;
		}

		const targetSelector =
			trigger.getAttribute( 'data-bs-target' ) ||
			trigger.getAttribute( 'href' );

		if ( ! targetSelector ) {
			return;
		}

		const targetPane = wrapper.querySelector( targetSelector );
		if ( ! targetPane ) {
			return;
		}

		// Desativa todas as abas irmãs no mesmo grupo de navegação
		const navGroup = trigger.closest( '.nav' );
		if ( navGroup ) {
			navGroup.querySelectorAll( '.nav-link' ).forEach( ( link ) => {
				link.classList.remove( 'active' );
				link.setAttribute( 'aria-selected', 'false' );
			} );
		}

		// Ativa a aba clicada
		trigger.classList.add( 'active' );
		trigger.setAttribute( 'aria-selected', 'true' );

		// Desativa todos os painéis irmãos no mesmo wrapper
		wrapper.querySelectorAll( '.tab-pane' ).forEach( ( pane ) => {
			pane.classList.remove( 'show', 'active' );
		} );

		// Ativa o painel de destino com transição suave
		targetPane.classList.add( 'active' );
		setTimeout( () => {
			targetPane.classList.add( 'show' );
		}, 10 );
	} );

	initTabs();
} );
