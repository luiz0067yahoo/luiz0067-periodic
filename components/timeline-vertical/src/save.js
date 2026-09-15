import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		events = [],
		alignment = 'alternating',
		primaryColor = '#0d6efd',
		lineColor = '#dee2e6',
		connectorStyle = 'solid',
		badgeBgColor = '#0d6efd',
		badgeTextColor = '#ffffff',
		showIcons = true,
		cardShadow = true,
		cardBorder = true,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `periodic-timeline-vertical is-${ alignment } ${
			alignment === 'left' ? 'is-left-aligned' : ''
		}`,
		style: {
			'--timeline-primary-color': primaryColor,
			'--timeline-line-color': lineColor,
			'--timeline-connector-style': connectorStyle,
			'--timeline-badge-bg': badgeBgColor,
			'--timeline-badge-color': badgeTextColor,
		},
	} );

	return (
		<div { ...blockProps }>
			{ events.map( ( event, index ) => {
				const isEven = index % 2 === 0;
				const itemSideClass =
					alignment === 'alternating'
						? isEven
							? 'is-left'
							: 'is-right'
						: 'is-single-left';

				return (
					<div
						key={ event.id || index }
						className={ `timeline-item ${ itemSideClass }` }
					>
						<div
							className="timeline-badge"
							style={ {
								backgroundColor:
									event.badgeColor || badgeBgColor,
								color: event.badgeTextColor || badgeTextColor,
							} }
						>
							{ showIcons && (
								<i
									className={
										event.icon || 'fa-solid fa-calendar'
									}
									aria-hidden="true"
								/>
							) }
						</div>

						<div className="timeline-card-wrapper">
							<div
								className={ `timeline-card card ${
									cardShadow ? 'has-shadow shadow-sm' : ''
								} ${ ! cardBorder ? 'border-0' : '' }` }
							>
								<span className="timeline-arrow" aria-hidden="true" />
								<div className="card-body">
									<div className="timeline-date-container">
										{ event.date && (
											<RichText.Content
												tagName="span"
												className="timeline-date"
												value={ event.date }
											/>
										) }
										{ event.tag && (
											<RichText.Content
												tagName="span"
												className="badge bg-secondary timeline-tag"
												value={ event.tag }
											/>
										) }
									</div>

									{ event.title && (
										<RichText.Content
											tagName="h4"
											className="timeline-title"
											value={ event.title }
										/>
									) }

									{ event.description && (
										<RichText.Content
											tagName="p"
											className="timeline-description"
											value={ event.description }
										/>
									) }
								</div>
							</div>
						</div>

						{ alignment === 'alternating' && (
							<div className="timeline-empty-spacer" aria-hidden="true" />
						) }
					</div>
				);
			} ) }
		</div>
	);
}
