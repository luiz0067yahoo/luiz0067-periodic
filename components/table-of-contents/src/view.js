/**
 * Periodic Table of Contents - Frontend Script
 * Varredura dinâmica de títulos, geração de âncoras automáticas, rolagem suave e scrollspy.
 */

( function () {
	'use strict';

	const initTableOfContents = () => {
		const tocBlocks = document.querySelectorAll( '.periodic-toc-block' );
		if ( ! tocBlocks.length ) {
			return;
		}

		tocBlocks.forEach( ( toc ) => {
			const includeH2 = toc.getAttribute( 'data-include-h2' ) === '1';
			const includeH3 = toc.getAttribute( 'data-include-h3' ) === '1';
			const includeH4 = toc.getAttribute( 'data-include-h4' ) === '1';
			const offset = parseInt( toc.getAttribute( 'data-scroll-offset' ) || '80', 10 );
			const enableScrollspy = toc.getAttribute( 'data-scrollspy' ) === '1';
			const isCollapsible = toc.getAttribute( 'data-collapsible' ) === '1';
			const collapsedMobile = toc.getAttribute( 'data-collapsed-mobile' ) === '1';

			const listContainer = toc.querySelector( '.periodic-toc-list' );
			const toggleBtn = toc.querySelector( '.periodic-toc-toggle' );

			// Controle de início recolhido em mobile
			if ( isCollapsible && collapsedMobile && window.innerWidth < 768 ) {
				toc.classList.add( 'is-collapsed' );
			}

			// Alternância de abertura/fechamento do accordion
			if ( toggleBtn ) {
				toggleBtn.addEventListener( 'click', () => {
					toc.classList.toggle( 'is-collapsed' );
				} );
			}

			// Construir seletores dinâmicos de títulos
			const selectors = [];
			if ( includeH2 ) selectors.push( 'h2' );
			if ( includeH3 ) selectors.push( 'h3' );
			if ( includeH4 ) selectors.push( 'h4' );

			if ( ! selectors.length || ! listContainer ) {
				return;
			}

			// Selecionar apenas títulos que não estejam dentro de sumários ou widgets auxiliares
			const allHeadings = document.querySelectorAll( selectors.join( ', ' ) );
			const targetHeadings = Array.from( allHeadings ).filter( ( el ) => {
				return ! el.closest( '.periodic-toc-block' );
			} );

			if ( ! targetHeadings.length ) {
				toc.style.display = 'none';
				return;
			}

			listContainer.innerHTML = '';
			const linksMap = new Map();

			targetHeadings.forEach( ( heading, index ) => {
				let id = heading.id;
				if ( ! id ) {
					const cleanSlug = heading.textContent
						.toLowerCase()
						.trim()
						.normalize( 'NFD' )
						.replace( /[\u0300-\u036f]/g, '' )
						.replace( /[^a-z0-9]+/g, '-' )
						.replace( /(^-|-$)/g, '' );

					id = cleanSlug || `secao-${ index + 1 }`;

					// Garantir ID único no DOM
					let uniqueId = id;
					let counter = 1;
					while ( document.getElementById( uniqueId ) ) {
						uniqueId = `${ id }-${ counter }`;
						counter++;
					}
					heading.id = uniqueId;
					id = uniqueId;
				}

				const level = heading.tagName.toLowerCase();
				const li = document.createElement( 'li' );
				li.className = `periodic-toc-item level-${ level }`;

				const a = document.createElement( 'a' );
				a.href = `#${ id }`;
				a.className = 'periodic-toc-link';
				a.textContent = heading.textContent.trim();

				// Rolagem suave com compensação de cabeçalho
				a.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					const targetEl = document.getElementById( id );
					if ( targetEl ) {
						const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
						window.scrollTo( {
							top: targetPosition,
							behavior: 'smooth',
						} );
						history.pushState( null, '', `#${ id }` );
					}
				} );

				li.appendChild( a );
				listContainer.appendChild( li );
				linksMap.set( heading, a );
			} );

			// Rastreamento Ativo (Scrollspy) via IntersectionObserver
			if ( enableScrollspy && 'IntersectionObserver' in window ) {
				const observer = new IntersectionObserver(
					( entries ) => {
						entries.forEach( ( entry ) => {
							if ( entry.isIntersecting ) {
								const activeLink = linksMap.get( entry.target );
								if ( activeLink ) {
									listContainer.querySelectorAll( '.periodic-toc-link' ).forEach( ( link ) => {
										link.classList.remove( 'is-active' );
									} );
									activeLink.classList.add( 'is-active' );
								}
							}
						} );
					},
					{
						rootMargin: `-${ offset }px 0px -70% 0px`,
						threshold: 0,
					}
				);

				targetHeadings.forEach( ( h ) => observer.observe( h ) );
			}
		} );
	};

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initTableOfContents );
	} else {
		initTableOfContents();
	}
} )();
