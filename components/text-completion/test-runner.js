const fs = require('fs');
const path = require('path');

// Test JSON files
const languages = ['pt-br.json', 'en-us.json', 'it.json', 'es.json'];
const folders = ['languages', 'languagens'];

console.log('--- Testing Translation JSON files ---');
const baseKeys = null;
for (const folder of folders) {
  for (const file of languages) {
    const filePath = path.join(__dirname, folder, file);
    if (!fs.existsSync(filePath)) {
      console.error(`FAIL: Missing ${filePath}`);
      process.exit(1);
    }
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`OK: ${folder}/${file} parsed successfully (${Object.keys(content).length} keys)`);
    } catch (e) {
      console.error(`FAIL: Invalid JSON in ${filePath}`, e);
      process.exit(1);
    }
  }
}

console.log('\n--- Testing Gap Parser & Levenshtein ---');

// Test gap extraction logic directly
function extractGapsTest(text) {
  if (!text) return [];
  const regex = /\*([^*]+)\*/g;
  const gaps = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    let inner = match[1].trim();
    if (inner.startsWith('[') && inner.endsWith(']')) {
      inner = inner.slice(1, -1).trim();
    }
    const options = inner.split('|').map(s => s.trim()).filter(Boolean);
    const validOptions = options.length > 0 ? options : [inner];
    gaps.push({
      raw: match[0],
      options: validOptions,
      canonical: validOptions[0],
    });
  }
  return gaps;
}

const sampleText = "O céu é *azul* e o mar é *salgado*. Podemos dizer que é *[azul|anil]* ou *azul|anil*.";
const gaps = extractGapsTest(sampleText);
console.log(`Detected ${gaps.length} gaps in sample text.`);
console.log('Gaps found:', gaps);

if (gaps.length !== 4) {
  console.error('FAIL: Expected 4 gaps, got ' + gaps.length);
  process.exit(1);
}

if (gaps[0].options[0] !== 'azul' || gaps[1].options[0] !== 'salgado') {
  console.error('FAIL: Simple gaps mismatch', gaps);
  process.exit(1);
}

if (gaps[2].options.length !== 2 || gaps[2].options[1] !== 'anil') {
  console.error('FAIL: Multi-option *[azul|anil]* mismatch', gaps[2]);
  process.exit(1);
}

if (gaps[3].options.length !== 2 || gaps[3].options[1] !== 'anil') {
  console.error('FAIL: Multi-option *azul|anil* mismatch', gaps[3]);
  process.exit(1);
}

// Test Levenshtein distance
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

console.log('Levenshtein test ("salgado", "salgdo"):', levenshteinDistance('salgado', 'salgdo'));
if (levenshteinDistance('salgado', 'salgdo') !== 1) {
  console.error('FAIL: Levenshtein distance expected 1');
  process.exit(1);
}

console.log('\n--- All Automated Logic Checks PASSED! ---');
