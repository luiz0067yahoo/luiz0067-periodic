(()=>{var w={locale:"pt-BR",block:{title:"Treinador de Cart\xF5es (Card Trainer)",description:"Apresente cart\xF5es interativos em 3 modos: Flashcard (com input de texto), Dialog Cards (virar frente/verso) e Jogo da Mem\xF3ria (grid de pares virados com timer e movimentos)."},settings:{gameMode:"Modo de Apresenta\xE7\xE3o",gameModeHelp:"Escolha como os cart\xF5es ser\xE3o apresentados aos alunos ou usu\xE1rios.",modeFlashcard:"Flashcard (com input de texto)",modeDialogCard:"Dialog Cards (Virar Frente/Verso)",modeMemoryGrid:"Jogo da Mem\xF3ria (Grid de Pares)",columns:"Colunas no Grid",columnsHelp:"N\xFAmero de colunas no layout Bootstrap para o Jogo da Mem\xF3ria e cart\xF5es.",displayOptions:"Op\xE7\xF5es de Exibi\xE7\xE3o",showTimer:"Exibir Cron\xF4metro",showMoves:"Exibir Contador de Movimentos",cardHeight:"Altura dos Cart\xF5es (px)",cardsList:"Lista de Cart\xF5es",addCard:"Adicionar Novo Cart\xE3o",deleteCard:"Excluir Cart\xE3o",duplicateCard:"Duplicar Cart\xE3o",moveUp:"Mover para Cima",moveDown:"Mover para Baixo",cardTitle:"Cart\xE3o {index}",frontImage:"Imagem da Frente",uploadImage:"Selecionar Imagem",removeImage:"Remover Imagem",frontText:"Texto da Frente (Pergunta/Termo)",frontTextPlaceholder:"Ex: Qual \xE9 a capital da Fran\xE7a?",backText:"Texto do Verso (Resposta/Tradu\xE7\xE3o)",backTextPlaceholder:"Ex: Paris",tip:"Dica / Ajuda (Opcional)",tipPlaceholder:"Ex: Come\xE7a com a letra P...",audioUrl:"\xC1udio de Pron\xFAncia / Som (Opcional)",uploadAudio:"Selecionar \xC1udio",removeAudio:"Remover \xC1udio",testAudio:"Testar \xC1udio",previewFlip:"Alternar Verso no Editor"},frontend:{card:"Cart\xE3o",of:"de",turnOver:"Virar Cart\xE3o",turnBack:"Voltar para Frente",previous:"Anterior",next:"Pr\xF3ximo",listen:"Ouvir Pron\xFAncia",showTip:"Ver Dica",hideTip:"Ocultar Dica",typeAnswer:"Digite sua resposta...",check:"Verificar Resposta",correct:"Excelente! Resposta correta!",incorrect:"Resposta incorreta. Tente novamente!",showAnswer:"Ver Resposta Correta",answerIs:"A resposta correta \xE9:",moves:"Movimentos",time:"Tempo",pairs:"Pares Encontrados",reset:"Reiniciar",restartGame:"Reiniciar Jogo",congratulations:"Parab\xE9ns! Voc\xEA venceu!",victoryMessage:"Voc\xEA completou o jogo da mem\xF3ria em {moves} movimentos e {time}!",playAgain:"Jogar Novamente",matched:"Par Encontrado!"}};var M={locale:"en-US",block:{title:"Card Trainer",description:"Present interactive cards in 3 modes: Flashcard (with text input check), Dialog Cards (3D flip front/back), and Memory Game (face-down paired grid with timer and moves)."},settings:{gameMode:"Display Mode",gameModeHelp:"Choose how cards will be presented to students or users.",modeFlashcard:"Flashcard (with text input check)",modeDialogCard:"Dialog Cards (3D Flip Front/Back)",modeMemoryGrid:"Memory Game (Paired Grid)",columns:"Grid Columns",columnsHelp:"Number of columns in Bootstrap layout for Memory Game and grid view.",displayOptions:"Display Options",showTimer:"Show Timer",showMoves:"Show Move Counter",cardHeight:"Card Height (px)",cardsList:"Card List",addCard:"Add New Card",deleteCard:"Delete Card",duplicateCard:"Duplicate Card",moveUp:"Move Up",moveDown:"Move Down",cardTitle:"Card {index}",frontImage:"Front Image",uploadImage:"Select Image",removeImage:"Remove Image",frontText:"Front Text (Question / Term)",frontTextPlaceholder:"E.g.: What is the capital of France?",backText:"Back Text (Answer / Translation)",backTextPlaceholder:"E.g.: Paris",tip:"Tip / Hint (Optional)",tipPlaceholder:"E.g.: Starts with the letter P...",audioUrl:"Audio Pronunciation / Sound (Optional)",uploadAudio:"Select Audio",removeAudio:"Remove Audio",testAudio:"Test Audio",previewFlip:"Toggle 3D Flip in Editor"},frontend:{card:"Card",of:"of",turnOver:"Turn Over",turnBack:"Turn Back",previous:"Previous",next:"Next",listen:"Play Audio",showTip:"Show Hint",hideTip:"Hide Hint",typeAnswer:"Type your answer...",check:"Check Answer",correct:"Great job! That's correct!",incorrect:"Incorrect answer. Try again!",showAnswer:"Reveal Answer",answerIs:"The correct answer is:",moves:"Moves",time:"Time",pairs:"Pairs Found",reset:"Reset",restartGame:"Restart Game",congratulations:"Congratulations! You Won!",victoryMessage:"You completed the memory game in {moves} moves and {time}!",playAgain:"Play Again",matched:"Pair Matched!"}};var $={locale:"it-IT",block:{title:"Allenatore di Carte (Card Trainer)",description:"Presenta carte interattive in 3 modalit\xE0: Flashcard (con verifica del testo), Dialog Cards (flip 3D fronte/retro) e Gioco della Memoria (griglia a coppie con timer e mosse)."},settings:{gameMode:"Modalit\xE0 di Gioco",gameModeHelp:"Scegli come presentare le carte agli studenti o utenti.",modeFlashcard:"Flashcard (con verifica del testo)",modeDialogCard:"Dialog Cards (Flip 3D Fronte/Retro)",modeMemoryGrid:"Gioco della Memoria (Griglia a Coppie)",columns:"Colonne della Griglia",columnsHelp:"Numero di colonne nel layout Bootstrap per il Gioco della Memoria.",displayOptions:"Opzioni di Visualizzazione",showTimer:"Mostra Cronometro",showMoves:"Mostra Contatore Mosse",cardHeight:"Altezza Carte (px)",cardsList:"Elenco Carte",addCard:"Aggiungi Nuova Carta",deleteCard:"Elimina Carta",duplicateCard:"Duplica Carta",moveUp:"Sposta su",moveDown:"Sposta gi\xF9",cardTitle:"Carta {index}",frontImage:"Immagine Frontale",uploadImage:"Seleziona Immagine",removeImage:"Rimuovi Immagine",frontText:"Testo Frontale (Domanda / Termine)",frontTextPlaceholder:"Es: Qual \xE8 la capitale della Francia?",backText:"Testo Retro (Risposta / Traduzione)",backTextPlaceholder:"Es: Parigi",tip:"Suggerimento / Aiuto (Opzionale)",tipPlaceholder:"Es: Inizia con la lettera P...",audioUrl:"Audio Pronuncia / Suono (Opzionale)",uploadAudio:"Seleziona Audio",removeAudio:"Rimuovi Audio",testAudio:"Ascolta Audio",previewFlip:"Anteprima Flip nell'Editor"},frontend:{card:"Carta",of:"di",turnOver:"Gira Carta",turnBack:"Torna al Fronte",previous:"Precedente",next:"Successivo",listen:"Riproduci Audio",showTip:"Mostra Suggerimento",hideTip:"Nascondi Suggerimento",typeAnswer:"Scrivi la tua resposta...",check:"Verifica Risposta",correct:"Ottimo! Risposta corretta!",incorrect:"Risposta errata. Riprova!",showAnswer:"Mostra Risposta",answerIs:"La risposta corretta \xE8:",moves:"Mosse",time:"Tempo",pairs:"Coppie Trovate",reset:"Ricomincia",restartGame:"Ricomincia Partita",congratulations:"Congratulazioni! Hai Vinto!",victoryMessage:"Hai completato il gioco della memoria in {moves} mosse e {time}!",playAgain:"Gioca Ancora",matched:"Coppia Trovata!"}};var L={locale:"es-ES",block:{title:"Entrenador de Tarjetas (Card Trainer)",description:"Presenta tarjetas interactivas en 3 modos: Flashcard (con verificaci\xF3n de texto), Dialog Cards (giro 3D anverso/reverso) y Juego de Memoria (cuadr\xEDcula de parejas con temporizador y movimientos)."},settings:{gameMode:"Modo de Presentaci\xF3n",gameModeHelp:"Elige c\xF3mo se presentar\xE1n las tarjetas a los alumnos o usuarios.",modeFlashcard:"Flashcard (con verificaci\xF3n de texto)",modeDialogCard:"Dialog Cards (Giro 3D Anverso/Reverso)",modeMemoryGrid:"Juego de Memoria (Cuadr\xEDcula de Parejas)",columns:"Columnas en la Cuadr\xEDcula",columnsHelp:"N\xFAmero de columnas en el dise\xF1o Bootstrap para el Juego de Memoria.",displayOptions:"Opciones de Visualizaci\xF3n",showTimer:"Mostrar Temporizador",showMoves:"Mostrar Contador de Movimientos",cardHeight:"Altura de Tarjetas (px)",cardsList:"Lista de Tarjetas",addCard:"A\xF1adir Nueva Tarjeta",deleteCard:"Eliminar Tarjeta",duplicateCard:"Duplicar Tarjeta",moveUp:"Mover Arriba",moveDown:"Mover Abajo",cardTitle:"Tarjeta {index}",frontImage:"Imagen Anversa (Frente)",uploadImage:"Seleccionar Imagen",removeImage:"Eliminar Imagen",frontText:"Texto Anverso (Pregunta / T\xE9rmino)",frontTextPlaceholder:"Ej: \xBFCu\xE1l es la capital de Francia?",backText:"Texto Reverso (Respuesta / Traducci\xF3n)",backTextPlaceholder:"Ej: Par\xEDs",tip:"Pista / Ayuda (Opcional)",tipPlaceholder:"Ej: Comienza con la letra P...",audioUrl:"Audio de Pronunciaci\xF3n / Sonido (Opcional)",uploadAudio:"Seleccionar Audio",removeAudio:"Eliminar Audio",testAudio:"Reproducir Audio",previewFlip:"Alternar Giro 3D en el Editor"},frontend:{card:"Tarjeta",of:"de",turnOver:"Girar Tarjeta",turnBack:"Volver al Frente",previous:"Anterior",next:"Siguiente",listen:"Escuchar Pronunciaci\xF3n",showTip:"Ver Pista",hideTip:"Ocultar Pista",typeAnswer:"Escribe tu respuesta...",check:"Comprobar Respuesta",correct:"\xA1Excelente! \xA1Respuesta correcta!",incorrect:"Respuesta incorrecta. \xA1Int\xE9ntalo de nuevo!",showAnswer:"Mostrar Respuesta",answerIs:"La respuesta correcta es:",moves:"Movimientos",time:"Tiempo",pairs:"Parejas Encontradas",reset:"Reiniciar",restartGame:"Reiniciar Juego",congratulations:"\xA1Felicitaciones! \xA1Has ganado!",victoryMessage:"\xA1Completaste el juego de memoria en {moves} movimientos y {time}!",playAgain:"Jugar de Nuevo",matched:"\xA1Pareja Encontrada!"}};var E={"pt-br":w,pt:w,"en-us":M,en:M,it:$,"it-it":$,es:L,"es-es":L};function R(f="pt-br"){let c=(f||"pt-br").toLowerCase();return E[c]||E["pt-br"]}function S(f,c="pt-br",m={}){let k=typeof window<"u"&&window.PeriodicCardTrainerI18n?window.PeriodicCardTrainerI18n:R(c),y=f.split("."),o=k;for(let t of y)if(o&&typeof o=="object"&&t in o)o=o[t];else{let i=w;for(let r of y)i=i&&i[r];o=i||f;break}return typeof o=="string"&&m?o.replace(/\{(\w+)\}/g,(t,i)=>m[i]!==void 0?m[i]:`{${i}}`):o}(function(){"use strict";class f{constructor(){this.ctx=null}init(){if(!this.ctx&&(window.AudioContext||window.webkitAudioContext)){let t=window.AudioContext||window.webkitAudioContext;this.ctx=new t}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}playTone(t,i="sine",r=.15,e=0){if(this.init(),!this.ctx)return;let n=this.ctx.createOscillator(),p=this.ctx.createGain();n.type=i,n.frequency.setValueAtTime(t,this.ctx.currentTime+e),p.gain.setValueAtTime(.2,this.ctx.currentTime+e),p.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+e+r),n.connect(p),p.connect(this.ctx.destination),n.start(this.ctx.currentTime+e),n.stop(this.ctx.currentTime+e+r)}playFlip(){this.playTone(480,"triangle",.08)}playMatch(){this.playTone(523.25,"sine",.12,0),this.playTone(659.25,"sine",.12,.08),this.playTone(783.99,"sine",.25,.16)}playError(){this.playTone(220,"sawtooth",.12,0),this.playTone(180,"sawtooth",.2,.1)}playVictory(){this.playTone(523.25,"triangle",.15,0),this.playTone(659.25,"triangle",.15,0+.12),this.playTone(783.99,"triangle",.15,0+.24),this.playTone(1046.5,"sine",.45,0+.36)}}let c=new f;function m(o,t){if(!o)return;let i=new Audio(o);t&&(t.classList.add("playing"),i.onended=()=>t.classList.remove("playing"),i.onerror=()=>t.classList.remove("playing")),i.play().catch(()=>{t&&t.classList.remove("playing")})}class k{constructor(t){this.root=t,this.mode=t.getAttribute("data-game-mode")||"flashcard",this.columns=parseInt(t.getAttribute("data-columns")||"3",10),this.cardHeight=parseInt(t.getAttribute("data-card-height")||"280",10),this.lang=t.getAttribute("data-language")||"pt-br";try{this.cards=JSON.parse(t.getAttribute("data-cards")||"[]")}catch{this.cards=[]}this.timerEl=t.querySelector(".timer-display"),this.movesEl=t.querySelector(".moves-display"),this.pairsEl=t.querySelector(".pairs-display"),this.resetBtn=t.querySelector(".btn-trainer-reset"),this.victoryOverlay=t.querySelector(".victory-overlay"),this.playAgainBtn=t.querySelector(".btn-play-again"),this.stageContainer=t.querySelector(".trainer-stage-container"),this.timerInterval=null,this.secondsElapsed=0,this.movesCount=0,this.isTimerRunning=!1,this.init()}t(t,i){return S(t,this.lang,i)}formatTime(t){let i=Math.floor(t/60).toString().padStart(2,"0"),r=(t%60).toString().padStart(2,"0");return`${i}:${r}`}startTimer(){this.isTimerRunning||(this.isTimerRunning=!0,this.timerInterval=setInterval(()=>{this.secondsElapsed++,this.timerEl&&(this.timerEl.textContent=this.formatTime(this.secondsElapsed))},1e3))}stopTimer(){this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.isTimerRunning=!1}resetStats(){this.stopTimer(),this.secondsElapsed=0,this.movesCount=0,this.timerEl&&(this.timerEl.textContent="00:00"),this.movesEl&&(this.movesEl.textContent="0"),this.victoryOverlay&&this.victoryOverlay.classList.remove("show")}incrementMoves(){this.movesCount++,this.movesEl&&(this.movesEl.textContent=this.movesCount)}init(){this.resetBtn&&this.resetBtn.addEventListener("click",()=>this.resetGame()),this.playAgainBtn&&this.playAgainBtn.addEventListener("click",()=>this.resetGame()),this.mode==="flashcard"?this.initFlashcardMode():this.mode==="dialog-card"?this.initDialogCardMode():this.mode==="memory-grid"&&this.initMemoryGridMode()}resetGame(){this.resetStats(),this.mode==="flashcard"?this.initFlashcardMode():this.mode==="dialog-card"?this.initDialogCardMode():this.mode==="memory-grid"&&this.initMemoryGridMode()}initFlashcardMode(){if(!this.cards||this.cards.length===0)return;let t=0,i=r=>{let e=this.cards[r],n=r<this.cards.length-1,p=r>0;this.stageContainer.innerHTML=`
          <div class="mode-flashcard-deck">
            <div class="flashcard-stage">
              <div class="card-3d-wrap" id="active-flashcard" style="min-height: ${this.cardHeight}px">
                <div class="card-flipper" style="min-height: ${this.cardHeight}px">
                  <!-- Front -->
                  <div class="card-face card-front">
                    ${e.frontImage?`
                      <div class="card-media">
                        <img src="${e.frontImage}" alt="${e.frontText||""}" />
                      </div>
                    `:""}
                    <div class="card-content">
                      <div>
                        <span class="card-badge badge-front">${this.t("frontend.card")} ${r+1} ${this.t("frontend.of")} ${this.cards.length}</span>
                        <h3 class="card-text-title">${e.frontText||""}</h3>
                      </div>
                      <div class="card-footer-meta">
                        ${e.tip?`
                          <div class="card-tip-box" id="flashcard-tip">
                            \u{1F4A1} <strong>${this.t("settings.tip")}:</strong> ${e.tip}
                          </div>
                        `:""}
                        <div class="card-action-bar">
                          ${e.tip?`
                            <button type="button" class="btn-card-action" id="btn-toggle-tip">
                              \u{1F4A1} <span>${this.t("frontend.showTip")}</span>
                            </button>
                          `:""}
                          ${e.audioUrl?`
                            <button type="button" class="btn-card-action" id="btn-play-audio" data-url="${e.audioUrl}">
                              \u{1F50A} <span>${this.t("frontend.listen")}</span>
                            </button>
                          `:""}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Back -->
                  <div class="card-face card-back">
                    <div class="card-content">
                      <div>
                        <span class="card-badge badge-back">${this.t("frontend.answerIs")}</span>
                        <h3 class="card-text-title">${e.backText||""}</h3>
                      </div>
                      ${e.audioUrl?`
                        <div class="card-action-bar">
                          <button type="button" class="btn-card-action" id="btn-play-audio-back" data-url="${e.audioUrl}">
                            \u{1F50A} <span>${this.t("frontend.listen")}</span>
                          </button>
                        </div>
                      `:""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input verification box -->
            <div class="flashcard-input-box">
              <form id="flashcard-form">
                <div class="input-group">
                  <input type="text" id="flashcard-input" placeholder="${this.t("frontend.typeAnswer")}" autocomplete="off" />
                  <button type="submit">
                    <span>${this.t("frontend.check")}</span>
                  </button>
                </div>
                <div id="flashcard-feedback" class="flashcard-feedback"></div>
              </form>
            </div>

            <!-- Deck Navigation -->
            <div class="deck-navigation">
              <button type="button" class="btn-nav" id="btn-prev" ${p?"":"disabled"}>
                \u2190 ${this.t("frontend.previous")}
              </button>
              <span class="deck-counter">${r+1} / ${this.cards.length}</span>
              <button type="button" class="btn-nav" id="btn-next" ${n?"":"disabled"}>
                ${this.t("frontend.next")} \u2192
              </button>
            </div>
          </div>
        `;let h=this.stageContainer.querySelector("#active-flashcard"),a=this.stageContainer.querySelector("#flashcard-form"),s=this.stageContainer.querySelector("#flashcard-input"),l=this.stageContainer.querySelector("#flashcard-feedback"),d=this.stageContainer.querySelector("#btn-toggle-tip"),v=this.stageContainer.querySelector("#flashcard-tip"),g=this.stageContainer.querySelector("#btn-play-audio"),u=this.stageContainer.querySelector("#btn-play-audio-back"),b=this.stageContainer.querySelector("#btn-prev"),T=this.stageContainer.querySelector("#btn-next");d&&v&&d.addEventListener("click",()=>{v.classList.toggle("show"),d.classList.toggle("active")}),g&&g.addEventListener("click",()=>m(g.getAttribute("data-url"),g)),u&&u.addEventListener("click",()=>m(u.getAttribute("data-url"),u)),a.addEventListener("submit",C=>{C.preventDefault(),this.startTimer(),this.incrementMoves();let x=(s.value||"").trim().toLowerCase(),A=(e.backText||"").trim().toLowerCase();x&&(x===A||A.includes(x)||x.includes(A))?(c.playMatch(),h.classList.add("is-flipped"),l.className="flashcard-feedback success",l.innerHTML=`\u2713 ${this.t("frontend.correct")}`):(c.playError(),h.classList.add("shake-anim"),setTimeout(()=>h.classList.remove("shake-anim"),600),l.className="flashcard-feedback error",l.innerHTML=`\u2717 ${this.t("frontend.incorrect")}`)}),h.addEventListener("click",C=>{C.target.closest("button")||C.target.closest("input")||(c.playFlip(),h.classList.toggle("is-flipped"))}),b&&b.addEventListener("click",()=>{t>0&&(t--,i(t))}),T&&T.addEventListener("click",()=>{t<this.cards.length-1&&(t++,i(t))})};i(t)}initDialogCardMode(){if(!this.cards||this.cards.length===0)return;let t=0,i=r=>{let e=this.cards[r],n=r<this.cards.length-1,p=r>0;this.stageContainer.innerHTML=`
          <div class="mode-dialog-deck">
            <div class="dialog-stage">
              <div class="card-3d-wrap" id="active-dialog-card" style="min-height: ${this.cardHeight}px">
                <div class="card-flipper" style="min-height: ${this.cardHeight}px">
                  <!-- Front -->
                  <div class="card-face card-front">
                    ${e.frontImage?`
                      <div class="card-media">
                        <img src="${e.frontImage}" alt="${e.frontText||""}" />
                      </div>
                    `:""}
                    <div class="card-content">
                      <div>
                        <span class="card-badge badge-front">${this.t("frontend.card")} ${r+1} ${this.t("frontend.of")} ${this.cards.length}</span>
                        <h3 class="card-text-title">${e.frontText||""}</h3>
                      </div>
                      <div class="card-footer-meta">
                        ${e.tip?`
                          <div class="card-tip-box" id="dialog-tip">
                            \u{1F4A1} <strong>${this.t("settings.tip")}:</strong> ${e.tip}
                          </div>
                        `:""}
                        <div class="card-action-bar">
                          ${e.tip?`
                            <button type="button" class="btn-card-action" id="btn-dialog-tip">
                              \u{1F4A1} <span>${this.t("frontend.showTip")}</span>
                            </button>
                          `:""}
                          ${e.audioUrl?`
                            <button type="button" class="btn-card-action" id="btn-dialog-audio" data-url="${e.audioUrl}">
                              \u{1F50A} <span>${this.t("frontend.listen")}</span>
                            </button>
                          `:""}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Back -->
                  <div class="card-face card-back">
                    <div class="card-content">
                      <div>
                        <span class="card-badge badge-back">${this.t("frontend.card")} ${r+1} (${this.t("frontend.turnOver")})</span>
                        <h3 class="card-text-title">${e.backText||""}</h3>
                      </div>
                      ${e.audioUrl?`
                        <div class="card-action-bar">
                          <button type="button" class="btn-card-action" id="btn-dialog-audio-back" data-url="${e.audioUrl}">
                            \u{1F50A} <span>${this.t("frontend.listen")}</span>
                          </button>
                        </div>
                      `:""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Controls -->
            <div class="dialog-controls">
              <button type="button" class="btn-nav" id="btn-dialog-prev" ${p?"":"disabled"}>
                \u2190 ${this.t("frontend.previous")}
              </button>
              <button type="button" class="btn-dialog-flip" id="btn-flip-now">
                \u{1F504} <span>${this.t("frontend.turnOver")}</span>
              </button>
              <button type="button" class="btn-nav" id="btn-dialog-next" ${n?"":"disabled"}>
                ${this.t("frontend.next")} \u2192
              </button>
            </div>
          </div>
        `;let h=this.stageContainer.querySelector("#active-dialog-card"),a=this.stageContainer.querySelector("#btn-flip-now"),s=this.stageContainer.querySelector("#btn-dialog-tip"),l=this.stageContainer.querySelector("#dialog-tip"),d=this.stageContainer.querySelector("#btn-dialog-audio"),v=this.stageContainer.querySelector("#btn-dialog-audio-back"),g=this.stageContainer.querySelector("#btn-dialog-prev"),u=this.stageContainer.querySelector("#btn-dialog-next"),b=()=>{this.startTimer(),this.incrementMoves(),c.playFlip(),h.classList.toggle("is-flipped")};h.addEventListener("click",T=>{T.target.closest("button")||b()}),a&&a.addEventListener("click",b),s&&l&&s.addEventListener("click",()=>{l.classList.toggle("show"),s.classList.toggle("active")}),d&&d.addEventListener("click",()=>m(d.getAttribute("data-url"),d)),v&&v.addEventListener("click",()=>m(v.getAttribute("data-url"),v)),g&&g.addEventListener("click",()=>{t>0&&(t--,i(t))}),u&&u.addEventListener("click",()=>{t<this.cards.length-1&&(t++,i(t))})};i(t)}initMemoryGridMode(){if(!this.cards||this.cards.length===0)return;let t=[];this.cards.forEach((a,s)=>{t.push({tileId:`tile-${s}-a`,pairId:`pair-${s}`,text:a.frontText,image:a.frontImage,audio:a.audioUrl,type:"front"}),t.push({tileId:`tile-${s}-b`,pairId:`pair-${s}`,text:a.backText,image:a.frontImage,audio:a.audioUrl,type:"back"})});for(let a=t.length-1;a>0;a--){let s=Math.floor(Math.random()*(a+1));[t[a],t[s]]=[t[s],t[a]]}let i=this.cards.length,r=0,e=[],n=!1;this.pairsEl&&(this.pairsEl.textContent=`0 / ${i}`);let p=`row row-cols-1 row-cols-sm-2 row-cols-md-${Math.min(this.columns,3)} row-cols-lg-${this.columns} g-3`;this.stageContainer.innerHTML=`
        <div class="${p}">
          ${t.map(a=>`
            <div class="col card-col-wrap">
              <div
                class="card-3d-wrap memory-tile"
                data-tile-id="${a.tileId}"
                data-pair-id="${a.pairId}"
                data-audio="${a.audio||""}"
                style="min-height: ${this.cardHeight}px"
              >
                <div class="card-flipper" style="min-height: ${this.cardHeight}px">
                  <!-- Front: Face Down Cover -->
                  <div class="card-face card-front memory-cover">
                    <div class="cover-pattern"></div>
                    <div class="cover-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <h5 class="cover-label">Card</h5>
                  </div>

                  <!-- Back: Revealed Tile Face -->
                  <div class="card-face card-back">
                    ${a.image?`
                      <div class="card-media">
                        <img src="${a.image}" alt="${a.text||""}" />
                      </div>
                    `:""}
                    <div class="card-content">
                      <div>
                        <span class="card-badge ${a.type==="front"?"badge-front":"badge-back"}">
                          ${a.type==="front"?"Item A":"Item B"}
                        </span>
                        <h4 class="card-text-title">${a.text||""}</h4>
                      </div>
                    </div>
                    <div class="match-checkmark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      `,this.stageContainer.querySelectorAll(".memory-tile").forEach(a=>{a.addEventListener("click",()=>{if(n||a.classList.contains("is-flipped")||a.classList.contains("is-matched"))return;this.startTimer(),c.playFlip();let s=a.getAttribute("data-audio");if(s&&m(s),a.classList.add("is-flipped"),e.push(a),e.length===2){this.incrementMoves(),n=!0;let[l,d]=e,v=l.getAttribute("data-pair-id"),g=d.getAttribute("data-pair-id");v===g?setTimeout(()=>{if(c.playMatch(),l.classList.add("is-matched","bounce-anim"),d.classList.add("is-matched","bounce-anim"),r++,this.pairsEl&&(this.pairsEl.textContent=`${r} / ${i}`),e=[],n=!1,r===i&&(this.stopTimer(),c.playVictory(),this.victoryOverlay)){let u=this.victoryOverlay.querySelector(".victory-msg");u&&(u.textContent=this.t("frontend.victoryMessage",{moves:this.movesCount,time:this.formatTime(this.secondsElapsed)})),this.victoryOverlay.classList.add("show")}},400):setTimeout(()=>{c.playError(),l.classList.add("shake-anim"),d.classList.add("shake-anim"),setTimeout(()=>{l.classList.remove("is-flipped","shake-anim"),d.classList.remove("is-flipped","shake-anim"),e=[],n=!1},700)},600)}})})}}function y(){document.querySelectorAll(".wp-block-periodic-card-trainer").forEach(t=>{t.__periodicCardTrainerInstance||(t.__periodicCardTrainerInstance=new k(t))})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",y):y(),window.initPeriodicCardTrainer=y})();})();
//# sourceMappingURL=view.js.map
