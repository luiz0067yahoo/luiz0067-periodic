/**
 * Clean temporary directories and staging files
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dirsToClean = [
  path.join(rootDir, '.build-tmp'),
  path.join(rootDir, 'dist-zip-stage')
];

console.log('🧹 Limpando arquivos e diretórios temporários...');

for (const dir of dirsToClean) {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✓ Removido: ${path.relative(rootDir, dir)}`);
    } catch (err) {
      console.warn(`! Não foi possível remover ${dir}: ${err.message}`);
    }
  }
}

console.log('✓ Clean concluído com sucesso!');
