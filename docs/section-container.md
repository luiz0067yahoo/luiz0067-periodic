<!--
  Module: periodic-section-container
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Section Container

> Consolidated module standardized under namespace `.periodic-section-container`.

---

# periodic Section Container 📦

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952b3.svg?logo=bootstrap)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.5.2-528DD7.svg?logo=fontawesome)](https://fontawesome.com)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin WordPress moderno e intuitivo que introduz um bloco nativo do **Gutenberg** para criação e gerenciamento de seções e contêineres responsivos com **Bootstrap 5.3**, suporte completo a `<InnerBlocks />` (permitindo abrigar qualquer outro bloco nativo ou de terceiros), painel lateral modularizado (*InspectorControls*) em abas, controle de imagens de fundo com sobreposição (*overlay*) e ícones **Font Awesome 6**.

---

## 📸 Screenshots e Demonstração Visual

| Editor Gutenberg (Edição WYSIWYG) | Painel Lateral (Abas de Configuração) | Frontend Responsivo (Bootstrap 5) |
| :---: | :---: | :---: |
| ![Gutenberg Editor](assets/screenshots/screenshot-editor.png) | ![Inspector Controls](assets/screenshots/screenshot-inspector.png) | ![Frontend Preview](assets/screenshots/screenshot-frontend.png) |

> **Nota:** Consulte a seção [Guia de Captura de Screenshots](#-guia-de-captura-de-screenshots) para instruções passo a passo de como registrar as telas em cada contexto do painel lateral.

---

## 🚀 Principais Recursos

- **100% WYSIWYG (Fidelidade Visual Absoluta)**: O que você visualiza e ajusta na tela do editor Gutenberg reflete exatamente a renderização final do frontend, incluindo larguras de contêiner, cores sólidas, gradientes e imagens de fundo com opacidade de overlay.
- **Suporte Total a `<InnerBlocks />`**: Permite aninhar qualquer bloco Gutenberg dentro do contêiner (títulos, parágrafos, botões, colunas, imagens, acordeões, formulários e blocos dinâmicos) com recurso nativo de arrastar e soltar (*drag-and-drop*).
- **Três Modos de Contêiner Bootstrap 5**:
  - **Contêiner Padrão (`.container`)**: Largura máxima fixa e centralizada que se ajusta aos breakpoints responsivos do Bootstrap 5 (`sm`, `md`, `lg`, `xl`, `xxl`).
  - **Contêiner Fluido (`.container-fluid`)**: Ocupa 100% da largura horizontal disponível da tela, mantendo o espaçamento interno lateral (*gutters*) padrão.
  - **Largura Total sem Calhas (`full-width-no-gutters`)**: Ocupa 100% da largura de ponta a ponta sem recuos horizontais laterais (`.container-fluid.p-0`), ideal para faixas, heros e banners modernos.
- **Camada de Sobreposição (*Overlay*) Inteligente**: Adicione imagens de fundo fotográficas com controle deslizante de opacidade (0% a 100%) e seletor de cor, garantindo contraste impecável para textos brancos ou escuros (conformidade com WCAG de acessibilidade).
- **Semântica HTML Configurável**: Permite alternar o elemento HTML do contêiner entre `<section>`, `<div>`, `<article>`, `<aside>`, `<header>` ou `<footer>` para máxima otimização técnica de SEO e acessibilidade.
- **Sistema de Espaçamento Bootstrap 5**: Controle visual direto de *paddings* superiores e inferiores (`pt-0` a `pt-5` e `py-1` a `py-5`) e *margens* (`mt-0` a `mt-5`, `mb-0` a `mb-5` e `my-0` a `my-5`).
- **Internacionalização Completa (i18n)**: Traduzido em 4 idiomas: **Português do Brasil (pt-BR)**, **Inglês (en-US)**, **Espanhol (es)** e **Italiano (it)**, com página de opções no menu WordPress (`Configurações > periodic Section Container`).
- **Autonomia Total sem Dependência de CDN**: Carrega cópias locais e otimizadas do **Bootstrap 5.3.8** e do **Font Awesome 6.5.2**, funcionando perfeitamente em ambientes locais, intranets e servidores de alta segurança.

---

## 🎛️ Documentação Minuciosa do Painel Lateral (InspectorControls)

O painel de configurações lateral foi projetado com uma interface organizada em **3 abas temáticas**:

```
┌─────────────────────────────────────────────────────────────┐
│  [ Layout ]          [ Fundo ]          [ Espaçamento ]     │
└─────────────────────────────────────────────────────────────┘
```

### 1. Aba "Layout"
Dedicada à estrutura espacial, limites de largura e semântica do contêiner.

| Campo / Controle | Tipo | Opções / Valores | Descrição e Finalidade |
| :--- | :--- | :--- | :--- |
| **Tipo de Container** | Seleção (`SelectControl`) | • `container`<br>• `container-fluid`<br>• `full-width-no-gutters` | Define a classe Bootstrap aplicada ao contêiner interno que envolve os `<InnerBlocks />`. |
| **Tag Semântica HTML** | Seleção (`SelectControl`) | • `<section>`<br>• `<div>`<br>• `<article>`<br>• `<aside>`<br>• `<header>`<br>• `<footer>` | Permite definir o elemento semântico que envolverá a seção no DOM gerado, melhorando o SEO. |
| **Altura Mínima CSS** | Texto (`TextControl`) | Ex: `450px`, `60vh`, `80vh` | Aplica uma altura mínima (*min-height*) inline à seção, garantindo área visual mesmo antes de inserir blocos. |
| **Margem Superior** | Seleção (`SelectControl`) | `none`, `mt-0` a `mt-5`, `my-0` a `my-5` | Define o espaçamento externo superior de acordo com a escala oficial do Bootstrap 5. |
| **Margem Inferior** | Seleção (`SelectControl`) | `none`, `mb-0` a `mb-5` | Define o espaçamento externo inferior de acordo com a escala oficial do Bootstrap 5. |

---

### 2. Aba "Fundo"
Dedicada ao controle estético de cores, gradientes e mídias de fundo.

| Campo / Controle | Tipo | Descrição e Finalidade |
| :--- | :--- | :--- |
| **Cor de Fundo Sólida** | Paleta de Cores (`ColorPalette`) | Aplica uma cor de fundo sólida à seção (paleta com cores do tema e personalização livre). |
| **Gradiente de Fundo** | Seletor de Gradiente (`GradientPicker`) | Permite criar ou escolher gradientes lineares e radiais para fundos modernos de alto impacto. |
| **Imagem de Fundo** | Mídia WordPress (`MediaUpload`) | Permite selecionar ou enviar qualquer imagem da Biblioteca de Mídia do WordPress com pré-visualização instantânea e botão para remover/substituir. |
| **Cor da Sobreposição (Overlay)** | Paleta de Cores (`ColorPalette`) | Define a cor da camada de película posicionada sobre a imagem de fundo. |
| **Opacidade da Sobreposição** | Barra Deslizante (`RangeControl`) | Ajusta a opacidade do overlay de **0%** a **100%** com incrementos de 5%, garantindo legibilidade do texto. |
| **Cor Geral do Texto** | Paleta de Cores (`ColorPalette`) | Define a cor padrão herdada por todos os blocos de texto inseridos no interior da seção. |

---

### 3. Aba "Espaçamento"
Dedicada ao preenchimento interno (*padding*) da seção, seguindo fielmente a métrica do Bootstrap 5.

| Campo / Controle | Tipo | Valores Disponíveis | Referência em rem / px |
| :--- | :--- | :--- | :--- |
| **Padding Superior** | Seleção (`SelectControl`) | `pt-0` a `pt-5`<br>`py-1` a `py-5` | • Nível 0: `0rem` (`0px`)<br>• Nível 1: `0.25rem` (`4px`)<br>• Nível 2: `0.5rem` (`8px`)<br>• Nível 3: `1rem` (`16px`)<br>• Nível 4: `1.5rem` (`24px`)<br>• Nível 5: `3rem` (`48px`) |
| **Padding Inferior** | Seleção (`SelectControl`) | `pb-0` a `pb-5` | Idem à escala acima para a borda inferior. |
| **Tabela Informativa** | Bloco Visual Informativo | Exibe no próprio painel a equivalência de cada nível do Bootstrap para consulta ágil do editor. |

---

## 📸 Guia de Captura de Screenshots

Para manter a documentação visual sempre atualizada e no padrão do repositório, armazene as capturas na pasta `assets/screenshots/` com os seguintes nomes de arquivo:

1. `screenshot-editor.png`:
   - **Cenário**: Tela do editor Gutenberg com o bloco inserido, exibindo a demarcação visual tracejada, o badge superior "Seção Bootstrap 5" e blocos internos adicionados (ex: título H2 e parágrafo).
   - **Instrução**: Selecione o contêiner no editor e realize a captura da área de trabalho do Gutenberg.

2. `screenshot-inspector.png`:
   - **Cenário**: Barra lateral direita do editor exibindo o painel *InspectorControls*, alternando entre as abas **Layout**, **Fundo** e **Espaçamento**.
   - **Instrução**: Capture a barra lateral aberta focando nos controles das abas e no slider de opacidade de overlay.

3. `screenshot-frontend.png`:
   - **Cenário**: Visualização da página publicada em um navegador web, demonstrando a responsividade do Bootstrap 5 com imagem de fundo, overlay e conteúdo centralizado em `.container`.
   - **Instrução**: Abra a página no modo de visualização ou publicação e capture a seção em exibição real.

4. `screenshot-tab-layout.png` (Opcional detalhada): Captura focada na aba "Layout".
5. `screenshot-tab-background.png` (Opcional detalhada): Captura focada na aba "Fundo".
6. `screenshot-tab-spacing.png` (Opcional detalhada): Captura focada na aba "Espaçamento".

---

## 📂 Estrutura do Projeto

```
periodic-section-container/
├── assets/
│   ├── bootstrap/
│   │   ├── css/bootstrap.min.css        # Folha de estilo Bootstrap 5.3.8
│   │   └── js/bootstrap.bundle.min.js   # Script Bootstrap 5.3.8 (com Popper)
│   ├── fontawesome/
│   │   ├── css/all.min.css              # Font Awesome 6.5.2 CSS
│   │   └── webfonts/                    # Arquivos de fontes e ícones WOFF2/TTF
│   └── screenshots/                     # Diretório de capturas e documentação visual
│       ├── screenshot-editor.png
│       ├── screenshot-inspector.png
│       └── screenshot-frontend.png
├── languages/
│   ├── pt-br.json                       # Dicionário Português do Brasil
│   ├── en-us.json                       # Dicionário Inglês (EUA)
│   ├── it.json                          # Dicionário Italiano
│   └── es.json                          # Dicionário Espanhol
├── src/
│   ├── index.js                         # Ponto de entrada e registro do bloco
│   ├── edit.js                          # Componente de edição WYSIWYG e InspectorControls
│   ├── save.js                          # Renderização semântica estática HTML
│   ├── i18n.js                          # Módulo auxiliar de internacionalização
│   ├── editor.scss                      # Estilos exclusivos do editor Gutenberg
│   └── style.scss                       # Estilos compartilhados e frontend
├── build/                               # Arquivos compilados para produção
│   ├── index.js
│   ├── index.asset.php
│   ├── index.css
│   └── style-index.css
├── block.json                           # Metadados do bloco Gutenberg (API v3)
├── periodic-section-container.php       # Arquivo principal do plugin WordPress
├── package.json                         # Configurações do NPM e scripts de compilação
└── readme.md                            # Documentação técnica e manual de uso
```

---

## 🛠️ Comandos de Desenvolvimento e Build

O plugin utiliza a ferramenta oficial `@wordpress/scripts`:

```bash
# Instalação das dependências
npm install

# Compilação de desenvolvimento com monitoramento contínuo (Watch)
npm start

# Compilação otimizada para produção
npm run build
```

---

## 👤 Metadados de Autoria

- **Autor:** Luiz Fernando Brogliatto Ferreira
- **Perfil WordPress.org:** [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub:** [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn:** [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Distribuído sob a licença **GPL v2 ou posterior**. Consulte o arquivo de licença ou o cabeçalho do código para mais detalhes.
