<!--
  Module: periodic-structured-writing
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Structured Writing

> Consolidated module standardized under namespace `.periodic-structured-writing`.

---

# Periodic Structured Writing ✍️📑

Plugin WordPress com bloco Gutenberg para escrita guiada em seções estruturadas (Notas Cornell, Escrita Passo a Passo e Relatório Técnico) com salvamento no LocalStorage, cópia formatada em Markdown e exportação/impressão em PDF limpa e otimizada baseada em **Bootstrap 5**.

![Periodic Structured Writing - Demonstração](screenshot.png)

---

## 🚀 Principais Recursos

1. **Modelos Pedagógicos & Metodologias Consagradas (`templateType`)**:
   - **Notas Cornell (`cornell`)**: Estrutura consagrada para anotações acadêmicas com coluna lateral para tópicos e perguntas-chave (`col-md-4`), coluna principal para notas e esquemas (`col-md-8`) e área de fechamento para síntese (`col-12`).
   - **Escrita Passo a Passo (`step-by-step`)**: Fluxo com abas numeradas interativas (`nav nav-pills`), facilitando a escrita progressiva (Introdução & Tese, Desenvolvimento & Repertório, Conclusão & Proposta de Intervenção) com botões de navegação "Próxima Etapa" e "Etapa Anterior".
   - **Relatório Técnico & Executivo (`report-doc`)**: Estrutura modular em grade executiva (Objetivo & Escopo, Metodologia & Instrumentação, Resultados & Recomendações).

2. **Salvamento Automático no LocalStorage**:
   - Evita perda de dados e rascunhos em caso de recarga acidental da página ou fechamento do navegador.
   - Auto-save contínuo com *debounce* inteligente (400ms).
   - Identificação exclusiva por página e bloco, permitindo múltiplos blocos por site ou post.
   - Indicador visual em tempo real no cabeçalho (*"Salvando rascunho..."*, *"Salvo no navegador"*, *"Rascunho recuperado"*).

3. **Exportação / Impressão em PDF Otimizada (`@media print`)**:
   - Estilização de impressão profissional formato A4.
   - Oculta controles de tela (botões, abas, navegadores, cabeçalhos do site e contadores).
   - Sincronização e quebra de linha inteligente para o conteúdo preenchido, formatando um documento limpo e pronto para entrega ou arquivamento formal.
   - No modo Passo a Passo, o gerador de impressão expande todas as etapas simultaneamente para compor o documento completo.

4. **Cópia Formatada para a Área de Transferência**:
   - Exporta o título, subtítulo e todas as seções preenchidas organizadas em sintaxe **Markdown** limpa (`#`, `##`, listas).
   - Utiliza a Clipboard API moderna com fallback seguro (`document.execCommand`).
   - Notificação em *toast* discreta e acessível.

5. **Contador Dinâmico de Palavras e Caracteres**:
   - Computa a contagem de palavras e caracteres individualmente por seção e globalmente no rodapé.

6. **Experiência do Professor no Gutenberg (`edit.js`)**:
   - Seletor de Modelo com opção de restaurar textos padrão recomendados.
   - Chaves de ativação (`ToggleControl`) para Impressão/PDF, Cópia Formatada, Limpeza de Rascunho e Contagem de Palavras.
   - Gerenciador Dinâmico de Seções com capacidade de:
     - Customizar Título da Seção.
     - Customizar Orientações Pedagógicas / Prompt Guidance (com destaque visual em callout).
     - Customizar Texto de Marcador (Placeholder).
     - Alterar Largura de Coluna Bootstrap (`col-12`, `col-md-6`, `col-md-4`, `col-md-8`).
     - Adicionar, excluir e reordenar seções (mover para cima/baixo).
   - Edição *WYSIWYG* rápida diretamente no canvas do editor (`RichText`).

