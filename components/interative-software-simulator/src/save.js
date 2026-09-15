import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    simulatorTitle,
    steps,
    showProgressBar,
    showRestartButton,
    showStepIndicator,
    highlightHints,
    allowClickAnywhereHint,
    customSuccessMessage
  } = attributes;

  const configData = {
    simulatorTitle,
    steps: steps || [],
    showProgressBar: showProgressBar !== false,
    showRestartButton: showRestartButton !== false,
    showStepIndicator: showStepIndicator !== false,
    highlightHints: highlightHints !== false,
    allowClickAnywhereHint: allowClickAnywhereHint !== false,
    customSuccessMessage: customSuccessMessage || 'Parabéns! Você completou a simulação com sucesso.'
  };

  const blockProps = useBlockProps.save({
    className: 'wp-block-custom-simulador-software'
  });

  return (
    <div {...blockProps}>
      <div className="sim-player-wrapper" data-initialized="false">
        {/* Configuration JSON for Frontend Hydration */}
        <script
          type="application/json"
          className="sim-data-config"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(configData) }}
        />
        {/* Fallback placeholder while JS hydrates */}
        <div className="sim-noscript-fallback" style={{ padding: '30px', textAlign: 'center', background: '#0f172a', color: '#ffffff', borderRadius: '12px' }}>
          <h3>{simulatorTitle}</h3>
          <p>Carregando simulador interativo...</p>
        </div>
      </div>
    </div>
  );
}
