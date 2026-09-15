import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    title,
    description,
    dragMode,
    items,
    targets,
    backgroundImage,
    allowRetry,
    successMessage,
    errorMessage
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `periodic-dnd-container mode-${dragMode}`,
    'data-drag-mode': dragMode,
    'data-config': JSON.stringify({
      dragMode,
      items,
      targets,
      allowRetry,
      successMessage,
      errorMessage
    })
  });

  return (
    <div {...blockProps}>
      {/* Header */}
      <div className="periodic-dnd-header">
        {title && <h3 className="periodic-dnd-title">{title}</h3>}
        {description && <p className="periodic-dnd-desc">{description}</p>}
      </div>

      {/* Modo: Text Tokens */}
      {dragMode === 'text-tokens' && (
        <>
          {/* Pool de itens arrastáveis disponíveis */}
          <div className="periodic-source-pool" data-source-pool="true">
            <span className="pool-label">Itens Disponíveis:</span>
            {items.map((item) => (
              <span
                key={item.id}
                className="badge bg-primary fs-6 p-2 periodic-draggable-item"
                data-item-id={item.id}
                data-target-id={item.targetId || ''}
                draggable="true"
                tabIndex={0}
                role="button"
                aria-grabbed="false"
              >
                <span className="dnd-drag-icon">⠿</span>
                <span className="item-text">{item.text}</span>
              </span>
            ))}
          </div>

          {/* Áreas de Dropzone */}
          <div className="periodic-tokens-layout">
            <div className="periodic-targets-list">
              {targets.map((tgt) => (
                <div key={tgt.id} className="periodic-dropzone-box">
                  <div className="dropzone-header">
                    <span>🎯 {tgt.label}</span>
                  </div>
                  <div
                    className="periodic-dropzone-target"
                    data-target-id={tgt.id}
                    data-accepts="single"
                  >
                    <span className="dropzone-placeholder">Solte o item correspondente aqui...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modo: Reorder Paragraphs */}
      {dragMode === 'reorder-paragraphs' && (
        <div className="periodic-reorder-layout">
          <div className="periodic-reorder-list" data-reorder-container="true">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="periodic-reorder-card"
                data-item-id={item.id}
                data-correct-order={item.correctOrder || index + 1}
                draggable="true"
                tabIndex={0}
                role="listitem"
              >
                <span className="reorder-handle">⠿</span>
                <span className="reorder-index">{index + 1}</span>
                <span className="reorder-content">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modo: Image Targets */}
      {dragMode === 'image-targets' && (
        <>
          {/* Pool de itens arrastáveis */}
          <div className="periodic-source-pool" data-source-pool="true">
            <span className="pool-label">Rótulos para Alocar:</span>
            {items.map((item) => (
              <span
                key={item.id}
                className="badge bg-primary fs-6 p-2 periodic-draggable-item"
                data-item-id={item.id}
                data-target-id={item.targetId || ''}
                draggable="true"
                tabIndex={0}
                role="button"
                aria-grabbed="false"
              >
                <span className="dnd-drag-icon">⠿</span>
                <span className="item-text">{item.text}</span>
              </span>
            ))}
          </div>

          <div className="periodic-image-layout">
            <div
              className={`periodic-image-canvas ${!backgroundImage ? 'placeholder-canvas' : ''}`}
              style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
              }}
            >
              {targets.map((tgt, idx) => (
                <div
                  key={tgt.id}
                  className="periodic-image-target-spot"
                  style={{ left: `${tgt.x || 50}%`, top: `${tgt.y || 50}%` }}
                >
                  <div className="target-pin">{idx + 1}</div>
                  <div
                    className="periodic-dropzone-target"
                    data-target-id={tgt.id}
                    data-accepts="single"
                  >
                    <span className="dropzone-placeholder">{tgt.label || `Alvo #${idx + 1}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Footer com botões e alertas de validação */}
      <div className="periodic-dnd-footer">
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" className="btn btn-primary periodic-check-btn">
            <span>✓</span> Verificar Respostas
          </button>
          {allowRetry && (
            <button
              type="button"
              className="btn btn-outline-secondary periodic-reset-btn"
              style={{ display: 'none' }}
            >
              <span>↺</span> Tentar Novamente
            </button>
          )}
        </div>

        <div className="periodic-feedback-alert" role="alert" aria-live="polite">
          <span className="feedback-icon"></span>
          <span className="feedback-text"></span>
        </div>
      </div>
    </div>
  );
}
