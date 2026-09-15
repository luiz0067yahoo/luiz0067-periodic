/**
 * Gutenberg Block: periodic/grafic-torus
 * Vanilla JavaScript (ES5) implementation for native SVG Torus / Donut Chart
 *
 * @package Periodic_Grafic_Torus
 */
(function (blocks, element, components, editor, i18n) {
	'use strict';

	var el = element.createElement;
	var Fragment = element.Fragment;
	var registerBlockType = blocks.registerBlockType;
	var InspectorControls = editor.InspectorControls;
	var RichText = editor.RichText;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
	var RangeControl = components.RangeControl;
	var Button = components.Button;
	var ColorPalette = components.ColorPalette;
	var __ = i18n.__;

	// Palette de cores sugeridas para fatias
	var DEFAULT_PALETTE = [
		{ name: __('Coral Red', 'periodic-grafic-torus'), color: '#f85a68' },
		{ name: __('Vibrant Green', 'periodic-grafic-torus'), color: '#00b038' },
		{ name: __('Purple Violet', 'periodic-grafic-torus'), color: '#7e42d7' },
		{ name: __('Sky Blue', 'periodic-grafic-torus'), color: '#2563eb' },
		{ name: __('Amber Orange', 'periodic-grafic-torus'), color: '#f59e0b' },
		{ name: __('Teal Cyan', 'periodic-grafic-torus'), color: '#06b6d4' },
		{ name: __('Dark Slate', 'periodic-grafic-torus'), color: '#1e293b' }
	];

	/**
	 * Calcula e renderiza os arcos em SVG para os segmentos do Torus
	 */
	function renderTorusSvg(segments, strokeWidth, chartSize) {
		var radius = 72;
		var circumference = 2 * Math.PI * radius; // ~452.389
		var totalValue = 0;
		var i;

		for (i = 0; i < segments.length; i++) {
			totalValue += (parseFloat(segments[i].value) || 0);
		}
		if (totalValue <= 0) {
			totalValue = 1;
		}

		// Espaçamento angular entre fatias (gap)
		var gapLength = segments.length > 1 ? 4.5 : 0;
		var totalGaps = segments.length * gapLength;
		var availableCircumference = Math.max(10, circumference - totalGaps);

		// Ordem visual das fatias no círculo
		// Para o layout de 3 fatias canônico (Coral no topo-direito, Roxo na base, Verde na esquerda)
		var orderedSlices = segments.slice();
		if (
			segments.length === 3 &&
			segments[0].color === '#f85a68' &&
			segments[1].color === '#00b038' &&
			segments[2].color === '#7e42d7'
		) {
			orderedSlices = [segments[0], segments[2], segments[1]];
		}

		var currentOffset = 0;
		var circleElements = [];

		for (i = 0; i < orderedSlices.length; i++) {
			var slice = orderedSlices[i];
			var val = Math.max(0, parseFloat(slice.value) || 0);
			var fraction = val / totalValue;
			var arcLength = fraction * availableCircumference;
			var dashArray = arcLength.toFixed(2) + ' ' + (circumference - arcLength).toFixed(2);
			var dashOffset = (-currentOffset).toFixed(2);

			circleElements.push(
				el('circle', {
					key: 'slice-' + i,
					className: 'periodic-torus-slice',
					cx: 100,
					cy: 100,
					r: radius,
					fill: 'none',
					stroke: slice.color || '#f85a68',
					strokeWidth: strokeWidth || 22,
					strokeDasharray: dashArray,
					strokeDashoffset: dashOffset,
					strokeLinecap: 'butt'
				})
			);

			currentOffset += arcLength + gapLength;
		}

		return el(
			'svg',
			{
				className: 'periodic-torus-chart',
				viewBox: '0 0 200 200',
				style: {
					width: (chartSize || 230) + 'px',
					height: (chartSize || 230) + 'px',
					transform: 'rotate(-72deg)'
				}
			},
			circleElements
		);
	}

	/**
	 * Renderiza a lista de legendas inferior
	 */
	function renderLegendList(segments) {
		return el(
			'ul',
			{ className: 'periodic-torus-legend' },
			segments.map(function (segment, index) {
				var displayVal = (segment.value !== undefined && segment.value !== null) ? String(segment.value) : '0';
				if (displayVal.indexOf('%') === -1) {
					displayVal += '%';
				}

				return el(
					'li',
					{ key: 'legend-' + index, className: 'periodic-torus-legend-item' },
					el('span', {
						className: 'periodic-torus-legend-bullet',
						style: { backgroundColor: segment.color || '#f85a68' }
					}),
					el('span', { className: 'periodic-torus-legend-label' }, segment.label),
					el('span', { className: 'periodic-torus-legend-value' }, displayVal)
				);
			})
		);
	}

	// Registro do Bloco
	registerBlockType('periodic/grafic-torus', {
		title: __('Periodic - Grafic Torus', 'periodic-grafic-torus'),
		description: __(
			'Responsive and modern Torus / Donut SVG chart with center values and interactive legend.',
			'periodic-grafic-torus'
		),
		icon: el(
			'svg',
			{ viewBox: '0 0 24 24', width: 24, height: 24, fill: 'none', stroke: 'currentColor' },
			el('circle', { cx: 12, cy: 12, r: 9, strokeWidth: 3, stroke: '#f85a68' }),
			el('circle', { cx: 12, cy: 12, r: 9, strokeWidth: 3, stroke: '#00b038', strokeDasharray: '18 38' }),
			el('circle', { cx: 12, cy: 12, r: 9, strokeWidth: 3, stroke: '#7e42d7', strokeDasharray: '14 42', strokeDashoffset: '-20' })
		),
		category: 'widgets',
		keywords: [
			__('torus', 'periodic-grafic-torus'),
			__('donut chart', 'periodic-grafic-torus'),
			__('grafico rosca', 'periodic-grafic-torus')
		],
		supports: {
			align: ['center', 'wide', 'full'],
			html: false
		},
		attributes: {
			centerValue: {
				type: 'string',
				default: '256'
			},
			centerLabel: {
				type: 'string',
				default: 'BANNED USERS'
			},
			strokeWidth: {
				type: 'number',
				default: 22
			},
			chartSize: {
				type: 'number',
				default: 230
			},
			segments: {
				type: 'array',
				default: [
					{ label: 'Login Attempts', value: 53, color: '#f85a68' },
					{ label: 'Login Using "admin"', value: 28, color: '#00b038' },
					{ label: 'Login Using "admin"', value: 29, color: '#7e42d7' }
				]
			}
		},

		example: {
			attributes: {
				centerValue: '256',
				centerLabel: 'BANNED USERS',
				strokeWidth: 22,
				chartSize: 230,
				segments: [
					{ label: 'Login Attempts', value: 53, color: '#f85a68' },
					{ label: 'Login Using "admin"', value: 28, color: '#00b038' },
					{ label: 'Login Using "admin"', value: 29, color: '#7e42d7' }
				]
			}
		},

		// Renderização no Editor Gutenberg
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var centerValue = attributes.centerValue;
			var centerLabel = attributes.centerLabel;
			var strokeWidth = attributes.strokeWidth;
			var chartSize = attributes.chartSize;
			var segments = attributes.segments || [];

			// Atualizar atributos de um segmento específico
			function updateSegment(index, key, val) {
				var newSegments = segments.slice();
				newSegments[index] = Object.assign({}, newSegments[index]);
				newSegments[index][key] = val;
				setAttributes({ segments: newSegments });
			}

			// Remover um segmento
			function removeSegment(index) {
				if (segments.length <= 1) {
					return;
				}
				var newSegments = segments.filter(function (_, i) {
					return i !== index;
				});
				setAttributes({ segments: newSegments });
			}

			// Adicionar um novo segmento
			function addSegment() {
				var paletteIndex = segments.length % DEFAULT_PALETTE.length;
				var newSegment = {
					label: __('New Segment', 'periodic-grafic-torus'),
					value: 25,
					color: DEFAULT_PALETTE[paletteIndex].color
				};
				setAttributes({ segments: segments.concat([newSegment]) });
			}

			return el(
				Fragment,
				null,
				// Barra Lateral (InspectorControls)
				el(
					InspectorControls,
					null,
					// Painel de Configurações Gerais
					el(
						PanelBody,
						{ title: __('Chart Settings', 'periodic-grafic-torus'), initialOpen: true },
						el(TextControl, {
							label: __('Center Value', 'periodic-grafic-torus'),
							value: centerValue,
							onChange: function (val) {
								setAttributes({ centerValue: val });
							}
						}),
						el(TextControl, {
							label: __('Center Subtitle', 'periodic-grafic-torus'),
							value: centerLabel,
							onChange: function (val) {
								setAttributes({ centerLabel: val });
							}
						}),
						el(RangeControl, {
							label: __('Ring Thickness', 'periodic-grafic-torus'),
							value: strokeWidth,
							min: 14,
							max: 32,
							onChange: function (val) {
								setAttributes({ strokeWidth: val });
							}
						}),
						el(RangeControl, {
							label: __('Chart Diameter (px)', 'periodic-grafic-torus'),
							value: chartSize,
							min: 180,
							max: 360,
							step: 5,
							onChange: function (val) {
								setAttributes({ chartSize: val });
							}
						})
					),
					// Painel de Gerenciamento de Fatias
					el(
						PanelBody,
						{ title: __('Manage Segments', 'periodic-grafic-torus'), initialOpen: true },
						segments.map(function (segment, index) {
							return el(
								'div',
								{ key: 'seg-control-' + index, className: 'periodic-segment-card' },
								el(
									'div',
									{ className: 'periodic-segment-card-header' },
									el('span', { className: 'periodic-segment-index-badge' }, '#' + (index + 1)),
									el('strong', null, segment.label || __('Segment', 'periodic-grafic-torus')),
									segments.length > 1
										? el(
												Button,
												{
													isDestructive: true,
													isSmall: true,
													className: 'periodic-remove-btn',
													onClick: function () {
														removeSegment(index);
													}
												},
												'✕'
										  )
										: null
								),
								el(TextControl, {
									label: __('Label', 'periodic-grafic-torus'),
									value: segment.label,
									onChange: function (val) {
										updateSegment(index, 'label', val);
									}
								}),
								el(TextControl, {
									label: __('Value / Percentage', 'periodic-grafic-torus'),
									type: 'number',
									value: segment.value,
									onChange: function (val) {
										updateSegment(index, 'value', parseFloat(val) || 0);
									}
								}),
								el(
									'div',
									{ className: 'periodic-color-picker-wrap' },
									el('label', { className: 'components-base-control__label' }, __('Color', 'periodic-grafic-torus')),
									el(ColorPalette, {
										colors: DEFAULT_PALETTE,
										value: segment.color,
										onChange: function (newColor) {
											updateSegment(index, 'color', newColor || '#f85a68');
										}
									})
								)
							);
						}),
						el(
							Button,
							{
								isPrimary: true,
								className: 'periodic-add-segment-btn',
								onClick: addSegment
							},
							__('+ Add Segment', 'periodic-grafic-torus')
						)
					)
				),

				// Preview Interativo no Editor
				el(
					'div',
					{ className: 'periodic-grafic-torus-wrapper' },
					el(
						'div',
						{ className: 'periodic-grafic-torus-card' },
						el(
							'div',
							{
								className: 'periodic-torus-chart-container',
								style: { width: chartSize + 'px', height: chartSize + 'px' }
							},
							renderTorusSvg(segments, strokeWidth, chartSize),
							el(
								'div',
								{ className: 'periodic-torus-center-info' },
								el(RichText, {
									tagName: 'div',
									className: 'periodic-torus-center-value',
									value: centerValue,
									onChange: function (val) {
										setAttributes({ centerValue: val });
									},
									placeholder: '256'
								}),
								el(RichText, {
									tagName: 'div',
									className: 'periodic-torus-center-label',
									value: centerLabel,
									onChange: function (val) {
										setAttributes({ centerLabel: val });
									},
									placeholder: 'BANNED USERS'
								})
							)
						),
						renderLegendList(segments)
					)
				)
			);
		},

		// Renderização para Saída Pública (Frontend)
		save: function (props) {
			var attributes = props.attributes;
			var centerValue = attributes.centerValue;
			var centerLabel = attributes.centerLabel;
			var strokeWidth = attributes.strokeWidth;
			var chartSize = attributes.chartSize;
			var segments = attributes.segments || [];

			return el(
				'div',
				{ className: 'periodic-grafic-torus-wrapper' },
				el(
					'div',
					{ className: 'periodic-grafic-torus-card' },
					el(
						'div',
						{
							className: 'periodic-torus-chart-container',
							style: { width: chartSize + 'px', height: chartSize + 'px' }
						},
						renderTorusSvg(segments, strokeWidth, chartSize),
						el(
							'div',
							{ className: 'periodic-torus-center-info' },
							el('div', { className: 'periodic-torus-center-value' }, centerValue),
							el('div', { className: 'periodic-torus-center-label' }, centerLabel)
						)
					),
					renderLegendList(segments)
				)
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
