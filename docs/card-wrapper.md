<!--
  Módulo: periodic-card-wrapper
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Card Wrapper

> Módulo consolidado e padronizado sob o namespace `.periodic-card-wrapper`.

---

# Periodic Card Wrapper

[![WordPress](https://img.shields.io/badge/WordPress-6.1%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-black.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952b3.svg)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-blueviolet.svg)](https://fontawesome.com)
[![License](https://img.shields.io/badge/License-GPL%202.0%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**Periodic Card Wrapper** é um plugin de bloco Gutenberg avançado e estrutural para WordPress, desenvolvido para fornecer controle total sobre a criação de cartões elegantes com o padrão oficial do **Bootstrap 5**, suporte nativo a blocos aninhados (`<InnerBlocks />`), edição direta WYSIWYG e painel lateral (`InspectorControls`) organizado em abas intuitivas.

---

## 📋 Sumário
- [Visão Geral](#-visão-geral)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Abas do Painel Lateral (InspectorControls)](#-abas-do-painel-lateral-inspectorcontrols)
  - [1. Estrutura do Card](#1-aba-estrutura-do-card)
  - [2. Estilo e Cores](#2-aba-estilo-e-cores)
  - [3. Sombras e Efeitos](#3-aba-sombras-e-efeitos)
- [Screenshots e Capturas de Tela](#-screenshots-e-capturas-de-tela)
- [Como Gerar Novos Screenshots](#-como-gerar-novos-screenshots)
- [Internacionalização (i18n)](#-internacionalização-i18n)
- [Requisitos Técnicos](#-requisitos-técnicos)
- [Instalação e Uso](#-instalação-e-uso)
- [Compilação e Desenvolvimento](#-compilação-e-desenvolvimento)
- [Metadados de Autoria](#-metadados-de-autoria)
- [Licença](#-licença)

---

## 🚀 Visão Geral

O bloco **Periodic Card Wrapper** (`periodic/card-wrapper`) foi arquitetado seguindo rigorosamente os padrões de engenharia modernos do ecossistema WordPress (Block API v3, `@wordpress/scripts`, React JSX, SCSS modular e renderização semântica nativa).

Diferente de cartões rígidos ou monolíticos, este bloco funciona como um *wrapper modular* compatível com a biblioteca Bootstrap 5. Ele permite ativar e desativar partes da estrutura do cartão (`card-header`, `card-body` e `card-footer`), formatar os textos diretamente na tela através de componentes `RichText` e inserir **qualquer bloco do Gutenberg** dentro do corpo do cartão (parágrafos, títulos, botões, colunas, imagens, galerias, formulários, etc.).

---

## ✨ Principais Funcionalidades

- **Renderização WYSIWYG Nativa**: Visualização em tempo real dentro do editor do WordPress idêntica à renderização final do frontend.
- **Suporte a InnerBlocks**: Liberdade total para dispor quaisquer blocos do WordPress dentro da área de conteúdo (`card-body`).
- **Abas Dedicadas no InspectorControls**:
  - Organização limpa das opções em 3 abas temáticas para máxima produtividade do editor de conteúdo.
- **Semântica Bootstrap 5**: Utilização direta das classes CSS oficiais (`card`, `card-header`, `card-body`, `card-footer`, `border`, `rounded`, `shadow`, etc.).
- **Carregamento Condicional Seguro**: Enfileiramento de Bootstrap 5 e Font Awesome 6 com verificação prévia de registro, evitando duplicidades ou conflitos com temas existentes.
- **Suporte a Múltiplos Idiomas (i18n)**: Totalmente preparado para internacionalização com arquivos de tradução em Português (pt-BR), Inglês (en-US), Italiano (it-IT) e Espanhol (es-ES).

---

## 📂 Estrutura de Arquivos

```
periodic-card-wrapper/
├── .gitignore                      # Regras de exclusão do Git
├── package.json                    # Dependências NPM e scripts @wordpress/scripts
├── block.json                      # Metadados e schema v3 do bloco Gutenberg
├── periodic-card-wrapper.php       # Arquivo PHP mestre de registro e carregamento
├── src/                            # Código-fonte React/JSX e SCSS
│   ├── index.js                    # Ponto de entrada e registro no cliente
│   ├── edit.js                     # Componente Edit WYSIWYG com abas e controles
│   ├── save.js                     # Componente Save gerador do HTML semântico
│   ├── editor.scss                 # Estilos específicos do editor Gutenberg
│   └── style.scss                  # Estilos compartilhados (editor e frontend)
├── build/                          # Código compilado e otimizado para produção
├── languages/                      # Arquivos de tradução i18n
│   ├── pt-br.json                  # Tradução em Português do Brasil
│   ├── en-us.json                  # Tradução em Inglês Americano
│   ├── it.json                     # Tradução em Italiano
│   └── es.json                     # Tradução em Espanhol
├── assets/
│   └── screenshots/                # Capturas de tela e evidências visuais do bloco
│       ├── 01-card-structure-tab.png
│       ├── 02-card-style-tab.png
│       ├── 03-card-shadow-tab.png
│       └── 04-card-frontend-preview.png
└── readme.md                       # Documentação técnica detalhada
```

---

## 🎛 Abas do Painel Lateral (InspectorControls)

Ao selecionar o bloco **Periodic Card Wrapper** no editor de páginas ou posts do Gutenberg, a barra lateral exibe um menu em abas com as seguintes seções de configuração:

### 1. Aba: "Estrutura do Card"
Permite definir quais seções estruturais compõem o cartão:
- **Exibir Cabeçalho (Header)**:
  - *Tipo*: Alternador (`ToggleControl`).
  - *Função*: Ativa ou desativa a exibição da área `.card-header`. Quando ativado, uma caixa editável de texto enriquecido (`RichText`) surge no topo do cartão para digitação do título.
- **Exibir Rodapé (Footer)**:
  - *Tipo*: Alternador (`ToggleControl`).
  - *Função*: Ativa ou desativa a exibição da área `.card-footer`. Quando ativado, uma caixa editável de texto enriquecido surge na parte inferior para inserção de notas, datas, créditos ou links.

### 2. Aba: "Estilo e Cores"
Centraliza as propriedades visuais de bordas, contornos e cores:
- **Estilo de Borda (Bootstrap)**:
  - *Opções disponíveis*: Padrão (`border`), Sem Borda (`border-0`), Primária (`border-primary`), Secundária (`border-secondary`), Sucesso (`border-success`), Perigo (`border-danger`), Aviso (`border-warning`), Informativa (`border-info`), Clara (`border-light`) e Escura (`border-dark`).
- **Arredondamento (Border Radius)**:
  - *Opções disponíveis*: Padrão (`rounded`), Reto (`rounded-0`), Pequeno (`rounded-1`), Médio (`rounded-2`), Grande (`rounded-3`), Extra Grande (`rounded-4`) e Pílula (`rounded-pill`).
- **Cores do Cartão**:
  - Seletor de Cor de Fundo (`cardBgColor`).
  - Seletor de Cor do Texto (`cardTextColor`).
- **Cores do Cabeçalho** (condicional à ativação do cabeçalho):
  - Seletor de Cor de Fundo do Cabeçalho (`headerBgColor`).
  - Seletor de Cor do Texto do Cabeçalho (`headerTextColor`).
- **Cores do Rodapé** (condicional à ativação do rodapé):
  - Seletor de Cor de Fundo do Rodapé (`footerBgColor`).
  - Seletor de Cor do Texto do Rodapé (`footerTextColor`).

### 3. Aba: "Sombras e Efeitos"
Aplica profundidade e elevação tridimensional ao cartão com as classes nativas do Bootstrap:
- **Intensidade da Sombra**:
  - *Sem Sombra (`none`)*: Aparência plana/flat sem sombras adicionadas.
  - *Sombra Suave (`shadow-sm`)*: Elevação sutil, ideal para interfaces limpas e minimalistas.
  - *Sombra Regular (`shadow`)*: Elevação média, destacando o cartão naturalmente do plano de fundo.
  - *Sombra Pronunciada (`shadow-lg`)*: Elevação acentuada com grande profundidade e presença visual.

---

## 🖼 Screenshots e Capturas de Tela

As telas de demonstração do funcionamento do painel lateral e do visual dos cartões encontram-se na pasta `assets/screenshots/`:

| Imagem | Descrição |
| :--- | :--- |
| ![Aba Estrutura](assets/screenshots/01-card-structure-tab.png) | **Aba 1 - Estrutura do Card**: Exibição dos controles de ativação/desativação de cabeçalho e rodapé. |
| ![Aba Estilos](assets/screenshots/02-card-style-tab.png) | **Aba 2 - Estilo e Cores**: Configurações de borda, cantos arredondados e paleta de cores. |
| ![Aba Sombras](assets/screenshots/03-card-shadow-tab.png) | **Aba 3 - Sombras e Efeitos**: Seleção de classes de elevação Bootstrap 5. |
| ![Preview do Bloco](assets/screenshots/04-card-frontend-preview.png) | **Visualização Geral**: Demonstração de múltiplos cartões no editor e frontend. |

---

## 📸 Como Gerar Novos Screenshots

Para capturar ou atualizar as imagens da pasta `assets/screenshots/`:

1. Acesse o painel administrativo do WordPress (`/wp-admin`).
2. Crie ou edite um post/página no editor Gutenberg.
3. Insira o bloco **Periodic Card Wrapper**.
4. Abra o painel lateral do bloco no canto superior direito (ícone de engrenagem).
5. Selecione consecutivamente cada uma das abas:
   - Clique na aba **Estrutura do Card** e capture a área do painel lateral salvando como `01-card-structure-tab.png`.
   - Clique na aba **Estilo e Cores** e capture a área do painel lateral salvando como `02-card-style-tab.png`.
   - Clique na aba **Sombras e Efeitos** e capture a área do painel lateral salvando como `03-card-shadow-tab.png`.
6. Configure um exemplo completo com título, imagem e texto no cartão, capture a tela completa do resultado e salve como `04-card-frontend-preview.png`.
7. Mantenha os arquivos no diretório `assets/screenshots/` na resolução recomendada de 1200x800 ou proporcional.

---

## 🌐 Internacionalização (i18n)

O bloco suporta múltiplos idiomas de forma nativa através da API de internacionalização do WordPress (`@wordpress/i18n` e `wp_set_script_translations`). Os arquivos de tradução encontram-se na pasta `languages/`:

- `pt-br.json`: Português do Brasil (nativo)
- `en-us.json`: Inglês (English - United States)
- `it.json`: Italiano (Italiano)
- `es.json`: Espanhol (Español)

Para gerar novos idiomas ou atualizar o catálogo:
```bash
# Geração do arquivo POT usando WP-CLI
wp i18n make-pot . languages/periodic-card-wrapper.pot

# Geração dos arquivos JSON de tradução para Gutenberg
wp i18n make-json languages/ --no-purge
```

---

## ⚙️ Requisitos Técnicos

- **WordPress**: Versão 6.1 ou superior (recomendado 6.4+)
- **PHP**: Versão 7.4 ou superior (totalmente compatível com PHP 8.0, 8.1 e 8.2)
- **Frameworks frontend**: Bootstrap 5.3+ e Font Awesome 6.5+ (já integrados e gerenciados de forma segura pelo plugin)
- **Navegadores suportados**: Chrome, Firefox, Safari, Edge modernos (Evergreen Browsers)

---

## 📦 Instalação e Uso

1. Baixe ou clone o repositório dentro do diretório de plugins da sua instalação WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-card-wrapper.git
   ```
2. Acesse o painel **Plugins > Plugins Instalados** no WordPress.
3. Localize **Periodic Card Wrapper** e clique em **Ativar**.
4. No editor de posts/páginas, clique no botão de inserção `+` (Inserir Bloco) e pesquise por **Periodic Card Wrapper** ou simplesmente **Card**.

---

## 🛠 Compilação e Desenvolvimento

O projeto utiliza o pacote oficial `@wordpress/scripts` para build, compilação de SCSS e otimização de bundles JavaScript:

```bash
# Instalação das dependências
npm install

# Compilação em modo de desenvolvimento (com watcher ativo)
npm run start

# Compilação em modo de produção (código minificado e otimizado)
npm run build

# Validação e lint de código
npm run lint:js
npm run lint:css
```

---

## 👨‍💻 Metadados de Autoria

Desenvolvido com excelência técnica e dedicação à comunidade WordPress por:

- **Autor**: Luiz Fernando Brogliatto Ferreira
- **Perfil WordPress.org**: [profiles.wordpress.org/periodic](https://profiles.wordpress.org/periodic/)
- **Repositório GitHub**: [github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [linkedin.com/in/luiz-ferreira-260277379](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Este projeto é um software livre licenciado sob os termos da **GNU General Public License v2.0 or later** (GPL-2.0-or-later). Consulte o arquivo de licença ou acesse [https://www.gnu.org/licenses/gpl-2.0.html](https://www.gnu.org/licenses/gpl-2.0.html) para maiores informações.
