import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { labMode, promptPhrase, language, maxRecordingTime, customTitle } = attributes;

    const blockProps = useBlockProps.save({
        className: `periodic-voice-lab-container mode-${labMode}`,
        'data-mode': labMode,
        'data-prompt-phrase': promptPhrase,
        'data-language': language,
        'data-max-time': maxRecordingTime,
    });

    return (
        <div {...blockProps}>
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden voice-lab-wrapper">
                {/* Header Bar */}
                <div className="card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill font-monospace">
                            <i className="fa-solid fa-microphone-lines me-1"></i> Periodic Voice Lab
                        </span>
                        <span className="badge bg-secondary-subtle text-secondary rounded-pill lang-badge">
                            {language}
                        </span>
                    </div>

                    <span className={`badge rounded-pill px-3 py-2 mode-badge ${labMode === 'recorder' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-info-subtle text-info-emphasis border border-info-subtle'}`}>
                        {labMode === 'recorder' ? '🎙️ Gravador de Áudio (.wav)' : '🎯 Validador de Pronúncia'}
                    </span>
                </div>

                <div className="card-body p-4">
                    {/* Title & Description */}
                    <div className="mb-3 text-center text-md-start">
                        <h4 className="fw-bold text-dark mb-1 voice-lab-title">
                            {customTitle || (labMode === 'recorder' ? 'Gravador de Voz do Aluno' : 'Validador de Pronúncia')}
                        </h4>
                        <p className="text-muted small mb-0 voice-lab-subtitle">
                            {labMode === 'recorder'
                                ? 'Grave sua voz pelo microfone, ouça o áudio capturado e faça o download em formato .wav.'
                                : 'Fale a frase indicada com clareza. O sistema compara sua fala e calcula a similaridade da pronúncia.'
                            }
                        </p>
                    </div>

                    {/* Target Phrase Box (if in speech-recognition mode) */}
                    {labMode === 'speech-recognition' && (
                        <div className="target-phrase-card p-3 mb-4 rounded-3 border">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="small fw-semibold text-primary text-uppercase">
                                    <i className="fa-solid fa-bullseye me-1"></i> Frase Alvo:
                                </span>
                                <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-2 btn-speak-target" title="Ouvir referência por síntese de voz">
                                    <i className="fa-solid fa-volume-high me-1"></i> Ouvir Exemplo
                                </button>
                            </div>
                            <div className="target-phrase-text fs-5 fw-bold text-dark font-sans">
                                {promptPhrase}
                            </div>
                        </div>
                    )}

                    {/* Visualizer Canvas & Time Counter */}
                    <div className="visualizer-box position-relative rounded-4 p-3 mb-4 bg-dark shadow-inner text-center">
                        <div className="d-flex justify-content-between align-items-center text-white-50 px-2 mb-2 small font-monospace">
                            <span className="live-status-indicator d-flex align-items-center gap-2">
                                <span className="status-dot"></span>
                                <span className="status-text">Pronto para iniciar</span>
                            </span>
                            <span className="time-display">
                                <span className="current-time">00:00</span> / <span className="max-time">00:{maxRecordingTime < 10 ? `0${maxRecordingTime}` : maxRecordingTime}</span>
                            </span>
                        </div>

                        {/* Real-time Oscilloscope / Sound Wave Canvas */}
                        <div className="canvas-wrapper position-relative">
                            <canvas className="voice-lab-canvas w-100" height="90"></canvas>
                            <div className="canvas-placeholder-wave d-flex justify-content-center align-items-center gap-1 position-absolute top-50 start-50 translate-middle w-100">
                                <span className="text-white-50 small">Clique no botão vermelho para iniciar gravação</span>
                            </div>
                        </div>

                        {/* Recording Progress Bar */}
                        <div className="progress mt-2" style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                            <div className="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '0%' }}></div>
                        </div>
                    </div>

                    {/* Main Controls - Bootstrap 5 Buttons */}
                    <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-3">
                        {/* REC Button - btn btn-danger rounded-circle */}
                        <button 
                            type="button" 
                            className="btn btn-danger rounded-circle btn-rec shadow p-0 d-flex align-items-center justify-content-center" 
                            style={{ width: '58px', height: '58px' }} 
                            title="Gravar Áudio"
                        >
                            <i className="fa-solid fa-microphone fs-4"></i>
                        </button>

                        {/* STOP Button */}
                        <button 
                            type="button" 
                            className="btn btn-secondary rounded-circle btn-stop shadow-sm p-0 d-flex align-items-center justify-content-center" 
                            style={{ width: '58px', height: '58px' }} 
                            title="Parar Gravação"
                            disabled
                        >
                            <i className="fa-solid fa-stop fs-4"></i>
                        </button>

                        {/* PLAY Button - btn btn-success */}
                        <button 
                            type="button" 
                            className="btn btn-success btn-play px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2" 
                            disabled
                        >
                            <i className="fa-solid fa-play"></i>
                            <span className="btn-play-text">Ouvir Gravação</span>
                        </button>

                        {/* DOWNLOAD WAV Button (in recorder mode) */}
                        {labMode === 'recorder' && (
                            <button 
                                type="button" 
                                className="btn btn-outline-primary btn-download-wav px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2" 
                                disabled
                            >
                                <i className="fa-solid fa-download"></i>
                                <span>Baixar .wav</span>
                            </button>
                        )}
                    </div>

                    {/* Hidden Native Audio Element for playback */}
                    <audio className="voice-lab-audio d-none" preload="auto"></audio>

                    {/* Live Recognition & Levenshtein Results Area (in speech-recognition mode) */}
                    {labMode === 'speech-recognition' && (
                        <div className="recognition-results-area mt-4 p-3 rounded-4 bg-light border" style={{ display: 'none' }}>
                            <div className="row g-3 align-items-center">
                                <div className="col-12 col-md-8">
                                    <div className="small fw-bold text-muted text-uppercase mb-1">
                                        <i className="fa-solid fa-ear-listen me-1"></i> Transcrição Reconhecida:
                                    </div>
                                    <div className="transcription-text fs-5 p-2 bg-white rounded-3 border min-h-50">
                                        <span className="text-muted fst-italic">Aguardando fala...</span>
                                    </div>
                                    <div className="words-diff-container mt-2 small"></div>
                                </div>

                                <div className="col-12 col-md-4 text-center border-start-md">
                                    <div className="small fw-bold text-muted text-uppercase mb-1">
                                        Similaridade Levenshtein
                                    </div>
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                        <div className="score-circle-wrapper position-relative my-2">
                                            <div className="score-percentage fs-2 fw-black text-primary">0%</div>
                                        </div>
                                        <div className="score-feedback-badge badge rounded-pill px-3 py-2 bg-secondary">
                                            Aguardando fala
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer with browser API hints */}
                <div className="card-footer bg-light-subtle border-top py-2 px-4 d-flex justify-content-between align-items-center text-muted small">
                    <span>
                        <i className="fa-solid fa-wave-square me-1"></i> Web Audio API (.wav)
                    </span>
                    <span>
                        <i className="fa-solid fa-microchip me-1"></i> Web Speech API (Levenshtein)
                    </span>
                </div>
            </div>
        </div>
    );
}
