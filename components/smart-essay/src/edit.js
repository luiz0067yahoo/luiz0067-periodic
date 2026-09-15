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
	RangeControl,
	TextControl,
	TextareaControl,
	Button,
	Card,
	CardBody,
	CardHeader,
	Notice,
	Dashicon,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Block Edit Component.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		promptInstructions,
		minWords,
		maxWords,
		passingPercentage,
		keywords = [],
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'periodic-smart-essay-block-wrapper',
	} );

	// Keyword Repeater Handlers
	const handleAddKeyword = () => {
		const newKeywords = [
			...keywords,
			{
				term: '',
				weight: 20,
				synonyms: '',
				feedback: '',
			},
		];
		setAttributes( { keywords: newKeywords } );
	};

	const handleUpdateKeyword = ( index, field, value ) => {
		const updated = keywords.map( ( item, i ) => {
			if ( i === index ) {
				return {
					...item,
					[ field ]: field === 'weight' ? Number( value ) : value,
				};
			}
			return item;
		} );
		setAttributes( { keywords: updated } );
	};

	const handleRemoveKeyword = ( index ) => {
		const updated = keywords.filter( ( _, i ) => i !== index );
		setAttributes( { keywords: updated } );
	};

	// Calculate total weights for teacher awareness
	const totalWeight = keywords.reduce(
		( sum, kw ) => sum + ( Number( kw.weight ) || 0 ),
		0
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Configurações da Redação', 'periodic-smart-essay' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Mínimo de Palavras', 'periodic-smart-essay' ) }
						value={ minWords }
						onChange={ ( value ) =>
							setAttributes( { minWords: Number( value ) } )
						}
						min={ 10 }
						max={ 1000 }
						step={ 5 }
						help={ __(
							'Número mínimo de palavras exigido para aceitar a redação.',
							'periodic-smart-essay'
						) }
					/>

					<RangeControl
						label={ __( 'Máximo de Palavras Recomendado', 'periodic-smart-essay' ) }
						value={ maxWords }
						onChange={ ( value ) =>
							setAttributes( { maxWords: Number( value ) } )
						}
						min={ 50 }
						max={ 3000 }
						step={ 25 }
						help={ __(
							'Limite máximo recomendado para a extensão do texto.',
							'periodic-smart-essay'
						) }
					/>

					<RangeControl
						label={ __(
							'Nota Mínima de Aprovação (%)',
							'periodic-smart-essay'
						) }
						value={ passingPercentage }
						onChange={ ( value ) =>
							setAttributes( { passingPercentage: Number( value ) } )
						}
						min={ 10 }
						max={ 100 }
						step={ 5 }
						help={ __(
							'Percentual mínimo necessário para aprovação do aluno.',
							'periodic-smart-essay'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __(
						'Palavras-Chave e Critérios de Avaliação',
						'periodic-smart-essay'
					) }
					initialOpen={ true }
				>
					<div className="periodic-keywords-summary-banner">
						<span className="total-keywords-count">
							<strong>
								{ __( 'Total de Termos:', 'periodic-smart-essay' ) }
							</strong>{' '}
							{ keywords.length }
						</span>
						<span className="total-weight-count">
							<strong>
								{ __( 'Soma dos Pesos:', 'periodic-smart-essay' ) }
							</strong>{' '}
							{ totalWeight } pts
						</span>
					</div>

					<p className="description" style={ { marginBottom: '15px' } }>
						{ __(
							'Cadastre os conceitos-chave esperados no ensaio. O algoritmo de análise buscará o termo e seus sinônimos para computar a pontuação.',
							'periodic-smart-essay'
						) }
					</p>

					{ keywords.map( ( kw, index ) => (
						<Card
							key={ index }
							size="small"
							className="periodic-keyword-repeater-card"
							style={ {
								marginBottom: '15px',
								border: '1px solid #dcdcde',
								borderRadius: '8px',
							} }
						>
							<CardHeader
								style={ {
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									background: '#f6f7f7',
									padding: '8px 12px',
								} }
							>
								<strong>
									{ __( 'Termo #', 'periodic-smart-essay' ) }
									{ index + 1 }: { kw.term || __( '(não definido)', 'periodic-smart-essay' ) }
								</strong>
								<Button
									isDestructive
									isSmall
									variant="secondary"
									onClick={ () => handleRemoveKeyword( index ) }
									title={ __( 'Excluir termo', 'periodic-smart-essay' ) }
								>
									<Dashicon icon="trash" />
								</Button>
							</CardHeader>

							<CardBody style={ { padding: '12px' } }>
								<TextControl
									label={ __( 'Termo Principal *', 'periodic-smart-essay' ) }
									value={ kw.term }
									placeholder={ __( 'Ex: sustentabilidade', 'periodic-smart-essay' ) }
									onChange={ ( val ) =>
										handleUpdateKeyword( index, 'term', val )
									}
								/>

								<RangeControl
									label={ __( 'Peso / Pontos', 'periodic-smart-essay' ) }
									value={ kw.weight }
									onChange={ ( val ) =>
										handleUpdateKeyword( index, 'weight', val )
									}
									min={ 1 }
									max={ 100 }
									step={ 1 }
								/>

								<TextareaControl
									label={ __(
										'Sinônimos e Variações (separados por vírgula)',
										'periodic-smart-essay'
									) }
									value={ kw.synonyms }
									placeholder={ __(
										'Ex: desenvolvimento sustentável, ecológico, ambiental',
										'periodic-smart-essay'
									) }
									onChange={ ( val ) =>
										handleUpdateKeyword( index, 'synonyms', val )
									}
									help={ __(
										'A ocorrência de qualquer um destes termos concederá os pontos do critério.',
										'periodic-smart-essay'
									) }
									rows={ 2 }
								/>

								<TextareaControl
									label={ __(
										'Feedback Pedagógico ao Aluno',
										'periodic-smart-essay'
									) }
									value={ kw.feedback }
									placeholder={ __(
										'Ex: Ótima menção ao impacto ecológico!',
										'periodic-smart-essay'
									) }
									onChange={ ( val ) =>
										handleUpdateKeyword( index, 'feedback', val )
									}
									help={ __(
										'Mensagem orientativa exibida no relatório final.',
										'periodic-smart-essay'
									) }
									rows={ 2 }
								/>
							</CardBody>
						</Card>
					) ) }

					<Button
						variant="primary"
						className="w-100"
						onClick={ handleAddKeyword }
						icon="plus-alt2"
						style={ { width: '100%', justifyContent: 'center' } }
					>
						{ __( 'Adicionar Palavra-Chave', 'periodic-smart-essay' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="card shadow-sm border-0 smart-essay-editor-card">
					<div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
						<div className="d-flex align-items-center gap-2">
							<span className="dashicons dashicons-welcome-write-blog fs-4"></span>
							<h5 className="mb-0 fw-bold">
								{ __( 'Área de Redação Inteligente', 'periodic-smart-essay' ) }
							</h5>
						</div>
						<div className="d-flex gap-2 align-items-center">
							<span className="badge bg-light text-primary fw-semibold">
								{ __( 'Mínimo:', 'periodic-smart-essay' ) } { minWords } { __( 'palavras', 'periodic-smart-essay' ) }
							</span>
							<span className="badge bg-info text-white fw-semibold">
								{ __( 'Aprovação:', 'periodic-smart-essay' ) } { passingPercentage }%
							</span>
						</div>
					</div>

					<div className="card-body p-4">
						<div className="mb-3">
							<label className="form-label fw-bold text-muted text-uppercase small">
								{ __( 'Instruções e Tema da Redação (Editável WYSIWYG):', 'periodic-smart-essay' ) }
							</label>
							<div className="p-3 bg-light rounded-3 border prompt-editor-box">
								<RichText
									tagName="div"
									multiline="p"
									value={ promptInstructions }
									onChange={ ( content ) =>
										setAttributes( { promptInstructions: content } )
									}
									placeholder={ __(
										'Clique aqui para redigir o tema, orientações e diretrizes da redação para os alunos...',
										'periodic-smart-essay'
									) }
								/>
							</div>
						</div>

						{ keywords.length > 0 && (
							<div className="mb-4 p-3 bg-white border rounded-3">
								<h6 className="fw-bold text-secondary mb-2">
									<span className="dashicons dashicons-tag me-1"></span>
									{ __( 'Critérios e Conceitos Chave Cadastrados:', 'periodic-smart-essay' ) }
								</h6>
								<div className="d-flex flex-wrap gap-2">
									{ keywords.map( ( kw, idx ) => (
										<span
											key={ idx }
											className="badge bg-secondary-subtle text-secondary-emphasis border px-3 py-2"
										>
											<strong>{ kw.term || __( 'Sem nome', 'periodic-smart-essay' ) }</strong>{' '}
											<span className="text-muted">({ kw.weight } pts)</span>
										</span>
									) ) }
								</div>
							</div>
						) }

						<div className="mb-3">
							<label className="form-label fw-semibold text-secondary">
								{ __( 'Área do Aluno (Visualização do Campo de Digitação)', 'periodic-smart-essay' ) }
							</label>
							<textarea
								className="form-control"
								rows={ 6 }
								placeholder={ __(
									'No modo público, o aluno redigirá aqui seu texto. A contagem de palavras, análise de sinônimos e densidade lexical acontecerão em tempo real.',
									'periodic-smart-essay'
								) }
								disabled
								style={ { resize: 'none', backgroundColor: '#fafbfc' } }
							/>
						</div>

						<Notice
							status="info"
							isDismissible={ false }
							className="mt-3"
						>
							{ __(
								'Dica do Professor: Ajuste os termos e pontuações no painel lateral direito "Palavras-Chave e Critérios".',
								'periodic-smart-essay'
							) }
						</Notice>
					</div>

					<div className="card-footer bg-light px-4 py-3 d-flex justify-content-between align-items-center">
						<div className="text-muted small">
							<span className="me-3">
								<strong>{ __( 'Mínimo:', 'periodic-smart-essay' ) }</strong> { minWords } { __( 'palavras', 'periodic-smart-essay' ) }
							</span>
							<span>
								<strong>{ __( 'Máximo sugerido:', 'periodic-smart-essay' ) }</strong> { maxWords } { __( 'palavras', 'periodic-smart-essay' ) }
							</span>
						</div>
						<button className="btn btn-primary px-4 fw-semibold" disabled>
							{ __( 'Submeter Redação & Analisar', 'periodic-smart-essay' ) }
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
