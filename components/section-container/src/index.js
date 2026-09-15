/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import Edit from './edit';
import save from './save';
import metadata from '../block.json';

/**
 * Register block type
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
