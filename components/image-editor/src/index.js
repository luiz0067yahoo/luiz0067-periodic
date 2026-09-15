import { registerBlockType } from '@wordpress/blocks';
import metadata from '../block.json';
import Edit from './edit';
import save from './save';
import './style.scss';

const editorIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
		fill="currentColor"
	>
		<path d="M21 3H3C2 3 1 4 1 5v14c0 1 1 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"/>
		<circle cx="8" cy="8.5" r="1.5"/>
	</svg>
);

registerBlockType( metadata.name, {
	...metadata,
	icon: editorIcon,
	edit: Edit,
	save,
} );
