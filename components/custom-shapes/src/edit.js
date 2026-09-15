import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ColorPalette,
	ToggleControl,
	TabPanel,
	BaseControl,
} from '@wordpress/components';
import { SHAPE_OPTIONS, renderSvgShape } from './shapes';

const TEMPLATE = [
	[
		'core/heading',
		{
			textAlign: 'center',
			content: __( 'Seção com Divisores de Formas Elegantes', 'periodic-custom-shapes' ),
			level: 2,
			textColor: 'white',
		},
	],
	[
		'core/paragraph',
		{
			align: 'center',
			content: __(
				'Transições suaves e dinâmicas entre blocos com suporte nativo a curvas, ondas e triângulos.',
				'periodic-custom-shapes'
			),
			textColor: 'white',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		enableTopShape,
		topShapeType,
		topShapeColor,
		topShapeHeight,
		topShapeFlipH,
		topShapeInvert,
		topShapeOpacity,
		topShapeZIndex,
		enableBottomShape,
		bottomShapeType,
		bottomShapeColor,
		bottomShapeHeight,
		bottomShapeFlipH,
		bottomShapeInvert,
		bottomShapeOpacity,
		bottomShapeZIndex,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerType,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'periodic-custom-shapes-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
	} );

	// Gerar transforms para espelhamento e inversão
	const getTopTransform = () => {
		const scaleX = topShapeFlipH ? -1 : 1;
		const scaleY = topShapeInvert ? -1 : 1;
		return `scale(${ scaleX }, ${ scaleY })`;
	};

	const getBottomTransform = () => {
		const scaleX = bottomShapeFlipH ? -1 : 1;
		const scaleY = bottomShapeInvert ? -1 : 1;
		return `scale(${ scaleX }, ${ scaleY })`;
	};

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="periodic-tab-panel"
					activeClass="active-tab"
					tabs={ [
						{
							name: 'top',
							title: __( 'Forma Superior', 'periodic-custom-shapes' ),
							className: 'tab-top',
						},
						{
							name: 'bottom',
							title: __( 'Forma Inferior', 'periodic-custom-shapes' ),
							className: 'tab-bottom',
						},
						{
							name: 'style',
							title: __( 'Fundo & Layout', 'periodic-custom-shapes' ),
							className: 'tab-style',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'top' ) {
							return (
								<PanelBody
									title={ __( 'Divisor Superior (Top Shape)', 'periodic-custom-shapes' ) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Ativar Forma Superior', 'periodic-custom-shapes' ) }
										checked={ enableTopShape }
										onChange={ ( val ) => setAttributes( { enableTopShape: val } ) }
									/>
									{ enableTopShape && (
										<>
											<SelectControl
												label={ __( 'Tipo de Forma Geométrica', 'periodic-custom-shapes' ) }
												value={ topShapeType }
												options={ SHAPE_OPTIONS }
												onChange={ ( val ) => setAttributes( { topShapeType: val } ) }
											/>
											<BaseControl label={ __( 'Cor de Preenchimento', 'periodic-custom-shapes' ) }>
												<ColorPalette
													value={ topShapeColor }
													onChange={ ( val ) => setAttributes( { topShapeColor: val || '#ffffff' } ) }
												/>
											</BaseControl>
											<RangeControl
												label={ __( 'Altura da Forma (px)', 'periodic-custom-shapes' ) }
												value={ topShapeHeight }
												onChange={ ( val ) => setAttributes( { topShapeHeight: val } ) }
												min={ 20 }
												max={ 300 }
												step={ 5 }
											/>
											<RangeControl
												label={ __( 'Opacidade', 'periodic-custom-shapes' ) }
												value={ topShapeOpacity }
												onChange={ ( val ) => setAttributes( { topShapeOpacity: val } ) }
												min={ 0.1 }
												max={ 1 }
												step={ 0.05 }
											/>
											<ToggleControl
												label={ __( 'Inverter Horizontalmente (Flip)', 'periodic-custom-shapes' ) }
												checked={ topShapeFlipH }
												onChange={ ( val ) => setAttributes( { topShapeFlipH: val } ) }
											/>
											<ToggleControl
												label={ __( 'Inverter Verticalmente', 'periodic-custom-shapes' ) }
												checked={ topShapeInvert }
												onChange={ ( val ) => setAttributes( { topShapeInvert: val } ) }
											/>
											<RangeControl
												label={ __( 'Camada (Z-Index)', 'periodic-custom-shapes' ) }
												value={ topShapeZIndex }
												onChange={ ( val ) => setAttributes( { topShapeZIndex: val } ) }
												min={ 1 }
												max={ 10 }
											/>
										</>
									) }
								</PanelBody>
							);
						}

						if ( tab.name === 'bottom' ) {
							return (
								<PanelBody
									title={ __( 'Divisor Inferior (Bottom Shape)', 'periodic-custom-shapes' ) }
									initialOpen={ true }
								>
									<ToggleControl
										label={ __( 'Ativar Forma Inferior', 'periodic-custom-shapes' ) }
										checked={ enableBottomShape }
										onChange={ ( val ) => setAttributes( { enableBottomShape: val } ) }
									/>
									{ enableBottomShape && (
										<>
											<SelectControl
												label={ __( 'Tipo de Forma Geométrica', 'periodic-custom-shapes' ) }
												value={ bottomShapeType }
												options={ SHAPE_OPTIONS }
												onChange={ ( val ) => setAttributes( { bottomShapeType: val } ) }
											/>
											<BaseControl label={ __( 'Cor de Preenchimento', 'periodic-custom-shapes' ) }>
												<ColorPalette
													value={ bottomShapeColor }
													onChange={ ( val ) => setAttributes( { bottomShapeColor: val || '#ffffff' } ) }
												/>
											</BaseControl>
											<RangeControl
												label={ __( 'Altura da Forma (px)', 'periodic-custom-shapes' ) }
												value={ bottomShapeHeight }
												onChange={ ( val ) => setAttributes( { bottomShapeHeight: val } ) }
												min={ 20 }
												max={ 300 }
												step={ 5 }
											/>
											<RangeControl
												label={ __( 'Opacidade', 'periodic-custom-shapes' ) }
												value={ bottomShapeOpacity }
												onChange={ ( val ) => setAttributes( { bottomShapeOpacity: val } ) }
												min={ 0.1 }
												max={ 1 }
												step={ 0.05 }
											/>
											<ToggleControl
												label={ __( 'Inverter Horizontalmente (Flip)', 'periodic-custom-shapes' ) }
												checked={ bottomShapeFlipH }
												onChange={ ( val ) => setAttributes( { bottomShapeFlipH: val } ) }
											/>
											<ToggleControl
												label={ __( 'Inverter Verticalmente', 'periodic-custom-shapes' ) }
												checked={ bottomShapeInvert }
												onChange={ ( val ) => setAttributes( { bottomShapeInvert: val } ) }
											/>
											<RangeControl
												label={ __( 'Camada (Z-Index)', 'periodic-custom-shapes' ) }
												value={ bottomShapeZIndex }
												onChange={ ( val ) => setAttributes( { bottomShapeZIndex: val } ) }
												min={ 1 }
												max={ 10 }
											/>
										</>
									) }
								</PanelBody>
							);
						}

						if ( tab.name === 'style' ) {
							return (
								<PanelBody
									title={ __( 'Estilização da Seção & Bootstrap 5', 'periodic-custom-shapes' ) }
									initialOpen={ true }
								>
									<BaseControl label={ __( 'Cor de Fundo da Seção', 'periodic-custom-shapes' ) }>
										<ColorPalette
											value={ backgroundColor }
											onChange={ ( val ) => setAttributes( { backgroundColor: val || '#0d6efd' } ) }
										/>
									</BaseControl>
									<SelectControl
										label={ __( 'Largura do Container', 'periodic-custom-shapes' ) }
										value={ containerType }
										options={ [
											{ label: __( 'Container Padrão (container)', 'periodic-custom-shapes' ), value: 'container' },
											{ label: __( 'Container Fluido (container-fluid)', 'periodic-custom-shapes' ), value: 'container-fluid' },
											{ label: __( 'Sem Container (100% largura)', 'periodic-custom-shapes' ), value: 'none' },
										] }
										onChange={ ( val ) => setAttributes( { containerType: val } ) }
									/>
									<RangeControl
										label={ __( 'Espaçamento Superior (Padding Top em px)', 'periodic-custom-shapes' ) }
										value={ paddingTop }
										onChange={ ( val ) => setAttributes( { paddingTop: val } ) }
										min={ 20 }
										max={ 250 }
										step={ 5 }
									/>
									<RangeControl
										label={ __( 'Espaçamento Inferior (Padding Bottom em px)', 'periodic-custom-shapes' ) }
										value={ paddingBottom }
										onChange={ ( val ) => setAttributes( { paddingBottom: val } ) }
										min={ 20 }
										max={ 250 }
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
				{ enableTopShape && (
					<div
						className="periodic-shape-divider periodic-shape-top"
						style={ {
							height: `${ topShapeHeight }px`,
							transform: getTopTransform(),
							opacity: topShapeOpacity,
							zIndex: topShapeZIndex,
						} }
					>
						{ renderSvgShape( topShapeType, topShapeColor ) }
					</div>
				) }

				<div className="periodic-shape-content-wrapper">
					{ containerType !== 'none' ? (
						<div className={ containerType }>
							<InnerBlocks template={ TEMPLATE } />
						</div>
					) : (
						<div className="w-100">
							<InnerBlocks template={ TEMPLATE } />
						</div>
					) }
				</div>

				{ enableBottomShape && (
					<div
						className="periodic-shape-divider periodic-shape-bottom"
						style={ {
							height: `${ bottomShapeHeight }px`,
							transform: getBottomTransform(),
							opacity: bottomShapeOpacity,
							zIndex: bottomShapeZIndex,
						} }
					>
						{ renderSvgShape( bottomShapeType, bottomShapeColor ) }
					</div>
				) }
			</div>
		</>
	);
}
