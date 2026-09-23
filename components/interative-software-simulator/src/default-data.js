/**
 * Default mock scenario for Windows 11 + Word ABNT Margins Setup
 */
export const DEFAULT_ABNT_SCENARIO = [
  {
    id: 'step-1-desktop',
    title: 'Área de Trabalho do Windows 11',
    imageUrl: 'assets/step1-windows11-desktop.png',
    imageId: null,
    instruction: 'Passo 1: Clique no ícone do Menu Iniciar centralizado na barra de tarefas do Windows 11.',
    elements: [
      {
        id: 'el-start-btn',
        type: 'click',
        top: 95.0,
        left: 44.5,
        width: 3.0,
        height: 4.8,
        label: 'Botão Iniciar',
        targetStepIndex: 1
      }
    ]
  },
  {
    id: 'step-2-startmenu',
    title: 'Menu Iniciar e Pesquisa',
    imageUrl: 'assets/step2-windows11-startmenu.png',
    imageId: null,
    instruction: 'Passo 2: Digite "Word" na caixa de pesquisa do Menu Iniciar e pressione Enter para abrir o programa.',
    elements: [
      {
        id: 'el-search-input',
        type: 'input',
        top: 30.1,
        left: 35.4,
        width: 29.2,
        height: 4.3,
        expectedValue: 'Word',
        placeholder: 'Digite "Word" e pressione Enter...',
        label: 'Pesquisa do Menu Iniciar',
        targetStepIndex: 2
      }
    ]
  },
  {
    id: 'step-3-word-open',
    title: 'Microsoft Word - Documento em Branco',
    imageUrl: 'assets/step3-word-document.png',
    imageId: null,
    instruction: 'Passo 3: Com o Microsoft Word aberto, clique na aba "Layout" na faixa de opções superior.',
    elements: [
      {
        id: 'el-tab-layout',
        type: 'click',
        top: 4.5,
        left: 22.4,
        width: 4.2,
        height: 3.6,
        label: 'Aba Layout',
        targetStepIndex: 3
      }
    ]
  },
  {
    id: 'step-4-layout-ribbon',
    title: 'Aba Layout e Menu Margens',
    imageUrl: 'assets/step4-word-layout-ribbon.png',
    imageId: null,
    instruction: 'Passo 4: No menu de Margens, role até o final da lista e clique em "Margens Personalizadas...".',
    elements: [
      {
        id: 'el-custom-margins',
        type: 'click',
        top: 44.4,
        left: 1.5,
        width: 15.8,
        height: 4.9,
        label: 'Margens Personalizadas...',
        targetStepIndex: 4
      }
    ]
  },
  {
    id: 'step-5-page-setup-modal',
    title: 'Configurar Página - Margens ABNT',
    imageUrl: 'assets/step5-word-margins-modal.png',
    imageId: null,
    instruction: 'Passo 5: Preencha as 4 margens no padrão ABNT (Superior: 3, Esquerda: 3, Inferior: 2, Direita: 2) e clique em OK.',
    elements: [
      {
        id: 'el-margin-superior',
        type: 'input',
        top: 32.3,
        left: 39.9,
        width: 5.5,
        height: 2.6,
        expectedValue: '3',
        placeholder: '3',
        label: 'Superior (3)',
        group: 'abnt-margins'
      },
      {
        id: 'el-margin-esquerda',
        type: 'input',
        top: 36.4,
        left: 39.9,
        width: 5.5,
        height: 2.6,
        expectedValue: '3',
        placeholder: '3',
        label: 'Esquerda (3)',
        group: 'abnt-margins'
      },
      {
        id: 'el-margin-inferior',
        type: 'input',
        top: 32.3,
        left: 54.0,
        width: 5.5,
        height: 2.6,
        expectedValue: '2',
        placeholder: '2',
        label: 'Inferior (2)',
        group: 'abnt-margins'
      },
      {
        id: 'el-margin-direita',
        type: 'input',
        top: 36.4,
        left: 54.0,
        width: 5.5,
        height: 2.6,
        expectedValue: '2',
        placeholder: '2',
        label: 'Direita (2)',
        group: 'abnt-margins'
      },
      {
        id: 'el-btn-ok',
        type: 'click',
        top: 73.1,
        left: 54.6,
        width: 5.0,
        height: 3.0,
        label: 'Botão OK',
        requiresCompletedInputs: true,
        targetStepIndex: -1 // Completes simulator!
      }
    ]
  }
];
