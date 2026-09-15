const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  let executablePath = edgePaths.find(p => fs.existsSync(p));

  if (!executablePath) {
    console.error('Microsoft Edge not found at standard paths');
    process.exit(1);
  }

  console.log('Launching Edge from:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 2 });

  const fileUrl = 'file:///' + path.resolve(__dirname, 'preview-screenshots.html').replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const shots = [
    { id: '#shot-1', name: 'screenshot-1-frontend-alternating.png' },
    { id: '#shot-2', name: 'screenshot-2-frontend-left.png' },
    { id: '#shot-3', name: 'screenshot-3-tab-events.png' },
    { id: '#shot-4', name: 'screenshot-4-tab-appearance.png' },
    { id: '#shot-5', name: 'screenshot-5-tab-icons.png' }
  ];

  const outDir = path.resolve(__dirname, 'assets', 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const shot of shots) {
    const el = await page.$(shot.id);
    if (el) {
      const dest = path.join(outDir, shot.name);
      await el.screenshot({ path: dest });
      console.log('Saved:', shot.name);
    } else {
      console.warn('Element not found:', shot.id);
    }
  }

  await browser.close();
  console.log('All screenshots generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
