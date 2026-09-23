const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const assetsDir = path.resolve(__dirname, '../components/interative-software-simulator/assets');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const svgs = [
  'step1-windows11-desktop',
  'step2-windows11-startmenu',
  'step3-word-document',
  'step4-word-layout-ribbon',
  'step5-word-margins-modal'
];

const tempDir = path.resolve(__dirname, 'temp_convert');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

for (const name of svgs) {
  const svgPath = path.join(assetsDir, `${name}.svg`);
  const pngPath = path.join(assetsDir, `${name}.png`);
  const htmlPath = path.join(tempDir, `${name}.html`);

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    background: transparent;
  }
  img {
    width: 1920px;
    height: 1080px;
    display: block;
    object-fit: fill;
    margin: 0;
    padding: 0;
  }
</style>
</head>
<body>
  <img src="file:///${svgPath.replace(/\\/g, '/')}" />
</body>
</html>`;

  fs.writeFileSync(htmlPath, htmlContent, 'utf8');

  console.log(`Converting ${name}.svg -> ${name}.png...`);
  const userDataDir = path.join(tempDir, 'user_data');

  const args = [
    '--headless=new',
    `--user-data-dir=${userDataDir}`,
    `--screenshot=${pngPath}`,
    '--window-size=1920,1080',
    '--hide-scrollbars',
    '--disable-gpu',
    `file:///${htmlPath.replace(/\\/g, '/')}`
  ];

  const res = spawnSync(chromePath, args, { stdio: 'inherit' });
  if (res.status === 0 && fs.existsSync(pngPath)) {
    const stats = fs.statSync(pngPath);
    console.log(`✓ ${name}.png created successfully (${stats.size} bytes).`);
  } else {
    console.error(`✗ Failed to convert ${name}.svg`);
  }
}

// Cleanup temp files
try {
  fs.rmSync(tempDir, { recursive: true, force: true });
} catch (e) {}

console.log('All conversions complete!');
