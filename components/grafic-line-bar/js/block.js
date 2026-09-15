/**
 * Gutenberg Blocks: Periodic - Grafic Line Bar & Torus
 * Vanilla JavaScript (ES5) implementation for native SVG Charts
 *
 * @package Periodic_Grafic_Line_Bar
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
	var ToggleControl = components.ToggleControl;
	var Button = components.Button;
	var ColorPalette = components.ColorPalette;
	var __ = i18n.__;

	// Paletas de cores sugeridas
	var LINE_BAR_PALETTE = [
		{ name: __('Vibrant Blue', 'periodic-grafic-line-bar'), color: '#1058d0' },
		{ name: __('Soft Pastel Blue', 'periodic-grafic-line-bar'), color: '#cad9f7' },
		{ name: __('Emerald Green', 'periodic-grafic-line-bar'), color: '#10b981' },
		{ name: __('Soft Green', 'periodic-grafic-line-bar'), color: '#d1fae5' },
		{ name: __('Violet Purple', 'periodic-grafic-line-bar'), color: '#8b5cf6' },
		{ name: __('Soft Purple', 'periodic-grafic-line-bar'), color: '#ede9fe' },
		{ name: __('Amber Orange', 'periodic-grafic-line-bar'), color: '#f59e0b' },
		{ name: __('Soft Amber', 'periodic-grafic-line-bar'), color: '#fef3c7' },
		{ name: __('Slate Dark', 'periodic-grafic-line-bar'), color: '#1e293b' }
	];

	var TORUS_PALETTE = [
		{ name: __('Coral Red', 'periodic-grafic-line-bar'), color: '#f85a68' },
		{ name: __('Vibrant Green', 'periodic-grafic-line-bar'), color: '#00b038' },
		{ name: __('Purple Violet', 'periodic-grafic-line-bar'), color: '#7e42d7' },
		{ name: __('Sky Blue', 'periodic-grafic-line-bar'), color: '#2563eb' },
		{ name: __('Amber Orange', 'periodic-grafic-line-bar'), color: '#f59e0b' },
		{ name: __('Teal Cyan', 'periodic-grafic-line-bar'), color: '#06b6d4' },
		{ name: __('Dark Slate', 'periodic-grafic-line-bar'), color: '#1e293b' }
	];

	/* ==========================================================================
	   FUNÇÕES AUXILIARES: Gráfico de Linha + Barras
	   ========================================================================== */

	/**
	 * Calcula e renderiza o SVG do Gráfico de Linha + Barras
	 */
	function renderLineBarSvg(items, barColor, lineColor, showBars, showLine, showPoints, maxY) {
		var svgWidth = 360;
		var svgHeight = 220;
		var padLeft = 46;
		var padRight = 14;
		var padTop = 18;
		var padBottom = 22;

		var chartW = svgWidth - padLeft - padRight;
		var chartH = svgHeight - padTop - padBottom;

		var safeMaxY = parseFloat(maxY) || 90;
		if (safeMaxY <= 0) {
			safeMaxY = 90;
		}

		// Linhas de Grade e Eixo Y: 0, 30, 60, 90 (ou 4 passos proporcionais)
		var gridTicks = [
			0,
			Math.round(safeMaxY / 3),
			Math.round((safeMaxY * 2) / 3),
			Math.round(safeMaxY)
		];

		var gridElements = [];
		for (var t = 0; t < gridTicks.length; t++) {
			var tickVal = gridTicks[t];
			var tickY = padTop + chartH - (tickVal / safeMaxY) * chartH;

			// Linha horizontal tracejada
			gridElements.push(
				el('line', {
					key: 'grid-line-' + t,
					className: 'periodic-grid-line',
					x1: padLeft + 6,
					y1: tickY,
					x2: svgWidth - padRight,
					y2: tickY
				})
			);

			// Rótulo do eixo Y
			gridElements.push(
				el(
					'text',
					{
						key: 'grid-label-' + t,
						className: 'periodic-axis-label',
						x: padLeft - 6,
						y: tickY
					},
					tickVal.toString()
				)
			);
		}

		// Cálculo dos pontos e barras
		var count = items.length > 0 ? items.length : 1;
		var stepX = chartW / count;
		var barWidth = Math.max(14, Math.min(22, stepX * 0.56));
		var rx = barWidth / 2;

		var barElements = [];
		var linePoints = [];
		var pointElements = [];

		for (var i = 0; i < items.length; i++) {
			var val = Math.max(0, Math.min(safeMaxY * 1.05, parseFloat(items[i].value) || 0));
			var cx = padLeft + (i + 0.5) * stepX;
			var barH = (val / safeMaxY) * chartH;
			var topY = padTop + chartH - barH;

			// Guardar coordenada para a linha
			linePoints.push({ x: cx, y: topY });

			// Barras em formato pílula
			if (showBars && barH > 2) {
				barElements.push(
					el('rect', {
						key: 'bar-' + i,
						className: 'periodic-chart-bar',
						x: cx - barWidth / 2,
						y: topY,
						width: barWidth,
						height: barH,
						rx: rx,
						ry: rx,
						fill: barColor || '#cad9f7'
					})
				);
			}

			// Marcador circular vazado
			if (showPoints) {
				pointElements.push(
					el(
						'circle',
						{
							key: 'point-' + i,
							className: 'periodic-chart-point',
							cx: cx,
							cy: topY,
							r: 4.2,
							stroke: lineColor || '#1058d0',
							strokeWidth: 2.4
						},
						el('title', null, (items[i].label ? items[i].label + ': ' : '') + items[i].value)
					)
				);
			}
		}

		// Linha SVG conectando os pontos
		var lineElement = null;
		if (showLine && linePoints.length > 1) {
			var polylinePoints = linePoints
				.map(function (p) {
					return p.x.toFixed(1) + ',' + p.y.toFixed(1);
				})
				.join(' ');

			lineElement = el('polyline', {
				className: 'periodic-chart-line',
				points: polylinePoints,
				stroke: lineColor || '#1058d0',
				strokeWidth: 2.6
			});
		}

		return el(
			'svg',
			{
				className: 'periodic-line-bar-svg',
				viewBox: '0 0 ' + svgWidth + ' ' + svgHeight,
				preserveAspectRatio: 'xMidYMid meet'
			},
			gridElements,
			barElements,
			lineElement,
			pointElements
		);
	}

	/* ==========================================================================
	   FUNÇÕES AUXILIARES: Gráfico Torus / Donut
	   ========================================================================== */

	/**
	 * Calcula e renderiza os arcos em SVG para os segmentos do Torus
	 */
	function renderTorusSvg(segments, strokeWidth, chartSize) {
		var radius = 72;
		var circumference = 2 * Math.PI * radius; // ~452.389
		var totalValue = 0;
		var i;

		for (i = 0; i < segments.length; i++) {
			totalValue += parseFloat(segments[i].value) || 0;
		}
		if (totalValue <= 0) {
			totalValue = 1;
		}

		var gapLength = segments.length > 1 ? 4.5 : 0;
		var totalGaps = segments.length * gapLength;
		var availableCircumference = Math.max(10, circumference - totalGaps);

		// Ordem visual harmoniosa
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
				width: chartSize,
				height: chartSize
			},
			circleElements
		);
	}

	/**
	 * Renderiza a lista de legendas com marcadores coloridos e porcentagens
	 */
	function renderLegendList(segments) {
		var totalValue = 0;
		var i;

		for (i = 0; i < segments.length; i++) {
			totalValue += parseFloat(segments[i].value) || 0;
		}
		if (totalValue <= 0) {
			totalValue = 1;
		}

		return el(
			'ul',
			{ className: 'periodic-torus-legend' },
			segments.map(function (segment, idx) {
				var val = parseFloat(segment.value) || 0;
				var pct = Math.round((val / totalValue) * 100) + '%';

				return el(
					'li',
					{ key: 'legend-item-' + idx, className: 'periodic-torus-legend-item' },
					el('span', {
						className: 'periodic-torus-legend-bullet',
						style: { backgroundColor: segment.color || '#f85a68' }
					}),
					el('span', { className: 'periodic-torus-legend-label' }, segment.label || ''),
					el('span', { className: 'periodic-torus-legend-value' }, pct)
				);
			})
		);
	}

	/* ==========================================================================
	   BLOCO 1: periodic/grafic-line-bar (Linha + Barras)
	   ========================================================================== */

	registerBlockType('periodic/grafic-line-bar', {
		title: __('Periodic - Grafic Line & Bar', 'periodic-grafic-line-bar'),
		description: __(
			'Gráfico moderno de Linha + Barras em SVG nativo responsivo.',
			'periodic-grafic-line-bar'
		),
		icon: el(
			'svg',
			{ width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none' },
			el('rect', { x: 3, y: 13, width: 3.5, height: 8, rx: 1.75, fill: '#cad9f7' }),
			el('rect', { x: 8, y: 7, width: 3.5, height: 14, rx: 1.75, fill: '#cad9f7' }),
			el('rect', { x: 13, y: 4, width: 3.5, height: 17, rx: 1.75, fill: '#cad9f7' }),
			el('rect', { x: 18, y: 10, width: 3.5, height: 11, rx: 1.75, fill: '#cad9f7' }),
			el('path', { d: 'M4.75 13L9.75 7L14.75 4L19.75 10', stroke: '#1058d0', strokeWidth: 2 }),
			el('circle', { cx: 4.75, cy: 13, r: 1.5, fill: '#fff', stroke: '#1058d0' }),
			el('circle', { cx: 9.75, cy: 7, r: 1.5, fill: '#fff', stroke: '#1058d0' }),
			el('circle', { cx: 14.75, cy: 4, r: 1.5, fill: '#fff', stroke: '#1058d0' }),
			el('circle', { cx: 19.75, cy: 10, r: 1.5, fill: '#fff', stroke: '#1058d0' })
		),
		category: 'widgets',
		keywords: [
			__('line chart', 'periodic-grafic-line-bar'),
			__('bar chart', 'periodic-grafic-line-bar'),
			__('grafico linha barra', 'periodic-grafic-line-bar')
		],
		supports: {
			align: ['center', 'wide', 'full'],
			html: false
		},
		attributes: {
			chartTitle: {
				type: 'string',
				default: '238 Threats Blocked'
			},
			chartSubtitle: {
				type: 'string',
				default: ''
			},
			barColor: {
				type: 'string',
				default: '#cad9f7'
			},
			lineColor: {
				type: 'string',
				default: '#1058d0'
			},
			showBars: {
				type: 'boolean',
				default: true
			},
			showLine: {
				type: 'boolean',
				default: true
			},
			showPoints: {
				type: 'boolean',
				default: true
			},
			maxY: {
				type: 'number',
				default: 90
			},
			items: {
				type: 'array',
				default: [
					{ label: 'Pt 1', value: 28 },
					{ label: 'Pt 2', value: 52 },
					{ label: 'Pt 3', value: 33 },
					{ label: 'Pt 4', value: 85 },
					{ label: 'Pt 5', value: 50 },
					{ label: 'Pt 6', value: 55 },
					{ label: 'Pt 7', value: 33 },
					{ label: 'Pt 8', value: 18 }
				]
			}
		},

		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var chartTitle = attributes.chartTitle;
			var chartSubtitle = attributes.chartSubtitle;
			var barColor = attributes.barColor;
			var lineColor = attributes.lineColor;
			var showBars = attributes.showBars;
			var showLine = attributes.showLine;
			var showPoints = attributes.showPoints;
			var maxY = attributes.maxY;
			var items = attributes.items || [];

			function updateItem(index, key, val) {
				var newItems = items.slice();
				newItems[index] = Object.assign({}, newItems[index]);
				newItems[index][key] = val;
				setAttributes({ items: newItems });
			}

			function removeItem(index) {
				if (items.length <= 1) {
					return;
				}
				var newItems = items.filter(function (_, i) {
					return i !== index;
				});
				setAttributes({ items: newItems });
			}

			function addItem() {
				var newItem = {
					label: 'Pt ' + (items.length + 1),
					value: Math.floor(Math.random() * (maxY || 90) * 0.8) + 15
				};
				setAttributes({ items: items.concat([newItem]) });
			}

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Chart Settings', 'periodic-grafic-line-bar'), initialOpen: true },
						el(TextControl, {
							label: __('Title', 'periodic-grafic-line-bar'),
							value: chartTitle,
							onChange: function (val) {
								setAttributes({ chartTitle: val });
							}
						}),
						el(TextControl, {
							label: __('Subtitle (Optional)', 'periodic-grafic-line-bar'),
							value: chartSubtitle,
							onChange: function (val) {
								setAttributes({ chartSubtitle: val });
							}
						}),
						el(RangeControl, {
							label: __('Y-Axis Maximum (Max Y)', 'periodic-grafic-line-bar'),
							value: maxY,
							min: 30,
							max: 300,
							step: 10,
							onChange: function (val) {
								setAttributes({ maxY: val });
							}
						}),
						el(ToggleControl, {
							label: __('Show Columns / Bars', 'periodic-grafic-line-bar'),
							checked: showBars,
							onChange: function (val) {
								setAttributes({ showBars: val });
							}
						}),
						el(ToggleControl, {
							label: __('Show Connected Line', 'periodic-grafic-line-bar'),
							checked: showLine,
							onChange: function (val) {
								setAttributes({ showLine: val });
							}
						}),
						el(ToggleControl, {
							label: __('Show Point Markers', 'periodic-grafic-line-bar'),
							checked: showPoints,
							onChange: function (val) {
								setAttributes({ showPoints: val });
							}
						})
					),
					el(
						PanelBody,
						{ title: __('Color Palette', 'periodic-grafic-line-bar'), initialOpen: false },
						el(
							'div',
							{ className: 'periodic-color-picker-wrap' },
							el(
								'label',
								{ className: 'components-base-control__label' },
								__('Bar Color', 'periodic-grafic-line-bar')
							),
							el(ColorPalette, {
								colors: LINE_BAR_PALETTE,
								value: barColor,
								onChange: function (newColor) {
									setAttributes({ barColor: newColor || '#cad9f7' });
								}
							})
						),
						el(
							'div',
							{ className: 'periodic-color-picker-wrap' },
							el(
								'label',
								{ className: 'components-base-control__label' },
								__('Line & Point Color', 'periodic-grafic-line-bar')
							),
							el(ColorPalette, {
								colors: LINE_BAR_PALETTE,
								value: lineColor,
								onChange: function (newColor) {
									setAttributes({ lineColor: newColor || '#1058d0' });
								}
							})
						)
					),
					el(
						PanelBody,
						{ title: __('Data Points', 'periodic-grafic-line-bar'), initialOpen: true },
						items.map(function (item, index) {
							return el(
								'div',
								{ key: 'item-card-' + index, className: 'periodic-item-card' },
								el(
									'div',
									{ className: 'periodic-item-card-header' },
									el('span', { className: 'periodic-item-index-badge' }, '#' + (index + 1)),
									el('strong', null, item.label || __('Point', 'periodic-grafic-line-bar')),
									items.length > 1
										? el(
												Button,
												{
													isDestructive: true,
													isSmall: true,
													className: 'periodic-remove-btn',
													onClick: function () {
														removeItem(index);
													}
												},
												'✕'
										  )
										: null
								),
								el(TextControl, {
									label: __('Label', 'periodic-grafic-line-bar'),
									value: item.label,
									onChange: function (val) {
										updateItem(index, 'label', val);
									}
								}),
								el(TextControl, {
									label: __('Value', 'periodic-grafic-line-bar'),
									type: 'number',
									value: item.value,
									onChange: function (val) {
										updateItem(index, 'value', parseFloat(val) || 0);
									}
								})
							);
						}),
						el(
							Button,
							{
								isPrimary: true,
								className: 'periodic-add-btn',
								onClick: addItem
							},
							__('+ Add Data Point', 'periodic-grafic-line-bar')
						)
					)
				),
				el(
					'div',
					{ className: 'periodic-grafic-line-bar-wrapper' },
					el(
						'div',
						{ className: 'periodic-grafic-line-bar-card' },
						el(
							'div',
							{ className: 'periodic-line-bar-header' },
							el(RichText, {
								tagName: 'h3',
								className: 'periodic-line-bar-title',
								value: chartTitle,
								onChange: function (val) {
									setAttributes({ chartTitle: val });
								},
								placeholder: '238 Threats Blocked'
							}),
							chartSubtitle
								? el('div', { className: 'periodic-line-bar-subtitle' }, chartSubtitle)
								: null
						),
						el(
							'div',
							{ className: 'periodic-line-bar-chart-container' },
							renderLineBarSvg(items, barColor, lineColor, showBars, showLine, showPoints, maxY)
						)
					)
				)
			);
		},

		save: function (props) {
			var attributes = props.attributes;
			var chartTitle = attributes.chartTitle;
			var chartSubtitle = attributes.chartSubtitle;
			var barColor = attributes.barColor;
			var lineColor = attributes.lineColor;
			var showBars = attributes.showBars;
			var showLine = attributes.showLine;
			var showPoints = attributes.showPoints;
			var maxY = attributes.maxY;
			var items = attributes.items || [];

			return el(
				'div',
				{ className: 'periodic-grafic-line-bar-wrapper' },
				el(
					'div',
					{ className: 'periodic-grafic-line-bar-card' },
					el(
						'div',
						{ className: 'periodic-line-bar-header' },
						chartTitle ? el('h3', { className: 'periodic-line-bar-title' }, chartTitle) : null,
						chartSubtitle
							? el('div', { className: 'periodic-line-bar-subtitle' }, chartSubtitle)
							: null
					),
					el(
						'div',
						{ className: 'periodic-line-bar-chart-container' },
						renderLineBarSvg(items, barColor, lineColor, showBars, showLine, showPoints, maxY)
					)
				)
			);
		}
	});

	/* ==========================================================================
	   BLOCO 2: periodic/grafic-torus (Rosca / Torus)
	   ========================================================================== */

	registerBlockType('periodic/grafic-torus', {
		title: __('Periodic - Grafic Torus', 'periodic-grafic-line-bar'),
		description: __(
			'Gráfico elegante no formato Torus / Donut circular em SVG nativo.',
			'periodic-grafic-line-bar'
		),
		icon: el(
			'svg',
			{ width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none' },
			el('circle', { cx: 12, cy: 12, r: 9, strokeWidth: 3, stroke: '#f85a68' }),
			el('circle', {
				cx: 12,
				cy: 12,
				r: 9,
				strokeWidth: 3,
				stroke: '#00b038',
				strokeDasharray: '18 38'
			}),
			el('circle', {
				cx: 12,
				cy: 12,
				r: 9,
				strokeWidth: 3,
				stroke: '#7e42d7',
				strokeDasharray: '14 42',
				strokeDashoffset: '-20'
			})
		),
		category: 'widgets',
		keywords: [
			__('torus', 'periodic-grafic-line-bar'),
			__('donut chart', 'periodic-grafic-line-bar'),
			__('grafico rosca', 'periodic-grafic-line-bar')
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

		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var centerValue = attributes.centerValue;
			var centerLabel = attributes.centerLabel;
			var strokeWidth = attributes.strokeWidth;
			var chartSize = attributes.chartSize;
			var segments = attributes.segments || [];

			function updateSegment(index, key, val) {
				var newSegments = segments.slice();
				newSegments[index] = Object.assign({}, newSegments[index]);
				newSegments[index][key] = val;
				setAttributes({ segments: newSegments });
			}

			function removeSegment(index) {
				if (segments.length <= 1) {
					return;
				}
				var newSegments = segments.filter(function (_, i) {
					return i !== index;
				});
				setAttributes({ segments: newSegments });
			}

			function addSegment() {
				var paletteIndex = segments.length % TORUS_PALETTE.length;
				var newSegment = {
					label: __('New Segment', 'periodic-grafic-line-bar'),
					value: 25,
					color: TORUS_PALETTE[paletteIndex].color
				};
				setAttributes({ segments: segments.concat([newSegment]) });
			}

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Chart Settings', 'periodic-grafic-line-bar'), initialOpen: true },
						el(TextControl, {
							label: __('Center Value', 'periodic-grafic-line-bar'),
							value: centerValue,
							onChange: function (val) {
								setAttributes({ centerValue: val });
							}
						}),
						el(TextControl, {
							label: __('Center Subtitle', 'periodic-grafic-line-bar'),
							value: centerLabel,
							onChange: function (val) {
								setAttributes({ centerLabel: val });
							}
						}),
						el(RangeControl, {
							label: __('Ring Thickness', 'periodic-grafic-line-bar'),
							value: strokeWidth,
							min: 14,
							max: 32,
							onChange: function (val) {
								setAttributes({ strokeWidth: val });
							}
						}),
						el(RangeControl, {
							label: __('Chart Diameter (px)', 'periodic-grafic-line-bar'),
							value: chartSize,
							min: 180,
							max: 360,
							step: 5,
							onChange: function (val) {
								setAttributes({ chartSize: val });
							}
						})
					),
					el(
						PanelBody,
						{ title: __('Manage Segments', 'periodic-grafic-line-bar'), initialOpen: true },
						segments.map(function (segment, index) {
							return el(
								'div',
								{ key: 'seg-control-' + index, className: 'periodic-segment-card' },
								el(
									'div',
									{ className: 'periodic-segment-card-header' },
									el('span', { className: 'periodic-segment-index-badge' }, '#' + (index + 1)),
									el('strong', null, segment.label || __('Segment', 'periodic-grafic-line-bar')),
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
									label: __('Label', 'periodic-grafic-line-bar'),
									value: segment.label,
									onChange: function (val) {
										updateSegment(index, 'label', val);
									}
								}),
								el(TextControl, {
									label: __('Value / Percentage', 'periodic-grafic-line-bar'),
									type: 'number',
									value: segment.value,
									onChange: function (val) {
										updateSegment(index, 'value', parseFloat(val) || 0);
									}
								}),
								el(
									'div',
									{ className: 'periodic-color-picker-wrap' },
									el(
										'label',
										{ className: 'components-base-control__label' },
										__('Color', 'periodic-grafic-line-bar')
									),
									el(ColorPalette, {
										colors: TORUS_PALETTE,
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
							__('+ Add Segment', 'periodic-grafic-line-bar')
						)
					)
				),
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
