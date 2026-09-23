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
    version: "1.2.0",
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
      imageUrl: "assets/step1-windows11-desktop.png",
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
      imageUrl: "assets/step2-windows11-startmenu.png",
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
      imageUrl: "assets/step3-word-document.png",
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
      imageUrl: "assets/step4-word-layout-ribbon.png",
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
      imageUrl: "assets/step5-word-margins-modal.png",
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
  var RESIZE_HANDLES_DEF = [
    { dir: "nw", title: "Noroeste", style: { top: 0, left: 0, right: "auto", bottom: "auto", transform: "translate(-50%, -50%)", cursor: "nwse-resize" } },
    { dir: "n", title: "Norte", style: { top: 0, left: "50%", right: "auto", bottom: "auto", transform: "translate(-50%, -50%)", cursor: "ns-resize" } },
    { dir: "ne", title: "Nordeste", style: { top: 0, right: 0, left: "auto", bottom: "auto", transform: "translate(50%, -50%)", cursor: "nesw-resize" } },
    { dir: "e", title: "Leste", style: { top: "50%", right: 0, left: "auto", bottom: "auto", transform: "translate(50%, -50%)", cursor: "ew-resize" } },
    { dir: "se", title: "Sudeste", style: { bottom: 0, right: 0, top: "auto", left: "auto", transform: "translate(50%, 50%)", cursor: "nwse-resize" } },
    { dir: "s", title: "Sul", style: { bottom: 0, left: "50%", right: "auto", top: "auto", transform: "translate(-50%, 50%)", cursor: "ns-resize" } },
    { dir: "sw", title: "Sudoeste", style: { bottom: 0, left: 0, right: "auto", top: "auto", transform: "translate(-50%, 50%)", cursor: "nesw-resize" } },
    { dir: "w", title: "Oeste", style: { top: "50%", left: 0, right: "auto", bottom: "auto", transform: "translate(-50%, -50%)", cursor: "ew-resize" } }
  ];
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
      if (type === "image") {
        newEl = {
          ...newEl,
          top: 30,
          left: 30,
          width: 18,
          height: 18,
          label: "Nova Imagem Sobreposta",
          imageUrl: "",
          imageId: null,
          animationType: "appear",
          animationDuration: 1.5,
          animationDelay: 0.2,
          animationIteration: "once",
          targetTop: 30,
          targetLeft: 60
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
    const [previewAnimationId, setPreviewAnimationId] = (0, import_element.useState)(null);
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
      if (!stageCanvasRef.current) return;
      const currentRatio = imageRatio || 16 / 9;
      stageCanvasRef.current.style.aspectRatio = `${currentRatio}`;
      stageCanvasRef.current.style.width = "100%";
      const bgImg = stageCanvasRef.current.querySelector(".sim-bg-image");
      if (bgImg) {
        bgImg.style.setProperty("position", "absolute", "important");
        bgImg.style.setProperty("top", "0px", "important");
        bgImg.style.setProperty("left", "0px", "important");
        bgImg.style.setProperty("right", "0px", "important");
        bgImg.style.setProperty("bottom", "0px", "important");
        bgImg.style.setProperty("width", "100%", "important");
        bgImg.style.setProperty("height", "100%", "important");
        bgImg.style.setProperty("min-width", "100%", "important");
        bgImg.style.setProperty("min-height", "100%", "important");
        bgImg.style.setProperty("max-width", "none", "important");
        bgImg.style.setProperty("max-height", "none", "important");
        bgImg.style.setProperty("object-fit", "fill", "important");
        bgImg.style.setProperty("object-position", "0 0", "important");
        bgImg.style.setProperty("display", "block", "important");
        bgImg.style.setProperty("margin", "0px", "important");
        bgImg.style.setProperty("padding", "0px", "important");
        bgImg.style.setProperty("z-index", "1", "important");
      }
      if (stageRef.current) {
        stageRef.current.style.setProperty("position", "absolute", "important");
        stageRef.current.style.setProperty("top", "0px", "important");
        stageRef.current.style.setProperty("left", "0px", "important");
        stageRef.current.style.setProperty("right", "0px", "important");
        stageRef.current.style.setProperty("bottom", "0px", "important");
        stageRef.current.style.setProperty("width", "100%", "important");
        stageRef.current.style.setProperty("height", "100%", "important");
        stageRef.current.style.setProperty("min-width", "100%", "important");
        stageRef.current.style.setProperty("min-height", "100%", "important");
        stageRef.current.style.setProperty("z-index", "3", "important");
        stageRef.current.style.setProperty("pointer-events", "auto", "important");
      }
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
      if (e.button !== 0 && e.buttons !== 1 && e.button !== void 0) return;
      e.stopPropagation();
      e.preventDefault();
      setActiveElementId(el.id);
      const targetEl = stageRef.current || stageCanvasRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const stageWidth = rect.width > 0 ? rect.width : targetEl.offsetWidth || 800;
      const stageHeight = rect.height > 0 ? rect.height : targetEl.offsetHeight || stageWidth / (imageRatio || 16 / 9);
      if (!stageWidth || !stageHeight) return;
      const startX = e.clientX !== void 0 ? e.clientX : e.touches?.[0]?.clientX || 0;
      const startY = e.clientY !== void 0 ? e.clientY : e.touches?.[0]?.clientY || 0;
      const initLeft = el.left;
      const initTop = el.top;
      const elWidth = el.width;
      const elHeight = el.height;
      const doc = e.currentTarget?.ownerDocument || document;
      const win = doc.defaultView || window;
      let rafId = null;
      const onPointerMove = (moveEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        const clientX = moveEvent.clientX !== void 0 ? moveEvent.clientX : moveEvent.touches?.[0]?.clientX || 0;
        const clientY = moveEvent.clientY !== void 0 ? moveEvent.clientY : moveEvent.touches?.[0]?.clientY || 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const dx = (clientX - startX) / stageWidth * 100;
          const dy = (clientY - startY) / stageHeight * 100;
          const newLeft = Math.max(0, Math.min(100, initLeft + dx));
          const newTop = Math.max(0, Math.min(100, initTop + dy));
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
        });
      };
      const onPointerUp = (upEvent) => {
        if (upEvent && upEvent.preventDefault) upEvent.preventDefault();
        if (rafId) cancelAnimationFrame(rafId);
        doc.removeEventListener("pointermove", onPointerMove);
        doc.removeEventListener("pointerup", onPointerUp);
        doc.removeEventListener("mousemove", onPointerMove);
        doc.removeEventListener("mouseup", onPointerUp);
        win.removeEventListener("pointermove", onPointerMove);
        win.removeEventListener("pointerup", onPointerUp);
        win.removeEventListener("mousemove", onPointerMove);
        win.removeEventListener("mouseup", onPointerUp);
      };
      doc.addEventListener("pointermove", onPointerMove, { passive: false });
      doc.addEventListener("pointerup", onPointerUp);
      doc.addEventListener("mousemove", onPointerMove, { passive: false });
      doc.addEventListener("mouseup", onPointerUp);
      win.addEventListener("pointermove", onPointerMove, { passive: false });
      win.addEventListener("pointerup", onPointerUp);
      win.addEventListener("mousemove", onPointerMove, { passive: false });
      win.addEventListener("mouseup", onPointerUp);
    };
    const handlePointerDownResize = (e, el, handle) => {
      if (e.button !== 0 && e.buttons !== 1 && e.button !== void 0) return;
      e.stopPropagation();
      e.preventDefault();
      setActiveElementId(el.id);
      const targetEl = stageRef.current || stageCanvasRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const stageWidth = rect.width > 0 ? rect.width : targetEl.offsetWidth || 800;
      const stageHeight = rect.height > 0 ? rect.height : targetEl.offsetHeight || stageWidth / (imageRatio || 16 / 9);
      if (!stageWidth || !stageHeight) return;
      const startX = e.clientX !== void 0 ? e.clientX : e.touches?.[0]?.clientX || 0;
      const startY = e.clientY !== void 0 ? e.clientY : e.touches?.[0]?.clientY || 0;
      const initLeft = el.left;
      const initTop = el.top;
      const initW = el.width;
      const initH = el.height;
      const doc = e.currentTarget?.ownerDocument || document;
      const win = doc.defaultView || window;
      let rafId = null;
      const onPointerMove = (moveEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        const clientX = moveEvent.clientX !== void 0 ? moveEvent.clientX : moveEvent.touches?.[0]?.clientX || 0;
        const clientY = moveEvent.clientY !== void 0 ? moveEvent.clientY : moveEvent.touches?.[0]?.clientY || 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const dx = (clientX - startX) / stageWidth * 100;
          const dy = (clientY - startY) / stageHeight * 100;
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
        });
      };
      const onPointerUp = (upEvent) => {
        if (upEvent && upEvent.preventDefault) upEvent.preventDefault();
        if (rafId) cancelAnimationFrame(rafId);
        doc.removeEventListener("pointermove", onPointerMove);
        doc.removeEventListener("pointerup", onPointerUp);
        doc.removeEventListener("mousemove", onPointerMove);
        doc.removeEventListener("mouseup", onPointerUp);
        win.removeEventListener("pointermove", onPointerMove);
        win.removeEventListener("pointerup", onPointerUp);
        win.removeEventListener("mousemove", onPointerMove);
        win.removeEventListener("mouseup", onPointerUp);
      };
      doc.addEventListener("pointermove", onPointerMove, { passive: false });
      doc.addEventListener("pointerup", onPointerUp);
      doc.addEventListener("mousemove", onPointerMove, { passive: false });
      doc.addEventListener("mouseup", onPointerUp);
      win.addEventListener("pointermove", onPointerMove, { passive: false });
      win.addEventListener("pointerup", onPointerUp);
      win.addEventListener("mousemove", onPointerMove, { passive: false });
      win.addEventListener("mouseup", onPointerUp);
    };
    const handlePointerDownMoveTarget = (e, el) => {
      if (e.button !== 0 && e.buttons !== 1 && e.button !== void 0) return;
      e.stopPropagation();
      e.preventDefault();
      setActiveElementId(el.id);
      const targetEl = stageRef.current || stageCanvasRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const stageWidth = rect.width > 0 ? rect.width : targetEl.offsetWidth || 800;
      const stageHeight = rect.height > 0 ? rect.height : targetEl.offsetHeight || stageWidth / (imageRatio || 16 / 9);
      if (!stageWidth || !stageHeight) return;
      const startX = e.clientX !== void 0 ? e.clientX : e.touches?.[0]?.clientX || 0;
      const startY = e.clientY !== void 0 ? e.clientY : e.touches?.[0]?.clientY || 0;
      const initLeft = el.targetLeft !== void 0 ? el.targetLeft : el.left + 25;
      const initTop = el.targetTop !== void 0 ? el.targetTop : el.top;
      const elWidth = el.targetWidth !== void 0 ? el.targetWidth : 16;
      const elHeight = el.targetHeight !== void 0 ? el.targetHeight : 12;
      const doc = e.currentTarget?.ownerDocument || document;
      const win = doc.defaultView || window;
      let rafId = null;
      const onPointerMove = (moveEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        const clientX = moveEvent.clientX !== void 0 ? moveEvent.clientX : moveEvent.touches?.[0]?.clientX || 0;
        const clientY = moveEvent.clientY !== void 0 ? moveEvent.clientY : moveEvent.touches?.[0]?.clientY || 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const dx = (clientX - startX) / stageWidth * 100;
          const dy = (clientY - startY) / stageHeight * 100;
          const newLeft = Math.max(0, Math.min(100, initLeft + dx));
          const newTop = Math.max(0, Math.min(100, initTop + dy));
          const roundedLeft = Math.round(newLeft * 10) / 10;
          const roundedTop = Math.round(newTop * 10) / 10;
          const currentSteps = stepsRef.current || [];
          const currentActiveIdx = activeIndexRef.current;
          const currStep = currentSteps[currentActiveIdx];
          if (!currStep) return;
          const updatedElements = (currStep.elements || []).map((item) => {
            if (item.id === el.id) {
              return { ...item, targetLeft: roundedLeft, targetTop: roundedTop };
            }
            return item;
          });
          const updatedSteps = currentSteps.map(
            (s, i) => i === currentActiveIdx ? { ...s, elements: updatedElements } : s
          );
          setAttributes({ steps: updatedSteps });
        });
      };
      const onPointerUp = (upEvent) => {
        if (upEvent && upEvent.preventDefault) upEvent.preventDefault();
        if (rafId) cancelAnimationFrame(rafId);
        doc.removeEventListener("pointermove", onPointerMove);
        doc.removeEventListener("pointerup", onPointerUp);
        doc.removeEventListener("mousemove", onPointerMove);
        doc.removeEventListener("mouseup", onPointerUp);
        win.removeEventListener("pointermove", onPointerMove);
        win.removeEventListener("pointerup", onPointerUp);
        win.removeEventListener("mousemove", onPointerMove);
        win.removeEventListener("mouseup", onPointerUp);
      };
      doc.addEventListener("pointermove", onPointerMove, { passive: false });
      doc.addEventListener("pointerup", onPointerUp);
      doc.addEventListener("mousemove", onPointerMove, { passive: false });
      doc.addEventListener("mouseup", onPointerUp);
      win.addEventListener("pointermove", onPointerMove, { passive: false });
      win.addEventListener("pointerup", onPointerUp);
      win.addEventListener("mousemove", onPointerMove, { passive: false });
      win.addEventListener("mouseup", onPointerUp);
    };
    const handlePointerDownResizeTarget = (e, el, handle) => {
      if (e.button !== 0 && e.buttons !== 1 && e.button !== void 0) return;
      e.stopPropagation();
      e.preventDefault();
      setActiveElementId(el.id);
      const targetEl = stageRef.current || stageCanvasRef.current;
      if (!targetEl) return;
      const rect = targetEl.getBoundingClientRect();
      const stageWidth = rect.width > 0 ? rect.width : targetEl.offsetWidth || 800;
      const stageHeight = rect.height > 0 ? rect.height : targetEl.offsetHeight || stageWidth / (imageRatio || 16 / 9);
      if (!stageWidth || !stageHeight) return;
      const startX = e.clientX !== void 0 ? e.clientX : e.touches?.[0]?.clientX || 0;
      const startY = e.clientY !== void 0 ? e.clientY : e.touches?.[0]?.clientY || 0;
      const initLeft = el.targetLeft !== void 0 ? el.targetLeft : el.left + 25;
      const initTop = el.targetTop !== void 0 ? el.targetTop : el.top;
      const initW = el.targetWidth !== void 0 ? el.targetWidth : 16;
      const initH = el.targetHeight !== void 0 ? el.targetHeight : 12;
      const doc = e.currentTarget?.ownerDocument || document;
      const win = doc.defaultView || window;
      let rafId = null;
      const onPointerMove = (moveEvent) => {
        moveEvent.preventDefault();
        moveEvent.stopPropagation();
        const clientX = moveEvent.clientX !== void 0 ? moveEvent.clientX : moveEvent.touches?.[0]?.clientX || 0;
        const clientY = moveEvent.clientY !== void 0 ? moveEvent.clientY : moveEvent.touches?.[0]?.clientY || 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const dx = (clientX - startX) / stageWidth * 100;
          const dy = (clientY - startY) / stageHeight * 100;
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
                targetLeft: roundedLeft,
                targetTop: roundedTop,
                targetWidth: roundedW,
                targetHeight: roundedH
              };
            }
            return item;
          });
          const updatedSteps = currentSteps.map(
            (s, i) => i === currentActiveIdx ? { ...s, elements: updatedElements } : s
          );
          setAttributes({ steps: updatedSteps });
        });
      };
      const onPointerUp = (upEvent) => {
        if (upEvent && upEvent.preventDefault) upEvent.preventDefault();
        if (rafId) cancelAnimationFrame(rafId);
        doc.removeEventListener("pointermove", onPointerMove);
        doc.removeEventListener("pointerup", onPointerUp);
        doc.removeEventListener("mousemove", onPointerMove);
        doc.removeEventListener("mouseup", onPointerUp);
        win.removeEventListener("pointermove", onPointerMove);
        win.removeEventListener("pointerup", onPointerUp);
        win.removeEventListener("mousemove", onPointerMove);
        win.removeEventListener("mouseup", onPointerUp);
      };
      doc.addEventListener("pointermove", onPointerMove, { passive: false });
      doc.addEventListener("pointerup", onPointerUp);
      doc.addEventListener("mousemove", onPointerMove, { passive: false });
      doc.addEventListener("mouseup", onPointerUp);
      win.addEventListener("pointermove", onPointerMove, { passive: false });
      win.addEventListener("pointerup", onPointerUp);
      win.addEventListener("mousemove", onPointerMove, { passive: false });
      win.addEventListener("mouseup", onPointerUp);
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
      /* @__PURE__ */ React.createElement("div", { style: { marginBottom: "16px", padding: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px" } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#0f172a", marginBottom: "6px" } }, (0, import_i18n.__)("\u{1F50A} \xC1udio do Passo (Executa ao iniciar o slide)", "simulador-software-abnt")), currentStep.audioUrl ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
        "audio",
        {
          controls: true,
          src: getResolvedImageUrl(currentStep.audioUrl),
          style: { width: "100%", height: "36px", marginBottom: "8px" }
        }
      ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "8px", alignItems: "center" } }, /* @__PURE__ */ React.createElement(import_block_editor.MediaUploadCheck, null, /* @__PURE__ */ React.createElement(
        import_block_editor.MediaUpload,
        {
          onSelect: (media) => updateCurrentStep({ audioUrl: media.url, audioId: media.id }),
          allowedTypes: ["audio"],
          value: currentStep.audioId,
          render: ({ open }) => /* @__PURE__ */ React.createElement(import_components.Button, { variant: "secondary", isSmall: true, onClick: open }, (0, import_i18n.__)("Alterar \xC1udio", "simulador-software-abnt"))
        }
      )), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "link",
          isDestructive: true,
          isSmall: true,
          onClick: () => updateCurrentStep({ audioUrl: "", audioId: null })
        },
        (0, import_i18n.__)("Remover \xC1udio", "simulador-software-abnt")
      )), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "8px" } }, /* @__PURE__ */ React.createElement(
        import_components.ToggleControl,
        {
          label: (0, import_i18n.__)("Auto-executar ao entrar neste slide", "simulador-software-abnt"),
          checked: currentStep.audioAutoPlay !== false,
          onChange: (val) => updateCurrentStep({ audioAutoPlay: val })
        }
      ))) : /* @__PURE__ */ React.createElement(import_block_editor.MediaUploadCheck, null, /* @__PURE__ */ React.createElement(
        import_block_editor.MediaUpload,
        {
          onSelect: (media) => updateCurrentStep({ audioUrl: media.url, audioId: media.id, audioAutoPlay: true }),
          allowedTypes: ["audio"],
          value: currentStep.audioId,
          render: ({ open }) => /* @__PURE__ */ React.createElement(import_components.Button, { variant: "secondary", onClick: open, icon: "format-audio", style: { width: "100%" } }, (0, import_i18n.__)("Selecionar \xC1udio da Biblioteca", "simulador-software-abnt"))
        }
      )), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "11px", color: "#64748b", marginTop: "6px", marginBottom: 0 } }, (0, import_i18n.__)("Reproduz narra\xE7\xE3o ou efeito sonoro ao exibir este passo.", "simulador-software-abnt"))),
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
      /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6px", marginBottom: "14px" } }, /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "secondary",
          icon: "admin-links",
          onClick: () => handleAddElement("click"),
          style: { padding: "6px 8px", fontSize: "11px", display: "flex", justifyContent: "center", alignItems: "center", height: "36px" },
          title: (0, import_i18n.__)("Adicionar Hotspot de Clique", "simulador-software-abnt")
        },
        (0, import_i18n.__)("+ Clique", "simulador-software-abnt")
      ), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "secondary",
          icon: "edit",
          onClick: () => handleAddElement("input"),
          style: { padding: "6px 8px", fontSize: "11px", display: "flex", justifyContent: "center", alignItems: "center", height: "36px" },
          title: (0, import_i18n.__)("Adicionar Campo de Digita\xE7\xE3o", "simulador-software-abnt")
        },
        (0, import_i18n.__)("+ Input", "simulador-software-abnt")
      ), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "secondary",
          icon: "move",
          onClick: () => handleAddElement("drag"),
          style: { padding: "6px 8px", fontSize: "11px", display: "flex", justifyContent: "center", alignItems: "center", height: "36px" },
          title: (0, import_i18n.__)("Adicionar Drag & Drop", "simulador-software-abnt")
        },
        (0, import_i18n.__)("+ Drag", "simulador-software-abnt")
      ), /* @__PURE__ */ React.createElement(
        import_components.Button,
        {
          variant: "secondary",
          icon: "format-image",
          onClick: () => handleAddElement("image"),
          style: { padding: "6px 8px", fontSize: "11px", display: "flex", justifyContent: "center", alignItems: "center", height: "36px" },
          title: (0, import_i18n.__)("Adicionar Imagem Sobreposta com Anima\xE7\xE3o", "simulador-software-abnt")
        },
        (0, import_i18n.__)("+ Imagem", "simulador-software-abnt")
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
          /* @__PURE__ */ React.createElement("div", { className: "sim-element-header" }, /* @__PURE__ */ React.createElement("strong", null, el.type === "click" ? "\u{1F3AF} Clique: " : el.type === "drag" ? "\u270B Drag: " : el.type === "image" ? "\u{1F5BC}\uFE0F Imagem: " : "\u2328\uFE0F Input: ", el.label || `Elemento ${elIdx + 1}`), /* @__PURE__ */ React.createElement(
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
          el.type === "image" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: "16px" } }, /* @__PURE__ */ React.createElement("label", { style: { display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", marginBottom: "6px" } }, (0, import_i18n.__)("Imagem Sobreposta (PNG, SVG, etc.)", "simulador-software-abnt")), el.imageUrl ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
            "img",
            {
              src: getResolvedImageUrl(el.imageUrl),
              alt: el.label,
              style: { width: "100%", maxHeight: "100px", objectFit: "contain", background: "#f8fafc", borderRadius: "4px", border: "1px solid #cbd5e1", padding: "6px" }
            }
          ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "8px", marginTop: "8px" } }, /* @__PURE__ */ React.createElement(import_block_editor.MediaUploadCheck, null, /* @__PURE__ */ React.createElement(
            import_block_editor.MediaUpload,
            {
              onSelect: (media) => handleUpdateElement(el.id, { imageUrl: media.url, imageId: media.id }),
              allowedTypes: ["image"],
              value: el.imageId,
              render: ({ open }) => /* @__PURE__ */ React.createElement(import_components.Button, { variant: "secondary", isSmall: true, onClick: open }, (0, import_i18n.__)("Alterar Imagem", "simulador-software-abnt"))
            }
          )), /* @__PURE__ */ React.createElement(
            import_components.Button,
            {
              variant: "link",
              isDestructive: true,
              isSmall: true,
              onClick: () => handleUpdateElement(el.id, { imageUrl: "", imageId: null })
            },
            (0, import_i18n.__)("Remover", "simulador-software-abnt")
          ))) : /* @__PURE__ */ React.createElement(import_block_editor.MediaUploadCheck, null, /* @__PURE__ */ React.createElement(
            import_block_editor.MediaUpload,
            {
              onSelect: (media) => handleUpdateElement(el.id, { imageUrl: media.url, imageId: media.id }),
              allowedTypes: ["image"],
              value: el.imageId,
              render: ({ open }) => /* @__PURE__ */ React.createElement(import_components.Button, { variant: "secondary", onClick: open, icon: "format-image", style: { width: "100%" } }, (0, import_i18n.__)("Selecionar Imagem da Biblioteca", "simulador-software-abnt"))
            }
          ))), /* @__PURE__ */ React.createElement(
            import_components.SelectControl,
            {
              label: (0, import_i18n.__)("Efeito / Transi\xE7\xE3o de Anima\xE7\xE3o", "simulador-software-abnt"),
              value: el.animationType || "appear",
              options: [
                { label: "\u2728 Surgir (Fade & Pop)", value: "appear" },
                { label: "\u{1F680} Mover Ponto a Ponto", value: "move" },
                { label: "\u{1F50D} Aumentar de Tamanho (Zoom/Pulso)", value: "zoom" },
                { label: "\u{1F504} Girar (Rota\xE7\xE3o 360\xB0)", value: "rotate" },
                { label: "\u{1F4D0} Inclinar (Perspectiva / Skew)", value: "skew" },
                { label: "\u{1F31F} Combinado (Surgir + Aumentar + Girar)", value: "combined" }
              ],
              onChange: (val) => handleUpdateElement(el.id, { animationType: val })
            }
          ), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" } }, /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Dura\xE7\xE3o (s)", "simulador-software-abnt"),
              value: el.animationDuration !== void 0 ? el.animationDuration : 1.5,
              onChange: (val) => handleUpdateElement(el.id, { animationDuration: Number(val) }),
              min: 0.2,
              max: 10,
              step: 0.1
            }
          ), /* @__PURE__ */ React.createElement(
            import_components.RangeControl,
            {
              label: (0, import_i18n.__)("Atraso / Delay (s)", "simulador-software-abnt"),
              value: el.animationDelay !== void 0 ? el.animationDelay : 0.2,
              onChange: (val) => handleUpdateElement(el.id, { animationDelay: Number(val) }),
              min: 0,
              max: 5,
              step: 0.1
            }
          )), /* @__PURE__ */ React.createElement(
            import_components.SelectControl,
            {
              label: (0, import_i18n.__)("Repeti\xE7\xE3o da Anima\xE7\xE3o", "simulador-software-abnt"),
              value: el.animationIteration || "once",
              options: [
                { label: "Executar 1 vez ao entrar no slide", value: "once" },
                { label: "Repetir continuamente (Loop)", value: "infinite" }
              ],
              onChange: (val) => handleUpdateElement(el.id, { animationIteration: val })
            }
          ), el.animationType === "move" && /* @__PURE__ */ React.createElement("div", { style: { marginTop: "10px", padding: "10px", background: "#eff6ff", borderRadius: "6px", border: "1px solid #bfdbfe" } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#1d4ed8", display: "block", marginBottom: "8px" } }, (0, import_i18n.__)("\u{1F3C1} Ponto B: Destino do Movimento (%)", "simulador-software-abnt")), /* @__PURE__ */ React.createElement(
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
          )), /* @__PURE__ */ React.createElement(
            import_components.Button,
            {
              variant: "secondary",
              icon: "controls-play",
              onClick: () => {
                setPreviewAnimationId(null);
                setTimeout(() => setPreviewAnimationId(el.id), 50);
              },
              style: { width: "100%", marginTop: "6px", marginBottom: "8px", justifyContent: "center" }
            },
            (0, import_i18n.__)("\u25B6 Testar Anima\xE7\xE3o no Editor", "simulador-software-abnt")
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
          el.type !== "image" && /* @__PURE__ */ React.createElement(
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
          position: "relative",
          width: "100%",
          aspectRatio: `${imageRatio || 16 / 9}`,
          overflow: "hidden",
          boxSizing: "border-box",
          display: "block"
        }
      },
      currentStep.imageUrl ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
        "img",
        {
          className: "sim-bg-image",
          src: getResolvedImageUrl(currentStep.imageUrl),
          alt: currentStep.title || "Cen\xE1rio do Passo",
          onLoad: (e) => {
            if (e.target.naturalWidth && e.target.naturalHeight) {
              const r = e.target.naturalWidth / e.target.naturalHeight;
              setImageRatio(r);
            }
          },
          style: {
            position: "absolute",
            inset: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            minWidth: "100%",
            minHeight: "100%",
            maxWidth: "none",
            maxHeight: "none",
            objectFit: "fill",
            objectPosition: "0 0",
            display: "block",
            margin: 0,
            padding: 0,
            zIndex: 1,
            boxSizing: "border-box"
          }
        }
      ), /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "sim-elements-layer",
          ref: stageRef,
          onClick: () => setActiveElementId(null),
          style: {
            position: "absolute",
            inset: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            minWidth: "100%",
            minHeight: "100%",
            maxWidth: "none",
            maxHeight: "none",
            margin: 0,
            padding: 0,
            zIndex: 3,
            boxSizing: "border-box",
            pointerEvents: "auto"
          }
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
                position: "absolute",
                top: `${tTop}%`,
                left: `${tLeft}%`,
                width: `${tWidth}%`,
                height: `${tHeight}%`,
                border: isSelected ? "2px solid #8b5cf6" : "2px dashed #8b5cf6",
                background: isSelected ? "rgba(139, 92, 246, 0.28)" : "rgba(139, 92, 246, 0.15)",
                boxShadow: isSelected ? "0 0 16px rgba(139, 92, 246, 0.6)" : "none",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
                cursor: "move",
                touchAction: "none",
                userSelect: "none",
                zIndex: isSelected ? 45 : 16,
                boxSizing: "border-box"
              },
              onPointerDown: (e) => {
                if (e.target.classList.contains("sim-resize-handle")) return;
                handlePointerDownMoveTarget(e, el);
              },
              onMouseDown: (e) => e.stopPropagation(),
              onDragStart: (e) => {
                e.preventDefault();
                e.stopPropagation();
              },
              draggable: false,
              onClick: (e) => {
                e.stopPropagation();
                setActiveElementId(el.id);
              },
              title: (0, import_i18n.__)("\xC1rea de Destino (Clique e arraste para mover, ou use os pontos para redimensionar)", "simulador-software-abnt")
            },
            /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-element-move-handle sim-zone-move-handle",
                style: {
                  position: "absolute",
                  top: "-26px",
                  left: 0,
                  height: "24px",
                  background: "#7c3aed",
                  color: "#ffffff",
                  padding: "0 8px",
                  borderRadius: "4px 4px 0 0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "move",
                  userSelect: "none",
                  boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.35)",
                  zIndex: 9990,
                  touchAction: "none",
                  whiteSpace: "nowrap",
                  pointerEvents: "auto",
                  fontSize: "11px",
                  fontWeight: 700,
                  lineHeight: "24px"
                },
                onPointerDown: (e) => {
                  e.stopPropagation();
                  handlePointerDownMoveTarget(e, el);
                },
                onMouseDown: (e) => e.stopPropagation(),
                onDragStart: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                },
                draggable: false,
                title: (0, import_i18n.__)("Clique e arraste para posicionar o Destino", "simulador-software-abnt")
              },
              /* @__PURE__ */ React.createElement(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  width: "12",
                  height: "12",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  style: { pointerEvents: "none", flexShrink: 0 }
                },
                /* @__PURE__ */ React.createElement("polyline", { points: "5 9 2 12 5 15" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "9 5 12 2 15 5" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "15 19 12 22 9 19" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "19 9 22 12 19 15" }),
                /* @__PURE__ */ React.createElement("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
                /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "2", x2: "12", y2: "22" })
              ),
              /* @__PURE__ */ React.createElement("span", { className: "sim-move-text", style: { fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", pointerEvents: "none" } }, "\u{1F4E5} ", el.targetLabel || (0, import_i18n.__)("Destino", "simulador-software-abnt"))
            ),
            /* @__PURE__ */ React.createElement(
              "span",
              {
                className: "sim-drop-zone-badge",
                style: {
                  background: "#7c3aed",
                  color: "#ffffff",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 700,
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.35)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px"
                }
              },
              "\u{1F4E5} ",
              el.targetLabel || (0, import_i18n.__)("Solte Aqui", "simulador-software-abnt")
            ),
            isSelected && /* @__PURE__ */ React.createElement(
              "span",
              {
                className: "sim-coords-badge sim-zone-coords-badge",
                style: {
                  position: "absolute",
                  bottom: "calc(100% + 28px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#1e1b4b",
                  color: "#c4b5fd",
                  border: "1px solid rgba(167, 139, 250, 0.5)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 9995,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)"
                }
              },
              "\u{1F4E5} Destino: X: ",
              Number(tLeft).toFixed(1),
              "% Y: ",
              Number(tTop).toFixed(1),
              "% | L: ",
              Number(tWidth).toFixed(1),
              "% A: ",
              Number(tHeight).toFixed(1),
              "%"
            ),
            isSelected && RESIZE_HANDLES_DEF.map((h) => /* @__PURE__ */ React.createElement(
              "div",
              {
                key: h.dir,
                className: `sim-resize-handle handle-${h.dir}`,
                style: {
                  position: "absolute",
                  width: "12px",
                  height: "12px",
                  background: "#ffffff",
                  border: "2px solid #7c3aed",
                  borderRadius: "3px",
                  boxShadow: "0 1px 6px rgba(0, 0, 0, 0.5)",
                  zIndex: 9999,
                  pointerEvents: "auto",
                  userSelect: "none",
                  touchAction: "none",
                  boxSizing: "border-box",
                  ...h.style
                },
                onPointerDown: (e) => handlePointerDownResizeTarget(e, el, h.dir),
                onMouseDown: (e) => e.stopPropagation(),
                onDragStart: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                },
                draggable: false,
                title: (0, import_i18n.__)(`Redimensionar Destino (${h.title})`, "simulador-software-abnt")
              }
            ))
          );
        }),
        (currentStep.elements || []).map((el, elIdx) => {
          if (el.type !== "image" || el.animationType !== "move") return null;
          const isSelected = el.id === activeElementId;
          const tTop = el.targetTop !== void 0 ? el.targetTop : el.top;
          const tLeft = el.targetLeft !== void 0 ? el.targetLeft : el.left + 25;
          const tWidth = el.width || 18;
          const tHeight = el.height || 18;
          return /* @__PURE__ */ React.createElement(
            "div",
            {
              key: `imagetarget-${el.id || elIdx}`,
              className: `sim-image-target-zone ${isSelected ? "is-target-selected" : ""}`,
              style: {
                position: "absolute",
                top: `${tTop}%`,
                left: `${tLeft}%`,
                width: `${tWidth}%`,
                height: `${tHeight}%`,
                border: isSelected ? "2px solid #0284c7" : "2px dashed #0284c7",
                background: isSelected ? "rgba(2, 132, 199, 0.28)" : "rgba(2, 132, 199, 0.15)",
                boxShadow: isSelected ? "0 0 14px rgba(2, 132, 199, 0.5)" : "none",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
                cursor: "move",
                touchAction: "none",
                userSelect: "none",
                zIndex: isSelected ? 44 : 15,
                boxSizing: "border-box"
              },
              onPointerDown: (e) => {
                if (e.target.classList.contains("sim-resize-handle")) return;
                handlePointerDownMoveTarget(e, el);
              },
              onMouseDown: (e) => e.stopPropagation(),
              onDragStart: (e) => {
                e.preventDefault();
                e.stopPropagation();
              },
              draggable: false,
              onClick: (e) => {
                e.stopPropagation();
                setActiveElementId(el.id);
              },
              title: (0, import_i18n.__)("Ponto B (Destino da Anima\xE7\xE3o). Clique e arraste para reposicionar.", "simulador-software-abnt")
            },
            /* @__PURE__ */ React.createElement(
              "div",
              {
                className: "sim-image-target-handle",
                style: {
                  position: "absolute",
                  top: "-24px",
                  left: 0,
                  height: "22px",
                  background: "#0284c7",
                  color: "#ffffff",
                  padding: "0 8px",
                  borderRadius: "4px 4px 0 0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "move",
                  userSelect: "none",
                  boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.25)",
                  zIndex: 9990,
                  touchAction: "none",
                  whiteSpace: "nowrap",
                  pointerEvents: "auto",
                  fontSize: "10px",
                  fontWeight: 700
                },
                onPointerDown: (e) => {
                  e.stopPropagation();
                  handlePointerDownMoveTarget(e, el);
                },
                onMouseDown: (e) => e.stopPropagation(),
                onDragStart: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                },
                draggable: false,
                title: (0, import_i18n.__)("Clique e arraste para posicionar o Destino", "simulador-software-abnt")
              },
              /* @__PURE__ */ React.createElement("span", { className: "sim-move-text", style: { fontSize: "10px", fontWeight: 700, whiteSpace: "nowrap", pointerEvents: "none" } }, "\u{1F3C1} ", (0, import_i18n.__)("Destino do Movimento", "simulador-software-abnt"))
            ),
            /* @__PURE__ */ React.createElement(
              "span",
              {
                className: "sim-target-badge",
                style: {
                  background: "#0284c7",
                  color: "#ffffff",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: 700,
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none"
                }
              },
              "\u{1F3C1} ",
              (0, import_i18n.__)("Ponto B (Fim)", "simulador-software-abnt")
            ),
            isSelected && /* @__PURE__ */ React.createElement(
              "span",
              {
                className: "sim-coords-badge sim-zone-coords-badge",
                style: {
                  position: "absolute",
                  bottom: "calc(100% + 26px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#0f172a",
                  color: "#38bdf8",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 9995,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)"
                }
              },
              "\u{1F3C1} Destino: X: ",
              Number(tLeft).toFixed(1),
              "% Y: ",
              Number(tTop).toFixed(1),
              "%"
            )
          );
        }),
        (currentStep.elements || []).map((el, elIdx) => {
          const isSelected = el.id === activeElementId;
          const isPreviewing = previewAnimationId === el.id;
          return /* @__PURE__ */ React.createElement(
            "div",
            {
              key: el.id || elIdx,
              className: `sim-editor-overlay-element type-${el.type} ${isSelected ? "is-element-selected" : ""} ${isPreviewing ? `sim-anim-preview anim-${el.animationType || "appear"}` : ""}`,
              style: {
                top: `${el.top}%`,
                left: `${el.left}%`,
                width: `${el.width}%`,
                height: `${el.height}%`,
                ...isPreviewing ? {
                  "--anim-duration": `${el.animationDuration !== void 0 ? el.animationDuration : 1.5}s`,
                  "--anim-delay": `${el.animationDelay !== void 0 ? el.animationDelay : 0.2}s`,
                  ...el.animationType === "move" ? {
                    "--move-tx": `${((el.targetLeft !== void 0 ? el.targetLeft : el.left + 25) - el.left) / (el.width || 1) * 100}%`,
                    "--move-ty": `${((el.targetTop !== void 0 ? el.targetTop : el.top) - el.top) / (el.height || 1) * 100}%`
                  } : {}
                } : {}
              },
              onPointerDown: (e) => {
                if (e.target.classList.contains("sim-resize-handle")) return;
                handlePointerDownMove(e, el);
              },
              onMouseDown: (e) => e.stopPropagation(),
              onDragStart: (e) => {
                e.preventDefault();
                e.stopPropagation();
              },
              draggable: false,
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
                onMouseDown: (e) => e.stopPropagation(),
                onDragStart: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                },
                draggable: false,
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
              /* @__PURE__ */ React.createElement("span", { className: "sim-move-text" }, el.type === "click" ? "\u{1F3AF} Mover Clique" : el.type === "drag" ? "\u270B Mover Drag" : el.type === "image" ? "\u{1F5BC}\uFE0F Mover Imagem" : "\u2328\uFE0F Mover Input")
            ),
            /* @__PURE__ */ React.createElement("span", { className: "sim-element-badge" }, el.type === "click" ? "\u{1F3AF} " : el.type === "drag" ? "\u270B " : el.type === "image" ? "\u{1F5BC}\uFE0F " : "\u2328\uFE0F ", el.label || `${el.type} (${el.left.toFixed(1)}%, ${el.top.toFixed(1)}%)`),
            el.type === "image" && (el.imageUrl ? /* @__PURE__ */ React.createElement(
              "img",
              {
                src: getResolvedImageUrl(el.imageUrl),
                alt: el.label,
                style: { width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }
              }
            ) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", background: "rgba(2, 132, 199, 0.08)", color: "#0284c7", fontSize: "10px", textAlign: "center", padding: "2px", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "18px", lineHeight: 1 } }, "\u{1F5BC}\uFE0F"), /* @__PURE__ */ React.createElement("span", null, (0, import_i18n.__)("Sem imagem", "simulador-software-abnt")))),
            isSelected && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "sim-coords-badge" }, el.type === "click" ? "\u{1F3AF} Clique" : el.type === "drag" ? "\u270B Drag" : el.type === "image" ? "\u{1F5BC}\uFE0F Imagem" : "\u2328\uFE0F Input", ": X: ", el.left.toFixed(1), "% Y: ", el.top.toFixed(1), "% | L: ", el.width.toFixed(1), "% A: ", el.height.toFixed(1), "%"), RESIZE_HANDLES_DEF.map((h) => {
              const handleColor = el.type === "click" ? "#2563eb" : el.type === "input" ? "#059669" : el.type === "drag" ? "#7c3aed" : "#0284c7";
              return /* @__PURE__ */ React.createElement(
                "div",
                {
                  key: h.dir,
                  className: `sim-resize-handle handle-${h.dir}`,
                  style: {
                    position: "absolute",
                    width: "12px",
                    height: "12px",
                    background: "#ffffff",
                    border: `2px solid ${handleColor}`,
                    borderRadius: "3px",
                    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.45)",
                    zIndex: 9999,
                    pointerEvents: "auto",
                    userSelect: "none",
                    touchAction: "none",
                    boxSizing: "border-box",
                    ...h.style
                  },
                  onPointerDown: (e) => handlePointerDownResize(e, el, h.dir),
                  onMouseDown: (e) => e.stopPropagation(),
                  onDragStart: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  },
                  draggable: false,
                  title: (0, import_i18n.__)(`Redimensionar (${h.title})`, "simulador-software-abnt")
                }
              );
            }))
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
