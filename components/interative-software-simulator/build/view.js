(() => {
  // src/view.js
  var SoftwareSimulator = class {
    constructor(container) {
      this.container = container;
      this.wrapper = container.classList && container.classList.contains("sim-player-wrapper") ? container : container.querySelector(".sim-player-wrapper") || container;
      const configScript = this.wrapper.querySelector(".sim-data-config") || this.container.querySelector(".sim-data-config");
      if (!configScript) {
        console.warn("Simulador de Software: elemento .sim-data-config n\xE3o encontrado.");
        return;
      }
      try {
        this.config = JSON.parse(configScript.textContent);
      } catch (e) {
        console.error("Falha ao carregar configura\xE7\xF5es do Simulador de Software:", e);
        return;
      }
      this.steps = this.config.steps || [];
      if (!this.steps.length) {
        this.wrapper.innerHTML = `
        <div style="padding: 30px 20px; text-align: center; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #334155;">
          <h4 style="margin: 0 0 8px 0; color: #f87171; font-size: 1.1rem;">${this.escapeHTML(this.config.simulatorTitle || "Simulador de Software")}</h4>
          <p style="margin: 0; color: #94a3b8; font-size: 0.9rem;">Nenhum passo de simula\xE7\xE3o foi configurado para este bloco.</p>
        </div>
      `;
        this.wrapper.setAttribute("data-initialized", "true");
        return;
      }
      this.currentStepIndex = 0;
      this.completedInputs = /* @__PURE__ */ new Set();
      this.isFullscreen = false;
      this.toastTimer = null;
      this.initDOM();
      this.renderStep(0);
      this.wrapper.setAttribute("data-initialized", "true");
    }
    resolveImageUrl(url) {
      if (!url) return "";
      if (url.startsWith("assets/")) {
        const baseUrl = typeof window !== "undefined" && window.simuladorSoftwareSettings?.pluginUrl || "";
        if (baseUrl) {
          return baseUrl.replace(/\/+$/, "") + "/" + url;
        }
      }
      return url;
    }
    initDOM() {
      this.wrapper.innerHTML = `
      <div class="sim-header-bar">
        <div class="sim-title-group">
          <div class="sim-window-dots">
            <span></span><span></span><span></span>
          </div>
          <span class="sim-header-title">${this.escapeHTML(this.config.simulatorTitle || "Simulador de Software")}</span>
        </div>
        <div class="sim-header-controls">
          ${this.config.showStepIndicator ? '<span class="sim-step-badge">Passo 1 / ' + this.steps.length + "</span>" : ""}
          <button type="button" class="sim-btn-icon sim-btn-fullscreen" title="Alternar Tela Cheia">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>
        </div>
      </div>

      ${this.config.showProgressBar ? `
        <div class="sim-progress-track">
          <div class="sim-progress-fill" style="width: ${1 / this.steps.length * 100}%"></div>
        </div>
      ` : ""}

      <div class="sim-stage-canvas">
        <img class="sim-bg-image" src="" alt="Tela do Software" />
        <div class="sim-elements-layer"></div>
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
          ` : ""}
        </div>
      </div>
    `;
      this.stageCanvas = this.wrapper.querySelector(".sim-stage-canvas");
      this.bgImage = this.wrapper.querySelector(".sim-bg-image");
      this.elementsLayer = this.wrapper.querySelector(".sim-elements-layer");
      this.instructionText = this.wrapper.querySelector(".sim-instruction-text");
      this.stepBadge = this.wrapper.querySelector(".sim-step-badge");
      this.progressFill = this.wrapper.querySelector(".sim-progress-fill");
      this.errorToast = this.wrapper.querySelector(".sim-error-toast");
      this.errorToastText = this.wrapper.querySelector(".sim-error-toast-text");
      const btnFullscreen = this.wrapper.querySelector(".sim-btn-fullscreen");
      if (btnFullscreen) {
        btnFullscreen.addEventListener("click", () => this.toggleFullscreen());
      }
      const btnRestart = this.wrapper.querySelector(".sim-btn-restart");
      if (btnRestart) {
        btnRestart.addEventListener("click", () => this.restart());
      }
      if (this.config.allowClickAnywhereHint !== false) {
        this.stageCanvas.addEventListener("click", (e) => {
          if (e.target === this.stageCanvas || e.target === this.bgImage || e.target === this.elementsLayer) {
            this.triggerMissedClick();
          }
        });
      }
    }
    renderStep(stepIndex) {
      if (stepIndex < 0 || stepIndex >= this.steps.length) {
        this.showCompletionScreen();
        return;
      }
      this.currentStepIndex = stepIndex;
      const step = this.steps[stepIndex];
      this.completedInputs.clear();
      if (this.progressFill) {
        const progressPercent = (stepIndex + 1) / this.steps.length * 100;
        this.progressFill.style.width = `${progressPercent}%`;
      }
      if (this.stepBadge) {
        this.stepBadge.textContent = `Passo ${stepIndex + 1} / ${this.steps.length}`;
      }
      if (this.instructionText) {
        this.instructionText.textContent = step.instruction || "";
      }
      this.stageCanvas.classList.add("is-animating");
      const resolvedUrl = this.resolveImageUrl(step.imageUrl || "");
      setTimeout(() => {
        this.bgImage.src = resolvedUrl;
        this.bgImage.onload = () => {
          this.stageCanvas.classList.remove("is-animating");
        };
        setTimeout(() => this.stageCanvas.classList.remove("is-animating"), 200);
      }, 100);
      this.elementsLayer.innerHTML = "";
      const elements = step.elements || [];
      elements.forEach((el) => {
        if (el.type === "click") {
          this.createClickElement(el);
        } else if (el.type === "input") {
          this.createInputElement(el);
        }
      });
    }
    createClickElement(el) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sim-hotspot";
      btn.style.top = `${el.top}%`;
      btn.style.left = `${el.left}%`;
      btn.style.width = `${el.width}%`;
      btn.style.height = `${el.height}%`;
      btn.setAttribute("aria-label", el.label || "\xC1rea interativa");
      btn.title = el.label || "Clique aqui";
      btn.innerHTML = `<span class="sim-hotspot-ripple"></span>`;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (el.requiresCompletedInputs) {
          const currentStep = this.steps[this.currentStepIndex];
          const requiredInputs = (currentStep.elements || []).filter((item) => item.type === "input");
          const allCompleted = requiredInputs.every((inputEl) => this.completedInputs.has(inputEl.id));
          if (!allCompleted) {
            this.showErrorToast("Por favor, preencha todos os campos corretamente antes de clicar em OK!");
            return;
          }
        }
        btn.classList.add("is-clicked");
        setTimeout(() => {
          const nextTarget = el.targetStepIndex !== void 0 ? el.targetStepIndex : this.currentStepIndex + 1;
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
      const wrapper = document.createElement("div");
      wrapper.className = "sim-input-wrapper";
      wrapper.style.top = `${el.top}%`;
      wrapper.style.left = `${el.left}%`;
      wrapper.style.width = `${el.width}%`;
      wrapper.style.height = `${el.height}%`;
      const input = document.createElement("input");
      input.type = "text";
      input.className = "sim-input-box";
      input.placeholder = el.placeholder || "";
      input.setAttribute("aria-label", el.label || "Campo de entrada");
      input.autocomplete = "off";
      const submitBtn = document.createElement("button");
      submitBtn.type = "button";
      submitBtn.className = "sim-input-submit-btn";
      submitBtn.title = "Confirmar";
      submitBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
      const validateInput = () => {
        const val = input.value.trim().toLowerCase();
        const expected = (el.expectedValue || "").trim().toLowerCase();
        const matches = val === expected || val.replace(/[^a-z0-9]/gi, "") === expected.replace(/[^a-z0-9]/gi, "") || val.startsWith(expected) && !isNaN(parseFloat(val));
        if (matches) {
          input.classList.remove("is-error");
          input.classList.add("is-valid");
          input.disabled = true;
          submitBtn.style.display = "none";
          this.completedInputs.add(el.id);
          const currentStep = this.steps[this.currentStepIndex];
          const stepInputs = (currentStep.elements || []).filter((item) => item.type === "input");
          const hasSpecificTarget = el.targetStepIndex !== void 0 && el.targetStepIndex !== null && el.targetStepIndex !== this.currentStepIndex;
          if (hasSpecificTarget || stepInputs.length <= 1) {
            setTimeout(() => {
              const nextTarget = el.targetStepIndex !== void 0 ? el.targetStepIndex : this.currentStepIndex + 1;
              if (nextTarget === -1 || nextTarget >= this.steps.length) {
                this.showCompletionScreen();
              } else {
                this.renderStep(nextTarget);
              }
            }, 400);
          } else {
            const allCompleted = stepInputs.every((item) => this.completedInputs.has(item.id));
            if (allCompleted) {
              this.showErrorToast("Campos preenchidos! Agora clique em OK para salvar.");
              const okBtn = this.elementsLayer.querySelector(".sim-hotspot");
              if (okBtn) {
                okBtn.style.animation = "sim-pulse 0.8s infinite";
              }
            }
          }
        } else {
          input.classList.add("is-error");
          this.showErrorToast(`Valor incorreto. Tente digitar "${el.expectedValue}".`);
          setTimeout(() => input.classList.remove("is-error"), 600);
        }
      };
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          validateInput();
        }
      });
      submitBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        validateInput();
      });
      wrapper.appendChild(input);
      wrapper.appendChild(submitBtn);
      this.elementsLayer.appendChild(wrapper);
      if (this.currentStepIndex === 1) {
        setTimeout(() => input.focus(), 300);
      }
    }
    triggerMissedClick() {
      this.showErrorToast("Aten\xE7\xE3o: clique na \xE1rea indicada para prosseguir!");
      this.stageCanvas.style.animation = "none";
      setTimeout(() => {
        this.stageCanvas.style.animation = "sim-shake 0.35s ease";
        setTimeout(() => {
          this.stageCanvas.style.animation = "";
        }, 350);
      }, 10);
    }
    showErrorToast(msg) {
      if (!this.errorToast) return;
      this.errorToastText.textContent = msg;
      this.errorToast.classList.add("is-visible");
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.errorToast.classList.remove("is-visible");
      }, 2800);
    }
    showCompletionScreen() {
      const existing = this.stageCanvas.querySelector(".sim-completion-screen");
      if (existing) existing.remove();
      const completion = document.createElement("div");
      completion.className = "sim-completion-screen";
      completion.innerHTML = `
      <div class="sim-completion-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2 class="sim-completion-title">Parab\xE9ns! Tutorial Conclu\xEDdo!</h2>
      <p class="sim-completion-desc">${this.escapeHTML(this.config.customSuccessMessage || "Voc\xEA completou com sucesso a simula\xE7\xE3o de formata\xE7\xE3o de margens ABNT no Windows 11!")}</p>
      <button type="button" class="sim-btn-restart-large">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 4v6h-6"></path>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reiniciar Simula\xE7\xE3o
      </button>
    `;
      completion.querySelector(".sim-btn-restart-large").addEventListener("click", () => {
        this.restart();
      });
      this.stageCanvas.appendChild(completion);
      if (this.progressFill) {
        this.progressFill.style.width = "100%";
      }
    }
    restart() {
      const completion = this.stageCanvas.querySelector(".sim-completion-screen");
      if (completion) completion.remove();
      this.renderStep(0);
    }
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      if (this.isFullscreen) {
        this.wrapper.classList.add("is-fullscreen");
        if (this.wrapper.requestFullscreen) {
          this.wrapper.requestFullscreen().catch(() => {
          });
        }
      } else {
        this.wrapper.classList.remove("is-fullscreen");
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {
          });
        }
      }
    }
    escapeHTML(str) {
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
  };
  function initSoftwareSimulators() {
    const wrappers = document.querySelectorAll(".sim-player-wrapper");
    wrappers.forEach((wrapper) => {
      if (wrapper.getAttribute("data-initialized") !== "true") {
        const block = wrapper.closest(".wp-block-custom-simulador-software") || wrapper;
        const instance = new SoftwareSimulator(block);
        window._currentSimInstance = instance;
      }
    });
    const blocks = document.querySelectorAll(".wp-block-custom-simulador-software");
    blocks.forEach((block) => {
      const wrapper = block.querySelector(".sim-player-wrapper");
      if (wrapper && wrapper.getAttribute("data-initialized") !== "true") {
        const instance = new SoftwareSimulator(block);
        window._currentSimInstance = instance;
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSoftwareSimulators);
  } else {
    initSoftwareSimulators();
  }
  if (typeof window !== "undefined") {
    window.addEventListener("load", initSoftwareSimulators);
  }
  var view_default = SoftwareSimulator;
})();
