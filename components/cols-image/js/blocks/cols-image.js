(function (blocks, element, blockEditor, components, i18n) {
	'use strict';

	if (!blocks || !element || !i18n) {
		return;
	}

	var el = element.createElement;
	var registerBlockType = blocks.registerBlockType;
	var __ = i18n.__;

	// Componentes do BlockEditor e Components nativos do WordPress
	var RichText = blockEditor.RichText;
	var InspectorControls = blockEditor.InspectorControls;
	var MediaUpload = blockEditor.MediaUpload;
	var MediaUploadCheck = blockEditor.MediaUploadCheck;

	var PanelBody = components.PanelBody;
	var PanelRow = components.PanelRow;
	var RangeControl = components.RangeControl;
	var SelectControl = components.SelectControl;
	var ToggleControl = components.ToggleControl;
	var Button = components.Button;
	var IconButton = components.IconButton || components.Button;
	var Tooltip = components.Tooltip;

	// Helper para manipulação de arrays imutáveis
	function cloneArray(arr) {
		return Array.isArray(arr) ? arr.slice(0) : [];
	}

	registerBlockType('custom-adm/cols-image', {
		title: __('Imagem em Colunas', 'custom-adm'),
		description: __('Exibe uma grade de até 4 colunas de imagens com títulos, descrições e sobreposição.', 'custom-adm'),
		icon: 'images-alt2',
		category: 'media',
		keywords: [
			__('colunas', 'custom-adm'),
			__('galeria', 'custom-adm'),
			__('imagens', 'custom-adm')
		],
		supports: {
			align: ['wide', 'full'],
			html: false,
			multiple: true
		},

		attributes: {
			url: {
				type: 'array',
				default: [
					'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
					'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80',
					'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80'
				]
			},
			title: {
				type: 'array',
				default: [
					__('Paisagens Naturais', 'custom-adm'),
					__('Arquitetura Urbana', 'custom-adm'),
					__('Cultura e História', 'custom-adm')
				]
			},
			description: {
				type: 'array',
				default: [
					__('Descubra os parques ecológicos e trilhas deslumbrantes da nossa região.', 'custom-adm'),
					__('Conheça os projetos modernos e sustentáveis de revitalização da cidade.', 'custom-adm'),
					__('Explore o patrimônio cultural e os monumentos históricos tombados.', 'custom-adm')
				]
			},
			columns: {
				type: 'number',
				default: 3
			},
			cardHeight: {
				type: 'number',
				default: 320
			},
			overlayOpacity: {
				type: 'number',
				default: 55
			},
			roundedCorners: {
				type: 'boolean',
				default: true
			}
		},

		// Preview automático para inserção no Gutenberg / Inserter Modal
		example: {
			attributes: {
				columns: 3,
				cardHeight: 280,
				overlayOpacity: 50,
				roundedCorners: true,
				url: [
					'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
					'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80',
					'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=80'
				],
				title: [
					'Paisagens Naturais',
					'Arquitetura Urbana',
					'Cultura e História'
				],
				description: [
					'Descubra os parques ecológicos e trilhas deslumbrantes.',
					'Conheça os projetos modernos e sustentáveis da cidade.',
					'Explore o patrimônio cultural e os monumentos históricos.'
				]
			}
		},

		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var isSelected = props.isSelected;

			var urls = cloneArray(attributes.url);
			var titles = cloneArray(attributes.title);
			var descriptions = cloneArray(attributes.description);

			// Garantir sincronismo e integridade dos arrays
			var totalItems = Math.max(urls.length, titles.length, descriptions.length);
			if (totalItems === 0) {
				totalItems = 1;
				urls = [''];
				titles = [''];
				descriptions = [''];
			}

			// Atualização do título por índice
			function updateTitle(value, index) {
				var newTitles = cloneArray(titles);
				newTitles[index] = value;
				setAttributes({ title: newTitles });
			}

			// Atualização da descrição por índice
			function updateDescription(value, index) {
				var newDesc = cloneArray(descriptions);
				newDesc[index] = value;
				setAttributes({ description: newDesc });
			}

			// Seleção / Troca de Imagem via WordPress Media Modal
			function onSelectImage(media, index) {
				var newUrls = cloneArray(urls);
				var newTitles = cloneArray(titles);
				var newDesc = cloneArray(descriptions);

				if (media && media.url) {
					newUrls[index] = media.url;
					if (!newTitles[index] && media.title) {
						newTitles[index] = media.title;
					}
					if (!newDesc[index] && media.caption) {
						newDesc[index] = media.caption;
					}
					setAttributes({
						url: newUrls,
						title: newTitles,
						description: newDesc
					});
				}
			}

			// Adicionar novo item
			function addItem() {
				var newUrls = cloneArray(urls);
				var newTitles = cloneArray(titles);
				var newDesc = cloneArray(descriptions);

				newUrls.push('');
				newTitles.push(__('Novo Título', 'custom-adm'));
				newDesc.push(__('Descrição breve sobre este destaque...', 'custom-adm'));

				setAttributes({
					url: newUrls,
					title: newTitles,
					description: newDesc
				});
			}

			// Remover item específico
			function removeItem(index) {
				if (urls.length <= 1) {
					return;
				}
				var newUrls = cloneArray(urls);
				var newTitles = cloneArray(titles);
				var newDesc = cloneArray(descriptions);

				newUrls.splice(index, 1);
				newTitles.splice(index, 1);
				newDesc.splice(index, 1);

				setAttributes({
					url: newUrls,
					title: newTitles,
					description: newDesc
				});
			}

			// Mover item para a esquerda
			function moveItemLeft(index) {
				if (index <= 0) return;
				swapItems(index, index - 1);
			}

			// Mover item para a direita
			function moveItemRight(index) {
				if (index >= totalItems - 1) return;
				swapItems(index, index + 1);
			}

			function swapItems(i, j) {
				var newUrls = cloneArray(urls);
				var newTitles = cloneArray(titles);
				var newDesc = cloneArray(descriptions);

				var tempUrl = newUrls[i];
				newUrls[i] = newUrls[j];
				newUrls[j] = tempUrl;

				var tempTitle = newTitles[i];
				newTitles[i] = newTitles[j];
				newTitles[j] = tempTitle;

				var tempDesc = newDesc[i];
				newDesc[i] = newDesc[j];
				newDesc[j] = tempDesc;

				setAttributes({
					url: newUrls,
					title: newTitles,
					description: newDesc
				});
			}

			// Renderização do InspectorControls (Painel Lateral do Gutenberg)
			var inspector = el(
				InspectorControls,
				{ key: 'inspector' },
				el(
					PanelBody,
					{
						title: __('Configurações de Layout', 'custom-adm'),
						initialOpen: true
					},
					el(RangeControl, {
						label: __('Número de Colunas', 'custom-adm'),
						value: attributes.columns,
						onChange: function (val) {
							setAttributes({ columns: parseInt(val, 10) });
						},
						min: 1,
						max: 4,
						step: 1
					}),
					el(RangeControl, {
						label: __('Altura dos Cards (px)', 'custom-adm'),
						value: attributes.cardHeight,
						onChange: function (val) {
							setAttributes({ cardHeight: parseInt(val, 10) });
						},
						min: 200,
						max: 600,
						step: 10
					})
				),
				el(
					PanelBody,
					{
						title: __('Aparência e Sobreposição', 'custom-adm'),
						initialOpen: true
					},
					el(RangeControl, {
						label: __('Opacidade da Máscara Escura (%)', 'custom-adm'),
						value: attributes.overlayOpacity,
						onChange: function (val) {
							setAttributes({ overlayOpacity: parseInt(val, 10) });
						},
						min: 0,
						max: 90,
						step: 5
					}),
					el(ToggleControl, {
						label: __('Bordas Arredondadas', 'custom-adm'),
						checked: !!attributes.roundedCorners,
						onChange: function (val) {
							setAttributes({ roundedCorners: val });
						}
					})
				),
				el(
					PanelBody,
					{
						title: __('Gerenciamento de Itens', 'custom-adm'),
						initialOpen: false
					},
					el(
						Button,
						{
							isPrimary: true,
							onClick: addItem,
							icon: 'plus',
							className: 'w-100-button'
						},
						__('Adicionar Nova Coluna', 'custom-adm')
					)
				)
			);

			// Renderização dos cards de imagem no editor
			var cards = [];
			var colClass = 'cols-image-col cols-image-span-' + attributes.columns;

			for (var idx = 0; idx < totalItems; idx++) {
				(function (index) {
					var itemUrl = urls[index] || '';
					var itemTitle = titles[index] || '';
					var itemDesc = descriptions[index] || '';

					var cardStyle = {
						minHeight: attributes.cardHeight + 'px',
						backgroundImage: itemUrl ? 'url(' + itemUrl + ')' : 'none'
					};

					var overlayStyle = {
						backgroundColor: 'rgba(0, 0, 0, ' + (attributes.overlayOpacity / 100) + ')'
					};

					var cardClassNames = 'col-image-card ' +
						(attributes.roundedCorners ? 'has-rounded-corners ' : '') +
						(!itemUrl ? 'has-no-image ' : '');

					// Botões da barra de ações do item no Editor
					var itemToolbar = el(
						'div',
						{ className: 'col-image-item-toolbar' },
						el(
							MediaUploadCheck,
							{},
							el(MediaUpload, {
								onSelect: function (media) {
									onSelectImage(media, index);
								},
								allowedTypes: ['image'],
								render: function (obj) {
									return el(
										Button,
										{
											isSmall: true,
											isSecondary: true,
											className: 'btn-action-camera',
											onClick: obj.open,
											title: __('Alterar Imagem', 'custom-adm')
										},
										el('span', { className: 'dashicons dashicons-camera' })
									);
								}
							})
						),
						index > 0
							? el(
									Button,
									{
										isSmall: true,
										isSecondary: true,
										className: 'btn-action-move',
										onClick: function () {
											moveItemLeft(index);
										},
										title: __('Mover para Esquerda', 'custom-adm')
									},
									el('span', { className: 'dashicons dashicons-arrow-left-alt2' })
							  )
							: null,
						index < totalItems - 1
							? el(
									Button,
									{
										isSmall: true,
										isSecondary: true,
										className: 'btn-action-move',
										onClick: function () {
											moveItemRight(index);
										},
										title: __('Mover para Direita', 'custom-adm')
									},
									el('span', { className: 'dashicons dashicons-arrow-right-alt2' })
							  )
							: null,
						totalItems > 1
							? el(
									Button,
									{
										isSmall: true,
										isDestructive: true,
										className: 'btn-action-remove',
										onClick: function () {
											removeItem(index);
										},
										title: __('Remover Coluna', 'custom-adm')
									},
									el('span', { className: 'dashicons dashicons-trash' })
							  )
							: null
					);

					// Conteúdo textual editável com RichText
					var textContent = el(
						'div',
						{ className: 'col-image-content-wrap' },
						el(RichText, {
							tagName: 'h4',
							className: 'col-image-title',
							value: itemTitle,
							placeholder: __('Digite o título...', 'custom-adm'),
							onChange: function (val) {
								updateTitle(val, index);
							}
						}),
						el(RichText, {
							tagName: 'div',
							className: 'col-image-description',
							value: itemDesc,
							placeholder: __('Digite a descrição (até 100 caracteres)...', 'custom-adm'),
							onChange: function (val) {
								updateDescription(val, index);
							}
						})
					);

					// Placeholder caso não haja imagem definida
					var placeholderEl = !itemUrl
						? el(
								'div',
								{ className: 'col-image-placeholder' },
								el('span', { className: 'dashicons dashicons-format-image' }),
								el('span', { className: 'placeholder-text' }, __('Clique na câmera para enviar foto', 'custom-adm'))
						  )
						: null;

					cards.push(
						el(
							'div',
							{
								key: 'item-' + index,
								className: colClass
							},
							el(
								'div',
								{
									className: cardClassNames,
									style: cardStyle
								},
								placeholderEl,
								itemToolbar,
								el('div', { className: 'col-image-overlay', style: overlayStyle }),
								textContent
							)
						)
					);
				})(idx);
			}

			// Botão rápido para adicionar nova coluna no final da grade
			var addQuickButton = el(
				'div',
				{ className: 'cols-image-add-trigger-wrap' },
				el(
					Button,
					{
						isSecondary: true,
						onClick: addItem,
						className: 'btn-add-column-quick'
					},
					el('span', { className: 'dashicons dashicons-plus-alt2' }),
					__(' Adicionar Coluna', 'custom-adm')
				)
			);

			// Estrutura completa do editor do bloco
			return el(
				'div',
				{ className: 'cols-image-block-wrapper' },
				inspector,
				el(
					'div',
					{
						className: 'cols-image-grid cols-image-grid-' + attributes.columns
					},
					cards
				),
				isSelected ? addQuickButton : null
			);
		},

		save: function (props) {
			var attributes = props.attributes;
			var urls = cloneArray(attributes.url);
			var titles = cloneArray(attributes.title);
			var descriptions = cloneArray(attributes.description);

			var totalItems = Math.max(urls.length, titles.length, descriptions.length);
			if (totalItems === 0) {
				return null;
			}

			var cards = [];
			var colClass = 'cols-image-col cols-image-span-' + attributes.columns;

			for (var i = 0; i < totalItems; i++) {
				var itemUrl = urls[i] || '';
				var itemTitle = titles[i] || '';
				var itemDesc = descriptions[i] || '';

				var cardStyle = {
					minHeight: attributes.cardHeight + 'px',
					backgroundImage: itemUrl ? 'url(' + itemUrl + ')' : 'none'
				};

				var overlayStyle = {
					backgroundColor: 'rgba(0, 0, 0, ' + (attributes.overlayOpacity / 100) + ')'
				};

				var cardClassNames = 'col-image-card ' + (attributes.roundedCorners ? 'has-rounded-corners' : '');

				cards.push(
					el(
						'div',
						{
							key: 'save-col-' + i,
							className: colClass
						},
						el(
							'div',
							{
								className: cardClassNames,
								style: cardStyle
							},
							el('div', { className: 'col-image-overlay', style: overlayStyle }),
							el(
								'div',
								{ className: 'col-image-content-wrap' },
								itemTitle
									? el(RichText.Content, {
											tagName: 'h4',
											className: 'col-image-title',
											value: itemTitle
									  })
									: null,
								itemDesc
									? el(RichText.Content, {
											tagName: 'div',
											className: 'col-image-description',
											value: itemDesc
									  })
									: null
							)
						)
					)
				);
			}

			return el(
				'div',
				{
					className: 'cols-image-block-wrapper'
				},
				el(
					'div',
					{
						className: 'cols-image-grid cols-image-grid-' + attributes.columns
					},
					cards
				)
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
