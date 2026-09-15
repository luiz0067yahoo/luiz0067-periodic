const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log('Iniciando navegador Microsoft Edge para capturar telas...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const shots = [
    {
      name: '01-editor-inspector-canvas.png',
      url: 'http://localhost:3456/test-editor.html',
      viewport: { width: 1400, height: 900 }
    },
    {
      name: '02-frontend-step1-desktop.png',
      url: 'http://localhost:3456/test-preview.html?step=0',
      viewport: { width: 1280, height: 940 }
    },
    {
      name: '03-frontend-step2-start-search.png',
      url: 'http://localhost:3456/test-preview.html?step=1',
      viewport: { width: 1280, height: 940 }
    },
    {
      name: '04-frontend-step3-word-layout.png',
      url: 'http://localhost:3456/test-preview.html?step=2',
      viewport: { width: 1280, height: 940 }
    },
    {
      name: '05-frontend-step4-word-margins.png',
      url: 'http://localhost:3456/test-preview.html?step=3',
      viewport: { width: 1280, height: 940 }
    },
    {
      name: '06-frontend-step5-abnt-inputs.png',
      url: 'http://localhost:3456/test-preview.html?step=4',
      viewport: { width: 1280, height: 940 }
    },
    {
      name: '07-frontend-completion.png',
      url: 'http://localhost:3456/test-preview.html?step=5',
      viewport: { width: 1280, height: 940 }
    },
    {
      name: '08-responsive-mobile.png',
      url: 'http://localhost:3456/test-preview.html?step=0',
      viewport: { width: 412, height: 860, isMobile: true }
    }
  ];

  for (const item of shots) {
    console.log(`Capturando: ${item.name}...`);
    await page.setViewport(item.viewport);
    await page.goto(item.url, { waitUntil: 'networkidle0' });
    // Aguardar animações estabilizarem
    await new Promise(r => setTimeout(r, 600));

    const outputPath = path.join(SCREENSHOTS_DIR, item.name);
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`Salvo com sucesso: ${item.name}`);
  }

  await browser.close();
  console.log('Todas as capturas foram salvas com sucesso em /screenshots!');
}

run().catch(err => {
  console.error('Erro ao capturar telas:', err);
  process.exit(1);
});
