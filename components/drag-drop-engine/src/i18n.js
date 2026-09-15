import ptBR from '../languages/pt-br.json';
import enUS from '../languages/en-us.json';
import itIT from '../languages/It.json';
import esES from '../languages/es.json';

const translations = {
  'pt-BR': ptBR,
  'pt': ptBR,
  'en-US': enUS,
  'en': enUS,
  'it-IT': itIT,
  'it': itIT,
  'es-ES': esES,
  'es': esES,
};

export function getLocale() {
  if (typeof document !== 'undefined') {
    const htmlLang = document.documentElement.lang || 'pt-BR';
    const clean = htmlLang.replace('_', '-');
    if (translations[clean]) return clean;
    const short = clean.split('-')[0];
    if (translations[short]) return short;
  }
  return 'pt-BR';
}

export function getTranslation(locale = null) {
  const activeLocale = locale || getLocale();
  return translations[activeLocale] || translations['pt-BR'];
}

export default translations;
