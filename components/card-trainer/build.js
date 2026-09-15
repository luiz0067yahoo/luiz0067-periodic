/**
 * Build script for periodic-card-trainer
 */
const esbuild = require('esbuild');
const sass = require('sass');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const buildDir = path.resolve(__dirname, 'build');

if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Map @wordpress packages to wp.* globals
const wpExternalsPlugin = {
  name: 'wp-externals',
  setup(build) {
    build.onResolve({ filter: /^@wordpress\// }, (args) => {
      return { path: args.path, namespace: 'wp-external' };
    });

    build.onLoad({ filter: /.*/, namespace: 'wp-external' }, (args) => {
      const pkg = args.path.replace('@wordpress/', '');
      const camelPkg = pkg.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return {
        contents: `module.exports = window.wp ? window.wp.${camelPkg} : {};`,
        loader: 'js',
      };
    });
  },
};

async function build() {
  console.log('📦 Compiling Periodic Card Trainer assets...');

  // 1. Compile SCSS files
  try {
    const styleResult = sass.compile(path.resolve(__dirname, 'src/style.scss'), {
      style: 'compressed',
    });
    fs.writeFileSync(path.resolve(buildDir, 'style-index.css'), styleResult.css);

    const editorResult = sass.compile(path.resolve(__dirname, 'src/editor.scss'), {
      style: 'compressed',
    });
    fs.writeFileSync(path.resolve(buildDir, 'index.css'), editorResult.css);
    console.log('✓ SCSS styles compiled');
  } catch (err) {
    console.error('Error compiling SCSS:', err);
  }

  // 2. Compile index.js (Editor bundle)
  try {
    await esbuild.build({
      entryPoints: [path.resolve(__dirname, 'src/index.js')],
      outfile: path.resolve(buildDir, 'index.js'),
      bundle: true,
      minify: !isWatch,
      sourcemap: true,
      format: 'iife',
      jsxFactory: 'wp.element.createElement',
      jsxFragment: 'wp.element.Fragment',
      plugins: [wpExternalsPlugin],
      loader: {
        '.js': 'jsx',
        '.json': 'json',
        '.scss': 'empty',
      },
    });

    // Write index.asset.php for WordPress dependencies
    const assetContent = `<?php return array('dependencies' => array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'), 'version' => '${Date.now()}');`;
    fs.writeFileSync(path.resolve(buildDir, 'index.asset.php'), assetContent);
    console.log('✓ Editor bundle (index.js) compiled');
  } catch (err) {
    console.error('Error compiling index.js:', err);
  }

  // 3. Compile view.js (Frontend bundle)
  try {
    await esbuild.build({
      entryPoints: [path.resolve(__dirname, 'src/view.js')],
      outfile: path.resolve(buildDir, 'view.js'),
      bundle: true,
      minify: !isWatch,
      sourcemap: true,
      format: 'iife',
      loader: {
        '.json': 'json',
      },
    });

    // Write view.asset.php
    const viewAssetContent = `<?php return array('dependencies' => array(), 'version' => '${Date.now()}');`;
    fs.writeFileSync(path.resolve(buildDir, 'view.asset.php'), viewAssetContent);
    console.log('✓ Frontend bundle (view.js) compiled');
  } catch (err) {
    console.error('Error compiling view.js:', err);
  }

  console.log('🎉 Build complete!');
}

build();
