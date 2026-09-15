import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { renderSvgShape } from './shapes';

export default function save( { attributes } ) {
	const {
		enableTopShape,
		topShapeType,
		topShapeColor,
		topShapeHeight,
		topShapeFlipH,
		topShapeInvert,
		topShapeOpacity,
		topShapeZIndex,
		enableBottomShape,
		bottomShapeType,
		bottomShapeColor,
		bottomShapeHeight,
		bottomShapeFlipH,
		bottomShapeInvert,
		bottomShapeOpacity,
		bottomShapeZIndex,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerType,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'periodic-custom-shapes-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
	} );

	const getTopTransform = () => {
		const scaleX = topShapeFlipH ? -1 : 1;
		const scaleY = topShapeInvert ? -1 : 1;
		return `scale(${ scaleX }, ${ scaleY })`;
	};

	const getBottomTransform = () => {
		const scaleX = bottomShapeFlipH ? -1 : 1;
		const scaleY = bottomShapeInvert ? -1 : 1;
		return `scale(${ scaleX }, ${ scaleY })`;
	};

	return (
		<div { ...blockProps }>
			{ enableTopShape && (
				<div
					className="periodic-shape-divider periodic-shape-top"
					style={ {
						height: `${ topShapeHeight }px`,
						transform: getTopTransform(),
						opacity: topShapeOpacity,
						zIndex: topShapeZIndex,
					} }
				>
					{ renderSvgShape( topShapeType, topShapeColor ) }
				</div>
			) }

			<div className="periodic-shape-content-wrapper">
				{ containerType !== 'none' ? (
					<div className={ containerType }>
						<InnerBlocks.Content />
					</div>
				) : (
					<div className="w-100">
						<InnerBlocks.Content />
					</div>
				) }
			</div>

			{ enableBottomShape && (
				<div
					className="periodic-shape-divider periodic-shape-bottom"
					style={ {
						height: `${ bottomShapeHeight }px`,
						transform: getBottomTransform(),
						opacity: bottomShapeOpacity,
						zIndex: bottomShapeZIndex,
					} }
				>
					{ renderSvgShape( bottomShapeType, bottomShapeColor ) }
				</div>
			) }
		</div>
	);
}
