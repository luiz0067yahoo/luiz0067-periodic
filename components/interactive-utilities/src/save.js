import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    utilityType,
    qrText,
    qrColor,
    qrBgColor,
    qrSize,
    calendarTitle,
    calendarSubtitle,
    calendarDoors,
    arMarkerType,
    arClueTitle,
    arClueHint,
    arInstructions
  } = attributes;

  const blockProps = useBlockProps.save({
    className: 'periodic-interactive-container',
    'data-luiz-interactive': 'true',
    'data-utility-type': utilityType || 'advent-calendar',
    'data-qr-text': qrText || 'https://github.com/periodic',
    'data-qr-color': qrColor || '#0d6efd',
    'data-qr-bg-color': qrBgColor || '#ffffff',
    'data-qr-size': qrSize || 240,
    'data-calendar-doors': JSON.stringify(calendarDoors || []),
    'data-ar-marker-type': arMarkerType || 'hiro',
    'data-ar-clue-title': arClueTitle || '',
    'data-ar-clue-hint': arClueHint || ''
  });

  return (
    <div {...blockProps}>
      {/* ==================== 1. QR CODE GENERATOR ==================== */}
      {utilityType === 'qr-code' && (
        <div className="luiz-qr-wrapper">
          <div className="luiz-util-header">
            <span className="luiz-badge-pill">
              <i className="fa-solid fa-qrcode"></i> QR Code Dinâmico
            </span>
            <h3 className="luiz-util-title">Gerador de QR Code</h3>
            <p className="luiz-util-subtitle">Digitalize para acessar o link ou baixe a imagem</p>
          </div>

          <div className="luiz-qr-display-box" id="luiz-qr-render-target">
            {/* Will be rendered dynamically via view.js and qrcode.min.js */}
            <div className="luiz-qr-placeholder" style={{ minWidth: `${qrSize || 240}px`, minHeight: `${qrSize || 240}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
            </div>
          </div>

          <div className="luiz-qr-text-preview">
            <span className="luiz-qr-text-value">{qrText}</span>
          </div>

          <div className="luiz-qr-actions">
            <button type="button" className="luiz-btn luiz-btn-primary luiz-btn-dl-png">
              <i className="fa-solid fa-download"></i> Baixar PNG
            </button>
            <button type="button" className="luiz-btn luiz-btn-outline luiz-btn-dl-svg">
              <i className="fa-solid fa-file-code"></i> Baixar SVG
            </button>
            <button type="button" className="luiz-btn luiz-btn-outline luiz-btn-copy">
              <i className="fa-solid fa-copy"></i> Copiar Link
            </button>
          </div>
        </div>
      )}

      {/* ==================== 2. ADVENT CALENDAR (24 DOORS) ==================== */}
      {utilityType === 'advent-calendar' && (
        <div className="luiz-advent-grid-wrapper">
          <div className="luiz-util-header">
            <span className="luiz-badge-pill">
              <i className="fa-solid fa-calendar-star"></i> Calendário do Advento
            </span>
            <h2 className="luiz-util-title">{calendarTitle || 'Calendário do Advento Interativo'}</h2>
            <p className="luiz-util-subtitle">{calendarSubtitle || 'Abra as caixas a cada dia de dezembro para revelar as surpresas!'}</p>
          </div>

          {/* Interactive Date Simulator Toolbar */}
          <div className="luiz-calendar-toolbar">
            <div className="luiz-test-mode-badge">
              <i className="fa-solid fa-calendar-check"></i> <span className="luiz-current-date-display">Verificando data atual...</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="luiz-test-date" className="text-light small mb-0">Simular Data:</label>
              <input type="date" id="luiz-test-date" className="luiz-test-date-input" />
              <button type="button" className="luiz-btn luiz-btn-outline py-1 px-2 small luiz-btn-reset-doors" title="Reiniciar Portas">
                <i className="fa-solid fa-rotate-right"></i>
              </button>
            </div>
          </div>

          {/* Bootstrap Grid of 24 Doors */}
          <div className="row g-3 luiz-doors-grid">
            {(calendarDoors || []).map((door) => (
              <div key={door.dayNumber} className="col-6 col-md-4 col-lg-3 luiz-door-item">
                <div
                  className="luiz-door-card"
                  data-day={door.dayNumber}
                  data-unlock-date={door.unlockDate}
                  data-bs-toggle="modal"
                  data-bs-target={`#luizModalDoor-${door.dayNumber}`}
                >
                  {/* Front Door Face */}
                  <div className="luiz-door-face luiz-door-front">
                    <div className="luiz-door-number">{door.dayNumber}</div>
                    <div className="luiz-door-icon">
                      <i className={`fa-solid ${door.icon || 'fa-gift'}`}></i>
                    </div>
                    <span className="luiz-door-status-badge status-locked">
                      <i className="fa-solid fa-lock"></i> Trancado
                    </span>
                  </div>

                  {/* Back Reveal Face */}
                  <div className="luiz-door-face luiz-door-back">
                    <div className="luiz-door-back-title">{door.title}</div>
                    <span className="luiz-door-back-btn">
                      <i className="fa-solid fa-eye"></i> Revelar
                    </span>
                  </div>
                </div>

                {/* Bootstrap 5 Modal for Door Content */}
                <div
                  className="modal fade periodic-modal"
                  id={`luizModalDoor-${door.dayNumber}`}
                  tabIndex="-1"
                  aria-labelledby={`luizModalTitle-${door.dayNumber}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`luizModalTitle-${door.dayNumber}`}>
                          <i className={`fa-solid ${door.icon || 'fa-gift'} text-warning`}></i> {door.title}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div dangerouslySetInnerHTML={{ __html: door.contentHtml }} />
                      </div>
                      <div className="modal-footer">
                        <span className="badge bg-secondary me-auto">Dia {door.dayNumber}</span>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 3. AR TRIGGER CLUES ==================== */}
      {utilityType === 'ar-trigger' && (
        <div className="luiz-ar-wrapper">
          <div className="luiz-util-header">
            <span className="luiz-badge-pill">
              <i className="fa-solid fa-vr-cardboard"></i> Realidade Aumentada
            </span>
            <h2 className="luiz-util-title">{arClueTitle || 'Pistas & Desafio AR'}</h2>
            <p className="luiz-util-subtitle">{arInstructions || 'Aponte sua câmera para o marcador impresso ou na tela para revelar a chave secreta.'}</p>
          </div>

          <div className="luiz-ar-card">
            <div className="luiz-ar-grid">
              <div className="luiz-ar-marker-frame">
                <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="#000000" />
                  <rect x="15" y="15" width="70" height="70" fill="#ffffff" />
                  <text x="50" y="58" fontFamily="monospace" fontSize="22" fontWeight="bold" fill="#000000" textAnchor="middle">
                    HIRO
                  </text>
                </svg>
                <div className="luiz-ar-marker-badge">Marcador Padrão HIRO</div>
              </div>

              <div className="luiz-ar-content-box">
                <div className="luiz-clue-box">
                  <h4><i className="fa-solid fa-magnifying-glass"></i> Enigma da Pista</h4>
                  <p>Aponte a câmera para o marcador de rastreamento para projetar a chave do desafio em 3D.</p>
                </div>

                <div className="luiz-hint-container">
                  <button type="button" className="luiz-btn luiz-btn-outline luiz-btn-toggle-hint">
                    <i className="fa-solid fa-lightbulb"></i> <span className="luiz-hint-btn-text">Revelar Dica</span>
                  </button>
                  <div className="luiz-hint-text">
                    {arClueHint || 'Observe atentamente os cantos do marcador e conte os ângulos para achar a chave.'}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-2">
                  <button type="button" className="luiz-btn luiz-btn-primary luiz-btn-ar-scan">
                    <i className="fa-solid fa-camera"></i> Abrir Câmera AR
                  </button>
                  <button type="button" className="luiz-btn luiz-btn-outline luiz-btn-print-marker">
                    <i className="fa-solid fa-print"></i> Imprimir Marcador
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
