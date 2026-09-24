<!--
  Module: periodic-accordion
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Fisarmonica

[English](../accordion.md) • [Português (BR)](accordion.pt-br.md) • [Español](accordion.es.md) • [Italiano](accordion.it.md)


> Modulo consolidato standardizzato nello spazio dei nomi `.periodic-accordion`.

---

# Fisarmonica periodica 📑

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3.svg?logo=bootstrap)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.5.2-528DD7.svg?logo=fontawesome)](https://fontawesome.com)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plug-in WordPress moderno e intuitivo che aggiunge blocchi **Gutenberg** nativi per la creazione e la gestione di menu comprimibili reattivi (**Menu Comprimi**, **Menu Doppia compressione** e **Menu tripla compressione**) con le icone **Bootstrap 5.3** e **Font Awesome 6**.

---

## 📸 Schermate

| Editore Gutenberg (editing visivo) | Frontend reattivo (Bootstrap 5) |
| :---: | :---: |
| ![Gutenberg Editor](../.wordpress-org/screenshot-1.png) | ![Frontend Preview](../.wordpress-org/screenshot-2.png) |

---

## 🚀 Caratteristiche principali

- **100% WYSIWYG (Visual Fidelity)**: ciò che visualizzi e modifichi nell'editor Gutenberg è esattamente ciò che viene visualizzato nell'anteprima e nel frontend del sito.
- **Componente ufficiale Bootstrap 5**:
  - Implementa la struttura semantica `.accordion`, `.accordion-item`, `.accordion-header`, `.accordion-button`, `.accordion-collapse` e `.accordion-body`.
  - Transizioni fluide e fluide e comportamento di collasso basato su Bootstrap 5 JS Bundle.
- **Modalità di visualizzazione flessibili**:
  - **Fisarmonica predefinita**: facendo clic su un elemento si raccolgono automaticamente gli altri (`data-bs-parent`).
  - **Sempre aperto**: consente di mantenere più elementi aperti contemporaneamente senza comprimere gli altri.
  - **Stile a filo (`accordion-flush`)**: rimuove i bordi esterni e gli angoli arrotondati per un perfetto allineamento da bordo a bordo.
- **Gestione agile dei contenuti**:
  - ➕ **Aggiungi elemento**: inserimento rapido con un clic.
  - ⬆️ / ⬇️ **Riordino**: pulsanti per spostare gli elementi su e giù.
  - 📋 **Duplica**: clona gli elementi esistenti con contenuto e formattazione intatti.
  - 🗑️ **Elimina**: rimozione sicura di oggetti indesiderati.
  - ▾ **Attiva/disattiva visualizzazione**: espandi e comprimi qualsiasi elemento direttamente nell'editor per lavorare con facilità.
- **Edizione ricca e semantica**:
  - Titoli in linea con supporto per tag semantici configurabili (**H2, H3, H4, H5, H6 o DIV**) per l'ottimizzazione SEO e dell'accessibilità.
  - Contenuto del corpo con formattazione avanzata (`wp.blockEditor.RichText`), accetta elenchi, grassetto, corsivo, collegamenti e paragrafi multipli.
- **Personalizzazione del colore**:
  - Regolazione personalizzata del colore di sfondo e del testo dell'intestazione attiva nella barra laterale dell'editor.
- **Internazionalizzazione pronta (i18n)**:
  - Completamente tradotto in **portoghese brasiliano (pt-BR)**, **inglese (en)**, **spagnolo (es)** e **italiano (it)**.
  - Menu Impostazioni in WordPress (`Configurações > periodic Accordion`) per correggere la lingua o rilevare automaticamente.
- **Compatibilità globale**:
  - Compatibile con **Temi a blocchi** (Modifica completa del sito - FSE) e **Temi classici**.
  - Non dipende da CDN esterni: tutti i file Bootstrap 5 e Font Awesome sono inclusi nel plugin.

---

## 📂 Struttura del progetto

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

## 🛠️ Installazione

### Opzione 1: tramite pannello WordPress (ZIP)
1. Comprimi questa cartella o scarica la versione `.zip`.
2. Nella dashboard di WordPress, vai su **Plugin > Aggiungi nuovo > Invia plugin**.
3. Seleziona il file `.zip` e fai clic su **Installa ora**.
4. Attiva il plugin.

### Opzione 2: tramite FTP/directory dei plugin
1. Copia la cartella `periodic-accordion` nella directory `/wp-content/plugins/` della tua installazione WordPress.
2. Accedi al pannello amministrativo sotto **Plugin**.
3. Individua **Bootstrap Accordion periodico** e fai clic su **Attiva**.

---

## 💡 Come usare

1. Crea o modifica un post o una pagina in **Gutenberg**.
2. Fai clic sul pulsante **`+`** per aggiungere un blocco e cercare **"Accordion"** o **"periodic"**.
3. Il blocco verrà inserito con elementi di esempio già pronti.
4. Digita il titolo dell'elemento direttamente nell'intestazione e modifica facilmente il contenuto della dashboard.
5. Utilizza la barra laterale (**Ispettore**) per scegliere lo stile (*Flush*, *Sempre aperto*, tag titolo e colori).
6. Pubblica o aggiorna la tua pagina!

---

## 📄 Licenza

Distribuito sotto la licenza **GPL-2.0 o successiva**. Per ulteriori informazioni, vedere il file di licenza.

Sviluppato da [Luiz Fernando Brogliatto Ferreira](https://github.com/periodicyahoo).
