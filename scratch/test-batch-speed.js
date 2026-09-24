const https = require('https');
const fs = require('fs');

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

(async () => {
  const t0 = Date.now();
  const sample = `Parágrafo um de teste para verificar a velocidade da tradução.

Parágrafo dois contendo mais detalhes sobre o bloco de simulação e WordPress Gutenberg.

Parágrafo três testando termos técnicos e integridade de formatação.`;

  const res = await fetchTranslation(sample, 'en');
  console.log('Time:', Date.now() - t0, 'ms');
  console.log('Result:\n', res);
})();
