import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	ToggleControl,
	TabPanel,
	Button,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		modalId,
		buttonText,
		buttonIcon,
		buttonVariant,
		buttonSize,
		modalTitle,
		modalSize,
		modalContent,
		closeButtonText,
		staticBackdrop,
		centeredModal,
		scrollableModal,
	} = attributes;

	// Estado para alternar a pré-visualização do modal no editor
	const [ isPreviewOpen, setIsPreviewOpen ] = useState( false );

	// Gera um ID único e consistente caso ainda não exista
	useEffect( () => {
		if ( ! modalId ) {
			const generatedId = `periodic-modal-${ clientId.substring(
				0,
				8
			) }`;
			setAttributes( { modalId: generatedId } );
		}
	}, [ modalId, clientId, setAttributes ] );

	const blockProps = useBlockProps( {
		className: 'periodic-modal-popup-editor-block',
	} );

	// Opções das abas do InspectorControls
	const tabs = [
		{
			name: 'trigger',
			title: __( 'Gatilho / Botão', 'periodic-modal-popup' ),
			className: 'periodic-tab-trigger',
		},
		{
			name: 'content',
			title: __( 'Conteúdo do Modal', 'periodic-modal-popup' ),
			className: 'periodic-tab-content',
		},
		{
			name: 'behavior',
			title: __( 'Comportamento', 'periodic-modal-popup' ),
			className: 'periodic-tab-behavior',
		},
	];

	return (
		<>
			{ /* Barra de Ferramentas do Bloco no Topo */ }
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="visibility"
						label={
							isPreviewOpen
								? __(
										'Ocultar Pré-visualização do Modal',
										'periodic-modal-popup'
								  )
								: __(
										'Alternar Pré-visualização do Modal',
										'periodic-modal-popup'
								  )
						}
						isPressed={ isPreviewOpen }
						onClick={ () => setIsPreviewOpen( ! isPreviewOpen ) }
					>
						{ isPreviewOpen
							? __( 'Fechar Modal', 'periodic-modal-popup' )
							: __(
									'Pré-visualizar Modal',
									'periodic-modal-popup'
							  ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>

			{ /* Painel Lateral com Abas Dedicadas */ }
			<InspectorControls>
				<div className="periodic-inspector-tabs-wrapper">
					<TabPanel
						className="periodic-modal-tab-panel"
						activeClass="active-tab"
						tabs={ tabs }
					>
						{ ( tab ) => {
							if ( tab.name === 'trigger' ) {
								return (
									<PanelBody
										title={ __(
											'Configurações do Gatilho',
											'periodic-modal-popup'
										) }
										initialOpen={ true }
									>
										<TextControl
											label={ __(
												'Texto do Botão',
												'periodic-modal-popup'
											) }
											value={ buttonText }
											onChange={ ( val ) =>
												setAttributes( {
													buttonText: val,
												} )
											}
											help={ __(
												'Rótulo exibido no botão que abre a janela.',
												'periodic-modal-popup'
											) }
										/>
										<TextControl
											label={ __(
												'Ícone do Botão (Font Awesome)',
												'periodic-modal-popup'
											) }
											value={ buttonIcon }
											onChange={ ( val ) =>
												setAttributes( {
													buttonIcon: val,
												} )
											}
											help={ __(
												'Exemplo: fa-solid fa-circle-info, fa-solid fa-bell, fa-solid fa-envelope',
												'periodic-modal-popup'
											) }
										/>
										<SelectControl
											label={ __(
												'Variante de Cor (Bootstrap 5)',
												'periodic-modal-popup'
											) }
											value={ buttonVariant }
											options={ [
												{
													label: __(
														'Primary (Azul)',
														'periodic-modal-popup'
													),
													value: 'btn-primary',
												},
												{
													label: __(
														'Secondary (Cinza)',
														'periodic-modal-popup'
													),
													value: 'btn-secondary',
												},
												{
													label: __(
														'Success (Verde)',
														'periodic-modal-popup'
													),
													value: 'btn-success',
												},
												{
													label: __(
														'Danger (Vermelho)',
														'periodic-modal-popup'
													),
													value: 'btn-danger',
												},
												{
													label: __(
														'Warning (Amarelo)',
														'periodic-modal-popup'
													),
													value: 'btn-warning',
												},
												{
													label: __(
														'Info (Ciano)',
														'periodic-modal-popup'
													),
													value: 'btn-info',
												},
												{
													label: __(
														'Light (Claro)',
														'periodic-modal-popup'
													),
													value: 'btn-light',
												},
												{
													label: __(
														'Dark (Escuro)',
														'periodic-modal-popup'
													),
													value: 'btn-dark',
												},
												{
													label: __(
														'Outline Primary',
														'periodic-modal-popup'
													),
													value: 'btn-outline-primary',
												},
												{
													label: __(
														'Outline Secondary',
														'periodic-modal-popup'
													),
													value: 'btn-outline-secondary',
												},
												{
													label: __(
														'Outline Success',
														'periodic-modal-popup'
													),
													value: 'btn-outline-success',
												},
												{
													label: __(
														'Outline Danger',
														'periodic-modal-popup'
													),
													value: 'btn-outline-danger',
												},
											] }
											onChange={ ( val ) =>
												setAttributes( {
													buttonVariant: val,
												} )
											}
										/>
										<SelectControl
											label={ __(
												'Tamanho do Botão',
												'periodic-modal-popup'
											) }
											value={ buttonSize }
											options={ [
												{
													label: __(
														'Padrão (Médio)',
														'periodic-modal-popup'
													),
													value: '',
												},
												{
													label: __(
														'Pequeno (btn-sm)',
														'periodic-modal-popup'
													),
													value: 'btn-sm',
												},
												{
													label: __(
														'Grande (btn-lg)',
														'periodic-modal-popup'
													),
													value: 'btn-lg',
												},
											] }
											onChange={ ( val ) =>
												setAttributes( {
													buttonSize: val,
												} )
											}
										/>
									</PanelBody>
								);
							}

							if ( tab.name === 'content' ) {
								return (
									<PanelBody
										title={ __(
											'Conteúdo da Janela Modal',
											'periodic-modal-popup'
										) }
										initialOpen={ true }
									>
										<TextControl
											label={ __(
												'Título da Modal',
												'periodic-modal-popup'
											) }
											value={ modalTitle }
											onChange={ ( val ) =>
												setAttributes( {
													modalTitle: val,
												} )
											}
											help={ __(
												'Título exibido no cabeçalho superior da janela modal.',
												'periodic-modal-popup'
											) }
										/>
										<TextControl
											label={ __(
												'Texto do Botão de Fechar',
												'periodic-modal-popup'
											) }
											value={ closeButtonText }
											onChange={ ( val ) =>
												setAttributes( {
													closeButtonText: val,
												} )
											}
											help={ __(
												'Texto do botão de fechamento no rodapé do modal.',
												'periodic-modal-popup'
											) }
										/>
										<div className="periodic-tab-notice">
											<p>
												<strong>
													{ __(
														'Dica WYSIWYG:',
														'periodic-modal-popup'
													) }
												</strong>{ ' ' }
												{ __(
													'Você pode editar o título e o texto completo da modal com formatações ricas diretamente no canvas ativando a pré-visualização.',
													'periodic-modal-popup'
												) }
											</p>
											<Button
												variant="secondary"
												isSmall
												onClick={ () =>
													setIsPreviewOpen( true )
												}
											>
												{ __(
													'Abrir Pré-visualização para Edição',
													'periodic-modal-popup'
												) }
											</Button>
										</div>
									</PanelBody>
								);
							}

							if ( tab.name === 'behavior' ) {
								return (
									<PanelBody
										title={ __(
											'Comportamento e Dimensões',
											'periodic-modal-popup'
										) }
										initialOpen={ true }
									>
										<SelectControl
											label={ __(
												'Tamanho da Janela',
												'periodic-modal-popup'
											) }
											value={ modalSize }
											options={ [
												{
													label: __(
														'Padrão (500px)',
														'periodic-modal-popup'
													),
													value: '',
												},
												{
													label: __(
														'Pequeno (modal-sm - 300px)',
														'periodic-modal-popup'
													),
													value: 'modal-sm',
												},
												{
													label: __(
														'Grande (modal-lg - 800px)',
														'periodic-modal-popup'
													),
													value: 'modal-lg',
												},
												{
													label: __(
														'Extra Grande (modal-xl - 1140px)',
														'periodic-modal-popup'
													),
													value: 'modal-xl',
												},
												{
													label: __(
														'Tela Cheia (modal-fullscreen)',
														'periodic-modal-popup'
													),
													value: 'modal-fullscreen',
												},
											] }
											onChange={ ( val ) =>
												setAttributes( {
													modalSize: val,
												} )
											}
										/>
										<ToggleControl
											label={ __(
												'Backdrop Estático',
												'periodic-modal-popup'
											) }
											checked={ staticBackdrop }
											onChange={ ( val ) =>
												setAttributes( {
													staticBackdrop: val,
												} )
											}
											help={ __(
												'Impede o fechamento acidental ao clicar fora da janela modal.',
												'periodic-modal-popup'
											) }
										/>
										<ToggleControl
											label={ __(
												'Centralizar Verticalmente',
												'periodic-modal-popup'
											) }
											checked={ centeredModal }
											onChange={ ( val ) =>
												setAttributes( {
													centeredModal: val,
												} )
											}
											help={ __(
												'Posiciona a janela exatamente no centro vertical da tela.',
												'periodic-modal-popup'
											) }
										/>
										<ToggleControl
											label={ __(
												'Rolagem Interna',
												'periodic-modal-popup'
											) }
											checked={ scrollableModal }
											onChange={ ( val ) =>
												setAttributes( {
													scrollableModal: val,
												} )
											}
											help={ __(
												'Adiciona barra de rolagem ao corpo quando o conteúdo ultrapassar a tela.',
												'periodic-modal-popup'
											) }
										/>
										<TextControl
											label={ __(
												'ID HTML Único',
												'periodic-modal-popup'
											) }
											value={ modalId }
											onChange={ ( val ) =>
												setAttributes( {
													modalId: val,
												} )
											}
											help={ __(
												'Identificador exclusivo usado pelo gatilho Bootstrap para acionar esta janela.',
												'periodic-modal-popup'
											) }
										/>
									</PanelBody>
								);
							}

							return null;
						} }
					</TabPanel>
				</div>
			</InspectorControls>

			{ /* Renderização Principal no Canvas */ }
			<div { ...blockProps }>
				{ /* Barra de Controle e Visualização do Botão */ }
				<div className="periodic-trigger-preview-wrapper">
					<button
						type="button"
						className={ `btn ${ buttonVariant } ${ buttonSize } periodic-trigger-btn` }
						onClick={ () => setIsPreviewOpen( ! isPreviewOpen ) }
						title={ __(
							'Clique para alternar a pré-visualização do modal',
							'periodic-modal-popup'
						) }
					>
						{ buttonIcon && (
							<i
								className={ `${ buttonIcon } me-2 periodic-btn-icon` }
								aria-hidden="true"
							></i>
						) }
						<span>
							{ buttonText ||
								__( 'Abrir Modal', 'periodic-modal-popup' ) }
						</span>
					</button>

					<div className="periodic-preview-badge-control">
						<Button
							variant={ isPreviewOpen ? 'primary' : 'secondary' }
							isSmall
							icon="visibility"
							onClick={ () =>
								setIsPreviewOpen( ! isPreviewOpen )
							}
						>
							{ isPreviewOpen
								? __(
										'Ocultar Pré-visualização do Modal',
										'periodic-modal-popup'
								  )
								: __(
										'Alternar Pré-visualização do Modal',
										'periodic-modal-popup'
								  ) }
						</Button>
						<span className="periodic-modal-id-badge">
							ID: <code>#{ modalId }</code>
						</span>
					</div>
				</div>

				{ /* Modal WYSIWYG Pré-visualização no Canvas */ }
				{ isPreviewOpen && (
					<div className="periodic-modal-editor-container">
						<div
							className="periodic-modal-editor-backdrop"
							onClick={ () => setIsPreviewOpen( false ) }
						/>
						<div
							className={ `modal d-block periodic-modal-dialog-preview` }
							role="dialog"
							aria-modal="true"
						>
							<div
								className={ `modal-dialog ${ modalSize } ${
									centeredModal ? 'modal-dialog-centered' : ''
								} ${
									scrollableModal
										? 'modal-dialog-scrollable'
										: ''
								}` }
							>
								<div className="modal-content shadow">
									<div className="modal-header">
										<RichText
											tagName="h5"
											className="modal-title"
											value={ modalTitle }
											onChange={ ( val ) =>
												setAttributes( {
													modalTitle: val,
												} )
											}
											placeholder={ __(
												'Título da Modal...',
												'periodic-modal-popup'
											) }
										/>
										<button
											type="button"
											className="btn-close"
											aria-label={ __(
												'Fechar',
												'periodic-modal-popup'
											) }
											onClick={ () =>
												setIsPreviewOpen( false )
											}
										></button>
									</div>
									<div className="modal-body">
										<RichText
											tagName="div"
											multiline="p"
											value={ modalContent }
											onChange={ ( val ) =>
												setAttributes( {
													modalContent: val,
												} )
											}
											placeholder={ __(
												'Escreva aqui o conteúdo rico da sua janela modal...',
												'periodic-modal-popup'
											) }
										/>
									</div>
									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-secondary"
											onClick={ () =>
												setIsPreviewOpen( false )
											}
										>
											{ closeButtonText ||
												__(
													'Fechar',
													'periodic-modal-popup'
												) }
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				) }
			</div>
		</>
	);
}
