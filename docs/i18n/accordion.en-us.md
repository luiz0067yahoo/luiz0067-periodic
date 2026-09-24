<!--
  Module: periodic-accordion
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Accordion

[English](../accordion.md) • [Português (BR)](accordion.pt-br.md) • [Español](accordion.es.md) • [Italiano](accordion.it.md)


> Consolidated module standardized under namespace `.periodic-accordion`.

---

# periodic Accordion 📑

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3.svg?logo=bootstrap)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.5.2-528DD7.svg?logo=fontawesome)](https://fontawesome.com)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Modern and intuitive WordPress plugin that adds native **Gutenberg** blocks for creating and managing responsive collapsible menus (**Collapse Menu**, **Double Collapse Menu** and **Triple Collapse Menu**) with **Bootstrap 5.3** and **Font Awesome 6** icons.

---

## 📸 Screenshots

| Gutenberg Editor (Visual Editing) | Responsive Frontend (Bootstrap 5) |
| :---: | :---: |
| ![Gutenberg Editor](../.wordpress-org/screenshot-1.png) | ![Frontend Preview](../.wordpress-org/screenshot-2.png) |

---

## 🚀 Key Features

- **100% WYSIWYG (Visual Fidelity)**: What you view and edit in the Gutenberg editor is exactly what is rendered in the preview and frontend of the site.
- **Official Bootstrap 5 Component**:
  - Implements the semantic structure `.accordion`, `.accordion-item`, `.accordion-header`, `.accordion-button`, `.accordion-collapse` and `.accordion-body`.
  - Smooth and fluid transitions and collapse behavior powered by Bootstrap 5 JS Bundle.
- **Flexible Display Modes**:
  - **Default Accordion**: Clicking on an item automatically collects the others (`data-bs-parent`).
  - **Always Open**: Allows you to keep multiple items open simultaneously without collapsing the others.
  - **Flush Style (`accordion-flush`)**: Removes outer edges and rounded corners for perfect edge-to-edge alignment.
- **Agile Content Management**:
  - ➕ **Add Item**: Quick one-click insertion.
  - ⬆️ / ⬇️ **Reordering**: Buttons to move items up and down.
  - 📋 **Duplicate**: Clone existing items with content and formatting intact.
  - 🗑️ **Delete**: Safe removal of unwanted items.
  - ▾ **Toggle View**: Expand and collapse any item directly in the editor to work with ease.
- **Rich and Semantic Edition**:
  - Inline titles with support for configurable semantic tags (**H2, H3, H4, H5, H6 or DIV**) for SEO and accessibility optimization.
  - Body content with rich formatting (`wp.blockEditor.RichText`), accepting lists, bold, italics, links and multiple paragraphs.
- **Color Customization**:
  - Custom adjustment of the background color and text of the active header in the editor sidebar.
- **Ready Internationalization (i18n)**:
  - Fully translated into **Brazilian Portuguese (pt-BR)**, **English (en)**, **Spanish (es)** and **Italian (it)**.
  - Settings menu in WordPress (`Configurações > periodic Accordion`) to fix the language or auto-detect.
- **Global Compatibility**:
  - Compatible with **Block Themes** (Full Site Editing - FSE) and **Classic Themes**.
  - Does not depend on external CDNs: all Bootstrap 5 and Font Awesome files are included in the plugin.

---

## 📂 Project Structure

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

## 🛠️ Installation

### Option 1: Via WordPress Panel (ZIP)
1. Zip this folder or download the `.zip` release.
2. In your WordPress dashboard, go to **Plugins > Add New > Submit Plugin**.
3. Select the `.zip` file and click **Install Now**.
4. Activate the plugin.

### Option 2: Via FTP / Plugin Directory
1. Copy the `periodic-accordion` folder to the `/wp-content/plugins/` directory of your WordPress installation.
2. Access the administrative panel under **Plugins**.
3. Locate **periodic Bootstrap Accordion** and click **Activate**.

---

## 💡 How to Use

1. Create or edit a post or page in **Gutenberg**.
2. Click the **`+`** button to add a block and search for **"Accordion"** or **"periodic"**.
3. The block will be inserted with ready-made example items.
4. Type the item title directly into the header and edit the dashboard content with ease.
5. Use the sidebar (**Inspector**) to choose the style (*Flush*, *Always Open*, title tag and colors).
6. Publish or update your page!

---

## 📄 License

Distributed under the **GPL-2.0-or-later** license. See the license file for more information.

Developed by [Luiz Fernando Brogliatto Ferreira](https://github.com/periodicyahoo).
