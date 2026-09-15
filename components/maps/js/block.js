(function( wp ) {
    var registerBlockType = wp.blocks.registerBlockType;
    var i18nData = window.periodic_maps_i18n || {};
    var __ = function( key, domain ) {
        if ( i18nData && i18nData[ key ] !== undefined ) {
            return i18nData[ key ];
        }
        if ( wp.i18n && typeof wp.i18n.__ === 'function' ) {
            return wp.i18n.__( key, domain );
        }
        return key;
    };
    var el = wp.element.createElement;
    var TextControl = wp.components.TextControl;
    var RangeControl = wp.components.RangeControl;
    var PanelBody = wp.components.PanelBody;
    var InspectorControls = wp.blockEditor.InspectorControls || wp.editor.InspectorControls;
    var BlockControls = wp.blockEditor.BlockControls || wp.editor.BlockControls;
    var AlignmentToolbar = wp.blockEditor.AlignmentToolbar || wp.editor.AlignmentToolbar;

    registerBlockType( 'periodic/maps', {
        title: __( 'Mapa Interativo', 'periodic-maps' ),
        icon: 'location',
        category: 'embed',
        attributes: {
            mapUrl: { type: 'string', default: '' },
            height: { type: 'string', default: '400px' },
            alignment: { type: 'string', default: 'center' },
            borderRadius: { type: 'string', default: '0px' },
            caption: { type: 'string', default: '' },
            customClass: { type: 'string', default: '' },
        },
        edit: function( props ) {
            var attrs = props.attributes;
            function onChangeMapUrl( value ) { props.setAttributes( { mapUrl: value } ); }
            function onChangeHeight( value ) { props.setAttributes( { height: value + 'px' } ); }
            function onChangeBorderRadius( value ) { props.setAttributes( { borderRadius: value + 'px' } ); }
            function onChangeCaption( value ) { props.setAttributes( { caption: value } ); }
            function onChangeCustomClass( value ) { props.setAttributes( { customClass: value } ); }

            return el( 'div', { className: props.className },
                el( InspectorControls, null,
                    el( PanelBody, { title: __( 'Configurações do Mapa', 'periodic-maps' ), initialOpen: true },
                        el( TextControl, {
                            label: __( 'URL do iframe (Google Maps / OSM)', 'periodic-maps' ),
                            value: attrs.mapUrl,
                            onChange: onChangeMapUrl,
                            help: __( 'Cole o link completo de embed do mapa.', 'periodic-maps' )
                        } ),
                        el( RangeControl, {
                            label: __( 'Altura (px)', 'periodic-maps' ),
                            value: parseInt( attrs.height, 10 ),
                            min: 200,
                            max: 1200,
                            onChange: onChangeHeight
                        } ),
                        el( RangeControl, {
                            label: __( 'Borda Arredondada (px)', 'periodic-maps' ),
                            value: parseInt( attrs.borderRadius, 10 ),
                            min: 0,
                            max: 50,
                            onChange: onChangeBorderRadius
                        } ),
                        el( TextControl, {
                            label: __( 'Legenda', 'periodic-maps' ),
                            value: attrs.caption,
                            onChange: onChangeCaption
                        } ),
                        el( TextControl, {
                            label: __( 'Classe CSS extra', 'periodic-maps' ),
                            value: attrs.customClass,
                            onChange: onChangeCustomClass,
                            help: __( 'Use para estilos customizados.', 'periodic-maps' )
                        } )
                    )
                ),
                el( BlockControls, null,
                    el( AlignmentToolbar, {
                        value: attrs.alignment,
                        onChange: function( next ) { props.setAttributes( { alignment: next } ); }
                    } )
                ),
                el( 'div', { className: 'periodic-maps-preview' },
                    attrs.mapUrl ? el( 'iframe', {
                        src: attrs.mapUrl,
                        style: {
                            height: attrs.height,
                            borderRadius: attrs.borderRadius,
                            width: '100%'
                        },
                        frameBorder: 0,
                        allowFullScreen: true
                    } ) : el( 'p', {}, __( 'Insira a URL do mapa no painel lateral.', 'periodic-maps' ) )
                )
            );
        },
        save: function() {
            // Rendering handled by PHP server‑side.
            return null;
        }
    } );
} )( window.wp );
