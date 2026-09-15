import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		imageUrl,
		imageAlt,
		zoom = 1,
		rotation = 0,
		positionX = 0,
		positionY = 0,
		containerHeight = '450px',
		objectFit = 'cover',
		borderRadius = 'rounded-3',
		boxShadow = 'shadow-sm',
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'periodic-image-editor-container',
	} );

	if ( ! imageUrl ) {
		return null;
	}

	const transformStyle = {
		transform: `translate(${ positionX }px, ${ positionY }px) scale(${ zoom }) rotate(${ rotation }deg)`,
		transformOrigin: 'center center',
		objectFit,
		width: '100%',
		height: '100%',
	};

	return (
		<div { ...blockProps }>
			<div
				className={ `periodic-image-frame position-relative overflow-hidden ${ borderRadius } ${ boxShadow } d-flex justify-content-center align-items-center` }
				style={ {
					height: containerHeight,
					width: '100%',
					backgroundColor: '#000000',
				} }
			>
				<img
					src={ imageUrl }
					alt={ imageAlt || '' }
					style={ transformStyle }
					className="periodic-transformed-img img-fluid"
					loading="lazy"
				/>
			</div>
		</div>
	);
}
