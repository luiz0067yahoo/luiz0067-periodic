<!--
  Module: periodic-image-destaque
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Image Destaque

> Consolidated module standardized under namespace `.periodic-image-destaque`.

---

# Periodic - Imagem de Destaque (Featured Image Banner)

[![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-ES5%20Vanilla-green.svg)](https://developer.wordpress.org/block-editor/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Bloco Gutenberg customizado para exibição de **Imagem de Destaque / Banner Promocional** no WordPress. Desenvolvido em **Vanilla JavaScript / ES5** (sem necessidade de build step, npm ou Babel), seguindo o padrão arquitetural dos blocos do ecossistema `periodic-*`.

---

## 📸 Preview e Captura de Tela

![Imagem de Destaque no Editor Gutenberg](screenshot-1.png)

### Especificações da Imagem de Divulgação (Screenshot)
- **Arquivo Oficial:** `screenshot-1.png` (disponível na raiz e em `assets/screenshot-1.png`)
- **Resolução Recomendada:** 1200 × 900 pixels (proporção padrão WordPress 4:3)
- **Conteúdo da Amostra:** Editor Gutenberg ativo com banner responsivo estilizado, imagem em alta definição, legenda inferior formatada e painel lateral (`InspectorControls`) com controles de link e acessibilidade.

---

## 🚀 Funcionalidades Principais

- **Upload & Seleção Nativa de Mídia:** Integração com o `wp.media` e componente `MediaUpload` do WordPress.
- **Inserter / Preview Realista:** Objeto `example` configurado para renderização instantânea com dados ilustrativos na janela de blocos do Gutenberg.
- **Controle de Links:**
  - Definição de URL de redirecionamento.
  - Opção para abrir em nova aba (`target="_blank"`) com inclusão automática e segura de `rel="noopener noreferrer"`.
- **Acessibilidade & SEO:** Campo dedicado para texto alternativo (`alt`), fundamental para leitores de tela e rankeamento.
- **Legenda Integrada (RichText):** Edição rápida e visual diretamente no canvas do editor.
- **Opções de Alinhamento:** Centro, Esquerda, Direita e Largura Total (*Full Width*).
- **Estilo Moderno & Responsivo:** Bordas arredondadas, sombras suaves, microanimação de escala e brilho no *hover*.
- **Sem Ferramentas de Build:** Código puro pronto para produção em qualquer ambiente WordPress.

---

## 📂 Estrutura de Arquivos

```
periodic-image-destaque/
├── image-destaque.php             # Registro no PHP, enfileiramento e textdomain
├── js/
│   └── blocks/
│       └── image-destaque.js      # Bloco Gutenberg em Vanilla ES5 (edit, save, example)
├── css/
│   └── style.css                  # Estilos responsivos para Frontend e Editor
├── assets/
│   └── screenshot-1.png           # Captura de tela oficial 1200x900px
├── languages/                     # Arquivos de tradução (POT, PO, MO, Jed JSON)
│   ├── default.pot
│   ├── pt_BR.po
│   ├── pt_BR.mo
│   ├── pt_BR.json
│   ├── en_US.po
│   ├── en_US.mo
│   ├── en_US.json
│   ├── es_ES.po
│   ├── es_ES.mo
│   ├── es_ES.json
│   ├── it_IT.po
│   ├── it_IT.mo
│   └── it_IT.json
├── screenshot-1.png               # Banner de apresentação
└── README.md                      # Documentação completa
```

---

## ⚙️ Atributos do Bloco (`periodic/image-destaque`)

| Atributo | Tipo | Padrão | Descrição |
| :--- | :---: | :---: | :--- |
| `imageUrl` | `string` | `""` | URL da imagem selecionada na biblioteca de mídia |
| `imageId` | `number` | `0` | ID do anexo no banco de dados do WordPress |
| `altText` | `string` | `""` | Texto alternativo para acessibilidade e motores de busca |
| `caption` | `string` | `""` | Legenda ou título institucional exibido na base do banner |
| `url` | `string` | `""` | Link de redirecionamento ao clicar na imagem |
| `targetBlank`| `boolean` | `false` | Se verdadeiro, abre o link em nova aba (`target="_blank"`) |
| `alignment` | `string` | `"center"` | Alinhamento do bloco: `center`, `left`, `right`, `full` |

---

## 🌍 Tabela de Internacionalização (i18n) Consolidada

O bloco utiliza o textdomain `periodic-image-destaque` com total compatibilidade com `wp_set_script_translations`.

| Termo Original (Chave) | 🇧🇷 Português (`pt_BR`) | 🇺🇸 Inglês (`en_US`) | 🇪🇸 Espanhol (`es_ES`) | 🇮🇹 Italiano (`it_IT`) |
| :--- | :--- | :--- | :--- | :--- |
| **Imagem de Destaque** | Imagem de Destaque | Featured Image Banner | Imagen Destacada | Immagine in Evidenza |
| **Exibe uma imagem principal ou banner promocional em destaque...** | Exibe uma imagem principal ou banner promocional em destaque com suporte a link, legenda e acessibilidade. | Displays a primary featured image or promotional banner with link support, caption, and accessibility options. | Muestra una imagen principal o banner promocional destacado con soporte para enlaces, subtítulos y accesibilidad. | Visualizza un'immagine principale o un banner promozionale in evidenza con suporte per link, didascalia e accessibilità. |
| **Configurações de Link** | Configurações de Link | Link Settings | Configuración del Enlace | Impostazioni Link |
| **URL de Destino** | URL de Destino | Target URL | URL de Destino | URL di Destinazione |
| **Insira a URL que será aberta...** | Insira a URL que será aberta quando o usuário clicar na imagem. | Enter the URL to be opened when the user clicks the image. | Ingrese la URL que se abrirá cuando el usuario haga clic en la imagen. | Inserisci l'URL che verrà aperto quando l'utente fa clic sull'immagine. |
| **Abrir em Nova Aba** | Abrir em Nova Aba | Open in New Tab | Abrir en Pestaña Nueva | Apri in una Nuova Scheda |
| **O link será aberto em uma nova aba do navegador.** | O link será aberto em uma nova aba do navegador. | The link will open in a new browser tab. | El enlace se abrirá en una nueva pestaña del navegador. | Il collegamento si aprirà in una nuova scheda del browser. |
| **O link será aberto na mesma aba.** | O link será aberto na mesma aba. | The link will open in the same tab. | El enlace se abrirá en la misma pestaña. | Il collegamento si aprirà nella mesma scheda. |
| **Acessibilidade e SEO** | Acessibilidade e SEO | Accessibility & SEO | Accesibilidad y SEO | Accessibilità e SEO |
| **Texto Alternativo (Alt Text)** | Texto Alternativo (Alt Text) | Alternative Text (Alt Text) | Texto Alternativo (Alt Text) | Testo Alternativo (Alt Text) |
| **Descreva a imagem para leitores de tela** | Descreva a imagem para leitores de tela | Describe the image for screen readers | Describa la imagen para lectores de pantalla | Descrivi l'immagine per gli screen reader |
| **Alinhamento e Exibição** | Alinhamento e Exibição | Alignment & Display | Alineación y Visualización | Allineamento e Visualizzazione |
| **Alinhamento do Bloco** | Alinhamento do Bloco | Block Alignment | Alineación del Bloque | Allineamento del Blocco |
| **Alinhar ao Centro** | Alinhar ao Centro | Align Center | Alinear al Centro | Allinea al Centro |
| **Alinhar à Esquerda** | Alinhar à Esquerda | Align Left | Alinear a la Izquierda | Allinea a Sinistra |
| **Alinhar à Direita** | Alinhar à Direita | Align Right | Alinear a la Derecha | Allinea a Destra |
| **Largura Total** | Largura Total | Full Width | Ancho Completo | Larghezza Massima |
| **Imagem de Destaque / Banner** | Imagem de Destaque / Banner | Featured Image / Banner | Imagen Destacada / Banner | Immagine in Evidenza / Banner |
| **Carregue ou selecione uma imagem de alta resolução...** | Carregue ou selecione uma imagem de alta resolução na biblioteca de mídia. | Upload or select a high-resolution image from your media library. | Suba o seleccione una imagen de alta resolución de la biblioteca de medios. | Carica o seleziona un'immagine ad alta risoluzione dalla libreria multimediale. |
| **Selecionar Imagem de Destaque** | Selecionar Imagem de Destaque | Select Featured Image | Seleccionar Imagen Destacada | Seleziona Immagine in Evidenza |
| **Substituir** | Substituir | Replace | Reemplazar | Sostituisci |
| **Remover** | Remover | Remove | Eliminar | Rimuovi |
| **Adicione uma legenda ou título em destaque...** | Adicione uma legenda ou título em destaque... | Add a caption or featured title... | Agregue una leyenda o título destacado... | Aggiungi una didascalia o un titolo in evidenza... |

---

## 🛠️ Instalação e Uso

1. Copie a pasta `periodic-image-destaque` para o diretório de plugins do seu WordPress:
   ```bash
   /wp-content/plugins/periodic-image-destaque/
   ```
2. No painel administrativo do WordPress, vá em **Plugins > Plugins Instalados**.
3. Localize **Periodic - Imagem de Destaque** e clique em **Ativar**.
4. Em qualquer post ou página no editor de blocos, procure pelo bloco **Imagem de Destaque** na categoria de **Mídia** e insira seu banner.

---

## 📄 Licença

Distribuído sob a licença [GPLv2 ou posterior](https://www.gnu.org/licenses/gpl-2.0.html).
