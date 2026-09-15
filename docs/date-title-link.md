<!--
  Módulo: periodic-date-title-link
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Date Title Link

> Módulo consolidado e padronizado sob o namespace `.periodic-date-title-link`.

---

# Date Title Link (`custom-adm/date-title-link`)

[![WordPress](https://img.shields.io/badge/WordPress-6.0+-blue.svg)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-7.4+-purple.svg)](https://php.net)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES5-yellow.svg)](https://developer.mozilla.org)
[![i18n](https://img.shields.io/badge/i18n-pt__BR%20|%20en__US%20|%20es__ES%20|%20it__IT-green.svg)](#internacionalização-i18n)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/License-GPL--2.0--or--later-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Bloco customizado para **WordPress Gutenberg** desenvolvido no padrão arquitetural dos repositórios de referência **customADM** e **periodic** (Prefeitura de São Paulo), destinado à exibição cronológica de **editais, publicações oficiais, convocações, notícias e documentos** que associam **Data, Título descritivo e URL de redirecionamento**.

---

![Screenshot Oficial](screenshot-1.png)

---

## 📌 Especificações do Bloco

* **Identificador Primário:** `custom-adm/date-title-link`
* **Identificador Moderno (Alias):** `periodic/date-title-link`
* **Categoria:** `widgets`
* **Palavras-chave:** `data`, `título`, `link`, `edital`, `notícia`

### Atributos

| Atributo | Tipo | Padrão | Descrição |
| :--- | :---: | :---: | :--- |
| `date` | `string` | `""` | Data de publicação ou evento (ex: `11/09/2026`). |
| `title` | `string` | `""` | Título descritivo do edital, notícia ou publicação. |
| `url` | `string` | `""` | Link de destino para consulta ou download do documento. |
| `targetBlank` | `boolean` | `false` | Se `true`, adiciona `target="_blank"` e `rel="noopener noreferrer"`. |

---

## 🚀 Diretrizes e Padrão de Engenharia

1. **JavaScript Vanilla / ES5 (Sem Build Step):**
   * Encapsulado em IIFE segura com namespaces globais nativos: `wp.blocks`, `wp.element`, `wp.blockEditor`, `wp.components`, `wp.i18n`.
   * Não requer Babel, Webpack, npm ou processos de compilação em produção.
2. **HTML5 Semântico & Acessibilidade:**
   * Marcação com tag `<time>` para indexação temporal precisa por motores de busca e leitores de tela.
   * Ícones informativos com `aria-hidden="true"` e estados de foco acessíveis (`:focus-visible`).
3. **InspectorControls & Canvas Interativo:**
   * Painel lateral com `TextControl` e `ToggleControl` para controle da URL e abertura em nova aba.
   * Edição inline ágil no canvas com `RichText` para título e data.
   * Feedback visual imediato no editor caso a URL ainda não tenha sido configurada.
4. **Preview no Inserter (`example`):**
   * Configuração de objeto `example` com atributos realistas simulando um edital oficial para pré-visualização instantânea no inserter de blocos do Gutenberg.

---

## 📂 Estrutura de Arquivos

```
periodic-date-title-link/
├── date-title-link.php             # Arquivo principal do plugin e registro de hooks WordPress
├── periodic-date-title-link.php    # Wrapper de entrada compatível com o nome do repositório
├── readme.txt                      # Metadados oficiais para o repositório WordPress.org
├── README.md                       # Documentação técnica completa
├── screenshot-1.png                # Imagem oficial de divulgação (1200x900px)
├── screenshot.png                  # Cópia raiz para preview
├── js/
│   └── blocks/
│       └── date-title-link.js      # Bloco Gutenberg em Vanilla ES5 (edit, save, example)
├── css/
│   ├── style.css                   # Estilização visual no front-end e canvas do editor
│   └── editor.css                  # Estilos auxiliares para o painel Inspector e editor
├── languages/                      # Arquivos de tradução compilados (.po, .mo, .json, .pot)
│   ├── custom-adm.pot
│   ├── custom-adm-pt_BR.po / .mo / .json
│   ├── custom-adm-en_US.po / .mo / .json
│   ├── custom-adm-es_ES.po / .mo / .json
│   └── custom-adm-it_IT.po / .mo / .json
└── scripts/
    ├── compile_translations.py     # Compilador autônomo de traduções GNU gettext e JSON Gutenberg
    └── generate_screenshot.py      # Gerador automatizado da imagem oficial de divulgação
```

---

## 🌍 Internacionalização (i18n)

O bloco possui internacionalização completa em **4 idiomas**:
- 🇧🇷 **Português (`pt_BR`)**
- 🇺🇸 **Inglês (`en_US`)**
- 🇪🇸 **Espanhol (`es_ES`)**
- 🇮🇹 **Italiano (`it_IT`)**

### Tabela Consolidada de Termos

| Chave / Termo Original (`custom-adm`) | 🇧🇷 Português (`pt_BR`) | 🇺🇸 Inglês (`en_US`) | 🇪🇸 Espanhol (`es_ES`) | 🇮🇹 Italiano (`it_IT`) |
| :--- | :--- | :--- | :--- | :--- |
| `Data, Título e Link` | Data, Título e Link | Date, Title and Link | Fecha, Título y Enlace | Data, Titolo e Link |
| `Exibe publicações oficiais...` | Exibe publicações oficiais, editais ou notícias com data, título descritivo e URL de redirecionamento. | Displays official notices, announcements, or news with date, descriptive title, and redirection URL. | Muestra publicaciones oficiales, convocatorias o noticias con fecha, título descriptivo y URL de redirección. | Mostra bandi ufficiali, avvisi o notizie con data, titolo descrittivo e URL di reindirizzamento. |
| `data` | data | date | fecha | data |
| `título` | título | title | título | titolo |
| `link` | link | link | enlace | link |
| `edital` | edital | notice | convocatoria | bando |
| `notícia` | notícia | news | noticia | notizia |
| `Edital de Concurso Público Nº 04/2026...` | Edital de Concurso Público Nº 04/2026 - Convocação para Provas Objetivas | Public Notice No. 04/2026 - Examination Call and Results | Convocatoria de Oposición Pública Nº 04/2026 - Llamamiento a Pruebas | Bando di Concorso Pubblico N. 04/2026 - Convocazione alle Prove |
| `Configurações do Link e Publicação` | Configurações do Link e Publicação | Link and Publication Settings | Configuración del Enlace y Publicación | Impostazioni del Link e Pubblicazione |
| `URL de Redirecionamento` | URL de Redirecionamento | Redirection URL | URL de Redirección | URL di Reindirizzamento |
| `Endereço para onde o usuário será direcionado...` | Endereço para onde o usuário será direcionado ao clicar no item. | Address where the user will be redirected when clicking the item. | Dirección a la que se dirigirá al usuario al hacer clic en el elemento. | Indirizzo a cui l'utente verrà reindirizzato facendo clic sull'elemento. |
| `Abrir link em nova aba (_blank)` | Abrir link em nova aba (_blank) | Open link in new tab (_blank) | Abrir enlace en una nueva pestaña (_blank) | Apri link in una nuova scheda (_blank) |
| `O link será aberto em uma nova guia...` | O link será aberto em uma nova guia do navegador. | The link will open in a new browser tab. | El enlace se abrirá en una nueva pestaña del navegador. | Il link verrà aperto in una nuova scheda del browser. |
| `O link será aberto na mesma página.` | O link será aberto na mesma página. | The link will open on the same page. | El enlace se abrirá en la misma página. | Il link verrà aperto nella stessa pagina. |
| `Data da Publicação / Evento` | Data da Publicação / Evento | Publication / Event Date | Fecha de Publicación / Evento | Data di Pubblicazione / Evento |
| `Ex: 11/09/2026 ou 11 de Setembro` | Ex: 11/09/2026 ou 11 de Setembro | E.g.: 2026-09-11 or September 11 | Ej: 11/09/2026 o 11 de Septiembre | Es: 11/09/2026 o 11 Settembre |
| `Você também pode editar a data...` | Você também pode editar a data diretamente no bloco. | You can also edit the date directly within the block. | También puede editar la fecha directamente en el bloque. | È inoltre possibile modificare la data direttamente nel blocco. |
| `Data (ex: 11/09/2026)` | Data (ex: 11/09/2026) | Date (e.g.: 2026-09-11) | Fecha (ej: 11/09/2026) | Data (es: 11/09/2026) |
| `Digite o título descritivo...` | Digite o título descritivo do edital, notícia ou publicação oficial... | Enter the descriptive title of the notice, news, or publication... | Escriba el título descriptivo de la convocatoria, noticia o publicación... | Inserisci il titolo descrittivo del bando, notizia o pubblicazione... |
| `URL não informada...` | URL não informada (clique para definir na barra lateral) | URL not set (click to configure in sidebar) | URL no definida (haga clic para configurar en la barra lateral) | URL non impostato (fai clic per configurare nella barra laterale) |

---

## 🛠️ Instalação e Uso

1. Clone ou baixe este repositório para o diretório de plugins do WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-date-title-link.git
   ```
2. Acesse o painel **Painel WordPress > Plugins** e ative o plugin **periodic Date Title Link**.
3. Em qualquer Post ou Página do Gutenberg, digite `/date-title-link` ou pesquise por **Data, Título e Link**.
4. Insira a Data, o Título e a URL de destino (configurando se deseja abrir em nova aba através do painel lateral).

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo [LICENSE](LICENSE) ou a [GNU General Public License](https://www.gnu.org/licenses/gpl-2.0.html) para mais informações.

**Autor:** Luiz Fernando Brogliatto Ferreira  
**Perfil WordPress:** [periodic](https://profiles.wordpress.org/periodic/)
