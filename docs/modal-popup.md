<!--
  Módulo: periodic-modal-popup
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Modal Popup

> Módulo consolidado e padronizado sob o namespace `.periodic-modal-popup`.

---

# Periodic Modal Popup

[![WordPress](https://img.shields.io/badge/WordPress-6.1%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-black.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952b3.svg)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-blueviolet.svg)](https://fontawesome.com)
[![License](https://img.shields.io/badge/License-GPL%202.0%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**Periodic Modal Popup** é um plugin de bloco Gutenberg completo e moderno para WordPress, projetado para fornecer controle absoluto sobre a criação de botões de gatilho e janelas modais com o padrão oficial do **Bootstrap 5**, suporte a ícones **Font Awesome 6**, edição direta **WYSIWYG** e painel lateral (`InspectorControls`) organizado em abas intuitivas.

---

## 📑 Sumário
- [Visão Geral](#-visão-geral)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Atributos do Bloco](#-atributos-do-bloco)
- [Abas do Painel Lateral (InspectorControls)](#-abas-do-painel-lateral-inspectorcontrols)
  - [1. Aba Gatilho / Botão](#1-aba-gatilho--botão)
  - [2. Aba Conteúdo do Modal](#2-aba-conteúdo-do-modal)
  - [3. Aba Comportamento](#3-aba-comportamento)
- [Pré-visualização Interativa no Editor](#-pré-visualização-interativa-no-editor)
- [Screenshots e Capturas de Tela](#-screenshots-e-capturas-de-tela)
- [Instruções para Gerar Novos Screenshots](#-instruções-para-gerar-novos-screenshots)
- [Internacionalização (i18n)](#-internacionalização-i18n)
- [Requisitos Técnicos](#-requisitos-técnicos)
- [Instalação e Uso](#-instalação-e-uso)
- [Compilação e Desenvolvimento](#-compilação-e-desenvolvimento)
- [Metadados de Autoria](#-metadados-de-autoria)
- [Licença](#-licença)

---

## 🚀 Visão Geral

O bloco **Periodic Modal Popup** (`periodic/modal-popup`) foi arquitetado seguindo os mais altos padrões de engenharia do WordPress:
- **Block API v3**: compatibilidade nativa com o Gutenberg moderno através de `block.json` versão 3.
- **Marcação Bootstrap 5 Nativa**: produz código semântico (`modal`, `modal-dialog`, `modal-content`, `modal-header`, `modal-body`, `modal-footer`) com suporte total a `data-bs-*`.
- **Tipografia e Ícones Font Awesome 6**: suporte integrado a qualquer classe de ícone da biblioteca Font Awesome Free.
- **Edição Direta WYSIWYG**: alterne facilmente o modo de visualização dentro do editor para formatar o título e corpo da janela modal em tempo real sem precisar abrir novas abas.
- **Script Frontend Otimizado (`view.js`)**: manipulador leve de eventos que garante abertura e fechamento acessíveis (via tecla Escape, clique no backdrop e botões de dismiss) com ou sem o bundle global do Bootstrap carregado pelo tema.

---

## ✨ Principais Funcionalidades

1. **Gatilho Totalmente Estilizável**:
   - Definição livre do texto do botão.
   - Variantes de cor oficiais do Bootstrap 5 (`btn-primary`, `btn-secondary`, `btn-success`, `btn-danger`, `btn-warning`, `btn-info`, `btn-light`, `btn-dark`, e versões com contorno `btn-outline-*`).
   - Tamanhos de botão ajustáveis (`btn-sm`, padrão, `btn-lg`).
   - Ícone personalizado com espaçamento otimizado.

2. **Janela Modal Flexível e Responsiva**:
   - Múltiplos tamanhos: Pequeno (`modal-sm`), Padrão (500px), Grande (`modal-lg`), Extra Grande (`modal-xl`) e Tela Cheia (`modal-fullscreen`).
   - Opção de **Backdrop Estático** (`data-bs-backdrop="static"`), prevenindo fechamentos acidentais ao clicar fora da modal.
   - Opção de **Centralização Vertical** (`modal-dialog-centered`).
   - Opção de **Rolagem Interna** (`modal-dialog-scrollable`) para conteúdos extensos.

3. **Experiência Visual WYSIWYG no Editor**:
   - Botão **"Alternar Pré-visualização do Modal"** na barra de ferramentas e no próprio bloco.
   - Canvas com overlay escurecido idêntico ao frontend para edição com `RichText`.

---

## 📁 Estrutura de Arquivos

```
periodic-modal-popup/
├── .gitignore                      # Regras de exclusão do Git
├── package.json                    # Dependências e scripts npm (@wordpress/scripts)
├── block.json                      # Metadados do bloco (Schema v3)
├── periodic-modal-popup.php        # Arquivo principal do plugin WordPress
├── src/
│   ├── index.js                    # Registro do bloco com edit e save
│   ├── edit.js                     # Componente de edição WYSIWYG e abas do InspectorControls
│   ├── save.js                     # Renderização semântica HTML/Bootstrap 5
│   ├── view.js                     # Script frontend modular e resiliente
│   ├── editor.scss                 # Estilos específicos do editor Gutenberg
│   └── style.scss                  # Estilos compartilhados frontend/backend
├── build/                          # Arquivos compilados para produção
│   ├── index.js
│   ├── index.asset.php
│   ├── index.css
│   ├── style-index.css
│   ├── view.js
│   └── view.asset.php
├── languages/                      # Arquivos de internacionalização
│   ├── pt-br.json                  # Português do Brasil
│   ├── en-us.json                  # Inglês
│   ├── it.json                     # Italiano
│   └── es.json                     # Espanhol
├── assets/
│   └── screenshots/                # Capturas de tela demonstrativas
│       ├── 01-tab-trigger-button.png
│       ├── 02-tab-modal-content.png
│       ├── 03-tab-modal-behavior.png
│       ├── 04-modal-preview-editor.png
│       └── 05-modal-frontend-open.png
└── readme.md                       # Documentação técnica completa
```

---

## ⚙️ Atributos do Bloco

| Atributo | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `modalId` | `string` | `""` | Identificador HTML único do modal (ex: `periodic-modal-xxxxxx`). |
| `buttonText` | `string` | `"Abrir Modal"` | Texto exibido no botão de gatilho. |
| `buttonIcon` | `string` | `"fa-solid fa-circle-info"` | Classe de ícone Font Awesome 6. |
| `buttonVariant`| `string` | `"btn-primary"` | Classe de variante visual do Bootstrap 5. |
| `buttonSize` | `string` | `""` | Modificador de dimensão do botão (`btn-sm`, `btn-lg`). |
| `modalTitle` | `string` | `"Título da Janela Modal"` | Título exibido no cabeçalho superior do modal. |
| `modalSize` | `string` | `""` | Classe de largura do modal Bootstrap 5. |
| `modalContent` | `string` | `"<p>...</p>"` | Conteúdo HTML com formatação rica do corpo do modal. |
| `closeButtonText`| `string` | `"Fechar"` | Rótulo do botão de encerramento no rodapé. |
| `staticBackdrop`| `boolean` | `false` | Impede o fechamento ao clicar fora da modal. |
| `centeredModal`| `boolean` | `false` | Centraliza verticalmente a janela na tela. |
| `scrollableModal`| `boolean`| `false` | Adiciona barra de rolagem ao corpo do modal. |

---

## 🛠️ Abas do Painel Lateral (InspectorControls)

O painel de configurações do bloco utiliza o componente `TabPanel` para separar e organizar as configurações em três abas especializadas:

### 1. Aba Gatilho / Botão
Esta aba concentra todas as definições visuais e textuais do botão que o visitante clica para disparar a janela modal.
- **Texto do Botão (`TextControl`)**: define o rótulo textual legível do botão de gatilho.
- **Ícone do Botão (`TextControl`)**: aceita qualquer classe de ícone Font Awesome 6 (ex.: `fa-solid fa-circle-info`, `fa-solid fa-bell`, `fa-solid fa-envelope`).
- **Variante de Cor (`SelectControl`)**: seleção instantânea entre as cores semânticas do Bootstrap 5 (`btn-primary`, `btn-secondary`, `btn-success`, `btn-danger`, `btn-warning`, `btn-info`, `btn-light`, `btn-dark` ou versões `btn-outline-*`).
- **Tamanho do Botão (`SelectControl`)**: alternância entre o tamanho padrão, pequeno (`btn-sm`) e grande (`btn-lg`).

### 2. Aba Conteúdo do Modal
Esta aba permite ajustar os textos fundamentais da janela modal.
- **Título da Modal (`TextControl`)**: define o texto do cabeçalho (`modal-title`).
- **Texto do Botão de Fechar (`TextControl`)**: customiza o rótulo do botão secundário no rodapé (`modal-footer`).
- **Atalho WYSIWYG**: exibe uma dica explicativa com botão de ação direta para abrir o modo de pré-visualização no canvas do editor e realizar edições de texto rico (negrito, itálico, listas e parágrafos) em tempo real.

### 3. Aba Comportamento
Esta aba controla a física, a dimensão e as propriedades funcionais da caixa modal.
- **Tamanho da Janela (`SelectControl`)**:
  - *Padrão*: 500px de largura máxima.
  - *Pequeno (`modal-sm`)*: 300px, ideal para confirmações e avisos breves.
  - *Grande (`modal-lg`)*: 800px, recomendado para termos e artigos.
  - *Extra Grande (`modal-xl`)*: 1140px, ideal para tabelas, mídias e painéis.
  - *Tela Cheia (`modal-fullscreen`)*: expande a janela por toda a viewport.
- **Backdrop Estático (`ToggleControl`)**: quando ativado, adiciona `data-bs-backdrop="static"` e `data-bs-keyboard="false"`, impedindo o fechamento ao clicar fora ou via tecla Escape.
- **Centralizar Verticalmente (`ToggleControl`)**: adiciona a classe `modal-dialog-centered` do Bootstrap 5 para alinhar o diálogo no meio exato da tela.
- **Rolagem Interna (`ToggleControl`)**: adiciona a classe `modal-dialog-scrollable`, criando uma barra de rolagem no corpo (`modal-body`) e mantendo o cabeçalho e rodapé sempre visíveis.
- **ID HTML Único (`TextControl`)**: identificador exclusivo gerado automaticamente que liga o botão de gatilho (`data-bs-target`) ao elemento da janela modal correspondente.

---

## 👁️ Pré-visualização Interativa no Editor

O bloco conta com a funcionalidade **"Alternar Pré-visualização do Modal"**, disponível tanto na barra de ferramentas flutuante do Gutenberg quanto no próprio corpo do bloco no editor.

Ao clicar no botão de pré-visualização:
1. O canvas exibe um backdrop escuro idêntico ao comportamento real do Bootstrap 5.
2. A janela modal é renderizada em primeiro plano com as dimensões selecionadas.
3. Você pode clicar e digitar diretamente no **Título** e no **Corpo** da modal usando o componente `RichText` nativo do WordPress.
4. As alterações são gravadas instantaneamente nos atributos do bloco.
5. Um clique no botão "Fechar" ou fora da caixa encerra a pré-visualização e retorna à exibição compacta do botão.

---

## 📸 Screenshots e Capturas de Tela

Todas as capturas de tela do bloco estão salvas na pasta `assets/screenshots/`:

| Arquivo | Descrição da Situação |
| :--- | :--- |
| `01-tab-trigger-button.png` | Painel lateral exibindo a aba **"Gatilho / Botão"** com configurações de texto, ícone Font Awesome e cores do Bootstrap. |
| `02-tab-modal-content.png` | Painel lateral exibindo a aba **"Conteúdo do Modal"** com título da janela, rótulo de fechar e atalho WYSIWYG. |
| `03-tab-modal-behavior.png` | Painel lateral exibindo a aba **"Comportamento"** com tamanho da janela, backdrop estático e centralização. |
| `04-modal-preview-editor.png` | Tela do editor Gutenberg com a janela modal aberta em modo de edição WYSIWYG interativa no canvas. |
| `05-modal-frontend-open.png` | Visualização no frontend de um site WordPress com a modal ativa e formatada em Bootstrap 5. |

### Visualização dos Painéis:

#### 1. Aba Gatilho / Botão:
![Aba Gatilho / Botão](assets/screenshots/01-tab-trigger-button.png)

#### 2. Aba Conteúdo do Modal:
![Aba Conteúdo do Modal](assets/screenshots/02-tab-modal-content.png)

#### 3. Aba Comportamento e Dimensões:
![Aba Comportamento](assets/screenshots/03-tab-modal-behavior.png)

#### 4. Pré-visualização Interativa no Editor (WYSIWYG):
![Pré-visualização no Editor](assets/screenshots/04-modal-preview-editor.png)

#### 5. Exibição da Janela Modal no Frontend:
![Exibição no Frontend](assets/screenshots/05-modal-frontend-open.png)

---

## 📷 Instruções para Gerar Novos Screenshots

Caso deseje atualizar ou capturar novos screenshots do bloco:
1. Abra o painel do WordPress em um ambiente de desenvolvimento local (como LocalWP, XAMPP, Laragon ou Docker).
2. Instale e ative o plugin `periodic-modal-popup`.
3. Crie ou edite uma página e adicione o bloco **Periodic Modal Popup**.
4. Ajuste a resolução do navegador para 1280x800 ou 1920x1080 com zoom em 100%.
5. **Para capturar as abas**:
   - Clique no bloco para abrir o painel lateral `InspectorControls`.
   - Selecione alternadamente as abas "Gatilho / Botão", "Conteúdo do Modal" e "Comportamento".
   - Capture a área lateral e salve como `01-tab-trigger-button.png`, `02-tab-modal-content.png` e `03-tab-modal-behavior.png`.
6. **Para capturar o editor com modal aberto**:
   - Clique no botão "Alternar Pré-visualização do Modal".
   - Capture a janela aberta no canvas e salve como `04-modal-preview-editor.png`.
7. **Para capturar o frontend**:
   - Publique a página e visualize-a no navegador.
   - Clique no botão de gatilho para acionar o modal Bootstrap 5.
   - Capture a tela com o modal aberto e salve como `05-modal-frontend-open.png`.
8. Salve todas as imagens no formato PNG dentro da pasta `assets/screenshots/`.

---

## 🌐 Internacionalização (i18n)

O plugin implementa suporte completo à internacionalização através das funções nativas do WordPress (`__()`, `load_plugin_textdomain()` e `wp_set_script_translations()`).

Os arquivos de tradução estão disponíveis na pasta `languages/`:
- **Português do Brasil (`pt-br.json`)**: tradução integral de todas as strings do editor e frontend.
- **Inglês (`en-us.json`)**: tradução padrão para o ecossistema internacional.
- **Italiano (`it.json`)**: tradução completa para o idioma italiano.
- **Espanhol (`es.json`)**: tradução completa para o idioma espanhol.

---

## 💻 Requisitos Técnicos

- **WordPress**: 6.1 ou superior
- **PHP**: 7.4 ou superior (totalmente compatível com PHP 8.0, 8.1, 8.2 e 8.3)
- **Framework CSS**: Bootstrap 5.3+ (enfileirado automaticamente de forma segura via CDN)
- **Biblioteca de Ícones**: Font Awesome 6.5+ (enfileirado automaticamente via CDN)
- **Navegadores Homologados**: Chrome, Firefox, Safari, Edge modernos

---

## 📦 Instalação e Uso

1. Baixe ou clone este repositório na pasta de plugins do seu WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-modal-popup.git
   ```
2. Acesse o painel administrativo do WordPress e navegue até **Plugins > Plugins Instalados**.
3. Localize **Periodic Modal Popup** e clique em **Ativar**.
4. No editor de blocos (Gutenberg), clique no botão `+` para adicionar um novo bloco e pesquise por `Modal Popup` ou `Periodic`.
5. Personalize o gatilho, os textos e o comportamento nas abas do painel lateral.

---

## 🔨 Compilação e Desenvolvimento

Para estender ou compilar os arquivos-fonte do plugin:

```bash
# 1. Instalar dependências do projeto
npm install

# 2. Iniciar o modo de desenvolvimento com hot-reload / watch
npm run start

# 3. Gerar a build de produção otimizada
npm run build

# 4. Formatar os arquivos de código
npm run format
```

---

## 👤 Metadados de Autoria

- **Autor**: Luiz Fernando Brogliatto Ferreira
- **Perfil WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Este plugin é um software de código aberto licenciado sob a [GPL v2 ou posterior](https://www.gnu.org/licenses/gpl-2.0.html).
