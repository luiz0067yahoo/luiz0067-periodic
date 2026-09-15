<!--
  Module: periodic-card-trainer
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Card Trainer

> Consolidated module standardized under namespace `.periodic-card-trainer`.

---

# Periodic Card Trainer

> **Plugin WordPress Gutenberg** profissional para criação e exibição de cartões interativos de aprendizado e memorização em 3 modos dinâmicos: **Jogo da Memória**, **Flashcard com Verificação** e **Dialog Cards com Giro 3D**. Desenvolvido com **Bootstrap 5**, **CSS 3D Flip** (`preserve-3d`), sintetizador sonoro via **Web Audio API** e suporte nativo a internacionalização (**i18n**).

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg?style=flat-square&logo=wordpress)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4.svg?style=flat-square&logo=php)](https://php.net)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20API%20v3-black.svg?style=flat-square)](https://developer.wordpress.org/block-editor/)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3-7952B3.svg?style=flat-square&logo=bootstrap)](https://getbootstrap.com)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg?style=flat-square)](https://www.gnu.org/licenses/gpl-2.0.html)

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Recursos Principais](#recursos-principais)
- [Documentação Detalhada das Abas](#documentação-detalhada-das-abas)
  - [1. Jogo da Memória (Memory Grid)](#1-jogo-da-memória-memory-grid)
  - [2. Flashcard (Com Input de Texto)](#2-flashcard-com-input-de-texto)
  - [3. Dialog Cards (Virar Frente/Verso)](#3-dialog-cards-virar-frenteverso)
- [Galeria Visual das Situações](#galeria-visual-das-situações)
- [Arquitetura Técnica](#arquitetura-técnica)
- [Instalação e Uso no WordPress](#instalação-e-uso-no-wordpress)
- [Desenvolvimento e Compilação](#desenvolvimento-e-compilação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autor](#autor)
- [Licença](#licença)

---

## 🌟 Visão Geral

O **Periodic Card Trainer** é uma solução completa para produtores de conteúdo educacional, cursos online, plataformas EAD e blogs em WordPress que desejam transformar o aprendizado em uma experiência gamificada e envolvente. 

O plugin foi projetado com código limpo, moderno e modular, combinando a flexibilidade visual do **Bootstrap 5** com o poder do **Gutenberg Block Editor**, eliminando dependências pesadas e garantindo carregamento ultrarrápido tanto no desktop quanto em dispositivos móveis.

---

## 🚀 Recursos Principais

- 🎴 **3 Modos Interativos em um Único Bloco**: Jogo da Memória (grid de pares), Flashcards tradicionais com campo de resposta e Dialog Cards de conversação.
- ⚡ **Efeito 3D Flip Realista**: Animações fluidas em CSS3 utilizando `transform-style: preserve-3d`, `perspective: 1000px` e `rotateY(180deg)` sem travamentos.
- 🔊 **Sintetizador de Áudio Web Audio API Integrado**: Gera efeitos sonoros realistas em tempo real (giro de carta, acerto, erro e comemoração de vitória) sem requisições de arquivos de som externos.
- 🎧 **Suporte a Áudio de Pronúncia Personalizado**: Permite configurar URLs de arquivos de áudio em cada cartão para treino de idiomas e escuta.
- ⏱️ **Cronômetro e Contador de Movimentos em Tempo Real**: Métricas interativas para desafiar o usuário a melhorar seu tempo e precisão.
- 📱 **Layout Totalmente Responsivo com Bootstrap 5**: Grade adaptável configurável no editor Gutenberg (1 a 6 colunas) com adaptação automática em telas menores.
- 🌐 **Internacionalização Completa (i18n)**: Suporte nativo aos idiomas **Português (pt-BR)**, **Inglês (en-US)**, **Italiano (it-IT)** e **Espanhol (es-ES)**.
- 🛠️ **Painel Inspector Intuitivo**: Personalização total no editor de blocos: altura dos cartões, colunas, exibição de métricas, dicas e gerenciamento completo dos itens (adicionar, duplicar, reordenar e remover).

---

## 📖 Documentação Detalhada das Abas

O bloco permite selecionar entre 3 modos de exibição por meio da configuração do bloco no editor ou na demonstração interativa:

```
+-------------------------------------------------------------------------+
|                        MODOS DO CARD TRAINER                            |
+-------------------------------------------------------------------------+
|  [ 🧠 1. Jogo da Memória ]  [ ✍️ 2. Flashcard ]  [ 🔄 3. Dialog Cards ]  |
+-------------------------------------------------------------------------+
```

### 1. Jogo da Memória (Memory Grid)

Projetado para treinar associação visual, reconhecimento de vocabulário e memória de curto prazo por meio de um tabuleiro de pares virados para baixo.

#### Mecânica de Funcionamento:
1. **Embaralhamento Inteligente**: O algoritmo Fisher-Yates duplica cada cartão configurado (gerando o Lado A - Frente e o Lado B - Verso) e os distribui aleatoriamente na grade.
2. **Desafio de Associação**: O usuário clica em um cartão para revelá-lo. Ao selecionar o segundo cartão:
   - **Combinação Correta (Match)**: Os dois cartões permanecem abertos, recebem o badge de confirmação com ícone de checkmark verde (`✓`), disparam o som harmônico sintetizado (C5 - E5 - G5) e o contador de pares é incrementado.
   - **Combinação Incorreta (Mismatch)**: O sistema reproduz um som de aviso, aciona uma animação de vibração horizontal (*shake effect*) e revira os cartões automaticamente após 700ms.
3. **Métricas Ativas**:
   - **Cronômetro**: Inicia automaticamente ao primeiro clique no tabuleiro.
   - **Contador de Movimentos**: Registra cada tentativa (par de cliques).
   - **Contador de Pares**: Exibe o progresso em formato `X / Total`.
4. **Modal de Vitória**: Ao encontrar todos os pares, o cronômetro para e um modal de celebração com troféu e efeito sonoro triunfante é apresentado, exibindo o tempo e os movimentos realizados, com botão imediato de **"Jogar Novamente"**.

---

### 2. Flashcard (Com Input de Texto)

Ideal para estudo ativo de idiomas, exames, concursos e fixação de conceitos com autoavaliação por digitação.

#### Mecânica de Funcionamento:
1. **Exibição da Pergunta**: Apresenta a face frontal do cartão contendo o termo, pergunta ou imagem ilustrativa.
2. **Sistema de Dicas Opcionais**: Se cadastrada, uma dica inteligente pode ser visualizada ou ocultada pelo usuário clicando em **"💡 Ver Dica"**.
3. **Verificação de Resposta**:
   - O usuário digita sua resposta no campo de texto e clica em **"Verificar Resposta"** (ou pressiona `Enter`).
   - **Algoritmo de Correspondência**: Compara o texto digitado com o verso do cartão, desconsiderando variações de caixa alta/baixa e espaços excedentes, com suporte a correspondências equivalentes.
   - **Acerto**: Dispara o som de sucesso, exibe o aviso verde estilizado `✓ Excelente! Resposta correta!` e executa o giro 3D revelando o verso do cartão.
   - **Erro**: Dispara som de alerta, aplica animação de tremor (*shake*) no cartão e exibe mensagem amigável incentivando nova tentativa.
4. **Navegação de Deck**: Permite avançar e retroceder facilmente entre os cartões com botões direcionais e contador `Cartão X de Y`.

---

### 3. Dialog Cards (Virar Frente/Verso)

Focado em diálogo, frases de conversação e cartões bilíngues estilo deck tradicional.

#### Mecânica de Funcionamento:
1. **Estudo de Conversação**: Mostra o cumprimento ou frase original na língua de estudo com imagem e apoio contextual.
2. **Giro em 3D Espelhado**: O usuário pode clicar diretamente sobre o cartão ou acionar o botão dedicado **"🔄 Virar Cartão"**.
3. **Pronúncia Integrada**: Cada face do cartão pode conter um botão de áudio `🔊 Ouvir` para reproduzir gravações em alta fidelidade.
4. **Ciclo de Estudo**: Facilita a revisão rápida passando de cartão em cartão com contadores integrados de tempo decorrido e movimentos.

---

## 🖼️ Galeria Visual das Situações

Abaixo estão os registros das principais situações de uso de cada aba:

### Aba 1: Jogo da Memória (Memory Grid)

| Situação | Visualização | Descrição |
|---|:---:|---|
| **1. Estado Inicial** | ![Jogo da Memória - Inicial](assets/screenshots/01-memory-grid-initial.png) | Tabuleiro com cartas viradas para baixo, cronômetro zerado e contador de pares pronto. |
| **2. Em Jogo (Pares Encontrados)** | ![Jogo da Memória - Em Jogo](assets/screenshots/02-memory-grid-playing.png) | Cartas abertas revelando pares correspondentes com checkmark verde e métricas em tempo real. |
| **3. Celebração de Vitória** | ![Jogo da Memória - Vitória](assets/screenshots/03-memory-grid-victory.png) | Modal com troféu, resumo de pontuação/tempo e botão para reiniciar a partida. |

---

### Aba 2: Flashcard (Com Input de Texto)

| Situação | Visualização | Descrição |
|---|:---:|---|
| **1. Pergunta e Dica Ativa** | ![Flashcard - Pergunta](assets/screenshots/04-flashcard-question-tip.png) | Cartão frontal com pergunta, imagem, caixa de dica expandida e campo para digitar resposta. |
| **2. Verificação com Giro 3D** | ![Flashcard - Verificado](assets/screenshots/05-flashcard-verified-correct.png) | Resposta correta validada com feedback visual de sucesso e animação 3D revelando o verso. |

---

### Aba 3: Dialog Cards (Virar Frente/Verso)

| Situação | Visualização | Descrição |
|---|:---:|---|
| **1. Frente do Cartão de Diálogo** | ![Dialog Cards - Frente](assets/screenshots/06-dialog-cards-front.png) | Cartão de conversação com frase de estudo, dica ativada e botão de giro 3D. |
| **2. Verso Virado em 3D** | ![Dialog Cards - Verso](assets/screenshots/07-dialog-cards-back-3d.png) | Verso do cartão revelando a tradução completa e opções de pronúncia em áudio. |

---

## ⚙️ Arquitetura Técnica

```
periodic-card-trainer/
├── block.json                  # Metadados do bloco Gutenberg (Block API v3)
├── periodic-card-trainer.php   # Registro do plugin, enqueues e i18n
├── build.js                    # Script de build customizado (esbuild + Dart Sass)
├── preview.html                # Showcase interativo completo das 3 abas
├── languages/                  # Dicionários de internacionalização
│   ├── pt-br.json              # Português (Brasil)
│   ├── en-us.json              # Inglês (Estados Unidos)
│   ├── it.json                 # Italiano
│   └── es.json                 # Espanhol
├── src/
│   ├── index.js                # Registro do bloco no editor Gutenberg
│   ├── edit.js                 # Interface visual e controles do Inspector
│   ├── save.js                 # Estrutura HTML/SSR salva no banco do WordPress
│   ├── view.js                 # Controlador frontend Vanilla JS + Web Audio API
│   ├── i18n.js                 # Motor de tradução e interpolação dinâmica
│   ├── editor.scss             # Estilos dedicados ao editor Gutenberg
│   └── style.scss              # Estilos globais frontend e transições 3D
└── assets/
    └── screenshots/            # Registros fotográficos das situações das abas
```

### Características Técnicas Destacadas:
- **Zero jQuery**: Todo o código de frontend foi escrito em **JavaScript moderno puro (ES6+)**, garantindo velocidade e compatibilidade total.
- **Web Audio API Osciladores**: Sons gerados programmaticamente por nós de osciladores de áudio senoidais e triangulares sem depender de arquivos `.mp3` ou `.wav` externos.
- **Sem conflitos de CSS**: Namespace isolado `.periodic-card-trainer` prevenindo choques com temas WordPress.

---

## 📥 Instalação e Uso no WordPress

### Instalação Manual:
1. Faça o download ou clone este repositório para a pasta de plugins da sua instalação WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-card-trainer.git
   ```
2. Acesse o **Painel Administrativo do WordPress** > **Plugins**.
3. Localize **Periodic Card Trainer** e clique em **Ativar**.

### Inserção no Editor Gutenberg:
1. Abra qualquer Página ou Post no editor de blocos.
2. Clique no botão **+** (Adicionar Bloco) e pesquise por **"Card Trainer"** ou **"Treinador de Cartões"**.
3. Na barra lateral direita (**Configurações do Bloco**):
   - Escolha o modo de jogo desejado (**Jogo da Memória**, **Flashcard** ou **Dialog Cards**).
   - Defina o idioma, número de colunas e altura dos cartões.
   - Adicione, edite ou remova cartões com textos, imagens e dicas.
4. Salve e publique sua página!

---

## 💻 Desenvolvimento e Compilação

Para customizar ou compilar os arquivos fonte do projeto:

```bash
# 1. Instalar dependências de desenvolvimento
npm install

# 2. Executar compilação de produção (Sass + esbuild)
npm run build

# 3. Modo de desenvolvimento contínuo (Watch)
npm run dev
```

---

## 👤 Autor

Desenvolvido por:

**Luiz Fernando Brogliatto Ferreira**

- 🌐 **WordPress.org**: [@periodic](https://profiles.wordpress.org/periodic/)
- 🐙 **GitHub**: [@periodicyahoo](https://github.com/periodicyahoo)
- 💼 **LinkedIn**: [Luiz Fernando Brogliatto Ferreira](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Este plugin é distribuído sob a licença [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html). Você é livre para usá-lo, modificá-lo e distribuí-lo de acordo com os termos da General Public License da Free Software Foundation.
