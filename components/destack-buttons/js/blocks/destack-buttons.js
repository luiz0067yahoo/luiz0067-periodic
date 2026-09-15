/**
 * Bloco Gutenberg: Destack Buttons (Botões de Destaque / Acesso Rápido)
 * 
 * Implementação em JavaScript Vanilla / ES5 (Sem JSX, sem Babel, sem build step).
 * Padrão: periodic / periodic
 * Text Domain: destack-buttons
 */
(function (blocks, element, blockEditor, components, i18n) {
    'use strict';

    var el = element.createElement;
    var Fragment = element.Fragment;
    var registerBlockType = blocks.registerBlockType;
    var __ = i18n.__;

    // Componentes Gutenberg com fallbacks para compatibilidade entre versões do WordPress
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var MediaUpload = blockEditor.MediaUpload;
    var PanelBody = components.PanelBody;
    var PanelRow = components.PanelRow;
    var RangeControl = components.RangeControl;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var Button = components.Button;
    var Tooltip = components.Tooltip;

    // Ícones em SVG nativo para ações e botões
    var icons = {
        grid: el('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor' },
            el('path', { d: 'M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z' })
        ),
        plus: el('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' },
            el('path', { d: 'M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z' })
        ),
        trash: el('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'currentColor' },
            el('path', { d: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' })
        ),
        image: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' },
            el('path', { d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z' })
        ),
        externalLink: el('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'currentColor' },
            el('path', { d: 'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' })
        )
    };

    // Dados de exemplo realistas para o preview do Inserter do Gutenberg
    var previewButtons = [
        {
            title: 'IPTU Online',
            url: '#iptu',
            iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230284c7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
            targetBlank: false
        },
        {
            title: 'Portal da Transparência',
            url: '#transparencia',
            iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230284c7"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
            targetBlank: false
        },
        {
            title: 'Ouvidoria Municipal',
            url: '#ouvidoria',
            iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230284c7"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>',
            targetBlank: false
        },
        {
            title: 'Telefones Úteis',
            url: '#telefones',
            iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230284c7"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
            targetBlank: false
        }
    ];

    /**
     * Registro do Bloco: periodic/destack-buttons
     */
    registerBlockType('periodic/destack-buttons', {
        title: __('Destack Buttons (Botões de Destaque)', 'destack-buttons'),
        description: __('Exiba uma grade de botões e atalhos rápidos com ícones, títulos e links customizados.', 'destack-buttons'),
        icon: 'grid-view',
        category: 'design',
        keywords: [
            __('destaque', 'destack-buttons'),
            __('botões', 'destack-buttons'),
            __('acesso rápido', 'destack-buttons'),
            __('serviços', 'destack-buttons')
        ],
        supports: {
            multiple: true,
            align: ['wide', 'full'],
            customClassName: true
        },
        example: {
            attributes: {
                columns: 4,
                buttons: previewButtons
            }
        },
        attributes: {
            columns: {
                type: 'number',
                default: 4
            },
            buttons: {
                type: 'array',
                default: [
                    { title: __('Serviço 1', 'destack-buttons'), url: '', iconUrl: '', iconId: 0, targetBlank: false },
                    { title: __('Serviço 2', 'destack-buttons'), url: '', iconUrl: '', iconId: 0, targetBlank: false },
                    { title: __('Serviço 3', 'destack-buttons'), url: '', iconUrl: '', iconId: 0, targetBlank: false },
                    { title: __('Serviço 4', 'destack-buttons'), url: '', iconUrl: '', iconId: 0, targetBlank: false }
                ]
            },
            // Atributos para retrocompatibilidade com o formato legado do plugin periodic
            title: { type: 'array' },
            url: { type: 'array' },
            logo: { type: 'array' }
        },

        /**
         * Função edit: interface de edição no Gutenberg
         */
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var columns = attributes.columns || 4;
            var buttons = attributes.buttons;

            // Normalização e suporte à migração do formato legado
            if (!buttons || buttons.length === 0) {
                if (attributes.title && attributes.title.length > 0) {
                    var migrated = [];
                    for (var i = 0; i < attributes.title.length; i++) {
                        migrated.push({
                            title: attributes.title[i] || '',
                            url: (attributes.url && attributes.url[i]) ? attributes.url[i] : '',
                            iconUrl: (attributes.logo && attributes.logo[i]) ? attributes.logo[i] : '',
                            iconId: 0,
                            targetBlank: false
                        });
                    }
                    buttons = migrated;
                    setAttributes({ buttons: buttons });
                } else {
                    buttons = [
                        { title: __('Serviço 1', 'destack-buttons'), url: '', iconUrl: '', iconId: 0, targetBlank: false },
                        { title: __('Serviço 2', 'destack-buttons'), url: '', iconUrl: '', iconId: 0, targetBlank: false },
                        { title: __('Serviço 3', 'destack-buttons'), url: '', iconUrl: '', iconId: 0, targetBlank: false },
                        { title: __('Serviço 4', 'destack-buttons'), url: '', iconUrl: '', iconId: 0, targetBlank: false }
                    ];
                    setAttributes({ buttons: buttons });
                }
            }

            // Atualiza propriedade de um botão específico
            function updateButton(index, field, value) {
                var updated = buttons.map(function (btn, i) {
                    if (i !== index) return btn;
                    var copy = Object.assign({}, btn);
                    copy[field] = value;
                    return copy;
                });
                setAttributes({ buttons: updated });
            }

            // Adiciona novo botão à lista
            function addButton() {
                var nextIndex = buttons.length + 1;
                var updated = buttons.concat([{
                    title: __('Novo Botão ', 'destack-buttons') + nextIndex,
                    url: '',
                    iconUrl: '',
                    iconId: 0,
                    targetBlank: false
                }]);
                setAttributes({ buttons: updated });
            }

            // Remove um botão da lista
            function removeButton(index) {
                var updated = buttons.filter(function (_, i) {
                    return i !== index;
                });
                setAttributes({ buttons: updated });
            }

            // Move um botão (ordenação)
            function moveButton(index, direction) {
                var newIndex = index + direction;
                if (newIndex < 0 || newIndex >= buttons.length) return;
                var updated = buttons.slice();
                var temp = updated[index];
                updated[index] = updated[newIndex];
                updated[newIndex] = temp;
                setAttributes({ buttons: updated });
            }

            // Handler para seleção de imagem via MediaUpload
            function onSelectIcon(index, media) {
                var iconUrl = media.sizes && media.sizes.thumbnail ? media.sizes.thumbnail.url : media.url;
                var updated = buttons.map(function (btn, i) {
                    if (i !== index) return btn;
                    var copy = Object.assign({}, btn);
                    copy.iconUrl = iconUrl;
                    copy.iconId = media.id;
                    return copy;
                });
                setAttributes({ buttons: updated });
            }

            // Handler para remoção de ícone
            function onRemoveIcon(index) {
                var updated = buttons.map(function (btn, i) {
                    if (i !== index) return btn;
                    var copy = Object.assign({}, btn);
                    copy.iconUrl = '';
                    copy.iconId = 0;
                    return copy;
                });
                setAttributes({ buttons: updated });
            }

            // 1. Painel de Controles Lateral (InspectorControls)
            var inspector = el(InspectorControls, {},
                el(PanelBody, {
                    title: __('Configurações do Grid', 'destack-buttons'),
                    initialOpen: true
                },
                    el(RangeControl, {
                        label: __('Quantidade de Colunas por Linha', 'destack-buttons'),
                        value: columns,
                        onChange: function (newVal) {
                            setAttributes({ columns: parseInt(newVal, 10) });
                        },
                        min: 1,
                        max: 6,
                        help: __('Ajuste a quantidade de botões exibidos por linha em telas grandes.', 'destack-buttons')
                    }),
                    el('div', { className: 'destack-inspector-actions' },
                        el(Button, {
                            isPrimary: true,
                            onClick: addButton,
                            icon: 'plus',
                            className: 'destack-add-btn-inspector'
                        }, __('Adicionar Botão', 'destack-buttons'))
                    )
                ),
                el(PanelBody, {
                    title: __('Gerenciador de Links e Atalhos', 'destack-buttons') + ' (' + buttons.length + ')',
                    initialOpen: false
                },
                    buttons.map(function (btn, idx) {
                        return el('div', { key: idx, className: 'destack-inspector-item-card' },
                            el('div', { className: 'destack-inspector-item-header' },
                                el('strong', {}, (idx + 1) + '. ' + (btn.title || __('Sem título', 'destack-buttons'))),
                                el('div', { className: 'destack-item-order-actions' },
                                    el(Button, {
                                        icon: 'arrow-up-alt2',
                                        isSmall: true,
                                        disabled: idx === 0,
                                        onClick: function () { moveButton(idx, -1); },
                                        label: __('Mover para cima', 'destack-buttons')
                                    }),
                                    el(Button, {
                                        icon: 'arrow-down-alt2',
                                        isSmall: true,
                                        disabled: idx === buttons.length - 1,
                                        onClick: function () { moveButton(idx, 1); },
                                        label: __('Mover para baixo', 'destack-buttons')
                                    }),
                                    el(Button, {
                                        icon: 'trash',
                                        isDestructive: true,
                                        isSmall: true,
                                        onClick: function () { removeButton(idx); },
                                        label: __('Excluir botão', 'destack-buttons')
                                    })
                                )
                            ),
                            el(TextControl, {
                                label: __('URL de Destino', 'destack-buttons'),
                                value: btn.url || '',
                                placeholder: 'https://exemplo.gov.br/...',
                                onChange: function (val) {
                                    updateButton(idx, 'url', val);
                                }
                            }),
                            el(ToggleControl, {
                                label: __('Abrir em nova aba', 'destack-buttons'),
                                checked: !!btn.targetBlank,
                                onChange: function (val) {
                                    updateButton(idx, 'targetBlank', val);
                                }
                            })
                        );
                    })
                )
            );

            // 2. Renderização no Canvas do Editor Gutenberg
            var blockContent = el('div', {
                className: 'destack-buttons-container cols-' + columns,
                style: {
                    '--destack-columns': columns
                }
            },
                // Barra de ferramentas superior do bloco
                el('div', { className: 'destack-buttons-toolbar' },
                    el('div', { className: 'destack-toolbar-info' },
                        el('span', { className: 'dashicons dashicons-grid-view' }),
                        el('strong', {}, __('Botões de Destaque', 'destack-buttons')),
                        el('span', { className: 'destack-badge' }, buttons.length + ' ' + (buttons.length === 1 ? __('item', 'destack-buttons') : __('itens', 'destack-buttons'))),
                        el('span', { className: 'destack-badge-cols' }, columns + ' ' + (columns === 1 ? __('coluna', 'destack-buttons') : __('colunas', 'destack-buttons')))
                    ),
                    el(Button, {
                        isPrimary: true,
                        isSmall: true,
                        onClick: addButton,
                        className: 'destack-toolbar-add-btn'
                    },
                        el('span', { className: 'dashicons dashicons-plus-alt2' }),
                        __('Adicionar Botão', 'destack-buttons')
                    )
                ),

                // Grade dos Botões de Destaque
                el('div', { className: 'destack-buttons-grid' },
                    buttons.map(function (btn, index) {
                        return el('div', {
                            key: index,
                            className: 'destack-button-item is-editor'
                        },
                            // Ações rápidas do card
                            el('div', { className: 'destack-card-actions' },
                                el(Tooltip, { text: __('Mover para a esquerda', 'destack-buttons') },
                                    el(Button, {
                                        icon: 'arrow-left-alt2',
                                        isSmall: true,
                                        disabled: index === 0,
                                        onClick: function () { moveButton(index, -1); }
                                    })
                                ),
                                el(Tooltip, { text: __('Mover para a direita', 'destack-buttons') },
                                    el(Button, {
                                        icon: 'arrow-right-alt2',
                                        isSmall: true,
                                        disabled: index === buttons.length - 1,
                                        onClick: function () { moveButton(index, 1); }
                                    })
                                ),
                                el(Tooltip, { text: __('Excluir este botão', 'destack-buttons') },
                                    el(Button, {
                                        icon: 'trash',
                                        isDestructive: true,
                                        isSmall: true,
                                        onClick: function () { removeButton(index); }
                                    })
                                )
                            ),

                            // Área do Ícone / Imagem com MediaUpload
                            el('div', { className: 'destack-button-icon-wrapper' },
                                el(MediaUpload, {
                                    onSelect: function (media) {
                                        onSelectIcon(index, media);
                                    },
                                    allowedTypes: ['image'],
                                    value: btn.iconId,
                                    render: function (obj) {
                                        return el('div', { className: 'destack-media-trigger' },
                                            btn.iconUrl ? el(Fragment, {},
                                                el('img', {
                                                    src: btn.iconUrl,
                                                    alt: btn.title || __('Ícone do botão', 'destack-buttons'),
                                                    className: 'destack-icon-preview'
                                                }),
                                                el('div', { className: 'destack-media-hover-overlay' },
                                                    el(Button, {
                                                        isSmall: true,
                                                        isSecondary: true,
                                                        onClick: obj.open,
                                                        title: __('Alterar ícone', 'destack-buttons')
                                                    }, __('Trocar', 'destack-buttons')),
                                                    el(Button, {
                                                        isSmall: true,
                                                        isDestructive: true,
                                                        onClick: function () { onRemoveIcon(index); },
                                                        title: __('Remover ícone', 'destack-buttons')
                                                    }, __('Remover', 'destack-buttons'))
                                                )
                                            ) : el(Button, {
                                                className: 'destack-upload-placeholder',
                                                onClick: obj.open,
                                                title: __('Escolha uma imagem ou ícone', 'destack-buttons')
                                            },
                                                el('span', { className: 'dashicons dashicons-format-image' }),
                                                el('span', { className: 'destack-upload-text' }, __('Inserir Ícone', 'destack-buttons'))
                                            )
                                        );
                                    }
                                })
                            ),

                            // Título editável via RichText diretamente no card
                            el('div', { className: 'destack-button-title-wrapper' },
                                el(RichText, {
                                    tagName: 'span',
                                    className: 'destack-button-title',
                                    value: btn.title,
                                    placeholder: __('Nome do Botão...', 'destack-buttons'),
                                    allowedFormats: ['core/bold', 'core/italic'],
                                    onChange: function (val) {
                                        updateButton(index, 'title', val);
                                    }
                                })
                            ),

                            // Campo de Link / URL inline para agilidade do editor
                            el('div', { className: 'destack-card-link-field' },
                                el('span', { className: 'dashicons dashicons-admin-links' }),
                                el('input', {
                                    type: 'text',
                                    className: 'destack-link-input',
                                    placeholder: __('https://link-de-destino...', 'destack-buttons'),
                                    value: btn.url || '',
                                    onChange: function (e) {
                                        updateButton(index, 'url', e.target.value);
                                    }
                                }),
                                el('button', {
                                    type: 'button',
                                    className: 'destack-target-toggle' + (btn.targetBlank ? ' is-active' : ''),
                                    title: btn.targetBlank ? __('Abre em nova aba (ativo)', 'destack-buttons') : __('Abrir em mesma aba', 'destack-buttons'),
                                    onClick: function () {
                                        updateButton(index, 'targetBlank', !btn.targetBlank);
                                    }
                                },
                                    icons.externalLink
                                )
                            )
                        );
                    })
                )
            );

            return el(Fragment, {}, inspector, blockContent);
        },

        /**
         * Função save: saída HTML pura gravada no banco de dados e renderizada no front-end
         */
        save: function (props) {
            var attributes = props.attributes;
            var columns = attributes.columns || 4;
            var buttons = attributes.buttons;

            // Suporte para salvar formato normalizado
            if (!buttons || buttons.length === 0) {
                return null;
            }

            return el('div', {
                className: 'destack-buttons-container cols-' + columns,
                style: {
                    '--destack-columns': columns
                }
            },
                el('div', { className: 'destack-buttons-grid' },
                    buttons.map(function (btn, index) {
                        var hasUrl = btn.url && btn.url.trim() !== '';
                        var target = btn.targetBlank ? '_blank' : undefined;
                        var rel = btn.targetBlank ? 'noopener noreferrer' : undefined;

                        return el(hasUrl ? 'a' : 'div', {
                            key: index,
                            href: hasUrl ? btn.url : undefined,
                            className: 'destack-button-item',
                            target: target,
                            rel: rel,
                            'aria-label': btn.title ? btn.title.replace(/<[^>]*>?/gm, '') : undefined
                        },
                            btn.iconUrl ? el('div', { className: 'destack-button-icon' },
                                el('img', {
                                    src: btn.iconUrl,
                                    alt: btn.title ? btn.title.replace(/<[^>]*>?/gm, '') : __('Ícone do botão', 'destack-buttons'),
                                    loading: 'lazy'
                                })
                            ) : null,
                            el('span', { className: 'destack-button-title' },
                                el(RichText.Content, { value: btn.title })
                            )
                        );
                    })
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
