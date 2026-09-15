(function (blocks, element, components, editor, i18n) {
	'use strict';

	var el = element.createElement;
	var __ = i18n.__;
	var registerBlockType = blocks.registerBlockType;

	// Componentes do editor e controles de inspeção
	var InspectorControls = editor.InspectorControls;
	var RichText = editor.RichText;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
	var SelectControl = components.SelectControl;
	var RangeControl = components.RangeControl;
	var ToggleControl = components.ToggleControl;
	var Placeholder = components.Placeholder;
	var Button = components.Button;

	// Ícone vetorial SVG do bloco
	var blockIcon = el(
		'svg',
		{
			width: 24,
			height: 24,
			viewBox: '0 0 24 24',
			fill: 'none',
			xmlns: 'http://www.w3.org/2000/svg'
		},
		el('rect', {
			x: '2',
			y: '4',
			width: '20',
			height: '16',
			rx: '3',
			stroke: '#7b1fa2',
			strokeWidth: '2',
			fill: '#f3e8ff'
		}),
		el('path', {
			d: 'M10 8.5L16 12L10 15.5V8.5Z',
			fill: '#7b1fa2'
		}),
		el('circle', {
			cx: '18.5',
			cy: '6.5',
			r: '1',
			fill: '#e91e63'
		})
	);

	/**
	 * Função utilitária para extrair e normalizar URLs de incorporação do YouTube, Vimeo ou tags <iframe>.
	 *
	 * @param {string} rawInput URL direta ou código iframe colado pelo usuário.
	 * @return {string} URL segura e pronta para o atributo src do iframe.
	 */
	function parseVideoUrl(rawInput) {
		if (!rawInput || typeof rawInput !== 'string') {
			return '';
		}

		var input = rawInput.trim();

		// Se o usuário colou uma tag <iframe ... src="..." ...>
		var iframeMatch = input.match(/<iframe[^>]+src=["']([^"']+)["']/i);
		if (iframeMatch && iframeMatch[1]) {
			input = iframeMatch[1].trim();
		}

		// YouTube: Formatos comuns (watch?v=, youtu.be/, embed/, shorts/)
		var ytMatch = input.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
		if (ytMatch && ytMatch[1]) {
			return 'https://www.youtube.com/embed/' + ytMatch[1] + '?rel=0';
		}

		// Vimeo: Formatos comuns (vimeo.com/ID ou player.vimeo.com/video/ID)
		var vimeoMatch = input.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)|player\.vimeo\.com\/video\/(\d+))/i);
		var vimeoId = vimeoMatch ? (vimeoMatch[2] || vimeoMatch[3]) : null;
		if (vimeoId) {
			return 'https://player.vimeo.com/video/' + vimeoId;
		}

		// Caso já seja uma URL direta válida
		return input;
	}

	// Registro do bloco no Gutenberg
	registerBlockType('periodic/video-embed', {
		title: __('Periodic - Vídeo Incorporado', 'periodic-video-embed'),
		description: __('Incorpore vídeos do YouTube, Vimeo ou iframes com proporções personalizáveis, bordas e sombras.', 'periodic-video-embed'),
		icon: blockIcon,
		category: 'embed',
		keywords: [
			__('video', 'periodic-video-embed'),
			__('youtube', 'periodic-video-embed'),
			__('vimeo', 'periodic-video-embed'),
			__('embed', 'periodic-video-embed'),
			__('player', 'periodic-video-embed')
		],
		supports: {
			align: ['center', 'wide', 'full'],
			html: false
		},
		attributes: {
			videoUrl: {
				type: 'string',
				default: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
			},
			embedUrl: {
				type: 'string',
				default: 'https://www.youtube.com/embed/jNQXAC9IVRw?rel=0'
			},
			caption: {
				type: 'string',
				default: ''
			},
			aspectRatio: {
				type: 'string',
				default: '16-9'
			},
			maxWidth: {
				type: 'number',
				default: 800
			},
			borderRadius: {
				type: 'number',
				default: 8
			},
			hasShadow: {
				type: 'boolean',
				default: true
			}
		},

		/**
		 * Renderização no Editor Gutenberg (edit)
		 */
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var isSelected = props.isSelected;

			function onUrlChange(newUrl) {
				var formattedEmbedUrl = parseVideoUrl(newUrl);
				setAttributes({
					videoUrl: newUrl,
					embedUrl: formattedEmbedUrl
				});
			}

			// Proporção selecionada e classes CSS correspondentes
			var aspectClass = 'is-aspect-' + (attributes.aspectRatio || '16-9');
			var shadowClass = attributes.hasShadow ? ' has-shadow' : '';
			var containerClasses = 'periodic-video-responsive-container ' + aspectClass + shadowClass;

			// Painel Lateral de Configurações (InspectorControls)
			var inspector = el(
				InspectorControls,
				{ key: 'inspector' },
				el(
					PanelBody,
					{
						title: __('Configurações do Vídeo', 'periodic-video-embed'),
						initialOpen: true
					},
					el(TextControl, {
						label: __('URL do Vídeo ou Código de Incorporação', 'periodic-video-embed'),
						help: __('Cole a URL do YouTube, Vimeo ou a tag <iframe> completa.', 'periodic-video-embed'),
						value: attributes.videoUrl,
						onChange: onUrlChange
					}),
					el(SelectControl, {
						label: __('Proporção da Tela (Aspect Ratio)', 'periodic-video-embed'),
						value: attributes.aspectRatio,
						options: [
							{ label: __('16:9 - Widescreen (Padrão)', 'periodic-video-embed'), value: '16-9' },
							{ label: __('4:3 - Clássico / TV', 'periodic-video-embed'), value: '4-3' },
							{ label: __('1:1 - Quadrado / Feed', 'periodic-video-embed'), value: '1-1' }
						],
						onChange: function (value) {
							setAttributes({ aspectRatio: value });
						}
					})
				),
				el(
					PanelBody,
					{
						title: __('Aparência e Estilo', 'periodic-video-embed'),
						initialOpen: true
					},
					el(RangeControl, {
						label: __('Largura Máxima (px)', 'periodic-video-embed'),
						value: attributes.maxWidth,
						min: 400,
						max: 1200,
						step: 10,
						onChange: function (value) {
							setAttributes({ maxWidth: value });
						}
					}),
					el(RangeControl, {
						label: __('Cantos Arredondados (px)', 'periodic-video-embed'),
						value: attributes.borderRadius,
						min: 0,
						max: 30,
						step: 1,
						onChange: function (value) {
							setAttributes({ borderRadius: value });
						}
					}),
					el(ToggleControl, {
						label: __('Sombra Projetada Suave', 'periodic-video-embed'),
						help: attributes.hasShadow
							? __('Sombra ativada conferindo profundidade visual.', 'periodic-video-embed')
							: __('Sombra desativada.', 'periodic-video-embed'),
						checked: attributes.hasShadow,
						onChange: function (value) {
							setAttributes({ hasShadow: value });
						}
					})
				)
			);

			// Se nenhuma URL foi informada, exibe o componente Placeholder amigável
			if (!attributes.videoUrl || attributes.videoUrl.trim() === '') {
				return [
					inspector,
					el(
						Placeholder,
						{
							key: 'placeholder',
							icon: blockIcon,
							label: __('Vídeo Incorporado Responsivo', 'periodic-video-embed'),
							instructions: __('Insira a URL do YouTube, Vimeo ou tag <iframe> para exibir o player.', 'periodic-video-embed'),
							className: 'periodic-video-placeholder'
						},
						el(
							'div',
							{ className: 'periodic-video-placeholder-form' },
							el(TextControl, {
								placeholder: 'https://www.youtube.com/watch?v=...',
								value: attributes.videoUrl,
								onChange: onUrlChange
							}),
							el(
								Button,
								{
									isPrimary: true,
									onClick: function () {
										if (!attributes.videoUrl) {
											onUrlChange('https://www.youtube.com/watch?v=jNQXAC9IVRw');
										}
									}
								},
								__('Incorporar Vídeo', 'periodic-video-embed')
							)
						)
					)
				];
			}

			// Renderização com preview funcional e edição de legenda
			var activeEmbedUrl = attributes.embedUrl || parseVideoUrl(attributes.videoUrl);

			return [
				inspector,
				el(
					'div',
					{
						key: 'preview-container',
						className: 'periodic-video-embed-wrapper' + (isSelected ? ' is-selected' : ''),
						style: {
							maxWidth: attributes.maxWidth + 'px'
						}
					},
					el(
						'div',
						{
							className: containerClasses,
							style: {
								borderRadius: attributes.borderRadius + 'px'
							}
						},
						el('iframe', {
							src: activeEmbedUrl,
							title: attributes.caption || __('Pré-visualização do Vídeo', 'periodic-video-embed'),
							frameBorder: '0',
							allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
							allowFullScreen: true,
							tabIndex: -1
						}),
						// Overlay suave para evitar que o clique no iframe prenda o ponteiro no editor
						el('div', { className: 'periodic-video-editor-overlay' })
					),
					el(RichText, {
						tagName: 'figcaption',
						className: 'periodic-video-caption',
						placeholder: __('Adicione uma legenda opcional para o vídeo...', 'periodic-video-embed'),
						value: attributes.caption,
						onChange: function (value) {
							setAttributes({ caption: value });
						}
					})
				)
			];
		},

		/**
		 * Renderização pública no Frontend (save)
		 */
		save: function (props) {
			var attributes = props.attributes;
			var aspectClass = 'is-aspect-' + (attributes.aspectRatio || '16-9');
			var shadowClass = attributes.hasShadow ? ' has-shadow' : '';
			var containerClasses = 'periodic-video-responsive-container ' + aspectClass + shadowClass;
			var finalEmbedUrl = attributes.embedUrl || parseVideoUrl(attributes.videoUrl);

			if (!finalEmbedUrl) {
				return null;
			}

			return el(
				'div',
				{
					className: 'periodic-video-embed-wrapper',
					style: {
						maxWidth: attributes.maxWidth + 'px'
					}
				},
				el(
					'div',
					{
						className: containerClasses,
						style: {
							borderRadius: attributes.borderRadius + 'px'
						}
					},
					el('iframe', {
						src: finalEmbedUrl,
						title: attributes.caption || __('Vídeo Incorporado', 'periodic-video-embed'),
						frameBorder: '0',
						allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
						allowFullScreen: true,
						loading: 'lazy'
					})
				),
				attributes.caption && attributes.caption.length > 0
					? el(RichText.Content, {
							tagName: 'figcaption',
							className: 'periodic-video-caption',
							value: attributes.caption
					  })
					: null
			);
		}
	});
})(
	window.wp.blocks,
	window.wp.element,
	window.wp.components,
	window.wp.blockEditor || window.wp.editor,
	window.wp.i18n
);
