<!--
  Módulo: periodic-grafic-torus
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Grafic Torus

> Módulo consolidado e padronizado sob o namespace `.periodic-grafic-torus`.

---

# Periodic - Grafic Torus (Gráfico Donut / Rosca SVG)

![Periodic Grafic Torus Banner](banner-772x250.png)

[![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-ES5%20Vanilla-green.svg)](https://developer.wordpress.org/block-editor/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![i18n](https://img.shields.io/badge/i18n-PT--BR%20%7C%20EN--US%20%7C%20ES%20%7C%20IT-purple.svg)](#)

Plugin de bloco Gutenberg nativo para WordPress que permite criar e personalizar gráficos elegantes no formato **Torus / Donut (Rosca vazada)** em **SVG nativo matemático**, com valor numérico e legenda de destaque central, fatias coloridas proporcionais com gaps angulares e lista de legendas inferior interativa com marcadores e percentuais alinhados.

Desenvolvido em **Vanilla JavaScript / ES5 puro** (sem ferramentas de build, sem npm, sem Babel, sem React JSX compilado), seguindo à risca os padrões arquiteturais do ecossistema de blocos `periodic-*`.

---

## 📸 Capturas de Tela / Screenshots

### 1. Visualização Pública no Frontend (Design Fiel à Imagem de Referência)
![Visualização no Frontend](screenshot-2.png)

### 2. Painel de Edição e Controles no Gutenberg
![Bloco no Editor Gutenberg](screenshot-1.png)

---

## 📑 Sumário Multilíngue / Multilingual Index

- [Português do Brasil (PT-BR)](#-português-do-brasil-pt-br)
- [English (EN-US)](#-english-en-us)
- [Español (ES-ES)](#-español-es-es)
- [Italiano (IT-IT)](#-italiano-it-it)
- [Repositórios de Referência](#-repositórios-de-referência--reference-repositories)

---

## 🇧🇷 Português do Brasil (PT-BR)

### Recursos Principais
- **Gráfico Torus em SVG Nativo**: Renderização ultrarrápida e nítida em qualquer resolução com arcos proporcionais calculados via `stroke-dasharray` e `stroke-dashoffset`.
- **Centro do Torus Parametrizável**: Exibição de valor numérico principal (ex: `256`) e subtítulo central em caixa alta (ex: `BANNED USERS`), com edição visual inline via `RichText`.
- **Gaps Visíveis entre Fatias**: Espaçamento angular entre os segmentos do círculo (`stroke-linecap: butt`).
- **Lista de Legendas com Marcadores Circulares**: Bullets coloridos correspondentes a cada fatia, títulos descritivos e percentuais destacados à direita (`53%`, `28%`, `29%`).
- **Painel Lateral Completo (`InspectorControls`)**:
  - Ajuste fino da espessura do anel (`strokeWidth`) de 14px a 32px.
  - Diâmetro do gráfico (`chartSize`) de 180px a 360px.
  - Repetidor dinâmico para adicionar novos segmentos, remover fatias existentes, alterar rótulos, valores e paleta de cores.
- **Card Estilizado**: Moldura com cantos arredondados (`border-radius: 16px`), borda quente suave (`#dfcfbc`) e sombra sutil.
- **100% Responsivo**: Layout otimizado para visualização perfeita em dispositivos móveis e desktops.
- **Zero Dependências JS Externas**: Não requer bibliotecas pesadas de gráficos no frontend; pura renderização SVG nativa compatível com todos os navegadores.

### Instalação
1. Baixe a pasta `periodic-grafic-torus` para o diretório de plugins do WordPress (`wp-content/plugins/`).
2. Acesse o painel administrativo do WordPress > **Plugins** e clique em **Ativar**.
3. No editor Gutenberg, clique em **Adicionar Bloco (+)** e pesquise por **Periodic - Grafic Torus** ou simplesmente `torus`.

---

## 🇺🇸 English (EN-US)

### Main Features
- **Native SVG Torus Chart**: Ultra-fast and crisp vector rendering across any screen resolution using dynamic `stroke-dasharray` and `stroke-dashoffset` circle calculations.
- **Parametric Torus Center**: Central metric value (e.g. `256`) and uppercase center label (e.g. `BANNED USERS`), editable inline directly on the editor canvas via `RichText`.
- **Visible Slice Gaps**: Clean angular gaps between all donut segments (`stroke-linecap: butt`).
- **Legend List with Color Bullets**: Circular color bullets matching slice colors, descriptive text, and right-aligned percentage values (`53%`, `28%`, `29%`).
- **Full Inspector Controls Sidebar**:
  - Ring thickness slider (`strokeWidth`) from 14px to 32px.
  - Chart diameter slider (`chartSize`) from 180px to 360px.
  - Dynamic slice repeater: add new segments, remove existing ones, update labels, numeric values, and pick colors.
- **Styled Container Card**: Clean card with rounded corners (`16px`), subtle warm border (`#dfcfbc`), and elegant drop shadow.
- **Zero External JS Dependencies**: No heavy frontend charting library required; lightweight and standards-compliant native SVG.

### Installation
1. Place the `periodic-grafic-torus` folder into your WordPress plugins directory (`wp-content/plugins/`).
2. Navigate to **Plugins** in the WordPress admin area and click **Activate**.
3. Open any post or page, click **Add Block (+)**, and search for **Periodic - Grafic Torus** or `torus`.

---

## 🇪🇸 Español (ES-ES)

### Características Principales
- **Gráfico Torus en SVG Nativo**: Renderizado vectorial nítido e instantáneo en cualquier pantalla mediante arcos calculados con `stroke-dasharray` y `stroke-dashoffset`.
- **Núcleo Central Configurable**: Muestra un valor numérico central destacado (ej. `256`) y una leyenda en mayúsculas (ej. `BANNED USERS`), editables en vivo mediante `RichText`.
- **Espaciado Real entre Segmentos**: Cortes angulares limpios y precisos entre las porciones de la rosca.
- **Lista de Leyendas Inferior**: Marcadores circulares con el color de cada porción, etiquetas descriptivas y porcentajes alineados a la derecha (`53%`, `28%`, `29%`).
- **Barra Lateral Intuitiva (`InspectorControls`)**:
  - Ajuste del grosor del anillo (`strokeWidth`) de 14px a 32px.
  - Ajuste del diámetro del gráfico (`chartSize`) de 180px a 360px.
  - Administrador de porciones: añadir, eliminar, modificar texto, valor numérico y selector de color.
- **Diseño Responsivo y Elegante**: Tarjeta contenedor con bordes redondeados y sombra sutil.

### Instalación
1. Suba el directorio `periodic-grafic-torus` a la carpeta `wp-content/plugins/`.
2. Vaya al panel de administración de WordPress > **Plugins** y seleccione **Activar**.
3. En el editor Gutenberg, agregue el bloque **Periodic - Grafic Torus**.

---

## 🇮🇹 Italiano (IT-IT)

### Caratteristiche Principali
- **Grafico Torus in SVG Nativo**: Rendering vettoriale ad altissima fedeltà calcolato matematicamente con `stroke-dasharray` e `stroke-dashoffset`.
- **Centro del Torus Personalizzabile**: Visualizzazione del valore numerico principale (es. `256`) e sottotitolo in maiuscolo (es. `BANNED USERS`), modificabili inline con `RichText`.
- **Spaziatura Netta tra le Fette**: Gap angolari puliti tra ogni fetta circolare (`stroke-linecap: butt`).
- **Lista Legenda con Marcatori Colorati**: Bullet circolari corrispondenti a ciascuna fetta, etichetta descrittiva e valore percentuale allineato a destra (`53%`, `28%`, `29%`).
- **Pannello Laterale Gutenberg Completo**:
  - Spessore dell'anello (`strokeWidth`) da 14px a 32px.
  - Diametro del grafico (`chartSize`) da 180px a 360px.
  - Gestione flessibile delle fette: aggiunta, rimozione, testo, valori e colori.
- **Card Stilizzata e Reattiva**: Bordo caldo raffinato (`#dfcfbc`), angoli arrotondati da 16px e ombra leggera.

### Installazione
1. Copiare la cartella `periodic-grafic-torus` all'interno della directory `wp-content/plugins/`.
2. Andare nel menu **Plugin** del pannello di WordPress e cliccare su **Attiva**.
3. Inserire il blocco **Periodic - Grafic Torus** all'interno dell'editor Gutenberg.

---

## 📂 Estrutura de Arquivos / File Structure

```text
periodic-grafic-torus/
├── css/
│   ├── editor.css          # Estilos do InspectorControls e canvas do Gutenberg
│   └── style.css           # Estilos públicos do Torus, card e legenda
├── js/
│   └── block.js            # Lógica ES5 Vanilla Gutenberg (Edit, Save, SVG Math)
├── languages/              # Internacionalização (i18n) em JSON Jed sem prefixo
│   ├── pt_BR.json          # Português do Brasil
│   ├── en_US.json          # Inglês
│   ├── es_ES.json          # Espanhol
│   └── it_IT.json          # Italiano
├── banner-772x250.png      # Banner oficial do repositório
├── icon.svg                # Ícone vetorial do bloco
├── screenshot-1.png        # Bloco inserido no editor Gutenberg
├── screenshot-2.png        # Renderização pública fiel à imagem de referência
├── index.php               # Arquivo principal do plugin WordPress
├── LICENSE                 # Licença GNU GPL v2.0
└── README.md               # Documentação técnica multilíngue
```

---

## 🔗 Repositórios de Referência / Reference Repositories

Este bloco foi desenvolvido seguindo rigorosamente os padrões de código, modularização e design do ecossistema de blocos Gutenberg `periodic`:

- [periodic-big-button.js](https://github.com/periodicyahoo/periodic-big-button.js)
- [periodic-buttons-banner.js](https://github.com/periodicyahoo/periodic-buttons-banner.js)
- [periodic-cols-image.js](https://github.com/periodicyahoo/periodic-cols-image.js)
- [periodic-destack-buttons.js](https://github.com/periodicyahoo/periodic-destack-buttons.js)
- [periodic-image-destaque.js](https://github.com/periodicyahoo/periodic-image-destaque.js)
- [periodic-image-only.js](https://github.com/periodicyahoo/periodic-image-only.js)
- [periodic-multi-pdf-image.js](https://github.com/periodicyahoo/periodic-multi-pdf-image.js)
- [periodic-date-title-link-file-upload.js](https://github.com/periodicyahoo/periodic-date-title-link-file-upload.js)
- [periodic-buttons-banner](https://github.com/periodicyahoo/periodic-buttons-banner)
- [periodic-big-button](https://github.com/periodicyahoo/periodic-big-button)
- [periodic-date-title-link](https://github.com/periodicyahoo/periodic-date-title-link)
- [periodic-separator](https://github.com/periodicyahoo/periodic-separator)
- [periodic-thumbnail-pdf-link](https://github.com/periodicyahoo/periodic-thumbnail-pdf-link)
- [periodic-grafic-pizza](https://github.com/periodicyahoo/periodic-grafic-pizza)
- [periodic-accordion](https://github.com/periodicyahoo/periodic-accordion)
- [periodic-carousel-slides](https://github.com/periodicyahoo/periodic-carousel-slides)

---

## 📄 Licença / License

Distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
