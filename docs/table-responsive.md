<!--
  Módulo: periodic-table-responsive
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Table Responsive

> Módulo consolidado e padronizado sob o namespace `.periodic-table-responsive`.

---

# Periodic Table Responsive (Bootstrap 5)

> Bloco Gutenberg profissional para criação de tabelas responsivas e elegantes com estilização nativa do Bootstrap 5, edição inline no estilo planilha WYSIWYG e suporte integrado ao Font Awesome 6.

[![WordPress Block](https://img.shields.io/badge/Gutenberg-Block%20v3-0d6efd.svg)](https://developer.wordpress.org/block-editor/)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3.3-7952b3.svg)](https://getbootstrap.com/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

---

## 📋 Visão Geral

O **Periodic Table Responsive** foi desenvolvido para oferecer a melhor experiência na criação e edição de tabelas dentro do ecossistema WordPress. Seguindo fielmente a arquitetura padrão dos blocos do autor (como o `periodic-accordion`), ele combina a flexibilidade do React JSX com o padrão **block.json v3** e o design responsivo comprovado do **Bootstrap 5**.

O autor do conteúdo desfruta de uma verdadeira planilha inline: basta clicar diretamente sobre qualquer célula para digitar, alterar valores ou formatar texto, com atalhos rápidos e controle milimétrico da estrutura.

![Visão Geral do Bloco no Editor](assets/screenshots/screenshot-1-overview.svg)

---

## ✨ Características Principais

- **Edição Inline WYSIWYG (Estilo Planilha):** Digite e formate textos diretamente nas células do cabeçalho e corpo da tabela sem janelas modais intermediárias.
- **Responsividade Garantida:** Envolvimento automático no container `.table-responsive` do Bootstrap 5, permitindo rolagem horizontal suave em smartphones sem quebrar a largura da página.
- **Painel Lateral em Abas Dedicadas:** `InspectorControls` organizado em abas limpas para produtividade máxima.
- **Bootstrap 5 Puro:** Suporte total às classes utilitárias `.table`, `.table-striped`, `.table-hover`, `.table-bordered` e temas de cabeçalho.
- **Ícones Font Awesome 6:** Interface enriquecida com ícones vetoriais modernos.
- **Internacionalização Pronta (i18n):** Suporte multilíngue com arquivos Jed em Português (pt-BR), Inglês (en-US), Italiano (it-IT) e Espanhol (es-ES).
- **Sem Dependências Pesadas:** Geração de HTML semântico, leve e otimizado para SEO e acessibilidade (WCAG).

---

## 🎛️ Documentação Detalhada do Painel Lateral (`InspectorControls`)

O painel lateral de configurações do bloco foi arquitetado utilizando o componente de abas nativo (`TabPanel`), dividindo os controles em três áreas temáticas:

```
┌──────────────────────────────────────────────────────────┐
│              Configurações da Tabela                     │
├───────────────────┬──────────────────┬───────────────────┤
│    Estrutura      │     Estilos      │      Cores        │
└───────────────────┴──────────────────┴───────────────────┘
```

---

### 1. Aba "Estrutura da Tabela"
> **Foco:** Gerenciamento da malha de dados, adição e exclusão de linhas e colunas.

![Aba Estrutura da Tabela](assets/screenshots/screenshot-2-tab-structure.svg)

- **Linhas (`rows`):**
  - **Botão "+ Adicionar Linha":** Adiciona uma nova linha em branco no final da tabela (ou na posição selecionada).
  - **Botão "Excluir Linha":** Remove a linha atualmente ativa ou a última linha da tabela com prevenção de remoção da última linha restante.
- **Colunas (`headers`):**
  - **Botão "+ Adicionar Coluna":** Adiciona uma nova coluna com título sequencial (`Coluna N`) e atualiza todas as linhas existentes instantaneamente.
  - **Botão "Excluir Coluna":** Remove a coluna selecionada ou a última coluna da tabela.
- **Restaurar Tabela de Exemplo:** Redefine o conteúdo da tabela para os dados de demonstração com um clique, ideal para testes de layout.
- **Atalhos na Planilha Inline:** Além do painel lateral, o bloco exibe botões `+ Coluna` e `+ Linha` na barra superior do bloco e ícones de exclusão rápida (`×`) no canto de cada cabeçalho e linha.

---

### 2. Aba "Estilos Bootstrap"
> **Foco:** Aplicação das classes visuais nativas do framework Bootstrap 5.

![Aba Estilos Bootstrap](assets/screenshots/screenshot-3-tab-styles.svg)

- **Linhas Alternadas (Striped):**
  - *Atributo:* `isStriped` (booleano).
  - *Classe CSS aplicada:* `.table-striped`.
  - *Função:* Aplica alternância sutil de cor de fundo nas linhas ímpares/pares, melhorando drasticamente a leitura e legibilidade em tabelas de dados longos ou comparativos.
- **Efeito ao Passar o Mouse (Hover):**
  - *Atributo:* `isHoverable` (booleano).
  - *Classe CSS aplicada:* `.table-hover`.
  - *Função:* Realça dinamicamente a linha sobre a qual o cursor do mouse se posiciona.
- **Bordas em Todas as Células (Bordered):**
  - *Atributo:* `isBordered` (booleano).
  - *Classe CSS aplicada:* `.table-bordered`.
  - *Função:* Adiciona bordas sólidas perimetrais e entre todas as células (`th` e `td`).
- **Container Responsivo:**
  - *Comportamento fixo:* Todo bloco salvo no frontend gera a tag `<div class="table-responsive">`, garantindo que nenhuma tabela extravase a largura da tela em dispositivos móveis.

---

### 3. Aba "Cores do Cabeçalho"
> **Foco:** Personalização temática do cabeçalho da tabela (`<thead>`).

![Aba Cores do Cabeçalho](assets/screenshots/screenshot-4-tab-colors.svg)

- *Atributo:* `headerTheme` (string).
- *Opções Disponíveis:*
  - **Padrão do Tema (`default`):** Herda os estilos e tipografia padrão configurados no tema WordPress ativo.
  - **Escuro (`table-dark`):** Cabeçalho preto elegante com texto branco de alto contraste.
  - **Azul Primário (`table-primary`):** Cabeçalho no tom azul corporativo oficial do Bootstrap 5.
  - **Cinza Secundário (`table-secondary`):** Tom neutro e sofisticado para tabelas secundárias.
  - **Verde Sucesso (`table-success`):** Indicado para tabelas de aprovações, métricas positivas ou financeiras.
  - **Vermelho Alerta (`table-danger`):** Destaque para advertências, erros ou listas de penalidades.
  - **Amarelo Aviso (`table-warning`):** Tom chamativo para alertas ou pendências.
  - **Ciano Informativo (`table-info`):** Tom suave para dados técnicos ou instruções.
  - **Claro (`table-light`):** Fundo suave cinza-claro para layouts minimalistas.
- **Paleta Visual Interativa:** O painel conta com seletor suspenso e botões estilizados de amostra com visualização imediata da tonalidade antes da escolha.

---

## 📱 Exibição no Frontend e Responsividade

![Demonstração Responsiva Frontend](assets/screenshots/screenshot-5-frontend-responsive.svg)

No frontend, a tabela é renderizada de forma ultra limpa e sem scripts adicionais desnecessários, gerando o seguinte padrão de marcação HTML:

```html
<div class="table-responsive periodic-table-responsive-block">
  <table class="table table-striped table-hover table-bordered align-middle">
    <thead class="table-dark">
      <tr>
        <th scope="col">Coluna 1</th>
        <th scope="col">Coluna 2</th>
        <th scope="col">Coluna 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dado 1A</td>
        <td>Dado 1B</td>
        <td>Dado 1C</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 📂 Estrutura de Arquivos e Pastas

```
periodic-table-responsive/
├── assets/
│   └── screenshots/
│       ├── screenshot-1-overview.svg
│       ├── screenshot-2-tab-structure.svg
│       ├── screenshot-3-tab-styles.svg
│       ├── screenshot-4-tab-colors.svg
│       └── screenshot-5-frontend-responsive.svg
├── languages/
│   ├── en-us.json
│   ├── es.json
│   ├── it.json
│   └── pt-br.json
├── src/
│   ├── edit.js
│   ├── editor.scss
│   ├── index.js
│   ├── save.js
│   └── style.scss
├── block.json
├── periodic-table-responsive.php
├── package.json
└── readme.md
```

---

## 📸 Instruções para Captura e Atualização de Screenshots

Os arquivos vetoriais de demonstração estão localizados em `assets/screenshots/`. Caso queira capturar telas reais do painel lateral diretamente no navegador:

1. **Screenshot 1 — Visão Geral (`screenshot-1-overview.png`):**
   - Abra um post ou página no editor de blocos WordPress.
   - Insira o bloco "Tabela Responsiva (Bootstrap 5)".
   - Mantenha a barra lateral aberta e clique em uma das células para exibir o foco de digitação inline.
   - Capture a área com resolução mínima de **1200 × 680 pixels**.

2. **Screenshot 2 — Aba Estrutura (`screenshot-2-tab-structure.png`):**
   - No painel lateral, selecione a aba **Estrutura**.
   - Capture o painel com os contadores de linhas e colunas e botões de ação em destaque.

3. **Screenshot 3 — Aba Estilos (`screenshot-3-tab-styles.png`):**
   - Selecione a aba **Estilos**.
   - Capture o estado com as três opções de alternância (*Striped*, *Hover*, *Bordered*) ativas.

4. **Screenshot 4 — Aba Cores (`screenshot-4-tab-colors.png`):**
   - Selecione a aba **Cores**.
   - Capture o seletor com a paleta de temas do Bootstrap visível.

5. **Screenshot 5 — Frontend Responsivo (`screenshot-5-frontend-responsive.png`):**
   - Publique a página e abra em uma janela desktop ao lado de uma simulação mobile (Device Mode nas ferramentas de desenvolvedor do navegador - F12).

---

## 🚀 Instalação e Desenvolvimento

### Requisitos
- WordPress 6.1 ou superior.
- PHP 7.4 ou superior.
- Node.js 18+ e npm (para compilação do código-fonte).

### Instalação como Plugin WordPress
1. Clone ou faça o download desta pasta para o diretório `/wp-content/plugins/periodic-table-responsive`.
2. Execute o comando de compilação:
   ```bash
   npm install
   npm run build
   ```
3. Acesse o painel administrativo do WordPress (**Plugins > Plugins Instalados**).
4. Localize **Periodic Table Responsive (Bootstrap 5)** e clique em **Ativar**.
5. Abra o editor de blocos e pesquise por "Tabela Responsiva" ou utilize a categoria "Widgets".

---

## 🌐 Internacionalização (i18n)

O bloco possui suporte completo a traduções pelo padrão do WordPress:
- `pt-BR`: Português do Brasil (nativo)
- `en-US`: Inglês (Estados Unidos)
- `it-IT`: Italiano
- `es-ES`: Espanhol

---

## 👤 Autor

**Luiz Fernando Brogliatto Ferreira**  
- **Perfil WordPress.org:** [profiles.wordpress.org/periodic](https://profiles.wordpress.org/periodic/)  
- **GitHub:** [github.com/periodicyahoo](https://github.com/periodicyahoo)  
- **LinkedIn:** [linkedin.com/in/luiz-ferreira-260277379](https://www.linkedin.com/in/luiz-ferreira-260277379/)  

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo de licença ou a [GNU General Public License](https://www.gnu.org/licenses/gpl-2.0.html) para obter mais informações.
