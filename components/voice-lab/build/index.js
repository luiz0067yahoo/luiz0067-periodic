(function () {
    const { registerBlockType } = wp.blocks;
    const { createElement: el, Fragment } = wp.element;
    const { InspectorControls, useBlockProps } = wp.blockEditor;
    const { PanelBody, SelectControl, TextareaControl, RangeControl, TextControl } = wp.components;
    const { __ } = wp.i18n;

    registerBlockType('periodic/voice-lab', {
        title: 'Voice Lab (Web Audio & Speech)',
        category: 'media',
        icon: 'microphone',
        description: 'Native voice recorder (.wav) and pronunciation validator using Web Audio API and Web Speech API.',
        attributes: {
            labMode: { type: 'string', default: 'recorder' },
            promptPhrase: { type: 'string', default: 'The quick brown fox jumps over the lazy dog.' },
            language: { type: 'string', default: 'en-US' },
            maxRecordingTime: { type: 'number', default: 30 },
            customTitle: { type: 'string', default: '' }
        },
        edit: function (props) {
            const { attributes, setAttributes } = props;
            const { labMode, promptPhrase, language, maxRecordingTime, customTitle } = attributes;
            const blockProps = useBlockProps({
                className: 'periodic-voice-lab-editor-preview mode-' + labMode
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

            return el(
                Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: __('Voice Lab Settings', 'periodic-voice-lab'), initialOpen: true },
                        el(SelectControl, {
                            label: __('Lab Operating Mode', 'periodic-voice-lab'),
                            value: labMode,
                            options: modeOptions,
                            onChange: (v) => setAttributes({ labMode: v })
                        }),
                        el(SelectControl, {
                            label: __('Language', 'periodic-voice-lab'),
                            value: language,
                            options: languageOptions,
                            onChange: (v) => setAttributes({ language: v })
                        }),
                        labMode === 'speech-recognition' && el(TextareaControl, {
                            label: __('Target Phrase to Validate', 'periodic-voice-lab'),
                            value: promptPhrase,
                            onChange: (v) => setAttributes({ promptPhrase: v }),
                            rows: 3
                        }),
                        el(RangeControl, {
                            label: __('Max Recording Duration (seconds)', 'periodic-voice-lab'),
                            value: maxRecordingTime,
                            onChange: (v) => setAttributes({ maxRecordingTime: v }),
                            min: 5,
                            max: 180,
                            step: 5
                        }),
                        el(TextControl, {
                            label: __('Custom Block Title (Optional)', 'periodic-voice-lab'),
                            value: customTitle,
                            onChange: (v) => setAttributes({ customTitle: v })
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'voice-lab-card shadow-sm border rounded-4 p-4 bg-white' },
                        el(
                            'div',
                            { className: 'd-flex justify-content-between align-items-center mb-3 pb-2 border-bottom' },
                            el('div', { className: 'd-flex align-items-center gap-2' },
                                el('span', { className: 'badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill font-monospace' }, '🎙️ Periodic Voice Lab'),
                                el('span', { className: 'badge bg-dark-subtle text-dark rounded-pill' }, language)
                            ),
                            el('span', {
                                className: 'badge rounded-pill px-3 py-2 ' + (labMode === 'recorder' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-info-subtle text-info-emphasis border border-info-subtle')
                            }, labMode === 'recorder' ? '🎙️ Mode: Voice Recorder (.wav)' : '🎯 Mode: Speech Recognition & Levenshtein')
                        ),
                        el('h4', { className: 'fw-bold mb-1 text-dark' }, customTitle || (labMode === 'recorder' ? __('Voice Recorder & Audio Studio', 'periodic-voice-lab') : __('Pronunciation Validator Lab', 'periodic-voice-lab'))),
                        el('p', { className: 'text-muted small mb-3' }, labMode === 'recorder' ? __('Native Web Audio API recorder with live wave visualizer and PCM .wav export.', 'periodic-voice-lab') : __('Native Web Speech API listening to your voice with algorithmic Levenshtein matching.', 'periodic-voice-lab')),
                        labMode === 'speech-recognition' && el(
                            'div',
                            { className: 'target-phrase-preview p-3 mb-3 rounded-3 bg-light border border-primary-subtle' },
                            el('div', { className: 'small fw-semibold text-primary text-uppercase mb-1' }, __('Target Phrase to Speak:', 'periodic-voice-lab')),
                            el('div', { className: 'fs-5 fw-medium text-dark fst-italic' }, '"' + promptPhrase + '"')
                        ),
                        el('div', { className: 'soundwave-mockup d-flex align-items-center justify-content-center gap-1 my-3 p-3 rounded-3 bg-dark' },
                            [30, 50, 80, 45, 95, 60, 40, 75, 100, 85, 40, 60, 90, 35, 70, 50, 30].map((h, i) =>
                                el('div', {
                                    key: i,
                                    className: 'wave-bar',
                                    style: { height: (h * 0.4) + 'px', width: '4px', background: 'linear-gradient(180deg, #00f2fe 0%, #4facfe 100%)', borderRadius: '2px' }
                                })
                            ),
                            el('span', { className: 'text-white-50 ms-3 font-monospace small' }, '00:00 / 00:' + (maxRecordingTime < 10 ? '0' + maxRecordingTime : maxRecordingTime))
                        ),
                        el('div', { className: 'd-flex flex-wrap align-items-center justify-content-center gap-3 mt-4' },
                            el('button', { type: 'button', className: 'btn btn-danger rounded-circle p-3 shadow', style: { width: '54px', height: '54px' } }, el('i', { className: 'fa-solid fa-microphone fs-5' })),
                            el('button', { type: 'button', className: 'btn btn-secondary rounded-circle p-3 shadow-sm', disabled: true, style: { width: '54px', height: '54px' } }, el('i', { className: 'fa-solid fa-stop fs-5' })),
                            el('button', { type: 'button', className: 'btn btn-success px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2', disabled: true }, el('i', { className: 'fa-solid fa-play' }), el('span', null, __('Play Preview', 'periodic-voice-lab'))),
                            labMode === 'recorder' ? el('button', { type: 'button', className: 'btn btn-outline-primary px-3 py-2 rounded-pill d-flex align-items-center gap-2', disabled: true }, el('i', { className: 'fa-solid fa-download' }), el('span', null, __('Download .wav', 'periodic-voice-lab'))) : null
                        )
                    )
                )
            );
        },
        save: function (props) {
            const { attributes } = props;
            const { labMode, promptPhrase, language, maxRecordingTime, customTitle } = attributes;
            const blockProps = useBlockProps.save({
                className: 'periodic-voice-lab-container mode-' + labMode,
                'data-mode': labMode,
                'data-prompt-phrase': promptPhrase,
                'data-language': language,
                'data-max-time': maxRecordingTime,
            });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'card shadow-sm border-0 rounded-4 overflow-hidden voice-lab-wrapper' },
                    el(
                        'div',
                        { className: 'card-header bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center flex-wrap gap-2' },
                        el('div', { className: 'd-flex align-items-center gap-2' },
                            el('span', { className: 'badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill font-monospace' },
                                el('i', { className: 'fa-solid fa-microphone-lines me-1' }), ' Periodic Voice Lab'
                            ),
                            el('span', { className: 'badge bg-secondary-subtle text-secondary rounded-pill lang-badge' }, language)
                        ),
                        el('span', {
                            className: 'badge rounded-pill px-3 py-2 mode-badge ' + (labMode === 'recorder' ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-info-subtle text-info-emphasis border border-info-subtle')
                        }, labMode === 'recorder' ? '🎙️ Gravador de Áudio (.wav)' : '🎯 Validador de Pronúncia')
                    ),
                    el(
                        'div',
                        { className: 'card-body p-4' },
                        el('div', { className: 'mb-3 text-center text-md-start' },
                            el('h4', { className: 'fw-bold text-dark mb-1 voice-lab-title' }, customTitle || (labMode === 'recorder' ? 'Gravador de Voz do Aluno' : 'Validador de Pronúncia')),
                            el('p', { className: 'text-muted small mb-0 voice-lab-subtitle' }, labMode === 'recorder' ? 'Grave sua voz pelo microfone, ouça o áudio capturado e faça o download em formato .wav.' : 'Fale a frase indicada com clareza. O sistema compara sua fala e calcula a similaridade da pronúncia.')
                        ),
                        labMode === 'speech-recognition' && el(
                            'div',
                            { className: 'target-phrase-card p-3 mb-4 rounded-3 border' },
                            el('div', { className: 'd-flex justify-content-between align-items-center mb-1' },
                                el('span', { className: 'small fw-semibold text-primary text-uppercase' }, el('i', { className: 'fa-solid fa-bullseye me-1' }), ' Frase Alvo:'),
                                el('button', { type: 'button', className: 'btn btn-sm btn-outline-secondary rounded-pill py-0 px-2 btn-speak-target', title: 'Ouvir referência por síntese de voz' }, el('i', { className: 'fa-solid fa-volume-high me-1' }), ' Ouvir Exemplo')
                            ),
                            el('div', { className: 'target-phrase-text fs-5 fw-bold text-dark font-sans' }, promptPhrase)
                        ),
                        el(
                            'div',
                            { className: 'visualizer-box position-relative rounded-4 p-3 mb-4 bg-dark shadow-inner text-center' },
                            el('div', { className: 'd-flex justify-content-between align-items-center text-white-50 px-2 mb-2 small font-monospace' },
                                el('span', { className: 'live-status-indicator d-flex align-items-center gap-2' },
                                    el('span', { className: 'status-dot' }),
                                    el('span', { className: 'status-text' }, 'Pronto para iniciar')
                                ),
                                el('span', { className: 'time-display' },
                                    el('span', { className: 'current-time' }, '00:00'), ' / ',
                                    el('span', { className: 'max-time' }, '00:' + (maxRecordingTime < 10 ? '0' + maxRecordingTime : maxRecordingTime))
                                )
                            ),
                            el('div', { className: 'canvas-wrapper position-relative' },
                                el('canvas', { className: 'voice-lab-canvas w-100', height: 90 }),
                                el('div', { className: 'canvas-placeholder-wave d-flex justify-content-center align-items-center gap-1 position-absolute top-50 start-50 translate-middle w-100' },
                                    el('span', { className: 'text-white-50 small' }, 'Clique no botão vermelho para iniciar gravação')
                                )
                            ),
                            el('div', { className: 'progress mt-2', style: { height: '4px', backgroundColor: 'rgba(255,255,255,0.1)' } },
                                el('div', { className: 'progress-bar bg-danger progress-bar-striped progress-bar-animated', role: 'progressbar', style: { width: '0%' } })
                            )
                        ),
                        el(
                            'div',
                            { className: 'd-flex flex-wrap align-items-center justify-content-center gap-3 mb-3' },
                            el('button', { type: 'button', className: 'btn btn-danger rounded-circle btn-rec shadow p-0 d-flex align-items-center justify-content-center', style: { width: '58px', height: '58px' }, title: 'Gravar Áudio' }, el('i', { className: 'fa-solid fa-microphone fs-4' })),
                            el('button', { type: 'button', className: 'btn btn-secondary rounded-circle btn-stop shadow-sm p-0 d-flex align-items-center justify-content-center', style: { width: '58px', height: '58px' }, title: 'Parar Gravação', disabled: true }, el('i', { className: 'fa-solid fa-stop fs-4' })),
                            el('button', { type: 'button', className: 'btn btn-success btn-play px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2', disabled: true }, el('i', { className: 'fa-solid fa-play' }), el('span', { className: 'btn-play-text' }, 'Ouvir Gravação')),
                            labMode === 'recorder' && el('button', { type: 'button', className: 'btn btn-outline-primary btn-download-wav px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2', disabled: true }, el('i', { className: 'fa-solid fa-download' }), el('span', null, 'Baixar .wav'))
                        ),
                        el('audio', { className: 'voice-lab-audio d-none', preload: 'auto' }),
                        labMode === 'speech-recognition' && el(
                            'div',
                            { className: 'recognition-results-area mt-4 p-3 rounded-4 bg-light border', style: { display: 'none' } },
                            el('div', { className: 'row g-3 align-items-center' },
                                el('div', { className: 'col-12 col-md-8' },
                                    el('div', { className: 'small fw-bold text-muted text-uppercase mb-1' }, el('i', { className: 'fa-solid fa-ear-listen me-1' }), ' Transcrição Reconhecida:'),
                                    el('div', { className: 'transcription-text fs-5 p-2 bg-white rounded-3 border min-h-50' }, el('span', { className: 'text-muted fst-italic' }, 'Aguardando fala...')),
                                    el('div', { className: 'words-diff-container mt-2 small' })
                                ),
                                el('div', { className: 'col-12 col-md-4 text-center border-start-md' },
                                    el('div', { className: 'small fw-bold text-muted text-uppercase mb-1' }, 'Similaridade Levenshtein'),
                                    el('div', { className: 'd-flex flex-column align-items-center justify-content-center' },
                                        el('div', { className: 'score-circle-wrapper position-relative my-2' },
                                            el('div', { className: 'score-percentage fs-2 fw-black text-primary' }, '0%')
                                        ),
                                        el('div', { className: 'score-feedback-badge badge rounded-pill px-3 py-2 bg-secondary' }, 'Aguardando fala')
                                    )
                                )
                            )
                        )
                    ),
                    el(
                        'div',
                        { className: 'card-footer bg-light-subtle border-top py-2 px-4 d-flex justify-content-between align-items-center text-muted small' },
                        el('span', null, el('i', { className: 'fa-solid fa-wave-square me-1' }), ' Web Audio API (.wav)'),
                        el('span', null, el('i', { className: 'fa-solid fa-microchip me-1' }), ' Web Speech API (Levenshtein)')
                    )
                )
            );
        }
    });
})();
