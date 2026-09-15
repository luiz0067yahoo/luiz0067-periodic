import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  TextControl,
  TextareaControl,
  ColorPicker,
  RangeControl,
  ToggleControl,
  Button
} from '@wordpress/components';
import { useState, useEffect, useMemo } from '@wordpress/element';

// Fallback generator for QR Code in editor if library is not global
function getQrSvgMarkup(text, color, bgColor, size) {
  if (typeof window !== 'undefined' && window.QRCode && window.QRCode.generateSVG) {
    return window.QRCode.generateSVG(text, { colorDark: color, colorLight: bgColor, width: size, height: size });
  }
  // Simple fallback SVG visual if qrcode object is initializing
  return `<svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <rect x="20" y="20" width="40" height="40" fill="${color}"/>
    <rect x="25" y="25" width="30" height="30" fill="${bgColor}"/>
    <rect x="30" y="30" width="20" height="20" fill="${color}"/>
    <rect x="140" y="20" width="40" height="40" fill="${color}"/>
    <rect x="145" y="25" width="30" height="30" fill="${bgColor}"/>
    <rect x="150" y="30" width="20" height="20" fill="${color}"/>
    <rect x="20" y="140" width="40" height="40" fill="${color}"/>
    <rect x="25" y="145" width="30" height="30" fill="${bgColor}"/>
    <rect x="30" y="150" width="20" height="20" fill="${color}"/>
    <rect x="80" y="40" width="20" height="40" fill="${color}"/>
    <rect x="80" y="100" width="40" height="20" fill="${color}"/>
    <rect x="140" y="90" width="20" height="20" fill="${color}"/>
    <rect x="100" y="140" width="40" height="40" fill="${color}"/>
    <text x="100" y="105" font-family="sans-serif" font-size="10" fill="${color}" text-anchor="middle">QR CODE</text>
  </svg>`;
}

const DEFAULT_DOOR_ICONS = [
  'fa-gift', 'fa-star', 'fa-bell', 'fa-snowflake', 'fa-tree', 'fa-cookie-bite',
  'fa-candy-cane', 'fa-sleigh', 'fa-snowman', 'fa-mistletoe', 'fa-ribbon', 'fa-gem',
  'fa-trophy', 'fa-crown', 'fa-medal', 'fa-key', 'fa-magic', 'fa-wand-magic-sparkles',
  'fa-rocket', 'fa-heart', 'fa-bolt', 'fa-compass', 'fa-lightbulb', 'fa-champagne-glasses'
];

