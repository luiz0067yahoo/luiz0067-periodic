<!--
  Module: periodic-interactive-utilities
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Interactive Utilities

> Consolidated module standardized under namespace `.periodic-interactive-utilities`.

---

# Periodic Interactive Utilities - Gutenberg Block Suite

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?style=flat&logo=wordpress)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4.svg?style=flat&logo=php)](https://php.net)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/License-GPL--2.0--or--later-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![i18n Supported](https://img.shields.io/badge/i18n-PT--BR%20%7C%20EN--US%20%7C%20IT%20%7C%20ES-purple.svg)](./languages)
[![Gutenberg API](https://img.shields.io/badge/Gutenberg%20API-v3-orange.svg)](https://developer.wordpress.org/block-editor/)

Suíte de utilitários interativos de alto engajamento e gamificação para o editor de blocos WordPress Gutenberg. O plugin combina três ferramentas essenciais para retenção de público, promoções comemorativas e campanhas modernas: **Gerador Dinâmico de QR Code**, **Calendário do Advento com 24 Portas e Modais Bootstrap 5**, e **Pistas Interativas com Marcador de Realidade Aumentada (AR)**.

---

## 📸 Demonstração Visual (Screenshot)

![Periodic Interactive Utilities Showcase](assets/screenshot.png)

---

## 🌟 Funcionalidades Principais

### 1. 📅 Calendário do Advento Interativo (24 Dias)
- **Persistência de Progresso**: Rastreamento automático das portas abertas via `localStorage`, permitindo que o visitante retorne diariamente sem perder o progresso.
- **Trava Temporal Sincronizada**: Bloqueio inteligente por data (`YYYY-MM-DD`). Portas com data futura disparam alerta sonoro/visual, efeito de tremor (*shake animation*) e exibem a contagem regressiva de dias restantes.
- **Animações 3D & Efeitos Festivos**: Efeito de rotação tridimensional (*3D card flip*) nas portas, revelando a prévia da surpresa e disparando partículas de confete celebrativo (*CSS confetti particles*).
- **Modais Nativas Bootstrap 5 com Fallback Vanilla**: Conteúdo exclusivo para cada dia (textos, códigos promocionais, links, vídeos) aberto em janelas modais elegantes com suporte a temas com ou sem Bootstrap ativo.
- **Barra de Simulação de Data**: Ferramenta embutida para testes em tempo real que permite aos administradores e revisores avançar o tempo e testar o desbloqueio de qualquer dia instantaneamente.

### 2. 📱 Gerador de QR Code Dinâmico
- **Geração Vetorial Autocontida**: Motor `QRCode.js` integrado de alta fidelidade sem dependências externas de APIs de terceiros.
- **Personalização de Cores**: Configuração visual de cores de frente (módulos) e fundo, permitindo harmonização perfeita com a paleta da sua marca.
- **Exportação Multiformato**: Botões diretos para download instantâneo em **PNG** de alta resolução e **SVG** vetorial puro.
- **Copiar com 1 Clique**: Ação de cópia rápida para área de transferência com fallback automático para qualquer navegador.

### 3. 👓 Pistas com Gatilhos de Realidade Aumentada (AR)
- **Marcador Padrão HIRO / Kanji**: Exibição do marcador com proporções e contraste otimizados para rastreamento por câmeras WebAR.
- **Sistema de Pistas & Enigmas**: Desafio interativo com dica retrátil (*toggle hint*) para dinâmicas de caça ao tesouro digital ou promoções especiais.
- **Ações Integradas**: Botão de impressão do marcador em alta definição e atalho para ativação de câmera/scanner.

---

## 📂 Estrutura de Arquivos e Pastas

```
periodic-interactive-utilities/
├── assets/
│   └── screenshot.png                 # Captura de tela em alta resolução
├── build/                             # Arquivos compilados para produção
│   ├── editor.css                     # Estilos do painel Gutenberg
│   ├── index.asset.php                # Dependências e versão do script
│   ├── index.js                       # Bloco compilado / standalone Gutenberg
│   ├── style.css                      # Estilos globais e componentes do frontend
│   └── view.js                        # Lógica interativa de frontend
├── languages/                         # Dicionários de idiomas (padrão WordPress)
│   ├── en-us.json
│   ├── es.json
│   ├── it.json
│   └── pt-br.json
├── src/                               # Código-fonte original
│   ├── edit.js                        # Painel WYSIWYG e InspectorControls
│   ├── editor.css                     # CSS do editor
│   ├── index.js                       # Registro do bloco
│   ├── lib/
│   │   └── qrcode.min.js              # Motor QRCode com renderizador SVG
│   ├── save.js                        # Renderização estática em JSX
│   ├── style.css                      # CSS do frontend
│   └── view.js                        # Lógica interativa do frontend
├── test/
│   └── validate.js                    # Suíte de testes automatizados
├── block.json                         # Metadados Gutenberg API v3
├── periodic-interactive-utilities.php  # Ponto de entrada do plugin WordPress
├── package.json                       # Configurações do projeto e scripts npm
├── preview.html                       # Vitrine interativa independente (Showcase)
└── README.md                          # Documentação completa
```

---

## 🌍 Internacionalização (i18n)

O plugin oferece suporte nativo e completo a 4 idiomas na pasta oficial `languages/`:

| Idioma | Código / Arquivo | Status |
| :--- | :--- | :---: |
| **Português do Brasil** | `pt-br.json` (`pt-BR`) | Completo |
| **Inglês (US)** | `en-us.json` (`en-US`) | Completo |
| **Italiano** | `it.json` (`it-IT`) | Completo |
| **Espanhol** | `es.json` (`es-ES`) | Completo |

Todas as 48 chaves de tradução cobrem o título do bloco, descrições, rótulos de campos, botões de ação, mensagens de status das portas e notificações.

---

## 💻 Instalação no WordPress

1. Faça o download ou clone este repositório na pasta de plugins do seu WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodic/periodic-interactive-utilities.git
   ```
2. Acesse o painel administrativo do WordPress em **Plugins > Plugins Instalados**.
3. Localize **Periodic Interactive Utilities** e clique em **Ativar**.
4. Abra o editor Gutenberg em qualquer Página ou Post e busque por `Utilitários Interativos` ou insira `/interactive-utilities`.

---

## 🧪 Testes Automatizados

O projeto inclui validação contínua da integridade de todos os arquivos JSON de tradução, do `block.json` e do gerador de QR Code:

```bash
npm test
```

Saída esperada:
```
--- Starting Periodic Interactive Utilities Validation ---
✅ Valid JSON: languages/pt-br.json (locale: pt-BR)
✅ Valid JSON: languages/en-us.json (locale: en-US)
✅ Valid JSON: languages/it.json (locale: it-IT)
✅ Valid JSON: languages/es.json (locale: es-ES)
✅ Valid block.json (name: periodic/interactive-utilities, version: 1.0.0)
✅ QRCode generator functional (SVG length: 39664)
--- All validations passed successfully! ---
```

---

## 🖥️ Vitrine Independente (`preview.html`)

Para testar a suíte imediatamente em qualquer navegador sem necessidade de um servidor WordPress ativo, abra diretamente o arquivo `preview.html`:
- Permite alternar entre os 3 utilitários.
- Seletor de idiomas dinâmico com tradução instantânea em tempo real (PT-BR, EN-US, IT, ES).
- Simulador interativo do Calendário do Advento com abertura de portas e modais.
- Gerador de QR Code em tempo real com controle de cores e download.

---

## 📄 Licença e Créditos

Desenvolvido por **periodic**.
Distribuído sob a licença [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html).
