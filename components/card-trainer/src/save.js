/**
 * WordPress dependencies
 */
import { createElement } from '@wordpress/element';

export default function save({ attributes }) {
  const {
    gameMode = 'flashcard',
    cards = [],
    columns = 3,
    showTimer = true,
    showMoves = true,
    cardHeight = 280,
    language = 'pt-br',
  } = attributes;

  // Bootstrap 5 grid columns mapping: row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-[columns]
  const gridColsClass = `row row-cols-1 row-cols-sm-2 row-cols-md-${Math.min(columns, 3)} row-cols-lg-${columns} g-3 cards-grid`;

  return (
    <div
      className="wp-block-periodic-card-trainer periodic-card-trainer"
      data-game-mode={gameMode}
      data-columns={columns}
      data-show-timer={showTimer ? '1' : '0'}
      data-show-moves={showMoves ? '1' : '0'}
      data-card-height={cardHeight}
      data-language={language}
      data-cards={JSON.stringify(cards)}
    >
      {/* Game Header Bar */}
      <div className="trainer-header">
        <h3 className="header-title">
          <span>🃏</span>
          <span className="title-text">
            {gameMode === 'flashcard' && 'Flashcard Trainer'}
            {gameMode === 'dialog-card' && 'Dialog Cards'}
            {gameMode === 'memory-grid' && 'Jogo da Memória'}
          </span>
        </h3>
        <div className="header-stats">
          {showTimer && (
            <div className="stat-badge stat-timer" title="Tempo Decorrido">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="timer-display">00:00</span>
            </div>
          )}
          {showMoves && (
            <div className="stat-badge stat-moves" title="Contador de Movimentos">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span className="moves-display">0</span>
            </div>
          )}
          {gameMode === 'memory-grid' && (
            <div className="stat-badge stat-pairs" title="Pares Encontrados">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="pairs-display">0 / {cards.length}</span>
            </div>
          )}
          <button type="button" className="btn-trainer-reset" aria-label="Reiniciar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span className="reset-label">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Main Dynamic Stage Container */}
      <div className="trainer-stage-container">
        {/* Memory Grid Mode & Default Grid Fallback */}
        <div className={gridColsClass}>
          {cards.map((card, index) => (
            <div key={card.id || index} className="col card-col-wrap">
              <div
                className="card-3d-wrap"
                data-card-id={card.id || `card-${index}`}
                data-card-index={index}
                style={{ minHeight: `${cardHeight}px` }}
              >
                <div className="card-flipper" style={{ minHeight: `${cardHeight}px` }}>
                  {/* Front Face */}
                  <div className="card-face card-front">
                    {card.frontImage && (
                      <div className="card-media">
                        <img src={card.frontImage} alt={card.frontText || 'Card'} loading="lazy" />
                      </div>
                    )}
                    <div className="card-content">
                      <div>
                        <span className="card-badge badge-front">Frente</span>
                        <h4 className="card-text-title">{card.frontText}</h4>
                      </div>
                      <div className="card-footer-meta">
                        {card.tip && (
                          <div className="card-tip-box" data-tip={card.tip}>
                            💡 <strong>Dica:</strong> {card.tip}
                          </div>
                        )}
                        <div className="card-action-bar">
                          {card.tip && (
                            <button type="button" className="btn-card-action btn-toggle-tip" aria-label="Ver Dica">
                              💡 <span>Dica</span>
                            </button>
                          )}
                          {card.audioUrl && (
                            <button
                              type="button"
                              className="btn-card-action btn-play-audio"
                              data-audio-src={card.audioUrl}
                              aria-label="Ouvir Pronúncia"
                            >
                              🔊 <span>Ouvir</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="card-face card-back">
                    <div className="card-content">
                      <div>
                        <span className="card-badge badge-back">Verso</span>
                        <h4 className="card-text-title">{card.backText}</h4>
                      </div>
                      {card.audioUrl && (
                        <div className="card-action-bar">
                          <button
                            type="button"
                            className="btn-card-action btn-play-audio"
                            data-audio-src={card.audioUrl}
                            aria-label="Ouvir Pronúncia"
                          >
                            🔊 <span>Ouvir</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Matched checkmark icon */}
                  <div className="match-checkmark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Victory Celebration Modal Overlay */}
      <div className="victory-overlay" role="dialog" aria-modal="true" aria-hidden="true">
        <div className="victory-card">
          <div className="trophy-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34c3.08-.63 5.4-3.1 5.4-6.16V4H6v4.5c0 3.06 2.32 5.53 5.4 6.16z" />
            </svg>
          </div>
          <h3 className="victory-title">Parabéns! Você Venceu!</h3>
          <p className="victory-msg">Você completou o jogo com maestria!</p>
          <button type="button" className="btn-play-again">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Jogar Novamente</span>
          </button>
        </div>
      </div>
    </div>
  );
}
