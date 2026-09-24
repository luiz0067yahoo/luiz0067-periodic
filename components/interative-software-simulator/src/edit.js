import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
  PanelBody,
  Button,
  TextControl,
  TextareaControl,
  SelectControl,
  RangeControl,
  ToggleControl,
  Card,
  CardBody,
  Notice,
  CheckboxControl
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import { DEFAULT_ABNT_SCENARIO } from './default-data';
import './editor.scss';

export const KEY_OPTIONS = [
  // Teclas Alfanuméricas (A-Z)
  ...('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => ({
    label: `Letra: ${char}`,
    value: char,
    code: `Key${char}`,
    category: 'Alfanuméricas'
  }))),
  // Números (0-9)
  ...('0123456789'.split('').map(digit => ({
    label: `Número: ${digit}`,
    value: digit,
    code: `Digit${digit}`,
    category: 'Alfanuméricas'
  }))),
  // Teclas de Função (F1 - F12)
  ...Array.from({ length: 12 }, (_, i) => ({
    label: `F${i + 1}`,
    value: `F${i + 1}`,
    code: `F${i + 1}`,
    category: 'Teclas de Função'
  })),
  // Teclas de Navegação e Edição
  { label: 'Home', value: 'Home', code: 'Home', category: 'Navegação e Edição' },
  { label: 'End', value: 'End', code: 'End', category: 'Navegação e Edição' },
  { label: 'Delete', value: 'Delete', code: 'Delete', category: 'Navegação e Edição' },
  { label: 'Page Up', value: 'PageUp', code: 'PageUp', category: 'Navegação e Edição' },
  { label: 'Page Down', value: 'PageDown', code: 'PageDown', category: 'Navegação e Edição' },
  { label: 'Seta Acima (Arrow Up)', value: 'ArrowUp', code: 'ArrowUp', category: 'Navegação e Edição' },
  { label: 'Seta Abaixo (Arrow Down)', value: 'ArrowDown', code: 'ArrowDown', category: 'Navegação e Edição' },
  { label: 'Seta Esquerda (Arrow Left)', value: 'ArrowLeft', code: 'ArrowLeft', category: 'Navegação e Edição' },
  { label: 'Seta Direita (Arrow Right)', value: 'ArrowRight', code: 'ArrowRight', category: 'Navegação e Edição' },
  { label: 'Enter', value: 'Enter', code: 'Enter', category: 'Navegação e Edição' },
  { label: 'Tab', value: 'Tab', code: 'Tab', category: 'Navegação e Edição' },
  { label: 'Escape (Esc)', value: 'Escape', code: 'Escape', category: 'Navegação e Edição' },
  { label: 'Espaço (Space)', value: ' ', code: 'Space', category: 'Navegação e Edição' },
  { label: 'Backspace', value: 'Backspace', code: 'Backspace', category: 'Navegação e Edição' }
];

export const MOUSE_ACTION_OPTIONS = [
  { label: 'Botão Primário (Esquerdo)', value: 'click-primary', button: 0 },
  { label: 'Botão Secundário (Direito)', value: 'click-secondary', button: 2 },
  { label: 'Botão do Meio (Scroll Click)', value: 'click-middle', button: 1 },
  { label: 'Rolagem do Scroll para Cima (Scroll Up)', value: 'scroll-up', button: 0 },
  { label: 'Rolagem do Scroll para Baixo (Scroll Down)', value: 'scroll-down', button: 0 }
];

export function getShortcutDisplay(el) {
  const parts = [];
  if (el.ctrlKey) parts.push('Ctrl');
  if (el.shiftKey) parts.push('Shift');
  if (el.altKey) parts.push('Alt');
  const found = KEY_OPTIONS.find(k => k.value === el.key || k.code === el.code);
  const keyLabel = found ? (found.label.includes(': ') ? found.label.split(': ')[1] : found.label) : (el.key || 'T');
  parts.push(keyLabel);
  return parts.join(' + ');
}

export function getMouseActionDisplay(el) {
  const parts = [];
  if (el.ctrlKey) parts.push('Ctrl');
  if (el.shiftKey) parts.push('Shift');
  if (el.altKey) parts.push('Alt');
  const found = MOUSE_ACTION_OPTIONS.find(m => m.value === (el.mouseAction || 'click-primary'));
  parts.push(found ? found.label : 'Botão Primário');
  return parts.join(' + ');
}

