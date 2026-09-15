/**
 * Periodic Voice Lab - Frontend Interactive Engine
 * Native Web Audio API (.wav export) & Web Speech API (Levenshtein Pronunciation)
 */

(function () {
    'use strict';

    /**
     * Compute Levenshtein distance between two strings
     */
    function computeLevenshteinDistance(a, b) {
        if (!a) return b ? b.length : 0;
        if (!b) return a ? a.length : 0;

        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }

    /**
     * Clean string for phonetic comparison (remove accents, punctuation, lowercase)
     */
    function normalizeSpeechText(text) {
        return (text || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s]/g, '')
            .trim();
    }

    /**
     * Converts an AudioBuffer to a genuine 16-bit PCM .WAV Blob (canonical RIFF header)
     */
    function audioBufferToWavBlob(buffer) {
        const numChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;
        
        let resultBuffer;
        if (numChannels === 2) {
            resultBuffer = interleaveChannels(buffer.getChannelData(0), buffer.getChannelData(1));
        } else {
            resultBuffer = buffer.getChannelData(0);
        }

        const dataLength = resultBuffer.length * 2;
        const bufferLength = 44 + dataLength;
        const arrayBuffer = new ArrayBuffer(bufferLength);
        const view = new DataView(arrayBuffer);

        // RIFF chunk descriptor
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + dataLength, true);
        writeString(view, 8, 'WAVE');

        // FMT sub-chunk
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
        view.setUint16(20, format, true); // AudioFormat
        view.setUint16(22, numChannels, true); // NumChannels
        view.setUint32(24, sampleRate, true); // SampleRate
        view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true); // ByteRate
        view.setUint16(32, numChannels * (bitDepth / 8), true); // BlockAlign
        view.setUint16(34, bitDepth, true); // BitsPerSample

        // DATA sub-chunk
        writeString(view, 36, 'data');
        view.setUint32(40, dataLength, true);

        // Write PCM samples
        floatTo16BitPCM(view, 44, resultBuffer);

        return new Blob([view], { type: 'audio/wav' });
    }

    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    function floatTo16BitPCM(output, offset, input) {
        for (let i = 0; i < input.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, input[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    }

    function interleaveChannels(inputL, inputR) {
        const length = inputL.length + inputR.length;
        const result = new Float32Array(length);
        let index = 0;
        let inputIndex = 0;
        while (index < length) {
            result[index++] = inputL[inputIndex];
            result[index++] = inputR[inputIndex];
            inputIndex++;
        }
        return result;
    }

    /**
     * Initializes an individual Voice Lab block container
     */
    function initVoiceLabBlock(container) {
        const mode = container.getAttribute('data-mode') || 'recorder';
        const targetPhrase = container.getAttribute('data-prompt-phrase') || '';
        const language = container.getAttribute('data-language') || 'en-US';
        const maxRecordingTime = parseInt(container.getAttribute('data-max-time'), 10) || 30;

        // Elements
        const btnRec = container.querySelector('.btn-rec');
        const btnStop = container.querySelector('.btn-stop');
        const btnPlay = container.querySelector('.btn-play');
        const btnPlayText = container.querySelector('.btn-play-text');
        const btnDownloadWav = container.querySelector('.btn-download-wav');
        const btnSpeakTarget = container.querySelector('.btn-speak-target');

        const canvas = container.querySelector('.voice-lab-canvas');
        const placeholderWave = container.querySelector('.canvas-placeholder-wave');
        const statusText = container.querySelector('.status-text');
        const statusDot = container.querySelector('.status-dot');
        const currentTimeEl = container.querySelector('.current-time');
        const progressBar = container.querySelector('.progress-bar');
        const audioEl = container.querySelector('.voice-lab-audio');

        // Recognition elements
        const recognitionResultsArea = container.querySelector('.recognition-results-area');
        const transcriptionTextEl = container.querySelector('.transcription-text');
        const wordsDiffContainer = container.querySelector('.words-diff-container');
        const scorePercentageEl = container.querySelector('.score-percentage');
        const scoreFeedbackBadge = container.querySelector('.score-feedback-badge');

        // State variables
        let mediaStream = null;
        let mediaRecorder = null;
        let recordedChunks = [];
        let audioContext = null;
        let analyser = null;
        let animationFrameId = null;
        let recordingTimer = null;
        let elapsedSeconds = 0;
        let isRecording = false;
        let generatedWavBlob = null;
        let speechRecognition = null;
        let recognizedFinalTranscript = '';

        // Canvas setup
        const canvasCtx = canvas ? canvas.getContext('2d') : null;

        // Check Web Speech API support
        const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

        /**
         * Update status message and dot indicator
         */
        function setStatus(text, stateClass = '') {
            if (statusText) statusText.textContent = text;
            if (statusDot) {
                statusDot.className = 'status-dot ' + stateClass;
            }
        }

        /**
         * Format seconds to mm:ss
         */
        function formatTime(seconds) {
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
        }

        /**
         * Real-time Canvas Waveform Animation
         */
        function drawWaveform() {
            if (!analyser || !canvasCtx || !isRecording) return;

            animationFrameId = requestAnimationFrame(drawWaveform);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = '#111827';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2.5;
            // Neon cyan gradient
            const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, '#00f2fe');
            gradient.addColorStop(0.5, '#4facfe');
            gradient.addColorStop(1, '#00f2fe');
            canvasCtx.strokeStyle = gradient;
            canvasCtx.beginPath();

            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        }

        /**
         * Start Recording Voice & Audio Stream
         */
        async function startRecording() {
            try {
                // Request microphone
                mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                });

                // Web Audio API Context & Analyser
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(mediaStream);
                analyser = audioContext.createAnalyser();
                analyser.fftSize = 1024;
                source.connect(analyser);

                // Prepare canvas dimensions
                if (canvas) {
                    canvas.width = canvas.parentElement.clientWidth || 400;
                    canvas.height = 90;
                }
                if (placeholderWave) placeholderWave.style.display = 'none';

                // MediaRecorder for raw audio capture
                recordedChunks = [];
                let options = { mimeType: 'audio/webm' };
                if (!MediaRecorder.isTypeSupported('audio/webm')) {
                    if (MediaRecorder.isTypeSupported('audio/mp4')) options = { mimeType: 'audio/mp4' };
                    else options = {};
                }
                mediaRecorder = new MediaRecorder(mediaStream, options);

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) {
                        recordedChunks.push(e.data);
                    }
                };

                mediaRecorder.onstop = async () => {
                    await processRecordedAudio();
                };

                mediaRecorder.start(100);
                isRecording = true;

                // Speech Recognition (if in speech-recognition mode)
                if (mode === 'speech-recognition') {
                    startSpeechRecognition();
                }

                // Controls State
                btnRec.disabled = true;
                btnRec.classList.add('pulse-recording');
                btnStop.disabled = false;
                if (btnPlay) btnPlay.disabled = true;
                if (btnDownloadWav) btnDownloadWav.disabled = true;

                setStatus(mode === 'speech-recognition' ? 'Ouvindo sua voz...' : 'Gravando áudio...', 'recording');

                // Start Timer
                elapsedSeconds = 0;
                if (currentTimeEl) currentTimeEl.textContent = '00:00';
                if (progressBar) progressBar.style.width = '0%';

                recordingTimer = setInterval(() => {
                    elapsedSeconds++;
                    if (currentTimeEl) currentTimeEl.textContent = formatTime(elapsedSeconds);
                    if (progressBar) {
                        const pct = Math.min(100, (elapsedSeconds / maxRecordingTime) * 100);
                        progressBar.style.width = `${pct}%`;
                    }

                    if (elapsedSeconds >= maxRecordingTime) {
                        stopRecording();
                    }
                }, 1000);

                // Start Visualizer
                drawWaveform();

            } catch (err) {
                console.error('Erro ao acessar microfone:', err);
                setStatus('Permissão de microfone negada ou indisponível.', 'error');
                alert('Não foi possível acessar seu microfone. Verifique as permissões do navegador.');
            }
        }

        /**
         * Stop Recording
         */
        function stopRecording() {
            if (!isRecording) return;
            isRecording = false;

            if (recordingTimer) {
                clearInterval(recordingTimer);
                recordingTimer = null;
            }

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }

            // Stop MediaRecorder
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }

            // Stop Speech Recognition
            if (speechRecognition) {
                try { speechRecognition.stop(); } catch (e) {}
            }

            // Stop media stream tracks
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }

            btnRec.disabled = false;
            btnRec.classList.remove('pulse-recording');
            btnStop.disabled = true;

            setStatus('Processando gravação...', 'processing');
        }

        /**
         * Process Recorded Audio into True PCM WAV
         */
        async function processRecordedAudio() {
            try {
                const recordedBlob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
                const arrayBuf = await recordedBlob.arrayBuffer();

                // Decode audio data using Web Audio API
                const offlineCtx = new (window.AudioContext || window.webkitAudioContext)();
                const decodedAudioBuffer = await offlineCtx.decodeAudioData(arrayBuf);

                // Convert to real standard 16-bit PCM .WAV Blob
                generatedWavBlob = audioBufferToWavBlob(decodedAudioBuffer);
                const wavUrl = URL.createObjectURL(generatedWavBlob);

                // Set up player
                if (audioEl) {
                    audioEl.src = wavUrl;
                    audioEl.onended = () => {
                        if (btnPlayText) btnPlayText.textContent = 'Ouvir Gravação';
                        if (btnPlay) {
                            btnPlay.classList.remove('btn-warning');
                            btnPlay.classList.add('btn-success');
                            btnPlay.querySelector('i').className = 'fa-solid fa-play';
                        }
                    };
                }

                if (btnPlay) btnPlay.disabled = false;
                if (btnDownloadWav) {
                    btnDownloadWav.disabled = false;
                    btnDownloadWav.onclick = () => {
                        const a = document.createElement('a');
                        a.href = wavUrl;
                        a.download = `voice-lab-recording-${Date.now()}.wav`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    };
                }

                setStatus('Gravação concluída!', 'ready');

                // Draw static waveform summary on canvas
                drawStaticWaveform(decodedAudioBuffer);

            } catch (error) {
                console.warn('WAV conversion fallback:', error);
                // Fallback: use recorded blob directly
                const fallbackBlob = new Blob(recordedChunks, { type: 'audio/wav' });
                const url = URL.createObjectURL(fallbackBlob);
                if (audioEl) audioEl.src = url;
                if (btnPlay) btnPlay.disabled = false;
                if (btnDownloadWav) {
                    btnDownloadWav.disabled = false;
                    btnDownloadWav.onclick = () => {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `voice-lab-recording-${Date.now()}.wav`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    };
                }
                setStatus('Áudio pronto.', 'ready');
            }
        }

        /**
         * Render static audio waveform summary after recording
         */
        function drawStaticWaveform(audioBuffer) {
            if (!canvasCtx || !canvas) return;
            const rawData = audioBuffer.getChannelData(0);
            const samples = 100;
            const blockSize = Math.floor(rawData.length / samples);
            const filteredData = [];

            for (let i = 0; i < samples; i++) {
                let blockStart = blockSize * i;
                let sum = 0;
                for (let j = 0; j < blockSize; j++) {
                    sum = sum + Math.abs(rawData[blockStart + j]);
                }
                filteredData.push(sum / blockSize);
            }

            canvasCtx.fillStyle = '#111827';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = canvas.width / samples;
            for (let i = 0; i < samples; i++) {
                const barHeight = Math.max(4, filteredData[i] * canvas.height * 1.6);
                const x = i * barWidth;
                const y = (canvas.height - barHeight) / 2;

                canvasCtx.fillStyle = '#00f2fe';
                canvasCtx.fillRect(x, y, barWidth - 1, barHeight);
            }
        }

        /**
         * Web Speech API: Initialize & Listen
         */
        function startSpeechRecognition() {
            if (!SpeechRecognitionClass) {
                if (transcriptionTextEl) {
                    transcriptionTextEl.innerHTML = '<span class="text-danger">Reconhecimento de fala não suportado neste navegador (recomendamos Chrome/Edge).</span>';
                }
                if (recognitionResultsArea) recognitionResultsArea.style.display = 'block';
                return;
            }

            speechRecognition = new SpeechRecognitionClass();
            speechRecognition.lang = language;
            speechRecognition.continuous = true;
            speechRecognition.interimResults = true;

            recognizedFinalTranscript = '';
            if (recognitionResultsArea) recognitionResultsArea.style.display = 'block';
            if (transcriptionTextEl) {
                transcriptionTextEl.innerHTML = '<span class="text-muted fst-italic">Ouvindo...</span>';
            }

            speechRecognition.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        recognizedFinalTranscript += event.results[i][0].transcript + ' ';
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                const currentText = (recognizedFinalTranscript + interimTranscript).trim();
                if (transcriptionTextEl) {
                    transcriptionTextEl.textContent = currentText || '...';
                }

                // Compute accuracy in real-time
                evaluatePronunciation(currentText, targetPhrase);
            };

            speechRecognition.onerror = (event) => {
                console.warn('Speech recognition error:', event.error);
                if (event.error === 'no-speech') {
                    // Ignored, user might be pausing
                }
            };

            try {
                speechRecognition.start();
            } catch (e) {
                console.warn('Recognition already started:', e);
            }
        }

        /**
         * Evaluate Pronunciation with Levenshtein Distance & Word Diff
         */
        function evaluatePronunciation(spokenText, referenceText) {
            const cleanSpoken = normalizeSpeechText(spokenText);
            const cleanTarget = normalizeSpeechText(referenceText);

            if (!cleanSpoken || !cleanTarget) return;

            // Levenshtein distance on normalized strings
            const dist = computeLevenshteinDistance(cleanSpoken, cleanTarget);
            const maxLen = Math.max(cleanSpoken.length, cleanTarget.length);
            const similarity = Math.max(0, Math.round((1 - dist / maxLen) * 100));

            // Update percentage
            if (scorePercentageEl) {
                scorePercentageEl.textContent = `${similarity}%`;
            }

            // Update Feedback Badge
            if (scoreFeedbackBadge) {
                if (similarity >= 85) {
                    scoreFeedbackBadge.className = 'score-feedback-badge badge rounded-pill px-3 py-2 bg-success text-white';
                    scoreFeedbackBadge.textContent = 'Excelente Pronúncia! 🌟';
                } else if (similarity >= 70) {
                    scoreFeedbackBadge.className = 'score-feedback-badge badge rounded-pill px-3 py-2 bg-primary text-white';
                    scoreFeedbackBadge.textContent = 'Muito Bom! 👍';
                } else if (similarity >= 50) {
                    scoreFeedbackBadge.className = 'score-feedback-badge badge rounded-pill px-3 py-2 bg-warning text-dark';
                    scoreFeedbackBadge.textContent = 'Bom Esforço! Pratique mais 🔁';
                } else {
                    scoreFeedbackBadge.className = 'score-feedback-badge badge rounded-pill px-3 py-2 bg-danger text-white';
                    scoreFeedbackBadge.textContent = 'Tente novamente com clareza 🎙️';
                }
            }

            // Word-by-word tokenized diff
            if (wordsDiffContainer) {
                const targetWords = cleanTarget.split(/\s+/);
                const spokenWords = cleanSpoken.split(/\s+/);
                
                let diffHtml = '<div class="d-flex flex-wrap gap-1 align-items-center mt-2">';
                diffHtml += '<span class="text-muted small me-2">Análise de Palavras:</span>';

                targetWords.forEach((word) => {
                    if (spokenWords.includes(word)) {
                        diffHtml += `<span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">${word} ✓</span>`;
                    } else {
                        diffHtml += `<span class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">${word} ✗</span>`;
                    }
                });

                diffHtml += '</div>';
                wordsDiffContainer.innerHTML = diffHtml;
            }
        }

        /**
         * Speech Synthesis for target phrase preview ("Ouvir Exemplo")
         */
        if (btnSpeakTarget && targetPhrase) {
            btnSpeakTarget.addEventListener('click', () => {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(targetPhrase);
                    utterance.lang = language;
                    utterance.rate = 0.9; // clear educational rate
                    window.speechSynthesis.speak(utterance);
                } else {
                    alert('Síntese de voz não suportada pelo navegador.');
                }
            });
        }

        // Event Listeners for Controls
        if (btnRec) {
            btnRec.addEventListener('click', () => {
                startRecording();
            });
        }

        if (btnStop) {
            btnStop.addEventListener('click', () => {
                stopRecording();
            });
        }

        if (btnPlay) {
            btnPlay.addEventListener('click', () => {
                if (!audioEl) return;
                if (audioEl.paused) {
                    audioEl.play();
                    if (btnPlayText) btnPlayText.textContent = 'Pausar Áudio';
                    btnPlay.classList.remove('btn-success');
                    btnPlay.classList.add('btn-warning');
                    btnPlay.querySelector('i').className = 'fa-solid fa-pause';
                } else {
                    audioEl.pause();
                    if (btnPlayText) btnPlayText.textContent = 'Ouvir Gravação';
                    btnPlay.classList.remove('btn-warning');
                    btnPlay.classList.add('btn-success');
                    btnPlay.querySelector('i').className = 'fa-solid fa-play';
                }
            });
        }
    }

    /**
     * Auto-init all voice lab blocks on DOMContentLoaded
     */
    function initAllBlocks() {
        const blocks = document.querySelectorAll('.periodic-voice-lab-container');
        blocks.forEach((el) => {
            if (!el.dataset.initialized) {
                el.dataset.initialized = 'true';
                initVoiceLabBlock(el);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllBlocks);
    } else {
        initAllBlocks();
    }

    // Expose init helper globally for dynamic insertion/preview
    window.initPeriodicVoiceLab = initVoiceLabBlock;
})();
