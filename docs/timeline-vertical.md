<!--
  Module: periodic-timeline-vertical
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Timeline Vertical

> Consolidated module standardized under namespace `.periodic-timeline-vertical`.

---

# Periodic Timeline Vertical

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)
[![Font Awesome 6](https://img.shields.io/badge/Font%20Awesome-6.5-orange.svg)](https://fontawesome.com/)

**Periodic Timeline Vertical** é um bloco Gutenberg moderno, semântico e responsivo projetado para exibir linhas do tempo cronológicas elegantes com marcadores circulares, ícones Font Awesome 6, datas em destaque, tags e cartões de conteúdo.

---

## 🌟 Principais Recursos

- **Renderização WYSIWYG Nativa**: Edição visual instantânea dentro do editor de blocos com RichText para títulos, datas, tags e descrições.
- **Layouts Flexíveis**:
  - **Alternado (Centro)**: Distribuição equilibrada em zigue-zague (esquerda / direita), ideal para páginas institucionais e portfolios.
  - **Alinhado à Esquerda**: Linha contínua à esquerda com cartões à direita, perfeito para colunas mais estreitas e documentações.
- **Responsividade Automática**: Em dispositivos móveis (smartphones e tablets), o layout em zigue-zague adapta-se de forma fluida para uma visualização linear compacta.
- **Integração Bootstrap 5**: Utiliza classes semânticas como `card`, `card-body`, `shadow-sm` e `badge`.
- **Biblioteca Font Awesome 6**: Marcadores de nós esféricos com suporte a classes de ícones Font Awesome 6 e seletor rápido no painel.
- **Painel Lateral com Abas Dedicadas**: Configuração clara dividida entre **Eventos**, **Aparência** e **Ícones e Badges**.
- **Internacionalização Pronta (i18n)**: Suporte completo com catálogos Jed/JSON em Português (`pt_BR`), Inglês (`en_US`), Italiano (`it_IT`) e Espanhol (`es_ES`).

---

## 🖼️ Galeria e Screenshots

As imagens de demonstração e capturas de tela das abas do painel lateral encontram-se organizadas na pasta [`assets/screenshots/`](./assets/screenshots/):

| Arquivo | Descrição |
| :--- | :--- |
| `screenshot-1-frontend-alternating.png` | Visualização da Linha do Tempo no Frontend com layout alternado |
| `screenshot-2-frontend-left.png` | Visualização da Linha do Tempo alinhada à esquerda |
| `screenshot-3-tab-events.png` | Painel Lateral: Aba **Eventos** (Adição, reordenação e edição) |
| `screenshot-4-tab-appearance.png` | Painel Lateral: Aba **Aparência** (Alinhamento, cores e conectores) |
| `screenshot-5-tab-icons.png` | Painel Lateral: Aba **Ícones e Badges** (Seletor Font Awesome) |

---

## 🎛️ Guia Detalhado do Painel Lateral (InspectorControls)

O painel lateral de configurações do bloco foi desenvolvido com abas focadas para proporcionar uma experiência limpa e produtiva:

### 1. Aba "Eventos"
Esta aba gerencia o conteúdo cronológico da linha do tempo:
- **Botão `+ Adicionar Marco Temporal`**: Insere um novo evento ao final da cronologia com valores pré-configurados.
- **Lista de Eventos Cadastrados**: Exibe cada evento de forma expansível com seu respectivo ícone, data e título.
- **Ações Rápidas por Item**:
  - **Seta para Cima (`arrow-up`)**: Eleva a prioridade do marco temporal na cronologia.
  - **Seta para Baixo (`arrow-down`)**: Move o marco temporal para uma etapa posterior.
  - **Lixeira (`trash`)**: Exclui o evento selecionado (bloqueado quando houver apenas um evento ativo para evitar estados vazios acidentais).
- **Campos de Edição Detalhada**:
  - **Data / Período**: Campo textual livre (ex.: `2024`, `Q1 2025`, `15/03/2026`).
  - **Título do Marco**: Cabeçalho principal da etapa.
  - **Tag / Etiqueta**: Badge identificador opcional (ex.: `Fundação`, `Lançamento`, `Fase 2`).
  - **Descrição**: Detalhamento em parágrafo sobre a conquista ou fato histórico.
  - **Classe Font Awesome 6**: Permite definir um ícone específico para este marco temporal (ex.: `fa-solid fa-flag`).
  - **Cor do Marcador Circular**: Permite personalizar a cor de fundo exclusivamente para o marcador deste evento.

### 2. Aba "Aparência"
Controles visuais globais para harmonizar a linha do tempo com o design do seu tema:
- **Alinhamento dos Cards**:
  - *Alternado (Esquerda / Direita)*: Linha vertical centralizada com cartões intercalados e setas indicadoras.
  - *Alinhado à Esquerda*: Linha lateral esquerda com todos os cartões à direita.
- **Estilo da Linha Conectora**:
  - *Sólida (`solid`)*: Linha vertical contínua clássica.
  - *Tracejada (`dashed`)*: Visual contemporâneo tracejado.
  - *Pontilhada (`dotted`)*: Conexão delicada pontilhada.
- **Cor Primária / Marcadores**: Paleta de cores para os nós circulares padrão.
- **Cor da Linha Conectora**: Cor da linha contínua que une os marcos temporais.
- **Sombra nos Cards**: Alternador para ligar ou desligar a sombra suave (`shadow-sm`) do Bootstrap.
- **Borda nos Cards**: Alternador para exibir ou remover a borda estrutural dos cartões.

### 3. Aba "Ícones e Badges"
Configurações dedicadas à identidade gráfica dos marcadores circulares:
- **Exibir Ícones nos Marcadores**: Alternador geral para exibir ou ocultar os ícones Font Awesome nos nós da linha do tempo.
- **Cor de Fundo Padrão do Marcador**: Define a cor de fundo padrão aplicada aos nós que não possuem cor individualizada.
- **Cor do Ícone / Texto**: Define a cor do glifo de ícone centralizado no nó.
- **Ícones Rápidos Populares (Font Awesome 6)**: Grade de atalhos rápidos com os ícones mais comuns (`fa-flag`, `fa-rocket`, `fa-trophy`, `fa-star`, `fa-briefcase`, `fa-graduation-cap`, `fa-lightbulb`, `fa-heart`, `fa-check`, `fa-award`, `fa-calendar-check`, `fa-code`). Basta um clique no botão desejado para associar imediatamente o ícone ao evento em edição.

---

## 💻 Instalação e Uso

1. Faça o download ou clone este repositório na pasta `wp-content/plugins/` da sua instalação WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-timeline-vertical.git
   ```
2. Instale as dependências e compile os assets:
   ```bash
   cd periodic-timeline-vertical
   npm install
   npm run build
   ```
3. Ative o plugin no painel administrativo do WordPress (**Plugins > Plugins Instalados > Periodic Timeline Vertical**).
4. No editor de páginas ou posts do Gutenberg, clique no botão `+` (Inserir bloco) e busque por **Timeline Vertical**.

---

## 🛠️ Scripts de Desenvolvimento

- `npm run build`: Compila os arquivos JavaScript e Sass em código de produção minificado e otimizado na pasta `build/`.
- `npm run start`: Inicia o modo de desenvolvimento com monitoramento contínuo de alterações (hot-reload / watch mode).
- `npm run screenshots`: Gera automaticamente todas as capturas de tela e mockups em alta resolução na pasta `assets/screenshots/`.


---

## 🌍 Suporte Multilíngue (i18n)

O plugin inclui suporte de internacionalização de fábrica com arquivos de tradução em conformidade com o padrão WordPress Jed:
- `languages/pt-br.json` (Português do Brasil)
- `languages/en-us.json` (Inglês)
- `languages/it.json` (Italiano)
- `languages/es.json` (Espanhol)

---

## 👤 Autor

**Luiz Fernando Brogliatto Ferreira**

- **WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Distribuído sob a licença GPL-2.0-or-later. Consulte o cabeçalho dos arquivos para mais detalhes.
