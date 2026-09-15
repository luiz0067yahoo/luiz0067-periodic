<!--
  Module: periodic-parallax-section
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Parallax Section

> Consolidated module standardized under namespace `.periodic-parallax-section`.

---

# Periodic Parallax Section

> Bloco Gutenberg avançado de container de seção com efeito paralaxe nativo e fluido na imagem de fundo durante a rolagem da página. Integrado aos ecossistemas Bootstrap 5 e WordPress Block API v3.

---

## 📋 Visão Geral

O **Periodic Parallax Section** foi concebido para elevar a experiência visual e de profundidade em websites WordPress, permitindo criar seções impactantes de cabeçalho, faixas promocionais e divisores de conteúdo. Desenvolvido com foco em desempenho, utiliza aceleração por hardware CSS (`translate3d`), desacoplamento por `requestAnimationFrame` e observação inteligente de visibilidade via `IntersectionObserver`.

---

## ✨ Principais Funcionalidades

- **Efeito Paralaxe Fluido & Otimizado**: Sem travamentos de rolagem ou dependências externas pesadas.
- **Renderização WYSIWYG Nativa**: Visualização fiel e instantânea dentro do editor Gutenberg.
- **Suporte a InnerBlocks**: Capacidade de aninhar qualquer bloco Gutenberg dentro do container.
- **Controle Preciso de Ponto Focal**: Posicionamento da imagem de fundo responsivo via `FocalPointPicker`.
- **Camada de Sobreposição Dinâmica (Overlay)**: Controle de cor, opacidade e modos de mesclagem (`multiply`, `overlay`, `darken`, `lighten`, etc.).
- **Integração Bootstrap 5**: Opções de largura de container (`container`, `container-fluid`, ou largura total).
- **Acessibilidade Embutida**: Desativação automática do paralaxe caso o usuário utilize o modo `prefers-reduced-motion`.

---

## 🎛️ Abas do Painel de Controle (InspectorControls)

### 1. Aba Layout
- **Tipo de Container (Bootstrap 5)**: Alterne entre `container` (largura máxima com margens automáticas), `container-fluid` (100% de largura fluida) e `Sem Container` (largura total irrestrita).
- **Alinhamento Vertical do Conteúdo**: Superior (`align-items-start`), Centralizado (`align-items-center`) ou Inferior (`align-items-end`).
- **Alinhamento Horizontal do Conteúdo**: Esquerda, Centralizado ou Direita.
- **Altura Mínima (Desktop & Mobile)**: Definição precisa da altura mínima em telas grandes (350px até 100vh) e dispositivos móveis (250px até 60vh).
- **Espaçamento Interno (Padding)**: Ajuste em pixels para margens de respiro superior e inferior.

### 2. Aba Fundo
- **Imagem de Fundo em Alta Resolução**: Seletor integrado à biblioteca de mídia do WordPress (`MediaUpload`).
- **Ponto Focal da Imagem**: Permite travar a área mais importante da imagem para evitar cortes indesejados.
- **Velocidade do Paralaxe**: Ajuste milimétrico da taxa de deslocamento (recomendado: 0.3 para efeito natural).
- **Direção do Efeito**: Modo descendente natural (`down`) ou ascendente inverso (`up`).

### 3. Aba Sobreposição (Overlay)
- **Cor da Sobreposição**: Paleta de cores para realçar a legibilidade do texto frontal.
- **Opacidade**: Controle deslizante de transparência de 0% a 95%.
- **Modo de Mesclagem (Blend Mode)**: Permite efeitos cinematográficos e artísticos integrados à imagem de fundo.

---

## 🌐 Internacionalização (i18n)

O bloco possui suporte nativo a múltiplos idiomas com arquivos de tradução inclusos na pasta `languages/`:
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
