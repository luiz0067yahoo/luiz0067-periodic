/**
 * WordPress Gutenberg Custom Block: Gráfico Pizza (Chart.js)
 * Block Name: cms-adm/build-grafics
 *
 * @package Periodic_Build_Grafics
 */

(function () {
	var el = wp.element.createElement;
	var useEffect = wp.element.useEffect;
	var useState = wp.element.useState;
	var __ = (wp.i18n && wp.i18n.__) ? wp.i18n.__ : function (text) { return text; };
	var sprintf = (wp.i18n && wp.i18n.sprintf) ? wp.i18n.sprintf : function (format) {
		var args = Array.prototype.slice.call(arguments, 1);
		var i = 0;
		return format.replace(/%[sd]/g, function () { return args[i++]; });
	};
	var buildGraficsChartInstances = {};

	// Paleta padrão de 75 cores hexadecimais (Originais / Claras / Escuras)
	var defaultColorHexLegend = [
		"#f08f86", "#57a7ed", "#35cd76", "#f9a51e", "#636363",
		"#f1c920", "#f997f9", "#ee3924", "#233e95", "#128e42",
		"#e5b624", "#622d8f", "#c0de34", "#e6246d", "#6ecee9",
		"#35449c", "#c1db70", "#ffe47c", "#f6792f", "#9c6ab2",
		"#1693b1", "#b71d3f", "#43b376", "#e8dc1a", "#0c809f",

		// Cores Claras
		"#f7c7c2", "#abd3f6", "#9ae6ba", "#fcd28e", "#b1b1b1",
		"#f8e48f", "#fccbfc", "#f69c91", "#919eca", "#88c6a0",
		"#f2da91", "#b096c7", "#dfee99", "#f291b6", "#b6e6f4",
		"#9aa1cd", "#e0edb7", "#fff1bd", "#fabc97", "#cdb4d8",
		"#8ac9d8", "#db8e9f", "#a1d9ba", "#f3ed8c", "#85bfcf",

		// Cores Escuras
		"#784843", "#2c5477", "#1b673b", "#7d530f", "#323232",
		"#796510", "#7d4c7d", "#771d12", "#121f4b", "#094721",
		"#735b12", "#311748", "#606f1a", "#731237", "#376775",
		"#1b224e", "#616e38", "#80723e", "#7b3d18", "#4e3559",
		"#0b4a59", "#5c0f20", "#225a3b", "#746e0d", "#064050"
	];

	wp.blocks.registerBlockType('cms-adm/build-grafics', {
		title: __('Gráfico pizza', 'periodic-build-grafics'),
		icon: 'chart-pie',
		description: __('Gere seu gráfico de pizza em uma tabela com cores personalizadas', 'periodic-build-grafics'),
		example: {
			attributes: {
				title: [__('Exemplo Gráfico', 'periodic-build-grafics')],
				subTitle: [__('Subtítulo Exemplo', 'periodic-build-grafics')],
				legend: [[__('Vendas', 'periodic-build-grafics'), __('Serviços', 'periodic-build-grafics'), __('Outros', 'periodic-build-grafics')]],
				dataValue: [['70', '20', '10']],
				colorItem: [['#f08f86', '#57a7ed', '#35cd76']],
				mainBlockId: ['build-grafics-preview']
			}
		},
		category: 'design',
		supports: {
			multiple: true
		},
		attributes: {
			title: { type: 'array', default: [''] },
			subTitle: { type: 'array', default: [''] },
			legend: { type: 'array', default: [['legenda1', 'legenda2', 'legenda3']] },
			dataValue: { type: 'array', default: [['70', '10', '20']] },
			colorItem: { type: 'array', default: [defaultColorHexLegend.slice(0, 3)] },
			mainBlockId: { type: 'array', default: [] }
		},

		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			// Estado para controlar visibilidade das tabelas de edição
			var openEditorsState = useState({});
			var openEditors = openEditorsState[0];
			var setOpenEditors = openEditorsState[1];

			// Inicialização de valores padrão caso indefinidos
			var dataValue = attributes.dataValue || [];
			var legend = attributes.legend || [];
			var colorItem = attributes.colorItem || [];
			var title = attributes.title || [];
			var subTitle = attributes.subTitle || [];
			var mainBlockId = attributes.mainBlockId || [];

			var needsInit = false;
			var newAttrs = {};

			if (!dataValue.length) {
				newAttrs.dataValue = [['70', '10', '20']];
				needsInit = true;
			}
			if (!legend.length) {
				newAttrs.legend = [['legenda1', 'legenda2', 'legenda3']];
				needsInit = true;
			}
			if (!colorItem.length) {
				newAttrs.colorItem = [defaultColorHexLegend.slice(0, 3)];
				needsInit = true;
			}
			if (!title.length) {
				newAttrs.title = [''];
				needsInit = true;
			}
			if (!subTitle.length) {
				newAttrs.subTitle = [''];
				needsInit = true;
			}
			if (!mainBlockId.length) {
				var initialId = 'build-grafics-' + (Math.floor(Math.random() * 100000) + 1);
				newAttrs.mainBlockId = [initialId];
				needsInit = true;
			}

			if (needsInit) {
				setAttributes(newAttrs);
				return el('div', { className: 'all-grafics-element loading-grafics' }, __('Carregando gráfico...', 'periodic-build-grafics'));
			}

			// Renderiza ou atualiza os gráficos Chart.js ao montar ou mudar atributos
			useEffect(function () {
				for (var i = 0; i < mainBlockId.length; i++) {
					var canvasId = mainBlockId[i] + '-canvas';
					var canvasElem = document.getElementById(canvasId);
					if (canvasElem && typeof Chart !== 'undefined') {
						try {
							var ctx = canvasElem.getContext('2d');
							if (buildGraficsChartInstances[canvasId]) {
								buildGraficsChartInstances[canvasId].destroy();
							}
							var currentLabels = legend[i] || [];
							var currentData = (dataValue[i] || []).map(function (val) {
								return parseFloat(val) || 0;
							});
							var currentColors = colorItem[i] || defaultColorHexLegend.slice(0, currentLabels.length);

							buildGraficsChartInstances[canvasId] = new Chart(ctx, {
								type: 'pie',
								data: {
									labels: currentLabels,
									datasets: [{
										label: title[i] || '',
										data: currentData,
										backgroundColor: currentColors
									}]
								},
								options: {
									responsive: true,
									maintainAspectRatio: false,
									animation: {
										duration: 400
									},
									plugins: {
										legend: {
											display: false
										},
										title: {
											display: false
										},
										subtitle: {
											display: false
										}
									}
								}
							});
						} catch (e) {
							console.warn('Erro ao inicializar Chart.js no editor:', e);
						}
					}
				}

				return function () {
					// Cleanup on unmount
					for (var id in buildGraficsChartInstances) {
						if (buildGraficsChartInstances[id]) {
							buildGraficsChartInstances[id].destroy();
							delete buildGraficsChartInstances[id];
						}
					}
				};
			}, [title, subTitle, legend, dataValue, colorItem, mainBlockId]);

			// Manipuladores de eventos
			function handleUpdateTitle(posContainer, val) {
				var acc = [...title];
				acc[posContainer] = val;
				setAttributes({ title: acc });
			}

			function handleUpdateSubTitle(posContainer, val) {
				var acc = [...subTitle];
				acc[posContainer] = val;
				setAttributes({ subTitle: acc });
			}

			function handleUpdateLegend(posContainer, posItem, val) {
				var acc = legend.map(function (arr) { return [...arr]; });
				acc[posContainer][posItem] = val;
				setAttributes({ legend: acc });
			}

			function handleUpdateColor(posContainer, posItem, val) {
				var acc = colorItem.map(function (arr) { return [...arr]; });
				acc[posContainer][posItem] = val;
				setAttributes({ colorItem: acc });
			}

			function handleUpdateDataValue(posContainer, posItem, val) {
				var acc = dataValue.map(function (arr) { return [...arr]; });
				acc[posContainer][posItem] = val;
				setAttributes({ dataValue: acc });
			}

			function handleAddRow(posContainer, posItem) {
				var accLegend = legend.map(function (arr) { return [...arr]; });
				var accColor = colorItem.map(function (arr) { return [...arr]; });
				var accData = dataValue.map(function (arr) { return [...arr]; });

				var nextColor = defaultColorHexLegend[accLegend[posContainer].length % defaultColorHexLegend.length];
				accLegend[posContainer].splice(posItem + 1, 0, __('Nova legenda', 'periodic-build-grafics'));
				accColor[posContainer].splice(posItem + 1, 0, nextColor);
				accData[posContainer].splice(posItem + 1, 0, '10');

				setAttributes({
					legend: accLegend,
					colorItem: accColor,
					dataValue: accData
				});
			}

			function handleRemoveRow(posContainer, posItem) {
				var accLegend = legend.map(function (arr) { return [...arr]; });
				var accColor = colorItem.map(function (arr) { return [...arr]; });
				var accData = dataValue.map(function (arr) { return [...arr]; });

				if (accLegend[posContainer].length > 1) {
					accLegend[posContainer].splice(posItem, 1);
					accColor[posContainer].splice(posItem, 1);
					accData[posContainer].splice(posItem, 1);

					setAttributes({
						legend: accLegend,
						colorItem: accColor,
						dataValue: accData
					});
				}
			}

			function handleAddContainer(posContainer) {
				var newId = 'build-grafics-' + (Math.floor(Math.random() * 100000) + 1);
				var accBlockId = [...mainBlockId];
				var accTitle = [...title];
				var accSubTitle = [...subTitle];
				var accLegend = legend.map(function (arr) { return [...arr]; });
				var accColor = colorItem.map(function (arr) { return [...arr]; });
				var accData = dataValue.map(function (arr) { return [...arr]; });

				accBlockId.splice(posContainer + 1, 0, newId);
				accTitle.splice(posContainer + 1, 0, '');
				accSubTitle.splice(posContainer + 1, 0, '');
				accLegend.splice(posContainer + 1, 0, ['legenda1', 'legenda2', 'legenda3']);
				accColor.splice(posContainer + 1, 0, defaultColorHexLegend.slice(0, 3));
				accData.splice(posContainer + 1, 0, ['70', '10', '20']);

				setAttributes({
					mainBlockId: accBlockId,
					title: accTitle,
					subTitle: accSubTitle,
					legend: accLegend,
					colorItem: accColor,
					dataValue: accData
				});
			}

			function handleRemoveContainer(posContainer) {
				if (mainBlockId.length <= 1) {
					return;
				}
				var accBlockId = [...mainBlockId];
				var accTitle = [...title];
				var accSubTitle = [...subTitle];
				var accLegend = legend.map(function (arr) { return [...arr]; });
				var accColor = colorItem.map(function (arr) { return [...arr]; });
				var accData = dataValue.map(function (arr) { return [...arr]; });

				accBlockId.splice(posContainer, 1);
				accTitle.splice(posContainer, 1);
				accSubTitle.splice(posContainer, 1);
				accLegend.splice(posContainer, 1);
				accColor.splice(posContainer, 1);
				accData.splice(posContainer, 1);

				setAttributes({
					mainBlockId: accBlockId,
					title: accTitle,
					subTitle: accSubTitle,
					legend: accLegend,
					colorItem: accColor,
					dataValue: accData
				});
			}

			function toggleEditTable(posContainer) {
				var nextState = Object.assign({}, openEditors);
				nextState[posContainer] = !nextState[posContainer];
				setOpenEditors(nextState);
			}

			// Montagem dos elementos visuais
			var allGraficsElement = [];

			for (var pos = 0; pos < mainBlockId.length; pos++) {
				(function (posContainer) {
					var currentDataValues = dataValue[posContainer] || [];
					var currentLegends = legend[posContainer] || [];
					var currentColors = colorItem[posContainer] || [];
					var blockId = mainBlockId[posContainer];

					var totalDataValue = 0;
					for (var d = 0; d < currentDataValues.length; d++) {
						totalDataValue += parseFloat(currentDataValues[d]) || 0;
					}

					// Círculos de porcentagem e legendas
					var divLegends = [];
					for (var i = 0; i < currentDataValues.length; i++) {
						var valNum = parseFloat(currentDataValues[i]) || 0;
						var formatDataValue = totalDataValue > 0
							? (parseFloat((100 * valNum) / totalDataValue).toFixed(2) + '%')
							: '0.00%';
						var sliceColor = currentColors[i] || '#555';

						divLegends.push(
							el('div', {
								className: 'my-2 grafic-legend-item',
								style: { height: 'auto', minWidth: '85px' },
								key: 'legend-' + i
							},
								el('div', {
									className: 'mx-auto d-flex justify-content-center align-items-center rounded-circle bg-0 color-2 text-center percentage-circle',
									style: {
										height: '80px',
										width: '80px',
										border: '2px solid ' + sliceColor
									}
								},
									el('h4', { style: { fontSize: '16px', margin: 0 } }, formatDataValue)
								),
								el('p', {
									className: 'mb-0 legend-label',
									style: { textAlign: 'center', color: sliceColor, marginTop: '5px' }
								}, currentLegends[i] || '')
							)
						);
					}

					// Linhas do editor de tabela
					var linesEditor = [];
					for (var j = 0; j < currentDataValues.length; j++) {
						(function (itemPos) {
							var idColor = blockId + '-color-' + posContainer + '_' + itemPos;
							var currentColor = currentColors[itemPos] || '#000000';

							linesEditor.push(
								el('tr', { className: 'line-editor', key: 'line-' + itemPos },
									el('td', { className: 'color-picker-cell' },
										el('input', {
											id: idColor,
											type: 'text',
											className: 'input-color-hex',
											placeholder: '#000000',
											value: currentColor,
											onChange: function (e) {
												handleUpdateColor(posContainer, itemPos, e.target.value);
											}
										}),
										el('input', {
											type: 'color',
											className: 'input-color-native',
											value: currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#57a7ed',
											onChange: function (e) {
												handleUpdateColor(posContainer, itemPos, e.target.value);
											},
											title: __('Escolha uma cor', 'periodic-build-grafics')
										}),
										el('div', {
											className: 'divColor',
											id: idColor + '-div',
											style: {
												backgroundColor: currentColor
											}
										})
									),
									el('td', { className: 'description' },
										el('input', {
											type: 'text',
											className: 'w-100',
											placeholder: __('Coloque o título aqui', 'periodic-build-grafics'),
											value: currentLegends[itemPos] || '',
											onChange: function (e) {
												handleUpdateLegend(posContainer, itemPos, e.target.value);
											}
										})
									),
									el('td', { className: 'data-value-cell' },
										el('input', {
											type: 'number',
											className: 'w-100',
											placeholder: __('Valor', 'periodic-build-grafics'),
											value: currentDataValues[itemPos] || '',
											onChange: function (e) {
												handleUpdateDataValue(posContainer, itemPos, e.target.value);
											}
										})
									),
									el('td', { className: 'actions-cell' },
										el('button', {
											type: 'button',
											className: 'btn-action-row btn-remove-row',
											'aria-label': __('Remover Linha', 'periodic-build-grafics'),
											onClick: function () {
												handleRemoveRow(posContainer, itemPos);
											}
										}, '-'),
										el('button', {
											type: 'button',
											className: 'btn-action-row btn-add-row',
											'aria-label': __('Adicionar Linha', 'periodic-build-grafics'),
											onClick: function () {
												handleAddRow(posContainer, itemPos);
											}
										}, '+')
									)
								)
							);
						})(j);
					}

					var isTableOpen = !!openEditors[posContainer];

					allGraficsElement.push(
						el('div', {
							id: blockId,
							key: blockId || posContainer,
							className: 'full-grafic-element d-flex justify-content-center align-items-center'
						},
							// Tabela flutuante de edição
							el('table', {
								className: 'edit-grafic-element table table-striped table-bordered bg-0' + (isTableOpen ? '' : ' d-none'),
								style: {
									border: '1px solid #ddd',
									width: '100%',
									textAlign: 'center',
									position: 'absolute',
									zIndex: 100,
									marginTop: '30px',
									marginLeft: (posContainer % 3 === 0) ? '50%' : (posContainer % 3 === 2) ? '-50%' : '0'
								}
							},
								el('caption', { className: 'w-100 bg-0', style: { captionSide: 'top' } },
									el('div', { className: 'edit-table-header d-flex justify-content-between align-items-center mb-2' },
										el('strong', null, sprintf(__('Editar Gráfico #%d', 'periodic-build-grafics'), posContainer + 1)),
										el('button', {
											type: 'button',
											className: 'btn-close-table',
											'aria-label': __('Fechar tabela', 'periodic-build-grafics'),
											title: __('Fechar tabela', 'periodic-build-grafics'),
											onClick: function () {
												toggleEditTable(posContainer);
											}
										}, '×')
									),
									el('label', { className: 'w-100 bg-0 mb-1' },
										el('input', {
											type: 'text',
											className: 'w-100',
											placeholder: __('Coloque o título do gráfico aqui...', 'periodic-build-grafics'),
											value: title[posContainer] || '',
											onChange: function (e) {
												handleUpdateTitle(posContainer, e.target.value);
											}
										})
									),
									el('label', { className: 'w-100 bg-0' },
										el('input', {
											type: 'text',
											className: 'w-100 bg-0',
											placeholder: __('Coloque o subtítulo do gráfico aqui...', 'periodic-build-grafics'),
											value: subTitle[posContainer] || '',
											onChange: function (e) {
												handleUpdateSubTitle(posContainer, e.target.value);
											}
										})
									)
								),
								el('thead', null,
									el('tr', null,
										el('td', null, __('Cor', 'periodic-build-grafics')),
										el('td', { className: 'description' }, __('Legenda', 'periodic-build-grafics')),
										el('td', { className: 'btn-exibir' }, __('Valor', 'periodic-build-grafics')),
										el('td', null, __('Ações', 'periodic-build-grafics'))
									)
								),
								el('tbody', null, linesEditor)
							),

							// Contêiner do Gráfico e Controles
							el('div', { className: 'grafic-element' },
								el('div', { className: 'grafic-toolbar' },
									el('button', {
										type: 'button',
										className: 'btn-grafic-action btn-danger',
										title: __('Remover gráfico', 'periodic-build-grafics'),
										onClick: function () {
											handleRemoveContainer(posContainer);
										}
									}, '✕'),
									el('button', {
										type: 'button',
										className: 'btn-grafic-action btn-primary',
										title: __('Editar dados do gráfico', 'periodic-build-grafics'),
										onClick: function () {
											toggleEditTable(posContainer);
										}
									}, '✎'),
									el('button', {
										type: 'button',
										className: 'btn-grafic-action btn-dark',
										title: __('Adicionar novo gráfico', 'periodic-build-grafics'),
										onClick: function () {
											handleAddContainer(posContainer);
										}
									}, '+')
								),

								el('div', {
									className: 'flex-wrap d-flex justify-content-center align-items-start grafic-content-box',
									style: { minWidth: '280px', maxWidth: '360px', height: 'auto' }
								},
									el('h2', { className: 'w-100 text-center grafic-title' }, title[posContainer] || ''),
									subTitle[posContainer]
										? el('h5', { className: 'w-100 text-center grafic-subtitle' }, subTitle[posContainer])
										: null,

									el('div', {
										className: 'container-legends w-100 mb-3 d-flex justify-content-between align-items-start',
										style: { height: 'auto' }
									},
										(posContainer % 3 !== 1) ? null : el('div', { className: 'separator-vertical align-self-stretch' }),
										el('div', {
											className: 'flex-wrap flex-row d-flex justify-content-center align-items-start legends-wrapper',
											style: { height: 'auto' }
										}, divLegends),
										(posContainer % 3 !== 1) ? null : el('div', { className: 'separator-vertical align-self-stretch' })
									),

									el('div', {
										className: 'canvas-container',
										style: { maxWidth: '200px', width: '200px', height: '200px', margin: '0 auto' }
									},
										el('canvas', {
											className: 'canvas-grafic-pie',
											id: blockId + '-canvas',
											width: '200px',
											height: '200px'
										})
									)
								)
							)
						)
					);

					if (posContainer % 3 === 2) {
						allGraficsElement.push(
							el('div', {
								className: 'w-100 separator-horizontal',
								key: 'sep-' + posContainer,
								style: { minHeight: '2px', marginTop: '10px' }
							})
						);
					}
				})(pos);
			}

			return el('div', { className: 'all-grafics-element w-100' },
				el('div', { className: 'w-100 flex-wrap d-flex justify-content-center align-items-start' }, allGraficsElement)
			);
		},

		save: function (props) {
			var attributes = props.attributes;
			var dataValue = attributes.dataValue || [];
			var legend = attributes.legend || [];
			var colorItem = attributes.colorItem || [];
			var title = attributes.title || [];
			var subTitle = attributes.subTitle || [];
			var mainBlockId = attributes.mainBlockId || [];

			var allGraficsElement = [];

			for (var positionContainer = 0; positionContainer < mainBlockId.length; positionContainer++) {
				var divLegends = [];
				var totalDataValue = 0;
				var currentData = dataValue[positionContainer] || [];
				var currentLegend = legend[positionContainer] || [];
				var currentColor = colorItem[positionContainer] || [];
				var currentBlockId = mainBlockId[positionContainer];

				for (var d = 0; d < currentData.length; d++) {
					totalDataValue += parseFloat(currentData[d]) || 0;
				}

				for (var index = 0; index < currentData.length; index++) {
					var valNum = parseFloat(currentData[index]) || 0;
					var formatDataValue = totalDataValue > 0
						? (parseFloat((100 * valNum) / totalDataValue).toFixed(2) + '%')
						: '0.00%';
					var itemColor = currentColor[index] || '#333333';

					divLegends.push(
						el('div', {
							className: 'my-2 grafic-legend-item',
							style: { height: 'auto', minWidth: '85px' },
							key: 'legend-' + index
						},
							el('div', {
								className: 'mx-auto d-flex justify-content-center align-items-center rounded-circle bg-0 color-2 text-center percentage-circle',
								style: {
									height: '80px',
									width: '80px',
									border: '2px solid ' + itemColor
								}
							},
								el('h4', { style: { fontSize: '16px', margin: 0 } }, formatDataValue)
							),
							el('p', {
								className: 'mb-0 legend-label',
								style: { textAlign: 'center', color: itemColor, marginTop: '5px' }
							}, currentLegend[index] || '')
						)
					);
				}

				allGraficsElement.push(
					el('div', {
						id: currentBlockId,
						key: currentBlockId || positionContainer,
						className: 'full-grafic-element d-flex justify-content-center align-items-center'
					},
						el('div', { className: 'grafic-element' },
							el('div', {
								className: 'flex-wrap d-flex justify-content-center align-items-start grafic-content-box',
								style: { minWidth: '280px', maxWidth: '360px', height: 'auto' }
							},
								el('h2', { className: 'w-100 text-center grafic-title' }, title[positionContainer] || ''),
								subTitle[positionContainer]
									? el('h5', { className: 'w-100 text-center grafic-subtitle' }, subTitle[positionContainer])
									: null,

								el('div', {
									className: 'container-legends w-100 mb-3 d-flex justify-content-between align-items-start',
									style: { height: 'auto' }
								},
									(positionContainer % 3 !== 1) ? null : el('div', { className: 'separator-vertical align-self-stretch' }),
									el('div', {
										className: 'flex-wrap flex-row d-flex justify-content-center align-items-start legends-wrapper',
										style: { height: 'auto' }
									}, divLegends),
									(positionContainer % 3 !== 1) ? null : el('div', { className: 'separator-vertical align-self-stretch' })
								),

								el('div', {
									className: 'canvas-container',
									style: { maxWidth: '200px', width: '200px', height: '200px', margin: '0 auto' }
								},
									el('canvas', {
										className: 'canvas-grafic-pie',
										title: title[positionContainer] || '',
										subTitle: subTitle[positionContainer] || '',
										legend: JSON.stringify(currentLegend),
										colorItem: JSON.stringify(currentColor),
										dataValue: JSON.stringify(currentData),
										id: currentBlockId + '-canvas',
										width: '200px',
										height: '200px',
										style: { width: '100%' }
									})
								)
							)
						)
					)
				);

				if (positionContainer % 3 === 2) {
					allGraficsElement.push(
						el('div', {
							className: 'w-100 separator-horizontal',
							key: 'sep-' + positionContainer,
							style: { minHeight: '2px', marginTop: '10px' }
						})
					);
				}
			}

			return el('div', { className: 'all-grafics-element w-100' },
				el('div', { className: 'w-100 flex-wrap d-flex justify-content-center align-items-start' }, allGraficsElement)
			);
		}
	});
})();
