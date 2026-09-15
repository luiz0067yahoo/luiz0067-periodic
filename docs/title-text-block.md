<!--
  Module: periodic-title-text-block
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Title Text Block

> Consolidated module standardized under namespace `.periodic-title-text-block`.

---

# periodic Title Text Block

A premium Gutenberg block that provides a styled **Title & Text** section with:

- Dynamic heading level (h2 / h3 / h4)
- Optional subtitle (uppercase, small)
- Rich‑text content area
- Optional left accent bar (primary colour)
- Alignment control (left, centre, right)
- Full i18n support (pt‑BR, en‑US, es‑ES, it‑IT)

## Installation
1. Place the folder `periodic-title-text-block` in `wp-content/plugins/`.
2. Activate the plugin.
3. Insert **Title and Text** block from the **Text** category.

## Block Settings
| Setting | Options | Description |
|---|---|---|
| Heading level | h2, h3, h4 | Tag used for the main title |
| Alignment | Left, Center, Right | Aligns the whole block |
| Show accent bar | Toggle | Shows/hides the coloured vertical bar |

## Screenshot
![Block preview](./screenshot.png)

## Translations
- pt_BR – Português (Brasil)
- en_US – English (US)
- es_ES – Español (España)
- it_IT – Italiano (Italia)

## Files
- `title-text-block.php` – registration and script enqueue
- `js/blocks/title-text-block.js` – block definition (ES5)
- `css/style.css` – styling
- `languages/*.json` – translation files (JSON format)

## Support
GitHub: https://github.com/periodicyahoo/periodic-title-text-block
