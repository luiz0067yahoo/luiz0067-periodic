<!--
  Module: periodic-separator
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Separator

> Consolidated module standardized under namespace `.periodic-separator`.

---

# periodic Separator ➖

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-777bb4.svg?logo=php)](https://php.net)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Blocks-black.svg?logo=wordpress)](https://wordpress.org/gutenberg/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin WordPress completo e autossuficiente que adiciona um Custom Block Gutenberg moderno e personalizável para **Separadores e Divisores de Conteúdo** (`periodic/separator`), com suporte nativo e retrocompatibilidade para o bloco legado `cms-adm/separator` e a classe `.separator-green`.

---

## 📌 Sobre o Plugin

Desenvolvido para atender tanto projetos corporativos e governamentais quanto portais e blogs que necessitam de divisões de seções elegantes, o **periodic Separator** une a simplicidade visual à flexibilidade avançada de configuração dentro do editor Gutenberg.

O plugin preserva o clássico traço institucional verde da prefeitura (`#01913a`), enquanto oferece múltiplos presets modernos (linhas sólidas, tracejadas, pontilhadas, duplas, gradientes e marcadores decorativos).

---

## 📷 Screenshots

| Editor Gutenberg (Edição Visual) | Frontend Responsivo (Visualização Pública) |
| :---: | :---: |
| ![Gutenberg Editor](assets/screenshot-1.png) | ![Frontend Preview](assets/screenshot-2.png) |

---

## 🚀 Principais Recursos

- **Fidelidade Visual 100% WYSIWYG**: O que você configura no painel de blocos do Gutenberg é exatamente o que é renderizado no frontend público.
- **Estilo Clássico Institucional (`.separator-green`)**:
  - Totalmente compatível com temas legados que utilizam a classe `.separator-green` e o verde institucional `#01913a`.
- **Múltiplos Estilos de Linha**:
  - 🟢 **Verde Institucional**: O traço clássico verde com espessura padrão.
  - ➖ **Linha Sólida**: Traço contínuo clássico personalizável.
  - 〰️ **Linha Tracejada (Dashed)**: Divisor pontuado e moderno.
  - ⬝⬝ **Linha Pontilhada (Dotted)**: Divisor sutil e elegante.
  - ‗ **Linha Dupla (Double)**: Divisão clássica formal.
  - 🌈 **Gradiente Suave**: Degradê moderno com desvanecimento lateral ou cores personalizadas.
  - 🌑 **Linha com Sombra**: Efeito suave de profundidade e relevo.
  - • • • **Três Pontos Decorativos (Dots)**: Marcadores editoriais inspirados em publicações literárias.
- **Controles Completos na Barra Lateral (InspectorControls)**:
  - **Paleta de Cores**: Seleção rápida com destaque para o verde institucional `#01913a`, grafite `#333333`, azul, coral, ouro, roxo e custom hex.
  - **Dimensões**: Controle contínuo de largura (10% a 100%), espessura (1px a 20px) e raio dos cantos arredondados (0px a 20px).
  - **Espaçamento Controlado**: Margem superior e inferior ajustáveis independentemente (0px a 100px).
  - **Opacidade**: Ajuste fino de transparência (10% a 100%).
- **Símbolos Centrais Opcionais**:
  - Inserção de marcador decorativo no centro da linha: Losango (◆), Estrela (★), Círculo (●), Flor (✤), Quadrado (■), Coração (♥) ou Folha (❧).
- **Alinhamento Flexível**:
  - Alinhamento à Esquerda, Centralizado ou à Direita via barra de ferramentas flutuante (`BlockControls`) e barra lateral.
- **Compatibilidade Retroativa Integral**:
  - Registra o namespace oficial `periodic/separator` e mantém compatibilidade automática com `cms-adm/separator`. Posts criados anteriormente não quebram.
- **Leve e Autossuficiente**:
  - Desenvolvido em Vanilla CSS e JavaScript puro integrado às APIs nativas do Gutenberg (`wp.blocks`, `wp.element`, `wp.blockEditor`, `wp.components`). Sem frameworks pesados ou requisições desnecessárias.
- **Suporte Multilíngue e Internacionalização (i18n)**:
  - Preparado para tradução com Text Domain `periodic-separator`.
  - Suporte nativo completo a **Inglês (`en_US`)**, **Espanhol (`es_ES`)**, **Italiano (`it_IT`)** e **Português do Brasil (`pt_BR`)**, com integração às APIs de internacionalização do Gutenberg (`wp.i18n` e `wp_set_script_translations`).
- **Compatível com Todos os Temas**:
  - Suporte a temas clássicos e Block Themes (Full Site Editing - FSE).

---

## 📂 Estrutura do Projeto

```text
periodic-separator/
├── periodic-separator.php   # Arquivo principal (headers WP, registro de blocos, enqueues e textdomain)
├── languages/               # Internacionalização (i18n): en_US, es_ES, it_IT, pt_BR
│   ├── periodic-separator.pot
│   ├── periodic-separator-en_US.po / .mo / *.json
│   ├── periodic-separator-es_ES.po / .mo / *.json
│   ├── periodic-separator-it_IT.po / .mo / *.json
│   └── periodic-separator-pt_BR.po / .mo
├── assets/
│   ├── js/
│   │   └── block.js         # Lógica Gutenberg do bloco (edit, save, atributos, controles)
│   └── css/
│       ├── editor.css       # Estilos específicos do editor Gutenberg
│       └── style.css        # Estilos aplicados no frontend público e compatibilidade
└── README.md                # Documentação técnica e guia de uso
```

---

## 🛠️ Instalação

### Opção 1: Via Painel do WordPress
1. Baixe o repositório como um arquivo `.zip` ou clone-o.
2. Acesse o painel administrativo do WordPress: `Plugins > Adicionar Novo > Enviar Plugin`.
3. Selecione o arquivo `.zip` e clique em **Instalar Agora**.
4. Clique em **Ativar Plugin**.

### Opção 2: Manualmente via FTP ou SSH
1. Envie a pasta `periodic-separator` para o diretório de plugins do seu WordPress:
   ```bash
   wp-content/plugins/periodic-separator/
   ```
2. Acesse o painel do WordPress em `Plugins > Plugins Instalados` e clique em **Ativar** sob **periodic Separator**.

---

## 📖 Como Usar no Editor Gutenberg

1. Crie ou edite uma Página ou Post.
2. Clique no botão **`+` (Adicionar Bloco)**.
3. Pesquise por **Separador** ou **periodic**.
4. Selecione o bloco **Separador** (sob a categoria *Design* ou *Comum*).
5. No painel lateral direito (**Bloco**):
   - Escolha o **Modelo do Separador** (Verde Institucional, Sólido, Tracejado, Gradiente, etc.).
   - Personalize a **Cor Principal** e a **Opacidade**.
   - Ajuste a **Largura (%)**, **Espessura (px)** e **Arredondamento**.
   - Configure os espaçamentos superior e inferior para um respiro harmonioso entre os blocos.
   - Opcionalmente, ative a opção **Exibir símbolo no centro** e escolha o ícone de sua preferência.
6. Salve ou publique o conteúdo.

---

## ⚙️ Compatibilidade Técnica

| Recurso | Suporte |
| :--- | :--- |
| **Versão Mínima do WordPress** | 6.0+ |
| **Versão Testada do WordPress** | até 7.1 |
| **Versão do PHP** | 7.4 ou superior (incluindo PHP 8.0, 8.1, 8.2 e 8.3) |
| **Block Themes (FSE)** | Sim (suporte a `add_editor_style` e `editor-styles`) |
| **Classic Themes** | Sim |
| **Namespace Oficial** | `periodic/separator` |
| **Namespace Legado** | `cms-adm/separator` |
| **Classe Legada Suportada** | `.separator-green` |
| **Internacionalização (i18n)** | Sim (`periodic-separator`), com suporte nativo a Inglês (`en_US`), Espanhol (`es_ES`), Italiano (`it_IT`) e Português (`pt_BR`) |

---

## 📄 Licença

Este projeto é software livre e está licenciado sob os termos da licença [GNU General Public License v2.0 or later (GPL-2.0-or-later)](https://www.gnu.org/licenses/gpl-2.0.html).

---

## 👨‍💻 Autor

**Luiz Fernando Brogliatto Ferreira**
- WordPress.org: [@periodic](https://profiles.wordpress.org/periodic/)
- GitHub: [@periodicyahoo](https://github.com/periodicyahoo)
- LinkedIn: [Luiz Fernando Brogliatto Ferreira](https://www.linkedin.com/in/luiz-ferreira-260277379/)
