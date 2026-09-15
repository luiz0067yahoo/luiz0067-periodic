import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		testimonials,
		layoutMode,
		columns,
		cardBgColor,
		cardTextColor,
		starColor,
		showRating,
		showQuoteIcon,
		cardShadow,
		cardBorderRadius,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'periodic-testimonials-block-wrapper',
	});

	// Determinação das classes de coluna do Bootstrap 5
	const getColumnClass = () => {
		if (layoutMode === 'single-card') {
			return 'col-12 col-md-10 col-lg-8 mx-auto';
		}
		switch (columns) {
			case 1:
				return 'row-cols-1';
			case 2:
				return 'row-cols-1 row-cols-md-2';
			case 4:
				return 'row-cols-1 row-cols-md-2 row-cols-lg-4';
			case 3:
			default:
				return 'row-cols-1 row-cols-md-2 row-cols-lg-3';
		}
	};

	return (
		<div {...blockProps}>
			<div className="container-fluid px-0">
				<div
					className={`row ${
						layoutMode === 'grid'
							? `${getColumnClass()} g-4`
							: 'justify-content-center'
					}`}
				>
					{testimonials &&
						testimonials.map((item, index) => {
							const isSingleCard = layoutMode === 'single-card';
							const colClass = isSingleCard ? 'col-12 col-md-10 col-lg-8' : 'col';
							const ratingValue = item.rating || 5;

							return (
								<div key={item.id || index} className={colClass}>
									<div
										className={`card h-100 periodic-testimonial-card ${
											cardShadow ? 'shadow-sm' : ''
										}`}
										style={{
											backgroundColor: cardBgColor,
											color: cardTextColor,
											borderRadius: `${cardBorderRadius}px`,
										}}
									>
										<div className="card-body d-flex flex-column p-4">
											{/* Cabeçalho do Card: Aspas e Estrelas */}
											<div className="d-flex justify-content-between align-items-center mb-3">
												{showQuoteIcon && (
													<div className="periodic-quote-icon-box">
														<i className="fas fa-quote-left fa-2x opacity-25" />
													</div>
												)}
												{showRating && (
													<div
														className="periodic-star-rating d-flex gap-1 ms-auto"
														aria-label={`Avaliação: ${ratingValue} de 5 estrelas`}
													>
														{[1, 2, 3, 4, 5].map((starNum) => (
															<i
																key={starNum}
																className={`${
																	starNum <= ratingValue ? 'fas' : 'far'
																} fa-star`}
																style={{ color: starColor || '#ffc107' }}
															/>
														))}
													</div>
												)}
											</div>

											{/* Depoimento / Citação */}
											<div className="mb-4 flex-grow-1">
												<RichText.Content
													tagName="blockquote"
													className="card-text periodic-testimonial-quote fst-italic mb-0"
													value={item.quote}
												/>
											</div>

											{/* Rodapé do Card: Avatar e Metadados do Autor */}
											<div className="d-flex align-items-center pt-3 border-top border-light-subtle">
												<div className="periodic-avatar-container me-3 flex-shrink-0">
													{item.avatarUrl ? (
														<img
															src={item.avatarUrl}
															alt={item.authorName || 'Autor do depoimento'}
															className="rounded-circle periodic-avatar-img"
															loading="lazy"
														/>
													) : (
														<div className="rounded-circle bg-light border d-flex align-items-center justify-content-center text-muted periodic-avatar-placeholder">
															<i className="fas fa-user fa-lg" />
														</div>
													)}
												</div>

												<div className="periodic-author-meta flex-grow-1">
													<RichText.Content
														tagName="h5"
														className="card-title fw-bold mb-1 fs-6 periodic-author-name"
														value={item.authorName}
													/>
													<RichText.Content
														tagName="div"
														className="text-muted small periodic-author-role"
														value={item.authorRole}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
