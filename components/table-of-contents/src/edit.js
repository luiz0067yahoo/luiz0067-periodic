import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPalette,
	TabPanel,
	BaseControl,
} from '@wordpress/components';

/**
 * Função recursiva para extrair blocos de título (core/heading) de estruturas aninhadas.
 */
function extractHeadings( blocks ) {
	const headings = [];

	blocks.forEach( ( block ) => {
		if ( block.name === 'core/heading' ) {
			const level = block.attributes.level || 2;
			const content = block.attributes.content || '';
			const anchor = block.attributes.anchor || '';

			// Extrair texto limpo sem tags HTML
			const tempDiv = document.createElement( 'div' );
			tempDiv.innerHTML = content;
			const text = tempDiv.textContent || tempDiv.innerText || '';

			if ( text.trim() ) {
				headings.push( {
					clientId: block.clientId,
					level,
					text: text.trim(),
					anchor: anchor || text.toLowerCase().replace( /[^a-z0-9]+/g, '-' ).replace( /(^-|-$)/g, '' ),
				} );
			}
		}

		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			headings.push( ...extractHeadings( block.innerBlocks ) );
		}
	} );

	return headings;
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		title,
		includeH2,
		includeH3,
		includeH4,
		listType,
		visualTheme,
		isCollapsible,
		initialCollapsedMobile,
		scrollOffset,
		enableScrollspy,
		primaryColor,
		backgroundColor,
		borderRadius,
	} = attributes;

	// Obter todos os blocos do editor atual de forma reativa
	const allHeadings = useSelect( ( select ) => {
		const blocks = select( 'core/block-editor' ).getBlocks();
		return extractHeadings( blocks );
	}, [] );

	// Filtrar conforme níveis selecionados
	const filteredHeadings = allHeadings.filter( ( h ) => {
		if ( h.level === 2 && includeH2 ) return true;
		if ( h.level === 3 && includeH3 ) return true;
		if ( h.level === 4 && includeH4 ) return true;
		return false;
	} );

	const blockProps = useBlockProps( {
		className: `periodic-toc-block theme-${ visualTheme } list-${ listType }`,
		style: {
			'--periodic-toc-primary': primaryColor,
			'--periodic-toc-bg': backgroundColor,
			'--periodic-toc-radius': `${ borderRadius }px`,
		},
	} );

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="periodic-tab-panel"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'headings',
							title: __( 'Títulos', 'periodic-table-of-contents' ),
							className: 'tab-headings',
						},
						{
							name: 'styling',
							title: __( 'Estilo', 'periodic-table-of-contents' ),
							className: 'tab-styling',
						},
						{
							name: 'behavior',
							title: __( 'Navegação', 'periodic-table-of-contents' ),
							className: 'tab-behavior',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'headings' ) {
							return (
								<PanelBody
									title={ __( 'Níveis de Títulos Incluídos', 'periodic-table-of-contents' ) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Incluir Títulos H2', 'periodic-table-of-contents' ) }
										checked={ includeH2 }
										onChange={ ( val ) => setAttributes( { includeH2: val } ) }
									/>
									<ToggleControl
										label={ __( 'Incluir Subtítulos H3', 'periodic-table-of-contents' ) }
										checked={ includeH3 }
										onChange={ ( val ) => setAttributes( { includeH3: val } ) }
									/>
									<ToggleControl
										label={ __( 'Incluir Tópicos H4', 'periodic-table-of-contents' ) }
										checked={ includeH4 }
										onChange={ ( val ) => setAttributes( { includeH4: val } ) }
									/>
								</PanelBody>
							);
						}

						if ( tab.name === 'styling' ) {
							return (
								<PanelBody
									title={ __( 'Estilo & Identidade Visual', 'periodic-table-of-contents' ) }
									initialOpen={ true }
								>
									<SelectControl
										label={ __( 'Tipo de Marcador da Lista', 'periodic-table-of-contents' ) }
										value={ listType }
										options={ [
											{ label: __( 'Lista Numerada (1, 2, 3...)', 'periodic-table-of-contents' ), value: 'numbered' },
											{ label: __( 'Marcador Redondo (Bullets)', 'periodic-table-of-contents' ), value: 'bullet' },
											{ label: __( 'Lista Limpa / Minimalista', 'periodic-table-of-contents' ), value: 'plain' },
										] }
										onChange={ ( val ) => setAttributes( { listType: val } ) }
									/>
									<SelectControl
										label={ __( 'Tema Visual do Cartão', 'periodic-table-of-contents' ) }
										value={ visualTheme }
										options={ [
											{ label: __( 'Card Elegante com Sombra', 'periodic-table-of-contents' ), value: 'card' },
											{ label: __( 'Borda Lateral de Destaque', 'periodic-table-of-contents' ), value: 'minimal' },
											{ label: __( 'Fundo Plano Suave (Flat)', 'periodic-table-of-contents' ), value: 'flat' },
										] }
										onChange={ ( val ) => setAttributes( { visualTheme: val } ) }
									/>
									<BaseControl label={ __( 'Cor de Destaque / Links', 'periodic-table-of-contents' ) }>
										<ColorPalette
											value={ primaryColor }
											onChange={ ( val ) => setAttributes( { primaryColor: val || '#0d6efd' } ) }
										/>
									</BaseControl>
									<BaseControl label={ __( 'Cor de Fundo', 'periodic-table-of-contents' ) }>
										<ColorPalette
											value={ backgroundColor }
											onChange={ ( val ) => setAttributes( { backgroundColor: val || '#f8fafc' } ) }
										/>
									</BaseControl>
									<RangeControl
										label={ __( 'Arredondamento de Bordas (px)', 'periodic-table-of-contents' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 28 }
									/>
								</PanelBody>
							);
						}

						if ( tab.name === 'behavior' ) {
							return (
								<PanelBody
									title={ __( 'Comportamento & Rolagem', 'periodic-table-of-contents' ) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Painel Recolhível / Accordion', 'periodic-table-of-contents' ) }
										checked={ isCollapsible }
										onChange={ ( val ) => setAttributes( { isCollapsible: val } ) }
									/>
									{ isCollapsible && (
										<ToggleControl
											label={ __( 'Iniciar Fechado em Telas Mobile', 'periodic-table-of-contents' ) }
											checked={ initialCollapsedMobile }
											onChange={ ( val ) => setAttributes( { initialCollapsedMobile: val } ) }
										/>
									) }
									<ToggleControl
										label={ __( 'Rastreamento Ativo / Scrollspy', 'periodic-table-of-contents' ) }
										help={ __( 'Destaca dinamicamente o link do título em exibição conforme a rolagem da página.', 'periodic-table-of-contents' ) }
										checked={ enableScrollspy }
										onChange={ ( val ) => setAttributes( { enableScrollspy: val } ) }
									/>
									<RangeControl
										label={ __( 'Compensação de Topo / Header Offset (px)', 'periodic-table-of-contents' ) }
										help={ __( 'Evita que cabeçalhos fixos sobreponham os títulos ao clicar no link.', 'periodic-table-of-contents' ) }
										value={ scrollOffset }
										onChange={ ( val ) => setAttributes( { scrollOffset: val } ) }
										min={ 0 }
										max={ 200 }
										step={ 5 }
									/>
								</PanelBody>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="periodic-toc-header d-flex justify-content-between align-items-center mb-3">
					<div className="d-flex align-items-center gap-2">
						<svg
							className="periodic-toc-icon"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="8" y1="6" x2="21" y2="6"></line>
							<line x1="8" y1="12" x2="21" y2="12"></line>
							<line x1="8" y1="18" x2="21" y2="18"></line>
							<line x1="3" y1="6" x2="3.01" y2="6"></line>
							<line x1="3" y1="12" x2="3.01" y2="12"></line>
							<line x1="3" y1="18" x2="3.01" y2="18"></line>
						</svg>
						<RichText
							tagName="h4"
							className="periodic-toc-title m-0 fw-bold"
							value={ title }
							onChange={ ( val ) => setAttributes( { title: val } ) }
							placeholder={ __( 'Título do Sumário...', 'periodic-table-of-contents' ) }
						/>
					</div>

					{ isCollapsible && (
						<button
							type="button"
							className="btn btn-sm btn-link periodic-toc-toggle p-0 text-decoration-none"
							aria-label={ __( 'Recolher ou expandir sumário', 'periodic-table-of-contents' ) }
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</button>
					) }
				</div>

				<div className="periodic-toc-body">
					{ filteredHeadings.length > 0 ? (
						<ul className="periodic-toc-list m-0 p-0">
							{ filteredHeadings.map( ( item, index ) => (
								<li
									key={ `${ item.clientId }-${ index }` }
									className={ `periodic-toc-item level-${ item.level }` }
								>
									<a
										href={ `#${ item.anchor }` }
										onClick={ ( e ) => e.preventDefault() }
										className="periodic-toc-link"
									>
										{ item.text }
									</a>
								</li>
							) ) }
						</ul>
					) : (
						<div className="periodic-toc-empty-notice p-3 text-muted text-center rounded">
							<small>
								{ __(
									'Nenhum título H2/H3 encontrado nesta página ainda. Adicione blocos de título para gerar o índice dinamicamente.',
									'periodic-table-of-contents'
								) }
							</small>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
