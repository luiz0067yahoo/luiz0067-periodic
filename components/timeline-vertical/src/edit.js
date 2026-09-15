import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	Button,
	TextControl,
	TextareaControl,
	SelectControl,
	ColorPalette,
	ToggleControl,
	BaseControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const POPULAR_ICONS = [
	{ label: 'Flag', value: 'fa-solid fa-flag' },
	{ label: 'Rocket', value: 'fa-solid fa-rocket' },
	{ label: 'Trophy', value: 'fa-solid fa-trophy' },
	{ label: 'Star', value: 'fa-solid fa-star' },
	{ label: 'Briefcase', value: 'fa-solid fa-briefcase' },
	{ label: 'Graduation', value: 'fa-solid fa-graduation-cap' },
	{ label: 'Lightbulb', value: 'fa-solid fa-lightbulb' },
	{ label: 'Heart', value: 'fa-solid fa-heart' },
	{ label: 'Check', value: 'fa-solid fa-check' },
	{ label: 'Award', value: 'fa-solid fa-award' },
	{ label: 'Calendar', value: 'fa-solid fa-calendar-check' },
	{ label: 'Code', value: 'fa-solid fa-code' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		events = [],
		alignment = 'alternating',
		primaryColor = '#0d6efd',
		lineColor = '#dee2e6',
		connectorStyle = 'solid',
		badgeBgColor = '#0d6efd',
		badgeTextColor = '#ffffff',
		showIcons = true,
		cardShadow = true,
		cardBorder = true,
	} = attributes;

	const [ expandedEventIndex, setExpandedEventIndex ] = useState( 0 );

	// Gerenciamento de eventos
	const updateEvent = ( index, field, value ) => {
		const newEvents = [ ...events ];
		newEvents[ index ] = {
			...newEvents[ index ],
			[ field ]: value,
		};
		setAttributes( { events: newEvents } );
	};

	const addEvent = () => {
		const newEvent = {
			id: `event-${ Date.now() }`,
			date: __( 'Ano / Data', 'periodic-timeline-vertical' ),
			title: __( 'Novo Marco Cronológico', 'periodic-timeline-vertical' ),
			description: __(
				'Descreva aqui os detalhes mais importantes e conquistas deste marco temporal.',
				'periodic-timeline-vertical'
			),
			icon: 'fa-solid fa-star',
			badgeColor: primaryColor || '#0d6efd',
			badgeTextColor: '#ffffff',
			tag: __( 'Etapa', 'periodic-timeline-vertical' ),
		};
		const newEvents = [ ...events, newEvent ];
		setAttributes( { events: newEvents } );
		setExpandedEventIndex( newEvents.length - 1 );
	};

	const removeEvent = ( index ) => {
		if ( events.length <= 1 ) {
			return;
		}
		const newEvents = events.filter( ( _, i ) => i !== index );
		setAttributes( { events: newEvents } );
		if ( expandedEventIndex >= newEvents.length ) {
			setExpandedEventIndex( Math.max( 0, newEvents.length - 1 ) );
		}
	};

	const moveEvent = ( index, direction ) => {
		const newIndex = index + direction;
		if ( newIndex < 0 || newIndex >= events.length ) {
			return;
		}
		const newEvents = [ ...events ];
		const temp = newEvents[ index ];
		newEvents[ index ] = newEvents[ newIndex ];
		newEvents[ newIndex ] = temp;
		setAttributes( { events: newEvents } );
		setExpandedEventIndex( newIndex );
	};

	const blockProps = useBlockProps( {
		className: `periodic-timeline-vertical periodic-timeline-vertical-editor is-${ alignment } ${
			alignment === 'left' ? 'is-left-aligned' : ''
		}`,
		style: {
			'--timeline-primary-color': primaryColor,
			'--timeline-line-color': lineColor,
			'--timeline-connector-style': connectorStyle,
			'--timeline-badge-bg': badgeBgColor,
			'--timeline-badge-color': badgeTextColor,
		},
	} );

	return (
		<>
			<InspectorControls>
				<div className="periodic-inspector-tabs">
					<TabPanel
						className="periodic-tab-panel"
						activeClass="is-active"
						tabs={ [
							{
								name: 'events',
								title: __(
									'Eventos',
									'periodic-timeline-vertical'
								),
								className: 'tab-events',
							},
							{
								name: 'appearance',
								title: __(
									'Aparência',
									'periodic-timeline-vertical'
								),
								className: 'tab-appearance',
							},
							{
								name: 'icons',
								title: __(
									'Ícones e Badges',
									'periodic-timeline-vertical'
								),
								className: 'tab-icons',
							},
						] }
					>
						{ ( tab ) => {
							if ( tab.name === 'events' ) {
								return (
									<PanelBody
										title={ __(
											'Gerenciador de Eventos',
											'periodic-timeline-vertical'
										) }
										opened={ true }
									>
										<p className="description">
											{ __(
												'Adicione, ordene, edite e remova marcos cronológicos da linha do tempo.',
												'periodic-timeline-vertical'
											) }
										</p>
										<Button
											variant="primary"
											isSecondary={ false }
											onClick={ addEvent }
											icon="plus"
											className="w-100 mb-3"
											style={ { width: '100%', marginBottom: '16px' } }
										>
											{ __(
												'+ Adicionar Marco Temporal',
												'periodic-timeline-vertical'
											) }
										</Button>

										<div className="timeline-inspector-event-list">
											{ events.map( ( event, index ) => (
												<div
													key={ event.id || index }
													className={ `timeline-inspector-event-item ${
														expandedEventIndex === index
															? 'is-expanded'
															: ''
													}` }
												>
													<div
														className="event-item-header"
														onClick={ () =>
															setExpandedEventIndex(
																expandedEventIndex ===
																	index
																	? -1
																	: index
															)
														}
													>
														<span className="event-item-title">
															<i
																className={
																	event.icon ||
																	'fa-solid fa-calendar'
																}
																style={ {
																	color:
																		event.badgeColor ||
																		primaryColor,
																} }
															/>
															<strong>
																{ event.date ||
																	`#${
																		index +
																		1
																	}` }
															</strong>{ ' ' }
															- { event.title || __( '(Sem título)', 'periodic-timeline-vertical' ) }
														</span>
														<div
															className="event-item-actions"
															onClick={ ( e ) =>
																e.stopPropagation()
															}
														>
															<Button
																icon="arrow-up"
																size="small"
																label={ __(
																	'Mover para cima',
																	'periodic-timeline-vertical'
																) }
																disabled={
																	index === 0
																}
																onClick={ () =>
																	moveEvent(
																		index,
																		-1
																	)
																}
															/>
															<Button
																icon="arrow-down"
																size="small"
																label={ __(
																	'Mover para baixo',
																	'periodic-timeline-vertical'
																) }
																disabled={
																	index ===
																	events.length -
																		1
																}
																onClick={ () =>
																	moveEvent(
																		index,
																		1
																	)
																}
															/>
															<Button
																icon="trash"
																size="small"
																isDestructive
																label={ __(
																	'Excluir evento',
																	'periodic-timeline-vertical'
																) }
																disabled={
																	events.length <=
																	1
																}
																onClick={ () =>
																	removeEvent(
																		index
																	)
																}
															/>
														</div>
													</div>

													{ expandedEventIndex ===
														index && (
														<div className="event-item-body">
															<TextControl
																label={ __(
																	'Data / Período',
																	'periodic-timeline-vertical'
																) }
																value={
																	event.date
																}
																onChange={ (
																	val
																) =>
																	updateEvent(
																		index,
																		'date',
																		val
																	)
																}
															/>
															<TextControl
																label={ __(
																	'Título do Marco',
																	'periodic-timeline-vertical'
																) }
																value={
																	event.title
																}
																onChange={ (
																	val
																) =>
																	updateEvent(
																		index,
																		'title',
																		val
																	)
																}
															/>
															<TextControl
																label={ __(
																	'Tag / Etiqueta',
																	'periodic-timeline-vertical'
																) }
																value={
																	event.tag ||
																	''
																}
																onChange={ (
																	val
																) =>
																	updateEvent(
																		index,
																		'tag',
																		val
																	)
																}
															/>
															<TextareaControl
																label={ __(
																	'Descrição',
																	'periodic-timeline-vertical'
																) }
																value={
																	event.description
																}
																onChange={ (
																	val
																) =>
																	updateEvent(
																		index,
																		'description',
																		val
																	)
																}
																rows={ 3 }
															/>
															<TextControl
																label={ __(
																	'Classe Font Awesome 6 do Ícone',
																	'periodic-timeline-vertical'
																) }
																value={
																	event.icon
																}
																onChange={ (
																	val
																) =>
																	updateEvent(
																		index,
																		'icon',
																		val
																	)
																}
																help={ __(
																	'Ex: fa-solid fa-flag, fa-solid fa-rocket',
																	'periodic-timeline-vertical'
																) }
															/>
															<BaseControl
																label={ __(
																	'Cor do Marcador Circular',
																	'periodic-timeline-vertical'
																) }
															>
																<ColorPalette
																	value={
																		event.badgeColor ||
																		primaryColor
																	}
																	onChange={ (
																		val
																	) =>
																		updateEvent(
																			index,
																			'badgeColor',
																			val
																		)
																	}
																/>
															</BaseControl>
														</div>
													) }
												</div>
											) ) }
										</div>
									</PanelBody>
								);
							}

							if ( tab.name === 'appearance' ) {
								return (
									<PanelBody
										title={ __(
											'Aparência e Layout',
											'periodic-timeline-vertical'
										) }
										opened={ true }
									>
										<SelectControl
											label={ __(
												'Alinhamento dos Cards',
												'periodic-timeline-vertical'
											) }
											value={ alignment }
											options={ [
												{
													label: __(
														'Alternado (Esquerda / Direita)',
														'periodic-timeline-vertical'
													),
													value: 'alternating',
												},
												{
													label: __(
														'Alinhado à Esquerda',
														'periodic-timeline-vertical'
													),
													value: 'left',
												},
											] }
											onChange={ ( val ) =>
												setAttributes( {
													alignment: val,
												} )
											}
										/>

										<SelectControl
											label={ __(
												'Estilo da Linha Conectora',
												'periodic-timeline-vertical'
											) }
											value={ connectorStyle }
											options={ [
												{
													label: __(
														'Sólida',
														'periodic-timeline-vertical'
													),
													value: 'solid',
												},
												{
													label: __(
														'Tracejada',
														'periodic-timeline-vertical'
													),
													value: 'dashed',
												},
												{
													label: __(
														'Pontilhada',
														'periodic-timeline-vertical'
													),
													value: 'dotted',
												},
											] }
											onChange={ ( val ) =>
												setAttributes( {
													connectorStyle: val,
												} )
											}
										/>

										<BaseControl
											label={ __(
												'Cor Primária / Marcadores',
												'periodic-timeline-vertical'
											) }
										>
											<ColorPalette
												value={ primaryColor }
												onChange={ ( val ) =>
													setAttributes( {
														primaryColor:
															val || '#0d6efd',
													} )
												}
											/>
										</BaseControl>

										<BaseControl
											label={ __(
												'Cor da Linha Conectora',
												'periodic-timeline-vertical'
											) }
										>
											<ColorPalette
												value={ lineColor }
												onChange={ ( val ) =>
													setAttributes( {
														lineColor:
															val || '#dee2e6',
													} )
												}
											/>
										</BaseControl>

										<ToggleControl
											label={ __(
												'Sombra nos Cards',
												'periodic-timeline-vertical'
											) }
											help={
												cardShadow
													? __(
															'Sombra suave ativa (Bootstrap shadow-sm).',
															'periodic-timeline-vertical'
													  )
													: __(
															'Sem sombra.',
															'periodic-timeline-vertical'
													  )
											}
											checked={ cardShadow }
											onChange={ ( val ) =>
												setAttributes( {
													cardShadow: val,
												} )
											}
										/>

										<ToggleControl
											label={ __(
												'Borda nos Cards',
												'periodic-timeline-vertical'
											) }
											checked={ cardBorder }
											onChange={ ( val ) =>
												setAttributes( {
													cardBorder: val,
												} )
											}
										/>
									</PanelBody>
								);
							}

							if ( tab.name === 'icons' ) {
								return (
									<PanelBody
										title={ __(
											'Ícones e Badges Circulares',
											'periodic-timeline-vertical'
										) }
										opened={ true }
									>
										<ToggleControl
											label={ __(
												'Exibir Ícones nos Marcadores',
												'periodic-timeline-vertical'
											) }
											checked={ showIcons }
											onChange={ ( val ) =>
												setAttributes( {
													showIcons: val,
												} )
											}
										/>

										<BaseControl
											label={ __(
												'Cor de Fundo Padrão do Marcador',
												'periodic-timeline-vertical'
											) }
										>
											<ColorPalette
												value={ badgeBgColor }
												onChange={ ( val ) =>
													setAttributes( {
														badgeBgColor:
															val || '#0d6efd',
													} )
												}
											/>
										</BaseControl>

										<BaseControl
											label={ __(
												'Cor do Ícone / Texto',
												'periodic-timeline-vertical'
											) }
										>
											<ColorPalette
												value={ badgeTextColor }
												onChange={ ( val ) =>
													setAttributes( {
														badgeTextColor:
															val || '#ffffff',
													} )
												}
											/>
										</BaseControl>

										<BaseControl
											label={ __(
												'Ícones Rápidos Populares (Font Awesome 6)',
												'periodic-timeline-vertical'
											) }
											help={ __(
												'Clique em um ícone para aplicá-lo ao evento atualmente aberto.',
												'periodic-timeline-vertical'
											) }
										>
											<div className="timeline-icon-picker-grid">
												{ POPULAR_ICONS.map(
													( iconItem ) => (
														<button
															type="button"
															key={
																iconItem.value
															}
															title={
																iconItem.label
															}
															className={ `icon-select-btn ${
																events[
																	expandedEventIndex
																]?.icon ===
																iconItem.value
																	? 'is-active'
																	: ''
															}` }
															onClick={ () => {
																if (
																	expandedEventIndex >=
																		0 &&
																	expandedEventIndex <
																		events.length
																) {
																	updateEvent(
																		expandedEventIndex,
																		'icon',
																		iconItem.value
																	);
																}
															} }
														>
															<i
																className={
																	iconItem.value
																}
															/>
														</button>
													)
												) }
											</div>
										</BaseControl>
									</PanelBody>
								);
							}

							return null;
						} }
					</TabPanel>
				</div>
			</InspectorControls>

			<div { ...blockProps }>
				{ events.map( ( event, index ) => {
					const isEven = index % 2 === 0;
					const itemSideClass =
						alignment === 'alternating'
							? isEven
								? 'is-left'
								: 'is-right'
							: 'is-single-left';

					return (
						<div
							key={ event.id || index }
							className={ `timeline-item ${ itemSideClass }` }
						>
							<div
								className="timeline-badge"
								style={ {
									backgroundColor:
										event.badgeColor || badgeBgColor,
									color:
										event.badgeTextColor || badgeTextColor,
								} }
							>
								{ showIcons && (
									<i
										className={
											event.icon || 'fa-solid fa-star'
										}
									/>
								) }
							</div>

							<div className="timeline-card-wrapper">
								<div
									className={ `timeline-card card ${
										cardShadow ? 'has-shadow shadow-sm' : ''
									} ${ ! cardBorder ? 'border-0' : '' }` }
								>
									<span className="timeline-arrow" />
									<div className="card-body">
										<div className="timeline-item-actions">
											<Button
												icon="arrow-up"
												size="small"
												disabled={ index === 0 }
												onClick={ () =>
													moveEvent( index, -1 )
												}
												label={ __(
													'Mover para cima',
													'periodic-timeline-vertical'
												) }
											/>
											<Button
												icon="arrow-down"
												size="small"
												disabled={
													index === events.length - 1
												}
												onClick={ () =>
													moveEvent( index, 1 )
												}
												label={ __(
													'Mover para baixo',
													'periodic-timeline-vertical'
												) }
											/>
											<Button
												icon="trash"
												size="small"
												isDestructive
												disabled={ events.length <= 1 }
												onClick={ () =>
													removeEvent( index )
												}
												label={ __(
													'Excluir evento',
													'periodic-timeline-vertical'
												) }
											/>
										</div>

										<div className="timeline-date-container">
											<RichText
												tagName="span"
												className="timeline-date timeline-editable-date"
												value={ event.date }
												onChange={ ( val ) =>
													updateEvent(
														index,
														'date',
														val
													)
												}
												placeholder={ __(
													'Data / Ano',
													'periodic-timeline-vertical'
												) }
											/>
											{ ( event.tag ||
												event.tag === '' ) && (
												<RichText
													tagName="span"
													className="badge bg-secondary timeline-tag"
													value={ event.tag }
													onChange={ ( val ) =>
														updateEvent(
															index,
															'tag',
															val
														)
													}
													placeholder={ __(
														'Tag',
														'periodic-timeline-vertical'
													) }
												/>
											) }
										</div>

										<RichText
											tagName="h4"
											className="timeline-title timeline-editable-title"
											value={ event.title }
											onChange={ ( val ) =>
												updateEvent(
													index,
													'title',
													val
												)
											}
											placeholder={ __(
												'Título do marco...',
												'periodic-timeline-vertical'
											) }
										/>

										<RichText
											tagName="p"
											className="timeline-description timeline-editable-description"
											value={ event.description }
											onChange={ ( val ) =>
												updateEvent(
													index,
													'description',
													val
												)
											}
											placeholder={ __(
												'Escreva a descrição do evento...',
												'periodic-timeline-vertical'
											) }
										/>
									</div>
								</div>
							</div>

							{ alignment === 'alternating' && (
								<div className="timeline-empty-spacer" />
							) }
						</div>
					);
				} ) }

				<div className="timeline-add-event-container">
					<Button
						variant="primary"
						onClick={ addEvent }
						icon="plus"
					>
						{ __(
							'+ Adicionar Novo Marco Temporal',
							'periodic-timeline-vertical'
						) }
					</Button>
				</div>
			</div>
		</>
	);
}
