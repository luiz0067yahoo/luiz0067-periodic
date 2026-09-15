<!--
  Module: periodic-alert-callout
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Alert Callout

> Consolidated module standardized under namespace `.periodic-alert-callout`.

---

# Periodic Alert Callout - Bloco Gutenberg

[![WordPress](https://img.shields.io/badge/WordPress-6.1%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-black.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-orange.svg)](https://fontawesome.com)
[![License](https://img.shields.io/badge/License-GPL--2.0--or--later-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin WordPress profissional que adiciona ao editor Gutenberg o bloco **Alerta e Callout Contextual** (`periodic/alert-callout`). Desenvolvido com React JSX, Block API v3 (`block.json`), renderização nativa WYSIWYG, compatibilidade integral com o ecossistema **Bootstrap 5** e **Font Awesome 6**, internacionalização em 4 idiomas e painel lateral categorizado em abas dedicadas.

---

## 📋 Sumário
- [Visão Geral e Propósito](#-visão-geral-e-propósito)
- [Recursos Principais](#-recursos-principais)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Guia Detalhado do Painel Lateral (InspectorControls)](#-guia-detalhado-do-painel-lateral-inspectorcontrols)
  - [Aba 1: Tipo e Cor](#aba-1-tipo-e-cor)
  - [Aba 2: Ícone](#aba-2-ícone)
  - [Aba 3: Opções](#aba-3-opções)
- [Renderização WYSIWYG e Frontend](#-renderização-wysiwyg-e-frontend)
- [Galeria de Telas e Screenshots](#-galeria-de-telas-e-screenshots)
- [Instalação e Compilação](#-instalação-e-compilação)
- [Internacionalização (i18n)](#-internacionalização-i18n)
- [Autoria e Créditos](#-autoria-e-créditos)

---

## 🎯 Visão Geral e Propósito

Em portais corporativos, intranets, documentações e websites institucionais, a comunicação clara de avisos, orientações críticas, notas de sucesso ou advertências é indispensável. O bloco **Periodic Alert Callout** preenche essa necessidade fornecendo caixas de alerta padronizadas com a semântica do Bootstrap 5 (`.alert`), ícones representativos vetoriais do Font Awesome 6 e flexibilidade visual por meio de bordas de destaque no estilo "Callout".

---

## ✨ Recursos Principais

- **Block API v3 Nativa**: Desenvolvido sob as diretrizes mais recentes do WordPress Core e Gutenberg (`block.json` versão 3).
- **8 Variantes Semânticas do Bootstrap 5**: Suporte a `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light` e `dark`.
- **Renderização WYSIWYG no Editor**: Edição em tempo real de título (`alert-heading`) e mensagem utilizando componentes `RichText` integrados.
- **Seletor de Ícones Font Awesome 6**: Botões rápidos de ícones institucionais e campo aberto para classes personalizadas (`fas fa-...`).
- **Botão de Fechar / Dispensar**: Suporte opcional à classe nativa `alert-dismissible fade show` com botão `btn-close` e atributo `data-bs-dismiss="alert"`.
- **Destaque Lateral de Callout**: Realce visual com borda espessa na cor temática selecionada (`callout-border-highlight`).
- **Internacionalização Pronta**: Textdomain `periodic-alert-callout` com arquivos JSON para Português (pt-BR), Inglês (en-US), Italiano (it) e Espanhol (es).

---

## 📁 Estrutura de Arquivos

```
periodic-alert-callout/
├── .gitignore                      # Regras de exclusão do Git
├── package.json                    # Dependências e scripts (@wordpress/scripts)
├── block.json                      # Metadados v3, atributos e apontamentos de build
├── periodic-alert-callout.php      # Arquivo mestre PHP do plugin e enfileiramento de assets
├── src/
│   ├── index.js                    # Registro do bloco no cliente Gutenberg
│   ├── edit.js                     # Painel InspectorControls em abas e edição WYSIWYG
│   ├── save.js                     # Renderização HTML5 semântica frontend
│   ├── editor.scss                 # Estilos específicos do editor e abas
│   └── style.scss                  # Estilos globais e classe de destaque de borda lateral
├── build/                          # Pacotes compilados pelo wp-scripts
│   ├── index.js
│   ├── index.css
│   ├── style-index.css
│   └── index.asset.php
├── languages/                      # Arquivos de tradução Jed 1.x
│   ├── pt-br.json
│   ├── en-us.json
│   ├── it.json
│   └── es.json
├── assets/
│   └── screenshots/                # Capturas de tela demonstrativas
│       ├── 01-tab-type-color.png
│       ├── 02-tab-icon.png
│       ├── 03-tab-options.png
│       ├── 04-alert-editor-preview.png
│       └── 05-alert-frontend-preview.png
└── readme.md                       # Documentação técnica completa
```

---

## 🎛 Guia Detalhado do Painel Lateral (InspectorControls)

Ao selecionar o bloco **Alerta e Callout Contextual** no editor Gutenberg, a barra lateral de propriedades (`InspectorControls`) exibe um componente de abas customizado (`TabPanel`) dividido em três áreas de configuração:

### Aba 1: Tipo e Cor
Esta aba define a semântica contextual e a paleta de cores aplicada ao alerta:
- **Variante do Alerta**: Menu suspenso com as 8 variantes oficiais do Bootstrap 5:
  - *Informativo (Info)*: Fundo azul claro e texto escuro, ideal para avisos neutros e notas explicativas.
  - *Sucesso (Success)*: Verde suave, para confirmações de ações, cadastros bem-sucedidos ou status positivos.
  - *Atenção / Alerta (Warning)*: Amarelo suave, indicado para advertências, prazos iminentes e cuidados.
  - *Perigo / Erro (Danger)*: Vermelho claro, para erros de sistema, cancelamentos e alertas críticos.
  - *Primário (Primary)*: Azul corporativo padrão do tema.
  - *Secundário (Secondary)*: Cinza neutro elegante para comunicados auxiliares.
  - *Claro (Light)*: Fundo branco acinzentado sutil.
  - *Escuro (Dark)*: Contraste escuro para notas de alto impacto.
- **Prévia de Estilo**: Caixa interativa que exibe em tempo real o estilo da badge e das cores selecionadas.

### Aba 2: Ícone
Esta aba gerencia o símbolo gráfico contextual posicionado ao lado do título e mensagem:
- **Ícones Recomendados**: Grade com atalhos de um clique para os ícones mais comuns:
  - `fas fa-info-circle` (Informação)
  - `fas fa-check-circle` (Sucesso)
  - `fas fa-exclamation-triangle` (Aviso / Alerta)
  - `fas fa-times-circle` (Perigo / Erro)
  - `fas fa-lightbulb` (Dica / Sugestão)
  - `fas fa-bell` (Notificação)
  - `fas fa-shield-alt` (Segurança e Privacidade)
  - `fas fa-comment-dots` (Comentário / Mensagem)
- **Classe CSS do Ícone**: Campo de entrada livre para utilização de qualquer classe da biblioteca **Font Awesome 6** (ex: `fas fa-star`, `far fa-envelope`, `fas fa-fire`).
- **Remover Ícone**: Botão para desativar a exibição do ícone, transformando a caixa em alerta puramente textual.

### Aba 3: Opções
Controles de comportamento e apresentação estrutural:
- **Botão de Fechar (Dispensável)**: Quando ativo (`isDismissible: true`), inclui as classes `alert-dismissible fade show` e renderiza o botão `btn-close` com atributo `data-bs-dismiss="alert"`. O visitante pode clicar no botão "X" para fechar suavemente o alerta na página.
- **Borda Lateral de Destaque (Callout)**: Quando ativo (`hasBorderLeftHighlight: true`), adiciona uma borda esquerda de 6px na cor de ênfase da variante selecionada, conferindo a clássica aparência de Callout de documentação técnica institucional.

---

## 💻 Renderização WYSIWYG e Frontend

### No Editor Gutenberg (`src/edit.js`)
O bloco simula perfeitamente a renderização final:
- Título com suporte a formatação inline via `RichText` (`tagName="h5"`, classe `alert-heading`).
- Mensagem descritiva editável diretamente no canvas com quebras de linha e formatação (`tagName="div"`, classe `alert-body-content`).
- Ícone dinâmico sincronizado em tempo real.
- Botão "X" de fechar com feedback visual (desativado no editor para evitar fechamento acidental durante a escrita).

### No Frontend (`src/save.js`)
O HTML5 gerado é 100% semântico e limpo:
```html
<div class="alert alert-warning alert-dismissible fade show callout-border-highlight d-flex align-items-start position-relative" role="alert">
  <div class="alert-icon-container me-3 flex-shrink-0 mt-1">
    <i class="fas fa-exclamation-triangle fs-4"></i>
  </div>
  <div class="alert-content-container flex-grow-1 pe-4">
    <h5 class="alert-heading fw-semibold mb-1">Atenção aos Prazos</h5>
    <div class="alert-body-content mb-0">O sistema passará por manutenção programada neste domingo.</div>
  </div>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
</div>
```

---

## 🖼 Galeria de Telas e Screenshots

As imagens demonstrativas encontram-se organizadas no diretório `assets/screenshots/`:

1. **`01-tab-type-color.png`**: Demonstração da Aba "Tipo e Cor" no InspectorControls com as opções de paleta semântica Bootstrap 5.
2. **`02-tab-icon.png`**: Visualização da Aba "Ícone" exibindo a grade de ícones rápidos Font Awesome 6 e campo de classe CSS personalizada.
3. **`03-tab-options.png`**: Apresentação da Aba "Opções" exibindo os botões alternadores (Toggles) de alerta dispensável e borda Callout.
4. **`04-alert-editor-preview.png`**: Captura da tela de edição WYSIWYG nativa dentro do Gutenberg.
5. **`05-alert-frontend-preview.png`**: Visualização dos alertas renderizados no frontend do site com Bootstrap 5 ativo.

---

## 🚀 Instalação e Compilação

### Requisitos
- WordPress 6.1 ou superior.
- PHP 7.4 ou superior.
- Node.js 18+ e npm.

### Passos de Instalação para Desenvolvimento
1. Clone ou extraia o repositório na pasta de plugins do WordPress (`wp-content/plugins/periodic-alert-callout`).
2. Acesse a pasta do plugin via terminal:
   ```bash
   cd periodic-alert-callout
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Compile os arquivos para produção:
   ```bash
   npm run build
   ```
5. Para desenvolvimento contínuo com compilação automática:
   ```bash
   npm run start
   ```
6. Ative o plugin no painel administrativo do WordPress (`Plugins > Plugins Instalados`).

---

## 🌐 Internacionalização (i18n)

O bloco suporta internacionalização completa por meio de `wp_set_script_translations` e arquivos Jed JSON:
- `languages/pt-br.json` - Português do Brasil (Padrão)
- `languages/en-us.json` - Inglês
- `languages/it.json` - Italiano
- `languages/es.json` - Espanhol

Todas as mensagens do editor e do painel lateral utilizam a função `__()` vinculada ao textdomain `'periodic-alert-callout'`.

---

## 👨‍💻 Autoria e Créditos

Desenvolvido com excelência por **Luiz Fernando Brogliatto Ferreira**.

- **Perfil no WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---
*Distribuído sob licença GPLv2 ou posterior. Sinta-se livre para usar, estudar e aprimorar.*
