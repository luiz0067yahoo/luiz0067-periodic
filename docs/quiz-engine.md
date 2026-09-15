<!--
  Módulo: periodic-quiz-engine
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Quiz Engine

> Módulo consolidado e padronizado sob o namespace `.periodic-quiz-engine`.

---

# periodic Quiz Engine

> Plugin WordPress com bloco nativo Gutenberg para criação de Quizzes, Testes Avaliativos, Pesquisas e Provas interativas com Bootstrap 5 e Font Awesome 6.

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com/)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-orange.svg)](https://fontawesome.com/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

---

## 🚀 Visão Geral

O **periodic Quiz Engine** é um plugin de alto padrão para o editor Gutenberg do WordPress. Desenvolvido com React JSX, Block API v3 e Bootstrap 5, ele oferece uma experiência visual WYSIWYG completa dentro do editor e um motor de execução Vanilla JS de alto desempenho no frontend.

Ideal para portais educacionais, cursos online, LMS, blogs corporativos, gamificação e pesquisas de satisfação.

---

## 📸 Screenshots

| Editor Gutenberg (Edição Visual WYSIWYG) | Frontend Responsivo (Bootstrap 5 & Resultados) |
| :---: | :---: |
| ![Editor Gutenberg](screenshot-1.png) | ![Frontend Resultados](screenshot-2.png) |

---

## ✨ Recursos Principais

- **5 Modos de Avaliação Nativos:**
  1. `single`: Múltipla escolha tradicional com 1 resposta correta.
  2. `multiple`: Múltipla escolha com múltiplas alternativas corretas (checkboxes).
  3. `true-false`: Modo direto de Verdadeiro ou Falso.
  4. `arithmetic`: Modo de cálculos e fórmulas matemáticas.
  5. `survey`: Pesquisa de opinião e satisfação sem penalidade ou resposta incorreta.
- **Renderização WYSIWYG no Editor:** Visualize e edite perguntas, alternativas e feedback pedagógico em tempo real diretamente no painel do Gutenberg.
- **Barra de Progresso Dinâmica:** Indicador visual de avanço com suporte nativo às classes `.progress` e `.progress-bar` do Bootstrap 5.
- **Temporizador Regressivo Inteligente:** Alertas visuais automáticos com micro-animações (amarelo para atenção e vermelho pulsante nos últimos 5 segundos).
- **Feedback Educativo Instantâneo:** Opção para exibir explicações detalhadas imediatamente após cada resposta ou na tela final de resultados.
- **Cálculo de Nota de Corte:** Define percentual mínimo para aprovação (`passingScore`) e exibe cartão de resultados detalhado com revisão de questões.
- **Embaralhamento Aleatório:** Opção de randomizar a ordem das perguntas para cada aluno/usuário.
- **Eventos Customizados no DOM:** Dispara eventos `quiz:started`, `quiz:answered`, `quiz:completed` e `quiz:reset` para integração com Google Analytics, Pixel ou sistemas LMS.
- **Totalmente Responsivo:** Estilização baseada nos cartões, grades e utilitários do Bootstrap 5.

---

## 📦 Estrutura do Plugin

```
periodic-quiz-engine/
├── assets/
│   ├── bootstrap/          # Bootstrap 5.3.8 CSS & JS Bundle
│   └── fontawesome/        # Font Awesome 6.5.2 Icons & Webfonts
├── build/                  # Arquivos compilados para produção
│   ├── index.js            # Bloco Gutenberg compilado
│   ├── index.css           # Estilos do editor
│   ├── style-index.css     # Estilos públicos frontend
│   └── view.js             # Runtime interativo frontend
├── src/
│   ├── index.js            # Ponto de entrada do bloco
│   ├── edit.js             # Componente React do Editor WYSIWYG
│   ├── save.js             # Marcação semântica Bootstrap 5 e data-*
│   ├── view.js             # Mecanismo Vanilla JS interativo
│   ├── editor.scss         # Estilos específicos do editor
│   └── style.scss          # Estilos globais do quiz
├── block.json              # Schema Gutenberg Block API v3
├── periodic-quiz-engine.php # Ponto de entrada do plugin WordPress
└── package.json            # Scripts de automação (@wordpress/scripts)
```

---

## 🛠️ Instalação

1. Clone ou baixe este repositório na pasta `/wp-content/plugins/` do seu WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-quiz-engine.git
   ```
2. No painel administrativo do WordPress, acesse **Plugins** e ative o **periodic Quiz Engine**.
3. Abra qualquer Página ou Post no Gutenberg e insira o bloco **periodic Quiz Engine** (ou busque por "Quiz").

---

## 💻 Desenvolvimento & Compilação

Para compilar os arquivos de desenvolvimento:

```bash
# Instalar dependências
npm install

# Compilar para produção
npm run build

# Modo observador (watch) durante o desenvolvimento
npm run start
```

---

## 🎯 Integração com JavaScript (Eventos Customizados)

Você pode escutar eventos emitidos pelo bloco em qualquer script do seu tema:

```javascript
document.addEventListener('quiz:completed', function(e) {
    console.log('Quiz Finalizado:', e.detail);
    // Exemplo: Enviar pontuação para analytics ou API
    // { quizId, totalScore, maxScore, percentage, passed, totalQuestions, correctCount }
});

document.addEventListener('quiz:answered', function(e) {
    console.log('Pergunta respondida:', e.detail);
});
```

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte `LICENSE` para mais informações.
