<!--
  Module: periodic-team-member
  Consolidated under: Periodic Component Suite
  Consolidation date: 2026-09-15
-->

# Periodic Team Member

> Consolidated module standardized under namespace `.periodic-team-member`.

---

# Periodic Team Member

[![WordPress Gutenberg](https://img.shields.io/badge/Gutenberg-Block%20v3-21759b?logo=wordpress&logoColor=white)](https://wordpress.org/)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Font Awesome 6](https://img.shields.io/badge/Font%20Awesome-6.5-339af0?logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

Plugin de bloco nativo para o editor Gutenberg do WordPress dedicado à apresentação institucional elegante e moderna de membros de equipe, instrutores, professores, executivos ou conselheiros.

Desenvolvido seguindo rigorosamente as melhores práticas da API de Blocos do WordPress (schema `block.json` v3), grid responsivo do Bootstrap 5, biblioteca de ícones Font Awesome 6, edição WYSIWYG fluida e suporte completo à internacionalização (i18n).

---

## 🎯 Finalidade do Bloco

O **Periodic Team Member** foi projetado para criar seções de apresentação de equipes com visual premium sem a necessidade de dependências pesadas de construtores de páginas terceiros. Oferece:

- **Cartões Institucionais Responsivos**: Layout baseado em grid Bootstrap 5 que se adapta harmoniosamente de 1 a 4 colunas em desktops, tablets e dispositivos móveis.
- **Integração Nativa com a Biblioteca de Mídia (`MediaUpload`)**: Envio e seleção de fotografias diretamente pela interface nativa do WordPress, com formatos circular (`rounded-circle`), cantos arredondados (`rounded`) ou moldura clássica (`img-thumbnail`).
- **Edição em Tempo Real (WYSIWYG)**: Edição direta no canvas do editor com atualização imediata de textos, fotos e estilos.
- **Botões Sociais Circulares**: Conexão com perfis profissionais (LinkedIn, GitHub, Twitter/X, Instagram, E-mail, Website, etc.) com ícones vetoriais Font Awesome 6.

---

## 🖼️ Galeria e Demonstrações Visuais

### 1. Visão Geral dos Cartões na Página (Frontend)
![Apresentação dos Cartões](assets/screenshots/screenshot-1.svg)
*Demonstração dos cartões com alinhamento centralizado, fotos circulares e botões sociais modernos.*

---

### 2. Painel Lateral: Aba "Membros"
![Aba Membros](assets/screenshots/screenshot-2.svg)
*Gerenciamento da equipe: adição de integrantes, ordenação (subir/descer), envio de fotos via `MediaUpload`, nome, cargo e biografia.*

---

### 3. Painel Lateral: Aba "Redes Sociais"
![Aba Redes Sociais](assets/screenshots/screenshot-3.svg)
*Configuração de perfis sociais com atalhos de adição rápida (LinkedIn, GitHub, Twitter/X, etc.) e preview de ícones.*

---

### 4. Painel Lateral: Aba "Estilo da Foto e Cartão"
![Aba Estilo](assets/screenshots/screenshot-4.svg)
*Personalização do número de colunas (1 a 4), formato da foto, tamanho em pixels, estilo de borda/sombra e alinhamento do conteúdo.*

---

## ⚙️ Detalhamento das Abas de Configuração (`InspectorControls`)

O painel de configurações lateral do bloco é organizado em três abas intuitivas:

### 1. Aba "Membros"
- **Lista Ordenável de Membros**: Cada membro cadastrado possui seu próprio cartão de controle no painel, permitindo reorganizar a sequência dos integrantes através dos botões de seta (Mover para cima / Mover para baixo) ou excluí-lo com segurança.
- **Upload de Foto de Perfil (`MediaUpload`)**: Permite selecionar fotos da Biblioteca de Mídia do WordPress ou fazer upload de novos arquivos. Fornece pré-visualização instantânea, botão para substituição da foto e botão para remoção da imagem.
- **Nome Completo**: Campo para inserção do nome do profissional ou instrutor.
- **Especialidade / Cargo**: Campo para indicar a função, titulação ou departamento.
- **Resumo Biográfico**: Campo para resumo de histórico profissional, formação acadêmica e competências principais.
- **Botão "Adicionar Novo Membro"**: Permite expandir a equipe com novos cartões a qualquer momento.

### 2. Aba "Redes Sociais"
- **Seletor de Integrante**: Menu suspenso para alternar facilmente entre os membros da equipe e customizar seus respectivos links sociais.
- **Adição Rápida de Redes**: Botões de um clique com pré-configurações para as redes mais utilizadas no mercado de trabalho e meio acadêmico:
  - LinkedIn (`fa-brands fa-linkedin-in`)
  - GitHub (`fa-brands fa-github`)
  - Twitter / X (`fa-brands fa-x-twitter`)
  - Instagram (`fa-brands fa-instagram`)
  - Website / Portfólio (`fa-solid fa-globe`)
  - E-mail (`fa-solid fa-envelope`)
  - WhatsApp (`fa-brands fa-whatsapp`)
  - YouTube (`fa-brands fa-youtube`)
- **Edição Fina de Links**: Permite editar a URL de destino e a classe do ícone Font Awesome de cada link cadastrado, além de remover itens indesejados.

### 3. Aba "Estilo da Foto e Cartão"
- **Número de Colunas (Grid)**: Controle deslizante (*slider*) que define a quantidade de colunas em telas de grande formato (1 a 4 colunas). Em dispositivos móveis e tablets, o grid Bootstrap 5 reorganiza os cartões automaticamente de forma responsiva.
- **Formato da Foto**:
  - `rounded-circle`: Foto 100% circular, proporcionando estética moderna e limpa.
  - `rounded`: Foto com cantos levemente arredondados.
  - `img-thumbnail`: Foto com moldura branca elegante e borda sutil.
- **Tamanho da Foto (px)**: Ajuste do diâmetro ou largura da foto (de 80px a 260px), mantendo a proporção quadrada 1:1 com recorte inteligente (`object-fit: cover`).
- **Estilo do Cartão (Bootstrap 5)**:
  - `shadow-sm`: Cartão com fundo branco e sombra suave flutuante.
  - `border`: Cartão com contorno fino e discreto.
  - `flat`: Cartão plano e sem borda com fundo transparente.
- **Alinhamento do Conteúdo**: Escolha entre texto centralizado ou alinhado à esquerda.

---

## 📷 Instruções para Geração de Screenshots na Pasta `assets/screenshots/`

Caso deseje atualizar as capturas de tela com fotos reais do seu site para publicação no WordPress.org:

1. Acesse o painel administrativo do WordPress com o plugin ativado.
2. Crie uma página de teste no editor Gutenberg e insira o bloco **Membros da Equipe**.
3. Cadastre membros com fotos reais em alta definição.
4. Utilize uma ferramenta de captura de tela (ou atalho do sistema operacional) em resolução de **1200 x 900 px** ou **1280 x 720 px**:
   - Salve a visão geral da página como `screenshot-1.png`.
   - Abra o painel lateral na aba **Membros** e salve a imagem como `screenshot-2.png`.
   - Abra a aba **Redes Sociais** e salve como `screenshot-3.png`.
   - Abra a aba **Estilo da Foto e Cartão** e salve como `screenshot-4.png`.
5. Coloque os arquivos dentro da pasta `assets/screenshots/`.

---

## 🛠️ Instalação e Compilação do Código-Fonte

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm
- WordPress 6.0+ com PHP 7.4+

### Passos de Instalação e Compilação
1. Clone ou faça download do repositório na pasta `wp-content/plugins/` da sua instalação WordPress:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/periodicyahoo/periodic-team-member.git
   ```

2. Acesse a pasta do plugin e instale as dependências de desenvolvimento:
   ```bash
   cd periodic-team-member
   npm install
   ```

3. Compile os assets de produção:
   ```bash
   npm run build
   ```

4. (Opcional) Para desenvolvimento com recarregamento automático em tempo real:
   ```bash
   npm run start
   ```

5. Acesse o painel de plugins do WordPress (**Plugins > Plugins Instalados**) e ative o **Periodic Team Member**.

---

## 🌐 Internacionalização (i18n)

O plugin está preparado para tradução através dos arquivos em formato JSON localizados na pasta `languages/`:
- 🇧🇷 `pt-br.json` (Português do Brasil)
- 🇺🇸 `en-us.json` (Inglês)
- 🇮🇹 `it.json` (Italiano)
- 🇪🇸 `es.json` (Espanhol)

---

## 👤 Metadados de Autoria

- **Autor**: Luiz Fernando Brogliatto Ferreira
- **WordPress.org**: [https://profiles.wordpress.org/periodic/](https://profiles.wordpress.org/periodic/)
- **GitHub**: [https://github.com/periodicyahoo](https://github.com/periodicyahoo)
- **LinkedIn**: [https://www.linkedin.com/in/luiz-ferreira-260277379/](https://www.linkedin.com/in/luiz-ferreira-260277379/)

---

## 📄 Licença

Este plugin é distribuído sob a licença **GPL-2.0-or-later**. Consulte o arquivo de licença ou o cabeçalho do código-fonte para obter mais informações.
