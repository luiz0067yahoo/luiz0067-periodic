(function(wp) {
  if (!wp || !wp.blocks || !wp.element) return;

  var el = wp.element.createElement;
  var __ = wp.i18n.__;
  var registerBlockType = wp.blocks.registerBlockType;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var PanelBody = wp.components.PanelBody;
  var SelectControl = wp.components.SelectControl;
  var TextControl = wp.components.TextControl;
  var TextareaControl = wp.components.TextareaControl;
  var RangeControl = wp.components.RangeControl;
  var ColorPicker = wp.components.ColorPicker;
  var Button = wp.components.Button;

  var DEFAULT_ICONS = [
    'fa-gift', 'fa-star', 'fa-bell', 'fa-snowflake', 'fa-tree', 'fa-cookie-bite',
    'fa-candy-cane', 'fa-sleigh', 'fa-snowman', 'fa-mistletoe', 'fa-ribbon', 'fa-gem',
    'fa-trophy', 'fa-crown', 'fa-medal', 'fa-key', 'fa-magic', 'fa-wand-magic-sparkles',
    'fa-rocket', 'fa-heart', 'fa-bolt', 'fa-compass', 'fa-lightbulb', 'fa-champagne-glasses'
  ];

  function getQrSvg(text, color, bgColor, size) {
    if (window.QRCode && window.QRCode.generateSVG) {
      return window.QRCode.generateSVG(text, { colorDark: color, colorLight: bgColor, width: size, height: size });
    }
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="' + bgColor + '"/><rect x="20" y="20" width="50" height="50" fill="' + color + '"/><rect x="130" y="20" width="50" height="50" fill="' + color + '"/><rect x="20" y="130" width="50" height="50" fill="' + color + '"/><circle cx="100" cy="100" r="25" fill="' + color + '"/></svg>';
  }

  registerBlockType('periodic/interactive-utilities', {
    apiVersion: 3,
    title: __('Periodic Interactive Utilities', 'periodic-interactive-utilities'),
    icon: 'superhero',
    category: 'widgets',
    attributes: {
      utilityType: { type: 'string', default: 'advent-calendar' },
      qrText: { type: 'string', default: 'https://github.com/periodic' },
      qrColor: { type: 'string', default: '#0d6efd' },
      qrBgColor: { type: 'string', default: '#ffffff' },
      qrSize: { type: 'number', default: 240 },
      calendarTitle: { type: 'string', default: 'Calendário do Advento Interativo' },
      calendarSubtitle: { type: 'string', default: 'Abra as caixas a cada dia de dezembro para revelar as surpresas!' },
      calendarDoors: { type: 'array', default: [] },
      calendarYear: { type: 'number', default: 2026 },
      arMarkerType: { type: 'string', default: 'hiro' },
      arClueTitle: { type: 'string', default: 'Pistas & Desafio AR' },
      arClueHint: { type: 'string', default: 'Aponte sua câmera para o marcador impresso ou na tela para revelar a chave secreta.' },
      arInstructions: { type: 'string', default: 'Utilize o marcador padrão HIRO abaixo. Ao detectar o marcador, a pista tridimensional é projetada!' }
    },

    edit: function(props) {
      var attr = props.attributes;
      var setAttr = props.setAttributes;
      var blockProps = useBlockProps({ className: 'periodic-interactive-container' });

      // Init 24 doors if empty
      wp.element.useEffect(function() {
        if (!attr.calendarDoors || attr.calendarDoors.length === 0) {
          var year = attr.calendarYear || 2026;
          var doors = [];
          for (var i = 1; i <= 24; i++) {
            var dayStr = i < 10 ? '0' + i : '' + i;
            doors.push({
              dayNumber: i,
              unlockDate: year + '-12-' + dayStr,
              title: 'Surpresa do Dia ' + i,
              contentHtml: '<p>Parabéns por abrir o <strong>Dia ' + i + '</strong> do Calendário do Advento! Aqui está o seu conteúdo exclusivo e dicas do ecossistema periodic.</p>',
              isLockedByDefault: true,
              icon: DEFAULT_ICONS[(i - 1) % DEFAULT_ICONS.length]
            });
          }
          setAttr({ calendarDoors: doors });
        }
      }, []);

      var testDate = '2026-12-15';

      return el('div', blockProps,
        el(InspectorControls, {},
          el(PanelBody, { title: __('Tipo de Utilitário', 'periodic-interactive-utilities'), initialOpen: true },
            el(SelectControl, {
              label: __('Utilitário Ativo', 'periodic-interactive-utilities'),
              value: attr.utilityType,
              options: [
                { label: 'Calendário do Advento (24 Dias)', value: 'advent-calendar' },
                { label: 'Gerador de QR Code Dinâmico', value: 'qr-code' },
                { label: 'Pistas com Marcador AR', value: 'ar-trigger' }
              ],
              onChange: function(val) { setAttr({ utilityType: val }); }
            })
          ),
          attr.utilityType === 'qr-code' && el(PanelBody, { title: __('Opções do QR Code', 'periodic-interactive-utilities'), initialOpen: true },
            el(TextControl, {
              label: __('URL / Conteúdo', 'periodic-interactive-utilities'),
              value: attr.qrText,
              onChange: function(val) { setAttr({ qrText: val }); }
            }),
            el(RangeControl, {
              label: __('Tamanho (px)', 'periodic-interactive-utilities'),
              value: attr.qrSize || 240,
              min: 120,
              max: 400,
              onChange: function(val) { setAttr({ qrSize: val }); }
            })
          ),
          attr.utilityType === 'advent-calendar' && el(PanelBody, { title: __('Opções do Calendário', 'periodic-interactive-utilities'), initialOpen: true },
            el(TextControl, {
              label: __('Título do Calendário', 'periodic-interactive-utilities'),
              value: attr.calendarTitle,
              onChange: function(val) { setAttr({ calendarTitle: val }); }
            }),
            el(TextareaControl, {
              label: __('Subtítulo', 'periodic-interactive-utilities'),
              value: attr.calendarSubtitle,
              onChange: function(val) { setAttr({ calendarSubtitle: val }); }
            })
          )
        ),

        // Editor tab bar
        el('div', { className: 'luiz-editor-tabs' },
          el('button', {
            type: 'button',
            className: 'luiz-editor-tab-btn ' + (attr.utilityType === 'advent-calendar' ? 'is-active' : ''),
            onClick: function() { setAttr({ utilityType: 'advent-calendar' }); }
          }, el('i', { className: 'fa-solid fa-calendar-days' }), ' Calendário do Advento'),
          el('button', {
            type: 'button',
            className: 'luiz-editor-tab-btn ' + (attr.utilityType === 'qr-code' ? 'is-active' : ''),
            onClick: function() { setAttr({ utilityType: 'qr-code' }); }
          }, el('i', { className: 'fa-solid fa-qrcode' }), ' QR Code Dinâmico'),
          el('button', {
            type: 'button',
            className: 'luiz-editor-tab-btn ' + (attr.utilityType === 'ar-trigger' ? 'is-active' : ''),
            onClick: function() { setAttr({ utilityType: 'ar-trigger' }); }
          }, el('i', { className: 'fa-solid fa-cube' }), ' Pistas AR')
        ),

        // Render Active Mode
        attr.utilityType === 'qr-code' && el('div', { className: 'luiz-qr-wrapper' },
          el('div', { className: 'luiz-util-header' },
            el('span', { className: 'luiz-badge-pill' }, el('i', { className: 'fa-solid fa-qrcode' }), ' Gerador de QR Code'),
            el('h3', { className: 'luiz-util-title' }, 'Gerador de QR Code Dinâmico'),
            el('p', { className: 'luiz-util-subtitle' }, 'Pré-visualização em tempo real conforme URL e cores definidas')
          ),
          el('div', {
            className: 'luiz-qr-display-box',
            dangerouslySetInnerHTML: { __html: getQrSvg(attr.qrText, attr.qrColor, attr.qrBgColor, attr.qrSize) }
          }),
          el('div', { className: 'luiz-qr-text-preview' }, attr.qrText),
          el('div', { className: 'luiz-qr-actions' },
            el('button', { type: 'button', className: 'luiz-btn luiz-btn-primary' }, el('i', { className: 'fa-solid fa-download' }), ' Baixar PNG'),
            el('button', { type: 'button', className: 'luiz-btn luiz-btn-outline' }, el('i', { className: 'fa-solid fa-file-code' }), ' Baixar SVG'),
            el('button', { type: 'button', className: 'luiz-btn luiz-btn-outline' }, el('i', { className: 'fa-solid fa-copy' }), ' Copiar Link')
          )
        ),

        attr.utilityType === 'advent-calendar' && el('div', { className: 'luiz-advent-grid-wrapper' },
          el('div', { className: 'luiz-util-header' },
            el('span', { className: 'luiz-badge-pill' }, el('i', { className: 'fa-solid fa-calendar-star' }), ' Calendário do Advento'),
            el('h2', { className: 'luiz-util-title' }, attr.calendarTitle || 'Calendário do Advento Interativo'),
            el('p', { className: 'luiz-util-subtitle' }, attr.calendarSubtitle || 'Abra as caixas a cada dia de dezembro para revelar as surpresas!')
          ),
          el('div', { className: 'row g-3' },
            (attr.calendarDoors || []).map(function(door) {
              var unlocked = testDate >= door.unlockDate;
              return el('div', { key: door.dayNumber, className: 'col-6 col-md-4 col-lg-3 luiz-door-item' },
                el('div', { className: 'luiz-door-card' },
                  el('div', { className: 'luiz-door-face luiz-door-front' },
                    el('div', { className: 'luiz-door-number' }, door.dayNumber),
                    el('div', { className: 'luiz-door-icon' }, el('i', { className: 'fa-solid ' + (door.icon || 'fa-gift') })),
                    el('span', { className: 'luiz-door-status-badge ' + (unlocked ? 'status-unlocked' : 'status-locked') },
                      el('i', { className: 'fa-solid ' + (unlocked ? 'fa-lock-open' : 'fa-lock') }),
                      unlocked ? ' Desbloqueado' : ' Trancado'
                    )
                  )
                )
              );
            })
          )
        ),

        attr.utilityType === 'ar-trigger' && el('div', { className: 'luiz-ar-wrapper' },
          el('div', { className: 'luiz-util-header' },
            el('span', { className: 'luiz-badge-pill' }, el('i', { className: 'fa-solid fa-vr-cardboard' }), ' Pistas de Realidade Aumentada'),
            el('h2', { className: 'luiz-util-title' }, attr.arClueTitle || 'Pistas & Desafio AR'),
            el('p', { className: 'luiz-util-subtitle' }, attr.arInstructions)
          ),
          el('div', { className: 'luiz-ar-card' },
            el('div', { className: 'luiz-ar-grid' },
              el('div', { className: 'luiz-ar-marker-frame' },
                el('svg', { width: 180, height: 180, viewBox: '0 0 100 100' },
                  el('rect', { width: 100, height: 100, fill: '#000000' }),
                  el('rect', { x: 15, y: 15, width: 70, height: 70, fill: '#ffffff' }),
                  el('text', { x: 50, y: 58, fontFamily: 'monospace', fontSize: 22, fontWeight: 'bold', fill: '#000000', textAnchor: 'middle' }, 'HIRO')
                ),
                el('div', { className: 'luiz-ar-marker-badge' }, 'Marcador Padrão HIRO')
              ),
              el('div', { className: 'luiz-ar-content-box' },
                el('div', { className: 'luiz-clue-box' },
                  el('h4', {}, el('i', { className: 'fa-solid fa-magnifying-glass' }), ' Enigma da Pista'),
                  el('p', {}, 'Aponte a lente para o marcador acima para revelar o objeto oculto no espaço tridimensional.')
                ),
                el('div', { className: 'luiz-hint-container' },
                  el('button', { type: 'button', className: 'luiz-btn luiz-btn-outline' }, el('i', { className: 'fa-solid fa-lightbulb' }), ' Revelar Dica'),
                  el('div', { className: 'luiz-hint-text is-visible' }, attr.arClueHint)
                ),
                el('div', { className: 'd-flex gap-2 mt-2' },
                  el('button', { type: 'button', className: 'luiz-btn luiz-btn-primary' }, el('i', { className: 'fa-solid fa-camera' }), ' Testar Câmera AR')
                )
              )
            )
          )
        )
      );
    },

    save: function(props) {
      var attr = props.attributes;
      var blockProps = useBlockProps.save({
        className: 'periodic-interactive-container',
        'data-luiz-interactive': 'true',
        'data-utility-type': attr.utilityType || 'advent-calendar',
        'data-qr-text': attr.qrText || 'https://github.com/periodic',
        'data-qr-color': attr.qrColor || '#0d6efd',
        'data-qr-bg-color': attr.qrBgColor || '#ffffff',
        'data-qr-size': attr.qrSize || 240,
        'data-calendar-doors': JSON.stringify(attr.calendarDoors || []),
        'data-ar-marker-type': attr.arMarkerType || 'hiro',
        'data-ar-clue-title': attr.arClueTitle || '',
        'data-ar-clue-hint': attr.arClueHint || ''
      });

      if (attr.utilityType === 'qr-code') {
        return el('div', blockProps,
          el('div', { className: 'luiz-qr-wrapper' },
            el('div', { className: 'luiz-util-header' },
              el('span', { className: 'luiz-badge-pill' }, el('i', { className: 'fa-solid fa-qrcode' }), ' QR Code Dinâmico'),
              el('h3', { className: 'luiz-util-title' }, 'Gerador de QR Code'),
              el('p', { className: 'luiz-util-subtitle' }, 'Digitalize para acessar o link ou baixe a imagem')
            ),
            el('div', { className: 'luiz-qr-display-box' },
              el('div', { className: 'luiz-qr-placeholder', style: { minWidth: (attr.qrSize || 240) + 'px', minHeight: (attr.qrSize || 240) + 'px' } },
                el('i', { className: 'fa-solid fa-spinner fa-spin fa-2x' })
              )
            ),
            el('div', { className: 'luiz-qr-text-preview' },
              el('span', { className: 'luiz-qr-text-value' }, attr.qrText)
            ),
            el('div', { className: 'luiz-qr-actions' },
              el('button', { type: 'button', className: 'luiz-btn luiz-btn-primary luiz-btn-dl-png' }, el('i', { className: 'fa-solid fa-download' }), ' Baixar PNG'),
              el('button', { type: 'button', className: 'luiz-btn luiz-btn-outline luiz-btn-dl-svg' }, el('i', { className: 'fa-solid fa-file-code' }), ' Baixar SVG'),
              el('button', { type: 'button', className: 'luiz-btn luiz-btn-outline luiz-btn-copy' }, el('i', { className: 'fa-solid fa-copy' }), ' Copiar Link')
            )
          )
        );
      }

      if (attr.utilityType === 'advent-calendar') {
        return el('div', blockProps,
          el('div', { className: 'luiz-advent-grid-wrapper' },
            el('div', { className: 'luiz-util-header' },
              el('span', { className: 'luiz-badge-pill' }, el('i', { className: 'fa-solid fa-calendar-star' }), ' Calendário do Advento'),
              el('h2', { className: 'luiz-util-title' }, attr.calendarTitle || 'Calendário do Advento Interativo'),
              el('p', { className: 'luiz-util-subtitle' }, attr.calendarSubtitle || 'Abra as caixas a cada dia de dezembro para revelar as surpresas!')
            ),
            el('div', { className: 'luiz-calendar-toolbar' },
              el('div', { className: 'luiz-test-mode-badge' },
                el('i', { className: 'fa-solid fa-calendar-check' }), ' ',
                el('span', { className: 'luiz-current-date-display' }, 'Verificando data atual...')
              ),
              el('div', { className: 'd-flex align-items-center gap-2' },
                el('label', { htmlFor: 'luiz-test-date', className: 'text-light small mb-0' }, 'Simular Data:'),
                el('input', { type: 'date', id: 'luiz-test-date', className: 'luiz-test-date-input' }),
                el('button', { type: 'button', className: 'luiz-btn luiz-btn-outline py-1 px-2 small luiz-btn-reset-doors', title: 'Reiniciar Portas' },
                  el('i', { className: 'fa-solid fa-rotate-right' })
                )
              )
            ),
            el('div', { className: 'row g-3 luiz-doors-grid' },
              (attr.calendarDoors || []).map(function(door) {
                return el('div', { key: door.dayNumber, className: 'col-6 col-md-4 col-lg-3 luiz-door-item' },
                  el('div', {
                    className: 'luiz-door-card',
                    'data-day': door.dayNumber,
                    'data-unlock-date': door.unlockDate,
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#luizModalDoor-' + door.dayNumber
                  },
                    el('div', { className: 'luiz-door-face luiz-door-front' },
                      el('div', { className: 'luiz-door-number' }, door.dayNumber),
                      el('div', { className: 'luiz-door-icon' }, el('i', { className: 'fa-solid ' + (door.icon || 'fa-gift') })),
                      el('span', { className: 'luiz-door-status-badge status-locked' },
                        el('i', { className: 'fa-solid fa-lock' }), ' Trancado'
                      )
                    ),
                    el('div', { className: 'luiz-door-face luiz-door-back' },
                      el('div', { className: 'luiz-door-back-title' }, door.title),
                      el('span', { className: 'luiz-door-back-btn' }, el('i', { className: 'fa-solid fa-eye' }), ' Revelar')
                    )
                  ),
                  el('div', {
                    className: 'modal fade periodic-modal',
                    id: 'luizModalDoor-' + door.dayNumber,
                    tabIndex: '-1',
                    'aria-labelledby': 'luizModalTitle-' + door.dayNumber,
                    'aria-hidden': 'true'
                  },
                    el('div', { className: 'modal-dialog modal-dialog-centered' },
                      el('div', { className: 'modal-content' },
                        el('div', { className: 'modal-header' },
                          el('h5', { className: 'modal-title', id: 'luizModalTitle-' + door.dayNumber },
                            el('i', { className: 'fa-solid ' + (door.icon || 'fa-gift') + ' text-warning' }), ' ', door.title
                          ),
                          el('button', { type: 'button', className: 'btn-close', 'data-bs-dismiss': 'modal', 'aria-label': 'Close' })
                        ),
                        el('div', { className: 'modal-body', dangerouslySetInnerHTML: { __html: door.contentHtml } }),
                        el('div', { className: 'modal-footer' },
                          el('span', { className: 'badge bg-secondary me-auto' }, 'Dia ' + door.dayNumber),
                          el('button', { type: 'button', className: 'btn btn-primary', 'data-bs-dismiss': 'modal' }, 'Fechar')
                        )
                      )
                    )
                  )
                );
              })
            )
          )
        );
      }

      // AR Trigger
      return el('div', blockProps,
        el('div', { className: 'luiz-ar-wrapper' },
          el('div', { className: 'luiz-util-header' },
            el('span', { className: 'luiz-badge-pill' }, el('i', { className: 'fa-solid fa-vr-cardboard' }), ' Realidade Aumentada'),
            el('h2', { className: 'luiz-util-title' }, attr.arClueTitle || 'Pistas & Desafio AR'),
            el('p', { className: 'luiz-util-subtitle' }, attr.arInstructions || 'Aponte sua câmera para o marcador impresso ou na tela para revelar a chave secreta.')
          ),
          el('div', { className: 'luiz-ar-card' },
            el('div', { className: 'luiz-ar-grid' },
              el('div', { className: 'luiz-ar-marker-frame' },
                el('svg', { width: 200, height: 200, viewBox: '0 0 100 100' },
                  el('rect', { width: 100, height: 100, fill: '#000000' }),
                  el('rect', { x: 15, y: 15, width: 70, height: 70, fill: '#ffffff' }),
                  el('text', { x: 50, y: 58, fontFamily: 'monospace', fontSize: 22, fontWeight: 'bold', fill: '#000000', textAnchor: 'middle' }, 'HIRO')
                ),
                el('div', { className: 'luiz-ar-marker-badge' }, 'Marcador Padrão HIRO')
              ),
              el('div', { className: 'luiz-ar-content-box' },
                el('div', { className: 'luiz-clue-box' },
                  el('h4', {}, el('i', { className: 'fa-solid fa-magnifying-glass' }), ' Enigma da Pista'),
                  el('p', {}, 'Aponte a câmera para o marcador de rastreamento para projetar a chave do desafio em 3D.')
                ),
                el('div', { className: 'luiz-hint-container' },
                  el('button', { type: 'button', className: 'luiz-btn luiz-btn-outline luiz-btn-toggle-hint' },
                    el('i', { className: 'fa-solid fa-lightbulb' }), ' ',
                    el('span', { className: 'luiz-hint-btn-text' }, 'Revelar Dica')
                  ),
                  el('div', { className: 'luiz-hint-text' }, attr.arClueHint)
                ),
                el('div', { className: 'd-flex gap-2 mt-2' },
                  el('button', { type: 'button', className: 'luiz-btn luiz-btn-primary luiz-btn-ar-scan' }, el('i', { className: 'fa-solid fa-camera' }), ' Abrir Câmera AR'),
                  el('button', { type: 'button', className: 'luiz-btn luiz-btn-outline luiz-btn-print-marker' }, el('i', { className: 'fa-solid fa-print' }), ' Imprimir Marcador')
                )
              )
            )
          )
        )
      );
    }
  });
})(window.wp);
