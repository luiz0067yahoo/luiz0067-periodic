<!--
  Module: periodic-grafic-pizza
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Grafic Pizza

> Consolidated module standardized under namespace `.periodic-grafic-pizza`.

---

# periodic Build Grafics - Gráfico Pizza 📊

[![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-blue.svg?logo=wordpress)](https://wordpress.org)
[![Chart.js](https://img.shields.io/badge/Chart.js-3.6.1-FF6384.svg?logo=chartdotjs)](https://www.chartjs.org)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luiz-ferreira-260277379/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin WordPress moderno que adiciona um Custom Block no **Gutenberg** chamado **Gráfico Pizza** (`cms-adm/build-grafics`), permitindo criar, personalizar e exibir múltiplos gráficos de pizza interativos e responsivos alimentados pelo **Chart.js**.

---

![Screenshot do periodic Build Grafics](screenshot.png)

---

## 🚀 Principais Recursos

- **100% WYSIWYG no Gutenberg**: Renderização em tempo real do gráfico e das porcentagens diretamente no canvas do editor de blocos.
- **Inserção Rápida pelo Gutenberg**: Localizável na categoria **Design** do inserter com ícone nativo de gráfico de pizza.
- **Barra de Ações Rápida sobre o Gráfico**:
  - ➕ **Adicionar**: Insere novos gráficos no mesmo bloco, organizando-os em grid inteligente com divisores visuais automáticos.
  - ✏️ **Editar**: Abre uma tabela flutuante para configuração detalhada de título, subtítulo, legendas, valores e cores.
  - ❌ **Excluir**: Remove o gráfico ativo com segurança.
- **Cálculo Automático de Proporções**:
  - Círculos de porcentagem de 80px x 80px calculados dinamicamente com base nos valores informados.
  - Borda colorida correspondente a cada fatia e rótulo descritivo individual.
- **Paleta de Cores e Personalização Livre**:
  - Paleta com 75 cores predefinidas (Originais, Claras e Escuras).
  - Seletor nativo do navegador (`<input type="color">`) e suporte a inserção direta de código Hexadecimal.
- **Frontend Leve e Totalmente Responsivo**:
  - Integração local com Chart.js v3.6.1 (sem necessidade de conexões externas ou CDNs).
  - Ajuste de alturas dinâmico para alinhamento uniforme em qualquer resolução.
- **Internacionalização Completa (i18n)**:
  - Suporte nativo e pronto para múltiplos idiomas através de `load_plugin_textdomain` e `wp_set_script_translations`.
  - Pacotes de idiomas completos (.pot, .po, .mo e JSON Jed para o Gutenberg).
  - Suporte completo ao **Português (`pt_BR`)**, **Inglês (`en_US`)**, **Espanhol (`es_ES`)** e **Italiano (`it_IT`)**.

---

## 📁 Estrutura de Arquivos

```text
periodic-grafic/
├── build-grafics.php       # Arquivo principal do plugin (headers WP, register_block_type, i18n, enqueue)
├── screenshot.png          # Captura oficial de tela para exibição no WordPress / GitHub
├── languages/              # Arquivos de internacionalização e tradução
│   ├── periodic-build-grafics.pot      # Template mestre de tradução
│   ├── periodic-build-grafics-pt_BR.*  # Tradução para Português do Brasil (PO, MO, JSON)
│   ├── periodic-build-grafics-en_US.*  # Tradução para Inglês (PO, MO, JSON)
│   ├── periodic-build-grafics-es_ES.*  # Tradução para Espanhol (PO, MO, JSON)
│   └── periodic-build-grafics-it_IT.*  # Tradução para Italiano (PO, MO, JSON)
├── assets/
│   ├── js/
│   │   ├── chart.min.js    # Biblioteca Chart.js v3.6.1 empacotada localmente
│   │   ├── block.js        # Lógica do bloco Gutenberg (edit, save, atributos, i18n)
│   │   └── frontend.js     # Inicialização dos gráficos no frontend público
│   └── css/
│       ├── editor.css      # Estilos do painel de edição do Gutenberg
│       └── style.css       # Estilos públicos (círculos de porcentagem, layout responsivo)
└── README.md               # Documentação do projeto
```

---

## 🌐 Idiomas Suportados

| Idioma | Código Locale | Status |
| :--- | :--- | :--- |
| 🇧🇷 **Português do Brasil** | `pt_BR` | Nativo / 100% |
| 🇺🇸 **Inglês** | `en_US` | Completo / 100% |
| 🇪🇸 **Espanhol** | `es_ES` | Completo / 100% |
| 🇮🇹 **Italiano** | `it_IT` | Completo / 100% |

---

## 💻 Requisitos

- **WordPress**: 5.8 ou superior
- **PHP**: 7.4 ou superior
- **Navegadores**: Chrome, Firefox, Safari, Edge

---

## 📦 Instalação

### Instalação Manual

1. Faça o download ou clone este repositório na pasta de plugins do seu WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-grafic.git periodic-build-grafics
   ```
2. Acesse o painel administrativo do WordPress (**Painel > Plugins > Plugins Instalados**).
3. Localize **"periodic Build Grafics - Gráfico Pizza"** e clique em **Ativar**.

---

## 🎨 Como Utilizar no Gutenberg

1. No editor de posts ou páginas, clique no botão **`+`** e selecione o bloco **"Gráfico pizza"**.
2. O bloco será inserido com dados de demonstração iniciais.
3. Clique no botão **`✎` (Editar)** sobre o gráfico para abrir a tabela de dados:
   - Altere o **Título** e **Subtítulo**.
   - Digite os rótulos de **Legenda**, **Valores** e selecione as **Cores**.
   - Use o botão **`+`** para inserir novas fatias ou **`-`** para remover fatias.
   - Para adicionar mais de um gráfico no mesmo bloco, utilize o botão **`+`** na barra superior.
4. Ao publicar, o frontend exibirá o gráfico interativo com animações e tooltips do Chart.js.

---

## 📄 Licença

Este projeto é software livre e está licenciado sob os termos da licença [GNU General Public License v2.0 or later (GPL-2.0-or-later)](https://www.gnu.org/licenses/gpl-2.0.html).

---

## 👨‍💻 Autor

**Luiz Fernando Brogliatto Ferreira**
- WordPress.org: [@periodic](https://profiles.wordpress.org/periodic/)
- GitHub: [@periodicyahoo](https://github.com/periodicyahoo)
- LinkedIn: [Luiz Fernando Brogliatto Ferreira](https://www.linkedin.com/in/luiz-ferreira-260277379/)