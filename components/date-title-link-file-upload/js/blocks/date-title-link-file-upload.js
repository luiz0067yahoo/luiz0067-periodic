/**
 * periodic / customADM Date Title Link File Upload - Gutenberg Custom Block
 *
 * Bloco Gutenberg customizado para publicação de documentos, editais e arquivos para download com:
 * - Data de publicação / evento
 * - Título descritivo formatável (RichText)
 * - Link alternativo ou redirecionamento externo
 * - Upload / seleção de arquivo (PDF, DOCX, etc.) via wp.blockEditor.MediaUpload
 * - Badge de categoria / status
 * - Suporte a múltiplos modos de exibição (Card Moderno ou Linha de Tabela / Lista)
 * - Total compatibilidade retroativa com o bloco cms-adm/date-title-link-file-upload
 *
 * Implementado estritamente em JavaScript Vanilla ES5 (sem dependência de Babel ou build step).
 *
 * @package Periodic_Date_Title_Link_File_Upload
 * @version 1.0.0
 */

(function (blocks, element, blockEditor, components, i18n) {
	'use strict';

	// Garante que o ambiente Gutenberg esteja disponível
	if (!blocks || !element || !blocks.registerBlockType) {
		return;
	}

	var el = element.createElement;
	var registerBlockType = blocks.registerBlockType;

	/**
	 * Função de Internacionalização com fallback seguro
	 * Utiliza wp.i18n.__ e busca fallback no dicionário window.dateTitleLinkFileUploadI18n
	 */
	var __ = function (text, domain) {
		var textDomain = domain || 'custom-adm';
		if (i18n && typeof i18n.__ === 'function') {
			var translated = i18n.__(text, textDomain);
			if (translated && translated !== text) {
				return translated;
			}
		}
		if (window.dateTitleLinkFileUploadI18n && window.dateTitleLinkFileUploadI18n[text]) {
			return window.dateTitleLinkFileUploadI18n[text];
		}
		return text;
	};

	// Referências seguras para módulos do Gutenberg
	var editor = blockEditor || window.wp.editor || {};
	var RichText = editor.RichText;
	var InspectorControls = editor.InspectorControls;
	var MediaUpload = editor.MediaUpload;
	var MediaUploadCheck = editor.MediaUploadCheck || function (props) { return props.children; };

	var comps = components || window.wp.components || {};
	var PanelBody = comps.PanelBody;
	var PanelRow = comps.PanelRow;
	var TextControl = comps.TextControl;
	var SelectControl = comps.SelectControl;
	var ToggleControl = comps.ToggleControl;
	var Button = comps.Button;
	var Dashicon = comps.Dashicon || function (props) {
		return el('span', { className: 'dashicons dashicons-' + props.icon });
	};

	/**
	 * Formata tamanho de arquivo em bytes para formato legível (KB, MB)
	 */
	function formatFileSize(bytes) {
		if (!bytes || isNaN(bytes)) {
			return '';
		}
		var thresh = 1024;
		if (Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}
		var units = ['KB', 'MB', 'GB', 'TB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while (Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1) + ' ' + units[u];
	}

	/**
	 * Extrai a extensão do arquivo a partir de uma URL ou nome
	 */
	function getFileExtension(filename) {
		if (!filename) {
			return 'FILE';
		}
		var clean = filename.split('?')[0].split('#')[0];
		var parts = clean.split('.');
		if (parts.length > 1) {
			return parts.pop().toUpperCase();
		}
		return 'FILE';
	}

	/**
	 * Renderiza ícone SVG vetorial inline baseado na extensão
	 */
	function renderFileIcon(extension) {
		var ext = (extension || 'FILE').toUpperCase();
		var badgeColor = '#005bb5';
		if (ext === 'PDF') {
			badgeColor = '#d9381e';
		} else if (ext === 'DOC' || ext === 'DOCX') {
			badgeColor = '#2b579a';
		} else if (ext === 'XLS' || ext === 'XLSX' || ext === 'CSV') {
			badgeColor = '#107c41';
		} else if (ext === 'ZIP' || ext === 'RAR' || ext === '7Z') {
			badgeColor = '#d83b01';
		}

		return el(
			'div',
			{ className: 'dtlf-icon-badge', style: { backgroundColor: badgeColor } },
			el(
				'svg',
				{
					className: 'dtlf-svg-icon',
					viewBox: '0 0 24 24',
					width: '24',
					height: '24',
					fill: 'none',
					stroke: 'currentColor',
					strokeWidth: '2',
					strokeLinecap: 'round',
					strokeLinejoin: 'round'
				},
				el('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
				el('polyline', { points: '14 2 14 8 20 8' }),
				el('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
				el('line', { x1: '16', y1: '17', x2: '8', y2: '17' }),
				el('line', { x1: '10', y1: '9', x2: '8', y2: '9' })
			),
			el('span', { className: 'dtlf-icon-text' }, ext)
		);
	}

	/**
	 * Definição dos atributos do bloco
	 */
	var blockAttributes = {
		date: {
			type: 'string',
			default: ''
		},
		title: {
			type: 'string',
			default: ''
		},
		url: {
			type: 'string',
			default: ''
		},
		fileUrl: {
			type: 'string',
			default: ''
		},
		fileId: {
			type: 'number',
			default: 0
		},
		fileName: {
			type: 'string',
			default: ''
		},
		fileSize: {
			type: 'string',
			default: ''
		},
		mimeType: {
			type: 'string',
			default: ''
		},
		caption: {
			type: 'string',
			default: ''
		},
		badgeText: {
			type: 'string',
			default: ''
		},
		buttonText: {
			type: 'string',
			default: ''
		},
		openInNewTab: {
			type: 'boolean',
			default: true
		},
		displayMode: {
			type: 'string',
			default: 'card' // 'card' ou 'table-row'
		},
		showDownloadCount: {
			type: 'boolean',
			default: false
		}
	};

	/**
	 * Configuração do bloco para inserção e preview
	 */
	var blockConfig = {
		title: __('Data, Título, Link e Upload de Arquivo', 'custom-adm'),
		description: __('Exibe publicações, editais ou documentos com data destacada, título descritivo, link e download de anexo.', 'custom-adm'),
		icon: 'media-document',
		category: 'design',
		keywords: [
			__('arquivo', 'custom-adm'),
			__('download', 'custom-adm'),
			__('edital', 'custom-adm'),
			__('pdf', 'custom-adm'),
			__('data', 'custom-adm')
		],
		supports: {
			multiple: true,
			align: ['wide', 'full'],
			html: false
		},
		attributes: blockAttributes,
		example: {
			attributes: {
				date: '12/09/2026',
				caption: __('Edital de Licitação', 'custom-adm'),
				badgeText: __('Novo', 'custom-adm'),
				title: __('Edital de Licitação Nº 042/2026 - Contratação de Serviços Especializados de TI', 'custom-adm'),
				fileName: 'edital-licitacao-042-2026.pdf',
				fileSize: '2.4 MB',
				mimeType: 'application/pdf',
				fileUrl: 'https://exemplo.gov.br/documentos/edital-licitacao-042-2026.pdf',
				url: 'https://exemplo.gov.br/licitacoes/edital-042-2026',
				buttonText: __('Baixar Edital', 'custom-adm'),
				displayMode: 'card',
				openInNewTab: true
			}
		},

		/**
		 * Renderização no modo de edição (Editor Gutenberg)
		 */
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var isSelected = props.isSelected;

			var date = attributes.date;
			var title = attributes.title;
			var url = attributes.url;
			var fileUrl = attributes.fileUrl;
			var fileId = attributes.fileId;
			var fileName = attributes.fileName;
			var fileSize = attributes.fileSize;
			var mimeType = attributes.mimeType;
			var caption = attributes.caption;
			var badgeText = attributes.badgeText;
			var buttonText = attributes.buttonText || __('Download', 'custom-adm');
			var openInNewTab = attributes.openInNewTab;
			var displayMode = attributes.displayMode;

			var ext = fileName ? getFileExtension(fileName) : (fileUrl ? getFileExtension(fileUrl) : 'PDF');

			// Manipulador da seleção de mídia via MediaUpload do WordPress
			function onSelectFile(media) {
				if (!media) {
					return;
				}
				var filename = media.filename || media.title || '';
				if (!filename && media.url) {
					var parts = media.url.split('/');
					filename = parts[parts.length - 1];
				}

				var sizeFormatted = '';
				if (media.filesizeInBytes) {
					sizeFormatted = formatFileSize(media.filesizeInBytes);
				} else if (media.filesizeHumanReadable) {
					sizeFormatted = media.filesizeHumanReadable;
				}

				setAttributes({
					fileUrl: media.url,
					fileId: media.id || 0,
					fileName: filename,
					fileSize: sizeFormatted,
					mimeType: media.mime || media.mime_type || ''
				});
			}

			// Manipulador para remover arquivo anexado
			function onRemoveFile() {
				setAttributes({
					fileUrl: '',
					fileId: 0,
					fileName: '',
					fileSize: '',
					mimeType: ''
				});
			}

			return el(
				'div',
				{
					className: 'dtlf-editor-wrapper dtlf-layout-' + displayMode + (isSelected ? ' is-selected' : '')
				},

				// Painel Lateral de Configurações (InspectorControls)
				el(
					InspectorControls,
					{},
					// 1. Painel de Arquivo & Upload
					el(
						PanelBody,
						{
							title: __('Arquivo e Download', 'custom-adm'),
							initialOpen: true
						},
						el(
							MediaUploadCheck,
							{},
							el(MediaUpload, {
								onSelect: onSelectFile,
								allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip', 'image/jpeg', 'image/png'],
								value: fileId,
								render: function (obj) {
									return el(
										'div',
										{ className: 'dtlf-inspector-media-box' },
										fileUrl
											? el(
												'div',
												{ className: 'dtlf-inspector-file-preview' },
												el(
													'p',
													{ className: 'dtlf-inspector-file-name' },
													el('strong', {}, __('Arquivo:', 'custom-adm') + ' '),
													fileName || fileUrl
												),
												fileSize ? el('p', { className: 'dtlf-inspector-file-size' }, __('Tamanho:', 'custom-adm') + ' ' + fileSize) : null,
												el(
													'div',
													{ className: 'dtlf-inspector-actions' },
													el(
														Button,
														{
															isSecondary: true,
															isSmall: true,
															onClick: obj.open
														},
														__('Substituir Arquivo', 'custom-adm')
													),
													el(
														Button,
														{
															isDestructive: true,
															isSmall: true,
															onClick: onRemoveFile,
															style: { marginLeft: '8px' }
														},
														__('Remover', 'custom-adm')
													)
												)
											)
											: el(
												Button,
												{
													isPrimary: true,
													className: 'button button-large',
													onClick: obj.open
												},
												el(Dashicon, { icon: 'upload' }),
												' ' + __('Selecionar / Enviar Arquivo', 'custom-adm')
											)
									);
								}
							})
						),
						el(TextControl, {
							label: __('URL Direta do Arquivo', 'custom-adm'),
							value: fileUrl,
							help: __('URL preenchida automaticamente pelo upload ou informada manualmente.', 'custom-adm'),
							onChange: function (val) { setAttributes({ fileUrl: val }); }
						}),
						el(TextControl, {
							label: __('Nome de Exibição do Arquivo', 'custom-adm'),
							value: fileName,
							onChange: function (val) { setAttributes({ fileName: val }); }
						}),
						el(TextControl, {
							label: __('Tamanho Formatado (ex: 2.5 MB)', 'custom-adm'),
							value: fileSize,
							onChange: function (val) { setAttributes({ fileSize: val }); }
						}),
						el(TextControl, {
							label: __('Texto do Botão de Download', 'custom-adm'),
							value: buttonText,
							placeholder: __('Download', 'custom-adm'),
							onChange: function (val) { setAttributes({ buttonText: val }); }
						})
					),

					// 2. Painel de Data e Metadados
					el(
						PanelBody,
						{
							title: __('Data e Metadados', 'custom-adm'),
							initialOpen: true
						},
						el(TextControl, {
							label: __('Data de Publicação', 'custom-adm'),
							value: date,
							placeholder: __('Ex: 12/09/2026', 'custom-adm'),
							onChange: function (val) { setAttributes({ date: val }); }
						}),
						el(TextControl, {
							label: __('Categoria / Órgão Emissor (Caption)', 'custom-adm'),
							value: caption,
							placeholder: __('Ex: Secretaria de Finanças', 'custom-adm'),
							onChange: function (val) { setAttributes({ caption: val }); }
						}),
						el(TextControl, {
							label: __('Etiqueta em Destaque (Badge)', 'custom-adm'),
							value: badgeText,
							placeholder: __('Ex: Novo, Retificado, Edital', 'custom-adm'),
							onChange: function (val) { setAttributes({ badgeText: val }); }
						})
					),

					// 3. Painel de Link e Redirecionamento
					el(
						PanelBody,
						{
							title: __('Link de Redirecionamento', 'custom-adm'),
							initialOpen: false
						},
						el(TextControl, {
							label: __('URL da Página ou Detalhes', 'custom-adm'),
							value: url,
							placeholder: 'https://...',
							help: __('Link alternativo ou página interna de detalhes da publicação.', 'custom-adm'),
							onChange: function (val) { setAttributes({ url: val }); }
						}),
						el(ToggleControl, {
							label: __('Abrir links em nova aba (_blank)', 'custom-adm'),
							checked: openInNewTab,
							onChange: function (val) { setAttributes({ openInNewTab: val }); }
						})
					),

					// 4. Painel de Layout e Estilo
					el(
						PanelBody,
						{
							title: __('Estilo de Exibição', 'custom-adm'),
							initialOpen: false
						},
						el(SelectControl, {
							label: __('Modelo de Apresentação', 'custom-adm'),
							value: displayMode,
							options: [
								{ label: __('Cartão Moderno (Card)', 'custom-adm'), value: 'card' },
								{ label: __('Linha de Tabela / Lista (Row)', 'custom-adm'), value: 'table-row' }
							],
							onChange: function (val) { setAttributes({ displayMode: val }); }
						})
					)
				),

				// Interface Visual no Canvas do Editor
				el(
					'div',
					{ className: 'dtlf-card-container dtlf-mode-' + displayMode },

					// Cabeçalho / Barra superior do Card
					el(
						'div',
						{ className: 'dtlf-header-meta' },
						el(
							'div',
							{ className: 'dtlf-date-pill' },
							el(Dashicon, { icon: 'calendar-alt' }),
							el(
								'input',
								{
									type: 'text',
									className: 'dtlf-inline-date-input',
									value: date,
									placeholder: __('Data (DD/MM/AAAA)', 'custom-adm'),
									onChange: function (e) { setAttributes({ date: e.target.value }); }
								}
							)
						),
						caption ? el('span', { className: 'dtlf-category-tag' }, caption) : null,
						badgeText ? el('span', { className: 'dtlf-badge-highlight' }, badgeText) : null
					),

					// Corpo Principal: Ícone + Título + Metadados
					el(
						'div',
						{ className: 'dtlf-body-row' },
						renderFileIcon(ext),
						el(
							'div',
							{ className: 'dtlf-content-col' },
							el(RichText, {
								tagName: 'h4',
								className: 'dtlf-title-input',
								value: title,
								placeholder: __('Digite aqui o título descritivo do documento ou edital...', 'custom-adm'),
								onChange: function (val) { setAttributes({ title: val }); },
								allowedFormats: ['core/bold', 'core/italic', 'core/link']
							}),
							el(
								'div',
								{ className: 'dtlf-meta-details' },
								fileName
									? el(
										'span',
										{ className: 'dtlf-filename-preview' },
										el(Dashicon, { icon: 'paperclip' }),
										' ' + fileName
									)
									: el(
										'span',
										{ className: 'dtlf-nofile-warning' },
										__('(Nenhum arquivo vinculado)', 'custom-adm')
									),
								fileSize
									? el('span', { className: 'dtlf-size-preview' }, '• ' + fileSize)
									: null
							)
						)
					),

					// Barra de Ações e Botões do Editor
					el(
						'div',
						{ className: 'dtlf-actions-footer' },
						el(
							MediaUploadCheck,
							{},
							el(MediaUpload, {
								onSelect: onSelectFile,
								value: fileId,
								render: function (obj) {
									return el(
										Button,
										{
											isPrimary: !fileUrl,
											isSecondary: !!fileUrl,
											className: 'dtlf-btn-upload',
											onClick: obj.open
										},
										el(Dashicon, { icon: fileUrl ? 'edit' : 'upload' }),
										' ' + (fileUrl ? __('Alterar Arquivo', 'custom-adm') : __('Vincular Arquivo', 'custom-adm'))
									);
								}
							})
						),
						fileUrl
							? el(
								'span',
								{ className: 'dtlf-btn-download-preview' },
								el(Dashicon, { icon: 'download' }),
								' ' + buttonText
							)
							: null,
						url
							? el(
								'a',
								{
									href: '#',
									className: 'dtlf-btn-link-preview',
									onClick: function (e) { e.preventDefault(); }
								},
								el(Dashicon, { icon: 'admin-links' }),
								' ' + __('Acessar Página', 'custom-adm')
							)
							: null
					)
				)
			);
		},

		/**
		 * Renderização estática salva no banco de dados e exibida no Front-End
		 */
		save: function (props) {
			var attributes = props.attributes;
			var date = attributes.date || '';
			var title = attributes.title || '';
			var url = attributes.url || '';
			var fileUrl = attributes.fileUrl || '';
			var fileName = attributes.fileName || '';
			var fileSize = attributes.fileSize || '';
			var caption = attributes.caption || '';
			var badgeText = attributes.badgeText || '';
			var buttonText = attributes.buttonText || __('Download', 'custom-adm');
			var openInNewTab = attributes.openInNewTab !== false;
			var displayMode = attributes.displayMode || 'card';

			var ext = fileName ? getFileExtension(fileName) : (fileUrl ? getFileExtension(fileUrl) : 'PDF');
			var targetAttr = openInNewTab ? '_blank' : '_self';
			var relAttr = openInNewTab ? 'noopener noreferrer' : undefined;

			// Classes que combinam a nomenclatura moderna com a compatibilidade retroativa
			var wrapperClass = 'customadm-date-title-link-file-box table-link-file-upload-box dtlf-block-item dtlf-view-' + displayMode;

			return el(
				'article',
				{
					className: wrapperClass,
					'data-file-type': ext.toLowerCase(),
					'data-has-file': fileUrl ? 'true' : 'false'
				},
				el(
					'div',
					{ className: 'dtlf-card-inner' },

					// Cabeçalho da publicação (Data, Categoria e Badge)
					el(
						'header',
						{ className: 'dtlf-header' },
						date
							? el(
								'time',
								{ className: 'dtlf-date', dateTime: date },
								el(
									'svg',
									{
										className: 'dtlf-svg-calendar',
										viewBox: '0 0 24 24',
										width: '16',
										height: '16',
										fill: 'none',
										stroke: 'currentColor',
										strokeWidth: '2',
										strokeLinecap: 'round',
										strokeLinejoin: 'round'
									},
									el('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
									el('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
									el('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
									el('line', { x1: '3', y1: '10', x2: '21', y2: '10' })
								),
								el('span', { className: 'dtlf-date-text' }, date)
							)
							: null,
						caption
							? el('span', { className: 'dtlf-caption-tag' }, caption)
							: null,
						badgeText
							? el('span', { className: 'dtlf-badge' }, badgeText)
							: null
					),

					// Conteúdo do Documento: Ícone e Título
					el(
						'div',
						{ className: 'dtlf-content' },
						renderFileIcon(ext),
						el(
							'div',
							{ className: 'dtlf-text-group' },
							title
								? el(
									'h4',
									{ className: 'dtlf-title' },
									url
										? el(
											'a',
											{
												href: url,
												target: targetAttr,
												rel: relAttr,
												className: 'dtlf-title-link'
											},
											el(RichText.Content, { value: title })
										)
										: el(RichText.Content, { value: title })
								)
								: null,
							(fileName || fileSize)
								? el(
									'div',
									{ className: 'dtlf-file-meta' },
									fileName ? el('span', { className: 'dtlf-meta-filename' }, fileName) : null,
									fileSize ? el('span', { className: 'dtlf-meta-filesize' }, '(' + fileSize + ')') : null
								)
								: null
						)
					),

					// Rodapé de Ações: Botão de Download e Link Externo
					el(
						'footer',
						{ className: 'dtlf-footer-actions' },
						fileUrl
							? el(
								'a',
								{
									href: fileUrl,
									className: 'dtlf-btn dtlf-btn-download',
									target: targetAttr,
									rel: relAttr,
									download: fileName || true
								},
								el(
									'svg',
									{
										className: 'dtlf-svg-download',
										viewBox: '0 0 24 24',
										width: '18',
										height: '18',
										fill: 'none',
										stroke: 'currentColor',
										strokeWidth: '2',
										strokeLinecap: 'round',
										strokeLinejoin: 'round'
									},
									el('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
									el('polyline', { points: '7 10 12 15 17 10' }),
									el('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
								),
								el('span', { className: 'dtlf-btn-text' }, buttonText)
							)
							: null,
						url
							? el(
								'a',
								{
									href: url,
									className: 'dtlf-btn dtlf-btn-link',
									target: targetAttr,
									rel: relAttr
								},
								el(
									'svg',
									{
										className: 'dtlf-svg-external',
										viewBox: '0 0 24 24',
										width: '16',
										height: '16',
										fill: 'none',
										stroke: 'currentColor',
										strokeWidth: '2',
										strokeLinecap: 'round',
										strokeLinejoin: 'round'
									},
									el('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
									el('polyline', { points: '15 3 21 3 21 9' }),
									el('line', { x1: '10', y1: '14', x2: '21', y2: '3' })
								),
								el('span', { className: 'dtlf-btn-text' }, __('Acessar', 'custom-adm'))
							)
							: null
					)
				)
			);
		}
	};

	// 1. Registro do bloco canônico moderno
	registerBlockType('periodic/date-title-link-file-upload', blockConfig);

	// 2. Registro do bloco com o slug legado customADM para 100% de compatibilidade retroativa
	registerBlockType('cms-adm/date-title-link-file-upload', blockConfig);

})(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor || window.wp.editor,
	window.wp.components,
	window.wp.i18n
);
