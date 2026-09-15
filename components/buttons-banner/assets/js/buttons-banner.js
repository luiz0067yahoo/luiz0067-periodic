/**
 * periodic Buttons Banner - Gutenberg Custom Block
 *
 * Bloco Gutenberg customizado para Botões Banner (Buttons Banner) com suporte de 1 a 5 botões por linha,
 * logotipos/anexos de imagem via wp.media/MediaUpload, descrições com RichText, títulos/siglas,
 * links rápidos, alinhamento flexível, cores personalizadas e total compatibilidade retroativa
 * com o bloco legado cms-adm/buttons-banner do projeto Prefeitura / customADM.
 *
 * @package Periodic_Buttons_Banner
 * @version 1.0.0
 */

(function (blocks, element, blockEditor, components, i18n) {
	'use strict';

	if (!blocks || !element || !blocks.registerBlockType) {
		return;
	}

	var el = element.createElement;
	var registerBlockType = blocks.registerBlockType;
	var __ = (i18n && i18n.__) ? i18n.__ : function (text) { return text; };

	// Referências seguras para módulos do editor e componentes Gutenberg
	var editor = blockEditor || window.wp.editor || {};
	var RichText = editor.RichText;
	var InspectorControls = editor.InspectorControls;
	var BlockControls = editor.BlockControls;
	var AlignmentToolbar = editor.AlignmentToolbar || editor.BlockAlignmentToolbar;
	var MediaUpload = editor.MediaUpload;

	var comps = components || window.wp.components || {};
	var PanelBody = comps.PanelBody;
	var TextControl = comps.TextControl;
	var SelectControl = comps.SelectControl;
	var ToggleControl = comps.ToggleControl;
	var RangeControl = comps.RangeControl;
	var ColorPalette = comps.ColorPalette;
	var Button = comps.Button;

	// Ícone personalizado SVG para o bloco Buttons Banner
	var buttonsBannerIcon = el('svg', {
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		xmlns: 'http://www.w3.org/2000/svg'
	},
		el('rect', { x: 2, y: 3, width: 20, height: 8, rx: 2, fill: '#01913a' }),
		el('circle', { cx: 6, cy: 7, r: 2.2, fill: '#ffffff' }),
		el('rect', { x: 10, y: 5.5, width: 9, height: 3, rx: 1, fill: '#ffffff' }),
		el('rect', { x: 2, y: 13, width: 20, height: 8, rx: 2, fill: '#233e95' }),
		el('circle', { cx: 6, cy: 17, r: 2.2, fill: '#ffffff' }),
		el('rect', { x: 10, y: 15.5, width: 9, height: 3, rx: 1, fill: '#ffffff' })
	);

	// Ícone SVG para a Câmera / Upload de Mídia (independente de FontAwesome)
	var cameraSvg = el('svg', {
		width: 15,
		height: 15,
		viewBox: '0 0 24 24',
		fill: 'currentColor',
		'aria-hidden': 'true'
	},
		el('path', { d: 'M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm7.5-4h-2.55l-1.42-1.55c-.38-.42-.92-.66-1.49-.66H9.96c-.57 0-1.11.24-1.49.66L7.05 5H4.5C3.12 5 2 6.12 2 7.5v11C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5v-11C22 6.12 20.88 5 19.5 5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm7.25-7.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z' })
	);

	// Ícone SVG para Link Inline (independente de FontAwesome)
	var linkSvg = el('svg', {
		width: 14,
		height: 14,
		viewBox: '0 0 24 24',
		fill: 'currentColor',
		'aria-hidden': 'true'
	},
		el('path', { d: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z' })
	);

	// Paleta de cores com destaque para a cor institucional prefeitura (#01913a)
	var colorPaletteList = [
		{ name: __('Verde Institucional', 'periodic-buttons-banner'), color: '#01913a' },
		{ name: __('Azul Institucional', 'periodic-buttons-banner'), color: '#233e95' },
		{ name: __('Azul Escuro', 'periodic-buttons-banner'), color: '#0f2744' },
		{ name: __('Coral / Vermelho', 'periodic-buttons-banner'), color: '#c0392b' },
		{ name: __('Dourado / Amarelo', 'periodic-buttons-banner'), color: '#d4ac0d' },
		{ name: __('Grafite Escuro', 'periodic-buttons-banner'), color: '#2c3e50' },
		{ name: __('Preto', 'periodic-buttons-banner'), color: '#1a1a1a' },
		{ name: __('Cinza Claro', 'periodic-buttons-banner'), color: '#f8fafc' },
		{ name: __('Branco', 'periodic-buttons-banner'), color: '#ffffff' }
	];

	// Definição dos atributos do bloco
	var blockAttributes = {
		title: {
			type: 'array',
			default: [
				__('SAÚDE', 'periodic-buttons-banner'),
				__('EDUCAÇÃO', 'periodic-buttons-banner'),
				__('SERVIÇOS', 'periodic-buttons-banner'),
				__('TRIBUTOS', 'periodic-buttons-banner'),
				__('NOTÍCIAS', 'periodic-buttons-banner')
			]
		},
		description: {
			type: 'array',
			default: [
				__('Agendamentos e consultas', 'periodic-buttons-banner'),
				__('Matrículas e escolas', 'periodic-buttons-banner'),
				__('Atendimento ao cidadão', 'periodic-buttons-banner'),
				__('Certidões e IPTU', 'periodic-buttons-banner'),
				__('Últimos comunicados', 'periodic-buttons-banner')
			]
		},
		url: {
			type: 'array',
			default: ['#', '#', '#', '#', '#']
		},
		logo: {
			type: 'array',
			default: ['', '', '', '', '']
		},
		targetBlank: {
			type: 'array',
			default: [false, false, false, false, false]
		},
		columns: {
			type: 'number',
			default: 5
		},
		alignment: {
			type: 'string',
			default: 'center'
		},
		themeStyle: {
			type: 'string',
			default: 'default'
		},
		backgroundColor: {
			type: 'string',
			default: '#01913a'
		},
		opacity: {
			type: 'number',
			default: 1
		},
		textColor: {
			type: 'string',
			default: '#ffffff'
		}
	};

	/**
	 * Configuração unificada do bloco Gutenberg
	 */
	var blockSettings = {
		title: __('Botões Banner', 'periodic-buttons-banner'),
		description: __('Quantidade de até 5 botões por linha com logos, descrições ricas e links personalizáveis.', 'periodic-buttons-banner'),
		icon: buttonsBannerIcon,
		category: 'design',
		keywords: [
			__('botões', 'periodic-buttons-banner'),
			__('banner', 'periodic-buttons-banner'),
			__('buttons', 'periodic-buttons-banner'),
			__('links', 'periodic-buttons-banner'),
			__('prefeitura', 'periodic-buttons-banner'),
			__('custom adm', 'periodic-buttons-banner')
		],
		supports: {
			multiple: true,
			align: ['wide', 'full', 'center', 'left', 'right'],
			html: false
		},
		example: {
			attributes: {
				title: [
					__('SAÚDE', 'periodic-buttons-banner'),
					__('EDUCAÇÃO', 'periodic-buttons-banner'),
					__('SERVIÇOS', 'periodic-buttons-banner')
				],
				description: [
					__('Portal da Saúde', 'periodic-buttons-banner'),
					__('Escolas e Alunos', 'periodic-buttons-banner'),
					__('Atendimento Online', 'periodic-buttons-banner')
				],
				url: ['#', '#', '#'],
				logo: ['', '', ''],
				columns: 3,
				alignment: 'center',
				backgroundColor: '#01913a'
			}
		},
		attributes: blockAttributes,

		/**
		 * Renderização no modo de Edição (Gutenberg Admin)
		 */
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;

			// Normalização e salvaguarda para arrays garantirem compatibilidade retroativa
			var titles = Array.isArray(attributes.title) ? attributes.title.slice() : [];
			var descriptions = Array.isArray(attributes.description) ? attributes.description.slice() : [];
			var urls = Array.isArray(attributes.url) ? attributes.url.slice() : [];
			var logos = Array.isArray(attributes.logo) ? attributes.logo.slice() : [];
			var targetBlanks = Array.isArray(attributes.targetBlank) ? attributes.targetBlank.slice() : [];

			var totalItems = Math.max(titles.length, descriptions.length, urls.length, logos.length, 1);

			// Preenchimento de lacunas
			while (titles.length < totalItems) { titles.push(''); }
			while (descriptions.length < totalItems) { descriptions.push(''); }
			while (urls.length < totalItems) { urls.push('#'); }
			while (logos.length < totalItems) { logos.push(''); }
			while (targetBlanks.length < totalItems) { targetBlanks.push(false); }

			var alignment = attributes.alignment || 'center';
			var columns = attributes.columns || (totalItems <= 5 ? totalItems : 5);
			var themeStyle = attributes.themeStyle || 'default';

			// Métodos de manipulação de itens
			function updateTitleAt(index, value) {
				var newTitles = titles.slice();
				newTitles[index] = value;
				setAttributes({ title: newTitles });
			}

			function updateDescriptionAt(index, value) {
				var newDescriptions = descriptions.slice();
				newDescriptions[index] = value;
				setAttributes({ description: newDescriptions });
			}

			function updateUrlAt(index, value) {
				var newUrls = urls.slice();
				newUrls[index] = value;
				setAttributes({ url: newUrls });
			}

			function updateTargetBlankAt(index, value) {
				var newTargets = targetBlanks.slice();
				newTargets[index] = value;
				setAttributes({ targetBlank: newTargets });
			}

			function updateLogoAt(index, mediaUrl) {
				var newLogos = logos.slice();
				newLogos[index] = mediaUrl;
				setAttributes({ logo: newLogos });
			}

			// Abertura nativa do wp.media para anexar imagens (compatibilidade com referência Prefeitura)
			function openMediaModal(index) {
				if (window.wp && window.wp.media) {
					var frame = window.wp.media({
						title: __('Selecione o logotipo do botão', 'periodic-buttons-banner'),
						button: {
							text: __('Utilizar como logotipo', 'periodic-buttons-banner')
						},
						multiple: false,
						library: {
							type: 'image'
						}
					});

					frame.on('select', function () {
						var attachment = frame.state().get('selection').first().toJSON();
						if (attachment && attachment.url) {
							updateLogoAt(index, attachment.url);
						}
					});

					frame.open();
				}
			}

			function addItemAt(position) {
				if (totalItems >= 10) {
					alert(__('Limite máximo recomendado atingido.', 'periodic-buttons-banner'));
					return;
				}
				var newTitles = titles.slice();
				var newDescriptions = descriptions.slice();
				var newUrls = urls.slice();
				var newLogos = logos.slice();
				var newTargets = targetBlanks.slice();

				var insertIndex = position + 1;
				newTitles.splice(insertIndex, 0, __('NOVO BOTÃO', 'periodic-buttons-banner'));
				newDescriptions.splice(insertIndex, 0, __('Descrição do serviço', 'periodic-buttons-banner'));
				newUrls.splice(insertIndex, 0, '#');
				newLogos.splice(insertIndex, 0, '');
				newTargets.splice(insertIndex, 0, false);

				var newCols = Math.min(newTitles.length, 5);

				setAttributes({
					title: newTitles,
					description: newDescriptions,
					url: newUrls,
					logo: newLogos,
					targetBlank: newTargets,
					columns: newCols
				});
			}

			function removeItemAt(position) {
				if (totalItems <= 1) {
					alert(__('Deve haver pelo menos 1 botão no bloco.', 'periodic-buttons-banner'));
					return;
				}
				var newTitles = titles.slice();
				var newDescriptions = descriptions.slice();
				var newUrls = urls.slice();
				var newLogos = logos.slice();
				var newTargets = targetBlanks.slice();

				newTitles.splice(position, 1);
				newDescriptions.splice(position, 1);
				newUrls.splice(position, 1);
				newLogos.splice(position, 1);
				newTargets.splice(position, 1);

				var newCols = Math.min(newTitles.length, columns);

				setAttributes({
					title: newTitles,
					description: newDescriptions,
					url: newUrls,
					logo: newLogos,
					targetBlank: newTargets,
					columns: newCols
				});
			}

			// Construção da barra lateral (InspectorControls)
			var inspectorElements = [];

			if (InspectorControls) {
				var panelChildren = [];

				// Painel 1: Configuração de Layout
				var layoutControls = [];
				if (RangeControl) {
					layoutControls.push(
						el(RangeControl, {
							label: __('Colunas por Linha', 'periodic-buttons-banner'),
							value: columns,
							min: 1,
							max: 5,
							onChange: function (val) {
								setAttributes({ columns: parseInt(val, 10) });
							}
						})
					);
				}

				if (SelectControl) {
					layoutControls.push(
						el(SelectControl, {
							label: __('Alinhamento', 'periodic-buttons-banner'),
							value: alignment,
							options: [
								{ label: __('Centralizado', 'periodic-buttons-banner'), value: 'center' },
								{ label: __('Esquerda', 'periodic-buttons-banner'), value: 'left' },
								{ label: __('Direita', 'periodic-buttons-banner'), value: 'right' }
							],
							onChange: function (val) {
								setAttributes({ alignment: val });
							}
						})
					);

					layoutControls.push(
						el(SelectControl, {
							label: __('Estilo Visual', 'periodic-buttons-banner'),
							value: themeStyle,
							options: [
								{ label: __('Padrão Prefeitura (Gradiente Verde/Azul)', 'periodic-buttons-banner'), value: 'default' },
								{ label: __('Verde Institucional', 'periodic-buttons-banner'), value: 'institutional-green' },
								{ label: __('Azul Corporativo', 'periodic-buttons-banner'), value: 'corporate-blue' },
								{ label: __('Escuro / Dark Mode', 'periodic-buttons-banner'), value: 'dark' },
								{ label: __('Contorno / Outline', 'periodic-buttons-banner'), value: 'outline' }
							],
							onChange: function (val) {
								setAttributes({ themeStyle: val });
							}
						})
					);
				}

				panelChildren.push(
					el(PanelBody, {
						title: __('Configurações de Layout e Estilo', 'periodic-buttons-banner'),
						initialOpen: true
					}, layoutControls)
				);

				// Painel 2: Itens e Links
				var itemsControls = [];
				for (var i = 0; i < totalItems; i++) {
					(function (idx) {
						var itemBox = [];

						itemBox.push(
							el('div', { className: 'periodic-inspector-btn-header' },
								el('strong', {}, __('Botão #', 'periodic-buttons-banner') + (idx + 1)),
								el('span', { className: 'periodic-inspector-btn-tag' }, titles[idx] || __('Sem título', 'periodic-buttons-banner'))
							)
						);

						if (TextControl) {
							itemBox.push(
								el(TextControl, {
									label: __('Título / Sigla', 'periodic-buttons-banner'),
									value: titles[idx],
									onChange: function (v) { updateTitleAt(idx, v); }
								}),
								el(TextControl, {
									label: __('Link de Destino (URL)', 'periodic-buttons-banner'),
									value: urls[idx],
									onChange: function (v) { updateUrlAt(idx, v); }
								})
							);
						}

						if (ToggleControl) {
							itemBox.push(
								el(ToggleControl, {
									label: __('Abrir em Nova Aba (_blank)', 'periodic-buttons-banner'),
									checked: !!targetBlanks[idx],
									onChange: function (v) { updateTargetBlankAt(idx, v); }
								})
							);
						}

						// Gerenciamento do Logotipo
						itemBox.push(
							el('div', { className: 'periodic-inspector-logo-row' },
								el('span', { className: 'periodic-inspector-sublabel' }, __('Logotipo / Ícone:', 'periodic-buttons-banner')),
								el('div', { className: 'periodic-inspector-logo-actions' },
									el(Button, {
										isSecondary: true,
										isSmall: true,
										onClick: function () { openMediaModal(idx); }
									}, logos[idx] ? __('Alterar Logotipo', 'periodic-buttons-banner') : __('Enviar Logotipo', 'periodic-buttons-banner')),
									logos[idx] ? el(Button, {
										isDestructive: true,
										isSmall: true,
										onClick: function () { updateLogoAt(idx, ''); }
									}, __('Remover', 'periodic-buttons-banner')) : null
								)
							)
						);

						itemsControls.push(
							el('div', { className: 'periodic-inspector-btn-item' }, itemBox)
						);
					})(i);
				}

				panelChildren.push(
					el(PanelBody, {
						title: __('Gerenciador de Botões (', 'periodic-buttons-banner') + totalItems + ')',
						initialOpen: false
					}, itemsControls)
				);

				// Painel 3: Cores Personalizadas
				if (ColorPalette) {
					panelChildren.push(
						el(PanelBody, {
							title: __('Cores Personalizadas', 'periodic-buttons-banner'),
							initialOpen: false
						},
							el('p', { className: 'periodic-inspector-sublabel' }, __('Cor do Destaque / Fundo', 'periodic-buttons-banner')),
							el(ColorPalette, {
								colors: colorPaletteList,
								value: attributes.backgroundColor,
								onChange: function (c) {
									setAttributes({ backgroundColor: c || '#01913a' });
								}
							})
						)
					);
				}

				inspectorElements.push(
					el(InspectorControls, { key: 'inspector' }, panelChildren)
				);
			}

			// Barra de ferramentas do bloco (BlockControls)
			if (BlockControls && AlignmentToolbar) {
				inspectorElements.push(
					el(BlockControls, { key: 'controls' },
						el(AlignmentToolbar, {
							value: alignment,
							onChange: function (newAlign) {
								setAttributes({ alignment: newAlign || 'center' });
							}
						})
					)
				);
			}

			// Renderização dos Botões na Tela (Canvas do Gutenberg)
			var editorButtonsList = [];

			for (var j = 0; j < totalItems; j++) {
				(function (index) {
					var currentTitle = titles[index];
					var currentDescription = descriptions[index];
					var currentUrl = urls[index];
					var currentLogo = logos[index];

					var hasLogo = currentLogo && currentLogo.trim() !== '';

					// Logo preview com botão de câmera
					var logoCol = el('div', { className: 'col-4' },
						el('div', {
							className: 'img_logo' + (hasLogo ? ' has-image' : ' no-image'),
							style: {
								backgroundImage: hasLogo ? "url('" + currentLogo + "')" : 'none'
							}
						},
							el('button', {
								type: 'button',
								className: 'link btn-upload-camera',
								title: __('Clique para enviar ou alterar o logotipo', 'periodic-buttons-banner'),
								onClick: function (ev) {
									ev.preventDefault();
									openMediaModal(index);
								}
							}, cameraSvg)
						)
					);

					// Descrição com RichText
					var descCol = el('div', { className: 'col-8 text-end' },
						RichText ? el(RichText, {
							tagName: 'h2',
							className: 'rich-text',
							style: {
								color: '#ffffff',
								textShadow: '0px 3px 1px rgba(50, 50, 50, 0.3)',
								fontSize: '23px',
								margin: '0',
								lineHeight: '1.2'
							},
							multiline: false,
							placeholder: __('Coloque seu texto aqui...', 'periodic-buttons-banner'),
							value: currentDescription,
							onChange: function (val) { updateDescriptionAt(index, val); }
						}) : el('h2', { className: 'rich-text' }, currentDescription)
					);

					// Linha superior: Logo + Descrição
					var topRow = el('div', { className: 'row align-items-center' }, logoCol, descCol);

					// Linha inferior: Sigla / Título
					var bottomRow = el('div', { className: 'row' },
						el('div', { className: 'sigla' },
							el('div', { className: 'sigla-1' },
								el('input', {
									type: 'text',
									className: 'input-sigla-editor',
									placeholder: __('Coloque titulo aqui...', 'periodic-buttons-banner'),
									value: currentTitle,
									onChange: function (e) { updateTitleAt(index, e.target.value); }
								})
							)
						)
					);

					// Botões rápidos de controle inline (+ e -)
					var actionButtons = el('div', { className: 'editor-btn-actions' },
						el('button', {
							type: 'button',
							className: 'btn-action btn-remove-item',
							'aria-label': __('Remover Linha', 'periodic-buttons-banner'),
							title: __('Remover Botão', 'periodic-buttons-banner'),
							onClick: function () { removeItemAt(index); }
						}, '-'),
						el('button', {
							type: 'button',
							className: 'btn-action btn-add-item',
							'aria-label': __('Adiciona Linha', 'periodic-buttons-banner'),
							title: __('Adicionar Botão', 'periodic-buttons-banner'),
							onClick: function () { addItemAt(index); }
						}, '+')
					);

					// Popup inline para edição rápida do link
					var inlineLinkField = el('div', { className: 'editor-buttons-banner' },
						el('input', {
							type: 'text',
							placeholder: __('Coloque seu Link aqui...', 'periodic-buttons-banner'),
							value: currentUrl,
							className: 'link quick-link-input',
							onChange: function (e) { updateUrlAt(index, e.target.value); }
						}),
						el('button', {
							type: 'button',
							className: 'link btn-link-toggle',
							title: __('Link de destino', 'periodic-buttons-banner'),
							onClick: function (e) {
								e.preventDefault();
								var parent = (window.jQuery) ? window.jQuery(e.target).closest('.editor-btn-wrapper') : null;
								if (parent) {
									parent.find('.quick-link-input').toggleClass('visible');
								}
							}
						}, linkSvg)
					);

					// Card unitário (.btn-m1)
					var cardElement = el('div', {
						className: 'btn-m1' + (themeStyle !== 'default' ? ' btn-style-' + themeStyle : ''),
						style: attributes.backgroundColor && themeStyle === 'default' ? {
							borderLeftColor: attributes.backgroundColor
						} : {}
					}, topRow, bottomRow, actionButtons);

					editorButtonsList.push(
						el('div', {
							key: 'editor-item-' + index,
							className: 'editor-btn-wrapper'
						}, cardElement, inlineLinkField)
					);
				})(j);
			}

			var containerClasses = [
				'block',
				'buttons-banner',
				'buttons-banner-cols-' + columns,
				'buttons-banner-align-' + alignment,
				'theme-' + themeStyle
			].join(' ');

			var blockCanvas = el('div', {
				className: containerClasses
			}, editorButtonsList);

			return el('div', {
				className: 'periodic-buttons-banner-admin-wrapper'
			}, inspectorElements, blockCanvas);
		},

		/**
		 * Renderização do Frontend (HTML gerado e salvo no post)
		 */
		save: function (props) {
			var attributes = props.attributes;
			var titles = Array.isArray(attributes.title) ? attributes.title : [];
			var descriptions = Array.isArray(attributes.description) ? attributes.description : [];
			var urls = Array.isArray(attributes.url) ? attributes.url : [];
			var logos = Array.isArray(attributes.logo) ? attributes.logo : [];
			var targetBlanks = Array.isArray(attributes.targetBlank) ? attributes.targetBlank : [];

			var totalItems = Math.min(titles.length, descriptions.length);
			if (totalItems === 0) {
				totalItems = Math.max(titles.length, descriptions.length, urls.length, logos.length);
			}

			var columns = attributes.columns || (totalItems <= 5 ? totalItems : 5);
			var alignment = attributes.alignment || 'center';
			var themeStyle = attributes.themeStyle || 'default';

			var savedCards = [];

			for (var idx = 0; idx < totalItems; idx++) {
				var url = urls[idx] || '#';
				var logo = logos[idx] || '';
				var title = titles[idx] || '';
				var description = descriptions[idx] || '';
				var isBlank = !!targetBlanks[idx];

				var hasLogo = logo && logo.trim() !== '';

				// Coluna 4: Logotipo
				var logoCol = el('div', { className: 'col-4' },
					el('div', {
						className: 'img_logo' + (hasLogo ? ' has-image' : ' no-image'),
						style: {
							backgroundImage: hasLogo ? "url('" + logo + "')" : 'none'
						}
					})
				);

				// Coluna 8: Descrição Rica
				var descCol = el('div', { className: 'col-8 text-end' },
					el('h2', {
						className: 'rich-text',
						style: {
							color: '#ffffff',
							textShadow: '0px 3px 1px rgba(50, 50, 50, 0.3)',
							fontSize: '23px'
						}
					},
						RichText ? el(RichText.Content, { value: description }) : description
					)
				);

				var rowTop = el('div', { className: 'row' }, logoCol, descCol);

				// Linha Inferior: Sigla / Título
				var rowBottom = el('div', { className: 'row' },
					el('div', { className: 'sigla' },
						el('div', {
							className: 'sigla-1',
							style: {
								display: 'block',
								minWidth: '190px',
								height: '26px',
								textAlign: 'center'
							}
						},
							RichText ? el(RichText.Content, { value: title }) : title
						)
					)
				);

				// Tag <a> do Botão (.btn-m1)
				var linkProps = {
					className: 'btn-m1' + (themeStyle !== 'default' ? ' btn-style-' + themeStyle : ''),
					href: url
				};

				if (isBlank) {
					linkProps.target = '_blank';
					linkProps.rel = 'noopener noreferrer';
				}

				savedCards.push(
					el('a', linkProps, rowTop, rowBottom)
				);
			}

			var wrapperClasses = [
				'block',
				'buttons-banner',
				'buttons-banner-cols-' + columns,
				'buttons-banner-align-' + alignment,
				'theme-' + themeStyle
			].join(' ');

			return el('div', {
				className: wrapperClasses
			}, savedCards);
		},

		/**
		 * Compatibilidade retroativa para blocos legados cms-adm/buttons-banner
		 */
		deprecated: [
			{
				attributes: {
					title: { type: 'array' },
					description: { type: 'array' },
					url: { type: 'array' },
					logo: { type: 'array' }
				},
				save: function (props) {
					var sizelines = Math.round((props.attributes.description.length + props.attributes.title.length) / 2);
					var lines_save = [];
					for (var index = 0; index < sizelines; index++) {
						lines_save.push(
							el('a',
								{ className: 'btn-m1', href: props.attributes.url[index] },
								el('div',
									{ className: 'row' },
									el('div',
										{ className: 'col-4' },
										el('div',
											{
												className: 'img_logo',
												style: {
													backgroundImage: (props.attributes.logo !== undefined && (props.attributes.logo[index] !== '' && props.attributes.logo[index] !== undefined) ? ("url('" + props.attributes.logo[index] + "')") : '')
												}
											}
										)
									),
									el('div',
										{ className: 'col-8 text-end' },
										el('h2',
											{
												style: {
													color: '#ffffff',
													textShadow: '0px 3px 1px rgba(50, 50, 50, 0.3)',
													fontSize: '23px'
												},
												className: 'rich-text'
											},
											props.attributes.description[index]
										)
									)
								),
								el('div',
									{ className: 'row' },
									el('div',
										{ className: 'sigla' },
										el('div',
											{
												className: 'sigla-1',
												style: { display: 'block', minWidth: '190px', height: '26px', textAlign: 'center' }
											},
											props.attributes.title[index]
										)
									)
								)
							)
						);
					}
					return el('div', { className: 'block buttons-banner' }, lines_save);
				}
			}
		]
	};

	// 1. Registro do Bloco Oficial Moderno
	registerBlockType('periodic/buttons-banner', blockSettings);

	// 2. Registro do Bloco Legado para retrocompatibilidade com posts antigos
	try {
		registerBlockType('cms-adm/buttons-banner', blockSettings);
	} catch (e) {
		// Bloco legado já registrado por outro componente
	}

})(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor || window.wp.editor,
	window.wp.components,
	window.wp.i18n
);
