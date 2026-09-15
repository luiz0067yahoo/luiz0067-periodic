/**
 * Periodic - Audio Embed
 * Bloco Gutenberg Vanilla JavaScript (ES5) para reprodução de áudio e podcasts.
 *
 * @package Periodic_Audio_Embed
 */
(function (blocks, element, components, editor, i18n) {
	'use strict';

	var el = element.createElement;
	var registerBlockType = blocks.registerBlockType;
	var __ = i18n.__;

	// Componentes Gutenberg
	var Button = components.Button;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
	var ToggleControl = components.ToggleControl;
	var SelectControl = components.SelectControl;
	var ColorPalette = components.ColorPalette;
	var Placeholder = components.Placeholder;
	var Dashicon = components.Dashicon;

	var InspectorControls = editor.InspectorControls;
	var MediaUpload = editor.MediaUpload;
	var RichText = editor.RichText;

	// Ícone SVG personalizado para o bloco
	var blockIcon = el(
		'svg',
		{
			width: 24,
			height: 24,
			viewBox: '0 0 24 24',
			fill: 'none',
			xmlns: 'http://www.w3.org/2000/svg'
		},
		el('path', {
			d: 'M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12',
			stroke: '#0284c7',
			strokeWidth: 2,
			strokeLinecap: 'round'
		}),
		el('rect', {
			x: 2,
			y: 11,
			width: 3.5,
			height: 7,
			rx: 1.75,
			fill: '#0284c7'
		}),
		el('rect', {
			x: 18.5,
			y: 11,
			width: 3.5,
			height: 7,
			rx: 1.75,
			fill: '#0284c7'
		}),
		el('line', {
			x1: 8,
			y1: 11,
			x2: 8,
			y2: 17,
			stroke: '#0ea5e9',
			strokeWidth: 1.8,
			strokeLinecap: 'round'
		}),
		el('line', {
			x1: 10.7,
			y1: 9,
			x2: 10.7,
			y2: 19,
			stroke: '#0284c7',
			strokeWidth: 1.8,
			strokeLinecap: 'round'
		}),
		el('line', {
			x1: 13.3,
			y1: 7.5,
			x2: 13.3,
			y2: 20.5,
			stroke: '#0369a1',
			strokeWidth: 1.8,
			strokeLinecap: 'round'
		}),
		el('line', {
			x1: 16,
			y1: 12,
			x2: 16,
			y2: 16,
			stroke: '#0ea5e9',
			strokeWidth: 1.8,
			strokeLinecap: 'round'
		})
	);

	// Paleta de cores padrão harmoniosa
	var defaultColors = [
		{ name: __('Branco Puro', 'periodic-audio-embed'), color: '#ffffff' },
		{ name: __('Cinza Claro', 'periodic-audio-embed'), color: '#f8fafc' },
		{ name: __('Azul Névoa', 'periodic-audio-embed'), color: '#f0f9ff' },
		{ name: __('Índigo Suave', 'periodic-audio-embed'), color: '#eef2ff' },
		{ name: __('Ardósia Escuro', 'periodic-audio-embed'), color: '#0f172a' },
		{ name: __('Carvão Grafite', 'periodic-audio-embed'), color: '#1e293b' },
		{ name: __('Azul Oceano', 'periodic-audio-embed'), color: '#0284c7' }
	];

	// Registro do bloco Gutenberg
	registerBlockType('periodic/audio-embed', {
		title: __('Periodic - Audio Embed', 'periodic-audio-embed'),
		description: __('Player de áudio e podcast moderno com upload nativo, capa, informações e download.', 'periodic-audio-embed'),
		icon: blockIcon,
		category: 'media',
		keywords: [
			__('audio', 'periodic-audio-embed'),
			__('podcast', 'periodic-audio-embed'),
			__('musica', 'periodic-audio-embed'),
			__('player', 'periodic-audio-embed'),
			__('mp3', 'periodic-audio-embed')
		],
		supports: {
			align: ['center', 'wide', 'full'],
			html: false
		},
		attributes: {
			audioUrl: {
				type: 'string',
				default: ''
			},
			audioId: {
				type: 'number',
				default: 0
			},
			title: {
				type: 'string',
				default: ''
			},
			artist: {
				type: 'string',
				default: ''
			},
			coverUrl: {
				type: 'string',
				default: ''
			},
			coverId: {
				type: 'number',
				default: 0
			},
			showDownload: {
				type: 'boolean',
				default: true
			},
			loop: {
				type: 'boolean',
				default: false
			},
			preload: {
				type: 'string',
				default: 'metadata'
			},
			cardBackground: {
				type: 'string',
				default: '#ffffff'
			},
			textColor: {
				type: 'string',
				default: '#1e293b'
			}
		},

		/**
		 * Renderização no Editor Gutenberg (edit)
		 */
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var isSelected = props.isSelected;

			// Função ao selecionar áudio da biblioteca do WordPress
			function onSelectAudio(media) {
				if (!media || !media.url) {
					return;
				}
				var newAttrs = {
					audioUrl: media.url,
					audioId: media.id || 0
				};
				// Se título estiver vazio, preenche com título do anexo
				if (!attributes.title || attributes.title.trim() === '') {
					newAttrs.title = media.title || media.filename || '';
				}
				// Se artista estiver vazio e metadata tiver artist
				if (!attributes.artist && media.artist) {
					newAttrs.artist = media.artist;
				}
				setAttributes(newAttrs);
			}

			// Função ao selecionar capa de imagem
			function onSelectCover(media) {
				if (!media || !media.url) {
					return;
				}
				setAttributes({
					coverUrl: media.url,
					coverId: media.id || 0
				});
			}

			// Função para remover capa
			function onRemoveCover() {
				setAttributes({
					coverUrl: '',
					coverId: 0
				});
			}

			// Função para remover áudio
			function onRemoveAudio() {
				setAttributes({
					audioUrl: '',
					audioId: 0
				});
			}

			// Barra lateral (InspectorControls)
			var inspector = el(
				InspectorControls,
				{ key: 'inspector' },
				el(
					PanelBody,
					{
						title: __('Configurações de Áudio', 'periodic-audio-embed'),
						initialOpen: true
					},
					el(TextControl, {
						label: __('URL do Arquivo de Áudio', 'periodic-audio-embed'),
						help: __('Cole a URL direta ou utilize o botão abaixo para enviar um arquivo.', 'periodic-audio-embed'),
						value: attributes.audioUrl,
						onChange: function (val) {
							setAttributes({ audioUrl: val });
						}
					}),
					el(
						'div',
						{ className: 'periodic-audio-inspector-buttons' },
						el(
							MediaUpload,
							{
								onSelect: onSelectAudio,
								allowedTypes: ['audio'],
								value: attributes.audioId,
								render: function (obj) {
									return el(
										Button,
										{
											isSecondary: true,
											onClick: obj.open,
											className: 'periodic-btn-full'
										},
										attributes.audioUrl
											? __('Substituir Arquivo de Áudio', 'periodic-audio-embed')
											: __('Selecionar / Upload de Áudio', 'periodic-audio-embed')
									);
								}
							}
						),
						attributes.audioUrl &&
							el(
								Button,
								{
									isDestructive: true,
									isLink: true,
									onClick: onRemoveAudio,
									className: 'periodic-btn-remove'
								},
								__('Remover Áudio', 'periodic-audio-embed')
							)
					),
					el('hr', { className: 'periodic-separator-line' }),
					el(
						'div',
						{ className: 'periodic-audio-cover-setting' },
						el('p', { className: 'components-base-control__label' }, __('Capa do Áudio / Álbum', 'periodic-audio-embed')),
						attributes.coverUrl &&
							el(
								'div',
								{ className: 'periodic-cover-preview-wrapper' },
								el('img', {
									src: attributes.coverUrl,
									alt: __('Pré-visualização da Capa', 'periodic-audio-embed'),
									className: 'periodic-cover-preview-thumb'
								})
							),
						el(
							MediaUpload,
							{
								onSelect: onSelectCover,
								allowedTypes: ['image'],
								value: attributes.coverId,
								render: function (obj) {
									return el(
										Button,
										{
											isSecondary: true,
											onClick: obj.open,
											className: 'periodic-btn-full'
										},
										attributes.coverUrl
											? __('Substituir Imagem de Capa', 'periodic-audio-embed')
											: __('Adicionar Imagem de Capa', 'periodic-audio-embed')
									);
								}
							}
						),
						attributes.coverUrl &&
							el(
								Button,
								{
									isDestructive: true,
									isLink: true,
									onClick: onRemoveCover,
									className: 'periodic-btn-remove'
								},
								__('Remover Imagem de Capa', 'periodic-audio-embed')
							)
					),
					el('hr', { className: 'periodic-separator-line' }),
					el(ToggleControl, {
						label: __('Exibir Botão de Download', 'periodic-audio-embed'),
						help: attributes.showDownload
							? __('Permite que os visitantes façam download direto da faixa.', 'periodic-audio-embed')
							: __('Botão de download oculto.', 'periodic-audio-embed'),
						checked: attributes.showDownload,
						onChange: function (val) {
							setAttributes({ showDownload: val });
						}
					}),
					el(ToggleControl, {
						label: __('Repetição Contínua (Loop)', 'periodic-audio-embed'),
						help: attributes.loop
							? __('O áudio recomeçará automaticamente ao finalizar.', 'periodic-audio-embed')
							: __('Reprodução única normal.', 'periodic-audio-embed'),
						checked: attributes.loop,
						onChange: function (val) {
							setAttributes({ loop: val });
						}
					}),
					el(SelectControl, {
						label: __('Pré-carregamento (Preload)', 'periodic-audio-embed'),
						value: attributes.preload,
						options: [
							{ label: __('Metadados apenas (Padrão)', 'periodic-audio-embed'), value: 'metadata' },
							{ label: __('Automático (Buffer completo)', 'periodic-audio-embed'), value: 'auto' },
							{ label: __('Nenhum (Economiza banda)', 'periodic-audio-embed'), value: 'none' }
						],
						onChange: function (val) {
							setAttributes({ preload: val });
						}
					})
				),
				el(
					PanelBody,
					{
						title: __('Cores e Aparência', 'periodic-audio-embed'),
						initialOpen: false
					},
					el('p', { className: 'components-base-control__label' }, __('Cor de Fundo do Card', 'periodic-audio-embed')),
					el(ColorPalette, {
						colors: defaultColors,
						value: attributes.cardBackground,
						onChange: function (color) {
							setAttributes({ cardBackground: color || '#ffffff' });
						}
					}),
					el('p', { className: 'components-base-control__label' }, __('Cor dos Textos e Títulos', 'periodic-audio-embed')),
					el(ColorPalette, {
						colors: defaultColors,
						value: attributes.textColor,
						onChange: function (color) {
							setAttributes({ textColor: color || '#1e293b' });
						}
					})
				)
			);

			// Se nenhuma URL de áudio estiver definida, renderiza o Placeholder de upload
			if (!attributes.audioUrl || attributes.audioUrl.trim() === '') {
				return [
					inspector,
					el(
						Placeholder,
						{
							key: 'placeholder',
							icon: blockIcon,
							label: __('Periodic - Bloco de Áudio com Upload e Embed', 'periodic-audio-embed'),
							instructions: __('Envie um arquivo de áudio (MP3, WAV, OGG, M4A) da biblioteca ou insira uma URL direta para criar o player.', 'periodic-audio-embed'),
							className: 'periodic-audio-placeholder'
						},
						el(
							'div',
							{ className: 'periodic-placeholder-actions' },
							el(
								MediaUpload,
								{
									onSelect: onSelectAudio,
									allowedTypes: ['audio'],
									render: function (obj) {
										return el(
											Button,
											{
												isPrimary: true,
												onClick: obj.open,
												className: 'periodic-audio-upload-btn'
											},
											el(Dashicon, { icon: 'upload' }),
											' ',
											__('Enviar ou Selecionar Áudio', 'periodic-audio-embed')
										);
									}
								}
							),
							el('span', { className: 'periodic-placeholder-or' }, __('ou insira a URL direta:', 'periodic-audio-embed')),
							el(
								'div',
								{ className: 'periodic-placeholder-url-row' },
								el(TextControl, {
									placeholder: 'https://exemplo.com/audio.mp3',
									value: attributes.audioUrl,
									onChange: function (val) {
										setAttributes({ audioUrl: val });
									}
								}),
								el(
									Button,
									{
										isSecondary: true,
										onClick: function () {
											if (attributes.audioUrl && (!attributes.title || attributes.title === '')) {
												var parts = attributes.audioUrl.split('/');
												setAttributes({ title: parts[parts.length - 1] });
											}
										}
									},
									__('Aplicar', 'periodic-audio-embed')
								)
							)
						)
					)
				];
			}

			// Renderização interativa do Card dentro do Editor Gutenberg
			var cardStyles = {
				backgroundColor: attributes.cardBackground || '#ffffff',
				color: attributes.textColor || '#1e293b'
			};

			return [
				inspector,
				el(
					'div',
					{
						key: 'audio-card-wrapper',
						className: 'periodic-audio-card-wrapper' + (isSelected ? ' is-selected' : '')
					},
					el(
						'div',
						{
							className: 'periodic-audio-card',
							style: cardStyles
						},
						// Seção da Capa
						el(
							'div',
							{ className: 'periodic-audio-cover-container' },
							attributes.coverUrl
								? el('img', {
										src: attributes.coverUrl,
										alt: attributes.title || __('Capa do Áudio', 'periodic-audio-embed'),
										className: 'periodic-audio-cover-img'
								  })
								: el(
										'div',
										{ className: 'periodic-audio-cover-placeholder' },
										el(Dashicon, { icon: 'format-audio', size: 40 }),
										el('span', {}, __('Sem Capa', 'periodic-audio-embed'))
								  ),
							// Botão de upload/edição rápida de capa
							el(
								MediaUpload,
								{
									onSelect: onSelectCover,
									allowedTypes: ['image'],
									value: attributes.coverId,
									render: function (obj) {
										return el(
											Button,
											{
												isSmall: true,
												onClick: obj.open,
												className: 'periodic-cover-edit-btn',
												title: __('Alterar Imagem de Capa', 'periodic-audio-embed')
											},
											el(Dashicon, { icon: 'camera' })
										);
									}
								}
							)
						),
						// Conteúdo de Informações e Player
						el(
							'div',
							{ className: 'periodic-audio-content' },
							el(
								'div',
								{ className: 'periodic-audio-info' },
								el(RichText, {
									tagName: 'h4',
									className: 'periodic-audio-title',
									value: attributes.title,
									placeholder: __('Título da faixa ou episódio...', 'periodic-audio-embed'),
									onChange: function (val) {
										setAttributes({ title: val });
									},
									style: { color: attributes.textColor }
								}),
								el(RichText, {
									tagName: 'p',
									className: 'periodic-audio-artist',
									value: attributes.artist,
									placeholder: __('Nome do artista, autor ou locutor...', 'periodic-audio-embed'),
									onChange: function (val) {
										setAttributes({ artist: val });
									}
								})
							),
							// Player de áudio interativo
							el(
								'div',
								{ className: 'periodic-audio-player-wrapper' },
								el('audio', {
									controls: true,
									className: 'periodic-audio-player',
									src: attributes.audioUrl,
									loop: attributes.loop,
									preload: attributes.preload
								})
							),
							// Barra de Ações (Download e Trocar)
							el(
								'div',
								{ className: 'periodic-audio-actions' },
								attributes.showDownload &&
									el(
										'a',
										{
											href: attributes.audioUrl,
											download: true,
											className: 'periodic-audio-download-btn',
											target: '_blank',
											rel: 'noopener noreferrer'
										},
										el(Dashicon, { icon: 'download' }),
										' ',
										__('Baixar Áudio', 'periodic-audio-embed')
									),
								el(
									MediaUpload,
									{
										onSelect: onSelectAudio,
										allowedTypes: ['audio'],
										value: attributes.audioId,
										render: function (obj) {
											return el(
												Button,
												{
													isLink: true,
													onClick: obj.open,
													className: 'periodic-audio-replace-link'
												},
												__('Trocar arquivo', 'periodic-audio-embed')
											);
										}
									}
								)
							)
						)
					)
				)
			];
		},

		/**
		 * Renderização pública no Frontend (save)
		 */
		save: function (props) {
			var attributes = props.attributes;

			if (!attributes.audioUrl || attributes.audioUrl.trim() === '') {
				return null;
			}

			var cardStyles = {
				backgroundColor: attributes.cardBackground || '#ffffff',
				color: attributes.textColor || '#1e293b'
			};

			var mimeType = 'audio/mpeg';
			var ext = attributes.audioUrl.split('.').pop().toLowerCase();
			if (ext === 'wav') {
				mimeType = 'audio/wav';
			} else if (ext === 'ogg') {
				mimeType = 'audio/ogg';
			} else if (ext === 'm4a') {
				mimeType = 'audio/mp4';
			}

			return el(
				'div',
				{
					className: 'periodic-audio-card-wrapper'
				},
				el(
					'div',
					{
						className: 'periodic-audio-card',
						style: cardStyles
					},
					// Capa opcional
					attributes.coverUrl &&
						el(
							'div',
							{ className: 'periodic-audio-cover-container' },
							el('img', {
								src: attributes.coverUrl,
								alt: attributes.title || __('Capa do Áudio', 'periodic-audio-embed'),
								className: 'periodic-audio-cover-img',
								loading: 'lazy'
							})
						),
					// Conteúdo textual e reprodutor
					el(
						'div',
						{ className: 'periodic-audio-content' },
						(attributes.title || attributes.artist) &&
							el(
								'div',
								{ className: 'periodic-audio-info' },
								attributes.title &&
									el(
										'h4',
										{
											className: 'periodic-audio-title',
											style: { color: attributes.textColor }
										},
										attributes.title
									),
								attributes.artist &&
									el(
										'p',
										{ className: 'periodic-audio-artist' },
										attributes.artist
									)
							),
						el(
							'div',
							{ className: 'periodic-audio-player-wrapper' },
							el(
								'audio',
								{
									controls: true,
									className: 'periodic-audio-player',
									preload: attributes.preload || 'metadata',
									loop: attributes.loop ? true : undefined
								},
								el('source', {
									src: attributes.audioUrl,
									type: mimeType
								}),
								__('Seu navegador não suporta a reprodução deste arquivo de áudio.', 'periodic-audio-embed')
							)
						),
						attributes.showDownload &&
							el(
								'div',
								{ className: 'periodic-audio-actions' },
								el(
									'a',
									{
										href: attributes.audioUrl,
										download: true,
										className: 'periodic-audio-download-btn',
										target: '_blank',
										rel: 'noopener noreferrer'
									},
									el(
										'svg',
										{
											width: 16,
											height: 16,
											viewBox: '0 0 24 24',
											fill: 'none',
											stroke: 'currentColor',
											strokeWidth: 2,
											strokeLinecap: 'round',
											strokeLinejoin: 'round',
											className: 'periodic-download-icon'
										},
										el('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
										el('polyline', { points: '7 10 12 15 17 10' }),
										el('line', { x1: 12, y1: 15, x2: 12, y2: 3 })
									),
									el('span', {}, __('Baixar Áudio', 'periodic-audio-embed'))
								)
							)
					)
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
