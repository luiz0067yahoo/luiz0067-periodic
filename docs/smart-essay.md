<!--
  Módulo: periodic-smart-essay
  Consolidado sob: Periodic Component Suite
  Data de consolidação: 2026-09-15
-->

# Periodic Smart Essay

> Módulo consolidado e padronizado sob o namespace `.periodic-smart-essay`.

---

# Periodic Smart Essay ✍️🎓

Plugin WordPress com bloco Gutenberg moderno para submissão de redações e ensaios por estudantes com avaliação e pontuação automatizada em tempo real via JavaScript puro e interface baseada em **Bootstrap 5**.

![Periodic Smart Essay - Demonstração](assets/screenshot.png)

---

## 🚀 Principais Recursos

1. **Avaliação Automatizada no Frontend (JS Puro)**:
   - Validação sem dependências de frameworks pesados ou jQuery.
   - Detecção inteligente de conceitos obrigatórios com suporte a múltiplos sinônimos e variações flexíveis.
   - Normalização com remoção de diacríticos e pontuação para reconhecimento preciso de palavras acentuadas.
   - Cálculo avançado de **Densidade Lexical** (relação entre palavras de conteúdo e total de vocábulos, filtrando *stop words* comuns em português, inglês, espanhol e italiano).
   - Ajuste proporcional de nota caso a extensão fique abaixo do limite mínimo estipulado.

2. **Interface Bootstrap 5 Elegante**:
   - Card responsivo estilizado com tema moderno e profissional.
   - Campo de digitação (`textarea`) expansível automaticamente conforme a redação é desenvolvida.
   - Contadores em tempo real de palavras e caracteres.
   - Barra de progresso dinâmica com indicação visual de metas.
   - Relatório interativo detalhado com status de aprovação, notas parciais por critério e feedbacks pedagógicos individuais.

3. **Experiência do Professor no Gutenberg (`edit.js`)**:
   - Campo WYSIWYG formatado (`RichText`) no próprio canvas para inclusão de instruções e tema da redação.
   - Painel lateral (`InspectorControls`) com **Repeater Dinâmico de Palavras-Chave**:
     - Cadastro do termo principal.
     - Definição do peso/pontuação do critério.
     - Cadastro de múltiplos sinônimos aceitos (separados por vírgula).
     - Feedback pedagógico individualizado (exibido caso o aluno cite ou omita o conceito).
   - Controles numéricos para Mínimo de Palavras, Máximo Sugerido e Nota Mínima para Aprovação (%).

4. **Internacionalização Pronta (i18n)**:
   - Suporte completo a múltiplos idiomas com arquivos JSON inclusos nas pastas `languages/` e `languagens/`:
     - 🇧🇷 Português do Brasil (`pt-br.json`)
     - 🇺🇸 Inglês (`en-us.json`)
     - 🇮🇹 Italiano (`it.json`)
     - 🇪🇸 Espanhol (`es.json`)

---

## 📋 Atributos do Bloco (`block.json`)

| Atributo | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `promptInstructions` | `string` | *HTML padrão* | Instruções, orientações e proposta temática da redação formatadas via WYSIWYG. |
| `minWords` | `number` | `50` | Contagem mínima de palavras exigida para aceitação e pontuação total. |
| `maxWords` | `number` | `500` | Limite máximo recomendado para a extensão do texto. |
| `passingPercentage` | `number` | `70` | Percentual mínimo necessário para aprovação do estudante. |
| `keywords` | `array` | *3 termos base* | Lista de objetos contendo `{ term, weight, synonyms, feedback }` gerenciada via repeater lateral. |

---

## 🛠️ Estrutura de Arquivos

```
periodic-smart-essay/
├── periodic-smart-essay.php      # Ponto de entrada do plugin WordPress
├── package.json                   # Dependências e scripts de build
├── block.json                     # Metadata do bloco Gutenberg (API v3)
├── src/
│   ├── index.js                   # Registro do bloco
│   ├── edit.js                    # Componente de edição no Gutenberg (Repeater + WYSIWYG)
│   ├── save.js                    # Renderização frontend em card Bootstrap 5
│   ├── view.js                    # Script JS puro de análise semântica e densidade lexical
│   ├── style.scss                 # Estilos compartilhados (Frontend e Editor)
│   └── editor.scss                # Estilos adicionais do painel lateral
├── build/                         # Arquivos compilados gerados pelo @wordpress/scripts
├── languages/                     # Arquivos de tradução (i18n)
│   ├── pt-br.json
│   ├── en-us.json
│   ├── it.json
│   └── es.json
├── assets/
│   └── screenshot.png             # Imagem de demonstração da interface
├── screenshot.png                 # Imagem de demonstração na raiz
└── README.md                      # Documentação completa
```

---

## 💻 Instalação e Desenvolvimento

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM (versão 8 ou superior)
- WordPress 6.1+ com PHP 7.4+

### Passo a Passo

1. Clone o repositório na pasta de plugins do seu WordPress:
   ```bash
   cd wp-content/plugins
   git clone https://github.com/periodic/periodic-smart-essay.git
   cd periodic-smart-essay
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Compile os assets de produção:
   ```bash
   npm run build
   ```
   *(Para desenvolvimento com recarregamento em tempo real, use `npm run start`)*

4. Ative o plugin no painel de controle do WordPress:
   - Vá em **Plugins** > **Plugins Instalados**
   - Localize **Periodic Smart Essay** e clique em **Ativar**.

5. No editor Gutenberg, adicione o bloco pesquisando por **"Smart Essay"** ou **"Redação Inteligente"**.

---

## 🔍 Como Funciona o Algoritmo de Análise (`view.js`)

1. **Autoexpansão e Contagem em Tempo Real**:
   - Conforme o aluno digita, o textarea expande sua altura sem rolagem interna indesejada.
   - A barra de progresso atualiza o status:
     - 🟡 **Abaixo do mínimo**: alerta em amarelo indicando a meta de palavras faltantes.
     - 🟢 **Extensão ideal**: meta atingida dentro da faixa recomendada.
     - 🔵 **Acima do sugerido**: aviso informativo de texto longo.

2. **Cálculo da Densidade Lexical**:
   $$\text{Densidade Lexical} = \left( \frac{\text{Quantidade de Palavras de Conteúdo}}{\text{Total de Palavras}} \right) \times 100$$
   Elimina partículas e preposições vazias (*stop words*) para mensurar a riqueza do vocabulário empregado.

3. **Detecção de Termos e Variações**:
   - Para cada palavra-chave cadastrada pelo professor, o sistema testa tanto o termo original quanto todos os sinônimos registrados.
   - Se qualquer correspondência for identificada, os pontos do critério são creditados e a variação encontrada é sinalizada no relatório.

4. **Pontuação e Penalidades**:
   - Se a redação tiver menos palavras que o mínimo requerido, uma penalidade proporcional é calculada sobre a nota bruta.
   - A nota final é confrontada com o `passingPercentage` para exibir o banner de Aprovação ou Orientação de Revisão.

---

## 📄 Licença

Distribuído sob a licença **GPL-2.0-or-later**.
