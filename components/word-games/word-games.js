/**
 * @fileoverview Periodic Word Games (Caça-palavras & Hangman)
 * @module Periodic.WordGames
 * Interactive educational word puzzles with multilingual support.
 */

class PeriodicWordGames {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) return;
        this.options = Object.assign({
            word: 'PERIODIC',
            hint: 'A consolidated frontend component suite'
        }, options);
        this.guesses = new Set();
        this.maxMistakes = 6;
        this.init();
    }

    init() {
        this.container.classList.add('periodic-word-game');
        this.render();
    }

    get maskedWord() {
        return this.options.word.toUpperCase().split('').map(letter => {
            return this.guesses.has(letter) ? letter : '_';
        }).join(' ');
    }

    get mistakes() {
        let count = 0;
        this.guesses.forEach(letter => {
            if (!this.options.word.toUpperCase().includes(letter)) count++;
        });
        return count;
    }

    render() {
        const mistakes = this.mistakes;
        const isWon = !this.maskedWord.includes('_');
        const isLost = mistakes >= this.maxMistakes;

        this.container.innerHTML = `
            <div class="periodic-word-game__card">
                <div class="periodic-word-game__hint">${this.options.hint}</div>
                <div class="periodic-word-game__display">${this.maskedWord}</div>
                <div class="periodic-word-game__stats">
                    ${isWon ? '<div class="badge badge-success">🎉 Parabéns! Você acertou!</div>' : 
                      isLost ? '<div class="badge badge-danger">❌ Fim de jogo! Palavra: ' + this.options.word + '</div>' : 
                      'Erros: ' + mistakes + ' / ' + this.maxMistakes}
                </div>
                <div class="periodic-word-game__keyboard">
                    ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => `
                        <button class="periodic-word-game__key" 
                                data-char="${char}" 
                                ${this.guesses.has(char) || isWon || isLost ? 'disabled' : ''}>
                            ${char}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.querySelectorAll('.periodic-word-game__key').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const c = e.currentTarget.getAttribute('data-char');
                this.guesses.add(c);
                this.render();
            });
        });
    }
}

window.PeriodicWordGames = PeriodicWordGames;
