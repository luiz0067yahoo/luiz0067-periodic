import { useBlockProps } from '@wordpress/block-editor';

/**
 * Função save do bloco Gutenberg periodic/team-member.
 * Renderiza o HTML estático final com grid responsivo Bootstrap 5 e ícones Font Awesome 6.
 */
export default function save( { attributes } ) {
	const {
		members = [],
		columns = 3,
		imageShape = 'rounded-circle',
		cardStyle = 'shadow-sm',
		alignment = 'center',
		imageSize = 140,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'periodic-team-members-block',
	} );

	// Determinação das classes de coluna Bootstrap
	const getColumnClass = () => {
		switch ( columns ) {
			case 1:
				return 'col-12';
			case 2:
				return 'col-12 col-md-6';
			case 4:
				return 'col-12 col-md-6 col-lg-3';
			case 3:
			default:
				return 'col-12 col-md-6 col-lg-4';
		}
	};

	// Determinação das classes de estilo de cartão Bootstrap
	const getCardClass = () => {
		let styleClass = 'shadow-sm border-0';
		if ( cardStyle === 'border' ) {
			styleClass = 'border';
		} else if ( cardStyle === 'flat' ) {
			styleClass = 'border-0 bg-transparent';
		}
		return `card h-100 text-${ alignment } ${ styleClass } periodic-member-card`;
	};

	if ( ! members || members.length === 0 ) {
		return null;
	}

	return (
		<div { ...blockProps }>
			<div className="periodic-team-member-container container-fluid p-0">
				<div className="row g-4">
					{ members.map( ( member, idx ) => (
						<div key={ member.id || idx } className={ getColumnClass() }>
							<div className={ getCardClass() }>
								<div className="card-body p-4 d-flex flex-column">
									{ /* Foto do Membro */ }
									<div className="periodic-member-photo-container mb-3 text-center">
										{ member.photoUrl ? (
											<img
												src={ member.photoUrl }
												alt={ member.photoAlt || member.name || 'Membro da Equipe' }
												className={ `periodic-member-photo ${ imageShape }` }
												style={ {
													width: `${ imageSize }px`,
													height: `${ imageSize }px`,
													objectFit: 'cover',
												} }
												loading="lazy"
											/>
										) : (
											<div
												className={ `periodic-member-photo-placeholder ${ imageShape } d-inline-flex align-items-center justify-content-center bg-light text-secondary border` }
												style={ {
													width: `${ imageSize }px`,
													height: `${ imageSize }px`,
												} }
											>
												<i className="fa-solid fa-user fa-2x"></i>
											</div>
										) }
									</div>

									{ /* Nome do Membro */ }
									{ member.name && (
										<h5 className="card-title fw-bold text-dark mb-1">
											{ member.name }
										</h5>
									) }

									{ /* Especialidade / Cargo */ }
									{ member.role && (
										<h6 className="card-subtitle mb-3 text-primary fw-semibold">
											{ member.role }
										</h6>
									) }

									{ /* Resumo Biográfico */ }
									{ member.bio && (
										<p className="card-text text-secondary mb-4 flex-grow-1">
											{ member.bio }
										</p>
									) }

									{ /* Links para Redes Sociais */ }
									{ member.socialLinks && member.socialLinks.length > 0 && (
										<div className="periodic-social-links d-flex justify-content-center flex-wrap gap-2 pt-3 border-top mt-auto">
											{ member.socialLinks.map( ( social, sIdx ) => (
												<a
													key={ sIdx }
													href={ social.url || '#' }
													className="btn btn-sm btn-outline-secondary rounded-circle periodic-social-btn"
													target="_blank"
													rel="noopener noreferrer"
													aria-label={ `${ member.name || 'Membro' } - ${ social.platform || 'Rede Social' }` }
													title={ social.platform || 'Rede Social' }
												>
													<i className={ social.iconClass || 'fa-solid fa-link' }></i>
												</a>
											) ) }
										</div>
									) }
								</div>
							</div>
						</div>
					) ) }
				</div>
			</div>
		</div>
	);
}
