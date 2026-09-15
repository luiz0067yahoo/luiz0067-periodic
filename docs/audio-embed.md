<!--
  Module: periodic-audio-embed
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Audio Embed

> Consolidated module standardized under namespace `.periodic-audio-embed`.

---

# Periodic - Audio Embed

![Banner](banner-772x250.png)

[![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API-darkblue.svg)](https://developer.wordpress.org/block-editor/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES5-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/License-GPL--2.0--or--later-green.svg)](LICENSE)

Bloco Gutenberg elegante, responsivo e modular para reprodução de áudio, episódios de podcasts e faixas musicais no WordPress. Suporta tanto upload direto de arquivos de mídia (`MP3`, `WAV`, `OGG`, `M4A`) via `MediaUpload` nativo da biblioteca do WordPress quanto incorporação por URL direta externa. Inclui card visual estilizado, miniatura de capa personalizada, edição inline de metadados (título e artista), controles nativos de áudio (`<audio controls>`), opções de repetição/preload e botão de download.

---

## 📸 Capturas de Tela / Screenshots

### 1. Editor Gutenberg (Placeholder de Upload e Inspector Lateral)
![Screenshot 1 - Editor Gutenberg](screenshot-1.png)

### 2. Renderização Pública no Frontend (Player de Áudio Estilizado com Capa)
![Screenshot 2 - Frontend Player](screenshot-2.png)

---

## 🇧🇷 Português do Brasil (PT-BR)

### Recursos Principais
- **Upload Nativo e Embed Direto**: Envie arquivos de áudio diretamente para a Biblioteca de Mídia do WordPress (`editor.MediaUpload`) ou cole URLs diretas (`MP3`, `WAV`, `OGG`, `M4A`).
- **Capa do Álbum / Episódio**: Suporte a upload de imagem de capa quadrada com pré-visualização em tempo real e botão de substituição rápida sobre o card no editor.
- **Edição Inline Direta**: Edite o título da faixa e o nome do artista/autor diretamente no canvas do Gutenberg com `RichText`.
- **Player de Áudio Nativo HTML5**: Totalmente funcional no editor e no frontend, com controles de reprodução, volume e linha de tempo.
- **Botão Opcional de Download**: Permite que os ouvintes baixem o arquivo de áudio com um clique (`download` attribute).
- **Controles Laterais (`InspectorControls`)**:
  - Configurações de arquivo de áudio (URL, substituir, remover).
  - Configurações de imagem de capa (upload, substituição e remoção).
  - Alternador para exibir ou ocultar o botão de download.
  - Alternador para repetição contínua (`loop`).
  - Seletor de pré-carregamento (`preload`: `metadata`, `auto`, `none`).
  - Paleta de cores para personalização do fundo do card e das fontes.
- **Design Moderno e Responsivo**: Cantos arredondados (`14px`), sombra suave com efeito hover e adaptação automática para smartphones e tablets.
- **Vanilla JavaScript (ES5)**: Sem necessidade de ferramentas pesadas de build ou transpiladores (Webpack/Babel); código limpo, estável e de altíssima performance.

### Instalação
1. Faça o download ou clone a pasta `periodic-audio-embed` para o diretório de plugins do WordPress (`wp-content/plugins/`).
2. Acesse o painel administrativo do WordPress > **Plugins** e clique em **Ativar** no plugin **Periodic - Audio Embed**.
3. Em qualquer post ou página, clique em **Adicionar Bloco (+)** e pesquise por **Periodic - Audio Embed** ou simplesmente `audio` / `podcast`.
4. Escolha se deseja fazer upload de um arquivo ou inserir uma URL direta de áudio.

---

## 🇺🇸 English (EN-US)

### Main Features
- **Native Media Upload & Direct Embed**: Upload audio files directly to WordPress Media Library using `editor.MediaUpload` or paste external direct URLs (`MP3`, `WAV`, `OGG`, `M4A`).
- **Album / Episode Cover Art**: Optional square cover thumbnail with live preview and quick edit button in Gutenberg.
- **Inline Editing**: Live editable track title and artist/podcast host names using `RichText` directly on the canvas.
- **Native HTML5 Audio Player**: Responsive `<audio controls>` player fully operational both in the editor preview and on the public frontend.
- **Download Action Button**: Optional pill button enabling listeners to download the track with one click.
- **Complete Inspector Controls**:
  - Audio file configuration (URL field, replace button, remove audio button).
  - Cover art management (upload image, replace, remove).
  - Toggle download button visibility.
  - Toggle continuous playback loop.
  - Select preload strategy (`metadata`, `auto`, `none`).
  - Color palette customization for card background and typography.
- **Responsive & Modern Styling**: Rounded corners (`14px`), subtle drop shadows, smooth hover transitions, and mobile-friendly column collapse.
- **Vanilla JavaScript (ES5)**: No heavy build tools required; standard, high-performance Gutenberg block architecture.

### Installation
1. Upload or copy the `periodic-audio-embed` folder into your `wp-content/plugins/` directory.
2. Navigate to **Plugins** in your WordPress Admin dashboard and click **Activate**.
3. Open any post or page, click **Add Block (+)** and search for **Periodic - Audio Embed** or `audio`.
4. Upload your audio file or paste the audio URL to begin playback.

---

## 🇪🇸 Español (ES-ES)

### Características Principales
- **Subida Nativa e Inserción Directa**: Suba archivos de audio a la biblioteca de medios con `editor.MediaUpload` o pegue URLs directas (`MP3`, `WAV`, `OGG`, `M4A`).
- **Portada de Álbum / Episodio**: Imagen de portada cuadrada opcional con previsualización en vivo y botón rápido de edición.
- **Edición en Vivo**: Modifique el título del audio y el nombre del autor/artista en el lienzo con `RichText`.
- **Reproductor Nativo HTML5**: Control total de reproducción tanto en el editor como en el frontend público.
- **Botón de Descarga Opcional**: Facilita la descarga directa de la pista a los visitantes.
- **Barra Lateral (`InspectorControls`)**:
  - Gestión de audio (reemplazar y eliminar).
  - Gestión de imagen de portada (subir, cambiar, remover).
  - Activar/desactivar repetición continua (`loop`) y descarga (`showDownload`).
  - Estrategia de precarga (`preload`).
  - Paleta de colores para tarjeta y tipografías.
- **Diseño Responsivo**: Se adapta fluidamente a dispositivos móviles y pantallas grandes.

### Instalación
1. Suba la carpeta `periodic-audio-embed` al directorio `wp-content/plugins/`.
2. Vaya a **Plugins** en el panel de WordPress y haga clic en **Activar**.
3. Añada el bloque **Periodic - Audio Embed** desde el editor Gutenberg.

---

## 🇮🇹 Italiano (IT-IT)

### Caratteristiche Principali
- **Caricamento Nativo ed Embed Diretto**: Carica file audio direttamente nella libreria media di WordPress (`editor.MediaUpload`) o inserisci URL diretti (`MP3`, `WAV`, `OGG`, `M4A`).
- **Copertina Album / Podcast**: Immagine di copertina quadrata opzionale con anteprima in tempo reale.
- **Modifica Diretta Inline**: Modifica titolo del brano e nome dell'artista direttamente nel canvas di Gutenberg con `RichText`.
- **Player Audio Nativo HTML5**: Controlli completi di riproduzione nel frontend e nel backend.
- **Pulsante di Download Facoltativo**: Permette ai visitatori di scaricare il file con un clic.
- **Pannello Laterale Completo (`InspectorControls`)**:
  - Gestione file audio (sostituisci, rimuovi).
  - Gestione copertina (carica, modifica, elimina).
  - Toggle download e riproduzione continua (`loop`).
  - Selezione precaricamento (`preload`).
  - Palette colori personalizzabile per scheda e testi.
- **Design Moderno e Reattivo**: Perfetta visualizzazione su schermi desktop e dispositivi mobili.

### Installazione
1. Copia la cartella `periodic-audio-embed` nella directory `wp-content/plugins/`.
2. Vai su **Plugin** nel pannello di WordPress e clicca su **Attiva**.
3. Inserisci il blocco **Periodic - Audio Embed** nell'editor Gutenberg.

---

## 📂 Estrutura de Arquivos / File Structure

```text
periodic-audio-embed/
├── css/
│   ├── editor.css          # Estilos da interface do editor Gutenberg (dropzone, preview, botões)
│   └── style.css           # Estilos públicos do player (card moderno, grid/flex, player, download)
├── js/
│   └── block.js            # Lógica Vanilla JS ES5 do bloco Gutenberg (Edit, Save, MediaUpload)
├── languages/              # Internacionalização JED JSON oficial
│   ├── pt_BR.json          # Português do Brasil
│   ├── en_US.json          # Inglês
│   ├── es_ES.json          # Espanhol
│   └── it_IT.json          # Italiano
├── banner-772x250.png      # Banner oficial do repositório
├── icon.svg                # Ícone vetorial do bloco
├── screenshot-1.png        # Captura de tela do editor Gutenberg
├── screenshot-2.png        # Captura de tela da renderização pública no frontend
├── index.php               # Arquivo principal de inicialização e registro do bloco
├── LICENSE                 # Licença GNU GPL v2.0 or later
└── README.md               # Documentação técnica multilíngue
```

---

## 🔗 Repositórios de Referência / Reference Repositories

Desenvolvido seguindo rigorosamente a arquitetura, convenções e boas práticas do ecossistema de blocos Gutenberg `periodic`:

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

Distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.
