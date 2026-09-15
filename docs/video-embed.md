<!--
  Módulo: periodic-video-embed
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Video Embed

> Módulo consolidado e padronizado sob o namespace `.periodic-video-embed`.

---

# Periodic - Video Embed

![Periodic - Video Embed Banner](banner-772x250.png)

[![WordPress Gutenberg](https://img.shields.io/badge/WordPress-Gutenberg%20Block-blue.svg?logo=wordpress)](https://wordpress.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES5-yellow.svg?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-green.svg)](LICENSE)
[![i18n](https://img.shields.io/badge/i18n-PT--BR%20%7C%20EN--US%20%7C%20ES--ES%20%7C%20IT--IT-orange.svg)](languages/)

Um plugin completo, leve e modular de Bloco Gutenberg para WordPress para incorporação responsiva e estilizada de vídeos do **YouTube**, **Vimeo** ou tags `<iframe>` personalizadas, construído em **Vanilla JavaScript (ES5)** estritamente compatível com a Block API oficial do WordPress.

---

## 📑 Sumário / Table of Contents
- [🇧🇷 Português (Brasil)](#-português-do-brasil)
- [🇺🇸 English](#-english)
- [🇪🇸 Español](#-español)
- [🇮🇹 Italiano](#-italiano)
- [🔗 Repositórios de Referência](#-repositórios-de-referência--reference-repositories)

---

## 📸 Demonstração Visual

### Editor Gutenberg com Painel Lateral Ativo
![Editor Gutenberg](screenshot-1.png)

### Renderização Pública no Frontend
![Frontend Render](screenshot-2.png)

---

## 🇧🇷 Português do Brasil

### Visão Geral
O **Periodic - Video Embed** resolve de forma definitiva a incorporação de vídeos no WordPress, garantindo reprodução responsiva perfeita sem barras pretas laterais ou cortes indesejados. O bloco processa automaticamente links do YouTube e Vimeo, convertendo-os para formatos seguros de embed (`rel=0`), ou aceita tags `<iframe>` completas.

### Principais Recursos
- **Parsing Inteligente de URLs**:
  - YouTube: links no formato `https://www.youtube.com/watch?v=jNQXAC9IVRw`, `https://youtu.be/ID`, `shorts`, `embed` ou parâmetros adicionais.
  - Vimeo: links `https://vimeo.com/ID` ou `player.vimeo.com/video/ID`.
  - Tags `<iframe>`: extração automática do atributo `src`.
- **Proporções de Tela Flexíveis (Aspect Ratio)**:
  - `16:9 - Widescreen` (padrão moderno para vídeos de alta definição).
  - `4:3 - Clássico / TV` (ideal para produções retrô e gravações antigas).
  - `1:1 - Quadrado / Feed` (perfeito para vídeos no estilo redes sociais).
- **Controles Estéticos no InspectorControls**:
  - **Largura Máxima (px)**: ajuste contínuo de 400px a 1200px (padrão: 800px).
  - **Cantos Arredondados (px)**: controle suave de 0px a 30px (padrão: 8px).
  - **Sombra Projetada Suave**: ativação de sombra com profundidade visual (padrão: ativado).
  - **Legenda Inline (RichText)**: edição instantânea de legenda abaixo do player com suporte a formatação.
- **Zero Ferramentas de Compilação**: Vanilla JS (ES5) puro executável nativamente sem necessidade de Node, Webpack ou Babel.
- **Internacionalização Pronta**: formato JSON Gutenberg JED em 4 idiomas (Português, Inglês, Espanhol e Italiano).

### Instalação
1. Baixe ou clone esta pasta para o diretório de plugins do seu WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-video-embed.git
   ```
2. Acesse o Painel Administrativo do WordPress > **Plugins** > **Plugins Instalados**.
3. Localize **Periodic - Video Embed** e clique em **Ativar**.
4. No editor de posts ou páginas, clique no botão **+** e pesquise por **"Periodic - Vídeo Incorporado"**.

### Link Padrão de Demonstração
Por padrão, o bloco vem configurado com o marco histórico da internet:
- **URL**: `https://www.youtube.com/watch?v=jNQXAC9IVRw` (*Me at the zoo* - o primeiro vídeo postado no YouTube).

---

## 🇺🇸 English

### Overview
**Periodic - Video Embed** is a responsive, lightweight, and modular Gutenberg block plugin for WordPress. It provides seamless embedding for **YouTube**, **Vimeo**, or custom `<iframe>` embed codes, utilizing modern CSS aspect-ratio techniques with reliable cross-browser fallbacks.

### Features
- **Smart URL Parsing**:
  - YouTube URLs (`watch?v=...`, `youtu.be/...`, `shorts/...`, `embed/...`).
  - Vimeo URLs (`vimeo.com/...`, `player.vimeo.com/video/...`).
  - Full `<iframe>` HTML tags (automatically extracts the `src` attribute).
- **Aspect Ratio Options**:
  - `16:9 - Widescreen` (default standard).
  - `4:3 - Classic / TV`.
  - `1:1 - Square / Feed`.
- **Customization Settings**:
  - **Max Width**: 400px to 1200px.
  - **Border Radius**: 0px to 30px with `overflow: hidden`.
  - **Soft Drop Shadow**: toggle on/off for realistic depth.
  - **Inline Caption**: editable `RichText` field with centered typography.
- **Pure Vanilla JS**: built in canonical ES5 Gutenberg format without requiring complex build steps.
- **Full i18n**: JED 1.x JSON translations for English, Portuguese, Spanish, and Italian.

### Installation
1. Upload or clone the plugin directory to `/wp-content/plugins/`:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-video-embed.git
   ```
2. Navigate to WordPress Dashboard > **Plugins** > **Installed Plugins**.
3. Find **Periodic - Video Embed** and click **Activate**.
4. In the block editor, click **+** and search for **"Periodic - Video Embed"**.

### Default Test URL
- **URL**: `https://www.youtube.com/watch?v=jNQXAC9IVRw` (*Me at the zoo*).

---

## 🇪🇸 Español

### Descripción General
**Periodic - Video Embed** es un plugin modular y elegante para el editor de bloques Gutenberg de WordPress que permite incrustar vídeos de **YouTube**, **Vimeo** o códigos `<iframe>` personalizados de forma 100% responsiva y adaptable a cualquier tema.

### Características Principales
- **Detección y Conversión Inteligente**:
  - Soporte completo para URLs de YouTube (incluyendo shorts y enlaces cortos).
  - Detección de identificadores de Vimeo.
  - Extracción automática de enlaces desde etiquetas `<iframe>`.
- **Relaciones de Aspecto**:
  - `16:9 - Panorámico` (predeterminado).
  - `4:3 - Clásico / TV`.
  - `1:1 - Cuadrado / Redes Sociales`.
- **Controles Visuales**:
  - **Ancho Máximo**: regulable entre 400px y 1200px.
  - **Esquinas Redondeadas**: radio ajustable entre 0px y 30px.
  - **Sombra Proyectada**: efecto de profundidad suave conmutable.
  - **Pie de Foto / Subtítulo**: edición directa en el editor con `RichText`.
- **Código Limpio**: JavaScript Vanilla (ES5) puro sin dependencias externas pesadas.
- **Traducciones**: soporte completo en español (`languages/es_ES.json`).

### Instalación
1. Copie o clone el directorio en `/wp-content/plugins/`:
   ```bash
   git clone https://github.com/periodicyahoo/periodic-video-embed.git
   ```
2. Active el plugin en el panel de administración de WordPress.
3. Inserte el bloque buscando **"Periodic - Vídeo Incrustado"**.

---

## 🇮🇹 Italiano

### Panoramica
**Periodic - Video Embed** è un plugin per WordPress Gutenberg progettato per incorporare video da **YouTube**, **Vimeo** o tag `<iframe>` con proporzioni perfette, bordi arrotondati, ombre morbide e didascalie personalizzate.

### Caratteristiche
- **Elaborazione Intelligente degli URL**:
  - Riconoscimento automatico dei formati YouTube e Vimeo.
  - Estrazione dell'attributo `src` da codice `<iframe>` incollato.
- **Proporzioni Supportate**:
  - `16:9 - Widescreen` (predefinito).
  - `4:3 - Classico / TV`.
  - `1:1 - Quadrato / Feed`.
- **Pannello delle Impostazioni**:
  - **Larghezza Massima**: da 400px a 1200px.
  - **Raggio dei Bordi**: da 0px a 30px.
  - **Ombra Proiettata**: interruttore on/off.
  - **Didascalia RichText**: campo modificabile inline direttamente nel canvas.
- **Vanilla JavaScript (ES5)**: massima compatibilità e zero processi di build.
- **Internazionalizzazione**: file JED JSON completi in italiano (`languages/it_IT.json`).

### Installazione
1. Scarica o clona il repository nella cartella `/wp-content/plugins/`:
   ```bash
   git clone https://github.com/periodicyahoo/periodic-video-embed.git
   ```
2. Attiva il plugin dalla dashboard di WordPress.
3. Aggiungi il blocco cercando **"Periodic - Video Incorporato"**.

---

## 🔗 Repositórios de Referência / Reference Repositories

Este plugin segue rigorosamente o padrão de modularização, arquitetura e convenções dos seguintes repositórios da coleção:

1. [periodic-big-button.js](https://github.com/periodicyahoo/periodic-big-button.js)
2. [periodic-buttons-banner.js](https://github.com/periodicyahoo/periodic-buttons-banner.js)
3. [periodic-cols-image.js](https://github.com/periodicyahoo/periodic-cols-image.js)
4. [periodic-destack-buttons.js](https://github.com/periodicyahoo/periodic-destack-buttons.js)
5. [periodic-image-destaque.js](https://github.com/periodicyahoo/periodic-image-destaque.js)
6. [periodic-image-only.js](https://github.com/periodicyahoo/periodic-image-only.js)
7. [periodic-multi-pdf-image.js](https://github.com/periodicyahoo/periodic-multi-pdf-image.js)
8. [periodic-date-title-link-file-upload.js](https://github.com/periodicyahoo/periodic-date-title-link-file-upload.js)
9. [periodic-buttons-banner](https://github.com/periodicyahoo/periodic-buttons-banner)
10. [periodic-big-button](https://github.com/periodicyahoo/periodic-big-button)
11. [periodic-date-title-link](https://github.com/periodicyahoo/periodic-date-title-link)
12. [periodic-separator](https://github.com/periodicyahoo/periodic-separator)
13. [periodic-thumbnail-pdf-link](https://github.com/periodicyahoo/periodic-thumbnail-pdf-link)
14. [periodic-grafic-pizza](https://github.com/periodicyahoo/periodic-grafic-pizza)
15. [periodic-accordion](https://github.com/periodicyahoo/periodic-accordion)
16. [periodic-carousel-slides](https://github.com/periodicyahoo/periodic-carousel-slides)

---

## 📄 Licença / License
Distribuído sob a licença **GPL-2.0-or-later**. Consulte [LICENSE](LICENSE) para mais detalhes.
