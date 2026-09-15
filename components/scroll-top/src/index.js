import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import metadata from '../block.json';
import Edit from './edit';
import save from './save';

/**
 * Registro oficial do bloco Gutenberg periodic/scroll-top.
 */
registerBlockType( metadata.name, {
	/**
	 * Componente de edição no editor Gutenberg com preview e abas de customização.
	 */
	edit: Edit,

	/**
	 * Componente de renderização HTML estática com data-attributes e classes de suporte.
	 */
	save,
} );
