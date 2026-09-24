const path = require('path');
const fs = require('fs');

// Resolve esbuild and sass either locally or from sibling component
let esbuild, sass;
try {
  esbuild = require('esbuild');
} catch (e) {
  esbuild = require(path.resolve(__dirname, '../media-hotspot/node_modules/esbuild'));
}

try {
  sass = require('sass');
} catch (e) {
  sass = require(path.resolve(__dirname, '../media-hotspot/node_modules/sass'));
}

if (!fs.existsSync(path.resolve(__dirname, 'build'))) {
  fs.mkdirSync(path.resolve(__dirname, 'build'), { recursive: true });
}

function compileSass() {
  try {
    const styleResult = sass.compile(path.resolve(__dirname, 'src/style.scss'), { style: 'compressed' });
    fs.writeFileSync(path.resolve(__dirname, 'build/style-index.css'), styleResult.css);
    fs.writeFileSync(path.resolve(__dirname, 'build/style-index-rtl.css'), styleResult.css);
    console.log('✓ Compiled src/style.scss -> build/style-index.css & rtl');

    const editorResult = sass.compile(path.resolve(__dirname, 'src/editor.scss'), { style: 'compressed' });
    fs.writeFileSync(path.resolve(__dirname, 'build/index.css'), editorResult.css);
    fs.writeFileSync(path.resolve(__dirname, 'build/index-rtl.css'), editorResult.css);
    console.log('✓ Compiled src/editor.scss -> build/index.css & rtl');
  } catch (err) {
    console.error('Sass Compilation Error:', err);
  }
}

// esbuild plugin to map @wordpress/* imports to window.wp.*
const wpGlobalsPlugin = {
  name: 'wp-globals',
  setup(build) {
    build.onResolve({ filter: /^@wordpress\// }, args => {
      const moduleName = args.path.replace(/^@wordpress\//, '');
      const camelCaseMap = {
        'block-editor': 'blockEditor',
        'blocks': 'blocks',
        'element': 'element',
        'components': 'components',
        'i18n': 'i18n',
        'data': 'data',
        'compose': 'compose'
      };
      const varName = camelCaseMap[moduleName] || moduleName;
      return { path: args.path, namespace: 'wp-global', pluginData: { varName } };
    });

    build.onResolve({ filter: /^react$/ }, args => {
      return { path: args.path, namespace: 'wp-global', pluginData: { varName: 'element' } };
    });

    build.onLoad({ filter: /.*/, namespace: 'wp-global' }, args => {
      return {
        contents: `module.exports = window.wp.${args.pluginData.varName};`,
        loader: 'js',
      };
    });
  },
};

async function run() {
  compileSass();

  await esbuild.build({
    entryPoints: [path.resolve(__dirname, 'src/index.js')],
    bundle: true,
    outfile: path.resolve(__dirname, 'build/index.js'),
    format: 'iife',
    plugins: [wpGlobalsPlugin],
    loader: { '.js': 'jsx', '.json': 'json', '.scss': 'empty' },
    target: ['es2020'],
  });

  await esbuild.build({
    entryPoints: [path.resolve(__dirname, 'src/view.js')],
    bundle: true,
    outfile: path.resolve(__dirname, 'build/view.js'),
    format: 'iife',
    target: ['es2020'],
  });

  const assetHash = Date.now().toString(36);
  fs.writeFileSync(
    path.resolve(__dirname, 'build/index.asset.php'),
    `<?php return array('dependencies' => array('react', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n'), 'version' => '${assetHash}');\n`
  );
  fs.writeFileSync(
    path.resolve(__dirname, 'build/view.asset.php'),
    `<?php return array('dependencies' => array(), 'version' => '${assetHash}');\n`
  );

  console.log('✓ Successfully built build/index.js and build/view.js with asset hash ' + assetHash);

  // If not running under root build-zip, update root luiz0067-periodic.zip
  if (!process.env.PERIODIC_BUILD_ROOT) {
    const rootZipScript = path.resolve(__dirname, '../../scripts/build-zip.js');
    if (fs.existsSync(rootZipScript)) {
      try {
        console.log('📦 Atualizando pacote luiz0067-periodic.zip...');
        require('child_process').execSync('node scripts/build-zip.js', {
          cwd: path.resolve(__dirname, '../..'),
          stdio: 'inherit',
          env: { ...process.env, PERIODIC_BUILD_ROOT: '1' }
        });
      } catch (e) {
        console.warn('Aviso: Falha ao atualizar luiz0067-periodic.zip:', e.message);
      }
    }
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
