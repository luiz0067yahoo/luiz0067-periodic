import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TabPanel,
} from '@wordpress/components';

const CARD_TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: __(
				'Adicione o conteúdo principal do cartão aqui (textos, botões, colunas, imagens)...',
				'periodic-card-wrapper'
			),
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		hasHeader,
		headerTitle,
		headerBgColor,
		headerTextColor,
		hasFooter,
		footerContent,
		footerBgColor,
		footerTextColor,
		cardShadow,
		borderStyle,
		borderRadius,
		cardBgColor,
		cardTextColor,
	} = attributes;

	// Montagem das classes CSS de Bootstrap 5 e customizadas.
	const cardClasses = [
		'card',
		'periodic-card-wrapper',
		borderStyle || 'border',
		borderRadius || 'rounded',
		cardShadow && cardShadow !== 'none' ? cardShadow : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps( {
		className: cardClasses,
		style: {
			backgroundColor: cardBgColor || undefined,
			color: cardTextColor || undefined,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'card-body periodic-card-body',
		},
		{
			template: CARD_TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<div className="periodic-inspector-tabs-wrapper">
					<TabPanel
						className="periodic-inspector-tab-panel"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'structure',
								title: __( 'Estrutura do Card', 'periodic-card-wrapper' ),
								className: 'tab-structure',
							},
							{
								name: 'style',
								title: __( 'Estilo e Cores', 'periodic-card-wrapper' ),
								className: 'tab-style',
							},
							{
								name: 'shadows',
								title: __( 'Sombras e Efeitos', 'periodic-card-wrapper' ),
								className: 'tab-shadows',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name === 'structure' ) {
								return (
									<PanelBody
										title={ __( 'Configurações de Estrutura', 'periodic-card-wrapper' ) }
										initialOpen={ true }
									>
										<ToggleControl
											label={ __( 'Exibir Cabeçalho (Header)', 'periodic-card-wrapper' ) }
											help={
												hasHeader
													? __( 'Cabeçalho do cartão ativo.', 'periodic-card-wrapper' )
													: __( 'Cabeçalho do cartão oculto.', 'periodic-card-wrapper' )
											}
											checked={ hasHeader }
											onChange={ ( value ) => setAttributes( { hasHeader: value } ) }
										/>
										<ToggleControl
											label={ __( 'Exibir Rodapé (Footer)', 'periodic-card-wrapper' ) }
											help={
												hasFooter
													? __( 'Rodapé do cartão ativo.', 'periodic-card-wrapper' )
													: __( 'Rodapé do cartão oculto.', 'periodic-card-wrapper' )
											}
											checked={ hasFooter }
											onChange={ ( value ) => setAttributes( { hasFooter: value } ) }
										/>
									</PanelBody>
								);
							}

							if ( tab.name === 'style' ) {
								return (
									<>
										<PanelBody
											title={ __( 'Bordas e Cantos', 'periodic-card-wrapper' ) }
											initialOpen={ true }
										>
											<SelectControl
												label={ __( 'Estilo de Borda (Bootstrap)', 'periodic-card-wrapper' ) }
												value={ borderStyle }
												options={ [
													{ label: __( 'Padrão (border)', 'periodic-card-wrapper' ), value: 'border' },
													{ label: __( 'Sem Borda (border-0)', 'periodic-card-wrapper' ), value: 'border-0' },
													{ label: __( 'Primária (border-primary)', 'periodic-card-wrapper' ), value: 'border border-primary' },
													{ label: __( 'Secundária (border-secondary)', 'periodic-card-wrapper' ), value: 'border border-secondary' },
													{ label: __( 'Sucesso (border-success)', 'periodic-card-wrapper' ), value: 'border border-success' },
													{ label: __( 'Perigo (border-danger)', 'periodic-card-wrapper' ), value: 'border border-danger' },
													{ label: __( 'Aviso (border-warning)', 'periodic-card-wrapper' ), value: 'border border-warning' },
													{ label: __( 'Informativa (border-info)', 'periodic-card-wrapper' ), value: 'border border-info' },
													{ label: __( 'Clara (border-light)', 'periodic-card-wrapper' ), value: 'border border-light' },
													{ label: __( 'Escura (border-dark)', 'periodic-card-wrapper' ), value: 'border border-dark' },
												] }
												onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
											/>
											<SelectControl
												label={ __( 'Arredondamento (Border Radius)', 'periodic-card-wrapper' ) }
												value={ borderRadius }
												options={ [
													{ label: __( 'Padrão (rounded)', 'periodic-card-wrapper' ), value: 'rounded' },
													{ label: __( 'Reto (rounded-0)', 'periodic-card-wrapper' ), value: 'rounded-0' },
													{ label: __( 'Pequeno (rounded-1)', 'periodic-card-wrapper' ), value: 'rounded-1' },
													{ label: __( 'Médio (rounded-2)', 'periodic-card-wrapper' ), value: 'rounded-2' },
													{ label: __( 'Grande (rounded-3)', 'periodic-card-wrapper' ), value: 'rounded-3' },
													{ label: __( 'Extra Grande (rounded-4)', 'periodic-card-wrapper' ), value: 'rounded-4' },
													{ label: __( 'Pílula (rounded-pill)', 'periodic-card-wrapper' ), value: 'rounded-pill' },
												] }
												onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
											/>
										</PanelBody>

										<PanelColorSettings
											title={ __( 'Cores do Cartão', 'periodic-card-wrapper' ) }
											initialOpen={ false }
											colorSettings={ [
												{
													value: cardBgColor,
													onChange: ( value ) => setAttributes( { cardBgColor: value } ),
													label: __( 'Cor de Fundo do Cartão', 'periodic-card-wrapper' ),
												},
												{
													value: cardTextColor,
													onChange: ( value ) => setAttributes( { cardTextColor: value } ),
													label: __( 'Cor do Texto do Cartão', 'periodic-card-wrapper' ),
												},
											] }
										/>

										{ hasHeader && (
											<PanelColorSettings
												title={ __( 'Cores do Cabeçalho', 'periodic-card-wrapper' ) }
												initialOpen={ false }
												colorSettings={ [
													{
														value: headerBgColor,
														onChange: ( value ) => setAttributes( { headerBgColor: value } ),
														label: __( 'Fundo do Cabeçalho', 'periodic-card-wrapper' ),
													},
													{
														value: headerTextColor,
														onChange: ( value ) => setAttributes( { headerTextColor: value } ),
														label: __( 'Texto do Cabeçalho', 'periodic-card-wrapper' ),
													},
												] }
											/>
										) }

										{ hasFooter && (
											<PanelColorSettings
												title={ __( 'Cores do Rodapé', 'periodic-card-wrapper' ) }
												initialOpen={ false }
												colorSettings={ [
													{
														value: footerBgColor,
														onChange: ( value ) => setAttributes( { footerBgColor: value } ),
														label: __( 'Fundo do Rodapé', 'periodic-card-wrapper' ),
													},
													{
														value: footerTextColor,
														onChange: ( value ) => setAttributes( { footerTextColor: value } ),
														label: __( 'Texto do Rodapé', 'periodic-card-wrapper' ),
													},
												] }
											/>
										) }
									</>
								);
							}

							if ( tab.name === 'shadows' ) {
								return (
									<PanelBody
										title={ __( 'Sombras Bootstrap 5', 'periodic-card-wrapper' ) }
										initialOpen={ true }
									>
										<SelectControl
											label={ __( 'Intensidade da Sombra', 'periodic-card-wrapper' ) }
											value={ cardShadow }
											options={ [
												{ label: __( 'Sem Sombra (none)', 'periodic-card-wrapper' ), value: 'none' },
												{ label: __( 'Sombra Suave (shadow-sm)', 'periodic-card-wrapper' ), value: 'shadow-sm' },
												{ label: __( 'Sombra Regular (shadow)', 'periodic-card-wrapper' ), value: 'shadow' },
												{ label: __( 'Sombra Pronunciada (shadow-lg)', 'periodic-card-wrapper' ), value: 'shadow-lg' },
											] }
											onChange={ ( value ) => setAttributes( { cardShadow: value } ) }
											help={ __(
												'Aplica classes nativas de elevação do Bootstrap 5.',
												'periodic-card-wrapper'
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

			<div { ...blockProps }>
				{ hasHeader && (
					<div
						className="card-header periodic-card-header"
						style={ {
							backgroundColor: headerBgColor || undefined,
							color: headerTextColor || undefined,
						} }
					>
						<RichText
							tagName="h5"
							className="card-title mb-0"
							value={ headerTitle }
							onChange={ ( value ) => setAttributes( { headerTitle: value } ) }
							placeholder={ __( 'Título do Cartão...', 'periodic-card-wrapper' ) }
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
						/>
					</div>
				) }

				<div { ...innerBlocksProps } />

				{ hasFooter && (
					<div
						className="card-footer periodic-card-footer text-muted"
						style={ {
							backgroundColor: footerBgColor || undefined,
							color: footerTextColor || undefined,
						} }
					>
						<RichText
							tagName="div"
							className="periodic-card-footer-content"
							value={ footerContent }
							onChange={ ( value ) => setAttributes( { footerContent: value } ) }
							placeholder={ __( 'Texto ou notas do rodapé...', 'periodic-card-wrapper' ) }
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
						/>
					</div>
				) }
			</div>
		</>
	);
}
