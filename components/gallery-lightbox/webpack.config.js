const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * Configuração do Webpack estendendo o padrão do @wordpress/scripts
 * para compilar com fidelidade tanto src/index.js quanto src/view.js -> build/view.js.
 */
module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		view: './src/view.js',
	},
};
