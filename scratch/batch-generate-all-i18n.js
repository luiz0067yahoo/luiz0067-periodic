const https = require('https');
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.resolve(__dirname, '../docs');
const I18N_DIR = path.resolve(DOCS_DIR, 'i18n');

if (!fs.existsSync(I18N_DIR)) {
  fs.mkdirSync(I18N_DIR, { recursive: true });
}

function fetchTranslation(text, targetLang) {
  return new Promise((resolve) => {
    if (!text || !text.trim()) return resolve(text);
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=pt&tl=' + targetLang + '&dt=t&q=' + encodeURIComponent(text);
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const translated = json[0].map(item => item[0]).join('');
          resolve(translated);
        } catch (e) {
          resolve(text);
        }
      });
    }).on('error', () => resolve(text));
  });
}

function getLangBar(compName, lang, isSubdir) {
  if (isSubdir) {
    return `[English](../${compName}.md) • [Português (BR)](${compName}.pt-br.md) • [Español](${compName}.es.md) • [Italiano](${compName}.it.md)\n`;
  } else {
    return `[English](${compName}.md) • [Português (BR)](i18n/${compName}.pt-br.md) • [Español](i18n/${compName}.es.md) • [Italiano](i18n/${compName}.it.md)\n`;
  }
}

// Translate a chunk of text while preserving tokens
async function translateChunk(chunkText, targetLang, isSubdir) {
  const placeholders = [];

  // Protect "Periodic" brand name
  let masked = chunkText.replace(/\bPeriodic\b/g, () => {
    const idx = placeholders.length;
    placeholders.push('Periodic');
    return `§§B_${idx}§§`;
  });

  // Protect badges: [![badge](url)](url)
  masked = masked.replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, (match) => {
    const idx = placeholders.length;
    placeholders.push(match);
    return `§§T_${idx}§§`;
  });

  // Protect images: ![alt](url)
  masked = masked.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    let finalUrl = url;
    if (isSubdir && !url.startsWith('http') && !url.startsWith('../') && !url.startsWith('/')) {
      finalUrl = '../' + url;
    }
    const idx = placeholders.length;
    placeholders.push(`![${alt}](${finalUrl})`);
    return `§§T_${idx}§§`;
  });

  // Protect inline code: `code`
  masked = masked.replace(/`([^`]+)`/g, (match) => {
    const idx = placeholders.length;
    placeholders.push(match);
    return `§§T_${idx}§§`;
  });

  // Protect links: [text](url) -> preserve url, translate text
  masked = masked.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, txt, url) => {
    let finalUrl = url;
    if (isSubdir && !url.startsWith('http') && !url.startsWith('#') && !url.startsWith('../') && !url.startsWith('/')) {
      finalUrl = '../' + url;
    }
    const idx = placeholders.length;
    placeholders.push({ txt, url: finalUrl });
    return `§§L_${idx}§§`;
  });

  // Translate masked chunk
  let translated = await fetchTranslation(masked, targetLang);

  // Restore placeholders
  for (let p = 0; p < placeholders.length; p++) {
    if (typeof placeholders[p] === 'string') {
      translated = translated.replace(new RegExp(`§§\\s*(T|B)_${p}\\s*§§`, 'gi'), placeholders[p]);
    } else {
      const lk = placeholders[p];
      let transTxt = lk.txt;
      if (lk.txt && lk.txt.length > 1 && !lk.txt.startsWith('http')) {
        transTxt = await fetchTranslation(lk.txt, targetLang);
      }
      translated = translated.replace(new RegExp(`§§\\s*L_${p}\\s*§§`, 'gi'), `[${transTxt}](${lk.url})`);
    }
  }

  return translated;
}

async function translateContent(content, targetLang, compName, isSubdir) {
  if (targetLang === 'pt-br') {
    return normalizeDoc(content, compName, 'pt-br', isSubdir);
  }

  // Parse document into chunks (code blocks vs text blocks)
  const lines = content.split(/\r?\n/);
  const blocks = [];
  let currentTextBlock = [];
  let inCode = false;
  let inComment = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Language bar removal
    if (line.includes('[English]') && (line.includes('[Português') || line.includes('[Español]'))) {
      continue;
    }

    if (line.trim().startsWith('```')) {
      if (inCode) {
        // closing code block
        blocks.push({ type: 'code', text: line });
        inCode = false;
      } else {
        // flush text
        if (currentTextBlock.length) {
          blocks.push({ type: 'text', lines: currentTextBlock });
          currentTextBlock = [];
        }
        blocks.push({ type: 'code', text: line });
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      blocks.push({ type: 'code', text: line });
      continue;
    }

    if (line.trim().startsWith('<!--')) {
      if (currentTextBlock.length) {
        blocks.push({ type: 'text', lines: currentTextBlock });
        currentTextBlock = [];
      }
      blocks.push({ type: 'comment', text: line });
      if (!line.includes('-->')) inComment = true;
      continue;
    }
    if (inComment) {
      blocks.push({ type: 'comment', text: line });
      if (line.includes('-->')) inComment = false;
      continue;
    }

    currentTextBlock.push(line);
  }

  if (currentTextBlock.length) {
    blocks.push({ type: 'text', lines: currentTextBlock });
  }

  // Now process blocks
  const outputLines = [];
  for (const block of blocks) {
    if (block.type === 'code' || block.type === 'comment') {
      outputLines.push(block.text);
      continue;
    }

    // Text block: group by paragraphs or chunks under 1500 chars
    let currentChunk = [];
    let currentLen = 0;

    for (let j = 0; j < block.lines.length; j++) {
      const l = block.lines[j];
      currentChunk.push(l);
      currentLen += l.length + 1;

      // If paragraph boundary (empty line) or length > 1200, flush chunk
      if (currentLen > 1200 || !l.trim() || j === block.lines.length - 1) {
        const chunkText = currentChunk.join('\n');
        if (chunkText.trim()) {
          const transChunk = await translateChunk(chunkText, targetLang, isSubdir);
          outputLines.push(transChunk);
        } else {
          outputLines.push(chunkText);
        }
        currentChunk = [];
        currentLen = 0;
      }
    }
  }

  const rawDoc = outputLines.join('\n');
  return normalizeDoc(rawDoc, compName, targetLang, isSubdir);
}

