<!--
  Módulo: periodic-tabs
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Tabs

> Módulo consolidado e padronizado sob o namespace `.periodic-tabs`.

---

# Periodic Tabs (Bootstrap 5 & Font Awesome 6)

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-green.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-orange.svg)](https://fontawesome.com)
[![License](https://img.shields.io/badge/License-GPL--2.0--or--later-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin de bloco nativo para o editor Gutenberg do WordPress (**periodic/tabs**), desenvolvido com fidelidade absoluta aos padrões semânticos do **Bootstrap 5**, integração completa com **Font Awesome 6**, arquitetura moderna `block.json` (API v3), suporte a React JSX e renderização WYSIWYG em tempo real.

---

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Painel Lateral (InspectorControls) em Detalhes](#painel-lateral-inspectorcontrols-em-detalhes)
  - [1. Aba "Itens de Aba"](#1-aba-itens-de-aba)
  - [2. Aba "Estilo Visual"](#2-aba-estilo-visual)
  - [3. Aba "Ícones"](#3-aba-ícones)
- [Galeria de Telas e Screenshots](#galeria-de-telas-e-screenshots)
- [Instruções para Captura de Screenshots](#instruções-para-captura-de-screenshots)
- [Internacionalização (i18n)](#internacionalização-i18n)
- [Instalação e Compilação](#instalação-e-compilação)
- [Autoria e Créditos](#autoria-e-créditos)

---

## Visão Geral

O **Periodic Tabs** oferece aos criadores de conteúdo e desenvolvedores uma solução robusta, flexível e elegante para organizar informações complexas em guias de alternância. O bloco suporta layout horizontal clássico ou menu lateral vertical, além de estilos em abas tradicionais (`nav-tabs`) e botões destacados no estilo pílulas (`nav-pills`).

---

## Funcionalidades Principais

- **Bootstrap 5 Semântico e Nativo**: Gera marcação limpa com `ul.nav`, `li.nav-item`, `button.nav-link`, `div.tab-content` e `div.tab-pane` utilizando atributos oficiais `data-bs-toggle="tab"` e `data-bs-toggle="pill"`.
- **Alternância WYSIWYG em Tempo Real no Editor**: Permite navegar entre as abas e editar títulos e conteúdos diretamente no canvas do Gutenberg, sem sobreposição de textos ou perda de estado.
- **Modos de Exibição**:
  - **Abas Tradicionais (`nav-tabs`)**: Linhas de cabeçalho com bordas conectadas ao painel.
  - **Pílulas Modernas (`nav-pills`)**: Botões elegantes com cantos arredondados e preenchimento sólido.
- **Orientação Flexível**:
  - **Horizontal**: Navegação clássica na parte superior do bloco.
  - **Vertical**: Barra de guias na lateral esquerda (`d-md-flex align-items-start`) com painel responsivo.
- **Biblioteca Font Awesome 6 Integrada**: Inserção rápida de ícones para cada guia com campo de classe personalizada e botões com sugestões instantâneas.
- **Frontend Resiliente (`view.js`)**: Mecanismo inteligente de inicialização do Bootstrap Tab associado a um fallback nativo em JavaScript vanilla, garantindo funcionamento impecável mesmo em temas que não incluam os scripts do Bootstrap.
- **Internacionalização Pronta**: Suporte a 4 idiomas (Português do Brasil, Inglês, Italiano e Espanhol).

---

## Estrutura do Projeto

```
periodic-tabs/
├── .gitignore
├── package.json
├── webpack.config.js
├── block.json
├── periodic-tabs.php
├── src/
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── view.js
│   ├── editor.scss
│   └── style.scss
├── build/
│   ├── index.js
│   ├── index.css
│   ├── index.asset.php
│   ├── style-index.css
│   ├── view.js
│   └── view.asset.php
├── languages/
│   ├── pt-br.json
│   ├── en-us.json
│   ├── it.json
│   └── es.json
├── assets/
│   └── screenshots/
│       ├── 01-tab-items.png
│       ├── 02-visual-style.png
│       ├── 03-icons-config.png
│       └── 04-frontend-preview.png
└── readme.md
```

---

## Painel Lateral (InspectorControls) em Detalhes

O bloco implementa o componente `TabPanel` oficial do WordPress, organizando os controles de forma modular em três abas especializadas:

### 1. Aba "Itens de Aba"
Dedicada à gestão de estrutura e hierarquia das guias:
- **Botão "Adicionar Nova Aba"**: Insere instantaneamente uma nova guia com identificador único (`luiz-tab-timestamp`), título sequencial e conteúdo inicial.
- **Reordenação Dinâmica**: Botões direcionais para mover qualquer guia para cima ou para baixo na ordem de renderização.
- **Edição Direta do Título**: Campo de texto para ajustar o nome da guia no painel ou diretamente pelo editor visual.
- **Exclusão Segura**: Permite excluir qualquer guia, mantendo sempre no mínimo uma aba ativa para preservar a integridade do layout.
- **Seleção Ativa**: Permite focar a aba desejada para edição imediata no editor Gutenberg.

### 2. Aba "Estilo Visual"
Configurações cosméticas e de arquitetura visual:
- **Estilo de Exibição**: Alterna entre **Abas (`nav-tabs`)** e **Pílulas (`nav-pills`)**.
- **Alinhamento / Orientação**: Alterna entre **Horizontal** (padrão) e **Vertical** (layout com barra lateral `flex-column`).
- **Cor de Destaque da Aba Ativa**: Paleta de cores selecionadas (Azul Primário, Índigo Moderno, Roxo Nobre, Verde Sucesso, Vermelho Perigo, Grafite Escuro, etc.) injetada via variável CSS (`--periodic-tab-active-color`).

### 3. Aba "Ícones"
Configuração avançada de elementos visuais do Font Awesome 6:
- **Seletor de Aba**: Dropdown para selecionar a qual guia os ícones serão atribuídos.
- **Pré-visualização do Ícone**: Caixa visual com feedback instantâneo do ícone configurado.
- **Campo de Classe CSS**: Entrada direta para qualquer classe Font Awesome 6 (ex.: `fas fa-book`, `fas fa-layer-group`, `fas fa-star`, `far fa-heart`).
- **Sugestões Rápidas**: Botões de um clique com ícones comuns (Pasta, Estrela, Configurações, Livro, Verificado, Informações).
- **Botão "Remover Ícone"**: Limpa o ícone da guia selecionada mantendo apenas o texto.

---

## Galeria de Telas e Screenshots

| Aba / Tela | Imagem Demonstrativa |
| :--- | :--- |
| **01. Itens de Aba** | ![Itens de Aba](assets/screenshots/01-tab-items.png) |
| **02. Estilo Visual** | ![Estilo Visual](assets/screenshots/02-visual-style.png) |
| **03. Ícones Font Awesome** | ![Ícones Font Awesome](assets/screenshots/03-icons-config.png) |
| **04. Frontend Preview** | ![Frontend Preview](assets/screenshots/04-frontend-preview.png) |

---

## Instruções para Captura de Screenshots

Caso deseje atualizar as capturas de tela em `assets/screenshots/`, siga os procedimentos recomendados:

1. **Captura da Aba "Itens de Aba" (`01-tab-items.png`)**:
   - Abra uma página de edição com o bloco inserido.
   - Clique na aba "Itens de Aba" no painel lateral direito.
   - Adicione pelo menos 3 guias demonstrativas com títulos claros.
   - Capture a lateral em resolução nítida (mínimo 600px de largura).

2. **Captura da Aba "Estilo Visual" (`02-visual-style.png`)**:
   - Clique na aba "Estilo Visual" do painel lateral.
   - Mantenha visíveis os seletores de estilo (Abas / Pílulas), alinhamento (Horizontal / Vertical) e a paleta de cores.
   - Salve o arquivo como `assets/screenshots/02-visual-style.png`.

3. **Captura da Aba "Ícones" (`03-icons-config.png`)**:
   - Clique na aba "Ícones" do painel lateral.
   - Selecione uma guia com ícone preenchido para exibir a caixa de pré-visualização ativa e os botões de atalho.
   - Salve o arquivo como `assets/screenshots/03-icons-config.png`.

4. **Captura do Frontend Renderizado (`04-frontend-preview.png`)**:
   - Publique ou visualize a página no navegador.
   - Assegure-se de que os estilos do Bootstrap 5 e do Font Awesome 6 estejam carregados perfeitamente.
   - Salve o arquivo como `assets/screenshots/04-frontend-preview.png`.

---

## Internacionalização (i18n)

O bloco possui suporte nativo para múltiplos idiomas através de arquivos JSON no formato Jed/Gutenberg localizados na pasta `languages/`:

- `languages/pt-br.json`: Português do Brasil (`pt_BR`)
- `languages/en-us.json`: Inglês (`en_US`)
- `languages/it.json`: Italiano (`it_IT`)
- `languages/es.json`: Espanhol (`es_ES`)

O carregamento das traduções no PHP é realizado dinamicamente por:
```php
wp_set_script_translations(
    'periodic-tabs-editor-script',
    'periodic-tabs',
    plugin_dir_path( __FILE__ ) . 'languages'
);
```

---

## Instalação e Compilação

### Requisitos
- WordPress 6.0 ou superior
- PHP 7.4 ou superior
- Node.js 18+ e NPM (apenas para desenvolvimento e compilação)

### Passos de Instalação Manual
1. Clone ou baixe o repositório na pasta de plugins do seu WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-tabs.git
   ```
2. Ative o plugin no painel administrativo do WordPress em **Plugins > Plugins Instalados**.

### Compilação de Desenvolvimento e Produção
Para desenvolvedores que desejam customizar o código-fonte:
```bash
# Instalar dependências
npm install

# Compilar para produção
npm run build

# Modo de desenvolvimento contínuo (Watch)
npm run start
```

---

## Autoria e Créditos

Desenvolvido com excelência técnica e dedicação à comunidade WordPress por:

- **Autor**: Luiz Fernando Brogliatto Ferreira
- **Perfil Oficial no WordPress.org**: [profiles.wordpress.org/periodic](https://profiles.wordpress.org/periodic/)
- **Repositório GitHub**: [github.com/periodicyahoo](https://github.com/periodicyahoo)
- **Perfil LinkedIn**: [linkedin.com/in/luiz-ferreira-260277379](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

*Licença: GPLv2 ou posterior. Distribuído sob os termos da GNU General Public License.*
