import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	SelectControl,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		alertType,
		alertTitle,
		alertMessage,
		iconClass,
		isDismissible,
		hasBorderLeftHighlight,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `periodic-alert-callout-wrapper`,
	} );

	// Lista de variantes de cor semântica do Bootstrap 5
	const alertTypeOptions = [
		{ label: __( 'Informativo (Info)', 'periodic-alert-callout' ), value: 'info' },
		{ label: __( 'Sucesso (Success)', 'periodic-alert-callout' ), value: 'success' },
		{ label: __( 'Atenção / Alerta (Warning)', 'periodic-alert-callout' ), value: 'warning' },
		{ label: __( 'Perigo / Erro (Danger)', 'periodic-alert-callout' ), value: 'danger' },
		{ label: __( 'Primário (Primary)', 'periodic-alert-callout' ), value: 'primary' },
		{ label: __( 'Secundário (Secondary)', 'periodic-alert-callout' ), value: 'secondary' },
		{ label: __( 'Claro (Light)', 'periodic-alert-callout' ), value: 'light' },
		{ label: __( 'Escuro (Dark)', 'periodic-alert-callout' ), value: 'dark' },
	];

	// Ícones institucionais predefinidos recomendados
	const presetIcons = [
		{ label: __( 'Informação', 'periodic-alert-callout' ), icon: 'fas fa-info-circle' },
		{ label: __( 'Sucesso', 'periodic-alert-callout' ), icon: 'fas fa-check-circle' },
		{ label: __( 'Aviso', 'periodic-alert-callout' ), icon: 'fas fa-exclamation-triangle' },
		{ label: __( 'Perigo', 'periodic-alert-callout' ), icon: 'fas fa-times-circle' },
		{ label: __( 'Dica', 'periodic-alert-callout' ), icon: 'fas fa-lightbulb' },
		{ label: __( 'Notificação', 'periodic-alert-callout' ), icon: 'fas fa-bell' },
		{ label: __( 'Segurança', 'periodic-alert-callout' ), icon: 'fas fa-shield-alt' },
		{ label: __( 'Comentário', 'periodic-alert-callout' ), icon: 'fas fa-comment-dots' },
	];

	// Configuração das abas do InspectorControls
	const tabs = [
		{
			name: 'type_color',
			title: __( 'Tipo e Cor', 'periodic-alert-callout' ),
			className: 'periodic-tab-type-color',
		},
		{
			name: 'icon',
			title: __( 'Ícone', 'periodic-alert-callout' ),
			className: 'periodic-tab-icon',
		},
		{
			name: 'options',
			title: __( 'Opções', 'periodic-alert-callout' ),
			className: 'periodic-tab-options',
		},
	];

	return (
		<>
			<InspectorControls>
				<div className="periodic-tabs-wrapper">
					<TabPanel
						className="periodic-inspector-tabs"
						activeClass="is-active"
						tabs={ tabs }
					>
						{ ( tab ) => {
							if ( tab.name === 'type_color' ) {
								return (
									<PanelBody title={ __( 'Variante Semântica e Cor', 'periodic-alert-callout' ) } initialOpen={ true }>
										<p className="components-base-control__help mb-3">
											{ __( 'Selecione o tipo de alerta contextual seguindo as diretrizes semânticas do Bootstrap 5.', 'periodic-alert-callout' ) }
										</p>
										<SelectControl
											label={ __( 'Variante do Alerta', 'periodic-alert-callout' ) }
											value={ alertType }
											options={ alertTypeOptions }
											onChange={ ( val ) => setAttributes( { alertType: val } ) }
										/>
										<div className="periodic-type-preview-box mt-3">
											<span className="fw-bold">{ __( 'Prévia de Estilo:', 'periodic-alert-callout' ) }</span>
											<div className={ `alert alert-${ alertType } py-2 px-3 mt-2 mb-0 d-flex align-items-center` }>
												{ iconClass && <i className={ `${ iconClass } me-2` }></i> }
												<span>{ alertType.toUpperCase() }</span>
											</div>
										</div>
									</PanelBody>
								);
							}

							if ( tab.name === 'icon' ) {
								return (
									<PanelBody title={ __( 'Configurações de Ícone', 'periodic-alert-callout' ) } initialOpen={ true }>
										<p className="components-base-control__help mb-3">
											{ __( 'Selecione um ícone rápido do Font Awesome 6 ou informe a classe CSS personalizada.', 'periodic-alert-callout' ) }
										</p>

										<div className="periodic-icon-presets-grid mb-3">
											<p className="components-base-control__label">{ __( 'Ícones Recomendados', 'periodic-alert-callout' ) }</p>
											<div className="d-flex flex-wrap gap-2">
												{ presetIcons.map( ( item ) => (
													<Button
														key={ item.icon }
														isSecondary={ iconClass !== item.icon }
														isPrimary={ iconClass === item.icon }
														className="periodic-icon-preset-btn"
														onClick={ () => setAttributes( { iconClass: item.icon } ) }
														title={ item.label }
													>
														<i className={ item.icon }></i>
													</Button>
												) ) }
											</div>
										</div>

										<TextControl
											label={ __( 'Classe CSS do Ícone (Font Awesome)', 'periodic-alert-callout' ) }
											value={ iconClass }
											onChange={ ( val ) => setAttributes( { iconClass: val } ) }
											help={ __( 'Exemplo: fas fa-info-circle, fas fa-bell, far fa-flag', 'periodic-alert-callout' ) }
										/>

										{ iconClass && (
											<div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
												<div className="d-flex align-items-center gap-2">
													<span>{ __( 'Ícone atual:', 'periodic-alert-callout' ) }</span>
													<i className={ `${ iconClass } fs-5` }></i>
												</div>
												<Button
													isDestructive
													isSmall
													variant="tertiary"
													onClick={ () => setAttributes( { iconClass: '' } ) }
												>
													{ __( 'Remover Ícone', 'periodic-alert-callout' ) }
												</Button>
											</div>
										) }
									</PanelBody>
								);
							}

							if ( tab.name === 'options' ) {
								return (
									<PanelBody title={ __( 'Opções e Comportamento', 'periodic-alert-callout' ) } initialOpen={ true }>
										<ToggleControl
											label={ __( 'Botão de Fechar (Dispensável)', 'periodic-alert-callout' ) }
											help={ __( 'Adiciona o botão "X" (btn-close) permitindo que o visitante dispense o alerta.', 'periodic-alert-callout' ) }
											checked={ isDismissible }
											onChange={ ( val ) => setAttributes( { isDismissible: val } ) }
										/>

										<ToggleControl
											label={ __( 'Borda Lateral de Destaque (Callout)', 'periodic-alert-callout' ) }
											help={ __( 'Adiciona uma borda esquerda encorpada na cor tema, destacando o aviso institucional.', 'periodic-alert-callout' ) }
											checked={ hasBorderLeftHighlight }
											onChange={ ( val ) => setAttributes( { hasBorderLeftHighlight: val } ) }
										/>
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
					className={ `alert alert-${ alertType } ${ isDismissible ? 'alert-dismissible' : '' } ${ hasBorderLeftHighlight ? 'callout-border-highlight' : '' } d-flex align-items-start position-relative` }
					role="alert"
				>
					{ iconClass && (
						<div className="alert-icon-container me-3 flex-shrink-0 mt-1">
							<i className={ `${ iconClass } fs-4` }></i>
						</div>
					) }

					<div className="alert-content-container flex-grow-1 pe-4">
						<RichText
							tagName="h5"
							className="alert-heading fw-semibold mb-1"
							value={ alertTitle }
							onChange={ ( val ) => setAttributes( { alertTitle: val } ) }
							placeholder={ __( 'Título do alerta...', 'periodic-alert-callout' ) }
						/>
						<RichText
							tagName="div"
							className="alert-body-content mb-0"
							value={ alertMessage }
							onChange={ ( val ) => setAttributes( { alertMessage: val } ) }
							placeholder={ __( 'Digite a mensagem ou aviso institucional...', 'periodic-alert-callout' ) }
						/>
					</div>

					{ isDismissible && (
						<button
							type="button"
							className="btn-close"
							aria-label={ __( 'Fechar', 'periodic-alert-callout' ) }
							disabled
							title={ __( 'No editor, o botão de fechar está desativado para edição.', 'periodic-alert-callout' ) }
						></button>
					) }
				</div>
			</div>
		</>
	);
}
