/**
 * Date Title Link - Custom Gutenberg Block (Vanilla ES5)
 *
 * Bloco customizado para WordPress Gutenberg que exibe itens cronológicos de editais,
 * publicações oficiais, notícias ou documentos associando Data, Título descritivo e URL.
 *
 * Padrão arquitetural: customADM / periodic (Prefeitura de São Paulo)
 *
 * @package Periodic_Date_Title_Link
 * @version 1.0.0
 */

(function (blocks, element, blockEditor, components, i18n) {
	'use strict';

	if (!blocks || !element || !blocks.registerBlockType) {
		return;
	}

	var el = element.createElement;
	var registerBlockType = blocks.registerBlockType;

	// Função de tradução segura com fallback para dicionário local injetado
	var __ = function (text, domain) {
		if (i18n && typeof i18n.__ === 'function') {
			var translated = i18n.__(text, domain || 'custom-adm');
			if (translated && translated !== text) {
				return translated;
			}
		}
		if (window.customAdmDateTitleLinkI18n && window.customAdmDateTitleLinkI18n[text]) {
			return window.customAdmDateTitleLinkI18n[text];
		}
		return text;
	};

	// Referências a submódulos do Gutenberg
	var editor = blockEditor || window.wp.editor || {};
	var RichText = editor.RichText;
	var InspectorControls = editor.InspectorControls;

	var comps = components || window.wp.components || {};
	var PanelBody = comps.PanelBody;
	var PanelRow = comps.PanelRow;
	var TextControl = comps.TextControl;
	var ToggleControl = comps.ToggleControl;
	var ExternalLink = comps.ExternalLink;

	// Ícone SVG customizado com estética institucional (calendário + documento com link)
	var blockIcon = el('svg', {
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		xmlns: 'http://www.w3.org/2000/svg',
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: '1.75',
		strokeLinecap: 'round',
		strokeLinejoin: 'round'
	},
		// Caixa do calendário
		el('rect', { x: 3, y: 4, width: 18, height: 17, rx: 3, stroke: '#01913a', fill: '#e6f4ea' }),
		// Linha do cabeçalho do calendário
		el('line', { x1: 3, y1: 9, x2: 21, y2: 9, stroke: '#01913a' }),
		// Pinos superiores do calendário
		el('line', { x1: 8, y1: 2, x2: 8, y2: 5, stroke: '#006828' }),
		el('line', { x1: 16, y1: 2, x2: 16, y2: 5, stroke: '#006828' }),
		// Ponto/data
		el('circle', { cx: 8, cy: 14, r: 1.5, fill: '#01913a', stroke: 'none' }),
		// Linhas de texto/título
		el('line', { x1: 12, y1: 13, x2: 17, y2: 13, stroke: '#233e95' }),
		el('line', { x1: 12, y1: 16, x2: 18, y2: 16, stroke: '#233e95' })
	);

	// Configuração oficial do bloco
	var blockConfig = {
		title: __('Data, Título e Link', 'custom-adm'),
		description: __('Exibe publicações oficiais, editais ou notícias com data, título descritivo e URL de redirecionamento.', 'custom-adm'),
		icon: blockIcon,
		category: 'widgets',
		keywords: [
			__('data', 'custom-adm'),
			__('título', 'custom-adm'),
			__('link', 'custom-adm'),
			__('edital', 'custom-adm'),
			__('notícia', 'custom-adm')
		],
		supports: {
			align: ['wide', 'full'],
			html: false,
			multiple: true,
			reusable: true,
			customClassName: true
		},

		attributes: {
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
			targetBlank: {
				type: 'boolean',
				default: false
			}
		},

		// Exemplo realista para preview no Inserter do Gutenberg
		example: {
			attributes: {
				date: '11/09/2026',
				title: __('Edital de Concurso Público Nº 04/2026 - Convocação para Provas Objetivas', 'custom-adm'),
				url: 'https://exemplo.gov.br/concursos/edital-04-2026',
				targetBlank: true
			}
		},

		/**
		 * Modo de Edição no Canvas do Gutenberg
		 */
		edit: function (props) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var isSelected = props.isSelected;

			var date = attributes.date;
			var title = attributes.title;
			var url = attributes.url;
			var targetBlank = attributes.targetBlank;

			// Handlers de atualização
			function onChangeDate(newDate) {
				setAttributes({ date: newDate });
			}

			function onChangeTitle(newTitle) {
				setAttributes({ title: newTitle });
			}

			function onChangeUrl(newUrl) {
				setAttributes({ url: newUrl });
			}

			function onToggleTargetBlank(newVal) {
				setAttributes({ targetBlank: newVal });
			}

			// InspectorControls na barra lateral direita
			var inspector = el(
				InspectorControls,
				{ key: 'inspector' },
				el(
					PanelBody,
					{
						title: __('Configurações do Link e Publicação', 'custom-adm'),
						initialOpen: true
					},
					el(TextControl, {
						label: __('URL de Redirecionamento', 'custom-adm'),
						value: url,
						placeholder: 'https://exemplo.gov.br/documento.pdf',
						help: __('Endereço para onde o usuário será direcionado ao clicar no item.', 'custom-adm'),
						onChange: onChangeUrl
					}),
					el(ToggleControl, {
						label: __('Abrir link em nova aba (_blank)', 'custom-adm'),
						checked: !!targetBlank,
						help: targetBlank
							? __('O link será aberto em uma nova guia do navegador.', 'custom-adm')
							: __('O link será aberto na mesma página.', 'custom-adm'),
						onChange: onToggleTargetBlank
					}),
					el(TextControl, {
						label: __('Data da Publicação / Evento', 'custom-adm'),
						value: date,
						placeholder: __('Ex: 11/09/2026 ou 11 de Setembro', 'custom-adm'),
						help: __('Você também pode editar a data diretamente no bloco.', 'custom-adm'),
						onChange: onChangeDate
					})
				)
			);

			// Renderização interativa no Canvas
			var editorContent = el(
				'div',
				{
					key: 'editor-card',
					className: 'custom-adm-date-title-link custom-adm-date-title-link--editor' + (isSelected ? ' is-selected' : '')
				},
				el(
					'div',
					{ className: 'custom-adm-date-title-link__item' },
					// Cabeçalho / Badge de Data
					el(
						'div',
						{ className: 'custom-adm-date-title-link__date-wrap' },
						el(
							'span',
							{ className: 'custom-adm-date-title-link__calendar-icon', 'aria-hidden': 'true' },
							el('svg', {
								width: 14,
								height: 14,
								viewBox: '0 0 24 24',
								fill: 'none',
								stroke: 'currentColor',
								strokeWidth: '2',
								strokeLinecap: 'round',
								strokeLinejoin: 'round'
							},
								el('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2, ry: 2 }),
								el('line', { x1: 16, y1: 2, x2: 16, y2: 6 }),
								el('line', { x1: 8, y1: 2, x2: 8, y2: 6 }),
								el('line', { x1: 3, y1: 10, x2: 21, y2: 10 })
							)
						),
						el(RichText, {
							tagName: 'span',
							className: 'custom-adm-date-title-link__date-input',
							value: date,
							onChange: onChangeDate,
							placeholder: __('Data (ex: 11/09/2026)', 'custom-adm'),
							allowedFormats: [],
							keepPlaceholderOnFocus: true
						})
					),
					// Título Descritivo Inline com RichText
					el(
						'div',
						{ className: 'custom-adm-date-title-link__title-wrap' },
						el(RichText, {
							tagName: 'div',
							className: 'custom-adm-date-title-link__title-input',
							value: title,
							onChange: onChangeTitle,
							placeholder: __('Digite o título descritivo do edital, notícia ou publicação oficial...', 'custom-adm'),
							keepPlaceholderOnFocus: true
						})
					),
					// Indicador visual de Link / Destino
					el(
						'div',
						{ className: 'custom-adm-date-title-link__status-bar' },
						url
							? el(
								'span',
								{ className: 'custom-adm-date-title-link__badge custom-adm-date-title-link__badge--has-url' },
								el('svg', {
									width: 12,
									height: 12,
									viewBox: '0 0 24 24',
									fill: 'none',
									stroke: 'currentColor',
									strokeWidth: '2',
									strokeLinecap: 'round',
									strokeLinejoin: 'round'
								},
									el('path', { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }),
									el('path', { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' })
								),
								el('span', { className: 'custom-adm-date-title-link__url-text' }, url),
								targetBlank ? el('span', { className: 'custom-adm-date-title-link__target-tag' }, '_blank') : null
							)
							: el(
								'span',
								{ className: 'custom-adm-date-title-link__badge custom-adm-date-title-link__badge--no-url' },
								el('svg', {
									width: 12,
									height: 12,
									viewBox: '0 0 24 24',
									fill: 'none',
									stroke: 'currentColor',
									strokeWidth: '2',
									strokeLinecap: 'round',
									strokeLinejoin: 'round'
								},
									el('circle', { cx: 12, cy: 12, r: 10 }),
									el('line', { x1: 12, y1: 8, x2: 12, y2: 12 }),
									el('line', { x1: 12, y1: 16, x2: 12.01, y2: 16 })
								),
								__('URL não informada (clique para definir na barra lateral)', 'custom-adm')
							)
					)
				)
			);

			return [inspector, editorContent];
		},

		/**
		 * Modo de Salvamento / HTML Semântico Frontend
		 */
		save: function (props) {
			var attributes = props.attributes || {};
			var date = attributes.date || '';
			var title = attributes.title || '';
			var url = attributes.url || '#';
			var targetBlank = !!attributes.targetBlank;

			var anchorProps = {
				href: url || '#',
				className: 'custom-adm-date-title-link__anchor'
			};

			if (targetBlank) {
				anchorProps.target = '_blank';
				anchorProps.rel = 'noopener noreferrer';
			}

			// Ícone de seta / link externo
			var actionIcon = el(
				'span',
				{ className: 'custom-adm-date-title-link__action', 'aria-hidden': 'true' },
				el('svg', {
					width: 18,
					height: 18,
					viewBox: '0 0 24 24',
					fill: 'none',
					stroke: 'currentColor',
					strokeWidth: '2',
					strokeLinecap: 'round',
					strokeLinejoin: 'round'
				},
					targetBlank
						? [
							el('path', { key: 'p1', d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
							el('polyline', { key: 'p2', points: '15 3 21 3 21 9' }),
							el('line', { key: 'p3', x1: '10', y1: '14', x2: '21', y2: '3' })
						]
						: [
							el('line', { key: 'p1', x1: '5', y1: '12', x2: '19', y2: '12' }),
							el('polyline', { key: 'p2', points: '12 5 19 12 12 19' })
						]
				)
			);

			return el(
				'div',
				{ className: 'custom-adm-date-title-link' },
				el(
					'a',
					anchorProps,
					el(
						'div',
						{ className: 'custom-adm-date-title-link__content' },
						date
							? el('time', { className: 'custom-adm-date-title-link__date' }, date)
							: null,
						el('span', { className: 'custom-adm-date-title-link__title' }, title)
					),
					actionIcon
				)
			);
		}
	};

	// 1. Registro oficial do bloco sob o namespace 'custom-adm/date-title-link'
	registerBlockType('custom-adm/date-title-link', blockConfig);

	// 2. Registro sob o namespace 'periodic/date-title-link' para compatibilidade total
	if (blocks.registerBlockType && typeof blocks.getBlockType === 'function' && !blocks.getBlockType('periodic/date-title-link')) {
		registerBlockType('periodic/date-title-link', blockConfig);
	}

})(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor || window.wp.editor,
	window.wp.components,
	window.wp.i18n
);
