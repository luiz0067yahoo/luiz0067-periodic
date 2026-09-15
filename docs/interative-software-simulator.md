<!--
  Module: periodic-interative-software-simulator
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Interative Software Simulator

> Consolidated module standardized under namespace `.periodic-interative-software-simulator`.

---

# Simulador de Software Interativo (WordPress Gutenberg Block)

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-API%20v3-green.svg)](https://developer.wordpress.org/block-editor/)
[![Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla%20JS-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Layout-100%25%20Responsive%20(%25)-orange.svg)]()
[![License](https://img.shields.io/badge/License-GPLv2-lightgrey.svg)](LICENSE)

O **Simulador de Software Interativo** (`custom/simulador-software`) é um bloco Gutenberg nativo de alta performance para WordPress projetado para criar **tutoriais práticos guiados passo a passo simulando softwares reais** (como Windows 11, Microsoft Word, Excel, painéis SaaS, sistemas operacionais e ferramentas web).

O bloco permite enviar capturas de tela (prints) em alta resolução e desenhar camadas interativas responsivas (áreas de clique com pulso visual e caixas de digitação com validação instantânea).

---

## 📸 Galeria de Telas e Demonstração

### Painel de Edição (Gutenberg Canvas & Inspector)
Gerenciador lateral completo de passos, upload de imagens via Media Library, configurações de instrução e posicionamento em porcentagem (`%`):
![Painel do Editor Gutenberg](screenshots/01-editor-inspector-canvas.png)

---

### Passo 1: Área de Trabalho do Windows 11
O aluno visualiza a área de trabalho realista e deve clicar no ícone centralizado do Menu Iniciar:
![Passo 1: Área de Trabalho do Windows 11](screenshots/02-frontend-step1-desktop.png)

---

### Passo 2: Menu Iniciar com Barra de Pesquisa
Menu Iniciar aberto no estilo Fluent Design. O usuário digita `"Word"` e pressiona `Enter`:
![Passo 2: Menu Iniciar e Pesquisa](screenshots/03-frontend-step2-start-search.png)

---

### Passo 3: Microsoft Word Aberto
Interface do Microsoft Word com documento em branco. O usuário clica na aba **Layout** na faixa de opções:
![Passo 3: Microsoft Word - Aba Layout](screenshots/04-frontend-step3-word-layout.png)

---

### Passo 4: Menu de Margens na Faixa de Opções
Menu suspenso de margens aberto. O usuário clica na opção **Margens Personalizadas...**:
![Passo 4: Menu Margens](screenshots/05-frontend-step4-word-margins.png)

---

### Passo 5: Configuração das Margens no Padrão ABNT
Modal **Configurar Página** com 4 campos de digitação (Superior: 3, Esquerda: 3, Inferior: 2, Direita: 2) e clique de confirmação no botão **OK**:
![Passo 5: Modal de Margens ABNT](screenshots/06-frontend-step5-abnt-inputs.png)

---

### Conclusão com Sucesso & Responsividade Mobile
Tela comemorativa de conclusão do tutorial com opção de reiniciar e adaptação fluida para dispositivos móveis:

| Conclusão com Sucesso | Visualização em Dispositivo Móvel |
| :---: | :---: |
| ![Conclusão do Tutorial](screenshots/07-frontend-completion.png) | ![Visualização Mobile](screenshots/08-responsive-mobile.png) |

---

## ✨ Principais Funcionalidades

- **Coordenadas 100% Responsivas por Porcentagem (`%`)**: Todos os hotspots e campos de input utilizam `top`, `left`, `width` e `height` em `%`. A simulação funciona com precisão cirúrgica em celulares, tablets, notebooks e telas 4K.
- **Frontend Ultraleve em Vanilla JavaScript**: Zero dependências pesadas no lado do cliente. Carregamento instantâneo, seguro e em conformidade com as diretrizes do WordPress Core.
- **Isolamento de Estado (Multi-Instance)**: Cada bloco inserido na página opera em seu próprio escopo, permitindo múltiplos simuladores na mesma postagem sem colisão de variáveis.
- **Validação Inteligente de Digitação**: Compara o texto inserido com o `expectedValue` esperado (case-insensitive, tolerante a formatações como `"3"` ou `"3 cm"`).
- **Feedback Tátil & Visual**:
  - Pulso suave de destaque nas áreas clicáveis.
  - Efeito sonoro/ondulação de clique bem-sucedido.
  - Animação de vibração (*shake*) e aviso flutuante (*toast*) ao errar ou clicar fora da área indicada.
- **Suporte Multi-Input com Botão de Confirmação**: Suporta etapas com múltiplos campos preenchíveis simultaneamente (como a janela modal de margens ABNT).
- **Modo Tela Cheia**: Suporte nativo à Fullscreen API com adaptação automática de proporção.
- **Internacionalização Completa (`languages/`)**:
  - 🇧🇷 Português do Brasil (`pt-br.json`)
  - 🇺🇸 Inglês (`en-us.json`)
  - 🇮🇹 Italiano (`it.json`)
  - 🇪🇸 Espanhol (`es.json`)
- **Cenário de Exemplo Embutido**: Já vem pré-carregado com o fluxo completo de **Formatação de Margens ABNT no Windows 11** com ilustrações vetoriais SVG de altíssima fidelidade.

---

## 📁 Estrutura de Arquivos do Plugin

```plaintext
interative-software-simulator/
├── interative-software-simulator.php       # Arquivo de inicialização do plugin WordPress
├── block.json                              # Metadados do bloco (Gutenberg API v3)
├── package.json                            # Scripts de build do @wordpress/scripts
├── webpack.config.js                       # Configuração de compilação
├── languages/                              # Arquivos de tradução i18n
│   ├── pt-br.json                          # Português (Brasil)
│   ├── en-us.json                          # Inglês
│   ├── it.json                             # Italiano
│   └── es.json                             # Espanhol
├── assets/                                 # SVGs de alta definição para o fluxo ABNT
│   ├── step1-windows11-desktop.svg
│   ├── step2-windows11-startmenu.svg
│   ├── step3-word-document.svg
│   ├── step4-word-layout-ribbon.svg
│   └── step5-word-margins-modal.svg
├── inc/
│   ├── frontend-handler.php                # Helpers de URL e tradução
│   └── render.php                          # Renderizador dinâmico do bloco no frontend
├── src/
│   ├── index.js                            # Ponto de entrada do bloco
│   ├── edit.js                             # Componente React Edit (Inspector & Canvas)
│   ├── save.js                             # Serialização HTML e dados JSON
│   ├── view.js                             # Script frontend Vanilla JS (classe SoftwareSimulator)
│   ├── editor.scss                         # Estilos do editor Gutenberg
│   ├── style.scss                          # Estilos do frontend e animações
│   └── default-data.js                     # Configurações do cenário padrão ABNT
├── screenshots/                            # Capturas de tela para documentação
└── README.md                               # Este manual completo
```

---

## 🚀 Instalação e Ativação

### Método 1: Instalação Manual no WordPress
1. Baixe ou clone esta pasta para dentro do diretório de plugins da sua instalação WordPress:
   ```bash
   wp-content/plugins/interative-software-simulator
   ```
2. Instale as dependências e compile os assets:
   ```bash
   cd wp-content/plugins/interative-software-simulator
   npm install
   npm run build
   ```
3. Acesse o painel do WordPress em **Plugins > Plugins Instalados** e clique em **Ativar** no **Simulador de Software Interativo**.

### Método 2: Teste Standalone no Navegador
Para testar a simulação sem precisar de uma instalação ativa do WordPress:
1. Abra diretamente o arquivo `test-preview.html` em qualquer navegador web moderno.
2. O simulador inicializará instantaneamente com todos os 5 passos do fluxo ABNT no Windows 11.

---

## 🛠️ Comandos de Desenvolvimento

| Comando | Descrição |
| :--- | :--- |
| `npm run build` | Compila o bundle de produção otimizado em `build/` |
| `npm run start` | Inicia o compilador em modo de desenvolvimento com hot-reload |
| `npm run lint:js` | Valida as regras de código JavaScript |
| `npm run lint:css` | Valida e padroniza os estilos SCSS/CSS |

---

## ⚙️ Especificação dos Atributos (`attributes`)

| Atributo | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `simulatorTitle` | `string` | `"Simulador de Software Interativo"` | Título exibido na barra superior da janela |
| `steps` | `array` | `[...]` | Lista dinâmica de passos contendo imagens, instruções e elementos |
| `showProgressBar` | `boolean` | `true` | Exibe a barra de progresso gradiente no topo |
| `showRestartButton` | `boolean` | `true` | Permite reiniciar a simulação a qualquer momento |
| `showStepIndicator` | `boolean` | `true` | Exibe o contador (ex: "Passo 1 / 5") |
| `highlightHints` | `boolean` | `true` | Ativa o pulso luminoso nos hotspots interativos |
| `customSuccessMessage` | `string` | `Mensagem padrão` | Texto exibido na tela final de parabéns |

### Estrutura de um Passo (`step`)
```json
{
  "id": "step-1",
  "title": "Título descritivo do passo",
  "imageUrl": "https://meusite.com/imagem.png",
  "instruction": "Instrução exibida na barra inferior.",
  "elements": [
    {
      "id": "el-1",
      "type": "click",
      "top": 95.0,
      "left": 44.5,
      "width": 3.0,
      "height": 4.8,
      "label": "Botão Iniciar",
      "targetStepIndex": 1
    }
  ]
}
```

---

## 📜 Licença

Distribuído sob a licença **GPLv2 ou posterior**. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.
