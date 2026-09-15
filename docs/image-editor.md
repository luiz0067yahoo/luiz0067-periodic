<!--
  Module: periodic-image-editor
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Image Editor

> Consolidated module standardized under namespace `.periodic-image-editor`.

---

# Periodic Image Editor

**Periodic Image Editor** é um plugin de bloco Gutenberg para WordPress que permite aos editores de conteúdo reposicionar, girar, aplicar zoom e enquadrar imagens com precisão matemática em tempo real diretamente no editor e nas páginas do site.

Inspirado nos recursos de manipulação de imagem do repositório `3am.adm.web` (`src/app/pages/operator/form-image`), o bloco adota a arquitetura de blocos do ecossistema Periodic, integrando Bootstrap 5, Font Awesome 6, React JSX, `block.json` v3 e renderização WYSIWYG fluida.

---

## 🌟 Recursos Principais

- **Zoom Dinâmico (Escala):** Fator de zoom ajustável de 0.5x a 3.5x com controles deslizantes e botões de atalho rápido (100%, 150%, 200%).
- **Rotação de 0° a 360°:** Giro angular preciso em graus, com botões rápidos de rotação horária (+90°), anti-horária (-90°) e zeramento imediato.
- **Posicionamento nos Eixos X e Y:** Ajuste fino de translação horizontal e vertical (-300px a +300px), permitindo enquadrar e focar no detalhe desejado da foto.
- **Integração Nativa com MediaUpload:** Envie novas fotos ou escolha diretamente da Biblioteca de Mídia do WordPress com preview instantâneo.
- **Moldura Responsiva com Bootstrap 5:** Definição de altura do contêiner (`300px` a `650px`), cantos arredondados (`rounded-0`, `rounded`, `rounded-3`, `rounded-circle`) e sombras sofisticadas (`shadow-sm`, `shadow`, `shadow-lg`).
- **Barra Flutuante de Atalhos Rápidos:** Botões de zoom in, zoom out, giro 90° e reset posicionados elegantemente sobre a imagem no canvas do Gutenberg.
- **Internacionalização Pronta (I18n):** Arquivos de tradução em formato JSON oficial do Gutenberg para Português (`pt-br.json`), Inglês (`en-us.json`), Italiano (`it.json`) e Espanhol (`es.json`).

---

## 📋 Requisitos do Sistema

- **WordPress:** 6.0 ou superior
- **PHP:** 7.4 ou superior
- **Navegadores:** Chrome, Firefox, Safari, Edge (versões modernas)

---

## 🧩 Como Usar o Bloco no Editor Gutenberg

Insira o bloco pesquisando por **Periodic Image Editor** na biblioteca de blocos. No painel lateral direito (*InspectorControls*), configure as transformações através de três abas intuitivas:

### 🔹 Aba 1: "Mídia e Seleção"
- **Seleção de Imagem:** Envie uma imagem pelo botão nativo do WordPress ou substitua a foto atual.
- **Texto Alternativo (Alt Text):** Preencha a descrição da imagem para leitores de tela e SEO.
- **Altura do Contêiner:** Escolha a altura fixa do enquadramento (`300px`, `400px`, `450px`, `550px`, `650px`).
- **Cantos Arredondados:** Opções Bootstrap 5 (`rounded-0` a `rounded-circle`).
- **Sombra:** Selecione o efeito de relevo e profundidade visual.

### 🔹 Aba 2: "Zoom e Rotação"
- **Fator de Zoom:** Controle deslizante com precisão de 0.05 e porcentagem em tempo real (ex: `140%`).
- **Atalhos de Zoom:** Botões para definir rapidamente 1x, 1.5x e 2x.
- **Giro e Rotação:** Ajuste contínuo de 0° a 360° e botões para giros rápidos de 90° e 180°.

### 🔹 Aba 3: "Posicionamento X / Y"
- **Eixo X:** Desloque a imagem horizontalmente para a esquerda ou direita.
- **Eixo Y:** Desloque a imagem verticalmente para cima ou para baixo.
- **Centralizar:** Botão rápido para resetar coordenadas X e Y para zero.
- **Comportamento (Object Fit):** Alternância entre `cover`, `contain` e `fill`.
- **Resetar Todas as Transformações:** Restaura instantaneamente o zoom para 1, rotação para 0° e coordenadas X/Y para 0.

---

## 📸 Screenshots Demonstrativos

Os arquivos ilustrativos vetoriais encontram-se no diretório `assets/screenshots/`:

| Arquivo | Descrição |
| :--- | :--- |
| [`screenshot-1-media-selection.svg`](assets/screenshots/screenshot-1-media-selection.svg) | Aba 1: Mídia e Seleção com upload e ajustes de moldura |
| [`screenshot-2-zoom-rotation.svg`](assets/screenshots/screenshot-2-zoom-rotation.svg) | Aba 2: Controles deslizantes de Zoom e Rotação |
| [`screenshot-3-position-xy.svg`](assets/screenshots/screenshot-3-position-xy.svg) | Aba 3: Deslocamento de eixos X e Y e reset de transformações |
| [`screenshot-4-frontend-preview.svg`](assets/screenshots/screenshot-4-frontend-preview.svg) | Visualização da imagem transformada no frontend responsivo |

---

## 🌐 Internacionalização (I18n)

O diretório `languages/` contém as traduções completas nos seguintes idiomas:
- `pt-br.json` (Português do Brasil)
- `en-us.json` (Inglês)
- `it.json` (Italiano)
- `es.json` (Espanhol)

---

## 🛠️ Instalação e Compilação

```bash
# 1. Instalar dependências npm
npm install

# 2. Compilar para produção
npm run build

# 3. Modo desenvolvimento
npm run start
```

---

## 👤 Metadados de Autoria

- **Autor:** Luiz Fernando Brogliatto Ferreira
- **WordPress.org:** [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub:** [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn:** [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**.
