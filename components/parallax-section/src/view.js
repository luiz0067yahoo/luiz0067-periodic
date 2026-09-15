/**
 * Periodic Parallax Section - Frontend Controller
 * Efeito de rolagem paralaxe suave e de alta performance baseado em RAF e IntersectionObserver.
 */

( function () {
	'use strict';

	// Respeitar preferências de acessibilidade do usuário
	const prefersReducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
	if ( prefersReducedMotion ) {
		return;
	}

	const initParallaxSections = () => {
		const sections = document.querySelectorAll( '.periodic-parallax-section-block.has-bg-image' );
		if ( ! sections.length ) {
			return;
		}

		const observer = new IntersectionObserver(
			( entries ) => {
				entries.forEach( ( entry ) => {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-in-viewport' );
					} else {
						entry.target.classList.remove( 'is-in-viewport' );
					}
				} );
			},
			{ threshold: 0 }
		);

		sections.forEach( ( section ) => {
			observer.observe( section );
		} );

		let ticking = false;

		const updateParallax = () => {
			const windowHeight = window.innerHeight;

			sections.forEach( ( section ) => {
				if ( ! section.classList.contains( 'is-in-viewport' ) ) {
					return;
				}

				const bg = section.querySelector( '.periodic-parallax-bg' );
				if ( ! bg ) {
					return;
				}

				const rect = section.getBoundingClientRect();
				const speed = parseFloat( section.getAttribute( 'data-parallax-speed' ) || '0.3' );
				const direction = section.getAttribute( 'data-parallax-direction' ) || 'down';

				// Calcular distância do centro da viewport
				const sectionCenter = rect.top + rect.height / 2;
				const viewportCenter = windowHeight / 2;
				const distanceFromCenter = sectionCenter - viewportCenter;

				let translateY = distanceFromCenter * speed;
				if ( direction === 'up' ) {
					translateY = -translateY;
				}

				bg.style.transform = `translate3d(0, ${ translateY.toFixed( 2 ) }px, 0) scale(1.2)`;
			} );

			ticking = false;
		};

		window.addEventListener(
			'scroll',
			() => {
				if ( ! ticking ) {
					window.requestAnimationFrame( updateParallax );
					ticking = true;
				}
			},
			{ passive: true }
		);

		window.addEventListener( 'resize', () => {
			if ( ! ticking ) {
				window.requestAnimationFrame( updateParallax );
				ticking = true;
			}
		} );

		// Executar primeira atualização
		updateParallax();
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initParallaxSections );
	} else {
		initParallaxSections();
	}
} )();
