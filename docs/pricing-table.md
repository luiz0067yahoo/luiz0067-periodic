<!--
  Module: periodic-pricing-table
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Pricing Table

> Consolidated module standardized under namespace `.periodic-pricing-table`.

---

# Periodic - Pricing Table (Bootstrap 5)

[![WordPress Plugin](https://img.shields.io/badge/WordPress-6.1%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![Gutenberg Block API](https://img.shields.io/badge/Gutenberg-API%20v3-success.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952b3.svg?logo=bootstrap)](https://getbootstrap.com)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.5.2-528dd7.svg?logo=font-awesome)](https://fontawesome.com)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin nativo de bloco Gutenberg para criação e gestão de **Tabelas Comparativas de Preços e Planos**, projetado especificamente para *landing pages*, páginas de vendas e sites institucionais. Desenvolvido com base no framework **Bootstrap 5**, ícones universais **Font Awesome 6**, React JSX e metadados `block.json` (API v3).

---

## 🌟 Principais Recursos

- **Renderização WYSIWYG Nativa:** Edição inline em tempo real de nomes de planos, valores, moedas, períodos de faturamento, distintivos e textos de botões de ação diretamente na área de edição do WordPress.
- **Destaque Visual para "Plano Popular":** Destaque automático com badge personalizável ("Mais Popular", "Recomendado", "Melhor Custo-Benefício"), borda de realce configurável e elevação com sombra suave em desktop.
- **Gerenciador de Recursos Dinâmico:** Cada plano conta com sua própria lista de funcionalidades com alternância visual rápida entre itens inclusos (ícone de visto verde) e itens não inclusos (ícone de xis cinza).
- **Grade Responsiva Bootstrap 5:** Distribuição flexível e responsiva com suporte a 2, 3 ou 4 colunas no desktop (`row-cols-1 row-cols-md-2 row-cols-lg-*`).
- **Personalização de Botões:** Seleção de estilos nativos do Bootstrap (`btn-primary`, `btn-outline-primary`, `btn-success`, `btn-outline-success`, `btn-dark`, `btn-outline-dark`, `btn-secondary`) com direcionamento para URLs personalizadas.
- **Painel de Controle Organizado (`InspectorControls`):** Configuração intuitiva estruturada em abas especializadas via `<TabPanel>`.
- **Internacionalização Pronta (i18n):** Suporte multilíngue com arquivos de tradução em Português do Brasil (`pt_BR`), Inglês (`en_US`), Italiano (`it_IT`) e Espanhol (`es_ES`).
- **Código Limpo e Semântico:** Estrutura HTML baseada em cartões (`card`, `card-header`, `card-body`), listas flush (`list-group-flush`) e tipografia moderna.

---

## 📁 Estrutura de Arquivos do Plugin

```text
periodic-pricing-table/
├── .gitignore                          # Arquivos e pastas ignorados no controle de versão
├── package.json                        # Scripts de compilação (@wordpress/scripts) e dependências
├── block.json                          # Metadados oficiais do bloco Gutenberg (API v3)
├── periodic-pricing-table.php          # Arquivo principal do plugin WordPress (registro e enqueues)
├── src/
│   ├── index.js                        # Ponto de entrada de registro do bloco
│   ├── edit.js                         # Interface visual de edição WYSIWYG e InspectorControls
│   ├── save.js                         # Marcação HTML semântica gerada no frontend
│   ├── editor.scss                     # Estilos visuais específicos do editor de blocos
│   └── style.scss                      # Estilos compartilhados de frontend e editor
├── build/                              # Arquivos finais compilados prontos para produção
│   ├── index.js
│   ├── index.asset.php
│   ├── index.css
│   └── style-index.css
├── languages/                          # Arquivos de tradução (Jed 1.x / Gutenberg)
│   ├── pt-br.json                      # Tradução em Português do Brasil
│   ├── en-us.json                      # Tradução em Inglês
│   ├── it.json                         # Tradução em Italiano
│   └── es.json                         # Tradução em Espanhol
├── assets/
│   └── screenshots/                    # Capturas de tela demonstrativas das abas e frontend
│       ├── 01-tab-planos.png
│       ├── 02-tab-recursos.png
│       ├── 03-tab-estilo-destaque.png
│       └── 04-pricing-frontend-preview.png
└── readme.md                           # Documentação técnica e guia do usuário
```

---

## 🎛️ Guia Detalhado do Painel Lateral (`InspectorControls`)

O painel de configurações do bloco na barra lateral direita do editor está subdividido em 3 abas temáticas para máxima produtividade:

### 1. Aba "Planos"
Responsável pelo gerenciamento estrutural de cada cartão de plano da tabela:
- **Selecionar Plano para Edição:** Menu suspenso para alternar o foco do formulário para qualquer plano existente.
- **Reordenação e Duplicação:**
  - `↑` / `↓`: Move o plano para a esquerda/direita na grade.
  - `⧉`: Clona o plano selecionado com todas as suas características configuradas.
  - `✕`: Exclui o plano selecionado (mínimo de 1 plano preservado).
- **Nome do Plano:** Título identificador (ex.: Básico, Profissional, Enterprise).
- **Moeda e Preço:** Campos dedicados para símbolo monetário (ex.: `R$`, `$`, `€`) e valor numérico ou textual (ex.: `29`, `79`, `149`, `Grátis`).
- **Período de Faturamento:** Rótulo explicativo da periodicidade (ex.: `/mês`, `/ano`, `taxa única`).
- **Plano em Destaque (Popular):** Chave seletora que marca o plano como a opção recomendada.
- **Texto do Distintivo (Badge):** Rótulo exibido sobre o plano quando marcado como destaque (ex.: "Mais Popular", "Melhor Escolha").
- **Texto e URL do Botão:** Configuração do rótulo da chamada para ação (CTA) e respectivo link de destino.
- **Estilo do Botão:** Paleta de estilos Bootstrap 5 para harmonizar com a identidade visual do site.
- **Colunas no Desktop:** Seletor deslizante de 2 a 4 colunas para ajuste da distribuição horizontal em telas grandes.

### 2. Aba "Recursos e Itens"
Responsável pelo controle minucioso da lista de itens e vantagens de cada plano:
- **Seleção do Plano Atual:** Escolha de qual plano terá seus recursos editados.
- **Status de Inclusão (`Recurso Incluso?`):**
  - Quando **ativado (`true`)**: Exibe o ícone de visto verde (`fa-check text-success`) e tipografia padrão.
  - Quando **desativado (`false`)**: Exibe o ícone de xis cinza (`fa-xmark text-muted`) com leve opacidade ou traçado, ideal para demonstrar limitações de planos de entrada.
- **Edição de Texto:** Campo direto para descrever o recurso ou diferencial.
- **Botão de Exclusão:** Remove o recurso individual da lista.
- **Adicionar Recurso:** Insere uma nova linha de recurso configurável.

### 3. Aba "Estilo do Destaque"
Responsável pela customização visual e cromática do plano em destaque:
- **Exibir Distintivos (Badges):** Ativa ou oculta a exibição da pílula com ícone de coroa (`fa-crown`) e texto no topo do plano em destaque.
- **Elevar Plano em Destaque:** Ativa o efeito de ampliação sutil (`transform: scale(1.04)`) e sombra profunda em telas desktop, garantindo que o plano recomendado chame a atenção imediata do visitante.
- **Cor da Borda de Destaque:** Seletor de cores para a linha de contorno do card em destaque (padrão: `#0d6efd`).
- **Cor de Fundo da Badge:** Seletor de cor de fundo da etiqueta flutuante.
- **Cor do Texto da Badge:** Seletor de cor da tipografia da etiqueta flutuante (padrão: `#ffffff`).

---

## 🖼️ Galeria de Capturas de Tela (`assets/screenshots/`)

A pasta `assets/screenshots/` contém imagens demonstrativas de alta fidelidade:

| Imagem | Descrição |
| :--- | :--- |
| ![01-tab-planos.png](assets/screenshots/01-tab-planos.png) | **Aba Planos:** Adição, reordenação e edição de cartões de planos de preços no painel lateral. |
| ![02-tab-recursos.png](assets/screenshots/02-tab-recursos.png) | **Aba Recursos e Itens:** Gerenciamento das linhas de recursos inclusos e exclusos com ícones dinâmicos. |
| ![03-tab-estilo-destaque.png](assets/screenshots/03-tab-estilo-destaque.png) | **Aba Estilo do Destaque:** Personalização cromática de bordas, cores da badge e escala de elevação. |
| ![04-pricing-frontend-preview.png](assets/screenshots/04-pricing-frontend-preview.png) | **Visualização no Frontend:** Tabela comparativa de planos renderizada com padrão Bootstrap 5 e Font Awesome 6. |

---

## 🚀 Instalação e Compilação

### Requisitos Mínimos
- WordPress 6.1 ou superior
- PHP 7.4 ou superior
- Node.js 18+ e NPM (para compilação a partir do código fonte)

### Passo a Passo de Instalação no WordPress
1. Baixe o repositório ou clone na pasta `/wp-content/plugins/periodic-pricing-table`.
2. Acesse o painel administrativo do WordPress em **Plugins > Plugins Instalados**.
3. Localize **Periodic - Pricing Table (Bootstrap 5)** e clique em **Ativar**.
4. Em qualquer página ou post, abra o editor Gutenberg e adicione o bloco **Tabela de Preços (Bootstrap 5)**.

### Compilação de Desenvolvimento e Produção
Para desenvolvedores que desejam estender ou compilar os arquivos SCSS e JS:

```bash
# Instalar as dependências de desenvolvimento
npm install

# Iniciar o ambiente de desenvolvimento com watch contínuo
npm start

# Gerar o pacote otimizado e minificado para produção
npm run build
```

---

## 🌐 Internacionalização (i18n)

O bloco está totalmente preparado para tradução com suporte aos padrões oficiais do WordPress e Gutenberg:
- Domínio de texto: `periodic-pricing-table`
- Idiomas fornecidos nativamente:
  - 🇧🇷 Português do Brasil (`pt-br.json` / `pt_BR`)
  - 🇺🇸 Inglês (`en-us.json` / `en_US`)
  - 🇮🇹 Italiano (`it.json` / `it_IT`)
  - 🇪🇸 Espanhol (`es.json` / `es_ES`)

---

## 👨‍💻 Metadados de Autoria

- **Autor:** Luiz Fernando Brogliatto Ferreira
- **WordPress.org:** [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub:** [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn:** [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Este plugin é distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo de licença ou acesse [GNU General Public License](https://www.gnu.org/licenses/gpl-2.0.html) para mais informações.
