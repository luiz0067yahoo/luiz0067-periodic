/**
 * Periodic Drag & Drop Engine - Frontend Controller
 * Suporte completo a Desktop (Mouse), Touch/Mobile (Pointer Events) e Acessibilidade (Tap-to-Drop).
 */

(function () {
  'use strict';

  function initDragDropEngine(container) {
    if (container.__dndInitialized) return;
    container.__dndInitialized = true;

    let config = {};
    try {
      config = JSON.parse(container.getAttribute('data-config') || '{}');
    } catch (e) {
      console.warn('[Periodic DnD] Falha ao parsear data-config:', e);
    }

    const dragMode = container.getAttribute('data-drag-mode') || config.dragMode || 'text-tokens';
    const checkBtn = container.querySelector('.periodic-check-btn');
    const resetBtn = container.querySelector('.periodic-reset-btn');
    const feedbackAlert = container.querySelector('.periodic-feedback-alert');
    const sourcePool = container.querySelector('.periodic-source-pool');

    // Estado do Drag ativo
    let activeItem = null;
    let dragClone = null;
    let originalParent = null;
    let originalNextSibling = null;
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let currentHoverZone = null;
    let selectedItemForPlacement = null; // Suporte a Tap-to-Place acessível

    // Salvar posições originais para o botão reset
    const initialPositions = new Map();
    const allDraggables = container.querySelectorAll('.periodic-draggable-item, .periodic-reorder-card');
    allDraggables.forEach((el) => {
      initialPositions.set(el, {
        parent: el.parentElement,
        nextSibling: el.nextElementSibling
      });
    });

    /**
     * Motor Pointer Events unificado para Mouse e Touch
     */
    function setupPointerEvents(item) {
      item.addEventListener('pointerdown', onPointerDown);

      // Clique para seleção/alocação acessível (Touch friendly)
      item.addEventListener('click', (e) => {
        if (dragMode === 'reorder-paragraphs') return;

        // Se já está numa dropzone e foi clicado, retorna para a pool
        const parentZone = item.closest('.periodic-dropzone-target');
        if (parentZone && sourcePool) {
          sourcePool.appendChild(item);
          syncPlaceholders();
          clearValidationStyles();
          return;
        }

        // Se clicado na pool, marca como selecionado para próximo clique em dropzone
        if (selectedItemForPlacement === item) {
          item.classList.remove('is-selected-item');
          selectedItemForPlacement = null;
        } else {
          container.querySelectorAll('.is-selected-item').forEach((el) => el.classList.remove('is-selected-item'));
          item.classList.add('is-selected-item');
          selectedItemForPlacement = item;
        }
      });
    }

    // Configura clique nas dropzones para alocar item previamente selecionado
    function setupDropzoneClick(zone) {
      zone.addEventListener('click', () => {
        if (!selectedItemForPlacement) return;

        const existingItem = zone.querySelector('.periodic-draggable-item');
        if (existingItem && existingItem !== selectedItemForPlacement && sourcePool) {
          sourcePool.appendChild(existingItem);
        }

        zone.appendChild(selectedItemForPlacement);
        selectedItemForPlacement.classList.remove('is-selected-item');
        selectedItemForPlacement = null;

        syncPlaceholders();
        clearValidationStyles();
      });
    }

    container.querySelectorAll('.periodic-dropzone-target').forEach(setupDropzoneClick);

    function onPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return;

      activeItem = e.currentTarget;
      originalParent = activeItem.parentElement;
      originalNextSibling = activeItem.nextElementSibling;

      const rect = activeItem.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      // Criar clone visual flutuante (Ghost)
      dragClone = activeItem.cloneNode(true);
      dragClone.classList.add('is-dragging', 'periodic-drag-ghost');
      dragClone.style.position = 'fixed';
      dragClone.style.zIndex = '999999';
      dragClone.style.width = `${rect.width}px`;
      dragClone.style.height = `${rect.height}px`;
      dragClone.style.left = `${rect.left}px`;
      dragClone.style.top = `${rect.top}px`;
      dragClone.style.pointerEvents = 'none';
      dragClone.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
      dragClone.style.opacity = '0.92';
      dragClone.style.transform = 'scale(1.05)';
      dragClone.style.transition = 'none';

      document.body.appendChild(dragClone);

      activeItem.style.opacity = '0.25';
      activeItem.classList.add('is-being-dragged');

      try {
        activeItem.setPointerCapture(e.pointerId);
      } catch (err) {}

      activeItem.addEventListener('pointermove', onPointerMove);
      activeItem.addEventListener('pointerup', onPointerUp);
      activeItem.addEventListener('pointercancel', onPointerCancel);

      e.preventDefault();
    }

    function onPointerMove(e) {
      if (!activeItem || !dragClone) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      dragClone.style.left = `${currentX - offsetX}px`;
      dragClone.style.top = `${currentY - offsetY}px`;

      const elemBelow = document.elementFromPoint(currentX, currentY);
      clearHoverStates();

      if (elemBelow) {
        if (dragMode === 'reorder-paragraphs') {
          handleReorderHover(elemBelow, currentY);
        } else {
          handleTokenHover(elemBelow);
        }
      }

      e.preventDefault();
    }

    function handleTokenHover(elemBelow) {
      const dropzone = elemBelow.closest('.periodic-dropzone-target') || elemBelow.closest('.periodic-source-pool');
      if (dropzone && container.contains(dropzone)) {
        currentHoverZone = dropzone;
        dropzone.classList.add('drag-hover');
      } else {
        currentHoverZone = null;
      }
    }

    function handleReorderHover(elemBelow, currentY) {
      const targetCard = elemBelow.closest('.periodic-reorder-card');
      if (targetCard && targetCard !== activeItem && container.contains(targetCard)) {
        const rect = targetCard.getBoundingClientRect();
        const middleY = rect.top + rect.height / 2;
        const parent = targetCard.parentElement;

        if (currentY < middleY) {
          parent.insertBefore(activeItem, targetCard);
        } else {
          parent.insertBefore(activeItem, targetCard.nextElementSibling);
        }
        updateReorderIndexes();
      }
    }

    function onPointerUp(e) {
      if (!activeItem) return;

      const currentTargetItem = activeItem;
      const targetZone = currentHoverZone;

      if (dragMode !== 'reorder-paragraphs') {
        if (targetZone) {
          if (targetZone.classList.contains('periodic-source-pool')) {
            targetZone.appendChild(currentTargetItem);
          } else if (targetZone.classList.contains('periodic-dropzone-target')) {
            const existingItem = targetZone.querySelector('.periodic-draggable-item');
            if (existingItem && existingItem !== currentTargetItem) {
              if (sourcePool) {
                sourcePool.appendChild(existingItem);
              } else if (originalParent) {
                originalParent.appendChild(existingItem);
              }
            }
            targetZone.appendChild(currentTargetItem);
          }
        } else {
          if (originalParent) {
            originalParent.insertBefore(currentTargetItem, originalNextSibling);
          }
        }
      }

      syncPlaceholders();
      clearValidationStyles();

      // Limpeza do ponteiro executada ao final
      cleanupPointer(e);
    }

    function onPointerCancel(e) {
      if (!activeItem) return;
      if (originalParent) {
        originalParent.insertBefore(activeItem, originalNextSibling);
      }
      cleanupPointer(e);
    }

    function cleanupPointer(e) {
      if (dragClone && dragClone.parentNode) {
        dragClone.parentNode.removeChild(dragClone);
      }
      dragClone = null;

      if (activeItem) {
        activeItem.style.opacity = '';
        activeItem.classList.remove('is-being-dragged');
        try {
          if (e && e.pointerId) {
            activeItem.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}
        activeItem.removeEventListener('pointermove', onPointerMove);
        activeItem.removeEventListener('pointerup', onPointerUp);
        activeItem.removeEventListener('pointercancel', onPointerCancel);
      }

      clearHoverStates();
      activeItem = null;
    }

    function clearHoverStates() {
      container.querySelectorAll('.drag-hover').forEach((el) => el.classList.remove('drag-hover'));
      currentHoverZone = null;
    }

    function syncPlaceholders() {
      container.querySelectorAll('.periodic-dropzone-target').forEach((zone) => {
        const placeholder = zone.querySelector('.dropzone-placeholder');
        const hasBadge = zone.querySelector('.periodic-draggable-item');
        if (placeholder) {
          placeholder.style.display = hasBadge ? 'none' : 'block';
        }
        if (hasBadge) {
          zone.classList.add('has-item');
        } else {
          zone.classList.remove('has-item');
        }
      });
    }

    function updateReorderIndexes() {
      const cards = container.querySelectorAll('.periodic-reorder-card');
      cards.forEach((card, idx) => {
        const indexBadge = card.querySelector('.reorder-index');
        if (indexBadge) indexBadge.textContent = idx + 1;
      });
    }

    function clearValidationStyles() {
      container.querySelectorAll('.is-correct, .is-incorrect').forEach((el) => {
        el.classList.remove('is-correct', 'is-incorrect');
      });
      if (feedbackAlert) {
        feedbackAlert.className = 'periodic-feedback-alert';
        feedbackAlert.style.display = 'none';
      }
    }

    container.querySelectorAll('.periodic-draggable-item, .periodic-reorder-card').forEach(setupPointerEvents);

    /**
     * Validação e Animações de Acerto / Erro
     */
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        let total = 0;
        let correct = 0;

        clearValidationStyles();

        if (dragMode === 'reorder-paragraphs') {
          const cards = container.querySelectorAll('.periodic-reorder-card');
          total = cards.length;
          cards.forEach((card, index) => {
            const expectedOrder = parseInt(card.getAttribute('data-correct-order'), 10) || (index + 1);
            const currentPosition = index + 1;
            if (currentPosition === expectedOrder) {
              correct++;
              card.classList.add('is-correct');
            } else {
              card.classList.add('is-incorrect');
            }
          });
        } else {
          const targets = container.querySelectorAll('.periodic-dropzone-target');
          total = targets.length;
          targets.forEach((zone) => {
            const targetId = zone.getAttribute('data-target-id');
            const item = zone.querySelector('.periodic-draggable-item');

            if (item) {
              const expectedTarget = item.getAttribute('data-target-id');
              if (expectedTarget === targetId) {
                correct++;
                item.classList.add('is-correct');
              } else {
                item.classList.add('is-incorrect');
              }
            }
          });
        }

        if (feedbackAlert) {
          feedbackAlert.style.display = 'flex';
          feedbackAlert.classList.add('is-visible');

          const icon = feedbackAlert.querySelector('.feedback-icon') || feedbackAlert;
          const text = feedbackAlert.querySelector('.feedback-text') || feedbackAlert;

          if (correct === total && total > 0) {
            feedbackAlert.className = 'periodic-feedback-alert alert-success is-visible';
            icon.textContent = '🎉';
            text.innerHTML = `<strong>${config.successMessage || 'Excelente!'}</strong> Todos os ${total} itens estão corretos!`;
          } else if (correct > 0) {
            feedbackAlert.className = 'periodic-feedback-alert alert-warning is-visible';
            icon.textContent = '⚠️';
            text.innerHTML = `Você acertou <strong>${correct} de ${total}</strong> itens. Continue tentando!`;
          } else {
            feedbackAlert.className = 'periodic-feedback-alert alert-danger is-visible';
            icon.textContent = '❌';
            text.innerHTML = `<strong>${config.errorMessage || 'Ainda não está certo.'}</strong> Tente reorganizar os itens.`;
          }
        }

        if (resetBtn) {
          resetBtn.style.display = 'inline-flex';
        }
      });
    }

    /**
     * Reset / Tentar Novamente
     */
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        initialPositions.forEach((pos, el) => {
          if (pos.parent) {
            pos.parent.insertBefore(el, pos.nextSibling);
          }
        });

        syncPlaceholders();

        if (dragMode === 'reorder-paragraphs') {
          updateReorderIndexes();
        }

        clearValidationStyles();
        resetBtn.style.display = 'none';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.periodic-dnd-container').forEach(initDragDropEngine);
    });
  } else {
    document.querySelectorAll('.periodic-dnd-container').forEach(initDragDropEngine);
  }

  window.periodicInitDnD = initDragDropEngine;
})();
