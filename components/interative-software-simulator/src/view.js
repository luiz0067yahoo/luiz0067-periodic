/**
 * Frontend Player Script: Software Simulator Gutenberg Block
 * custom/simulador-software
 * Pure Vanilla JavaScript - Multi-instance safe - Zero dependencies
 */

class SoftwareSimulator {
  constructor(container) {
    this.container = container;
    this.wrapper = container.classList && container.classList.contains('sim-player-wrapper')
      ? container
      : (container.querySelector('.sim-player-wrapper') || container);
    
    // Read JSON config
    const configScript = this.wrapper.querySelector('.sim-data-config') || this.container.querySelector('.sim-data-config');
    if (!configScript) {
      console.warn('Simulador de Software: elemento .sim-data-config não encontrado.');
      return;
    }

    try {
      this.config = JSON.parse(configScript.textContent);
    } catch (e) {
      console.error('Falha ao carregar configurações do Simulador de Software:', e);
      return;
    }

    this.steps = this.config.steps || [];
    if (!this.steps.length) {
      this.wrapper.innerHTML = `
        <div style="padding: 30px 20px; text-align: center; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #334155;">
          <h4 style="margin: 0 0 8px 0; color: #f87171; font-size: 1.1rem;">${this.escapeHTML(this.config.simulatorTitle || 'Simulador de Software')}</h4>
          <p style="margin: 0; color: #94a3b8; font-size: 0.9rem;">Nenhum passo de simulação foi configurado para este bloco.</p>
        </div>
      `;
      this.wrapper.setAttribute('data-initialized', 'true');
      return;
    }

    this.currentStepIndex = 0;
    this.completedInputs = new Set();
    this.isFullscreen = false;
    this.toastTimer = null;

    this.initDOM();
    this.renderStep(0);
    this.wrapper.setAttribute('data-initialized', 'true');
  }

  resolveImageUrl(url) {
    if (!url) return '';
    if (url.startsWith('assets/')) {
      const baseUrl = (typeof window !== 'undefined' && window.simuladorSoftwareSettings?.pluginUrl) || '';
      if (baseUrl) {
        return baseUrl.replace(/\/+$/, '') + '/' + url;
      }
    }
    return url;
  }

  initDOM() {
    // Clear fallback markup
    this.wrapper.innerHTML = `
      <div class="sim-header-bar">
        <div class="sim-title-group">
          <div class="sim-window-dots">
            <span></span><span></span><span></span>
          </div>
          <span class="sim-header-title">${this.escapeHTML(this.config.simulatorTitle || 'Simulador de Software')}</span>
        </div>
        <div class="sim-header-controls">
          ${this.config.showStepIndicator ? '<span class="sim-step-badge">Passo 1 / ' + this.steps.length + '</span>' : ''}
          <button type="button" class="sim-btn-icon sim-btn-fullscreen" title="Alternar Tela Cheia">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>
        </div>
      </div>

      ${this.config.showProgressBar ? `
        <div class="sim-progress-track">
          <div class="sim-progress-fill" style="width: ${(1 / this.steps.length) * 100}%"></div>
        </div>
      ` : ''}

      <div class="sim-stage-canvas">
        <div class="sim-stage-screen">
          <img class="sim-bg-image" src="" alt="Tela do Software" />
          <div class="sim-elements-layer"></div>
        </div>
        <div class="sim-error-toast">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span class="sim-error-toast-text"></span>
        </div>
      </div>

      <div class="sim-instruction-bar">
        <div class="sim-instruction-content">
          <div class="sim-instruction-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <p class="sim-instruction-text"></p>
        </div>
        <div class="sim-instruction-actions">
          ${this.config.showRestartButton ? `
            <button type="button" class="sim-btn-restart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 4v6h-6"></path>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              Reiniciar
            </button>
          ` : ''}
        </div>
      </div>
    `;

    // Cache DOM nodes
    this.stageCanvas = this.wrapper.querySelector('.sim-stage-canvas');
    this.stageScreen = this.wrapper.querySelector('.sim-stage-screen');
    this.bgImage = this.wrapper.querySelector('.sim-bg-image');
    this.elementsLayer = this.wrapper.querySelector('.sim-elements-layer');
    this.instructionText = this.wrapper.querySelector('.sim-instruction-text');
    this.stepBadge = this.wrapper.querySelector('.sim-step-badge');
    this.progressFill = this.wrapper.querySelector('.sim-progress-fill');
    this.errorToast = this.wrapper.querySelector('.sim-error-toast');
    this.errorToastText = this.wrapper.querySelector('.sim-error-toast-text');

    // Attach Header / Action Events
    const btnFullscreen = this.wrapper.querySelector('.sim-btn-fullscreen');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }

