/**
 * Antigravity Prompt / Floating Cards - Gutenberg Block Script
 * Package: Periodic_Topic_Title_Text
 * Standard: WordPress Native Global `wp` API (No Bundler Required)
 */

(function (blocks, element, blockEditor, components, i18n) {
	'use strict';

	var el = element.createElement;
	var registerBlockType = blocks.registerBlockType;
	var __ = i18n.__;

	var RichText = blockEditor.RichText;
	var InspectorControls = blockEditor.InspectorControls;
	var ColorPalette = components.ColorPalette;
	var PanelBody = components.PanelBody;
	var RangeControl = components.RangeControl;
	var SelectControl = components.SelectControl;
	var TextControl = components.TextControl;
	var TextareaControl = components.TextareaControl;
	var ToggleControl = components.ToggleControl;

	/**
	 * Convert Hex color to RGBA for dynamic CSS glow variables.
	 */
	function hexToRgba(hex, alpha) {
		if (!hex || typeof hex !== 'string') {
			return 'rgba(99, 102, 241, ' + (alpha || 0.35) + ')';
		}
		var cleanHex = hex.replace('#', '');
		if (cleanHex.length === 3) {
			cleanHex = cleanHex.split('').map(function (c) { return c + c; }).join('');
		}
		if (cleanHex.length !== 6) {
			return 'rgba(99, 102, 241, ' + (alpha || 0.35) + ')';
		}
		var r = parseInt(cleanHex.substring(0, 2), 16);
		var g = parseInt(cleanHex.substring(2, 4), 16);
		var b = parseInt(cleanHex.substring(4, 6), 16);
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (alpha !== undefined ? alpha : 0.35) + ')';
	}

	/**
	 * SVG Icon for Block
	 */
	var blockIcon = el('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' },
		el('path', { d: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' }),
		el('circle', { cx: 12, cy: 12, r: 2, fill: '#fff' })
	);

	/**
	 * Preset Color Swatches
	 */
	var themeColors = [
		{ name: __('Indigo Neon', 'periodic-topic-title-text'), color: '#6366f1' },
		{ name: __('Cyan Antigravity', 'periodic-topic-title-text'), color: '#06b6d4' },
		{ name: __('Emerald AI', 'periodic-topic-title-text'), color: '#10b981' },
		{ name: __('Purple Nebula', 'periodic-topic-title-text'), color: '#a855f7' },
		{ name: __('Amber Energy', 'periodic-topic-title-text'), color: '#f59e0b' },
		{ name: __('Rose Spark', 'periodic-topic-title-text'), color: '#f43f5e' }
	];

	registerBlockType('periodic/topic-title-text', {
		title: __('Antigravity Prompt / Floating Cards', 'periodic-topic-title-text'),
		description: __('Levitating animated floating card with antigravity physics, prompt tags, and interactive actions.', 'periodic-topic-title-text'),
		icon: blockIcon,
		category: 'layout',
		keywords: [
			__('antigravity', 'periodic-topic-title-text'),
			__('prompt card', 'periodic-topic-title-text'),
			__('floating', 'periodic-topic-title-text'),
			__('topic', 'periodic-topic-title-text')
		],
		attributes: {
			title: {
				type: 'string',
				source: 'html',
				selector: '.antigravity-card-title',
				default: 'Estratégia de Prompt Antigravidade'
			},
			content: {
				type: 'string',
				source: 'html',
				selector: '.antigravity-card-content',
				default: '<p>Desenvolva aplicações web modernas com animações de levitação CSS suaves, tipografia refinada e cards flutuantes interativos.</p>'
			},
			tag: {
				type: 'string',
				default: 'PROMPT #01'
			},
			speed: {
				type: 'number',
				default: 5
			},
			delay: {
				type: 'number',
				default: 0
			},
			color: {
				type: 'string',
				default: '#6366f1'
			},
			headingTag: {
				type: 'string',
				default: 'h3'
			},
			cardStyle: {
				type: 'string',
				default: 'glassmorphism'
			},
			alignment: {
				type: 'string',
				default: 'center'
			},
			actionType: {
				type: 'string',
				default: 'copy'
			},
			actionText: {
				type: 'string',
				default: 'Copiar Prompt'
			},
			actionUrl: {
				type: 'string',
				default: ''
			},
			promptToCopy: {
				type: 'string',
				default: ''
			},
			showShadow: {
				type: 'boolean',
				default: true
			}
		},

		example: {
			attributes: {
				title: 'Estratégia de Prompt Antigravidade',
				content: '<p>Exemplo de card flutuante com levitação CSS suave e tag destacada.</p>',
				tag: 'IA PROMPT',
				speed: 5,
				delay: 0,
				color: '#6366f1',
				cardStyle: 'glassmorphism',
				actionType: 'copy',
				actionText: 'Copiar Prompt'
			}
		},

		/**
		 * Edit component (WYSIWYG in Gutenberg canvas)
		 */
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			var cardStyles = {
				'--ag-color': attributes.color,
				'--ag-speed': attributes.speed + 's',
				'--ag-delay': attributes.delay + 's',
				'--ag-glow': hexToRgba(attributes.color, 0.35)
			};

			var outerClasses = [
				'antigravity-card-outer',
				'align-' + attributes.alignment,
				props.className
			].filter(Boolean).join(' ');

			var innerClasses = [
				'antigravity-card-inner',
				'style-' + attributes.cardStyle
			].join(' ');

			return [
				// Inspector Sidebar Controls
				el(InspectorControls, { key: 'inspector' },
					// Panel 1: Card Configuration
					el(PanelBody, { title: __('Configuração do Card', 'periodic-topic-title-text'), initialOpen: true },
						el(TextControl, {
							label: __('Tag / Badge do Prompt', 'periodic-topic-title-text'),
							value: attributes.tag,
							onChange: function (val) { setAttributes({ tag: val }); }
						}),
						el(SelectControl, {
							label: __('Nível do Título', 'periodic-topic-title-text'),
							value: attributes.headingTag,
							options: [
								{ label: 'H2', value: 'h2' },
								{ label: 'H3', value: 'h3' },
								{ label: 'H4', value: 'h4' },
								{ label: 'H5', value: 'h5' }
							],
							onChange: function (val) { setAttributes({ headingTag: val }); }
						}),
						el(SelectControl, {
							label: __('Estilo Visual do Card', 'periodic-topic-title-text'),
							value: attributes.cardStyle,
							options: [
								{ label: __('Glassmorphism (Vidro Fosco)', 'periodic-topic-title-text'), value: 'glassmorphism' },
								{ label: __('Dark Neon (Escuro Futurista)', 'periodic-topic-title-text'), value: 'dark-neon' },
								{ label: __('Cyber Glow (Borda Iluminada)', 'periodic-topic-title-text'), value: 'cyber-glow' },
								{ label: __('Minimal Clean (Minimalista)', 'periodic-topic-title-text'), value: 'minimal' }
							],
							onChange: function (val) { setAttributes({ cardStyle: val }); }
						}),
						el(SelectControl, {
							label: __('Alinhamento', 'periodic-topic-title-text'),
							value: attributes.alignment,
							options: [
								{ label: __('Centro', 'periodic-topic-title-text'), value: 'center' },
								{ label: __('Esquerda', 'periodic-topic-title-text'), value: 'left' },
								{ label: __('Direita', 'periodic-topic-title-text'), value: 'right' }
							],
							onChange: function (val) { setAttributes({ alignment: val }); }
						})
					),

					// Panel 2: Antigravity Physics
					el(PanelBody, { title: __('Física de Antigravidade (Levitação)', 'periodic-topic-title-text'), initialOpen: true },
						el(RangeControl, {
							label: __('Velocidade do Ciclo (Segundos)', 'periodic-topic-title-text'),
							value: attributes.speed,
							onChange: function (val) { setAttributes({ speed: val }); },
							min: 2,
							max: 15,
							step: 0.5,
							help: __('Quanto maior o tempo, mais suave e lenta é a flutuação.', 'periodic-topic-title-text')
						}),
						el(RangeControl, {
							label: __('Atraso de Início / Delay (Segundos)', 'periodic-topic-title-text'),
							value: attributes.delay,
							onChange: function (val) { setAttributes({ delay: val }); },
							min: 0,
							max: 10,
							step: 0.2,
							help: __('Permite descompassar múltiplos cards para flutuarem em tempos diferentes.', 'periodic-topic-title-text')
						}),
						el(ToggleControl, {
							label: __('Exibir Sombra de Profundidade no Chão', 'periodic-topic-title-text'),
							checked: attributes.showShadow,
							onChange: function (val) { setAttributes({ showShadow: val }); }
						})
					),

					// Panel 3: Colors
					el(PanelBody, { title: __('Cor de Destaque & Brilho', 'periodic-topic-title-text'), initialOpen: false },
						el(ColorPalette, {
							colors: themeColors,
							value: attributes.color,
							onChange: function (newColor) {
								if (newColor) {
									setAttributes({ color: newColor });
								}
							}
						})
					),

					// Panel 4: Actions & Prompt
					el(PanelBody, { title: __('Ação do Card & Prompt', 'periodic-topic-title-text'), initialOpen: false },
						el(SelectControl, {
							label: __('Tipo de Ação', 'periodic-topic-title-text'),
							value: attributes.actionType,
							options: [
								{ label: __('Copiar Prompt (Clipboard)', 'periodic-topic-title-text'), value: 'copy' },
								{ label: __('Link / Redirecionamento', 'periodic-topic-title-text'), value: 'link' },
								{ label: __('Nenhuma Ação', 'periodic-topic-title-text'), value: 'none' }
							],
							onChange: function (val) { setAttributes({ actionType: val }); }
						}),
						attributes.actionType !== 'none' && el(TextControl, {
							label: __('Texto do Botão', 'periodic-topic-title-text'),
							value: attributes.actionText,
							onChange: function (val) { setAttributes({ actionText: val }); }
						}),
						attributes.actionType === 'link' && el(TextControl, {
							label: __('URL de Destino', 'periodic-topic-title-text'),
							value: attributes.actionUrl,
							placeholder: 'https://...',
							onChange: function (val) { setAttributes({ actionUrl: val }); }
						}),
						attributes.actionType === 'copy' && el(TextareaControl, {
							label: __('Prompt Personalizado para Cópia (Opcional)', 'periodic-topic-title-text'),
							value: attributes.promptToCopy,
							placeholder: __('Deixe vazio para copiar automaticamente o texto da descrição.', 'periodic-topic-title-text'),
							onChange: function (val) { setAttributes({ promptToCopy: val }); }
						})
					)
				),

				// Editor WYSIWYG Rendering
				el('div', { className: outerClasses, style: cardStyles, key: 'antigravity-preview' },
					// Levitating Body
					el('div', { className: 'antigravity-card-float' },
						el('div', { className: innerClasses },
							el('div', { className: 'antigravity-accent-line' }),

							// Header with Tag Badge
							el('div', { className: 'antigravity-card-header' },
								el('span', { className: 'antigravity-tag-badge' },
									el('span', { className: 'antigravity-pulse-dot' }),
									attributes.tag || __('PROMPT', 'periodic-topic-title-text')
								)
							),

							// Title
							el(RichText, {
								tagName: attributes.headingTag,
								className: 'antigravity-card-title',
								value: attributes.title,
								placeholder: __('Título do Card...', 'periodic-topic-title-text'),
								onChange: function (val) { setAttributes({ title: val }); },
								allowedFormats: ['core/bold', 'core/italic']
							}),

							// Description / Content
							el(RichText, {
								tagName: 'div',
								className: 'antigravity-card-content',
								value: attributes.content,
								placeholder: __('Descrição ou prompt...', 'periodic-topic-title-text'),
								onChange: function (val) { setAttributes({ content: val }); },
								multiline: 'p'
							}),

							// Action Button Preview
							attributes.actionType !== 'none' && el('div', { className: 'antigravity-card-action' },
								el('button', {
									type: 'button',
									className: 'antigravity-action-btn antigravity-action-btn-editor',
									disabled: true
								},
									attributes.actionType === 'copy' && el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
										el('path', { d: 'M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z' })
									),
									attributes.actionType === 'link' && el('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
										el('path', { d: 'M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z' })
									),
									attributes.actionText || __('Ação', 'periodic-topic-title-text')
								)
							)
						)
					),

					// Ground Depth Shadow
					attributes.showShadow && el('div', { className: 'antigravity-ground-shadow' })
				)
			];
		},

		/**
		 * Save component (100% WYSIWYG matching frontend structure)
		 */
		save: function (props) {
			var attributes = props.attributes;

			var cardStyles = {
				'--ag-color': attributes.color,
				'--ag-speed': attributes.speed + 's',
				'--ag-delay': attributes.delay + 's',
				'--ag-glow': hexToRgba(attributes.color, 0.35)
			};

			var outerClasses = [
				'antigravity-card-outer',
				'align-' + attributes.alignment
			].join(' ');

			var innerClasses = [
				'antigravity-card-inner',
				'style-' + attributes.cardStyle
			].join(' ');

			var copyDataPayload = attributes.promptToCopy && attributes.promptToCopy.trim().length > 0
				? attributes.promptToCopy
				: '';

			return el('div', { className: outerClasses, style: cardStyles },
				// Floating Element
				el('div', { className: 'antigravity-card-float' },
					el('div', { className: innerClasses },
						el('div', { className: 'antigravity-accent-line' }),

						// Card Header with Tag Badge
						el('div', { className: 'antigravity-card-header' },
							el('span', { className: 'antigravity-tag-badge' },
								el('span', { className: 'antigravity-pulse-dot' }),
								attributes.tag
							)
						),

						// Heading Title
						el(RichText.Content, {
							tagName: attributes.headingTag,
							className: 'antigravity-card-title',
							value: attributes.title
						}),

						// Description / Content
						el(RichText.Content, {
							tagName: 'div',
							className: 'antigravity-card-content',
							value: attributes.content
						}),

						// Action Element
						attributes.actionType !== 'none' && el('div', { className: 'antigravity-card-action' },
							attributes.actionType === 'copy' && el('button', {
								type: 'button',
								className: 'antigravity-action-btn',
								'data-antigravity-action': 'copy',
								'data-prompt': copyDataPayload,
								'aria-label': attributes.actionText || __('Copiar Prompt', 'periodic-topic-title-text')
							},
								el('svg', { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' },
									el('path', { d: 'M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z' })
								),
								el('span', { className: 'antigravity-btn-label' }, attributes.actionText),
								el('span', { className: 'antigravity-feedback-toast', role: 'status', 'aria-live': 'polite' }, __('Copiado!', 'periodic-topic-title-text'))
							),

							attributes.actionType === 'link' && el('a', {
								href: attributes.actionUrl || '#',
								className: 'antigravity-action-btn',
								target: '_blank',
								rel: 'noopener noreferrer'
							},
								el('svg', { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' },
									el('path', { d: 'M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z' })
								),
								el('span', { className: 'antigravity-btn-label' }, attributes.actionText)
							)
						)
					)
				),

				// Ground Shadow
				attributes.showShadow && el('div', { className: 'antigravity-ground-shadow' })
			);
		}
	});
})(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor || window.wp.editor,
	window.wp.components,
	window.wp.i18n
);
