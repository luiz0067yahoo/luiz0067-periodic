const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchTranslation(text, targetLang) {
  return new Promise((resolve, reject) => {
    if (!text || !text.trim()) return resolve(text);
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + targetLang + '&dt=t&q=' + encodeURIComponent(text);
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const translated = json[0].map(item => item[0]).join('');
          resolve(translated);
        } catch (e) {
          console.error('Failed to parse translation for text:', text.substring(0, 50), e);
          resolve(text); // fallback to original
        }
      });
    }).on('error', (err) => {
      console.error('HTTP error in translation:', err);
      resolve(text);
    });
  });
}

// Translate a markdown document preserving code, links, images, comments
async function translateMarkdown(mdContent, targetLang, isDocSubdir = false) {
  const lines = mdContent.split(/\r?\n/);
  const outputLines = [];
  let inCodeBlock = false;
  let inComment = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check code blocks
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      outputLines.push(line);
      continue;
    }
    if (inCodeBlock) {
      outputLines.push(line);
      continue;
    }

    // Check HTML comments
    if (line.trim().startsWith('<!--')) {
      if (!line.includes('-->')) inComment = true;
      outputLines.push(line);
      continue;
    }
    if (inComment) {
      if (line.includes('-->')) inComment = false;
      outputLines.push(line);
      continue;
    }

    // Empty lines or horizontal rules or separators
    if (!line.trim() || line.trim() === '---' || line.trim() === '***') {
      outputLines.push(line);
      continue;
    }

    // Skip language navigation bars if already present
    if (line.includes('[English]') && (line.includes('[Português') || line.includes('[Español]'))) {
      continue;
    }

    // Protect elements with tokens
    const placeholders = [];

    // Protect badges: [![badge](url)](url)
    line = line.replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, (match) => {
      const idx = placeholders.length;
      placeholders.push(match);
      return `§§TOKEN_${idx}§§`;
    });

    // Protect images: ![alt](url)
    line = line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
      let finalUrl = url;
      if (isDocSubdir && !url.startsWith('http') && !url.startsWith('../') && !url.startsWith('/')) {
        finalUrl = '../' + url;
      }
      const idx = placeholders.length;
      placeholders.push(`![${alt}](${finalUrl})`);
      return `§§TOKEN_${idx}§§`;
    });

    // Protect inline code: `code`
    line = line.replace(/`([^`]+)`/g, (match) => {
      const idx = placeholders.length;
      placeholders.push(match);
      return `§§TOKEN_${idx}§§`;
    });

    // Protect links: [text](url) - translate text, preserve URL
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, txt, url) => {
      let finalUrl = url;
      if (isDocSubdir && !url.startsWith('http') && !url.startsWith('#') && !url.startsWith('../') && !url.startsWith('/')) {
        finalUrl = '../' + url;
      }
      const idx = placeholders.length;
      placeholders.push({ txt, url: finalUrl });
      return `§§LINK_${idx}§§`;
    });

    // Translate table row cells
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const isDivider = line.replace(/[\s|:-]/g, '').length === 0;
      if (isDivider) {
        outputLines.push(line);
        continue;
      }
      const cells = line.split('|');
      const translatedCells = [];
      for (let c = 0; c < cells.length; c++) {
        if (c === 0 || c === cells.length - 1) {
          translatedCells.push(cells[c]);
          continue;
        }
        let cellContent = cells[c].trim();
        if (!cellContent) {
          translatedCells.push(' ');
          continue;
        }
        const trans = await fetchTranslation(cellContent, targetLang);
        translatedCells.push(' ' + trans + ' ');
      }
      let resultLine = translatedCells.join('|');
      // restore tokens in table
      for (let p = 0; p < placeholders.length; p++) {
        if (typeof placeholders[p] === 'string') {
          resultLine = resultLine.replace(new RegExp(`§§\\s*TOKEN_${p}\\s*§§`, 'gi'), placeholders[p]);
        } else {
          const lk = placeholders[p];
          const transTxt = await fetchTranslation(lk.txt, targetLang);
          resultLine = resultLine.replace(new RegExp(`§§\\s*LINK_${p}\\s*§§`, 'gi'), `[${transTxt}](${lk.url})`);
        }
      }
      outputLines.push(resultLine);
      continue;
    }

    // Normal markdown line: preserve heading `#` or list prefix `- ` or `1. `
    let prefix = '';
    const headingMatch = line.match(/^(#{1,6}\s+)/);
    const listMatch = line.match(/^(\s*[-*+]\s+|\s*\d+\.\s+)/);
    const quoteMatch = line.match(/^(\s*>\s+)/);

    if (headingMatch) {
      prefix = headingMatch[1];
      line = line.substring(prefix.length);
    } else if (listMatch) {
      prefix = listMatch[1];
      line = line.substring(prefix.length);
    } else if (quoteMatch) {
      prefix = quoteMatch[1];
      line = line.substring(prefix.length);
    }

    let translated = await fetchTranslation(line, targetLang);

    // Unmask placeholders
    for (let p = 0; p < placeholders.length; p++) {
      if (typeof placeholders[p] === 'string') {
        translated = translated.replace(new RegExp(`§§\\s*TOKEN_${p}\\s*§§`, 'gi'), placeholders[p]);
      } else {
        const lk = placeholders[p];
        const transTxt = await fetchTranslation(lk.txt, targetLang);
        translated = translated.replace(new RegExp(`§§\\s*LINK_${p}\\s*§§`, 'gi'), `[${transTxt}](${lk.url})`);
      }
    }

    outputLines.push(prefix + translated);
  }

  return outputLines.join('\n');
}

module.exports = { fetchTranslation, translateMarkdown };
