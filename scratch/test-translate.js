const https = require('https');

function translateText(text, targetLang) {
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
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function test() {
  const sample = 'Implementa a estrutura semântica `.accordion` e `.accordion-header`. Veja [a documentação](https://example.com) para mais detalhes.';
  
  const placeholders = [];
  // Mask inline code
  let masked = sample.replace(/`([^`]+)`/g, (match) => {
    const idx = placeholders.length;
    placeholders.push(match);
    return `§§CODE_${idx}§§`;
  });
  
  // Mask links
  masked = masked.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, txt, url) => {
    const idx = placeholders.length;
    placeholders.push(url);
    return `[${txt}](§§URL_${idx}§§)`;
  });

  console.log('Masked:', masked);
  const translated = await translateText(masked, 'en');
  console.log('Translated raw:', translated);

  let unmasked = translated;
  for (let i = 0; i < placeholders.length; i++) {
    // Note: Google translate may add spaces or alter cases of placeholders, so use regex with flexible spaces
    unmasked = unmasked.replace(new RegExp(`§§\\s*CODE_${i}\\s*§§`, 'gi'), placeholders[i]);
    unmasked = unmasked.replace(new RegExp(`§§\\s*URL_${i}\\s*§§`, 'gi'), placeholders[i]);
  }
  console.log('Final unmasked:', unmasked);
}

test();
