import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import metadata from '../block.json';
import Edit from './edit';
import save from './save';

/**
 * Registro oficial do bloco Gutenberg periodic/gallery-lightbox.
 */
registerBlockType( metadata.name, {
	/**
	 * Componente de edição interativa no Gutenberg.
	 */
	edit: Edit,

	/**
	 * Renderização e salvamento da estrutura estática HTML.
	 */
	save,
} );
