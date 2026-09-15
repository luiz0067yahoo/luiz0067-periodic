<!--
  Module: periodic-thumbnail-pdf-link-multiple
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Thumbnail Pdf Link Multiple

> Consolidated module standardized under namespace `.periodic-thumbnail-pdf-link-multiple`.

---

# periodic‑multi‑pdf‑image

![Block preview](gutenberg_block_root.jpg)

## 📖 Visão geral
Um bloco Gutenberg para WordPress que permite criar **galerias de PDFs** com miniatura de capa. Cada item da galeria exibe:
- Thumbnail da capa (gerado via PDF.js ou imagem selecionada manualmente);
- Título e descrição curta editáveis com **RichText**;
- Botões para abrir o PDF em nova aba ou fazer download direto.

O bloco oferece layout em grade responsiva, controle de número de colunas e reordenação dinâmica dos itens.

---

## 🚀 Instalação
1. Copie a pasta `periodic-multi-pdf-image` para `wp-content/plugins/` do seu site WordPress.
2. Acesse **Plugins → Plugins instalados** e clique **Ativar**.
3. O bloco será registrado automaticamente com o nome `custom‑adm/multi-pdf-image` (ou `periodic/multi-pdf-image`).

> **Nota:** O plugin carrega a biblioteca **PDF.js** a partir de um CDN; certifique‑se de que seu site tem acesso à internet.

---

## 🎛️ Como usar
1. No editor Gutenberg, clique no sinal **+** e procure por **Múltiplos PDFs com Imagem**.
2. No painel lateral (**Inspector Controls**) você pode:
   - Definir o número de colunas (padrão: 3);
   - Adicionar, remover ou reordenar itens.
3. Dentro de cada item:
   - **Selecionar capa** – escolha uma imagem ou deixe o plugin gerar a miniatura da primeira página do PDF;
   - **Selecionar PDF** – carregue o arquivo PDF (tipo `application/pdf`).
   - **Título do documento** e **Descrição curta** – campos editáveis com RichText;
   - **Abrir em nova aba** – toggle para abrir o PDF em nova janela;
   - **Forçar download** – toggle para baixar o PDF ao clicar.
4. Salve a página/post e visualize a galeria front‑end.

---

## 🌐 Traduções (i18n)
O bloco está preparado para internacionalização via `__()` e arquivos **.po/.mo**. Foram incluídas traduções para:
- pt‑BR
- en‑US
- es‑ES
- it‑IT

Os arquivos de idioma residem em `languages/` e são carregados automaticamente conforme o idioma do site (Configurações → Geral → Idioma do site).

---

## 📸 Captura de tela
![Block preview](file:///C:/Users/usuario/.gemini/antigravity-ide/brain/b32be6c3-0280-4c24-b643-fd8b9bdff192/multi_pdf_image_block_preview_1789173932297.jpg)

---

## 🛠️ Desenvolvimento
- **PHP** – `periodic-multi-pdf-image.php` registra o bloco e enfileira scripts e estilos.
- **JS** – `js/blocks/multi-pdf-image.js` contém a lógica completa (edit / save) usando a API global `wp.*` (sem JSX).
- **CSS** – `css/style.css` implementa um grid responsivo com suporte a diferentes contagens de colunas.
- **Ícone** – SVG em `assets/icon.svg`.

Para contribuir, clone o repositório, faça alterações e envie um Pull Request.

---

## 📄 Licença
Distribuído sob a licença **GPL‑2.0 or later**. Consulte o arquivo `LICENSE` para detalhes.
