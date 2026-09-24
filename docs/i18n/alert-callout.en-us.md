<!--
  Module: periodic-alert-callout
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Alert Callout

[English](../alert-callout.md) • [Português (BR)](alert-callout.pt-br.md) • [Español](alert-callout.es.md) • [Italiano](alert-callout.it.md)



> Consolidated module standardized under namespace `.periodic-alert-callout`.
---
# Periodic Alert Callout - Gutenberg Block
[![WordPress](https://img.shields.io/badge/WordPress-6.1%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-black.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-orange.svg)](https://fontawesome.com)
[![License](https://img.shields.io/badge/License-GPL--2.0--or--later-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
Professional WordPress plugin that adds the **Alert and Contextual Callout** (`periodic/alert-callout`) block to the Gutenberg editor. Developed with React JSX, Block API v3 (`block.json`), native WYSIWYG rendering, full compatibility with the **Bootstrap 5** and **Font Awesome 6** ecosystem, internationalization in 4 languages ​​and side panel categorized into dedicated tabs.
---
## 📋 Summary
- [Overview and Purpose](#-visão-geral-e-propósito)
- [Key Features](#-recursos-principais)
- [File Structure](#-estrutura-de-arquivos)
- [Side Panel Detailed Guide (InspectorControls)](#-guia-detalhado-do-painel-lateral-inspectorcontrols)
  - [Tab 1: Type and Color](#aba-1-tipo-e-cor)
  - [Tab 2: Icon](#aba-2-ícone)
  - [Tab 3: Options](#aba-3-opções)
- [WYSIWYG and Frontend Rendering](#-renderização-wysiwyg-e-frontend)
- [Screen and Screenshot Gallery](#-galeria-de-telas-e-screenshots)
- [Installation and Compilation](#-instalação-e-compilação)
- [Internationalization (i18n)](#-internacionalização-i18n)
- [Authorship and Credits](#-autoria-e-créditos)
---
## 🎯 Overview and Purpose
On corporate portals, intranets, documentation and institutional websites, clear communication of warnings, critical guidelines, success notes or warnings is essential. The **Periodic Alert Callout** block fills this need by providing alert boxes standardized with Bootstrap 5 semantics (`.alert`), Font Awesome 6 vector representational icons, and visual flexibility through "Callout" style callout borders.
---
## ✨ Key Features
- **Native Block API v3**: Developed under the latest WordPress Core and Gutenberg guidelines (`block.json` version 3).
- **8 Bootstrap 5 Semantic Variants**: Support `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light` and `dark`.
- **WYSIWYG rendering in Editor**: Real-time editing of title (`alert-heading`) and message using built-in `RichText` components.
- **Font Awesome 6 Icon Selector**: Quick buttons for institutional icons and open field for custom classes (`fas fa-...`).
- **Close / Dismiss Button**: Optional support for the native class `alert-dismissible fade show` with button `btn-close` and attribute `data-bs-dismiss="alert"`.
- **Callout Side Highlight**: Visual enhancement with thick border in the selected theme color (`callout-border-highlight`).
- **Ready Internationalization**: Textdomain `periodic-alert-callout` with JSON files for Portuguese (pt-BR), English (en-US), Italian (it) and Spanish (es).
---
## 📁 File Structure
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
## 🎛 Detailed Side Panel Guide (InspectorControls)
When selecting the **Alert and Contextual Callout** block in the Gutenberg editor, the properties sidebar (`InspectorControls`) displays a custom tab component (`TabPanel`) divided into three configuration areas:
### Tab 1: Type and Color
This tab defines the contextual semantics and color palette applied to the alert:
- **Alert Variant**: Drop-down menu with the 8 official variants of Bootstrap 5:
  - *Informative (Info)*: Light blue background and dark text, ideal for neutral notices and explanatory notes.
  - *Success*: Soft green, for confirmations of actions, successful registrations or positive statuses.
  - *Attention / Warning*: Soft yellow, indicated for warnings, imminent deadlines and precautions.
  - *Danger / Error (Danger)*: Light red, for system errors, cancellations and critical alerts.
  - *Primary*: Theme's default corporate blue.
  - *Secondary*: Elegant neutral gray for auxiliary communications.
  - *Light*: Subtle greyish white background.
  - *Dark*: Dark contrast for high-impact notes.
- **Style Preview**: Interactive box that displays the badge style and selected colors in real time.
### Tab 2: Icon
This tab manages the contextual graphic symbol positioned next to the title and message:
- **Recommended Icons**: Grid with one-click shortcuts for the most common icons:
  - `fas fa-info-circle` (Information)
  - `fas fa-check-circle` (Success)
  - `fas fa-exclamation-triangle` (Warning / Alert)
  - `fas fa-times-circle` (Danger/Error)
  - `fas fa-lightbulb` (Tip / Suggestion)
  - `fas fa-bell` (Notification)
  - `fas fa-shield-alt` (Security and Privacy)
  - `fas fa-comment-dots` (Comment/Message)
- **Icon CSS Class**: Free input field for using any class from the **Font Awesome 6** library (ex: `fas fa-star`, `far fa-envelope`, `fas fa-fire`).
- **Remove Icon**: Button to deactivate the icon display, transforming the box into a purely textual alert.
### Tab 3: Options
Behavior controls and structural presentation:
- **Close Button (Dispensable)**: When active (`isDismissible: true`), includes the classes `alert-dismissible fade show` and renders the button `btn-close` with attribute `data-bs-dismiss="alert"`. The visitor can click the "X" button to gently close the alert on the page.
- **Highlight Side Border (Callout)**: When active (`hasBorderLeftHighlight: true`), adds a 6px left border in the emphasis color of the selected variant, giving the classic institutional technical documentation Callout appearance.
---
## 💻 WYSIWYG and Frontend Rendering
### In the Gutenberg Editor (`src/edit.js`)
The block perfectly simulates the final rendering:
- Title with support for inline formatting via `RichText` (`tagName="h5"`, class `alert-heading`).
- Descriptive message editable directly on the canvas with line breaks and formatting (`tagName="div"`, class `alert-body-content`).
- Dynamic icon synchronized in real time.
- "X" close button with visual feedback (disabled in the editor to avoid accidental closing while writing).
### On Frontend (`src/save.js`)
The generated HTML5 is 100% semantic and clean:
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
## 🖼 Screen and Screenshot Gallery
The demonstrative images are organized in the directory `assets/screenshots/`:
1. **`01-tab-type-color.png`**: Demonstration of the "Type and Color" Tab in InspectorControls with the Bootstrap 5 semantic palette options.
2. **`02-tab-icon.png`**: "Icon" Tab view displaying Font Awesome 6 quick icon grid and custom CSS class field.
3. **`03-tab-options.png`**: Presentation of the "Options" Tab displaying the dismissible alert and Callout edge toggle buttons.
4. **`04-alert-editor-preview.png`**: Screenshot of native WYSIWYG editing within Gutenberg.
5. **`05-alert-frontend-preview.png`**: Visualization of alerts rendered on the website's frontend with Bootstrap 5 active.
---
## 🚀 Installation and Compilation
### Requirements
- WordPress 6.1 or higher.
- PHP 7.4 or higher.
- Node.js 18+ and npm.
### Installation Steps for Development
1. Clone or extract the repository in the WordPress plugins folder (`wp-content/plugins/periodic-alert-callout`).
2. Access the plugin folder via terminal:
   ```bash
   cd periodic-alert-callout
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the files for production:
   ```bash
   npm run build
   ```
5. For continuous development with automatic compilation:
   ```bash
   npm run start
   ```
6. Activate the plugin in the WordPress admin panel (`Plugins > Plugins Instalados`).
---
## 🌐 Internationalization (i18n)
The block supports full internationalization through `wp_set_script_translations` and Jed JSON files:
- `languages/pt-br.json` - Brazilian Portuguese (Standard)
- `languages/en-us.json` - English
- `languages/it.json` - Italian
- `languages/es.json` - Spanish
All editor and side panel messages use the `__()` function linked to the `'periodic-alert-callout'` textdomain.
---
## 👨‍💻 Authorship and Credits
Developed with excellence by **Luiz Fernando Brogliatto Ferreira**.
- **Profile on WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)
---
*Distributed under GPLv2 license or later. Feel free to use, study and improve.*