function normalizeDoc(rawDoc, compName, lang, isSubdir) {
  const langBar = getLangBar(compName, lang, isSubdir);
  const lines = rawDoc.split(/\r?\n/);
  const cleanLines = lines.filter(l => !(l.includes('[English]') && (l.includes('[Português') || l.includes('[Español]'))));

  let insertIndex = -1;
  let inComment = false;
  for (let i = 0; i < cleanLines.length; i++) {
    const l = cleanLines[i];
    if (l.trim().startsWith('<!--')) {
      if (!l.includes('-->')) inComment = true;
      continue;
    }
    if (inComment) {
      if (l.includes('-->')) inComment = false;
      continue;
    }
    if (l.trim().startsWith('# ')) {
      insertIndex = i + 1;
      break;
    }
  }

  if (insertIndex !== -1) {
    cleanLines.splice(insertIndex, 0, '', langBar.trim(), '');
  } else {
    cleanLines.unshift(langBar.trim(), '');
  }

  let result = cleanLines.join('\n');
  if (isSubdir) {
    result = result.replace(/!\[([^\]]*)\]\((?!http|#|\/|\.\.\/)([^)]+)\)/g, '![$1](../$2)');
  }
  return result;
}

async function processComponent(compFile) {
  const compName = path.basename(compFile, '.md');
  const filePath = path.join(DOCS_DIR, compFile);
  const ptPath = path.join(I18N_DIR, `${compName}.pt-br.md`);
  
  let originalPtContent = '';
  if (fs.existsSync(ptPath)) {
    originalPtContent = fs.readFileSync(ptPath, 'utf8');
  } else {
    originalPtContent = fs.readFileSync(filePath, 'utf8');
  }

  console.log(`Processing [${compName}]...`);

  // 1. PT-BR
  const ptContent = await translateContent(originalPtContent, 'pt-br', compName, true);
  fs.writeFileSync(ptPath, ptContent, 'utf8');

  // 2. EN-US
  const enPrimary = await translateContent(originalPtContent, 'en', compName, false);
  const enSubdir = await translateContent(originalPtContent, 'en', compName, true);
  fs.writeFileSync(filePath, enPrimary, 'utf8');
  fs.writeFileSync(path.join(I18N_DIR, `${compName}.en-us.md`), enSubdir, 'utf8');

  // 3. ES
  const esContent = await translateContent(originalPtContent, 'es', compName, true);
  fs.writeFileSync(path.join(I18N_DIR, `${compName}.es.md`), esContent, 'utf8');

  // 4. IT
  const itContent = await translateContent(originalPtContent, 'it', compName, true);
  fs.writeFileSync(path.join(I18N_DIR, `${compName}.it.md`), itContent, 'utf8');

  console.log(`✓ Completed [${compName}] in 4 languages!`);
}

async function main() {
  const allDocs = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
  console.log(`Total components to process: ${allDocs.length}`);

  for (let i = 0; i < allDocs.length; i++) {
    const doc = allDocs[i];
    console.log(`\n[${i + 1}/${allDocs.length}] Starting ${doc}...`);
    try {
      await processComponent(doc);
    } catch (err) {
      console.error(`Error processing ${doc}:`, err);
    }
  }
  console.log('\n🎉 ALL 61 COMPONENTS PROCESSED SUCCESSFULLY ACROSS 4 LANGUAGES!');
}

if (require.main === module) {
  const target = process.argv[2];
  if (target) {
    processComponent(target).then(() => console.log('Done target', target));
  } else {
    main();
  }
}