export default function Edit({ attributes, setAttributes }) {
  const {
    utilityType,
    qrText,
    qrColor,
    qrBgColor,
    qrSize,
    calendarTitle,
    calendarSubtitle,
    calendarDoors,
    calendarYear,
    arMarkerType,
    arClueTitle,
    arClueHint,
    arInstructions
  } = attributes;

  const [activeTab, setActiveTab] = useState(utilityType || 'advent-calendar');
  const [testDate, setTestDate] = useState('2026-12-15');
  const [flippedDoor, setFlippedDoor] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // Initialize 24 doors if empty
  useEffect(() => {
    if (!calendarDoors || calendarDoors.length === 0) {
      const year = calendarYear || 2026;
      const initialDoors = Array.from({ length: 24 }, (_, i) => {
        const day = i + 1;
        const dayStr = day < 10 ? `0${day}` : `${day}`;
        return {
          dayNumber: day,
          unlockDate: `${year}-12-${dayStr}`,
          title: `Surpresa do Dia ${day}`,
          contentHtml: `<p>Parabéns por abrir o <strong>Dia ${day}</strong> do Calendário do Advento! Aqui está o seu conteúdo exclusivo e dicas do ecossistema periodic.</p>`,
          isLockedByDefault: true,
          icon: DEFAULT_DOOR_ICONS[i % DEFAULT_DOOR_ICONS.length]
        };
      });
      setAttributes({ calendarDoors: initialDoors });
    }
  }, [calendarDoors, calendarYear]);

  // Sync tab with utilityType
  const handleTypeChange = (type) => {
    setActiveTab(type);
    setAttributes({ utilityType: type });
  };

  const blockProps = useBlockProps({
    className: 'periodic-interactive-container'
  });

  const qrSvgHtml = useMemo(() => {
    return getQrSvgMarkup(qrText, qrColor, qrBgColor, qrSize || 240);
  }, [qrText, qrColor, qrBgColor, qrSize]);

  // Check if door is unlocked based on test date
  const isDoorUnlocked = (unlockDate) => {
    return testDate >= unlockDate;
  };

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={__('Tipo de Utilitário', 'periodic-interactive-utilities')} initialOpen={true}>
          <SelectControl
            label={__('Selecione o Utilitário', 'periodic-interactive-utilities')}
            value={utilityType}
            options={[
              { label: __('Calendário do Advento (24 Dias)', 'periodic-interactive-utilities'), value: 'advent-calendar' },
              { label: __('Gerador de QR Code Dinâmico', 'periodic-interactive-utilities'), value: 'qr-code' },
              { label: __('Pistas com Marcador AR (Realidade Aumentada)', 'periodic-interactive-utilities'), value: 'ar-trigger' }
            ]}
            onChange={handleTypeChange}
          />
        </PanelBody>

        {utilityType === 'qr-code' && (
          <PanelBody title={__('Configurações do QR Code', 'periodic-interactive-utilities')} initialOpen={true}>
            <TextControl
              label={__('Conteúdo / URL', 'periodic-interactive-utilities')}
              value={qrText}
              onChange={(val) => setAttributes({ qrText: val })}
              placeholder="https://..."
            />
            <RangeControl
              label={__('Tamanho em Pixels', 'periodic-interactive-utilities')}
              value={qrSize || 240}
              onChange={(val) => setAttributes({ qrSize: val })}
              min={120}
              max={400}
              step={10}
            />
            <div style={{ marginTop: '1rem' }}>
              <label><strong>{__('Cor dos Módulos (Frente)', 'periodic-interactive-utilities')}</strong></label>
              <ColorPicker
                color={qrColor}
                onChangeComplete={(color) => setAttributes({ qrColor: color.hex })}
                disableAlpha
              />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label><strong>{__('Cor de Fundo', 'periodic-interactive-utilities')}</strong></label>
              <ColorPicker
                color={qrBgColor}
                onChangeComplete={(color) => setAttributes({ qrBgColor: color.hex })}
                disableAlpha
              />
            </div>
          </PanelBody>
        )}

        {utilityType === 'advent-calendar' && (
          <PanelBody title={__('Configurações do Calendário', 'periodic-interactive-utilities')} initialOpen={true}>
            <TextControl
              label={__('Título Principal', 'periodic-interactive-utilities')}
              value={calendarTitle}
              onChange={(val) => setAttributes({ calendarTitle: val })}
            />
            <TextareaControl
              label={__('Subtítulo Descritivo', 'periodic-interactive-utilities')}
              value={calendarSubtitle}
              onChange={(val) => setAttributes({ calendarSubtitle: val })}
            />
            <TextControl
              label={__('Simular Data no Editor (YYYY-MM-DD)', 'periodic-interactive-utilities')}
              value={testDate}
              onChange={setTestDate}
              help={__('Altere a data para testar o desbloqueio das portas no editor.', 'periodic-interactive-utilities')}
            />
          </PanelBody>
        )}

        {utilityType === 'ar-trigger' && (
          <PanelBody title={__('Configurações do Marcador AR', 'periodic-interactive-utilities')} initialOpen={true}>
            <SelectControl
              label={__('Tipo de Marcador', 'periodic-interactive-utilities')}
              value={arMarkerType}
              options={[
                { label: 'Padrão HIRO', value: 'hiro' },
                { label: 'Padrão KANJI', value: 'kanji' },
                { label: 'QR Code de Rastreamento', value: 'custom-qr' }
              ]}
              onChange={(val) => setAttributes({ arMarkerType: val })}
            />
            <TextControl
              label={__('Título da Pista', 'periodic-interactive-utilities')}
              value={arClueTitle}
              onChange={(val) => setAttributes({ arClueTitle: val })}
            />
            <TextareaControl
              label={__('Dica da Pista', 'periodic-interactive-utilities')}
              value={arClueHint}
              onChange={(val) => setAttributes({ arClueHint: val })}
            />
            <TextareaControl
              label={__('Instruções para o Usuário', 'periodic-interactive-utilities')}
              value={arInstructions}
              onChange={(val) => setAttributes({ arInstructions: val })}
            />
          </PanelBody>
        )}
      </InspectorControls>

      {/* Editor Tabs Navigation */}
      <div className="luiz-editor-tabs">
        <button
          type="button"
          className={`luiz-editor-tab-btn ${utilityType === 'advent-calendar' ? 'is-active' : ''}`}
          onClick={() => handleTypeChange('advent-calendar')}
        >
          <i className="fa-solid fa-calendar-days"></i> Calendário do Advento
        </button>
        <button
          type="button"
          className={`luiz-editor-tab-btn ${utilityType === 'qr-code' ? 'is-active' : ''}`}
          onClick={() => handleTypeChange('qr-code')}
        >
          <i className="fa-solid fa-qrcode"></i> QR Code Dinâmico
        </button>
        <button
          type="button"
          className={`luiz-editor-tab-btn ${utilityType === 'ar-trigger' ? 'is-active' : ''}`}
          onClick={() => handleTypeChange('ar-trigger')}
        >
          <i className="fa-solid fa-vr-cardboard"></i> Pistas com Marcador AR
        </button>
      </div>

      {/* UTILITY 1: QR CODE LIVE PREVIEW */}
      {utilityType === 'qr-code' && (
        <div className="luiz-qr-wrapper">
          <div className="luiz-util-header">
            <span className="luiz-badge-pill">
              <i className="fa-solid fa-qrcode"></i> Gerador de QR Code
            </span>
            <h3 className="luiz-util-title">{__('Gerador de QR Code Dinâmico', 'periodic-interactive-utilities')}</h3>
            <p className="luiz-util-subtitle">{__('Pré-visualização em tempo real conforme configurações', 'periodic-interactive-utilities')}</p>
          </div>

          <div className="luiz-qr-display-box" dangerouslySetInnerHTML={{ __html: qrSvgHtml }} />

          <div className="luiz-qr-text-preview">
            <span>{qrText || 'https://github.com/periodic'}</span>
          </div>

          <div className="luiz-qr-actions">
            <button type="button" className="luiz-btn luiz-btn-primary">
              <i className="fa-solid fa-download"></i> {__('Baixar PNG', 'periodic-interactive-utilities')}
            </button>
            <button type="button" className="luiz-btn luiz-btn-outline">
              <i className="fa-solid fa-file-code"></i> {__('Baixar SVG', 'periodic-interactive-utilities')}
            </button>
            <button type="button" className="luiz-btn luiz-btn-outline">
              <i className="fa-solid fa-copy"></i> {__('Copiar Link', 'periodic-interactive-utilities')}
            </button>
          </div>
        </div>
      )}

      {/* UTILITY 2: ADVENT CALENDAR GRID */}
      {utilityType === 'advent-calendar' && (
        <div className="luiz-advent-grid-wrapper">
          <div className="luiz-util-header">
            <span className="luiz-badge-pill">
              <i className="fa-solid fa-calendar-star"></i> Calendário do Advento
            </span>
            <h2 className="luiz-util-title">{calendarTitle || __('Calendário do Advento Interativo', 'periodic-interactive-utilities')}</h2>
            <p className="luiz-util-subtitle">{calendarSubtitle || __('Abra as caixas a cada dia de dezembro para revelar as surpresas!', 'periodic-interactive-utilities')}</p>
          </div>

          {/* Test date toolbar */}
          <div className="luiz-calendar-toolbar">
            <div className="luiz-test-mode-badge">
              <i className="fa-solid fa-flask"></i> Modo de Simulação: Data Atual = {testDate}
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', marginRight: '0.5rem', color: '#cbd5e1' }}>Alterar Data:</label>
              <input
                type="date"
                className="luiz-test-date-input"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
              />
            </div>
          </div>

          {/* 24 Doors Grid */}
          <div className="row g-3">
            {(calendarDoors || []).map((door) => {
              const unlocked = isDoorUnlocked(door.unlockDate);
              const isFlipped = flippedDoor === door.dayNumber;

              return (
                <div key={door.dayNumber} className="col-6 col-md-4 col-lg-3 luiz-door-item">
                  <div
                    className={`luiz-door-card ${isFlipped ? 'is-flipped' : ''}`}
                    onClick={() => {
                      if (unlocked) {
                        setFlippedDoor(isFlipped ? null : door.dayNumber);
                      }
                    }}
                  >
                    {/* Front Face */}
                    <div className="luiz-door-face luiz-door-front">
                      <div className="luiz-door-number">{door.dayNumber}</div>
                      <div className="luiz-door-icon">
                        <i className={`fa-solid ${door.icon || 'fa-gift'}`}></i>
                      </div>
                      <span className={`luiz-door-status-badge ${unlocked ? 'status-unlocked' : 'status-locked'}`}>
                        <i className={`fa-solid ${unlocked ? 'fa-lock-open' : 'fa-lock'}`}></i> {unlocked ? 'Desbloqueado' : 'Trancado'}
                      </span>
                    </div>

                    {/* Back Face */}
                    <div className="luiz-door-face luiz-door-back">
                      <div className="luiz-door-back-title">{door.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                        Disponível a partir de {door.unlockDate}
                      </div>
                      <button type="button" className="luiz-door-back-btn">
                        Ver Surpresa
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* UTILITY 3: AR TRIGGER CLUES */}
      {utilityType === 'ar-trigger' && (
        <div className="luiz-ar-wrapper">
          <div className="luiz-util-header">
            <span className="luiz-badge-pill">
              <i className="fa-solid fa-vr-cardboard"></i> Pistas de Realidade Aumentada
            </span>
            <h2 className="luiz-util-title">{arClueTitle || __('Pistas & Desafio AR', 'periodic-interactive-utilities')}</h2>
            <p className="luiz-util-subtitle">{arInstructions}</p>
          </div>

          <div className="luiz-ar-card">
            <div className="luiz-ar-grid">
              <div className="luiz-ar-marker-frame">
                <svg width="180" height="180" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="#000000" />
                  <rect x="15" y="15" width="70" height="70" fill="#ffffff" />
                  <text x="50" y="58" fontFamily="monospace" fontSize="22" fontWeight="bold" fill="#000000" textAnchor="middle">
                    HIRO
                  </text>
                </svg>
                <div className="luiz-ar-marker-badge">Marcador Padrão HIRO</div>
              </div>

              <div className="luiz-ar-content-box">
                <div className="luiz-clue-box">
                  <h4><i className="fa-solid fa-magnifying-glass"></i> Enigma da Pista</h4>
                  <p>Aponte a lente para o marcador acima para revelar o objeto oculto no espaço tridimensional.</p>
                </div>

                <div className="luiz-hint-container">
                  <button
                    type="button"
                    className="luiz-btn luiz-btn-outline"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <i className="fa-solid fa-lightbulb"></i> {showHint ? 'Ocultar Dica' : 'Revelar Dica'}
                  </button>
                  <div className={`luiz-hint-text ${showHint ? 'is-visible' : ''}`}>
                    {arClueHint}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="button" className="luiz-btn luiz-btn-primary">
                    <i className="fa-solid fa-camera"></i> Testar Câmera AR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
