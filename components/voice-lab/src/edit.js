import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextareaControl, RangeControl, TextControl, Notice } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { labMode, promptPhrase, language, maxRecordingTime, customTitle } = attributes;
    const blockProps = useBlockProps({
        className: `periodic-voice-lab-editor-preview mode-${labMode}`
    });

    const languageOptions = [
        { label: '🇧🇷 Português (pt-BR)', value: 'pt-BR' },
        { label: '🇺🇸 English (en-US)', value: 'en-US' },
        { label: '🇮🇹 Italiano (it-IT)', value: 'it-IT' },
        { label: '🇪🇸 Español (es-ES)', value: 'es-ES' },
        { label: '🇫🇷 Français (fr-FR)', value: 'fr-FR' },
        { label: '🇩🇪 Deutsch (de-DE)', value: 'de-DE' }
    ];

    const modeOptions = [
        { label: __('🎙️ Student Voice Recorder (.wav)', 'periodic-voice-lab'), value: 'recorder' },
        { label: __('🎯 Pronunciation Validator (Speech Recognition)', 'periodic-voice-lab'), value: 'speech-recognition' }
    ];

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Voice Lab Settings', 'periodic-voice-lab')} initialOpen={true}>
                    <SelectControl
                        label={__('Lab Operating Mode', 'periodic-voice-lab')}
                        value={labMode}
                        options={modeOptions}
                        onChange={(value) => setAttributes({ labMode: value })}
                        help={labMode === 'recorder' 
                            ? __('Allows students to record audio, preview with player, and download clean .wav file.', 'periodic-voice-lab')
                            : __('Listens to student speech and scores accuracy against target text using Levenshtein distance.', 'periodic-voice-lab')
                        }
                    />

                    <SelectControl
                        label={__('Language', 'periodic-voice-lab')}
                        value={language}
                        options={languageOptions}
                        onChange={(value) => setAttributes({ language: value })}
                        help={__('Speech recognition language model and UI locale.', 'periodic-voice-lab')}
                    />

                    {labMode === 'speech-recognition' && (
                        <TextareaControl
                            label={__('Target Phrase to Validate', 'periodic-voice-lab')}
                            value={promptPhrase}
                            onChange={(value) => setAttributes({ promptPhrase: value })}
                            rows={3}
                            help={__('The expected sentence the student should pronounce clearly.', 'periodic-voice-lab')}
                        />
                    )}

                    <RangeControl
                        label={__('Max Recording Duration (seconds)', 'periodic-voice-lab')}
                        value={maxRecordingTime}
                        onChange={(value) => setAttributes({ maxRecordingTime: value })}
                        min={5}
                        max={180}
                        step={5}
                    />

                    <TextControl
                        label={__('Custom Block Title (Optional)', 'periodic-voice-lab')}
                        value={customTitle}
                        onChange={(value) => setAttributes({ customTitle: value })}
                        placeholder={labMode === 'recorder' ? __('Student Voice Recorder', 'periodic-voice-lab') : __('Pronunciation Challenge', 'periodic-voice-lab')}
                    />
                </PanelBody>
            </InspectorControls>

            {/* WYSIWYG Editor Preview */}
            <div className="voice-lab-card shadow-sm border rounded-4 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                    <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill font-monospace">
                            <i className="fa-solid fa-flask-vial me-1"></i> Periodic Voice Lab
                        </span>
                        <span className="badge bg-dark-subtle text-dark rounded-pill">
                            {language}
                        </span>
                    </div>
                    <span className={`badge rounded-pill px-3 py-2 ${labMode === 'recorder' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-info-subtle text-info-emphasis border border-info-subtle'}`}>
                        {labMode === 'recorder' ? '🎙️ Mode: Voice Recorder (.wav)' : '🎯 Mode: Speech Recognition & Levenshtein'}
                    </span>
                </div>

                <div className="lab-header mb-3">
                    <h4 className="fw-bold mb-1 text-dark">
                        {customTitle || (labMode === 'recorder' ? __('Voice Recorder & Audio Studio', 'periodic-voice-lab') : __('Pronunciation Validator Lab', 'periodic-voice-lab'))}
                    </h4>
                    <p className="text-muted small mb-0">
                        {labMode === 'recorder' 
                            ? __('Native Web Audio API recorder with live wave visualizer and PCM .wav export.', 'periodic-voice-lab')
                            : __('Native Web Speech API listening to your voice with algorithmic Levenshtein matching.', 'periodic-voice-lab')
                        }
                    </p>
                </div>

                {labMode === 'speech-recognition' && (
                    <div className="target-phrase-preview p-3 mb-3 rounded-3 bg-light border border-primary-subtle">
                        <div className="small fw-semibold text-primary text-uppercase mb-1">
                            <i className="fa-solid fa-quote-left me-1"></i> {__('Target Phrase to Speak:', 'periodic-voice-lab')}
                        </div>
                        <div className="fs-5 fw-medium text-dark fst-italic">
                            "{promptPhrase || __('Type target sentence in block sidebar settings...', 'periodic-voice-lab')}"
                        </div>
                    </div>
                )}

                {/* Simulated Audio Visualizer Wave */}
                <div className="soundwave-mockup d-flex align-items-center justify-content-center gap-1 my-3 p-3 rounded-3 bg-dark">
                    {[30, 50, 80, 45, 95, 60, 40, 75, 100, 85, 40, 60, 90, 35, 70, 50, 30].map((h, idx) => (
                        <div 
                            key={idx} 
                            className="wave-bar" 
                            style={{ 
                                height: `${h * 0.4}px`, 
                                width: '4px', 
                                background: 'linear-gradient(180deg, #00f2fe 0%, #4facfe 100%)',
                                borderRadius: '2px'
                            }}
                        />
                    ))}
                    <span className="text-white-50 ms-3 font-monospace small">
                        <i className="fa-solid fa-waveform-lines me-1"></i> 00:00 / 00:{maxRecordingTime < 10 ? `0${maxRecordingTime}` : maxRecordingTime}
                    </span>
                </div>

                {/* Simulated Button Controls */}
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mt-4">
                    <button type="button" className="btn btn-danger rounded-circle p-3 d-flex align-items-center justify-content-center shadow" style={{ width: '54px', height: '54px' }} title="REC">
                        <i className="fa-solid fa-microphone fs-5"></i>
                    </button>
                    
                    <button type="button" className="btn btn-secondary rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '54px', height: '54px' }} title="STOP" disabled>
                        <i className="fa-solid fa-stop fs-5"></i>
                    </button>

                    <button type="button" className="btn btn-success px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2" disabled>
                        <i className="fa-solid fa-play"></i>
                        <span>{__('Play Preview', 'periodic-voice-lab')}</span>
                    </button>

                    {labMode === 'recorder' ? (
                        <button type="button" className="btn btn-outline-primary px-3 py-2 rounded-pill d-flex align-items-center gap-2" disabled>
                            <i className="fa-solid fa-download"></i>
                            <span>{__('Download .wav', 'periodic-voice-lab')}</span>
                        </button>
                    ) : (
                        <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill">
                            <i className="fa-solid fa-chart-simple me-1"></i> {__('Score: --% Levenshtein', 'periodic-voice-lab')}
                        </span>
                    )}
                </div>

                <div className="text-center mt-3">
                    <small className="text-muted fst-italic">
                        <i className="fa-solid fa-circle-info me-1"></i>
                        {__('Interactive preview active on frontend & test preview page.', 'periodic-voice-lab')}
                    </small>
                </div>
            </div>
        </div>
    );
}