const RESIZE_HANDLES_DEF = [
  { dir: 'nw', title: 'Noroeste', style: { top: 0, left: 0, right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', cursor: 'nwse-resize' } },
  { dir: 'n',  title: 'Norte',    style: { top: 0, left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', cursor: 'ns-resize' } },
  { dir: 'ne', title: 'Nordeste', style: { top: 0, right: 0, left: 'auto', bottom: 'auto', transform: 'translate(50%, -50%)', cursor: 'nesw-resize' } },
  { dir: 'e',  title: 'Leste',    style: { top: '50%', right: 0, left: 'auto', bottom: 'auto', transform: 'translate(50%, -50%)', cursor: 'ew-resize' } },
  { dir: 'se', title: 'Sudeste',  style: { bottom: 0, right: 0, top: 'auto', left: 'auto', transform: 'translate(50%, 50%)', cursor: 'nwse-resize' } },
  { dir: 's',  title: 'Sul',      style: { bottom: 0, left: '50%', right: 'auto', top: 'auto', transform: 'translate(-50%, 50%)', cursor: 'ns-resize' } },
  { dir: 'sw', title: 'Sudoeste', style: { bottom: 0, left: 0, right: 'auto', top: 'auto', transform: 'translate(-50%, 50%)', cursor: 'nesw-resize' } },
  { dir: 'w',  title: 'Oeste',    style: { top: '50%', left: 0, right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', cursor: 'ew-resize' } },
];

export default function Edit({ attributes, setAttributes }) {
  const {
    simulatorTitle,
    steps,
    showProgressBar,
    showRestartButton,
    showStepIndicator,
    highlightHints,
    customSuccessMessage
  } = attributes;

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeElementId, setActiveElementId] = useState(null);

  // Initialize with default scenario if empty
  useEffect(() => {
    if (!steps || steps.length === 0) {
      setAttributes({ steps: DEFAULT_ABNT_SCENARIO });
    }
  }, []);

  const getResolvedImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('assets/') && typeof window !== 'undefined' && window.simuladorSoftwareSettings?.pluginUrl) {
      return window.simuladorSoftwareSettings.pluginUrl + url;
    }
    return url;
  };

  // Safe active step
  const currentStep = (steps && steps[activeStepIndex]) ? steps[activeStepIndex] : null;

  // Step operations
  const handleAddStep = () => {
    const newStep = {
      id: `step-${Date.now()}`,
      title: `Passo ${steps.length + 1}`,
      imageUrl: '',
      imageId: null,
      instruction: __('Nova instrução para o usuário.', 'simulador-software-abnt'),
      elements: []
    };
    const updatedSteps = [...steps, newStep];
    setAttributes({ steps: updatedSteps });
    setActiveStepIndex(updatedSteps.length - 1);
  };

  const handleDuplicateStep = (index) => {
    const stepToCopy = steps[index];
    const duplicatedStep = {
      ...JSON.parse(JSON.stringify(stepToCopy)),
      id: `step-${Date.now()}`,
      title: `${stepToCopy.title || 'Passo'} (Cópia)`
    };
    const updatedSteps = [...steps];
    updatedSteps.splice(index + 1, 0, duplicatedStep);
    setAttributes({ steps: updatedSteps });
    setActiveStepIndex(index + 1);
  };

  const handleRemoveStep = (index) => {
    if (steps.length <= 1) {
      alert(__('A simulação deve conter ao menos um passo.', 'simulador-software-abnt'));
      return;
    }
    const updatedSteps = steps.filter((_, i) => i !== index);
    setAttributes({ steps: updatedSteps });
    setActiveStepIndex(Math.max(0, index - 1));
  };

  const handleMoveStep = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= steps.length) return;
    const updatedSteps = [...steps];
    const temp = updatedSteps[index];
    updatedSteps[index] = updatedSteps[targetIndex];
    updatedSteps[targetIndex] = temp;
    setAttributes({ steps: updatedSteps });
    setActiveStepIndex(targetIndex);
  };

  const handleLoadDefaultScenario = () => {
    if (confirm(__('Deseja carregar o cenário padrão da Formatação ABNT no Windows 11?', 'simulador-software-abnt'))) {
      setAttributes({ steps: DEFAULT_ABNT_SCENARIO });
      setActiveStepIndex(0);
      setActiveElementId(null);
    }
  };

  const updateCurrentStep = (fields) => {
    const updatedSteps = steps.map((step, idx) => {
      if (idx === activeStepIndex) {
        return { ...step, ...fields };
      }
      return step;
    });
    setAttributes({ steps: updatedSteps });
  };

  // Element operations
  const handleAddElement = (type = 'click') => {
    if (!currentStep) return;
    let newEl = {
      id: `el-${Date.now()}`,
      type: type,
      top: 40,
      left: type === 'drag' ? 25 : (type === 'keyboard' ? 35 : 40),
      width: type === 'click' ? 12 : (type === 'drag' ? 14 : (type === 'keyboard' ? 26 : 20)),
      height: type === 'click' ? 6 : (type === 'drag' ? 8 : (type === 'keyboard' ? 7 : 5)),
      label: type === 'click'
        ? 'Novo Hotspot de Clique'
        : (type === 'drag' ? 'Novo Item Drag & Drop' : (type === 'keyboard' ? 'Atalho: Ctrl + T' : 'Novo Campo de Digitação')),
      expectedValue: type === 'input' ? 'Word' : '',
      placeholder: type === 'input' ? 'Digite aqui...' : '',
      mouseAction: 'click-primary',
      button: 0,
      ctrlKey: type === 'keyboard' ? true : false,
      shiftKey: false,
      altKey: false,
      key: 'T',
      code: 'KeyT',
      targetStepIndex: activeStepIndex + 1
    };

    if (type === 'drag') {
      newEl = {
        ...newEl,
        dragText: 'Arrastar',
        targetLabel: 'Solte Aqui',
        targetTop: 40,
        targetLeft: 60,
        targetWidth: 16,
        targetHeight: 12
      };
    }

    if (type === 'keyboard') {
      newEl = {
        ...newEl,
        label: 'Atalho: Ctrl + T',
        ctrlKey: true,
        shiftKey: false,
        altKey: false,
        key: 'T',
        code: 'KeyT'
      };
    }

    if (type === 'image') {
      newEl = {
        ...newEl,
        top: 30,
        left: 30,
        width: 18,
        height: 18,
        label: 'Nova Imagem Sobreposta',
        imageUrl: '',
        imageId: null,
        animationType: 'appear',
        animationDuration: 1.5,
        animationDelay: 0.2,
        animationIteration: 'once',
        targetTop: 30,
        targetLeft: 60
      };
    }

    const updatedElements = [...(currentStep.elements || []), newEl];
    updateCurrentStep({ elements: updatedElements });
    setActiveElementId(newEl.id);
  };

  const handleUpdateElement = (elementId, fields) => {
    if (!currentStep) return;
    const updatedElements = (currentStep.elements || []).map((el) => {
      if (el.id === elementId) {
        return { ...el, ...fields };
      }
      return el;
    });
    updateCurrentStep({ elements: updatedElements });
  };

  const handleRemoveElement = (elementId) => {
    if (!currentStep) return;
    const updatedElements = (currentStep.elements || []).filter((el) => el.id !== elementId);
    updateCurrentStep({ elements: updatedElements });
    if (activeElementId === elementId) {
      setActiveElementId(null);
    }
  };

  // Mouse / Pointer Drag & Resize Handlers
  const stageRef = useRef(null);
  const stageCanvasRef = useRef(null);
  const stageScreenRef = useRef(null);
  const [imageRatio, setImageRatio] = useState(16 / 9);
  const [previewAnimationId, setPreviewAnimationId] = useState(null);
  const stepsRef = useRef(steps);
  stepsRef.current = steps;
  const activeIndexRef = useRef(activeStepIndex);
  activeIndexRef.current = activeStepIndex;

  useEffect(() => {
    const url = currentStep?.imageUrl ? getResolvedImageUrl(currentStep.imageUrl) : '';
    if (url) {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          setImageRatio(img.naturalWidth / img.naturalHeight);
        }
      };
      img.src = url;
      if (img.complete && img.naturalWidth) {
        setImageRatio(img.naturalWidth / img.naturalHeight);
      }
    } else {
      setImageRatio(16 / 9);
    }
  }, [currentStep?.imageUrl]);

  const updateEditorStageDimensions = () => {
    if (!stageCanvasRef.current) return;
    const currentRatio = imageRatio || (16 / 9);
    stageCanvasRef.current.style.aspectRatio = `${currentRatio}`;
    stageCanvasRef.current.style.width = '100%';

    const bgImg = stageCanvasRef.current.querySelector('.sim-bg-image');
    if (bgImg) {
      bgImg.style.setProperty('position', 'absolute', 'important');
      bgImg.style.setProperty('top', '0px', 'important');
      bgImg.style.setProperty('left', '0px', 'important');
      bgImg.style.setProperty('right', '0px', 'important');
      bgImg.style.setProperty('bottom', '0px', 'important');
      bgImg.style.setProperty('width', '100%', 'important');
      bgImg.style.setProperty('height', '100%', 'important');
      bgImg.style.setProperty('min-width', '100%', 'important');
      bgImg.style.setProperty('min-height', '100%', 'important');
      bgImg.style.setProperty('max-width', 'none', 'important');
      bgImg.style.setProperty('max-height', 'none', 'important');
      bgImg.style.setProperty('object-fit', 'fill', 'important');
      bgImg.style.setProperty('object-position', '0 0', 'important');
      bgImg.style.setProperty('display', 'block', 'important');
      bgImg.style.setProperty('margin', '0px', 'important');
      bgImg.style.setProperty('padding', '0px', 'important');
      bgImg.style.setProperty('z-index', '1', 'important');
    }

    if (stageRef.current) {
      stageRef.current.style.setProperty('position', 'absolute', 'important');
      stageRef.current.style.setProperty('top', '0px', 'important');
      stageRef.current.style.setProperty('left', '0px', 'important');
      stageRef.current.style.setProperty('right', '0px', 'important');
      stageRef.current.style.setProperty('bottom', '0px', 'important');
      stageRef.current.style.setProperty('width', '100%', 'important');
      stageRef.current.style.setProperty('height', '100%', 'important');
      stageRef.current.style.setProperty('min-width', '100%', 'important');
      stageRef.current.style.setProperty('min-height', '100%', 'important');
      stageRef.current.style.setProperty('z-index', '3', 'important');
      stageRef.current.style.setProperty('pointer-events', 'auto', 'important');
    }
  };

  useEffect(() => {
    updateEditorStageDimensions();

    let ro;
    if (typeof ResizeObserver !== 'undefined' && stageCanvasRef.current) {
      ro = new ResizeObserver(() => {
        updateEditorStageDimensions();
      });
      ro.observe(stageCanvasRef.current);
    }
    const handleResize = () => updateEditorStageDimensions();
    window.addEventListener('resize', handleResize);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [activeStepIndex, currentStep?.imageUrl, imageRatio]);

  const handlePointerDownMove = (e, el) => {
    if (e.button !== 0 && e.buttons !== 1 && e.button !== undefined) return;
    e.stopPropagation();
    e.preventDefault();
    setActiveElementId(el.id);

    const targetEl = stageRef.current || stageCanvasRef.current;
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const stageWidth = rect.width > 0 ? rect.width : (targetEl.offsetWidth || 800);
    const stageHeight = rect.height > 0 ? rect.height : (targetEl.offsetHeight || (stageWidth / (imageRatio || (16 / 9))));
    if (!stageWidth || !stageHeight) return;

    const startX = e.clientX !== undefined ? e.clientX : (e.touches?.[0]?.clientX || 0);
    const startY = e.clientY !== undefined ? e.clientY : (e.touches?.[0]?.clientY || 0);
    const initLeft = el.left;
    const initTop = el.top;
    const elWidth = el.width;
    const elHeight = el.height;

    const doc = e.currentTarget?.ownerDocument || document;
    const win = doc.defaultView || window;

    let rafId = null;
    const onPointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const clientX = moveEvent.clientX !== undefined ? moveEvent.clientX : (moveEvent.touches?.[0]?.clientX || 0);
      const clientY = moveEvent.clientY !== undefined ? moveEvent.clientY : (moveEvent.touches?.[0]?.clientY || 0);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const dx = ((clientX - startX) / stageWidth) * 100;
        const dy = ((clientY - startY) / stageHeight) * 100;

        const newLeft = Math.max(0, Math.min(100, initLeft + dx));
        const newTop = Math.max(0, Math.min(100, initTop + dy));

        const roundedLeft = Math.round(newLeft * 10) / 10;
        const roundedTop = Math.round(newTop * 10) / 10;

        const currentSteps = stepsRef.current || [];
        const currentActiveIdx = activeIndexRef.current;
        const currStep = currentSteps[currentActiveIdx];
        if (!currStep) return;

        const updatedElements = (currStep.elements || []).map((item) => {
          if (item.id === el.id) {
            return { ...item, left: roundedLeft, top: roundedTop };
          }
          return item;
        });

        const updatedSteps = currentSteps.map((s, i) =>
          i === currentActiveIdx ? { ...s, elements: updatedElements } : s
        );
        setAttributes({ steps: updatedSteps });
      });
    };

    const onPointerUp = (upEvent) => {
      if (upEvent && upEvent.preventDefault) upEvent.preventDefault();
      if (rafId) cancelAnimationFrame(rafId);
      doc.removeEventListener('pointermove', onPointerMove);
      doc.removeEventListener('pointerup', onPointerUp);
      doc.removeEventListener('mousemove', onPointerMove);
      doc.removeEventListener('mouseup', onPointerUp);
      win.removeEventListener('pointermove', onPointerMove);
      win.removeEventListener('pointerup', onPointerUp);
      win.removeEventListener('mousemove', onPointerMove);
      win.removeEventListener('mouseup', onPointerUp);
    };

    doc.addEventListener('pointermove', onPointerMove, { passive: false });
    doc.addEventListener('pointerup', onPointerUp);
    doc.addEventListener('mousemove', onPointerMove, { passive: false });
    doc.addEventListener('mouseup', onPointerUp);
    win.addEventListener('pointermove', onPointerMove, { passive: false });
    win.addEventListener('pointerup', onPointerUp);
    win.addEventListener('mousemove', onPointerMove, { passive: false });
    win.addEventListener('mouseup', onPointerUp);
  };

  const handlePointerDownResize = (e, el, handle) => {
    if (e.button !== 0 && e.buttons !== 1 && e.button !== undefined) return;
    e.stopPropagation();
    e.preventDefault();
    setActiveElementId(el.id);

    const targetEl = stageRef.current || stageCanvasRef.current;
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const stageWidth = rect.width > 0 ? rect.width : (targetEl.offsetWidth || 800);
    const stageHeight = rect.height > 0 ? rect.height : (targetEl.offsetHeight || (stageWidth / (imageRatio || (16 / 9))));
    if (!stageWidth || !stageHeight) return;

    const startX = e.clientX !== undefined ? e.clientX : (e.touches?.[0]?.clientX || 0);
    const startY = e.clientY !== undefined ? e.clientY : (e.touches?.[0]?.clientY || 0);
    const initLeft = el.left;
    const initTop = el.top;
    const initW = el.width;
    const initH = el.height;

    const doc = e.currentTarget?.ownerDocument || document;
    const win = doc.defaultView || window;

    let rafId = null;
    const onPointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const clientX = moveEvent.clientX !== undefined ? moveEvent.clientX : (moveEvent.touches?.[0]?.clientX || 0);
      const clientY = moveEvent.clientY !== undefined ? moveEvent.clientY : (moveEvent.touches?.[0]?.clientY || 0);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const dx = ((clientX - startX) / stageWidth) * 100;
        const dy = ((clientY - startY) / stageHeight) * 100;

        let newLeft = initLeft;
        let newTop = initTop;
        let newW = initW;
        let newH = initH;

        if (handle.includes('e')) {
          newW = Math.max(2, Math.min(100 - initLeft, initW + dx));
        } else if (handle.includes('w')) {
          const maxDx = initW - 2;
          const clampedDx = Math.max(-initLeft, Math.min(maxDx, dx));
          newLeft = initLeft + clampedDx;
          newW = initW - clampedDx;
        }

        if (handle.includes('s')) {
          newH = Math.max(2, Math.min(100 - initTop, initH + dy));
        } else if (handle.includes('n')) {
          const maxDy = initH - 2;
          const clampedDy = Math.max(-initTop, Math.min(maxDy, dy));
          newTop = initTop + clampedDy;
          newH = initH - clampedDy;
        }

        const roundedLeft = Math.round(newLeft * 10) / 10;
        const roundedTop = Math.round(newTop * 10) / 10;
        const roundedW = Math.round(newW * 10) / 10;
        const roundedH = Math.round(newH * 10) / 10;

        const currentSteps = stepsRef.current || [];
        const currentActiveIdx = activeIndexRef.current;
        const currStep = currentSteps[currentActiveIdx];
        if (!currStep) return;

        const updatedElements = (currStep.elements || []).map((item) => {
          if (item.id === el.id) {
            return {
              ...item,
              left: roundedLeft,
              top: roundedTop,
              width: roundedW,
              height: roundedH
            };
          }
          return item;
        });

        const updatedSteps = currentSteps.map((s, i) =>
          i === currentActiveIdx ? { ...s, elements: updatedElements } : s
        );
        setAttributes({ steps: updatedSteps });
      });
    };

    const onPointerUp = (upEvent) => {
      if (upEvent && upEvent.preventDefault) upEvent.preventDefault();
      if (rafId) cancelAnimationFrame(rafId);
      doc.removeEventListener('pointermove', onPointerMove);
      doc.removeEventListener('pointerup', onPointerUp);
      doc.removeEventListener('mousemove', onPointerMove);
      doc.removeEventListener('mouseup', onPointerUp);
      win.removeEventListener('pointermove', onPointerMove);
      win.removeEventListener('pointerup', onPointerUp);
      win.removeEventListener('mousemove', onPointerMove);
      win.removeEventListener('mouseup', onPointerUp);
    };

    doc.addEventListener('pointermove', onPointerMove, { passive: false });
    doc.addEventListener('pointerup', onPointerUp);
    doc.addEventListener('mousemove', onPointerMove, { passive: false });
    doc.addEventListener('mouseup', onPointerUp);
    win.addEventListener('pointermove', onPointerMove, { passive: false });
    win.addEventListener('pointerup', onPointerUp);
    win.addEventListener('mousemove', onPointerMove, { passive: false });
    win.addEventListener('mouseup', onPointerUp);
  };

  const handlePointerDownMoveTarget = (e, el) => {
    if (e.button !== 0 && e.buttons !== 1 && e.button !== undefined) return;
    e.stopPropagation();
    e.preventDefault();
    setActiveElementId(el.id);

    const targetEl = stageRef.current || stageCanvasRef.current;
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const stageWidth = rect.width > 0 ? rect.width : (targetEl.offsetWidth || 800);
    const stageHeight = rect.height > 0 ? rect.height : (targetEl.offsetHeight || (stageWidth / (imageRatio || (16 / 9))));
    if (!stageWidth || !stageHeight) return;

    const startX = e.clientX !== undefined ? e.clientX : (e.touches?.[0]?.clientX || 0);
    const startY = e.clientY !== undefined ? e.clientY : (e.touches?.[0]?.clientY || 0);
    const initLeft = el.targetLeft !== undefined ? el.targetLeft : (el.left + 25);
    const initTop = el.targetTop !== undefined ? el.targetTop : el.top;
    const elWidth = el.targetWidth !== undefined ? el.targetWidth : 16;
    const elHeight = el.targetHeight !== undefined ? el.targetHeight : 12;

    const doc = e.currentTarget?.ownerDocument || document;
    const win = doc.defaultView || window;

    let rafId = null;
    const onPointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const clientX = moveEvent.clientX !== undefined ? moveEvent.clientX : (moveEvent.touches?.[0]?.clientX || 0);
      const clientY = moveEvent.clientY !== undefined ? moveEvent.clientY : (moveEvent.touches?.[0]?.clientY || 0);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const dx = ((clientX - startX) / stageWidth) * 100;
        const dy = ((clientY - startY) / stageHeight) * 100;

        const newLeft = Math.max(0, Math.min(100, initLeft + dx));
        const newTop = Math.max(0, Math.min(100, initTop + dy));

        const roundedLeft = Math.round(newLeft * 10) / 10;
        const roundedTop = Math.round(newTop * 10) / 10;

        const currentSteps = stepsRef.current || [];
        const currentActiveIdx = activeIndexRef.current;
        const currStep = currentSteps[currentActiveIdx];
        if (!currStep) return;

        const updatedElements = (currStep.elements || []).map((item) => {
          if (item.id === el.id) {
            return { ...item, targetLeft: roundedLeft, targetTop: roundedTop };
          }
          return item;
        });

        const updatedSteps = currentSteps.map((s, i) =>
          i === currentActiveIdx ? { ...s, elements: updatedElements } : s
        );
        setAttributes({ steps: updatedSteps });
      });
    };

    const onPointerUp = (upEvent) => {
      if (upEvent && upEvent.preventDefault) upEvent.preventDefault();
      if (rafId) cancelAnimationFrame(rafId);
      doc.removeEventListener('pointermove', onPointerMove);
      doc.removeEventListener('pointerup', onPointerUp);
      doc.removeEventListener('mousemove', onPointerMove);
      doc.removeEventListener('mouseup', onPointerUp);
      win.removeEventListener('pointermove', onPointerMove);
      win.removeEventListener('pointerup', onPointerUp);
      win.removeEventListener('mousemove', onPointerMove);
      win.removeEventListener('mouseup', onPointerUp);
    };

    doc.addEventListener('pointermove', onPointerMove, { passive: false });
    doc.addEventListener('pointerup', onPointerUp);
    doc.addEventListener('mousemove', onPointerMove, { passive: false });
    doc.addEventListener('mouseup', onPointerUp);
    win.addEventListener('pointermove', onPointerMove, { passive: false });
    win.addEventListener('pointerup', onPointerUp);
    win.addEventListener('mousemove', onPointerMove, { passive: false });
    win.addEventListener('mouseup', onPointerUp);
  };

  const handlePointerDownResizeTarget = (e, el, handle) => {
    if (e.button !== 0 && e.buttons !== 1 && e.button !== undefined) return;
    e.stopPropagation();
    e.preventDefault();
    setActiveElementId(el.id);

    const targetEl = stageRef.current || stageCanvasRef.current;
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const stageWidth = rect.width > 0 ? rect.width : (targetEl.offsetWidth || 800);
    const stageHeight = rect.height > 0 ? rect.height : (targetEl.offsetHeight || (stageWidth / (imageRatio || (16 / 9))));
    if (!stageWidth || !stageHeight) return;

    const startX = e.clientX !== undefined ? e.clientX : (e.touches?.[0]?.clientX || 0);
    const startY = e.clientY !== undefined ? e.clientY : (e.touches?.[0]?.clientY || 0);
    const initLeft = el.targetLeft !== undefined ? el.targetLeft : (el.left + 25);
    const initTop = el.targetTop !== undefined ? el.targetTop : el.top;
    const initW = el.targetWidth !== undefined ? el.targetWidth : 16;
    const initH = el.targetHeight !== undefined ? el.targetHeight : 12;

    const doc = e.currentTarget?.ownerDocument || document;
    const win = doc.defaultView || window;

    let rafId = null;
    const onPointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const clientX = moveEvent.clientX !== undefined ? moveEvent.clientX : (moveEvent.touches?.[0]?.clientX || 0);
      const clientY = moveEvent.clientY !== undefined ? moveEvent.clientY : (moveEvent.touches?.[0]?.clientY || 0);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const dx = ((clientX - startX) / stageWidth) * 100;
        const dy = ((clientY - startY) / stageHeight) * 100;

        let newLeft = initLeft;
        let newTop = initTop;
        let newW = initW;
        let newH = initH;

        if (handle.includes('e')) {
          newW = Math.max(2, Math.min(100 - initLeft, initW + dx));
        } else if (handle.includes('w')) {
          const maxDx = initW - 2;
          const clampedDx = Math.max(-initLeft, Math.min(maxDx, dx));
          newLeft = initLeft + clampedDx;
          newW = initW - clampedDx;
        }

        if (handle.includes('s')) {
          newH = Math.max(2, Math.min(100 - initTop, initH + dy));
        } else if (handle.includes('n')) {
          const maxDy = initH - 2;
          const clampedDy = Math.max(-initTop, Math.min(maxDy, dy));
          newTop = initTop + clampedDy;
          newH = initH - clampedDy;
        }

        const roundedLeft = Math.round(newLeft * 10) / 10;
        const roundedTop = Math.round(newTop * 10) / 10;
        const roundedW = Math.round(newW * 10) / 10;
        const roundedH = Math.round(newH * 10) / 10;

        const currentSteps = stepsRef.current || [];
        const currentActiveIdx = activeIndexRef.current;
        const currStep = currentSteps[currentActiveIdx];
        if (!currStep) return;

        const updatedElements = (currStep.elements || []).map((item) => {
          if (item.id === el.id) {
            return {
              ...item,
              targetLeft: roundedLeft,
              targetTop: roundedTop,
              targetWidth: roundedW,
              targetHeight: roundedH
            };
          }
          return item;
        });

        const updatedSteps = currentSteps.map((s, i) =>
          i === currentActiveIdx ? { ...s, elements: updatedElements } : s
        );
        setAttributes({ steps: updatedSteps });
      });
    };

    const onPointerUp = (upEvent) => {
      if (upEvent && upEvent.preventDefault) upEvent.preventDefault();
      if (rafId) cancelAnimationFrame(rafId);
      doc.removeEventListener('pointermove', onPointerMove);
      doc.removeEventListener('pointerup', onPointerUp);
      doc.removeEventListener('mousemove', onPointerMove);
      doc.removeEventListener('mouseup', onPointerUp);
      win.removeEventListener('pointermove', onPointerMove);
      win.removeEventListener('pointerup', onPointerUp);
      win.removeEventListener('mousemove', onPointerMove);
      win.removeEventListener('mouseup', onPointerUp);
    };

    doc.addEventListener('pointermove', onPointerMove, { passive: false });
    doc.addEventListener('pointerup', onPointerUp);
    doc.addEventListener('mousemove', onPointerMove, { passive: false });
    doc.addEventListener('mouseup', onPointerUp);
    win.addEventListener('pointermove', onPointerMove, { passive: false });
    win.addEventListener('pointerup', onPointerUp);
    win.addEventListener('mousemove', onPointerMove, { passive: false });
    win.addEventListener('mouseup', onPointerUp);
  };

  const blockProps = useBlockProps({
    className: 'wp-block-custom-simulador-software'
  });

  return (
    <>
      <InspectorControls>
        {/* Painel Geral */}
        <PanelBody title={__('Configurações Gerais do Simulador', 'simulador-software-abnt')} initialOpen={false}>
          <TextControl
            label={__('Título do Simulador', 'simulador-software-abnt')}
            value={simulatorTitle}
            onChange={(val) => setAttributes({ simulatorTitle: val })}
          />
          <ToggleControl
            label={__('Exibir Barra de Progresso', 'simulador-software-abnt')}
            checked={showProgressBar}
            onChange={(val) => setAttributes({ showProgressBar: val })}
          />
          <ToggleControl
            label={__('Exibir Botão de Reiniciar', 'simulador-software-abnt')}
            checked={showRestartButton}
            onChange={(val) => setAttributes({ showRestartButton: val })}
          />
          <ToggleControl
            label={__('Exibir Indicador de Passo', 'simulador-software-abnt')}
            checked={showStepIndicator}
            onChange={(val) => setAttributes({ showStepIndicator: val })}
          />
          <ToggleControl
            label={__('Destacar Áreas com Pulso Sutil', 'simulador-software-abnt')}
            checked={highlightHints}
            onChange={(val) => setAttributes({ highlightHints: val })}
          />
          <TextareaControl
            label={__('Mensagem de Sucesso na Conclusão', 'simulador-software-abnt')}
            value={customSuccessMessage}
            onChange={(val) => setAttributes({ customSuccessMessage: val })}
          />
          <Button
            variant="secondary"
            isDestructive
            onClick={handleLoadDefaultScenario}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {__('Restaurar Cenário Padrão (ABNT)', 'simulador-software-abnt')}
          </Button>
        </PanelBody>

        {/* Gerenciador de Passos */}
        <PanelBody title={__('Gerenciador de Passos (Slides)', 'simulador-software-abnt')} initialOpen={true}>
          <div style={{ marginBottom: '14px' }}>
            {steps && steps.map((step, idx) => (
              <div
                key={step.id || idx}
                className={`sim-inspector-step-item ${idx === activeStepIndex ? 'is-active-step' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
              >
                <div className="sim-step-info">
                  <span>{idx + 1}.</span>
                  <span>{step.title || `Passo ${idx + 1}`}</span>
                </div>
                <div className="sim-step-actions" onClick={(e) => e.stopPropagation()}>
                  <Button
                    icon="arrow-up-alt2"
                    isSmall
                    disabled={idx === 0}
                    onClick={() => handleMoveStep(idx, -1)}
                    title={__('Subir', 'simulador-software-abnt')}
                  />
                  <Button
                    icon="arrow-down-alt2"
                    isSmall
                    disabled={idx === steps.length - 1}
                    onClick={() => handleMoveStep(idx, 1)}
                    title={__('Descer', 'simulador-software-abnt')}
                  />
                  <Button
                    icon="admin-page"
                    isSmall
                    onClick={() => handleDuplicateStep(idx)}
                    title={__('Duplicar', 'simulador-software-abnt')}
                  />
                  <Button
                    icon="trash"
                    isSmall
                    isDestructive
                    onClick={() => handleRemoveStep(idx)}
                    title={__('Remover', 'simulador-software-abnt')}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="primary"
            onClick={handleAddStep}
            icon="plus"
            style={{ width: '100%' }}
          >
            {__('Adicionar Novo Passo', 'simulador-software-abnt')}
          </Button>
        </PanelBody>

        {/* Configurações do Passo Selecionado */}
        {currentStep && (
          <PanelBody
            title={`${__('Configurar Passo', 'simulador-software-abnt')} ${activeStepIndex + 1}: ${currentStep.title || ''}`}
            initialOpen={true}
          >
            <TextControl
              label={__('Título do Passo', 'simulador-software-abnt')}
              value={currentStep.title || ''}
              onChange={(val) => updateCurrentStep({ title: val })}
            />

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                {__('Imagem de Fundo (Print do Software)', 'simulador-software-abnt')}
              </label>
              {currentStep.imageUrl ? (
                <div>
                  <img
                    src={getResolvedImageUrl(currentStep.imageUrl)}
                    alt={currentStep.title}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(media) => updateCurrentStep({ imageUrl: media.url, imageId: media.id })}
                        allowedTypes={['image']}
                        value={currentStep.imageId}
                        render={({ open }) => (
                          <Button variant="secondary" isSmall onClick={open}>
                            {__('Alterar Imagem', 'simulador-software-abnt')}
                          </Button>
                        )}
                      />
                    </MediaUploadCheck>
                    <Button
                      variant="link"
                      isDestructive
                      isSmall
                      onClick={() => updateCurrentStep({ imageUrl: '', imageId: null })}
                    >
                      {__('Remover', 'simulador-software-abnt')}
                    </Button>
                  </div>
                </div>
              ) : (
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => updateCurrentStep({ imageUrl: media.url, imageId: media.id })}
                    allowedTypes={['image']}
                    value={currentStep.imageId}
                    render={({ open }) => (
                      <Button variant="secondary" onClick={open} icon="upload" style={{ width: '100%' }}>
                        {__('Selecionar Imagem da Biblioteca', 'simulador-software-abnt')}
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
              )}
            </div>

            {/* Configuração de Áudio do Passo */}
            <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#0f172a', marginBottom: '6px' }}>
                {__('🔊 Áudio do Passo (Executa ao iniciar o slide)', 'simulador-software-abnt')}
              </label>
              {currentStep.audioUrl ? (
                <div>
                  <audio
                    controls
                    src={getResolvedImageUrl(currentStep.audioUrl)}
                    style={{ width: '100%', height: '36px', marginBottom: '8px' }}
                  />
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(media) => updateCurrentStep({ audioUrl: media.url, audioId: media.id })}
                        allowedTypes={['audio']}
                        value={currentStep.audioId}
                        render={({ open }) => (
                          <Button variant="secondary" isSmall onClick={open}>
                            {__('Alterar Áudio', 'simulador-software-abnt')}
                          </Button>
                        )}
                      />
                    </MediaUploadCheck>
                    <Button
                      variant="link"
                      isDestructive
                      isSmall
                      onClick={() => updateCurrentStep({ audioUrl: '', audioId: null })}
                    >
                      {__('Remover Áudio', 'simulador-software-abnt')}
                    </Button>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <ToggleControl
                      label={__('Auto-executar ao entrar neste slide', 'simulador-software-abnt')}
                      checked={currentStep.audioAutoPlay !== false}
                      onChange={(val) => updateCurrentStep({ audioAutoPlay: val })}
                    />
                  </div>
                </div>
              ) : (
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => updateCurrentStep({ audioUrl: media.url, audioId: media.id, audioAutoPlay: true })}
                    allowedTypes={['audio']}
                    value={currentStep.audioId}
                    render={({ open }) => (
                      <Button variant="secondary" onClick={open} icon="format-audio" style={{ width: '100%' }}>
                        {__('Selecionar Áudio da Biblioteca', 'simulador-software-abnt')}
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
              )}
              <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', marginBottom: 0 }}>
                {__('Reproduz narração ou efeito sonoro ao exibir este passo.', 'simulador-software-abnt')}
              </p>
            </div>

            <TextareaControl
              label={__('Texto de Instrução para o Aluno', 'simulador-software-abnt')}
              value={currentStep.instruction || ''}
              onChange={(val) => updateCurrentStep({ instruction: val })}
              rows={3}
              help={__('Exibido no rodapé flutuante da simulação.', 'simulador-software-abnt')}
            />
          </PanelBody>
        )}

        {/* Gerenciador de Elementos Interativos */}
        {currentStep && (
          <PanelBody
            title={`${__('Camadas Interativas do Passo', 'simulador-software-abnt')} (${(currentStep.elements || []).length})`}
            initialOpen={true}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '14px' }}>
              <Button
                variant="secondary"
                icon="admin-links"
                onClick={() => handleAddElement('click')}
                style={{ padding: '6px 4px', fontSize: '11px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36px' }}
                title={__('Adicionar Hotspot de Clique / Mouse', 'simulador-software-abnt')}
              >
                {__('+ Clique', 'simulador-software-abnt')}
              </Button>
              <Button
                variant="secondary"
                icon="edit"
                onClick={() => handleAddElement('input')}
                style={{ padding: '6px 4px', fontSize: '11px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36px' }}
                title={__('Adicionar Campo de Digitação', 'simulador-software-abnt')}
              >
                {__('+ Input', 'simulador-software-abnt')}
              </Button>
              <Button
                variant="secondary"
                icon="move"
                onClick={() => handleAddElement('drag')}
                style={{ padding: '6px 4px', fontSize: '11px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36px' }}
                title={__('Adicionar Drag & Drop', 'simulador-software-abnt')}
              >
                {__('+ Drag', 'simulador-software-abnt')}
              </Button>
              <Button
                variant="secondary"
                icon="format-image"
                onClick={() => handleAddElement('image')}
                style={{ padding: '6px 4px', fontSize: '11px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36px' }}
                title={__('Adicionar Imagem Sobreposta com Animação', 'simulador-software-abnt')}
              >
                {__('+ Imagem', 'simulador-software-abnt')}
              </Button>
              <Button
                variant="secondary"
                icon="keyboard"
                onClick={() => handleAddElement('keyboard')}
                style={{ padding: '6px 4px', fontSize: '11px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36px', gridColumn: 'span 2', background: '#fffbeb', borderColor: '#fde68a', color: '#b45309' }}
                title={__('Adicionar Evento / Atalho Exclusivo de Teclado', 'simulador-software-abnt')}
              >
                {__('⌨️ + Teclado', 'simulador-software-abnt')}
              </Button>
            </div>

            {(currentStep.elements || []).map((el, elIdx) => {
              const isSelected = el.id === activeElementId;
              return (
                <div
                  key={el.id || elIdx}
                  className={`sim-inspector-element-card ${isSelected ? 'is-active-element' : ''}`}
                  onClick={() => setActiveElementId(el.id)}
                >
                  <div className="sim-element-header">
                    <strong>
                      {el.type === 'click' ? '🎯 Clique: ' : (el.type === 'drag' ? '✋ Drag: ' : (el.type === 'image' ? '🖼️ Imagem: ' : (el.type === 'keyboard' ? '⌨️ Teclado: ' : '✏️ Input: ')))}
                      {el.label || `Elemento ${elIdx + 1}`}
                    </strong>
                    <Button
                      icon="trash"
                      isSmall
                      isDestructive
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveElement(el.id);
                      }}
                      title={__('Remover Elemento', 'simulador-software-abnt')}
                    />
                  </div>

                  <TextControl
                    label={__('Rótulo / Identificador', 'simulador-software-abnt')}
                    value={el.label || ''}
                    onChange={(val) => handleUpdateElement(el.id, { label: val })}
                  />

                  <SelectControl
                    label={__('Tipo de Interação', 'simulador-software-abnt')}
                    value={el.type}
                    options={[
                      { label: __('Área de Clique / Mouse (Hotspot)', 'simulador-software-abnt'), value: 'click' },
                      { label: __('Caixa de Texto (Input com Enter)', 'simulador-software-abnt'), value: 'input' },
                      { label: __('Arrastar e Soltar (Drag and Drop)', 'simulador-software-abnt'), value: 'drag' },
                      { label: __('Imagem Sobreposta (Animação)', 'simulador-software-abnt'), value: 'image' },
                      { label: __('Atalho de Teclado (Evento de Teclado)', 'simulador-software-abnt'), value: 'keyboard' }
                    ]}
                    onChange={(val) => handleUpdateElement(el.id, { type: val })}
                  />

                  {el.type === 'click' && (
                    <div style={{ marginTop: '10px', padding: '10px', background: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe', marginBottom: '12px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#1d4ed8', display: 'block', marginBottom: '8px' }}>
                        {__('🖱️ Ação do Mouse & Modificadores', 'simulador-software-abnt')}
                      </label>
                      <SelectControl
                        label={__('Tipo de Ação do Mouse', 'simulador-software-abnt')}
                        value={el.mouseAction || 'click-primary'}
                        options={MOUSE_ACTION_OPTIONS.map(opt => ({ label: opt.label, value: opt.value }))}
                        onChange={(val) => {
                          const opt = MOUSE_ACTION_OPTIONS.find(o => o.value === val);
                          handleUpdateElement(el.id, {
                            mouseAction: val,
                            button: opt ? opt.button : 0
                          });
                        }}
                      />
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginTop: '6px', marginBottom: '4px' }}>
                        {__('Teclas Modificadoras Requeridas:', 'simulador-software-abnt')}
                      </label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                        <CheckboxControl
                          label="Ctrl"
                          checked={!!el.ctrlKey}
                          onChange={(val) => handleUpdateElement(el.id, { ctrlKey: val })}
                        />
                        <CheckboxControl
                          label="Shift"
                          checked={!!el.shiftKey}
                          onChange={(val) => handleUpdateElement(el.id, { shiftKey: val })}
                        />
                        <CheckboxControl
                          label="Alt"
                          checked={!!el.altKey}
                          onChange={(val) => handleUpdateElement(el.id, { altKey: val })}
                        />
                      </div>
                      <div style={{ padding: '6px 8px', background: '#ffffff', borderRadius: '4px', border: '1px solid #93c5fd', fontSize: '11px', color: '#1e3a8a' }}>
                        {__('Pré-visualização da Ação:', 'simulador-software-abnt')} <strong>{getMouseActionDisplay(el)}</strong>
                      </div>
                    </div>
                  )}

                  {el.type === 'keyboard' && (
                    <div style={{ marginTop: '10px', padding: '10px', background: '#fffbeb', borderRadius: '6px', border: '1px solid #fde68a', marginBottom: '12px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#b45309', display: 'block', marginBottom: '8px' }}>
                        {__('⌨️ Configuração do Atalho de Teclado', 'simulador-software-abnt')}
                      </label>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        {__('Teclas Modificadoras (Combine uma ou mais):', 'simulador-software-abnt')}
                      </label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                        <CheckboxControl
                          label="Ctrl"
                          checked={!!el.ctrlKey}
                          onChange={(val) => {
                            const updated = { ...el, ctrlKey: val };
                            handleUpdateElement(el.id, {
                              ctrlKey: val,
                              label: `Atalho: ${getShortcutDisplay(updated)}`
                            });
                          }}
                        />
                        <CheckboxControl
                          label="Shift"
                          checked={!!el.shiftKey}
                          onChange={(val) => {
                            const updated = { ...el, shiftKey: val };
                            handleUpdateElement(el.id, {
                              shiftKey: val,
                              label: `Atalho: ${getShortcutDisplay(updated)}`
                            });
                          }}
                        />
                        <CheckboxControl
                          label="Alt"
                          checked={!!el.altKey}
                          onChange={(val) => {
                            const updated = { ...el, altKey: val };
                            handleUpdateElement(el.id, {
                              altKey: val,
                              label: `Atalho: ${getShortcutDisplay(updated)}`
                            });
                          }}
                        />
                      </div>

                      <SelectControl
                        label={__('Tecla Principal:', 'simulador-software-abnt')}
                        value={el.key || 'T'}
                        options={KEY_OPTIONS.map(k => ({
                          label: `[${k.category}] ${k.label}`,
                          value: k.value
                        }))}
                        onChange={(val) => {
                          const found = KEY_OPTIONS.find(k => k.value === val);
                          const updated = {
                            ...el,
                            key: val,
                            code: found ? found.code : `Key${val.toUpperCase()}`
                          };
                          handleUpdateElement(el.id, {
                            key: val,
                            code: found ? found.code : `Key${val.toUpperCase()}`,
                            label: `Atalho: ${getShortcutDisplay(updated)}`
                          });
                        }}
                      />

                      <div style={{ marginTop: '8px', padding: '8px 10px', background: '#1e293b', borderRadius: '6px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{__('Pré-visualização:', 'simulador-software-abnt')}</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#fbbf24', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                          {getShortcutDisplay(el)}
                        </span>
                      </div>

                      <p style={{ margin: '8px 0 0 0', fontSize: '10px', color: '#78350f', lineHeight: 1.4 }}>
                        {__('💡 Exemplos suportados: Ctrl + C, Ctrl + T, Alt + A, Shift + Seta Direita, F1..F12, Shift + Delete, Ctrl + Home, Ctrl + End, Shift + Page Up, Ctrl + Shift + Alt + T.', 'simulador-software-abnt')}
                      </p>
                    </div>
                  )}

                  {el.type === 'drag' && (
                    <>
                      <TextControl
                        label={__('Texto do Item Arrastável', 'simulador-software-abnt')}
                        value={el.dragText || ''}
                        placeholder={__('Ex: Arraste até o destino', 'simulador-software-abnt')}
                        onChange={(val) => handleUpdateElement(el.id, { dragText: val })}
                      />
                      <TextControl
                        label={__('Texto da Área de Destino (Drop)', 'simulador-software-abnt')}
                        value={el.targetLabel || ''}
                        placeholder={__('Ex: Solte Aqui', 'simulador-software-abnt')}
                        onChange={(val) => handleUpdateElement(el.id, { targetLabel: val })}
                      />
                      <div style={{ marginTop: '10px', padding: '10px', background: '#f5f3ff', borderRadius: '6px', border: '1px solid #ddd6fe' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#6d28d9', display: 'block', marginBottom: '8px' }}>
                          {__('🎯 Área de Destino do Drop (%)', 'simulador-software-abnt')}
                        </label>
                        <RangeControl
                          label={__('Destino Topo (Top %)', 'simulador-software-abnt')}
                          value={el.targetTop !== undefined ? el.targetTop : el.top}
                          onChange={(val) => handleUpdateElement(el.id, { targetTop: Number(val) })}
                          min={0}
                          max={100}
                          step={0.1}
                        />
                        <RangeControl
                          label={__('Destino Esquerda (Left %)', 'simulador-software-abnt')}
                          value={el.targetLeft !== undefined ? el.targetLeft : (el.left + 25)}
                          onChange={(val) => handleUpdateElement(el.id, { targetLeft: Number(val) })}
                          min={0}
                          max={100}
                          step={0.1}
                        />
                        <RangeControl
                          label={__('Destino Largura (Width %)', 'simulador-software-abnt')}
                          value={el.targetWidth !== undefined ? el.targetWidth : 16}
                          onChange={(val) => handleUpdateElement(el.id, { targetWidth: Number(val) })}
                          min={1}
                          max={100}
                          step={0.1}
                        />
                        <RangeControl
                          label={__('Destino Altura (Height %)', 'simulador-software-abnt')}
                          value={el.targetHeight !== undefined ? el.targetHeight : 12}
                          onChange={(val) => handleUpdateElement(el.id, { targetHeight: Number(val) })}
                          min={1}
                          max={100}
                          step={0.1}
                        />
                      </div>
                    </>
                  )}

                  {el.type === 'input' && (
                    <>
                      <TextControl
                        label={__('Valor Esperado (Correto)', 'simulador-software-abnt')}
                        value={el.expectedValue || ''}
                        onChange={(val) => handleUpdateElement(el.id, { expectedValue: val })}
                        help={__('Ex: "Word", "3", "2". A verificação não diferencia maiúsculas/minúsculas.', 'simulador-software-abnt')}
                      />
                      <TextControl
                        label={__('Texto do Placeholder', 'simulador-software-abnt')}
                        value={el.placeholder || ''}
                        onChange={(val) => handleUpdateElement(el.id, { placeholder: val })}
                      />
                    </>
                  )}

                  {el.type === 'image' && (
                    <>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '6px' }}>
                          {__('Imagem Sobreposta (PNG, SVG, etc.)', 'simulador-software-abnt')}
                        </label>
                        {el.imageUrl ? (
                          <div>
                            <img
                              src={getResolvedImageUrl(el.imageUrl)}
                              alt={el.label}
                              style={{ width: '100%', maxHeight: '100px', objectFit: 'contain', background: '#f8fafc', borderRadius: '4px', border: '1px solid #cbd5e1', padding: '6px' }}
                            />
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                              <MediaUploadCheck>
                                <MediaUpload
                                  onSelect={(media) => handleUpdateElement(el.id, { imageUrl: media.url, imageId: media.id })}
                                  allowedTypes={['image']}
                                  value={el.imageId}
                                  render={({ open }) => (
                                    <Button variant="secondary" isSmall onClick={open}>
                                      {__('Alterar Imagem', 'simulador-software-abnt')}
                                    </Button>
                                  )}
                                />
                              </MediaUploadCheck>
                              <Button
                                variant="link"
                                isDestructive
                                isSmall
                                onClick={() => handleUpdateElement(el.id, { imageUrl: '', imageId: null })}
                              >
                                {__('Remover', 'simulador-software-abnt')}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <MediaUploadCheck>
                            <MediaUpload
                              onSelect={(media) => handleUpdateElement(el.id, { imageUrl: media.url, imageId: media.id })}
                              allowedTypes={['image']}
                              value={el.imageId}
                              render={({ open }) => (
                                <Button variant="secondary" onClick={open} icon="format-image" style={{ width: '100%' }}>
                                  {__('Selecionar Imagem da Biblioteca', 'simulador-software-abnt')}
                                </Button>
                              )}
                            />
                          </MediaUploadCheck>
                        )}
                      </div>

                      <SelectControl
                        label={__('Efeito / Transição de Animação', 'simulador-software-abnt')}
                        value={el.animationType || 'appear'}
                        options={[
                          { label: '✨ Surgir (Fade & Pop)', value: 'appear' },
                          { label: '🚀 Mover Ponto a Ponto', value: 'move' },
                          { label: '🔍 Aumentar de Tamanho (Zoom/Pulso)', value: 'zoom' },
                          { label: '🔄 Girar (Rotação 360°)', value: 'rotate' },
                          { label: '📐 Inclinar (Perspectiva / Skew)', value: 'skew' },
                          { label: '🌟 Combinado (Surgir + Aumentar + Girar)', value: 'combined' },
                        ]}
                        onChange={(val) => handleUpdateElement(el.id, { animationType: val })}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <RangeControl
                          label={__('Duração (s)', 'simulador-software-abnt')}
                          value={el.animationDuration !== undefined ? el.animationDuration : 1.5}
                          onChange={(val) => handleUpdateElement(el.id, { animationDuration: Number(val) })}
                          min={0.2}
                          max={10}
                          step={0.1}
                        />
                        <RangeControl
                          label={__('Atraso / Delay (s)', 'simulador-software-abnt')}
                          value={el.animationDelay !== undefined ? el.animationDelay : 0.2}
                          onChange={(val) => handleUpdateElement(el.id, { animationDelay: Number(val) })}
                          min={0}
                          max={5}
                          step={0.1}
                        />
                      </div>

                      <SelectControl
                        label={__('Repetição da Animação', 'simulador-software-abnt')}
                        value={el.animationIteration || 'once'}
                        options={[
                          { label: 'Executar 1 vez ao entrar no slide', value: 'once' },
                          { label: 'Repetir continuamente (Loop)', value: 'infinite' }
                        ]}
                        onChange={(val) => handleUpdateElement(el.id, { animationIteration: val })}
                      />

                      {el.animationType === 'move' && (
                        <div style={{ marginTop: '10px', padding: '10px', background: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#1d4ed8', display: 'block', marginBottom: '8px' }}>
                            {__('🏁 Ponto B: Destino do Movimento (%)', 'simulador-software-abnt')}
                          </label>
                          <RangeControl
                            label={__('Destino Topo (Top %)', 'simulador-software-abnt')}
                            value={el.targetTop !== undefined ? el.targetTop : el.top}
                            onChange={(val) => handleUpdateElement(el.id, { targetTop: Number(val) })}
                            min={0}
                            max={100}
                            step={0.1}
                          />
                          <RangeControl
                            label={__('Destino Esquerda (Left %)', 'simulador-software-abnt')}
                            value={el.targetLeft !== undefined ? el.targetLeft : (el.left + 25)}
                            onChange={(val) => handleUpdateElement(el.id, { targetLeft: Number(val) })}
                            min={0}
                            max={100}
                            step={0.1}
                          />
                        </div>
                      )}

                      <Button
                        variant="secondary"
                        icon="controls-play"
                        onClick={() => {
                          setPreviewAnimationId(null);
                          setTimeout(() => setPreviewAnimationId(el.id), 50);
                        }}
                        style={{ width: '100%', marginTop: '6px', marginBottom: '8px', justifyContent: 'center' }}
                      >
                        {__('▶ Testar Animação no Editor', 'simulador-software-abnt')}
                      </Button>
                    </>
                  )}

                  <div style={{ marginTop: '10px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' }}>
                      {__('Coordenadas Responsivas (%)', 'simulador-software-abnt')}
                    </label>
                    <RangeControl
                      label={__('Topo (Top %)', 'simulador-software-abnt')}
                      value={el.top}
                      onChange={(val) => handleUpdateElement(el.id, { top: Number(val) })}
                      min={0}
                      max={100}
                      step={0.1}
                    />
                    <RangeControl
                      label={__('Esquerda (Left %)', 'simulador-software-abnt')}
                      value={el.left}
                      onChange={(val) => handleUpdateElement(el.id, { left: Number(val) })}
                      min={0}
                      max={100}
                      step={0.1}
                    />
                    <RangeControl
                      label={__('Largura (Width %)', 'simulador-software-abnt')}
                      value={el.width}
                      onChange={(val) => handleUpdateElement(el.id, { width: Number(val) })}
                      min={1}
                      max={100}
                      step={0.1}
                    />
                    <RangeControl
                      label={__('Altura (Height %)', 'simulador-software-abnt')}
                      value={el.height}
                      onChange={(val) => handleUpdateElement(el.id, { height: Number(val) })}
                      min={1}
                      max={100}
                      step={0.1}
                    />
                  </div>

                  {el.type !== 'image' && (
                    <SelectControl
                      label={__('Ao Acertar, Avançar Para', 'simulador-software-abnt')}
                      value={el.targetStepIndex !== undefined ? el.targetStepIndex : activeStepIndex + 1}
                      options={[
                        ...steps.map((st, i) => ({
                          label: `${__('Passo', 'simulador-software-abnt')} ${i + 1}: ${st.title || ''}`,
                          value: i
                        })),
                        { label: __('Concluir Simulação (Tela Final)', 'simulador-software-abnt'), value: -1 }
                      ]}
                      onChange={(val) => handleUpdateElement(el.id, { targetStepIndex: Number(val) })}
                    />
                  )}
                </div>
              );
            })}
          </PanelBody>
        )}
      </InspectorControls>

      {/* Editor Main Canvas */}
      <div {...blockProps}>
        <div className="sim-editor-container is-selected">
          {/* Top Quick Navigation Bar */}
          <div className="sim-editor-steps-nav">
            <span className="sim-nav-label">{__('Passos:', 'simulador-software-abnt')}</span>
            {steps && steps.map((step, idx) => (
              <button
                type="button"
                key={step.id || idx}
                className={`sim-nav-btn ${idx === activeStepIndex ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveStepIndex(idx);
                  setActiveElementId(null);
                }}
              >
                <span>{idx + 1}. {step.title || `Passo ${idx + 1}`}</span>
              </button>
            ))}
            <button
              type="button"
              className="sim-nav-add-btn"
              onClick={handleAddStep}
              title={__('Adicionar Passo', 'simulador-software-abnt')}
            >
              + {__('Novo', 'simulador-software-abnt')}
            </button>
          </div>

          {/* Canvas Preview */}
          {currentStep ? (
            <div className="sim-player-wrapper">
              {/* Header */}
              <div className="sim-header-bar">
                <div className="sim-title-group">
                  <div className="sim-window-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="sim-header-title">{simulatorTitle}</span>
                </div>
                <div className="sim-header-controls">
                  <span className="sim-step-badge">
                    {__('Passo', 'simulador-software-abnt')} {activeStepIndex + 1} / {steps.length}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="sim-progress-track">
                <div
                  className="sim-progress-fill"
                  style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
                ></div>
              </div>

              {/* Stage */}
              <div
                className="sim-stage-canvas"
                ref={stageCanvasRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: `${imageRatio || (16 / 9)}`,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  display: 'block'
                }}
              >
                {currentStep.imageUrl ? (
                  <>
                    <img
                      className="sim-bg-image"
                      src={getResolvedImageUrl(currentStep.imageUrl)}
                      alt={currentStep.title || 'Cenário do Passo'}
                      onLoad={(e) => {
                        if (e.target.naturalWidth && e.target.naturalHeight) {
                          const r = e.target.naturalWidth / e.target.naturalHeight;
                          setImageRatio(r);
                        }
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        minWidth: '100%',
                        minHeight: '100%',
                        maxWidth: 'none',
                        maxHeight: 'none',
                        objectFit: 'fill',
                        objectPosition: '0 0',
                        display: 'block',
                        margin: 0,
                        padding: 0,
                        zIndex: 1,
                        boxSizing: 'border-box'
                      }}
                    />
                    {/* Overlaid Interactive Elements */}
                    <div
                      className="sim-elements-layer"
                      ref={stageRef}
                      onClick={() => setActiveElementId(null)}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        minWidth: '100%',
                        minHeight: '100%',
                        maxWidth: 'none',
                        maxHeight: 'none',
                        margin: 0,
                        padding: 0,
                        zIndex: 3,
                        boxSizing: 'border-box',
                        pointerEvents: 'auto'
                      }}
                    >
                      {/* Render Drop Zones first behind draggable items */}
                      {(currentStep.elements || []).map((el, elIdx) => {
                        if (el.type !== 'drag') return null;
                        const isSelected = el.id === activeElementId;
                        const tTop = el.targetTop !== undefined ? el.targetTop : el.top;
                        const tLeft = el.targetLeft !== undefined ? el.targetLeft : (el.left + 25);
                        const tWidth = el.targetWidth !== undefined ? el.targetWidth : 16;
                        const tHeight = el.targetHeight !== undefined ? el.targetHeight : 12;
                        return (
                          <div
                            key={`dropzone-${el.id || elIdx}`}
                            className={`sim-editor-drop-zone ${isSelected ? 'is-zone-selected' : ''}`}
                            style={{
                              position: 'absolute',
                              top: `${tTop}%`,
                              left: `${tLeft}%`,
                              width: `${tWidth}%`,
                              height: `${tHeight}%`,
                              border: isSelected ? '2px solid #8b5cf6' : '2px dashed #8b5cf6',
                              background: isSelected ? 'rgba(139, 92, 246, 0.28)' : 'rgba(139, 92, 246, 0.15)',
                              boxShadow: isSelected ? '0 0 16px rgba(139, 92, 246, 0.6)' : 'none',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              pointerEvents: 'auto',
                              cursor: 'move',
                              touchAction: 'none',
                              userSelect: 'none',
                              zIndex: isSelected ? 45 : 16,
                              boxSizing: 'border-box'
                            }}
                            onPointerDown={(e) => {
                              if (e.target.classList.contains('sim-resize-handle')) return;
                              handlePointerDownMoveTarget(e, el);
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            draggable={false}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveElementId(el.id);
                            }}
                            title={__('Área de Destino (Clique e arraste para mover, ou use os pontos para redimensionar)', 'simulador-software-abnt')}
                          >
                            {/* Barra para mover a Área de Destino */}
                            <div
                              className="sim-element-move-handle sim-zone-move-handle"
                              style={{
                                position: 'absolute',
                                top: '-26px',
                                left: 0,
                                height: '24px',
                                background: '#7c3aed',
                                color: '#ffffff',
                                padding: '0 8px',
                                borderRadius: '4px 4px 0 0',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                cursor: 'move',
                                userSelect: 'none',
                                boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.35)',
                                zIndex: 9990,
                                touchAction: 'none',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'auto',
                                fontSize: '11px',
                                fontWeight: 700,
                                lineHeight: '24px'
                              }}
                              onPointerDown={(e) => {
                                e.stopPropagation();
                                handlePointerDownMoveTarget(e, el);
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              draggable={false}
                              title={__('Clique e arraste para posicionar o Destino', 'simulador-software-abnt')}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="12"
                                height="12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ pointerEvents: 'none', flexShrink: 0 }}
                              >
                                <polyline points="5 9 2 12 5 15"></polyline>
                                <polyline points="9 5 12 2 15 5"></polyline>
                                <polyline points="15 19 12 22 9 19"></polyline>
                                <polyline points="19 9 22 12 19 15"></polyline>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <line x1="12" y1="2" x2="12" y2="22"></line>
                              </svg>
                              <span className="sim-move-text" style={{ fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                                📥 {el.targetLabel || __('Destino', 'simulador-software-abnt')}
                              </span>
                            </div>

                            <span
                              className="sim-drop-zone-badge"
                              style={{
                                background: '#7c3aed',
                                color: '#ffffff',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: 700,
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              📥 {el.targetLabel || __('Solte Aqui', 'simulador-software-abnt')}
                            </span>

                            {/* Badge de coordenadas do Destino ao estar selecionado */}
                            {isSelected && (
                              <span
                                className="sim-coords-badge sim-zone-coords-badge"
                                style={{
                                  position: 'absolute',
                                  bottom: 'calc(100% + 28px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: '#1e1b4b',
                                  color: '#c4b5fd',
                                  border: '1px solid rgba(167, 139, 250, 0.5)',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontFamily: 'monospace',
                                  fontWeight: 700,
                                  whiteSpace: 'nowrap',
                                  pointerEvents: 'none',
                                  zIndex: 9995,
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                                }}
                              >
                                📥 Destino: X: {Number(tLeft).toFixed(1)}% Y: {Number(tTop).toFixed(1)}% | L: {Number(tWidth).toFixed(1)}% A: {Number(tHeight).toFixed(1)}%
                              </span>
                            )}

                            {/* 8 Pontos de redimensionamento da Área de Destino */}
                            {isSelected && RESIZE_HANDLES_DEF.map((h) => (
                              <div
                                key={h.dir}
                                className={`sim-resize-handle handle-${h.dir}`}
                                style={{
                                  position: 'absolute',
                                  width: '12px',
                                  height: '12px',
                                  background: '#ffffff',
                                  border: '2px solid #7c3aed',
                                  borderRadius: '3px',
                                  boxShadow: '0 1px 6px rgba(0, 0, 0, 0.5)',
                                  zIndex: 9999,
                                  pointerEvents: 'auto',
                                  userSelect: 'none',
                                  touchAction: 'none',
                                  boxSizing: 'border-box',
                                  ...h.style
                                }}
                                onPointerDown={(e) => handlePointerDownResizeTarget(e, el, h.dir)}
                                onMouseDown={(e) => e.stopPropagation()}
                                onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                draggable={false}
                                title={__(`Redimensionar Destino (${h.title})`, 'simulador-software-abnt')}
                              />
                            ))}
                          </div>
                        );
                      })}

                      {/* Render Image Destination Zones for point-to-point move */}
                      {(currentStep.elements || []).map((el, elIdx) => {
                        if (el.type !== 'image' || el.animationType !== 'move') return null;
                        const isSelected = el.id === activeElementId;
                        const tTop = el.targetTop !== undefined ? el.targetTop : el.top;
                        const tLeft = el.targetLeft !== undefined ? el.targetLeft : (el.left + 25);
                        const tWidth = el.width || 18;
                        const tHeight = el.height || 18;
                        return (
                          <div
                            key={`imagetarget-${el.id || elIdx}`}
                            className={`sim-image-target-zone ${isSelected ? 'is-target-selected' : ''}`}
                            style={{
                              position: 'absolute',
                              top: `${tTop}%`,
                              left: `${tLeft}%`,
                              width: `${tWidth}%`,
                              height: `${tHeight}%`,
                              border: isSelected ? '2px solid #0284c7' : '2px dashed #0284c7',
                              background: isSelected ? 'rgba(2, 132, 199, 0.28)' : 'rgba(2, 132, 199, 0.15)',
                              boxShadow: isSelected ? '0 0 14px rgba(2, 132, 199, 0.5)' : 'none',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              pointerEvents: 'auto',
                              cursor: 'move',
                              touchAction: 'none',
                              userSelect: 'none',
                              zIndex: isSelected ? 44 : 15,
                              boxSizing: 'border-box'
                            }}
                            onPointerDown={(e) => {
                              if (e.target.classList.contains('sim-resize-handle')) return;
                              handlePointerDownMoveTarget(e, el);
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            draggable={false}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveElementId(el.id);
                            }}
                            title={__('Ponto B (Destino da Animação). Clique e arraste para reposicionar.', 'simulador-software-abnt')}
                          >
                            <div
                              className="sim-image-target-handle"
                              style={{
                                position: 'absolute',
                                top: '-24px',
                                left: 0,
                                height: '22px',
                                background: '#0284c7',
                                color: '#ffffff',
                                padding: '0 8px',
                                borderRadius: '4px 4px 0 0',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                cursor: 'move',
                                userSelect: 'none',
                                boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.25)',
                                zIndex: 9990,
                                touchAction: 'none',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'auto',
                                fontSize: '10px',
                                fontWeight: 700
                              }}
                              onPointerDown={(e) => {
                                e.stopPropagation();
                                handlePointerDownMoveTarget(e, el);
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                              onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              draggable={false}
                              title={__('Clique e arraste para posicionar o Destino', 'simulador-software-abnt')}
                            >
                              <span className="sim-move-text" style={{ fontSize: '10px', fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                                🏁 {__('Destino do Movimento', 'simulador-software-abnt')}
                              </span>
                            </div>

                            <span
                              className="sim-target-badge"
                              style={{
                                background: '#0284c7',
                                color: '#ffffff',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '10px',
                                fontWeight: 700,
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none'
                              }}
                            >
                              🏁 {__('Ponto B (Fim)', 'simulador-software-abnt')}
                            </span>

                            {isSelected && (
                              <span
                                className="sim-coords-badge sim-zone-coords-badge"
                                style={{
                                  position: 'absolute',
                                  bottom: 'calc(100% + 26px)',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  background: '#0f172a',
                                  color: '#38bdf8',
                                  border: '1px solid rgba(56, 189, 248, 0.4)',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  fontSize: '10px',
                                  fontFamily: 'monospace',
                                  fontWeight: 700,
                                  whiteSpace: 'nowrap',
                                  pointerEvents: 'none',
                                  zIndex: 9995,
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                                }}
                              >
                                🏁 Destino: X: {Number(tLeft).toFixed(1)}% Y: {Number(tTop).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        );
                      })}

                      {(currentStep.elements || []).map((el, elIdx) => {
                        const isSelected = el.id === activeElementId;
                        const isPreviewing = previewAnimationId === el.id;
                        return (
                          <div
                            key={el.id || elIdx}
                            className={`sim-editor-overlay-element type-${el.type} ${isSelected ? 'is-element-selected' : ''} ${isPreviewing ? `sim-anim-preview anim-${el.animationType || 'appear'}` : ''}`}
                            style={{
                              top: `${el.top}%`,
                              left: `${el.left}%`,
                              width: `${el.width}%`,
                              height: `${el.height}%`,
                              ...(isPreviewing ? {
                                '--anim-duration': `${el.animationDuration !== undefined ? el.animationDuration : 1.5}s`,
                                '--anim-delay': `${el.animationDelay !== undefined ? el.animationDelay : 0.2}s`,
                                ...(el.animationType === 'move' ? {
                                  '--move-tx': `${((((el.targetLeft !== undefined ? el.targetLeft : el.left + 25) - el.left) / (el.width || 1)) * 100)}%`,
                                  '--move-ty': `${((((el.targetTop !== undefined ? el.targetTop : el.top) - el.top) / (el.height || 1)) * 100)}%`,
                                } : {})
                              } : {})
                            }}
                            onPointerDown={(e) => {
                              if (e.target.classList.contains('sim-resize-handle')) return;
                              handlePointerDownMove(e, el);
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            draggable={false}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveElementId(el.id);
                            }}
                            title={__('Arraste para mover. Use os pontos ao redor para redimensionar.', 'simulador-software-abnt')}
                          >
                            {/* 4-way arrow move handle bar (Drag & Drop) */}
                            <div
                              className="sim-element-move-handle"
                              onPointerDown={(e) => handlePointerDownMove(e, el)}
                              onMouseDown={(e) => e.stopPropagation()}
                              onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                              draggable={false}
                              title={__('Clique e arraste para posicionar', 'simulador-software-abnt')}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="5 9 2 12 5 15"></polyline>
                                <polyline points="9 5 12 2 15 5"></polyline>
                                <polyline points="15 19 12 22 9 19"></polyline>
                                <polyline points="19 9 22 12 19 15"></polyline>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <line x1="12" y1="2" x2="12" y2="22"></line>
                              </svg>
                              <span className="sim-move-text">
                                {el.type === 'click' ? '🎯 Mover Clique' : (el.type === 'drag' ? '✋ Mover Drag' : (el.type === 'image' ? '🖼️ Mover Imagem' : (el.type === 'keyboard' ? '⌨️ Mover Atalho' : '⌨️ Mover Input')))}
                              </span>
                            </div>

                            <span className="sim-element-badge">
                              {el.type === 'click' ? `🎯 ${getMouseActionDisplay(el)}` : (el.type === 'drag' ? '✋ ' : (el.type === 'image' ? '🖼️ ' : (el.type === 'keyboard' ? `⌨️ ${getShortcutDisplay(el)}` : '⌨️ ')))}
                              {el.type !== 'click' && el.type !== 'keyboard' && (el.label || `${el.type} (${el.left.toFixed(1)}%, ${el.top.toFixed(1)}%)`)}
                            </span>

                            {el.type === 'keyboard' && (
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'rgba(245, 158, 11, 0.15)', border: '1px dashed #f59e0b', borderRadius: '4px', padding: '2px', boxSizing: 'border-box' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#b45309', fontFamily: 'monospace' }}>
                                  ⌨️ {getShortcutDisplay(el)}
                                </span>
                              </div>
                            )}

                            {el.type === 'image' && (
                              el.imageUrl ? (
                                <img
                                  src={getResolvedImageUrl(el.imageUrl)}
                                  alt={el.label}
                                  style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                                />
                              ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'rgba(2, 132, 199, 0.08)', color: '#0284c7', fontSize: '10px', textAlign: 'center', padding: '2px', boxSizing: 'border-box' }}>
                                  <span style={{ fontSize: '18px', lineHeight: 1 }}>🖼️</span>
                                  <span>{__('Sem imagem', 'simulador-software-abnt')}</span>
                                </div>
                              )
                            )}

                            {isSelected && (
                              <>
                                <span className="sim-coords-badge">
                                  {el.type === 'click' ? '🎯 Clique' : (el.type === 'drag' ? '✋ Drag' : (el.type === 'image' ? '🖼️ Imagem' : (el.type === 'keyboard' ? '⌨️ Atalho' : '⌨️ Input')))}: X: {el.left.toFixed(1)}% Y: {el.top.toFixed(1)}% | L: {el.width.toFixed(1)}% A: {el.height.toFixed(1)}%
                                </span>

                                {/* 8 Resize Handles */}
                                {RESIZE_HANDLES_DEF.map((h) => {
                                  const handleColor = el.type === 'click' ? '#2563eb' : (el.type === 'input' ? '#059669' : (el.type === 'drag' ? '#7c3aed' : (el.type === 'keyboard' ? '#d97706' : '#0284c7')));
                                  return (
                                    <div
                                      key={h.dir}
                                      className={`sim-resize-handle handle-${h.dir}`}
                                      style={{
                                        position: 'absolute',
                                        width: '12px',
                                        height: '12px',
                                        background: '#ffffff',
                                        border: `2px solid ${handleColor}`,
                                        borderRadius: '3px',
                                        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.45)',
                                        zIndex: 9999,
                                        pointerEvents: 'auto',
                                        userSelect: 'none',
                                        touchAction: 'none',
                                        boxSizing: 'border-box',
                                        ...h.style
                                      }}
                                      onPointerDown={(e) => handlePointerDownResize(e, el, h.dir)}
                                      onMouseDown={(e) => e.stopPropagation()}
                                      onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                      draggable={false}
                                      title={__(`Redimensionar (${h.title})`, 'simulador-software-abnt')}
                                    />
                                  );
                                })}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#94a3b8' }}>
                    <p style={{ fontSize: '16px', fontWeight: 600 }}>
                      {__('Nenhuma imagem selecionada para este passo.', 'simulador-software-abnt')}
                    </p>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(media) => updateCurrentStep({ imageUrl: media.url, imageId: media.id })}
                        allowedTypes={['image']}
                        render={({ open }) => (
                          <Button variant="primary" onClick={open}>
                            {__('Carregar Imagem de Fundo', 'simulador-software-abnt')}
                          </Button>
                        )}
                      />
                    </MediaUploadCheck>
                  </div>
                )}
              </div>

              {/* Instruction Bar */}
              <div className="sim-instruction-bar">
                <div className="sim-instruction-content">
                  <div className="sim-instruction-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <p className="sim-instruction-text">
                    {currentStep.instruction || __('Insira uma instrução para orientar o aluno.', 'simulador-software-abnt')}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="sim-editor-empty-state">
              <h3>{__('Nenhum passo criado ainda.', 'simulador-software-abnt')}</h3>
              <Button variant="primary" onClick={handleLoadDefaultScenario}>
                {__('Carregar Cenário Padrão (ABNT Windows 11)', 'simulador-software-abnt')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
