/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	Button,
	ButtonGroup,
	ToolbarGroup,
	ToolbarButton,
	TabPanel,
	Notice,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Componente de Edição do Bloco Gutenberg (Planilha WYSIWYG)
 *
 * @param {Object}   props               Propriedades do bloco.
 * @param {Object}   props.attributes    Atributos do bloco.
 * @param {Function} props.setAttributes Função para atualizar atributos.
 * @return {JSX.Element} Elemento React do editor.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		headers = [],
		rows = [],
		isStriped = true,
		isHoverable = true,
		isBordered = true,
		headerTheme = 'table-dark',
	} = attributes;

	// Estado para rastrear a célula ou posição atualmente selecionada
	const [ selectedCell, setSelectedCell ] = useState( {
		type: 'cell',
		rowIndex: 0,
		colIndex: 0,
	} );

	const blockProps = useBlockProps( {
		className: 'periodic-table-editor-wrapper',
	} );

	// --- Ações de Manipulação de Conteúdo ---

	const updateHeader = ( value, colIndex ) => {
		const newHeaders = [ ...headers ];
		newHeaders[ colIndex ] = value;
		setAttributes( { headers: newHeaders } );
	};

	const updateCell = ( value, rowIndex, colIndex ) => {
		const newRows = rows.map( ( row, rIdx ) => {
			if ( rIdx === rowIndex ) {
				const updatedRow = [ ...row ];
				updatedRow[ colIndex ] = value;
				return updatedRow;
			}
			return row;
		} );
		setAttributes( { rows: newRows } );
	};

	// --- Ações de Estrutura (Linhas e Colunas) ---

	const addRow = ( index = rows.length ) => {
		const newRow = new Array( headers.length || 1 ).fill( '' );
		const newRows = [ ...rows ];
		newRows.splice( index, 0, newRow );
		setAttributes( { rows: newRows } );
		setSelectedCell( { type: 'cell', rowIndex: index, colIndex: 0 } );
	};

	const removeRow = ( index = rows.length - 1 ) => {
		if ( rows.length <= 1 ) {
			return;
		}
		const targetIndex = Math.max( 0, Math.min( index, rows.length - 1 ) );
		const newRows = rows.filter( ( _, idx ) => idx !== targetIndex );
		setAttributes( { rows: newRows } );
		setSelectedCell( ( prev ) => ( {
			...prev,
			rowIndex: Math.max( 0, targetIndex - 1 ),
		} ) );
	};

	const addColumn = ( index = headers.length ) => {
		const colNum = headers.length + 1;
		const newHeaderTitle = `${ __( 'Coluna', 'periodic-table-responsive' ) } ${ colNum }`;

		const newHeaders = [ ...headers ];
		newHeaders.splice( index, 0, newHeaderTitle );

		const newRows = rows.map( ( row ) => {
			const updatedRow = [ ...row ];
			updatedRow.splice( index, 0, '' );
			return updatedRow;
		} );

		setAttributes( { headers: newHeaders, rows: newRows } );
		setSelectedCell( ( prev ) => ( { ...prev, colIndex: index } ) );
	};

	const removeColumn = ( index = headers.length - 1 ) => {
		if ( headers.length <= 1 ) {
			return;
		}
		const targetIndex = Math.max( 0, Math.min( index, headers.length - 1 ) );
		const newHeaders = headers.filter( ( _, idx ) => idx !== targetIndex );
		const newRows = rows.map( ( row ) =>
			row.filter( ( _, idx ) => idx !== targetIndex )
		);

		setAttributes( { headers: newHeaders, rows: newRows } );
		setSelectedCell( ( prev ) => ( {
			...prev,
			colIndex: Math.max( 0, targetIndex - 1 ),
		} ) );
	};

	// Resetar para dados de exemplo
	const resetDefaultTable = () => {
		setAttributes( {
			headers: [
				__( 'Item', 'periodic-table-responsive' ),
				__( 'Categoria', 'periodic-table-responsive' ),
				__( 'Preço', 'periodic-table-responsive' ),
				__( 'Status', 'periodic-table-responsive' ),
			],
			rows: [
				[
					__( 'Hospedagem Cloud', 'periodic-table-responsive' ),
					__( 'Serviços Web', 'periodic-table-responsive' ),
					'R$ 89,90',
					__( 'Ativo', 'periodic-table-responsive' ),
				],
				[
					__( 'Domínio .com.br', 'periodic-table-responsive' ),
					__( 'Registro', 'periodic-table-responsive' ),
					'R$ 40,00',
					__( 'Renovado', 'periodic-table-responsive' ),
				],
				[
					__( 'Certificado SSL EV', 'periodic-table-responsive' ),
					__( 'Segurança', 'periodic-table-responsive' ),
					'R$ 199,00',
					__( 'Instalado', 'periodic-table-responsive' ),
				],
			],
		} );
	};

	// Classes dinâmicas do Bootstrap para a tabela
	const tableClasses = [
		'table',
		isStriped ? 'table-striped' : '',
		isHoverable ? 'table-hover' : '',
		isBordered ? 'table-bordered' : '',
		'align-middle',
	]
		.filter( Boolean )
		.join( ' ' );

	const headerThemeClasses =
		headerTheme !== 'default' ? headerTheme : '';

	// Opções de temas de cabeçalho Bootstrap 5
	const headerThemeOptions = [
		{ label: __( 'Padrão do Tema', 'periodic-table-responsive' ), value: 'default' },
		{ label: __( 'Escuro (Dark)', 'periodic-table-responsive' ), value: 'table-dark' },
		{ label: __( 'Azul Primário (Primary)', 'periodic-table-responsive' ), value: 'table-primary' },
		{ label: __( 'Cinza Secundário (Secondary)', 'periodic-table-responsive' ), value: 'table-secondary' },
		{ label: __( 'Verde Sucesso (Success)', 'periodic-table-responsive' ), value: 'table-success' },
		{ label: __( 'Vermelho Alerta (Danger)', 'periodic-table-responsive' ), value: 'table-danger' },
		{ label: __( 'Amarelo Aviso (Warning)', 'periodic-table-responsive' ), value: 'table-warning' },
		{ label: __( 'Ciano Informativo (Info)', 'periodic-table-responsive' ), value: 'table-info' },
		{ label: __( 'Claro (Light)', 'periodic-table-responsive' ), value: 'table-light' },
	];

	return (
		<>
			{ /* Barra de Ferramentas do Bloco (BlockControls) */ }
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="insert-row-after"
						label={ __( 'Adicionar Linha Abaixo', 'periodic-table-responsive' ) }
						onClick={ () => addRow( selectedCell.rowIndex + 1 ) }
					/>
					<ToolbarButton
						icon="insert-column-after"
						label={ __( 'Adicionar Coluna à Direita', 'periodic-table-responsive' ) }
						onClick={ () => addColumn( selectedCell.colIndex + 1 ) }
					/>
					<ToolbarButton
						icon="trash"
						label={ __( 'Remover Linha Selecionada', 'periodic-table-responsive' ) }
						onClick={ () => removeRow( selectedCell.rowIndex ) }
						disabled={ rows.length <= 1 }
					/>
					<ToolbarButton
						icon="trash"
						label={ __( 'Remover Coluna Selecionada', 'periodic-table-responsive' ) }
						onClick={ () => removeColumn( selectedCell.colIndex ) }
						disabled={ headers.length <= 1 }
					/>
				</ToolbarGroup>
			</BlockControls>

			{ /* Painel Lateral de Configurações (InspectorControls) com Abas */ }
			<InspectorControls>
				<div className="periodic-inspector-header">
					<i className="fa-solid fa-table-cells-large"></i>
					<h4>{ __( 'Configurações da Tabela', 'periodic-table-responsive' ) }</h4>
				</div>

				<TabPanel
					className="periodic-table-tabs"
					activeClass="is-active"
					tabs={ [
						{
							name: 'structure',
							title: __( 'Estrutura da Tabela', 'periodic-table-responsive' ),
							className: 'tab-structure',
						},
						{
							name: 'styles',
							title: __( 'Estilos Bootstrap', 'periodic-table-responsive' ),
							className: 'tab-styles',
						},
						{
							name: 'colors',
							title: __( 'Cores do Cabeçalho', 'periodic-table-responsive' ),
							className: 'tab-colors',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'structure' ) {
							return (
								<PanelBody
									title={ __( 'Gerenciar Linhas e Colunas', 'periodic-table-responsive' ) }
									initialOpen={ true }
								>
									<p className="description">
										{ __(
											'Insira ou remova linhas e colunas na planilha diretamente aqui ou pela barra de ferramentas.',
											'periodic-table-responsive'
										) }
									</p>

									<div className="periodic-control-group">
										<label className="periodic-group-title">
											<i className="fa-solid fa-arrows-up-down"></i>{' '}
											{ __( 'Linhas', 'periodic-table-responsive' ) } ({ rows.length })
										</label>
										<ButtonGroup className="periodic-btn-group-full">
											<Button
												variant="secondary"
												icon="insert-row-after"
												onClick={ () => addRow() }
											>
												{ __( '+ Adicionar Linha', 'periodic-table-responsive' ) }
											</Button>
											<Button
												variant="secondary"
												isDestructive
												icon="trash"
												onClick={ () => removeRow() }
												disabled={ rows.length <= 1 }
											>
												{ __( 'Excluir Linha', 'periodic-table-responsive' ) }
											</Button>
										</ButtonGroup>
									</div>

									<div className="periodic-control-group">
										<label className="periodic-group-title">
											<i className="fa-solid fa-arrows-left-right"></i>{' '}
											{ __( 'Colunas', 'periodic-table-responsive' ) } ({ headers.length })
										</label>
										<ButtonGroup className="periodic-btn-group-full">
											<Button
												variant="secondary"
												icon="insert-column-after"
												onClick={ () => addColumn() }
											>
												{ __( '+ Adicionar Coluna', 'periodic-table-responsive' ) }
											</Button>
											<Button
												variant="secondary"
												isDestructive
												icon="trash"
												onClick={ () => removeColumn() }
												disabled={ headers.length <= 1 }
											>
												{ __( 'Excluir Coluna', 'periodic-table-responsive' ) }
											</Button>
										</ButtonGroup>
									</div>

									<div className="periodic-control-group mt-3">
										<Button
											variant="tertiary"
											isSmall
											onClick={ resetDefaultTable }
										>
											<i className="fa-solid fa-rotate-left"></i>{' '}
											{ __( 'Restaurar Tabela de Exemplo', 'periodic-table-responsive' ) }
										</Button>
									</div>
								</PanelBody>
							);
						}

						if ( tab.name === 'styles' ) {
							return (
								<PanelBody
									title={ __( 'Estilos Nativos do Bootstrap 5', 'periodic-table-responsive' ) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Linhas Alternadas (Striped)', 'periodic-table-responsive' ) }
										help={ __(
											'Aplica classe .table-striped para diferenciar linhas consecutivas com tons suaves.',
											'periodic-table-responsive'
										) }
										checked={ isStriped }
										onChange={ ( value ) =>
											setAttributes( { isStriped: value } )
										}
									/>

									<ToggleControl
										label={ __( 'Efeito ao Passar o Mouse (Hover)', 'periodic-table-responsive' ) }
										help={ __(
											'Aplica classe .table-hover para destacar a linha sob o cursor.',
											'periodic-table-responsive'
										) }
										checked={ isHoverable }
										onChange={ ( value ) =>
											setAttributes( { isHoverable: value } )
										}
									/>

									<ToggleControl
										label={ __( 'Bordas em Todas as Células (Bordered)', 'periodic-table-responsive' ) }
										help={ __(
											'Aplica classe .table-bordered exibindo moldura e divisórias nítidas.',
											'periodic-table-responsive'
										) }
										checked={ isBordered }
										onChange={ ( value ) =>
											setAttributes( { isBordered: value } )
										}
									/>

									<Notice status="info" isDismissible={ false }>
										<p>
											<strong>Bootstrap 5:</strong> { __( 'Todas as tabelas são automaticamente envolvidas no container responsivo .table-responsive.', 'periodic-table-responsive' ) }
										</p>
									</Notice>
								</PanelBody>
							);
						}

						if ( tab.name === 'colors' ) {
							return (
								<PanelBody
									title={ __( 'Tema do Cabeçalho (thead)', 'periodic-table-responsive' ) }
									initialOpen={ true }
								>
									<SelectControl
										label={ __( 'Selecione a Cor / Tema do Cabeçalho', 'periodic-table-responsive' ) }
										value={ headerTheme }
										options={ headerThemeOptions }
										onChange={ ( value ) =>
											setAttributes( { headerTheme: value } )
										}
										help={ __(
											'Define o contraste e a cor temática do cabeçalho de acordo com a paleta do Bootstrap 5.',
											'periodic-table-responsive'
										) }
									/>

									<div className="periodic-theme-preview-palette">
										<div className="preview-label">
											{ __( 'Paleta Visual:', 'periodic-table-responsive' ) }
										</div>
										<div className="preview-badges">
											{ headerThemeOptions.map( ( opt ) => (
												<button
													key={ opt.value }
													type="button"
													className={ `palette-badge ${ opt.value } ${
														headerTheme === opt.value ? 'selected' : ''
													}` }
													onClick={ () =>
														setAttributes( {
															headerTheme: opt.value,
														} )
													}
													title={ opt.label }
												>
													{ opt.label.split( ' ' )[ 0 ] }
												</button>
											) ) }
										</div>
									</div>
								</PanelBody>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			{ /* Planilha Inline Editável (WYSIWYG) */ }
			<div { ...blockProps }>
				<div className="periodic-table-toolbar-inline">
					<div className="table-badge">
						<i className="fa-solid fa-table"></i>{' '}
						<span>{ __( 'Tabela Responsiva Bootstrap 5', 'periodic-table-responsive' ) }</span>
					</div>
					<div className="table-actions">
						<button
							type="button"
							className="action-btn"
							onClick={ () => addColumn() }
							title={ __( 'Adicionar Coluna', 'periodic-table-responsive' ) }
						>
							<i className="fa-solid fa-plus"></i> { __( 'Coluna', 'periodic-table-responsive' ) }
						</button>
						<button
							type="button"
							className="action-btn"
							onClick={ () => addRow() }
							title={ __( 'Adicionar Linha', 'periodic-table-responsive' ) }
						>
							<i className="fa-solid fa-plus"></i> { __( 'Linha', 'periodic-table-responsive' ) }
						</button>
					</div>
				</div>

				<div className="table-responsive periodic-table-container">
					<table className={ tableClasses }>
						<thead className={ headerThemeClasses }>
							<tr>
								{ headers.map( ( headerText, colIndex ) => (
									<th
										key={ `th-${ colIndex }` }
										scope="col"
										className={
											selectedCell.colIndex === colIndex
												? 'is-col-active'
												: ''
										}
									>
										<div className="th-cell-content">
											<RichText
												tagName="span"
												value={ headerText }
												onChange={ ( val ) =>
													updateHeader( val, colIndex )
												}
												placeholder={ __( 'Cabeçalho...', 'periodic-table-responsive' ) }
												onFocus={ () =>
													setSelectedCell( {
														type: 'header',
														colIndex,
													} )
												}
											/>
											{ headers.length > 1 && (
												<button
													type="button"
													className="cell-delete-col"
													title={ __( 'Excluir esta coluna', 'periodic-table-responsive' ) }
													onClick={ ( e ) => {
														e.stopPropagation();
														removeColumn( colIndex );
													} }
												>
													&times;
												</button>
											) }
										</div>
									</th>
								) ) }
							</tr>
						</thead>
						<tbody>
							{ rows.map( ( row, rowIndex ) => (
								<tr
									key={ `row-${ rowIndex }` }
									className={
										selectedCell.rowIndex === rowIndex
											? 'is-row-active'
											: ''
									}
								>
									{ row.map( ( cellText, colIndex ) => (
										<td
											key={ `cell-${ rowIndex }-${ colIndex }` }
											className={
												selectedCell.rowIndex ===
													rowIndex &&
												selectedCell.colIndex ===
													colIndex
													? 'is-cell-focused'
													: ''
											}
										>
											<div className="td-cell-content">
												<RichText
													tagName="span"
													value={ cellText }
													onChange={ ( val ) =>
														updateCell(
															val,
															rowIndex,
															colIndex
														)
													}
													placeholder={ __( 'Texto...', 'periodic-table-responsive' ) }
													onFocus={ () =>
														setSelectedCell( {
															type: 'cell',
															rowIndex,
															colIndex,
														} )
													}
												/>
												{ colIndex === row.length - 1 &&
													rows.length > 1 && (
														<button
															type="button"
															className="cell-delete-row"
															title={ __( 'Excluir esta linha', 'periodic-table-responsive' ) }
															onClick={ ( e ) => {
																e.stopPropagation();
																removeRow( rowIndex );
															} }
														>
															&times;
														</button>
													) }
											</div>
										</td>
									) ) }
								</tr>
							) ) }
						</tbody>
					</table>
				</div>
				<div className="periodic-table-footer-hint">
					<small>
						<i className="fa-solid fa-lightbulb"></i>{' '}
						{ __(
							'Dica: Clique em qualquer célula para editar seu conteúdo inline com suporte a formatação.',
							'periodic-table-responsive'
						) }
					</small>
				</div>
			</div>
		</>
	);
}
