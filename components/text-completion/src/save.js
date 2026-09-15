/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { extractGaps } from './utils';

/**
 * Save component for periodic-text-completion
 */
export default function save( { attributes } ) {
	const {
		title,
		instruction,
		rawText,
		audioUrl,
		caseSensitive,
		acceptTypos,
		ignoreAccents,
		attempts,
		themeColor,
		showWordBank,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'periodic-text-completion-wrapper',
	} );

	const gaps = extractGaps( rawText );

	// Client-side configuration serialized into data-attribute
	const clientConfig = JSON.stringify( {
		caseSensitive,
		acceptTypos,
		ignoreAccents,
		attempts: Number( attempts ),
		totalGaps: gaps.length,
	} );

	// Prepare word bank if requested
	let wordBankItems = [];
	if ( showWordBank && gaps.length > 0 ) {
		const uniqueWords = new Set();
		gaps.forEach( ( g ) => {
			g.options.forEach( ( opt ) => uniqueWords.add( opt ) );
		} );
		wordBankItems = Array.from( uniqueWords ).sort( () => 0.5 - Math.random() );
	}

	// Render paragraphs with embedded inputs
	const renderContentWithInputs = () => {
		if ( ! rawText ) return null;

		const paragraphs = rawText.split( /\n+/ ).filter( Boolean );
		const regex = /\*([^*]+)\*/g;
		let globalGapIndex = 0;

		return paragraphs.map( ( para, pIdx ) => {
			const parts = [];
			let lastIndex = 0;
			let match;

			regex.lastIndex = 0;
			while ( ( match = regex.exec( para ) ) !== null ) {
				if ( match.index > lastIndex ) {
					parts.push( para.substring( lastIndex, match.index ) );
				}

				let inner = match[ 1 ].trim();
				if ( inner.startsWith( '[' ) && inner.endsWith( ']' ) ) {
					inner = inner.slice( 1, -1 ).trim();
				}
				const options = inner.split( '|' ).map( ( s ) => s.trim() ).filter( Boolean );
				const currentGapIdx = globalGapIndex++;

				// Calculate comfortable width based on max option length
				const maxLen = Math.max( ...options.map( ( o ) => o.length ), 4 );
				const inputWidth = Math.min( Math.max( maxLen * 14 + 30, 95 ), 240 );

				parts.push(
					<span
						key={ `gap-span-${ currentGapIdx }` }
						className="text-completion-input-wrapper position-relative d-inline-block"
					>
						<input
							type="text"
							className="form-control form-control-sm d-inline-block text-completion-input"
							data-gap-index={ currentGapIdx }
							data-answers={ JSON.stringify( options ) }
							placeholder="..."
							autoComplete="off"
							autoCorrect="off"
							autoCapitalize="off"
							spellCheck="false"
							style={ { width: `${ inputWidth }px` } }
							aria-label={ `Lacuna número ${ currentGapIdx + 1 }` }
						/>
					</span>
				);

				lastIndex = regex.lastIndex;
			}

			if ( lastIndex < para.length ) {
				parts.push( para.substring( lastIndex ) );
			}

			return (
				<p key={ `save-p-${ pIdx }` } className="mb-3">
					{ parts }
				</p>
			);
		} );
	};

	return (
		<div { ...blockProps } data-config={ clientConfig }>
			<div className="card shadow-sm border-0 periodic-text-completion">
				{ /* Card Header */ }
				<div className="card-header bg-light d-flex flex-wrap justify-content-between align-items-center py-3 px-4">
					<div>
						{ title && (
							<h4 className={ `card-title mb-1 text-${ themeColor } fw-bold` }>
								<i className="fa-solid fa-pen-clip me-2"></i>
								{ title }
							</h4>
						) }
						{ instruction && (
							<p className="card-subtitle text-muted small mb-0">
								{ instruction }
							</p>
						) }
					</div>
					<div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
						{ audioUrl && (
							<span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2">
								<i className="fa-solid fa-headphones me-1"></i>
								Modo Ditado
							</span>
						) }
						<span className="badge bg-secondary-subtle text-secondary border px-3 py-2">
							<i className="fa-solid fa-asterisk me-1"></i>
							{ gaps.length } Lacunas
						</span>
					</div>
				</div>

				{ /* Card Body */ }
				<div className="card-body p-4">
					{ /* Styled Audio Player */ }
					{ audioUrl && (
						<div className="audio-player-container mb-4">
							<div className="audio-player-header d-flex justify-content-between align-items-center mb-2">
								<span className="fw-semibold small text-primary">
									<i className="fa-solid fa-volume-high me-1"></i>
									Ouça o áudio e preencha as lacunas com atenção:
								</span>
								<div className="btn-group btn-group-sm">
									<button
										type="button"
										className="btn btn-outline-secondary btn-audio-rewind"
										title="Voltar 5 segundos"
									>
										<i className="fa-solid fa-rotate-left me-1"></i>
										-5s
									</button>
									<button
										type="button"
										className="btn btn-outline-secondary btn-audio-speed"
										data-speed="1"
										title="Alternar velocidade"
									>
										1.0x
									</button>
								</div>
							</div>
							<audio controls className="w-100 audio-element" preload="metadata">
								<source src={ audioUrl } type="audio/mpeg" />
								Seu navegador não suporta a reprodução de áudio.
							</audio>
						</div>
					) }

					{ /* Word Bank */ }
					{ showWordBank && wordBankItems.length > 0 && (
						<div className="word-bank-container mb-4">
							<div className="fw-semibold text-secondary small mb-2 d-flex align-items-center">
								<i className="fa-solid fa-spell-check me-2"></i>
								Banco de Palavras:
							</div>
							<div className="d-flex flex-wrap gap-1">
								{ wordBankItems.map( ( word, idx ) => (
									<span key={ `wb-${ idx }` } className="word-bank-chip">
										{ word }
									</span>
								) ) }
							</div>
						</div>
					) }

					{ /* Main Text Content with embedded Inputs */ }
					<div className="text-completion-content mb-4">
						{ renderContentWithInputs() }
					</div>

					{ /* Feedback / Result Banner (initially hidden) */ }
					<div className="feedback-banner alert d-none mb-3" role="alert">
						<div className="d-flex align-items-center gap-2 feedback-message"></div>
					</div>

					{ /* Solutions Reveal Panel (initially hidden) */ }
					<div className="solutions-box d-none mb-3">
						<h6 className="fw-bold text-primary mb-2">
							<i className="fa-solid fa-circle-check me-1"></i>
							Gabarito das Respostas:
						</h6>
						<div className="solutions-list small text-secondary"></div>
					</div>

					{ /* Actions Bar */ }
					<div className="text-completion-actions d-flex flex-wrap justify-content-between align-items-center pt-3 border-top">
						<div className="d-flex flex-wrap gap-2">
							<button
								type="button"
								className={ `btn btn-${ themeColor } btn-check-answers` }
							>
								<i className="fa-solid fa-check-double me-2"></i>
								Conferir Respostas
							</button>

							<button
								type="button"
								className="btn btn-outline-secondary btn-retry d-none"
							>
								<i className="fa-solid fa-rotate-right me-2"></i>
								Tentar Novamente
							</button>

							<button
								type="button"
								className="btn btn-outline-info btn-show-answers d-none"
							>
								<i className="fa-solid fa-lightbulb me-2"></i>
								Ver Gabarito
							</button>
						</div>

						<div className="attempts-badge-container mt-2 mt-sm-0">
							{ Number( attempts ) > 0 ? (
								<span className="badge bg-light text-dark border p-2 attempts-indicator">
									<i className="fa-solid fa-bullseye me-1 text-danger"></i>
									Tentativas: <strong className="attempts-count">{ attempts }</strong>/{ attempts }
								</span>
							) : (
								<span className="badge bg-light text-dark border p-2">
									<i className="fa-solid fa-infinity me-1 text-success"></i>
									Tentativas ilimitadas
								</span>
							) }
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