    const btnRestart = this.wrapper.querySelector('.sim-btn-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => this.restart());
    }

    // Responsive Dimension Sync (Locks overlay elements to exact image coordinates)
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateStageDimensions();
      });
      this.resizeObserver.observe(this.stageCanvas);
    }
    window.addEventListener('resize', () => this.updateStageDimensions());
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.updateStageDimensions(), 60);
      setTimeout(() => this.updateStageDimensions(), 250);
    });
    document.addEventListener('fullscreenchange', () => {
      setTimeout(() => this.updateStageDimensions(), 50);
      setTimeout(() => this.updateStageDimensions(), 250);
      setTimeout(() => this.updateStageDimensions(), 500);
    });
    document.addEventListener('webkitfullscreenchange', () => {
      setTimeout(() => this.updateStageDimensions(), 50);
      setTimeout(() => this.updateStageDimensions(), 250);
    });

    this.bgImage.addEventListener('load', () => {
      this.updateStageDimensions();
    });

    // Missed click on stage canvas or image
    if (this.config.allowClickAnywhereHint !== false) {
      this.stageCanvas.addEventListener('click', (e) => {
        // If clicked directly on canvas, screen, image or layer (not on interactive element)
        if (
          e.target === this.stageCanvas ||
          e.target === this.stageScreen ||
          e.target === this.bgImage ||
          e.target === this.elementsLayer
        ) {
          this.triggerMissedClick();
        }
      });
    }
  }

  updateStageDimensions() {
    if (!this.stageCanvas || !this.stageScreen) return;
    const canvasWidth = this.stageCanvas.clientWidth;
    const canvasHeight = this.stageCanvas.clientHeight;
    if (!canvasWidth || !canvasHeight) return;

    // Detect natural aspect ratio of the active image, fallback to 16/9
    let ar = 16 / 9;
    if (this.bgImage && this.bgImage.naturalWidth && this.bgImage.naturalHeight) {
      ar = this.bgImage.naturalWidth / this.bgImage.naturalHeight;
    }

    // Fit within canvas bounds preserving exact image proportions
    let fitWidth = canvasWidth;
    let fitHeight = canvasWidth / ar;

    if (fitHeight > canvasHeight) {
      fitHeight = canvasHeight;
      fitWidth = canvasHeight * ar;
    }

    const wStr = `${Math.round(fitWidth * 100) / 100}px`;
    const hStr = `${Math.round(fitHeight * 100) / 100}px`;

    this.stageScreen.style.width = wStr;
    this.stageScreen.style.height = hStr;
    this.stageScreen.style.maxWidth = wStr;
    this.stageScreen.style.maxHeight = hStr;
    this.stageScreen.style.aspectRatio = `${ar}`;
  }

  renderStep(stepIndex) {
    if (stepIndex < 0 || stepIndex >= this.steps.length) {
      this.showCompletionScreen();
      return;
    }

    this.currentStepIndex = stepIndex;
    const step = this.steps[stepIndex];
    this.completedInputs.clear();

    // Update Progress
    if (this.progressFill) {
      const progressPercent = ((stepIndex + 1) / this.steps.length) * 100;
      this.progressFill.style.width = `${progressPercent}%`;
    }

    // Update Step Badge
    if (this.stepBadge) {
      this.stepBadge.textContent = `Passo ${stepIndex + 1} / ${this.steps.length}`;
    }

    // Update Instruction Text
    if (this.instructionText) {
      this.instructionText.textContent = step.instruction || '';
    }

    // Smooth transition on background image
    this.stageCanvas.classList.add('is-animating');
    const resolvedUrl = this.resolveImageUrl(step.imageUrl || '');
    setTimeout(() => {
      this.bgImage.src = resolvedUrl;
      this.bgImage.onload = () => {
        this.stageCanvas.classList.remove('is-animating');
        this.updateStageDimensions();
      };
      // Fallback if image is cached or load event already triggered
      setTimeout(() => {
        this.stageCanvas.classList.remove('is-animating');
        this.updateStageDimensions();
      }, 200);
    }, 100);

    // Render Elements
    this.elementsLayer.innerHTML = '';
    const elements = step.elements || [];

    elements.forEach((el) => {
      if (el.type === 'click') {
        this.createClickElement(el);
      } else if (el.type === 'input') {
        this.createInputElement(el);
      } else if (el.type === 'drag') {
        this.createDragElement(el);
      }
    });

    this.updateStageDimensions();
  }

  createClickElement(el) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sim-hotspot';
    btn.style.top = `${el.top}%`;
    btn.style.left = `${el.left}%`;
    btn.style.width = `${el.width}%`;
    btn.style.height = `${el.height}%`;
    btn.setAttribute('aria-label', el.label || 'Área interativa');
    btn.title = el.label || 'Clique aqui';

    btn.innerHTML = `<span class="sim-hotspot-ripple"></span>`;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      // Check if this step has inputs that must be completed first
      if (el.requiresCompletedInputs) {
        const currentStep = this.steps[this.currentStepIndex];
        const requiredInputs = (currentStep.elements || []).filter(item => item.type === 'input');
        const allCompleted = requiredInputs.every(inputEl => this.completedInputs.has(inputEl.id));

        if (!allCompleted) {
          this.showErrorToast('Por favor, preencha todos os campos corretamente antes de clicar em OK!');
          return;
        }
      }

      btn.classList.add('is-clicked');

      setTimeout(() => {
        const nextTarget = el.targetStepIndex !== undefined ? el.targetStepIndex : this.currentStepIndex + 1;
        if (nextTarget === -1 || nextTarget >= this.steps.length) {
          this.showCompletionScreen();
        } else {
          this.renderStep(nextTarget);
        }
      }, 250);
    });

    this.elementsLayer.appendChild(btn);
  }

  createInputElement(el) {
    const wrapper = document.createElement('div');
    wrapper.className = 'sim-input-wrapper';
    wrapper.style.top = `${el.top}%`;
    wrapper.style.left = `${el.left}%`;
    wrapper.style.width = `${el.width}%`;
    wrapper.style.height = `${el.height}%`;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'sim-input-box';
    input.placeholder = el.placeholder || '';
    input.setAttribute('aria-label', el.label || 'Campo de entrada');
    input.autocomplete = 'off';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'sim-input-submit-btn';
    submitBtn.title = 'Confirmar';
    submitBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    const validateInput = () => {
      const val = input.value.trim().toLowerCase();
      const expected = (el.expectedValue || '').trim().toLowerCase();

      // Normalize comparison (handle variations like "3 cm" or "3")
      const matches = (val === expected) || 
                      (val.replace(/[^a-z0-9]/gi, '') === expected.replace(/[^a-z0-9]/gi, '')) ||
                      (val.startsWith(expected) && !isNaN(parseFloat(val)));

      if (matches) {
        input.classList.remove('is-error');
        input.classList.add('is-valid');
        input.disabled = true;
        submitBtn.style.display = 'none';
        this.completedInputs.add(el.id);

        // Check if there are other inputs in this step
        const currentStep = this.steps[this.currentStepIndex];
        const stepInputs = (currentStep.elements || []).filter(item => item.type === 'input');
        const hasSpecificTarget = el.targetStepIndex !== undefined && el.targetStepIndex !== null && el.targetStepIndex !== this.currentStepIndex;

        if (hasSpecificTarget || stepInputs.length <= 1) {
          setTimeout(() => {
            const nextTarget = el.targetStepIndex !== undefined ? el.targetStepIndex : this.currentStepIndex + 1;
            if (nextTarget === -1 || nextTarget >= this.steps.length) {
              this.showCompletionScreen();
            } else {
              this.renderStep(nextTarget);
            }
          }, 400);
        } else {
          // In multi-input step, check if all inputs completed
          const allCompleted = stepInputs.every(item => this.completedInputs.has(item.id));
          if (allCompleted) {
            this.showErrorToast('Campos preenchidos! Agora clique em OK para salvar.');
            // Highlight the OK button if available
            const okBtn = this.elementsLayer.querySelector('.sim-hotspot');
            if (okBtn) {
              okBtn.style.animation = 'sim-pulse 0.8s infinite';
            }
          }
        }
      } else {
        input.classList.add('is-error');
        this.showErrorToast(`Valor incorreto. Tente digitar "${el.expectedValue}".`);
        setTimeout(() => input.classList.remove('is-error'), 600);
      }
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        validateInput();
      }
    });

    submitBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      validateInput();
    });

    wrapper.appendChild(input);
    wrapper.appendChild(submitBtn);
    this.elementsLayer.appendChild(wrapper);

    // Auto-focus if it's the only input or first step
    if (this.currentStepIndex === 1) {
      setTimeout(() => input.focus(), 300);
    }
  }

  createDragElement(el) {
    const targetLeft = el.targetLeft !== undefined ? el.targetLeft : (el.left + 25);
    const targetTop = el.targetTop !== undefined ? el.targetTop : el.top;
    const targetWidth = el.targetWidth !== undefined ? el.targetWidth : 16;
    const targetHeight = el.targetHeight !== undefined ? el.targetHeight : 12;

    // 1. Target Drop Zone
    const dropZone = document.createElement('div');
    dropZone.className = 'sim-drop-zone';
    dropZone.style.left = `${targetLeft}%`;
    dropZone.style.top = `${targetTop}%`;
    dropZone.style.width = `${targetWidth}%`;
    dropZone.style.height = `${targetHeight}%`;
    dropZone.innerHTML = `
      <div class="sim-drop-zone-content">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
        <span>${this.escapeHTML(el.targetLabel || 'Solte Aqui')}</span>
      </div>
    `;
    this.elementsLayer.appendChild(dropZone);

    // 2. Draggable Item
    const dragItem = document.createElement('div');
    dragItem.className = 'sim-drag-item';
    dragItem.style.left = `${el.left}%`;
    dragItem.style.top = `${el.top}%`;
    dragItem.style.width = `${el.width}%`;
    dragItem.style.height = `${el.height}%`;
    dragItem.setAttribute('role', 'button');
    dragItem.setAttribute('aria-label', el.label || 'Item arrastável');
    dragItem.title = el.label || 'Arraste até o destino';

    dragItem.innerHTML = `
      <div class="sim-drag-item-inner">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="9" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="9" cy="19" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="19" r="1.5" fill="currentColor"/>
        </svg>
        <span>${this.escapeHTML(el.dragText || el.label || 'Arrastar')}</span>
      </div>
    `;

    // 3. Pointer Drag and Drop Logic
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    const initialLeft = el.left;
    const initialTop = el.top;

    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      try {
        dragItem.setPointerCapture(e.pointerId);
      } catch (err) {}

      dragItem.classList.add('is-dragging');
      dropZone.classList.add('is-active');

      const onPointerMove = (moveEvt) => {
        if (!isDragging) return;
        moveEvt.preventDefault();
        moveEvt.stopPropagation();

        const layerRect = this.elementsLayer.getBoundingClientRect();
        if (!layerRect.width || !layerRect.height) return;

        const deltaXPct = ((moveEvt.clientX - startX) / layerRect.width) * 100;
        const deltaYPct = ((moveEvt.clientY - startY) / layerRect.height) * 100;

        const currentLeft = Math.max(0, Math.min(100 - el.width, initialLeft + deltaXPct));
        const currentTop = Math.max(0, Math.min(100 - el.height, initialTop + deltaYPct));

        dragItem.style.left = `${currentLeft}%`;
        dragItem.style.top = `${currentTop}%`;

        // Check bounding box intersection
        const itemRect = dragItem.getBoundingClientRect();
        const zoneRect = dropZone.getBoundingClientRect();

        const isOver = !(
          itemRect.right < zoneRect.left ||
          itemRect.left > zoneRect.right ||
          itemRect.bottom < zoneRect.top ||
          itemRect.top > zoneRect.bottom
        );

        if (isOver) {
          dropZone.classList.add('is-over');
        } else {
          dropZone.classList.remove('is-over');
        }
      };

      const onPointerUp = (upEvt) => {
        if (!isDragging) return;
        isDragging = false;
        dragItem.classList.remove('is-dragging');
        dropZone.classList.remove('is-active');

        try {
          if (dragItem.hasPointerCapture(e.pointerId)) {
            dragItem.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}

        dragItem.removeEventListener('pointermove', onPointerMove);
        dragItem.removeEventListener('pointerup', onPointerUp);
        dragItem.removeEventListener('pointercancel', onPointerUp);

        // Calculate overlap
        const itemRect = dragItem.getBoundingClientRect();
        const zoneRect = dropZone.getBoundingClientRect();

        const itemCenterX = itemRect.left + itemRect.width / 2;
        const itemCenterY = itemRect.top + itemRect.height / 2;

        const isSuccess = (
          itemCenterX >= zoneRect.left &&
          itemCenterX <= zoneRect.right &&
          itemCenterY >= zoneRect.top &&
          itemCenterY <= zoneRect.bottom
        );

        if (isSuccess) {
          dropZone.classList.remove('is-over');
          dropZone.classList.add('is-success');
          dragItem.classList.add('is-success');

          // Snap to center of drop zone
          dragItem.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
          dragItem.style.left = `${targetLeft + (targetWidth - el.width) / 2}%`;
          dragItem.style.top = `${targetTop + (targetHeight - el.height) / 2}%`;

          setTimeout(() => {
            const nextTarget = el.targetStepIndex !== undefined ? el.targetStepIndex : this.currentStepIndex + 1;
            if (nextTarget === -1 || nextTarget >= this.steps.length) {
              this.showCompletionScreen();
            } else {
              this.renderStep(nextTarget);
            }
          }, 450);
        } else {
          // Snap back with smooth spring
          dragItem.style.transition = 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
          dragItem.style.left = `${initialLeft}%`;
          dragItem.style.top = `${initialTop}%`;
          setTimeout(() => {
            dragItem.style.transition = '';
          }, 360);

          this.showErrorToast('Arraste o item até a área pontilhada de destino!');
        }
      };

      dragItem.addEventListener('pointermove', onPointerMove);
      dragItem.addEventListener('pointerup', onPointerUp);
      dragItem.addEventListener('pointercancel', onPointerUp);
    };

    dragItem.addEventListener('pointerdown', onPointerDown);
    this.elementsLayer.appendChild(dragItem);
  }

  triggerMissedClick() {
    this.showErrorToast('Atenção: clique na área indicada para prosseguir!');
    this.stageCanvas.style.animation = 'none';
    setTimeout(() => {
      this.stageCanvas.style.animation = 'sim-shake 0.35s ease';
      setTimeout(() => {
        this.stageCanvas.style.animation = '';
      }, 350);
    }, 10);
  }

  showErrorToast(msg) {
    if (!this.errorToast) return;
    this.errorToastText.textContent = msg;
    this.errorToast.classList.add('is-visible');

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.errorToast.classList.remove('is-visible');
    }, 2800);
  }

  showCompletionScreen() {
    const existing = this.stageCanvas.querySelector('.sim-completion-screen');
    if (existing) existing.remove();

    const completion = document.createElement('div');
    completion.className = 'sim-completion-screen';
    completion.innerHTML = `
      <div class="sim-completion-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2 class="sim-completion-title">Parabéns! Tutorial Concluído!</h2>
      <p class="sim-completion-desc">${this.escapeHTML(this.config.customSuccessMessage || 'Você completou com sucesso a simulação de formatação de margens ABNT no Windows 11!')}</p>
      <button type="button" class="sim-btn-restart-large">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 4v6h-6"></path>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reiniciar Simulação
      </button>
    `;

    completion.querySelector('.sim-btn-restart-large').addEventListener('click', () => {
      this.restart();
    });

    this.stageCanvas.appendChild(completion);

    if (this.progressFill) {
      this.progressFill.style.width = '100%';
    }
  }

  restart() {
    const completion = this.stageCanvas.querySelector('.sim-completion-screen');
    if (completion) completion.remove();
    this.renderStep(0);
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    if (this.isFullscreen) {
      this.wrapper.classList.add('is-fullscreen');
      if (this.wrapper.requestFullscreen) {
        this.wrapper.requestFullscreen().catch(() => {});
      } else if (this.wrapper.webkitRequestFullscreen) {
        this.wrapper.webkitRequestFullscreen();
      }
    } else {
      this.wrapper.classList.remove('is-fullscreen');
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    setTimeout(() => this.updateStageDimensions(), 50);
    setTimeout(() => this.updateStageDimensions(), 250);
    setTimeout(() => this.updateStageDimensions(), 500);
  }

  escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

// Auto-initialize all simulator instances on page load
function initSoftwareSimulators() {
  const wrappers = document.querySelectorAll('.sim-player-wrapper');
  wrappers.forEach((wrapper) => {
    if (wrapper.getAttribute('data-initialized') !== 'true') {
      const block = wrapper.closest('.wp-block-custom-simulador-software') || wrapper;
      const instance = new SoftwareSimulator(block);
      window._currentSimInstance = instance;
    }
  });

  const blocks = document.querySelectorAll('.wp-block-custom-simulador-software');
  blocks.forEach((block) => {
    const wrapper = block.querySelector('.sim-player-wrapper');
    if (wrapper && wrapper.getAttribute('data-initialized') !== 'true') {
      const instance = new SoftwareSimulator(block);
      window._currentSimInstance = instance;
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSoftwareSimulators);
} else {
  initSoftwareSimulators();
}
if (typeof window !== 'undefined') {
  window.addEventListener('load', initSoftwareSimulators);
}

export default SoftwareSimulator;
