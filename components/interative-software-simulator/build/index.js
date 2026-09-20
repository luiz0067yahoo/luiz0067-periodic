(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // wp-global:@wordpress/blocks
  var require_blocks = __commonJS({
    "wp-global:@wordpress/blocks"(exports, module) {
      module.exports = window.wp.blocks;
    }
  });

  // wp-global:@wordpress/i18n
  var require_i18n = __commonJS({
    "wp-global:@wordpress/i18n"(exports, module) {
      module.exports = window.wp.i18n;
    }
  });

  // wp-global:@wordpress/block-editor
  var require_block_editor = __commonJS({
    "wp-global:@wordpress/block-editor"(exports, module) {
      module.exports = window.wp.blockEditor;
    }
  });

  // wp-global:@wordpress/components
  var require_components = __commonJS({
    "wp-global:@wordpress/components"(exports, module) {
      module.exports = window.wp.components;
    }
  });

  // wp-global:@wordpress/element
  var require_element = __commonJS({
    "wp-global:@wordpress/element"(exports, module) {
      module.exports = window.wp.element;
    }
  });

  // src/index.js
  var import_blocks = __toESM(require_blocks());

  // block.json
  var block_default = {
    $schema: "https://schemas.wp.org/trunk/block.json",
    apiVersion: 3,
    name: "custom/simulador-software",
    version: "1.1.0",
    title: "Simulador de Software Interativo",
    category: "periodic-blocks",
    icon: "desktop",
    description: "Crie tutoriais guiados passo a passo simulando softwares reais com prints e camadas interativas responsivas.",
    keywords: [
      "simulador",
      "software",
      "tutorial",
      "abnt",
      "windows",
      "interativo",
      "interactive",
      "simulator",
      "periodic"
    ],
    textdomain: "luiz0067-periodic",
    supports: {
      html: false,
      align: [
        "wide",
        "full"
      ]
    },
    attributes: {
      simulatorTitle: {
        type: "string",
        default: "Simulador de Software: Formata\xE7\xE3o ABNT no Windows 11"
      },
      steps: {
        type: "array",
        default: []
      },
      showProgressBar: {
        type: "boolean",
        default: true
      },
      showRestartButton: {
        type: "boolean",
        default: true
      },
      showStepIndicator: {
        type: "boolean",
        default: true
      },
      highlightHints: {
        type: "boolean",
        default: true
      },
      allowClickAnywhereHint: {
        type: "boolean",
        default: true
      },
      customSuccessMessage: {
        type: "string",
        default: "Parab\xE9ns! Voc\xEA completou com sucesso a configura\xE7\xE3o de margens ABNT no Word!"
      }
    },
    editorScript: "file:./build/index.js",
    editorStyle: "file:./build/index.css",
    style: "file:./build/style-index.css",
    viewScript: "file:./build/view.js",
    render: "file:./inc/render.php"
  };

  // src/edit.js
  var import_i18n = __toESM(require_i18n());
  var import_block_editor = __toESM(require_block_editor());
  var import_components = __toESM(require_components());
  var import_element = __toESM(require_element());

  // src/default-data.js
  var DEFAULT_ABNT_SCENARIO = [
    {
      id: "step-1-desktop",
      title: "\xC1rea de Trabalho do Windows 11",
      imageUrl: "assets/step1-windows11-desktop.svg",
      imageId: null,
      instruction: "Passo 1: Clique no \xEDcone do Menu Iniciar centralizado na barra de tarefas do Windows 11.",
      elements: [
        {
          id: "el-start-btn",
          type: "click",
          top: 95,
          left: 44.5,
          width: 3,
          height: 4.8,
          label: "Bot\xE3o Iniciar",
          targetStepIndex: 1
        }
      ]
    },
    {
      id: "step-2-startmenu",
      title: "Menu Iniciar e Pesquisa",
      imageUrl: "assets/step2-windows11-startmenu.svg",
      imageId: null,
      instruction: 'Passo 2: Digite "Word" na caixa de pesquisa do Menu Iniciar e pressione Enter para abrir o programa.',
      elements: [
        {
          id: "el-search-input",
          type: "input",
          top: 30.1,
          left: 35.4,
          width: 29.2,
          height: 4.3,
          expectedValue: "Word",
          placeholder: 'Digite "Word" e pressione Enter...',
          label: "Pesquisa do Menu Iniciar",
          targetStepIndex: 2
        }
      ]
    },
    {
      id: "step-3-word-open",
      title: "Microsoft Word - Documento em Branco",
      imageUrl: "assets/step3-word-document.svg",
      imageId: null,
      instruction: 'Passo 3: Com o Microsoft Word aberto, clique na aba "Layout" na faixa de op\xE7\xF5es superior.',
      elements: [
        {
          id: "el-tab-layout",
          type: "click",
          top: 4.5,
          left: 22.4,
          width: 4.2,
          height: 3.6,
          label: "Aba Layout",
          targetStepIndex: 3
        }
      ]
    },
    {
      id: "step-4-layout-ribbon",
      title: "Aba Layout e Menu Margens",
      imageUrl: "assets/step4-word-layout-ribbon.svg",
      imageId: null,
      instruction: 'Passo 4: No menu de Margens, role at\xE9 o final da lista e clique em "Margens Personalizadas...".',
      elements: [
        {
          id: "el-custom-margins",
          type: "click",
          top: 44.4,
          left: 1.5,
          width: 15.8,
          height: 4.9,
          label: "Margens Personalizadas...",
          targetStepIndex: 4
        }
      ]
    },
    {
      id: "step-5-page-setup-modal",
      title: "Configurar P\xE1gina - Margens ABNT",
      imageUrl: "assets/step5-word-margins-modal.svg",
      imageId: null,
      instruction: "Passo 5: Preencha as 4 margens no padr\xE3o ABNT (Superior: 3, Esquerda: 3, Inferior: 2, Direita: 2) e clique em OK.",
      elements: [
        {
          id: "el-margin-superior",
          type: "input",
          top: 32.3,
          left: 39.9,
          width: 5.5,
          height: 2.6,
          expectedValue: "3",
          placeholder: "3",
          label: "Superior (3)",
          group: "abnt-margins"
        },
        {
          id: "el-margin-esquerda",
          type: "input",
          top: 36.4,
          left: 39.9,
          width: 5.5,
          height: 2.6,
          expectedValue: "3",
          placeholder: "3",
          label: "Esquerda (3)",
          group: "abnt-margins"
        },
        {
          id: "el-margin-inferior",
          type: "input",
          top: 32.3,
          left: 54,
          width: 5.5,
          height: 2.6,
          expectedValue: "2",
          placeholder: "2",
          label: "Inferior (2)",
          group: "abnt-margins"
        },
        {
          id: "el-margin-direita",
          type: "input",
          top: 36.4,
          left: 54,
          width: 5.5,
          height: 2.6,
          expectedValue: "2",
          placeholder: "2",
          label: "Direita (2)",
          group: "abnt-margins"
        },
        {
          id: "el-btn-ok",
          type: "click",
          top: 73.1,
          left: 54.6,
          width: 5,
          height: 3,
          label: "Bot\xE3o OK",
          requiresCompletedInputs: true,
          targetStepIndex: -1
          // Completes simulator!
        }
      ]
    }
  ];

  // src/edit.js
  function Edit({ attributes, setAttributes }) {
    const {
      simulatorTitle,
      steps,
      showProgressBar,
      showRestartButton,
      showStepIndicator,
      highlightHints,
      customSuccessMessage
    } = attributes;
    const [activeStepIndex, setActiveStepIndex] = (0, import_element.useState)(0);
    const [activeElementId, setActiveElementId] = (0, import_element.useState)(null);
    (0, import_element.useEffect)(() => {
      if (!steps || steps.length === 0) {
        setAttributes({ steps: DEFAULT_ABNT_SCENARIO });
      }
    }, []);
    const getResolvedImageUrl = (url) => {
      if (!url) return "";
      if (url.startsWith("assets/") && typeof window !== "undefined" && window.simuladorSoftwareSettings?.pluginUrl) {
        return window.simuladorSoftwareSettings.pluginUrl + url;
      }
      return url;
    };
    const currentStep = steps && steps[activeStepIndex] ? steps[activeStepIndex] : null;
    const handleAddStep = () => {
      const newStep = {
        id: `step-${Date.now()}`,
        title: `Passo ${steps.length + 1}`,
        imageUrl: "",
        imageId: null,
        instruction: (0, import_i18n.__)("Nova instru\xE7\xE3o para o usu\xE1rio.", "simulador-software-abnt"),
        elements: []
      };
      const updatedSteps = [...steps, newStep];
      setAttributes({ steps: updatedSteps });
      setActiveStepIndex(updatedSteps.length - 1);
    };
    const handleDuplicateStep = (index) => {
      const stepToCopy = steps[index];
      const duplicatedStep = {
        ...JSON.parse(JSON.stringify(stepToCopy)),
        id: `step-${Date.now()}`,
        title: `${stepToCopy.title || "Passo"} (C\xF3pia)`
      };
      const updatedSteps = [...steps];
      updatedSteps.splice(index + 1, 0, duplicatedStep);
      setAttributes({ steps: updatedSteps });
      setActiveStepIndex(index + 1);
    };
    const handleRemoveStep = (index) => {
      if (steps.length <= 1) {
        alert((0, import_i18n.__)("A simula\xE7\xE3o deve conter ao menos um passo.", "simulador-software-abnt"));
        return;
      }
      const updatedSteps = steps.filter((_, i) => i !== index);
      setAttributes({ steps: updatedSteps });
      setActiveStepIndex(Math.max(0, index - 1));
    };
    const handleMoveStep = (index, direction) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= steps.length) return;
      const updatedSteps = [...steps];
      const temp = updatedSteps[index];
      updatedSteps[index] = updatedSteps[targetIndex];
      updatedSteps[targetIndex] = temp;
      setAttributes({ steps: updatedSteps });
      setActiveStepIndex(targetIndex);
    };
    const handleLoadDefaultScenario = () => {
      if (confirm((0, import_i18n.__)("Deseja carregar o cen\xE1rio padr\xE3o da Formata\xE7\xE3o ABNT no Windows 11?", "simulador-software-abnt"))) {
        setAttributes({ steps: DEFAULT_ABNT_SCENARIO });
        setActiveStepIndex(0);
        setActiveElementId(null);
      }
    };
    const updateCurrentStep = (fields) => {
      const updatedSteps = steps.map((step, idx) => {
        if (idx === activeStepIndex) {
          return { ...step, ...fields };
        }
        return step;
      });
      setAttributes({ steps: updatedSteps });
    };
    const handleAddElement = (type = "click") => {
      if (!currentStep) return;
      let newEl = {
        id: `el-${Date.now()}`,
        type,
        top: 40,
        left: type === "drag" ? 25 : 40,
        width: type === "click" ? 12 : type === "drag" ? 14 : 20,
        height: type === "click" ? 6 : type === "drag" ? 8 : 5,
        label: type === "click" ? "Novo Hotspot de Clique" : type === "drag" ? "Novo Item Drag & Drop" : "Novo Campo de Digita\xE7\xE3o",
        expectedValue: type === "input" ? "Word" : "",
        placeholder: type === "input" ? "Digite aqui..." : "",
        targetStepIndex: activeStepIndex + 1
      };
      if (type === "drag") {
        newEl = {
          ...newEl,
          dragText: "Arrastar",
          targetLabel: "Solte Aqui",
          targetTop: 40,
          targetLeft: 60,
          targetWidth: 16,
          targetHeight: 12
        };
      }
      const updatedElements = [...currentStep.elements || [], newEl];
      updateCurrentStep({ elements: updatedElements });
      setActiveElementId(newEl.id);
    };
    const handleUpdateElement = (elementId, fields) => {
      if (!currentStep) return;
      const updatedElements = (currentStep.elements || []).map((el) => {
        if (el.id === elementId) {
          return { ...el, ...fields };
        }
        return el;
      });
      updateCurrentStep({ elements: updatedElements });
    };
    const handleRemoveElement = (elementId) => {
      if (!currentStep) return;
      const updatedElements = (currentStep.elements || []).filter((el) => el.id !== elementId);
      updateCurrentStep({ elements: updatedElements });
      if (activeElementId === elementId) {
        setActiveElementId(null);
      }
    };
    const stageRef = (0, import_element.useRef)(null);
    const stageCanvasRef = (0, import_element.useRef)(null);
    const stageScreenRef = (0, import_element.useRef)(null);
    const [imageRatio, setImageRatio] = (0, import_element.useState)(16 / 9);
    const stepsRef = (0, import_element.useRef)(steps);
    stepsRef.current = steps;
    const activeIndexRef = (0, import_element.useRef)(activeStepIndex);
    activeIndexRef.current = activeStepIndex;
    (0, import_element.useEffect)(() => {
      const url = currentStep?.imageUrl ? getResolvedImageUrl(currentStep.imageUrl) : "";
      if (url) {
        const img = new Image();
        img.onload = () => {
          if (img.naturalWidth && img.naturalHeight) {
            setImageRatio(img.naturalWidth / img.naturalHeight);
          }
        };
        img.src = url;
        if (img.complete && img.naturalWidth) {
          setImageRatio(img.naturalWidth / img.naturalHeight);
        }
      } else {
        setImageRatio(16 / 9);
      }
    }, [currentStep?.imageUrl]);
    const updateEditorStageDimensions = () => {
      if (!stageCanvasRef.current || !stageScreenRef.current) return;
      const canvasWidth = stageCanvasRef.current.clientWidth;
      const canvasHeight = stageCanvasRef.current.clientHeight;
      if (!canvasWidth || !canvasHeight) return;
      let ar = imageRatio || 16 / 9;
      let fitWidth = canvasWidth;
      let fitHeight = canvasWidth / ar;
      if (fitHeight > canvasHeight) {
        fitHeight = canvasHeight;
        fitWidth = canvasHeight * ar;
      }
      const wStr = `${Math.round(fitWidth * 100) / 100}px`;
      const hStr = `${Math.round(fitHeight * 100) / 100}px`;
      stageScreenRef.current.style.width = wStr;
      stageScreenRef.current.style.height = hStr;
      stageScreenRef.current.style.maxWidth = wStr;
      stageScreenRef.current.style.maxHeight = hStr;
      stageScreenRef.current.style.aspectRatio = `${ar}`;
    };
    (0, import_element.useEffect)(() => {
      updateEditorStageDimensions();
      let ro;
      if (typeof ResizeObserver !== "undefined" && stageCanvasRef.current) {
        ro = new ResizeObserver(() => {
          updateEditorStageDimensions();
        });
        ro.observe(stageCanvasRef.current);
      }
      const handleResize = () => updateEditorStageDimensions();
      window.addEventListener("resize", handleResize);
      return () => {
        if (ro) ro.disconnect();
        window.removeEventListener("resize", handleResize);
      };
    }, [activeStepIndex, currentStep?.imageUrl, imageRatio]);
    const handlePointerDownMove = (e, el) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();
      setActiveElementId(el.id);
      const target = e.currentTarget;
      const pointerId = e.pointerId;
      try {
        target.setPointerCapture(pointerId);
      } catch (err) {
      }
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const startX = e.clientX;
      const startY = e.clientY;
      const initLeft = el.left;
      const initTop = el.top;
      const elWidth = el.width;
      const elHeight = el.height;
      const onPointerMove = (moveEvent) => {
        if (moveEvent.pointerId !== pointerId) return;
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        const dx = (moveEvent.clientX - startX) / rect.width * 100;
        const dy = (moveEvent.clientY - startY) / rect.height * 100;
        const newLeft = Math.max(0, Math.min(100 - elWidth, initLeft + dx));
        const newTop = Math.max(0, Math.min(100 - elHeight, initTop + dy));
        const roundedLeft = Math.round(newLeft * 10) / 10;
        const roundedTop = Math.round(newTop * 10) / 10;
        const currentSteps = stepsRef.current || [];
        const currentActiveIdx = activeIndexRef.current;
        const currStep = currentSteps[currentActiveIdx];
        if (!currStep) return;
        const updatedElements = (currStep.elements || []).map((item) => {
          if (item.id === el.id) {
            return { ...item, left: roundedLeft, top: roundedTop };
          }
          return item;
        });
        const updatedSteps = currentSteps.map(
          (s, i) => i === currentActiveIdx ? { ...s, elements: updatedElements } : s
        );
        setAttributes({ steps: updatedSteps });
      };
      const onPointerUp = (upEvent) => {
        if (upEvent.pointerId !== pointerId) return;
        try {
          if (target.hasPointerCapture(pointerId)) {
            target.releasePointerCapture(pointerId);
          }
        } catch (err) {
        }
        target.removeEventListener("pointermove", onPointerMove);
        target.removeEventListener("pointerup", onPointerUp);
        target.removeEventListener("pointercancel", onPointerUp);
      };
      target.addEventListener("pointermove", onPointerMove);
      target.addEventListener("pointerup", onPointerUp);
      target.addEventListener("pointercancel", onPointerUp);
    };
    const handlePointerDownResize = (e, el, handle) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();
      setActiveElementId(el.id);
      const target = e.currentTarget;
      const pointerId = e.pointerId;
      try {
        target.setPointerCapture(pointerId);
      } catch (err) {
      }
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const startX = e.clientX;
      const startY = e.clientY;
      const initLeft = el.left;
      const initTop = el.top;
      const initW = el.width;
      const initH = el.height;
      const onPointerMove = (moveEvent) => {
        if (moveEvent.pointerId !== pointerId) return;
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        const dx = (moveEvent.clientX - startX) / rect.width * 100;
        const dy = (moveEvent.clientY - startY) / rect.height * 100;
        let newLeft = initLeft;
        let newTop = initTop;
        let newW = initW;
        let newH = initH;
        if (handle.includes("e")) {
          newW = Math.max(2, Math.min(100 - initLeft, initW + dx));
        } else if (handle.includes("w")) {
          const maxDx = initW - 2;
          const clampedDx = Math.max(-initLeft, Math.min(maxDx, dx));
          newLeft = initLeft + clampedDx;
          newW = initW - clampedDx;
        }
        if (handle.includes("s")) {
          newH = Math.max(2, Math.min(100 - initTop, initH + dy));
        } else if (handle.includes("n")) {
          const maxDy = initH - 2;
          const clampedDy = Math.max(-initTop, Math.min(maxDy, dy));
          newTop = initTop + clampedDy;
          newH = initH - clampedDy;
        }
        const roundedLeft = Math.round(newLeft * 10) / 10;
        const roundedTop = Math.round(newTop * 10) / 10;
        const roundedW = Math.round(newW * 10) / 10;
        const roundedH = Math.round(newH * 10) / 10;
        const currentSteps = stepsRef.current || [];
        const currentActiveIdx = activeIndexRef.current;
        const currStep = currentSteps[currentActiveIdx];
        if (!currStep) return;
        const updatedElements = (currStep.elements || []).map((item) => {
          if (item.id === el.id) {
            return {
              ...item,
              left: roundedLeft,
              top: roundedTop,
              width: roundedW,
              height: roundedH
            };
          }
          return item;
        });
        const updatedSteps = currentSteps.map(
          (s, i) => i === currentActiveIdx ? { ...s, elements: updatedElements } : s
        );
        setAttributes({ steps: updatedSteps });
      };
      const onPointerUp = (upEvent) => {
        if (upEvent.pointerId !== pointerId) return;
        try {
          if (target.hasPointerCapture(pointerId)) {
            target.releasePointerCapture(pointerId);
          }
        } catch (err) {
        }
        target.removeEventListener("pointermove", onPointerMove);
        target.removeEventListener("pointerup", onPointerUp);
        target.removeEventListener("pointercancel", onPointerUp);
      };
      target.addEventListener("pointermove", onPointerMove);
      target.addEventListener("pointerup", onPointerUp);
      target.addEventListener("pointercancel", onPointerUp);
    };
    const blockProps = (0, import_block_editor.useBlockProps)({
      className: "wp-block-custom-simulador-software"
    });
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_block_editor.InspectorControls, null, /* @__PURE__ */ React.createElement(import_components.PanelBody, { title: (0, import_i18n.__)("Configura\xE7\xF5es Gerais do Simulador", "simulador-software-abnt"), initialOpen: false }, /* @__PURE__ */ React.createElement(
      import_components.TextControl,
      {
        label: (0, import_i18n.__)("T\xEDtulo do Simulador", "simulador-software-abnt"),
        value: simulatorTitle,
        onChange: (val) => setAttributes({ simulatorTitle: val })
      }
    ), /* @__PURE__ */ React.createElement(
      import_components.ToggleControl,
      {
        label: (0, import_i18n.__)("Exibir Barra de Progresso", "simulador-software-abnt"),
        checked: showProgressBar,
        onChange: (val) => setAttributes({ showProgressBar: val })
      }
    ), /* @__PURE__ */ React.createElement(
      import_components.ToggleControl,
      {
        label: (0, import_i18n.__)("Exibir Bot\xE3o de Reiniciar", "simulador-software-abnt"),
        checked: showRestartButton,
        onChange: (val) => setAttributes({ showRestartButton: val })
      }
    ), /* @__PURE__ */ React.createElement(
      import_components.ToggleControl,
      {
        label: (0, import_i18n.__)("Exibir Indicador de Passo", "simulador-software-abnt"),
        checked: showStepIndicator,
        onChange: (val) => setAttributes({ showStepIndicator: val })
      }
    ), /* @__PURE__ */ React.createElement(
      import_components.ToggleControl,
      {
        label: (0, import_i18n.__)("Destacar \xC1reas com Pulso Sutil", "simulador-software-abnt"),
        checked: highlightHints,
        onChange: (val) => setAttributes({ highlightHints: val })
      }
    ), /* @__PURE__ */ React.createElement(
      import_components.TextareaControl,
      {
        label: (0, import_i18n.__)("Mensagem de Sucesso na Conclus\xE3o", "simulador-software-abnt"),
        value: customSuccessMessage,
        onChange: (val) => setAttributes({ customSuccessMessage: val })
      }
    ), /* @__PURE__ */ React.createElement(
      import_components.Button,
      {
        variant: "secondary",
        isDestructive: true,
        onClick: handleLoadDefaultScenario,
        style: { width: "100%", marginTop: "10px" }
      },
      (0, import_i18n.__)("Restaurar Cen\xE1rio Padr\xE3o (ABNT)", "simulador-software-abnt")
    )), /* @__PURE__ */ React.createElement(import_components.PanelBody, { title: (0, import_i18n.__)("Gerenciador de Passos (Slides)", "simulador-software-abnt"), initialOpen: true }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: "14px" } }, steps && steps.map((step, idx) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: step.id || idx,
        className: `sim-inspector-step-item ${idx === activeStepIndex ? "is-active-step" : ""}`,
        onClick: () => setActiveStepIndex(idx)
      },
      /* @__PURE__ */ React.createElement("div", { className: "sim-step-info" }, /* @__PURE__ */ React.createElement("span", null, idx + 1, "."), /* @__PURE__ */ React.createElement("span", null, step.title || `Passo ${idx + 1}`)),
      /* @__PURE__ */ React.createElement("div", { className: "sim-step-actions", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          icon: "arrow-up-alt2",
          isSmall: true,
          disabled: idx === 0,
          onClick: () => handleMoveStep(idx, -1),
          title: (0, import_i18n.__)("Subir", "simulador-software-abnt")
        }
      ), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          icon: "arrow-down-alt2",
          isSmall: true,
          disabled: idx === steps.length - 1,
          onClick: () => handleMoveStep(idx, 1),
          title: (0, import_i18n.__)("Descer", "simulador-software-abnt")
        }
      ), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          icon: "admin-page",
          isSmall: true,
          onClick: () => handleDuplicateStep(idx),
          title: (0, import_i18n.__)("Duplicar", "simulador-software-abnt")
        }
      ), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          icon: "trash",
          isSmall: true,
          isDestructive: true,
          onClick: () => handleRemoveStep(idx),
          title: (0, import_i18n.__)("Remover", "simulador-software-abnt")
        }
      ))
    ))), /* @__PURE__ */ React.createElement(
      import_components.Button,
      {
        variant: "primary",
        onClick: handleAddStep,
        icon: "plus",
        style: { width: "100%" }
      },
      (0, import_i18n.__)("Adicionar Novo Passo", "simulador-software-abnt")
    )), currentStep && /* @__PURE__ */ React.createElement(
      import_components.PanelBody,
      {
        title: `${(0, import_i18n.__)("Configurar Passo", "simulador-software-abnt")} ${activeStepIndex + 1}: ${currentStep.title || ""}`,
        initialOpen: true
      },
      /* @__PURE__ */ React.createElement(
        import_components.TextControl,
        {
          label: (0, import_i18n.__)("T\xEDtulo do Passo", "simulador-software-abnt"),
          value: currentStep.title || "",
          onChange: (val) => updateCurrentStep({ title: val })
        }
      ),
      /* @__PURE__ */ React.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" } }, (0, import_i18n.__)("Imagem de Fundo (Print do Software)", "simulador-software-abnt")), currentStep.imageUrl ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: getResolvedImageUrl(currentStep.imageUrl),
          alt: currentStep.title,
          style: { width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px", border: "1px solid #cbd5e1" }
        }
      ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "8px", marginTop: "8px" } }, /* @__PURE__ */ React.createElement(import_block_editor.MediaUploadCheck, null, /* @__PURE__ */ React.createElement(
        import_block_editor.MediaUpload,
        {
          onSelect: (media) => updateCurrentStep({ imageUrl: media.url, imageId: media.id }),
          allowedTypes: ["image"],
          value: currentStep.imageId,
          render: ({ open }) => /* @__PURE__ */ React.createElement(import_components.Button, { variant: "secondary", isSmall: true, onClick: open }, (0, import_i18n.__)("Alterar Imagem", "simulador-software-abnt"))
        }
      )), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "link",
          isDestructive: true,
          isSmall: true,
          onClick: () => updateCurrentStep({ imageUrl: "", imageId: null })
        },
        (0, import_i18n.__)("Remover", "simulador-software-abnt")
      ))) : /* @__PURE__ */ React.createElement(import_block_editor.MediaUploadCheck, null, /* @__PURE__ */ React.createElement(
        import_block_editor.MediaUpload,
        {
          onSelect: (media) => updateCurrentStep({ imageUrl: media.url, imageId: media.id }),
          allowedTypes: ["image"],
          value: currentStep.imageId,
          render: ({ open }) => /* @__PURE__ */ React.createElement(import_components.Button, { variant: "secondary", onClick: open, icon: "upload", style: { width: "100%" } }, (0, import_i18n.__)("Selecionar Imagem da Biblioteca", "simulador-software-abnt"))
        }
      ))),
      /* @__PURE__ */ React.createElement(
        import_components.TextareaControl,
        {
          label: (0, import_i18n.__)("Texto de Instru\xE7\xE3o para o Aluno", "simulador-software-abnt"),
          value: currentStep.instruction || "",
          onChange: (val) => updateCurrentStep({ instruction: val }),
          rows: 3,
          help: (0, import_i18n.__)("Exibido no rodap\xE9 flutuante da simula\xE7\xE3o.", "simulador-software-abnt")
        }
      )
    ), currentStep && /* @__PURE__ */ React.createElement(
      import_components.PanelBody,
      {
        title: `${(0, import_i18n.__)("Camadas Interativas do Passo", "simulador-software-abnt")} (${(currentStep.elements || []).length})`,
        initialOpen: true
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "14px" } }, /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "secondary",
          icon: "admin-links",
          onClick: () => handleAddElement("click"),
          style: { padding: "6px 4px", fontSize: "11px", display: "flex", justifyContent: "center" }
        },
        (0, import_i18n.__)("+ Clique", "simulador-software-abnt")
      ), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "secondary",
          icon: "edit",
          onClick: () => handleAddElement("input"),
          style: { padding: "6px 4px", fontSize: "11px", display: "flex", justifyContent: "center" }
        },
        (0, import_i18n.__)("+ Input", "simulador-software-abnt")
      ), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "secondary",
          icon: "move",
          onClick: () => handleAddElement("drag"),
          style: { padding: "6px 4px", fontSize: "11px", display: "flex", justifyContent: "center" }
        },
        (0, import_i18n.__)("+ Drag & Drop", "simulador-software-abnt")
      )),
      (currentStep.elements || []).map((el, elIdx) => {
        const isSelected = el.id === activeElementId;
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: el.id || elIdx,
            className: `sim-inspector-element-card ${isSelected ? "is-active-element" : ""}`,
            onClick: () => setActiveElementId(el.id)
          },
          /* @__PURE__ */ React.createElement("div", { className: "sim-element-header" }, /* @__PURE__ */ React.createElement("strong", null, el.type === "click" ? "\u{1F3AF} Clique: " : el.type === "drag" ? "\u270B Drag & Drop: " : "\u2328\uFE0F Input: ", el.label || `Elemento ${elIdx + 1}`), /* @__PURE__ */ React.createElement(
            import_components.Button,
            {
              icon: "trash",
              isSmall: true,
              isDestructive: true,
              onClick: (e) => {
                e.stopPropagation();
                handleRemoveElement(el.id);
              },
              title: (0, import_i18n.__)("Remover Elemento", "simulador-software-abnt")
            }
          )),
          /* @__PURE__ */ React.createElement(
            import_components.TextControl,
            {
              label: (0, import_i18n.__)("R\xF3tulo / Identificador", "simulador-software-abnt"),
              value: el.label || "",
              onChange: (val) => handleUpdateElement(el.id, { label: val })
            }
          ),
          /* @__PURE__ */ React.createElement(
            import_components.SelectControl,
            {
              label: (0, import_i18n.__)("Tipo de Intera\xE7\xE3o", "simulador-software-abnt"),
              value: el.type,
              options: [
                { label: (0, import_i18n.__)("\xC1rea de Clique (Hotspot)", "simulador-software-abnt"), value: "click" },
                { label: (0, import_i18n.__)("Caixa de Texto (Input com Enter)", "simulador-software-abnt"), value: "input" },
                { label: (0, import_i18n.__)("Arrastar e Soltar (Drag and Drop)", "simulador-software-abnt"), value: "drag" }
              ],
              onChange: (val) => handleUpdateElement(el.id, { type: val })
            }
          ),
          el.type === "drag" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
            import_components.TextControl,
            {
              label: (0, import_i18n.__)("Texto do Item Arrast\xE1vel", "simulador-software-abnt"),
              value: el.dragText || "",
              placeholder: (0, import_i18n.__)("Ex: Arraste at\xE9 o destino", "simulador-software-abnt"),
              onChange: (val) => handleUpdateElement(el.id, { dragText: val })
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.TextControl,
            {
              label: (0, import_i18n.__)("Texto da \xC1rea de Destino (Drop)", "simulador-software-abnt"),
              value: el.targetLabel || "",
              placeholder: (0, import_i18n.__)("Ex: Solte Aqui", "simulador-software-abnt"),
              onChange: (val) => handleUpdateElement(el.id, { targetLabel: val })
            }
          ), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "10px", padding: "10px", background: "#f5f3ff", borderRadius: "6px", border: "1px solid #ddd6fe" } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#6d28d9", display: "block", marginBottom: "8px" } }, (0, import_i18n.__)("\u{1F3AF} \xC1rea de Destino do Drop (%)", "simulador-software-abnt")), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Destino Topo (Top %)", "simulador-software-abnt"),
              value: el.targetTop !== void 0 ? el.targetTop : el.top,
              onChange: (val) => handleUpdateElement(el.id, { targetTop: Number(val) }),
              min: 0,
              max: 100,
              step: 0.1
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Destino Esquerda (Left %)", "simulador-software-abnt"),
              value: el.targetLeft !== void 0 ? el.targetLeft : el.left + 25,
              onChange: (val) => handleUpdateElement(el.id, { targetLeft: Number(val) }),
              min: 0,
              max: 100,
              step: 0.1
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Destino Largura (Width %)", "simulador-software-abnt"),
              value: el.targetWidth !== void 0 ? el.targetWidth : 16,
              onChange: (val) => handleUpdateElement(el.id, { targetWidth: Number(val) }),
              min: 1,
              max: 100,
              step: 0.1
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Destino Altura (Height %)", "simulador-software-abnt"),
              value: el.targetHeight !== void 0 ? el.targetHeight : 12,
              onChange: (val) => handleUpdateElement(el.id, { targetHeight: Number(val) }),
              min: 1,
              max: 100,
              step: 0.1
            }
          ))),
          el.type === "input" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
            import_components.TextControl,
            {
              label: (0, import_i18n.__)("Valor Esperado (Correto)", "simulador-software-abnt"),
              value: el.expectedValue || "",
              onChange: (val) => handleUpdateElement(el.id, { expectedValue: val }),
              help: (0, import_i18n.__)('Ex: "Word", "3", "2". A verifica\xE7\xE3o n\xE3o diferencia mai\xFAsculas/min\xFAsculas.', "simulador-software-abnt")
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.TextControl,
            {
              label: (0, import_i18n.__)("Texto do Placeholder", "simulador-software-abnt"),
              value: el.placeholder || "",
              onChange: (val) => handleUpdateElement(el.id, { placeholder: val })
            }
          )),
          /* @__PURE__ */ React.createElement("div", { style: { marginTop: "10px" } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: "11px", fontWeight: 600, textTransform: "uppercase" } }, (0, import_i18n.__)("Coordenadas Responsivas (%)", "simulador-software-abnt")), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Topo (Top %)", "simulador-software-abnt"),
              value: el.top,
              onChange: (val) => handleUpdateElement(el.id, { top: Number(val) }),
              min: 0,
              max: 100,
              step: 0.1
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Esquerda (Left %)", "simulador-software-abnt"),
              value: el.left,
              onChange: (val) => handleUpdateElement(el.id, { left: Number(val) }),
              min: 0,
              max: 100,
              step: 0.1
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Largura (Width %)", "simulador-software-abnt"),
              value: el.width,
              onChange: (val) => handleUpdateElement(el.id, { width: Number(val) }),
              min: 1,
              max: 100,
              step: 0.1
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Altura (Height %)", "simulador-software-abnt"),
              value: el.height,
              onChange: (val) => handleUpdateElement(el.id, { height: Number(val) }),
              min: 1,
              max: 100,
              step: 0.1
            }
          )),
          /* @__PURE__ */ React.createElement(
            import_components.SelectControl,
            {
              label: (0, import_i18n.__)("Ao Acertar, Avan\xE7ar Para", "simulador-software-abnt"),
              value: el.targetStepIndex !== void 0 ? el.targetStepIndex : activeStepIndex + 1,
              options: [
                ...steps.map((st, i) => ({
                  label: `${(0, import_i18n.__)("Passo", "simulador-software-abnt")} ${i + 1}: ${st.title || ""}`,
                  value: i
                })),
                { label: (0, import_i18n.__)("Concluir Simula\xE7\xE3o (Tela Final)", "simulador-software-abnt"), value: -1 }
              ],
              onChange: (val) => handleUpdateElement(el.id, { targetStepIndex: Number(val) })
            }
          )
        );
      })
    )), /* @__PURE__ */ React.createElement("div", { ...blockProps }, /* @__PURE__ */ React.createElement("div", { className: "sim-editor-container is-selected" }, /* @__PURE__ */ React.createElement("div", { className: "sim-editor-steps-nav" }, /* @__PURE__ */ React.createElement("span", { className: "sim-nav-label" }, (0, import_i18n.__)("Passos:", "simulador-software-abnt")), steps && steps.map((step, idx) => /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        key: step.id || idx,
        className: `sim-nav-btn ${idx === activeStepIndex ? "is-active" : ""}`,
        onClick: () => {
          setActiveStepIndex(idx);
          setActiveElementId(null);
        }
      },
      /* @__PURE__ */ React.createElement("span", null, idx + 1, ". ", step.title || `Passo ${idx + 1}`)
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "sim-nav-add-btn",
        onClick: handleAddStep,
        title: (0, import_i18n.__)("Adicionar Passo", "simulador-software-abnt")
      },
      "+ ",
      (0, import_i18n.__)("Novo", "simulador-software-abnt")
    )), currentStep ? /* @__PURE__ */ React.createElement("div", { className: "sim-player-wrapper" }, /* @__PURE__ */ React.createElement("div", { className: "sim-header-bar" }, /* @__PURE__ */ React.createElement("div", { className: "sim-title-group" }, /* @__PURE__ */ React.createElement("div", { className: "sim-window-dots" }, /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null), /* @__PURE__ */ React.createElement("span", null)), /* @__PURE__ */ React.createElement("span", { className: "sim-header-title" }, simulatorTitle)), /* @__PURE__ */ React.createElement("div", { className: "sim-header-controls" }, /* @__PURE__ */ React.createElement("span", { className: "sim-step-badge" }, (0, import_i18n.__)("Passo", "simulador-software-abnt"), " ", activeStepIndex + 1, " / ", steps.length))), /* @__PURE__ */ React.createElement("div", { className: "sim-progress-track" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "sim-progress-fill",
        style: { width: `${(activeStepIndex + 1) / steps.length * 100}%` }
      }
    )), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "sim-stage-canvas",
        ref: stageCanvasRef,
        style: {
          backgroundImage: currentStep.imageUrl ? `url("${getResolvedImageUrl(currentStep.imageUrl)}")` : "none",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }
      },
      currentStep.imageUrl ? /* @__PURE__ */ React.createElement("div", { className: "sim-stage-screen", ref: stageScreenRef }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "sim-elements-layer",
          ref: stageRef,
          onClick: () => setActiveElementId(null)
        },
        (currentStep.elements || []).map((el, elIdx) => {
          if (el.type !== "drag") return null;
          const isSelected = el.id === activeElementId;
          const tTop = el.targetTop !== void 0 ? el.targetTop : el.top;
          const tLeft = el.targetLeft !== void 0 ? el.targetLeft : el.left + 25;
          const tWidth = el.targetWidth !== void 0 ? el.targetWidth : 16;
          const tHeight = el.targetHeight !== void 0 ? el.targetHeight : 12;
          return /* @__PURE__ */ React.createElement(
            "div",
            {
              key: `dropzone-${el.id || elIdx}`,
              className: `sim-editor-drop-zone ${isSelected ? "is-zone-selected" : ""}`,
              style: {
                top: `${tTop}%`,
                left: `${tLeft}%`,
                width: `${tWidth}%`,
                height: `${tHeight}%`
              },
              title: (0, import_i18n.__)("\xC1rea de Destino (Drop Zone)", "simulador-software-abnt")
            },
            /* @__PURE__ */ React.createElement("span", { className: "sim-drop-zone-badge" }, "\u{1F4E5} ", el.targetLabel || "Solte Aqui")
          );
        }),
        (currentStep.elements || []).map((el, elIdx) => {
          const isSelected = el.id === activeElementId;
          return /* @__PURE__ */ React.createElement(
            "div",
            {
              key: el.id || elIdx,
              className: `sim-editor-overlay-element type-${el.type} ${isSelected ? "is-element-selected" : ""}`,
              style: {
                top: `${el.top}%`,
                left: `${el.left}%`,
                width: `${el.width}%`,
                height: `${el.height}%`
              },
              onPointerDown: (e) => handlePointerDownMove(e, el),
              onClick: (e) => {
                e.stopPropagation();
                setActiveElementId(el.id);
              },
              title: (0, import_i18n.__)("Arraste para mover. Use os pontos ao redor para redimensionar.", "simulador-software-abnt")
            },
            /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-element-move-handle",
                onPointerDown: (e) => handlePointerDownMove(e, el),
                title: (0, import_i18n.__)("Clique e arraste para posicionar", "simulador-software-abnt")
              },
              /* @__PURE__ */ React.createElement(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  width: "14",
                  height: "14",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("polyline", { points: "5 9 2 12 5 15" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "9 5 12 2 15 5" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "15 19 12 22 9 19" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "19 9 22 12 19 15" }),
                /* @__PURE__ */ React.createElement("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
                /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "2", x2: "12", y2: "22" })
              ),
              /* @__PURE__ */ React.createElement("span", { className: "sim-move-text" }, el.type === "click" ? "\u{1F3AF} Mover Clique" : el.type === "drag" ? "\u270B Mover Drag" : "\u2328\uFE0F Mover Input")
            ),
            /* @__PURE__ */ React.createElement("span", { className: "sim-element-badge" }, el.type === "click" ? "\u{1F3AF} " : el.type === "drag" ? "\u270B " : "\u2328\uFE0F ", el.label || `${el.type} (${el.left.toFixed(1)}%, ${el.top.toFixed(1)}%)`),
            isSelected && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "sim-coords-badge" }, el.type === "click" ? "\u{1F3AF} Clique" : el.type === "drag" ? "\u270B Drag" : "\u2328\uFE0F Input", ": X: ", el.left.toFixed(1), "% Y: ", el.top.toFixed(1), "% | L: ", el.width.toFixed(1), "% A: ", el.height.toFixed(1), "%"), /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-resize-handle handle-nw",
                onPointerDown: (e) => handlePointerDownResize(e, el, "nw"),
                title: (0, import_i18n.__)("Redimensionar (Noroeste)", "simulador-software-abnt")
              }
            ), /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-resize-handle handle-n",
                onPointerDown: (e) => handlePointerDownResize(e, el, "n"),
                title: (0, import_i18n.__)("Redimensionar (Norte)", "simulador-software-abnt")
              }
            ), /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-resize-handle handle-ne",
                onPointerDown: (e) => handlePointerDownResize(e, el, "ne"),
                title: (0, import_i18n.__)("Redimensionar (Nordeste)", "simulador-software-abnt")
              }
            ), /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-resize-handle handle-e",
                onPointerDown: (e) => handlePointerDownResize(e, el, "e"),
                title: (0, import_i18n.__)("Redimensionar (Leste)", "simulador-software-abnt")
              }
            ), /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-resize-handle handle-se",
                onPointerDown: (e) => handlePointerDownResize(e, el, "se"),
                title: (0, import_i18n.__)("Redimensionar (Sudeste)", "simulador-software-abnt")
              }
            ), /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-resize-handle handle-s",
                onPointerDown: (e) => handlePointerDownResize(e, el, "s"),
                title: (0, import_i18n.__)("Redimensionar (Sul)", "simulador-software-abnt")
              }
            ), /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-resize-handle handle-sw",
                onPointerDown: (e) => handlePointerDownResize(e, el, "sw"),
                title: (0, import_i18n.__)("Redimensionar (Sudoeste)", "simulador-software-abnt")
              }
            ), /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-resize-handle handle-w",
                onPointerDown: (e) => handlePointerDownResize(e, el, "w"),
                title: (0, import_i18n.__)("Redimensionar (Oeste)", "simulador-software-abnt")
              }
            ))
          );
        })
      )) : /* @__PURE__ */ React.createElement("div", { style: { padding: "60px 20px", textAlign: "center", color: "#94a3b8" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: "16px", fontWeight: 600 } }, (0, import_i18n.__)("Nenhuma imagem selecionada para este passo.", "simulador-software-abnt")), /* @__PURE__ */ React.createElement(import_block_editor.MediaUploadCheck, null, /* @__PURE__ */ React.createElement(
        import_block_editor.MediaUpload,
        {
          onSelect: (media) => updateCurrentStep({ imageUrl: media.url, imageId: media.id }),
          allowedTypes: ["image"],
          render: ({ open }) => /* @__PURE__ */ React.createElement(import_components.Button, { variant: "primary", onClick: open }, (0, import_i18n.__)("Carregar Imagem de Fundo", "simulador-software-abnt"))
        }
      )))
    ), /* @__PURE__ */ React.createElement("div", { className: "sim-instruction-bar" }, /* @__PURE__ */ React.createElement("div", { className: "sim-instruction-content" }, /* @__PURE__ */ React.createElement("div", { className: "sim-instruction-icon" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "16", x2: "12", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" }))), /* @__PURE__ */ React.createElement("p", { className: "sim-instruction-text" }, currentStep.instruction || (0, import_i18n.__)("Insira uma instru\xE7\xE3o para orientar o aluno.", "simulador-software-abnt"))))) : /* @__PURE__ */ React.createElement("div", { className: "sim-editor-empty-state" }, /* @__PURE__ */ React.createElement("h3", null, (0, import_i18n.__)("Nenhum passo criado ainda.", "simulador-software-abnt")), /* @__PURE__ */ React.createElement(import_components.Button, { variant: "primary", onClick: handleLoadDefaultScenario }, (0, import_i18n.__)("Carregar Cen\xE1rio Padr\xE3o (ABNT Windows 11)", "simulador-software-abnt"))))));
  }

  // src/save.js
  var import_block_editor2 = __toESM(require_block_editor());
  function save({ attributes }) {
    const {
      simulatorTitle,
      steps,
      showProgressBar,
      showRestartButton,
      showStepIndicator,
      highlightHints,
      allowClickAnywhereHint,
      customSuccessMessage
    } = attributes;
    const configData = {
      simulatorTitle,
      steps: steps || [],
      showProgressBar: showProgressBar !== false,
      showRestartButton: showRestartButton !== false,
      showStepIndicator: showStepIndicator !== false,
      highlightHints: highlightHints !== false,
      allowClickAnywhereHint: allowClickAnywhereHint !== false,
      customSuccessMessage: customSuccessMessage || "Parab\xE9ns! Voc\xEA completou a simula\xE7\xE3o com sucesso."
    };
    const blockProps = import_block_editor2.useBlockProps.save({
      className: "wp-block-custom-simulador-software"
    });
    return /* @__PURE__ */ React.createElement("div", { ...blockProps }, /* @__PURE__ */ React.createElement("div", { className: "sim-player-wrapper", "data-initialized": "false" }, /* @__PURE__ */ React.createElement(
      "script",
      {
        type: "application/json",
        className: "sim-data-config",
        dangerouslySetInnerHTML: { __html: JSON.stringify(configData) }
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "sim-noscript-fallback", style: { padding: "30px", textAlign: "center", background: "#0f172a", color: "#ffffff", borderRadius: "12px" } }, /* @__PURE__ */ React.createElement("h3", null, simulatorTitle), /* @__PURE__ */ React.createElement("p", null, "Carregando simulador interativo..."))));
  }

  // src/index.js
  (0, import_blocks.registerBlockType)(block_default.name, {
    ...block_default,
    edit: Edit,
    save
  });
})();
