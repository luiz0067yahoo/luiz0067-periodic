import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import metadata from '../block.json';
import Edit from './edit';
import save from './save';

/**
 * Registra o bloco Gutenberg periodic/timeline-vertical.
 */
registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
