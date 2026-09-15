import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	Button,
	TextControl,
	SelectControl,
	ColorPalette,
	BaseControl,
	ButtonGroup,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { tabStyle, tabAlignment, activeColor, tabs } = attributes;

	// Garante que há pelo menos uma aba selecionada
	const [ activeTabId, setActiveTabId ] = useState( tabs[ 0 ]?.id || '' );

	// Sincroniza activeTabId caso as abas mudem ou a atual seja removida
	useEffect( () => {
		if ( ! tabs.some( ( t ) => t.id === activeTabId ) ) {
			if ( tabs.length > 0 ) {
				setActiveTabId( tabs[ 0 ].id );
			}
		}
	}, [ tabs, activeTabId ] );

	// Atualiza o título de uma aba específica
	const updateTabTitle = ( tabId, newTitle ) => {
		const updatedTabs = tabs.map( ( tab ) =>
			tab.id === tabId ? { ...tab, title: newTitle } : tab
		);
		setAttributes( { tabs: updatedTabs } );
	};

	// Atualiza o conteúdo HTML de uma aba específica
	const updateTabContent = ( tabId, newContent ) => {
		const updatedTabs = tabs.map( ( tab ) =>
			tab.id === tabId ? { ...tab, contentHtml: newContent } : tab
		);
		setAttributes( { tabs: updatedTabs } );
	};

	// Atualiza o ícone de uma aba específica
	const updateTabIcon = ( tabId, newIcon ) => {
		const updatedTabs = tabs.map( ( tab ) =>
			tab.id === tabId ? { ...tab, icon: newIcon } : tab
		);
		setAttributes( { tabs: updatedTabs } );
	};

	// Adiciona uma nova aba
	const addTab = () => {
		const newIndex = tabs.length + 1;
		const newTabId = `luiz-tab-${ Date.now() }`;
		const newTab = {
			id: newTabId,
			title: `${ __( 'Aba', 'periodic-tabs' ) } ${ newIndex }`,
			icon: 'fas fa-folder',
			active: false,
			contentHtml: `<p>${ __( 'Conteúdo da nova aba. Escreva seu texto aqui.', 'periodic-tabs' ) }</p>`,
		};
		setAttributes( { tabs: [ ...tabs, newTab ] } );
		setActiveTabId( newTabId );
	};

	// Remove uma aba existente
	const removeTab = ( tabId ) => {
		if ( tabs.length <= 1 ) {
			return; // Mantém no mínimo uma aba
		}
		const filteredTabs = tabs.filter( ( tab ) => tab.id !== tabId );
		setAttributes( { tabs: filteredTabs } );
		if ( activeTabId === tabId && filteredTabs.length > 0 ) {
			setActiveTabId( filteredTabs[ 0 ].id );
		}
	};

	// Move uma aba para cima ou para baixo
	const moveTab = ( index, direction ) => {
		const targetIndex = direction === 'up' ? index - 1 : index + 1;
		if ( targetIndex < 0 || targetIndex >= tabs.length ) {
			return;
		}
		const newTabs = [ ...tabs ];
		const [ movedTab ] = newTabs.splice( index, 1 );
		newTabs.splice( targetIndex, 0, movedTab );
		setAttributes( { tabs: newTabs } );
	};

	// Encontra a aba ativa no momento
	const currentTab = tabs.find( ( t ) => t.id === activeTabId ) || tabs[ 0 ];

	const blockProps = useBlockProps( {
		className: `periodic-tabs-block periodic-tabs-${ tabStyle } periodic-alignment-${ tabAlignment }`,
		style: activeColor ? { '--periodic-tab-active-color': activeColor } : {},
	} );

	// Paleta de cores recomendadas
	const colorPalette = [
		{ name: __( 'Azul Primário', 'periodic-tabs' ), color: '#0d6efd' },
		{ name: __( 'Índigo Moderno', 'periodic-tabs' ), color: '#6610f2' },
		{ name: __( 'Roxo Nobre', 'periodic-tabs' ), color: '#6f42c1' },
		{ name: __( 'Rosa Destaque', 'periodic-tabs' ), color: '#d63384' },
		{ name: __( 'Vermelho Perigo', 'periodic-tabs' ), color: '#dc3545' },
		{ name: __( 'Laranja Quente', 'periodic-tabs' ), color: '#fd7e14' },
		{ name: __( 'Amarelo Aviso', 'periodic-tabs' ), color: '#ffc107' },
		{ name: __( 'Verde Sucesso', 'periodic-tabs' ), color: '#198754' },
		{ name: __( 'Azul Petróleo', 'periodic-tabs' ), color: '#20c997' },
		{ name: __( 'Ciano Info', 'periodic-tabs' ), color: '#0dcaf0' },
		{ name: __( 'Grafite Escuro', 'periodic-tabs' ), color: '#212529' },
	];

	// Ícones pré-configurados sugeridos
	const iconPresets = [
		{ label: __( 'Pasta', 'periodic-tabs' ), icon: 'fas fa-folder' },
		{ label: __( 'Estrela', 'periodic-tabs' ), icon: 'fas fa-star' },
		{ label: __( 'Configurações', 'periodic-tabs' ), icon: 'fas fa-gear' },
		{ label: __( 'Livro', 'periodic-tabs' ), icon: 'fas fa-book' },
		{ label: __( 'Verificado', 'periodic-tabs' ), icon: 'fas fa-check-circle' },
		{ label: __( 'Informação', 'periodic-tabs' ), icon: 'fas fa-info-circle' },
		{ label: __( 'Coração', 'periodic-tabs' ), icon: 'fas fa-heart' },
		{ label: __( 'Fogo', 'periodic-tabs' ), icon: 'fas fa-fire' },
		{ label: __( 'Gráfico', 'periodic-tabs' ), icon: 'fas fa-chart-line' },
	];

	return (
		<>
			<InspectorControls>
				<div className="periodic-inspector-tabs-wrapper">
					<TabPanel
						className="periodic-settings-tab-panel"
						activeClass="is-active"
						tabs={ [
							{
								name: 'items',
								title: __( 'Itens de Aba', 'periodic-tabs' ),
								className: 'tab-items',
							},
							{
								name: 'style',
								title: __( 'Estilo Visual', 'periodic-tabs' ),
								className: 'tab-style',
							},
							{
								name: 'icons',
								title: __( 'Ícones', 'periodic-tabs' ),
								className: 'tab-icons',
							},
						] }
					>
						{ ( tabItem ) => {
							if ( tabItem.name === 'items' ) {
								return (
									<PanelBody title={ __( 'Gerenciador de Abas', 'periodic-tabs' ) } initialOpen={ true }>
										<p className="description">
											{ __(
												'Adicione, reordene, renomeie e exclua guias de navegação.',
												'periodic-tabs'
											) }
										</p>
										<Button
											variant="primary"
											icon="plus"
											onClick={ addTab }
											className="w-100 mb-3"
										>
											{ __( 'Adicionar Nova Aba', 'periodic-tabs' ) }
										</Button>

										<div className="periodic-tab-items-list">
											{ tabs.map( ( tab, index ) => (
												<div
													key={ tab.id }
													className={ `periodic-item-row ${
														tab.id === activeTabId ? 'is-selected' : ''
													}` }
												>
													<div className="periodic-item-row-header">
														<span className="periodic-item-row-index">
															#{ index + 1 }
														</span>
														<strong
															className="periodic-item-row-title"
															onClick={ () => setActiveTabId( tab.id ) }
															title={ __( 'Clique para editar esta aba', 'periodic-tabs' ) }
														>
															{ tab.icon && (
																<i className={ `${ tab.icon } me-1` }></i>
															) }
															{ tab.title || __( '(Sem título)', 'periodic-tabs' ) }
														</strong>
														<div className="periodic-item-row-actions">
															<Button
																icon="arrow-up-alt2"
																size="small"
																disabled={ index === 0 }
																onClick={ () => moveTab( index, 'up' ) }
																label={ __( 'Mover para cima', 'periodic-tabs' ) }
															/>
															<Button
																icon="arrow-down-alt2"
																size="small"
																disabled={ index === tabs.length - 1 }
																onClick={ () => moveTab( index, 'down' ) }
																label={ __( 'Mover para baixo', 'periodic-tabs' ) }
															/>
															<Button
																icon="trash"
																isDestructive
																size="small"
																disabled={ tabs.length <= 1 }
																onClick={ () => removeTab( tab.id ) }
																label={ __( 'Excluir aba', 'periodic-tabs' ) }
															/>
														</div>
													</div>

													<div className="periodic-item-row-body mt-2">
														<TextControl
															label={ __( 'Título da Guia', 'periodic-tabs' ) }
															value={ tab.title }
															onChange={ ( val ) => updateTabTitle( tab.id, val ) }
														/>
														<Button
															variant={ tab.id === activeTabId ? 'secondary' : 'tertiary' }
															size="small"
															onClick={ () => setActiveTabId( tab.id ) }
														>
															{ tab.id === activeTabId
																? __( '✓ Aba Ativa no Editor', 'periodic-tabs' )
																: __( 'Selecionar para Edição', 'periodic-tabs' ) }
														</Button>
													</div>
												</div>
											) ) }
										</div>
									</PanelBody>
								);
							}

							if ( tabItem.name === 'style' ) {
								return (
									<PanelBody title={ __( 'Customização Visual', 'periodic-tabs' ) } initialOpen={ true }>
										<BaseControl
											label={ __( 'Estilo de Exibição', 'periodic-tabs' ) }
											id="periodic-tab-style-control"
											help={ __(
												'Escolha entre o formato tradicional com linhas (Tabs) ou botões destacados (Pills).',
												'periodic-tabs'
											) }
										>
											<ButtonGroup className="w-100 mb-3">
												<Button
													variant={ tabStyle === 'tabs' ? 'primary' : 'secondary' }
													onClick={ () => setAttributes( { tabStyle: 'tabs' } ) }
													className="flex-fill"
												>
													{ __( 'Abas (nav-tabs)', 'periodic-tabs' ) }
												</Button>
												<Button
													variant={ tabStyle === 'pills' ? 'primary' : 'secondary' }
													onClick={ () => setAttributes( { tabStyle: 'pills' } ) }
													className="flex-fill"
												>
													{ __( 'Pílulas (nav-pills)', 'periodic-tabs' ) }
												</Button>
											</ButtonGroup>
										</BaseControl>

										<BaseControl
											label={ __( 'Alinhamento / Orientação', 'periodic-tabs' ) }
											id="periodic-tab-alignment-control"
											help={ __(
												'Horizontal para navegação superior ou Vertical para menu lateral.',
												'periodic-tabs'
											) }
										>
											<ButtonGroup className="w-100 mb-3">
												<Button
													variant={ tabAlignment === 'horizontal' ? 'primary' : 'secondary' }
													onClick={ () => setAttributes( { tabAlignment: 'horizontal' } ) }
													className="flex-fill"
												>
													{ __( 'Horizontal', 'periodic-tabs' ) }
												</Button>
												<Button
													variant={ tabAlignment === 'vertical' ? 'primary' : 'secondary' }
													onClick={ () => setAttributes( { tabAlignment: 'vertical' } ) }
													className="flex-fill"
												>
													{ __( 'Vertical', 'periodic-tabs' ) }
												</Button>
											</ButtonGroup>
										</BaseControl>

										<BaseControl
											label={ __( 'Cor de Destaque da Aba Ativa', 'periodic-tabs' ) }
											id="periodic-tab-color-control"
											help={ __(
												'Define a cor do texto/borda ou fundo da aba ativa.',
												'periodic-tabs'
											) }
										>
											<ColorPalette
												colors={ colorPalette }
												value={ activeColor }
												onChange={ ( val ) =>
													setAttributes( { activeColor: val || '#0d6efd' } )
												}
											/>
										</BaseControl>
									</PanelBody>
								);
							}

							if ( tabItem.name === 'icons' ) {
								return (
									<PanelBody title={ __( 'Ícones Font Awesome 6', 'periodic-tabs' ) } initialOpen={ true }>
										<p className="description">
											{ __(
												'Personalize os ícones de cada guia usando classes Font Awesome 6 (ex.: fas fa-book, fas fa-star).',
												'periodic-tabs'
											) }
										</p>

										<SelectControl
											label={ __( 'Selecione a Aba para Configurar', 'periodic-tabs' ) }
											value={ activeTabId }
											options={ tabs.map( ( t ) => ( {
												label: t.title || t.id,
												value: t.id,
											} ) ) }
											onChange={ ( val ) => setActiveTabId( val ) }
										/>

										{ currentTab && (
											<div className="periodic-icon-editor-box mt-3 p-3 border rounded bg-light">
												<div className="d-flex align-items-center mb-3">
													<div className="periodic-icon-preview-box me-3">
														{ currentTab.icon ? (
															<i className={ currentTab.icon }></i>
														) : (
															<span className="text-muted">—</span>
														)}
													</div>
													<div>
														<strong>{ currentTab.title }</strong>
														<div className="text-muted small">
															{ currentTab.icon || __( 'Nenhum ícone definido', 'periodic-tabs' ) }
														</div>
													</div>
												</div>

												<TextControl
													label={ __( 'Classe CSS do Ícone', 'periodic-tabs' ) }
													value={ currentTab.icon || '' }
													placeholder="fas fa-book"
													onChange={ ( val ) => updateTabIcon( currentTab.id, val ) }
													help={ __(
														'Exemplos: fas fa-rocket, fas fa-bell, far fa-comment',
														'periodic-tabs'
													) }
												/>

												<div className="periodic-preset-icons mt-3">
													<label className="d-block mb-2 font-weight-bold">
														{ __( 'Sugestões Rápidas:', 'periodic-tabs' ) }
													</label>
													<div className="d-flex flex-wrap gap-2">
														{ iconPresets.map( ( preset ) => (
															<Button
																key={ preset.icon }
																variant="secondary"
																size="small"
																onClick={ () => updateTabIcon( currentTab.id, preset.icon ) }
																title={ preset.label }
															>
																<i className={ `${ preset.icon } me-1` }></i>
																{ preset.label }
															</Button>
														) ) }
														<Button
															variant="tertiary"
															size="small"
															isDestructive
															onClick={ () => updateTabIcon( currentTab.id, '' ) }
														>
															{ __( 'Remover Ícone', 'periodic-tabs' ) }
														</Button>
													</div>
												</div>
											</div>
										) }
									</PanelBody>
								);
							}

							return null;
						} }
					</TabPanel>
				</div>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ `periodic-tabs-wrapper ${
						tabAlignment === 'vertical' ? 'd-md-flex align-items-start' : ''
					}` }
				>
					{ /* Cabeçalho de Navegação de Abas */ }
					{ tabAlignment === 'vertical' ? (
						<div
							className={ `nav flex-column ${
								tabStyle === 'pills' ? 'nav-pills' : 'nav-tabs'
							} me-md-4 mb-3 mb-md-0 periodic-nav-list` }
							role="tablist"
							aria-orientation="vertical"
						>
							{ tabs.map( ( tab ) => {
								const isActive = tab.id === activeTabId;
								return (
									<button
										key={ tab.id }
										className={ `nav-link ${ isActive ? 'active' : '' }` }
										type="button"
										role="tab"
										aria-selected={ isActive }
										onClick={ () => setActiveTabId( tab.id ) }
									>
										{ tab.icon && <i className={ `${ tab.icon } me-2` }></i> }
										<RichText
											tagName="span"
											className="periodic-tab-title-text"
											value={ tab.title }
											onChange={ ( val ) => updateTabTitle( tab.id, val ) }
											placeholder={ __( 'Título da Aba', 'periodic-tabs' ) }
											withoutInteractiveFormatting
										/>
									</button>
								);
							} ) }
							<button
								type="button"
								className="btn btn-outline-primary btn-sm mt-2 periodic-add-tab-inline"
								onClick={ addTab }
								title={ __( 'Adicionar nova aba', 'periodic-tabs' ) }
							>
								+ { __( 'Nova Aba', 'periodic-tabs' ) }
							</button>
						</div>
					) : (
						<ul
							className={ `nav ${
								tabStyle === 'pills' ? 'nav-pills' : 'nav-tabs'
							} mb-3 periodic-nav-list` }
							role="tablist"
						>
							{ tabs.map( ( tab ) => {
								const isActive = tab.id === activeTabId;
								return (
									<li key={ tab.id } className="nav-item" role="presentation">
										<button
											className={ `nav-link ${ isActive ? 'active' : '' }` }
											type="button"
											role="tab"
											aria-selected={ isActive }
											onClick={ () => setActiveTabId( tab.id ) }
										>
											{ tab.icon && <i className={ `${ tab.icon } me-2` }></i> }
											<RichText
												tagName="span"
												className="periodic-tab-title-text"
												value={ tab.title }
												onChange={ ( val ) => updateTabTitle( tab.id, val ) }
												placeholder={ __( 'Título da Aba', 'periodic-tabs' ) }
												withoutInteractiveFormatting
											/>
										</button>
									</li>
								);
							} ) }
							<li className="nav-item">
								<button
									type="button"
									className="btn btn-outline-primary btn-sm ms-2 periodic-add-tab-inline"
									onClick={ addTab }
									title={ __( 'Adicionar nova aba', 'periodic-tabs' ) }
								>
									+ { __( 'Nova Aba', 'periodic-tabs' ) }
								</button>
							</li>
						</ul>
					) }

					{ /* Conteúdo da Aba Ativa no Editor */ }
					<div
						className={ `tab-content periodic-tab-content ${
							tabAlignment === 'vertical' ? 'flex-grow-1' : ''
						}` }
					>
						{ currentTab ? (
							<div
								className="tab-pane fade show active periodic-active-pane"
								role="tabpanel"
							>
								<div className="periodic-pane-editor-badge mb-2">
									<span className="badge bg-primary me-2">
										{ __( 'Editando:', 'periodic-tabs' ) }
									</span>
									<strong>{ currentTab.title }</strong>
								</div>
								<RichText
									tagName="div"
									className="periodic-tab-rich-content"
									value={ currentTab.contentHtml }
									onChange={ ( val ) => updateTabContent( currentTab.id, val ) }
									placeholder={ __(
										'Insira aqui o conteúdo desta aba...',
										'periodic-tabs'
									) }
									multiline="p"
								/>
							</div>
						) : (
							<p className="text-muted">
								{ __( 'Nenhuma aba selecionada.', 'periodic-tabs' ) }
							</p>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
