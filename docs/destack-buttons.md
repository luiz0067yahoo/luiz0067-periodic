<!--
  Módulo: periodic-destack-buttons
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Destack Buttons

> Módulo consolidado e padronizado sob o namespace `.periodic-destack-buttons`.

---

# Destack Buttons (Botões de Destaque / Acesso Rápido) 🚀

[![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block-orange.svg)](https://developer.wordpress.org/block-editor/)
[![License](https://img.shields.io/badge/License-GPLv2%2Bor%20later-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES5-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![i18n](https://img.shields.io/badge/i18n-pt__BR%20%7C%20en__US%20%7C%20es__ES%20%7C%20it__IT-purple.svg)](./languages)

Bloco customizado nativo para o WordPress Gutenberg, desenvolvido estritamente seguindo o padrão de blocos do ecossistema **customADM** e repositórios **periodic**.

Exibe uma grade moderna, flexível e responsiva de cartões/botões de destaque e atalhos rápidos (como portais de serviços municipais, telefones de emergência, ouvidoria, tributos e consultas ao cidadão).

![Destack Buttons](assets/screenshot-1.png)

---

## 📌 Especificações do Bloco

* **Identificador do Bloco:** `periodic/destack-buttons`
* **Título na UI:** Destack Buttons (Botões de Destaque)
* **Categoria:** `design` (compatível com `layout` e `common`)
* **Ícone:** `grid-view`
* **Tecnologia:** JavaScript Vanilla / ES5 puro (sem JSX, sem Babel, sem etapa de build/npm)
* **Text Domain:** `destack-buttons`
* **Estilização:** CSS puro com CSS Grid, variáveis CSS (`--destack-columns`, `--destack-gap`), sombras e microinterações de hover.

---

## ⚙️ Atributos do Bloco

| Atributo | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `columns` | `number` | `4` | Quantidade de colunas por linha (configurável de 1 a 6). |
| `buttons` | `array` | `[...]` | Lista de objetos com os botões e suas configurações individuais. |
| `buttons[].title` | `string` | `''` | Rótulo/título do botão (editável via `RichText`). |
| `buttons[].url` | `string` | `''` | URL de destino do link. |
| `buttons[].iconUrl` | `string` | `''` | URL da imagem/ícone selecionado via `MediaUpload`. |
| `buttons[].iconId` | `number` | `0` | ID do anexo na Biblioteca de Mídia do WordPress. |
| `buttons[].targetBlank` | `boolean` | `false` | Se o link deve abrir em nova aba (`target="_blank"` com `rel="noopener noreferrer"`). |

---

## 📂 Estrutura de Arquivos

```
periodic-destack-buttons/
├── destack-buttons.php           # Registro principal do plugin, hooks init e enfileiramentos
├── readme.txt                    # Cabeçalho padrão do repositório WordPress.org
├── README.md                     # Documentação completa do projeto
├── screenshot-1.png              # Screenshot de demonstração do bloco
├── assets/                       # Recursos visuais para o repositório
│   └── screenshot-1.png          # Screenshot de divulgação
├── js/
│   └── blocks/
│       └── destack-buttons.js    # Código JavaScript ES5 do bloco (edit, save, example)
├── css/
│   ├── style.css                 # Estilos frontend e editor (CSS Grid, hover, responsivo)
│   └── editor.css                # Estilos utilitários específicos do editor Gutenberg
└── languages/                    # Pacote completo de internacionalização (sem prefixo)
    ├── default.pot               # Arquivo modelo POT Gettext
    ├── pt_BR.po / .json          # Português (Brasil)
    ├── en_US.po / .json          # Inglês (EUA)
    ├── es_ES.po / .json          # Espanhol
    └── it_IT.po / .json          # Italiano
```

---

## 🌐 Tabela Completa de Internacionalização (i18n)

O bloco possui internacionalização completa em 4 idiomas com mapeamento rigoroso:

| Termo Original / Chave | 🇧🇷 Português (`pt_BR`) | 🇺🇸 Inglês (`en_US`) | 🇪🇸 Espanhol (`es_ES`) | 🇮🇹 Italiano (`it_IT`) |
| :--- | :--- | :--- | :--- | :--- |
| `Destack Buttons (Botões de Destaque)` | Destack Buttons (Botões de Destaque) | Featured Buttons (Quick Access) | Botones Destacados (Acceso Rápido) | Pulsanti in Evidenza (Accesso Rapido) |
| `Exiba uma grade de botões e atalhos rápidos com ícones, títulos e links customizados.` | Exiba uma grade de botões e atalhos rápidos com ícones, títulos e links customizados. | Display a grid of quick access buttons and cards with custom icons, titles, and links. | Muestre una cuadrícula de botones y accesos directos con iconos, títulos y enlaces personalizados. | Mostra una griglia di pulsanti e scorciatoie con icone, titoli e collegamenti personalizzati. |
| `destaque` | destaque | featured | destacado | evidenza |
| `botões` | botões | buttons | botones | pulsanti |
| `acesso rápido` | acesso rápido | quick access | acceso rápido | accesso rapido |
| `serviços` | serviços | services | servicios | servizi |
| `Configurações do Grid` | Configurações do Grid | Grid Settings | Ajustes de Cuadrícula | Impostazioni Griglia |
| `Quantidade de Colunas por Linha` | Quantidade de Colunas por Linha | Columns per Row | Columnas per Fila | Colonne per Riga |
| `Ajuste a quantidade de botões exibidos por linha em telas grandes.` | Ajuste a quantidade de botões exibidos por linha em telas grandes. | Adjust the number of buttons displayed per row on large screens. | Ajuste el número de botones mostrados por fila en pantallas grandes. | Regola il numero di pulsanti visualizzati per riga su schermi grandi. |
| `Adicionar Botão` | Adicionar Botão | Add Button | Añadir Botón | Aggiungi Pulsante |
| `Gerenciador de Links e Atalhos` | Gerenciador de Links e Atalhos | Links & Shortcuts Manager | Gestor de Enlaces y Accesos Directos | Gestione Collegamenti e Scorciatoie |
| `Sem título` | Sem título | Untitled | Sin título | Senza titolo |
| `Mover para cima` | Mover para cima | Move up | Mover hacia arriba | Sposta in alto |
| `Mover para baixo` | Mover para baixo | Move down | Mover hacia abajo | Sposta in basso |
| `Mover para a esquerda` | Mover para a esquerda | Move left | Mover a la izquierda | Sposta a sinistra |
| `Mover para a direita` | Mover para a direita | Move right | Mover a la derecha | Sposta a destra |
| `Excluir botão` | Excluir botão | Delete button | Eliminar botón | Elimina pulsante |
| `URL de Destino` | URL de Destino | Destination URL | URL de Destino | URL di Destinazione |
| `Abrir em nova aba` | Abrir em nova aba | Open in new tab | Abrir en pestaña nueva | Apri in una nuova scheda |
| `Botões de Destaque` | Botões de Destaque | Featured Buttons | Botones Destacados | Pulsanti in Evidenza |
| `Ícone do botão` | Ícone do botão | Button icon | Icono del botón | Icona del pulsante |
| `Alterar ícone` | Alterar ícone | Change icon | Cambiar icono | Modifica icona |
| `Trocar` | Trocar | Replace | Reemplazar | Sostituisci |
| `Remover ícone` | Remover ícone | Remove icon | Eliminar icono | Rimuovi icona |
| `Remover` | Remover | Remove | Eliminar | Rimuovi |
| `Escolha uma imagem ou ícone` | Escolha uma imagem ou ícone | Choose an image or icon | Elija una imagen o icono | Scegli un'immagine o un'icona |
| `Inserir Ícone` | Inserir Ícone | Insert Icon | Insertar Icono | Inserisci Icona |
| `Nome do Botão...` | Nome do Botão... | Button Label... | Título del Botón... | Nome del Pulsante... |
| `https://link-de-destino...` | https://link-de-destino... | https://destination-url... | https://enlace-destino... | https://collegamento-destinazione... |
| `Abre em nova aba (ativo)` | Abre em nova aba (ativo) | Opens in new tab (active) | Abre en pestaña nueva (activo) | Si apre in una nuova scheda (attivo) |
| `Abrir em mesma aba` | Abrir em mesma aba | Open in same tab | Abrir en la mesma pestaña | Apri nella stessa scheda |

---

## 📸 Demonstração / Screenshot

![Demonstração do Destack Buttons](assets/screenshot-1.png)

Para a divulgação e inclusão no diretório do WordPress, utilize o arquivo:
* **Arquivo:** `assets/screenshot-1.png` / `screenshot-1.png`
* **Resolução Recomendada:** `1200 x 900 px` (proporção 4:3)
* **Conteúdo da Imagem:**
  - Demonstração visual do bloco no editor Gutenberg (mostrando a barra de colunas, botões com ícones vetoriais coloridos e painel do InspectorControls à direita).
  - Simulação de visualização em um portal de prefeitura (ex: botões de *IPTU*, *Transparência*, *Ouvidoria* e *Telefones Úteis* com estados normais e hover).

---

## 🛠️ Instalação e Ativação

1. Clone ou faça o download deste repositório na pasta de plugins do WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-destack-buttons.git
   ```
2. Acesse o painel **Painel WordPress > Plugins** e clique em **Ativar** em *Destack Buttons (Botões de Destaque)*.
3. Abra uma página ou post, adicione o bloco digitando `/destack` ou `/botoes` e configure seus atalhos!

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo de licença para mais informações.
