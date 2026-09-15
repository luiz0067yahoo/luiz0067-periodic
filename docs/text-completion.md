<!--
  Módulo: periodic-text-completion
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Text Completion

> Módulo consolidado e padronizado sob o namespace `.periodic-text-completion`.

---

# periodic Text Completion

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-green.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/License-GPL--2.0--or--later-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin nativo do **WordPress Gutenberg** para criação de exercícios interativos de preenchimento de lacunas (*cloze test*) e atividades de **ditado com áudio (MP3)**, construído sobre a arquitetura do ecossistema **periodic** utilizando **Bootstrap 5**, **block.json (API v3)** e **Vanilla JS**.

---

## 📸 Screenshots

### 1. Editor Gutenberg (Live Gap Highlighter, Áudio MP3 e InspectorControls)
![Editor Gutenberg](screenshot-1.png)

### 2. Frontend Interativo (Bootstrap 5, Validação Dinâmica, Áudio Ditado e Tentativas)
![Frontend Interativo](screenshot-2.png)

---

## 🚀 Principais Recursos

- **Sintaxe Intuitiva de Lacunas**:
  - **Lacuna Simples**: `O céu é *azul*.` *(exige "azul")*
  - **Múltiplas Alternativas**: `O céu é *[azul|anil]* e o mar é *[salgado|amargo]*.` ou `*azul|anil*` *(aceita qualquer uma das opções corretas)*.
- **Modo Ditado com Áudio Integrado**:
  - Seletor nativo no Gutenberg via `MediaUpload` para arquivos MP3.
  - Player estilizado com botões de retrocesso rápido (`-5s`) e controle de velocidade (`0.75x`, `1.0x`, `1.25x`, `1.5x`).
- **Validação Dinâmica no Frontend (Vanilla JS)**:
  - Feedback visual imediato com classes Bootstrap 5: `.is-valid` (verde com ícone de verificação) e `.is-invalid` (vermelho com ícone de alerta).
  - Sem dependência de jQuery ou React no frontend.
- **Tolerância a Pequenos Erros de Digitação**:
  - Algoritmo de **Levenshtein Distance** integrado: aceita palavras com até 1 caractere de diferença para termos de 4 ou mais letras.
- **Controle de Tentativas**:
  - Configure o número máximo de tentativas permitidas (ou 0 para ilimitadas).
  - Ao esgotar as tentativas, o gabarito é revelado automaticamente e as lacunas incorretas são corrigidas.
- **Banco de Palavras Opcional**:
  - Exibe todas as opções corretas de forma embaralhada em chips informativos para auxiliar os alunos.
- **Internacionalização Completa**:
  - Suporte nativo a 4 idiomas nas pastas `languages/` e `languagens/`:
    - 🇧🇷 Português (`pt-br.json`)
    - 🇺🇸 Inglês (`en-us.json`)
    - 🇮🇹 Italiano (`it.json`)
    - 🇪🇸 Espanhol (`es.json`)

---

## 📋 Sintaxe das Lacunas

| Sintaxe | Exemplo | Respostas Aceitas |
| :--- | :--- | :--- |
| `*palavra*` | `O céu é *azul*.` | `"azul"` |
| `*[opção1\|opção2]*` | `O céu é *[azul\|anil]*.` | `"azul"` ou `"anil"` |
| `*opção1\|opção2*` | `O mar é *salgado\|amargo*.` | `"salgado"` ou `"amargo"` |

> **Nota:** Pontuações adjacentes como pontos, vírgulas ou exclamações colocados fora dos asteriscos (ex: `*azul*?`) são preservados normalmente fora da lacuna.

---

## ⚙️ Atributos do Bloco (`block.json`)

| Atributo | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Complete as Lacunas"` | Título da atividade |
| `instruction` | `string` | `"Preencha os espaços..."` | Instrução de cabeçalho |
| `rawText` | `string` | `"O céu é *azul*..."` | Texto bruto com as marcações `*...*` |
| `audioUrl` | `string` | `""` | URL da faixa MP3 para o modo ditado |
| `audioId` | `number` | `0` | ID do anexo de mídia no WordPress |
| `caseSensitive` | `boolean` | `false` | Diferenciar maiúsculas de minúsculas |
| `acceptTypos` | `boolean` | `true` | Tolerância a 1 erro de digitação (Levenshtein) |
| `ignoreAccents` | `boolean` | `false` | Ignorar acentos e diacríticos |
| `attempts` | `number` | `3` | Número de tentativas (0 = ilimitado) |
| `themeColor` | `string` | `"primary"` | Cor do tema Bootstrap (`primary`, `success`, etc.) |
| `showWordBank` | `boolean` | `false` | Exibir banco de palavras embaralhado |

---

## 📁 Estrutura de Arquivos

```text
periodic-text-completion/
├── assets/
│   ├── bootstrap/          # Bootstrap 5 local (CSS e JS Bundle)
│   ├── fontawesome/        # Font Awesome 6 local (CSS e Webfonts)
│   ├── screenshot-1.png
│   └── screenshot-2.png
├── build/                  # Arquivos compilados pelo @wordpress/scripts
│   ├── index.js
│   ├── index.css
│   ├── style-index.css
│   └── view.js
├── languages/              # Traduções padrão WordPress
│   ├── pt-br.json
│   ├── en-us.json
│   ├── it.json
│   └── es.json
├── languagens/             # Alias de traduções conforme especificação
│   ├── pt-br.json
│   ├── en-us.json
│   ├── it.json
│   └── es.json
├── src/
│   ├── edit.js             # Editor Gutenberg & Live Gap Highlighter
│   ├── editor.scss         # Estilos exclusivos do editor
│   ├── index.js            # Registro do bloco
│   ├── save.js             # Renderizador HTML Bootstrap 5
│   ├── style.scss          # Estilos frontend compartilhados
│   ├── utils.js            # Parser de lacunas e validação Levenshtein
│   └── view.js             # Script interativo Vanilla JS no frontend
├── block.json              # Metadados do bloco API v3
├── generate_assets.py      # Gerador dos screenshots e banners
├── periodic-text-completion.php # Arquivo mestre do plugin
├── package.json
├── webpack.config.js
├── README.md
├── readme.txt
├── screenshot-1.png
├── screenshot-2.png
└── screenshot.png
```

---

## 🛠️ Instalação e Desenvolvimento

### Instalação no WordPress
1. Clone ou copie esta pasta para `wp-content/plugins/periodic-text-completion`.
2. Acesse o painel do WordPress em **Plugins > Plugins Instalados**.
3. Ative o plugin **periodic Text Completion**.
4. No editor de posts ou páginas, adicione o bloco **periodic Text Completion** (disponível na categoria *Widgets*).

### Compilação dos Scripts
Caso realize modificações no código-fonte (`src/`):

```bash
# Instalação das dependências
npm install

# Compilação de desenvolvimento com live watch
npm run start

# Compilação otimizada para produção
npm run build
```

---

## 👨‍💻 Autor e Licença

- **Autor:** Luiz Fernando Brogliatto Ferreira
- **Repositório:** [periodicyahoo/periodic-text-completion](https://github.com/periodicyahoo/periodic-text-completion)
- **Licença:** [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html)
