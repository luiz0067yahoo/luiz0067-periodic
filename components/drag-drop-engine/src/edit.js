import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  TextControl,
  TextareaControl,
  Button,
  ToggleControl,
  RangeControl,
  Card,
  CardBody,
  CardHeader,
  Notice,
  TabPanel
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    description,
    dragMode,
    items,
    targets,
    backgroundImage,
    allowRetry,
    successMessage,
    errorMessage
  } = attributes;

  const blockProps = useBlockProps({
    className: 'periodic-dnd-container periodic-editor-preview'
  });

  // Manipulação de itens
  const handleAddItem = () => {
    const nextId = `item-${Date.now()}`;
    const newItem = {
      id: nextId,
      text: `Novo Item ${items.length + 1}`,
      targetId: targets.length > 0 ? targets[0].id : '',
      correctOrder: items.length + 1
    };
    setAttributes({ items: [...items, newItem] });
  };

  const handleUpdateItem = (index, key, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    setAttributes({ items: updated });
  };

  const handleRemoveItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setAttributes({ items: updated });
  };

  // Manipulação de alvos (targets)
  const handleAddTarget = () => {
    const nextId = `target-${Date.now()}`;
    const newTarget = {
      id: nextId,
      label: `Zona Alvo ${targets.length + 1}`,
      x: 50,
      y: 50
    };
    setAttributes({ targets: [...targets, newTarget] });
  };

  const handleUpdateTarget = (index, key, value) => {
    const updated = [...targets];
    updated[index] = { ...updated[index], [key]: value };
    setAttributes({ targets: updated });
  };

  const handleRemoveTarget = (index) => {
    const updated = targets.filter((_, i) => i !== index);
    setAttributes({ targets: updated });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Modo de Operação', 'periodic-drag-drop-engine')} initialOpen={true}>
          <SelectControl
            label={__('Mecânica Interativa (dragMode)', 'periodic-drag-drop-engine')}
            value={dragMode}
            options={[
              { label: __('Tokens de Texto / Lacunas (text-tokens)', 'periodic-drag-drop-engine'), value: 'text-tokens' },
              { label: __('Reordenação de Parágrafos (reorder-paragraphs)', 'periodic-drag-drop-engine'), value: 'reorder-paragraphs' },
              { label: __('Alvos sobre Imagem (image-targets)', 'periodic-drag-drop-engine'), value: 'image-targets' }
            ]}
            onChange={(val) => setAttributes({ dragMode: val })}
            help={__('Selecione o tipo de atividade para os usuários.', 'periodic-drag-drop-engine')}
          />
          <TextControl
            label={__('Título da Atividade', 'periodic-drag-drop-engine')}
            value={title}
            onChange={(val) => setAttributes({ title: val })}
          />
          <TextareaControl
            label={__('Instrução / Enunciado', 'periodic-drag-drop-engine')}
            value={description}
            onChange={(val) => setAttributes({ description: val })}
          />
        </PanelBody>

        {dragMode === 'image-targets' && (
          <PanelBody title={__('Imagem de Fundo (Alvos)', 'periodic-drag-drop-engine')} initialOpen={true}>
            <TextControl
              label={__('URL da Imagem de Fundo', 'periodic-drag-drop-engine')}
              value={backgroundImage}
              onChange={(val) => setAttributes({ backgroundImage: val })}
              placeholder="https://exemplo.com/diagrama.jpg"
            />
            {MediaUpload && (
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => setAttributes({ backgroundImage: media.url })}
                  allowedTypes={['image']}
                  value={backgroundImage}
                  render={({ open }) => (
                    <Button variant="secondary" onClick={open} style={{ marginTop: '8px' }}>
                      {backgroundImage ? __('Alterar Imagem', 'periodic-drag-drop-engine') : __('Carregar Imagem da Biblioteca', 'periodic-drag-drop-engine')}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            )}
            {backgroundImage && (
              <Button
                isDestructive
                variant="link"
                onClick={() => setAttributes({ backgroundImage: '' })}
                style={{ marginTop: '8px', display: 'block' }}
              >
                {__('Remover Imagem', 'periodic-drag-drop-engine')}
              </Button>
            )}
          </PanelBody>
        )}

        <PanelBody title={__('Itens Arrastáveis e Gabarito', 'periodic-drag-drop-engine')} initialOpen={true}>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
            {dragMode === 'reorder-paragraphs'
              ? __('Configure a ordem numérica correta de cada bloco.', 'periodic-drag-drop-engine')
              : __('Defina a qual zona alvo cada item pertence como resposta correta.', 'periodic-drag-drop-engine')}
          </p>

          {items.map((item, index) => (
            <Card key={item.id || index} style={{ marginBottom: '10px', border: '1px solid #cbd5e1' }}>
              <CardHeader style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px' }}>
                <strong>{__('Item', 'periodic-drag-drop-engine')} #{index + 1}</strong>
                <Button
                  isDestructive
                  isSmall
                  variant="link"
                  onClick={() => handleRemoveItem(index)}
                >
                  ✕
                </Button>
              </CardHeader>
              <CardBody style={{ padding: '10px 12px' }}>
                <TextControl
                  label={__('Texto do Item / Chip', 'periodic-drag-drop-engine')}
                  value={item.text}
                  onChange={(val) => handleUpdateItem(index, 'text', val)}
                />

                {dragMode === 'reorder-paragraphs' ? (
                  <RangeControl
                    label={__('Posição Correta (Ordem)', 'periodic-drag-drop-engine')}
                    value={item.correctOrder || index + 1}
                    onChange={(val) => handleUpdateItem(index, 'correctOrder', val)}
                    min={1}
                    max={Math.max(items.length, 10)}
                  />
                ) : (
                  <SelectControl
                    label={__('Gabarito: Zona Alvo Destino', 'periodic-drag-drop-engine')}
                    value={item.targetId || ''}
                    options={[
                      { label: __('-- Escolha a Dropzone Correta --', 'periodic-drag-drop-engine'), value: '' },
                      ...targets.map((t) => ({ label: t.label || t.id, value: t.id }))
                    ]}
                    onChange={(val) => handleUpdateItem(index, 'targetId', val)}
                  />
                )}
              </CardBody>
            </Card>
          ))}

          <Button variant="primary" onClick={handleAddItem} style={{ width: '100%', marginTop: '8px' }}>
            {__('+ Adicionar Novo Item', 'periodic-drag-drop-engine')}
          </Button>
        </PanelBody>

        {dragMode !== 'reorder-paragraphs' && (
          <PanelBody title={__('Zonas Alvo (Dropzones)', 'periodic-drag-drop-engine')} initialOpen={false}>
            {targets.map((tgt, index) => (
              <Card key={tgt.id || index} style={{ marginBottom: '10px', border: '1px solid #cbd5e1' }}>
                <CardHeader style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px' }}>
                  <strong>{__('Zona', 'periodic-drag-drop-engine')} #{index + 1}</strong>
                  <Button isDestructive isSmall variant="link" onClick={() => handleRemoveTarget(index)}>✕</Button>
                </CardHeader>
                <CardBody style={{ padding: '10px 12px' }}>
                  <TextControl
                    label={__('Rótulo / Descrição', 'periodic-drag-drop-engine')}
                    value={tgt.label}
                    onChange={(val) => handleUpdateTarget(index, 'label', val)}
                  />
                  {dragMode === 'image-targets' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <RangeControl
                        label={__('Posição X (%)', 'periodic-drag-drop-engine')}
                        value={tgt.x || 50}
                        onChange={(val) => handleUpdateTarget(index, 'x', val)}
                        min={5}
                        max={95}
                      />
                      <RangeControl
                        label={__('Posição Y (%)', 'periodic-drag-drop-engine')}
                        value={tgt.y || 50}
                        onChange={(val) => handleUpdateTarget(index, 'y', val)}
                        min={5}
                        max={95}
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
            <Button variant="secondary" onClick={handleAddTarget} style={{ width: '100%', marginTop: '8px' }}>
              {__('+ Adicionar Nova Zona Alvo', 'periodic-drag-drop-engine')}
            </Button>
          </PanelBody>
        )}

        <PanelBody title={__('Feedback e Comportamento', 'periodic-drag-drop-engine')} initialOpen={false}>
          <TextControl
            label={__('Mensagem de Sucesso', 'periodic-drag-drop-engine')}
            value={successMessage}
            onChange={(val) => setAttributes({ successMessage: val })}
          />
          <TextControl
            label={__('Mensagem de Erro', 'periodic-drag-drop-engine')}
            value={errorMessage}
            onChange={(val) => setAttributes({ errorMessage: val })}
          />
          <ToggleControl
            label={__('Permitir Tentar Novamente', 'periodic-drag-drop-engine')}
            checked={allowRetry}
            onChange={(val) => setAttributes({ allowRetry: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="periodic-editor-notice">
          <span>⚡</span>
          <div>
            <strong>Periodic Drag & Drop Engine</strong> — {__('Modo Ativo:', 'periodic-drag-drop-engine')}{' '}
            <span className="editor-mode-badge">{dragMode}</span>
          </div>
        </div>

        <div className="periodic-dnd-header">
          <h3 className="periodic-dnd-title">{title || __('Título da Atividade', 'periodic-drag-drop-engine')}</h3>
          <p className="periodic-dnd-desc">{description || __('Instruções do exercício...', 'periodic-drag-drop-engine')}</p>
        </div>

        {/* Tab Panel: Pré-visualização / Gabarito */}
        <TabPanel
          tabs={[
            { name: 'preview', title: __('Pré-visualização do Layout', 'periodic-drag-drop-engine') },
            { name: 'answer-key', title: __('Gabarito / Relações', 'periodic-drag-drop-engine') }
          ]}
        >
          {(tab) => (
            <div style={{ marginTop: '1rem' }}>
              {tab.name === 'preview' ? (
                <>
                  {/* Pool de Itens Arrastáveis */}
                  <div className="periodic-source-pool">
                    <span className="pool-label">{__('Itens Arrastáveis (Badges Bootstrap):', 'periodic-drag-drop-engine')}</span>
                    {items.map((item, idx) => (
                      <span key={item.id || idx} className="badge bg-primary fs-6 p-2 periodic-draggable-item">
                        <span className="dnd-drag-icon">⠿</span>
                        {item.text}
                      </span>
                    ))}
                  </div>

                  {/* Visualização de acordo com o modo */}
                  {dragMode === 'text-tokens' && (
                    <div className="periodic-tokens-layout">
                      <div className="periodic-targets-list">
                        {targets.map((tgt, idx) => (
                          <div key={tgt.id || idx} className="periodic-dropzone-box">
                            <div className="dropzone-header">
                              <span>🎯 {tgt.label || `Zona ${idx + 1}`}</span>
                            </div>
                            <div className="periodic-dropzone-target">
                              <span className="dropzone-placeholder">{__('Dropzone Alvo', 'periodic-drag-drop-engine')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dragMode === 'reorder-paragraphs' && (
                    <div className="periodic-reorder-layout">
                      <div className="periodic-reorder-list">
                        {items.map((item, idx) => (
                          <div key={item.id || idx} className="periodic-reorder-card">
                            <span className="reorder-handle">⠿</span>
                            <span className="reorder-index">{idx + 1}</span>
                            <span className="reorder-content">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dragMode === 'image-targets' && (
                    <div className="periodic-image-layout">
                      <div
                        className={`periodic-image-canvas ${!backgroundImage ? 'placeholder-canvas' : ''}`}
                        style={{
                          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                          minHeight: '260px'
                        }}
                      >
                        {!backgroundImage && (
                          <div style={{ color: '#ffffff', textAlign: 'center', padding: '2rem' }}>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>{__('Nenhuma imagem configurada', 'periodic-drag-drop-engine')}</p>
                            <small>{__('Adicione uma URL ou envie uma imagem no painel lateral', 'periodic-drag-drop-engine')}</small>
                          </div>
                        )}
                        {targets.map((tgt, idx) => (
                          <div
                            key={tgt.id || idx}
                            className="periodic-image-target-spot"
                            style={{ left: `${tgt.x || 50}%`, top: `${tgt.y || 50}%` }}
                          >
                            <div className="target-pin">{idx + 1}</div>
                            <div className="target-spot-label">{tgt.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Tab do Gabarito */
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>
                    {__('Resumo do Gabarito Configurado:', 'periodic-drag-drop-engine')}
                  </h4>
                  {items.map((item, idx) => {
                    const matchedTarget = targets.find((t) => t.id === item.targetId);
                    return (
                      <div key={item.id || idx} className="editor-item-preview-row">
                        <span className="item-preview-text">
                          <span className="badge bg-primary p-2" style={{ marginRight: '8px' }}>{item.text}</span>
                        </span>
                        <span className="item-preview-meta">
                          {dragMode === 'reorder-paragraphs'
                            ? `Ordem correta: #${item.correctOrder || idx + 1}`
                            : `Alvo correto: ${matchedTarget ? matchedTarget.label : 'Não definido'}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </TabPanel>

        <div className="periodic-dnd-footer">
          <button type="button" className="btn btn-primary" disabled>
            {__('Verificar Respostas', 'periodic-drag-drop-engine')}
          </button>
        </div>
      </div>
    </>
  );
}
