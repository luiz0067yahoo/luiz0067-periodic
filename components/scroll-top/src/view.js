/**
 * Script Frontend Vanilla JS para o Bloco periodic/scroll-top.
 * Monitora a rolagem com requestAnimationFrame e dispara rolagem suave até o topo.
 */
document.addEventListener( 'DOMContentLoaded', () => {
	const scrollButtons = document.querySelectorAll( '.periodic-scroll-top-btn' );

	if ( ! scrollButtons.length ) {
		return;
	}

	scrollButtons.forEach( ( button ) => {
		// Recupera o offset de rolagem configurado no atributo do bloco
		const rawOffset = button.getAttribute( 'data-scroll-offset' );
		const scrollOffset = rawOffset ? parseInt( rawOffset, 10 ) : 300;

		let isTicking = false;

		/**
		 * Atualiza a visibilidade do botão com base na posição do scroll.
		 */
		const updateButtonVisibility = () => {
			const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

			if ( currentScrollY > scrollOffset ) {
				if ( ! button.classList.contains( 'is-visible' ) ) {
					button.classList.add( 'is-visible' );
				}
			} else if ( button.classList.contains( 'is-visible' ) ) {
				button.classList.remove( 'is-visible' );
			}

			isTicking = false;
		};

		/**
		 * Listener de rolagem otimizado com requestAnimationFrame.
		 */
		const onScroll = () => {
			if ( ! isTicking ) {
				window.requestAnimationFrame( updateButtonVisibility );
				isTicking = true;
			}
		};

		// Evento de rolagem da janela
		window.addEventListener( 'scroll', onScroll, { passive: true } );

		// Verificação inicial no carregamento da página
		updateButtonVisibility();

		/**
		 * Evento de clique para voltar ao topo suavemente.
		 */
		button.addEventListener( 'click', ( event ) => {
			event.preventDefault();

			window.scrollTo( {
				top: 0,
				behavior: 'smooth',
			} );

			// Remove o foco do botão após o clique para evitar contorno residual
			button.blur();
		} );
	} );
} );
