<!--
  Módulo: periodic-drag-drop-engine
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Drag Drop Engine

> Módulo consolidado e padronizado sob o namespace `.periodic-drag-drop-engine`.

---

# Periodic Drag & Drop Engine (WordPress Gutenberg Block)

[![WordPress Plugin](https://img.shields.io/badge/WordPress-Gutenberg%20Block-blue.svg)](https://wordpress.org)
[![Licence: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![Author: Periodic](https://img.shields.io/badge/Author-Periodic-blueviolet.svg)](https://github.com/periodic)
[![Mobile Ready](https://img.shields.io/badge/Mobile-Touch%20Ready-success.svg)](#suporte-mobile-e-toque)

Plugin de bloco para o editor Gutenberg do WordPress pertencente ao ecossistema **periodic**. Desenvolvido com foco em desempenho extremo, acessibilidade e interatividade educacional, o **periodic-drag-drop-engine** integra um motor leve de arrastar e soltar baseado na **Pointer Events API** nativa (sem dependências externas pesadas), oferecendo suporte completo a mouse no desktop e gestos de toque em smartphones e tablets.

---

## 📸 Demonstração Visual

![Periodic Drag & Drop Engine Screenshot](screenshot.png)

*Visualização da conferência interativa com badges Bootstrap estilizados, animações de acerto e feedback em tempo real.*

---

## 🎯 Modos de Operação (`dragMode`)

O bloco suporta 3 modalidades distintas de atividade interativa:

| Modo | Identificador | Descrição |
| :--- | :--- | :--- |
| **Tokens de Texto** | `text-tokens` | Arraste de chips/palavras com estilo Bootstrap (`badge bg-primary fs-6 p-2`) para preenchimento de lacunas e associação de conceitos. |
| **Reordenação de Parágrafos** | `reorder-paragraphs` | Reorganização sequencial de blocos ou parágrafos dissertativos com handles de arraste e numeração dinâmica em tempo real. |
| **Alvos sobre Imagem** | `image-targets` | Posicionamento de rótulos e etiquetas em alvos e hotspots com coordenadas percentuais sobre uma imagem ou diagrama de fundo. |

---

## ⚙️ Atributos do Bloco (`block.json`)

```json
{
  "attributes": {
    "title": { "type": "string", "default": "Exercício Interativo de Arrastar e Soltar" },
    "description": { "type": "string", "default": "Arraste os elementos correspondentes..." },
    "dragMode": { "type": "string", "default": "text-tokens" },
    "items": { "type": "array" },
    "targets": { "type": "array" },
    "backgroundImage": { "type": "string", "default": "" },
    "allowRetry": { "type": "boolean", "default": true },
    "successMessage": { "type": "string" },
    "errorMessage": { "type": "string" }
  }
}
```

- **`dragMode`**: Define o comportamento (`reorder-paragraphs`, `text-tokens` ou `image-targets`).
- **`items`**: Coleção de itens arrastáveis (`id`, `text`, `targetId` para gabarito, `correctOrder` para reordenação).
- **`targets`**: Coleção de dropzones de destino (`id`, `label`, `x`, `y` em % para imagens).
- **`backgroundImage`**: URL da imagem de fundo para o modo `image-targets`.
- **`allowRetry`**: Controla a exibição do botão de reset após a conferência.

---

## 🏗️ Estrutura de Arquivos

```
periodic-drag-drop-engine/
├── periodic-drag-drop-engine.php   # Inicialização do plugin e registro no WordPress
├── block.json                      # Metadados e schema Gutenberg
├── package.json                    # Configuração de scripts (@wordpress/scripts)
├── screenshot.png                  # Captura visual do bloco em funcionamento
├── test-preview.html               # Ambiente interativo de pré-visualização independente
├── languages/ & languagens/        # Pacotes de internacionalização (i18n)
│   ├── pt-br.json                  # Português (Brasil)
│   ├── en-us.json                  # Inglês (Estados Unidos)
│   ├── It.json                     # Italiano
│   └── es.json                     # Espanhol
├── src/
│   ├── index.js                    # Registro do bloco via registerBlockType
│   ├── edit.js                     # Editor Gutenberg (InspectorControls, gabarito e preview)
│   ├── save.js                     # Renderização estática com badges Bootstrap e dropzones
│   ├── view.js                     # Motor interativo (Pointer Events, touch, animações)
│   ├── style.scss & style.css      # Folha de estilos frontend e animações CSS
│   ├── editor.scss                 # Estilos específicos do editor
│   └── i18n.js                     # Adaptador de strings multilíngues
└── build/                          # Arquivos compilados prontos para produção
```

---

## 🛠️ Implementação Técnica dos Componentes

### 1. `edit.js`
- **Painel Lateral do Gutenberg (InspectorControls)**:
  - Alternância imediata entre os 3 modos de funcionamento (`dragMode`).
  - Gestão dinâmica de itens arrastáveis (adicionar, renomear, excluir).
  - Configuração do **Gabarito**: definição da relação item ➔ dropzone ou ordem numérica esperada.
  - Seleção e upload de imagem de fundo via `MediaUpload` com controle de hotspots no modo imagem.
- **Canvas do Bloco**:
  - Pré-visualização ao vivo do layout renderizado com suporte a abas de conferência do gabarito.

### 2. `save.js`
- Elementos arrastáveis estilizados com as classes padrão Bootstrap solicitadas:
  `badge bg-primary fs-6 p-2 periodic-draggable-item`
- Dropzones (`periodic-dropzone-target`) com estados vazios e preenchidos.
- Container com mapa de alvos posicionados percentualmente (`left: X%`, `top: Y%`).
- Atributos semânticos e dados codificados em `data-config` para hidratação no frontend.

### 3. `view.js`
- **Motor Pointer Events Nativo**:
  - Compatível com Mouse, Caneta stylus e Touchscreen móvel (iOS Safari e Android Chrome).
  - Sem bibliotecas externas pesadas ou dependências de terceiros.
  - Acessibilidade integrada: suporte a **Tap-to-Place** (clique no badge e clique na dropzone para posicionamento instantâneo em telas sensíveis).
- **Conferência de Respostas**:
  - Botão de conferência com cálculo exato de acertos e erros.
  - Animação de acerto: pulso verde, brilho e ícone de verificação (`✓`).
  - Animação de erro: efeito vibratório sutil (`shake-error`) e destaque em vermelho (`✗`).
  - Botão "Tentar Novamente" com restauração suave ao estado inicial.

---

## 🌐 Internacionalização (i18n)

Todas as strings e mensagens de interface foram organizadas nas pastas `languages/` e `languagens/` nos arquivos:
- `pt-br.json` (Português - Brasil)
- `en-us.json` (English - US)
- `It.json` (Italiano)
- `es.json` (Español)

---

## 🚀 Como Testar e Executar

### 1. Pré-visualização Imediata (Sem WordPress)
Abra diretamente o arquivo `test-preview.html` no seu navegador favorito:
- Alterne entre os 3 modos na barra superior.
- Teste a troca de idiomas em tempo real.
- Arraste ou toque nos badges, posicione-os nas dropzones e clique em **"Verificar Respostas"**.

### 2. Instalação no WordPress
1. Copie a pasta `periodic-drag-drop-engine` para o diretório `wp-content/plugins/` da sua instalação WordPress.
2. Acesse o Painel Administrativo do WordPress ➔ **Plugins** e ative o plugin **Periodic Drag & Drop Engine**.
3. Crie ou edite uma página/post e insira o bloco **Periodic Drag & Drop Engine**.
4. Configure os itens e publique!

### 3. Compilação de Desenvolvimento (Opcional)
```bash
npm install
npm run build
```

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte `LICENSE` ou a licença padrão WordPress para mais detalhes.
Desenvolvido por **Periodic**.
