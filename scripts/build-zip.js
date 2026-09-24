/**
 * Clean & Build Production ZIP for Periodic Component Suite
 * Generates luiz0067-periodic.zip without bloated files (node_modules, screenshots, package-lock, etc.)
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const stageRoot = path.join(rootDir, '.build-tmp');
const pluginFolder = 'luiz0067-periodic';
const stagePluginDir = path.join(stageRoot, pluginFolder);
const targetZip = path.join(rootDir, 'luiz0067-periodic.zip');

console.log('=======================================================');
console.log('🚀 Iniciando Build & Empacotamento Limpo do Plugin');
console.log('=======================================================');

// 1. Build component assets if needed
const simulatorDir = path.join(rootDir, 'components', 'interative-software-simulator');
if (fs.existsSync(path.join(simulatorDir, 'build.js'))) {
  try {
    console.log('📦 Compilando assets do interative-software-simulator...');
    execSync('node build.js', {
      cwd: simulatorDir,
      stdio: 'inherit',
      env: { ...process.env, PERIODIC_BUILD_ROOT: '1' }
    });
  } catch (err) {
    console.warn('Aviso: Falha ao compilar interative-software-simulator:', err.message);
  }
}

// 2. Clean temporary/staging directories
console.log('🧹 Limpando diretórios temporários...');
if (fs.existsSync(stageRoot)) {
  fs.rmSync(stageRoot, { recursive: true, force: true });
}
fs.mkdirSync(stagePluginDir, { recursive: true });

// 3. Filter criteria for clean package
function shouldExclude(relPath) {
  const norm = relPath.replace(/\\/g, '/');

  // Directories to ignore
  if (
    norm.startsWith('.git') ||
    norm.startsWith('scratch') ||
    norm.startsWith('dist-') ||
    norm.startsWith('docs') ||
    norm.startsWith('extras') ||
    norm.startsWith('scripts')
  ) {
    return true;
  }

  // node_modules
  if (norm.includes('/node_modules/') || norm.includes('node_modules')) {
    return true;
  }

  // Screenshots and doc images
  if (
    norm.includes('/screenshots/') ||
    norm.includes('screenshots') ||
    /screenshot(-\d+)?\.(png|jpg|jpeg)$/i.test(norm)
  ) {
    return true;
  }

  // package-lock.json (heavy, not needed in WP runtime)
  if (path.basename(norm) === 'package-lock.json') {
    return true;
  }

  // Nested archives
  if (norm.endsWith('.zip')) {
    return true;
  }

  // Source maps
  if (norm.endsWith('.map')) {
    return true;
  }

  // Standalone test html files
  if (/test-.*\.html$/i.test(norm)) {
    return true;
  }

  // Batch / Shell scripts
  if (norm.endsWith('.bat') || norm.endsWith('.ps1') || norm.endsWith('.sh')) {
    return true;
  }

  // OS / IDE artifacts
  if (
    norm.includes('.vscode') ||
    norm.includes('.idea') ||
    norm.endsWith('.DS_Store') ||
    norm.endsWith('Thumbs.db')
  ) {
    return true;
  }

  return false;
}

function copyClean(srcDir, destDir) {
  const items = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const item of items) {
    const srcPath = path.join(srcDir, item.name);
    const relPath = path.relative(rootDir, srcPath);

    if (shouldExclude(relPath)) {
      continue;
    }

    const destPath = path.join(destDir, item.name);
    if (item.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyClean(srcPath, destPath);
    } else if (item.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📂 Copiando arquivos essenciais de produção...');
const topLevelIncludes = [
  'periodic.php',
  'readme.txt',
  'README.md',
  'LICENSE',
  'core',
  'shared',
  'components'
];

for (const name of topLevelIncludes) {
  const srcPath = path.join(rootDir, name);
  if (!fs.existsSync(srcPath)) continue;

  const stat = fs.statSync(srcPath);
  const destPath = path.join(stagePluginDir, name);

  if (stat.isDirectory()) {
    fs.mkdirSync(destPath, { recursive: true });
    copyClean(srcPath, destPath);
  } else if (stat.isFile()) {
    fs.copyFileSync(srcPath, destPath);
  }
}

// 4. Compactação do ZIP
console.log('🗜️  Gerando luiz0067-periodic.zip otimizado...');
if (fs.existsSync(targetZip)) {
  try {
    fs.unlinkSync(targetZip);
  } catch (_) {}
}

const tempPs = path.join(stageRoot, 'makezip.ps1');
const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory('${stagePluginDir.replace(/'/g, "''")}', '${targetZip.replace(/'/g, "''")}', [System.IO.Compression.CompressionLevel]::Optimal, $true)
`;
fs.writeFileSync(tempPs, psScript);
execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${tempPs}"`, {
  stdio: 'inherit'
});

// 5. Limpeza do staging
if (fs.existsSync(stageRoot)) {
  try {
    fs.rmSync(stageRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 250 });
  } catch (err) {
    // Ignora erro se algum processo temporário estiver liberando o diretório
  }
}

// 6. Relatório de tamanho
if (fs.existsSync(targetZip)) {
  const sizeBytes = fs.statSync(targetZip).size;
  const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);
  console.log('=======================================================');
  console.log(`✅ SUCESSO! Pacote gerado: luiz0067-periodic.zip (${sizeMB} MB)`);
  console.log('🎉 Redução massiva de ~56.8 MB para ~' + sizeMB + ' MB!');
  console.log('=======================================================');
} else {
  console.error('❌ Erro: luiz0067-periodic.zip não foi gerado.');
  process.exit(1);
}
