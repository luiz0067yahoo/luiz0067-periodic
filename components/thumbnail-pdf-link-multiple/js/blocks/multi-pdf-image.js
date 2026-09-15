(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var __ = i18n.__;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var MediaUpload = blockEditor.MediaUpload;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var Button = components.Button;

    registerBlockType('custom-adm/multi-pdf-image', {
        title: __('Múltiplos PDFs com Imagem', 'custom-adm'),
        description: __('Galeria de PDFs com thumbnail de capa', 'custom-adm'),
        icon: { src: pluginData.pluginUrl + 'assets/icon.svg', foreground: '#21759b' },
        category: 'media',
        attributes: {
            columnsCount: { type: 'number', default: 3 },
            items: {
                type: 'array',
                default: []
            }
        },
        example: {
            attributes: {
                columnsCount: 3,
                items: [
                    {
                        title: 'Relatório Anual 2023',
                        description: 'Versão resumida',
                        thumbUrl: 'https://via.placeholder.com/300x400?text=Cover',
                        pdfUrl: 'https://example.com/relatorio-2023.pdf',
                        downloadDirect: false
                    },
                    {
                        title: 'Edital de Licitação',
                        description: 'Chamada 45/2024',
                        thumbUrl: 'https://via.placeholder.com/300x400?text=Cover',
                        pdfUrl: 'https://example.com/edital.pdf',
                        downloadDirect: true
                    }
                ]
            }
        },
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;
            var items = attributes.items;
            var columns = attributes.columnsCount;

            // Ensure at least one empty item exists for UI.
            if (!items.length) {
                items = [];
                setAttributes({ items: items });
            }

            function addItem() {
                var newItem = {
                    pdfUrl: '',
                    pdfId: 0,
                    thumbUrl: '',
                    thumbId: 0,
                    title: '',
                    description: '',
                    downloadDirect: false
                };
                setAttributes({ items: items.concat([newItem]) });
            }

            function removeItem(index) {
                var newItems = items.slice();
                newItems.splice(index, 1);
                setAttributes({ items: newItems });
            }

            function updateItem(index, key, value) {
                var newItems = items.slice();
                newItems[index][key] = value;
                setAttributes({ items: newItems });
            }

            return el('div', { className: props.className },
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Configurações da Galeria', 'custom-adm'), initialOpen: true },
                        el(RangeControl, {
                            label: __('Número de colunas', 'custom-adm'),
                            value: columns,
                            onChange: function (val) { setAttributes({ columnsCount: val }); },
                            min: 1,
                            max: 4
                        })
                    )
                ),
                // Grid container
                el('div', { className: 'customadm-multi-pdf-grid cols-' + columns },
                    items.map(function (item, idx) {
                        return el('div', { key: idx, className: 'pdf-card' },
                            // Thumbnail upload
                            el(MediaUpload, {
                                onSelect: function (media) { updateItem(idx, 'thumbUrl', media.url); updateItem(idx, 'thumbId', media.id); },
                                allowedTypes: ['image'],
                                value: item.thumbId,
                                render: function (obj) {
                                    return el(Button, {
                                        className: item.thumbUrl ? 'image-button' : 'button button-large',
                                        onClick: obj.open
                                    }, item.thumbUrl ? el('img', { src: item.thumbUrl, className: 'thumb-preview' }) : __('Selecionar capa', 'custom-adm'));
                                }
                            }),
                            // PDF upload
                            el(MediaUpload, {
                                onSelect: function (media) { updateItem(idx, 'pdfUrl', media.url); updateItem(idx, 'pdfId', media.id); },
                                allowedTypes: ['application/pdf'],
                                value: item.pdfId,
                                render: function (obj) {
                                    return el(Button, { className: 'button', onClick: obj.open }, item.pdfUrl ? __('Alterar PDF', 'custom-adm') : __('Selecionar PDF', 'custom-adm'));
                                }
                            }),
                            // Title RichText
                            el(RichText, {
                                tagName: 'h3',
                                placeholder: __('Título do documento', 'custom-adm'),
                                value: item.title,
                                onChange: function (val) { updateItem(idx, 'title', val); },
                                allowedFormats: []
                            }),
                            // Description RichText
                            el(RichText, {
                                tagName: 'p',
                                placeholder: __('Descrição curta', 'custom-adm'),
                                value: item.description,
                                onChange: function (val) { updateItem(idx, 'description', val); },
                                allowedFormats: []
                            }),
                            // Download toggle
                            el(ToggleControl, {
                                label: __('Forçar download', 'custom-adm'),
                                checked: !!item.downloadDirect,
                                onChange: function (val) { updateItem(idx, 'downloadDirect', val); }
                            }),
                            // Remove button
                            el(Button, { isDestructive: true, onClick: function () { removeItem(idx); } }, __('Remover', 'custom-adm'))
                        );
                    })
                ),
                el(Button, { isPrimary: true, onClick: addItem, style: { marginTop: '10px' } }, __('Adicionar item', 'custom-adm'))
            );
        },
        save: function (props) {
            var attributes = props.attributes;
            var columns = attributes.columnsCount;
            var items = attributes.items;

            return el('div', { className: 'customadm-multi-pdf-grid cols-' + columns },
                items.map(function (item, idx) {
                    return el('a', {
                        key: idx,
                        href: item.pdfUrl,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        download: item.downloadDirect ? true : undefined,
                        className: 'pdf-card-link'
                    },
                        el('img', { src: item.thumbUrl, alt: item.title, className: 'pdf-thumb' }),
                        el('div', { className: 'pdf-meta' },
                            el('h3', null, item.title),
                            el('p', null, item.description)
                        )
                    );
                })
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
