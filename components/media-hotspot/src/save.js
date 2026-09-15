import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    mediaType = 'image-hotspots',
    mainImage = '',
    layers = [],
    hotspots = [],
    showQuizEvaluation = false,
    sliderValue = 50,
    panoramaAutoRotate = true,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `periodic-media-hotspot mode-${mediaType}`,
    'data-media-type': mediaType,
    'data-quiz-eval': showQuizEvaluation ? 'true' : 'false',
  });

  return (
    <div {...blockProps}>
      {/* Quiz Evaluation Status Bar */}
      {mediaType === 'image-hotspots' && showQuizEvaluation && (
        <div className="periodic-quiz-bar">
          <div className="periodic-quiz-title">
            <i className="fa-solid fa-bullseye"></i>
            <span>Modo Avaliativo / Quiz</span>
          </div>
          <div className="periodic-quiz-score">
            <i className="fa-solid fa-trophy"></i>
            <span className="periodic-score-count">0</span> /{' '}
            <span className="periodic-total-correct">
              {hotspots.filter((h) => h.isCorrectTarget).length || hotspots.length}
            </span>
          </div>
          <button type="button" className="periodic-quiz-reset-btn" title="Reiniciar">
            <i className="fa-solid fa-rotate-left"></i> Reiniciar
          </button>
        </div>
      )}

      {/* Mode 1: Image Hotspots */}
      {mediaType === 'image-hotspots' && (
        <div className="periodic-media-viewport">
          {mainImage ? (
            <img src={mainImage} alt="" className="periodic-base-img" />
          ) : (
            <div className="periodic-placeholder">Selecione uma imagem no editor</div>
          )}

          {/* Hotspots clickable pins */}
          {hotspots.map((spot, idx) => {
            const spotId = spot.id || `spot-${idx}`;
            const pinColor = spot.color || '#0d6efd';
            const pinIcon = spot.icon || 'fa-solid fa-location-dot';

            return (
              <button
                key={spotId}
                type="button"
                className="periodic-hotspot-pin"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  backgroundColor: pinColor,
                }}
                data-bs-toggle="modal"
                data-bs-target={`#periodic-modal-${spotId}`}
                data-spot-id={spotId}
                data-is-correct={spot.isCorrectTarget ? 'true' : 'false'}
                aria-label={spot.title || `Ponto ${idx + 1}`}
              >
                <i className={pinIcon}></i>
                <span className="periodic-pulse-ring" style={{ borderColor: pinColor }}></span>
                {spot.title && <span className="periodic-pin-tooltip">{spot.title}</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Bootstrap 5 Native Modals for each hotspot */}
      {mediaType === 'image-hotspots' &&
        hotspots.map((spot, idx) => {
          const spotId = spot.id || `spot-${idx}`;
          return (
            <div
              key={`modal-${spotId}`}
              className="modal fade periodic-modal"
              id={`periodic-modal-${spotId}`}
              tabIndex={-1}
              aria-labelledby={`periodic-modal-title-${spotId}`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id={`periodic-modal-title-${spotId}`}>
                      <i className={spot.icon || 'fa-solid fa-circle-info'}></i>
                      <span>{spot.title || `Ponto ${idx + 1}`}</span>
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {spot.description ? (
                      <p className="periodic-modal-desc">{spot.description}</p>
                    ) : null}

                    {showQuizEvaluation && (
                      <div
                        className={`periodic-quiz-feedback alert ${
                          spot.isCorrectTarget ? 'alert-success' : 'alert-danger'
                        } d-flex align-items-center gap-2 mt-3`}
                      >
                        <i
                          className={`fa-solid ${
                            spot.isCorrectTarget
                              ? 'fa-circle-check text-success'
                              : 'fa-circle-xmark text-danger'
                          } fa-lg`}
                        ></i>
                        <div>
                          <strong>
                            {spot.isCorrectTarget ? 'Correto!' : 'Incorreto!'}
                          </strong>{' '}
                          {spot.feedback ||
                            (spot.isCorrectTarget
                              ? 'Você acertou o alvo pretendido.'
                              : 'Este não é o ponto solicitado. Tente novamente!')}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {/* Mode 2: Agamotto Layer Slider */}
      {mediaType === 'image-slider-layers' && (
        <div className="periodic-layers-container">
          <div className="periodic-layer-frame">
            {mainImage && <img src={mainImage} alt="" className="periodic-base-layer" />}
            {layers.map((layer, lIdx) => (
              <div
                key={lIdx}
                className="periodic-overlay-layer"
                data-layer-index={lIdx}
                style={{ opacity: lIdx === 0 ? 1 : 0 }}
              >
                <img src={layer.url || layer} alt={layer.title || `Camada ${lIdx + 1}`} />
              </div>
            ))}
          </div>

          <div className="periodic-slider-panel">
            <div className="periodic-slider-header">
              <span>Controle de Camadas</span>
              <span className="periodic-current-layer-label">
                {layers[0]?.title || 'Camada 1'}
              </span>
            </div>
            <div className="periodic-range-track-wrapper">
              <input
                type="range"
                className="periodic-agamotto-slider"
                min="0"
                max={Math.max(1, (layers.length || 1) - 1) * 100}
                defaultValue="0"
                data-layers-count={layers.length}
                aria-label="Controle de Camadas"
              />
            </div>
            <div className="periodic-layer-ticks">
              {layers.map((layer, idx) => (
                <span key={idx} className="periodic-layer-tick-label">
                  {layer.title || `${idx + 1}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Panorama 360 */}
      {mediaType === 'panorama-360' && (
        <div
          className="periodic-panorama-viewport"
          data-panorama-src={mainImage}
          data-auto-rotate={panoramaAutoRotate ? 'true' : 'false'}
        >
          <div className="periodic-panorama-hint">
            <i className="fa-solid fa-arrows-up-down-left-right"></i>
            <span>Arraste para girar a visualização em 360°</span>
          </div>
          <div className="periodic-panorama-controls">
            <button
              type="button"
              className="periodic-pano-autorotate-btn"
              title="Girar automaticamente"
            >
              <i className="fa-solid fa-rotate"></i>
            </button>
            <button type="button" className="periodic-pano-reset-btn" title="Centralizar">
              <i className="fa-solid fa-compass"></i>
            </button>
          </div>
          <canvas className="periodic-panorama-canvas"></canvas>
        </div>
      )}
    </div>
  );
}
