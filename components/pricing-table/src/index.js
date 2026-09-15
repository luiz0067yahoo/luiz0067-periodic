/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from '../block.json';
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

/**
 * Registra o bloco 'periodic/pricing-table'
 */
registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save,
} );
