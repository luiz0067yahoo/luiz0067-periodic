/**
 * Periodic Interactive Utilities - Frontend Logic (view.js)
 * Real-time date verification, 3D door flip animations, Bootstrap 5 modals,
 * QR code generator, and AR trigger simulator.
 */

(function() {
  'use strict';

  // Helper to format Date to YYYY-MM-DD
  function formatDateYMD(date) {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [
      year,
      month.length < 2 ? '0' + month : month,
      day.length < 2 ? '0' + day : day
    ].join('-');
  }

  // Calculate day difference
  function getDayDifference(dateStr1, dateStr2) {
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    const diffTime = d2.getTime() - d1.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Confetti Particle Generator
  function fireConfetti(originX, originY) {
    const colors = ['#f59e0b', '#38bdf8', '#22c55e', '#ec4899', '#eab308', '#a855f7'];
    const count = 32;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'luiz-confetti-piece';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = `${originX || window.innerWidth / 2}px`;
      piece.style.top = `${originY || window.innerHeight / 2}px`;

      const destX = (Math.random() - 0.5) * 350;
      const destY = (Math.random() - 0.7) * 300;
      piece.style.setProperty('--tx', `${destX}px`);
      piece.style.setProperty('--ty', `${destY}px`);

      document.body.appendChild(piece);
      setTimeout(() => {
        if (piece && piece.parentNode) {
          piece.parentNode.removeChild(piece);
        }
      }, 2000);
    }
  }

  // Initialize QR Code generator
  function initQrCode(container) {
    const qrText = container.dataset.qrText || 'https://github.com/periodic';
    const qrColor = container.dataset.qrColor || '#0d6efd';
    const qrBgColor = container.dataset.qrBgColor || '#ffffff';
    const qrSize = parseInt(container.dataset.qrSize, 10) || 240;
    const targetBox = container.querySelector('.luiz-qr-display-box');

    if (!targetBox) return;

    if (window.QRCode) {
      targetBox.innerHTML = '';
      const qrInstance = new window.QRCode(targetBox, {
        text: qrText,
        width: qrSize,
        height: qrSize,
        colorDark: qrColor,
        colorLight: qrBgColor
      });

      // Download PNG Button
      const btnPng = container.querySelector('.luiz-btn-dl-png');
      if (btnPng) {
        btnPng.addEventListener('click', function() {
          const canvas = targetBox.querySelector('canvas');
          if (canvas) {
            const link = document.createElement('a');
            link.download = 'periodic-qrcode.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
          }
        });
      }

      // Download SVG Button
      const btnSvg = container.querySelector('.luiz-btn-dl-svg');
      if (btnSvg) {
        btnSvg.addEventListener('click', function() {
          if (window.QRCode.generateSVG) {
            const svgContent = window.QRCode.generateSVG(qrText, {
              colorDark: qrColor,
              colorLight: qrBgColor,
              width: qrSize,
              height: qrSize
            });
            const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'periodic-qrcode.svg';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
          }
        });
      }

  // Clipboard copy helper with universal fallback
  function copyTextToClipboard(text, onSuccess) {
    function fallbackCopy(val) {
      const ta = document.createElement('textarea');
      ta.value = val;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
      } catch (err) {}
      document.body.removeChild(ta);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
        fallbackCopy(text);
        onSuccess();
      });
    } else {
      fallbackCopy(text);
      onSuccess();
    }
  }

      // Copy Button
      const btnCopy = container.querySelector('.luiz-btn-copy');
      if (btnCopy) {
        btnCopy.addEventListener('click', function() {
          copyTextToClipboard(qrText, () => {
            const origHtml = btnCopy.innerHTML;
            btnCopy.innerHTML = '<i class="fa-solid fa-check text-success"></i> Copiado!';
            setTimeout(() => {
              btnCopy.innerHTML = origHtml;
            }, 2000);
          });
        });
      }
    }
  }

  // Initialize Advent Calendar logic
  function initAdventCalendar(container) {
    const storageKey = 'periodic_advent_doors_opened';
    let openedDoors = [];
    try {
      openedDoors = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      openedDoors = [];
    }

    const todayStr = formatDateYMD(new Date());
    const testDateInput = container.querySelector('.luiz-test-date-input');
    const dateDisplay = container.querySelector('.luiz-current-date-display');
    const resetBtn = container.querySelector('.luiz-btn-reset-doors');

    let activeDate = todayStr;
    if (testDateInput) {
      testDateInput.value = todayStr;
      testDateInput.addEventListener('change', function(e) {
        activeDate = e.target.value || todayStr;
        refreshDoors();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        if (confirm('Deseja reiniciar o progresso do calendário?')) {
          localStorage.removeItem(storageKey);
          openedDoors = [];
          refreshDoors();
        }
      });
    }

    function refreshDoors() {
      if (dateDisplay) {
        dateDisplay.textContent = `Data Atual: ${activeDate}`;
      }

      const doorCards = container.querySelectorAll('.luiz-door-card');
      doorCards.forEach(card => {
        const day = parseInt(card.dataset.day, 10);
        const unlockDate = card.dataset.unlockDate;
        const statusBadge = card.querySelector('.luiz-door-status-badge');

        const isUnlocked = activeDate >= unlockDate;
        const isOpened = openedDoors.includes(day);

        // Update badge and flip state
        if (isUnlocked) {
          card.classList.remove('is-locked');
          card.classList.add('is-unlocked');

          if (isOpened) {
            card.classList.add('is-flipped');
            if (statusBadge) {
              statusBadge.className = 'luiz-door-status-badge status-opened';
              statusBadge.innerHTML = '<i class="fa-solid fa-check-double"></i> Aberto';
            }
          } else {
            card.classList.remove('is-flipped');
            if (statusBadge) {
              statusBadge.className = 'luiz-door-status-badge status-unlocked';
              statusBadge.innerHTML = '<i class="fa-solid fa-lock-open"></i> Liberado';
            }
          }
        } else {
          card.classList.remove('is-unlocked');
          card.classList.remove('is-flipped');
          card.classList.add('is-locked');
          if (statusBadge) {
            statusBadge.className = 'luiz-door-status-badge status-locked';
            statusBadge.innerHTML = '<i class="fa-solid fa-lock"></i> Trancado';
          }
        }
      });
    }

    // Attach click handler to doors
    const doorCards = container.querySelectorAll('.luiz-door-card');
    doorCards.forEach(card => {
      card.addEventListener('click', function(e) {
        const day = parseInt(card.dataset.day, 10);
        const unlockDate = card.dataset.unlockDate;
        const isUnlocked = activeDate >= unlockDate;
        const modalTargetId = card.getAttribute('data-bs-target');

        if (!isUnlocked) {
          // Locked door behavior: prevent modal opening and shake
          e.preventDefault();
          e.stopPropagation();

          card.classList.remove('shake');
          void card.offsetWidth; // trigger reflow
          card.classList.add('shake');

          const diff = getDayDifference(activeDate, unlockDate);
          const diffText = diff > 0 ? ` Faltam ${diff} dia(s) para o desbloqueio.` : '';
          alert(`🔒 Porta ${day} Trancada!\nEsta surpresa só poderá ser aberta a partir de ${unlockDate}.${diffText}`);
          return false;
        }

        // Unlocked door: flip 3D, record in localStorage and fire celebration!
        if (!openedDoors.includes(day)) {
          openedDoors.push(day);
          try {
            localStorage.setItem(storageKey, JSON.stringify(openedDoors));
          } catch (err) {}

          card.classList.add('is-flipped');
          const rect = card.getBoundingClientRect();
          fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

          const statusBadge = card.querySelector('.luiz-door-status-badge');
          if (statusBadge) {
            statusBadge.className = 'luiz-door-status-badge status-opened';
            statusBadge.innerHTML = '<i class="fa-solid fa-check-double"></i> Aberto';
          }
        }

        // Trigger Bootstrap 5 Modal with universal fallback
        if (modalTargetId) {
          const modalEl = document.querySelector(modalTargetId);
          if (modalEl) {
            if (window.bootstrap && window.bootstrap.Modal) {
              const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
              modalInstance.show();
            } else {
              // Standalone fallback modal
              modalEl.classList.add('luiz-modal-active');
              modalEl.style.display = 'flex';

              const closeElements = modalEl.querySelectorAll('[data-bs-dismiss="modal"], .btn-close');
              const dismissHandler = () => {
                modalEl.style.display = 'none';
                modalEl.classList.remove('luiz-modal-active');
              };
              closeElements.forEach(btn => {
                btn.onclick = dismissHandler;
              });
              modalEl.onclick = (event) => {
                if (event.target === modalEl) dismissHandler();
              };
            }
          }
        }
      });
    });

    refreshDoors();
  }

  // Initialize AR Marker Trigger
  function initArTrigger(container) {
    const hintBtn = container.querySelector('.luiz-btn-toggle-hint');
    const hintText = container.querySelector('.luiz-hint-text');
    const hintBtnText = container.querySelector('.luiz-hint-btn-text');

    if (hintBtn && hintText) {
      hintBtn.addEventListener('click', function() {
        const isShown = hintText.classList.toggle('is-visible');
        if (hintBtnText) {
          hintBtnText.textContent = isShown ? 'Ocultar Dica' : 'Revelar Dica';
        }
      });
    }

    const printBtn = container.querySelector('.luiz-btn-print-marker');
    if (printBtn) {
      printBtn.addEventListener('click', function() {
        window.print();
      });
    }

    const scanBtn = container.querySelector('.luiz-btn-ar-scan');
    if (scanBtn) {
      scanBtn.addEventListener('click', function() {
        alert('📷 Câmera AR Ativada!\nAponte o dispositivo para o marcador HIRO para carregar o modelo holográfico.');
      });
    }
  }

  // Main block initialiser
  function initAllInteractiveBlocks() {
    const containers = document.querySelectorAll('.periodic-interactive-container');
    containers.forEach(container => {
      const type = container.dataset.utilityType;
      if (type === 'qr-code') {
        initQrCode(container);
      } else if (type === 'advent-calendar') {
        initAdventCalendar(container);
      } else if (type === 'ar-trigger') {
        initArTrigger(container);
      }
    });
  }

  // Global access
  window.periodicInitUtilities = initAllInteractiveBlocks;

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllInteractiveBlocks);
  } else {
    initAllInteractiveBlocks();
  }
})();
