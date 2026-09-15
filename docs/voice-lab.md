<!--
  Módulo: periodic-voice-lab
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Voice Lab

> Módulo consolidado e padronizado sob o namespace `.periodic-voice-lab`.

---

# Periodic Voice Lab

> **WordPress Gutenberg Block Plugin** desenvolvido com foco em APIs nativas do navegador: **Web Audio API** (.wav recorder) e **Web Speech API** (reconhecimento de voz e validação de pronúncia com cálculo de similaridade Levenshtein).

![Periodic Voice Lab Showcase](screenshot.png)

---

## 🚀 Características Principais

O plugin disponibiliza o bloco Gutenberg `periodic/voice-lab`, projetado para ambientes educacionais, cursos de idiomas e laboratórios de áudio interativos, operando em dois modos configuráveis:

### 🎙️ Modo (A): Gravador de Voz do Aluno
- **Captura Nativa com MediaRecorder**: Acesso ao microfone sem necessidade de plugins ou serviços externos de terceiros.
- **Osciloscópio / Visualizador de Ondas em Tempo Real**: Renderizado via `Canvas 2D` com gradiente neon utilizando `AudioContext` e `AnalyserNode` da **Web Audio API**.
- **Player Integrado**: Reprodução imediata do áudio gravado com controle de play/pause dinâmico.
- **Exportação Canônica em `.wav`**: Converte os buffers de áudio gravados em um arquivo **WAV 16-bit PCM** legítimo com cabeçalho RIFF padrão, pronto para download e compatível com qualquer reprodutor ou editor de áudio.
- **Controle de Tempo Máximo**: Barra de progresso e encerramento automático da gravação ao atingir o limite estipulado.

### 🎯 Modo (B): Validador de Pronúncia (Levenshtein)
- **Reconhecimento de Fala Nativo**: Utiliza `SpeechRecognition` / `webkitSpeechRecognition` da **Web Speech API** configurado para o idioma de estudo.
- **Síntese de Referência ("Ouvir Exemplo")**: O aluno pode ouvir a pronúncia de referência através de síntese nativa de voz (`speechSynthesis`).
- **Cálculo de Similaridade Levenshtein**: Algoritmo matemático para comparar o texto esperado (`promptPhrase`) contra o que foi capturado pelo microfone:
  $$\text{Similaridade} = \max\left(0, \left(1 - \frac{\text{dist}}{\max(L_1, L_2)}\right) \times 100\right)$$
- **Score e Feedback Visual**:
  - `≥ 85%`: Excelente Pronúncia! 🌟 (Verde)
  - `70% - 84%`: Muito Bom! 👍 (Azul)
  - `50% - 69%`: Bom Esforço! Pratique mais 🔁 (Amarelo)
  - `< 50%`: Tente novamente com clareza 🎙️ (Vermelho)
- **Análise Tokenizada de Palavras**: Badges individuais indicando quais palavras foram pronunciadas corretamente (`✓`) e quais faltaram ou foram alteradas (`✗`).

---

## ⚙️ Atributos do Bloco Gutenberg

| Atributo | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `labMode` | `string` | `'recorder'` | Modo de operação: `'recorder'` ou `'speech-recognition'`. |
| `promptPhrase` | `string` | `"The quick brown fox..."` | Frase esperada para validação de pronúncia no modo reconhecimento. |
| `language` | `string` | `'en-US'` | Código de idioma (`pt-BR`, `en-US`, `it-IT`, `es-ES`, `fr-FR`, `de-DE`). |
| `maxRecordingTime` | `number` | `30` | Limite máximo de gravação em segundos (slider de 5s a 180s). |
| `customTitle` | `string` | `""` | Título personalizado opcional para o bloco. |

---

## 🎨 Interface e Estilos
- **edit.js (Gutenberg InspectorControls & WYSIWYG Preview)**: Painel lateral no editor de blocos para alternar modos, ajustar limites, trocar o idioma e preencher a frase de treino. Preview em tempo real com animação de ondas sonoras e botões Font Awesome.
- **save.js (Bootstrap 5)**: Estrutura semântica limpa utilizando classes nativas do Bootstrap 5:
  - Botão REC: `btn btn-danger rounded-circle`
  - Botão STOP: `btn btn-secondary rounded-circle`
  - Botão PLAY: `btn btn-success rounded-pill`
  - Botão DOWNLOAD: `btn btn-outline-primary rounded-pill`

---

## 🌐 Internacionalização (i18n)

Todas as strings e mensagens do plugin estão organizadas em arquivos JSON dedicados nas pastas `languages/` e `languagens/`:

- `languages/pt-br.json` / `languagens/pt-br.json`: Português do Brasil
- `languages/en-us.json` / `languagens/en-us.json`: Inglês Americano
- `languages/It.json` / `languages/it.json` / `languagens/It.json`: Italiano
- `languages/es.json` / `languagens/es.json`: Espanhol

---

## 📂 Estrutura do Projeto

```text
periodic-voice-lab/
├── block.json                 # Metadados do bloco Gutenberg (schema WP)
├── periodic-voice-lab.php     # Plugin PHP principal com registro de scripts e estilos
├── package.json               # Dependências e scripts do WordPress
├── preview.html               # Showcase interativo ao vivo para testes locais
├── screenshot.png             # Captura da interface do bloco em funcionamento
├── README.md                  # Documentação completa
├── languages/                 # Dicionários de tradução JSON
│   ├── pt-br.json
│   ├── en-us.json
│   ├── It.json / it.json
│   └── es.json
├── languagens/                # Dicionários espelhados
│   ├── pt-br.json
│   ├── en-us.json
│   ├── It.json
│   └── es.json
├── src/                       # Código-fonte Gutenberg
│   ├── index.js               # Registro do bloco
│   ├── edit.js                # InspectorControls & WYSIWYG
│   ├── save.js                # Renderização HTML com Bootstrap 5
│   ├── view.js                # Engine nativa (Web Audio + Web Speech + Levenshtein)
│   ├── style.scss             # Estilos do bloco (frontend e editor)
│   └── editor.scss            # Estilos adicionais para o editor
└── build/                     # Arquivos compilados prontos para produção
    ├── index.js
    ├── index.asset.php
    ├── view.js
    ├── view.asset.php
    ├── index.css
    └── style-index.css
```

---

## 💻 Como Utilizar no WordPress

1. Copie a pasta `periodic-voice-lab` para o diretório `wp-content/plugins/` da sua instalação WordPress.
2. Acesse o painel **Plugins** no WordPress e clique em **Ativar**.
3. Em qualquer post ou página, abra o editor Gutenberg e adicione o bloco **Voice Lab (Web Audio & Speech)**.
4. No painel lateral, configure o modo desejado:
   - **Gravador**: Alunos podem gravar áudio e fazer o download do `.wav`.
   - **Validador de Pronúncia**: Insira a frase de treino e selecione o idioma de validação.
5. Salve ou publique o conteúdo!

---

## 🧪 Testando Localmente (Sem WordPress)

Para testar o funcionamento das APIs de gravação, áudio, visualizador de ondas e reconhecimento de fala imediatamente:

Abra o arquivo `preview.html` diretamente no seu navegador (Google Chrome ou Microsoft Edge recomendados para suporte total à Web Speech API).

---

## 📜 Licença
Distribuído sob a licença **GPL-2.0-or-later**.
Desenvolvido por **Periodic**.