7. **Internacionalização Pronta (i18n)**:
   - Suporte completo a múltiplos idiomas com arquivos JSON incluídos nas pastas `languages/` e `languagens/`:
     - 🇧🇷 Português do Brasil (`pt-br.json`)
     - 🇺🇸 Inglês (`en-us.json`)
     - 🇮🇹 Italiano (`it.json` / `It.json`)
     - 🇪🇸 Espanhol (`es.json`)

---

## 📋 Atributos do Bloco (`block.json`)

| Atributo | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `templateType` | `string` | `"cornell"` | Tipo de metodologia estruturada: `'cornell'`, `'step-by-step'` ou `'report-doc'`. |
| `documentTitle` | `string` | `"Anotações e Escrita Estruturada"` | Título principal da atividade ou documento. |
| `documentSubtitle` | `string` | `"Organize suas ideias..."` | Orientações gerais exibidas no cabeçalho. |
| `allowPrintPdf` | `boolean` | `true` | Ativa o botão de impressão com layout otimizado para salvar em PDF. |
| `allowCopy` | `boolean` | `true` | Habilita botão para copiar todo o conteúdo estruturado em Markdown. |
| `allowClearDraft` | `boolean` | `true` | Habilita botão de exclusão de rascunho com diálogo de confirmação. |
| `showWordCount` | `boolean` | `true` | Exibe contador dinâmico de palavras e caracteres por seção e total. |
| `sections` | `array` | *(Array de Seções)* | Lista de seções do documento contendo `id`, `title`, `placeholder`, `promptGuidance` e `colSpan`. |

---

## 📁 Estrutura de Arquivos

```text
periodic-structured-writing/
├── .gitignore
├── package.json                         # Configurações do npm e scripts @wordpress/scripts
├── periodic-structured-writing.php      # Plugin principal WordPress com registro e enqueue do Bootstrap 5
├── README.md                            # Documentação completa do projeto
├── screenshot.png                       # Captura de tela da interface do bloco na raiz
├── test-preview.html                    # Página de teste interativo standalone (Cornell, Passo a Passo, Relatório)
├── languages/                           # Pasta oficial de traduções WordPress
│   ├── pt-br.json
│   ├── en-us.json
│   ├── it.json
│   └── es.json
├── languagens/                          # Pasta de traduções (compatibilidade com diretório alternativo)
│   ├── pt-br.json
│   ├── en-us.json
│   ├── it.json
│   ├── It.json
│   └── es.json
├── build/                               # Arquivos compilados para produção
│   ├── block.json
│   ├── index.js
│   ├── index.css
│   ├── style-index.css
│   ├── view.js
│   ├── index.asset.php
│   └── view.asset.php
└── src/                                 # Código-fonte
    ├── block.json                       # Schema, atributos e metadados Gutenberg
    ├── index.js                         # Ponto de entrada e registro do bloco
    ├── edit.js                          # Componente do editor com InspectorControls e canvas WYSIWYG
    ├── save.js                          # Renderização HTML semântica com Bootstrap 5 e data-attributes
    ├── view.js                          # Lógica frontend: LocalStorage, @media print, Clipboard e abas
    ├── style.scss                       # Estilos frontend e regras completas de @media print
    └── editor.scss                      # Estilos específicos do editor
```

---

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js (v18+)
- npm
- WordPress 6.1+ (com suporte à Block API v3)
- PHP 7.4+

### Compilação do Código

```bash
# Instalar dependências
npm install

# Compilar para produção
npm run build

# Modo de observação (desenvolvimento contínuo)
npm run start
```

### Teste Local sem WordPress

Abra o arquivo `test-preview.html` diretamente em seu navegador web para testar a interface interativa, alternar entre os modelos **Cornell**, **Passo a Passo** e **Relatório**, validar a persistência no `LocalStorage`, copiar o texto formatado e disparar a visualização de impressão/PDF.

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte `LICENSE` para mais detalhes.
Criado por **Luiz** (periodic).
