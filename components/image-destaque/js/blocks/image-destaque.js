/**
 * Bloco Gutenberg: Imagem de Destaque / Banner Promocional
 * Identificador: periodic/image-destaque
 * Padrão: Vanilla JavaScript / ES5 (Sem compilação JSX/Babel)
 * Autor: Luiz Alberto (periodic)
 */
(function (blocks, element, blockEditor, components, i18n) {
    'use strict';

    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var __ = i18n.__;

    // Componentes do BlockEditor e Components
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var MediaUpload = blockEditor.MediaUpload;
    var MediaUploadCheck = blockEditor.MediaUploadCheck || function (props) { return props.children; };

    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var SelectControl = components.SelectControl;
    var Button = components.Button;
    var Dashicon = components.Dashicon;

    registerBlockType('periodic/image-destaque', {
        title: __('Imagem de Destaque', 'periodic-image-destaque'),
        description: __('Exibe uma imagem principal ou banner promocional em destaque com suporte a link, legenda e acessibilidade.', 'periodic-image-destaque'),
        icon: 'format-image',
        category: 'media',
        keywords: [
            __('imagem', 'periodic-image-destaque'),
            __('banner', 'periodic-image-destaque'),
            __('destaque', 'periodic-image-destaque')
        ],
        supports: {
            align: ['left', 'center', 'right', 'full', 'wide'],
            html: false,
            customClassName: true
        },
        attributes: {
            imageUrl: {
                type: 'string',
                default: ''
            },
            imageId: {
                type: 'number',
                default: 0
            },
            altText: {
                type: 'string',
                default: ''
            },
            caption: {
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
            },
            alignment: {
                type: 'string',
                default: 'center'
            }
        },

        // Exemplo visual mockado para o Inserter / Block Preview do Gutenberg
        example: {
            attributes: {
                imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
                altText: __('Portal Institucional e Serviços Municipais', 'periodic-image-destaque'),
                caption: __('Campanha Oficial de Desenvolvimento e Infraestrutura 2026', 'periodic-image-destaque'),
                url: 'https://example.com',
                targetBlank: true,
                alignment: 'center'
            }
        },

        // Interface no editor Gutenberg
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var isSelected = props.isSelected;

            var imageUrl = attributes.imageUrl || '';
            var imageId = attributes.imageId || 0;
            var altText = attributes.altText || '';
            var caption = attributes.caption || '';
            var url = attributes.url || '';
            var targetBlank = !!attributes.targetBlank;
            var alignment = attributes.alignment || 'center';

            // Callback de seleção de mídia no modal nativo do WordPress
            function onSelectImage(media) {
                if (!media || !media.url) {
                    return;
                }
                setAttributes({
                    imageUrl: media.url,
                    imageId: media.id || 0,
                    altText: media.alt || altText || media.title || ''
                });
            }

            // Callback para remover imagem
            function onRemoveImage() {
                setAttributes({
                    imageUrl: '',
                    imageId: 0,
                    altText: ''
                });
            }

            // Inspetor Lateral (Sidebar Settings)
            var inspectorControls = el(
                InspectorControls,
                { key: 'inspector' },
                // Painel de Link de Redirecionamento
                el(
                    PanelBody,
                    {
                        title: __('Configurações de Link', 'periodic-image-destaque'),
                        initialOpen: true
                    },
                    el(TextControl, {
                        label: __('URL de Destino', 'periodic-image-destaque'),
                        value: url,
                        placeholder: 'https://seusite.gov.br/noticia',
                        help: __('Insira a URL que será aberta quando o usuário clicar na imagem.', 'periodic-image-destaque'),
                        onChange: function (newUrl) {
                            setAttributes({ url: newUrl });
                        }
                    }),
                    el(ToggleControl, {
                        label: __('Abrir em Nova Aba', 'periodic-image-destaque'),
                        checked: targetBlank,
                        help: targetBlank
                            ? __('O link será aberto em uma nova aba do navegador.', 'periodic-image-destaque')
                            : __('O link será aberto na mesma aba.', 'periodic-image-destaque'),
                        onChange: function (newTarget) {
                            setAttributes({ targetBlank: newTarget });
                        }
                    })
                ),

                // Painel de Acessibilidade e SEO
                el(
                    PanelBody,
                    {
                        title: __('Acessibilidade e SEO', 'periodic-image-destaque'),
                        initialOpen: false
                    },
                    el(TextControl, {
                        label: __('Texto Alternativo (Alt Text)', 'periodic-image-destaque'),
                        value: altText,
                        placeholder: __('Descreva a imagem para leitores de tela', 'periodic-image-destaque'),
                        help: __('Essencial para acessibilidade digital e otimização para motores de busca.', 'periodic-image-destaque'),
                        onChange: function (newAlt) {
                            setAttributes({ altText: newAlt });
                        }
                    })
                ),

                // Painel de Alinhamento
                el(
                    PanelBody,
                    {
                        title: __('Alinhamento e Exibição', 'periodic-image-destaque'),
                        initialOpen: false
                    },
                    el(SelectControl, {
                        label: __('Alinhamento do Bloco', 'periodic-image-destaque'),
                        value: alignment,
                        options: [
                            { label: __('Alinhar ao Centro', 'periodic-image-destaque'), value: 'center' },
                            { label: __('Alinhar à Esquerda', 'periodic-image-destaque'), value: 'left' },
                            { label: __('Alinhar à Direita', 'periodic-image-destaque'), value: 'right' },
                            { label: __('Largura Total', 'periodic-image-destaque'), value: 'full' }
                        ],
                        onChange: function (newAlign) {
                            setAttributes({ alignment: newAlign });
                        }
                    })
                )
            );

            // Conteúdo principal no Canvas do Editor
            var editorContent;

            if (!imageUrl) {
                // Estado sem imagem: Placeholder com botão de seleção
                editorContent = el(
                    'div',
                    { className: 'periodic-image-destaque-placeholder' },
                    el('div', { className: 'placeholder-icon-wrap' },
                        el(Dashicon, { icon: 'format-image', size: 48 })
                    ),
                    el('h3', { className: 'placeholder-title' },
                        __('Imagem de Destaque / Banner', 'periodic-image-destaque')
                    ),
                    el('p', { className: 'placeholder-description' },
                        __('Carregue ou selecione uma imagem de alta resolução na biblioteca de mídia.', 'periodic-image-destaque')
                    ),
                    el(
                        MediaUploadCheck,
                        null,
                        el(MediaUpload, {
                            onSelect: onSelectImage,
                            allowedTypes: ['image'],
                            value: imageId,
                            render: function (obj) {
                                return el(
                                    Button,
                                    {
                                        className: 'button button-primary button-hero periodic-select-btn',
                                        onClick: obj.open
                                    },
                                    el(Dashicon, { icon: 'upload' }),
                                    ' ' + __('Selecionar Imagem de Destaque', 'periodic-image-destaque')
                                );
                            }
                        })
                    )
                );
            } else {
                // Estado com imagem selecionada: Preview responsivo e controles
                var actionsToolbar = el(
                    'div',
                    { className: 'periodic-image-actions-toolbar' },
                    el(
                        MediaUploadCheck,
                        null,
                        el(MediaUpload, {
                            onSelect: onSelectImage,
                            allowedTypes: ['image'],
                            value: imageId,
                            render: function (obj) {
                                return el(
                                    Button,
                                    {
                                        isSecondary: true,
                                        isSmall: true,
                                        className: 'periodic-btn-replace',
                                        onClick: obj.open
                                    },
                                    el(Dashicon, { icon: 'update' }),
                                    ' ' + __('Substituir', 'periodic-image-destaque')
                                );
                            }
                        })
                    ),
                    el(
                        Button,
                        {
                            isDestructive: true,
                            isSmall: true,
                            className: 'periodic-btn-remove',
                            onClick: onRemoveImage
                        },
                        el(Dashicon, { icon: 'trash' }),
                        ' ' + __('Remover', 'periodic-image-destaque')
                    )
                );

                var imageElement = el('img', {
                    src: imageUrl,
                    alt: altText || __('Imagem de destaque', 'periodic-image-destaque'),
                    className: 'periodic-banner-img'
                });

                var captionElement = el(RichText, {
                    tagName: 'figcaption',
                    className: 'periodic-image-caption',
                    placeholder: __('Adicione uma legenda ou título em destaque...', 'periodic-image-destaque'),
                    value: caption,
                    onChange: function (newCaption) {
                        setAttributes({ caption: newCaption });
                    }
                });

                editorContent = el(
                    'figure',
                    { className: 'periodic-image-destaque-preview align-' + alignment },
                    isSelected ? actionsToolbar : null,
                    imageElement,
                    captionElement
                );
            }

            return el(
                'div',
                {
                    className: 'periodic-image-destaque-wrapper is-editor align-' + alignment
                },
                inspectorControls,
                editorContent
            );
        },

        // Renderização para o Frontend
        save: function (props) {
            var attributes = props.attributes;
            var imageUrl = attributes.imageUrl || '';
            var altText = attributes.altText || '';
            var caption = attributes.caption || '';
            var url = attributes.url || '';
            var targetBlank = !!attributes.targetBlank;
            var alignment = attributes.alignment || 'center';

            if (!imageUrl) {
                return null;
            }

            var imageElement = el('img', {
                src: imageUrl,
                alt: altText,
                className: 'periodic-banner-img',
                loading: 'lazy'
            });

            var mediaContent;
            if (url && url.length > 0) {
                var linkProps = {
                    href: url,
                    className: 'periodic-image-link'
                };
                if (targetBlank) {
                    linkProps.target = '_blank';
                    linkProps.rel = 'noopener noreferrer';
                }
                mediaContent = el('a', linkProps, imageElement);
            } else {
                mediaContent = imageElement;
            }

            var captionElement = null;
            if (caption && caption.length > 0) {
                captionElement = el(RichText.Content, {
                    tagName: 'figcaption',
                    className: 'periodic-image-caption',
                    value: caption
                });
            }

            return el(
                'figure',
                {
                    className: 'periodic-image-destaque align-' + alignment
                },
                mediaContent,
                captionElement
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
