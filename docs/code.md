<!--
  Módulo: periodic-code
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Code

> Módulo consolidado e padronizado sob o namespace `.periodic-code`.

---

# Periodic Code

**Contributors:** periodic  
**Donate link:** https://profiles.wordpress.org/periodic/  
**Tags:** code block, syntax highlighting, developer, editor, gutenberg  
**Requires at least:** 6.0  
**Tested up to:** 6.7  
**Stable tag:** 1.0.0  
**Requires PHP:** 7.4  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

Native Gutenberg code editor block with authorial syntax highlighting, customizable themes, line numbers, and one-click copy.

---

## Description

**Periodic Code** is a native WordPress Gutenberg block designed for developers, educators, and technical writers who need a high-performance, lightweight code editor inside the block editor.

Built with an authorial, zero-dependency text decoration and syntax highlighting engine, this block offers real-time syntax highlighting, multiple programming languages, instant theme switching, a modern macOS-inspired terminal header with window controls, and a quick copy-to-clipboard button.

**100% Offline & Zero External Dependencies:** All JavaScript and CSS assets are bundled locally. No third-party editor engines, external CDNs, or remote font APIs are loaded.

---

## 🚀 Key Features

- **Native Gutenberg Integration (API v3)**: Built following WordPress block editor best practices with `@wordpress/components` and `@wordpress/block-editor`.
- **Authorial Engine**: 100% proprietary, zero-dependency syntax decorator engine created by Luiz.
- **100% Offline Execution**: Completely self-contained with zero CDN or external network dependencies.
- **Multi-Language Support**:
  - JavaScript (ECMAScript, JSX)
  - Python
  - PHP
  - HTML / XML
  - CSS
  - SQL
  - Markdown
- **Real-Time Theme Switcher**:
  - Default (Clean Light)
  - One Dark
  - Dracula
  - Solarized Dark
  - Nord (Arctic Frost)
- **Tab Key Indentation**: Native indentation with the Tab key inside the editor.
- **Line Numbers & Live Stats**: Synchronized line numbering and live character/line counters.
- **Frontend Performance & Accessibility**: Lightweight, semantic HTML5 output with window controls and a copy-to-clipboard button.
- **Full Internationalization (i18n)**: Ready for localization into any language.

---

## 📂 Project Structure

```text
periodic-code/
├── package.json               # Dependencies and build scripts
├── block.json                 # Block metadata (API v3)
├── periodic-code.php          # Main WordPress plugin entrypoint
├── readme.txt                 # WordPress.org official readme
├── README.md                  # Project documentation
├── src/                       # Source React and SCSS files
│   ├── index.js               # Block registration
│   ├── decorator.js           # Authorial syntax highlighting engine
│   ├── edit.js                # Gutenberg editor component
│   ├── save.js                # Frontend markup rendering
│   ├── editor.scss            # Gutenberg editor styles
│   └── style.scss             # Frontend styles and themes
├── languages/                 # Translation files
│   ├── pt-br.json             # Portuguese (Brazil)
│   ├── en-us.json             # English
│   ├── it.json                # Italian
│   └── es.json                # Spanish
└── screenshots/               # Screenshot assets
    ├── 01-editor-overview.png
    ├── 02-language-selector.png
    ├── 03-theme-switcher.png
    └── 04-frontend-output.png
```

---

## 🛠️ Installation & Build

### Requirements
- **WordPress**: 6.0 or higher
- **PHP**: 7.4 or higher
- **Node.js**: v18.0.0+ (for compiling from source)
- **npm**: v8.0.0+

### Installation
1. Download or upload the `periodic-code.zip` file in your WordPress admin via **Plugins > Add New Plugin > Upload Plugin**.
2. Activate the plugin.
3. In the block editor, type `/code` or choose **Periodic Code** under the Formatting category.

---

## 👨‍💻 Author & Links

Developed by **Luiz**:
- **WordPress Profile**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)

---

## 📄 License

Distributed under the **GPL-2.0-or-later** license. See [GNU General Public License](https://www.gnu.org/licenses/gpl-2.0.html) for full details.
