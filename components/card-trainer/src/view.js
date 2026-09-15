/**
 * Periodic Card Trainer - Frontend Controller
 * Flashcard, Dialog Cards, and Memory Grid Engine
 */

import { __t } from './i18n';

(function () {
  'use strict';

  // Web Audio API Synthesizer
  class SoundFX {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type = 'sine', duration = 0.15, startTime = 0) {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    }

    playFlip() {
      this.playTone(480, 'triangle', 0.08);
    }

    playMatch() {
      this.playTone(523.25, 'sine', 0.12, 0);       // C5
      this.playTone(659.25, 'sine', 0.12, 0.08);    // E5
      this.playTone(783.99, 'sine', 0.25, 0.16);    // G5
    }

    playError() {
      this.playTone(220, 'sawtooth', 0.12, 0);
      this.playTone(180, 'sawtooth', 0.2, 0.1);
    }

    playVictory() {
      const now = 0;
      this.playTone(523.25, 'triangle', 0.15, now);
      this.playTone(659.25, 'triangle', 0.15, now + 0.12);
      this.playTone(783.99, 'triangle', 0.15, now + 0.24);
      this.playTone(1046.5, 'sine', 0.45, now + 0.36);
    }
  }

  const sfx = new SoundFX();

  // Audio URL Player with visual feedback
  function playAudioUrl(url, buttonEl) {
    if (!url) return;
    const audio = new Audio(url);
    if (buttonEl) {
      buttonEl.classList.add('playing');
      audio.onended = () => buttonEl.classList.remove('playing');
      audio.onerror = () => buttonEl.classList.remove('playing');
    }
    audio.play().catch(() => {
      if (buttonEl) buttonEl.classList.remove('playing');
    });
  }

  // Card Trainer Instance
  class CardTrainer {
    constructor(rootEl) {
      this.root = rootEl;
      this.mode = rootEl.getAttribute('data-game-mode') || 'flashcard';
      this.columns = parseInt(rootEl.getAttribute('data-columns') || '3', 10);
      this.cardHeight = parseInt(rootEl.getAttribute('data-card-height') || '280', 10);
      this.lang = rootEl.getAttribute('data-language') || 'pt-br';

      try {
        this.cards = JSON.parse(rootEl.getAttribute('data-cards') || '[]');
      } catch (e) {
        this.cards = [];
      }

      this.timerEl = rootEl.querySelector('.timer-display');
      this.movesEl = rootEl.querySelector('.moves-display');
      this.pairsEl = rootEl.querySelector('.pairs-display');
      this.resetBtn = rootEl.querySelector('.btn-trainer-reset');
      this.victoryOverlay = rootEl.querySelector('.victory-overlay');
      this.playAgainBtn = rootEl.querySelector('.btn-play-again');
      this.stageContainer = rootEl.querySelector('.trainer-stage-container');

      this.timerInterval = null;
      this.secondsElapsed = 0;
      this.movesCount = 0;
      this.isTimerRunning = false;

      this.init();
    }

    t(key, params) {
      return __t(key, this.lang, params);
    }

    formatTime(sec) {
      const m = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    startTimer() {
      if (this.isTimerRunning) return;
      this.isTimerRunning = true;
      this.timerInterval = setInterval(() => {
        this.secondsElapsed++;
        if (this.timerEl) {
          this.timerEl.textContent = this.formatTime(this.secondsElapsed);
        }
      }, 1000);
    }

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.isTimerRunning = false;
    }

    resetStats() {
      this.stopTimer();
      this.secondsElapsed = 0;
      this.movesCount = 0;
      if (this.timerEl) this.timerEl.textContent = '00:00';
      if (this.movesEl) this.movesEl.textContent = '0';
      if (this.victoryOverlay) this.victoryOverlay.classList.remove('show');
    }

    incrementMoves() {
      this.movesCount++;
      if (this.movesEl) this.movesEl.textContent = this.movesCount;
    }

    init() {
      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', () => this.resetGame());
      }
      if (this.playAgainBtn) {
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
      }

      if (this.mode === 'flashcard') {
        this.initFlashcardMode();
      } else if (this.mode === 'dialog-card') {
        this.initDialogCardMode();
      } else if (this.mode === 'memory-grid') {
        this.initMemoryGridMode();
      }
    }

    resetGame() {
      this.resetStats();
      if (this.mode === 'flashcard') {
        this.initFlashcardMode();
      } else if (this.mode === 'dialog-card') {
        this.initDialogCardMode();
      } else if (this.mode === 'memory-grid') {
        this.initMemoryGridMode();
      }
    }

    /* -------------------------------------------------------------
       Mode 1: Flashcard Mode
       ------------------------------------------------------------- */
    initFlashcardMode() {
      if (!this.cards || this.cards.length === 0) return;
      let currentIndex = 0;

      const renderCard = (index) => {
        const card = this.cards[index];
        const hasNext = index < this.cards.length - 1;
        const hasPrev = index > 0;

        this.stageContainer.innerHTML = `
          <div class="mode-flashcard-deck">
            <div class="flashcard-stage">
              <div class="card-3d-wrap" id="active-flashcard" style="min-height: ${this.cardHeight}px">
                <div class="card-flipper" style="min-height: ${this.cardHeight}px">
                  <!-- Front -->
                  <div class="card-face card-front">
                    ${card.frontImage ? `
                      <div class="card-media">
                        <img src="${card.frontImage}" alt="${card.frontText || ''}" />
                      </div>
                    ` : ''}
                    <div class="card-content">
                      <div>
                        <span class="card-badge badge-front">${this.t('frontend.card')} ${index + 1} ${this.t('frontend.of')} ${this.cards.length}</span>
                        <h3 class="card-text-title">${card.frontText || ''}</h3>
                      </div>
                      <div class="card-footer-meta">
                        ${card.tip ? `
                          <div class="card-tip-box" id="flashcard-tip">
                            💡 <strong>${this.t('settings.tip')}:</strong> ${card.tip}
                          </div>
                        ` : ''}
                        <div class="card-action-bar">
                          ${card.tip ? `
                            <button type="button" class="btn-card-action" id="btn-toggle-tip">
                              💡 <span>${this.t('frontend.showTip')}</span>
                            </button>
                          ` : ''}
                          ${card.audioUrl ? `
                            <button type="button" class="btn-card-action" id="btn-play-audio" data-url="${card.audioUrl}">
                              🔊 <span>${this.t('frontend.listen')}</span>
                            </button>
                          ` : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Back -->
                  <div class="card-face card-back">
                    <div class="card-content">
                      <div>
                        <span class="card-badge badge-back">${this.t('frontend.answerIs')}</span>
                        <h3 class="card-text-title">${card.backText || ''}</h3>
                      </div>
                      ${card.audioUrl ? `
                        <div class="card-action-bar">
                          <button type="button" class="btn-card-action" id="btn-play-audio-back" data-url="${card.audioUrl}">
                            🔊 <span>${this.t('frontend.listen')}</span>
                          </button>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input verification box -->
            <div class="flashcard-input-box">
              <form id="flashcard-form">
                <div class="input-group">
                  <input type="text" id="flashcard-input" placeholder="${this.t('frontend.typeAnswer')}" autocomplete="off" />
                  <button type="submit">
                    <span>${this.t('frontend.check')}</span>
                  </button>
                </div>
                <div id="flashcard-feedback" class="flashcard-feedback"></div>
              </form>
            </div>

            <!-- Deck Navigation -->
            <div class="deck-navigation">
              <button type="button" class="btn-nav" id="btn-prev" ${!hasPrev ? 'disabled' : ''}>
                ← ${this.t('frontend.previous')}
              </button>
              <span class="deck-counter">${index + 1} / ${this.cards.length}</span>
              <button type="button" class="btn-nav" id="btn-next" ${!hasNext ? 'disabled' : ''}>
                ${this.t('frontend.next')} →
              </button>
            </div>
          </div>
        `;

        const wrap = this.stageContainer.querySelector('#active-flashcard');
        const form = this.stageContainer.querySelector('#flashcard-form');
        const input = this.stageContainer.querySelector('#flashcard-input');
        const feedback = this.stageContainer.querySelector('#flashcard-feedback');
        const tipBtn = this.stageContainer.querySelector('#btn-toggle-tip');
        const tipBox = this.stageContainer.querySelector('#flashcard-tip');
        const audioBtn = this.stageContainer.querySelector('#btn-play-audio');
        const audioBackBtn = this.stageContainer.querySelector('#btn-play-audio-back');
        const prevBtn = this.stageContainer.querySelector('#btn-prev');
        const nextBtn = this.stageContainer.querySelector('#btn-next');

        // Tip toggle
        if (tipBtn && tipBox) {
          tipBtn.addEventListener('click', () => {
            tipBox.classList.toggle('show');
            tipBtn.classList.toggle('active');
          });
        }

        // Audio buttons
        if (audioBtn) {
          audioBtn.addEventListener('click', () => playAudioUrl(audioBtn.getAttribute('data-url'), audioBtn));
        }
        if (audioBackBtn) {
          audioBackBtn.addEventListener('click', () => playAudioUrl(audioBackBtn.getAttribute('data-url'), audioBackBtn));
        }

        // Form submit check
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.startTimer();
          this.incrementMoves();

          const userAns = (input.value || '').trim().toLowerCase();
          const targetAns = (card.backText || '').trim().toLowerCase();

          if (userAns && (userAns === targetAns || targetAns.includes(userAns) || userAns.includes(targetAns))) {
            sfx.playMatch();
            wrap.classList.add('is-flipped');
            feedback.className = 'flashcard-feedback success';
            feedback.innerHTML = `✓ ${this.t('frontend.correct')}`;
          } else {
            sfx.playError();
            wrap.classList.add('shake-anim');
            setTimeout(() => wrap.classList.remove('shake-anim'), 600);
            feedback.className = 'flashcard-feedback error';
            feedback.innerHTML = `✗ ${this.t('frontend.incorrect')}`;
          }
        });

        // Flip on click directly as well
        wrap.addEventListener('click', (e) => {
          if (e.target.closest('button') || e.target.closest('input')) return;
          sfx.playFlip();
          wrap.classList.toggle('is-flipped');
        });

        // Navigation
        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              renderCard(currentIndex);
            }
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            if (currentIndex < this.cards.length - 1) {
              currentIndex++;
              renderCard(currentIndex);
            }
          });
        }
      };

      renderCard(currentIndex);
    }

    /* -------------------------------------------------------------
       Mode 2: Dialog Cards Mode
       ------------------------------------------------------------- */
    initDialogCardMode() {
      if (!this.cards || this.cards.length === 0) return;
      let currentIndex = 0;

      const renderDialogCard = (index) => {
        const card = this.cards[index];
        const hasNext = index < this.cards.length - 1;
        const hasPrev = index > 0;

        this.stageContainer.innerHTML = `
          <div class="mode-dialog-deck">
            <div class="dialog-stage">
              <div class="card-3d-wrap" id="active-dialog-card" style="min-height: ${this.cardHeight}px">
                <div class="card-flipper" style="min-height: ${this.cardHeight}px">
                  <!-- Front -->
                  <div class="card-face card-front">
                    ${card.frontImage ? `
                      <div class="card-media">
                        <img src="${card.frontImage}" alt="${card.frontText || ''}" />
                      </div>
                    ` : ''}
                    <div class="card-content">
                      <div>
                        <span class="card-badge badge-front">${this.t('frontend.card')} ${index + 1} ${this.t('frontend.of')} ${this.cards.length}</span>
                        <h3 class="card-text-title">${card.frontText || ''}</h3>
                      </div>
                      <div class="card-footer-meta">
                        ${card.tip ? `
                          <div class="card-tip-box" id="dialog-tip">
                            💡 <strong>${this.t('settings.tip')}:</strong> ${card.tip}
                          </div>
                        ` : ''}
                        <div class="card-action-bar">
                          ${card.tip ? `
                            <button type="button" class="btn-card-action" id="btn-dialog-tip">
                              💡 <span>${this.t('frontend.showTip')}</span>
                            </button>
                          ` : ''}
                          ${card.audioUrl ? `
                            <button type="button" class="btn-card-action" id="btn-dialog-audio" data-url="${card.audioUrl}">
                              🔊 <span>${this.t('frontend.listen')}</span>
                            </button>
                          ` : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Back -->
                  <div class="card-face card-back">
                    <div class="card-content">
                      <div>
                        <span class="card-badge badge-back">${this.t('frontend.card')} ${index + 1} (${this.t('frontend.turnOver')})</span>
                        <h3 class="card-text-title">${card.backText || ''}</h3>
                      </div>
                      ${card.audioUrl ? `
                        <div class="card-action-bar">
                          <button type="button" class="btn-card-action" id="btn-dialog-audio-back" data-url="${card.audioUrl}">
                            🔊 <span>${this.t('frontend.listen')}</span>
                          </button>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Controls -->
            <div class="dialog-controls">
              <button type="button" class="btn-nav" id="btn-dialog-prev" ${!hasPrev ? 'disabled' : ''}>
                ← ${this.t('frontend.previous')}
              </button>
              <button type="button" class="btn-dialog-flip" id="btn-flip-now">
                🔄 <span>${this.t('frontend.turnOver')}</span>
              </button>
              <button type="button" class="btn-nav" id="btn-dialog-next" ${!hasNext ? 'disabled' : ''}>
                ${this.t('frontend.next')} →
              </button>
            </div>
          </div>
        `;

        const wrap = this.stageContainer.querySelector('#active-dialog-card');
        const flipBtn = this.stageContainer.querySelector('#btn-flip-now');
        const tipBtn = this.stageContainer.querySelector('#btn-dialog-tip');
        const tipBox = this.stageContainer.querySelector('#dialog-tip');
        const audioBtn = this.stageContainer.querySelector('#btn-dialog-audio');
        const audioBackBtn = this.stageContainer.querySelector('#btn-dialog-audio-back');
        const prevBtn = this.stageContainer.querySelector('#btn-dialog-prev');
        const nextBtn = this.stageContainer.querySelector('#btn-dialog-next');

        const triggerFlip = () => {
          this.startTimer();
          this.incrementMoves();
          sfx.playFlip();
          wrap.classList.toggle('is-flipped');
        };

        wrap.addEventListener('click', (e) => {
          if (e.target.closest('button')) return;
          triggerFlip();
        });

        if (flipBtn) {
          flipBtn.addEventListener('click', triggerFlip);
        }

        if (tipBtn && tipBox) {
          tipBtn.addEventListener('click', () => {
            tipBox.classList.toggle('show');
            tipBtn.classList.toggle('active');
          });
        }

        if (audioBtn) {
          audioBtn.addEventListener('click', () => playAudioUrl(audioBtn.getAttribute('data-url'), audioBtn));
        }
        if (audioBackBtn) {
          audioBackBtn.addEventListener('click', () => playAudioUrl(audioBackBtn.getAttribute('data-url'), audioBackBtn));
        }

        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              renderDialogCard(currentIndex);
            }
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            if (currentIndex < this.cards.length - 1) {
              currentIndex++;
              renderDialogCard(currentIndex);
            }
          });
        }
      };

      renderDialogCard(currentIndex);
    }

    /* -------------------------------------------------------------
       Mode 3: Memory Grid Mode
       ------------------------------------------------------------- */
    initMemoryGridMode() {
      if (!this.cards || this.cards.length === 0) return;

      // Duplicate cards to create matching pairs
      let deck = [];
      this.cards.forEach((card, originalIndex) => {
        deck.push({
          tileId: `tile-${originalIndex}-a`,
          pairId: `pair-${originalIndex}`,
          text: card.frontText,
          image: card.frontImage,
          audio: card.audioUrl,
          type: 'front',
        });
        deck.push({
          tileId: `tile-${originalIndex}-b`,
          pairId: `pair-${originalIndex}`,
          text: card.backText,
          image: card.frontImage,
          audio: card.audioUrl,
          type: 'back',
        });
      });

      // Fisher-Yates shuffle
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

      const totalPairs = this.cards.length;
      let matchedPairs = 0;
      let flippedTiles = [];
      let isBusy = false;

      if (this.pairsEl) {
        this.pairsEl.textContent = `0 / ${totalPairs}`;
      }

      // Bootstrap grid columns class
      const gridClass = `row row-cols-1 row-cols-sm-2 row-cols-md-${Math.min(this.columns, 3)} row-cols-lg-${this.columns} g-3`;

      this.stageContainer.innerHTML = `
        <div class="${gridClass}">
          ${deck.map((tile) => `
            <div class="col card-col-wrap">
              <div
                class="card-3d-wrap memory-tile"
                data-tile-id="${tile.tileId}"
                data-pair-id="${tile.pairId}"
                data-audio="${tile.audio || ''}"
                style="min-height: ${this.cardHeight}px"
              >
                <div class="card-flipper" style="min-height: ${this.cardHeight}px">
                  <!-- Front: Face Down Cover -->
                  <div class="card-face card-front memory-cover">
                    <div class="cover-pattern"></div>
                    <div class="cover-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <h5 class="cover-label">Card</h5>
                  </div>

                  <!-- Back: Revealed Tile Face -->
                  <div class="card-face card-back">
                    ${tile.image ? `
                      <div class="card-media">
                        <img src="${tile.image}" alt="${tile.text || ''}" />
                      </div>
                    ` : ''}
                    <div class="card-content">
                      <div>
                        <span class="card-badge ${tile.type === 'front' ? 'badge-front' : 'badge-back'}">
                          ${tile.type === 'front' ? 'Item A' : 'Item B'}
                        </span>
                        <h4 class="card-text-title">${tile.text || ''}</h4>
                      </div>
                    </div>
                    <div class="match-checkmark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      const tiles = this.stageContainer.querySelectorAll('.memory-tile');

      tiles.forEach((tile) => {
        tile.addEventListener('click', () => {
          if (isBusy) return;
          if (tile.classList.contains('is-flipped') || tile.classList.contains('is-matched')) return;

          this.startTimer();
          sfx.playFlip();

          // Audio preview if tile has audio
          const audioSrc = tile.getAttribute('data-audio');
          if (audioSrc) playAudioUrl(audioSrc);

          tile.classList.add('is-flipped');
          flippedTiles.push(tile);

          if (flippedTiles.length === 2) {
            this.incrementMoves();
            isBusy = true;

            const [tile1, tile2] = flippedTiles;
            const pair1 = tile1.getAttribute('data-pair-id');
            const pair2 = tile2.getAttribute('data-pair-id');

            if (pair1 === pair2) {
              // MATCH
              setTimeout(() => {
                sfx.playMatch();
                tile1.classList.add('is-matched', 'bounce-anim');
                tile2.classList.add('is-matched', 'bounce-anim');
                matchedPairs++;

                if (this.pairsEl) {
                  this.pairsEl.textContent = `${matchedPairs} / ${totalPairs}`;
                }

                flippedTiles = [];
                isBusy = false;

                // Check Victory
                if (matchedPairs === totalPairs) {
                  this.stopTimer();
                  sfx.playVictory();
                  if (this.victoryOverlay) {
                    const msgEl = this.victoryOverlay.querySelector('.victory-msg');
                    if (msgEl) {
                      msgEl.textContent = this.t('frontend.victoryMessage', {
                        moves: this.movesCount,
                        time: this.formatTime(this.secondsElapsed),
                      });
                    }
                    this.victoryOverlay.classList.add('show');
                  }
                }
              }, 400);
            } else {
              // MISMATCH
              setTimeout(() => {
                sfx.playError();
                tile1.classList.add('shake-anim');
                tile2.classList.add('shake-anim');

                setTimeout(() => {
                  tile1.classList.remove('is-flipped', 'shake-anim');
                  tile2.classList.remove('is-flipped', 'shake-anim');
                  flippedTiles = [];
                  isBusy = false;
                }, 700);
              }, 600);
            }
          }
        });
      });
    }
  }

  // Initialize all blocks on page load
  function initCardTrainers() {
    const blocks = document.querySelectorAll('.wp-block-periodic-card-trainer');
    blocks.forEach((el) => {
      if (!el.__periodicCardTrainerInstance) {
        el.__periodicCardTrainerInstance = new CardTrainer(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardTrainers);
  } else {
    initCardTrainers();
  }

  window.initPeriodicCardTrainer = initCardTrainers;
})();
