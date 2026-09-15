<!--
  Module: periodic-table-of-contents
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Table Of Contents

> Consolidated module standardized under namespace `.periodic-table-of-contents`.

---

# Periodic Table of Contents

> Sumário e índice automático para artigos e páginas longas no WordPress Gutenberg, com varredura dinâmica de títulos (H2, H3, H4), rolagem suave (*smooth scroll*), rastreamento ativo (*scrollspy*) e modo recolhível (*accordion*).

---

## 📋 Visão Geral

O **Periodic Table of Contents** otimiza a experiência de leitura e navegação do usuário (UX) e melhora o ranqueamento orgânico nos motores de busca (SEO) através de links diretos de ancoragem (*page jump*). O bloco escaneia a árvore de blocos no editor e o DOM no frontend de forma autônoma, criando marcadores e IDs limpos sem exigir configuração manual.

---

## ✨ Principais Funcionalidades

- **Varredura e Ancoragem Automáticas**: Detecta títulos da página e injeta atributos `id` seguros caso não tenham sido definidos manualmente.
- **Rastreamento Ativo (Scrollspy)**: Ilumina o item do sumário correspondente à seção atualmente visível na tela durante a rolagem.
- **Rolagem Suave com Compensação de Cabeçalho (Offset)**: Evita que menus fixos ou barras superiores escondam o início do título clicado.
- **Visualização WYSIWYG Reativa**: No editor Gutenberg, reflete em tempo real os títulos adicionados, alterados ou removidos da página.
- **Painel Dobrável (Accordion)**: Permite ao usuário recolher ou expandir o índice, com opção de iniciar recolhido em smartphones.
- **Três Temas Visuais Modernos**: Card elegante com sombra sutil, minimalista com borda lateral ou fundo plano suave.

---

## 🎛️ Abas do Painel de Controle (InspectorControls)

### 1. Aba Títulos
- **Hierarquia Selecionável**: Ative ou desative individualmente títulos H2, subtítulos H3 e seções H4.
- **Título do Sumário**: Personalize o cabeçalho do índice diretamente no editor de texto rico.

### 2. Aba Estilo
- **Tipo de Marcador**: Escolha entre lista numerada (`1, 2, 3...`), marcadores circulares (`bullets`) ou visual limpo sem marcadores.
- **Tema Visual do Card**: Alterne entre design em cartão sombreado, indicador minimalista com faixa colorida ou bloco plano.
- **Cores & Bordas**: Selecione a cor primária dos links e do estado ativo, a cor de fundo do bloco e o raio de arredondamento das bordas.

### 3. Aba Navegação
- **Painel Recolhível / Accordion**: Habilita o botão de recolher/expandir com transição suave.
- **Iniciar Fechado em Mobile**: Economiza espaço vertical precioso em telas de celular.
- **Compensação de Topo (Header Offset)**: Define a distância exata em pixels (0 a 200px) para o clique parar confortavelmente abaixo de cabeçalhos sticky.
- **Rastreamento Scrollspy**: Ativação do observador de interseção de alta performance.

---

## 🌐 Internacionalização (i18n)

Suporte nativo aos 4 idiomas oficiais da suíte:
- 🇧🇷 Português do Brasil (`pt-br.json`)
- 🇺🇸 Inglês (`en-us.json`)
- 🇮🇹 Italiano (`it.json`)
- 🇪🇸 Espanhol (`es.json`)

---

## 👤 Metadados de Autoria

- **Autor**: Luiz Fernando Brogliatto Ferreira
- **WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Distribuído sob a licença GPL-2.0-or-later. Consulte o arquivo de licença oficial da GNU para mais detalhes.
