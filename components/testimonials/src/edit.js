import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TabPanel,
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPalette,
	BaseControl,
	Tooltip,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
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

	const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);

	const blockProps = useBlockProps({
		className: 'periodic-testimonials-block-wrapper',
	});

	// Adiciona novo depoimento
	const addTestimonial = () => {
		const newTestimonials = [
			...testimonials,
			{
				id: `testimonial-${Date.now()}`,
				quote: __('Digite aqui o depoimento ou citação com suas próprias palavras.', 'periodic-testimonials'),
				authorName: __('Nome do Cliente', 'periodic-testimonials'),
				authorRole: __('Cargo ou Empresa', 'periodic-testimonials'),
				avatarUrl: '',
				avatarId: null,
				rating: 5,
			},
		];
		setAttributes({ testimonials: newTestimonials });
		setSelectedTestimonialIndex(newTestimonials.length - 1);
	};

	// Atualiza um campo específico de um depoimento
	const updateTestimonial = (index, field, value) => {
		const newTestimonials = testimonials.map((item, i) => {
			if (i === index) {
				return { ...item, [field]: value };
			}
			return item;
		});
		setAttributes({ testimonials: newTestimonials });
	};

	// Remove um depoimento
	const removeTestimonial = (index) => {
		if (testimonials.length <= 1) {
			alert(__('É necessário manter pelo menos um depoimento.', 'periodic-testimonials'));
			return;
		}
		const newTestimonials = testimonials.filter((_, i) => i !== index);
		setAttributes({ testimonials: newTestimonials });
		if (selectedTestimonialIndex >= newTestimonials.length) {
			setSelectedTestimonialIndex(Math.max(0, newTestimonials.length - 1));
		}
	};

	// Reordena depoimentos (mover para frente/trás)
	const moveTestimonial = (index, direction) => {
		const targetIndex = index + direction;
		if (targetIndex < 0 || targetIndex >= testimonials.length) return;

		const updatedList = [...testimonials];
		const temp = updatedList[index];
		updatedList[index] = updatedList[targetIndex];
		updatedList[targetIndex] = temp;

		setAttributes({ testimonials: updatedList });
		setSelectedTestimonialIndex(targetIndex);
	};

	// Duplica um depoimento existente
	const duplicateTestimonial = (index) => {
		const target = testimonials[index];
		const duplicated = {
			...target,
			id: `testimonial-${Date.now()}`,
		};
		const updatedList = [
			...testimonials.slice(0, index + 1),
			duplicated,
			...testimonials.slice(index + 1),
		];
		setAttributes({ testimonials: updatedList });
		setSelectedTestimonialIndex(index + 1);
	};

	// Definição das colunas Bootstrap
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

	// Renderizador de estrelas interativas
	const renderStarRating = (rating, onSelectRating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			const isFilled = i <= rating;
			stars.push(
				<button
					key={i}
					type="button"
					className="periodic-star-btn"
					style={{ color: starColor || '#ffc107' }}
					title={`${i} ${i === 1 ? __('estrela', 'periodic-testimonials') : __('estrelas', 'periodic-testimonials')}`}
					onClick={(e) => {
						e.stopPropagation();
						if (onSelectRating) {
							onSelectRating(i);
						}
					}}
				>
					<i className={isFilled ? 'fas fa-star' : 'far fa-star'} />
				</button>
			);
		}
		return <div className="periodic-star-rating d-flex gap-1">{stars}</div>;
	};

	return (
		<>
			<InspectorControls>
				<div className="periodic-inspector-tabs-wrapper">
					<TabPanel
						className="periodic-tab-panel"
						activeClass="is-active"
						tabs={[
							{
								name: 'tab-testimonials',
								title: __('Depoimentos', 'periodic-testimonials'),
								className: 'periodic-tab-item',
							},
							{
								name: 'tab-rating',
								title: __('Avaliação/Estrelas', 'periodic-testimonials'),
								className: 'periodic-tab-item',
							},
							{
								name: 'tab-layout',
								title: __('Layout', 'periodic-testimonials'),
								className: 'periodic-tab-item',
							},
						]}
					>
						{(tab) => {
							if (tab.name === 'tab-testimonials') {
								return (
									<PanelBody title={__('Gerenciar Depoimentos', 'periodic-testimonials')} initialOpen={true}>
										<p className="description">
											{__('Adicione, reordene e configure cada um dos relatos dos seus clientes.', 'periodic-testimonials')}
										</p>

										<Button
											variant="primary"
											className="w-100 mb-3 periodic-btn-add"
											icon="plus"
											onClick={addTestimonial}
										>
											{__('Adicionar Depoimento', 'periodic-testimonials')}
										</Button>

										<div className="periodic-testimonials-sidebar-list">
											{testimonials.map((item, idx) => (
												<div
													key={item.id || idx}
													className={`periodic-sidebar-card ${
														selectedTestimonialIndex === idx ? 'is-selected' : ''
													}`}
													onClick={() => setSelectedTestimonialIndex(idx)}
												>
													<div className="d-flex justify-content-between align-items-center mb-2">
														<strong className="text-truncate">
															#{idx + 1} - {item.authorName || __('Sem nome', 'periodic-testimonials')}
														</strong>
														<div className="periodic-sidebar-item-actions d-flex gap-1">
															<Button
																icon="arrow-up-alt2"
																size="small"
																disabled={idx === 0}
																onClick={(e) => {
																	e.stopPropagation();
																	moveTestimonial(idx, -1);
																}}
																label={__('Mover para cima', 'periodic-testimonials')}
															/>
															<Button
																icon="arrow-down-alt2"
																size="small"
																disabled={idx === testimonials.length - 1}
																onClick={(e) => {
																	e.stopPropagation();
																	moveTestimonial(idx, 1);
																}}
																label={__('Mover para baixo', 'periodic-testimonials')}
															/>
															<Button
																icon="trash"
																isDestructive
																size="small"
																onClick={(e) => {
																	e.stopPropagation();
																	removeTestimonial(idx);
																}}
																label={__('Remover', 'periodic-testimonials')}
															/>
														</div>
													</div>

													{selectedTestimonialIndex === idx && (
														<div className="periodic-sidebar-card-details mt-3 pt-2 border-top">
															<BaseControl label={__('Foto de Perfil (Avatar)', 'periodic-testimonials')}>
																<div className="d-flex align-items-center gap-2 mt-1">
																	{item.avatarUrl ? (
																		<img
																			src={item.avatarUrl}
																			alt={item.authorName}
																			className="rounded-circle"
																			style={{ width: '48px', height: '48px', objectFit: 'cover' }}
																		/>
																	) : (
																		<div
																			className="rounded-circle bg-light border d-flex align-items-center justify-content-center text-muted"
																			style={{ width: '48px', height: '48px' }}
																		>
																			<i className="fas fa-user" />
																		</div>
																	)}

																	<MediaUploadCheck>
																		<MediaUpload
																			onSelect={(media) =>
																				updateTestimonial(idx, 'avatarUrl', media.url)
																			}
																			allowedTypes={['image']}
																			value={item.avatarId}
																			render={({ open }) => (
																				<Button
																					variant="secondary"
																					size="small"
																					onClick={open}
																				>
																					{item.avatarUrl
																						? __('Alterar Foto', 'periodic-testimonials')
																						: __('Enviar Foto', 'periodic-testimonials')}
																				</Button>
																			)}
																		/>
																	</MediaUploadCheck>

																	{item.avatarUrl && (
																		<Button
																			isDestructive
																			variant="link"
																			size="small"
																			onClick={() => updateTestimonial(idx, 'avatarUrl', '')}
																		>
																			{__('Remover', 'periodic-testimonials')}
																		</Button>
																	)}
																</div>
															</BaseControl>

															<RangeControl
																label={__('Classificação (Estrelas)', 'periodic-testimonials')}
																value={item.rating || 5}
																onChange={(val) => updateTestimonial(idx, 'rating', val)}
																min={1}
																max={5}
																step={1}
															/>
														</div>
													)}
												</div>
											))}
										</div>
									</PanelBody>
								);
							}

							if (tab.name === 'tab-rating') {
								return (
									<PanelBody title={__('Configurações de Avaliação e Estrelas', 'periodic-testimonials')} initialOpen={true}>
										<ToggleControl
											label={__('Exibir Avaliação por Estrelas', 'periodic-testimonials')}
											help={__('Exibe ícones de estrelas correspondentes à nota de cada depoimento.', 'periodic-testimonials')}
											checked={showRating}
											onChange={(val) => setAttributes({ showRating: val })}
										/>

										<ToggleControl
											label={__('Exibir Ícone Decorativo de Aspas', 'periodic-testimonials')}
											help={__('Mostra ícone sutil de aspas superiores no cabeçalho do card.', 'periodic-testimonials')}
											checked={showQuoteIcon}
											onChange={(val) => setAttributes({ showQuoteIcon: val })}
										/>

										{showRating && (
											<BaseControl label={__('Cor das Estrelas', 'periodic-testimonials')} className="mt-3">
												<ColorPalette
													colors={[
														{ name: 'Dourado Padrão', color: '#ffc107' },
														{ name: 'Âmbar Quente', color: '#f59e0b' },
														{ name: 'Laranja Vibrante', color: '#fd7e14' },
														{ name: 'Azul Destaque', color: '#0d6efd' },
														{ name: 'Verde Sucesso', color: '#198754' },
														{ name: 'Roxo Premium', color: '#6f42c1' },
													]}
													value={starColor}
													onChange={(color) => setAttributes({ starColor: color || '#ffc107' })}
												/>
											</BaseControl>
										)}
									</PanelBody>
								);
							}

							if (tab.name === 'tab-layout') {
								return (
									<PanelBody title={__('Layout e Estilo dos Cards', 'periodic-testimonials')} initialOpen={true}>
										<SelectControl
											label={__('Modo de Exibição', 'periodic-testimonials')}
											value={layoutMode}
											options={[
												{ label: __('Grid Responsivo (Múltiplas Colunas)', 'periodic-testimonials'), value: 'grid' },
												{ label: __('Card Único em Destaque', 'periodic-testimonials'), value: 'single-card' },
											]}
											onChange={(val) => setAttributes({ layoutMode: val })}
										/>

										{layoutMode === 'grid' && (
											<RangeControl
												label={__('Quantidade de Colunas no Grid', 'periodic-testimonials')}
												help={__('Número de cards exibidos por linha em telas desktop.', 'periodic-testimonials')}
												value={columns}
												onChange={(val) => setAttributes({ columns: val })}
												min={1}
												max={4}
												step={1}
											/>
										)}

										<ToggleControl
											label={__('Sombra Suave nos Cards', 'periodic-testimonials')}
											help={__('Aplica classe shadow-sm do Bootstrap 5 com elevação no hover.', 'periodic-testimonials')}
											checked={cardShadow}
											onChange={(val) => setAttributes({ cardShadow: val })}
										/>

										<RangeControl
											label={__('Arredondamento das Bordas (px)', 'periodic-testimonials')}
											value={cardBorderRadius}
											onChange={(val) => setAttributes({ cardBorderRadius: val })}
											min={0}
											max={32}
											step={2}
										/>

										<BaseControl label={__('Cor de Fundo do Card', 'periodic-testimonials')} className="mt-3">
											<ColorPalette
												colors={[
													{ name: 'Branco Puro', color: '#ffffff' },
													{ name: 'Cinza Claro Suave', color: '#f8f9fa' },
													{ name: 'Cinza Neutro', color: '#e9ecef' },
													{ name: 'Escuro Noturno', color: '#212529' },
													{ name: 'Azul Escuro Profundo', color: '#0f172a' },
												]}
												value={cardBgColor}
												onChange={(color) => setAttributes({ cardBgColor: color || '#ffffff' })}
											/>
										</BaseControl>

										<BaseControl label={__('Cor do Texto do Card', 'periodic-testimonials')} className="mt-3">
											<ColorPalette
												colors={[
													{ name: 'Grafite Escuro', color: '#212529' },
													{ name: 'Cinza Médio', color: '#495057' },
													{ name: 'Branco Puro', color: '#ffffff' },
													{ name: 'Cinza Claro', color: '#e2e8f0' },
												]}
												value={cardTextColor}
												onChange={(color) => setAttributes({ cardTextColor: color || '#212529' })}
											/>
										</BaseControl>
									</PanelBody>
								);
							}
							return null;
						}}
					</TabPanel>
				</div>
			</InspectorControls>

			<div {...blockProps}>
				<div className="container-fluid px-0">
					<div
						className={`row ${
							layoutMode === 'grid'
								? `${getColumnClass()} g-4`
								: 'justify-content-center'
						}`}
					>
						{testimonials.map((item, index) => {
							const isSingleCard = layoutMode === 'single-card';
							const colWrapperClass = isSingleCard ? 'col-12 col-md-10 col-lg-8' : 'col';

							return (
								<div key={item.id || index} className={colWrapperClass}>
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
										{/* Barra de Ações Rápidas Flutuante no Editor */}
										<div className="periodic-card-quick-bar">
											<span className="badge bg-secondary me-2">#{index + 1}</span>
											<Tooltip text={__('Mover para esquerda / cima', 'periodic-testimonials')}>
												<button
													type="button"
													className="btn btn-sm btn-light border py-0 px-2"
													disabled={index === 0}
													onClick={() => moveTestimonial(index, -1)}
												>
													<i className="fas fa-chevron-left" />
												</button>
											</Tooltip>
											<Tooltip text={__('Mover para direita / baixo', 'periodic-testimonials')}>
												<button
													type="button"
													className="btn btn-sm btn-light border py-0 px-2"
													disabled={index === testimonials.length - 1}
													onClick={() => moveTestimonial(index, 1)}
												>
													<i className="fas fa-chevron-right" />
												</button>
											</Tooltip>
											<Tooltip text={__('Duplicar depoimento', 'periodic-testimonials')}>
												<button
													type="button"
													className="btn btn-sm btn-light border py-0 px-2 text-primary"
													onClick={() => duplicateTestimonial(index)}
												>
													<i className="fas fa-copy" />
												</button>
											</Tooltip>
											<Tooltip text={__('Remover depoimento', 'periodic-testimonials')}>
												<button
													type="button"
													className="btn btn-sm btn-light border py-0 px-2 text-danger"
													onClick={() => removeTestimonial(index)}
												>
													<i className="fas fa-trash" />
												</button>
											</Tooltip>
										</div>

										<div className="card-body d-flex flex-column p-4">
											{/* Cabeçalho do Card: Aspas e Estrelas */}
											<div className="d-flex justify-content-between align-items-center mb-3">
												{showQuoteIcon && (
													<div className="periodic-quote-icon-box">
														<i className="fas fa-quote-left fa-2x opacity-25" />
													</div>
												)}
												{showRating && (
													<div className="ms-auto">
														{renderStarRating(item.rating || 5, (newRating) =>
															updateTestimonial(index, 'rating', newRating)
														)}
													</div>
												)}
											</div>

											{/* Citação / Depoimento */}
											<div className="mb-4 flex-grow-1">
												<RichText
													tagName="p"
													className="card-text periodic-testimonial-quote fst-italic"
													value={item.quote}
													placeholder={__('Escreva aqui o depoimento do cliente...', 'periodic-testimonials')}
													onChange={(val) => updateTestimonial(index, 'quote', val)}
												/>
											</div>

											{/* Rodapé do Card: Avatar e Metadados do Autor */}
											<div className="d-flex align-items-center pt-3 border-top border-light-subtle">
												<div className="periodic-avatar-container position-relative me-3">
													{item.avatarUrl ? (
														<img
															src={item.avatarUrl}
															alt={item.authorName}
															className="rounded-circle periodic-avatar-img"
														/>
													) : (
														<div className="rounded-circle bg-light border d-flex align-items-center justify-content-center text-muted periodic-avatar-placeholder">
															<i className="fas fa-user fa-lg" />
														</div>
													)}

													{/* Upload rápido no próprio avatar */}
													<MediaUploadCheck>
														<MediaUpload
															onSelect={(media) =>
																updateTestimonial(index, 'avatarUrl', media.url)
															}
															allowedTypes={['image']}
															value={item.avatarId}
															render={({ open }) => (
																<button
																	type="button"
																	className="periodic-avatar-edit-overlay"
																	onClick={open}
																	title={__('Alterar foto de perfil', 'periodic-testimonials')}
																>
																	<i className="fas fa-camera" />
																</button>
															)}
														/>
													</MediaUploadCheck>
												</div>

												<div className="periodic-author-meta flex-grow-1">
													<RichText
														tagName="h5"
														className="card-title fw-bold mb-1 fs-6 periodic-author-name"
														value={item.authorName}
														placeholder={__('Nome do Autor', 'periodic-testimonials')}
														onChange={(val) => updateTestimonial(index, 'authorName', val)}
													/>
													<RichText
														tagName="div"
														className="text-muted small periodic-author-role"
														value={item.authorRole}
														placeholder={__('Cargo ou Empresa', 'periodic-testimonials')}
														onChange={(val) => updateTestimonial(index, 'authorRole', val)}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Botão de Adicionar Rápido no Canvas */}
					<div className="text-center mt-4">
						<button
							type="button"
							className="btn btn-outline-primary btn-sm periodic-canvas-add-btn"
							onClick={addTestimonial}
						>
							<i className="fas fa-plus me-1" />
							{__('Adicionar Outro Depoimento', 'periodic-testimonials')}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
