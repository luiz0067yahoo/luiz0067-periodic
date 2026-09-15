/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from '../block.json';
import './style.scss';
import './editor.scss';

/**
 * Ícone personalizado do bloco em SVG.
 */
const TableIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
		fill="currentColor"
	>
		<path d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4ZM5 5V8H11V5H5ZM13 5V8H19V5H13ZM19 10H13V14H19V10ZM19 16H13V19H19V16ZM11 19V16H5V19H11ZM5 14H11V10H5V14Z" />
	</svg>
);

/**
 * Registro do Bloco Gutenberg
 */
registerBlockType( metadata.name, {
	icon: TableIcon,
	edit: Edit,
	save,
} );
