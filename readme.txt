=== Periodic Component Suite ===
Contributors: luiz0067yahoo
Tags: components, blocks, gutenberg, ui, accordion
Requires at least: 6.0
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 2.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Unified suite of 61 frontend modular components and Gutenberg blocks with isolated BEM scoping and native internationalization.

== Description ==

Periodic Component Suite is a comprehensive modular library providing 61 production-ready frontend components and Gutenberg blocks for WordPress.

Each component is engineered with isolated BEM styling, responsive layouts, accessible semantic markup, and runtime multilingual support across 4 languages (English, Portuguese, Spanish, and Italian).

Key features include:
* 61 decoupled modular blocks and components.
* Centralized local dependencies (Bootstrap 5.3 and FontAwesome 6.5 bundled locally, zero external CDN offloading).
* Native internationalization support.
* Modern Gutenberg block editor integration.
* Fully accessible and responsive layouts.

== Installation ==

1. Upload the `luiz0067-periodic` folder to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Access the blocks inside the Gutenberg block editor under the "Periodic Suite" category.

== Frequently Asked Questions ==

= Does this plugin load external scripts or styles from remote CDNs? =
No. All required vendor libraries (Bootstrap, FontAwesome, PDF.js) are bundled locally within the plugin, ensuring 100% compliance with WordPress.org security and privacy guidelines.

= How do I switch languages? =
The plugin respects your WordPress locale automatically and supports English, Portuguese (BR), Spanish, and Italian.

== Screenshots ==

1. Showroom of modular components.

== Changelog ==

= 2.0.0 =
* Unified 61 modular components into a single architecture.
* Localized all vendor assets (Bootstrap, FontAwesome, PDF.js) eliminating external CDN offloading.
* Standardized text domain to `luiz0067-periodic`.
* Fully compliant with WordPress.org coding standards and Plugin Check.
