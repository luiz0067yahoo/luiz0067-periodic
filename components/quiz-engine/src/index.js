/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled, together with a stylesheet
 * referenced in `block.json`, into the `build/style-index.css` file.
 * All other files are bundled into `build/index.css`.
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
 * Register the block type
 */
registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save: Save,
} );
