const fs = require('fs');
const path = require('path');

console.log('--- Starting Periodic Interactive Utilities Validation ---');

// 1. Validate translation files in languages/
const langFiles = [
  'languages/pt-br.json',
  'languages/en-us.json',
  'languages/it.json',
  'languages/es.json'
];

let allValid = true;

langFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing file: ${file}`);
    allValid = false;
    return;
  }
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const parsed = JSON.parse(content);
    console.log(`✅ Valid JSON: ${file} (locale: ${parsed.locale})`);
  } catch (err) {
    console.error(`❌ JSON error in ${file}:`, err.message);
    allValid = false;
  }
});

// 2. Validate block.json
try {
  const blockJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'block.json'), 'utf-8'));
  console.log(`✅ Valid block.json (name: ${blockJson.name}, version: ${blockJson.version})`);
} catch (err) {
  console.error('❌ block.json error:', err.message);
  allValid = false;
}

// 3. Validate QRCode generator
try {
  const QRCode = require('../src/lib/qrcode.min.js');
  const svg = QRCode.generateSVG('https://github.com/periodic', { colorDark: '#2563eb' });
  if (svg && svg.includes('<svg')) {
    console.log('✅ QRCode generator functional (SVG length: ' + svg.length + ')');
  } else {
    console.error('❌ QRCode generator did not produce valid SVG');
    allValid = false;
  }
} catch (err) {
  console.error('❌ QRCode library error:', err.message);
  allValid = false;
}

if (!allValid) {
  process.exit(1);
}

console.log('--- All validations passed successfully! ---');
