/**
 * periodic Separator - Gutenberg Custom Block
 * 
 * Custom block for flexible, responsive content dividers.
 * Based on the reference cms-adm/separator from Prefeitura / customADM,
 * updated with modern InspectorControls, line styles, dimensions and full backwards compatibility.
 *
 * @package Periodic_Separator
 * @version 1.0.0
 */

(function (wp) {
	'use strict';

	if (!wp || !wp.blocks || !wp.blocks.registerBlockType || !wp.element) {
		return;
	}

	var el = wp.element.createElement;
	var __ = (wp.i18n && wp.i18n.__) ? wp.i18n.__ : function (text) { return text; };

	// Safe references to editor and component modules
	var blockEditor = wp.blockEditor || wp.editor;
	var InspectorControls = blockEditor ? blockEditor.InspectorControls : null;
	var BlockControls = blockEditor ? blockEditor.BlockControls : null;
	var AlignmentToolbar = blockEditor ? (blockEditor.AlignmentToolbar || blockEditor.BlockAlignmentToolbar) : null;

	var components = wp.components || {};
	var PanelBody = components.PanelBody || null;
	var PanelRow = components.PanelRow || null;
	var SelectControl = components.SelectControl || null;
	var RangeControl = components.RangeControl || null;
	var ColorPalette = components.ColorPalette || null;
	var ToggleControl = components.ToggleControl || null;

	// Ícone personalizado SVG para o bloco
	var separatorIcon = el('svg', {
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		xmlns: 'http://www.w3.org/2000/svg'
	},
		el('rect', { x: 2, y: 11, width: 20, height: 2, rx: 1, fill: '#01913a' }),
		el('circle', { cx: 12, cy: 12, r: 3, fill: '#01913a' })
	);

	// Paleta de cores com destaque para a cor institucional prefeitura (#01913a)
	var colorPaletteList = [
		{ name: __('Verde Institucional', 'periodic-separator'), color: '#01913a' },
		{ name: __('Verde Escuro', 'periodic-separator'), color: '#006828' },
		{ name: __('Verde Esmeralda', 'periodic-separator'), color: '#10b981' },
		{ name: __('Grafite Escuro', 'periodic-separator'), color: '#333333' },
		{ name: __('Azul', 'periodic-separator'), color: '#57a7ed' },
		{ name: __('Azul Escuro', 'periodic-separator'), color: '#233e95' },
		{ name: __('Coral / Vermelho', 'periodic-separator'), color: '#f08f86' },
		{ name: __('Dourado / Amarelo', 'periodic-separator'), color: '#e5b624' },
		{ name: __('Roxo', 'periodic-separator'), color: '#622d8f' },
		{ name: __('Cinza Médio', 'periodic-separator'), color: '#6c757d' },
		{ name: __('Cinza Claro', 'periodic-separator'), color: '#e2e8f0' },
		{ name: __('Preto', 'periodic-separator'), color: '#000000' }
	];

	// Definição de atributos do bloco
	var blockAttributes = {
		styleType: {
			type: 'string',
			default: 'separator-green'
		},
		color: {
			type: 'string',
			default: '#01913a'
		},
		secondaryColor: {
			type: 'string',
			default: '#10b981'
		},
		width: {
			type: 'number',
			default: 80
		},
		height: {
			type: 'number',
			default: 3
		},
		alignment: {
			type: 'string',
			default: 'center'
		},
		marginTop: {
			type: 'number',
			default: 30
		},
		marginBottom: {
			type: 'number',
			default: 30
		},
		borderRadius: {
			type: 'number',
			default: 2
		},
		opacity: {
			type: 'number',
			default: 100
		},
		hasIcon: {
			type: 'boolean',
			default: false
		},
		iconSymbol: {
			type: 'string',
			default: '◆'
		}
	};

	/**
	 * Configuração unificada do bloco
	 */
	var blockDefinition = {
		title: __('Separador', 'periodic-separator'),
		icon: separatorIcon,
		category: 'design',
		keywords: [
			__('separador', 'periodic-separator'),
			__('divisor', 'periodic-separator'),
			__('linha', 'periodic-separator'),
			__('divider', 'periodic-separator')
		],
		description: __('O separador divide os conteúdos por uma linha elegante e personalizável.', 'periodic-separator'),
		supports: {
			multiple: true,
			align: ['left', 'center', 'right', 'wide', 'full']
		},
		example: {
			attributes: {
				styleType: 'separator-green',
				color: '#01913a',
				width: 80,
				height: 3,
				alignment: 'center'
			}
		},
		attributes: blockAttributes,

		/**
		 * Renderização no Editor do Gutenberg
		 */
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			var styleType = attributes.styleType || 'separator-green';
			var color = attributes.color || '#01913a';
			var secondaryColor = attributes.secondaryColor || '#10b981';
			var width = (attributes.width !== undefined) ? attributes.width : 80;
			var height = (attributes.height !== undefined) ? attributes.height : 3;
			var alignment = attributes.alignment || 'center';
			var marginTop = (attributes.marginTop !== undefined) ? attributes.marginTop : 30;
			var marginBottom = (attributes.marginBottom !== undefined) ? attributes.marginBottom : 30;
			var borderRadius = (attributes.borderRadius !== undefined) ? attributes.borderRadius : 2;
			var opacity = (attributes.opacity !== undefined) ? attributes.opacity : 100;
			var hasIcon = !!attributes.hasIcon;
			var iconSymbol = attributes.iconSymbol || '◆';

			// Sincroniza alinhamento nativo do Gutenberg (se selecionado via toolbar do bloco)
			if (props.attributes.align && props.attributes.align !== alignment) {
				if (['left', 'center', 'right'].indexOf(props.attributes.align) !== -1) {
					alignment = props.attributes.align;
				}
			}

			// Barra de Ferramentas Flutuante (BlockControls)
			var toolbarElement = BlockControls && el(BlockControls, null,
				AlignmentToolbar && el(AlignmentToolbar, {
					value: alignment,
					onChange: function (newAlign) {
						setAttributes({ alignment: newAlign || 'center' });
					}
				})
			);

			// Barra Lateral de Configurações (InspectorControls)
			var inspectorElement = InspectorControls && el(InspectorControls, null,
				// Painel 1: Estilo e Cor
				el(PanelBody, {
					title: __('Estilo e Cor', 'periodic-separator'),
					initialOpen: true
				},
					el(SelectControl, {
						label: __('Modelo do Separador', 'periodic-separator'),
						value: styleType,
						options: [
							{ label: __('Verde Institucional (Prefeitura)', 'periodic-separator'), value: 'separator-green' },
							{ label: __('Linha Sólida', 'periodic-separator'), value: 'solid' },
							{ label: __('Linha Tracejada (Dashed)', 'periodic-separator'), value: 'dashed' },
							{ label: __('Linha Pontilhada (Dotted)', 'periodic-separator'), value: 'dotted' },
							{ label: __('Linha Dupla (Double)', 'periodic-separator'), value: 'double' },
							{ label: __('Gradiente Moderno', 'periodic-separator'), value: 'gradient' },
							{ label: __('Linha com Sombra', 'periodic-separator'), value: 'shadow' },
							{ label: __('Três Pontos Decorativos', 'periodic-separator'), value: 'dots' }
						],
						onChange: function (newStyle) {
							setAttributes({ styleType: newStyle });
						}
					}),
					el('p', { className: 'components-base-control__label' }, __('Cor Principal', 'periodic-separator')),
					ColorPalette && el(ColorPalette, {
						colors: colorPaletteList,
						value: color,
						onChange: function (newColor) {
							setAttributes({ color: newColor || '#01913a' });
						}
					}),
					// Cor secundária se o estilo for gradiente
					styleType === 'gradient' && el(wp.element.Fragment, null,
						el('p', { className: 'components-base-control__label', style: { marginTop: '12px' } }, __('Cor Secundária (Gradiente)', 'periodic-separator')),
						ColorPalette && el(ColorPalette, {
							colors: colorPaletteList,
							value: secondaryColor,
							onChange: function (newSecColor) {
								setAttributes({ secondaryColor: newSecColor || '#10b981' });
							}
						})
					),
					el(RangeControl, {
						label: __('Opacidade (%)', 'periodic-separator'),
						value: opacity,
						onChange: function (val) {
							setAttributes({ opacity: val });
						},
						min: 10,
						max: 100,
						step: 5
					})
				),

				// Painel 2: Dimensões e Alinhamento
				el(PanelBody, {
					title: __('Dimensões e Posição', 'periodic-separator'),
					initialOpen: false
				},
					el(RangeControl, {
						label: __('Largura (%)', 'periodic-separator'),
						value: width,
						onChange: function (val) {
							setAttributes({ width: val });
						},
						min: 10,
						max: 100,
						step: 5
					}),
					styleType !== 'dots' && el(RangeControl, {
						label: __('Espessura / Altura (px)', 'periodic-separator'),
						value: height,
						onChange: function (val) {
							setAttributes({ height: val });
						},
						min: 1,
						max: 20,
						step: 1
					}),
					(styleType === 'solid' || styleType === 'separator-green' || styleType === 'gradient' || styleType === 'shadow') && el(RangeControl, {
						label: __('Arredondamento dos Cantos (px)', 'periodic-separator'),
						value: borderRadius,
						onChange: function (val) {
							setAttributes({ borderRadius: val });
						},
						min: 0,
						max: 20,
						step: 1
					}),
					el(SelectControl, {
						label: __('Alinhamento Horizontal', 'periodic-separator'),
						value: alignment,
						options: [
							{ label: __('Centralizado', 'periodic-separator'), value: 'center' },
							{ label: __('Alinhado à Esquerda', 'periodic-separator'), value: 'left' },
							{ label: __('Alinhado à Direita', 'periodic-separator'), value: 'right' }
						],
						onChange: function (newAlign) {
							setAttributes({ alignment: newAlign });
						}
					}),
					el(RangeControl, {
						label: __('Espaçamento Superior (px)', 'periodic-separator'),
						value: marginTop,
						onChange: function (val) {
							setAttributes({ marginTop: val });
						},
						min: 0,
						max: 100,
						step: 5
					}),
					el(RangeControl, {
						label: __('Espaçamento Inferior (px)', 'periodic-separator'),
						value: marginBottom,
						onChange: function (val) {
							setAttributes({ marginBottom: val });
						},
						min: 0,
						max: 100,
						step: 5
					})
				),

				// Painel 3: Símbolo Central (Opcional)
				styleType !== 'dots' && el(PanelBody, {
					title: __('Símbolo Central (Decorativo)', 'periodic-separator'),
					initialOpen: false
				},
					el(ToggleControl, {
						label: __('Exibir símbolo no centro', 'periodic-separator'),
						checked: hasIcon,
						onChange: function (val) {
							setAttributes({ hasIcon: val });
						}
					}),
					hasIcon && el(SelectControl, {
						label: __('Escolha o Símbolo', 'periodic-separator'),
						value: iconSymbol,
						options: [
							{ label: __('Losango (◆)', 'periodic-separator'), value: '◆' },
							{ label: __('Estrela (★)', 'periodic-separator'), value: '★' },
							{ label: __('Círculo (●)', 'periodic-separator'), value: '●' },
							{ label: __('Flor / Cruz (✤)', 'periodic-separator'), value: '✤' },
							{ label: __('Quadrado (■)', 'periodic-separator'), value: '■' },
							{ label: __('Coração (♥)', 'periodic-separator'), value: '♥' },
							{ label: __('Folha (❧)', 'periodic-separator'), value: '❧' }
						],
						onChange: function (newSym) {
							setAttributes({ iconSymbol: newSym });
						}
					})
				)
			);

			// Objeto de estilos inline dinâmicos para a pré-visualização fiel
			var wrapperStyle = {
				marginTop: marginTop + 'px',
				marginBottom: marginBottom + 'px'
			};

			var customCssVars = {
				'--separator-color': color,
				'--separator-secondary-color': secondaryColor,
				'--separator-width': width + '%',
				'--separator-height': height + 'px',
				'--separator-radius': borderRadius + 'px',
				'--separator-opacity': (opacity / 100).toString(),
				'--separator-margin-top': marginTop + 'px',
				'--separator-margin-bottom': marginBottom + 'px'
			};

			var separatorStyle = Object.assign({
				width: width + '%'
			}, customCssVars);

			// Montagem do elemento visual
			var separatorNode;
			var baseClassName = 'periodic-separator style-' + styleType;

			// Adiciona a classe clássica .separator-green se o estilo for o institucional
			if (styleType === 'separator-green') {
				baseClassName += ' separator-green';
			}

			if (hasIcon) {
				separatorNode = el('div', {
					className: 'periodic-separator-with-icon style-' + styleType,
					style: separatorStyle
				},
					el('span', { className: 'separator-line' }),
					el('span', { className: 'separator-symbol' }, iconSymbol),
					el('span', { className: 'separator-line' })
				);
			} else if (styleType === 'dots') {
				separatorNode = el('div', {
					className: baseClassName,
					style: separatorStyle
				},
					el('span', { className: 'dot-center' })
				);
			} else {
				separatorNode = el('div', {
					className: baseClassName,
					style: separatorStyle
				});
			}

			return el(wp.element.Fragment, null,
				toolbarElement,
				inspectorElement,
				el('div', {
					className: 'periodic-separator-editor-container periodic-separator-wrap separator-align-' + alignment,
					style: wrapperStyle
				}, separatorNode)
			);
		},

		/**
		 * Renderização no Frontend (HTML salvo no banco de dados)
		 */
		save: function (props) {
			var attributes = props.attributes;
			var styleType = attributes.styleType || 'separator-green';
			var color = attributes.color || '#01913a';
			var secondaryColor = attributes.secondaryColor || '#10b981';
			var width = (attributes.width !== undefined) ? attributes.width : 80;
			var height = (attributes.height !== undefined) ? attributes.height : 3;
			var alignment = attributes.alignment || 'center';
			var marginTop = (attributes.marginTop !== undefined) ? attributes.marginTop : 30;
			var marginBottom = (attributes.marginBottom !== undefined) ? attributes.marginBottom : 30;
			var borderRadius = (attributes.borderRadius !== undefined) ? attributes.borderRadius : 2;
			var opacity = (attributes.opacity !== undefined) ? attributes.opacity : 100;
			var hasIcon = !!attributes.hasIcon;
			var iconSymbol = attributes.iconSymbol || '◆';

			var wrapperStyle = {
				marginTop: marginTop + 'px',
				marginBottom: marginBottom + 'px'
			};

			var customCssVars = {
				'--separator-color': color,
				'--separator-secondary-color': secondaryColor,
				'--separator-width': width + '%',
				'--separator-height': height + 'px',
				'--separator-radius': borderRadius + 'px',
				'--separator-opacity': (opacity / 100).toString()
			};

			var separatorStyle = Object.assign({
				width: width + '%'
			}, customCssVars);

			var baseClassName = 'periodic-separator style-' + styleType;
			if (styleType === 'separator-green') {
				baseClassName += ' separator-green';
			}

			var separatorNode;
			if (hasIcon) {
				separatorNode = el('div', {
					className: 'periodic-separator-with-icon style-' + styleType,
					style: separatorStyle
				},
					el('span', { className: 'separator-line' }),
					el('span', { className: 'separator-symbol' }, iconSymbol),
					el('span', { className: 'separator-line' })
				);
			} else if (styleType === 'dots') {
				separatorNode = el('div', {
					className: baseClassName,
					style: separatorStyle
				},
					el('span', { className: 'dot-center' })
				);
			} else {
				separatorNode = el('div', {
					className: baseClassName,
					style: separatorStyle
				});
			}

			return el('div', {
				className: 'periodic-separator-wrap separator-align-' + alignment,
				style: wrapperStyle
			}, separatorNode);
		}
	};

	// 1. Registro do bloco oficial moderno: periodic/separator
	wp.blocks.registerBlockType('periodic/separator', blockDefinition);

	// 2. Registro de compatibilidade / alias para cms-adm/separator (caso não tenha sido registrado)
	if (!wp.blocks.getBlockType('cms-adm/separator')) {
		wp.blocks.registerBlockType('cms-adm/separator', Object.assign({}, blockDefinition, {
			title: __('Separador (cms-adm)', 'periodic-separator'),
			description: __('Separador compatível com customADM / prefeitura.', 'periodic-separator')
		}));
	}

})(window.wp);
