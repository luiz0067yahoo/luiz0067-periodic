<!--
  Módulo: periodic-date-title-link-file-upload
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Date Title Link File Upload

> Módulo consolidado e padronizado sob o namespace `.periodic-date-title-link-file-upload`.

---

# periodic Date Title Link File Upload

[![WordPress Version](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![PHP Version](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)](https://php.net)
[![License](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES5-yellow.svg)](https://developer.mozilla.org)
[![i18n](https://img.shields.io/badge/i18n-4%20Languages-orange.svg)](#internacionalização-i18n)

> Bloco customizado WordPress Gutenberg para publicação profissional de documentos, editais e anexos com data destacada, título descritivo (`RichText`), link de redirecionamento e upload/seleção direta de arquivos (`MediaUpload`).

---

## 📸 Preview do Bloco (Screenshot)

![Gutenberg Block Screenshot](assets/screenshot-1.png)

*Preview do bloco exibindo a apresentação em cartão com badge de data, tag de edital, ícone PDF vetorial, nome e tamanho do arquivo, botão de download e painel lateral de configurações.*

---

## 🎯 Objetivo e Compatibilidade

Este bloco foi desenvolvido para atender às necessidades de portais governamentais, prefeituras, câmaras e portais corporativos que publicam constantemente:
- Editais de licitações, concursos e chamamentos públicos
- Decretos, leis e portarias
- Relatórios fiscais, orçamentários e balanços
- Atas de reuniões, resoluções e arquivos institucionais

### Compatibilidade Retroativa (customADM):
O bloco registra simultaneamente o identificador moderno e o identificador legado do projeto `customADM`:
1. `periodic/date-title-link-file-upload` (Canônico)
2. `cms-adm/date-title-link-file-upload` (Legado customADM)

Preserva as classes CSS legadas (`.customadm-date-title-link-file-box` e `.table-link-file-upload-box`), garantindo que conteúdos preexistentes continuem renderizando perfeitamente.

---

## 🛠️ Especificações Técnicas

- **JavaScript Vanilla ES5 puro:** Sem dependência de Babel, Webpack ou scripts de build. O arquivo `js/blocks/date-title-link-file-upload.js` é executado diretamente pelo navegador via `wp.element.createElement`.
- **MediaUpload nativo do WordPress:** Utiliza o componente modal do core (`wp.blockEditor.MediaUpload`) com detecção de extensão, tamanho legível do arquivo e suporte a múltiplos tipos MIME (PDF, DOCX, XLSX, ZIP, etc.).
- **InspectorControls (Sidebar):** Painéis recolhíveis para Arquivo & Upload, Data & Metadados, Links & Redirecionamento e Opções de Apresentação.
- **Objeto Example:** Atributos pré-configurados para visualização instantânea no Inserter nativo do Gutenberg.
- **Folha de Estilos Autocontida:** Totalmente responsiva, com suporte a modo escuro (`prefers-color-scheme: dark`) e regras de impressão (`@media print`).

---

## 🌐 Internacionalização (i18n)

O bloco suporta 4 idiomas nativamente através das funções `__()` do Gutenberg e injeção do dicionário via `wp_localize_script`:

| Chave do Termo (Português - `pt_BR`) | Inglês (`en_US`) | Espanhol (`es_ES`) | Italiano (`it_IT`) |
| :--- | :--- | :--- | :--- |
| **Data, Título, Link e Upload de Arquivo** | Date, Title, Link and File Upload | Fecha, Título, Enlace y Subida de Archivo | Data, Titolo, Link e Caricamento File |
| **Exibe publicações, editais ou documentos...** | Displays publications, notices, or documents... | Muestra publicaciones, convocatorias o documentos... | Mostra pubblicazioni, bandi o documenti... |
| **Edital de Licitação** | Public Tender Notice | Convocatoria de Licitación | Bando di Gara |
| **Novo** | New | Nuevo | Nuovo |
| **Download** | Download | Descargar | Scarica |
| **Arquivo e Download** | File and Download | Archivo y Descarga | File e Download |
| **Arquivo:** | File: | Archivo: | File: |
| **Tamanho:** | Size: | Tamaño: | Dimensione: |
| **Substituir Arquivo** | Replace File | Reemplazar Archivo | Sostituisci File |
| **Remover** | Remove | Eliminar | Rimuovi |
| **Selecionar / Enviar Arquivo** | Select / Upload File | Seleccionar / Subir Archivo | Seleziona / Carica File |
| **URL Direta do Arquivo** | Direct File URL | URL Directa del Archivo | URL Diretto del File |
| **Nome de Exibição do Arquivo** | File Display Name | Nombre Mostrado del Archivo | Nome Visualizzato del File |
| **Tamanho Formatado (ex: 2.5 MB)** | Formatted Size (e.g. 2.5 MB) | Tamaño Formateado (ej: 2.5 MB) | Dimensione Formattata (es: 2.5 MB) |
| **Texto do Botão de Download** | Download Button Text | Texto del Botón de Descarga | Testo del Pulsante di Download |
| **Data e Metadados** | Date and Metadata | Fecha y Metadatos | Data e Metadati |
| **Data de Publicação** | Publication Date | Fecha de Publicación | Data di Pubblicazione |
| **Categoria / Órgão Emissor (Caption)** | Category / Issuing Agency (Caption) | Categoría / Organismo Emisor (Caption) | Categoria / Ente Emittente (Caption) |
| **Etiqueta em Destaque (Badge)** | Highlight Badge | Etiqueta Destacada (Badge) | Etichetta in Evidenza (Badge) |
| **Link de Redirecionamento** | Redirect Link | Enlace de Redireccionamiento | Link di Reindirizzamento |
| **URL da Página ou Detalhes** | Page URL or Details | URL de la Página o Detalles | URL della Pagina o Dettagli |
| **Abrir links em nova aba (_blank)** | Open links in a new tab (_blank) | Abrir enlaces en nueva pestaña (_blank) | Apri link in una nuova scheda (_blank) |
| **Estilo de Exibição** | Display Style | Estilo de Visualización | Stile di Visualizzazione |
| **Cartão Moderno (Card)** | Modern Card | Tarjeta Moderna (Card) | Scheda Moderna (Card) |
| **Linha de Tabela / Lista (Row)** | Table Row / List | Fila de Tabla / Lista (Row) | Riga di Tabella / Elenco (Row) |
| **Data (DD/MM/AAAA)** | Date (YYYY-MM-DD) | Fecha (DD/MM/AAAA) | Data (GG/MM/AAAA) |
| **(Nenhum arquivo vinculado)** | (No file attached) | (Ningún archivo adjunto) | (Nessun file allegato) |
| **Alterar Arquivo** | Change File | Cambiar Archivo | Modifica File |
| **Vincular Arquivo** | Attach File | Adjuntar Archivo | Collega File |
| **Acessar Página** | Visit Page | Acceder a la Página | Accedi alla Pagina |
| **Acessar** | View | Acceder | Accedi |

---

## 📁 Estrutura de Arquivos

```
periodic-date-title-link-file-upload/
├── date-title-link-file-upload.php          # Ponto de entrada do plugin WordPress
├── js/
│   └── blocks/
│       └── date-title-link-file-upload.js   # Script ES5 Vanilla do bloco
├── css/
│   ├── style.css                            # Estilos frontend e editor
│   └── editor.css                           # Estilos específicos do painel do editor
├── languages/                               # Arquivos JSON, PO e POT
│   ├── pt-br.json / en.json / es.json / it.json
│   ├── custom-adm-*.json
│   ├── periodic-date-title-link-file-upload-*.json
│   └── date-title-link-file-upload.pot
├── assets/
│   └── screenshot-1.png                     # Imagem de preview (1200x900px)
├── screenshot-1.png                         # Screenshot na raiz do plugin
├── readme.txt                               # Padrão WordPress.org
└── README.md                                # Documentação técnica
```

---

## 🚀 Instalação e Ativação

1. Clone ou extraia este repositório no diretório de plugins do WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-date-title-link-file-upload.git
   ```
2. No painel de administração do WordPress, acesse **Plugins** e clique em **Ativar** em **periodic Date Title Link File Upload**.
3. No editor Gutenberg, adicione o bloco digitando `/date-title` ou buscando por **Data, Título, Link e Upload de Arquivo**.

---

## 📄 Licença

Distribuído sob a licença [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html). Desenvolvido por **[Luiz Fernando Brogliatto Ferreira](https://profiles.wordpress.org/periodic/)**.
