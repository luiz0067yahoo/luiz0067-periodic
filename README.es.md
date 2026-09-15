# Suite de Componentes Periodic ⚛️


[English](README.md) • [Português (BR)](README.pt-br.md) • [Español](README.es.md) • [Italiano](README.it.md)


> **Suite Unificada de 61 Componentes Frontend y Módulos Modulares**  
> Desarrollada con arquitectura desacoplada, espacio de nombres BEM aislado (`.periodic-*`), internacionalización nativa en 4 idiomas (`es`, `en-us`, `pt-br`, `it`), dependencias compartidas centralizadas y documentación exhaustiva en `/docs/`.

---

## 📑 Tabla de Contenidos

- [Visión General](#-visión-general)
- [Arquitectura de Directorios](#-arquitectura-de-directorios)
- [Centralización de Dependencias](#-centralización-de-dependencias)
- [Internacionalización (i18n)](#-internacionalización-i18n)
- [Índice General de los 61 Módulos Integrados](#-índice-general-de-los-61-módulos-integrados)
- [Showroom & Demostración Interactiva](#-showroom--demostración-interactiva)
- [Guía de Integración con WordPress](#-guía-de-integración-con-wordpress)
- [Guía de Uso Standalone](#-guía-de-uso-standalone)
- [Estándares y Convenciones de Ingeniería](#-estándares-y-convenciones-de-ingeniería)

---

## 🌟 Visión General

El proyecto **Periodic** consolida 61 repositorios de componentes independientes en un monorepo robusto, escalable y de alto rendimiento. Cada módulo ha sido sistemáticamente refactorizado para eliminar el prefijo heredado `luiz0067-`, estandarizar clases e IDs bajo `.periodic-*`, eliminar duplicaciones de bibliotecas externas (como Bootstrap y FontAwesome repetidos en docenas de repositorios) y brindar reactividad multilingüe nativa en tiempo de ejecución.

---

## 📂 Arquitectura de Directorios

```text
luiz0067-periodic/
├── components/                       # 61 módulos individuales consolidados
│   ├── accordion/                    # Acordeón responsivo plegable
│   ├── breadcrumbs/                  # Migas de pan jerárquicas con Schema.org
│   ├── counter-stats/                # Contadores animados al hacer scroll
│   ├── quiz-engine/                  # Motor de exámenes y cuestionarios interactivos
│   ├── word-games/                   # Juegos educativos de vocabulario
│   └── ... (61 componentes)
├── core/                             # Núcleo compartido de la suite
│   ├── i18n/                         # Motor de internacionalización y diccionarios
│   │   ├── i18n.js                   # Motor reactivo con enlaces al DOM y eventos
│   │   ├── translations.js           # Fallback síncrono para protocolo file://
│   │   ├── es.json                   # Español
│   │   ├── en-us.json                # Inglés (EE.UU.)
│   │   ├── pt-br.json                # Portugués (Brasil)
│   │   └── it.json                   # Italiano
│   ├── js/                           # Orquestador global y registro de componentes
│   │   └── periodic-core.js          # Bus de eventos e inicializador automático
│   └── styles/                       # Tokens de diseño y CSS base aislado
│       ├── variables.css             # Sistema de colores HSL, tema oscuro/claro
│       └── base.css                  # Resets seguros y utilidades compartidas
├── shared/                           # Dependencias externas centralizadas
│   └── vendor/
│       ├── bootstrap/                # Bootstrap 5.3 (CSS + JS bundle)
│       └── fontawesome/              # FontAwesome 6 (CSS + Fuentes web)
├── docs/                             # Documentación técnica individual (61 archivos)
│   ├── accordion.md
│   ├── quiz-engine.md
│   └── ... (61 archivos .md)
├── demo/                             # Showroom y catálogo interactivo
│   ├── index.html                    # Visualizador de componentes con filtros y búsqueda
│   ├── demo.css                      # Estilos de la interfaz del showroom
│   └── demo.js                       # Controlador de vista previa y cambio de idioma
├── periodic.php                      # Cargador maestro del plugin de WordPress
└── README.md                         # Índice general de documentación
```

---

## 📦 Centralización de Dependencias

Anteriormente, decenas de módulos incluían copias aisladas de Bootstrap y FontAwesome:
- Todas las bibliotecas externas se centralizan ahora en `/shared/vendor/`.
- Los componentes individuales consumen activos compartidos, eliminando redundancias y evitando colisiones de especificidad CSS.
- El cargador `periodic.php` encola los recursos en WordPress una sola vez (`wp_enqueue_scripts`), garantizando un rendimiento óptimo en Core Web Vitals.

---

## 🌐 Internacionalización (i18n)

La suite cuenta con un motor reactivo de internacionalización en `core/i18n/i18n.js` con claves de traducción simétricas para **4 idiomas**:
1. 🇪🇸 `es` (Español)
2. 🇺🇸 `en-us` (Inglés)
3. 🇧🇷 `pt-br` (Portugués)
4. 🇮🇹 `it` (Italiano)

### Uso Declarativo en HTML:
```html
<h2 data-i18n="components.accordion.title">Acordeón</h2>
<p data-i18n="components.accordion.description">Descripción...</p>
<input type="text" data-i18n-placeholder="ui.search_placeholder" />
```

### Uso Programático en JavaScript:
```javascript
// Cambiar de idioma en tiempo de ejecución sin recargar la página
Periodic.i18n.setLocale('es');

// Obtener traducción
const label = Periodic.i18n.t('ui.view_doc'); // "Ver Documentación"
```

---

## 📋 Índice General de los 61 Módulos Integrados

| # | Módulo | Categoría | Espacio de Nombres BEM | Documentación |
|---|---|---|---|---|
| 1 | **Acordeón** | Diseño | `.periodic-accordion` | [docs/accordion.md](docs/accordion.md) |
| 2 | **Banner Publicitario** | Interactivo | `.periodic-ad-banner` | [docs/ad-banner.md](docs/ad-banner.md) |
| 3 | **Banner Avanzado** | Interactivo | `.periodic-advanced-banner` | [docs/advanced-banner.md](docs/advanced-banner.md) |
| 4 | **Espaciador Avanzado** | Diseño | `.periodic-advanced-spacer` | [docs/advanced-spacer.md](docs/advanced-spacer.md) |
| 5 | **Alerta y Cuadro** | Contenido | `.periodic-alert-callout` | [docs/alert-callout.md](docs/alert-callout.md) |
| 6 | **Reproductor de Audio** | Medios | `.periodic-audio-embed` | [docs/audio-embed.md](docs/audio-embed.md) |
| 7 | **Gran Botón** | Interactivo | `.periodic-big-button` | [docs/big-button.md](docs/big-button.md) |
| 8 | **Miga de Pan** | Contenido | `.periodic-breadcrumbs` | [docs/breadcrumbs.md](docs/breadcrumbs.md) |
| 9 | **Banner de Botones** | Interactivo | `.periodic-buttons-banner` | [docs/buttons-banner.md](docs/buttons-banner.md) |
| 10 | **Entrenador con Tarjetas** | Interactivo | `.periodic-card-trainer` | [docs/card-trainer.md](docs/card-trainer.md) |
| 11 | **Contenedor de Tarjeta** | Diseño | `.periodic-card-wrapper` | [docs/card-wrapper.md](docs/card-wrapper.md) |
| 12 | **Carrusel de Diapositivas** | Interactivo | `.periodic-carousel-slides` | [docs/carousel-slides.md](docs/carousel-slides.md) |
| 13 | **Carrusel Slides Plus** | Interactivo | `.periodic-carousel-slides-plus` | [docs/carousel-slides-plus.md](docs/carousel-slides-plus.md) |
| 14 | **Bloque de Código** | Contenido | `.periodic-code` | [docs/code.md](docs/code.md) |
| 15 | **Columnas de Imágenes** | Medios | `.periodic-cols-image` | [docs/cols-image.md](docs/cols-image.md) |
| 16 | **Contador Estadístico** | Interactivo | `.periodic-counter-stats` | [docs/counter-stats.md](docs/counter-stats.md) |
| 17 | **Formas Personalizadas** | Contenido | `.periodic-custom-shapes` | [docs/custom-shapes.md](docs/custom-shapes.md) |
| 18 | **Fecha, Título y Enlace** | Contenido | `.periodic-date-title-link` | [docs/date-title-link.md](docs/date-title-link.md) |
| 19 | **Enlace con Carga de Archivo** | Contenido | `.periodic-date-title-link-file-upload` | [docs/date-title-link-file-upload.md](docs/date-title-link-file-upload.md) |
| 20 | **Botones Destacados** | Interactivo | `.periodic-destack-buttons` | [docs/destack-buttons.md](docs/destack-buttons.md) |
| 21 | **Motor de Arrastrar y Soltar** | Interactivo | `.periodic-drag-drop-engine` | [docs/drag-drop-engine.md](docs/drag-drop-engine.md) |
| 22 | **Preguntas Frecuentes (FAQ)** | Formularios | `.periodic-faq-schema` | [docs/faq-schema.md](docs/faq-schema.md) |
| 23 | **Constructor de Formularios** | Formularios | `.periodic-form-builder` | [docs/form-builder.md](docs/form-builder.md) |
| 24 | **Galería con Lightbox** | Medios | `.periodic-gallery-lightbox` | [docs/gallery-lightbox.md](docs/gallery-lightbox.md) |
| 25 | **Gráfico de Líneas y Barras** | Gráficos | `.periodic-grafic-line-bar` | [docs/grafic-line-bar.md](docs/grafic-line-bar.md) |
| 26 | **Gráfico Circular** | Gráficos | `.periodic-grafic-pizza` | [docs/grafic-pizza.md](docs/grafic-pizza.md) |
| 27 | **Gráfico de Anillo (Dona)** | Gráficos | `.periodic-grafic-torus` | [docs/grafic-torus.md](docs/grafic-torus.md) |
| 28 | **Cuadrícula Flexible** | Diseño | `.periodic-grid-flex` | [docs/grid-flex.md](docs/grid-flex.md) |
| 29 | **Iconos y Vectores** | Otro | `.periodic-icons` | [docs/icons.md](docs/icons.md) |
| 30 | **Imagen Destacada** | Medios | `.periodic-image-destaque` | [docs/image-destaque.md](docs/image-destaque.md) |
| 31 | **Editor de Imágenes** | Medios | `.periodic-image-editor` | [docs/image-editor.md](docs/image-editor.md) |
| 32 | **Solo Imagen** | Medios | `.periodic-image-only` | [docs/image-only.md](docs/image-only.md) |
| 33 | **Utilidades Interactivas** | Interactivo | `.periodic-interactive-utilities` | [docs/interactive-utilities.md](docs/interactive-utilities.md) |
| 34 | **Simulador de Software** | Interactivo | `.periodic-interative-software-simulator` | [docs/interative-software-simulator.md](docs/interative-software-simulator.md) |
| 35 | **Mapas Interactivos** | Formularios | `.periodic-maps` | [docs/maps.md](docs/maps.md) |
| 36 | **Puntos de Interés** | Medios | `.periodic-media-hotspot` | [docs/media-hotspot.md](docs/media-hotspot.md) |
| 37 | **Ventana Modal / Emergente** | Interactivo | `.periodic-modal-popup` | [docs/modal-popup.md](docs/modal-popup.md) |
| 38 | **Sección Parallax** | Diseño | `.periodic-parallax-section` | [docs/parallax-section.md](docs/parallax-section.md) |
| 39 | **Libro Digital (Flipbook)** | Medios | `.periodic-pdf-flipbook` | [docs/pdf-flipbook.md](docs/pdf-flipbook.md) |
| 40 | **Tabla de Precios** | Formularios | `.periodic-pricing-table` | [docs/pricing-table.md](docs/pricing-table.md) |
| 41 | **Motor de Cuestionarios** | Juegos | `.periodic-quiz-engine` | [docs/quiz-engine.md](docs/quiz-engine.md) |
| 42 | **Volver Arriba** | Interactivo | `.periodic-scroll-top` | [docs/scroll-top.md](docs/scroll-top.md) |
| 43 | **Contenedor de Sección** | Diseño | `.periodic-section-container` | [docs/section-container.md](docs/section-container.md) |
| 44 | **Separador y Divisor** | Diseño | `.periodic-separator` | [docs/separator.md](docs/separator.md) |
| 45 | **Ensayo Inteligente** | Contenido | `.periodic-smart-essay` | [docs/smart-essay.md](docs/smart-essay.md) |
| 46 | **Escritura Estructurada** | Contenido | `.periodic-structured-writing` | [docs/structured-writing.md](docs/structured-writing.md) |
| 47 | **Tabla de Contenidos** | Diseño | `.periodic-table-of-contents` | [docs/table-of-contents.md](docs/table-of-contents.md) |
| 48 | **Tabla Adaptable** | Diseño | `.periodic-table-responsive` | [docs/table-responsive.md](docs/table-responsive.md) |
| 49 | **Pestañas de Navegación** | Diseño | `.periodic-tabs` | [docs/tabs.md](docs/tabs.md) |
| 50 | **Miembro del Equipo** | Formularios | `.periodic-team-member` | [docs/team-member.md](docs/team-member.md) |
| 51 | **Testimonios** | Formularios | `.periodic-testimonials` | [docs/testimonials.md](docs/testimonials.md) |
| 52 | **Completar Texto** | Contenido | `.periodic-text-completion` | [docs/text-completion.md](docs/text-completion.md) |
| 53 | **Miniatura con Enlace a PDF** | Medios | `.periodic-thumbnail-pdf-link` | [docs/thumbnail-pdf-link.md](docs/thumbnail-pdf-link.md) |
| 54 | **Múltiples Enlaces PDF** | Medios | `.periodic-thumbnail-pdf-link-multiple` | [docs/thumbnail-pdf-link-multiple.md](docs/thumbnail-pdf-link-multiple.md) |
| 55 | **Línea de Tiempo Vertical** | Otro | `.periodic-timeline-vertical` | [docs/timeline-vertical.md](docs/timeline-vertical.md) |
| 56 | **Bloque de Título y Texto** | Contenido | `.periodic-title-text-block` | [docs/title-text-block.md](docs/title-text-block.md) |
| 57 | **Tema con Datos** | Contenido | `.periodic-topic-text-data` | [docs/topic-text-data.md](docs/topic-text-data.md) |
| 58 | **Tema con Título y Texto** | Contenido | `.periodic-topic-title-text` | [docs/topic-title-text.md](docs/topic-title-text.md) |
| 59 | **Incrustador de Video** | Medios | `.periodic-video-embed` | [docs/video-embed.md](docs/video-embed.md) |
| 60 | **Laboratorio de Voz** | Interactivo | `.periodic-voice-lab` | [docs/voice-lab.md](docs/voice-lab.md) |
| 61 | **Juegos de Palabras** | Juegos | `.periodic-word-games` | [docs/word-games.md](docs/word-games.md) |

---

## 🚀 Showroom & Demostración Interactiva

La suite incluye un catálogo interactivo completo para probar y validar los 61 componentes.

Para abrir el showroom localmente:
```bash
# Iniciar servidor web local en la raíz del repositorio
python -m http.server 8080
```
Navegue a: **`http://localhost:8080/demo/index.html`**

Características del Showroom:
- **Búsqueda Instantánea**: Encuentre componentes por nombre, slug o etiqueta.
- **Filtro por Categorías**: Diseño, Contenido, Medios, Interactivo, Formularios, Gráficos y Juegos.
- **Selector Multilingüe**: Cambio instantáneo en vivo entre Español, Inglés, Portugués e Italiano.
- **Tema Oscuro / Claro**: Alternador con persistencia en `localStorage`.
- **Modales de Prueba en Vivo**: Pruebe los componentes directamente dentro de la interfaz.

---

## 🔌 Guía de Integración con WordPress

Para instalar la suite en WordPress:
1. Copie la carpeta `luiz0067-periodic` en `/wp-content/plugins/`.
2. Ingrese a su Panel de Administración de WordPress $ightarrow$ **Plugins**.
3. Active el plugin **Periodic Component Suite**.
4. Todos los bloques Gutenberg estarán disponibles bajo la categoría **Periodic Suite**.

---

## 💻 Guía de Uso Standalone

Utilice cualquier componente de forma independiente en flujos con React, Vue, HTML puro o Vite:

```html
<!-- Dependencias Compartidas -->
<link rel="stylesheet" href="shared/vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="shared/vendor/fontawesome/css/all.min.css">

<!-- Estilos Base Periodic -->
<link rel="stylesheet" href="core/styles/variables.css">
<link rel="stylesheet" href="core/styles/base.css">

<!-- Componente Específico (ejemplo: Breadcrumbs) -->
<link rel="stylesheet" href="components/breadcrumbs/breadcrumbs.css">
<script src="components/breadcrumbs/breadcrumbs.js"></script>

<div id="migaDePan"></div>
<script>
    new PeriodicBreadcrumbs('#migaDePan', [
        { label: 'Inicio', url: '/' },
        { label: 'Documentación', active: true }
    ]);
</script>
```

---

## 🛡️ Estándares y Convenciones de Ingeniería

1. **Aislamiento BEM**: Cada componente utiliza clases `.periodic-<nombre>` e IDs `#periodic-<nombre>`.
2. **JSDoc en Inglés**: Documentación estricta de parámetros, tipos y retornos en inglés en todo el código fuente.
3. **Eventos Sin Colisiones**: Comunicación desacoplada mediante el bus de eventos `Periodic.on()` / `Periodic.emit()`.
4. **Licencia**: GPL-2.0-or-later.
