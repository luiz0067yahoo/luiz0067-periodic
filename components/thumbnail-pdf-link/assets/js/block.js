/**
 * periodic Mini PDF Image - Gutenberg Block
 *
 * @package Periodic_Mini_PDF_Image
 */

(function () {
  var el = wp.element.createElement;
  var Fragment = wp.element.Fragment;
  var useState = wp.element.useState;

  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor ? wp.blockEditor.RichText : wp.editor.RichText;
  var InspectorControls = wp.blockEditor ? wp.blockEditor.InspectorControls : wp.editor.InspectorControls;
  var PanelBody = wp.components.PanelBody;
  var RangeControl = wp.components.RangeControl;
  var SelectControl = wp.components.SelectControl;
  var ToggleControl = wp.components.ToggleControl;
  var TextControl = wp.components.TextControl;

  // Localized string helper
  var pluginVars = window.periodic_mini_pdf_vars || {};
  var i18nStrings = pluginVars.i18n || {};

  function __(key, defaultText) {
    return i18nStrings[key] || defaultText;
  }

  // Setup PDF.js worker if available
  if (window.pdfjsLib && pluginVars.workerUrl) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = pluginVars.workerUrl;
  }

  // SVG Icons
  var icons = {
    pdf: el(
      'svg',
      { viewBox: '0 0 24 24', width: 24, height: 24, fill: 'currentColor' },
      el('path', {
        d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v1.5h1.5v1h-1.5V16h-1v-6h3c.8 0 1.5.7 1.5 1.5v1c0 .8-.7 1.5-1.5 1.5zm5 4.5h-3v-6h3c.8 0 1.5.7 1.5 1.5v3c0 .8-.7 1.5-1.5 1.5zm4.5-4h-2v1h1.5v1H19V16h-1v-6h3v1.5h-2zM8.5 11.5v-1h-1v1h1zm4 3.5h-1v-4h1c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5z'
      })
    ),
    trash: el(
      'svg',
      { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'currentColor' },
      el('path', {
        d: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
      })
    ),
    plus: el(
      'svg',
      { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'currentColor' },
      el('path', { d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' })
    ),
    arrowLeft: el(
      'svg',
      { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'currentColor' },
      el('path', { d: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' })
    ),
    arrowRight: el(
      'svg',
      { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'currentColor' },
      el('path', { d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' })
    ),
    upload: el(
      'svg',
      { viewBox: '0 0 24 24', width: 16, height: 16, fill: 'currentColor' },
      el('path', { d: 'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z' })
    ),
    image: el(
      'svg',
      { viewBox: '0 0 24 24', width: 16, height: 16, fill: 'currentColor' },
      el('path', {
        d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'
      })
    ),
    download: el(
      'svg',
      { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'currentColor' },
      el('path', { d: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' })
    )
  };

  /**
   * Asynchronously generate image thumbnail from PDF first page using PDF.js
   */
  function renderPdfFirstPage(url, callback) {
    if (!window.pdfjsLib || !url) {
      if (callback) callback(null);
      return;
    }

    try {
      var loadingTask = window.pdfjsLib.getDocument(url);
      loadingTask.promise
        .then(function (pdf) {
          return pdf.getPage(1).then(function (page) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var targetWidth = 600;
            var initialViewport = page.getViewport({ scale: 1 });
            var scale = targetWidth / initialViewport.width;
            var viewport = page.getViewport({ scale: scale });

            var outputScale = window.devicePixelRatio || 1;
            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);

            var transform =
              outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

            var renderContext = {
              canvasContext: context,
              transform: transform,
              viewport: viewport
            };

            return page.render(renderContext).promise.then(function () {
              var dataUrl = canvas.toDataURL('image/jpeg', 0.85);
              if (callback) callback(dataUrl);
            });
          });
        })
        .catch(function (err) {
          console.warn('periodic Mini PDF: Could not render PDF thumbnail via PDF.js', err);
          if (callback) callback(null);
        });
    } catch (e) {
      console.warn('periodic Mini PDF render error:', e);
      if (callback) callback(null);
    }
  }

  /**
   * Block Attributes definition
   */
  var blockAttributes = {
    items: {
      type: 'array',
      default: []
    },
    columns: {
      type: 'number',
      default: 3
    },
    cardStyle: {
      type: 'string',
      default: 'default'
    },
    aspectRatio: {
      type: 'string',
      default: 'square'
    },
    showDate: {
      type: 'boolean',
      default: true
    },
    showDescription: {
      type: 'boolean',
      default: true
    },
    showBadge: {
      type: 'boolean',
      default: true
    },
    showButton: {
      type: 'boolean',
      default: true
    },
    buttonText: {
      type: 'string',
      default: ''
    },
    main_block_id: {
      type: 'string',
      default: ''
    },
    // Backwards compatibility legacy attributes
    title: { type: 'array' },
    description: { type: 'array' },
    dateFile: { type: 'array' },
    url: { type: 'array' },
    media_id: { type: 'array' },
    dataImage: { type: 'array' }
  };

  /**
   * Normalize and migrate legacy attributes if present
   */
  function normalizeItems(attributes) {
    if (attributes.items && attributes.items.length > 0) {
      return attributes.items;
    }

    // Check if legacy array attributes exist
    if (attributes.url && attributes.url.length > 0) {
      var migrated = [];
      var maxLen = attributes.url.length;
      for (var i = 0; i < maxLen; i++) {
        migrated.push({
          title: (attributes.title && attributes.title[i]) || '',
          description: (attributes.description && attributes.description[i]) || '',
          dateFile: (attributes.dateFile && attributes.dateFile[i]) || '',
          url: (attributes.url && attributes.url[i]) || '',
          media_id: (attributes.media_id && attributes.media_id[i]) || '',
          dataImage: (attributes.dataImage && attributes.dataImage[i]) || '',
          targetBlank: true
        });
      }
      return migrated;
    }

    // Default: 1 empty item
    return [
      {
        title: '',
        description: '',
        dateFile: '',
        url: '',
        media_id: '',
        dataImage: '',
        targetBlank: true
      }
    ];
  }

  /**
   * Block Configuration Object
   */
  var blockConfig = {
    title: __('block_title', 'Mini PDF Image'),
    icon: icons.pdf,
    category: 'media',
    description: __(
      'block_description',
      'Exiba cards e miniaturas de documentos PDF com capa, data e título estilizados.'
    ),
    keywords: ['pdf', 'document', 'download', 'thumbnail', 'link', 'miniatura'],
    supports: {
      align: ['wide', 'full'],
      multiple: true
    },
    attributes: blockAttributes,

    /**
     * Edit Component
     */
    edit: function (props) {
      var attributes = props.attributes;
      var setAttributes = props.setAttributes;
      var items = normalizeItems(attributes);

      var stateHook = useState({});
      var loadingState = stateHook[0];
      var setLoadingState = stateHook[1];

      // Ensure block ID
      if (!attributes.main_block_id) {
        var generatedId = 'periodic-pdf-' + Math.floor(Math.random() * 10000);
        setAttributes({ main_block_id: generatedId });
      }

      // Sync normalized items to attributes if needed
      if (!attributes.items || attributes.items.length === 0) {
        setAttributes({ items: items });
      }

      var columns = attributes.columns || 3;
      var cardStyle = attributes.cardStyle || 'default';
      var aspectRatio = attributes.aspectRatio || 'square';
      var showDate = attributes.showDate !== false;
      var showDescription = attributes.showDescription !== false;
      var showBadge = attributes.showBadge !== false;
      var showButton = attributes.showButton !== false;
      var buttonText = attributes.buttonText || __('download_pdf', 'Acessar PDF');

      // Card Item Mutators
      function updateItemProperty(index, prop, value) {
        var newItems = items.map(function (item, i) {
          if (i === index) {
            var updated = Object.assign({}, item);
            updated[prop] = value;
            return updated;
          }
          return item;
        });
        setAttributes({ items: newItems });
      }

      function addItemAfter(index) {
        var newItem = {
          title: '',
          description: '',
          dateFile: '',
          url: '',
          media_id: '',
          dataImage: '',
          targetBlank: true
        };
        var newItems = items.slice();
        newItems.splice(index + 1, 0, newItem);
        setAttributes({ items: newItems });
      }

      function removeItem(index) {
        if (items.length <= 1) {
          // Keep at least one empty item
          setAttributes({
            items: [
              {
                title: '',
                description: '',
                dateFile: '',
                url: '',
                media_id: '',
                dataImage: '',
                targetBlank: true
              }
            ]
          });
          return;
        }
        var newItems = items.filter(function (_, i) {
          return i !== index;
        });
        setAttributes({ items: newItems });
      }

      function moveItem(index, direction) {
        var targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= items.length) return;
        var newItems = items.slice();
        var temp = newItems[index];
        newItems[index] = newItems[targetIndex];
        newItems[targetIndex] = temp;
        setAttributes({ items: newItems });
      }

      // Media Selection via WP Media Frame
      function openPdfMediaModal(index) {
        var frame = wp.media({
          title: __('select_pdf', 'Selecionar Anexo / PDF'),
          button: { text: __('select_file_btn', 'Escolher Arquivo na Mídia') },
          library: { type: ['application/pdf', 'image'] },
          multiple: false
        });

        frame.on('select', function () {
          var attachment = frame.state().get('selection').first().toJSON();
          if (!attachment) return;

          var url = attachment.url || '';
          var title = attachment.title || '';
          var dateFormatted =
            attachment.dateFormatted ||
            (attachment.date ? new Date(attachment.date).toLocaleDateString() : '');
          var id = attachment.id || '';

          // Set basic meta
          var newItems = items.slice();
          var updated = Object.assign({}, newItems[index], {
            url: url,
            media_id: id,
            title: newItems[index].title || title,
            dateFile: dateFormatted
          });

          // Check if attachment is an image or has a large thumbnail
          if (attachment.type === 'image') {
            updated.dataImage = attachment.url;
            newItems[index] = updated;
            setAttributes({ items: newItems });
          } else if (attachment.sizes && attachment.sizes.full) {
            updated.dataImage = attachment.sizes.full.url;
            newItems[index] = updated;
            setAttributes({ items: newItems });
          } else {
            // PDF file: attempt PDF.js thumbnail generation
            newItems[index] = updated;
            setAttributes({ items: newItems });

            var loadingCopy = Object.assign({}, loadingState);
            loadingCopy[index] = true;
            setLoadingState(loadingCopy);

            renderPdfFirstPage(url, function (dataUrl) {
              var currentItems = (props.attributes.items || items).slice();
              if (currentItems[index]) {
                var itemWithThumb = Object.assign({}, currentItems[index]);
                if (dataUrl) {
                  itemWithThumb.dataImage = dataUrl;
                }
                currentItems[index] = itemWithThumb;
                setAttributes({ items: currentItems });
              }
              var doneCopy = Object.assign({}, loadingState);
              delete doneCopy[index];
              setLoadingState(doneCopy);
            });
          }
        });

        frame.open();
      }

      // Custom Thumbnail Image Selector
      function openImageModal(index) {
        var frame = wp.media({
          title: __('change_thumbnail', 'Alterar Miniatura'),
          button: { text: __('change_thumbnail', 'Alterar Miniatura') },
          library: { type: 'image' },
          multiple: false
        });

        frame.on('select', function () {
          var attachment = frame.state().get('selection').first().toJSON();
          if (attachment && attachment.url) {
            updateItemProperty(index, 'dataImage', attachment.url);
          }
        });

        frame.open();
      }

      // Render Individual Editor Card
      function renderEditorCard(item, index) {
        var isLoading = !!loadingState[index];
        var thumbClass = 'periodic-editor-thumb-box ratio-' + aspectRatio;

        return el(
          'div',
          {
            key: 'pdf-card-' + index,
            className: 'periodic-editor-card'
          },
          // Card Toolbar
          el(
            'div',
            { className: 'periodic-card-toolbar' },
            el(
              'div',
              { className: 'toolbar-left' },
              el(
                'button',
                {
                  className: 'periodic-toolbar-btn',
                  title: __('move_up', 'Mover para a esquerda / cima'),
                  disabled: index === 0,
                  onClick: function () {
                    moveItem(index, -1);
                  }
                },
                icons.arrowLeft
              ),
              el(
                'button',
                {
                  className: 'periodic-toolbar-btn',
                  title: __('move_down', 'Mover para a direita / baixo'),
                  disabled: index === items.length - 1,
                  onClick: function () {
                    moveItem(index, 1);
                  }
                },
                icons.arrowRight
              )
            ),
            el(
              'div',
              { className: 'toolbar-right' },
              el(
                'button',
                {
                  className: 'periodic-toolbar-btn',
                  title: __('add_pdf', 'Adicionar PDF'),
                  onClick: function () {
                    addItemAfter(index);
                  }
                },
                icons.plus
              ),
              el(
                'button',
                {
                  className: 'periodic-toolbar-btn btn-danger',
                  title: __('remove_pdf', 'Remover Item'),
                  onClick: function () {
                    removeItem(index);
                  }
                },
                icons.trash
              )
            )
          ),

          // Thumbnail Box
          el(
            'div',
            { className: thumbClass },
            isLoading &&
              el(
                'div',
                { className: 'periodic-thumb-loading' },
                el('div', { className: 'periodic-spinner' }),
                el('span', {}, __('generating_thumbnail', 'Gerando miniatura...'))
              ),
            item.dataImage
              ? el('img', {
                  src: item.dataImage,
                  alt: item.title || 'PDF Thumbnail'
                })
              : el(
                  'div',
                  { className: 'periodic-pdf-placeholder' },
                  icons.pdf,
                  el(
                    'span',
                    { style: { fontSize: '11px', textAlign: 'center' } },
                    __('no_pdf_selected', 'Nenhum documento PDF selecionado ainda.')
                  )
                ),
            // Hover Overlay with Action Buttons
            el(
              'div',
              {
                className:
                  'periodic-thumb-overlay' + (!item.dataImage ? ' is-empty' : '')
              },
              el(
                'button',
                {
                  className: 'periodic-thumb-action-btn',
                  type: 'button',
                  onClick: function () {
                    openPdfMediaModal(index);
                  }
                },
                icons.upload,
                item.url
                  ? __('change_pdf', 'Alterar PDF')
                  : __('select_pdf', 'Selecionar Anexo / PDF')
              ),
              el(
                'button',
                {
                  className: 'periodic-thumb-action-btn',
                  type: 'button',
                  onClick: function () {
                    openImageModal(index);
                  }
                },
                icons.image,
                __('change_thumbnail', 'Alterar Miniatura')
              )
            )
          ),

          // Content Fields
          el(
            'div',
            { className: 'periodic-editor-body' },
            showDate &&
              el('input', {
                type: 'text',
                className: 'periodic-editor-date-input',
                value: item.dateFile || '',
                placeholder: 'Data / Informação adicional (ex.: 10/09/2026)',
                onChange: function (e) {
                  updateItemProperty(index, 'dateFile', e.target.value);
                }
              }),
            el(RichText, {
              tagName: 'h4',
              className: 'periodic-editor-title',
              value: item.title,
              placeholder: __('title_placeholder', 'Título do documento (até 80 caracteres)...'),
              onChange: function (value) {
                updateItemProperty(index, 'title', value);
              }
            }),
            showDescription &&
              el(RichText, {
                tagName: 'p',
                className: 'periodic-editor-description',
                value: item.description,
                placeholder: __(
                  'description_placeholder',
                  'Breve descrição sobre o conteúdo do documento...'
                ),
                onChange: function (value) {
                  updateItemProperty(index, 'description', value);
                }
              })
          )
        );
      }

      return el(
        Fragment,
        {},
        // Sidebar Inspector Controls
        el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: __('card_settings', 'Configurações dos Cards'), initialOpen: true },
            el(RangeControl, {
              label: __('columns', 'Colunas'),
              value: columns,
              onChange: function (val) {
                setAttributes({ columns: val });
              },
              min: 1,
              max: 4
            }),
            el(SelectControl, {
              label: __('card_style', 'Estilo do Card'),
              value: cardStyle,
              options: [
                { label: __('style_default', 'Padrão (Clean)'), value: 'default' },
                { label: __('style_bordered', 'Com Borda'), value: 'bordered' },
                { label: __('style_shadow', 'Sombra Elevada'), value: 'shadow' },
                { label: __('style_flat', 'Plano / Minimalista'), value: 'flat' }
              ],
              onChange: function (val) {
                setAttributes({ cardStyle: val });
              }
            }),
            el(SelectControl, {
              label: __('aspect_ratio', 'Proporção da Capa'),
              value: aspectRatio,
              options: [
                { label: __('ratio_square', 'Quadrado (1:1)'), value: 'square' },
                { label: __('ratio_portrait', 'Documento / A4 (3:4)'), value: 'portrait' },
                { label: __('ratio_landscape', 'Horizontal (16:9)'), value: 'landscape' }
              ],
              onChange: function (val) {
                setAttributes({ aspectRatio: val });
              }
            }),
            el(ToggleControl, {
              label: __('show_date', 'Exibir Data'),
              checked: showDate,
              onChange: function (val) {
                setAttributes({ showDate: val });
              }
            }),
            el(ToggleControl, {
              label: __('show_description', 'Exibir Descrição'),
              checked: showDescription,
              onChange: function (val) {
                setAttributes({ showDescription: val });
              }
            }),
            el(ToggleControl, {
              label: __('show_badge', 'Exibir Selo PDF'),
              checked: showBadge,
              onChange: function (val) {
                setAttributes({ showBadge: val });
              }
            }),
            el(ToggleControl, {
              label: 'Exibir Botão de Ação',
              checked: showButton,
              onChange: function (val) {
                setAttributes({ showButton: val });
              }
            }),
            showButton &&
              el(TextControl, {
                label: 'Texto do Botão',
                value: attributes.buttonText || '',
                placeholder: __('download_pdf', 'Acessar PDF'),
                onChange: function (val) {
                  setAttributes({ buttonText: val });
                }
              })
          )
        ),

        // Editor Canvas Grid
        el(
          'div',
          {
            id: attributes.main_block_id,
            className: 'periodic-pdf-grid cols-' + columns
          },
          items.map(function (item, index) {
            return renderEditorCard(item, index);
          }),
          // Add Card Button Card
          el(
            'div',
            {
              className: 'periodic-add-card-placeholder',
              onClick: function () {
                addItemAfter(items.length - 1);
              }
            },
            icons.plus,
            el('span', {}, __('add_pdf', 'Adicionar PDF'))
          )
        )
      );
    },

    /**
     * Save Component
     */
    save: function (props) {
      var attributes = props.attributes;
      var items = normalizeItems(attributes);

      var columns = attributes.columns || 3;
      var cardStyle = attributes.cardStyle || 'default';
      var aspectRatio = attributes.aspectRatio || 'square';
      var showDate = attributes.showDate !== false;
      var showDescription = attributes.showDescription !== false;
      var showBadge = attributes.showBadge !== false;
      var showButton = attributes.showButton !== false;
      var buttonText = attributes.buttonText || 'Acessar PDF';

      var validItems = items.filter(function (item) {
        return item && (item.url || item.title || item.dataImage);
      });

      if (validItems.length === 0) {
        validItems = items;
      }

      return el(
        'div',
        {
          id: attributes.main_block_id || undefined,
          className: 'periodic-pdf-grid cols-' + columns
        },
        validItems.map(function (item, index) {
          var targetUrl = item.url || '#';
          var thumbClass =
            'periodic-pdf-thumb-link ratio-' + aspectRatio + ' height-square';

          return el(
            'article',
            {
              key: 'pdf-card-save-' + index,
              className: 'periodic-pdf-card style-' + cardStyle + ' pdf-mini-bloco'
            },
            // Thumbnail Link
            el(
              'a',
              {
                className: thumbClass,
                href: targetUrl,
                target: item.targetBlank !== false ? '_blank' : '_self',
                rel: item.targetBlank !== false ? 'noopener noreferrer' : undefined,
                'aria-label': item.title || 'Documento PDF'
              },
              showBadge &&
                el(
                  'span',
                  { className: 'periodic-pdf-badge' },
                  el(
                    'svg',
                    { viewBox: '0 0 24 24' },
                    el('path', {
                      d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v1.5h1.5v1h-1.5V16h-1v-6h3c.8 0 1.5.7 1.5 1.5v1c0 .8-.7 1.5-1.5 1.5zm5 4.5h-3v-6h3c.8 0 1.5.7 1.5 1.5v3c0 .8-.7 1.5-1.5 1.5zm4.5-4h-2v1h1.5v1H19V16h-1v-6h3v1.5h-2zM8.5 11.5v-1h-1v1h1zm4 3.5h-1v-4h1c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5z'
                    })
                  ),
                  'PDF'
                ),
              item.dataImage
                ? el('img', {
                    className: 'periodic-pdf-thumb-img',
                    src: item.dataImage,
                    alt: item.title || 'PDF Document Preview',
                    loading: 'lazy'
                  })
                : el(
                    'div',
                    { className: 'periodic-pdf-placeholder' },
                    icons.pdf
                  )
            ),

            // Card Body
            el(
              'div',
              { className: 'periodic-pdf-body all-text-pdf' },
              showDate &&
                item.dateFile &&
                el(
                  'time',
                  { className: 'periodic-pdf-date' },
                  item.dateFile
                ),
              item.title &&
                el(
                  'h3',
                  { className: 'periodic-pdf-title' },
                  el(RichText.Content, { value: item.title })
                ),
              showDescription &&
                item.description &&
                el(
                  'p',
                  { className: 'periodic-pdf-description' },
                  el(RichText.Content, { value: item.description })
                ),
              showButton &&
                targetUrl &&
                el(
                  'a',
                  {
                    className: 'periodic-pdf-action',
                    href: targetUrl,
                    target: item.targetBlank !== false ? '_blank' : '_self',
                    rel: item.targetBlank !== false ? 'noopener noreferrer' : undefined
                  },
                  icons.download,
                  el('span', {}, buttonText)
                )
            )
          );
        })
      );
    }
  };

  // Register primary block
  registerBlockType('periodic/mini-pdf-image', blockConfig);

  // Register backwards-compatibility alias for prefeitura legacy blocks
  registerBlockType('cms-adm/mini-pdf-image', blockConfig);
  registerBlockType('cms-adm/mini-pdf', blockConfig);
})();
