import { registerBlockType } from '@wordpress/blocks';
import metadata from '../block.json';
import Edit from './edit';
import save from './save';
import './style.css';
import './editor.css';

registerBlockType(metadata.name, {
  ...metadata,
  icon: {
    src: (
      <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm-5 0h3v3h-3v-3zm2 5h3v3h-3v-3zm3 0h3v3h-3v-3z" />
      </svg>
    ),
    foreground: '#3b82f6'
  },
  edit: Edit,
  save
});
