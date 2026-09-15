(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var __ = i18n.__;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;
    var ToggleControl = components.ToggleControl;

    registerBlockType('custom-adm/title-text-block', {
        title: __('Title and Text (Title and Text Block)', 'custom-adm'),
        description: __('A section with a heading, optional subtitle, rich text content and optional accent bar.', 'custom-adm'),
        icon: 'editor-alignleft',
        category: 'text',
        attributes: {
            title: { type: 'string', default: '' },
            subtitle: { type: 'string', default: '' },
            content: { type: 'string', default: '' },
            headingTag: { type: 'string', default: 'h2' },
            alignment: { type: 'string', default: 'left' },
            showAccentBar: { type: 'boolean', default: true }
        },
        example: {
            attributes: {
                title: 'Título institucional',
                subtitle: 'Subtítulo informativo',
                content: '<p>Este é um exemplo de conteúdo rico que pode incluir <strong>negrito</strong>, <em>itálico</em> e outros elementos.</p>',
                headingTag: 'h2',
                alignment: 'left',
                showAccentBar: true
            }
        },
        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return [
                el(InspectorControls, { key: 'inspector' },
                    el(PanelBody, { title: __('Settings', 'custom-adm'), initialOpen: true },
                        el(SelectControl, {
                            label: __('Heading level', 'custom-adm'),
                            value: attributes.headingTag,
                            options: [
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' }
                            ],
                            onChange: function (value) { setAttributes({ headingTag: value }); }
                        }),
                        el(SelectControl, {
                            label: __('Alignment', 'custom-adm'),
                            value: attributes.alignment,
                            options: [
                                { label: __('Left', 'custom-adm'), value: 'left' },
                                { label: __('Center', 'custom-adm'), value: 'center' },
                                { label: __('Right', 'custom-adm'), value: 'right' }
                            ],
                            onChange: function (value) { setAttributes({ alignment: value }); }
                        }),
                        el(ToggleControl, {
                            label: __('Show accent bar', 'custom-adm'),
                            checked: attributes.showAccentBar,
                            onChange: function (value) { setAttributes({ showAccentBar: value }); }
                        })
                    )
                ),
                el('div', { className: 'title-text-block-editor', key: 'block' },
                    // Subtitle (optional)
                    el(RichText, {
                        tagName: 'p',
                        className: 'subtitle',
                        placeholder: __('Subtitle...', 'custom-adm'),
                        value: attributes.subtitle,
                        onChange: function (value) { setAttributes({ subtitle: value }); },
                        keepPlaceholderOnFocus: true,
                        allowedFormats: []
                    }),
                    // Title
                    el(RichText, {
                        tagName: attributes.headingTag,
                        className: 'title',
                        placeholder: __('Title...', 'custom-adm'),
                        value: attributes.title,
                        onChange: function (value) { setAttributes({ title: value }); },
                        keepPlaceholderOnFocus: true,
                        allowedFormats: []
                    }),
                    // Content
                    el(RichText, {
                        tagName: 'div',
                        className: 'content',
                        placeholder: __('Content...', 'custom-adm'),
                        value: attributes.content,
                        onChange: function (value) { setAttributes({ content: value }); },
                        multiline: 'p',
                        keepPlaceholderOnFocus: true
                    }),
                    // Accent bar (visual only in editor)
                    attributes.showAccentBar && el('div', { className: 'accent-bar' })
                )
            ];
        },
        save: function (props) {
            var attributes = props.attributes;
            var HeadingTag = attributes.headingTag;
            return el('div', { className: 'title-text-block' + ' align-' + attributes.alignment },
                attributes.subtitle && el('p', { className: 'subtitle' },
                    el(RawHTML, null, attributes.subtitle)
                ),
                el(HeadingTag, { className: 'title' },
                    el(RawHTML, null, attributes.title)
                ),
                el('div', { className: 'content' },
                    el(RawHTML, null, attributes.content)
                ),
                attributes.showAccentBar && el('div', { className: 'accent-bar' })
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
