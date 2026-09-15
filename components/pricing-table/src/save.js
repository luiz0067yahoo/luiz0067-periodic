/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Componente de Salvamento do Bloco periodic/pricing-table
 * Renderiza HTML semântico e compatível com Bootstrap 5 e Font Awesome 6
 * Desenvolvido por Luiz Fernando Brogliatto Ferreira
 */
export default function save( { attributes } ) {
	const {
		plans,
		columns,
		featuredBorderColor,
		featuredBadgeBg,
		featuredBadgeTextColor,
		showBadges,
		elevateFeatured,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'periodic-pricing-table-wrapper',
		style: {
			'--periodic-pt-featured-border': featuredBorderColor || '#0d6efd',
			'--periodic-pt-badge-bg': featuredBadgeBg || '#0d6efd',
			'--periodic-pt-badge-color': featuredBadgeTextColor || '#ffffff',
		},
	} );

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
		<div { ...blockProps }>
			<div className={ `row ${ getGridColumnsClass( columns ) } g-4 justify-content-center align-items-stretch` }>
				{ plans && plans.map( ( plan, index ) => {
					const isFeatured = !! plan.isFeatured;
					const cardClass = [
						'card',
						'h-100',
						'periodic-pricing-card',
						isFeatured ? 'is-featured' : '',
						isFeatured && elevateFeatured ? 'elevate-featured' : '',
					].filter( Boolean ).join( ' ' );

					return (
						<div key={ plan.id || index } className="col">
							<div className={ cardClass }>
								{ /* Badge de destaque para plano popular */ }
								{ isFeatured && showBadges && plan.badgeText && (
									<div className="pricing-badge-wrapper">
										<span className="badge rounded-pill pricing-badge">
											<i className="fa-solid fa-crown me-1" aria-hidden="true"></i>
											<span>{ plan.badgeText }</span>
										</span>
									</div>
								)}

								{ /* Cabeçalho com Nome e Preço */ }
								<div className="card-header text-center">
									<h3 className="plan-title">{ plan.planName }</h3>
									<div className="price-box">
										{ plan.currency && <span className="currency">{ plan.currency }</span> }
										<span className="price">{ plan.price }</span>
										{ plan.billingPeriod && <span className="period">{ plan.billingPeriod }</span> }
									</div>
								</div>

								{ /* Corpo com Lista de Recursos */ }
								<div className="card-body">
									<ul className="pricing-features-list">
										{ plan.features && plan.features.map( ( feat, fIndex ) => (
											<li key={ feat.id || fIndex } className="feature-item">
												{ feat.included ? (
													<i className="fa-solid fa-check feature-icon icon-included" aria-hidden="true"></i>
												) : (
													<i className="fa-solid fa-xmark feature-icon icon-excluded" aria-hidden="true"></i>
												) }
												<span className={ `feature-text ${ ! feat.included ? 'is-excluded' : '' }` }>
													{ feat.text }
												</span>
											</li>
										) ) }
									</ul>

									{ /* Botão de Chamada para Ação */ }
									<div className="pricing-cta">
										<a
											href={ plan.buttonUrl || '#' }
											className={ `btn btn-${ plan.buttonStyle || 'primary' }` }
											role="button"
										>
											{ plan.buttonText }
										</a>
									</div>
								</div>
							</div>
						</div>
					);
				} ) }
			</div>
		</div>
	);
}
