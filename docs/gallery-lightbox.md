<!--
  Module: periodic-gallery-lightbox
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Gallery Lightbox

> Consolidated module standardized under namespace `.periodic-gallery-lightbox`.

---

# Periodic Gallery Lightbox

=== Periodic Gallery Lightbox ===
* **Contribuidores:** [periodic](https://profiles.wordpress.org/periodic/)
* **Tags:** gallery, galeria, lightbox, popup, bootstrap, font-awesome, gutenberg, fotos
* **Requer pelo menos:** 6.0
* **Testado até:** 6.7
* **Requer PHP:** 7.4
* **Versão Estável:** 1.0.0
* **Licença:** GPLv2 or later
* **Link da Licença:** https://www.gnu.org/licenses/gpl-2.0.html

Galeria responsiva de imagens com popup lightbox de tela cheia estilo LC-Lightbox em Vanilla JS, Bootstrap 5 e Font Awesome 6, com navegação circular, zoom panorâmico, miniaturas inferiores deslizantes e suporte a gestos touch.

---

## Descrição

O **Periodic Gallery Lightbox** é um plugin de bloco Gutenberg completo e moderno, concebido para oferecer uma experiência visual refinada de exibição e ampliação de fotografias em sites WordPress profissionais.

Desenvolvido sob a arquitetura de blocos de **Luiz Fernando Brogliatto Ferreira** (no mesmo padrão de excelência de *periodic-accordion*, *periodic-counter-stats* e *periodic-team-member*), o bloco combina renderização WYSIWYG nativa e em tempo real dentro do editor Gutenberg com um visualizador de tela cheia ultrarrápido em Vanilla JavaScript puro (sem qualquer dependência pesada de jQuery).

### Destaques e Diferenciais
* **Visualizador Lightbox em Tela Cheia**: Interface inspirada no estilo LC-Lightbox com transições suaves e design premium.
* **Navegação Circular Contínua**: Permite avançar da última para a primeira foto e voltar da primeira para a última de forma fluida.
* **Controle por Teclado e Acessibilidade**: Navegue entre as imagens usando as setas do teclado (`←` e `→`) e feche instantaneamente com a tecla `Escape`.
* **Zoom Interativo**: Botão dedicado de alternância de zoom e suporte a duplo clique para visualização minuciosa de detalhes da foto.
* **Barra Inferior de Miniaturas Deslizantes**: Fita sincronizada em tempo real que centraliza automaticamente a foto em exibição com destaque visual ativo.
* **Gestos Touch para Dispositivos Móveis**: Reconhecimento nativo de deslize horizontal (*swipe*) para navegação rápida em smartphones e tablets.
* **Grade Responsiva Bootstrap 5**: Controle independente de colunas para telas grandes (Desktop), médias (Tablet) e pequenas (Celular), com espaçamento ajustável (`g-1` a `g-5`).
* **Formatos de Corte da Imagem**: Exiba fotos em proporções clássicas (Quadrado 1:1, 4:3, Widescreen 16:9) ou na proporção original dos arquivos.
* **Modo de Teste no Editor**: Botão "Testar Lightbox Interativo" no próprio Gutenberg que permite experimentar a navegação sem sair do painel de edição.
* **Internacionalização Completa**: Suporte nativo a quatro idiomas: Português do Brasil (`pt-br`), Inglês Americano (`en-us`), Italiano (`it`) e Espanhol (`es`).

---

## Painel Lateral (InspectorControls) - Guia Minucioso das Abas

O painel de configurações do bloco está estruturado em três abas especializadas:

### 1. Aba: "Galeria de Imagens"
Esta aba concentra o gerenciamento dos arquivos fotográficos e dos dados textuais individuais de cada imagem:
* **Contador Geral de Fotos**: Exibe uma notificação informativa com o número total de fotos presentes na galeria.
* **Selecionar Imagens da Biblioteca**: Integração nativa com o `MediaUpload` do WordPress, permitindo selecionar múltiplas imagens de uma única vez.
* **Substituir / Reabrir Biblioteca**: Permite abrir a biblioteca de mídia para trocar o conjunto selecionado ou adicionar novas imagens.
* **Adicionar Mais Imagens**: Botão contextual para complementar a galeria com novos arquivos sem perder os itens existentes.
* **Seletor e Edição da Foto Ativa**:
  * **Visualização da Miniatura**: Exibe a prévia da imagem que está sendo personalizada no momento.
  * **Controles de Reordenação**: Botões de seta para mover a foto para a esquerda (`←`) ou para a direita (`→`), reorganizando a ordem visual da grade e do lightbox.
  * **Exclusão de Foto**: Botão para remover a imagem específica da galeria com um clique.
  * **Título da Imagem**: Campo de texto para atribuir um título legível à fotografia.
  * **Legenda Descritiva**: Campo textual amplo para observações contextuais, data, local ou créditos fotográficos.
  * **Texto Alternativo (Alt)**: Descrição para leitores de tela e conformidade estrita de acessibilidade web (WCAG).

### 2. Aba: "Layout da Grade"
Esta aba fornece controle total sobre a disposição espacial e a responsividade da grade Bootstrap 5:
* **Colunas no Desktop (Telas Grandes)**: Controle deslizante ajustável de **1 a 6 colunas**. Padrão recomendado: 3 ou 4 colunas.
* **Colunas no Tablet (Telas Médias)**: Controle deslizante ajustável de **1 a 4 colunas**. Padrão recomendado: 2 colunas.
* **Colunas no Celular (Mobile)**: Controle deslizante ajustável de **1 ou 2 colunas**. Padrão recomendado: 1 ou 2 colunas.
* **Espaçamento da Grade (Bootstrap Gap)**: Menu seletor com classes utilitárias nativas do Bootstrap:
  * *Mínimo (`g-1`)*: 4px de distância entre fotos.
  * *Pequeno (`g-2`)*: 8px de distância.
  * *Médio (`g-3` - Padrão)*: 16px de distância.
  * *Grande (`g-4`)*: 24px de distância.
  * *Extra Grande (`g-5`)*: 48px de distância.
* **Proporção das Miniaturas (Corte da Imagem)**:
  * *Quadrado 1:1 (Padrão)*: Padroniza todas as fotos em formato quadrado com recorte inteligente centralizado (`object-fit: cover`).
  * *Clássico 4:3*: Ideal para galerias fotográficas convencionais.
  * *Widescreen 16:9*: Formato retangular cinematográfico.
  * *Proporção Original*: Mantém a razão de aspecto nativa de cada arquivo fotográfico.

### 3. Aba: "Configurações do Lightbox"
Esta aba personaliza o comportamento estético e funcional da janela de exibição em tela cheia:
* **Tema Visual do Lightbox**:
  * *Escuro Elegante (`dark` - Padrão)*: Fundo escuro profundo com efeito de desfoque translúcido (`backdrop-filter: blur`), que realça o contraste das cores fotográficas.
  * *Claro Sofisticado (`light`)*: Fundo claro e moderno com tipografia escura, ideal para portfólios minimalistas e artísticos.
* **Exibir Títulos e Legendas**: Alternador (*toggle*) para mostrar ou ocultar as legendas na grade e no rodapé do lightbox.
* **Barra de Miniaturas Inferior**: Alternador (*toggle*) para ativar ou desativar o carrossel horizontal de miniaturas na base do popup.
* **Resumo de Atalhos e Recursos**: Painel explicativo com instruções de usabilidade:
  * Navegação pelas setas laterais no ecrã.
  * Teclas de atalho: `[←]` Foto Anterior, `[→]` Próxima Foto, `[Esc]` Sair do Lightbox.
  * Alternância de zoom no botão dedicado ou clique duplo.
  * Arraste horizontal (*swipe*) no mobile para trocar de imagem.

---

## Galeria de Screenshots e Demonstrações Visuais

A pasta `assets/screenshots/` contém os arquivos gráficos e mockups visuais representativos do plugin:

| Arquivo | Descrição |
| :--- | :--- |
| `assets/screenshots/screenshot-1.svg` | Visão geral da galeria com o popup lightbox em tela cheia ativo exibindo foto, zoom, navegação e miniaturas inferiores. |
| `assets/screenshots/screenshot-2.svg` | Painel lateral `InspectorControls` detalhando a aba **Galeria de Imagens** com seleção de fotos, reordenação e campos textuais. |
| `assets/screenshots/screenshot-3.svg` | Painel lateral detalhando a aba **Layout da Grade** com controles responsivos de colunas, espaçamento e proporção. |
| `assets/screenshots/screenshot-4.svg` | Painel lateral detalhando a aba **Configurações do Lightbox** com temas, alternadores de legendas/miniaturas e atalhos. |
| `assets/screenshots/README.md` | Guia completo com resolução e instruções de captura para substituição por imagens reais. |

### Como Gerar Screenshots Reais do Painel

Para registrar capturas reais da tela em seu ambiente local ou de homologação:
1. Acesse o painel de administração do WordPress.
2. Crie ou edite uma página no editor de blocos (Gutenberg).
3. Adicione o bloco **"Galeria com Lightbox"** e selecione fotos da biblioteca.
4. Abra o painel lateral e selecione sequencialmente as abas **Galeria de Imagens**, **Layout da Grade** e **Configurações do Lightbox**.
5. Utilize a ferramenta de captura do sistema operacional (`Windows + Shift + S` ou `Command + Shift + 4`).
6. Salve as imagens na pasta `assets/screenshots/` com os nomes `screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png` e `screenshot-4.png`.

---

## Instalação e Uso

1. Faça o download ou clone este repositório no diretório de plugins do WordPress:
   `/wp-content/plugins/periodic-gallery-lightbox/`
2. No terminal, execute a instalação de dependências e a compilação de assets (caso deseje desenvolver ou recompilar):
   ```bash
   npm install
   npm run build
   ```
3. Acesse o menu **Plugins** no painel administrativo do WordPress e ative o plugin **Periodic Gallery Lightbox**.
4. No editor Gutenberg de qualquer página ou post, clique no botão `+` e procure por **"Galeria com Lightbox"** ou utilize o atalho `/gallery-lightbox`.

---

## Estrutura de Diretórios do Projeto

```
periodic-gallery-lightbox/
├── periodic-gallery-lightbox.php  # Arquivo principal do plugin com enqueues e metadados
├── block.json                     # Schema v3 com atributos e vínculos de build
├── package.json                   # Dependências e scripts com @wordpress/scripts
├── webpack.config.js              # Configuração Webpack para compilação de index.js e view.js
├── build/                         # Arquivos finais compilados e otimizados
│   ├── index.js
│   ├── index.asset.php
│   ├── index.css
│   ├── view.js
│   ├── view.asset.php
│   └── style-index.css
├── src/
│   ├── index.js                   # Registro oficial do bloco
│   ├── edit.js                    # Edição WYSIWYG + InspectorControls com 3 abas
│   ├── save.js                    # Renderização estática com Bootstrap 5 e data-attributes
│   ├── view.js                    # Script Vanilla JS frontend (lightbox, zoom, touch)
│   ├── editor.scss                # Estilos do editor Gutenberg
│   └── style.scss                 # Estilos frontend (grade, cards, temas dark/light)
├── languages/
│   ├── pt-br.json                 # Tradução Português do Brasil (JED 1.x)
│   ├── en-us.json                 # Tradução Inglês Americano
│   ├── it.json                    # Tradução Italiano
│   └── es.json                    # Tradução Espanhol
├── assets/
│   └── screenshots/               # Mockups visuais e guia de captura
└── readme.md                      # Documentação completa em português
```

---

## Metadados de Autoria

* **Autor**: Luiz Fernando Brogliatto Ferreira
* **WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
* **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
* **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## Changelog

### 1.0.0
* Lançamento oficial do bloco `periodic/gallery-lightbox`.
* Arquitetura em conformidade com `block.json` versão 3 e React JSX nativo.
* Visualizador Lightbox de tela cheia estilo LC-Lightbox em Vanilla JavaScript puro (sem jQuery).
* Suporte a navegação circular anterior/próxima, teclado (`←`, `→`, `Esc`), zoom panorâmico e gestos touch (swipe no mobile).
* Três abas de configuração dedicadas no `InspectorControls`: *Galeria de Imagens*, *Layout da Grade* e *Configurações do Lightbox*.
* Barra inferior de miniaturas deslizantes com sincronização e centralização automática da foto ativa.
* Temas visuais Dark (fundo escuro profundo translúcido) e Light (fundo claro sofisticado).
* Internacionalização completa com arquivos JED 1.x para `pt_BR`, `en_US`, `it_IT` e `es_ES`.
