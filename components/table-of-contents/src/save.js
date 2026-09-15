import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		title,
		includeH2,
		includeH3,
		includeH4,
		listType,
		visualTheme,
		isCollapsible,
		initialCollapsedMobile,
		scrollOffset,
		enableScrollspy,
		primaryColor,
		backgroundColor,
		borderRadius,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `periodic-toc-block theme-${ visualTheme } list-${ listType }`,
		style: {
			'--periodic-toc-primary': primaryColor,
			'--periodic-toc-bg': backgroundColor,
			'--periodic-toc-radius': `${ borderRadius }px`,
		},
		'data-include-h2': includeH2 ? '1' : '0',
		'data-include-h3': includeH3 ? '1' : '0',
		'data-include-h4': includeH4 ? '1' : '0',
		'data-scroll-offset': scrollOffset,
		'data-scrollspy': enableScrollspy ? '1' : '0',
		'data-collapsible': isCollapsible ? '1' : '0',
		'data-collapsed-mobile': initialCollapsedMobile ? '1' : '0',
	} );

	return (
		<nav { ...blockProps } aria-label={ title || 'Índice de Conteúdo' }>
			<div className="periodic-toc-header d-flex justify-content-between align-items-center mb-3">
				<div className="d-flex align-items-center gap-2">
					<svg
						className="periodic-toc-icon"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<line x1="8" y1="6" x2="21" y2="6"></line>
						<line x1="8" y1="12" x2="21" y2="12"></line>
						<line x1="8" y1="18" x2="21" y2="18"></line>
						<line x1="3" y1="6" x2="3.01" y2="6"></line>
						<line x1="3" y1="12" x2="3.01" y2="12"></line>
						<line x1="3" y1="18" x2="3.01" y2="18"></line>
					</svg>
					<RichText.Content
						tagName="h4"
						className="periodic-toc-title m-0 fw-bold"
						value={ title }
					/>
				</div>

				{ isCollapsible && (
					<button
						type="button"
						className="btn btn-sm btn-link periodic-toc-toggle p-0 text-decoration-none"
						aria-label="Recolher ou expandir sumário"
					>
						<svg
							className="periodic-toc-chevron"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
				) }
			</div>

			<div className="periodic-toc-body">
				<ul className="periodic-toc-list m-0 p-0" />
			</div>
		</nav>
	);
}
