<!--
  Module: periodic-buttons-banner
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Buttons Banner

> Consolidated module standardized under namespace `.periodic-buttons-banner`.

---

# periodic Buttons Banner

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![Tested Up To](https://img.shields.io/badge/Tested%20Up%20To-7.1-green.svg)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)](https://php.net)
[![License](https://img.shields.io/badge/License-GPLv2%2B-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES5%20Vanilla-yellow.svg)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![i18n](https://img.shields.io/badge/i18n-pt__BR%20%7C%20en__US%20%7C%20es__ES%20%7C%20it__IT-brightgreen.svg)](https://make.wordpress.org/polyglots/)

Bloco Gutenberg customizado para **Botões Banner (Buttons Banner)** desenvolvido estritamente em **JavaScript Vanilla / ES5** (`wp.element.createElement`), sem JSX e sem etapas de compilação (*zero build step*).

Projetado para prefeituras, órgãos governamentais, portais corporativos e sites institucionais, suporta de **1 a 5 botões responsivos por linha**, logotipos personalizáveis via biblioteca nativa do WordPress (`wp.media`), descrições ricas com `RichText`, siglas/títulos em alto contraste e total compatibilidade retroativa com o bloco legado `cms-adm/buttons-banner` do projeto **customADM / Prefeitura**.

---

![Screenshot do Bloco periodic Buttons Banner](screenshot.png)

---

## 🚀 Principais Recursos

- **Padrão Vanilla ES5 / Sem Build Step**: Não requer Node.js, Webpack, Babel ou `npm run build` para funcionar. Funciona imediatamente ao ser instalado.
- **Flexibilidade de Colunas (1 a 5 botões)**: Ajuste fácil da quantidade de botões por linha através da barra lateral do Gutenberg (`InspectorControls`).
- **Logotipos e Ícones com Upload Nativo**: Integração direta com o modal de mídia nativo do WordPress (`wp.media`) para envio ou troca de logos em cada botão.
- **Descrições Ricas (`RichText`)**: Edição direta no canvas do editor com suporte a quebras de linha e formatação.
- **Sigla / Título de Identificação**: Campo inferior em destaque com alto contraste e estilo clássico de botão governamental.
- **Links Rápidos e Controle `_blank`**: Configuração inline rápida do link (`URL`) ou via painel lateral, com opção de abrir em nova aba (`target="_blank"` com `rel="noopener noreferrer"`).
- **Temas Visuais Embutidos**:
  - *Padrão Prefeitura* (Gradiente Verde `#01913a` e Azul `#233e95`)
  - *Verde Institucional*
  - *Azul Corporativo*
  - *Dark Mode*
  - *Contorno (Outline)*
- **Paleta de Cores Personalizável**: Seletor de cores nativo do WordPress (`ColorPalette`) para customizar a tonalidade de destaque de cada linha de botões.
- **Ações Rápidas no Canvas**: Botões flutuantes `+` e `-` para adicionar e remover itens diretamente no editor visual.
- **Preview Nativo no Inseridor**: Suporte à propriedade `example` para pré-visualização instantânea na biblioteca de blocos.
- **Internacionalização Completa (i18n)**: Suporte nativo a 4 idiomas:
  - 🇧🇷 Português do Brasil (`pt_BR`)
  - 🇺🇸 Inglês (`en_US`)
  - 🇪🇸 Espanhol (`es_ES`)
  - 🇮🇹 Italiano (`it_IT`)
- **Retrocompatibilidade Garantida**: Suporte duplo de registro (`periodic/buttons-banner` e `cms-adm/buttons-banner`) com definição `deprecated` para evitar mensagens de erro em blocos antigos já salvos no banco de dados.

---

## 📁 Estrutura de Arquivos

```text
periodic-buttons-banner/
├── assets/
│   ├── css/
│   │   ├── editor.css                      # Estilos exclusivos da interface administrativa do Gutenberg
│   │   └── style.css                       # Estilos compartilhados para o frontend e canvas do editor
│   └── js/
│       └── buttons-banner.js               # Lógica do bloco em JavaScript Vanilla ES5 (createElement)
├── languages/
│   ├── periodic-buttons-banner.pot         # Template Gettext oficial
│   ├── periodic-buttons-banner-pt_BR.po    # Dicionário PO em Português
│   ├── periodic-buttons-banner-pt_BR.mo    # Binário compilado Gettext (pt_BR)
│   ├── periodic-buttons-banner-pt_BR.json  # Formato JED para Gutenberg (pt_BR)
│   ├── periodic-buttons-banner-en_US.po    # Dicionário PO em Inglês
│   ├── periodic-buttons-banner-en_US.mo    # Binário compilado Gettext (en_US)
│   ├── periodic-buttons-banner-en_US.json  # Formato JED para Gutenberg (en_US)
│   ├── periodic-buttons-banner-es_ES.po    # Dicionário PO em Espanhol
│   ├── periodic-buttons-banner-es_ES.mo    # Binário compilado Gettext (es_ES)
│   ├── periodic-buttons-banner-es_ES.json  # Formato JED para Gutenberg (es_ES)
│   ├── periodic-buttons-banner-it_IT.po    # Dicionário PO em Italiano
│   ├── periodic-buttons-banner-it_IT.mo    # Binário compilado Gettext (it_IT)
│   └── periodic-buttons-banner-it_IT.json  # Formato JED para Gutenberg (it_IT)
├── scripts/
│   └── generate_screenshot.py              # Script automatizado para geração do screenshot.png (1200x900)
├── periodic-buttons-banner.php             # Arquivo principal do plugin WordPress
├── registro.php                            # Enfileiramento, compatibilidade e registro do bloco
├── screenshot.png                          # Imagem oficial de preview (1200x900px)
└── README.md                               # Documentação completa
```

---

## 💻 Instalação

1. Baixe ou clone este repositório para a pasta de plugins do seu WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-buttons-banner.git
   ```
2. Acesse o painel administrativo do WordPress: **Plugins > Plugins Instalados**.
3. Localize **periodic Buttons Banner** e clique em **Ativar**.
4. Abra qualquer Post ou Página no editor de blocos e pesquise por **Botões Banner** ou `periodic/buttons-banner`.

---

## 🛠️ Detalhes da Arquitetura

### 1. JavaScript Vanilla / ES5 (`buttons-banner.js`)
O bloco é envolvido em uma IIFE protegida que recebe as variáveis globais do WordPress:
```javascript
(function (blocks, element, blockEditor, components, i18n) {
    'use strict';
    var el = element.createElement;
    // ...
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.blockEditor || window.wp.editor,
    window.wp.components,
    window.wp.i18n
);
```

### 2. Registro e Enfileiramento (`registro.php`)
Os assets são enfileirados utilizando as melhores práticas do WordPress:
- `enqueue_block_assets`: Registra e carrega `assets/css/style.css` tanto no frontend quanto no editor.
- `enqueue_block_editor_assets`: Carrega `assets/js/buttons-banner.js`, `assets/css/editor.css` e registra as traduções via `wp_set_script_translations`.
- `init`: Registra `periodic/buttons-banner` e `cms-adm/buttons-banner` através de `register_block_type()`.

---

## 🌍 Gerando e Compilando Traduções

O projeto já inclui todos os arquivos `.pot`, `.po`, `.mo` e `.json` compilados. Caso queira adicionar novas frases ou recompilar:
```bash
python scratch/build_i18n.py
```

---

## 📸 Gerando o Screenshot Oficial

Para regerar o `screenshot.png` em alta definição (1200x900px):
```bash
python scripts/generate_screenshot.py
```

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo de licença do WordPress para mais detalhes.

**Autor**: Luiz Fernando Brogliatto Ferreira  
**Perfil**: [profiles.wordpress.org/periodic](https://profiles.wordpress.org/periodic/)
