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
	SelectControl,
	ToggleControl,
	TextControl,
	TextareaControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

// Template presets
const PRESETS = {
	cornell: {
		documentTitle: __( 'Notas Cornell & Escrita Estruturada', 'periodic-structured-writing' ),
		documentSubtitle: __( 'Tome notas durante a aula, elabore perguntas-chave e faça a síntese final.', 'periodic-structured-writing' ),
		sections: [
			{
				id: 'cues',
				title: __( 'Tópicos & Palavras-chave', 'periodic-structured-writing' ),
				placeholder: __( 'Perguntas-chave, conceitos centrais, dúvidas e tópicos para revisão rápida...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Destaque palavras-chave, indagações e ideias-força que sintetizem o conteúdo.', 'periodic-structured-writing' ),
				colSpan: 'col-md-4',
			},
			{
				id: 'notes',
				title: __( 'Notas de Aula & Ideias', 'periodic-structured-writing' ),
				placeholder: __( 'Anote as explicações detalhadas, esquemas, argumentos e observações...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Registre os pontos explicados com suas palavras, fórmulas ou argumentos de sustentação.', 'periodic-structured-writing' ),
				colSpan: 'col-md-8',
			},
			{
				id: 'summary',
				title: __( 'Síntese & Conclusão', 'periodic-structured-writing' ),
				placeholder: __( 'Resuma a essência de todo o aprendizado em 2 a 4 frases conclusivas...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Escreva um resumo conciso conectando os tópicos às notas para fixação definitiva.', 'periodic-structured-writing' ),
				colSpan: 'col-12',
			},
		],
	},
	'step-by-step': {
		documentTitle: __( 'Escrita Guiada Passo a Passo', 'periodic-structured-writing' ),
		documentSubtitle: __( 'Siga as etapas progressivas para estruturar uma redação ou proposta completa.', 'periodic-structured-writing' ),
		sections: [
			{
				id: 'step1',
				title: __( '1. Introdução & Tese', 'periodic-structured-writing' ),
				placeholder: __( 'Apresente o contexto do tema e posicione sua tese central...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Defina o tema, exponha o problema e declare claramente o objetivo ou ponto de vista.', 'periodic-structured-writing' ),
				colSpan: 'col-12',
			},
			{
				id: 'step2',
				title: __( '2. Desenvolvimento & Argumentos', 'periodic-structured-writing' ),
				placeholder: __( 'Desenvolva os argumentos, evidências, exemplos e contra-argumentos...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Sustente sua tese com dados, causas, consequências e raciocínios consistentes.', 'periodic-structured-writing' ),
				colSpan: 'col-12',
			},
			{
				id: 'step3',
				title: __( '3. Conclusão & Proposta de Intervenção', 'periodic-structured-writing' ),
				placeholder: __( 'Conclua seu texto propondo soluções ou sintetizando as conclusões finais...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Amarre as ideias principais e aponte desdobramentos ou plano de ação.', 'periodic-structured-writing' ),
				colSpan: 'col-12',
			},
		],
	},
	'report-doc': {
		documentTitle: __( 'Relatório Técnico & Executivo', 'periodic-structured-writing' ),
		documentSubtitle: __( 'Estruture objetivos, metodologia e resultados com padrão documental formal.', 'periodic-structured-writing' ),
		sections: [
			{
				id: 'obj',
				title: __( 'Objetivo & Escopo', 'periodic-structured-writing' ),
				placeholder: __( 'Descreva claramente o propósito da análise, público-alvo e limites...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Especifique a meta principal e o contexto do trabalho ou pesquisa.', 'periodic-structured-writing' ),
				colSpan: 'col-md-6',
			},
			{
				id: 'method',
				title: __( 'Metodologia & Coleta de Dados', 'periodic-structured-writing' ),
				placeholder: __( 'Descreva ferramentas, etapas de investigação e procedimentos adotados...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Apresente como a análise foi construída e os parâmetros adotados.', 'periodic-structured-writing' ),
				colSpan: 'col-md-6',
			},
			{
				id: 'results',
				title: __( 'Resultados & Recomendações', 'periodic-structured-writing' ),
				placeholder: __( 'Apresente os achados mais relevantes e recomendações acionáveis...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Destaque o impacto prático, lições aprendidas e encaminhamentos.', 'periodic-structured-writing' ),
				colSpan: 'col-12',
			},
		],
	},
};

