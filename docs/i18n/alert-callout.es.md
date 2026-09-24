<!--
  Module: periodic-alert-callout
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Llamada de alerta

[English](../alert-callout.md) • [Português (BR)](alert-callout.pt-br.md) • [Español](alert-callout.es.md) • [Italiano](alert-callout.it.md)



> Módulo consolidado estandarizado bajo el espacio de nombres `.periodic-alert-callout`.
---
# Periodic Llamada de alerta - Bloque Gutenberg
[![WordPress](https://img.shields.io/badge/WordPress-6.1%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-black.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-orange.svg)](https://fontawesome.com)
[![License](https://img.shields.io/badge/License-GPL--2.0--or--later-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
Complemento profesional de WordPress que agrega el bloque **Alerta y llamada contextual** (`periodic/alert-callout`) al editor Gutenberg. Desarrollado con React JSX, Block API v3 (`block.json`), renderizado WYSIWYG nativo, total compatibilidad con el ecosistema **Bootstrap 5** y **Font Awesome 6**, internacionalización en 4 idiomas y panel lateral categorizado en pestañas dedicadas.
---
## 📋 Resumen
- [Descripción general y propósito](#-visão-geral-e-propósito)
- [Características clave](#-recursos-principais)
- [Estructura de archivos](#-estrutura-de-arquivos)
- [Guía detallada del panel lateral (InspectorControls)](#-guia-detalhado-do-painel-lateral-inspectorcontrols)
  - [Pestaña 1: Tipo y Color](#aba-1-tipo-e-cor)
  - [Pestaña 2: Icono](#aba-2-ícone)
  - [Pestaña 3: Opciones](#aba-3-opções)
- [WYSIWYG y renderizado frontal](#-renderização-wysiwyg-e-frontend)
- [Galería de pantallas y capturas de pantalla](#-galeria-de-telas-e-screenshots)
- [Instalación y compilación](#-instalação-e-compilação)
- [Internacionalización (i18n)](#-internacionalização-i18n)
- [Autoría y Créditos](#-autoria-e-créditos)
---
## 🎯 Descripción general y propósito
En portales corporativos, intranets, documentación y sitios web institucionales, la comunicación clara de advertencias, lineamientos críticos, notas de éxito o advertencias es fundamental. El bloque **Periodic Llamada de alerta** satisface esta necesidad al proporcionar cuadros de alerta estandarizados con la semántica Bootstrap 5 (`.alert`), íconos representativos vectoriales de Font Awesome 6 y flexibilidad visual a través de bordes de llamada de estilo "Llamada".
---
## ✨ Características clave
- **Native Block API v3**: Desarrollado bajo las últimas directrices de WordPress Core y Gutenberg (`block.json` versión 3).
- **8 variantes semánticas de Bootstrap 5**: Compatibilidad con `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light` y `dark`.
- **Representación WYSIWYG en el Editor**: edición en tiempo real del título (`alert-heading`) y mensaje utilizando componentes integrados `RichText`.
- **Selector de íconos Font Awesome 6**: Botones rápidos para íconos institucionales y campo abierto para clases personalizadas (`fas fa-...`).
- **Botón Cerrar/Cerrar**: Soporte opcional para la clase nativa `alert-dismissible fade show` con botón `btn-close` y atributo `data-bs-dismiss="alert"`.
- **Resaltado lateral de llamada**: mejora visual con borde grueso en el color del tema seleccionado (`callout-border-highlight`).
- **Listo para internacionalización**: dominio de texto `periodic-alert-callout` con archivos JSON para portugués (pt-BR), inglés (en-US), italiano (it) y español (es).
---
## 📁 Estructura de archivos
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
## 🎛 Guía detallada del panel lateral (InspectorControls)
Al seleccionar el bloque **Alerta y llamada contextual** en el editor Gutenberg, la barra lateral de propiedades (`InspectorControls`) muestra un componente de pestaña personalizado (`TabPanel`) dividido en tres áreas de configuración:
### Pestaña 1: Tipo y color
Esta pestaña define la semántica contextual y la paleta de colores aplicada a la alerta:
- **Variante de Alerta**: Menú desplegable con las 8 variantes oficiales de Bootstrap 5:
  - *Informativo (Info)*: Fondo azul claro y texto oscuro, ideal para avisos neutros y notas explicativas.
  - *Éxito*: Verde suave, para confirmaciones de acciones, registros exitosos o estados positivos.
  - *Atención / Advertencia*: Amarillo suave, indicado para advertencias, plazos inminentes y precauciones.
  - *Peligro/Error (Peligro)*: Rojo claro, para errores del sistema, cancelaciones y alertas críticas.
  - *Primario*: Azul corporativo predeterminado del tema.
  - *Secundario*: Elegante gris neutro para comunicaciones auxiliares.
  - *Claro*: Fondo blanco grisáceo sutil.
  - *Oscuro*: Contraste oscuro para notas de alto impacto.
- **Vista previa de estilo**: cuadro interactivo que muestra el estilo de la insignia y los colores seleccionados en tiempo real.
### Pestaña 2: Icono
Esta pestaña gestiona el símbolo gráfico contextual situado junto al título y al mensaje:
- **Iconos recomendados**: Cuadrícula con accesos directos de un clic para los iconos más comunes:
  - `fas fa-info-circle` (Información)
  - `fas fa-check-circle` (Éxito)
  - `fas fa-exclamation-triangle` (Advertencia / Alerta)
  - `fas fa-times-circle` (Peligro/Error)
  - `fas fa-lightbulb` (Consejo / Sugerencia)
  - `fas fa-bell` (Notificación)
  - `fas fa-shield-alt` (Seguridad y Privacidad)
  - `fas fa-comment-dots` (Comentario/Mensaje)
- **Clase de Icon CSS**: campo de entrada gratuito para usar cualquier clase de la biblioteca **Font Awesome 6** (por ejemplo: `fas fa-star`, `far fa-envelope`, `fas fa-fire`).
- **Quitar Icono**: Botón para desactivar la visualización de iconos, transformando el cuadro en una alerta puramente textual.
### Pestaña 3: Opciones
Controles de comportamiento y presentación estructural:
- **Botón Cerrar (Prescindible)**: Cuando está activo (`isDismissible: true`), incluye las clases `alert-dismissible fade show` y renderiza el botón `btn-close` con atributo `data-bs-dismiss="alert"`. El visitante puede hacer clic en el botón "X" para cerrar suavemente la alerta en la página.
- **Resaltar borde lateral (llamada)**: cuando está activo (`hasBorderLeftHighlight: true`), agrega un borde izquierdo de 6 píxeles en el color de énfasis de la variante seleccionada, dando la apariencia clásica de llamada de documentación técnica institucional.
---
## 💻 WYSIWYG y renderizado frontal
### En el editor Gutenberg (`src/edit.js`)
El bloque simula perfectamente el renderizado final:
- Título con soporte para formato en línea a través de `RichText` (`tagName="h5"`, clase `alert-heading`).
- Mensaje descriptivo editable directamente en el lienzo con saltos de línea y formato (`tagName="div"`, clase `alert-body-content`).
- Icono dinámico sincronizado en tiempo real.
- Botón de cierre "X" con respuesta visual (deshabilitado en el editor para evitar cierres accidentales mientras se escribe).
### En la interfaz (`src/save.js`)
El HTML5 generado es 100% semántico y limpio:
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
## 🖼 Pantalla y galería de capturas de pantalla
Las imágenes demostrativas están organizadas en el directorio `assets/screenshots/`:
1. **`01-tab-type-color.png`**: Demostración de la pestaña "Tipo y color" en InspectorControls con las opciones de la paleta semántica de Bootstrap 5.
2. **`02-tab-icon.png`**: Vista de pestaña "Icono" que muestra la cuadrícula de íconos rápidos de Font Awesome 6 y el campo de clase CSS personalizado.
3. **`03-tab-options.png`**: Presentación de la pestaña "Opciones" que muestra la alerta descartable y los botones de alternancia del borde de llamada.
4. **`04-alert-editor-preview.png`**: Captura de pantalla de la edición WYSIWYG nativa dentro de Gutenberg.
5. **`05-alert-frontend-preview.png`**: Visualización de alertas renderizadas en el frontend del sitio web con Bootstrap 5 activo.
---
## 🚀 Instalación y compilación
### Requisitos
-WordPress 6.1 o superior.
- PHP 7.4 o superior.
- Node.js 18+ y npm.
### Pasos de instalación para el desarrollo
1. Clona o extrae el repositorio en la carpeta de complementos de WordPress (`wp-content/plugins/periodic-alert-callout`).
2. Acceda a la carpeta del complemento a través de la terminal:
   ```bash
   cd periodic-alert-callout
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Compile los archivos para producción:
   ```bash
   npm run build
   ```
5. Para desarrollo continuo con compilación automática:
   ```bash
   npm run start
   ```
6. Active el complemento en el panel de administración de WordPress (`Plugins > Plugins Instalados`).
---
## 🌐 Internacionalización (i18n)
El bloque admite la internacionalización total a través de archivos `wp_set_script_translations` y Jed JSON:
- `languages/pt-br.json` - Portugués brasileño (Estándar)
- `languages/en-us.json` - Inglés
- `languages/it.json` - Italiano
- `languages/es.json` - Español
Todos los mensajes del editor y del panel lateral utilizan la función `__()` vinculada al dominio de texto `'periodic-alert-callout'`.
---
## 👨‍💻 Autoría y Créditos
Desarrollado con excelencia por **Luiz Fernando Brogliatto Ferreira**.
- **Perfil en WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)
---
*Distribuido bajo licencia GPLv2 o posterior. Siéntete libre de utilizarlo, estudiarlo y mejorarlo.*