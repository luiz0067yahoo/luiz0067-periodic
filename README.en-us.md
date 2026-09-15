# Periodic Component Suite ⚛️


[English](README.md) • [Português (BR)](README.pt-br.md) • [Español](README.es.md) • [Italiano](README.it.md)


> **Unified Suite of 61 Frontend Components & Modular Blocks**  
> Built with decoupled architecture, isolated BEM namespace (`.periodic-*`), native internationalization across 4 languages (`en-us`, `pt-br`, `es`, `it`), centralized shared dependencies, and exhaustive documentation in `/docs/`.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Directory Architecture](#-directory-architecture)
- [Centralized Dependencies](#-centralized-dependencies)
- [Internationalization (i18n)](#-internationalization-i18n)
- [Complete Index of the 61 Integrated Modules](#-complete-index-of-the-61-integrated-modules)
- [Showroom & Interactive Demo](#-showroom--interactive-demo)
- [WordPress Integration Guide](#-wordpress-integration-guide)
- [Standalone Usage Guide](#-standalone-usage-guide)
- [Engineering Standards & Conventions](#-engineering-standards--conventions)

---

## 🌟 Overview

The **Periodic** project consolidates 61 independent component repositories into a single performant, scalable monorepo. Every module has been systematically refactored to remove the legacy `luiz0067-` prefix, standardize classes and IDs under `.periodic-*`, eliminate external library duplications (such as repeated Bootstrap and FontAwesome bundles), and provide runtime multilingual reactivity.

---

## 📂 Directory Architecture

```text
luiz0067-periodic/
├── components/                       # 61 consolidated individual modules
│   ├── accordion/                    # Responsive collapsible accordion
│   ├── breadcrumbs/                  # Hierarchical Schema.org breadcrumbs
│   ├── counter-stats/                # Scroll-triggered animated tickers
│   ├── quiz-engine/                  # Interactive exam and quiz engine
│   ├── word-games/                   # Educational vocabulary puzzles
│   └── ... (61 components)
├── core/                             # Shared framework kernel
│   ├── i18n/                         # Internationalization engine & dictionaries
│   │   ├── i18n.js                   # Reactive engine with DOM binding and events
│   │   ├── translations.js           # Synchronous embedded dictionary fallback
│   │   ├── en-us.json                # English (US)
│   │   ├── pt-br.json                # Portuguese (Brazil)
│   │   ├── es.json                   # Spanish
│   │   └── it.json                   # Italian
│   ├── js/                           # Global orchestrator & component registry
│   │   └── periodic-core.js          # Event bus and declarative auto-initializer
│   └── styles/                       # Design system tokens and scoped resets
│       ├── variables.css             # HSL color system, dark/light theme, elevation
│       └── base.css                  # Safe resets and shared utilities
├── shared/                           # Centralized external vendor dependencies
│   └── vendor/
│       ├── bootstrap/                # Bootstrap 5.3 (CSS + JS bundle)
│       └── fontawesome/              # FontAwesome 6 (CSS + Webfonts)
├── docs/                             # Exhaustive technical documentation (61 files)
│   ├── accordion.md
│   ├── quiz-engine.md
│   └── ... (61 .md files)
├── demo/                             # Interactive showroom and test catalog
│   ├── index.html                    # Component visualizer with search and filters
│   ├── demo.css                      # Showroom UI styling
│   └── demo.js                       # Multilingual switcher and modal preview controller
├── periodic.php                      # Master WordPress plugin loader
└── README.md                         # Primary documentation index
```

---

## 📦 Centralized Dependencies

Previously, dozens of standalone modules shipped with isolated copies of Bootstrap and FontAwesome:
- All external dependencies are now centralized in `/shared/vendor/`.
- Individual components leverage shared vendor assets, preventing version drift and CSS specificity collisions.
- The `periodic.php` WordPress loader enqueues libraries only once (`wp_enqueue_scripts`), guaranteeing optimal performance and high Google Core Web Vitals scores.

---

## 🌐 Internationalization (i18n)

The suite provides a zero-dependency reactive i18n engine in `core/i18n/i18n.js` with symmetric translation keys across **4 languages**:
1. 🇺🇸 `en-us` (English - US)
2. 🇧🇷 `pt-br` (Portuguese - Brazil)
3. 🇪🇸 `es` (Spanish)
4. 🇮🇹 `it` (Italian)

### Declarative DOM Usage:
```html
<h2 data-i18n="components.accordion.title">Accordion</h2>
<p data-i18n="components.accordion.description">Description...</p>
<input type="text" data-i18n-placeholder="ui.search_placeholder" />
```

### Programmatic JavaScript Usage:
```javascript
// Switch locale at runtime without page reload
Periodic.i18n.setLocale('en-us');

// Get translation string
const label = Periodic.i18n.t('ui.view_doc'); // "View Documentation"
```

---

## 📋 Complete Index of the 61 Integrated Modules

| # | Module | Category | BEM Namespace | Documentation |
|---|---|---|---|---|
| 1 | **Accordion** | Layout | `.periodic-accordion` | [docs/accordion.md](docs/accordion.md) |
| 2 | **Ad Banner** | Interactive | `.periodic-ad-banner` | [docs/ad-banner.md](docs/ad-banner.md) |
| 3 | **Advanced Banner** | Interactive | `.periodic-advanced-banner` | [docs/advanced-banner.md](docs/advanced-banner.md) |
| 4 | **Advanced Spacer** | Layout | `.periodic-advanced-spacer` | [docs/advanced-spacer.md](docs/advanced-spacer.md) |
| 5 | **Alert Callout** | Content | `.periodic-alert-callout` | [docs/alert-callout.md](docs/alert-callout.md) |
| 6 | **Audio Embed** | Media | `.periodic-audio-embed` | [docs/audio-embed.md](docs/audio-embed.md) |
| 7 | **Big Button** | Interactive | `.periodic-big-button` | [docs/big-button.md](docs/big-button.md) |
| 8 | **Breadcrumbs** | Content | `.periodic-breadcrumbs` | [docs/breadcrumbs.md](docs/breadcrumbs.md) |
| 9 | **Buttons Banner** | Interactive | `.periodic-buttons-banner` | [docs/buttons-banner.md](docs/buttons-banner.md) |
| 10 | **Card Trainer** | Interactive | `.periodic-card-trainer` | [docs/card-trainer.md](docs/card-trainer.md) |
| 11 | **Card Wrapper** | Layout | `.periodic-card-wrapper` | [docs/card-wrapper.md](docs/card-wrapper.md) |
| 12 | **Carousel Slides** | Interactive | `.periodic-carousel-slides` | [docs/carousel-slides.md](docs/carousel-slides.md) |
| 13 | **Carousel Slides Plus** | Interactive | `.periodic-carousel-slides-plus` | [docs/carousel-slides-plus.md](docs/carousel-slides-plus.md) |
| 14 | **Code Block** | Content | `.periodic-code` | [docs/code.md](docs/code.md) |
| 15 | **Columns Image** | Media | `.periodic-cols-image` | [docs/cols-image.md](docs/cols-image.md) |
| 16 | **Counter Stats** | Interactive | `.periodic-counter-stats` | [docs/counter-stats.md](docs/counter-stats.md) |
| 17 | **Custom Shapes** | Content | `.periodic-custom-shapes` | [docs/custom-shapes.md](docs/custom-shapes.md) |
| 18 | **Date Title Link** | Content | `.periodic-date-title-link` | [docs/date-title-link.md](docs/date-title-link.md) |
| 19 | **Date Title Link & Upload** | Content | `.periodic-date-title-link-file-upload` | [docs/date-title-link-file-upload.md](docs/date-title-link-file-upload.md) |
| 20 | **Featured Buttons** | Interactive | `.periodic-destack-buttons` | [docs/destack-buttons.md](docs/destack-buttons.md) |
| 21 | **Drag & Drop Engine** | Interactive | `.periodic-drag-drop-engine` | [docs/drag-drop-engine.md](docs/drag-drop-engine.md) |
| 22 | **FAQ Schema** | Forms & Business | `.periodic-faq-schema` | [docs/faq-schema.md](docs/faq-schema.md) |
| 23 | **Form Builder** | Forms & Business | `.periodic-form-builder` | [docs/form-builder.md](docs/form-builder.md) |
| 24 | **Gallery Lightbox** | Media | `.periodic-gallery-lightbox` | [docs/gallery-lightbox.md](docs/gallery-lightbox.md) |
| 25 | **Line & Bar Charts** | Charts & Data | `.periodic-grafic-line-bar` | [docs/grafic-line-bar.md](docs/grafic-line-bar.md) |
| 26 | **Pie Chart** | Charts & Data | `.periodic-grafic-pizza` | [docs/grafic-pizza.md](docs/grafic-pizza.md) |
| 27 | **Donut (Torus) Chart** | Charts & Data | `.periodic-grafic-torus` | [docs/grafic-torus.md](docs/grafic-torus.md) |
| 28 | **Grid Flex** | Layout | `.periodic-grid-flex` | [docs/grid-flex.md](docs/grid-flex.md) |
| 29 | **Icons & Vectors** | Other | `.periodic-icons` | [docs/icons.md](docs/icons.md) |
| 30 | **Featured Image** | Media | `.periodic-image-destaque` | [docs/image-destaque.md](docs/image-destaque.md) |
| 31 | **Image Editor** | Media | `.periodic-image-editor` | [docs/image-editor.md](docs/image-editor.md) |
| 32 | **Image Only** | Media | `.periodic-image-only` | [docs/image-only.md](docs/image-only.md) |
| 33 | **Interactive Utilities** | Interactive | `.periodic-interactive-utilities` | [docs/interactive-utilities.md](docs/interactive-utilities.md) |
| 34 | **Software Simulator** | Interactive | `.periodic-interative-software-simulator` | [docs/interative-software-simulator.md](docs/interative-software-simulator.md) |
| 35 | **Interactive Maps** | Forms & Business | `.periodic-maps` | [docs/maps.md](docs/maps.md) |
| 36 | **Media Hotspot** | Media | `.periodic-media-hotspot` | [docs/media-hotspot.md](docs/media-hotspot.md) |
| 37 | **Modal Popup** | Interactive | `.periodic-modal-popup` | [docs/modal-popup.md](docs/modal-popup.md) |
| 38 | **Parallax Section** | Layout | `.periodic-parallax-section` | [docs/parallax-section.md](docs/parallax-section.md) |
| 39 | **PDF Flipbook** | Media | `.periodic-pdf-flipbook` | [docs/pdf-flipbook.md](docs/pdf-flipbook.md) |
| 40 | **Pricing Table** | Forms & Business | `.periodic-pricing-table` | [docs/pricing-table.md](docs/pricing-table.md) |
| 41 | **Quiz Engine** | Games & Education | `.periodic-quiz-engine` | [docs/quiz-engine.md](docs/quiz-engine.md) |
| 42 | **Scroll to Top** | Interactive | `.periodic-scroll-top` | [docs/scroll-top.md](docs/scroll-top.md) |
| 43 | **Section Container** | Layout | `.periodic-section-container` | [docs/section-container.md](docs/section-container.md) |
| 44 | **Separator & Divider** | Layout | `.periodic-separator` | [docs/separator.md](docs/separator.md) |
| 45 | **Smart Essay** | Content | `.periodic-smart-essay` | [docs/smart-essay.md](docs/smart-essay.md) |
| 46 | **Structured Writing** | Content | `.periodic-structured-writing` | [docs/structured-writing.md](docs/structured-writing.md) |
| 47 | **Table of Contents** | Layout | `.periodic-table-of-contents` | [docs/table-of-contents.md](docs/table-of-contents.md) |
| 48 | **Responsive Table** | Layout | `.periodic-table-responsive` | [docs/table-responsive.md](docs/table-responsive.md) |
| 49 | **Navigation Tabs** | Layout | `.periodic-tabs` | [docs/tabs.md](docs/tabs.md) |
| 50 | **Team Member** | Forms & Business | `.periodic-team-member` | [docs/team-member.md](docs/team-member.md) |
| 51 | **Testimonials** | Forms & Business | `.periodic-testimonials` | [docs/testimonials.md](docs/testimonials.md) |
| 52 | **Text Completion** | Content | `.periodic-text-completion` | [docs/text-completion.md](docs/text-completion.md) |
| 53 | **PDF Thumbnail Link** | Media | `.periodic-thumbnail-pdf-link` | [docs/thumbnail-pdf-link.md](docs/thumbnail-pdf-link.md) |
| 54 | **Multiple PDF Links** | Media | `.periodic-thumbnail-pdf-link-multiple` | [docs/thumbnail-pdf-link-multiple.md](docs/thumbnail-pdf-link-multiple.md) |
| 55 | **Vertical Timeline** | Other | `.periodic-timeline-vertical` | [docs/timeline-vertical.md](docs/timeline-vertical.md) |
| 56 | **Title & Text Block** | Content | `.periodic-title-text-block` | [docs/title-text-block.md](docs/title-text-block.md) |
| 57 | **Topic Text & Data** | Content | `.periodic-topic-text-data` | [docs/topic-text-data.md](docs/topic-text-data.md) |
| 58 | **Topic Title & Text** | Content | `.periodic-topic-title-text` | [docs/topic-title-text.md](docs/topic-title-text.md) |
| 59 | **Video Embed** | Media | `.periodic-video-embed` | [docs/video-embed.md](docs/video-embed.md) |
| 60 | **Voice Lab** | Interactive | `.periodic-voice-lab` | [docs/voice-lab.md](docs/voice-lab.md) |
| 61 | **Word Games** | Games & Education | `.periodic-word-games` | [docs/word-games.md](docs/word-games.md) |

---

## 🚀 Showroom & Interactive Demo

The suite features an interactive test bench to preview and inspect all 61 components.

To launch the showroom locally:
```bash
# Start a local web server from the repository root
python -m http.server 8080
```
Navigate to: **`http://localhost:8080/demo/index.html`**

Key Showroom Features:
- **Instant Search**: Find components by name, slug, or category in real time.
- **Category Filter**: Layout, Content, Media, Interactive, Forms, Charts, and Games.
- **Multilingual Switcher**: Instant live translation between EN, PT-BR, ES, and IT.
- **Dark / Light Theme**: Seamless theme toggle with `localStorage` persistence.
- **Live Preview Modals**: Test components directly inside modal dialogs.

---

## 🔌 WordPress Integration Guide

To install the complete suite as a WordPress plugin:
1. Copy the `luiz0067-periodic` folder into `/wp-content/plugins/`.
2. Navigate to your WordPress Admin $ightarrow$ **Plugins**.
3. Activate **Periodic Component Suite**.
4. All Gutenberg blocks will appear under the **Periodic Suite** block category.

---

## 💻 Standalone Usage Guide

Use any component independently in vanilla HTML, React, Vue, or Vite workflows:

```html
<!-- Centralized Vendor Assets -->
<link rel="stylesheet" href="shared/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="shared/vendor/fontawesome/css/all.min.css">

<!-- Periodic Core Styles -->
<link rel="stylesheet" href="core/styles/variables.css">
<link rel="stylesheet" href="core/styles/base.css">

<!-- Component Assets (e.g. Breadcrumbs) -->
<link rel="stylesheet" href="components/breadcrumbs/breadcrumbs.css">
<script src="components/breadcrumbs/breadcrumbs.js"></script>

<div id="breadcrumbTrail"></div>
<script>
    new PeriodicBreadcrumbs('#breadcrumbTrail', [
        { label: 'Home', url: '/' },
        { label: 'Documentation', active: true }
    ]);
</script>
```

---

## 🛡️ Engineering Standards & Conventions

1. **Strict Scoping**: Every component enforces `.periodic-<name>` CSS classes and `#periodic-<name>` IDs.
2. **JSDoc Documentation**: All JavaScript methods, parameters, and return types are documented in English.
3. **Collision-Free Events**: Internal component communication uses the isolated event bus `Periodic.on()` / `Periodic.emit()`.
4. **License**: GPL-2.0-or-later.
