<!--
  Module: periodic-grafic-line-bar
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Grafic Line Bar

> Consolidated module standardized under namespace `.periodic-grafic-line-bar`.

---

# Periodic - Grafic Line & Bar (and Torus Donut)

![Periodic Grafic Line Bar Banner](banner-772x250.png)

[![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-ES5%20Vanilla-green.svg)](https://developer.wordpress.org/block-editor/)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/License-GPL%20v2%2B-orange.svg)](LICENSE)

Plugin completo e modular de blocos Gutenberg para criação de **Gráficos de Linha + Barras** e **Gráficos Torus / Donut** modernos, elegantes e responsivos em **SVG nativo puro** (zero dependências externas ou bibliotecas pesadas).

---

## 📸 Screenshots

| Editor Gutenberg (Painel Lateral & Controles) | Renderização Pública (Frontend) |
| :---: | :---: |
| ![Gutenberg Editor](screenshot-1.png) | ![Frontend Render](screenshot-2.png) |

---

## 🌐 Idiomas / Languages / Idiomas / Lingue

- [Português do Brasil (PT-BR)](#-português-do-brasil-pt-br)
- [English (EN-US)](#-english-en-us)
- [Español (ES)](#-español-es)
- [Italiano (IT)](#-italiano-it)

---

## 🇧🇷 Português do Brasil (PT-BR)

### Descrição
O plugin **Periodic - Grafic Line Bar** adiciona à biblioteca de blocos do Gutenberg dois componentes gráficos essenciais em SVG nativo:
1. **Gráfico de Linha + Barras (`periodic/grafic-line-bar`)**:
   - Inspirado no visual do painel *"238 Threats Blocked"*.
   - Barras verticais arredondadas estilo pílula em tom pastel suave.
   - Linha azul vibrante sobreposta conectando os topos com marcadores circulares vazados.
   - Eixos graduados com linhas de grade horizontais pontilhadas.
   - Totalmente editável: título inline via `RichText`, adição e remoção dinâmica de pontos de dados e valores.
2. **Gráfico Torus / Donut (`periodic/grafic-torus`)**:
   - Gráfico de rosca vazada com espessura e diâmetro configuráveis.
   - Miolo central editável com valor em destaque (*"256"*) e subtítulo (*"BANNED USERS"*).
   - Fatias circulares calculadas proporcionalmente com espaçamento (gaps) elegante.
   - Legenda inferior com marcadores coloridos circulares e percentuais calculados automaticamente.

### Instalação
1. Baixe ou clone o repositório dentro do diretório `/wp-content/plugins/` da sua instalação WordPress:
   ```bash
   git clone https://github.com/periodicyahoo/periodic-grafic-line-bar.git
   ```
2. Acesse o painel administrativo do WordPress em **Plugins > Plugins Instalados**.
3. Localize **Periodic - Grafic Line Bar & Torus** e clique em **Ativar**.
4. Abra o editor Gutenberg em qualquer Página ou Post e pesquise por `Periodic` ou `Gráfico`.

### Recursos e Personalização
- **Painel Lateral (InspectorControls)**:
  - Título e subtítulo do gráfico.
  - Ajuste do valor máximo do eixo Y (Max Y).
  - Alternância de visibilidade (exibir/ocultar colunas, linha e pontos).
  - Paleta de cores completa para barras e linha.
  - Repetidor dinâmico para adicionar, editar rótulo, alterar valores ou excluir pontos.
- **Leveza e Performance**: Sem bibliotecas externas (como Chart.js ou D3), garantindo pontuação máxima no Google PageSpeed e carregamento instantâneo.

---

## 🇺🇸 English (EN-US)

### Description
The **Periodic - Grafic Line Bar** plugin brings two high-performance native SVG chart blocks to the Gutenberg Block Editor:
1. **Line & Bar Chart (`periodic/grafic-line-bar`)**:
   - Modern design featuring rounded pill bars and an overlay connector line with hollow circular markers.
   - Dashed horizontal grid lines and graduated Y-axis (e.g., 90, 60, 30, 0).
   - Real-time inline editing for titles and comprehensive sidebar controls for dynamic points and colors.
2. **Torus / Donut Chart (`periodic/grafic-torus`)**:
   - Circular donut chart rendered via pure SVG with configurable ring thickness and diameter.
   - Center highlight showing primary value and uppercase descriptor.
   - Proportionally calculated arcs with segment gaps and dynamic legend list with bullet colors and percentage values.

### Installation
1. Download or clone this repository into your `/wp-content/plugins/` folder:
   ```bash
   git clone https://github.com/periodicyahoo/periodic-grafic-line-bar.git
   ```
2. In WordPress Admin, navigate to **Plugins > Installed Plugins**.
3. Activate **Periodic - Grafic Line Bar & Torus**.
4. Insert the block into any page or post from the Gutenberg block inserter.

### Key Features
- Zero external dependencies (pure Vanilla JavaScript ES5 + SVG).
- Full Site Editing (FSE) and classic theme support.
- Fully translatable with native Gutenberg JED JSON schema.

---

## 🇪🇸 Español (ES)

### Descripción
El plugin **Periodic - Grafic Line Bar** añade al editor Gutenberg dos bloques de gráficos vectoriales nativos en SVG:
1. **Gráfico de Línea y Barras (`periodic/grafic-line-bar`)**:
   - Columnas redondeadas con estilo contemporáneo y línea azul vibrante superpuesta con marcadores circulares.
   - Eje Y con líneas punteadas y valores automáticos.
   - Edición inline del título y gestión completa de puntos de datos desde la barra lateral.
2. **Gráfico Torus / Donut (`periodic/grafic-torus`)**:
   - Gráfico de rosca circular con valor central de impacto y subtítulo en mayúsculas.
   - Fatias proporcionadas con separaciones limpias y lista de leyendas con porcentaje.

### Instalación
1. Clone el repositorio en la carpeta de plugins:
   ```bash
   git clone https://github.com/periodicyahoo/periodic-grafic-line-bar.git
   ```
2. Active el plugin desde el panel de **Plugins** de WordPress.
3. Inserte el bloque en cualquier contenido y personalice los datos a su medida.

---

## 🇮🇹 Italiano (IT)

### Descrizione
Il plugin **Periodic - Grafic Line Bar** arricchisce l'editor Gutenberg con due blocchi grafici avanzati in SVG nativo:
1. **Grafico a Linee e Barre (`periodic/grafic-line-bar`)**:
   - Barre arrotondate ed elegante linea sovrapposta con indicatori circolari vuoti.
   - Griglia orizzontale tratteggiata ed asse Y graduato.
   - Gestione dinamica dei punti dati dal pannello laterale e modifica inline del titolo.
2. **Grafico Torus / Donut (`periodic/grafic-torus`)**:
   - Grafico a ciambella circolare con valore centrale in rilievo e descrizione.
   - Segmenti proporzionali calcolati con spaziatura (gap) ed elenco legenda con percentuali.

### Installazione
1. Scarica o clona il repository nella cartella `/wp-content/plugins/`:
   ```bash
   git clone https://github.com/periodicyahoo/periodic-grafic-line-bar.git
   ```
2. Attiva il plugin nella schermata **Plugin** di WordPress.
3. Aggiungi il blocco all'interno di qualsiasi pagina o articolo.

---

## 🔗 Repositórios de Referência / Related Repositories

- [periodic-grafic-pizza](https://github.com/periodicyahoo/periodic-grafic-pizza)
- [periodic-grafic-torus](https://github.com/periodicyahoo/periodic-grafic-torus)
- [periodic-big-button.js](https://github.com/periodicyahoo/periodic-big-button.js)
- [periodic-buttons-banner.js](https://github.com/periodicyahoo/periodic-buttons-banner.js)
- [periodic-cols-image.js](https://github.com/periodicyahoo/periodic-cols-image.js)
- [periodic-destack-buttons.js](https://github.com/periodicyahoo/periodic-destack-buttons.js)
- [periodic-image-destaque.js](https://github.com/periodicyahoo/periodic-image-destaque.js)
- [periodic-image-only.js](https://github.com/periodicyahoo/periodic-image-only.js)
- [periodic-multi-pdf-image.js](https://github.com/periodicyahoo/periodic-multi-pdf-image.js)
- [periodic-date-title-link-file-upload.js](https://github.com/periodicyahoo/periodic-date-title-link-file-upload.js)
- [periodic-separator](https://github.com/periodicyahoo/periodic-separator)
- [periodic-thumbnail-pdf-link](https://github.com/periodicyahoo/periodic-thumbnail-pdf-link)
- [periodic-accordion](https://github.com/periodicyahoo/periodic-accordion)
- [periodic-carousel-slides](https://github.com/periodicyahoo/periodic-carousel-slides)

---

## 📄 Licença / License
Este plugin é distribuído sob a licença [GPL-2.0-or-later](LICENSE).
