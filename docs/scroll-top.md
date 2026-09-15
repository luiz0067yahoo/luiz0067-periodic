<!--
  Module: periodic-scroll-top
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Scroll Top

> Consolidated module standardized under namespace `.periodic-scroll-top`.

---

# Periodic Scroll Top

[![WordPress](https://img.shields.io/badge/WordPress-%3E%3D6.0-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-%3E%3D7.4-8892BF.svg)](https://php.net/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3.svg)](https://getbootstrap.com/)
[![Font Awesome 6](https://img.shields.io/badge/Font%20Awesome-6.5.2-blue.svg)](https://fontawesome.com/)

Plugin de bloco nativo para o editor de blocos WordPress (Gutenberg) que insere um botão flutuante para voltar ao topo da página com rolagem suave (`window.scrollTo({ top: 0, behavior: 'smooth' })`). Desenvolvido com padrão sênior de engenharia, arquitetura `block.json` v3, React JSX, Bootstrap 5, Font Awesome 6 e script frontend ultra leve em Vanilla JS otimizado com `requestAnimationFrame`.

---

## Metadados de Autoria

- **Autor:** Luiz Fernando Brogliatto Ferreira
- **Perfil WordPress.org:** [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub:** [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn:** [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## Funcionalidades Principais

- **Rolagem Suave Nativa:** Retorno instantâneo e suave ao topo utilizando a API moderna do navegador sem bibliotecas pesadas.
- **Detecção Otimizada de Scroll:** Monitoramento contínuo da posição da janela via `requestAnimationFrame`, prevenindo quedas de taxa de quadros (jank).
- **InspectorControls em Abas:** Painel lateral intuitivo organizado em 3 abas temáticas dedicadas.
- **WYSIWYG Nativo no Editor:** Cartão descritivo no canvas do Gutenberg e simulação flutuante em tempo real no canto da tela do editor.
- **Totalmente Responsivo e Acessível:** Rótulo `aria-label` personalizável para leitores de tela e foco visível para navegação via teclado.
- **Internacionalização Pronta (i18n):** Suporte nativo completo em Português do Brasil (`pt-br`), Inglês (`en-us`), Italiano (`it`) e Espanhol (`es`).

---

## Documentação Detalhada do Painel Lateral (InspectorControls)

Ao selecionar o bloco **Voltar ao Topo** no editor Gutenberg, a barra lateral direita disponibiliza três abas de configuração:

### 1. Aba: Posicionamento
Permite escolher exatamente onde e com qual afastamento o botão flutuará sobre o conteúdo do site:
- **Posição na Tela:** Escolha entre **Canto Inferior Direito** (`bottom-right`) ou **Canto Inferior Esquerdo** (`bottom-left`).
- **Distância Horizontal (px):** Define a margem em pixels em relação à lateral da tela (de 8px a 120px; padrão: `24px`).
- **Distância Inferior (px):** Define o afastamento em relação ao rodapé da janela visível (de 8px a 120px; padrão: `24px`).
- **Ordem de Camada (z-index):** Garante a sobreposição adequada do botão acima de cabeçalhos fixos, banners promocionais ou menus flutuantes (de 100 a 99999; padrão: `9999`).

### 2. Aba: Aparência
Controle visual estético do botão de retorno ao topo:
- **Formato do Botão:**
  - *Círculo (Circular):* Borda perfeitamente arredondada (`50%`).
  - *Quadrado Arredondado:* Cantos suaves e modernos (`0.65rem`).
  - *Quadrado Reto:* Estilo moderno e angulado (`0`).
- **Tamanho do Botão (px):** Dimensionamento do diâmetro/largura do botão (de 36px a 80px; padrão: `48px`). A tipografia e proporção do ícone adaptam-se automaticamente.
- **Cor de Fundo:** Paleta com as principais cores do Bootstrap 5 (Azul primário, Cinza escuro, Verde sucesso, Vermelho perigo, Índigo, etc.) e suporte a cores personalizadas.
- **Cor do Ícone:** Seletor independente para contraste e legibilidade ideal do ícone central.
- **Seleção Rápida de Ícone:** Grade com botões rápidos dos símbolos mais usados de Font Awesome 6 (`fas fa-chevron-up`, `fas fa-arrow-up`, `fas fa-arrow-up-long`, `fas fa-angle-up`, `fas fa-angles-up`, `fas fa-caret-up`, `fas fa-rocket`, `fas fa-paper-plane`).
- **Classe CSS do Ícone Font Awesome:** Campo de texto livre para especificar qualquer classe de ícone Font Awesome 6 desejada.

### 3. Aba: Gatilho de Rolagem
Configurações de comportamento assíncrono e conformidade com acessibilidade:
- **Distância de Rolagem para Exibir (px):** Limiar vertical em pixels que o visitante deve rolar para que o botão surja suavemente com animação fade-in (de 50px a 1500px; padrão: `300px`).
- **Texto Acessível (aria-label):** Texto alternativo anunciado por leitores de tela (ex.: NVDA, VoiceOver, JAWS) garantindo acessibilidade universal (padrão: *"Voltar ao topo"*).
- **Exibir Preview Flutuante no Editor:** Interruptor liga/desliga para habilitar a simulação ao vivo do botão flutuando exatamente onde ele aparecerá para o usuário final durante a edição no WordPress.

---

## Galeria de Telas e Screenshots

As capturas de tela ilustrativas e mockups vetoriais encontram-se na pasta [`assets/screenshots/`](./assets/screenshots/):

| Arquivo | Descrição da Tela |
| :--- | :--- |
| [`screenshot-1-overview.svg`](./assets/screenshots/screenshot-1-overview.svg) | Visão geral do editor Gutenberg: cartão de status, resumo e botão flutuante. |
| [`screenshot-2-tab-positioning.svg`](./assets/screenshots/screenshot-2-tab-positioning.svg) | Painel lateral - Aba 1: Posicionamento (canto, distâncias e z-index). |
| [`screenshot-3-tab-appearance.svg`](./assets/screenshots/screenshot-3-tab-appearance.svg) | Painel lateral - Aba 2: Aparência (formatos, dimensões, cores e ícones). |
| [`screenshot-4-tab-trigger.svg`](./assets/screenshots/screenshot-4-tab-trigger.svg) | Painel lateral - Aba 3: Gatilho de Rolagem e Acessibilidade (`scrollOffset`). |

Consulte o arquivo [`assets/screenshots/README.md`](./assets/screenshots/README.md) para instruções detalhadas de como capturar novas telas do navegador.

---

## Estrutura de Diretórios e Arquivos

```
periodic-scroll-top/
├── periodic-scroll-top.php    # Arquivo principal do plugin WordPress
├── block.json                  # Schema v3 do bloco Gutenberg e metadados
├── package.json                # Dependências npm e scripts de build
├── readme.md                   # Documentação completa e guia de uso
├── src/
│   ├── index.js                # Registro do bloco via registerBlockType
│   ├── edit.js                 # Componente React do editor e InspectorControls
│   ├── save.js                 # Estrutura HTML estática com data-attributes
│   ├── view.js                 # Vanilla JS para o evento de rolagem e clique suave
│   ├── editor.scss             # Estilos específicos do editor Gutenberg
│   └── style.scss              # Estilos frontend e editor (animações, hover, foco)
├── languages/
│   ├── pt-br.json              # Tradução Português do Brasil
│   ├── en-us.json              # Tradução Inglês Americano
│   ├── it.json                 # Tradução Italiano
│   └── es.json                 # Tradução Espanhol
└── assets/
    └── screenshots/            # Mockups e instruções de capturas de tela
        ├── README.md
        ├── screenshot-1-overview.svg
        ├── screenshot-2-tab-positioning.svg
        ├── screenshot-3-tab-appearance.svg
        └── screenshot-4-tab-trigger.svg
```

---

## Instalação e Uso

1. Faça o download ou clone este repositório no diretório de plugins do seu WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-scroll-top.git
   ```
2. Acesse o painel administrativo do WordPress em **Plugins > Plugins Instalados**.
3. Localize **Periodic Scroll Top** e clique em **Ativar**.
4. Em qualquer página ou post, abra o editor Gutenberg e adicione o bloco **Voltar ao Topo** (ou procure por `scroll-top`).
5. Configure a posição, cores e distância de rolagem desejadas no painel lateral direito e publique a página.

---

## Desenvolvimento e Compilação

Para compilar os arquivos SCSS e JSX usando o `@wordpress/scripts`:

```bash
# Instalar dependências
npm install

# Compilar para desenvolvimento com hot reload
npm start

# Gerar bundle final minificado para produção
npm run build
```

---

## Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte [GNU General Public License](https://www.gnu.org/licenses/gpl-2.0.html) para maiores detalhes.
