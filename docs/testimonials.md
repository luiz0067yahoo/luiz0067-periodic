<!--
  Módulo: periodic-testimonials
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Testimonials

> Módulo consolidado e padronizado sob o namespace `.periodic-testimonials`.

---

# Periodic Testimonials

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)
[![Font Awesome 6](https://img.shields.io/badge/Font%20Awesome-6.5-orange.svg)](https://fontawesome.com/)

**Periodic Testimonials** é um plugin de bloco nativo para o WordPress Gutenberg desenvolvido para exibir depoimentos de clientes, alunos e parceiros com alto padrão visual, responsividade total e conformidade com os padrões modernos de engenharia web.

---

## 🌟 Principais Funcionalidades

- **Renderização WYSIWYG Nativa**: Digite e formate citações, nomes de autores e cargos diretamente no canvas do editor de blocos, sem janelas modais intermediárias.
- **Integração Bootstrap 5**: Utiliza classes semânticas como `card`, `card-body`, `rounded-circle`, `shadow-sm` e sistema de grid responsivo `row` / `col`.
- **Ícones e Estrelas Font Awesome 6**: Avaliações visuais de 1 a 5 estrelas (`fas fa-star`, `far fa-star`) e ícone clássico decorativo de aspas (`fas fa-quote-left`).
- **Modos de Exibição Versáteis**:
  - **Grid Responsivo**: Distribuição em 1, 2, 3 ou 4 colunas com adaptação suave para smartphones e tablets.
  - **Card Único / Destaque**: Layout focado e centralizado, ideal para depoimentos principais ou seções de fechamento (*hero review*).
- **Gerenciamento Completo de Avatares**: Integração direta com a biblioteca de mídia do WordPress (`MediaUpload` e `MediaUploadCheck`) com suporte a alteração e remoção rápida.
- **Painel Lateral com Abas Dedicadas (`TabPanel`)**: Separação clara de responsabilidades entre **Depoimentos**, **Avaliação/Estrelas** e **Layout**.
- **Internacionalização Completa (i18n)**: Catálogos JSON/Jed prontos para Português do Brasil (`pt_BR`), Inglês (`en_US`), Italiano (`it_IT`) e Espanhol (`es_ES`).

---

## 📸 Galeria de Telas e Screenshots

As imagens de demonstração e capturas de tela das abas do painel lateral encontram-se estruturadas na pasta `assets/screenshots/`:

| Arquivo | Descrição |
| :--- | :--- |
| `screenshot-1-frontend-grid.png` | Visualização frontend dos cards em Grid Responsivo de 3 colunas com estrelas e avatares. |
| `screenshot-2-frontend-single.png` | Visualização frontend em modo de Card Único Centralizado em Destaque. |
| `screenshot-3-tab-testimonials.png` | Painel Lateral: Aba "Depoimentos" (ordenação, adição e upload de avatar). |
| `screenshot-4-tab-rating.png` | Painel Lateral: Aba "Avaliação/Estrelas" (toggles, paleta de cores e ícones). |
| `screenshot-5-tab-layout.png` | Painel Lateral: Aba "Layout" (seleção de grid, colunas, sombra e cores de fundo/texto). |

---

## ⚙️ Guia Detalhado do Painel Lateral (InspectorControls)

O painel de configurações lateral do bloco é estruturado por meio de abas para oferecer uma navegação intuitiva:

### 1. Aba "Depoimentos"
Projetada para o gerenciamento individual dos relatos:
- **Botão "+ Adicionar Depoimento"**: Cria instantaneamente um novo card com valores padrão personalizáveis.
- **Lista de Itens**:
  - **Reordenação**: Botões de subir (`arrow-up-alt2`) e descer (`arrow-down-alt2`) para reorganizar a ordem de exibição.
  - **Remoção Segura**: Botão com ícone de lixeira que exclui o depoimento (mantendo a regra de segurança de no mínimo 1 item).
  - **Upload de Avatar**: Seleção de imagem via modal da Biblioteca de Mídia do WordPress (`wp.media`), permitindo recortar, substituir ou remover a foto.
  - **Classificação Individual**: Controle deslizante de nota de 1 a 5 estrelas específico para o depoimento selecionado.

### 2. Aba "Avaliação/Estrelas"
Gerencia o sistema de pontuação e ornamentos visuais:
- **Exibir Avaliação por Estrelas**: Toggle para habilitar ou desabilitar o bloco de estrelas douradas nos cards.
- **Exibir Ícone Decorativo de Aspas**: Habilita o ícone de aspas superiores estilizado em marca d'água elegante.
- **Cor das Estrelas**: Paleta de cores selecionáveis (Dourado Padrão `#ffc107`, Âmbar Quente `#f59e0b`, Laranja Vibrante `#fd7e14`, Azul Destaque `#0d6efd`, Verde Sucesso `#198754`, Roxo Premium `#6f42c1`) com seletor customizado de qualquer tom hexadecimal.

### 3. Aba "Layout"
Controla a distribuição geométrica e estilização visual dos cartões:
- **Modo de Exibição**:
  - `Grid Responsivo`: Disposição em grade calculada por classes de colunas Bootstrap (`row-cols-*`).
  - `Card Único em Destaque`: Card centralizado de largura moderada (`col-lg-8`).
- **Quantidade de Colunas no Grid**: Seletor de 1 a 4 colunas para telas de desktop.
- **Sombra Suave nos Cards**: Aplica a classe `shadow-sm` do Bootstrap 5 combinada com elevação suave (`translateY(-4px)`) no hover.
- **Arredondamento das Bordas (px)**: Controle deslizante de 0 a 32 pixels para raio de curvatura (`border-radius`).
- **Cor de Fundo do Card**: Cores pré-definidas ou personalizadas para o container dos depoimentos.
- **Cor do Texto do Card**: Controle de contraste tipográfico para leitura ideal sobre fundos claros ou escuros.

---

## 🛠️ Estrutura de Arquivos do Projeto

```text
periodic-testimonials/
├── periodic-testimonials.php       # Arquivo principal do plugin WordPress
├── block.json                       # Metadados do bloco (v3) e atributos
├── package.json                     # Scripts de automação e dependências do projeto
├── src/
│   ├── index.js                     # Registro do bloco com registerBlockType
│   ├── edit.js                      # Interface de edição WYSIWYG e InspectorControls
│   ├── save.js                      # Renderização estática em HTML5 semântico
│   ├── editor.scss                  # Estilos complementares da área de edição
│   └── style.scss                   # Folha de estilos compartilhada (frontend e backend)
├── languages/
│   ├── pt-br.json                   # Catálogo i18n em Português do Brasil
│   ├── en-us.json                   # Catálogo i18n em Inglês
│   ├── it.json                      # Catálogo i18n em Italiano
│   └── es.json                      # Catálogo i18n em Espanhol
├── assets/
│   └── screenshots/                 # Capturas visuais para documentação e WordPress.org
└── readme.md                        # Documentação oficial do projeto
```

---

## 🚀 Instalação e Desenvolvimento

### 1. Requisitos
- WordPress 6.0 ou superior
- PHP 7.4 ou superior
- Node.js 18+ e NPM 9+

### 2. Compilação dos Scripts
Para instalar as dependências e gerar os arquivos otimizados em `build/`:
```bash
npm install
npm run build
```

Para desenvolvimento com recompilação contínua (*watch mode*):
```bash
npm run start
```

---

## 👤 Informações de Autoria

- **Autor**: Luiz Fernando Brogliatto Ferreira
- **WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Este plugin é distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo de licença oficial da GNU para mais detalhes.
