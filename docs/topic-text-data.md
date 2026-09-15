<!--
  Module: periodic-topic-text-data
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Topic Text Data

> Consolidated module standardized under namespace `.periodic-topic-text-data`.

---

# Periodic Topic Text Data

A lightweight Gutenberg block plugin that provides a **Topic Text Data** block. The block lets editors add a title, description, and optional link, rendered with a modern dark‑overlay style.

![Topic Text Data Screenshot](screenshot.png)

## Installation
1. Upload the `periodic-topic-text-data` folder to your WordPress `wp-content/plugins` directory.
2. Activate the plugin from the **Plugins** admin screen.
3. The block will appear under the **Common** category in the Gutenberg editor.

## Usage
- Insert the **Topic Text Data** block.
- Fill in the **Title**, **Description**, and optional **Link URL** in the inspector panel.
- The front‑end will display the content with the bundled styling.

## Files Overview
- `index.php` – Main plugin file, registers the block and enqueues assets.
- `js/block.js` – Block registration, edit and save components.
- `css/editor.css` – Editor‑only styling.
- `css/style.css` – Front‑end styling.
- `assets/icon.svg` – Block icon.
- `assets/screenshot-1.png` – Example screenshot.
- `languages/*.json` – JSON translation files (placeholders).

## Translation
The plugin loads translation files from the `languages` directory. Place your `.json` translation files there (e.g., `pt-br.json`).

## License
MIT – see the `LICENSE` file.
