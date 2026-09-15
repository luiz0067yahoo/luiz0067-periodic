import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import metadata from '../block.json';
import Edit from './edit';
import save from './save';

/**
 * Registro oficial do bloco Gutenberg periodic/team-member.
 */
registerBlockType( metadata.name, {
	/**
	 * Componente de edição no editor Gutenberg com abas e WYSIWYG.
	 */
	edit: Edit,

	/**
	 * Componente de renderização HTML estática.
	 */
	save,
} );