/**
 * Edit Component.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		templateType = 'cornell',
		documentTitle = '',
		documentSubtitle = '',
		allowPrintPdf = true,
		allowCopy = true,
		allowClearDraft = true,
		showWordCount = true,
		sections = [],
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'periodic-structured-writing-container my-4',
	} );

	// Apply preset template
	const applyPreset = ( type ) => {
		const preset = PRESETS[ type ] || PRESETS.cornell;
		setAttributes( {
			templateType: type,
			documentTitle: preset.documentTitle,
			documentSubtitle: preset.documentSubtitle,
			sections: preset.sections,
		} );
	};

	// Section management
	const updateSection = ( index, field, value ) => {
		const newSections = [ ...sections ];
		newSections[ index ] = {
			...newSections[ index ],
			[ field ]: value,
		};
		setAttributes( { sections: newSections } );
	};

	const addSection = () => {
		const newSections = [
			...sections,
			{
				id: `sec_${ Date.now() }`,
				title: __( 'Nova Seção', 'periodic-structured-writing' ),
				placeholder: __( 'Digite aqui o conteúdo desta seção...', 'periodic-structured-writing' ),
				promptGuidance: __( 'Insira orientações para auxiliar no preenchimento desta etapa.', 'periodic-structured-writing' ),
				colSpan: 'col-12',
			},
		];
		setAttributes( { sections: newSections } );
	};

	const removeSection = ( index ) => {
		if ( sections.length <= 1 ) {
			return;
		}
		const newSections = sections.filter( ( _, i ) => i !== index );
		setAttributes( { sections: newSections } );
	};

	const moveSection = ( index, direction ) => {
		const targetIndex = index + direction;
		if ( targetIndex < 0 || targetIndex >= sections.length ) {
			return;
		}
		const newSections = [ ...sections ];
		const [ moved ] = newSections.splice( index, 1 );
		newSections.splice( targetIndex, 0, moved );
		setAttributes( { sections: newSections } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Modelo e Estrutura', 'periodic-structured-writing' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Tipo de Modelo de Escrita', 'periodic-structured-writing' ) }
						value={ templateType }
						options={ [
							{
								label: __( 'Notas Cornell (Tópicos, Notas e Síntese)', 'periodic-structured-writing' ),
								value: 'cornell',
							},
							{
								label: __( 'Escrita Guiada Passo a Passo (Abas)', 'periodic-structured-writing' ),
								value: 'step-by-step',
							},
							{
								label: __( 'Relatório / Documento Técnico (Modular)', 'periodic-structured-writing' ),
								value: 'report-doc',
							},
						] }
						onChange={ ( newType ) => {
							applyPreset( newType );
						} }
					/>
					<Button
						variant="secondary"
						isSmall
						onClick={ () => applyPreset( templateType ) }
						className="mb-3 w-100"
					>
						{ __( 'Restaurar Textos Padrão do Modelo', 'periodic-structured-writing' ) }
					</Button>
				</PanelBody>

				<PanelBody
					title={ __( 'Recursos e Exportação', 'periodic-structured-writing' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Permitir Impressão / Exportar PDF', 'periodic-structured-writing' ) }
						help={ __( 'Ativa botão com formatação otimizada para salvar documento em PDF.', 'periodic-structured-writing' ) }
						checked={ allowPrintPdf }
						onChange={ ( val ) => setAttributes( { allowPrintPdf: val } ) }
					/>
					<ToggleControl
						label={ __( 'Permitir Copiar Formatado', 'periodic-structured-writing' ) }
						help={ __( 'Copia todo o conteúdo estruturado para a área de transferência em Markdown.', 'periodic-structured-writing' ) }
						checked={ allowCopy }
						onChange={ ( val ) => setAttributes( { allowCopy: val } ) }
					/>
					<ToggleControl
						label={ __( 'Botão Limpar Rascunho', 'periodic-structured-writing' ) }
						help={ __( 'Permite ao aluno resetar suas anotações com diálogo de confirmação.', 'periodic-structured-writing' ) }
						checked={ allowClearDraft }
						onChange={ ( val ) => setAttributes( { allowClearDraft: val } ) }
					/>
					<ToggleControl
						label={ __( 'Exibir Contagem de Palavras', 'periodic-structured-writing' ) }
						help={ __( 'Mostra contador dinâmico de palavras e caracteres por seção.', 'periodic-structured-writing' ) }
						checked={ showWordCount }
						onChange={ ( val ) => setAttributes( { showWordCount: val } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Gerenciador de Seções / Painéis', 'periodic-structured-writing' ) }
					initialOpen={ false }
				>
					{ sections.map( ( sec, idx ) => (
						<div key={ sec.id || idx } className="section-item-control">
							<div className="d-flex justify-content-between align-items-center mb-2">
								<strong className="text-primary small">
									#{ idx + 1 }: { sec.title }
								</strong>
								<ButtonGroup>
									<Button
										isSmall
										icon="arrow-up-alt2"
										label={ __( 'Mover para cima', 'periodic-structured-writing' ) }
										disabled={ idx === 0 }
										onClick={ () => moveSection( idx, -1 ) }
									/>
									<Button
										isSmall
										icon="arrow-down-alt2"
										label={ __( 'Mover para baixo', 'periodic-structured-writing' ) }
										disabled={ idx === sections.length - 1 }
										onClick={ () => moveSection( idx, 1 ) }
									/>
									<Button
										isSmall
										isDestructive
										icon="trash"
										label={ __( 'Remover seção', 'periodic-structured-writing' ) }
										disabled={ sections.length <= 1 }
										onClick={ () => removeSection( idx ) }
									/>
								</ButtonGroup>
							</div>

							<TextControl
								label={ __( 'Título da Seção', 'periodic-structured-writing' ) }
								value={ sec.title }
								onChange={ ( val ) => updateSection( idx, 'title', val ) }
							/>
							<TextareaControl
								label={ __( 'Orientações pedagógicas / Prompt', 'periodic-structured-writing' ) }
								value={ sec.promptGuidance }
								rows={ 2 }
								onChange={ ( val ) => updateSection( idx, 'promptGuidance', val ) }
							/>
							<TextControl
								label={ __( 'Texto de Placeholder', 'periodic-structured-writing' ) }
								value={ sec.placeholder }
								onChange={ ( val ) => updateSection( idx, 'placeholder', val ) }
							/>
							<SelectControl
								label={ __( 'Largura da Coluna (Bootstrap)', 'periodic-structured-writing' ) }
								value={ sec.colSpan || 'col-12' }
								options={ [
									{ label: 'Largura Total (col-12)', value: 'col-12' },
									{ label: 'Metade (col-md-6)', value: 'col-md-6' },
									{ label: '1/3 - Coluna Estreita (col-md-4)', value: 'col-md-4' },
									{ label: '2/3 - Coluna Ampla (col-md-8)', value: 'col-md-8' },
								] }
								onChange={ ( val ) => updateSection( idx, 'colSpan', val ) }
							/>
						</div>
					) ) }

					<Button
						variant="secondary"
						className="w-100 mt-2"
						onClick={ addSection }
					>
						+ { __( 'Adicionar Seção', 'periodic-structured-writing' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="card shadow-sm border-0 structured-writing-card">
					{ /* Header */ }
					<div className="card-header structured-writing-header text-white p-4">
						<div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
							<span className="badge bg-light text-primary fw-semibold px-3 py-1">
								{ templateType === 'cornell' && __( 'Modelo: Notas Cornell', 'periodic-structured-writing' ) }
								{ templateType === 'step-by-step' && __( 'Modelo: Passo a Passo (Abas)', 'periodic-structured-writing' ) }
								{ templateType === 'report-doc' && __( 'Modelo: Relatório Técnico', 'periodic-structured-writing' ) }
							</span>
							<small className="text-white-50">
								{ __( 'Auto-save no LocalStorage ativado', 'periodic-structured-writing' ) }
							</small>
						</div>

						<RichText
							tagName="h4"
							className="mb-1 text-white fw-bold"
							value={ documentTitle }
							onChange={ ( val ) => setAttributes( { documentTitle: val } ) }
							placeholder={ __( 'Título da Atividade ou Documento...', 'periodic-structured-writing' ) }
						/>

						<RichText
							tagName="p"
							className="mb-0 text-white-50 small"
							value={ documentSubtitle }
							onChange={ ( val ) => setAttributes( { documentSubtitle: val } ) }
							placeholder={ __( 'Orientações gerais para o estudante...', 'periodic-structured-writing' ) }
						/>
					</div>

					{ /* Body */ }
					<div className="card-body p-4">
						{ templateType === 'step-by-step' && (
							<ul className="nav nav-pills mb-4 flex-wrap gap-2">
								{ sections.map( ( sec, idx ) => (
									<li key={ idx } className="nav-item">
										<button
											type="button"
											className={ `nav-link ${ idx === 0 ? 'active' : '' }` }
										>
											<span className="badge-step">{ idx + 1 }</span>
											{ sec.title }
										</button>
									</li>
								) ) }
							</ul>
						) }

						<div className="row g-4">
							{ sections.map( ( sec, idx ) => {
								const colClass = sec.colSpan || ( templateType === 'cornell' ? ( idx === 0 ? 'col-md-4' : idx === 1 ? 'col-md-8' : 'col-12' ) : 'col-12' );
								return (
									<div key={ sec.id || idx } className={ colClass }>
										<div className="p-3 structured-section-box h-100">
											<div className="d-flex justify-content-between align-items-center mb-2">
												<h6 className="fw-bold text-primary mb-0">
													{ sec.title }
												</h6>
												<span className="text-muted small">
													{ __( 'Painel editável', 'periodic-structured-writing' ) }
												</span>
											</div>

											{ sec.promptGuidance && (
												<div className="section-guidance-callout mb-3">
													<div className="d-flex align-items-start gap-2">
														<span className="dashicons dashicons-info text-primary mt-1"></span>
														<div>
															<strong>{ __( 'Instruções:', 'periodic-structured-writing' ) } </strong>
															<span>{ sec.promptGuidance }</span>
														</div>
													</div>
												</div>
											) }

											<textarea
												className="form-control structured-textarea"
												rows={ colClass === 'col-12' ? 3 : 6 }
												placeholder={ sec.placeholder }
												disabled
											/>
										</div>
									</div>
								);
							} ) }
						</div>

						{ /* Action buttons preview */ }
						<div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-4 pt-3 border-top">
							<div className="d-flex gap-2">
								{ allowClearDraft && (
									<button type="button" className="btn btn-outline-secondary btn-sm" disabled>
										{ __( 'Limpar Rascunho', 'periodic-structured-writing' ) }
									</button>
								) }
							</div>
							<div className="d-flex gap-2">
								{ allowCopy && (
									<button type="button" className="btn btn-outline-primary btn-sm" disabled>
										{ __( 'Copiar Formatado', 'periodic-structured-writing' ) }
									</button>
								) }
								{ allowPrintPdf && (
									<button type="button" className="btn btn-primary btn-sm" disabled>
										{ __( 'Imprimir / PDF', 'periodic-structured-writing' ) }
									</button>
								) }
							</div>
						</div>
					</div>

					<div className="card-footer bg-light px-4 py-2 text-muted small d-flex justify-content-between">
						<span>{ __( 'Bloco Interativo com LocalStorage e Impressão A4 Otimizada', 'periodic-structured-writing' ) }</span>
						<span>Periodic Structured Writing</span>
					</div>
				</div>
			</div>
		</>
	);
}
