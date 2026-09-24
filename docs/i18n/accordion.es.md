<!--
  Module: periodic-accordion
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Acordeón

[English](../accordion.md) • [Português (BR)](accordion.pt-br.md) • [Español](accordion.es.md) • [Italiano](accordion.it.md)


> Módulo consolidado estandarizado bajo el espacio de nombres `.periodic-accordion`.

---

# Acordeón periódico 📑

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3.svg?logo=bootstrap)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.5.2-528DD7.svg?logo=fontawesome)](https://fontawesome.com)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Complemento de WordPress moderno e intuitivo que agrega bloques nativos **Gutenberg** para crear y administrar menús plegables responsivos (**Menú contraer**, **Menú contraer doble** y **Menú contraer triple**) con íconos **Bootstrap 5.3** y **Font Awesome 6**.

---

## 📸 Capturas de pantalla

| Editor Gutenberg (Edición visual) | Interfaz responsiva (Bootstrap 5) |
| :---: | :---: |
| ![Gutenberg Editor](../.wordpress-org/screenshot-1.png) | ![Frontend Preview](../.wordpress-org/screenshot-2.png) |

---

## 🚀 Características clave

- **100% WYSIWYG (Visual Fidelity)**: lo que ves y editas en el editor Gutenberg es exactamente lo que se representa en la vista previa y la interfaz del sitio.
- **Componente oficial de Bootstrap 5**:
  - Implementa la estructura semántica `.accordion`, `.accordion-item`, `.accordion-header`, `.accordion-button`, `.accordion-collapse` y `.accordion-body`.
  - Transiciones suaves y fluidas y comportamiento de colapso impulsado por Bootstrap 5 JS Bundle.
- **Modos de visualización flexibles**:
  - **Acordeón predeterminado**: Al hacer clic en un elemento, se recopilan automáticamente los demás (`data-bs-parent`).
  - **Siempre abierto**: Le permite mantener varios elementos abiertos simultáneamente sin colapsar los demás.
  - **Estilo al ras (`accordion-flush`)**: Elimina los bordes exteriores y las esquinas redondeadas para una alineación perfecta de borde a borde.
- **Gestión ágil de contenidos**:
  - ➕ **Agregar elemento**: inserción rápida con un solo clic.
  - ⬆️ / ⬇️ **Reordenar**: Botones para mover elementos hacia arriba y hacia abajo.
  - 📋 **Duplicar**: clona elementos existentes con contenido y formato intactos.
  - 🗑️ **Eliminar**: eliminación segura de elementos no deseados.
  - ▾ **Alternar vista**: expande y contrae cualquier elemento directamente en el editor para trabajar con facilidad.
- **Edición rica y semántica**:
  - Títulos en línea con soporte para etiquetas semánticas configurables (**H2, H3, H4, H5, H6 o DIV**) para SEO y optimización de accesibilidad.
  - Contenido del cuerpo con formato enriquecido (`wp.blockEditor.RichText`), aceptando listas, negrita, cursiva, enlaces y múltiples párrafos.
- **Personalización del color**:
  - Ajuste personalizado del color de fondo y el texto del encabezado activo en la barra lateral del editor.
- **Internacionalización Ready (i18n)**:
  - Totalmente traducido al **portugués brasileño (pt-BR)**, **inglés (en)**, **español (es)** e **italiano (it)**.
  - Menú de configuración en WordPress (`Configurações > periodic Accordion`) para corregir el idioma o detectar automáticamente.
- **Compatibilidad global**:
  - Compatible con **Temas de bloques** (Edición completa del sitio - FSE) y **Temas clásicos**.
  - No depende de CDN externos: todos los archivos Bootstrap 5 y Font Awesome están incluidos en el complemento.

---

## 📂 Estructura del proyecto

```
periodic-accordion/
├── assets/
│   ├── bootstrap/
│   │   ├── css/bootstrap.min.css       # Bootstrap 5.3 CSS
│   │   └── js/bootstrap.bundle.min.js  # Bootstrap 5.3 JS Bundle (Popper)
│   └── fontawesome/
│       ├── css/all.min.css             # Font Awesome 6 CSS
│       └── webfonts/                   # Arquivos de fontes
├── js/
│   └── blocks/
│       └── accordion.js                # Bloco Gutenberg nativo (edit, save, inspector)
├── languages/
│   ├── pt-br.json                      # Tradução em Português
│   ├── en.json                         # Tradução em Inglês
│   ├── es.json                         # Tradução em Espanhol
│   └── it.json                         # Tradução em Italiano
├── plugin/
│   ├── blocks.php                      # Registro do bloco e scripts
│   └── settings.php                    # Painel de configurações no admin WP
├── periodic-accordion.php              # Arquivo principal do plugin
├── style.css                           # Estilos visuais e compatibilidade Gutenberg
├── readme.txt                          # Metadados oficiais WordPress.org
└── README.md                           # Documentação do repositório
```

---

## 🛠️ Instalación

### Opción 1: A través del Panel de WordPress (ZIP)
1. Comprima esta carpeta o descargue la versión `.zip`.
2. En su panel de WordPress, vaya a **Complementos > Agregar nuevo > Enviar complemento**.
3. Seleccione el archivo `.zip` y haga clic en **Instalar ahora**.
4. Activa el complemento.

### Opción 2: vía FTP/directorio de complementos
1. Copie la carpeta `periodic-accordion` al directorio `/wp-content/plugins/` de su instalación de WordPress.
2. Acceda al panel administrativo en **Complementos**.
3. Localice **Acordeón Bootstrap periódico** y haga clic en **Activar**.

---

## 💡 Cómo utilizar

1. Crea o edita una publicación o página en **Gutenberg**.
2. Haga clic en el botón **`+`** para agregar un bloque y busque **"Acordeón"** o **"periódico"**.
3. El bloque se insertará con elementos de ejemplo ya preparados.
4. Escriba el título del elemento directamente en el encabezado y edite el contenido del panel con facilidad.
5. Utilice la barra lateral (**Inspector**) para elegir el estilo (*Flush*, *Always Open*, etiqueta de título y colores).
6. ¡Publica o actualiza tu página!

---

## 📄 Licencia

Distribuido bajo la licencia **GPL-2.0 o posterior**. Consulte el archivo de licencia para obtener más información.

Desarrollado por [Luiz Fernando Brogliatto Ferreira](https://github.com/periodicyahoo).
