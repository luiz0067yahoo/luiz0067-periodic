# Suite di Componenti Periodic ⚛️


[English](README.md) • [Português (BR)](README.pt-br.md) • [Español](README.es.md) • [Italiano](README.it.md)


> **Suite Unificata di 61 Componenti Frontend e Moduli Modulari**  
> Progettata con architettura disaccoppiata, namespace BEM isolato (`.periodic-*`), internazionalizzazione nativa in 4 lingue (`it`, `en-us`, `pt-br`, `es`), dipendenze condivise centralizzate e documentazione esaustiva in `/docs/`.

---

## 📑 Sommario

- [Panoramica](#-panoramica)
- [Architettura delle Directory](#-architettura-delle-directory)
- [Centralizzazione delle Dipendenze](#-centralizzazione-delle-dipendenze)
- [Internazionalizzazione (i18n)](#-internazionalizzazione-i18n)
- [Indice Completo dei 61 Moduli Integrati](#-indice-completo-dei-61-moduli-integrati)
- [Showroom & Dimostrazione Interattiva](#-showroom--dimostrazione-interattiva)
- [Integrazione con WordPress](#-integrazione-con-wordpress)
- [Guida all'Uso Standalone](#-guida-alluso-standalone)
- [Standard e Convenzioni di Ingegneria](#-standard-e-convenzioni-di-ingegneria)

---

## 🌟 Panoramica

Il progetto **Periodic** consolida 61 repository di componenti indipendenti in un unico monorepo performante e scalabile. Ciascun modulo è stato sistematicamente rifattorizzato per eliminare il prefisso legacy `luiz0067-`, standardizzare classi e ID sotto `.periodic-*`, rimuovere duplicazioni di librerie esterne (come Bootstrap e FontAwesome ripetuti in decine di repository) e fornire reattività multilingue in tempo reale.

---

## 📂 Architettura delle Directory

```text
luiz0067-periodic/
├── components/                       # 61 moduli individuali consolidati
│   ├── accordion/                    # Fisarmonica responsiva e pannelli richiudibili
│   ├── breadcrumbs/                  # Briciole di pane gerarchiche con Schema.org
│   ├── counter-stats/                # Contatori numerici animati allo scorrimento
│   ├── quiz-engine/                  # Motore di esami e quiz interattivi
│   ├── word-games/                   # Giochi educativi di vocabolario e ortografia
│   └── ... (61 componenti)
├── core/                             # Kernel condiviso della suite
│   ├── i18n/                         # Motore di internazionalizzazione e dizionari
│   │   ├── i18n.js                   # Motore reattivo con binding DOM ed eventi
│   │   ├── translations.js           # Fallback sincrono per protocollo file://
│   │   ├── it.json                   # Italiano
│   │   ├── en-us.json                # Inglese (USA)
│   │   ├── pt-br.json                # Portoghese (Brasile)
│   │   └── es.json                   # Spagnolo
│   ├── js/                           # Orchestratore globale e registro componenti
│   │   └── periodic-core.js          # Event bus e inizializzatore dichiarativo automatico
│   └── styles/                       # Token di design e CSS base isolato
│       ├── variables.css             # Sistema colori HSL, tema scuro/chiaro
│       └── base.css                  # Reset sicuri e utilità condivise
├── shared/                           # Dipendenze esterne centralizzate
│   └── vendor/
│       ├── bootstrap/                # Bootstrap 5.3 (CSS + JS bundle)
│       └── fontawesome/              # FontAwesome 6 (CSS + Font web)
├── docs/                             # Documentazione tecnica esaustiva (61 file)
│   ├── accordion.md
│   ├── quiz-engine.md
│   └── ... (61 file .md)
├── demo/                             # Showroom e catalogo interattivo
│   ├── index.html                    # Visualizzatore componenti con filtri e ricerca
│   ├── demo.css                      # Stili dell'interfaccia showroom
│   └── demo.js                       # Controller per anteprima modale e cambio lingua
├── periodic.php                      # Loader principale per WordPress
└── README.md                         # Indice principale della documentazione
```

---

## 📦 Centralizzazione delle Dipendenze

In precedenza, dozzine di moduli contenevano copie isolate di Bootstrap e FontAwesome:
- Tutte le librerie esterne sono ora centralizzate in `/shared/vendor/`.
- I singoli componenti consumano le risorse globali condivise, eliminando le ridondanze ed evitando conflitti di specificità CSS.
- Il loader `periodic.php` registra le risorse in WordPress una sola volta (`wp_enqueue_scripts`), garantendo la massima efficienza e punteggi ottimali nei Core Web Vitals.

---

## 🌐 Internazionalizzazione (i18n)

La suite offre un motore di internazionalizzazione in `core/i18n/i18n.js` con chiavi di traduzione simmetriche per **4 lingue**:
1. 🇮🇹 `it` (Italiano)
2. 🇺🇸 `en-us` (Inglese)
3. 🇧🇷 `pt-br` (Portoghese)
4. 🇪🇸 `es` (Spagnolo)

### Uso Dichiarativo in HTML:
```html
<h2 data-i18n="components.accordion.title">Fisarmonica</h2>
<p data-i18n="components.accordion.description">Descrizione...</p>
<input type="text" data-i18n-placeholder="ui.search_placeholder" />
```

### Uso Programmatico in JavaScript:
```javascript
// Cambiare lingua in tempo reale senza ricaricare la pagina
Periodic.i18n.setLocale('it');

// Ottenere traduzione
const label = Periodic.i18n.t('ui.view_doc'); // "Visualizza Documentazione"
```

---

## 📋 Indice Completo dei 61 Moduli Integrati

| # | Modulo | Categoria | Namespace BEM | Documentazione |
|---|---|---|---|---|
| 1 | **Fisarmonica** | Layout | `.periodic-accordion` | [docs/accordion.md](docs/accordion.md) |
| 2 | **Banner Pubblicitario** | Interattivo | `.periodic-ad-banner` | [docs/ad-banner.md](docs/ad-banner.md) |
| 3 | **Banner Avanzato** | Interattivo | `.periodic-advanced-banner` | [docs/advanced-banner.md](docs/advanced-banner.md) |
| 4 | **Distanziatore Avanzato** | Layout | `.periodic-advanced-spacer` | [docs/advanced-spacer.md](docs/advanced-spacer.md) |
| 5 | **Avviso e Riquadro** | Contenuto | `.periodic-alert-callout` | [docs/alert-callout.md](docs/alert-callout.md) |
| 6 | **Player Audio** | Media | `.periodic-audio-embed` | [docs/audio-embed.md](docs/audio-embed.md) |
| 7 | **Grande Bottone** | Interattivo | `.periodic-big-button` | [docs/big-button.md](docs/big-button.md) |
| 8 | **Briciole di Pane** | Contenuto | `.periodic-breadcrumbs` | [docs/breadcrumbs.md](docs/breadcrumbs.md) |
| 9 | **Banner di Pulsanti** | Interattivo | `.periodic-buttons-banner` | [docs/buttons-banner.md](docs/buttons-banner.md) |
| 10 | **Allenatore a Schede** | Interattivo | `.periodic-card-trainer` | [docs/card-trainer.md](docs/card-trainer.md) |
| 11 | **Contenitore di Scheda** | Layout | `.periodic-card-wrapper` | [docs/card-wrapper.md](docs/card-wrapper.md) |
| 12 | **Carosello di Diapositive** | Interattivo | `.periodic-carousel-slides` | [docs/carousel-slides.md](docs/carousel-slides.md) |
| 13 | **Carosello Avanzato** | Interattivo | `.periodic-carousel-slides-plus` | [docs/carousel-slides-plus.md](docs/carousel-slides-plus.md) |
| 14 | **Blocco di Codice** | Contenuto | `.periodic-code` | [docs/code.md](docs/code.md) |
| 15 | **Colonne di Immagini** | Media | `.periodic-cols-image` | [docs/cols-image.md](docs/cols-image.md) |
| 16 | **Contatore Statistico** | Interattivo | `.periodic-counter-stats` | [docs/counter-stats.md](docs/counter-stats.md) |
| 17 | **Forme Personalizzate** | Contenuto | `.periodic-custom-shapes` | [docs/custom-shapes.md](docs/custom-shapes.md) |
| 18 | **Data, Titolo e Link** | Contenuto | `.periodic-date-title-link` | [docs/date-title-link.md](docs/date-title-link.md) |
| 19 | **Link con Caricamento File** | Contenuto | `.periodic-date-title-link-file-upload` | [docs/date-title-link-file-upload.md](docs/date-title-link-file-upload.md) |
| 20 | **Pulsanti in Evidenza** | Interattivo | `.periodic-destack-buttons` | [docs/destack-buttons.md](docs/destack-buttons.md) |
| 21 | **Motore Drag & Drop** | Interattivo | `.periodic-drag-drop-engine` | [docs/drag-drop-engine.md](docs/drag-drop-engine.md) |
| 22 | **Domande Frequenti (FAQ)** | Moduli | `.periodic-faq-schema` | [docs/faq-schema.md](docs/faq-schema.md) |
| 23 | **Costruttore di Moduli** | Moduli | `.periodic-form-builder` | [docs/form-builder.md](docs/form-builder.md) |
| 24 | **Galleria con Lightbox** | Media | `.periodic-gallery-lightbox` | [docs/gallery-lightbox.md](docs/gallery-lightbox.md) |
| 25 | **Grafico a Linee e Barre** | Grafici | `.periodic-grafic-line-bar` | [docs/grafic-line-bar.md](docs/grafic-line-bar.md) |
| 26 | **Grafico a Torta** | Grafici | `.periodic-grafic-pizza` | [docs/grafic-pizza.md](docs/grafic-pizza.md) |
| 27 | **Grafico a Ciambella** | Grafici | `.periodic-grafic-torus` | [docs/grafic-torus.md](docs/grafic-torus.md) |
| 28 | **Griglia Flessibile** | Layout | `.periodic-grid-flex` | [docs/grid-flex.md](docs/grid-flex.md) |
| 29 | **Icone e Vettori** | Altro | `.periodic-icons` | [docs/icons.md](docs/icons.md) |
| 30 | **Immagine in Evidenza** | Media | `.periodic-image-destaque` | [docs/image-destaque.md](docs/image-destaque.md) |
| 31 | **Editor di Immagini** | Media | `.periodic-image-editor` | [docs/image-editor.md](docs/image-editor.md) |
| 32 | **Solo Immagine** | Media | `.periodic-image-only` | [docs/image-only.md](docs/image-only.md) |
| 33 | **Utilità Interattive** | Interattivo | `.periodic-interactive-utilities` | [docs/interactive-utilities.md](docs/interactive-utilities.md) |
| 34 | **Simulatore di Software** | Interattivo | `.periodic-interative-software-simulator` | [docs/interative-software-simulator.md](docs/interative-software-simulator.md) |
| 35 | **Mappe Interattive** | Moduli | `.periodic-maps` | [docs/maps.md](docs/maps.md) |
| 36 | **Punti di Interesse (Hotspot)** | Media | `.periodic-media-hotspot` | [docs/media-hotspot.md](docs/media-hotspot.md) |
| 37 | **Finestra Modale / Popup** | Interattivo | `.periodic-modal-popup` | [docs/modal-popup.md](docs/modal-popup.md) |
| 38 | **Sezione Parallax** | Layout | `.periodic-parallax-section` | [docs/parallax-section.md](docs/parallax-section.md) |
| 39 | **Libro Digitale (Flipbook)** | Media | `.periodic-pdf-flipbook` | [docs/pdf-flipbook.md](docs/pdf-flipbook.md) |
| 40 | **Tabella dei Prezzi** | Moduli | `.periodic-pricing-table` | [docs/pricing-table.md](docs/pricing-table.md) |
| 41 | **Motore di Quiz ed Esami** | Giochi | `.periodic-quiz-engine` | [docs/quiz-engine.md](docs/quiz-engine.md) |
| 42 | **Torna all'Inizio** | Interattivo | `.periodic-scroll-top` | [docs/scroll-top.md](docs/scroll-top.md) |
| 43 | **Contenitore di Sezione** | Layout | `.periodic-section-container` | [docs/section-container.md](docs/section-container.md) |
| 44 | **Separatore e Divisore** | Layout | `.periodic-separator` | [docs/separator.md](docs/separator.md) |
| 45 | **Saggio Intelligente** | Contenuto | `.periodic-smart-essay` | [docs/smart-essay.md](docs/smart-essay.md) |
| 46 | **Scrittura Strutturata** | Contenuto | `.periodic-structured-writing` | [docs/structured-writing.md](docs/structured-writing.md) |
| 47 | **Indice dei Contenuti** | Layout | `.periodic-table-of-contents` | [docs/table-of-contents.md](docs/table-of-contents.md) |
| 48 | **Tabella Reattiva** | Layout | `.periodic-table-responsive` | [docs/table-responsive.md](docs/table-responsive.md) |
| 49 | **Schede di Navigazione** | Layout | `.periodic-tabs` | [docs/tabs.md](docs/tabs.md) |
| 50 | **Membro del Team** | Moduli | `.periodic-team-member` | [docs/team-member.md](docs/team-member.md) |
| 51 | **Testimonianze** | Moduli | `.periodic-testimonials` | [docs/testimonials.md](docs/testimonials.md) |
| 52 | **Completamento del Testo** | Contenuto | `.periodic-text-completion` | [docs/text-completion.md](docs/text-completion.md) |
| 53 | **Miniatura con Link a PDF** | Media | `.periodic-thumbnail-pdf-link` | [docs/thumbnail-pdf-link.md](docs/thumbnail-pdf-link.md) |
| 54 | **Multipli Link PDF** | Media | `.periodic-thumbnail-pdf-link-multiple` | [docs/thumbnail-pdf-link-multiple.md](docs/thumbnail-pdf-link-multiple.md) |
| 55 | **Cronologia Verticale** | Altro | `.periodic-timeline-vertical` | [docs/timeline-vertical.md](docs/timeline-vertical.md) |
| 56 | **Blocco Titolo e Testo** | Contenuto | `.periodic-title-text-block` | [docs/title-text-block.md](docs/title-text-block.md) |
| 57 | **Argomento con Dati** | Contenuto | `.periodic-topic-text-data` | [docs/topic-text-data.md](docs/topic-text-data.md) |
| 58 | **Argomento con Titolo e Testo** | Contenuto | `.periodic-topic-title-text` | [docs/topic-title-text.md](docs/topic-title-text.md) |
| 59 | **Incorporamento Video** | Media | `.periodic-video-embed` | [docs/video-embed.md](docs/video-embed.md) |
| 60 | **Laboratorio Vocale** | Interattivo | `.periodic-voice-lab` | [docs/voice-lab.md](docs/voice-lab.md) |
| 61 | **Giochi di Parole** | Giochi | `.periodic-word-games` | [docs/word-games.md](docs/word-games.md) |

---

## 🚀 Showroom & Dimostrazione Interattiva

La suite include un catalogo interattivo completo per testare e validare i 61 componenti.

Per avviare lo showroom localmente:
```bash
# Avvia un server web locale nella root del repository
python -m http.server 8080
```
Visita: **`http://localhost:8080/demo/index.html`**

Funzionalità Principali dello Showroom:
- **Ricerca Istantanea**: Trova i componenti per nome, slug o tag in tempo reale.
- **Filtro per Categorie**: Layout, Contenuto, Media, Interattivo, Moduli, Grafici e Giochi.
- **Selettore Multilingue**: Alternanza dinamica tra Italiano, Inglese, Portoghese e Spagnolo.
- **Tema Chiaro / Scuro**: Switch integrato con persistenza in `localStorage`.
- **Modali di Anteprima Live**: Esegui i componenti direttamente all'interno dell'interfaccia.

---

## 🔌 Integrazione con WordPress

Per installare la suite in WordPress:
1. Copia la cartella `luiz0067-periodic` in `/wp-content/plugins/`.
2. Accedi alla dashboard di amministrazione di WordPress $ightarrow$ **Plugin**.
3. Attiva il plugin **Periodic Component Suite**.
4. Tutti i blocchi Gutenberg saranno disponibili sotto la categoria **Periodic Suite**.

---

## 💻 Guida all'Uso Standalone

Usa qualsiasi componente singolarmente nei tuoi progetti frontend (React, Vue, HTML puro o Vite):

```html
<!-- Dipendenze Condivise -->
<link rel="stylesheet" href="shared/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="shared/vendor/fontawesome/css/all.min.css">

<!-- Stili Base Periodic -->
<link rel="stylesheet" href="core/styles/variables.css">
<link rel="stylesheet" href="core/styles/base.css">

<!-- Componente Specifico (es. Breadcrumbs) -->
<link rel="stylesheet" href="components/breadcrumbs/breadcrumbs.css">
<script src="components/breadcrumbs/breadcrumbs.js"></script>

<div id="bricioleDiPane"></div>
<script>
    new PeriodicBreadcrumbs('#bricioleDiPane', [
        { label: 'Home', url: '/' },
        { label: 'Documentazione', active: true }
    ]);
</script>
```

---

## 🛡️ Standard e Convenzioni di Ingegneria

1. **Isolamento BEM**: Ogni componente adotta classi `.periodic-<nome>` e ID `#periodic-<nome>`.
2. **JSDoc in Inglese**: Tutta la documentazione di metodi, parametri e tipi nel codice è rigorosamente in inglese.
3. **Eventi Disaccoppiati**: Comunicazione interna basata sul bus di eventi `Periodic.on()` / `Periodic.emit()`.
4. **Licenza**: GPL-2.0-or-later.
