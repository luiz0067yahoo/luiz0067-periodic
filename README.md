# Periodic Component Suite ⚛️

> **Suíte Unificada de 61 Componentes Frontend e Módulos Modulares**  
> Consolidada sob arquitetura desacoplada, namespace BEM isolado (`.periodic-*`), internacionalização nativa em 4 idiomas (`pt-br`, `en-us`, `es`, `it`), dependências centralizadas e documentação completa em `/docs/`.

---

## 📑 Sumário

- [Visão Geral](#-visão-geral)
- [Arquitetura de Diretórios](#-arquitetura-de-diretórios)
- [Padronização de Dependências](#-padronização-de-dependências)
- [Internacionalização (i18n)](#-internacionalização-i18n)
- [Índice Geral dos 61 Módulos Integrados](#-índice-geral-dos-61-módulos-integrados)
- [Showroom & Demonstração Interativa](#-showroom--demonstração-interativa)
- [Como Utilizar no WordPress](#-como-utilizar-no-wordpress)
- [Guia de Execução Standalone](#-guia-de-execução-standalone)
- [Convenções e Padrões de Código](#-convenções-e-padrões-de-código)

---

## 🌟 Visão Geral

O projeto **Periodic** centraliza 61 repositórios de componentes independentes em um monorepo robusto, profissional e escalável. Cada módulo foi refatorado para eliminar o prefixo legado `luiz0067-`, padronizar identificadores sob `.periodic-*`, remover redundâncias de bibliotecas (como Bootstrap e FontAwesome duplicados em dezenas de repositórios) e fornecer suporte multilíngue nativo em tempo de execução.

---

## 📂 Arquitetura de Diretórios

```text
luiz0067-periodic/
├── components/                       # 61 módulos individuais consolidados
│   ├── accordion/                    # Acordeão responsivo
│   ├── breadcrumbs/                  # Navegação hierárquica com Schema.org
│   ├── counter-stats/                # Contadores animados ao rolar
│   ├── quiz-engine/                  # Motor de testes e avaliações
│   ├── word-games/                   # Jogos educativos de vocabulário
│   └── ... (61 componentes)
├── core/                             # Núcleo compartilhado da suíte
│   ├── i18n/                         # Motor de internacionalização e dicionários
│   │   ├── i18n.js                   # Engine reativa com persistência e eventos
│   │   ├── pt-br.json                # Português (Brasil)
│   │   ├── en-us.json                # Inglês (EUA)
│   │   ├── es.json                   # Espanhol
│   │   └── it.json                   # Italiano
│   ├── js/                           # Orquestrador global e Component Registry
│   │   └── periodic-core.js          # Event bus e auto-inicializador
│   └── styles/                       # Tokens de design e CSS base
│       ├── variables.css             # Cores HSL, modo escuro/claro, sombras
│       └── base.css                  # Utilitários e resets seguros
├── shared/                           # Dependências externas centralizadas
│   └── vendor/
│       ├── bootstrap/                # Bootstrap 5.3 (CSS + Bundle JS)
│       └── fontawesome/              # FontAwesome 6 (CSS + Webfonts)
├── docs/                             # Documentação técnica individual dos 61 módulos
│   ├── accordion.md
│   ├── quiz-engine.md
│   └── ... (61 arquivos .md)
├── demo/                             # Showroom e catálogo interativo
│   ├── index.html                    # Visualizador de componentes com filtros e busca
│   ├── demo.css                      # Estilos do showroom
│   └── demo.js                       # Lógica interativa de preview e troca de idioma
├── doc/                              # Acervo legado de mídias e tutoriais
├── logos/                            # Marcas e logotipos
├── videos/                           # Vídeos demonstrativos nos 4 idiomas
├── periodic.php                      # Loader mestre do WordPress Plugin
└── README.md                         # Guia geral da suíte consolidada
```

---

## 📦 Padronização de Dependências

Anteriormente, dezenas de componentes continham suas próprias cópias de `bootstrap.min.css` e `all.min.css`. Na suíte Periodic:
- Todas as dependências externas foram unificadas em `/shared/vendor/`.
- Cada componente individual consome os assets globais compartilhados, eliminando centenas de megabytes em redundâncias e evitando conflitos de estilos.
- O arquivo `periodic.php` registra os scripts no WordPress apenas uma vez (`wp_enqueue_scripts`), garantindo carregamento ordenado e alta pontuação no Google Core Web Vitals.

---

## 🌐 Internacionalização (i18n)

A suíte possui um motor de i18n reativo em `core/i18n/i18n.js` com dicionários simétricos para **4 idiomas**:
1. 🇧🇷 `pt-br` (Português do Brasil)
2. 🇺🇸 `en-us` (Inglês)
3. 🇪🇸 `es` (Espanhol)
4. 🇮🇹 `it` (Italiano)

### Uso Declarativo no HTML:
```html
<h2 data-i18n="components.accordion.title">Menu Retrátil</h2>
<p data-i18n="components.accordion.description">Descrição...</p>
<input type="text" data-i18n-placeholder="ui.search_placeholder" />
```

### Uso Programático em JavaScript:
```javascript
// Alterar idioma dinamicamente sem recarregar a página
Periodic.i18n.setLocale('en-us');

// Obter tradução
const label = Periodic.i18n.t('ui.view_doc'); // "View Documentation"
```

---

## 📋 Índice Geral dos 61 Módulos Integrados

| # | Módulo | Categoria | Namespace BEM | Documentação |
|---|---|---|---|---|
| 1 | **Accordion** | Layout | `.periodic-accordion` | [docs/accordion.md](docs/accordion.md) |
| 2 | **Ad Banner** | Interatividade | `.periodic-ad-banner` | [docs/ad-banner.md](docs/ad-banner.md) |
| 3 | **Advanced Banner** | Interatividade | `.periodic-advanced-banner` | [docs/advanced-banner.md](docs/advanced-banner.md) |
| 4 | **Advanced Spacer** | Layout | `.periodic-advanced-spacer` | [docs/advanced-spacer.md](docs/advanced-spacer.md) |
| 5 | **Alert Callout** | Conteúdo | `.periodic-alert-callout` | [docs/alert-callout.md](docs/alert-callout.md) |
| 6 | **Audio Embed** | Mídia | `.periodic-audio-embed` | [docs/audio-embed.md](docs/audio-embed.md) |
| 7 | **Big Button** | Interatividade | `.periodic-big-button` | [docs/big-button.md](docs/big-button.md) |
| 8 | **Breadcrumbs** | Conteúdo | `.periodic-breadcrumbs` | [docs/breadcrumbs.md](docs/breadcrumbs.md) |
| 9 | **Buttons Banner** | Interatividade | `.periodic-buttons-banner` | [docs/buttons-banner.md](docs/buttons-banner.md) |
| 10 | **Card Trainer** | Interatividade | `.periodic-card-trainer` | [docs/card-trainer.md](docs/card-trainer.md) |
| 11 | **Card Wrapper** | Layout | `.periodic-card-wrapper` | [docs/card-wrapper.md](docs/card-wrapper.md) |
| 12 | **Carousel Slides** | Interatividade | `.periodic-carousel-slides` | [docs/carousel-slides.md](docs/carousel-slides.md) |
| 13 | **Carousel Slides Plus** | Interatividade | `.periodic-carousel-plus` | [docs/carousel-slides-plus.md](docs/carousel-slides-plus.md) |
| 14 | **Code Block** | Conteúdo | `.periodic-code` | [docs/code.md](docs/code.md) |
| 15 | **Cols Image** | Mídia | `.periodic-cols-image` | [docs/cols-image.md](docs/cols-image.md) |
| 16 | **Counter Stats** | Interatividade | `.periodic-counter-stats` | [docs/counter-stats.md](docs/counter-stats.md) |
| 17 | **Custom Shapes** | Conteúdo | `.periodic-custom-shapes` | [docs/custom-shapes.md](docs/custom-shapes.md) |
| 18 | **Date Title Link** | Conteúdo | `.periodic-date-title-link` | [docs/date-title-link.md](docs/date-title-link.md) |
| 19 | **Date Title Link File Upload** | Conteúdo | `.periodic-date-title-link-file-upload` | [docs/date-title-link-file-upload.md](docs/date-title-link-file-upload.md) |
| 20 | **Destack Buttons** | Interatividade | `.periodic-destack-buttons` | [docs/destack-buttons.md](docs/destack-buttons.md) |
| 21 | **Drag & Drop Engine** | Interatividade | `.periodic-drag-drop-engine` | [docs/drag-drop-engine.md](docs/drag-drop-engine.md) |
| 22 | **FAQ Schema** | Formulários | `.periodic-faq-schema` | [docs/faq-schema.md](docs/faq-schema.md) |
| 23 | **Form Builder** | Formulários | `.periodic-form-builder` | [docs/form-builder.md](docs/form-builder.md) |
| 24 | **Gallery Lightbox** | Mídia | `.periodic-gallery-lightbox` | [docs/gallery-lightbox.md](docs/gallery-lightbox.md) |
| 25 | **Grafic Line Bar** | Gráficos | `.periodic-grafic-line-bar` | [docs/grafic-line-bar.md](docs/grafic-line-bar.md) |
| 26 | **Grafic Pizza** | Gráficos | `.periodic-grafic-pizza` | [docs/grafic-pizza.md](docs/grafic-pizza.md) |
| 27 | **Grafic Torus** | Gráficos | `.periodic-grafic-torus` | [docs/grafic-torus.md](docs/grafic-torus.md) |
| 28 | **Grid Flex** | Layout | `.periodic-grid-flex` | [docs/grid-flex.md](docs/grid-flex.md) |
| 29 | **Icons** | Conteúdo | `.periodic-icon` | [docs/icons.md](docs/icons.md) |
| 30 | **Image Destaque** | Mídia | `.periodic-image-destaque` | [docs/image-destaque.md](docs/image-destaque.md) |
| 31 | **Image Editor** | Mídia | `.periodic-image-editor` | [docs/image-editor.md](docs/image-editor.md) |
| 32 | **Image Only** | Mídia | `.periodic-image-only` | [docs/image-only.md](docs/image-only.md) |
| 33 | **Interactive Utilities** | Interatividade | `.periodic-interactive-utilities` | [docs/interactive-utilities.md](docs/interactive-utilities.md) |
| 34 | **Interactive Software Simulator** | Interatividade | `.periodic-software-simulator` | [docs/interative-software-simulator.md](docs/interative-software-simulator.md) |
| 35 | **Maps** | Formulários | `.periodic-maps` | [docs/maps.md](docs/maps.md) |
| 36 | **Media Hotspot** | Mídia | `.periodic-media-hotspot` | [docs/media-hotspot.md](docs/media-hotspot.md) |
| 37 | **Modal Popup** | Interatividade | `.periodic-modal-popup` | [docs/modal-popup.md](docs/modal-popup.md) |
| 38 | **Parallax Section** | Layout | `.periodic-parallax-section` | [docs/parallax-section.md](docs/parallax-section.md) |
| 39 | **PDF Flipbook** | Mídia | `.periodic-pdf-flipbook` | [docs/pdf-flipbook.md](docs/pdf-flipbook.md) |
| 40 | **Pricing Table** | Formulários | `.periodic-pricing-table` | [docs/pricing-table.md](docs/pricing-table.md) |
| 41 | **Quiz Engine** | Jogos | `.periodic-quiz-engine` | [docs/quiz-engine.md](docs/quiz-engine.md) |
| 42 | **Scroll Top** | Interatividade | `.periodic-scroll-top` | [docs/scroll-top.md](docs/scroll-top.md) |
| 43 | **Section Container** | Layout | `.periodic-section-container` | [docs/section-container.md](docs/section-container.md) |
| 44 | **Separator** | Layout | `.periodic-separator` | [docs/separator.md](docs/separator.md) |
| 45 | **Smart Essay** | Conteúdo | `.periodic-smart-essay` | [docs/smart-essay.md](docs/smart-essay.md) |
| 46 | **Structured Writing** | Conteúdo | `.periodic-structured-writing` | [docs/structured-writing.md](docs/structured-writing.md) |
| 47 | **Table of Contents** | Layout | `.periodic-table-of-contents` | [docs/table-of-contents.md](docs/table-of-contents.md) |
| 48 | **Table Responsive** | Layout | `.periodic-table-responsive` | [docs/table-responsive.md](docs/table-responsive.md) |
| 49 | **Tabs** | Layout | `.periodic-tabs` | [docs/tabs.md](docs/tabs.md) |
| 50 | **Team Member** | Formulários | `.periodic-team-member` | [docs/team-member.md](docs/team-member.md) |
| 51 | **Testimonials** | Formulários | `.periodic-testimonials` | [docs/testimonials.md](docs/testimonials.md) |
| 52 | **Text Completion** | Conteúdo | `.periodic-text-completion` | [docs/text-completion.md](docs/text-completion.md) |
| 53 | **Thumbnail PDF Link** | Mídia | `.periodic-thumbnail-pdf-link` | [docs/thumbnail-pdf-link.md](docs/thumbnail-pdf-link.md) |
| 54 | **Thumbnail PDF Link Multiple** | Mídia | `.periodic-thumbnail-pdf-link-multiple` | [docs/thumbnail-pdf-link-multiple.md](docs/thumbnail-pdf-link-multiple.md) |
| 55 | **Timeline Vertical** | Conteúdo | `.periodic-timeline-vertical` | [docs/timeline-vertical.md](docs/timeline-vertical.md) |
| 56 | **Title Text Block** | Conteúdo | `.periodic-title-text-block` | [docs/title-text-block.md](docs/title-text-block.md) |
| 57 | **Topic Text Data** | Conteúdo | `.periodic-topic-text-data` | [docs/topic-text-data.md](docs/topic-text-data.md) |
| 58 | **Topic Title Text** | Conteúdo | `.periodic-topic-title-text` | [docs/topic-title-text.md](docs/topic-title-text.md) |
| 59 | **Video Embed** | Mídia | `.periodic-video-embed` | [docs/video-embed.md](docs/video-embed.md) |
| 60 | **Voice Lab** | Interatividade | `.periodic-voice-lab` | [docs/voice-lab.md](docs/voice-lab.md) |
| 61 | **Word Games** | Jogos | `.periodic-word-game` | [docs/word-games.md](docs/word-games.md) |

---

## 🚀 Showroom & Demonstração Interativa

A suíte inclui um catálogo interativo completo para testar e validar os 61 componentes.

Para abrir o showroom localmente:
```bash
# Iniciar um servidor local no diretório raiz
python -m http.server 8080
```
Acesse no seu navegador: **`http://localhost:8080/demo/index.html`**

Recursos do Showroom:
- **Busca Instantânea**: Localize qualquer componente por nome, slug ou tag.
- **Filtro por Categorias**: Layout, Conteúdo, Mídia, Interatividade, Formulários, Gráficos e Jogos.
- **Seletor Multilíngue**: Alterne em tempo real entre Português, Inglês, Espanhol e Italiano.
- **Modo Escuro / Claro**: Alternância com persistência em `localStorage`.
- **Modais de Pré-visualização**: Execute componentes diretamente na interface.

---

## 🔌 Como Utilizar no WordPress

Para utilizar a suíte completa no WordPress:
1. Copie a pasta `luiz0067-periodic` para o diretório `/wp-content/plugins/`.
2. Acesse o painel administrativo do WordPress $\rightarrow$ **Plugins**.
3. Ative o plugin **Periodic Component Suite**.
4. Todos os blocos Gutenberg estarão disponíveis sob a categoria **Periodic Suite**.

---

## 💻 Guia de Execução Standalone

Você pode utilizar qualquer componente isoladamente em seus projetos frontend tradicionais (React, Vue, HTML puro, Vite):

```html
<!-- Dependências Compartilhadas -->
<link rel="stylesheet" href="shared/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="shared/vendor/fontawesome/css/all.min.css">

<!-- Core Periodic -->
<link rel="stylesheet" href="core/styles/variables.css">
<link rel="stylesheet" href="core/styles/base.css">

<!-- Componente Específico (exemplo: Breadcrumbs) -->
<link rel="stylesheet" href="components/breadcrumbs/breadcrumbs.css">
<script src="components/breadcrumbs/breadcrumbs.js"></script>

<div id="meuBreadcrumb"></div>
<script>
    new PeriodicBreadcrumbs('#meuBreadcrumb', [
        { label: 'Início', url: '/' },
        { label: 'Documentação', active: true }
    ]);
</script>
```

---

## 🛡️ Convenções e Padrões de Código

1. **Namespaces Isolados**: Todo componente utiliza a nomenclatura `.periodic-<nome>` para classes CSS e `#periodic-<nome>` para IDs.
2. **JSDoc**: Todos os arquivos JavaScript incluem documentação estrita de parâmetros, tipos e retornos.
3. **Sem Poluição de Escopo Global**: Eventos utilizam o barramento pub/sub isolado `Periodic.on()` / `Periodic.emit()`.
4. **Licença**: GPL-2.0-or-later.
