import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from '../block.json';

import './style.scss';
import './editor.scss';

/**
 * Registra o bloco Gutenberg Periodic Modal Popup.
 */
registerBlockType( metadata.name, {
	...metadata,
	edit,
	save,
} );
