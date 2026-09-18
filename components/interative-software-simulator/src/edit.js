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
  Notice
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import { DEFAULT_ABNT_SCENARIO } from './default-data';
import './editor.scss';

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
      left: type === 'drag' ? 25 : 40,
      width: type === 'click' ? 12 : (type === 'drag' ? 14 : 20),
      height: type === 'click' ? 6 : (type === 'drag' ? 8 : 5),
      label: type === 'click'
        ? 'Novo Hotspot de Clique'
        : (type === 'drag' ? 'Novo Item Drag & Drop' : 'Novo Campo de Digitação'),
      expectedValue: type === 'input' ? 'Word' : '',
      placeholder: type === 'input' ? 'Digite aqui...' : '',
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
  const bgImageRef = useRef(null);
  const stepsRef = useRef(steps);
  stepsRef.current = steps;
  const activeIndexRef = useRef(activeStepIndex);
  activeIndexRef.current = activeStepIndex;

  const updateEditorStageDimensions = () => {
    if (!stageCanvasRef.current || !stageScreenRef.current) return;
    const canvasWidth = stageCanvasRef.current.clientWidth;
    const canvasHeight = stageCanvasRef.current.clientHeight;
    if (!canvasWidth || !canvasHeight) return;

    let ar = 16 / 9;
    const img = bgImageRef.current;
    if (img && img.naturalWidth && img.naturalHeight) {
      ar = img.naturalWidth / img.naturalHeight;
    }

    let fitWidth = canvasWidth;
    let fitHeight = canvasWidth / ar;

    if (fitHeight > canvasHeight) {
      fitHeight = canvasHeight;
      fitWidth = canvasHeight * ar;
    }

    const wStr = `${Math.round(fitWidth * 100) / 100}px`;
    const hStr = `${Math.round(fitHeight * 100) / 100}px`;

    stageScreenRef.current.style.width = wStr;
    stageScreenRef.current.style.height = hStr;
    stageScreenRef.current.style.maxWidth = wStr;
    stageScreenRef.current.style.maxHeight = hStr;
    stageScreenRef.current.style.aspectRatio = `${ar}`;
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
  }, [activeStepIndex, currentStep?.imageUrl]);

  const handlePointerDownMove = (e, el) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    setActiveElementId(el.id);

    const target = e.currentTarget;
    const pointerId = e.pointerId;
    try {
      target.setPointerCapture(pointerId);
    } catch (err) {}

    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initLeft = el.left;
    const initTop = el.top;
    const elWidth = el.width;
    const elHeight = el.height;

    const onPointerMove = (moveEvent) => {
      if (moveEvent.pointerId !== pointerId) return;
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const dx = ((moveEvent.clientX - startX) / rect.width) * 100;
      const dy = ((moveEvent.clientY - startY) / rect.height) * 100;

      const newLeft = Math.max(0, Math.min(100 - elWidth, initLeft + dx));
      const newTop = Math.max(0, Math.min(100 - elHeight, initTop + dy));

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
    };

    const onPointerUp = (upEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      try {
        if (target.hasPointerCapture(pointerId)) {
          target.releasePointerCapture(pointerId);
        }
      } catch (err) {}
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerup', onPointerUp);
      target.removeEventListener('pointercancel', onPointerUp);
    };

    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerup', onPointerUp);
    target.addEventListener('pointercancel', onPointerUp);
  };

  const handlePointerDownResize = (e, el, handle) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    setActiveElementId(el.id);

    const target = e.currentTarget;
    const pointerId = e.pointerId;
    try {
      target.setPointerCapture(pointerId);
    } catch (err) {}

    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initLeft = el.left;
    const initTop = el.top;
    const initW = el.width;
    const initH = el.height;

    const onPointerMove = (moveEvent) => {
      if (moveEvent.pointerId !== pointerId) return;
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const dx = ((moveEvent.clientX - startX) / rect.width) * 100;
      const dy = ((moveEvent.clientY - startY) / rect.height) * 100;

      let newLeft = initLeft;
      let newTop = initTop;
      let newW = initW;
      let newH = initH;

      // Horizontal adjustments
      if (handle.includes('e')) {
        newW = Math.max(2, Math.min(100 - initLeft, initW + dx));
      } else if (handle.includes('w')) {
        const maxDx = initW - 2;
        const clampedDx = Math.max(-initLeft, Math.min(maxDx, dx));
        newLeft = initLeft + clampedDx;
        newW = initW - clampedDx;
      }

      // Vertical adjustments
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
    };

    const onPointerUp = (upEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      try {
        if (target.hasPointerCapture(pointerId)) {
          target.releasePointerCapture(pointerId);
        }
      } catch (err) {}
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerup', onPointerUp);
      target.removeEventListener('pointercancel', onPointerUp);
    };

    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerup', onPointerUp);
    target.addEventListener('pointercancel', onPointerUp);
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '14px' }}>
              <Button
                variant="secondary"
                icon="admin-links"
                onClick={() => handleAddElement('click')}
                style={{ padding: '6px 4px', fontSize: '11px', display: 'flex', justifyContent: 'center' }}
              >
                {__('+ Clique', 'simulador-software-abnt')}
              </Button>
              <Button
                variant="secondary"
                icon="edit"
                onClick={() => handleAddElement('input')}
                style={{ padding: '6px 4px', fontSize: '11px', display: 'flex', justifyContent: 'center' }}
              >
                {__('+ Input', 'simulador-software-abnt')}
              </Button>
              <Button
                variant="secondary"
                icon="move"
                onClick={() => handleAddElement('drag')}
                style={{ padding: '6px 4px', fontSize: '11px', display: 'flex', justifyContent: 'center' }}
              >
                {__('+ Drag & Drop', 'simulador-software-abnt')}
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
                      {el.type === 'click' ? '🎯 Clique: ' : (el.type === 'drag' ? '✋ Drag & Drop: ' : '⌨️ Input: ')}
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
                      { label: __('Área de Clique (Hotspot)', 'simulador-software-abnt'), value: 'click' },
                      { label: __('Caixa de Texto (Input com Enter)', 'simulador-software-abnt'), value: 'input' },
                      { label: __('Arrastar e Soltar (Drag and Drop)', 'simulador-software-abnt'), value: 'drag' }
                    ]}
                    onChange={(val) => handleUpdateElement(el.id, { type: val })}
                  />

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
              <div className="sim-stage-canvas" ref={stageCanvasRef}>
                {currentStep.imageUrl ? (
                  <div className="sim-stage-screen" ref={stageScreenRef}>
                    <img
                      ref={bgImageRef}
                      src={getResolvedImageUrl(currentStep.imageUrl)}
                      alt={currentStep.title}
                      className="sim-bg-image"
                      onLoad={updateEditorStageDimensions}
                    />

                    {/* Overlaid Interactive Elements */}
                    <div
                      className="sim-elements-layer"
                      ref={stageRef}
                      onClick={() => setActiveElementId(null)}
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
                              top: `${tTop}%`,
                              left: `${tLeft}%`,
                              width: `${tWidth}%`,
                              height: `${tHeight}%`,
                            }}
                            title={__('Área de Destino (Drop Zone)', 'simulador-software-abnt')}
                          >
                            <span className="sim-drop-zone-badge">
                              📥 {el.targetLabel || 'Solte Aqui'}
                            </span>
                          </div>
                        );
                      })}

                      {(currentStep.elements || []).map((el, elIdx) => {
                        const isSelected = el.id === activeElementId;
                        return (
                          <div
                            key={el.id || elIdx}
                            className={`sim-editor-overlay-element type-${el.type} ${isSelected ? 'is-element-selected' : ''}`}
                            style={{
                              top: `${el.top}%`,
                              left: `${el.left}%`,
                              width: `${el.width}%`,
                              height: `${el.height}%`,
                            }}
                            onPointerDown={(e) => handlePointerDownMove(e, el)}
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
                                {el.type === 'click' ? '🎯 Mover Clique' : (el.type === 'drag' ? '✋ Mover Drag' : '⌨️ Mover Input')}
                              </span>
                            </div>

                            <span className="sim-element-badge">
                              {el.type === 'click' ? '🎯 ' : (el.type === 'drag' ? '✋ ' : '⌨️ ')}
                              {el.label || `${el.type} (${el.left.toFixed(1)}%, ${el.top.toFixed(1)}%)`}
                            </span>

                            {isSelected && (
                              <>
                                <span className="sim-coords-badge">
                                  {el.type === 'click' ? '🎯 Clique' : (el.type === 'drag' ? '✋ Drag' : '⌨️ Input')}: X: {el.left.toFixed(1)}% Y: {el.top.toFixed(1)}% | L: {el.width.toFixed(1)}% A: {el.height.toFixed(1)}%
                                </span>

                                {/* 8 Resize Handles */}
                                <div
                                  className="sim-resize-handle handle-nw"
                                  onPointerDown={(e) => handlePointerDownResize(e, el, 'nw')}
                                  title={__('Redimensionar (Noroeste)', 'simulador-software-abnt')}
                                />
                                <div
                                  className="sim-resize-handle handle-n"
                                  onPointerDown={(e) => handlePointerDownResize(e, el, 'n')}
                                  title={__('Redimensionar (Norte)', 'simulador-software-abnt')}
                                />
                                <div
                                  className="sim-resize-handle handle-ne"
                                  onPointerDown={(e) => handlePointerDownResize(e, el, 'ne')}
                                  title={__('Redimensionar (Nordeste)', 'simulador-software-abnt')}
                                />
                                <div
                                  className="sim-resize-handle handle-e"
                                  onPointerDown={(e) => handlePointerDownResize(e, el, 'e')}
                                  title={__('Redimensionar (Leste)', 'simulador-software-abnt')}
                                />
                                <div
                                  className="sim-resize-handle handle-se"
                                  onPointerDown={(e) => handlePointerDownResize(e, el, 'se')}
                                  title={__('Redimensionar (Sudeste)', 'simulador-software-abnt')}
                                />
                                <div
                                  className="sim-resize-handle handle-s"
                                  onPointerDown={(e) => handlePointerDownResize(e, el, 's')}
                                  title={__('Redimensionar (Sul)', 'simulador-software-abnt')}
                                />
                                <div
                                  className="sim-resize-handle handle-sw"
                                  onPointerDown={(e) => handlePointerDownResize(e, el, 'sw')}
                                  title={__('Redimensionar (Sudoeste)', 'simulador-software-abnt')}
                                />
                                <div
                                  className="sim-resize-handle handle-w"
                                  onPointerDown={(e) => handlePointerDownResize(e, el, 'w')}
                                  title={__('Redimensionar (Oeste)', 'simulador-software-abnt')}
                                />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
