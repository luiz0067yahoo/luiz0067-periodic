<!--
  Module: periodic-faq-schema
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Faq Schema

> Consolidated module standardized under namespace `.periodic-faq-schema`.

---

# Periodic FAQ Schema

[![WordPress Block](https://img.shields.io/badge/WordPress-Gutenberg%20Block-blue.svg)](https://wordpress.org)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)
[![Font Awesome 6](https://img.shields.io/badge/Font%20Awesome-6.5-orange.svg)](https://fontawesome.com/)
[![Schema.org](https://img.shields.io/badge/Schema.org-FAQPage%20JSON--LD-brightgreen.svg)](https://schema.org/FAQPage)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**Periodic FAQ Schema** é um bloco nativo Gutenberg avançado para criação de sanfonas de Perguntas Frequentes (FAQ). Projetado com base no padrão arquitetural Bootstrap 5 e ícones Font Awesome 6, o bloco gera e injeta automaticamente a marcação estruturada **`schema.org/FAQPage`** em formato **JSON-LD** no código-fonte da página, qualificando seu conteúdo para a exibição de **Rich Snippets** (resultados aprimorados) no Google e demais mecanismos de busca.

---

## 👨‍💻 Autoria e Metadados

- **Desenvolvedor:** Luiz Fernando Brogliatto Ferreira
- **Perfil WordPress.org:** [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **Perfil GitHub:** [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **Perfil LinkedIn:** [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 🚀 Principais Recursos

- **Marcação Estruturada Automática (JSON-LD):** Gera o objeto semântico `FAQPage` da Schema.org em conformidade estrita com as diretrizes do Google Search Central.
- **Edição WYSIWYG Nativa:** Edite perguntas e respostas diretamente no canvas do editor Gutenberg, com suporte a negrito, itálico, links e listas na resposta.
- **Design System Bootstrap 5:** Estrutura HTML semântica com classes nativas (`accordion`, `accordion-item`, `accordion-button`, `accordion-collapse`, `accordion-body`) e suporte nativo a acessibilidade (`aria-expanded`, `aria-controls`).
- **Ícones Font Awesome 6:** Alternância entre chevrons animados, ícones de mais/menos (+/-), setas nativas Bootstrap ou modo sem ícone.
- **Selo Visual de SEO no Editor:** Indicador luminoso em tempo real confirmando se a injeção do Schema JSON-LD está ativa.
- **InspectorControls em Abas:** Organização intuitiva dividida em 3 abas dedicadas: *Perguntas e Respostas*, *Configurações de SEO* e *Estilo do Accordion*.
- **Compatibilidade Universal:** Inclui script frontend leve (`view.js`) para garantir o colapso/expansão suave mesmo em temas que não utilizam o script do Bootstrap.
- **Internacionalização Pronta (i18n):** Suporte completo aos idiomas Português do Brasil (`pt-br`), Inglês (`en-us`), Italiano (`it`) e Espanhol (`es`).

---

## 🎛️ Guia Detalhado do Painel Lateral (InspectorControls)

O painel lateral de configurações do bloco foi desenvolvido com um componente de abas (`TabPanel`) para oferecer clareza e produtividade. Abaixo está a descrição detalhada de cada aba:

### 1. Aba "Perguntas e Respostas" (Gerenciador de Tópicos)
Nesta aba, você visualiza o panorama completo das perguntas cadastradas e gerencia a hierarquia dos itens:
- **Lista de Tópicos:** Mostra a numeração (`#1`, `#2`, etc.) e o título resumido de cada pergunta.
- **Mover para cima / Mover para baixo:** Botões rápidos de ordenação para reordenar perguntas sem necessidade de recortar e colar textos.
- **Excluir Pergunta:** Remove a pergunta selecionada (com proteção para manter pelo menos uma pergunta no bloco).
- **Aberto inicialmente por padrão:** Permite definir se aquele item específico deve ser carregado já expandido quando o visitante acessar a página.
- **Botão "Adicionar Nova Pergunta":** Cria um novo item imediatamente no final da sanfona e já o abre no editor para digitação imediata.

> 📷 **Screenshot de Referência:** `assets/screenshots/02-tab-perguntas-respostas.png`

---

### 2. Aba "Configurações de SEO" (Schema.org JSON-LD)
Dedicada à indexação e presença orgânica nos motores de busca:
- **Toggle "Ativar Schema.org FAQPage (JSON-LD)":** Liga ou desliga a injeção do script estruturado no frontend. Quando ativado, o selo verde no editor pulsa confirmando a integridade do schema.
- **Diretrizes do Google Rich Results:** Alerta informativo com as recomendações de qualidade do Google (correspondência fiel entre o conteúdo visível e os dados estruturados, proibição de conteúdo promocional enganoso).
- **Prévia dos Dados Estruturados em Tempo Real:** Uma janela de código (`<pre>`) exibe exatamente o payload JSON-LD formatado que será renderizado no frontend. Conforme você digita perguntas e respostas, o JSON é atualizado instantaneamente.

> 📷 **Screenshot de Referência:** `assets/screenshots/03-tab-seo-schema.png`

---

### 3. Aba "Estilo do Accordion"
Permite personalizar o layout e a identidade visual da sanfona:
- **Estilo Flush (sem bordas externas):** Remove bordas e cantos arredondados externos para encaixe alinhado de ponta a ponta, conforme o estilo `.accordion-flush` do Bootstrap 5.
- **Permitir múltiplos itens abertos (`alwaysOpen`):** Quando desativado, abrir uma pergunta fecha automaticamente as demais (`data-bs-parent`). Quando ativado, o visitante pode expandir múltiplos tópicos simultaneamente.
- **Tag Semântica do Cabeçalho:** Permite escolher entre `H2`, `H3`, `H4`, `H5`, `H6` ou `DIV` para os botões do accordion, garantindo hierarquia semântica perfeita para SEO e leitores de tela.
- **Estilo do Ícone Indicador:**
  - *Font Awesome 6 (Chevron):* Seta clássica com rotação de 180 graus suave.
  - *Font Awesome 6 (Mais / Menos):* Ícone dinâmico que alterna entre `+` e `-`.
  - *Bootstrap 5 Padrão (SVG):* Ícone vetorial nativo do Bootstrap embutido via data-URI.
  - *Nenhum (Sem Ícone):* Exibição limpa apenas com os textos.
- **Cores Personalizadas:** Seletor de cor de destaque para o fundo ativo e texto do item em foco.

> 📷 **Screenshot de Referência:** `assets/screenshots/04-tab-estilo-accordion.png`

---

## 🖼️ Galeria de Screenshots

As imagens ilustrativas da interface encontram-se no diretório `assets/screenshots/`:

| Arquivo | Descrição |
| :--- | :--- |
| `01-editor-wysiwyg.png` | Visão geral do editor Gutenberg com o selo visual de SEO Schema ativo e controles inline. |
| `02-tab-perguntas-respostas.png` | Aba lateral de gerenciamento e reordenação de tópicos de perguntas. |
| `03-tab-seo-schema.png` | Aba lateral de SEO com alternador de Schema.org e visualizador em tempo real do JSON-LD. |
| `04-tab-estilo-accordion.png` | Aba lateral com opções de estilo Flush, múltiplos itens e ícones Font Awesome. |
| `05-frontend-google-rich-result.png` | Demonstração do bloco renderizado no frontend e visualização em Rich Snippet no Google. |

### Como Gerar / Atualizar Screenshots

Para capturar novas telas do painel no ambiente de desenvolvimento:
1. Abra um post ou página no WordPress com o bloco inserido.
2. Abra o painel lateral de configurações do bloco (lado direito da tela).
3. Selecione sucessivamente cada uma das três abas (*Perguntas e Respostas*, *Configurações de SEO* e *Estilo do Accordion*).
4. Utilize a ferramenta de captura do sistema (ou browser subagent) na resolução recomendada de `1280x720` ou `800x600`.
5. Salve os arquivos PNG na pasta `assets/screenshots/` com as nomenclaturas listadas na tabela acima.

---

## 📁 Estrutura de Arquivos e Pastas

```
periodic-faq-schema/
├── periodic-faq-schema.php     # Inicialização do plugin e hooks WordPress
├── block.json                 # Metadados e schema do bloco (API v3)
├── package.json               # Gerenciador de pacotes e scripts de build
├── readme.md                  # Documentação completa e instruções de uso
├── src/
│   ├── index.js               # Registro do bloco Gutenberg
│   ├── edit.js                # Interface do editor com abas e edição WYSIWYG
│   ├── save.js                # Renderização HTML Bootstrap 5 e script JSON-LD
│   ├── view.js                # Script frontend para colapso autônomo e ícones
│   ├── editor.scss            # Estilos específicos do editor e badge de SEO
│   └── style.scss             # Estilos universais do accordion (frontend e backend)
├── languages/
│   ├── pt-br.json             # Tradução em Português do Brasil
│   ├── en-us.json             # Tradução em Inglês
│   ├── it.json                # Tradução em Italiano
│   └── es.json                # Tradução em Espanhol
└── assets/
    └── screenshots/           # Capturas de tela e recursos visuais do painel
        ├── 01-editor-wysiwyg.png
        ├── 02-tab-perguntas-respostas.png
        ├── 03-tab-seo-schema.png
        ├── 04-tab-estilo-accordion.png
        └── 05-frontend-google-rich-result.png
```

---

## 🛠️ Instalação e Compilação

### Requisitos
- WordPress 6.0 ou superior
- PHP 7.4 ou superior
- Node.js 18+ e npm

### Passos de Instalação
1. Clone ou faça o download deste repositório na pasta `wp-content/plugins/periodic-faq-schema`:
   ```bash
   git clone https://github.com/periodicyahoo/periodic-faq-schema.git
   ```
2. Acesse a pasta do plugin no terminal e instale as dependências:
   ```bash
   npm install
   ```
3. Compile os assets para produção:
   ```bash
   npm run build
   ```
4. No painel administrativo do WordPress, vá em **Plugins > Plugins Instalados** e ative o plugin **Periodic FAQ Schema**.
5. Abra qualquer página ou post, clique no botão `+` para adicionar blocos e pesquise por **FAQ Sanfona com Schema.org** ou pelo termo **periodic**.

---

## 🔍 Exemplo de Marcação JSON-LD Gerada

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Como funciona a marcação Schema.org FAQPage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A marcação estruturada JSON-LD permite que motores de busca como o Google compreendam perguntas e respostas, exibindo rich snippets diretamente nos resultados de pesquisa."
      }
    },
    {
      "@type": "Question",
      "name": "Preciso de plugins adicionais para o design Bootstrap?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. O bloco já inclui estilos compatíveis com o Bootstrap 5 e ícones Font Awesome 6, funcionando com total integridade visual em qualquer tema WordPress."
      }
    }
  ]
}
</script>
```

---

## 📄 Licença

Este projeto está licenciado sob os termos da licença **GPL-2.0-or-later** (General Public License v2 ou posterior).
