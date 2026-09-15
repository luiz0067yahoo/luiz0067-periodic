/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	RangeControl,
	TextControl,
	TextareaControl,
	Button,
	ButtonGroup,
	Notice
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Edit component for periodic Quiz Engine
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		quizTitle,
		quizDescription,
		mode,
		questions,
		showFeedback,
		timeLimit,
		passingScore,
		shuffleQuestions,
		themeColor,
	} = attributes;

	const [ activeQuestionIndex, setActiveQuestionIndex ] = useState( 0 );

	const blockProps = useBlockProps( {
		className: 'wp-block-periodic-quiz-engine wp-block-periodic-quiz-engine-editor',
	} );

	// Helpers for question management
	const updateQuestion = ( index, key, value ) => {
		const updated = [ ...questions ];
		updated[ index ] = {
			...updated[ index ],
			[ key ]: value,
		};
		setAttributes( { questions: updated } );
	};

	const addQuestion = () => {
		const newId = 'q_' + Date.now();
		let newQ = {
			id: newId,
			question: __( 'Nova Pergunta do Quiz', 'periodic-quiz-engine' ),
			options: [
				__( 'Opção 1', 'periodic-quiz-engine' ),
				__( 'Opção 2', 'periodic-quiz-engine' ),
				__( 'Opção 3', 'periodic-quiz-engine' ),
			],
			correctIndex: 0,
			correctIndices: [ 0 ],
			explanation: __( 'Explicação da resposta correta.', 'periodic-quiz-engine' ),
			points: 10,
		};

		if ( mode === 'true-false' ) {
			newQ.options = [ __( 'Verdadeiro', 'periodic-quiz-engine' ), __( 'Falso', 'periodic-quiz-engine' ) ];
		} else if ( mode === 'arithmetic' ) {
			newQ.question = '25 + 17 = ?';
			newQ.options = [ '32', '42', '45', '52' ];
			newQ.correctIndex = 1;
			newQ.correctIndices = [ 1 ];
			newQ.explanation = '25 + 17 = 42.';
		} else if ( mode === 'survey' ) {
			newQ.options = [
				__( 'Muito Satisfeito', 'periodic-quiz-engine' ),
				__( 'Satisfeito', 'periodic-quiz-engine' ),
				__( 'Neutro', 'periodic-quiz-engine' ),
				__( 'Insatisfeito', 'periodic-quiz-engine' ),
			];
			newQ.correctIndex = -1;
			newQ.correctIndices = [];
		}

		const updated = [ ...questions, newQ ];
		setAttributes( { questions: updated } );
		setActiveQuestionIndex( updated.length - 1 );
	};

	const removeQuestion = ( index ) => {
		if ( questions.length <= 1 ) {
			alert( __( 'O quiz deve conter pelo menos uma pergunta.', 'periodic-quiz-engine' ) );
			return;
		}
		const updated = questions.filter( ( _, i ) => i !== index );
		setAttributes( { questions: updated } );
		setActiveQuestionIndex( Math.max( 0, index - 1 ) );
	};

	const moveQuestion = ( fromIndex, toIndex ) => {
		if ( toIndex < 0 || toIndex >= questions.length ) return;
		const updated = [ ...questions ];
		const [ moved ] = updated.splice( fromIndex, 1 );
		updated.splice( toIndex, 0, moved );
		setAttributes( { questions: updated } );
		setActiveQuestionIndex( toIndex );
	};

	const duplicateQuestion = ( index ) => {
		const target = questions[ index ];
		const cloned = {
			...target,
			id: 'q_' + Date.now(),
			question: target.question + __( ' (Cópia)', 'periodic-quiz-engine' ),
		};
		const updated = [ ...questions ];
		updated.splice( index + 1, 0, cloned );
		setAttributes( { questions: updated } );
		setActiveQuestionIndex( index + 1 );
	};

	// Options management for active question
	const activeQ = questions[ activeQuestionIndex ] || questions[ 0 ];

	const updateOptionText = ( optIndex, text ) => {
		if ( ! activeQ ) return;
		const updatedOptions = [ ...activeQ.options ];
		updatedOptions[ optIndex ] = text;
		updateQuestion( activeQuestionIndex, 'options', updatedOptions );
	};

	const addOption = () => {
		if ( ! activeQ ) return;
		const updatedOptions = [ ...activeQ.options, __( 'Nova Opção', 'periodic-quiz-engine' ) ];
		updateQuestion( activeQuestionIndex, 'options', updatedOptions );
	};

	const removeOption = ( optIndex ) => {
		if ( ! activeQ || activeQ.options.length <= 2 ) {
			alert( __( 'Uma pergunta precisa de pelo menos 2 opções.', 'periodic-quiz-engine' ) );
			return;
		}
		const updatedOptions = activeQ.options.filter( ( _, i ) => i !== optIndex );
		let newCorrectIndex = activeQ.correctIndex;
		if ( newCorrectIndex === optIndex ) {
			newCorrectIndex = 0;
		} else if ( newCorrectIndex > optIndex ) {
			newCorrectIndex--;
		}

		let newCorrectIndices = ( activeQ.correctIndices || [] )
			.filter( ( i ) => i !== optIndex )
			.map( ( i ) => ( i > optIndex ? i - 1 : i ) );

		const updated = [ ...questions ];
		updated[ activeQuestionIndex ] = {
			...activeQ,
			options: updatedOptions,
			correctIndex: newCorrectIndex,
			correctIndices: newCorrectIndices,
		};
		setAttributes( { questions: updated } );
	};

	const toggleCorrectMultiple = ( optIndex ) => {
		const current = activeQ.correctIndices || [];
		let updatedIndices;
		if ( current.includes( optIndex ) ) {
			if ( current.length <= 1 ) {
				alert( __( 'Pelo menos uma opção deve ser marcada como correta.', 'periodic-quiz-engine' ) );
				return;
			}
			updatedIndices = current.filter( ( i ) => i !== optIndex );
		} else {
			updatedIndices = [ ...current, optIndex ];
		}
		updateQuestion( activeQuestionIndex, 'correctIndices', updatedIndices );
	};

	// Mode label helper
	const modeLabels = {
		single: __( 'Múltipla Escolha (1 Correta)', 'periodic-quiz-engine' ),
		multiple: __( 'Múltipla Escolha (Múltiplas Corretas)', 'periodic-quiz-engine' ),
		'true-false': __( 'Verdadeiro ou Falso', 'periodic-quiz-engine' ),
		arithmetic: __( 'Aritmética / Cálculo', 'periodic-quiz-engine' ),
		survey: __( 'Pesquisa / Avaliação', 'periodic-quiz-engine' ),
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Modo e Configurações Gerais', 'periodic-quiz-engine' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Modo do Quiz', 'periodic-quiz-engine' ) }
						value={ mode }
						options={ [
							{ label: __( 'Múltipla Escolha (1 Correta)', 'periodic-quiz-engine' ), value: 'single' },
							{ label: __( 'Múltipla Escolha (Múltiplas Corretas)', 'periodic-quiz-engine' ), value: 'multiple' },
							{ label: __( 'Verdadeiro ou Falso', 'periodic-quiz-engine' ), value: 'true-false' },
							{ label: __( 'Aritmética / Cálculo', 'periodic-quiz-engine' ), value: 'arithmetic' },
							{ label: __( 'Pesquisa de Opinião / Survey', 'periodic-quiz-engine' ), value: 'survey' },
						] }
						onChange={ ( newMode ) => setAttributes( { mode: newMode } ) }
						help={ __( 'Define a mecânica de resposta e pontuação do bloco.', 'periodic-quiz-engine' ) }
					/>

					<SelectControl
						label={ __( 'Cor do Tema Bootstrap', 'periodic-quiz-engine' ) }
						value={ themeColor }
						options={ [
							{ label: 'Primary (Azul)', value: 'primary' },
							{ label: 'Success (Verde)', value: 'success' },
							{ label: 'Dark (Escuro)', value: 'dark' },
							{ label: 'Info (Ciano)', value: 'info' },
							{ label: 'Warning (Dourado)', value: 'warning' },
						] }
						onChange={ ( color ) => setAttributes( { themeColor: color } ) }
					/>

					{ mode !== 'survey' && (
						<>
							<RangeControl
								label={ __( 'Nota Mínima para Aprovação (%)', 'periodic-quiz-engine' ) }
								value={ passingScore }
								onChange={ ( val ) => setAttributes( { passingScore: val } ) }
								min={ 10 }
								max={ 100 }
								step={ 5 }
							/>
							<ToggleControl
								label={ __( 'Exibir Feedback Imediato', 'periodic-quiz-engine' ) }
								checked={ showFeedback }
								onChange={ ( val ) => setAttributes( { showFeedback: val } ) }
								help={ __( 'Mostra explicações e acerto/erro imediatamente após responder cada pergunta.', 'periodic-quiz-engine' ) }
							/>
						</>
					) }

					<TextControl
						label={ __( 'Limite de Tempo (segundos)', 'periodic-quiz-engine' ) }
						value={ timeLimit }
						type="number"
						min={ 0 }
						onChange={ ( val ) => setAttributes( { timeLimit: parseInt( val, 10 ) || 0 } ) }
						help={ __( 'Defina 0 para desativar o temporizador.', 'periodic-quiz-engine' ) }
					/>

					<ToggleControl
						label={ __( 'Embaralhar Questões', 'periodic-quiz-engine' ) }
						checked={ shuffleQuestions }
						onChange={ ( val ) => setAttributes( { shuffleQuestions: val } ) }
						help={ __( 'Apresenta as questões em ordem aleatória para cada usuário.', 'periodic-quiz-engine' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Gerenciamento de Perguntas', 'periodic-quiz-engine' ) } initialOpen={ false }>
					<div className="d-flex flex-column gap-2">
						{ questions.map( ( q, idx ) => (
							<div
								key={ q.id || idx }
								className={ `p-2 border rounded d-flex align-items-center justify-content-between ${
									idx === activeQuestionIndex ? 'bg-light border-primary' : 'bg-white'
								}` }
							>
								<span
									className="text-truncate me-2"
									style={ { maxWidth: '150px', cursor: 'pointer' } }
									onClick={ () => setActiveQuestionIndex( idx ) }
								>
									<strong>#{ idx + 1 }:</strong> { q.question || __( 'Sem título', 'periodic-quiz-engine' ) }
								</span>
								<ButtonGroup>
									<Button
										isSmall
										icon="arrow-up-alt2"
										disabled={ idx === 0 }
										onClick={ () => moveQuestion( idx, idx - 1 ) }
										label={ __( 'Mover para Cima', 'periodic-quiz-engine' ) }
									/>
									<Button
										isSmall
										icon="arrow-down-alt2"
										disabled={ idx === questions.length - 1 }
										onClick={ () => moveQuestion( idx, idx + 1 ) }
										label={ __( 'Mover para Baixo', 'periodic-quiz-engine' ) }
									/>
									<Button
										isSmall
										icon="admin-page"
										onClick={ () => duplicateQuestion( idx ) }
										label={ __( 'Duplicar', 'periodic-quiz-engine' ) }
									/>
									<Button
										isSmall
										isDestructive
										icon="trash"
										onClick={ () => removeQuestion( idx ) }
										label={ __( 'Excluir', 'periodic-quiz-engine' ) }
									/>
								</ButtonGroup>
							</div>
						) ) }
						<Button isPrimary className="w-100 mt-2" onClick={ addQuestion }>
							<i className="fa-solid fa-plus me-1"></i> { __( 'Adicionar Pergunta', 'periodic-quiz-engine' ) }
						</Button>
					</div>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ /* Top Badge & Mode Preview */ }
				<div className="d-flex justify-content-between align-items-center mb-3">
					<div className="editor-quiz-header-badge">
						<i className="fa-solid fa-graduation-cap"></i>
						<span>periodic Quiz Engine &bull; { modeLabels[ mode ] }</span>
					</div>
					{ timeLimit > 0 && (
						<span className="badge bg-warning text-dark py-2 px-3">
							<i className="fa-regular fa-clock me-1"></i> { timeLimit }s
						</span>
					) }
				</div>

				{ /* WYSIWYG Bootstrap 5 Card Preview */ }
				<div className={ `quiz-engine-card card border-${ themeColor }` }>
					<div className={ `card-header bg-${ themeColor } text-white` }>
						<RichText
							tagName="h4"
							className="card-title mb-1 text-white"
							value={ quizTitle }
							onChange={ ( val ) => setAttributes( { quizTitle: val } ) }
							placeholder={ __( 'Título do Quiz...', 'periodic-quiz-engine' ) }
						/>
						<RichText
							tagName="p"
							className="card-subtitle small opacity-75 mb-0"
							value={ quizDescription }
							onChange={ ( val ) => setAttributes( { quizDescription: val } ) }
							placeholder={ __( 'Breve descrição ou instruções...', 'periodic-quiz-engine' ) }
						/>
					</div>

					<div className="card-body">
						{ /* Question Navigation Tabs */ }
						<div className="editor-question-tabs">
							{ questions.map( ( _, idx ) => (
								<button
									key={ idx }
									type="button"
									className={ `question-tab-btn ${ idx === activeQuestionIndex ? 'active' : '' }` }
									onClick={ () => setActiveQuestionIndex( idx ) }
								>
									{ __( 'Pergunta', 'periodic-quiz-engine' ) } { idx + 1 }
								</button>
							) ) }
							<button type="button" className="add-question-btn" onClick={ addQuestion }>
								<i className="fa-solid fa-plus me-1"></i> { __( 'Nova Pergunta', 'periodic-quiz-engine' ) }
							</button>
						</div>

						{ /* Question Progress Preview */ }
						<div className="quiz-progress-wrapper">
							<div className="d-flex justify-content-between small text-muted mb-1">
								<span>
									{ __( 'Pergunta', 'periodic-quiz-engine' ) } { activeQuestionIndex + 1 } { __( 'de', 'periodic-quiz-engine' ) } { questions.length }
								</span>
								{ mode !== 'survey' && (
									<span>
										<strong>{ activeQ?.points || 10 }</strong> { __( 'pontos', 'periodic-quiz-engine' ) }
									</span>
								) }
							</div>
							<div className="progress">
								<div
									className={ `progress-bar bg-${ themeColor }` }
									style={ { width: `${ ( ( activeQuestionIndex + 1 ) / questions.length ) * 100 }%` } }
								></div>
							</div>
						</div>

						{ /* Active Question Editing Area */ }
						{ activeQ && (
							<div className="editor-active-question-card">
								<div className="mb-3">
									<label className="form-label fw-bold">
										<i className="fa-regular fa-circle-question me-1 text-primary"></i>
										{ __( 'Enunciado da Pergunta:', 'periodic-quiz-engine' ) }
									</label>
									<TextareaControl
										value={ activeQ.question }
										onChange={ ( val ) => updateQuestion( activeQuestionIndex, 'question', val ) }
										placeholder={ __( 'Digite o enunciado da questão...', 'periodic-quiz-engine' ) }
										rows={ 2 }
									/>
								</div>

								{ /* Options list according to mode */ }
								<div className="mb-3">
									<label className="form-label fw-bold d-flex justify-content-between align-items-center">
										<span>
											<i className="fa-solid fa-list-check me-1 text-primary"></i>
											{ mode === 'survey'
												? __( 'Opções de Resposta:', 'periodic-quiz-engine' )
												: __( 'Alternativas (marque a correta):', 'periodic-quiz-engine' ) }
										</span>
										{ mode !== 'true-false' && mode !== 'survey' && (
											<Button isSmall isLink onClick={ addOption }>
												<i className="fa-solid fa-plus me-1"></i> { __( 'Adicionar Opção', 'periodic-quiz-engine' ) }
											</Button>
										) }
									</label>

									<div className="quiz-options-list">
										{ activeQ.options.map( ( opt, optIdx ) => {
											const isSingleCorrect = activeQ.correctIndex === optIdx;
											const isMultiCorrect = ( activeQ.correctIndices || [] ).includes( optIdx );

											return (
												<div
													key={ optIdx }
													className={ `editor-option-row ${
														mode === 'multiple'
															? isMultiCorrect ? 'is-correct-row' : ''
															: isSingleCorrect ? 'is-correct-row' : ''
													}` }
												>
													{ /* Correct Answer Selector */ }
													{ mode === 'single' || mode === 'true-false' || mode === 'arithmetic' ? (
														<input
															type="radio"
															name={ `correct-opt-${ activeQ.id }` }
															checked={ isSingleCorrect }
															onChange={ () => updateQuestion( activeQuestionIndex, 'correctIndex', optIdx ) }
															title={ __( 'Marcar como resposta correta', 'periodic-quiz-engine' ) }
															className="form-check-input"
														/>
													) : mode === 'multiple' ? (
														<input
															type="checkbox"
															checked={ isMultiCorrect }
															onChange={ () => toggleCorrectMultiple( optIdx ) }
															title={ __( 'Marcar como uma das respostas corretas', 'periodic-quiz-engine' ) }
															className="form-check-input"
														/>
													) : (
														<span className="badge bg-secondary">{ optIdx + 1 }</span>
													) }

													{ /* Option Text Input */ }
													<div className="option-input-field">
														<input
															type="text"
															className="form-control form-control-sm"
															value={ opt }
															onChange={ ( e ) => updateOptionText( optIdx, e.target.value ) }
															placeholder={ `${ __( 'Opção', 'periodic-quiz-engine' ) } ${ optIdx + 1 }` }
															disabled={ mode === 'true-false' }
														/>
													</div>

													{ /* Correct status badge */ }
													{ ( ( mode === 'multiple' && isMultiCorrect ) ||
														( mode !== 'multiple' && mode !== 'survey' && isSingleCorrect ) ) && (
														<span className="badge bg-success">
															<i className="fa-solid fa-check me-1"></i> { __( 'Correta', 'periodic-quiz-engine' ) }
														</span>
													) }

													{ /* Remove Option Button */ }
													{ mode !== 'true-false' && activeQ.options.length > 2 && (
														<Button
															isSmall
															isDestructive
															icon="no-alt"
															onClick={ () => removeOption( optIdx ) }
															label={ __( 'Remover Opção', 'periodic-quiz-engine' ) }
														/>
													) }
												</div>
											);
										} ) }
									</div>
								</div>

								{ /* Explanation & Points Settings */ }
								<div className="row g-3">
									<div className={ mode !== 'survey' ? 'col-md-9' : 'col-12' }>
										<TextareaControl
											label={ __( 'Explicação da Resposta (Feedback Educativo):', 'periodic-quiz-engine' ) }
											value={ activeQ.explanation || '' }
											onChange={ ( val ) => updateQuestion( activeQuestionIndex, 'explanation', val ) }
											placeholder={ __( 'Explique detalhadamente o porquê da resposta correta...', 'periodic-quiz-engine' ) }
											rows={ 2 }
										/>
									</div>
									{ mode !== 'survey' && (
										<div className="col-md-3">
											<TextControl
												label={ __( 'Pontos:', 'periodic-quiz-engine' ) }
												type="number"
												value={ activeQ.points || 10 }
												onChange={ ( val ) => updateQuestion( activeQuestionIndex, 'points', parseInt( val, 10 ) || 0 ) }
											/>
										</div>
									) }
								</div>

								{ /* Question Footer Actions */ }
								<div className="editor-question-actions">
									<Button
										isSecondary
										isSmall
										disabled={ activeQuestionIndex === 0 }
										onClick={ () => setActiveQuestionIndex( activeQuestionIndex - 1 ) }
									>
										<i className="fa-solid fa-arrow-left me-1"></i> { __( 'Anterior', 'periodic-quiz-engine' ) }
									</Button>

									<ButtonGroup>
										<Button isSmall onClick={ () => duplicateQuestion( activeQuestionIndex ) }>
											<i className="fa-regular fa-copy me-1"></i> { __( 'Duplicar', 'periodic-quiz-engine' ) }
										</Button>
										<Button
											isSmall
											isDestructive
											disabled={ questions.length <= 1 }
											onClick={ () => removeQuestion( activeQuestionIndex ) }
										>
											<i className="fa-regular fa-trash-can me-1"></i> { __( 'Excluir', 'periodic-quiz-engine' ) }
										</Button>
									</ButtonGroup>

									<Button
										isSecondary
										isSmall
										disabled={ activeQuestionIndex === questions.length - 1 }
										onClick={ () => setActiveQuestionIndex( activeQuestionIndex + 1 ) }
									>
										{ __( 'Próxima', 'periodic-quiz-engine' ) } <i className="fa-solid fa-arrow-right ms-1"></i>
									</Button>
								</div>
							</div>
						) }
					</div>

					<div className="card-footer d-flex justify-content-between align-items-center bg-light">
						<span className="small text-muted">
							<i className="fa-solid fa-info-circle me-1"></i>
							{ mode !== 'survey'
								? `${ __( 'Nota para aprovação:', 'periodic-quiz-engine' ) } ${ passingScore }%`
								: __( 'Modo pesquisa: sem pontuação ou nota de corte.', 'periodic-quiz-engine' ) }
						</span>
						<span className="badge bg-secondary">
							{ questions.length } { questions.length === 1 ? __( 'pergunta', 'periodic-quiz-engine' ) : __( 'perguntas', 'periodic-quiz-engine' ) }
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
