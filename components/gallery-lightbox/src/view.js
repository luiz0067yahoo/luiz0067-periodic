/**
 * Periodic Gallery Lightbox - Frontend Runtime
 * Vanilla JavaScript puro de alta performance com popup estilo LC-Lightbox em tela cheia.
 */
document.addEventListener( 'DOMContentLoaded', () => {
	const galleries = document.querySelectorAll( '.periodic-gallery-lightbox-wrapper' );
	if ( ! galleries.length ) {
		return;
	}

	galleries.forEach( ( gallery, galleryIndex ) => {
		initGalleryLightbox( gallery, galleryIndex );
	} );
} );

/**
 * Inicializa uma galeria específica.
 *
 * @param {HTMLElement} gallery Contêiner da galeria.
 * @param {number} galleryIndex Índice da galeria na página.
 */
function initGalleryLightbox( gallery, galleryIndex ) {
	const triggers = gallery.querySelectorAll( '.periodic-lightbox-trigger' );
	if ( ! triggers.length ) {
		return;
	}

	const theme = gallery.getAttribute( 'data-theme' ) || 'dark';
	const enableCaptions = gallery.getAttribute( 'data-enable-captions' ) === 'true';
	const enableThumbnails = gallery.getAttribute( 'data-enable-thumbnails' ) === 'true';

	// Coleta dados das fotos
	const items = Array.from( triggers ).map( ( trigger, idx ) => ( {
		index: idx,
		fullUrl: trigger.getAttribute( 'data-full-url' ) || trigger.getAttribute( 'href' ),
		thumbUrl: trigger.getAttribute( 'data-thumbnail-url' ) || trigger.querySelector( 'img' )?.src,
		title: trigger.getAttribute( 'data-title' ) || '',
		caption: trigger.getAttribute( 'data-caption' ) || '',
		alt: trigger.getAttribute( 'data-alt' ) || '',
		element: trigger,
	} ) );

	let currentIndex = 0;
	let isOpen = false;
	let isZoomed = false;
	let lastFocusedElement = null;

	// Criação do DOM do Lightbox
	const lightbox = document.createElement( 'div' );
	lightbox.className = `periodic-lightbox-overlay theme-${ theme }`;
	lightbox.setAttribute( 'id', `periodic-lightbox-${ galleryIndex }` );
	lightbox.setAttribute( 'role', 'dialog' );
	lightbox.setAttribute( 'aria-modal', 'true' );
	lightbox.setAttribute( 'aria-hidden', 'true' );
	lightbox.style.display = 'none';

	lightbox.innerHTML = `
		<div class="periodic-lightbox-top-bar">
			<div class="periodic-counter-wrapper">
				<span class="periodic-counter-current">1</span> / <span class="periodic-counter-total">${ items.length }</span>
			</div>
			<div class="periodic-top-title text-truncate"></div>
			<div class="periodic-lightbox-actions">
				<button type="button" class="periodic-lb-btn periodic-zoom-toggle" aria-label="Alternar Zoom" title="Alternar Zoom">
					<i class="fa-solid fa-magnifying-glass-plus"></i>
				</button>
				<button type="button" class="periodic-lb-btn periodic-close-btn" aria-label="Fechar Lightbox" title="Fechar (Esc)">
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>

		<div class="periodic-lightbox-stage">
			<button type="button" class="periodic-nav-arrow periodic-prev-btn" aria-label="Foto Anterior" title="Anterior (Seta Esquerda)">
				<i class="fa-solid fa-chevron-left"></i>
			</button>

			<div class="periodic-main-image-container">
				<div class="periodic-image-loader" style="display:none;">
					<i class="fa-solid fa-circle-notch fa-spin fa-2x"></i>
				</div>
				<img src="" alt="" class="periodic-main-image" draggable="false" />
			</div>

			<button type="button" class="periodic-nav-arrow periodic-next-btn" aria-label="Próxima Foto" title="Próxima (Seta Direita)">
				<i class="fa-solid fa-chevron-right"></i>
			</button>
		</div>

		<div class="periodic-lightbox-bottom-bar">
			${ enableCaptions ? '<div class="periodic-caption-box"><h4 class="periodic-caption-heading"></h4><p class="periodic-caption-desc"></p></div>' : '' }
			${ enableThumbnails ? '<div class="periodic-thumbs-tray"><div class="periodic-thumbs-slider"></div></div>' : '' }
		</div>
	`;

	document.body.appendChild( lightbox );

	// Elementos internos do lightbox
	const currentCounterEl = lightbox.querySelector( '.periodic-counter-current' );
	const topTitleEl = lightbox.querySelector( '.periodic-top-title' );
	const mainImage = lightbox.querySelector( '.periodic-main-image' );
	const loader = lightbox.querySelector( '.periodic-image-loader' );
	const closeBtn = lightbox.querySelector( '.periodic-close-btn' );
	const prevBtn = lightbox.querySelector( '.periodic-prev-btn' );
	const nextBtn = lightbox.querySelector( '.periodic-next-btn' );
	const zoomToggleBtn = lightbox.querySelector( '.periodic-zoom-toggle' );
	const zoomIcon = zoomToggleBtn?.querySelector( 'i' );
	const captionBox = lightbox.querySelector( '.periodic-caption-box' );
	const captionHeading = lightbox.querySelector( '.periodic-caption-heading' );
	const captionDesc = lightbox.querySelector( '.periodic-caption-desc' );
	const thumbsSlider = lightbox.querySelector( '.periodic-thumbs-slider' );

	// Gera as miniaturas inferiores se habilitado
	if ( enableThumbnails && thumbsSlider ) {
		items.forEach( ( item, i ) => {
			const thumbBtn = document.createElement( 'button' );
			thumbBtn.type = 'button';
			thumbBtn.className = `periodic-thumb-item ${ i === 0 ? 'is-active' : '' }`;
			thumbBtn.setAttribute( 'data-index', i );
			thumbBtn.setAttribute( 'aria-label', `Miniatura ${ i + 1 }` );
			thumbBtn.innerHTML = `<img src="${ item.thumbUrl || item.fullUrl }" alt="${ item.alt }" loading="lazy" />`;

			thumbBtn.addEventListener( 'click', ( e ) => {
				e.stopPropagation();
				goToSlide( i );
			} );

			thumbsSlider.appendChild( thumbBtn );
		} );
	}

	/**
	 * Atualiza a foto ativa no Lightbox.
	 *
	 * @param {number} index Índice da foto a ser exibida.
	 */
	function goToSlide( index ) {
		currentIndex = ( index + items.length ) % items.length;
		const item = items[ currentIndex ];

		// Reseta zoom
		isZoomed = false;
		mainImage.classList.remove( 'is-zoomed' );
		if ( zoomIcon ) {
			zoomIcon.className = 'fa-solid fa-magnifying-glass-plus';
		}

		// Contador
		if ( currentCounterEl ) {
			currentCounterEl.textContent = currentIndex + 1;
		}

		// Título superior
		if ( topTitleEl ) {
			topTitleEl.textContent = item.title || '';
		}

		// Legendas
		if ( enableCaptions && captionBox ) {
			if ( captionHeading ) {
				captionHeading.textContent = item.title || '';
				captionHeading.style.display = item.title ? 'block' : 'none';
			}
			if ( captionDesc ) {
				captionDesc.textContent = item.caption || '';
				captionDesc.style.display = item.caption ? 'block' : 'none';
			}
			captionBox.style.display = ( item.title || item.caption ) ? 'block' : 'none';
		}

		// Imagem Principal com feedback de carregamento
		if ( loader ) {
			loader.style.display = 'block';
		}
		mainImage.style.opacity = '0';

		const preloadImg = new Image();
		preloadImg.onload = () => {
			mainImage.src = item.fullUrl;
			mainImage.alt = item.alt || item.title || '';
			mainImage.style.opacity = '1';
			if ( loader ) {
				loader.style.display = 'none';
			}
		};
		preloadImg.onerror = () => {
			mainImage.src = item.fullUrl;
			mainImage.style.opacity = '1';
			if ( loader ) {
				loader.style.display = 'none';
			}
		};
		preloadImg.src = item.fullUrl;

		// Atualiza barra de miniaturas
		if ( enableThumbnails && thumbsSlider ) {
			const allThumbs = thumbsSlider.querySelectorAll( '.periodic-thumb-item' );
			allThumbs.forEach( ( th, idx ) => {
				if ( idx === currentIndex ) {
					th.classList.add( 'is-active' );
					th.scrollIntoView( { behavior: 'smooth', block: 'nearest', inline: 'center' } );
				} else {
					th.classList.remove( 'is-active' );
				}
			} );
		}
	}

	/**
	 * Alterna o modo de Zoom da imagem principal.
	 */
	function toggleZoom() {
		isZoomed = ! isZoomed;
		if ( isZoomed ) {
			mainImage.classList.add( 'is-zoomed' );
			if ( zoomIcon ) {
				zoomIcon.className = 'fa-solid fa-magnifying-glass-minus';
			}
		} else {
			mainImage.classList.remove( 'is-zoomed' );
			if ( zoomIcon ) {
				zoomIcon.className = 'fa-solid fa-magnifying-glass-plus';
			}
		}
	}

	/**
	 * Abre o modal de Lightbox.
	 *
	 * @param {number} index Índice inicial.
	 */
	function openLightbox( index ) {
		lastFocusedElement = document.activeElement;
		isOpen = true;
		lightbox.style.display = 'flex';
		lightbox.setAttribute( 'aria-hidden', 'false' );
		document.body.classList.add( 'periodic-lightbox-active' );
		document.body.style.overflow = 'hidden';

		goToSlide( index );

		// Transição suave de entrada
		requestAnimationFrame( () => {
			lightbox.classList.add( 'is-visible' );
			closeBtn.focus();
		} );
	}

	/**
	 * Fecha o modal de Lightbox.
	 */
	function closeLightbox() {
		isOpen = false;
		lightbox.classList.remove( 'is-visible' );
		lightbox.setAttribute( 'aria-hidden', 'true' );
		document.body.classList.remove( 'periodic-lightbox-active' );
		document.body.style.overflow = '';

		setTimeout( () => {
			lightbox.style.display = 'none';
			if ( lastFocusedElement && typeof lastFocusedElement.focus === 'function' ) {
				lastFocusedElement.focus();
			}
		}, 300 );
	}

	// Gatilhos de abertura
	triggers.forEach( ( trigger, i ) => {
		trigger.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			openLightbox( i );
		} );
	} );

	// Botões de navegação e controle
	closeBtn.addEventListener( 'click', closeLightbox );
	prevBtn.addEventListener( 'click', () => goToSlide( currentIndex - 1 ) );
	nextBtn.addEventListener( 'click', () => goToSlide( currentIndex + 1 ) );

	if ( zoomToggleBtn ) {
		zoomToggleBtn.addEventListener( 'click', toggleZoom );
	}

	mainImage.addEventListener( 'dblclick', toggleZoom );

	// Teclado: Escape para sair, Setas para navegar
	window.addEventListener( 'keydown', ( e ) => {
		if ( ! isOpen ) return;

		if ( e.key === 'Escape' ) {
			e.preventDefault();
			closeLightbox();
		} else if ( e.key === 'ArrowLeft' ) {
			e.preventDefault();
			goToSlide( currentIndex - 1 );
		} else if ( e.key === 'ArrowRight' ) {
			e.preventDefault();
			goToSlide( currentIndex + 1 );
		}
	} );

	// Fechamento ao clicar no fundo (fora da imagem e dos controles)
	lightbox.addEventListener( 'click', ( e ) => {
		if (
			e.target === lightbox ||
			e.target.classList.contains( 'periodic-lightbox-stage' ) ||
			e.target.classList.contains( 'periodic-main-image-container' )
		) {
			if ( isZoomed ) {
				toggleZoom();
			} else {
				closeLightbox();
			}
		}
	} );

	// Suporte a Gestos de Deslize (Swipe) em dispositivos móveis
	let touchStartX = 0;
	let touchStartY = 0;
	let touchEndX = 0;
	let touchEndY = 0;

	const stage = lightbox.querySelector( '.periodic-lightbox-stage' );
	if ( stage ) {
		stage.addEventListener(
			'touchstart',
			( e ) => {
				touchStartX = e.changedTouches[ 0 ].screenX;
				touchStartY = e.changedTouches[ 0 ].screenY;
			},
			{ passive: true }
		);

		stage.addEventListener(
			'touchend',
			( e ) => {
				touchEndX = e.changedTouches[ 0 ].screenX;
				touchEndY = e.changedTouches[ 0 ].screenY;
				handleSwipeGesture();
			},
			{ passive: true }
		);
	}

	function handleSwipeGesture() {
		if ( isZoomed ) return; // Evita troca acidental se estiver dando zoom

		const diffX = touchEndX - touchStartX;
		const diffY = touchEndY - touchStartY;

		// Movimento predominantemente horizontal com distância mínima de 45px
		if ( Math.abs( diffX ) > Math.abs( diffY ) && Math.abs( diffX ) > 45 ) {
			if ( diffX < 0 ) {
				// Swipe para a esquerda -> Próxima foto
				goToSlide( currentIndex + 1 );
			} else {
				// Swipe para a direita -> Foto anterior
				goToSlide( currentIndex - 1 );
			}
		}
	}
}
