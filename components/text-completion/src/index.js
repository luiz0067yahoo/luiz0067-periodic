/**
 * Registers the block using metadata loaded from `block.json`.
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from '../block.json';

/**
 * Register block type
 */
registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save: Save,
} );
