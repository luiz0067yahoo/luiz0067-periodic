import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		heightDesktop,
		heightTablet,
		heightMobile,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		dividerStyle,
		dividerColor,
		dividerThickness,
		dividerWidth,
		dividerAlign,
		dividerIcon,
	} = attributes;

	const visibilityClasses = [
		hideOnDesktop ? 'd-lg-none' : '',
		hideOnTablet ? 'd-md-none-tablet' : '',
		hideOnMobile ? 'd-none d-sm-block' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps.save( {
		className: `periodic-advanced-spacer-block ${ visibilityClasses }`,
		style: {
			'--periodic-spacer-desktop': `${ heightDesktop }px`,
			'--periodic-spacer-tablet': `${ heightTablet }px`,
			'--periodic-spacer-mobile': `${ heightMobile }px`,
			'--periodic-divider-color': dividerColor,
			'--periodic-divider-thickness': `${ dividerThickness }px`,
			'--periodic-divider-width': `${ dividerWidth }%`,
		},
	} );

	const alignClass =
		dividerAlign === 'start'
			? 'justify-content-start'
			: dividerAlign === 'end'
			? 'justify-content-end'
			: 'justify-content-center';

	return (
		<div { ...blockProps } aria-hidden="true">
			<div className={ `periodic-spacer-inner d-flex align-items-center ${ alignClass }` }>
				{ dividerStyle !== 'none' && (
					<div className={ `periodic-spacer-divider style-${ dividerStyle } has-icon-${ dividerIcon }` }>
						<span className="periodic-divider-line line-left" />
						{ dividerIcon !== 'none' && (
							<span className="periodic-divider-icon">
								{ dividerIcon === 'star' && '★' }
								{ dividerIcon === 'diamond' && '◆' }
								{ dividerIcon === 'circle' && '●' }
							</span>
						) }
						{ dividerIcon !== 'none' && <span className="periodic-divider-line line-right" /> }
					</div>
				) }
			</div>
		</div>
	);
}
