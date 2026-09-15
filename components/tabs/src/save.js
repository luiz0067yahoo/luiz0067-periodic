import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { tabStyle, tabAlignment, activeColor, tabs } = attributes;

	if ( ! tabs || tabs.length === 0 ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: `periodic-tabs-block periodic-tabs-${ tabStyle } periodic-alignment-${ tabAlignment }`,
		style: activeColor ? { '--periodic-tab-active-color': activeColor } : undefined,
	} );

	const toggleType = tabStyle === 'pills' ? 'pill' : 'tab';

	return (
		<div { ...blockProps }>
			<div
				className={ `periodic-tabs-wrapper ${
					tabAlignment === 'vertical' ? 'd-md-flex align-items-start' : ''
				}` }
			>
				{ /* Navegação de Abas */ }
				{ tabAlignment === 'vertical' ? (
					<div
						className={ `nav flex-column ${
							tabStyle === 'pills' ? 'nav-pills' : 'nav-tabs'
						} me-md-4 mb-3 mb-md-0` }
						role="tablist"
						aria-orientation="vertical"
					>
						{ tabs.map( ( tab, index ) => {
							const isFirst = index === 0;
							const btnId = `tab-btn-${ tab.id }`;
							const paneId = `tab-pane-${ tab.id }`;

							return (
								<button
									key={ tab.id }
									className={ `nav-link ${ isFirst ? 'active' : '' }` }
									id={ btnId }
									data-bs-toggle={ toggleType }
									data-bs-target={ `#${ paneId }` }
									type="button"
									role="tab"
									aria-controls={ paneId }
									aria-selected={ isFirst ? 'true' : 'false' }
								>
									{ tab.icon && <i className={ `${ tab.icon } me-2` }></i> }
									<span className="periodic-tab-title-text">{ tab.title }</span>
								</button>
							);
						} ) }
					</div>
				) : (
					<ul
						className={ `nav ${
							tabStyle === 'pills' ? 'nav-pills' : 'nav-tabs'
						} mb-3` }
						role="tablist"
					>
						{ tabs.map( ( tab, index ) => {
							const isFirst = index === 0;
							const btnId = `tab-btn-${ tab.id }`;
							const paneId = `tab-pane-${ tab.id }`;

							return (
								<li key={ tab.id } className="nav-item" role="presentation">
									<button
										className={ `nav-link ${ isFirst ? 'active' : '' }` }
										id={ btnId }
										data-bs-toggle={ toggleType }
										data-bs-target={ `#${ paneId }` }
										type="button"
										role="tab"
										aria-controls={ paneId }
										aria-selected={ isFirst ? 'true' : 'false' }
									>
										{ tab.icon && <i className={ `${ tab.icon } me-2` }></i> }
										<span className="periodic-tab-title-text">{ tab.title }</span>
									</button>
								</li>
							);
						} ) }
					</ul>
				) }

				{ /* Painéis de Conteúdo */ }
				<div
					className={ `tab-content periodic-tab-content ${
						tabAlignment === 'vertical' ? 'flex-grow-1' : ''
					}` }
				>
					{ tabs.map( ( tab, index ) => {
						const isFirst = index === 0;
						const btnId = `tab-btn-${ tab.id }`;
						const paneId = `tab-pane-${ tab.id }`;

						return (
							<div
								key={ tab.id }
								className={ `tab-pane fade ${ isFirst ? 'show active' : '' }` }
								id={ paneId }
								role="tabpanel"
								aria-labelledby={ btnId }
								tabIndex="0"
							>
								<RichText.Content
									tagName="div"
									className="periodic-tab-pane-inner"
									value={ tab.contentHtml }
								/>
							</div>
						);
					} ) }
				</div>
			</div>
		</div>
	);
}
