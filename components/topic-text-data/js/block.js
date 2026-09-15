( function( blocks, i18n, element, components, blockEditor ) {
    var el = element.createElement;
    var __ = i18n.__;
    var TextControl = components.TextControl;
    var TextareaControl = components.TextareaControl;
    var URLInput = blockEditor.URLInput;

    blocks.registerBlockType( 'periodic/topic-text-data', {
        title: __( 'Topic Text Data', 'periodic-topic-text-data' ),
        icon: 'text',
        category: 'common',
        supports: { multiple: true },
        attributes: {
            title: { type: 'string', source: 'html', selector: 'h4' },
            description: { type: 'string', source: 'html', selector: 'p' },
            url: { type: 'string', default: '' },
        },
        edit: function( props ) {
            var attrs = props.attributes;
            function onChangeTitle( value ) { props.setAttributes( { title: value } ); }
            function onChangeDescription( value ) { props.setAttributes( { description: value } ); }
            function onChangeURL( value ) { props.setAttributes( { url: value } ); }
            return el( 'div', { className: props.className },
                el( TextControl, {
                    label: __( 'Title', 'periodic-topic-text-data' ),
                    value: attrs.title,
                    onChange: onChangeTitle,
                } ),
                el( TextareaControl, {
                    label: __( 'Description', 'periodic-topic-text-data' ),
                    value: attrs.description,
                    onChange: onChangeDescription,
                } ),
                el( URLInput, {
                    label: __( 'Link URL', 'periodic-topic-text-data' ),
                    value: attrs.url,
                    onChange: onChangeURL,
                } )
            );
        },
        save: function( props ) {
            var attrs = props.attributes;
            return el( 'div', { className: 'topic-text-data-block' },
                el( 'h4', null, attrs.title ),
                el( 'p', null, attrs.description ),
                attrs.url && attrs.url.length > 0 && el( 'a', { href: attrs.url, className: 'topic-text-data-link', target: '_blank', rel: 'noopener' }, __( 'Learn more', 'periodic-topic-text-data' ) )
            );
        },
    } );
} )( window.wp.blocks, window.wp.i18n, window.wp.element, window.wp.components, window.wp.blockEditor );
