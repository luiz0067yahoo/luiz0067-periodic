/**
 * WordPress dependencies
 */
import { createElement, useState } from '@wordpress/element';
import {
  InspectorControls,
  BlockControls,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  RangeControl,
  ToggleControl,
  TextControl,
  TextareaControl,
  Button,
  ToolbarGroup,
  ToolbarButton,
} from '@wordpress/components';
import { __t } from './i18n';

export default function Edit({ attributes, setAttributes }) {
  const { gameMode, cards, columns, showTimer, showMoves, cardHeight, language } = attributes;
  const [activeTab, setActiveTab] = useState('list');
  const [flippedCards, setFlippedCards] = useState({});

  const t = (key, params) => __t(key, language, params);

  // Card list modifiers
  const updateCard = (index, field, value) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [field]: value };
    setAttributes({ cards: updated });
  };

  const addCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      frontImage: '',
      frontText: '',
      backText: '',
      tip: '',
      audioUrl: '',
    };
    setAttributes({ cards: [...cards, newCard] });
  };

  const removeCard = (index) => {
    const updated = cards.filter((_, i) => i !== index);
    setAttributes({ cards: updated });
  };

  const duplicateCard = (index) => {
    const target = cards[index];
    const duplicated = {
      ...target,
      id: `card-${Date.now()}`,
    };
    const updated = [...cards];
    updated.splice(index + 1, 0, duplicated);
    setAttributes({ cards: updated });
  };

  const moveCard = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= cards.length) return;
    const updated = [...cards];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setAttributes({ cards: updated });
  };

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Bootstrap column class calculation
  const colClass = `col-12 col-sm-6 col-md-4 col-lg-${12 / (columns || 3)}`;

  return (
    <div className="wp-block-periodic-card-trainer-editor periodic-card-trainer">
      {/* Gutenberg Inspector Sidebar Controls */}
      <InspectorControls>
        <PanelBody title={t('settings.gameMode')} initialOpen={true}>
          <SelectControl
            label={t('settings.gameMode')}
            help={t('settings.gameModeHelp')}
            value={gameMode}
            options={[
              { label: t('settings.modeFlashcard'), value: 'flashcard' },
              { label: t('settings.modeDialogCard'), value: 'dialog-card' },
              { label: t('settings.modeMemoryGrid'), value: 'memory-grid' },
            ]}
            onChange={(val) => setAttributes({ gameMode: val })}
          />

          <SelectControl
            label="Idioma / Language"
            value={language || 'pt-br'}
            options={[
              { label: 'Português (pt-BR)', value: 'pt-br' },
              { label: 'English (en-US)', value: 'en-us' },
              { label: 'Italiano (it-IT)', value: 'it' },
              { label: 'Español (es-ES)', value: 'es' },
            ]}
            onChange={(val) => setAttributes({ language: val })}
          />
        </PanelBody>

        <PanelBody title={t('settings.displayOptions')} initialOpen={true}>
          <RangeControl
            label={t('settings.columns')}
            help={t('settings.columnsHelp')}
            value={columns}
            onChange={(val) => setAttributes({ columns: val })}
            min={1}
            max={6}
          />
          <RangeControl
            label={t('settings.cardHeight')}
            value={cardHeight || 280}
            onChange={(val) => setAttributes({ cardHeight: val })}
            min={200}
            max={500}
            step={10}
          />
          <ToggleControl
            label={t('settings.showTimer')}
            checked={showTimer}
            onChange={(val) => setAttributes({ showTimer: val })}
          />
          <ToggleControl
            label={t('settings.showMoves')}
            checked={showMoves}
            onChange={(val) => setAttributes({ showMoves: val })}
          />
        </PanelBody>
      </InspectorControls>

      {/* Editor Main Canvas */}
      <div className="editor-header-bar">
        <div className="editor-title">
          <span>🃏 Periodic Card Trainer</span>
        </div>
        <div className="editor-badges">
          <span className="badge-mode">{gameMode}</span>
          <span className="badge-mode">{cards.length} {t('frontend.card')}s</span>
        </div>
      </div>

      {/* Editor Card Items */}
      <div className="editor-cards-container">
        {cards.map((card, index) => {
          const isFlipped = !!flippedCards[index];
          return (
            <div key={card.id || index} className="editor-card-item">
              <div className="card-top-controls">
                <span className="card-index-title">
                  {t('settings.cardTitle', { index: index + 1 })}
                </span>
                <div className="card-item-buttons">
                  <Button
                    isSmall
                    variant="tertiary"
                    onClick={() => toggleFlip(index)}
                    title={t('settings.previewFlip')}
                  >
                    🔄 {isFlipped ? t('frontend.turnBack') : t('frontend.turnOver')}
                  </Button>
                  <Button
                    isSmall
                    variant="tertiary"
                    disabled={index === 0}
                    onClick={() => moveCard(index, -1)}
                    title={t('settings.moveUp')}
                  >
                    ⬆
                  </Button>
                  <Button
                    isSmall
                    variant="tertiary"
                    disabled={index === cards.length - 1}
                    onClick={() => moveCard(index, 1)}
                    title={t('settings.moveDown')}
                  >
                    ⬇
                  </Button>
                  <Button
                    isSmall
                    variant="tertiary"
                    onClick={() => duplicateCard(index)}
                    title={t('settings.duplicateCard')}
                  >
                    📋
                  </Button>
                  <Button
                    isSmall
                    isDestructive
                    variant="tertiary"
                    onClick={() => removeCard(index)}
                    title={t('settings.deleteCard')}
                  >
                    🗑
                  </Button>
                </div>
              </div>

              {/* 3D Flip Card Live Preview in Editor */}
              <div className="card-3d-wrap my-3" style={{ minHeight: `${cardHeight || 280}px` }}>
                <div
                  className={`card-flipper ${isFlipped ? 'is-flipped' : ''}`}
                  style={{ minHeight: `${cardHeight || 280}px` }}
                  onClick={() => toggleFlip(index)}
                >
                  {/* Card Front Preview */}
                  <div className="card-face card-front">
                    {card.frontImage && (
                      <div className="card-media">
                        <img src={card.frontImage} alt={card.frontText || 'Card Front'} />
                      </div>
                    )}
                    <div className="card-content">
                      <div>
                        <span className="card-badge badge-front">Frente / Front</span>
                        <h4 className="card-text-title">
                          {card.frontText || 'Texto da frente (clique abaixo para editar)'}
                        </h4>
                      </div>
                      {card.tip && (
                        <div className="card-tip-box show">
                          💡 <strong>Dica:</strong> {card.tip}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Back Preview */}
                  <div className="card-face card-back">
                    <div className="card-content">
                      <div>
                        <span className="card-badge badge-back">Verso / Back</span>
                        <h4 className="card-text-title">
                          {card.backText || 'Resposta ou tradução no verso'}
                        </h4>
                        {card.audioUrl && (
                          <div className="card-action-bar">
                            <span className="btn-card-action">🔊 Áudio configurado</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Form Edit Fields */}
              <div className="card-editor-fields">
                <div className="fields-col">
                  <div className="field-group">
                    <label>{t('settings.frontText')}</label>
                    <input
                      type="text"
                      placeholder={t('settings.frontTextPlaceholder')}
                      value={card.frontText || ''}
                      onChange={(e) => updateCard(index, 'frontText', e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label>{t('settings.tip')}</label>
                    <input
                      type="text"
                      placeholder={t('settings.tipPlaceholder')}
                      value={card.tip || ''}
                      onChange={(e) => updateCard(index, 'tip', e.target.value)}
                    />
                  </div>

                  <div className="field-group media-upload-box">
                    <label>{t('settings.frontImage')}</label>
                    {card.frontImage ? (
                      <div>
                        <img src={card.frontImage} alt="" />
                        <div className="mt-2">
                          <Button
                            isSmall
                            isDestructive
                            onClick={() => updateCard(index, 'frontImage', '')}
                          >
                            {t('settings.removeImage')}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <MediaUploadCheck>
                        <MediaUpload
                          onSelect={(media) => updateCard(index, 'frontImage', media.url)}
                          allowedTypes={['image']}
                          render={({ open }) => (
                            <Button isSecondary isSmall onClick={open}>
                              🖼 {t('settings.uploadImage')}
                            </Button>
                          )}
                        />
                      </MediaUploadCheck>
                    )}
                  </div>
                </div>

                <div className="fields-col">
                  <div className="field-group">
                    <label>{t('settings.backText')}</label>
                    <textarea
                      rows={3}
                      placeholder={t('settings.backTextPlaceholder')}
                      value={card.backText || ''}
                      onChange={(e) => updateCard(index, 'backText', e.target.value)}
                    />
                  </div>

                  <div className="field-group media-upload-box">
                    <label>{t('settings.audioUrl')}</label>
                    {card.audioUrl ? (
                      <div>
                        <audio controls src={card.audioUrl} style={{ width: '100%', height: '32px' }} />
                        <div className="mt-2">
                          <Button
                            isSmall
                            isDestructive
                            onClick={() => updateCard(index, 'audioUrl', '')}
                          >
                            {t('settings.removeAudio')}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <MediaUploadCheck>
                        <MediaUpload
                          onSelect={(media) => updateCard(index, 'audioUrl', media.url)}
                          allowedTypes={['audio']}
                          render={({ open }) => (
                            <Button isSecondary isSmall onClick={open}>
                              🔊 {t('settings.uploadAudio')}
                            </Button>
                          )}
                        />
                      </MediaUploadCheck>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button type="button" className="btn-add-card" onClick={addCard}>
          ➕ {t('settings.addCard')}
        </button>
      </div>
    </div>
  );
}
