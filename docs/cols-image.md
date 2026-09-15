<!--
  Módulo: periodic-cols-image
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Cols Image

> Módulo consolidado e padronizado sob o namespace `.periodic-cols-image`.

---

# periodic Columns Image (Imagem em Colunas)

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4.svg)](https://www.php.net)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block-black.svg)](https://wordpress.org/gutenberg/)
[![Licença: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![i18n](https://img.shields.io/badge/i18n-pt__BR%20%7C%20en__US%20%7C%20es__ES%20%7C%20it__IT-orange.svg)](languages/)

> Bloco Gutenberg nativo para WordPress para exibição de galerias e cards de imagens responsivos em múltiplas colunas, com títulos, descrições, sobreposições escuras e controles completos no painel Inspetor.

---

## 📸 Demonstração / Screenshot

![Visualização do Bloco Imagem em Colunas no Editor Gutenberg](screenshot-1.png)

---

## 📖 Descrição

O **periodic Columns Image (Imagem em Colunas)** é um plugin WordPress leve, moderno e elegante que fornece um bloco Gutenberg nativo para criar grades de imagens interativas e responsivas. Cada coluna conta com suporte a títulos, descrições, efeitos suaves ao passar o mouse (*hover*) e camada de máscara escura configurável para garantir máxima legibilidade do texto.

---

## ✨ Recursos Principais

- ⚡ **Zero Build Step (Vanilla JS Puro)**: Desenvolvido utilizando diretamente a API nativa do Gutenberg com `wp.element.createElement` — sem necessidade de compilação, NPM, Webpack ou Babel.
- 📱 **Grade Responsiva**: Suporte a 1, 2, 3 ou 4 colunas com quebra e adaptação automática para telas de tablets e celulares.
- 🎛️ **Controles no Inspetor (Sidebar)**:
  - Ajuste de **altura dos cards** em pixels (`cardHeight`).
  - Controle deslizante da **opacidade da máscara escura** (`overlayOpacity`).
  - Ativação/desativação de **bordas arredondadas** (`roundedCorners`).
  - Definição da quantidade de colunas diretamente no painel lateral.
- 🖼️ **Envio de Mídia Nativo**: Integração direta com o modal da Biblioteca de Mídia do WordPress (`MediaUpload`) para selecionar ou fazer upload de fotos com facilidade.
- ✍️ **Edição em Tempo Real (RichText)**: Edite títulos e descrições diretamente na tela do editor com suporte a digitação imediata.
- 🔄 **Reordenação e Gerenciamento Fácil**:
  - Botões para mover colunas para a esquerda ou direita.
  - Botão para adicionar novas colunas dinamicamente.
  - Botão para excluir colunas indesejadas.
- 👁️ **Live Inserter Preview**: Atributos nativos de exemplo (`example`) integrados para visualização prévia instantânea ao navegar pelo catálogo de blocos do WordPress.
- 🌐 **Internacionalização Completa (i18n)**: Totalmente traduzido e preparado para 4 idiomas:
  - 🇧🇷 Português do Brasil (`pt_BR`)
  - 🇺🇸 Inglês (`en_US`)
  - 🇪🇸 Espanhol (`es_ES`)
  - 🇮🇹 Italiano (`it_IT`)

---

## 🚀 Instalação

### Método 1: Via Painel do WordPress
1. Baixe o repositório como arquivo `.zip`.
2. No painel do WordPress, vá em **Plugins** > **Adicionar Novo** > **Enviar Plugin**.
3. Selecione o arquivo `.zip` e clique em **Instalar Agora**.
4. Clique em **Ativar Plugin**.

### Método 2: Manual (FTP / Diretório de Plugins)
1. Extraia a pasta `periodic-cols-image` para o diretório `/wp-content/plugins/` da sua instalação do WordPress.
2. Acesse o painel administrativo do WordPress, navegue até **Plugins** e clique em **Ativar** sob **periodic Columns Image (Imagem em Colunas)**.

---

## 🎯 Como Usar

1. Crie ou edite uma **Página** ou **Post** no editor de blocos (Gutenberg).
2. Clique no botão **+** (Adicionar Bloco) e pesquise por **"Imagem em Colunas"** (ou *"Columns Image"*).
3. Insira o bloco na página.
4. Clique no ícone de câmera em qualquer coluna para selecionar uma imagem da sua biblioteca de mídia.
5. Clique sobre o texto para editar o **Título** e a **Descrição** de cada item.
6. Utilize os botões de ação sobre cada coluna para:
   - 📷 Alterar a imagem
   - ⬅️ Mover para a esquerda
   - ➡️ Mover para a direita
   - 🗑️ Remover a coluna
7. No painel lateral direito (**Bloco / Inspetor**), ajuste a quantidade de colunas, altura dos cards e opacidade da máscara conforme sua preferência.
8. Salve ou publique a página!

---

## 📁 Estrutura de Arquivos

```
periodic-cols-image/
├── assets/
│   └── screenshot-1.png       # Captura de tela para documentação/repositório
├── css/
│   ├── editor.css             # Estilos exclusivos do editor Gutenberg
│   └── style.css              # Estilos compartilhados (Frontend + Editor)
├── js/
│   └── blocks/
│       └── cols-image.js      # Lógica do bloco Gutenberg em JavaScript puro
├── languages/                 # Arquivos de tradução JSON (i18n)
│   ├── custom-adm-en_US.json
│   ├── custom-adm-es_ES.json
│   ├── custom-adm-it_IT.json
│   └── custom-adm-pt_BR.json
├── periodic-cols-image.php    # Arquivo principal do plugin WordPress
├── readme.txt                 # Documentação no padrão WordPress.org
├── README.md                  # Documentação em Português para o GitHub
└── screenshot-1.png           # Captura de tela raiz
```

---

## ⚙️ Requisitos

- **WordPress:** 6.0 ou superior (testado até 7.1)
- **PHP:** 7.4 ou superior
- **Navegadores:** Todos os navegadores modernos com suporte a CSS Flexbox/Grid

---

## 📄 Licença

Este projeto está licenciado sob os termos da licença [GPLv2 ou posterior](https://www.gnu.org/licenses/gpl-2.0.html).

---

## 👨‍💻 Autor

Desenvolvido por **Luiz Fernando Brogliatto Ferreira** ([@periodicyahoo](https://github.com/periodicyahoo)).
