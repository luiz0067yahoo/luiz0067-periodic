/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	ColorPalette,
	Button,
	ButtonGroup,
	Tooltip,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Componente de Edição do Bloco periodic/pricing-table
 * Desenvolvido por Luiz Fernando Brogliatto Ferreira
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		plans,
		columns,
		featuredBorderColor,
		featuredBadgeBg,
		featuredBadgeTextColor,
		showBadges,
		elevateFeatured,
	} = attributes;

	// Estado para rastrear o plano ativo no InspectorControls
	const [ selectedPlanIndex, setSelectedPlanIndex ] = useState( 0 );

	const blockProps = useBlockProps( {
		className: 'periodic-pricing-table-wrapper',
		style: {
			'--periodic-pt-featured-border': featuredBorderColor,
			'--periodic-pt-badge-bg': featuredBadgeBg,
			'--periodic-pt-badge-color': featuredBadgeTextColor,
		},
	} );

	// Helpers de atualização de planos
	const updatePlan = ( index, field, value ) => {
		const newPlans = [ ...plans ];
		newPlans[ index ] = {
			...newPlans[ index ],
			[ field ]: value,
		};
		setAttributes( { plans: newPlans } );
	};

	const addPlan = () => {
		const newId = `plan-${ Date.now() }`;
		const newPlan = {
			id: newId,
			planName: __( 'Novo Plano', 'periodic-pricing-table' ),
			price: '49',
			currency: 'R$',
			billingPeriod: __( '/mês', 'periodic-pricing-table' ),
			isFeatured: false,
			badgeText: __( 'Destaque', 'periodic-pricing-table' ),
			features: [
				{
					id: `f-${ Date.now() }-1`,
					text: __( 'Recurso essencial incluso', 'periodic-pricing-table' ),
					included: true,
				},
				{
					id: `f-${ Date.now() }-2`,
					text: __( 'Suporte padrão incluso', 'periodic-pricing-table' ),
					included: true,
				},
				{
					id: `f-${ Date.now() }-3`,
					text: __( 'Funcionalidade avançada', 'periodic-pricing-table' ),
					included: false,
				},
			],
			buttonText: __( 'Assinar Agora', 'periodic-pricing-table' ),
			buttonUrl: '#',
			buttonStyle: 'primary',
		};
		const updatedPlans = [ ...plans, newPlan ];
		setAttributes( { plans: updatedPlans } );
		setSelectedPlanIndex( updatedPlans.length - 1 );
	};

	const removePlan = ( indexToRemove ) => {
		if ( plans.length <= 1 ) {
			return;
		}
		const newPlans = plans.filter( ( _, idx ) => idx !== indexToRemove );
		setAttributes( { plans: newPlans } );
		if ( selectedPlanIndex >= newPlans.length ) {
			setSelectedPlanIndex( Math.max( 0, newPlans.length - 1 ) );
		}
	};

	const movePlan = ( index, direction ) => {
		const targetIndex = index + direction;
		if ( targetIndex < 0 || targetIndex >= plans.length ) {
			return;
		}
		const newPlans = [ ...plans ];
		const [ moved ] = newPlans.splice( index, 1 );
		newPlans.splice( targetIndex, 0, moved );
		setAttributes( { plans: newPlans } );
		setSelectedPlanIndex( targetIndex );
	};

	const duplicatePlan = ( index ) => {
		const sourcePlan = plans[ index ];
		const duplicated = {
			...JSON.parse( JSON.stringify( sourcePlan ) ),
			id: `plan-${ Date.now() }`,
			planName: `${ sourcePlan.planName } (${ __( 'Cópia', 'periodic-pricing-table' ) })`,
			isFeatured: false,
		};
		const newPlans = [ ...plans ];
		newPlans.splice( index + 1, 0, duplicated );
		setAttributes( { plans: newPlans } );
		setSelectedPlanIndex( index + 1 );
	};

	const toggleFeaturedPlan = ( index ) => {
		const newPlans = plans.map( ( plan, idx ) => ( {
			...plan,
			isFeatured: idx === index ? ! plan.isFeatured : false,
		} ) );
		setAttributes( { plans: newPlans } );
	};

	// Helpers de atualização de recursos/features
	const updateFeature = ( planIndex, featureIndex, field, value ) => {
		const newPlans = [ ...plans ];
		const newFeatures = [ ...newPlans[ planIndex ].features ];
		newFeatures[ featureIndex ] = {
			...newFeatures[ featureIndex ],
			[ field ]: value,
		};
		newPlans[ planIndex ] = {
			...newPlans[ planIndex ],
			features: newFeatures,
		};
		setAttributes( { plans: newPlans } );
	};

	const toggleFeatureIncluded = ( planIndex, featureIndex ) => {
		const currentStatus = plans[ planIndex ].features[ featureIndex ].included;
		updateFeature( planIndex, featureIndex, 'included', ! currentStatus );
	};

	const addFeatureToPlan = ( planIndex ) => {
		const newPlans = [ ...plans ];
		const newFeatures = [
			...newPlans[ planIndex ].features,
			{
				id: `f-${ Date.now() }`,
				text: __( 'Novo recurso do plano', 'periodic-pricing-table' ),
				included: true,
			},
		];
		newPlans[ planIndex ] = {
			...newPlans[ planIndex ],
			features: newFeatures,
		};
		setAttributes( { plans: newPlans } );
	};

	const removeFeatureFromPlan = ( planIndex, featureIndex ) => {
		const newPlans = [ ...plans ];
		const newFeatures = newPlans[ planIndex ].features.filter(
			( _, idx ) => idx !== featureIndex
		);
		newPlans[ planIndex ] = {
			...newPlans[ planIndex ],
			features: newFeatures,
		};
		setAttributes( { plans: newPlans } );
	};

	const activePlan = plans[ selectedPlanIndex ] || plans[ 0 ];

	const buttonStyleOptions = [
		{ label: __( 'Azul Primário (btn-primary)', 'periodic-pricing-table' ), value: 'primary' },
		{ label: __( 'Contorno Azul (btn-outline-primary)', 'periodic-pricing-table' ), value: 'outline-primary' },
		{ label: __( 'Verde Sucesso (btn-success)', 'periodic-pricing-table' ), value: 'success' },
		{ label: __( 'Contorno Verde (btn-outline-success)', 'periodic-pricing-table' ), value: 'outline-success' },
		{ label: __( 'Preto / Escuro (btn-dark)', 'periodic-pricing-table' ), value: 'dark' },
		{ label: __( 'Contorno Escuro (btn-outline-dark)', 'periodic-pricing-table' ), value: 'outline-dark' },
		{ label: __( 'Cinza Secundário (btn-secondary)', 'periodic-pricing-table' ), value: 'secondary' },
	];

	// Bootstrap columns grid class mapping
	const getGridColumnsClass = ( cols ) => {
		switch ( cols ) {
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
		<>
			<InspectorControls>
				<div className="periodic-inspector-tabs">
					<TabPanel
						className="periodic-tab-panel"
						activeClass="is-active"
						tabs={ [
							{
								name: 'plans',
								title: __( 'Planos', 'periodic-pricing-table' ),
								className: 'tab-plans',
							},
							{
								name: 'features',
								title: __( 'Recursos e Itens', 'periodic-pricing-table' ),
								className: 'tab-features',
							},
							{
								name: 'highlight',
								title: __( 'Estilo do Destaque', 'periodic-pricing-table' ),
								className: 'tab-highlight',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name === 'plans' ) {
								return (
									<PanelBody title={ __( 'Configuração dos Planos', 'periodic-pricing-table' ) } initialOpen={ true }>
										<SelectControl
											label={ __( 'Selecionar Plano para Edição', 'periodic-pricing-table' ) }
											value={ selectedPlanIndex }
											options={ plans.map( ( p, idx ) => ( {
												label: `${ idx + 1 }. ${ p.planName } ${ p.isFeatured ? '★' : '' }`,
												value: idx,
											} ) ) }
											onChange={ ( val ) => setSelectedPlanIndex( parseInt( val, 10 ) ) }
										/>

										{ activePlan && (
											<div className="plan-manager-card">
												<div className="plan-manager-header">
													<span className="plan-title-badge">
														{ activePlan.planName }
													</span>
													<ButtonGroup>
														<Tooltip text={ __( 'Mover para cima/esquerda', 'periodic-pricing-table' ) }>
															<Button
																isSmall
																variant="secondary"
																disabled={ selectedPlanIndex === 0 }
																onClick={ () => movePlan( selectedPlanIndex, -1 ) }
															>
																↑
															</Button>
														</Tooltip>
														<Tooltip text={ __( 'Mover para baixo/direita', 'periodic-pricing-table' ) }>
															<Button
																isSmall
																variant="secondary"
																disabled={ selectedPlanIndex === plans.length - 1 }
																onClick={ () => movePlan( selectedPlanIndex, 1 ) }
															>
																↓
															</Button>
														</Tooltip>
														<Tooltip text={ __( 'Duplicar este plano', 'periodic-pricing-table' ) }>
															<Button
																isSmall
																variant="secondary"
																onClick={ () => duplicatePlan( selectedPlanIndex ) }
															>
																⧉
															</Button>
														</Tooltip>
														<Tooltip text={ __( 'Excluir plano', 'periodic-pricing-table' ) }>
															<Button
																isSmall
																isDestructive
																variant="secondary"
																disabled={ plans.length <= 1 }
																onClick={ () => removePlan( selectedPlanIndex ) }
															>
																✕
															</Button>
														</Tooltip>
													</ButtonGroup>
												</div>

												<TextControl
													label={ __( 'Nome do Plano', 'periodic-pricing-table' ) }
													value={ activePlan.planName }
													onChange={ ( val ) => updatePlan( selectedPlanIndex, 'planName', val ) }
												/>

												<div style={ { display: 'flex', gap: '8px' } }>
													<div style={ { width: '35%' } }>
														<TextControl
															label={ __( 'Moeda', 'periodic-pricing-table' ) }
															value={ activePlan.currency }
															onChange={ ( val ) => updatePlan( selectedPlanIndex, 'currency', val ) }
														/>
													</div>
													<div style={ { width: '65%' } }>
														<TextControl
															label={ __( 'Preço', 'periodic-pricing-table' ) }
															value={ activePlan.price }
															onChange={ ( val ) => updatePlan( selectedPlanIndex, 'price', val ) }
														/>
													</div>
												</div>

												<TextControl
													label={ __( 'Período de Faturamento', 'periodic-pricing-table' ) }
													value={ activePlan.billingPeriod }
													onChange={ ( val ) => updatePlan( selectedPlanIndex, 'billingPeriod', val ) }
													help={ __( 'Exemplo: /mês, /ano, ou taxa única', 'periodic-pricing-table' ) }
												/>

												<ToggleControl
													label={ __( 'Plano em Destaque (Popular)', 'periodic-pricing-table' ) }
													checked={ !! activePlan.isFeatured }
													onChange={ () => toggleFeaturedPlan( selectedPlanIndex ) }
												/>

												{ activePlan.isFeatured && (
													<TextControl
														label={ __( 'Texto do Distintivo (Badge)', 'periodic-pricing-table' ) }
														value={ activePlan.badgeText }
														onChange={ ( val ) => updatePlan( selectedPlanIndex, 'badgeText', val ) }
													/>
												)}

												<TextControl
													label={ __( 'Texto do Botão', 'periodic-pricing-table' ) }
													value={ activePlan.buttonText }
													onChange={ ( val ) => updatePlan( selectedPlanIndex, 'buttonText', val ) }
												/>

												<TextControl
													label={ __( 'URL do Botão', 'periodic-pricing-table' ) }
													value={ activePlan.buttonUrl }
													onChange={ ( val ) => updatePlan( selectedPlanIndex, 'buttonUrl', val ) }
												/>

												<SelectControl
													label={ __( 'Estilo do Botão', 'periodic-pricing-table' ) }
													value={ activePlan.buttonStyle }
													options={ buttonStyleOptions }
													onChange={ ( val ) => updatePlan( selectedPlanIndex, 'buttonStyle', val ) }
												/>
											</div>
										)}

										<Button
											variant="primary"
											style={ { width: '100%', marginTop: '10px' } }
											onClick={ addPlan }
										>
											+ { __( 'Adicionar Novo Plano', 'periodic-pricing-table' ) }
										</Button>

										<hr style={ { margin: '20px 0' } } />

										<RangeControl
											label={ __( 'Colunas no Desktop', 'periodic-pricing-table' ) }
											value={ columns }
											onChange={ ( val ) => setAttributes( { columns: val } ) }
											min={ 2 }
											max={ 4 }
										/>
									</PanelBody>
								);
							}

							if ( tab.name === 'features' ) {
								return (
									<PanelBody title={ __( 'Gerenciar Recursos da Tabela', 'periodic-pricing-table' ) } initialOpen={ true }>
										<SelectControl
											label={ __( 'Plano Atual', 'periodic-pricing-table' ) }
											value={ selectedPlanIndex }
											options={ plans.map( ( p, idx ) => ( {
												label: `${ idx + 1 }. ${ p.planName }`,
												value: idx,
											} ) ) }
											onChange={ ( val ) => setSelectedPlanIndex( parseInt( val, 10 ) ) }
										/>

										<p style={ { fontSize: '12px', color: '#64748b', marginBottom: '14px' } }>
											{ __( 'Adicione, edite e alterne entre recursos inclusos (ícone de visto verde) e exclusos (ícone de x cinza).', 'periodic-pricing-table' ) }
										</p>

										{ activePlan && activePlan.features && activePlan.features.map( ( feature, fIdx ) => (
											<div
												key={ feature.id || fIdx }
												style={ {
													border: '1px solid #e2e8f0',
													borderRadius: '6px',
													padding: '10px',
													marginBottom: '8px',
													background: feature.included ? '#ffffff' : '#f8fafc',
												} }
											>
												<div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' } }>
													<span style={ { fontSize: '11px', fontWeight: 'bold', color: feature.included ? '#10b981' : '#94a3b8' } }>
														{ feature.included
															? __( '✓ Incluso no plano', 'periodic-pricing-table' )
															: __( '✕ Não incluso no plano', 'periodic-pricing-table' ) }
													</span>
													<Button
														isSmall
														isDestructive
														variant="tertiary"
														onClick={ () => removeFeatureFromPlan( selectedPlanIndex, fIdx ) }
													>
														{ __( 'Remover', 'periodic-pricing-table' ) }
													</Button>
												</div>

												<TextControl
													value={ feature.text }
													onChange={ ( val ) => updateFeature( selectedPlanIndex, fIdx, 'text', val ) }
												/>

												<ToggleControl
													label={ __( 'Recurso Incluso?', 'periodic-pricing-table' ) }
													checked={ !! feature.included }
													onChange={ () => toggleFeatureIncluded( selectedPlanIndex, fIdx ) }
												/>
											</div>
										) ) }

										<Button
											variant="secondary"
											style={ { width: '100%', marginTop: '8px' } }
											onClick={ () => addFeatureToPlan( selectedPlanIndex ) }
										>
											+ { __( 'Adicionar Recurso a Este Plano', 'periodic-pricing-table' ) }
										</Button>
									</PanelBody>
								);
							}

							if ( tab.name === 'highlight' ) {
								return (
									<PanelBody title={ __( 'Personalização do Destaque', 'periodic-pricing-table' ) } initialOpen={ true }>
										<ToggleControl
											label={ __( 'Exibir Distintivos (Badges)', 'periodic-pricing-table' ) }
											checked={ showBadges }
											onChange={ ( val ) => setAttributes( { showBadges: val } ) }
											help={ __( 'Exibe o distintivo flutuante sobre os planos com destaque.', 'periodic-pricing-table' ) }
										/>

										<ToggleControl
											label={ __( 'Elevar Plano em Destaque', 'periodic-pricing-table' ) }
											checked={ elevateFeatured }
											onChange={ ( val ) => setAttributes( { elevateFeatured: val } ) }
											help={ __( 'Aplica leve ampliação e elevação com sombra mais profunda no plano em destaque.', 'periodic-pricing-table' ) }
										/>

										<div style={ { marginTop: '16px' } }>
											<label style={ { fontWeight: '600', display: 'block', marginBottom: '8px' } }>
												{ __( 'Cor da Borda de Destaque', 'periodic-pricing-table' ) }
											</label>
											<ColorPalette
												value={ featuredBorderColor }
												onChange={ ( color ) => setAttributes( { featuredBorderColor: color || '#0d6efd' } ) }
											/>
										</div>

										<div style={ { marginTop: '16px' } }>
											<label style={ { fontWeight: '600', display: 'block', marginBottom: '8px' } }>
												{ __( 'Cor de Fundo da Badge', 'periodic-pricing-table' ) }
											</label>
											<ColorPalette
												value={ featuredBadgeBg }
												onChange={ ( color ) => setAttributes( { featuredBadgeBg: color || '#0d6efd' } ) }
											/>
										</div>

										<div style={ { marginTop: '16px' } }>
											<label style={ { fontWeight: '600', display: 'block', marginBottom: '8px' } }>
												{ __( 'Cor do Texto da Badge', 'periodic-pricing-table' ) }
											</label>
											<ColorPalette
												value={ featuredBadgeTextColor }
												onChange={ ( color ) => setAttributes( { featuredBadgeTextColor: color || '#ffffff' } ) }
											/>
										</div>
									</PanelBody>
								);
							}

							return null;
						} }
					</TabPanel>
				</div>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `row ${ getGridColumnsClass( columns ) } g-4 justify-content-center align-items-stretch` }>
					{ plans.map( ( plan, pIdx ) => {
						const isSelected = selectedPlanIndex === pIdx;
						const isFeatured = !! plan.isFeatured;

						return (
							<div key={ plan.id || pIdx } className="col">
								<div
									className={ `card h-100 periodic-pricing-card ${ isFeatured ? 'is-featured' : '' } ${ isFeatured && elevateFeatured ? 'elevate-featured' : '' } ${ isSelected ? 'is-selected-card' : '' }` }
									onClick={ () => setSelectedPlanIndex( pIdx ) }
								>
									{ /* Barra rápida de controles no topo do card no editor */ }
									<div className="card-editor-actions">
										<button
											type="button"
											className={ `editor-btn-action ${ isFeatured ? 'btn-star-active' : '' }` }
											title={ __( 'Alternar Plano em Destaque (Popular)', 'periodic-pricing-table' ) }
											onClick={ ( e ) => {
												e.stopPropagation();
												toggleFeaturedPlan( pIdx );
											} }
										>
											{ isFeatured ? '★ ' + __( 'Destaque', 'periodic-pricing-table' ) : '☆ ' + __( 'Destacar', 'periodic-pricing-table' ) }
										</button>

										<button
											type="button"
											className="editor-btn-action"
											title={ __( 'Mover para a esquerda', 'periodic-pricing-table' ) }
											disabled={ pIdx === 0 }
											onClick={ ( e ) => {
												e.stopPropagation();
												movePlan( pIdx, -1 );
											} }
										>
											←
										</button>

										<button
											type="button"
											className="editor-btn-action"
											title={ __( 'Mover para a direita', 'periodic-pricing-table' ) }
											disabled={ pIdx === plans.length - 1 }
											onClick={ ( e ) => {
												e.stopPropagation();
												movePlan( pIdx, 1 );
											} }
										>
											→
										</button>

										<button
											type="button"
											className="editor-btn-action"
											title={ __( 'Duplicar plano', 'periodic-pricing-table' ) }
											onClick={ ( e ) => {
												e.stopPropagation();
												duplicatePlan( pIdx );
											} }
										>
											⧉
										</button>

										<button
											type="button"
											className="editor-btn-action btn-delete"
											title={ __( 'Excluir plano', 'periodic-pricing-table' ) }
											disabled={ plans.length <= 1 }
											onClick={ ( e ) => {
												e.stopPropagation();
												removePlan( pIdx );
											} }
										>
											✕
										</button>
									</div>

									{ /* Badge de destaque */ }
									{ isFeatured && showBadges && (
										<div className="pricing-badge-wrapper">
											<span className="badge rounded-pill pricing-badge">
												<i className="fa-solid fa-crown me-1" aria-hidden="true"></i>
												<RichText
													tagName="span"
													className="rich-text-badge"
													value={ plan.badgeText }
													onChange={ ( val ) => updatePlan( pIdx, 'badgeText', val ) }
													placeholder={ __( 'Mais Popular', 'periodic-pricing-table' ) }
													allowedFormats={ [] }
												/>
											</span>
										</div>
									)}

									{ /* Cabeçalho do Card */ }
									<div className="card-header text-center">
										<RichText
											tagName="h3"
											className="plan-title rich-text-plan-title"
											value={ plan.planName }
											onChange={ ( val ) => updatePlan( pIdx, 'planName', val ) }
											placeholder={ __( 'Nome do Plano', 'periodic-pricing-table' ) }
											allowedFormats={ [] }
										/>
										<div className="price-box">
											<RichText
												tagName="span"
												className="currency rich-text-currency"
												value={ plan.currency }
												onChange={ ( val ) => updatePlan( pIdx, 'currency', val ) }
												placeholder="R$"
												allowedFormats={ [] }
											/>
											<RichText
												tagName="span"
												className="price rich-text-price"
												value={ plan.price }
												onChange={ ( val ) => updatePlan( pIdx, 'price', val ) }
												placeholder="99"
												allowedFormats={ [] }
											/>
											<RichText
												tagName="span"
												className="period rich-text-period"
												value={ plan.billingPeriod }
												onChange={ ( val ) => updatePlan( pIdx, 'billingPeriod', val ) }
												placeholder="/mês"
												allowedFormats={ [] }
											/>
										</div>
									</div>

									{ /* Corpo do Card e Lista de Recursos */ }
									<div className="card-body">
										<div className="pricing-features-list">
											{ plan.features && plan.features.map( ( feat, fIdx ) => (
												<div key={ feat.id || fIdx } className="editor-feature-item">
													<button
														type="button"
														className="editor-feature-toggle"
														title={ feat.included
															? __( 'Recurso Incluso (clique para desmarcar)', 'periodic-pricing-table' )
															: __( 'Recurso Não Incluso (clique para marcar)', 'periodic-pricing-table' )
														}
														onClick={ ( e ) => {
															e.stopPropagation();
															toggleFeatureIncluded( pIdx, fIdx );
														} }
													>
														{ feat.included ? (
															<i className="fa-solid fa-check text-success" aria-hidden="true"></i>
														) : (
															<i className="fa-solid fa-xmark text-muted" aria-hidden="true"></i>
														) }
													</button>

													<RichText
														tagName="span"
														className={ `editor-feature-input ${ ! feat.included ? 'text-muted' : '' }` }
														value={ feat.text }
														onChange={ ( val ) => updateFeature( pIdx, fIdx, 'text', val ) }
														placeholder={ __( 'Descrição do recurso...', 'periodic-pricing-table' ) }
														allowedFormats={ [] }
													/>

													<button
														type="button"
														className="editor-feature-remove"
														title={ __( 'Remover item', 'periodic-pricing-table' ) }
														onClick={ ( e ) => {
															e.stopPropagation();
															removeFeatureFromPlan( pIdx, fIdx );
														} }
													>
														✕
													</button>
												</div>
											) ) }
										</div>

										<button
											type="button"
											className="btn-add-feature-inline"
											onClick={ ( e ) => {
												e.stopPropagation();
												addFeatureToPlan( pIdx );
											} }
										>
											+ { __( 'Adicionar Recurso', 'periodic-pricing-table' ) }
										</button>

										{ /* Botão CTA */ }
										<div className="pricing-cta">
											<div className={ `btn btn-${ plan.buttonStyle || 'primary' }` }>
												<RichText
													tagName="span"
													value={ plan.buttonText }
													onChange={ ( val ) => updatePlan( pIdx, 'buttonText', val ) }
													placeholder={ __( 'Texto do Botão', 'periodic-pricing-table' ) }
													allowedFormats={ [] }
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					} ) }
				</div>

				<div className="table-global-controls">
					<button
						type="button"
						className="btn-add-plan-global"
						onClick={ addPlan }
					>
						<i className="fa-solid fa-plus me-1" aria-hidden="true"></i>
						{ __( 'Adicionar Novo Card de Plano', 'periodic-pricing-table' ) }
					</button>
				</div>
			</div>
		</>
	);
}
