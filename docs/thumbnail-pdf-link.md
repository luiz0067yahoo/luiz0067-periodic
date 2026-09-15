<!--
  Módulo: periodic-thumbnail-pdf-link
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Thumbnail Pdf Link

> Módulo consolidado e padronizado sob o namespace `.periodic-thumbnail-pdf-link`.

---

# periodic Mini PDF Image 📄

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![PDF.js](https://img.shields.io/badge/PDF.js-Included-red.svg?logo=adobe-acrobat-reader)](https://mozilla.github.io/pdf.js/)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block-black.svg?logo=wordpress)](https://wordpress.org/gutenberg/)
[![GitHub](https://img.shields.io/badge/GitHub-periodicyahoo-181717.svg?logo=github)](https://github.com/periodicyahoo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Luiz_Fernando-0A66C2.svg?logo=linkedin)](https://www.linkedin.com/in/luiz-fernando-brogliatto-ferreira-2375047b/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin completo para WordPress com Custom Block Gutenberg chamado **"Mini PDF Image"** (`periodic/mini-pdf-image` / `cms-adm/mini-pdf-image`), destinado à exibição elegante, responsiva e performática de cards e links para documentos PDF acompanhados de capa ou miniatura gerada automaticamente a partir da 1ª página do arquivo.

---

## 📸 Screenshots

| Editor Gutenberg (Edição Visual & PDF.js) | Frontend Responsivo (Grid & Cards PDF) |
| :---: | :---: |
| ![Gutenberg Editor](assets/screenshot-1.png) | ![Frontend Preview](assets/screenshot-2.png) |

---

## 🚀 Principais Recursos

- **Geração Automática de Miniaturas via PDF.js**:
  - Ao selecionar qualquer arquivo PDF na biblioteca de mídia do WordPress, o plugin renderiza automaticamente a primeira página do documento em resolução nítida e salva como miniatura estática.
  - **Zero Dependência do Servidor**: Não exige Ghostscript, ImageMagick ou bibliotecas nativas de servidor ativadas. Funciona com perfeição até em hospedagens compartilhadas mais restritivas.
- **Capa Customizável**:
  - Além da miniatura automática da página do PDF, permite escolher uma imagem própria na galeria de mídia para atuar como capa/miniatura do card.
- **Grade Responsiva Flexível (CSS Grid)**:
  - Opções de **1, 2, 3 ou 4 colunas por linha** no desktop (padrão: 3 colunas).
  - Breakpoints inteligentes: adaptação suave para 2 colunas em tablets e 1 coluna em smartphones.
- **Opções Avançadas no Painel Lateral (Inspector Controls)**:
  - **Estilos de Card**: Padrão (Clean com hover lift), Com Borda, Sombra Elevada e Plano/Minimalista.
  - **Proporção da Capa (Aspect Ratio)**: Quadrado (1:1), Documento / A4 (3:4) e Horizontal (16:9).
  - **Toggles Visuais**: Ativar/desativar exibição de data, descrição, selo PDF e botão de ação.
  - **Texto do Botão Customizável**: Altere o rótulo de download/visualização (ex.: "Acessar PDF", "Baixar Documento").
- **Gestão Ágil de Documentos no Editor**:
  - ➕ **Adicionar**: Insira novos cards com um clique.
  - ⬅️ / ➡️ **Reordenar**: Mova cards para os lados facilmente.
  - 🗑️ **Excluir**: Remova itens indesejados rapidamente.
- **Edição Semântica e Inline com RichText**:
  - Títulos e descrições editáveis diretamente na tela de edição.
  - Abertura segura em nova aba (`target="_blank"` com `rel="noopener noreferrer"`).
- **Compatibilidade Retroativa Total (cms-adm/mini-pdf)**:
  - Lê e migra automaticamente posts que utilizavam o bloco legado `cms-adm/mini-pdf`, mantendo compatibilidade total sem quebras de validação no Gutenberg.
- **Internacionalização Pronta (i18n)**:
  - Totalmente traduzido em **Português do Brasil (pt-BR)**, **Inglês (en)**, **Espanhol (es)** e **Italiano (it)**.
  - Painel administrativo em `Configurações > periodic Mini PDF` para fixar o idioma ou detectar automaticamente o locale do WordPress.
- **Autossuficiente e Modular**:
  - Todos os assets (estilos, scripts e bibliotecas PDF.js) estão incluídos localmente no pacote do plugin. Não depende de conexões com CDNs externas.

---

## 📂 Estrutura de Arquivos do Plugin

```text
periodic-thumbnail-pdf-link/
├── periodic-mini-pdf-image.php  # Arquivo principal (headers WP, register_block_type, enqueues)
├── plugin/
│   ├── blocks.php               # Registro de scripts, estilos, i18n e register_block_type
│   └── settings.php             # Painel de configurações no admin WP (seletor de idiomas)
├── assets/
│   ├── js/
│   │   ├── block.js             # Registro do bloco Gutenberg (edit, save, seletores de mídia, PDF.js)
│   │   └── frontend.js          # Scripts complementares para front (clique do card e acessibilidade)
│   ├── css/
│   │   ├── editor.css           # Estilos para o canvas e painel lateral no Gutenberg
│   │   └── style.css            # Estilos da miniatura, grid responsivo e cards no frontend
│   └── vendor/
│       └── pdfjs/               # Motor local do PDF.js (sem dependências externas)
│           ├── pdf.min.js
│           └── pdf.worker.min.js
├── languages/
│   ├── pt-br.json               # Tradução em Português
│   ├── en.json                  # Tradução em Inglês
│   ├── es.json                  # Tradução em Espanhol
│   └── it.json                  # Tradução em Italiano
└── README.md                    # Documentação do projeto
```

---

## 🛠️ Instalação

### Opção 1: Via Painel do WordPress (Upload ZIP)
1. Compacte o conteúdo desta pasta em um arquivo `.zip`.
2. No painel do WordPress, vá para **Plugins > Adicionar Novo > Enviar Plugin**.
3. Escolha o arquivo `.zip` e clique em **Instalar Agora**.
4. Clique em **Ativar Plugin**.

### Opção 2: Via Git / Pasta wp-content/plugins
1. Clone este repositório dentro do diretório de plugins do seu WordPress:
   ```bash
   git clone https://github.com/periodicyahoo/periodic-thumbnail-pdf-link.git wp-content/plugins/periodic-thumbnail-pdf-link
   ```
2. Acesse o painel do WordPress em **Plugins**.
3. Localize **periodic Mini PDF Image** e clique em **Ativar**.

---

## 💡 Como Usar

1. No painel do WordPress, crie ou edite um post, página ou modelo no **Gutenberg**.
2. Clique no botão **`+`** (Inserir Bloco) e busque por **"Mini PDF"**, **"PDF"** ou **"periodic"**.
3. O bloco será inserido com a interface de cards.
4. No card, clique no botão **"Selecionar Anexo / PDF"** para abrir a biblioteca de mídia:
   - Selecione um arquivo PDF já enviado ou envie um novo arquivo.
   - O plugin lerá a 1ª página do PDF e gerará a miniatura automaticamente.
5. Se preferir uma arte gráfica específica de capa, clique em **"Alterar Miniatura"** e escolha qualquer imagem da biblioteca.
6. Edite o título do documento e a descrição diretamente no card.
7. Use o painel lateral (**Configurações do Bloco**) para ajustar número de colunas (1 a 4), formato da capa (1:1, 3:4 ou 16:9), estilo do card e elementos visíveis.
8. Salve ou publique a página. No frontend, os visitantes verão uma grade responsiva com visual moderno e links diretos para os PDFs.

---

## ⚙️ Configurações de Idioma

Acesse **Configurações > periodic Mini PDF** no menu lateral do WordPress:
- **Auto**: Segue o idioma configurado no perfil do usuário no WordPress.
- **Português (Brasil)**: Força a interface do bloco para pt-BR.
- **English**: Força a interface do bloco para Inglês.
- **Español**: Força a interface do bloco para Espanhol.
- **Italiano**: Força a interface do bloco para Italiano.

---

## 📄 Licença

Distribuído sob a licença **GPLv2 ou superior** (GNU General Public License v2.0 or later). Consulte o arquivo de licença para mais informações.

---

## 👨‍💻 Autor / Author

Desenvolvido por **Luiz Fernando Brogliatto Ferreira**

- 🌐 **WordPress**: [profiles.wordpress.org/periodic](https://profiles.wordpress.org/periodic/)
- 💼 **LinkedIn**: [Luiz Fernando Brogliatto Ferreira](https://www.linkedin.com/in/luiz-fernando-brogliatto-ferreira-2375047b/)
- 🐙 **GitHub**: [@periodicyahoo](https://github.com/periodicyahoo)